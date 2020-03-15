import {
  pipe,
  camelToConst,
  deepClone,
  cubicInOut,
  update,
  withForwardedMethod,
  withReadOnlyProperty,
  withStaticProperty
} from '@flekschas/utils';
import deepEqual from 'deep-equal';
import { createStore as createReduxStore, combineReducers } from 'redux';
import { enableBatching } from 'redux-batched-actions';

import { version } from '../package.json';

import createOrderer from './orderer';

import {
  DEFAULT_DARK_MODE,
  DEFAULT_LASSO_FILL_OPACITY,
  DEFAULT_LASSO_SHOW_START_INDICATOR,
  DEFAULT_LASSO_START_INDICATOR_OPACITY,
  DEFAULT_LASSO_STROKE_OPACITY,
  DEFAULT_LASSO_STROKE_SIZE,
  DEFAULT_PILE_COVER_SCALE,
  DEFAULT_PILE_ITEM_BRIGHTNESS,
  DEFAULT_PILE_ITEM_TINT,
  DEFAULT_POPUP_BACKGROUND_OPACITY,
  DEFAULT_PREVIEW_BACKGROUND_COLOR,
  DEFAULT_PREVIEW_BACKGROUND_OPACITY,
  NAVIGATION_MODE_AUTO,
  NAVIGATION_MODES
} from './defaults';

const clone = (value, state) => {
  switch (typeof value) {
    case 'object': {
      if (!deepEqual(value, state)) {
        return deepClone(value);
      }

      return state;
    }
    default:
      return value;
  }
};

const setReducer = (key, defaultValue = null) => {
  const actionType = `SET_${camelToConst(key)}`;
  return (state = defaultValue, action) => {
    switch (action.type) {
      case actionType:
        return clone(action.payload[key], state);
      default:
        return state;
    }
  };
};

const setOptionsReducer = (key, options, defaultValue = null) => {
  // eslint-disable-next-line no-param-reassign
  options = new Set(options);

  const actionType = `SET_${camelToConst(key)}`;

  return (state = defaultValue, action) => {
    switch (action.type) {
      case actionType:
        if (options.has(action.payload[key])) {
          return clone(action.payload[key], state);
        }
        return state;

      default:
        return state;
    }
  };
};

const setAction = key => {
  const type = `SET_${camelToConst(key)}`;
  return newValue => ({ type, payload: { [key]: newValue } });
};

const setter = (key, defaultValue = null) => [
  setReducer(key, defaultValue),
  setAction(key)
];

const setterOptions = (key, options, defaultValue = null) => [
  setOptionsReducer(key, options, defaultValue),
  setAction(key)
];

export const reset = () => ({
  type: 'RESET',
  payload: {}
});

export const overwrite = newState => ({
  type: 'OVERWRITE',
  payload: { newState }
});

export const softOverwrite = newState => ({
  type: 'SOFT_OVERWRITE',
  payload: { newState }
});

const [arrangementType, setArrangementType] = setter('arrangementType');

const [arrangementObjective, setArrangementObjective] = setter(
  'arrangementObjective'
);

const [arrangementOnPile, setArrangementOnPile] = setter(
  'arrangementOnPile',
  false
);

const [arrangementOptions, setArrangementOptions] = setter(
  'arrangementOptions',
  {}
);

const [backgroundColor, setBackgroundColor] = setter(
  'backgroundColor',
  0x000000
);

const [darkMode, setDarkMode] = setter('darkMode', DEFAULT_DARK_MODE);

const [dimensionalityReducer, setDimensionalityReducer] = setter(
  'dimensionalityReducer'
);

const [gridColor, setGridColor] = setter('gridColor', 0x787878);

const [gridOpacity, setGridOpacity] = setter('gridOpacity', 1);

const [showGrid, setShowGrid] = setter('showGrid', false);

const [popupBackgroundOpacity, setPopupBackgroundOpacity] = setter(
  'popupBackgroundOpacity',
  DEFAULT_POPUP_BACKGROUND_OPACITY
);

const [lassoFillColor, setLassoFillColor] = setter('lassoFillColor');

const [lassoFillOpacity, setLassoFillOpacity] = setter(
  'lassoFillOpacity',
  DEFAULT_LASSO_FILL_OPACITY
);

const [lassoShowStartIndicator, setLassoShowStartIndicator] = setter(
  'lassoShowStartIndicator',
  DEFAULT_LASSO_SHOW_START_INDICATOR
);

const [lassoStartIndicatorOpacity, setLassoStartIndicatorOpacity] = setter(
  'lassoStartIndicatorOpacity',
  DEFAULT_LASSO_START_INDICATOR_OPACITY
);

const [lassoStrokeColor, setLassoStrokeColor] = setter('lassoStrokeColor');

const [lassoStrokeOpacity, setLassoStrokeOpacity] = setter(
  'lassoStrokeOpacity',
  DEFAULT_LASSO_STROKE_OPACITY
);

const [lassoStrokeSize, setLassoStrokeSize] = setter(
  'lassoStrokeSize',
  DEFAULT_LASSO_STROKE_SIZE
);

const [itemRenderer, setItemRenderer] = setter('itemRenderer');

const [previewRenderer, setPreviewRenderer] = setter('previewRenderer');

const [coverRenderer, setCoverRenderer] = setter('coverRenderer');

const [previewAggregator, setPreviewAggregator] = setter('previewAggregator');

const [coverAggregator, setCoverAggregator] = setter('coverAggregator');

const [orderer, setOrderer] = setter('orderer', createOrderer().rowMajor);

// Grid
const [itemSize, setItemSize] = setter('itemSize');
const [itemSizeRange, setItemSizeRange] = setter('itemSizeRange', [0.5, 1.0]);
const [columns, setColumns] = setter('columns', 10);
const [rowHeight, setRowHeight] = setter('rowHeight');
const [cellAspectRatio, setCellAspectRatio] = setter('cellAspectRatio', 1);
const [cellPadding, setCellPadding] = setter('cellPadding', 12);

const [pileCoverScale, setPileCoverScale] = setter(
  'pileCoverScale',
  DEFAULT_PILE_COVER_SCALE
);
const [pileItemBrightness, setPileItemBrightness] = setter(
  'pileItemBrightness',
  DEFAULT_PILE_ITEM_BRIGHTNESS
);
const [pileItemInvert, setPileItemInvert] = setter('pileItemInvert', false);
const [pileItemOffset, setPileItemOffset] = setter('pileItemOffset', [5, 5]);
const [pileItemOpacity, setPileItemOpacity] = setter('pileItemOpacity', 1.0);
const [pileItemOrder, setPileItemOrder] = setter('pileItemOrder');
const [pileItemRotation, setPileItemRotation] = setter('pileItemRotation', 0);
const [pileItemTint, setPileItemTint] = setter(
  'pileItemTint',
  DEFAULT_PILE_ITEM_TINT
);

const [focusedPiles, setFocusedPiles] = setter('focusedPiles', []);

const [magnifiedPiles, setMagnifiedPiles] = setter('magnifiedPiles', []);

// 'originalPos' and 'closestPos'
const [depileMethod, setDepileMethod] = setter('depileMethod', 'originalPos');

const [depiledPile, setDepiledPile] = setter('depiledPile', []);

const [temporaryDepiledPiles, setTemporaryDepiledPiles] = setter(
  'temporaryDepiledPiles',
  []
);

// 'horizontal' or 'vertical'
const [tempDepileDirection, setTempDepileDirection] = setter(
  'tempDepileDirection',
  'horizontal'
);

const [tempDepileOneDNum, setTempDepileOneDNum] = setter(
  'tempDepileOneDNum',
  6
);

const [easing, setEasing] = setter('easing', cubicInOut);

const [navigationMode, setNavigationMode] = setterOptions(
  'navigationMode',
  NAVIGATION_MODES,
  NAVIGATION_MODE_AUTO
);

const [previewItemOffset, setPreviewItemOffset] = setter('previewItemOffset');

const [previewSpacing, setPreviewSpacing] = setter('previewSpacing', 2);

const [previewBackgroundColor, setPreviewBackgroundColor] = setter(
  'previewBackgroundColor',
  DEFAULT_PREVIEW_BACKGROUND_COLOR
);

const [previewBackgroundOpacity, setPreviewBackgroundOpacity] = setter(
  'previewBackgroundOpacity',
  DEFAULT_PREVIEW_BACKGROUND_OPACITY
);

const [previewBorderColor, setPreviewBorderColor] = setter(
  'previewBorderColor',
  0xffffff
);

const [previewBorderOpacity, setPreviewBorderOpacity] = setter(
  'previewBorderOpacity',
  0.85
);

const [pileBorderColor, setPileBorderColor] = setter(
  'pileBorderColor',
  0x808080
);

const [pileBorderOpacity, setPileBorderOpacity] = setter(
  'pileBorderOpacity',
  1.0
);

const [pileBorderColorHover, setPileBorderColorHover] = setter(
  'pileBorderColorHover',
  0x808080
);

const [pileBorderOpacityHover, setPileBorderOpacityHover] = setter(
  'pileBorderOpacityHover',
  1.0
);

const [pileBorderColorFocus, setPileBorderColorFocus] = setter(
  'pileBorderColorFocus',
  0xeee462
);

const [pileBorderOpacityFocus, setPileBorderOpacityFocus] = setter(
  'pileBorderOpacityFocus',
  1.0
);

const [pileBorderColorActive, setPileBorderColorActive] = setter(
  'pileBorderColorActive',
  0xffa5da
);

const [pileBorderOpacityActive, setPileBorderOpacityActive] = setter(
  'pileBorderOpacityActive',
  1.0
);

const [pileBorderSize, setPileBorderSize] = setter('pileBorderSize', 0);

const [pileBackgroundColor, setPileBackgroundColor] = setter(
  'pileBackgroundColor'
);

const [pileBackgroundOpacity, setPileBackgroundOpacity] = setter(
  'pileBackgroundOpacity',
  0.85
);

// 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'center'
const [pileCellAlignment, setPileCellAlignment] = setter(
  'pileCellAlignment',
  'topLeft'
);

const [pileContextMenuItems, setPileContextMenuItems] = setter(
  'pileContextMenuItems',
  []
);

const [pileVisibilityItems, setPileVisibilityItems] = setter(
  'pileVisibilityItems',
  true
);

const [pileOpacity, setPileOpacity] = setter('pileOpacity', 1.0);

const [pileScale, setPileScale] = setter('pileScale', 1.0);

const items = (previousState = {}, action) => {
  switch (action.type) {
    case 'SET_ITEMS': {
      const useCustomId = action.payload.items.length
        ? typeof action.payload.items[0].id !== 'undefined'
        : false;

      return action.payload.items.reduce((newState, item, index) => {
        const id = useCustomId ? item.id : index;
        newState[id] = {
          id,
          index,
          ...item
        };
        return newState;
      }, {});
    }

    default:
      return previousState;
  }
};

const setItems = newItems => ({
  type: 'SET_ITEMS',
  payload: { items: newItems }
});

const piles = (previousState = {}, action) => {
  switch (action.type) {
    case 'INIT_PILES': {
      const useCustomItemId = action.payload.newItems.length
        ? typeof action.payload.newItems[0].id !== 'undefined'
        : false;

      const newItemIds = action.payload.newItems.reduce(
        (itemIds, item, index) => {
          const id = item.id === undefined ? index.toString() : item.id;
          itemIds.add(id);
          return itemIds;
        },
        new Set()
      );

      return action.payload.newItems.reduce((newState, item, index) => {
        const itemId = useCustomItemId ? item.id : index.toString();

        const previousPileState = previousState[itemId];
        const newPileState = {
          id: itemId,
          index,
          items: [itemId],
          x: null,
          y: null,
          ...previousPileState
        };

        if (previousPileState) {
          if (previousPileState.items.length) {
            newPileState.items = previousPileState.items.filter(id =>
              newItemIds.has(id)
            );
          } else if (newItemIds.has(itemId)) {
            const isItemOnPile = Object.values(previousState).filter(
              pile => pile.items.includes(itemId) && newItemIds.has(pile.id)
            ).length;
            if (!isItemOnPile) newPileState.items = [itemId];
          }
        }

        newState[itemId] = newPileState;

        return newState;
      }, {});
    }

    case 'MERGE_PILES': {
      const newState = { ...previousState };

      const target =
        action.payload.targetPileId !== undefined
          ? action.payload.targetPileId
          : Math.min.apply([], action.payload.pileIds).toString();

      const sourcePileIds = action.payload.pileIds.filter(id => id !== target);

      const [x, y] = action.payload.targetPos;

      newState[target] = {
        ...newState[target],
        items: [...newState[target].items],
        x,
        y
      };

      sourcePileIds.forEach(id => {
        newState[target].items.push(...newState[id].items);
        newState[id] = {
          ...newState[id],
          items: [],
          x: null,
          y: null
        };
      });

      return newState;
    }

    case 'MOVE_PILES': {
      const newState = { ...previousState };
      action.payload.movingPiles.forEach(({ id, x, y }) => {
        newState[id] = {
          ...newState[id],
          x,
          y
        };
      });
      return newState;
    }

    case 'SCATTER_PILES': {
      const scatterPiles = action.payload.piles.filter(
        pile => pile.items.length > 1
      );

      if (!scatterPiles.length) return previousState;

      const newState = { ...previousState };

      scatterPiles.forEach(pile => {
        pile.items.forEach(itemId => {
          newState[itemId] = {
            ...newState[itemId],
            items: [itemId],
            x: pile.x,
            y: pile.y
          };
        });
      });
      return newState;
    }

    default:
      return previousState;
  }
};

// action
const initPiles = newItems => ({
  type: 'INIT_PILES',
  payload: { newItems }
});

const mergePiles = (pileIds, targetPos, targetPileId) => ({
  type: 'MERGE_PILES',
  payload: { pileIds, targetPos, targetPileId }
});

const movePiles = movingPiles => ({
  type: 'MOVE_PILES',
  payload: { movingPiles }
});

const scatterPiles = pilesToBeScattered => ({
  type: 'SCATTER_PILES',
  payload: { piles: pilesToBeScattered }
});

const [showSpatialIndex, setShowSpatialIndex] = setter(
  'showSpatialIndex',
  false
);

const createStore = () => {
  let lastAction = null;

  const appReducer = combineReducers({
    coverRenderer,
    arrangementObjective,
    arrangementOnPile,
    arrangementOptions,
    arrangementType,
    backgroundColor,
    cellAspectRatio,
    cellPadding,
    columns,
    coverAggregator,
    depiledPile,
    depileMethod,
    dimensionalityReducer,
    easing,
    focusedPiles,
    gridColor,
    gridOpacity,
    darkMode,
    popupBackgroundOpacity,
    itemRenderer,
    items,
    itemSize,
    itemSizeRange,
    lassoFillColor,
    lassoFillOpacity,
    lassoShowStartIndicator,
    lassoStartIndicatorOpacity,
    lassoStrokeColor,
    lassoStrokeOpacity,
    lassoStrokeSize,
    magnifiedPiles,
    navigationMode,
    orderer,
    pileBackgroundColor,
    pileBackgroundOpacity,
    pileBorderColor,
    pileBorderColorActive,
    pileBorderColorFocus,
    pileBorderColorHover,
    pileBorderOpacity,
    pileBorderOpacityActive,
    pileBorderOpacityFocus,
    pileBorderOpacityHover,
    pileBorderSize,
    pileCellAlignment,
    pileContextMenuItems,
    pileCoverScale,
    pileItemOffset,
    pileItemBrightness,
    pileItemInvert,
    pileItemOpacity,
    pileItemOrder,
    pileItemRotation,
    pileItemTint,
    pileVisibilityItems,
    pileOpacity,
    piles,
    pileScale,
    previewAggregator,
    previewBackgroundColor,
    previewBackgroundOpacity,
    previewBorderColor,
    previewBorderOpacity,
    previewItemOffset,
    previewRenderer,
    previewSpacing,
    rowHeight,
    showGrid,
    showSpatialIndex,
    tempDepileDirection,
    tempDepileOneDNum,
    temporaryDepiledPiles
  });

  const rootReducer = (state, action) => {
    lastAction = action;

    if (action.type === 'RESET') {
      state = undefined; // eslint-disable-line no-param-reassign
    } else if (action.type === 'OVERWRITE') {
      state = action.payload.newState; // eslint-disable-line no-param-reassign
    } else if (action.type === 'SOFT_OVERWRITE') {
      // eslint-disable-next-line no-param-reassign
      state = update(state, action.payload.newState, true);
    }

    return appReducer(state, action);
  };

  const reduxStore = createReduxStore(enableBatching(rootReducer));

  reduxStore.lastAction = () => lastAction;

  Object.defineProperty(reduxStore, 'lastAction', {
    get: () => lastAction
  });

  const exportState = () => {
    const clonedState = deepClone(reduxStore.getState());
    clonedState.version = version;
    return clonedState;
  };

  const importState = (newState, overwriteState = false) => {
    if (newState.version !== version) {
      console.warn(
        `The version of the imported state "${newState.version}" doesn't match the library version "${version}". Use at your own risk!`
      );
    }

    if (newState.version) delete newState.version;

    if (overwriteState) reduxStore.dispatch(overwrite(newState));
    else reduxStore.dispatch(softOverwrite(newState));
  };

  const resetState = () => {
    reduxStore.dispatch(reset());
  };

  return pipe(
    withStaticProperty('reduxStore', reduxStore),
    withReadOnlyProperty('lastAction', () => lastAction),
    withReadOnlyProperty('state', reduxStore.getState),
    withForwardedMethod('dispatch', reduxStore.dispatch),
    withForwardedMethod('subscribe', reduxStore.subscribe)
  )({
    export: exportState,
    import: importState,
    reset: resetState
  });
};

export default createStore;

export const createAction = {
  scatterPiles,
  initPiles,
  mergePiles,
  movePiles,
  setCoverRenderer,
  setArrangementObjective,
  setArrangementOnPile,
  setArrangementOptions,
  setArrangementType,
  setBackgroundColor,
  setCellAspectRatio,
  setCellPadding,
  setColumns,
  setCoverAggregator,
  setDepiledPile,
  setDepileMethod,
  setDimensionalityReducer,
  setEasing,
  setFocusedPiles,
  setGridColor,
  setGridOpacity,
  setDarkMode,
  setPopupBackgroundOpacity,
  setItemRenderer,
  setItems,
  setItemSize,
  setItemSizeRange,
  setLassoFillColor,
  setLassoFillOpacity,
  setLassoShowStartIndicator,
  setLassoStartIndicatorOpacity,
  setLassoStrokeColor,
  setLassoStrokeOpacity,
  setLassoStrokeSize,
  setMagnifiedPiles,
  setNavigationMode,
  setOrderer,
  setPileBackgroundColor,
  setPileBackgroundOpacity,
  setPileBorderColor,
  setPileBorderColorActive,
  setPileBorderColorFocus,
  setPileBorderColorHover,
  setPileBorderOpacity,
  setPileBorderOpacityActive,
  setPileBorderOpacityFocus,
  setPileBorderOpacityHover,
  setPileBorderSize,
  setPileCellAlignment,
  setPileContextMenuItems,
  setPileCoverScale,
  setPileItemOffset,
  setPileItemOrder,
  setPileItemBrightness,
  setPileItemInvert,
  setPileItemOpacity,
  setPileItemRotation,
  setPileItemTint,
  setPileVisibilityItems,
  setPileOpacity,
  setPileScale,
  setPreviewAggregator,
  setPreviewBackgroundColor,
  setPreviewBackgroundOpacity,
  setPreviewBorderColor,
  setPreviewBorderOpacity,
  setPreviewItemOffset,
  setPreviewRenderer,
  setPreviewSpacing,
  setRowHeight,
  setShowGrid,
  setShowSpatialIndex,
  setTempDepileDirection,
  setTempDepileOneDNum,
  setTemporaryDepiledPiles
};
