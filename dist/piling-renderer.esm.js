import { resources, Texture, Graphics, Mesh, Geometry, UniformGroup, Shader, State, BaseTexture, SCALE_MODES, Sprite } from 'pixi.js';

/**
 * Promised-based image loading
 * @param   {string}  src  Remote image source, i.e., a URL
 * @return  {object}  Promise resolving to the image once its loaded
 */
var loadImage = function loadImage(src) {
  var isCrossOrigin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return new Promise(function (resolve, reject) {
    var image = new Image();
    if (isCrossOrigin) image.crossOrigin = 'Anonymous';

    image.onload = function () {
      resolve(image);
    };

    image.onerror = function (error) {
      console.error("Could't load ".concat(src));
      reject(error);
    };

    image.src = src;
  });
};

var createImageRenderer = function createImageRenderer() {
  return function (sources) {
    return Promise.all(sources.map(function (src) {
      var isCrossOrigin = true;
      return loadImage(src, isCrossOrigin);
    }));
  };
};

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var asyncToGenerator = _asyncToGenerator;

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var arrayWithHoles = _arrayWithHoles;

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

var iterableToArrayLimit = _iterableToArrayLimit;

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var arrayLikeToArray = _arrayLikeToArray;

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

var unsupportedIterableToArray = _unsupportedIterableToArray;

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var nonIterableRest = _nonIterableRest;

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

var slicedToArray = _slicedToArray;

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;

        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function () {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function (record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
});

var regenerator = runtime_1;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
});

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
});

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
/**
 * A custom buffer resource for PIXI to support WebGL2 data textures
 */

var CustomBufferResource = /*#__PURE__*/function (_PIXI$resources$Resou) {
  inherits(CustomBufferResource, _PIXI$resources$Resou);

  var _super = _createSuper(CustomBufferResource);

  function CustomBufferResource(source, options) {
    var _this;

    classCallCheck(this, CustomBufferResource);

    var _ref = options || {},
        width = _ref.width,
        height = _ref.height,
        internalFormat = _ref.internalFormat,
        format = _ref.format,
        type = _ref.type;

    if (!width || !height || !internalFormat || !format || !type) {
      throw new Error('CustomBufferResource width, height, internalFormat, format, or type invalid');
    }

    _this = _super.call(this, width, height);
    _this.data = source;
    _this.internalFormat = internalFormat;
    _this.format = format;
    _this.type = type;
    return _this;
  }

  createClass(CustomBufferResource, [{
    key: "upload",
    value: function upload(renderer, baseTexture, glTexture) {
      var gl = renderer.gl;
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, baseTexture.alphaMode === 1 // PIXI.ALPHA_MODES.UNPACK but `PIXI.ALPHA_MODES` are not exported
      );
      glTexture.width = baseTexture.width;
      glTexture.height = baseTexture.height;
      gl.texImage2D(baseTexture.target, 0, gl[this.internalFormat], baseTexture.width, baseTexture.height, 0, gl[this.format], gl[this.type], this.data);
      return true;
    }
  }]);

  return CustomBufferResource;
}(resources.Resource);

// @flekschas/utils v0.29.0 Copyright 2021 Fritz Lekschas
/**
 * Test if a variable is a function
 * @param {*} f - The variable to test
 * @return {boolean} If `true` the variable is a function.
 */

const isFunction = f => !!(f && f.constructor && f.call && f.apply);
/**
 * Test if a variable is a plain object, e.g., `{}`
 * @param {*} o - The variable to test
 * @return {boolean} If `true` the variable is a plain object.
 */


const isObject = o => !!o && o.constructor === Object;

var isNdarray = function isNdarray(a) {
  return isObject(a) && a.data && (a.data.constructor === Float32Array || a.data.constructor === Uint8Array) && a.shape;
};

var toDisplayObject = function toDisplayObject(source) {
  var displayObject = source;

  if (!(displayObject instanceof Texture) && !(displayObject instanceof Graphics) && !(displayObject instanceof Mesh)) {
    if (isNdarray(source)) {
      displayObject = Texture.fromBuffer(source.data, source.shape[0], source.shape[1]);
    } else {
      displayObject = Texture.from(source);
    }
  }

  return displayObject;
};

var FS = `#version 300 es

precision mediump float;

uniform sampler2D uDataTex;
uniform sampler2D uColorMapTex;
uniform float uColorMapTexRes;
uniform float uColorMapSize;
uniform float uMinValue;
uniform float uMaxValue;

in vec2 vTextureCoord;

out vec4 outColor;

vec4 toColor(float value) {
  float halfTexel = 0.5 / uColorMapTexRes;

  // Normalize value
  float normValue = clamp(
    (value - uMinValue) / (uMaxValue - uMinValue),
    0.0,
    1.0
  );

  // Linear index into the colormap, e.g., 5 means the 5th color
  float linIdx = max(normValue * uColorMapSize, float(value > 0.0));

  // Texture index into the colormap texture
  vec2 colorTexIndex = vec2(
    (mod(linIdx, uColorMapTexRes) / uColorMapTexRes) + halfTexel,
    (floor(linIdx / uColorMapTexRes) / uColorMapTexRes) + halfTexel
  );

  return texture(uColorMapTex, colorTexIndex);
}

void main() {
  outColor = toColor(texture(uDataTex, vTextureCoord).r);
}
`;

var VS = `#version 300 es

precision mediump float;

// From PIXI
uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;

in vec2 aVertexPosition;
in vec2 aTextureCoord;

out vec2 vTextureCoord;

void main() {
  gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
  vTextureCoord = aTextureCoord;
}
`;

var BLACK_WHITE_COLOR_MAP = [];

var createColorTexture = function createColorTexture(colors) {
  var colorTexRes = Math.max(2, Math.ceil(Math.sqrt(colors.length)));
  var rgba = new Float32Array(Math.pow(colorTexRes, 2) * 4);
  colors.forEach(function (color, i) {
    rgba[i * 4] = color[0]; // r

    rgba[i * 4 + 1] = color[1]; // g

    rgba[i * 4 + 2] = color[2]; // b

    rgba[i * 4 + 3] = color[3]; // a
  });
  return [Texture.fromBuffer(rgba, colorTexRes, colorTexRes), colorTexRes];
};

var createMatrixRenderer = function createMatrixRenderer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$colorMap = _ref.colorMap,
      colorMap = _ref$colorMap === void 0 ? BLACK_WHITE_COLOR_MAP : _ref$colorMap,
      _ref$domain = _ref.domain,
      domain = _ref$domain === void 0 ? [0, 1] : _ref$domain,
      shape = _ref.shape;

  var geometry = new Geometry();
  geometry.addAttribute('aVertexPosition', [-1, -1, 1, -1, 1, 1, -1, 1], 2);
  geometry.addAttribute('aTextureCoord', [0, 0, 1, 0, 1, 1, 0, 1], 2);
  geometry.addIndex([0, 1, 2, 0, 3, 2]);

  var _createColorTexture = createColorTexture(colorMap),
      _createColorTexture2 = slicedToArray(_createColorTexture, 2),
      uColorMapTex = _createColorTexture2[0],
      uColorMapTexRes = _createColorTexture2[1];

  var uColorMapSize = colorMap.length - 1;
  var allUniforms = [];

  var renderer = /*#__PURE__*/function () {
    var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(sources) {
      return regenerator.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", Promise.all(sources.map( /*#__PURE__*/function () {
                var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(source) {
                  var _ref4, _ref5, height, width, createDataTexture, uniforms, shader, state, mesh;

                  return regenerator.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _ref4 = shape || source.shape, _ref5 = slicedToArray(_ref4, 2), height = _ref5[0], width = _ref5[1];

                          createDataTexture = function createDataTexture(data) {
                            var resource = new CustomBufferResource(new Float32Array(data), {
                              width: width,
                              height: height,
                              internalFormat: 'R32F',
                              format: 'RED',
                              type: 'FLOAT'
                            });
                            return new Texture(new BaseTexture(resource, {
                              scaleMode: SCALE_MODES.NEAREST
                            }));
                          };

                          uniforms = new UniformGroup({
                            uColorMapTex: uColorMapTex,
                            uColorMapTexRes: uColorMapTexRes,
                            uColorMapSize: uColorMapSize,
                            uMinValue: domain[0],
                            uMaxValue: domain[1],
                            uDataTex: createDataTexture(source.data)
                          });
                          allUniforms.push(uniforms);
                          shader = Shader.from(VS, FS, uniforms);
                          state = new State();
                          mesh = new Mesh(geometry, shader, state);
                          mesh.width = width;
                          mesh.height = height;
                          return _context.abrupt("return", mesh);

                        case 10:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x2) {
                  return _ref3.apply(this, arguments);
                };
              }())));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function renderer(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  renderer.setColorMap = function (newColorMap) {
    var _createColorTexture3 = createColorTexture(newColorMap),
        _createColorTexture4 = slicedToArray(_createColorTexture3, 2),
        newColorMapTex = _createColorTexture4[0],
        newColorMapTexRes = _createColorTexture4[1];

    allUniforms.forEach(function (_ref6) {
      var uniforms = _ref6.uniforms;
      uniforms.uColorMapTex = newColorMapTex;
      uniforms.uColorMapTexRes = newColorMapTexRes;
    });
  };

  renderer.setDomain = function (newDomain) {
    allUniforms.forEach(function (_ref7) {
      var uniforms = _ref7.uniforms;
      uniforms.uMinValue = newDomain[0];
      uniforms.uMaxValue = newDomain[1];
    });
  };

  renderer.clear = function () {
    allUniforms = [];
  }; // Only for backward compatibility


  renderer.renderer = renderer;
  return renderer;
};

/**
 * [description]
 * @param {number} n - Number of items
 * @return {array} Quintuple of number of number of images, rows,
 *   number of columns, aspectRatio, scaling
 */

var getRegularGrid = function getRegularGrid(n) {
  switch (n) {
    case 1:
      return [1, 1, 1, 1, 1];

    case 2:
      return [2, 1, 2, 1.5, 1.25];

    case 3:
      return [3, 1, 3, 2, 1.35];

    case 4:
    case 5:
      return [4, 2, 2, 1, 1.25];

    case 6:
    case 7:
      return [6, 2, 3, 1.5, 1.5];

    case 8:
      return [8, 2, 4, 2, 1.7];

    case 9:
    default:
      return [9, 3, 3, 1, 1.5];
  }
};

var renderRepresentative = /*#__PURE__*/function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(srcs, itemRenderer) {
    var _ref2,
        _ref2$innerPadding,
        innerPadding,
        _ref2$outerPadding,
        outerPadding,
        _ref2$backgroundColor,
        backgroundColor,
        _ref2$maxNumberOfRepr,
        maxNumberOfRepresentatives,
        n,
        _getRegularGrid,
        _getRegularGrid2,
        _n,
        rows,
        cols,
        aspectRatio,
        renderedItems,
        relWidth,
        relHeight,
        cellAspectRatio,
        gfx,
        maxSize,
        width,
        height,
        cellWidth,
        cellHeight,
        finalWidth,
        finalHeight,
        _args = arguments;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = _args.length > 2 && _args[2] !== undefined ? _args[2] : {}, _ref2$innerPadding = _ref2.innerPadding, innerPadding = _ref2$innerPadding === void 0 ? 2 : _ref2$innerPadding, _ref2$outerPadding = _ref2.outerPadding, outerPadding = _ref2$outerPadding === void 0 ? 2 : _ref2$outerPadding, _ref2$backgroundColor = _ref2.backgroundColor, backgroundColor = _ref2$backgroundColor === void 0 ? 0x000000 : _ref2$backgroundColor, _ref2$maxNumberOfRepr = _ref2.maxNumberOfRepresentatives, maxNumberOfRepresentatives = _ref2$maxNumberOfRepr === void 0 ? 9 : _ref2$maxNumberOfRepr;
            n = Math.min(maxNumberOfRepresentatives, srcs.length);
            _getRegularGrid = getRegularGrid(n), _getRegularGrid2 = slicedToArray(_getRegularGrid, 4), _n = _getRegularGrid2[0], rows = _getRegularGrid2[1], cols = _getRegularGrid2[2], aspectRatio = _getRegularGrid2[3];
            _context.next = 5;
            return itemRenderer(srcs.slice(0, _n));

          case 5:
            renderedItems = _context.sent;
            relWidth = 1.0;
            relHeight = 1.0 / aspectRatio;
            cellAspectRatio = relHeight;
            gfx = new Graphics();
            maxSize = -Infinity;
            renderedItems.forEach(function (renderedItem) {
              maxSize = Math.max(maxSize, renderedItem.width, renderedItem.height);
            });
            width = maxSize;
            height = maxSize * cellAspectRatio;
            cellWidth = maxSize * (relWidth / cols);
            cellHeight = maxSize * (relHeight / rows);
            renderedItems.forEach(function (renderedItem, i) {
              var displayObject = toDisplayObject(renderedItem);
              var isTexture = displayObject instanceof Texture;
              if (isTexture) displayObject = new Sprite(displayObject);
              var row = Math.floor(i / cols);
              var col = i % cols;
              var objectAspectRatio = displayObject.width / displayObject.height;
              var isMorePortrait = objectAspectRatio < cellAspectRatio;
              var scaleFactor = isMorePortrait ? cellWidth / displayObject.width : cellHeight / displayObject.height; // TODO: Fix this hack! One would expect to always scale the display object
              // but somehow this can lead to incorrect scales when the display object is
              // a PIXI Graphics object

              if (scaleFactor > 1 || isTexture) {
                displayObject.width *= scaleFactor;
                displayObject.height *= scaleFactor;
              }

              var objCol = isTexture ? col : col + 0.5;
              var objRow = isTexture ? row : row + 0.5;
              displayObject.x = objCol * cellWidth + col * innerPadding + outerPadding;
              displayObject.y = objRow * cellHeight + row * innerPadding + outerPadding;

              if (isTexture) {
                var size = isMorePortrait ? displayObject.width : displayObject.height;
                displayObject.x -= isMorePortrait ? 0 : (displayObject.width - size) / 2;
                displayObject.y -= isMorePortrait ? (displayObject.height - size) / 2 : 0;
              }

              gfx.addChild(displayObject);
              var mask = new Graphics();
              mask.beginFill(0xff0000, 0.5).drawRect(col * cellWidth + col * innerPadding + outerPadding, row * cellHeight + row * innerPadding + outerPadding, cellWidth, cellHeight).endFill();
              displayObject.mask = mask;
              gfx.addChild(mask);
            });
            finalWidth = width + (cols - 1) * innerPadding + 2 * outerPadding;
            finalHeight = height + (rows - 1) * innerPadding + 2 * outerPadding;
            gfx.beginFill(backgroundColor).drawRect(0, 0, finalWidth, finalHeight).endFill();
            gfx.pivot.x = finalWidth / 2;
            gfx.pivot.y = finalHeight / 2;
            return _context.abrupt("return", gfx);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderRepresentative(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var createRepresentativeRenderer = function createRepresentativeRenderer(itemRenderer, options) {
  var renderer = function renderer(sources) {
    return Promise.all(sources.map(function (srcs) {
      return renderRepresentative(srcs, itemRenderer, options);
    }));
  };

  renderer.scaler = function (pile) {
    return getRegularGrid(pile.items.length)[4];
  };

  return renderer;
};

/**
 * SVG to PIXI texture converter
 * @param {string|object} svg - SVG string or DOM element to be converted
 * @return {object} Rendered texture
 */
var svgToImg = /*#__PURE__*/function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(svg) {
    var _ref2,
        _ref2$width,
        width,
        _ref2$height,
        height,
        _ref2$color,
        color,
        _ref2$background,
        background,
        svgStr,
        response,
        _args = arguments;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = _args.length > 1 && _args[1] !== undefined ? _args[1] : {}, _ref2$width = _ref2.width, width = _ref2$width === void 0 ? 128 : _ref2$width, _ref2$height = _ref2.height, height = _ref2$height === void 0 ? 128 : _ref2$height, _ref2$color = _ref2.color, color = _ref2$color === void 0 ? 'black' : _ref2$color, _ref2$background = _ref2.background, background = _ref2$background === void 0 ? null : _ref2$background;
            svgStr = typeof svg === 'string' || svg instanceof String ? svg : new XMLSerializer().serializeToString(svg);

            if (!(svgStr[0] !== '<')) {
              _context.next = 9;
              break;
            }

            _context.next = 5;
            return fetch(svgStr);

          case 5:
            response = _context.sent;
            _context.next = 8;
            return response.text();

          case 8:
            svgStr = _context.sent;

          case 9:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var image = new Image();
              var colorStyle = color && "color: ".concat(color);
              var backgroundStyle = background && "background: ".concat(background);
              var styles = [colorStyle, backgroundStyle].filter(function (s) {
                return s;
              });
              var style = "style=\"".concat(styles.join('; '), "\"");
              var widthAttr = width && "width=\"".concat(width, "\"");
              var heightAttr = height && "height=\"".concat(height, "\"");
              var attrs = [widthAttr, heightAttr].filter(function (s) {
                return s;
              }).join(' '); // Remove potential `<?xml` and `<!DOCTYPE` definitions which cause an
              // error when being converted to base84 somehow

              // Remove potential `<?xml` and `<!DOCTYPE` definitions which cause an
              // error when being converted to base84 somehow
              svgStr = svgStr.slice(svgStr.indexOf('<svg'));
              var svgTagClosePos = svgStr.indexOf('>');
              var svgTag = svgStr.slice(0, svgTagClosePos + 1); // Remove existing `width` property if it exists

              // Remove existing `width` property if it exists
              var svgTagWidthPos = svgTag.indexOf('width="');

              if (svgTagWidthPos >= 0) {
                var svgTagWidthClosePos = svgTag.indexOf('"', svgTagWidthPos + 7);
                svgTag = svgTag.slice(0, svgTagWidthPos) + svgTag.slice(svgTagWidthClosePos + 1);
              } // Remove existing `height` property if it exists


              // Remove existing `height` property if it exists
              var svgTagHeightPos = svgTag.indexOf('height="');

              if (svgTagHeightPos >= 0) {
                var svgTagheightClosePos = svgTag.indexOf('"', svgTagHeightPos + 8);
                svgTag = svgTag.slice(0, svgTagHeightPos) + svgTag.slice(svgTagheightClosePos + 1);
              } // Remove existing `style` property if it exists


              // Remove existing `style` property if it exists
              var svgTagStylePos = svgTag.indexOf('style="');

              if (svgTagStylePos >= 0) {
                var svgTagStyleClosePos = svgTag.indexOf('"', svgTagStylePos + 7);
                svgTag = svgTag.slice(0, svgTagStylePos) + svgTag.slice(svgTagStyleClosePos + 1);
              }

              svgStr = [[svgTag.slice(0, 5), attrs, style, svgTag.slice(5)].join(' '), svgStr.slice(svgTagClosePos + 1)].join(''); // convert SVG string to base64

              // convert SVG string to base64
              var image64 = "data:image/svg+xml;base64,".concat(btoa(unescape(encodeURIComponent(svgStr))));

              image.onload = function () {
                resolve(image);
              };

              image.onerror = function (error) {
                error.message = 'SVG Renderer: Could not render SVG as an image.';
                reject(error);
              };

              image.src = image64;
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function svgToImg(_x) {
    return _ref.apply(this, arguments);
  };
}();

var createSvgRenderer = function createSvgRenderer(options) {
  return function (sources) {
    return Promise.all(sources.map(function (src) {
      return svgToImg(src, options);
    }));
  };
};

var createD3Renderer = function createD3Renderer(render, options) {
  var svgRenderer = createSvgRenderer(options);
  return function (itemSources) {
    return svgRenderer(itemSources.map(function (itemSrc) {
      var output = render(itemSrc);
      return isFunction(output.node) ? output.node() : output;
    }));
  };
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var createVegaLiteRenderer = function createVegaLiteRenderer(_ref) {
  var baseSpec = _ref.baseSpec,
      vega = _ref.vega,
      vegaLite = _ref.vegaLite;
  return function (itemSources) {
    return Promise.all(itemSources.map(function (itemSrc) {
      var values = Object.prototype.hasOwnProperty.call(itemSrc, 'values') ? itemSrc.values : itemSrc;
      var itemSpec = Object.prototype.hasOwnProperty.call(itemSrc, 'itemSpec') ? itemSrc.itemSpec : {};

      var spec = _objectSpread(_objectSpread(_objectSpread({}, baseSpec), itemSpec), {}, {
        data: {
          values: values
        }
      });

      var view = new vega.View(vega.parse(vegaLite.compile(spec).spec), {
        renderer: 'none'
      });
      return view.toCanvas();
    }));
  };
};

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var createObservablePlotRenderer = function createObservablePlotRenderer(Plot, renderToMarks) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var svgRenderer = createSvgRenderer(options);
  return function (itemSources) {
    return svgRenderer(itemSources.map(function (itemSrc) {
      return Plot.plot(_objectSpread$1({
        marks: renderToMarks(itemSrc)
      }, options));
    }));
  };
};

export { createD3Renderer, createImageRenderer, createMatrixRenderer, createObservablePlotRenderer, createRepresentativeRenderer, createSvgRenderer, createVegaLiteRenderer };
