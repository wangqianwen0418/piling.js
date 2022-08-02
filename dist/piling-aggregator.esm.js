// @flekschas/utils v0.29.0 Copyright 2021 Fritz Lekschas
/**
 * Create a worker from a function
 * @param {function} fn - Function to be turned into a worker
 * @return {Worker} Worker function
 */


const createWorker = fn => new Worker(window.URL.createObjectURL(new Blob([`(${fn.toString()})()`], {
  type: 'text/javascript'
})));

/* eslint-env worker */

/* eslint no-restricted-globals: 1 */
var worker = function worker() {
  self.onmessage = function onmessage(e) {
    var src = e.data.src; // eslint-disable-next-line prefer-object-spread

    var newSrc = Object.assign({}, src);

    try {
      var newData = new Float32Array(src.shape[0]);

      for (var i = 0; i < src.shape[0]; i++) {
        for (var j = 0; j < src.shape[1]; j++) {
          newData[j] += src.data[i * src.shape[0] + j] / src.shape[1];
        }
      }

      newSrc.data = newData;
      newSrc.shape = [src.shape[0], 1];
    } catch (error) {
      self.postMessage({
        error: error
      });
    }

    self.postMessage({
      newSrc: newSrc
    }, [newSrc.data.buffer]);
  };
};

var createMatrixPreviewAggregator = function createMatrixPreviewAggregator() {
  var aggregagtor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mean';
  return function (items) {
    var aggregatedSources = items.map(function (item) {
      return new Promise(function (resolve, reject) {
        var worker$1 = createWorker(worker);

        worker$1.onmessage = function (e) {
          if (e.data.error) reject(e.data.error);else resolve(e.data.newSrc);
          worker$1.terminate();
        };

        worker$1.postMessage({
          src: item.src,
          aggregagtor: aggregagtor
        });
      });
    });
    return Promise.all(aggregatedSources)["catch"](function (error) {
      console.error('Matrix preview aggregation failed', error);
    });
  };
};

/* eslint-env worker */

/* eslint no-restricted-globals: 1 */
var worker$1 = function worker() {
  var mean = function mean(data, items, length) {
    var n = items.length;

    for (var s = 0; s < n; s++) {
      for (var i = 0; i < length; i++) {
        data[i] += Math.max(0, items[s].src.data[i]) / n;
      }
    }
  };

  var variance = function variance(data, items, length) {
    var u = new Float32Array(data.length);
    mean(u, items);
    var n = items.length;

    for (var s = 0; s < n; s++) {
      for (var i = 0; i < length; i++) {
        data[i] += Math.pow(items[s].src.data[i] - u[i], 2) / n;
      }
    }
  };

  var std = function std(data, items, length) {
    variance(data, items, length);

    for (var i = 0; i < length; i++) {
      data[i] = Math.sqrt(data[i]);
    }
  };

  self.onmessage = function onmessage(event) {
    var newSrc = {};

    if (!event.data.items.length) {
      self.postMessage({
        error: new Error('No sources provided')
      });
    }

    var newData;
    var length;

    try {
      newSrc.shape = event.data.items[0].src.shape;
      newSrc.dtype = event.data.items[0].src.dtype;
      length = event.data.items[0].src.data.length;
      newData = new Float32Array(length);
    } catch (error) {
      self.postMessage({
        error: error
      });
    }

    try {
      switch (event.data.aggregator) {
        case 'variance':
          variance(newData, event.data.items, length);
          break;

        case 'std':
          std(newData, event.data.items, length);
          break;

        case 'mean':
        default:
          mean(newData, event.data.items, length);
          break;
      }

      newSrc.data = newData;
    } catch (error) {
      self.postMessage({
        error: error
      });
    }

    self.postMessage({
      newSrc: newSrc
    }, [newSrc.data.buffer]);
  };
};

var createMatrixCoverAggregator = function createMatrixCoverAggregator() {
  var aggregator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mean';
  return function (items) {
    return new Promise(function (resolve, reject) {
      var worker = createWorker(worker$1);

      worker.onmessage = function (e) {
        if (e.data.error) reject(e.data.error);else resolve(e.data.newSrc);
        worker.terminate();
      };

      worker.postMessage({
        items: items,
        aggregator: aggregator
      });
    });
  };
};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

!function e(i, f, s) {
  function u(n, r) {
    if (!f[n]) {
      if (!i[n]) {
        var t = "function" == typeof commonjsRequire && commonjsRequire;
        if (!r && t) return t(n, !0);
        if (v) return v(n, !0);
        var o = new Error("Cannot find module '" + n + "'");
        throw o.code = "MODULE_NOT_FOUND", o;
      }

      var a = f[n] = {
        exports: {}
      };
      i[n][0].call(a.exports, function (r) {
        return u(i[n][1][r] || r);
      }, a, a.exports, e, i, f, s);
    }

    return f[n].exports;
  }

  for (var v = "function" == typeof commonjsRequire && commonjsRequire, r = 0; r < s.length; r++) u(s[r]);

  return u;
}({
  1: [function (n, t, o) {
    (function () {
      this.skmeans;
      var r = n("./main.js");
      void 0 !== o && (void 0 !== t && t.exports && (o = t.exports = r), o.skmeans = r), "undefined" != typeof window && (window.skmeans = r);
    }).call(this);
  }, {
    "./main.js": 4
  }],
  2: [function (r, n, t) {
    n.exports = {
      eudist: function (r, n) {
        for (var t = r.length, o = 0, a = 0; a < t; a++) {
          var e = (r[a] || 0) - (n[a] || 0);
          o += e * e;
        }

        return o;
      },
      mandist: function (r, n) {
        for (var t = r.length, o = 0, a = 0, e = 0; e < t; e++) o += 0 <= (a = (r[e] || 0) - (n[e] || 0)) ? a : -a;

        return o;
      },
      dist: function (r, n, t) {
        var o = Math.abs(r - n);
        return t ? o : o * o;
      }
    };
  }, {}],
  3: [function (r, n, t) {
    var o = r("./distance.js"),
        j = o.eudist,
        w = o.dist;
    n.exports = {
      kmrand: function (r, n) {
        for (var t = {}, o = [], a = n << 2, e = r.length, i = 0 < r[0].length; o.length < n && 0 < a--;) {
          var f = r[Math.floor(Math.random() * e)],
              s = i ? f.join("_") : "".concat(f);
          t[s] || (t[s] = !0, o.push(f));
        }

        if (o.length < n) throw new Error("Error initializating clusters");
        return o;
      },
      kmpp: function (r, n, t) {
        var o = t || (r[0].length ? j : w),
            a = [],
            e = r.length,
            i = 0 < r[0].length,
            f = r[Math.floor(Math.random() * e)];
        i ? f.join("_") : "".concat(f);

        for (a.push(f); a.length < n;) {
          for (var s = [], u = a.length, v = 0, c = [], h = 0; h < e; h++) {
            for (var d = 1 / 0, l = 0; l < u; l++) {
              var p = o(r[h], a[l]);
              p <= d && (d = p);
            }

            s[h] = d;
          }

          for (var m = 0; m < e; m++) v += s[m];

          for (var g = 0; g < e; g++) c[g] = {
            i: g,
            v: r[g],
            pr: s[g] / v,
            cs: 0
          };

          c.sort(function (r, n) {
            return r.pr - n.pr;
          }), c[0].cs = c[0].pr;

          for (var k = 1; k < e; k++) c[k].cs = c[k - 1].cs + c[k].pr;

          for (var x = Math.random(), M = 0; M < e - 1 && c[M++].cs < x;);

          a.push(c[M - 1].v);
        }

        return a;
      }
    };
  }, {
    "./distance.js": 2
  }],
  4: [function (r, n, t) {
    var o = r("./distance.js"),
        a = r("./kinit.js"),
        H = o.eudist,
        I = (o.mandist, o.dist, a.kmrand),
        J = a.kmpp;

    function K(r, n, t) {
      t = t || [];

      for (var o = 0; o < r; o++) t[o] = n;

      return t;
    }

    function P(r, n) {
      for (var t = Array.isArray(r), o = this.centroids, a = o.length, e = 1 / 0, i = 0, f = 0; f < a; f++) {
        var s = n ? n(r, o[f]) : t ? H(r, o[f]) : Math.abs(r - o[f]);
        s <= e && (e = s, i = f);
      }

      return {
        idx: i,
        centroid: o[i]
      };
    }

    n.exports = function (r, n, t, o, a) {
      var e = [],
          i = [],
          f = [],
          s = [],
          u = !1,
          v = o || 1e4,
          c = r.length,
          h = r[0].length,
          d = 0 < h,
          l = [];
      if (t) e = "kmrand" == t ? I(r, n) : "kmpp" == t ? J(r, n, a) : t;else for (var p = {}, m = 0; e.length < n;) {
        var g = Math.floor(Math.random() * c);
        p[g] || (p[g] = !0, e[m++] = r[g]);
      }

      do {
        K(n, 0, l);

        for (var k = 0; k < c; k++) {
          for (var x = 1 / 0, M = 0, j = 0; j < n; j++) (s = a ? a(r[k], e[j]) : d ? H(r[k], e[j]) : Math.abs(r[k] - e[j])) <= x && (x = s, M = j);

          l[f[k] = M]++;
        }

        var w = [];
        if (i = [], d) for (var b = 0; b < n; b++) w[b] = K(h, 0, w[b]), i[b] = e[b];else for (var y = 0; y < n; y++) w[y] = 0, i[y] = e[y];

        if (d) {
          for (var q = 0; q < n; q++) e[q] = [];

          for (var E = 0; E < c; E++) for (var _ = w[f[E]], O = r[E], A = 0; A < h; A++) _[A] += O[A];

          u = !0;

          for (var D = 0; D < n; D++) {
            for (var N = e[D], U = w[D], z = i[D], C = l[D], F = 0; F < h; F++) N[F] = U[F] / C || 0;

            if (u) for (var L = 0; L < h; L++) if (z[L] != N[L]) {
              u = !1;
              break;
            }
          }
        } else {
          for (var T = 0; T < c; T++) w[f[T]] += r[T];

          for (var B = 0; B < n; B++) e[B] = w[B] / l[B] || 0;

          u = !0;

          for (var G = 0; G < n; G++) if (i[G] != e[G]) {
            u = !1;
            break;
          }
        }

        u = u || --v <= 0;
      } while (!u);

      return {
        it: (o || 1e4) - v,
        k: n,
        idxs: f,
        centroids: e,
        test: P
      };
    };
  }, {
    "./distance.js": 2,
    "./kinit.js": 3
  }]
}, {}, [1]);
var skmeans_min = {};

/* eslint-env worker */

/* eslint no-restricted-globals: 1 */
var worker$2 = function worker() {
  var error = function error(message) {
    return {
      error: new Error(message)
    };
  };

  var identity = function identity(x) {
    return x;
  };

  self.onmessage = function onmessage(event) {
    var _event$data = event.data,
        initialization = _event$data.initialization,
        k = _event$data.k,
        maxIterations = _event$data.maxIterations,
        items = _event$data.items,
        scripts = _event$data.scripts; // Import the skmeans

    try {
      scripts.forEach(function (scriptUrl) {
        importScripts(scriptUrl);
      });
    } catch (err) {
      self.postMessage(error("Failed to import skmeans: ".concat(err)));
      return;
    } // Get the data from the items


    var data;

    try {
      data = items.map(self.valueGetter || identity);
    } catch (err) {
      self.postMessage(error("Failed to load features: ".concat(err)));
      return;
    }

    if (data.length <= k) {
      self.postMessage(error("Need at least ".concat(k, " items!")));
    } else {
      try {
        // Run k-means++
        var results = self.skmeans(data, k, initialization || 'kmpp', maxIterations || 1000 * Math.log10(data.length), self.distanceFunction || null);
        var postProcessing = self.postProcessing && self.postProcessing(results, data, items);
        self.postMessage({
          centroids: results.centroids,
          labels: results.idxs,
          postProcessing: postProcessing
        });
      } catch (err) {
        self.postMessage(error("Failed to run k-means++: ".concat(err)));
      }
    }
  };
};

var createUrlScript = function createUrlScript(fnStr) {
  return window.URL.createObjectURL(new Blob([fnStr], {
    type: 'text/javascript'
  }));
};

var createKmeans = function createKmeans(k) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$distanceFunction = _ref.distanceFunction,
      distanceFunction = _ref$distanceFunction === void 0 ? null : _ref$distanceFunction,
      _ref$initialization = _ref.initialization,
      initialization = _ref$initialization === void 0 ? 'kmpp' : _ref$initialization,
      _ref$maxIterations = _ref.maxIterations,
      maxIterations = _ref$maxIterations === void 0 ? null : _ref$maxIterations,
      _ref$valueGetter = _ref.valueGetter,
      valueGetter = _ref$valueGetter === void 0 ? null : _ref$valueGetter,
      _ref$postProcessing = _ref.postProcessing,
      postProcessing = _ref$postProcessing === void 0 ? null : _ref$postProcessing;

  var scripts = [createUrlScript(skmeans_min.replace(/window/g, 'self'))];

  if (valueGetter) {
    scripts.push(createUrlScript("(() => { self.valueGetter = ".concat(valueGetter.toString(), "; })();")));
  }

  if (distanceFunction) {
    scripts.push(createUrlScript("(() => { self.distanceFunction = ".concat(distanceFunction.toString(), "; })();")));
  }

  if (postProcessing) {
    scripts.push(createUrlScript("(() => { self.postProcessing = ".concat(postProcessing.toString(), "; })();")));
  }

  return function (items) {
    return new Promise(function (resolve, reject) {
      var worker = createWorker(worker$2);

      worker.onmessage = function (e) {
        if (e.data.error) reject(e.data.error);else resolve(e.data);
        worker.terminate();
      };

      worker.postMessage({
        initialization: initialization,
        k: k,
        maxIterations: maxIterations,
        items: items,
        scripts: scripts
      });
    });
  };
};

var createRepresentativeAggregator = function createRepresentativeAggregator(k) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$distanceFunction = _ref.distanceFunction,
      distanceFunction = _ref$distanceFunction === void 0 ? null : _ref$distanceFunction,
      _ref$initialization = _ref.initialization,
      initialization = _ref$initialization === void 0 ? 'kmpp' : _ref$initialization,
      _ref$maxIterations = _ref.maxIterations,
      maxIterations = _ref$maxIterations === void 0 ? null : _ref$maxIterations,
      _ref$valueGetter = _ref.valueGetter,
      valueGetter = _ref$valueGetter === void 0 ? null : _ref$valueGetter;

  var postProcessing = function postProcessing(results, data) {
    var l2DistDim = function l2DistDim(dim) {
      var body = Array(dim).fill().map(function (_, i) {
        return "s += (v[".concat(i, "] - w[").concat(i, "]) ** 2;");
      }).join(' '); // eslint-disable-next-line no-new-func

      return new Function('v', 'w', "let s = 0; ".concat(body, " return s;"));
    }; // Determine center


    var dist = l2DistDim(data[0].length);
    var selectedItemIdxs = Array(results.centroids.length).fill();
    var minDist = Array(results.centroids.length).fill(Infinity);
    data.forEach(function (datum, i) {
      var centroidIdx = results.idxs[i];
      var d = dist(datum, results.centroids[centroidIdx]);

      if (d < minDist[centroidIdx]) {
        minDist[centroidIdx] = d;
        selectedItemIdxs[centroidIdx] = i;
      }
    });
    return {
      selectedItemIdxs: selectedItemIdxs
    };
  };

  var kmeans = createKmeans(k, {
    distanceFunction: distanceFunction,
    initialization: initialization,
    maxIterations: maxIterations,
    valueGetter: valueGetter,
    postProcessing: postProcessing
  });
  return function (items) {
    if (items.length <= k) return Promise.resolve(items.map(function (i) {
      return i.src;
    }));
    return kmeans(items).then(function (response) {
      return response.postProcessing.selectedItemIdxs.map(function (itemIndex) {
        return items[itemIndex].src;
      });
    });
  };
};

export { createMatrixCoverAggregator, createMatrixPreviewAggregator, createRepresentativeAggregator };
