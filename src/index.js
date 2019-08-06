import * as PIXI from 'pixi.js';
import createPubSub from 'pub-sub-es';
import withRaf from 'with-raf';

import createStore, {
  setItemRenderer,
  setItems,
  setOrderer,
  setGrid
} from './store';

import createPile from './pile';
import creatGrid from './grid';

const createPileMe = rootElement => {
  const canvas = document.createElement('canvas');
  const pubSub = createPubSub();
  const store = createStore();

  let state = store.getState();

  const renderer = new PIXI.Renderer({
    width: rootElement.getBoundingClientRect().width,
    height: rootElement.getBoundingClientRect().height,
    view: canvas,
    antialias: true,
    transparent: true,
    resolution: window.devicePixelRatio,
    autoResize: true
  });

  const stage = new PIXI.Container();
  stage.interactive = true;
  stage.sortableChildren = true;

  const get = property => {
    switch (property) {
      case 'renderer':
        return state.itemRenderer;

      case 'items':
        return state.items;

      case 'orderer':
        return state.orderer;

      case 'grid':
        return state.grid;

      default:
        console.warn(`Unknown property "${property}"`);
        return undefined;
    }
  };

  const set = (property, value) => {
    let action;

    switch (property) {
      case 'renderer':
        action = setItemRenderer(value);
        break;

      case 'items':
        action = setItems(value);
        break;

      case 'orderer':
        action = setOrderer(value);
        break;

      case 'grid':
        action = setGrid(value);
        break;

      default:
        console.warn(`Unknown property "${property}"`);
    }

    if (action) store.dispatch(action);
  };

  const render = () => {
    renderer.render(stage);
  };

  const renderRaf = withRaf(render);

  const piles = new Map();

  const createItems = () => {
    const { itemRenderer, items } = store.getState();

    piles.clear();

    stage.removeChildren();

    const renderItems = items.map(({ src }) => itemRenderer(src));

    return Promise.all(renderItems).then(itemsA => {
      itemsA.forEach((item, index) => {
        const pile = createPile(item, renderRaf, index).initPile();
        piles.set(index, pile);
        stage.addChild(pile);
      });
      renderRaf();
    });
  };

  let layout;

  const initGrid = () => {
    const { grid } = store.getState();

    layout = creatGrid(canvas, grid);
  };

  const positionPiles = () => {
    const { orderer } = store.getState();

    if (piles) {
      piles.forEach((pile, id) => {
        const getPosition = orderer(layout.myColNum);
        let [x, y] = getPosition(id);

        x *= layout.myColWidth;
        y *= layout.myRowHeight;

        pile.x += x;
        pile.y += y;
      });
      renderRaf();
    }
  };

  let stateUpdates;

  const updated = () => {
    const newState = store.getState();

    stateUpdates = new Set();
    const updates = [];

    if (
      state.items !== newState.items ||
      state.itemRenderer !== newState.itemRenderer
    ) {
      updates.push(createItems());
      stateUpdates.add('piles');
    }

    if (state.orderer !== newState.orderer) stateUpdates.add('layout');

    if (state.grid !== newState.grid) {
      initGrid();
      stateUpdates.add('layout');
    }

    Promise.all(updates).then(() => {
      if (stateUpdates.has('piles') || stateUpdates.has('layout')) {
        positionPiles();
      }
    });

    state = newState;
  };

  const init = () => {
    // Setup event handler
    window.addEventListener('blur', () => {}, false);
    window.addEventListener('mousedown', () => {}, false);
    window.addEventListener('mouseup', () => {}, false);
    window.addEventListener('mousemove', () => {}, false);
    canvas.addEventListener('mouseenter', () => {}, false);
    canvas.addEventListener('mouseleave', () => {}, false);
    canvas.addEventListener('click', () => {}, false);
    canvas.addEventListener('dblclick', () => {}, false);

    store.subscribe(updated);
    rootElement.appendChild(canvas);
  };

  const destroy = () => {
    // Remove event listeners
    window.removeEventListener('keyup', () => {}, false);
    window.removeEventListener('blur', () => {}, false);
    window.removeEventListener('mousedown', () => {}, false);
    window.removeEventListener('mouseup', () => {}, false);
    window.removeEventListener('mousemove', () => {}, false);
    canvas.removeEventListener('mouseenter', () => {}, false);
    canvas.removeEventListener('mouseleave', () => {}, false);
    canvas.removeEventListener('click', () => {}, false);
    canvas.removeEventListener('dblclick', () => {}, false);

    stage.destroy(false);
    renderer.destroy(true);
    store.unsubscribe(updated);

    rootElement.removeChild(canvas);
    pubSub.clear();
  };

  init();

  return {
    destroy,
    get,
    render: renderRaf,
    set,
    subscribe: pubSub.subscribe,
    unsubscribe: pubSub.unsubscribe
  };
};

export default createPileMe;
