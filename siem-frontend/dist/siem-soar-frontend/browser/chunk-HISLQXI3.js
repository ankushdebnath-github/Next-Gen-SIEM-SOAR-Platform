import {
  AsyncPipe,
  BehaviorSubject,
  ChangeDetectorRef,
  CommonModule,
  DatePipe,
  DecimalPipe,
  EventEmitter,
  HttpClient,
  NgClass,
  NgForOf,
  NgIf,
  NgZone,
  Observable,
  SlicePipe,
  Subject,
  Subscription,
  __commonJS,
  __export,
  __spreadValues,
  __toESM,
  catchError,
  share,
  tap,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpropertyInterpolate1,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵviewQuery
} from "./chunk-5AELG2J6.js";

// node_modules/leaflet/dist/leaflet-src.js
var require_leaflet_src = __commonJS({
  "node_modules/leaflet/dist/leaflet-src.js"(exports, module) {
    "use strict";
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.leaflet = {}));
    })(exports, function(exports2) {
      "use strict";
      var version = "1.9.4";
      function extend2(dest) {
        var i2, j, len, src;
        for (j = 1, len = arguments.length; j < len; j++) {
          src = arguments[j];
          for (i2 in src) {
            dest[i2] = src[i2];
          }
        }
        return dest;
      }
      var create$2 = Object.create || /* @__PURE__ */ function() {
        function F() {
        }
        return function(proto) {
          F.prototype = proto;
          return new F();
        };
      }();
      function bind(fn, obj) {
        var slice = Array.prototype.slice;
        if (fn.bind) {
          return fn.bind.apply(fn, slice.call(arguments, 1));
        }
        var args = slice.call(arguments, 2);
        return function() {
          return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
        };
      }
      var lastId = 0;
      function stamp(obj) {
        if (!("_leaflet_id" in obj)) {
          obj["_leaflet_id"] = ++lastId;
        }
        return obj._leaflet_id;
      }
      function throttle(fn, time, context) {
        var lock, args, wrapperFn, later;
        later = function() {
          lock = false;
          if (args) {
            wrapperFn.apply(context, args);
            args = false;
          }
        };
        wrapperFn = function() {
          if (lock) {
            args = arguments;
          } else {
            fn.apply(context, arguments);
            setTimeout(later, time);
            lock = true;
          }
        };
        return wrapperFn;
      }
      function wrapNum(x3, range, includeMax) {
        var max2 = range[1], min2 = range[0], d = max2 - min2;
        return x3 === max2 && includeMax ? x3 : ((x3 - min2) % d + d) % d + min2;
      }
      function falseFn() {
        return false;
      }
      function formatNum(num, precision) {
        if (precision === false) {
          return num;
        }
        var pow = Math.pow(10, precision === void 0 ? 6 : precision);
        return Math.round(num * pow) / pow;
      }
      function trim(str) {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
      }
      function splitWords(str) {
        return trim(str).split(/\s+/);
      }
      function setOptions(obj, options) {
        if (!Object.prototype.hasOwnProperty.call(obj, "options")) {
          obj.options = obj.options ? create$2(obj.options) : {};
        }
        for (var i2 in options) {
          obj.options[i2] = options[i2];
        }
        return obj.options;
      }
      function getParamString(obj, existingUrl, uppercase) {
        var params = [];
        for (var i2 in obj) {
          params.push(encodeURIComponent(uppercase ? i2.toUpperCase() : i2) + "=" + encodeURIComponent(obj[i2]));
        }
        return (!existingUrl || existingUrl.indexOf("?") === -1 ? "?" : "&") + params.join("&");
      }
      var templateRe = /\{ *([\w_ -]+) *\}/g;
      function template(str, data) {
        return str.replace(templateRe, function(str2, key) {
          var value2 = data[key];
          if (value2 === void 0) {
            throw new Error("No value provided for variable " + str2);
          } else if (typeof value2 === "function") {
            value2 = value2(data);
          }
          return value2;
        });
      }
      var isArray = Array.isArray || function(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
      };
      function indexOf(array2, el) {
        for (var i2 = 0; i2 < array2.length; i2++) {
          if (array2[i2] === el) {
            return i2;
          }
        }
        return -1;
      }
      var emptyImageUrl = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
      function getPrefixed(name) {
        return window["webkit" + name] || window["moz" + name] || window["ms" + name];
      }
      var lastTime = 0;
      function timeoutDefer(fn) {
        var time = +/* @__PURE__ */ new Date(), timeToCall = Math.max(0, 16 - (time - lastTime));
        lastTime = time + timeToCall;
        return window.setTimeout(fn, timeToCall);
      }
      var requestFn = window.requestAnimationFrame || getPrefixed("RequestAnimationFrame") || timeoutDefer;
      var cancelFn = window.cancelAnimationFrame || getPrefixed("CancelAnimationFrame") || getPrefixed("CancelRequestAnimationFrame") || function(id2) {
        window.clearTimeout(id2);
      };
      function requestAnimFrame(fn, context, immediate) {
        if (immediate && requestFn === timeoutDefer) {
          fn.call(context);
        } else {
          return requestFn.call(window, bind(fn, context));
        }
      }
      function cancelAnimFrame(id2) {
        if (id2) {
          cancelFn.call(window, id2);
        }
      }
      var Util = {
        __proto__: null,
        extend: extend2,
        create: create$2,
        bind,
        get lastId() {
          return lastId;
        },
        stamp,
        throttle,
        wrapNum,
        falseFn,
        formatNum,
        trim,
        splitWords,
        setOptions,
        getParamString,
        template,
        isArray,
        indexOf,
        emptyImageUrl,
        requestFn,
        cancelFn,
        requestAnimFrame,
        cancelAnimFrame
      };
      function Class() {
      }
      Class.extend = function(props) {
        var NewClass = function() {
          setOptions(this);
          if (this.initialize) {
            this.initialize.apply(this, arguments);
          }
          this.callInitHooks();
        };
        var parentProto = NewClass.__super__ = this.prototype;
        var proto = create$2(parentProto);
        proto.constructor = NewClass;
        NewClass.prototype = proto;
        for (var i2 in this) {
          if (Object.prototype.hasOwnProperty.call(this, i2) && i2 !== "prototype" && i2 !== "__super__") {
            NewClass[i2] = this[i2];
          }
        }
        if (props.statics) {
          extend2(NewClass, props.statics);
        }
        if (props.includes) {
          checkDeprecatedMixinEvents(props.includes);
          extend2.apply(null, [proto].concat(props.includes));
        }
        extend2(proto, props);
        delete proto.statics;
        delete proto.includes;
        if (proto.options) {
          proto.options = parentProto.options ? create$2(parentProto.options) : {};
          extend2(proto.options, props.options);
        }
        proto._initHooks = [];
        proto.callInitHooks = function() {
          if (this._initHooksCalled) {
            return;
          }
          if (parentProto.callInitHooks) {
            parentProto.callInitHooks.call(this);
          }
          this._initHooksCalled = true;
          for (var i3 = 0, len = proto._initHooks.length; i3 < len; i3++) {
            proto._initHooks[i3].call(this);
          }
        };
        return NewClass;
      };
      Class.include = function(props) {
        var parentOptions = this.prototype.options;
        extend2(this.prototype, props);
        if (props.options) {
          this.prototype.options = parentOptions;
          this.mergeOptions(props.options);
        }
        return this;
      };
      Class.mergeOptions = function(options) {
        extend2(this.prototype.options, options);
        return this;
      };
      Class.addInitHook = function(fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        var init2 = typeof fn === "function" ? fn : function() {
          this[fn].apply(this, args);
        };
        this.prototype._initHooks = this.prototype._initHooks || [];
        this.prototype._initHooks.push(init2);
        return this;
      };
      function checkDeprecatedMixinEvents(includes) {
        if (typeof L === "undefined" || !L || !L.Mixin) {
          return;
        }
        includes = isArray(includes) ? includes : [includes];
        for (var i2 = 0; i2 < includes.length; i2++) {
          if (includes[i2] === L.Mixin.Events) {
            console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
          }
        }
      }
      var Events = {
        /* @method on(type: String, fn: Function, context?: Object): this
         * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
         *
         * @alternative
         * @method on(eventMap: Object): this
         * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
         */
        on: function(types, fn, context) {
          if (typeof types === "object") {
            for (var type2 in types) {
              this._on(type2, types[type2], fn);
            }
          } else {
            types = splitWords(types);
            for (var i2 = 0, len = types.length; i2 < len; i2++) {
              this._on(types[i2], fn, context);
            }
          }
          return this;
        },
        /* @method off(type: String, fn?: Function, context?: Object): this
         * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
         *
         * @alternative
         * @method off(eventMap: Object): this
         * Removes a set of type/listener pairs.
         *
         * @alternative
         * @method off: this
         * Removes all listeners to all events on the object. This includes implicitly attached events.
         */
        off: function(types, fn, context) {
          if (!arguments.length) {
            delete this._events;
          } else if (typeof types === "object") {
            for (var type2 in types) {
              this._off(type2, types[type2], fn);
            }
          } else {
            types = splitWords(types);
            var removeAll2 = arguments.length === 1;
            for (var i2 = 0, len = types.length; i2 < len; i2++) {
              if (removeAll2) {
                this._off(types[i2]);
              } else {
                this._off(types[i2], fn, context);
              }
            }
          }
          return this;
        },
        // attach listener (without syntactic sugar now)
        _on: function(type2, fn, context, _once) {
          if (typeof fn !== "function") {
            console.warn("wrong listener type: " + typeof fn);
            return;
          }
          if (this._listens(type2, fn, context) !== false) {
            return;
          }
          if (context === this) {
            context = void 0;
          }
          var newListener = { fn, ctx: context };
          if (_once) {
            newListener.once = true;
          }
          this._events = this._events || {};
          this._events[type2] = this._events[type2] || [];
          this._events[type2].push(newListener);
        },
        _off: function(type2, fn, context) {
          var listeners, i2, len;
          if (!this._events) {
            return;
          }
          listeners = this._events[type2];
          if (!listeners) {
            return;
          }
          if (arguments.length === 1) {
            if (this._firingCount) {
              for (i2 = 0, len = listeners.length; i2 < len; i2++) {
                listeners[i2].fn = falseFn;
              }
            }
            delete this._events[type2];
            return;
          }
          if (typeof fn !== "function") {
            console.warn("wrong listener type: " + typeof fn);
            return;
          }
          var index3 = this._listens(type2, fn, context);
          if (index3 !== false) {
            var listener = listeners[index3];
            if (this._firingCount) {
              listener.fn = falseFn;
              this._events[type2] = listeners = listeners.slice();
            }
            listeners.splice(index3, 1);
          }
        },
        // @method fire(type: String, data?: Object, propagate?: Boolean): this
        // Fires an event of the specified type. You can optionally provide a data
        // object — the first argument of the listener function will contain its
        // properties. The event can optionally be propagated to event parents.
        fire: function(type2, data, propagate) {
          if (!this.listens(type2, propagate)) {
            return this;
          }
          var event = extend2({}, data, {
            type: type2,
            target: this,
            sourceTarget: data && data.sourceTarget || this
          });
          if (this._events) {
            var listeners = this._events[type2];
            if (listeners) {
              this._firingCount = this._firingCount + 1 || 1;
              for (var i2 = 0, len = listeners.length; i2 < len; i2++) {
                var l = listeners[i2];
                var fn = l.fn;
                if (l.once) {
                  this.off(type2, fn, l.ctx);
                }
                fn.call(l.ctx || this, event);
              }
              this._firingCount--;
            }
          }
          if (propagate) {
            this._propagateEvent(event);
          }
          return this;
        },
        // @method listens(type: String, propagate?: Boolean): Boolean
        // @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
        // Returns `true` if a particular event type has any listeners attached to it.
        // The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
        listens: function(type2, fn, context, propagate) {
          if (typeof type2 !== "string") {
            console.warn('"string" type argument expected');
          }
          var _fn = fn;
          if (typeof fn !== "function") {
            propagate = !!fn;
            _fn = void 0;
            context = void 0;
          }
          var listeners = this._events && this._events[type2];
          if (listeners && listeners.length) {
            if (this._listens(type2, _fn, context) !== false) {
              return true;
            }
          }
          if (propagate) {
            for (var id2 in this._eventParents) {
              if (this._eventParents[id2].listens(type2, fn, context, propagate)) {
                return true;
              }
            }
          }
          return false;
        },
        // returns the index (number) or false
        _listens: function(type2, fn, context) {
          if (!this._events) {
            return false;
          }
          var listeners = this._events[type2] || [];
          if (!fn) {
            return !!listeners.length;
          }
          if (context === this) {
            context = void 0;
          }
          for (var i2 = 0, len = listeners.length; i2 < len; i2++) {
            if (listeners[i2].fn === fn && listeners[i2].ctx === context) {
              return i2;
            }
          }
          return false;
        },
        // @method once(…): this
        // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
        once: function(types, fn, context) {
          if (typeof types === "object") {
            for (var type2 in types) {
              this._on(type2, types[type2], fn, true);
            }
          } else {
            types = splitWords(types);
            for (var i2 = 0, len = types.length; i2 < len; i2++) {
              this._on(types[i2], fn, context, true);
            }
          }
          return this;
        },
        // @method addEventParent(obj: Evented): this
        // Adds an event parent - an `Evented` that will receive propagated events
        addEventParent: function(obj) {
          this._eventParents = this._eventParents || {};
          this._eventParents[stamp(obj)] = obj;
          return this;
        },
        // @method removeEventParent(obj: Evented): this
        // Removes an event parent, so it will stop receiving propagated events
        removeEventParent: function(obj) {
          if (this._eventParents) {
            delete this._eventParents[stamp(obj)];
          }
          return this;
        },
        _propagateEvent: function(e) {
          for (var id2 in this._eventParents) {
            this._eventParents[id2].fire(e.type, extend2({
              layer: e.target,
              propagatedFrom: e.target
            }, e), true);
          }
        }
      };
      Events.addEventListener = Events.on;
      Events.removeEventListener = Events.clearAllEventListeners = Events.off;
      Events.addOneTimeEventListener = Events.once;
      Events.fireEvent = Events.fire;
      Events.hasEventListeners = Events.listens;
      var Evented = Class.extend(Events);
      function Point(x3, y3, round) {
        this.x = round ? Math.round(x3) : x3;
        this.y = round ? Math.round(y3) : y3;
      }
      var trunc = Math.trunc || function(v) {
        return v > 0 ? Math.floor(v) : Math.ceil(v);
      };
      Point.prototype = {
        // @method clone(): Point
        // Returns a copy of the current point.
        clone: function() {
          return new Point(this.x, this.y);
        },
        // @method add(otherPoint: Point): Point
        // Returns the result of addition of the current and the given points.
        add: function(point) {
          return this.clone()._add(toPoint(point));
        },
        _add: function(point) {
          this.x += point.x;
          this.y += point.y;
          return this;
        },
        // @method subtract(otherPoint: Point): Point
        // Returns the result of subtraction of the given point from the current.
        subtract: function(point) {
          return this.clone()._subtract(toPoint(point));
        },
        _subtract: function(point) {
          this.x -= point.x;
          this.y -= point.y;
          return this;
        },
        // @method divideBy(num: Number): Point
        // Returns the result of division of the current point by the given number.
        divideBy: function(num) {
          return this.clone()._divideBy(num);
        },
        _divideBy: function(num) {
          this.x /= num;
          this.y /= num;
          return this;
        },
        // @method multiplyBy(num: Number): Point
        // Returns the result of multiplication of the current point by the given number.
        multiplyBy: function(num) {
          return this.clone()._multiplyBy(num);
        },
        _multiplyBy: function(num) {
          this.x *= num;
          this.y *= num;
          return this;
        },
        // @method scaleBy(scale: Point): Point
        // Multiply each coordinate of the current point by each coordinate of
        // `scale`. In linear algebra terms, multiply the point by the
        // [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
        // defined by `scale`.
        scaleBy: function(point) {
          return new Point(this.x * point.x, this.y * point.y);
        },
        // @method unscaleBy(scale: Point): Point
        // Inverse of `scaleBy`. Divide each coordinate of the current point by
        // each coordinate of `scale`.
        unscaleBy: function(point) {
          return new Point(this.x / point.x, this.y / point.y);
        },
        // @method round(): Point
        // Returns a copy of the current point with rounded coordinates.
        round: function() {
          return this.clone()._round();
        },
        _round: function() {
          this.x = Math.round(this.x);
          this.y = Math.round(this.y);
          return this;
        },
        // @method floor(): Point
        // Returns a copy of the current point with floored coordinates (rounded down).
        floor: function() {
          return this.clone()._floor();
        },
        _floor: function() {
          this.x = Math.floor(this.x);
          this.y = Math.floor(this.y);
          return this;
        },
        // @method ceil(): Point
        // Returns a copy of the current point with ceiled coordinates (rounded up).
        ceil: function() {
          return this.clone()._ceil();
        },
        _ceil: function() {
          this.x = Math.ceil(this.x);
          this.y = Math.ceil(this.y);
          return this;
        },
        // @method trunc(): Point
        // Returns a copy of the current point with truncated coordinates (rounded towards zero).
        trunc: function() {
          return this.clone()._trunc();
        },
        _trunc: function() {
          this.x = trunc(this.x);
          this.y = trunc(this.y);
          return this;
        },
        // @method distanceTo(otherPoint: Point): Number
        // Returns the cartesian distance between the current and the given points.
        distanceTo: function(point) {
          point = toPoint(point);
          var x3 = point.x - this.x, y3 = point.y - this.y;
          return Math.sqrt(x3 * x3 + y3 * y3);
        },
        // @method equals(otherPoint: Point): Boolean
        // Returns `true` if the given point has the same coordinates.
        equals: function(point) {
          point = toPoint(point);
          return point.x === this.x && point.y === this.y;
        },
        // @method contains(otherPoint: Point): Boolean
        // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
        contains: function(point) {
          point = toPoint(point);
          return Math.abs(point.x) <= Math.abs(this.x) && Math.abs(point.y) <= Math.abs(this.y);
        },
        // @method toString(): String
        // Returns a string representation of the point for debugging purposes.
        toString: function() {
          return "Point(" + formatNum(this.x) + ", " + formatNum(this.y) + ")";
        }
      };
      function toPoint(x3, y3, round) {
        if (x3 instanceof Point) {
          return x3;
        }
        if (isArray(x3)) {
          return new Point(x3[0], x3[1]);
        }
        if (x3 === void 0 || x3 === null) {
          return x3;
        }
        if (typeof x3 === "object" && "x" in x3 && "y" in x3) {
          return new Point(x3.x, x3.y);
        }
        return new Point(x3, y3, round);
      }
      function Bounds(a2, b) {
        if (!a2) {
          return;
        }
        var points = b ? [a2, b] : a2;
        for (var i2 = 0, len = points.length; i2 < len; i2++) {
          this.extend(points[i2]);
        }
      }
      Bounds.prototype = {
        // @method extend(point: Point): this
        // Extends the bounds to contain the given point.
        // @alternative
        // @method extend(otherBounds: Bounds): this
        // Extend the bounds to contain the given bounds
        extend: function(obj) {
          var min2, max2;
          if (!obj) {
            return this;
          }
          if (obj instanceof Point || typeof obj[0] === "number" || "x" in obj) {
            min2 = max2 = toPoint(obj);
          } else {
            obj = toBounds(obj);
            min2 = obj.min;
            max2 = obj.max;
            if (!min2 || !max2) {
              return this;
            }
          }
          if (!this.min && !this.max) {
            this.min = min2.clone();
            this.max = max2.clone();
          } else {
            this.min.x = Math.min(min2.x, this.min.x);
            this.max.x = Math.max(max2.x, this.max.x);
            this.min.y = Math.min(min2.y, this.min.y);
            this.max.y = Math.max(max2.y, this.max.y);
          }
          return this;
        },
        // @method getCenter(round?: Boolean): Point
        // Returns the center point of the bounds.
        getCenter: function(round) {
          return toPoint(
            (this.min.x + this.max.x) / 2,
            (this.min.y + this.max.y) / 2,
            round
          );
        },
        // @method getBottomLeft(): Point
        // Returns the bottom-left point of the bounds.
        getBottomLeft: function() {
          return toPoint(this.min.x, this.max.y);
        },
        // @method getTopRight(): Point
        // Returns the top-right point of the bounds.
        getTopRight: function() {
          return toPoint(this.max.x, this.min.y);
        },
        // @method getTopLeft(): Point
        // Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
        getTopLeft: function() {
          return this.min;
        },
        // @method getBottomRight(): Point
        // Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
        getBottomRight: function() {
          return this.max;
        },
        // @method getSize(): Point
        // Returns the size of the given bounds
        getSize: function() {
          return this.max.subtract(this.min);
        },
        // @method contains(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle contains the given one.
        // @alternative
        // @method contains(point: Point): Boolean
        // Returns `true` if the rectangle contains the given point.
        contains: function(obj) {
          var min2, max2;
          if (typeof obj[0] === "number" || obj instanceof Point) {
            obj = toPoint(obj);
          } else {
            obj = toBounds(obj);
          }
          if (obj instanceof Bounds) {
            min2 = obj.min;
            max2 = obj.max;
          } else {
            min2 = max2 = obj;
          }
          return min2.x >= this.min.x && max2.x <= this.max.x && min2.y >= this.min.y && max2.y <= this.max.y;
        },
        // @method intersects(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds
        // intersect if they have at least one point in common.
        intersects: function(bounds) {
          bounds = toBounds(bounds);
          var min2 = this.min, max2 = this.max, min22 = bounds.min, max22 = bounds.max, xIntersects = max22.x >= min2.x && min22.x <= max2.x, yIntersects = max22.y >= min2.y && min22.y <= max2.y;
          return xIntersects && yIntersects;
        },
        // @method overlaps(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds
        // overlap if their intersection is an area.
        overlaps: function(bounds) {
          bounds = toBounds(bounds);
          var min2 = this.min, max2 = this.max, min22 = bounds.min, max22 = bounds.max, xOverlaps = max22.x > min2.x && min22.x < max2.x, yOverlaps = max22.y > min2.y && min22.y < max2.y;
          return xOverlaps && yOverlaps;
        },
        // @method isValid(): Boolean
        // Returns `true` if the bounds are properly initialized.
        isValid: function() {
          return !!(this.min && this.max);
        },
        // @method pad(bufferRatio: Number): Bounds
        // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
        // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
        // Negative values will retract the bounds.
        pad: function(bufferRatio) {
          var min2 = this.min, max2 = this.max, heightBuffer = Math.abs(min2.x - max2.x) * bufferRatio, widthBuffer = Math.abs(min2.y - max2.y) * bufferRatio;
          return toBounds(
            toPoint(min2.x - heightBuffer, min2.y - widthBuffer),
            toPoint(max2.x + heightBuffer, max2.y + widthBuffer)
          );
        },
        // @method equals(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle is equivalent to the given bounds.
        equals: function(bounds) {
          if (!bounds) {
            return false;
          }
          bounds = toBounds(bounds);
          return this.min.equals(bounds.getTopLeft()) && this.max.equals(bounds.getBottomRight());
        }
      };
      function toBounds(a2, b) {
        if (!a2 || a2 instanceof Bounds) {
          return a2;
        }
        return new Bounds(a2, b);
      }
      function LatLngBounds(corner1, corner2) {
        if (!corner1) {
          return;
        }
        var latlngs = corner2 ? [corner1, corner2] : corner1;
        for (var i2 = 0, len = latlngs.length; i2 < len; i2++) {
          this.extend(latlngs[i2]);
        }
      }
      LatLngBounds.prototype = {
        // @method extend(latlng: LatLng): this
        // Extend the bounds to contain the given point
        // @alternative
        // @method extend(otherBounds: LatLngBounds): this
        // Extend the bounds to contain the given bounds
        extend: function(obj) {
          var sw = this._southWest, ne = this._northEast, sw2, ne2;
          if (obj instanceof LatLng) {
            sw2 = obj;
            ne2 = obj;
          } else if (obj instanceof LatLngBounds) {
            sw2 = obj._southWest;
            ne2 = obj._northEast;
            if (!sw2 || !ne2) {
              return this;
            }
          } else {
            return obj ? this.extend(toLatLng(obj) || toLatLngBounds(obj)) : this;
          }
          if (!sw && !ne) {
            this._southWest = new LatLng(sw2.lat, sw2.lng);
            this._northEast = new LatLng(ne2.lat, ne2.lng);
          } else {
            sw.lat = Math.min(sw2.lat, sw.lat);
            sw.lng = Math.min(sw2.lng, sw.lng);
            ne.lat = Math.max(ne2.lat, ne.lat);
            ne.lng = Math.max(ne2.lng, ne.lng);
          }
          return this;
        },
        // @method pad(bufferRatio: Number): LatLngBounds
        // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
        // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
        // Negative values will retract the bounds.
        pad: function(bufferRatio) {
          var sw = this._southWest, ne = this._northEast, heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio, widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;
          return new LatLngBounds(
            new LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
            new LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer)
          );
        },
        // @method getCenter(): LatLng
        // Returns the center point of the bounds.
        getCenter: function() {
          return new LatLng(
            (this._southWest.lat + this._northEast.lat) / 2,
            (this._southWest.lng + this._northEast.lng) / 2
          );
        },
        // @method getSouthWest(): LatLng
        // Returns the south-west point of the bounds.
        getSouthWest: function() {
          return this._southWest;
        },
        // @method getNorthEast(): LatLng
        // Returns the north-east point of the bounds.
        getNorthEast: function() {
          return this._northEast;
        },
        // @method getNorthWest(): LatLng
        // Returns the north-west point of the bounds.
        getNorthWest: function() {
          return new LatLng(this.getNorth(), this.getWest());
        },
        // @method getSouthEast(): LatLng
        // Returns the south-east point of the bounds.
        getSouthEast: function() {
          return new LatLng(this.getSouth(), this.getEast());
        },
        // @method getWest(): Number
        // Returns the west longitude of the bounds
        getWest: function() {
          return this._southWest.lng;
        },
        // @method getSouth(): Number
        // Returns the south latitude of the bounds
        getSouth: function() {
          return this._southWest.lat;
        },
        // @method getEast(): Number
        // Returns the east longitude of the bounds
        getEast: function() {
          return this._northEast.lng;
        },
        // @method getNorth(): Number
        // Returns the north latitude of the bounds
        getNorth: function() {
          return this._northEast.lat;
        },
        // @method contains(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle contains the given one.
        // @alternative
        // @method contains (latlng: LatLng): Boolean
        // Returns `true` if the rectangle contains the given point.
        contains: function(obj) {
          if (typeof obj[0] === "number" || obj instanceof LatLng || "lat" in obj) {
            obj = toLatLng(obj);
          } else {
            obj = toLatLngBounds(obj);
          }
          var sw = this._southWest, ne = this._northEast, sw2, ne2;
          if (obj instanceof LatLngBounds) {
            sw2 = obj.getSouthWest();
            ne2 = obj.getNorthEast();
          } else {
            sw2 = ne2 = obj;
          }
          return sw2.lat >= sw.lat && ne2.lat <= ne.lat && sw2.lng >= sw.lng && ne2.lng <= ne.lng;
        },
        // @method intersects(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
        intersects: function(bounds) {
          bounds = toLatLngBounds(bounds);
          var sw = this._southWest, ne = this._northEast, sw2 = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), latIntersects = ne2.lat >= sw.lat && sw2.lat <= ne.lat, lngIntersects = ne2.lng >= sw.lng && sw2.lng <= ne.lng;
          return latIntersects && lngIntersects;
        },
        // @method overlaps(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
        overlaps: function(bounds) {
          bounds = toLatLngBounds(bounds);
          var sw = this._southWest, ne = this._northEast, sw2 = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), latOverlaps = ne2.lat > sw.lat && sw2.lat < ne.lat, lngOverlaps = ne2.lng > sw.lng && sw2.lng < ne.lng;
          return latOverlaps && lngOverlaps;
        },
        // @method toBBoxString(): String
        // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
        toBBoxString: function() {
          return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
        },
        // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
        // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(bounds, maxMargin) {
          if (!bounds) {
            return false;
          }
          bounds = toLatLngBounds(bounds);
          return this._southWest.equals(bounds.getSouthWest(), maxMargin) && this._northEast.equals(bounds.getNorthEast(), maxMargin);
        },
        // @method isValid(): Boolean
        // Returns `true` if the bounds are properly initialized.
        isValid: function() {
          return !!(this._southWest && this._northEast);
        }
      };
      function toLatLngBounds(a2, b) {
        if (a2 instanceof LatLngBounds) {
          return a2;
        }
        return new LatLngBounds(a2, b);
      }
      function LatLng(lat, lng, alt) {
        if (isNaN(lat) || isNaN(lng)) {
          throw new Error("Invalid LatLng object: (" + lat + ", " + lng + ")");
        }
        this.lat = +lat;
        this.lng = +lng;
        if (alt !== void 0) {
          this.alt = +alt;
        }
      }
      LatLng.prototype = {
        // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
        // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(obj, maxMargin) {
          if (!obj) {
            return false;
          }
          obj = toLatLng(obj);
          var margin = Math.max(
            Math.abs(this.lat - obj.lat),
            Math.abs(this.lng - obj.lng)
          );
          return margin <= (maxMargin === void 0 ? 1e-9 : maxMargin);
        },
        // @method toString(): String
        // Returns a string representation of the point (for debugging purposes).
        toString: function(precision) {
          return "LatLng(" + formatNum(this.lat, precision) + ", " + formatNum(this.lng, precision) + ")";
        },
        // @method distanceTo(otherLatLng: LatLng): Number
        // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
        distanceTo: function(other) {
          return Earth.distance(this, toLatLng(other));
        },
        // @method wrap(): LatLng
        // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
        wrap: function() {
          return Earth.wrapLatLng(this);
        },
        // @method toBounds(sizeInMeters: Number): LatLngBounds
        // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
        toBounds: function(sizeInMeters) {
          var latAccuracy = 180 * sizeInMeters / 40075017, lngAccuracy = latAccuracy / Math.cos(Math.PI / 180 * this.lat);
          return toLatLngBounds(
            [this.lat - latAccuracy, this.lng - lngAccuracy],
            [this.lat + latAccuracy, this.lng + lngAccuracy]
          );
        },
        clone: function() {
          return new LatLng(this.lat, this.lng, this.alt);
        }
      };
      function toLatLng(a2, b, c2) {
        if (a2 instanceof LatLng) {
          return a2;
        }
        if (isArray(a2) && typeof a2[0] !== "object") {
          if (a2.length === 3) {
            return new LatLng(a2[0], a2[1], a2[2]);
          }
          if (a2.length === 2) {
            return new LatLng(a2[0], a2[1]);
          }
          return null;
        }
        if (a2 === void 0 || a2 === null) {
          return a2;
        }
        if (typeof a2 === "object" && "lat" in a2) {
          return new LatLng(a2.lat, "lng" in a2 ? a2.lng : a2.lon, a2.alt);
        }
        if (b === void 0) {
          return null;
        }
        return new LatLng(a2, b, c2);
      }
      var CRS = {
        // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
        // Projects geographical coordinates into pixel coordinates for a given zoom.
        latLngToPoint: function(latlng, zoom2) {
          var projectedPoint = this.projection.project(latlng), scale2 = this.scale(zoom2);
          return this.transformation._transform(projectedPoint, scale2);
        },
        // @method pointToLatLng(point: Point, zoom: Number): LatLng
        // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
        // zoom into geographical coordinates.
        pointToLatLng: function(point, zoom2) {
          var scale2 = this.scale(zoom2), untransformedPoint = this.transformation.untransform(point, scale2);
          return this.projection.unproject(untransformedPoint);
        },
        // @method project(latlng: LatLng): Point
        // Projects geographical coordinates into coordinates in units accepted for
        // this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
        project: function(latlng) {
          return this.projection.project(latlng);
        },
        // @method unproject(point: Point): LatLng
        // Given a projected coordinate returns the corresponding LatLng.
        // The inverse of `project`.
        unproject: function(point) {
          return this.projection.unproject(point);
        },
        // @method scale(zoom: Number): Number
        // Returns the scale used when transforming projected coordinates into
        // pixel coordinates for a particular zoom. For example, it returns
        // `256 * 2^zoom` for Mercator-based CRS.
        scale: function(zoom2) {
          return 256 * Math.pow(2, zoom2);
        },
        // @method zoom(scale: Number): Number
        // Inverse of `scale()`, returns the zoom level corresponding to a scale
        // factor of `scale`.
        zoom: function(scale2) {
          return Math.log(scale2 / 256) / Math.LN2;
        },
        // @method getProjectedBounds(zoom: Number): Bounds
        // Returns the projection's bounds scaled and transformed for the provided `zoom`.
        getProjectedBounds: function(zoom2) {
          if (this.infinite) {
            return null;
          }
          var b = this.projection.bounds, s = this.scale(zoom2), min2 = this.transformation.transform(b.min, s), max2 = this.transformation.transform(b.max, s);
          return new Bounds(min2, max2);
        },
        // @method distance(latlng1: LatLng, latlng2: LatLng): Number
        // Returns the distance between two geographical coordinates.
        // @property code: String
        // Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
        //
        // @property wrapLng: Number[]
        // An array of two numbers defining whether the longitude (horizontal) coordinate
        // axis wraps around a given range and how. Defaults to `[-180, 180]` in most
        // geographical CRSs. If `undefined`, the longitude axis does not wrap around.
        //
        // @property wrapLat: Number[]
        // Like `wrapLng`, but for the latitude (vertical) axis.
        // wrapLng: [min, max],
        // wrapLat: [min, max],
        // @property infinite: Boolean
        // If true, the coordinate space will be unbounded (infinite in both axes)
        infinite: false,
        // @method wrapLatLng(latlng: LatLng): LatLng
        // Returns a `LatLng` where lat and lng has been wrapped according to the
        // CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
        wrapLatLng: function(latlng) {
          var lng = this.wrapLng ? wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng, lat = this.wrapLat ? wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat, alt = latlng.alt;
          return new LatLng(lat, lng, alt);
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring
        // that its center is within the CRS's bounds.
        // Only accepts actual `L.LatLngBounds` instances, not arrays.
        wrapLatLngBounds: function(bounds) {
          var center = bounds.getCenter(), newCenter = this.wrapLatLng(center), latShift = center.lat - newCenter.lat, lngShift = center.lng - newCenter.lng;
          if (latShift === 0 && lngShift === 0) {
            return bounds;
          }
          var sw = bounds.getSouthWest(), ne = bounds.getNorthEast(), newSw = new LatLng(sw.lat - latShift, sw.lng - lngShift), newNe = new LatLng(ne.lat - latShift, ne.lng - lngShift);
          return new LatLngBounds(newSw, newNe);
        }
      };
      var Earth = extend2({}, CRS, {
        wrapLng: [-180, 180],
        // Mean Earth Radius, as recommended for use by
        // the International Union of Geodesy and Geophysics,
        // see https://rosettacode.org/wiki/Haversine_formula
        R: 6371e3,
        // distance between two geographical points using spherical law of cosines approximation
        distance: function(latlng1, latlng2) {
          var rad = Math.PI / 180, lat1 = latlng1.lat * rad, lat2 = latlng2.lat * rad, sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2), sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2), a2 = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon, c2 = 2 * Math.atan2(Math.sqrt(a2), Math.sqrt(1 - a2));
          return this.R * c2;
        }
      });
      var earthRadius = 6378137;
      var SphericalMercator = {
        R: earthRadius,
        MAX_LATITUDE: 85.0511287798,
        project: function(latlng) {
          var d = Math.PI / 180, max2 = this.MAX_LATITUDE, lat = Math.max(Math.min(max2, latlng.lat), -max2), sin = Math.sin(lat * d);
          return new Point(
            this.R * latlng.lng * d,
            this.R * Math.log((1 + sin) / (1 - sin)) / 2
          );
        },
        unproject: function(point) {
          var d = 180 / Math.PI;
          return new LatLng(
            (2 * Math.atan(Math.exp(point.y / this.R)) - Math.PI / 2) * d,
            point.x * d / this.R
          );
        },
        bounds: function() {
          var d = earthRadius * Math.PI;
          return new Bounds([-d, -d], [d, d]);
        }()
      };
      function Transformation(a2, b, c2, d) {
        if (isArray(a2)) {
          this._a = a2[0];
          this._b = a2[1];
          this._c = a2[2];
          this._d = a2[3];
          return;
        }
        this._a = a2;
        this._b = b;
        this._c = c2;
        this._d = d;
      }
      Transformation.prototype = {
        // @method transform(point: Point, scale?: Number): Point
        // Returns a transformed point, optionally multiplied by the given scale.
        // Only accepts actual `L.Point` instances, not arrays.
        transform: function(point, scale2) {
          return this._transform(point.clone(), scale2);
        },
        // destructive transform (faster)
        _transform: function(point, scale2) {
          scale2 = scale2 || 1;
          point.x = scale2 * (this._a * point.x + this._b);
          point.y = scale2 * (this._c * point.y + this._d);
          return point;
        },
        // @method untransform(point: Point, scale?: Number): Point
        // Returns the reverse transformation of the given point, optionally divided
        // by the given scale. Only accepts actual `L.Point` instances, not arrays.
        untransform: function(point, scale2) {
          scale2 = scale2 || 1;
          return new Point(
            (point.x / scale2 - this._b) / this._a,
            (point.y / scale2 - this._d) / this._c
          );
        }
      };
      function toTransformation(a2, b, c2, d) {
        return new Transformation(a2, b, c2, d);
      }
      var EPSG3857 = extend2({}, Earth, {
        code: "EPSG:3857",
        projection: SphericalMercator,
        transformation: function() {
          var scale2 = 0.5 / (Math.PI * SphericalMercator.R);
          return toTransformation(scale2, 0.5, -scale2, 0.5);
        }()
      });
      var EPSG900913 = extend2({}, EPSG3857, {
        code: "EPSG:900913"
      });
      function svgCreate(name) {
        return document.createElementNS("http://www.w3.org/2000/svg", name);
      }
      function pointsToPath(rings, closed) {
        var str = "", i2, j, len, len2, points, p;
        for (i2 = 0, len = rings.length; i2 < len; i2++) {
          points = rings[i2];
          for (j = 0, len2 = points.length; j < len2; j++) {
            p = points[j];
            str += (j ? "L" : "M") + p.x + " " + p.y;
          }
          str += closed ? Browser.svg ? "z" : "x" : "";
        }
        return str || "M0 0";
      }
      var style = document.documentElement.style;
      var ie = "ActiveXObject" in window;
      var ielt9 = ie && !document.addEventListener;
      var edge = "msLaunchUri" in navigator && !("documentMode" in document);
      var webkit = userAgentContains("webkit");
      var android = userAgentContains("android");
      var android23 = userAgentContains("android 2") || userAgentContains("android 3");
      var webkitVer = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10);
      var androidStock = android && userAgentContains("Google") && webkitVer < 537 && !("AudioNode" in window);
      var opera = !!window.opera;
      var chrome = !edge && userAgentContains("chrome");
      var gecko = userAgentContains("gecko") && !webkit && !opera && !ie;
      var safari = !chrome && userAgentContains("safari");
      var phantom = userAgentContains("phantom");
      var opera12 = "OTransition" in style;
      var win = navigator.platform.indexOf("Win") === 0;
      var ie3d = ie && "transition" in style;
      var webkit3d = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !android23;
      var gecko3d = "MozPerspective" in style;
      var any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantom;
      var mobile = typeof orientation !== "undefined" || userAgentContains("mobile");
      var mobileWebkit = mobile && webkit;
      var mobileWebkit3d = mobile && webkit3d;
      var msPointer = !window.PointerEvent && window.MSPointerEvent;
      var pointer = !!(window.PointerEvent || msPointer);
      var touchNative = "ontouchstart" in window || !!window.TouchEvent;
      var touch = !window.L_NO_TOUCH && (touchNative || pointer);
      var mobileOpera = mobile && opera;
      var mobileGecko = mobile && gecko;
      var retina = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1;
      var passiveEvents = function() {
        var supportsPassiveOption = false;
        try {
          var opts = Object.defineProperty({}, "passive", {
            get: function() {
              supportsPassiveOption = true;
            }
          });
          window.addEventListener("testPassiveEventSupport", falseFn, opts);
          window.removeEventListener("testPassiveEventSupport", falseFn, opts);
        } catch (e) {
        }
        return supportsPassiveOption;
      }();
      var canvas$1 = function() {
        return !!document.createElement("canvas").getContext;
      }();
      var svg$1 = !!(document.createElementNS && svgCreate("svg").createSVGRect);
      var inlineSvg = !!svg$1 && function() {
        var div = document.createElement("div");
        div.innerHTML = "<svg/>";
        return (div.firstChild && div.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
      }();
      var vml = !svg$1 && function() {
        try {
          var div = document.createElement("div");
          div.innerHTML = '<v:shape adj="1"/>';
          var shape = div.firstChild;
          shape.style.behavior = "url(#default#VML)";
          return shape && typeof shape.adj === "object";
        } catch (e) {
          return false;
        }
      }();
      var mac = navigator.platform.indexOf("Mac") === 0;
      var linux = navigator.platform.indexOf("Linux") === 0;
      function userAgentContains(str) {
        return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
      }
      var Browser = {
        ie,
        ielt9,
        edge,
        webkit,
        android,
        android23,
        androidStock,
        opera,
        chrome,
        gecko,
        safari,
        phantom,
        opera12,
        win,
        ie3d,
        webkit3d,
        gecko3d,
        any3d,
        mobile,
        mobileWebkit,
        mobileWebkit3d,
        msPointer,
        pointer,
        touch,
        touchNative,
        mobileOpera,
        mobileGecko,
        retina,
        passiveEvents,
        canvas: canvas$1,
        svg: svg$1,
        vml,
        inlineSvg,
        mac,
        linux
      };
      var POINTER_DOWN = Browser.msPointer ? "MSPointerDown" : "pointerdown";
      var POINTER_MOVE = Browser.msPointer ? "MSPointerMove" : "pointermove";
      var POINTER_UP = Browser.msPointer ? "MSPointerUp" : "pointerup";
      var POINTER_CANCEL = Browser.msPointer ? "MSPointerCancel" : "pointercancel";
      var pEvent = {
        touchstart: POINTER_DOWN,
        touchmove: POINTER_MOVE,
        touchend: POINTER_UP,
        touchcancel: POINTER_CANCEL
      };
      var handle = {
        touchstart: _onPointerStart,
        touchmove: _handlePointer,
        touchend: _handlePointer,
        touchcancel: _handlePointer
      };
      var _pointers = {};
      var _pointerDocListener = false;
      function addPointerListener(obj, type2, handler) {
        if (type2 === "touchstart") {
          _addPointerDocListener();
        }
        if (!handle[type2]) {
          console.warn("wrong event specified:", type2);
          return falseFn;
        }
        handler = handle[type2].bind(this, handler);
        obj.addEventListener(pEvent[type2], handler, false);
        return handler;
      }
      function removePointerListener(obj, type2, handler) {
        if (!pEvent[type2]) {
          console.warn("wrong event specified:", type2);
          return;
        }
        obj.removeEventListener(pEvent[type2], handler, false);
      }
      function _globalPointerDown(e) {
        _pointers[e.pointerId] = e;
      }
      function _globalPointerMove(e) {
        if (_pointers[e.pointerId]) {
          _pointers[e.pointerId] = e;
        }
      }
      function _globalPointerUp(e) {
        delete _pointers[e.pointerId];
      }
      function _addPointerDocListener() {
        if (!_pointerDocListener) {
          document.addEventListener(POINTER_DOWN, _globalPointerDown, true);
          document.addEventListener(POINTER_MOVE, _globalPointerMove, true);
          document.addEventListener(POINTER_UP, _globalPointerUp, true);
          document.addEventListener(POINTER_CANCEL, _globalPointerUp, true);
          _pointerDocListener = true;
        }
      }
      function _handlePointer(handler, e) {
        if (e.pointerType === (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
          return;
        }
        e.touches = [];
        for (var i2 in _pointers) {
          e.touches.push(_pointers[i2]);
        }
        e.changedTouches = [e];
        handler(e);
      }
      function _onPointerStart(handler, e) {
        if (e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH) {
          preventDefault(e);
        }
        _handlePointer(handler, e);
      }
      function makeDblclick(event) {
        var newEvent = {}, prop, i2;
        for (i2 in event) {
          prop = event[i2];
          newEvent[i2] = prop && prop.bind ? prop.bind(event) : prop;
        }
        event = newEvent;
        newEvent.type = "dblclick";
        newEvent.detail = 2;
        newEvent.isTrusted = false;
        newEvent._simulated = true;
        return newEvent;
      }
      var delay = 200;
      function addDoubleTapListener(obj, handler) {
        obj.addEventListener("dblclick", handler);
        var last = 0, detail;
        function simDblclick(e) {
          if (e.detail !== 1) {
            detail = e.detail;
            return;
          }
          if (e.pointerType === "mouse" || e.sourceCapabilities && !e.sourceCapabilities.firesTouchEvents) {
            return;
          }
          var path = getPropagationPath(e);
          if (path.some(function(el) {
            return el instanceof HTMLLabelElement && el.attributes.for;
          }) && !path.some(function(el) {
            return el instanceof HTMLInputElement || el instanceof HTMLSelectElement;
          })) {
            return;
          }
          var now2 = Date.now();
          if (now2 - last <= delay) {
            detail++;
            if (detail === 2) {
              handler(makeDblclick(e));
            }
          } else {
            detail = 1;
          }
          last = now2;
        }
        obj.addEventListener("click", simDblclick);
        return {
          dblclick: handler,
          simDblclick
        };
      }
      function removeDoubleTapListener(obj, handlers) {
        obj.removeEventListener("dblclick", handlers.dblclick);
        obj.removeEventListener("click", handlers.simDblclick);
      }
      var TRANSFORM = testProp(
        ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
      );
      var TRANSITION = testProp(
        ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
      );
      var TRANSITION_END = TRANSITION === "webkitTransition" || TRANSITION === "OTransition" ? TRANSITION + "End" : "transitionend";
      function get3(id2) {
        return typeof id2 === "string" ? document.getElementById(id2) : id2;
      }
      function getStyle(el, style2) {
        var value2 = el.style[style2] || el.currentStyle && el.currentStyle[style2];
        if ((!value2 || value2 === "auto") && document.defaultView) {
          var css = document.defaultView.getComputedStyle(el, null);
          value2 = css ? css[style2] : null;
        }
        return value2 === "auto" ? null : value2;
      }
      function create$1(tagName, className, container) {
        var el = document.createElement(tagName);
        el.className = className || "";
        if (container) {
          container.appendChild(el);
        }
        return el;
      }
      function remove2(el) {
        var parent = el.parentNode;
        if (parent) {
          parent.removeChild(el);
        }
      }
      function empty3(el) {
        while (el.firstChild) {
          el.removeChild(el.firstChild);
        }
      }
      function toFront(el) {
        var parent = el.parentNode;
        if (parent && parent.lastChild !== el) {
          parent.appendChild(el);
        }
      }
      function toBack(el) {
        var parent = el.parentNode;
        if (parent && parent.firstChild !== el) {
          parent.insertBefore(el, parent.firstChild);
        }
      }
      function hasClass(el, name) {
        if (el.classList !== void 0) {
          return el.classList.contains(name);
        }
        var className = getClass(el);
        return className.length > 0 && new RegExp("(^|\\s)" + name + "(\\s|$)").test(className);
      }
      function addClass(el, name) {
        if (el.classList !== void 0) {
          var classes = splitWords(name);
          for (var i2 = 0, len = classes.length; i2 < len; i2++) {
            el.classList.add(classes[i2]);
          }
        } else if (!hasClass(el, name)) {
          var className = getClass(el);
          setClass(el, (className ? className + " " : "") + name);
        }
      }
      function removeClass(el, name) {
        if (el.classList !== void 0) {
          el.classList.remove(name);
        } else {
          setClass(el, trim((" " + getClass(el) + " ").replace(" " + name + " ", " ")));
        }
      }
      function setClass(el, name) {
        if (el.className.baseVal === void 0) {
          el.className = name;
        } else {
          el.className.baseVal = name;
        }
      }
      function getClass(el) {
        if (el.correspondingElement) {
          el = el.correspondingElement;
        }
        return el.className.baseVal === void 0 ? el.className : el.className.baseVal;
      }
      function setOpacity(el, value2) {
        if ("opacity" in el.style) {
          el.style.opacity = value2;
        } else if ("filter" in el.style) {
          _setOpacityIE(el, value2);
        }
      }
      function _setOpacityIE(el, value2) {
        var filter2 = false, filterName = "DXImageTransform.Microsoft.Alpha";
        try {
          filter2 = el.filters.item(filterName);
        } catch (e) {
          if (value2 === 1) {
            return;
          }
        }
        value2 = Math.round(value2 * 100);
        if (filter2) {
          filter2.Enabled = value2 !== 100;
          filter2.Opacity = value2;
        } else {
          el.style.filter += " progid:" + filterName + "(opacity=" + value2 + ")";
        }
      }
      function testProp(props) {
        var style2 = document.documentElement.style;
        for (var i2 = 0; i2 < props.length; i2++) {
          if (props[i2] in style2) {
            return props[i2];
          }
        }
        return false;
      }
      function setTransform(el, offset, scale2) {
        var pos = offset || new Point(0, 0);
        el.style[TRANSFORM] = (Browser.ie3d ? "translate(" + pos.x + "px," + pos.y + "px)" : "translate3d(" + pos.x + "px," + pos.y + "px,0)") + (scale2 ? " scale(" + scale2 + ")" : "");
      }
      function setPosition(el, point) {
        el._leaflet_pos = point;
        if (Browser.any3d) {
          setTransform(el, point);
        } else {
          el.style.left = point.x + "px";
          el.style.top = point.y + "px";
        }
      }
      function getPosition(el) {
        return el._leaflet_pos || new Point(0, 0);
      }
      var disableTextSelection;
      var enableTextSelection;
      var _userSelect;
      if ("onselectstart" in document) {
        disableTextSelection = function() {
          on2(window, "selectstart", preventDefault);
        };
        enableTextSelection = function() {
          off(window, "selectstart", preventDefault);
        };
      } else {
        var userSelectProperty = testProp(
          ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
        );
        disableTextSelection = function() {
          if (userSelectProperty) {
            var style2 = document.documentElement.style;
            _userSelect = style2[userSelectProperty];
            style2[userSelectProperty] = "none";
          }
        };
        enableTextSelection = function() {
          if (userSelectProperty) {
            document.documentElement.style[userSelectProperty] = _userSelect;
            _userSelect = void 0;
          }
        };
      }
      function disableImageDrag() {
        on2(window, "dragstart", preventDefault);
      }
      function enableImageDrag() {
        off(window, "dragstart", preventDefault);
      }
      var _outlineElement, _outlineStyle;
      function preventOutline(element) {
        while (element.tabIndex === -1) {
          element = element.parentNode;
        }
        if (!element.style) {
          return;
        }
        restoreOutline();
        _outlineElement = element;
        _outlineStyle = element.style.outlineStyle;
        element.style.outlineStyle = "none";
        on2(window, "keydown", restoreOutline);
      }
      function restoreOutline() {
        if (!_outlineElement) {
          return;
        }
        _outlineElement.style.outlineStyle = _outlineStyle;
        _outlineElement = void 0;
        _outlineStyle = void 0;
        off(window, "keydown", restoreOutline);
      }
      function getSizedParentNode(element) {
        do {
          element = element.parentNode;
        } while ((!element.offsetWidth || !element.offsetHeight) && element !== document.body);
        return element;
      }
      function getScale(element) {
        var rect = element.getBoundingClientRect();
        return {
          x: rect.width / element.offsetWidth || 1,
          y: rect.height / element.offsetHeight || 1,
          boundingClientRect: rect
        };
      }
      var DomUtil = {
        __proto__: null,
        TRANSFORM,
        TRANSITION,
        TRANSITION_END,
        get: get3,
        getStyle,
        create: create$1,
        remove: remove2,
        empty: empty3,
        toFront,
        toBack,
        hasClass,
        addClass,
        removeClass,
        setClass,
        getClass,
        setOpacity,
        testProp,
        setTransform,
        setPosition,
        getPosition,
        get disableTextSelection() {
          return disableTextSelection;
        },
        get enableTextSelection() {
          return enableTextSelection;
        },
        disableImageDrag,
        enableImageDrag,
        preventOutline,
        restoreOutline,
        getSizedParentNode,
        getScale
      };
      function on2(obj, types, fn, context) {
        if (types && typeof types === "object") {
          for (var type2 in types) {
            addOne(obj, type2, types[type2], fn);
          }
        } else {
          types = splitWords(types);
          for (var i2 = 0, len = types.length; i2 < len; i2++) {
            addOne(obj, types[i2], fn, context);
          }
        }
        return this;
      }
      var eventsKey = "_leaflet_events";
      function off(obj, types, fn, context) {
        if (arguments.length === 1) {
          batchRemove(obj);
          delete obj[eventsKey];
        } else if (types && typeof types === "object") {
          for (var type2 in types) {
            removeOne(obj, type2, types[type2], fn);
          }
        } else {
          types = splitWords(types);
          if (arguments.length === 2) {
            batchRemove(obj, function(type3) {
              return indexOf(types, type3) !== -1;
            });
          } else {
            for (var i2 = 0, len = types.length; i2 < len; i2++) {
              removeOne(obj, types[i2], fn, context);
            }
          }
        }
        return this;
      }
      function batchRemove(obj, filterFn) {
        for (var id2 in obj[eventsKey]) {
          var type2 = id2.split(/\d/)[0];
          if (!filterFn || filterFn(type2)) {
            removeOne(obj, type2, null, null, id2);
          }
        }
      }
      var mouseSubst = {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        wheel: !("onwheel" in window) && "mousewheel"
      };
      function addOne(obj, type2, fn, context) {
        var id2 = type2 + stamp(fn) + (context ? "_" + stamp(context) : "");
        if (obj[eventsKey] && obj[eventsKey][id2]) {
          return this;
        }
        var handler = function(e) {
          return fn.call(context || obj, e || window.event);
        };
        var originalHandler = handler;
        if (!Browser.touchNative && Browser.pointer && type2.indexOf("touch") === 0) {
          handler = addPointerListener(obj, type2, handler);
        } else if (Browser.touch && type2 === "dblclick") {
          handler = addDoubleTapListener(obj, handler);
        } else if ("addEventListener" in obj) {
          if (type2 === "touchstart" || type2 === "touchmove" || type2 === "wheel" || type2 === "mousewheel") {
            obj.addEventListener(mouseSubst[type2] || type2, handler, Browser.passiveEvents ? { passive: false } : false);
          } else if (type2 === "mouseenter" || type2 === "mouseleave") {
            handler = function(e) {
              e = e || window.event;
              if (isExternalTarget(obj, e)) {
                originalHandler(e);
              }
            };
            obj.addEventListener(mouseSubst[type2], handler, false);
          } else {
            obj.addEventListener(type2, originalHandler, false);
          }
        } else {
          obj.attachEvent("on" + type2, handler);
        }
        obj[eventsKey] = obj[eventsKey] || {};
        obj[eventsKey][id2] = handler;
      }
      function removeOne(obj, type2, fn, context, id2) {
        id2 = id2 || type2 + stamp(fn) + (context ? "_" + stamp(context) : "");
        var handler = obj[eventsKey] && obj[eventsKey][id2];
        if (!handler) {
          return this;
        }
        if (!Browser.touchNative && Browser.pointer && type2.indexOf("touch") === 0) {
          removePointerListener(obj, type2, handler);
        } else if (Browser.touch && type2 === "dblclick") {
          removeDoubleTapListener(obj, handler);
        } else if ("removeEventListener" in obj) {
          obj.removeEventListener(mouseSubst[type2] || type2, handler, false);
        } else {
          obj.detachEvent("on" + type2, handler);
        }
        obj[eventsKey][id2] = null;
      }
      function stopPropagation(e) {
        if (e.stopPropagation) {
          e.stopPropagation();
        } else if (e.originalEvent) {
          e.originalEvent._stopped = true;
        } else {
          e.cancelBubble = true;
        }
        return this;
      }
      function disableScrollPropagation(el) {
        addOne(el, "wheel", stopPropagation);
        return this;
      }
      function disableClickPropagation(el) {
        on2(el, "mousedown touchstart dblclick contextmenu", stopPropagation);
        el["_leaflet_disable_click"] = true;
        return this;
      }
      function preventDefault(e) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
        return this;
      }
      function stop(e) {
        preventDefault(e);
        stopPropagation(e);
        return this;
      }
      function getPropagationPath(ev) {
        if (ev.composedPath) {
          return ev.composedPath();
        }
        var path = [];
        var el = ev.target;
        while (el) {
          path.push(el);
          el = el.parentNode;
        }
        return path;
      }
      function getMousePosition(e, container) {
        if (!container) {
          return new Point(e.clientX, e.clientY);
        }
        var scale2 = getScale(container), offset = scale2.boundingClientRect;
        return new Point(
          // offset.left/top values are in page scale (like clientX/Y),
          // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
          (e.clientX - offset.left) / scale2.x - container.clientLeft,
          (e.clientY - offset.top) / scale2.y - container.clientTop
        );
      }
      var wheelPxFactor = Browser.linux && Browser.chrome ? window.devicePixelRatio : Browser.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
      function getWheelDelta(e) {
        return Browser.edge ? e.wheelDeltaY / 2 : (
          // Don't trust window-geometry-based delta
          e.deltaY && e.deltaMode === 0 ? -e.deltaY / wheelPxFactor : (
            // Pixels
            e.deltaY && e.deltaMode === 1 ? -e.deltaY * 20 : (
              // Lines
              e.deltaY && e.deltaMode === 2 ? -e.deltaY * 60 : (
                // Pages
                e.deltaX || e.deltaZ ? 0 : (
                  // Skip horizontal/depth wheel events
                  e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : (
                    // Legacy IE pixels
                    e.detail && Math.abs(e.detail) < 32765 ? -e.detail * 20 : (
                      // Legacy Moz lines
                      e.detail ? e.detail / -32765 * 60 : (
                        // Legacy Moz pages
                        0
                      )
                    )
                  )
                )
              )
            )
          )
        );
      }
      function isExternalTarget(el, e) {
        var related = e.relatedTarget;
        if (!related) {
          return true;
        }
        try {
          while (related && related !== el) {
            related = related.parentNode;
          }
        } catch (err) {
          return false;
        }
        return related !== el;
      }
      var DomEvent = {
        __proto__: null,
        on: on2,
        off,
        stopPropagation,
        disableScrollPropagation,
        disableClickPropagation,
        preventDefault,
        stop,
        getPropagationPath,
        getMousePosition,
        getWheelDelta,
        isExternalTarget,
        addListener: on2,
        removeListener: off
      };
      var PosAnimation = Evented.extend({
        // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
        // Run an animation of a given element to a new position, optionally setting
        // duration in seconds (`0.25` by default) and easing linearity factor (3rd
        // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
        // `0.5` by default).
        run: function(el, newPos, duration, easeLinearity) {
          this.stop();
          this._el = el;
          this._inProgress = true;
          this._duration = duration || 0.25;
          this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);
          this._startPos = getPosition(el);
          this._offset = newPos.subtract(this._startPos);
          this._startTime = +/* @__PURE__ */ new Date();
          this.fire("start");
          this._animate();
        },
        // @method stop()
        // Stops the animation (if currently running).
        stop: function() {
          if (!this._inProgress) {
            return;
          }
          this._step(true);
          this._complete();
        },
        _animate: function() {
          this._animId = requestAnimFrame(this._animate, this);
          this._step();
        },
        _step: function(round) {
          var elapsed = +/* @__PURE__ */ new Date() - this._startTime, duration = this._duration * 1e3;
          if (elapsed < duration) {
            this._runFrame(this._easeOut(elapsed / duration), round);
          } else {
            this._runFrame(1);
            this._complete();
          }
        },
        _runFrame: function(progress, round) {
          var pos = this._startPos.add(this._offset.multiplyBy(progress));
          if (round) {
            pos._round();
          }
          setPosition(this._el, pos);
          this.fire("step");
        },
        _complete: function() {
          cancelAnimFrame(this._animId);
          this._inProgress = false;
          this.fire("end");
        },
        _easeOut: function(t) {
          return 1 - Math.pow(1 - t, this._easeOutPower);
        }
      });
      var Map2 = Evented.extend({
        options: {
          // @section Map State Options
          // @option crs: CRS = L.CRS.EPSG3857
          // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
          // sure what it means.
          crs: EPSG3857,
          // @option center: LatLng = undefined
          // Initial geographic center of the map
          center: void 0,
          // @option zoom: Number = undefined
          // Initial map zoom level
          zoom: void 0,
          // @option minZoom: Number = *
          // Minimum zoom level of the map.
          // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
          // the lowest of their `minZoom` options will be used instead.
          minZoom: void 0,
          // @option maxZoom: Number = *
          // Maximum zoom level of the map.
          // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
          // the highest of their `maxZoom` options will be used instead.
          maxZoom: void 0,
          // @option layers: Layer[] = []
          // Array of layers that will be added to the map initially
          layers: [],
          // @option maxBounds: LatLngBounds = null
          // When this option is set, the map restricts the view to the given
          // geographical bounds, bouncing the user back if the user tries to pan
          // outside the view. To set the restriction dynamically, use
          // [`setMaxBounds`](#map-setmaxbounds) method.
          maxBounds: void 0,
          // @option renderer: Renderer = *
          // The default method for drawing vector layers on the map. `L.SVG`
          // or `L.Canvas` by default depending on browser support.
          renderer: void 0,
          // @section Animation Options
          // @option zoomAnimation: Boolean = true
          // Whether the map zoom animation is enabled. By default it's enabled
          // in all browsers that support CSS3 Transitions except Android.
          zoomAnimation: true,
          // @option zoomAnimationThreshold: Number = 4
          // Won't animate zoom if the zoom difference exceeds this value.
          zoomAnimationThreshold: 4,
          // @option fadeAnimation: Boolean = true
          // Whether the tile fade animation is enabled. By default it's enabled
          // in all browsers that support CSS3 Transitions except Android.
          fadeAnimation: true,
          // @option markerZoomAnimation: Boolean = true
          // Whether markers animate their zoom with the zoom animation, if disabled
          // they will disappear for the length of the animation. By default it's
          // enabled in all browsers that support CSS3 Transitions except Android.
          markerZoomAnimation: true,
          // @option transform3DLimit: Number = 2^23
          // Defines the maximum size of a CSS translation transform. The default
          // value should not be changed unless a web browser positions layers in
          // the wrong place after doing a large `panBy`.
          transform3DLimit: 8388608,
          // Precision limit of a 32-bit float
          // @section Interaction Options
          // @option zoomSnap: Number = 1
          // Forces the map's zoom level to always be a multiple of this, particularly
          // right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
          // By default, the zoom level snaps to the nearest integer; lower values
          // (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
          // means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
          zoomSnap: 1,
          // @option zoomDelta: Number = 1
          // Controls how much the map's zoom level will change after a
          // [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
          // or `-` on the keyboard, or using the [zoom controls](#control-zoom).
          // Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
          zoomDelta: 1,
          // @option trackResize: Boolean = true
          // Whether the map automatically handles browser window resize to update itself.
          trackResize: true
        },
        initialize: function(id2, options) {
          options = setOptions(this, options);
          this._handlers = [];
          this._layers = {};
          this._zoomBoundLayers = {};
          this._sizeChanged = true;
          this._initContainer(id2);
          this._initLayout();
          this._onResize = bind(this._onResize, this);
          this._initEvents();
          if (options.maxBounds) {
            this.setMaxBounds(options.maxBounds);
          }
          if (options.zoom !== void 0) {
            this._zoom = this._limitZoom(options.zoom);
          }
          if (options.center && options.zoom !== void 0) {
            this.setView(toLatLng(options.center), options.zoom, { reset: true });
          }
          this.callInitHooks();
          this._zoomAnimated = TRANSITION && Browser.any3d && !Browser.mobileOpera && this.options.zoomAnimation;
          if (this._zoomAnimated) {
            this._createAnimProxy();
            on2(this._proxy, TRANSITION_END, this._catchTransitionEnd, this);
          }
          this._addLayers(this.options.layers);
        },
        // @section Methods for modifying map state
        // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
        // Sets the view of the map (geographical center and zoom) with the given
        // animation options.
        setView: function(center, zoom2, options) {
          zoom2 = zoom2 === void 0 ? this._zoom : this._limitZoom(zoom2);
          center = this._limitCenter(toLatLng(center), zoom2, this.options.maxBounds);
          options = options || {};
          this._stop();
          if (this._loaded && !options.reset && options !== true) {
            if (options.animate !== void 0) {
              options.zoom = extend2({ animate: options.animate }, options.zoom);
              options.pan = extend2({ animate: options.animate, duration: options.duration }, options.pan);
            }
            var moved = this._zoom !== zoom2 ? this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom2, options.zoom) : this._tryAnimatedPan(center, options.pan);
            if (moved) {
              clearTimeout(this._sizeTimer);
              return this;
            }
          }
          this._resetView(center, zoom2, options.pan && options.pan.noMoveStart);
          return this;
        },
        // @method setZoom(zoom: Number, options?: Zoom/pan options): this
        // Sets the zoom of the map.
        setZoom: function(zoom2, options) {
          if (!this._loaded) {
            this._zoom = zoom2;
            return this;
          }
          return this.setView(this.getCenter(), zoom2, { zoom: options });
        },
        // @method zoomIn(delta?: Number, options?: Zoom options): this
        // Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
        zoomIn: function(delta, options) {
          delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
          return this.setZoom(this._zoom + delta, options);
        },
        // @method zoomOut(delta?: Number, options?: Zoom options): this
        // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
        zoomOut: function(delta, options) {
          delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
          return this.setZoom(this._zoom - delta, options);
        },
        // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
        // Zooms the map while keeping a specified geographical point on the map
        // stationary (e.g. used internally for scroll zoom and double-click zoom).
        // @alternative
        // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
        // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
        setZoomAround: function(latlng, zoom2, options) {
          var scale2 = this.getZoomScale(zoom2), viewHalf = this.getSize().divideBy(2), containerPoint = latlng instanceof Point ? latlng : this.latLngToContainerPoint(latlng), centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale2), newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));
          return this.setView(newCenter, zoom2, { zoom: options });
        },
        _getBoundsCenterZoom: function(bounds, options) {
          options = options || {};
          bounds = bounds.getBounds ? bounds.getBounds() : toLatLngBounds(bounds);
          var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]), paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]), zoom2 = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));
          zoom2 = typeof options.maxZoom === "number" ? Math.min(options.maxZoom, zoom2) : zoom2;
          if (zoom2 === Infinity) {
            return {
              center: bounds.getCenter(),
              zoom: zoom2
            };
          }
          var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2), swPoint = this.project(bounds.getSouthWest(), zoom2), nePoint = this.project(bounds.getNorthEast(), zoom2), center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom2);
          return {
            center,
            zoom: zoom2
          };
        },
        // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
        // Sets a map view that contains the given geographical bounds with the
        // maximum zoom level possible.
        fitBounds: function(bounds, options) {
          bounds = toLatLngBounds(bounds);
          if (!bounds.isValid()) {
            throw new Error("Bounds are not valid.");
          }
          var target = this._getBoundsCenterZoom(bounds, options);
          return this.setView(target.center, target.zoom, options);
        },
        // @method fitWorld(options?: fitBounds options): this
        // Sets a map view that mostly contains the whole world with the maximum
        // zoom level possible.
        fitWorld: function(options) {
          return this.fitBounds([[-90, -180], [90, 180]], options);
        },
        // @method panTo(latlng: LatLng, options?: Pan options): this
        // Pans the map to a given center.
        panTo: function(center, options) {
          return this.setView(center, this._zoom, { pan: options });
        },
        // @method panBy(offset: Point, options?: Pan options): this
        // Pans the map by a given number of pixels (animated).
        panBy: function(offset, options) {
          offset = toPoint(offset).round();
          options = options || {};
          if (!offset.x && !offset.y) {
            return this.fire("moveend");
          }
          if (options.animate !== true && !this.getSize().contains(offset)) {
            this._resetView(this.unproject(this.project(this.getCenter()).add(offset)), this.getZoom());
            return this;
          }
          if (!this._panAnim) {
            this._panAnim = new PosAnimation();
            this._panAnim.on({
              "step": this._onPanTransitionStep,
              "end": this._onPanTransitionEnd
            }, this);
          }
          if (!options.noMoveStart) {
            this.fire("movestart");
          }
          if (options.animate !== false) {
            addClass(this._mapPane, "leaflet-pan-anim");
            var newPos = this._getMapPanePos().subtract(offset).round();
            this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
          } else {
            this._rawPanBy(offset);
            this.fire("move").fire("moveend");
          }
          return this;
        },
        // @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
        // Sets the view of the map (geographical center and zoom) performing a smooth
        // pan-zoom animation.
        flyTo: function(targetCenter, targetZoom, options) {
          options = options || {};
          if (options.animate === false || !Browser.any3d) {
            return this.setView(targetCenter, targetZoom, options);
          }
          this._stop();
          var from = this.project(this.getCenter()), to = this.project(targetCenter), size = this.getSize(), startZoom = this._zoom;
          targetCenter = toLatLng(targetCenter);
          targetZoom = targetZoom === void 0 ? startZoom : targetZoom;
          var w0 = Math.max(size.x, size.y), w1 = w0 * this.getZoomScale(startZoom, targetZoom), u1 = to.distanceTo(from) || 1, rho = 1.42, rho2 = rho * rho;
          function r(i2) {
            var s1 = i2 ? -1 : 1, s2 = i2 ? w1 : w0, t1 = w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1, b1 = 2 * s2 * rho2 * u1, b = t1 / b1, sq = Math.sqrt(b * b + 1) - b;
            var log = sq < 1e-9 ? -18 : Math.log(sq);
            return log;
          }
          function sinh2(n) {
            return (Math.exp(n) - Math.exp(-n)) / 2;
          }
          function cosh2(n) {
            return (Math.exp(n) + Math.exp(-n)) / 2;
          }
          function tanh2(n) {
            return sinh2(n) / cosh2(n);
          }
          var r0 = r(0);
          function w(s) {
            return w0 * (cosh2(r0) / cosh2(r0 + rho * s));
          }
          function u(s) {
            return w0 * (cosh2(r0) * tanh2(r0 + rho * s) - sinh2(r0)) / rho2;
          }
          function easeOut(t) {
            return 1 - Math.pow(1 - t, 1.5);
          }
          var start2 = Date.now(), S = (r(1) - r0) / rho, duration = options.duration ? 1e3 * options.duration : 1e3 * S * 0.8;
          function frame2() {
            var t = (Date.now() - start2) / duration, s = easeOut(t) * S;
            if (t <= 1) {
              this._flyToFrame = requestAnimFrame(frame2, this);
              this._move(
                this.unproject(from.add(to.subtract(from).multiplyBy(u(s) / u1)), startZoom),
                this.getScaleZoom(w0 / w(s), startZoom),
                { flyTo: true }
              );
            } else {
              this._move(targetCenter, targetZoom)._moveEnd(true);
            }
          }
          this._moveStart(true, options.noMoveStart);
          frame2.call(this);
          return this;
        },
        // @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
        // Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
        // but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
        flyToBounds: function(bounds, options) {
          var target = this._getBoundsCenterZoom(bounds, options);
          return this.flyTo(target.center, target.zoom, options);
        },
        // @method setMaxBounds(bounds: LatLngBounds): this
        // Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
        setMaxBounds: function(bounds) {
          bounds = toLatLngBounds(bounds);
          if (this.listens("moveend", this._panInsideMaxBounds)) {
            this.off("moveend", this._panInsideMaxBounds);
          }
          if (!bounds.isValid()) {
            this.options.maxBounds = null;
            return this;
          }
          this.options.maxBounds = bounds;
          if (this._loaded) {
            this._panInsideMaxBounds();
          }
          return this.on("moveend", this._panInsideMaxBounds);
        },
        // @method setMinZoom(zoom: Number): this
        // Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
        setMinZoom: function(zoom2) {
          var oldZoom = this.options.minZoom;
          this.options.minZoom = zoom2;
          if (this._loaded && oldZoom !== zoom2) {
            this.fire("zoomlevelschange");
            if (this.getZoom() < this.options.minZoom) {
              return this.setZoom(zoom2);
            }
          }
          return this;
        },
        // @method setMaxZoom(zoom: Number): this
        // Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
        setMaxZoom: function(zoom2) {
          var oldZoom = this.options.maxZoom;
          this.options.maxZoom = zoom2;
          if (this._loaded && oldZoom !== zoom2) {
            this.fire("zoomlevelschange");
            if (this.getZoom() > this.options.maxZoom) {
              return this.setZoom(zoom2);
            }
          }
          return this;
        },
        // @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
        // Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
        panInsideBounds: function(bounds, options) {
          this._enforcingBounds = true;
          var center = this.getCenter(), newCenter = this._limitCenter(center, this._zoom, toLatLngBounds(bounds));
          if (!center.equals(newCenter)) {
            this.panTo(newCenter, options);
          }
          this._enforcingBounds = false;
          return this;
        },
        // @method panInside(latlng: LatLng, options?: padding options): this
        // Pans the map the minimum amount to make the `latlng` visible. Use
        // padding options to fit the display to more restricted bounds.
        // If `latlng` is already within the (optionally padded) display bounds,
        // the map will not be panned.
        panInside: function(latlng, options) {
          options = options || {};
          var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]), paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]), pixelCenter = this.project(this.getCenter()), pixelPoint = this.project(latlng), pixelBounds = this.getPixelBounds(), paddedBounds = toBounds([pixelBounds.min.add(paddingTL), pixelBounds.max.subtract(paddingBR)]), paddedSize = paddedBounds.getSize();
          if (!paddedBounds.contains(pixelPoint)) {
            this._enforcingBounds = true;
            var centerOffset = pixelPoint.subtract(paddedBounds.getCenter());
            var offset = paddedBounds.extend(pixelPoint).getSize().subtract(paddedSize);
            pixelCenter.x += centerOffset.x < 0 ? -offset.x : offset.x;
            pixelCenter.y += centerOffset.y < 0 ? -offset.y : offset.y;
            this.panTo(this.unproject(pixelCenter), options);
            this._enforcingBounds = false;
          }
          return this;
        },
        // @method invalidateSize(options: Zoom/pan options): this
        // Checks if the map container size changed and updates the map if so —
        // call it after you've changed the map size dynamically, also animating
        // pan by default. If `options.pan` is `false`, panning will not occur.
        // If `options.debounceMoveend` is `true`, it will delay `moveend` event so
        // that it doesn't happen often even if the method is called many
        // times in a row.
        // @alternative
        // @method invalidateSize(animate: Boolean): this
        // Checks if the map container size changed and updates the map if so —
        // call it after you've changed the map size dynamically, also animating
        // pan by default.
        invalidateSize: function(options) {
          if (!this._loaded) {
            return this;
          }
          options = extend2({
            animate: false,
            pan: true
          }, options === true ? { animate: true } : options);
          var oldSize = this.getSize();
          this._sizeChanged = true;
          this._lastCenter = null;
          var newSize = this.getSize(), oldCenter = oldSize.divideBy(2).round(), newCenter = newSize.divideBy(2).round(), offset = oldCenter.subtract(newCenter);
          if (!offset.x && !offset.y) {
            return this;
          }
          if (options.animate && options.pan) {
            this.panBy(offset);
          } else {
            if (options.pan) {
              this._rawPanBy(offset);
            }
            this.fire("move");
            if (options.debounceMoveend) {
              clearTimeout(this._sizeTimer);
              this._sizeTimer = setTimeout(bind(this.fire, this, "moveend"), 200);
            } else {
              this.fire("moveend");
            }
          }
          return this.fire("resize", {
            oldSize,
            newSize
          });
        },
        // @section Methods for modifying map state
        // @method stop(): this
        // Stops the currently running `panTo` or `flyTo` animation, if any.
        stop: function() {
          this.setZoom(this._limitZoom(this._zoom));
          if (!this.options.zoomSnap) {
            this.fire("viewreset");
          }
          return this._stop();
        },
        // @section Geolocation methods
        // @method locate(options?: Locate options): this
        // Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
        // event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
        // and optionally sets the map view to the user's location with respect to
        // detection accuracy (or to the world view if geolocation failed).
        // Note that, if your page doesn't use HTTPS, this method will fail in
        // modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
        // See `Locate options` for more details.
        locate: function(options) {
          options = this._locateOptions = extend2({
            timeout: 1e4,
            watch: false
            // setView: false
            // maxZoom: <Number>
            // maximumAge: 0
            // enableHighAccuracy: false
          }, options);
          if (!("geolocation" in navigator)) {
            this._handleGeolocationError({
              code: 0,
              message: "Geolocation not supported."
            });
            return this;
          }
          var onResponse = bind(this._handleGeolocationResponse, this), onError = bind(this._handleGeolocationError, this);
          if (options.watch) {
            this._locationWatchId = navigator.geolocation.watchPosition(onResponse, onError, options);
          } else {
            navigator.geolocation.getCurrentPosition(onResponse, onError, options);
          }
          return this;
        },
        // @method stopLocate(): this
        // Stops watching location previously initiated by `map.locate({watch: true})`
        // and aborts resetting the map view if map.locate was called with
        // `{setView: true}`.
        stopLocate: function() {
          if (navigator.geolocation && navigator.geolocation.clearWatch) {
            navigator.geolocation.clearWatch(this._locationWatchId);
          }
          if (this._locateOptions) {
            this._locateOptions.setView = false;
          }
          return this;
        },
        _handleGeolocationError: function(error) {
          if (!this._container._leaflet_id) {
            return;
          }
          var c2 = error.code, message = error.message || (c2 === 1 ? "permission denied" : c2 === 2 ? "position unavailable" : "timeout");
          if (this._locateOptions.setView && !this._loaded) {
            this.fitWorld();
          }
          this.fire("locationerror", {
            code: c2,
            message: "Geolocation error: " + message + "."
          });
        },
        _handleGeolocationResponse: function(pos) {
          if (!this._container._leaflet_id) {
            return;
          }
          var lat = pos.coords.latitude, lng = pos.coords.longitude, latlng = new LatLng(lat, lng), bounds = latlng.toBounds(pos.coords.accuracy * 2), options = this._locateOptions;
          if (options.setView) {
            var zoom2 = this.getBoundsZoom(bounds);
            this.setView(latlng, options.maxZoom ? Math.min(zoom2, options.maxZoom) : zoom2);
          }
          var data = {
            latlng,
            bounds,
            timestamp: pos.timestamp
          };
          for (var i2 in pos.coords) {
            if (typeof pos.coords[i2] === "number") {
              data[i2] = pos.coords[i2];
            }
          }
          this.fire("locationfound", data);
        },
        // TODO Appropriate docs section?
        // @section Other Methods
        // @method addHandler(name: String, HandlerClass: Function): this
        // Adds a new `Handler` to the map, given its name and constructor function.
        addHandler: function(name, HandlerClass) {
          if (!HandlerClass) {
            return this;
          }
          var handler = this[name] = new HandlerClass(this);
          this._handlers.push(handler);
          if (this.options[name]) {
            handler.enable();
          }
          return this;
        },
        // @method remove(): this
        // Destroys the map and clears all related event listeners.
        remove: function() {
          this._initEvents(true);
          if (this.options.maxBounds) {
            this.off("moveend", this._panInsideMaxBounds);
          }
          if (this._containerId !== this._container._leaflet_id) {
            throw new Error("Map container is being reused by another instance");
          }
          try {
            delete this._container._leaflet_id;
            delete this._containerId;
          } catch (e) {
            this._container._leaflet_id = void 0;
            this._containerId = void 0;
          }
          if (this._locationWatchId !== void 0) {
            this.stopLocate();
          }
          this._stop();
          remove2(this._mapPane);
          if (this._clearControlPos) {
            this._clearControlPos();
          }
          if (this._resizeRequest) {
            cancelAnimFrame(this._resizeRequest);
            this._resizeRequest = null;
          }
          this._clearHandlers();
          if (this._loaded) {
            this.fire("unload");
          }
          var i2;
          for (i2 in this._layers) {
            this._layers[i2].remove();
          }
          for (i2 in this._panes) {
            remove2(this._panes[i2]);
          }
          this._layers = [];
          this._panes = [];
          delete this._mapPane;
          delete this._renderer;
          return this;
        },
        // @section Other Methods
        // @method createPane(name: String, container?: HTMLElement): HTMLElement
        // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
        // then returns it. The pane is created as a child of `container`, or
        // as a child of the main map pane if not set.
        createPane: function(name, container) {
          var className = "leaflet-pane" + (name ? " leaflet-" + name.replace("Pane", "") + "-pane" : ""), pane = create$1("div", className, container || this._mapPane);
          if (name) {
            this._panes[name] = pane;
          }
          return pane;
        },
        // @section Methods for Getting Map State
        // @method getCenter(): LatLng
        // Returns the geographical center of the map view
        getCenter: function() {
          this._checkIfLoaded();
          if (this._lastCenter && !this._moved()) {
            return this._lastCenter.clone();
          }
          return this.layerPointToLatLng(this._getCenterLayerPoint());
        },
        // @method getZoom(): Number
        // Returns the current zoom level of the map view
        getZoom: function() {
          return this._zoom;
        },
        // @method getBounds(): LatLngBounds
        // Returns the geographical bounds visible in the current map view
        getBounds: function() {
          var bounds = this.getPixelBounds(), sw = this.unproject(bounds.getBottomLeft()), ne = this.unproject(bounds.getTopRight());
          return new LatLngBounds(sw, ne);
        },
        // @method getMinZoom(): Number
        // Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
        getMinZoom: function() {
          return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
        },
        // @method getMaxZoom(): Number
        // Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
        getMaxZoom: function() {
          return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? Infinity : this._layersMaxZoom : this.options.maxZoom;
        },
        // @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
        // Returns the maximum zoom level on which the given bounds fit to the map
        // view in its entirety. If `inside` (optional) is set to `true`, the method
        // instead returns the minimum zoom level on which the map view fits into
        // the given bounds in its entirety.
        getBoundsZoom: function(bounds, inside, padding) {
          bounds = toLatLngBounds(bounds);
          padding = toPoint(padding || [0, 0]);
          var zoom2 = this.getZoom() || 0, min2 = this.getMinZoom(), max2 = this.getMaxZoom(), nw = bounds.getNorthWest(), se = bounds.getSouthEast(), size = this.getSize().subtract(padding), boundsSize = toBounds(this.project(se, zoom2), this.project(nw, zoom2)).getSize(), snap = Browser.any3d ? this.options.zoomSnap : 1, scalex = size.x / boundsSize.x, scaley = size.y / boundsSize.y, scale2 = inside ? Math.max(scalex, scaley) : Math.min(scalex, scaley);
          zoom2 = this.getScaleZoom(scale2, zoom2);
          if (snap) {
            zoom2 = Math.round(zoom2 / (snap / 100)) * (snap / 100);
            zoom2 = inside ? Math.ceil(zoom2 / snap) * snap : Math.floor(zoom2 / snap) * snap;
          }
          return Math.max(min2, Math.min(max2, zoom2));
        },
        // @method getSize(): Point
        // Returns the current size of the map container (in pixels).
        getSize: function() {
          if (!this._size || this._sizeChanged) {
            this._size = new Point(
              this._container.clientWidth || 0,
              this._container.clientHeight || 0
            );
            this._sizeChanged = false;
          }
          return this._size.clone();
        },
        // @method getPixelBounds(): Bounds
        // Returns the bounds of the current map view in projected pixel
        // coordinates (sometimes useful in layer and overlay implementations).
        getPixelBounds: function(center, zoom2) {
          var topLeftPoint = this._getTopLeftPoint(center, zoom2);
          return new Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
        },
        // TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
        // the map pane? "left point of the map layer" can be confusing, specially
        // since there can be negative offsets.
        // @method getPixelOrigin(): Point
        // Returns the projected pixel coordinates of the top left point of
        // the map layer (useful in custom layer and overlay implementations).
        getPixelOrigin: function() {
          this._checkIfLoaded();
          return this._pixelOrigin;
        },
        // @method getPixelWorldBounds(zoom?: Number): Bounds
        // Returns the world's bounds in pixel coordinates for zoom level `zoom`.
        // If `zoom` is omitted, the map's current zoom level is used.
        getPixelWorldBounds: function(zoom2) {
          return this.options.crs.getProjectedBounds(zoom2 === void 0 ? this.getZoom() : zoom2);
        },
        // @section Other Methods
        // @method getPane(pane: String|HTMLElement): HTMLElement
        // Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
        getPane: function(pane) {
          return typeof pane === "string" ? this._panes[pane] : pane;
        },
        // @method getPanes(): Object
        // Returns a plain object containing the names of all [panes](#map-pane) as keys and
        // the panes as values.
        getPanes: function() {
          return this._panes;
        },
        // @method getContainer: HTMLElement
        // Returns the HTML element that contains the map.
        getContainer: function() {
          return this._container;
        },
        // @section Conversion Methods
        // @method getZoomScale(toZoom: Number, fromZoom: Number): Number
        // Returns the scale factor to be applied to a map transition from zoom level
        // `fromZoom` to `toZoom`. Used internally to help with zoom animations.
        getZoomScale: function(toZoom, fromZoom) {
          var crs = this.options.crs;
          fromZoom = fromZoom === void 0 ? this._zoom : fromZoom;
          return crs.scale(toZoom) / crs.scale(fromZoom);
        },
        // @method getScaleZoom(scale: Number, fromZoom: Number): Number
        // Returns the zoom level that the map would end up at, if it is at `fromZoom`
        // level and everything is scaled by a factor of `scale`. Inverse of
        // [`getZoomScale`](#map-getZoomScale).
        getScaleZoom: function(scale2, fromZoom) {
          var crs = this.options.crs;
          fromZoom = fromZoom === void 0 ? this._zoom : fromZoom;
          var zoom2 = crs.zoom(scale2 * crs.scale(fromZoom));
          return isNaN(zoom2) ? Infinity : zoom2;
        },
        // @method project(latlng: LatLng, zoom: Number): Point
        // Projects a geographical coordinate `LatLng` according to the projection
        // of the map's CRS, then scales it according to `zoom` and the CRS's
        // `Transformation`. The result is pixel coordinate relative to
        // the CRS origin.
        project: function(latlng, zoom2) {
          zoom2 = zoom2 === void 0 ? this._zoom : zoom2;
          return this.options.crs.latLngToPoint(toLatLng(latlng), zoom2);
        },
        // @method unproject(point: Point, zoom: Number): LatLng
        // Inverse of [`project`](#map-project).
        unproject: function(point, zoom2) {
          zoom2 = zoom2 === void 0 ? this._zoom : zoom2;
          return this.options.crs.pointToLatLng(toPoint(point), zoom2);
        },
        // @method layerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding geographical coordinate (for the current zoom level).
        layerPointToLatLng: function(point) {
          var projectedPoint = toPoint(point).add(this.getPixelOrigin());
          return this.unproject(projectedPoint);
        },
        // @method latLngToLayerPoint(latlng: LatLng): Point
        // Given a geographical coordinate, returns the corresponding pixel coordinate
        // relative to the [origin pixel](#map-getpixelorigin).
        latLngToLayerPoint: function(latlng) {
          var projectedPoint = this.project(toLatLng(latlng))._round();
          return projectedPoint._subtract(this.getPixelOrigin());
        },
        // @method wrapLatLng(latlng: LatLng): LatLng
        // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
        // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
        // CRS's bounds.
        // By default this means longitude is wrapped around the dateline so its
        // value is between -180 and +180 degrees.
        wrapLatLng: function(latlng) {
          return this.options.crs.wrapLatLng(toLatLng(latlng));
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring that
        // its center is within the CRS's bounds.
        // By default this means the center longitude is wrapped around the dateline so its
        // value is between -180 and +180 degrees, and the majority of the bounds
        // overlaps the CRS's bounds.
        wrapLatLngBounds: function(latlng) {
          return this.options.crs.wrapLatLngBounds(toLatLngBounds(latlng));
        },
        // @method distance(latlng1: LatLng, latlng2: LatLng): Number
        // Returns the distance between two geographical coordinates according to
        // the map's CRS. By default this measures distance in meters.
        distance: function(latlng1, latlng2) {
          return this.options.crs.distance(toLatLng(latlng1), toLatLng(latlng2));
        },
        // @method containerPointToLayerPoint(point: Point): Point
        // Given a pixel coordinate relative to the map container, returns the corresponding
        // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
        containerPointToLayerPoint: function(point) {
          return toPoint(point).subtract(this._getMapPanePos());
        },
        // @method layerPointToContainerPoint(point: Point): Point
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding pixel coordinate relative to the map container.
        layerPointToContainerPoint: function(point) {
          return toPoint(point).add(this._getMapPanePos());
        },
        // @method containerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the map container, returns
        // the corresponding geographical coordinate (for the current zoom level).
        containerPointToLatLng: function(point) {
          var layerPoint = this.containerPointToLayerPoint(toPoint(point));
          return this.layerPointToLatLng(layerPoint);
        },
        // @method latLngToContainerPoint(latlng: LatLng): Point
        // Given a geographical coordinate, returns the corresponding pixel coordinate
        // relative to the map container.
        latLngToContainerPoint: function(latlng) {
          return this.layerPointToContainerPoint(this.latLngToLayerPoint(toLatLng(latlng)));
        },
        // @method mouseEventToContainerPoint(ev: MouseEvent): Point
        // Given a MouseEvent object, returns the pixel coordinate relative to the
        // map container where the event took place.
        mouseEventToContainerPoint: function(e) {
          return getMousePosition(e, this._container);
        },
        // @method mouseEventToLayerPoint(ev: MouseEvent): Point
        // Given a MouseEvent object, returns the pixel coordinate relative to
        // the [origin pixel](#map-getpixelorigin) where the event took place.
        mouseEventToLayerPoint: function(e) {
          return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
        },
        // @method mouseEventToLatLng(ev: MouseEvent): LatLng
        // Given a MouseEvent object, returns geographical coordinate where the
        // event took place.
        mouseEventToLatLng: function(e) {
          return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
        },
        // map initialization methods
        _initContainer: function(id2) {
          var container = this._container = get3(id2);
          if (!container) {
            throw new Error("Map container not found.");
          } else if (container._leaflet_id) {
            throw new Error("Map container is already initialized.");
          }
          on2(container, "scroll", this._onScroll, this);
          this._containerId = stamp(container);
        },
        _initLayout: function() {
          var container = this._container;
          this._fadeAnimated = this.options.fadeAnimation && Browser.any3d;
          addClass(container, "leaflet-container" + (Browser.touch ? " leaflet-touch" : "") + (Browser.retina ? " leaflet-retina" : "") + (Browser.ielt9 ? " leaflet-oldie" : "") + (Browser.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
          var position = getStyle(container, "position");
          if (position !== "absolute" && position !== "relative" && position !== "fixed" && position !== "sticky") {
            container.style.position = "relative";
          }
          this._initPanes();
          if (this._initControlPos) {
            this._initControlPos();
          }
        },
        _initPanes: function() {
          var panes = this._panes = {};
          this._paneRenderers = {};
          this._mapPane = this.createPane("mapPane", this._container);
          setPosition(this._mapPane, new Point(0, 0));
          this.createPane("tilePane");
          this.createPane("overlayPane");
          this.createPane("shadowPane");
          this.createPane("markerPane");
          this.createPane("tooltipPane");
          this.createPane("popupPane");
          if (!this.options.markerZoomAnimation) {
            addClass(panes.markerPane, "leaflet-zoom-hide");
            addClass(panes.shadowPane, "leaflet-zoom-hide");
          }
        },
        // private methods that modify map state
        // @section Map state change events
        _resetView: function(center, zoom2, noMoveStart) {
          setPosition(this._mapPane, new Point(0, 0));
          var loading = !this._loaded;
          this._loaded = true;
          zoom2 = this._limitZoom(zoom2);
          this.fire("viewprereset");
          var zoomChanged = this._zoom !== zoom2;
          this._moveStart(zoomChanged, noMoveStart)._move(center, zoom2)._moveEnd(zoomChanged);
          this.fire("viewreset");
          if (loading) {
            this.fire("load");
          }
        },
        _moveStart: function(zoomChanged, noMoveStart) {
          if (zoomChanged) {
            this.fire("zoomstart");
          }
          if (!noMoveStart) {
            this.fire("movestart");
          }
          return this;
        },
        _move: function(center, zoom2, data, supressEvent) {
          if (zoom2 === void 0) {
            zoom2 = this._zoom;
          }
          var zoomChanged = this._zoom !== zoom2;
          this._zoom = zoom2;
          this._lastCenter = center;
          this._pixelOrigin = this._getNewPixelOrigin(center);
          if (!supressEvent) {
            if (zoomChanged || data && data.pinch) {
              this.fire("zoom", data);
            }
            this.fire("move", data);
          } else if (data && data.pinch) {
            this.fire("zoom", data);
          }
          return this;
        },
        _moveEnd: function(zoomChanged) {
          if (zoomChanged) {
            this.fire("zoomend");
          }
          return this.fire("moveend");
        },
        _stop: function() {
          cancelAnimFrame(this._flyToFrame);
          if (this._panAnim) {
            this._panAnim.stop();
          }
          return this;
        },
        _rawPanBy: function(offset) {
          setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
        },
        _getZoomSpan: function() {
          return this.getMaxZoom() - this.getMinZoom();
        },
        _panInsideMaxBounds: function() {
          if (!this._enforcingBounds) {
            this.panInsideBounds(this.options.maxBounds);
          }
        },
        _checkIfLoaded: function() {
          if (!this._loaded) {
            throw new Error("Set map center and zoom first.");
          }
        },
        // DOM event handling
        // @section Interaction events
        _initEvents: function(remove3) {
          this._targets = {};
          this._targets[stamp(this._container)] = this;
          var onOff = remove3 ? off : on2;
          onOff(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this);
          if (this.options.trackResize) {
            onOff(window, "resize", this._onResize, this);
          }
          if (Browser.any3d && this.options.transform3DLimit) {
            (remove3 ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
          }
        },
        _onResize: function() {
          cancelAnimFrame(this._resizeRequest);
          this._resizeRequest = requestAnimFrame(
            function() {
              this.invalidateSize({ debounceMoveend: true });
            },
            this
          );
        },
        _onScroll: function() {
          this._container.scrollTop = 0;
          this._container.scrollLeft = 0;
        },
        _onMoveEnd: function() {
          var pos = this._getMapPanePos();
          if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) {
            this._resetView(this.getCenter(), this.getZoom());
          }
        },
        _findEventTargets: function(e, type2) {
          var targets = [], target, isHover = type2 === "mouseout" || type2 === "mouseover", src = e.target || e.srcElement, dragging = false;
          while (src) {
            target = this._targets[stamp(src)];
            if (target && (type2 === "click" || type2 === "preclick") && this._draggableMoved(target)) {
              dragging = true;
              break;
            }
            if (target && target.listens(type2, true)) {
              if (isHover && !isExternalTarget(src, e)) {
                break;
              }
              targets.push(target);
              if (isHover) {
                break;
              }
            }
            if (src === this._container) {
              break;
            }
            src = src.parentNode;
          }
          if (!targets.length && !dragging && !isHover && this.listens(type2, true)) {
            targets = [this];
          }
          return targets;
        },
        _isClickDisabled: function(el) {
          while (el && el !== this._container) {
            if (el["_leaflet_disable_click"]) {
              return true;
            }
            el = el.parentNode;
          }
        },
        _handleDOMEvent: function(e) {
          var el = e.target || e.srcElement;
          if (!this._loaded || el["_leaflet_disable_events"] || e.type === "click" && this._isClickDisabled(el)) {
            return;
          }
          var type2 = e.type;
          if (type2 === "mousedown") {
            preventOutline(el);
          }
          this._fireDOMEvent(e, type2);
        },
        _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
        _fireDOMEvent: function(e, type2, canvasTargets) {
          if (e.type === "click") {
            var synth = extend2({}, e);
            synth.type = "preclick";
            this._fireDOMEvent(synth, synth.type, canvasTargets);
          }
          var targets = this._findEventTargets(e, type2);
          if (canvasTargets) {
            var filtered = [];
            for (var i2 = 0; i2 < canvasTargets.length; i2++) {
              if (canvasTargets[i2].listens(type2, true)) {
                filtered.push(canvasTargets[i2]);
              }
            }
            targets = filtered.concat(targets);
          }
          if (!targets.length) {
            return;
          }
          if (type2 === "contextmenu") {
            preventDefault(e);
          }
          var target = targets[0];
          var data = {
            originalEvent: e
          };
          if (e.type !== "keypress" && e.type !== "keydown" && e.type !== "keyup") {
            var isMarker = target.getLatLng && (!target._radius || target._radius <= 10);
            data.containerPoint = isMarker ? this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e);
            data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
            data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
          }
          for (i2 = 0; i2 < targets.length; i2++) {
            targets[i2].fire(type2, data, true);
            if (data.originalEvent._stopped || targets[i2].options.bubblingMouseEvents === false && indexOf(this._mouseEvents, type2) !== -1) {
              return;
            }
          }
        },
        _draggableMoved: function(obj) {
          obj = obj.dragging && obj.dragging.enabled() ? obj : this;
          return obj.dragging && obj.dragging.moved() || this.boxZoom && this.boxZoom.moved();
        },
        _clearHandlers: function() {
          for (var i2 = 0, len = this._handlers.length; i2 < len; i2++) {
            this._handlers[i2].disable();
          }
        },
        // @section Other Methods
        // @method whenReady(fn: Function, context?: Object): this
        // Runs the given function `fn` when the map gets initialized with
        // a view (center and zoom) and at least one layer, or immediately
        // if it's already initialized, optionally passing a function context.
        whenReady: function(callback, context) {
          if (this._loaded) {
            callback.call(context || this, { target: this });
          } else {
            this.on("load", callback, context);
          }
          return this;
        },
        // private methods for getting map state
        _getMapPanePos: function() {
          return getPosition(this._mapPane) || new Point(0, 0);
        },
        _moved: function() {
          var pos = this._getMapPanePos();
          return pos && !pos.equals([0, 0]);
        },
        _getTopLeftPoint: function(center, zoom2) {
          var pixelOrigin = center && zoom2 !== void 0 ? this._getNewPixelOrigin(center, zoom2) : this.getPixelOrigin();
          return pixelOrigin.subtract(this._getMapPanePos());
        },
        _getNewPixelOrigin: function(center, zoom2) {
          var viewHalf = this.getSize()._divideBy(2);
          return this.project(center, zoom2)._subtract(viewHalf)._add(this._getMapPanePos())._round();
        },
        _latLngToNewLayerPoint: function(latlng, zoom2, center) {
          var topLeft = this._getNewPixelOrigin(center, zoom2);
          return this.project(latlng, zoom2)._subtract(topLeft);
        },
        _latLngBoundsToNewLayerBounds: function(latLngBounds2, zoom2, center) {
          var topLeft = this._getNewPixelOrigin(center, zoom2);
          return toBounds([
            this.project(latLngBounds2.getSouthWest(), zoom2)._subtract(topLeft),
            this.project(latLngBounds2.getNorthWest(), zoom2)._subtract(topLeft),
            this.project(latLngBounds2.getSouthEast(), zoom2)._subtract(topLeft),
            this.project(latLngBounds2.getNorthEast(), zoom2)._subtract(topLeft)
          ]);
        },
        // layer point of the current center
        _getCenterLayerPoint: function() {
          return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
        },
        // offset of the specified place to the current center in pixels
        _getCenterOffset: function(latlng) {
          return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
        },
        // adjust center for view to get inside bounds
        _limitCenter: function(center, zoom2, bounds) {
          if (!bounds) {
            return center;
          }
          var centerPoint = this.project(center, zoom2), viewHalf = this.getSize().divideBy(2), viewBounds = new Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)), offset = this._getBoundsOffset(viewBounds, bounds, zoom2);
          if (Math.abs(offset.x) <= 1 && Math.abs(offset.y) <= 1) {
            return center;
          }
          return this.unproject(centerPoint.add(offset), zoom2);
        },
        // adjust offset for view to get inside bounds
        _limitOffset: function(offset, bounds) {
          if (!bounds) {
            return offset;
          }
          var viewBounds = this.getPixelBounds(), newBounds = new Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));
          return offset.add(this._getBoundsOffset(newBounds, bounds));
        },
        // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
        _getBoundsOffset: function(pxBounds, maxBounds, zoom2) {
          var projectedMaxBounds = toBounds(
            this.project(maxBounds.getNorthEast(), zoom2),
            this.project(maxBounds.getSouthWest(), zoom2)
          ), minOffset = projectedMaxBounds.min.subtract(pxBounds.min), maxOffset = projectedMaxBounds.max.subtract(pxBounds.max), dx = this._rebound(minOffset.x, -maxOffset.x), dy = this._rebound(minOffset.y, -maxOffset.y);
          return new Point(dx, dy);
        },
        _rebound: function(left, right) {
          return left + right > 0 ? Math.round(left - right) / 2 : Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
        },
        _limitZoom: function(zoom2) {
          var min2 = this.getMinZoom(), max2 = this.getMaxZoom(), snap = Browser.any3d ? this.options.zoomSnap : 1;
          if (snap) {
            zoom2 = Math.round(zoom2 / snap) * snap;
          }
          return Math.max(min2, Math.min(max2, zoom2));
        },
        _onPanTransitionStep: function() {
          this.fire("move");
        },
        _onPanTransitionEnd: function() {
          removeClass(this._mapPane, "leaflet-pan-anim");
          this.fire("moveend");
        },
        _tryAnimatedPan: function(center, options) {
          var offset = this._getCenterOffset(center)._trunc();
          if ((options && options.animate) !== true && !this.getSize().contains(offset)) {
            return false;
          }
          this.panBy(offset, options);
          return true;
        },
        _createAnimProxy: function() {
          var proxy = this._proxy = create$1("div", "leaflet-proxy leaflet-zoom-animated");
          this._panes.mapPane.appendChild(proxy);
          this.on("zoomanim", function(e) {
            var prop = TRANSFORM, transform2 = this._proxy.style[prop];
            setTransform(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1));
            if (transform2 === this._proxy.style[prop] && this._animatingZoom) {
              this._onZoomTransitionEnd();
            }
          }, this);
          this.on("load moveend", this._animMoveEnd, this);
          this._on("unload", this._destroyAnimProxy, this);
        },
        _destroyAnimProxy: function() {
          remove2(this._proxy);
          this.off("load moveend", this._animMoveEnd, this);
          delete this._proxy;
        },
        _animMoveEnd: function() {
          var c2 = this.getCenter(), z = this.getZoom();
          setTransform(this._proxy, this.project(c2, z), this.getZoomScale(z, 1));
        },
        _catchTransitionEnd: function(e) {
          if (this._animatingZoom && e.propertyName.indexOf("transform") >= 0) {
            this._onZoomTransitionEnd();
          }
        },
        _nothingToAnimate: function() {
          return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
        },
        _tryAnimatedZoom: function(center, zoom2, options) {
          if (this._animatingZoom) {
            return true;
          }
          options = options || {};
          if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() || Math.abs(zoom2 - this._zoom) > this.options.zoomAnimationThreshold) {
            return false;
          }
          var scale2 = this.getZoomScale(zoom2), offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale2);
          if (options.animate !== true && !this.getSize().contains(offset)) {
            return false;
          }
          requestAnimFrame(function() {
            this._moveStart(true, options.noMoveStart || false)._animateZoom(center, zoom2, true);
          }, this);
          return true;
        },
        _animateZoom: function(center, zoom2, startAnim, noUpdate) {
          if (!this._mapPane) {
            return;
          }
          if (startAnim) {
            this._animatingZoom = true;
            this._animateToCenter = center;
            this._animateToZoom = zoom2;
            addClass(this._mapPane, "leaflet-zoom-anim");
          }
          this.fire("zoomanim", {
            center,
            zoom: zoom2,
            noUpdate
          });
          if (!this._tempFireZoomEvent) {
            this._tempFireZoomEvent = this._zoom !== this._animateToZoom;
          }
          this._move(this._animateToCenter, this._animateToZoom, void 0, true);
          setTimeout(bind(this._onZoomTransitionEnd, this), 250);
        },
        _onZoomTransitionEnd: function() {
          if (!this._animatingZoom) {
            return;
          }
          if (this._mapPane) {
            removeClass(this._mapPane, "leaflet-zoom-anim");
          }
          this._animatingZoom = false;
          this._move(this._animateToCenter, this._animateToZoom, void 0, true);
          if (this._tempFireZoomEvent) {
            this.fire("zoom");
          }
          delete this._tempFireZoomEvent;
          this.fire("move");
          this._moveEnd(true);
        }
      });
      function createMap(id2, options) {
        return new Map2(id2, options);
      }
      var Control = Class.extend({
        // @section
        // @aka Control Options
        options: {
          // @option position: String = 'topright'
          // The position of the control (one of the map corners). Possible values are `'topleft'`,
          // `'topright'`, `'bottomleft'` or `'bottomright'`
          position: "topright"
        },
        initialize: function(options) {
          setOptions(this, options);
        },
        /* @section
         * Classes extending L.Control will inherit the following methods:
         *
         * @method getPosition: string
         * Returns the position of the control.
         */
        getPosition: function() {
          return this.options.position;
        },
        // @method setPosition(position: string): this
        // Sets the position of the control.
        setPosition: function(position) {
          var map4 = this._map;
          if (map4) {
            map4.removeControl(this);
          }
          this.options.position = position;
          if (map4) {
            map4.addControl(this);
          }
          return this;
        },
        // @method getContainer: HTMLElement
        // Returns the HTMLElement that contains the control.
        getContainer: function() {
          return this._container;
        },
        // @method addTo(map: Map): this
        // Adds the control to the given map.
        addTo: function(map4) {
          this.remove();
          this._map = map4;
          var container = this._container = this.onAdd(map4), pos = this.getPosition(), corner = map4._controlCorners[pos];
          addClass(container, "leaflet-control");
          if (pos.indexOf("bottom") !== -1) {
            corner.insertBefore(container, corner.firstChild);
          } else {
            corner.appendChild(container);
          }
          this._map.on("unload", this.remove, this);
          return this;
        },
        // @method remove: this
        // Removes the control from the map it is currently active on.
        remove: function() {
          if (!this._map) {
            return this;
          }
          remove2(this._container);
          if (this.onRemove) {
            this.onRemove(this._map);
          }
          this._map.off("unload", this.remove, this);
          this._map = null;
          return this;
        },
        _refocusOnMap: function(e) {
          if (this._map && e && e.screenX > 0 && e.screenY > 0) {
            this._map.getContainer().focus();
          }
        }
      });
      var control = function(options) {
        return new Control(options);
      };
      Map2.include({
        // @method addControl(control: Control): this
        // Adds the given control to the map
        addControl: function(control2) {
          control2.addTo(this);
          return this;
        },
        // @method removeControl(control: Control): this
        // Removes the given control from the map
        removeControl: function(control2) {
          control2.remove();
          return this;
        },
        _initControlPos: function() {
          var corners = this._controlCorners = {}, l = "leaflet-", container = this._controlContainer = create$1("div", l + "control-container", this._container);
          function createCorner(vSide, hSide) {
            var className = l + vSide + " " + l + hSide;
            corners[vSide + hSide] = create$1("div", className, container);
          }
          createCorner("top", "left");
          createCorner("top", "right");
          createCorner("bottom", "left");
          createCorner("bottom", "right");
        },
        _clearControlPos: function() {
          for (var i2 in this._controlCorners) {
            remove2(this._controlCorners[i2]);
          }
          remove2(this._controlContainer);
          delete this._controlCorners;
          delete this._controlContainer;
        }
      });
      var Layers = Control.extend({
        // @section
        // @aka Control.Layers options
        options: {
          // @option collapsed: Boolean = true
          // If `true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.
          collapsed: true,
          position: "topright",
          // @option autoZIndex: Boolean = true
          // If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
          autoZIndex: true,
          // @option hideSingleBase: Boolean = false
          // If `true`, the base layers in the control will be hidden when there is only one.
          hideSingleBase: false,
          // @option sortLayers: Boolean = false
          // Whether to sort the layers. When `false`, layers will keep the order
          // in which they were added to the control.
          sortLayers: false,
          // @option sortFunction: Function = *
          // A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
          // that will be used for sorting the layers, when `sortLayers` is `true`.
          // The function receives both the `L.Layer` instances and their names, as in
          // `sortFunction(layerA, layerB, nameA, nameB)`.
          // By default, it sorts layers alphabetically by their name.
          sortFunction: function(layerA, layerB, nameA, nameB) {
            return nameA < nameB ? -1 : nameB < nameA ? 1 : 0;
          }
        },
        initialize: function(baseLayers, overlays, options) {
          setOptions(this, options);
          this._layerControlInputs = [];
          this._layers = [];
          this._lastZIndex = 0;
          this._handlingClick = false;
          this._preventClick = false;
          for (var i2 in baseLayers) {
            this._addLayer(baseLayers[i2], i2);
          }
          for (i2 in overlays) {
            this._addLayer(overlays[i2], i2, true);
          }
        },
        onAdd: function(map4) {
          this._initLayout();
          this._update();
          this._map = map4;
          map4.on("zoomend", this._checkDisabledLayers, this);
          for (var i2 = 0; i2 < this._layers.length; i2++) {
            this._layers[i2].layer.on("add remove", this._onLayerChange, this);
          }
          return this._container;
        },
        addTo: function(map4) {
          Control.prototype.addTo.call(this, map4);
          return this._expandIfNotCollapsed();
        },
        onRemove: function() {
          this._map.off("zoomend", this._checkDisabledLayers, this);
          for (var i2 = 0; i2 < this._layers.length; i2++) {
            this._layers[i2].layer.off("add remove", this._onLayerChange, this);
          }
        },
        // @method addBaseLayer(layer: Layer, name: String): this
        // Adds a base layer (radio button entry) with the given name to the control.
        addBaseLayer: function(layer, name) {
          this._addLayer(layer, name);
          return this._map ? this._update() : this;
        },
        // @method addOverlay(layer: Layer, name: String): this
        // Adds an overlay (checkbox entry) with the given name to the control.
        addOverlay: function(layer, name) {
          this._addLayer(layer, name, true);
          return this._map ? this._update() : this;
        },
        // @method removeLayer(layer: Layer): this
        // Remove the given layer from the control.
        removeLayer: function(layer) {
          layer.off("add remove", this._onLayerChange, this);
          var obj = this._getLayer(stamp(layer));
          if (obj) {
            this._layers.splice(this._layers.indexOf(obj), 1);
          }
          return this._map ? this._update() : this;
        },
        // @method expand(): this
        // Expand the control container if collapsed.
        expand: function() {
          addClass(this._container, "leaflet-control-layers-expanded");
          this._section.style.height = null;
          var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
          if (acceptableHeight < this._section.clientHeight) {
            addClass(this._section, "leaflet-control-layers-scrollbar");
            this._section.style.height = acceptableHeight + "px";
          } else {
            removeClass(this._section, "leaflet-control-layers-scrollbar");
          }
          this._checkDisabledLayers();
          return this;
        },
        // @method collapse(): this
        // Collapse the control container if expanded.
        collapse: function() {
          removeClass(this._container, "leaflet-control-layers-expanded");
          return this;
        },
        _initLayout: function() {
          var className = "leaflet-control-layers", container = this._container = create$1("div", className), collapsed = this.options.collapsed;
          container.setAttribute("aria-haspopup", true);
          disableClickPropagation(container);
          disableScrollPropagation(container);
          var section = this._section = create$1("section", className + "-list");
          if (collapsed) {
            this._map.on("click", this.collapse, this);
            on2(container, {
              mouseenter: this._expandSafely,
              mouseleave: this.collapse
            }, this);
          }
          var link = this._layersLink = create$1("a", className + "-toggle", container);
          link.href = "#";
          link.title = "Layers";
          link.setAttribute("role", "button");
          on2(link, {
            keydown: function(e) {
              if (e.keyCode === 13) {
                this._expandSafely();
              }
            },
            // Certain screen readers intercept the key event and instead send a click event
            click: function(e) {
              preventDefault(e);
              this._expandSafely();
            }
          }, this);
          if (!collapsed) {
            this.expand();
          }
          this._baseLayersList = create$1("div", className + "-base", section);
          this._separator = create$1("div", className + "-separator", section);
          this._overlaysList = create$1("div", className + "-overlays", section);
          container.appendChild(section);
        },
        _getLayer: function(id2) {
          for (var i2 = 0; i2 < this._layers.length; i2++) {
            if (this._layers[i2] && stamp(this._layers[i2].layer) === id2) {
              return this._layers[i2];
            }
          }
        },
        _addLayer: function(layer, name, overlay) {
          if (this._map) {
            layer.on("add remove", this._onLayerChange, this);
          }
          this._layers.push({
            layer,
            name,
            overlay
          });
          if (this.options.sortLayers) {
            this._layers.sort(bind(function(a2, b) {
              return this.options.sortFunction(a2.layer, b.layer, a2.name, b.name);
            }, this));
          }
          if (this.options.autoZIndex && layer.setZIndex) {
            this._lastZIndex++;
            layer.setZIndex(this._lastZIndex);
          }
          this._expandIfNotCollapsed();
        },
        _update: function() {
          if (!this._container) {
            return this;
          }
          empty3(this._baseLayersList);
          empty3(this._overlaysList);
          this._layerControlInputs = [];
          var baseLayersPresent, overlaysPresent, i2, obj, baseLayersCount = 0;
          for (i2 = 0; i2 < this._layers.length; i2++) {
            obj = this._layers[i2];
            this._addItem(obj);
            overlaysPresent = overlaysPresent || obj.overlay;
            baseLayersPresent = baseLayersPresent || !obj.overlay;
            baseLayersCount += !obj.overlay ? 1 : 0;
          }
          if (this.options.hideSingleBase) {
            baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
            this._baseLayersList.style.display = baseLayersPresent ? "" : "none";
          }
          this._separator.style.display = overlaysPresent && baseLayersPresent ? "" : "none";
          return this;
        },
        _onLayerChange: function(e) {
          if (!this._handlingClick) {
            this._update();
          }
          var obj = this._getLayer(stamp(e.target));
          var type2 = obj.overlay ? e.type === "add" ? "overlayadd" : "overlayremove" : e.type === "add" ? "baselayerchange" : null;
          if (type2) {
            this._map.fire(type2, obj);
          }
        },
        // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
        _createRadioElement: function(name, checked) {
          var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' + name + '"' + (checked ? ' checked="checked"' : "") + "/>";
          var radioFragment = document.createElement("div");
          radioFragment.innerHTML = radioHtml;
          return radioFragment.firstChild;
        },
        _addItem: function(obj) {
          var label = document.createElement("label"), checked = this._map.hasLayer(obj.layer), input;
          if (obj.overlay) {
            input = document.createElement("input");
            input.type = "checkbox";
            input.className = "leaflet-control-layers-selector";
            input.defaultChecked = checked;
          } else {
            input = this._createRadioElement("leaflet-base-layers_" + stamp(this), checked);
          }
          this._layerControlInputs.push(input);
          input.layerId = stamp(obj.layer);
          on2(input, "click", this._onInputClick, this);
          var name = document.createElement("span");
          name.innerHTML = " " + obj.name;
          var holder = document.createElement("span");
          label.appendChild(holder);
          holder.appendChild(input);
          holder.appendChild(name);
          var container = obj.overlay ? this._overlaysList : this._baseLayersList;
          container.appendChild(label);
          this._checkDisabledLayers();
          return label;
        },
        _onInputClick: function() {
          if (this._preventClick) {
            return;
          }
          var inputs = this._layerControlInputs, input, layer;
          var addedLayers = [], removedLayers = [];
          this._handlingClick = true;
          for (var i2 = inputs.length - 1; i2 >= 0; i2--) {
            input = inputs[i2];
            layer = this._getLayer(input.layerId).layer;
            if (input.checked) {
              addedLayers.push(layer);
            } else if (!input.checked) {
              removedLayers.push(layer);
            }
          }
          for (i2 = 0; i2 < removedLayers.length; i2++) {
            if (this._map.hasLayer(removedLayers[i2])) {
              this._map.removeLayer(removedLayers[i2]);
            }
          }
          for (i2 = 0; i2 < addedLayers.length; i2++) {
            if (!this._map.hasLayer(addedLayers[i2])) {
              this._map.addLayer(addedLayers[i2]);
            }
          }
          this._handlingClick = false;
          this._refocusOnMap();
        },
        _checkDisabledLayers: function() {
          var inputs = this._layerControlInputs, input, layer, zoom2 = this._map.getZoom();
          for (var i2 = inputs.length - 1; i2 >= 0; i2--) {
            input = inputs[i2];
            layer = this._getLayer(input.layerId).layer;
            input.disabled = layer.options.minZoom !== void 0 && zoom2 < layer.options.minZoom || layer.options.maxZoom !== void 0 && zoom2 > layer.options.maxZoom;
          }
        },
        _expandIfNotCollapsed: function() {
          if (this._map && !this.options.collapsed) {
            this.expand();
          }
          return this;
        },
        _expandSafely: function() {
          var section = this._section;
          this._preventClick = true;
          on2(section, "click", preventDefault);
          this.expand();
          var that = this;
          setTimeout(function() {
            off(section, "click", preventDefault);
            that._preventClick = false;
          });
        }
      });
      var layers = function(baseLayers, overlays, options) {
        return new Layers(baseLayers, overlays, options);
      };
      var Zoom = Control.extend({
        // @section
        // @aka Control.Zoom options
        options: {
          position: "topleft",
          // @option zoomInText: String = '<span aria-hidden="true">+</span>'
          // The text set on the 'zoom in' button.
          zoomInText: '<span aria-hidden="true">+</span>',
          // @option zoomInTitle: String = 'Zoom in'
          // The title set on the 'zoom in' button.
          zoomInTitle: "Zoom in",
          // @option zoomOutText: String = '<span aria-hidden="true">&#x2212;</span>'
          // The text set on the 'zoom out' button.
          zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
          // @option zoomOutTitle: String = 'Zoom out'
          // The title set on the 'zoom out' button.
          zoomOutTitle: "Zoom out"
        },
        onAdd: function(map4) {
          var zoomName = "leaflet-control-zoom", container = create$1("div", zoomName + " leaflet-bar"), options = this.options;
          this._zoomInButton = this._createButton(
            options.zoomInText,
            options.zoomInTitle,
            zoomName + "-in",
            container,
            this._zoomIn
          );
          this._zoomOutButton = this._createButton(
            options.zoomOutText,
            options.zoomOutTitle,
            zoomName + "-out",
            container,
            this._zoomOut
          );
          this._updateDisabled();
          map4.on("zoomend zoomlevelschange", this._updateDisabled, this);
          return container;
        },
        onRemove: function(map4) {
          map4.off("zoomend zoomlevelschange", this._updateDisabled, this);
        },
        disable: function() {
          this._disabled = true;
          this._updateDisabled();
          return this;
        },
        enable: function() {
          this._disabled = false;
          this._updateDisabled();
          return this;
        },
        _zoomIn: function(e) {
          if (!this._disabled && this._map._zoom < this._map.getMaxZoom()) {
            this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
          }
        },
        _zoomOut: function(e) {
          if (!this._disabled && this._map._zoom > this._map.getMinZoom()) {
            this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
          }
        },
        _createButton: function(html, title, className, container, fn) {
          var link = create$1("a", className, container);
          link.innerHTML = html;
          link.href = "#";
          link.title = title;
          link.setAttribute("role", "button");
          link.setAttribute("aria-label", title);
          disableClickPropagation(link);
          on2(link, "click", stop);
          on2(link, "click", fn, this);
          on2(link, "click", this._refocusOnMap, this);
          return link;
        },
        _updateDisabled: function() {
          var map4 = this._map, className = "leaflet-disabled";
          removeClass(this._zoomInButton, className);
          removeClass(this._zoomOutButton, className);
          this._zoomInButton.setAttribute("aria-disabled", "false");
          this._zoomOutButton.setAttribute("aria-disabled", "false");
          if (this._disabled || map4._zoom === map4.getMinZoom()) {
            addClass(this._zoomOutButton, className);
            this._zoomOutButton.setAttribute("aria-disabled", "true");
          }
          if (this._disabled || map4._zoom === map4.getMaxZoom()) {
            addClass(this._zoomInButton, className);
            this._zoomInButton.setAttribute("aria-disabled", "true");
          }
        }
      });
      Map2.mergeOptions({
        zoomControl: true
      });
      Map2.addInitHook(function() {
        if (this.options.zoomControl) {
          this.zoomControl = new Zoom();
          this.addControl(this.zoomControl);
        }
      });
      var zoom = function(options) {
        return new Zoom(options);
      };
      var Scale = Control.extend({
        // @section
        // @aka Control.Scale options
        options: {
          position: "bottomleft",
          // @option maxWidth: Number = 100
          // Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
          maxWidth: 100,
          // @option metric: Boolean = True
          // Whether to show the metric scale line (m/km).
          metric: true,
          // @option imperial: Boolean = True
          // Whether to show the imperial scale line (mi/ft).
          imperial: true
          // @option updateWhenIdle: Boolean = false
          // If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
        },
        onAdd: function(map4) {
          var className = "leaflet-control-scale", container = create$1("div", className), options = this.options;
          this._addScales(options, className + "-line", container);
          map4.on(options.updateWhenIdle ? "moveend" : "move", this._update, this);
          map4.whenReady(this._update, this);
          return container;
        },
        onRemove: function(map4) {
          map4.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
        },
        _addScales: function(options, className, container) {
          if (options.metric) {
            this._mScale = create$1("div", className, container);
          }
          if (options.imperial) {
            this._iScale = create$1("div", className, container);
          }
        },
        _update: function() {
          var map4 = this._map, y3 = map4.getSize().y / 2;
          var maxMeters = map4.distance(
            map4.containerPointToLatLng([0, y3]),
            map4.containerPointToLatLng([this.options.maxWidth, y3])
          );
          this._updateScales(maxMeters);
        },
        _updateScales: function(maxMeters) {
          if (this.options.metric && maxMeters) {
            this._updateMetric(maxMeters);
          }
          if (this.options.imperial && maxMeters) {
            this._updateImperial(maxMeters);
          }
        },
        _updateMetric: function(maxMeters) {
          var meters = this._getRoundNum(maxMeters), label = meters < 1e3 ? meters + " m" : meters / 1e3 + " km";
          this._updateScale(this._mScale, label, meters / maxMeters);
        },
        _updateImperial: function(maxMeters) {
          var maxFeet = maxMeters * 3.2808399, maxMiles, miles, feet;
          if (maxFeet > 5280) {
            maxMiles = maxFeet / 5280;
            miles = this._getRoundNum(maxMiles);
            this._updateScale(this._iScale, miles + " mi", miles / maxMiles);
          } else {
            feet = this._getRoundNum(maxFeet);
            this._updateScale(this._iScale, feet + " ft", feet / maxFeet);
          }
        },
        _updateScale: function(scale2, text, ratio) {
          scale2.style.width = Math.round(this.options.maxWidth * ratio) + "px";
          scale2.innerHTML = text;
        },
        _getRoundNum: function(num) {
          var pow10 = Math.pow(10, (Math.floor(num) + "").length - 1), d = num / pow10;
          d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1;
          return pow10 * d;
        }
      });
      var scale = function(options) {
        return new Scale(options);
      };
      var ukrainianFlag = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>';
      var Attribution = Control.extend({
        // @section
        // @aka Control.Attribution options
        options: {
          position: "bottomright",
          // @option prefix: String|false = 'Leaflet'
          // The HTML text shown before the attributions. Pass `false` to disable.
          prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (Browser.inlineSvg ? ukrainianFlag + " " : "") + "Leaflet</a>"
        },
        initialize: function(options) {
          setOptions(this, options);
          this._attributions = {};
        },
        onAdd: function(map4) {
          map4.attributionControl = this;
          this._container = create$1("div", "leaflet-control-attribution");
          disableClickPropagation(this._container);
          for (var i2 in map4._layers) {
            if (map4._layers[i2].getAttribution) {
              this.addAttribution(map4._layers[i2].getAttribution());
            }
          }
          this._update();
          map4.on("layeradd", this._addAttribution, this);
          return this._container;
        },
        onRemove: function(map4) {
          map4.off("layeradd", this._addAttribution, this);
        },
        _addAttribution: function(ev) {
          if (ev.layer.getAttribution) {
            this.addAttribution(ev.layer.getAttribution());
            ev.layer.once("remove", function() {
              this.removeAttribution(ev.layer.getAttribution());
            }, this);
          }
        },
        // @method setPrefix(prefix: String|false): this
        // The HTML text shown before the attributions. Pass `false` to disable.
        setPrefix: function(prefix) {
          this.options.prefix = prefix;
          this._update();
          return this;
        },
        // @method addAttribution(text: String): this
        // Adds an attribution text (e.g. `'&copy; OpenStreetMap contributors'`).
        addAttribution: function(text) {
          if (!text) {
            return this;
          }
          if (!this._attributions[text]) {
            this._attributions[text] = 0;
          }
          this._attributions[text]++;
          this._update();
          return this;
        },
        // @method removeAttribution(text: String): this
        // Removes an attribution text.
        removeAttribution: function(text) {
          if (!text) {
            return this;
          }
          if (this._attributions[text]) {
            this._attributions[text]--;
            this._update();
          }
          return this;
        },
        _update: function() {
          if (!this._map) {
            return;
          }
          var attribs = [];
          for (var i2 in this._attributions) {
            if (this._attributions[i2]) {
              attribs.push(i2);
            }
          }
          var prefixAndAttribs = [];
          if (this.options.prefix) {
            prefixAndAttribs.push(this.options.prefix);
          }
          if (attribs.length) {
            prefixAndAttribs.push(attribs.join(", "));
          }
          this._container.innerHTML = prefixAndAttribs.join(' <span aria-hidden="true">|</span> ');
        }
      });
      Map2.mergeOptions({
        attributionControl: true
      });
      Map2.addInitHook(function() {
        if (this.options.attributionControl) {
          new Attribution().addTo(this);
        }
      });
      var attribution = function(options) {
        return new Attribution(options);
      };
      Control.Layers = Layers;
      Control.Zoom = Zoom;
      Control.Scale = Scale;
      Control.Attribution = Attribution;
      control.layers = layers;
      control.zoom = zoom;
      control.scale = scale;
      control.attribution = attribution;
      var Handler = Class.extend({
        initialize: function(map4) {
          this._map = map4;
        },
        // @method enable(): this
        // Enables the handler
        enable: function() {
          if (this._enabled) {
            return this;
          }
          this._enabled = true;
          this.addHooks();
          return this;
        },
        // @method disable(): this
        // Disables the handler
        disable: function() {
          if (!this._enabled) {
            return this;
          }
          this._enabled = false;
          this.removeHooks();
          return this;
        },
        // @method enabled(): Boolean
        // Returns `true` if the handler is enabled
        enabled: function() {
          return !!this._enabled;
        }
        // @section Extension methods
        // Classes inheriting from `Handler` must implement the two following methods:
        // @method addHooks()
        // Called when the handler is enabled, should add event hooks.
        // @method removeHooks()
        // Called when the handler is disabled, should remove the event hooks added previously.
      });
      Handler.addTo = function(map4, name) {
        map4.addHandler(name, this);
        return this;
      };
      var Mixin = { Events };
      var START = Browser.touch ? "touchstart mousedown" : "mousedown";
      var Draggable = Evented.extend({
        options: {
          // @section
          // @aka Draggable options
          // @option clickTolerance: Number = 3
          // The max number of pixels a user can shift the mouse pointer during a click
          // for it to be considered a valid click (as opposed to a mouse drag).
          clickTolerance: 3
        },
        // @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
        // Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
        initialize: function(element, dragStartTarget, preventOutline2, options) {
          setOptions(this, options);
          this._element = element;
          this._dragStartTarget = dragStartTarget || element;
          this._preventOutline = preventOutline2;
        },
        // @method enable()
        // Enables the dragging ability
        enable: function() {
          if (this._enabled) {
            return;
          }
          on2(this._dragStartTarget, START, this._onDown, this);
          this._enabled = true;
        },
        // @method disable()
        // Disables the dragging ability
        disable: function() {
          if (!this._enabled) {
            return;
          }
          if (Draggable._dragging === this) {
            this.finishDrag(true);
          }
          off(this._dragStartTarget, START, this._onDown, this);
          this._enabled = false;
          this._moved = false;
        },
        _onDown: function(e) {
          if (!this._enabled) {
            return;
          }
          this._moved = false;
          if (hasClass(this._element, "leaflet-zoom-anim")) {
            return;
          }
          if (e.touches && e.touches.length !== 1) {
            if (Draggable._dragging === this) {
              this.finishDrag();
            }
            return;
          }
          if (Draggable._dragging || e.shiftKey || e.which !== 1 && e.button !== 1 && !e.touches) {
            return;
          }
          Draggable._dragging = this;
          if (this._preventOutline) {
            preventOutline(this._element);
          }
          disableImageDrag();
          disableTextSelection();
          if (this._moving) {
            return;
          }
          this.fire("down");
          var first = e.touches ? e.touches[0] : e, sizedParent = getSizedParentNode(this._element);
          this._startPoint = new Point(first.clientX, first.clientY);
          this._startPos = getPosition(this._element);
          this._parentScale = getScale(sizedParent);
          var mouseevent = e.type === "mousedown";
          on2(document, mouseevent ? "mousemove" : "touchmove", this._onMove, this);
          on2(document, mouseevent ? "mouseup" : "touchend touchcancel", this._onUp, this);
        },
        _onMove: function(e) {
          if (!this._enabled) {
            return;
          }
          if (e.touches && e.touches.length > 1) {
            this._moved = true;
            return;
          }
          var first = e.touches && e.touches.length === 1 ? e.touches[0] : e, offset = new Point(first.clientX, first.clientY)._subtract(this._startPoint);
          if (!offset.x && !offset.y) {
            return;
          }
          if (Math.abs(offset.x) + Math.abs(offset.y) < this.options.clickTolerance) {
            return;
          }
          offset.x /= this._parentScale.x;
          offset.y /= this._parentScale.y;
          preventDefault(e);
          if (!this._moved) {
            this.fire("dragstart");
            this._moved = true;
            addClass(document.body, "leaflet-dragging");
            this._lastTarget = e.target || e.srcElement;
            if (window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance) {
              this._lastTarget = this._lastTarget.correspondingUseElement;
            }
            addClass(this._lastTarget, "leaflet-drag-target");
          }
          this._newPos = this._startPos.add(offset);
          this._moving = true;
          this._lastEvent = e;
          this._updatePosition();
        },
        _updatePosition: function() {
          var e = { originalEvent: this._lastEvent };
          this.fire("predrag", e);
          setPosition(this._element, this._newPos);
          this.fire("drag", e);
        },
        _onUp: function() {
          if (!this._enabled) {
            return;
          }
          this.finishDrag();
        },
        finishDrag: function(noInertia) {
          removeClass(document.body, "leaflet-dragging");
          if (this._lastTarget) {
            removeClass(this._lastTarget, "leaflet-drag-target");
            this._lastTarget = null;
          }
          off(document, "mousemove touchmove", this._onMove, this);
          off(document, "mouseup touchend touchcancel", this._onUp, this);
          enableImageDrag();
          enableTextSelection();
          var fireDragend = this._moved && this._moving;
          this._moving = false;
          Draggable._dragging = false;
          if (fireDragend) {
            this.fire("dragend", {
              noInertia,
              distance: this._newPos.distanceTo(this._startPos)
            });
          }
        }
      });
      function clipPolygon(points, bounds, round) {
        var clippedPoints, edges = [1, 4, 2, 8], i2, j, k, a2, b, len, edge2, p;
        for (i2 = 0, len = points.length; i2 < len; i2++) {
          points[i2]._code = _getBitCode(points[i2], bounds);
        }
        for (k = 0; k < 4; k++) {
          edge2 = edges[k];
          clippedPoints = [];
          for (i2 = 0, len = points.length, j = len - 1; i2 < len; j = i2++) {
            a2 = points[i2];
            b = points[j];
            if (!(a2._code & edge2)) {
              if (b._code & edge2) {
                p = _getEdgeIntersection(b, a2, edge2, bounds, round);
                p._code = _getBitCode(p, bounds);
                clippedPoints.push(p);
              }
              clippedPoints.push(a2);
            } else if (!(b._code & edge2)) {
              p = _getEdgeIntersection(b, a2, edge2, bounds, round);
              p._code = _getBitCode(p, bounds);
              clippedPoints.push(p);
            }
          }
          points = clippedPoints;
        }
        return points;
      }
      function polygonCenter(latlngs, crs) {
        var i2, j, p1, p2, f, area, x3, y3, center;
        if (!latlngs || latlngs.length === 0) {
          throw new Error("latlngs not passed");
        }
        if (!isFlat(latlngs)) {
          console.warn("latlngs are not flat! Only the first ring will be used");
          latlngs = latlngs[0];
        }
        var centroidLatLng = toLatLng([0, 0]);
        var bounds = toLatLngBounds(latlngs);
        var areaBounds = bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest());
        if (areaBounds < 1700) {
          centroidLatLng = centroid(latlngs);
        }
        var len = latlngs.length;
        var points = [];
        for (i2 = 0; i2 < len; i2++) {
          var latlng = toLatLng(latlngs[i2]);
          points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
        }
        area = x3 = y3 = 0;
        for (i2 = 0, j = len - 1; i2 < len; j = i2++) {
          p1 = points[i2];
          p2 = points[j];
          f = p1.y * p2.x - p2.y * p1.x;
          x3 += (p1.x + p2.x) * f;
          y3 += (p1.y + p2.y) * f;
          area += f * 3;
        }
        if (area === 0) {
          center = points[0];
        } else {
          center = [x3 / area, y3 / area];
        }
        var latlngCenter = crs.unproject(toPoint(center));
        return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
      }
      function centroid(coords) {
        var latSum = 0;
        var lngSum = 0;
        var len = 0;
        for (var i2 = 0; i2 < coords.length; i2++) {
          var latlng = toLatLng(coords[i2]);
          latSum += latlng.lat;
          lngSum += latlng.lng;
          len++;
        }
        return toLatLng([latSum / len, lngSum / len]);
      }
      var PolyUtil = {
        __proto__: null,
        clipPolygon,
        polygonCenter,
        centroid
      };
      function simplify(points, tolerance) {
        if (!tolerance || !points.length) {
          return points.slice();
        }
        var sqTolerance = tolerance * tolerance;
        points = _reducePoints(points, sqTolerance);
        points = _simplifyDP(points, sqTolerance);
        return points;
      }
      function pointToSegmentDistance(p, p1, p2) {
        return Math.sqrt(_sqClosestPointOnSegment(p, p1, p2, true));
      }
      function closestPointOnSegment(p, p1, p2) {
        return _sqClosestPointOnSegment(p, p1, p2);
      }
      function _simplifyDP(points, sqTolerance) {
        var len = points.length, ArrayConstructor = typeof Uint8Array !== "undefined" ? Uint8Array : Array, markers = new ArrayConstructor(len);
        markers[0] = markers[len - 1] = 1;
        _simplifyDPStep(points, markers, sqTolerance, 0, len - 1);
        var i2, newPoints = [];
        for (i2 = 0; i2 < len; i2++) {
          if (markers[i2]) {
            newPoints.push(points[i2]);
          }
        }
        return newPoints;
      }
      function _simplifyDPStep(points, markers, sqTolerance, first, last) {
        var maxSqDist = 0, index3, i2, sqDist;
        for (i2 = first + 1; i2 <= last - 1; i2++) {
          sqDist = _sqClosestPointOnSegment(points[i2], points[first], points[last], true);
          if (sqDist > maxSqDist) {
            index3 = i2;
            maxSqDist = sqDist;
          }
        }
        if (maxSqDist > sqTolerance) {
          markers[index3] = 1;
          _simplifyDPStep(points, markers, sqTolerance, first, index3);
          _simplifyDPStep(points, markers, sqTolerance, index3, last);
        }
      }
      function _reducePoints(points, sqTolerance) {
        var reducedPoints = [points[0]];
        for (var i2 = 1, prev2 = 0, len = points.length; i2 < len; i2++) {
          if (_sqDist(points[i2], points[prev2]) > sqTolerance) {
            reducedPoints.push(points[i2]);
            prev2 = i2;
          }
        }
        if (prev2 < len - 1) {
          reducedPoints.push(points[len - 1]);
        }
        return reducedPoints;
      }
      var _lastCode;
      function clipSegment(a2, b, bounds, useLastCode, round) {
        var codeA = useLastCode ? _lastCode : _getBitCode(a2, bounds), codeB = _getBitCode(b, bounds), codeOut, p, newCode;
        _lastCode = codeB;
        while (true) {
          if (!(codeA | codeB)) {
            return [a2, b];
          }
          if (codeA & codeB) {
            return false;
          }
          codeOut = codeA || codeB;
          p = _getEdgeIntersection(a2, b, codeOut, bounds, round);
          newCode = _getBitCode(p, bounds);
          if (codeOut === codeA) {
            a2 = p;
            codeA = newCode;
          } else {
            b = p;
            codeB = newCode;
          }
        }
      }
      function _getEdgeIntersection(a2, b, code, bounds, round) {
        var dx = b.x - a2.x, dy = b.y - a2.y, min2 = bounds.min, max2 = bounds.max, x3, y3;
        if (code & 8) {
          x3 = a2.x + dx * (max2.y - a2.y) / dy;
          y3 = max2.y;
        } else if (code & 4) {
          x3 = a2.x + dx * (min2.y - a2.y) / dy;
          y3 = min2.y;
        } else if (code & 2) {
          x3 = max2.x;
          y3 = a2.y + dy * (max2.x - a2.x) / dx;
        } else if (code & 1) {
          x3 = min2.x;
          y3 = a2.y + dy * (min2.x - a2.x) / dx;
        }
        return new Point(x3, y3, round);
      }
      function _getBitCode(p, bounds) {
        var code = 0;
        if (p.x < bounds.min.x) {
          code |= 1;
        } else if (p.x > bounds.max.x) {
          code |= 2;
        }
        if (p.y < bounds.min.y) {
          code |= 4;
        } else if (p.y > bounds.max.y) {
          code |= 8;
        }
        return code;
      }
      function _sqDist(p1, p2) {
        var dx = p2.x - p1.x, dy = p2.y - p1.y;
        return dx * dx + dy * dy;
      }
      function _sqClosestPointOnSegment(p, p1, p2, sqDist) {
        var x3 = p1.x, y3 = p1.y, dx = p2.x - x3, dy = p2.y - y3, dot = dx * dx + dy * dy, t;
        if (dot > 0) {
          t = ((p.x - x3) * dx + (p.y - y3) * dy) / dot;
          if (t > 1) {
            x3 = p2.x;
            y3 = p2.y;
          } else if (t > 0) {
            x3 += dx * t;
            y3 += dy * t;
          }
        }
        dx = p.x - x3;
        dy = p.y - y3;
        return sqDist ? dx * dx + dy * dy : new Point(x3, y3);
      }
      function isFlat(latlngs) {
        return !isArray(latlngs[0]) || typeof latlngs[0][0] !== "object" && typeof latlngs[0][0] !== "undefined";
      }
      function _flat(latlngs) {
        console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead.");
        return isFlat(latlngs);
      }
      function polylineCenter(latlngs, crs) {
        var i2, halfDist, segDist, dist, p1, p2, ratio, center;
        if (!latlngs || latlngs.length === 0) {
          throw new Error("latlngs not passed");
        }
        if (!isFlat(latlngs)) {
          console.warn("latlngs are not flat! Only the first ring will be used");
          latlngs = latlngs[0];
        }
        var centroidLatLng = toLatLng([0, 0]);
        var bounds = toLatLngBounds(latlngs);
        var areaBounds = bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest());
        if (areaBounds < 1700) {
          centroidLatLng = centroid(latlngs);
        }
        var len = latlngs.length;
        var points = [];
        for (i2 = 0; i2 < len; i2++) {
          var latlng = toLatLng(latlngs[i2]);
          points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
        }
        for (i2 = 0, halfDist = 0; i2 < len - 1; i2++) {
          halfDist += points[i2].distanceTo(points[i2 + 1]) / 2;
        }
        if (halfDist === 0) {
          center = points[0];
        } else {
          for (i2 = 0, dist = 0; i2 < len - 1; i2++) {
            p1 = points[i2];
            p2 = points[i2 + 1];
            segDist = p1.distanceTo(p2);
            dist += segDist;
            if (dist > halfDist) {
              ratio = (dist - halfDist) / segDist;
              center = [
                p2.x - ratio * (p2.x - p1.x),
                p2.y - ratio * (p2.y - p1.y)
              ];
              break;
            }
          }
        }
        var latlngCenter = crs.unproject(toPoint(center));
        return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
      }
      var LineUtil = {
        __proto__: null,
        simplify,
        pointToSegmentDistance,
        closestPointOnSegment,
        clipSegment,
        _getEdgeIntersection,
        _getBitCode,
        _sqClosestPointOnSegment,
        isFlat,
        _flat,
        polylineCenter
      };
      var LonLat = {
        project: function(latlng) {
          return new Point(latlng.lng, latlng.lat);
        },
        unproject: function(point) {
          return new LatLng(point.y, point.x);
        },
        bounds: new Bounds([-180, -90], [180, 90])
      };
      var Mercator = {
        R: 6378137,
        R_MINOR: 6356752314245179e-9,
        bounds: new Bounds([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
        project: function(latlng) {
          var d = Math.PI / 180, r = this.R, y3 = latlng.lat * d, tmp = this.R_MINOR / r, e = Math.sqrt(1 - tmp * tmp), con = e * Math.sin(y3);
          var ts = Math.tan(Math.PI / 4 - y3 / 2) / Math.pow((1 - con) / (1 + con), e / 2);
          y3 = -r * Math.log(Math.max(ts, 1e-10));
          return new Point(latlng.lng * d * r, y3);
        },
        unproject: function(point) {
          var d = 180 / Math.PI, r = this.R, tmp = this.R_MINOR / r, e = Math.sqrt(1 - tmp * tmp), ts = Math.exp(-point.y / r), phi = Math.PI / 2 - 2 * Math.atan(ts);
          for (var i2 = 0, dphi = 0.1, con; i2 < 15 && Math.abs(dphi) > 1e-7; i2++) {
            con = e * Math.sin(phi);
            con = Math.pow((1 - con) / (1 + con), e / 2);
            dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
            phi += dphi;
          }
          return new LatLng(phi * d, point.x * d / r);
        }
      };
      var index2 = {
        __proto__: null,
        LonLat,
        Mercator,
        SphericalMercator
      };
      var EPSG3395 = extend2({}, Earth, {
        code: "EPSG:3395",
        projection: Mercator,
        transformation: function() {
          var scale2 = 0.5 / (Math.PI * Mercator.R);
          return toTransformation(scale2, 0.5, -scale2, 0.5);
        }()
      });
      var EPSG4326 = extend2({}, Earth, {
        code: "EPSG:4326",
        projection: LonLat,
        transformation: toTransformation(1 / 180, 1, -1 / 180, 0.5)
      });
      var Simple = extend2({}, CRS, {
        projection: LonLat,
        transformation: toTransformation(1, 0, -1, 0),
        scale: function(zoom2) {
          return Math.pow(2, zoom2);
        },
        zoom: function(scale2) {
          return Math.log(scale2) / Math.LN2;
        },
        distance: function(latlng1, latlng2) {
          var dx = latlng2.lng - latlng1.lng, dy = latlng2.lat - latlng1.lat;
          return Math.sqrt(dx * dx + dy * dy);
        },
        infinite: true
      });
      CRS.Earth = Earth;
      CRS.EPSG3395 = EPSG3395;
      CRS.EPSG3857 = EPSG3857;
      CRS.EPSG900913 = EPSG900913;
      CRS.EPSG4326 = EPSG4326;
      CRS.Simple = Simple;
      var Layer = Evented.extend({
        // Classes extending `L.Layer` will inherit the following options:
        options: {
          // @option pane: String = 'overlayPane'
          // By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
          pane: "overlayPane",
          // @option attribution: String = null
          // String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
          attribution: null,
          bubblingMouseEvents: true
        },
        /* @section
         * Classes extending `L.Layer` will inherit the following methods:
         *
         * @method addTo(map: Map|LayerGroup): this
         * Adds the layer to the given map or layer group.
         */
        addTo: function(map4) {
          map4.addLayer(this);
          return this;
        },
        // @method remove: this
        // Removes the layer from the map it is currently active on.
        remove: function() {
          return this.removeFrom(this._map || this._mapToAdd);
        },
        // @method removeFrom(map: Map): this
        // Removes the layer from the given map
        //
        // @alternative
        // @method removeFrom(group: LayerGroup): this
        // Removes the layer from the given `LayerGroup`
        removeFrom: function(obj) {
          if (obj) {
            obj.removeLayer(this);
          }
          return this;
        },
        // @method getPane(name? : String): HTMLElement
        // Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
        getPane: function(name) {
          return this._map.getPane(name ? this.options[name] || name : this.options.pane);
        },
        addInteractiveTarget: function(targetEl) {
          this._map._targets[stamp(targetEl)] = this;
          return this;
        },
        removeInteractiveTarget: function(targetEl) {
          delete this._map._targets[stamp(targetEl)];
          return this;
        },
        // @method getAttribution: String
        // Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
        getAttribution: function() {
          return this.options.attribution;
        },
        _layerAdd: function(e) {
          var map4 = e.target;
          if (!map4.hasLayer(this)) {
            return;
          }
          this._map = map4;
          this._zoomAnimated = map4._zoomAnimated;
          if (this.getEvents) {
            var events = this.getEvents();
            map4.on(events, this);
            this.once("remove", function() {
              map4.off(events, this);
            }, this);
          }
          this.onAdd(map4);
          this.fire("add");
          map4.fire("layeradd", { layer: this });
        }
      });
      Map2.include({
        // @method addLayer(layer: Layer): this
        // Adds the given layer to the map
        addLayer: function(layer) {
          if (!layer._layerAdd) {
            throw new Error("The provided object is not a Layer.");
          }
          var id2 = stamp(layer);
          if (this._layers[id2]) {
            return this;
          }
          this._layers[id2] = layer;
          layer._mapToAdd = this;
          if (layer.beforeAdd) {
            layer.beforeAdd(this);
          }
          this.whenReady(layer._layerAdd, layer);
          return this;
        },
        // @method removeLayer(layer: Layer): this
        // Removes the given layer from the map.
        removeLayer: function(layer) {
          var id2 = stamp(layer);
          if (!this._layers[id2]) {
            return this;
          }
          if (this._loaded) {
            layer.onRemove(this);
          }
          delete this._layers[id2];
          if (this._loaded) {
            this.fire("layerremove", { layer });
            layer.fire("remove");
          }
          layer._map = layer._mapToAdd = null;
          return this;
        },
        // @method hasLayer(layer: Layer): Boolean
        // Returns `true` if the given layer is currently added to the map
        hasLayer: function(layer) {
          return stamp(layer) in this._layers;
        },
        /* @method eachLayer(fn: Function, context?: Object): this
         * Iterates over the layers of the map, optionally specifying context of the iterator function.
         * ```
         * map.eachLayer(function(layer){
         *     layer.bindPopup('Hello');
         * });
         * ```
         */
        eachLayer: function(method, context) {
          for (var i2 in this._layers) {
            method.call(context, this._layers[i2]);
          }
          return this;
        },
        _addLayers: function(layers2) {
          layers2 = layers2 ? isArray(layers2) ? layers2 : [layers2] : [];
          for (var i2 = 0, len = layers2.length; i2 < len; i2++) {
            this.addLayer(layers2[i2]);
          }
        },
        _addZoomLimit: function(layer) {
          if (!isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
            this._zoomBoundLayers[stamp(layer)] = layer;
            this._updateZoomLevels();
          }
        },
        _removeZoomLimit: function(layer) {
          var id2 = stamp(layer);
          if (this._zoomBoundLayers[id2]) {
            delete this._zoomBoundLayers[id2];
            this._updateZoomLevels();
          }
        },
        _updateZoomLevels: function() {
          var minZoom = Infinity, maxZoom = -Infinity, oldZoomSpan = this._getZoomSpan();
          for (var i2 in this._zoomBoundLayers) {
            var options = this._zoomBoundLayers[i2].options;
            minZoom = options.minZoom === void 0 ? minZoom : Math.min(minZoom, options.minZoom);
            maxZoom = options.maxZoom === void 0 ? maxZoom : Math.max(maxZoom, options.maxZoom);
          }
          this._layersMaxZoom = maxZoom === -Infinity ? void 0 : maxZoom;
          this._layersMinZoom = minZoom === Infinity ? void 0 : minZoom;
          if (oldZoomSpan !== this._getZoomSpan()) {
            this.fire("zoomlevelschange");
          }
          if (this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom) {
            this.setZoom(this._layersMaxZoom);
          }
          if (this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom) {
            this.setZoom(this._layersMinZoom);
          }
        }
      });
      var LayerGroup = Layer.extend({
        initialize: function(layers2, options) {
          setOptions(this, options);
          this._layers = {};
          var i2, len;
          if (layers2) {
            for (i2 = 0, len = layers2.length; i2 < len; i2++) {
              this.addLayer(layers2[i2]);
            }
          }
        },
        // @method addLayer(layer: Layer): this
        // Adds the given layer to the group.
        addLayer: function(layer) {
          var id2 = this.getLayerId(layer);
          this._layers[id2] = layer;
          if (this._map) {
            this._map.addLayer(layer);
          }
          return this;
        },
        // @method removeLayer(layer: Layer): this
        // Removes the given layer from the group.
        // @alternative
        // @method removeLayer(id: Number): this
        // Removes the layer with the given internal ID from the group.
        removeLayer: function(layer) {
          var id2 = layer in this._layers ? layer : this.getLayerId(layer);
          if (this._map && this._layers[id2]) {
            this._map.removeLayer(this._layers[id2]);
          }
          delete this._layers[id2];
          return this;
        },
        // @method hasLayer(layer: Layer): Boolean
        // Returns `true` if the given layer is currently added to the group.
        // @alternative
        // @method hasLayer(id: Number): Boolean
        // Returns `true` if the given internal ID is currently added to the group.
        hasLayer: function(layer) {
          var layerId = typeof layer === "number" ? layer : this.getLayerId(layer);
          return layerId in this._layers;
        },
        // @method clearLayers(): this
        // Removes all the layers from the group.
        clearLayers: function() {
          return this.eachLayer(this.removeLayer, this);
        },
        // @method invoke(methodName: String, …): this
        // Calls `methodName` on every layer contained in this group, passing any
        // additional parameters. Has no effect if the layers contained do not
        // implement `methodName`.
        invoke: function(methodName) {
          var args = Array.prototype.slice.call(arguments, 1), i2, layer;
          for (i2 in this._layers) {
            layer = this._layers[i2];
            if (layer[methodName]) {
              layer[methodName].apply(layer, args);
            }
          }
          return this;
        },
        onAdd: function(map4) {
          this.eachLayer(map4.addLayer, map4);
        },
        onRemove: function(map4) {
          this.eachLayer(map4.removeLayer, map4);
        },
        // @method eachLayer(fn: Function, context?: Object): this
        // Iterates over the layers of the group, optionally specifying context of the iterator function.
        // ```js
        // group.eachLayer(function (layer) {
        // 	layer.bindPopup('Hello');
        // });
        // ```
        eachLayer: function(method, context) {
          for (var i2 in this._layers) {
            method.call(context, this._layers[i2]);
          }
          return this;
        },
        // @method getLayer(id: Number): Layer
        // Returns the layer with the given internal ID.
        getLayer: function(id2) {
          return this._layers[id2];
        },
        // @method getLayers(): Layer[]
        // Returns an array of all the layers added to the group.
        getLayers: function() {
          var layers2 = [];
          this.eachLayer(layers2.push, layers2);
          return layers2;
        },
        // @method setZIndex(zIndex: Number): this
        // Calls `setZIndex` on every layer contained in this group, passing the z-index.
        setZIndex: function(zIndex) {
          return this.invoke("setZIndex", zIndex);
        },
        // @method getLayerId(layer: Layer): Number
        // Returns the internal ID for a layer
        getLayerId: function(layer) {
          return stamp(layer);
        }
      });
      var layerGroup3 = function(layers2, options) {
        return new LayerGroup(layers2, options);
      };
      var FeatureGroup = LayerGroup.extend({
        addLayer: function(layer) {
          if (this.hasLayer(layer)) {
            return this;
          }
          layer.addEventParent(this);
          LayerGroup.prototype.addLayer.call(this, layer);
          return this.fire("layeradd", { layer });
        },
        removeLayer: function(layer) {
          if (!this.hasLayer(layer)) {
            return this;
          }
          if (layer in this._layers) {
            layer = this._layers[layer];
          }
          layer.removeEventParent(this);
          LayerGroup.prototype.removeLayer.call(this, layer);
          return this.fire("layerremove", { layer });
        },
        // @method setStyle(style: Path options): this
        // Sets the given path options to each layer of the group that has a `setStyle` method.
        setStyle: function(style2) {
          return this.invoke("setStyle", style2);
        },
        // @method bringToFront(): this
        // Brings the layer group to the top of all other layers
        bringToFront: function() {
          return this.invoke("bringToFront");
        },
        // @method bringToBack(): this
        // Brings the layer group to the back of all other layers
        bringToBack: function() {
          return this.invoke("bringToBack");
        },
        // @method getBounds(): LatLngBounds
        // Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
        getBounds: function() {
          var bounds = new LatLngBounds();
          for (var id2 in this._layers) {
            var layer = this._layers[id2];
            bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
          }
          return bounds;
        }
      });
      var featureGroup = function(layers2, options) {
        return new FeatureGroup(layers2, options);
      };
      var Icon = Class.extend({
        /* @section
         * @aka Icon options
         *
         * @option iconUrl: String = null
         * **(required)** The URL to the icon image (absolute or relative to your script path).
         *
         * @option iconRetinaUrl: String = null
         * The URL to a retina sized version of the icon image (absolute or relative to your
         * script path). Used for Retina screen devices.
         *
         * @option iconSize: Point = null
         * Size of the icon image in pixels.
         *
         * @option iconAnchor: Point = null
         * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
         * will be aligned so that this point is at the marker's geographical location. Centered
         * by default if size is specified, also can be set in CSS with negative margins.
         *
         * @option popupAnchor: Point = [0, 0]
         * The coordinates of the point from which popups will "open", relative to the icon anchor.
         *
         * @option tooltipAnchor: Point = [0, 0]
         * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
         *
         * @option shadowUrl: String = null
         * The URL to the icon shadow image. If not specified, no shadow image will be created.
         *
         * @option shadowRetinaUrl: String = null
         *
         * @option shadowSize: Point = null
         * Size of the shadow image in pixels.
         *
         * @option shadowAnchor: Point = null
         * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
         * as iconAnchor if not specified).
         *
         * @option className: String = ''
         * A custom class name to assign to both icon and shadow images. Empty by default.
         */
        options: {
          popupAnchor: [0, 0],
          tooltipAnchor: [0, 0],
          // @option crossOrigin: Boolean|String = false
          // Whether the crossOrigin attribute will be added to the tiles.
          // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
          // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
          crossOrigin: false
        },
        initialize: function(options) {
          setOptions(this, options);
        },
        // @method createIcon(oldIcon?: HTMLElement): HTMLElement
        // Called internally when the icon has to be shown, returns a `<img>` HTML element
        // styled according to the options.
        createIcon: function(oldIcon) {
          return this._createIcon("icon", oldIcon);
        },
        // @method createShadow(oldIcon?: HTMLElement): HTMLElement
        // As `createIcon`, but for the shadow beneath it.
        createShadow: function(oldIcon) {
          return this._createIcon("shadow", oldIcon);
        },
        _createIcon: function(name, oldIcon) {
          var src = this._getIconUrl(name);
          if (!src) {
            if (name === "icon") {
              throw new Error("iconUrl not set in Icon options (see the docs).");
            }
            return null;
          }
          var img = this._createImg(src, oldIcon && oldIcon.tagName === "IMG" ? oldIcon : null);
          this._setIconStyles(img, name);
          if (this.options.crossOrigin || this.options.crossOrigin === "") {
            img.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
          }
          return img;
        },
        _setIconStyles: function(img, name) {
          var options = this.options;
          var sizeOption = options[name + "Size"];
          if (typeof sizeOption === "number") {
            sizeOption = [sizeOption, sizeOption];
          }
          var size = toPoint(sizeOption), anchor = toPoint(name === "shadow" && options.shadowAnchor || options.iconAnchor || size && size.divideBy(2, true));
          img.className = "leaflet-marker-" + name + " " + (options.className || "");
          if (anchor) {
            img.style.marginLeft = -anchor.x + "px";
            img.style.marginTop = -anchor.y + "px";
          }
          if (size) {
            img.style.width = size.x + "px";
            img.style.height = size.y + "px";
          }
        },
        _createImg: function(src, el) {
          el = el || document.createElement("img");
          el.src = src;
          return el;
        },
        _getIconUrl: function(name) {
          return Browser.retina && this.options[name + "RetinaUrl"] || this.options[name + "Url"];
        }
      });
      function icon(options) {
        return new Icon(options);
      }
      var IconDefault = Icon.extend({
        options: {
          iconUrl: "marker-icon.png",
          iconRetinaUrl: "marker-icon-2x.png",
          shadowUrl: "marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41]
        },
        _getIconUrl: function(name) {
          if (typeof IconDefault.imagePath !== "string") {
            IconDefault.imagePath = this._detectIconPath();
          }
          return (this.options.imagePath || IconDefault.imagePath) + Icon.prototype._getIconUrl.call(this, name);
        },
        _stripUrl: function(path) {
          var strip = function(str, re2, idx) {
            var match = re2.exec(str);
            return match && match[idx];
          };
          path = strip(path, /^url\((['"])?(.+)\1\)$/, 2);
          return path && strip(path, /^(.*)marker-icon\.png$/, 1);
        },
        _detectIconPath: function() {
          var el = create$1("div", "leaflet-default-icon-path", document.body);
          var path = getStyle(el, "background-image") || getStyle(el, "backgroundImage");
          document.body.removeChild(el);
          path = this._stripUrl(path);
          if (path) {
            return path;
          }
          var link = document.querySelector('link[href$="leaflet.css"]');
          if (!link) {
            return "";
          }
          return link.href.substring(0, link.href.length - "leaflet.css".length - 1);
        }
      });
      var MarkerDrag = Handler.extend({
        initialize: function(marker3) {
          this._marker = marker3;
        },
        addHooks: function() {
          var icon2 = this._marker._icon;
          if (!this._draggable) {
            this._draggable = new Draggable(icon2, icon2, true);
          }
          this._draggable.on({
            dragstart: this._onDragStart,
            predrag: this._onPreDrag,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this).enable();
          addClass(icon2, "leaflet-marker-draggable");
        },
        removeHooks: function() {
          this._draggable.off({
            dragstart: this._onDragStart,
            predrag: this._onPreDrag,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this).disable();
          if (this._marker._icon) {
            removeClass(this._marker._icon, "leaflet-marker-draggable");
          }
        },
        moved: function() {
          return this._draggable && this._draggable._moved;
        },
        _adjustPan: function(e) {
          var marker3 = this._marker, map4 = marker3._map, speed = this._marker.options.autoPanSpeed, padding = this._marker.options.autoPanPadding, iconPos = getPosition(marker3._icon), bounds = map4.getPixelBounds(), origin = map4.getPixelOrigin();
          var panBounds = toBounds(
            bounds.min._subtract(origin).add(padding),
            bounds.max._subtract(origin).subtract(padding)
          );
          if (!panBounds.contains(iconPos)) {
            var movement = toPoint(
              (Math.max(panBounds.max.x, iconPos.x) - panBounds.max.x) / (bounds.max.x - panBounds.max.x) - (Math.min(panBounds.min.x, iconPos.x) - panBounds.min.x) / (bounds.min.x - panBounds.min.x),
              (Math.max(panBounds.max.y, iconPos.y) - panBounds.max.y) / (bounds.max.y - panBounds.max.y) - (Math.min(panBounds.min.y, iconPos.y) - panBounds.min.y) / (bounds.min.y - panBounds.min.y)
            ).multiplyBy(speed);
            map4.panBy(movement, { animate: false });
            this._draggable._newPos._add(movement);
            this._draggable._startPos._add(movement);
            setPosition(marker3._icon, this._draggable._newPos);
            this._onDrag(e);
            this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
          }
        },
        _onDragStart: function() {
          this._oldLatLng = this._marker.getLatLng();
          this._marker.closePopup && this._marker.closePopup();
          this._marker.fire("movestart").fire("dragstart");
        },
        _onPreDrag: function(e) {
          if (this._marker.options.autoPan) {
            cancelAnimFrame(this._panRequest);
            this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
          }
        },
        _onDrag: function(e) {
          var marker3 = this._marker, shadow = marker3._shadow, iconPos = getPosition(marker3._icon), latlng = marker3._map.layerPointToLatLng(iconPos);
          if (shadow) {
            setPosition(shadow, iconPos);
          }
          marker3._latlng = latlng;
          e.latlng = latlng;
          e.oldLatLng = this._oldLatLng;
          marker3.fire("move", e).fire("drag", e);
        },
        _onDragEnd: function(e) {
          cancelAnimFrame(this._panRequest);
          delete this._oldLatLng;
          this._marker.fire("moveend").fire("dragend", e);
        }
      });
      var Marker = Layer.extend({
        // @section
        // @aka Marker options
        options: {
          // @option icon: Icon = *
          // Icon instance to use for rendering the marker.
          // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
          // If not specified, a common instance of `L.Icon.Default` is used.
          icon: new IconDefault(),
          // Option inherited from "Interactive layer" abstract class
          interactive: true,
          // @option keyboard: Boolean = true
          // Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
          keyboard: true,
          // @option title: String = ''
          // Text for the browser tooltip that appear on marker hover (no tooltip by default).
          // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
          title: "",
          // @option alt: String = 'Marker'
          // Text for the `alt` attribute of the icon image.
          // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
          alt: "Marker",
          // @option zIndexOffset: Number = 0
          // By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
          zIndexOffset: 0,
          // @option opacity: Number = 1.0
          // The opacity of the marker.
          opacity: 1,
          // @option riseOnHover: Boolean = false
          // If `true`, the marker will get on top of others when you hover the mouse over it.
          riseOnHover: false,
          // @option riseOffset: Number = 250
          // The z-index offset used for the `riseOnHover` feature.
          riseOffset: 250,
          // @option pane: String = 'markerPane'
          // `Map pane` where the markers icon will be added.
          pane: "markerPane",
          // @option shadowPane: String = 'shadowPane'
          // `Map pane` where the markers shadow will be added.
          shadowPane: "shadowPane",
          // @option bubblingMouseEvents: Boolean = false
          // When `true`, a mouse event on this marker will trigger the same event on the map
          // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
          bubblingMouseEvents: false,
          // @option autoPanOnFocus: Boolean = true
          // When `true`, the map will pan whenever the marker is focused (via
          // e.g. pressing `tab` on the keyboard) to ensure the marker is
          // visible within the map's bounds
          autoPanOnFocus: true,
          // @section Draggable marker options
          // @option draggable: Boolean = false
          // Whether the marker is draggable with mouse/touch or not.
          draggable: false,
          // @option autoPan: Boolean = false
          // Whether to pan the map when dragging this marker near its edge or not.
          autoPan: false,
          // @option autoPanPadding: Point = Point(50, 50)
          // Distance (in pixels to the left/right and to the top/bottom) of the
          // map edge to start panning the map.
          autoPanPadding: [50, 50],
          // @option autoPanSpeed: Number = 10
          // Number of pixels the map should pan by.
          autoPanSpeed: 10
        },
        /* @section
         *
         * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
         */
        initialize: function(latlng, options) {
          setOptions(this, options);
          this._latlng = toLatLng(latlng);
        },
        onAdd: function(map4) {
          this._zoomAnimated = this._zoomAnimated && map4.options.markerZoomAnimation;
          if (this._zoomAnimated) {
            map4.on("zoomanim", this._animateZoom, this);
          }
          this._initIcon();
          this.update();
        },
        onRemove: function(map4) {
          if (this.dragging && this.dragging.enabled()) {
            this.options.draggable = true;
            this.dragging.removeHooks();
          }
          delete this.dragging;
          if (this._zoomAnimated) {
            map4.off("zoomanim", this._animateZoom, this);
          }
          this._removeIcon();
          this._removeShadow();
        },
        getEvents: function() {
          return {
            zoom: this.update,
            viewreset: this.update
          };
        },
        // @method getLatLng: LatLng
        // Returns the current geographical position of the marker.
        getLatLng: function() {
          return this._latlng;
        },
        // @method setLatLng(latlng: LatLng): this
        // Changes the marker position to the given point.
        setLatLng: function(latlng) {
          var oldLatLng = this._latlng;
          this._latlng = toLatLng(latlng);
          this.update();
          return this.fire("move", { oldLatLng, latlng: this._latlng });
        },
        // @method setZIndexOffset(offset: Number): this
        // Changes the [zIndex offset](#marker-zindexoffset) of the marker.
        setZIndexOffset: function(offset) {
          this.options.zIndexOffset = offset;
          return this.update();
        },
        // @method getIcon: Icon
        // Returns the current icon used by the marker
        getIcon: function() {
          return this.options.icon;
        },
        // @method setIcon(icon: Icon): this
        // Changes the marker icon.
        setIcon: function(icon2) {
          this.options.icon = icon2;
          if (this._map) {
            this._initIcon();
            this.update();
          }
          if (this._popup) {
            this.bindPopup(this._popup, this._popup.options);
          }
          return this;
        },
        getElement: function() {
          return this._icon;
        },
        update: function() {
          if (this._icon && this._map) {
            var pos = this._map.latLngToLayerPoint(this._latlng).round();
            this._setPos(pos);
          }
          return this;
        },
        _initIcon: function() {
          var options = this.options, classToAdd = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
          var icon2 = options.icon.createIcon(this._icon), addIcon = false;
          if (icon2 !== this._icon) {
            if (this._icon) {
              this._removeIcon();
            }
            addIcon = true;
            if (options.title) {
              icon2.title = options.title;
            }
            if (icon2.tagName === "IMG") {
              icon2.alt = options.alt || "";
            }
          }
          addClass(icon2, classToAdd);
          if (options.keyboard) {
            icon2.tabIndex = "0";
            icon2.setAttribute("role", "button");
          }
          this._icon = icon2;
          if (options.riseOnHover) {
            this.on({
              mouseover: this._bringToFront,
              mouseout: this._resetZIndex
            });
          }
          if (this.options.autoPanOnFocus) {
            on2(icon2, "focus", this._panOnFocus, this);
          }
          var newShadow = options.icon.createShadow(this._shadow), addShadow = false;
          if (newShadow !== this._shadow) {
            this._removeShadow();
            addShadow = true;
          }
          if (newShadow) {
            addClass(newShadow, classToAdd);
            newShadow.alt = "";
          }
          this._shadow = newShadow;
          if (options.opacity < 1) {
            this._updateOpacity();
          }
          if (addIcon) {
            this.getPane().appendChild(this._icon);
          }
          this._initInteraction();
          if (newShadow && addShadow) {
            this.getPane(options.shadowPane).appendChild(this._shadow);
          }
        },
        _removeIcon: function() {
          if (this.options.riseOnHover) {
            this.off({
              mouseover: this._bringToFront,
              mouseout: this._resetZIndex
            });
          }
          if (this.options.autoPanOnFocus) {
            off(this._icon, "focus", this._panOnFocus, this);
          }
          remove2(this._icon);
          this.removeInteractiveTarget(this._icon);
          this._icon = null;
        },
        _removeShadow: function() {
          if (this._shadow) {
            remove2(this._shadow);
          }
          this._shadow = null;
        },
        _setPos: function(pos) {
          if (this._icon) {
            setPosition(this._icon, pos);
          }
          if (this._shadow) {
            setPosition(this._shadow, pos);
          }
          this._zIndex = pos.y + this.options.zIndexOffset;
          this._resetZIndex();
        },
        _updateZIndex: function(offset) {
          if (this._icon) {
            this._icon.style.zIndex = this._zIndex + offset;
          }
        },
        _animateZoom: function(opt) {
          var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();
          this._setPos(pos);
        },
        _initInteraction: function() {
          if (!this.options.interactive) {
            return;
          }
          addClass(this._icon, "leaflet-interactive");
          this.addInteractiveTarget(this._icon);
          if (MarkerDrag) {
            var draggable = this.options.draggable;
            if (this.dragging) {
              draggable = this.dragging.enabled();
              this.dragging.disable();
            }
            this.dragging = new MarkerDrag(this);
            if (draggable) {
              this.dragging.enable();
            }
          }
        },
        // @method setOpacity(opacity: Number): this
        // Changes the opacity of the marker.
        setOpacity: function(opacity) {
          this.options.opacity = opacity;
          if (this._map) {
            this._updateOpacity();
          }
          return this;
        },
        _updateOpacity: function() {
          var opacity = this.options.opacity;
          if (this._icon) {
            setOpacity(this._icon, opacity);
          }
          if (this._shadow) {
            setOpacity(this._shadow, opacity);
          }
        },
        _bringToFront: function() {
          this._updateZIndex(this.options.riseOffset);
        },
        _resetZIndex: function() {
          this._updateZIndex(0);
        },
        _panOnFocus: function() {
          var map4 = this._map;
          if (!map4) {
            return;
          }
          var iconOpts = this.options.icon.options;
          var size = iconOpts.iconSize ? toPoint(iconOpts.iconSize) : toPoint(0, 0);
          var anchor = iconOpts.iconAnchor ? toPoint(iconOpts.iconAnchor) : toPoint(0, 0);
          map4.panInside(this._latlng, {
            paddingTopLeft: anchor,
            paddingBottomRight: size.subtract(anchor)
          });
        },
        _getPopupAnchor: function() {
          return this.options.icon.options.popupAnchor;
        },
        _getTooltipAnchor: function() {
          return this.options.icon.options.tooltipAnchor;
        }
      });
      function marker2(latlng, options) {
        return new Marker(latlng, options);
      }
      var Path = Layer.extend({
        // @section
        // @aka Path options
        options: {
          // @option stroke: Boolean = true
          // Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
          stroke: true,
          // @option color: String = '#3388ff'
          // Stroke color
          color: "#3388ff",
          // @option weight: Number = 3
          // Stroke width in pixels
          weight: 3,
          // @option opacity: Number = 1.0
          // Stroke opacity
          opacity: 1,
          // @option lineCap: String= 'round'
          // A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
          lineCap: "round",
          // @option lineJoin: String = 'round'
          // A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
          lineJoin: "round",
          // @option dashArray: String = null
          // A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
          dashArray: null,
          // @option dashOffset: String = null
          // A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
          dashOffset: null,
          // @option fill: Boolean = depends
          // Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
          fill: false,
          // @option fillColor: String = *
          // Fill color. Defaults to the value of the [`color`](#path-color) option
          fillColor: null,
          // @option fillOpacity: Number = 0.2
          // Fill opacity.
          fillOpacity: 0.2,
          // @option fillRule: String = 'evenodd'
          // A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
          fillRule: "evenodd",
          // className: '',
          // Option inherited from "Interactive layer" abstract class
          interactive: true,
          // @option bubblingMouseEvents: Boolean = true
          // When `true`, a mouse event on this path will trigger the same event on the map
          // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
          bubblingMouseEvents: true
        },
        beforeAdd: function(map4) {
          this._renderer = map4.getRenderer(this);
        },
        onAdd: function() {
          this._renderer._initPath(this);
          this._reset();
          this._renderer._addPath(this);
        },
        onRemove: function() {
          this._renderer._removePath(this);
        },
        // @method redraw(): this
        // Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
        redraw: function() {
          if (this._map) {
            this._renderer._updatePath(this);
          }
          return this;
        },
        // @method setStyle(style: Path options): this
        // Changes the appearance of a Path based on the options in the `Path options` object.
        setStyle: function(style2) {
          setOptions(this, style2);
          if (this._renderer) {
            this._renderer._updateStyle(this);
            if (this.options.stroke && style2 && Object.prototype.hasOwnProperty.call(style2, "weight")) {
              this._updateBounds();
            }
          }
          return this;
        },
        // @method bringToFront(): this
        // Brings the layer to the top of all path layers.
        bringToFront: function() {
          if (this._renderer) {
            this._renderer._bringToFront(this);
          }
          return this;
        },
        // @method bringToBack(): this
        // Brings the layer to the bottom of all path layers.
        bringToBack: function() {
          if (this._renderer) {
            this._renderer._bringToBack(this);
          }
          return this;
        },
        getElement: function() {
          return this._path;
        },
        _reset: function() {
          this._project();
          this._update();
        },
        _clickTolerance: function() {
          return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
        }
      });
      var CircleMarker = Path.extend({
        // @section
        // @aka CircleMarker options
        options: {
          fill: true,
          // @option radius: Number = 10
          // Radius of the circle marker, in pixels
          radius: 10
        },
        initialize: function(latlng, options) {
          setOptions(this, options);
          this._latlng = toLatLng(latlng);
          this._radius = this.options.radius;
        },
        // @method setLatLng(latLng: LatLng): this
        // Sets the position of a circle marker to a new location.
        setLatLng: function(latlng) {
          var oldLatLng = this._latlng;
          this._latlng = toLatLng(latlng);
          this.redraw();
          return this.fire("move", { oldLatLng, latlng: this._latlng });
        },
        // @method getLatLng(): LatLng
        // Returns the current geographical position of the circle marker
        getLatLng: function() {
          return this._latlng;
        },
        // @method setRadius(radius: Number): this
        // Sets the radius of a circle marker. Units are in pixels.
        setRadius: function(radius) {
          this.options.radius = this._radius = radius;
          return this.redraw();
        },
        // @method getRadius(): Number
        // Returns the current radius of the circle
        getRadius: function() {
          return this._radius;
        },
        setStyle: function(options) {
          var radius = options && options.radius || this._radius;
          Path.prototype.setStyle.call(this, options);
          this.setRadius(radius);
          return this;
        },
        _project: function() {
          this._point = this._map.latLngToLayerPoint(this._latlng);
          this._updateBounds();
        },
        _updateBounds: function() {
          var r = this._radius, r2 = this._radiusY || r, w = this._clickTolerance(), p = [r + w, r2 + w];
          this._pxBounds = new Bounds(this._point.subtract(p), this._point.add(p));
        },
        _update: function() {
          if (this._map) {
            this._updatePath();
          }
        },
        _updatePath: function() {
          this._renderer._updateCircle(this);
        },
        _empty: function() {
          return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(p) {
          return p.distanceTo(this._point) <= this._radius + this._clickTolerance();
        }
      });
      function circleMarker2(latlng, options) {
        return new CircleMarker(latlng, options);
      }
      var Circle = CircleMarker.extend({
        initialize: function(latlng, options, legacyOptions) {
          if (typeof options === "number") {
            options = extend2({}, legacyOptions, { radius: options });
          }
          setOptions(this, options);
          this._latlng = toLatLng(latlng);
          if (isNaN(this.options.radius)) {
            throw new Error("Circle radius cannot be NaN");
          }
          this._mRadius = this.options.radius;
        },
        // @method setRadius(radius: Number): this
        // Sets the radius of a circle. Units are in meters.
        setRadius: function(radius) {
          this._mRadius = radius;
          return this.redraw();
        },
        // @method getRadius(): Number
        // Returns the current radius of a circle. Units are in meters.
        getRadius: function() {
          return this._mRadius;
        },
        // @method getBounds(): LatLngBounds
        // Returns the `LatLngBounds` of the path.
        getBounds: function() {
          var half = [this._radius, this._radiusY || this._radius];
          return new LatLngBounds(
            this._map.layerPointToLatLng(this._point.subtract(half)),
            this._map.layerPointToLatLng(this._point.add(half))
          );
        },
        setStyle: Path.prototype.setStyle,
        _project: function() {
          var lng = this._latlng.lng, lat = this._latlng.lat, map4 = this._map, crs = map4.options.crs;
          if (crs.distance === Earth.distance) {
            var d = Math.PI / 180, latR = this._mRadius / Earth.R / d, top = map4.project([lat + latR, lng]), bottom = map4.project([lat - latR, lng]), p = top.add(bottom).divideBy(2), lat2 = map4.unproject(p).lat, lngR = Math.acos((Math.cos(latR * d) - Math.sin(lat * d) * Math.sin(lat2 * d)) / (Math.cos(lat * d) * Math.cos(lat2 * d))) / d;
            if (isNaN(lngR) || lngR === 0) {
              lngR = latR / Math.cos(Math.PI / 180 * lat);
            }
            this._point = p.subtract(map4.getPixelOrigin());
            this._radius = isNaN(lngR) ? 0 : p.x - map4.project([lat2, lng - lngR]).x;
            this._radiusY = p.y - top.y;
          } else {
            var latlng2 = crs.unproject(crs.project(this._latlng).subtract([this._mRadius, 0]));
            this._point = map4.latLngToLayerPoint(this._latlng);
            this._radius = this._point.x - map4.latLngToLayerPoint(latlng2).x;
          }
          this._updateBounds();
        }
      });
      function circle(latlng, options, legacyOptions) {
        return new Circle(latlng, options, legacyOptions);
      }
      var Polyline = Path.extend({
        // @section
        // @aka Polyline options
        options: {
          // @option smoothFactor: Number = 1.0
          // How much to simplify the polyline on each zoom level. More means
          // better performance and smoother look, and less means more accurate representation.
          smoothFactor: 1,
          // @option noClip: Boolean = false
          // Disable polyline clipping.
          noClip: false
        },
        initialize: function(latlngs, options) {
          setOptions(this, options);
          this._setLatLngs(latlngs);
        },
        // @method getLatLngs(): LatLng[]
        // Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
        getLatLngs: function() {
          return this._latlngs;
        },
        // @method setLatLngs(latlngs: LatLng[]): this
        // Replaces all the points in the polyline with the given array of geographical points.
        setLatLngs: function(latlngs) {
          this._setLatLngs(latlngs);
          return this.redraw();
        },
        // @method isEmpty(): Boolean
        // Returns `true` if the Polyline has no LatLngs.
        isEmpty: function() {
          return !this._latlngs.length;
        },
        // @method closestLayerPoint(p: Point): Point
        // Returns the point closest to `p` on the Polyline.
        closestLayerPoint: function(p) {
          var minDistance = Infinity, minPoint = null, closest = _sqClosestPointOnSegment, p1, p2;
          for (var j = 0, jLen = this._parts.length; j < jLen; j++) {
            var points = this._parts[j];
            for (var i2 = 1, len = points.length; i2 < len; i2++) {
              p1 = points[i2 - 1];
              p2 = points[i2];
              var sqDist = closest(p, p1, p2, true);
              if (sqDist < minDistance) {
                minDistance = sqDist;
                minPoint = closest(p, p1, p2);
              }
            }
          }
          if (minPoint) {
            minPoint.distance = Math.sqrt(minDistance);
          }
          return minPoint;
        },
        // @method getCenter(): LatLng
        // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
        getCenter: function() {
          if (!this._map) {
            throw new Error("Must add layer to map before using getCenter()");
          }
          return polylineCenter(this._defaultShape(), this._map.options.crs);
        },
        // @method getBounds(): LatLngBounds
        // Returns the `LatLngBounds` of the path.
        getBounds: function() {
          return this._bounds;
        },
        // @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
        // Adds a given point to the polyline. By default, adds to the first ring of
        // the polyline in case of a multi-polyline, but can be overridden by passing
        // a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
        addLatLng: function(latlng, latlngs) {
          latlngs = latlngs || this._defaultShape();
          latlng = toLatLng(latlng);
          latlngs.push(latlng);
          this._bounds.extend(latlng);
          return this.redraw();
        },
        _setLatLngs: function(latlngs) {
          this._bounds = new LatLngBounds();
          this._latlngs = this._convertLatLngs(latlngs);
        },
        _defaultShape: function() {
          return isFlat(this._latlngs) ? this._latlngs : this._latlngs[0];
        },
        // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
        _convertLatLngs: function(latlngs) {
          var result = [], flat = isFlat(latlngs);
          for (var i2 = 0, len = latlngs.length; i2 < len; i2++) {
            if (flat) {
              result[i2] = toLatLng(latlngs[i2]);
              this._bounds.extend(result[i2]);
            } else {
              result[i2] = this._convertLatLngs(latlngs[i2]);
            }
          }
          return result;
        },
        _project: function() {
          var pxBounds = new Bounds();
          this._rings = [];
          this._projectLatlngs(this._latlngs, this._rings, pxBounds);
          if (this._bounds.isValid() && pxBounds.isValid()) {
            this._rawPxBounds = pxBounds;
            this._updateBounds();
          }
        },
        _updateBounds: function() {
          var w = this._clickTolerance(), p = new Point(w, w);
          if (!this._rawPxBounds) {
            return;
          }
          this._pxBounds = new Bounds([
            this._rawPxBounds.min.subtract(p),
            this._rawPxBounds.max.add(p)
          ]);
        },
        // recursively turns latlngs into a set of rings with projected coordinates
        _projectLatlngs: function(latlngs, result, projectedBounds) {
          var flat = latlngs[0] instanceof LatLng, len = latlngs.length, i2, ring;
          if (flat) {
            ring = [];
            for (i2 = 0; i2 < len; i2++) {
              ring[i2] = this._map.latLngToLayerPoint(latlngs[i2]);
              projectedBounds.extend(ring[i2]);
            }
            result.push(ring);
          } else {
            for (i2 = 0; i2 < len; i2++) {
              this._projectLatlngs(latlngs[i2], result, projectedBounds);
            }
          }
        },
        // clip polyline by renderer bounds so that we have less to render for performance
        _clipPoints: function() {
          var bounds = this._renderer._bounds;
          this._parts = [];
          if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
            return;
          }
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          var parts2 = this._parts, i2, j, k, len, len2, segment, points;
          for (i2 = 0, k = 0, len = this._rings.length; i2 < len; i2++) {
            points = this._rings[i2];
            for (j = 0, len2 = points.length; j < len2 - 1; j++) {
              segment = clipSegment(points[j], points[j + 1], bounds, j, true);
              if (!segment) {
                continue;
              }
              parts2[k] = parts2[k] || [];
              parts2[k].push(segment[0]);
              if (segment[1] !== points[j + 1] || j === len2 - 2) {
                parts2[k].push(segment[1]);
                k++;
              }
            }
          }
        },
        // simplify each clipped part of the polyline for performance
        _simplifyPoints: function() {
          var parts2 = this._parts, tolerance = this.options.smoothFactor;
          for (var i2 = 0, len = parts2.length; i2 < len; i2++) {
            parts2[i2] = simplify(parts2[i2], tolerance);
          }
        },
        _update: function() {
          if (!this._map) {
            return;
          }
          this._clipPoints();
          this._simplifyPoints();
          this._updatePath();
        },
        _updatePath: function() {
          this._renderer._updatePoly(this);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(p, closed) {
          var i2, j, k, len, len2, part, w = this._clickTolerance();
          if (!this._pxBounds || !this._pxBounds.contains(p)) {
            return false;
          }
          for (i2 = 0, len = this._parts.length; i2 < len; i2++) {
            part = this._parts[i2];
            for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
              if (!closed && j === 0) {
                continue;
              }
              if (pointToSegmentDistance(p, part[k], part[j]) <= w) {
                return true;
              }
            }
          }
          return false;
        }
      });
      function polyline3(latlngs, options) {
        return new Polyline(latlngs, options);
      }
      Polyline._flat = _flat;
      var Polygon = Polyline.extend({
        options: {
          fill: true
        },
        isEmpty: function() {
          return !this._latlngs.length || !this._latlngs[0].length;
        },
        // @method getCenter(): LatLng
        // Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the Polygon.
        getCenter: function() {
          if (!this._map) {
            throw new Error("Must add layer to map before using getCenter()");
          }
          return polygonCenter(this._defaultShape(), this._map.options.crs);
        },
        _convertLatLngs: function(latlngs) {
          var result = Polyline.prototype._convertLatLngs.call(this, latlngs), len = result.length;
          if (len >= 2 && result[0] instanceof LatLng && result[0].equals(result[len - 1])) {
            result.pop();
          }
          return result;
        },
        _setLatLngs: function(latlngs) {
          Polyline.prototype._setLatLngs.call(this, latlngs);
          if (isFlat(this._latlngs)) {
            this._latlngs = [this._latlngs];
          }
        },
        _defaultShape: function() {
          return isFlat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
        },
        _clipPoints: function() {
          var bounds = this._renderer._bounds, w = this.options.weight, p = new Point(w, w);
          bounds = new Bounds(bounds.min.subtract(p), bounds.max.add(p));
          this._parts = [];
          if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
            return;
          }
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          for (var i2 = 0, len = this._rings.length, clipped; i2 < len; i2++) {
            clipped = clipPolygon(this._rings[i2], bounds, true);
            if (clipped.length) {
              this._parts.push(clipped);
            }
          }
        },
        _updatePath: function() {
          this._renderer._updatePoly(this, true);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(p) {
          var inside = false, part, p1, p2, i2, j, k, len, len2;
          if (!this._pxBounds || !this._pxBounds.contains(p)) {
            return false;
          }
          for (i2 = 0, len = this._parts.length; i2 < len; i2++) {
            part = this._parts[i2];
            for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
              p1 = part[j];
              p2 = part[k];
              if (p1.y > p.y !== p2.y > p.y && p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x) {
                inside = !inside;
              }
            }
          }
          return inside || Polyline.prototype._containsPoint.call(this, p, true);
        }
      });
      function polygon(latlngs, options) {
        return new Polygon(latlngs, options);
      }
      var GeoJSON = FeatureGroup.extend({
        /* @section
         * @aka GeoJSON options
         *
         * @option pointToLayer: Function = *
         * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
         * called when data is added, passing the GeoJSON point feature and its `LatLng`.
         * The default is to spawn a default `Marker`:
         * ```js
         * function(geoJsonPoint, latlng) {
         * 	return L.marker(latlng);
         * }
         * ```
         *
         * @option style: Function = *
         * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
         * called internally when data is added.
         * The default value is to not override any defaults:
         * ```js
         * function (geoJsonFeature) {
         * 	return {}
         * }
         * ```
         *
         * @option onEachFeature: Function = *
         * A `Function` that will be called once for each created `Feature`, after it has
         * been created and styled. Useful for attaching events and popups to features.
         * The default is to do nothing with the newly created layers:
         * ```js
         * function (feature, layer) {}
         * ```
         *
         * @option filter: Function = *
         * A `Function` that will be used to decide whether to include a feature or not.
         * The default is to include all features:
         * ```js
         * function (geoJsonFeature) {
         * 	return true;
         * }
         * ```
         * Note: dynamically changing the `filter` option will have effect only on newly
         * added data. It will _not_ re-evaluate already included features.
         *
         * @option coordsToLatLng: Function = *
         * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
         * The default is the `coordsToLatLng` static method.
         *
         * @option markersInheritOptions: Boolean = false
         * Whether default Markers for "Point" type Features inherit from group options.
         */
        initialize: function(geojson, options) {
          setOptions(this, options);
          this._layers = {};
          if (geojson) {
            this.addData(geojson);
          }
        },
        // @method addData( <GeoJSON> data ): this
        // Adds a GeoJSON object to the layer.
        addData: function(geojson) {
          var features = isArray(geojson) ? geojson : geojson.features, i2, len, feature;
          if (features) {
            for (i2 = 0, len = features.length; i2 < len; i2++) {
              feature = features[i2];
              if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
                this.addData(feature);
              }
            }
            return this;
          }
          var options = this.options;
          if (options.filter && !options.filter(geojson)) {
            return this;
          }
          var layer = geometryToLayer(geojson, options);
          if (!layer) {
            return this;
          }
          layer.feature = asFeature(geojson);
          layer.defaultOptions = layer.options;
          this.resetStyle(layer);
          if (options.onEachFeature) {
            options.onEachFeature(geojson, layer);
          }
          return this.addLayer(layer);
        },
        // @method resetStyle( <Path> layer? ): this
        // Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
        // If `layer` is omitted, the style of all features in the current layer is reset.
        resetStyle: function(layer) {
          if (layer === void 0) {
            return this.eachLayer(this.resetStyle, this);
          }
          layer.options = extend2({}, layer.defaultOptions);
          this._setLayerStyle(layer, this.options.style);
          return this;
        },
        // @method setStyle( <Function> style ): this
        // Changes styles of GeoJSON vector layers with the given style function.
        setStyle: function(style2) {
          return this.eachLayer(function(layer) {
            this._setLayerStyle(layer, style2);
          }, this);
        },
        _setLayerStyle: function(layer, style2) {
          if (layer.setStyle) {
            if (typeof style2 === "function") {
              style2 = style2(layer.feature);
            }
            layer.setStyle(style2);
          }
        }
      });
      function geometryToLayer(geojson, options) {
        var geometry = geojson.type === "Feature" ? geojson.geometry : geojson, coords = geometry ? geometry.coordinates : null, layers2 = [], pointToLayer = options && options.pointToLayer, _coordsToLatLng = options && options.coordsToLatLng || coordsToLatLng, latlng, latlngs, i2, len;
        if (!coords && !geometry) {
          return null;
        }
        switch (geometry.type) {
          case "Point":
            latlng = _coordsToLatLng(coords);
            return _pointToLayer(pointToLayer, geojson, latlng, options);
          case "MultiPoint":
            for (i2 = 0, len = coords.length; i2 < len; i2++) {
              latlng = _coordsToLatLng(coords[i2]);
              layers2.push(_pointToLayer(pointToLayer, geojson, latlng, options));
            }
            return new FeatureGroup(layers2);
          case "LineString":
          case "MultiLineString":
            latlngs = coordsToLatLngs(coords, geometry.type === "LineString" ? 0 : 1, _coordsToLatLng);
            return new Polyline(latlngs, options);
          case "Polygon":
          case "MultiPolygon":
            latlngs = coordsToLatLngs(coords, geometry.type === "Polygon" ? 1 : 2, _coordsToLatLng);
            return new Polygon(latlngs, options);
          case "GeometryCollection":
            for (i2 = 0, len = geometry.geometries.length; i2 < len; i2++) {
              var geoLayer = geometryToLayer({
                geometry: geometry.geometries[i2],
                type: "Feature",
                properties: geojson.properties
              }, options);
              if (geoLayer) {
                layers2.push(geoLayer);
              }
            }
            return new FeatureGroup(layers2);
          case "FeatureCollection":
            for (i2 = 0, len = geometry.features.length; i2 < len; i2++) {
              var featureLayer = geometryToLayer(geometry.features[i2], options);
              if (featureLayer) {
                layers2.push(featureLayer);
              }
            }
            return new FeatureGroup(layers2);
          default:
            throw new Error("Invalid GeoJSON object.");
        }
      }
      function _pointToLayer(pointToLayerFn, geojson, latlng, options) {
        return pointToLayerFn ? pointToLayerFn(geojson, latlng) : new Marker(latlng, options && options.markersInheritOptions && options);
      }
      function coordsToLatLng(coords) {
        return new LatLng(coords[1], coords[0], coords[2]);
      }
      function coordsToLatLngs(coords, levelsDeep, _coordsToLatLng) {
        var latlngs = [];
        for (var i2 = 0, len = coords.length, latlng; i2 < len; i2++) {
          latlng = levelsDeep ? coordsToLatLngs(coords[i2], levelsDeep - 1, _coordsToLatLng) : (_coordsToLatLng || coordsToLatLng)(coords[i2]);
          latlngs.push(latlng);
        }
        return latlngs;
      }
      function latLngToCoords(latlng, precision) {
        latlng = toLatLng(latlng);
        return latlng.alt !== void 0 ? [formatNum(latlng.lng, precision), formatNum(latlng.lat, precision), formatNum(latlng.alt, precision)] : [formatNum(latlng.lng, precision), formatNum(latlng.lat, precision)];
      }
      function latLngsToCoords(latlngs, levelsDeep, closed, precision) {
        var coords = [];
        for (var i2 = 0, len = latlngs.length; i2 < len; i2++) {
          coords.push(levelsDeep ? latLngsToCoords(latlngs[i2], isFlat(latlngs[i2]) ? 0 : levelsDeep - 1, closed, precision) : latLngToCoords(latlngs[i2], precision));
        }
        if (!levelsDeep && closed && coords.length > 0) {
          coords.push(coords[0].slice());
        }
        return coords;
      }
      function getFeature(layer, newGeometry) {
        return layer.feature ? extend2({}, layer.feature, { geometry: newGeometry }) : asFeature(newGeometry);
      }
      function asFeature(geojson) {
        if (geojson.type === "Feature" || geojson.type === "FeatureCollection") {
          return geojson;
        }
        return {
          type: "Feature",
          properties: {},
          geometry: geojson
        };
      }
      var PointToGeoJSON = {
        toGeoJSON: function(precision) {
          return getFeature(this, {
            type: "Point",
            coordinates: latLngToCoords(this.getLatLng(), precision)
          });
        }
      };
      Marker.include(PointToGeoJSON);
      Circle.include(PointToGeoJSON);
      CircleMarker.include(PointToGeoJSON);
      Polyline.include({
        toGeoJSON: function(precision) {
          var multi = !isFlat(this._latlngs);
          var coords = latLngsToCoords(this._latlngs, multi ? 1 : 0, false, precision);
          return getFeature(this, {
            type: (multi ? "Multi" : "") + "LineString",
            coordinates: coords
          });
        }
      });
      Polygon.include({
        toGeoJSON: function(precision) {
          var holes = !isFlat(this._latlngs), multi = holes && !isFlat(this._latlngs[0]);
          var coords = latLngsToCoords(this._latlngs, multi ? 2 : holes ? 1 : 0, true, precision);
          if (!holes) {
            coords = [coords];
          }
          return getFeature(this, {
            type: (multi ? "Multi" : "") + "Polygon",
            coordinates: coords
          });
        }
      });
      LayerGroup.include({
        toMultiPoint: function(precision) {
          var coords = [];
          this.eachLayer(function(layer) {
            coords.push(layer.toGeoJSON(precision).geometry.coordinates);
          });
          return getFeature(this, {
            type: "MultiPoint",
            coordinates: coords
          });
        },
        // @method toGeoJSON(precision?: Number|false): Object
        // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
        // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
        toGeoJSON: function(precision) {
          var type2 = this.feature && this.feature.geometry && this.feature.geometry.type;
          if (type2 === "MultiPoint") {
            return this.toMultiPoint(precision);
          }
          var isGeometryCollection = type2 === "GeometryCollection", jsons = [];
          this.eachLayer(function(layer) {
            if (layer.toGeoJSON) {
              var json = layer.toGeoJSON(precision);
              if (isGeometryCollection) {
                jsons.push(json.geometry);
              } else {
                var feature = asFeature(json);
                if (feature.type === "FeatureCollection") {
                  jsons.push.apply(jsons, feature.features);
                } else {
                  jsons.push(feature);
                }
              }
            }
          });
          if (isGeometryCollection) {
            return getFeature(this, {
              geometries: jsons,
              type: "GeometryCollection"
            });
          }
          return {
            type: "FeatureCollection",
            features: jsons
          };
        }
      });
      function geoJSON(geojson, options) {
        return new GeoJSON(geojson, options);
      }
      var geoJson = geoJSON;
      var ImageOverlay = Layer.extend({
        // @section
        // @aka ImageOverlay options
        options: {
          // @option opacity: Number = 1.0
          // The opacity of the image overlay.
          opacity: 1,
          // @option alt: String = ''
          // Text for the `alt` attribute of the image (useful for accessibility).
          alt: "",
          // @option interactive: Boolean = false
          // If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
          interactive: false,
          // @option crossOrigin: Boolean|String = false
          // Whether the crossOrigin attribute will be added to the image.
          // If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data.
          // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
          crossOrigin: false,
          // @option errorOverlayUrl: String = ''
          // URL to the overlay image to show in place of the overlay that failed to load.
          errorOverlayUrl: "",
          // @option zIndex: Number = 1
          // The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
          zIndex: 1,
          // @option className: String = ''
          // A custom class name to assign to the image. Empty by default.
          className: ""
        },
        initialize: function(url2, bounds, options) {
          this._url = url2;
          this._bounds = toLatLngBounds(bounds);
          setOptions(this, options);
        },
        onAdd: function() {
          if (!this._image) {
            this._initImage();
            if (this.options.opacity < 1) {
              this._updateOpacity();
            }
          }
          if (this.options.interactive) {
            addClass(this._image, "leaflet-interactive");
            this.addInteractiveTarget(this._image);
          }
          this.getPane().appendChild(this._image);
          this._reset();
        },
        onRemove: function() {
          remove2(this._image);
          if (this.options.interactive) {
            this.removeInteractiveTarget(this._image);
          }
        },
        // @method setOpacity(opacity: Number): this
        // Sets the opacity of the overlay.
        setOpacity: function(opacity) {
          this.options.opacity = opacity;
          if (this._image) {
            this._updateOpacity();
          }
          return this;
        },
        setStyle: function(styleOpts) {
          if (styleOpts.opacity) {
            this.setOpacity(styleOpts.opacity);
          }
          return this;
        },
        // @method bringToFront(): this
        // Brings the layer to the top of all overlays.
        bringToFront: function() {
          if (this._map) {
            toFront(this._image);
          }
          return this;
        },
        // @method bringToBack(): this
        // Brings the layer to the bottom of all overlays.
        bringToBack: function() {
          if (this._map) {
            toBack(this._image);
          }
          return this;
        },
        // @method setUrl(url: String): this
        // Changes the URL of the image.
        setUrl: function(url2) {
          this._url = url2;
          if (this._image) {
            this._image.src = url2;
          }
          return this;
        },
        // @method setBounds(bounds: LatLngBounds): this
        // Update the bounds that this ImageOverlay covers
        setBounds: function(bounds) {
          this._bounds = toLatLngBounds(bounds);
          if (this._map) {
            this._reset();
          }
          return this;
        },
        getEvents: function() {
          var events = {
            zoom: this._reset,
            viewreset: this._reset
          };
          if (this._zoomAnimated) {
            events.zoomanim = this._animateZoom;
          }
          return events;
        },
        // @method setZIndex(value: Number): this
        // Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
        setZIndex: function(value2) {
          this.options.zIndex = value2;
          this._updateZIndex();
          return this;
        },
        // @method getBounds(): LatLngBounds
        // Get the bounds that this ImageOverlay covers
        getBounds: function() {
          return this._bounds;
        },
        // @method getElement(): HTMLElement
        // Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
        // used by this overlay.
        getElement: function() {
          return this._image;
        },
        _initImage: function() {
          var wasElementSupplied = this._url.tagName === "IMG";
          var img = this._image = wasElementSupplied ? this._url : create$1("img");
          addClass(img, "leaflet-image-layer");
          if (this._zoomAnimated) {
            addClass(img, "leaflet-zoom-animated");
          }
          if (this.options.className) {
            addClass(img, this.options.className);
          }
          img.onselectstart = falseFn;
          img.onmousemove = falseFn;
          img.onload = bind(this.fire, this, "load");
          img.onerror = bind(this._overlayOnError, this, "error");
          if (this.options.crossOrigin || this.options.crossOrigin === "") {
            img.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
          }
          if (this.options.zIndex) {
            this._updateZIndex();
          }
          if (wasElementSupplied) {
            this._url = img.src;
            return;
          }
          img.src = this._url;
          img.alt = this.options.alt;
        },
        _animateZoom: function(e) {
          var scale2 = this._map.getZoomScale(e.zoom), offset = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;
          setTransform(this._image, offset, scale2);
        },
        _reset: function() {
          var image = this._image, bounds = new Bounds(
            this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
            this._map.latLngToLayerPoint(this._bounds.getSouthEast())
          ), size = bounds.getSize();
          setPosition(image, bounds.min);
          image.style.width = size.x + "px";
          image.style.height = size.y + "px";
        },
        _updateOpacity: function() {
          setOpacity(this._image, this.options.opacity);
        },
        _updateZIndex: function() {
          if (this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null) {
            this._image.style.zIndex = this.options.zIndex;
          }
        },
        _overlayOnError: function() {
          this.fire("error");
          var errorUrl = this.options.errorOverlayUrl;
          if (errorUrl && this._url !== errorUrl) {
            this._url = errorUrl;
            this._image.src = errorUrl;
          }
        },
        // @method getCenter(): LatLng
        // Returns the center of the ImageOverlay.
        getCenter: function() {
          return this._bounds.getCenter();
        }
      });
      var imageOverlay = function(url2, bounds, options) {
        return new ImageOverlay(url2, bounds, options);
      };
      var VideoOverlay = ImageOverlay.extend({
        // @section
        // @aka VideoOverlay options
        options: {
          // @option autoplay: Boolean = true
          // Whether the video starts playing automatically when loaded.
          // On some browsers autoplay will only work with `muted: true`
          autoplay: true,
          // @option loop: Boolean = true
          // Whether the video will loop back to the beginning when played.
          loop: true,
          // @option keepAspectRatio: Boolean = true
          // Whether the video will save aspect ratio after the projection.
          // Relevant for supported browsers. See [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
          keepAspectRatio: true,
          // @option muted: Boolean = false
          // Whether the video starts on mute when loaded.
          muted: false,
          // @option playsInline: Boolean = true
          // Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.
          playsInline: true
        },
        _initImage: function() {
          var wasElementSupplied = this._url.tagName === "VIDEO";
          var vid = this._image = wasElementSupplied ? this._url : create$1("video");
          addClass(vid, "leaflet-image-layer");
          if (this._zoomAnimated) {
            addClass(vid, "leaflet-zoom-animated");
          }
          if (this.options.className) {
            addClass(vid, this.options.className);
          }
          vid.onselectstart = falseFn;
          vid.onmousemove = falseFn;
          vid.onloadeddata = bind(this.fire, this, "load");
          if (wasElementSupplied) {
            var sourceElements = vid.getElementsByTagName("source");
            var sources = [];
            for (var j = 0; j < sourceElements.length; j++) {
              sources.push(sourceElements[j].src);
            }
            this._url = sourceElements.length > 0 ? sources : [vid.src];
            return;
          }
          if (!isArray(this._url)) {
            this._url = [this._url];
          }
          if (!this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(vid.style, "objectFit")) {
            vid.style["objectFit"] = "fill";
          }
          vid.autoplay = !!this.options.autoplay;
          vid.loop = !!this.options.loop;
          vid.muted = !!this.options.muted;
          vid.playsInline = !!this.options.playsInline;
          for (var i2 = 0; i2 < this._url.length; i2++) {
            var source = create$1("source");
            source.src = this._url[i2];
            vid.appendChild(source);
          }
        }
        // @method getElement(): HTMLVideoElement
        // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
        // used by this overlay.
      });
      function videoOverlay(video, bounds, options) {
        return new VideoOverlay(video, bounds, options);
      }
      var SVGOverlay = ImageOverlay.extend({
        _initImage: function() {
          var el = this._image = this._url;
          addClass(el, "leaflet-image-layer");
          if (this._zoomAnimated) {
            addClass(el, "leaflet-zoom-animated");
          }
          if (this.options.className) {
            addClass(el, this.options.className);
          }
          el.onselectstart = falseFn;
          el.onmousemove = falseFn;
        }
        // @method getElement(): SVGElement
        // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
        // used by this overlay.
      });
      function svgOverlay(el, bounds, options) {
        return new SVGOverlay(el, bounds, options);
      }
      var DivOverlay = Layer.extend({
        // @section
        // @aka DivOverlay options
        options: {
          // @option interactive: Boolean = false
          // If true, the popup/tooltip will listen to the mouse events.
          interactive: false,
          // @option offset: Point = Point(0, 0)
          // The offset of the overlay position.
          offset: [0, 0],
          // @option className: String = ''
          // A custom CSS class name to assign to the overlay.
          className: "",
          // @option pane: String = undefined
          // `Map pane` where the overlay will be added.
          pane: void 0,
          // @option content: String|HTMLElement|Function = ''
          // Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be
          // passed to the function. The function should return a `String` or `HTMLElement` to be used in the overlay.
          content: ""
        },
        initialize: function(options, source) {
          if (options && (options instanceof LatLng || isArray(options))) {
            this._latlng = toLatLng(options);
            setOptions(this, source);
          } else {
            setOptions(this, options);
            this._source = source;
          }
          if (this.options.content) {
            this._content = this.options.content;
          }
        },
        // @method openOn(map: Map): this
        // Adds the overlay to the map.
        // Alternative to `map.openPopup(popup)`/`.openTooltip(tooltip)`.
        openOn: function(map4) {
          map4 = arguments.length ? map4 : this._source._map;
          if (!map4.hasLayer(this)) {
            map4.addLayer(this);
          }
          return this;
        },
        // @method close(): this
        // Closes the overlay.
        // Alternative to `map.closePopup(popup)`/`.closeTooltip(tooltip)`
        // and `layer.closePopup()`/`.closeTooltip()`.
        close: function() {
          if (this._map) {
            this._map.removeLayer(this);
          }
          return this;
        },
        // @method toggle(layer?: Layer): this
        // Opens or closes the overlay bound to layer depending on its current state.
        // Argument may be omitted only for overlay bound to layer.
        // Alternative to `layer.togglePopup()`/`.toggleTooltip()`.
        toggle: function(layer) {
          if (this._map) {
            this.close();
          } else {
            if (arguments.length) {
              this._source = layer;
            } else {
              layer = this._source;
            }
            this._prepareOpen();
            this.openOn(layer._map);
          }
          return this;
        },
        onAdd: function(map4) {
          this._zoomAnimated = map4._zoomAnimated;
          if (!this._container) {
            this._initLayout();
          }
          if (map4._fadeAnimated) {
            setOpacity(this._container, 0);
          }
          clearTimeout(this._removeTimeout);
          this.getPane().appendChild(this._container);
          this.update();
          if (map4._fadeAnimated) {
            setOpacity(this._container, 1);
          }
          this.bringToFront();
          if (this.options.interactive) {
            addClass(this._container, "leaflet-interactive");
            this.addInteractiveTarget(this._container);
          }
        },
        onRemove: function(map4) {
          if (map4._fadeAnimated) {
            setOpacity(this._container, 0);
            this._removeTimeout = setTimeout(bind(remove2, void 0, this._container), 200);
          } else {
            remove2(this._container);
          }
          if (this.options.interactive) {
            removeClass(this._container, "leaflet-interactive");
            this.removeInteractiveTarget(this._container);
          }
        },
        // @namespace DivOverlay
        // @method getLatLng: LatLng
        // Returns the geographical point of the overlay.
        getLatLng: function() {
          return this._latlng;
        },
        // @method setLatLng(latlng: LatLng): this
        // Sets the geographical point where the overlay will open.
        setLatLng: function(latlng) {
          this._latlng = toLatLng(latlng);
          if (this._map) {
            this._updatePosition();
            this._adjustPan();
          }
          return this;
        },
        // @method getContent: String|HTMLElement
        // Returns the content of the overlay.
        getContent: function() {
          return this._content;
        },
        // @method setContent(htmlContent: String|HTMLElement|Function): this
        // Sets the HTML content of the overlay. If a function is passed the source layer will be passed to the function.
        // The function should return a `String` or `HTMLElement` to be used in the overlay.
        setContent: function(content) {
          this._content = content;
          this.update();
          return this;
        },
        // @method getElement: String|HTMLElement
        // Returns the HTML container of the overlay.
        getElement: function() {
          return this._container;
        },
        // @method update: null
        // Updates the overlay content, layout and position. Useful for updating the overlay after something inside changed, e.g. image loaded.
        update: function() {
          if (!this._map) {
            return;
          }
          this._container.style.visibility = "hidden";
          this._updateContent();
          this._updateLayout();
          this._updatePosition();
          this._container.style.visibility = "";
          this._adjustPan();
        },
        getEvents: function() {
          var events = {
            zoom: this._updatePosition,
            viewreset: this._updatePosition
          };
          if (this._zoomAnimated) {
            events.zoomanim = this._animateZoom;
          }
          return events;
        },
        // @method isOpen: Boolean
        // Returns `true` when the overlay is visible on the map.
        isOpen: function() {
          return !!this._map && this._map.hasLayer(this);
        },
        // @method bringToFront: this
        // Brings this overlay in front of other overlays (in the same map pane).
        bringToFront: function() {
          if (this._map) {
            toFront(this._container);
          }
          return this;
        },
        // @method bringToBack: this
        // Brings this overlay to the back of other overlays (in the same map pane).
        bringToBack: function() {
          if (this._map) {
            toBack(this._container);
          }
          return this;
        },
        // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
        _prepareOpen: function(latlng) {
          var source = this._source;
          if (!source._map) {
            return false;
          }
          if (source instanceof FeatureGroup) {
            source = null;
            var layers2 = this._source._layers;
            for (var id2 in layers2) {
              if (layers2[id2]._map) {
                source = layers2[id2];
                break;
              }
            }
            if (!source) {
              return false;
            }
            this._source = source;
          }
          if (!latlng) {
            if (source.getCenter) {
              latlng = source.getCenter();
            } else if (source.getLatLng) {
              latlng = source.getLatLng();
            } else if (source.getBounds) {
              latlng = source.getBounds().getCenter();
            } else {
              throw new Error("Unable to get source layer LatLng.");
            }
          }
          this.setLatLng(latlng);
          if (this._map) {
            this.update();
          }
          return true;
        },
        _updateContent: function() {
          if (!this._content) {
            return;
          }
          var node = this._contentNode;
          var content = typeof this._content === "function" ? this._content(this._source || this) : this._content;
          if (typeof content === "string") {
            node.innerHTML = content;
          } else {
            while (node.hasChildNodes()) {
              node.removeChild(node.firstChild);
            }
            node.appendChild(content);
          }
          this.fire("contentupdate");
        },
        _updatePosition: function() {
          if (!this._map) {
            return;
          }
          var pos = this._map.latLngToLayerPoint(this._latlng), offset = toPoint(this.options.offset), anchor = this._getAnchor();
          if (this._zoomAnimated) {
            setPosition(this._container, pos.add(anchor));
          } else {
            offset = offset.add(pos).add(anchor);
          }
          var bottom = this._containerBottom = -offset.y, left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;
          this._container.style.bottom = bottom + "px";
          this._container.style.left = left + "px";
        },
        _getAnchor: function() {
          return [0, 0];
        }
      });
      Map2.include({
        _initOverlay: function(OverlayClass, content, latlng, options) {
          var overlay = content;
          if (!(overlay instanceof OverlayClass)) {
            overlay = new OverlayClass(options).setContent(content);
          }
          if (latlng) {
            overlay.setLatLng(latlng);
          }
          return overlay;
        }
      });
      Layer.include({
        _initOverlay: function(OverlayClass, old, content, options) {
          var overlay = content;
          if (overlay instanceof OverlayClass) {
            setOptions(overlay, options);
            overlay._source = this;
          } else {
            overlay = old && !options ? old : new OverlayClass(options, this);
            overlay.setContent(content);
          }
          return overlay;
        }
      });
      var Popup = DivOverlay.extend({
        // @section
        // @aka Popup options
        options: {
          // @option pane: String = 'popupPane'
          // `Map pane` where the popup will be added.
          pane: "popupPane",
          // @option offset: Point = Point(0, 7)
          // The offset of the popup position.
          offset: [0, 7],
          // @option maxWidth: Number = 300
          // Max width of the popup, in pixels.
          maxWidth: 300,
          // @option minWidth: Number = 50
          // Min width of the popup, in pixels.
          minWidth: 50,
          // @option maxHeight: Number = null
          // If set, creates a scrollable container of the given height
          // inside a popup if its content exceeds it.
          // The scrollable container can be styled using the
          // `leaflet-popup-scrolled` CSS class selector.
          maxHeight: null,
          // @option autoPan: Boolean = true
          // Set it to `false` if you don't want the map to do panning animation
          // to fit the opened popup.
          autoPan: true,
          // @option autoPanPaddingTopLeft: Point = null
          // The margin between the popup and the top left corner of the map
          // view after autopanning was performed.
          autoPanPaddingTopLeft: null,
          // @option autoPanPaddingBottomRight: Point = null
          // The margin between the popup and the bottom right corner of the map
          // view after autopanning was performed.
          autoPanPaddingBottomRight: null,
          // @option autoPanPadding: Point = Point(5, 5)
          // Equivalent of setting both top left and bottom right autopan padding to the same value.
          autoPanPadding: [5, 5],
          // @option keepInView: Boolean = false
          // Set it to `true` if you want to prevent users from panning the popup
          // off of the screen while it is open.
          keepInView: false,
          // @option closeButton: Boolean = true
          // Controls the presence of a close button in the popup.
          closeButton: true,
          // @option autoClose: Boolean = true
          // Set it to `false` if you want to override the default behavior of
          // the popup closing when another popup is opened.
          autoClose: true,
          // @option closeOnEscapeKey: Boolean = true
          // Set it to `false` if you want to override the default behavior of
          // the ESC key for closing of the popup.
          closeOnEscapeKey: true,
          // @option closeOnClick: Boolean = *
          // Set it if you want to override the default behavior of the popup closing when user clicks
          // on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.
          // @option className: String = ''
          // A custom CSS class name to assign to the popup.
          className: ""
        },
        // @namespace Popup
        // @method openOn(map: Map): this
        // Alternative to `map.openPopup(popup)`.
        // Adds the popup to the map and closes the previous one.
        openOn: function(map4) {
          map4 = arguments.length ? map4 : this._source._map;
          if (!map4.hasLayer(this) && map4._popup && map4._popup.options.autoClose) {
            map4.removeLayer(map4._popup);
          }
          map4._popup = this;
          return DivOverlay.prototype.openOn.call(this, map4);
        },
        onAdd: function(map4) {
          DivOverlay.prototype.onAdd.call(this, map4);
          map4.fire("popupopen", { popup: this });
          if (this._source) {
            this._source.fire("popupopen", { popup: this }, true);
            if (!(this._source instanceof Path)) {
              this._source.on("preclick", stopPropagation);
            }
          }
        },
        onRemove: function(map4) {
          DivOverlay.prototype.onRemove.call(this, map4);
          map4.fire("popupclose", { popup: this });
          if (this._source) {
            this._source.fire("popupclose", { popup: this }, true);
            if (!(this._source instanceof Path)) {
              this._source.off("preclick", stopPropagation);
            }
          }
        },
        getEvents: function() {
          var events = DivOverlay.prototype.getEvents.call(this);
          if (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
            events.preclick = this.close;
          }
          if (this.options.keepInView) {
            events.moveend = this._adjustPan;
          }
          return events;
        },
        _initLayout: function() {
          var prefix = "leaflet-popup", container = this._container = create$1(
            "div",
            prefix + " " + (this.options.className || "") + " leaflet-zoom-animated"
          );
          var wrapper = this._wrapper = create$1("div", prefix + "-content-wrapper", container);
          this._contentNode = create$1("div", prefix + "-content", wrapper);
          disableClickPropagation(container);
          disableScrollPropagation(this._contentNode);
          on2(container, "contextmenu", stopPropagation);
          this._tipContainer = create$1("div", prefix + "-tip-container", container);
          this._tip = create$1("div", prefix + "-tip", this._tipContainer);
          if (this.options.closeButton) {
            var closeButton = this._closeButton = create$1("a", prefix + "-close-button", container);
            closeButton.setAttribute("role", "button");
            closeButton.setAttribute("aria-label", "Close popup");
            closeButton.href = "#close";
            closeButton.innerHTML = '<span aria-hidden="true">&#215;</span>';
            on2(closeButton, "click", function(ev) {
              preventDefault(ev);
              this.close();
            }, this);
          }
        },
        _updateLayout: function() {
          var container = this._contentNode, style2 = container.style;
          style2.width = "";
          style2.whiteSpace = "nowrap";
          var width = container.offsetWidth;
          width = Math.min(width, this.options.maxWidth);
          width = Math.max(width, this.options.minWidth);
          style2.width = width + 1 + "px";
          style2.whiteSpace = "";
          style2.height = "";
          var height = container.offsetHeight, maxHeight = this.options.maxHeight, scrolledClass = "leaflet-popup-scrolled";
          if (maxHeight && height > maxHeight) {
            style2.height = maxHeight + "px";
            addClass(container, scrolledClass);
          } else {
            removeClass(container, scrolledClass);
          }
          this._containerWidth = this._container.offsetWidth;
        },
        _animateZoom: function(e) {
          var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center), anchor = this._getAnchor();
          setPosition(this._container, pos.add(anchor));
        },
        _adjustPan: function() {
          if (!this.options.autoPan) {
            return;
          }
          if (this._map._panAnim) {
            this._map._panAnim.stop();
          }
          if (this._autopanning) {
            this._autopanning = false;
            return;
          }
          var map4 = this._map, marginBottom = parseInt(getStyle(this._container, "marginBottom"), 10) || 0, containerHeight = this._container.offsetHeight + marginBottom, containerWidth = this._containerWidth, layerPos = new Point(this._containerLeft, -containerHeight - this._containerBottom);
          layerPos._add(getPosition(this._container));
          var containerPos = map4.layerPointToContainerPoint(layerPos), padding = toPoint(this.options.autoPanPadding), paddingTL = toPoint(this.options.autoPanPaddingTopLeft || padding), paddingBR = toPoint(this.options.autoPanPaddingBottomRight || padding), size = map4.getSize(), dx = 0, dy = 0;
          if (containerPos.x + containerWidth + paddingBR.x > size.x) {
            dx = containerPos.x + containerWidth - size.x + paddingBR.x;
          }
          if (containerPos.x - dx - paddingTL.x < 0) {
            dx = containerPos.x - paddingTL.x;
          }
          if (containerPos.y + containerHeight + paddingBR.y > size.y) {
            dy = containerPos.y + containerHeight - size.y + paddingBR.y;
          }
          if (containerPos.y - dy - paddingTL.y < 0) {
            dy = containerPos.y - paddingTL.y;
          }
          if (dx || dy) {
            if (this.options.keepInView) {
              this._autopanning = true;
            }
            map4.fire("autopanstart").panBy([dx, dy]);
          }
        },
        _getAnchor: function() {
          return toPoint(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
        }
      });
      var popup = function(options, source) {
        return new Popup(options, source);
      };
      Map2.mergeOptions({
        closePopupOnClick: true
      });
      Map2.include({
        // @method openPopup(popup: Popup): this
        // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
        // @alternative
        // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
        // Creates a popup with the specified content and options and opens it in the given point on a map.
        openPopup: function(popup2, latlng, options) {
          this._initOverlay(Popup, popup2, latlng, options).openOn(this);
          return this;
        },
        // @method closePopup(popup?: Popup): this
        // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
        closePopup: function(popup2) {
          popup2 = arguments.length ? popup2 : this._popup;
          if (popup2) {
            popup2.close();
          }
          return this;
        }
      });
      Layer.include({
        // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
        // Binds a popup to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindPopup: function(content, options) {
          this._popup = this._initOverlay(Popup, this._popup, content, options);
          if (!this._popupHandlersAdded) {
            this.on({
              click: this._openPopup,
              keypress: this._onKeyPress,
              remove: this.closePopup,
              move: this._movePopup
            });
            this._popupHandlersAdded = true;
          }
          return this;
        },
        // @method unbindPopup(): this
        // Removes the popup previously bound with `bindPopup`.
        unbindPopup: function() {
          if (this._popup) {
            this.off({
              click: this._openPopup,
              keypress: this._onKeyPress,
              remove: this.closePopup,
              move: this._movePopup
            });
            this._popupHandlersAdded = false;
            this._popup = null;
          }
          return this;
        },
        // @method openPopup(latlng?: LatLng): this
        // Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
        openPopup: function(latlng) {
          if (this._popup) {
            if (!(this instanceof FeatureGroup)) {
              this._popup._source = this;
            }
            if (this._popup._prepareOpen(latlng || this._latlng)) {
              this._popup.openOn(this._map);
            }
          }
          return this;
        },
        // @method closePopup(): this
        // Closes the popup bound to this layer if it is open.
        closePopup: function() {
          if (this._popup) {
            this._popup.close();
          }
          return this;
        },
        // @method togglePopup(): this
        // Opens or closes the popup bound to this layer depending on its current state.
        togglePopup: function() {
          if (this._popup) {
            this._popup.toggle(this);
          }
          return this;
        },
        // @method isPopupOpen(): boolean
        // Returns `true` if the popup bound to this layer is currently open.
        isPopupOpen: function() {
          return this._popup ? this._popup.isOpen() : false;
        },
        // @method setPopupContent(content: String|HTMLElement|Popup): this
        // Sets the content of the popup bound to this layer.
        setPopupContent: function(content) {
          if (this._popup) {
            this._popup.setContent(content);
          }
          return this;
        },
        // @method getPopup(): Popup
        // Returns the popup bound to this layer.
        getPopup: function() {
          return this._popup;
        },
        _openPopup: function(e) {
          if (!this._popup || !this._map) {
            return;
          }
          stop(e);
          var target = e.layer || e.target;
          if (this._popup._source === target && !(target instanceof Path)) {
            if (this._map.hasLayer(this._popup)) {
              this.closePopup();
            } else {
              this.openPopup(e.latlng);
            }
            return;
          }
          this._popup._source = target;
          this.openPopup(e.latlng);
        },
        _movePopup: function(e) {
          this._popup.setLatLng(e.latlng);
        },
        _onKeyPress: function(e) {
          if (e.originalEvent.keyCode === 13) {
            this._openPopup(e);
          }
        }
      });
      var Tooltip = DivOverlay.extend({
        // @section
        // @aka Tooltip options
        options: {
          // @option pane: String = 'tooltipPane'
          // `Map pane` where the tooltip will be added.
          pane: "tooltipPane",
          // @option offset: Point = Point(0, 0)
          // Optional offset of the tooltip position.
          offset: [0, 0],
          // @option direction: String = 'auto'
          // Direction where to open the tooltip. Possible values are: `right`, `left`,
          // `top`, `bottom`, `center`, `auto`.
          // `auto` will dynamically switch between `right` and `left` according to the tooltip
          // position on the map.
          direction: "auto",
          // @option permanent: Boolean = false
          // Whether to open the tooltip permanently or only on mouseover.
          permanent: false,
          // @option sticky: Boolean = false
          // If true, the tooltip will follow the mouse instead of being fixed at the feature center.
          sticky: false,
          // @option opacity: Number = 0.9
          // Tooltip container opacity.
          opacity: 0.9
        },
        onAdd: function(map4) {
          DivOverlay.prototype.onAdd.call(this, map4);
          this.setOpacity(this.options.opacity);
          map4.fire("tooltipopen", { tooltip: this });
          if (this._source) {
            this.addEventParent(this._source);
            this._source.fire("tooltipopen", { tooltip: this }, true);
          }
        },
        onRemove: function(map4) {
          DivOverlay.prototype.onRemove.call(this, map4);
          map4.fire("tooltipclose", { tooltip: this });
          if (this._source) {
            this.removeEventParent(this._source);
            this._source.fire("tooltipclose", { tooltip: this }, true);
          }
        },
        getEvents: function() {
          var events = DivOverlay.prototype.getEvents.call(this);
          if (!this.options.permanent) {
            events.preclick = this.close;
          }
          return events;
        },
        _initLayout: function() {
          var prefix = "leaflet-tooltip", className = prefix + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
          this._contentNode = this._container = create$1("div", className);
          this._container.setAttribute("role", "tooltip");
          this._container.setAttribute("id", "leaflet-tooltip-" + stamp(this));
        },
        _updateLayout: function() {
        },
        _adjustPan: function() {
        },
        _setPosition: function(pos) {
          var subX, subY, map4 = this._map, container = this._container, centerPoint = map4.latLngToContainerPoint(map4.getCenter()), tooltipPoint = map4.layerPointToContainerPoint(pos), direction = this.options.direction, tooltipWidth = container.offsetWidth, tooltipHeight = container.offsetHeight, offset = toPoint(this.options.offset), anchor = this._getAnchor();
          if (direction === "top") {
            subX = tooltipWidth / 2;
            subY = tooltipHeight;
          } else if (direction === "bottom") {
            subX = tooltipWidth / 2;
            subY = 0;
          } else if (direction === "center") {
            subX = tooltipWidth / 2;
            subY = tooltipHeight / 2;
          } else if (direction === "right") {
            subX = 0;
            subY = tooltipHeight / 2;
          } else if (direction === "left") {
            subX = tooltipWidth;
            subY = tooltipHeight / 2;
          } else if (tooltipPoint.x < centerPoint.x) {
            direction = "right";
            subX = 0;
            subY = tooltipHeight / 2;
          } else {
            direction = "left";
            subX = tooltipWidth + (offset.x + anchor.x) * 2;
            subY = tooltipHeight / 2;
          }
          pos = pos.subtract(toPoint(subX, subY, true)).add(offset).add(anchor);
          removeClass(container, "leaflet-tooltip-right");
          removeClass(container, "leaflet-tooltip-left");
          removeClass(container, "leaflet-tooltip-top");
          removeClass(container, "leaflet-tooltip-bottom");
          addClass(container, "leaflet-tooltip-" + direction);
          setPosition(container, pos);
        },
        _updatePosition: function() {
          var pos = this._map.latLngToLayerPoint(this._latlng);
          this._setPosition(pos);
        },
        setOpacity: function(opacity) {
          this.options.opacity = opacity;
          if (this._container) {
            setOpacity(this._container, opacity);
          }
        },
        _animateZoom: function(e) {
          var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
          this._setPosition(pos);
        },
        _getAnchor: function() {
          return toPoint(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
        }
      });
      var tooltip = function(options, source) {
        return new Tooltip(options, source);
      };
      Map2.include({
        // @method openTooltip(tooltip: Tooltip): this
        // Opens the specified tooltip.
        // @alternative
        // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
        // Creates a tooltip with the specified content and options and open it.
        openTooltip: function(tooltip2, latlng, options) {
          this._initOverlay(Tooltip, tooltip2, latlng, options).openOn(this);
          return this;
        },
        // @method closeTooltip(tooltip: Tooltip): this
        // Closes the tooltip given as parameter.
        closeTooltip: function(tooltip2) {
          tooltip2.close();
          return this;
        }
      });
      Layer.include({
        // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
        // Binds a tooltip to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindTooltip: function(content, options) {
          if (this._tooltip && this.isTooltipOpen()) {
            this.unbindTooltip();
          }
          this._tooltip = this._initOverlay(Tooltip, this._tooltip, content, options);
          this._initTooltipInteractions();
          if (this._tooltip.options.permanent && this._map && this._map.hasLayer(this)) {
            this.openTooltip();
          }
          return this;
        },
        // @method unbindTooltip(): this
        // Removes the tooltip previously bound with `bindTooltip`.
        unbindTooltip: function() {
          if (this._tooltip) {
            this._initTooltipInteractions(true);
            this.closeTooltip();
            this._tooltip = null;
          }
          return this;
        },
        _initTooltipInteractions: function(remove3) {
          if (!remove3 && this._tooltipHandlersAdded) {
            return;
          }
          var onOff = remove3 ? "off" : "on", events = {
            remove: this.closeTooltip,
            move: this._moveTooltip
          };
          if (!this._tooltip.options.permanent) {
            events.mouseover = this._openTooltip;
            events.mouseout = this.closeTooltip;
            events.click = this._openTooltip;
            if (this._map) {
              this._addFocusListeners();
            } else {
              events.add = this._addFocusListeners;
            }
          } else {
            events.add = this._openTooltip;
          }
          if (this._tooltip.options.sticky) {
            events.mousemove = this._moveTooltip;
          }
          this[onOff](events);
          this._tooltipHandlersAdded = !remove3;
        },
        // @method openTooltip(latlng?: LatLng): this
        // Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
        openTooltip: function(latlng) {
          if (this._tooltip) {
            if (!(this instanceof FeatureGroup)) {
              this._tooltip._source = this;
            }
            if (this._tooltip._prepareOpen(latlng)) {
              this._tooltip.openOn(this._map);
              if (this.getElement) {
                this._setAriaDescribedByOnLayer(this);
              } else if (this.eachLayer) {
                this.eachLayer(this._setAriaDescribedByOnLayer, this);
              }
            }
          }
          return this;
        },
        // @method closeTooltip(): this
        // Closes the tooltip bound to this layer if it is open.
        closeTooltip: function() {
          if (this._tooltip) {
            return this._tooltip.close();
          }
        },
        // @method toggleTooltip(): this
        // Opens or closes the tooltip bound to this layer depending on its current state.
        toggleTooltip: function() {
          if (this._tooltip) {
            this._tooltip.toggle(this);
          }
          return this;
        },
        // @method isTooltipOpen(): boolean
        // Returns `true` if the tooltip bound to this layer is currently open.
        isTooltipOpen: function() {
          return this._tooltip.isOpen();
        },
        // @method setTooltipContent(content: String|HTMLElement|Tooltip): this
        // Sets the content of the tooltip bound to this layer.
        setTooltipContent: function(content) {
          if (this._tooltip) {
            this._tooltip.setContent(content);
          }
          return this;
        },
        // @method getTooltip(): Tooltip
        // Returns the tooltip bound to this layer.
        getTooltip: function() {
          return this._tooltip;
        },
        _addFocusListeners: function() {
          if (this.getElement) {
            this._addFocusListenersOnLayer(this);
          } else if (this.eachLayer) {
            this.eachLayer(this._addFocusListenersOnLayer, this);
          }
        },
        _addFocusListenersOnLayer: function(layer) {
          var el = typeof layer.getElement === "function" && layer.getElement();
          if (el) {
            on2(el, "focus", function() {
              this._tooltip._source = layer;
              this.openTooltip();
            }, this);
            on2(el, "blur", this.closeTooltip, this);
          }
        },
        _setAriaDescribedByOnLayer: function(layer) {
          var el = typeof layer.getElement === "function" && layer.getElement();
          if (el) {
            el.setAttribute("aria-describedby", this._tooltip._container.id);
          }
        },
        _openTooltip: function(e) {
          if (!this._tooltip || !this._map) {
            return;
          }
          if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
            this._openOnceFlag = true;
            var that = this;
            this._map.once("moveend", function() {
              that._openOnceFlag = false;
              that._openTooltip(e);
            });
            return;
          }
          this._tooltip._source = e.layer || e.target;
          this.openTooltip(this._tooltip.options.sticky ? e.latlng : void 0);
        },
        _moveTooltip: function(e) {
          var latlng = e.latlng, containerPoint, layerPoint;
          if (this._tooltip.options.sticky && e.originalEvent) {
            containerPoint = this._map.mouseEventToContainerPoint(e.originalEvent);
            layerPoint = this._map.containerPointToLayerPoint(containerPoint);
            latlng = this._map.layerPointToLatLng(layerPoint);
          }
          this._tooltip.setLatLng(latlng);
        }
      });
      var DivIcon = Icon.extend({
        options: {
          // @section
          // @aka DivIcon options
          iconSize: [12, 12],
          // also can be set through CSS
          // iconAnchor: (Point),
          // popupAnchor: (Point),
          // @option html: String|HTMLElement = ''
          // Custom HTML code to put inside the div element, empty by default. Alternatively,
          // an instance of `HTMLElement`.
          html: false,
          // @option bgPos: Point = [0, 0]
          // Optional relative position of the background, in pixels
          bgPos: null,
          className: "leaflet-div-icon"
        },
        createIcon: function(oldIcon) {
          var div = oldIcon && oldIcon.tagName === "DIV" ? oldIcon : document.createElement("div"), options = this.options;
          if (options.html instanceof Element) {
            empty3(div);
            div.appendChild(options.html);
          } else {
            div.innerHTML = options.html !== false ? options.html : "";
          }
          if (options.bgPos) {
            var bgPos = toPoint(options.bgPos);
            div.style.backgroundPosition = -bgPos.x + "px " + -bgPos.y + "px";
          }
          this._setIconStyles(div, "icon");
          return div;
        },
        createShadow: function() {
          return null;
        }
      });
      function divIcon2(options) {
        return new DivIcon(options);
      }
      Icon.Default = IconDefault;
      var GridLayer = Layer.extend({
        // @section
        // @aka GridLayer options
        options: {
          // @option tileSize: Number|Point = 256
          // Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
          tileSize: 256,
          // @option opacity: Number = 1.0
          // Opacity of the tiles. Can be used in the `createTile()` function.
          opacity: 1,
          // @option updateWhenIdle: Boolean = (depends)
          // Load new tiles only when panning ends.
          // `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
          // `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
          // [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
          updateWhenIdle: Browser.mobile,
          // @option updateWhenZooming: Boolean = true
          // By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
          updateWhenZooming: true,
          // @option updateInterval: Number = 200
          // Tiles will not update more than once every `updateInterval` milliseconds when panning.
          updateInterval: 200,
          // @option zIndex: Number = 1
          // The explicit zIndex of the tile layer.
          zIndex: 1,
          // @option bounds: LatLngBounds = undefined
          // If set, tiles will only be loaded inside the set `LatLngBounds`.
          bounds: null,
          // @option minZoom: Number = 0
          // The minimum zoom level down to which this layer will be displayed (inclusive).
          minZoom: 0,
          // @option maxZoom: Number = undefined
          // The maximum zoom level up to which this layer will be displayed (inclusive).
          maxZoom: void 0,
          // @option maxNativeZoom: Number = undefined
          // Maximum zoom number the tile source has available. If it is specified,
          // the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
          // from `maxNativeZoom` level and auto-scaled.
          maxNativeZoom: void 0,
          // @option minNativeZoom: Number = undefined
          // Minimum zoom number the tile source has available. If it is specified,
          // the tiles on all zoom levels lower than `minNativeZoom` will be loaded
          // from `minNativeZoom` level and auto-scaled.
          minNativeZoom: void 0,
          // @option noWrap: Boolean = false
          // Whether the layer is wrapped around the antimeridian. If `true`, the
          // GridLayer will only be displayed once at low zoom levels. Has no
          // effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
          // in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
          // tiles outside the CRS limits.
          noWrap: false,
          // @option pane: String = 'tilePane'
          // `Map pane` where the grid layer will be added.
          pane: "tilePane",
          // @option className: String = ''
          // A custom class name to assign to the tile layer. Empty by default.
          className: "",
          // @option keepBuffer: Number = 2
          // When panning the map, keep this many rows and columns of tiles before unloading them.
          keepBuffer: 2
        },
        initialize: function(options) {
          setOptions(this, options);
        },
        onAdd: function() {
          this._initContainer();
          this._levels = {};
          this._tiles = {};
          this._resetView();
        },
        beforeAdd: function(map4) {
          map4._addZoomLimit(this);
        },
        onRemove: function(map4) {
          this._removeAllTiles();
          remove2(this._container);
          map4._removeZoomLimit(this);
          this._container = null;
          this._tileZoom = void 0;
        },
        // @method bringToFront: this
        // Brings the tile layer to the top of all tile layers.
        bringToFront: function() {
          if (this._map) {
            toFront(this._container);
            this._setAutoZIndex(Math.max);
          }
          return this;
        },
        // @method bringToBack: this
        // Brings the tile layer to the bottom of all tile layers.
        bringToBack: function() {
          if (this._map) {
            toBack(this._container);
            this._setAutoZIndex(Math.min);
          }
          return this;
        },
        // @method getContainer: HTMLElement
        // Returns the HTML element that contains the tiles for this layer.
        getContainer: function() {
          return this._container;
        },
        // @method setOpacity(opacity: Number): this
        // Changes the [opacity](#gridlayer-opacity) of the grid layer.
        setOpacity: function(opacity) {
          this.options.opacity = opacity;
          this._updateOpacity();
          return this;
        },
        // @method setZIndex(zIndex: Number): this
        // Changes the [zIndex](#gridlayer-zindex) of the grid layer.
        setZIndex: function(zIndex) {
          this.options.zIndex = zIndex;
          this._updateZIndex();
          return this;
        },
        // @method isLoading: Boolean
        // Returns `true` if any tile in the grid layer has not finished loading.
        isLoading: function() {
          return this._loading;
        },
        // @method redraw: this
        // Causes the layer to clear all the tiles and request them again.
        redraw: function() {
          if (this._map) {
            this._removeAllTiles();
            var tileZoom = this._clampZoom(this._map.getZoom());
            if (tileZoom !== this._tileZoom) {
              this._tileZoom = tileZoom;
              this._updateLevels();
            }
            this._update();
          }
          return this;
        },
        getEvents: function() {
          var events = {
            viewprereset: this._invalidateAll,
            viewreset: this._resetView,
            zoom: this._resetView,
            moveend: this._onMoveEnd
          };
          if (!this.options.updateWhenIdle) {
            if (!this._onMove) {
              this._onMove = throttle(this._onMoveEnd, this.options.updateInterval, this);
            }
            events.move = this._onMove;
          }
          if (this._zoomAnimated) {
            events.zoomanim = this._animateZoom;
          }
          return events;
        },
        // @section Extension methods
        // Layers extending `GridLayer` shall reimplement the following method.
        // @method createTile(coords: Object, done?: Function): HTMLElement
        // Called only internally, must be overridden by classes extending `GridLayer`.
        // Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
        // is specified, it must be called when the tile has finished loading and drawing.
        createTile: function() {
          return document.createElement("div");
        },
        // @section
        // @method getTileSize: Point
        // Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
        getTileSize: function() {
          var s = this.options.tileSize;
          return s instanceof Point ? s : new Point(s, s);
        },
        _updateZIndex: function() {
          if (this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null) {
            this._container.style.zIndex = this.options.zIndex;
          }
        },
        _setAutoZIndex: function(compare) {
          var layers2 = this.getPane().children, edgeZIndex = -compare(-Infinity, Infinity);
          for (var i2 = 0, len = layers2.length, zIndex; i2 < len; i2++) {
            zIndex = layers2[i2].style.zIndex;
            if (layers2[i2] !== this._container && zIndex) {
              edgeZIndex = compare(edgeZIndex, +zIndex);
            }
          }
          if (isFinite(edgeZIndex)) {
            this.options.zIndex = edgeZIndex + compare(-1, 1);
            this._updateZIndex();
          }
        },
        _updateOpacity: function() {
          if (!this._map) {
            return;
          }
          if (Browser.ielt9) {
            return;
          }
          setOpacity(this._container, this.options.opacity);
          var now2 = +/* @__PURE__ */ new Date(), nextFrame = false, willPrune = false;
          for (var key in this._tiles) {
            var tile = this._tiles[key];
            if (!tile.current || !tile.loaded) {
              continue;
            }
            var fade = Math.min(1, (now2 - tile.loaded) / 200);
            setOpacity(tile.el, fade);
            if (fade < 1) {
              nextFrame = true;
            } else {
              if (tile.active) {
                willPrune = true;
              } else {
                this._onOpaqueTile(tile);
              }
              tile.active = true;
            }
          }
          if (willPrune && !this._noPrune) {
            this._pruneTiles();
          }
          if (nextFrame) {
            cancelAnimFrame(this._fadeFrame);
            this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
          }
        },
        _onOpaqueTile: falseFn,
        _initContainer: function() {
          if (this._container) {
            return;
          }
          this._container = create$1("div", "leaflet-layer " + (this.options.className || ""));
          this._updateZIndex();
          if (this.options.opacity < 1) {
            this._updateOpacity();
          }
          this.getPane().appendChild(this._container);
        },
        _updateLevels: function() {
          var zoom2 = this._tileZoom, maxZoom = this.options.maxZoom;
          if (zoom2 === void 0) {
            return void 0;
          }
          for (var z in this._levels) {
            z = Number(z);
            if (this._levels[z].el.children.length || z === zoom2) {
              this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom2 - z);
              this._onUpdateLevel(z);
            } else {
              remove2(this._levels[z].el);
              this._removeTilesAtZoom(z);
              this._onRemoveLevel(z);
              delete this._levels[z];
            }
          }
          var level = this._levels[zoom2], map4 = this._map;
          if (!level) {
            level = this._levels[zoom2] = {};
            level.el = create$1("div", "leaflet-tile-container leaflet-zoom-animated", this._container);
            level.el.style.zIndex = maxZoom;
            level.origin = map4.project(map4.unproject(map4.getPixelOrigin()), zoom2).round();
            level.zoom = zoom2;
            this._setZoomTransform(level, map4.getCenter(), map4.getZoom());
            falseFn(level.el.offsetWidth);
            this._onCreateLevel(level);
          }
          this._level = level;
          return level;
        },
        _onUpdateLevel: falseFn,
        _onRemoveLevel: falseFn,
        _onCreateLevel: falseFn,
        _pruneTiles: function() {
          if (!this._map) {
            return;
          }
          var key, tile;
          var zoom2 = this._map.getZoom();
          if (zoom2 > this.options.maxZoom || zoom2 < this.options.minZoom) {
            this._removeAllTiles();
            return;
          }
          for (key in this._tiles) {
            tile = this._tiles[key];
            tile.retain = tile.current;
          }
          for (key in this._tiles) {
            tile = this._tiles[key];
            if (tile.current && !tile.active) {
              var coords = tile.coords;
              if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
                this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
              }
            }
          }
          for (key in this._tiles) {
            if (!this._tiles[key].retain) {
              this._removeTile(key);
            }
          }
        },
        _removeTilesAtZoom: function(zoom2) {
          for (var key in this._tiles) {
            if (this._tiles[key].coords.z !== zoom2) {
              continue;
            }
            this._removeTile(key);
          }
        },
        _removeAllTiles: function() {
          for (var key in this._tiles) {
            this._removeTile(key);
          }
        },
        _invalidateAll: function() {
          for (var z in this._levels) {
            remove2(this._levels[z].el);
            this._onRemoveLevel(Number(z));
            delete this._levels[z];
          }
          this._removeAllTiles();
          this._tileZoom = void 0;
        },
        _retainParent: function(x3, y3, z, minZoom) {
          var x22 = Math.floor(x3 / 2), y22 = Math.floor(y3 / 2), z2 = z - 1, coords2 = new Point(+x22, +y22);
          coords2.z = +z2;
          var key = this._tileCoordsToKey(coords2), tile = this._tiles[key];
          if (tile && tile.active) {
            tile.retain = true;
            return true;
          } else if (tile && tile.loaded) {
            tile.retain = true;
          }
          if (z2 > minZoom) {
            return this._retainParent(x22, y22, z2, minZoom);
          }
          return false;
        },
        _retainChildren: function(x3, y3, z, maxZoom) {
          for (var i2 = 2 * x3; i2 < 2 * x3 + 2; i2++) {
            for (var j = 2 * y3; j < 2 * y3 + 2; j++) {
              var coords = new Point(i2, j);
              coords.z = z + 1;
              var key = this._tileCoordsToKey(coords), tile = this._tiles[key];
              if (tile && tile.active) {
                tile.retain = true;
                continue;
              } else if (tile && tile.loaded) {
                tile.retain = true;
              }
              if (z + 1 < maxZoom) {
                this._retainChildren(i2, j, z + 1, maxZoom);
              }
            }
          }
        },
        _resetView: function(e) {
          var animating = e && (e.pinch || e.flyTo);
          this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
        },
        _animateZoom: function(e) {
          this._setView(e.center, e.zoom, true, e.noUpdate);
        },
        _clampZoom: function(zoom2) {
          var options = this.options;
          if (void 0 !== options.minNativeZoom && zoom2 < options.minNativeZoom) {
            return options.minNativeZoom;
          }
          if (void 0 !== options.maxNativeZoom && options.maxNativeZoom < zoom2) {
            return options.maxNativeZoom;
          }
          return zoom2;
        },
        _setView: function(center, zoom2, noPrune, noUpdate) {
          var tileZoom = Math.round(zoom2);
          if (this.options.maxZoom !== void 0 && tileZoom > this.options.maxZoom || this.options.minZoom !== void 0 && tileZoom < this.options.minZoom) {
            tileZoom = void 0;
          } else {
            tileZoom = this._clampZoom(tileZoom);
          }
          var tileZoomChanged = this.options.updateWhenZooming && tileZoom !== this._tileZoom;
          if (!noUpdate || tileZoomChanged) {
            this._tileZoom = tileZoom;
            if (this._abortLoading) {
              this._abortLoading();
            }
            this._updateLevels();
            this._resetGrid();
            if (tileZoom !== void 0) {
              this._update(center);
            }
            if (!noPrune) {
              this._pruneTiles();
            }
            this._noPrune = !!noPrune;
          }
          this._setZoomTransforms(center, zoom2);
        },
        _setZoomTransforms: function(center, zoom2) {
          for (var i2 in this._levels) {
            this._setZoomTransform(this._levels[i2], center, zoom2);
          }
        },
        _setZoomTransform: function(level, center, zoom2) {
          var scale2 = this._map.getZoomScale(zoom2, level.zoom), translate = level.origin.multiplyBy(scale2).subtract(this._map._getNewPixelOrigin(center, zoom2)).round();
          if (Browser.any3d) {
            setTransform(level.el, translate, scale2);
          } else {
            setPosition(level.el, translate);
          }
        },
        _resetGrid: function() {
          var map4 = this._map, crs = map4.options.crs, tileSize = this._tileSize = this.getTileSize(), tileZoom = this._tileZoom;
          var bounds = this._map.getPixelWorldBounds(this._tileZoom);
          if (bounds) {
            this._globalTileRange = this._pxBoundsToTileRange(bounds);
          }
          this._wrapX = crs.wrapLng && !this.options.noWrap && [
            Math.floor(map4.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
            Math.ceil(map4.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
          ];
          this._wrapY = crs.wrapLat && !this.options.noWrap && [
            Math.floor(map4.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
            Math.ceil(map4.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
          ];
        },
        _onMoveEnd: function() {
          if (!this._map || this._map._animatingZoom) {
            return;
          }
          this._update();
        },
        _getTiledPixelBounds: function(center) {
          var map4 = this._map, mapZoom = map4._animatingZoom ? Math.max(map4._animateToZoom, map4.getZoom()) : map4.getZoom(), scale2 = map4.getZoomScale(mapZoom, this._tileZoom), pixelCenter = map4.project(center, this._tileZoom).floor(), halfSize = map4.getSize().divideBy(scale2 * 2);
          return new Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
        },
        // Private method to load tiles in the grid's active zoom level according to map bounds
        _update: function(center) {
          var map4 = this._map;
          if (!map4) {
            return;
          }
          var zoom2 = this._clampZoom(map4.getZoom());
          if (center === void 0) {
            center = map4.getCenter();
          }
          if (this._tileZoom === void 0) {
            return;
          }
          var pixelBounds = this._getTiledPixelBounds(center), tileRange = this._pxBoundsToTileRange(pixelBounds), tileCenter = tileRange.getCenter(), queue = [], margin = this.options.keepBuffer, noPruneRange = new Bounds(
            tileRange.getBottomLeft().subtract([margin, -margin]),
            tileRange.getTopRight().add([margin, -margin])
          );
          if (!(isFinite(tileRange.min.x) && isFinite(tileRange.min.y) && isFinite(tileRange.max.x) && isFinite(tileRange.max.y))) {
            throw new Error("Attempted to load an infinite number of tiles");
          }
          for (var key in this._tiles) {
            var c2 = this._tiles[key].coords;
            if (c2.z !== this._tileZoom || !noPruneRange.contains(new Point(c2.x, c2.y))) {
              this._tiles[key].current = false;
            }
          }
          if (Math.abs(zoom2 - this._tileZoom) > 1) {
            this._setView(center, zoom2);
            return;
          }
          for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
            for (var i2 = tileRange.min.x; i2 <= tileRange.max.x; i2++) {
              var coords = new Point(i2, j);
              coords.z = this._tileZoom;
              if (!this._isValidTile(coords)) {
                continue;
              }
              var tile = this._tiles[this._tileCoordsToKey(coords)];
              if (tile) {
                tile.current = true;
              } else {
                queue.push(coords);
              }
            }
          }
          queue.sort(function(a2, b) {
            return a2.distanceTo(tileCenter) - b.distanceTo(tileCenter);
          });
          if (queue.length !== 0) {
            if (!this._loading) {
              this._loading = true;
              this.fire("loading");
            }
            var fragment = document.createDocumentFragment();
            for (i2 = 0; i2 < queue.length; i2++) {
              this._addTile(queue[i2], fragment);
            }
            this._level.el.appendChild(fragment);
          }
        },
        _isValidTile: function(coords) {
          var crs = this._map.options.crs;
          if (!crs.infinite) {
            var bounds = this._globalTileRange;
            if (!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x) || !crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y)) {
              return false;
            }
          }
          if (!this.options.bounds) {
            return true;
          }
          var tileBounds = this._tileCoordsToBounds(coords);
          return toLatLngBounds(this.options.bounds).overlaps(tileBounds);
        },
        _keyToBounds: function(key) {
          return this._tileCoordsToBounds(this._keyToTileCoords(key));
        },
        _tileCoordsToNwSe: function(coords) {
          var map4 = this._map, tileSize = this.getTileSize(), nwPoint = coords.scaleBy(tileSize), sePoint = nwPoint.add(tileSize), nw = map4.unproject(nwPoint, coords.z), se = map4.unproject(sePoint, coords.z);
          return [nw, se];
        },
        // converts tile coordinates to its geographical bounds
        _tileCoordsToBounds: function(coords) {
          var bp = this._tileCoordsToNwSe(coords), bounds = new LatLngBounds(bp[0], bp[1]);
          if (!this.options.noWrap) {
            bounds = this._map.wrapLatLngBounds(bounds);
          }
          return bounds;
        },
        // converts tile coordinates to key for the tile cache
        _tileCoordsToKey: function(coords) {
          return coords.x + ":" + coords.y + ":" + coords.z;
        },
        // converts tile cache key to coordinates
        _keyToTileCoords: function(key) {
          var k = key.split(":"), coords = new Point(+k[0], +k[1]);
          coords.z = +k[2];
          return coords;
        },
        _removeTile: function(key) {
          var tile = this._tiles[key];
          if (!tile) {
            return;
          }
          remove2(tile.el);
          delete this._tiles[key];
          this.fire("tileunload", {
            tile: tile.el,
            coords: this._keyToTileCoords(key)
          });
        },
        _initTile: function(tile) {
          addClass(tile, "leaflet-tile");
          var tileSize = this.getTileSize();
          tile.style.width = tileSize.x + "px";
          tile.style.height = tileSize.y + "px";
          tile.onselectstart = falseFn;
          tile.onmousemove = falseFn;
          if (Browser.ielt9 && this.options.opacity < 1) {
            setOpacity(tile, this.options.opacity);
          }
        },
        _addTile: function(coords, container) {
          var tilePos = this._getTilePos(coords), key = this._tileCoordsToKey(coords);
          var tile = this.createTile(this._wrapCoords(coords), bind(this._tileReady, this, coords));
          this._initTile(tile);
          if (this.createTile.length < 2) {
            requestAnimFrame(bind(this._tileReady, this, coords, null, tile));
          }
          setPosition(tile, tilePos);
          this._tiles[key] = {
            el: tile,
            coords,
            current: true
          };
          container.appendChild(tile);
          this.fire("tileloadstart", {
            tile,
            coords
          });
        },
        _tileReady: function(coords, err, tile) {
          if (err) {
            this.fire("tileerror", {
              error: err,
              tile,
              coords
            });
          }
          var key = this._tileCoordsToKey(coords);
          tile = this._tiles[key];
          if (!tile) {
            return;
          }
          tile.loaded = +/* @__PURE__ */ new Date();
          if (this._map._fadeAnimated) {
            setOpacity(tile.el, 0);
            cancelAnimFrame(this._fadeFrame);
            this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
          } else {
            tile.active = true;
            this._pruneTiles();
          }
          if (!err) {
            addClass(tile.el, "leaflet-tile-loaded");
            this.fire("tileload", {
              tile: tile.el,
              coords
            });
          }
          if (this._noTilesToLoad()) {
            this._loading = false;
            this.fire("load");
            if (Browser.ielt9 || !this._map._fadeAnimated) {
              requestAnimFrame(this._pruneTiles, this);
            } else {
              setTimeout(bind(this._pruneTiles, this), 250);
            }
          }
        },
        _getTilePos: function(coords) {
          return coords.scaleBy(this.getTileSize()).subtract(this._level.origin);
        },
        _wrapCoords: function(coords) {
          var newCoords = new Point(
            this._wrapX ? wrapNum(coords.x, this._wrapX) : coords.x,
            this._wrapY ? wrapNum(coords.y, this._wrapY) : coords.y
          );
          newCoords.z = coords.z;
          return newCoords;
        },
        _pxBoundsToTileRange: function(bounds) {
          var tileSize = this.getTileSize();
          return new Bounds(
            bounds.min.unscaleBy(tileSize).floor(),
            bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1])
          );
        },
        _noTilesToLoad: function() {
          for (var key in this._tiles) {
            if (!this._tiles[key].loaded) {
              return false;
            }
          }
          return true;
        }
      });
      function gridLayer(options) {
        return new GridLayer(options);
      }
      var TileLayer = GridLayer.extend({
        // @section
        // @aka TileLayer options
        options: {
          // @option minZoom: Number = 0
          // The minimum zoom level down to which this layer will be displayed (inclusive).
          minZoom: 0,
          // @option maxZoom: Number = 18
          // The maximum zoom level up to which this layer will be displayed (inclusive).
          maxZoom: 18,
          // @option subdomains: String|String[] = 'abc'
          // Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
          subdomains: "abc",
          // @option errorTileUrl: String = ''
          // URL to the tile image to show in place of the tile that failed to load.
          errorTileUrl: "",
          // @option zoomOffset: Number = 0
          // The zoom number used in tile URLs will be offset with this value.
          zoomOffset: 0,
          // @option tms: Boolean = false
          // If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
          tms: false,
          // @option zoomReverse: Boolean = false
          // If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
          zoomReverse: false,
          // @option detectRetina: Boolean = false
          // If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
          detectRetina: false,
          // @option crossOrigin: Boolean|String = false
          // Whether the crossOrigin attribute will be added to the tiles.
          // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
          // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
          crossOrigin: false,
          // @option referrerPolicy: Boolean|String = false
          // Whether the referrerPolicy attribute will be added to the tiles.
          // If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided.
          // This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer
          // (e.g. to validate an API token).
          // Refer to [HTMLImageElement.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy) for valid String values.
          referrerPolicy: false
        },
        initialize: function(url2, options) {
          this._url = url2;
          options = setOptions(this, options);
          if (options.detectRetina && Browser.retina && options.maxZoom > 0) {
            options.tileSize = Math.floor(options.tileSize / 2);
            if (!options.zoomReverse) {
              options.zoomOffset++;
              options.maxZoom = Math.max(options.minZoom, options.maxZoom - 1);
            } else {
              options.zoomOffset--;
              options.minZoom = Math.min(options.maxZoom, options.minZoom + 1);
            }
            options.minZoom = Math.max(0, options.minZoom);
          } else if (!options.zoomReverse) {
            options.maxZoom = Math.max(options.minZoom, options.maxZoom);
          } else {
            options.minZoom = Math.min(options.maxZoom, options.minZoom);
          }
          if (typeof options.subdomains === "string") {
            options.subdomains = options.subdomains.split("");
          }
          this.on("tileunload", this._onTileRemove);
        },
        // @method setUrl(url: String, noRedraw?: Boolean): this
        // Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
        // If the URL does not change, the layer will not be redrawn unless
        // the noRedraw parameter is set to false.
        setUrl: function(url2, noRedraw) {
          if (this._url === url2 && noRedraw === void 0) {
            noRedraw = true;
          }
          this._url = url2;
          if (!noRedraw) {
            this.redraw();
          }
          return this;
        },
        // @method createTile(coords: Object, done?: Function): HTMLElement
        // Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
        // to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
        // callback is called when the tile has been loaded.
        createTile: function(coords, done) {
          var tile = document.createElement("img");
          on2(tile, "load", bind(this._tileOnLoad, this, done, tile));
          on2(tile, "error", bind(this._tileOnError, this, done, tile));
          if (this.options.crossOrigin || this.options.crossOrigin === "") {
            tile.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
          }
          if (typeof this.options.referrerPolicy === "string") {
            tile.referrerPolicy = this.options.referrerPolicy;
          }
          tile.alt = "";
          tile.src = this.getTileUrl(coords);
          return tile;
        },
        // @section Extension methods
        // @uninheritable
        // Layers extending `TileLayer` might reimplement the following method.
        // @method getTileUrl(coords: Object): String
        // Called only internally, returns the URL for a tile given its coordinates.
        // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
        getTileUrl: function(coords) {
          var data = {
            r: Browser.retina ? "@2x" : "",
            s: this._getSubdomain(coords),
            x: coords.x,
            y: coords.y,
            z: this._getZoomForUrl()
          };
          if (this._map && !this._map.options.crs.infinite) {
            var invertedY = this._globalTileRange.max.y - coords.y;
            if (this.options.tms) {
              data["y"] = invertedY;
            }
            data["-y"] = invertedY;
          }
          return template(this._url, extend2(data, this.options));
        },
        _tileOnLoad: function(done, tile) {
          if (Browser.ielt9) {
            setTimeout(bind(done, this, null, tile), 0);
          } else {
            done(null, tile);
          }
        },
        _tileOnError: function(done, tile, e) {
          var errorUrl = this.options.errorTileUrl;
          if (errorUrl && tile.getAttribute("src") !== errorUrl) {
            tile.src = errorUrl;
          }
          done(e, tile);
        },
        _onTileRemove: function(e) {
          e.tile.onload = null;
        },
        _getZoomForUrl: function() {
          var zoom2 = this._tileZoom, maxZoom = this.options.maxZoom, zoomReverse = this.options.zoomReverse, zoomOffset = this.options.zoomOffset;
          if (zoomReverse) {
            zoom2 = maxZoom - zoom2;
          }
          return zoom2 + zoomOffset;
        },
        _getSubdomain: function(tilePoint) {
          var index3 = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
          return this.options.subdomains[index3];
        },
        // stops loading all tiles in the background layer
        _abortLoading: function() {
          var i2, tile;
          for (i2 in this._tiles) {
            if (this._tiles[i2].coords.z !== this._tileZoom) {
              tile = this._tiles[i2].el;
              tile.onload = falseFn;
              tile.onerror = falseFn;
              if (!tile.complete) {
                tile.src = emptyImageUrl;
                var coords = this._tiles[i2].coords;
                remove2(tile);
                delete this._tiles[i2];
                this.fire("tileabort", {
                  tile,
                  coords
                });
              }
            }
          }
        },
        _removeTile: function(key) {
          var tile = this._tiles[key];
          if (!tile) {
            return;
          }
          tile.el.setAttribute("src", emptyImageUrl);
          return GridLayer.prototype._removeTile.call(this, key);
        },
        _tileReady: function(coords, err, tile) {
          if (!this._map || tile && tile.getAttribute("src") === emptyImageUrl) {
            return;
          }
          return GridLayer.prototype._tileReady.call(this, coords, err, tile);
        }
      });
      function tileLayer3(url2, options) {
        return new TileLayer(url2, options);
      }
      var TileLayerWMS = TileLayer.extend({
        // @section
        // @aka TileLayer.WMS options
        // If any custom options not documented here are used, they will be sent to the
        // WMS server as extra parameters in each request URL. This can be useful for
        // [non-standard vendor WMS parameters](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
        defaultWmsParams: {
          service: "WMS",
          request: "GetMap",
          // @option layers: String = ''
          // **(required)** Comma-separated list of WMS layers to show.
          layers: "",
          // @option styles: String = ''
          // Comma-separated list of WMS styles.
          styles: "",
          // @option format: String = 'image/jpeg'
          // WMS image format (use `'image/png'` for layers with transparency).
          format: "image/jpeg",
          // @option transparent: Boolean = false
          // If `true`, the WMS service will return images with transparency.
          transparent: false,
          // @option version: String = '1.1.1'
          // Version of the WMS service to use
          version: "1.1.1"
        },
        options: {
          // @option crs: CRS = null
          // Coordinate Reference System to use for the WMS requests, defaults to
          // map CRS. Don't change this if you're not sure what it means.
          crs: null,
          // @option uppercase: Boolean = false
          // If `true`, WMS request parameter keys will be uppercase.
          uppercase: false
        },
        initialize: function(url2, options) {
          this._url = url2;
          var wmsParams = extend2({}, this.defaultWmsParams);
          for (var i2 in options) {
            if (!(i2 in this.options)) {
              wmsParams[i2] = options[i2];
            }
          }
          options = setOptions(this, options);
          var realRetina = options.detectRetina && Browser.retina ? 2 : 1;
          var tileSize = this.getTileSize();
          wmsParams.width = tileSize.x * realRetina;
          wmsParams.height = tileSize.y * realRetina;
          this.wmsParams = wmsParams;
        },
        onAdd: function(map4) {
          this._crs = this.options.crs || map4.options.crs;
          this._wmsVersion = parseFloat(this.wmsParams.version);
          var projectionKey = this._wmsVersion >= 1.3 ? "crs" : "srs";
          this.wmsParams[projectionKey] = this._crs.code;
          TileLayer.prototype.onAdd.call(this, map4);
        },
        getTileUrl: function(coords) {
          var tileBounds = this._tileCoordsToNwSe(coords), crs = this._crs, bounds = toBounds(crs.project(tileBounds[0]), crs.project(tileBounds[1])), min2 = bounds.min, max2 = bounds.max, bbox = (this._wmsVersion >= 1.3 && this._crs === EPSG4326 ? [min2.y, min2.x, max2.y, max2.x] : [min2.x, min2.y, max2.x, max2.y]).join(","), url2 = TileLayer.prototype.getTileUrl.call(this, coords);
          return url2 + getParamString(this.wmsParams, url2, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + bbox;
        },
        // @method setParams(params: Object, noRedraw?: Boolean): this
        // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
        setParams: function(params, noRedraw) {
          extend2(this.wmsParams, params);
          if (!noRedraw) {
            this.redraw();
          }
          return this;
        }
      });
      function tileLayerWMS(url2, options) {
        return new TileLayerWMS(url2, options);
      }
      TileLayer.WMS = TileLayerWMS;
      tileLayer3.wms = tileLayerWMS;
      var Renderer = Layer.extend({
        // @section
        // @aka Renderer options
        options: {
          // @option padding: Number = 0.1
          // How much to extend the clip area around the map view (relative to its size)
          // e.g. 0.1 would be 10% of map view in each direction
          padding: 0.1
        },
        initialize: function(options) {
          setOptions(this, options);
          stamp(this);
          this._layers = this._layers || {};
        },
        onAdd: function() {
          if (!this._container) {
            this._initContainer();
            addClass(this._container, "leaflet-zoom-animated");
          }
          this.getPane().appendChild(this._container);
          this._update();
          this.on("update", this._updatePaths, this);
        },
        onRemove: function() {
          this.off("update", this._updatePaths, this);
          this._destroyContainer();
        },
        getEvents: function() {
          var events = {
            viewreset: this._reset,
            zoom: this._onZoom,
            moveend: this._update,
            zoomend: this._onZoomEnd
          };
          if (this._zoomAnimated) {
            events.zoomanim = this._onAnimZoom;
          }
          return events;
        },
        _onAnimZoom: function(ev) {
          this._updateTransform(ev.center, ev.zoom);
        },
        _onZoom: function() {
          this._updateTransform(this._map.getCenter(), this._map.getZoom());
        },
        _updateTransform: function(center, zoom2) {
          var scale2 = this._map.getZoomScale(zoom2, this._zoom), viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding), currentCenterPoint = this._map.project(this._center, zoom2), topLeftOffset = viewHalf.multiplyBy(-scale2).add(currentCenterPoint).subtract(this._map._getNewPixelOrigin(center, zoom2));
          if (Browser.any3d) {
            setTransform(this._container, topLeftOffset, scale2);
          } else {
            setPosition(this._container, topLeftOffset);
          }
        },
        _reset: function() {
          this._update();
          this._updateTransform(this._center, this._zoom);
          for (var id2 in this._layers) {
            this._layers[id2]._reset();
          }
        },
        _onZoomEnd: function() {
          for (var id2 in this._layers) {
            this._layers[id2]._project();
          }
        },
        _updatePaths: function() {
          for (var id2 in this._layers) {
            this._layers[id2]._update();
          }
        },
        _update: function() {
          var p = this.options.padding, size = this._map.getSize(), min2 = this._map.containerPointToLayerPoint(size.multiplyBy(-p)).round();
          this._bounds = new Bounds(min2, min2.add(size.multiplyBy(1 + p * 2)).round());
          this._center = this._map.getCenter();
          this._zoom = this._map.getZoom();
        }
      });
      var Canvas = Renderer.extend({
        // @section
        // @aka Canvas options
        options: {
          // @option tolerance: Number = 0
          // How much to extend the click tolerance around a path/object on the map.
          tolerance: 0
        },
        getEvents: function() {
          var events = Renderer.prototype.getEvents.call(this);
          events.viewprereset = this._onViewPreReset;
          return events;
        },
        _onViewPreReset: function() {
          this._postponeUpdatePaths = true;
        },
        onAdd: function() {
          Renderer.prototype.onAdd.call(this);
          this._draw();
        },
        _initContainer: function() {
          var container = this._container = document.createElement("canvas");
          on2(container, "mousemove", this._onMouseMove, this);
          on2(container, "click dblclick mousedown mouseup contextmenu", this._onClick, this);
          on2(container, "mouseout", this._handleMouseOut, this);
          container["_leaflet_disable_events"] = true;
          this._ctx = container.getContext("2d");
        },
        _destroyContainer: function() {
          cancelAnimFrame(this._redrawRequest);
          delete this._ctx;
          remove2(this._container);
          off(this._container);
          delete this._container;
        },
        _updatePaths: function() {
          if (this._postponeUpdatePaths) {
            return;
          }
          var layer;
          this._redrawBounds = null;
          for (var id2 in this._layers) {
            layer = this._layers[id2];
            layer._update();
          }
          this._redraw();
        },
        _update: function() {
          if (this._map._animatingZoom && this._bounds) {
            return;
          }
          Renderer.prototype._update.call(this);
          var b = this._bounds, container = this._container, size = b.getSize(), m2 = Browser.retina ? 2 : 1;
          setPosition(container, b.min);
          container.width = m2 * size.x;
          container.height = m2 * size.y;
          container.style.width = size.x + "px";
          container.style.height = size.y + "px";
          if (Browser.retina) {
            this._ctx.scale(2, 2);
          }
          this._ctx.translate(-b.min.x, -b.min.y);
          this.fire("update");
        },
        _reset: function() {
          Renderer.prototype._reset.call(this);
          if (this._postponeUpdatePaths) {
            this._postponeUpdatePaths = false;
            this._updatePaths();
          }
        },
        _initPath: function(layer) {
          this._updateDashArray(layer);
          this._layers[stamp(layer)] = layer;
          var order = layer._order = {
            layer,
            prev: this._drawLast,
            next: null
          };
          if (this._drawLast) {
            this._drawLast.next = order;
          }
          this._drawLast = order;
          this._drawFirst = this._drawFirst || this._drawLast;
        },
        _addPath: function(layer) {
          this._requestRedraw(layer);
        },
        _removePath: function(layer) {
          var order = layer._order;
          var next = order.next;
          var prev2 = order.prev;
          if (next) {
            next.prev = prev2;
          } else {
            this._drawLast = prev2;
          }
          if (prev2) {
            prev2.next = next;
          } else {
            this._drawFirst = next;
          }
          delete layer._order;
          delete this._layers[stamp(layer)];
          this._requestRedraw(layer);
        },
        _updatePath: function(layer) {
          this._extendRedrawBounds(layer);
          layer._project();
          layer._update();
          this._requestRedraw(layer);
        },
        _updateStyle: function(layer) {
          this._updateDashArray(layer);
          this._requestRedraw(layer);
        },
        _updateDashArray: function(layer) {
          if (typeof layer.options.dashArray === "string") {
            var parts2 = layer.options.dashArray.split(/[, ]+/), dashArray = [], dashValue, i2;
            for (i2 = 0; i2 < parts2.length; i2++) {
              dashValue = Number(parts2[i2]);
              if (isNaN(dashValue)) {
                return;
              }
              dashArray.push(dashValue);
            }
            layer.options._dashArray = dashArray;
          } else {
            layer.options._dashArray = layer.options.dashArray;
          }
        },
        _requestRedraw: function(layer) {
          if (!this._map) {
            return;
          }
          this._extendRedrawBounds(layer);
          this._redrawRequest = this._redrawRequest || requestAnimFrame(this._redraw, this);
        },
        _extendRedrawBounds: function(layer) {
          if (layer._pxBounds) {
            var padding = (layer.options.weight || 0) + 1;
            this._redrawBounds = this._redrawBounds || new Bounds();
            this._redrawBounds.extend(layer._pxBounds.min.subtract([padding, padding]));
            this._redrawBounds.extend(layer._pxBounds.max.add([padding, padding]));
          }
        },
        _redraw: function() {
          this._redrawRequest = null;
          if (this._redrawBounds) {
            this._redrawBounds.min._floor();
            this._redrawBounds.max._ceil();
          }
          this._clear();
          this._draw();
          this._redrawBounds = null;
        },
        _clear: function() {
          var bounds = this._redrawBounds;
          if (bounds) {
            var size = bounds.getSize();
            this._ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);
          } else {
            this._ctx.save();
            this._ctx.setTransform(1, 0, 0, 1, 0, 0);
            this._ctx.clearRect(0, 0, this._container.width, this._container.height);
            this._ctx.restore();
          }
        },
        _draw: function() {
          var layer, bounds = this._redrawBounds;
          this._ctx.save();
          if (bounds) {
            var size = bounds.getSize();
            this._ctx.beginPath();
            this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
            this._ctx.clip();
          }
          this._drawing = true;
          for (var order = this._drawFirst; order; order = order.next) {
            layer = order.layer;
            if (!bounds || layer._pxBounds && layer._pxBounds.intersects(bounds)) {
              layer._updatePath();
            }
          }
          this._drawing = false;
          this._ctx.restore();
        },
        _updatePoly: function(layer, closed) {
          if (!this._drawing) {
            return;
          }
          var i2, j, len2, p, parts2 = layer._parts, len = parts2.length, ctx = this._ctx;
          if (!len) {
            return;
          }
          ctx.beginPath();
          for (i2 = 0; i2 < len; i2++) {
            for (j = 0, len2 = parts2[i2].length; j < len2; j++) {
              p = parts2[i2][j];
              ctx[j ? "lineTo" : "moveTo"](p.x, p.y);
            }
            if (closed) {
              ctx.closePath();
            }
          }
          this._fillStroke(ctx, layer);
        },
        _updateCircle: function(layer) {
          if (!this._drawing || layer._empty()) {
            return;
          }
          var p = layer._point, ctx = this._ctx, r = Math.max(Math.round(layer._radius), 1), s = (Math.max(Math.round(layer._radiusY), 1) || r) / r;
          if (s !== 1) {
            ctx.save();
            ctx.scale(1, s);
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y / s, r, 0, Math.PI * 2, false);
          if (s !== 1) {
            ctx.restore();
          }
          this._fillStroke(ctx, layer);
        },
        _fillStroke: function(ctx, layer) {
          var options = layer.options;
          if (options.fill) {
            ctx.globalAlpha = options.fillOpacity;
            ctx.fillStyle = options.fillColor || options.color;
            ctx.fill(options.fillRule || "evenodd");
          }
          if (options.stroke && options.weight !== 0) {
            if (ctx.setLineDash) {
              ctx.setLineDash(layer.options && layer.options._dashArray || []);
            }
            ctx.globalAlpha = options.opacity;
            ctx.lineWidth = options.weight;
            ctx.strokeStyle = options.color;
            ctx.lineCap = options.lineCap;
            ctx.lineJoin = options.lineJoin;
            ctx.stroke();
          }
        },
        // Canvas obviously doesn't have mouse events for individual drawn objects,
        // so we emulate that by calculating what's under the mouse on mousemove/click manually
        _onClick: function(e) {
          var point = this._map.mouseEventToLayerPoint(e), layer, clickedLayer;
          for (var order = this._drawFirst; order; order = order.next) {
            layer = order.layer;
            if (layer.options.interactive && layer._containsPoint(point)) {
              if (!(e.type === "click" || e.type === "preclick") || !this._map._draggableMoved(layer)) {
                clickedLayer = layer;
              }
            }
          }
          this._fireEvent(clickedLayer ? [clickedLayer] : false, e);
        },
        _onMouseMove: function(e) {
          if (!this._map || this._map.dragging.moving() || this._map._animatingZoom) {
            return;
          }
          var point = this._map.mouseEventToLayerPoint(e);
          this._handleMouseHover(e, point);
        },
        _handleMouseOut: function(e) {
          var layer = this._hoveredLayer;
          if (layer) {
            removeClass(this._container, "leaflet-interactive");
            this._fireEvent([layer], e, "mouseout");
            this._hoveredLayer = null;
            this._mouseHoverThrottled = false;
          }
        },
        _handleMouseHover: function(e, point) {
          if (this._mouseHoverThrottled) {
            return;
          }
          var layer, candidateHoveredLayer;
          for (var order = this._drawFirst; order; order = order.next) {
            layer = order.layer;
            if (layer.options.interactive && layer._containsPoint(point)) {
              candidateHoveredLayer = layer;
            }
          }
          if (candidateHoveredLayer !== this._hoveredLayer) {
            this._handleMouseOut(e);
            if (candidateHoveredLayer) {
              addClass(this._container, "leaflet-interactive");
              this._fireEvent([candidateHoveredLayer], e, "mouseover");
              this._hoveredLayer = candidateHoveredLayer;
            }
          }
          this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : false, e);
          this._mouseHoverThrottled = true;
          setTimeout(bind(function() {
            this._mouseHoverThrottled = false;
          }, this), 32);
        },
        _fireEvent: function(layers2, e, type2) {
          this._map._fireDOMEvent(e, type2 || e.type, layers2);
        },
        _bringToFront: function(layer) {
          var order = layer._order;
          if (!order) {
            return;
          }
          var next = order.next;
          var prev2 = order.prev;
          if (next) {
            next.prev = prev2;
          } else {
            return;
          }
          if (prev2) {
            prev2.next = next;
          } else if (next) {
            this._drawFirst = next;
          }
          order.prev = this._drawLast;
          this._drawLast.next = order;
          order.next = null;
          this._drawLast = order;
          this._requestRedraw(layer);
        },
        _bringToBack: function(layer) {
          var order = layer._order;
          if (!order) {
            return;
          }
          var next = order.next;
          var prev2 = order.prev;
          if (prev2) {
            prev2.next = next;
          } else {
            return;
          }
          if (next) {
            next.prev = prev2;
          } else if (prev2) {
            this._drawLast = prev2;
          }
          order.prev = null;
          order.next = this._drawFirst;
          this._drawFirst.prev = order;
          this._drawFirst = order;
          this._requestRedraw(layer);
        }
      });
      function canvas(options) {
        return Browser.canvas ? new Canvas(options) : null;
      }
      var vmlCreate = function() {
        try {
          document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml");
          return function(name) {
            return document.createElement("<lvml:" + name + ' class="lvml">');
          };
        } catch (e) {
        }
        return function(name) {
          return document.createElement("<" + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
        };
      }();
      var vmlMixin = {
        _initContainer: function() {
          this._container = create$1("div", "leaflet-vml-container");
        },
        _update: function() {
          if (this._map._animatingZoom) {
            return;
          }
          Renderer.prototype._update.call(this);
          this.fire("update");
        },
        _initPath: function(layer) {
          var container = layer._container = vmlCreate("shape");
          addClass(container, "leaflet-vml-shape " + (this.options.className || ""));
          container.coordsize = "1 1";
          layer._path = vmlCreate("path");
          container.appendChild(layer._path);
          this._updateStyle(layer);
          this._layers[stamp(layer)] = layer;
        },
        _addPath: function(layer) {
          var container = layer._container;
          this._container.appendChild(container);
          if (layer.options.interactive) {
            layer.addInteractiveTarget(container);
          }
        },
        _removePath: function(layer) {
          var container = layer._container;
          remove2(container);
          layer.removeInteractiveTarget(container);
          delete this._layers[stamp(layer)];
        },
        _updateStyle: function(layer) {
          var stroke = layer._stroke, fill = layer._fill, options = layer.options, container = layer._container;
          container.stroked = !!options.stroke;
          container.filled = !!options.fill;
          if (options.stroke) {
            if (!stroke) {
              stroke = layer._stroke = vmlCreate("stroke");
            }
            container.appendChild(stroke);
            stroke.weight = options.weight + "px";
            stroke.color = options.color;
            stroke.opacity = options.opacity;
            if (options.dashArray) {
              stroke.dashStyle = isArray(options.dashArray) ? options.dashArray.join(" ") : options.dashArray.replace(/( *, *)/g, " ");
            } else {
              stroke.dashStyle = "";
            }
            stroke.endcap = options.lineCap.replace("butt", "flat");
            stroke.joinstyle = options.lineJoin;
          } else if (stroke) {
            container.removeChild(stroke);
            layer._stroke = null;
          }
          if (options.fill) {
            if (!fill) {
              fill = layer._fill = vmlCreate("fill");
            }
            container.appendChild(fill);
            fill.color = options.fillColor || options.color;
            fill.opacity = options.fillOpacity;
          } else if (fill) {
            container.removeChild(fill);
            layer._fill = null;
          }
        },
        _updateCircle: function(layer) {
          var p = layer._point.round(), r = Math.round(layer._radius), r2 = Math.round(layer._radiusY || r);
          this._setPath(layer, layer._empty() ? "M0 0" : "AL " + p.x + "," + p.y + " " + r + "," + r2 + " 0," + 65535 * 360);
        },
        _setPath: function(layer, path) {
          layer._path.v = path;
        },
        _bringToFront: function(layer) {
          toFront(layer._container);
        },
        _bringToBack: function(layer) {
          toBack(layer._container);
        }
      };
      var create2 = Browser.vml ? vmlCreate : svgCreate;
      var SVG = Renderer.extend({
        _initContainer: function() {
          this._container = create2("svg");
          this._container.setAttribute("pointer-events", "none");
          this._rootGroup = create2("g");
          this._container.appendChild(this._rootGroup);
        },
        _destroyContainer: function() {
          remove2(this._container);
          off(this._container);
          delete this._container;
          delete this._rootGroup;
          delete this._svgSize;
        },
        _update: function() {
          if (this._map._animatingZoom && this._bounds) {
            return;
          }
          Renderer.prototype._update.call(this);
          var b = this._bounds, size = b.getSize(), container = this._container;
          if (!this._svgSize || !this._svgSize.equals(size)) {
            this._svgSize = size;
            container.setAttribute("width", size.x);
            container.setAttribute("height", size.y);
          }
          setPosition(container, b.min);
          container.setAttribute("viewBox", [b.min.x, b.min.y, size.x, size.y].join(" "));
          this.fire("update");
        },
        // methods below are called by vector layers implementations
        _initPath: function(layer) {
          var path = layer._path = create2("path");
          if (layer.options.className) {
            addClass(path, layer.options.className);
          }
          if (layer.options.interactive) {
            addClass(path, "leaflet-interactive");
          }
          this._updateStyle(layer);
          this._layers[stamp(layer)] = layer;
        },
        _addPath: function(layer) {
          if (!this._rootGroup) {
            this._initContainer();
          }
          this._rootGroup.appendChild(layer._path);
          layer.addInteractiveTarget(layer._path);
        },
        _removePath: function(layer) {
          remove2(layer._path);
          layer.removeInteractiveTarget(layer._path);
          delete this._layers[stamp(layer)];
        },
        _updatePath: function(layer) {
          layer._project();
          layer._update();
        },
        _updateStyle: function(layer) {
          var path = layer._path, options = layer.options;
          if (!path) {
            return;
          }
          if (options.stroke) {
            path.setAttribute("stroke", options.color);
            path.setAttribute("stroke-opacity", options.opacity);
            path.setAttribute("stroke-width", options.weight);
            path.setAttribute("stroke-linecap", options.lineCap);
            path.setAttribute("stroke-linejoin", options.lineJoin);
            if (options.dashArray) {
              path.setAttribute("stroke-dasharray", options.dashArray);
            } else {
              path.removeAttribute("stroke-dasharray");
            }
            if (options.dashOffset) {
              path.setAttribute("stroke-dashoffset", options.dashOffset);
            } else {
              path.removeAttribute("stroke-dashoffset");
            }
          } else {
            path.setAttribute("stroke", "none");
          }
          if (options.fill) {
            path.setAttribute("fill", options.fillColor || options.color);
            path.setAttribute("fill-opacity", options.fillOpacity);
            path.setAttribute("fill-rule", options.fillRule || "evenodd");
          } else {
            path.setAttribute("fill", "none");
          }
        },
        _updatePoly: function(layer, closed) {
          this._setPath(layer, pointsToPath(layer._parts, closed));
        },
        _updateCircle: function(layer) {
          var p = layer._point, r = Math.max(Math.round(layer._radius), 1), r2 = Math.max(Math.round(layer._radiusY), 1) || r, arc = "a" + r + "," + r2 + " 0 1,0 ";
          var d = layer._empty() ? "M0 0" : "M" + (p.x - r) + "," + p.y + arc + r * 2 + ",0 " + arc + -r * 2 + ",0 ";
          this._setPath(layer, d);
        },
        _setPath: function(layer, path) {
          layer._path.setAttribute("d", path);
        },
        // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
        _bringToFront: function(layer) {
          toFront(layer._path);
        },
        _bringToBack: function(layer) {
          toBack(layer._path);
        }
      });
      if (Browser.vml) {
        SVG.include(vmlMixin);
      }
      function svg(options) {
        return Browser.svg || Browser.vml ? new SVG(options) : null;
      }
      Map2.include({
        // @namespace Map; @method getRenderer(layer: Path): Renderer
        // Returns the instance of `Renderer` that should be used to render the given
        // `Path`. It will ensure that the `renderer` options of the map and paths
        // are respected, and that the renderers do exist on the map.
        getRenderer: function(layer) {
          var renderer = layer.options.renderer || this._getPaneRenderer(layer.options.pane) || this.options.renderer || this._renderer;
          if (!renderer) {
            renderer = this._renderer = this._createRenderer();
          }
          if (!this.hasLayer(renderer)) {
            this.addLayer(renderer);
          }
          return renderer;
        },
        _getPaneRenderer: function(name) {
          if (name === "overlayPane" || name === void 0) {
            return false;
          }
          var renderer = this._paneRenderers[name];
          if (renderer === void 0) {
            renderer = this._createRenderer({ pane: name });
            this._paneRenderers[name] = renderer;
          }
          return renderer;
        },
        _createRenderer: function(options) {
          return this.options.preferCanvas && canvas(options) || svg(options);
        }
      });
      var Rectangle = Polygon.extend({
        initialize: function(latLngBounds2, options) {
          Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds2), options);
        },
        // @method setBounds(latLngBounds: LatLngBounds): this
        // Redraws the rectangle with the passed bounds.
        setBounds: function(latLngBounds2) {
          return this.setLatLngs(this._boundsToLatLngs(latLngBounds2));
        },
        _boundsToLatLngs: function(latLngBounds2) {
          latLngBounds2 = toLatLngBounds(latLngBounds2);
          return [
            latLngBounds2.getSouthWest(),
            latLngBounds2.getNorthWest(),
            latLngBounds2.getNorthEast(),
            latLngBounds2.getSouthEast()
          ];
        }
      });
      function rectangle(latLngBounds2, options) {
        return new Rectangle(latLngBounds2, options);
      }
      SVG.create = create2;
      SVG.pointsToPath = pointsToPath;
      GeoJSON.geometryToLayer = geometryToLayer;
      GeoJSON.coordsToLatLng = coordsToLatLng;
      GeoJSON.coordsToLatLngs = coordsToLatLngs;
      GeoJSON.latLngToCoords = latLngToCoords;
      GeoJSON.latLngsToCoords = latLngsToCoords;
      GeoJSON.getFeature = getFeature;
      GeoJSON.asFeature = asFeature;
      Map2.mergeOptions({
        // @option boxZoom: Boolean = true
        // Whether the map can be zoomed to a rectangular area specified by
        // dragging the mouse while pressing the shift key.
        boxZoom: true
      });
      var BoxZoom = Handler.extend({
        initialize: function(map4) {
          this._map = map4;
          this._container = map4._container;
          this._pane = map4._panes.overlayPane;
          this._resetStateTimeout = 0;
          map4.on("unload", this._destroy, this);
        },
        addHooks: function() {
          on2(this._container, "mousedown", this._onMouseDown, this);
        },
        removeHooks: function() {
          off(this._container, "mousedown", this._onMouseDown, this);
        },
        moved: function() {
          return this._moved;
        },
        _destroy: function() {
          remove2(this._pane);
          delete this._pane;
        },
        _resetState: function() {
          this._resetStateTimeout = 0;
          this._moved = false;
        },
        _clearDeferredResetState: function() {
          if (this._resetStateTimeout !== 0) {
            clearTimeout(this._resetStateTimeout);
            this._resetStateTimeout = 0;
          }
        },
        _onMouseDown: function(e) {
          if (!e.shiftKey || e.which !== 1 && e.button !== 1) {
            return false;
          }
          this._clearDeferredResetState();
          this._resetState();
          disableTextSelection();
          disableImageDrag();
          this._startPoint = this._map.mouseEventToContainerPoint(e);
          on2(document, {
            contextmenu: stop,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseMove: function(e) {
          if (!this._moved) {
            this._moved = true;
            this._box = create$1("div", "leaflet-zoom-box", this._container);
            addClass(this._container, "leaflet-crosshair");
            this._map.fire("boxzoomstart");
          }
          this._point = this._map.mouseEventToContainerPoint(e);
          var bounds = new Bounds(this._point, this._startPoint), size = bounds.getSize();
          setPosition(this._box, bounds.min);
          this._box.style.width = size.x + "px";
          this._box.style.height = size.y + "px";
        },
        _finish: function() {
          if (this._moved) {
            remove2(this._box);
            removeClass(this._container, "leaflet-crosshair");
          }
          enableTextSelection();
          enableImageDrag();
          off(document, {
            contextmenu: stop,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseUp: function(e) {
          if (e.which !== 1 && e.button !== 1) {
            return;
          }
          this._finish();
          if (!this._moved) {
            return;
          }
          this._clearDeferredResetState();
          this._resetStateTimeout = setTimeout(bind(this._resetState, this), 0);
          var bounds = new LatLngBounds(
            this._map.containerPointToLatLng(this._startPoint),
            this._map.containerPointToLatLng(this._point)
          );
          this._map.fitBounds(bounds).fire("boxzoomend", { boxZoomBounds: bounds });
        },
        _onKeyDown: function(e) {
          if (e.keyCode === 27) {
            this._finish();
            this._clearDeferredResetState();
            this._resetState();
          }
        }
      });
      Map2.addInitHook("addHandler", "boxZoom", BoxZoom);
      Map2.mergeOptions({
        // @option doubleClickZoom: Boolean|String = true
        // Whether the map can be zoomed in by double clicking on it and
        // zoomed out by double clicking while holding shift. If passed
        // `'center'`, double-click zoom will zoom to the center of the
        //  view regardless of where the mouse was.
        doubleClickZoom: true
      });
      var DoubleClickZoom = Handler.extend({
        addHooks: function() {
          this._map.on("dblclick", this._onDoubleClick, this);
        },
        removeHooks: function() {
          this._map.off("dblclick", this._onDoubleClick, this);
        },
        _onDoubleClick: function(e) {
          var map4 = this._map, oldZoom = map4.getZoom(), delta = map4.options.zoomDelta, zoom2 = e.originalEvent.shiftKey ? oldZoom - delta : oldZoom + delta;
          if (map4.options.doubleClickZoom === "center") {
            map4.setZoom(zoom2);
          } else {
            map4.setZoomAround(e.containerPoint, zoom2);
          }
        }
      });
      Map2.addInitHook("addHandler", "doubleClickZoom", DoubleClickZoom);
      Map2.mergeOptions({
        // @option dragging: Boolean = true
        // Whether the map is draggable with mouse/touch or not.
        dragging: true,
        // @section Panning Inertia Options
        // @option inertia: Boolean = *
        // If enabled, panning of the map will have an inertia effect where
        // the map builds momentum while dragging and continues moving in
        // the same direction for some time. Feels especially nice on touch
        // devices. Enabled by default.
        inertia: true,
        // @option inertiaDeceleration: Number = 3000
        // The rate with which the inertial movement slows down, in pixels/second².
        inertiaDeceleration: 3400,
        // px/s^2
        // @option inertiaMaxSpeed: Number = Infinity
        // Max speed of the inertial movement, in pixels/second.
        inertiaMaxSpeed: Infinity,
        // px/s
        // @option easeLinearity: Number = 0.2
        easeLinearity: 0.2,
        // TODO refactor, move to CRS
        // @option worldCopyJump: Boolean = false
        // With this option enabled, the map tracks when you pan to another "copy"
        // of the world and seamlessly jumps to the original one so that all overlays
        // like markers and vector layers are still visible.
        worldCopyJump: false,
        // @option maxBoundsViscosity: Number = 0.0
        // If `maxBounds` is set, this option will control how solid the bounds
        // are when dragging the map around. The default value of `0.0` allows the
        // user to drag outside the bounds at normal speed, higher values will
        // slow down map dragging outside bounds, and `1.0` makes the bounds fully
        // solid, preventing the user from dragging outside the bounds.
        maxBoundsViscosity: 0
      });
      var Drag = Handler.extend({
        addHooks: function() {
          if (!this._draggable) {
            var map4 = this._map;
            this._draggable = new Draggable(map4._mapPane, map4._container);
            this._draggable.on({
              dragstart: this._onDragStart,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this);
            this._draggable.on("predrag", this._onPreDragLimit, this);
            if (map4.options.worldCopyJump) {
              this._draggable.on("predrag", this._onPreDragWrap, this);
              map4.on("zoomend", this._onZoomEnd, this);
              map4.whenReady(this._onZoomEnd, this);
            }
          }
          addClass(this._map._container, "leaflet-grab leaflet-touch-drag");
          this._draggable.enable();
          this._positions = [];
          this._times = [];
        },
        removeHooks: function() {
          removeClass(this._map._container, "leaflet-grab");
          removeClass(this._map._container, "leaflet-touch-drag");
          this._draggable.disable();
        },
        moved: function() {
          return this._draggable && this._draggable._moved;
        },
        moving: function() {
          return this._draggable && this._draggable._moving;
        },
        _onDragStart: function() {
          var map4 = this._map;
          map4._stop();
          if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
            var bounds = toLatLngBounds(this._map.options.maxBounds);
            this._offsetLimit = toBounds(
              this._map.latLngToContainerPoint(bounds.getNorthWest()).multiplyBy(-1),
              this._map.latLngToContainerPoint(bounds.getSouthEast()).multiplyBy(-1).add(this._map.getSize())
            );
            this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
          } else {
            this._offsetLimit = null;
          }
          map4.fire("movestart").fire("dragstart");
          if (map4.options.inertia) {
            this._positions = [];
            this._times = [];
          }
        },
        _onDrag: function(e) {
          if (this._map.options.inertia) {
            var time = this._lastTime = +/* @__PURE__ */ new Date(), pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;
            this._positions.push(pos);
            this._times.push(time);
            this._prunePositions(time);
          }
          this._map.fire("move", e).fire("drag", e);
        },
        _prunePositions: function(time) {
          while (this._positions.length > 1 && time - this._times[0] > 50) {
            this._positions.shift();
            this._times.shift();
          }
        },
        _onZoomEnd: function() {
          var pxCenter = this._map.getSize().divideBy(2), pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);
          this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
          this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
        },
        _viscousLimit: function(value2, threshold) {
          return value2 - (value2 - threshold) * this._viscosity;
        },
        _onPreDragLimit: function() {
          if (!this._viscosity || !this._offsetLimit) {
            return;
          }
          var offset = this._draggable._newPos.subtract(this._draggable._startPos);
          var limit = this._offsetLimit;
          if (offset.x < limit.min.x) {
            offset.x = this._viscousLimit(offset.x, limit.min.x);
          }
          if (offset.y < limit.min.y) {
            offset.y = this._viscousLimit(offset.y, limit.min.y);
          }
          if (offset.x > limit.max.x) {
            offset.x = this._viscousLimit(offset.x, limit.max.x);
          }
          if (offset.y > limit.max.y) {
            offset.y = this._viscousLimit(offset.y, limit.max.y);
          }
          this._draggable._newPos = this._draggable._startPos.add(offset);
        },
        _onPreDragWrap: function() {
          var worldWidth = this._worldWidth, halfWidth = Math.round(worldWidth / 2), dx = this._initialWorldOffset, x3 = this._draggable._newPos.x, newX1 = (x3 - halfWidth + dx) % worldWidth + halfWidth - dx, newX2 = (x3 + halfWidth + dx) % worldWidth - halfWidth - dx, newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;
          this._draggable._absPos = this._draggable._newPos.clone();
          this._draggable._newPos.x = newX;
        },
        _onDragEnd: function(e) {
          var map4 = this._map, options = map4.options, noInertia = !options.inertia || e.noInertia || this._times.length < 2;
          map4.fire("dragend", e);
          if (noInertia) {
            map4.fire("moveend");
          } else {
            this._prunePositions(+/* @__PURE__ */ new Date());
            var direction = this._lastPos.subtract(this._positions[0]), duration = (this._lastTime - this._times[0]) / 1e3, ease = options.easeLinearity, speedVector = direction.multiplyBy(ease / duration), speed = speedVector.distanceTo([0, 0]), limitedSpeed = Math.min(options.inertiaMaxSpeed, speed), limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed), decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease), offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();
            if (!offset.x && !offset.y) {
              map4.fire("moveend");
            } else {
              offset = map4._limitOffset(offset, map4.options.maxBounds);
              requestAnimFrame(function() {
                map4.panBy(offset, {
                  duration: decelerationDuration,
                  easeLinearity: ease,
                  noMoveStart: true,
                  animate: true
                });
              });
            }
          }
        }
      });
      Map2.addInitHook("addHandler", "dragging", Drag);
      Map2.mergeOptions({
        // @option keyboard: Boolean = true
        // Makes the map focusable and allows users to navigate the map with keyboard
        // arrows and `+`/`-` keys.
        keyboard: true,
        // @option keyboardPanDelta: Number = 80
        // Amount of pixels to pan when pressing an arrow key.
        keyboardPanDelta: 80
      });
      var Keyboard = Handler.extend({
        keyCodes: {
          left: [37],
          right: [39],
          down: [40],
          up: [38],
          zoomIn: [187, 107, 61, 171],
          zoomOut: [189, 109, 54, 173]
        },
        initialize: function(map4) {
          this._map = map4;
          this._setPanDelta(map4.options.keyboardPanDelta);
          this._setZoomDelta(map4.options.zoomDelta);
        },
        addHooks: function() {
          var container = this._map._container;
          if (container.tabIndex <= 0) {
            container.tabIndex = "0";
          }
          on2(container, {
            focus: this._onFocus,
            blur: this._onBlur,
            mousedown: this._onMouseDown
          }, this);
          this._map.on({
            focus: this._addHooks,
            blur: this._removeHooks
          }, this);
        },
        removeHooks: function() {
          this._removeHooks();
          off(this._map._container, {
            focus: this._onFocus,
            blur: this._onBlur,
            mousedown: this._onMouseDown
          }, this);
          this._map.off({
            focus: this._addHooks,
            blur: this._removeHooks
          }, this);
        },
        _onMouseDown: function() {
          if (this._focused) {
            return;
          }
          var body = document.body, docEl = document.documentElement, top = body.scrollTop || docEl.scrollTop, left = body.scrollLeft || docEl.scrollLeft;
          this._map._container.focus();
          window.scrollTo(left, top);
        },
        _onFocus: function() {
          this._focused = true;
          this._map.fire("focus");
        },
        _onBlur: function() {
          this._focused = false;
          this._map.fire("blur");
        },
        _setPanDelta: function(panDelta) {
          var keys = this._panKeys = {}, codes = this.keyCodes, i2, len;
          for (i2 = 0, len = codes.left.length; i2 < len; i2++) {
            keys[codes.left[i2]] = [-1 * panDelta, 0];
          }
          for (i2 = 0, len = codes.right.length; i2 < len; i2++) {
            keys[codes.right[i2]] = [panDelta, 0];
          }
          for (i2 = 0, len = codes.down.length; i2 < len; i2++) {
            keys[codes.down[i2]] = [0, panDelta];
          }
          for (i2 = 0, len = codes.up.length; i2 < len; i2++) {
            keys[codes.up[i2]] = [0, -1 * panDelta];
          }
        },
        _setZoomDelta: function(zoomDelta) {
          var keys = this._zoomKeys = {}, codes = this.keyCodes, i2, len;
          for (i2 = 0, len = codes.zoomIn.length; i2 < len; i2++) {
            keys[codes.zoomIn[i2]] = zoomDelta;
          }
          for (i2 = 0, len = codes.zoomOut.length; i2 < len; i2++) {
            keys[codes.zoomOut[i2]] = -zoomDelta;
          }
        },
        _addHooks: function() {
          on2(document, "keydown", this._onKeyDown, this);
        },
        _removeHooks: function() {
          off(document, "keydown", this._onKeyDown, this);
        },
        _onKeyDown: function(e) {
          if (e.altKey || e.ctrlKey || e.metaKey) {
            return;
          }
          var key = e.keyCode, map4 = this._map, offset;
          if (key in this._panKeys) {
            if (!map4._panAnim || !map4._panAnim._inProgress) {
              offset = this._panKeys[key];
              if (e.shiftKey) {
                offset = toPoint(offset).multiplyBy(3);
              }
              if (map4.options.maxBounds) {
                offset = map4._limitOffset(toPoint(offset), map4.options.maxBounds);
              }
              if (map4.options.worldCopyJump) {
                var newLatLng = map4.wrapLatLng(map4.unproject(map4.project(map4.getCenter()).add(offset)));
                map4.panTo(newLatLng);
              } else {
                map4.panBy(offset);
              }
            }
          } else if (key in this._zoomKeys) {
            map4.setZoom(map4.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[key]);
          } else if (key === 27 && map4._popup && map4._popup.options.closeOnEscapeKey) {
            map4.closePopup();
          } else {
            return;
          }
          stop(e);
        }
      });
      Map2.addInitHook("addHandler", "keyboard", Keyboard);
      Map2.mergeOptions({
        // @section Mouse wheel options
        // @option scrollWheelZoom: Boolean|String = true
        // Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
        // it will zoom to the center of the view regardless of where the mouse was.
        scrollWheelZoom: true,
        // @option wheelDebounceTime: Number = 40
        // Limits the rate at which a wheel can fire (in milliseconds). By default
        // user can't zoom via wheel more often than once per 40 ms.
        wheelDebounceTime: 40,
        // @option wheelPxPerZoomLevel: Number = 60
        // How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
        // mean a change of one full zoom level. Smaller values will make wheel-zooming
        // faster (and vice versa).
        wheelPxPerZoomLevel: 60
      });
      var ScrollWheelZoom = Handler.extend({
        addHooks: function() {
          on2(this._map._container, "wheel", this._onWheelScroll, this);
          this._delta = 0;
        },
        removeHooks: function() {
          off(this._map._container, "wheel", this._onWheelScroll, this);
        },
        _onWheelScroll: function(e) {
          var delta = getWheelDelta(e);
          var debounce = this._map.options.wheelDebounceTime;
          this._delta += delta;
          this._lastMousePos = this._map.mouseEventToContainerPoint(e);
          if (!this._startTime) {
            this._startTime = +/* @__PURE__ */ new Date();
          }
          var left = Math.max(debounce - (+/* @__PURE__ */ new Date() - this._startTime), 0);
          clearTimeout(this._timer);
          this._timer = setTimeout(bind(this._performZoom, this), left);
          stop(e);
        },
        _performZoom: function() {
          var map4 = this._map, zoom2 = map4.getZoom(), snap = this._map.options.zoomSnap || 0;
          map4._stop();
          var d2 = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), d3 = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(d2)))) / Math.LN2, d4 = snap ? Math.ceil(d3 / snap) * snap : d3, delta = map4._limitZoom(zoom2 + (this._delta > 0 ? d4 : -d4)) - zoom2;
          this._delta = 0;
          this._startTime = null;
          if (!delta) {
            return;
          }
          if (map4.options.scrollWheelZoom === "center") {
            map4.setZoom(zoom2 + delta);
          } else {
            map4.setZoomAround(this._lastMousePos, zoom2 + delta);
          }
        }
      });
      Map2.addInitHook("addHandler", "scrollWheelZoom", ScrollWheelZoom);
      var tapHoldDelay = 600;
      Map2.mergeOptions({
        // @section Touch interaction options
        // @option tapHold: Boolean
        // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
        tapHold: Browser.touchNative && Browser.safari && Browser.mobile,
        // @option tapTolerance: Number = 15
        // The max number of pixels a user can shift his finger during touch
        // for it to be considered a valid tap.
        tapTolerance: 15
      });
      var TapHold = Handler.extend({
        addHooks: function() {
          on2(this._map._container, "touchstart", this._onDown, this);
        },
        removeHooks: function() {
          off(this._map._container, "touchstart", this._onDown, this);
        },
        _onDown: function(e) {
          clearTimeout(this._holdTimeout);
          if (e.touches.length !== 1) {
            return;
          }
          var first = e.touches[0];
          this._startPos = this._newPos = new Point(first.clientX, first.clientY);
          this._holdTimeout = setTimeout(bind(function() {
            this._cancel();
            if (!this._isTapValid()) {
              return;
            }
            on2(document, "touchend", preventDefault);
            on2(document, "touchend touchcancel", this._cancelClickPrevent);
            this._simulateEvent("contextmenu", first);
          }, this), tapHoldDelay);
          on2(document, "touchend touchcancel contextmenu", this._cancel, this);
          on2(document, "touchmove", this._onMove, this);
        },
        _cancelClickPrevent: function cancelClickPrevent() {
          off(document, "touchend", preventDefault);
          off(document, "touchend touchcancel", cancelClickPrevent);
        },
        _cancel: function() {
          clearTimeout(this._holdTimeout);
          off(document, "touchend touchcancel contextmenu", this._cancel, this);
          off(document, "touchmove", this._onMove, this);
        },
        _onMove: function(e) {
          var first = e.touches[0];
          this._newPos = new Point(first.clientX, first.clientY);
        },
        _isTapValid: function() {
          return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
        },
        _simulateEvent: function(type2, e) {
          var simulatedEvent = new MouseEvent(type2, {
            bubbles: true,
            cancelable: true,
            view: window,
            // detail: 1,
            screenX: e.screenX,
            screenY: e.screenY,
            clientX: e.clientX,
            clientY: e.clientY
            // button: 2,
            // buttons: 2
          });
          simulatedEvent._simulated = true;
          e.target.dispatchEvent(simulatedEvent);
        }
      });
      Map2.addInitHook("addHandler", "tapHold", TapHold);
      Map2.mergeOptions({
        // @section Touch interaction options
        // @option touchZoom: Boolean|String = *
        // Whether the map can be zoomed by touch-dragging with two fingers. If
        // passed `'center'`, it will zoom to the center of the view regardless of
        // where the touch events (fingers) were. Enabled for touch-capable web
        // browsers.
        touchZoom: Browser.touch,
        // @option bounceAtZoomLimits: Boolean = true
        // Set it to false if you don't want the map to zoom beyond min/max zoom
        // and then bounce back when pinch-zooming.
        bounceAtZoomLimits: true
      });
      var TouchZoom = Handler.extend({
        addHooks: function() {
          addClass(this._map._container, "leaflet-touch-zoom");
          on2(this._map._container, "touchstart", this._onTouchStart, this);
        },
        removeHooks: function() {
          removeClass(this._map._container, "leaflet-touch-zoom");
          off(this._map._container, "touchstart", this._onTouchStart, this);
        },
        _onTouchStart: function(e) {
          var map4 = this._map;
          if (!e.touches || e.touches.length !== 2 || map4._animatingZoom || this._zooming) {
            return;
          }
          var p1 = map4.mouseEventToContainerPoint(e.touches[0]), p2 = map4.mouseEventToContainerPoint(e.touches[1]);
          this._centerPoint = map4.getSize()._divideBy(2);
          this._startLatLng = map4.containerPointToLatLng(this._centerPoint);
          if (map4.options.touchZoom !== "center") {
            this._pinchStartLatLng = map4.containerPointToLatLng(p1.add(p2)._divideBy(2));
          }
          this._startDist = p1.distanceTo(p2);
          this._startZoom = map4.getZoom();
          this._moved = false;
          this._zooming = true;
          map4._stop();
          on2(document, "touchmove", this._onTouchMove, this);
          on2(document, "touchend touchcancel", this._onTouchEnd, this);
          preventDefault(e);
        },
        _onTouchMove: function(e) {
          if (!e.touches || e.touches.length !== 2 || !this._zooming) {
            return;
          }
          var map4 = this._map, p1 = map4.mouseEventToContainerPoint(e.touches[0]), p2 = map4.mouseEventToContainerPoint(e.touches[1]), scale2 = p1.distanceTo(p2) / this._startDist;
          this._zoom = map4.getScaleZoom(scale2, this._startZoom);
          if (!map4.options.bounceAtZoomLimits && (this._zoom < map4.getMinZoom() && scale2 < 1 || this._zoom > map4.getMaxZoom() && scale2 > 1)) {
            this._zoom = map4._limitZoom(this._zoom);
          }
          if (map4.options.touchZoom === "center") {
            this._center = this._startLatLng;
            if (scale2 === 1) {
              return;
            }
          } else {
            var delta = p1._add(p2)._divideBy(2)._subtract(this._centerPoint);
            if (scale2 === 1 && delta.x === 0 && delta.y === 0) {
              return;
            }
            this._center = map4.unproject(map4.project(this._pinchStartLatLng, this._zoom).subtract(delta), this._zoom);
          }
          if (!this._moved) {
            map4._moveStart(true, false);
            this._moved = true;
          }
          cancelAnimFrame(this._animRequest);
          var moveFn = bind(map4._move, map4, this._center, this._zoom, { pinch: true, round: false }, void 0);
          this._animRequest = requestAnimFrame(moveFn, this, true);
          preventDefault(e);
        },
        _onTouchEnd: function() {
          if (!this._moved || !this._zooming) {
            this._zooming = false;
            return;
          }
          this._zooming = false;
          cancelAnimFrame(this._animRequest);
          off(document, "touchmove", this._onTouchMove, this);
          off(document, "touchend touchcancel", this._onTouchEnd, this);
          if (this._map.options.zoomAnimation) {
            this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), true, this._map.options.zoomSnap);
          } else {
            this._map._resetView(this._center, this._map._limitZoom(this._zoom));
          }
        }
      });
      Map2.addInitHook("addHandler", "touchZoom", TouchZoom);
      Map2.BoxZoom = BoxZoom;
      Map2.DoubleClickZoom = DoubleClickZoom;
      Map2.Drag = Drag;
      Map2.Keyboard = Keyboard;
      Map2.ScrollWheelZoom = ScrollWheelZoom;
      Map2.TapHold = TapHold;
      Map2.TouchZoom = TouchZoom;
      exports2.Bounds = Bounds;
      exports2.Browser = Browser;
      exports2.CRS = CRS;
      exports2.Canvas = Canvas;
      exports2.Circle = Circle;
      exports2.CircleMarker = CircleMarker;
      exports2.Class = Class;
      exports2.Control = Control;
      exports2.DivIcon = DivIcon;
      exports2.DivOverlay = DivOverlay;
      exports2.DomEvent = DomEvent;
      exports2.DomUtil = DomUtil;
      exports2.Draggable = Draggable;
      exports2.Evented = Evented;
      exports2.FeatureGroup = FeatureGroup;
      exports2.GeoJSON = GeoJSON;
      exports2.GridLayer = GridLayer;
      exports2.Handler = Handler;
      exports2.Icon = Icon;
      exports2.ImageOverlay = ImageOverlay;
      exports2.LatLng = LatLng;
      exports2.LatLngBounds = LatLngBounds;
      exports2.Layer = Layer;
      exports2.LayerGroup = LayerGroup;
      exports2.LineUtil = LineUtil;
      exports2.Map = Map2;
      exports2.Marker = Marker;
      exports2.Mixin = Mixin;
      exports2.Path = Path;
      exports2.Point = Point;
      exports2.PolyUtil = PolyUtil;
      exports2.Polygon = Polygon;
      exports2.Polyline = Polyline;
      exports2.Popup = Popup;
      exports2.PosAnimation = PosAnimation;
      exports2.Projection = index2;
      exports2.Rectangle = Rectangle;
      exports2.Renderer = Renderer;
      exports2.SVG = SVG;
      exports2.SVGOverlay = SVGOverlay;
      exports2.TileLayer = TileLayer;
      exports2.Tooltip = Tooltip;
      exports2.Transformation = Transformation;
      exports2.Util = Util;
      exports2.VideoOverlay = VideoOverlay;
      exports2.bind = bind;
      exports2.bounds = toBounds;
      exports2.canvas = canvas;
      exports2.circle = circle;
      exports2.circleMarker = circleMarker2;
      exports2.control = control;
      exports2.divIcon = divIcon2;
      exports2.extend = extend2;
      exports2.featureGroup = featureGroup;
      exports2.geoJSON = geoJSON;
      exports2.geoJson = geoJson;
      exports2.gridLayer = gridLayer;
      exports2.icon = icon;
      exports2.imageOverlay = imageOverlay;
      exports2.latLng = toLatLng;
      exports2.latLngBounds = toLatLngBounds;
      exports2.layerGroup = layerGroup3;
      exports2.map = createMap;
      exports2.marker = marker2;
      exports2.point = toPoint;
      exports2.polygon = polygon;
      exports2.polyline = polyline3;
      exports2.popup = popup;
      exports2.rectangle = rectangle;
      exports2.setOptions = setOptions;
      exports2.stamp = stamp;
      exports2.svg = svg;
      exports2.svgOverlay = svgOverlay;
      exports2.tileLayer = tileLayer3;
      exports2.tooltip = tooltip;
      exports2.transformation = toTransformation;
      exports2.version = version;
      exports2.videoOverlay = videoOverlay;
      var oldL = window.L;
      exports2.noConflict = function() {
        window.L = oldL;
        return this;
      };
      window.L = exports2;
    });
  }
});

// src/app/shared/live-map/live-map.component.ts
var L2 = __toESM(require_leaflet_src());

// src/app/utils/severity.utils.ts
function severityColor(severity) {
  switch (severity) {
    case "Critical":
      return "#ef4444";
    case "High":
      return "#f97316";
    case "Medium":
      return "#f59e0b";
    case "Low":
      return "#22c55e";
    default:
      return "#7ba7cc";
  }
}
function severityBadgeClass(severity) {
  return `badge badge-${severity.toLowerCase()}`;
}
function severityWeight(severity) {
  switch (severity) {
    case "Critical":
      return 2.5;
    case "High":
      return 2;
    case "Medium":
      return 1.5;
    case "Low":
      return 1;
    default:
      return 1;
  }
}
function severityGlow(severity, alpha = 0.25) {
  const hex2 = severityColor(severity);
  const r = parseInt(hex2.slice(1, 3), 16);
  const g = parseInt(hex2.slice(3, 5), 16);
  const b = parseInt(hex2.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// node_modules/engine.io-parser/build/esm/commons.js
var PACKET_TYPES = /* @__PURE__ */ Object.create(null);
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
var PACKET_TYPES_REVERSE = /* @__PURE__ */ Object.create(null);
Object.keys(PACKET_TYPES).forEach((key) => {
  PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
var ERROR_PACKET = { type: "error", data: "parser error" };

// node_modules/engine.io-parser/build/esm/encodePacket.browser.js
var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
var withNativeArrayBuffer = typeof ArrayBuffer === "function";
var isView = (obj) => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
};
var encodePacket = ({ type: type2, data }, supportsBinary, callback) => {
  if (withNativeBlob && data instanceof Blob) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(data, callback);
    }
  } else if (withNativeArrayBuffer && (data instanceof ArrayBuffer || isView(data))) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(new Blob([data]), callback);
    }
  }
  return callback(PACKET_TYPES[type2] + (data || ""));
};
var encodeBlobAsBase64 = (data, callback) => {
  const fileReader = new FileReader();
  fileReader.onload = function() {
    const content = fileReader.result.split(",")[1];
    callback("b" + (content || ""));
  };
  return fileReader.readAsDataURL(data);
};
function toArray(data) {
  if (data instanceof Uint8Array) {
    return data;
  } else if (data instanceof ArrayBuffer) {
    return new Uint8Array(data);
  } else {
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  }
}
var TEXT_ENCODER;
function encodePacketToBinary(packet, callback) {
  if (withNativeBlob && packet.data instanceof Blob) {
    return packet.data.arrayBuffer().then(toArray).then(callback);
  } else if (withNativeArrayBuffer && (packet.data instanceof ArrayBuffer || isView(packet.data))) {
    return callback(toArray(packet.data));
  }
  encodePacket(packet, false, (encoded) => {
    if (!TEXT_ENCODER) {
      TEXT_ENCODER = new TextEncoder();
    }
    callback(TEXT_ENCODER.encode(encoded));
  });
}

// node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (let i2 = 0; i2 < chars.length; i2++) {
  lookup[chars.charCodeAt(i2)] = i2;
}
var decode = (base64) => {
  let bufferLength = base64.length * 0.75, len = base64.length, i2, p = 0, encoded1, encoded2, encoded3, encoded4;
  if (base64[base64.length - 1] === "=") {
    bufferLength--;
    if (base64[base64.length - 2] === "=") {
      bufferLength--;
    }
  }
  const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
  for (i2 = 0; i2 < len; i2 += 4) {
    encoded1 = lookup[base64.charCodeAt(i2)];
    encoded2 = lookup[base64.charCodeAt(i2 + 1)];
    encoded3 = lookup[base64.charCodeAt(i2 + 2)];
    encoded4 = lookup[base64.charCodeAt(i2 + 3)];
    bytes[p++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return arraybuffer;
};

// node_modules/engine.io-parser/build/esm/decodePacket.browser.js
var withNativeArrayBuffer2 = typeof ArrayBuffer === "function";
var decodePacket = (encodedPacket, binaryType) => {
  if (typeof encodedPacket !== "string") {
    return {
      type: "message",
      data: mapBinary(encodedPacket, binaryType)
    };
  }
  const type2 = encodedPacket.charAt(0);
  if (type2 === "b") {
    return {
      type: "message",
      data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
    };
  }
  const packetType = PACKET_TYPES_REVERSE[type2];
  if (!packetType) {
    return ERROR_PACKET;
  }
  return encodedPacket.length > 1 ? {
    type: PACKET_TYPES_REVERSE[type2],
    data: encodedPacket.substring(1)
  } : {
    type: PACKET_TYPES_REVERSE[type2]
  };
};
var decodeBase64Packet = (data, binaryType) => {
  if (withNativeArrayBuffer2) {
    const decoded = decode(data);
    return mapBinary(decoded, binaryType);
  } else {
    return { base64: true, data };
  }
};
var mapBinary = (data, binaryType) => {
  switch (binaryType) {
    case "blob":
      if (data instanceof Blob) {
        return data;
      } else {
        return new Blob([data]);
      }
    case "arraybuffer":
    default:
      if (data instanceof ArrayBuffer) {
        return data;
      } else {
        return data.buffer;
      }
  }
};

// node_modules/engine.io-parser/build/esm/index.js
var SEPARATOR = String.fromCharCode(30);
var encodePayload = (packets, callback) => {
  const length2 = packets.length;
  const encodedPackets = new Array(length2);
  let count = 0;
  packets.forEach((packet, i2) => {
    encodePacket(packet, false, (encodedPacket) => {
      encodedPackets[i2] = encodedPacket;
      if (++count === length2) {
        callback(encodedPackets.join(SEPARATOR));
      }
    });
  });
};
var decodePayload = (encodedPayload, binaryType) => {
  const encodedPackets = encodedPayload.split(SEPARATOR);
  const packets = [];
  for (let i2 = 0; i2 < encodedPackets.length; i2++) {
    const decodedPacket = decodePacket(encodedPackets[i2], binaryType);
    packets.push(decodedPacket);
    if (decodedPacket.type === "error") {
      break;
    }
  }
  return packets;
};
function createPacketEncoderStream() {
  return new TransformStream({
    transform(packet, controller) {
      encodePacketToBinary(packet, (encodedPacket) => {
        const payloadLength = encodedPacket.length;
        let header;
        if (payloadLength < 126) {
          header = new Uint8Array(1);
          new DataView(header.buffer).setUint8(0, payloadLength);
        } else if (payloadLength < 65536) {
          header = new Uint8Array(3);
          const view = new DataView(header.buffer);
          view.setUint8(0, 126);
          view.setUint16(1, payloadLength);
        } else {
          header = new Uint8Array(9);
          const view = new DataView(header.buffer);
          view.setUint8(0, 127);
          view.setBigUint64(1, BigInt(payloadLength));
        }
        if (packet.data && typeof packet.data !== "string") {
          header[0] |= 128;
        }
        controller.enqueue(header);
        controller.enqueue(encodedPacket);
      });
    }
  });
}
var TEXT_DECODER;
function totalLength(chunks) {
  return chunks.reduce((acc, chunk) => acc + chunk.length, 0);
}
function concatChunks(chunks, size) {
  if (chunks[0].length === size) {
    return chunks.shift();
  }
  const buffer = new Uint8Array(size);
  let j = 0;
  for (let i2 = 0; i2 < size; i2++) {
    buffer[i2] = chunks[0][j++];
    if (j === chunks[0].length) {
      chunks.shift();
      j = 0;
    }
  }
  if (chunks.length && j < chunks[0].length) {
    chunks[0] = chunks[0].slice(j);
  }
  return buffer;
}
function createPacketDecoderStream(maxPayload, binaryType) {
  if (!TEXT_DECODER) {
    TEXT_DECODER = new TextDecoder();
  }
  const chunks = [];
  let state = 0;
  let expectedLength = -1;
  let isBinary2 = false;
  return new TransformStream({
    transform(chunk, controller) {
      chunks.push(chunk);
      while (true) {
        if (state === 0) {
          if (totalLength(chunks) < 1) {
            break;
          }
          const header = concatChunks(chunks, 1);
          isBinary2 = (header[0] & 128) === 128;
          expectedLength = header[0] & 127;
          if (expectedLength < 126) {
            state = 3;
          } else if (expectedLength === 126) {
            state = 1;
          } else {
            state = 2;
          }
        } else if (state === 1) {
          if (totalLength(chunks) < 2) {
            break;
          }
          const headerArray = concatChunks(chunks, 2);
          expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
          state = 3;
        } else if (state === 2) {
          if (totalLength(chunks) < 8) {
            break;
          }
          const headerArray = concatChunks(chunks, 8);
          const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
          const n = view.getUint32(0);
          if (n > Math.pow(2, 53 - 32) - 1) {
            controller.enqueue(ERROR_PACKET);
            break;
          }
          expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
          state = 3;
        } else {
          if (totalLength(chunks) < expectedLength) {
            break;
          }
          const data = concatChunks(chunks, expectedLength);
          controller.enqueue(decodePacket(isBinary2 ? data : TEXT_DECODER.decode(data), binaryType));
          state = 0;
        }
        if (expectedLength === 0 || expectedLength > maxPayload) {
          controller.enqueue(ERROR_PACKET);
          break;
        }
      }
    }
  });
}
var protocol = 4;

// node_modules/@socket.io/component-emitter/lib/esm/index.js
function Emitter(obj) {
  if (obj)
    return mixin(obj);
}
function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}
Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
  return this;
};
Emitter.prototype.once = function(event, fn) {
  function on2() {
    this.off(event, on2);
    fn.apply(this, arguments);
  }
  on2.fn = fn;
  this.on(event, on2);
  return this;
};
Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
  this._callbacks = this._callbacks || {};
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }
  var callbacks = this._callbacks["$" + event];
  if (!callbacks)
    return this;
  if (1 == arguments.length) {
    delete this._callbacks["$" + event];
    return this;
  }
  var cb;
  for (var i2 = 0; i2 < callbacks.length; i2++) {
    cb = callbacks[i2];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i2, 1);
      break;
    }
  }
  if (callbacks.length === 0) {
    delete this._callbacks["$" + event];
  }
  return this;
};
Emitter.prototype.emit = function(event) {
  this._callbacks = this._callbacks || {};
  var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
  for (var i2 = 1; i2 < arguments.length; i2++) {
    args[i2 - 1] = arguments[i2];
  }
  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i2 = 0, len = callbacks.length; i2 < len; ++i2) {
      callbacks[i2].apply(this, args);
    }
  }
  return this;
};
Emitter.prototype.emitReserved = Emitter.prototype.emit;
Emitter.prototype.listeners = function(event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks["$" + event] || [];
};
Emitter.prototype.hasListeners = function(event) {
  return !!this.listeners(event).length;
};

// node_modules/engine.io-client/build/esm/globalThis.browser.js
var globalThisShim = (() => {
  if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else {
    return Function("return this")();
  }
})();

// node_modules/engine.io-client/build/esm/util.js
function pick(obj, ...attr) {
  return attr.reduce((acc, k) => {
    if (obj.hasOwnProperty(k)) {
      acc[k] = obj[k];
    }
    return acc;
  }, {});
}
var NATIVE_SET_TIMEOUT = globalThisShim.setTimeout;
var NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
function installTimerFunctions(obj, opts) {
  if (opts.useNativeTimers) {
    obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
    obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
  } else {
    obj.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim);
    obj.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim);
  }
}
var BASE64_OVERHEAD = 1.33;
function byteLength(obj) {
  if (typeof obj === "string") {
    return utf8Length(obj);
  }
  return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
  let c2 = 0, length2 = 0;
  for (let i2 = 0, l = str.length; i2 < l; i2++) {
    c2 = str.charCodeAt(i2);
    if (c2 < 128) {
      length2 += 1;
    } else if (c2 < 2048) {
      length2 += 2;
    } else if (c2 < 55296 || c2 >= 57344) {
      length2 += 3;
    } else {
      i2++;
      length2 += 4;
    }
  }
  return length2;
}

// node_modules/engine.io-client/build/esm/contrib/parseqs.js
function encode(obj) {
  let str = "";
  for (let i2 in obj) {
    if (obj.hasOwnProperty(i2)) {
      if (str.length)
        str += "&";
      str += encodeURIComponent(i2) + "=" + encodeURIComponent(obj[i2]);
    }
  }
  return str;
}
function decode2(qs) {
  let qry = {};
  let pairs = qs.split("&");
  for (let i2 = 0, l = pairs.length; i2 < l; i2++) {
    let pair = pairs[i2].split("=");
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
}

// node_modules/engine.io-client/build/esm/transport.js
var TransportError = class extends Error {
  constructor(reason, description, context) {
    super(reason);
    this.description = description;
    this.context = context;
    this.type = "TransportError";
  }
};
var Transport = class extends Emitter {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(opts) {
    super();
    this.writable = false;
    installTimerFunctions(this, opts);
    this.opts = opts;
    this.query = opts.query;
    this.socket = opts.socket;
  }
  /**
   * Emits an error.
   *
   * @param {String} reason
   * @param description
   * @param context - the error context
   * @return {Transport} for chaining
   * @protected
   */
  onError(reason, description, context) {
    super.emitReserved("error", new TransportError(reason, description, context));
    return this;
  }
  /**
   * Opens the transport.
   */
  open() {
    this.readyState = "opening";
    this.doOpen();
    return this;
  }
  /**
   * Closes the transport.
   */
  close() {
    if (this.readyState === "opening" || this.readyState === "open") {
      this.doClose();
      this.onClose();
    }
    return this;
  }
  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   */
  send(packets) {
    if (this.readyState === "open") {
      this.write(packets);
    } else {
    }
  }
  /**
   * Called upon open
   *
   * @protected
   */
  onOpen() {
    this.readyState = "open";
    this.writable = true;
    super.emitReserved("open");
  }
  /**
   * Called with data.
   *
   * @param {String} data
   * @protected
   */
  onData(data) {
    const packet = decodePacket(data, this.socket.binaryType);
    this.onPacket(packet);
  }
  /**
   * Called with a decoded packet.
   *
   * @protected
   */
  onPacket(packet) {
    super.emitReserved("packet", packet);
  }
  /**
   * Called upon close.
   *
   * @protected
   */
  onClose(details) {
    this.readyState = "closed";
    super.emitReserved("close", details);
  }
  /**
   * Pauses the transport, in order not to lose packets during an upgrade.
   *
   * @param onPause
   */
  pause(onPause) {
  }
  createUri(schema, query = {}) {
    return schema + "://" + this._hostname() + this._port() + this.opts.path + this._query(query);
  }
  _hostname() {
    const hostname = this.opts.hostname;
    return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
  }
  _port() {
    if (this.opts.port && (this.opts.secure && Number(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80)) {
      return ":" + this.opts.port;
    } else {
      return "";
    }
  }
  _query(query) {
    const encodedQuery = encode(query);
    return encodedQuery.length ? "?" + encodedQuery : "";
  }
};

// node_modules/engine.io-client/build/esm/contrib/yeast.js
var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split("");
var length = 64;
var map = {};
var seed = 0;
var i = 0;
var prev;
function encode2(num) {
  let encoded = "";
  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);
  return encoded;
}
function yeast() {
  const now2 = encode2(+/* @__PURE__ */ new Date());
  if (now2 !== prev)
    return seed = 0, prev = now2;
  return now2 + "." + encode2(seed++);
}
for (; i < length; i++)
  map[alphabet[i]] = i;

// node_modules/engine.io-client/build/esm/contrib/has-cors.js
var value = false;
try {
  value = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
} catch (err) {
}
var hasCORS = value;

// node_modules/engine.io-client/build/esm/transports/xmlhttprequest.browser.js
function XHR(opts) {
  const xdomain = opts.xdomain;
  try {
    if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) {
  }
  if (!xdomain) {
    try {
      return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch (e) {
    }
  }
}
function createCookieJar() {
}

// node_modules/engine.io-client/build/esm/transports/polling.js
function empty() {
}
var hasXHR2 = function() {
  const xhr = new XHR({
    xdomain: false
  });
  return null != xhr.responseType;
}();
var Polling = class extends Transport {
  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @package
   */
  constructor(opts) {
    super(opts);
    this.polling = false;
    if (typeof location !== "undefined") {
      const isSSL = "https:" === location.protocol;
      let port = location.port;
      if (!port) {
        port = isSSL ? "443" : "80";
      }
      this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
    }
    const forceBase64 = opts && opts.forceBase64;
    this.supportsBinary = hasXHR2 && !forceBase64;
    if (this.opts.withCredentials) {
      this.cookieJar = createCookieJar();
    }
  }
  get name() {
    return "polling";
  }
  /**
   * Opens the socket (triggers polling). We write a PING message to determine
   * when the transport is open.
   *
   * @protected
   */
  doOpen() {
    this.poll();
  }
  /**
   * Pauses polling.
   *
   * @param {Function} onPause - callback upon buffers are flushed and transport is paused
   * @package
   */
  pause(onPause) {
    this.readyState = "pausing";
    const pause = () => {
      this.readyState = "paused";
      onPause();
    };
    if (this.polling || !this.writable) {
      let total = 0;
      if (this.polling) {
        total++;
        this.once("pollComplete", function() {
          --total || pause();
        });
      }
      if (!this.writable) {
        total++;
        this.once("drain", function() {
          --total || pause();
        });
      }
    } else {
      pause();
    }
  }
  /**
   * Starts polling cycle.
   *
   * @private
   */
  poll() {
    this.polling = true;
    this.doPoll();
    this.emitReserved("poll");
  }
  /**
   * Overloads onData to detect payloads.
   *
   * @protected
   */
  onData(data) {
    const callback = (packet) => {
      if ("opening" === this.readyState && packet.type === "open") {
        this.onOpen();
      }
      if ("close" === packet.type) {
        this.onClose({ description: "transport closed by the server" });
        return false;
      }
      this.onPacket(packet);
    };
    decodePayload(data, this.socket.binaryType).forEach(callback);
    if ("closed" !== this.readyState) {
      this.polling = false;
      this.emitReserved("pollComplete");
      if ("open" === this.readyState) {
        this.poll();
      } else {
      }
    }
  }
  /**
   * For polling, send a close packet.
   *
   * @protected
   */
  doClose() {
    const close = () => {
      this.write([{ type: "close" }]);
    };
    if ("open" === this.readyState) {
      close();
    } else {
      this.once("open", close);
    }
  }
  /**
   * Writes a packets payload.
   *
   * @param {Array} packets - data packets
   * @protected
   */
  write(packets) {
    this.writable = false;
    encodePayload(packets, (data) => {
      this.doWrite(data, () => {
        this.writable = true;
        this.emitReserved("drain");
      });
    });
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const schema = this.opts.secure ? "https" : "http";
    const query = this.query || {};
    if (false !== this.opts.timestampRequests) {
      query[this.opts.timestampParam] = yeast();
    }
    if (!this.supportsBinary && !query.sid) {
      query.b64 = 1;
    }
    return this.createUri(schema, query);
  }
  /**
   * Creates a request.
   *
   * @param {String} method
   * @private
   */
  request(opts = {}) {
    Object.assign(opts, { xd: this.xd, cookieJar: this.cookieJar }, this.opts);
    return new Request(this.uri(), opts);
  }
  /**
   * Sends data.
   *
   * @param {String} data to send.
   * @param {Function} called upon flush.
   * @private
   */
  doWrite(data, fn) {
    const req = this.request({
      method: "POST",
      data
    });
    req.on("success", fn);
    req.on("error", (xhrStatus, context) => {
      this.onError("xhr post error", xhrStatus, context);
    });
  }
  /**
   * Starts a poll cycle.
   *
   * @private
   */
  doPoll() {
    const req = this.request();
    req.on("data", this.onData.bind(this));
    req.on("error", (xhrStatus, context) => {
      this.onError("xhr poll error", xhrStatus, context);
    });
    this.pollXhr = req;
  }
};
var Request = class _Request extends Emitter {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(uri, opts) {
    super();
    installTimerFunctions(this, opts);
    this.opts = opts;
    this.method = opts.method || "GET";
    this.uri = uri;
    this.data = void 0 !== opts.data ? opts.data : null;
    this.create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  create() {
    var _a;
    const opts = pick(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    opts.xdomain = !!this.opts.xd;
    const xhr = this.xhr = new XHR(opts);
    try {
      xhr.open(this.method, this.uri, true);
      try {
        if (this.opts.extraHeaders) {
          xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
          for (let i2 in this.opts.extraHeaders) {
            if (this.opts.extraHeaders.hasOwnProperty(i2)) {
              xhr.setRequestHeader(i2, this.opts.extraHeaders[i2]);
            }
          }
        }
      } catch (e) {
      }
      if ("POST" === this.method) {
        try {
          xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch (e) {
        }
      }
      try {
        xhr.setRequestHeader("Accept", "*/*");
      } catch (e) {
      }
      (_a = this.opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr);
      if ("withCredentials" in xhr) {
        xhr.withCredentials = this.opts.withCredentials;
      }
      if (this.opts.requestTimeout) {
        xhr.timeout = this.opts.requestTimeout;
      }
      xhr.onreadystatechange = () => {
        var _a2;
        if (xhr.readyState === 3) {
          (_a2 = this.opts.cookieJar) === null || _a2 === void 0 ? void 0 : _a2.parseCookies(xhr);
        }
        if (4 !== xhr.readyState)
          return;
        if (200 === xhr.status || 1223 === xhr.status) {
          this.onLoad();
        } else {
          this.setTimeoutFn(() => {
            this.onError(typeof xhr.status === "number" ? xhr.status : 0);
          }, 0);
        }
      };
      xhr.send(this.data);
    } catch (e) {
      this.setTimeoutFn(() => {
        this.onError(e);
      }, 0);
      return;
    }
    if (typeof document !== "undefined") {
      this.index = _Request.requestsCount++;
      _Request.requests[this.index] = this;
    }
  }
  /**
   * Called upon error.
   *
   * @private
   */
  onError(err) {
    this.emitReserved("error", err, this.xhr);
    this.cleanup(true);
  }
  /**
   * Cleans up house.
   *
   * @private
   */
  cleanup(fromError) {
    if ("undefined" === typeof this.xhr || null === this.xhr) {
      return;
    }
    this.xhr.onreadystatechange = empty;
    if (fromError) {
      try {
        this.xhr.abort();
      } catch (e) {
      }
    }
    if (typeof document !== "undefined") {
      delete _Request.requests[this.index];
    }
    this.xhr = null;
  }
  /**
   * Called upon load.
   *
   * @private
   */
  onLoad() {
    const data = this.xhr.responseText;
    if (data !== null) {
      this.emitReserved("data", data);
      this.emitReserved("success");
      this.cleanup();
    }
  }
  /**
   * Aborts the request.
   *
   * @package
   */
  abort() {
    this.cleanup();
  }
};
Request.requestsCount = 0;
Request.requests = {};
if (typeof document !== "undefined") {
  if (typeof attachEvent === "function") {
    attachEvent("onunload", unloadHandler);
  } else if (typeof addEventListener === "function") {
    const terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
    addEventListener(terminationEvent, unloadHandler, false);
  }
}
function unloadHandler() {
  for (let i2 in Request.requests) {
    if (Request.requests.hasOwnProperty(i2)) {
      Request.requests[i2].abort();
    }
  }
}

// node_modules/engine.io-client/build/esm/transports/websocket-constructor.browser.js
var nextTick = (() => {
  const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
  if (isPromiseAvailable) {
    return (cb) => Promise.resolve().then(cb);
  } else {
    return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
  }
})();
var WebSocket = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
var usingBrowserWebSocket = true;
var defaultBinaryType = "arraybuffer";

// node_modules/engine.io-client/build/esm/transports/websocket.js
var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
var WS = class extends Transport {
  /**
   * WebSocket transport constructor.
   *
   * @param {Object} opts - connection options
   * @protected
   */
  constructor(opts) {
    super(opts);
    this.supportsBinary = !opts.forceBase64;
  }
  get name() {
    return "websocket";
  }
  doOpen() {
    if (!this.check()) {
      return;
    }
    const uri = this.uri();
    const protocols = this.opts.protocols;
    const opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    if (this.opts.extraHeaders) {
      opts.headers = this.opts.extraHeaders;
    }
    try {
      this.ws = usingBrowserWebSocket && !isReactNative ? protocols ? new WebSocket(uri, protocols) : new WebSocket(uri) : new WebSocket(uri, protocols, opts);
    } catch (err) {
      return this.emitReserved("error", err);
    }
    this.ws.binaryType = this.socket.binaryType;
    this.addEventListeners();
  }
  /**
   * Adds event listeners to the socket
   *
   * @private
   */
  addEventListeners() {
    this.ws.onopen = () => {
      if (this.opts.autoUnref) {
        this.ws._socket.unref();
      }
      this.onOpen();
    };
    this.ws.onclose = (closeEvent) => this.onClose({
      description: "websocket connection closed",
      context: closeEvent
    });
    this.ws.onmessage = (ev) => this.onData(ev.data);
    this.ws.onerror = (e) => this.onError("websocket error", e);
  }
  write(packets) {
    this.writable = false;
    for (let i2 = 0; i2 < packets.length; i2++) {
      const packet = packets[i2];
      const lastPacket = i2 === packets.length - 1;
      encodePacket(packet, this.supportsBinary, (data) => {
        const opts = {};
        if (!usingBrowserWebSocket) {
          if (packet.options) {
            opts.compress = packet.options.compress;
          }
          if (this.opts.perMessageDeflate) {
            const len = (
              // @ts-ignore
              "string" === typeof data ? Buffer.byteLength(data) : data.length
            );
            if (len < this.opts.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }
        try {
          if (usingBrowserWebSocket) {
            this.ws.send(data);
          } else {
            this.ws.send(data, opts);
          }
        } catch (e) {
        }
        if (lastPacket) {
          nextTick(() => {
            this.writable = true;
            this.emitReserved("drain");
          }, this.setTimeoutFn);
        }
      });
    }
  }
  doClose() {
    if (typeof this.ws !== "undefined") {
      this.ws.close();
      this.ws = null;
    }
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const schema = this.opts.secure ? "wss" : "ws";
    const query = this.query || {};
    if (this.opts.timestampRequests) {
      query[this.opts.timestampParam] = yeast();
    }
    if (!this.supportsBinary) {
      query.b64 = 1;
    }
    return this.createUri(schema, query);
  }
  /**
   * Feature detection for WebSocket.
   *
   * @return {Boolean} whether this transport is available.
   * @private
   */
  check() {
    return !!WebSocket;
  }
};

// node_modules/engine.io-client/build/esm/transports/webtransport.js
var WT = class extends Transport {
  get name() {
    return "webtransport";
  }
  doOpen() {
    if (typeof WebTransport !== "function") {
      return;
    }
    this.transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
    this.transport.closed.then(() => {
      this.onClose();
    }).catch((err) => {
      this.onError("webtransport error", err);
    });
    this.transport.ready.then(() => {
      this.transport.createBidirectionalStream().then((stream) => {
        const decoderStream = createPacketDecoderStream(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
        const reader = stream.readable.pipeThrough(decoderStream).getReader();
        const encoderStream = createPacketEncoderStream();
        encoderStream.readable.pipeTo(stream.writable);
        this.writer = encoderStream.writable.getWriter();
        const read = () => {
          reader.read().then(({ done, value: value2 }) => {
            if (done) {
              return;
            }
            this.onPacket(value2);
            read();
          }).catch((err) => {
          });
        };
        read();
        const packet = { type: "open" };
        if (this.query.sid) {
          packet.data = `{"sid":"${this.query.sid}"}`;
        }
        this.writer.write(packet).then(() => this.onOpen());
      });
    });
  }
  write(packets) {
    this.writable = false;
    for (let i2 = 0; i2 < packets.length; i2++) {
      const packet = packets[i2];
      const lastPacket = i2 === packets.length - 1;
      this.writer.write(packet).then(() => {
        if (lastPacket) {
          nextTick(() => {
            this.writable = true;
            this.emitReserved("drain");
          }, this.setTimeoutFn);
        }
      });
    }
  }
  doClose() {
    var _a;
    (_a = this.transport) === null || _a === void 0 ? void 0 : _a.close();
  }
};

// node_modules/engine.io-client/build/esm/transports/index.js
var transports = {
  websocket: WS,
  webtransport: WT,
  polling: Polling
};

// node_modules/engine.io-client/build/esm/contrib/parseuri.js
var re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
var parts = [
  "source",
  "protocol",
  "authority",
  "userInfo",
  "user",
  "password",
  "host",
  "port",
  "relative",
  "path",
  "directory",
  "file",
  "query",
  "anchor"
];
function parse(str) {
  if (str.length > 2e3) {
    throw "URI too long";
  }
  const src = str, b = str.indexOf("["), e = str.indexOf("]");
  if (b != -1 && e != -1) {
    str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
  }
  let m2 = re.exec(str || ""), uri = {}, i2 = 14;
  while (i2--) {
    uri[parts[i2]] = m2[i2] || "";
  }
  if (b != -1 && e != -1) {
    uri.source = src;
    uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
    uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
    uri.ipv6uri = true;
  }
  uri.pathNames = pathNames(uri, uri["path"]);
  uri.queryKey = queryKey(uri, uri["query"]);
  return uri;
}
function pathNames(obj, path) {
  const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
  if (path.slice(0, 1) == "/" || path.length === 0) {
    names.splice(0, 1);
  }
  if (path.slice(-1) == "/") {
    names.splice(names.length - 1, 1);
  }
  return names;
}
function queryKey(uri, query) {
  const data = {};
  query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
    if ($1) {
      data[$1] = $2;
    }
  });
  return data;
}

// node_modules/engine.io-client/build/esm/socket.js
var Socket = class _Socket extends Emitter {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(uri, opts = {}) {
    super();
    this.binaryType = defaultBinaryType;
    this.writeBuffer = [];
    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = null;
    }
    if (uri) {
      uri = parse(uri);
      opts.hostname = uri.host;
      opts.secure = uri.protocol === "https" || uri.protocol === "wss";
      opts.port = uri.port;
      if (uri.query)
        opts.query = uri.query;
    } else if (opts.host) {
      opts.hostname = parse(opts.host).host;
    }
    installTimerFunctions(this, opts);
    this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
    if (opts.hostname && !opts.port) {
      opts.port = this.secure ? "443" : "80";
    }
    this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
    this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
    this.transports = opts.transports || [
      "polling",
      "websocket",
      "webtransport"
    ];
    this.writeBuffer = [];
    this.prevBufferLen = 0;
    this.opts = Object.assign({
      path: "/engine.io",
      agent: false,
      withCredentials: false,
      upgrade: true,
      timestampParam: "t",
      rememberUpgrade: false,
      addTrailingSlash: true,
      rejectUnauthorized: true,
      perMessageDeflate: {
        threshold: 1024
      },
      transportOptions: {},
      closeOnBeforeunload: false
    }, opts);
    this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : "");
    if (typeof this.opts.query === "string") {
      this.opts.query = decode2(this.opts.query);
    }
    this.id = null;
    this.upgrades = null;
    this.pingInterval = null;
    this.pingTimeout = null;
    this.pingTimeoutTimer = null;
    if (typeof addEventListener === "function") {
      if (this.opts.closeOnBeforeunload) {
        this.beforeunloadEventListener = () => {
          if (this.transport) {
            this.transport.removeAllListeners();
            this.transport.close();
          }
        };
        addEventListener("beforeunload", this.beforeunloadEventListener, false);
      }
      if (this.hostname !== "localhost") {
        this.offlineEventListener = () => {
          this.onClose("transport close", {
            description: "network connection lost"
          });
        };
        addEventListener("offline", this.offlineEventListener, false);
      }
    }
    this.open();
  }
  /**
   * Creates transport of the given type.
   *
   * @param {String} name - transport name
   * @return {Transport}
   * @private
   */
  createTransport(name) {
    const query = Object.assign({}, this.opts.query);
    query.EIO = protocol;
    query.transport = name;
    if (this.id)
      query.sid = this.id;
    const opts = Object.assign({}, this.opts, {
      query,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port
    }, this.opts.transportOptions[name]);
    return new transports[name](opts);
  }
  /**
   * Initializes transport to use and starts probe.
   *
   * @private
   */
  open() {
    let transport;
    if (this.opts.rememberUpgrade && _Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
      transport = "websocket";
    } else if (0 === this.transports.length) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    } else {
      transport = this.transports[0];
    }
    this.readyState = "opening";
    try {
      transport = this.createTransport(transport);
    } catch (e) {
      this.transports.shift();
      this.open();
      return;
    }
    transport.open();
    this.setTransport(transport);
  }
  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @private
   */
  setTransport(transport) {
    if (this.transport) {
      this.transport.removeAllListeners();
    }
    this.transport = transport;
    transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", (reason) => this.onClose("transport close", reason));
  }
  /**
   * Probes a transport.
   *
   * @param {String} name - transport name
   * @private
   */
  probe(name) {
    let transport = this.createTransport(name);
    let failed = false;
    _Socket.priorWebsocketSuccess = false;
    const onTransportOpen = () => {
      if (failed)
        return;
      transport.send([{ type: "ping", data: "probe" }]);
      transport.once("packet", (msg) => {
        if (failed)
          return;
        if ("pong" === msg.type && "probe" === msg.data) {
          this.upgrading = true;
          this.emitReserved("upgrading", transport);
          if (!transport)
            return;
          _Socket.priorWebsocketSuccess = "websocket" === transport.name;
          this.transport.pause(() => {
            if (failed)
              return;
            if ("closed" === this.readyState)
              return;
            cleanup();
            this.setTransport(transport);
            transport.send([{ type: "upgrade" }]);
            this.emitReserved("upgrade", transport);
            transport = null;
            this.upgrading = false;
            this.flush();
          });
        } else {
          const err = new Error("probe error");
          err.transport = transport.name;
          this.emitReserved("upgradeError", err);
        }
      });
    };
    function freezeTransport() {
      if (failed)
        return;
      failed = true;
      cleanup();
      transport.close();
      transport = null;
    }
    const onerror = (err) => {
      const error = new Error("probe error: " + err);
      error.transport = transport.name;
      freezeTransport();
      this.emitReserved("upgradeError", error);
    };
    function onTransportClose() {
      onerror("transport closed");
    }
    function onclose() {
      onerror("socket closed");
    }
    function onupgrade(to) {
      if (transport && to.name !== transport.name) {
        freezeTransport();
      }
    }
    const cleanup = () => {
      transport.removeListener("open", onTransportOpen);
      transport.removeListener("error", onerror);
      transport.removeListener("close", onTransportClose);
      this.off("close", onclose);
      this.off("upgrading", onupgrade);
    };
    transport.once("open", onTransportOpen);
    transport.once("error", onerror);
    transport.once("close", onTransportClose);
    this.once("close", onclose);
    this.once("upgrading", onupgrade);
    if (this.upgrades.indexOf("webtransport") !== -1 && name !== "webtransport") {
      this.setTimeoutFn(() => {
        if (!failed) {
          transport.open();
        }
      }, 200);
    } else {
      transport.open();
    }
  }
  /**
   * Called when connection is deemed open.
   *
   * @private
   */
  onOpen() {
    this.readyState = "open";
    _Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
    this.emitReserved("open");
    this.flush();
    if ("open" === this.readyState && this.opts.upgrade) {
      let i2 = 0;
      const l = this.upgrades.length;
      for (; i2 < l; i2++) {
        this.probe(this.upgrades[i2]);
      }
    }
  }
  /**
   * Handles a packet.
   *
   * @private
   */
  onPacket(packet) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      this.emitReserved("packet", packet);
      this.emitReserved("heartbeat");
      this.resetPingTimeout();
      switch (packet.type) {
        case "open":
          this.onHandshake(JSON.parse(packet.data));
          break;
        case "ping":
          this.sendPacket("pong");
          this.emitReserved("ping");
          this.emitReserved("pong");
          break;
        case "error":
          const err = new Error("server error");
          err.code = packet.data;
          this.onError(err);
          break;
        case "message":
          this.emitReserved("data", packet.data);
          this.emitReserved("message", packet.data);
          break;
      }
    } else {
    }
  }
  /**
   * Called upon handshake completion.
   *
   * @param {Object} data - handshake obj
   * @private
   */
  onHandshake(data) {
    this.emitReserved("handshake", data);
    this.id = data.sid;
    this.transport.query.sid = data.sid;
    this.upgrades = this.filterUpgrades(data.upgrades);
    this.pingInterval = data.pingInterval;
    this.pingTimeout = data.pingTimeout;
    this.maxPayload = data.maxPayload;
    this.onOpen();
    if ("closed" === this.readyState)
      return;
    this.resetPingTimeout();
  }
  /**
   * Sets and resets ping timeout timer based on server pings.
   *
   * @private
   */
  resetPingTimeout() {
    this.clearTimeoutFn(this.pingTimeoutTimer);
    this.pingTimeoutTimer = this.setTimeoutFn(() => {
      this.onClose("ping timeout");
    }, this.pingInterval + this.pingTimeout);
    if (this.opts.autoUnref) {
      this.pingTimeoutTimer.unref();
    }
  }
  /**
   * Called on `drain` event
   *
   * @private
   */
  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen);
    this.prevBufferLen = 0;
    if (0 === this.writeBuffer.length) {
      this.emitReserved("drain");
    } else {
      this.flush();
    }
  }
  /**
   * Flush write buffers.
   *
   * @private
   */
  flush() {
    if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
      const packets = this.getWritablePackets();
      this.transport.send(packets);
      this.prevBufferLen = packets.length;
      this.emitReserved("flush");
    }
  }
  /**
   * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
   * long-polling)
   *
   * @private
   */
  getWritablePackets() {
    const shouldCheckPayloadSize = this.maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
    if (!shouldCheckPayloadSize) {
      return this.writeBuffer;
    }
    let payloadSize = 1;
    for (let i2 = 0; i2 < this.writeBuffer.length; i2++) {
      const data = this.writeBuffer[i2].data;
      if (data) {
        payloadSize += byteLength(data);
      }
      if (i2 > 0 && payloadSize > this.maxPayload) {
        return this.writeBuffer.slice(0, i2);
      }
      payloadSize += 2;
    }
    return this.writeBuffer;
  }
  /**
   * Sends a message.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} callback function.
   * @return {Socket} for chaining.
   */
  write(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }
  send(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }
  /**
   * Sends a packet.
   *
   * @param {String} type: packet type.
   * @param {String} data.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @private
   */
  sendPacket(type2, data, options, fn) {
    if ("function" === typeof data) {
      fn = data;
      data = void 0;
    }
    if ("function" === typeof options) {
      fn = options;
      options = null;
    }
    if ("closing" === this.readyState || "closed" === this.readyState) {
      return;
    }
    options = options || {};
    options.compress = false !== options.compress;
    const packet = {
      type: type2,
      data,
      options
    };
    this.emitReserved("packetCreate", packet);
    this.writeBuffer.push(packet);
    if (fn)
      this.once("flush", fn);
    this.flush();
  }
  /**
   * Closes the connection.
   */
  close() {
    const close = () => {
      this.onClose("forced close");
      this.transport.close();
    };
    const cleanupAndClose = () => {
      this.off("upgrade", cleanupAndClose);
      this.off("upgradeError", cleanupAndClose);
      close();
    };
    const waitForUpgrade = () => {
      this.once("upgrade", cleanupAndClose);
      this.once("upgradeError", cleanupAndClose);
    };
    if ("opening" === this.readyState || "open" === this.readyState) {
      this.readyState = "closing";
      if (this.writeBuffer.length) {
        this.once("drain", () => {
          if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        });
      } else if (this.upgrading) {
        waitForUpgrade();
      } else {
        close();
      }
    }
    return this;
  }
  /**
   * Called upon transport error
   *
   * @private
   */
  onError(err) {
    _Socket.priorWebsocketSuccess = false;
    this.emitReserved("error", err);
    this.onClose("transport error", err);
  }
  /**
   * Called upon transport close.
   *
   * @private
   */
  onClose(reason, description) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      this.clearTimeoutFn(this.pingTimeoutTimer);
      this.transport.removeAllListeners("close");
      this.transport.close();
      this.transport.removeAllListeners();
      if (typeof removeEventListener === "function") {
        removeEventListener("beforeunload", this.beforeunloadEventListener, false);
        removeEventListener("offline", this.offlineEventListener, false);
      }
      this.readyState = "closed";
      this.id = null;
      this.emitReserved("close", reason, description);
      this.writeBuffer = [];
      this.prevBufferLen = 0;
    }
  }
  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} upgrades - server upgrades
   * @private
   */
  filterUpgrades(upgrades) {
    const filteredUpgrades = [];
    let i2 = 0;
    const j = upgrades.length;
    for (; i2 < j; i2++) {
      if (~this.transports.indexOf(upgrades[i2]))
        filteredUpgrades.push(upgrades[i2]);
    }
    return filteredUpgrades;
  }
};
Socket.protocol = protocol;

// node_modules/engine.io-client/build/esm/index.js
var protocol2 = Socket.protocol;

// node_modules/socket.io-client/build/esm/url.js
function url(uri, path = "", loc) {
  let obj = uri;
  loc = loc || typeof location !== "undefined" && location;
  if (null == uri)
    uri = loc.protocol + "//" + loc.host;
  if (typeof uri === "string") {
    if ("/" === uri.charAt(0)) {
      if ("/" === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }
    if (!/^(https?|wss?):\/\//.test(uri)) {
      if ("undefined" !== typeof loc) {
        uri = loc.protocol + "//" + uri;
      } else {
        uri = "https://" + uri;
      }
    }
    obj = parse(uri);
  }
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = "80";
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = "443";
    }
  }
  obj.path = obj.path || "/";
  const ipv6 = obj.host.indexOf(":") !== -1;
  const host = ipv6 ? "[" + obj.host + "]" : obj.host;
  obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
  obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
  return obj;
}

// node_modules/socket.io-parser/build/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  Decoder: () => Decoder,
  Encoder: () => Encoder,
  PacketType: () => PacketType,
  isPacketValid: () => isPacketValid,
  protocol: () => protocol3
});

// node_modules/socket.io-parser/build/esm/is-binary.js
var withNativeArrayBuffer3 = typeof ArrayBuffer === "function";
var isView2 = (obj) => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};
var toString = Object.prototype.toString;
var withNativeBlob2 = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
function isBinary(obj) {
  return withNativeArrayBuffer3 && (obj instanceof ArrayBuffer || isView2(obj)) || withNativeBlob2 && obj instanceof Blob || withNativeFile && obj instanceof File;
}
function hasBinary(obj, toJSON) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  if (Array.isArray(obj)) {
    for (let i2 = 0, l = obj.length; i2 < l; i2++) {
      if (hasBinary(obj[i2])) {
        return true;
      }
    }
    return false;
  }
  if (isBinary(obj)) {
    return true;
  }
  if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }
  return false;
}

// node_modules/socket.io-parser/build/esm/binary.js
function deconstructPacket(packet) {
  const buffers = [];
  const packetData = packet.data;
  const pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length;
  return { packet: pack, buffers };
}
function _deconstructPacket(data, buffers) {
  if (!data)
    return data;
  if (isBinary(data)) {
    const placeholder = { _placeholder: true, num: buffers.length };
    buffers.push(data);
    return placeholder;
  } else if (Array.isArray(data)) {
    const newData = new Array(data.length);
    for (let i2 = 0; i2 < data.length; i2++) {
      newData[i2] = _deconstructPacket(data[i2], buffers);
    }
    return newData;
  } else if (typeof data === "object" && !(data instanceof Date)) {
    const newData = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        newData[key] = _deconstructPacket(data[key], buffers);
      }
    }
    return newData;
  }
  return data;
}
function reconstructPacket(packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  delete packet.attachments;
  return packet;
}
function _reconstructPacket(data, buffers) {
  if (!data)
    return data;
  if (data && data._placeholder === true) {
    const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
    if (isIndexValid) {
      return buffers[data.num];
    } else {
      throw new Error("illegal attachments");
    }
  } else if (Array.isArray(data)) {
    for (let i2 = 0; i2 < data.length; i2++) {
      data[i2] = _reconstructPacket(data[i2], buffers);
    }
  } else if (typeof data === "object") {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = _reconstructPacket(data[key], buffers);
      }
    }
  }
  return data;
}

// node_modules/socket.io-parser/build/esm/index.js
var RESERVED_EVENTS = [
  "connect",
  // used on the client side
  "connect_error",
  // used on the client side
  "disconnect",
  // used on both sides
  "disconnecting",
  // used on the server side
  "newListener",
  // used by the Node.js EventEmitter
  "removeListener"
  // used by the Node.js EventEmitter
];
var protocol3 = 5;
var PacketType;
(function(PacketType2) {
  PacketType2[PacketType2["CONNECT"] = 0] = "CONNECT";
  PacketType2[PacketType2["DISCONNECT"] = 1] = "DISCONNECT";
  PacketType2[PacketType2["EVENT"] = 2] = "EVENT";
  PacketType2[PacketType2["ACK"] = 3] = "ACK";
  PacketType2[PacketType2["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
  PacketType2[PacketType2["BINARY_EVENT"] = 5] = "BINARY_EVENT";
  PacketType2[PacketType2["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
var Encoder = class {
  /**
   * Encoder constructor
   *
   * @param {function} replacer - custom replacer to pass down to JSON.parse
   */
  constructor(replacer) {
    this.replacer = replacer;
  }
  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   */
  encode(obj) {
    if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
      if (hasBinary(obj)) {
        return this.encodeAsBinary({
          type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
          nsp: obj.nsp,
          data: obj.data,
          id: obj.id
        });
      }
    }
    return [this.encodeAsString(obj)];
  }
  /**
   * Encode packet as string.
   */
  encodeAsString(obj) {
    let str = "" + obj.type;
    if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
      str += obj.attachments + "-";
    }
    if (obj.nsp && "/" !== obj.nsp) {
      str += obj.nsp + ",";
    }
    if (null != obj.id) {
      str += obj.id;
    }
    if (null != obj.data) {
      str += JSON.stringify(obj.data, this.replacer);
    }
    return str;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(obj) {
    const deconstruction = deconstructPacket(obj);
    const pack = this.encodeAsString(deconstruction.packet);
    const buffers = deconstruction.buffers;
    buffers.unshift(pack);
    return buffers;
  }
};
var Decoder = class _Decoder extends Emitter {
  /**
   * Decoder constructor
   */
  constructor(opts) {
    super();
    this.opts = Object.assign({
      reviver: void 0,
      maxAttachments: 10
    }, typeof opts === "function" ? { reviver: opts } : opts);
  }
  /**
   * Decodes an encoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   */
  add(obj) {
    let packet;
    if (typeof obj === "string") {
      if (this.reconstructor) {
        throw new Error("got plaintext data when reconstructing a packet");
      }
      packet = this.decodeString(obj);
      const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
      if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
        packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
        this.reconstructor = new BinaryReconstructor(packet);
        if (packet.attachments === 0) {
          super.emitReserved("decoded", packet);
        }
      } else {
        super.emitReserved("decoded", packet);
      }
    } else if (isBinary(obj) || obj.base64) {
      if (!this.reconstructor) {
        throw new Error("got binary data when not reconstructing a packet");
      } else {
        packet = this.reconstructor.takeBinaryData(obj);
        if (packet) {
          this.reconstructor = null;
          super.emitReserved("decoded", packet);
        }
      }
    } else {
      throw new Error("Unknown type: " + obj);
    }
  }
  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   */
  decodeString(str) {
    let i2 = 0;
    const p = {
      type: Number(str.charAt(0))
    };
    if (PacketType[p.type] === void 0) {
      throw new Error("unknown packet type " + p.type);
    }
    if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
      const start2 = i2 + 1;
      while (str.charAt(++i2) !== "-" && i2 != str.length) {
      }
      const buf = str.substring(start2, i2);
      if (buf != Number(buf) || str.charAt(i2) !== "-") {
        throw new Error("Illegal attachments");
      }
      const n = Number(buf);
      if (!isInteger(n) || n < 0) {
        throw new Error("Illegal attachments");
      } else if (n > this.opts.maxAttachments) {
        throw new Error("too many attachments");
      }
      p.attachments = n;
    }
    if ("/" === str.charAt(i2 + 1)) {
      const start2 = i2 + 1;
      while (++i2) {
        const c2 = str.charAt(i2);
        if ("," === c2)
          break;
        if (i2 === str.length)
          break;
      }
      p.nsp = str.substring(start2, i2);
    } else {
      p.nsp = "/";
    }
    const next = str.charAt(i2 + 1);
    if ("" !== next && Number(next) == next) {
      const start2 = i2 + 1;
      while (++i2) {
        const c2 = str.charAt(i2);
        if (null == c2 || Number(c2) != c2) {
          --i2;
          break;
        }
        if (i2 === str.length)
          break;
      }
      p.id = Number(str.substring(start2, i2 + 1));
    }
    if (str.charAt(++i2)) {
      const payload = this.tryParse(str.substr(i2));
      if (_Decoder.isPayloadValid(p.type, payload)) {
        p.data = payload;
      } else {
        throw new Error("invalid payload");
      }
    }
    return p;
  }
  tryParse(str) {
    try {
      return JSON.parse(str, this.opts.reviver);
    } catch (e) {
      return false;
    }
  }
  static isPayloadValid(type2, payload) {
    switch (type2) {
      case PacketType.CONNECT:
        return isObject(payload);
      case PacketType.DISCONNECT:
        return payload === void 0;
      case PacketType.CONNECT_ERROR:
        return typeof payload === "string" || isObject(payload);
      case PacketType.EVENT:
      case PacketType.BINARY_EVENT:
        return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS.indexOf(payload[0]) === -1);
      case PacketType.ACK:
      case PacketType.BINARY_ACK:
        return Array.isArray(payload);
    }
  }
  /**
   * Deallocates a parser's resources
   */
  destroy() {
    if (this.reconstructor) {
      this.reconstructor.finishedReconstruction();
      this.reconstructor = null;
    }
  }
};
var BinaryReconstructor = class {
  constructor(packet) {
    this.packet = packet;
    this.buffers = [];
    this.reconPack = packet;
  }
  /**
   * Method to be called when binary data received from connection
   * after a BINARY_EVENT packet.
   *
   * @param {Buffer | ArrayBuffer} binData - the raw binary data received
   * @return {null | Object} returns null if more binary data is expected or
   *   a reconstructed packet object if all buffers have been received.
   */
  takeBinaryData(binData) {
    this.buffers.push(binData);
    if (this.buffers.length === this.reconPack.attachments) {
      const packet = reconstructPacket(this.reconPack, this.buffers);
      this.finishedReconstruction();
      return packet;
    }
    return null;
  }
  /**
   * Cleans up binary packet reconstruction variables.
   */
  finishedReconstruction() {
    this.reconPack = null;
    this.buffers = [];
  }
};
function isNamespaceValid(nsp) {
  return typeof nsp === "string";
}
var isInteger = Number.isInteger || function(value2) {
  return typeof value2 === "number" && isFinite(value2) && Math.floor(value2) === value2;
};
function isAckIdValid(id2) {
  return id2 === void 0 || isInteger(id2);
}
function isObject(value2) {
  return Object.prototype.toString.call(value2) === "[object Object]";
}
function isDataValid(type2, payload) {
  switch (type2) {
    case PacketType.CONNECT:
      return payload === void 0 || isObject(payload);
    case PacketType.DISCONNECT:
      return payload === void 0;
    case PacketType.EVENT:
      return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS.indexOf(payload[0]) === -1);
    case PacketType.ACK:
      return Array.isArray(payload);
    case PacketType.CONNECT_ERROR:
      return typeof payload === "string" || isObject(payload);
    default:
      return false;
  }
}
function isPacketValid(packet) {
  return isNamespaceValid(packet.nsp) && isAckIdValid(packet.id) && isDataValid(packet.type, packet.data);
}

// node_modules/socket.io-client/build/esm/on.js
function on(obj, ev, fn) {
  obj.on(ev, fn);
  return function subDestroy() {
    obj.off(ev, fn);
  };
}

// node_modules/socket.io-client/build/esm/socket.js
var RESERVED_EVENTS2 = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
var Socket2 = class extends Emitter {
  /**
   * `Socket` constructor.
   */
  constructor(io, nsp, opts) {
    super();
    this.connected = false;
    this.recovered = false;
    this.receiveBuffer = [];
    this.sendBuffer = [];
    this._queue = [];
    this._queueSeq = 0;
    this.ids = 0;
    this.acks = {};
    this.flags = {};
    this.io = io;
    this.nsp = nsp;
    if (opts && opts.auth) {
      this.auth = opts.auth;
    }
    this._opts = Object.assign({}, opts);
    if (this.io._autoConnect)
      this.open();
  }
  /**
   * Whether the socket is currently disconnected
   *
   * @example
   * const socket = io();
   *
   * socket.on("connect", () => {
   *   console.log(socket.disconnected); // false
   * });
   *
   * socket.on("disconnect", () => {
   *   console.log(socket.disconnected); // true
   * });
   */
  get disconnected() {
    return !this.connected;
  }
  /**
   * Subscribe to open, close and packet events
   *
   * @private
   */
  subEvents() {
    if (this.subs)
      return;
    const io = this.io;
    this.subs = [
      on(io, "open", this.onopen.bind(this)),
      on(io, "packet", this.onpacket.bind(this)),
      on(io, "error", this.onerror.bind(this)),
      on(io, "close", this.onclose.bind(this))
    ];
  }
  /**
   * Whether the Socket will try to reconnect when its Manager connects or reconnects.
   *
   * @example
   * const socket = io();
   *
   * console.log(socket.active); // true
   *
   * socket.on("disconnect", (reason) => {
   *   if (reason === "io server disconnect") {
   *     // the disconnection was initiated by the server, you need to manually reconnect
   *     console.log(socket.active); // false
   *   }
   *   // else the socket will automatically try to reconnect
   *   console.log(socket.active); // true
   * });
   */
  get active() {
    return !!this.subs;
  }
  /**
   * "Opens" the socket.
   *
   * @example
   * const socket = io({
   *   autoConnect: false
   * });
   *
   * socket.connect();
   */
  connect() {
    if (this.connected)
      return this;
    this.subEvents();
    if (!this.io["_reconnecting"])
      this.io.open();
    if ("open" === this.io._readyState)
      this.onopen();
    return this;
  }
  /**
   * Alias for {@link connect()}.
   */
  open() {
    return this.connect();
  }
  /**
   * Sends a `message` event.
   *
   * This method mimics the WebSocket.send() method.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
   *
   * @example
   * socket.send("hello");
   *
   * // this is equivalent to
   * socket.emit("message", "hello");
   *
   * @return self
   */
  send(...args) {
    args.unshift("message");
    this.emit.apply(this, args);
    return this;
  }
  /**
   * Override `emit`.
   * If the event is in `events`, it's emitted normally.
   *
   * @example
   * socket.emit("hello", "world");
   *
   * // all serializable datastructures are supported (no need to call JSON.stringify)
   * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
   *
   * // with an acknowledgement from the server
   * socket.emit("hello", "world", (val) => {
   *   // ...
   * });
   *
   * @return self
   */
  emit(ev, ...args) {
    if (RESERVED_EVENTS2.hasOwnProperty(ev)) {
      throw new Error('"' + ev.toString() + '" is a reserved event name');
    }
    args.unshift(ev);
    if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
      this._addToQueue(args);
      return this;
    }
    const packet = {
      type: PacketType.EVENT,
      data: args
    };
    packet.options = {};
    packet.options.compress = this.flags.compress !== false;
    if ("function" === typeof args[args.length - 1]) {
      const id2 = this.ids++;
      const ack = args.pop();
      this._registerAckCallback(id2, ack);
      packet.id = id2;
    }
    const isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
    const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
    if (discardPacket) {
    } else if (this.connected) {
      this.notifyOutgoingListeners(packet);
      this.packet(packet);
    } else {
      this.sendBuffer.push(packet);
    }
    this.flags = {};
    return this;
  }
  /**
   * @private
   */
  _registerAckCallback(id2, ack) {
    var _a;
    const timeout2 = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
    if (timeout2 === void 0) {
      this.acks[id2] = ack;
      return;
    }
    const timer2 = this.io.setTimeoutFn(() => {
      delete this.acks[id2];
      for (let i2 = 0; i2 < this.sendBuffer.length; i2++) {
        if (this.sendBuffer[i2].id === id2) {
          this.sendBuffer.splice(i2, 1);
        }
      }
      ack.call(this, new Error("operation has timed out"));
    }, timeout2);
    const fn = (...args) => {
      this.io.clearTimeoutFn(timer2);
      ack.apply(this, args);
    };
    fn.withError = true;
    this.acks[id2] = fn;
  }
  /**
   * Emits an event and waits for an acknowledgement
   *
   * @example
   * // without timeout
   * const response = await socket.emitWithAck("hello", "world");
   *
   * // with a specific timeout
   * try {
   *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
   * } catch (err) {
   *   // the server did not acknowledge the event in the given delay
   * }
   *
   * @return a Promise that will be fulfilled when the server acknowledges the event
   */
  emitWithAck(ev, ...args) {
    return new Promise((resolve, reject) => {
      const fn = (arg1, arg2) => {
        return arg1 ? reject(arg1) : resolve(arg2);
      };
      fn.withError = true;
      args.push(fn);
      this.emit(ev, ...args);
    });
  }
  /**
   * Add the packet to the queue.
   * @param args
   * @private
   */
  _addToQueue(args) {
    let ack;
    if (typeof args[args.length - 1] === "function") {
      ack = args.pop();
    }
    const packet = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: false,
      args,
      flags: Object.assign({ fromQueue: true }, this.flags)
    };
    args.push((err, ...responseArgs) => {
      if (packet !== this._queue[0]) {
        return;
      }
      const hasError = err !== null;
      if (hasError) {
        if (packet.tryCount > this._opts.retries) {
          this._queue.shift();
          if (ack) {
            ack(err);
          }
        }
      } else {
        this._queue.shift();
        if (ack) {
          ack(null, ...responseArgs);
        }
      }
      packet.pending = false;
      return this._drainQueue();
    });
    this._queue.push(packet);
    this._drainQueue();
  }
  /**
   * Send the first packet of the queue, and wait for an acknowledgement from the server.
   * @param force - whether to resend a packet that has not been acknowledged yet
   *
   * @private
   */
  _drainQueue(force = false) {
    if (!this.connected || this._queue.length === 0) {
      return;
    }
    const packet = this._queue[0];
    if (packet.pending && !force) {
      return;
    }
    packet.pending = true;
    packet.tryCount++;
    this.flags = packet.flags;
    this.emit.apply(this, packet.args);
  }
  /**
   * Sends a packet.
   *
   * @param packet
   * @private
   */
  packet(packet) {
    packet.nsp = this.nsp;
    this.io._packet(packet);
  }
  /**
   * Called upon engine `open`.
   *
   * @private
   */
  onopen() {
    if (typeof this.auth == "function") {
      this.auth((data) => {
        this._sendConnectPacket(data);
      });
    } else {
      this._sendConnectPacket(this.auth);
    }
  }
  /**
   * Sends a CONNECT packet to initiate the Socket.IO session.
   *
   * @param data
   * @private
   */
  _sendConnectPacket(data) {
    this.packet({
      type: PacketType.CONNECT,
      data: this._pid ? Object.assign({ pid: this._pid, offset: this._lastOffset }, data) : data
    });
  }
  /**
   * Called upon engine or manager `error`.
   *
   * @param err
   * @private
   */
  onerror(err) {
    if (!this.connected) {
      this.emitReserved("connect_error", err);
    }
  }
  /**
   * Called upon engine `close`.
   *
   * @param reason
   * @param description
   * @private
   */
  onclose(reason, description) {
    this.connected = false;
    delete this.id;
    this.emitReserved("disconnect", reason, description);
    this._clearAcks();
  }
  /**
   * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
   * the server.
   *
   * @private
   */
  _clearAcks() {
    Object.keys(this.acks).forEach((id2) => {
      const isBuffered = this.sendBuffer.some((packet) => String(packet.id) === id2);
      if (!isBuffered) {
        const ack = this.acks[id2];
        delete this.acks[id2];
        if (ack.withError) {
          ack.call(this, new Error("socket has been disconnected"));
        }
      }
    });
  }
  /**
   * Called with socket packet.
   *
   * @param packet
   * @private
   */
  onpacket(packet) {
    const sameNamespace = packet.nsp === this.nsp;
    if (!sameNamespace)
      return;
    switch (packet.type) {
      case PacketType.CONNECT:
        if (packet.data && packet.data.sid) {
          this.onconnect(packet.data.sid, packet.data.pid);
        } else {
          this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
        }
        break;
      case PacketType.EVENT:
      case PacketType.BINARY_EVENT:
        this.onevent(packet);
        break;
      case PacketType.ACK:
      case PacketType.BINARY_ACK:
        this.onack(packet);
        break;
      case PacketType.DISCONNECT:
        this.ondisconnect();
        break;
      case PacketType.CONNECT_ERROR:
        this.destroy();
        const err = new Error(packet.data.message);
        err.data = packet.data.data;
        this.emitReserved("connect_error", err);
        break;
    }
  }
  /**
   * Called upon a server event.
   *
   * @param packet
   * @private
   */
  onevent(packet) {
    const args = packet.data || [];
    if (null != packet.id) {
      args.push(this.ack(packet.id));
    }
    if (this.connected) {
      this.emitEvent(args);
    } else {
      this.receiveBuffer.push(Object.freeze(args));
    }
  }
  emitEvent(args) {
    if (this._anyListeners && this._anyListeners.length) {
      const listeners = this._anyListeners.slice();
      for (const listener of listeners) {
        listener.apply(this, args);
      }
    }
    super.emit.apply(this, args);
    if (this._pid && args.length && typeof args[args.length - 1] === "string") {
      this._lastOffset = args[args.length - 1];
    }
  }
  /**
   * Produces an ack callback to emit with an event.
   *
   * @private
   */
  ack(id2) {
    const self2 = this;
    let sent = false;
    return function(...args) {
      if (sent)
        return;
      sent = true;
      self2.packet({
        type: PacketType.ACK,
        id: id2,
        data: args
      });
    };
  }
  /**
   * Called upon a server acknowledgement.
   *
   * @param packet
   * @private
   */
  onack(packet) {
    const ack = this.acks[packet.id];
    if (typeof ack !== "function") {
      return;
    }
    delete this.acks[packet.id];
    if (ack.withError) {
      packet.data.unshift(null);
    }
    ack.apply(this, packet.data);
  }
  /**
   * Called upon server connect.
   *
   * @private
   */
  onconnect(id2, pid) {
    this.id = id2;
    this.recovered = pid && this._pid === pid;
    this._pid = pid;
    this.connected = true;
    this.emitBuffered();
    this.emitReserved("connect");
    this._drainQueue(true);
  }
  /**
   * Emit buffered events (received and emitted).
   *
   * @private
   */
  emitBuffered() {
    this.receiveBuffer.forEach((args) => this.emitEvent(args));
    this.receiveBuffer = [];
    this.sendBuffer.forEach((packet) => {
      this.notifyOutgoingListeners(packet);
      this.packet(packet);
    });
    this.sendBuffer = [];
  }
  /**
   * Called upon server disconnect.
   *
   * @private
   */
  ondisconnect() {
    this.destroy();
    this.onclose("io server disconnect");
  }
  /**
   * Called upon forced client/server side disconnections,
   * this method ensures the manager stops tracking us and
   * that reconnections don't get triggered for this.
   *
   * @private
   */
  destroy() {
    if (this.subs) {
      this.subs.forEach((subDestroy) => subDestroy());
      this.subs = void 0;
    }
    this.io["_destroy"](this);
  }
  /**
   * Disconnects the socket manually. In that case, the socket will not try to reconnect.
   *
   * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
   *
   * @example
   * const socket = io();
   *
   * socket.on("disconnect", (reason) => {
   *   // console.log(reason); prints "io client disconnect"
   * });
   *
   * socket.disconnect();
   *
   * @return self
   */
  disconnect() {
    if (this.connected) {
      this.packet({ type: PacketType.DISCONNECT });
    }
    this.destroy();
    if (this.connected) {
      this.onclose("io client disconnect");
    }
    return this;
  }
  /**
   * Alias for {@link disconnect()}.
   *
   * @return self
   */
  close() {
    return this.disconnect();
  }
  /**
   * Sets the compress flag.
   *
   * @example
   * socket.compress(false).emit("hello");
   *
   * @param compress - if `true`, compresses the sending data
   * @return self
   */
  compress(compress) {
    this.flags.compress = compress;
    return this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
   * ready to send messages.
   *
   * @example
   * socket.volatile.emit("hello"); // the server may or may not receive it
   *
   * @returns self
   */
  get volatile() {
    this.flags.volatile = true;
    return this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
   * given number of milliseconds have elapsed without an acknowledgement from the server:
   *
   * @example
   * socket.timeout(5000).emit("my-event", (err) => {
   *   if (err) {
   *     // the server did not acknowledge the event in the given delay
   *   }
   * });
   *
   * @returns self
   */
  timeout(timeout2) {
    this.flags.timeout = timeout2;
    return this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * @example
   * socket.onAny((event, ...args) => {
   *   console.log(`got ${event}`);
   * });
   *
   * @param listener
   */
  onAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.push(listener);
    return this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * @example
   * socket.prependAny((event, ...args) => {
   *   console.log(`got event ${event}`);
   * });
   *
   * @param listener
   */
  prependAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.unshift(listener);
    return this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`got event ${event}`);
   * }
   *
   * socket.onAny(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAny(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAny();
   *
   * @param listener
   */
  offAny(listener) {
    if (!this._anyListeners) {
      return this;
    }
    if (listener) {
      const listeners = this._anyListeners;
      for (let i2 = 0; i2 < listeners.length; i2++) {
        if (listener === listeners[i2]) {
          listeners.splice(i2, 1);
          return this;
        }
      }
    } else {
      this._anyListeners = [];
    }
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAny() {
    return this._anyListeners || [];
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.onAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  onAnyOutgoing(listener) {
    this._anyOutgoingListeners = this._anyOutgoingListeners || [];
    this._anyOutgoingListeners.push(listener);
    return this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.prependAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  prependAnyOutgoing(listener) {
    this._anyOutgoingListeners = this._anyOutgoingListeners || [];
    this._anyOutgoingListeners.unshift(listener);
    return this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`sent event ${event}`);
   * }
   *
   * socket.onAnyOutgoing(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAnyOutgoing(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAnyOutgoing();
   *
   * @param [listener] - the catch-all listener (optional)
   */
  offAnyOutgoing(listener) {
    if (!this._anyOutgoingListeners) {
      return this;
    }
    if (listener) {
      const listeners = this._anyOutgoingListeners;
      for (let i2 = 0; i2 < listeners.length; i2++) {
        if (listener === listeners[i2]) {
          listeners.splice(i2, 1);
          return this;
        }
      }
    } else {
      this._anyOutgoingListeners = [];
    }
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  /**
   * Notify the listeners for each packet sent
   *
   * @param packet
   *
   * @private
   */
  notifyOutgoingListeners(packet) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const listeners = this._anyOutgoingListeners.slice();
      for (const listener of listeners) {
        listener.apply(this, packet.data);
      }
    }
  }
};

// node_modules/socket.io-client/build/esm/contrib/backo2.js
function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 1e4;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}
Backoff.prototype.duration = function() {
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand = Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};
Backoff.prototype.reset = function() {
  this.attempts = 0;
};
Backoff.prototype.setMin = function(min2) {
  this.ms = min2;
};
Backoff.prototype.setMax = function(max2) {
  this.max = max2;
};
Backoff.prototype.setJitter = function(jitter) {
  this.jitter = jitter;
};

// node_modules/socket.io-client/build/esm/manager.js
var Manager = class extends Emitter {
  constructor(uri, opts) {
    var _a;
    super();
    this.nsps = {};
    this.subs = [];
    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = void 0;
    }
    opts = opts || {};
    opts.path = opts.path || "/socket.io";
    this.opts = opts;
    installTimerFunctions(this, opts);
    this.reconnection(opts.reconnection !== false);
    this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
    this.reconnectionDelay(opts.reconnectionDelay || 1e3);
    this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
    this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
    this.backoff = new Backoff({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    });
    this.timeout(null == opts.timeout ? 2e4 : opts.timeout);
    this._readyState = "closed";
    this.uri = uri;
    const _parser = opts.parser || esm_exports;
    this.encoder = new _parser.Encoder();
    this.decoder = new _parser.Decoder();
    this._autoConnect = opts.autoConnect !== false;
    if (this._autoConnect)
      this.open();
  }
  reconnection(v) {
    if (!arguments.length)
      return this._reconnection;
    this._reconnection = !!v;
    return this;
  }
  reconnectionAttempts(v) {
    if (v === void 0)
      return this._reconnectionAttempts;
    this._reconnectionAttempts = v;
    return this;
  }
  reconnectionDelay(v) {
    var _a;
    if (v === void 0)
      return this._reconnectionDelay;
    this._reconnectionDelay = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
    return this;
  }
  randomizationFactor(v) {
    var _a;
    if (v === void 0)
      return this._randomizationFactor;
    this._randomizationFactor = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
    return this;
  }
  reconnectionDelayMax(v) {
    var _a;
    if (v === void 0)
      return this._reconnectionDelayMax;
    this._reconnectionDelayMax = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
    return this;
  }
  timeout(v) {
    if (!arguments.length)
      return this._timeout;
    this._timeout = v;
    return this;
  }
  /**
   * Starts trying to reconnect if reconnection is enabled and we have not
   * started reconnecting yet
   *
   * @private
   */
  maybeReconnectOnOpen() {
    if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
      this.reconnect();
    }
  }
  /**
   * Sets the current transport `socket`.
   *
   * @param {Function} fn - optional, callback
   * @return self
   * @public
   */
  open(fn) {
    if (~this._readyState.indexOf("open"))
      return this;
    this.engine = new Socket(this.uri, this.opts);
    const socket = this.engine;
    const self2 = this;
    this._readyState = "opening";
    this.skipReconnect = false;
    const openSubDestroy = on(socket, "open", function() {
      self2.onopen();
      fn && fn();
    });
    const onError = (err) => {
      this.cleanup();
      this._readyState = "closed";
      this.emitReserved("error", err);
      if (fn) {
        fn(err);
      } else {
        this.maybeReconnectOnOpen();
      }
    };
    const errorSub = on(socket, "error", onError);
    if (false !== this._timeout) {
      const timeout2 = this._timeout;
      const timer2 = this.setTimeoutFn(() => {
        openSubDestroy();
        onError(new Error("timeout"));
        socket.close();
      }, timeout2);
      if (this.opts.autoUnref) {
        timer2.unref();
      }
      this.subs.push(() => {
        this.clearTimeoutFn(timer2);
      });
    }
    this.subs.push(openSubDestroy);
    this.subs.push(errorSub);
    return this;
  }
  /**
   * Alias for open()
   *
   * @return self
   * @public
   */
  connect(fn) {
    return this.open(fn);
  }
  /**
   * Called upon transport open.
   *
   * @private
   */
  onopen() {
    this.cleanup();
    this._readyState = "open";
    this.emitReserved("open");
    const socket = this.engine;
    this.subs.push(on(socket, "ping", this.onping.bind(this)), on(socket, "data", this.ondata.bind(this)), on(socket, "error", this.onerror.bind(this)), on(socket, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
  }
  /**
   * Called upon a ping.
   *
   * @private
   */
  onping() {
    this.emitReserved("ping");
  }
  /**
   * Called with data.
   *
   * @private
   */
  ondata(data) {
    try {
      this.decoder.add(data);
    } catch (e) {
      this.onclose("parse error", e);
    }
  }
  /**
   * Called when parser fully decodes a packet.
   *
   * @private
   */
  ondecoded(packet) {
    nextTick(() => {
      this.emitReserved("packet", packet);
    }, this.setTimeoutFn);
  }
  /**
   * Called upon socket error.
   *
   * @private
   */
  onerror(err) {
    this.emitReserved("error", err);
  }
  /**
   * Creates a new socket for the given `nsp`.
   *
   * @return {Socket}
   * @public
   */
  socket(nsp, opts) {
    let socket = this.nsps[nsp];
    if (!socket) {
      socket = new Socket2(this, nsp, opts);
      this.nsps[nsp] = socket;
    } else if (this._autoConnect && !socket.active) {
      socket.connect();
    }
    return socket;
  }
  /**
   * Called upon a socket close.
   *
   * @param socket
   * @private
   */
  _destroy(socket) {
    const nsps = Object.keys(this.nsps);
    for (const nsp of nsps) {
      const socket2 = this.nsps[nsp];
      if (socket2.active) {
        return;
      }
    }
    this._close();
  }
  /**
   * Writes a packet.
   *
   * @param packet
   * @private
   */
  _packet(packet) {
    const encodedPackets = this.encoder.encode(packet);
    for (let i2 = 0; i2 < encodedPackets.length; i2++) {
      this.engine.write(encodedPackets[i2], packet.options);
    }
  }
  /**
   * Clean up transport subscriptions and packet buffer.
   *
   * @private
   */
  cleanup() {
    this.subs.forEach((subDestroy) => subDestroy());
    this.subs.length = 0;
    this.decoder.destroy();
  }
  /**
   * Close the current socket.
   *
   * @private
   */
  _close() {
    this.skipReconnect = true;
    this._reconnecting = false;
    this.onclose("forced close");
    if (this.engine)
      this.engine.close();
  }
  /**
   * Alias for close()
   *
   * @private
   */
  disconnect() {
    return this._close();
  }
  /**
   * Called upon engine close.
   *
   * @private
   */
  onclose(reason, description) {
    this.cleanup();
    this.backoff.reset();
    this._readyState = "closed";
    this.emitReserved("close", reason, description);
    if (this._reconnection && !this.skipReconnect) {
      this.reconnect();
    }
  }
  /**
   * Attempt a reconnection.
   *
   * @private
   */
  reconnect() {
    if (this._reconnecting || this.skipReconnect)
      return this;
    const self2 = this;
    if (this.backoff.attempts >= this._reconnectionAttempts) {
      this.backoff.reset();
      this.emitReserved("reconnect_failed");
      this._reconnecting = false;
    } else {
      const delay = this.backoff.duration();
      this._reconnecting = true;
      const timer2 = this.setTimeoutFn(() => {
        if (self2.skipReconnect)
          return;
        this.emitReserved("reconnect_attempt", self2.backoff.attempts);
        if (self2.skipReconnect)
          return;
        self2.open((err) => {
          if (err) {
            self2._reconnecting = false;
            self2.reconnect();
            this.emitReserved("reconnect_error", err);
          } else {
            self2.onreconnect();
          }
        });
      }, delay);
      if (this.opts.autoUnref) {
        timer2.unref();
      }
      this.subs.push(() => {
        this.clearTimeoutFn(timer2);
      });
    }
  }
  /**
   * Called upon successful reconnect.
   *
   * @private
   */
  onreconnect() {
    const attempt = this.backoff.attempts;
    this._reconnecting = false;
    this.backoff.reset();
    this.emitReserved("reconnect", attempt);
  }
};

// node_modules/socket.io-client/build/esm/index.js
var cache = {};
function lookup2(uri, opts) {
  if (typeof uri === "object") {
    opts = uri;
    uri = void 0;
  }
  opts = opts || {};
  const parsed = url(uri, opts.path || "/socket.io");
  const source = parsed.source;
  const id2 = parsed.id;
  const path = parsed.path;
  const sameNamespace = cache[id2] && path in cache[id2]["nsps"];
  const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
  let io;
  if (newConnection) {
    io = new Manager(source, opts);
  } else {
    if (!cache[id2]) {
      cache[id2] = new Manager(source, opts);
    }
    io = cache[id2];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.queryKey;
  }
  return io.socket(parsed.path, opts);
}
Object.assign(lookup2, {
  Manager,
  Socket: Socket2,
  io: lookup2,
  connect: lookup2
});

// src/app/services/socket.service.ts
var SocketService = class _SocketService {
  constructor() {
    this.connected$ = new Subject();
    this.connect();
  }
  // ── Connection ─────────────────────────────────────────────────────────
  connect() {
    this.socket = lookup2("/", {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 2e3,
      reconnectionAttempts: 10
    });
    this.socket.on("connect", () => {
      console.log("[SocketService] Connected  \u2192 id:", this.socket.id);
      this.connected$.next(true);
    });
    this.socket.on("disconnect", (reason) => {
      console.warn("[SocketService] Disconnected:", reason);
      this.connected$.next(false);
    });
    this.socket.on("connect_error", (err) => {
      console.error("[SocketService] Connection error:", err.message);
    });
  }
  // ── Event streams ──────────────────────────────────────────────────────
  /**
   * Stream of live attack events broadcast by the backend worker every 800 ms.
   * Multicasted with share() so multiple component subscriptions don't open
   * duplicate listeners on the underlying socket.
   */
  onLiveThreat() {
    return new Observable((observer) => {
      const handler = (data) => observer.next(data);
      this.socket.on("live-threat", handler);
      return () => this.socket.off("live-threat", handler);
    }).pipe(share());
  }
  /**
   * Last 50 events sent by the server immediately after connecting.
   * Completes after the first emission.
   */
  onHistory() {
    return new Observable((observer) => {
      const handler = (data) => {
        observer.next(data);
        observer.complete();
      };
      this.socket.on("history", handler);
      return () => this.socket.off("history", handler);
    });
  }
  /**
   * OSINT enrichment results emitted when the backend finishes enriching a
   * High or Critical severity IP address.
   */
  onOsintResult() {
    return new Observable((observer) => {
      const handler = (data) => observer.next(data);
      this.socket.on("osint-result", handler);
      return () => this.socket.off("osint-result", handler);
    }).pipe(share());
  }
  // ── Outbound events ────────────────────────────────────────────────────
  /** Ask the server for a filtered event set. */
  filterThreats(criteria) {
    this.socket.emit("filter-threats", criteria);
  }
  /** Mark a threat as acknowledged by an analyst. */
  acknowledgeThreat(threatId) {
    this.socket.emit("acknowledge-threat", { threatId });
  }
  /**
   * Stream of 'threat-mitigated' events broadcast by the SOAR Block-IP playbook.
   * Payload: { ip, mitigated_ids[], mitigated_count, playbook, executed_at }
   */
  onThreatMitigated() {
    return new Observable((observer) => {
      const handler = (data) => observer.next(data);
      this.socket.on("threat-mitigated", handler);
      return () => this.socket.off("threat-mitigated", handler);
    }).pipe(share());
  }
  // ── Lifecycle ──────────────────────────────────────────────────────────
  ngOnDestroy() {
    this.socket.disconnect();
    this.connected$.complete();
  }
  static {
    this.\u0275fac = function SocketService_Factory(t) {
      return new (t || _SocketService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SocketService, factory: _SocketService.\u0275fac, providedIn: "root" });
  }
};

// src/app/shared/live-map/live-map.component.ts
var _c0 = ["mapContainer"];
var _c1 = ["sparkCanvas"];
function LiveMapComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "span", 24);
    \u0275\u0275text(2, "\u{1F3AF}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 25);
    \u0275\u0275text(4, "FOCUSED:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 26);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 27);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.selectedIp);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.selectedIpCount, " events");
  }
}
function LiveMapComponent_span_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u26F6");
    \u0275\u0275elementEnd();
  }
}
function LiveMapComponent_span_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u2715");
    \u0275\u0275elementEnd();
  }
}
function LiveMapComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 29)(2, "span", 30)(3, "span", 31);
    \u0275\u0275text(4, "\u{1F4C8}");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " IP ACTIVITY TIMELINE \u2014 ");
    \u0275\u0275elementStart(6, "span", 32);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 33);
    \u0275\u0275text(9, "5 s buckets \xB7 last 5 min");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(10, "canvas", 34, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.selectedIp);
  }
}
var ARC_TTL_MS = 5e3;
var MAX_ARCS = 120;
var ARC_SEGMENTS = 80;
var SPARK_BUCKET_MS = 5e3;
var SPARK_MAX_BUCKETS = 60;
var LiveMapComponent = class _LiveMapComponent {
  constructor(socketService, ngZone, cdr) {
    this.socketService = socketService;
    this.ngZone = ngZone;
    this.cdr = cdr;
    this.selectedIp = null;
    this.activeArcs = /* @__PURE__ */ new Map();
    this.ipSparkData = /* @__PURE__ */ new Map();
    this.subscription = new Subscription();
    this.totalArcs = 0;
    this.eventsPerSec = 0;
    this.isFullscreen = false;
    this.selectedIpCount = 0;
    this.eventCount = 0;
  }
  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.statsTimer = setInterval(() => {
        this.ngZone.run(() => {
          this.eventsPerSec = this.eventCount;
          this.eventCount = 0;
        });
      }, 1e3);
    });
  }
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.initMap();
      this.bindSocketEvents();
    });
  }
  // ── Input change: react when selectedIp is set/cleared by the parent ──
  ngOnChanges(changes) {
    if ("selectedIp" in changes) {
      this.ngZone.runOutsideAngular(() => this.applyIpFilter());
      this.updateSparklinePanel();
    }
  }
  /**
   * Dims all arcs that don't belong to selectedIp.
   * When selectedIp is null, restores all arcs to full opacity.
   */
  applyIpFilter() {
    const ip = this.selectedIp;
    this.activeArcs.forEach((entry) => {
      const isMatch = !ip || entry.sourceIp === ip;
      entry.arc.setStyle({
        opacity: isMatch ? 1 : 0.08
      });
      entry.glow.setStyle({
        opacity: isMatch ? 0.6 : 0.03
      });
    });
  }
  /** Rebuilds the selectedIpCount and redraws the sparkline canvas. */
  updateSparklinePanel() {
    const ip = this.selectedIp;
    if (!ip) {
      this.selectedIpCount = 0;
      this.cdr.markForCheck();
      return;
    }
    const buckets = this.ipSparkData.get(ip) ?? [];
    this.selectedIpCount = buckets.reduce((s, b) => s + b.count, 0);
    this.cdr.markForCheck();
    setTimeout(() => this.drawSparkline(ip), 0);
  }
  /** Draws a bar-sparkline on the canvas for the given IP. */
  drawSparkline(ip) {
    const canvasEl = this.sparkCanvas?.nativeElement;
    if (!canvasEl)
      return;
    const ctx = canvasEl.getContext("2d");
    if (!ctx)
      return;
    const W = canvasEl.offsetWidth || canvasEl.width || 320;
    const H = canvasEl.offsetHeight || canvasEl.height || 60;
    canvasEl.width = W;
    canvasEl.height = H;
    ctx.clearRect(0, 0, W, H);
    const buckets = this.ipSparkData.get(ip) ?? [];
    if (buckets.length === 0) {
      ctx.fillStyle = "rgba(0,212,255,0.3)";
      ctx.font = "10px monospace";
      ctx.fillText("No data yet", 8, H / 2 + 4);
      return;
    }
    const maxCount = Math.max(...buckets.map((b) => b.count), 1);
    const barW = Math.max(2, Math.floor((W - 2) / SPARK_MAX_BUCKETS) - 1);
    const gap = 1;
    buckets.forEach((bucket, i2) => {
      const barH = Math.max(2, Math.round(bucket.count / maxCount * (H - 6)));
      const x3 = 1 + i2 * (barW + gap);
      const y3 = H - barH - 2;
      const grad = ctx.createLinearGradient(x3, y3, x3, H);
      grad.addColorStop(0, "rgba(0,212,255,0.9)");
      grad.addColorStop(1, "rgba(0,212,255,0.2)");
      ctx.fillStyle = grad;
      ctx.fillRect(x3, y3, barW, barH);
    });
    ctx.strokeStyle = "rgba(0,212,255,0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, H - 2);
    ctx.lineTo(W, H - 2);
    ctx.stroke();
  }
  // ── Map initialisation ─────────────────────────────────────────────────
  initMap() {
    this.map = L2.map(this.mapContainer.nativeElement, {
      center: [20, 10],
      zoom: 2,
      minZoom: 2,
      maxZoom: 6,
      zoomControl: true,
      attributionControl: false,
      worldCopyJump: true
    });
    L2.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", { subdomains: "abcd", maxZoom: 19 }).addTo(this.map);
    this.arcLayer = L2.layerGroup().addTo(this.map);
  }
  // ── Socket event binding ───────────────────────────────────────────────
  bindSocketEvents() {
    this.subscription.add(this.socketService.onHistory().subscribe(({ data }) => {
      data.forEach((evt) => this.drawArc(evt));
    }));
    this.subscription.add(this.socketService.onLiveThreat().subscribe((evt) => {
      this.drawArc(evt);
      this.eventCount++;
    }));
  }
  // ── Arc drawing ────────────────────────────────────────────────────────
  /**
   * Draws a curved arc from source → target on the Leaflet map.
   *
   * Arc shape: We interpolate ARC_SEGMENTS points along a great-circle path
   * and raise the midpoint by a "bulge" offset so the line curves above the
   * straight chord — this gives the classic attack-arc look.
   *
   * Two polylines are drawn for each arc:
   *   1. A thick, low-opacity "glow" line for the bloom effect.
   *   2. A thin, opaque "core" line for the sharp leading edge.
   *
   * Both are removed after ARC_TTL_MS via opacity animation + cleanup.
   */
  drawArc(event) {
    const src = event.coordinates;
    const tgt = this.deriveTargetCoords(event);
    if (!src || !tgt)
      return;
    const color2 = severityColor(event.severity);
    const weight = severityWeight(event.severity);
    const glow = severityGlow(event.severity, 0.35);
    const arcId = `${event.id ?? Date.now()}-${Math.random()}`;
    this.recordSparkBucket(event.source_ip);
    const points = this.greatCirclePoints([src.lat, src.long], [tgt.lat, tgt.long]);
    const isHighlighted = !this.selectedIp || event.source_ip === this.selectedIp;
    const arcOpacity = isHighlighted ? 1 : 0.08;
    const glowOpacity = isHighlighted ? 0.6 : 0.03;
    const glowLine = L2.polyline(points, {
      color: glow,
      weight: weight * 6,
      opacity: glowOpacity,
      smoothFactor: 1,
      interactive: false
    }).addTo(this.arcLayer);
    const arcLine = L2.polyline(points, {
      color: color2,
      weight,
      opacity: arcOpacity,
      smoothFactor: 1,
      interactive: false,
      dashArray: event.severity === "Critical" ? "6 3" : void 0
    }).addTo(this.arcLayer);
    const dot = L2.circleMarker([src.lat, src.long], {
      radius: event.severity === "Critical" ? 5 : 3,
      color: color2,
      fillColor: color2,
      fillOpacity: isHighlighted ? 0.9 : 0.08,
      weight: 1,
      interactive: false
    }).addTo(this.arcLayer);
    if (this.activeArcs.size >= MAX_ARCS) {
      const oldestId = this.activeArcs.keys().next().value;
      if (oldestId)
        this.removeArc(oldestId);
    }
    const timer2 = setTimeout(() => {
      this.fadeAndRemove(glowLine, arcLine, dot, arcId);
    }, ARC_TTL_MS - 600);
    this.activeArcs.set(arcId, { arc: arcLine, glow: glowLine, timer: timer2, sourceIp: event.source_ip });
    this.ngZone.run(() => {
      this.totalArcs = this.activeArcs.size;
      if (this.selectedIp === event.source_ip) {
        this.updateSparklinePanel();
      }
    });
  }
  /**
   * Records a count increment into the correct time bucket for this IP.
   * Prunes buckets older than SPARK_MAX_BUCKETS * SPARK_BUCKET_MS.
   */
  recordSparkBucket(ip) {
    const now2 = Date.now();
    const bucketTime = now2 - now2 % SPARK_BUCKET_MS;
    let buckets = this.ipSparkData.get(ip);
    if (!buckets) {
      buckets = [];
      this.ipSparkData.set(ip, buckets);
    }
    const last = buckets[buckets.length - 1];
    if (last && last.time === bucketTime) {
      last.count++;
    } else {
      buckets.push({ time: bucketTime, count: 1 });
    }
    const cutoff = now2 - SPARK_MAX_BUCKETS * SPARK_BUCKET_MS;
    while (buckets.length > 0 && buckets[0].time < cutoff) {
      buckets.shift();
    }
  }
  /** Gradually reduce opacity then remove all three layers. */
  fadeAndRemove(glow, arc, dot, arcId) {
    let opacity = 1;
    const step = () => {
      opacity -= 0.12;
      if (opacity <= 0) {
        [glow, arc, dot].forEach((l) => this.arcLayer.removeLayer(l));
        this.activeArcs.delete(arcId);
        this.ngZone.run(() => {
          this.totalArcs = this.activeArcs.size;
        });
        return;
      }
      arc.setStyle({ opacity });
      glow.setStyle({ opacity: opacity * 0.6 });
      dot.setStyle({ fillOpacity: opacity, opacity });
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  /** Immediately remove an arc and cancel its timer (force eviction). */
  removeArc(arcId) {
    const entry = this.activeArcs.get(arcId);
    if (!entry)
      return;
    clearTimeout(entry.timer);
    this.arcLayer.removeLayer(entry.arc);
    this.arcLayer.removeLayer(entry.glow);
    this.activeArcs.delete(arcId);
  }
  // ── Great-circle interpolation ─────────────────────────────────────────
  /**
   * Returns an array of LatLng points forming a great-circle arc between
   * two geographic coordinates.  A vertical "bulge" is applied at the
   * midpoint to give the arc a curved appearance on the Mercator projection.
   *
   * @param from  [lat, lng]
   * @param to    [lat, lng]
   * @returns     L.LatLngExpression[] of ARC_SEGMENTS + 1 points
   */
  greatCirclePoints(from, to) {
    const points = [];
    const [lat1, lng1] = from.map((d2) => d2 * Math.PI / 180);
    const [lat2, lng2] = to.map((d2) => d2 * Math.PI / 180);
    const d = 2 * Math.asin(Math.sqrt(Math.sin((lat2 - lat1) / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin((lng2 - lng1) / 2) ** 2));
    const bulge = Math.min(d * 0.5, 0.8);
    for (let i2 = 0; i2 <= ARC_SEGMENTS; i2++) {
      const f = i2 / ARC_SEGMENTS;
      if (d < 1e-4) {
        points.push([
          from[0] + (to[0] - from[0]) * f,
          from[1] + (to[1] - from[1]) * f
        ]);
        continue;
      }
      const A = Math.sin((1 - f) * d) / Math.sin(d);
      const B = Math.sin(f * d) / Math.sin(d);
      const x3 = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2);
      const y3 = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2);
      const z = A * Math.sin(lat1) + B * Math.sin(lat2);
      let lat = Math.atan2(z, Math.sqrt(x3 * x3 + y3 * y3)) * 180 / Math.PI;
      const lng = Math.atan2(y3, x3) * 180 / Math.PI;
      const bulgeOffset = bulge * Math.sin(f * Math.PI) * (180 / Math.PI);
      lat += bulgeOffset;
      points.push([lat, lng]);
    }
    return points;
  }
  /**
   * Derives a plausible target coordinate from the ThreatEvent.
   * In a full implementation the backend would supply target_coordinates;
   * here we use a stable hash of target_ip to scatter the endpoint.
   */
  deriveTargetCoords(event) {
    const hash = event.target_ip.split(".").reduce((acc, octet, i2) => acc + parseInt(octet, 10) * (i2 + 1) * 17, 0);
    return {
      lat: hash * 7 % 170 - 85,
      // –85 … 85
      long: hash * 13 % 360 - 180
      // –180 … 180
    };
  }
  // ── Fullscreen toggle ─────────────────────────────────────────────────
  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
    this.cdr.markForCheck();
    setTimeout(() => {
      this.ngZone.runOutsideAngular(() => {
        this.map?.invalidateSize({ animate: false });
      });
    }, 280);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    clearInterval(this.statsTimer);
    this.activeArcs.forEach((_, id2) => this.removeArc(id2));
    if (this.map)
      this.map.remove();
  }
  static {
    this.\u0275fac = function LiveMapComponent_Factory(t) {
      return new (t || _LiveMapComponent)(\u0275\u0275directiveInject(SocketService), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LiveMapComponent, selectors: [["app-live-map"]], viewQuery: function LiveMapComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 7);
        \u0275\u0275viewQuery(_c1, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.mapContainer = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sparkCanvas = _t.first);
      }
    }, inputs: { selectedIp: "selectedIp" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 39, vars: 9, consts: [["mapContainer", ""], ["sparkCanvas", ""], [1, "map-wrapper"], [1, "map-header"], [1, "map-title"], [1, "pulse-dot"], [1, "glow"], ["class", "ip-focus-badge", 4, "ngIf"], [1, "map-stats"], [1, "stat-pill"], [1, "stat-label"], [1, "stat-value"], [1, "fullscreen-btn", 3, "click", "title"], [4, "ngIf"], [1, "map-canvas"], ["class", "spark-panel", 4, "ngIf"], [1, "map-legend"], [1, "legend-item"], [1, "legend-dot", 2, "background", "#22c55e"], [1, "legend-dot", 2, "background", "#f59e0b"], [1, "legend-dot", 2, "background", "#f97316"], [1, "legend-dot", 2, "background", "#ef4444"], [1, "legend-note"], [1, "ip-focus-badge"], [1, "ip-focus-icon"], [1, "ip-focus-label"], [1, "ip-focus-ip"], [1, "ip-focus-count"], [1, "spark-panel"], [1, "spark-header"], [1, "spark-title"], [1, "spark-icon"], [1, "spark-ip"], [1, "spark-meta"], [1, "spark-canvas"]], template: function LiveMapComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "section", 2)(1, "header", 3)(2, "div", 4);
        \u0275\u0275element(3, "span", 5);
        \u0275\u0275elementStart(4, "h2", 6);
        \u0275\u0275text(5, "LIVE THREAT MAP");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, LiveMapComponent_div_6_Template, 9, 2, "div", 7);
        \u0275\u0275elementStart(7, "div", 8)(8, "div", 9)(9, "span", 10);
        \u0275\u0275text(10, "ACTIVE ARCS");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "span", 11);
        \u0275\u0275text(12);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "div", 9)(14, "span", 10);
        \u0275\u0275text(15, "EVENTS/SEC");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "span", 11);
        \u0275\u0275text(17);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(18, "button", 12);
        \u0275\u0275listener("click", function LiveMapComponent_Template_button_click_18_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.toggleFullscreen());
        });
        \u0275\u0275template(19, LiveMapComponent_span_19_Template, 2, 0, "span", 13)(20, LiveMapComponent_span_20_Template, 2, 0, "span", 13);
        \u0275\u0275elementEnd()();
        \u0275\u0275element(21, "div", 14, 0);
        \u0275\u0275template(23, LiveMapComponent_div_23_Template, 12, 1, "div", 15);
        \u0275\u0275elementStart(24, "footer", 16)(25, "span", 17);
        \u0275\u0275element(26, "span", 18);
        \u0275\u0275text(27, "Low ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "span", 17);
        \u0275\u0275element(29, "span", 19);
        \u0275\u0275text(30, "Medium ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "span", 17);
        \u0275\u0275element(32, "span", 20);
        \u0275\u0275text(33, "High ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "span", 17);
        \u0275\u0275element(35, "span", 21);
        \u0275\u0275text(36, "Critical ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "span", 22);
        \u0275\u0275text(38, "Arcs fade after 5 s");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275classProp("map-fullscreen", ctx.isFullscreen);
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.selectedIp);
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(ctx.totalArcs);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.eventsPerSec);
        \u0275\u0275advance();
        \u0275\u0275property("title", ctx.isFullscreen ? "Exit fullscreen" : "Fullscreen map");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isFullscreen);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isFullscreen);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.selectedIp);
      }
    }, dependencies: [CommonModule, NgIf], styles: ["\n\n.map-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-lg);\n  overflow: hidden;\n  height: 100%;\n  transition: all 0.25s ease;\n  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);\n}\n.map-fullscreen[_ngcontent-%COMP%] {\n  position: fixed !important;\n  inset: 0 !important;\n  z-index: 800 !important;\n  border-radius: 0 !important;\n  border: none !important;\n}\n.map-fullscreen[_ngcontent-%COMP%]   .map-canvas[_ngcontent-%COMP%] {\n  height: calc(100vh - 88px) !important;\n}\n.map-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 8px 16px;\n  background: var(--bg-secondary);\n  border-bottom: 1px solid var(--border);\n  flex-shrink: 0;\n}\n.map-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.map-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-family: var(--font-mono);\n  letter-spacing: 0.18em;\n  color: var(--accent-cyan);\n  font-weight: 700;\n  text-transform: uppercase;\n}\n.pulse-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--accent-cyan);\n  box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.6);\n  animation: _ngcontent-%COMP%_pulseDot 2s infinite;\n  flex-shrink: 0;\n}\n@keyframes _ngcontent-%COMP%_pulseDot {\n  0% {\n    box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.6);\n  }\n  70% {\n    box-shadow: 0 0 0 8px rgba(0, 212, 255, 0);\n  }\n  100% {\n    box-shadow: 0 0 0 0 rgba(0, 212, 255, 0);\n  }\n}\n.ip-focus-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  padding: 4px 12px;\n  background: rgba(0, 212, 255, 0.1);\n  border: 1px solid rgba(0, 212, 255, 0.4);\n  border-radius: var(--radius-sm);\n  animation: _ngcontent-%COMP%_focusPulse 1.5s ease-out;\n}\n@keyframes _ngcontent-%COMP%_focusPulse {\n  from {\n    box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.5);\n  }\n  to {\n    box-shadow: 0 0 12px 0 rgba(0, 212, 255, 0);\n  }\n}\n.ip-focus-icon[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.ip-focus-label[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-family: var(--font-mono);\n  color: var(--text-muted);\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n}\n.ip-focus-ip[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-family: var(--font-mono);\n  color: var(--accent-cyan);\n  font-weight: 700;\n  letter-spacing: 0.05em;\n}\n.ip-focus-count[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-family: var(--font-mono);\n  color: var(--text-secondary);\n  background: rgba(0, 212, 255, 0.08);\n  border-radius: 4px;\n  padding: 1px 6px;\n  border: 1px solid var(--border);\n}\n.spark-panel[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: 8px 14px 10px;\n  background: rgba(0, 212, 255, 0.03);\n  border-top: 1px solid rgba(0, 212, 255, 0.18);\n  animation: _ngcontent-%COMP%_slideDown 0.2s ease;\n}\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.spark-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 6px;\n}\n.spark-title[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-family: var(--font-mono);\n  color: var(--text-muted);\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.spark-icon[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n.spark-ip[_ngcontent-%COMP%] {\n  color: var(--accent-cyan);\n  font-weight: 700;\n}\n.spark-meta[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-family: var(--font-mono);\n  color: var(--text-muted);\n  font-style: italic;\n}\n.spark-canvas[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 52px;\n  border-radius: var(--radius-sm);\n  background: rgba(0, 0, 0, 0.2);\n  border: 1px solid rgba(0, 212, 255, 0.1);\n}\n.map-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n}\n.stat-pill[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  background: rgba(0, 212, 255, 0.05);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-sm);\n  padding: 4px 12px;\n  min-width: 72px;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 9px;\n  letter-spacing: 0.12em;\n  color: var(--text-muted);\n  font-family: var(--font-mono);\n  text-transform: uppercase;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-family: var(--font-mono);\n  color: var(--accent-cyan);\n  font-weight: 700;\n  line-height: 1.2;\n}\n.fullscreen-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: 1px solid var(--border);\n  color: var(--text-muted);\n  border-radius: var(--radius-sm);\n  width: 30px;\n  height: 30px;\n  cursor: pointer;\n  font-size: 15px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: all 0.15s;\n  margin-left: 8px;\n}\n.fullscreen-btn[_ngcontent-%COMP%]:hover {\n  border-color: var(--accent-cyan);\n  color: var(--accent-cyan);\n  box-shadow: 0 0 8px rgba(0, 212, 255, 0.25);\n}\n.map-canvas[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  height: 0;\n  z-index: 0;\n}\n.map-legend[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 6px 16px;\n  background: var(--bg-secondary);\n  border-top: 1px solid var(--border);\n  flex-shrink: 0;\n}\n.legend-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 10px;\n  color: var(--text-secondary);\n  font-family: var(--font-mono);\n}\n.legend-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.legend-note[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 10px;\n  color: var(--text-muted);\n  font-family: var(--font-mono);\n  font-style: italic;\n}\n/*# sourceMappingURL=live-map.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LiveMapComponent, { className: "LiveMapComponent", filePath: "src\\app\\shared\\live-map\\live-map.component.ts", lineNumber: 51 });
})();

// src/app/shared/triage-queue/triage-queue.component.ts
var _c02 = () => ["Critical", "High", "Medium", "Low"];
function TriageQueueComponent_button_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function TriageQueueComponent_button_14_Template_button_click_0_listener() {
      const sev_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setFilter(sev_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span", 14);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sev_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap("chip-" + sev_r2.toLowerCase());
    \u0275\u0275classProp("active", ctx_r2.activeFilter === sev_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", sev_r2, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getCount(sev_r2));
  }
}
function TriageQueueComponent_tr_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 15);
    \u0275\u0275listener("click", function TriageQueueComponent_tr_37_Template_tr_click_0_listener() {
      const evt_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectRow(evt_r5));
    });
    \u0275\u0275elementStart(1, "td", 16)(2, "span", 17);
    \u0275\u0275text(3, "\u{1F50D}");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 18);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td")(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 19);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 20);
    \u0275\u0275element(12, "span", 21);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "span", 22);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td", 23);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td")(20, "span", 22);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "td", 18);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const evt_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275propertyInterpolate1("title", "Investigate ", evt_r5.source_ip, " in OSINT Workbench");
    \u0275\u0275property("ngClass", ctx_r2.rowClass(evt_r5));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.selectedId === evt_r5.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.formatTime(evt_r5.timestamp));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.severityBadgeClass(evt_r5.severity));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(evt_r5.severity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(evt_r5.attack_type);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.reputationDotClass(evt_r5.source_ip));
    \u0275\u0275property("title", ctx_r2.ipReputations.get(evt_r5.source_ip) ? "VT Risk: " + ctx_r2.ipReputations.get(evt_r5.source_ip) : "Not yet enriched");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", evt_r5.source_ip, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(evt_r5.source_country);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(evt_r5.target_ip);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(evt_r5.target_country);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(24, 18, evt_r5.packet_count));
  }
}
function TriageQueueComponent_div_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "span", 25);
    \u0275\u0275text(2, "\u{1F4E1}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Waiting for threat events\u2026");
    \u0275\u0275elementEnd()();
  }
}
var MAX_ROWS = 200;
var NEW_ROW_CLASS_MS = 1300;
var TriageQueueComponent = class _TriageQueueComponent {
  constructor(socketService, cdr) {
    this.socketService = socketService;
    this.cdr = cdr;
    this.threats = [];
    this.newRowIds = /* @__PURE__ */ new Set();
    this.activeFilter = "";
    this.counts = { Low: 0, Medium: 0, High: 0, Critical: 0, Total: 0 };
    this.selectedId = null;
    this.ipReputations = /* @__PURE__ */ new Map();
    this.rowClick = new EventEmitter();
    this.severityBadgeClass = severityBadgeClass;
    this.trackById = (_, item) => item.id;
    this.sub = new Subscription();
  }
  ngOnInit() {
    this.sub.add(this.socketService.onHistory().subscribe(({ data }) => {
      data.forEach((e) => this.addRow(e, false));
      this.cdr.markForCheck();
    }));
    this.sub.add(this.socketService.onLiveThreat().subscribe((e) => {
      this.addRow(e, true);
      this.cdr.markForCheck();
    }));
    this.sub.add(this.socketService.onOsintResult().subscribe((result) => {
      if (result.intel?.risk_level) {
        this.ipReputations.set(result.source_ip, result.intel.risk_level);
        this.cdr.markForCheck();
      }
    }));
    this.sub.add(this.socketService.onThreatMitigated().subscribe((evt) => {
      const idSet = new Set(evt.mitigated_ids.map(String));
      const before = this.threats.length;
      this.threats = this.threats.filter((t) => {
        const isTargeted = t.source_ip === evt.ip || idSet.has(String(t.id));
        if (isTargeted && t.severity in this.counts) {
          this.counts[t.severity]--;
          this.counts.Total--;
        }
        return !isTargeted;
      });
      const removed = before - this.threats.length;
      if (removed > 0) {
        console.log(`[TriageQueue] Removed ${removed} mitigated row(s) for IP ${evt.ip}`);
        if (this.selectedId && idSet.has(this.selectedId)) {
          this.selectedId = null;
        }
        this.cdr.markForCheck();
      }
    }));
  }
  // ── Row management ─────────────────────────────────────────────────────
  addRow(evt, animate) {
    this.threats.unshift(evt);
    this.counts.Total++;
    if (evt.severity in this.counts) {
      this.counts[evt.severity]++;
    }
    if (this.threats.length > MAX_ROWS) {
      const removed = this.threats.splice(MAX_ROWS);
      removed.forEach((r) => {
        if (r.severity in this.counts) {
          this.counts[r.severity]--;
          this.counts.Total--;
        }
      });
    }
    if (animate && evt.id) {
      this.newRowIds.add(evt.id);
      setTimeout(() => {
        this.newRowIds.delete(evt.id);
        this.cdr.markForCheck();
      }, NEW_ROW_CLASS_MS);
    }
  }
  // ── Selection ──────────────────────────────────────────────────────────
  selectRow(evt) {
    this.selectedId = evt.id;
    this.rowClick.emit(evt);
    this.cdr.markForCheck();
  }
  // ── Filtering ──────────────────────────────────────────────────────────
  setFilter(s) {
    this.activeFilter = this.activeFilter === s ? "" : s;
    this.cdr.markForCheck();
  }
  get filteredThreats() {
    return this.activeFilter ? this.threats.filter((t) => t.severity === this.activeFilter) : this.threats;
  }
  rowClass(evt) {
    return {
      "row-new": this.newRowIds.has(evt.id),
      "row-selected": this.selectedId === evt.id,
      [`row-${evt.severity.toLowerCase()}`]: true
    };
  }
  getCount(sev) {
    return this.counts[sev] ?? 0;
  }
  formatTime(iso) {
    return new Date(iso).toLocaleTimeString("en-GB", { hour12: false });
  }
  /** Returns CSS class for the reputation dot next to each source IP. */
  reputationDotClass(ip) {
    const level = this.ipReputations.get(ip);
    if (!level)
      return "rep-dot rep-unknown";
    const l = level.toLowerCase();
    if (l === "critical" || l === "high")
      return "rep-dot rep-danger";
    if (l === "medium")
      return "rep-dot rep-warn";
    if (l === "low" || l === "none")
      return "rep-dot rep-safe";
    return "rep-dot rep-unknown";
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  static {
    this.\u0275fac = function TriageQueueComponent_Factory(t) {
      return new (t || _TriageQueueComponent)(\u0275\u0275directiveInject(SocketService), \u0275\u0275directiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TriageQueueComponent, selectors: [["app-triage-queue"]], outputs: { rowClick: "rowClick" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 39, vars: 9, consts: [[1, "queue-wrapper"], [1, "queue-header"], [1, "queue-title"], [1, "icon"], [1, "row-count"], [1, "click-hint"], [1, "filter-chips"], [1, "chip", "chip-all", 3, "click"], ["class", "chip", 3, "class", "active", "click", 4, "ngFor", "ngForOf"], [1, "table-scroll"], [1, "threat-table"], [3, "ngClass", "title", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "empty-state", 4, "ngIf"], [1, "chip", 3, "click"], [1, "chip-count"], [3, "click", "ngClass", "title"], [1, "td-icon"], [1, "inv-icon"], [1, "mono", "muted"], [1, "attack-type"], [1, "mono", "ip-cell"], [3, "title"], [1, "country-name"], [1, "mono"], [1, "empty-state"], [1, "empty-icon"]], template: function TriageQueueComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0)(1, "header", 1)(2, "div", 2)(3, "span", 3);
        \u0275\u0275text(4, "\u26A1");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h2");
        \u0275\u0275text(6, "TRIAGE QUEUE");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "span", 4);
        \u0275\u0275text(8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "span", 5);
        \u0275\u0275text(10, "\u2196 click row to investigate");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "div", 6)(12, "button", 7);
        \u0275\u0275listener("click", function TriageQueueComponent_Template_button_click_12_listener() {
          return ctx.setFilter("");
        });
        \u0275\u0275text(13, "ALL");
        \u0275\u0275elementEnd();
        \u0275\u0275template(14, TriageQueueComponent_button_14_Template, 4, 6, "button", 8);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "div", 9)(16, "table", 10)(17, "thead")(18, "tr");
        \u0275\u0275element(19, "th");
        \u0275\u0275elementStart(20, "th");
        \u0275\u0275text(21, "TIME");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "th");
        \u0275\u0275text(23, "SEVERITY");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "th");
        \u0275\u0275text(25, "ATTACK TYPE");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "th");
        \u0275\u0275text(27, "SOURCE IP");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "th");
        \u0275\u0275text(29, "ORIGIN");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "th");
        \u0275\u0275text(31, "TARGET IP");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "th");
        \u0275\u0275text(33, "DESTINATION");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "th");
        \u0275\u0275text(35, "PACKETS");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(36, "tbody");
        \u0275\u0275template(37, TriageQueueComponent_tr_37_Template, 25, 20, "tr", 11);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(38, TriageQueueComponent_div_38_Template, 5, 0, "div", 12);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate2("", ctx.filteredThreats.length, "/", ctx.counts.Total, "");
        \u0275\u0275advance(4);
        \u0275\u0275classProp("active", ctx.activeFilter === "");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(8, _c02));
        \u0275\u0275advance(23);
        \u0275\u0275property("ngForOf", ctx.filteredThreats)("ngForTrackBy", ctx.trackById);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.filteredThreats.length === 0);
      }
    }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, DecimalPipe], styles: ["\n\n.queue-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-lg);\n  overflow: hidden;\n  min-height: 0;\n}\n.queue-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 16px;\n  background: var(--bg-secondary);\n  border-bottom: 1px solid var(--border);\n  flex-shrink: 0;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.queue-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.queue-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-family: var(--font-mono);\n  letter-spacing: .15em;\n  color: var(--text-primary);\n  font-weight: 700;\n}\n.queue-title[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.row-count[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-family: var(--font-mono);\n  color: var(--text-muted);\n  padding: 1px 6px;\n  background: var(--bg-primary);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-sm);\n}\n.click-hint[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: var(--accent-cyan);\n  font-family: var(--font-mono);\n  opacity: .7;\n  font-style: italic;\n}\n.filter-chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.chip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  padding: 3px 10px;\n  font-size: 10px;\n  font-family: var(--font-mono);\n  font-weight: 700;\n  letter-spacing: .06em;\n  border-radius: 3px;\n  border: 1px solid var(--border);\n  background: var(--bg-card);\n  color: var(--text-secondary);\n  cursor: pointer;\n  transition: all .15s ease;\n}\n.chip[_ngcontent-%COMP%]:hover {\n  border-color: var(--border-bright);\n  color: var(--text-primary);\n}\n.chip-count[_ngcontent-%COMP%] {\n  background: var(--bg-primary);\n  border-radius: 2px;\n  padding: 0 4px;\n  font-size: 9px;\n}\n.chip-all.active[_ngcontent-%COMP%] {\n  border-color: var(--accent-cyan);\n  color: var(--accent-cyan);\n}\n.chip-critical.active[_ngcontent-%COMP%], .chip-critical[_ngcontent-%COMP%]:hover {\n  border-color: #ef4444;\n  color: #ef4444;\n}\n.chip-high.active[_ngcontent-%COMP%], .chip-high[_ngcontent-%COMP%]:hover {\n  border-color: #f97316;\n  color: #f97316;\n}\n.chip-medium.active[_ngcontent-%COMP%], .chip-medium[_ngcontent-%COMP%]:hover {\n  border-color: #f59e0b;\n  color: #f59e0b;\n}\n.chip-low.active[_ngcontent-%COMP%], .chip-low[_ngcontent-%COMP%]:hover {\n  border-color: #22c55e;\n  color: #22c55e;\n}\n.table-scroll[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  overflow-x: auto;\n  min-height: 0;\n}\n.threat-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 12px;\n}\n.threat-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  background: var(--bg-secondary);\n}\n.threat-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 7px 12px;\n  text-align: left;\n  font-family: var(--font-mono);\n  font-size: 10px;\n  letter-spacing: .1em;\n  color: var(--text-muted);\n  border-bottom: 1px solid var(--border);\n  white-space: nowrap;\n  font-weight: 600;\n}\n.threat-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-bottom: 1px solid rgba(26, 58, 92, .4);\n  white-space: nowrap;\n  vertical-align: middle;\n}\n.threat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-left: 2px solid transparent;\n  cursor: pointer;\n  transition: background .1s ease;\n}\n.threat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.row-critical[_ngcontent-%COMP%] {\n  border-left-color: #ef4444 !important;\n}\n.row-high[_ngcontent-%COMP%] {\n  border-left-color: #f97316 !important;\n}\n.row-medium[_ngcontent-%COMP%] {\n  border-left-color: #f59e0b !important;\n}\n.row-low[_ngcontent-%COMP%] {\n  border-left-color: #22c55e !important;\n}\n.row-selected[_ngcontent-%COMP%] {\n  background: rgba(0, 212, 255, 0.07) !important;\n  border-left-color: var(--accent-cyan) !important;\n  outline: 1px solid rgba(0, 212, 255, .25);\n  outline-offset: -1px;\n}\n.td-icon[_ngcontent-%COMP%] {\n  width: 28px;\n  text-align: center;\n  padding: 6px 4px;\n}\n.inv-icon[_ngcontent-%COMP%] {\n  font-size: 12px;\n  opacity: .3;\n  transition: opacity .2s;\n}\n.inv-icon.active[_ngcontent-%COMP%], .threat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   .inv-icon[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.mono[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n}\n.muted[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n}\n.attack-type[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n  font-weight: 500;\n}\n.country-name[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-size: 11px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n  gap: 10px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 12px;\n}\n@keyframes _ngcontent-%COMP%_rowPulse {\n  0% {\n    background: rgba(0, 212, 255, .12);\n  }\n  100% {\n    background: transparent;\n  }\n}\n.row-new[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_rowPulse 1.2s ease-out forwards;\n}\n.threat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.row-critical[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, .06) !important;\n}\n.threat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.row-high[_ngcontent-%COMP%]:hover {\n  background: rgba(249, 115, 22, .06) !important;\n}\n.threat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.row-medium[_ngcontent-%COMP%]:hover {\n  background: rgba(245, 158, 11, .06) !important;\n}\n.threat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.row-low[_ngcontent-%COMP%]:hover {\n  background: rgba(34, 197, 94, .06) !important;\n}\n.threat-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.row-selected[_ngcontent-%COMP%]   .inv-icon[_ngcontent-%COMP%] {\n  color: var(--accent-cyan);\n}\n.ip-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.rep-dot[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  display: inline-block;\n}\n.rep-danger[_ngcontent-%COMP%] {\n  background: #ef4444;\n  box-shadow: 0 0 6px rgba(239, 68, 68, 0.7);\n}\n.rep-warn[_ngcontent-%COMP%] {\n  background: #f59e0b;\n  box-shadow: 0 0 6px rgba(245, 158, 11, 0.6);\n}\n.rep-safe[_ngcontent-%COMP%] {\n  background: #22c55e;\n  box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);\n}\n.rep-unknown[_ngcontent-%COMP%] {\n  background: #3d6080;\n}\n/*# sourceMappingURL=triage-queue.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TriageQueueComponent, { className: "TriageQueueComponent", filePath: "src\\app\\shared\\triage-queue\\triage-queue.component.ts", lineNumber: 22 });
})();

// node_modules/d3-dispatch/src/dispatch.js
var noop = { value: () => {
} };
function dispatch() {
  for (var i2 = 0, n = arguments.length, _ = {}, t; i2 < n; ++i2) {
    if (!(t = arguments[i2] + "") || t in _ || /[\s.]/.test(t))
      throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}
function Dispatch(_) {
  this._ = _;
}
function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i2 = t.indexOf(".");
    if (i2 >= 0)
      name = t.slice(i2 + 1), t = t.slice(0, i2);
    if (t && !types.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    return { type: t, name };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._, T = parseTypenames(typename + "", _), t, i2 = -1, n = T.length;
    if (arguments.length < 2) {
      while (++i2 < n)
        if ((t = (typename = T[i2]).type) && (t = get(_[t], typename.name)))
          return t;
      return;
    }
    if (callback != null && typeof callback !== "function")
      throw new Error("invalid callback: " + callback);
    while (++i2 < n) {
      if (t = (typename = T[i2]).type)
        _[t] = set(_[t], typename.name, callback);
      else if (callback == null)
        for (t in _)
          _[t] = set(_[t], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _)
      copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type2, that) {
    if ((n = arguments.length - 2) > 0)
      for (var args = new Array(n), i2 = 0, n, t; i2 < n; ++i2)
        args[i2] = arguments[i2 + 2];
    if (!this._.hasOwnProperty(type2))
      throw new Error("unknown type: " + type2);
    for (t = this._[type2], i2 = 0, n = t.length; i2 < n; ++i2)
      t[i2].value.apply(that, args);
  },
  apply: function(type2, that, args) {
    if (!this._.hasOwnProperty(type2))
      throw new Error("unknown type: " + type2);
    for (var t = this._[type2], i2 = 0, n = t.length; i2 < n; ++i2)
      t[i2].value.apply(that, args);
  }
};
function get(type2, name) {
  for (var i2 = 0, n = type2.length, c2; i2 < n; ++i2) {
    if ((c2 = type2[i2]).name === name) {
      return c2.value;
    }
  }
}
function set(type2, name, callback) {
  for (var i2 = 0, n = type2.length; i2 < n; ++i2) {
    if (type2[i2].name === name) {
      type2[i2] = noop, type2 = type2.slice(0, i2).concat(type2.slice(i2 + 1));
      break;
    }
  }
  if (callback != null)
    type2.push({ name, value: callback });
  return type2;
}
var dispatch_default = dispatch;

// node_modules/d3-selection/src/namespaces.js
var xhtml = "http://www.w3.org/1999/xhtml";
var namespaces_default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

// node_modules/d3-selection/src/namespace.js
function namespace_default(name) {
  var prefix = name += "", i2 = prefix.indexOf(":");
  if (i2 >= 0 && (prefix = name.slice(0, i2)) !== "xmlns")
    name = name.slice(i2 + 1);
  return namespaces_default.hasOwnProperty(prefix) ? { space: namespaces_default[prefix], local: name } : name;
}

// node_modules/d3-selection/src/creator.js
function creatorInherit(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator_default(name) {
  var fullname = namespace_default(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}

// node_modules/d3-selection/src/selector.js
function none() {
}
function selector_default(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

// node_modules/d3-selection/src/selection/select.js
function select_default(select) {
  if (typeof select !== "function")
    select = selector_default(select);
  for (var groups = this._groups, m2 = groups.length, subgroups = new Array(m2), j = 0; j < m2; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i2 = 0; i2 < n; ++i2) {
      if ((node = group[i2]) && (subnode = select.call(node, node.__data__, i2, group))) {
        if ("__data__" in node)
          subnode.__data__ = node.__data__;
        subgroup[i2] = subnode;
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/d3-selection/src/array.js
function array(x3) {
  return x3 == null ? [] : Array.isArray(x3) ? x3 : Array.from(x3);
}

// node_modules/d3-selection/src/selectorAll.js
function empty2() {
  return [];
}
function selectorAll_default(selector) {
  return selector == null ? empty2 : function() {
    return this.querySelectorAll(selector);
  };
}

// node_modules/d3-selection/src/selection/selectAll.js
function arrayAll(select) {
  return function() {
    return array(select.apply(this, arguments));
  };
}
function selectAll_default(select) {
  if (typeof select === "function")
    select = arrayAll(select);
  else
    select = selectorAll_default(select);
  for (var groups = this._groups, m2 = groups.length, subgroups = [], parents = [], j = 0; j < m2; ++j) {
    for (var group = groups[j], n = group.length, node, i2 = 0; i2 < n; ++i2) {
      if (node = group[i2]) {
        subgroups.push(select.call(node, node.__data__, i2, group));
        parents.push(node);
      }
    }
  }
  return new Selection(subgroups, parents);
}

// node_modules/d3-selection/src/matcher.js
function matcher_default(selector) {
  return function() {
    return this.matches(selector);
  };
}
function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}

// node_modules/d3-selection/src/selection/selectChild.js
var find = Array.prototype.find;
function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function selectChild_default(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/d3-selection/src/selection/selectChildren.js
var filter = Array.prototype.filter;
function children() {
  return Array.from(this.children);
}
function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}
function selectChildren_default(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

// node_modules/d3-selection/src/selection/filter.js
function filter_default(match) {
  if (typeof match !== "function")
    match = matcher_default(match);
  for (var groups = this._groups, m2 = groups.length, subgroups = new Array(m2), j = 0; j < m2; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i2 = 0; i2 < n; ++i2) {
      if ((node = group[i2]) && match.call(node, node.__data__, i2, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// node_modules/d3-selection/src/selection/sparse.js
function sparse_default(update) {
  return new Array(update.length);
}

// node_modules/d3-selection/src/selection/enter.js
function enter_default() {
  return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
}
function EnterNode(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function(child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function(selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function(selector) {
    return this._parent.querySelectorAll(selector);
  }
};

// node_modules/d3-selection/src/constant.js
function constant_default(x3) {
  return function() {
    return x3;
  };
}

// node_modules/d3-selection/src/selection/data.js
function bindIndex(parent, group, enter, update, exit, data) {
  var i2 = 0, node, groupLength = group.length, dataLength = data.length;
  for (; i2 < dataLength; ++i2) {
    if (node = group[i2]) {
      node.__data__ = data[i2];
      update[i2] = node;
    } else {
      enter[i2] = new EnterNode(parent, data[i2]);
    }
  }
  for (; i2 < groupLength; ++i2) {
    if (node = group[i2]) {
      exit[i2] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data, key) {
  var i2, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i2 = 0; i2 < groupLength; ++i2) {
    if (node = group[i2]) {
      keyValues[i2] = keyValue = key.call(node, node.__data__, i2, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i2] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }
  for (i2 = 0; i2 < dataLength; ++i2) {
    keyValue = key.call(parent, data[i2], i2, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i2] = node;
      node.__data__ = data[i2];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i2] = new EnterNode(parent, data[i2]);
    }
  }
  for (i2 = 0; i2 < groupLength; ++i2) {
    if ((node = group[i2]) && nodeByKeyValue.get(keyValues[i2]) === node) {
      exit[i2] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function data_default(value2, key) {
  if (!arguments.length)
    return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
  if (typeof value2 !== "function")
    value2 = constant_default(value2);
  for (var m2 = groups.length, update = new Array(m2), enter = new Array(m2), exit = new Array(m2), j = 0; j < m2; ++j) {
    var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value2.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1)
          i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength)
          ;
        previous._next = next || null;
      }
    }
  }
  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
function arraylike(data) {
  return typeof data === "object" && "length" in data ? data : Array.from(data);
}

// node_modules/d3-selection/src/selection/exit.js
function exit_default() {
  return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
}

// node_modules/d3-selection/src/selection/join.js
function join_default(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter)
      enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update)
      update = update.selection();
  }
  if (onexit == null)
    exit.remove();
  else
    onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

// node_modules/d3-selection/src/selection/merge.js
function merge_default(context) {
  var selection2 = context.selection ? context.selection() : context;
  for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m2 = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m2; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i2 = 0; i2 < n; ++i2) {
      if (node = group0[i2] || group1[i2]) {
        merge[i2] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection(merges, this._parents);
}

// node_modules/d3-selection/src/selection/order.js
function order_default() {
  for (var groups = this._groups, j = -1, m2 = groups.length; ++j < m2; ) {
    for (var group = groups[j], i2 = group.length - 1, next = group[i2], node; --i2 >= 0; ) {
      if (node = group[i2]) {
        if (next && node.compareDocumentPosition(next) ^ 4)
          next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}

// node_modules/d3-selection/src/selection/sort.js
function sort_default(compare) {
  if (!compare)
    compare = ascending;
  function compareNode(a2, b) {
    return a2 && b ? compare(a2.__data__, b.__data__) : !a2 - !b;
  }
  for (var groups = this._groups, m2 = groups.length, sortgroups = new Array(m2), j = 0; j < m2; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i2 = 0; i2 < n; ++i2) {
      if (node = group[i2]) {
        sortgroup[i2] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection(sortgroups, this._parents).order();
}
function ascending(a2, b) {
  return a2 < b ? -1 : a2 > b ? 1 : a2 >= b ? 0 : NaN;
}

// node_modules/d3-selection/src/selection/call.js
function call_default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

// node_modules/d3-selection/src/selection/nodes.js
function nodes_default() {
  return Array.from(this);
}

// node_modules/d3-selection/src/selection/node.js
function node_default() {
  for (var groups = this._groups, j = 0, m2 = groups.length; j < m2; ++j) {
    for (var group = groups[j], i2 = 0, n = group.length; i2 < n; ++i2) {
      var node = group[i2];
      if (node)
        return node;
    }
  }
  return null;
}

// node_modules/d3-selection/src/selection/size.js
function size_default() {
  let size = 0;
  for (const node of this)
    ++size;
  return size;
}

// node_modules/d3-selection/src/selection/empty.js
function empty_default() {
  return !this.node();
}

// node_modules/d3-selection/src/selection/each.js
function each_default(callback) {
  for (var groups = this._groups, j = 0, m2 = groups.length; j < m2; ++j) {
    for (var group = groups[j], i2 = 0, n = group.length, node; i2 < n; ++i2) {
      if (node = group[i2])
        callback.call(node, node.__data__, i2, group);
    }
  }
  return this;
}

// node_modules/d3-selection/src/selection/attr.js
function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, value2) {
  return function() {
    this.setAttribute(name, value2);
  };
}
function attrConstantNS(fullname, value2) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value2);
  };
}
function attrFunction(name, value2) {
  return function() {
    var v = value2.apply(this, arguments);
    if (v == null)
      this.removeAttribute(name);
    else
      this.setAttribute(name, v);
  };
}
function attrFunctionNS(fullname, value2) {
  return function() {
    var v = value2.apply(this, arguments);
    if (v == null)
      this.removeAttributeNS(fullname.space, fullname.local);
    else
      this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function attr_default(name, value2) {
  var fullname = namespace_default(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value2 == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value2 === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value2));
}

// node_modules/d3-selection/src/window.js
function window_default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}

// node_modules/d3-selection/src/selection/style.js
function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, value2, priority) {
  return function() {
    this.style.setProperty(name, value2, priority);
  };
}
function styleFunction(name, value2, priority) {
  return function() {
    var v = value2.apply(this, arguments);
    if (v == null)
      this.style.removeProperty(name);
    else
      this.style.setProperty(name, v, priority);
  };
}
function style_default(name, value2, priority) {
  return arguments.length > 1 ? this.each((value2 == null ? styleRemove : typeof value2 === "function" ? styleFunction : styleConstant)(name, value2, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
}

// node_modules/d3-selection/src/selection/property.js
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant(name, value2) {
  return function() {
    this[name] = value2;
  };
}
function propertyFunction(name, value2) {
  return function() {
    var v = value2.apply(this, arguments);
    if (v == null)
      delete this[name];
    else
      this[name] = v;
  };
}
function property_default(name, value2) {
  return arguments.length > 1 ? this.each((value2 == null ? propertyRemove : typeof value2 === "function" ? propertyFunction : propertyConstant)(name, value2)) : this.node()[name];
}

// node_modules/d3-selection/src/selection/classed.js
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function(name) {
    var i2 = this._names.indexOf(name);
    if (i2 < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i2 = this._names.indexOf(name);
    if (i2 >= 0) {
      this._names.splice(i2, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node), i2 = -1, n = names.length;
  while (++i2 < n)
    list.add(names[i2]);
}
function classedRemove(node, names) {
  var list = classList(node), i2 = -1, n = names.length;
  while (++i2 < n)
    list.remove(names[i2]);
}
function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}
function classedFunction(names, value2) {
  return function() {
    (value2.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function classed_default(name, value2) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()), i2 = -1, n = names.length;
    while (++i2 < n)
      if (!list.contains(names[i2]))
        return false;
    return true;
  }
  return this.each((typeof value2 === "function" ? classedFunction : value2 ? classedTrue : classedFalse)(names, value2));
}

// node_modules/d3-selection/src/selection/text.js
function textRemove() {
  this.textContent = "";
}
function textConstant(value2) {
  return function() {
    this.textContent = value2;
  };
}
function textFunction(value2) {
  return function() {
    var v = value2.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function text_default(value2) {
  return arguments.length ? this.each(value2 == null ? textRemove : (typeof value2 === "function" ? textFunction : textConstant)(value2)) : this.node().textContent;
}

// node_modules/d3-selection/src/selection/html.js
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value2) {
  return function() {
    this.innerHTML = value2;
  };
}
function htmlFunction(value2) {
  return function() {
    var v = value2.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function html_default(value2) {
  return arguments.length ? this.each(value2 == null ? htmlRemove : (typeof value2 === "function" ? htmlFunction : htmlConstant)(value2)) : this.node().innerHTML;
}

// node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling)
    this.parentNode.appendChild(this);
}
function raise_default() {
  return this.each(raise);
}

// node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling)
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
  return this.each(lower);
}

// node_modules/d3-selection/src/selection/append.js
function append_default(name) {
  var create2 = typeof name === "function" ? name : creator_default(name);
  return this.select(function() {
    return this.appendChild(create2.apply(this, arguments));
  });
}

// node_modules/d3-selection/src/selection/insert.js
function constantNull() {
  return null;
}
function insert_default(name, before) {
  var create2 = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
  return this.select(function() {
    return this.insertBefore(create2.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

// node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent)
    parent.removeChild(this);
}
function remove_default() {
  return this.each(remove);
}

// node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function clone_default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

// node_modules/d3-selection/src/selection/datum.js
function datum_default(value2) {
  return arguments.length ? this.property("__data__", value2) : this.node().__data__;
}

// node_modules/d3-selection/src/selection/on.js
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames2(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i2 = t.indexOf(".");
    if (i2 >= 0)
      name = t.slice(i2 + 1), t = t.slice(0, i2);
    return { type: t, name };
  });
}
function onRemove(typename) {
  return function() {
    var on2 = this.__on;
    if (!on2)
      return;
    for (var j = 0, i2 = -1, m2 = on2.length, o; j < m2; ++j) {
      if (o = on2[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on2[++i2] = o;
      }
    }
    if (++i2)
      on2.length = i2;
    else
      delete this.__on;
  };
}
function onAdd(typename, value2, options) {
  return function() {
    var on2 = this.__on, o, listener = contextListener(value2);
    if (on2)
      for (var j = 0, m2 = on2.length; j < m2; ++j) {
        if ((o = on2[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, o.listener = listener, o.options = options);
          o.value = value2;
          return;
        }
      }
    this.addEventListener(typename.type, listener, options);
    o = { type: typename.type, name: typename.name, value: value2, listener, options };
    if (!on2)
      this.__on = [o];
    else
      on2.push(o);
  };
}
function on_default(typename, value2, options) {
  var typenames = parseTypenames2(typename + ""), i2, n = typenames.length, t;
  if (arguments.length < 2) {
    var on2 = this.node().__on;
    if (on2)
      for (var j = 0, m2 = on2.length, o; j < m2; ++j) {
        for (i2 = 0, o = on2[j]; i2 < n; ++i2) {
          if ((t = typenames[i2]).type === o.type && t.name === o.name) {
            return o.value;
          }
        }
      }
    return;
  }
  on2 = value2 ? onAdd : onRemove;
  for (i2 = 0; i2 < n; ++i2)
    this.each(on2(typenames[i2], value2, options));
  return this;
}

// node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent(node, type2, params) {
  var window2 = window_default(node), event = window2.CustomEvent;
  if (typeof event === "function") {
    event = new event(type2, params);
  } else {
    event = window2.document.createEvent("Event");
    if (params)
      event.initEvent(type2, params.bubbles, params.cancelable), event.detail = params.detail;
    else
      event.initEvent(type2, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params);
  };
}
function dispatchFunction(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params.apply(this, arguments));
  };
}
function dispatch_default2(type2, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type2, params));
}

// node_modules/d3-selection/src/selection/iterator.js
function* iterator_default() {
  for (var groups = this._groups, j = 0, m2 = groups.length; j < m2; ++j) {
    for (var group = groups[j], i2 = 0, n = group.length, node; i2 < n; ++i2) {
      if (node = group[i2])
        yield node;
    }
  }
}

// node_modules/d3-selection/src/selection/index.js
var root = [null];
function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: select_default,
  selectAll: selectAll_default,
  selectChild: selectChild_default,
  selectChildren: selectChildren_default,
  filter: filter_default,
  data: data_default,
  enter: enter_default,
  exit: exit_default,
  join: join_default,
  merge: merge_default,
  selection: selection_selection,
  order: order_default,
  sort: sort_default,
  call: call_default,
  nodes: nodes_default,
  node: node_default,
  size: size_default,
  empty: empty_default,
  each: each_default,
  attr: attr_default,
  style: style_default,
  property: property_default,
  classed: classed_default,
  text: text_default,
  html: html_default,
  raise: raise_default,
  lower: lower_default,
  append: append_default,
  insert: insert_default,
  remove: remove_default,
  clone: clone_default,
  datum: datum_default,
  on: on_default,
  dispatch: dispatch_default2,
  [Symbol.iterator]: iterator_default
};
var selection_default = selection;

// node_modules/d3-selection/src/select.js
function select_default2(selector) {
  return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
}

// node_modules/d3-selection/src/sourceEvent.js
function sourceEvent_default(event) {
  let sourceEvent;
  while (sourceEvent = event.sourceEvent)
    event = sourceEvent;
  return event;
}

// node_modules/d3-selection/src/pointer.js
function pointer_default(event, node) {
  event = sourceEvent_default(event);
  if (node === void 0)
    node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}

// node_modules/d3-selection/src/selectAll.js
function selectAll_default2(selector) {
  return typeof selector === "string" ? new Selection([document.querySelectorAll(selector)], [document.documentElement]) : new Selection([array(selector)], root);
}

// node_modules/d3-drag/src/noevent.js
var nonpassive = { passive: false };
var nonpassivecapture = { capture: true, passive: false };
function nopropagation(event) {
  event.stopImmediatePropagation();
}
function noevent_default(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

// node_modules/d3-drag/src/nodrag.js
function nodrag_default(view) {
  var root2 = view.document.documentElement, selection2 = select_default2(view).on("dragstart.drag", noevent_default, nonpassivecapture);
  if ("onselectstart" in root2) {
    selection2.on("selectstart.drag", noevent_default, nonpassivecapture);
  } else {
    root2.__noselect = root2.style.MozUserSelect;
    root2.style.MozUserSelect = "none";
  }
}
function yesdrag(view, noclick) {
  var root2 = view.document.documentElement, selection2 = select_default2(view).on("dragstart.drag", null);
  if (noclick) {
    selection2.on("click.drag", noevent_default, nonpassivecapture);
    setTimeout(function() {
      selection2.on("click.drag", null);
    }, 0);
  }
  if ("onselectstart" in root2) {
    selection2.on("selectstart.drag", null);
  } else {
    root2.style.MozUserSelect = root2.__noselect;
    delete root2.__noselect;
  }
}

// node_modules/d3-drag/src/constant.js
var constant_default2 = (x3) => () => x3;

// node_modules/d3-drag/src/event.js
function DragEvent(type2, {
  sourceEvent,
  subject,
  target,
  identifier,
  active,
  x: x3,
  y: y3,
  dx,
  dy,
  dispatch: dispatch2
}) {
  Object.defineProperties(this, {
    type: { value: type2, enumerable: true, configurable: true },
    sourceEvent: { value: sourceEvent, enumerable: true, configurable: true },
    subject: { value: subject, enumerable: true, configurable: true },
    target: { value: target, enumerable: true, configurable: true },
    identifier: { value: identifier, enumerable: true, configurable: true },
    active: { value: active, enumerable: true, configurable: true },
    x: { value: x3, enumerable: true, configurable: true },
    y: { value: y3, enumerable: true, configurable: true },
    dx: { value: dx, enumerable: true, configurable: true },
    dy: { value: dy, enumerable: true, configurable: true },
    _: { value: dispatch2 }
  });
}
DragEvent.prototype.on = function() {
  var value2 = this._.on.apply(this._, arguments);
  return value2 === this._ ? this : value2;
};

// node_modules/d3-drag/src/drag.js
function defaultFilter(event) {
  return !event.ctrlKey && !event.button;
}
function defaultContainer() {
  return this.parentNode;
}
function defaultSubject(event, d) {
  return d == null ? { x: event.x, y: event.y } : d;
}
function defaultTouchable() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function drag_default() {
  var filter2 = defaultFilter, container = defaultContainer, subject = defaultSubject, touchable = defaultTouchable, gestures = {}, listeners = dispatch_default("start", "drag", "end"), active = 0, mousedownx, mousedowny, mousemoving, touchending, clickDistance2 = 0;
  function drag(selection2) {
    selection2.on("mousedown.drag", mousedowned).filter(touchable).on("touchstart.drag", touchstarted).on("touchmove.drag", touchmoved, nonpassive).on("touchend.drag touchcancel.drag", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function mousedowned(event, d) {
    if (touchending || !filter2.call(this, event, d))
      return;
    var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
    if (!gesture)
      return;
    select_default2(event.view).on("mousemove.drag", mousemoved, nonpassivecapture).on("mouseup.drag", mouseupped, nonpassivecapture);
    nodrag_default(event.view);
    nopropagation(event);
    mousemoving = false;
    mousedownx = event.clientX;
    mousedowny = event.clientY;
    gesture("start", event);
  }
  function mousemoved(event) {
    noevent_default(event);
    if (!mousemoving) {
      var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
      mousemoving = dx * dx + dy * dy > clickDistance2;
    }
    gestures.mouse("drag", event);
  }
  function mouseupped(event) {
    select_default2(event.view).on("mousemove.drag mouseup.drag", null);
    yesdrag(event.view, mousemoving);
    noevent_default(event);
    gestures.mouse("end", event);
  }
  function touchstarted(event, d) {
    if (!filter2.call(this, event, d))
      return;
    var touches = event.changedTouches, c2 = container.call(this, event, d), n = touches.length, i2, gesture;
    for (i2 = 0; i2 < n; ++i2) {
      if (gesture = beforestart(this, c2, event, d, touches[i2].identifier, touches[i2])) {
        nopropagation(event);
        gesture("start", event, touches[i2]);
      }
    }
  }
  function touchmoved(event) {
    var touches = event.changedTouches, n = touches.length, i2, gesture;
    for (i2 = 0; i2 < n; ++i2) {
      if (gesture = gestures[touches[i2].identifier]) {
        noevent_default(event);
        gesture("drag", event, touches[i2]);
      }
    }
  }
  function touchended(event) {
    var touches = event.changedTouches, n = touches.length, i2, gesture;
    if (touchending)
      clearTimeout(touchending);
    touchending = setTimeout(function() {
      touchending = null;
    }, 500);
    for (i2 = 0; i2 < n; ++i2) {
      if (gesture = gestures[touches[i2].identifier]) {
        nopropagation(event);
        gesture("end", event, touches[i2]);
      }
    }
  }
  function beforestart(that, container2, event, d, identifier, touch) {
    var dispatch2 = listeners.copy(), p = pointer_default(touch || event, container2), dx, dy, s;
    if ((s = subject.call(that, new DragEvent("beforestart", {
      sourceEvent: event,
      target: drag,
      identifier,
      active,
      x: p[0],
      y: p[1],
      dx: 0,
      dy: 0,
      dispatch: dispatch2
    }), d)) == null)
      return;
    dx = s.x - p[0] || 0;
    dy = s.y - p[1] || 0;
    return function gesture(type2, event2, touch2) {
      var p0 = p, n;
      switch (type2) {
        case "start":
          gestures[identifier] = gesture, n = active++;
          break;
        case "end":
          delete gestures[identifier], --active;
        case "drag":
          p = pointer_default(touch2 || event2, container2), n = active;
          break;
      }
      dispatch2.call(
        type2,
        that,
        new DragEvent(type2, {
          sourceEvent: event2,
          subject: s,
          target: drag,
          identifier,
          active: n,
          x: p[0] + dx,
          y: p[1] + dy,
          dx: p[0] - p0[0],
          dy: p[1] - p0[1],
          dispatch: dispatch2
        }),
        d
      );
    };
  }
  drag.filter = function(_) {
    return arguments.length ? (filter2 = typeof _ === "function" ? _ : constant_default2(!!_), drag) : filter2;
  };
  drag.container = function(_) {
    return arguments.length ? (container = typeof _ === "function" ? _ : constant_default2(_), drag) : container;
  };
  drag.subject = function(_) {
    return arguments.length ? (subject = typeof _ === "function" ? _ : constant_default2(_), drag) : subject;
  };
  drag.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant_default2(!!_), drag) : touchable;
  };
  drag.on = function() {
    var value2 = listeners.on.apply(listeners, arguments);
    return value2 === listeners ? drag : value2;
  };
  drag.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
  };
  return drag;
}

// node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format) {
  var m2, l;
  format = (format + "").trim().toLowerCase();
  return (m2 = reHex.exec(format)) ? (l = m2[1].length, m2 = parseInt(m2[1], 16), l === 6 ? rgbn(m2) : l === 3 ? new Rgb(m2 >> 8 & 15 | m2 >> 4 & 240, m2 >> 4 & 15 | m2 & 240, (m2 & 15) << 4 | m2 & 15, 1) : l === 8 ? rgba(m2 >> 24 & 255, m2 >> 16 & 255, m2 >> 8 & 255, (m2 & 255) / 255) : l === 4 ? rgba(m2 >> 12 & 15 | m2 >> 8 & 240, m2 >> 8 & 15 | m2 >> 4 & 240, m2 >> 4 & 15 | m2 & 240, ((m2 & 15) << 4 | m2 & 15) / 255) : null) : (m2 = reRgbInteger.exec(format)) ? new Rgb(m2[1], m2[2], m2[3], 1) : (m2 = reRgbPercent.exec(format)) ? new Rgb(m2[1] * 255 / 100, m2[2] * 255 / 100, m2[3] * 255 / 100, 1) : (m2 = reRgbaInteger.exec(format)) ? rgba(m2[1], m2[2], m2[3], m2[4]) : (m2 = reRgbaPercent.exec(format)) ? rgba(m2[1] * 255 / 100, m2[2] * 255 / 100, m2[3] * 255 / 100, m2[4]) : (m2 = reHslPercent.exec(format)) ? hsla(m2[1], m2[2] / 100, m2[3] / 100, 1) : (m2 = reHslaPercent.exec(format)) ? hsla(m2[1], m2[2] / 100, m2[3] / 100, m2[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a2) {
  if (a2 <= 0)
    r = g = b = NaN;
  return new Rgb(r, g, b, a2);
}
function rgbConvert(o) {
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a2 = clampa(this.opacity);
  return `${a2 === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a2 === 1 ? ")" : `, ${a2})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value2) {
  return Math.max(0, Math.min(255, Math.round(value2) || 0));
}
function hex(value2) {
  value2 = clampi(value2);
  return (value2 < 16 ? "0" : "") + value2.toString(16);
}
function hsla(h, s, l, a2) {
  if (a2 <= 0)
    h = s = l = NaN;
  else if (l <= 0 || l >= 1)
    h = s = NaN;
  else if (s <= 0)
    h = NaN;
  return new Hsl(h, s, l, a2);
}
function hslConvert(o) {
  if (o instanceof Hsl)
    return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Hsl();
  if (o instanceof Hsl)
    return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min2 = Math.min(r, g, b), max2 = Math.max(r, g, b), h = NaN, s = max2 - min2, l = (max2 + min2) / 2;
  if (s) {
    if (r === max2)
      h = (g - b) / s + (g < b) * 6;
    else if (g === max2)
      h = (b - r) / s + 2;
    else
      h = (r - g) / s + 4;
    s /= l < 0.5 ? max2 + min2 : 2 - max2 - min2;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a2 = clampa(this.opacity);
    return `${a2 === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a2 === 1 ? ")" : `, ${a2})`}`;
  }
}));
function clamph(value2) {
  value2 = (value2 || 0) % 360;
  return value2 < 0 ? value2 + 360 : value2;
}
function clampt(value2) {
  return Math.max(0, Math.min(1, value2 || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// node_modules/d3-interpolate/src/basis.js
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function basis_default(values) {
  var n = values.length - 1;
  return function(t) {
    var i2 = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i2], v2 = values[i2 + 1], v0 = i2 > 0 ? values[i2 - 1] : 2 * v1 - v2, v3 = i2 < n - 1 ? values[i2 + 2] : 2 * v2 - v1;
    return basis((t - i2 / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n = values.length;
  return function(t) {
    var i2 = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i2 + n - 1) % n], v1 = values[i2 % n], v2 = values[(i2 + 1) % n], v3 = values[(i2 + 2) % n];
    return basis((t - i2 / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/constant.js
var constant_default3 = (x3) => () => x3;

// node_modules/d3-interpolate/src/color.js
function linear(a2, d) {
  return function(t) {
    return a2 + t * d;
  };
}
function exponential(a2, b, y3) {
  return a2 = Math.pow(a2, y3), b = Math.pow(b, y3) - a2, y3 = 1 / y3, function(t) {
    return Math.pow(a2 + t * b, y3);
  };
}
function gamma(y3) {
  return (y3 = +y3) === 1 ? nogamma : function(a2, b) {
    return b - a2 ? exponential(a2, b, y3) : constant_default3(isNaN(a2) ? b : a2);
  };
}
function nogamma(a2, b) {
  var d = b - a2;
  return d ? linear(a2, d) : constant_default3(isNaN(a2) ? b : a2);
}

// node_modules/d3-interpolate/src/rgb.js
var rgb_default = function rgbGamma(y3) {
  var color2 = gamma(y3);
  function rgb2(start2, end) {
    var r = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.r = r(t);
      start2.g = g(t);
      start2.b = b(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i2, color2;
    for (i2 = 0; i2 < n; ++i2) {
      color2 = rgb(colors[i2]);
      r[i2] = color2.r || 0;
      g[i2] = color2.g || 0;
      b[i2] = color2.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color2.opacity = 1;
    return function(t) {
      color2.r = r(t);
      color2.g = g(t);
      color2.b = b(t);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default);
var rgbBasisClosed = rgbSpline(basisClosed_default);

// node_modules/d3-interpolate/src/number.js
function number_default(a2, b) {
  return a2 = +a2, b = +b, function(t) {
    return a2 * (1 - t) + b * t;
  };
}

// node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string_default(a2, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i2 = -1, s = [], q = [];
  a2 = a2 + "", b = b + "";
  while ((am = reA.exec(a2)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i2])
        s[i2] += bs;
      else
        s[++i2] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i2])
        s[i2] += bm;
      else
        s[++i2] = bm;
    } else {
      s[++i2] = null;
      q.push({ i: i2, x: number_default(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i2])
      s[i2] += bs;
    else
      s[++i2] = bs;
  }
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
    for (var i3 = 0, o; i3 < b; ++i3)
      s[(o = q[i3]).i] = o.x(t);
    return s.join("");
  });
}

// node_modules/d3-interpolate/src/transform/decompose.js
var degrees = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default(a2, b, c2, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a2 * a2 + b * b))
    a2 /= scaleX, b /= scaleX;
  if (skewX = a2 * c2 + b * d)
    c2 -= a2 * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c2 * c2 + d * d))
    c2 /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a2 * d < b * c2)
    a2 = -a2, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a2) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX,
    scaleY
  };
}

// node_modules/d3-interpolate/src/transform/parse.js
var svgNode;
function parseCss(value2) {
  const m2 = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value2 + "");
  return m2.isIdentity ? identity : decompose_default(m2.a, m2.b, m2.c, m2.d, m2.e, m2.f);
}
function parseSvg(value2) {
  if (value2 == null)
    return identity;
  if (!svgNode)
    svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value2);
  if (!(value2 = svgNode.transform.baseVal.consolidate()))
    return identity;
  value2 = value2.matrix;
  return decompose_default(value2.a, value2.b, value2.c, value2.d, value2.e, value2.f);
}

// node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse2, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i2 = s.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i2 - 4, x: number_default(xa, xb) }, { i: i2 - 2, x: number_default(ya, yb) });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a2, b, s, q) {
    if (a2 !== b) {
      if (a2 - b > 180)
        b += 360;
      else if (b - a2 > 180)
        a2 += 360;
      q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number_default(a2, b) });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a2, b, s, q) {
    if (a2 !== b) {
      q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number_default(a2, b) });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i2 = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({ i: i2 - 4, x: number_default(xa, xb) }, { i: i2 - 2, x: number_default(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a2, b) {
    var s = [], q = [];
    a2 = parse2(a2), b = parse2(b);
    translate(a2.translateX, a2.translateY, b.translateX, b.translateY, s, q);
    rotate(a2.rotate, b.rotate, s, q);
    skewX(a2.skewX, b.skewX, s, q);
    scale(a2.scaleX, a2.scaleY, b.scaleX, b.scaleY, s, q);
    a2 = b = null;
    return function(t) {
      var i2 = -1, n = q.length, o;
      while (++i2 < n)
        s[(o = q[i2]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

// node_modules/d3-interpolate/src/zoom.js
var epsilon2 = 1e-12;
function cosh(x3) {
  return ((x3 = Math.exp(x3)) + 1 / x3) / 2;
}
function sinh(x3) {
  return ((x3 = Math.exp(x3)) - 1 / x3) / 2;
}
function tanh(x3) {
  return ((x3 = Math.exp(2 * x3)) - 1) / (x3 + 1);
}
var zoom_default = function zoomRho(rho, rho2, rho4) {
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i2, S;
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i2 = function(t) {
        return [
          ux0 + t * dx,
          uy0 + t * dy,
          w0 * Math.exp(rho * t * S)
        ];
      };
    } else {
      var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i2 = function(t) {
        var s = t * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [
          ux0 + u * dx,
          uy0 + u * dy,
          w0 * coshr0 / cosh(rho * s + r0)
        ];
      };
    }
    i2.duration = S * 1e3 * rho / Math.SQRT2;
    return i2;
  }
  zoom.rho = function(_) {
    var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };
  return zoom;
}(Math.SQRT2, 2, 4);

// node_modules/d3-timer/src/timer.js
var frame = 0;
var timeout = 0;
var interval = 0;
var pokeDelay = 1e3;
var taskHead;
var taskTail;
var clockLast = 0;
var clockNow = 0;
var clockSkew = 0;
var clock = typeof performance === "object" && performance.now ? performance : Date;
var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function")
      throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail)
        taskTail._next = this;
      else
        taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0)
      t._call.call(void 0, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay)
    clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time)
        time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}
function sleep(time) {
  if (frame)
    return;
  if (timeout)
    timeout = clearTimeout(timeout);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity)
      timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval)
      interval = clearInterval(interval);
  } else {
    if (!interval)
      clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

// node_modules/d3-timer/src/timeout.js
function timeout_default(callback, delay, time) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart((elapsed) => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

// node_modules/d3-transition/src/transition/schedule.js
var emptyOn = dispatch_default("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
function schedule_default(node, name, id2, index2, group, timing) {
  var schedules = node.__transition;
  if (!schedules)
    node.__transition = {};
  else if (id2 in schedules)
    return;
  create(node, id2, {
    name,
    index: index2,
    // For context during callback.
    group,
    // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > CREATED)
    throw new Error("too late; already scheduled");
  return schedule;
}
function set2(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > STARTED)
    throw new Error("too late; already running");
  return schedule;
}
function get2(node, id2) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id2]))
    throw new Error("transition not found");
  return schedule;
}
function create(node, id2, self2) {
  var schedules = node.__transition, tween;
  schedules[id2] = self2;
  self2.timer = timer(schedule, 0, self2.time);
  function schedule(elapsed) {
    self2.state = SCHEDULED;
    self2.timer.restart(start2, self2.delay, self2.time);
    if (self2.delay <= elapsed)
      start2(elapsed - self2.delay);
  }
  function start2(elapsed) {
    var i2, j, n, o;
    if (self2.state !== SCHEDULED)
      return stop();
    for (i2 in schedules) {
      o = schedules[i2];
      if (o.name !== self2.name)
        continue;
      if (o.state === STARTED)
        return timeout_default(start2);
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i2];
      } else if (+i2 < id2) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i2];
      }
    }
    timeout_default(function() {
      if (self2.state === STARTED) {
        self2.state = RUNNING;
        self2.timer.restart(tick, self2.delay, self2.time);
        tick(elapsed);
      }
    });
    self2.state = STARTING;
    self2.on.call("start", node, node.__data__, self2.index, self2.group);
    if (self2.state !== STARTING)
      return;
    self2.state = STARTED;
    tween = new Array(n = self2.tween.length);
    for (i2 = 0, j = -1; i2 < n; ++i2) {
      if (o = self2.tween[i2].value.call(node, node.__data__, self2.index, self2.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self2.duration ? self2.ease.call(null, elapsed / self2.duration) : (self2.timer.restart(stop), self2.state = ENDING, 1), i2 = -1, n = tween.length;
    while (++i2 < n) {
      tween[i2].call(node, t);
    }
    if (self2.state === ENDING) {
      self2.on.call("end", node, node.__data__, self2.index, self2.group);
      stop();
    }
  }
  function stop() {
    self2.state = ENDED;
    self2.timer.stop();
    delete schedules[id2];
    for (var i2 in schedules)
      return;
    delete node.__transition;
  }
}

// node_modules/d3-transition/src/interrupt.js
function interrupt_default(node, name) {
  var schedules = node.__transition, schedule, active, empty3 = true, i2;
  if (!schedules)
    return;
  name = name == null ? null : name + "";
  for (i2 in schedules) {
    if ((schedule = schedules[i2]).name !== name) {
      empty3 = false;
      continue;
    }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i2];
  }
  if (empty3)
    delete node.__transition;
}

// node_modules/d3-transition/src/selection/interrupt.js
function interrupt_default2(name) {
  return this.each(function() {
    interrupt_default(this, name);
  });
}

// node_modules/d3-transition/src/transition/tween.js
function tweenRemove(id2, name) {
  var tween0, tween1;
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i2 = 0, n = tween1.length; i2 < n; ++i2) {
        if (tween1[i2].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i2, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction(id2, name, value2) {
  var tween0, tween1;
  if (typeof value2 !== "function")
    throw new Error();
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = { name, value: value2 }, i2 = 0, n = tween1.length; i2 < n; ++i2) {
        if (tween1[i2].name === name) {
          tween1[i2] = t;
          break;
        }
      }
      if (i2 === n)
        tween1.push(t);
    }
    schedule.tween = tween1;
  };
}
function tween_default(name, value2) {
  var id2 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get2(this.node(), id2).tween;
    for (var i2 = 0, n = tween.length, t; i2 < n; ++i2) {
      if ((t = tween[i2]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value2 == null ? tweenRemove : tweenFunction)(id2, name, value2));
}
function tweenValue(transition2, name, value2) {
  var id2 = transition2._id;
  transition2.each(function() {
    var schedule = set2(this, id2);
    (schedule.value || (schedule.value = {}))[name] = value2.apply(this, arguments);
  });
  return function(node) {
    return get2(node, id2).value[name];
  };
}

// node_modules/d3-transition/src/transition/interpolate.js
function interpolate_default(a2, b) {
  var c2;
  return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c2 = color(b)) ? (b = c2, rgb_default) : string_default)(a2, b);
}

// node_modules/d3-transition/src/transition/attr.js
function attrRemove2(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS2(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS2(fullname, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction2(name, interpolate, value2) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value2(this), string1;
    if (value1 == null)
      return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS2(fullname, interpolate, value2) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value2(this), string1;
    if (value1 == null)
      return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attr_default2(name, value2) {
  var fullname = namespace_default(name), i2 = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
  return this.attrTween(name, typeof value2 === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i2, tweenValue(this, "attr." + name, value2)) : value2 == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i2, value2));
}

// node_modules/d3-transition/src/transition/attrTween.js
function attrInterpolate(name, i2) {
  return function(t) {
    this.setAttribute(name, i2.call(this, t));
  };
}
function attrInterpolateNS(fullname, i2) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i2.call(this, t));
  };
}
function attrTweenNS(fullname, value2) {
  var t0, i0;
  function tween() {
    var i2 = value2.apply(this, arguments);
    if (i2 !== i0)
      t0 = (i0 = i2) && attrInterpolateNS(fullname, i2);
    return t0;
  }
  tween._value = value2;
  return tween;
}
function attrTween(name, value2) {
  var t0, i0;
  function tween() {
    var i2 = value2.apply(this, arguments);
    if (i2 !== i0)
      t0 = (i0 = i2) && attrInterpolate(name, i2);
    return t0;
  }
  tween._value = value2;
  return tween;
}
function attrTween_default(name, value2) {
  var key = "attr." + name;
  if (arguments.length < 2)
    return (key = this.tween(key)) && key._value;
  if (value2 == null)
    return this.tween(key, null);
  if (typeof value2 !== "function")
    throw new Error();
  var fullname = namespace_default(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value2));
}

// node_modules/d3-transition/src/transition/delay.js
function delayFunction(id2, value2) {
  return function() {
    init(this, id2).delay = +value2.apply(this, arguments);
  };
}
function delayConstant(id2, value2) {
  return value2 = +value2, function() {
    init(this, id2).delay = value2;
  };
}
function delay_default(value2) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value2 === "function" ? delayFunction : delayConstant)(id2, value2)) : get2(this.node(), id2).delay;
}

// node_modules/d3-transition/src/transition/duration.js
function durationFunction(id2, value2) {
  return function() {
    set2(this, id2).duration = +value2.apply(this, arguments);
  };
}
function durationConstant(id2, value2) {
  return value2 = +value2, function() {
    set2(this, id2).duration = value2;
  };
}
function duration_default(value2) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value2 === "function" ? durationFunction : durationConstant)(id2, value2)) : get2(this.node(), id2).duration;
}

// node_modules/d3-transition/src/transition/ease.js
function easeConstant(id2, value2) {
  if (typeof value2 !== "function")
    throw new Error();
  return function() {
    set2(this, id2).ease = value2;
  };
}
function ease_default(value2) {
  var id2 = this._id;
  return arguments.length ? this.each(easeConstant(id2, value2)) : get2(this.node(), id2).ease;
}

// node_modules/d3-transition/src/transition/easeVarying.js
function easeVarying(id2, value2) {
  return function() {
    var v = value2.apply(this, arguments);
    if (typeof v !== "function")
      throw new Error();
    set2(this, id2).ease = v;
  };
}
function easeVarying_default(value2) {
  if (typeof value2 !== "function")
    throw new Error();
  return this.each(easeVarying(this._id, value2));
}

// node_modules/d3-transition/src/transition/filter.js
function filter_default2(match) {
  if (typeof match !== "function")
    match = matcher_default(match);
  for (var groups = this._groups, m2 = groups.length, subgroups = new Array(m2), j = 0; j < m2; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i2 = 0; i2 < n; ++i2) {
      if ((node = group[i2]) && match.call(node, node.__data__, i2, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}

// node_modules/d3-transition/src/transition/merge.js
function merge_default2(transition2) {
  if (transition2._id !== this._id)
    throw new Error();
  for (var groups0 = this._groups, groups1 = transition2._groups, m0 = groups0.length, m1 = groups1.length, m2 = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m2; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i2 = 0; i2 < n; ++i2) {
      if (node = group0[i2] || group1[i2]) {
        merge[i2] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}

// node_modules/d3-transition/src/transition/on.js
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i2 = t.indexOf(".");
    if (i2 >= 0)
      t = t.slice(0, i2);
    return !t || t === "start";
  });
}
function onFunction(id2, name, listener) {
  var on0, on1, sit = start(name) ? init : set2;
  return function() {
    var schedule = sit(this, id2), on2 = schedule.on;
    if (on2 !== on0)
      (on1 = (on0 = on2).copy()).on(name, listener);
    schedule.on = on1;
  };
}
function on_default2(name, listener) {
  var id2 = this._id;
  return arguments.length < 2 ? get2(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
}

// node_modules/d3-transition/src/transition/remove.js
function removeFunction(id2) {
  return function() {
    var parent = this.parentNode;
    for (var i2 in this.__transition)
      if (+i2 !== id2)
        return;
    if (parent)
      parent.removeChild(this);
  };
}
function remove_default2() {
  return this.on("end.remove", removeFunction(this._id));
}

// node_modules/d3-transition/src/transition/select.js
function select_default3(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function")
    select = selector_default(select);
  for (var groups = this._groups, m2 = groups.length, subgroups = new Array(m2), j = 0; j < m2; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i2 = 0; i2 < n; ++i2) {
      if ((node = group[i2]) && (subnode = select.call(node, node.__data__, i2, group))) {
        if ("__data__" in node)
          subnode.__data__ = node.__data__;
        subgroup[i2] = subnode;
        schedule_default(subgroup[i2], name, id2, i2, subgroup, get2(node, id2));
      }
    }
  }
  return new Transition(subgroups, this._parents, name, id2);
}

// node_modules/d3-transition/src/transition/selectAll.js
function selectAll_default3(select) {
  var name = this._name, id2 = this._id;
  if (typeof select !== "function")
    select = selectorAll_default(select);
  for (var groups = this._groups, m2 = groups.length, subgroups = [], parents = [], j = 0; j < m2; ++j) {
    for (var group = groups[j], n = group.length, node, i2 = 0; i2 < n; ++i2) {
      if (node = group[i2]) {
        for (var children2 = select.call(node, node.__data__, i2, group), child, inherit2 = get2(node, id2), k = 0, l = children2.length; k < l; ++k) {
          if (child = children2[k]) {
            schedule_default(child, name, id2, k, children2, inherit2);
          }
        }
        subgroups.push(children2);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name, id2);
}

// node_modules/d3-transition/src/transition/selection.js
var Selection2 = selection_default.prototype.constructor;
function selection_default2() {
  return new Selection2(this._groups, this._parents);
}

// node_modules/d3-transition/src/transition/style.js
function styleNull(name, interpolate) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove2(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant2(name, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction2(name, interpolate, value2) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), value1 = value2(this), string1 = value1 + "";
    if (value1 == null)
      string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove(id2, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
  return function() {
    var schedule = set2(this, id2), on2 = schedule.on, listener = schedule.value[key] == null ? remove2 || (remove2 = styleRemove2(name)) : void 0;
    if (on2 !== on0 || listener0 !== listener)
      (on1 = (on0 = on2).copy()).on(event, listener0 = listener);
    schedule.on = on1;
  };
}
function style_default2(name, value2, priority) {
  var i2 = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
  return value2 == null ? this.styleTween(name, styleNull(name, i2)).on("end.style." + name, styleRemove2(name)) : typeof value2 === "function" ? this.styleTween(name, styleFunction2(name, i2, tweenValue(this, "style." + name, value2))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant2(name, i2, value2), priority).on("end.style." + name, null);
}

// node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name, i2, priority) {
  return function(t) {
    this.style.setProperty(name, i2.call(this, t), priority);
  };
}
function styleTween(name, value2, priority) {
  var t, i0;
  function tween() {
    var i2 = value2.apply(this, arguments);
    if (i2 !== i0)
      t = (i0 = i2) && styleInterpolate(name, i2, priority);
    return t;
  }
  tween._value = value2;
  return tween;
}
function styleTween_default(name, value2, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2)
    return (key = this.tween(key)) && key._value;
  if (value2 == null)
    return this.tween(key, null);
  if (typeof value2 !== "function")
    throw new Error();
  return this.tween(key, styleTween(name, value2, priority == null ? "" : priority));
}

// node_modules/d3-transition/src/transition/text.js
function textConstant2(value2) {
  return function() {
    this.textContent = value2;
  };
}
function textFunction2(value2) {
  return function() {
    var value1 = value2(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function text_default2(value2) {
  return this.tween("text", typeof value2 === "function" ? textFunction2(tweenValue(this, "text", value2)) : textConstant2(value2 == null ? "" : value2 + ""));
}

// node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i2) {
  return function(t) {
    this.textContent = i2.call(this, t);
  };
}
function textTween(value2) {
  var t0, i0;
  function tween() {
    var i2 = value2.apply(this, arguments);
    if (i2 !== i0)
      t0 = (i0 = i2) && textInterpolate(i2);
    return t0;
  }
  tween._value = value2;
  return tween;
}
function textTween_default(value2) {
  var key = "text";
  if (arguments.length < 1)
    return (key = this.tween(key)) && key._value;
  if (value2 == null)
    return this.tween(key, null);
  if (typeof value2 !== "function")
    throw new Error();
  return this.tween(key, textTween(value2));
}

// node_modules/d3-transition/src/transition/transition.js
function transition_default() {
  var name = this._name, id0 = this._id, id1 = newId();
  for (var groups = this._groups, m2 = groups.length, j = 0; j < m2; ++j) {
    for (var group = groups[j], n = group.length, node, i2 = 0; i2 < n; ++i2) {
      if (node = group[i2]) {
        var inherit2 = get2(node, id0);
        schedule_default(node, name, id1, i2, group, {
          time: inherit2.time + inherit2.delay + inherit2.duration,
          delay: 0,
          duration: inherit2.duration,
          ease: inherit2.ease
        });
      }
    }
  }
  return new Transition(groups, this._parents, name, id1);
}

// node_modules/d3-transition/src/transition/end.js
function end_default() {
  var on0, on1, that = this, id2 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = { value: reject }, end = { value: function() {
      if (--size === 0)
        resolve();
    } };
    that.each(function() {
      var schedule = set2(this, id2), on2 = schedule.on;
      if (on2 !== on0) {
        on1 = (on0 = on2).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });
    if (size === 0)
      resolve();
  });
}

// node_modules/d3-transition/src/transition/index.js
var id = 0;
function Transition(groups, parents, name, id2) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id2;
}
function transition(name) {
  return selection_default().transition(name);
}
function newId() {
  return ++id;
}
var selection_prototype = selection_default.prototype;
Transition.prototype = transition.prototype = {
  constructor: Transition,
  select: select_default3,
  selectAll: selectAll_default3,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: filter_default2,
  merge: merge_default2,
  selection: selection_default2,
  transition: transition_default,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: on_default2,
  attr: attr_default2,
  attrTween: attrTween_default,
  style: style_default2,
  styleTween: styleTween_default,
  text: text_default2,
  textTween: textTween_default,
  remove: remove_default2,
  tween: tween_default,
  delay: delay_default,
  duration: duration_default,
  ease: ease_default,
  easeVarying: easeVarying_default,
  end: end_default,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};

// node_modules/d3-ease/src/cubic.js
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

// node_modules/d3-transition/src/selection/transition.js
var defaultTiming = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit(node, id2) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id2])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id2} not found`);
    }
  }
  return timing;
}
function transition_default2(name) {
  var id2, timing;
  if (name instanceof Transition) {
    id2 = name._id, name = name._name;
  } else {
    id2 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m2 = groups.length, j = 0; j < m2; ++j) {
    for (var group = groups[j], n = group.length, node, i2 = 0; i2 < n; ++i2) {
      if (node = group[i2]) {
        schedule_default(node, name, id2, i2, group, timing || inherit(node, id2));
      }
    }
  }
  return new Transition(groups, this._parents, name, id2);
}

// node_modules/d3-transition/src/selection/index.js
selection_default.prototype.interrupt = interrupt_default2;
selection_default.prototype.transition = transition_default2;

// node_modules/d3-brush/src/brush.js
var { abs, max, min } = Math;
function number1(e) {
  return [+e[0], +e[1]];
}
function number2(e) {
  return [number1(e[0]), number1(e[1])];
}
var X = {
  name: "x",
  handles: ["w", "e"].map(type),
  input: function(x3, e) {
    return x3 == null ? null : [[+x3[0], e[0][1]], [+x3[1], e[1][1]]];
  },
  output: function(xy) {
    return xy && [xy[0][0], xy[1][0]];
  }
};
var Y = {
  name: "y",
  handles: ["n", "s"].map(type),
  input: function(y3, e) {
    return y3 == null ? null : [[e[0][0], +y3[0]], [e[1][0], +y3[1]]];
  },
  output: function(xy) {
    return xy && [xy[0][1], xy[1][1]];
  }
};
var XY = {
  name: "xy",
  handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(type),
  input: function(xy) {
    return xy == null ? null : number2(xy);
  },
  output: function(xy) {
    return xy;
  }
};
function type(t) {
  return { type: t };
}

// node_modules/d3-force/src/center.js
function center_default(x3, y3) {
  var nodes, strength = 1;
  if (x3 == null)
    x3 = 0;
  if (y3 == null)
    y3 = 0;
  function force() {
    var i2, n = nodes.length, node, sx = 0, sy = 0;
    for (i2 = 0; i2 < n; ++i2) {
      node = nodes[i2], sx += node.x, sy += node.y;
    }
    for (sx = (sx / n - x3) * strength, sy = (sy / n - y3) * strength, i2 = 0; i2 < n; ++i2) {
      node = nodes[i2], node.x -= sx, node.y -= sy;
    }
  }
  force.initialize = function(_) {
    nodes = _;
  };
  force.x = function(_) {
    return arguments.length ? (x3 = +_, force) : x3;
  };
  force.y = function(_) {
    return arguments.length ? (y3 = +_, force) : y3;
  };
  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };
  return force;
}

// node_modules/d3-quadtree/src/add.js
function add_default(d) {
  const x3 = +this._x.call(null, d), y3 = +this._y.call(null, d);
  return add(this.cover(x3, y3), x3, y3, d);
}
function add(tree, x3, y3, d) {
  if (isNaN(x3) || isNaN(y3))
    return tree;
  var parent, node = tree._root, leaf = { data: d }, x0 = tree._x0, y0 = tree._y0, x1 = tree._x1, y1 = tree._y1, xm, ym, xp, yp, right, bottom, i2, j;
  if (!node)
    return tree._root = leaf, tree;
  while (node.length) {
    if (right = x3 >= (xm = (x0 + x1) / 2))
      x0 = xm;
    else
      x1 = xm;
    if (bottom = y3 >= (ym = (y0 + y1) / 2))
      y0 = ym;
    else
      y1 = ym;
    if (parent = node, !(node = node[i2 = bottom << 1 | right]))
      return parent[i2] = leaf, tree;
  }
  xp = +tree._x.call(null, node.data);
  yp = +tree._y.call(null, node.data);
  if (x3 === xp && y3 === yp)
    return leaf.next = node, parent ? parent[i2] = leaf : tree._root = leaf, tree;
  do {
    parent = parent ? parent[i2] = new Array(4) : tree._root = new Array(4);
    if (right = x3 >= (xm = (x0 + x1) / 2))
      x0 = xm;
    else
      x1 = xm;
    if (bottom = y3 >= (ym = (y0 + y1) / 2))
      y0 = ym;
    else
      y1 = ym;
  } while ((i2 = bottom << 1 | right) === (j = (yp >= ym) << 1 | xp >= xm));
  return parent[j] = node, parent[i2] = leaf, tree;
}
function addAll(data) {
  var d, i2, n = data.length, x3, y3, xz = new Array(n), yz = new Array(n), x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (i2 = 0; i2 < n; ++i2) {
    if (isNaN(x3 = +this._x.call(null, d = data[i2])) || isNaN(y3 = +this._y.call(null, d)))
      continue;
    xz[i2] = x3;
    yz[i2] = y3;
    if (x3 < x0)
      x0 = x3;
    if (x3 > x1)
      x1 = x3;
    if (y3 < y0)
      y0 = y3;
    if (y3 > y1)
      y1 = y3;
  }
  if (x0 > x1 || y0 > y1)
    return this;
  this.cover(x0, y0).cover(x1, y1);
  for (i2 = 0; i2 < n; ++i2) {
    add(this, xz[i2], yz[i2], data[i2]);
  }
  return this;
}

// node_modules/d3-quadtree/src/cover.js
function cover_default(x3, y3) {
  if (isNaN(x3 = +x3) || isNaN(y3 = +y3))
    return this;
  var x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1;
  if (isNaN(x0)) {
    x1 = (x0 = Math.floor(x3)) + 1;
    y1 = (y0 = Math.floor(y3)) + 1;
  } else {
    var z = x1 - x0 || 1, node = this._root, parent, i2;
    while (x0 > x3 || x3 >= x1 || y0 > y3 || y3 >= y1) {
      i2 = (y3 < y0) << 1 | x3 < x0;
      parent = new Array(4), parent[i2] = node, node = parent, z *= 2;
      switch (i2) {
        case 0:
          x1 = x0 + z, y1 = y0 + z;
          break;
        case 1:
          x0 = x1 - z, y1 = y0 + z;
          break;
        case 2:
          x1 = x0 + z, y0 = y1 - z;
          break;
        case 3:
          x0 = x1 - z, y0 = y1 - z;
          break;
      }
    }
    if (this._root && this._root.length)
      this._root = node;
  }
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  return this;
}

// node_modules/d3-quadtree/src/data.js
function data_default2() {
  var data = [];
  this.visit(function(node) {
    if (!node.length)
      do
        data.push(node.data);
      while (node = node.next);
  });
  return data;
}

// node_modules/d3-quadtree/src/extent.js
function extent_default(_) {
  return arguments.length ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}

// node_modules/d3-quadtree/src/quad.js
function quad_default(node, x0, y0, x1, y1) {
  this.node = node;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
}

// node_modules/d3-quadtree/src/find.js
function find_default(x3, y3, radius) {
  var data, x0 = this._x0, y0 = this._y0, x1, y1, x22, y22, x32 = this._x1, y32 = this._y1, quads = [], node = this._root, q, i2;
  if (node)
    quads.push(new quad_default(node, x0, y0, x32, y32));
  if (radius == null)
    radius = Infinity;
  else {
    x0 = x3 - radius, y0 = y3 - radius;
    x32 = x3 + radius, y32 = y3 + radius;
    radius *= radius;
  }
  while (q = quads.pop()) {
    if (!(node = q.node) || (x1 = q.x0) > x32 || (y1 = q.y0) > y32 || (x22 = q.x1) < x0 || (y22 = q.y1) < y0)
      continue;
    if (node.length) {
      var xm = (x1 + x22) / 2, ym = (y1 + y22) / 2;
      quads.push(
        new quad_default(node[3], xm, ym, x22, y22),
        new quad_default(node[2], x1, ym, xm, y22),
        new quad_default(node[1], xm, y1, x22, ym),
        new quad_default(node[0], x1, y1, xm, ym)
      );
      if (i2 = (y3 >= ym) << 1 | x3 >= xm) {
        q = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i2];
        quads[quads.length - 1 - i2] = q;
      }
    } else {
      var dx = x3 - +this._x.call(null, node.data), dy = y3 - +this._y.call(null, node.data), d2 = dx * dx + dy * dy;
      if (d2 < radius) {
        var d = Math.sqrt(radius = d2);
        x0 = x3 - d, y0 = y3 - d;
        x32 = x3 + d, y32 = y3 + d;
        data = node.data;
      }
    }
  }
  return data;
}

// node_modules/d3-quadtree/src/remove.js
function remove_default3(d) {
  if (isNaN(x3 = +this._x.call(null, d)) || isNaN(y3 = +this._y.call(null, d)))
    return this;
  var parent, node = this._root, retainer, previous, next, x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1, x3, y3, xm, ym, right, bottom, i2, j;
  if (!node)
    return this;
  if (node.length)
    while (true) {
      if (right = x3 >= (xm = (x0 + x1) / 2))
        x0 = xm;
      else
        x1 = xm;
      if (bottom = y3 >= (ym = (y0 + y1) / 2))
        y0 = ym;
      else
        y1 = ym;
      if (!(parent = node, node = node[i2 = bottom << 1 | right]))
        return this;
      if (!node.length)
        break;
      if (parent[i2 + 1 & 3] || parent[i2 + 2 & 3] || parent[i2 + 3 & 3])
        retainer = parent, j = i2;
    }
  while (node.data !== d)
    if (!(previous = node, node = node.next))
      return this;
  if (next = node.next)
    delete node.next;
  if (previous)
    return next ? previous.next = next : delete previous.next, this;
  if (!parent)
    return this._root = next, this;
  next ? parent[i2] = next : delete parent[i2];
  if ((node = parent[0] || parent[1] || parent[2] || parent[3]) && node === (parent[3] || parent[2] || parent[1] || parent[0]) && !node.length) {
    if (retainer)
      retainer[j] = node;
    else
      this._root = node;
  }
  return this;
}
function removeAll(data) {
  for (var i2 = 0, n = data.length; i2 < n; ++i2)
    this.remove(data[i2]);
  return this;
}

// node_modules/d3-quadtree/src/root.js
function root_default() {
  return this._root;
}

// node_modules/d3-quadtree/src/size.js
function size_default2() {
  var size = 0;
  this.visit(function(node) {
    if (!node.length)
      do
        ++size;
      while (node = node.next);
  });
  return size;
}

// node_modules/d3-quadtree/src/visit.js
function visit_default(callback) {
  var quads = [], q, node = this._root, child, x0, y0, x1, y1;
  if (node)
    quads.push(new quad_default(node, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[3])
        quads.push(new quad_default(child, xm, ym, x1, y1));
      if (child = node[2])
        quads.push(new quad_default(child, x0, ym, xm, y1));
      if (child = node[1])
        quads.push(new quad_default(child, xm, y0, x1, ym));
      if (child = node[0])
        quads.push(new quad_default(child, x0, y0, xm, ym));
    }
  }
  return this;
}

// node_modules/d3-quadtree/src/visitAfter.js
function visitAfter_default(callback) {
  var quads = [], next = [], q;
  if (this._root)
    quads.push(new quad_default(this._root, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    var node = q.node;
    if (node.length) {
      var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[0])
        quads.push(new quad_default(child, x0, y0, xm, ym));
      if (child = node[1])
        quads.push(new quad_default(child, xm, y0, x1, ym));
      if (child = node[2])
        quads.push(new quad_default(child, x0, ym, xm, y1));
      if (child = node[3])
        quads.push(new quad_default(child, xm, ym, x1, y1));
    }
    next.push(q);
  }
  while (q = next.pop()) {
    callback(q.node, q.x0, q.y0, q.x1, q.y1);
  }
  return this;
}

// node_modules/d3-quadtree/src/x.js
function defaultX(d) {
  return d[0];
}
function x_default(_) {
  return arguments.length ? (this._x = _, this) : this._x;
}

// node_modules/d3-quadtree/src/y.js
function defaultY(d) {
  return d[1];
}
function y_default(_) {
  return arguments.length ? (this._y = _, this) : this._y;
}

// node_modules/d3-quadtree/src/quadtree.js
function quadtree(nodes, x3, y3) {
  var tree = new Quadtree(x3 == null ? defaultX : x3, y3 == null ? defaultY : y3, NaN, NaN, NaN, NaN);
  return nodes == null ? tree : tree.addAll(nodes);
}
function Quadtree(x3, y3, x0, y0, x1, y1) {
  this._x = x3;
  this._y = y3;
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  this._root = void 0;
}
function leaf_copy(leaf) {
  var copy = { data: leaf.data }, next = copy;
  while (leaf = leaf.next)
    next = next.next = { data: leaf.data };
  return copy;
}
var treeProto = quadtree.prototype = Quadtree.prototype;
treeProto.copy = function() {
  var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1), node = this._root, nodes, child;
  if (!node)
    return copy;
  if (!node.length)
    return copy._root = leaf_copy(node), copy;
  nodes = [{ source: node, target: copy._root = new Array(4) }];
  while (node = nodes.pop()) {
    for (var i2 = 0; i2 < 4; ++i2) {
      if (child = node.source[i2]) {
        if (child.length)
          nodes.push({ source: child, target: node.target[i2] = new Array(4) });
        else
          node.target[i2] = leaf_copy(child);
      }
    }
  }
  return copy;
};
treeProto.add = add_default;
treeProto.addAll = addAll;
treeProto.cover = cover_default;
treeProto.data = data_default2;
treeProto.extent = extent_default;
treeProto.find = find_default;
treeProto.remove = remove_default3;
treeProto.removeAll = removeAll;
treeProto.root = root_default;
treeProto.size = size_default2;
treeProto.visit = visit_default;
treeProto.visitAfter = visitAfter_default;
treeProto.x = x_default;
treeProto.y = y_default;

// node_modules/d3-force/src/constant.js
function constant_default5(x3) {
  return function() {
    return x3;
  };
}

// node_modules/d3-force/src/jiggle.js
function jiggle_default(random) {
  return (random() - 0.5) * 1e-6;
}

// node_modules/d3-force/src/collide.js
function x(d) {
  return d.x + d.vx;
}
function y(d) {
  return d.y + d.vy;
}
function collide_default(radius) {
  var nodes, radii, random, strength = 1, iterations = 1;
  if (typeof radius !== "function")
    radius = constant_default5(radius == null ? 1 : +radius);
  function force() {
    var i2, n = nodes.length, tree, node, xi, yi, ri, ri2;
    for (var k = 0; k < iterations; ++k) {
      tree = quadtree(nodes, x, y).visitAfter(prepare);
      for (i2 = 0; i2 < n; ++i2) {
        node = nodes[i2];
        ri = radii[node.index], ri2 = ri * ri;
        xi = node.x + node.vx;
        yi = node.y + node.vy;
        tree.visit(apply);
      }
    }
    function apply(quad, x0, y0, x1, y1) {
      var data = quad.data, rj = quad.r, r = ri + rj;
      if (data) {
        if (data.index > node.index) {
          var x3 = xi - data.x - data.vx, y3 = yi - data.y - data.vy, l = x3 * x3 + y3 * y3;
          if (l < r * r) {
            if (x3 === 0)
              x3 = jiggle_default(random), l += x3 * x3;
            if (y3 === 0)
              y3 = jiggle_default(random), l += y3 * y3;
            l = (r - (l = Math.sqrt(l))) / l * strength;
            node.vx += (x3 *= l) * (r = (rj *= rj) / (ri2 + rj));
            node.vy += (y3 *= l) * r;
            data.vx -= x3 * (r = 1 - r);
            data.vy -= y3 * r;
          }
        }
        return;
      }
      return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
    }
  }
  function prepare(quad) {
    if (quad.data)
      return quad.r = radii[quad.data.index];
    for (var i2 = quad.r = 0; i2 < 4; ++i2) {
      if (quad[i2] && quad[i2].r > quad.r) {
        quad.r = quad[i2].r;
      }
    }
  }
  function initialize() {
    if (!nodes)
      return;
    var i2, n = nodes.length, node;
    radii = new Array(n);
    for (i2 = 0; i2 < n; ++i2)
      node = nodes[i2], radii[node.index] = +radius(node, i2, nodes);
  }
  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };
  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };
  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };
  force.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant_default5(+_), initialize(), force) : radius;
  };
  return force;
}

// node_modules/d3-force/src/link.js
function index(d) {
  return d.index;
}
function find2(nodeById, nodeId) {
  var node = nodeById.get(nodeId);
  if (!node)
    throw new Error("node not found: " + nodeId);
  return node;
}
function link_default(links) {
  var id2 = index, strength = defaultStrength, strengths, distance = constant_default5(30), distances, nodes, count, bias, random, iterations = 1;
  if (links == null)
    links = [];
  function defaultStrength(link) {
    return 1 / Math.min(count[link.source.index], count[link.target.index]);
  }
  function force(alpha) {
    for (var k = 0, n = links.length; k < iterations; ++k) {
      for (var i2 = 0, link, source, target, x3, y3, l, b; i2 < n; ++i2) {
        link = links[i2], source = link.source, target = link.target;
        x3 = target.x + target.vx - source.x - source.vx || jiggle_default(random);
        y3 = target.y + target.vy - source.y - source.vy || jiggle_default(random);
        l = Math.sqrt(x3 * x3 + y3 * y3);
        l = (l - distances[i2]) / l * alpha * strengths[i2];
        x3 *= l, y3 *= l;
        target.vx -= x3 * (b = bias[i2]);
        target.vy -= y3 * b;
        source.vx += x3 * (b = 1 - b);
        source.vy += y3 * b;
      }
    }
  }
  function initialize() {
    if (!nodes)
      return;
    var i2, n = nodes.length, m2 = links.length, nodeById = new Map(nodes.map((d, i3) => [id2(d, i3, nodes), d])), link;
    for (i2 = 0, count = new Array(n); i2 < m2; ++i2) {
      link = links[i2], link.index = i2;
      if (typeof link.source !== "object")
        link.source = find2(nodeById, link.source);
      if (typeof link.target !== "object")
        link.target = find2(nodeById, link.target);
      count[link.source.index] = (count[link.source.index] || 0) + 1;
      count[link.target.index] = (count[link.target.index] || 0) + 1;
    }
    for (i2 = 0, bias = new Array(m2); i2 < m2; ++i2) {
      link = links[i2], bias[i2] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
    }
    strengths = new Array(m2), initializeStrength();
    distances = new Array(m2), initializeDistance();
  }
  function initializeStrength() {
    if (!nodes)
      return;
    for (var i2 = 0, n = links.length; i2 < n; ++i2) {
      strengths[i2] = +strength(links[i2], i2, links);
    }
  }
  function initializeDistance() {
    if (!nodes)
      return;
    for (var i2 = 0, n = links.length; i2 < n; ++i2) {
      distances[i2] = +distance(links[i2], i2, links);
    }
  }
  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };
  force.links = function(_) {
    return arguments.length ? (links = _, initialize(), force) : links;
  };
  force.id = function(_) {
    return arguments.length ? (id2 = _, force) : id2;
  };
  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default5(+_), initializeStrength(), force) : strength;
  };
  force.distance = function(_) {
    return arguments.length ? (distance = typeof _ === "function" ? _ : constant_default5(+_), initializeDistance(), force) : distance;
  };
  return force;
}

// node_modules/d3-force/src/lcg.js
var a = 1664525;
var c = 1013904223;
var m = 4294967296;
function lcg_default() {
  let s = 1;
  return () => (s = (a * s + c) % m) / m;
}

// node_modules/d3-force/src/simulation.js
function x2(d) {
  return d.x;
}
function y2(d) {
  return d.y;
}
var initialRadius = 10;
var initialAngle = Math.PI * (3 - Math.sqrt(5));
function simulation_default(nodes) {
  var simulation, alpha = 1, alphaMin = 1e-3, alphaDecay = 1 - Math.pow(alphaMin, 1 / 300), alphaTarget = 0, velocityDecay = 0.6, forces = /* @__PURE__ */ new Map(), stepper = timer(step), event = dispatch_default("tick", "end"), random = lcg_default();
  if (nodes == null)
    nodes = [];
  function step() {
    tick();
    event.call("tick", simulation);
    if (alpha < alphaMin) {
      stepper.stop();
      event.call("end", simulation);
    }
  }
  function tick(iterations) {
    var i2, n = nodes.length, node;
    if (iterations === void 0)
      iterations = 1;
    for (var k = 0; k < iterations; ++k) {
      alpha += (alphaTarget - alpha) * alphaDecay;
      forces.forEach(function(force) {
        force(alpha);
      });
      for (i2 = 0; i2 < n; ++i2) {
        node = nodes[i2];
        if (node.fx == null)
          node.x += node.vx *= velocityDecay;
        else
          node.x = node.fx, node.vx = 0;
        if (node.fy == null)
          node.y += node.vy *= velocityDecay;
        else
          node.y = node.fy, node.vy = 0;
      }
    }
    return simulation;
  }
  function initializeNodes() {
    for (var i2 = 0, n = nodes.length, node; i2 < n; ++i2) {
      node = nodes[i2], node.index = i2;
      if (node.fx != null)
        node.x = node.fx;
      if (node.fy != null)
        node.y = node.fy;
      if (isNaN(node.x) || isNaN(node.y)) {
        var radius = initialRadius * Math.sqrt(0.5 + i2), angle = i2 * initialAngle;
        node.x = radius * Math.cos(angle);
        node.y = radius * Math.sin(angle);
      }
      if (isNaN(node.vx) || isNaN(node.vy)) {
        node.vx = node.vy = 0;
      }
    }
  }
  function initializeForce(force) {
    if (force.initialize)
      force.initialize(nodes, random);
    return force;
  }
  initializeNodes();
  return simulation = {
    tick,
    restart: function() {
      return stepper.restart(step), simulation;
    },
    stop: function() {
      return stepper.stop(), simulation;
    },
    nodes: function(_) {
      return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation) : nodes;
    },
    alpha: function(_) {
      return arguments.length ? (alpha = +_, simulation) : alpha;
    },
    alphaMin: function(_) {
      return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
    },
    alphaDecay: function(_) {
      return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
    },
    alphaTarget: function(_) {
      return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
    },
    velocityDecay: function(_) {
      return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
    },
    randomSource: function(_) {
      return arguments.length ? (random = _, forces.forEach(initializeForce), simulation) : random;
    },
    force: function(name, _) {
      return arguments.length > 1 ? (_ == null ? forces.delete(name) : forces.set(name, initializeForce(_)), simulation) : forces.get(name);
    },
    find: function(x3, y3, radius) {
      var i2 = 0, n = nodes.length, dx, dy, d2, node, closest;
      if (radius == null)
        radius = Infinity;
      else
        radius *= radius;
      for (i2 = 0; i2 < n; ++i2) {
        node = nodes[i2];
        dx = x3 - node.x;
        dy = y3 - node.y;
        d2 = dx * dx + dy * dy;
        if (d2 < radius)
          closest = node, radius = d2;
      }
      return closest;
    },
    on: function(name, _) {
      return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
    }
  };
}

// node_modules/d3-force/src/manyBody.js
function manyBody_default() {
  var nodes, node, random, alpha, strength = constant_default5(-30), strengths, distanceMin2 = 1, distanceMax2 = Infinity, theta2 = 0.81;
  function force(_) {
    var i2, n = nodes.length, tree = quadtree(nodes, x2, y2).visitAfter(accumulate);
    for (alpha = _, i2 = 0; i2 < n; ++i2)
      node = nodes[i2], tree.visit(apply);
  }
  function initialize() {
    if (!nodes)
      return;
    var i2, n = nodes.length, node2;
    strengths = new Array(n);
    for (i2 = 0; i2 < n; ++i2)
      node2 = nodes[i2], strengths[node2.index] = +strength(node2, i2, nodes);
  }
  function accumulate(quad) {
    var strength2 = 0, q, c2, weight = 0, x3, y3, i2;
    if (quad.length) {
      for (x3 = y3 = i2 = 0; i2 < 4; ++i2) {
        if ((q = quad[i2]) && (c2 = Math.abs(q.value))) {
          strength2 += q.value, weight += c2, x3 += c2 * q.x, y3 += c2 * q.y;
        }
      }
      quad.x = x3 / weight;
      quad.y = y3 / weight;
    } else {
      q = quad;
      q.x = q.data.x;
      q.y = q.data.y;
      do
        strength2 += strengths[q.data.index];
      while (q = q.next);
    }
    quad.value = strength2;
  }
  function apply(quad, x1, _, x22) {
    if (!quad.value)
      return true;
    var x3 = quad.x - node.x, y3 = quad.y - node.y, w = x22 - x1, l = x3 * x3 + y3 * y3;
    if (w * w / theta2 < l) {
      if (l < distanceMax2) {
        if (x3 === 0)
          x3 = jiggle_default(random), l += x3 * x3;
        if (y3 === 0)
          y3 = jiggle_default(random), l += y3 * y3;
        if (l < distanceMin2)
          l = Math.sqrt(distanceMin2 * l);
        node.vx += x3 * quad.value * alpha / l;
        node.vy += y3 * quad.value * alpha / l;
      }
      return true;
    } else if (quad.length || l >= distanceMax2)
      return;
    if (quad.data !== node || quad.next) {
      if (x3 === 0)
        x3 = jiggle_default(random), l += x3 * x3;
      if (y3 === 0)
        y3 = jiggle_default(random), l += y3 * y3;
      if (l < distanceMin2)
        l = Math.sqrt(distanceMin2 * l);
    }
    do
      if (quad.data !== node) {
        w = strengths[quad.data.index] * alpha / l;
        node.vx += x3 * w;
        node.vy += y3 * w;
      }
    while (quad = quad.next);
  }
  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default5(+_), initialize(), force) : strength;
  };
  force.distanceMin = function(_) {
    return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
  };
  force.distanceMax = function(_) {
    return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
  };
  force.theta = function(_) {
    return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
  };
  return force;
}

// node_modules/d3-force/src/x.js
function x_default2(x3) {
  var strength = constant_default5(0.1), nodes, strengths, xz;
  if (typeof x3 !== "function")
    x3 = constant_default5(x3 == null ? 0 : +x3);
  function force(alpha) {
    for (var i2 = 0, n = nodes.length, node; i2 < n; ++i2) {
      node = nodes[i2], node.vx += (xz[i2] - node.x) * strengths[i2] * alpha;
    }
  }
  function initialize() {
    if (!nodes)
      return;
    var i2, n = nodes.length;
    strengths = new Array(n);
    xz = new Array(n);
    for (i2 = 0; i2 < n; ++i2) {
      strengths[i2] = isNaN(xz[i2] = +x3(nodes[i2], i2, nodes)) ? 0 : +strength(nodes[i2], i2, nodes);
    }
  }
  force.initialize = function(_) {
    nodes = _;
    initialize();
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default5(+_), initialize(), force) : strength;
  };
  force.x = function(_) {
    return arguments.length ? (x3 = typeof _ === "function" ? _ : constant_default5(+_), initialize(), force) : x3;
  };
  return force;
}

// node_modules/d3-force/src/y.js
function y_default2(y3) {
  var strength = constant_default5(0.1), nodes, strengths, yz;
  if (typeof y3 !== "function")
    y3 = constant_default5(y3 == null ? 0 : +y3);
  function force(alpha) {
    for (var i2 = 0, n = nodes.length, node; i2 < n; ++i2) {
      node = nodes[i2], node.vy += (yz[i2] - node.y) * strengths[i2] * alpha;
    }
  }
  function initialize() {
    if (!nodes)
      return;
    var i2, n = nodes.length;
    strengths = new Array(n);
    yz = new Array(n);
    for (i2 = 0; i2 < n; ++i2) {
      strengths[i2] = isNaN(yz[i2] = +y3(nodes[i2], i2, nodes)) ? 0 : +strength(nodes[i2], i2, nodes);
    }
  }
  force.initialize = function(_) {
    nodes = _;
    initialize();
  };
  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default5(+_), initialize(), force) : strength;
  };
  force.y = function(_) {
    return arguments.length ? (y3 = typeof _ === "function" ? _ : constant_default5(+_), initialize(), force) : y3;
  };
  return force;
}

// node_modules/d3-zoom/src/constant.js
var constant_default6 = (x3) => () => x3;

// node_modules/d3-zoom/src/event.js
function ZoomEvent(type2, {
  sourceEvent,
  target,
  transform: transform2,
  dispatch: dispatch2
}) {
  Object.defineProperties(this, {
    type: { value: type2, enumerable: true, configurable: true },
    sourceEvent: { value: sourceEvent, enumerable: true, configurable: true },
    target: { value: target, enumerable: true, configurable: true },
    transform: { value: transform2, enumerable: true, configurable: true },
    _: { value: dispatch2 }
  });
}

// node_modules/d3-zoom/src/transform.js
function Transform(k, x3, y3) {
  this.k = k;
  this.x = x3;
  this.y = y3;
}
Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x3, y3) {
    return x3 === 0 & y3 === 0 ? this : new Transform(this.k, this.x + this.k * x3, this.y + this.k * y3);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x3) {
    return x3 * this.k + this.x;
  },
  applyY: function(y3) {
    return y3 * this.k + this.y;
  },
  invert: function(location2) {
    return [(location2[0] - this.x) / this.k, (location2[1] - this.y) / this.k];
  },
  invertX: function(x3) {
    return (x3 - this.x) / this.k;
  },
  invertY: function(y3) {
    return (y3 - this.y) / this.k;
  },
  rescaleX: function(x3) {
    return x3.copy().domain(x3.range().map(this.invertX, this).map(x3.invert, x3));
  },
  rescaleY: function(y3) {
    return y3.copy().domain(y3.range().map(this.invertY, this).map(y3.invert, y3));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var identity2 = new Transform(1, 0, 0);
transform.prototype = Transform.prototype;
function transform(node) {
  while (!node.__zoom)
    if (!(node = node.parentNode))
      return identity2;
  return node.__zoom;
}

// node_modules/d3-zoom/src/noevent.js
function nopropagation3(event) {
  event.stopImmediatePropagation();
}
function noevent_default3(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

// node_modules/d3-zoom/src/zoom.js
function defaultFilter2(event) {
  return (!event.ctrlKey || event.type === "wheel") && !event.button;
}
function defaultExtent() {
  var e = this;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    if (e.hasAttribute("viewBox")) {
      e = e.viewBox.baseVal;
      return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
    }
    return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
  }
  return [[0, 0], [e.clientWidth, e.clientHeight]];
}
function defaultTransform() {
  return this.__zoom || identity2;
}
function defaultWheelDelta(event) {
  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 2e-3) * (event.ctrlKey ? 10 : 1);
}
function defaultTouchable2() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function defaultConstrain(transform2, extent, translateExtent) {
  var dx0 = transform2.invertX(extent[0][0]) - translateExtent[0][0], dx1 = transform2.invertX(extent[1][0]) - translateExtent[1][0], dy0 = transform2.invertY(extent[0][1]) - translateExtent[0][1], dy1 = transform2.invertY(extent[1][1]) - translateExtent[1][1];
  return transform2.translate(
    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
  );
}
function zoom_default2() {
  var filter2 = defaultFilter2, extent = defaultExtent, constrain = defaultConstrain, wheelDelta = defaultWheelDelta, touchable = defaultTouchable2, scaleExtent = [0, Infinity], translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]], duration = 250, interpolate = zoom_default, listeners = dispatch_default("start", "zoom", "end"), touchstarting, touchfirst, touchending, touchDelay = 500, wheelDelay = 150, clickDistance2 = 0, tapDistance = 10;
  function zoom(selection2) {
    selection2.property("__zoom", defaultTransform).on("wheel.zoom", wheeled, { passive: false }).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  zoom.transform = function(collection, transform2, point, event) {
    var selection2 = collection.selection ? collection.selection() : collection;
    selection2.property("__zoom", defaultTransform);
    if (collection !== selection2) {
      schedule(collection, transform2, point, event);
    } else {
      selection2.interrupt().each(function() {
        gesture(this, arguments).event(event).start().zoom(null, typeof transform2 === "function" ? transform2.apply(this, arguments) : transform2).end();
      });
    }
  };
  zoom.scaleBy = function(selection2, k, p, event) {
    zoom.scaleTo(selection2, function() {
      var k0 = this.__zoom.k, k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return k0 * k1;
    }, p, event);
  };
  zoom.scaleTo = function(selection2, k, p, event) {
    zoom.transform(selection2, function() {
      var e = extent.apply(this, arguments), t0 = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p, p1 = t0.invert(p0), k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
    }, p, event);
  };
  zoom.translateBy = function(selection2, x3, y3, event) {
    zoom.transform(selection2, function() {
      return constrain(this.__zoom.translate(
        typeof x3 === "function" ? x3.apply(this, arguments) : x3,
        typeof y3 === "function" ? y3.apply(this, arguments) : y3
      ), extent.apply(this, arguments), translateExtent);
    }, null, event);
  };
  zoom.translateTo = function(selection2, x3, y3, p, event) {
    zoom.transform(selection2, function() {
      var e = extent.apply(this, arguments), t = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
      return constrain(identity2.translate(p0[0], p0[1]).scale(t.k).translate(
        typeof x3 === "function" ? -x3.apply(this, arguments) : -x3,
        typeof y3 === "function" ? -y3.apply(this, arguments) : -y3
      ), e, translateExtent);
    }, p, event);
  };
  function scale(transform2, k) {
    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
    return k === transform2.k ? transform2 : new Transform(k, transform2.x, transform2.y);
  }
  function translate(transform2, p0, p1) {
    var x3 = p0[0] - p1[0] * transform2.k, y3 = p0[1] - p1[1] * transform2.k;
    return x3 === transform2.x && y3 === transform2.y ? transform2 : new Transform(transform2.k, x3, y3);
  }
  function centroid(extent2) {
    return [(+extent2[0][0] + +extent2[1][0]) / 2, (+extent2[0][1] + +extent2[1][1]) / 2];
  }
  function schedule(transition2, transform2, point, event) {
    transition2.on("start.zoom", function() {
      gesture(this, arguments).event(event).start();
    }).on("interrupt.zoom end.zoom", function() {
      gesture(this, arguments).event(event).end();
    }).tween("zoom", function() {
      var that = this, args = arguments, g = gesture(that, args).event(event), e = extent.apply(that, args), p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point, w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]), a2 = that.__zoom, b = typeof transform2 === "function" ? transform2.apply(that, args) : transform2, i2 = interpolate(a2.invert(p).concat(w / a2.k), b.invert(p).concat(w / b.k));
      return function(t) {
        if (t === 1)
          t = b;
        else {
          var l = i2(t), k = w / l[2];
          t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k);
        }
        g.zoom(null, t);
      };
    });
  }
  function gesture(that, args, clean) {
    return !clean && that.__zooming || new Gesture(that, args);
  }
  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.active = 0;
    this.sourceEvent = null;
    this.extent = extent.apply(that, args);
    this.taps = 0;
  }
  Gesture.prototype = {
    event: function(event) {
      if (event)
        this.sourceEvent = event;
      return this;
    },
    start: function() {
      if (++this.active === 1) {
        this.that.__zooming = this;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform2) {
      if (this.mouse && key !== "mouse")
        this.mouse[1] = transform2.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch")
        this.touch0[1] = transform2.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch")
        this.touch1[1] = transform2.invert(this.touch1[0]);
      this.that.__zoom = transform2;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        delete this.that.__zooming;
        this.emit("end");
      }
      return this;
    },
    emit: function(type2) {
      var d = select_default2(this.that).datum();
      listeners.call(
        type2,
        this.that,
        new ZoomEvent(type2, {
          sourceEvent: this.sourceEvent,
          target: zoom,
          type: type2,
          transform: this.that.__zoom,
          dispatch: listeners
        }),
        d
      );
    }
  };
  function wheeled(event, ...args) {
    if (!filter2.apply(this, arguments))
      return;
    var g = gesture(this, args).event(event), t = this.__zoom, k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))), p = pointer_default(event);
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert(g.mouse[0] = p);
      }
      clearTimeout(g.wheel);
    } else if (t.k === k)
      return;
    else {
      g.mouse = [p, t.invert(p)];
      interrupt_default(this);
      g.start();
    }
    noevent_default3(event);
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));
    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }
  function mousedowned(event, ...args) {
    if (touchending || !filter2.apply(this, arguments))
      return;
    var currentTarget = event.currentTarget, g = gesture(this, args, true).event(event), v = select_default2(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true), p = pointer_default(event, currentTarget), x0 = event.clientX, y0 = event.clientY;
    nodrag_default(event.view);
    nopropagation3(event);
    g.mouse = [p, this.__zoom.invert(p)];
    interrupt_default(this);
    g.start();
    function mousemoved(event2) {
      noevent_default3(event2);
      if (!g.moved) {
        var dx = event2.clientX - x0, dy = event2.clientY - y0;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.event(event2).zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer_default(event2, currentTarget), g.mouse[1]), g.extent, translateExtent));
    }
    function mouseupped(event2) {
      v.on("mousemove.zoom mouseup.zoom", null);
      yesdrag(event2.view, g.moved);
      noevent_default3(event2);
      g.event(event2).end();
    }
  }
  function dblclicked(event, ...args) {
    if (!filter2.apply(this, arguments))
      return;
    var t0 = this.__zoom, p0 = pointer_default(event.changedTouches ? event.changedTouches[0] : event, this), p1 = t0.invert(p0), k1 = t0.k * (event.shiftKey ? 0.5 : 2), t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);
    noevent_default3(event);
    if (duration > 0)
      select_default2(this).transition().duration(duration).call(schedule, t1, p0, event);
    else
      select_default2(this).call(zoom.transform, t1, p0, event);
  }
  function touchstarted(event, ...args) {
    if (!filter2.apply(this, arguments))
      return;
    var touches = event.touches, n = touches.length, g = gesture(this, args, event.changedTouches.length === n).event(event), started, i2, t, p;
    nopropagation3(event);
    for (i2 = 0; i2 < n; ++i2) {
      t = touches[i2], p = pointer_default(t, this);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0)
        g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
      else if (!g.touch1 && g.touch0[2] !== p[2])
        g.touch1 = p, g.taps = 0;
    }
    if (touchstarting)
      touchstarting = clearTimeout(touchstarting);
    if (started) {
      if (g.taps < 2)
        touchfirst = p[0], touchstarting = setTimeout(function() {
          touchstarting = null;
        }, touchDelay);
      interrupt_default(this);
      g.start();
    }
  }
  function touchmoved(event, ...args) {
    if (!this.__zooming)
      return;
    var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i2, t, p, l;
    noevent_default3(event);
    for (i2 = 0; i2 < n; ++i2) {
      t = touches[i2], p = pointer_default(t, this);
      if (g.touch0 && g.touch0[2] === t.identifier)
        g.touch0[0] = p;
      else if (g.touch1 && g.touch1[2] === t.identifier)
        g.touch1[0] = p;
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p0 = g.touch0[0], l0 = g.touch0[1], p1 = g.touch1[0], l1 = g.touch1[1], dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp, dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    } else if (g.touch0)
      p = g.touch0[0], l = g.touch0[1];
    else
      return;
    g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
  }
  function touchended(event, ...args) {
    if (!this.__zooming)
      return;
    var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i2, t;
    nopropagation3(event);
    if (touchending)
      clearTimeout(touchending);
    touchending = setTimeout(function() {
      touchending = null;
    }, touchDelay);
    for (i2 = 0; i2 < n; ++i2) {
      t = touches[i2];
      if (g.touch0 && g.touch0[2] === t.identifier)
        delete g.touch0;
      else if (g.touch1 && g.touch1[2] === t.identifier)
        delete g.touch1;
    }
    if (g.touch1 && !g.touch0)
      g.touch0 = g.touch1, delete g.touch1;
    if (g.touch0)
      g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    else {
      g.end();
      if (g.taps === 2) {
        t = pointer_default(t, this);
        if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
          var p = select_default2(this).on("dblclick.zoom");
          if (p)
            p.apply(this, arguments);
        }
      }
    }
  }
  zoom.wheelDelta = function(_) {
    return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant_default6(+_), zoom) : wheelDelta;
  };
  zoom.filter = function(_) {
    return arguments.length ? (filter2 = typeof _ === "function" ? _ : constant_default6(!!_), zoom) : filter2;
  };
  zoom.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant_default6(!!_), zoom) : touchable;
  };
  zoom.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : constant_default6([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
  };
  zoom.scaleExtent = function(_) {
    return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
  };
  zoom.translateExtent = function(_) {
    return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };
  zoom.constrain = function(_) {
    return arguments.length ? (constrain = _, zoom) : constrain;
  };
  zoom.duration = function(_) {
    return arguments.length ? (duration = +_, zoom) : duration;
  };
  zoom.interpolate = function(_) {
    return arguments.length ? (interpolate = _, zoom) : interpolate;
  };
  zoom.on = function() {
    var value2 = listeners.on.apply(listeners, arguments);
    return value2 === listeners ? zoom : value2;
  };
  zoom.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
  };
  zoom.tapDistance = function(_) {
    return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
  };
  return zoom;
}

// src/app/shared/osint-graph/osint-graph.component.ts
var _c03 = ["svgContainer"];
function OsintGraphComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "span");
    \u0275\u0275text(2, "\u2B21");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Graph loading\u2026");
    \u0275\u0275elementEnd()();
  }
}
var NODE_STYLES = {
  ip: { fill: "#0d2a4d", stroke: "#00d4ff", r: 32, icon: "\u2B21" },
  vt: { fill: "#1a1a2e", stroke: "#e040fb", r: 26, icon: "\u{1F6E1}" },
  engine: { fill: "#1a0a0a", stroke: "#ef4444", r: 18, icon: "\u26A0" },
  shodan: { fill: "#0a1a1a", stroke: "#00bcd4", r: 26, icon: "\u{1F4E1}" },
  asn: { fill: "#0a1a0a", stroke: "#4caf50", r: 20, icon: "\u{1F310}" },
  port: { fill: "#1a1a0a", stroke: "#ff9800", r: 18, icon: "\u{1F50C}" }
};
var MITIGATED_IP_STYLE = {
  fill: "#0a2a0a",
  stroke: "#22c55e",
  glow: "rgba(34,197,94,0.5)"
};
var EDGE_COLORS = {
  analyzed_by: "#9c27b0",
  detected_by: "#ef4444",
  scanned_by: "#00bcd4",
  belongs_to: "#4caf50",
  exposes: "#ff9800"
};
var OsintGraphComponent = class _OsintGraphComponent {
  constructor(zone) {
    this.zone = zone;
    this.mitigated = false;
    this.nodeSelected = new EventEmitter();
    this.renderScheduled = false;
  }
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.graph?.nodes?.length) {
          this.scheduleRender();
        }
      });
      this.resizeObserver.observe(this.svgRef.nativeElement.parentElement);
    });
  }
  ngOnChanges(changes) {
    if (changes["graph"] && this.graph?.nodes?.length) {
      this.zone.runOutsideAngular(() => this.scheduleRender());
    }
    if (changes["mitigated"] && !changes["graph"] && this.svg) {
      this.zone.runOutsideAngular(() => this.applyMitigatedStyle());
    }
  }
  scheduleRender() {
    if (this.renderScheduled)
      return;
    this.renderScheduled = true;
    requestAnimationFrame(() => {
      this.renderScheduled = false;
      this.render();
    });
  }
  // ── Mitigated recolor ─────────────────────────────────────────────────
  applyMitigatedStyle() {
    if (!this.svg)
      return;
    this.svg.selectAll(".graph-node").filter((d) => d.type === "ip").each(function() {
      const group = select_default2(this);
      group.selectAll("circle").transition().duration(600).attr("fill", (_d, i2) => i2 === 0 ? "none" : MITIGATED_IP_STYLE.fill).attr("stroke", MITIGATED_IP_STYLE.stroke);
      group.selectAll("text").filter((_d, i2) => i2 === 0).transition().duration(400).text("\u{1F512}");
      group.selectAll("text").filter((_d, i2) => i2 === 1).attr("fill", MITIGATED_IP_STYLE.stroke);
      group.insert("circle", ":first-child").attr("r", 40).attr("fill", "none").attr("stroke", MITIGATED_IP_STYLE.glow).attr("stroke-width", 8).attr("opacity", 0.8).transition().duration(1200).attr("r", 56).attr("opacity", 0).remove();
    });
  }
  // ── D3 render ─────────────────────────────────────────────────────────
  render() {
    const container = this.svgRef.nativeElement.parentElement;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;
    if (width < 50 || height < 50)
      return;
    if (this.sim)
      this.sim.stop();
    const el = this.svgRef.nativeElement;
    select_default2(el).selectAll("*").remove();
    const nodes = this.graph.nodes.map((n) => __spreadValues({}, n));
    const edges = this.graph.edges.map((e) => __spreadValues({}, e));
    this.svg = select_default2(el).attr("width", width).attr("height", height).style("width", "100%").style("height", "100%");
    const defs = this.svg.append("defs");
    const glowFilter = defs.append("filter").attr("id", "ip-glow").attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
    glowFilter.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "blur");
    const feMerge = glowFilter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "blur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");
    Object.entries(EDGE_COLORS).forEach(([rel, color2]) => {
      defs.append("marker").attr("id", `arrow-${rel}`).attr("viewBox", "0 -4 8 8").attr("refX", 22).attr("markerWidth", 6).attr("markerHeight", 6).attr("orient", "auto").append("path").attr("d", "M0,-4L8,0L0,4").attr("fill", color2);
    });
    const gridSpacing = 40;
    const grid = defs.append("pattern").attr("id", "grid").attr("width", gridSpacing).attr("height", gridSpacing).attr("patternUnits", "userSpaceOnUse");
    grid.append("path").attr("d", `M ${gridSpacing} 0 L 0 0 0 ${gridSpacing}`).attr("fill", "none").attr("stroke", "rgba(0,212,255,0.04)").attr("stroke-width", 0.5);
    this.svg.append("rect").attr("width", width).attr("height", height).attr("fill", "url(#grid)");
    const root2 = this.svg.append("g");
    this.svg.call(zoom_default2().scaleExtent([0.2, 4]).on("zoom", (event) => root2.attr("transform", event.transform)));
    this.sim = simulation_default(nodes).force("link", link_default(edges).id((d) => d.id).distance((e) => {
      const s = e.source.type;
      const t = e.target.type;
      if (s === "ip" || t === "ip")
        return Math.min(width, height) * 0.22;
      return Math.min(width, height) * 0.15;
    }).strength(0.5)).force("charge", manyBody_default().strength(-500)).force("center", center_default(width / 2, height / 2).strength(0.08)).force("collide", collide_default().radius((d) => (NODE_STYLES[d.type]?.r ?? 18) + 20)).force("x", x_default2(width / 2).strength(0.04)).force("y", y_default2(height / 2).strength(0.04)).alphaDecay(0.025);
    const link = root2.append("g").attr("class", "edges").selectAll("line").data(edges).join("line").attr("stroke", (e) => EDGE_COLORS[e.label] ?? "#334").attr("stroke-width", 1.5).attr("stroke-opacity", 0.5).attr("marker-end", (e) => `url(#arrow-${e.label})`);
    const edgeLabel = root2.append("g").attr("class", "edge-labels").selectAll("text").data(edges).join("text").attr("font-size", 9).attr("font-family", "var(--font-mono)").attr("fill", "rgba(100,150,200,0.5)").attr("text-anchor", "middle").text((e) => e.label);
    const node = root2.append("g").attr("class", "nodes").selectAll("g").data(nodes).join("g").attr("class", "graph-node").style("cursor", "pointer").call(this.drag()).on("click", (_event, d) => {
      this.zone.run(() => this.nodeSelected.emit(d));
      selectAll_default2(".graph-node circle:nth-child(2)").attr("stroke-width", 1.5);
      select_default2(_event.currentTarget).select("circle:nth-child(2)").attr("stroke-width", 3.5);
    });
    const getFill = (d) => d.type === "ip" && this.mitigated ? MITIGATED_IP_STYLE.fill : NODE_STYLES[d.type]?.fill ?? "#111";
    const getStroke = (d) => d.type === "ip" && this.mitigated ? MITIGATED_IP_STYLE.stroke : NODE_STYLES[d.type]?.stroke ?? "#334";
    const getIcon = (d) => d.type === "ip" && this.mitigated ? "\u{1F512}" : NODE_STYLES[d.type]?.icon ?? "?";
    node.append("circle").attr("r", (d) => (NODE_STYLES[d.type]?.r ?? 18) + 10).attr("fill", "none").attr("stroke", getStroke).attr("stroke-width", 1).attr("stroke-opacity", 0.2);
    node.append("circle").attr("r", (d) => NODE_STYLES[d.type]?.r ?? 18).attr("fill", getFill).attr("stroke", getStroke).attr("stroke-width", 1.5).attr("filter", (d) => d.type === "ip" ? "url(#ip-glow)" : null);
    node.append("text").attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("font-size", (d) => d.type === "ip" ? 18 : 13).attr("pointer-events", "none").text(getIcon);
    node.append("text").attr("text-anchor", "middle").attr("y", (d) => (NODE_STYLES[d.type]?.r ?? 18) + 16).attr("font-size", (d) => d.type === "ip" ? 13 : 10).attr("font-family", "var(--font-mono)").attr("font-weight", (d) => d.type === "ip" ? "700" : "400").attr("fill", getStroke).attr("pointer-events", "none").text((d) => d.label.length > 20 ? d.label.slice(0, 18) + "\u2026" : d.label);
    const tooltip = select_default2("body").select(".d3-tooltip");
    node.on("mouseenter", (_e, d) => {
      const details = Object.entries(d.data || {}).filter(([, v]) => v !== null && v !== void 0 && v !== "").slice(0, 5).map(([k, v]) => `<div style="color:#7ba7cc;font-size:10px">${k}: <span style="color:#e2f0ff">${v}</span></div>`).join("");
      tooltip.style("display", "block").html(`<div style="font-weight:700;color:var(--accent-cyan);margin-bottom:4px">${d.type.toUpperCase()}</div><div style="color:#e2f0ff;margin-bottom:4px">${d.label}</div>${details}`);
    }).on("mousemove", (event) => tooltip.style("left", event.pageX + 16 + "px").style("top", event.pageY - 32 + "px")).on("mouseleave", () => tooltip.style("display", "none"));
    this.sim.on("tick", () => {
      link.attr("x1", (e) => e.source.x).attr("y1", (e) => e.source.y).attr("x2", (e) => e.target.x).attr("y2", (e) => e.target.y);
      edgeLabel.attr("x", (e) => (e.source.x + e.target.x) / 2).attr("y", (e) => (e.source.y + e.target.y) / 2 - 5);
      node.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });
    if (this.mitigated) {
      setTimeout(() => this.applyMitigatedStyle(), 800);
    }
  }
  drag() {
    return drag_default().on("start", (event, d) => {
      if (!event.active)
        this.sim.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }).on("drag", (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    }).on("end", (event, d) => {
      if (!event.active)
        this.sim.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    });
  }
  ngOnDestroy() {
    if (this.sim)
      this.sim.stop();
    if (this.resizeObserver)
      this.resizeObserver.disconnect();
  }
  static {
    this.\u0275fac = function OsintGraphComponent_Factory(t) {
      return new (t || _OsintGraphComponent)(\u0275\u0275directiveInject(NgZone));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OsintGraphComponent, selectors: [["app-osint-graph"]], viewQuery: function OsintGraphComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c03, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.svgRef = _t.first);
      }
    }, inputs: { graph: "graph", mitigated: "mitigated" }, outputs: { nodeSelected: "nodeSelected" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 4, vars: 1, consts: [["svgContainer", ""], [1, "graph-container"], [1, "graph-svg"], ["class", "graph-empty", 4, "ngIf"], [1, "graph-empty"]], template: function OsintGraphComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1);
        \u0275\u0275namespaceSVG();
        \u0275\u0275element(1, "svg", 2, 0);
        \u0275\u0275template(3, OsintGraphComponent_div_3_Template, 5, 0, "div", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", !(ctx.graph == null ? null : ctx.graph.nodes == null ? null : ctx.graph.nodes.length));
      }
    }, dependencies: [CommonModule, NgIf], styles: ["\n\n.graph-container[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  flex: 1;\n  min-height: 0;\n  background:\n    radial-gradient(\n      ellipse at 50% 40%,\n      #071525 0%,\n      #020810 70%);\n  overflow: hidden;\n}\n.graph-svg[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n[_nghost-%COMP%]     .graph-node {\n  transition: opacity .15s;\n}\n[_nghost-%COMP%]     .graph-node:hover circle:nth-child(2) {\n  filter: brightness(1.5);\n  stroke-width: 2.5 !important;\n}\n.graph-empty[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  color: var(--text-muted);\n  font-family: var(--font-mono);\n  font-size: 12px;\n  pointer-events: none;\n}\n.graph-empty[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 36px;\n  opacity: .25;\n}\n/*# sourceMappingURL=osint-graph.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OsintGraphComponent, { className: "OsintGraphComponent", filePath: "src\\app\\shared\\osint-graph\\osint-graph.component.ts", lineNumber: 43 });
})();

// src/app/shared/node-detail-card/node-detail-card.component.ts
function NodeDetailCardComponent_aside_0_div_8_tr_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 15);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 16);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r3.key);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.valueClass(row_r3));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r3.value);
  }
}
function NodeDetailCardComponent_aside_0_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 10);
    \u0275\u0275text(2, "PROPERTIES");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "table", 13)(4, "tbody");
    \u0275\u0275template(5, NodeDetailCardComponent_aside_0_div_8_tr_5_Template, 5, 4, "tr", 14);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r1.summaryRows);
  }
}
function NodeDetailCardComponent_aside_0_div_9_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cve_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cve_r4);
  }
}
function NodeDetailCardComponent_aside_0_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 10);
    \u0275\u0275text(2, "CVEs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 18);
    \u0275\u0275template(4, NodeDetailCardComponent_aside_0_div_9_span_4_Template, 2, 1, "span", 19);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.arrayEntries("cves"));
  }
}
function NodeDetailCardComponent_aside_0_div_10_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tag_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tag_r5);
  }
}
function NodeDetailCardComponent_aside_0_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 10);
    \u0275\u0275text(2, "TAGS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 18);
    \u0275\u0275template(4, NodeDetailCardComponent_aside_0_div_10_span_4_Template, 2, 1, "span", 21);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.arrayEntries("tags"));
  }
}
function NodeDetailCardComponent_aside_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "aside", 2)(1, "div", 3)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 5);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 6);
    \u0275\u0275listener("click", function NodeDetailCardComponent_aside_0_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closed.emit());
    });
    \u0275\u0275text(7, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, NodeDetailCardComponent_aside_0_div_8_Template, 6, 1, "div", 7)(9, NodeDetailCardComponent_aside_0_div_9_Template, 5, 1, "div", 8)(10, NodeDetailCardComponent_aside_0_div_10_Template, 5, 1, "div", 8);
    \u0275\u0275elementStart(11, "div", 9)(12, "div", 10);
    \u0275\u0275text(13, "RAW JSON");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "pre", 11);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.typeLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.node.label);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.summaryRows.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.arrayEntries("cves").length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.arrayEntries("tags").length);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.prettyJson);
  }
}
function NodeDetailCardComponent_aside_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "aside", 23)(1, "p");
    \u0275\u0275text(2, "Click a node in the graph to inspect its data.");
    \u0275\u0275elementEnd()();
  }
}
var NODE_LABELS = {
  ip: "\u2B21  IP Address",
  vt: "\u{1F6E1}  VirusTotal",
  engine: "\u26A0  AV Engine",
  shodan: "\u{1F4E1}  Shodan",
  asn: "\u{1F310}  ASN",
  port: "\u{1F50C}  Open Port"
};
var NodeDetailCardComponent = class _NodeDetailCardComponent {
  constructor() {
    this.closed = new EventEmitter();
    this.prettyJson = "";
    this.typeLabel = "";
    this.summaryRows = [];
  }
  ngOnChanges() {
    if (!this.node)
      return;
    this.typeLabel = NODE_LABELS[this.node.type] ?? this.node.type;
    this.prettyJson = JSON.stringify(this.node.data, null, 2);
    this.summaryRows = Object.entries(this.node.data).filter(([, v]) => v !== null && v !== void 0 && !Array.isArray(v) && typeof v !== "object").map(([key, value2]) => ({
      key,
      value: String(value2),
      highlight: key === "result" || key === "category" || key === "risk_level" || key === "risk_score" || key === "service" || key === "version"
    }));
  }
  /** Returns CSS class for a summary value cell based on its content. */
  valueClass(row) {
    if (row.key === "category" || row.key === "risk_level") {
      const v = row.value.toLowerCase();
      if (v === "malicious" || v === "critical")
        return "val-critical";
      if (v === "suspicious" || v === "high")
        return "val-high";
      if (v === "medium")
        return "val-medium";
      if (v === "low" || v === "harmless")
        return "val-low";
    }
    return "";
  }
  arrayEntries(key) {
    const v = this.node?.data?.[key];
    return Array.isArray(v) ? v.map(String) : [];
  }
  static {
    this.\u0275fac = function NodeDetailCardComponent_Factory(t) {
      return new (t || _NodeDetailCardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NodeDetailCardComponent, selectors: [["app-node-detail-card"]], inputs: { node: "node" }, outputs: { closed: "closed" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 2, vars: 2, consts: [["class", "detail-card", 4, "ngIf"], ["class", "detail-card detail-card--empty", 4, "ngIf"], [1, "detail-card"], [1, "card-header"], [1, "type-label"], [1, "node-label"], ["title", "Close", 1, "close-btn", 3, "click"], ["class", "summary-section", 4, "ngIf"], ["class", "array-section", 4, "ngIf"], [1, "json-section"], [1, "section-title"], [1, "json-pre"], [1, "summary-section"], [1, "prop-table"], [4, "ngFor", "ngForOf"], [1, "prop-key"], [1, "prop-val"], [1, "array-section"], [1, "tag-list"], ["class", "cve-tag", 4, "ngFor", "ngForOf"], [1, "cve-tag"], ["class", "tag", 4, "ngFor", "ngForOf"], [1, "tag"], [1, "detail-card", "detail-card--empty"]], template: function NodeDetailCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, NodeDetailCardComponent_aside_0_Template, 16, 6, "aside", 0)(1, NodeDetailCardComponent_aside_1_Template, 3, 0, "aside", 1);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.node);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.node);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf], styles: ["\n\n.detail-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  height: 100%;\n  overflow-y: auto;\n  background: var(--bg-secondary);\n  font-size: 12px;\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 14px;\n  border-bottom: 1px solid var(--border);\n  background: var(--bg-card);\n  flex-shrink: 0;\n  position: sticky;\n  top: 0;\n  z-index: 2;\n}\n.type-label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-family: var(--font-mono);\n  color: var(--text-muted);\n  text-transform: uppercase;\n  letter-spacing: .1em;\n  white-space: nowrap;\n}\n.node-label[_ngcontent-%COMP%] {\n  flex: 1;\n  font-family: var(--font-mono);\n  font-weight: 700;\n  color: var(--accent-cyan);\n  font-size: 13px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.close-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: 1px solid var(--border);\n  color: var(--text-muted);\n  border-radius: 3px;\n  width: 22px;\n  height: 22px;\n  cursor: pointer;\n  font-size: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: all .15s;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  border-color: #ef4444;\n  color: #ef4444;\n}\n.summary-section[_ngcontent-%COMP%], .array-section[_ngcontent-%COMP%], .json-section[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border-bottom: 1px solid rgba(26, 58, 92, .5);\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 9px;\n  letter-spacing: .12em;\n  font-family: var(--font-mono);\n  color: var(--text-muted);\n  text-transform: uppercase;\n  margin-bottom: 8px;\n}\n.prop-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.prop-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 3px 0;\n  vertical-align: top;\n}\n.prop-key[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  color: var(--text-muted);\n  font-size: 11px;\n  padding-right: 10px;\n  width: 40%;\n  white-space: nowrap;\n}\n.prop-val[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  color: var(--text-primary);\n  font-size: 11px;\n  word-break: break-all;\n}\n.val-critical[_ngcontent-%COMP%] {\n  color: #ef4444 !important;\n  font-weight: 700;\n}\n.val-high[_ngcontent-%COMP%] {\n  color: #f97316 !important;\n  font-weight: 700;\n}\n.val-medium[_ngcontent-%COMP%] {\n  color: #f59e0b !important;\n}\n.val-low[_ngcontent-%COMP%] {\n  color: #22c55e !important;\n}\n.tag-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n}\n.tag[_ngcontent-%COMP%] {\n  padding: 2px 7px;\n  font-size: 10px;\n  font-family: var(--font-mono);\n  border-radius: 3px;\n  background: rgba(0, 212, 255, .1);\n  border: 1px solid rgba(0, 212, 255, .2);\n  color: var(--accent-cyan);\n}\n.cve-tag[_ngcontent-%COMP%] {\n  padding: 2px 7px;\n  font-size: 10px;\n  font-family: var(--font-mono);\n  border-radius: 3px;\n  background: rgba(239, 68, 68, .1);\n  border: 1px solid rgba(239, 68, 68, .3);\n  color: #ef4444;\n}\n.json-pre[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 10px;\n  line-height: 1.55;\n  color: #6a9fd8;\n  background: var(--bg-primary);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-sm);\n  padding: 10px;\n  overflow-x: auto;\n  white-space: pre;\n  margin: 0;\n  max-height: 320px;\n  overflow-y: auto;\n}\n.detail-card--empty[_ngcontent-%COMP%] {\n  align-items: center;\n  justify-content: center;\n  color: var(--text-muted);\n  font-family: var(--font-mono);\n  font-size: 11px;\n  font-style: italic;\n}\n/*# sourceMappingURL=node-detail-card.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NodeDetailCardComponent, { className: "NodeDetailCardComponent", filePath: "src\\app\\shared\\node-detail-card\\node-detail-card.component.ts", lineNumber: 25 });
})();

// src/app/services/playbook.service.ts
var PlaybookService = class _PlaybookService {
  constructor(http, socketService) {
    this.http = http;
    this.socketService = socketService;
    this.BASE = "/api/v1/playbooks";
    this.blocking$ = new BehaviorSubject(false);
    this.blockError$ = new BehaviorSubject(null);
    this.mitigated$ = this.socketService.onThreatMitigated();
  }
  /**
   * Executes the Block-IP playbook.
   * Sends POST /api/v1/playbooks/block with the attacker IP.
   * The backend will update MongoDB and broadcast 'threat-mitigated' via
   * Socket.io — that event will flow through mitigated$ automatically.
   */
  blockIp(ip, threat_event_id) {
    this.blocking$.next(true);
    this.blockError$.next(null);
    const body = __spreadValues({ ip }, threat_event_id ? { threat_event_id } : {});
    return this.http.post(`${this.BASE}/block`, body).pipe(tap(() => this.blocking$.next(false)), catchError((err) => {
      const msg = err.error?.error ?? err.message ?? "Playbook execution failed";
      this.blockError$.next(msg);
      this.blocking$.next(false);
      return throwError(() => new Error(msg));
    }));
  }
  static {
    this.\u0275fac = function PlaybookService_Factory(t) {
      return new (t || _PlaybookService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(SocketService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PlaybookService, factory: _PlaybookService.\u0275fac, providedIn: "root" });
  }
};

// src/app/shared/execution-playbooks/execution-playbooks.component.ts
function ExecutionPlaybooksComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "span");
    \u0275\u0275text(2, "\u{1F512}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "IP BLOCKED & QUARANTINED");
    \u0275\u0275elementEnd()();
  }
}
function ExecutionPlaybooksComponent_span_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, " \u25B6 \xA0Execute ");
    \u0275\u0275elementEnd();
  }
}
function ExecutionPlaybooksComponent_span_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 22);
    \u0275\u0275element(1, "span", 23);
    \u0275\u0275text(2, " Running\u2026 ");
    \u0275\u0275elementEnd();
  }
}
function ExecutionPlaybooksComponent_span_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, " \u2714 \xA0Mitigated ");
    \u0275\u0275elementEnd();
  }
}
function ExecutionPlaybooksComponent_div_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "span");
    \u0275\u0275text(2, "\u26A0");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const err_r1 = ctx.ngIf;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", err_r1, " ");
  }
}
function ExecutionPlaybooksComponent_div_64_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "span", 30);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r2 = ctx.$implicit;
    \u0275\u0275classMap("log-" + entry_r2.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r2.time);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r2.message);
  }
}
function ExecutionPlaybooksComponent_div_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 26);
    \u0275\u0275text(2, "EXECUTION LOG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 27);
    \u0275\u0275template(4, ExecutionPlaybooksComponent_div_64_div_4_Template, 5, 4, "div", 28);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r2.log);
  }
}
var ExecutionPlaybooksComponent = class _ExecutionPlaybooksComponent {
  constructor(playbookService, cdr) {
    this.playbookService = playbookService;
    this.cdr = cdr;
    this.playbookExecuted = new EventEmitter();
    this.blocking$ = this.playbookService.blocking$;
    this.error$ = this.playbookService.blockError$;
    this.log = [];
    this.isMitigated = false;
    this.sub = new Subscription();
  }
  ngOnInit() {
    this.sub.add(this.playbookService.mitigated$.subscribe((evt) => {
      if (evt.ip === this.ip) {
        this.isMitigated = true;
        this.addLog(`\u2714 Block-IP playbook confirmed via Socket.io \u2014 ${evt.mitigated_count} event(s) mitigated`, "success");
        this.cdr.markForCheck();
      }
    }));
  }
  // ── Playbook execution ─────────────────────────────────────────────────
  executeBlockIp() {
    if (!this.ip || this.isMitigated)
      return;
    this.addLog(`\u25B6 Initiating Block-IP playbook for ${this.ip}\u2026`, "info");
    this.sub.add(this.playbookService.blockIp(this.ip).subscribe({
      next: (res) => {
        this.isMitigated = true;
        this.addLog(`\u2714 IP ${res.ip} blocked \u2014 ${res.mitigated_count} threat event(s) mitigated`, "success");
        this.playbookExecuted.emit({
          playbook: res.playbook,
          ip: res.ip,
          count: res.mitigated_count,
          timestamp: res.executed_at
        });
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.addLog(`\u2716 Playbook failed: ${err.message}`, "error");
        this.cdr.markForCheck();
      }
    }));
  }
  // ── Helpers ────────────────────────────────────────────────────────────
  addLog(message, type2) {
    const time = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-GB", { hour12: false });
    this.log = [{ time, message, type: type2 }, ...this.log].slice(0, 20);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  static {
    this.\u0275fac = function ExecutionPlaybooksComponent_Factory(t) {
      return new (t || _ExecutionPlaybooksComponent)(\u0275\u0275directiveInject(PlaybookService), \u0275\u0275directiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExecutionPlaybooksComponent, selectors: [["app-execution-playbooks"]], inputs: { ip: "ip" }, outputs: { playbookExecuted: "playbookExecuted" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 65, vars: 24, consts: [[1, "playbooks-panel"], [1, "panel-header"], [1, "panel-icon"], [1, "panel-title"], [1, "panel-ip"], ["class", "mitigated-banner", 4, "ngIf"], [1, "playbook-list"], [1, "playbook-card"], [1, "playbook-info"], [1, "playbook-name"], [1, "playbook-icon"], [1, "playbook-desc"], [1, "playbook-meta"], [1, "meta-tag"], [1, "execute-btn", 3, "click", "disabled"], [4, "ngIf"], ["class", "btn-spinner", 4, "ngIf"], [1, "playbook-card", "disabled"], ["disabled", "", 1, "execute-btn"], ["class", "error-alert", 4, "ngIf"], ["class", "exec-log", 4, "ngIf"], [1, "mitigated-banner"], [1, "btn-spinner"], [1, "spin-ring"], [1, "error-alert"], [1, "exec-log"], [1, "log-header"], [1, "log-body"], ["class", "log-entry", 3, "class", 4, "ngFor", "ngForOf"], [1, "log-entry"], [1, "log-time"], [1, "log-msg"]], template: function ExecutionPlaybooksComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "span", 2);
        \u0275\u0275text(3, "\u26A1");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "span", 3);
        \u0275\u0275text(5, "EXECUTION PLAYBOOKS");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "span", 4);
        \u0275\u0275text(7);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(8, ExecutionPlaybooksComponent_div_8_Template, 5, 0, "div", 5);
        \u0275\u0275elementStart(9, "div", 6)(10, "div", 7)(11, "div", 8)(12, "div", 9)(13, "span", 10);
        \u0275\u0275text(14, "\u{1F512}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(15, " Quarantine Asset / Block IP ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "p", 11);
        \u0275\u0275text(17, " Bulk-updates all Active threat events from this source IP to ");
        \u0275\u0275elementStart(18, "strong");
        \u0275\u0275text(19, "Mitigated");
        \u0275\u0275elementEnd();
        \u0275\u0275text(20, " in MongoDB and notifies all connected analysts in real time via Socket.io. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "div", 12)(22, "span", 13);
        \u0275\u0275text(23, "SOAR");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "span", 13);
        \u0275\u0275text(25, "Network");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "span", 13);
        \u0275\u0275text(27, "Automated");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(28, "button", 14);
        \u0275\u0275pipe(29, "async");
        \u0275\u0275pipe(30, "async");
        \u0275\u0275listener("click", function ExecutionPlaybooksComponent_Template_button_click_28_listener() {
          return ctx.executeBlockIp();
        });
        \u0275\u0275template(31, ExecutionPlaybooksComponent_span_31_Template, 2, 0, "span", 15);
        \u0275\u0275pipe(32, "async");
        \u0275\u0275template(33, ExecutionPlaybooksComponent_span_33_Template, 3, 0, "span", 16);
        \u0275\u0275pipe(34, "async");
        \u0275\u0275template(35, ExecutionPlaybooksComponent_span_35_Template, 2, 0, "span", 15);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(36, "div", 17)(37, "div", 8)(38, "div", 9)(39, "span", 10);
        \u0275\u0275text(40, "\u{1F4E7}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(41, " Notify SOC Team ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "p", 11);
        \u0275\u0275text(43, "Send an automated incident report to the on-call SOC analyst.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "div", 12)(45, "span", 13);
        \u0275\u0275text(46, "Notification");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(47, "button", 18);
        \u0275\u0275text(48, "Coming Soon");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(49, "div", 17)(50, "div", 8)(51, "div", 9)(52, "span", 10);
        \u0275\u0275text(53, "\u{1F501}");
        \u0275\u0275elementEnd();
        \u0275\u0275text(54, " Isolate Endpoint ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "p", 11);
        \u0275\u0275text(56, "Trigger EDR isolation on the target host via API integration.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "div", 12)(58, "span", 13);
        \u0275\u0275text(59, "Endpoint");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(60, "button", 18);
        \u0275\u0275text(61, "Coming Soon");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(62, ExecutionPlaybooksComponent_div_62_Template, 4, 1, "div", 19);
        \u0275\u0275pipe(63, "async");
        \u0275\u0275template(64, ExecutionPlaybooksComponent_div_64_Template, 5, 1, "div", 20);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate(ctx.ip);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isMitigated);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("mitigated", ctx.isMitigated);
        \u0275\u0275advance(18);
        \u0275\u0275classProp("executing", \u0275\u0275pipeBind1(29, 14, ctx.blocking$))("done", ctx.isMitigated);
        \u0275\u0275property("disabled", \u0275\u0275pipeBind1(30, 16, ctx.blocking$) || ctx.isMitigated);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", !\u0275\u0275pipeBind1(32, 18, ctx.blocking$) && !ctx.isMitigated);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(34, 20, ctx.blocking$));
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.isMitigated);
        \u0275\u0275advance(27);
        \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(63, 22, ctx.error$));
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.log.length);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, AsyncPipe], styles: ["\n\n.playbooks-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  background: var(--bg-secondary);\n  height: 100%;\n  overflow-y: auto;\n}\n.panel-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 16px;\n  background: var(--bg-card);\n  border-bottom: 1px solid var(--border);\n  flex-shrink: 0;\n  position: sticky;\n  top: 0;\n  z-index: 2;\n}\n.panel-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.panel-title[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: .15em;\n  color: var(--text-primary);\n  flex: 1;\n}\n.panel-ip[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 11px;\n  color: var(--accent-cyan);\n  opacity: .8;\n}\n.mitigated-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 8px 16px;\n  background: rgba(34, 197, 94, .12);\n  border-bottom: 1px solid rgba(34, 197, 94, .3);\n  color: #22c55e;\n  font-family: var(--font-mono);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: .1em;\n  animation: _ngcontent-%COMP%_flashGreen .4s ease;\n}\n@keyframes _ngcontent-%COMP%_flashGreen {\n  0% {\n    background: rgba(34, 197, 94, .4);\n  }\n  100% {\n    background: rgba(34, 197, 94, .12);\n  }\n}\n.playbook-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 12px;\n  gap: 10px;\n}\n.playbook-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 14px;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-md);\n  transition: border-color .2s;\n}\n.playbook-card[_ngcontent-%COMP%]:not(.disabled):not(.mitigated):hover {\n  border-color: var(--border-bright);\n}\n.playbook-card.mitigated[_ngcontent-%COMP%] {\n  border-color: rgba(34, 197, 94, .4);\n}\n.playbook-card.disabled[_ngcontent-%COMP%] {\n  opacity: .45;\n}\n.playbook-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.playbook-name[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin-bottom: 5px;\n}\n.playbook-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.playbook-desc[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-secondary);\n  line-height: 1.5;\n  margin-bottom: 7px;\n}\n.playbook-desc[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.playbook-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 5px;\n  flex-wrap: wrap;\n}\n.meta-tag[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-family: var(--font-mono);\n  letter-spacing: .08em;\n  padding: 1px 6px;\n  border-radius: 2px;\n  background: rgba(0, 212, 255, .08);\n  border: 1px solid rgba(0, 212, 255, .2);\n  color: var(--accent-cyan);\n  text-transform: uppercase;\n}\n.execute-btn[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: 8px 16px;\n  border-radius: var(--radius-sm);\n  font-family: var(--font-mono);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: .06em;\n  cursor: pointer;\n  border: 1px solid;\n  transition: all .2s ease;\n  white-space: nowrap;\n  min-width: 110px;\n  background: rgba(239, 68, 68, .1);\n  border-color: #ef4444;\n  color: #ef4444;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n}\n.execute-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: rgba(239, 68, 68, .2);\n  box-shadow: 0 0 12px rgba(239, 68, 68, .3);\n}\n.execute-btn.executing[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, .1);\n  border-color: #f59e0b;\n  color: #f59e0b;\n  cursor: not-allowed;\n}\n.execute-btn.done[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, .1);\n  border-color: #22c55e;\n  color: #22c55e;\n  cursor: default;\n}\n.execute-btn[_ngcontent-%COMP%]:disabled {\n  opacity: .6;\n  cursor: not-allowed;\n}\n.btn-spinner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.spin-ring[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  border: 2px solid rgba(245, 158, 11, .3);\n  border-top-color: #f59e0b;\n  animation: _ngcontent-%COMP%_spin .7s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.error-alert[_ngcontent-%COMP%] {\n  margin: 0 12px 10px;\n  padding: 8px 12px;\n  background: rgba(239, 68, 68, .1);\n  border: 1px solid rgba(239, 68, 68, .3);\n  border-radius: var(--radius-sm);\n  color: #ef4444;\n  font-family: var(--font-mono);\n  font-size: 11px;\n  display: flex;\n  gap: 7px;\n}\n.exec-log[_ngcontent-%COMP%] {\n  margin: 0 12px 12px;\n}\n.log-header[_ngcontent-%COMP%] {\n  font-size: 9px;\n  letter-spacing: .14em;\n  color: var(--text-muted);\n  font-family: var(--font-mono);\n  text-transform: uppercase;\n  padding: 5px 0 6px;\n  border-bottom: 1px solid var(--border);\n  margin-bottom: 6px;\n}\n.log-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n.log-entry[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  font-family: var(--font-mono);\n  font-size: 10px;\n  line-height: 1.5;\n}\n.log-time[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  flex-shrink: 0;\n}\n.log-success[_ngcontent-%COMP%]   .log-msg[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.log-error[_ngcontent-%COMP%]   .log-msg[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.log-info[_ngcontent-%COMP%]   .log-msg[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n}\n/*# sourceMappingURL=execution-playbooks.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExecutionPlaybooksComponent, { className: "ExecutionPlaybooksComponent", filePath: "src\\app\\shared\\execution-playbooks\\execution-playbooks.component.ts", lineNumber: 32 });
})();

// src/app/shared/attack-map/attack-map.component.ts
var L3 = __toESM(require_leaflet_src());
var _c04 = ["mapEl"];
function AttackMapComponent_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r0.event.source_ip, " \u2192 ", ctx_r0.event.target_ip, " ");
  }
}
var ARC_SEGMENTS2 = 80;
var AttackMapComponent = class _AttackMapComponent {
  constructor(zone) {
    this.zone = zone;
    this.event = null;
    this.viewReady = false;
  }
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => this.initMap());
    this.viewReady = true;
    if (this.event) {
      this.zone.runOutsideAngular(() => this.renderEvent());
    }
  }
  ngOnChanges(changes) {
    if (changes["event"] && this.viewReady) {
      this.zone.runOutsideAngular(() => {
        this.arcLayer?.clearLayers();
        if (this.event)
          this.renderEvent();
      });
    }
  }
  // ── Map bootstrap ────────────────────────────────────────────────────────
  initMap() {
    this.map = L3.map(this.mapEl.nativeElement, {
      center: [20, 10],
      zoom: 2,
      minZoom: 1,
      maxZoom: 7,
      zoomControl: true,
      attributionControl: false,
      worldCopyJump: true
    });
    L3.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", { subdomains: "abcd", maxZoom: 19 }).addTo(this.map);
    this.arcLayer = L3.layerGroup().addTo(this.map);
  }
  // ── Render one arc for the current event ─────────────────────────────────
  renderEvent() {
    const evt = this.event;
    const src = evt.coordinates;
    const tgt = this.deriveTargetCoords(evt);
    if (!src)
      return;
    const color2 = severityColor(evt.severity);
    const weight = severityWeight(evt.severity);
    const glow = severityGlow(evt.severity, 0.4);
    const srcLatLng = [src.lat, src.long];
    const tgtLatLng = [tgt.lat, tgt.long];
    const arcPts = this.greatCirclePoints([src.lat, src.long], [tgt.lat, tgt.long]);
    L3.polyline(arcPts, {
      color: glow,
      weight: weight * 8,
      opacity: 0.5,
      smoothFactor: 1,
      interactive: false
    }).addTo(this.arcLayer);
    L3.polyline(arcPts, {
      color: color2,
      weight: weight + 1,
      opacity: 1,
      smoothFactor: 1,
      interactive: false,
      dashArray: evt.severity === "Critical" ? "8 4" : void 0
    }).addTo(this.arcLayer);
    const pulseIcon = L3.divIcon({
      className: "",
      html: `<div class="atk-pulse-ring" style="--c:${color2}"></div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });
    L3.marker(srcLatLng, { icon: pulseIcon, interactive: false, zIndexOffset: -10 }).addTo(this.arcLayer);
    const srcIcon = L3.divIcon({
      className: "",
      html: `
        <div class="atk-marker atk-src" style="--c:${color2}">
          <span class="atk-marker-dot"></span>
        </div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
    L3.marker(srcLatLng, { icon: srcIcon, zIndexOffset: 100 }).bindPopup(this.srcPopup(evt, color2), { maxWidth: 220, className: "atk-popup" }).addTo(this.arcLayer);
    const tgtIcon = L3.divIcon({
      className: "",
      html: `
        <div class="atk-marker atk-tgt">
          <span class="atk-marker-dot"></span>
        </div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
    L3.marker(tgtLatLng, { icon: tgtIcon, zIndexOffset: 100 }).bindPopup(this.tgtPopup(evt), { maxWidth: 220, className: "atk-popup" }).addTo(this.arcLayer);
    const srcLabel = L3.divIcon({
      className: "",
      html: `<div class="atk-label atk-label-src" style="--c:${color2}">${evt.source_ip}<br><small>${evt.source_country}</small></div>`,
      iconSize: [0, 0],
      iconAnchor: [-12, 20]
    });
    L3.marker(srcLatLng, { icon: srcLabel, interactive: false, zIndexOffset: 200 }).addTo(this.arcLayer);
    const tgtLabel = L3.divIcon({
      className: "",
      html: `<div class="atk-label atk-label-tgt">${evt.target_ip}<br><small>${evt.target_country}</small></div>`,
      iconSize: [0, 0],
      iconAnchor: [-12, 20]
    });
    L3.marker(tgtLatLng, { icon: tgtLabel, interactive: false, zIndexOffset: 200 }).addTo(this.arcLayer);
    const bounds = L3.latLngBounds([srcLatLng, tgtLatLng]);
    setTimeout(() => {
      this.map.fitBounds(bounds, { padding: [48, 48], maxZoom: 5, animate: true });
    }, 80);
  }
  // ── Popup HTML helpers ────────────────────────────────────────────────────
  srcPopup(evt, color2) {
    return `
      <div class="atk-popup-inner">
        <div class="atk-popup-title" style="color:${color2}">\u2694 ATTACKER</div>
        <div class="atk-popup-row"><b>IP</b><span>${evt.source_ip}</span></div>
        <div class="atk-popup-row"><b>Country</b><span>${evt.source_country}</span></div>
        <div class="atk-popup-row"><b>Attack</b><span>${evt.attack_type}</span></div>
        <div class="atk-popup-row"><b>Severity</b>
          <span style="color:${color2};font-weight:700">${evt.severity}</span>
        </div>
        <div class="atk-popup-row"><b>Packets</b><span>${evt.packet_count.toLocaleString()}</span></div>
      </div>`;
  }
  tgtPopup(evt) {
    return `
      <div class="atk-popup-inner">
        <div class="atk-popup-title" style="color:#00d4ff">\u{1F3AF} TARGET</div>
        <div class="atk-popup-row"><b>IP</b><span>${evt.target_ip}</span></div>
        <div class="atk-popup-row"><b>Country</b><span>${evt.target_country}</span></div>
        <div class="atk-popup-row"><b>Asset</b><span>Internal</span></div>
      </div>`;
  }
  // ── Great-circle interpolation (same as live-map) ─────────────────────────
  greatCirclePoints(from, to) {
    const points = [];
    const [lat1, lng1] = from.map((d2) => d2 * Math.PI / 180);
    const [lat2, lng2] = to.map((d2) => d2 * Math.PI / 180);
    const d = 2 * Math.asin(Math.sqrt(Math.sin((lat2 - lat1) / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin((lng2 - lng1) / 2) ** 2));
    const bulge = Math.min(d * 0.5, 0.8);
    for (let i2 = 0; i2 <= ARC_SEGMENTS2; i2++) {
      const f = i2 / ARC_SEGMENTS2;
      if (d < 1e-4) {
        points.push([from[0] + (to[0] - from[0]) * f, from[1] + (to[1] - from[1]) * f]);
        continue;
      }
      const A = Math.sin((1 - f) * d) / Math.sin(d);
      const B = Math.sin(f * d) / Math.sin(d);
      const x3 = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2);
      const y3 = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2);
      const z = A * Math.sin(lat1) + B * Math.sin(lat2);
      let lat = Math.atan2(z, Math.sqrt(x3 * x3 + y3 * y3)) * 180 / Math.PI;
      const lng = Math.atan2(y3, x3) * 180 / Math.PI;
      lat += bulge * Math.sin(f * Math.PI) * (180 / Math.PI);
      points.push([lat, lng]);
    }
    return points;
  }
  deriveTargetCoords(evt) {
    const hash = evt.target_ip.split(".").reduce((acc, oct, i2) => acc + parseInt(oct, 10) * (i2 + 1) * 17, 0);
    return { lat: hash * 7 % 170 - 85, long: hash * 13 % 360 - 180 };
  }
  ngOnDestroy() {
    if (this.map)
      this.map.remove();
  }
  static {
    this.\u0275fac = function AttackMapComponent_Factory(t) {
      return new (t || _AttackMapComponent)(\u0275\u0275directiveInject(NgZone));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AttackMapComponent, selectors: [["app-attack-map"]], viewQuery: function AttackMapComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c04, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.mapEl = _t.first);
      }
    }, inputs: { event: "event" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 8, vars: 1, consts: [["mapEl", ""], [1, "attack-map-wrap"], [1, "attack-map-header"], [1, "attack-map-pulse"], [1, "attack-map-title"], ["class", "attack-map-route", 4, "ngIf"], [1, "attack-map-canvas"], [1, "attack-map-route"]], template: function AttackMapComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
        \u0275\u0275element(2, "span", 3);
        \u0275\u0275elementStart(3, "span", 4);
        \u0275\u0275text(4, "ATTACK PATH MAP");
        \u0275\u0275elementEnd();
        \u0275\u0275template(5, AttackMapComponent_span_5_Template, 2, 2, "span", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275element(6, "div", 6, 0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ctx.event);
      }
    }, dependencies: [CommonModule, NgIf], styles: ["\n\n.attack-map-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  border: 1px solid var(--border);\n  border-radius: var(--radius-lg);\n  overflow: hidden;\n  background: var(--bg-primary);\n  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);\n}\n.attack-map-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 7px 14px;\n  background: var(--bg-secondary);\n  border-bottom: 1px solid var(--border);\n  flex-shrink: 0;\n}\n.attack-map-pulse[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: #ef4444;\n  box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6);\n  animation: _ngcontent-%COMP%_atkPulse 1.8s infinite;\n  flex-shrink: 0;\n}\n@keyframes _ngcontent-%COMP%_atkPulse {\n  0% {\n    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6);\n  }\n  70% {\n    box-shadow: 0 0 0 8px rgba(239, 68, 68, 0);\n  }\n  100% {\n    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);\n  }\n}\n.attack-map-title[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-family: var(--font-mono);\n  letter-spacing: 0.16em;\n  color: var(--accent-cyan);\n  font-weight: 700;\n  text-transform: uppercase;\n}\n.attack-map-route[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-family: var(--font-mono);\n  color: var(--text-secondary);\n  margin-left: auto;\n  letter-spacing: 0.04em;\n}\n.attack-map-canvas[_ngcontent-%COMP%] {\n  height: 280px;\n  z-index: 0;\n}\n[_nghost-%COMP%]     .atk-pulse-ring {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  border: 2px solid var(--c, #ef4444);\n  opacity: 0;\n  animation: _ngcontent-%COMP%_atkRingPulse 2s ease-out infinite;\n}\n@keyframes _ngcontent-%COMP%_atkRingPulse {\n  0% {\n    transform: scale(0.4);\n    opacity: 0.8;\n  }\n  100% {\n    transform: scale(1.6);\n    opacity: 0;\n  }\n}\n[_nghost-%COMP%]     .atk-marker {\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px solid var(--c, #00d4ff);\n  box-shadow: 0 0 10px var(--c, #00d4ff);\n}\n[_nghost-%COMP%]     .atk-src {\n  background: rgba(239, 68, 68, 0.25);\n  --c: #ef4444;\n}\n[_nghost-%COMP%]     .atk-tgt {\n  background: rgba(0, 212, 255, 0.2);\n  --c: #00d4ff;\n  border-color: #00d4ff;\n  box-shadow: 0 0 10px #00d4ff;\n}\n[_nghost-%COMP%]     .atk-marker-dot {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: var(--c, #00d4ff);\n}\n[_nghost-%COMP%]     .atk-label {\n  font-family: monospace;\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--c, #00d4ff);\n  background: rgba(5, 12, 30, 0.85);\n  border: 1px solid var(--c, #00d4ff);\n  border-radius: 4px;\n  padding: 3px 7px;\n  white-space: nowrap;\n  line-height: 1.4;\n  text-shadow: 0 0 8px var(--c, #00d4ff);\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);\n}\n[_nghost-%COMP%]     .atk-label small {\n  font-size: 9px;\n  opacity: 0.75;\n}\n[_nghost-%COMP%]     .atk-label-src {\n  color: var(--c);\n  border-color: var(--c);\n  text-shadow: 0 0 8px var(--c);\n}\n[_nghost-%COMP%]     .atk-label-tgt {\n  color: #00d4ff;\n  border-color: #00d4ff;\n  text-shadow: 0 0 8px #00d4ff;\n}\n[_nghost-%COMP%]     .atk-popup .leaflet-popup-content-wrapper {\n  background: rgba(5, 12, 30, 0.96);\n  border: 1px solid rgba(0, 212, 255, 0.3);\n  border-radius: 6px;\n  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.7);\n  padding: 0;\n}\n[_nghost-%COMP%]     .atk-popup .leaflet-popup-tip-container {\n  display: none;\n}\n[_nghost-%COMP%]     .atk-popup .leaflet-popup-content {\n  margin: 0;\n}\n[_nghost-%COMP%]     .atk-popup-inner {\n  padding: 12px 14px;\n  font-family: monospace;\n}\n[_nghost-%COMP%]     .atk-popup-title {\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  margin-bottom: 8px;\n  padding-bottom: 6px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n}\n[_nghost-%COMP%]     .atk-popup-row {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  font-size: 11px;\n  color: rgba(200, 220, 240, 0.8);\n  padding: 2px 0;\n}\n[_nghost-%COMP%]     .atk-popup-row b {\n  color: rgba(200, 220, 240, 0.45);\n  font-weight: 400;\n  min-width: 60px;\n}\n[_nghost-%COMP%]     .atk-popup-row span {\n  color: #e2f0ff;\n}\n[_nghost-%COMP%]     .leaflet-control-zoom a {\n  background: rgba(5, 12, 30, 0.9) !important;\n  border-color: rgba(0, 212, 255, 0.2) !important;\n  color: var(--accent-cyan) !important;\n}\n[_nghost-%COMP%]     .leaflet-control-zoom a:hover {\n  background: rgba(0, 212, 255, 0.15) !important;\n}\n/*# sourceMappingURL=attack-map.component.css.map */"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AttackMapComponent, { className: "AttackMapComponent", filePath: "src\\app\\shared\\attack-map\\attack-map.component.ts", lineNumber: 22 });
})();

// src/app/services/osint.service.ts
var OsintService = class _OsintService {
  constructor(http) {
    this.http = http;
    this.BASE = "/api/v1/osint";
    this.data$ = new BehaviorSubject(null);
    this.loading$ = new BehaviorSubject(false);
    this.error$ = new BehaviorSubject(null);
  }
  fetchForIp(ip) {
    this.loading$.next(true);
    this.error$.next(null);
    return this.http.get(`${this.BASE}/${encodeURIComponent(ip)}`).pipe(tap((res) => {
      this.data$.next(res);
      this.loading$.next(false);
    }), catchError((err) => {
      const msg = err.error?.message ?? err.message ?? "Failed to load OSINT data";
      this.error$.next(msg);
      this.loading$.next(false);
      return throwError(() => new Error(msg));
    }));
  }
  clear() {
    this.data$.next(null);
    this.error$.next(null);
  }
  static {
    this.\u0275fac = function OsintService_Factory(t) {
      return new (t || _OsintService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _OsintService, factory: _OsintService.\u0275fac, providedIn: "root" });
  }
};

// src/app/shared/workbench-drawer/workbench-drawer.component.ts
var _c05 = () => [];
function WorkbenchDrawerComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "span", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 19);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 20);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 21);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.event.attack_type);
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ctx_r0.severityBg(ctx_r0.event.severity))("border-color", ctx_r0.severityColor(ctx_r0.event.severity))("color", ctx_r0.severityColor(ctx_r0.event.severity));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.event.severity, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(7, 10, ctx_r0.event.packet_count), " pkts");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.formatTimestamp(ctx_r0.event.timestamp));
  }
}
function WorkbenchDrawerComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "span", 23);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r2 = ctx.ngIf;
    \u0275\u0275classMap("risk-" + data_r2.meta.risk_level.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" RISK: ", data_r2.meta.risk_level, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", data_r2.meta.risk_score, "/100");
  }
}
function WorkbenchDrawerComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1, " \u{1F512} MITIGATED ");
    \u0275\u0275elementEnd();
  }
}
function WorkbenchDrawerComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275element(1, "div", 26);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Querying OSINT sources\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 27);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Fetching VirusTotal & Shodan data for ", ctx_r0.ip, "");
  }
}
function WorkbenchDrawerComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "span");
    \u0275\u0275text(2, "\u26A0");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 29);
    \u0275\u0275listener("click", function WorkbenchDrawerComponent_div_19_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.retry());
    });
    \u0275\u0275text(6, "\u21BA Retry");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const err_r4 = ctx.ngIf;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(err_r4);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_span_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r6 = \u0275\u0275nextContext(2).ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", data_r6.shodan.total_ports, " ports ");
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_span_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r6 = \u0275\u0275nextContext(2).ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", data_r6.virustotal.last_analysis_stats.malicious, " malicious ");
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_22_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51)(1, "span", 52);
    \u0275\u0275text(2, "\u2694");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No event context available.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 53);
    \u0275\u0275text(6, "Click a row in the triage queue to see the attack path.");
    \u0275\u0275elementEnd()();
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r7 = ctx.ngIf;
    \u0275\u0275classMap("risk-" + d_r7.meta.risk_level.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" RISK ", d_r7.meta.risk_level, " ");
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 83)(1, "div", 84);
    \u0275\u0275text(2, "EVENT DESCRIPTION");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 85);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.event.description);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_86__svg_g_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g")(1, "path", 109)(2, "title");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const s_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275attribute("d", s_r8.path)("fill", s_r8.color)("opacity", 0.85);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", s_r8.label, ": ", s_r8.count, " (", s_r8.pct, "%)");
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_86_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 110);
    \u0275\u0275element(2, "span", 111);
    \u0275\u0275elementStart(3, "span", 112);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 113);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const s_r9 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", s_r9.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(s_r9.label);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", s_r9.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r9.count);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_86_div_36_ng_container_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 120);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" \u26A0 ", b_r10.cveCount, " CVE", b_r10.cveCount > 1 ? "s" : "", " ");
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_86_div_36_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 115)(2, "span", 116);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 117);
    \u0275\u0275element(5, "div", 118);
    \u0275\u0275template(6, WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_86_div_36_ng_container_1_span_6_Template, 2, 2, "span", 119);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const b_r10 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("color", b_r10.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(b_r10.label);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", b_r10.pct, "%")("background", b_r10.color);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", b_r10.cveCount > 0);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_86_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 114);
    \u0275\u0275template(1, WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_86_div_36_ng_container_1_Template, 7, 8, "ng-container", 91);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r11 = \u0275\u0275nextContext().ngIf;
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.attackPortBars(d_r11));
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_86_ng_template_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 121);
    \u0275\u0275text(1, "No open ports detected");
    \u0275\u0275elementEnd();
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 86)(1, "div", 87)(2, "div", 88);
    \u0275\u0275text(3, "VT ENGINE VERDICTS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 89);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 90);
    \u0275\u0275template(6, WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_86__svg_g_6_Template, 4, 6, "g", 91);
    \u0275\u0275elementStart(7, "text", 92);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "text", 93);
    \u0275\u0275text(10, "ENGINES");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(11, "div", 94);
    \u0275\u0275template(12, WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_86_ng_container_12_Template, 7, 6, "ng-container", 91);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 87)(14, "div", 88);
    \u0275\u0275text(15, "RISK SCORE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 95);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(17, "svg", 96);
    \u0275\u0275element(18, "path", 97)(19, "path", 98)(20, "line", 99)(21, "circle", 100);
    \u0275\u0275elementStart(22, "text", 101);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "text", 102);
    \u0275\u0275text(25, "/ 100");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "text", 103);
    \u0275\u0275text(27, "0");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "text", 104);
    \u0275\u0275text(29, "100");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(30, "div", 105);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div", 106)(33, "div", 88);
    \u0275\u0275text(34, "EXPOSED PORTS / CVE RISK");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 107);
    \u0275\u0275template(36, WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_86_div_36_Template, 2, 1, "div", 108)(37, WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_86_ng_template_37_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const d_r11 = ctx.ngIf;
    const noPorts_r12 = \u0275\u0275reference(38);
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r0.vtDonutSlices(d_r11));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.vtTotal(d_r11));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r0.vtDonutSlices(d_r11));
    \u0275\u0275advance(6);
    \u0275\u0275attribute("d", ctx_r0.gaugeArcPath(d_r11.meta.risk_score, false));
    \u0275\u0275advance();
    \u0275\u0275attribute("d", ctx_r0.gaugeArcPath(d_r11.meta.risk_score, true))("stroke", ctx_r0.gaugeColor(d_r11.meta.risk_score));
    \u0275\u0275advance();
    \u0275\u0275attribute("x2", ctx_r0.gaugeNeedle(d_r11.meta.risk_score).x2)("y2", ctx_r0.gaugeNeedle(d_r11.meta.risk_score).y2)("stroke", ctx_r0.gaugeColor(d_r11.meta.risk_score));
    \u0275\u0275advance();
    \u0275\u0275attribute("fill", ctx_r0.gaugeColor(d_r11.meta.risk_score));
    \u0275\u0275advance();
    \u0275\u0275attribute("fill", ctx_r0.gaugeColor(d_r11.meta.risk_score));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", d_r11.meta.risk_score, " ");
    \u0275\u0275advance(7);
    \u0275\u0275styleProp("color", ctx_r0.gaugeColor(d_r11.meta.risk_score));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", d_r11.meta.risk_level, " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r0.attackPortBars(d_r11).length)("ngIfElse", noPorts_r12);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_88_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 131)(1, "span", 126);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 127);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r6 = \u0275\u0275nextContext(5).ngIf;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(data_r6.virustotal.country);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(data_r6.virustotal.as_owner);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 122)(1, "div", 123);
    \u0275\u0275text(2, "VIRUSTOTAL THREAT INTEL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 124)(4, "div", 125)(5, "span", 126);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 127);
    \u0275\u0275text(8, "Malicious");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 128)(10, "span", 126);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 127);
    \u0275\u0275text(13, "Suspicious");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 129)(15, "span", 126);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 127);
    \u0275\u0275text(18, "Harmless");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(19, WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_88_div_19_Template, 5, 2, "div", 130);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    const data_r6 = \u0275\u0275nextContext(4).ngIf;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate((tmp_6_0 = data_r6.virustotal.last_analysis_stats == null ? null : data_r6.virustotal.last_analysis_stats.malicious) !== null && tmp_6_0 !== void 0 ? tmp_6_0 : 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((tmp_7_0 = data_r6.virustotal.last_analysis_stats == null ? null : data_r6.virustotal.last_analysis_stats.suspicious) !== null && tmp_7_0 !== void 0 ? tmp_7_0 : 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((tmp_8_0 = data_r6.virustotal.last_analysis_stats == null ? null : data_r6.virustotal.last_analysis_stats.harmless) !== null && tmp_8_0 !== void 0 ? tmp_8_0 : 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", data_r6.virustotal.as_owner);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_89_ng_container_4_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 137);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r13.service);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_89_ng_container_4_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 138);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u26A0 ", p_r13.cves.length, " CVE");
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_89_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 134);
    \u0275\u0275text(2);
    \u0275\u0275template(3, WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_89_ng_container_4_span_3_Template, 2, 1, "span", 135)(4, WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_89_ng_container_4_span_4_Template, 2, 1, "span", 136);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const p_r13 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classProp("port-chip-cve", p_r13.cves == null ? null : p_r13.cves.length);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", p_r13.port, "/", p_r13.protocol, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r13.service);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r13.cves == null ? null : p_r13.cves.length);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 132)(1, "div", 123);
    \u0275\u0275text(2, "OPEN PORTS ON ATTACKER");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 133);
    \u0275\u0275template(4, WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_89_ng_container_4_Template, 5, 6, "ng-container", 91);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r6 = \u0275\u0275nextContext(4).ngIf;
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", data_r6.shodan.open_ports);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 54)(2, "div", 55)(3, "div", 56);
    \u0275\u0275text(4, "\u{1F30D}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 57);
    \u0275\u0275text(6, "ATTACKER");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 58);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 59);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_11_Template, 2, 3, "div", 60);
    \u0275\u0275pipe(12, "async");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 61)(14, "div", 62);
    \u0275\u0275element(15, "div", 63)(16, "div", 64);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 65)(18, "span", 66);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "span", 67);
    \u0275\u0275elementStart(21, "span", 68);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 69)(24, "div", 56);
    \u0275\u0275text(25, "\u{1F5A5}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 57);
    \u0275\u0275text(27, "TARGET");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 58);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 59);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 70);
    \u0275\u0275text(33, "INTERNAL ASSET");
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(34, "app-attack-map", 71);
    \u0275\u0275elementStart(35, "div", 72)(36, "div", 73)(37, "div", 74);
    \u0275\u0275text(38, "\u{1F550}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 75)(40, "div", 76);
    \u0275\u0275text(41, "DETECTED");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "div", 77);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(44, "div", 73)(45, "div", 74);
    \u0275\u0275text(46, "\u{1F4E6}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 75)(48, "div", 76);
    \u0275\u0275text(49, "PACKET VOLUME");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "div", 77);
    \u0275\u0275text(51);
    \u0275\u0275pipe(52, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(53, "div", 73)(54, "div", 74);
    \u0275\u0275text(55, "\u2694");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "div", 75)(57, "div", 76);
    \u0275\u0275text(58, "ATTACK VECTOR");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "div", 77);
    \u0275\u0275text(60);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(61, "div", 73)(62, "div", 74);
    \u0275\u0275text(63, "\u{1F4CA}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "div", 75)(65, "div", 76);
    \u0275\u0275text(66, "SEVERITY");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "div", 77);
    \u0275\u0275text(68);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(69, "div", 73)(70, "div", 74);
    \u0275\u0275text(71, "\u{1F310}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "div", 75)(73, "div", 76);
    \u0275\u0275text(74, "SOURCE GEO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "div", 77);
    \u0275\u0275text(76);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(77, "div", 73)(78, "div", 74);
    \u0275\u0275text(79, "\u{1F3AF}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "div", 75)(81, "div", 76);
    \u0275\u0275text(82, "TARGET GEO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "div", 77);
    \u0275\u0275text(84);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(85, WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_85_Template, 5, 1, "div", 78)(86, WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_86_Template, 39, 17, "div", 79);
    \u0275\u0275pipe(87, "async");
    \u0275\u0275template(88, WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_88_Template, 20, 4, "div", 80)(89, WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_div_89_Template, 5, 1, "div", 81);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const data_r6 = \u0275\u0275nextContext(3).ngIf;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.event.source_ip);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.event.source_country);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(12, 34, ctx_r0.data$));
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("background", "linear-gradient(90deg," + ctx_r0.severityColor(ctx_r0.event.severity) + ", transparent)");
    \u0275\u0275advance();
    \u0275\u0275styleProp("border-left-color", ctx_r0.severityColor(ctx_r0.event.severity));
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("border-color", ctx_r0.severityColor(ctx_r0.event.severity))("color", ctx_r0.severityColor(ctx_r0.event.severity))("background", ctx_r0.severityBg(ctx_r0.event.severity));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.event.attack_type, " ");
    \u0275\u0275advance();
    \u0275\u0275styleProp("background", ctx_r0.severityColor(ctx_r0.event.severity));
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r0.severityColor(ctx_r0.event.severity));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.event.severity, " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.event.target_ip);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.event.target_country);
    \u0275\u0275advance(3);
    \u0275\u0275property("event", ctx_r0.event);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.formatTimestamp(ctx_r0.event.timestamp));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(52, 36, ctx_r0.event.packet_count));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.event.attack_type);
    \u0275\u0275advance(7);
    \u0275\u0275styleProp("color", ctx_r0.severityColor(ctx_r0.event.severity));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.event.severity, " ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.event.source_country);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.event.target_country);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.event.description);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(87, 38, ctx_r0.data$));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", data_r6.virustotal);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r6.shodan == null ? null : data_r6.shodan.open_ports == null ? null : data_r6.shodan.open_ports.length);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275template(1, WorkbenchDrawerComponent_div_21_ng_container_1_div_22_div_1_Template, 7, 0, "div", 50)(2, WorkbenchDrawerComponent_div_21_ng_container_1_div_22_ng_container_2_Template, 90, 40, "ng-container", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.event);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.event);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_ng_container_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "app-osint-graph", 139);
    \u0275\u0275listener("nodeSelected", function WorkbenchDrawerComponent_div_21_ng_container_1_ng_container_23_Template_app_osint_graph_nodeSelected_1_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onNodeSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const data_r6 = \u0275\u0275nextContext(2).ngIf;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("graph", data_r6.graph)("mitigated", ctx_r0.isIpMitigated);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 153)(1, "span", 154);
    \u0275\u0275text(2, "\u{1F3E2}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "div", 155);
    \u0275\u0275text(5, "ORGANISATION");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 156);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const data_r6 = \u0275\u0275nextContext(3).ngIf;
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(data_r6.shodan.org);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 153)(1, "span", 154);
    \u0275\u0275text(2, "\u{1F4E1}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "div", 155);
    \u0275\u0275text(5, "ISP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 156);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const data_r6 = \u0275\u0275nextContext(3).ngIf;
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(data_r6.shodan.isp);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 153)(1, "span", 154);
    \u0275\u0275text(2, "\u{1F310}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "div", 155);
    \u0275\u0275text(5, "ASN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 156);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const data_r6 = \u0275\u0275nextContext(3).ngIf;
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(data_r6.shodan.asn);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 153)(1, "span", 154);
    \u0275\u0275text(2, "\u{1F4BB}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "div", 155);
    \u0275\u0275text(5, "OS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 156);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const data_r6 = \u0275\u0275nextContext(3).ngIf;
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(data_r6.shodan.os);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 153)(1, "span", 154);
    \u0275\u0275text(2, "\u{1F550}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "div", 155);
    \u0275\u0275text(5, "LAST SCAN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 156);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const data_r6 = \u0275\u0275nextContext(3).ngIf;
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 1, data_r6.shodan.last_update, "dd MMM yyyy"));
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 153)(1, "span", 154);
    \u0275\u0275text(2, "\u{1F517}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "div", 155);
    \u0275\u0275text(5, "HOSTNAME");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 156);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const data_r6 = \u0275\u0275nextContext(3).ngIf;
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(data_r6.shodan.hostnames[0]);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_8_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 159);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tag_r15 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tag_r15);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 157);
    \u0275\u0275template(1, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_8_span_1_Template, 2, 1, "span", 158);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r6 = \u0275\u0275nextContext(3).ngIf;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", data_r6.shodan.tags);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_9_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 164)(1, "span", 165);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 166);
    \u0275\u0275element(4, "div", 167);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 168);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const bar_r16 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(bar_r16.label);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", bar_r16.pct, "%")("background", bar_r16.color);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", bar_r16.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(bar_r16.value);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 160)(1, "div", 161);
    \u0275\u0275text(2, "PORT DISTRIBUTION");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 162);
    \u0275\u0275template(4, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_9_div_4_Template, 7, 8, "div", 163);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r6 = \u0275\u0275nextContext(3).ngIf;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r0.portChartBars(data_r6));
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 161);
    \u0275\u0275text(1, " EXPOSED SERVICES ");
    \u0275\u0275elementEnd();
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_12_div_8_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 179);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r17 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r17.version);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_12_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 177);
    \u0275\u0275text(1);
    \u0275\u0275template(2, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_12_div_8_span_2_Template, 2, 1, "span", 178);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r17 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", p_r17.product, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r17.version);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_12_div_9_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 182);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cve_r18 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u26A0 ", cve_r18, " ");
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_12_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 180);
    \u0275\u0275template(1, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_12_div_9_span_1_Template, 2, 1, "span", 181);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r17 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", p_r17.cves);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_12_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 183)(1, "span", 184);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "slice");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r17 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(3, 1, p_r17.banner, 0, 120));
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 169)(1, "div", 170)(2, "div", 171);
    \u0275\u0275text(3);
    \u0275\u0275elementStart(4, "span", 172);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 173);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_12_div_8_Template, 3, 2, "div", 174);
    \u0275\u0275elementEnd();
    \u0275\u0275template(9, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_12_div_9_Template, 2, 1, "div", 175)(10, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_12_div_10_Template, 4, 5, "div", 176);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r17 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r17.port);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("/", p_r17.protocol, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r17.service || p_r17.protocol);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r17.product);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r17.cves == null ? null : p_r17.cves.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", p_r17.banner);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_tr_32_ng_container_12_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 182);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r19 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r19);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_tr_32_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_tr_32_ng_container_12_span_1_Template, 2, 1, "span", 181);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const p_r20 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", p_r20.cves);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_tr_32_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_tr_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 185);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 186);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 187);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 186);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 186);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275template(12, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_tr_32_ng_container_12_Template, 2, 1, "ng-container", 188)(13, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_tr_32_ng_template_13_Template, 2, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r20 = ctx.$implicit;
    const noCve_r21 = \u0275\u0275reference(14);
    \u0275\u0275classProp("row-cve", p_r20.cves == null ? null : p_r20.cves.length);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r20.port);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r20.protocol);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r20.service || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r20.product || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r20.version || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", p_r20.cves == null ? null : p_r20.cves.length)("ngIfElse", noCve_r21);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 189)(1, "span");
    \u0275\u0275text(2, "\u{1F4E1}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No Shodan data available for this IP.");
    \u0275\u0275elementEnd()();
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 140)(1, "div", 141);
    \u0275\u0275template(2, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_2_Template, 8, 1, "div", 142)(3, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_3_Template, 8, 1, "div", 142)(4, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_4_Template, 8, 1, "div", 142)(5, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_5_Template, 8, 1, "div", 142)(6, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_6_Template, 9, 4, "div", 142)(7, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_7_Template, 8, 1, "div", 142);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_8_Template, 2, 1, "div", 143)(9, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_9_Template, 5, 1, "div", 144)(10, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_10_Template, 2, 0, "div", 145);
    \u0275\u0275elementStart(11, "div", 146);
    \u0275\u0275template(12, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_12_Template, 11, 6, "div", 147);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 148);
    \u0275\u0275text(14, "PORTS TABLE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 149)(16, "table", 150)(17, "thead")(18, "tr")(19, "th");
    \u0275\u0275text(20, "PORT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th");
    \u0275\u0275text(22, "PROTOCOL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th");
    \u0275\u0275text(24, "SERVICE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "th");
    \u0275\u0275text(26, "PRODUCT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th");
    \u0275\u0275text(28, "VERSION");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "th");
    \u0275\u0275text(30, "CVEs");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "tbody");
    \u0275\u0275template(32, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_tr_32_Template, 15, 9, "tr", 151);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(33, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_div_33_Template, 5, 0, "div", 152);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_13_0;
    let tmp_14_0;
    const data_r6 = \u0275\u0275nextContext(2).ngIf;
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", data_r6.shodan == null ? null : data_r6.shodan.org);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r6.shodan == null ? null : data_r6.shodan.isp);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r6.shodan == null ? null : data_r6.shodan.asn);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r6.shodan == null ? null : data_r6.shodan.os);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r6.shodan == null ? null : data_r6.shodan.last_update);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r6.shodan == null ? null : data_r6.shodan.hostnames == null ? null : data_r6.shodan.hostnames.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r6.shodan == null ? null : data_r6.shodan.tags == null ? null : data_r6.shodan.tags.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r6.shodan == null ? null : data_r6.shodan.open_ports == null ? null : data_r6.shodan.open_ports.length);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r6.shodan == null ? null : data_r6.shodan.open_ports == null ? null : data_r6.shodan.open_ports.length);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", (tmp_13_0 = data_r6.shodan == null ? null : data_r6.shodan.open_ports) !== null && tmp_13_0 !== void 0 ? tmp_13_0 : \u0275\u0275pureFunction0(12, _c05));
    \u0275\u0275advance(20);
    \u0275\u0275property("ngForOf", (tmp_14_0 = data_r6.shodan == null ? null : data_r6.shodan.open_ports) !== null && tmp_14_0 !== void 0 ? tmp_14_0 : \u0275\u0275pureFunction0(13, _c05));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(data_r6.shodan == null ? null : data_r6.shodan.open_ports == null ? null : data_r6.shodan.open_ports.length));
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_25_div_1_div_21_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 205);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r6 = \u0275\u0275nextContext(5).ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(data_r6.virustotal.network);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_25_div_1_div_21_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r6 = \u0275\u0275nextContext(5).ngIf;
    \u0275\u0275classMapInterpolate1("vt-meta-pill rep-", data_r6.meta.risk_level.toLowerCase(), "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" rep: ", data_r6.virustotal.reputation, " ");
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_25_div_1_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 204)(1, "span", 205);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 205);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, WorkbenchDrawerComponent_div_21_ng_container_1_div_25_div_1_div_21_span_5_Template, 2, 1, "span", 206)(6, WorkbenchDrawerComponent_div_21_ng_container_1_div_25_div_1_div_21_span_6_Template, 2, 4, "span", 207);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r6 = \u0275\u0275nextContext(4).ngIf;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(data_r6.virustotal.country);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(data_r6.virustotal.as_owner);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r6.virustotal.network);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r6.virustotal.reputation !== null);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_25_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 196)(1, "div", 197)(2, "div", 198);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 199);
    \u0275\u0275text(5, "MALICIOUS");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 200)(7, "div", 198);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 199);
    \u0275\u0275text(10, "SUSPICIOUS");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 201)(12, "div", 198);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 199);
    \u0275\u0275text(15, "HARMLESS");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 202)(17, "div", 198);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 199);
    \u0275\u0275text(20, "UNDETECTED");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(21, WorkbenchDrawerComponent_div_21_ng_container_1_div_25_div_1_div_21_Template, 7, 4, "div", 203);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    const data_r6 = \u0275\u0275nextContext(3).ngIf;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_5_0 = data_r6.virustotal.last_analysis_stats == null ? null : data_r6.virustotal.last_analysis_stats.malicious) !== null && tmp_5_0 !== void 0 ? tmp_5_0 : 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((tmp_6_0 = data_r6.virustotal.last_analysis_stats == null ? null : data_r6.virustotal.last_analysis_stats.suspicious) !== null && tmp_6_0 !== void 0 ? tmp_6_0 : 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((tmp_7_0 = data_r6.virustotal.last_analysis_stats == null ? null : data_r6.virustotal.last_analysis_stats.harmless) !== null && tmp_7_0 !== void 0 ? tmp_7_0 : 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((tmp_8_0 = data_r6.virustotal.last_analysis_stats == null ? null : data_r6.virustotal.last_analysis_stats.undetected) !== null && tmp_8_0 !== void 0 ? tmp_8_0 : 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", data_r6.virustotal.as_owner);
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_25_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 208);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "span", 209);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 210);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 211);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_10_0;
    let tmp_11_0;
    const eng_r22 = ctx.$implicit;
    \u0275\u0275classMap("vt-row-" + eng_r22.category);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(eng_r22.engine_name);
    \u0275\u0275advance(2);
    \u0275\u0275classMap("verdict-" + eng_r22.category);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", eng_r22.category, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_10_0 = eng_r22.result) !== null && tmp_10_0 !== void 0 ? tmp_10_0 : "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_11_0 = eng_r22.method) !== null && tmp_11_0 !== void 0 ? tmp_11_0 : "\u2014");
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_25_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 212);
    \u0275\u0275text(1, " No engine results available. ");
    \u0275\u0275elementEnd();
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 190);
    \u0275\u0275template(1, WorkbenchDrawerComponent_div_21_ng_container_1_div_25_div_1_Template, 22, 5, "div", 191);
    \u0275\u0275elementStart(2, "div", 192)(3, "table", 193)(4, "thead")(5, "tr")(6, "th");
    \u0275\u0275text(7, "ENGINE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "VERDICT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "RESULT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "METHOD");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275template(15, WorkbenchDrawerComponent_div_21_ng_container_1_div_25_tr_15_Template, 10, 8, "tr", 194);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(16, WorkbenchDrawerComponent_div_21_ng_container_1_div_25_div_16_Template, 2, 0, "div", 195);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const data_r6 = \u0275\u0275nextContext(2).ngIf;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r6.virustotal);
    \u0275\u0275advance(14);
    \u0275\u0275property("ngForOf", (tmp_5_0 = data_r6.virustotal == null ? null : data_r6.virustotal.engine_results) !== null && tmp_5_0 !== void 0 ? tmp_5_0 : \u0275\u0275pureFunction0(3, _c05));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(data_r6.virustotal == null ? null : data_r6.virustotal.engine_results == null ? null : data_r6.virustotal.engine_results.length));
  }
}
function WorkbenchDrawerComponent_div_21_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 32)(2, "div", 33)(3, "div", 34)(4, "button", 35);
    \u0275\u0275listener("click", function WorkbenchDrawerComponent_div_21_ng_container_1_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.activeTab = "attack");
    });
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "\u2694");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " ATTACK PATH ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 35);
    \u0275\u0275listener("click", function WorkbenchDrawerComponent_div_21_ng_container_1_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.activeTab = "graph");
    });
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10, "\u2B21");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " RELATIONSHIP GRAPH ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 35);
    \u0275\u0275listener("click", function WorkbenchDrawerComponent_div_21_ng_container_1_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.activeTab = "shodan");
    });
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14, "\u{1F4E1}");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, " SHODAN ");
    \u0275\u0275template(16, WorkbenchDrawerComponent_div_21_ng_container_1_span_16_Template, 2, 1, "span", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 35);
    \u0275\u0275listener("click", function WorkbenchDrawerComponent_div_21_ng_container_1_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.activeTab = "vt");
    });
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19, "\u{1F6E1}");
    \u0275\u0275elementEnd();
    \u0275\u0275text(20, " VT VERDICTS ");
    \u0275\u0275template(21, WorkbenchDrawerComponent_div_21_ng_container_1_span_21_Template, 2, 1, "span", 37);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(22, WorkbenchDrawerComponent_div_21_ng_container_1_div_22_Template, 3, 2, "div", 38)(23, WorkbenchDrawerComponent_div_21_ng_container_1_ng_container_23_Template, 2, 2, "ng-container", 31)(24, WorkbenchDrawerComponent_div_21_ng_container_1_div_24_Template, 34, 14, "div", 39)(25, WorkbenchDrawerComponent_div_21_ng_container_1_div_25_Template, 17, 4, "div", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "div", 41);
    \u0275\u0275elementStart(27, "div", 42)(28, "div", 43);
    \u0275\u0275text(29, "NODE DETAIL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "app-node-detail-card", 44);
    \u0275\u0275listener("closed", function WorkbenchDrawerComponent_div_21_ng_container_1_Template_app_node_detail_card_closed_30_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectedNode = null);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "div", 45)(32, "app-execution-playbooks", 46);
    \u0275\u0275listener("playbookExecuted", function WorkbenchDrawerComponent_div_21_ng_container_1_Template_app_execution_playbooks_playbookExecuted_32_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onPlaybookExecuted($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const data_r6 = \u0275\u0275nextContext().ngIf;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r0.activeTab === "attack");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r0.activeTab === "graph");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r0.activeTab === "shodan");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", data_r6.shodan == null ? null : data_r6.shodan.total_ports);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r0.activeTab === "vt");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", data_r6.virustotal == null ? null : data_r6.virustotal.last_analysis_stats == null ? null : data_r6.virustotal.last_analysis_stats.malicious);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.activeTab === "attack");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.activeTab === "graph");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.activeTab === "shodan");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.activeTab === "vt");
    \u0275\u0275advance(5);
    \u0275\u0275property("node", ctx_r0.selectedNode);
    \u0275\u0275advance(2);
    \u0275\u0275property("ip", ctx_r0.ip);
  }
}
function WorkbenchDrawerComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275template(1, WorkbenchDrawerComponent_div_21_ng_container_1_Template, 33, 16, "ng-container", 31);
    \u0275\u0275pipe(2, "async");
    \u0275\u0275pipe(3, "async");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !\u0275\u0275pipeBind1(2, 1, ctx_r0.loading$) && !\u0275\u0275pipeBind1(3, 3, ctx_r0.error$));
  }
}
var WorkbenchDrawerComponent = class _WorkbenchDrawerComponent {
  constructor(osintService, cdr) {
    this.osintService = osintService;
    this.cdr = cdr;
    this.ip = null;
    this.event = null;
    this.drawerClosed = new EventEmitter();
    this.selectedNode = null;
    this.activeTab = "attack";
    this.isIpMitigated = false;
    this.data$ = this.osintService.data$;
    this.loading$ = this.osintService.loading$;
    this.error$ = this.osintService.error$;
  }
  ngOnChanges(changes) {
    if (changes["ip"] && this.ip) {
      this.selectedNode = null;
      this.isIpMitigated = false;
      this.activeTab = "attack";
      this.osintService.fetchForIp(this.ip).subscribe();
    }
  }
  onNodeSelected(node) {
    this.selectedNode = node;
    this.cdr.markForCheck();
  }
  onPlaybookExecuted(evt) {
    this.isIpMitigated = true;
    this.cdr.markForCheck();
  }
  retry() {
    if (this.ip)
      this.osintService.fetchForIp(this.ip).subscribe();
  }
  closeDrawer() {
    this.osintService.clear();
    this.drawerClosed.emit();
  }
  // ── Template helpers ────────────────────────────────────────────────────
  severityColor(sev) {
    switch (sev?.toLowerCase()) {
      case "critical":
        return "#ef4444";
      case "high":
        return "#f97316";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#22c55e";
      default:
        return "#7ba7cc";
    }
  }
  severityBg(sev) {
    switch (sev?.toLowerCase()) {
      case "critical":
        return "rgba(239,68,68,0.12)";
      case "high":
        return "rgba(249,115,22,0.12)";
      case "medium":
        return "rgba(245,158,11,0.12)";
      case "low":
        return "rgba(34,197,94,0.12)";
      default:
        return "rgba(123,167,204,0.08)";
    }
  }
  /** Computes port distribution data for the bar chart. */
  portChartBars(data) {
    const ports = data?.shodan?.open_ports ?? [];
    if (!ports.length)
      return [];
    const SERVICE_COLORS = {
      SSH: "#00bcd4",
      HTTP: "#4caf50",
      HTTPS: "#2196f3",
      FTP: "#ff9800",
      MySQL: "#9c27b0",
      Redis: "#f44336",
      SMB: "#e91e63",
      RDP: "#ff5722",
      DNS: "#00acc1"
    };
    const max2 = Math.max(...ports.map((p) => p.port), 1);
    return ports.map((p) => ({
      label: p.service ? `${p.port}/${p.service}` : `${p.port}/${p.protocol}`,
      value: p.port,
      pct: Math.max(20, Math.round(p.port / max2 * 100)),
      color: SERVICE_COLORS[p.service ?? ""] ?? "#00d4ff"
    }));
  }
  formatTimestamp(iso) {
    return new Date(iso).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
  }
  // ── SVG Chart helpers ───────────────────────────────────────────────────
  /**
   * Builds SVG arc-path segments for the VT donut chart.
   * Returns an array of { path, color, label, count } slices.
   */
  vtDonutSlices(data) {
    const stats = data?.virustotal?.last_analysis_stats;
    if (!stats)
      return [];
    const segments = [
      { label: "Malicious", count: stats.malicious ?? 0, color: "#ef4444" },
      { label: "Suspicious", count: stats.suspicious ?? 0, color: "#f59e0b" },
      { label: "Harmless", count: stats.harmless ?? 0, color: "#22c55e" },
      { label: "Undetected", count: stats.undetected ?? 0, color: "#334e68" }
    ];
    const total = segments.reduce((s, x3) => s + x3.count, 0) || 1;
    const cx = 80, cy = 80, R = 58, r = 34;
    let angle = -Math.PI / 2;
    const result = [];
    segments.forEach((seg) => {
      if (seg.count === 0)
        return;
      const slice = seg.count / total * 2 * Math.PI;
      const pct = Math.round(seg.count / total * 100);
      const x1 = cx + R * Math.cos(angle);
      const y1 = cy + R * Math.sin(angle);
      const x22 = cx + R * Math.cos(angle + slice);
      const y22 = cy + R * Math.sin(angle + slice);
      const ix1 = cx + r * Math.cos(angle + slice);
      const iy1 = cy + r * Math.sin(angle + slice);
      const ix2 = cx + r * Math.cos(angle);
      const iy2 = cy + r * Math.sin(angle);
      const large = slice > Math.PI ? 1 : 0;
      const path = [
        `M ${x1} ${y1}`,
        `A ${R} ${R} 0 ${large} 1 ${x22} ${y22}`,
        `L ${ix1} ${iy1}`,
        `A ${r} ${r} 0 ${large} 0 ${ix2} ${iy2}`,
        "Z"
      ].join(" ");
      result.push({ path, color: seg.color, label: seg.label, count: seg.count, pct });
      angle += slice;
    });
    return result;
  }
  /** Total VT engines analysed (for donut centre label). */
  vtTotal(data) {
    const s = data?.virustotal?.last_analysis_stats;
    if (!s)
      return 0;
    return (s.malicious ?? 0) + (s.suspicious ?? 0) + (s.harmless ?? 0) + (s.undetected ?? 0);
  }
  /**
   * Returns the SVG path for the risk-score gauge arc.
   * The gauge is a 180° semicircle; the fill arc covers (score/100) × 180°.
   */
  gaugeArcPath(score, filled) {
    const cx = 90, cy = 70, R = 60;
    const startAngle = Math.PI;
    const endAngle = filled ? Math.PI - score / 100 * Math.PI : 0;
    const x1 = cx + R * Math.cos(startAngle);
    const y1 = cy + R * Math.sin(startAngle);
    const x22 = cx + R * Math.cos(endAngle);
    const y22 = cy + R * Math.sin(endAngle);
    const large = filled ? score / 100 > 0.5 ? 1 : 0 : 1;
    const sweep = filled ? 0 : 1;
    return `M ${x1} ${y1} A ${R} ${R} 0 ${large} ${sweep} ${x22} ${y22}`;
  }
  /** Needle tip coords for the risk gauge. */
  gaugeNeedle(score) {
    const cx = 90, cy = 70, len = 52;
    const angle = Math.PI - score / 100 * Math.PI;
    return {
      x2: cx + len * Math.cos(angle),
      y2: cy + len * Math.sin(angle)
    };
  }
  gaugeColor(score) {
    if (score >= 80)
      return "#ef4444";
    if (score >= 60)
      return "#f97316";
    if (score >= 40)
      return "#f59e0b";
    if (score >= 20)
      return "#22c55e";
    return "#334e68";
  }
  /**
   * Horizontal bar chart data for open ports — used in the attack panel charts row.
   * Bars represent CVE exposure weight: ports with CVEs get a red fill, clean ports cyan.
   */
  attackPortBars(data) {
    const ports = data?.shodan?.open_ports ?? [];
    if (!ports.length)
      return [];
    const max2 = Math.max(...ports.map((p) => p.port), 1);
    return ports.map((p) => ({
      label: `${p.port}${p.service ? "/" + p.service : ""}`,
      cveCount: p.cves?.length ?? 0,
      pct: Math.max(15, Math.round(p.port / max2 * 100)),
      color: (p.cves?.length ?? 0) > 0 ? "#ef4444" : "#00bcd4"
    }));
  }
  static {
    this.\u0275fac = function WorkbenchDrawerComponent_Factory(t) {
      return new (t || _WorkbenchDrawerComponent)(\u0275\u0275directiveInject(OsintService), \u0275\u0275directiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WorkbenchDrawerComponent, selectors: [["app-workbench-drawer"]], inputs: { ip: "ip", event: "event" }, outputs: { drawerClosed: "drawerClosed" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 24, vars: 15, consts: [["noPorts", ""], ["noCve", ""], [1, "drawer-backdrop", 3, "click"], [1, "drawer-panel"], [1, "drawer-header"], [1, "drawer-title"], [1, "drawer-icon"], [1, "drawer-heading"], [1, "drawer-subheading"], ["class", "event-meta-strip", 4, "ngIf"], ["class", "risk-badge", 3, "class", 4, "ngIf"], ["class", "risk-badge risk-mitigated", 4, "ngIf"], ["title", "Close workbench", 1, "close-btn", 3, "click"], ["class", "drawer-loading", 4, "ngIf"], ["class", "drawer-error", 4, "ngIf"], ["class", "drawer-body", 4, "ngIf"], [1, "d3-tooltip"], [1, "event-meta-strip"], [1, "ev-chip", "ev-attack"], [1, "ev-chip", "ev-sev"], [1, "ev-chip", "ev-pkts"], [1, "ev-chip", "ev-time"], [1, "risk-badge"], [1, "risk-score"], [1, "risk-badge", "risk-mitigated"], [1, "drawer-loading"], [1, "spinner"], [1, "drawer-loading-detail"], [1, "drawer-error"], [3, "click"], [1, "drawer-body"], [4, "ngIf"], [1, "split-pane"], [1, "pane-graph"], [1, "tab-bar"], [1, "tab-btn", 3, "click"], ["class", "tab-badge tab-badge-info", 4, "ngIf"], ["class", "tab-badge tab-badge-danger", 4, "ngIf"], ["class", "attack-panel", 4, "ngIf"], ["class", "shodan-panel", 4, "ngIf"], ["class", "vt-panel", 4, "ngIf"], [1, "resize-handle"], [1, "pane-detail"], [1, "pane-label"], [3, "closed", "node"], [1, "pane-playbooks"], [3, "playbookExecuted", "ip"], [1, "tab-badge", "tab-badge-info"], [1, "tab-badge", "tab-badge-danger"], [1, "attack-panel"], ["class", "attack-no-event", 4, "ngIf"], [1, "attack-no-event"], [1, "attack-no-icon"], [1, "muted"], [1, "attack-flow"], [1, "flow-node", "flow-source"], [1, "flow-node-icon"], [1, "flow-node-label"], [1, "flow-node-ip"], [1, "flow-node-country"], ["class", "flow-node-risk risk-badge-sm", 3, "class", 4, "ngIf"], [1, "flow-arrow-group"], [1, "flow-arrow-line"], [1, "flow-arrow-beam"], [1, "flow-arrow-head"], [1, "flow-attack-label"], [1, "attack-type-badge"], [1, "attack-sev-dot"], [1, "attack-sev-text"], [1, "flow-node", "flow-target"], [1, "flow-node-tag"], [3, "event"], [1, "attack-meta-grid"], [1, "meta-card"], [1, "meta-card-icon"], [1, "meta-card-body"], [1, "meta-card-label"], [1, "meta-card-value"], ["class", "attack-desc", 4, "ngIf"], ["class", "charts-row", 4, "ngIf"], ["class", "attack-vt-summary", 4, "ngIf"], ["class", "attack-ports-summary", 4, "ngIf"], [1, "flow-node-risk", "risk-badge-sm"], [1, "attack-desc"], [1, "attack-desc-label"], [1, "attack-desc-text"], [1, "charts-row"], [1, "chart-card"], [1, "chart-card-label"], [1, "chart-card-body", "donut-wrap"], ["viewBox", "0 0 160 160", 1, "donut-svg"], [4, "ngFor", "ngForOf"], ["x", "80", "y", "76", "text-anchor", "middle", 1, "donut-centre-num"], ["x", "80", "y", "91", "text-anchor", "middle", 1, "donut-centre-lbl"], [1, "donut-legend"], [1, "chart-card-body", "gauge-wrap"], ["viewBox", "0 0 180 100", 1, "gauge-svg"], ["fill", "none", "stroke", "rgba(255,255,255,0.08)", "stroke-width", "14", "stroke-linecap", "round"], ["fill", "none", "stroke-width", "14", "stroke-linecap", "round", 1, "gauge-fill-arc"], ["x1", "90", "y1", "70", "stroke-width", "2.5", "stroke-linecap", "round", 1, "gauge-needle"], ["cx", "90", "cy", "70", "r", "5"], ["x", "90", "y", "58", "text-anchor", "middle", 1, "gauge-score"], ["x", "90", "y", "90", "text-anchor", "middle", 1, "gauge-label"], ["x", "28", "y", "82", 1, "gauge-range-lbl"], ["x", "148", "y", "82", 1, "gauge-range-lbl"], [1, "gauge-level"], [1, "chart-card", "chart-card-wide"], [1, "chart-card-body"], ["class", "port-bars", 4, "ngIf", "ngIfElse"], [1, "donut-slice"], [1, "donut-legend-row"], [1, "donut-legend-dot"], [1, "donut-legend-label"], [1, "donut-legend-val"], [1, "port-bars"], [1, "port-bar-row"], [1, "port-bar-label"], [1, "port-bar-track"], [1, "port-bar-fill"], ["class", "port-bar-cve", 4, "ngIf"], [1, "port-bar-cve"], [1, "chart-empty"], [1, "attack-vt-summary"], [1, "attack-vt-label"], [1, "attack-vt-row"], [1, "avt-pill", "avt-mal"], [1, "avt-num"], [1, "avt-lbl"], [1, "avt-pill", "avt-sus"], [1, "avt-pill", "avt-safe"], ["class", "avt-pill avt-info", 4, "ngIf"], [1, "avt-pill", "avt-info"], [1, "attack-ports-summary"], [1, "attack-ports-row"], [1, "port-chip"], ["class", "port-service", 4, "ngIf"], ["class", "cve-badge", 4, "ngIf"], [1, "port-service"], [1, "cve-badge"], [3, "nodeSelected", "graph", "mitigated"], [1, "shodan-panel"], [1, "shodan-info-bar"], ["class", "shodan-info-card", 4, "ngIf"], ["class", "shodan-tags", 4, "ngIf"], ["class", "shodan-chart-section", 4, "ngIf"], ["class", "shodan-section-label", 4, "ngIf"], [1, "shodan-services-grid"], ["class", "shodan-service-card", 4, "ngFor", "ngForOf"], [1, "shodan-section-label", 2, "margin-top", "16px"], [1, "shodan-table-wrap"], [1, "shodan-table"], [3, "row-cve", 4, "ngFor", "ngForOf"], ["class", "shodan-empty", 4, "ngIf"], [1, "shodan-info-card"], [1, "si-icon"], [1, "si-label"], [1, "si-value"], [1, "shodan-tags"], ["class", "shodan-tag", 4, "ngFor", "ngForOf"], [1, "shodan-tag"], [1, "shodan-chart-section"], [1, "shodan-section-label"], [1, "shodan-bar-chart"], ["class", "chart-bar-row", 4, "ngFor", "ngForOf"], [1, "chart-bar-row"], [1, "chart-bar-label"], [1, "chart-bar-track"], [1, "chart-bar-fill"], [1, "chart-bar-val"], [1, "shodan-service-card"], [1, "svc-header"], [1, "svc-port-badge"], [1, "svc-proto"], [1, "svc-name"], ["class", "svc-product", 4, "ngIf"], ["class", "svc-cves", 4, "ngIf"], ["class", "svc-banner", 4, "ngIf"], [1, "svc-product"], ["class", "svc-version", 4, "ngIf"], [1, "svc-version"], [1, "svc-cves"], ["class", "cve-pill", 4, "ngFor", "ngForOf"], [1, "cve-pill"], [1, "svc-banner"], [1, "banner-text"], [1, "mono", "port-num"], [1, "mono", "muted"], [1, "svc-cell"], [4, "ngIf", "ngIfElse"], [1, "shodan-empty"], [1, "vt-panel"], ["class", "vt-summary", 4, "ngIf"], [1, "vt-table-wrap"], [1, "vt-table"], [3, "class", 4, "ngFor", "ngForOf"], ["class", "vt-empty", 4, "ngIf"], [1, "vt-summary"], [1, "vt-stat", "vt-malicious"], [1, "vt-stat-val"], [1, "vt-stat-lbl"], [1, "vt-stat", "vt-suspicious"], [1, "vt-stat", "vt-harmless"], [1, "vt-stat", "vt-undetected"], ["class", "vt-meta", 4, "ngIf"], [1, "vt-meta"], [1, "vt-meta-pill"], ["class", "vt-meta-pill", 4, "ngIf"], [3, "class", 4, "ngIf"], [1, "eng-name"], [1, "vt-verdict"], [1, "eng-result"], [1, "eng-method", "muted"], [1, "vt-empty"]], template: function WorkbenchDrawerComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 2);
        \u0275\u0275listener("click", function WorkbenchDrawerComponent_Template_div_click_0_listener() {
          return ctx.closeDrawer();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(1, "div", 3)(2, "header", 4)(3, "div", 5)(4, "span", 6);
        \u0275\u0275text(5, "\u{1F52C}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div")(7, "div", 7);
        \u0275\u0275text(8, "OSINT INVESTIGATION WORKBENCH");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 8);
        \u0275\u0275text(10);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(11, WorkbenchDrawerComponent_div_11_Template, 10, 12, "div", 9)(12, WorkbenchDrawerComponent_div_12_Template, 4, 4, "div", 10);
        \u0275\u0275pipe(13, "async");
        \u0275\u0275template(14, WorkbenchDrawerComponent_div_14_Template, 2, 0, "div", 11);
        \u0275\u0275elementStart(15, "button", 12);
        \u0275\u0275listener("click", function WorkbenchDrawerComponent_Template_button_click_15_listener() {
          return ctx.closeDrawer();
        });
        \u0275\u0275text(16, "\u2715");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(17, WorkbenchDrawerComponent_div_17_Template, 6, 1, "div", 13);
        \u0275\u0275pipe(18, "async");
        \u0275\u0275template(19, WorkbenchDrawerComponent_div_19_Template, 7, 1, "div", 14);
        \u0275\u0275pipe(20, "async");
        \u0275\u0275template(21, WorkbenchDrawerComponent_div_21_Template, 4, 5, "div", 15);
        \u0275\u0275pipe(22, "async");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "div", 16);
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275textInterpolate(ctx.ip);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.event);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(13, 7, ctx.data$));
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.isIpMitigated);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(18, 9, ctx.loading$));
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(20, 11, ctx.error$));
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(22, 13, ctx.data$));
      }
    }, dependencies: [
      CommonModule,
      NgForOf,
      NgIf,
      AsyncPipe,
      SlicePipe,
      DecimalPipe,
      DatePipe,
      OsintGraphComponent,
      NodeDetailCardComponent,
      ExecutionPlaybooksComponent,
      AttackMapComponent
    ], styles: ['\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 900;\n  background: rgba(2, 8, 20, 0.75);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  animation: _ngcontent-%COMP%_fadeIn .2s ease;\n}\n.drawer-panel[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: min(96vw, 1400px);\n  z-index: 901;\n  background: var(--bg-secondary);\n  border-left: 1px solid var(--border-bright);\n  box-shadow: -12px 0 60px rgba(0, 0, 0, 0.8), -1px 0 0 rgba(0, 212, 255, 0.1);\n  display: flex;\n  flex-direction: column;\n  animation: _ngcontent-%COMP%_slideIn .28s cubic-bezier(.16, 1, .3, 1);\n}\n@keyframes _ngcontent-%COMP%_slideIn {\n  from {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.drawer-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 14px 20px;\n  background:\n    linear-gradient(\n      180deg,\n      var(--bg-card) 0%,\n      var(--bg-secondary) 100%);\n  border-bottom: 1px solid var(--border-bright);\n  flex-shrink: 0;\n  position: relative;\n}\n.drawer-header[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      var(--accent-cyan),\n      transparent);\n  opacity: 0.4;\n}\n.drawer-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex: 1;\n  min-width: 0;\n}\n.drawer-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.drawer-heading[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  font-family: var(--font-mono);\n  color: var(--text-primary);\n  letter-spacing: .12em;\n}\n.drawer-subheading[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-family: var(--font-mono);\n  color: var(--accent-cyan);\n  margin-top: 2px;\n  text-shadow: 0 0 12px rgba(0, 212, 255, 0.4);\n}\n.risk-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  padding: 5px 14px;\n  border-radius: 4px;\n  font-family: var(--font-mono);\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: .08em;\n  flex-shrink: 0;\n  border: 1px solid;\n}\n.risk-score[_ngcontent-%COMP%] {\n  opacity: .65;\n  font-weight: 400;\n  margin-left: 4px;\n}\n.risk-critical[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, .15);\n  border-color: #ef4444;\n  color: #ef4444;\n  box-shadow: 0 0 12px rgba(239, 68, 68, .2);\n}\n.risk-high[_ngcontent-%COMP%] {\n  background: rgba(249, 115, 22, .15);\n  border-color: #f97316;\n  color: #f97316;\n  box-shadow: 0 0 12px rgba(249, 115, 22, .2);\n}\n.risk-medium[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, .15);\n  border-color: #f59e0b;\n  color: #f59e0b;\n}\n.risk-low[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, .15);\n  border-color: #22c55e;\n  color: #22c55e;\n}\n.risk-none[_ngcontent-%COMP%] {\n  background: rgba(123, 167, 204, .1);\n  border-color: #7ba7cc;\n  color: #7ba7cc;\n}\n.risk-mitigated[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, .15);\n  border-color: #22c55e;\n  color: #22c55e;\n  box-shadow: 0 0 14px rgba(34, 197, 94, .25);\n}\n.close-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: 1px solid var(--border);\n  color: var(--text-muted);\n  border-radius: 4px;\n  width: 30px;\n  height: 30px;\n  cursor: pointer;\n  font-size: 13px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: all .15s;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  border-color: #ef4444;\n  color: #ef4444;\n  background: rgba(239, 68, 68, .08);\n}\n.drawer-loading[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 16px;\n  color: var(--text-secondary);\n  font-family: var(--font-mono);\n  font-size: 13px;\n}\n.drawer-loading-detail[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-muted);\n  margin-top: -8px;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 50%;\n  border: 2px solid var(--border);\n  border-top-color: var(--accent-cyan);\n  animation: _ngcontent-%COMP%_spin .8s linear infinite;\n  box-shadow: 0 0 16px rgba(0, 212, 255, 0.2);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.drawer-error[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  color: #ef4444;\n  font-family: var(--font-mono);\n  font-size: 13px;\n}\n.drawer-error[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.drawer-error[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-size: 12px;\n  max-width: 400px;\n  text-align: center;\n  line-height: 1.6;\n}\n.drawer-error[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 8px 24px;\n  background: rgba(239, 68, 68, .1);\n  border: 1px solid #ef4444;\n  color: #ef4444;\n  border-radius: 4px;\n  cursor: pointer;\n  font-family: var(--font-mono);\n  font-size: 12px;\n  transition: background .15s;\n  letter-spacing: .06em;\n}\n.drawer-error[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background: rgba(239, 68, 68, .2);\n}\n.drawer-body[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  min-height: 0;\n}\n.split-pane[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  overflow: hidden;\n  min-height: 0;\n}\n.pane-graph[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  min-height: 0;\n  border-right: 1px solid var(--border);\n}\n.pane-graph[_ngcontent-%COMP%]   app-osint-graph[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n}\n.pane-detail[_ngcontent-%COMP%] {\n  width: 360px;\n  flex-shrink: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background: var(--bg-secondary);\n}\n.pane-label[_ngcontent-%COMP%] {\n  font-size: 9px;\n  letter-spacing: .16em;\n  color: var(--text-muted);\n  font-family: var(--font-mono);\n  text-transform: uppercase;\n  padding: 7px 14px;\n  background: var(--bg-primary);\n  border-bottom: 1px solid var(--border);\n  flex-shrink: 0;\n}\n.resize-handle[_ngcontent-%COMP%] {\n  width: 4px;\n  flex-shrink: 0;\n  background: var(--border);\n  cursor: col-resize;\n  transition: background .15s;\n}\n.resize-handle[_ngcontent-%COMP%]:hover {\n  background: var(--accent-cyan);\n}\n.pane-playbooks[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  max-height: 280px;\n  overflow-y: auto;\n  border-top: 1px solid var(--border-bright);\n}\n[_nghost-%COMP%]     .d3-tooltip {\n  display: none;\n  position: fixed;\n  z-index: 9999;\n  background: var(--bg-card);\n  border: 1px solid var(--border-bright);\n  color: var(--text-primary);\n  padding: 8px 12px;\n  border-radius: 4px;\n  font-family: var(--font-mono);\n  font-size: 11px;\n  pointer-events: none;\n  box-shadow: 0 6px 20px rgba(0, 0, 0, .5);\n  max-width: 240px;\n  white-space: normal;\n  line-height: 1.6;\n}\n.tab-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-shrink: 0;\n  background: var(--bg-primary);\n  border-bottom: 1px solid var(--border);\n}\n.tab-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  padding: 9px 18px;\n  background: none;\n  border: none;\n  border-bottom: 2px solid transparent;\n  color: var(--text-muted);\n  font-family: var(--font-mono);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.1em;\n  cursor: pointer;\n  transition: all 0.15s;\n  white-space: nowrap;\n}\n.tab-btn[_ngcontent-%COMP%]:hover {\n  color: var(--text-secondary);\n}\n.tab-btn.active[_ngcontent-%COMP%] {\n  color: var(--accent-cyan);\n  border-bottom-color: var(--accent-cyan);\n}\n.tab-badge[_ngcontent-%COMP%] {\n  padding: 2px 7px;\n  border-radius: 3px;\n  font-size: 9px;\n  font-weight: 700;\n}\n.tab-badge-danger[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, .15);\n  color: #ef4444;\n  border: 1px solid rgba(239, 68, 68, .3);\n}\n.tab-badge-info[_ngcontent-%COMP%] {\n  background: rgba(0, 188, 212, .12);\n  color: #00bcd4;\n  border: 1px solid rgba(0, 188, 212, .25);\n}\n.vt-panel[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  min-height: 0;\n}\n.vt-summary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 12px 16px;\n  background: var(--bg-card);\n  border-bottom: 1px solid var(--border);\n  flex-shrink: 0;\n  flex-wrap: wrap;\n}\n.vt-stat[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 6px 14px;\n  border-radius: var(--radius-sm);\n  border: 1px solid;\n  min-width: 70px;\n}\n.vt-stat-val[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 22px;\n  font-weight: 700;\n  line-height: 1;\n}\n.vt-stat-lbl[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 9px;\n  letter-spacing: .1em;\n  margin-top: 3px;\n  text-transform: uppercase;\n}\n.vt-malicious[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, .1);\n  border-color: rgba(239, 68, 68, .4);\n  color: #ef4444;\n}\n.vt-suspicious[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, .1);\n  border-color: rgba(245, 158, 11, .4);\n  color: #f59e0b;\n}\n.vt-harmless[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, .1);\n  border-color: rgba(34, 197, 94, .4);\n  color: #22c55e;\n}\n.vt-undetected[_ngcontent-%COMP%] {\n  background: rgba(123, 167, 204, .08);\n  border-color: rgba(123, 167, 204, .2);\n  color: #7ba7cc;\n}\n.vt-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n  margin-left: auto;\n}\n.vt-meta-pill[_ngcontent-%COMP%] {\n  padding: 3px 9px;\n  border-radius: 3px;\n  font-size: 10px;\n  font-family: var(--font-mono);\n  background: rgba(0, 212, 255, .07);\n  border: 1px solid rgba(0, 212, 255, .15);\n  color: var(--text-secondary);\n}\n.vt-table-wrap[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n}\n.vt-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 12px;\n}\n.vt-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  background: var(--bg-secondary);\n}\n.vt-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 7px 14px;\n  text-align: left;\n  font-family: var(--font-mono);\n  font-size: 10px;\n  letter-spacing: .1em;\n  color: var(--text-muted);\n  border-bottom: 1px solid var(--border);\n  font-weight: 600;\n}\n.vt-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 6px 14px;\n  border-bottom: 1px solid rgba(26, 58, 92, .3);\n  vertical-align: middle;\n}\n.vt-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.vt-row-malicious[_ngcontent-%COMP%] {\n  border-left: 2px solid #ef4444;\n}\n.vt-row-suspicious[_ngcontent-%COMP%] {\n  border-left: 2px solid #f59e0b;\n}\n.vt-row-harmless[_ngcontent-%COMP%] {\n  border-left: 2px solid transparent;\n}\n.eng-name[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  color: var(--text-primary);\n  font-weight: 500;\n}\n.eng-result[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  color: #ef4444;\n  font-size: 11px;\n}\n.eng-method[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 10px;\n}\n.muted[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n}\n.vt-verdict[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 8px;\n  border-radius: 3px;\n  font-family: var(--font-mono);\n  font-size: 10px;\n  font-weight: 700;\n  text-transform: uppercase;\n}\n.verdict-malicious[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, .15);\n  color: #ef4444;\n  border: 1px solid rgba(239, 68, 68, .3);\n}\n.verdict-suspicious[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, .15);\n  color: #f59e0b;\n  border: 1px solid rgba(245, 158, 11, .3);\n}\n.verdict-harmless[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, .1);\n  color: #22c55e;\n  border: 1px solid rgba(34, 197, 94, .2);\n}\n.verdict-undetected[_ngcontent-%COMP%] {\n  background: rgba(123, 167, 204, .08);\n  color: #7ba7cc;\n  border: 1px solid rgba(123, 167, 204, .15);\n}\n.vt-empty[_ngcontent-%COMP%] {\n  padding: 32px;\n  text-align: center;\n  color: var(--text-muted);\n  font-family: var(--font-mono);\n  font-size: 12px;\n}\n.event-meta-strip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex-wrap: wrap;\n  flex: 1;\n  padding: 0 4px;\n}\n.ev-chip[_ngcontent-%COMP%] {\n  padding: 3px 9px;\n  border-radius: 3px;\n  font-size: 10px;\n  font-family: var(--font-mono);\n  font-weight: 600;\n  letter-spacing: 0.06em;\n  border: 1px solid;\n  white-space: nowrap;\n}\n.ev-attack[_ngcontent-%COMP%] {\n  background: rgba(0, 212, 255, 0.08);\n  border-color: rgba(0, 212, 255, 0.25);\n  color: var(--accent-cyan);\n}\n.ev-pkts[_ngcontent-%COMP%] {\n  background: rgba(123, 167, 204, 0.07);\n  border-color: rgba(123, 167, 204, 0.2);\n  color: var(--text-secondary);\n}\n.ev-time[_ngcontent-%COMP%] {\n  background: rgba(123, 167, 204, 0.04);\n  border-color: rgba(123, 167, 204, 0.12);\n  color: var(--text-muted);\n  font-size: 9px;\n}\n.ev-sev[_ngcontent-%COMP%] {\n  font-size: 10px;\n}\n.attack-panel[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  padding: 20px;\n  gap: 18px;\n  min-height: 0;\n}\n.attack-no-event[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  color: var(--text-muted);\n  font-family: var(--font-mono);\n  font-size: 13px;\n}\n.attack-no-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  opacity: 0.4;\n}\n.attack-flow[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0;\n  padding: 24px 16px;\n  background: var(--bg-primary);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-lg);\n}\n.flow-node[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  min-width: 130px;\n  padding: 16px;\n  border-radius: var(--radius-lg);\n  border: 1px solid;\n  transition: box-shadow 0.3s;\n}\n.flow-source[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.07);\n  border-color: rgba(239, 68, 68, 0.3);\n  box-shadow: 0 0 20px rgba(239, 68, 68, 0.1);\n}\n.flow-target[_ngcontent-%COMP%] {\n  background: rgba(0, 212, 255, 0.06);\n  border-color: rgba(0, 212, 255, 0.25);\n  box-shadow: 0 0 20px rgba(0, 212, 255, 0.08);\n}\n.flow-node-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n.flow-node-label[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-family: var(--font-mono);\n  color: var(--text-muted);\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n}\n.flow-node-ip[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-family: var(--font-mono);\n  color: var(--text-primary);\n  font-weight: 700;\n}\n.flow-node-country[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-family: var(--font-mono);\n  color: var(--text-secondary);\n}\n.flow-node-tag[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-family: var(--font-mono);\n  color: var(--accent-cyan);\n  letter-spacing: 0.1em;\n}\n.risk-badge-sm[_ngcontent-%COMP%] {\n  padding: 2px 8px;\n  border-radius: 3px;\n  font-size: 9px;\n  font-family: var(--font-mono);\n  font-weight: 700;\n  border: 1px solid;\n}\n.flow-arrow-group[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  padding: 0 8px;\n  min-width: 120px;\n}\n.flow-arrow-line[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  width: 100%;\n}\n.flow-arrow-beam[_ngcontent-%COMP%] {\n  height: 2px;\n  flex: 1;\n  animation: _ngcontent-%COMP%_beamPulse 1.6s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_beamPulse {\n  0%, 100% {\n    opacity: 0.5;\n  }\n  50% {\n    opacity: 1;\n  }\n}\n.flow-arrow-head[_ngcontent-%COMP%] {\n  width: 0;\n  height: 0;\n  border-top: 7px solid transparent;\n  border-bottom: 7px solid transparent;\n  border-left-width: 12px;\n  border-left-style: solid;\n}\n.flow-attack-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.attack-type-badge[_ngcontent-%COMP%] {\n  padding: 3px 10px;\n  border-radius: 4px;\n  font-size: 10px;\n  font-family: var(--font-mono);\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  border: 1px solid;\n}\n.attack-sev-dot[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n}\n.attack-sev-text[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-family: var(--font-mono);\n  font-weight: 700;\n}\n.attack-meta-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\n  gap: 10px;\n}\n.meta-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 12px 14px;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-sm);\n  transition: border-color 0.15s;\n}\n.meta-card[_ngcontent-%COMP%]:hover {\n  border-color: rgba(0, 212, 255, 0.25);\n}\n.meta-card-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.meta-card-label[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-family: var(--font-mono);\n  color: var(--text-muted);\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  margin-bottom: 3px;\n}\n.meta-card-value[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-family: var(--font-mono);\n  color: var(--text-primary);\n  font-weight: 600;\n}\n.attack-desc[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-sm);\n}\n.attack-desc-label[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-family: var(--font-mono);\n  color: var(--text-muted);\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  margin-bottom: 8px;\n}\n.attack-desc-text[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  line-height: 1.6;\n  margin: 0;\n}\n.attack-vt-summary[_ngcontent-%COMP%], .attack-ports-summary[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-sm);\n}\n.attack-vt-label[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-family: var(--font-mono);\n  color: var(--text-muted);\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  margin-bottom: 10px;\n}\n.attack-vt-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.avt-pill[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 6px 14px;\n  border-radius: var(--radius-sm);\n  border: 1px solid;\n  min-width: 64px;\n}\n.avt-num[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-family: var(--font-mono);\n  font-weight: 700;\n  line-height: 1;\n}\n.avt-lbl[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-family: var(--font-mono);\n  color: var(--text-muted);\n  margin-top: 3px;\n  text-transform: uppercase;\n}\n.avt-mal[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.1);\n  border-color: rgba(239, 68, 68, 0.35);\n  color: #ef4444;\n}\n.avt-sus[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.1);\n  border-color: rgba(245, 158, 11, 0.35);\n  color: #f59e0b;\n}\n.avt-safe[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.1);\n  border-color: rgba(34, 197, 94, 0.35);\n  color: #22c55e;\n}\n.avt-info[_ngcontent-%COMP%] {\n  background: rgba(0, 212, 255, 0.07);\n  border-color: rgba(0, 212, 255, 0.2);\n  color: var(--accent-cyan);\n}\n.attack-ports-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n  flex-wrap: wrap;\n}\n.port-chip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  padding: 4px 10px;\n  background: rgba(0, 188, 212, 0.07);\n  border: 1px solid rgba(0, 188, 212, 0.2);\n  border-radius: 4px;\n  font-size: 11px;\n  font-family: var(--font-mono);\n  color: #00bcd4;\n}\n.port-chip-cve[_ngcontent-%COMP%] {\n  border-color: rgba(239, 68, 68, 0.35);\n  background: rgba(239, 68, 68, 0.07);\n  color: #ef4444;\n}\n.port-service[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: var(--text-muted);\n}\n.cve-badge[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #ef4444;\n  background: rgba(239, 68, 68, 0.15);\n  padding: 1px 5px;\n  border-radius: 3px;\n}\n.shodan-panel[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  padding: 16px;\n  gap: 14px;\n  min-height: 0;\n}\n.shodan-info-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n.shodan-info-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 9px;\n  padding: 10px 14px;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-sm);\n  min-width: 140px;\n  flex: 1;\n}\n.si-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  flex-shrink: 0;\n}\n.si-label[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-family: var(--font-mono);\n  color: var(--text-muted);\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  margin-bottom: 3px;\n}\n.si-value[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-family: var(--font-mono);\n  color: var(--text-primary);\n  font-weight: 600;\n}\n.shodan-tags[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.shodan-tag[_ngcontent-%COMP%] {\n  padding: 3px 9px;\n  border-radius: 3px;\n  font-size: 10px;\n  font-family: var(--font-mono);\n  color: var(--accent-cyan);\n  background: rgba(0, 212, 255, 0.08);\n  border: 1px solid rgba(0, 212, 255, 0.2);\n}\n.shodan-section-label[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-family: var(--font-mono);\n  color: var(--text-muted);\n  letter-spacing: 0.15em;\n  text-transform: uppercase;\n  padding: 4px 0;\n  border-bottom: 1px solid var(--border);\n  margin-bottom: 2px;\n}\n.shodan-chart-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.shodan-bar-chart[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.chart-bar-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.chart-bar-label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-family: var(--font-mono);\n  color: var(--text-secondary);\n  min-width: 100px;\n  text-align: right;\n  flex-shrink: 0;\n}\n.chart-bar-track[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 12px;\n  background: rgba(255, 255, 255, 0.04);\n  border-radius: 3px;\n  overflow: hidden;\n}\n.chart-bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 3px;\n  transition: width 0.5s ease;\n}\n.chart-bar-val[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-family: var(--font-mono);\n  min-width: 40px;\n  font-weight: 700;\n}\n.shodan-services-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n  gap: 10px;\n}\n.shodan-service-card[_ngcontent-%COMP%] {\n  padding: 12px 14px;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-sm);\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  transition: border-color 0.15s;\n}\n.shodan-service-card[_ngcontent-%COMP%]:hover {\n  border-color: rgba(0, 188, 212, 0.3);\n}\n.svc-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.svc-port-badge[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-family: var(--font-mono);\n  font-weight: 700;\n  color: #00bcd4;\n  background: rgba(0, 188, 212, 0.1);\n  padding: 3px 8px;\n  border-radius: 4px;\n  border: 1px solid rgba(0, 188, 212, 0.25);\n}\n.svc-proto[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: var(--text-muted);\n  font-weight: 400;\n}\n.svc-name[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-family: var(--font-mono);\n  color: var(--text-primary);\n  font-weight: 600;\n}\n.svc-product[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-family: var(--font-mono);\n  color: var(--text-secondary);\n  margin-left: auto;\n}\n.svc-version[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  margin-left: 4px;\n}\n.svc-cves[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 5px;\n  flex-wrap: wrap;\n}\n.cve-pill[_ngcontent-%COMP%] {\n  padding: 2px 7px;\n  border-radius: 3px;\n  font-size: 9px;\n  font-family: var(--font-mono);\n  font-weight: 700;\n  background: rgba(239, 68, 68, 0.12);\n  color: #ef4444;\n  border: 1px solid rgba(239, 68, 68, 0.3);\n}\n.svc-banner[_ngcontent-%COMP%] {\n  padding: 6px 8px;\n  background: rgba(0, 0, 0, 0.25);\n  border-radius: 3px;\n  border: 1px solid rgba(255, 255, 255, 0.04);\n}\n.banner-text[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-family: var(--font-mono);\n  color: var(--text-muted);\n  word-break: break-all;\n}\n.shodan-table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.shodan-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 12px;\n}\n.shodan-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  background: var(--bg-secondary);\n}\n.shodan-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 7px 12px;\n  text-align: left;\n  font-family: var(--font-mono);\n  font-size: 10px;\n  letter-spacing: 0.1em;\n  color: var(--text-muted);\n  border-bottom: 1px solid var(--border);\n  font-weight: 600;\n}\n.shodan-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-bottom: 1px solid rgba(26, 58, 92, 0.3);\n  vertical-align: middle;\n}\n.shodan-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: var(--bg-card-hover);\n}\n.row-cve[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n  border-left: 2px solid #ef4444;\n}\n.port-num[_ngcontent-%COMP%] {\n  color: #00bcd4;\n  font-weight: 700;\n}\n.svc-cell[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n  font-family: var(--font-mono);\n}\n.shodan-empty[_ngcontent-%COMP%] {\n  padding: 32px;\n  text-align: center;\n  color: var(--text-muted);\n  font-family: var(--font-mono);\n  font-size: 12px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n}\n.shodan-empty[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 28px;\n  opacity: 0.4;\n}\n.charts-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.chart-card[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 200px;\n  background: var(--bg-primary);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-lg);\n  padding: 14px 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  overflow: hidden;\n}\n.chart-card-wide[_ngcontent-%COMP%] {\n  flex: 2;\n  min-width: 260px;\n}\n.chart-card-label[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-family: var(--font-mono);\n  color: var(--text-muted);\n  letter-spacing: 0.16em;\n  text-transform: uppercase;\n  padding-bottom: 6px;\n  border-bottom: 1px solid var(--border);\n}\n.chart-card-body[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.donut-wrap[_ngcontent-%COMP%] {\n  align-items: flex-start;\n}\n.donut-svg[_ngcontent-%COMP%] {\n  width: 120px;\n  height: 120px;\n  flex-shrink: 0;\n}\n.donut-slice[_ngcontent-%COMP%] {\n  transition: opacity 0.2s;\n  stroke: var(--bg-primary);\n  stroke-width: 2;\n}\n.donut-slice[_ngcontent-%COMP%]:hover {\n  opacity: 1 !important;\n  filter: brightness(1.15);\n}\n.donut-centre-num[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 22px;\n  font-weight: 700;\n  fill: var(--text-primary);\n}\n.donut-centre-lbl[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 8px;\n  letter-spacing: 0.12em;\n  fill: var(--text-muted);\n  text-transform: uppercase;\n}\n.donut-legend[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.donut-legend-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-family: var(--font-mono);\n  font-size: 10px;\n}\n.donut-legend-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.donut-legend-label[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  flex: 1;\n}\n.donut-legend-val[_ngcontent-%COMP%] {\n  font-weight: 700;\n  min-width: 20px;\n  text-align: right;\n}\n.gauge-wrap[_ngcontent-%COMP%] {\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n}\n.gauge-svg[_ngcontent-%COMP%] {\n  width: 180px;\n  height: 100px;\n  overflow: visible;\n}\n.gauge-fill-arc[_ngcontent-%COMP%] {\n  transition: stroke-dashoffset 0.8s cubic-bezier(.4, 0, .2, 1);\n}\n.gauge-needle[_ngcontent-%COMP%] {\n  transform-origin: 90px 70px;\n  transition: transform 0.8s cubic-bezier(.4, 0, .2, 1);\n}\n.gauge-score[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 18px;\n  font-weight: 700;\n}\n.gauge-label[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 9px;\n  letter-spacing: 0.1em;\n  fill: var(--text-muted);\n}\n.gauge-range-lbl[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 8px;\n  fill: var(--text-muted);\n}\n.gauge-level[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  text-align: center;\n}\n.port-bars[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  width: 100%;\n}\n.port-bar-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.port-bar-label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-family: var(--font-mono);\n  font-weight: 600;\n  min-width: 90px;\n  text-align: right;\n  flex-shrink: 0;\n}\n.port-bar-track[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 18px;\n  background: rgba(255, 255, 255, 0.04);\n  border-radius: 4px;\n  overflow: hidden;\n  position: relative;\n}\n.port-bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 4px;\n  opacity: 0.75;\n  transition: width 0.6s ease;\n}\n.port-bar-cve[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 6px;\n  top: 50%;\n  transform: translateY(-50%);\n  font-size: 9px;\n  font-family: var(--font-mono);\n  font-weight: 700;\n  color: #fff;\n  background: rgba(239, 68, 68, 0.7);\n  padding: 1px 5px;\n  border-radius: 3px;\n  pointer-events: none;\n}\n.chart-empty[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-family: var(--font-mono);\n  color: var(--text-muted);\n  text-align: center;\n  width: 100%;\n  padding: 12px 0;\n}\n/*# sourceMappingURL=workbench-drawer.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WorkbenchDrawerComponent, { className: "WorkbenchDrawerComponent", filePath: "src\\app\\shared\\workbench-drawer\\workbench-drawer.component.ts", lineNumber: 32 });
})();

// src/app/pages/dashboard/dashboard.component.ts
function DashboardComponent_app_workbench_drawer_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-workbench-drawer", 14);
    \u0275\u0275listener("drawerClosed", function DashboardComponent_app_workbench_drawer_19_Template_app_workbench_drawer_drawerClosed_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeWorkbench());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ip", ctx_r1.workbenchIp)("event", ctx_r1.workbenchEvent);
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor(socketService, cdr) {
    this.socketService = socketService;
    this.cdr = cdr;
    this.isConnected = false;
    this.clock = "";
    this.workbenchIp = null;
    this.workbenchEvent = null;
    this.selectedIp = null;
    this.sub = new Subscription();
  }
  ngOnInit() {
    this.sub.add(this.socketService.connected$.subscribe((state) => {
      this.isConnected = state;
      this.cdr.markForCheck();
    }));
    this.updateClock();
    this.clockTimer = setInterval(() => {
      this.updateClock();
      this.cdr.markForCheck();
    }, 1e3);
  }
  updateClock() {
    this.clock = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-GB", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }) + " UTC";
  }
  /** Called when analyst clicks a row in TriageQueueComponent. */
  openWorkbench(evt) {
    this.workbenchIp = evt.source_ip;
    this.workbenchEvent = evt;
    this.selectedIp = evt.source_ip;
    this.cdr.markForCheck();
  }
  /** Called when the drawer emits (drawerClosed). */
  closeWorkbench() {
    this.workbenchIp = null;
    this.workbenchEvent = null;
    this.selectedIp = null;
    this.cdr.markForCheck();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    clearInterval(this.clockTimer);
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(t) {
      return new (t || _DashboardComponent)(\u0275\u0275directiveInject(SocketService), \u0275\u0275directiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 20, vars: 6, consts: [[1, "dashboard"], [1, "top-nav"], [1, "nav-brand"], [1, "nav-logo"], [1, "nav-name", "glow"], [1, "nav-subtitle"], [1, "nav-right"], [1, "conn-badge"], [1, "conn-dot"], [1, "nav-time"], [1, "main-content"], [3, "selectedIp"], [3, "rowClick"], [3, "ip", "event", "drawerClosed", 4, "ngIf"], [3, "drawerClosed", "ip", "event"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "nav", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275text(4, "\u{1F6E1}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div")(6, "div", 4);
        \u0275\u0275text(7, "AEGIS SIEM");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 5);
        \u0275\u0275text(9, "SECURITY OPERATIONS CENTER");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(10, "div", 6)(11, "div", 7);
        \u0275\u0275element(12, "span", 8);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "span", 9);
        \u0275\u0275text(15);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(16, "main", 10);
        \u0275\u0275element(17, "app-live-map", 11);
        \u0275\u0275elementStart(18, "app-triage-queue", 12);
        \u0275\u0275listener("rowClick", function DashboardComponent_Template_app_triage_queue_rowClick_18_listener($event) {
          return ctx.openWorkbench($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275template(19, DashboardComponent_app_workbench_drawer_19_Template, 1, 2, "app-workbench-drawer", 13);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275classMap(ctx.isConnected ? "connected" : "disconnected");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", ctx.isConnected ? "LIVE" : "OFFLINE", " ");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.clock);
        \u0275\u0275advance(2);
        \u0275\u0275property("selectedIp", ctx.selectedIp);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.workbenchIp);
      }
    }, dependencies: [
      CommonModule,
      NgIf,
      LiveMapComponent,
      TriageQueueComponent,
      WorkbenchDrawerComponent
    ], styles: ['\n\n.dashboard[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  overflow: hidden;\n  background: var(--bg-primary);\n}\n.top-nav[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 20px;\n  height: 50px;\n  background: var(--bg-secondary);\n  border-bottom: 2px solid var(--border);\n  flex-shrink: 0;\n  position: relative;\n}\n.top-nav[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: -2px;\n  left: 0;\n  right: 0;\n  height: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      var(--accent-cyan),\n      transparent);\n  opacity: 0.5;\n}\n.nav-brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.nav-logo[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: 2px solid var(--accent-cyan);\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n  box-shadow: 0 0 16px rgba(0, 212, 255, 0.3), inset 0 0 8px rgba(0, 212, 255, 0.1);\n  background: rgba(0, 212, 255, 0.05);\n}\n.nav-name[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 15px;\n  font-weight: 700;\n  letter-spacing: 0.25em;\n  color: var(--text-primary);\n}\n.nav-subtitle[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: var(--text-muted);\n  font-family: var(--font-mono);\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n.nav-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.conn-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  padding: 5px 14px;\n  border-radius: var(--radius-sm);\n  font-size: 11px;\n  font-family: var(--font-mono);\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  border: 1px solid;\n  transition: all 0.3s ease;\n}\n.conn-badge.connected[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, .12);\n  border-color: #22c55e;\n  color: #22c55e;\n  box-shadow: 0 0 10px rgba(34, 197, 94, .2);\n}\n.conn-badge.disconnected[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, .12);\n  border-color: #ef4444;\n  color: #ef4444;\n}\n.conn-dot[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n}\n.conn-badge.connected[_ngcontent-%COMP%]   .conn-dot[_ngcontent-%COMP%] {\n  background: #22c55e;\n  animation: pulse 1.5s infinite;\n}\n.conn-badge.disconnected[_ngcontent-%COMP%]   .conn-dot[_ngcontent-%COMP%] {\n  background: #ef4444;\n}\n.nav-time[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 12px;\n  color: var(--text-secondary);\n  letter-spacing: 0.08em;\n  padding: 4px 10px;\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-sm);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 10px 14px 12px;\n  overflow: hidden;\n  min-height: 0;\n}\n.main-content[_ngcontent-%COMP%]   app-live-map[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  height: 340px;\n}\n.main-content[_ngcontent-%COMP%]   app-triage-queue[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n/*# sourceMappingURL=dashboard.component.css.map */'], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src\\app\\pages\\dashboard\\dashboard.component.ts", lineNumber: 27 });
})();
export {
  DashboardComponent
};
/*! Bundled license information:

leaflet/dist/leaflet-src.js:
  (* @preserve
   * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
   * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
   *)
*/
//# sourceMappingURL=chunk-HISLQXI3.js.map
