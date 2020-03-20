import * as PIXI from 'pixi.js';
import createDom2dCamera from 'dom-2d-camera';
import { mat4, vec4 } from 'gl-matrix';
import createPubSub from 'pub-sub-es';
import withRaf from 'with-raf';
import * as RBush from 'rbush';
import normalizeWheel from 'normalize-wheel';
import { batchActions } from 'redux-batched-actions';
import {
  addClass,
  capitalize,
  cubicOut,
  debounce,
  identity,
  interpolateNumber,
  interpolateVector,
  isFunction,
  isObject,
  isPointInPolygon,
  l2PointDist,
  lRectDist,
  max,
  maxVector,
  mean,
  meanVector,
  median,
  medianVector,
  min,
  minVector,
  nextAnimationFrame,
  removeClass,
  sortPos,
  sum,
  sumVector,
  unique
} from '@flekschas/utils';

import createAnimator from './animator';
import createLevels from './levels';
import createKmeans from './kmeans';
import createStore, { createAction } from './store';

import {
  BLACK,
  CAMERA_VIEW,
  DEFAULT_COLOR_MAP,
  EVENT_LISTENER_ACTIVE,
  EVENT_LISTENER_PASSIVE,
  INHERIT,
  INITIAL_ARRANGEMENT_TYPE,
  INITIAL_ARRANGEMENT_OBJECTIVE,
  NAVIGATION_MODE_AUTO,
  NAVIGATION_MODE_PAN_ZOOM,
  NAVIGATION_MODE_SCROLL,
  POSITION_PILES_DEBOUNCE_TIME,
  UNKNOWN_LABEL,
  WHITE
} from './defaults';

import {
  cloneSprite,
  colorToDecAlpha,
  getBBox,
  scaleLinear,
  toHomogeneous,
  uniqueStr
} from './utils';

import createImage from './image';
import createImageWithBackground from './image-with-background';
import createPile from './pile';
import createGrid from './grid';
import createItem from './item';
import createTweener from './tweener';
import createContextMenu from './context-menu';
import createPopup from './popup';
import createLasso from './lasso';

import { version } from '../package.json';

// We cannot import the following libraries using the normal `import` statement
// as this blows up the Rollup bundle massively for some reasons...
const convolve = require('ndarray-convolve');
const ndarray = require('ndarray');

const EXTRA_ROWS = 3;

const l2RectDist = lRectDist(2);

const createPilingJs = (rootElement, initOptions = {}) => {
  const scrollContainer = document.createElement('div');
  const scrollEl = document.createElement('div');
  const canvas = document.createElement('canvas');

  const pubSub = createPubSub();
  const store = createStore();

  let state = store.state;

  let backgroundColor = WHITE;

  let gridMat;

  let transformPointToScreen;
  let transformPointFromScreen;
  let translatePointFromScreen;
  let camera;
  const scratch = new Float32Array(16);
  const lastPilePosition = new Map();

  const renderer = new PIXI.Renderer({
    width: rootElement.getBoundingClientRect().width,
    height: rootElement.getBoundingClientRect().height,
    view: canvas,
    antialias: true,
    transparent: true,
    resolution: window.devicePixelRatio,
    autoDensity: true
  });

  let isInitialPositioning = true;
  let isPanZoom = null;
  let isPanZoomed = false;

  let arranging = Promise.resolve();

  const root = new PIXI.Container();
  root.interactive = true;

  const stage = new PIXI.Container();
  stage.interactive = true;
  stage.sortableChildren = true;

  const gridGfx = new PIXI.Graphics();
  stage.addChild(gridGfx);

  const spatialIndexGfx = new PIXI.Graphics();
  stage.addChild(spatialIndexGfx);

  root.addChild(stage);

  const mask = new PIXI.Graphics();
  root.addChild(mask);
  stage.mask = mask;

  const createColorOpacityActions = (colorAction, opacityAction) => value => {
    if (isFunction(value)) return [createAction[colorAction](value)];

    const [color, opacity] = colorToDecAlpha(value, null);
    const actions = [createAction[colorAction](color)];
    if (opacity !== null) actions.push(createAction[opacityAction](opacity));

    return actions;
  };

  const properties = {
    arrangementObjective: true,
    arrangementOnPile: true,
    arrangementOptions: true,
    arrangementType: true,
    backgroundColor: true,
    cellAspectRatio: true,
    cellPadding: true,
    cellSize: true,
    columns: true,
    coverAggregator: true,
    coverRenderer: true,
    darkMode: true,
    depiledPile: true,
    depileMethod: true,
    dimensionalityReducer: true,
    easing: true,
    focusedPiles: true,
    gridColor: {
      set: createColorOpacityActions('setGridColor', 'setGridOpacity')
    },
    gridOpacity: true,
    items: {
      get: () => Object.values(state.items),
      set: newItems => [
        createAction.setItems(newItems),
        createAction.initPiles(newItems)
      ]
    },
    itemSize: true,
    itemSizeRange: true,
    lassoFillColor: {
      set: createColorOpacityActions('setLassoFillColor', 'setLassoFillOpacity')
    },
    lassoFillOpacity: true,
    lassoShowStartIndicator: true,
    lassoStartIndicatorOpacity: true,
    lassoStrokeColor: {
      set: createColorOpacityActions(
        'setLassoStrokeColor',
        'setLassoStrokeOpacity'
      )
    },
    lassoStrokeOpacity: true,
    lassoStrokeSize: true,
    layout: {
      get: () => ({
        cellAspectRatio: layout.cellAspectRatio,
        cellHeight: layout.cellHeight,
        cellPadding: layout.cellPadding,
        cellSize: layout.cellSize,
        cellWidth: layout.cellWidth,
        columnWidth: layout.columnWidth,
        height: layout.height,
        itemSize: layout.itemSize,
        numColumns: layout.numColumns,
        numRows: layout.numRows,
        rowHeight: layout.rowHeight,
        width: layout.width
      })
    },
    magnifiedPiles: true,
    navigationMode: true,
    orderer: true,
    pileCoverInvert: true,
    pileCoverScale: true,
    pileItemBrightness: true,
    pileItemInvert: true,
    pileItemOffset: true,
    pileItemOpacity: true,
    pileItemOrder: true,
    pileItemRotation: true,
    pileItemTint: true,
    pileLabel: {
      set: value => {
        const objective = expandLabelObjective(value);
        const actions = [createAction.setPileLabel(objective)];
        return actions;
      }
    },
    pileLabelAlign: true,
    pileLabelColor: true,
    pileLabelFontSize: true,
    pileLabelHeight: true,
    pileLabelStackAlign: true,
    pileLabelText: true,
    pileBorderColor: {
      set: createColorOpacityActions(
        'setPileBorderColor',
        'setPileBorderOpacity'
      )
    },
    pileBorderOpacity: true,
    pileBorderColorHover: {
      set: createColorOpacityActions(
        'setPileBorderColorHover',
        'setPileBorderOpacityHover'
      )
    },
    pileBorderOpacityHover: true,
    pileBorderColorFocus: {
      set: createColorOpacityActions(
        'setPileBorderColorFocus',
        'setPileBorderOpacityFocus'
      )
    },
    pileBorderOpacityFocus: true,
    pileBorderColorActive: {
      set: createColorOpacityActions(
        'setPileBorderColorActive',
        'setPileBorderOpacityActive'
      )
    },
    pileBorderOpacityActive: true,
    pileBorderSize: true,
    pileBackgroundColor: {
      set: createColorOpacityActions(
        'setPileBackgroundColor',
        'setPileBackgroundOpacity'
      )
    },
    pileBackgroundOpacity: true,
    pileBackgroundColorHover: {
      set: createColorOpacityActions(
        'setPileBackgroundColorHover',
        'setPileBackgroundOpacityHover'
      )
    },
    pileBackgroundOpacityHover: true,
    pileBackgroundColorFocus: {
      set: createColorOpacityActions(
        'setPileBackgroundColorFocus',
        'setPileBackgroundOpacityFocus'
      )
    },
    pileBackgroundOpacityFocus: true,
    pileBackgroundColorActive: {
      set: createColorOpacityActions(
        'setPileBackgroundColorActive',
        'setPileBackgroundOpacityActive'
      )
    },
    pileBackgroundOpacityActive: true,
    pileCellAlignment: true,
    pileContextMenuItems: true,
    pileOpacity: true,
    pileScale: true,
    pileVisibilityItems: true,
    popupBackgroundOpacity: true,
    previewAggregator: true,
    previewBackgroundColor: {
      set: createColorOpacityActions(
        'setPreviewBackgroundColor',
        'setPreviewBackgroundOpacity'
      )
    },
    previewBackgroundOpacity: true,
    previewBorderColor: {
      set: createColorOpacityActions(
        'setPreviewBorderColor',
        'setPreviewBorderOpacity'
      )
    },
    previewBorderOpacity: true,
    previewItemOffset: true,
    previewOffset: true,
    previewPadding: true,
    previewRenderer: true,
    previewScaling: true,
    previewSpacing: true,
    renderer: {
      get: () => state.itemRenderer,
      set: value => [createAction.setItemRenderer(value)]
    },
    rowHeight: true,
    showGrid: true,
    showSpatialIndex: true,
    tempDepileDirection: true,
    tempDepileOneDNum: true,
    temporaryDepiledPiles: true
  };

  const get = property => {
    if (properties[property]) {
      if (properties[property].get) return properties[property].get();
      return state[property];
    }

    console.warn(`Unknown property "${property}"`);
    return undefined;
  };

  const set = (property, value, noDispatch = false) => {
    let actions = [];

    if (properties[property]) {
      const defaultSetter = v => [
        createAction[`set${capitalize(property)}`](v)
      ];
      const setter = properties[property].set || defaultSetter;
      if (setter) {
        actions = setter(value);
      } else {
        console.warn(`Property "${property}" is not settable`);
      }
    } else {
      console.warn(`Unknown property "${property}"`);
    }

    if (!noDispatch) {
      actions.forEach(action => store.dispatch(action));
    }

    return actions;
  };

  const setPublic = (newProperty, newValue) => {
    if (typeof newProperty === 'string' || newProperty instanceof String) {
      set(newProperty, newValue);
    } else {
      store.dispatch(
        batchActions(
          Object.entries(newProperty).flatMap(([property, value]) =>
            set(property, value, true)
          )
        )
      );
    }
  };

  const render = () => {
    renderer.render(root);
    pubSub.publish('render');
  };

  const renderRaf = withRaf(render);

  const animator = createAnimator(render, pubSub);

  const renderedItems = new Map();
  const pileInstances = new Map();
  const activePile = new PIXI.Container();
  const normalPiles = new PIXI.Container();

  const clearActivePileLayer = () => {
    if (activePile.children.length) {
      normalPiles.addChild(activePile.getChildAt(0));
      activePile.removeChildren();
    }
  };

  const moveToActivePileLayer = pileGfx => {
    clearActivePileLayer();
    activePile.addChild(pileGfx);
  };

  const popup = createPopup();

  let isMouseDown = false;
  let isLasso = false;

  const lasso = createLasso({
    onStart: () => {
      isLasso = true;
      isMouseDown = true;
    },
    onDraw: () => {
      renderRaf();
    }
  });

  stage.addChild(gridGfx);
  stage.addChild(lasso.fillContainer);
  stage.addChild(normalPiles);
  stage.addChild(activePile);
  stage.addChild(lasso.lineContainer);

  const spatialIndex = new RBush();

  const drawSpatialIndex = (mousePos, lassoPolygon) => {
    if (!store.state.showSpatialIndex) return;

    spatialIndexGfx.clear();
    spatialIndexGfx.beginFill(0x00ff00, 0.5);
    spatialIndex.all().forEach(bBox => {
      spatialIndexGfx.drawRect(bBox.minX, bBox.minY, bBox.width, bBox.height);
    });
    spatialIndexGfx.endFill();
    if (mousePos) {
      spatialIndexGfx.beginFill(0xff0000, 1.0);
      spatialIndexGfx.drawRect(mousePos[0] - 1, mousePos[1] - 1, 3, 3);
      spatialIndexGfx.endFill();
    }
    if (lassoPolygon) {
      spatialIndexGfx.lineStyle(1, 0xff0000, 1.0);
      spatialIndexGfx.moveTo(lassoPolygon[0], lassoPolygon[1]);
      for (let i = 0; i < lassoPolygon.length; i += 2) {
        spatialIndexGfx.lineTo(lassoPolygon[i], lassoPolygon[i + 1]);
        spatialIndexGfx.moveTo(lassoPolygon[i], lassoPolygon[i + 1]);
      }
    }
  };

  const createRBush = () => {
    spatialIndex.clear();

    const boxList = [];

    if (pileInstances) {
      pileInstances.forEach(pile => {
        pile.updateBounds(...getXyOffset());
        boxList.push(pile.bBox);
      });
      spatialIndex.load(boxList);
      drawSpatialIndex();
    }
  };

  const deletePileFromSearchIndex = pileId => {
    const pile = pileInstances.get(pileId);

    spatialIndex.remove(pile.bBox, (a, b) => {
      return a.id === b.id;
    });
    drawSpatialIndex();
  };

  const getXyOffset = () => {
    if (isPanZoom) {
      return camera.translation;
    }

    return [0, stage.y];
  };

  const calcPileBBox = pileId => {
    return pileInstances.get(pileId).calcBBox(...getXyOffset());
  };

  const updatePileBounds = pileId => {
    const pile = pileInstances.get(pileId);

    spatialIndex.remove(pile.bBox, (a, b) => a.id === b.id);
    pile.updateBounds(...getXyOffset());
    spatialIndex.insert(pile.bBox);
    drawSpatialIndex();
  };

  const translatePiles = () => {
    lastPilePosition.forEach((pilePos, pileId) => {
      movePileTo(pileInstances.get(pileId), pilePos[0], pilePos[1]);
    });
    renderRaf();
  };

  const panZoomHandler = (updatePilePosition = true) => {
    // Update the camera
    camera.tick();
    translatePiles();
    isPanZoomed = true;
    if (updatePilePosition) positionPilesDb();
    pubSub.publish('zoom', camera);
  };

  const panZoomEndHandler = () => {
    if (!isPanZoomed) return;
    isPanZoomed = false;
    // Update the camera
    camera.tick();
    translatePiles();
    pubSub.publish('zoom', camera);
  };

  let layout;

  const updateScrollHeight = () => {
    const canvasHeight = canvas.getBoundingClientRect().height;
    const finalHeight =
      Math.round(layout.rowHeight) * (layout.numRows + EXTRA_ROWS);
    scrollEl.style.height = `${Math.max(0, finalHeight - canvasHeight)}px`;

    if (store.state.showGrid) {
      drawGrid();
    }
  };

  const enableScrolling = () => {
    if (isPanZoom === false) return false;

    disablePanZoom();

    isPanZoom = false;
    transformPointToScreen = identity;
    transformPointFromScreen = identity;
    translatePointFromScreen = identity;

    stage.y = 0;
    scrollContainer.style.overflowY = 'auto';
    scrollContainer.scrollTop = 0;
    scrollContainer.addEventListener(
      'scroll',
      mouseScrollHandler,
      EVENT_LISTENER_PASSIVE
    );
    window.addEventListener(
      'mousedown',
      mouseDownHandler,
      EVENT_LISTENER_PASSIVE
    );
    window.addEventListener('mouseup', mouseUpHandler, EVENT_LISTENER_PASSIVE);
    window.addEventListener(
      'mousemove',
      mouseMoveHandler,
      EVENT_LISTENER_PASSIVE
    );
    canvas.addEventListener('wheel', wheelHandler, EVENT_LISTENER_ACTIVE);
    return true;
  };

  const disableScrolling = () => {
    if (isPanZoom !== false) return;

    stage.y = 0;
    scrollContainer.style.overflowY = 'hidden';
    scrollContainer.scrollTop = 0;
    scrollContainer.removeEventListener('scroll', mouseScrollHandler);
    window.removeEventListener('mousedown', mouseDownHandler);
    window.removeEventListener('mouseup', mouseUpHandler);
    window.removeEventListener('mousemove', mouseMoveHandler);
    canvas.removeEventListener('wheel', wheelHandler);
  };

  const enablePanZoom = () => {
    if (isPanZoom === true) return false;

    disableScrolling();

    isPanZoom = true;
    transformPointToScreen = transformPointToCamera;
    transformPointFromScreen = transformPointFromCamera;
    translatePointFromScreen = translatePointFromCamera;

    camera = createDom2dCamera(canvas, {
      isNdc: false,
      onMouseDown: mouseDownHandler,
      onMouseUp: mouseUpHandler,
      onMouseMove: mouseMoveHandler,
      onWheel: wheelHandler
    });
    camera.set(mat4.clone(CAMERA_VIEW));

    return true;
  };

  const disablePanZoom = () => {
    if (isPanZoom !== true) return;

    camera.dispose();
    camera = undefined;
  };

  const drawGrid = () => {
    const height =
      scrollEl.getBoundingClientRect().height +
      canvas.getBoundingClientRect().height;
    const { width } = canvas.getBoundingClientRect();

    const vLineNum = Math.ceil(width / layout.columnWidth);
    const hLineNum = Math.ceil(height / layout.rowHeight);

    const { gridColor, gridOpacity } = store.state;

    gridGfx.clear();
    gridGfx.lineStyle(1, gridColor, gridOpacity);
    // vertical lines
    for (let i = 1; i < vLineNum; i++) {
      gridGfx.moveTo(i * layout.columnWidth, 0);
      gridGfx.lineTo(i * layout.columnWidth, height);
    }
    // horizontal lines
    for (let i = 1; i < hLineNum; i++) {
      gridGfx.moveTo(0, i * layout.rowHeight);
      gridGfx.lineTo(width, i * layout.rowHeight);
    }
  };

  const clearGrid = () => {
    gridGfx.clear();
  };

  const initGrid = () => {
    const { orderer } = store.state;

    const { width, height } = canvas.getBoundingClientRect();

    layout = createGrid({ width, height, orderer }, store.state);

    updateScrollHeight();
  };

  const updateGrid = () => {
    const { orderer } = store.state;

    const oldLayout = layout;

    const { width, height } = canvas.getBoundingClientRect();

    layout = createGrid({ width, height, orderer }, store.state);

    // eslint-disable-next-line no-use-before-define
    updateLayout(oldLayout, layout);
    updateScrollHeight();

    if (store.state.showGrid) {
      drawGrid();
    }
  };

  const levelLeaveHandler = ({ width, height }) => {
    pubSub.subscribe(
      'animationEnd',
      () => {
        if (layout.width !== width || layout.height !== height) {
          // Set layout to the old layout given the old element width and height
          layout = createGrid(
            { width, height, orderer: store.state.orderer },
            store.state
          );
          updateGrid();
        }
      },
      1
    );
  };

  const levels = createLevels(
    { element: canvas, pubSub, store },
    { onLeave: levelLeaveHandler }
  );

  const halt = async options => {
    await popup.open(options);

    if (isPanZoom) camera.config({ isFixed: true });
    else scrollContainer.style.overflowY = 'hidden';
  };

  const resume = () => {
    popup.close();

    if (isPanZoom) camera.config({ isFixed: false });
    else scrollContainer.style.overflowY = 'auto';
  };

  const updateHalt = () => {
    const { darkMode, haltBackgroundOpacity } = store.state;

    popup.set({
      backgroundOpacity: haltBackgroundOpacity,
      darkMode
    });
  };

  const updateLevels = () => {
    const { darkMode } = store.state;

    levels.set({
      darkMode
    });
  };

  const updateLasso = () => {
    const {
      darkMode,
      lassoFillColor,
      lassoFillOpacity,
      lassoShowStartIndicator,
      lassoStartIndicatorOpacity,
      lassoStrokeColor,
      lassoStrokeOpacity,
      lassoStrokeSize
    } = store.state;

    lasso.set({
      fillColor: lassoFillColor,
      fillOpacity: lassoFillOpacity,
      showStartIndicator: lassoShowStartIndicator,
      startIndicatorOpacity: lassoStartIndicatorOpacity,
      strokeColor: lassoStrokeColor,
      strokeOpacity: lassoStrokeOpacity,
      strokeSize: lassoStrokeSize,
      darkMode
    });
  };

  let itemWidthScale = scaleLinear();
  let itemHeightScale = scaleLinear();

  const getImageScaleFactor = image =>
    image.aspectRatio > layout.cellAspectRatio
      ? itemWidthScale(image.originalWidth) / image.originalWidth
      : itemHeightScale(image.originalHeight) / image.originalHeight;

  const scaleItems = () => {
    if (!renderedItems.size) return;

    let minWidth = Infinity;
    let maxWidth = 0;
    let minHeight = Infinity;
    let maxHeight = 0;
    let minAspectRatio = Infinity;
    let maxAspectRatio = 0;
    renderedItems.forEach(item => {
      const width = item.image.originalWidth;
      const height = item.image.originalHeight;

      if (width > maxWidth) maxWidth = width;
      if (width < minWidth) minWidth = width;

      if (height > maxHeight) maxHeight = height;
      if (height < minHeight) minHeight = height;

      const aspectRatio = width / height;
      if (aspectRatio > maxAspectRatio) maxAspectRatio = aspectRatio;
      if (aspectRatio < minAspectRatio) minAspectRatio = aspectRatio;
    });

    const { itemSizeRange, itemSize, piles, previewScaling } = store.state;

    const itemWidth = itemSize || layout.cellWidth;
    const itemHeight = itemSize || layout.cellHeight;

    let widthRange;
    let heightRange;

    // if it's within [0, 1] assume it's relative
    if (
      itemSizeRange[0] > 0 &&
      itemSizeRange[0] <= 1 &&
      itemSizeRange[1] > 0 &&
      itemSizeRange[1] <= 1
    ) {
      widthRange = [itemWidth * itemSizeRange[0], itemWidth * itemSizeRange[1]];
      heightRange = [
        itemHeight * itemSizeRange[0],
        itemHeight * itemSizeRange[1]
      ];
    } else {
      widthRange = [0, itemWidth];
      heightRange = [0, itemHeight];
    }

    itemWidthScale = scaleLinear()
      .domain([minWidth, maxWidth])
      .range(widthRange);

    itemHeightScale = scaleLinear()
      .domain([minHeight, maxHeight])
      .range(heightRange);

    Object.values(piles).forEach(pile => {
      const scaling = isFunction(previewScaling)
        ? previewScaling(pile)
        : previewScaling;

      pile.items.forEach(itemId => {
        const item = renderedItems.get(itemId);

        const scaleFactor = getImageScaleFactor(item.image);
        item.image.scale(scaleFactor);

        if (item.preview) {
          const xScale = 1 + (scaleFactor * scaling[0] - 1);
          const yScale = 1 + (scaleFactor * scaling[1] - 1);

          item.preview.scaleX(xScale);
          item.preview.scaleY(yScale);
          item.preview.drawBackground();
        }
      });
    });

    pileInstances.forEach(pile => {
      if (pile.cover()) {
        pile.cover().then(coverImage => {
          const scaleFactor = getImageScaleFactor(coverImage);
          coverImage.scale(scaleFactor);
        });
      }
      pile.updateOffset();
    });
  };

  const movePileTo = (pile, x, y) => {
    pile.moveTo(...transformPointToScreen([x, y]));
  };

  const movePileToWithUpdate = (pile, x, y) => {
    movePileTo(pile, x, y);
    updatePileBounds(pile.id);
  };

  const animateMovePileTo = (pile, x, y, options) =>
    pile.animateMoveTo(...transformPointToScreen([x, y]), options);

  const updateLayout = oldLayout => {
    const { arrangementType, items } = store.state;

    scaleItems();

    if (arrangementType === null && !isPanZoom) {
      // Since there is no automatic arrangement in place we manually move
      // piles from their old cell position to their new cell position
      const movingPiles = [];

      layout.numRows = Math.ceil(renderedItems.size / layout.numColumns);
      pileInstances.forEach(pile => {
        const [oldRowNum, oldColumnNum] = oldLayout.xyToIj(
          pile.bBox.cX,
          pile.bBox.cY
        );

        pile.updateOffset();
        updatePileBounds(pile.id);

        const oldCellIndex = oldLayout.ijToIdx(oldRowNum, oldColumnNum);

        const [x, y] = layout.idxToXy(
          oldCellIndex,
          pile.anchorBox.width,
          pile.anchorBox.height,
          pile.offset
        );

        movingPiles.push({ id: pile.id, x, y });
      });

      pileInstances.forEach(pile => {
        if (pile.cover()) {
          positionItems(pile.id);
        }
      });

      store.dispatch(createAction.movePiles(movingPiles));

      renderedItems.forEach(item => {
        item.setOriginalPosition(
          layout.idxToXy(
            items[item.id].index,
            item.image.width,
            item.image.height,
            item.image.center
          )
        );
      });
    } else {
      positionPiles();
    }

    createRBush();

    store.state.focusedPiles.forEach(focusedPile => {
      pileInstances.get(focusedPile).focus();
    });

    updateScrollHeight();
    renderRaf();
  };

  const getBackgroundColor = () => {
    if (store.state.pileBackgroundColor !== null)
      return store.state.pileBackgroundColor;
    return backgroundColor;
  };

  const createImagesAndPreviews = items => {
    const {
      itemRenderer,
      previewBackgroundColor,
      previewBackgroundOpacity,
      pileBackgroundOpacity,
      previewAggregator,
      previewRenderer,
      previewPadding
    } = store.state;

    const itemList = Object.values(items);
    const pileBackgroundColor = getBackgroundColor();

    const renderImages = itemRenderer(
      itemList.map(({ src }) => src)
    ).then(textures => textures.map(createImage));

    const previewOptions = {
      backgroundColor:
        previewBackgroundColor === INHERIT
          ? pileBackgroundColor
          : previewBackgroundColor,
      backgroundOpacity:
        previewBackgroundOpacity === INHERIT
          ? pileBackgroundOpacity
          : previewBackgroundOpacity,
      padding: previewPadding
    };
    const createPreview = texture =>
      createImageWithBackground(texture, previewOptions);

    const renderPreviews = previewAggregator
      ? previewAggregator(itemList)
          .then(previewRenderer)
          .then(textures => textures.map(createPreview))
      : Promise.resolve([]);

    return [renderImages, renderPreviews];
  };

  const updateItemTexture = (updatedItems = null) => {
    const { items, piles } = store.state;

    if (!updatedItems) {
      // eslint-disable-next-line no-param-reassign
      updatedItems = items;
    }

    return Promise.all(createImagesAndPreviews(updatedItems)).then(
      ([renderedImages, renderedPreviews]) => {
        const updatedItemIds = Object.keys(updatedItems);

        renderedImages.forEach((image, index) => {
          const itemId = updatedItemIds[index];
          const preview = renderedPreviews[itemId];
          if (renderedItems.has(itemId)) {
            renderedItems.get(itemId).replaceImage(image, preview);
          }
        });

        updatedItemIds.forEach(itemId => {
          if (pileInstances.has(itemId)) {
            const pile = pileInstances.get(itemId);
            const pileState = piles[itemId];
            pile.replaceItemsImage();
            pile.blur();
            updatePileStyle(pileState, itemId);
            updatePileItemStyle(pileState, itemId);
            clearActivePileLayer();
          } else {
            // Just update part of items on a pile
            Object.values(piles).forEach(pileState => {
              if (pileState.items.includes(itemId)) {
                const pile = pileInstances.get(pileState.id);
                pile.replaceItemsImage(itemId);
                pile.blur();
              }
            });
          }
        });
        scaleItems();
        renderRaf();
      }
    );
  };

  const createItemsAndPiles = async newItems => {
    const newItemIds = Object.keys(newItems);

    if (!newItemIds.length) return Promise.resolve();

    await halt();

    return Promise.all(createImagesAndPreviews(newItems)).then(
      ([renderedImages, renderedPreviews]) => {
        const { piles } = store.state;
        renderedImages.forEach((image, index) => {
          const preview = renderedPreviews[index];
          const id = newItemIds[index];

          const newItem = createItem({ id, image, pubSub }, { preview });

          renderedItems.set(id, newItem);

          const pileState = piles[id];
          createPileHandler(id, pileState);
        });
        scaleItems();
        renderRaf();
        resume();
      }
    );
  };

  const isPileUnpositioned = pile => pile.x === null || pile.y === null;

  const getPilePositionBy1dOrdering = pileId => {
    const pile = pileInstances.get(pileId);
    return Promise.resolve(
      layout.idxToXy(
        pileSortPosByAggregate[0][pileId],
        pile.width,
        pile.height,
        pile.offset
      )
    );
  };

  const getPilePositionBy2dScales = pileId =>
    Promise.resolve(
      arrangement2dScales.map((scale, i) =>
        scale(aggregatedPileValues[pileId][i])
      )
    );

  const cachedMdPilePos = new Map();
  let cachedMdPilePosDimReducerRun = 0;
  const getPilePositionByMdTransform = async pileId => {
    const { dimensionalityReducer } = store.state;

    if (
      cachedMdPilePos.has(pileId) &&
      lastMdReducerRun === cachedMdPilePosDimReducerRun
    )
      return cachedMdPilePos.get(pileId);

    cachedMdPilePosDimReducerRun = lastMdReducerRun;

    const uv = await dimensionalityReducer.transform([
      aggregatedPileValues[pileId].flat()
    ]);

    const pilePos = layout.uvToXy(...uv[0]);

    const pile = pileInstances.get(pileId);

    if (pile.size === 1 && !cachedMdPilePos.has(pileId)) {
      pile.items[0].item.setOriginalPosition(pilePos);
    }

    cachedMdPilePos.set(pileId, pilePos);

    return pilePos;
  };

  const getPilePositionByData = (pileId, pileState) => {
    const {
      arrangementObjective,
      arrangementOptions,
      dimensionalityReducer
    } = store.state;

    if (
      arrangementObjective.length > 2 ||
      arrangementOptions.forceDimReduction
    ) {
      if (dimensionalityReducer) return getPilePositionByMdTransform(pileId);
      return Promise.resolve([pileState.x, pileState.y]);
    }

    if (arrangementObjective.length > 1) {
      return getPilePositionBy2dScales(pileId);
    }

    if (arrangementObjective.length) {
      return getPilePositionBy1dOrdering(pileId);
    }

    console.warn(
      "Can't arrange pile by data. No arrangement objective available."
    );
    return Promise.resolve([pileState.x, pileState.y]);
  };

  const getPilePositionByCoords = (pileState, objective) => {
    if (objective.isCustom) {
      return objective.property(pileState, pileState.index);
    }

    const { items } = store.state;

    return objective.aggregator(
      pileState.items.map(itemId => objective.property(items[itemId]))
    );
  };

  const getPilePosition = async (pileId, init) => {
    const { arrangementType, arrangementObjective, piles } = store.state;

    const pile = pileInstances.get(pileId);
    const pileState = piles[pileId];

    const isUnpositioned = isPileUnpositioned(pileState);

    const type =
      init || isUnpositioned
        ? arrangementType || INITIAL_ARRANGEMENT_TYPE
        : arrangementType;

    const objective =
      init || isUnpositioned
        ? arrangementObjective || INITIAL_ARRANGEMENT_OBJECTIVE
        : arrangementObjective;

    const ijToXy = (i, j) =>
      layout.ijToXy(i, j, pile.width, pile.height, pile.offset);

    if (type === 'data') return getPilePositionByData(pileId, pileState);

    const pos = type && getPilePositionByCoords(pileState, objective);

    switch (type) {
      case 'index':
        return ijToXy(...layout.idxToIj(pos));

      case 'ij':
        return ijToXy(...pos);

      case 'xy':
        return pos;

      case 'uv':
        return layout.uvToXy(...pos);

      default:
        return Promise.resolve([pileState.x, pileState.y]);
    }
  };

  /**
   * Transform a point from screen to camera coordinates
   * @param {array} point - Point in screen coordinates
   * @return {array} Point in camera coordinates
   */
  const transformPointToCamera = point => {
    const v = toHomogeneous(point[0], point[1]);

    vec4.transformMat4(v, v, camera.view);

    return v.slice(0, 2);
  };

  /**
   * Transform a point from camera to screen coordinates
   * @param {array} point - Point in camera coordinates
   * @return {array} Point in screen coordinates
   */
  const transformPointFromCamera = point => {
    const v = toHomogeneous(point[0], point[1]);

    vec4.transformMat4(v, v, mat4.invert(scratch, camera.view));

    return v.slice(0, 2);
  };

  /**
   * Translate a point according to the camera position.
   *
   * @description This methis is similar to `transformPointFromCamera` but it
   *   does not incorporate the zoom level. We use this method together with the
   *   search index as the search index is zoom-invariant.
   *
   * @param {array} point - Point to be translated
   * @return {array} Translated point
   */
  const translatePointFromCamera = point => [
    point[0] - camera.translation[0],
    point[1] - camera.translation[1]
  ];

  const positionPiles = async (pileIds = [], { immideate = false } = {}) => {
    const { items } = store.state;
    const positionAllPiles = !pileIds.length;

    if (positionAllPiles) {
      pileIds.splice(0, 0, ...Object.keys(store.state.piles));
    }

    if (Object.keys(items).length === 0) {
      createRBush();
      updateScrollHeight();
      renderRaf();
      return;
    }

    const movingPiles = [];

    const readyPiles = pileIds
      .filter(id => pileInstances.has(id))
      .map(id => pileInstances.get(id));

    if (!readyPiles.length) return;

    await arranging;

    // eslint-disable-next-line no-restricted-syntax
    for (const pile of readyPiles) {
      // eslint-disable-next-line no-await-in-loop
      const point = await getPilePosition(pile.id, isInitialPositioning);
      lastPilePosition.set(pile.id, point);

      const [x, y] = point;

      if (immideate) movePileToWithUpdate(pile, x, y);

      movingPiles.push({ id: pile.id, x, y });

      layout.numRows = Math.max(
        layout.numRows,
        Math.ceil(y / layout.rowHeight)
      );

      if (isInitialPositioning || isPileUnpositioned(pile)) {
        renderedItems.get(pile.id).setOriginalPosition([x, y]);
      }
    }

    isInitialPositioning = false;

    if (!store.state.arrangementOnPile) {
      cancelArrangement();
    }

    store.dispatch(createAction.movePiles(movingPiles));

    if (positionAllPiles) {
      createRBush();
    }
    updateScrollHeight();
    renderRaf();
  };

  const positionPilesDb = debounce(positionPiles, POSITION_PILES_DEBOUNCE_TIME);

  const positionItems = pileId => {
    const {
      items,
      pileItemOffset,
      pileItemRotation,
      pileItemOrder
    } = store.state;

    const pileInstance = pileInstances.get(pileId);

    if (isFunction(pileItemOrder)) {
      const itemStates = pileInstance.items.map(item => items[item.id]);
      pileInstance.setItemOrder(pileItemOrder(itemStates));
    }

    pileInstance.positionItems(pileItemOffset, pileItemRotation, animator);
  };

  const updatePileItemStyle = (pileState, pileId) => {
    const {
      items,
      pileItemBrightness,
      pileItemInvert,
      pileItemOpacity,
      pileItemTint
    } = store.state;

    const pileInstance = pileInstances.get(pileId);

    pileInstance.items.forEach((pileItem, i) => {
      const itemState = items[pileItem.id];

      pileItem.animateOpacity(
        isFunction(pileItemOpacity)
          ? pileItemOpacity(itemState, i, pileState)
          : pileItemOpacity
      );

      pileItem.image.invert(
        isFunction(pileItemInvert)
          ? pileItemInvert(itemState, i, pileState)
          : pileItemInvert
      );

      // We can't apply a brightness and invert effect as both rely on the same
      // mechanism. Therefore we decide to give invert higher precedence.
      if (!pileItemInvert) {
        pileItem.image.brightness(
          isFunction(pileItemBrightness)
            ? pileItemBrightness(itemState, i, pileState)
            : pileItemBrightness
        );

        // We can't apply a brightness and tint effect as both rely on the same
        // mechanism. Therefore we decide to give brightness higher precedence.
        if (!pileItemBrightness) {
          pileItem.image.tint(
            isFunction(pileItemTint)
              ? pileItemTint(itemState, i, pileState)
              : pileItemTint
          );
        }
      }
    });
  };

  const updatePileStyle = (pile, pileId) => {
    const pileInstance = pileInstances.get(pileId);

    if (!pileInstance) return;

    const {
      pileOpacity,
      pileBorderSize,
      pileScale,
      pileVisibilityItems
    } = store.state;

    pileInstance.animateOpacity(
      isFunction(pileOpacity) ? pileOpacity(pile) : pileOpacity
    );

    pileInstance.animateScale(
      isFunction(pileScale) ? pileScale(pile) : pileScale
    );

    pileInstance.setBorderSize(
      isFunction(pileBorderSize) ? pileBorderSize(pile) : pileBorderSize
    );

    pileInstance.setVisibilityItems(
      isFunction(pileVisibilityItems)
        ? pileVisibilityItems(pile)
        : pileVisibilityItems
    );
  };

  const createScaledImage = texture => {
    const image = createImage(texture);
    image.scale(getImageScaleFactor(image));
    return image;
  };

  const updatePreviewStyle = pileState => {
    const { previewRenderer, previewScaling } = store.state;

    if (!previewRenderer) return;

    const scaling = isFunction(previewScaling)
      ? previewScaling(pileState)
      : previewScaling;

    pileState.items.forEach(itemId => {
      const item = renderedItems.get(itemId);
      const scaleFactor = getImageScaleFactor(item.image);

      const xScale = 1 + (scaleFactor * scaling[0] - 1);
      const yScale = 1 + (scaleFactor * scaling[1] - 1);

      item.preview.scaleX(xScale);
      item.preview.scaleY(yScale);
    });
  };

  const updatePreviewAndCover = (pileState, pileInstance) => {
    const {
      items,
      coverRenderer,
      coverAggregator,
      pileCoverInvert,
      pileCoverScale,
      previewAggregator
    } = store.state;

    if (pileState.items.length === 1) {
      pileInstance.cover(null);
      positionItems(pileInstance.id);
      pileInstance.setItems([renderedItems.get(pileState.items[0])]);
    } else {
      const itemsOnPile = [];
      const itemInstances = [];

      pileState.items.forEach(itemId => {
        itemsOnPile.push(items[itemId]);
        itemInstances.push(renderedItems.get(itemId));
      });

      updatePreviewStyle(pileState);

      pileInstance.setItems(
        itemInstances,
        { asPreview: !!previewAggregator },
        true
      );

      const coverImage = coverAggregator(itemsOnPile)
        .then(aggregatedSrcs => coverRenderer([aggregatedSrcs]))
        .then(([coverTexture]) => {
          const scaledImage = createScaledImage(coverTexture);

          scaledImage.invert(
            isFunction(pileCoverInvert)
              ? pileCoverInvert(pileState)
              : pileCoverInvert
          );

          const extraScale = isFunction(pileCoverScale)
            ? pileCoverScale(pileState)
            : pileCoverScale;

          scaledImage.scale(scaledImage.scaleFactor * extraScale);

          return scaledImage;
        });

      pileInstance.cover(coverImage);

      coverImage.then(() => {
        renderRaf();
        positionItems(pileInstance.id);
        updatePileBounds(pileInstance.id);
      });
    }
  };

  const isDimReducerInUse = () => {
    const { arrangementObjective, arrangementOptions } = store.state;

    return (
      arrangementObjective &&
      (arrangementObjective.length > 2 || arrangementOptions.forceDimReduction)
    );
  };

  const updatePileItems = (pileState, id) => {
    if (pileInstances.has(id)) {
      const pileInstance = pileInstances.get(id);

      if (pileState.items.length === 0) {
        deletePileHandler(id);
      } else {
        cachedMdPilePos.delete(id);

        const itemInstances = pileState.items.map(itemId =>
          renderedItems.get(itemId)
        );

        if (store.state.coverAggregator) {
          updatePreviewAndCover(pileState, pileInstance);
        } else {
          pileInstance.setItems(itemInstances);
          positionItems(id);
        }

        if (itemInstances.length === 1 && isDimReducerInUse()) {
          cachedMdPilePos.set(id, itemInstances[0].originalPosition);
        }

        updatePileBounds(id);
        updatePileItemStyle(pileState, id);
      }
    } else {
      createPileHandler(id, pileState);
    }
  };

  const updatePilePosition = (pileState, id) => {
    const pileInstance = pileInstances.get(id);
    if (pileInstance) {
      lastPilePosition.set(id, [pileState.x, pileState.y]);
      animateMovePileTo(pileInstance, pileState.x, pileState.y);
    }
  };

  const updateGridMat = pileId => {
    const mat = ndarray(
      new Uint16Array(new Array(layout.numColumns * layout.numRows).fill(0)),
      [layout.numRows, layout.olNum]
    );

    gridMat = mat;

    pileInstances.forEach(pile => {
      if (pile.id === pileId) return;

      const minY = Math.floor(pile.bBox.minX / layout.columnWidth);
      const minX = Math.floor(pile.bBox.minY / layout.rowHeight);
      const maxY = Math.floor(pile.bBox.maxX / layout.columnWidth);
      const maxX = Math.floor(pile.bBox.maxY / layout.rowHeight);

      gridMat.set(minX, minY, 1);
      gridMat.set(minX, maxY, 1);
      gridMat.set(maxX, minY, 1);
      gridMat.set(maxX, maxY, 1);
    });
  };

  const next = (distanceMat, current) => {
    let nextPos;
    let minValue = Infinity;

    // top
    if (
      current[0] - 1 >= 0 &&
      distanceMat.get(current[0] - 1, current[1]) < minValue
    ) {
      minValue = distanceMat.get(current[0] - 1, current[1]);
      nextPos = [current[0] - 1, current[1]];
    }

    // left
    if (
      current[1] - 1 >= 0 &&
      distanceMat.get(current[0], current[1] - 1) < minValue
    ) {
      minValue = distanceMat.get(current[0], current[1] - 1);
      nextPos = [current[0], current[1] - 1];
    }

    // bottom
    if (
      current[0] + 1 < distanceMat.shape[0] &&
      distanceMat.get(current[0] + 1, current[1]) < minValue
    ) {
      minValue = distanceMat.get(current[0] + 1, current[1]);
      nextPos = [current[0] + 1, current[1]];
    }

    // right
    if (
      current[1] + 1 < distanceMat.shape[1] &&
      distanceMat.get(current[0], current[1] + 1) < minValue
    ) {
      minValue = distanceMat.get(current[0], current[1] + 1);
      nextPos = [current[0], current[1] + 1];
    }

    const length = distanceMat.data.length;
    distanceMat.set(current[0], current[1], length);

    if (minValue === distanceMat.data.length) {
      for (let i = 0; i < distanceMat.shape[0]; i++) {
        for (let j = 0; j < distanceMat.shape[1]; j++) {
          if (distanceMat.get(i, j) < minValue && distanceMat.get(i, j) > 0)
            minValue = distanceMat.get(i, j);
          nextPos = [i, j];
        }
      }
    }

    return nextPos;
  };

  const calcDist = (distanceMat, x, y, origin) => {
    if (distanceMat.get(x, y) !== -1) return;

    const distance = l2PointDist(x, y, origin[0], origin[1]);
    distanceMat.set(x, y, distance);
  };

  const findDepilePos = (distanceMat, resultMat, origin, filterRowNum) => {
    let current = [...origin];

    let depilePos;
    let count = 0;

    while (!depilePos && count < distanceMat.data.length) {
      // check current
      if (resultMat.get(current[0], current[1]) < 1) depilePos = current;

      if (!depilePos) {
        // calc dist

        // top
        if (current[0] - 1 >= 0) {
          calcDist(distanceMat, current[0] - 1, current[1], origin);
        }
        // left
        if (current[1] - 1 >= 0) {
          calcDist(distanceMat, current[0], current[1] - 1, origin);
        }
        // bottom
        if (current[0] + 1 < distanceMat.shape[0]) {
          calcDist(distanceMat, current[0] + 1, current[1], origin);
        }
        // right
        if (current[1] + 1 < distanceMat.shape[1]) {
          calcDist(distanceMat, current[0], current[1] + 1, origin);
        }

        // get closest cell
        current = next(distanceMat, current);
        count++;
      }
    }

    // doesn't find an available cell
    if (!depilePos) {
      depilePos = [resultMat.shape[0] + 1, Math.floor(filterRowNum / 2)];
      layout.numRows += filterRowNum;
      updateScrollHeight();
    }

    return depilePos;
  };

  const convolveGridMat = (filterColNum, filterRowNum) => {
    const filter = ndarray(
      new Float32Array(new Array(filterColNum * filterRowNum).fill(1)),
      [filterRowNum, filterColNum]
    );

    const resultMat = ndarray(
      new Float32Array(
        (layout.numRows - filterRowNum + 1) *
          (layout.numColumns - filterColNum + 1)
      ),
      [layout.numRows - filterRowNum + 1, layout.olNum - filterColNum + 1]
    );

    convolve(resultMat, gridMat, filter);

    return resultMat;
  };

  const findPos = (origin, colNum, rowNum) => {
    const resultMat = convolveGridMat(colNum, rowNum);

    const distanceMat = ndarray(
      new Float32Array(
        new Array(
          (layout.numRows - rowNum + 1) * (layout.numColumns - colNum + 1)
        ).fill(-1)
      ),
      [layout.numRows - rowNum + 1, layout.numColumns - colNum + 1]
    );

    const depilePos = findDepilePos(distanceMat, resultMat, origin, rowNum);
    const distance = l2PointDist(
      depilePos[0],
      depilePos[1],
      origin[0],
      origin[1]
    );

    return { depilePos, distance };
  };

  const animateDepile = (srcPileId, itemIds, itemPositions = []) => {
    const { easing } = store.state;
    const movingPiles = [];

    const srcPile = pileInstances.get(srcPileId);
    srcPile.blur();
    srcPile.drawBorder();

    const onAllDone = () => {
      movingPiles.forEach(pileMove => {
        updatePileBounds(pileMove.id);
      });
      store.dispatch(createAction.movePiles(movingPiles));
    };

    let done = 0;
    const onDone = () => {
      done++;
      if (done === itemIds.length) onAllDone();
    };

    animator.addBatch(
      itemIds.map((itemId, index) => {
        const pile = pileInstances.get(itemId);
        const pileItem = pile.getItemById(itemId);

        movingPiles.push({
          id: pile.id,
          x: pileItem.item.originalPosition[0],
          y: pileItem.item.originalPosition[1]
        });

        const endPos =
          itemPositions.length > 0
            ? itemPositions[index]
            : transformPointToScreen(pileItem.item.originalPosition);

        const d = l2PointDist(...endPos, pile.x, pile.y);

        const duration = cubicOut(Math.min(d, 250) / 250) * 250;

        return createTweener({
          duration,
          easing,
          interpolator: interpolateVector,
          endValue: [
            ...(itemPositions.length > 0
              ? itemPositions[index]
              : transformPointToScreen(pileItem.item.originalPosition)),
            0 // angle
          ],
          getter: () => [pile.x, pile.y, pileItem.displayObject.angle],
          setter: newValue => {
            pile.moveTo(newValue[0], newValue[1]);
            pileItem.displayObject.angle = newValue[2];
          },
          onDone
        });
      })
    );
  };

  const depile = pileId => {
    const itemNum = pileInstances.get(pileId).size;

    if (itemNum === 1) return;

    updateGridMat(pileId);

    // take the center point of pile as the original pos
    const bBox = pileInstances.get(pileId).bBox;
    const centerY = Math.floor(
      (bBox.minX + bBox.maxX) / (layout.columnWidth * 2)
    );
    const centerX = Math.floor(
      (bBox.minY + bBox.maxY) / (layout.rowHeight * 2)
    );

    const origin = [centerX, centerY];

    const colNum = Math.ceil(Math.sqrt(itemNum));
    const rowNum = Math.ceil(itemNum / colNum);

    let depilePos;
    let filterRowNum;
    let filterColNum;

    if (colNum !== rowNum) {
      const result1 = findPos(origin, colNum, rowNum);
      const result2 = findPos(origin, rowNum, colNum);

      depilePos =
        result1.distance > result2.distance
          ? result2.depilePos
          : result1.depilePos;
      filterColNum = result1.distance > result2.distance ? rowNum : colNum;
      filterRowNum = result1.distance > result2.distance ? colNum : rowNum;
    } else {
      depilePos = findPos(origin, colNum, rowNum).depilePos;
      filterColNum = colNum;
      filterRowNum = rowNum;
    }

    const { piles } = store.state;
    const depiledPiles = [];
    const items = [...piles[pileId].items];
    const itemPositions = [];
    for (let i = 0; i < items.length; i++) {
      const x =
        Math.floor(i / filterColNum) +
        depilePos[0] -
        Math.floor((filterRowNum - 1) / 2);
      const y =
        (i % filterColNum) + depilePos[1] - Math.floor((filterColNum - 1) / 2);
      itemPositions.push([y * layout.columnWidth, x * layout.rowHeight]);
    }
    // starts from the depiled pile's position
    const depiledPile = {
      items,
      x: piles[pileId].x,
      y: piles[pileId].y
    };
    depiledPiles.push(depiledPile);
    store.dispatch(createAction.scatterPiles(depiledPiles));
    animateDepile(pileId, items, itemPositions);
    store.dispatch(createAction.setDepiledPile([]));
  };

  const depileToOriginPos = pileId => {
    const { piles } = store.state;

    const items = [...piles[pileId].items];

    // starts from the depiled pile's position
    const depiledPile = {
      items,
      x: piles[pileId].x,
      y: piles[pileId].y
    };

    store.dispatch(createAction.scatterPiles([depiledPile]));
    blurPrevHoveredPiles();

    if (!store.state.arrangementType) {
      animateDepile(pileId, items);
    }
  };

  const splitAll = () => {
    const { piles } = store.state;

    const scatteredPiles = [];
    const movingPiles = [];

    Object.entries(piles).forEach(([id, pile]) => {
      const items = [...pile.items];
      if (items.length > 1) {
        scatteredPiles.push({
          items,
          x: pile.x,
          y: pile.y
        });
      } else if (items.length === 1) {
        const pos = renderedItems.get(items[0]).originalPosition;
        movingPiles.push({
          id,
          x: pos[0],
          y: pos[1]
        });
      }
    });

    store.dispatch(
      batchActions([
        createAction.scatterPiles(scatteredPiles),
        createAction.movePiles(movingPiles)
      ])
    );

    scatteredPiles.forEach(pile => {
      animateDepile(pile.items[0], pile.items);
    });
  };

  const animateTempDepileItems = (item, x, y, { onDone = identity } = {}) => {
    const tweener = createTweener({
      interpolator: interpolateVector,
      endValue: [x, y],
      getter: () => {
        return [item.x, item.y];
      },
      setter: newValue => {
        item.x = newValue[0];
        item.y = newValue[1];
      },
      onDone: () => {
        onDone();
      }
    });
    animator.add(tweener);
  };

  const animateAlpha = (graphics, endValue) => {
    const tweener = createTweener({
      duration: 250,
      interpolator: interpolateNumber,
      endValue,
      getter: () => {
        return graphics.alpha;
      },
      setter: newValue => {
        graphics.alpha = newValue;
      }
    });
    animator.add(tweener);
  };

  const closeTempDepile = pileIds => {
    pileIds.forEach(pileId => {
      const pile = pileInstances.get(pileId);

      const onDone = () => {
        pile.tempDepileContainer.removeChildren();
        pile.isTempDepiled = false;
        pile.hover();
        store.dispatch(createAction.setFocusedPiles([]));
        updatePileBounds(pileId);
      };

      pile.tempDepileContainer.children.forEach((item, index) => {
        const options =
          index === pile.tempDepileContainer.children.length - 1
            ? { onDone }
            : undefined;

        animateTempDepileItems(
          item,
          -pile.tempDepileContainer.x,
          -pile.tempDepileContainer.y,
          options
        );
      });

      pubSub.publish('pileInactive', { pile });
    });
    renderRaf();
  };

  const tempDepileOneD = ({ pile, tempDepileDirection, items }) => {
    const onDone = () => {
      pile.isTempDepiled = true;
      store.dispatch(createAction.setFocusedPiles([]));
      store.dispatch(createAction.setFocusedPiles([pile.id]));
    };
    const createOptions = isLast => (isLast ? { onDone } : undefined);

    if (tempDepileDirection === 'horizontal') {
      pile.tempDepileContainer.x = pile.bBox.maxX - pile.bBox.minX + 10;
      pile.tempDepileContainer.y = 0;
      pile.tempDepileContainer.interactive = true;

      let widths = 0;
      items.forEach((itemId, index) => {
        const clonedSprite = cloneSprite(
          renderedItems.get(itemId).image.sprite
        );
        clonedSprite.x = -pile.tempDepileContainer.x;
        pile.tempDepileContainer.addChild(clonedSprite);

        const options = createOptions(index === items.length - 1);

        animateTempDepileItems(clonedSprite, index * 5 + widths, 0, options);

        widths += clonedSprite.width;
      });
    } else if (tempDepileDirection === 'vertical') {
      pile.tempDepileContainer.x = 0;
      pile.tempDepileContainer.y = pile.bBox.maxY - pile.bBox.minY + 10;
      pile.tempDepileContainer.interactive = true;

      let heights = 0;
      items.forEach((itemId, index) => {
        const clonedSprite = cloneSprite(
          renderedItems.get(itemId).image.sprite
        );
        clonedSprite.y = -pile.tempDepileContainer.y;
        pile.tempDepileContainer.addChild(clonedSprite);

        const options = createOptions(index === items.length - 1);

        animateTempDepileItems(clonedSprite, 0, index * 5 + heights, options);

        heights += clonedSprite.height;
      });
    }
  };

  const tempDepileTwoD = ({ pile, items, orderer }) => {
    pile.tempDepileContainer.x = pile.bBox.maxX - pile.bBox.minX + 10;
    pile.tempDepileContainer.y = 0;

    const squareLength = Math.ceil(Math.sqrt(items.length));

    const onDone = () => {
      pile.isTempDepiled = true;
      store.dispatch(createAction.setFocusedPiles([]));
      store.dispatch(createAction.setFocusedPiles([pile.id]));
    };

    const createOptions = isLast => (isLast ? { onDone } : undefined);

    items.forEach((itemId, index) => {
      const clonedSprite = cloneSprite(renderedItems.get(itemId).image.sprite);
      clonedSprite.x = -pile.tempDepileContainer.x;
      pile.tempDepileContainer.addChild(clonedSprite);
      const getPosition = orderer(squareLength);
      let [x, y] = getPosition(index);
      x *= layout.columnWidth;
      y *= layout.rowHeight;

      const options = createOptions(index === items.length - 1);

      animateTempDepileItems(clonedSprite, x, y, options);
    });
  };

  const tempDepile = pileIds => {
    const {
      piles,
      tempDepileDirection,
      tempDepileOneDNum,
      orderer
    } = store.state;

    pileIds.forEach(pileId => {
      const pile = pileInstances.get(pileId);

      animateAlpha(pile.graphics, 1);
      pile.graphics.interactive = true;

      const items = [...piles[pileId].items];

      if (items.length < tempDepileOneDNum) {
        tempDepileOneD({
          pile,
          tempDepileDirection,
          items
        });
      } else {
        tempDepileTwoD({ pile, items, orderer });
      }
      pubSub.publish('pileActive', { pile });

      updatePileBounds(pileId);
    });
    renderRaf();
  };

  const getMousePosition = event => {
    const rect = canvas.getBoundingClientRect();

    return [event.clientX - rect.left, event.clientY - rect.top - stage.y];
  };

  const findPilesInLasso = lassoPolygon => {
    const lassoBBox = getBBox(lassoPolygon);
    const pileBBoxes = spatialIndex.search(lassoBBox);
    const pilesInPolygon = [];
    pileBBoxes.forEach(pileBBox => {
      if (
        isPointInPolygon([pileBBox.minX, pileBBox.minY], lassoPolygon) ||
        isPointInPolygon([pileBBox.minX, pileBBox.maxY], lassoPolygon) ||
        isPointInPolygon([pileBBox.maxX, pileBBox.minY], lassoPolygon) ||
        isPointInPolygon([pileBBox.maxX, pileBBox.maxY], lassoPolygon)
      )
        pilesInPolygon.push(pileBBox.id);
    });

    return pilesInPolygon;
  };

  const lassoEndHandler = () => {
    isLasso = false;
    const lassoPoints = lasso.end();
    const lassoPolygon = lassoPoints.flatMap(translatePointFromScreen);
    drawSpatialIndex(
      [lassoPolygon.length - 2, lassoPolygon.length - 1],
      lassoPolygon
    );
    if (!store.state.temporaryDepiledPiles.length) {
      const pilesInLasso = findPilesInLasso(lassoPolygon);
      if (pilesInLasso.length > 1) {
        store.dispatch(createAction.setFocusedPiles([]));
        animateMerge([pilesInLasso]);
      }
    }
  };

  const animateMerge = (groupsOfPileIds, centerAggregation) => {
    const vMean = n => (aggregate, x) => aggregate + x / n;
    const vMin = () => (aggregate, x) => Math.min(aggregate, x);
    const vMax = () => (aggregate, x) => Math.max(aggregate, x);
    const aggregaters = { x: vMean, y: vMean };
    const startValues = { x: 0, y: 0 };

    switch (centerAggregation) {
      case 'top':
        aggregaters.y = vMin;
        startValues.y = Infinity;
        break;

      case 'bottom':
        aggregaters.y = vMax;
        startValues.y = -Infinity;
        break;

      case 'left':
        aggregaters.x = vMin;
        startValues.x = Infinity;
        break;

      case 'right':
        aggregaters.x = vMax;
        startValues.x = -Infinity;
        break;

      // no default
    }

    return Promise.all(
      groupsOfPileIds.map(
        pileIds =>
          new Promise((resolve, reject) => {
            const { easing, piles } = store.state;
            let finalX = startValues.x;
            let finalY = startValues.y;

            const xAgg = aggregaters.x(pileIds.length);
            const yAgg = aggregaters.y(pileIds.length);

            pileIds.forEach(id => {
              finalX = xAgg(finalX, piles[id].x);
              finalY = yAgg(finalY, piles[id].y);
            });

            const onAllDone = () => {
              updatePileBounds(pileIds[0]);
              resolve(createAction.mergePiles(pileIds, [finalX, finalY]));
            };

            const onDone = () => {
              if (++done === pileIds.length) onAllDone();
            };

            let done = 0;
            animator.addBatch(
              pileIds
                .map(id => {
                  const pileInstance = pileInstances.get(id);
                  if (!pileInstance) reject(new Error(`Pile #${id} not ready`));
                  return animateMovePileTo(
                    pileInstances.get(id),
                    finalX,
                    finalY,
                    {
                      easing,
                      isBatch: true,
                      onDone
                    }
                  );
                })
                .filter(x => {
                  if (x === null) {
                    onDone();
                  }
                  return x;
                })
            );
          })
      )
    ).then(mergeActions => {
      store.dispatch(batchActions(mergeActions));
    });
  };

  const scalePile = (pileId, wheelDelta) => {
    const pile = pileInstances.get(pileId);
    if (pile.magnifyByWheel(wheelDelta)) {
      updatePileBounds(pileId);
    }
    renderRaf();
  };

  const deleteItemAndPile = itemId => {
    if (renderedItems.has(itemId)) {
      renderedItems.get(itemId).destroy();
    }
    renderedItems.delete(itemId);
    deletePileHandler(itemId);
  };

  const deleteItemsAndPiles = items => {
    Object.keys(items).forEach(deleteItemAndPile);
    return Promise.resolve();
  };

  const createPileHandler = (pileId, pileState) => {
    const [x, y] = transformPointToScreen([pileState.x, pileState.y]);

    const items = pileState.items.length
      ? pileState.items.map(itemId => renderedItems.get(itemId))
      : [renderedItems.get(pileId)];

    const newPile = createPile(
      {
        render: renderRaf,
        id: pileId,
        pubSub,
        store
      },
      { x, y }
    );

    pileInstances.set(pileId, newPile);

    if (store.state.coverAggregator) {
      updatePreviewAndCover(pileState, newPile);
    } else {
      newPile.setItems(items);
      positionItems(pileId);
    }

    normalPiles.addChild(newPile.graphics);
    updatePileBounds(pileId);
    updatePileItemStyle(pileState, pileId);
    lastPilePosition.set(pileId, [pileState.x, pileState.y]);
  };

  const deletePileHandler = pileId => {
    if (pileInstances.has(pileId)) {
      pileInstances.get(pileId).destroy();
      deletePileFromSearchIndex(pileId);
    }
    pileInstances.delete(pileId);
    lastPilePosition.delete(pileId);
    delete aggregatedPileValues[pileId];
    // We *do not* delete the cached multi-dimensional position as that
    // position can come in handy when we depile the pile again
  };

  const groupByPosition = (bBoxifier, absComparator, relComparator) => async (
    requirement,
    { conditions = [], centerAggregator = meanVector } = {}
  ) => {
    const { piles } = store.state;
    const alreadyPiledPiles = new Map();
    const newPiles = {};
    const newPilesBBox = {};

    const addPile = (target, hit, value) => {
      if (!newPiles[target.id]) {
        newPiles[target.id] = { [target.id]: true };
        alreadyPiledPiles.set(target.id, [target.id, 1]);
        const w = target.maxX - target.minX;
        const h = target.maxY - target.minY;
        newPilesBBox[target.id] = {
          w,
          h,
          c: [[target.minX + w / 2, target.minY + h / 2]]
        };
      }

      if (newPiles[target.id][hit.id]) return false;

      newPiles[target.id][hit.id] = true;

      alreadyPiledPiles.set(hit.id, [
        target.id,
        relComparator(value, target)[0]
      ]);

      const w = hit.maxX - hit.minX;
      const h = hit.maxY - hit.minY;
      newPilesBBox[target.id].w = Math.max(newPilesBBox[target.id].w, w);
      newPilesBBox[target.id].h = Math.max(newPilesBBox[target.id].h, h);
      newPilesBBox[target.id].c.push([hit.minX + w / 2, hit.minY + h / 2]);

      return true;
    };

    const search = currentTarget => {
      const hits = spatialIndex.search(bBoxifier(currentTarget, requirement));

      let numGroupings = 0;

      if (hits.length === 1) return numGroupings;

      hits.forEach(hit => {
        if (hit.id === currentTarget.id) return;

        const [value, vOkay] = absComparator(currentTarget, hit, requirement);

        const okay =
          vOkay &&
          conditions.every(condition =>
            condition(piles[currentTarget.id], piles[hit.id])
          );

        if (okay) {
          if (
            alreadyPiledPiles.has(hit.id) &&
            !(newPiles[currentTarget.id] && newPiles[currentTarget.id][hit.id])
          ) {
            const [prevTargetId, prevTargetValue] = alreadyPiledPiles.get(
              hit.id
            );

            if (!relComparator(value, currentTarget, prevTargetValue)[1])
              return;

            // New target is closer to overlaps more so we remove the hit
            // from the old pile
            delete newPiles[prevTargetId][hit.id];
          }

          numGroupings += addPile(currentTarget, hit, value);
        }
      });

      return numGroupings;
    };

    spatialIndex.all().forEach(currentTarget => {
      if (alreadyPiledPiles.has(currentTarget.id)) return;

      search(currentTarget);
    });

    // Resolve subsequent overlaps
    let resolved = false;
    while (!resolved) {
      const numNewGroupings = Object.keys(newPiles).reduce(
        (numGroupings, id) => {
          const { w, h, c } = newPilesBBox[id];
          const [cX, cY] = centerAggregator(c);
          const query = {
            id,
            minX: cX - w / 2,
            maxX: cX + w / 2,
            minY: cY - h / 2,
            maxY: cY + h / 2
          };
          return numGroupings + search(query);
        },
        0
      );

      resolved = numNewGroupings === 0;
    }

    return Object.values(newPiles).map(Object.keys);
  };

  const groupByOverlapAbsComparator = (target, hit, sqrtPixels) => {
    const minX = Math.max(target.minX, hit.minX);
    const minY = Math.max(target.minY, hit.minY);
    const maxX = Math.min(target.maxX, hit.maxX);
    const maxY = Math.min(target.maxY, hit.maxY);
    const overlap = (maxX - minX) * (maxY - minY);

    return [overlap, overlap >= sqrtPixels];
  };
  const groupByOverlapRelComparator = (overlap, target, prevRelOverlap) => {
    const newRelOverlap =
      overlap / ((target.maxX - target.minX) * (target.maxY - target.minY));

    return [
      newRelOverlap,
      prevRelOverlap !== undefined && newRelOverlap > prevRelOverlap
    ];
  };
  const groupByOverlap = groupByPosition(
    identity,
    groupByOverlapAbsComparator,
    groupByOverlapRelComparator
  );

  const groupByDistanceBBoxifier = (target, distance) => ({
    minX: target.minX - distance,
    minY: target.minY - distance,
    maxX: target.maxX + distance,
    maxY: target.maxY + distance
  });
  const groupByDistanceAbsComparator = (target, hit, pixels) => {
    const d = l2RectDist(target, hit);
    return [d, d < pixels];
  };
  const groupByDistanceRelComparator = (distance, target, prevDistance) => [
    distance,
    prevDistance === undefined && distance < prevDistance
  ];
  const groupByDistance = groupByPosition(
    groupByDistanceBBoxifier,
    groupByDistanceAbsComparator,
    groupByDistanceRelComparator
  );

  const groupByGrid = async objective => {
    const { orderer, piles } = store.state;

    const { width, height } = canvas.getBoundingClientRect();

    const grid = objective
      ? createGrid({ width, height, orderer }, objective)
      : layout;

    return Object.entries(piles).reduce((groups, [pileId, pileState]) => {
      const ij = grid.xyToIj(pileState.x, pileState.y);
      const idx = grid.ijToIdx(...ij);
      if (!groups[idx]) groups[idx] = [];
      groups[idx].push(pileId);
      return groups;
    }, []);
  };

  const groupByColumn = async () =>
    Object.entries(store.state.piles).reduce((groups, [pileId, pileState]) => {
      if (pileState.items.length) {
        const ij = layout.xyToIj(pileState.x, pileState.y);
        if (!groups[ij[1]]) groups[ij[1]] = [];
        groups[ij[1]].push(pileId);
      }
      return groups;
    }, []);

  const groupByRow = async () =>
    Object.entries(store.state.piles).reduce((groups, [pileId, pileState]) => {
      if (pileState.items.length) {
        const ij = layout.xyToIj(pileState.x, pileState.y);
        if (!groups[ij[0]]) groups[ij[0]] = [];
        groups[ij[0]].push(pileId);
      }
      return groups;
    }, []);

  const groupByCategory = async objective =>
    Object.values(
      Object.entries(store.state.piles).reduce(
        (groups, [pileId, pileState]) => {
          if (!pileState.items.length) return groups;

          const pileCategory = objective
            .map(o =>
              o.aggregator(
                pileState.items.map((itemId, index) =>
                  o.property(
                    store.state.items[itemId],
                    itemId,
                    index,
                    renderedItems.get(itemId)
                  )
                )
              )
            )
            .join('|');

          if (!groups[pileCategory]) groups[pileCategory] = [pileId];
          else groups[pileCategory].push(pileId);

          return groups;
        },
        {}
      )
    );

  const groupByCluster = async (objective, options = {}) => {
    const points = Object.entries(store.state.piles).reduce(
      (data, [pileId, pileState]) => {
        if (!pileState.items.length) return data;

        data.push({
          id: pileId,
          data: objective.flatMap(o =>
            o.aggregator(
              pileState.items.map((itemId, index) =>
                o.property(
                  store.state.items[itemId],
                  itemId,
                  index,
                  renderedItems.get(itemId)
                )
              )
            )
          )
        });

        return data;
      },
      []
    );

    let clusterer = options.clusterer;

    if (!clusterer) {
      const clustererOptions = options.clustererOptions || {};
      let k = clustererOptions.k;
      clustererOptions.valueGetter = x => x.data;

      if (!k) k = Math.max(2, Math.ceil(Math.sqrt(points.length / 2)));

      clusterer = createKmeans(k, clustererOptions);
    }

    const { labels } = await clusterer(points);

    return Object.values(
      Array.from(labels).reduce((piledPiles, label, i) => {
        if (label === -1) return piledPiles;

        if (!piledPiles[label]) piledPiles[label] = [];
        piledPiles[label].push(points[i].id);

        return piledPiles;
      }, {})
    );
  };

  const groupBy = (type, objective = null, options = {}) => {
    const expandedObjective = expandPilingObjective(type, objective);

    let piledPiles = [];
    let mergeCenter = 'mean';

    switch (type) {
      case 'overlap':
        piledPiles = groupByOverlap(expandedObjective, options);
        break;

      case 'distance':
        piledPiles = groupByDistance(expandedObjective, options);
        break;

      case 'grid':
        piledPiles = groupByGrid(expandedObjective);
        break;

      case 'column':
        mergeCenter = expandedObjective;
        piledPiles = groupByColumn(expandedObjective);
        break;

      case 'row':
        mergeCenter = expandedObjective;
        piledPiles = groupByRow(expandedObjective);
        break;

      case 'category':
        piledPiles = groupByCategory(expandedObjective);
        break;

      case 'cluster':
        piledPiles = groupByCluster(expandedObjective, options);
        break;

      // no default
    }

    piledPiles.then(_piledPiles => {
      store.dispatch(createAction.setFocusedPiles([]));

      // If there's only one pile on a pile we can ignore it
      animateMerge(
        _piledPiles.filter(pileIds => pileIds.length > 1),
        mergeCenter
      );
    });

    if ((type === 'distance' || type === 'overlap') && options.onZoom) {
      delete options.onZoom;

      store.dispatch(
        batchActions([
          ...set('groupingOnPile', true, true),
          ...set('groupingOptions', options, true),
          ...set('groupingObjective', expandedObjective, true),
          ...set('groupingType', 'distance', true)
        ])
      );
    }
  };

  const updateNavigationMode = () => {
    const {
      arrangementType,
      arrangementObjective,
      arrangementOptions,
      navigationMode
    } = store.state;

    let changed = false;

    switch (navigationMode) {
      case NAVIGATION_MODE_PAN_ZOOM:
        changed = enablePanZoom();
        break;

      case NAVIGATION_MODE_SCROLL:
        changed = enableScrolling();
        break;

      case NAVIGATION_MODE_AUTO:
      default:
        switch (arrangementType) {
          case 'data':
            if (
              arrangementObjective.length > 1 ||
              arrangementOptions.forceDimReduction
            )
              changed = enablePanZoom();
            else changed = enableScrolling();
            break;

          case 'xy':
          case 'uv':
            changed = enablePanZoom();
            break;

          case 'index':
          case 'ij':
            changed = enableScrolling();
            break;

          default:
          // Nothing
        }
        break;
    }

    if (changed) {
      translatePiles();
      positionPiles();
      updateScrollHeight();
    }
  };

  const aggregatedPileValues = {};
  const pileSortPosByAggregate = [];
  const aggregatedPileMinValues = [];
  const aggregatedPileMaxValues = [];

  const updateAggregatedPileValues = pileIds => {
    const {
      arrangementObjective,
      arrangementOptions,
      items,
      piles
    } = store.state;

    const allPiles = pileIds.length >= pileInstances.size;

    arrangementObjective.forEach((objective, i) => {
      let minValue =
        typeof aggregatedPileMinValues[i] === 'undefined' || allPiles
          ? Infinity
          : aggregatedPileMinValues[i];

      let maxValue =
        typeof aggregatedPileMaxValues[i] === 'undefined' || allPiles
          ? -Infinity
          : aggregatedPileMaxValues[i];

      // When all piles were updated we need to update the min-max value as well
      let shouldUpdateMinMax = allPiles;

      // Even if not all piles were updated we might still need to update the
      // min-max values. This is the when the user piled-up piles with the
      // lowest or highest aggregated value
      if (
        !allPiles &&
        pileSortPosByAggregate[i] &&
        arrangementObjective.length < 3 &&
        !arrangementOptions.forceDimReduction
      ) {
        let minPos = 0;
        let maxPos = pileInstances.size;
        let newMin = false;
        let newMax = false;

        pileIds.forEach(id => {
          const pos = pileSortPosByAggregate[i][id];

          // If the pile that updated was positioned at the current lowest
          // position we're going to increase the lowest position and indicate
          // that we need to get a new min value
          if (pos === minPos) {
            minPos++;
            newMin = true;
            shouldUpdateMinMax = true;
          }

          // Equivalent to how we update the min position
          if (pos === maxPos) {
            maxPos--;
            newMax = true;
            shouldUpdateMinMax = true;
          }
        });

        minValue = newMin
          ? aggregatedPileValues[pileSortPosByAggregate[i].indexOf(minPos)][i]
          : minValue;

        maxValue = newMax
          ? aggregatedPileValues[pileSortPosByAggregate[i].indexOf(maxPos)][i]
          : maxValue;
      }

      pileIds.forEach(pileId => {
        const pileValues = piles[pileId].items.map((itemId, index) =>
          objective.property(
            items[itemId],
            itemId,
            index,
            renderedItems.get(itemId)
          )
        );

        const aggregatedValue = objective.aggregator(pileValues);

        if (aggregatedValue < minValue) {
          minValue = aggregatedValue;
          shouldUpdateMinMax = true;
        }

        if (aggregatedValue > maxValue) {
          maxValue = aggregatedValue;
          shouldUpdateMinMax = true;
        }

        if (!aggregatedPileValues[pileId]) aggregatedPileValues[pileId] = [];

        aggregatedPileValues[pileId][i] = Number.isNaN(aggregatedValue)
          ? // This will ensure that the value is ignored during the sort process
            null
          : aggregatedValue;

        aggregatedPileValues[pileId].splice(arrangementObjective.length);
      });

      pileSortPosByAggregate[i] = sortPos(aggregatedPileValues, {
        getter: v => v[i],
        ignoreNull: true
      });

      if (shouldUpdateMinMax) {
        aggregatedPileMinValues[i] = minValue;
        aggregatedPileMaxValues[i] = maxValue;
      }
    });

    // Remove outdated values
    pileSortPosByAggregate.splice(arrangementObjective.length);
    aggregatedPileMinValues.splice(arrangementObjective.length);
    aggregatedPileMaxValues.splice(arrangementObjective.length);
  };

  let arrangement2dScales = [];
  const updateArrangement2dScales = () => {
    const { arrangementObjective } = store.state;
    const { width, height } = canvas.getBoundingClientRect();
    const rangeMax = [width, height];

    arrangement2dScales = arrangementObjective.map((objective, i) => {
      const currentScale = arrangement2dScales[i];
      const minValue = aggregatedPileMinValues[i];
      const maxValue = aggregatedPileMaxValues[i];

      if (currentScale) {
        const [currentMin, currentMax] = currentScale.domain();

        if (minValue === currentMin && maxValue === currentMax) {
          return arrangement2dScales[i];
        }
      }

      const domain = objective.inverted
        ? [maxValue, minValue]
        : [minValue, maxValue];

      const meanWidth = mean(itemWidthScale.range());
      const meanHeight = mean(itemWidthScale.range());

      return objective
        .scale()
        .domain(domain)
        .range([meanWidth / 2, rangeMax[i] - meanHeight / 2]);
    });

    return Promise.resolve();
  };

  let lastMdReducerRun = 0;
  const updateArrangementMdReducer = async newObjectives => {
    const {
      arrangementObjective,
      arrangementOptions,
      dimensionalityReducer,
      items
    } = store.state;

    if (!dimensionalityReducer) {
      console.warn(
        'No dimensionality reducer provided. Unable to arrange piles by multiple dimensions.'
      );
      return Promise.resolve();
    }

    if (
      lastMdReducerRun &&
      !newObjectives &&
      !arrangementOptions.runDimReductionOnPiles
    ) {
      return Promise.resolve();
    }

    halt();

    // This will ensure that the popup is displayed before we move on
    await nextAnimationFrame();
    const data =
      arrangementOptions.runDimReductionOnPiles === true
        ? Object.values(aggregatedPileValues).filter(x => x[0] !== null)
        : Object.entries(items).map(([itemId, item]) =>
            arrangementObjective.flatMap(objective =>
              objective.property(item, itemId, 0, renderedItems.get(itemId))
            )
          );

    const fitting = dimensionalityReducer.fit(data);
    cachedMdPilePos.clear();

    fitting.then(() => {
      lastMdReducerRun++;
      resume();
    });

    return fitting;
  };

  const updateArragnementByData = (pileIds, newObjectives) => {
    const { arrangementObjective, arrangementOptions } = store.state;

    updateAggregatedPileValues(pileIds);

    if (
      arrangementObjective.length > 2 ||
      arrangementOptions.forceDimReduction
    ) {
      return updateArrangementMdReducer(newObjectives);
    }

    if (arrangementObjective.length > 1) {
      return updateArrangement2dScales(pileIds);
    }

    // We only need to update the aggregated values for ordering
    return Promise.resolve();
  };

  const updateArrangement = async (updatedPileIds, newObjectives) => {
    const { arrangementType, piles } = store.state;

    const pileIds = updatedPileIds.length ? updatedPileIds : Object.keys(piles);

    if (arrangementType === 'data') {
      arranging = updateArragnementByData(pileIds, newObjectives);
    }

    await arranging;

    updateNavigationMode();
  };

  const cancelArrangement = () => {
    if (store.state.arrangementType === null) return;

    store.dispatch(
      batchActions([
        ...set('arrangementOnPile', false, true),
        ...set('arrangementOptions', {}, true),
        ...set('arrangementObjective', null, true),
        ...set('arrangementType', null, true)
      ])
    );
  };

  const uniqueLabels = new Map();
  const idToLabel = new Map();

  const createUniquePileLabels = () => {
    const {
      items,
      pileLabel,
      pileLabelColor,
      pileLabelText,
      pileLabelFontSize
    } = store.state;

    // Destroy existing labels to avoid memory leaks
    uniqueLabels.forEach(label => {
      label.pixiText.destroy();
    });

    uniqueLabels.clear();
    idToLabel.clear();

    const tmp = new Set();

    Object.values(items).forEach(item => {
      const label = pileLabel.flatMap(objective => objective(item)).join('-');

      idToLabel.set(item.id, label);

      if (!tmp.has(label) && label) {
        uniqueLabels.set(label, { text: label, index: tmp.size });
        tmp.add(label);
      }
    });

    uniqueLabels.forEach(label => {
      let color;

      if (isFunction(pileLabelColor)) {
        color = colorToDecAlpha(pileLabelColor(label.text, uniqueLabels))[0];
      } else if (Array.isArray(pileLabelColor)) {
        color = colorToDecAlpha(pileLabelColor[label.index])[0];
      } else {
        const n = DEFAULT_COLOR_MAP.length;
        color = colorToDecAlpha(DEFAULT_COLOR_MAP[label.index % n])[0];
      }

      label.color = color;

      if (pileLabelText) {
        let labelText = label.text;

        if (isFunction(pileLabelText)) {
          labelText = pileLabelText(label.text, uniqueLabels);
        }
        if (Array.isArray(pileLabelText)) {
          labelText = pileLabelText[label.index];
        }

        const pixiText = new PIXI.Text(labelText, {
          fontSize: pileLabelFontSize * 2 * window.devicePixelRatio,
          align: 'center'
        });
        pixiText.updateText();
        label.texture = pixiText.texture;
        label.pixiText = pixiText;
      }
    });
  };

  const setPileLabel = (pileState, pileId, reset = false) => {
    const pileInstance = pileInstances.get(pileId);

    if (!store.state.pileLabel || !pileInstance) return;

    const { pileLabel, items } = store.state;

    if (!idToLabel.size || reset) createUniquePileLabels();

    const labels = unique(
      pileState.items.flatMap(itemId =>
        pileLabel.map(objective => objective(items[itemId]))
      )
    );

    const args = labels.reduce(
      (_args, labelText) => {
        const label =
          labelText && labelText.toString
            ? uniqueLabels.get(labelText.toString()) || UNKNOWN_LABEL
            : UNKNOWN_LABEL;
        _args[0].push(label.text);
        _args[1].push(label.color);
        _args[2].push(label.texture);
        return _args;
      },
      [[], [], []]
    );

    pileInstance.drawLabel(...args);
  };

  const itemUpdates = [];
  const itemUpdatesConsequences = [];

  let itemUpdateCalls = 0;
  const awaitItemUpdates = newItemUpdates => {
    if (newItemUpdates.length) {
      // Add updates
      itemUpdates.push(...newItemUpdates);

      // We need to keep track of the update call as promises can be canceled
      // and we really only want to apply the consequences once all the item
      // updates finished.
      const itemUpdateCall = ++itemUpdateCalls;
      Promise.all(itemUpdates)
        .then(() => {
          if (itemUpdateCall === itemUpdateCalls) {
            // Apply all consequences and wait for them to finish
            return Promise.all(
              itemUpdatesConsequences.map(consequence => consequence())
            );
          }
          return undefined; // No further actions
        })
        .then(() => {
          // Clear consequences and updates
          itemUpdatesConsequences.splice(0, itemUpdatesConsequences.length);
          itemUpdates.splice(0, itemUpdates.length);
          pubSub.publish('itemUpdate');
        });
    }
  };

  const updated = () => {
    const newState = store.state;

    const stateUpdates = new Set();

    const currentItemUpdates = [];
    const updatedPileItems = [];

    if (state.items !== newState.items && state.itemRenderer) {
      const deletedItems = { ...state.items };
      const newItems = {};
      const updatedItems = {};

      Object.entries(newState.items).forEach(([id, item]) => {
        if (state.items[id]) {
          if (item.src !== state.items[id].src) {
            updatedItems[id] = item;
          }
        } else {
          newItems[id] = item;
        }
        delete deletedItems[id];
      });

      const numNewItems = Object.keys(newItems).length;
      const numUpdatedItems = Object.keys(updatedItems).length;
      const numDeletedItems = Object.keys(deletedItems).length;

      if (numNewItems) {
        currentItemUpdates.push(createItemsAndPiles(newItems));
      }

      if (numUpdatedItems) {
        currentItemUpdates.push(updateItemTexture(updatedItems));
      }

      if (numDeletedItems) {
        currentItemUpdates.push(deleteItemsAndPiles(deletedItems));
      }

      if (numNewItems || numDeletedItems) {
        stateUpdates.add('grid');
        stateUpdates.add('layout');
      }
    }

    if (
      Object.values(newState.items).length &&
      (state.itemRenderer !== newState.itemRenderer ||
        state.previewRenderer !== newState.previewRenderer ||
        state.coverRenderer !== newState.coverRenderer ||
        state.previewAggregator !== newState.previewAggregator ||
        state.coverAggregator !== newState.coverAggregator)
    ) {
      if (renderedItems.size) {
        currentItemUpdates.push(updateItemTexture());
      } else {
        // In case the user first setup the items and then defined the renderer
        currentItemUpdates.push(createItemsAndPiles(newState.items));
      }
    }

    if (state.itemSizeRange !== newState.itemSizeRange) {
      stateUpdates.add('layout');
    }

    if (state.piles !== newState.piles) {
      if (Object.keys(state.piles).length) {
        // Piles are bound to items such there must be a 1-to-1 relationship.
        // Hence, piles are created and deleted together with items. Note that this
        // does not mean that all items always have to be visible. The visibility
        // depends on the membership of items in some pile.
        const updatedPiles = {};

        Object.entries(newState.piles).forEach(([id, pile]) => {
          if (state.piles[id]) {
            if (pile !== state.piles[id]) {
              updatedPiles[id] = pile;
            }
          }
        });

        // Update piles
        Object.entries(updatedPiles).forEach(([id, pile]) => {
          if (pile.items.length !== state.piles[id].items.length) {
            updatePileItems(pile, id);
            updatedPileItems.push(id);
          }

          if (
            (pile.x !== state.piles[id].x || pile.y !== state.piles[id].y) &&
            pile.items.length !== 0
          ) {
            updatePilePosition(pile, id);
          }

          updatePileStyle(pile, id);
          setPileLabel(pile, id);
        });
      }
    }

    if (
      pileInstances.size &&
      (state.pileLabel !== newState.pileLabel ||
        state.pileLabelColor !== newState.pileLabelColor ||
        state.pileLabelText !== newState.pileLabelText ||
        state.pileLabelAlign !== newState.pileLabelAlign ||
        state.pileLabelFontSize !== newState.pileLabelFontSize ||
        state.pileLabelHeight !== newState.pileLabelHeight ||
        state.pileLabelStackAlign !== newState.pileLabelStackAlign)
    ) {
      Object.entries(newState.piles).forEach(([id, pile], index) => {
        setPileLabel(pile, id, !index);
      });
    }

    if (
      pileInstances.size &&
      (state.pileItemOpacity !== newState.pileItemOpacity ||
        state.pileItemBrightness !== newState.pileItemBrightness ||
        state.pileItemInvert !== newState.pileItemInvert ||
        state.pileItemTint !== newState.pileItemTint)
    ) {
      Object.entries(newState.piles).forEach(([id, pile]) => {
        updatePileItemStyle(pile, id);
      });
    }

    if (
      pileInstances.size &&
      (state.pileOpacity !== newState.pileOpacity ||
        state.pileBorderSize !== newState.pileBorderSize ||
        state.pileScale !== newState.pileScale)
    ) {
      Object.entries(newState.piles).forEach(([id, pile]) => {
        updatePileStyle(pile, id);
      });
    }

    if (state.orderer !== newState.orderer) {
      stateUpdates.add('layout');
    }

    if (
      state.itemSize !== newState.itemSize ||
      state.columns !== newState.columns ||
      state.rowHeight !== newState.rowHeight ||
      state.cellAspectRatio !== newState.cellAspectRatio ||
      state.cellPadding !== newState.cellPadding ||
      state.cellSize !== newState.cellSize ||
      state.orderer !== newState.orderer ||
      state.pileCellAlignment !== newState.pileCellAlignment
    ) {
      stateUpdates.add('grid');
      stateUpdates.add('layout');
    }

    if (state.pileItemOffset !== newState.pileItemOffset) {
      stateUpdates.add('layout');
    }

    if (state.previewItemOffset !== newState.previewItemOffset) {
      stateUpdates.add('layout');
    }

    if (state.pileItemRotation !== newState.pileItemRotation) {
      stateUpdates.add('layout');
    }

    if (state.tempDepileDirection !== newState.tempDepileDirection) {
      stateUpdates.add('layout');
    }

    if (state.tempDepileOneDNum !== newState.tempDepileOneDNum) {
      stateUpdates.add('layout');
    }

    if (state.temporaryDepiledPiles !== newState.temporaryDepiledPiles) {
      if (state.temporaryDepiledPiles.length) {
        closeTempDepile(state.temporaryDepiledPiles);
      }

      if (newState.temporaryDepiledPiles.length) {
        pileInstances.forEach(otherPile => {
          animateAlpha(otherPile.graphics, 0.1);
          otherPile.graphics.interactive = false;
        });

        tempDepile(newState.temporaryDepiledPiles);
      } else {
        pileInstances.forEach(otherPile => {
          animateAlpha(otherPile.graphics, 1);
          otherPile.graphics.interactive = true;
        });
      }
    }

    if (state.focusedPiles !== newState.focusedPiles) {
      // Unset previously focused pile
      if (pileInstances.has(state.focusedPiles[0])) {
        const pile = pileInstances.get(state.focusedPiles[0]);
        if (!pile.isTempDepiled) {
          pile.blur();
          pile.isFocus = false;
        }
      }

      // Set newly focused pile if any
      if (newState.focusedPiles.length !== 0) {
        const pile = pileInstances.get(newState.focusedPiles[0]);
        if (pile.isTempDepiled) {
          pile.active();
        } else {
          pile.focus();
        }
        pile.isFocus = true;
        pubSub.publish('pileFocus', { pile });
      } else {
        const pile = pileInstances.get(state.focusedPiles[0]);
        pubSub.publish('pileBlur', { pile });
      }

      renderRaf();
    }

    if (state.magnifiedPiles !== newState.magnifiedPiles) {
      state.magnifiedPiles
        .map(scaledPile => pileInstances.get(scaledPile))
        .filter(scaledPileInstance => scaledPileInstance)
        .forEach(scaledPileInstance => {
          // We currently allow only one item to be magnified up so all
          // previously magnified piles are reset
          scaledPileInstance.unmagnify();
          updatePileBounds(scaledPileInstance.id);
          clearActivePileLayer();
        });

      newState.magnifiedPiles
        .map(scaledPile => pileInstances.get(scaledPile))
        .filter(scaledPileInstance => scaledPileInstance)
        .forEach(scaledPileInstance => {
          scaledPileInstance.magnify();
          moveToActivePileLayer(scaledPileInstance.graphics);
        });

      renderRaf();
    }

    if (state.depileMethod !== newState.depileMethod) {
      stateUpdates.add('layout');
    }

    if (state.depiledPile !== newState.depiledPile) {
      if (newState.depiledPile.length !== 0) depile(newState.depiledPile[0]);
    }

    if (state.previewSpacing !== newState.previewSpacing) {
      stateUpdates.add('layout');
    }

    if (state.showGrid !== newState.showGrid) {
      if (newState.showGrid) drawGrid();
      else clearGrid();
    }

    // prettier-ignore
    if (
      Object.keys(newState.items).length &&
      (
        state.arrangementType !== newState.arrangementType ||
        state.arrangementObjective !== newState.arrangementObjective ||
        (
          newState.arrangementType &&
          (
            (currentItemUpdates.length || updatedPileItems.length) ||
            (
              newState.arrangementObjective.length > 2 &&
              state.dimensionalityReducer !== newState.dimensionalityReducer
            )
          )
        )
      )
    ) {
      stateUpdates.add('layout');

      const arrangementUpdater = ((_updatedPileItems, newObjective) => async () =>
        updateArrangement(_updatedPileItems, newObjective)
      )([...updatedPileItems], state.arrangementObjective !== newState.arrangementObjective)

      if (currentItemUpdates.length) {
        itemUpdatesConsequences.push(arrangementUpdater);
      } else {
        arrangementUpdater();
      }
    }

    if (state.navigationMode !== newState.navigationMode) {
      stateUpdates.add('navigation');
    }

    if (
      state.darkMode !== newState.darkMode ||
      state.haltBackgroundOpacity !== newState.haltBackgroundOpacity
    ) {
      updateHalt();
    }

    if (state.darkMode !== newState.darkMode) {
      updateLevels();
      if (newState.darkMode) {
        backgroundColor = BLACK;
        addClass(rootElement, 'pilingjs-darkmode');
      } else {
        backgroundColor = WHITE;
        removeClass(rootElement, 'pilingjs-darkmode');
      }
    }

    if (
      state.darkMode !== newState.darkMode ||
      state.lassoFillColor !== newState.lassoFillColor ||
      state.lassoFillOpacity !== newState.lassoFillOpacity ||
      state.lassoShowStartIndicator !== newState.lassoShowStartIndicator ||
      state.lassoStartIndicatorOpacity !==
        newState.lassoStartIndicatorOpacity ||
      state.lassoStrokeColor !== newState.lassoStrokeColor ||
      state.lassoStrokeOpacity !== newState.lassoStrokeOpacity ||
      state.lassoStrokeSize !== newState.lassoStrokeSize
    ) {
      updateLasso();
    }

    state = newState;

    pubSub.publish('update', { action: store.lastAction });

    // Consequential updates that cause new actions to be dispatched
    if (stateUpdates.has('grid')) {
      updateGrid();
    }

    if (
      stateUpdates.has('layout') ||
      currentItemUpdates.length > 0 ||
      updatedPileItems.length > 0
    ) {
      const positionUpdater = (_updatedPileItems => async () =>
        positionPiles(_updatedPileItems))([...updatedPileItems]);

      if (currentItemUpdates.length) {
        itemUpdatesConsequences.push(positionUpdater);
      } else {
        positionUpdater();
      }
    }

    if (stateUpdates.has('navigation')) {
      updateNavigationMode();
    }

    awaitItemUpdates(currentItemUpdates);
  };

  const resetPileBorder = () => {
    pileInstances.forEach(pile => {
      if (!pile.isFocus) {
        pile.blur();
      }
    });
  };

  const exportState = () => store.export();

  const importState = (newState, overwriteState = false) => {
    store.import(newState, overwriteState);
    resetPileBorder();
  };

  const expandProperty = objective => {
    if (isFunction(objective)) {
      return objective;
    }
    return itemState => itemState[objective];
  };

  const expandNumericalAggregator = objective => {
    if (isFunction(objective.aggregator)) return objective.aggregator;

    switch (objective.aggregator) {
      case 'max':
        return objective.propertyIsVector ? maxVector : max;

      case 'median':
        return objective.propertyIsVector ? medianVector : median;

      case 'min':
        return objective.propertyIsVector ? minVector : min;

      case 'sum':
        return objective.propertyIsVector ? sumVector : sum;

      case 'mean':
      default:
        return objective.propertyIsVector ? meanVector : mean;
    }
  };

  const expandScale = scale => {
    if (isFunction(scale)) return scale;

    switch (scale) {
      case 'linear':
      default:
        return scaleLinear;
    }
  };

  const expandArrangementObjectiveData = arrangementObjective => {
    if (!Array.isArray(arrangementObjective)) {
      // eslint-disable-next-line no-param-reassign
      arrangementObjective = [arrangementObjective];
    }
    const expandedArrangementObjective = [];

    arrangementObjective.forEach(objective => {
      const expandedObjective = {};

      if (objective.constructor !== Object) {
        expandedObjective.property = expandProperty(objective);
        expandedObjective.aggregator = objective.propertyIsVector
          ? meanVector
          : mean;
        expandedObjective.scale = scaleLinear;
        expandedObjective.inverse = false;
      } else {
        expandedObjective.property = expandProperty(objective.property);
        expandedObjective.aggregator = expandNumericalAggregator(objective);
        expandedObjective.scale = expandScale(objective.scale);
        expandedObjective.inverse = !!objective.inverse;
      }

      expandedArrangementObjective.push(expandedObjective);
    });
    return expandedArrangementObjective;
  };

  const expandArrangementObjectiveCoords = (objective, is2d) => {
    const expandedObjective = {};

    if (objective.constructor !== Object) {
      expandedObjective.property = expandProperty(objective);
      expandedObjective.isCustom = isFunction(objective);
      expandedObjective.aggregator = is2d ? meanVector : mean;
    } else {
      expandedObjective.property = expandProperty(objective.property);
      expandedObjective.aggregator = expandNumericalAggregator(objective);
    }

    return expandedObjective;
  };

  const arrangeBy = (type = null, objective = null, options = {}) => {
    let expandedObjective = objective;

    switch (type) {
      case 'data':
        expandedObjective = expandArrangementObjectiveData(objective);
        break;

      case 'xy':
      case 'ij':
      case 'uv':
        expandedObjective = expandArrangementObjectiveCoords(objective, true);
        break;

      case 'index':
        expandedObjective = expandArrangementObjectiveCoords(objective);
        break;

      // no default
    }

    const onPile = !!options.onPile;
    delete options.onPile;

    store.dispatch(
      batchActions([
        ...set('arrangementOnPile', onPile, true),
        ...set('arrangementOptions', options, true),
        ...set('arrangementObjective', expandedObjective, true),
        ...set('arrangementType', type, true)
      ])
    );
  };

  const expandPilingObjectiveOverlap = objective =>
    objective && objective.length === 1
      ? [objective[0], objective[0]]
      : objective || 1;

  const expandPilingObjectiveGrid = objective => {
    let expandedObjective = null;

    if (isObject(objective)) {
      expandedObjective = { ...expandedObjective, ...objective };
    } else if (+objective) {
      expandedObjective.columns = {
        columns: +objective,
        cellAspectRatio: layout.cellAspectRatio
      };
    }

    return expandedObjective;
  };

  const expandPilingObjectiveDistance = objective =>
    objective.length === 1 ? [objective[0], objective[0]] : objective;

  const expandPilingObjectiveCategory = objective => {
    const objectives = Array.isArray(objective) ? objective : [objective];

    return objectives.map(_objective => {
      const expandedObjective = {};

      if (isObject(objective)) {
        expandedObjective.property = expandProperty(_objective.property);
        expandedObjective.aggregator = isFunction(_objective.aggregator)
          ? _objective.aggregator
          : uniqueStr;
      } else {
        expandedObjective.property = expandProperty(_objective);
        expandedObjective.aggregator = uniqueStr;
      }

      return expandedObjective;
    });
  };

  const expandPilingObjectiveCluster = objective => {
    const objectives = Array.isArray(objective) ? objective : [objective];

    return objectives.map(_objective => {
      const expandedObjective = {};

      if (_objective.constructor !== Object) {
        expandedObjective.property = expandProperty(_objective);
        expandedObjective.aggregator = objective.propertyIsVector
          ? meanVector
          : mean;
      } else {
        expandedObjective.property = expandProperty(_objective.property);
        expandedObjective.aggregator = expandNumericalAggregator(_objective);
      }

      return expandedObjective;
    });
  };

  const expandPilingObjective = (type, objective) => {
    switch (type) {
      case 'overlap':
        return expandPilingObjectiveOverlap(objective);

      case 'grid':
        return expandPilingObjectiveGrid(objective);

      case 'distance':
        return expandPilingObjectiveDistance(objective);

      case 'category':
        return expandPilingObjectiveCategory(objective);

      case 'cluster':
        return expandPilingObjectiveCluster(objective);

      default:
        return objective;
    }
  };

  const expandLabelObjective = objective => {
    const objectives = Array.isArray(objective) ? objective : [objective];
    return objectives.map(_objective => expandProperty(_objective));
  };

  const animateDropMerge = (sourcePileId, targetPileId) => {
    const { piles } = store.state;
    const x = piles[targetPileId].x;
    const y = piles[targetPileId].y;

    const onDone = () => {
      store.dispatch(
        createAction.mergePiles(
          [sourcePileId, targetPileId],
          [x, y],
          targetPileId
        )
      );
    };

    animateMovePileTo(pileInstances.get(sourcePileId), x, y, { onDone });
  };

  let hit;

  const pileDragEndHandler = ({ pileId }) => {
    hit = false;
    const pile = pileInstances.get(pileId);
    const pileGfx = pile.graphics;

    if (pile.x !== pileGfx.beforeDragX || pile.y !== pileGfx.beforeDragY) {
      const searchBBox = calcPileBBox(pileId);
      const collidePiles = spatialIndex
        .search(searchBBox)
        .filter(collidePile => collidePile.id !== pileId);

      // only one pile is colliding with the pile
      if (collidePiles.length === 1) {
        if (!pile.isTempDepiled) {
          const targetPileId = collidePiles[0].id;
          const targetPile = pileInstances.get(targetPileId);
          const targetPileState = store.state.piles[targetPileId];
          hit = !targetPile.isTempDepiled;
          if (hit) {
            // TODO: The drop merge animation code should be unified

            // This is needed for the drop merge animation of the pile class
            pile.items.forEach(pileItem => {
              pileItem.item.tmpAbsX = pileGfx.x;
              pileItem.item.tmpAbsY = pileGfx.y;
              pileItem.item.tmpRelScale = pile.scale;
            });

            if (store.state.previewAggregator) {
              animateDropMerge(pileId, targetPileId);
            } else {
              store.dispatch(
                createAction.mergePiles(
                  [pileId, targetPileId],
                  [targetPileState.x, targetPileState.y],
                  targetPileId
                )
              );
            }
          }
        }
      } else {
        // We need to "untransform" the position of the pile
        const [x, y] = transformPointFromScreen([pile.x, pile.y]);
        store.dispatch(
          createAction.movePiles([
            {
              id: pileId,
              x,
              y
            }
          ])
        );
      }
    }
    // if not colliding, add the pile back to normalPiles container
    if (!hit) {
      clearActivePileLayer();
    }
  };

  let previouslyHoveredPiles = [];

  const blurPrevHoveredPiles = () => {
    previouslyHoveredPiles
      .map(pile => pileInstances.get(pile.id))
      .filter(identity)
      .forEach(pile => {
        pile.blur();
      });

    previouslyHoveredPiles = [];
  };

  const highlightHoveringPiles = pileId => {
    if (store.state.temporaryDepiledPiles.length) return;

    const currentlyHoveredPiles = spatialIndex.search(calcPileBBox(pileId));

    blurPrevHoveredPiles();

    currentlyHoveredPiles
      .map(pile => pileInstances.get(pile.id))
      .filter(identity)
      .forEach(pile => {
        pile.hover();
      });

    previouslyHoveredPiles = [...currentlyHoveredPiles];
  };

  const pileDragStartHandler = ({ pileId, event }) => {
    const pile = pileInstances.get(pileId);

    if (pile && pile.isMagnified) {
      const mousePos = event.data.getLocalPosition(pile.graphics.parent);

      pile.graphics.draggingMouseOffset[0] /= pile.magnification;
      pile.graphics.draggingMouseOffset[1] /= pile.magnification;
      animateMovePileTo(
        pile,
        mousePos.x - pile.graphics.draggingMouseOffset[0],
        mousePos.y - pile.graphics.draggingMouseOffset[1]
      );
    }

    store.dispatch(createAction.setMagnifiedPiles([]));

    moveToActivePileLayer(pileInstances.get(pileId).graphics);
    highlightHoveringPiles(pileId);
  };

  const pileDragMoveHandler = ({ pileId }) => {
    highlightHoveringPiles(pileId);
  };

  const hideContextMenu = contextMenuElement => {
    contextMenuElement.style.display = 'none';
    rootElement.removeChild(contextMenuElement);
  };

  const depileBtnClick = (contextMenuElement, pileId) => () => {
    const { depileMethod } = store.state;

    if (depileMethod === 'originalPos') {
      depileToOriginPos(pileId);
    } else if (depileMethod === 'cloestPos') {
      store.dispatch(createAction.setDepiledPile([pileId]));
    }
    store.dispatch(createAction.setFocusedPiles([]));
    hideContextMenu(contextMenuElement);
  };

  const tempDepileBtnClick = (contextMenuElement, pileId) => () => {
    const { piles, temporaryDepiledPiles } = store.state;
    if (piles[pileId].items.length > 1) {
      let temp = [...temporaryDepiledPiles];
      if (temp.includes(pileId)) {
        temp = temp.filter(id => id !== pileId);
      } else {
        temp = [pileId];
      }
      store.dispatch(createAction.setTemporaryDepiledPiles([...temp]));
    }
    hideContextMenu(contextMenuElement);
  };

  const toggleGridBtnClick = contextMenuElement => () => {
    const { showGrid } = store.state;

    store.dispatch(createAction.setShowGrid(!showGrid));

    hideContextMenu(contextMenuElement);

    renderRaf();
  };

  const pileMagnificationHandler = (contextMenuElement, pileId) => () => {
    const pile = pileInstances.get(pileId);
    if (pile.isMagnified) {
      store.dispatch(createAction.setMagnifiedPiles([]));
    } else {
      store.dispatch(createAction.setMagnifiedPiles([pileId]));
    }

    hideContextMenu(contextMenuElement);
  };

  let mouseDownPosition = [0, 0];

  const mouseDownHandler = event => {
    if (event.button === 0) {
      renderRaf();

      mouseDownPosition = getMousePosition(event);
      const mouseDownPosRel = translatePointFromScreen(mouseDownPosition);

      // whether mouse click on any pile
      isMouseDown = !spatialIndex.collides({
        minX: mouseDownPosRel[0],
        minY: mouseDownPosRel[1],
        maxX: mouseDownPosRel[0] + 1,
        maxY: mouseDownPosRel[1] + 1
      });
      drawSpatialIndex(mouseDownPosRel);
    }
  };

  const mouseUpHandler = () => {
    if (isMouseDown) {
      if (isLasso) {
        lassoEndHandler();
      } else if (isPanZoom) {
        panZoomEndHandler();
      }
    }
    isMouseDown = false;
  };

  const mouseMoveHandler = event => {
    if (isMouseDown) {
      if (event.shiftKey || isLasso) {
        lasso.extendDb(getMousePosition(event));
      } else if (isPanZoom) {
        panZoomHandler(false);
      }
    }
  };

  let isClicked = false;

  const mouseClickHandler = event => {
    // when double click, avoid click handler
    if (isClicked) {
      isClicked = false;
      return;
    }

    isClicked = true;

    setTimeout(() => {
      isClicked = false;
    }, 500);

    const contextMenuElement = rootElement.querySelector(
      '#piling-js-context-menu'
    );
    const closedContextMenu = !!contextMenuElement;
    if (closedContextMenu) rootElement.removeChild(contextMenuElement);

    const currMousePos = getMousePosition(event);

    // click event: only when mouse down pos and mouse up pos are the same
    if (
      currMousePos[0] === mouseDownPosition[0] &&
      currMousePos[1] === mouseDownPosition[1]
    ) {
      const currMousePosRel = translatePointFromScreen(currMousePos);
      const results = spatialIndex.search({
        minX: currMousePosRel[0],
        minY: currMousePosRel[1],
        maxX: currMousePosRel[0] + 1,
        maxY: currMousePosRel[1] + 1
      });

      if (results.length !== 0) {
        if (event.shiftKey) {
          const { depileMethod } = store.state;
          if (depileMethod === 'originalPos') {
            depileToOriginPos(results[0].id);
          } else if (depileMethod === 'cloestPos') {
            store.dispatch(createAction.setDepiledPile([results[0].id]));
          }
          store.dispatch(createAction.setFocusedPiles([]));
        } else if (event.altKey) {
          results.forEach(result => {
            const pile = pileInstances.get(result.id);
            if (pile.graphics.isHover) {
              if (pile.isMagnified) {
                store.dispatch(createAction.setMagnifiedPiles([]));
              } else {
                store.dispatch(createAction.setMagnifiedPiles([result.pileId]));
              }
            }
          });
        } else {
          results.forEach(result => {
            const pile = pileInstances.get(result.id);
            if (pile.graphics.isHover) {
              store.dispatch(createAction.setFocusedPiles([result.id]));
            }
          });
        }
      } else {
        if (!closedContextMenu) lasso.showStartIndicator(mouseDownPosition);
        if (store.state.focusedPiles.length)
          store.dispatch(createAction.setFocusedPiles([]));
        if (store.state.magnifiedPiles.length)
          store.dispatch(createAction.setMagnifiedPiles([]));
      }
    }
  };

  const mouseDblClickHandler = event => {
    const currMousePos = getMousePosition(event);
    const currMousePosRel = translatePointFromScreen(currMousePos);

    const { temporaryDepiledPiles, piles } = store.state;

    const result = spatialIndex.search({
      minX: currMousePosRel[0],
      minY: currMousePosRel[1],
      maxX: currMousePosRel[0] + 1,
      maxY: currMousePosRel[1] + 1
    });

    if (result.length !== 0 && !temporaryDepiledPiles.length) {
      if (piles[result[0].id].items.length > 1) {
        let temp = [...temporaryDepiledPiles];
        if (temp.includes(result[0].id)) {
          temp = temp.filter(id => id !== result[0].id);
        } else {
          temp = [result[0].id];
        }
        store.dispatch(createAction.setTemporaryDepiledPiles([...temp]));
      }
    } else {
      store.dispatch(createAction.setTemporaryDepiledPiles([]));
      store.dispatch(createAction.setFocusedPiles([]));
    }
  };

  const wheelHandler = event => {
    if (event.altKey) {
      const currMousePos = getMousePosition(event);
      const currMousePosRel = translatePointFromScreen(currMousePos);

      const result = spatialIndex.search({
        minX: currMousePosRel[0],
        minY: currMousePosRel[1],
        maxX: currMousePosRel[0] + 1,
        maxY: currMousePosRel[1] + 1
      });

      if (result.length !== 0) {
        event.preventDefault();
        store.dispatch(createAction.setMagnifiedPiles([result[0].pileId]));
        scalePile(result[0].id, normalizeWheel(event).pixelY);
      }
    } else if (isPanZoom) {
      panZoomHandler();
    }
  };

  const mouseScrollHandler = () => {
    stage.y = -scrollContainer.scrollTop;
    renderRaf();
  };

  const resizeHandler = () => {
    const { width, height } = rootElement.getBoundingClientRect();

    renderer.resize(width, height);

    mask
      .beginFill(0xffffff)
      .drawRect(0, 0, width, height)
      .endFill();

    updateGrid();
  };

  const resizeHandlerDb = debounce(resizeHandler, 500);

  const alignByGrid = () => {
    const pileMovements = layout.align(pileInstances);

    const tweeners = [];

    pileMovements
      .filter(({ id, x, y }) => {
        const pile = pileInstances.get(id);
        const d = l2PointDist(x, y, pile.x, pile.y);

        if (d < 3) {
          movePileTo(pile, x, y);
          updatePileBounds(pile.id);
          return false;
        }

        return true;
      })
      .forEach(({ id, x, y }, index, array) => {
        const pile = pileInstances.get(id);
        const d = l2PointDist(x, y, pile.x, pile.y);

        tweeners.push(
          createTweener({
            duration: Math.max(125, cubicOut(Math.min(d, 250) / 250) * 250),
            interpolator: interpolateVector,
            endValue: [x, y],
            getter: () => {
              return [pile.x, pile.y];
            },
            setter: xy => {
              movePileTo(pile, xy[0], xy[1]);
            },
            onDone: () => {
              updatePileBounds(pile.id);
              if (index === array.length - 1) {
                store.dispatch(createAction.movePiles(pileMovements));
                createRBush();
                updateScrollHeight();
                renderRaf();
              }
            }
          })
        );
      });

    animator.addBatch(tweeners);
  };

  const closeContextMenu = () => {
    const contextMenuElement = rootElement.querySelector(
      '#piling-js-context-menu'
    );
    if (contextMenuElement) rootElement.removeChild(contextMenuElement);
  };

  const alignByGridClickHandler = () => {
    alignByGrid();
    closeContextMenu();
  };

  const browseSeparatelyHandler = (contextMenuElement, pileId) => () => {
    levels.enter([pileId]);
    depileToOriginPos(pileId);
    hideContextMenu(contextMenuElement);
  };

  const contextmenuHandler = event => {
    closeContextMenu();

    const currMousePos = getMousePosition(event);
    const currMousePosRel = translatePointFromScreen(currMousePos);

    if (event.altKey) return;

    const { pileContextMenuItems, showGrid } = store.state;

    event.preventDefault();

    const results = spatialIndex.search({
      minX: currMousePosRel[0],
      minY: currMousePosRel[1],
      maxX: currMousePosRel[0] + 1,
      maxY: currMousePosRel[1] + 1
    });

    const clickedOnPile = results.length > 0;

    const element = createContextMenu({
      customItems: pileContextMenuItems.filter(
        item => item.label && item.callback
      )
    });
    rootElement.appendChild(element);

    const depileBtn = element.querySelector('#depile-button');
    const tempDepileBtn = element.querySelector('#temp-depile-button');
    const browseSeparatelyBtn = element.querySelector('#browse-separately');
    const toggleGridBtn = element.querySelector('#grid-button');
    const alignBtn = element.querySelector('#align-button');
    const magnifyBtn = element.querySelector('#magnify-button');

    // click on pile
    if (clickedOnPile) {
      toggleGridBtn.style.display = 'none';
      alignBtn.style.display = 'none';

      let pile;
      results.forEach(result => {
        if (pileInstances.get(result.id).graphics.isHover) {
          pile = pileInstances.get(result.id);
        }
      });

      if (pile && pile.size === 1) {
        depileBtn.setAttribute('disabled', '');
        depileBtn.setAttribute('class', 'inactive');
        tempDepileBtn.setAttribute('disabled', '');
        tempDepileBtn.setAttribute('class', 'inactive');
        browseSeparatelyBtn.setAttribute('disabled', '');
        browseSeparatelyBtn.setAttribute('class', 'inactive');
      } else if (pile.isTempDepiled) {
        depileBtn.setAttribute('disabled', '');
        depileBtn.setAttribute('class', 'inactive');
        magnifyBtn.setAttribute('disabled', '');
        magnifyBtn.setAttribute('class', 'inactive');
        browseSeparatelyBtn.setAttribute('disabled', '');
        browseSeparatelyBtn.setAttribute('class', 'inactive');
        tempDepileBtn.innerHTML = 'close temp depile';
      }

      if (pile.isMagnified) {
        magnifyBtn.innerHTML = 'Unmagnify';
      }

      element.style.display = 'block';

      const { width } = element.getBoundingClientRect();
      if (currMousePos[0] > canvas.getBoundingClientRect().width - width) {
        element.style.left = `${currMousePos[0] - width}px`;
      } else {
        element.style.left = `${currMousePos[0]}px`;
      }
      element.style.top = `${currMousePos[1] + stage.y}px`;

      depileBtn.addEventListener(
        'click',
        depileBtnClick(element, pile.id),
        EVENT_LISTENER_PASSIVE
      );
      tempDepileBtn.addEventListener(
        'click',
        tempDepileBtnClick(element, pile.id, event),
        EVENT_LISTENER_PASSIVE
      );
      browseSeparatelyBtn.addEventListener(
        'click',
        browseSeparatelyHandler(element, pile.id, event),
        EVENT_LISTENER_PASSIVE
      );
      magnifyBtn.addEventListener(
        'click',
        pileMagnificationHandler(element, pile.id),
        EVENT_LISTENER_PASSIVE
      );

      pileContextMenuItems.forEach((item, index) => {
        const button = item.id
          ? element.querySelector(`#${item.id}`)
          : element.querySelector(
              `#piling-js-context-menu-custom-item-${index}`
            );
        button.addEventListener(
          'click',
          () => {
            item.callback({
              id: pile.id,
              ...store.state.piles[pile.id]
            });
            if (!item.keepOpen) closeContextMenu();
          },
          {
            once: !item.keepOpen,
            passive: true
          }
        );
      });
    } else {
      depileBtn.style.display = 'none';
      tempDepileBtn.style.display = 'none';
      browseSeparatelyBtn.style.display = 'none';
      magnifyBtn.style.display = 'none';

      if (showGrid) {
        toggleGridBtn.innerHTML = 'Hide Grid';
      }
      element.style.display = 'block';

      const { width } = element.getBoundingClientRect();
      if (currMousePos[0] > canvas.getBoundingClientRect().width - width) {
        element.style.left = `${currMousePos[0] - width}px`;
      } else {
        element.style.left = `${currMousePos[0]}px`;
      }
      element.style.top = `${currMousePos[1] + stage.y}px`;

      toggleGridBtn.addEventListener(
        'click',
        toggleGridBtnClick(element),
        EVENT_LISTENER_PASSIVE
      );
      alignBtn.addEventListener(
        'click',
        alignByGridClickHandler,
        EVENT_LISTENER_PASSIVE
      );

      pileContextMenuItems.forEach((item, index) => {
        const button = item.id
          ? element.querySelector(`#${item.id}`)
          : element.querySelector(
              `#piling-js-context-menu-custom-item-${index}`
            );
        button.addEventListener(
          'click',
          () => {
            item.callback();
            if (!item.keepOpen) closeContextMenu();
          },
          {
            once: !item.keepOpen,
            passive: true
          }
        );
      });
    }
  };

  const startAnimationHandler = tweener => {
    tweener.setEasing(store.state.easing);
    animator.add(tweener);
  };

  const cancelAnimationHandler = tweener => {
    animator.cancel(tweener);
  };

  let storeUnsubscribor;

  const init = () => {
    // Setup event handler
    window.addEventListener('resize', resizeHandlerDb, EVENT_LISTENER_PASSIVE);
    window.addEventListener(
      'orientationchange',
      resizeHandlerDb,
      EVENT_LISTENER_PASSIVE
    );

    canvas.addEventListener(
      'contextmenu',
      contextmenuHandler,
      EVENT_LISTENER_ACTIVE
    );
    canvas.addEventListener('click', mouseClickHandler, EVENT_LISTENER_PASSIVE);
    canvas.addEventListener(
      'dblclick',
      mouseDblClickHandler,
      EVENT_LISTENER_PASSIVE
    );

    pubSub.subscribe('pileDragStart', pileDragStartHandler);
    pubSub.subscribe('pileDragMove', pileDragMoveHandler);
    pubSub.subscribe('pileDragEnd', pileDragEndHandler);
    pubSub.subscribe('startAnimation', startAnimationHandler);
    pubSub.subscribe('cancelAnimation', cancelAnimationHandler);
    pubSub.subscribe('updatePileBounds', updatePileBounds);

    storeUnsubscribor = store.subscribe(updated);

    rootElement.appendChild(scrollContainer);
    rootElement.appendChild(levels.nav);
    rootElement.appendChild(popup.element);

    addClass(rootElement, 'pilingjs');
    if (store.state.darkMode) addClass(rootElement, 'pilingjs-darkmode');
    rootElement.style.overflow = 'hidden';

    scrollContainer.appendChild(canvas);
    scrollContainer.appendChild(scrollEl);
    scrollContainer.appendChild(lasso.startIndicator);

    scrollContainer.style.position = 'absolute';
    scrollContainer.style.overflowX = 'hidden';
    scrollContainer.style.top = 0;
    scrollContainer.style.right = 0;
    scrollContainer.style.bottom = 0;
    scrollContainer.style.left = 0;

    canvas.style.position = 'sticky';
    canvas.style.display = 'block';
    canvas.style.top = '0px';
    canvas.style.left = '0px';

    resizeHandler();
    initGrid();
    enableScrolling();

    setPublic(initOptions);
  };

  const destroy = () => {
    // Remove event listeners
    window.removeEventListener('mousedown', mouseDownHandler);
    window.removeEventListener('mouseup', mouseUpHandler);
    window.removeEventListener('mousemove', mouseMoveHandler);
    window.removeEventListener('resize', resizeHandlerDb);
    window.removeEventListener('orientationchange', resizeHandlerDb);

    scrollContainer.removeEventListener('scroll', mouseScrollHandler);

    canvas.removeEventListener('contextmenu', contextmenuHandler);
    canvas.removeEventListener('click', mouseClickHandler);
    canvas.removeEventListener('dblclick', mouseDblClickHandler);
    canvas.removeEventListener('wheel', wheelHandler);

    store.reset();
    renderer.destroy(true);
    lasso.destroy();

    if (storeUnsubscribor) {
      storeUnsubscribor();
      storeUnsubscribor = undefined;
    }

    rootElement.removeChild(scrollEl);

    pubSub.clear();
  };

  init();

  return {
    // Properties
    get version() {
      return version;
    },
    // Methods
    arrangeBy,
    destroy,
    exportState,
    get,
    groupBy,
    halt,
    importState,
    render: renderRaf,
    renderer,
    resume,
    set: setPublic,
    splitAll,
    subscribe: pubSub.subscribe,
    unsubscribe: pubSub.unsubscribe
  };
};

export default createPilingJs;
