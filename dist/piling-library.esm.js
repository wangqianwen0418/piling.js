import { Sprite, Mesh, resources, Texture, Graphics, BatchPluginFactory, Renderer, Container, Text, Geometry, State, UniformGroup, Shader } from 'pixi.js';
import { combineReducers, createStore as createStore$1 } from 'redux';

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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var arrayLikeToArray = _arrayLikeToArray;

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

var arrayWithoutHoles = _arrayWithoutHoles;

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

var iterableToArray = _iterableToArray;

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

var unsupportedIterableToArray = _unsupportedIterableToArray;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;

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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var nonIterableRest = _nonIterableRest;

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

var slicedToArray = _slicedToArray;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

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

/**
 * Common utilities
 * @module glMatrix
 */
// Configuration Constants
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
if (!Math.hypot) Math.hypot = function () {
  var y = 0,
      i = arguments.length;

  while (i--) {
    y += arguments[i] * arguments[i];
  }

  return Math.sqrt(y);
};

/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */

function create() {
  var out = new ARRAY_TYPE(16);

  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }

  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */

function clone(a) {
  var out = new ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */

function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */

function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */

function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */

function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */

function fromRotation(out, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;

  if (len < EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c; // Perform rotation-specific matrix multiplication

  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}

/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */

function create$1() {
  var out = new ARRAY_TYPE(4);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }

  return out;
}
/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */

function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}
/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach = function () {
  var vec = create$1();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 4;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }

    return a;
  };
}();

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */

function create$2() {
  var out = new ARRAY_TYPE(2);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }

  return out;
}
/**
 * Get the angle between two 2D vectors
 * @param {vec2} a The first operand
 * @param {vec2} b The second operand
 * @returns {Number} The angle in radians
 */

function angle(a, b) {
  var x1 = a[0],
      y1 = a[1],
      x2 = b[0],
      y2 = b[1];
  var len1 = x1 * x1 + y1 * y1;

  if (len1 > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len1 = 1 / Math.sqrt(len1);
  }

  var len2 = x2 * x2 + y2 * y2;

  if (len2 > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len2 = 1 / Math.sqrt(len2);
  }

  var cosine = (x1 * x2 + y1 * y2) * len1 * len2;

  if (cosine > 1.0) {
    return 0;
  } else if (cosine < -1.0) {
    return Math.PI;
  } else {
    return Math.acos(cosine);
  }
}
/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach$1 = function () {
  var vec = create$2();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }

    return a;
  };
}();

const createCamera = (initTarget = [0, 0], initDistance = 1, initRotation = 0, initViewCenter = [0, 0], initScaleBounds = [0, Infinity]) => {
  // Scratch variables
  const scratch0 = new Float32Array(16);
  const scratch1 = new Float32Array(16);
  const scratch2 = new Float32Array(16);
  let view = create();
  let viewCenter = [...initViewCenter.slice(0, 2), 0, 1];
  const scaleBounds = [...initScaleBounds];

  const getRotation = () => Math.acos(view[0]);

  const getScaling$1 = () => getScaling(scratch0, view)[0];

  const getScaleBounds = () => [...scaleBounds];

  const getDistance = () => 1 / getScaling$1();

  const getTranslation$1 = () => getTranslation(scratch0, view).slice(0, 2);

  const getTarget = () => transformMat4(scratch0, viewCenter, invert(scratch2, view)).slice(0, 2);

  const getView = () => view;

  const getViewCenter = () => viewCenter.slice(0, 2);

  const lookAt = ([x = 0, y = 0] = [], newDistance = 1, newRotation = 0) => {
    // Reset the view
    view = create();
    translate([-x, -y]);
    rotate(newRotation);
    scale(1 / newDistance);
  };

  const translate = ([x = 0, y = 0] = []) => {
    scratch0[0] = x;
    scratch0[1] = y;
    scratch0[2] = 0;
    const t = fromTranslation(scratch1, scratch0); // Translate about the viewport center
    // This is identical to `i * t * i * view` where `i` is the identity matrix

    multiply(view, t, view);
  };

  const scale = (d, mousePos) => {
    if (d <= 0) return;
    const scale = getScaling$1();
    const newScale = scale * d;
    d = Math.max(scaleBounds[0], Math.min(newScale, scaleBounds[1])) / scale;
    if (d === 1) return; // There is nothing to do

    scratch0[0] = d;
    scratch0[1] = d;
    scratch0[2] = 1;
    const s = fromScaling(scratch1, scratch0);
    const scaleCenter = mousePos ? [...mousePos, 0] : viewCenter;
    const a = fromTranslation(scratch0, scaleCenter); // Translate about the scale center
    // I.e., the mouse position or the view center

    multiply(view, a, multiply(view, s, multiply(view, invert(scratch2, a), view)));
  };

  const rotate = rad => {
    const r = create();
    fromRotation(r, rad, [0, 0, 1]); // Rotate about the viewport center
    // This is identical to `i * r * i * view` where `i` is the identity matrix

    multiply(view, r, view);
  };

  const setScaleBounds = newBounds => {
    scaleBounds[0] = newBounds[0];
    scaleBounds[1] = newBounds[1];
  };

  const setView = newView => {
    if (!newView || newView.length < 16) return;
    view = newView;
  };

  const setViewCenter = newViewCenter => {
    viewCenter = [...newViewCenter.slice(0, 2), 0, 1];
  };

  const reset = () => {
    lookAt(initTarget, initDistance, initRotation);
  }; // Init


  lookAt(initTarget, initDistance, initRotation);
  return {
    get translation() {
      return getTranslation$1();
    },

    get target() {
      return getTarget();
    },

    get scaling() {
      return getScaling$1();
    },

    get scaleBounds() {
      return getScaleBounds();
    },

    get distance() {
      return getDistance();
    },

    get rotation() {
      return getRotation();
    },

    get view() {
      return getView();
    },

    get viewCenter() {
      return getViewCenter();
    },

    lookAt,
    translate,
    pan: translate,
    rotate,
    scale,
    zoom: scale,
    reset,
    set: (...args) => {
      console.warn("Deprecated. Please use `setView()` instead.");
      return setView(...args);
    },
    setScaleBounds,
    setView,
    setViewCenter
  };
};

const dom2dCamera = (element, {
  distance = 1.0,
  target = [0, 0],
  rotation = 0,
  isNdc = true,
  isFixed = false,
  isPan = true,
  panSpeed = 1,
  isRotate = true,
  rotateSpeed = 1,
  isZoom = true,
  zoomSpeed = 1,
  viewCenter = null,
  scaleBounds = null,
  onKeyDown = () => {},
  onKeyUp = () => {},
  onMouseDown = () => {},
  onMouseUp = () => {},
  onMouseMove = () => {},
  onWheel = () => {}
} = {}) => {
  let camera = createCamera(target, distance, rotation, viewCenter, scaleBounds);
  let isChanged = false;
  let mouseX = 0;
  let mouseY = 0;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let isLeftMousePressed = false;
  let yScroll = 0;
  let top = 0;
  let left = 0;
  let width = 1;
  let height = 1;
  let aspectRatio = 1;
  let isAlt = false;
  const transformPanX = isNdc ? dX => dX / width * 2 * aspectRatio // to normalized device coords
  : dX => dX;
  const transformPanY = isNdc ? dY => dY / height * 2 // to normalized device coords
  : dY => -dY;
  const transformScaleX = isNdc ? x => (-1 + x / width * 2) * aspectRatio // to normalized device coords
  : x => x;
  const transformScaleY = isNdc ? y => 1 - y / height * 2 // to normalized device coords
  : y => y;

  const tick = () => {
    if (isFixed) return false;
    isChanged = false;

    if (isPan && isLeftMousePressed && !isAlt) {
      // To pan 1:1 we need to half the width and height because the uniform
      // coordinate system goes from -1 to 1.
      camera.pan([transformPanX(panSpeed * (mouseX - prevMouseX)), transformPanY(panSpeed * (prevMouseY - mouseY))]);
      isChanged = true;
    }

    if (isZoom && yScroll) {
      const dZ = zoomSpeed * Math.exp(yScroll / height); // Get normalized device coordinates (NDC)

      const transformedX = transformScaleX(mouseX);
      const transformedY = transformScaleY(mouseY);
      camera.scale(1 / dZ, [transformedX, transformedY]);
      isChanged = true;
    }

    if (isRotate && isLeftMousePressed && isAlt) {
      const wh = width / 2;
      const hh = height / 2;
      const x1 = prevMouseX - wh;
      const y1 = hh - prevMouseY;
      const x2 = mouseX - wh;
      const y2 = hh - mouseY; // Angle between the start and end mouse position with respect to the
      // viewport center

      const radians = angle([x1, y1], [x2, y2]); // Determine the orientation

      const cross = x1 * y2 - x2 * y1;
      camera.rotate(rotateSpeed * radians * Math.sign(cross));
      isChanged = true;
    } // Reset scroll delta and mouse position


    yScroll = 0;
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    return isChanged;
  };

  const config = ({
    isFixed: newIsFixed = null,
    isPan: newIsPan = null,
    isRotate: newIsRotate = null,
    isZoom: newIsZoom = null,
    panSpeed: newPanSpeed = null,
    rotateSpeed: newRotateSpeed = null,
    zoomSpeed: newZoomSpeed = null
  } = {}) => {
    isFixed = newIsFixed !== null ? newIsFixed : isFixed;
    isPan = newIsPan !== null ? newIsPan : isPan;
    isRotate = newIsRotate !== null ? newIsRotate : isRotate;
    isZoom = newIsZoom !== null ? newIsZoom : isZoom;
    panSpeed = +newPanSpeed > 0 ? newPanSpeed : panSpeed;
    rotateSpeed = +newRotateSpeed > 0 ? newRotateSpeed : rotateSpeed;
    zoomSpeed = +newZoomSpeed > 0 ? newZoomSpeed : zoomSpeed;
  };

  const refresh = () => {
    const bBox = element.getBoundingClientRect();
    top = bBox.top;
    left = bBox.left;
    width = bBox.width;
    height = bBox.height;
    aspectRatio = width / height;
  };

  const keyUpHandler = event => {
    isAlt = false;
    onKeyUp(event);
  };

  const keyDownHandler = event => {
    isAlt = event.altKey;
    onKeyDown(event);
  };

  const mouseUpHandler = event => {
    isLeftMousePressed = false;
    onMouseUp(event);
  };

  const mouseDownHandler = event => {
    isLeftMousePressed = event.buttons === 1;
    onMouseDown(event);
  };

  const mouseMoveHandler = event => {
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    mouseX = event.clientX - left;
    mouseY = event.clientY - top;
    onMouseMove(event);
  };

  const wheelHandler = event => {
    event.preventDefault();
    const scale = event.deltaMode === 1 ? 12 : 1;
    yScroll += scale * (event.deltaY || 0);
    onWheel(event);
  };

  const dispose = () => {
    camera = undefined;
    window.removeEventListener("keydown", keyDownHandler);
    window.removeEventListener("keyup", keyUpHandler);
    element.removeEventListener("mousedown", mouseDownHandler);
    window.removeEventListener("mouseup", mouseUpHandler);
    window.removeEventListener("mousemove", mouseMoveHandler);
    element.removeEventListener("wheel", wheelHandler);
  };

  window.addEventListener("keydown", keyDownHandler, {
    passive: true
  });
  window.addEventListener("keyup", keyUpHandler, {
    passive: true
  });
  element.addEventListener("mousedown", mouseDownHandler, {
    passive: true
  });
  window.addEventListener("mouseup", mouseUpHandler, {
    passive: true
  });
  window.addEventListener("mousemove", mouseMoveHandler, {
    passive: true
  });
  element.addEventListener("wheel", wheelHandler, {
    passive: false
  });
  refresh();
  camera.config = config;
  camera.dispose = dispose;
  camera.refresh = refresh;
  camera.tick = tick;
  return camera;
};

/**
 * A new or fake broadcast channel.
 * @type {BroadcastChannel|object}
 */
const bc = (() => {
  try {
    return new window.BroadcastChannel('pub-sub-es');
  } catch (e) {
    return {
      postMessage: () => {}
    };
  }
})();
/**
 * Setup subscriber.
 * @param {object} stack - The bound event stack.
 * @return {function} - Curried function for subscribing to an event on a
 *   specific event stack.
 */


const subscribe = stack =>
/**
 * Subscribe to an event.
 * @param {string} event - Event name to subscribe to.
 * @param {function} handler - Function to be called when event of type
 *   `event` is published.
 * @param {number} times - Number of times the handler should called for the
 *   given event. The event listener will automatically be unsubscribed once
 *   the number of calls exceeds `times`.
 * @return {object} Object with the event name and the handler. The object
 *   can be used to unsubscribe.
 */
(event, handler, times = Infinity) => {
  if (!stack[event]) {
    stack[event] = [];
    stack.__times__[event] = [];
  }

  stack[event].push(handler);

  stack.__times__[event].push(+times || Infinity);

  return {
    event,
    handler
  };
};
/**
 * Setup unsubscriber.
 * @param {object} stack - The bound event stack.
 * @return {function} - Curried function for unsubscribing an event from a
 *   specific event stack.
 */


const unsubscribe = stack =>
/**
 * Unsubscribe from event.
 * @curried
 * @param {string|object} event - Event from which to unsubscribe or the return
 *   object provided by `subscribe()`.
 * @param {function} handler - Handler function to be unsubscribed. It is
 *   ignored if `id` is provided.
 */
(event, handler) => {
  if (typeof event === 'object') {
    handler = event.handler; // eslint-disable-line no-param-reassign

    event = event.event; // eslint-disable-line no-param-reassign
  }

  if (!stack[event]) return;
  const id = stack[event].indexOf(handler);
  if (id === -1 || id >= stack[event].length) return;
  stack[event].splice(id, 1);

  stack.__times__[event].splice(id, 1);
};
/**
 * Setup the publisher.
 * @param  {object} stack - The bound event stack.
 * @param  {boolean} isGlobal - If `true` event will be published globally.
 * @return {function} - Curried function for publishing an event on a specific
 *   event stack.
 */


const publish = (stack, isGlobal) =>
/**
 * Public interface for publishing an event.
 * @curried
 * @param   {string} event - Event type to be published.
 * @param   {any} news - The news to be published.
 * @param   {boolean}  isNoGlobalBroadcast - If `true` event will *not* be
 *   broadcasted gloablly even if `isGlobal` is `true`.
 */
(event, news, isNoGlobalBroadcast) => {
  if (!stack[event]) return;
  const unsubscriber = unsubscribe(stack);
  stack[event].forEach((listener, i) => {
    listener(news);
    stack.__times__[event][i]--;
    if (stack.__times__[event][i] < 1) unsubscriber(event, listener);
  });

  if (isGlobal && !isNoGlobalBroadcast) {
    try {
      bc.postMessage({
        event,
        news
      });
    } catch (error) {
      if (error instanceof DOMException) {
        console.warn(`Could not broadcast '${event}' globally. Payload is not clonable.`);
      } else {
        throw error;
      }
    }
  }
};
/**
 * Setup event clearer
 * @param {object} stack - The bound event stack.
 * @return {function} - A curried function removing all event listeners on a
 *   specific event stack.
 */


const clear = stack =>
/**
 * Remove all event listeners and unset listening times
 * @curried
 */
() => {
  Object.keys(stack).filter(eventName => eventName[0] !== '_').forEach(eventName => {
    stack[eventName] = undefined;
    stack.__times__[eventName] = undefined;
    delete stack[eventName];
    delete stack.__times__[eventName];
  });
};
/**
 * Create a new empty stack object
 * @return {object} - An empty stack object.
 */


const createEmptyStack = () => ({
  __times__: {}
});
/**
 * Create a new pub-sub instance
 * @param {object} stack - Object to be used as the event stack.
 * @return {object} - A new pub-sub instance.
 */


const createPubSub = (stack = createEmptyStack()) => {
  if (!stack.__times__) stack.__times__ = {};
  return {
    publish: publish(stack),
    subscribe: subscribe(stack),
    unsubscribe: unsubscribe(stack),
    clear: clear(stack),
    stack
  };
};
/**
 * Global pub-sub stack object
 * @type {object}
 */


const globalPubSubStack = createEmptyStack();
/**
 * Global pub-sub stack instance
 * @type {object}
 */

const globalPubSub = {
  publish: publish(globalPubSubStack, true),
  subscribe: subscribe(globalPubSubStack),
  unsubscribe: unsubscribe(globalPubSubStack),
  stack: globalPubSubStack
};

bc.onmessage = ({
  data: {
    event,
    news
  }
}) => globalPubSub.publish(event, news, true);

/**
 * Higher order function for request animation frame-based throttling. If you
 * call the wrapped function multiple times, the last argument will be used the
 * next time a frame is available.
 * @param {function} fn - Function to be throttled
 * @param {function} onCall - Callback function, which is triggered with the
 *   return value of `fn`.
 * @param {function} raf - Request animation frame polyfill. Defaults to
 *   `window.requestAnimationFrame`.
 * @return {function} Throttled function `fn` which returns the request ID that
 *   can be used to cancel the request.
 */
const withRaf = (fn, onCall, raf = window.requestAnimationFrame) => {
  let isRequesting = false;
  let requestedArgs;
  return (...args) => {
    requestedArgs = args;
    if (isRequesting) return undefined;
    isRequesting = true;
    return raf(() => {
      const response = fn(...requestedArgs);
      isRequesting = false;
      if (onCall) onCall(response);
    });
  };
};

var rbush_min = createCommonjsModule(function (module, exports) {
  !function (t, i) {
     module.exports = i() ;
  }(commonjsGlobal, function () {

    function t(t, r, e, a, h) {
      !function t(n, r, e, a, h) {
        for (; a > e;) {
          if (a - e > 600) {
            var o = a - e + 1,
                s = r - e + 1,
                l = Math.log(o),
                f = .5 * Math.exp(2 * l / 3),
                u = .5 * Math.sqrt(l * f * (o - f) / o) * (s - o / 2 < 0 ? -1 : 1),
                m = Math.max(e, Math.floor(r - s * f / o + u)),
                c = Math.min(a, Math.floor(r + (o - s) * f / o + u));
            t(n, r, m, c, h);
          }

          var p = n[r],
              d = e,
              x = a;

          for (i(n, e, r), h(n[a], p) > 0 && i(n, e, a); d < x;) {
            for (i(n, d, x), d++, x--; h(n[d], p) < 0;) d++;

            for (; h(n[x], p) > 0;) x--;
          }

          0 === h(n[e], p) ? i(n, e, x) : i(n, ++x, a), x <= r && (e = x + 1), r <= x && (a = x - 1);
        }
      }(t, r, e || 0, a || t.length - 1, h || n);
    }

    function i(t, i, n) {
      var r = t[i];
      t[i] = t[n], t[n] = r;
    }

    function n(t, i) {
      return t < i ? -1 : t > i ? 1 : 0;
    }

    var r = function (t) {
      void 0 === t && (t = 9), this._maxEntries = Math.max(4, t), this._minEntries = Math.max(2, Math.ceil(.4 * this._maxEntries)), this.clear();
    };

    function e(t, i, n) {
      if (!n) return i.indexOf(t);

      for (var r = 0; r < i.length; r++) if (n(t, i[r])) return r;

      return -1;
    }

    function a(t, i) {
      h(t, 0, t.children.length, i, t);
    }

    function h(t, i, n, r, e) {
      e || (e = p(null)), e.minX = 1 / 0, e.minY = 1 / 0, e.maxX = -1 / 0, e.maxY = -1 / 0;

      for (var a = i; a < n; a++) {
        var h = t.children[a];
        o(e, t.leaf ? r(h) : h);
      }

      return e;
    }

    function o(t, i) {
      return t.minX = Math.min(t.minX, i.minX), t.minY = Math.min(t.minY, i.minY), t.maxX = Math.max(t.maxX, i.maxX), t.maxY = Math.max(t.maxY, i.maxY), t;
    }

    function s(t, i) {
      return t.minX - i.minX;
    }

    function l(t, i) {
      return t.minY - i.minY;
    }

    function f(t) {
      return (t.maxX - t.minX) * (t.maxY - t.minY);
    }

    function u(t) {
      return t.maxX - t.minX + (t.maxY - t.minY);
    }

    function m(t, i) {
      return t.minX <= i.minX && t.minY <= i.minY && i.maxX <= t.maxX && i.maxY <= t.maxY;
    }

    function c(t, i) {
      return i.minX <= t.maxX && i.minY <= t.maxY && i.maxX >= t.minX && i.maxY >= t.minY;
    }

    function p(t) {
      return {
        children: t,
        height: 1,
        leaf: !0,
        minX: 1 / 0,
        minY: 1 / 0,
        maxX: -1 / 0,
        maxY: -1 / 0
      };
    }

    function d(i, n, r, e, a) {
      for (var h = [n, r]; h.length;) if (!((r = h.pop()) - (n = h.pop()) <= e)) {
        var o = n + Math.ceil((r - n) / e / 2) * e;
        t(i, o, n, r, a), h.push(n, o, o, r);
      }
    }

    return r.prototype.all = function () {
      return this._all(this.data, []);
    }, r.prototype.search = function (t) {
      var i = this.data,
          n = [];
      if (!c(t, i)) return n;

      for (var r = this.toBBox, e = []; i;) {
        for (var a = 0; a < i.children.length; a++) {
          var h = i.children[a],
              o = i.leaf ? r(h) : h;
          c(t, o) && (i.leaf ? n.push(h) : m(t, o) ? this._all(h, n) : e.push(h));
        }

        i = e.pop();
      }

      return n;
    }, r.prototype.collides = function (t) {
      var i = this.data;
      if (!c(t, i)) return !1;

      for (var n = []; i;) {
        for (var r = 0; r < i.children.length; r++) {
          var e = i.children[r],
              a = i.leaf ? this.toBBox(e) : e;

          if (c(t, a)) {
            if (i.leaf || m(t, a)) return !0;
            n.push(e);
          }
        }

        i = n.pop();
      }

      return !1;
    }, r.prototype.load = function (t) {
      if (!t || !t.length) return this;

      if (t.length < this._minEntries) {
        for (var i = 0; i < t.length; i++) this.insert(t[i]);

        return this;
      }

      var n = this._build(t.slice(), 0, t.length - 1, 0);

      if (this.data.children.length) {
        if (this.data.height === n.height) this._splitRoot(this.data, n);else {
          if (this.data.height < n.height) {
            var r = this.data;
            this.data = n, n = r;
          }

          this._insert(n, this.data.height - n.height - 1, !0);
        }
      } else this.data = n;
      return this;
    }, r.prototype.insert = function (t) {
      return t && this._insert(t, this.data.height - 1), this;
    }, r.prototype.clear = function () {
      return this.data = p([]), this;
    }, r.prototype.remove = function (t, i) {
      if (!t) return this;

      for (var n, r, a, h = this.data, o = this.toBBox(t), s = [], l = []; h || s.length;) {
        if (h || (h = s.pop(), r = s[s.length - 1], n = l.pop(), a = !0), h.leaf) {
          var f = e(t, h.children, i);
          if (-1 !== f) return h.children.splice(f, 1), s.push(h), this._condense(s), this;
        }

        a || h.leaf || !m(h, o) ? r ? (n++, h = r.children[n], a = !1) : h = null : (s.push(h), l.push(n), n = 0, r = h, h = h.children[0]);
      }

      return this;
    }, r.prototype.toBBox = function (t) {
      return t;
    }, r.prototype.compareMinX = function (t, i) {
      return t.minX - i.minX;
    }, r.prototype.compareMinY = function (t, i) {
      return t.minY - i.minY;
    }, r.prototype.toJSON = function () {
      return this.data;
    }, r.prototype.fromJSON = function (t) {
      return this.data = t, this;
    }, r.prototype._all = function (t, i) {
      for (var n = []; t;) t.leaf ? i.push.apply(i, t.children) : n.push.apply(n, t.children), t = n.pop();

      return i;
    }, r.prototype._build = function (t, i, n, r) {
      var e,
          h = n - i + 1,
          o = this._maxEntries;
      if (h <= o) return a(e = p(t.slice(i, n + 1)), this.toBBox), e;
      r || (r = Math.ceil(Math.log(h) / Math.log(o)), o = Math.ceil(h / Math.pow(o, r - 1))), (e = p([])).leaf = !1, e.height = r;
      var s = Math.ceil(h / o),
          l = s * Math.ceil(Math.sqrt(o));
      d(t, i, n, l, this.compareMinX);

      for (var f = i; f <= n; f += l) {
        var u = Math.min(f + l - 1, n);
        d(t, f, u, s, this.compareMinY);

        for (var m = f; m <= u; m += s) {
          var c = Math.min(m + s - 1, u);
          e.children.push(this._build(t, m, c, r - 1));
        }
      }

      return a(e, this.toBBox), e;
    }, r.prototype._chooseSubtree = function (t, i, n, r) {
      for (; r.push(i), !i.leaf && r.length - 1 !== n;) {
        for (var e = 1 / 0, a = 1 / 0, h = void 0, o = 0; o < i.children.length; o++) {
          var s = i.children[o],
              l = f(s),
              u = (m = t, c = s, (Math.max(c.maxX, m.maxX) - Math.min(c.minX, m.minX)) * (Math.max(c.maxY, m.maxY) - Math.min(c.minY, m.minY)) - l);
          u < a ? (a = u, e = l < e ? l : e, h = s) : u === a && l < e && (e = l, h = s);
        }

        i = h || i.children[0];
      }

      var m, c;
      return i;
    }, r.prototype._insert = function (t, i, n) {
      var r = n ? t : this.toBBox(t),
          e = [],
          a = this._chooseSubtree(r, this.data, i, e);

      for (a.children.push(t), o(a, r); i >= 0 && e[i].children.length > this._maxEntries;) this._split(e, i), i--;

      this._adjustParentBBoxes(r, e, i);
    }, r.prototype._split = function (t, i) {
      var n = t[i],
          r = n.children.length,
          e = this._minEntries;

      this._chooseSplitAxis(n, e, r);

      var h = this._chooseSplitIndex(n, e, r),
          o = p(n.children.splice(h, n.children.length - h));

      o.height = n.height, o.leaf = n.leaf, a(n, this.toBBox), a(o, this.toBBox), i ? t[i - 1].children.push(o) : this._splitRoot(n, o);
    }, r.prototype._splitRoot = function (t, i) {
      this.data = p([t, i]), this.data.height = t.height + 1, this.data.leaf = !1, a(this.data, this.toBBox);
    }, r.prototype._chooseSplitIndex = function (t, i, n) {
      for (var r, e, a, o, s, l, u, m = 1 / 0, c = 1 / 0, p = i; p <= n - i; p++) {
        var d = h(t, 0, p, this.toBBox),
            x = h(t, p, n, this.toBBox),
            v = (e = d, a = x, o = void 0, s = void 0, l = void 0, u = void 0, o = Math.max(e.minX, a.minX), s = Math.max(e.minY, a.minY), l = Math.min(e.maxX, a.maxX), u = Math.min(e.maxY, a.maxY), Math.max(0, l - o) * Math.max(0, u - s)),
            M = f(d) + f(x);
        v < m ? (m = v, r = p, c = M < c ? M : c) : v === m && M < c && (c = M, r = p);
      }

      return r || n - i;
    }, r.prototype._chooseSplitAxis = function (t, i, n) {
      var r = t.leaf ? this.compareMinX : s,
          e = t.leaf ? this.compareMinY : l;
      this._allDistMargin(t, i, n, r) < this._allDistMargin(t, i, n, e) && t.children.sort(r);
    }, r.prototype._allDistMargin = function (t, i, n, r) {
      t.children.sort(r);

      for (var e = this.toBBox, a = h(t, 0, i, e), s = h(t, n - i, n, e), l = u(a) + u(s), f = i; f < n - i; f++) {
        var m = t.children[f];
        o(a, t.leaf ? e(m) : m), l += u(a);
      }

      for (var c = n - i - 1; c >= i; c--) {
        var p = t.children[c];
        o(s, t.leaf ? e(p) : p), l += u(s);
      }

      return l;
    }, r.prototype._adjustParentBBoxes = function (t, i, n) {
      for (var r = n; r >= 0; r--) o(i[r], t);
    }, r.prototype._condense = function (t) {
      for (var i = t.length - 1, n = void 0; i >= 0; i--) 0 === t[i].children.length ? i > 0 ? (n = t[i - 1].children).splice(n.indexOf(t[i]), 1) : this.clear() : a(t[i], this.toBBox);
    }, r;
  });
});

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule UserAgent_DEPRECATED
 */

/**
 *  Provides entirely client-side User Agent and OS detection. You should prefer
 *  the non-deprecated UserAgent module when possible, which exposes our
 *  authoritative server-side PHP-based detection to the client.
 *
 *  Usage is straightforward:
 *
 *    if (UserAgent_DEPRECATED.ie()) {
 *      //  IE
 *    }
 *
 *  You can also do version checks:
 *
 *    if (UserAgent_DEPRECATED.ie() >= 7) {
 *      //  IE7 or better
 *    }
 *
 *  The browser functions will return NaN if the browser does not match, so
 *  you can also do version compares the other way:
 *
 *    if (UserAgent_DEPRECATED.ie() < 7) {
 *      //  IE6 or worse
 *    }
 *
 *  Note that the version is a float and may include a minor version number,
 *  so you should always use range operators to perform comparisons, not
 *  strict equality.
 *
 *  **Note:** You should **strongly** prefer capability detection to browser
 *  version detection where it's reasonable:
 *
 *    http://www.quirksmode.org/js/support.html
 *
 *  Further, we have a large number of mature wrapper functions and classes
 *  which abstract away many browser irregularities. Check the documentation,
 *  grep for things, or ask on javascript@lists.facebook.com before writing yet
 *  another copy of "event || window.event".
 *
 */
var _populated = false; // Browsers

var _ie, _firefox, _opera, _webkit, _chrome; // Actual IE browser for compatibility mode


var _ie_real_version; // Platforms


var _osx, _windows, _linux, _android; // Architectures


var _win64; // Devices


var _iphone, _ipad, _native;

var _mobile;

function _populate() {
  if (_populated) {
    return;
  }

  _populated = true; // To work around buggy JS libraries that can't handle multi-digit
  // version numbers, Opera 10's user agent string claims it's Opera
  // 9, then later includes a Version/X.Y field:
  //
  // Opera/9.80 (foo) Presto/2.2.15 Version/10.10

  var uas = navigator.userAgent;
  var agent = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(uas);
  var os = /(Mac OS X)|(Windows)|(Linux)/.exec(uas);
  _iphone = /\b(iPhone|iP[ao]d)/.exec(uas);
  _ipad = /\b(iP[ao]d)/.exec(uas);
  _android = /Android/i.exec(uas);
  _native = /FBAN\/\w+;/i.exec(uas);
  _mobile = /Mobile/i.exec(uas); // Note that the IE team blog would have you believe you should be checking
  // for 'Win64; x64'.  But MSDN then reveals that you can actually be coming
  // from either x64 or ia64;  so ultimately, you should just check for Win64
  // as in indicator of whether you're in 64-bit IE.  32-bit IE on 64-bit
  // Windows will send 'WOW64' instead.

  _win64 = !!/Win64/.exec(uas);

  if (agent) {
    _ie = agent[1] ? parseFloat(agent[1]) : agent[5] ? parseFloat(agent[5]) : NaN; // IE compatibility mode

    if (_ie && document && document.documentMode) {
      _ie = document.documentMode;
    } // grab the "true" ie version from the trident token if available


    var trident = /(?:Trident\/(\d+.\d+))/.exec(uas);
    _ie_real_version = trident ? parseFloat(trident[1]) + 4 : _ie;
    _firefox = agent[2] ? parseFloat(agent[2]) : NaN;
    _opera = agent[3] ? parseFloat(agent[3]) : NaN;
    _webkit = agent[4] ? parseFloat(agent[4]) : NaN;

    if (_webkit) {
      // We do not add the regexp to the above test, because it will always
      // match 'safari' only since 'AppleWebKit' appears before 'Chrome' in
      // the userAgent string.
      agent = /(?:Chrome\/(\d+\.\d+))/.exec(uas);
      _chrome = agent && agent[1] ? parseFloat(agent[1]) : NaN;
    } else {
      _chrome = NaN;
    }
  } else {
    _ie = _firefox = _opera = _chrome = _webkit = NaN;
  }

  if (os) {
    if (os[1]) {
      // Detect OS X version.  If no version number matches, set _osx to true.
      // Version examples:  10, 10_6_1, 10.7
      // Parses version number as a float, taking only first two sets of
      // digits.  If only one set of digits is found, returns just the major
      // version number.
      var ver = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);
      _osx = ver ? parseFloat(ver[1].replace('_', '.')) : true;
    } else {
      _osx = false;
    }

    _windows = !!os[2];
    _linux = !!os[3];
  } else {
    _osx = _windows = _linux = false;
  }
}

var UserAgent_DEPRECATED = {
  /**
   *  Check if the UA is Internet Explorer.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  ie: function () {
    return _populate() || _ie;
  },

  /**
   * Check if we're in Internet Explorer compatibility mode.
   *
   * @return bool true if in compatibility mode, false if
   * not compatibility mode or not ie
   */
  ieCompatibilityMode: function () {
    return _populate() || _ie_real_version > _ie;
  },

  /**
   * Whether the browser is 64-bit IE.  Really, this is kind of weak sauce;  we
   * only need this because Skype can't handle 64-bit IE yet.  We need to remove
   * this when we don't need it -- tracked by #601957.
   */
  ie64: function () {
    return UserAgent_DEPRECATED.ie() && _win64;
  },

  /**
   *  Check if the UA is Firefox.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  firefox: function () {
    return _populate() || _firefox;
  },

  /**
   *  Check if the UA is Opera.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  opera: function () {
    return _populate() || _opera;
  },

  /**
   *  Check if the UA is WebKit.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  webkit: function () {
    return _populate() || _webkit;
  },

  /**
   *  For Push
   *  WILL BE REMOVED VERY SOON. Use UserAgent_DEPRECATED.webkit
   */
  safari: function () {
    return UserAgent_DEPRECATED.webkit();
  },

  /**
   *  Check if the UA is a Chrome browser.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  chrome: function () {
    return _populate() || _chrome;
  },

  /**
   *  Check if the user is running Windows.
   *
   *  @return bool `true' if the user's OS is Windows.
   */
  windows: function () {
    return _populate() || _windows;
  },

  /**
   *  Check if the user is running Mac OS X.
   *
   *  @return float|bool   Returns a float if a version number is detected,
   *                       otherwise true/false.
   */
  osx: function () {
    return _populate() || _osx;
  },

  /**
   * Check if the user is running Linux.
   *
   * @return bool `true' if the user's OS is some flavor of Linux.
   */
  linux: function () {
    return _populate() || _linux;
  },

  /**
   * Check if the user is running on an iPhone or iPod platform.
   *
   * @return bool `true' if the user is running some flavor of the
   *    iPhone OS.
   */
  iphone: function () {
    return _populate() || _iphone;
  },
  mobile: function () {
    return _populate() || _iphone || _ipad || _android || _mobile;
  },
  nativeApp: function () {
    // webviews inside of the native apps
    return _populate() || _native;
  },
  android: function () {
    return _populate() || _android;
  },
  ipad: function () {
    return _populate() || _ipad;
  }
};
var UserAgent_DEPRECATED_1 = UserAgent_DEPRECATED;

/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ExecutionEnvironment
 */

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */

var ExecutionEnvironment = {
  canUseDOM: canUseDOM,
  canUseWorkers: typeof Worker !== 'undefined',
  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
  canUseViewport: canUseDOM && !!window.screen,
  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};
var ExecutionEnvironment_1 = ExecutionEnvironment;

var useHasFeature;

if (ExecutionEnvironment_1.canUseDOM) {
  useHasFeature = document.implementation && document.implementation.hasFeature && // always returns true in newer browsers as per the standard.
  // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
  document.implementation.hasFeature('', '') !== true;
}
/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */


function isEventSupported(eventNameSuffix, capture) {
  if (!ExecutionEnvironment_1.canUseDOM || capture && !('addEventListener' in document)) {
    return false;
  }

  var eventName = 'on' + eventNameSuffix;
  var isSupported = (eventName in document);

  if (!isSupported) {
    var element = document.createElement('div');
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] === 'function';
  }

  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
    // This is the only way to test support for the `wheel` event in IE9+.
    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
  }

  return isSupported;
}

var isEventSupported_1 = isEventSupported;

var PIXEL_STEP = 10;
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = 800;
/**
 * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
 * complicated, thus this doc is long and (hopefully) detailed enough to answer
 * your questions.
 *
 * If you need to react to the mouse wheel in a predictable way, this code is
 * like your bestest friend. * hugs *
 *
 * As of today, there are 4 DOM event types you can listen to:
 *
 *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
 *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
 *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
 *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
 *
 * So what to do?  The is the best:
 *
 *   normalizeWheel.getEventType();
 *
 * In your event callback, use this code to get sane interpretation of the
 * deltas.  This code will return an object with properties:
 *
 *   spinX   -- normalized spin speed (use for zoom) - x plane
 *   spinY   -- " - y plane
 *   pixelX  -- normalized distance (to pixels) - x plane
 *   pixelY  -- " - y plane
 *
 * Wheel values are provided by the browser assuming you are using the wheel to
 * scroll a web page by a number of lines or pixels (or pages).  Values can vary
 * significantly on different platforms and browsers, forgetting that you can
 * scroll at different speeds.  Some devices (like trackpads) emit more events
 * at smaller increments with fine granularity, and some emit massive jumps with
 * linear speed or acceleration.
 *
 * This code does its best to normalize the deltas for you:
 *
 *   - spin is trying to normalize how far the wheel was spun (or trackpad
 *     dragged).  This is super useful for zoom support where you want to
 *     throw away the chunky scroll steps on the PC and make those equal to
 *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
 *     resolve a single slow step on a wheel to 1.
 *
 *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
 *     get the crazy differences between browsers, but at least it'll be in
 *     pixels!
 *
 *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
 *     should translate to positive value zooming IN, negative zooming OUT.
 *     This matches the newer 'wheel' event.
 *
 * Why are there spinX, spinY (or pixels)?
 *
 *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
 *     with a mouse.  It results in side-scrolling in the browser by default.
 *
 *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
 *
 *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
 *     probably is by browsers in conjunction with fancy 3D controllers .. but
 *     you know.
 *
 * Implementation info:
 *
 * Examples of 'wheel' event if you scroll slowly (down) by one step with an
 * average mouse:
 *
 *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
 *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
 *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
 *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
 *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
 *
 * On the trackpad:
 *
 *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
 *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
 *
 * On other/older browsers.. it's more complicated as there can be multiple and
 * also missing delta values.
 *
 * The 'wheel' event is more standard:
 *
 * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
 *
 * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
 * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
 * backward compatibility with older events.  Those other values help us
 * better normalize spin speed.  Example of what the browsers provide:
 *
 *                          | event.wheelDelta | event.detail
 *        ------------------+------------------+--------------
 *          Safari v5/OS X  |       -120       |       0
 *          Safari v5/Win7  |       -120       |       0
 *         Chrome v17/OS X  |       -120       |       0
 *         Chrome v17/Win7  |       -120       |       0
 *                IE9/Win7  |       -120       |   undefined
 *         Firefox v4/OS X  |     undefined    |       1
 *         Firefox v4/Win7  |     undefined    |       3
 *
 */

function normalizeWheel(
/*object*/
event)
/*object*/
{
  var sX = 0,
      sY = 0,
      // spinX, spinY
  pX = 0,
      pY = 0; // pixelX, pixelY
  // Legacy

  if ('detail' in event) {
    sY = event.detail;
  }

  if ('wheelDelta' in event) {
    sY = -event.wheelDelta / 120;
  }

  if ('wheelDeltaY' in event) {
    sY = -event.wheelDeltaY / 120;
  }

  if ('wheelDeltaX' in event) {
    sX = -event.wheelDeltaX / 120;
  } // side scrolling on FF with DOMMouseScroll


  if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
    sX = sY;
    sY = 0;
  }

  pX = sX * PIXEL_STEP;
  pY = sY * PIXEL_STEP;

  if ('deltaY' in event) {
    pY = event.deltaY;
  }

  if ('deltaX' in event) {
    pX = event.deltaX;
  }

  if ((pX || pY) && event.deltaMode) {
    if (event.deltaMode == 1) {
      // delta in LINE units
      pX *= LINE_HEIGHT;
      pY *= LINE_HEIGHT;
    } else {
      // delta in PAGE units
      pX *= PAGE_HEIGHT;
      pY *= PAGE_HEIGHT;
    }
  } // Fall-back if spin cannot be determined


  if (pX && !sX) {
    sX = pX < 1 ? -1 : 1;
  }

  if (pY && !sY) {
    sY = pY < 1 ? -1 : 1;
  }

  return {
    spinX: sX,
    spinY: sY,
    pixelX: pX,
    pixelY: pY
  };
}
/**
 * The best combination if you prefer spinX + spinY normalization.  It favors
 * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
 * 'wheel' event, making spin speed determination impossible.
 */


normalizeWheel.getEventType = function ()
/*string*/
{
  return UserAgent_DEPRECATED_1.firefox() ? 'DOMMouseScroll' : isEventSupported_1('wheel') ? 'wheel' : 'mousewheel';
};

var normalizeWheel_1 = normalizeWheel;

var normalizeWheel$1 = normalizeWheel_1;

var BATCH = 'BATCHING_REDUCER.BATCH';
function batchActions(actions) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : BATCH;
  return {
    type,
    meta: {
      batch: true
    },
    payload: actions
  };
}
function enableBatching(reduce) {
  return function batchingReducer(state, action) {
    if (action && action.meta && action.meta.batch) {
      return action.payload.reduce(batchingReducer, state);
    }

    return reduce(state, action);
  };
}

// @flekschas/utils v0.29.0 Copyright 2021 Fritz Lekschas
/**
 * Cubic in and out easing function
 * @param {number} t - The input time to be eased. Must be in [0, 1] where `0`
 *   refers to the start and `1` to the end
 * @return {number} The eased time
 */


const cubicInOut = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
/**
 * Cubic out easing function
 * @param {number} t - The input time to be eased. Must be in [0, 1] where `0`
 *   refers to the start and `1` to the end
 * @return {number} The eased time
 */


const cubicOut = t => --t * t * t + 1;
/**
 * Linearly interpolate two numbers
 * @param {number} a - The start value
 * @param {number} b - The end value
 * @param {number} p - The interpolation progress. Must be in [0, 1] where `0`
 *   refers to the start value and `1` to the end value
 * @return {number} The interpolated number
 */


const interpolateNumber = (a, b, p) => {
  // eslint-disable-next-line no-param-reassign
  p = Math.min(1, Math.max(0, p));
  return a * (1 - p) + b * p;
};
/**
 * Lineraly interpolate a numerical vector
 * @param {array} a - The start vector
 * @param {array} b - The end vector
 * @param {number} p - The interpolation progress. Must be in [0, 1] where `0`
 *   refers to the start vector and `1` to the end vector
 * @return {array} The interpolated vector
 */


const interpolateVector = (a, b, p) => a.map((x, i) => interpolateNumber(x, b[i], p));
/**
 * Identity function
 * @param   {*}  x  Any kind of value
 * @return  {*}  `x`
 */


const identity = x => x;
/**
 * Test if two floats are close given some precision
 * @param {number} a - First float
 * @param {number} b - Second float
 * @param {number} precision - Number of decimal places to check
 * @return {boolean} If `true` the difference between the floats is less than
 *   10^-precision
 */


const isClose = (a, b, precision = 6) => Math.abs(a - b) < 10 ** -precision;
/**
 * Return unique values of an array
 * @param {array} a - Input array
 * @return {array} Array with unique values
 */


const unique = (a, getter = identity) => {
  const s = new Set();
  const out = [];

  for (let i = 0; i < a.length; i++) {
    const v = getter(a[i]);

    if (!s.has(v)) {
      s.add(v);
      out.push(v);
    }
  }

  return out;
};
/**
 * Test if a variable is an array
 * @param {*} f - The variable to test
 * @return {boolean} If `true` the variable is an array.
 */


const isArray = Array.isArray;
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
/**
 * Vector L2 norm
 *
 * @description
 * This is identical but much faster than `Math.hypot(...v)`
 *
 * @param {array} v - Numerical vector
 * @return {number} L2 norm
 */


const l2Norm = v => Math.sqrt(v.reduce((sum, x) => sum + x ** 2, 0));
/**
 * Get the maximum number of a vector while ignoring NaNs
 *
 * @description
 * This version is muuuch faster than `Math.max(...v)`.
 *
 * @param {array} v - Numerical vector
 * @return {number} The largest number
 */


const max = v => v.reduce((_max, a) => a > _max ? a : _max, -Infinity);
/**
 * Get the max vector
 * @param {array} m - Array of vectors
 * @return {array} Max vector
 */

const maxVector = m => {
  switch (m.length) {
    case 0:
      return [];

    case 1:
      return m[0];

    default:
      return m.reduce((_max, v) => v.map((x, i) => _max[i] > x ? _max[i] : x), new Array(m[0].length).fill(-Infinity));
  }
};
/**
 * Get the mean of a vector
 *
 * @param {array} v - Numerical vector
 * @return {number} The mean
 */


const mean = v => sum(v) / v.length;
/**
 * Get the mean vector
 * @param {array} m - Array of vectors
 * @return {array} Mean vector
 */


const meanVector = m => {
  switch (m.length) {
    case 0:
      return [];

    case 1:
      return m[0];

    default:
      return m.reduce((_mean, v) => v.map((x, i) => _mean[i] + x / m.length), new Array(m[0].length).fill(0));
  }
};
/**
 * Get the median of a vector
 *
 * @param {array} v - Numerical vector
 * @return {number} The median
 */


const median = v => v[Math.floor(v.length / 2)];
/**
 * Get the median vector
 * @param {array} m - Array of vectors
 * @return {array} The median vector
 */


const medianVector = median;
/**
 * Get the minimum number of a vector while ignoring NaNs
 *
 * @description
 * This version is muuuch faster than `Math.min(...v)` and support longer
 * vectors than 256^2, which is a limitation of `Math.min.apply(null, v)`.
 *
 * @param {array} v - Numerical vector
 * @return {number} The smallest number
 */

const min = v => v.reduce((_min, a) => a < _min ? a : _min, Infinity);
/**
 * Get the min vector
 * @param {array} m - Array of vectors
 * @return {array} Min vector
 */

const minVector = m => {
  switch (m.length) {
    case 0:
      return [];

    case 1:
      return m[0];

    default:
      return m.reduce((_min, v) => v.map((x, i) => _min[i] < x ? _min[i] : x), new Array(m[0].length).fill(Infinity));
  }
};
/**
 * Normalize vector
 * @param {array} v - Numerical vector
 * @return {array} Unit vector
 */


const normalize = v => {
  const norm = l2Norm(v);
  return v.map(x => x / norm);
};
/**
 * Get the sum of a vector while ignoring NaNs
 *
 * @example
 * sum([0, 10, 12, 22])
 * // >> 42
 *
 * @param {array} v - Numerical vector
 * @return {number} The sum
 */


const sum = values => values.reduce((s, v) => {
  // Any falsey value (e.g., 0, null, NaN) does not influence the sum
  if (v) return s + v;
  return s;
}, 0);
/**
 * Get the sum vector
 * @param {array} m - Array of vectors
 * @return {array} Sum vector
 */

const sumVector = m => {
  switch (m.length) {
    case 0:
      return [];

    case 1:
      return m[0];

    default:
      return m.reduce((_sum, v) => v.map((x, i) => _sum[i] + x), new Array(m[0].length).fill(0));
  }
};

const XMLNS = 'http://www.w3.org/2000/svg';
/**
 * Method to add a class name to an HTML or SVG element.
 * @param {object} element - HTML or SVG element to add a class to.
 * @param {string} className - The class name to be added.
 */

const addClass = (element, className) => {
  if (element.namespaceURI === XMLNS) {
    if (!hasClass(element, className)) {
      const klass = element.getAttribute('class') || '';
      element.setAttribute('class', `${klass} ${className}`);
    }
  } else if (element.classList) {
    element.classList.add(className);
  } else if (!hasClass(element, className)) {
    element.className += ` ${className}`;
  }
};
/**
 * Create HTML from a template string
 * @param {string} template - HTML template string
 * @return {node} Root DOM element
 */


const createHtmlByTemplate = template => {
  const dummyEl = document.createElement('div');
  dummyEl.insertAdjacentHTML('beforeend', template);
  return dummyEl.firstChild;
};
/**
 * Check if an HTML or SVG element has a certain class
 * @param {object} element - HTML or SVG element to be checked
 * @param {string} className - Class name to be checked for
 * @return {boolean} If `true` `element` has the class name
 */


const hasClass = (element, className) => {
  if (element.namespaceURI === XMLNS) {
    const klass = element.getAttribute('class');
    return klass && !!klass.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
  }

  if (element.classList) return element.classList.contains(className);
  return !!element.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
};
/**
 * Remove all children of a DOM node
 * @param {object} node - DOM node whose children are to be removed
 */


const removeAllChildren = node => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};
/**
 * Remove last child of a DOM node
 * @param {object} node - DOM node whose last child is to be removed
 */


const removeLastChild = node => {
  node.removeChild(node.lastChild);
};
/**
 * Remove a class from an HTML or SVG element.
 * @param {object} element - HTML or SVG element.
 * @param {string} className - Class name to be removed.
 */


const removeClass = (element, className) => {
  const reg = new RegExp(`(\\s|^)${className}(\\s|$)`);

  if (element.namespaceURI === XMLNS) {
    const klass = element.getAttribute('class') || '';
    element.setAttribute('class', klass.replace(reg, ' '));
  } else if (element.classList) {
    element.classList.remove(className);
  } else if (hasClass(element, className)) {
    element.className = element.className.replace(reg, ' ');
  }
};

const assign = (target, ...sources) => {
  sources.forEach(source => {
    // eslint-disable-next-line no-shadow
    const descriptors = Object.keys(source).reduce((descriptors, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {}); // By default, Object.assign copies enumerable Symbols, too

    Object.getOwnPropertySymbols(source).forEach(symbol => {
      const descriptor = Object.getOwnPropertyDescriptor(source, symbol);

      if (descriptor.enumerable) {
        descriptors[symbol] = descriptor;
      }
    });
    Object.defineProperties(target, descriptors);
  });
  return target;
};
/**
 * Deep clone an object.
 *
 * @param {object} source - Object to be cloned.
 * @return {object} Cloned `source` object.
 */


const deepClone = source => {
  let target;
  return extend(target, source);
};
/**
 * Extend an object with another object.
 *
 * @param {object} target - Target object or `undefined` if a new object should
 *   be created.
 * @param {object} source - Object to be cloned.
 * @return {object} Cloned `source` object
 */


const extend = (target, source) => {
  if (source === null || typeof source !== 'object') {
    return source;
  }

  if (source.constructor !== Object && source.constructor !== Array) {
    return source;
  }

  if (source.constructor === Date || source.constructor === RegExp || source.constructor === Function || source.constructor === String || source.constructor === Number || source.constructor === Boolean) {
    return new source.constructor(source);
  }

  const out = target || new source.constructor();
  Object.keys(source).forEach(key => {
    const descriptor = Object.getOwnPropertyDescriptor(source, key);

    if (typeof out[key] === 'undefined') {
      if (typeof descriptor.value === 'undefined') {
        Object.defineProperty(out, key, descriptor);
      } else {
        out[key] = extend(undefined, source[key]);
      }
    }
  });
  return out;
};
/**
 * Update the target object by the source object. Besides extending that target
 * object, properties that are not present in the source object.
 *
 * @param {object} target - Target object or `undefined` if a new object should
 *   be created.
 * @param {object} source - Object to be cloned.
 * @return {object} Cloned `source` object
 */


const update = (target, source) => {
  // Return boolean, number, strings, and null
  if (source === null || typeof source !== 'object') {
    return source;
  } // Recreate special objects. Special objects are of type "object" but are not
  // simple arrays or objects, e.g.:
  // Date, RegExp, String, Number, Boolean, or Function


  if (source.constructor !== Object && source.constructor !== Array) {
    return new source.constructor(source);
  }

  const out = new target.constructor(); // Update properties

  let updated = false;
  Object.keys(source).forEach(key => {
    const descriptor = Object.getOwnPropertyDescriptor(source, key);

    if (target[key] === undefined) {
      // The `key` prop does not exist on `target` so we will extend `target`
      // with the `key` prop.
      if (typeof descriptor.value === 'undefined') {
        Object.defineProperty(out, key, descriptor);
      } else {
        out[key] = extend(undefined, source[key]);
      }
    } else {
      // The `key` prop exist on `target` so we update it.
      out[key] = update(target[key], source[key]);
    }

    updated = updated || out[key] !== target[key];
  }); // In case no property was updated but some were removed `updated` needs to be
  // true

  updated = updated || Object.keys(target).filter(key => typeof source[key] === 'undefined').length;
  return updated ? out : target;
};

const camelToConst = str => str.split(/(?=[A-Z])/).join('_').toUpperCase();

const capitalize = str => `${str[0].toUpperCase()}${str.substr(1)}`;
/**
 * Functional version of `Array.forEach`
 *
 * @description
 * More flexible and applicable to other array-like data types.
 *
 * @param {function} f - Modifier function applied on every item of the array.
 * @return {array} Modified array-like variable.
 */


const forEach$2 = f => x => Array.prototype.forEach.call(x, f);
/**
 * Convenience function to compose functions
 * @param {...function} fns - Array of functions
 * @return {function} The composed function
 */


const pipe = (...fns) =>
/**
 * @param {*} x - Some value
 * @return {*} Output of the composed function
 */
x => fns.reduce((y, f) => f(y), x);
/**
 * Assign a constructor to the object
 * @param {function} constructor - Constructor functions
 */


const withConstructor = constructor => self => assign({
  __proto__: {
    constructor
  }
}, self);
/**
 * Forward a method call
 * @param {string} name - Exposed function name
 * @param {function} fn - Function to be forwarded
 */


const withForwardedMethod = (name, fn) => self => assign(self, {
  [name](...args) {
    return fn.apply(this, args);
  }

});
/**
 * Assign a property to an object
 * @param {string} name - Name of the property
 * @param {object} options - Option object
 * @param {*} options.initialValue - Initial value of the property
 * @param {function} options.getter - Custom getter
 * @param {function} options.setter - Custom setter
 * @param {function} options.cloner - Clone function. Used before the value
 *   is returned.
 * @param {function} options.transformer - Value transformer. Used before a new
 *   value is set.
 * @param {function} options.validator - Validator function decides whether the
 *   new and transformed value is set or not.
 */


const withProperty = (name, {
  initialValue = undefined,
  getter: customGetter,
  setter: customSetter,
  cloner = identity,
  transformer = identity,
  validator = () => true
} = {}) => self => {
  let value = initialValue;
  const getter = customGetter ? () => customGetter() : () => cloner(value);
  const setter = customSetter ? newValue => customSetter(newValue) : newValue => {
    const transformedNewValue = transformer(newValue);
    value = validator(transformedNewValue) ? transformedNewValue : value;
  };
  return assign(self, {
    get [name]() {
      return getter();
    },

    [`set${capitalize(name)}`](newValue) {
      setter(newValue);
    }

  });
};
/**
 * Assign a read-only property to an object
 * @param {string} name - Name of the property
 * @param {function} getter - Getter function
 */


const withReadOnlyProperty = (name, getter) => self => assign(self, {
  get [name]() {
    return getter();
  }

});
/**
 * Assign a static property to an object
 * @param {string} name - Name of the property
 * @param {*} value - Static value
 */


const withStaticProperty = (name, value) => self => assign(self, {
  get [name]() {
    return value;
  }

});
/**
 * L1 distance between a pair of points
 *
 * @description
 * Identical but much faster than `l1Dist([fromX, fromY], [toX, toY])`
 *
 * @param {number} fromX - X coordinate of the first point
 * @param {number} fromY - Y coordinate of the first point
 * @param {number} toX - X coordinate of the second point
 * @param {number} toY - Y coordinate of the first point
 * @return {number} L1 distance
 */


const l1PointDist = (fromX, fromY, toX, toY) => Math.abs(fromX - toX) + Math.abs(fromY - toY);
/**
 * L2 distance between a pair of points
 *
 * @description
 * Identical but much faster than `l2Dist([fromX, fromY], [toX, toY])`
 *
 * @param {number} fromX - X coordinate of the first point
 * @param {number} fromY - Y coordinate of the first point
 * @param {number} toX - X coordinate of the second point
 * @param {number} toY - Y coordinate of the first point
 * @return {number} L2 distance
 */


const l2PointDist = (fromX, fromY, toX, toY) => Math.sqrt((fromX - toX) ** 2 + (fromY - toY) ** 2);
/**
 * L distance between a pair of rectangles
 *
 * @param {number} l - Defines the Lp space
 */


const lRectDist = l =>
/**
 * L distance function between a pair of rectangles
 *
 * @param {object} bBox1 - Bounding box of the first rectangle
 * @param {object} bBox2 - Bounding box of the second rectangle
 * @return {number} L distance of the closest boundary points
 */
(bBox1, bBox2) => {
  const xd1 = bBox2.minX - bBox1.minX;
  const xd2 = bBox2.minX - bBox1.maxX;
  const xd3 = bBox2.maxX - bBox1.minX;
  const xd4 = bBox2.maxX - bBox1.maxX;
  const isXInside = // bBox1 is x-wise inside of bBox2
  xd1 < 0 && xd3 > 0 || xd2 < 0 && xd4 > 0 || xd1 > 0 && xd2 < 0 || xd3 > 0 && xd4 < 0;
  const yd1 = bBox2.minY - bBox1.minY;
  const yd2 = bBox2.minY - bBox1.maxY;
  const yd3 = bBox2.maxY - bBox1.minY;
  const yd4 = bBox2.maxY - bBox1.maxY;
  const isYInside = // bBox1 is y-wise inside of bBox2
  yd1 < 0 && yd3 > 0 || yd2 < 0 && yd4 > 0 || yd1 > 0 && yd2 < 0 || yd3 > 0 && yd4 < 0;
  if (isXInside && isYInside) return 0;
  const minYDist = Math.min(Math.abs(yd1), Math.abs(yd2), Math.abs(yd3), Math.abs(yd4));
  if (isXInside) return minYDist;
  const minXDist = Math.min(Math.abs(xd1), Math.abs(xd2), Math.abs(xd3), Math.abs(xd4));
  if (isYInside) return minXDist;
  return (minXDist ** l + minYDist ** l) ** (1 / l);
};
/**
 * From: https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html
 * @param   {Array}  point  Tuple of the form `[x,y]` to be tested.
 * @param   {Array}  polygon  1D list of vertices defining the polygon.
 * @return  {boolean}  If `true` point lies within the polygon.
 */


const isPointInPolygon = ([px, py] = [], polygon = []) => {
  let x1;
  let y1;
  let x2;
  let y2;
  let isWithin = false;

  for (let i = 0, j = polygon.length - 2; i < polygon.length; i += 2) {
    x1 = polygon[i];
    y1 = polygon[i + 1];
    x2 = polygon[j];
    y2 = polygon[j + 1];
    if (y1 > py !== y2 > py && px < (x2 - x1) * (py - y1) / (y2 - y1) + x1) isWithin = !isWithin;
    j = i;
  }

  return isWithin;
};

const mergeMaps = (map1, map2) => new Map(function* merge() {
  yield* map1;
  yield* map2;
}());
/**
 * Create a worker from a function
 * @param {function} fn - Function to be turned into a worker
 * @return {Worker} Worker function
 */


const createWorker = fn => new Worker(window.URL.createObjectURL(new Blob([`(${fn.toString()})()`], {
  type: 'text/javascript'
})));
/**
 * An adventure into the void!
 * @return {undefined} The explorers find nothing but void.
 */


const toVoid = () => {};

const sortAsc = (a, b) => a - b;

const sortDesc = (a, b) => b - a;
/**
 * Return the sort position of each element in an array or object
 *
 * @example
 * let array = [9, 5, 11, -1, 0];
 * let pos = sortPos(array)
 * // >> [3, 2, 4, 0, 1]
 * // I.e., the first element of `array` is at position pos[0] == 3
 *
 * let object = { 1: 9, 2: 5, 11: 11, 100: -1, 999: 0 };
 * let pos = sortPos(object)
 * // >> { 1: 3, 2: 2, 11: 4, 100: 0, 999: 1 }
 * // I.e., element `999` of `object` is at position pos[999] == 1
 *
 * @param {array} array - Array of numerical values
 * @param {function} comparator - Pairwise value comparator function
 * @return {array} Array of the sorted value positions
 */


const sortPos = (source, {
  getter = identity,
  comparator = sortAsc,
  ignoreNull = false
} = {}) => Object.entries(source).map(ignoreNull ? ([id, x]) => getter(x) === null ? undefined : [id, getter(x)] : ([id, x]) => [id, getter(x)]).sort((a, b) => comparator(a[1], b[1])).reduce((out, tuple, i) => {
  if (!tuple) return out;
  out[tuple[0]] = i;
  return out;
}, new source.constructor());
/**
 * Debounce a function call.
 *
 * @description
 * Function calls are delayed by `wait` milliseconds and only one out of
 * multiple function calls is executed.
 *
 * @param {function} fn - Function to be debounced
 * @param {number} wait - Number of milliseconds to debounce the function call.
 * @return {function} Debounced function
 */


const debounce = (fn, wait) => {
  let timeout;

  const debounced = (...args) => {
    const later = () => {
      timeout = null;
      fn(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  debounced.cancel = () => {
    clearTimeout(timeout);
  };

  debounced.now = (...args) => fn(...args);

  return debounced;
};
/**
 * Get a promise that resolves after the next `n` animation frames
 * @param {number} n - Number of animation frames to wait
 * @return {Promise} A promise that resolves after the next `n` animation frames
 */


const nextAnimationFrame = (n = 1) => new Promise(resolve => {
  let i = 0;

  const raf = () => requestAnimationFrame(() => {
    i++;
    if (i < n) raf();else resolve();
  });

  raf();
});
/**
 * Throttle and debounce a function call
 *
 * Throttling a function call means that the function is called at most every
 * `interval` milliseconds no matter how frequently you trigger a call.
 * Debouncing a function call means that the function is called the earliest
 * after `finalWait` milliseconds wait time where the function was not called.
 * Combining the two ensures that the function is called at most every
 * `interval` milliseconds and is ensured to be called with the very latest
 * arguments after after `finalWait` milliseconds wait time at the end.
 *
 * The following imaginary scenario describes the behavior:
 *
 * MS | throttleTime=3 and debounceTime=3
 * 1. y(f, 3, 3)(args1) => f(args1) called
 * 2. y(f, 3, 3)(args2) => call ignored due to throttling
 * 3. y(f, 3, 3)(args3) => call ignored due to throttling
 * 4. y(f, 3, 3)(args4) => f(args4) called
 * 5. y(f, 3, 3)(args5) => all ignored due to throttling
 * 6. No call           => nothing
 * 7. No call           => f(args5) called due to debouncing
 *
 * @param {functon} func - Function to be throttled and debounced
 * @param {number} interval - Throttle intevals in milliseconds
 * @param {number} wait - Debounce wait time in milliseconds By default this is
 *   the same as `interval`.
 * @return {function} - Throttled and debounced function
 */


const throttleAndDebounce = (fn, throttleTime, debounceTime = null) => {
  let timeout;
  let blockedCalls = 0; // eslint-disable-next-line no-param-reassign

  debounceTime = debounceTime === null ? throttleTime : debounceTime;

  const debounced = (...args) => {
    const later = () => {
      // Since we throttle and debounce we should check whether there were
      // actually multiple attempts to call this function after the most recent
      // throttled call. If there were no more calls we don't have to call
      // the function again.
      if (blockedCalls > 0) {
        fn(...args);
        blockedCalls = 0;
      }
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, debounceTime);
  };

  let isWaiting = false;

  const throttledAndDebounced = (...args) => {
    if (!isWaiting) {
      fn(...args);
      debounced(...args);
      isWaiting = true;
      blockedCalls = 0;
      setTimeout(() => {
        isWaiting = false;
      }, throttleTime);
    } else {
      blockedCalls++;
      debounced(...args);
    }
  };

  throttledAndDebounced.reset = () => {
    isWaiting = false;
  };

  throttledAndDebounced.cancel = () => {
    clearTimeout(timeout);
  };

  throttledAndDebounced.now = (...args) => fn(...args);

  return throttledAndDebounced;
};
/**
 * Promise that resolves after some time
 * @param {number} msec - Time in milliseconds until the promise is resolved
 * @return {Promise} Promise resolving after `msec` milliseconds
 */


const wait = msec => new Promise(resolve => setTimeout(resolve, msec));

/**
 * Bit twiddling hacks for JavaScript.
 *
 * Author: Mikola Lysenko
 *
 * Ported from Stanford bit twiddling hack library:
 *    http://graphics.stanford.edu/~seander/bithacks.html
 */

var INT_BITS = 32; //Constants

var INT_BITS_1 = INT_BITS;
var INT_MAX = 0x7fffffff;
var INT_MIN = -1 << INT_BITS - 1; //Returns -1, 0, +1 depending on sign of x

var sign = function (v) {
  return (v > 0) - (v < 0);
}; //Computes absolute value of integer


var abs = function (v) {
  var mask = v >> INT_BITS - 1;
  return (v ^ mask) - mask;
}; //Computes minimum of integers x and y


var min$1 = function (x, y) {
  return y ^ (x ^ y) & -(x < y);
}; //Computes maximum of integers x and y


var max$1 = function (x, y) {
  return x ^ (x ^ y) & -(x < y);
}; //Checks if a number is a power of two


var isPow2 = function (v) {
  return !(v & v - 1) && !!v;
}; //Computes log base 2 of v


var log2 = function (v) {
  var r, shift;
  r = (v > 0xFFFF) << 4;
  v >>>= r;
  shift = (v > 0xFF) << 3;
  v >>>= shift;
  r |= shift;
  shift = (v > 0xF) << 2;
  v >>>= shift;
  r |= shift;
  shift = (v > 0x3) << 1;
  v >>>= shift;
  r |= shift;
  return r | v >> 1;
}; //Computes log base 10 of v


var log10 = function (v) {
  return v >= 1000000000 ? 9 : v >= 100000000 ? 8 : v >= 10000000 ? 7 : v >= 1000000 ? 6 : v >= 100000 ? 5 : v >= 10000 ? 4 : v >= 1000 ? 3 : v >= 100 ? 2 : v >= 10 ? 1 : 0;
}; //Counts number of bits


var popCount = function (v) {
  v = v - (v >>> 1 & 0x55555555);
  v = (v & 0x33333333) + (v >>> 2 & 0x33333333);
  return (v + (v >>> 4) & 0xF0F0F0F) * 0x1010101 >>> 24;
}; //Counts number of trailing zeros


function countTrailingZeros(v) {
  var c = 32;
  v &= -v;
  if (v) c--;
  if (v & 0x0000FFFF) c -= 16;
  if (v & 0x00FF00FF) c -= 8;
  if (v & 0x0F0F0F0F) c -= 4;
  if (v & 0x33333333) c -= 2;
  if (v & 0x55555555) c -= 1;
  return c;
}

var countTrailingZeros_1 = countTrailingZeros; //Rounds to next power of 2

var nextPow2 = function (v) {
  v += v === 0;
  --v;
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v + 1;
}; //Rounds down to previous power of 2


var prevPow2 = function (v) {
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v - (v >>> 1);
}; //Computes parity of word


var parity = function (v) {
  v ^= v >>> 16;
  v ^= v >>> 8;
  v ^= v >>> 4;
  v &= 0xf;
  return 0x6996 >>> v & 1;
};

var REVERSE_TABLE = new Array(256);

(function (tab) {
  for (var i = 0; i < 256; ++i) {
    var v = i,
        r = i,
        s = 7;

    for (v >>>= 1; v; v >>>= 1) {
      r <<= 1;
      r |= v & 1;
      --s;
    }

    tab[i] = r << s & 0xff;
  }
})(REVERSE_TABLE); //Reverse bits in a 32 bit word


var reverse = function (v) {
  return REVERSE_TABLE[v & 0xff] << 24 | REVERSE_TABLE[v >>> 8 & 0xff] << 16 | REVERSE_TABLE[v >>> 16 & 0xff] << 8 | REVERSE_TABLE[v >>> 24 & 0xff];
}; //Interleave bits of 2 coordinates with 16 bits.  Useful for fast quadtree codes


var interleave2 = function (x, y) {
  x &= 0xFFFF;
  x = (x | x << 8) & 0x00FF00FF;
  x = (x | x << 4) & 0x0F0F0F0F;
  x = (x | x << 2) & 0x33333333;
  x = (x | x << 1) & 0x55555555;
  y &= 0xFFFF;
  y = (y | y << 8) & 0x00FF00FF;
  y = (y | y << 4) & 0x0F0F0F0F;
  y = (y | y << 2) & 0x33333333;
  y = (y | y << 1) & 0x55555555;
  return x | y << 1;
}; //Extracts the nth interleaved component


var deinterleave2 = function (v, n) {
  v = v >>> n & 0x55555555;
  v = (v | v >>> 1) & 0x33333333;
  v = (v | v >>> 2) & 0x0F0F0F0F;
  v = (v | v >>> 4) & 0x00FF00FF;
  v = (v | v >>> 16) & 0x000FFFF;
  return v << 16 >> 16;
}; //Interleave bits of 3 coordinates, each with 10 bits.  Useful for fast octree codes


var interleave3 = function (x, y, z) {
  x &= 0x3FF;
  x = (x | x << 16) & 4278190335;
  x = (x | x << 8) & 251719695;
  x = (x | x << 4) & 3272356035;
  x = (x | x << 2) & 1227133513;
  y &= 0x3FF;
  y = (y | y << 16) & 4278190335;
  y = (y | y << 8) & 251719695;
  y = (y | y << 4) & 3272356035;
  y = (y | y << 2) & 1227133513;
  x |= y << 1;
  z &= 0x3FF;
  z = (z | z << 16) & 4278190335;
  z = (z | z << 8) & 251719695;
  z = (z | z << 4) & 3272356035;
  z = (z | z << 2) & 1227133513;
  return x | z << 2;
}; //Extracts nth interleaved component of a 3-tuple


var deinterleave3 = function (v, n) {
  v = v >>> n & 1227133513;
  v = (v | v >>> 2) & 3272356035;
  v = (v | v >>> 4) & 251719695;
  v = (v | v >>> 8) & 4278190335;
  v = (v | v >>> 16) & 0x3FF;
  return v << 22 >> 22;
}; //Computes next combination in colexicographic order (this is mistakenly called nextPermutation on the bit twiddling hacks page)


var nextCombination = function (v) {
  var t = v | v - 1;
  return t + 1 | (~t & -~t) - 1 >>> countTrailingZeros(v) + 1;
};

var twiddle = {
  INT_BITS: INT_BITS_1,
  INT_MAX: INT_MAX,
  INT_MIN: INT_MIN,
  sign: sign,
  abs: abs,
  min: min$1,
  max: max$1,
  isPow2: isPow2,
  log2: log2,
  log10: log10,
  popCount: popCount,
  countTrailingZeros: countTrailingZeros_1,
  nextPow2: nextPow2,
  prevPow2: prevPow2,
  parity: parity,
  reverse: reverse,
  interleave2: interleave2,
  deinterleave2: deinterleave2,
  interleave3: interleave3,
  deinterleave3: deinterleave3,
  nextCombination: nextCombination
};

function iota(n) {
  var result = new Array(n);

  for (var i = 0; i < n; ++i) {
    result[i] = i;
  }

  return result;
}

var iota_1 = iota;

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
var isBuffer_1 = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
};

function isBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
} // For Node v0.10 support. Remove this eventually.


function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
}

var hasTypedArrays = typeof Float64Array !== "undefined";

function compare1st(a, b) {
  return a[0] - b[0];
}

function order() {
  var stride = this.stride;
  var terms = new Array(stride.length);
  var i;

  for (i = 0; i < terms.length; ++i) {
    terms[i] = [Math.abs(stride[i]), i];
  }

  terms.sort(compare1st);
  var result = new Array(terms.length);

  for (i = 0; i < result.length; ++i) {
    result[i] = terms[i][1];
  }

  return result;
}

function compileConstructor(dtype, dimension) {
  var className = ["View", dimension, "d", dtype].join("");

  if (dimension < 0) {
    className = "View_Nil" + dtype;
  }

  var useGetters = dtype === "generic";

  if (dimension === -1) {
    //Special case for trivial arrays
    var code = "function " + className + "(a){this.data=a;};\
var proto=" + className + ".prototype;\
proto.dtype='" + dtype + "';\
proto.index=function(){return -1};\
proto.size=0;\
proto.dimension=-1;\
proto.shape=proto.stride=proto.order=[];\
proto.lo=proto.hi=proto.transpose=proto.step=\
function(){return new " + className + "(this.data);};\
proto.get=proto.set=function(){};\
proto.pick=function(){return null};\
return function construct_" + className + "(a){return new " + className + "(a);}";
    var procedure = new Function(code);
    return procedure();
  } else if (dimension === 0) {
    //Special case for 0d arrays
    var code = "function " + className + "(a,d) {\
this.data = a;\
this.offset = d\
};\
var proto=" + className + ".prototype;\
proto.dtype='" + dtype + "';\
proto.index=function(){return this.offset};\
proto.dimension=0;\
proto.size=1;\
proto.shape=\
proto.stride=\
proto.order=[];\
proto.lo=\
proto.hi=\
proto.transpose=\
proto.step=function " + className + "_copy() {\
return new " + className + "(this.data,this.offset)\
};\
proto.pick=function " + className + "_pick(){\
return TrivialArray(this.data);\
};\
proto.valueOf=proto.get=function " + className + "_get(){\
return " + (useGetters ? "this.data.get(this.offset)" : "this.data[this.offset]") + "};\
proto.set=function " + className + "_set(v){\
return " + (useGetters ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") + "\
};\
return function construct_" + className + "(a,b,c,d){return new " + className + "(a,d)}";
    var procedure = new Function("TrivialArray", code);
    return procedure(CACHED_CONSTRUCTORS[dtype][0]);
  }

  var code = ["'use strict'"]; //Create constructor for view

  var indices = iota_1(dimension);
  var args = indices.map(function (i) {
    return "i" + i;
  });
  var index_str = "this.offset+" + indices.map(function (i) {
    return "this.stride[" + i + "]*i" + i;
  }).join("+");
  var shapeArg = indices.map(function (i) {
    return "b" + i;
  }).join(",");
  var strideArg = indices.map(function (i) {
    return "c" + i;
  }).join(",");
  code.push("function " + className + "(a," + shapeArg + "," + strideArg + ",d){this.data=a", "this.shape=[" + shapeArg + "]", "this.stride=[" + strideArg + "]", "this.offset=d|0}", "var proto=" + className + ".prototype", "proto.dtype='" + dtype + "'", "proto.dimension=" + dimension); //view.size:

  code.push("Object.defineProperty(proto,'size',{get:function " + className + "_size(){\
return " + indices.map(function (i) {
    return "this.shape[" + i + "]";
  }).join("*"), "}})"); //view.order:

  if (dimension === 1) {
    code.push("proto.order=[0]");
  } else {
    code.push("Object.defineProperty(proto,'order',{get:");

    if (dimension < 4) {
      code.push("function " + className + "_order(){");

      if (dimension === 2) {
        code.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})");
      } else if (dimension === 3) {
        code.push("var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);\
if(s0>s1){\
if(s1>s2){\
return [2,1,0];\
}else if(s0>s2){\
return [1,2,0];\
}else{\
return [1,0,2];\
}\
}else if(s0>s2){\
return [2,0,1];\
}else if(s2>s1){\
return [0,1,2];\
}else{\
return [0,2,1];\
}}})");
      }
    } else {
      code.push("ORDER})");
    }
  } //view.set(i0, ..., v):


  code.push("proto.set=function " + className + "_set(" + args.join(",") + ",v){");

  if (useGetters) {
    code.push("return this.data.set(" + index_str + ",v)}");
  } else {
    code.push("return this.data[" + index_str + "]=v}");
  } //view.get(i0, ...):


  code.push("proto.get=function " + className + "_get(" + args.join(",") + "){");

  if (useGetters) {
    code.push("return this.data.get(" + index_str + ")}");
  } else {
    code.push("return this.data[" + index_str + "]}");
  } //view.index:


  code.push("proto.index=function " + className + "_index(", args.join(), "){return " + index_str + "}"); //view.hi():

  code.push("proto.hi=function " + className + "_hi(" + args.join(",") + "){return new " + className + "(this.data," + indices.map(function (i) {
    return ["(typeof i", i, "!=='number'||i", i, "<0)?this.shape[", i, "]:i", i, "|0"].join("");
  }).join(",") + "," + indices.map(function (i) {
    return "this.stride[" + i + "]";
  }).join(",") + ",this.offset)}"); //view.lo():

  var a_vars = indices.map(function (i) {
    return "a" + i + "=this.shape[" + i + "]";
  });
  var c_vars = indices.map(function (i) {
    return "c" + i + "=this.stride[" + i + "]";
  });
  code.push("proto.lo=function " + className + "_lo(" + args.join(",") + "){var b=this.offset,d=0," + a_vars.join(",") + "," + c_vars.join(","));

  for (var i = 0; i < dimension; ++i) {
    code.push("if(typeof i" + i + "==='number'&&i" + i + ">=0){\
d=i" + i + "|0;\
b+=c" + i + "*d;\
a" + i + "-=d}");
  }

  code.push("return new " + className + "(this.data," + indices.map(function (i) {
    return "a" + i;
  }).join(",") + "," + indices.map(function (i) {
    return "c" + i;
  }).join(",") + ",b)}"); //view.step():

  code.push("proto.step=function " + className + "_step(" + args.join(",") + "){var " + indices.map(function (i) {
    return "a" + i + "=this.shape[" + i + "]";
  }).join(",") + "," + indices.map(function (i) {
    return "b" + i + "=this.stride[" + i + "]";
  }).join(",") + ",c=this.offset,d=0,ceil=Math.ceil");

  for (var i = 0; i < dimension; ++i) {
    code.push("if(typeof i" + i + "==='number'){\
d=i" + i + "|0;\
if(d<0){\
c+=b" + i + "*(a" + i + "-1);\
a" + i + "=ceil(-a" + i + "/d)\
}else{\
a" + i + "=ceil(a" + i + "/d)\
}\
b" + i + "*=d\
}");
  }

  code.push("return new " + className + "(this.data," + indices.map(function (i) {
    return "a" + i;
  }).join(",") + "," + indices.map(function (i) {
    return "b" + i;
  }).join(",") + ",c)}"); //view.transpose():

  var tShape = new Array(dimension);
  var tStride = new Array(dimension);

  for (var i = 0; i < dimension; ++i) {
    tShape[i] = "a[i" + i + "]";
    tStride[i] = "b[i" + i + "]";
  }

  code.push("proto.transpose=function " + className + "_transpose(" + args + "){" + args.map(function (n, idx) {
    return n + "=(" + n + "===undefined?" + idx + ":" + n + "|0)";
  }).join(";"), "var a=this.shape,b=this.stride;return new " + className + "(this.data," + tShape.join(",") + "," + tStride.join(",") + ",this.offset)}"); //view.pick():

  code.push("proto.pick=function " + className + "_pick(" + args + "){var a=[],b=[],c=this.offset");

  for (var i = 0; i < dimension; ++i) {
    code.push("if(typeof i" + i + "==='number'&&i" + i + ">=0){c=(c+this.stride[" + i + "]*i" + i + ")|0}else{a.push(this.shape[" + i + "]);b.push(this.stride[" + i + "])}");
  }

  code.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"); //Add return statement

  code.push("return function construct_" + className + "(data,shape,stride,offset){return new " + className + "(data," + indices.map(function (i) {
    return "shape[" + i + "]";
  }).join(",") + "," + indices.map(function (i) {
    return "stride[" + i + "]";
  }).join(",") + ",offset)}"); //Compile procedure

  var procedure = new Function("CTOR_LIST", "ORDER", code.join("\n"));
  return procedure(CACHED_CONSTRUCTORS[dtype], order);
}

function arrayDType(data) {
  if (isBuffer_1(data)) {
    return "buffer";
  }

  if (hasTypedArrays) {
    switch (Object.prototype.toString.call(data)) {
      case "[object Float64Array]":
        return "float64";

      case "[object Float32Array]":
        return "float32";

      case "[object Int8Array]":
        return "int8";

      case "[object Int16Array]":
        return "int16";

      case "[object Int32Array]":
        return "int32";

      case "[object Uint8Array]":
        return "uint8";

      case "[object Uint16Array]":
        return "uint16";

      case "[object Uint32Array]":
        return "uint32";

      case "[object Uint8ClampedArray]":
        return "uint8_clamped";

      case "[object BigInt64Array]":
        return "bigint64";

      case "[object BigUint64Array]":
        return "biguint64";
    }
  }

  if (Array.isArray(data)) {
    return "array";
  }

  return "generic";
}

var CACHED_CONSTRUCTORS = {
  "float32": [],
  "float64": [],
  "int8": [],
  "int16": [],
  "int32": [],
  "uint8": [],
  "uint16": [],
  "uint32": [],
  "array": [],
  "uint8_clamped": [],
  "bigint64": [],
  "biguint64": [],
  "buffer": [],
  "generic": []
};

function wrappedNDArrayCtor(data, shape, stride, offset) {
  if (data === undefined) {
    var ctor = CACHED_CONSTRUCTORS.array[0];
    return ctor([]);
  } else if (typeof data === "number") {
    data = [data];
  }

  if (shape === undefined) {
    shape = [data.length];
  }

  var d = shape.length;

  if (stride === undefined) {
    stride = new Array(d);

    for (var i = d - 1, sz = 1; i >= 0; --i) {
      stride[i] = sz;
      sz *= shape[i];
    }
  }

  if (offset === undefined) {
    offset = 0;

    for (var i = 0; i < d; ++i) {
      if (stride[i] < 0) {
        offset -= (shape[i] - 1) * stride[i];
      }
    }
  }

  var dtype = arrayDType(data);
  var ctor_list = CACHED_CONSTRUCTORS[dtype];

  while (ctor_list.length <= d + 1) {
    ctor_list.push(compileConstructor(dtype, ctor_list.length - 1));
  }

  var ctor = ctor_list[d + 1];
  return ctor(data, shape, stride, offset);
}

var ndarray = wrappedNDArrayCtor;

function unique_pred(list, compare) {
  var ptr = 1,
      len = list.length,
      a = list[0],
      b = list[0];

  for (var i = 1; i < len; ++i) {
    b = a;
    a = list[i];

    if (compare(a, b)) {
      if (i === ptr) {
        ptr++;
        continue;
      }

      list[ptr++] = a;
    }
  }

  list.length = ptr;
  return list;
}

function unique_eq(list) {
  var ptr = 1,
      len = list.length,
      a = list[0],
      b = list[0];

  for (var i = 1; i < len; ++i, b = a) {
    b = a;
    a = list[i];

    if (a !== b) {
      if (i === ptr) {
        ptr++;
        continue;
      }

      list[ptr++] = a;
    }
  }

  list.length = ptr;
  return list;
}

function unique$1(list, compare, sorted) {
  if (list.length === 0) {
    return list;
  }

  if (compare) {
    if (!sorted) {
      list.sort(compare);
    }

    return unique_pred(list, compare);
  }

  if (!sorted) {
    list.sort();
  }

  return unique_eq(list);
}

var uniq = unique$1;

// TODO: If two arrays have the same strides (and offsets) there is potential for decreasing the number of "pointers" and related variables. The drawback is that the type signature would become more specific and that there would thus be less potential for caching, but it might still be worth it, especially when dealing with large numbers of arguments.


function innerFill(order, proc, body) {
  var dimension = order.length,
      nargs = proc.arrayArgs.length,
      has_index = proc.indexArgs.length > 0,
      code = [],
      vars = [],
      idx = 0,
      pidx = 0,
      i,
      j;

  for (i = 0; i < dimension; ++i) {
    // Iteration variables
    vars.push(["i", i, "=0"].join(""));
  } //Compute scan deltas


  for (j = 0; j < nargs; ++j) {
    for (i = 0; i < dimension; ++i) {
      pidx = idx;
      idx = order[i];

      if (i === 0) {
        // The innermost/fastest dimension's delta is simply its stride
        vars.push(["d", j, "s", i, "=t", j, "p", idx].join(""));
      } else {
        // For other dimensions the delta is basically the stride minus something which essentially "rewinds" the previous (more inner) dimension
        vars.push(["d", j, "s", i, "=(t", j, "p", idx, "-s", pidx, "*t", j, "p", pidx, ")"].join(""));
      }
    }
  }

  if (vars.length > 0) {
    code.push("var " + vars.join(","));
  } //Scan loop


  for (i = dimension - 1; i >= 0; --i) {
    // Start at largest stride and work your way inwards
    idx = order[i];
    code.push(["for(i", i, "=0;i", i, "<s", idx, ";++i", i, "){"].join(""));
  } //Push body of inner loop


  code.push(body); //Advance scan pointers

  for (i = 0; i < dimension; ++i) {
    pidx = idx;
    idx = order[i];

    for (j = 0; j < nargs; ++j) {
      code.push(["p", j, "+=d", j, "s", i].join(""));
    }

    if (has_index) {
      if (i > 0) {
        code.push(["index[", pidx, "]-=s", pidx].join(""));
      }

      code.push(["++index[", idx, "]"].join(""));
    }

    code.push("}");
  }

  return code.join("\n");
} // Generate "outer" loops that loop over blocks of data, applying "inner" loops to the blocks by manipulating the local variables in such a way that the inner loop only "sees" the current block.
// TODO: If this is used, then the previous declaration (done by generateCwiseOp) of s* is essentially unnecessary.
//       I believe the s* are not used elsewhere (in particular, I don't think they're used in the pre/post parts and "shape" is defined independently), so it would be possible to make defining the s* dependent on what loop method is being used.


function outerFill(matched, order, proc, body) {
  var dimension = order.length,
      nargs = proc.arrayArgs.length,
      blockSize = proc.blockSize,
      has_index = proc.indexArgs.length > 0,
      code = [];

  for (var i = 0; i < nargs; ++i) {
    code.push(["var offset", i, "=p", i].join(""));
  } //Generate loops for unmatched dimensions
  // The order in which these dimensions are traversed is fairly arbitrary (from small stride to large stride, for the first argument)
  // TODO: It would be nice if the order in which these loops are placed would also be somehow "optimal" (at the very least we should check that it really doesn't hurt us if they're not).


  for (var i = matched; i < dimension; ++i) {
    code.push(["for(var j" + i + "=SS[", order[i], "]|0;j", i, ">0;){"].join("")); // Iterate back to front

    code.push(["if(j", i, "<", blockSize, "){"].join("")); // Either decrease j by blockSize (s = blockSize), or set it to zero (after setting s = j).

    code.push(["s", order[i], "=j", i].join(""));
    code.push(["j", i, "=0"].join(""));
    code.push(["}else{s", order[i], "=", blockSize].join(""));
    code.push(["j", i, "-=", blockSize, "}"].join(""));

    if (has_index) {
      code.push(["index[", order[i], "]=j", i].join(""));
    }
  }

  for (var i = 0; i < nargs; ++i) {
    var indexStr = ["offset" + i];

    for (var j = matched; j < dimension; ++j) {
      indexStr.push(["j", j, "*t", i, "p", order[j]].join(""));
    }

    code.push(["p", i, "=(", indexStr.join("+"), ")"].join(""));
  }

  code.push(innerFill(order, proc, body));

  for (var i = matched; i < dimension; ++i) {
    code.push("}");
  }

  return code.join("\n");
} //Count the number of compatible inner orders
// This is the length of the longest common prefix of the arrays in orders.
// Each array in orders lists the dimensions of the correspond ndarray in order of increasing stride.
// This is thus the maximum number of dimensions that can be efficiently traversed by simple nested loops for all arrays.


function countMatches(orders) {
  var matched = 0,
      dimension = orders[0].length;

  while (matched < dimension) {
    for (var j = 1; j < orders.length; ++j) {
      if (orders[j][matched] !== orders[0][matched]) {
        return matched;
      }
    }

    ++matched;
  }

  return matched;
} //Processes a block according to the given data types
// Replaces variable names by different ones, either "local" ones (that are then ferried in and out of the given array) or ones matching the arguments that the function performing the ultimate loop will accept.


function processBlock(block, proc, dtypes) {
  var code = block.body;
  var pre = [];
  var post = [];

  for (var i = 0; i < block.args.length; ++i) {
    var carg = block.args[i];

    if (carg.count <= 0) {
      continue;
    }

    var re = new RegExp(carg.name, "g");
    var ptrStr = "";
    var arrNum = proc.arrayArgs.indexOf(i);

    switch (proc.argTypes[i]) {
      case "offset":
        var offArgIndex = proc.offsetArgIndex.indexOf(i);
        var offArg = proc.offsetArgs[offArgIndex];
        arrNum = offArg.array;
        ptrStr = "+q" + offArgIndex;
      // Adds offset to the "pointer" in the array

      case "array":
        ptrStr = "p" + arrNum + ptrStr;
        var localStr = "l" + i;
        var arrStr = "a" + arrNum;

        if (proc.arrayBlockIndices[arrNum] === 0) {
          // Argument to body is just a single value from this array
          if (carg.count === 1) {
            // Argument/array used only once(?)
            if (dtypes[arrNum] === "generic") {
              if (carg.lvalue) {
                pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")); // Is this necessary if the argument is ONLY used as an lvalue? (keep in mind that we can have a += something, so we would actually need to check carg.rvalue)

                code = code.replace(re, localStr);
                post.push([arrStr, ".set(", ptrStr, ",", localStr, ")"].join(""));
              } else {
                code = code.replace(re, [arrStr, ".get(", ptrStr, ")"].join(""));
              }
            } else {
              code = code.replace(re, [arrStr, "[", ptrStr, "]"].join(""));
            }
          } else if (dtypes[arrNum] === "generic") {
            pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")); // TODO: Could we optimize by checking for carg.rvalue?

            code = code.replace(re, localStr);

            if (carg.lvalue) {
              post.push([arrStr, ".set(", ptrStr, ",", localStr, ")"].join(""));
            }
          } else {
            pre.push(["var ", localStr, "=", arrStr, "[", ptrStr, "]"].join("")); // TODO: Could we optimize by checking for carg.rvalue?

            code = code.replace(re, localStr);

            if (carg.lvalue) {
              post.push([arrStr, "[", ptrStr, "]=", localStr].join(""));
            }
          }
        } else {
          // Argument to body is a "block"
          var reStrArr = [carg.name],
              ptrStrArr = [ptrStr];

          for (var j = 0; j < Math.abs(proc.arrayBlockIndices[arrNum]); j++) {
            reStrArr.push("\\s*\\[([^\\]]+)\\]");
            ptrStrArr.push("$" + (j + 1) + "*t" + arrNum + "b" + j); // Matched index times stride
          }

          re = new RegExp(reStrArr.join(""), "g");
          ptrStr = ptrStrArr.join("+");

          if (dtypes[arrNum] === "generic") {
            /*if(carg.lvalue) {
              pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")) // Is this necessary if the argument is ONLY used as an lvalue? (keep in mind that we can have a += something, so we would actually need to check carg.rvalue)
              code = code.replace(re, localStr)
              post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""))
            } else {
              code = code.replace(re, [arrStr, ".get(", ptrStr, ")"].join(""))
            }*/
            throw new Error("cwise: Generic arrays not supported in combination with blocks!");
          } else {
            // This does not produce any local variables, even if variables are used multiple times. It would be possible to do so, but it would complicate things quite a bit.
            code = code.replace(re, [arrStr, "[", ptrStr, "]"].join(""));
          }
        }

        break;

      case "scalar":
        code = code.replace(re, "Y" + proc.scalarArgs.indexOf(i));
        break;

      case "index":
        code = code.replace(re, "index");
        break;

      case "shape":
        code = code.replace(re, "shape");
        break;
    }
  }

  return [pre.join("\n"), code, post.join("\n")].join("\n").trim();
}

function typeSummary(dtypes) {
  var summary = new Array(dtypes.length);
  var allEqual = true;

  for (var i = 0; i < dtypes.length; ++i) {
    var t = dtypes[i];
    var digits = t.match(/\d+/);

    if (!digits) {
      digits = "";
    } else {
      digits = digits[0];
    }

    if (t.charAt(0) === 0) {
      summary[i] = "u" + t.charAt(1) + digits;
    } else {
      summary[i] = t.charAt(0) + digits;
    }

    if (i > 0) {
      allEqual = allEqual && summary[i] === summary[i - 1];
    }
  }

  if (allEqual) {
    return summary[0];
  }

  return summary.join("");
} //Generates a cwise operator


function generateCWiseOp(proc, typesig) {
  //Compute dimension
  // Arrays get put first in typesig, and there are two entries per array (dtype and order), so this gets the number of dimensions in the first array arg.
  var dimension = typesig[1].length - Math.abs(proc.arrayBlockIndices[0]) | 0;
  var orders = new Array(proc.arrayArgs.length);
  var dtypes = new Array(proc.arrayArgs.length);

  for (var i = 0; i < proc.arrayArgs.length; ++i) {
    dtypes[i] = typesig[2 * i];
    orders[i] = typesig[2 * i + 1];
  } //Determine where block and loop indices start and end


  var blockBegin = [],
      blockEnd = []; // These indices are exposed as blocks

  var loopBegin = [],
      loopEnd = []; // These indices are iterated over

  var loopOrders = []; // orders restricted to the loop indices

  for (var i = 0; i < proc.arrayArgs.length; ++i) {
    if (proc.arrayBlockIndices[i] < 0) {
      loopBegin.push(0);
      loopEnd.push(dimension);
      blockBegin.push(dimension);
      blockEnd.push(dimension + proc.arrayBlockIndices[i]);
    } else {
      loopBegin.push(proc.arrayBlockIndices[i]); // Non-negative

      loopEnd.push(proc.arrayBlockIndices[i] + dimension);
      blockBegin.push(0);
      blockEnd.push(proc.arrayBlockIndices[i]);
    }

    var newOrder = [];

    for (var j = 0; j < orders[i].length; j++) {
      if (loopBegin[i] <= orders[i][j] && orders[i][j] < loopEnd[i]) {
        newOrder.push(orders[i][j] - loopBegin[i]); // If this is a loop index, put it in newOrder, subtracting loopBegin, to make sure that all loopOrders are using a common set of indices.
      }
    }

    loopOrders.push(newOrder);
  } //First create arguments for procedure


  var arglist = ["SS"]; // SS is the overall shape over which we iterate

  var code = ["'use strict'"];
  var vars = [];

  for (var j = 0; j < dimension; ++j) {
    vars.push(["s", j, "=SS[", j, "]"].join("")); // The limits for each dimension.
  }

  for (var i = 0; i < proc.arrayArgs.length; ++i) {
    arglist.push("a" + i); // Actual data array

    arglist.push("t" + i); // Strides

    arglist.push("p" + i); // Offset in the array at which the data starts (also used for iterating over the data)

    for (var j = 0; j < dimension; ++j) {
      // Unpack the strides into vars for looping
      vars.push(["t", i, "p", j, "=t", i, "[", loopBegin[i] + j, "]"].join(""));
    }

    for (var j = 0; j < Math.abs(proc.arrayBlockIndices[i]); ++j) {
      // Unpack the strides into vars for block iteration
      vars.push(["t", i, "b", j, "=t", i, "[", blockBegin[i] + j, "]"].join(""));
    }
  }

  for (var i = 0; i < proc.scalarArgs.length; ++i) {
    arglist.push("Y" + i);
  }

  if (proc.shapeArgs.length > 0) {
    vars.push("shape=SS.slice(0)"); // Makes the shape over which we iterate available to the user defined functions (so you can use width/height for example)
  }

  if (proc.indexArgs.length > 0) {
    // Prepare an array to keep track of the (logical) indices, initialized to dimension zeroes.
    var zeros = new Array(dimension);

    for (var i = 0; i < dimension; ++i) {
      zeros[i] = "0";
    }

    vars.push(["index=[", zeros.join(","), "]"].join(""));
  }

  for (var i = 0; i < proc.offsetArgs.length; ++i) {
    // Offset arguments used for stencil operations
    var off_arg = proc.offsetArgs[i];
    var init_string = [];

    for (var j = 0; j < off_arg.offset.length; ++j) {
      if (off_arg.offset[j] === 0) {
        continue;
      } else if (off_arg.offset[j] === 1) {
        init_string.push(["t", off_arg.array, "p", j].join(""));
      } else {
        init_string.push([off_arg.offset[j], "*t", off_arg.array, "p", j].join(""));
      }
    }

    if (init_string.length === 0) {
      vars.push("q" + i + "=0");
    } else {
      vars.push(["q", i, "=", init_string.join("+")].join(""));
    }
  } //Prepare this variables


  var thisVars = uniq([].concat(proc.pre.thisVars).concat(proc.body.thisVars).concat(proc.post.thisVars));
  vars = vars.concat(thisVars);

  if (vars.length > 0) {
    code.push("var " + vars.join(","));
  }

  for (var i = 0; i < proc.arrayArgs.length; ++i) {
    code.push("p" + i + "|=0");
  } //Inline prelude


  if (proc.pre.body.length > 3) {
    code.push(processBlock(proc.pre, proc, dtypes));
  } //Process body


  var body = processBlock(proc.body, proc, dtypes);
  var matched = countMatches(loopOrders);

  if (matched < dimension) {
    code.push(outerFill(matched, loopOrders[0], proc, body)); // TODO: Rather than passing loopOrders[0], it might be interesting to look at passing an order that represents the majority of the arguments for example.
  } else {
    code.push(innerFill(loopOrders[0], proc, body));
  } //Inline epilog


  if (proc.post.body.length > 3) {
    code.push(processBlock(proc.post, proc, dtypes));
  }

  if (proc.debug) {
    console.log("-----Generated cwise routine for ", typesig, ":\n" + code.join("\n") + "\n----------");
  }

  var loopName = [proc.funcName || "unnamed", "_cwise_loop_", orders[0].join("s"), "m", matched, typeSummary(dtypes)].join("");
  var f = new Function(["function ", loopName, "(", arglist.join(","), "){", code.join("\n"), "} return ", loopName].join(""));
  return f();
}

var compile = generateCWiseOp;

// A function object is constructed which accepts as argument a compilation function and returns another function.
// It is this other function that is eventually returned by createThunk, and this function is the one that actually
// checks whether a certain pattern of arguments has already been used before and compiles new loops as needed.
// The compilation passed to the first function object is used for compiling new functions.
// Once this function object is created, it is called with compile as argument, where the first argument of compile
// is bound to "proc" (essentially containing a preprocessed version of the user arguments to cwise).
// So createThunk roughly works like this:
// function createThunk(proc) {
//   var thunk = function(compileBound) {
//     var CACHED = {}
//     return function(arrays and scalars) {
//       if (dtype and order of arrays in CACHED) {
//         var func = CACHED[dtype and order of arrays]
//       } else {
//         var func = CACHED[dtype and order of arrays] = compileBound(dtype and order of arrays)
//       }
//       return func(arrays and scalars)
//     }
//   }
//   return thunk(compile.bind1(proc))
// }


function createThunk(proc) {
  var code = ["'use strict'", "var CACHED={}"];
  var vars = [];
  var thunkName = proc.funcName + "_cwise_thunk"; //Build thunk

  code.push(["return function ", thunkName, "(", proc.shimArgs.join(","), "){"].join(""));
  var typesig = [];
  var string_typesig = [];
  var proc_args = [["array", proc.arrayArgs[0], ".shape.slice(", // Slice shape so that we only retain the shape over which we iterate (which gets passed to the cwise operator as SS).
  Math.max(0, proc.arrayBlockIndices[0]), proc.arrayBlockIndices[0] < 0 ? "," + proc.arrayBlockIndices[0] + ")" : ")"].join("")];
  var shapeLengthConditions = [],
      shapeConditions = []; // Process array arguments

  for (var i = 0; i < proc.arrayArgs.length; ++i) {
    var j = proc.arrayArgs[i];
    vars.push(["t", j, "=array", j, ".dtype,", "r", j, "=array", j, ".order"].join(""));
    typesig.push("t" + j);
    typesig.push("r" + j);
    string_typesig.push("t" + j);
    string_typesig.push("r" + j + ".join()");
    proc_args.push("array" + j + ".data");
    proc_args.push("array" + j + ".stride");
    proc_args.push("array" + j + ".offset|0");

    if (i > 0) {
      // Gather conditions to check for shape equality (ignoring block indices)
      shapeLengthConditions.push("array" + proc.arrayArgs[0] + ".shape.length===array" + j + ".shape.length+" + (Math.abs(proc.arrayBlockIndices[0]) - Math.abs(proc.arrayBlockIndices[i])));
      shapeConditions.push("array" + proc.arrayArgs[0] + ".shape[shapeIndex+" + Math.max(0, proc.arrayBlockIndices[0]) + "]===array" + j + ".shape[shapeIndex+" + Math.max(0, proc.arrayBlockIndices[i]) + "]");
    }
  } // Check for shape equality


  if (proc.arrayArgs.length > 1) {
    code.push("if (!(" + shapeLengthConditions.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')");
    code.push("for(var shapeIndex=array" + proc.arrayArgs[0] + ".shape.length-" + Math.abs(proc.arrayBlockIndices[0]) + "; shapeIndex-->0;) {");
    code.push("if (!(" + shapeConditions.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same shape!')");
    code.push("}");
  } // Process scalar arguments


  for (var i = 0; i < proc.scalarArgs.length; ++i) {
    proc_args.push("scalar" + proc.scalarArgs[i]);
  } // Check for cached function (and if not present, generate it)


  vars.push(["type=[", string_typesig.join(","), "].join()"].join(""));
  vars.push("proc=CACHED[type]");
  code.push("var " + vars.join(","));
  code.push(["if(!proc){", "CACHED[type]=proc=compile([", typesig.join(","), "])}", "return proc(", proc_args.join(","), ")}"].join(""));

  if (proc.debug) {
    console.log("-----Generated thunk:\n" + code.join("\n") + "\n----------");
  } //Compile thunk


  var thunk = new Function("compile", code.join("\n"));
  return thunk(compile.bind(undefined, proc));
}

var thunk = createThunk;

function Procedure() {
  this.argTypes = [];
  this.shimArgs = [];
  this.arrayArgs = [];
  this.arrayBlockIndices = [];
  this.scalarArgs = [];
  this.offsetArgs = [];
  this.offsetArgIndex = [];
  this.indexArgs = [];
  this.shapeArgs = [];
  this.funcName = "";
  this.pre = null;
  this.body = null;
  this.post = null;
  this.debug = false;
}

function compileCwise(user_args) {
  //Create procedure
  var proc = new Procedure(); //Parse blocks

  proc.pre = user_args.pre;
  proc.body = user_args.body;
  proc.post = user_args.post; //Parse arguments

  var proc_args = user_args.args.slice(0);
  proc.argTypes = proc_args;

  for (var i = 0; i < proc_args.length; ++i) {
    var arg_type = proc_args[i];

    if (arg_type === "array" || typeof arg_type === "object" && arg_type.blockIndices) {
      proc.argTypes[i] = "array";
      proc.arrayArgs.push(i);
      proc.arrayBlockIndices.push(arg_type.blockIndices ? arg_type.blockIndices : 0);
      proc.shimArgs.push("array" + i);

      if (i < proc.pre.args.length && proc.pre.args[i].count > 0) {
        throw new Error("cwise: pre() block may not reference array args");
      }

      if (i < proc.post.args.length && proc.post.args[i].count > 0) {
        throw new Error("cwise: post() block may not reference array args");
      }
    } else if (arg_type === "scalar") {
      proc.scalarArgs.push(i);
      proc.shimArgs.push("scalar" + i);
    } else if (arg_type === "index") {
      proc.indexArgs.push(i);

      if (i < proc.pre.args.length && proc.pre.args[i].count > 0) {
        throw new Error("cwise: pre() block may not reference array index");
      }

      if (i < proc.body.args.length && proc.body.args[i].lvalue) {
        throw new Error("cwise: body() block may not write to array index");
      }

      if (i < proc.post.args.length && proc.post.args[i].count > 0) {
        throw new Error("cwise: post() block may not reference array index");
      }
    } else if (arg_type === "shape") {
      proc.shapeArgs.push(i);

      if (i < proc.pre.args.length && proc.pre.args[i].lvalue) {
        throw new Error("cwise: pre() block may not write to array shape");
      }

      if (i < proc.body.args.length && proc.body.args[i].lvalue) {
        throw new Error("cwise: body() block may not write to array shape");
      }

      if (i < proc.post.args.length && proc.post.args[i].lvalue) {
        throw new Error("cwise: post() block may not write to array shape");
      }
    } else if (typeof arg_type === "object" && arg_type.offset) {
      proc.argTypes[i] = "offset";
      proc.offsetArgs.push({
        array: arg_type.array,
        offset: arg_type.offset
      });
      proc.offsetArgIndex.push(i);
    } else {
      throw new Error("cwise: Unknown argument type " + proc_args[i]);
    }
  } //Make sure at least one array argument was specified


  if (proc.arrayArgs.length <= 0) {
    throw new Error("cwise: No array arguments specified");
  } //Make sure arguments are correct


  if (proc.pre.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in pre() block");
  }

  if (proc.body.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in body() block");
  }

  if (proc.post.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in post() block");
  } //Check debug flag


  proc.debug = !!user_args.printCode || !!user_args.debug; //Retrieve name

  proc.funcName = user_args.funcName || "cwise"; //Read in block size

  proc.blockSize = user_args.blockSize || 64;
  return thunk(proc);
}

var compiler = compileCwise;

var ndarrayOps = createCommonjsModule(function (module, exports) {

  var EmptyProc = {
    body: "",
    args: [],
    thisVars: [],
    localVars: []
  };

  function fixup(x) {
    if (!x) {
      return EmptyProc;
    }

    for (var i = 0; i < x.args.length; ++i) {
      var a = x.args[i];

      if (i === 0) {
        x.args[i] = {
          name: a,
          lvalue: true,
          rvalue: !!x.rvalue,
          count: x.count || 1
        };
      } else {
        x.args[i] = {
          name: a,
          lvalue: false,
          rvalue: true,
          count: 1
        };
      }
    }

    if (!x.thisVars) {
      x.thisVars = [];
    }

    if (!x.localVars) {
      x.localVars = [];
    }

    return x;
  }

  function pcompile(user_args) {
    return compiler({
      args: user_args.args,
      pre: fixup(user_args.pre),
      body: fixup(user_args.body),
      post: fixup(user_args.proc),
      funcName: user_args.funcName
    });
  }

  function makeOp(user_args) {
    var args = [];

    for (var i = 0; i < user_args.args.length; ++i) {
      args.push("a" + i);
    }

    var wrapper = new Function("P", ["return function ", user_args.funcName, "_ndarrayops(", args.join(","), ") {P(", args.join(","), ");return a0}"].join(""));
    return wrapper(pcompile(user_args));
  }

  var assign_ops = {
    add: "+",
    sub: "-",
    mul: "*",
    div: "/",
    mod: "%",
    band: "&",
    bor: "|",
    bxor: "^",
    lshift: "<<",
    rshift: ">>",
    rrshift: ">>>"
  };

  (function () {
    for (var id in assign_ops) {
      var op = assign_ops[id];
      exports[id] = makeOp({
        args: ["array", "array", "array"],
        body: {
          args: ["a", "b", "c"],
          body: "a=b" + op + "c"
        },
        funcName: id
      });
      exports[id + "eq"] = makeOp({
        args: ["array", "array"],
        body: {
          args: ["a", "b"],
          body: "a" + op + "=b"
        },
        rvalue: true,
        funcName: id + "eq"
      });
      exports[id + "s"] = makeOp({
        args: ["array", "array", "scalar"],
        body: {
          args: ["a", "b", "s"],
          body: "a=b" + op + "s"
        },
        funcName: id + "s"
      });
      exports[id + "seq"] = makeOp({
        args: ["array", "scalar"],
        body: {
          args: ["a", "s"],
          body: "a" + op + "=s"
        },
        rvalue: true,
        funcName: id + "seq"
      });
    }
  })();

  var unary_ops = {
    not: "!",
    bnot: "~",
    neg: "-",
    recip: "1.0/"
  };

  (function () {
    for (var id in unary_ops) {
      var op = unary_ops[id];
      exports[id] = makeOp({
        args: ["array", "array"],
        body: {
          args: ["a", "b"],
          body: "a=" + op + "b"
        },
        funcName: id
      });
      exports[id + "eq"] = makeOp({
        args: ["array"],
        body: {
          args: ["a"],
          body: "a=" + op + "a"
        },
        rvalue: true,
        count: 2,
        funcName: id + "eq"
      });
    }
  })();

  var binary_ops = {
    and: "&&",
    or: "||",
    eq: "===",
    neq: "!==",
    lt: "<",
    gt: ">",
    leq: "<=",
    geq: ">="
  };

  (function () {
    for (var id in binary_ops) {
      var op = binary_ops[id];
      exports[id] = makeOp({
        args: ["array", "array", "array"],
        body: {
          args: ["a", "b", "c"],
          body: "a=b" + op + "c"
        },
        funcName: id
      });
      exports[id + "s"] = makeOp({
        args: ["array", "array", "scalar"],
        body: {
          args: ["a", "b", "s"],
          body: "a=b" + op + "s"
        },
        funcName: id + "s"
      });
      exports[id + "eq"] = makeOp({
        args: ["array", "array"],
        body: {
          args: ["a", "b"],
          body: "a=a" + op + "b"
        },
        rvalue: true,
        count: 2,
        funcName: id + "eq"
      });
      exports[id + "seq"] = makeOp({
        args: ["array", "scalar"],
        body: {
          args: ["a", "s"],
          body: "a=a" + op + "s"
        },
        rvalue: true,
        count: 2,
        funcName: id + "seq"
      });
    }
  })();

  var math_unary = ["abs", "acos", "asin", "atan", "ceil", "cos", "exp", "floor", "log", "round", "sin", "sqrt", "tan"];

  (function () {
    for (var i = 0; i < math_unary.length; ++i) {
      var f = math_unary[i];
      exports[f] = makeOp({
        args: ["array", "array"],
        pre: {
          args: [],
          body: "this_f=Math." + f,
          thisVars: ["this_f"]
        },
        body: {
          args: ["a", "b"],
          body: "a=this_f(b)",
          thisVars: ["this_f"]
        },
        funcName: f
      });
      exports[f + "eq"] = makeOp({
        args: ["array"],
        pre: {
          args: [],
          body: "this_f=Math." + f,
          thisVars: ["this_f"]
        },
        body: {
          args: ["a"],
          body: "a=this_f(a)",
          thisVars: ["this_f"]
        },
        rvalue: true,
        count: 2,
        funcName: f + "eq"
      });
    }
  })();

  var math_comm = ["max", "min", "atan2", "pow"];

  (function () {
    for (var i = 0; i < math_comm.length; ++i) {
      var f = math_comm[i];
      exports[f] = makeOp({
        args: ["array", "array", "array"],
        pre: {
          args: [],
          body: "this_f=Math." + f,
          thisVars: ["this_f"]
        },
        body: {
          args: ["a", "b", "c"],
          body: "a=this_f(b,c)",
          thisVars: ["this_f"]
        },
        funcName: f
      });
      exports[f + "s"] = makeOp({
        args: ["array", "array", "scalar"],
        pre: {
          args: [],
          body: "this_f=Math." + f,
          thisVars: ["this_f"]
        },
        body: {
          args: ["a", "b", "c"],
          body: "a=this_f(b,c)",
          thisVars: ["this_f"]
        },
        funcName: f + "s"
      });
      exports[f + "eq"] = makeOp({
        args: ["array", "array"],
        pre: {
          args: [],
          body: "this_f=Math." + f,
          thisVars: ["this_f"]
        },
        body: {
          args: ["a", "b"],
          body: "a=this_f(a,b)",
          thisVars: ["this_f"]
        },
        rvalue: true,
        count: 2,
        funcName: f + "eq"
      });
      exports[f + "seq"] = makeOp({
        args: ["array", "scalar"],
        pre: {
          args: [],
          body: "this_f=Math." + f,
          thisVars: ["this_f"]
        },
        body: {
          args: ["a", "b"],
          body: "a=this_f(a,b)",
          thisVars: ["this_f"]
        },
        rvalue: true,
        count: 2,
        funcName: f + "seq"
      });
    }
  })();

  var math_noncomm = ["atan2", "pow"];

  (function () {
    for (var i = 0; i < math_noncomm.length; ++i) {
      var f = math_noncomm[i];
      exports[f + "op"] = makeOp({
        args: ["array", "array", "array"],
        pre: {
          args: [],
          body: "this_f=Math." + f,
          thisVars: ["this_f"]
        },
        body: {
          args: ["a", "b", "c"],
          body: "a=this_f(c,b)",
          thisVars: ["this_f"]
        },
        funcName: f + "op"
      });
      exports[f + "ops"] = makeOp({
        args: ["array", "array", "scalar"],
        pre: {
          args: [],
          body: "this_f=Math." + f,
          thisVars: ["this_f"]
        },
        body: {
          args: ["a", "b", "c"],
          body: "a=this_f(c,b)",
          thisVars: ["this_f"]
        },
        funcName: f + "ops"
      });
      exports[f + "opeq"] = makeOp({
        args: ["array", "array"],
        pre: {
          args: [],
          body: "this_f=Math." + f,
          thisVars: ["this_f"]
        },
        body: {
          args: ["a", "b"],
          body: "a=this_f(b,a)",
          thisVars: ["this_f"]
        },
        rvalue: true,
        count: 2,
        funcName: f + "opeq"
      });
      exports[f + "opseq"] = makeOp({
        args: ["array", "scalar"],
        pre: {
          args: [],
          body: "this_f=Math." + f,
          thisVars: ["this_f"]
        },
        body: {
          args: ["a", "b"],
          body: "a=this_f(b,a)",
          thisVars: ["this_f"]
        },
        rvalue: true,
        count: 2,
        funcName: f + "opseq"
      });
    }
  })();

  exports.any = compiler({
    args: ["array"],
    pre: EmptyProc,
    body: {
      args: [{
        name: "a",
        lvalue: false,
        rvalue: true,
        count: 1
      }],
      body: "if(a){return true}",
      localVars: [],
      thisVars: []
    },
    post: {
      args: [],
      localVars: [],
      thisVars: [],
      body: "return false"
    },
    funcName: "any"
  });
  exports.all = compiler({
    args: ["array"],
    pre: EmptyProc,
    body: {
      args: [{
        name: "x",
        lvalue: false,
        rvalue: true,
        count: 1
      }],
      body: "if(!x){return false}",
      localVars: [],
      thisVars: []
    },
    post: {
      args: [],
      localVars: [],
      thisVars: [],
      body: "return true"
    },
    funcName: "all"
  });
  exports.sum = compiler({
    args: ["array"],
    pre: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "this_s=0"
    },
    body: {
      args: [{
        name: "a",
        lvalue: false,
        rvalue: true,
        count: 1
      }],
      body: "this_s+=a",
      localVars: [],
      thisVars: ["this_s"]
    },
    post: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "return this_s"
    },
    funcName: "sum"
  });
  exports.prod = compiler({
    args: ["array"],
    pre: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "this_s=1"
    },
    body: {
      args: [{
        name: "a",
        lvalue: false,
        rvalue: true,
        count: 1
      }],
      body: "this_s*=a",
      localVars: [],
      thisVars: ["this_s"]
    },
    post: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "return this_s"
    },
    funcName: "prod"
  });
  exports.norm2squared = compiler({
    args: ["array"],
    pre: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "this_s=0"
    },
    body: {
      args: [{
        name: "a",
        lvalue: false,
        rvalue: true,
        count: 2
      }],
      body: "this_s+=a*a",
      localVars: [],
      thisVars: ["this_s"]
    },
    post: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "return this_s"
    },
    funcName: "norm2squared"
  });
  exports.norm2 = compiler({
    args: ["array"],
    pre: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "this_s=0"
    },
    body: {
      args: [{
        name: "a",
        lvalue: false,
        rvalue: true,
        count: 2
      }],
      body: "this_s+=a*a",
      localVars: [],
      thisVars: ["this_s"]
    },
    post: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "return Math.sqrt(this_s)"
    },
    funcName: "norm2"
  });
  exports.norminf = compiler({
    args: ["array"],
    pre: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "this_s=0"
    },
    body: {
      args: [{
        name: "a",
        lvalue: false,
        rvalue: true,
        count: 4
      }],
      body: "if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}",
      localVars: [],
      thisVars: ["this_s"]
    },
    post: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "return this_s"
    },
    funcName: "norminf"
  });
  exports.norm1 = compiler({
    args: ["array"],
    pre: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "this_s=0"
    },
    body: {
      args: [{
        name: "a",
        lvalue: false,
        rvalue: true,
        count: 3
      }],
      body: "this_s+=a<0?-a:a",
      localVars: [],
      thisVars: ["this_s"]
    },
    post: {
      args: [],
      localVars: [],
      thisVars: ["this_s"],
      body: "return this_s"
    },
    funcName: "norm1"
  });
  exports.sup = compiler({
    args: ["array"],
    pre: {
      body: "this_h=-Infinity",
      args: [],
      thisVars: ["this_h"],
      localVars: []
    },
    body: {
      body: "if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_",
      args: [{
        "name": "_inline_1_arg0_",
        "lvalue": false,
        "rvalue": true,
        "count": 2
      }],
      thisVars: ["this_h"],
      localVars: []
    },
    post: {
      body: "return this_h",
      args: [],
      thisVars: ["this_h"],
      localVars: []
    }
  });
  exports.inf = compiler({
    args: ["array"],
    pre: {
      body: "this_h=Infinity",
      args: [],
      thisVars: ["this_h"],
      localVars: []
    },
    body: {
      body: "if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_",
      args: [{
        "name": "_inline_1_arg0_",
        "lvalue": false,
        "rvalue": true,
        "count": 2
      }],
      thisVars: ["this_h"],
      localVars: []
    },
    post: {
      body: "return this_h",
      args: [],
      thisVars: ["this_h"],
      localVars: []
    }
  });
  exports.argmin = compiler({
    args: ["index", "array", "shape"],
    pre: {
      body: "{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}",
      args: [{
        name: "_inline_0_arg0_",
        lvalue: false,
        rvalue: false,
        count: 0
      }, {
        name: "_inline_0_arg1_",
        lvalue: false,
        rvalue: false,
        count: 0
      }, {
        name: "_inline_0_arg2_",
        lvalue: false,
        rvalue: true,
        count: 1
      }],
      thisVars: ["this_i", "this_v"],
      localVars: []
    },
    body: {
      body: "{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
      args: [{
        name: "_inline_1_arg0_",
        lvalue: false,
        rvalue: true,
        count: 2
      }, {
        name: "_inline_1_arg1_",
        lvalue: false,
        rvalue: true,
        count: 2
      }],
      thisVars: ["this_i", "this_v"],
      localVars: ["_inline_1_k"]
    },
    post: {
      body: "{return this_i}",
      args: [],
      thisVars: ["this_i"],
      localVars: []
    }
  });
  exports.argmax = compiler({
    args: ["index", "array", "shape"],
    pre: {
      body: "{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}",
      args: [{
        name: "_inline_0_arg0_",
        lvalue: false,
        rvalue: false,
        count: 0
      }, {
        name: "_inline_0_arg1_",
        lvalue: false,
        rvalue: false,
        count: 0
      }, {
        name: "_inline_0_arg2_",
        lvalue: false,
        rvalue: true,
        count: 1
      }],
      thisVars: ["this_i", "this_v"],
      localVars: []
    },
    body: {
      body: "{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
      args: [{
        name: "_inline_1_arg0_",
        lvalue: false,
        rvalue: true,
        count: 2
      }, {
        name: "_inline_1_arg1_",
        lvalue: false,
        rvalue: true,
        count: 2
      }],
      thisVars: ["this_i", "this_v"],
      localVars: ["_inline_1_k"]
    },
    post: {
      body: "{return this_i}",
      args: [],
      thisVars: ["this_i"],
      localVars: []
    }
  });
  exports.random = makeOp({
    args: ["array"],
    pre: {
      args: [],
      body: "this_f=Math.random",
      thisVars: ["this_f"]
    },
    body: {
      args: ["a"],
      body: "a=this_f()",
      thisVars: ["this_f"]
    },
    funcName: "random"
  });
  exports.assign = makeOp({
    args: ["array", "array"],
    body: {
      args: ["a", "b"],
      body: "a=b"
    },
    funcName: "assign"
  });
  exports.assigns = makeOp({
    args: ["array", "scalar"],
    body: {
      args: ["a", "b"],
      body: "a=b"
    },
    funcName: "assigns"
  });
  exports.equals = compiler({
    args: ["array", "array"],
    pre: EmptyProc,
    body: {
      args: [{
        name: "x",
        lvalue: false,
        rvalue: true,
        count: 1
      }, {
        name: "y",
        lvalue: false,
        rvalue: true,
        count: 1
      }],
      body: "if(x!==y){return false}",
      localVars: [],
      thisVars: []
    },
    post: {
      args: [],
      localVars: [],
      thisVars: [],
      body: "return true"
    },
    funcName: "equals"
  });
});

var esprima = createCommonjsModule(function (module, exports) {
  /*
    Copyright (C) 2013 Ariya Hidayat <ariya.hidayat@gmail.com>
    Copyright (C) 2013 Thaddee Tyl <thaddee.tyl@gmail.com>
    Copyright (C) 2013 Mathias Bynens <mathias@qiwi.be>
    Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
    Copyright (C) 2012 Mathias Bynens <mathias@qiwi.be>
    Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
    Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
    Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
    Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
    Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>
  
    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:
  
      * Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
      * Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
  
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
    AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
    ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
    DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
    (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
    LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
    ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
    (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
    THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  */

  /*jslint bitwise:true plusplus:true */

  /*global esprima:true, define:true, exports:true, window: true,
  throwErrorTolerant: true,
  throwError: true, generateStatement: true, peek: true,
  parseAssignmentExpression: true, parseBlock: true, parseExpression: true,
  parseFunctionDeclaration: true, parseFunctionExpression: true,
  parseFunctionSourceElements: true, parseVariableIdentifier: true,
  parseLeftHandSideExpression: true,
  parseUnaryExpression: true,
  parseStatement: true, parseSourceElement: true */
  (function (root, factory) {
    // Rhino, and plain browser loading.

    /* istanbul ignore next */

    {
      factory(exports);
    }
  })(commonjsGlobal, function (exports) {

    var Token, TokenName, FnExprTokens, Syntax, PropertyKind, Messages, Regex, SyntaxTreeDelegate, source, strict, index, lineNumber, lineStart, length, delegate, lookahead, state, extra;
    Token = {
      BooleanLiteral: 1,
      EOF: 2,
      Identifier: 3,
      Keyword: 4,
      NullLiteral: 5,
      NumericLiteral: 6,
      Punctuator: 7,
      StringLiteral: 8,
      RegularExpression: 9
    };
    TokenName = {};
    TokenName[Token.BooleanLiteral] = 'Boolean';
    TokenName[Token.EOF] = '<end>';
    TokenName[Token.Identifier] = 'Identifier';
    TokenName[Token.Keyword] = 'Keyword';
    TokenName[Token.NullLiteral] = 'Null';
    TokenName[Token.NumericLiteral] = 'Numeric';
    TokenName[Token.Punctuator] = 'Punctuator';
    TokenName[Token.StringLiteral] = 'String';
    TokenName[Token.RegularExpression] = 'RegularExpression'; // A function following one of those tokens is an expression.

    FnExprTokens = ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new', 'return', 'case', 'delete', 'throw', 'void', // assignment operators
    '=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '>>>=', '&=', '|=', '^=', ',', // binary/unary operators
    '+', '-', '*', '/', '%', '++', '--', '<<', '>>', '>>>', '&', '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=', '<=', '<', '>', '!=', '!=='];
    Syntax = {
      AssignmentExpression: 'AssignmentExpression',
      ArrayExpression: 'ArrayExpression',
      BlockStatement: 'BlockStatement',
      BinaryExpression: 'BinaryExpression',
      BreakStatement: 'BreakStatement',
      CallExpression: 'CallExpression',
      CatchClause: 'CatchClause',
      ConditionalExpression: 'ConditionalExpression',
      ContinueStatement: 'ContinueStatement',
      DoWhileStatement: 'DoWhileStatement',
      DebuggerStatement: 'DebuggerStatement',
      EmptyStatement: 'EmptyStatement',
      ExpressionStatement: 'ExpressionStatement',
      ForStatement: 'ForStatement',
      ForInStatement: 'ForInStatement',
      FunctionDeclaration: 'FunctionDeclaration',
      FunctionExpression: 'FunctionExpression',
      Identifier: 'Identifier',
      IfStatement: 'IfStatement',
      Literal: 'Literal',
      LabeledStatement: 'LabeledStatement',
      LogicalExpression: 'LogicalExpression',
      MemberExpression: 'MemberExpression',
      NewExpression: 'NewExpression',
      ObjectExpression: 'ObjectExpression',
      Program: 'Program',
      Property: 'Property',
      ReturnStatement: 'ReturnStatement',
      SequenceExpression: 'SequenceExpression',
      SwitchStatement: 'SwitchStatement',
      SwitchCase: 'SwitchCase',
      ThisExpression: 'ThisExpression',
      ThrowStatement: 'ThrowStatement',
      TryStatement: 'TryStatement',
      UnaryExpression: 'UnaryExpression',
      UpdateExpression: 'UpdateExpression',
      VariableDeclaration: 'VariableDeclaration',
      VariableDeclarator: 'VariableDeclarator',
      WhileStatement: 'WhileStatement',
      WithStatement: 'WithStatement'
    };
    PropertyKind = {
      Data: 1,
      Get: 2,
      Set: 4
    }; // Error messages should be identical to V8.

    Messages = {
      UnexpectedToken: 'Unexpected token %0',
      UnexpectedNumber: 'Unexpected number',
      UnexpectedString: 'Unexpected string',
      UnexpectedIdentifier: 'Unexpected identifier',
      UnexpectedReserved: 'Unexpected reserved word',
      UnexpectedEOS: 'Unexpected end of input',
      NewlineAfterThrow: 'Illegal newline after throw',
      InvalidRegExp: 'Invalid regular expression',
      UnterminatedRegExp: 'Invalid regular expression: missing /',
      InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
      InvalidLHSInForIn: 'Invalid left-hand side in for-in',
      MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
      NoCatchOrFinally: 'Missing catch or finally after try',
      UnknownLabel: 'Undefined label \'%0\'',
      Redeclaration: '%0 \'%1\' has already been declared',
      IllegalContinue: 'Illegal continue statement',
      IllegalBreak: 'Illegal break statement',
      IllegalReturn: 'Illegal return statement',
      StrictModeWith: 'Strict mode code may not include a with statement',
      StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
      StrictVarName: 'Variable name may not be eval or arguments in strict mode',
      StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
      StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
      StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
      StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
      StrictDelete: 'Delete of an unqualified identifier in strict mode.',
      StrictDuplicateProperty: 'Duplicate data property in object literal not allowed in strict mode',
      AccessorDataProperty: 'Object literal may not have data and accessor property with the same name',
      AccessorGetSet: 'Object literal may not have multiple get/set accessors with the same name',
      StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
      StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
      StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
      StrictReservedWord: 'Use of future reserved word in strict mode'
    }; // See also tools/generate-unicode-regex.py.

    Regex = {
      NonAsciiIdentifierStart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'),
      NonAsciiIdentifierPart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0\u08A2-\u08AC\u08E4-\u08FE\u0900-\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA697\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]')
    }; // Ensure the condition is true, otherwise throw an error.
    // This is only to have a better contract semantic, i.e. another safety net
    // to catch a logic error. The condition shall be fulfilled in normal case.
    // Do NOT use this to enforce a certain condition on any user input.

    function assert(condition, message) {
      /* istanbul ignore if */
      if (!condition) {
        throw new Error('ASSERT: ' + message);
      }
    }

    function isDecimalDigit(ch) {
      return ch >= 48 && ch <= 57; // 0..9
    }

    function isHexDigit(ch) {
      return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
    }

    function isOctalDigit(ch) {
      return '01234567'.indexOf(ch) >= 0;
    } // 7.2 White Space


    function isWhiteSpace(ch) {
      return ch === 0x20 || ch === 0x09 || ch === 0x0B || ch === 0x0C || ch === 0xA0 || ch >= 0x1680 && [0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(ch) >= 0;
    } // 7.3 Line Terminators


    function isLineTerminator(ch) {
      return ch === 0x0A || ch === 0x0D || ch === 0x2028 || ch === 0x2029;
    } // 7.6 Identifier Names and Identifiers


    function isIdentifierStart(ch) {
      return ch === 0x24 || ch === 0x5F || ch >= 0x41 && ch <= 0x5A || ch >= 0x61 && ch <= 0x7A || ch === 0x5C || ch >= 0x80 && Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch));
    }

    function isIdentifierPart(ch) {
      return ch === 0x24 || ch === 0x5F || ch >= 0x41 && ch <= 0x5A || ch >= 0x61 && ch <= 0x7A || ch >= 0x30 && ch <= 0x39 || ch === 0x5C || ch >= 0x80 && Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch));
    } // 7.6.1.2 Future Reserved Words


    function isFutureReservedWord(id) {
      switch (id) {
        case 'class':
        case 'enum':
        case 'export':
        case 'extends':
        case 'import':
        case 'super':
          return true;

        default:
          return false;
      }
    }

    function isStrictModeReservedWord(id) {
      switch (id) {
        case 'implements':
        case 'interface':
        case 'package':
        case 'private':
        case 'protected':
        case 'public':
        case 'static':
        case 'yield':
        case 'let':
          return true;

        default:
          return false;
      }
    }

    function isRestrictedWord(id) {
      return id === 'eval' || id === 'arguments';
    } // 7.6.1.1 Keywords


    function isKeyword(id) {
      if (strict && isStrictModeReservedWord(id)) {
        return true;
      } // 'const' is specialized as Keyword in V8.
      // 'yield' and 'let' are for compatiblity with SpiderMonkey and ES.next.
      // Some others are from future reserved words.


      switch (id.length) {
        case 2:
          return id === 'if' || id === 'in' || id === 'do';

        case 3:
          return id === 'var' || id === 'for' || id === 'new' || id === 'try' || id === 'let';

        case 4:
          return id === 'this' || id === 'else' || id === 'case' || id === 'void' || id === 'with' || id === 'enum';

        case 5:
          return id === 'while' || id === 'break' || id === 'catch' || id === 'throw' || id === 'const' || id === 'yield' || id === 'class' || id === 'super';

        case 6:
          return id === 'return' || id === 'typeof' || id === 'delete' || id === 'switch' || id === 'export' || id === 'import';

        case 7:
          return id === 'default' || id === 'finally' || id === 'extends';

        case 8:
          return id === 'function' || id === 'continue' || id === 'debugger';

        case 10:
          return id === 'instanceof';

        default:
          return false;
      }
    } // 7.4 Comments


    function addComment(type, value, start, end, loc) {
      var comment;
      assert(typeof start === 'number', 'Comment must have valid position'); // Because the way the actual token is scanned, often the comments
      // (if any) are skipped twice during the lexical analysis.
      // Thus, we need to skip adding a comment if the comment array already
      // handled it.

      if (state.lastCommentStart >= start) {
        return;
      }

      state.lastCommentStart = start;
      comment = {
        type: type,
        value: value
      };

      if (extra.range) {
        comment.range = [start, end];
      }

      if (extra.loc) {
        comment.loc = loc;
      }

      extra.comments.push(comment);

      if (extra.attachComment) {
        extra.leadingComments.push(comment);
        extra.trailingComments.push(comment);
      }
    }

    function skipSingleLineComment(offset) {
      var start, loc, ch, comment;
      start = index - offset;
      loc = {
        start: {
          line: lineNumber,
          column: index - lineStart - offset
        }
      };

      while (index < length) {
        ch = source.charCodeAt(index);
        ++index;

        if (isLineTerminator(ch)) {
          if (extra.comments) {
            comment = source.slice(start + offset, index - 1);
            loc.end = {
              line: lineNumber,
              column: index - lineStart - 1
            };
            addComment('Line', comment, start, index - 1, loc);
          }

          if (ch === 13 && source.charCodeAt(index) === 10) {
            ++index;
          }

          ++lineNumber;
          lineStart = index;
          return;
        }
      }

      if (extra.comments) {
        comment = source.slice(start + offset, index);
        loc.end = {
          line: lineNumber,
          column: index - lineStart
        };
        addComment('Line', comment, start, index, loc);
      }
    }

    function skipMultiLineComment() {
      var start, loc, ch, comment;

      if (extra.comments) {
        start = index - 2;
        loc = {
          start: {
            line: lineNumber,
            column: index - lineStart - 2
          }
        };
      }

      while (index < length) {
        ch = source.charCodeAt(index);

        if (isLineTerminator(ch)) {
          if (ch === 0x0D && source.charCodeAt(index + 1) === 0x0A) {
            ++index;
          }

          ++lineNumber;
          ++index;
          lineStart = index;

          if (index >= length) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
          }
        } else if (ch === 0x2A) {
          // Block comment ends with '*/'.
          if (source.charCodeAt(index + 1) === 0x2F) {
            ++index;
            ++index;

            if (extra.comments) {
              comment = source.slice(start + 2, index - 2);
              loc.end = {
                line: lineNumber,
                column: index - lineStart
              };
              addComment('Block', comment, start, index, loc);
            }

            return;
          }

          ++index;
        } else {
          ++index;
        }
      }

      throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
    }

    function skipComment() {
      var ch, start;
      start = index === 0;

      while (index < length) {
        ch = source.charCodeAt(index);

        if (isWhiteSpace(ch)) {
          ++index;
        } else if (isLineTerminator(ch)) {
          ++index;

          if (ch === 0x0D && source.charCodeAt(index) === 0x0A) {
            ++index;
          }

          ++lineNumber;
          lineStart = index;
          start = true;
        } else if (ch === 0x2F) {
          // U+002F is '/'
          ch = source.charCodeAt(index + 1);

          if (ch === 0x2F) {
            ++index;
            ++index;
            skipSingleLineComment(2);
            start = true;
          } else if (ch === 0x2A) {
            // U+002A is '*'
            ++index;
            ++index;
            skipMultiLineComment();
          } else {
            break;
          }
        } else if (start && ch === 0x2D) {
          // U+002D is '-'
          // U+003E is '>'
          if (source.charCodeAt(index + 1) === 0x2D && source.charCodeAt(index + 2) === 0x3E) {
            // '-->' is a single-line comment
            index += 3;
            skipSingleLineComment(3);
          } else {
            break;
          }
        } else if (ch === 0x3C) {
          // U+003C is '<'
          if (source.slice(index + 1, index + 4) === '!--') {
            ++index; // `<`

            ++index; // `!`

            ++index; // `-`

            ++index; // `-`

            skipSingleLineComment(4);
          } else {
            break;
          }
        } else {
          break;
        }
      }
    }

    function scanHexEscape(prefix) {
      var i,
          len,
          ch,
          code = 0;
      len = prefix === 'u' ? 4 : 2;

      for (i = 0; i < len; ++i) {
        if (index < length && isHexDigit(source[index])) {
          ch = source[index++];
          code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
        } else {
          return '';
        }
      }

      return String.fromCharCode(code);
    }

    function getEscapedIdentifier() {
      var ch, id;
      ch = source.charCodeAt(index++);
      id = String.fromCharCode(ch); // '\u' (U+005C, U+0075) denotes an escaped character.

      if (ch === 0x5C) {
        if (source.charCodeAt(index) !== 0x75) {
          throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        ++index;
        ch = scanHexEscape('u');

        if (!ch || ch === '\\' || !isIdentifierStart(ch.charCodeAt(0))) {
          throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        id = ch;
      }

      while (index < length) {
        ch = source.charCodeAt(index);

        if (!isIdentifierPart(ch)) {
          break;
        }

        ++index;
        id += String.fromCharCode(ch); // '\u' (U+005C, U+0075) denotes an escaped character.

        if (ch === 0x5C) {
          id = id.substr(0, id.length - 1);

          if (source.charCodeAt(index) !== 0x75) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
          }

          ++index;
          ch = scanHexEscape('u');

          if (!ch || ch === '\\' || !isIdentifierPart(ch.charCodeAt(0))) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
          }

          id += ch;
        }
      }

      return id;
    }

    function getIdentifier() {
      var start, ch;
      start = index++;

      while (index < length) {
        ch = source.charCodeAt(index);

        if (ch === 0x5C) {
          // Blackslash (U+005C) marks Unicode escape sequence.
          index = start;
          return getEscapedIdentifier();
        }

        if (isIdentifierPart(ch)) {
          ++index;
        } else {
          break;
        }
      }

      return source.slice(start, index);
    }

    function scanIdentifier() {
      var start, id, type;
      start = index; // Backslash (U+005C) starts an escaped character.

      id = source.charCodeAt(index) === 0x5C ? getEscapedIdentifier() : getIdentifier(); // There is no keyword or literal with only one character.
      // Thus, it must be an identifier.

      if (id.length === 1) {
        type = Token.Identifier;
      } else if (isKeyword(id)) {
        type = Token.Keyword;
      } else if (id === 'null') {
        type = Token.NullLiteral;
      } else if (id === 'true' || id === 'false') {
        type = Token.BooleanLiteral;
      } else {
        type = Token.Identifier;
      }

      return {
        type: type,
        value: id,
        lineNumber: lineNumber,
        lineStart: lineStart,
        start: start,
        end: index
      };
    } // 7.7 Punctuators


    function scanPunctuator() {
      var start = index,
          code = source.charCodeAt(index),
          code2,
          ch1 = source[index],
          ch2,
          ch3,
          ch4;

      switch (code) {
        // Check for most common single-character punctuators.
        case 0x2E: // . dot

        case 0x28: // ( open bracket

        case 0x29: // ) close bracket

        case 0x3B: // ; semicolon

        case 0x2C: // , comma

        case 0x7B: // { open curly brace

        case 0x7D: // } close curly brace

        case 0x5B: // [

        case 0x5D: // ]

        case 0x3A: // :

        case 0x3F: // ?

        case 0x7E:
          // ~
          ++index;

          if (extra.tokenize) {
            if (code === 0x28) {
              extra.openParenToken = extra.tokens.length;
            } else if (code === 0x7B) {
              extra.openCurlyToken = extra.tokens.length;
            }
          }

          return {
            type: Token.Punctuator,
            value: String.fromCharCode(code),
            lineNumber: lineNumber,
            lineStart: lineStart,
            start: start,
            end: index
          };

        default:
          code2 = source.charCodeAt(index + 1); // '=' (U+003D) marks an assignment or comparison operator.

          if (code2 === 0x3D) {
            switch (code) {
              case 0x2B: // +

              case 0x2D: // -

              case 0x2F: // /

              case 0x3C: // <

              case 0x3E: // >

              case 0x5E: // ^

              case 0x7C: // |

              case 0x25: // %

              case 0x26: // &

              case 0x2A:
                // *
                index += 2;
                return {
                  type: Token.Punctuator,
                  value: String.fromCharCode(code) + String.fromCharCode(code2),
                  lineNumber: lineNumber,
                  lineStart: lineStart,
                  start: start,
                  end: index
                };

              case 0x21: // !

              case 0x3D:
                // =
                index += 2; // !== and ===

                if (source.charCodeAt(index) === 0x3D) {
                  ++index;
                }

                return {
                  type: Token.Punctuator,
                  value: source.slice(start, index),
                  lineNumber: lineNumber,
                  lineStart: lineStart,
                  start: start,
                  end: index
                };
            }
          }

      } // 4-character punctuator: >>>=


      ch4 = source.substr(index, 4);

      if (ch4 === '>>>=') {
        index += 4;
        return {
          type: Token.Punctuator,
          value: ch4,
          lineNumber: lineNumber,
          lineStart: lineStart,
          start: start,
          end: index
        };
      } // 3-character punctuators: === !== >>> <<= >>=


      ch3 = ch4.substr(0, 3);

      if (ch3 === '>>>' || ch3 === '<<=' || ch3 === '>>=') {
        index += 3;
        return {
          type: Token.Punctuator,
          value: ch3,
          lineNumber: lineNumber,
          lineStart: lineStart,
          start: start,
          end: index
        };
      } // Other 2-character punctuators: ++ -- << >> && ||


      ch2 = ch3.substr(0, 2);

      if (ch1 === ch2[1] && '+-<>&|'.indexOf(ch1) >= 0 || ch2 === '=>') {
        index += 2;
        return {
          type: Token.Punctuator,
          value: ch2,
          lineNumber: lineNumber,
          lineStart: lineStart,
          start: start,
          end: index
        };
      } // 1-character punctuators: < > = ! + - * % & | ^ /


      if ('<>=!+-*%&|^/'.indexOf(ch1) >= 0) {
        ++index;
        return {
          type: Token.Punctuator,
          value: ch1,
          lineNumber: lineNumber,
          lineStart: lineStart,
          start: start,
          end: index
        };
      }

      throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
    } // 7.8.3 Numeric Literals


    function scanHexLiteral(start) {
      var number = '';

      while (index < length) {
        if (!isHexDigit(source[index])) {
          break;
        }

        number += source[index++];
      }

      if (number.length === 0) {
        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
      }

      if (isIdentifierStart(source.charCodeAt(index))) {
        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
      }

      return {
        type: Token.NumericLiteral,
        value: parseInt('0x' + number, 16),
        lineNumber: lineNumber,
        lineStart: lineStart,
        start: start,
        end: index
      };
    }

    function scanOctalLiteral(start) {
      var number = '0' + source[index++];

      while (index < length) {
        if (!isOctalDigit(source[index])) {
          break;
        }

        number += source[index++];
      }

      if (isIdentifierStart(source.charCodeAt(index)) || isDecimalDigit(source.charCodeAt(index))) {
        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
      }

      return {
        type: Token.NumericLiteral,
        value: parseInt(number, 8),
        octal: true,
        lineNumber: lineNumber,
        lineStart: lineStart,
        start: start,
        end: index
      };
    }

    function isImplicitOctalLiteral() {
      var i, ch; // Implicit octal, unless there is a non-octal digit.
      // (Annex B.1.1 on Numeric Literals)

      for (i = index + 1; i < length; ++i) {
        ch = source[i];

        if (ch === '8' || ch === '9') {
          return false;
        }

        if (!isOctalDigit(ch)) {
          return true;
        }
      }

      return true;
    }

    function scanNumericLiteral() {
      var number, start, ch;
      ch = source[index];
      assert(isDecimalDigit(ch.charCodeAt(0)) || ch === '.', 'Numeric literal must start with a decimal digit or a decimal point');
      start = index;
      number = '';

      if (ch !== '.') {
        number = source[index++];
        ch = source[index]; // Hex number starts with '0x'.
        // Octal number starts with '0'.

        if (number === '0') {
          if (ch === 'x' || ch === 'X') {
            ++index;
            return scanHexLiteral(start);
          }

          if (isOctalDigit(ch)) {
            if (isImplicitOctalLiteral()) {
              return scanOctalLiteral(start);
            }
          }
        }

        while (isDecimalDigit(source.charCodeAt(index))) {
          number += source[index++];
        }

        ch = source[index];
      }

      if (ch === '.') {
        number += source[index++];

        while (isDecimalDigit(source.charCodeAt(index))) {
          number += source[index++];
        }

        ch = source[index];
      }

      if (ch === 'e' || ch === 'E') {
        number += source[index++];
        ch = source[index];

        if (ch === '+' || ch === '-') {
          number += source[index++];
        }

        if (isDecimalDigit(source.charCodeAt(index))) {
          while (isDecimalDigit(source.charCodeAt(index))) {
            number += source[index++];
          }
        } else {
          throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }
      }

      if (isIdentifierStart(source.charCodeAt(index))) {
        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
      }

      return {
        type: Token.NumericLiteral,
        value: parseFloat(number),
        lineNumber: lineNumber,
        lineStart: lineStart,
        start: start,
        end: index
      };
    } // 7.8.4 String Literals


    function scanStringLiteral() {
      var str = '',
          quote,
          start,
          ch,
          code,
          unescaped,
          restore,
          octal = false,
          startLineNumber,
          startLineStart;
      startLineNumber = lineNumber;
      startLineStart = lineStart;
      quote = source[index];
      assert(quote === '\'' || quote === '"', 'String literal must starts with a quote');
      start = index;
      ++index;

      while (index < length) {
        ch = source[index++];

        if (ch === quote) {
          quote = '';
          break;
        } else if (ch === '\\') {
          ch = source[index++];

          if (!ch || !isLineTerminator(ch.charCodeAt(0))) {
            switch (ch) {
              case 'u':
              case 'x':
                restore = index;
                unescaped = scanHexEscape(ch);

                if (unescaped) {
                  str += unescaped;
                } else {
                  index = restore;
                  str += ch;
                }

                break;

              case 'n':
                str += '\n';
                break;

              case 'r':
                str += '\r';
                break;

              case 't':
                str += '\t';
                break;

              case 'b':
                str += '\b';
                break;

              case 'f':
                str += '\f';
                break;

              case 'v':
                str += '\x0B';
                break;

              default:
                if (isOctalDigit(ch)) {
                  code = '01234567'.indexOf(ch); // \0 is not octal escape sequence

                  if (code !== 0) {
                    octal = true;
                  }

                  if (index < length && isOctalDigit(source[index])) {
                    octal = true;
                    code = code * 8 + '01234567'.indexOf(source[index++]); // 3 digits are only allowed when string starts
                    // with 0, 1, 2, 3

                    if ('0123'.indexOf(ch) >= 0 && index < length && isOctalDigit(source[index])) {
                      code = code * 8 + '01234567'.indexOf(source[index++]);
                    }
                  }

                  str += String.fromCharCode(code);
                } else {
                  str += ch;
                }

                break;
            }
          } else {
            ++lineNumber;

            if (ch === '\r' && source[index] === '\n') {
              ++index;
            }

            lineStart = index;
          }
        } else if (isLineTerminator(ch.charCodeAt(0))) {
          break;
        } else {
          str += ch;
        }
      }

      if (quote !== '') {
        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
      }

      return {
        type: Token.StringLiteral,
        value: str,
        octal: octal,
        startLineNumber: startLineNumber,
        startLineStart: startLineStart,
        lineNumber: lineNumber,
        lineStart: lineStart,
        start: start,
        end: index
      };
    }

    function testRegExp(pattern, flags) {
      var value;

      try {
        value = new RegExp(pattern, flags);
      } catch (e) {
        throwError({}, Messages.InvalidRegExp);
      }

      return value;
    }

    function scanRegExpBody() {
      var ch, str, classMarker, terminated, body;
      ch = source[index];
      assert(ch === '/', 'Regular expression literal must start with a slash');
      str = source[index++];
      classMarker = false;
      terminated = false;

      while (index < length) {
        ch = source[index++];
        str += ch;

        if (ch === '\\') {
          ch = source[index++]; // ECMA-262 7.8.5

          if (isLineTerminator(ch.charCodeAt(0))) {
            throwError({}, Messages.UnterminatedRegExp);
          }

          str += ch;
        } else if (isLineTerminator(ch.charCodeAt(0))) {
          throwError({}, Messages.UnterminatedRegExp);
        } else if (classMarker) {
          if (ch === ']') {
            classMarker = false;
          }
        } else {
          if (ch === '/') {
            terminated = true;
            break;
          } else if (ch === '[') {
            classMarker = true;
          }
        }
      }

      if (!terminated) {
        throwError({}, Messages.UnterminatedRegExp);
      } // Exclude leading and trailing slash.


      body = str.substr(1, str.length - 2);
      return {
        value: body,
        literal: str
      };
    }

    function scanRegExpFlags() {
      var ch, str, flags, restore;
      str = '';
      flags = '';

      while (index < length) {
        ch = source[index];

        if (!isIdentifierPart(ch.charCodeAt(0))) {
          break;
        }

        ++index;

        if (ch === '\\' && index < length) {
          ch = source[index];

          if (ch === 'u') {
            ++index;
            restore = index;
            ch = scanHexEscape('u');

            if (ch) {
              flags += ch;

              for (str += '\\u'; restore < index; ++restore) {
                str += source[restore];
              }
            } else {
              index = restore;
              flags += 'u';
              str += '\\u';
            }

            throwErrorTolerant({}, Messages.UnexpectedToken, 'ILLEGAL');
          } else {
            str += '\\';
            throwErrorTolerant({}, Messages.UnexpectedToken, 'ILLEGAL');
          }
        } else {
          flags += ch;
          str += ch;
        }
      }

      return {
        value: flags,
        literal: str
      };
    }

    function scanRegExp() {
      var start, body, flags, value;
      lookahead = null;
      skipComment();
      start = index;
      body = scanRegExpBody();
      flags = scanRegExpFlags();
      value = testRegExp(body.value, flags.value);

      if (extra.tokenize) {
        return {
          type: Token.RegularExpression,
          value: value,
          lineNumber: lineNumber,
          lineStart: lineStart,
          start: start,
          end: index
        };
      }

      return {
        literal: body.literal + flags.literal,
        value: value,
        start: start,
        end: index
      };
    }

    function collectRegex() {
      var pos, loc, regex, token;
      skipComment();
      pos = index;
      loc = {
        start: {
          line: lineNumber,
          column: index - lineStart
        }
      };
      regex = scanRegExp();
      loc.end = {
        line: lineNumber,
        column: index - lineStart
      };
      /* istanbul ignore next */

      if (!extra.tokenize) {
        // Pop the previous token, which is likely '/' or '/='
        if (extra.tokens.length > 0) {
          token = extra.tokens[extra.tokens.length - 1];

          if (token.range[0] === pos && token.type === 'Punctuator') {
            if (token.value === '/' || token.value === '/=') {
              extra.tokens.pop();
            }
          }
        }

        extra.tokens.push({
          type: 'RegularExpression',
          value: regex.literal,
          range: [pos, index],
          loc: loc
        });
      }

      return regex;
    }

    function isIdentifierName(token) {
      return token.type === Token.Identifier || token.type === Token.Keyword || token.type === Token.BooleanLiteral || token.type === Token.NullLiteral;
    }

    function advanceSlash() {
      var prevToken, checkToken; // Using the following algorithm:
      // https://github.com/mozilla/sweet.js/wiki/design

      prevToken = extra.tokens[extra.tokens.length - 1];

      if (!prevToken) {
        // Nothing before that: it cannot be a division.
        return collectRegex();
      }

      if (prevToken.type === 'Punctuator') {
        if (prevToken.value === ']') {
          return scanPunctuator();
        }

        if (prevToken.value === ')') {
          checkToken = extra.tokens[extra.openParenToken - 1];

          if (checkToken && checkToken.type === 'Keyword' && (checkToken.value === 'if' || checkToken.value === 'while' || checkToken.value === 'for' || checkToken.value === 'with')) {
            return collectRegex();
          }

          return scanPunctuator();
        }

        if (prevToken.value === '}') {
          // Dividing a function by anything makes little sense,
          // but we have to check for that.
          if (extra.tokens[extra.openCurlyToken - 3] && extra.tokens[extra.openCurlyToken - 3].type === 'Keyword') {
            // Anonymous function.
            checkToken = extra.tokens[extra.openCurlyToken - 4];

            if (!checkToken) {
              return scanPunctuator();
            }
          } else if (extra.tokens[extra.openCurlyToken - 4] && extra.tokens[extra.openCurlyToken - 4].type === 'Keyword') {
            // Named function.
            checkToken = extra.tokens[extra.openCurlyToken - 5];

            if (!checkToken) {
              return collectRegex();
            }
          } else {
            return scanPunctuator();
          } // checkToken determines whether the function is
          // a declaration or an expression.


          if (FnExprTokens.indexOf(checkToken.value) >= 0) {
            // It is an expression.
            return scanPunctuator();
          } // It is a declaration.


          return collectRegex();
        }

        return collectRegex();
      }

      if (prevToken.type === 'Keyword' && prevToken.value !== 'this') {
        return collectRegex();
      }

      return scanPunctuator();
    }

    function advance() {
      var ch;
      skipComment();

      if (index >= length) {
        return {
          type: Token.EOF,
          lineNumber: lineNumber,
          lineStart: lineStart,
          start: index,
          end: index
        };
      }

      ch = source.charCodeAt(index);

      if (isIdentifierStart(ch)) {
        return scanIdentifier();
      } // Very common: ( and ) and ;


      if (ch === 0x28 || ch === 0x29 || ch === 0x3B) {
        return scanPunctuator();
      } // String literal starts with single quote (U+0027) or double quote (U+0022).


      if (ch === 0x27 || ch === 0x22) {
        return scanStringLiteral();
      } // Dot (.) U+002E can also start a floating-point number, hence the need
      // to check the next character.


      if (ch === 0x2E) {
        if (isDecimalDigit(source.charCodeAt(index + 1))) {
          return scanNumericLiteral();
        }

        return scanPunctuator();
      }

      if (isDecimalDigit(ch)) {
        return scanNumericLiteral();
      } // Slash (/) U+002F can also start a regex.


      if (extra.tokenize && ch === 0x2F) {
        return advanceSlash();
      }

      return scanPunctuator();
    }

    function collectToken() {
      var loc, token, value;
      skipComment();
      loc = {
        start: {
          line: lineNumber,
          column: index - lineStart
        }
      };
      token = advance();
      loc.end = {
        line: lineNumber,
        column: index - lineStart
      };

      if (token.type !== Token.EOF) {
        value = source.slice(token.start, token.end);
        extra.tokens.push({
          type: TokenName[token.type],
          value: value,
          range: [token.start, token.end],
          loc: loc
        });
      }

      return token;
    }

    function lex() {
      var token;
      token = lookahead;
      index = token.end;
      lineNumber = token.lineNumber;
      lineStart = token.lineStart;
      lookahead = typeof extra.tokens !== 'undefined' ? collectToken() : advance();
      index = token.end;
      lineNumber = token.lineNumber;
      lineStart = token.lineStart;
      return token;
    }

    function peek() {
      var pos, line, start;
      pos = index;
      line = lineNumber;
      start = lineStart;
      lookahead = typeof extra.tokens !== 'undefined' ? collectToken() : advance();
      index = pos;
      lineNumber = line;
      lineStart = start;
    }

    function Position(line, column) {
      this.line = line;
      this.column = column;
    }

    function SourceLocation(startLine, startColumn, line, column) {
      this.start = new Position(startLine, startColumn);
      this.end = new Position(line, column);
    }

    SyntaxTreeDelegate = {
      name: 'SyntaxTree',
      processComment: function (node) {
        var lastChild, trailingComments;

        if (node.type === Syntax.Program) {
          if (node.body.length > 0) {
            return;
          }
        }

        if (extra.trailingComments.length > 0) {
          if (extra.trailingComments[0].range[0] >= node.range[1]) {
            trailingComments = extra.trailingComments;
            extra.trailingComments = [];
          } else {
            extra.trailingComments.length = 0;
          }
        } else {
          if (extra.bottomRightStack.length > 0 && extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments && extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments[0].range[0] >= node.range[1]) {
            trailingComments = extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
            delete extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
          }
        } // Eating the stack.


        while (extra.bottomRightStack.length > 0 && extra.bottomRightStack[extra.bottomRightStack.length - 1].range[0] >= node.range[0]) {
          lastChild = extra.bottomRightStack.pop();
        }

        if (lastChild) {
          if (lastChild.leadingComments && lastChild.leadingComments[lastChild.leadingComments.length - 1].range[1] <= node.range[0]) {
            node.leadingComments = lastChild.leadingComments;
            delete lastChild.leadingComments;
          }
        } else if (extra.leadingComments.length > 0 && extra.leadingComments[extra.leadingComments.length - 1].range[1] <= node.range[0]) {
          node.leadingComments = extra.leadingComments;
          extra.leadingComments = [];
        }

        if (trailingComments) {
          node.trailingComments = trailingComments;
        }

        extra.bottomRightStack.push(node);
      },
      markEnd: function (node, startToken) {
        if (extra.range) {
          node.range = [startToken.start, index];
        }

        if (extra.loc) {
          node.loc = new SourceLocation(startToken.startLineNumber === undefined ? startToken.lineNumber : startToken.startLineNumber, startToken.start - (startToken.startLineStart === undefined ? startToken.lineStart : startToken.startLineStart), lineNumber, index - lineStart);
          this.postProcess(node);
        }

        if (extra.attachComment) {
          this.processComment(node);
        }

        return node;
      },
      postProcess: function (node) {
        if (extra.source) {
          node.loc.source = extra.source;
        }

        return node;
      },
      createArrayExpression: function (elements) {
        return {
          type: Syntax.ArrayExpression,
          elements: elements
        };
      },
      createAssignmentExpression: function (operator, left, right) {
        return {
          type: Syntax.AssignmentExpression,
          operator: operator,
          left: left,
          right: right
        };
      },
      createBinaryExpression: function (operator, left, right) {
        var type = operator === '||' || operator === '&&' ? Syntax.LogicalExpression : Syntax.BinaryExpression;
        return {
          type: type,
          operator: operator,
          left: left,
          right: right
        };
      },
      createBlockStatement: function (body) {
        return {
          type: Syntax.BlockStatement,
          body: body
        };
      },
      createBreakStatement: function (label) {
        return {
          type: Syntax.BreakStatement,
          label: label
        };
      },
      createCallExpression: function (callee, args) {
        return {
          type: Syntax.CallExpression,
          callee: callee,
          'arguments': args
        };
      },
      createCatchClause: function (param, body) {
        return {
          type: Syntax.CatchClause,
          param: param,
          body: body
        };
      },
      createConditionalExpression: function (test, consequent, alternate) {
        return {
          type: Syntax.ConditionalExpression,
          test: test,
          consequent: consequent,
          alternate: alternate
        };
      },
      createContinueStatement: function (label) {
        return {
          type: Syntax.ContinueStatement,
          label: label
        };
      },
      createDebuggerStatement: function () {
        return {
          type: Syntax.DebuggerStatement
        };
      },
      createDoWhileStatement: function (body, test) {
        return {
          type: Syntax.DoWhileStatement,
          body: body,
          test: test
        };
      },
      createEmptyStatement: function () {
        return {
          type: Syntax.EmptyStatement
        };
      },
      createExpressionStatement: function (expression) {
        return {
          type: Syntax.ExpressionStatement,
          expression: expression
        };
      },
      createForStatement: function (init, test, update, body) {
        return {
          type: Syntax.ForStatement,
          init: init,
          test: test,
          update: update,
          body: body
        };
      },
      createForInStatement: function (left, right, body) {
        return {
          type: Syntax.ForInStatement,
          left: left,
          right: right,
          body: body,
          each: false
        };
      },
      createFunctionDeclaration: function (id, params, defaults, body) {
        return {
          type: Syntax.FunctionDeclaration,
          id: id,
          params: params,
          defaults: defaults,
          body: body,
          rest: null,
          generator: false,
          expression: false
        };
      },
      createFunctionExpression: function (id, params, defaults, body) {
        return {
          type: Syntax.FunctionExpression,
          id: id,
          params: params,
          defaults: defaults,
          body: body,
          rest: null,
          generator: false,
          expression: false
        };
      },
      createIdentifier: function (name) {
        return {
          type: Syntax.Identifier,
          name: name
        };
      },
      createIfStatement: function (test, consequent, alternate) {
        return {
          type: Syntax.IfStatement,
          test: test,
          consequent: consequent,
          alternate: alternate
        };
      },
      createLabeledStatement: function (label, body) {
        return {
          type: Syntax.LabeledStatement,
          label: label,
          body: body
        };
      },
      createLiteral: function (token) {
        return {
          type: Syntax.Literal,
          value: token.value,
          raw: source.slice(token.start, token.end)
        };
      },
      createMemberExpression: function (accessor, object, property) {
        return {
          type: Syntax.MemberExpression,
          computed: accessor === '[',
          object: object,
          property: property
        };
      },
      createNewExpression: function (callee, args) {
        return {
          type: Syntax.NewExpression,
          callee: callee,
          'arguments': args
        };
      },
      createObjectExpression: function (properties) {
        return {
          type: Syntax.ObjectExpression,
          properties: properties
        };
      },
      createPostfixExpression: function (operator, argument) {
        return {
          type: Syntax.UpdateExpression,
          operator: operator,
          argument: argument,
          prefix: false
        };
      },
      createProgram: function (body) {
        return {
          type: Syntax.Program,
          body: body
        };
      },
      createProperty: function (kind, key, value) {
        return {
          type: Syntax.Property,
          key: key,
          value: value,
          kind: kind
        };
      },
      createReturnStatement: function (argument) {
        return {
          type: Syntax.ReturnStatement,
          argument: argument
        };
      },
      createSequenceExpression: function (expressions) {
        return {
          type: Syntax.SequenceExpression,
          expressions: expressions
        };
      },
      createSwitchCase: function (test, consequent) {
        return {
          type: Syntax.SwitchCase,
          test: test,
          consequent: consequent
        };
      },
      createSwitchStatement: function (discriminant, cases) {
        return {
          type: Syntax.SwitchStatement,
          discriminant: discriminant,
          cases: cases
        };
      },
      createThisExpression: function () {
        return {
          type: Syntax.ThisExpression
        };
      },
      createThrowStatement: function (argument) {
        return {
          type: Syntax.ThrowStatement,
          argument: argument
        };
      },
      createTryStatement: function (block, guardedHandlers, handlers, finalizer) {
        return {
          type: Syntax.TryStatement,
          block: block,
          guardedHandlers: guardedHandlers,
          handlers: handlers,
          finalizer: finalizer
        };
      },
      createUnaryExpression: function (operator, argument) {
        if (operator === '++' || operator === '--') {
          return {
            type: Syntax.UpdateExpression,
            operator: operator,
            argument: argument,
            prefix: true
          };
        }

        return {
          type: Syntax.UnaryExpression,
          operator: operator,
          argument: argument,
          prefix: true
        };
      },
      createVariableDeclaration: function (declarations, kind) {
        return {
          type: Syntax.VariableDeclaration,
          declarations: declarations,
          kind: kind
        };
      },
      createVariableDeclarator: function (id, init) {
        return {
          type: Syntax.VariableDeclarator,
          id: id,
          init: init
        };
      },
      createWhileStatement: function (test, body) {
        return {
          type: Syntax.WhileStatement,
          test: test,
          body: body
        };
      },
      createWithStatement: function (object, body) {
        return {
          type: Syntax.WithStatement,
          object: object,
          body: body
        };
      }
    }; // Return true if there is a line terminator before the next token.

    function peekLineTerminator() {
      var pos, line, start, found;
      pos = index;
      line = lineNumber;
      start = lineStart;
      skipComment();
      found = lineNumber !== line;
      index = pos;
      lineNumber = line;
      lineStart = start;
      return found;
    } // Throw an exception


    function throwError(token, messageFormat) {
      var error,
          args = Array.prototype.slice.call(arguments, 2),
          msg = messageFormat.replace(/%(\d)/g, function (whole, index) {
        assert(index < args.length, 'Message reference must be in range');
        return args[index];
      });

      if (typeof token.lineNumber === 'number') {
        error = new Error('Line ' + token.lineNumber + ': ' + msg);
        error.index = token.start;
        error.lineNumber = token.lineNumber;
        error.column = token.start - lineStart + 1;
      } else {
        error = new Error('Line ' + lineNumber + ': ' + msg);
        error.index = index;
        error.lineNumber = lineNumber;
        error.column = index - lineStart + 1;
      }

      error.description = msg;
      throw error;
    }

    function throwErrorTolerant() {
      try {
        throwError.apply(null, arguments);
      } catch (e) {
        if (extra.errors) {
          extra.errors.push(e);
        } else {
          throw e;
        }
      }
    } // Throw an exception because of the token.


    function throwUnexpected(token) {
      if (token.type === Token.EOF) {
        throwError(token, Messages.UnexpectedEOS);
      }

      if (token.type === Token.NumericLiteral) {
        throwError(token, Messages.UnexpectedNumber);
      }

      if (token.type === Token.StringLiteral) {
        throwError(token, Messages.UnexpectedString);
      }

      if (token.type === Token.Identifier) {
        throwError(token, Messages.UnexpectedIdentifier);
      }

      if (token.type === Token.Keyword) {
        if (isFutureReservedWord(token.value)) {
          throwError(token, Messages.UnexpectedReserved);
        } else if (strict && isStrictModeReservedWord(token.value)) {
          throwErrorTolerant(token, Messages.StrictReservedWord);
          return;
        }

        throwError(token, Messages.UnexpectedToken, token.value);
      } // BooleanLiteral, NullLiteral, or Punctuator.


      throwError(token, Messages.UnexpectedToken, token.value);
    } // Expect the next token to match the specified punctuator.
    // If not, an exception will be thrown.


    function expect(value) {
      var token = lex();

      if (token.type !== Token.Punctuator || token.value !== value) {
        throwUnexpected(token);
      }
    } // Expect the next token to match the specified keyword.
    // If not, an exception will be thrown.


    function expectKeyword(keyword) {
      var token = lex();

      if (token.type !== Token.Keyword || token.value !== keyword) {
        throwUnexpected(token);
      }
    } // Return true if the next token matches the specified punctuator.


    function match(value) {
      return lookahead.type === Token.Punctuator && lookahead.value === value;
    } // Return true if the next token matches the specified keyword


    function matchKeyword(keyword) {
      return lookahead.type === Token.Keyword && lookahead.value === keyword;
    } // Return true if the next token is an assignment operator


    function matchAssign() {
      var op;

      if (lookahead.type !== Token.Punctuator) {
        return false;
      }

      op = lookahead.value;
      return op === '=' || op === '*=' || op === '/=' || op === '%=' || op === '+=' || op === '-=' || op === '<<=' || op === '>>=' || op === '>>>=' || op === '&=' || op === '^=' || op === '|=';
    }

    function consumeSemicolon() {
      var line,
          oldIndex = index,
          oldLineNumber = lineNumber,
          oldLineStart = lineStart,
          oldLookahead = lookahead; // Catch the very common case first: immediately a semicolon (U+003B).

      if (source.charCodeAt(index) === 0x3B || match(';')) {
        lex();
        return;
      }

      line = lineNumber;
      skipComment();

      if (lineNumber !== line) {
        index = oldIndex;
        lineNumber = oldLineNumber;
        lineStart = oldLineStart;
        lookahead = oldLookahead;
        return;
      }

      if (lookahead.type !== Token.EOF && !match('}')) {
        throwUnexpected(lookahead);
      }
    } // Return true if provided expression is LeftHandSideExpression


    function isLeftHandSide(expr) {
      return expr.type === Syntax.Identifier || expr.type === Syntax.MemberExpression;
    } // 11.1.4 Array Initialiser


    function parseArrayInitialiser() {
      var elements = [],
          startToken;
      startToken = lookahead;
      expect('[');

      while (!match(']')) {
        if (match(',')) {
          lex();
          elements.push(null);
        } else {
          elements.push(parseAssignmentExpression());

          if (!match(']')) {
            expect(',');
          }
        }
      }

      lex();
      return delegate.markEnd(delegate.createArrayExpression(elements), startToken);
    } // 11.1.5 Object Initialiser


    function parsePropertyFunction(param, first) {
      var previousStrict, body, startToken;
      previousStrict = strict;
      startToken = lookahead;
      body = parseFunctionSourceElements();

      if (first && strict && isRestrictedWord(param[0].name)) {
        throwErrorTolerant(first, Messages.StrictParamName);
      }

      strict = previousStrict;
      return delegate.markEnd(delegate.createFunctionExpression(null, param, [], body), startToken);
    }

    function parseObjectPropertyKey() {
      var token, startToken;
      startToken = lookahead;
      token = lex(); // Note: This function is called only from parseObjectProperty(), where
      // EOF and Punctuator tokens are already filtered out.

      if (token.type === Token.StringLiteral || token.type === Token.NumericLiteral) {
        if (strict && token.octal) {
          throwErrorTolerant(token, Messages.StrictOctalLiteral);
        }

        return delegate.markEnd(delegate.createLiteral(token), startToken);
      }

      return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
    }

    function parseObjectProperty() {
      var token, key, id, value, param, startToken;
      token = lookahead;
      startToken = lookahead;

      if (token.type === Token.Identifier) {
        id = parseObjectPropertyKey(); // Property Assignment: Getter and Setter.

        if (token.value === 'get' && !match(':')) {
          key = parseObjectPropertyKey();
          expect('(');
          expect(')');
          value = parsePropertyFunction([]);
          return delegate.markEnd(delegate.createProperty('get', key, value), startToken);
        }

        if (token.value === 'set' && !match(':')) {
          key = parseObjectPropertyKey();
          expect('(');
          token = lookahead;

          if (token.type !== Token.Identifier) {
            expect(')');
            throwErrorTolerant(token, Messages.UnexpectedToken, token.value);
            value = parsePropertyFunction([]);
          } else {
            param = [parseVariableIdentifier()];
            expect(')');
            value = parsePropertyFunction(param, token);
          }

          return delegate.markEnd(delegate.createProperty('set', key, value), startToken);
        }

        expect(':');
        value = parseAssignmentExpression();
        return delegate.markEnd(delegate.createProperty('init', id, value), startToken);
      }

      if (token.type === Token.EOF || token.type === Token.Punctuator) {
        throwUnexpected(token);
      } else {
        key = parseObjectPropertyKey();
        expect(':');
        value = parseAssignmentExpression();
        return delegate.markEnd(delegate.createProperty('init', key, value), startToken);
      }
    }

    function parseObjectInitialiser() {
      var properties = [],
          property,
          name,
          key,
          kind,
          map = {},
          toString = String,
          startToken;
      startToken = lookahead;
      expect('{');

      while (!match('}')) {
        property = parseObjectProperty();

        if (property.key.type === Syntax.Identifier) {
          name = property.key.name;
        } else {
          name = toString(property.key.value);
        }

        kind = property.kind === 'init' ? PropertyKind.Data : property.kind === 'get' ? PropertyKind.Get : PropertyKind.Set;
        key = '$' + name;

        if (Object.prototype.hasOwnProperty.call(map, key)) {
          if (map[key] === PropertyKind.Data) {
            if (strict && kind === PropertyKind.Data) {
              throwErrorTolerant({}, Messages.StrictDuplicateProperty);
            } else if (kind !== PropertyKind.Data) {
              throwErrorTolerant({}, Messages.AccessorDataProperty);
            }
          } else {
            if (kind === PropertyKind.Data) {
              throwErrorTolerant({}, Messages.AccessorDataProperty);
            } else if (map[key] & kind) {
              throwErrorTolerant({}, Messages.AccessorGetSet);
            }
          }

          map[key] |= kind;
        } else {
          map[key] = kind;
        }

        properties.push(property);

        if (!match('}')) {
          expect(',');
        }
      }

      expect('}');
      return delegate.markEnd(delegate.createObjectExpression(properties), startToken);
    } // 11.1.6 The Grouping Operator


    function parseGroupExpression() {
      var expr;
      expect('(');
      expr = parseExpression();
      expect(')');
      return expr;
    } // 11.1 Primary Expressions


    function parsePrimaryExpression() {
      var type, token, expr, startToken;

      if (match('(')) {
        return parseGroupExpression();
      }

      if (match('[')) {
        return parseArrayInitialiser();
      }

      if (match('{')) {
        return parseObjectInitialiser();
      }

      type = lookahead.type;
      startToken = lookahead;

      if (type === Token.Identifier) {
        expr = delegate.createIdentifier(lex().value);
      } else if (type === Token.StringLiteral || type === Token.NumericLiteral) {
        if (strict && lookahead.octal) {
          throwErrorTolerant(lookahead, Messages.StrictOctalLiteral);
        }

        expr = delegate.createLiteral(lex());
      } else if (type === Token.Keyword) {
        if (matchKeyword('function')) {
          return parseFunctionExpression();
        }

        if (matchKeyword('this')) {
          lex();
          expr = delegate.createThisExpression();
        } else {
          throwUnexpected(lex());
        }
      } else if (type === Token.BooleanLiteral) {
        token = lex();
        token.value = token.value === 'true';
        expr = delegate.createLiteral(token);
      } else if (type === Token.NullLiteral) {
        token = lex();
        token.value = null;
        expr = delegate.createLiteral(token);
      } else if (match('/') || match('/=')) {
        if (typeof extra.tokens !== 'undefined') {
          expr = delegate.createLiteral(collectRegex());
        } else {
          expr = delegate.createLiteral(scanRegExp());
        }

        peek();
      } else {
        throwUnexpected(lex());
      }

      return delegate.markEnd(expr, startToken);
    } // 11.2 Left-Hand-Side Expressions


    function parseArguments() {
      var args = [];
      expect('(');

      if (!match(')')) {
        while (index < length) {
          args.push(parseAssignmentExpression());

          if (match(')')) {
            break;
          }

          expect(',');
        }
      }

      expect(')');
      return args;
    }

    function parseNonComputedProperty() {
      var token, startToken;
      startToken = lookahead;
      token = lex();

      if (!isIdentifierName(token)) {
        throwUnexpected(token);
      }

      return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
    }

    function parseNonComputedMember() {
      expect('.');
      return parseNonComputedProperty();
    }

    function parseComputedMember() {
      var expr;
      expect('[');
      expr = parseExpression();
      expect(']');
      return expr;
    }

    function parseNewExpression() {
      var callee, args, startToken;
      startToken = lookahead;
      expectKeyword('new');
      callee = parseLeftHandSideExpression();
      args = match('(') ? parseArguments() : [];
      return delegate.markEnd(delegate.createNewExpression(callee, args), startToken);
    }

    function parseLeftHandSideExpressionAllowCall() {
      var expr,
          args,
          property,
          startToken,
          previousAllowIn = state.allowIn;
      startToken = lookahead;
      state.allowIn = true;
      expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();

      for (;;) {
        if (match('.')) {
          property = parseNonComputedMember();
          expr = delegate.createMemberExpression('.', expr, property);
        } else if (match('(')) {
          args = parseArguments();
          expr = delegate.createCallExpression(expr, args);
        } else if (match('[')) {
          property = parseComputedMember();
          expr = delegate.createMemberExpression('[', expr, property);
        } else {
          break;
        }

        delegate.markEnd(expr, startToken);
      }

      state.allowIn = previousAllowIn;
      return expr;
    }

    function parseLeftHandSideExpression() {
      var expr, property, startToken;
      assert(state.allowIn, 'callee of new expression always allow in keyword.');
      startToken = lookahead;
      expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();

      while (match('.') || match('[')) {
        if (match('[')) {
          property = parseComputedMember();
          expr = delegate.createMemberExpression('[', expr, property);
        } else {
          property = parseNonComputedMember();
          expr = delegate.createMemberExpression('.', expr, property);
        }

        delegate.markEnd(expr, startToken);
      }

      return expr;
    } // 11.3 Postfix Expressions


    function parsePostfixExpression() {
      var expr,
          token,
          startToken = lookahead;
      expr = parseLeftHandSideExpressionAllowCall();

      if (lookahead.type === Token.Punctuator) {
        if ((match('++') || match('--')) && !peekLineTerminator()) {
          // 11.3.1, 11.3.2
          if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
            throwErrorTolerant({}, Messages.StrictLHSPostfix);
          }

          if (!isLeftHandSide(expr)) {
            throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
          }

          token = lex();
          expr = delegate.markEnd(delegate.createPostfixExpression(token.value, expr), startToken);
        }
      }

      return expr;
    } // 11.4 Unary Operators


    function parseUnaryExpression() {
      var token, expr, startToken;

      if (lookahead.type !== Token.Punctuator && lookahead.type !== Token.Keyword) {
        expr = parsePostfixExpression();
      } else if (match('++') || match('--')) {
        startToken = lookahead;
        token = lex();
        expr = parseUnaryExpression(); // 11.4.4, 11.4.5

        if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
          throwErrorTolerant({}, Messages.StrictLHSPrefix);
        }

        if (!isLeftHandSide(expr)) {
          throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
        }

        expr = delegate.createUnaryExpression(token.value, expr);
        expr = delegate.markEnd(expr, startToken);
      } else if (match('+') || match('-') || match('~') || match('!')) {
        startToken = lookahead;
        token = lex();
        expr = parseUnaryExpression();
        expr = delegate.createUnaryExpression(token.value, expr);
        expr = delegate.markEnd(expr, startToken);
      } else if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {
        startToken = lookahead;
        token = lex();
        expr = parseUnaryExpression();
        expr = delegate.createUnaryExpression(token.value, expr);
        expr = delegate.markEnd(expr, startToken);

        if (strict && expr.operator === 'delete' && expr.argument.type === Syntax.Identifier) {
          throwErrorTolerant({}, Messages.StrictDelete);
        }
      } else {
        expr = parsePostfixExpression();
      }

      return expr;
    }

    function binaryPrecedence(token, allowIn) {
      var prec = 0;

      if (token.type !== Token.Punctuator && token.type !== Token.Keyword) {
        return 0;
      }

      switch (token.value) {
        case '||':
          prec = 1;
          break;

        case '&&':
          prec = 2;
          break;

        case '|':
          prec = 3;
          break;

        case '^':
          prec = 4;
          break;

        case '&':
          prec = 5;
          break;

        case '==':
        case '!=':
        case '===':
        case '!==':
          prec = 6;
          break;

        case '<':
        case '>':
        case '<=':
        case '>=':
        case 'instanceof':
          prec = 7;
          break;

        case 'in':
          prec = allowIn ? 7 : 0;
          break;

        case '<<':
        case '>>':
        case '>>>':
          prec = 8;
          break;

        case '+':
        case '-':
          prec = 9;
          break;

        case '*':
        case '/':
        case '%':
          prec = 11;
          break;
      }

      return prec;
    } // 11.5 Multiplicative Operators
    // 11.6 Additive Operators
    // 11.7 Bitwise Shift Operators
    // 11.8 Relational Operators
    // 11.9 Equality Operators
    // 11.10 Binary Bitwise Operators
    // 11.11 Binary Logical Operators


    function parseBinaryExpression() {
      var marker, markers, expr, token, prec, stack, right, operator, left, i;
      marker = lookahead;
      left = parseUnaryExpression();
      token = lookahead;
      prec = binaryPrecedence(token, state.allowIn);

      if (prec === 0) {
        return left;
      }

      token.prec = prec;
      lex();
      markers = [marker, lookahead];
      right = parseUnaryExpression();
      stack = [left, token, right];

      while ((prec = binaryPrecedence(lookahead, state.allowIn)) > 0) {
        // Reduce: make a binary expression from the three topmost entries.
        while (stack.length > 2 && prec <= stack[stack.length - 2].prec) {
          right = stack.pop();
          operator = stack.pop().value;
          left = stack.pop();
          expr = delegate.createBinaryExpression(operator, left, right);
          markers.pop();
          marker = markers[markers.length - 1];
          delegate.markEnd(expr, marker);
          stack.push(expr);
        } // Shift.


        token = lex();
        token.prec = prec;
        stack.push(token);
        markers.push(lookahead);
        expr = parseUnaryExpression();
        stack.push(expr);
      } // Final reduce to clean-up the stack.


      i = stack.length - 1;
      expr = stack[i];
      markers.pop();

      while (i > 1) {
        expr = delegate.createBinaryExpression(stack[i - 1].value, stack[i - 2], expr);
        i -= 2;
        marker = markers.pop();
        delegate.markEnd(expr, marker);
      }

      return expr;
    } // 11.12 Conditional Operator


    function parseConditionalExpression() {
      var expr, previousAllowIn, consequent, alternate, startToken;
      startToken = lookahead;
      expr = parseBinaryExpression();

      if (match('?')) {
        lex();
        previousAllowIn = state.allowIn;
        state.allowIn = true;
        consequent = parseAssignmentExpression();
        state.allowIn = previousAllowIn;
        expect(':');
        alternate = parseAssignmentExpression();
        expr = delegate.createConditionalExpression(expr, consequent, alternate);
        delegate.markEnd(expr, startToken);
      }

      return expr;
    } // 11.13 Assignment Operators


    function parseAssignmentExpression() {
      var token, left, right, node, startToken;
      token = lookahead;
      startToken = lookahead;
      node = left = parseConditionalExpression();

      if (matchAssign()) {
        // LeftHandSideExpression
        if (!isLeftHandSide(left)) {
          throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
        } // 11.13.1


        if (strict && left.type === Syntax.Identifier && isRestrictedWord(left.name)) {
          throwErrorTolerant(token, Messages.StrictLHSAssignment);
        }

        token = lex();
        right = parseAssignmentExpression();
        node = delegate.markEnd(delegate.createAssignmentExpression(token.value, left, right), startToken);
      }

      return node;
    } // 11.14 Comma Operator


    function parseExpression() {
      var expr,
          startToken = lookahead;
      expr = parseAssignmentExpression();

      if (match(',')) {
        expr = delegate.createSequenceExpression([expr]);

        while (index < length) {
          if (!match(',')) {
            break;
          }

          lex();
          expr.expressions.push(parseAssignmentExpression());
        }

        delegate.markEnd(expr, startToken);
      }

      return expr;
    } // 12.1 Block


    function parseStatementList() {
      var list = [],
          statement;

      while (index < length) {
        if (match('}')) {
          break;
        }

        statement = parseSourceElement();

        if (typeof statement === 'undefined') {
          break;
        }

        list.push(statement);
      }

      return list;
    }

    function parseBlock() {
      var block, startToken;
      startToken = lookahead;
      expect('{');
      block = parseStatementList();
      expect('}');
      return delegate.markEnd(delegate.createBlockStatement(block), startToken);
    } // 12.2 Variable Statement


    function parseVariableIdentifier() {
      var token, startToken;
      startToken = lookahead;
      token = lex();

      if (token.type !== Token.Identifier) {
        throwUnexpected(token);
      }

      return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
    }

    function parseVariableDeclaration(kind) {
      var init = null,
          id,
          startToken;
      startToken = lookahead;
      id = parseVariableIdentifier(); // 12.2.1

      if (strict && isRestrictedWord(id.name)) {
        throwErrorTolerant({}, Messages.StrictVarName);
      }

      if (kind === 'const') {
        expect('=');
        init = parseAssignmentExpression();
      } else if (match('=')) {
        lex();
        init = parseAssignmentExpression();
      }

      return delegate.markEnd(delegate.createVariableDeclarator(id, init), startToken);
    }

    function parseVariableDeclarationList(kind) {
      var list = [];

      do {
        list.push(parseVariableDeclaration(kind));

        if (!match(',')) {
          break;
        }

        lex();
      } while (index < length);

      return list;
    }

    function parseVariableStatement() {
      var declarations;
      expectKeyword('var');
      declarations = parseVariableDeclarationList();
      consumeSemicolon();
      return delegate.createVariableDeclaration(declarations, 'var');
    } // kind may be `const` or `let`
    // Both are experimental and not in the specification yet.
    // see http://wiki.ecmascript.org/doku.php?id=harmony:const
    // and http://wiki.ecmascript.org/doku.php?id=harmony:let


    function parseConstLetDeclaration(kind) {
      var declarations, startToken;
      startToken = lookahead;
      expectKeyword(kind);
      declarations = parseVariableDeclarationList(kind);
      consumeSemicolon();
      return delegate.markEnd(delegate.createVariableDeclaration(declarations, kind), startToken);
    } // 12.3 Empty Statement


    function parseEmptyStatement() {
      expect(';');
      return delegate.createEmptyStatement();
    } // 12.4 Expression Statement


    function parseExpressionStatement() {
      var expr = parseExpression();
      consumeSemicolon();
      return delegate.createExpressionStatement(expr);
    } // 12.5 If statement


    function parseIfStatement() {
      var test, consequent, alternate;
      expectKeyword('if');
      expect('(');
      test = parseExpression();
      expect(')');
      consequent = parseStatement();

      if (matchKeyword('else')) {
        lex();
        alternate = parseStatement();
      } else {
        alternate = null;
      }

      return delegate.createIfStatement(test, consequent, alternate);
    } // 12.6 Iteration Statements


    function parseDoWhileStatement() {
      var body, test, oldInIteration;
      expectKeyword('do');
      oldInIteration = state.inIteration;
      state.inIteration = true;
      body = parseStatement();
      state.inIteration = oldInIteration;
      expectKeyword('while');
      expect('(');
      test = parseExpression();
      expect(')');

      if (match(';')) {
        lex();
      }

      return delegate.createDoWhileStatement(body, test);
    }

    function parseWhileStatement() {
      var test, body, oldInIteration;
      expectKeyword('while');
      expect('(');
      test = parseExpression();
      expect(')');
      oldInIteration = state.inIteration;
      state.inIteration = true;
      body = parseStatement();
      state.inIteration = oldInIteration;
      return delegate.createWhileStatement(test, body);
    }

    function parseForVariableDeclaration() {
      var token, declarations, startToken;
      startToken = lookahead;
      token = lex();
      declarations = parseVariableDeclarationList();
      return delegate.markEnd(delegate.createVariableDeclaration(declarations, token.value), startToken);
    }

    function parseForStatement() {
      var init,
          test,
          update,
          left,
          right,
          body,
          oldInIteration,
          previousAllowIn = state.allowIn;
      init = test = update = null;
      expectKeyword('for');
      expect('(');

      if (match(';')) {
        lex();
      } else {
        if (matchKeyword('var') || matchKeyword('let')) {
          state.allowIn = false;
          init = parseForVariableDeclaration();
          state.allowIn = previousAllowIn;

          if (init.declarations.length === 1 && matchKeyword('in')) {
            lex();
            left = init;
            right = parseExpression();
            init = null;
          }
        } else {
          state.allowIn = false;
          init = parseExpression();
          state.allowIn = previousAllowIn;

          if (matchKeyword('in')) {
            // LeftHandSideExpression
            if (!isLeftHandSide(init)) {
              throwErrorTolerant({}, Messages.InvalidLHSInForIn);
            }

            lex();
            left = init;
            right = parseExpression();
            init = null;
          }
        }

        if (typeof left === 'undefined') {
          expect(';');
        }
      }

      if (typeof left === 'undefined') {
        if (!match(';')) {
          test = parseExpression();
        }

        expect(';');

        if (!match(')')) {
          update = parseExpression();
        }
      }

      expect(')');
      oldInIteration = state.inIteration;
      state.inIteration = true;
      body = parseStatement();
      state.inIteration = oldInIteration;
      return typeof left === 'undefined' ? delegate.createForStatement(init, test, update, body) : delegate.createForInStatement(left, right, body);
    } // 12.7 The continue statement


    function parseContinueStatement() {
      var label = null,
          key;
      expectKeyword('continue'); // Optimize the most common form: 'continue;'.

      if (source.charCodeAt(index) === 0x3B) {
        lex();

        if (!state.inIteration) {
          throwError({}, Messages.IllegalContinue);
        }

        return delegate.createContinueStatement(null);
      }

      if (peekLineTerminator()) {
        if (!state.inIteration) {
          throwError({}, Messages.IllegalContinue);
        }

        return delegate.createContinueStatement(null);
      }

      if (lookahead.type === Token.Identifier) {
        label = parseVariableIdentifier();
        key = '$' + label.name;

        if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
          throwError({}, Messages.UnknownLabel, label.name);
        }
      }

      consumeSemicolon();

      if (label === null && !state.inIteration) {
        throwError({}, Messages.IllegalContinue);
      }

      return delegate.createContinueStatement(label);
    } // 12.8 The break statement


    function parseBreakStatement() {
      var label = null,
          key;
      expectKeyword('break'); // Catch the very common case first: immediately a semicolon (U+003B).

      if (source.charCodeAt(index) === 0x3B) {
        lex();

        if (!(state.inIteration || state.inSwitch)) {
          throwError({}, Messages.IllegalBreak);
        }

        return delegate.createBreakStatement(null);
      }

      if (peekLineTerminator()) {
        if (!(state.inIteration || state.inSwitch)) {
          throwError({}, Messages.IllegalBreak);
        }

        return delegate.createBreakStatement(null);
      }

      if (lookahead.type === Token.Identifier) {
        label = parseVariableIdentifier();
        key = '$' + label.name;

        if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
          throwError({}, Messages.UnknownLabel, label.name);
        }
      }

      consumeSemicolon();

      if (label === null && !(state.inIteration || state.inSwitch)) {
        throwError({}, Messages.IllegalBreak);
      }

      return delegate.createBreakStatement(label);
    } // 12.9 The return statement


    function parseReturnStatement() {
      var argument = null;
      expectKeyword('return');

      if (!state.inFunctionBody) {
        throwErrorTolerant({}, Messages.IllegalReturn);
      } // 'return' followed by a space and an identifier is very common.


      if (source.charCodeAt(index) === 0x20) {
        if (isIdentifierStart(source.charCodeAt(index + 1))) {
          argument = parseExpression();
          consumeSemicolon();
          return delegate.createReturnStatement(argument);
        }
      }

      if (peekLineTerminator()) {
        return delegate.createReturnStatement(null);
      }

      if (!match(';')) {
        if (!match('}') && lookahead.type !== Token.EOF) {
          argument = parseExpression();
        }
      }

      consumeSemicolon();
      return delegate.createReturnStatement(argument);
    } // 12.10 The with statement


    function parseWithStatement() {
      var object, body;

      if (strict) {
        // TODO(ikarienator): Should we update the test cases instead?
        skipComment();
        throwErrorTolerant({}, Messages.StrictModeWith);
      }

      expectKeyword('with');
      expect('(');
      object = parseExpression();
      expect(')');
      body = parseStatement();
      return delegate.createWithStatement(object, body);
    } // 12.10 The swith statement


    function parseSwitchCase() {
      var test,
          consequent = [],
          statement,
          startToken;
      startToken = lookahead;

      if (matchKeyword('default')) {
        lex();
        test = null;
      } else {
        expectKeyword('case');
        test = parseExpression();
      }

      expect(':');

      while (index < length) {
        if (match('}') || matchKeyword('default') || matchKeyword('case')) {
          break;
        }

        statement = parseStatement();
        consequent.push(statement);
      }

      return delegate.markEnd(delegate.createSwitchCase(test, consequent), startToken);
    }

    function parseSwitchStatement() {
      var discriminant, cases, clause, oldInSwitch, defaultFound;
      expectKeyword('switch');
      expect('(');
      discriminant = parseExpression();
      expect(')');
      expect('{');
      cases = [];

      if (match('}')) {
        lex();
        return delegate.createSwitchStatement(discriminant, cases);
      }

      oldInSwitch = state.inSwitch;
      state.inSwitch = true;
      defaultFound = false;

      while (index < length) {
        if (match('}')) {
          break;
        }

        clause = parseSwitchCase();

        if (clause.test === null) {
          if (defaultFound) {
            throwError({}, Messages.MultipleDefaultsInSwitch);
          }

          defaultFound = true;
        }

        cases.push(clause);
      }

      state.inSwitch = oldInSwitch;
      expect('}');
      return delegate.createSwitchStatement(discriminant, cases);
    } // 12.13 The throw statement


    function parseThrowStatement() {
      var argument;
      expectKeyword('throw');

      if (peekLineTerminator()) {
        throwError({}, Messages.NewlineAfterThrow);
      }

      argument = parseExpression();
      consumeSemicolon();
      return delegate.createThrowStatement(argument);
    } // 12.14 The try statement


    function parseCatchClause() {
      var param, body, startToken;
      startToken = lookahead;
      expectKeyword('catch');
      expect('(');

      if (match(')')) {
        throwUnexpected(lookahead);
      }

      param = parseVariableIdentifier(); // 12.14.1

      if (strict && isRestrictedWord(param.name)) {
        throwErrorTolerant({}, Messages.StrictCatchVariable);
      }

      expect(')');
      body = parseBlock();
      return delegate.markEnd(delegate.createCatchClause(param, body), startToken);
    }

    function parseTryStatement() {
      var block,
          handlers = [],
          finalizer = null;
      expectKeyword('try');
      block = parseBlock();

      if (matchKeyword('catch')) {
        handlers.push(parseCatchClause());
      }

      if (matchKeyword('finally')) {
        lex();
        finalizer = parseBlock();
      }

      if (handlers.length === 0 && !finalizer) {
        throwError({}, Messages.NoCatchOrFinally);
      }

      return delegate.createTryStatement(block, [], handlers, finalizer);
    } // 12.15 The debugger statement


    function parseDebuggerStatement() {
      expectKeyword('debugger');
      consumeSemicolon();
      return delegate.createDebuggerStatement();
    } // 12 Statements


    function parseStatement() {
      var type = lookahead.type,
          expr,
          labeledBody,
          key,
          startToken;

      if (type === Token.EOF) {
        throwUnexpected(lookahead);
      }

      if (type === Token.Punctuator && lookahead.value === '{') {
        return parseBlock();
      }

      startToken = lookahead;

      if (type === Token.Punctuator) {
        switch (lookahead.value) {
          case ';':
            return delegate.markEnd(parseEmptyStatement(), startToken);

          case '(':
            return delegate.markEnd(parseExpressionStatement(), startToken);
        }
      }

      if (type === Token.Keyword) {
        switch (lookahead.value) {
          case 'break':
            return delegate.markEnd(parseBreakStatement(), startToken);

          case 'continue':
            return delegate.markEnd(parseContinueStatement(), startToken);

          case 'debugger':
            return delegate.markEnd(parseDebuggerStatement(), startToken);

          case 'do':
            return delegate.markEnd(parseDoWhileStatement(), startToken);

          case 'for':
            return delegate.markEnd(parseForStatement(), startToken);

          case 'function':
            return delegate.markEnd(parseFunctionDeclaration(), startToken);

          case 'if':
            return delegate.markEnd(parseIfStatement(), startToken);

          case 'return':
            return delegate.markEnd(parseReturnStatement(), startToken);

          case 'switch':
            return delegate.markEnd(parseSwitchStatement(), startToken);

          case 'throw':
            return delegate.markEnd(parseThrowStatement(), startToken);

          case 'try':
            return delegate.markEnd(parseTryStatement(), startToken);

          case 'var':
            return delegate.markEnd(parseVariableStatement(), startToken);

          case 'while':
            return delegate.markEnd(parseWhileStatement(), startToken);

          case 'with':
            return delegate.markEnd(parseWithStatement(), startToken);
        }
      }

      expr = parseExpression(); // 12.12 Labelled Statements

      if (expr.type === Syntax.Identifier && match(':')) {
        lex();
        key = '$' + expr.name;

        if (Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
          throwError({}, Messages.Redeclaration, 'Label', expr.name);
        }

        state.labelSet[key] = true;
        labeledBody = parseStatement();
        delete state.labelSet[key];
        return delegate.markEnd(delegate.createLabeledStatement(expr, labeledBody), startToken);
      }

      consumeSemicolon();
      return delegate.markEnd(delegate.createExpressionStatement(expr), startToken);
    } // 13 Function Definition


    function parseFunctionSourceElements() {
      var sourceElement,
          sourceElements = [],
          token,
          directive,
          firstRestricted,
          oldLabelSet,
          oldInIteration,
          oldInSwitch,
          oldInFunctionBody,
          startToken;
      startToken = lookahead;
      expect('{');

      while (index < length) {
        if (lookahead.type !== Token.StringLiteral) {
          break;
        }

        token = lookahead;
        sourceElement = parseSourceElement();
        sourceElements.push(sourceElement);

        if (sourceElement.expression.type !== Syntax.Literal) {
          // this is not directive
          break;
        }

        directive = source.slice(token.start + 1, token.end - 1);

        if (directive === 'use strict') {
          strict = true;

          if (firstRestricted) {
            throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
          }
        } else {
          if (!firstRestricted && token.octal) {
            firstRestricted = token;
          }
        }
      }

      oldLabelSet = state.labelSet;
      oldInIteration = state.inIteration;
      oldInSwitch = state.inSwitch;
      oldInFunctionBody = state.inFunctionBody;
      state.labelSet = {};
      state.inIteration = false;
      state.inSwitch = false;
      state.inFunctionBody = true;

      while (index < length) {
        if (match('}')) {
          break;
        }

        sourceElement = parseSourceElement();

        if (typeof sourceElement === 'undefined') {
          break;
        }

        sourceElements.push(sourceElement);
      }

      expect('}');
      state.labelSet = oldLabelSet;
      state.inIteration = oldInIteration;
      state.inSwitch = oldInSwitch;
      state.inFunctionBody = oldInFunctionBody;
      return delegate.markEnd(delegate.createBlockStatement(sourceElements), startToken);
    }

    function parseParams(firstRestricted) {
      var param,
          params = [],
          token,
          stricted,
          paramSet,
          key,
          message;
      expect('(');

      if (!match(')')) {
        paramSet = {};

        while (index < length) {
          token = lookahead;
          param = parseVariableIdentifier();
          key = '$' + token.value;

          if (strict) {
            if (isRestrictedWord(token.value)) {
              stricted = token;
              message = Messages.StrictParamName;
            }

            if (Object.prototype.hasOwnProperty.call(paramSet, key)) {
              stricted = token;
              message = Messages.StrictParamDupe;
            }
          } else if (!firstRestricted) {
            if (isRestrictedWord(token.value)) {
              firstRestricted = token;
              message = Messages.StrictParamName;
            } else if (isStrictModeReservedWord(token.value)) {
              firstRestricted = token;
              message = Messages.StrictReservedWord;
            } else if (Object.prototype.hasOwnProperty.call(paramSet, key)) {
              firstRestricted = token;
              message = Messages.StrictParamDupe;
            }
          }

          params.push(param);
          paramSet[key] = true;

          if (match(')')) {
            break;
          }

          expect(',');
        }
      }

      expect(')');
      return {
        params: params,
        stricted: stricted,
        firstRestricted: firstRestricted,
        message: message
      };
    }

    function parseFunctionDeclaration() {
      var id,
          params = [],
          body,
          token,
          stricted,
          tmp,
          firstRestricted,
          message,
          previousStrict,
          startToken;
      startToken = lookahead;
      expectKeyword('function');
      token = lookahead;
      id = parseVariableIdentifier();

      if (strict) {
        if (isRestrictedWord(token.value)) {
          throwErrorTolerant(token, Messages.StrictFunctionName);
        }
      } else {
        if (isRestrictedWord(token.value)) {
          firstRestricted = token;
          message = Messages.StrictFunctionName;
        } else if (isStrictModeReservedWord(token.value)) {
          firstRestricted = token;
          message = Messages.StrictReservedWord;
        }
      }

      tmp = parseParams(firstRestricted);
      params = tmp.params;
      stricted = tmp.stricted;
      firstRestricted = tmp.firstRestricted;

      if (tmp.message) {
        message = tmp.message;
      }

      previousStrict = strict;
      body = parseFunctionSourceElements();

      if (strict && firstRestricted) {
        throwError(firstRestricted, message);
      }

      if (strict && stricted) {
        throwErrorTolerant(stricted, message);
      }

      strict = previousStrict;
      return delegate.markEnd(delegate.createFunctionDeclaration(id, params, [], body), startToken);
    }

    function parseFunctionExpression() {
      var token,
          id = null,
          stricted,
          firstRestricted,
          message,
          tmp,
          params = [],
          body,
          previousStrict,
          startToken;
      startToken = lookahead;
      expectKeyword('function');

      if (!match('(')) {
        token = lookahead;
        id = parseVariableIdentifier();

        if (strict) {
          if (isRestrictedWord(token.value)) {
            throwErrorTolerant(token, Messages.StrictFunctionName);
          }
        } else {
          if (isRestrictedWord(token.value)) {
            firstRestricted = token;
            message = Messages.StrictFunctionName;
          } else if (isStrictModeReservedWord(token.value)) {
            firstRestricted = token;
            message = Messages.StrictReservedWord;
          }
        }
      }

      tmp = parseParams(firstRestricted);
      params = tmp.params;
      stricted = tmp.stricted;
      firstRestricted = tmp.firstRestricted;

      if (tmp.message) {
        message = tmp.message;
      }

      previousStrict = strict;
      body = parseFunctionSourceElements();

      if (strict && firstRestricted) {
        throwError(firstRestricted, message);
      }

      if (strict && stricted) {
        throwErrorTolerant(stricted, message);
      }

      strict = previousStrict;
      return delegate.markEnd(delegate.createFunctionExpression(id, params, [], body), startToken);
    } // 14 Program


    function parseSourceElement() {
      if (lookahead.type === Token.Keyword) {
        switch (lookahead.value) {
          case 'const':
          case 'let':
            return parseConstLetDeclaration(lookahead.value);

          case 'function':
            return parseFunctionDeclaration();

          default:
            return parseStatement();
        }
      }

      if (lookahead.type !== Token.EOF) {
        return parseStatement();
      }
    }

    function parseSourceElements() {
      var sourceElement,
          sourceElements = [],
          token,
          directive,
          firstRestricted;

      while (index < length) {
        token = lookahead;

        if (token.type !== Token.StringLiteral) {
          break;
        }

        sourceElement = parseSourceElement();
        sourceElements.push(sourceElement);

        if (sourceElement.expression.type !== Syntax.Literal) {
          // this is not directive
          break;
        }

        directive = source.slice(token.start + 1, token.end - 1);

        if (directive === 'use strict') {
          strict = true;

          if (firstRestricted) {
            throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
          }
        } else {
          if (!firstRestricted && token.octal) {
            firstRestricted = token;
          }
        }
      }

      while (index < length) {
        sourceElement = parseSourceElement();
        /* istanbul ignore if */

        if (typeof sourceElement === 'undefined') {
          break;
        }

        sourceElements.push(sourceElement);
      }

      return sourceElements;
    }

    function parseProgram() {
      var body, startToken;
      skipComment();
      peek();
      startToken = lookahead;
      strict = false;
      body = parseSourceElements();
      return delegate.markEnd(delegate.createProgram(body), startToken);
    }

    function filterTokenLocation() {
      var i,
          entry,
          token,
          tokens = [];

      for (i = 0; i < extra.tokens.length; ++i) {
        entry = extra.tokens[i];
        token = {
          type: entry.type,
          value: entry.value
        };

        if (extra.range) {
          token.range = entry.range;
        }

        if (extra.loc) {
          token.loc = entry.loc;
        }

        tokens.push(token);
      }

      extra.tokens = tokens;
    }

    function tokenize(code, options) {
      var toString, token, tokens;
      toString = String;

      if (typeof code !== 'string' && !(code instanceof String)) {
        code = toString(code);
      }

      delegate = SyntaxTreeDelegate;
      source = code;
      index = 0;
      lineNumber = source.length > 0 ? 1 : 0;
      lineStart = 0;
      length = source.length;
      lookahead = null;
      state = {
        allowIn: true,
        labelSet: {},
        inFunctionBody: false,
        inIteration: false,
        inSwitch: false,
        lastCommentStart: -1
      };
      extra = {}; // Options matching.

      options = options || {}; // Of course we collect tokens here.

      options.tokens = true;
      extra.tokens = [];
      extra.tokenize = true; // The following two fields are necessary to compute the Regex tokens.

      extra.openParenToken = -1;
      extra.openCurlyToken = -1;
      extra.range = typeof options.range === 'boolean' && options.range;
      extra.loc = typeof options.loc === 'boolean' && options.loc;

      if (typeof options.comment === 'boolean' && options.comment) {
        extra.comments = [];
      }

      if (typeof options.tolerant === 'boolean' && options.tolerant) {
        extra.errors = [];
      }

      try {
        peek();

        if (lookahead.type === Token.EOF) {
          return extra.tokens;
        }

        token = lex();

        while (lookahead.type !== Token.EOF) {
          try {
            token = lex();
          } catch (lexError) {
            token = lookahead;

            if (extra.errors) {
              extra.errors.push(lexError); // We have to break on the first error
              // to avoid infinite loops.

              break;
            } else {
              throw lexError;
            }
          }
        }

        filterTokenLocation();
        tokens = extra.tokens;

        if (typeof extra.comments !== 'undefined') {
          tokens.comments = extra.comments;
        }

        if (typeof extra.errors !== 'undefined') {
          tokens.errors = extra.errors;
        }
      } catch (e) {
        throw e;
      } finally {
        extra = {};
      }

      return tokens;
    }

    function parse(code, options) {
      var program, toString;
      toString = String;

      if (typeof code !== 'string' && !(code instanceof String)) {
        code = toString(code);
      }

      delegate = SyntaxTreeDelegate;
      source = code;
      index = 0;
      lineNumber = source.length > 0 ? 1 : 0;
      lineStart = 0;
      length = source.length;
      lookahead = null;
      state = {
        allowIn: true,
        labelSet: {},
        inFunctionBody: false,
        inIteration: false,
        inSwitch: false,
        lastCommentStart: -1
      };
      extra = {};

      if (typeof options !== 'undefined') {
        extra.range = typeof options.range === 'boolean' && options.range;
        extra.loc = typeof options.loc === 'boolean' && options.loc;
        extra.attachComment = typeof options.attachComment === 'boolean' && options.attachComment;

        if (extra.loc && options.source !== null && options.source !== undefined) {
          extra.source = toString(options.source);
        }

        if (typeof options.tokens === 'boolean' && options.tokens) {
          extra.tokens = [];
        }

        if (typeof options.comment === 'boolean' && options.comment) {
          extra.comments = [];
        }

        if (typeof options.tolerant === 'boolean' && options.tolerant) {
          extra.errors = [];
        }

        if (extra.attachComment) {
          extra.range = true;
          extra.comments = [];
          extra.bottomRightStack = [];
          extra.trailingComments = [];
          extra.leadingComments = [];
        }
      }

      try {
        program = parseProgram();

        if (typeof extra.comments !== 'undefined') {
          program.comments = extra.comments;
        }

        if (typeof extra.tokens !== 'undefined') {
          filterTokenLocation();
          program.tokens = extra.tokens;
        }

        if (typeof extra.errors !== 'undefined') {
          program.errors = extra.errors;
        }
      } catch (e) {
        throw e;
      } finally {
        extra = {};
      }

      return program;
    } // Sync with *.json manifests.


    exports.version = '1.2.5';
    exports.tokenize = tokenize;
    exports.parse = parse; // Deep copy.

    /* istanbul ignore next */

    exports.Syntax = function () {
      var name,
          types = {};

      if (typeof Object.create === 'function') {
        types = Object.create(null);
      }

      for (name in Syntax) {
        if (Syntax.hasOwnProperty(name)) {
          types[name] = Syntax[name];
        }
      }

      if (typeof Object.freeze === 'function') {
        Object.freeze(types);
      }

      return types;
    }();
  });
  /* vim: set sw=4 ts=4 et tw=80 : */

});

var PREFIX_COUNTER = 0;

function CompiledArgument(name, lvalue, rvalue) {
  this.name = name;
  this.lvalue = lvalue;
  this.rvalue = rvalue;
  this.count = 0;
}

function CompiledRoutine(body, args, thisVars, localVars) {
  this.body = body;
  this.args = args;
  this.thisVars = thisVars;
  this.localVars = localVars;
}

function isGlobal(identifier) {
  if (identifier === "eval") {
    throw new Error("cwise-parser: eval() not allowed");
  }

  if (typeof window !== "undefined") {
    return identifier in window;
  } else if (typeof commonjsGlobal !== "undefined") {
    return identifier in commonjsGlobal;
  } else if (typeof self !== "undefined") {
    return identifier in self;
  } else {
    return false;
  }
}

function getArgNames(ast) {
  var params = ast.body[0].expression.callee.params;
  var names = new Array(params.length);

  for (var i = 0; i < params.length; ++i) {
    names[i] = params[i].name;
  }

  return names;
}

function preprocess(func) {
  var src = ["(", func, ")()"].join("");
  var ast = esprima.parse(src, {
    range: true
  }); //Compute new prefix

  var prefix = "_inline_" + PREFIX_COUNTER++ + "_"; //Parse out arguments

  var argNames = getArgNames(ast);
  var compiledArgs = new Array(argNames.length);

  for (var i = 0; i < argNames.length; ++i) {
    compiledArgs[i] = new CompiledArgument([prefix, "arg", i, "_"].join(""), false, false);
  } //Create temporary data structure for source rewriting


  var exploded = new Array(src.length);

  for (var i = 0, n = src.length; i < n; ++i) {
    exploded[i] = src.charAt(i);
  } //Local variables


  var localVars = [];
  var thisVars = [];

  function createLocal(id) {
    var nstr = prefix + id.replace(/\_/g, "__");
    localVars.push(nstr);
    return nstr;
  } //Creates a this variable


  function createThisVar(id) {
    var nstr = "this_" + id.replace(/\_/g, "__");
    thisVars.push(nstr);
    return nstr;
  } //Rewrites an ast node


  function rewrite(node, nstr) {
    var lo = node.range[0],
        hi = node.range[1];

    for (var i = lo + 1; i < hi; ++i) {
      exploded[i] = "";
    }

    exploded[lo] = nstr;
  } //Remove any underscores


  function escapeString(str) {
    return "'" + str.replace(/\_/g, "\\_").replace(/\'/g, "\'") + "'";
  } //Returns the source of an identifier


  function source(node) {
    return exploded.slice(node.range[0], node.range[1]).join("");
  } //Computes the usage of a node


  var LVALUE = 1;
  var RVALUE = 2;

  function getUsage(node) {
    if (node.parent.type === "AssignmentExpression") {
      if (node.parent.left === node) {
        if (node.parent.operator === "=") {
          return LVALUE;
        }

        return LVALUE | RVALUE;
      }
    }

    if (node.parent.type === "UpdateExpression") {
      return LVALUE | RVALUE;
    }

    return RVALUE;
  } //Handle visiting a node


  (function visit(node, parent) {
    node.parent = parent;

    if (node.type === "MemberExpression") {
      //Handle member expression
      if (node.computed) {
        visit(node.object, node);
        visit(node.property, node);
      } else if (node.object.type === "ThisExpression") {
        rewrite(node, createThisVar(node.property.name));
      } else {
        visit(node.object, node);
      }
    } else if (node.type === "ThisExpression") {
      throw new Error("cwise-parser: Computed this is not allowed");
    } else if (node.type === "Identifier") {
      //Handle identifier
      var name = node.name;
      var argNo = argNames.indexOf(name);

      if (argNo >= 0) {
        var carg = compiledArgs[argNo];
        var usage = getUsage(node);

        if (usage & LVALUE) {
          carg.lvalue = true;
        }

        if (usage & RVALUE) {
          carg.rvalue = true;
        }

        ++carg.count;
        rewrite(node, carg.name);
      } else if (isGlobal(name)) ; else {
        rewrite(node, createLocal(name));
      }
    } else if (node.type === "Literal") {
      if (typeof node.value === "string") {
        rewrite(node, escapeString(node.value));
      }
    } else if (node.type === "WithStatement") {
      throw new Error("cwise-parser: with() statements not allowed");
    } else {
      //Visit all children
      var keys = Object.keys(node);

      for (var i = 0, n = keys.length; i < n; ++i) {
        if (keys[i] === "parent") {
          continue;
        }

        var value = node[keys[i]];

        if (value) {
          if (value instanceof Array) {
            for (var j = 0; j < value.length; ++j) {
              if (value[j] && typeof value[j].type === "string") {
                visit(value[j], node);
              }
            }
          } else if (typeof value.type === "string") {
            visit(value, node);
          }
        }
      }
    }
  })(ast.body[0].expression.callee.body, undefined); //Remove duplicate variables


  uniq(localVars);
  uniq(thisVars); //Return body

  var routine = new CompiledRoutine(source(ast.body[0].expression.callee.body), compiledArgs, thisVars, localVars);
  return routine;
}

var cwiseParser = preprocess;

var REQUIRED_FIELDS = ["args", "body"];
var OPTIONAL_FIELDS = ["pre", "post", "printCode", "funcName", "blockSize"];

function createCWise(user_args) {
  //Check parameters
  for (var id in user_args) {
    if (REQUIRED_FIELDS.indexOf(id) < 0 && OPTIONAL_FIELDS.indexOf(id) < 0) {
      console.warn("cwise: Unknown argument '" + id + "' passed to expression compiler");
    }
  }

  for (var i = 0; i < REQUIRED_FIELDS.length; ++i) {
    if (!user_args[REQUIRED_FIELDS[i]]) {
      throw new Error("cwise: Missing argument: " + REQUIRED_FIELDS[i]);
    }
  } //Parse blocks


  return compiler({
    args: user_args.args,
    pre: cwiseParser(user_args.pre || function () {}),
    body: cwiseParser(user_args.body),
    post: cwiseParser(user_args.post || function () {}),
    debug: !!user_args.printCode,
    funcName: user_args.funcName || user_args.body.name || "cwise",
    blockSize: user_args.blockSize || 64
  });
}

var cwiseEsprima = createCWise;

function add(out_r, out_i, a_r, a_i, b_r, b_i) {
  ndarrayOps.add(out_r, a_r, b_r);
  ndarrayOps.add(out_i, a_i, b_i);
}

var add_1 = add;

function addeq(out_r, out_i, a_r, a_i) {
  ndarrayOps.addeq(out_r, a_r);
  ndarrayOps.addeq(out_i, a_i);
}

var addeq_1 = addeq;

function adds(out_r, out_i, a_r, a_i, s_r, s_i) {
  ndarrayOps.adds(out_r, a_r, s_r);
  ndarrayOps.adds(out_r, a_i, s_i);
}

var adds_1 = adds;

function addseq(out_r, out_i, s_r, s_i) {
  ndarrayOps.addseq(out_r, s_r);
  ndarrayOps.addseq(out_i, s_i);
}

var addseq_1 = addseq;

function sub(out_r, out_i, a_r, a_i, b_r, b_i) {
  ndarrayOps.sub(out_r, a_r, b_r);
  ndarrayOps.sub(out_i, a_i, b_i);
}

var sub_1 = sub;

function subeq(out_r, out_i, a_r, a_i) {
  ndarrayOps.subeq(out_r, a_r);
  ndarrayOps.subeq(out_i, a_i);
}

var subeq_1 = subeq;

function subs(out_r, out_i, a_r, a_i, s_r, s_i) {
  ndarrayOps.subs(out_r, a_r, s_r);
  ndarrayOps.subs(out_i, a_i, s_i);
}

var subs_1 = subs;

function subseq(out_r, out_i, s_r, s_i) {
  ndarrayOps.subseq(out_r, s_r);
  ndarrayOps.subseq(out_i, s_i);
}

var subseq_1 = subseq;

function neg(out_r, out_i, a_r, a_i) {
  ndarrayOps.neg(out_r, a_r);
  ndarrayOps.neg(out_i, a_i);
}

var neg_1 = neg;

function negeq(out_r, out_i) {
  ndarrayOps.negeq(out_r);
  ndarrayOps.negeq(out_i);
}

var negeq_1 = negeq;

function conj(out_r, out_i, a_r, a_i) {
  ndarrayOps.assign(out_r, a_r);
  ndarrayOps.neg(out_i, a_i);
}

var conj_1 = conj;

function conjeq(out_r, out_i) {
  ndarrayOps.negeq(out_i);
}

var conjeq_1 = conjeq;
var mul = cwiseEsprima({
  args: ["array", "array", "array", "array", "array", "array"],
  body: function cmul(out_r, out_i, a_r, a_i, b_r, b_i) {
  }
});
var muleq = cwiseEsprima({
  args: ["array", "array", "array", "array"],
  body: function cmuleq(out_r, out_i, a_r, a_i) {
  }
});
var muls = cwiseEsprima({
  args: ["array", "array", "array", "array", "scalar", "scalar"],
  pre: function (out_r, out_i, a_r, a_i, s_r, s_i) {
    this.u = s_r + s_i;
    this.v = s_i - s_r;
  },
  body: function cmuls(out_r, out_i, a_r, a_i, s_r, s_i) {
    var a = a_r;
    var b = a_i;
    var k1 = s_r * (a + b);
    out_r = k1 - b * this.u;
    out_i = k1 + a * this.v;
  }
});
var mulseq = cwiseEsprima({
  args: ["array", "array", "scalar", "scalar"],
  pre: function (out_r, out_i, s_r, s_i) {
    this.u = s_r + s_i;
    this.v = s_i - s_r;
  },
  body: function cmulseq(out_r, out_i, s_r, s_i) {
    var a = out_r;
    var b = out_i;
    var k1 = s_r * (a + b);
    out_r = k1 - b * this.u;
    out_i = k1 + a * this.v;
  }
});
var div = cwiseEsprima({
  args: ["array", "array", "array", "array", "array", "array"],
  body: function cdiv(out_r, out_i, a_r, a_i, b_r, b_i) {
  }
});
var diveq = cwiseEsprima({
  args: ["array", "array", "array", "array"],
  body: function cdiveq(out_r, out_i, a_r, a_i) {
  }
});
var divs = cwiseEsprima({
  args: ["array", "array", "array", "array", "scalar", "scalar"],
  pre: function (out_r, out_i, a_r, a_i, s_r, s_i) {
    var w = s_r * s_r + s_i * s_i;
    s_r /= w;
    s_i /= -w;
    this.c = s_r;
    this.u = s_r + s_i;
    this.v = s_i - s_r;
  },
  body: function cdivs(out_r, out_i, a_r, a_i, s_r, s_i) {
    var a = a_r;
    var b = a_i;
    var k1 = this.c * (a + b);
    out_r = k1 - b * this.u;
    out_i = k1 + a * this.v;
  }
});
var divseq = cwiseEsprima({
  args: ["array", "array", "scalar", "scalar"],
  pre: function (out_r, out_i, s_r, s_i) {
    var w = s_r * s_r + s_i * s_i;
    s_r /= w;
    s_i /= -w;
    this.c = s_r;
    this.u = s_r + s_i;
    this.v = s_i - s_r;
  },
  body: function cdivseq(out_r, out_i, s_r, s_i) {
    var a = out_r;
    var b = out_i;
    var k1 = this.c * (a + b);
    out_r = k1 - b * this.u;
    out_i = k1 + a * this.v;
  }
});
var recip = cwiseEsprima({
  args: ["array", "array", "array", "array"],
  body: function crecip(out_r, out_i, a_r, a_i) {
  }
});
var recipeq = cwiseEsprima({
  args: ["array", "array"],
  body: function crecipeq(out_r, out_i) {
  }
});
var exp = cwiseEsprima({
  args: ["array", "array", "array", "array"],
  pre: function () {
    this.exp = Math.exp;
    this.cos = Math.cos;
    this.sin = Math.sin;
  },
  body: function cexp(out_r, out_i, a_r, a_i) {
    var r = this.exp(a_r);
    out_r = r * this.cos(a_i);
    out_i = r * this.sin(a_i);
  }
});
var expeq = cwiseEsprima({
  args: ["array", "array"],
  pre: function () {
    this.exp = Math.exp;
    this.cos = Math.cos;
    this.sin = Math.sin;
  },
  body: function cexpeq(out_r, out_i) {
    var r = this.exp(out_r);
    var t = out_ir;
    out_r = r * this.cos(t);
    out_i = r * this.sin(t);
  }
});
var mag = cwiseEsprima({
  args: ["array", "array", "array"],
  body: function cmag(out, a_r, a_i) {
  }
});
var abs$1 = cwiseEsprima({
  args: ["array", "array", "array"],
  pre: function () {
    this.sqrt = Math.sqrt;
  },
  body: function cabs(out, a_r, a_i) {
    out = this.sqrt(a_r * a_r + a_i * a_i);
  }
}); //Same thing as atan2

var arg = ndarrayOps.atan2;
var cops = {
  add: add_1,
  addeq: addeq_1,
  adds: adds_1,
  addseq: addseq_1,
  sub: sub_1,
  subeq: subeq_1,
  subs: subs_1,
  subseq: subseq_1,
  neg: neg_1,
  negeq: negeq_1,
  conj: conj_1,
  conjeq: conjeq_1,
  mul: mul,
  muleq: muleq,
  muls: muls,
  mulseq: mulseq,
  div: div,
  diveq: diveq,
  divs: divs,
  divseq: divseq,
  recip: recip,
  recipeq: recipeq,
  exp: exp,
  expeq: expeq,
  mag: mag,
  abs: abs$1,
  arg: arg
};

var byteLength_1 = byteLength;
var toByteArray_1 = toByteArray;
var fromByteArray_1 = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
} // Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications


revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function getLens(b64) {
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  } // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42


  var validLen = b64.indexOf('=');
  if (validLen === -1) validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
} // base64 is 4/3 + up to two characters of the original data


function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}

function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}

function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0; // if there are placeholders, only get up to the last complete 4 chars

  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i;

  for (i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 0xFF;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 0xFF;
  }

  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 0xFF;
    arr[curByte++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];

  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
    output.push(tripletToBase64(tmp));
  }

  return output.join('');
}

function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes

  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3
  // go through the array every three bytes, we'll deal with trailing stuff later

  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  } // pad the end with zeros, but make sure to not forget the extra bytes


  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
  }

  return parts.join('');
}

var base64Js = {
  byteLength: byteLength_1,
  toByteArray: toByteArray_1,
  fromByteArray: fromByteArray_1
};

var read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;

  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;

  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }

  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

var write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);

    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }

    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }

    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;

  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

var ieee754 = {
  read: read,
  write: write
};

var toString = {}.toString;

var isarray = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

var buffer = createCommonjsModule(function (module, exports) {

  exports.Buffer = Buffer;
  exports.SlowBuffer = SlowBuffer;
  exports.INSPECT_MAX_BYTES = 50;
  /**
   * If `Buffer.TYPED_ARRAY_SUPPORT`:
   *   === true    Use Uint8Array implementation (fastest)
   *   === false   Use Object implementation (most compatible, even IE6)
   *
   * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
   * Opera 11.6+, iOS 4.2+.
   *
   * Due to various browser bugs, sometimes the Object implementation will be used even
   * when the browser supports typed arrays.
   *
   * Note:
   *
   *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
   *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
   *
   *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
   *
   *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
   *     incorrect length in some situations.
  
   * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
   * get the Object implementation, which is slower but behaves correctly.
   */

  Buffer.TYPED_ARRAY_SUPPORT = commonjsGlobal.TYPED_ARRAY_SUPPORT !== undefined ? commonjsGlobal.TYPED_ARRAY_SUPPORT : typedArraySupport();
  /*
   * Export kMaxLength after typed array support is determined.
   */

  exports.kMaxLength = kMaxLength();

  function typedArraySupport() {
    try {
      var arr = new Uint8Array(1);
      arr.__proto__ = {
        __proto__: Uint8Array.prototype,
        foo: function () {
          return 42;
        }
      };
      return arr.foo() === 42 && // typed array instances can be augmented
      typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
      arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
    } catch (e) {
      return false;
    }
  }

  function kMaxLength() {
    return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
  }

  function createBuffer(that, length) {
    if (kMaxLength() < length) {
      throw new RangeError('Invalid typed array length');
    }

    if (Buffer.TYPED_ARRAY_SUPPORT) {
      // Return an augmented `Uint8Array` instance, for best performance
      that = new Uint8Array(length);
      that.__proto__ = Buffer.prototype;
    } else {
      // Fallback: Return an object instance of the Buffer class
      if (that === null) {
        that = new Buffer(length);
      }

      that.length = length;
    }

    return that;
  }
  /**
   * The Buffer constructor returns instances of `Uint8Array` that have their
   * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
   * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
   * and the `Uint8Array` methods. Square bracket notation works as expected -- it
   * returns a single octet.
   *
   * The `Uint8Array` prototype remains unmodified.
   */


  function Buffer(arg, encodingOrOffset, length) {
    if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
      return new Buffer(arg, encodingOrOffset, length);
    } // Common case.


    if (typeof arg === 'number') {
      if (typeof encodingOrOffset === 'string') {
        throw new Error('If encoding is specified then the first argument must be a string');
      }

      return allocUnsafe(this, arg);
    }

    return from(this, arg, encodingOrOffset, length);
  }

  Buffer.poolSize = 8192; // not used by this implementation
  // TODO: Legacy, not needed anymore. Remove in next major version.

  Buffer._augment = function (arr) {
    arr.__proto__ = Buffer.prototype;
    return arr;
  };

  function from(that, value, encodingOrOffset, length) {
    if (typeof value === 'number') {
      throw new TypeError('"value" argument must not be a number');
    }

    if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
      return fromArrayBuffer(that, value, encodingOrOffset, length);
    }

    if (typeof value === 'string') {
      return fromString(that, value, encodingOrOffset);
    }

    return fromObject(that, value);
  }
  /**
   * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
   * if value is a number.
   * Buffer.from(str[, encoding])
   * Buffer.from(array)
   * Buffer.from(buffer)
   * Buffer.from(arrayBuffer[, byteOffset[, length]])
   **/


  Buffer.from = function (value, encodingOrOffset, length) {
    return from(null, value, encodingOrOffset, length);
  };

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    Buffer.prototype.__proto__ = Uint8Array.prototype;
    Buffer.__proto__ = Uint8Array;

    if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
      // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
      Object.defineProperty(Buffer, Symbol.species, {
        value: null,
        configurable: true
      });
    }
  }

  function assertSize(size) {
    if (typeof size !== 'number') {
      throw new TypeError('"size" argument must be a number');
    } else if (size < 0) {
      throw new RangeError('"size" argument must not be negative');
    }
  }

  function alloc(that, size, fill, encoding) {
    assertSize(size);

    if (size <= 0) {
      return createBuffer(that, size);
    }

    if (fill !== undefined) {
      // Only pay attention to encoding if it's a string. This
      // prevents accidentally sending in a number that would
      // be interpretted as a start offset.
      return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
    }

    return createBuffer(that, size);
  }
  /**
   * Creates a new filled Buffer instance.
   * alloc(size[, fill[, encoding]])
   **/


  Buffer.alloc = function (size, fill, encoding) {
    return alloc(null, size, fill, encoding);
  };

  function allocUnsafe(that, size) {
    assertSize(size);
    that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);

    if (!Buffer.TYPED_ARRAY_SUPPORT) {
      for (var i = 0; i < size; ++i) {
        that[i] = 0;
      }
    }

    return that;
  }
  /**
   * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
   * */


  Buffer.allocUnsafe = function (size) {
    return allocUnsafe(null, size);
  };
  /**
   * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
   */


  Buffer.allocUnsafeSlow = function (size) {
    return allocUnsafe(null, size);
  };

  function fromString(that, string, encoding) {
    if (typeof encoding !== 'string' || encoding === '') {
      encoding = 'utf8';
    }

    if (!Buffer.isEncoding(encoding)) {
      throw new TypeError('"encoding" must be a valid string encoding');
    }

    var length = byteLength(string, encoding) | 0;
    that = createBuffer(that, length);
    var actual = that.write(string, encoding);

    if (actual !== length) {
      // Writing a hex string, for example, that contains invalid characters will
      // cause everything after the first invalid character to be ignored. (e.g.
      // 'abxxcd' will be treated as 'ab')
      that = that.slice(0, actual);
    }

    return that;
  }

  function fromArrayLike(that, array) {
    var length = array.length < 0 ? 0 : checked(array.length) | 0;
    that = createBuffer(that, length);

    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }

    return that;
  }

  function fromArrayBuffer(that, array, byteOffset, length) {
    array.byteLength; // this throws if `array` is not a valid ArrayBuffer

    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError('\'offset\' is out of bounds');
    }

    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError('\'length\' is out of bounds');
    }

    if (byteOffset === undefined && length === undefined) {
      array = new Uint8Array(array);
    } else if (length === undefined) {
      array = new Uint8Array(array, byteOffset);
    } else {
      array = new Uint8Array(array, byteOffset, length);
    }

    if (Buffer.TYPED_ARRAY_SUPPORT) {
      // Return an augmented `Uint8Array` instance, for best performance
      that = array;
      that.__proto__ = Buffer.prototype;
    } else {
      // Fallback: Return an object instance of the Buffer class
      that = fromArrayLike(that, array);
    }

    return that;
  }

  function fromObject(that, obj) {
    if (Buffer.isBuffer(obj)) {
      var len = checked(obj.length) | 0;
      that = createBuffer(that, len);

      if (that.length === 0) {
        return that;
      }

      obj.copy(that, 0, 0, len);
      return that;
    }

    if (obj) {
      if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
        if (typeof obj.length !== 'number' || isnan(obj.length)) {
          return createBuffer(that, 0);
        }

        return fromArrayLike(that, obj);
      }

      if (obj.type === 'Buffer' && isarray(obj.data)) {
        return fromArrayLike(that, obj.data);
      }
    }

    throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
  }

  function checked(length) {
    // Note: cannot use `length < kMaxLength()` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= kMaxLength()) {
      throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
    }

    return length | 0;
  }

  function SlowBuffer(length) {
    if (+length != length) {
      // eslint-disable-line eqeqeq
      length = 0;
    }

    return Buffer.alloc(+length);
  }

  Buffer.isBuffer = function isBuffer(b) {
    return !!(b != null && b._isBuffer);
  };

  Buffer.compare = function compare(a, b) {
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
      throw new TypeError('Arguments must be Buffers');
    }

    if (a === b) return 0;
    var x = a.length;
    var y = b.length;

    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
      }
    }

    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  };

  Buffer.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case 'hex':
      case 'utf8':
      case 'utf-8':
      case 'ascii':
      case 'latin1':
      case 'binary':
      case 'base64':
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return true;

      default:
        return false;
    }
  };

  Buffer.concat = function concat(list, length) {
    if (!isarray(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }

    if (list.length === 0) {
      return Buffer.alloc(0);
    }

    var i;

    if (length === undefined) {
      length = 0;

      for (i = 0; i < list.length; ++i) {
        length += list[i].length;
      }
    }

    var buffer = Buffer.allocUnsafe(length);
    var pos = 0;

    for (i = 0; i < list.length; ++i) {
      var buf = list[i];

      if (!Buffer.isBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }

      buf.copy(buffer, pos);
      pos += buf.length;
    }

    return buffer;
  };

  function byteLength(string, encoding) {
    if (Buffer.isBuffer(string)) {
      return string.length;
    }

    if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
      return string.byteLength;
    }

    if (typeof string !== 'string') {
      string = '' + string;
    }

    var len = string.length;
    if (len === 0) return 0; // Use a for loop to avoid recursion

    var loweredCase = false;

    for (;;) {
      switch (encoding) {
        case 'ascii':
        case 'latin1':
        case 'binary':
          return len;

        case 'utf8':
        case 'utf-8':
        case undefined:
          return utf8ToBytes(string).length;

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return len * 2;

        case 'hex':
          return len >>> 1;

        case 'base64':
          return base64ToBytes(string).length;

        default:
          if (loweredCase) return utf8ToBytes(string).length; // assume utf8

          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }

  Buffer.byteLength = byteLength;

  function slowToString(encoding, start, end) {
    var loweredCase = false; // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    // property of a typed array.
    // This behaves neither like String nor Uint8Array in that we set start/end
    // to their upper/lower bounds if the value passed is out of range.
    // undefined is handled specially as per ECMA-262 6th Edition,
    // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.

    if (start === undefined || start < 0) {
      start = 0;
    } // Return early if start > this.length. Done here to prevent potential uint32
    // coercion fail below.


    if (start > this.length) {
      return '';
    }

    if (end === undefined || end > this.length) {
      end = this.length;
    }

    if (end <= 0) {
      return '';
    } // Force coersion to uint32. This will also coerce falsey/NaN values to 0.


    end >>>= 0;
    start >>>= 0;

    if (end <= start) {
      return '';
    }

    if (!encoding) encoding = 'utf8';

    while (true) {
      switch (encoding) {
        case 'hex':
          return hexSlice(this, start, end);

        case 'utf8':
        case 'utf-8':
          return utf8Slice(this, start, end);

        case 'ascii':
          return asciiSlice(this, start, end);

        case 'latin1':
        case 'binary':
          return latin1Slice(this, start, end);

        case 'base64':
          return base64Slice(this, start, end);

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return utf16leSlice(this, start, end);

        default:
          if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
          encoding = (encoding + '').toLowerCase();
          loweredCase = true;
      }
    }
  } // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
  // Buffer instances.


  Buffer.prototype._isBuffer = true;

  function swap(b, n, m) {
    var i = b[n];
    b[n] = b[m];
    b[m] = i;
  }

  Buffer.prototype.swap16 = function swap16() {
    var len = this.length;

    if (len % 2 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 16-bits');
    }

    for (var i = 0; i < len; i += 2) {
      swap(this, i, i + 1);
    }

    return this;
  };

  Buffer.prototype.swap32 = function swap32() {
    var len = this.length;

    if (len % 4 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 32-bits');
    }

    for (var i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }

    return this;
  };

  Buffer.prototype.swap64 = function swap64() {
    var len = this.length;

    if (len % 8 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 64-bits');
    }

    for (var i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }

    return this;
  };

  Buffer.prototype.toString = function toString() {
    var length = this.length | 0;
    if (length === 0) return '';
    if (arguments.length === 0) return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
  };

  Buffer.prototype.equals = function equals(b) {
    if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
    if (this === b) return true;
    return Buffer.compare(this, b) === 0;
  };

  Buffer.prototype.inspect = function inspect() {
    var str = '';
    var max = exports.INSPECT_MAX_BYTES;

    if (this.length > 0) {
      str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
      if (this.length > max) str += ' ... ';
    }

    return '<Buffer ' + str + '>';
  };

  Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (!Buffer.isBuffer(target)) {
      throw new TypeError('Argument must be a Buffer');
    }

    if (start === undefined) {
      start = 0;
    }

    if (end === undefined) {
      end = target ? target.length : 0;
    }

    if (thisStart === undefined) {
      thisStart = 0;
    }

    if (thisEnd === undefined) {
      thisEnd = this.length;
    }

    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError('out of range index');
    }

    if (thisStart >= thisEnd && start >= end) {
      return 0;
    }

    if (thisStart >= thisEnd) {
      return -1;
    }

    if (start >= end) {
      return 1;
    }

    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) return 0;
    var x = thisEnd - thisStart;
    var y = end - start;
    var len = Math.min(x, y);
    var thisCopy = this.slice(thisStart, thisEnd);
    var targetCopy = target.slice(start, end);

    for (var i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
      }
    }

    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  }; // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
  // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
  //
  // Arguments:
  // - buffer - a Buffer to search
  // - val - a string, Buffer, or number
  // - byteOffset - an index into `buffer`; will be clamped to an int32
  // - encoding - an optional encoding, relevant is val is a string
  // - dir - true for indexOf, false for lastIndexOf


  function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    // Empty buffer means no match
    if (buffer.length === 0) return -1; // Normalize byteOffset

    if (typeof byteOffset === 'string') {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 0x7fffffff) {
      byteOffset = 0x7fffffff;
    } else if (byteOffset < -0x80000000) {
      byteOffset = -0x80000000;
    }

    byteOffset = +byteOffset; // Coerce to Number.

    if (isNaN(byteOffset)) {
      // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
      byteOffset = dir ? 0 : buffer.length - 1;
    } // Normalize byteOffset: negative offsets start from the end of the buffer


    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;

    if (byteOffset >= buffer.length) {
      if (dir) return -1;else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
      if (dir) byteOffset = 0;else return -1;
    } // Normalize val


    if (typeof val === 'string') {
      val = Buffer.from(val, encoding);
    } // Finally, search either indexOf (if dir is true) or lastIndexOf


    if (Buffer.isBuffer(val)) {
      // Special case: looking for empty string/buffer always fails
      if (val.length === 0) {
        return -1;
      }

      return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === 'number') {
      val = val & 0xFF; // Search for a byte value [0-255]

      if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
        }
      }

      return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
    }

    throw new TypeError('val must be string, number or Buffer');
  }

  function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    var indexSize = 1;
    var arrLength = arr.length;
    var valLength = val.length;

    if (encoding !== undefined) {
      encoding = String(encoding).toLowerCase();

      if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
        if (arr.length < 2 || val.length < 2) {
          return -1;
        }

        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }

    function read(buf, i) {
      if (indexSize === 1) {
        return buf[i];
      } else {
        return buf.readUInt16BE(i * indexSize);
      }
    }

    var i;

    if (dir) {
      var foundIndex = -1;

      for (i = byteOffset; i < arrLength; i++) {
        if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1) foundIndex = i;
          if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
        } else {
          if (foundIndex !== -1) i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;

      for (i = byteOffset; i >= 0; i--) {
        var found = true;

        for (var j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val, j)) {
            found = false;
            break;
          }
        }

        if (found) return i;
      }
    }

    return -1;
  }

  Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
  };

  Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
  };

  Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
  };

  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;

    if (!length) {
      length = remaining;
    } else {
      length = Number(length);

      if (length > remaining) {
        length = remaining;
      }
    } // must be an even number of digits


    var strLen = string.length;
    if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

    if (length > strLen / 2) {
      length = strLen / 2;
    }

    for (var i = 0; i < length; ++i) {
      var parsed = parseInt(string.substr(i * 2, 2), 16);
      if (isNaN(parsed)) return i;
      buf[offset + i] = parsed;
    }

    return i;
  }

  function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
  }

  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }

  function latin1Write(buf, string, offset, length) {
    return asciiWrite(buf, string, offset, length);
  }

  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }

  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
  }

  Buffer.prototype.write = function write(string, offset, length, encoding) {
    // Buffer#write(string)
    if (offset === undefined) {
      encoding = 'utf8';
      length = this.length;
      offset = 0; // Buffer#write(string, encoding)
    } else if (length === undefined && typeof offset === 'string') {
      encoding = offset;
      length = this.length;
      offset = 0; // Buffer#write(string, offset[, length][, encoding])
    } else if (isFinite(offset)) {
      offset = offset | 0;

      if (isFinite(length)) {
        length = length | 0;
        if (encoding === undefined) encoding = 'utf8';
      } else {
        encoding = length;
        length = undefined;
      } // legacy write(string, encoding, offset, length) - remove in v0.13

    } else {
      throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
    }

    var remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;

    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
      throw new RangeError('Attempt to write outside buffer bounds');
    }

    if (!encoding) encoding = 'utf8';
    var loweredCase = false;

    for (;;) {
      switch (encoding) {
        case 'hex':
          return hexWrite(this, string, offset, length);

        case 'utf8':
        case 'utf-8':
          return utf8Write(this, string, offset, length);

        case 'ascii':
          return asciiWrite(this, string, offset, length);

        case 'latin1':
        case 'binary':
          return latin1Write(this, string, offset, length);

        case 'base64':
          // Warning: maxLength not taken into account in base64Write
          return base64Write(this, string, offset, length);

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return ucs2Write(this, string, offset, length);

        default:
          if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };

  Buffer.prototype.toJSON = function toJSON() {
    return {
      type: 'Buffer',
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };

  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64Js.fromByteArray(buf);
    } else {
      return base64Js.fromByteArray(buf.slice(start, end));
    }
  }

  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];
    var i = start;

    while (i < end) {
      var firstByte = buf[i];
      var codePoint = null;
      var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

      if (i + bytesPerSequence <= end) {
        var secondByte, thirdByte, fourthByte, tempCodePoint;

        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 0x80) {
              codePoint = firstByte;
            }

            break;

          case 2:
            secondByte = buf[i + 1];

            if ((secondByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;

              if (tempCodePoint > 0x7F) {
                codePoint = tempCodePoint;
              }
            }

            break;

          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];

            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;

              if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                codePoint = tempCodePoint;
              }
            }

            break;

          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];

            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;

              if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                codePoint = tempCodePoint;
              }
            }

        }
      }

      if (codePoint === null) {
        // we did not generate a valid codePoint so insert a
        // replacement char (U+FFFD) and advance only 1 byte
        codePoint = 0xFFFD;
        bytesPerSequence = 1;
      } else if (codePoint > 0xFFFF) {
        // encode to utf16 (surrogate pair dance)
        codePoint -= 0x10000;
        res.push(codePoint >>> 10 & 0x3FF | 0xD800);
        codePoint = 0xDC00 | codePoint & 0x3FF;
      }

      res.push(codePoint);
      i += bytesPerSequence;
    }

    return decodeCodePointsArray(res);
  } // Based on http://stackoverflow.com/a/22747272/680742, the browser with
  // the lowest limit is Chrome, with 0x10000 args.
  // We go 1 magnitude less, for safety


  var MAX_ARGUMENTS_LENGTH = 0x1000;

  function decodeCodePointsArray(codePoints) {
    var len = codePoints.length;

    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
    } // Decode in chunks to avoid "call stack size exceeded".


    var res = '';
    var i = 0;

    while (i < len) {
      res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
    }

    return res;
  }

  function asciiSlice(buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);

    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 0x7F);
    }

    return ret;
  }

  function latin1Slice(buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);

    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }

    return ret;
  }

  function hexSlice(buf, start, end) {
    var len = buf.length;
    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;
    var out = '';

    for (var i = start; i < end; ++i) {
      out += toHex(buf[i]);
    }

    return out;
  }

  function utf16leSlice(buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = '';

    for (var i = 0; i < bytes.length; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }

    return res;
  }

  Buffer.prototype.slice = function slice(start, end) {
    var len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;

    if (start < 0) {
      start += len;
      if (start < 0) start = 0;
    } else if (start > len) {
      start = len;
    }

    if (end < 0) {
      end += len;
      if (end < 0) end = 0;
    } else if (end > len) {
      end = len;
    }

    if (end < start) end = start;
    var newBuf;

    if (Buffer.TYPED_ARRAY_SUPPORT) {
      newBuf = this.subarray(start, end);
      newBuf.__proto__ = Buffer.prototype;
    } else {
      var sliceLen = end - start;
      newBuf = new Buffer(sliceLen, undefined);

      for (var i = 0; i < sliceLen; ++i) {
        newBuf[i] = this[i + start];
      }
    }

    return newBuf;
  };
  /*
   * Need to make sure that buffer isn't trying to write out of bounds.
   */


  function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
    if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
  }

  Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;

    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }

    return val;
  };

  Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;

    if (!noAssert) {
      checkOffset(offset, byteLength, this.length);
    }

    var val = this[offset + --byteLength];
    var mul = 1;

    while (byteLength > 0 && (mul *= 0x100)) {
      val += this[offset + --byteLength] * mul;
    }

    return val;
  };

  Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset];
  };

  Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
  };

  Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
  };

  Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
  };

  Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
  };

  Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;

    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }

    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
  };

  Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    var i = byteLength;
    var mul = 1;
    var val = this[offset + --i];

    while (i > 0 && (mul *= 0x100)) {
      val += this[offset + --i] * mul;
    }

    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
  };

  Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80)) return this[offset];
    return (0xff - this[offset] + 1) * -1;
  };

  Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset] | this[offset + 1] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
  };

  Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset + 1] | this[offset] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
  };

  Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
  };

  Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
  };

  Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
  };

  Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
  };

  Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
  };

  Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
  };

  function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length) throw new RangeError('Index out of range');
  }

  Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    byteLength = byteLength | 0;

    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1;
      checkInt(this, value, offset, byteLength, maxBytes, 0);
    }

    var mul = 1;
    var i = 0;
    this[offset] = value & 0xFF;

    while (++i < byteLength && (mul *= 0x100)) {
      this[offset + i] = value / mul & 0xFF;
    }

    return offset + byteLength;
  };

  Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    byteLength = byteLength | 0;

    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1;
      checkInt(this, value, offset, byteLength, maxBytes, 0);
    }

    var i = byteLength - 1;
    var mul = 1;
    this[offset + i] = value & 0xFF;

    while (--i >= 0 && (mul *= 0x100)) {
      this[offset + i] = value / mul & 0xFF;
    }

    return offset + byteLength;
  };

  Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
    this[offset] = value & 0xff;
    return offset + 1;
  };

  function objectWriteUInt16(buf, value, offset, littleEndian) {
    if (value < 0) value = 0xffff + value + 1;

    for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
      buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
    }
  }

  Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value & 0xff;
      this[offset + 1] = value >>> 8;
    } else {
      objectWriteUInt16(this, value, offset, true);
    }

    return offset + 2;
  };

  Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value >>> 8;
      this[offset + 1] = value & 0xff;
    } else {
      objectWriteUInt16(this, value, offset, false);
    }

    return offset + 2;
  };

  function objectWriteUInt32(buf, value, offset, littleEndian) {
    if (value < 0) value = 0xffffffff + value + 1;

    for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
      buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
    }
  }

  Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 0xff;
    } else {
      objectWriteUInt32(this, value, offset, true);
    }

    return offset + 4;
  };

  Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 0xff;
    } else {
      objectWriteUInt32(this, value, offset, false);
    }

    return offset + 4;
  };

  Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;

    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);
      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }

    var i = 0;
    var mul = 1;
    var sub = 0;
    this[offset] = value & 0xFF;

    while (++i < byteLength && (mul *= 0x100)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1;
      }

      this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }

    return offset + byteLength;
  };

  Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;

    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);
      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }

    var i = byteLength - 1;
    var mul = 1;
    var sub = 0;
    this[offset + i] = value & 0xFF;

    while (--i >= 0 && (mul *= 0x100)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1;
      }

      this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }

    return offset + byteLength;
  };

  Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
    if (value < 0) value = 0xff + value + 1;
    this[offset] = value & 0xff;
    return offset + 1;
  };

  Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value & 0xff;
      this[offset + 1] = value >>> 8;
    } else {
      objectWriteUInt16(this, value, offset, true);
    }

    return offset + 2;
  };

  Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value >>> 8;
      this[offset + 1] = value & 0xff;
    } else {
      objectWriteUInt16(this, value, offset, false);
    }

    return offset + 2;
  };

  Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);

    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value & 0xff;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
    } else {
      objectWriteUInt32(this, value, offset, true);
    }

    return offset + 4;
  };

  Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (value < 0) value = 0xffffffff + value + 1;

    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 0xff;
    } else {
      objectWriteUInt32(this, value, offset, false);
    }

    return offset + 4;
  };

  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError('Index out of range');
    if (offset < 0) throw new RangeError('Index out of range');
  }

  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4);
    }

    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }

  Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
  };

  Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
  };

  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8);
    }

    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }

  Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
  };

  Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
  }; // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)


  Buffer.prototype.copy = function copy(target, targetStart, start, end) {
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start; // Copy 0 bytes; we're done

    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0; // Fatal error conditions

    if (targetStart < 0) {
      throw new RangeError('targetStart out of bounds');
    }

    if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
    if (end < 0) throw new RangeError('sourceEnd out of bounds'); // Are we oob?

    if (end > this.length) end = this.length;

    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }

    var len = end - start;
    var i;

    if (this === target && start < targetStart && targetStart < end) {
      // descending copy from end
      for (i = len - 1; i >= 0; --i) {
        target[i + targetStart] = this[i + start];
      }
    } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
      // ascending copy from start
      for (i = 0; i < len; ++i) {
        target[i + targetStart] = this[i + start];
      }
    } else {
      Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
    }

    return len;
  }; // Usage:
  //    buffer.fill(number[, offset[, end]])
  //    buffer.fill(buffer[, offset[, end]])
  //    buffer.fill(string[, offset[, end]][, encoding])


  Buffer.prototype.fill = function fill(val, start, end, encoding) {
    // Handle string cases:
    if (typeof val === 'string') {
      if (typeof start === 'string') {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === 'string') {
        encoding = end;
        end = this.length;
      }

      if (val.length === 1) {
        var code = val.charCodeAt(0);

        if (code < 256) {
          val = code;
        }
      }

      if (encoding !== undefined && typeof encoding !== 'string') {
        throw new TypeError('encoding must be a string');
      }

      if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
        throw new TypeError('Unknown encoding: ' + encoding);
      }
    } else if (typeof val === 'number') {
      val = val & 255;
    } // Invalid ranges are not set to a default, so can range check early.


    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError('Out of range index');
    }

    if (end <= start) {
      return this;
    }

    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;
    if (!val) val = 0;
    var i;

    if (typeof val === 'number') {
      for (i = start; i < end; ++i) {
        this[i] = val;
      }
    } else {
      var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
      var len = bytes.length;

      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len];
      }
    }

    return this;
  }; // HELPER FUNCTIONS
  // ================


  var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

  function base64clean(str) {
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = stringtrim(str).replace(INVALID_BASE64_RE, ''); // Node converts strings with length < 2 to ''

    if (str.length < 2) return ''; // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not

    while (str.length % 4 !== 0) {
      str = str + '=';
    }

    return str;
  }

  function stringtrim(str) {
    if (str.trim) return str.trim();
    return str.replace(/^\s+|\s+$/g, '');
  }

  function toHex(n) {
    if (n < 16) return '0' + n.toString(16);
    return n.toString(16);
  }

  function utf8ToBytes(string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];

    for (var i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i); // is surrogate component

      if (codePoint > 0xD7FF && codePoint < 0xE000) {
        // last char was a lead
        if (!leadSurrogate) {
          // no lead yet
          if (codePoint > 0xDBFF) {
            // unexpected trail
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            continue;
          } else if (i + 1 === length) {
            // unpaired lead
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            continue;
          } // valid lead


          leadSurrogate = codePoint;
          continue;
        } // 2 leads in a row


        if (codePoint < 0xDC00) {
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          leadSurrogate = codePoint;
          continue;
        } // valid surrogate pair


        codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
      } else if (leadSurrogate) {
        // valid bmp char, but last char was a lead
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
      }

      leadSurrogate = null; // encode utf8

      if (codePoint < 0x80) {
        if ((units -= 1) < 0) break;
        bytes.push(codePoint);
      } else if (codePoint < 0x800) {
        if ((units -= 2) < 0) break;
        bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
      } else if (codePoint < 0x10000) {
        if ((units -= 3) < 0) break;
        bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
      } else if (codePoint < 0x110000) {
        if ((units -= 4) < 0) break;
        bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
      } else {
        throw new Error('Invalid code point');
      }
    }

    return bytes;
  }

  function asciiToBytes(str) {
    var byteArray = [];

    for (var i = 0; i < str.length; ++i) {
      // Node's code seems to be doing this and not & 0x7F..
      byteArray.push(str.charCodeAt(i) & 0xFF);
    }

    return byteArray;
  }

  function utf16leToBytes(str, units) {
    var c, hi, lo;
    var byteArray = [];

    for (var i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0) break;
      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }

    return byteArray;
  }

  function base64ToBytes(str) {
    return base64Js.toByteArray(base64clean(str));
  }

  function blitBuffer(src, dst, offset, length) {
    for (var i = 0; i < length; ++i) {
      if (i + offset >= dst.length || i >= src.length) break;
      dst[i + offset] = src[i];
    }

    return i;
  }

  function isnan(val) {
    return val !== val; // eslint-disable-line no-self-compare
  }
});

function dupe_array(count, value, i) {
  var c = count[i] | 0;

  if (c <= 0) {
    return [];
  }

  var result = new Array(c),
      j;

  if (i === count.length - 1) {
    for (j = 0; j < c; ++j) {
      result[j] = value;
    }
  } else {
    for (j = 0; j < c; ++j) {
      result[j] = dupe_array(count, value, i + 1);
    }
  }

  return result;
}

function dupe_number(count, value) {
  var result, i;
  result = new Array(count);

  for (i = 0; i < count; ++i) {
    result[i] = value;
  }

  return result;
}

function dupe(count, value) {
  if (typeof value === "undefined") {
    value = 0;
  }

  switch (typeof count) {
    case "number":
      if (count > 0) {
        return dupe_number(count | 0, value);
      }

      break;

    case "object":
      if (typeof count.length === "number") {
        return dupe_array(count, value, 0);
      }

      break;
  }

  return [];
}

var dup = dupe;

var pool = createCommonjsModule(function (module, exports) {

  if (!commonjsGlobal.__TYPEDARRAY_POOL) {
    commonjsGlobal.__TYPEDARRAY_POOL = {
      UINT8: dup([32, 0]),
      UINT16: dup([32, 0]),
      UINT32: dup([32, 0]),
      INT8: dup([32, 0]),
      INT16: dup([32, 0]),
      INT32: dup([32, 0]),
      FLOAT: dup([32, 0]),
      DOUBLE: dup([32, 0]),
      DATA: dup([32, 0]),
      UINT8C: dup([32, 0]),
      BUFFER: dup([32, 0])
    };
  }

  var hasUint8C = typeof Uint8ClampedArray !== 'undefined';
  var POOL = commonjsGlobal.__TYPEDARRAY_POOL; //Upgrade pool

  if (!POOL.UINT8C) {
    POOL.UINT8C = dup([32, 0]);
  }

  if (!POOL.BUFFER) {
    POOL.BUFFER = dup([32, 0]);
  } //New technique: Only allocate from ArrayBufferView and Buffer


  var DATA = POOL.DATA,
      BUFFER = POOL.BUFFER;

  exports.free = function free(array) {
    if (buffer.Buffer.isBuffer(array)) {
      BUFFER[twiddle.log2(array.length)].push(array);
    } else {
      if (Object.prototype.toString.call(array) !== '[object ArrayBuffer]') {
        array = array.buffer;
      }

      if (!array) {
        return;
      }

      var n = array.length || array.byteLength;
      var log_n = twiddle.log2(n) | 0;
      DATA[log_n].push(array);
    }
  };

  function freeArrayBuffer(buffer) {
    if (!buffer) {
      return;
    }

    var n = buffer.length || buffer.byteLength;
    var log_n = twiddle.log2(n);
    DATA[log_n].push(buffer);
  }

  function freeTypedArray(array) {
    freeArrayBuffer(array.buffer);
  }

  exports.freeUint8 = exports.freeUint16 = exports.freeUint32 = exports.freeInt8 = exports.freeInt16 = exports.freeInt32 = exports.freeFloat32 = exports.freeFloat = exports.freeFloat64 = exports.freeDouble = exports.freeUint8Clamped = exports.freeDataView = freeTypedArray;
  exports.freeArrayBuffer = freeArrayBuffer;

  exports.freeBuffer = function freeBuffer(array) {
    BUFFER[twiddle.log2(array.length)].push(array);
  };

  exports.malloc = function malloc(n, dtype) {
    if (dtype === undefined || dtype === 'arraybuffer') {
      return mallocArrayBuffer(n);
    } else {
      switch (dtype) {
        case 'uint8':
          return mallocUint8(n);

        case 'uint16':
          return mallocUint16(n);

        case 'uint32':
          return mallocUint32(n);

        case 'int8':
          return mallocInt8(n);

        case 'int16':
          return mallocInt16(n);

        case 'int32':
          return mallocInt32(n);

        case 'float':
        case 'float32':
          return mallocFloat(n);

        case 'double':
        case 'float64':
          return mallocDouble(n);

        case 'uint8_clamped':
          return mallocUint8Clamped(n);

        case 'buffer':
          return mallocBuffer(n);

        case 'data':
        case 'dataview':
          return mallocDataView(n);

        default:
          return null;
      }
    }

    return null;
  };

  function mallocArrayBuffer(n) {
    var n = twiddle.nextPow2(n);
    var log_n = twiddle.log2(n);
    var d = DATA[log_n];

    if (d.length > 0) {
      return d.pop();
    }

    return new ArrayBuffer(n);
  }

  exports.mallocArrayBuffer = mallocArrayBuffer;

  function mallocUint8(n) {
    return new Uint8Array(mallocArrayBuffer(n), 0, n);
  }

  exports.mallocUint8 = mallocUint8;

  function mallocUint16(n) {
    return new Uint16Array(mallocArrayBuffer(2 * n), 0, n);
  }

  exports.mallocUint16 = mallocUint16;

  function mallocUint32(n) {
    return new Uint32Array(mallocArrayBuffer(4 * n), 0, n);
  }

  exports.mallocUint32 = mallocUint32;

  function mallocInt8(n) {
    return new Int8Array(mallocArrayBuffer(n), 0, n);
  }

  exports.mallocInt8 = mallocInt8;

  function mallocInt16(n) {
    return new Int16Array(mallocArrayBuffer(2 * n), 0, n);
  }

  exports.mallocInt16 = mallocInt16;

  function mallocInt32(n) {
    return new Int32Array(mallocArrayBuffer(4 * n), 0, n);
  }

  exports.mallocInt32 = mallocInt32;

  function mallocFloat(n) {
    return new Float32Array(mallocArrayBuffer(4 * n), 0, n);
  }

  exports.mallocFloat32 = exports.mallocFloat = mallocFloat;

  function mallocDouble(n) {
    return new Float64Array(mallocArrayBuffer(8 * n), 0, n);
  }

  exports.mallocFloat64 = exports.mallocDouble = mallocDouble;

  function mallocUint8Clamped(n) {
    if (hasUint8C) {
      return new Uint8ClampedArray(mallocArrayBuffer(n), 0, n);
    } else {
      return mallocUint8(n);
    }
  }

  exports.mallocUint8Clamped = mallocUint8Clamped;

  function mallocDataView(n) {
    return new DataView(mallocArrayBuffer(n), 0, n);
  }

  exports.mallocDataView = mallocDataView;

  function mallocBuffer(n) {
    n = twiddle.nextPow2(n);
    var log_n = twiddle.log2(n);
    var cache = BUFFER[log_n];

    if (cache.length > 0) {
      return cache.pop();
    }

    return new buffer.Buffer(n);
  }

  exports.mallocBuffer = mallocBuffer;

  exports.clearCache = function clearCache() {
    for (var i = 0; i < 32; ++i) {
      POOL.UINT8[i].length = 0;
      POOL.UINT16[i].length = 0;
      POOL.UINT32[i].length = 0;
      POOL.INT8[i].length = 0;
      POOL.INT16[i].length = 0;
      POOL.INT32[i].length = 0;
      POOL.FLOAT[i].length = 0;
      POOL.DOUBLE[i].length = 0;
      POOL.UINT8C[i].length = 0;
      DATA[i].length = 0;
      BUFFER[i].length = 0;
    }
  };
});

function fft(dir, nrows, ncols, buffer, x_ptr, y_ptr, scratch_ptr) {
  dir |= 0;
  nrows |= 0;
  ncols |= 0;
  x_ptr |= 0;
  y_ptr |= 0;

  if (twiddle.isPow2(ncols)) {
    fftRadix2(dir, nrows, ncols, buffer, x_ptr, y_ptr);
  } else {
    fftBluestein(dir, nrows, ncols, buffer, x_ptr, y_ptr, scratch_ptr);
  }
}

var fftMatrix = fft;

function scratchMemory(n) {
  if (twiddle.isPow2(n)) {
    return 0;
  }

  return 2 * n + 4 * twiddle.nextPow2(2 * n + 1);
}

var scratchMemory_1 = scratchMemory; //Radix 2 FFT Adapted from Paul Bourke's C Implementation

function fftRadix2(dir, nrows, ncols, buffer, x_ptr, y_ptr) {
  dir |= 0;
  nrows |= 0;
  ncols |= 0;
  x_ptr |= 0;
  y_ptr |= 0;
  var nn, m, i, i1, j, k, i2, l, l1, l2;
  var c1, c2, t, t1, t2, u1, u2, row, a, b, c, d, k1, k2, k3; // Calculate the number of points

  nn = ncols;
  m = twiddle.log2(nn);

  for (row = 0; row < nrows; ++row) {
    // Do the bit reversal
    i2 = nn >> 1;
    j = 0;

    for (i = 0; i < nn - 1; i++) {
      if (i < j) {
        t = buffer[x_ptr + i];
        buffer[x_ptr + i] = buffer[x_ptr + j];
        buffer[x_ptr + j] = t;
        t = buffer[y_ptr + i];
        buffer[y_ptr + i] = buffer[y_ptr + j];
        buffer[y_ptr + j] = t;
      }

      k = i2;

      while (k <= j) {
        j -= k;
        k >>= 1;
      }

      j += k;
    } // Compute the FFT


    c1 = -1.0;
    c2 = 0.0;
    l2 = 1;

    for (l = 0; l < m; l++) {
      l1 = l2;
      l2 <<= 1;
      u1 = 1.0;
      u2 = 0.0;

      for (j = 0; j < l1; j++) {
        for (i = j; i < nn; i += l2) {
          i1 = i + l1;
          a = buffer[x_ptr + i1];
          b = buffer[y_ptr + i1];
          c = buffer[x_ptr + i];
          d = buffer[y_ptr + i];
          k1 = u1 * (a + b);
          k2 = a * (u2 - u1);
          k3 = b * (u1 + u2);
          t1 = k1 - k3;
          t2 = k1 + k2;
          buffer[x_ptr + i1] = c - t1;
          buffer[y_ptr + i1] = d - t2;
          buffer[x_ptr + i] += t1;
          buffer[y_ptr + i] += t2;
        }

        k1 = c1 * (u1 + u2);
        k2 = u1 * (c2 - c1);
        k3 = u2 * (c1 + c2);
        u1 = k1 - k3;
        u2 = k1 + k2;
      }

      c2 = Math.sqrt((1.0 - c1) / 2.0);

      if (dir < 0) {
        c2 = -c2;
      }

      c1 = Math.sqrt((1.0 + c1) / 2.0);
    } // Scaling for inverse transform


    if (dir < 0) {
      var scale_f = 1.0 / nn;

      for (i = 0; i < nn; i++) {
        buffer[x_ptr + i] *= scale_f;
        buffer[y_ptr + i] *= scale_f;
      }
    } // Advance pointers


    x_ptr += ncols;
    y_ptr += ncols;
  }
} // Use Bluestein algorithm for npot FFTs
// Scratch memory required:  2 * ncols + 4 * bits.nextPow2(2*ncols + 1)


function fftBluestein(dir, nrows, ncols, buffer, x_ptr, y_ptr, scratch_ptr) {
  dir |= 0;
  nrows |= 0;
  ncols |= 0;
  x_ptr |= 0;
  y_ptr |= 0;
  scratch_ptr |= 0; // Initialize tables

  var m = twiddle.nextPow2(2 * ncols + 1),
      cos_ptr = scratch_ptr,
      sin_ptr = cos_ptr + ncols,
      xs_ptr = sin_ptr + ncols,
      ys_ptr = xs_ptr + m,
      cft_ptr = ys_ptr + m,
      sft_ptr = cft_ptr + m,
      w = -dir * Math.PI / ncols,
      row,
      a,
      b,
      c,
      d,
      k1,
      k2,
      k3,
      i;

  for (i = 0; i < ncols; ++i) {
    a = w * (i * i % (ncols * 2));
    c = Math.cos(a);
    d = Math.sin(a);
    buffer[cft_ptr + (m - i)] = buffer[cft_ptr + i] = buffer[cos_ptr + i] = c;
    buffer[sft_ptr + (m - i)] = buffer[sft_ptr + i] = buffer[sin_ptr + i] = d;
  }

  for (i = ncols; i <= m - ncols; ++i) {
    buffer[cft_ptr + i] = 0.0;
  }

  for (i = ncols; i <= m - ncols; ++i) {
    buffer[sft_ptr + i] = 0.0;
  }

  fftRadix2(1, 1, m, buffer, cft_ptr, sft_ptr); //Compute scale factor

  if (dir < 0) {
    w = 1.0 / ncols;
  } else {
    w = 1.0;
  } //Handle direction


  for (row = 0; row < nrows; ++row) {
    // Copy row into scratch memory, multiply weights
    for (i = 0; i < ncols; ++i) {
      a = buffer[x_ptr + i];
      b = buffer[y_ptr + i];
      c = buffer[cos_ptr + i];
      d = -buffer[sin_ptr + i];
      k1 = c * (a + b);
      k2 = a * (d - c);
      k3 = b * (c + d);
      buffer[xs_ptr + i] = k1 - k3;
      buffer[ys_ptr + i] = k1 + k2;
    } //Zero out the rest


    for (i = ncols; i < m; ++i) {
      buffer[xs_ptr + i] = 0.0;
    }

    for (i = ncols; i < m; ++i) {
      buffer[ys_ptr + i] = 0.0;
    } // FFT buffer


    fftRadix2(1, 1, m, buffer, xs_ptr, ys_ptr); // Apply multiplier

    for (i = 0; i < m; ++i) {
      a = buffer[xs_ptr + i];
      b = buffer[ys_ptr + i];
      c = buffer[cft_ptr + i];
      d = buffer[sft_ptr + i];
      k1 = c * (a + b);
      k2 = a * (d - c);
      k3 = b * (c + d);
      buffer[xs_ptr + i] = k1 - k3;
      buffer[ys_ptr + i] = k1 + k2;
    } // Inverse FFT buffer


    fftRadix2(-1, 1, m, buffer, xs_ptr, ys_ptr); // Copy result back into x/y

    for (i = 0; i < ncols; ++i) {
      a = buffer[xs_ptr + i];
      b = buffer[ys_ptr + i];
      c = buffer[cos_ptr + i];
      d = -buffer[sin_ptr + i];
      k1 = c * (a + b);
      k2 = a * (d - c);
      k3 = b * (c + d);
      buffer[x_ptr + i] = w * (k1 - k3);
      buffer[y_ptr + i] = w * (k1 + k2);
    }

    x_ptr += ncols;
    y_ptr += ncols;
  }
}
fftMatrix.scratchMemory = scratchMemory_1;

function ndfft(dir, x, y) {
  var shape = x.shape,
      d = shape.length,
      size = 1,
      stride = new Array(d),
      pad = 0,
      i,
      j;

  for (i = d - 1; i >= 0; --i) {
    stride[i] = size;
    size *= shape[i];
    pad = Math.max(pad, fftMatrix.scratchMemory(shape[i]));

    if (x.shape[i] !== y.shape[i]) {
      throw new Error('Shape mismatch, real and imaginary arrays must have same size');
    }
  }

  var buf_size = 4 * size + pad;
  var buffer;

  if (x.dtype === 'array' || x.dtype === 'float64' || x.dtype === 'custom') {
    buffer = pool.mallocDouble(buf_size);
  } else {
    buffer = pool.mallocFloat(buf_size);
  }

  var x1 = ndarray(buffer, shape.slice(0), stride, 0),
      y1 = ndarray(buffer, shape.slice(0), stride.slice(0), size),
      x2 = ndarray(buffer, shape.slice(0), stride.slice(0), 2 * size),
      y2 = ndarray(buffer, shape.slice(0), stride.slice(0), 3 * size),
      tmp,
      n,
      s1,
      s2,
      scratch_ptr = 4 * size; //Copy into x1/y1

  ndarrayOps.assign(x1, x);
  ndarrayOps.assign(y1, y);

  for (i = d - 1; i >= 0; --i) {
    fftMatrix(dir, size / shape[i], shape[i], buffer, x1.offset, y1.offset, scratch_ptr);

    if (i === 0) {
      break;
    } //Compute new stride for x2/y2


    n = 1;
    s1 = x2.stride;
    s2 = y2.stride;

    for (j = i - 1; j < d; ++j) {
      s2[j] = s1[j] = n;
      n *= shape[j];
    }

    for (j = i - 2; j >= 0; --j) {
      s2[j] = s1[j] = n;
      n *= shape[j];
    } //Transpose


    ndarrayOps.assign(x2, x1);
    ndarrayOps.assign(y2, y1); //Swap buffers

    tmp = x1;
    x1 = x2;
    x2 = tmp;
    tmp = y1;
    y1 = y2;
    y2 = tmp;
  } //Copy result back into x


  ndarrayOps.assign(x, x1);
  ndarrayOps.assign(y, y1);
  pool.free(buffer);
}

var fft$1 = ndfft;

var convolve = createCommonjsModule(function (module) {

  var conjmuleq = cwiseEsprima({
    args: ['array', 'array', 'array', 'array'],
    body: function (out_r, out_i, a_r, a_i) {
    }
  });

  function conv_impl(out_r, out_i, a_r, a_i, b_r, b_i, cor, wrap) {
    if (a_r.shape.length !== b_r.shape.length || out_r.shape.length !== a_r.shape.length) {
      throw new Error('ndarray-convolve: Dimension mismatch');
    }

    var d = a_r.shape.length,
        nsize = 1,
        nstride = new Array(d),
        nshape = new Array(d),
        i;

    if (wrap) {
      for (i = d - 1; i >= 0; --i) {
        nshape[i] = a_r.shape[i];
        nstride[i] = nsize;
        nsize *= nshape[i];
      }
    } else {
      for (i = d - 1; i >= 0; --i) {
        nshape[i] = twiddle.nextPow2(a_r.shape[i] + b_r.shape[i] - 1);
        nstride[i] = nsize;
        nsize *= nshape[i];
      }
    }

    var x_t = pool.mallocDouble(nsize),
        x = ndarray(x_t, nshape, nstride, 0);
    ndarrayOps.assigns(x, 0);
    ndarrayOps.assign(x.hi.apply(x, a_r.shape), a_r);
    var y_t = pool.mallocDouble(nsize),
        y = ndarray(y_t, nshape, nstride, 0);
    ndarrayOps.assigns(y, 0);

    if (a_i) {
      ndarrayOps.assign(y.hi.apply(y, a_i.shape), a_i);
    } //FFT x/y


    fft$1(1, x, y);
    var u_t = pool.mallocDouble(nsize),
        u = ndarray(u_t, nshape, nstride, 0);
    ndarrayOps.assigns(u, 0);
    ndarrayOps.assign(u.hi.apply(u, b_r.shape), b_r);
    var v_t = pool.mallocDouble(nsize),
        v = ndarray(v_t, nshape, nstride, 0);
    ndarrayOps.assigns(v, 0);

    if (b_i) {
      ndarrayOps.assign(v.hi.apply(y, b_i.shape), b_i);
    }

    fft$1(1, u, v);

    if (cor) {
      conjmuleq(x, y, u, v);
    } else {
      cops.muleq(x, y, u, v);
    }

    fft$1(-1, x, y);
    var out_shape = new Array(d),
        out_offset = new Array(d),
        need_zero_fill = false;

    for (i = 0; i < d; ++i) {
      if (out_r.shape[i] > nshape[i]) {
        need_zero_fill = true;
      }

      if (wrap) {
        out_offset[i] = 0;
      } else {
        out_offset[i] = Math.max(0, Math.min(nshape[i] - out_r.shape[i], Math.floor(b_r.shape[i] / 2)));
      }

      out_shape[i] = Math.min(out_r.shape[i], nshape[i] - out_offset[i]);
    }

    var cropped_x, cropped_y;

    if (need_zero_fill) {
      ndarrayOps.assign(out_r, 0.0);
    }

    cropped_x = x.lo.apply(x, out_offset);
    cropped_x = cropped_x.hi.apply(cropped_x, out_shape);
    ndarrayOps.assign(out_r.hi.apply(out_r, out_shape), cropped_x);

    if (out_i) {
      if (need_zero_fill) {
        ndarrayOps.assign(out_i, 0.0);
      }

      cropped_y = y.lo.apply(y, out_offset);
      cropped_y = cropped_y.hi.apply(cropped_y, out_shape);
      ndarrayOps.assign(out_i.hi.apply(out_i, out_shape), cropped_y);
    }

    pool.freeDouble(x_t);
    pool.freeDouble(y_t);
    pool.freeDouble(u_t);
    pool.freeDouble(v_t);
  }

  module.exports = function convolve(a, b, c, d, e, f) {
    if (arguments.length === 2) {
      conv_impl(a, undefined, a, undefined, b, undefined, false, false);
    } else if (arguments.length === 3) {
      conv_impl(a, undefined, b, undefined, c, undefined, false, false);
    } else if (arguments.length === 4) {
      conv_impl(a, b, a, b, c, d, false, false);
    } else if (arguments.length === 6) {
      conv_impl(a, b, c, d, e, f, false, false);
    } else {
      throw new Error('ndarray-convolve: Invalid arguments for convolve');
    }

    return a;
  };

  module.exports.wrap = function convolve_wrap(a, b, c, d, e, f) {
    if (arguments.length === 2) {
      conv_impl(a, undefined, a, undefined, b, undefined, false, true);
    } else if (arguments.length === 3) {
      conv_impl(a, undefined, b, undefined, c, undefined, false, true);
    } else if (arguments.length === 4) {
      conv_impl(a, b, a, b, c, d, false, true);
    } else if (arguments.length === 6) {
      conv_impl(a, b, c, d, e, f, false, true);
    } else {
      throw new Error('ndarray-convolve: Invalid arguments for convolve');
    }

    return a;
  };

  module.exports.correlate = function correlate(a, b, c, d, e, f) {
    if (arguments.length === 2) {
      conv_impl(a, undefined, a, undefined, b, undefined, true, false);
    } else if (arguments.length === 3) {
      conv_impl(a, undefined, b, undefined, c, undefined, true, false);
    } else if (arguments.length === 4) {
      conv_impl(a, b, a, b, c, d, true, false);
    } else if (arguments.length === 6) {
      conv_impl(a, b, c, d, e, f, true, false);
    } else {
      throw new Error('ndarray-convolve: Invalid arguments for correlate');
    }

    return a;
  };

  module.exports.correlate.wrap = function correlate_wrap(a, b, c, d, e, f) {
    if (arguments.length === 2) {
      conv_impl(a, undefined, a, undefined, b, undefined, true, true);
    } else if (arguments.length === 3) {
      conv_impl(a, undefined, b, undefined, c, undefined, true, true);
    } else if (arguments.length === 4) {
      conv_impl(a, b, a, b, c, d, true, true);
    } else if (arguments.length === 6) {
      conv_impl(a, b, c, d, e, f, true, true);
    } else {
      throw new Error('ndarray-convolve: Invalid arguments for correlate');
    }

    return a;
  };
});

var PARTIAL_ON_DONE_BATCH_SIZE = 100;
/**
 * Factory function to create an animator
 * @param {function} render - Render funtion
 * @param {function} pubSub - PubSub messenger
 */

var createAnimator = function createAnimator(render, pubSub) {
  var activeTweeners = new Set();
  var doneTweeners = [];
  var isAnimating = false;

  var onCall = function onCall() {
    if (activeTweeners.size) {
      animateRaf();
    } else {
      onDone();
      if (isAnimating) pubSub.publish('animationEnd');
      isAnimating = false;
    }
  };

  var onDone = function onDone() {
    doneTweeners.forEach(function (tweener) {
      return tweener.onDone();
    });
    doneTweeners = [];
  };

  var onDonePartial = function onDonePartial() {
    var tobeInvoked = doneTweeners.slice(0, PARTIAL_ON_DONE_BATCH_SIZE);
    doneTweeners.splice(0, PARTIAL_ON_DONE_BATCH_SIZE);
    tobeInvoked.forEach(function (tweener) {
      return tweener.onDone();
    });
  };

  var onDonePartialDb = throttleAndDebounce(onDonePartial, 50);

  var animate = function animate() {
    isAnimating = true;
    activeTweeners.forEach(function (tweener) {
      if (tweener.update()) doneTweeners.push(tweener);
    });
    render(); // Remove tweeners that are done updating

    doneTweeners.forEach(function (tweener) {
      return activeTweeners["delete"](tweener);
    }); // Partially invoke onDone();

    onDonePartialDb();
  };

  var animateRaf = withRaf(animate, onCall);

  var add = function add(tweener) {
    activeTweeners.add(tweener);
    tweener.register();
    animateRaf();
  };

  var addBatch = function addBatch(tweeners) {
    tweeners.forEach(function (tweener) {
      activeTweeners.add(tweener);
      tweener.register();
    });
    animateRaf();
  };

  var cancel = function cancel(tweener) {
    activeTweeners["delete"](tweener);
  };

  return {
    add: add,
    addBatch: addBatch,
    cancel: cancel
  };
};

var withClone = function withClone() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (self) {
    return assign(self, {
      clone: function clone() {
        return self.constructor.apply(self, args);
      }
    });
  };
};

var cloneSprite = function cloneSprite(sprite) {
  var clonedSprite;

  if (sprite.isSprite) {
    clonedSprite = new Sprite(sprite.texture);
    clonedSprite.interactive = sprite.interactive;
    clonedSprite.x = sprite.x;
    clonedSprite.y = sprite.y;
    clonedSprite.anchor = sprite.anchor;
    clonedSprite.width = sprite.width;
    clonedSprite.height = sprite.height;
    clonedSprite.angle = sprite.angle;
  } else if (sprite instanceof Mesh) {
    clonedSprite = new Mesh(sprite.geometry, sprite.shader, sprite.state);
    clonedSprite.interactive = sprite.interactive;
    clonedSprite.x = sprite.x;
    clonedSprite.y = sprite.y;
    clonedSprite.anchor = sprite.anchor;
    clonedSprite.width = sprite.width;
    clonedSprite.height = sprite.height;
    clonedSprite.angle = sprite.angle;
  }

  return clonedSprite;
};

var colorToDecAlpha = function colorToDecAlpha(color) {
  var defaultAlpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (typeof color === 'string' || color instanceof String) {
    // HEX string, e.g., `#ff0000`
    if (color[0] === '#') return [parseInt(color.substr(1), 16), defaultAlpha]; // RGBA string, e.g., `rgba(255, 0, 0, 0.5)`

    if (color.substring(0, 3) === 'rgb') {
      var matches = color.match(/(\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?/);
      return [matches.slice(1, 4) // eslint-disable-next-line no-bitwise
      .map(function (x, i) {
        return +x << 8 * (2 - i);
      }).reduce(function (x, sum) {
        return sum + x;
      }, 0), Number.isNaN(+matches[4]) ? 1 : +matches[4]];
    } // RGB string, e.g., `rgb(255, 0, 0)`


    return [color.match(/(\d+),\s*(\d+),\s*(\d+)/).slice(1) // eslint-disable-next-line no-bitwise
    .map(function (x, i) {
      return +x << 8 * (2 - i);
    }).reduce(function (x, dec) {
      return dec + x;
    }, 0), defaultAlpha];
  } // Hexadecimal number, e.g., `0xff0000`


  return [parseInt(color, 10), defaultAlpha];
};

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

var reviver = function reviver(key, value) {
  switch (value) {
    case 'Infinity':
      return Infinity;

    case '-Infinity':
      return -Infinity;

    default:
      return value;
  }
};

var deserializeState = function deserializeState(serializedState) {
  return JSON.parse(serializedState, reviver);
};

var ifNotNull = function ifNotNull(v) {
  var alternative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return v === null ? alternative : v;
};

var isNdarray = function isNdarray(a) {
  return isObject(a) && a.data && (a.data.constructor === Float32Array || a.data.constructor === Uint8Array) && a.shape;
};

/**
 * Get the bounding box of a set of 2D positions
 * @param   {array}  positions2d  2D positions to be checked
 * @return  {array}  Quadruple of form `[xMin, yMin, xMax, yMax]` defining the
 *  bounding box
 */
var getBBox = function getBBox(positions2d) {
  var xMin = Infinity;
  var xMax = -Infinity;
  var yMin = Infinity;
  var yMax = -Infinity;

  for (var i = 0; i < positions2d.length; i += 2) {
    xMin = positions2d[i] < xMin ? positions2d[i] : xMin;
    xMax = positions2d[i] > xMax ? positions2d[i] : xMax;
    yMin = positions2d[i + 1] < yMin ? positions2d[i + 1] : yMin;
    yMax = positions2d[i + 1] > yMax ? positions2d[i + 1] : yMax;
  }

  return {
    minX: xMin,
    minY: yMin,
    maxX: xMax,
    maxY: yMax
  };
};

var getItemProp = function getItemProp(property, itemState) {
  var itemIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return isFunction(property) ? property(itemState, itemState.id, itemIndex) : property;
};

var getPileProp = function getPileProp(property, pileState) {
  return isFunction(property) ? property(pileState) : property;
};

var matchArrayPair = function matchArrayPair() {
  var oldArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var newArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  // eslint-disable-next-line no-param-reassign
  oldArray = new Set(oldArray);
  var newItems = [];
  var sameItems = newArray.filter(function (x) {
    if (oldArray.has(x)) {
      oldArray["delete"](x);
      return true;
    }

    newItems.push(x);
    return false;
  });
  var deletedItems = Array.from(oldArray);
  return [deletedItems, newItems, sameItems];
};

var createScale = function createScale() {
  var transformer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (x) {
    return x;
  };
  var domainMin = 1;
  var domainMinTransformed = Math.log10(domainMin);
  var domainMax = 10;
  var domainMaxTransformed = Math.log10(domainMax);
  var domainSize = domainMaxTransformed - domainMinTransformed;
  var rangeMin = 0;
  var rangeMax = 1;
  var rangeSize = 1;

  var scale = function scale(value) {
    return Math.min(rangeMax, Math.max(rangeMin, rangeMax - (domainMaxTransformed - transformer(value)) / domainSize * rangeSize));
  };

  scale.domain = function () {
    var newDomain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    if (newDomain.length === 0) return [domainMin, domainMax];

    var _newDomain = slicedToArray(newDomain, 2),
        newDomainMin = _newDomain[0],
        newDomainMax = _newDomain[1];

    domainMin = newDomainMin;
    domainMinTransformed = transformer(newDomainMin);
    domainMax = newDomainMax;
    domainMaxTransformed = transformer(newDomainMax);
    domainSize = domainMaxTransformed - domainMinTransformed || 1;
    return scale;
  };

  scale.range = function () {
    var newRange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    if (newRange.length === 0) return [rangeMin, rangeMax];

    var _newRange = slicedToArray(newRange, 2),
        newRangeMin = _newRange[0],
        newRangeMax = _newRange[1];

    rangeMin = newRangeMin;
    rangeMax = newRangeMax;
    rangeSize = rangeMax - rangeMin;
    return scale;
  };

  return scale;
};

var ALIGNMENTS_X = ['left', 'center', 'right'];
var ALIGNMENTS_Y = ['top', 'center', 'bottom'];
var EPS = 1e-9;
var BLACK = 0x000000;
var WHITE = 0xffffff; // prettier-ignore

var CAMERA_VIEW = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
var CSS_EASING_CUBIC_IN_OUT = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
var DEFAULT_DARK_MODE = false;
var EVENT_LISTENER_ACTIVE = {
  passive: false
};
var EVENT_LISTENER_PASSIVE = {
  passive: true
};
var INHERIT = 'inherit';
var INITIAL_ARRANGEMENT_TYPE = 'index';
var INITIAL_ARRANGEMENT_OBJECTIVE = {
  property: function property(pileState, i) {
    return i;
  },
  isCustom: true
};
var DEFAULT_POPUP_BACKGROUND_OPACITY = 0.85;
var DEFAULT_LASSO_FILL_OPACITY = 0.15;
var DEFAULT_LASSO_SHOW_START_INDICATOR = true;
var DEFAULT_LASSO_START_INDICATOR_OPACITY = 0.1;
var DEFAULT_LASSO_STROKE_OPACITY = 0.8;
var DEFAULT_LASSO_STROKE_SIZE = 1;
var LASSO_MIN_DIST = 2;
var LASSO_MIN_DELAY = 10;
var LASSO_SHOW_START_INDICATOR_TIME = 2500;
var LASSO_HIDE_START_INDICATOR_TIME = 250;
var NAVIGATION_MODE_AUTO = 'auto';
var NAVIGATION_MODE_PAN_ZOOM = 'panZoom';
var NAVIGATION_MODE_SCROLL = 'scroll';
var NAVIGATION_MODES = [NAVIGATION_MODE_AUTO, NAVIGATION_MODE_PAN_ZOOM, NAVIGATION_MODE_SCROLL];
var DEFAULT_PILE_COVER_SCALE = 1.0;
var DEFAULT_PILE_ITEM_BRIGHTNESS = 0;
var DEFAULT_PILE_ITEM_TINT = 0xffffff;
var DEFAULT_PILE_SIZE_BADGE_ALIGN = ['top', 'right'];
var DEFAULT_PREVIEW_BACKGROUND_COLOR = INHERIT;
var DEFAULT_PREVIEW_BACKGROUND_OPACITY = INHERIT;
var DEFAULT_COLOR_MAP = ['#E69F00', // orange
'#56B4E9', // sky blue
'#009E73', // bluish green
'#F0E442', // yellow
'#0072B2', // blue
'#D55E00', // vermillion
'#CC79A7' // reddish purple
];
var UNKNOWN_LABEL = {
  color: '#808080'
};
var POSITION_PILES_DEBOUNCE_TIME = 100;

var toAlignment = function toAlignment(alignment) {
  var validAlignment = ['top', 'left'];
  var xAlign = isArray(alignment) ? alignment[1] : alignment;
  var yAlign = isArray(alignment) ? alignment[0] : alignment;

  if (ALIGNMENTS_Y.indexOf(yAlign) >= 0) {
    validAlignment[0] = yAlign;
  }

  if (ALIGNMENTS_X.indexOf(xAlign) >= 0) {
    validAlignment[1] = xAlign;
  }

  return validAlignment;
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

/**
 * Convert a 2D vector to it's homoegeneous 3D counterpart
 * @param   {number}  x  X coordinate
 * @param   {number}  y  Y coordinate
 * @return  {array}  Quadruple representing the homogeneous vector
 */
var toHomogeneous = function toHomogeneous(x, y) {
  return [x, y, 0, 1];
};

var replacer = function replacer(key, value) {
  switch (value) {
    case Infinity:
      return 'Infinity';

    case -Infinity:
      return '-Infinity';

    default:
      return value;
  }
};

var serializeState = function serializeState(state) {
  return JSON.stringify(state, replacer);
};

var uniqueStr = function uniqueStr(v) {
  return unique(v).join('-');
};

var whichTransitionEvent = function whichTransitionEvent() {
  var el = document.createElement('fake-element');
  var transitions = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    MSTransition: 'msTransitionEnd',
    OTransition: 'oTransitionEnd',
    transition: 'transitionEnd'
  }; // eslint-disable-next-line

  for (var t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }

  return 'transitionEnd';
};

var zoomToScale = function zoomToScale(zoom) {
  return Math.pow(2, zoom);
};

var BRIGHTEN_FS = "\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\nuniform sampler2D uSamplers[%count%];\n\nvoid main(void){\n    vec4 color;\n    %forloop%\n    gl_FragColor = vec4(color.rgb + (1.0 - color.rgb) * vColor.rgb * color.w, color.w);\n}\n";
var BrightenTintBatchRenderer = BatchPluginFactory.create({
  fragment: BRIGHTEN_FS
});
Renderer.registerPlugin('brighten-tint', BrightenTintBatchRenderer);
var INVERT_FS = "\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\nuniform sampler2D uSamplers[%count%];\n\nvoid main(void){\n    vec4 color;\n    %forloop%\n    gl_FragColor = vColor * vec4(color.a - color.rgb, color.a);\n}\n";
var InvertBatchRenderer = BatchPluginFactory.create({
  fragment: INVERT_FS
});
Renderer.registerPlugin('invert', InvertBatchRenderer);

var withColorFilters = function withColorFilters(sprite) {
  return function (self) {
    var _brightness = 0;
    return assign(self, {
      brightness: function brightness(value) {
        _brightness = value;

        if (value === 0) {
          sprite.tint = 0xffffff;
          sprite.pluginName = 'batch';
        } else {
          // eslint-disable-next-line no-param-reassign
          var rgbValue = parseInt((value < 0 ? 1 + value : value) * 255, 10);
          sprite.tint = sum(new Array(3).fill() // eslint-disable-next-line no-bitwise
          .map(function (x, i) {
            return rgbValue << 8 * (2 - i);
          }));
          sprite.pluginName = value < 0 ? 'batch' : 'brighten-tint';
        }
      },
      invert: function invert(value) {
        sprite.pluginName = value ? 'invert' : 'batch';
      },
      tint: function tint(value) {
        // If brightness and tint are assigned, brightness is preferred
        if (+_brightness !== 0) return;
        var color = typeof value === 'undefined' || value === null ? 0xffffff // This will unset the tint
        : colorToDecAlpha(value, null)[0];
        sprite.tint = color;
      }
    });
  };
};

var withDestroy = function withDestroy(displayObject) {
  return function (self) {
    return assign(self, {
      destroy: function destroy() {
        displayObject.destroy({
          baseTexture: true,
          children: true,
          texture: true
        });
      }
    });
  };
};

var withScale = function withScale(sprite, width, height) {
  return function (self) {
    return assign(self, {
      scale: function scale(scaleFactor) {
        self.scaleFactor = scaleFactor;
        self.scaleX(scaleFactor);
        self.scaleY(scaleFactor);
      },
      scaleX: function scaleX(scaleXFactor) {
        self.scaleXFactor = scaleXFactor;
        sprite.width = width * scaleXFactor;
      },
      scaleY: function scaleY(scaleYFactor) {
        self.scaleYFactor = scaleYFactor;
        sprite.height = height * scaleYFactor;
      }
    });
  };
};

var withSize = function withSize(sprite, width, height) {
  return function (self) {
    return assign(self, {
      get aspectRatio() {
        return sprite.width / sprite.height;
      },

      get height() {
        return sprite.height;
      },

      get center() {
        return [sprite.width / 2, sprite.height / 2];
      },

      get originalHeight() {
        return height;
      },

      get size() {
        return Math.max(sprite.width, sprite.height);
      },

      get width() {
        return sprite.width;
      },

      get originalWidth() {
        return width;
      }

    });
  };
};

var createImage = function createImage(source) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$anchor = _ref.anchor,
      anchor = _ref$anchor === void 0 ? [0.5, 0.5] : _ref$anchor;

  var displayObject = toDisplayObject(source);
  var sprite;

  if (displayObject instanceof Texture) {
    var _sprite$anchor;

    sprite = new Sprite(displayObject);

    (_sprite$anchor = sprite.anchor).set.apply(_sprite$anchor, toConsumableArray(anchor));
  } else {
    sprite = displayObject;
  }

  return pipe(withConstructor(createImage), withStaticProperty('displayObject', sprite), withStaticProperty('sprite', sprite), withClone(displayObject, {
    anchor: anchor
  }), withColorFilters(sprite), withScale(sprite, displayObject.width, displayObject.height), withSize(sprite, displayObject.width, displayObject.height), withDestroy(sprite))({});
};

var createBadge = function createBadge(text) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      backgroundFactory = _ref.backgroundFactory,
      _ref$fontSize = _ref.fontSize,
      fontSize = _ref$fontSize === void 0 ? 8 : _ref$fontSize,
      _ref$darkMode = _ref.darkMode,
      darkMode = _ref$darkMode === void 0 ? false : _ref$darkMode,
      _ref$onDestroy = _ref.onDestroy,
      onDestroy = _ref$onDestroy === void 0 ? toVoid : _ref$onDestroy;

  var container = new Container();
  var texture = text;

  if (!(text instanceof Texture)) {
    var pixiText = new Text(text, {
      fontFamily: 'sans-serif',
      fontSize: fontSize * window.devicePixelRatio,
      fill: 0xffffff,
      align: 'center'
    });
    pixiText.updateText();
    texture = pixiText.texture;
  }

  var image = createImage(texture);
  var background;

  if (backgroundFactory) {
    background = backgroundFactory.create();
    container.addChild(background);
  }

  container.addChild(image.displayObject);
  image.displayObject.width /= window.devicePixelRatio;
  image.displayObject.height /= window.devicePixelRatio;
  var destroyed = false;

  var withDestroy = function withDestroy() {
    return function (self) {
      return assign(self, {
        destroy: function destroy() {
          if (destroyed) return;
          destroyed = true;
          onDestroy();
        }
      });
    };
  };

  var setDarkMode = function setDarkMode(newDarkMode) {
    image.invert(newDarkMode);
    backgroundFactory.setColor(newDarkMode ? [1, 1, 1, 1] : [0, 0, 0, 1]);
  };

  setDarkMode(darkMode);
  return pipe(withConstructor(createBadge), withStaticProperty('displayObject', container), withStaticProperty('background', background), withStaticProperty('image', image), withClone(texture, {
    backgroundFactory: backgroundFactory,
    fontSize: fontSize,
    darkMode: darkMode,
    onDestroy: onDestroy
  }), withDestroy())({
    setDarkMode: setDarkMode
  });
};

var COLOR = [0.0, 0.0, 0.0, 1.0];
var ROUNDING = 0.5;
var RECT_POS = [0, 0];
var RECT_SIZE = [0.5, 0.5];
var VERTEX_POS = [-1, -1, 1, -1, 1, 1, -1, 1];
var INDEX = [0, 1, 2, 0, 3, 2];
var VS = "precision mediump float;\n// From PIXI\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\n\nattribute vec2 aVertexPosition;\n\nvarying vec2 vTexPos;\n\nvoid main() {\n  gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n  vTexPos = aVertexPosition;\n}\n";
var FS = "precision mediump float;\nfloat udRoundBox(vec2 p, vec2 b, float r) {\n  return length(max(abs(p) - b, 0.0)) - r;\n}\n\nuniform vec2 uRectPos;\nuniform vec2 uRectSize;\nuniform vec4 uColor;\nuniform float uRounding;\nuniform float uSize;\n\nvarying vec2 vTexPos;\n\nvoid main() {\n  float texel = 1.0 / uSize;\n  float dist = udRoundBox(vTexPos - uRectPos, uRectSize, uRounding);\n\n  gl_FragColor = vec4(uColor.rgb, uColor.a * max(0.0, 1.0 - (dist * uSize * 2.0)));\n}";
var GEOMETRY = new Geometry();
GEOMETRY.addAttribute('aVertexPosition', VERTEX_POS, 2);
GEOMETRY.addIndex(INDEX);
var STATE = new State();

var createRoundedRectangleFactory = function createRoundedRectangleFactory() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? COLOR : _ref$color,
      _ref$rounding = _ref.rounding,
      rounding = _ref$rounding === void 0 ? ROUNDING : _ref$rounding,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 1 : _ref$size;

  var uniforms = {
    uColor: color,
    uRounding: rounding,
    uRectPos: RECT_POS,
    uRectSize: RECT_SIZE,
    uSize: size
  };
  var uniformGroup = new UniformGroup(uniforms);
  var shader = Shader.from(VS, FS, uniformGroup);

  var create = function create() {
    var mesh = new Mesh(GEOMETRY, shader, STATE);
    mesh.width = uniforms.uSize / window.devicePixelRatio;
    mesh.height = uniforms.uSize / window.devicePixelRatio;
    return mesh;
  };

  var mesh = create();

  var setColor = function setColor(newColor) {
    uniforms.uColor = newColor;
  };

  var destroy = function destroy() {
    mesh.destroy();
    uniforms = {};
  };

  var setSize = function setSize(newSize) {
    uniforms.uSize = newSize * window.devicePixelRatio;
  };

  return pipe(withConstructor(createRoundedRectangleFactory))({
    create: create,
    destroy: destroy,
    setColor: setColor,
    setSize: setSize
  });
};

var createBadgeFactory = function createBadgeFactory() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$fontSize = _ref.fontSize,
      fontSize = _ref$fontSize === void 0 ? 8 : _ref$fontSize;

  var sizeTexCache = new Map();
  var sizeUsage = {};
  var roundedRectangleFactory = createRoundedRectangleFactory({
    size: fontSize * window.devicePixelRatio * 1.5
  });

  var onDestroy = function onDestroy(text) {
    return function () {
      sizeUsage[text] = Math.max(0, sizeUsage[text] - 1);

      if (sizeUsage[text] === 0) {
        sizeTexCache.get(text).image.destroy();
        sizeTexCache["delete"](text);
        delete sizeUsage[text];
      }
    };
  };

  var create = function create(text) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        darkMode = _ref2.darkMode;

    if (sizeTexCache.has(text)) {
      ++sizeUsage[text];
      return sizeTexCache.get(text).clone();
    }

    var badge = createBadge(text, {
      backgroundFactory: roundedRectangleFactory,
      darkMode: darkMode,
      fontSize: fontSize,
      onDestroy: onDestroy(text)
    });
    sizeUsage[text] = 1;
    sizeTexCache.set(text, badge);
    return badge;
  };

  var clear = function clear() {
    sizeTexCache.forEach(function (badge) {
      return badge.destroy();
    });
    sizeTexCache.clear();
    sizeUsage = {};
  };

  return {
    clear: clear,
    create: create,
    destroy: clear
  };
};

var createStylesheet = function createStylesheet() {
  var styleEl = document.createElement('style');
  document.head.appendChild(styleEl);
  var stylesheets = styleEl.sheet;

  var addRule = function addRule(rule) {
    var currentNumRules = stylesheets.length;
    stylesheets.insertRule(rule, currentNumRules);
    return currentNumRules;
  };

  var removeRule = function removeRule(index) {
    stylesheets.deleteRule(index);
  };

  var destroy = function destroy() {
    document.head.removeChild(styleEl);
  };

  return {
    addRule: addRule,
    destroy: destroy,
    removeRule: removeRule
  };
};

var CSS_PREFIX = "pilingjs-breadcrumbs-button";
var CSS_BTN_RIGHT_ARROW = [".".concat(CSS_PREFIX, " {\n  position: relative;\n  display: flex;\n  align-items: center;\n  line-height: 1em;\n  height: 2em;\n  margin-right: -0.25em;\n  padding: 0 0.5em 0 1em;\n  border-radius: 0 0.25em 0.25em 0;\n  text-color: black;\n  box-shadow: inset 0 0 0 1px #ccc;\n  background: white;\n}"), ".pilingjs-darkmode .".concat(CSS_PREFIX, " {\n  text-color: white;\n  box-shadow: inset 0 0 0 1px #333;\n  background: black;\n}"), "li:first-child .".concat(CSS_PREFIX, " {\n  padding: 0.5em;\n  border-radius: 0.25em;\n}"), ".".concat(CSS_PREFIX, ":focus {\n  outline: none;\n}"), ".".concat(CSS_PREFIX, ".").concat(CSS_PREFIX, "-right-arrow {\n  position: relative;\n  display: block;\n  border-radius: 0;\n  border-left-color: #ccc;\n  background: #ccc;\n}"), ".pilingjs-darkmode .".concat(CSS_PREFIX, ".").concat(CSS_PREFIX, "-right-arrow {\n  border-left-color: #333;\n  background: #333;\n}"), ".".concat(CSS_PREFIX, ".").concat(CSS_PREFIX, "-right-arrow:hover, .pilingjs-darkmode .").concat(CSS_PREFIX, ".").concat(CSS_PREFIX, "-right-arrow:hover {\n  color: black;\n  border-left-color: #ff7ff6;\n  box-shadow: inset 0 0 0 1px #ff7ff6;\n  background: #ff7ff6;\n}"), ".".concat(CSS_PREFIX, ".").concat(CSS_PREFIX, "-right-arrow:after {\n  left: 100%;\n  top: 50%;\n  border: solid transparent;\n  content: '';\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none;\n  border-color: rgba(0, 0, 0, 0);\n  border-left-color: inherit;\n  border-width: 0.5em;\n  margin-top: -0.5em;\n}")];

var createLevels = function createLevels(_ref) {
  var element = _ref.element,
      store = _ref.store;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$darkMode = _ref2.darkMode,
      _ref2$maxDepth = _ref2.maxDepth,
      initialMaxDepth = _ref2$maxDepth === void 0 ? 2 : _ref2$maxDepth,
      _ref2$onEnter = _ref2.onEnter,
      onEnter = _ref2$onEnter === void 0 ? toVoid : _ref2$onEnter,
      _ref2$onLeave = _ref2.onLeave,
      onLeave = _ref2$onLeave === void 0 ? toVoid : _ref2$onLeave;

  var currSourcePileIds = [];
  var maxDepth = initialMaxDepth;
  var breadcrumbsEl = document.createElement('nav');
  breadcrumbsEl.className = 'pilingjs-breadcrumbs';
  breadcrumbsEl.style.position = 'absolute';
  breadcrumbsEl.style.top = 0;
  breadcrumbsEl.style.left = 0;
  var breadcrumbsListEl = document.createElement('ol');
  breadcrumbsListEl.className = 'pilingjs-breadcrumbs-list';
  breadcrumbsListEl.style.display = 'flex';
  breadcrumbsListEl.style.margin = 0;
  breadcrumbsListEl.style.padding = 0;
  breadcrumbsListEl.style.listStyle = 'none';
  breadcrumbsEl.appendChild(breadcrumbsListEl);
  var stylesheet = createStylesheet();
  CSS_BTN_RIGHT_ARROW.forEach(stylesheet.addRule);
  var prevStates = [];
  var prevSizes = [];
  var currStateIds = [];

  var styleNavButtons = function styleNavButtons() {
    forEach$2(function (button, index, array) {
      if (index + 1 === array.length) {
        button.style.zIndex = 1;
        button.className = "".concat(CSS_PREFIX);
      } else {
        button.style.zIndex = array.length - index;
        button.className = "".concat(CSS_PREFIX, " ").concat(CSS_PREFIX, "-right-arrow");
      }
    })(breadcrumbsListEl.querySelectorAll('button'));
  };

  var getCurrentStateId = function getCurrentStateId() {
    return currStateIds[currStateIds.length - 1];
  };

  var getStateId = function getStateId(pileIds) {
    var piles = store.state.piles;
    return pileIds.flatMap(function (pileId) {
      return piles[pileId].items;
    }).sort().join('-');
  };

  var getNextState = function getNextState(pileIds) {
    var currentState = store["export"]();
    var pileIdIndex = new Set();
    pileIds.forEach(function (pileId) {
      currentState.piles[pileId].items.forEach(function (itemId) {
        return pileIdIndex.add(itemId);
      });
    }); // "Empty" not selected piles, i.e., set their items to `[]`

    Object.keys(currentState.piles).filter(function (pileId) {
      return !pileIdIndex.has(pileId);
    }).forEach(function (pileId) {
      currentState.piles[pileId].items = [];
    });
    return currentState;
  };

  var countItems = function countItems(state) {
    return Object.values(state.piles).filter(function (pile) {
      return pile.items.length;
    }).reduce(function (num, pile) {
      return num + pile.items.length;
    }, 0);
  };

  var createBreadcrumbTemplate = function createBreadcrumbTemplate(state, level) {
    var label = level === 0 ? 'Root' : "".concat(level, ". Level");
    var size = countItems(state);
    return "<li><button><span><strong>".concat(label, "</strong> (").concat(size, ")</span></button></li>");
  };

  var backTo = function backTo(level) {
    return function () {
      if (level === 0) {
        leaveAll();
        return;
      }

      var currNumPrevStates = prevStates.length;

      while (prevStates.length > level + 1) {
        removeLastChild(breadcrumbsListEl);
        currStateIds.pop();
        prevStates.pop();
      }

      if (currNumPrevStates > level) {
        leave();
      }
    };
  };

  var addBreadcrumb = function addBreadcrumb(state, level) {
    var htmlTemplate = createBreadcrumbTemplate(state, level);
    var listItemEl = createHtmlByTemplate(htmlTemplate);
    listItemEl.querySelector('button').addEventListener('click', backTo(level));
    breadcrumbsListEl.appendChild(listItemEl);
    styleNavButtons();
  };

  var enter = function enter(pileIds) {
    var nextStateId = getStateId(pileIds);
    var currStateId = getCurrentStateId();
    currSourcePileIds = pileIds;

    if (prevStates.length >= maxDepth) {
      console.warn("Not allowed! You reached the maximum depth (".concat(maxDepth, ")"));
      return;
    }

    if (nextStateId === currStateId) {
      console.warn("Not allowed! You're already on this level.");
      return;
    }

    var currentState = store["export"]();
    prevStates = [].concat(toConsumableArray(prevStates), [currentState]);

    var _element$getBoundingC = element.getBoundingClientRect(),
        width = _element$getBoundingC.width,
        height = _element$getBoundingC.height;

    prevSizes = [].concat(toConsumableArray(prevSizes), [{
      width: width,
      height: height
    }]);
    if (prevStates.length === 1) addBreadcrumb(currentState, 0);
    var nextState = getNextState(pileIds);
    store["import"](nextState);
    currStateIds = [].concat(toConsumableArray(currStateIds), [nextStateId]);
    addBreadcrumb(nextState, prevStates.length);
    onEnter();
  };

  var leave = function leave() {
    if (!prevStates.length) {
      console.warn("Not allowed! You're already on the root level.");
      return;
    }

    if (prevStates.length === 1) {
      leaveAll();
      return;
    }

    removeLastChild(breadcrumbsListEl);
    styleNavButtons();
    currStateIds.pop();
    var prevState = prevStates.pop();
    store["import"](prevState);
    var prevSize = prevSizes.pop();
    onLeave(prevSize);
  };

  var leaveAll = function leaveAll() {
    if (!prevStates.length) {
      console.warn("Not allowed! You're already on the root level.");
      return;
    }

    removeAllChildren(breadcrumbsListEl);
    store["import"](prevStates[0]);
    onLeave(prevSizes[0]);
    currStateIds = [];
    prevStates = [];
    prevSizes = [];
  };

  var set = function set() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$darkMode = _ref3.darkMode,
        _ref3$maxDepth = _ref3.maxDepth,
        newMaxDepth = _ref3$maxDepth === void 0 ? null : _ref3$maxDepth;
    maxDepth = ifNotNull(newMaxDepth, maxDepth);
    styleNavButtons();
  };

  var destroy = function destroy() {
    stylesheet.destroy();
  };

  styleNavButtons();
  return pipe(withStaticProperty('nav', breadcrumbsEl), withReadOnlyProperty('currSourcePileIds', function () {
    return currSourcePileIds;
  }), withReadOnlyProperty('prevStates', function () {
    return prevStates;
  }), withReadOnlyProperty('stateIds', function () {
    return currStateIds;
  }), withReadOnlyProperty('size', function () {
    return prevStates.length;
  }), withConstructor(createLevels))({
    destroy: destroy,
    enter: enter,
    leave: leave,
    leaveAll: leaveAll,
    set: set
  });
};

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

var toStr = Object.prototype.toString;

var isArguments = function isArguments(value) {
  var str = toStr.call(value);
  var isArgs = str === '[object Arguments]';

  if (!isArgs) {
    isArgs = str !== '[object Array]' && value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr.call(value.callee) === '[object Function]';
  }

  return isArgs;
};

var keysShim;

if (!Object.keys) {
  // modified from https://github.com/es-shims/es5-shim
  var has = Object.prototype.hasOwnProperty;
  var toStr$1 = Object.prototype.toString;
  var isArgs = isArguments; // eslint-disable-line global-require

  var isEnumerable = Object.prototype.propertyIsEnumerable;
  var hasDontEnumBug = !isEnumerable.call({
    toString: null
  }, 'toString');
  var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
  var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];

  var equalsConstructorPrototype = function (o) {
    var ctor = o.constructor;
    return ctor && ctor.prototype === o;
  };

  var excludedKeys = {
    $applicationCache: true,
    $console: true,
    $external: true,
    $frame: true,
    $frameElement: true,
    $frames: true,
    $innerHeight: true,
    $innerWidth: true,
    $onmozfullscreenchange: true,
    $onmozfullscreenerror: true,
    $outerHeight: true,
    $outerWidth: true,
    $pageXOffset: true,
    $pageYOffset: true,
    $parent: true,
    $scrollLeft: true,
    $scrollTop: true,
    $scrollX: true,
    $scrollY: true,
    $self: true,
    $webkitIndexedDB: true,
    $webkitStorageInfo: true,
    $window: true
  };

  var hasAutomationEqualityBug = function () {
    /* global window */
    if (typeof window === 'undefined') {
      return false;
    }

    for (var k in window) {
      try {
        if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
          try {
            equalsConstructorPrototype(window[k]);
          } catch (e) {
            return true;
          }
        }
      } catch (e) {
        return true;
      }
    }

    return false;
  }();

  var equalsConstructorPrototypeIfNotBuggy = function (o) {
    /* global window */
    if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
      return equalsConstructorPrototype(o);
    }

    try {
      return equalsConstructorPrototype(o);
    } catch (e) {
      return false;
    }
  };

  keysShim = function keys(object) {
    var isObject = object !== null && typeof object === 'object';
    var isFunction = toStr$1.call(object) === '[object Function]';
    var isArguments = isArgs(object);
    var isString = isObject && toStr$1.call(object) === '[object String]';
    var theKeys = [];

    if (!isObject && !isFunction && !isArguments) {
      throw new TypeError('Object.keys called on a non-object');
    }

    var skipProto = hasProtoEnumBug && isFunction;

    if (isString && object.length > 0 && !has.call(object, 0)) {
      for (var i = 0; i < object.length; ++i) {
        theKeys.push(String(i));
      }
    }

    if (isArguments && object.length > 0) {
      for (var j = 0; j < object.length; ++j) {
        theKeys.push(String(j));
      }
    } else {
      for (var name in object) {
        if (!(skipProto && name === 'prototype') && has.call(object, name)) {
          theKeys.push(String(name));
        }
      }
    }

    if (hasDontEnumBug) {
      var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

      for (var k = 0; k < dontEnums.length; ++k) {
        if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
          theKeys.push(dontEnums[k]);
        }
      }
    }

    return theKeys;
  };
}

var implementation = keysShim;

var slice = Array.prototype.slice;
var origKeys = Object.keys;
var keysShim$1 = origKeys ? function keys(o) {
  return origKeys(o);
} : implementation;
var originalKeys = Object.keys;

keysShim$1.shim = function shimObjectKeys() {
  if (Object.keys) {
    var keysWorksWithArguments = function () {
      // Safari 5.0 bug
      var args = Object.keys(arguments);
      return args && args.length === arguments.length;
    }(1, 2);

    if (!keysWorksWithArguments) {
      Object.keys = function keys(object) {
        // eslint-disable-line func-name-matching
        if (isArguments(object)) {
          return originalKeys(slice.call(object));
        }

        return originalKeys(object);
      };
    }
  } else {
    Object.keys = keysShim$1;
  }

  return Object.keys || keysShim$1;
};

var objectKeys = keysShim$1;

var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
var toStr$2 = Object.prototype.toString;

var isStandardArguments = function isArguments(value) {
  if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
    return false;
  }

  return toStr$2.call(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
  if (isStandardArguments(value)) {
    return true;
  }

  return value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr$2.call(value) !== '[object Array]' && toStr$2.call(value.callee) === '[object Function]';
};

var supportsStandardArguments = function () {
  return isStandardArguments(arguments);
}();

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

var isArguments$1 = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

/* https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.is */

var NumberIsNaN = function (value) {
  return value !== value;
};

var objectIs = function is(a, b) {
  if (a === 0 && b === 0) {
    return 1 / a === 1 / b;
  } else if (a === b) {
    return true;
  } else if (NumberIsNaN(a) && NumberIsNaN(b)) {
    return true;
  }

  return false;
};

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice$1 = Array.prototype.slice;
var toStr$3 = Object.prototype.toString;
var funcType = '[object Function]';

var implementation$1 = function bind(that) {
  var target = this;

  if (typeof target !== 'function' || toStr$3.call(target) !== funcType) {
    throw new TypeError(ERROR_MESSAGE + target);
  }

  var args = slice$1.call(arguments, 1);
  var bound;

  var binder = function () {
    if (this instanceof bound) {
      var result = target.apply(this, args.concat(slice$1.call(arguments)));

      if (Object(result) === result) {
        return result;
      }

      return this;
    } else {
      return target.apply(that, args.concat(slice$1.call(arguments)));
    }
  };

  var boundLength = Math.max(0, target.length - args.length);
  var boundArgs = [];

  for (var i = 0; i < boundLength; i++) {
    boundArgs.push('$' + i);
  }

  bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

  if (target.prototype) {
    var Empty = function Empty() {};

    Empty.prototype = target.prototype;
    bound.prototype = new Empty();
    Empty.prototype = null;
  }

  return bound;
};

var functionBind = Function.prototype.bind || implementation$1;

var src = functionBind.call(Function.call, Object.prototype.hasOwnProperty);

var regexExec = RegExp.prototype.exec;
var gOPD = Object.getOwnPropertyDescriptor;

var tryRegexExecCall = function tryRegexExec(value) {
  try {
    var lastIndex = value.lastIndex;
    value.lastIndex = 0;
    regexExec.call(value);
    return true;
  } catch (e) {
    return false;
  } finally {
    value.lastIndex = lastIndex;
  }
};

var toStr$4 = Object.prototype.toString;
var regexClass = '[object RegExp]';
var hasToStringTag$1 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var isRegex = function isRegex(value) {
  if (!value || typeof value !== 'object') {
    return false;
  }

  if (!hasToStringTag$1) {
    return toStr$4.call(value) === regexClass;
  }

  var descriptor = gOPD(value, 'lastIndex');
  var hasLastIndexDataProperty = descriptor && src(descriptor, 'value');

  if (!hasLastIndexDataProperty) {
    return false;
  }

  return tryRegexExecCall(value);
};

var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';
var toStr$5 = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction$1 = function (fn) {
  return typeof fn === 'function' && toStr$5.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
  var obj = {};

  try {
    origDefineProperty(obj, 'x', {
      enumerable: false,
      value: obj
    }); // eslint-disable-next-line no-unused-vars, no-restricted-syntax

    for (var _ in obj) {
      // jscs:ignore disallowUnusedVariables
      return false;
    }

    return obj.x === obj;
  } catch (e) {
    /* this is IE 8. */
    return false;
  }
};

var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty$1 = function (object, name, value, predicate) {
  if (name in object && (!isFunction$1(predicate) || !predicate())) {
    return;
  }

  if (supportsDescriptors) {
    origDefineProperty(object, name, {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    });
  } else {
    object[name] = value;
  }
};

var defineProperties = function (object, map) {
  var predicates = arguments.length > 2 ? arguments[2] : {};
  var props = objectKeys(map);

  if (hasSymbols) {
    props = concat.call(props, Object.getOwnPropertySymbols(map));
  }

  for (var i = 0; i < props.length; i += 1) {
    defineProperty$1(object, props[i], map[props[i]], predicates[props[i]]);
  }
};

defineProperties.supportsDescriptors = !!supportsDescriptors;
var defineProperties_1 = defineProperties;

var toObject = Object;
var TypeErr = TypeError;

var implementation$2 = function flags() {
  if (this != null && this !== toObject(this)) {
    throw new TypeErr('RegExp.prototype.flags getter called on non-object');
  }

  var result = '';

  if (this.global) {
    result += 'g';
  }

  if (this.ignoreCase) {
    result += 'i';
  }

  if (this.multiline) {
    result += 'm';
  }

  if (this.dotAll) {
    result += 's';
  }

  if (this.unicode) {
    result += 'u';
  }

  if (this.sticky) {
    result += 'y';
  }

  return result;
};

var supportsDescriptors$1 = defineProperties_1.supportsDescriptors;
var gOPD$1 = Object.getOwnPropertyDescriptor;
var TypeErr$1 = TypeError;

var polyfill = function getPolyfill() {
  if (!supportsDescriptors$1) {
    throw new TypeErr$1('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
  }

  if (/a/mig.flags === 'gim') {
    var descriptor = gOPD$1(RegExp.prototype, 'flags');

    if (descriptor && typeof descriptor.get === 'function' && typeof /a/.dotAll === 'boolean') {
      return descriptor.get;
    }
  }

  return implementation$2;
};

var supportsDescriptors$2 = defineProperties_1.supportsDescriptors;
var gOPD$2 = Object.getOwnPropertyDescriptor;
var defineProperty$2 = Object.defineProperty;
var TypeErr$2 = TypeError;
var getProto = Object.getPrototypeOf;
var regex = /a/;

var shim = function shimFlags() {
  if (!supportsDescriptors$2 || !getProto) {
    throw new TypeErr$2('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
  }

  var polyfill$1 = polyfill();
  var proto = getProto(regex);
  var descriptor = gOPD$2(proto, 'flags');

  if (!descriptor || descriptor.get !== polyfill$1) {
    defineProperty$2(proto, 'flags', {
      configurable: true,
      enumerable: false,
      get: polyfill$1
    });
  }

  return polyfill$1;
};

var flagsBound = Function.call.bind(implementation$2);
defineProperties_1(flagsBound, {
  getPolyfill: polyfill,
  implementation: implementation$2,
  shim: shim
});
var regexp_prototype_flags = flagsBound;

var getDay = Date.prototype.getDay;

var tryDateObject = function tryDateObject(value) {
  try {
    getDay.call(value);
    return true;
  } catch (e) {
    return false;
  }
};

var toStr$6 = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag$2 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var isDateObject = function isDateObject(value) {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return hasToStringTag$2 ? tryDateObject(value) : toStr$6.call(value) === dateClass;
};

var getTime = Date.prototype.getTime;

function deepEqual(actual, expected, options) {
  var opts = options || {}; // 7.1. All identical values are equivalent, as determined by ===.

  if (opts.strict ? objectIs(actual, expected) : actual === expected) {
    return true;
  } // 7.3. Other pairs that do not both pass typeof value == 'object', equivalence is determined by ==.


  if (!actual || !expected || typeof actual !== 'object' && typeof expected !== 'object') {
    return opts.strict ? objectIs(actual, expected) : actual == expected;
  }
  /*
   * 7.4. For all other Object pairs, including Array objects, equivalence is
   * determined by having the same number of owned properties (as verified
   * with Object.prototype.hasOwnProperty.call), the same set of keys
   * (although not necessarily the same order), equivalent values for every
   * corresponding key, and an identical 'prototype' property. Note: this
   * accounts for both named and indexed properties on Arrays.
   */
  // eslint-disable-next-line no-use-before-define


  return objEquiv(actual, expected, opts);
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer$1(x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') {
    return false;
  }

  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }

  if (x.length > 0 && typeof x[0] !== 'number') {
    return false;
  }

  return true;
}

function objEquiv(a, b, opts) {
  /* eslint max-statements: [2, 50] */
  var i, key;

  if (typeof a !== typeof b) {
    return false;
  }

  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) {
    return false;
  } // an identical 'prototype' property.


  if (a.prototype !== b.prototype) {
    return false;
  }

  if (isArguments$1(a) !== isArguments$1(b)) {
    return false;
  }

  var aIsRegex = isRegex(a);
  var bIsRegex = isRegex(b);

  if (aIsRegex !== bIsRegex) {
    return false;
  }

  if (aIsRegex || bIsRegex) {
    return a.source === b.source && regexp_prototype_flags(a) === regexp_prototype_flags(b);
  }

  if (isDateObject(a) && isDateObject(b)) {
    return getTime.call(a) === getTime.call(b);
  }

  var aIsBuffer = isBuffer$1(a);
  var bIsBuffer = isBuffer$1(b);

  if (aIsBuffer !== bIsBuffer) {
    return false;
  }

  if (aIsBuffer || bIsBuffer) {
    // && would work too, because both are true or both false here
    if (a.length !== b.length) {
      return false;
    }

    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  try {
    var ka = objectKeys(a);
    var kb = objectKeys(b);
  } catch (e) {
    // happens when one is a string literal and the other isn't
    return false;
  } // having the same number of owned properties (keys incorporates hasOwnProperty)


  if (ka.length !== kb.length) {
    return false;
  } // the same set of keys (although not necessarily the same order),


  ka.sort();
  kb.sort(); // ~~~cheap key test

  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) {
      return false;
    }
  } // equivalent values for every corresponding key, and ~~~possibly expensive deep test


  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];

    if (!deepEqual(a[key], b[key], opts)) {
      return false;
    }
  }

  return true;
}

var deepEqual_1 = deepEqual;

var version = "0.10.0";

var createOrderer = function createOrderer() {
  // The default row-major order
  var rowMajor = function rowMajor(cols) {
    return function (index) {
      return [Math.floor(index / cols), index % cols];
    };
  };

  return {
    rowMajor: rowMajor
  };
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var clone$1 = function clone(value, state) {
  switch (_typeof_1(value)) {
    case 'object':
      {
        if (!deepEqual_1(value, state)) {
          return deepClone(value);
        }

        return state;
      }

    default:
      return value;
  }
};

var setReducer = function setReducer(key) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var actionType = "SET_".concat(camelToConst(key));
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultValue;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case actionType:
        return clone$1(action.payload[key], state);

      default:
        return state;
    }
  };
};

var setOptionsReducer = function setOptionsReducer(key, options) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  // eslint-disable-next-line no-param-reassign
  options = new Set(options);
  var actionType = "SET_".concat(camelToConst(key));
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultValue;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case actionType:
        if (options.has(action.payload[key])) {
          return clone$1(action.payload[key], state);
        }

        return state;

      default:
        return state;
    }
  };
};

var setAction = function setAction(key) {
  var type = "SET_".concat(camelToConst(key));
  return function (newValue) {
    return {
      type: type,
      payload: defineProperty({}, key, newValue)
    };
  };
};

var setter = function setter(key) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return [setReducer(key, defaultValue), setAction(key)];
};

var setterOptions = function setterOptions(key, options) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return [setOptionsReducer(key, options, defaultValue), setAction(key)];
};

var reset = function reset() {
  return {
    type: 'RESET',
    payload: {}
  };
};
var overwrite = function overwrite(newState, debug) {
  return {
    type: 'OVERWRITE',
    payload: {
      newState: newState,
      debug: debug
    }
  };
};
var softOverwrite = function softOverwrite(newState, debug) {
  return {
    type: 'SOFT_OVERWRITE',
    payload: {
      newState: newState,
      debug: debug
    }
  };
};

var _setter = setter('arrangementType'),
    _setter2 = slicedToArray(_setter, 2),
    arrangementType = _setter2[0],
    setArrangementType = _setter2[1];

var _setter3 = setter('arrangementObjective'),
    _setter4 = slicedToArray(_setter3, 2),
    arrangementObjective = _setter4[0],
    setArrangementObjective = _setter4[1];

var _setter5 = setter('arrangeOnGrouping', false),
    _setter6 = slicedToArray(_setter5, 2),
    arrangeOnGrouping = _setter6[0],
    setArrangeOnGrouping = _setter6[1];

var _setter7 = setter('arrangementOptions', {}),
    _setter8 = slicedToArray(_setter7, 2),
    arrangementOptions = _setter8[0],
    setArrangementOptions = _setter8[1];

var _setter9 = setter('groupingType'),
    _setter10 = slicedToArray(_setter9, 2),
    groupingType = _setter10[0],
    setGroupingType = _setter10[1];

var _setter11 = setter('groupingObjective'),
    _setter12 = slicedToArray(_setter11, 2),
    groupingObjective = _setter12[0],
    setGroupingObjective = _setter12[1];

var _setter13 = setter('groupingOptions', {}),
    _setter14 = slicedToArray(_setter13, 2),
    groupingOptions = _setter14[0],
    setGroupingOptions = _setter14[1];

var _setter15 = setter('splittingType'),
    _setter16 = slicedToArray(_setter15, 2),
    splittingType = _setter16[0],
    setSplittingType = _setter16[1];

var _setter17 = setter('splittingObjective'),
    _setter18 = slicedToArray(_setter17, 2),
    splittingObjective = _setter18[0],
    setSplittingObjective = _setter18[1];

var _setter19 = setter('splittingOptions', {}),
    _setter20 = slicedToArray(_setter19, 2),
    splittingOptions = _setter20[0],
    setSplittingOptions = _setter20[1];

var _setter21 = setter('backgroundColor', 0x000000),
    _setter22 = slicedToArray(_setter21, 2),
    backgroundColor = _setter22[0],
    setBackgroundColor = _setter22[1];

var _setter23 = setter('darkMode', DEFAULT_DARK_MODE),
    _setter24 = slicedToArray(_setter23, 2),
    darkMode = _setter24[0],
    setDarkMode = _setter24[1];

var _setter25 = setter('dimensionalityReducer'),
    _setter26 = slicedToArray(_setter25, 2),
    dimensionalityReducer = _setter26[0],
    setDimensionalityReducer = _setter26[1];

var _setter27 = setter('gridColor', 0x787878),
    _setter28 = slicedToArray(_setter27, 2),
    gridColor = _setter28[0],
    setGridColor = _setter28[1];

var _setter29 = setter('gridOpacity', 1),
    _setter30 = slicedToArray(_setter29, 2),
    gridOpacity = _setter30[0],
    setGridOpacity = _setter30[1];

var _setter31 = setter('showGrid', false),
    _setter32 = slicedToArray(_setter31, 2),
    showGrid = _setter32[0],
    setShowGrid = _setter32[1];

var _setter33 = setter('popupBackgroundOpacity', DEFAULT_POPUP_BACKGROUND_OPACITY),
    _setter34 = slicedToArray(_setter33, 2),
    popupBackgroundOpacity = _setter34[0],
    setPopupBackgroundOpacity = _setter34[1];

var _setter35 = setter('lassoFillColor'),
    _setter36 = slicedToArray(_setter35, 2),
    lassoFillColor = _setter36[0],
    setLassoFillColor = _setter36[1];

var _setter37 = setter('lassoFillOpacity', DEFAULT_LASSO_FILL_OPACITY),
    _setter38 = slicedToArray(_setter37, 2),
    lassoFillOpacity = _setter38[0],
    setLassoFillOpacity = _setter38[1];

var _setter39 = setter('lassoShowStartIndicator', DEFAULT_LASSO_SHOW_START_INDICATOR),
    _setter40 = slicedToArray(_setter39, 2),
    lassoShowStartIndicator = _setter40[0],
    setLassoShowStartIndicator = _setter40[1];

var _setter41 = setter('lassoStartIndicatorOpacity', DEFAULT_LASSO_START_INDICATOR_OPACITY),
    _setter42 = slicedToArray(_setter41, 2),
    lassoStartIndicatorOpacity = _setter42[0],
    setLassoStartIndicatorOpacity = _setter42[1];

var _setter43 = setter('lassoStrokeColor'),
    _setter44 = slicedToArray(_setter43, 2),
    lassoStrokeColor = _setter44[0],
    setLassoStrokeColor = _setter44[1];

var _setter45 = setter('lassoStrokeOpacity', DEFAULT_LASSO_STROKE_OPACITY),
    _setter46 = slicedToArray(_setter45, 2),
    lassoStrokeOpacity = _setter46[0],
    setLassoStrokeOpacity = _setter46[1];

var _setter47 = setter('lassoStrokeSize', DEFAULT_LASSO_STROKE_SIZE),
    _setter48 = slicedToArray(_setter47, 2),
    lassoStrokeSize = _setter48[0],
    setLassoStrokeSize = _setter48[1];

var _setter49 = setter('itemRenderer'),
    _setter50 = slicedToArray(_setter49, 2),
    itemRenderer = _setter50[0],
    setItemRenderer = _setter50[1];

var _setter51 = setter('previewRenderer'),
    _setter52 = slicedToArray(_setter51, 2),
    previewRenderer = _setter52[0],
    setPreviewRenderer = _setter52[1];

var _setter53 = setter('coverRenderer'),
    _setter54 = slicedToArray(_setter53, 2),
    coverRenderer = _setter54[0],
    setCoverRenderer = _setter54[1];

var _setter55 = setter('previewAggregator'),
    _setter56 = slicedToArray(_setter55, 2),
    previewAggregator = _setter56[0],
    setPreviewAggregator = _setter56[1];

var _setter57 = setter('coverAggregator'),
    _setter58 = slicedToArray(_setter57, 2),
    coverAggregator = _setter58[0],
    setCoverAggregator = _setter58[1];

var _setter59 = setter('orderer', createOrderer().rowMajor),
    _setter60 = slicedToArray(_setter59, 2),
    orderer = _setter60[0],
    setOrderer = _setter60[1]; // Grid


var _setter61 = setter('itemSize'),
    _setter62 = slicedToArray(_setter61, 2),
    itemSize = _setter62[0],
    setItemSize = _setter62[1];

var _setter63 = setter('itemSizeRange', [0.5, 1.0]),
    _setter64 = slicedToArray(_setter63, 2),
    itemSizeRange = _setter64[0],
    setItemSizeRange = _setter64[1];

var _setter65 = setter('columns', 10),
    _setter66 = slicedToArray(_setter65, 2),
    columns = _setter66[0],
    setColumns = _setter66[1];

var _setter67 = setter('rowHeight'),
    _setter68 = slicedToArray(_setter67, 2),
    rowHeight = _setter68[0],
    setRowHeight = _setter68[1];

var _setter69 = setter('cellAspectRatio', 1),
    _setter70 = slicedToArray(_setter69, 2),
    cellAspectRatio = _setter70[0],
    setCellAspectRatio = _setter70[1];

var _setter71 = setter('cellPadding', 12),
    _setter72 = slicedToArray(_setter71, 2),
    cellPadding = _setter72[0],
    setCellPadding = _setter72[1];

var _setter73 = setter('cellSize'),
    _setter74 = slicedToArray(_setter73, 2),
    cellSize = _setter74[0],
    setCellSize = _setter74[1];

var _setter75 = setter('pileCoverScale', DEFAULT_PILE_COVER_SCALE),
    _setter76 = slicedToArray(_setter75, 2),
    pileCoverScale = _setter76[0],
    setPileCoverScale = _setter76[1];

var _setter77 = setter('pileCoverInvert', false),
    _setter78 = slicedToArray(_setter77, 2),
    pileCoverInvert = _setter78[0],
    setPileCoverInvert = _setter78[1];

var _setter79 = setter('pileItemBrightness', DEFAULT_PILE_ITEM_BRIGHTNESS),
    _setter80 = slicedToArray(_setter79, 2),
    pileItemBrightness = _setter80[0],
    setPileItemBrightness = _setter80[1];

var _setter81 = setter('pileItemInvert', false),
    _setter82 = slicedToArray(_setter81, 2),
    pileItemInvert = _setter82[0],
    setPileItemInvert = _setter82[1];

var _setter83 = setter('pileItemOffset', [5, 5]),
    _setter84 = slicedToArray(_setter83, 2),
    pileItemOffset = _setter84[0],
    setPileItemOffset = _setter84[1];

var _setter85 = setter('pileItemOpacity', 1.0),
    _setter86 = slicedToArray(_setter85, 2),
    pileItemOpacity = _setter86[0],
    setPileItemOpacity = _setter86[1];

var _setter87 = setter('pileOrderItems'),
    _setter88 = slicedToArray(_setter87, 2),
    pileOrderItems = _setter88[0],
    setPileOrderItems = _setter88[1];

var _setter89 = setter('pileItemRotation', 0),
    _setter90 = slicedToArray(_setter89, 2),
    pileItemRotation = _setter90[0],
    setPileItemRotation = _setter90[1];

var _setter91 = setter('pileItemTint', DEFAULT_PILE_ITEM_TINT),
    _setter92 = slicedToArray(_setter91, 2),
    pileItemTint = _setter92[0],
    setPileItemTint = _setter92[1];

var _setter93 = setter('focusedPiles', []),
    _setter94 = slicedToArray(_setter93, 2),
    focusedPiles = _setter94[0],
    setFocusedPiles = _setter94[1];

var _setter95 = setter('magnifiedPiles', []),
    _setter96 = slicedToArray(_setter95, 2),
    magnifiedPiles = _setter96[0],
    setMagnifiedPiles = _setter96[1]; // 'originalPos' and 'closestPos'


var _setter97 = setter('depileMethod', 'originalPos'),
    _setter98 = slicedToArray(_setter97, 2),
    depileMethod = _setter98[0],
    setDepileMethod = _setter98[1];

var _setter99 = setter('depiledPile', []),
    _setter100 = slicedToArray(_setter99, 2),
    depiledPile = _setter100[0],
    setDepiledPile = _setter100[1];

var _setter101 = setter('temporaryDepiledPiles', []),
    _setter102 = slicedToArray(_setter101, 2),
    temporaryDepiledPiles = _setter102[0],
    setTemporaryDepiledPiles = _setter102[1]; // 'horizontal' or 'vertical'


var _setter103 = setter('tempDepileDirection', 'horizontal'),
    _setter104 = slicedToArray(_setter103, 2),
    tempDepileDirection = _setter104[0],
    setTempDepileDirection = _setter104[1];

var _setter105 = setter('tempDepileOneDNum', 6),
    _setter106 = slicedToArray(_setter105, 2),
    tempDepileOneDNum = _setter106[0],
    setTempDepileOneDNum = _setter106[1];

var _setter107 = setter('easing', cubicInOut),
    _setter108 = slicedToArray(_setter107, 2),
    easing = _setter108[0],
    setEasing = _setter108[1];

var _setterOptions = setterOptions('navigationMode', NAVIGATION_MODES, NAVIGATION_MODE_AUTO),
    _setterOptions2 = slicedToArray(_setterOptions, 2),
    navigationMode = _setterOptions2[0],
    setNavigationMode = _setterOptions2[1];

var _setter109 = setter('previewItemOffset'),
    _setter110 = slicedToArray(_setter109, 2),
    previewItemOffset = _setter110[0],
    setPreviewItemOffset = _setter110[1];

var _setter111 = setter('previewAlignment', 'top'),
    _setter112 = slicedToArray(_setter111, 2),
    previewAlignment = _setter112[0],
    setPreviewAlignment = _setter112[1];

var _setter113 = setter('previewPadding', 2),
    _setter114 = slicedToArray(_setter113, 2),
    previewPadding = _setter114[0],
    setPreviewPadding = _setter114[1];

var _setter115 = setter('previewScaling', [1, 1]),
    _setter116 = slicedToArray(_setter115, 2),
    previewScaling = _setter116[0],
    setPreviewScaling = _setter116[1];

var _setter117 = setter('previewScaleToCover', [false, false]),
    _setter118 = slicedToArray(_setter117, 2),
    previewScaleToCover = _setter118[0],
    setPreviewScaleToCover = _setter118[1];

var _setter119 = setter('previewSpacing', 2),
    _setter120 = slicedToArray(_setter119, 2),
    previewSpacing = _setter120[0],
    setPreviewSpacing = _setter120[1];

var _setter121 = setter('previewOffset', 2),
    _setter122 = slicedToArray(_setter121, 2),
    previewOffset = _setter122[0],
    setPreviewOffset = _setter122[1];

var _setter123 = setter('previewBackgroundColor', DEFAULT_PREVIEW_BACKGROUND_COLOR),
    _setter124 = slicedToArray(_setter123, 2),
    previewBackgroundColor = _setter124[0],
    setPreviewBackgroundColor = _setter124[1];

var _setter125 = setter('previewBackgroundOpacity', DEFAULT_PREVIEW_BACKGROUND_OPACITY),
    _setter126 = slicedToArray(_setter125, 2),
    previewBackgroundOpacity = _setter126[0],
    setPreviewBackgroundOpacity = _setter126[1];

var _setter127 = setter('previewBorderColor'),
    _setter128 = slicedToArray(_setter127, 2),
    previewBorderColor = _setter128[0],
    setPreviewBorderColor = _setter128[1];

var _setter129 = setter('previewBorderOpacity', 0.85),
    _setter130 = slicedToArray(_setter129, 2),
    previewBorderOpacity = _setter130[0],
    setPreviewBorderOpacity = _setter130[1];

var _setter131 = setter('pileBackgroundColor'),
    _setter132 = slicedToArray(_setter131, 2),
    pileBackgroundColor = _setter132[0],
    setPileBackgroundColor = _setter132[1];

var _setter133 = setter('pileBackgroundOpacity', 0),
    _setter134 = slicedToArray(_setter133, 2),
    pileBackgroundOpacity = _setter134[0],
    setPileBackgroundOpacity = _setter134[1];

var _setter135 = setter('pileBackgroundColorHover'),
    _setter136 = slicedToArray(_setter135, 2),
    pileBackgroundColorHover = _setter136[0],
    setPileBackgroundColorHover = _setter136[1];

var _setter137 = setter('pileBackgroundOpacityHover', 0.85),
    _setter138 = slicedToArray(_setter137, 2),
    pileBackgroundOpacityHover = _setter138[0],
    setPileBackgroundOpacityHover = _setter138[1];

var _setter139 = setter('pileBackgroundColorFocus'),
    _setter140 = slicedToArray(_setter139, 2),
    pileBackgroundColorFocus = _setter140[0],
    setPileBackgroundColorFocus = _setter140[1];

var _setter141 = setter('pileBackgroundOpacityFocus'),
    _setter142 = slicedToArray(_setter141, 2),
    pileBackgroundOpacityFocus = _setter142[0],
    setPileBackgroundOpacityFocus = _setter142[1];

var _setter143 = setter('pileBackgroundColorActive'),
    _setter144 = slicedToArray(_setter143, 2),
    pileBackgroundColorActive = _setter144[0],
    setPileBackgroundColorActive = _setter144[1];

var _setter145 = setter('pileBackgroundOpacityActive'),
    _setter146 = slicedToArray(_setter145, 2),
    pileBackgroundOpacityActive = _setter146[0],
    setPileBackgroundOpacityActive = _setter146[1];

var _setter147 = setter('pileBorderColor', 0x808080),
    _setter148 = slicedToArray(_setter147, 2),
    pileBorderColor = _setter148[0],
    setPileBorderColor = _setter148[1];

var _setter149 = setter('pileBorderOpacity', 1.0),
    _setter150 = slicedToArray(_setter149, 2),
    pileBorderOpacity = _setter150[0],
    setPileBorderOpacity = _setter150[1];

var _setter151 = setter('pileBorderColorHover', 0x808080),
    _setter152 = slicedToArray(_setter151, 2),
    pileBorderColorHover = _setter152[0],
    setPileBorderColorHover = _setter152[1];

var _setter153 = setter('pileBorderOpacityHover', 1.0),
    _setter154 = slicedToArray(_setter153, 2),
    pileBorderOpacityHover = _setter154[0],
    setPileBorderOpacityHover = _setter154[1];

var _setter155 = setter('pileBorderColorFocus', 0xeee462),
    _setter156 = slicedToArray(_setter155, 2),
    pileBorderColorFocus = _setter156[0],
    setPileBorderColorFocus = _setter156[1];

var _setter157 = setter('pileBorderOpacityFocus', 1.0),
    _setter158 = slicedToArray(_setter157, 2),
    pileBorderOpacityFocus = _setter158[0],
    setPileBorderOpacityFocus = _setter158[1];

var _setter159 = setter('pileBorderColorActive', 0xffa5da),
    _setter160 = slicedToArray(_setter159, 2),
    pileBorderColorActive = _setter160[0],
    setPileBorderColorActive = _setter160[1];

var _setter161 = setter('pileBorderOpacityActive', 1.0),
    _setter162 = slicedToArray(_setter161, 2),
    pileBorderOpacityActive = _setter162[0],
    setPileBorderOpacityActive = _setter162[1];

var _setter163 = setter('pileBorderSize', 0),
    _setter164 = slicedToArray(_setter163, 2),
    pileBorderSize = _setter164[0],
    setPileBorderSize = _setter164[1]; // 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'center'


var _setter165 = setter('pileCellAlignment', 'topLeft'),
    _setter166 = slicedToArray(_setter165, 2),
    pileCellAlignment = _setter166[0],
    setPileCellAlignment = _setter166[1];

var _setter167 = setter('pileContextMenuItems', []),
    _setter168 = slicedToArray(_setter167, 2),
    pileContextMenuItems = _setter168[0],
    setPileContextMenuItems = _setter168[1];

var _setter169 = setter('pileSizeBadge', false),
    _setter170 = slicedToArray(_setter169, 2),
    pileSizeBadge = _setter170[0],
    setPileSizeBadge = _setter170[1];

var _setter171 = setter('pileSizeBadgeAlign', DEFAULT_PILE_SIZE_BADGE_ALIGN),
    _setter172 = slicedToArray(_setter171, 2),
    pileSizeBadgeAlign = _setter172[0],
    setPileSizeBadgeAlign = _setter172[1];

var _setter173 = setter('pileVisibilityItems', true),
    _setter174 = slicedToArray(_setter173, 2),
    pileVisibilityItems = _setter174[0],
    setPileVisibilityItems = _setter174[1];

var _setter175 = setter('pileOpacity', 1.0),
    _setter176 = slicedToArray(_setter175, 2),
    pileOpacity = _setter176[0],
    setPileOpacity = _setter176[1];

var _setter177 = setter('pileScale', 1.0),
    _setter178 = slicedToArray(_setter177, 2),
    pileScale = _setter178[0],
    setPileScale = _setter178[1];

var _setter179 = setter('zoomScale', 1.0),
    _setter180 = slicedToArray(_setter179, 2),
    zoomScale = _setter180[0],
    setZoomScale = _setter180[1]; // Label


var _setter181 = setter('pileLabel'),
    _setter182 = slicedToArray(_setter181, 2),
    pileLabel = _setter182[0],
    setPileLabel = _setter182[1];

var _setter183 = setter('pileLabelColor'),
    _setter184 = slicedToArray(_setter183, 2),
    pileLabelColor = _setter184[0],
    setPileLabelColor = _setter184[1];

var _setter185 = setter('pileLabelText', false),
    _setter186 = slicedToArray(_setter185, 2),
    pileLabelText = _setter186[0],
    setPileLabelText = _setter186[1];

var _setter187 = setter('pileLabelTextMapping', false),
    _setter188 = slicedToArray(_setter187, 2),
    pileLabelTextMapping = _setter188[0],
    setPileLabelTextMapping = _setter188[1];

var _setter189 = setter('pileLabelTextColor', 0x000000),
    _setter190 = slicedToArray(_setter189, 2),
    pileLabelTextColor = _setter190[0],
    setPileLabelTextColor = _setter190[1];

var _setter191 = setter('pileLabelTextOpacity', 1),
    _setter192 = slicedToArray(_setter191, 2),
    pileLabelTextOpacity = _setter192[0],
    setPileLabelTextOpacity = _setter192[1];

var _setter193 = setter('pileLabelTextDropShadow', {}),
    _setter194 = slicedToArray(_setter193, 2),
    pileLabelTextStyle = _setter194[0],
    setPileLabelTextStyle = _setter194[1];

var _setter195 = setter('pileLabelAlign', 'bottom'),
    _setter196 = slicedToArray(_setter195, 2),
    pileLabelAlign = _setter196[0],
    setPileLabelAlign = _setter196[1];

var _setter197 = setter('pileLabelStackAlign', 'horizontal'),
    _setter198 = slicedToArray(_setter197, 2),
    pileLabelStackAlign = _setter198[0],
    setPileLabelStackAlign = _setter198[1];

var _setter199 = setter('pileLabelFontSize', 7),
    _setter200 = slicedToArray(_setter199, 2),
    pileLabelFontSize = _setter200[0],
    setPileLabelFontSize = _setter200[1];

var _setter201 = setter('pileLabelHeight', 2),
    _setter202 = slicedToArray(_setter201, 2),
    pileLabelHeight = _setter202[0],
    setPileLabelHeight = _setter202[1];

var _setter203 = setter('pileLabelSizeTransform'),
    _setter204 = slicedToArray(_setter203, 2),
    pileLabelSizeTransform = _setter204[0],
    setPileLabelSizeTransform = _setter204[1];

var _setter205 = setter('projector'),
    _setter206 = slicedToArray(_setter205, 2),
    projector = _setter206[0],
    setProjector = _setter206[1];

var _setter207 = setter('zoomBounds', [-Infinity, Infinity]),
    _setter208 = slicedToArray(_setter207, 2),
    zoomBounds = _setter208[0],
    setZoomBounds = _setter208[1];

var items = function items() {
  var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_ITEMS':
      {
        var useCustomId = action.payload.items.length ? typeof action.payload.items[0].id !== 'undefined' : false;
        return action.payload.items.reduce(function (newState, item, index) {
          var id = useCustomId ? item.id : index;
          newState[id] = _objectSpread({
            id: id,
            index: index
          }, item);
          return newState;
        }, {});
      }

    default:
      return previousState;
  }
};

var setItems = function setItems(newItems) {
  return {
    type: 'SET_ITEMS',
    payload: {
      items: newItems
    }
  };
};

var piles = function piles() {
  var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_PILES':
      {
        return Object.entries(action.payload.piles).reduce(function (newState, _ref, index) {
          var _ref2 = slicedToArray(_ref, 2),
              pileId = _ref2[0],
              pileState = _ref2[1];

          newState[pileId] = _objectSpread(_objectSpread({}, pileState), {}, {
            id: pileId,
            index: Number.isNaN(+pileState.index) ? index : +pileState.index
          });
          return newState;
        }, {});
      }

    case 'INIT_PILES':
      {
        var useCustomItemId = action.payload.newItems.length ? typeof action.payload.newItems[0].id !== 'undefined' : false;
        var newItemIds = action.payload.newItems.reduce(function (itemIds, item, index) {
          var id = item.id === undefined ? index.toString() : item.id;
          itemIds.add(id);
          return itemIds;
        }, new Set());
        return action.payload.newItems.reduce(function (newState, item, index) {
          var itemId = useCustomItemId ? item.id : index.toString();
          var previousPileState = previousState[itemId];

          var newPileState = _objectSpread({
            id: itemId,
            index: index,
            items: [itemId],
            x: null,
            y: null
          }, previousPileState);

          if (previousPileState) {
            if (previousPileState.items.length) {
              newPileState.items = previousPileState.items.filter(function (id) {
                return newItemIds.has(id);
              });
            } else if (newItemIds.has(itemId)) {
              var isItemOnPile = Object.values(previousState).filter(function (pile) {
                return pile.items.includes(itemId) && newItemIds.has(pile.id);
              }).length;
              if (!isItemOnPile) newPileState.items = [itemId];
            }
          }

          newState[itemId] = newPileState;
          return newState;
        }, {});
      }

    case 'MERGE_PILES':
      {
        var newState = _objectSpread({}, previousState);

        var target;

        if (action.payload.targetPileId === undefined && // eslint-disable-next-line no-restricted-globals
        isNaN(action.payload.pileIds[0])) {
          target = action.payload.pileIds[0];
        } else {
          target = action.payload.targetPileId !== undefined ? action.payload.targetPileId : Math.min.apply([], action.payload.pileIds).toString();
        }

        var sourcePileIds = action.payload.pileIds.filter(function (id) {
          return id !== target;
        });

        var _action$payload$targe = slicedToArray(action.payload.targetPos, 2),
            x = _action$payload$targe[0],
            y = _action$payload$targe[1];

        newState[target] = _objectSpread(_objectSpread({}, newState[target]), {}, {
          items: toConsumableArray(newState[target].items),
          x: x,
          y: y
        });
        sourcePileIds.forEach(function (id) {
          var _newState$target$item;

          (_newState$target$item = newState[target].items).push.apply(_newState$target$item, toConsumableArray(newState[id].items));

          newState[id] = _objectSpread(_objectSpread({}, newState[id]), {}, {
            items: [],
            x: null,
            y: null
          });
        });
        return newState;
      }

    case 'MOVE_PILES':
      {
        var _newState = _objectSpread({}, previousState);

        action.payload.movingPiles.forEach(function (_ref3) {
          var id = _ref3.id,
              x = _ref3.x,
              y = _ref3.y;
          _newState[id] = _objectSpread(_objectSpread({}, _newState[id]), {}, {
            x: x,
            y: y
          });
        });
        return _newState;
      }

    case 'SCATTER_PILES':
      {
        var _scatterPiles = action.payload.piles.filter(function (pile) {
          return pile.items.length > 1;
        });

        if (!_scatterPiles.length) return previousState;

        var _newState2 = _objectSpread({}, previousState);

        _scatterPiles.forEach(function (pile) {
          pile.items.forEach(function (itemId) {
            _newState2[itemId] = _objectSpread(_objectSpread({}, _newState2[itemId]), {}, {
              items: [itemId],
              x: pile.x,
              y: pile.y
            });
          });
        });

        return _newState2;
      }

    case 'SPLIT_PILES':
      {
        if (!Object.values(action.payload.piles).length) return previousState;

        var _newState3 = _objectSpread({}, previousState); // The 0th index represents the groups that is kept on the source pile


        Object.entries(action.payload.piles) // If there is only one split group we don't have to do anything
        .filter(function (splittedPiles) {
          return splittedPiles[1].length > 1;
        }).forEach(function (_ref4) {
          var _ref5 = slicedToArray(_ref4, 2),
              source = _ref5[0],
              splits = _ref5[1];

          splits.forEach(function (itemIds, idx) {
            _newState3[itemIds[0]] = _objectSpread(_objectSpread({}, _newState3[itemIds[0]]), {}, {
              x: _newState3[source].x + idx * 50,
              y: _newState3[source].y,
              items: toConsumableArray(itemIds)
            });
          });
        });
        return _newState3;
      }

    default:
      return previousState;
  }
}; // action


var initPiles = function initPiles(newItems) {
  return {
    type: 'INIT_PILES',
    payload: {
      newItems: newItems
    }
  };
};

var mergePiles = function mergePiles(pileIds, targetPos, targetPileId) {
  return {
    type: 'MERGE_PILES',
    payload: {
      pileIds: pileIds,
      targetPos: targetPos,
      targetPileId: targetPileId
    }
  };
};

var movePiles = function movePiles(movingPiles) {
  return {
    type: 'MOVE_PILES',
    payload: {
      movingPiles: movingPiles
    }
  };
};

var scatterPiles = function scatterPiles(pilesToBeScattered) {
  return {
    type: 'SCATTER_PILES',
    payload: {
      piles: pilesToBeScattered
    }
  };
};

var splitPiles = function splitPiles(pilesToBeSplit) {
  return {
    type: 'SPLIT_PILES',
    payload: {
      piles: pilesToBeSplit
    }
  };
};

var setPiles = function setPiles(newPiles) {
  return {
    type: 'SET_PILES',
    payload: {
      piles: newPiles
    }
  };
};

var _setter209 = setter('showSpatialIndex', false),
    _setter210 = slicedToArray(_setter209, 2),
    showSpatialIndex = _setter210[0],
    setShowSpatialIndex = _setter210[1];

var createStore = function createStore() {
  var lastAction = null;
  var reducers = {
    arrangementObjective: arrangementObjective,
    arrangementOptions: arrangementOptions,
    arrangementType: arrangementType,
    arrangeOnGrouping: arrangeOnGrouping,
    backgroundColor: backgroundColor,
    coverRenderer: coverRenderer,
    cellAspectRatio: cellAspectRatio,
    cellPadding: cellPadding,
    cellSize: cellSize,
    columns: columns,
    coverAggregator: coverAggregator,
    depiledPile: depiledPile,
    depileMethod: depileMethod,
    dimensionalityReducer: dimensionalityReducer,
    easing: easing,
    focusedPiles: focusedPiles,
    gridColor: gridColor,
    gridOpacity: gridOpacity,
    groupingObjective: groupingObjective,
    groupingOptions: groupingOptions,
    groupingType: groupingType,
    darkMode: darkMode,
    popupBackgroundOpacity: popupBackgroundOpacity,
    itemRenderer: itemRenderer,
    items: items,
    itemSize: itemSize,
    itemSizeRange: itemSizeRange,
    lassoFillColor: lassoFillColor,
    lassoFillOpacity: lassoFillOpacity,
    lassoShowStartIndicator: lassoShowStartIndicator,
    lassoStartIndicatorOpacity: lassoStartIndicatorOpacity,
    lassoStrokeColor: lassoStrokeColor,
    lassoStrokeOpacity: lassoStrokeOpacity,
    lassoStrokeSize: lassoStrokeSize,
    magnifiedPiles: magnifiedPiles,
    navigationMode: navigationMode,
    orderer: orderer,
    pileBackgroundColor: pileBackgroundColor,
    pileBackgroundColorActive: pileBackgroundColorActive,
    pileBackgroundColorFocus: pileBackgroundColorFocus,
    pileBackgroundColorHover: pileBackgroundColorHover,
    pileBackgroundOpacity: pileBackgroundOpacity,
    pileBackgroundOpacityActive: pileBackgroundOpacityActive,
    pileBackgroundOpacityFocus: pileBackgroundOpacityFocus,
    pileBackgroundOpacityHover: pileBackgroundOpacityHover,
    pileBorderColor: pileBorderColor,
    pileBorderColorActive: pileBorderColorActive,
    pileBorderColorFocus: pileBorderColorFocus,
    pileBorderColorHover: pileBorderColorHover,
    pileBorderOpacity: pileBorderOpacity,
    pileBorderOpacityActive: pileBorderOpacityActive,
    pileBorderOpacityFocus: pileBorderOpacityFocus,
    pileBorderOpacityHover: pileBorderOpacityHover,
    pileBorderSize: pileBorderSize,
    pileCellAlignment: pileCellAlignment,
    pileContextMenuItems: pileContextMenuItems,
    pileCoverInvert: pileCoverInvert,
    pileCoverScale: pileCoverScale,
    pileItemOffset: pileItemOffset,
    pileItemBrightness: pileItemBrightness,
    pileItemInvert: pileItemInvert,
    pileItemOpacity: pileItemOpacity,
    pileOrderItems: pileOrderItems,
    pileItemRotation: pileItemRotation,
    pileItemTint: pileItemTint,
    pileLabel: pileLabel,
    pileLabelAlign: pileLabelAlign,
    pileLabelColor: pileLabelColor,
    pileLabelFontSize: pileLabelFontSize,
    pileLabelHeight: pileLabelHeight,
    pileLabelStackAlign: pileLabelStackAlign,
    pileLabelSizeTransform: pileLabelSizeTransform,
    pileLabelText: pileLabelText,
    pileLabelTextColor: pileLabelTextColor,
    pileLabelTextMapping: pileLabelTextMapping,
    pileLabelTextOpacity: pileLabelTextOpacity,
    pileLabelTextStyle: pileLabelTextStyle,
    pileOpacity: pileOpacity,
    piles: piles,
    pileScale: pileScale,
    pileSizeBadge: pileSizeBadge,
    pileSizeBadgeAlign: pileSizeBadgeAlign,
    pileVisibilityItems: pileVisibilityItems,
    previewAggregator: previewAggregator,
    previewAlignment: previewAlignment,
    previewBackgroundColor: previewBackgroundColor,
    previewBackgroundOpacity: previewBackgroundOpacity,
    previewBorderColor: previewBorderColor,
    previewBorderOpacity: previewBorderOpacity,
    previewItemOffset: previewItemOffset,
    previewOffset: previewOffset,
    previewPadding: previewPadding,
    previewRenderer: previewRenderer,
    previewScaleToCover: previewScaleToCover,
    previewScaling: previewScaling,
    previewSpacing: previewSpacing,
    projector: projector,
    rowHeight: rowHeight,
    splittingObjective: splittingObjective,
    splittingOptions: splittingOptions,
    splittingType: splittingType,
    showGrid: showGrid,
    showSpatialIndex: showSpatialIndex,
    tempDepileDirection: tempDepileDirection,
    tempDepileOneDNum: tempDepileOneDNum,
    temporaryDepiledPiles: temporaryDepiledPiles,
    zoomBounds: zoomBounds,
    zoomScale: zoomScale
  };
  var appReducer = combineReducers(reducers);

  var warnForUnknownImportProps = function warnForUnknownImportProps(newState) {
    var unknownProps = Object.keys(newState).reduce(function (unknown, prop) {
      if (reducers[prop] === undefined) {
        unknown.push("\"".concat(prop, "\""));
      }

      return unknown;
    }, []).join(', ');

    if (unknownProps) {
      console.warn("The following state properties are not understood and will not imported: ".concat(unknownProps));
    }
  };

  var rootReducer = function rootReducer(state, action) {
    lastAction = action;

    if (action.type === 'RESET') {
      state = undefined; // eslint-disable-line no-param-reassign
    } else if (action.type === 'OVERWRITE') {
      if (action.payload.debug) warnForUnknownImportProps(action.payload.newState);
      state = action.payload.newState; // eslint-disable-line no-param-reassign
    } else if (action.type === 'SOFT_OVERWRITE') {
      if (action.payload.debug) warnForUnknownImportProps(action.payload.newState); // eslint-disable-next-line no-param-reassign

      state = update(state, action.payload.newState);
    }

    return appReducer(state, action);
  };

  var reduxStore = createStore$1(enableBatching(rootReducer));

  reduxStore.lastAction = function () {
    return lastAction;
  };

  Object.defineProperty(reduxStore, 'lastAction', {
    get: function get() {
      return lastAction;
    }
  });

  var exportState = function exportState() {
    var clonedState = deepClone(reduxStore.getState());
    clonedState.version = version;
    return clonedState;
  };

  var importState = function importState(newState) {
    var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref6$overwriteState = _ref6.overwriteState,
        overwriteState = _ref6$overwriteState === void 0 ? false : _ref6$overwriteState,
        _ref6$debug = _ref6.debug,
        debug = _ref6$debug === void 0 ? false : _ref6$debug;

    if (newState.version !== version) {
      console.warn("The version of the imported state \"".concat(newState.version, "\" doesn't match the library version \"").concat(version, "\". Use at your own risk!"));
    }

    if (newState.version) delete newState.version;
    if (overwriteState) reduxStore.dispatch(overwrite(newState, debug));else reduxStore.dispatch(softOverwrite(newState, debug));
  };

  var resetState = function resetState() {
    reduxStore.dispatch(reset());
  };

  return pipe(withStaticProperty('reduxStore', reduxStore), withReadOnlyProperty('lastAction', function () {
    return lastAction;
  }), withReadOnlyProperty('state', reduxStore.getState), withForwardedMethod('dispatch', reduxStore.dispatch), withForwardedMethod('subscribe', reduxStore.subscribe))({
    "export": exportState,
    "import": importState,
    reset: resetState
  });
};
var createAction = {
  initPiles: initPiles,
  mergePiles: mergePiles,
  movePiles: movePiles,
  scatterPiles: scatterPiles,
  setPiles: setPiles,
  setCoverRenderer: setCoverRenderer,
  setArrangementObjective: setArrangementObjective,
  setArrangeOnGrouping: setArrangeOnGrouping,
  setArrangementOptions: setArrangementOptions,
  setArrangementType: setArrangementType,
  setBackgroundColor: setBackgroundColor,
  setCellAspectRatio: setCellAspectRatio,
  setCellPadding: setCellPadding,
  setCellSize: setCellSize,
  setColumns: setColumns,
  setCoverAggregator: setCoverAggregator,
  setDepiledPile: setDepiledPile,
  setDepileMethod: setDepileMethod,
  setDimensionalityReducer: setDimensionalityReducer,
  setEasing: setEasing,
  setFocusedPiles: setFocusedPiles,
  setGridColor: setGridColor,
  setGridOpacity: setGridOpacity,
  setGroupingObjective: setGroupingObjective,
  setGroupingOptions: setGroupingOptions,
  setGroupingType: setGroupingType,
  setDarkMode: setDarkMode,
  setPopupBackgroundOpacity: setPopupBackgroundOpacity,
  setItemRenderer: setItemRenderer,
  setItems: setItems,
  setItemSize: setItemSize,
  setItemSizeRange: setItemSizeRange,
  setLassoFillColor: setLassoFillColor,
  setLassoFillOpacity: setLassoFillOpacity,
  setLassoShowStartIndicator: setLassoShowStartIndicator,
  setLassoStartIndicatorOpacity: setLassoStartIndicatorOpacity,
  setLassoStrokeColor: setLassoStrokeColor,
  setLassoStrokeOpacity: setLassoStrokeOpacity,
  setLassoStrokeSize: setLassoStrokeSize,
  setMagnifiedPiles: setMagnifiedPiles,
  setNavigationMode: setNavigationMode,
  setOrderer: setOrderer,
  setPileBackgroundColor: setPileBackgroundColor,
  setPileBackgroundColorActive: setPileBackgroundColorActive,
  setPileBackgroundColorFocus: setPileBackgroundColorFocus,
  setPileBackgroundColorHover: setPileBackgroundColorHover,
  setPileBackgroundOpacity: setPileBackgroundOpacity,
  setPileBackgroundOpacityActive: setPileBackgroundOpacityActive,
  setPileBackgroundOpacityFocus: setPileBackgroundOpacityFocus,
  setPileBackgroundOpacityHover: setPileBackgroundOpacityHover,
  setPileBorderColor: setPileBorderColor,
  setPileBorderColorActive: setPileBorderColorActive,
  setPileBorderColorFocus: setPileBorderColorFocus,
  setPileBorderColorHover: setPileBorderColorHover,
  setPileBorderOpacity: setPileBorderOpacity,
  setPileBorderOpacityActive: setPileBorderOpacityActive,
  setPileBorderOpacityFocus: setPileBorderOpacityFocus,
  setPileBorderOpacityHover: setPileBorderOpacityHover,
  setPileBorderSize: setPileBorderSize,
  setPileCellAlignment: setPileCellAlignment,
  setPileContextMenuItems: setPileContextMenuItems,
  setPileCoverInvert: setPileCoverInvert,
  setPileCoverScale: setPileCoverScale,
  setPileItemOffset: setPileItemOffset,
  setPileOrderItems: setPileOrderItems,
  setPileItemBrightness: setPileItemBrightness,
  setPileItemInvert: setPileItemInvert,
  setPileItemOpacity: setPileItemOpacity,
  setPileItemRotation: setPileItemRotation,
  setPileItemTint: setPileItemTint,
  setPileLabel: setPileLabel,
  setPileLabelAlign: setPileLabelAlign,
  setPileLabelColor: setPileLabelColor,
  setPileLabelFontSize: setPileLabelFontSize,
  setPileLabelHeight: setPileLabelHeight,
  setPileLabelStackAlign: setPileLabelStackAlign,
  setPileLabelSizeTransform: setPileLabelSizeTransform,
  setPileLabelText: setPileLabelText,
  setPileLabelTextColor: setPileLabelTextColor,
  setPileLabelTextMapping: setPileLabelTextMapping,
  setPileLabelTextOpacity: setPileLabelTextOpacity,
  setPileLabelTextStyle: setPileLabelTextStyle,
  setPileVisibilityItems: setPileVisibilityItems,
  setPileOpacity: setPileOpacity,
  setPileScale: setPileScale,
  setPileSizeBadge: setPileSizeBadge,
  setPileSizeBadgeAlign: setPileSizeBadgeAlign,
  setPreviewAggregator: setPreviewAggregator,
  setPreviewAlignment: setPreviewAlignment,
  setPreviewBackgroundColor: setPreviewBackgroundColor,
  setPreviewBackgroundOpacity: setPreviewBackgroundOpacity,
  setPreviewBorderColor: setPreviewBorderColor,
  setPreviewBorderOpacity: setPreviewBorderOpacity,
  setPreviewItemOffset: setPreviewItemOffset,
  setPreviewOffset: setPreviewOffset,
  setPreviewPadding: setPreviewPadding,
  setPreviewRenderer: setPreviewRenderer,
  setPreviewScaleToCover: setPreviewScaleToCover,
  setPreviewScaling: setPreviewScaling,
  setPreviewSpacing: setPreviewSpacing,
  setProjector: setProjector,
  setRowHeight: setRowHeight,
  setSplittingObjective: setSplittingObjective,
  setSplittingOptions: setSplittingOptions,
  setSplittingType: setSplittingType,
  setShowGrid: setShowGrid,
  setShowSpatialIndex: setShowSpatialIndex,
  setTempDepileDirection: setTempDepileDirection,
  setTempDepileOneDNum: setTempDepileOneDNum,
  setTemporaryDepiledPiles: setTemporaryDepiledPiles,
  setZoomBounds: setZoomBounds,
  setZoomScale: setZoomScale,
  splitPiles: splitPiles
};

var DEFAULT_BACKGROUND_COLOR = 0x00ff00;
var DEFAULT_BACKGROUND_OPACITY = 0.2;
var DEFAULT_PADDING = 0;

var withBackground = function withBackground(_ref) {
  var background = _ref.background,
      backgroundColor = _ref.backgroundColor,
      backgroundOpacity = _ref.backgroundOpacity;
  return function (self) {
    return assign(self, {
      get backgroundColor() {
        return background.tint;
      },

      setBackgroundColor: function setBackgroundColor() {
        var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : backgroundColor;
        background.tint = color;
      },

      get backgroundOpacity() {
        return background.alpha;
      },

      setBackgroundOpacity: function setBackgroundOpacity() {
        var opacity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : backgroundOpacity;
        background.alpha = opacity;
      },
      rescaleBackground: function rescaleBackground() {
        var withPadding = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var width = self.width + self.padding * withPadding;
        var height = self.height + self.padding * withPadding;
        background.x = -width / 2;
        background.y = -height / 2;
        background.width = width;
        background.height = height;
      }
    });
  };
};

var withPadding = function withPadding(initialPadding) {
  return function (self) {
    var padding = initialPadding;
    return assign(self, {
      get padding() {
        return padding;
      },

      setPadding: function setPadding(newPadding) {
        padding = Number.isNaN(+newPadding) ? +newPadding : padding;
      }
    });
  };
};

var createImageWithBackground = function createImageWithBackground(source) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$anchor = _ref2.anchor,
      anchor = _ref2$anchor === void 0 ? [0.5, 0.5] : _ref2$anchor,
      _ref2$backgroundColor = _ref2.backgroundColor,
      backgroundColor = _ref2$backgroundColor === void 0 ? DEFAULT_BACKGROUND_COLOR : _ref2$backgroundColor,
      _ref2$backgroundOpaci = _ref2.backgroundOpacity,
      backgroundOpacity = _ref2$backgroundOpaci === void 0 ? DEFAULT_BACKGROUND_OPACITY : _ref2$backgroundOpaci,
      _ref2$padding = _ref2.padding,
      padding = _ref2$padding === void 0 ? DEFAULT_PADDING : _ref2$padding;

  var container = new Container();
  var background = new Sprite(Texture.WHITE);
  var displayObject = toDisplayObject(source);
  var sprite;

  if (displayObject instanceof Texture) {
    var _sprite$anchor;

    sprite = new Sprite(displayObject);

    (_sprite$anchor = sprite.anchor).set.apply(_sprite$anchor, toConsumableArray(anchor));
  } else {
    sprite = displayObject;
  }

  container.addChild(background);
  container.addChild(sprite);
  return pipe(withStaticProperty('displayObject', container), withStaticProperty('sprite', sprite), withColorFilters(sprite), withScale(sprite, displayObject.width, displayObject.height), withSize(sprite, displayObject.width, displayObject.height), withPadding(padding), withBackground({
    background: background,
    backgroundColor: backgroundColor,
    backgroundOpacity: backgroundOpacity
  }), withDestroy(sprite), withConstructor(createImageWithBackground))({});
};

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var objectWithoutProperties = _objectWithoutProperties;

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var createBBox = function createBBox() {
  var metadata = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$minX = _ref.minX,
        minX = _ref$minX === void 0 ? 0 : _ref$minX,
        _ref$minY = _ref.minY,
        minY = _ref$minY === void 0 ? 0 : _ref$minY,
        _ref$maxX = _ref.maxX,
        maxX = _ref$maxX === void 0 ? 1 : _ref$maxX,
        _ref$maxY = _ref.maxY,
        maxY = _ref$maxY === void 0 ? 1 : _ref$maxY,
        extra = objectWithoutProperties(_ref, ["minX", "minY", "maxX", "maxY"]);

    return pipe.apply(void 0, [withStaticProperty('minX', minX), withStaticProperty('minY', minY), withStaticProperty('maxX', maxX), withStaticProperty('maxY', maxY), withStaticProperty('width', maxX - minX), withStaticProperty('height', maxY - minY), withStaticProperty('cX', minX + (maxX - minX) / 2), withStaticProperty('cY', minY + (maxY - minY) / 2)].concat(toConsumableArray(Object.entries(_objectSpread$1(_objectSpread$1({}, metadata), extra)).map(function (_ref2) {
      var _ref3 = slicedToArray(_ref2, 2),
          key = _ref3[0],
          value = _ref3[1];

      return withStaticProperty(key, value);
    }))))({});
  };
};

var DEFAULT_DELAY = 0;
var DEFAULT_DURATION = 250;
/**
 *
 * @param {number} duration - The time duration of animation
 * @param {number} delay - The delay of animation
 * @param {function} interpolator - The interpolator function
 * @param {function} easing - The easing function of animation
 * @param {object} endValue - The end value of animation
 * @param {function} getter - The function to get the current value
 * @param {function} setter - The function to set the new value
 * @param {function} onDone - The callback function when the animation is done
 */

var createTweener = function createTweener() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? DEFAULT_DURATION : _ref$duration,
      _ref$delay = _ref.delay,
      delay = _ref$delay === void 0 ? DEFAULT_DELAY : _ref$delay,
      interpolator = _ref.interpolator,
      _ref$easing = _ref.easing,
      easing = _ref$easing === void 0 ? cubicInOut : _ref$easing,
      initialEndValue = _ref.endValue,
      getter = _ref.getter,
      setter = _ref.setter,
      _ref$onDone = _ref.onDone,
      onDone = _ref$onDone === void 0 ? toVoid : _ref$onDone;

  var startValue;
  var startTime;
  var dt;
  var ready;
  var endValue = initialEndValue;

  var startAnimation = function startAnimation() {
    startValue = getter();
    ready = startValue !== null;

    if (!ready) {
      console.warn("Invalid start value for animation: ".concat(startValue));
    }
  };

  var register = function register() {
    // The following line leads to partial adding of animations
    // setTimeout(startAnimation, delay);
    if (!delay) startAnimation();else setTimeout(startAnimation, delay);
  };
  /**
   * Set the value to the current progress given the elapsed time
   * @return  {bool}  If `true` the animation is over
   */


  var update = function update() {
    if (!ready) return false;
    if (!startTime) startTime = performance.now();
    dt = performance.now() - startTime;

    if (dt >= duration) {
      // Ensure that the endValue is set
      setter(endValue);
      return true;
    }

    setter(interpolator(startValue, endValue, easing(dt / duration)));
    return false;
  };

  var setEasing = function setEasing(newEasing) {
    // eslint-disable-next-line no-param-reassign
    easing = newEasing;
  };

  var updateEndValue = function updateEndValue(newEndValue) {
    endValue = newEndValue;
  };

  return {
    get dt() {
      return dt;
    },

    get duration() {
      return duration;
    },

    onDone: onDone,
    register: register,
    update: update,
    updateEndValue: updateEndValue,
    setEasing: setEasing
  };
};

var addAnimation = function addAnimation(_ref) {
  var name = _ref.name,
      pubSub = _ref.pubSub;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      duration = _ref2.duration,
      delay = _ref2.delay,
      _ref2$eps = _ref2.eps,
      eps = _ref2$eps === void 0 ? 1e-6 : _ref2$eps;

  return function (self) {
    var getter = function getter() {
      return self[name];
    };

    var setter = function setter(value) {
      self["set".concat(capitalize(name))](value);
    };

    var tweener;
    return assign(self, defineProperty({}, "animate".concat(capitalize(name)), function animate(newValue) {
      var d = Math.abs(newValue - getter());

      if (d < eps) {
        setter(newValue);
        return;
      }

      var remainingDuration = duration;

      if (tweener) {
        pubSub.publish('cancelAnimation', tweener);

        if (tweener.dt < tweener.duration) {
          remainingDuration = tweener.dt;
        }
      }

      tweener = createTweener({
        delay: delay,
        duration: remainingDuration,
        interpolator: interpolateNumber,
        endValue: newValue,
        getter: getter,
        setter: setter
      });
      pubSub.publish('startAnimation', tweener);
    }));
  };
};

var withAnimatedProperty = function withAnimatedProperty(_ref3) {
  var name = _ref3.name,
      pubSub = _ref3.pubSub;

  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      initialValue = _ref4.initialValue,
      getter = _ref4.getter,
      setter = _ref4.setter,
      cloner = _ref4.cloner,
      transformer = _ref4.transformer,
      validator = _ref4.validator,
      duration = _ref4.duration,
      delay = _ref4.delay;

  return function (self) {
    return pipe(withProperty(name, {
      initialValue: initialValue,
      getter: getter,
      setter: setter,
      cloner: cloner,
      transformer: transformer,
      validator: validator
    }), addAnimation({
      name: name,
      pubSub: pubSub
    }, {
      duration: duration,
      delay: delay
    }))(self);
  };
};

var withDestroy$1 = function withDestroy(container) {
  return function (self) {
    return assign(self, {
      destroy: function destroy() {
        return container.destroy();
      }
    });
  };
};

var withMoveTo = function withMoveTo() {
  return function (self) {
    return assign(self, {
      moveTo: function moveTo(x, y) {
        if (!Number.isNaN(+x) && !Number.isNaN(+y)) {
          self.displayObject.x = x;
          self.displayObject.y = y;
        }
      }
    });
  };
};

var withInteractivity = function withInteractivity(pubSub) {
  return function (self) {
    return assign(self, {
      pointerOverHandler: function pointerOverHandler() {
        pubSub.publish('itemOver', {
          item: self
        });
      },
      pointerOutHandler: function pointerOutHandler() {
        pubSub.publish('itemOut', {
          item: self
        });
      },
      disableInteractivity: function disableInteractivity() {
        self.displayObject.interactive = false;
        self.displayObject.buttonMode = false;
        self.displayObject.off('pointerover', self.pointerOverHandler);
        self.displayObject.off('pointerout', self.pointerOutHandler);
      },
      enableInteractivity: function enableInteractivity() {
        self.displayObject.interactive = true;
        self.displayObject.buttonMode = true;
        self.displayObject.on('pointerover', self.pointerOverHandler);
        self.displayObject.on('pointerout', self.pointerOutHandler);
      }
    });
  };
};

var createPileItem = function createPileItem(_ref) {
  var image = _ref.image,
      item = _ref.item,
      pubSub = _ref.pubSub;
  var container = new Container(); // eslint-disable-next-line no-underscore-dangle

  container.__pilingjs__item = item; // Dirty: for quick access in pile.js

  var replaceImage = function replaceImage(newImage) {
    // eslint-disable-next-line no-param-reassign
    image = newImage;
    container.removeChildren();
    container.addChild(image.displayObject);
  };

  var withPublicMethods = function withPublicMethods() {
    return function (self) {
      return assign(self, {
        replaceImage: replaceImage
      });
    };
  };

  var init = function init(self) {
    self.displayObject.addChild(self.image.displayObject);
    self.enableInteractivity();
    return self;
  };

  return init(pipe(withStaticProperty('displayObject', container), withReadOnlyProperty('x', function () {
    return container.x;
  }), withReadOnlyProperty('y', function () {
    return container.y;
  }), withStaticProperty('id', item.id), withReadOnlyProperty('image', function () {
    return image;
  }), withStaticProperty('item', item), withAnimatedProperty({
    name: 'opacity',
    pubSub: pubSub
  }, {
    getter: function getter() {
      return container.alpha;
    },
    setter: function setter(newAlpha) {
      container.alpha = newAlpha;
    }
  }), withDestroy$1(container), withMoveTo(), withInteractivity(pubSub), withPublicMethods(), withConstructor(createPileItem))({}));
};

var MAX_MAGNIFICATION = 3;
var MODE_NORMAL = Symbol('Normal');
var MODE_HOVER = Symbol('Hover');
var MODE_FOCUS = Symbol('Focus');
var MODE_ACTIVE = Symbol('Active');
var modeToString = new Map();
modeToString.set(MODE_NORMAL, '');
modeToString.set(MODE_HOVER, 'Hover');
modeToString.set(MODE_FOCUS, 'Focus');
modeToString.set(MODE_ACTIVE, 'Active');

var alignToXMod = function alignToXMod(align) {
  switch (align) {
    case 'left':
      return 0;

    case 'right':
      return 1;

    default:
      return 0.5;
  }
};

var alignToYMod = function alignToYMod(align) {
  switch (align) {
    case 'top':
      return 0;

    case 'bottom':
      return 1;

    default:
      return 0.5;
  }
};
/**
 * Factory function to create a pile
 * @param {object}   options - The options
 * @param {object}   options.initialItems - The initial set of item
 * @param {function} options.render - Render withRaf function
 * @param {number}   options.id - Pile identifier
 * @param {object}   options.pubSub - Local pubSub instance
 * @param {object}   options.store - Redux store
 */


var createPile = function createPile(_ref) {
  var render = _ref.render,
      id = _ref.id,
      pubSub = _ref.pubSub,
      store = _ref.store,
      badgeFactory = _ref.badgeFactory;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$x = _ref2.x,
      initialX = _ref2$x === void 0 ? 0 : _ref2$x,
      _ref2$y = _ref2.y,
      initialY = _ref2$y === void 0 ? 0 : _ref2$y;

  var allItems = [];
  var normalItemIndex = new Map();
  var previewItemIndex = new Map();
  var normalItemIdIndex = new Map();
  var previewItemIdIndex = new Map();
  var newItems = new Set();
  var rootContainer = new Container();
  var borderGraphics = new Graphics();
  var contentContainer = new Container();
  var borderedContentContainer = new Container();
  var normalItemContainer = new Container();
  var previewItemContainer = new Container();
  var coverContainer = new Container();
  var hoverItemContainer = new Container();
  var tempDepileContainer = new Container();
  var hoverPreviewContainer = new Container();
  var createPileBBox = createBBox({
    id: id
  });
  var bBox = createPileBBox();
  var anchorBox = createPileBBox();
  var cover;
  var whenCover;
  var previewItemId;
  var isFocus = false;
  var isTempDepiled = false;
  var isPositioning = false;
  var isScaling = false;
  var isMoving = false;
  var baseOffsetRelatedScaleFactor = -1;
  var baseOffset = [0, 0];
  var mode = MODE_NORMAL;
  var baseScale = 1;
  var zoomScale = 1;
  var magnification = 1;
  var pubSubSubscribers = [];
  var hoverItemSubscriber;
  var hoverItemEndSubscriber;

  var destroy = function destroy() {
    if (previousSizeBadge) previousSizeBadge.destroy();
    rootContainer.destroy();
    pubSubSubscribers.forEach(function (subscriber) {
      pubSub.unsubscribe(subscriber);
    });
  };

  var clonePileItemSprite = function clonePileItemSprite(pileItem) {
    var clonedSprite = cloneSprite(pileItem.item.image.displayObject);

    if (cover) {
      clonedSprite.x = coverContainer.x;
      clonedSprite.y = coverContainer.y;
    } else {
      clonedSprite.x = pileItem.displayObject.x;
      clonedSprite.y = pileItem.displayObject.y;
    }

    clonedSprite.angle = pileItem.displayObject.angle;
    return clonedSprite;
  }; // eslint-disable-next-line no-shadow


  var itemOverHandler = function itemOverHandler(_ref3) {
    var item = _ref3.item;

    if (isFocus) {
      if (!rootContainer.isDragging) {
        var clonedSprite = clonePileItemSprite(item);
        hoverItemContainer.addChild(clonedSprite);
        coverContainer.visible = false;
        previewItemId = item.id;

        if (hasPreviewItem(item)) {
          var _store$state = store.state,
              previewBorderColor = _store$state.previewBorderColor,
              previewBorderOpacity = _store$state.previewBorderOpacity,
              items = _store$state.items;
          var index = allItems.indexOf(item);
          var borderColor = getItemProp(previewBorderColor, items[item.id], index);
          var borderOpacity = getItemProp(previewBorderOpacity, items[item.id], index);
          item.image.setBackgroundColor(getForegroundColor(borderColor));
          item.image.setBackgroundOpacity(borderOpacity);
          item.image.rescaleBackground(true);
          hoverPreviewContainer.addChild(item.displayObject);
        }

        render();
      }
    }
  };

  var getBackgroundColor = function getBackgroundColor() {
    var _store$state2 = store.state,
        pileBackgroundColor = _store$state2.pileBackgroundColor,
        piles = _store$state2.piles,
        darkMode = _store$state2.darkMode;
    var backgroundColor = getPileProp(pileBackgroundColor, piles[id]);
    if (backgroundColor !== null) return backgroundColor;
    return darkMode ? BLACK : WHITE;
  };

  var getForegroundColor = function getForegroundColor(color) {
    if (color !== null) return color;
    return store.state.darkMode ? WHITE : BLACK;
  };

  var itemOutHandler = function itemOutHandler(_ref4) {
    var item = _ref4.item;

    if (isFocus) {
      coverContainer.visible = true;

      while (hoverItemContainer.children.length) {
        hoverItemContainer.removeChildAt(0);
      }

      if (hasPreviewItem(item)) {
        var _store$state3 = store.state,
            previewBackgroundColor = _store$state3.previewBackgroundColor,
            previewBackgroundOpacity = _store$state3.previewBackgroundOpacity,
            pileBackgroundOpacity = _store$state3.pileBackgroundOpacity,
            items = _store$state3.items,
            piles = _store$state3.piles;
        var index = allItems.indexOf(item);
        var pileBackgroundColor = getBackgroundColor();
        var backgroundColor = previewBackgroundColor === INHERIT ? pileBackgroundColor : getItemProp(previewBackgroundColor, items[item.id], index);
        var backgroundOpacity = previewBackgroundOpacity === INHERIT ? getPileProp(pileBackgroundOpacity, piles[id]) : getItemProp(previewBackgroundOpacity, items[item.id], index);
        item.image.setBackgroundColor(backgroundColor);
        item.image.setBackgroundOpacity(backgroundOpacity);
        previewItemContainer.addChild(item.displayObject);
      }

      render();
    }
  };

  var pileBounds = {
    drawCall: -1
  };
  var borderDrawCall = 0;

  var getContentBounds = function getContentBounds() {
    if (pileBounds.drawCall === borderDrawCall) return pileBounds;
    var borderBounds = borderGraphics.getBounds();
    var contentBounds = contentContainer.getBounds();
    pileBounds = {
      drawCall: borderDrawCall,
      x: contentBounds.x - borderBounds.x,
      y: contentBounds.y - borderBounds.y,
      width: contentBounds.width,
      height: contentBounds.height
    };
    return pileBounds;
  };

  var previousSize;
  var previousSizeBadge;

  var drawSizeBadge = function drawSizeBadge() {
    if (isPositioning) return;
    var _store$state4 = store.state,
        darkMode = _store$state4.darkMode,
        piles = _store$state4.piles,
        pileSizeBadgeAlign = _store$state4.pileSizeBadgeAlign;

    var _ref5 = isFunction(pileSizeBadgeAlign) ? pileSizeBadgeAlign(piles[id]) : pileSizeBadgeAlign,
        _ref6 = slicedToArray(_ref5, 2),
        yAlign = _ref6[0],
        xAlign = _ref6[1];

    var xMod = alignToXMod(xAlign);
    var yMod = alignToYMod(yAlign);
    var size = allItems.length;
    var newBadge = size !== previousSize;
    var sizeBadge = previousSizeBadge;

    if (newBadge) {
      sizeBadge = badgeFactory.create(size, {
        darkMode: darkMode
      });

      if (previousSize !== undefined) {
        rootContainer.removeChild(previousSizeBadge.displayObject);
        previousSizeBadge.destroy();
      }
    }

    var badgeRendering = function badgeRendering() {
      var bounds = getContentBounds();
      sizeBadge.displayObject.x = bounds.x - borderSizeBase + (bounds.width + 2 * borderSizeBase) * xMod;
      sizeBadge.displayObject.y = bounds.y - borderSizeBase + (bounds.height + 2 * borderSizeBase) * yMod;
      if (newBadge) rootContainer.addChild(sizeBadge.displayObject);
      previousSizeBadge = sizeBadge;
      previousSize = size;
      render();
    };

    if (normalItemContainer.children.length || coverContainer.children.length) {
      // Draw badge immediately
      badgeRendering();
    } else if (whenCover) {
      // Draw badge once the cover is rendered
      whenCover.then(badgeRendering);
    }
  };

  var isShowSizeBadge = false;

  var showSizeBadge = function showSizeBadge(show) {
    isShowSizeBadge = show;

    if (isShowSizeBadge) {
      drawSizeBadge();
    } else if (previousSizeBadge) {
      rootContainer.removeChild(previousSizeBadge.displayObject);
      previousSizeBadge.destroy();
      previousSize = undefined;
    }
  };

  var borderSizeBase = 0;

  var setBorderSize = function setBorderSize(newBorderSize) {
    borderSizeBase = +newBorderSize;

    if (whenCover) {
      drawBorder(); // Wait until the cover is rendered

      whenCover.then(function () {
        drawBorder();
      });
    } else {
      drawBorder();
    }
  };

  var getBorderSize = function getBorderSize() {
    switch (mode) {
      case MODE_HOVER:
      case MODE_FOCUS:
        return borderSizeBase || 1;

      case MODE_ACTIVE:
        return borderSizeBase || 2;

      case MODE_NORMAL:
      default:
        return borderSizeBase;
    }
  };

  var getBackgroundOpacity = function getBackgroundOpacity() {
    var _store$state5 = store.state,
        pileBackgroundOpacityHover = _store$state5.pileBackgroundOpacityHover,
        piles = _store$state5.piles;
    var backgroundOpacity = getPileProp(store.state["pileBackgroundOpacity".concat(modeToString.get(mode) || '')], piles[id]);
    if (backgroundOpacity === null) backgroundOpacity = getPileProp(pileBackgroundOpacityHover, piles[id]);
    return backgroundOpacity;
  };

  var drawBorder = function drawBorder() {
    ++borderDrawCall;
    var size = getBorderSize();
    var backgroundOpacity = getBackgroundOpacity();

    if (!size && !backgroundOpacity) {
      borderGraphics.clear();
      return;
    }

    if (isPositioning) {
      postPilePositionAnimation.set('drawBorder', function () {
        drawBorder();
      });
      return;
    }

    borderGraphics.clear();
    var bounds = getContentBounds();
    var state = store.state;
    var borderOffset = Math.ceil(size / 2);
    var backgroundColor = getPileProp(state["pileBackgroundColor".concat(modeToString.get(mode) || '')], state.piles[id]);

    if (backgroundColor === null) {
      backgroundColor = getBackgroundColor();
    } // draw black background


    borderGraphics.beginFill(backgroundColor, backgroundOpacity);
    borderGraphics.drawRect(bounds.x - borderOffset, bounds.y - borderOffset, bounds.width + 2 * borderOffset, bounds.height + 2 * borderOffset);
    borderGraphics.endFill();
    var color = state["pileBorderColor".concat(modeToString.get(mode) || '')];
    var opacity = getPileProp(state["pileBorderOpacity".concat(modeToString.get(mode) || '')], state.piles[id]);
    color = isFunction(color) ? colorToDecAlpha(color(state.piles[id]))[0] : color; // draw border

    borderGraphics.lineStyle(size, color, opacity);
    borderGraphics.drawRect(bounds.x - borderOffset, bounds.y - borderOffset, bounds.width + 2 * borderOffset, bounds.height + 2 * borderOffset);
    if (isShowSizeBadge) drawSizeBadge();
    render();
  };

  var blur = function blur() {
    mode = MODE_NORMAL;
    drawBorder();
  };

  var hover = function hover() {
    if (mode === MODE_HOVER) return;
    mode = MODE_HOVER;
    drawBorder();
  };

  var focus = function focus() {
    if (mode === MODE_FOCUS) return;
    mode = MODE_FOCUS;
    drawBorder();
  };

  var active = function active() {
    if (mode === MODE_ACTIVE) return;
    mode = MODE_ACTIVE;
    drawBorder();
  };

  var isHover = false;

  var onPointerOver = function onPointerOver(event) {
    isHover = true;
    pubSub.publish('pileEnter', {
      target: store.state.piles[id],
      event: event
    });

    if (isFocus) {
      if (isTempDepiled) {
        active();
      } else {
        focus();
      }
    } else {
      hover();
    } // pubSub subscription for hoverItem


    if (!hoverItemSubscriber) {
      hoverItemSubscriber = pubSub.subscribe('itemOver', itemOverHandler);
      pubSubSubscribers.push(hoverItemSubscriber);
    }

    if (!hoverItemEndSubscriber) {
      hoverItemEndSubscriber = pubSub.subscribe('itemOut', itemOutHandler);
      pubSubSubscribers.push(hoverItemEndSubscriber);
    }
  };

  var onPointerOut = function onPointerOut(event) {
    if (rootContainer.isDragging) return;
    isHover = false;
    pubSub.publish('pileLeave', {
      target: store.state.piles[id],
      event: event
    });
    if (!isFocus) blur(); // pubSub unsubscription for hoverItem

    if (hoverItemSubscriber) {
      pubSub.unsubscribe(hoverItemSubscriber);
      hoverItemSubscriber = undefined;
    }

    if (hoverItemEndSubscriber) {
      pubSub.unsubscribe(hoverItemEndSubscriber);
      hoverItemEndSubscriber = undefined;
    }

    hoverItemContainer.removeChildren();
    render();
  };

  var dragMove;

  var onDragStart = function onDragStart(event) {
    if (event.data.button === 2) return; // first get the offset from the Pointer position to the current pile.x and pile.y
    // And store it (draggingMouseOffset = [x, y])

    rootContainer.draggingMouseOffset = [event.data.getLocalPosition(rootContainer.parent).x - rootContainer.x, event.data.getLocalPosition(rootContainer.parent).y - rootContainer.y];
    rootContainer.alpha = 1;
    rootContainer.isDragging = true;
    rootContainer.beforeDragX = rootContainer.x;
    rootContainer.beforeDragY = rootContainer.y;
    dragMove = false;
    pubSub.publish('pileDragStart', {
      target: store.state.piles[id],
      event: event
    });
  };

  var onDragEnd = function onDragEnd(event) {
    if (event.data.button === 2) return;
    if (!rootContainer.isDragging) return;
    rootContainer.alpha = 1;
    rootContainer.isDragging = false;
    rootContainer.draggingMouseOffset = null;

    if (dragMove) {
      pubSub.publish('pileDragEnd', {
        target: store.state.piles[id],
        event: event
      });
    }
  };

  var onDragMove = function onDragMove(event) {
    if (event.data.button === 2) return;

    if (rootContainer.isDragging) {
      dragMove = true;
      pubSub.publish('pileDragMove', {
        target: store.state.piles[id],
        event: event
      });

      var _event$data$getLocalP = event.data.getLocalPosition(rootContainer.parent),
          x = _event$data$getLocalP.x,
          y = _event$data$getLocalP.y;

      x -= rootContainer.draggingMouseOffset[0];
      y -= rootContainer.draggingMouseOffset[1];
      var size = getBorderSize();

      if (size % 2 === 1) {
        x = Math.floor(x) + 0.5;
        y = Math.floor(y) + 0.5;
      }

      if (isMoving) {
        moveToTweener.updateEndValue([x, y]);
      } else {
        rootContainer.x = x;
        rootContainer.y = y;
      }

      if (isTempDepiled) {
        active();
      } else {
        hover();
      }

      render();
    }
  };
  /**
   * Calculate the current anchor box of the pile
   * @return  {object}  Anchor bounding box
   */


  var calcAnchorBox = function calcAnchorBox() {
    var xOffset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var yOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var forceUpdate = arguments.length > 2 ? arguments[2] : undefined;
    var bounds;
    var localXOffset = 0;
    var localYOffset = 0;

    if (whenCover) {
      if (coverContainer.children.length) {
        bounds = coverContainer.getBounds(!forceUpdate);
      } else {
        // We're in the middle of updating the cover so lets return the
        // old anchor box for now.
        return anchorBox;
      }
    } else {
      bounds = normalItemContainer.getBounds(!forceUpdate);

      if (allItems.length > 1) {
        var firstItemBounds = allItems[0].displayObject.getBounds(!forceUpdate);
        localXOffset = bounds.x - firstItemBounds.x;
        localYOffset = bounds.y - firstItemBounds.y;
      }
    }

    return createPileBBox({
      localXOffset: localXOffset,
      localYOffset: localYOffset,
      minX: bounds.x - xOffset,
      minY: bounds.y - yOffset,
      maxX: bounds.x + bounds.width - xOffset,
      maxY: bounds.y + bounds.height - yOffset
    });
  };

  var updateAnchorBox = function updateAnchorBox(xOffset, yOffset, forceUpdate) {
    anchorBox = calcAnchorBox(xOffset, yOffset, forceUpdate);
  };
  /**
   * Compute the current bounding box of the pile
   * @return  {object}  Pile bounding box
   */


  var calcBBox = function calcBBox() {
    var xOffset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var yOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var forceUpdate = arguments.length > 2 ? arguments[2] : undefined;
    var bounds = borderedContentContainer.getBounds(!forceUpdate);
    return createPileBBox({
      minX: bounds.x - xOffset,
      minY: bounds.y - yOffset,
      maxX: bounds.x + bounds.width - xOffset,
      maxY: bounds.y + bounds.height - yOffset
    });
  };

  var updateBBox = function updateBBox(xOffset, yOffset, forceUpdate) {
    bBox = calcBBox(xOffset, yOffset, forceUpdate);
  };

  var updateBounds = function updateBounds(xOffset, yOffset, forceUpdate) {
    updateAnchorBox(xOffset, yOffset, forceUpdate);
    updateBBox(xOffset, yOffset, forceUpdate);
  };

  var getOpacity = function getOpacity() {
    return rootContainer.alpha;
  };

  var setOpacity = function setOpacity(newOpacity) {
    rootContainer.alpha = newOpacity;
  };

  var opacityTweener; // eslint-disable-next-line consistent-return

  var animateOpacity = function animateOpacity(newOpacity) {
    var d = Math.abs(newOpacity - getOpacity());

    if (d < 1 / 100) {
      setOpacity(newOpacity);
      return;
    }

    var duration = cubicOut(d) * 250;

    if (opacityTweener) {
      pubSub.publish('cancelAnimation', opacityTweener);

      if (opacityTweener.dt < opacityTweener.duration) {
        duration = opacityTweener.dt;
      }
    }

    opacityTweener = createTweener({
      duration: duration,
      delay: 0,
      interpolator: interpolateNumber,
      endValue: newOpacity,
      getter: getOpacity,
      setter: setOpacity
    });
    pubSub.publish('startAnimation', opacityTweener);
  };

  var setVisibilityItems = function setVisibilityItems(visibility) {
    normalItemContainer.visible = visibility;
    previewItemContainer.visible = visibility;
  }; // Map to store calls for after the pile position animation


  var postPilePositionAnimation = new Map();

  var animatePositionItems = function animatePositionItems(itemSprite, x, y, angle, animator, isLastOne) {
    var targetScale = itemSprite.tmpTargetScale || itemSprite.scale.x;
    itemSprite.tmpTargetScale = undefined;
    delete itemSprite.tmpTargetScale;
    var tweener = createTweener({
      duration: 250,
      interpolator: interpolateVector,
      endValue: [x, y, targetScale, angle],
      getter: function getter() {
        return [itemSprite.x, itemSprite.y, itemSprite.scale.x, itemSprite.angle];
      },
      setter: function setter(newValue) {
        itemSprite.x = newValue[0];
        itemSprite.y = newValue[1];
        itemSprite.scale.x = newValue[2];
        itemSprite.scale.y = newValue[2];
        itemSprite.angle = newValue[3];
      },
      onDone: function onDone() {
        itemSprite.tmpTargetScale = undefined;

        if (isLastOne) {
          isPositioning = false;
          drawBorder();
          drawLabel();
          postPilePositionAnimation.forEach(function (fn) {
            fn();
          });
          postPilePositionAnimation.clear();
          pubSub.publish('updatePileBounds', {
            id: id
          });
          if (isPlaceholderDrawn) removePlaceholder();
        }
      }
    });
    animator.add(tweener);
  };

  var setItemOrder = function setItemOrder(itemIds) {
    var itemIdToIndex = new Map();
    itemIds.forEach(function (itemId, index) {
      itemIdToIndex.set(itemId.toString(), index);
    });

    var sortFunc = function sortFunc(index) {
      return function (a, b) {
        var id1 = index.get(a);
        var id2 = index.get(b);
        return itemIdToIndex.get(id1) - itemIdToIndex.get(id2);
      };
    };

    normalItemContainer.children.sort(sortFunc(normalItemIdIndex));
    previewItemContainer.children.sort(sortFunc(previewItemIdIndex));
    allItems.sort(function (a, b) {
      return itemIdToIndex.get(a.id) - itemIdToIndex.get(b.id);
    });
  };

  var scalePreview = function scalePreview(previewItem, bounds) {
    var _store$state6 = store.state,
        piles = _store$state6.piles,
        previewScaleToCover = _store$state6.previewScaleToCover;
    var pileState = piles[id];

    var _ref7 = isFunction(previewScaleToCover) ? previewScaleToCover(pileState) : previewScaleToCover,
        _ref8 = slicedToArray(_ref7, 2),
        scaleWidthToCover = _ref8[0],
        scaleHeightToCover = _ref8[1];

    var applyScale = function applyScale(_bounds) {
      if (scaleWidthToCover === true) {
        var scaleFactor = _bounds.width / previewItem.width;
        previewItem.scale.x *= scaleFactor;
        if (scaleHeightToCover === 'auto') previewItem.scale.y *= scaleFactor;
      } else if (scaleHeightToCover === true) {
        var _scaleFactor = _bounds.height / previewItem.height;

        previewItem.scale.y *= _scaleFactor;
        if (scaleWidthToCover === 'auto') previewItem.scale.x *= _scaleFactor;
      } else if (scaleWidthToCover === true && scaleHeightToCover === true) {
        previewItem.scale.x *= _bounds.width / previewItem.width;
        previewItem.scale.y *= _bounds.height / previewItem.height;
      }
    };

    if (bounds) {
      applyScale(bounds);
    } else if (whenCover) {
      whenCover.then(applyScale);
    } else {
      applyScale(getContentBounds());
    }
  };

  var positionPreviews = function positionPreviews(animator) {
    var _store$state7 = store.state,
        piles = _store$state7.piles,
        previewAlignment = _store$state7.previewAlignment,
        previewItemOffset = _store$state7.previewItemOffset,
        previewOffset = _store$state7.previewOffset,
        previewSpacing = _store$state7.previewSpacing;
    var pileState = piles[id];
    whenCover.then(function (_cover) {
      var alignment = isFunction(previewAlignment) ? previewAlignment(pileState) : previewAlignment;
      var offset = isFunction(previewOffset) ? previewOffset(pileState) : previewOffset;
      var spacing = isFunction(previewSpacing) ? previewSpacing(pileState) : previewSpacing;
      offset = offset !== null ? offset : spacing / 2;
      var halfSpacing = spacing / 2;
      var halfWidth = _cover.width / 2;
      var halfHeight = _cover.height / 2;
      isPositioning = previewItemContainer.children.length > 0;
      var prevOffset = [0, 0];
      var prevSize = [0, 0];
      previewItemContainer.children.forEach(function (previewItem, index) {
        // eslint-disable-next-line no-underscore-dangle
        var item = previewItem.__pilingjs__item;
        var itemState = store.state.items[item.id];
        scalePreview(previewItem, _cover);
        var itemOffset;

        if (isFunction(previewItemOffset)) {
          itemOffset = previewItemOffset(itemState, index, pileState);
          itemOffset[0] = itemOffset[0] * _cover.scaleFactor - halfWidth;
          itemOffset[1] = itemOffset[1] * _cover.scaleFactor - halfHeight;
        } else {
          switch (alignment) {
            case 'left':
              itemOffset = [(index === 0) * (-halfWidth - offset) + prevOffset[0] - prevSize[0] / 2 - previewItem.width / 2 - halfSpacing, 0];
              break;

            case 'right':
              itemOffset = [(index === 0) * (halfWidth + offset) + prevOffset[0] + prevSize[0] / 2 + previewItem.width / 2 + halfSpacing, 0];
              break;

            case 'bottom':
              itemOffset = [0, (index === 0) * (halfHeight + offset) + prevOffset[1] + prevSize[1] / 2 + previewItem.height / 2 + halfSpacing];
              break;

            default:
            case 'top':
              itemOffset = [0, (index === 0) * (-halfHeight - offset) + prevOffset[1] - prevSize[1] / 2 - previewItem.height / 2 - halfSpacing];
              break;
          }

          prevOffset = toConsumableArray(itemOffset);
          prevSize = [previewItem.width, previewItem.height];
        }

        item.preview.setBackgroundOpacity(0);
        animatePositionItems(previewItem, itemOffset[0], itemOffset[1], 0, animator, index === previewItemContainer.children.length - 1);
      });
    });
  };

  var positionItems = function positionItems(animator, _ref9) {
    var _ref9$all = _ref9.all,
        all = _ref9$all === void 0 ? false : _ref9$all;
    var _store$state8 = store.state,
        piles = _store$state8.piles,
        pileItemOffset = _store$state8.pileItemOffset,
        pileItemRotation = _store$state8.pileItemRotation;
    var pileState = piles[id];

    if (whenCover && previewItemContainer.children.length) {
      positionPreviews(animator);
    } else if (normalItemContainer.children.length > 1) {
      if (!all) {
        if (newItems.size) {
          isPositioning = true; // newItems is a set, there is no index, so we're using a counter

          var count = 0;
          newItems.forEach(function (pileItem) {
            count++;
            var item = pileItem.item;
            var displayObject = pileItem.displayObject; // eslint-disable-next-line no-use-before-define

            var currentScale = getScale(); // When the scale of the source and target pile were different, we need
            // to equalize the scale.

            displayObject.tmpTargetScale = displayObject.scale.x;

            if (!Number.isNaN(+item.tmpRelScale)) {
              var relItemScale = item.tmpRelScale / currentScale;
              displayObject.scale.x *= relItemScale;
              displayObject.scale.y = displayObject.scale.x;
              delete item.tmpRelScale;
            }

            if (!Number.isNaN(+item.tmpAbsX) && !Number.isNaN(+item.tmpAbsY)) {
              pileItem.moveTo((pileItem.x + item.tmpAbsX - rootContainer.x) / currentScale, (pileItem.y + item.tmpAbsY - rootContainer.y) / currentScale);
              delete item.tmpAbsX;
              delete item.tmpAbsY;
            }

            var itemState = store.state.items[item.id];
            var itemIndex = allItems.indexOf(pileItem);
            var itemOffset = isFunction(pileItemOffset) ? pileItemOffset(itemState, itemIndex, pileState) : pileItemOffset.map(function (_offset) {
              return _offset * itemIndex;
            });
            var itemRotation = isFunction(pileItemRotation) ? pileItemRotation(itemState, itemIndex, pileState) : pileItemRotation;
            animatePositionItems(displayObject, itemOffset[0], itemOffset[1], itemRotation, animator, count === newItems.size);
          });
        } else if (isPlaceholderDrawn) removePlaceholder();
      } else {
        isPositioning = true;
        normalItemContainer.children.forEach(function (normalItem, index) {
          // eslint-disable-next-line no-underscore-dangle
          var item = normalItem.__pilingjs__item;
          var pileItem = normalItemIndex.get(item.id);
          var itemState = store.state.items[item.id];
          var itemIndex = allItems.indexOf(pileItem);
          var itemOffset = isFunction(pileItemOffset) ? pileItemOffset(itemState, itemIndex, pileState) : pileItemOffset.map(function (_offset) {
            return _offset * itemIndex;
          });
          var itemRotation = isFunction(pileItemRotation) ? pileItemRotation(itemState, itemIndex, pileState) : pileItemRotation;
          animatePositionItems(normalItem, itemOffset[0], itemOffset[1], itemRotation, animator, index === normalItemContainer.children.length - 1);
        });
      } // Cover without previews

    } else if (isPlaceholderDrawn) removePlaceholder();

    newItems.clear();
  };

  var scale = function scale() {
    var currentScale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : baseScale;
    contentContainer.scale.x = currentScale * zoomScale;
    contentContainer.scale.y = currentScale * zoomScale;
  };

  var getScale = function getScale() {
    return contentContainer.scale.x / zoomScale;
  };

  var setScale = function setScale(newScale) {
    var _ref10 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref10$isMagnificatio = _ref10.isMagnification,
        isMagnification = _ref10$isMagnificatio === void 0 ? false : _ref10$isMagnificatio;

    if (!isMagnification) baseScale = newScale;
    scale(newScale);
  };

  var scaleTweener;

  var animateScale = function animateScale(newScale) {
    var _ref11 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref11$isMagnificatio = _ref11.isMagnification,
        isMagnification = _ref11$isMagnificatio === void 0 ? false : _ref11$isMagnificatio,
        _ref11$onDone = _ref11.onDone,
        onDone = _ref11$onDone === void 0 ? toVoid : _ref11$onDone;

    var isSame = isClose(getScale(), newScale * zoomScale, 9);

    var done = function done() {
      drawBorder();
      drawLabel();
      if (!isSame) pubSub.publish('updatePileBounds', {
        id: id,
        forceUpdate: true
      });
      onDone();
    };

    var immideate = function immideate() {
      setScale(newScale, {
        isMagnification: isMagnification
      });
      done();
    };

    if (isClose(getScale(), newScale * zoomScale, 3)) {
      immideate();
      return;
    }

    if (!isMagnification) {
      baseScale = newScale;
    } // Current size


    var size = Math.max(bBox.width, bBox.height); // Size difference in pixel

    var d = Math.abs(newScale / getScale() * size - size);

    if (d < 2) {
      immideate();
      return;
    }

    isScaling = true;
    var duration = cubicOut(Math.min(d, 50) / 50) * 250;

    if (scaleTweener) {
      pubSub.publish('cancelAnimation', scaleTweener);

      if (scaleTweener.dt < scaleTweener.duration) {
        duration = scaleTweener.dt;
      }
    }

    scaleTweener = createTweener({
      duration: duration,
      delay: 0,
      interpolator: interpolateNumber,
      endValue: newScale,
      getter: getScale,
      setter: function setter(v) {
        setScale(v, {
          isMagnification: isMagnification
        });
        drawBorder();
      },
      onDone: function onDone() {
        isScaling = false;
        postPilePositionAnimation.forEach(function (fn) {
          return fn();
        });
        postPilePositionAnimation.clear();
        done();
      }
    });
    pubSub.publish('startAnimation', scaleTweener);
  };

  var magnifyByWheel = function magnifyByWheel(wheelDelta) {
    var force = Math.log(Math.abs(wheelDelta) + 1);
    var momentum = -Math.sign(wheelDelta) * force;
    var currentScale = getScale();
    var newScale = Math.min(Math.max(1, currentScale * (1 + 0.075 * momentum)), baseScale * MAX_MAGNIFICATION);
    magnification = newScale / baseScale;
    setScale(newScale, {
      isMagnification: true
    });
    return currentScale !== newScale;
  };

  var magnify = function magnify() {
    magnification = MAX_MAGNIFICATION;
    animateScale(baseScale * MAX_MAGNIFICATION, {
      isMagnification: true
    });
  };

  var unmagnify = function unmagnify() {
    magnification = 1;
    animateScale(baseScale, {
      isMagnification: true
    });
  };

  var moveToTweener;

  var getMoveToTweener = function getMoveToTweener(x, y) {
    var _ref12 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        easing = _ref12.easing,
        _ref12$onDone = _ref12.onDone,
        _onDone = _ref12$onDone === void 0 ? toVoid : _ref12$onDone;

    var d = l2PointDist(x, y, rootContainer.x, rootContainer.y);

    if (d < 3) {
      moveTo(x, y);
      if (d > EPS) pubSub.publish('updatePileBounds', {
        id: id
      });

      _onDone();

      return null;
    }

    isMoving = true;
    var duration = cubicOut(Math.min(d, 250) / 250) * 250;

    if (moveToTweener) {
      pubSub.publish('cancelAnimation', moveToTweener);

      if (moveToTweener.dt < moveToTweener.duration) {
        duration = moveToTweener.dt;
      }
    }

    return createTweener({
      duration: duration,
      delay: 0,
      easing: easing,
      interpolator: interpolateVector,
      endValue: [x, y],
      getter: function getter() {
        return [rootContainer.x, rootContainer.y];
      },
      setter: function setter(xy) {
        return moveTo(xy[0], xy[1]);
      },
      onDone: function onDone() {
        isMoving = false;
        pubSub.publish('updatePileBounds', {
          id: id
        });

        _onDone();
      }
    });
  };

  var animateMoveTo = function animateMoveTo(x, y) {
    var _ref13 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        easing = _ref13.easing,
        _ref13$onDone = _ref13.onDone,
        customOnDone = _ref13$onDone === void 0 ? toVoid : _ref13$onDone;

    return new Promise(function (resolve) {
      var onDone = function onDone() {
        resolve(store.state.piles[id]);
        enableInteractivity();
        customOnDone();
      };

      disableInteractivity();
      moveToTweener = getMoveToTweener(x, y, {
        easing: easing,
        onDone: onDone
      });
      if (moveToTweener) pubSub.publish('startAnimation', moveToTweener);
    });
  };

  var updateBaseOffset = function updateBaseOffset() {
    var firstImage = allItems[0].item.image;

    if (firstImage.scaleFactor !== baseOffsetRelatedScaleFactor) {
      baseOffsetRelatedScaleFactor = firstImage.scaleFactor;
      baseOffset = firstImage.center;
    }
  };

  var moveTo = function moveTo(x, y) {
    rootContainer.x = Math.round(x);
    rootContainer.y = Math.round(y);
    return Math.hypot(rootContainer.x - x, rootContainer.y - y) > EPS;
  };

  var replaceItemsImage = function replaceItemsImage() {
    var itemId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (itemId !== null) {
      // Just replace one item's image
      var pileItem = getItemById(itemId);

      if (hasNormalItem(pileItem)) {
        var newImage = pileItem.item.image;
        pileItem.replaceImage(newImage);
      } else if (hasPreviewItem(pileItem)) {
        var _newImage = pileItem.item.preview;

        if (_newImage) {
          pileItem.replaceImage(_newImage);
        } else {
          updateItemToNormal(pileItem.item);
        }
      }
    } else {
      normalItemIndex.forEach(function (pileItem) {
        pileItem.replaceImage(pileItem.item.image);
      });
      previewItemIndex.forEach(function (pileItem) {
        if (pileItem.item.preview) {
          pileItem.replaceImage(pileItem.item.preview);
        } else {
          updateItemToNormal(pileItem.item);
        }
      });
    }
  };

  var getItemById = function getItemById(itemId) {
    return normalItemIndex.get(itemId) || previewItemIndex.get(itemId);
  };

  var hasNormalItem = function hasNormalItem(item) {
    return normalItemIndex.has(item.id);
  };

  var hasPreviewItem = function hasPreviewItem(item) {
    return previewItemIndex.has(item.id);
  };

  var hasItem = function hasItem(item) {
    var _ref14 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref14$asPreview = _ref14.asPreview,
        asPreview = _ref14$asPreview === void 0 ? null : _ref14$asPreview;

    if (asPreview === false) return hasNormalItem(item);
    if (asPreview === true) return hasPreviewItem(item);
    return hasNormalItem(item) || hasPreviewItem(item);
  };

  var updateItemToNormal = function updateItemToNormal(item) {
    if (hasItem(item, {
      asPreview: false
    })) return;
    var currentItem = getItemById(item.id);
    var normalItem = createPileItem({
      image: item.image,
      item: item,
      pubSub: pubSub
    }); // Update the `allItems` array

    var index = allItems.indexOf(currentItem);
    allItems.splice(index, 1, normalItem); // Update the indices

    previewItemIdIndex["delete"](previewItemIndex.get(item.id).displayObject);
    normalItemIdIndex.set(normalItem.displayObject, item.id);
    previewItemIndex["delete"](item.id);
    normalItemIndex.set(item.id, normalItem); // Update the PIXI containers

    previewItemContainer.removeChildAt(previewItemContainer.getChildIndex(currentItem.displayObject));
    normalItemContainer.addChild(normalItem.displayObject);
  };

  var updateItemToPreview = function updateItemToPreview(item) {
    if (hasItem(item, {
      asPreview: true
    }) || !item.preview) return;
    var currentItem = getItemById(item.id);
    var previewItem = createPileItem({
      image: item.preview,
      item: item,
      pubSub: pubSub
    }); // Update the `allItems` array

    var index = allItems.indexOf(currentItem);
    allItems.splice(index, 1, previewItem); // Update the indices

    normalItemIdIndex["delete"](normalItemIndex.get(item.id).displayObject);
    previewItemIdIndex.set(previewItem.displayObject, item.id);
    normalItemIndex["delete"](item.id);
    previewItemIndex.set(item.id, previewItem); // Update the PIXI containers

    normalItemContainer.removeChildAt(normalItemContainer.getChildIndex(currentItem.displayObject));
    scalePreview(previewItem.displayObject);
    previewItemContainer.addChild(previewItem.displayObject);
  };

  var updateItem = function updateItem(item) {
    var _ref15 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref15$asPreview = _ref15.asPreview,
        asPreview = _ref15$asPreview === void 0 ? false : _ref15$asPreview;

    if (asPreview === true) updateItemToPreview(item);else updateItemToNormal(item);
  };

  var addNormalItem = function addNormalItem(item) {
    var normalItem = createPileItem({
      image: item.image,
      item: item,
      pubSub: pubSub
    });
    var numItems = allItems.push(normalItem);
    if (numItems > 1) newItems.add(normalItem);
    normalItemIndex.set(normalItem.id, normalItem);
    normalItemIdIndex.set(normalItem.displayObject, normalItem.id);
    normalItemContainer.addChild(normalItem.displayObject);
  };

  var addPreviewItem = function addPreviewItem(item) {
    if (!item.preview) return;
    var previewItem = createPileItem({
      image: item.preview,
      item: item,
      pubSub: pubSub
    });
    allItems.push(previewItem);
    newItems.add(previewItem);
    previewItemIndex.set(previewItem.id, previewItem);
    previewItemIdIndex.set(previewItem.displayObject, previewItem.id);
    scalePreview(previewItem.displayObject);
    previewItemContainer.addChild(previewItem.displayObject);
  };

  var addItem = function addItem(item) {
    var _ref16 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref16$asPreview = _ref16.asPreview,
        asPreview = _ref16$asPreview === void 0 ? false : _ref16$asPreview;

    if (hasItem(item)) {
      if (hasItem(item, {
        asPreview: !asPreview
      })) {
        updateItem(item, {
          asPreview: asPreview
        });
      }

      return;
    }

    if (asPreview) {
      addPreviewItem(item);
    } else {
      addNormalItem(item);
    }

    if (allItems.length === 1) updateBaseOffset();
  };

  var removeItem = function removeItem(item) {
    var pileItem = getItemById(item.id); // Remove from the `allItems` array

    var itemIdx = allItems.indexOf(pileItem);
    if (itemIdx >= 0) allItems.splice(itemIdx, 1); // Remove from the container

    if (hasItem(item, {
      asPreview: false
    })) {
      normalItemContainer.removeChildAt(normalItemContainer.getChildIndex(pileItem.displayObject));
      normalItemIdIndex["delete"](pileItem.displayObject);
    }

    if (hasItem(item, {
      asPreview: true
    })) {
      previewItemContainer.removeChildAt(previewItemContainer.getChildIndex(pileItem.displayObject));
      previewItemIdIndex["delete"](pileItem.displayObject);
    } // Delete the index


    normalItemIndex["delete"](item.id);
    previewItemIndex["delete"](item.id);
  };

  var removeAllItems = function removeAllItems() {
    normalItemContainer.removeChildren();
    previewItemContainer.removeChildren();
    allItems.splice(0, allItems.length);
    normalItemIndex.clear();
    previewItemIndex.clear();
    normalItemIdIndex.clear();
    previewItemIdIndex.clear();
  };
  /**
   * Set the items to the given list of items.
   *
   * @description
   * This function performs a D3-like enter-update-exit strategy by adding new
   * items and removing items that were on the pile before but are not present
   * in `items`
   *
   * @param  {array}  items  List of items
   */


  var setItems = function setItems(items) {
    var _ref17 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref17$asPreview = _ref17.asPreview,
        asPreview = _ref17$asPreview === void 0 ? false : _ref17$asPreview,
        _ref17$shouldDrawPlac = _ref17.shouldDrawPlaceholder,
        shouldDrawPlaceholder = _ref17$shouldDrawPlac === void 0 ? false : _ref17$shouldDrawPlac;

    if (shouldDrawPlaceholder) drawPlaceholder();
    var outdatedItems = mergeMaps(normalItemIndex, previewItemIndex); // Add new items

    items.forEach(function (item) {
      if (hasItem(item)) {
        // Item already exists so we remove it from `oldItems`
        outdatedItems["delete"](item.id);
        updateItem(item, {
          asPreview: asPreview
        });
      } else {
        // Add new items
        addItem(item, {
          asPreview: asPreview
        });
      }
    }); // Remove all the outdated items

    outdatedItems.forEach(function (item) {
      removeItem(item);
    });
  };

  var setCover = function setCover(newWhenCover) {
    if (!newWhenCover) {
      removeCover();
    } else {
      whenCover = newWhenCover;
      whenCover.then(function (newCover) {
        cover = newCover;

        while (coverContainer.children.length) {
          coverContainer.removeChildAt(0);
        }

        coverContainer.addChild(cover.displayObject);
        pubSub.publish('updatePileBounds', {
          id: id,
          forceUpdate: true
        });
        drawBorder();
      });
    }
  };

  var removeCover = function removeCover() {
    if (!cover) return;

    while (coverContainer.children.length) {
      coverContainer.removeChildAt(0);
    }

    cover = undefined;
    whenCover = undefined;
  };

  var labelGraphics;
  var pileLabels = [];
  var labelColors = [];
  var labelTextures = [];
  var labelScaleFactors = [];

  var drawLabel = function drawLabel() {
    var labels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : pileLabels;
    var colors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : labelColors;
    var textures = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : labelTextures;
    var scaleFactors = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : labelScaleFactors;

    if (!labels.length) {
      if (labelGraphics) {
        pileLabels = [];
        labelColors = [];
        labelTextures = [];
        labelGraphics.clear();
        labelGraphics.removeChildren();
        render();
      }

      return;
    }

    pileLabels = labels;
    labelColors = colors;
    labelTextures = textures;
    labelScaleFactors = scaleFactors;
    if (isPositioning || isScaling) return;

    if (!labelGraphics) {
      labelGraphics = new Graphics();
      rootContainer.addChild(labelGraphics);
    } else {
      labelGraphics.clear();
      labelGraphics.removeChildren();
    }

    var _store$state9 = store.state,
        pileLabelHeight = _store$state9.pileLabelHeight,
        pileLabelAlign = _store$state9.pileLabelAlign,
        pileLabelFontSize = _store$state9.pileLabelFontSize,
        pileLabelStackAlign = _store$state9.pileLabelStackAlign,
        pileLabelText = _store$state9.pileLabelText,
        pileLabelTextOpacity = _store$state9.pileLabelTextOpacity,
        piles = _store$state9.piles;
    var labelAlign = getPileProp(pileLabelAlign, piles[id]);
    var labelFontSize = getPileProp(pileLabelFontSize, piles[id]);
    var labelStackAlign = getPileProp(pileLabelStackAlign, piles[id]);
    var labelHeight = getPileProp(pileLabelHeight, piles[id]);
    var bounds = getContentBounds();
    var showText = isFunction(pileLabelText) ? pileLabelText(piles[id]) : pileLabelText;
    var labelWidth = bounds.width / labels.length;
    var labelHeightMax = labelTextures.length ? Math.max(showText * (labelFontSize + 1), labelHeight) : labelHeight;
    var y = labelAlign === 'top' ? bounds.y - labelHeightMax : bounds.y + bounds.height;
    var toTop = 1 + (y < 0) * -2;
    labels.forEach(function (label, index) {
      var _labelGraphics;

      var labelX;
      var labelY = y + toTop;
      var finalLabelHeight = labelHeightMax;

      switch (labelStackAlign) {
        case 'vertical':
          labelWidth = bounds.width * scaleFactors[index];
          labelX = -bounds.width / 2;
          labelY += (finalLabelHeight + 1) * index * toTop;
          break;

        case 'horizontal':
        default:
          labelX = labelWidth * index - bounds.width / 2;
          finalLabelHeight = labelHeightMax * scaleFactors[index];
          if (labelAlign === 'top') labelY += labelHeightMax - finalLabelHeight;
          break;
      }

      var color = colors[index];

      (_labelGraphics = labelGraphics).beginFill.apply(_labelGraphics, toConsumableArray(color));

      labelGraphics.drawRect(labelX, labelY, labelWidth, finalLabelHeight);
      labelGraphics.endFill();
    });

    if (showText) {
      var textWidth = bounds.width / labelTextures.length;
      labelTextures.forEach(function (texture, index) {
        var labelText = new Sprite(texture);
        labelText.y = y + toTop;

        switch (labelStackAlign) {
          case 'vertical':
            labelText.anchor.set(0, 0);
            labelText.x = -bounds.width / 2 + 2;
            labelText.y += (labelHeightMax + 1) * index * toTop;
            break;

          case 'horizontal':
          default:
            labelText.anchor.set(0.5, 0);
            labelText.x = textWidth * index - bounds.width / 2 + textWidth / 2;
            break;
        }

        labelText.width /= 2 * window.devicePixelRatio;
        labelText.height /= 2 * window.devicePixelRatio;
        labelText.alpha = pileLabelTextOpacity;
        labelGraphics.addChild(labelText);
      });
    }

    render();
  };

  var placeholderGfx;
  var isPlaceholderDrawn = false;

  var drawPlaceholder = function drawPlaceholder() {
    if (!placeholderGfx) {
      placeholderGfx = new Graphics();
      contentContainer.addChild(placeholderGfx);
    }

    var width = anchorBox.width / baseScale / zoomScale;
    var height = anchorBox.height / baseScale / zoomScale;
    var r = width / 12;
    var color = store.state.darkMode ? 0xffffff : 0x000000;
    placeholderGfx.lineStyle(0).beginFill(color, 1).drawCircle(-width / 4, 0, r).drawCircle(0, 0, r).drawCircle(width / 4, 0, r).endFill(); // Draw background

    placeholderGfx.beginFill(color, 0.1).drawRect(-width / 2, -height / 2, width, height).endFill();
    isPlaceholderDrawn = true;
    render();
  };

  var removePlaceholder = function removePlaceholder() {
    placeholderGfx.clear();
    isPlaceholderDrawn = false;
    render();
  };

  var setZoomScale = function setZoomScale(newZoomScale) {
    zoomScale = newZoomScale;
    scale();
  };

  var isInteractive = false;

  var disableInteractivity = function disableInteractivity() {
    if (!isInteractive) return;
    allItems.forEach(function (pileItem) {
      return pileItem.disableInteractivity();
    });
    rootContainer.interactive = false;
    rootContainer.buttonMode = false;
    tempDepileContainer.interactive = false;
    rootContainer.off('pointerover', onPointerOver).off('pointerout', onPointerOut).off('pointerdown', onDragStart).off('pointerup', onDragEnd).off('pointerupoutside', onDragEnd).off('pointermove', onDragMove);
    isInteractive = false;
  };

  var enableInteractivity = function enableInteractivity() {
    if (isInteractive) return;
    allItems.forEach(function (pileItem) {
      return pileItem.enableInteractivity();
    });
    rootContainer.interactive = true;
    rootContainer.buttonMode = true;
    tempDepileContainer.interactive = true;
    rootContainer.on('pointerover', onPointerOver).on('pointerout', onPointerOut).on('pointerdown', onDragStart).on('pointerup', onDragEnd).on('pointerupoutside', onDragEnd).on('pointermove', onDragMove);
    isInteractive = true;
  };

  var init = function init() {
    rootContainer.addChild(borderedContentContainer);
    borderedContentContainer.addChild(borderGraphics);
    borderedContentContainer.addChild(contentContainer);
    contentContainer.addChild(normalItemContainer);
    contentContainer.addChild(previewItemContainer);
    contentContainer.addChild(coverContainer);
    contentContainer.addChild(hoverItemContainer);
    contentContainer.addChild(tempDepileContainer);
    contentContainer.addChild(hoverPreviewContainer);
    rootContainer.x = initialX;
    rootContainer.y = initialY;
    enableInteractivity();
  };

  init();
  return {
    // Properties
    get anchorBox() {
      return anchorBox;
    },

    get baseScale() {
      return baseScale;
    },

    get bBox() {
      return bBox;
    },

    get cover() {
      return cover;
    },

    get graphics() {
      return rootContainer;
    },

    get contentContainer() {
      return contentContainer;
    },

    get height() {
      return borderedContentContainer.height;
    },

    get isFocus() {
      return isFocus;
    },

    set isFocus(newIsFocus) {
      isFocus = !!newIsFocus;
    },

    get isHover() {
      return isHover;
    },

    get isInteractive() {
      return isInteractive;
    },

    get isMagnified() {
      return magnification > 1;
    },

    get isTempDepiled() {
      return isTempDepiled;
    },

    set isTempDepiled(newIsTempDepiled) {
      isTempDepiled = !!newIsTempDepiled;
    },

    get normalItemContainer() {
      return normalItemContainer;
    },

    get offset() {
      return [(baseOffset[0] - anchorBox.localXOffset) * baseScale, (baseOffset[1] - anchorBox.localYOffset) * baseScale];
    },

    get previewItemContainer() {
      return previewItemContainer;
    },

    get previewItemId() {
      return previewItemId;
    },

    get items() {
      return [].concat(allItems);
    },

    get magnification() {
      return magnification;
    },

    get size() {
      return allItems.length;
    },

    get tempDepileContainer() {
      return tempDepileContainer;
    },

    get width() {
      return borderedContentContainer.width;
    },

    get x() {
      return rootContainer.x;
    },

    get y() {
      return rootContainer.y;
    },

    id: id,
    // Methods
    animateMoveTo: animateMoveTo,
    animateOpacity: animateOpacity,
    animateScale: animateScale,
    blur: blur,
    disableInteractivity: disableInteractivity,
    enableInteractivity: enableInteractivity,
    hover: hover,
    focus: focus,
    active: active,
    addItem: addItem,
    animatePositionItems: animatePositionItems,
    calcBBox: calcBBox,
    destroy: destroy,
    drawBorder: drawBorder,
    drawPlaceholder: drawPlaceholder,
    drawSizeBadge: drawSizeBadge,
    getMoveToTweener: getMoveToTweener,
    getItemById: getItemById,
    hasItem: hasItem,
    itemOverHandler: itemOverHandler,
    itemOutHandler: itemOutHandler,
    magnifyByWheel: magnifyByWheel,
    magnify: magnify,
    moveTo: moveTo,
    positionItems: positionItems,
    removeAllItems: removeAllItems,
    removePlaceholder: removePlaceholder,
    setBorderSize: setBorderSize,
    setItems: setItems,
    drawLabel: drawLabel,
    setCover: setCover,
    setScale: setScale,
    setOpacity: setOpacity,
    setVisibilityItems: setVisibilityItems,
    setItemOrder: setItemOrder,
    setZoomScale: setZoomScale,
    showSizeBadge: showSizeBadge,
    updateBounds: updateBounds,
    updateOffset: updateBaseOffset,
    replaceItemsImage: replaceItemsImage,
    unmagnify: unmagnify
  };
};

/**
 * @preserve
 * Fast, destructive implemetation of Liang-Barsky line clipping algorithm.
 * It clips a 2D segment by a rectangle.
 * @author Alexander Milevski <info@w8r.name>
 * @license MIT
 */
var EPSILON$1 = 1e-6;
var INSIDE = 1;
var OUTSIDE = 0;

function clipT(num, denom, c) {
  var tE = c[0],
      tL = c[1];
  if (Math.abs(denom) < EPSILON$1) return num < 0;
  var t = num / denom;

  if (denom > 0) {
    if (t > tL) return 0;
    if (t > tE) c[0] = t;
  } else {
    if (t < tE) return 0;
    if (t < tL) c[1] = t;
  }

  return 1;
}
/**
 * @param  {Point} a
 * @param  {Point} b
 * @param  {BoundingBox} box [xmin, ymin, xmax, ymax]
 * @param  {Point?} [da]
 * @param  {Point?} [db]
 * @return {number}
 */


function clip(a, b, box, da, db) {
  var x1 = a[0],
      y1 = a[1];
  var x2 = b[0],
      y2 = b[1];
  var dx = x2 - x1;
  var dy = y2 - y1;

  if (da === undefined || db === undefined) {
    da = a;
    db = b;
  } else {
    da[0] = a[0];
    da[1] = a[1];
    db[0] = b[0];
    db[1] = b[1];
  }

  if (Math.abs(dx) < EPSILON$1 && Math.abs(dy) < EPSILON$1 && x1 >= box[0] && x1 <= box[2] && y1 >= box[1] && y1 <= box[3]) {
    return INSIDE;
  }

  var c = [0, 1];

  if (clipT(box[0] - x1, dx, c) && clipT(x1 - box[2], -dx, c) && clipT(box[1] - y1, dy, c) && clipT(y1 - box[3], -dy, c)) {
    var tE = c[0],
        tL = c[1];

    if (tL < 1) {
      db[0] = x1 + tL * dx;
      db[1] = y1 + tL * dy;
    }

    if (tE > 0) {
      da[0] += tE * dx;
      da[1] += tE * dy;
    }

    return INSIDE;
  }

  return OUTSIDE;
}

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * Factory function to create a grid
 * @param {object} canvas - The canvas instance
 * @param {number} cellSize - The size of the cell
 * @param {number} columns - The number of column
 * @param {number} rowHeight - The height of row
 * @param {number} cellAspectRatio - The ratio of cell height and width
 * @param {number} cellPadding - The padding between items
 */

var createGrid = function createGrid(_ref) {
  var width = _ref.width,
      height = _ref.height,
      orderer = _ref.orderer;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$cellSize = _ref2.cellSize,
      cellSize = _ref2$cellSize === void 0 ? null : _ref2$cellSize,
      _ref2$columns = _ref2.columns,
      columns = _ref2$columns === void 0 ? 10 : _ref2$columns,
      _ref2$rowHeight = _ref2.rowHeight,
      rowHeight = _ref2$rowHeight === void 0 ? null : _ref2$rowHeight,
      _ref2$cellAspectRatio = _ref2.cellAspectRatio,
      cellAspectRatio = _ref2$cellAspectRatio === void 0 ? 1 : _ref2$cellAspectRatio,
      _ref2$pileCellAlignme = _ref2.pileCellAlignment,
      pileCellAlignment = _ref2$pileCellAlignme === void 0 ? 'topLeft' : _ref2$pileCellAlignme,
      _ref2$cellPadding = _ref2.cellPadding,
      cellPadding = _ref2$cellPadding === void 0 ? 0 : _ref2$cellPadding;

  var numColumns = columns;

  if (!+cellSize && !+columns) {
    numColumns = 10;
  }

  var columnWidth = width / numColumns;
  var cellWidth = columnWidth - cellPadding * 2;
  var cellHeight = null;

  if (+cellSize) {
    columnWidth = cellSize + cellPadding * 2;
    numColumns = Math.floor(width / columnWidth);
    cellWidth = cellSize;
  }

  if (!+rowHeight) {
    if (!+cellAspectRatio) {
      // eslint-disable-next-line no-param-reassign
      cellAspectRatio = 1;
    } // eslint-disable-next-line no-param-reassign


    rowHeight = columnWidth / cellAspectRatio;
  } else {
    // eslint-disable-next-line no-param-reassign
    cellAspectRatio = columnWidth / rowHeight;
  }

  cellHeight = rowHeight - cellPadding * 2;
  var columnWidthHalf = columnWidth / 2;
  var rowHeightHalf = rowHeight / 2;
  var cellDiameterWithPadding = l2Norm([columnWidthHalf, rowHeightHalf]);
  var numRows = Math.ceil(height / rowHeight);
  /**
   * Convert an i,j cell position to a linear index
   * @param   {number}  i  Row number
   * @param   {number}  j  Column number
   * @return  {number}  Index of the i,j-th cell
   */

  var ijToIdx = function ijToIdx(i, j) {
    return i * numColumns + j;
  };
  /**
   * Convert an index to the i,j cell position
   * @param   {number}  idx  Index of a cell
   * @return  {array}  Tuple with the i,j cell position
   */


  var idxToIj = orderer(numColumns);
  /**
   * Convert XY to IJ position
   * @param {number} x - X position
   * @param {number} y - Y position
   * @return {array} Tuple with rowNumber and column number, i.e., [i,j]
   */

  var xyToIj = function xyToIj(x, y) {
    return [Math.floor(y / rowHeight), Math.floor(x / columnWidth)];
  };
  /**
   * Convert the i,j cell position to an x,y pixel position
   * @param   {number}  i  Row number
   * @param   {number}  j  Column number
   * @param   {number}  width  Width of the pile to be positioned
   * @param   {number}  height  Height of the pile to be positioned
   * @return  {array}  Tuple representing the x,y position
   */


  var ijToXy = function ijToXy(i, j, pileWidth, pileHeight, pileOffset) {
    var top = i * rowHeight + cellPadding;
    var left = j * columnWidth + cellPadding;

    if (!pileWidth || !pileHeight) {
      return [left, top];
    } // Elements are positioned


    left += pileOffset[0];
    top += pileOffset[1];

    switch (pileCellAlignment) {
      case 'topRight':
        return [left + cellWidth - pileWidth, top];

      case 'bottomLeft':
        return [left, top + cellHeight - pileHeight];

      case 'bottomRight':
        return [left + cellWidth - pileWidth, top + cellHeight - pileHeight];

      case 'center':
        return [left + (cellWidth - pileWidth) / 2, top + (cellHeight - pileHeight) / 2];

      case 'topLeft':
      default:
        return [left, top];
    }
  };

  var idxToXy = function idxToXy(index, pileWidth, pileHeight, pileOffset) {
    return ijToXy.apply(void 0, toConsumableArray(idxToIj(index)).concat([pileWidth, pileHeight, pileOffset]));
  };
  /**
   * Convert the u,v position to an x,y pixel position
   * @param   {number}  u  Relative position of the canvas on the x-axis
   * @param   {number}  v  Relative position of the canvas on the y-axis
   * @return  {array}  Tuple representing the x,y position
   */


  var uvToXy = function uvToXy(u, v) {
    return [u * width, v * height];
  };

  var getPilePosByCellAlignment = function getPilePosByCellAlignment(pile) {
    var refX = 'minX';
    var refY = 'minY';

    switch (pileCellAlignment) {
      case 'topRight':
        refX = 'maxX';
        break;

      case 'bottomLeft':
        refY = 'maxY';
        break;

      case 'bottomRight':
        refX = 'maxX';
        refY = 'maxY';
        break;

      case 'center':
        refX = 'cX';
        refY = 'cY';
        break;
    }

    return [pile.anchorBox[refX], pile.anchorBox[refY]];
  };

  var align = function align(piles) {
    var cells = [];
    var conflicts = [];
    var pilePositions = new Map();
    piles.forEach(function (pile) {
      var _getPilePosByCellAlig = getPilePosByCellAlignment(pile),
          _getPilePosByCellAlig2 = slicedToArray(_getPilePosByCellAlig, 2),
          x = _getPilePosByCellAlig2[0],
          y = _getPilePosByCellAlig2[1];

      pilePositions.set(pile.id, _objectSpread$2(_objectSpread$2({
        id: pile.id
      }, pile.anchorBox), {}, {
        x: x,
        y: y,
        offset: pile.offset
      }));
    });

    var assignPileToCell = function assignPileToCell(pile) {
      // The +1 and -1 are to avoid floating point precision-related glitches
      var i1 = (pile.minY + 1) / rowHeight;
      var j1 = (pile.minX + 1) / columnWidth;
      var i2 = (pile.maxY - 1) / rowHeight;
      var j2 = (pile.maxX - 1) / columnWidth;
      var i;
      var j;

      switch (pileCellAlignment) {
        case 'topRight':
          j = Math.floor(j2);
          break;

        case 'bottomLeft':
          i = Math.floor(i2);
          break;

        case 'bottomRight':
          i = Math.floor(i2);
          j = Math.floor(j2);
          break;

        case 'center':
          i = Math.floor(i1 + (i2 - i1) / 2);
          j = Math.floor(j1 + (j2 - j1) / 2);
          break;

        case 'topLeft':
        default:
          i = Math.floor(i1);
          j = Math.floor(j1);
          break;
      }

      var idx = ijToIdx(i, j);
      if (!cells[idx]) cells[idx] = new Set();

      if (cells[idx].size === 1) {
        conflicts.push(idx);
      }

      cells[idx].add(pile.id);
      return [i, j];
    }; // 1. We assign every pile to its closest cell


    pilePositions.forEach(function (pile) {
      var _assignPileToCell = assignPileToCell(pile),
          _assignPileToCell2 = slicedToArray(_assignPileToCell, 2),
          i = _assignPileToCell2[0],
          j = _assignPileToCell2[1];

      pilePositions.set(pile.id, _objectSpread$2(_objectSpread$2({}, pile), {}, {
        i: i,
        j: j
      }));
    }); // 2. Resolve conflicts

    var _loop = function _loop() {
      var idx = conflicts.shift();
      var anchor = ijToXy.apply(void 0, toConsumableArray(idxToIj(idx)));
      var cellRect = [anchor[0], anchor[1], anchor[0] + columnWidth, anchor[1] + rowHeight];
      anchor[0] += columnWidthHalf;
      anchor[1] += rowHeightHalf;
      var conflictingPiles = new Set(cells[idx]);
      var dist = l1PointDist; // 2a. Determine anchor point. For that we check if the top, left, or right
      // cell is empty

      var topIdx = idx - numColumns;
      var isTopBlocked = topIdx < 0 || cells[topIdx] && cells[topIdx].size;
      var leftIdx = idx - 1;
      var isLeftBlocked = leftIdx < 0 || idx % numColumns === 0 || cells[leftIdx] && cells[leftIdx].size;
      var rightIdx = idx + 1;
      var isRightBlocked = rightIdx % numColumns === 0 || cells[rightIdx] && cells[rightIdx].size;

      var x = function x(a) {
        return a;
      };

      var y = function y(a) {
        return a;
      };

      if (isTopBlocked) {
        anchor[1] -= rowHeightHalf;

        y = function y(a) {
          return Math.max(0, a);
        };
      }

      if (isLeftBlocked) {
        anchor[0] -= columnWidthHalf;

        x = function x(a) {
          return Math.max(0, a);
        };
      }

      if (isRightBlocked) {
        anchor[0] += columnWidthHalf;
        x = isLeftBlocked ? function () {
          return 0;
        } : function (a) {
          return Math.min(0, a);
        };
      }

      if (isLeftBlocked && isRightBlocked) {
        // To avoid no movement at all we enforce a up- or downward direction
        y = function y() {
          return isTopBlocked ? 1 : -1;
        }; // Only the vertical distance should count now


        if (isTopBlocked) dist = function dist(x1, y1, x2, y2) {
          return Math.abs(y1 - y2);
        };
      }

      if (isTopBlocked && isLeftBlocked && isRightBlocked) {
        // To avoid no movement at all we enforce a up- or downward direction
        y = function y() {
          return isTopBlocked ? 1 : -1;
        };
      } // 2b. Find the pile that is closest to the anchor


      var d = Infinity;
      var closestPile = void 0;
      conflictingPiles.forEach(function (pileId) {
        var pile = pilePositions.get(pileId);
        var newD = dist(pile.x, pile.y, anchor[0], anchor[1]);

        if (newD < d) {
          closestPile = pileId;
          d = newD;
        }
      }); // 2c. Remove the cell assignment of conflicting piles

      conflictingPiles.forEach(function (pileId) {
        if (pileId === closestPile) return; // Remove pile from cell

        cells[idx]["delete"](pileId);
      }); // 2d. Move all piles except for the closest pile to other cells

      conflictingPiles.forEach(function (pileId) {
        if (pileId === closestPile) return;
        var pile = pilePositions.get(pileId); // Move piles in direction from the closest via themselves

        var direction = [pile.x - pilePositions.get(closestPile).x, pile.y - pilePositions.get(closestPile).y];
        direction[0] += (Math.sign(direction[0]) || 1) * Math.random();
        direction[1] += (Math.sign(direction[1]) || 1) * Math.random();
        direction = normalize([x(direction[0]), y(direction[1])]); // Move the pile in direction `direction` to the cell border
        // We accomplish this by clipping a line starting at the pile
        // position that goes outside the cell.

        var outerPoint = [pile.x + cellDiameterWithPadding * direction[0], pile.y + cellDiameterWithPadding * direction[1]];
        var borderPoint = [].concat(outerPoint);
        clip([pile.x, pile.y], borderPoint, cellRect); // To avoid that the pile is moved back to the same pile we move it a
        // little bit further

        borderPoint[0] += Math.sign(direction[0]) * 0.1;
        borderPoint[1] += Math.sign(direction[1]) * 0.1; // "Move" pile to the outerPoint, which is now the borderPoint

        var dX = borderPoint[0] - pile.x;
        var dY = borderPoint[1] - pile.y;
        pile.minX += dX;
        pile.minY += dY;
        pile.maxX += dX;
        pile.maxY += dY;
        pile.cX += dX;
        pile.cY += dY;
        pile.x += dX;
        pile.y += dY; // Assign the pile to a new cell

        var _assignPileToCell3 = assignPileToCell(pile),
            _assignPileToCell4 = slicedToArray(_assignPileToCell3, 2),
            i = _assignPileToCell4[0],
            j = _assignPileToCell4[1];

        pilePositions.set(pileId, _objectSpread$2(_objectSpread$2({}, pile), {}, {
          i: i,
          j: j
        }));
      });
    };

    while (conflicts.length) {
      _loop();
    }

    return Array.from(pilePositions.entries(), function (_ref3) {
      var _ref4 = slicedToArray(_ref3, 2),
          id = _ref4[0],
          _ref4$ = _ref4[1],
          i = _ref4$.i,
          j = _ref4$.j;

      var _ijToXy = ijToXy(i, j, pilePositions.get(id).width, pilePositions.get(id).height, pilePositions.get(id).offset),
          _ijToXy2 = slicedToArray(_ijToXy, 2),
          x = _ijToXy2[0],
          y = _ijToXy2[1];

      return {
        id: id,
        x: x,
        y: y
      };
    });
  };

  return {
    // Properties
    get numRows() {
      return numRows;
    },

    set numRows(newNumRows) {
      if (!Number.isNaN(+newNumRows)) numRows = newNumRows;
    },

    numColumns: numColumns,
    columnWidth: columnWidth,
    rowHeight: rowHeight,
    cellWidth: cellWidth,
    cellHeight: cellHeight,
    cellAspectRatio: cellAspectRatio,
    cellPadding: cellPadding,
    width: width,
    height: height,
    // Methods
    align: align,
    getPilePosByCellAlignment: getPilePosByCellAlignment,
    ijToXy: ijToXy,
    ijToIdx: ijToIdx,
    idxToIj: idxToIj,
    idxToXy: idxToXy,
    uvToXy: uvToXy,
    xyToIj: xyToIj
  };
};

/**
 * Factory function to create an item
 * @param {number} id - Item identifier
 * @param {object} texture - The PIXI.Texture object of the item
 * @param {object} preview - The PIXI.Graphics object of the item preview
 */

var createItem = function createItem(_ref) {
  var id = _ref.id,
      image = _ref.image;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$preview = _ref2.preview,
      preview = _ref2$preview === void 0 ? null : _ref2$preview,
      _ref2$originalPositio = _ref2.originalPosition,
      originalPosition = _ref2$originalPositio === void 0 ? [0, 0] : _ref2$originalPositio;

  var withDestroy = function withDestroy() {
    return function (self) {
      return assign(self, {
        destroy: function destroy() {
          if (image) image.destroy();
          if (preview) preview.destroy();
        }
      });
    };
  };

  var replaceImage = function replaceImage(newImage) {
    var newPreview = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    image.destroy(); // eslint-disable-next-line no-param-reassign

    image = newImage;

    if (preview) {
      preview.destroy(); // eslint-disable-next-line no-param-reassign

      preview = null;
    } // eslint-disable-next-line no-param-reassign


    preview = newPreview;
  };

  var withPublicMethods = function withPublicMethods() {
    return function (self) {
      return assign(self, {
        replaceImage: replaceImage
      });
    };
  };

  return pipe(withStaticProperty('id', id), withReadOnlyProperty('image', function () {
    return image;
  }), withReadOnlyProperty('preview', function () {
    return preview;
  }), withProperty('originalPosition', {
    initialValue: originalPosition,
    cloner: function cloner(v) {
      return toConsumableArray(v);
    }
  }), withDestroy(), withPublicMethods(), withConstructor(createItem))({});
};

var createParser_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  function createParser(matcher, replacer) {
    const regex = RegExp(matcher, 'g');
    return string => {
      // * throw an error if not a string
      if (typeof string !== 'string') {
        throw new TypeError("expected an argument of type string, but got ".concat(typeof styleObj));
      } // * if no match between string and matcher


      if (!string.match(regex)) {
        return string;
      } // * executes the replacer function for each match
      // ? replacer can take any arguments valid for String.prototype.replace


      return string.replace(regex, replacer);
    };
  }

  var _default = createParser;
  exports["default"] = _default;
});

var parsers = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.snakeToKebab = exports.camelToKebab = void 0;

  var _createParser = _interopRequireDefault(createParser_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  const camelToKebab = (0, _createParser["default"])(/[A-Z]/, match => "-".concat(match.toLowerCase()));
  exports.camelToKebab = camelToKebab;
  const snakeToKebab = (0, _createParser["default"])(/_/, () => '-'); // disabled to allow named exports while only one named export exists
  // eslint-disable-next-line

  exports.snakeToKebab = snakeToKebab;
});

var objToString_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  function objToString(styleObj, parser = parsers.camelToKebab) {
    if (!styleObj || typeof styleObj !== 'object' || Array.isArray(styleObj)) {
      throw new TypeError("expected an argument of type object, but got ".concat(typeof styleObj));
    }

    const lines = Object.keys(styleObj).map(property => "".concat(parser(property), ": ").concat(styleObj[property], ";"));
    return lines.join('\n');
  }

  var _default = objToString;
  exports["default"] = _default;
});

var dist = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "createParser", {
    enumerable: true,
    get: function get() {
      return _createParser["default"];
    }
  });
  exports.parsers = exports["default"] = void 0;

  var _objToString = _interopRequireDefault(objToString_1);

  var _createParser = _interopRequireDefault(createParser_1);

  var parsers$1 = _interopRequireWildcard(parsers);

  exports.parsers = parsers$1;

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

            if (desc.get || desc.set) {
              Object.defineProperty(newObj, key, desc);
            } else {
              newObj[key] = obj[key];
            }
          }
        }
      }

      newObj["default"] = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

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

  var _default = _objToString["default"];
  exports["default"] = _default;
  module.exports = _objToString["default"];
  module.exports.createParser = _createParser["default"];
  module.exports.parsers = _objectSpread({}, parsers$1);
});
var styleToCss = /*@__PURE__*/unwrapExports(dist);

var STYLES_ROOT = {
  position: 'absolute',
  zIndex: 2,
  display: 'none'
};
var STYLES_UL = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  borderRadius: '0.25rem',
  backgroundColor: 'white',
  boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.25), 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 2px 6px 0 rgba(0, 0, 0, 0.075)'
};
var STYLES_BUTTON = {
  width: '100%',
  height: '1.5rem',
  margin: 0,
  padding: '0.25rem 0.5rem',
  fontSize: '0.85rem',
  color: 'black',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  outline: 'none',
  whiteSpace: 'nowrap'
};
var STYLES_BUTTON_HOVER = {
  backgroundColor: '#ff7ff6'
};
var STYLES_BUTTON_ACTIVE = {
  backgroundColor: '#dd33ff'
};
var STYLES_BUTTON_INACTIVE = {
  cursor: 'default',
  opacity: 0.3,
  backgroundColor: 'transparent !important'
};
var STYLES_FIRST_BUTTON = {
  borderRadius: '0.25rem 0.25rem 0 0'
};
var STYLES_LAST_BUTTON = {
  borderRadius: '0 0 0.25rem 0.25rem'
};
var STYLES = {
  root: STYLES_ROOT,
  ul: STYLES_UL,
  button: STYLES_BUTTON,
  'button:hover': STYLES_BUTTON_HOVER,
  'button:active': STYLES_BUTTON_ACTIVE,
  'button.inactive': STYLES_BUTTON_INACTIVE,
  'li:first-child > button': STYLES_FIRST_BUTTON,
  'li:last-child > button': STYLES_LAST_BUTTON
};
var TEMPLATE = "<ul id=\"piling-js-context-menu-list\">\n  <li>\n    <button id=\"depile-button\">Depile All</button>\n  </li>\n  <li>\n    <button id=\"extract-button\">Extract This Item</button>\n  </li>\n  <li>\n    <button id=\"temp-depile-button\">Temp. Depile</button>\n  </li>\n  <li>\n    <button id=\"browse-separately\">Browse Separately</button>\n  </li>\n  <li>\n    <button id=\"grid-button\">Show Grid</button>\n  </li>\n  <li>\n    <button id=\"align-button\">Align by Grid</button>\n  </li>\n  <li>\n    <button id=\"magnify-button\">Magnify</button>\n  </li>\n</ul>";

var createContextMenu = function createContextMenu() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$template = _ref.template,
      template = _ref$template === void 0 ? TEMPLATE : _ref$template,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? STYLES : _ref$styles,
      _ref$customItems = _ref.customItems,
      customItems = _ref$customItems === void 0 ? [] : _ref$customItems;

  var rootElement = document.createElement('nav');
  rootElement.id = 'piling-js-context-menu'; // Create CSS

  var css = document.createElement('style');
  css.setAttribute('type', 'text/css');
  var cssString = '';
  Object.entries(styles).forEach(function (_ref2) {
    var _ref3 = slicedToArray(_ref2, 2),
        key = _ref3[0],
        value = _ref3[1];

    var identifier = key === 'root' ? '' : " ".concat(key);
    cssString += "#piling-js-context-menu".concat(identifier, " { ").concat(styleToCss(value), " }\n");
  });
  css.textContent = cssString;
  rootElement.appendChild(css); // Add menu

  rootElement.insertAdjacentHTML('beforeend', template); // Add custom items

  var ul = rootElement.querySelector('#piling-js-context-menu-list');
  customItems.forEach(function (item, index) {
    var li = document.createElement('li');
    var button = document.createElement('button');
    button.textContent = item.label;
    if (item.id) button.id = item.id;else button.id = "piling-js-context-menu-custom-item-".concat(index);
    li.appendChild(button);
    ul.appendChild(li);
  });
  return rootElement;
};

var createSpinnerElement = function createSpinnerElement() {
  return createHtmlByTemplate("<svg class=\"pilingjs-spinner\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\">\n  <circle\n    class=\"pilingjs-spinner-circle\"\n    cx=\"20\"\n    cy=\"20\"\n    r=\"18\"\n    stroke-width=\"4\"\n    fill=\"none\"\n    stroke=\"black\" />\n  <g class=\"pilingjs-spinner-block-offset\" transform=\"translate(20, 20)\">\n    <g class=\"pilingjs-spinner-blocks\">\n      <animateTransform\n        attributeName=\"transform\"\n        attributeType=\"XML\"\n        dur=\"1.5s\"\n        from=\"0\"\n        repeatCount=\"indefinite\"\n        to=\"360\"z\n        type=\"rotate\" />\n      <path\n        class=\"pilingjs-spinner-block-one\"\n        d=\"M0-20c1.104,0,2,0.896,2,2s-0.896,2-2,2V0l-4,21h25v-42H0V-20z\"\n        fill=\"white\">\n        <animateTransform\n          attributeName=\"transform\"\n          attributeType=\"XML\"\n          calcMode=\"spline\"\n          dur=\"1.5s\"\n          from=\"0\"\n          values=\"0; 360\"\n          keyTimes=\"0; 1\"\n          keySplines=\"0.2 0.2 0.15 1\"\n          repeatCount=\"indefinite\"\n          to=\"360\"\n          type=\"rotate\" />\n      </path>\n      <path\n        class=\"pilingjs-spinner-block-two\"\n        d=\"M0-20c-1.104,0-2,0.896-2,2s0.896,2,2,2V0l4,21h-25v-42H0V-20z\"\n        fill=\"white\">\n        <animateTransform\n          attributeName=\"transform\"\n          attributeType=\"XML\"\n          calcMode=\"spline\"\n          dur=\"1.5s\"\n          from=\"0\"\n          values=\"0; 360\"\n          keyTimes=\"0; 1\"\n          keySplines=\"0.1 0.15 0.8 0.8\"\n          repeatCount=\"indefinite\"\n          to=\"360\"\n          type=\"rotate\" />\n      </path>\n    </g>\n  </g>\n</svg>\n");
};

var createSpinner = function createSpinner() {
  var darkMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var element = createSpinnerElement();

  var updateColors = function updateColors() {
    var fg = darkMode ? 'white' : 'black';
    var bg = darkMode ? 'black' : 'white';
    element.querySelector('.pilingjs-spinner-circle').setAttribute('stroke', fg);
    element.querySelector('.pilingjs-spinner-block-one').setAttribute('fill', bg);
    element.querySelector('.pilingjs-spinner-block-two').setAttribute('fill', bg);
  };

  var set = function set(_ref) {
    var _ref$darkMode = _ref.darkMode,
        newDarkMode = _ref$darkMode === void 0 ? null : _ref$darkMode;
    // eslint-disable-next-line no-param-reassign
    darkMode = ifNotNull(newDarkMode, darkMode);
    updateColors();
  };

  updateColors();
  return pipe(withStaticProperty('element', element), withConstructor(createSpinner))({
    set: set
  });
};

var TRANSITION_EVENT = whichTransitionEvent();

var createPopup = function createPopup() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$backgroundOpacit = _ref.backgroundOpacity,
      initialBackgroundOpacity = _ref$backgroundOpacit === void 0 ? DEFAULT_POPUP_BACKGROUND_OPACITY : _ref$backgroundOpacit,
      _ref$isDarkMode = _ref.isDarkMode,
      initialIsDarkMode = _ref$isDarkMode === void 0 ? DEFAULT_DARK_MODE : _ref$isDarkMode;

  var backgroundOpacity = initialBackgroundOpacity;
  var isDarkMode = initialIsDarkMode;

  var getTextColor = function getTextColor() {
    return isDarkMode ? 'black' : 'white';
  };

  var getForegroundColor = function getForegroundColor() {
    return isDarkMode ? 'white' : 'black';
  };

  var getBackgroundColor = function getBackgroundColor() {
    return isDarkMode ? "rgba(0, 0, 0, ".concat(backgroundOpacity, ")") : "rgba(255, 255, 255, ".concat(backgroundOpacity, ")");
  };

  var rootElement = document.createElement('div');
  rootElement.className = 'pilingjs-popup-background';
  rootElement.style.position = 'absolute';
  rootElement.style.top = 0;
  rootElement.style.left = 0;
  rootElement.style.zIndex = -1;
  rootElement.style.display = 'flex';
  rootElement.style.flexDirection = 'column';
  rootElement.style.justifyContent = 'center';
  rootElement.style.width = '100%';
  rootElement.style.height = '0px';
  rootElement.style.background = getBackgroundColor();
  rootElement.style.opacity = 0;
  rootElement.style.transition = "opacity 250ms ".concat(CSS_EASING_CUBIC_IN_OUT);
  var wrapper = document.createElement('div');
  rootElement.className = 'pilingjs-popup-wrapper';
  wrapper.style.position = 'relative';
  wrapper.style.display = 'flex';
  wrapper.style.margin = '2rem';
  wrapper.style.maxHeight = '100%';
  rootElement.appendChild(wrapper);
  var popup = document.createElement('div');
  rootElement.className = 'pilingjs-popup-window';
  popup.style.position = 'relative';
  popup.style.minwidth = '4rem';
  popup.style.maxWidth = '100%';
  popup.style.maxHeight = '100%';
  popup.style.margin = '2rem auto';
  popup.style.color = getTextColor();
  popup.style.borderRadius = '0.5rem';
  popup.style.background = getForegroundColor();
  popup.style.transform = 'scale(0)';
  popup.style.transition = "transform 250ms ".concat(CSS_EASING_CUBIC_IN_OUT);
  wrapper.appendChild(popup);
  var popupContent = document.createElement('div');
  rootElement.className = 'pilingjs-popup-content';
  popupContent.style.position = 'relative';
  popupContent.style.display = 'flex';
  popupContent.style.flexDirection = 'column';
  popupContent.style.alignItems = 'center';
  popupContent.style.padding = '1rem';
  popupContent.style.maxHeight = 'calc(100vh - 4rem)';
  popupContent.style.overflow = 'auto';
  popup.appendChild(popupContent);
  var icon = document.createElement('div');
  rootElement.className = 'pilingjs-popup-icon';
  popupContent.appendChild(icon);
  var spinner = createSpinner(!isDarkMode);
  icon.appendChild(spinner.element);
  var paragraph = document.createElement('p');
  paragraph.style.margin = '0';
  popupContent.appendChild(paragraph);
  var isOpen = false;

  var open = function open() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$text = _ref2.text,
        text = _ref2$text === void 0 ? null : _ref2$text,
        _ref2$showSpinner = _ref2.showSpinner,
        showSpinner = _ref2$showSpinner === void 0 ? true : _ref2$showSpinner;

    return new Promise(function (resolve) {
      rootElement.addEventListener(TRANSITION_EVENT, resolve, {
        once: true
      });
      isOpen = true;
      rootElement.style.zIndex = 99;
      rootElement.style.height = '100%';
      rootElement.style.opacity = 1;
      popup.style.transform = 'scale(1)';
      icon.style.display = showSpinner ? 'block' : 'none';
      icon.style.margin = text ? '0 0 0.5rem 0' : '0';
      paragraph.textContent = text;
    });
  };

  var close = function close() {
    return new Promise(function (resolve) {
      isOpen = false;
      rootElement.addEventListener(TRANSITION_EVENT, /*#__PURE__*/asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                rootElement.style.zIndex = -1;
                rootElement.style.height = '0px';
                paragraph.textContent = null;
                _context.next = 5;
                return nextAnimationFrame();

              case 5:
                resolve();

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })), {
        once: true
      });
      rootElement.style.opacity = 0;
      popup.style.transform = 'scale(0)';
    });
  };

  var set = function set() {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref4$backgroundOpaci = _ref4.backgroundOpacity,
        newBackgroundOpacity = _ref4$backgroundOpaci === void 0 ? null : _ref4$backgroundOpaci,
        _ref4$darkMode = _ref4.darkMode,
        newIsDarkMode = _ref4$darkMode === void 0 ? null : _ref4$darkMode;

    backgroundOpacity = ifNotNull(newBackgroundOpacity, backgroundOpacity);
    isDarkMode = ifNotNull(newIsDarkMode, isDarkMode);
    popup.style.color = getTextColor();
    popup.style.background = getForegroundColor();
    rootElement.style.background = getBackgroundColor();
    spinner.set({
      darkMode: !isDarkMode
    });
  };

  var withPublicMethods = function withPublicMethods() {
    return function (self) {
      return assign(self, {
        close: close,
        open: open,
        set: set
      });
    };
  };

  return pipe(withReadOnlyProperty('isOpen', function () {
    return isOpen;
  }), withStaticProperty('element', rootElement), withPublicMethods(), withConstructor(createPopup))({});
};

var lassoStyleEl = document.createElement('style');
document.head.appendChild(lassoStyleEl);
var lassoStylesheets = lassoStyleEl.sheet;

var addRule = function addRule(rule) {
  var currentNumRules = lassoStylesheets.length;
  lassoStylesheets.insertRule(rule, currentNumRules);
  return currentNumRules;
};

var removeRule = function removeRule(index) {
  lassoStylesheets.deleteRule(index);
};

var inAnimation = "".concat(LASSO_SHOW_START_INDICATOR_TIME, "ms ease scaleInFadeOut 0s 1 normal backwards");

var createInAnimationRule = function createInAnimationRule(currentOpacity, currentScale) {
  return "\n@keyframes scaleInFadeOut {\n  0% {\n    opacity: ".concat(currentOpacity, ";\n    transform: translate(-50%,-50%) scale(").concat(currentScale, ");\n  }\n  10% {\n    opacity: 1;\n    transform: translate(-50%,-50%) scale(1);\n  }\n  100% {\n    opacity: 0;\n    transform: translate(-50%,-50%) scale(0.9);\n  }\n}\n");
};

var inAnimationRuleIndex = null;
var outAnimation = "".concat(LASSO_HIDE_START_INDICATOR_TIME, "ms ease fadeScaleOut 0s 1 normal backwards");

var createOutAnimationRule = function createOutAnimationRule(currentOpacity, currentScale) {
  return "\n@keyframes fadeScaleOut {\n  0% {\n    opacity: ".concat(currentOpacity, ";\n    transform: translate(-50%,-50%) scale(").concat(currentScale, ");\n  }\n  100% {\n    opacity: 0;\n    transform: translate(-50%,-50%) scale(0);\n  }\n}\n");
};

var outAnimationRuleIndex = null;

var createLasso = function createLasso() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$fillColor = _ref.fillColor,
      initialFillColor = _ref$fillColor === void 0 ? null : _ref$fillColor,
      _ref$fillOpacity = _ref.fillOpacity,
      initialFillOpacity = _ref$fillOpacity === void 0 ? DEFAULT_LASSO_FILL_OPACITY : _ref$fillOpacity,
      _ref$isShowStartIndic = _ref.isShowStartIndicator,
      initialIsShowStartIndicator = _ref$isShowStartIndic === void 0 ? DEFAULT_LASSO_SHOW_START_INDICATOR : _ref$isShowStartIndic,
      _ref$isDarkMode = _ref.isDarkMode,
      initialIsDarkMode = _ref$isDarkMode === void 0 ? DEFAULT_DARK_MODE : _ref$isDarkMode,
      _ref$onDraw = _ref.onDraw,
      initialOnDraw = _ref$onDraw === void 0 ? identity : _ref$onDraw,
      _ref$onStart = _ref.onStart,
      initialOnStart = _ref$onStart === void 0 ? identity : _ref$onStart,
      _ref$startIndicatorOp = _ref.startIndicatorOpacity,
      initialStartIndicatorOpacity = _ref$startIndicatorOp === void 0 ? DEFAULT_LASSO_START_INDICATOR_OPACITY : _ref$startIndicatorOp,
      _ref$strokeColor = _ref.strokeColor,
      initialStrokeColor = _ref$strokeColor === void 0 ? null : _ref$strokeColor,
      _ref$strokeOpacity = _ref.strokeOpacity,
      initialStrokeOpacity = _ref$strokeOpacity === void 0 ? DEFAULT_LASSO_STROKE_OPACITY : _ref$strokeOpacity,
      _ref$strokeSize = _ref.strokeSize,
      initialStrokeSize = _ref$strokeSize === void 0 ? DEFAULT_LASSO_STROKE_SIZE : _ref$strokeSize;

  var fillColor = initialFillColor;
  var fillOpacity = initialFillOpacity;
  var isShowStartIndicator = initialIsShowStartIndicator;
  var isDarkMode = initialIsDarkMode;
  var startIndicatorOpacity = initialStartIndicatorOpacity;
  var strokeColor = initialStrokeColor;
  var strokeOpacity = initialStrokeOpacity;
  var strokeSize = initialStrokeSize;
  var onDraw = initialOnDraw;
  var onStart = initialOnStart;
  var lineContainer = new Container();
  var fillContainer = new Container();
  var lineGfx = new Graphics();
  var fillGfx = new Graphics();
  lineContainer.addChild(lineGfx);
  fillContainer.addChild(fillGfx);

  var getLassoFillColor = function getLassoFillColor() {
    return fillColor || isDarkMode ? 0xffffff : 0x000000;
  };

  var getLassoStrokeColor = function getLassoStrokeColor() {
    return fillColor || isDarkMode ? 0xffffff : 0x000000;
  };

  var getBackgroundColor = function getBackgroundColor() {
    return isDarkMode ? "rgba(255, 255, 255, ".concat(startIndicatorOpacity, ")") : "rgba(0, 0, 0, ".concat(startIndicatorOpacity, ")");
  };

  var startIndicator = document.createElement('div');
  startIndicator.id = 'lasso-start-indicator';
  startIndicator.style.position = 'absolute';
  startIndicator.style.zIndex = 1;
  startIndicator.style.width = '4rem';
  startIndicator.style.height = '4rem';
  startIndicator.style.borderRadius = '4rem';
  startIndicator.style.opacity = 0.5;
  startIndicator.style.transform = 'translate(-50%,-50%) scale(0)';
  var isMouseDown = false;
  var isLasso = false;
  var lassoPos = [];
  var lassoPosFlat = [];
  var lassoPrevMousePos;

  var mouseUpHandler = function mouseUpHandler() {
    isMouseDown = false;
  };

  var indicatorClickHandler = function indicatorClickHandler(event) {
    var parent = event.target.parentElement;
    if (!parent) return;
    var rect = parent.getBoundingClientRect();
    showStartIndicator([event.clientX - rect.left, event.clientY - rect.top]);
  };

  var indicatorMouseDownHandler = function indicatorMouseDownHandler() {
    isMouseDown = true;
    isLasso = true;
    clear();
    onStart();
  };

  var indicatorMouseLeaveHandler = function indicatorMouseLeaveHandler() {
    hideStartIndicator();
  };

  window.addEventListener('mouseup', mouseUpHandler);

  var resetStartIndicatorStyle = function resetStartIndicatorStyle() {
    startIndicator.style.opacity = 0.5;
    startIndicator.style.transform = 'translate(-50%,-50%) scale(0)';
  };

  var getCurrentStartIndicatorAnimationStyle = function getCurrentStartIndicatorAnimationStyle() {
    var computedStyle = getComputedStyle(startIndicator);
    var opacity = +computedStyle.opacity; // The css rule `transform: translate(-1, -1) scale(0.5);` is represented as
    // `matrix(0.5, 0, 0, 0.5, -1, -1)`

    var m = computedStyle.transform.match(/([0-9.-]+)+/g);
    var scale = m ? +m[0] : 1;
    return {
      opacity: opacity,
      scale: scale
    };
  };

  var showStartIndicator = /*#__PURE__*/function () {
    var _ref3 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(_ref2) {
      var _ref4, x, y, opacity, scale, style;

      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref4 = slicedToArray(_ref2, 2), x = _ref4[0], y = _ref4[1];
              _context.next = 3;
              return wait(0);

            case 3:
              if (!isMouseDown) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return");

            case 5:
              opacity = 0.5;
              scale = 0;

              if (isShowStartIndicator) {
                style = getCurrentStartIndicatorAnimationStyle();
                opacity = style.opacity;
                scale = style.scale;
                startIndicator.style.opacity = opacity;
                startIndicator.style.transform = "translate(-50%,-50%) scale(".concat(scale, ")");
              }

              startIndicator.style.animation = 'none'; // See https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Tips
              // why we need to wait for two animation frames

              _context.next = 11;
              return nextAnimationFrame(2);

            case 11:
              startIndicator.style.top = "".concat(y, "px");
              startIndicator.style.left = "".concat(x, "px");
              if (inAnimationRuleIndex !== null) removeRule(inAnimationRuleIndex);
              inAnimationRuleIndex = addRule(createInAnimationRule(opacity, scale));
              startIndicator.style.animation = inAnimation;
              _context.next = 18;
              return nextAnimationFrame();

            case 18:
              resetStartIndicatorStyle();

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function showStartIndicator(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  var hideStartIndicator = /*#__PURE__*/function () {
    var _ref5 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
      var _getCurrentStartIndic, opacity, scale;

      return regenerator.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _getCurrentStartIndic = getCurrentStartIndicatorAnimationStyle(), opacity = _getCurrentStartIndic.opacity, scale = _getCurrentStartIndic.scale;
              startIndicator.style.opacity = opacity;
              startIndicator.style.transform = "translate(-50%,-50%) scale(".concat(scale, ")");
              startIndicator.style.animation = 'none';
              _context2.next = 6;
              return nextAnimationFrame(2);

            case 6:
              if (outAnimationRuleIndex !== null) removeRule(outAnimationRuleIndex);
              outAnimationRuleIndex = addRule(createOutAnimationRule(opacity, scale));
              startIndicator.style.animation = outAnimation;
              _context2.next = 11;
              return nextAnimationFrame();

            case 11:
              resetStartIndicatorStyle();

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function hideStartIndicator() {
      return _ref5.apply(this, arguments);
    };
  }();

  var draw = function draw() {
    lineGfx.clear();
    fillGfx.clear();

    if (lassoPos.length) {
      lineGfx.lineStyle(strokeSize, getLassoStrokeColor(), strokeOpacity);
      lineGfx.moveTo.apply(lineGfx, toConsumableArray(lassoPos[0]));
      lassoPos.forEach(function (pos) {
        lineGfx.lineTo.apply(lineGfx, toConsumableArray(pos));
        lineGfx.moveTo.apply(lineGfx, toConsumableArray(pos));
      });
      fillGfx.beginFill(getLassoFillColor(), fillOpacity);
      fillGfx.drawPolygon(lassoPosFlat);
    }

    onDraw();
  };

  var extend = function extend(currMousePos) {
    if (!lassoPrevMousePos) {
      if (!isLasso) {
        isLasso = true;
        onStart();
      }

      lassoPos = [currMousePos];
      lassoPosFlat = [currMousePos[0], currMousePos[1]];
      lassoPrevMousePos = currMousePos;
    } else {
      var d = l2PointDist(currMousePos[0], currMousePos[1], lassoPrevMousePos[0], lassoPrevMousePos[1]);

      if (d > LASSO_MIN_DIST) {
        lassoPos.push(currMousePos);
        lassoPosFlat.push(currMousePos[0], currMousePos[1]);
        lassoPrevMousePos = currMousePos;

        if (lassoPos.length > 1) {
          draw();
        }
      }
    }
  };

  var extendDb = throttleAndDebounce(extend, LASSO_MIN_DELAY, LASSO_MIN_DELAY);

  var clear = function clear() {
    lassoPos = [];
    lassoPosFlat = [];
    lassoPrevMousePos = undefined;
    draw();
  };

  var end = function end() {
    isLasso = false;

    var lassoPoints = toConsumableArray(lassoPos);

    extendDb.cancel();
    clear();
    return lassoPoints;
  };

  var set = function set() {
    var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref6$fillColor = _ref6.fillColor,
        newFillColor = _ref6$fillColor === void 0 ? null : _ref6$fillColor,
        _ref6$fillOpacity = _ref6.fillOpacity,
        newFillOpacity = _ref6$fillOpacity === void 0 ? null : _ref6$fillOpacity,
        _ref6$onDraw = _ref6.onDraw,
        newOnDraw = _ref6$onDraw === void 0 ? null : _ref6$onDraw,
        _ref6$onStart = _ref6.onStart,
        newOnStart = _ref6$onStart === void 0 ? null : _ref6$onStart,
        _ref6$showStartIndica = _ref6.showStartIndicator,
        newIsShowStartIndicator = _ref6$showStartIndica === void 0 ? null : _ref6$showStartIndica,
        _ref6$startIndicatorO = _ref6.startIndicatorOpacity,
        newStartIndicatorOpacity = _ref6$startIndicatorO === void 0 ? null : _ref6$startIndicatorO,
        _ref6$strokeColor = _ref6.strokeColor,
        newStrokeColor = _ref6$strokeColor === void 0 ? null : _ref6$strokeColor,
        _ref6$strokeOpacity = _ref6.strokeOpacity,
        newStrokeOpacity = _ref6$strokeOpacity === void 0 ? null : _ref6$strokeOpacity,
        _ref6$strokeSize = _ref6.strokeSize,
        newStrokeSize = _ref6$strokeSize === void 0 ? null : _ref6$strokeSize,
        _ref6$darkMode = _ref6.darkMode,
        newIsDarkMode = _ref6$darkMode === void 0 ? null : _ref6$darkMode;

    fillColor = ifNotNull(newFillColor, fillColor);
    fillOpacity = ifNotNull(newFillOpacity, fillOpacity);
    onDraw = ifNotNull(newOnDraw, onDraw);
    onStart = ifNotNull(newOnStart, onStart);
    isDarkMode = ifNotNull(newIsDarkMode, isDarkMode);
    isShowStartIndicator = ifNotNull(newIsShowStartIndicator, isShowStartIndicator);
    startIndicatorOpacity = ifNotNull(newStartIndicatorOpacity, startIndicatorOpacity);
    strokeColor = ifNotNull(newStrokeColor, strokeColor);
    strokeOpacity = ifNotNull(newStrokeOpacity, strokeOpacity);
    strokeSize = ifNotNull(newStrokeSize, strokeSize);
    startIndicator.style.background = getBackgroundColor();

    if (isShowStartIndicator) {
      startIndicator.addEventListener('click', indicatorClickHandler);
      startIndicator.addEventListener('mousedown', indicatorMouseDownHandler);
      startIndicator.addEventListener('mouseleave', indicatorMouseLeaveHandler);
    } else {
      startIndicator.removeEventListener('mousedown', indicatorMouseDownHandler);
      startIndicator.removeEventListener('mouseleave', indicatorMouseLeaveHandler);
    }
  };

  var destroy = function destroy() {
    window.removeEventListener('mouseup', mouseUpHandler);
    startIndicator.removeEventListener('click', indicatorClickHandler);
    startIndicator.removeEventListener('mousedown', indicatorMouseDownHandler);
    startIndicator.removeEventListener('mouseleave', indicatorMouseLeaveHandler);
  };

  var withPublicMethods = function withPublicMethods() {
    return function (self) {
      return assign(self, {
        clear: clear,
        destroy: destroy,
        end: end,
        extend: extend,
        extendDb: extendDb,
        set: set,
        showStartIndicator: showStartIndicator
      });
    };
  };

  set({
    fillColor: fillColor,
    fillOpacity: fillOpacity,
    isShowStartIndicator: isShowStartIndicator,
    isDarkMode: isDarkMode,
    onDraw: onDraw,
    onStart: onStart,
    startIndicatorOpacity: startIndicatorOpacity,
    strokeColor: strokeColor,
    strokeOpacity: strokeOpacity,
    strokeSize: strokeSize
  });
  return pipe(withStaticProperty('startIndicator', startIndicator), withStaticProperty('fillContainer', fillContainer), withStaticProperty('lineContainer', lineContainer), withPublicMethods(), withConstructor(createLasso))({});
};

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
// as this blows up the Rollup bundle massively for some reasons...
// const convolve = require('ndarray-convolve');
// const ndarray = require('ndarray');

var EXTRA_ROWS = 3;
var l2RectDist = lRectDist(2);

var createPilingJs = function createPilingJs(rootElement) {
  var initProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var scrollContainer = document.createElement('div');
  scrollContainer.className = 'pilingjs-scroll-container';
  var scrollEl = document.createElement('div');
  scrollEl.className = 'pilingjs-scroll-element';
  var canvas = document.createElement('canvas');
  canvas.className = 'pilingjs-canvas';
  var pubSub = createPubSub();
  var store = createStore();
  var badgeFactory = createBadgeFactory();
  var state = store.state;
  var backgroundColor = WHITE;
  var gridMat;
  var transformPointToScreen;
  var transformPointFromScreen;
  var translatePointFromScreen;
  var camera;
  var attemptArrangement = false;
  var scratch = new Float32Array(16);
  var lastPilePosition = new Map();

  var _rootElement$getBound = rootElement.getBoundingClientRect(),
      containerWidth = _rootElement$getBound.width,
      containerHeight = _rootElement$getBound.height;

  var destroyed = false;
  var renderer = new Renderer({
    width: containerWidth,
    height: containerHeight,
    view: canvas,
    antialias: true,
    transparent: true,
    resolution: window.devicePixelRatio,
    autoDensity: true,
    preserveDrawingBuffer: false,
    legacy: false,
    powerPreference: 'high-performance'
  });
  var isInitialPositioning = true;
  var isPanZoom = null;
  var isPanZoomed = false;
  var arranging = Promise.resolve();
  var root = new Container();
  var stage = new Container();
  root.addChild(stage);
  var gridGfx = new Graphics();
  var spatialIndexGfx = new Graphics();
  var mask = new Sprite(Texture.WHITE);
  root.addChild(mask);
  stage.mask = mask;

  var createColorOpacityActions = function createColorOpacityActions(colorAction, opacityAction) {
    return function (value) {
      if (isFunction(value)) return [createAction[colorAction](value)];

      var _colorToDecAlpha = colorToDecAlpha(value, null),
          _colorToDecAlpha2 = slicedToArray(_colorToDecAlpha, 2),
          color = _colorToDecAlpha2[0],
          opacity = _colorToDecAlpha2[1];

      var actions = [createAction[colorAction](color)];
      if (opacity !== null) actions.push(createAction[opacityAction](opacity));
      return actions;
    };
  };

  var properties = {
    center: {
      get: function get() {
        return camera.target;
      },
      set: function set(point) {
        camera.lookAt(point, camera.scaling, camera.rotation);
      },
      noAction: true
    },
    gridColor: {
      set: createColorOpacityActions('setGridColor', 'setGridOpacity')
    },
    items: {
      get: function get() {
        return Object.values(state.items);
      },
      set: function set(newItems) {
        return [createAction.setItems(newItems), createAction.initPiles(newItems)];
      },
      batchActions: true
    },
    lassoFillColor: {
      set: createColorOpacityActions('setLassoFillColor', 'setLassoFillOpacity')
    },
    lassoStrokeColor: {
      set: createColorOpacityActions('setLassoStrokeColor', 'setLassoStrokeOpacity')
    },
    layout: {
      get: function get() {
        return {
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
        };
      }
    },
    pileBorderColor: {
      set: createColorOpacityActions('setPileBorderColor', 'setPileBorderOpacity')
    },
    pileBorderColorHover: {
      set: createColorOpacityActions('setPileBorderColorHover', 'setPileBorderOpacityHover')
    },
    pileBorderColorFocus: {
      set: createColorOpacityActions('setPileBorderColorFocus', 'setPileBorderOpacityFocus')
    },
    pileBorderColorActive: {
      set: createColorOpacityActions('setPileBorderColorActive', 'setPileBorderOpacityActive')
    },
    pileBackgroundColor: {
      set: createColorOpacityActions('setPileBackgroundColor', 'setPileBackgroundOpacity')
    },
    pileBackgroundColorHover: {
      set: createColorOpacityActions('setPileBackgroundColorHover', 'setPileBackgroundOpacityHover')
    },
    pileBackgroundColorFocus: {
      set: createColorOpacityActions('setPileBackgroundColorFocus', 'setPileBackgroundOpacityFocus')
    },
    pileBackgroundColorActive: {
      set: createColorOpacityActions('setPileBackgroundColorActive', 'setPileBackgroundOpacityActive')
    },
    pileLabel: {
      set: function set(value) {
        var objective = expandLabelObjective(value);
        var actions = [createAction.setPileLabel(objective)];
        return actions;
      }
    },
    pileLabelSizeTransform: {
      set: function set(value) {
        var aggregator = expandLabelSizeAggregator(value);
        var actions = [createAction.setPileLabelSizeTransform(aggregator)];
        return actions;
      }
    },
    pileLabelTextColor: {
      set: createColorOpacityActions('setPileLabelTextColor', 'setPileLabelTextOpacity')
    },
    pileSizeBadgeAlign: {
      set: function set(alignment) {
        return [createAction.setPileSizeBadgeAlign(isFunction(alignment) ? alignment : toAlignment(alignment))];
      }
    },
    previewBackgroundColor: {
      set: createColorOpacityActions('setPreviewBackgroundColor', 'setPreviewBackgroundOpacity')
    },
    previewBorderColor: {
      set: createColorOpacityActions('setPreviewBorderColor', 'setPreviewBorderOpacity')
    },
    renderer: {
      get: function get() {
        return state.itemRenderer;
      },
      set: function set(value) {
        return [createAction.setItemRenderer(value)];
      }
    },
    rowHeight: true,
    scale: {
      get: function get() {
        return camera.scaling;
      },
      set: function set(scale) {
        camera.scale(scale, [renderer.width / 2, renderer.height / 2]);
      },
      noAction: true
    }
  };

  var get = function get(property) {
    if (properties[property] && properties[property].get) return properties[property].get();
    if (state[property] !== undefined) return state[property];
    console.warn("Unknown property \"".concat(property, "\""));
    return undefined;
  };

  var set = function set(property, value) {
    var noDispatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var config = properties[property];
    var actions = [];

    if (config) {
      if (config.set) {
        actions = config.set(value);
      } else {
        console.warn("Property \"".concat(property, "\" is not settable"));
      }
    } else if (state[property] !== undefined) {
      actions = [createAction["set".concat(capitalize(property))](value)];
    } else {
      console.warn("Unknown property \"".concat(property, "\""));
    }

    if (noDispatch || config && config.noAction) return actions;

    if (config && config.batchActions) {
      store.dispatch(batchActions(actions));
    } else {
      actions.forEach(function (action) {
        return store.dispatch(action);
      });
    }

    return undefined;
  };

  var setPromise = function setPromise(propVals) {
    if (propVals.items) return new Promise(function (resolve) {
      pubSub.subscribe('itemUpdate', resolve, 1);
    });
    return Promise.resolve();
  };

  var setPublic = function setPublic(newProperty, newValue) {
    if (typeof newProperty === 'string' || newProperty instanceof String) {
      var _whenDone = setPromise(defineProperty({}, newProperty, newValue));

      set(newProperty, newValue);
      return _whenDone;
    }

    var whenDone = setPromise(newProperty);
    store.dispatch(batchActions(Object.entries(newProperty).flatMap(function (_ref) {
      var _ref2 = slicedToArray(_ref, 2),
          property = _ref2[0],
          value = _ref2[1];

      return set(property, value, true);
    })));
    return whenDone;
  };

  var render = function render() {
    renderer.render(root);
    pubSub.publish('render');
  };

  var renderRaf = withRaf(render);
  var animator = createAnimator(render, pubSub);
  var renderedItems = new Map();
  var pileInstances = new Map();
  var activePile = new Container();
  var normalPiles = new Container();
  var filterLayer = new Sprite(Texture.WHITE);
  filterLayer.alpha = 0;

  var clearActivePileLayer = function clearActivePileLayer() {
    if (activePile.children.length) {
      normalPiles.addChild(activePile.getChildAt(0));
      activePile.removeChildren();
    }
  };

  var moveToActivePileLayer = function moveToActivePileLayer(pileGfx) {
    clearActivePileLayer();
    activePile.addChild(pileGfx);
  };

  var popup = createPopup();
  var isInteractive = false;

  var disableInteractivity = function disableInteractivity() {
    if (!isInteractive) return;
    stage.interactive = false;
    stage.interactiveChildren = false;
    pileInstances.forEach(function (pile) {
      pile.disableInteractivity();
    });
    isInteractive = false;
  };

  var enableInteractivity = function enableInteractivity() {
    if (isInteractive) return;
    stage.interactive = true;
    stage.interactiveChildren = true;
    pileInstances.forEach(function (pile) {
      pile.enableInteractivity();
    });
    isInteractive = true;
  };

  var isMouseDown = false;
  var isLasso = false;
  var lasso = createLasso({
    onStart: function onStart() {
      disableInteractivity();
      isLasso = true;
      isMouseDown = true;
    },
    onDraw: function onDraw() {
      renderRaf();
    }
  });
  stage.addChild(gridGfx);
  stage.addChild(spatialIndexGfx);
  stage.addChild(lasso.fillContainer);
  stage.addChild(normalPiles);
  stage.addChild(filterLayer);
  stage.addChild(activePile);
  stage.addChild(lasso.lineContainer);
  var spatialIndex = new rbush_min();

  var drawSpatialIndex = function drawSpatialIndex(mousePos, lassoPolygon) {
    if (!store.state.showSpatialIndex) return;
    spatialIndexGfx.clear();
    spatialIndexGfx.beginFill(0x00ff00, 0.5);
    spatialIndex.all().forEach(function (bBox) {
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

      for (var i = 0; i < lassoPolygon.length; i += 2) {
        spatialIndexGfx.lineTo(lassoPolygon[i], lassoPolygon[i + 1]);
        spatialIndexGfx.moveTo(lassoPolygon[i], lassoPolygon[i + 1]);
      }
    }
  };

  var createRBush = function createRBush() {
    spatialIndex.clear();
    var boxList = [];

    if (pileInstances) {
      pileInstances.forEach(function (pile) {
        pile.updateBounds.apply(pile, toConsumableArray(getXyOffset()).concat([true]));
        boxList.push(pile.bBox);
      });
      spatialIndex.load(boxList);
      drawSpatialIndex();
    }
  };

  var deletePileFromSearchIndex = function deletePileFromSearchIndex(pileId) {
    var pile = pileInstances.get(pileId);
    spatialIndex.remove(pile.bBox, function (a, b) {
      return a.id === b.id;
    });
    drawSpatialIndex();
  };

  var getXyOffset = function getXyOffset() {
    if (isPanZoom) {
      return camera.translation;
    }

    return [0, stage.y];
  };

  var calcPileBBox = function calcPileBBox(pileId) {
    var _pileInstances$get;

    return (_pileInstances$get = pileInstances.get(pileId)).calcBBox.apply(_pileInstances$get, toConsumableArray(getXyOffset()));
  };

  var updatePileBounds = function updatePileBounds(pileId) {
    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref3$forceUpdate = _ref3.forceUpdate,
        forceUpdate = _ref3$forceUpdate === void 0 ? false : _ref3$forceUpdate;

    var pile = pileInstances.get(pileId);
    spatialIndex.remove(pile.bBox, function (a, b) {
      return a.id === b.id;
    });
    pile.updateBounds.apply(pile, toConsumableArray(getXyOffset()).concat([forceUpdate]));
    spatialIndex.insert(pile.bBox);
    drawSpatialIndex();
    pubSub.publish('pileBoundsUpdate', pileId);
  };

  var updatePileBoundsHandler = function updatePileBoundsHandler(_ref4) {
    var id = _ref4.id,
        forceUpdate = _ref4.forceUpdate;
    return updatePileBounds(id, {
      forceUpdate: forceUpdate
    });
  };

  var transformPiles = function transformPiles() {
    lastPilePosition.forEach(function (pilePos, pileId) {
      movePileTo(pileInstances.get(pileId), pilePos[0], pilePos[1]);
    });
    renderRaf();
  };

  var zoomPiles = function zoomPiles() {
    var zoomScale = store.state.zoomScale;
    var scaling = isFunction(zoomScale) ? zoomScale(camera.scaling) : zoomScale;
    pileInstances.forEach(function (pile) {
      pile.setZoomScale(scaling);
      pile.drawBorder();
    });
    renderRaf();
  };

  var panZoomHandler = function panZoomHandler() {
    var updatePilePosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    // Update the camera
    camera.tick();
    transformPiles();
    zoomPiles();
    isPanZoomed = true;
    if (updatePilePosition) positionPilesDb();
    pubSub.publish('zoom', camera);
  };

  var prevScaling = 1;

  var zoomHandler = function zoomHandler() {
    if (!camera) return;
    var _store$state = store.state,
        groupingType = _store$state.groupingType,
        groupingObjective = _store$state.groupingObjective,
        groupingOptions = _store$state.groupingOptions,
        splittingType = _store$state.splittingType,
        splittingObjective = _store$state.splittingObjective,
        splittingOptions = _store$state.splittingOptions;
    var currentScaling = camera.scaling;
    var dScaling = currentScaling / prevScaling;

    if (groupingType && dScaling < 1) {
      groupBy(groupingType, groupingObjective, groupingOptions);
    }

    if (splittingType && dScaling > 1) {
      splitBy(splittingType, splittingObjective, splittingOptions);
    }

    prevScaling = currentScaling;
  };

  var zoomHandlerDb = debounce(zoomHandler, 250);

  var panZoomEndHandler = function panZoomEndHandler() {
    if (!isPanZoomed) return;
    isPanZoomed = false; // Update the camera

    camera.tick();
    transformPiles();
    pubSub.publish('zoom', camera);
  };

  var layout;

  var updateScrollHeight = function updateScrollHeight() {
    var canvasHeight = canvas.getBoundingClientRect().height;
    var finalHeight = Math.round(layout.rowHeight) * (layout.numRows + EXTRA_ROWS);
    scrollEl.style.height = "".concat(Math.max(0, finalHeight - canvasHeight), "px");

    if (store.state.showGrid) {
      drawGrid();
    }
  };

  var enableScrolling = function enableScrolling() {
    if (isPanZoom === false) return false;
    disablePanZoom();
    isPanZoom = false;
    transformPointToScreen = identity;
    transformPointFromScreen = identity;
    translatePointFromScreen = identity;
    stage.y = 0;
    scrollContainer.style.overflowY = 'auto';
    scrollContainer.scrollTop = 0;
    scrollContainer.addEventListener('scroll', mouseScrollHandler, EVENT_LISTENER_PASSIVE);
    window.addEventListener('mousedown', mouseDownHandler, EVENT_LISTENER_PASSIVE);
    window.addEventListener('mouseup', mouseUpHandler, EVENT_LISTENER_PASSIVE);
    window.addEventListener('mousemove', mouseMoveHandler, EVENT_LISTENER_PASSIVE);
    canvas.addEventListener('wheel', wheelHandler, EVENT_LISTENER_ACTIVE);
    return true;
  };

  var disableScrolling = function disableScrolling() {
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

  var enablePanZoom = function enablePanZoom() {
    if (isPanZoom === true) return false;
    disableScrolling();
    isPanZoom = true;
    transformPointToScreen = transformPointToCamera;
    transformPointFromScreen = transformPointFromCamera;
    translatePointFromScreen = translatePointFromCamera;
    camera = dom2dCamera(canvas, {
      isNdc: false,
      onMouseDown: mouseDownHandler,
      onMouseUp: mouseUpHandler,
      onMouseMove: mouseMoveHandler,
      onWheel: wheelHandler,
      viewCenter: [containerWidth / 2, containerHeight / 2],
      scaleBounds: store.state.zoomBounds.map(zoomToScale)
    });
    camera.setView(clone(CAMERA_VIEW));
    return true;
  };

  var disablePanZoom = function disablePanZoom() {
    if (isPanZoom !== true) return;
    camera.dispose();
    camera = undefined;
  };

  var drawGrid = function drawGrid() {
    var height = scrollEl.getBoundingClientRect().height + canvas.getBoundingClientRect().height;

    var _canvas$getBoundingCl = canvas.getBoundingClientRect(),
        width = _canvas$getBoundingCl.width;

    var vLineNum = Math.ceil(width / layout.columnWidth);
    var hLineNum = Math.ceil(height / layout.rowHeight);
    var _store$state2 = store.state,
        gridColor = _store$state2.gridColor,
        gridOpacity = _store$state2.gridOpacity;
    gridGfx.clear();
    gridGfx.lineStyle(1, gridColor, gridOpacity); // vertical lines

    for (var i = 1; i < vLineNum; i++) {
      gridGfx.moveTo(i * layout.columnWidth, 0);
      gridGfx.lineTo(i * layout.columnWidth, height);
    } // horizontal lines


    for (var _i = 1; _i < hLineNum; _i++) {
      gridGfx.moveTo(0, _i * layout.rowHeight);
      gridGfx.lineTo(width, _i * layout.rowHeight);
    }
  };

  var clearGrid = function clearGrid() {
    gridGfx.clear();
  };

  var initGrid = function initGrid() {
    var orderer = store.state.orderer;
    layout = createGrid({
      width: containerWidth,
      height: containerHeight,
      orderer: orderer
    }, store.state);
    updateScrollHeight();
  };

  var updateGrid = function updateGrid() {
    var orderer = store.state.orderer;
    var oldLayout = layout;
    layout = createGrid({
      width: containerWidth,
      height: containerHeight,
      orderer: orderer
    }, store.state); // eslint-disable-next-line no-use-before-define

    updateLayout(oldLayout);
    updateScrollHeight();

    if (store.state.showGrid) {
      drawGrid();
    }
  };

  var levelLeaveHandler = function levelLeaveHandler(_ref5) {
    var width = _ref5.width,
        height = _ref5.height;
    pubSub.subscribe('animationEnd', function () {
      if (layout.width !== width || layout.height !== height) {
        // Set layout to the old layout given the old element width and height
        layout = createGrid({
          width: width,
          height: height,
          orderer: store.state.orderer
        }, store.state);
        updateGrid();
      }
    }, 1);
  };

  var levels = createLevels({
    element: canvas,
    pubSub: pubSub,
    store: store
  }, {
    onLeave: levelLeaveHandler
  });

  var halt = /*#__PURE__*/function () {
    var _ref6 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(options) {
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return popup.open(options);

            case 2:
              if (isPanZoom) camera.config({
                isFixed: true
              });else scrollContainer.style.overflowY = 'hidden';

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function halt(_x) {
      return _ref6.apply(this, arguments);
    };
  }();

  var resume = function resume() {
    popup.close();
    if (isPanZoom) camera.config({
      isFixed: false
    });else scrollContainer.style.overflowY = 'auto';
  };

  var updateHalt = function updateHalt() {
    var _store$state3 = store.state,
        darkMode = _store$state3.darkMode,
        haltBackgroundOpacity = _store$state3.haltBackgroundOpacity;
    popup.set({
      backgroundOpacity: haltBackgroundOpacity,
      darkMode: darkMode
    });
  };

  var updateLevels = function updateLevels() {
    var darkMode = store.state.darkMode;
    levels.set({
      darkMode: darkMode
    });
  };

  var updateLasso = function updateLasso() {
    var _store$state4 = store.state,
        darkMode = _store$state4.darkMode,
        lassoFillColor = _store$state4.lassoFillColor,
        lassoFillOpacity = _store$state4.lassoFillOpacity,
        lassoShowStartIndicator = _store$state4.lassoShowStartIndicator,
        lassoStartIndicatorOpacity = _store$state4.lassoStartIndicatorOpacity,
        lassoStrokeColor = _store$state4.lassoStrokeColor,
        lassoStrokeOpacity = _store$state4.lassoStrokeOpacity,
        lassoStrokeSize = _store$state4.lassoStrokeSize;
    lasso.set({
      fillColor: lassoFillColor,
      fillOpacity: lassoFillOpacity,
      showStartIndicator: lassoShowStartIndicator,
      startIndicatorOpacity: lassoStartIndicatorOpacity,
      strokeColor: lassoStrokeColor,
      strokeOpacity: lassoStrokeOpacity,
      strokeSize: lassoStrokeSize,
      darkMode: darkMode
    });
  };

  var itemWidthScale = createScale();
  var itemHeightScale = createScale();

  var getImageScaleFactor = function getImageScaleFactor(image) {
    return image.aspectRatio > layout.cellAspectRatio ? itemWidthScale(image.originalWidth) / image.originalWidth : itemHeightScale(image.originalHeight) / image.originalHeight;
  };

  var scaleItems = function scaleItems() {
    if (!renderedItems.size) return;
    var minWidth = Infinity;
    var maxWidth = 0;
    var minHeight = Infinity;
    var maxHeight = 0;
    renderedItems.forEach(function (item) {
      var width = item.image.originalWidth;
      var height = item.image.originalHeight;
      if (width > maxWidth) maxWidth = width;
      if (width < minWidth) minWidth = width;
      if (height > maxHeight) maxHeight = height;
      if (height < minHeight) minHeight = height;
    });
    var _store$state5 = store.state,
        itemSizeRange = _store$state5.itemSizeRange,
        itemSize = _store$state5.itemSize,
        piles = _store$state5.piles,
        previewScaling = _store$state5.previewScaling;
    var itemWidth = itemSize || layout.cellWidth;
    var itemHeight = itemSize || layout.cellHeight;
    var widthRange;
    var heightRange; // if it's within [0, 1] assume it's relative

    if (itemSizeRange[0] > 0 && itemSizeRange[0] <= 1 && itemSizeRange[1] > 0 && itemSizeRange[1] <= 1) {
      widthRange = [itemWidth * itemSizeRange[0], itemWidth * itemSizeRange[1]];
      heightRange = [itemHeight * itemSizeRange[0], itemHeight * itemSizeRange[1]];
    } else {
      widthRange = [0, itemWidth];
      heightRange = [0, itemHeight];
    }

    itemWidthScale = createScale().domain([minWidth, maxWidth]).range(widthRange);
    itemHeightScale = createScale().domain([minHeight, maxHeight]).range(heightRange);
    Object.values(piles).forEach(function (pile) {
      var scaling = isFunction(previewScaling) ? previewScaling(pile) : previewScaling;
      pile.items.forEach(function (itemId) {
        var item = renderedItems.get(itemId);
        if (!item) return;
        var scaleFactor = getImageScaleFactor(item.image);
        item.image.scale(scaleFactor);

        if (item.preview) {
          var xScale = 1 + (scaleFactor * scaling[0] - 1);
          var yScale = 1 + (scaleFactor * scaling[1] - 1);
          item.preview.scaleX(xScale);
          item.preview.scaleY(yScale);
          item.preview.rescaleBackground();
        }
      });
    });
    pileInstances.forEach(function (pile) {
      if (pile.cover) {
        var scaleFactor = getImageScaleFactor(pile.cover);
        pile.cover.scale(scaleFactor);
      }

      pile.updateOffset();
      pile.drawBorder();
    });
  };

  var movePileTo = function movePileTo(pile, x, y) {
    return pile.moveTo.apply(pile, toConsumableArray(transformPointToScreen([x, y])));
  };

  var movePileToWithUpdate = function movePileToWithUpdate(pile, x, y) {
    if (movePileTo(pile, x, y)) updatePileBounds(pile.id);
  };

  var getPileMoveToTweener = function getPileMoveToTweener(pile, x, y, options) {
    return pile.getMoveToTweener.apply(pile, toConsumableArray(transformPointToScreen([x, y])).concat([options]));
  };

  var animateMovePileTo = function animateMovePileTo(pile, x, y, options) {
    return pile.animateMoveTo.apply(pile, toConsumableArray(transformPointToScreen([x, y])).concat([options]));
  };

  var updateLayout = function updateLayout(oldLayout) {
    var _store$state6 = store.state,
        arrangementType = _store$state6.arrangementType,
        items = _store$state6.items;
    scaleItems();

    if (arrangementType === null && !isPanZoom) {
      // Since there is no automatic arrangement in place we manually move
      // piles from their old cell position to their new cell position
      var movingPiles = [];
      layout.numRows = Math.ceil(renderedItems.size / layout.numColumns);
      pileInstances.forEach(function (pile) {
        var pos = oldLayout.getPilePosByCellAlignment(pile);

        var _oldLayout$xyToIj = oldLayout.xyToIj(pos[0], pos[1]),
            _oldLayout$xyToIj2 = slicedToArray(_oldLayout$xyToIj, 2),
            oldRowNum = _oldLayout$xyToIj2[0],
            oldColumnNum = _oldLayout$xyToIj2[1];

        pile.updateOffset();
        updatePileBounds(pile.id, {
          forceUpdate: true
        });
        var oldCellIndex = oldLayout.ijToIdx(oldRowNum, oldColumnNum);

        var _layout$idxToXy = layout.idxToXy(oldCellIndex, pile.anchorBox.width, pile.anchorBox.height, pile.offset),
            _layout$idxToXy2 = slicedToArray(_layout$idxToXy, 2),
            x = _layout$idxToXy2[0],
            y = _layout$idxToXy2[1];

        movingPiles.push({
          id: pile.id,
          x: x,
          y: y
        });
      });
      pileInstances.forEach(function (pile) {
        if (pile.cover) {
          positionItems(pile.id);
        }
      });
      store.dispatch(createAction.movePiles(movingPiles));
      renderedItems.forEach(function (item) {
        item.setOriginalPosition(layout.idxToXy(items[item.id].index, item.image.width, item.image.height, item.image.center));
      });
    } else {
      positionPiles();
    }

    createRBush();
    store.state.focusedPiles.filter(function (pileId) {
      return pileInstances.has(pileId);
    }).forEach(function (pileId) {
      pileInstances.get(pileId).focus();
    });
    updateScrollHeight();
    renderRaf();
  };

  var getBackgroundColor = function getBackgroundColor(pileState) {
    var bgColor = getPileProp(store.state.pileBackgroundColor, pileState);
    if (bgColor !== null) return bgColor;
    return backgroundColor;
  };

  var createImagesAndPreviews = function createImagesAndPreviews(items) {
    var _store$state7 = store.state,
        itemRenderer = _store$state7.itemRenderer,
        previewBackgroundColor = _store$state7.previewBackgroundColor,
        previewBackgroundOpacity = _store$state7.previewBackgroundOpacity,
        pileBackgroundOpacity = _store$state7.pileBackgroundOpacity,
        previewAggregator = _store$state7.previewAggregator,
        previewRenderer = _store$state7.previewRenderer,
        previewPadding = _store$state7.previewPadding,
        piles = _store$state7.piles;
    var itemList = Object.values(items);
    var renderImages = itemRenderer(itemList.map(function (_ref7) {
      var src = _ref7.src;
      return src;
    })).then(function (textures) {
      return textures.map(createImage);
    });

    var createPreview = function createPreview(texture, index) {
      if (texture === null) return null;
      var itemState = itemList[index];
      var pileState = piles[itemState.id];
      var pileBackgroundColor = getBackgroundColor(pileState);
      var previewOptions = {
        backgroundColor: previewBackgroundColor === INHERIT ? pileBackgroundColor : getItemProp(previewBackgroundColor, itemState),
        backgroundOpacity: previewBackgroundOpacity === INHERIT ? getPileProp(pileBackgroundOpacity, pileState) : getItemProp(previewBackgroundOpacity, itemState),
        padding: getItemProp(previewPadding, itemState)
      };
      return createImageWithBackground(texture, previewOptions);
    };

    var asyncIdentity = /*#__PURE__*/function () {
      var _ref8 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(x) {
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", x.map(function (y) {
                  return y.src;
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function asyncIdentity(_x2) {
        return _ref8.apply(this, arguments);
      };
    }();

    var aggregator = previewRenderer ? previewAggregator || asyncIdentity : null;
    var renderPreviews = aggregator ? Promise.resolve(aggregator(itemList)).then(function (aggregatedItemSources) {
      return new Promise(function (resolve) {
        // Manually handle `null` values
        var response = [];
        previewRenderer(aggregatedItemSources.filter(function (src) {
          return src !== null;
        })).then(function (textures) {
          var i = 0;
          aggregatedItemSources.forEach(function (src) {
            if (src === null) {
              response.push(null);
            } else {
              response.push(textures[i++]);
            }
          });
          resolve(response);
        });
      });
    }).then(function (textures) {
      return textures.map(createPreview);
    }) : Promise.resolve([]);
    return [renderImages, renderPreviews];
  };

  var updateItemTexture = /*#__PURE__*/function () {
    var _ref9 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
      var updatedItems,
          _store$state8,
          items,
          piles,
          _args4 = arguments;

      return regenerator.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              updatedItems = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : null;
              _store$state8 = store.state, items = _store$state8.items, piles = _store$state8.piles;

              if (!updatedItems) {
                // eslint-disable-next-line no-param-reassign
                updatedItems = items;
              }

              _context3.next = 5;
              return halt();

            case 5:
              return _context3.abrupt("return", Promise.all(createImagesAndPreviews(updatedItems)).then(function (_ref10) {
                var _ref11 = slicedToArray(_ref10, 2),
                    renderedImages = _ref11[0],
                    renderedPreviews = _ref11[1];

                var updatedItemIds = Object.keys(updatedItems);
                renderedImages.forEach(function (image, index) {
                  var itemId = updatedItemIds[index];
                  var preview = renderedPreviews[itemId];

                  if (renderedItems.has(itemId)) {
                    renderedItems.get(itemId).replaceImage(image, preview);
                  }
                });
                updatedItemIds.forEach(function (itemId) {
                  if (pileInstances.has(itemId)) {
                    var pile = pileInstances.get(itemId);
                    var pileState = piles[itemId];
                    pile.replaceItemsImage();
                    pile.blur();
                    updatePileStyle(pileState, itemId);
                    updatePileItemStyle(pileState, itemId);
                    clearActivePileLayer();
                  } else {
                    // Just update part of items on a pile
                    Object.values(piles).forEach(function (pileState) {
                      if (pileState.items.includes(itemId)) {
                        var _pile = pileInstances.get(pileState.id);

                        _pile.replaceItemsImage(itemId);

                        _pile.blur();
                      }
                    });
                  }
                });
                pileInstances.forEach(function (pile) {
                  updatePreviewAndCover(piles[pile.id], pile);
                });
                scaleItems();
                renderRaf();
                resume();
              }));

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function updateItemTexture() {
      return _ref9.apply(this, arguments);
    };
  }();

  var createItemsAndPiles = /*#__PURE__*/function () {
    var _ref12 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(newItems) {
      var newItemIds;
      return regenerator.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              newItemIds = Object.keys(newItems);

              if (newItemIds.length) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return", Promise.resolve());

            case 3:
              _context4.next = 5;
              return halt();

            case 5:
              return _context4.abrupt("return", Promise.all(createImagesAndPreviews(newItems)).then(function (_ref13) {
                var _ref14 = slicedToArray(_ref13, 2),
                    renderedImages = _ref14[0],
                    renderedPreviews = _ref14[1];

                var piles = store.state.piles;
                renderedImages.forEach(function (image, index) {
                  var preview = renderedPreviews[index];
                  var id = newItemIds[index];
                  var newItem = createItem({
                    id: id,
                    image: image,
                    pubSub: pubSub
                  }, {
                    preview: preview
                  });
                  renderedItems.set(id, newItem);
                }); // We cannot combine the two loops as we might have initialized
                // piling.js with a predefined pile state. In that case a pile of
                // with a lower index might rely on an item with a higher index that
                // hasn't been created yet.

                // We cannot combine the two loops as we might have initialized
                // piling.js with a predefined pile state. In that case a pile of
                // with a lower index might rely on an item with a higher index that
                // hasn't been created yet.
                renderedImages.forEach(function (image, index) {
                  var id = newItemIds[index];
                  var pileState = piles[id];
                  if (pileState.items.length) createPileHandler(id, pileState);
                });
                scaleItems();
                renderRaf();
                resume();
              }));

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function createItemsAndPiles(_x3) {
      return _ref12.apply(this, arguments);
    };
  }();

  var isPileUnpositioned = function isPileUnpositioned(pile) {
    return pile.x === null || pile.y === null;
  };

  var getPilePositionBy1dOrdering = function getPilePositionBy1dOrdering(pileId) {
    var pile = pileInstances.get(pileId);
    var pos = layout.idxToXy(pileSortPosByAggregate[0][pileId], pile.width, pile.height, pile.offset);
    return Promise.resolve(pos);
  };

  var getPilePositionBy2dScales = function getPilePositionBy2dScales(pileId) {
    return Promise.resolve(arrangement2dScales.map(function (scale, i) {
      return scale(aggregatedPileValues[pileId][i]);
    }));
  };

  var cachedMdPilePos = new Map();
  var cachedMdPilePosDimReducerRun = 0;

  var getPilePositionByMdTransform = /*#__PURE__*/function () {
    var _ref15 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(pileId) {
      var _layout;

      var dimensionalityReducer, uv, pilePos, pile;
      return regenerator.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              dimensionalityReducer = store.state.dimensionalityReducer;

              if (!(cachedMdPilePos.has(pileId) && lastMdReducerRun === cachedMdPilePosDimReducerRun)) {
                _context5.next = 3;
                break;
              }

              return _context5.abrupt("return", cachedMdPilePos.get(pileId));

            case 3:
              cachedMdPilePosDimReducerRun = lastMdReducerRun;
              _context5.next = 6;
              return dimensionalityReducer.transform([aggregatedPileValues[pileId].flat()]);

            case 6:
              uv = _context5.sent;
              pilePos = (_layout = layout).uvToXy.apply(_layout, toConsumableArray(uv[0]));
              pile = pileInstances.get(pileId);

              if (pile.size === 1 && !cachedMdPilePos.has(pileId)) {
                pile.items[0].item.setOriginalPosition(pilePos);
              }

              cachedMdPilePos.set(pileId, pilePos);
              return _context5.abrupt("return", pilePos);

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function getPilePositionByMdTransform(_x4) {
      return _ref15.apply(this, arguments);
    };
  }();

  var getPilePositionByData = function getPilePositionByData(pileId, pileState) {
    var _store$state9 = store.state,
        arrangementObjective = _store$state9.arrangementObjective,
        arrangementOptions = _store$state9.arrangementOptions,
        dimensionalityReducer = _store$state9.dimensionalityReducer;

    if (arrangementObjective.length > 2 || arrangementOptions.forceDimReduction) {
      if (dimensionalityReducer) return getPilePositionByMdTransform(pileId);
      return Promise.resolve([pileState.x, pileState.y]);
    }

    if (arrangementObjective.length > 1) {
      return getPilePositionBy2dScales(pileId);
    }

    if (arrangementObjective.length) {
      return getPilePositionBy1dOrdering(pileId);
    }

    console.warn("Can't arrange pile by data. No arrangement objective available.");
    return Promise.resolve([pileState.x, pileState.y]);
  };

  var getPilePositionByCoords = function getPilePositionByCoords(pileState, objective) {
    if (objective.isCustom) {
      return objective.property(pileState, pileState.index);
    }

    var items = store.state.items;
    return objective.aggregator(pileState.items.map(function (itemId) {
      return objective.property(items[itemId]);
    }));
  };

  var getPilePosition = /*#__PURE__*/function () {
    var _ref16 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6(pileId, init) {
      var _layout2;

      var _store$state10, arrangementType, arrangementObjective, piles, projector, pile, pileState, isUnpositioned, type, objective, ijToXy, pos;

      return regenerator.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _store$state10 = store.state, arrangementType = _store$state10.arrangementType, arrangementObjective = _store$state10.arrangementObjective, piles = _store$state10.piles, projector = _store$state10.projector;
              pile = pileInstances.get(pileId);
              pileState = piles[pileId];
              isUnpositioned = isPileUnpositioned(pileState);
              type = init || isUnpositioned ? arrangementType || INITIAL_ARRANGEMENT_TYPE : arrangementType;
              objective = init || isUnpositioned ? arrangementObjective || INITIAL_ARRANGEMENT_OBJECTIVE : arrangementObjective;

              ijToXy = function ijToXy(i, j) {
                return layout.ijToXy(i, j, pile.width, pile.height, pile.offset);
              };

              if (!(type === 'data')) {
                _context6.next = 9;
                break;
              }

              return _context6.abrupt("return", getPilePositionByData(pileId, pileState));

            case 9:
              pos = type && getPilePositionByCoords(pileState, objective);
              _context6.t0 = type;
              _context6.next = _context6.t0 === 'index' ? 13 : _context6.t0 === 'ij' ? 14 : _context6.t0 === 'xy' ? 15 : _context6.t0 === 'uv' ? 16 : _context6.t0 === 'custom' ? 17 : 19;
              break;

            case 13:
              return _context6.abrupt("return", ijToXy.apply(void 0, toConsumableArray(layout.idxToIj(pos))));

            case 14:
              return _context6.abrupt("return", ijToXy.apply(void 0, toConsumableArray(pos)));

            case 15:
              return _context6.abrupt("return", pos);

            case 16:
              return _context6.abrupt("return", (_layout2 = layout).uvToXy.apply(_layout2, toConsumableArray(pos)));

            case 17:
              if (!projector) {
                _context6.next = 19;
                break;
              }

              return _context6.abrupt("return", projector(pos));

            case 19:
              return _context6.abrupt("return", Promise.resolve([pileState.x, pileState.y]));

            case 20:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function getPilePosition(_x5, _x6) {
      return _ref16.apply(this, arguments);
    };
  }();
  /**
   * Transform a point from screen to camera coordinates
   * @param {array} point - Point in screen coordinates
   * @return {array} Point in camera coordinates
   */


  var transformPointToCamera = function transformPointToCamera(point) {
    var v = toHomogeneous(point[0], point[1]);
    transformMat4(v, v, camera.view);
    return v.slice(0, 2);
  };
  /**
   * Transform a point from camera to screen coordinates
   * @param {array} point - Point in camera coordinates
   * @return {array} Point in screen coordinates
   */


  var transformPointFromCamera = function transformPointFromCamera(point) {
    var v = toHomogeneous(point[0], point[1]);
    transformMat4(v, v, invert(scratch, camera.view));
    return v.slice(0, 2);
  };
  /**
   * Translate a point according to the camera position.
   *
   * @description This method is similar to `transformPointFromCamera` but it
   *   does not incorporate the zoom level. We use this method together with the
   *   search index as the search index is zoom-invariant.
   *
   * @param {array} point - Point to be translated
   * @return {array} Translated point
   */


  var translatePointFromCamera = function translatePointFromCamera(point) {
    return [point[0] - camera.translation[0], point[1] - camera.translation[1]];
  };

  var positionPiles = /*#__PURE__*/function () {
    var _ref17 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7() {
      var pileIds,
          _ref18,
          _ref18$immideate,
          immideate,
          _store$state11,
          arrangeOnGrouping,
          arrangementType,
          items,
          positionAllPiles,
          movingPiles,
          readyPiles,
          _iterator,
          _step,
          _pile2,
          point,
          _point,
          x,
          y,
          arrangementCancelActions,
          _args8 = arguments;

      return regenerator.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              pileIds = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : [];
              _ref18 = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {}, _ref18$immideate = _ref18.immideate, immideate = _ref18$immideate === void 0 ? false : _ref18$immideate;
              _store$state11 = store.state, arrangeOnGrouping = _store$state11.arrangeOnGrouping, arrangementType = _store$state11.arrangementType, items = _store$state11.items;
              positionAllPiles = !pileIds.length;

              if (positionAllPiles) {
                // eslint-disable-next-line no-param-reassign
                pileIds = Object.keys(store.state.piles);
              }

              if (!(Object.keys(items).length === 0)) {
                _context7.next = 10;
                break;
              }

              createRBush();
              updateScrollHeight();
              renderRaf();
              return _context7.abrupt("return");

            case 10:
              movingPiles = [];
              readyPiles = pileIds.filter(function (id) {
                return pileInstances.has(id);
              }).map(function (id) {
                return pileInstances.get(id);
              });

              if (readyPiles.length) {
                _context7.next = 14;
                break;
              }

              return _context7.abrupt("return");

            case 14:
              _context7.next = 16;
              return arranging;

            case 16:
              // eslint-disable-next-line no-restricted-syntax
              _iterator = _createForOfIteratorHelper(readyPiles);
              _context7.prev = 17;

              _iterator.s();

            case 19:
              if ((_step = _iterator.n()).done) {
                _context7.next = 32;
                break;
              }

              _pile2 = _step.value;
              _context7.next = 23;
              return getPilePosition(_pile2.id, isInitialPositioning);

            case 23:
              point = _context7.sent;
              lastPilePosition.set(_pile2.id, point);
              _point = slicedToArray(point, 2), x = _point[0], y = _point[1];
              if (immideate || isInitialPositioning) movePileToWithUpdate(_pile2, x, y);
              movingPiles.push({
                id: _pile2.id,
                x: x,
                y: y
              });
              layout.numRows = Math.max(layout.numRows, Math.ceil(y / layout.rowHeight));

              if (isInitialPositioning || isPileUnpositioned(_pile2) || arrangementType && !arrangeOnGrouping) {
                renderedItems.get(_pile2.id).setOriginalPosition([x, y]);
              }

            case 30:
              _context7.next = 19;
              break;

            case 32:
              _context7.next = 37;
              break;

            case 34:
              _context7.prev = 34;
              _context7.t0 = _context7["catch"](17);

              _iterator.e(_context7.t0);

            case 37:
              _context7.prev = 37;

              _iterator.f();

              return _context7.finish(37);

            case 40:
              isInitialPositioning = false;
              arrangementCancelActions = !arrangeOnGrouping ? getArrangementCancelActions() : [];
              store.dispatch(batchActions([createAction.movePiles(movingPiles)].concat(toConsumableArray(arrangementCancelActions))));
              if (positionAllPiles) createRBush();
              updateScrollHeight();
              renderRaf();

            case 46:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[17, 34, 37, 40]]);
    }));

    return function positionPiles() {
      return _ref17.apply(this, arguments);
    };
  }();

  var positionPilesDb = debounce(positionPiles, POSITION_PILES_DEBOUNCE_TIME);

  var positionItems = function positionItems(pileId) {
    var _ref19 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref19$all = _ref19.all,
        all = _ref19$all === void 0 ? false : _ref19$all;

    var _store$state12 = store.state,
        piles = _store$state12.piles,
        pileOrderItems = _store$state12.pileOrderItems;
    var pileInstance = pileInstances.get(pileId);
    if (!pileInstance) return;

    if (isFunction(pileOrderItems)) {
      var pileState = piles[pileId];
      pileInstance.setItemOrder(pileOrderItems(pileState));
    }

    pileInstance.positionItems(animator, {
      all: all
    });
  };

  var updatePileItemStyle = function updatePileItemStyle(pileState, pileId) {
    var _store$state13 = store.state,
        items = _store$state13.items,
        pileItemBrightness = _store$state13.pileItemBrightness,
        pileItemInvert = _store$state13.pileItemInvert,
        pileItemOpacity = _store$state13.pileItemOpacity,
        pileItemTint = _store$state13.pileItemTint;
    var pileInstance = pileInstances.get(pileId);
    pileInstance.items.forEach(function (pileItem, i) {
      var itemState = items[pileItem.id];
      pileItem.animateOpacity(isFunction(pileItemOpacity) ? pileItemOpacity(itemState, i, pileState) : pileItemOpacity);
      pileItem.image.invert(isFunction(pileItemInvert) ? pileItemInvert(itemState, i, pileState) : pileItemInvert); // We can't apply a brightness and invert effect as both rely on the same
      // mechanism. Therefore we decide to give invert higher precedence.

      if (!pileItemInvert) {
        pileItem.image.brightness(isFunction(pileItemBrightness) ? pileItemBrightness(itemState, i, pileState) : pileItemBrightness); // We can't apply a brightness and tint effect as both rely on the same
        // mechanism. Therefore we decide to give brightness higher precedence.

        if (!pileItemBrightness) {
          pileItem.image.tint(isFunction(pileItemTint) ? pileItemTint(itemState, i, pileState) : pileItemTint);
        }
      }
    });
  };

  var updatePileStyle = function updatePileStyle(pile, pileId) {
    var pileInstance = pileInstances.get(pileId);
    if (!pileInstance) return;
    var _store$state14 = store.state,
        pileOpacity = _store$state14.pileOpacity,
        pileBorderSize = _store$state14.pileBorderSize,
        pileScale = _store$state14.pileScale,
        pileSizeBadge = _store$state14.pileSizeBadge,
        pileVisibilityItems = _store$state14.pileVisibilityItems;
    pileInstance.animateOpacity(isFunction(pileOpacity) ? pileOpacity(pile) : pileOpacity);
    pileInstance.animateScale(isFunction(pileScale) ? pileScale(pile) : pileScale);
    pileInstance.setBorderSize(isFunction(pileBorderSize) ? pileBorderSize(pile) : pileBorderSize);
    pileInstance.showSizeBadge(isFunction(pileSizeBadge) ? pileSizeBadge(pile) : pileSizeBadge);
    pileInstance.setVisibilityItems(isFunction(pileVisibilityItems) ? pileVisibilityItems(pile) : pileVisibilityItems);
    renderRaf();
  };

  var createScaledImage = function createScaledImage(texture) {
    var image = createImage(texture);
    image.scale(getImageScaleFactor(image));
    return image;
  };

  var updatePreviewStyle = function updatePreviewStyle(pileState) {
    var _store$state15 = store.state,
        previewRenderer = _store$state15.previewRenderer,
        previewScaling = _store$state15.previewScaling;
    if (!previewRenderer) return;
    var scaling = isFunction(previewScaling) ? previewScaling(pileState) : previewScaling;
    pileState.items.forEach(function (itemId) {
      var item = renderedItems.get(itemId);
      if (!item.preview) return;
      var scaleFactor = getImageScaleFactor(item.image);
      var xScale = 1 + (scaleFactor * scaling[0] - 1);
      var yScale = 1 + (scaleFactor * scaling[1] - 1);
      item.preview.scaleX(xScale);
      item.preview.scaleY(yScale);
    });
  };

  var updateCover = function updateCover(pileState, pileInstance) {
    var _store$state16 = store.state,
        items = _store$state16.items,
        coverRenderer = _store$state16.coverRenderer,
        coverAggregator = _store$state16.coverAggregator,
        pileCoverInvert = _store$state16.pileCoverInvert,
        pileCoverScale = _store$state16.pileCoverScale,
        previewAggregator = _store$state16.previewAggregator,
        previewRenderer = _store$state16.previewRenderer;
    var itemsOnPile = [];
    var itemInstances = [];
    pileState.items.forEach(function (itemId) {
      itemsOnPile.push(items[itemId]);
      itemInstances.push(renderedItems.get(itemId));
    });
    pileInstance.setItems(itemInstances, {
      asPreview: !!(previewAggregator || previewRenderer),
      shouldDrawPlaceholder: true
    });

    if (!coverRenderer) {
      pileInstance.setCover(null);
      positionItems(pileInstance.id, {
        all: true
      });
      return;
    }

    var whenCoverImage = Promise.resolve(coverAggregator(itemsOnPile)).then(function (aggregatedSrcs) {
      return coverRenderer([aggregatedSrcs]);
    }).then(function (_ref20) {
      var _ref21 = slicedToArray(_ref20, 1),
          coverTexture = _ref21[0];

      var scaledImage = createScaledImage(coverTexture);
      scaledImage.invert(isFunction(pileCoverInvert) ? pileCoverInvert(pileState) : pileCoverInvert);
      var extraScale = isFunction(pileCoverScale) ? pileCoverScale(pileState) : pileCoverScale;
      scaledImage.scale(scaledImage.scaleFactor * extraScale);
      return scaledImage;
    });
    pileInstance.setCover(whenCoverImage);
    whenCoverImage.then(function () {
      positionItems(pileInstance.id);
      updatePileBounds(pileInstance.id);
      renderRaf();
    });
  };

  var updatePreviewAndCover = function updatePreviewAndCover(pileState, pileInstance) {
    if (pileState.items.length === 1) {
      pileInstance.setCover(null);
      positionItems(pileInstance.id);
      pileInstance.setItems([renderedItems.get(pileState.items[0])]);
    } else {
      updatePreviewStyle(pileState);
      updateCover(pileState, pileInstance);
    }
  };

  var isDimReducerInUse = function isDimReducerInUse() {
    var _store$state17 = store.state,
        arrangementObjective = _store$state17.arrangementObjective,
        arrangementOptions = _store$state17.arrangementOptions;
    return arrangementObjective && (arrangementObjective.length > 2 || arrangementOptions.forceDimReduction);
  };

  var updatePileItems = function updatePileItems(pileState, id) {
    if (pileInstances.has(id)) {
      var pileInstance = pileInstances.get(id);

      if (pileState.items.length === 0) {
        deletePileHandler(id);
      } else {
        cachedMdPilePos["delete"](id);
        var itemInstances = pileState.items.map(function (itemId) {
          return renderedItems.get(itemId);
        });

        if (store.state.coverAggregator) {
          updatePreviewAndCover(pileState, pileInstance);
        } else {
          if (store.state.previewRenderer) {
            updatePreviewStyle(pileState);
          }

          pileInstance.setItems(itemInstances);
          positionItems(id);
        }

        if (itemInstances.length === 1 && isDimReducerInUse()) {
          cachedMdPilePos.set(id, itemInstances[0].originalPosition);
        }

        updatePileBounds(id, {
          forceUpdate: true
        });
        updatePileItemStyle(pileState, id);
      }
    } else {
      createPileHandler(id, pileState);
    }
  };

  var updatePilePosition = function updatePilePosition(pileState, id) {
    var pileInstance = pileInstances.get(id);

    if (pileInstance) {
      lastPilePosition.set(id, [pileState.x, pileState.y]);
      return Promise.all([animateMovePileTo(pileInstance, pileState.x, pileState.y), new Promise(function (resolve) {
        function pileBoundsUpdateHandler(pileId) {
          if (pileId === id) {
            pubSub.unsubscribe('pileBoundsUpdate', this);
            resolve();
          }
        }

        pubSub.subscribe('pileBoundsUpdate', pileBoundsUpdateHandler);
      })]);
    }

    return Promise.resolve();
  };

  var updateGridMat = function updateGridMat(pileId) {
    var mat = ndarray(new Uint16Array(new Array(layout.numColumns * layout.numRows).fill(0)), [layout.numRows, layout.olNum]);
    gridMat = mat;
    pileInstances.forEach(function (pile) {
      if (pile.id === pileId) return;
      var minY = Math.floor(pile.bBox.minX / layout.columnWidth);
      var minX = Math.floor(pile.bBox.minY / layout.rowHeight);
      var maxY = Math.floor(pile.bBox.maxX / layout.columnWidth);
      var maxX = Math.floor(pile.bBox.maxY / layout.rowHeight);
      gridMat.set(minX, minY, 1);
      gridMat.set(minX, maxY, 1);
      gridMat.set(maxX, minY, 1);
      gridMat.set(maxX, maxY, 1);
    });
  };

  var next = function next(distanceMat, current) {
    var nextPos;
    var minValue = Infinity; // top

    if (current[0] - 1 >= 0 && distanceMat.get(current[0] - 1, current[1]) < minValue) {
      minValue = distanceMat.get(current[0] - 1, current[1]);
      nextPos = [current[0] - 1, current[1]];
    } // left


    if (current[1] - 1 >= 0 && distanceMat.get(current[0], current[1] - 1) < minValue) {
      minValue = distanceMat.get(current[0], current[1] - 1);
      nextPos = [current[0], current[1] - 1];
    } // bottom


    if (current[0] + 1 < distanceMat.shape[0] && distanceMat.get(current[0] + 1, current[1]) < minValue) {
      minValue = distanceMat.get(current[0] + 1, current[1]);
      nextPos = [current[0] + 1, current[1]];
    } // right


    if (current[1] + 1 < distanceMat.shape[1] && distanceMat.get(current[0], current[1] + 1) < minValue) {
      minValue = distanceMat.get(current[0], current[1] + 1);
      nextPos = [current[0], current[1] + 1];
    }

    var length = distanceMat.data.length;
    distanceMat.set(current[0], current[1], length);

    if (minValue === distanceMat.data.length) {
      for (var i = 0; i < distanceMat.shape[0]; i++) {
        for (var j = 0; j < distanceMat.shape[1]; j++) {
          if (distanceMat.get(i, j) < minValue && distanceMat.get(i, j) > 0) minValue = distanceMat.get(i, j);
          nextPos = [i, j];
        }
      }
    }

    return nextPos;
  };

  var calcDist = function calcDist(distanceMat, x, y, origin) {
    if (distanceMat.get(x, y) !== -1) return;
    var distance = l2PointDist(x, y, origin[0], origin[1]);
    distanceMat.set(x, y, distance);
  };

  var findDepilePos = function findDepilePos(distanceMat, resultMat, origin, filterRowNum) {
    var current = toConsumableArray(origin);

    var depilePos;
    var count = 0;

    while (!depilePos && count < distanceMat.data.length) {
      // check current
      if (resultMat.get(current[0], current[1]) < 1) depilePos = current;

      if (!depilePos) {
        // calc dist
        // top
        if (current[0] - 1 >= 0) {
          calcDist(distanceMat, current[0] - 1, current[1], origin);
        } // left


        if (current[1] - 1 >= 0) {
          calcDist(distanceMat, current[0], current[1] - 1, origin);
        } // bottom


        if (current[0] + 1 < distanceMat.shape[0]) {
          calcDist(distanceMat, current[0] + 1, current[1], origin);
        } // right


        if (current[1] + 1 < distanceMat.shape[1]) {
          calcDist(distanceMat, current[0], current[1] + 1, origin);
        } // get closest cell


        current = next(distanceMat, current);
        count++;
      }
    } // doesn't find an available cell


    if (!depilePos) {
      depilePos = [resultMat.shape[0] + 1, Math.floor(filterRowNum / 2)];
      layout.numRows += filterRowNum;
      updateScrollHeight();
    }

    return depilePos;
  };

  var convolveGridMat = function convolveGridMat(filterColNum, filterRowNum) {
    var filter = ndarray(new Float32Array(new Array(filterColNum * filterRowNum).fill(1)), [filterRowNum, filterColNum]);
    var resultMat = ndarray(new Float32Array((layout.numRows - filterRowNum + 1) * (layout.numColumns - filterColNum + 1)), [layout.numRows - filterRowNum + 1, layout.olNum - filterColNum + 1]);
    convolve(resultMat, gridMat, filter);
    return resultMat;
  };

  var findPos = function findPos(origin, colNum, rowNum) {
    var resultMat = convolveGridMat(colNum, rowNum);
    var distanceMat = ndarray(new Float32Array(new Array((layout.numRows - rowNum + 1) * (layout.numColumns - colNum + 1)).fill(-1)), [layout.numRows - rowNum + 1, layout.numColumns - colNum + 1]);
    var depilePos = findDepilePos(distanceMat, resultMat, origin, rowNum);
    var distance = l2PointDist(depilePos[0], depilePos[1], origin[0], origin[1]);
    return {
      depilePos: depilePos,
      distance: distance
    };
  };

  var animateDepile = function animateDepile(srcPileId, itemIds) {
    var itemPositions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    return new Promise(function (resolve) {
      var easing = store.state.easing;
      var movingPiles = [];
      var srcPile = pileInstances.get(srcPileId);
      srcPile.blur();
      srcPile.drawBorder();
      var readyPiles = itemIds.map(function (itemId) {
        return pileInstances.get(itemId);
      }).filter(identity);

      var onAllDone = function onAllDone() {
        movingPiles.forEach(function (pileMove) {
          updatePileBounds(pileMove.id);
        });
        store.dispatch(createAction.movePiles(movingPiles));
        resolve();
      };

      var done = 0;

      var onDone = function onDone() {
        done++;
        if (done === readyPiles.length) onAllDone();
      };

      animator.addBatch(readyPiles.map(function (pile, index) {
        var pileItem = pile.getItemById(pile.id);
        movingPiles.push({
          id: pile.id,
          x: pileItem.item.originalPosition[0],
          y: pileItem.item.originalPosition[1]
        });
        var endPos = itemPositions.length > 0 ? itemPositions[index] : transformPointToScreen(pileItem.item.originalPosition);
        var d = l2PointDist.apply(void 0, toConsumableArray(endPos).concat([pile.x, pile.y]));
        var duration = cubicOut(Math.min(d, 250) / 250) * 250;
        return createTweener({
          duration: duration,
          easing: easing,
          interpolator: interpolateVector,
          endValue: [].concat(toConsumableArray(itemPositions.length > 0 ? itemPositions[index] : transformPointToScreen(pileItem.item.originalPosition)), [0 // angle
          ]),
          getter: function getter() {
            return [pile.x, pile.y, pileItem.displayObject.angle];
          },
          setter: function setter(newValue) {
            pile.moveTo(newValue[0], newValue[1]);
            pileItem.displayObject.angle = newValue[2];
          },
          onDone: onDone
        });
      }));
    });
  };

  var depile = function depile(pileId) {
    var itemNum = pileInstances.get(pileId).size;
    if (itemNum === 1) return;
    updateGridMat(pileId); // take the center point of pile as the original pos

    var bBox = pileInstances.get(pileId).bBox;
    var centerY = Math.floor((bBox.minX + bBox.maxX) / (layout.columnWidth * 2));
    var centerX = Math.floor((bBox.minY + bBox.maxY) / (layout.rowHeight * 2));
    var origin = [centerX, centerY];
    var colNum = Math.ceil(Math.sqrt(itemNum));
    var rowNum = Math.ceil(itemNum / colNum);
    var depilePos;
    var filterRowNum;
    var filterColNum;

    if (colNum !== rowNum) {
      var result1 = findPos(origin, colNum, rowNum);
      var result2 = findPos(origin, rowNum, colNum);
      depilePos = result1.distance > result2.distance ? result2.depilePos : result1.depilePos;
      filterColNum = result1.distance > result2.distance ? rowNum : colNum;
      filterRowNum = result1.distance > result2.distance ? colNum : rowNum;
    } else {
      depilePos = findPos(origin, colNum, rowNum).depilePos;
      filterColNum = colNum;
      filterRowNum = rowNum;
    }

    var piles = store.state.piles;
    var depiledPiles = [];

    var items = toConsumableArray(piles[pileId].items);

    var itemPositions = [];

    for (var i = 0; i < items.length; i++) {
      var x = Math.floor(i / filterColNum) + depilePos[0] - Math.floor((filterRowNum - 1) / 2);
      var y = i % filterColNum + depilePos[1] - Math.floor((filterColNum - 1) / 2);
      itemPositions.push([y * layout.columnWidth, x * layout.rowHeight]);
    } // starts from the depiled pile's position


    var depiledPile = {
      items: items,
      x: piles[pileId].x,
      y: piles[pileId].y
    };
    depiledPiles.push(depiledPile);
    store.dispatch(createAction.scatterPiles(depiledPiles));
    animateDepile(pileId, items, itemPositions);
    store.dispatch(createAction.setDepiledPile([]));
  };

  var depileToOriginPos = function depileToOriginPos(pileId) {
    var piles = store.state.piles;

    var items = toConsumableArray(piles[pileId].items); // starts from the depiled pile's position


    var depiledPile = {
      items: items,
      x: piles[pileId].x,
      y: piles[pileId].y
    };
    store.dispatch(createAction.scatterPiles([depiledPile]));
    blurPrevDragOverPiles();

    if (!store.state.arrangementType) {
      animateDepile(pileId, items);
    }
  };

  var extractItemsFromPile = function extractItemsFromPile(pileId, itemIds) {
    var piles = store.state.piles;
    var leftItemIds = piles[pileId].items.filter(function (d) {
      return !itemIds.includes(d);
    });

    var splits = defineProperty({}, pileId, [leftItemIds, itemIds]);

    store.dispatch(createAction.splitPiles(splits));
  };

  var animateTempDepileItem = function animateTempDepileItem(item, x, y) {
    var _ref22 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref22$onDone = _ref22.onDone,
        _onDone = _ref22$onDone === void 0 ? identity : _ref22$onDone;

    animator.add(createTweener({
      interpolator: interpolateVector,
      endValue: [x, y],
      getter: function getter() {
        return [item.x, item.y];
      },
      setter: function setter(newValue) {
        item.x = newValue[0];
        item.y = newValue[1];
      },
      onDone: function onDone() {
        _onDone();
      }
    }));
  };

  var showFilterLayer = function showFilterLayer() {
    filterLayer.tint = store.state.darkMode ? 0x000000 : 0xffffff;
    filterLayer.width = containerWidth;
    filterLayer.height = containerHeight;
    filterLayer.alpha = 0.9;
  };

  var hideFilterLayer = function hideFilterLayer() {
    filterLayer.alpha = 0;
  };

  var closeTempDepile = function closeTempDepile(pileIds) {
    var piles = store.state.piles;
    pileIds.forEach(function (pileId) {
      var pile = pileInstances.get(pileId);
      clearActivePileLayer();
      hideFilterLayer();

      var onDone = function onDone() {
        pile.tempDepileContainer.removeChildren();
        pile.isTempDepiled = false;
        pile.focus();
        store.dispatch(createAction.setFocusedPiles([pile.id]));
        updatePileBounds(pileId);
      };

      pile.tempDepileContainer.children.forEach(function (item, index) {
        var options = index === pile.tempDepileContainer.children.length - 1 ? {
          onDone: onDone
        } : undefined;
        animateTempDepileItem(item, -pile.tempDepileContainer.x, -pile.tempDepileContainer.y, options);
      });
    });
    pubSub.publish('pileInactive', {
      targets: pileIds.map(function (id) {
        return piles[id];
      })
    });
    renderRaf();
  };

  var tempDepileOneD = function tempDepileOneD(_ref23) {
    var pile = _ref23.pile,
        tempDepileDirection = _ref23.tempDepileDirection,
        items = _ref23.items;

    var onDone = function onDone() {
      pile.isTempDepiled = true;
      store.dispatch(createAction.setFocusedPiles([]));
      store.dispatch(createAction.setFocusedPiles([pile.id]));
    };

    var scale = camera ? camera.scaling : 1;

    var createOptions = function createOptions(isLast) {
      return isLast ? {
        onDone: onDone
      } : undefined;
    };

    if (tempDepileDirection === 'horizontal') {
      pile.tempDepileContainer.x = pile.bBox.width / scale;
      pile.tempDepileContainer.y = 0;
      pile.tempDepileContainer.interactive = true;
      var widths = 0;
      items.forEach(function (itemId, index) {
        var clonedSprite = cloneSprite(renderedItems.get(itemId).image.sprite);
        clonedSprite.x = -pile.tempDepileContainer.x;
        pile.tempDepileContainer.addChild(clonedSprite);
        var options = createOptions(index === items.length - 1);
        animateTempDepileItem(clonedSprite, index * 5 + widths, 0, options);
        widths += clonedSprite.width;
      });
    } else if (tempDepileDirection === 'vertical') {
      pile.tempDepileContainer.x = 0;
      pile.tempDepileContainer.x = pile.bBox.height / scale;
      pile.tempDepileContainer.interactive = true;
      var heights = 0;
      items.forEach(function (itemId, index) {
        var clonedSprite = cloneSprite(renderedItems.get(itemId).image.sprite);
        clonedSprite.y = -pile.tempDepileContainer.y;
        pile.tempDepileContainer.addChild(clonedSprite);
        var options = createOptions(index === items.length - 1);
        animateTempDepileItem(clonedSprite, 0, index * 5 + heights, options);
        heights += clonedSprite.height;
      });
    }
  };

  var tempDepileTwoD = function tempDepileTwoD(_ref24) {
    var pile = _ref24.pile,
        items = _ref24.items,
        orderer = _ref24.orderer;
    var scale = camera ? camera.scaling : 1;
    pile.tempDepileContainer.x = pile.bBox.width / scale;
    pile.tempDepileContainer.y = 0; // Number of columns

    var numColumns = Math.ceil(Math.sqrt(items.length));

    var onDone = function onDone() {
      pile.isTempDepiled = true;
      store.dispatch(createAction.setFocusedPiles([]));
      store.dispatch(createAction.setFocusedPiles([pile.id]));
    };

    var createOptions = function createOptions(isLast) {
      return isLast ? {
        onDone: onDone
      } : undefined;
    };

    var getPosition = orderer(numColumns);
    items.forEach(function (itemId, index) {
      var clonedSprite = cloneSprite(renderedItems.get(itemId).image.sprite);
      clonedSprite.x = -pile.tempDepileContainer.x;
      pile.tempDepileContainer.addChild(clonedSprite);

      var _getPosition = getPosition(index),
          _getPosition2 = slicedToArray(_getPosition, 2),
          j = _getPosition2[0],
          i = _getPosition2[1]; // TODO: allow adjusting the padding!


      var x = j * (layout.cellWidth + 6);
      var y = i * (layout.cellHeight + 6);
      var options = createOptions(index === items.length - 1);
      animateTempDepileItem(clonedSprite, x, y, options);
    });
  };

  var tempDepile = function tempDepile(pileIds) {
    var _store$state18 = store.state,
        piles = _store$state18.piles,
        tempDepileDirection = _store$state18.tempDepileDirection,
        tempDepileOneDNum = _store$state18.tempDepileOneDNum,
        orderer = _store$state18.orderer;
    pileIds.forEach(function (pileId) {
      var pile = pileInstances.get(pileId);
      moveToActivePileLayer(pile.graphics);
      showFilterLayer();
      pile.enableInteractivity();

      var items = toConsumableArray(piles[pileId].items);

      if (items.length < tempDepileOneDNum) {
        tempDepileOneD({
          pile: pile,
          tempDepileDirection: tempDepileDirection,
          items: items
        });
      } else {
        tempDepileTwoD({
          pile: pile,
          items: items,
          orderer: orderer
        });
      }

      updatePileBounds(pileId);
    });
    pubSub.publish('pileActive', {
      targets: pileIds.map(function (id) {
        return piles[id];
      })
    });
    renderRaf();
  };

  var getMousePosition = function getMousePosition(event) {
    var rect = canvas.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top - stage.y];
  };

  var findPilesInLasso = function findPilesInLasso(lassoPolygon) {
    var lassoBBox = getBBox(lassoPolygon);
    var pileBBoxes = spatialIndex.search(lassoBBox);
    var pilesInPolygon = [];
    pileBBoxes.forEach(function (pileBBox) {
      if (isPointInPolygon([pileBBox.minX, pileBBox.minY], lassoPolygon) || isPointInPolygon([pileBBox.minX, pileBBox.maxY], lassoPolygon) || isPointInPolygon([pileBBox.maxX, pileBBox.minY], lassoPolygon) || isPointInPolygon([pileBBox.maxX, pileBBox.maxY], lassoPolygon)) pilesInPolygon.push(pileBBox.id);
    });
    return pilesInPolygon;
  };

  var lassoEndHandler = /*#__PURE__*/function () {
    var _ref25 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee8() {
      var whenMerged, lassoPoints, lassoPolygon, pilesInLasso;
      return regenerator.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              whenMerged = Promise.resolve();
              isLasso = false;
              lassoPoints = lasso.end();
              lassoPolygon = lassoPoints.flatMap(translatePointFromScreen);
              drawSpatialIndex([lassoPolygon.length - 2, lassoPolygon.length - 1], lassoPolygon);

              if (!store.state.temporaryDepiledPiles.length) {
                pilesInLasso = findPilesInLasso(lassoPolygon);
                updateOriginalPilePosition(pilesInLasso);

                if (pilesInLasso.length > 1) {
                  store.dispatch(createAction.setFocusedPiles([]));
                  whenMerged = animateMerge([pilesInLasso]);
                }
              }

              _context8.next = 8;
              return whenMerged;

            case 8:
              enableInteractivity();

            case 9:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function lassoEndHandler() {
      return _ref25.apply(this, arguments);
    };
  }();

  var animateMerge = function animateMerge(groupsOfPileIds, centerAggregation) {
    var vMean = function vMean(n) {
      return function (aggregate, x) {
        return aggregate + x / n;
      };
    };

    var vMin = function vMin() {
      return function (aggregate, x) {
        return Math.min(aggregate, x);
      };
    };

    var vMax = function vMax() {
      return function (aggregate, x) {
        return Math.max(aggregate, x);
      };
    };

    var aggregaters = {
      x: vMean,
      y: vMean
    };
    var startValues = {
      x: 0,
      y: 0
    };

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

    return Promise.all(groupsOfPileIds.map(function (pileIds) {
      return new Promise(function (resolve, reject) {
        var _store$state19 = store.state,
            easing = _store$state19.easing,
            piles = _store$state19.piles;
        var finalX = startValues.x;
        var finalY = startValues.y;
        var xAgg = aggregaters.x(pileIds.length);
        var yAgg = aggregaters.y(pileIds.length);
        pileIds.forEach(function (id) {
          finalX = xAgg(finalX, piles[id].x);
          finalY = yAgg(finalY, piles[id].y);
        });

        var onAllDone = function onAllDone() {
          updatePileBounds(pileIds[0]);
          resolve(createAction.mergePiles(pileIds, [finalX, finalY]));
        };

        var onDone = function onDone() {
          if (++done === pileIds.length) onAllDone();
        };

        var done = 0;
        animator.addBatch(pileIds.map(function (id) {
          var pileInstance = pileInstances.get(id);
          if (!pileInstance) reject(new Error("Pile #".concat(id, " not ready")));
          return getPileMoveToTweener(pileInstances.get(id), finalX, finalY, {
            easing: easing,
            onDone: onDone
          });
        }).filter(function (x) {
          if (x === null) {
            onDone();
          }

          return x;
        }));
      });
    })).then(function (mergeActions) {
      store.dispatch(batchActions(mergeActions));
    });
  };

  var scalePile = function scalePile(pileId, wheelDelta) {
    var pile = pileInstances.get(pileId);

    if (pile.magnifyByWheel(wheelDelta)) {
      updatePileBounds(pileId, {
        forceUpdate: true
      });
      pile.drawBorder();
    }

    renderRaf();
  };

  var deleteItemAndPile = function deleteItemAndPile(itemId) {
    if (renderedItems.has(itemId)) {
      renderedItems.get(itemId).destroy();
    }

    renderedItems["delete"](itemId);
    deletePileHandler(itemId);
  };

  var deleteItemsAndPiles = function deleteItemsAndPiles(items) {
    Object.keys(items).forEach(deleteItemAndPile);
    return Promise.resolve();
  };

  var createPileHandler = function createPileHandler(pileId, pileState) {
    var _transformPointToScre = transformPointToScreen([pileState.x, pileState.y]),
        _transformPointToScre2 = slicedToArray(_transformPointToScre, 2),
        x = _transformPointToScre2[0],
        y = _transformPointToScre2[1];

    var items = pileState.items.length ? pileState.items.map(function (itemId) {
      return renderedItems.get(itemId);
    }) : [renderedItems.get(pileId)];
    var newPile = createPile({
      render: renderRaf,
      id: pileId,
      pubSub: pubSub,
      store: store,
      badgeFactory: badgeFactory
    }, {
      x: x,
      y: y
    });
    pileInstances.set(pileId, newPile);

    if (store.state.coverAggregator) {
      updatePreviewAndCover(pileState, newPile);
    } else {
      if (store.state.previewRenderer) {
        updatePreviewStyle(pileState);
      }

      newPile.setItems(items);
      positionItems(pileId);
    }

    normalPiles.addChild(newPile.graphics);
    updatePileBounds(pileId, {
      forceUpdate: true
    });
    updatePileItemStyle(pileState, pileId);
    lastPilePosition.set(pileId, [pileState.x, pileState.y]);
  };

  var deletePileHandler = function deletePileHandler(pileId) {
    if (pileInstances.has(pileId)) {
      pileInstances.get(pileId).destroy();
      deletePileFromSearchIndex(pileId);
    }

    pileInstances["delete"](pileId);
    lastPilePosition["delete"](pileId);
    delete aggregatedPileValues[pileId]; // We *do not* delete the cached multi-dimensional position as that
    // position can come in handy when we depile the pile again
  };

  var groupSpatially = function groupSpatially(_ref26) {
    var bBoxifier = _ref26.bBoxifier,
        absComparator = _ref26.absComparator,
        relComparator = _ref26.relComparator;
    return /*#__PURE__*/function () {
      var _ref27 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee9(requirement) {
        var _ref28,
            _ref28$conditions,
            conditions,
            _ref28$centerAggregat,
            centerAggregator,
            piles,
            alreadyPiledPiles,
            newPiles,
            newPilesBBox,
            addPile,
            search,
            resolved,
            numNewGroupings,
            _args10 = arguments;

        return regenerator.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _ref28 = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : {}, _ref28$conditions = _ref28.conditions, conditions = _ref28$conditions === void 0 ? [] : _ref28$conditions, _ref28$centerAggregat = _ref28.centerAggregator, centerAggregator = _ref28$centerAggregat === void 0 ? meanVector : _ref28$centerAggregat;
                piles = store.state.piles;
                alreadyPiledPiles = new Map();
                newPiles = {};
                newPilesBBox = {};

                addPile = function addPile(target, hit, value) {
                  if (!newPiles[target.id]) {
                    newPiles[target.id] = defineProperty({}, target.id, true);
                    alreadyPiledPiles.set(target.id, [target.id, 1]);

                    var _w = target.maxX - target.minX;

                    var _h = target.maxY - target.minY;

                    newPilesBBox[target.id] = {
                      w: _w,
                      h: _h,
                      c: [[target.minX + _w / 2, target.minY + _h / 2]]
                    };
                  }

                  if (newPiles[target.id][hit.id]) return false;
                  newPiles[target.id][hit.id] = true;
                  alreadyPiledPiles.set(hit.id, [target.id, relComparator(value, target)[0]]);
                  var w = hit.maxX - hit.minX;
                  var h = hit.maxY - hit.minY;
                  newPilesBBox[target.id].w = Math.max(newPilesBBox[target.id].w, w);
                  newPilesBBox[target.id].h = Math.max(newPilesBBox[target.id].h, h);
                  newPilesBBox[target.id].c.push([hit.minX + w / 2, hit.minY + h / 2]);
                  return true;
                };

                search = function search(currentTarget) {
                  var hits = spatialIndex.search(bBoxifier(currentTarget, requirement));
                  var numGroupings = 0;
                  if (hits.length === 1) return numGroupings;
                  hits.forEach(function (hit) {
                    if (hit.id === currentTarget.id) return;

                    var _absComparator = absComparator(currentTarget, hit, requirement),
                        _absComparator2 = slicedToArray(_absComparator, 2),
                        value = _absComparator2[0],
                        vOkay = _absComparator2[1];

                    var okay = vOkay && conditions.every(function (condition) {
                      return condition(piles[currentTarget.id], piles[hit.id]);
                    });

                    if (okay) {
                      if (alreadyPiledPiles.has(hit.id) && !(newPiles[currentTarget.id] && newPiles[currentTarget.id][hit.id])) {
                        var _alreadyPiledPiles$ge = alreadyPiledPiles.get(hit.id),
                            _alreadyPiledPiles$ge2 = slicedToArray(_alreadyPiledPiles$ge, 2),
                            prevTargetId = _alreadyPiledPiles$ge2[0],
                            prevTargetValue = _alreadyPiledPiles$ge2[1];

                        if (!relComparator(value, currentTarget, prevTargetValue)[1]) return; // New target is closer to overlaps more so we remove the hit
                        // from the old pile

                        delete newPiles[prevTargetId][hit.id];
                      }

                      numGroupings += addPile(currentTarget, hit, value);
                    }
                  });
                  return numGroupings;
                };

                spatialIndex.all().forEach(function (currentTarget) {
                  if (alreadyPiledPiles.has(currentTarget.id)) return;
                  search(currentTarget);
                }); // Resolve subsequent overlaps

                resolved = false;

                while (!resolved) {
                  numNewGroupings = Object.keys(newPiles).reduce(function (numGroupings, id) {
                    var _newPilesBBox$id = newPilesBBox[id],
                        w = _newPilesBBox$id.w,
                        h = _newPilesBBox$id.h,
                        c = _newPilesBBox$id.c;

                    var _centerAggregator = centerAggregator(c),
                        _centerAggregator2 = slicedToArray(_centerAggregator, 2),
                        cX = _centerAggregator2[0],
                        cY = _centerAggregator2[1];

                    var query = {
                      id: id,
                      minX: cX - w / 2,
                      maxX: cX + w / 2,
                      minY: cY - h / 2,
                      maxY: cY + h / 2
                    };
                    return numGroupings + search(query);
                  }, 0);
                  resolved = numNewGroupings === 0;
                }

                return _context9.abrupt("return", Object.values(newPiles).map(Object.keys));

              case 11:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      return function (_x7) {
        return _ref27.apply(this, arguments);
      };
    }();
  };

  var groupByOverlapAbsComparator = function groupByOverlapAbsComparator(target, hit, sqrtPixels) {
    var minX = Math.max(target.minX, hit.minX);
    var minY = Math.max(target.minY, hit.minY);
    var maxX = Math.min(target.maxX, hit.maxX);
    var maxY = Math.min(target.maxY, hit.maxY);
    var overlap = (maxX - minX) * (maxY - minY);
    return [overlap, overlap >= sqrtPixels];
  };

  var groupByOverlapRelComparator = function groupByOverlapRelComparator(overlap, target, prevRelOverlap) {
    var newRelOverlap = overlap / ((target.maxX - target.minX) * (target.maxY - target.minY));
    return [newRelOverlap, prevRelOverlap !== undefined && newRelOverlap > prevRelOverlap];
  };

  var groupByOverlap = groupSpatially({
    bBoxifier: identity,
    absComparator: groupByOverlapAbsComparator,
    relComparator: groupByOverlapRelComparator
  });

  var groupByDistanceBBoxifier = function groupByDistanceBBoxifier(target, distance) {
    return {
      minX: target.minX - distance,
      minY: target.minY - distance,
      maxX: target.maxX + distance,
      maxY: target.maxY + distance
    };
  };

  var groupByDistanceAbsComparator = function groupByDistanceAbsComparator(target, hit, pixels) {
    var d = l2RectDist(target, hit);
    return [d, d < pixels];
  };

  var groupByDistanceRelComparator = function groupByDistanceRelComparator(distance, target, prevDistance) {
    return [distance, prevDistance === undefined && distance < prevDistance];
  };

  var groupByDistance = groupSpatially({
    bBoxifier: groupByDistanceBBoxifier,
    absComparator: groupByDistanceAbsComparator,
    relComparator: groupByDistanceRelComparator
  });

  var groupByGrid = /*#__PURE__*/function () {
    var _ref29 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee10(objective) {
      var _store$state20, orderer, piles, grid;

      return regenerator.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _store$state20 = store.state, orderer = _store$state20.orderer, piles = _store$state20.piles;
              grid = objective ? createGrid({
                width: containerWidth,
                height: containerHeight,
                orderer: orderer
              }, objective) : layout;
              return _context10.abrupt("return", Object.entries(piles).reduce(function (groups, _ref30) {
                var _ref31 = slicedToArray(_ref30, 2),
                    pileId = _ref31[0],
                    pileState = _ref31[1];

                if (!pileState.items.length) return groups;
                var ij = grid.xyToIj(pileState.x, pileState.y);
                var idx = grid.ijToIdx.apply(grid, toConsumableArray(ij));
                if (!groups[idx]) groups[idx] = [];
                groups[idx].push(pileId);
                return groups;
              }, []));

            case 3:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function groupByGrid(_x8) {
      return _ref29.apply(this, arguments);
    };
  }();

  var groupByColumn = /*#__PURE__*/function () {
    var _ref32 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee11() {
      return regenerator.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              return _context11.abrupt("return", Object.entries(store.state.piles).reduce(function (groups, _ref33) {
                var _ref34 = slicedToArray(_ref33, 2),
                    pileId = _ref34[0],
                    pileState = _ref34[1];

                if (pileState.items.length) {
                  var ij = layout.xyToIj(pileState.x, pileState.y);
                  if (!groups[ij[1]]) groups[ij[1]] = [];
                  groups[ij[1]].push(pileId);
                }

                return groups;
              }, []));

            case 1:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function groupByColumn() {
      return _ref32.apply(this, arguments);
    };
  }();

  var groupByRow = /*#__PURE__*/function () {
    var _ref35 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee12() {
      return regenerator.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt("return", Object.entries(store.state.piles).reduce(function (groups, _ref36) {
                var _ref37 = slicedToArray(_ref36, 2),
                    pileId = _ref37[0],
                    pileState = _ref37[1];

                if (pileState.items.length) {
                  var ij = layout.xyToIj(pileState.x, pileState.y);
                  if (!groups[ij[0]]) groups[ij[0]] = [];
                  groups[ij[0]].push(pileId);
                }

                return groups;
              }, []));

            case 1:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    return function groupByRow() {
      return _ref35.apply(this, arguments);
    };
  }();

  var groupByCategory = /*#__PURE__*/function () {
    var _ref38 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee13(objective) {
      return regenerator.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              return _context13.abrupt("return", Object.values(Object.entries(store.state.piles).reduce(function (groups, _ref39) {
                var _ref40 = slicedToArray(_ref39, 2),
                    pileId = _ref40[0],
                    pileState = _ref40[1];

                if (!pileState.items.length) return groups;
                var pileCategory = objective.map(function (o) {
                  return o.aggregator(pileState.items.map(function (itemId, index) {
                    return o.property(store.state.items[itemId], itemId, index, renderedItems.get(itemId));
                  }));
                }).join('|');
                if (!groups[pileCategory]) groups[pileCategory] = [pileId];else groups[pileCategory].push(pileId);
                return groups;
              }, {})));

            case 1:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));

    return function groupByCategory(_x9) {
      return _ref38.apply(this, arguments);
    };
  }();

  var groupByCluster = /*#__PURE__*/function () {
    var _ref41 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee14(objective) {
      var options,
          points,
          clusterer,
          clustererOptions,
          k,
          _yield$clusterer,
          labels,
          _args15 = arguments;

      return regenerator.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              options = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : {};
              points = Object.entries(store.state.piles).reduce(function (data, _ref42) {
                var _ref43 = slicedToArray(_ref42, 2),
                    pileId = _ref43[0],
                    pileState = _ref43[1];

                if (!pileState.items.length) return data;
                data.push({
                  id: pileId,
                  data: objective.flatMap(function (o) {
                    return o.aggregator(pileState.items.map(function (itemId, index) {
                      return o.property(store.state.items[itemId], itemId, index, renderedItems.get(itemId));
                    }));
                  })
                });
                return data;
              }, []);
              clusterer = options.clusterer;

              if (!clusterer) {
                clustererOptions = options.clustererOptions || {};
                k = clustererOptions.k;

                clustererOptions.valueGetter = function (x) {
                  return x.data;
                };

                if (!k) k = Math.max(2, Math.ceil(Math.sqrt(points.length / 2)));
                clusterer = createKmeans(k, clustererOptions);
              }

              _context14.next = 6;
              return clusterer(points);

            case 6:
              _yield$clusterer = _context14.sent;
              labels = _yield$clusterer.labels;
              return _context14.abrupt("return", Object.values(Array.from(labels).reduce(function (piledPiles, label, i) {
                if (label === -1) return piledPiles;
                if (!piledPiles[label]) piledPiles[label] = [];
                piledPiles[label].push(points[i].id);
                return piledPiles;
              }, {})));

            case 9:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));

    return function groupByCluster(_x10) {
      return _ref41.apply(this, arguments);
    };
  }();

  var groupBy = function groupBy(type) {
    var objective = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var whenGrouped;
    var mergeCenter = 'mean';

    switch (type) {
      case 'overlap':
        whenGrouped = groupByOverlap(objective, options);
        break;

      case 'distance':
        whenGrouped = groupByDistance(objective, options);
        break;

      case 'grid':
        whenGrouped = groupByGrid(objective);
        break;

      case 'column':
        mergeCenter = objective;
        whenGrouped = groupByColumn(objective);
        break;

      case 'row':
        mergeCenter = objective;
        whenGrouped = groupByRow(objective);
        break;

      case 'category':
        whenGrouped = groupByCategory(objective);
        break;

      case 'cluster':
        whenGrouped = groupByCluster(objective, options);
        break;

      default:
        whenGrouped = Promise.reject(new Error("Unknown group by type: ".concat(type)));
        break;
    }

    return whenGrouped.then(function (groupedPiles) {
      store.dispatch(createAction.setFocusedPiles([]));
      updateOriginalPilePosition(groupedPiles.flatMap(identity)); // If there's only one pile on a pile we can ignore it

      return animateMerge(groupedPiles.filter(function (pileIds) {
        return pileIds.length > 1;
      }), mergeCenter);
    });
  };

  var groupByPublic = function groupByPublic(type) {
    var objective = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var expandedObjective = expandGroupingObjective(type, objective);
    var whenGrouped = groupBy(type, expandedObjective, options);

    if ((type === 'distance' || type === 'overlap') && options.onZoom) {
      delete options.onZoom;
      store.dispatch(batchActions([].concat(toConsumableArray(set('groupingObjective', expandedObjective, true)), toConsumableArray(set('groupingOptions', options, true)), toConsumableArray(set('groupingType', type, true)))));
    }

    return whenGrouped;
  };

  var createSplitSpatialIndex = function createSplitSpatialIndex(items, coordType) {
    var toX = coordType === 'uv' ? function (x) {
      return x * containerWidth;
    } : identity;
    var toY = coordType === 'uv' ? function (y) {
      return y * containerHeight;
    } : identity;
    var splitSpatialIndex = new rbush_min();
    var idToBBox = new Map();
    var bBoxes = items.map(function (item) {
      var _translatePointFromCa = translatePointFromCamera(transformPointToScreen([toX(item.cX), toY(item.cY)])),
          _translatePointFromCa2 = slicedToArray(_translatePointFromCa, 2),
          cX = _translatePointFromCa2[0],
          cY = _translatePointFromCa2[1];

      var bBox = {
        id: item.id,
        minX: cX - item.width / 2,
        maxX: cX + item.width / 2,
        minY: cY - item.height / 2,
        maxY: cY + item.height / 2
      };
      idToBBox.set(item.id, bBox);
      return bBox;
    });
    splitSpatialIndex.load(bBoxes);
    return [splitSpatialIndex, idToBBox];
  };

  var splitSpatially = function splitSpatially(_ref44) {
    var toBBox = _ref44.toBBox,
        compare = _ref44.compare;

    var _ref45 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref45$coordType = _ref45.coordType,
        coordType = _ref45$coordType === void 0 ? 'uv' : _ref45$coordType;

    return /*#__PURE__*/function () {
      var _ref46 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee15(objective) {
        var _ref47,
            _ref47$conditions,
            conditions,
            piles,
            _createSplitSpatialIn,
            _createSplitSpatialIn2,
            splitSpatialIndex,
            idToBBox,
            splittedPiles,
            findClosestCentroid,
            createSplittedPile,
            keepItem,
            splitItem,
            search,
            _args16 = arguments;

        return regenerator.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _ref47 = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : {}, _ref47$conditions = _ref47.conditions, conditions = _ref47$conditions === void 0 ? [] : _ref47$conditions;
                piles = store.state.piles; // eslint-disable-next-line no-shadow

                _createSplitSpatialIn = createSplitSpatialIndex(objective.basedOn, coordType), _createSplitSpatialIn2 = slicedToArray(_createSplitSpatialIn, 2), splitSpatialIndex = _createSplitSpatialIn2[0], idToBBox = _createSplitSpatialIn2[1];
                splittedPiles = {};

                findClosestCentroid = function findClosestCentroid(groups, hit, threshold) {
                  var closest = -1;
                  var minDist = Infinity;
                  groups.forEach(function (g, i) {
                    var bBox = {
                      minX: g.centroid[0] - g.width / 2,
                      maxX: g.centroid[0] + g.width / 2,
                      minY: g.centroid[1] - g.height / 2,
                      maxY: g.centroid[1] + g.height / 2
                    };

                    var _compare = compare(bBox, hit, threshold),
                        _compare2 = slicedToArray(_compare, 2),
                        ok = _compare2[0],
                        d = _compare2[1];

                    if (ok && d < minDist) {
                      minDist = d;
                      closest = i;
                    }
                  });
                  return closest;
                };

                createSplittedPile = function createSplittedPile(target) {
                  splittedPiles[target.id] = {
                    keep: [target.id],
                    split: []
                  };
                };

                keepItem = function keepItem(target, hit) {
                  splittedPiles[target.id].keep.push(hit.id);
                };

                splitItem = function splitItem(target, hit) {
                  var width = hit.maxX - hit.minX;
                  var height = hit.maxY - hit.minY;
                  var center = [hit.minX + width / 2, hit.minY + height / 2];

                  if (!splittedPiles[target.id].split.length) {
                    splittedPiles[target.id].split.push({
                      centroid: center,
                      width: width,
                      height: height,
                      items: [hit.id]
                    });
                  } else {
                    var closest = findClosestCentroid(splittedPiles[target.id].split, hit, objective.threshold);

                    if (closest === -1) {
                      // New sub group
                      splittedPiles[target.id].split.push({
                        centroid: center,
                        width: width,
                        height: height,
                        items: [hit.id]
                      });
                    } else {
                      var g = splittedPiles[target.id].split[closest];
                      var oldLen = g.items.length;
                      var newLen = oldLen + 1;
                      var newCentroid = [g.centroid[0] * oldLen / newLen + center[0] / newLen, g.centroid[1] * oldLen / newLen + center[1] / newLen];
                      g.centroid = newCentroid;
                      g.items.push(hit.id);
                    }
                  }
                };

                search = function search(currentTarget) {
                  if (piles[currentTarget.id].items.length < 2) return;
                  var hits = splitSpatialIndex.search(toBBox(currentTarget, objective.threshold));
                  var assessedItems = new Set();
                  assessedItems.add(currentTarget.id); // Always skip self

                  createSplittedPile(currentTarget);
                  hits.forEach(function (hit) {
                    if (piles[currentTarget.id].items.indexOf(hit.id) === -1) return;
                    if (hit.id === currentTarget.id) return;
                    var okay = compare(currentTarget, hit, objective.threshold)[0] && conditions.every(function (c) {
                      return c(piles[currentTarget.id], piles[hit.id]);
                    });
                    if (okay) keepItem(currentTarget, hit);else splitItem(currentTarget, hit);
                    assessedItems.add(hit.id);
                  });
                  piles[currentTarget.id].items.forEach(function (itemId) {
                    if (!assessedItems.has(itemId)) {
                      var bBox = idToBBox.get(itemId);
                      if (itemId === currentTarget.id) keepItem(currentTarget, bBox);else splitItem(currentTarget, bBox);
                    }
                  });
                };

                spatialIndex.all().forEach(search);
                Object.keys(splittedPiles).forEach(function (pileId) {
                  var out = [];
                  if (splittedPiles[pileId].keep.length) out.push(splittedPiles[pileId].keep);
                  if (splittedPiles[pileId].split.length) out.push.apply(out, toConsumableArray(splittedPiles[pileId].split.map(function (g) {
                    return g.items;
                  })));
                  if (out.length > 1) splittedPiles[pileId] = out;else delete splittedPiles[pileId];
                });
                return _context15.abrupt("return", splittedPiles);

              case 12:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }));

      return function (_x11) {
        return _ref46.apply(this, arguments);
      };
    }();
  };

  var splitByOverlapComparator = function splitByOverlapComparator(target, hit, sqrtPixels) {
    var minX = Math.max(target.minX, hit.minX);
    var minY = Math.max(target.minY, hit.minY);
    var maxX = Math.min(target.maxX, hit.maxX);
    var maxY = Math.min(target.maxY, hit.maxY);
    var overlap = (maxX - minX) * (maxY - minY);
    return [overlap >= sqrtPixels, overlap];
  };

  var splitByOverlap = splitSpatially({
    toBBox: identity,
    compare: splitByOverlapComparator
  });

  var splitByDistanceBBoxifier = function splitByDistanceBBoxifier(target, distance) {
    return {
      minX: target.minX - distance,
      minY: target.minY - distance,
      maxX: target.maxX + distance,
      maxY: target.maxY + distance
    };
  };

  var splitByDistanceComparator = function splitByDistanceComparator(target, hit, threshold) {
    var d = l2RectDist(target, hit);
    return [d < threshold, d];
  };

  var splitByDistance = splitSpatially({
    toBBox: splitByDistanceBBoxifier,
    compare: splitByDistanceComparator
  });

  var splitByCategory = /*#__PURE__*/function () {
    var _ref48 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee16(objective) {
      return regenerator.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              return _context16.abrupt("return", Object.entries(store.state.piles).filter(function (p) {
                return p[1].items.length > 1;
              }).reduce(function (splittedPiles, _ref49) {
                var _ref50 = slicedToArray(_ref49, 2),
                    pileId = _ref50[0],
                    pileState = _ref50[1];

                // eslint-disable-next-line no-shadow
                var splits = pileState.items.reduce(function (splits, itemId, index) {
                  var cat = objective.map(function (objectiveFn) {
                    return objectiveFn(store.state.items[itemId], itemId, index, renderedItems.get(itemId));
                  }).join('|');
                  if (!splits[cat]) splits[cat] = [itemId];else splits[cat].push(itemId);
                  return splits;
                }, {});

                if (Object.keys(splits).length > 1) {
                  splittedPiles[pileId] = Object.values(splits);
                }

                return splittedPiles;
              }, {}));

            case 1:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }));

    return function splitByCategory(_x12) {
      return _ref48.apply(this, arguments);
    };
  }();

  var splitByCluster = /*#__PURE__*/function () {
    var _ref51 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee17(objective) {
      var options,
          itemIdToIdx,
          points,
          clusterer,
          clustererOptions,
          k,
          _yield$clusterer2,
          labels,
          _args18 = arguments;

      return regenerator.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              options = _args18.length > 1 && _args18[1] !== undefined ? _args18[1] : {};
              itemIdToIdx = new Map();
              points = Object.entries(store.state.items).map(function (_ref52, index) {
                var _ref53 = slicedToArray(_ref52, 2),
                    itemId = _ref53[0],
                    itemState = _ref53[1];

                itemIdToIdx.set(itemId, index);
                return {
                  id: itemId,
                  data: objective.flatMap(function (o) {
                    return o.property(itemState, itemId, 0, renderedItems.get(itemId));
                  })
                };
              });
              clusterer = options.clusterer;

              if (!clusterer) {
                clustererOptions = options.clustererOptions || {};
                k = clustererOptions.k;

                clustererOptions.valueGetter = function (x) {
                  return x.data;
                };

                if (!k) k = Math.max(2, Math.ceil(Math.sqrt(points.length / 2)));
                clusterer = createKmeans(k, clustererOptions);
              }

              _context17.next = 7;
              return clusterer(points);

            case 7:
              _yield$clusterer2 = _context17.sent;
              labels = _yield$clusterer2.labels;
              return _context17.abrupt("return", Object.entries(store.state.piles).reduce(function (splittedPiles, _ref54) {
                var _ref55 = slicedToArray(_ref54, 2),
                    pileId = _ref55[0],
                    pileState = _ref55[1];

                if (!pileState.items.length) return splittedPiles; // eslint-disable-next-line no-shadow

                // eslint-disable-next-line no-shadow
                var splits = pileState.items.reduce(function (splits, itemId) {
                  var label = labels[itemIdToIdx.get(itemId)];
                  if (!splits[label]) splits[label] = [itemId];else splits[label].push(itemId);
                  return splits;
                }, {});

                if (Object.keys(splits).length > 1) {
                  splittedPiles[pileId] = Object.values(splits);
                }

                return splittedPiles;
              }, {}));

            case 10:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    }));

    return function splitByCluster(_x13) {
      return _ref51.apply(this, arguments);
    };
  }();

  var isSplitting = false;
  var whenSplitted = Promise.resolve();

  var splitBy = function splitBy(type, objective) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (isSplitting) return whenSplitted;
    isSplitting = true;
    var whenSplittedPiles;

    switch (type) {
      case 'overlap':
        whenSplittedPiles = splitByOverlap(objective, options);
        break;

      case 'distance':
        whenSplittedPiles = splitByDistance(objective, options);
        break;

      case 'category':
        whenSplittedPiles = splitByCategory(objective);
        break;

      case 'cluster':
        whenSplittedPiles = splitByCluster(objective, options);
        break;
      // no default
    }

    whenSplitted = whenSplittedPiles.then(function (splittedPiles) {
      if (!Object.keys(splittedPiles).length) return Promise.resolve();
      store.dispatch(batchActions([createAction.setFocusedPiles([]), createAction.splitPiles(splittedPiles)]));
      return Promise.all(Object.entries(splittedPiles).filter(function (splittedPile) {
        return splittedPile[1].length > 1;
      }).map(function (_ref56) {
        var _ref57 = slicedToArray(_ref56, 2),
            pileId = _ref57[0],
            splits = _ref57[1];

        var targets = splits.map(function (splitGroup) {
          return splitGroup[0];
        });
        return animateDepile(pileId, targets);
      }));
    });
    whenSplitted.then(function () {
      isSplitting = false;
    });
    return whenSplitted;
  };

  var splitByPublic = function splitByPublic(type) {
    var objective = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var expandedObjective = expandSplittingObjective(type, objective);
    var whenSplit = splitBy(type, expandedObjective, options);

    if ((type === 'distance' || type === 'overlap') && options.onZoom) {
      delete options.onZoom;
      store.dispatch(batchActions([].concat(toConsumableArray(set('splittingObjective', expandedObjective, true)), toConsumableArray(set('splittingOptions', options, true)), toConsumableArray(set('splittingType', type, true)))));
    }

    return whenSplit;
  };

  var splitAll = function splitAll() {
    return splitByPublic('category', 'id');
  };

  var updateNavigationMode = function updateNavigationMode() {
    var _store$state21 = store.state,
        arrangementType = _store$state21.arrangementType,
        arrangementObjective = _store$state21.arrangementObjective,
        arrangementOptions = _store$state21.arrangementOptions,
        navigationMode = _store$state21.navigationMode;
    var changed = false;

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
            if (arrangementObjective.length > 1 || arrangementOptions.forceDimReduction) changed = enablePanZoom();else changed = enableScrolling();
            break;

          case 'xy':
          case 'uv':
            changed = enablePanZoom();
            break;

          case 'index':
          case 'ij':
            changed = enableScrolling();
            break;

        }

        break;
    }

    if (changed) {
      transformPiles();
      updateScrollHeight();
    }
  };

  var aggregatedPileValues = {};
  var pileSortPosByAggregate = [];
  var aggregatedPileMinValues = [];
  var aggregatedPileMaxValues = [];

  var updateAggregatedPileValues = function updateAggregatedPileValues(pileIds) {
    var _store$state22 = store.state,
        arrangementObjective = _store$state22.arrangementObjective,
        arrangementOptions = _store$state22.arrangementOptions,
        items = _store$state22.items,
        piles = _store$state22.piles;
    var allPiles = pileIds.length >= pileInstances.size;
    arrangementObjective.forEach(function (objective, i) {
      var minValue = typeof aggregatedPileMinValues[i] === 'undefined' || allPiles ? Infinity : aggregatedPileMinValues[i];
      var maxValue = typeof aggregatedPileMaxValues[i] === 'undefined' || allPiles ? -Infinity : aggregatedPileMaxValues[i]; // When all piles were updated we need to update the min-max value as well

      var shouldUpdateMinMax = allPiles; // Even if not all piles were updated we might still need to update the
      // min-max values. This is the when the user piled-up piles with the
      // lowest or highest aggregated value

      if (!allPiles && pileSortPosByAggregate[i] && arrangementObjective.length < 3 && !arrangementOptions.forceDimReduction) {
        var minPos = 0;
        var maxPos = pileInstances.size;
        var newMin = false;
        var newMax = false;
        pileIds.forEach(function (id) {
          var pos = pileSortPosByAggregate[i][id]; // If the pile that updated was positioned at the current lowest
          // position we're going to increase the lowest position and indicate
          // that we need to get a new min value

          if (pos === minPos) {
            minPos++;
            newMin = true;
            shouldUpdateMinMax = true;
          } // Equivalent to how we update the min position


          if (pos === maxPos) {
            maxPos--;
            newMax = true;
            shouldUpdateMinMax = true;
          }
        }); // Todo: improve

        if (newMin) {
          var _Object$entries$find = Object.entries(pileSortPosByAggregate[i]).find(function (pileIdAndPos) {
            if (pileIdAndPos[1] === minPos) return true;
            return false;
          }),
              _Object$entries$find2 = slicedToArray(_Object$entries$find, 1),
              pileId = _Object$entries$find2[0];

          minValue = aggregatedPileValues[pileId][i];
        }

        if (newMax) {
          var _Object$entries$find3 = Object.entries(pileSortPosByAggregate[i]).find(function (pileIdAndPos) {
            if (pileIdAndPos[1] === maxPos) return true;
            return false;
          }),
              _Object$entries$find4 = slicedToArray(_Object$entries$find3, 1),
              _pileId = _Object$entries$find4[0];

          maxValue = aggregatedPileValues[_pileId][i];
        }
      }

      pileIds.forEach(function (pileId) {
        var pileValues = piles[pileId].items.map(function (itemId, index) {
          return objective.property(items[itemId], itemId, index, renderedItems.get(itemId));
        });
        var aggregatedValue = objective.aggregator(pileValues);

        if (aggregatedValue < minValue) {
          minValue = aggregatedValue;
          shouldUpdateMinMax = true;
        }

        if (aggregatedValue > maxValue) {
          maxValue = aggregatedValue;
          shouldUpdateMinMax = true;
        }

        if (!aggregatedPileValues[pileId]) aggregatedPileValues[pileId] = [];
        aggregatedPileValues[pileId][i] = Number.isNaN(aggregatedValue) ? // This will ensure that the value is ignored during the sort process
        null : aggregatedValue;
        aggregatedPileValues[pileId].splice(arrangementObjective.length);
      });
      pileSortPosByAggregate[i] = sortPos(aggregatedPileValues, {
        getter: function getter(v) {
          return v[i];
        },
        comparator: objective.inverse ? sortDesc : sortAsc,
        ignoreNull: true
      });

      if (shouldUpdateMinMax) {
        aggregatedPileMinValues[i] = minValue;
        aggregatedPileMaxValues[i] = maxValue;
      }
    }); // Remove outdated values

    pileSortPosByAggregate.splice(arrangementObjective.length);
    aggregatedPileMinValues.splice(arrangementObjective.length);
    aggregatedPileMaxValues.splice(arrangementObjective.length);
  };

  var arrangement2dScales = [];

  var updateArrangement2dScales = function updateArrangement2dScales() {
    var arrangementObjective = store.state.arrangementObjective;
    var rangeMax = [containerWidth, containerHeight];
    arrangement2dScales = arrangementObjective.map(function (objective, i) {
      var currentScale = arrangement2dScales[i];
      var minValue = aggregatedPileMinValues[i];
      var maxValue = aggregatedPileMaxValues[i];

      if (currentScale) {
        var _currentScale$domain = currentScale.domain(),
            _currentScale$domain2 = slicedToArray(_currentScale$domain, 2),
            currentMin = _currentScale$domain2[0],
            currentMax = _currentScale$domain2[1];

        if (minValue === currentMin && maxValue === currentMax) {
          return arrangement2dScales[i];
        }
      }

      var domain = objective.inverted ? [maxValue, minValue] : [minValue, maxValue];
      var meanWidth = mean(itemWidthScale.range());
      var meanHeight = mean(itemWidthScale.range());
      return objective.scale().domain(domain).range([meanWidth / 2, rangeMax[i] - meanHeight / 2]);
    });
    return Promise.resolve();
  };

  var lastMdReducerRun = 0;

  var updateArrangementMdReducer = /*#__PURE__*/function () {
    var _ref58 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee18(newObjectives) {
      var _store$state23, arrangementObjective, arrangementOptions, dimensionalityReducer, items, data, fitting;

      return regenerator.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _store$state23 = store.state, arrangementObjective = _store$state23.arrangementObjective, arrangementOptions = _store$state23.arrangementOptions, dimensionalityReducer = _store$state23.dimensionalityReducer, items = _store$state23.items;

              if (dimensionalityReducer) {
                _context18.next = 4;
                break;
              }

              console.warn('No dimensionality reducer provided. Unable to arrange piles by multiple dimensions.');
              return _context18.abrupt("return", Promise.resolve());

            case 4:
              if (!(lastMdReducerRun && !newObjectives && !arrangementOptions.runDimReductionOnPiles)) {
                _context18.next = 6;
                break;
              }

              return _context18.abrupt("return", Promise.resolve());

            case 6:
              halt(); // This will ensure that the popup is displayed before we move on

              _context18.next = 9;
              return nextAnimationFrame();

            case 9:
              data = arrangementOptions.runDimReductionOnPiles === true ? Object.values(aggregatedPileValues).filter(function (x) {
                return x[0] !== null;
              }) : Object.entries(items).map(function (_ref59) {
                var _ref60 = slicedToArray(_ref59, 2),
                    itemId = _ref60[0],
                    item = _ref60[1];

                return arrangementObjective.flatMap(function (objective) {
                  return objective.property(item, itemId, 0, renderedItems.get(itemId));
                });
              });
              fitting = dimensionalityReducer.fit(data);
              cachedMdPilePos.clear();
              fitting.then(function () {
                lastMdReducerRun++;
                resume();
              });
              return _context18.abrupt("return", fitting);

            case 14:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    }));

    return function updateArrangementMdReducer(_x14) {
      return _ref58.apply(this, arguments);
    };
  }();

  var updateArragnementByData = function updateArragnementByData(pileIds, newObjectives) {
    var _store$state24 = store.state,
        arrangementObjective = _store$state24.arrangementObjective,
        arrangementOptions = _store$state24.arrangementOptions;
    updateAggregatedPileValues(pileIds);

    if (arrangementObjective.length > 2 || arrangementOptions.forceDimReduction) {
      return updateArrangementMdReducer(newObjectives);
    }

    if (arrangementObjective.length > 1) {
      return updateArrangement2dScales();
    } // We only need to update the aggregated values for ordering


    return Promise.resolve();
  };

  var updateArrangement = /*#__PURE__*/function () {
    var _ref61 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee19(updatedPileIds, newObjectives) {
      var _store$state25, arrangementType, piles, pileIds;

      return regenerator.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _store$state25 = store.state, arrangementType = _store$state25.arrangementType, piles = _store$state25.piles;
              pileIds = updatedPileIds.length ? updatedPileIds : Object.keys(piles);

              if (!(arrangementType === 'data')) {
                _context19.next = 6;
                break;
              }

              arranging = updateArragnementByData(pileIds, newObjectives);
              _context19.next = 6;
              return arranging;

            case 6:
              updateNavigationMode();

            case 7:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    }));

    return function updateArrangement(_x15, _x16) {
      return _ref61.apply(this, arguments);
    };
  }();

  var getArrangementCancelActions = function getArrangementCancelActions() {
    if (store.state.arrangementType === null) return [];
    return [].concat(toConsumableArray(set('arrangeOnGrouping', false, true)), toConsumableArray(set('arrangementOptions', {}, true)), toConsumableArray(set('arrangementObjective', null, true)), toConsumableArray(set('arrangementType', null, true)));
  };

  var uniqueLabels = new Map();
  var idToLabel = new Map();

  var createUniquePileLabels = function createUniquePileLabels() {
    var _store$state26 = store.state,
        items = _store$state26.items,
        piles = _store$state26.piles,
        pileLabel = _store$state26.pileLabel,
        pileLabelColor = _store$state26.pileLabelColor,
        pileLabelText = _store$state26.pileLabelText,
        pileLabelTextMapping = _store$state26.pileLabelTextMapping,
        pileLabelTextColor = _store$state26.pileLabelTextColor,
        pileLabelFontSize = _store$state26.pileLabelFontSize,
        pileLabelTextStyle = _store$state26.pileLabelTextStyle; // Destroy existing labels to avoid memory leaks

    uniqueLabels.forEach(function (label) {
      if (label.pixiText) label.pixiText.destroy();
    });
    uniqueLabels.clear();
    idToLabel.clear();
    var tmp = new Set();
    Object.values(items).forEach(function (item) {
      var label = pileLabel.flatMap(function (objective) {
        return objective(item);
      }).join('-');
      idToLabel.set(item.id, label);

      if (!tmp.has(label) && label) {
        uniqueLabels.set(label, {
          text: label,
          index: tmp.size
        });
        tmp.add(label);
      }
    });
    uniqueLabels.forEach(function (label) {
      var colorAlpha;

      if (pileLabelColor !== null) {
        if (isFunction(pileLabelColor)) {
          colorAlpha = colorToDecAlpha(pileLabelColor(label.text, uniqueLabels));
        } else {
          var colorArray = pileLabelColor;

          if (!Array.isArray(pileLabelColor)) {
            colorArray = [pileLabelColor];
          }

          var n = colorArray.length;
          colorAlpha = colorToDecAlpha(colorArray[label.index % n]);
        }
      } else {
        var _n = DEFAULT_COLOR_MAP.length;
        colorAlpha = colorToDecAlpha(DEFAULT_COLOR_MAP[label.index % _n]);
      }

      label.color = colorAlpha;
      var showText = isFunction(pileLabelText) ? Object.values(piles).some(function (pileState) {
        return pileLabelText(pileState);
      }) : pileLabelText;

      if (showText) {
        var labelText = label.text;

        if (isFunction(pileLabelTextMapping)) {
          labelText = pileLabelTextMapping(label.text, uniqueLabels);
        } else if (Array.isArray(pileLabelText)) {
          labelText = pileLabelText[label.index];
        }

        var pixiText = new Text(labelText, _objectSpread$3({
          fill: pileLabelTextColor,
          fontSize: pileLabelFontSize * 2 * window.devicePixelRatio,
          align: 'center'
        }, pileLabelTextStyle || {}));
        pixiText.updateText();
        label.texture = pixiText.texture;
        label.pixiText = pixiText;
      }
    });
  };

  var getPileLabelSizeScale = function getPileLabelSizeScale(labels, allLabels) {
    var pileLabelSizeTransform = store.state.pileLabelSizeTransform;
    var histogram = labels.reduce(function (hist, label) {
      // If `pileLabelSizeTransform` is falsy this will turn to `1` and
      // otherwise to `0`
      hist[label] = +!pileLabelSizeTransform;
      return hist;
    }, {});
    if (!pileLabelSizeTransform) return Object.values(histogram);
    allLabels.forEach(function (label) {
      histogram[label]++;
    });
    return pileLabelSizeTransform(Object.values(histogram), Object.keys(histogram));
  };

  var setPileLabel = function setPileLabel(pileState, pileId) {
    var reset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var pileInstance = pileInstances.get(pileId);
    if (!pileInstance) return;

    if (!store.state.pileLabel) {
      pileInstance.drawLabel([]);
      return;
    }

    var _store$state27 = store.state,
        pileLabel = _store$state27.pileLabel,
        items = _store$state27.items;
    if (!idToLabel.size || reset) createUniquePileLabels();
    var allLabels = pileState.items.flatMap(function (itemId) {
      return pileLabel.map(function (objective) {
        return objective(items[itemId]);
      }).join('-');
    }).filter(function (label) {
      return label.length;
    });
    var uniquePileLabels = unique(allLabels);
    uniquePileLabels.sort(function (a, b) {
      return (uniqueLabels.get(a.toString()).index || Infinity) - (uniqueLabels.get(b.toString()).index || Infinity);
    });
    var scaleFactors = uniquePileLabels.length > 1 ? getPileLabelSizeScale(uniquePileLabels, allLabels) : [1];
    var args = uniquePileLabels.reduce(function (_args, labelText) {
      var label = labelText && labelText.toString ? uniqueLabels.get(labelText.toString()) || UNKNOWN_LABEL : UNKNOWN_LABEL;

      _args[0].push(label.text);

      _args[1].push(label.color);

      _args[2].push(label.texture);

      return _args;
    }, [[], [], []]);
    pileInstance.drawLabel.apply(pileInstance, toConsumableArray(args).concat([scaleFactors]));
  };

  var itemUpdates = [];
  var itemUpdatesConsequences = [];
  var itemUpdateCalls = 0;

  var awaitItemUpdates = function awaitItemUpdates(newItemUpdates) {
    if (newItemUpdates.length) {
      // Add updates
      itemUpdates.push.apply(itemUpdates, toConsumableArray(newItemUpdates)); // We need to keep track of the update call as promises can't be canceled
      // and we really only want to apply the consequences once all the item
      // updates finished.

      var itemUpdateCall = ++itemUpdateCalls;
      Promise.all(itemUpdates).then(function () {
        if (itemUpdateCall === itemUpdateCalls) {
          // Apply all consequences and wait for them to finish
          return Promise.all(itemUpdatesConsequences.map(function (consequence) {
            return consequence();
          }));
        }

        return undefined; // No further actions
      }).then(function () {
        // Clear consequences and updates
        itemUpdatesConsequences.splice(0, itemUpdatesConsequences.length);
        itemUpdates.splice(0, itemUpdates.length); // collect garbage: remove outdated textures on the GPU

        renderer.textureGC.run();
        pubSub.publish('itemUpdate');
      });
    }
  };

  var updated = function updated() {
    if (destroyed) return;
    var newState = store.state;
    var stateUpdates = new Set();
    var currentItemUpdates = [];
    var updatedPileItems = [];

    if (state.items !== newState.items && state.itemRenderer) {
      var deletedItems = _objectSpread$3({}, state.items);

      var newItems = {};
      var updatedItems = {};
      var affectedPiles = {};
      Object.entries(newState.items).forEach(function (_ref62) {
        var _ref63 = slicedToArray(_ref62, 2),
            id = _ref63[0],
            item = _ref63[1];

        if (state.items[id]) {
          if (item.src !== state.items[id].src) {
            updatedItems[id] = item; // Check if the item is part of a pile

            Object.values(newState.piles).forEach(function (pileState) {
              if (pileState.items.length > 1) {
                if (pileState.items.includes(id)) {
                  affectedPiles[pileState.id] = pileState;
                }
              }
            });
          }
        } else {
          newItems[id] = item;
        }

        delete deletedItems[id];
      });
      var numNewItems = Object.keys(newItems).length;
      var numUpdatedItems = Object.keys(updatedItems).length;
      var numDeletedItems = Object.keys(deletedItems).length;
      var numAffectedPiles = Object.keys(affectedPiles).length;

      if (numNewItems) {
        currentItemUpdates.push(createItemsAndPiles(newItems));
      }

      if (numUpdatedItems) {
        currentItemUpdates.push(updateItemTexture(updatedItems));
      }

      if (numDeletedItems) {
        currentItemUpdates.push(deleteItemsAndPiles(deletedItems));
      }

      if (numAffectedPiles) {
        currentItemUpdates.push(Object.entries(affectedPiles).forEach(function (_ref64) {
          var _ref65 = slicedToArray(_ref64, 2),
              id = _ref65[0],
              pile = _ref65[1];

          var pileInstance = pileInstances.get(id);
          if (pileInstance.cover) updateCover(pile, pileInstance);
          setPileLabel(pile, id);
        }));
      }

      if (numNewItems || numDeletedItems) {
        stateUpdates.add('grid');
        stateUpdates.add('layout');
      }
    }

    if (Object.values(newState.items).length && (state.itemRenderer !== newState.itemRenderer || state.previewRenderer !== newState.previewRenderer || state.coverRenderer !== newState.coverRenderer || state.previewAggregator !== newState.previewAggregator || state.coverAggregator !== newState.coverAggregator)) {
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
        var updatedPiles = {};
        var updatedPilePositions = [];
        Object.entries(newState.piles).forEach(function (_ref66) {
          var _ref67 = slicedToArray(_ref66, 2),
              id = _ref67[0],
              pile = _ref67[1];

          if (state.piles[id]) {
            if (pile !== state.piles[id]) {
              updatedPiles[id] = pile;
            }
          }
        }); // Update piles

        Object.entries(updatedPiles).forEach(function (_ref68) {
          var _ref69 = slicedToArray(_ref68, 2),
              id = _ref69[0],
              pile = _ref69[1];

          var itemsChanged = pile.items.length !== state.piles[id].items.length;
          var positionChanged = (pile.x !== state.piles[id].x || pile.y !== state.piles[id].y) && pile.items.length !== 0;

          if (itemsChanged) {
            updatePileItems(pile, id);
            updatedPileItems.push(id);
          }

          if (positionChanged) {
            updatedPilePositions.push(updatePilePosition(pile, id));
          }

          if (itemsChanged || positionChanged) {
            updatePileStyle(pile, id);
            setPileLabel(pile, id);
          }
        });

        if (updatedPilePositions.length) {
          attemptArrangement = false;
          Promise.all(updatedPilePositions).then(function (positionedPiles) {
            pubSub.publish('pilesPositionEnd', {
              targets: positionedPiles
            });
          });
        } else if (attemptArrangement) {
          attemptArrangement = false;
          pubSub.publish('pilesPositionEnd', {
            targets: updatedPilePositions
          });
        }
      }
    }

    if (pileInstances.size && (state.pileLabel !== newState.pileLabel || state.pileLabelColor !== newState.pileLabelColor || state.pileLabelText !== newState.pileLabelText || state.pileLabelAlign !== newState.pileLabelAlign || state.pileLabelFontSize !== newState.pileLabelFontSize || state.pileLabelHeight !== newState.pileLabelHeight || state.pileLabelStackAlign !== newState.pileLabelStackAlign)) {
      Object.entries(newState.piles).filter(function (pileIdState) {
        return pileIdState[1].items.length;
      }).forEach(function (_ref70, index) {
        var _ref71 = slicedToArray(_ref70, 2),
            id = _ref71[0],
            pile = _ref71[1];

        setPileLabel(pile, id, !index);
      });
    }

    if (pileInstances.size && (state.pileItemOpacity !== newState.pileItemOpacity || state.pileItemBrightness !== newState.pileItemBrightness || state.pileItemInvert !== newState.pileItemInvert || state.pileItemTint !== newState.pileItemTint)) {
      Object.entries(newState.piles).forEach(function (_ref72) {
        var _ref73 = slicedToArray(_ref72, 2),
            id = _ref73[0],
            pile = _ref73[1];

        updatePileItemStyle(pile, id);
      });
    }

    if (pileInstances.size && (state.pileOpacity !== newState.pileOpacity || state.pileBorderSize !== newState.pileBorderSize || state.pileScale !== newState.pileScale || state.pileSizeBadge !== newState.pileSizeBadge || state.pileSizeBadgeAlign !== newState.pileSizeBadgeAlign || state.pileVisibilityItems !== newState.pileVisibilityItems)) {
      Object.entries(newState.piles).forEach(function (_ref74) {
        var _ref75 = slicedToArray(_ref74, 2),
            id = _ref75[0],
            pile = _ref75[1];

        updatePileStyle(pile, id);
      });

      if (newState.pileSizeBadge === false) {
        badgeFactory.clear();
      }
    }

    if (state.orderer !== newState.orderer) {
      stateUpdates.add('layout');
    }

    if (state.itemSize !== newState.itemSize || state.columns !== newState.columns || state.rowHeight !== newState.rowHeight || state.cellAspectRatio !== newState.cellAspectRatio || state.cellPadding !== newState.cellPadding || state.cellSize !== newState.cellSize || state.orderer !== newState.orderer || state.pileCellAlignment !== newState.pileCellAlignment) {
      stateUpdates.add('grid');
      stateUpdates.add('layout');
    }

    if (state.itemSize !== newState.itemSize || state.pileItemOffset !== newState.pileItemOffset || state.pileItemRotation !== newState.pileItemRotation || state.previewPadding !== newState.previewPadding || state.previewSpacing !== newState.previewSpacing || state.previewScaleToCover !== newState.previewScaleToCover || state.previewOffset !== newState.previewOffset || state.previewItemOffset !== newState.previewItemOffset) {
      stateUpdates.add('positionItems');
    }

    if (pileInstances.size && state.previewScaling !== newState.previewScaling) {
      Object.values(newState.piles).forEach(function (pile) {
        updatePreviewStyle(pile);
      });
    }

    if (state.tempDepileDirection !== newState.tempDepileDirection || state.tempDepileOneDNum !== newState.tempDepileOneDNum) {
      stateUpdates.add('layout');
    }

    if (state.temporaryDepiledPiles !== newState.temporaryDepiledPiles) {
      if (state.temporaryDepiledPiles.length) {
        closeTempDepile(state.temporaryDepiledPiles);
      }

      if (newState.temporaryDepiledPiles.length) {
        pileInstances.forEach(function (otherPile) {
          otherPile.disableInteractivity();
        });
        tempDepile(newState.temporaryDepiledPiles);
      } else {
        pileInstances.forEach(function (otherPile) {
          otherPile.enableInteractivity();
        });
      }

      renderRaf();
    }

    if (state.focusedPiles !== newState.focusedPiles) {
      var _matchArrayPair = matchArrayPair(state.focusedPiles, newState.focusedPiles),
          _matchArrayPair2 = slicedToArray(_matchArrayPair, 2),
          prevFocusedPiles = _matchArrayPair2[0],
          newlyFocusedPiles = _matchArrayPair2[1]; // Unset previously focused pile


      prevFocusedPiles.filter(function (pileId) {
        return pileInstances.has(pileId);
      }).forEach(function (pileId) {
        var pile = pileInstances.get(pileId);

        if (!pile.isTempDepiled) {
          pile.blur();
          pile.isFocus = false;
        }
      }); // Set newly focused pile if any

      newlyFocusedPiles.filter(function (pileId) {
        return pileInstances.has(pileId);
      }).forEach(function (pileId) {
        var pile = pileInstances.get(pileId);

        if (pile.isTempDepiled) {
          pile.active();
        } else {
          pile.focus();
        }

        pile.isFocus = true;
      });
      var _piles = store.state.piles;

      if (newlyFocusedPiles.length) {
        pubSub.publish('pileFocus', {
          targets: newlyFocusedPiles.map(function (id) {
            return _piles[id];
          })
        });
      }

      if (prevFocusedPiles.length) {
        pubSub.publish('pileBlur', {
          targets: prevFocusedPiles.map(function (id) {
            return _piles[id];
          })
        });
      }

      renderRaf();
    }

    if (state.magnifiedPiles !== newState.magnifiedPiles) {
      state.magnifiedPiles.map(function (scaledPile) {
        return pileInstances.get(scaledPile);
      }).filter(function (scaledPileInstance) {
        return scaledPileInstance;
      }).forEach(function (scaledPileInstance) {
        // We currently allow only one item to be magnified up so all
        // previously magnified piles are reset
        scaledPileInstance.unmagnify();
        delete scaledPileInstance.magnifiedByWheel;
        updatePileBounds(scaledPileInstance.id);
        clearActivePileLayer();
      });
      newState.magnifiedPiles.map(function (scaledPile) {
        return pileInstances.get(scaledPile);
      }).filter(function (scaledPileInstance) {
        return scaledPileInstance;
      }).forEach(function (scaledPileInstance) {
        if (!scaledPileInstance.magnifiedByWheel) {
          scaledPileInstance.magnify();
        }

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

    if (state.showGrid !== newState.showGrid) {
      if (newState.showGrid) drawGrid();else clearGrid();
    } // prettier-ignore


    if (Object.keys(newState.items).length && newState.arrangementType && (state.arrangementType !== newState.arrangementType || state.arrangementObjective !== newState.arrangementObjective || currentItemUpdates.length || updatedPileItems.length || newState.arrangementObjective.length > 2 && state.dimensionalityReducer !== newState.dimensionalityReducer)) {
      stateUpdates.add('layout');

      var arrangementUpdater = function (_updatedPileItems, newObjective) {
        return /*#__PURE__*/asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee20() {
          return regenerator.wrap(function _callee20$(_context20) {
            while (1) {
              switch (_context20.prev = _context20.next) {
                case 0:
                  return _context20.abrupt("return", updateArrangement(_updatedPileItems, newObjective));

                case 1:
                case "end":
                  return _context20.stop();
              }
            }
          }, _callee20);
        }));
      }([].concat(updatedPileItems), state.arrangementObjective !== newState.arrangementObjective);

      if (currentItemUpdates.length) {
        itemUpdatesConsequences.push(arrangementUpdater);
      } else {
        arrangementUpdater();
      }
    }

    if (state.navigationMode !== newState.navigationMode) {
      stateUpdates.add('navigation');
    }

    if (state.darkMode !== newState.darkMode || state.haltBackgroundOpacity !== newState.haltBackgroundOpacity) {
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

    if (state.darkMode !== newState.darkMode || state.lassoFillColor !== newState.lassoFillColor || state.lassoFillOpacity !== newState.lassoFillOpacity || state.lassoShowStartIndicator !== newState.lassoShowStartIndicator || state.lassoStartIndicatorOpacity !== newState.lassoStartIndicatorOpacity || state.lassoStrokeColor !== newState.lassoStrokeColor || state.lassoStrokeOpacity !== newState.lassoStrokeOpacity || state.lassoStrokeSize !== newState.lassoStrokeSize) {
      updateLasso();
    }

    state = newState;
    pubSub.publish('update', {
      action: store.lastAction
    }); // Consequential updates that cause new actions to be dispatched

    if (stateUpdates.has('grid')) {
      updateGrid();
    }

    if (stateUpdates.has('layout') || currentItemUpdates.length > 0 || updatedPileItems.length > 0) {
      var pilesToPosition = state.arrangeOnGrouping ? [] // position all piles
      : [].concat(updatedPileItems);

      var positionUpdater = function (_updatedPileItems) {
        return /*#__PURE__*/asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee21() {
          return regenerator.wrap(function _callee21$(_context21) {
            while (1) {
              switch (_context21.prev = _context21.next) {
                case 0:
                  return _context21.abrupt("return", positionPiles(_updatedPileItems));

                case 1:
                case "end":
                  return _context21.stop();
              }
            }
          }, _callee21);
        }));
      }(pilesToPosition);

      if (currentItemUpdates.length) {
        itemUpdatesConsequences.push(positionUpdater);
      } else {
        positionUpdater();
      }
    }

    if (stateUpdates.has('navigation')) {
      updateNavigationMode();
    }

    if (stateUpdates.has('positionItems')) {
      Object.values(state.piles).filter(function (pile) {
        return pile.items.length > 1;
      }).forEach(function (pile) {
        positionItems(pile.id, {
          all: true
        });
      });
    }

    awaitItemUpdates(currentItemUpdates);
  };

  var resetPileBorder = function resetPileBorder() {
    pileInstances.forEach(function (pile) {
      if (pile) pile.blur();
    });
  };

  var exportState = function exportState() {
    var _ref78 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref78$serialize = _ref78.serialize,
        serialize = _ref78$serialize === void 0 ? false : _ref78$serialize;

    if (serialize) return serializeState(store["export"]());
    return store["export"]();
  };

  var importState = function importState(newState) {
    var _ref79 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref79$deserialize = _ref79.deserialize,
        deserialize = _ref79$deserialize === void 0 ? false : _ref79$deserialize,
        _ref79$overwriteState = _ref79.overwriteState,
        overwriteState = _ref79$overwriteState === void 0 ? false : _ref79$overwriteState,
        _ref79$debug = _ref79.debug,
        debug = _ref79$debug === void 0 ? false : _ref79$debug;

    // We assume that the user imports an already initialized state
    isInitialPositioning = false;
    var updateUnsubscriber;
    var whenUpdated = new Promise(function (resolve) {
      updateUnsubscriber = pubSub.subscribe('update', function (_ref80) {
        var action = _ref80.action;
        if (action.type.indexOf('OVERWRITE') >= 0) resolve();
      });
    });
    store["import"](deserialize ? deserializeState(newState) : newState, {
      overwriteState: overwriteState,
      debug: debug
    });
    resetPileBorder();
    whenUpdated.then(function () {
      pubSub.unsubscribe(updateUnsubscriber);
    });
    return whenUpdated;
  };

  var expandProperty = function expandProperty(objective) {
    if (isFunction(objective)) {
      return objective;
    }

    return function (itemState) {
      return itemState[objective];
    };
  };

  var expandNumericalAggregator = function expandNumericalAggregator(objective) {
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

  var expandScale = function expandScale(scale) {
    if (isFunction(scale)) return scale;

    switch (scale) {
      case 'linear':
      default:
        return createScale;
    }
  };

  var expandArrangementObjectiveData = function expandArrangementObjectiveData(arrangementObjective) {
    if (!Array.isArray(arrangementObjective)) {
      // eslint-disable-next-line no-param-reassign
      arrangementObjective = [arrangementObjective];
    }

    var expandedArrangementObjective = [];
    arrangementObjective.forEach(function (objective) {
      var expandedObjective = {};

      if (objective.constructor !== Object) {
        expandedObjective.property = expandProperty(objective);
        expandedObjective.aggregator = objective.propertyIsVector ? meanVector : mean;
        expandedObjective.scale = createScale;
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

  var expandArrangementObjectiveCoords = function expandArrangementObjectiveCoords(objective, is2d) {
    var expandedObjective = {};

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

  var arrangeBy = function arrangeBy() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var objective = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var expandedObjective = objective;

    switch (type) {
      case 'data':
        expandedObjective = expandArrangementObjectiveData(objective);
        break;

      case 'xy':
      case 'ij':
      case 'uv':
      case 'custom':
        expandedObjective = expandArrangementObjectiveCoords(objective, true);
        break;

      case 'index':
        expandedObjective = expandArrangementObjectiveCoords(objective);
        break;
      // no default
    }

    var onGrouping = !!options.onGrouping;
    delete options.onGrouping; // We need to set this variable to true to tell `updated()` to fire a
    // special event in the case that this `arrangeBy()` call does not lead to
    // any position changes. In this case, without a special event, the returned
    // promise would otherwise never resove.

    attemptArrangement = true;
    store.dispatch(batchActions([].concat(toConsumableArray(set('arrangeOnGrouping', onGrouping, true)), toConsumableArray(set('arrangementOptions', options, true)), toConsumableArray(set('arrangementObjective', expandedObjective, true)), toConsumableArray(set('arrangementType', type, true)))));
    return new Promise(function (resolve) {
      pubSub.subscribe('pilesPositionEnd', resolve, 1);
    });
  };

  var expandGroupingObjectiveDistance = function expandGroupingObjectiveDistance(objective) {
    return objective || 1;
  };

  var expandGroupingObjectiveOverlap = function expandGroupingObjectiveOverlap(objective) {
    return objective || 1;
  };

  var expandGroupingObjectiveGrid = function expandGroupingObjectiveGrid(objective) {
    var expandedObjective = null;

    if (isObject(objective)) {
      expandedObjective = _objectSpread$3(_objectSpread$3({}, expandedObjective), objective);
    } else if (+objective) {
      expandedObjective.columns = {
        columns: +objective,
        cellAspectRatio: layout.cellAspectRatio
      };
    }

    return expandedObjective;
  };

  var expandGroupingObjectiveCategory = function expandGroupingObjectiveCategory(objective) {
    var objectives = Array.isArray(objective) ? objective : [objective];
    return objectives.map(function (_objective) {
      var expandedObjective = {};

      if (isObject(objective)) {
        expandedObjective.property = expandProperty(_objective.property);
        expandedObjective.aggregator = isFunction(_objective.aggregator) ? _objective.aggregator : uniqueStr;
      } else {
        expandedObjective.property = expandProperty(_objective);
        expandedObjective.aggregator = uniqueStr;
      }

      return expandedObjective;
    });
  };

  var expandGroupingObjectiveCluster = function expandGroupingObjectiveCluster(objective) {
    var objectives = Array.isArray(objective) ? objective : [objective];
    return objectives.map(function (_objective) {
      var expandedObjective = {};

      if (_objective.constructor !== Object) {
        expandedObjective.property = expandProperty(_objective);
        expandedObjective.aggregator = objective.propertyIsVector ? meanVector : mean;
      } else {
        expandedObjective.property = expandProperty(_objective.property);
        expandedObjective.aggregator = expandNumericalAggregator(_objective);
      }

      return expandedObjective;
    });
  };

  var expandGroupingObjective = function expandGroupingObjective(type, objective) {
    switch (type) {
      case 'overlap':
        return expandGroupingObjectiveOverlap(objective);

      case 'grid':
        return expandGroupingObjectiveGrid(objective);

      case 'distance':
        return expandGroupingObjectiveDistance(objective);

      case 'category':
        return expandGroupingObjectiveCategory(objective);

      case 'cluster':
        return expandGroupingObjectiveCluster(objective);

      default:
        return objective;
    }
  };

  var itemizeSpatialIndex = function itemizeSpatialIndex() {
    var piles = store.state.piles; // Extract current bounding boxes from rbush

    var bBoxes = spatialIndex.all().reduce(function (b, bBox) {
      var width = bBox.maxX - bBox.minX;
      var height = bBox.maxY - bBox.minY;
      b[bBox.id] = {
        cX: (bBox.minX + width / 2) / containerWidth,
        cY: (bBox.minY + width / 2) / containerHeight,
        width: width,
        height: height,
        id: bBox.id
      };
      return b;
    }, {});
    Object.entries(piles).forEach(function (_ref81) {
      var _ref82 = slicedToArray(_ref81, 2),
          pileId = _ref82[0],
          pileState = _ref82[1];

      pileState.items.forEach(function (itemId) {
        if (!bBoxes[itemId]) {
          bBoxes[itemId] = _objectSpread$3(_objectSpread$3({}, bBoxes[pileId]), {}, {
            id: itemId
          });
        }
      });
    });
    return Object.values(bBoxes);
  };

  var expandSplittingObjectivePosition = function expandSplittingObjectivePosition(objective) {
    var expandedObjective = {};

    if (isObject(objective)) {
      expandedObjective.threshold = objective.threshold;
      if (objective.basedOn) expandedObjective.basedOn = expandProperty(objective.basedOn);
    } else if (Array.isArray(objective)) {
      expandedObjective.threshold = objective[0];
      if (objective.length > 1) expandedObjective.basedOn = expandProperty(objective[1]);
    } else {
      expandedObjective.threshold = objective;
    }

    if (expandedObjective.basedOn) {
      var _store$state28 = store.state,
          items = _store$state28.items,
          _piles2 = _store$state28.piles;
      expandedObjective.basedOn = Object.values(_piles2).flatMap(function (pileState) {
        return pileState.items.map(function (itemId, index) {
          var item = renderedItems.get(itemId);

          var _expandedObjective$ba = expandedObjective.basedOn(items[itemId], itemId, index, item),
              _expandedObjective$ba2 = slicedToArray(_expandedObjective$ba, 2),
              cX = _expandedObjective$ba2[0],
              cY = _expandedObjective$ba2[1];

          return {
            id: itemId,
            cX: cX,
            cY: cY,
            width: item.image.width,
            height: item.image.height
          };
        });
      });
    } else {
      // Use the current layout
      expandedObjective.basedOn = itemizeSpatialIndex();
    }

    return expandedObjective;
  };

  var expandSplittingObjectiveData = function expandSplittingObjectiveData(objective) {
    var objectives = Array.isArray(objective) ? objective : [objective];
    return objectives.map(function (o) {
      return expandProperty(o);
    });
  };

  var expandSplittingObjective = function expandSplittingObjective(type, objective) {
    switch (type) {
      case 'overlap':
        return expandSplittingObjectivePosition(objective);

      case 'distance':
        return expandSplittingObjectivePosition(objective);

      case 'category':
        return expandSplittingObjectiveData(objective);

      case 'cluster':
        return expandSplittingObjectiveData(objective);

      default:
        return objective;
    }
  };

  var expandLabelObjective = function expandLabelObjective(objective) {
    if (objective === null) return null;
    var objectives = Array.isArray(objective) ? objective : [objective];
    return objectives.map(function (_objective) {
      return expandProperty(_objective);
    });
  };

  var expandLabelSizeAggregator = function expandLabelSizeAggregator(labelSizeAggregator) {
    if (isFunction(labelSizeAggregator)) return labelSizeAggregator;

    switch (labelSizeAggregator) {
      case 'histogram':
        return function (histogram) {
          var values = Object.values(histogram);
          var maxValue = max(values);
          return values.map(function (x) {
            return x / maxValue;
          });
        };

      default:
        return function (histogram) {
          return histogram.map(function () {
            return 1;
          });
        };
    }
  };

  var isDropMerging = false;

  var animateDropMerge = function animateDropMerge(targetPileId, otherPileIds) {
    if (isDropMerging) return;
    isDropMerging = true;
    var piles = store.state.piles;
    var x = piles[targetPileId].x;
    var y = piles[targetPileId].y;

    var onAllDone = function onAllDone() {
      isDropMerging = false;
      store.dispatch(createAction.mergePiles([targetPileId].concat(toConsumableArray(otherPileIds)), [x, y], targetPileId));
    };

    var onDone = function onDone() {
      if (++done === otherPileIds.length) onAllDone();
    };

    var done = 0;
    animator.addBatch(otherPileIds.map(function (pileId) {
      return getPileMoveToTweener(pileInstances.get(pileId), x, y, {
        onDone: onDone
      });
    }));
  };

  var hit;

  var updateOriginalPilePosition = function updateOriginalPilePosition(pileIds) {
    var piles = store.state.piles;
    pileIds.filter(function (pileId) {
      return pileInstances.has(pileId) && pileInstances.get(pileId).size === 1;
    }).forEach(function (pileId) {
      renderedItems.get(pileId).setOriginalPosition([piles[pileId].x, piles[pileId].y]);
    });
  };

  var pileDragEndHandler = function pileDragEndHandler(_ref83) {
    var target = _ref83.target;
    hit = false;
    updatePileBounds(target.id);
    var pile = pileInstances.get(target.id);
    var pileGfx = pile.graphics;
    if (pile.isTempDepiled) return;

    if (pile.x !== pileGfx.beforeDragX || pile.y !== pileGfx.beforeDragY) {
      var searchBBox = calcPileBBox(target.id);
      var collidePiles = spatialIndex.search(searchBBox).filter(function (collidePile) {
        return collidePile.id !== target.id;
      }); // only one pile is colliding with the pile

      if (collidePiles.length === 1) {
        if (!pile.isTempDepiled) {
          var targetPileId = collidePiles[0].id;
          var targetPile = pileInstances.get(targetPileId);
          var targetPileState = store.state.piles[targetPileId];
          hit = !targetPile.isTempDepiled;

          if (hit) {
            // TODO: The drop merge animation code should be unified
            // This is needed for the drop merge animation of the pile class
            pile.items.forEach(function (pileItem) {
              pileItem.item.tmpAbsX = pileGfx.x;
              pileItem.item.tmpAbsY = pileGfx.y;
              pileItem.item.tmpRelScale = pile.scale;
            });
            updateOriginalPilePosition([targetPileId, target.id]);
            var _store$state29 = store.state,
                previewAggregator = _store$state29.previewAggregator,
                previewRenderer = _store$state29.previewRenderer;

            if (previewAggregator || previewRenderer) {
              animateDropMerge(targetPileId, [target.id]);
            } else {
              store.dispatch(createAction.mergePiles([target.id, targetPileId], [targetPileState.x, targetPileState.y], targetPileId));
            }
          }
        }
      } else {
        // We need to "untransform" the position of the pile
        var _transformPointFromSc = transformPointFromScreen([pile.x, pile.y]),
            _transformPointFromSc2 = slicedToArray(_transformPointFromSc, 2),
            x = _transformPointFromSc2[0],
            y = _transformPointFromSc2[1];

        store.dispatch(createAction.movePiles([{
          id: target.id,
          x: x,
          y: y
        }]));
      }
    } // if not colliding, add the pile back to normalPiles container


    if (!hit) {
      clearActivePileLayer();
    }

    blurPrevDragOverPiles();
  };

  var prevDragOverPiles = [];

  var blurPrevDragOverPiles = function blurPrevDragOverPiles() {
    prevDragOverPiles.map(function (pile) {
      return pileInstances.get(pile.id);
    }).filter(identity) // to filter out undefined piles
    .forEach(function (pile) {
      pile.blur();
    });
    prevDragOverPiles = [];
  };

  var indicateDragOverPiles = function indicateDragOverPiles(pileId) {
    if (store.state.temporaryDepiledPiles.length) return;
    var currentDragOverPiles = spatialIndex.search(calcPileBBox(pileId)).filter(function (collidePile) {
      return collidePile.id !== pileId;
    });
    blurPrevDragOverPiles();
    currentDragOverPiles.map(function (pile) {
      return pileInstances.get(pile.id);
    }).filter(identity) // to filter out undefined piles
    .forEach(function (pile) {
      pile.hover();
    });
    prevDragOverPiles = toConsumableArray(currentDragOverPiles);
  };

  var pileDragStartHandler = function pileDragStartHandler(_ref84) {
    var target = _ref84.target,
        event = _ref84.event;
    var pile = pileInstances.get(target.id);

    if (pile && pile.isMagnified) {
      var mousePos = event.data.getLocalPosition(pile.graphics.parent);
      pile.graphics.draggingMouseOffset[0] /= pile.magnification;
      pile.graphics.draggingMouseOffset[1] /= pile.magnification;
      animateMovePileTo(pile, mousePos.x - pile.graphics.draggingMouseOffset[0], mousePos.y - pile.graphics.draggingMouseOffset[1]);
    }

    store.dispatch(createAction.setMagnifiedPiles([]));
    moveToActivePileLayer(pile.graphics);
  };

  var pileDragMoveHandler = function pileDragMoveHandler(_ref85) {
    var target = _ref85.target;
    indicateDragOverPiles(target.id);
  };

  var pileEnterHandler = function pileEnterHandler(_ref86) {
    var target = _ref86.target;
    var pile = pileInstances.get(target.id);
    moveToActivePileLayer(pile.graphics);
  };

  var pileLeaveHandler = function pileLeaveHandler(_ref87) {
    var target = _ref87.target;
    var pile = pileInstances.get(target.id);
    if (!pile || !pile.isTempDepiled) clearActivePileLayer();
  };

  var hideContextMenu = function hideContextMenu(contextMenuElement) {
    contextMenuElement.style.display = 'none';
    rootElement.removeChild(contextMenuElement);
  };

  var depileBtnClick = function depileBtnClick(contextMenuElement, pileId) {
    return function () {
      var depileMethod = store.state.depileMethod;

      if (depileMethod === 'cloestPos') {
        store.dispatch(createAction.setDepiledPile([pileId]));
      } else {
        depileToOriginPos(pileId);
      }

      store.dispatch(createAction.setFocusedPiles([]));
      hideContextMenu(contextMenuElement);
    };
  };

  var tempDepileBtnClick = function tempDepileBtnClick(contextMenuElement, pileId) {
    return function () {
      var _store$state30 = store.state,
          piles = _store$state30.piles,
          temporaryDepiledPiles = _store$state30.temporaryDepiledPiles;

      if (piles[pileId].items.length > 1) {
        var temp = toConsumableArray(temporaryDepiledPiles);

        if (temp.includes(pileId)) {
          temp = temp.filter(function (id) {
            return id !== pileId;
          });
        } else {
          temp = [pileId];
        }

        store.dispatch(createAction.setTemporaryDepiledPiles(toConsumableArray(temp)));
      }

      hideContextMenu(contextMenuElement);
    };
  };

  var toggleGridBtnClick = function toggleGridBtnClick(contextMenuElement) {
    return function () {
      var showGrid = store.state.showGrid;
      store.dispatch(createAction.setShowGrid(!showGrid));
      hideContextMenu(contextMenuElement);
      renderRaf();
    };
  };

  var pileMagnificationHandler = function pileMagnificationHandler(contextMenuElement, pileId) {
    return function () {
      var pile = pileInstances.get(pileId);

      if (pile.isMagnified) {
        store.dispatch(createAction.setMagnifiedPiles([]));
      } else {
        store.dispatch(createAction.setMagnifiedPiles([pileId]));
      }

      hideContextMenu(contextMenuElement);
    };
  };

  var mouseDownPosition = [0, 0];

  var mouseDownHandler = function mouseDownHandler(event) {
    if (event.button === 0) {
      renderRaf();
      mouseDownPosition = getMousePosition(event);
      var mouseDownPosRel = translatePointFromScreen(mouseDownPosition); // whether mouse click on any pile

      isMouseDown = !spatialIndex.collides({
        minX: mouseDownPosRel[0],
        minY: mouseDownPosRel[1],
        maxX: mouseDownPosRel[0] + 1,
        maxY: mouseDownPosRel[1] + 1
      });
      drawSpatialIndex(mouseDownPosRel);
    }
  };

  var mouseUpHandler = function mouseUpHandler() {
    if (!isMouseDown) return;
    isMouseDown = false;

    if (isLasso) {
      lassoEndHandler();
    } else if (isPanZoom) {
      panZoomEndHandler();
    }
  };

  var mouseMoveHandler = function mouseMoveHandler(event) {
    if (isMouseDown) {
      if (event.shiftKey || isLasso) {
        lasso.extendDb(getMousePosition(event));
      } else if (isPanZoom) {
        panZoomHandler(false);
      }
    }
  };

  var isClicked = false;

  var mouseClickHandler = function mouseClickHandler(event) {
    // when double click, avoid click handler
    if (isClicked) {
      isClicked = false;
      return;
    }

    isClicked = true;
    setTimeout(function () {
      isClicked = false;
    }, 300);
    var contextMenuElement = rootElement.querySelector('#piling-js-context-menu');
    var closedContextMenu = !!contextMenuElement;
    if (closedContextMenu) rootElement.removeChild(contextMenuElement);
    var currMousePos = getMousePosition(event); // click event: only when mouse down pos and mouse up pos are the same

    if (currMousePos[0] === mouseDownPosition[0] && currMousePos[1] === mouseDownPosition[1]) {
      var currMousePosRel = translatePointFromScreen(currMousePos);
      var results = spatialIndex.search({
        minX: currMousePosRel[0],
        minY: currMousePosRel[1],
        maxX: currMousePosRel[0] + 1,
        maxY: currMousePosRel[1] + 1
      });

      if (results.length !== 0) {
        if (event.shiftKey) {
          var focusedPiles = store.state.focusedPiles;
          var firstPileId = results[0].id;

          if (focusedPiles.includes(firstPileId)) {
            mergeFocusedPiles(firstPileId);
          } else {
            store.dispatch(createAction.setFocusedPiles([].concat(toConsumableArray(focusedPiles), [firstPileId])));
          }
        } else if (event.altKey) {
          var depileMethod = store.state.depileMethod;

          if (depileMethod === 'originalPos') {
            depileToOriginPos(results[0].id);
          } else if (depileMethod === 'cloestPos') {
            store.dispatch(createAction.setDepiledPile([results[0].id]));
          } else if (depileMethod === 'hoveredOne') {
            // store.dispatch(createAction.setDepiledPile([results[0].id]));
            var pileInstance = pileInstances.get(results[0].id);
            var itemId = pileInstance.previewItemId;
            extractItemsFromPile(pileInstance.id, [itemId]);
            var item = renderedItems.get(itemId);
            pileInstance.itemOutHandler({
              item: item
            });
          }

          store.dispatch(createAction.setFocusedPiles([]));
        } else {
          results.forEach(function (result) {
            var pile = pileInstances.get(result.id);

            if (pile.isHover) {
              store.dispatch(createAction.setFocusedPiles([result.id]));
            }
          });
        }
      } else {
        var _store$state31 = store.state,
            _focusedPiles = _store$state31.focusedPiles,
            magnifiedPiles = _store$state31.magnifiedPiles;
        if (_focusedPiles.length) store.dispatch(createAction.setFocusedPiles([]));
        if (magnifiedPiles.length) store.dispatch(createAction.setMagnifiedPiles([]));
        if (!closedContextMenu && !_focusedPiles.length && !magnifiedPiles.length) lasso.showStartIndicator(mouseDownPosition);
      }
    }
  };

  var mergeFocusedPiles = function mergeFocusedPiles(targetPileId) {
    var focusedPiles = store.state.focusedPiles;
    var otherPileIds = focusedPiles.filter(function (pileId) {
      return pileId !== targetPileId;
    });
    if (!otherPileIds.length) return;
    store.dispatch(createAction.setFocusedPiles([targetPileId]));
    animateDropMerge(targetPileId, otherPileIds);
  };

  var mouseDblClickHandler = function mouseDblClickHandler(event) {
    var currMousePos = getMousePosition(event);
    var currMousePosRel = translatePointFromScreen(currMousePos);
    var _store$state32 = store.state,
        temporaryDepiledPiles = _store$state32.temporaryDepiledPiles,
        piles = _store$state32.piles;
    var result = spatialIndex.search({
      minX: currMousePosRel[0],
      minY: currMousePosRel[1],
      maxX: currMousePosRel[0] + 1,
      maxY: currMousePosRel[1] + 1
    });

    if (result.length !== 0 && !temporaryDepiledPiles.length) {
      var firstPileId = result[0].id;

      if (event.shiftKey) {
        mergeFocusedPiles(firstPileId);
      } else if (piles[firstPileId].items.length > 1) {
        var temp = toConsumableArray(temporaryDepiledPiles);

        if (temp.includes(firstPileId)) {
          temp = temp.filter(function (id) {
            return id !== firstPileId;
          });
        } else {
          temp = [firstPileId];
        }

        store.dispatch(createAction.setTemporaryDepiledPiles(toConsumableArray(temp)));
      }
    } else {
      store.dispatch(createAction.setTemporaryDepiledPiles([]));
      store.dispatch(createAction.setFocusedPiles([]));
    }
  };

  var wheelHandler = function wheelHandler(event) {
    if (event.altKey) {
      var currMousePos = getMousePosition(event);
      var currMousePosRel = translatePointFromScreen(currMousePos);
      var result = spatialIndex.search({
        minX: currMousePosRel[0],
        minY: currMousePosRel[1],
        maxX: currMousePosRel[0] + 1,
        maxY: currMousePosRel[1] + 1
      });

      if (result.length !== 0) {
        var _pile3 = pileInstances.get(result[0].id);

        event.preventDefault();

        if (_pile3.isMagnified) {
          _pile3.magnifiedByWheel = true;
          store.dispatch(createAction.setMagnifiedPiles([_pile3.id]));
        } else {
          delete _pile3.magnifiedByWheel;
          store.dispatch(createAction.setMagnifiedPiles([]));
        }

        scalePile(result[0].id, normalizeWheel$1(event).pixelY);
      }
    } else if (isPanZoom) {
      panZoomHandler();
      zoomHandlerDb();
    }
  };

  var mouseScrollHandler = function mouseScrollHandler() {
    stage.y = -scrollContainer.scrollTop;
    renderRaf();
  };

  var resizeHandler = function resizeHandler() {
    var _rootElement$getBound2 = rootElement.getBoundingClientRect(),
        width = _rootElement$getBound2.width,
        height = _rootElement$getBound2.height;

    containerWidth = width;
    containerHeight = height;
    renderer.resize(containerWidth, containerHeight);
    if (camera) camera.setViewCenter([containerWidth / 2, containerHeight / 2]);
    mask.width = width;
    mask.height = height;
    updateGrid();
    pubSub.publish('resize', {
      width: width,
      height: height
    });
  };

  var resizeHandlerDb = debounce(resizeHandler, 500);

  var alignByGrid = function alignByGrid() {
    var pileMovements = layout.align(pileInstances);
    var tweeners = [];
    pileMovements.filter(function (_ref88) {
      var id = _ref88.id,
          x = _ref88.x,
          y = _ref88.y;
      var pile = pileInstances.get(id);
      var d = l2PointDist(x, y, pile.x, pile.y);

      if (d < 3) {
        movePileTo(pile, x, y);
        if (d > EPS) updatePileBounds(pile.id);
        return false;
      }

      return true;
    }).forEach(function (_ref89, index, array) {
      var id = _ref89.id,
          x = _ref89.x,
          y = _ref89.y;
      var pile = pileInstances.get(id);
      var d = l2PointDist(x, y, pile.x, pile.y);
      tweeners.push(createTweener({
        duration: Math.max(125, cubicOut(Math.min(d, 250) / 250) * 250),
        interpolator: interpolateVector,
        endValue: [x, y],
        getter: function getter() {
          return [pile.x, pile.y];
        },
        setter: function setter(xy) {
          movePileTo(pile, xy[0], xy[1]);
        },
        onDone: function onDone() {
          updatePileBounds(pile.id);

          if (index === array.length - 1) {
            store.dispatch(createAction.movePiles(pileMovements));
            createRBush();
            updateScrollHeight();
            renderRaf();
          }
        }
      }));
    });
    animator.addBatch(tweeners);
  };

  var closeContextMenu = function closeContextMenu() {
    var contextMenuElement = rootElement.querySelector('#piling-js-context-menu');
    if (contextMenuElement) rootElement.removeChild(contextMenuElement);
  };

  var alignByGridClickHandler = function alignByGridClickHandler() {
    alignByGrid();
    closeContextMenu();
  };

  var browseSeparatelyHandler = function browseSeparatelyHandler(contextMenuElement, pileId) {
    return function () {
      levels.enter([pileId]);
      depileToOriginPos(pileId);
      hideContextMenu(contextMenuElement);
    };
  };

  var contextmenuHandler = function contextmenuHandler(event) {
    closeContextMenu();
    var currMousePos = getMousePosition(event);
    var currMousePosRel = translatePointFromScreen(currMousePos);
    if (event.altKey) return;
    var _store$state33 = store.state,
        pileContextMenuItems = _store$state33.pileContextMenuItems,
        showGrid = _store$state33.showGrid;
    event.preventDefault();
    var results = spatialIndex.search({
      minX: currMousePosRel[0],
      minY: currMousePosRel[1],
      maxX: currMousePosRel[0] + 1,
      maxY: currMousePosRel[1] + 1
    });
    var clickedOnPile = results.length > 0;
    var element = createContextMenu({
      customItems: pileContextMenuItems.filter(function (item) {
        return item.label && item.callback;
      })
    });
    rootElement.appendChild(element);
    var depileBtn = element.querySelector('#depile-button');
    var tempDepileBtn = element.querySelector('#temp-depile-button');
    var browseSeparatelyBtn = element.querySelector('#browse-separately');
    var toggleGridBtn = element.querySelector('#grid-button');
    var alignBtn = element.querySelector('#align-button');
    var magnifyBtn = element.querySelector('#magnify-button');
    var extractBtn = element.querySelector('#extract-button'); // click on pile

    if (clickedOnPile) {
      toggleGridBtn.style.display = 'none';
      alignBtn.style.display = 'none';

      var _pile4;

      results.forEach(function (result) {
        if (pileInstances.get(result.id).isHover) {
          _pile4 = pileInstances.get(result.id);
        }
      });

      if (_pile4 && _pile4.size === 1) {
        depileBtn.setAttribute('disabled', '');
        depileBtn.setAttribute('class', 'inactive');
        tempDepileBtn.setAttribute('disabled', '');
        tempDepileBtn.setAttribute('class', 'inactive');
        browseSeparatelyBtn.setAttribute('disabled', '');
        browseSeparatelyBtn.setAttribute('class', 'inactive');
      } else if (_pile4.isTempDepiled) {
        depileBtn.setAttribute('disabled', '');
        depileBtn.setAttribute('class', 'inactive');
        magnifyBtn.setAttribute('disabled', '');
        magnifyBtn.setAttribute('class', 'inactive');
        browseSeparatelyBtn.setAttribute('disabled', '');
        browseSeparatelyBtn.setAttribute('class', 'inactive');
        tempDepileBtn.innerHTML = 'Close Temp. Depile';
      }

      if (_pile4.isMagnified) {
        magnifyBtn.innerHTML = 'Unmagnify';
      }

      element.style.display = 'block';

      var _element$getBoundingC = element.getBoundingClientRect(),
          width = _element$getBoundingC.width; // a workaround to keep preview while context menu


      element.style.left = "".concat(_pile4.x - width, "px");
      element.style.top = "".concat(currMousePos[1] + stage.y - 10, "px");

      if (levels.size < 1) {
        extractBtn.addEventListener('click', function () {
          extractItemsFromPile(_pile4.id, [pileInstances.get(_pile4.id).previewItemId]);
          hideContextMenu(element);
        }, EVENT_LISTENER_PASSIVE);
      } else {
        if (_pile4.size > 1) {
          extractBtn.innerHTML = 'Extract This Pile';
        }

        extractBtn.addEventListener('click', function () {
          var itemIds = _pile4.items.map(function (d) {
            return d.id;
          });

          var sourcePileId = levels.currSourcePileIds[0];
          levels.leave();
          extractItemsFromPile(sourcePileId, itemIds);
        }, EVENT_LISTENER_PASSIVE);
      }

      depileBtn.addEventListener('click', depileBtnClick(element, _pile4.id), EVENT_LISTENER_PASSIVE);
      tempDepileBtn.addEventListener('click', tempDepileBtnClick(element, _pile4.id), EVENT_LISTENER_PASSIVE);
      browseSeparatelyBtn.addEventListener('click', browseSeparatelyHandler(element, _pile4.id), EVENT_LISTENER_PASSIVE);
      magnifyBtn.addEventListener('click', pileMagnificationHandler(element, _pile4.id), EVENT_LISTENER_PASSIVE);
      pileContextMenuItems.forEach(function (item, index) {
        var button = item.id ? element.querySelector("#".concat(item.id)) : element.querySelector("#piling-js-context-menu-custom-item-".concat(index));
        button.addEventListener('click', function () {
          item.callback(_objectSpread$3({
            id: _pile4.id
          }, store.state.piles[_pile4.id]));
          if (!item.keepOpen) closeContextMenu();
        }, {
          once: !item.keepOpen,
          passive: true
        });
      });
    } else {
      depileBtn.style.display = 'none';
      tempDepileBtn.style.display = 'none';
      browseSeparatelyBtn.style.display = 'none';
      magnifyBtn.style.display = 'none';
      extractBtn.style.display = 'none';

      if (showGrid) {
        toggleGridBtn.innerHTML = 'Hide Grid';
      }

      element.style.display = 'block';

      var _element$getBoundingC2 = element.getBoundingClientRect(),
          _width = _element$getBoundingC2.width;

      if (currMousePos[0] > canvas.getBoundingClientRect().width - _width) {
        element.style.left = "".concat(currMousePos[0] - _width, "px");
      } else {
        element.style.left = "".concat(currMousePos[0], "px");
      }

      element.style.top = "".concat(currMousePos[1] + stage.y, "px");
      toggleGridBtn.addEventListener('click', toggleGridBtnClick(element), EVENT_LISTENER_PASSIVE);
      alignBtn.addEventListener('click', alignByGridClickHandler, EVENT_LISTENER_PASSIVE);
      pileContextMenuItems.forEach(function (item, index) {
        var button = item.id ? element.querySelector("#".concat(item.id)) : element.querySelector("#piling-js-context-menu-custom-item-".concat(index));
        button.addEventListener('click', function () {
          item.callback();
          if (!item.keepOpen) closeContextMenu();
        }, {
          once: !item.keepOpen,
          passive: true
        });
      });
    }
  };

  var startAnimationHandler = function startAnimationHandler(tweener) {
    tweener.setEasing(store.state.easing);
    animator.add(tweener);
  };

  var cancelAnimationHandler = function cancelAnimationHandler(tweener) {
    animator.cancel(tweener);
  };

  var storeUnsubscribor;

  var init = function init() {
    // Setup event handler
    window.addEventListener('resize', resizeHandlerDb, EVENT_LISTENER_PASSIVE);
    window.addEventListener('orientationchange', resizeHandlerDb, EVENT_LISTENER_PASSIVE);
    canvas.addEventListener('contextmenu', contextmenuHandler, EVENT_LISTENER_ACTIVE);
    canvas.addEventListener('click', mouseClickHandler, EVENT_LISTENER_PASSIVE);
    canvas.addEventListener('dblclick', mouseDblClickHandler, EVENT_LISTENER_PASSIVE);
    pubSub.subscribe('pileDragStart', pileDragStartHandler);
    pubSub.subscribe('pileDragMove', pileDragMoveHandler);
    pubSub.subscribe('pileDragEnd', pileDragEndHandler);
    pubSub.subscribe('pileEnter', pileEnterHandler);
    pubSub.subscribe('pileLeave', pileLeaveHandler);
    pubSub.subscribe('startAnimation', startAnimationHandler);
    pubSub.subscribe('cancelAnimation', cancelAnimationHandler);
    pubSub.subscribe('updatePileBounds', updatePileBoundsHandler);
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
    enableInteractivity();
    var whenInit = setPublic(initProps);

    if (!initProps.piles && initProps.items) {
      store.dispatch(createAction.initPiles(initProps.items));
    }

    return whenInit;
  };

  var destroy = function destroy() {
    destroyed = true; // Remove event listeners

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
    root.destroy(true);
    root = null;
    renderer.destroy(true);
    renderer = null;
    lasso.destroy();
    badgeFactory.destroy();

    if (storeUnsubscribor) {
      storeUnsubscribor();
      storeUnsubscribor = undefined;
    }

    while (rootElement.firstChild) {
      rootElement.firstChild.remove();
    }

    pubSub.clear();
  };

  var whenInit = init(); // each pile is [pileId, pileState]

  var setPiles = function setPiles(piles) {
    store.dispatch(createAction.setPiles(piles));
  };

  return {
    // Properties
    get renderer() {
      return renderer;
    },

    get version() {
      return version;
    },

    // Methods
    arrangeBy: arrangeBy,
    setPiles: setPiles,
    destroy: destroy,
    exportState: exportState,
    get: get,
    groupBy: groupByPublic,
    halt: halt,
    importState: importState,
    render: renderRaf,
    resume: resume,
    set: setPublic,
    splitAll: splitAll,
    splitBy: splitByPublic,
    subscribe: pubSub.subscribe,
    unsubscribe: pubSub.unsubscribe,
    whenInit: whenInit
  };
};

export default createPilingJs;
