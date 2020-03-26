import * as d3 from 'd3';
import createPilingJs from '../src/library';
import { createSvgRenderer } from '../src/renderer';

const loadMapbox = () =>
  Promise.all([
    new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.onload = resolve;
      script.onerror = reject;
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v1.9.0/mapbox-gl.js';
      document.head.appendChild(script);
    }),
    new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.onload = resolve;
      link.onerror = reject;
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v1.9.0/mapbox-gl.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    })
  ]);

const createMapbox = element => () => {
  const mapEl = document.createElement('div');
  mapEl.id = 'map';
  element.appendChild(mapEl);
  mapEl.style.position = 'absolute';
  mapEl.style.zIndex = 0;
  mapEl.style.width = '100%';
  mapEl.style.height = '100%';

  window.mapboxgl.accessToken =
    'pk.eyJ1IjoiZmxla3NjaGFzIiwiYSI6ImNqZXB2aWd4NDBmZTIzM3BjdGZudTFob2oifQ.Jnmp1xWJyS4_lRhzrZAFBQ';

  const map = new window.mapboxgl.Map({
    container: mapEl,
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 0,
    center: [4.899, 52.372]
  });

  return map;
};

const create = async (element, darkMode) => {
  const pilingEl = document.createElement('div');
  pilingEl.style.position = 'absolute';
  pilingEl.style.zIndex = 1;
  pilingEl.style.width = '100%';
  pilingEl.style.height = '100%';

  element.appendChild(pilingEl);

  let response = await fetch('data/covid-19.json');
  response = await response.json();

  loadMapbox().then(createMapbox(element));

  const { width } = element.getBoundingClientRect();

  const data = response.data;
  // const startDate = response.startDate;
  // const endDate = response.endDate;
  const countries = Object.keys(data);
  const numDays = data[countries[0]].cases.length;

  const columns = 20;
  const relHeight = 1.0;
  const absWidth = 100;
  const absHeight = absWidth * relHeight;
  const tickHeight = 3;
  const aspectRatio = 1 / relHeight;
  const itemWidth = (width / columns) * 3;
  const itemHeight = itemWidth * relHeight;

  const svgRenderer = createSvgRenderer({
    width: itemWidth,
    height: itemHeight,
    color: darkMode ? '#333' : '#ccc'
  });

  const stepSize = absWidth / numDays;
  const halfStepSize = stepSize / 2;

  const maxCases = countries.reduce(
    (max, country) => Math.max(max, data[country].cases[numDays - 1]),
    0
  );

  // const xScale = d3
  //   .scaleTime()
  //   .domain([new Date(startDate), new Date(endDate)])
  //   .nice();

  const yScale = d3
    .scaleLog()
    .domain([1, maxCases])
    .range([0, 1])
    .clamp(true);

  const createSvgStart = () =>
    `<svg viewBox="0 0 100 ${absHeight +
      tickHeight}" xmlns="http://www.w3.org/2000/svg">`;

  const createGradient = (name, startColor, endColor) => `<defs>
  <linearGradient id="${name}" x1="0%" y1="100%" x2="0%" y2="0%">
    <stop offset="0%"   stop-color="${startColor}"/>
    <stop offset="100%" stop-color="${endColor}"/>
  </linearGradient>
</defs>`;

  const createSvgEnd = () => '</svg>';

  const createLine = d3
    .line()
    .x((_, i) => halfStepSize + stepSize * i)
    .y(d => absHeight - absHeight * yScale(d + 1));

  const createPath = y => {
    const path = createLine(y);
    return `<path d="${path}" stroke="url(#linear-stroke)" stroke-size="1" fill="none"/>`;
  };

  const strokeColorRange = darkMode
    ? ['#808080', '#d96921']
    : ['#333333', '#663413'];

  // prettier-ignore
  const createLinePlot = (y) => [
    createSvgStart(),
    createGradient('linear-stroke', ...strokeColorRange),
    createPath(y),
    createSvgEnd()
  ].join('');

  const items = countries.map(country => ({
    src: createLinePlot(data[country].cases),
    country,
    long: 0,
    lat: 0
  }));

  const piling = createPilingJs(pilingEl, {
    darkMode,
    cellAspectRatio: aspectRatio,
    pileCellAlignment: 'center',
    cellPadding: 4,
    renderer: svgRenderer,
    items,
    columns: 12,
    pileItemOffset: [0, 8],
    pileItemBrightness: (_, i, pile) =>
      Math.min(0.5, 0.01 * (pile.items.length - i - 1)),
    pileScale: pile => 1 + Math.min(0.5, (pile.items.length - 1) * 0.1)
  });

  return [piling];
};

export default create;
