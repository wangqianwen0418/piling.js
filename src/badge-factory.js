import createBadge from './badge';
import createRoundedRectangleFactory from './rounded-rectangle-factory';

const createBadgeFactory = ({ fontSize = 8 } = {}) => {
  const sizeTexCache = new Map();
  const sizeUsage = {};

  const roundedRectangleFactory = createRoundedRectangleFactory({
    size: fontSize * window.devicePixelRatio * 1.5
  });

  const onDestroy = text => () => {
    sizeUsage[text] = Math.max(0, sizeUsage[text] - 1);
    if (sizeUsage[text] === 0) {
      sizeTexCache.get(text).destroy();
      delete sizeUsage[text];
    }
  };

  const create = (text, { darkMode } = {}) => {
    if (sizeTexCache.has(text)) {
      return sizeTexCache.get(text).clone();
    }
    const badge = createBadge(text, {
      backgroundFactory: roundedRectangleFactory,
      darkMode,
      fontSize,
      onDestroy: onDestroy(text)
    });

    if (!sizeUsage[text]) sizeUsage[text] = 1;
    sizeTexCache.set(text, badge);

    return badge;
  };

  const destroy = () => {
    sizeTexCache.forEach(badge => badge.destroy());
  };

  return {
    create,
    destroy
  };
};

export default createBadgeFactory;
