// @flekschas/utils v0.29.0 Copyright 2021 Fritz Lekschas
/**
 * Create a worker from a function
 * @param {function} fn - Function to be turned into a worker
 * @return {Worker} Worker function
 */


const createWorker = fn => new Worker(window.URL.createObjectURL(new Blob([`(${fn.toString()})()`], {
  type: 'text/javascript'
})));

var skmeans = "/*! skmeans 2020-01-29 */\n\"use strict\";\n\n!function e(i, f, s) {\n  function u(n, r) {\n    if (!f[n]) {\n      if (!i[n]) {\n        var t = \"function\" == typeof require && require;\n        if (!r && t) return t(n, !0);\n        if (v) return v(n, !0);\n        var o = new Error(\"Cannot find module '\" + n + \"'\");\n        throw o.code = \"MODULE_NOT_FOUND\", o;\n      }\n\n      var a = f[n] = {\n        exports: {}\n      };\n      i[n][0].call(a.exports, function (r) {\n        return u(i[n][1][r] || r);\n      }, a, a.exports, e, i, f, s);\n    }\n\n    return f[n].exports;\n  }\n\n  for (var v = \"function\" == typeof require && require, r = 0; r < s.length; r++) u(s[r]);\n\n  return u;\n}({\n  1: [function (n, t, o) {\n    (function () {\n      this.skmeans;\n      var r = n(\"./main.js\");\n      void 0 !== o && (void 0 !== t && t.exports && (o = t.exports = r), o.skmeans = r), \"undefined\" != typeof window && (window.skmeans = r);\n    }).call(this);\n  }, {\n    \"./main.js\": 4\n  }],\n  2: [function (r, n, t) {\n    n.exports = {\n      eudist: function (r, n) {\n        for (var t = r.length, o = 0, a = 0; a < t; a++) {\n          var e = (r[a] || 0) - (n[a] || 0);\n          o += e * e;\n        }\n\n        return o;\n      },\n      mandist: function (r, n) {\n        for (var t = r.length, o = 0, a = 0, e = 0; e < t; e++) o += 0 <= (a = (r[e] || 0) - (n[e] || 0)) ? a : -a;\n\n        return o;\n      },\n      dist: function (r, n, t) {\n        var o = Math.abs(r - n);\n        return t ? o : o * o;\n      }\n    };\n  }, {}],\n  3: [function (r, n, t) {\n    var o = r(\"./distance.js\"),\n        j = o.eudist,\n        w = o.dist;\n    n.exports = {\n      kmrand: function (r, n) {\n        for (var t = {}, o = [], a = n << 2, e = r.length, i = 0 < r[0].length; o.length < n && 0 < a--;) {\n          var f = r[Math.floor(Math.random() * e)],\n              s = i ? f.join(\"_\") : \"\".concat(f);\n          t[s] || (t[s] = !0, o.push(f));\n        }\n\n        if (o.length < n) throw new Error(\"Error initializating clusters\");\n        return o;\n      },\n      kmpp: function (r, n, t) {\n        var o = t || (r[0].length ? j : w),\n            a = [],\n            e = r.length,\n            i = 0 < r[0].length,\n            f = r[Math.floor(Math.random() * e)];\n        i ? f.join(\"_\") : \"\".concat(f);\n\n        for (a.push(f); a.length < n;) {\n          for (var s = [], u = a.length, v = 0, c = [], h = 0; h < e; h++) {\n            for (var d = 1 / 0, l = 0; l < u; l++) {\n              var p = o(r[h], a[l]);\n              p <= d && (d = p);\n            }\n\n            s[h] = d;\n          }\n\n          for (var m = 0; m < e; m++) v += s[m];\n\n          for (var g = 0; g < e; g++) c[g] = {\n            i: g,\n            v: r[g],\n            pr: s[g] / v,\n            cs: 0\n          };\n\n          c.sort(function (r, n) {\n            return r.pr - n.pr;\n          }), c[0].cs = c[0].pr;\n\n          for (var k = 1; k < e; k++) c[k].cs = c[k - 1].cs + c[k].pr;\n\n          for (var x = Math.random(), M = 0; M < e - 1 && c[M++].cs < x;);\n\n          a.push(c[M - 1].v);\n        }\n\n        return a;\n      }\n    };\n  }, {\n    \"./distance.js\": 2\n  }],\n  4: [function (r, n, t) {\n    var o = r(\"./distance.js\"),\n        a = r(\"./kinit.js\"),\n        H = o.eudist,\n        I = (o.mandist, o.dist, a.kmrand),\n        J = a.kmpp;\n\n    function K(r, n, t) {\n      t = t || [];\n\n      for (var o = 0; o < r; o++) t[o] = n;\n\n      return t;\n    }\n\n    function P(r, n) {\n      for (var t = Array.isArray(r), o = this.centroids, a = o.length, e = 1 / 0, i = 0, f = 0; f < a; f++) {\n        var s = n ? n(r, o[f]) : t ? H(r, o[f]) : Math.abs(r - o[f]);\n        s <= e && (e = s, i = f);\n      }\n\n      return {\n        idx: i,\n        centroid: o[i]\n      };\n    }\n\n    n.exports = function (r, n, t, o, a) {\n      var e = [],\n          i = [],\n          f = [],\n          s = [],\n          u = !1,\n          v = o || 1e4,\n          c = r.length,\n          h = r[0].length,\n          d = 0 < h,\n          l = [];\n      if (t) e = \"kmrand\" == t ? I(r, n) : \"kmpp\" == t ? J(r, n, a) : t;else for (var p = {}, m = 0; e.length < n;) {\n        var g = Math.floor(Math.random() * c);\n        p[g] || (p[g] = !0, e[m++] = r[g]);\n      }\n\n      do {\n        K(n, 0, l);\n\n        for (var k = 0; k < c; k++) {\n          for (var x = 1 / 0, M = 0, j = 0; j < n; j++) (s = a ? a(r[k], e[j]) : d ? H(r[k], e[j]) : Math.abs(r[k] - e[j])) <= x && (x = s, M = j);\n\n          l[f[k] = M]++;\n        }\n\n        var w = [];\n        if (i = [], d) for (var b = 0; b < n; b++) w[b] = K(h, 0, w[b]), i[b] = e[b];else for (var y = 0; y < n; y++) w[y] = 0, i[y] = e[y];\n\n        if (d) {\n          for (var q = 0; q < n; q++) e[q] = [];\n\n          for (var E = 0; E < c; E++) for (var _ = w[f[E]], O = r[E], A = 0; A < h; A++) _[A] += O[A];\n\n          u = !0;\n\n          for (var D = 0; D < n; D++) {\n            for (var N = e[D], U = w[D], z = i[D], C = l[D], F = 0; F < h; F++) N[F] = U[F] / C || 0;\n\n            if (u) for (var L = 0; L < h; L++) if (z[L] != N[L]) {\n              u = !1;\n              break;\n            }\n          }\n        } else {\n          for (var T = 0; T < c; T++) w[f[T]] += r[T];\n\n          for (var B = 0; B < n; B++) e[B] = w[B] / l[B] || 0;\n\n          u = !0;\n\n          for (var G = 0; G < n; G++) if (i[G] != e[G]) {\n            u = !1;\n            break;\n          }\n        }\n\n        u = u || --v <= 0;\n      } while (!u);\n\n      return {\n        it: (o || 1e4) - v,\n        k: n,\n        idxs: f,\n        centroids: e,\n        test: P\n      };\n    };\n  }, {\n    \"./distance.js\": 2,\n    \"./kinit.js\": 3\n  }]\n}, {}, [1]);";

/* eslint-env worker */

/* eslint no-restricted-globals: 1 */
var worker = function worker() {
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

  var scripts = [createUrlScript(skmeans.replace(/window/g, 'self'))];

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
      var worker$1 = createWorker(worker);

      worker$1.onmessage = function (e) {
        if (e.data.error) reject(e.data.error);else resolve(e.data);
        worker$1.terminate();
      };

      worker$1.postMessage({
        initialization: initialization,
        k: k,
        maxIterations: maxIterations,
        items: items,
        scripts: scripts
      });
    });
  };
};

/* eslint-env worker */

/* eslint no-restricted-globals: 1 */
var worker$1 = function worker() {
  var error = function error(message) {
    return {
      error: new Error(message)
    };
  };

  var identity = function identity(x) {
    return x;
  };

  var l2DistDim = function l2DistDim(dim) {
    var body = Array(dim).fill().map(function (_, i) {
      return "s += (v[".concat(i, "] - w[").concat(i, "]) ** 2;");
    }).join(' '); // eslint-disable-next-line no-new-func

    return new Function('v', 'w', "let s = 0; ".concat(body, " return Math.sqrt(s);"));
  }; // From dbscanjs


  var rangeQuery = function rangeQuery(points, q, dist, eps) {
    return points.filter(function (p) {
      return dist(p.datum, q.datum) <= eps;
    });
  };

  var dbscan = function dbscan(data, dist, eps, minPts) {
    var cluster = 0;
    var neighbors = 0;
    var seeds;
    var points = data.map(function (datum, idx) {
      return {
        idx: idx,
        datum: datum,
        label: -1
      };
    });
    points.forEach(function (point) {
      // Only process unlabelled points
      if (point.label !== -1) return; // Get all the points neighbors

      neighbors = rangeQuery(points, point, dist, eps); // Check if point is noise

      if (neighbors.length < minPts) {
        point.label = 0;
        return;
      }

      cluster += 1; // Next cluster label

      point.label = cluster; // Label initial point
      // Remove point p from n

      seeds = neighbors.filter(function (neighbor) {
        return neighbor.idx !== point.idx;
      }); // Process every seed point

      while (seeds.length) {
        var seed = seeds.pop();
        if (seed.label === 0) seed.label = cluster; // Change noise to border
        // eslint-disable-next-line no-continue

        if (seed.label !== -1) continue; // Previously processed

        seed.label = cluster; // Label neighbor
        // Find neighbors

        neighbors = rangeQuery(points, seed, dist, eps); // Add new neighbors to seed

        if (neighbors.length >= minPts) seeds = seeds.concat(neighbors);
      }
    });
    return points.map(function (p) {
      return p.label - 1;
    });
  };

  self.onmessage = function onmessage(event) {
    var _event$data = event.data,
        minPoints = _event$data.minPoints,
        items = _event$data.items,
        scripts = _event$data.scripts; // Import the skmeans

    try {
      scripts.forEach(function (scriptUrl) {
        importScripts(scriptUrl);
      });
    } catch (err) {
      self.postMessage(error("Failed to import skmeans: ".concat(err)));
    } // Get the data from the items


    var data;

    try {
      data = items.map(self.valueGetter || identity);
    } catch (err) {
      self.postMessage(error("Failed to load features: ".concat(err)));
    }

    var dist = self.distanceFunction ? self.distanceFunction : l2DistDim(data[0].length);
    var maxDistance = event.data.maxDistance;

    try {
      if (maxDistance === null) {
        var extrema = data.reduce(function (_extrema, v) {
          return v.map(function (x, i) {
            return [Math.min(x, _extrema[i][0]), Math.max(x, _extrema[i][1])];
          });
        }, Array(data.length).fill().map(function () {
          return [Infinity, -Infinity];
        }));
        var minSize = extrema.reduce(function (min, minMax) {
          return Math.min(min, minMax[1] - minMax[0]);
        }, Infinity);
        maxDistance = 0.1 * minSize;
      }
    } catch (err) {
      self.postMessage(error("Failed to determine max distance: ".concat(err)));
    }

    try {
      // Run dbscan
      var labels = dbscan(data, dist, maxDistance, minPoints || 2);
      var postProcessing = self.postProcessing && self.postProcessing(labels, data, items);
      self.postMessage({
        labels: labels,
        postProcessing: postProcessing
      });
      self.postMessage({
        labels: labels
      });
    } catch (err) {
      self.postMessage(error("Failed to run dbscan: ".concat(err)));
    }
  };
};

var createDbscan = function createDbscan() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$distanceFunction = _ref.distanceFunction,
      distanceFunction = _ref$distanceFunction === void 0 ? null : _ref$distanceFunction,
      _ref$maxDistance = _ref.maxDistance,
      maxDistance = _ref$maxDistance === void 0 ? null : _ref$maxDistance,
      _ref$minPoints = _ref.minPoints,
      minPoints = _ref$minPoints === void 0 ? 2 : _ref$minPoints,
      _ref$valueGetter = _ref.valueGetter,
      valueGetter = _ref$valueGetter === void 0 ? null : _ref$valueGetter,
      _ref$postProcessing = _ref.postProcessing,
      postProcessing = _ref$postProcessing === void 0 ? null : _ref$postProcessing;

  var scripts = [];

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
      var worker = createWorker(worker$1);

      worker.onmessage = function (e) {
        if (e.data.error) reject(e.data.error);else resolve(e.data);
        worker.terminate();
      };

      worker.postMessage({
        maxDistance: maxDistance,
        minPoints: minPoints,
        items: items,
        scripts: scripts
      });
    });
  };
};

export { createDbscan, createKmeans };
