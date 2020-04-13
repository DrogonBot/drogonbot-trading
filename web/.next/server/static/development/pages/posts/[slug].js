module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/next/dist/client/link.js":
/*!***********************************************!*\
  !*** ./node_modules/next/dist/client/link.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _url = __webpack_require__(/*! url */ "url");

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "./node_modules/next/dist/next-server/lib/utils.js");

var _router = _interopRequireDefault(__webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js"));

function isLocal(href) {
  var url = (0, _url.parse)(href, false, true);
  var origin = (0, _url.parse)((0, _utils.getLocationOrigin)(), false, true);
  return !url.host || url.protocol === origin.protocol && url.host === origin.host;
}

function memoizedFormatUrl(formatFunc) {
  var lastHref = null;
  var lastAs = null;
  var lastResult = null;
  return (href, as) => {
    if (lastResult && href === lastHref && as === lastAs) {
      return lastResult;
    }

    var result = formatFunc(href, as);
    lastHref = href;
    lastAs = as;
    lastResult = result;
    return result;
  };
}

function formatUrl(url) {
  return url && typeof url === 'object' ? (0, _utils.formatWithValidation)(url) : url;
}

var observer;
var listeners = new Map();
var IntersectionObserver = false ? undefined : null;
var prefetched = {};

function getObserver() {
  // Return shared instance of IntersectionObserver if already created
  if (observer) {
    return observer;
  } // Only create shared IntersectionObserver if supported in browser


  if (!IntersectionObserver) {
    return undefined;
  }

  return observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!listeners.has(entry.target)) {
        return;
      }

      var cb = listeners.get(entry.target);

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        listeners.delete(entry.target);
        cb();
      }
    });
  }, {
    rootMargin: '200px'
  });
}

var listenToIntersections = (el, cb) => {
  var observer = getObserver();

  if (!observer) {
    return () => {};
  }

  observer.observe(el);
  listeners.set(el, cb);
  return () => {
    try {
      observer.unobserve(el);
    } catch (err) {
      console.error(err);
    }

    listeners.delete(el);
  };
};

class Link extends _react.Component {
  constructor(props) {
    super(props);
    this.p = void 0;

    this.cleanUpListeners = () => {};

    this.formatUrls = memoizedFormatUrl((href, asHref) => {
      return {
        href: formatUrl(href),
        as: asHref ? formatUrl(asHref) : asHref
      };
    });

    this.linkClicked = e => {
      var {
        nodeName,
        target
      } = e.currentTarget;

      if (nodeName === 'A' && (target && target !== '_self' || e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent && e.nativeEvent.which === 2)) {
        // ignore click for new tab / new window behavior
        return;
      }

      var {
        href,
        as
      } = this.formatUrls(this.props.href, this.props.as);

      if (!isLocal(href)) {
        // ignore click if it's outside our scope (e.g. https://google.com)
        return;
      }

      var {
        pathname
      } = window.location;
      href = (0, _url.resolve)(pathname, href);
      as = as ? (0, _url.resolve)(pathname, as) : href;
      e.preventDefault(); //  avoid scroll for urls with anchor refs

      var {
        scroll
      } = this.props;

      if (scroll == null) {
        scroll = as.indexOf('#') < 0;
      } // replace state instead of push if prop is present


      _router.default[this.props.replace ? 'replace' : 'push'](href, as, {
        shallow: this.props.shallow
      }).then(success => {
        if (!success) return;

        if (scroll) {
          window.scrollTo(0, 0);
          document.body.focus();
        }
      });
    };

    if (true) {
      if (props.prefetch) {
        console.warn('Next.js auto-prefetches automatically based on viewport. The prefetch attribute is no longer needed. More: https://err.sh/zeit/next.js/prefetch-true-deprecated');
      }
    }

    this.p = props.prefetch !== false;
  }

  componentWillUnmount() {
    this.cleanUpListeners();
  }

  getPaths() {
    var {
      pathname
    } = window.location;
    var {
      href: parsedHref,
      as: parsedAs
    } = this.formatUrls(this.props.href, this.props.as);
    var resolvedHref = (0, _url.resolve)(pathname, parsedHref);
    return [resolvedHref, parsedAs ? (0, _url.resolve)(pathname, parsedAs) : resolvedHref];
  }

  handleRef(ref) {
    if (this.p && IntersectionObserver && ref && ref.tagName) {
      this.cleanUpListeners();
      var isPrefetched = prefetched[this.getPaths().join( // Join on an invalid URI character
      '%')];

      if (!isPrefetched) {
        this.cleanUpListeners = listenToIntersections(ref, () => {
          this.prefetch();
        });
      }
    }
  } // The function is memoized so that no extra lifecycles are needed
  // as per https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html


  prefetch(options) {
    if (!this.p || true) return; // Prefetch the JSON page if asked (only in the client)

    var paths = this.getPaths(); // We need to handle a prefetch error here since we may be
    // loading with priority which can reject but we don't
    // want to force navigation since this is only a prefetch

    _router.default.prefetch(paths[
    /* href */
    0], paths[
    /* asPath */
    1], options).catch(err => {
      if (true) {
        // rethrow to show invalid URL errors
        throw err;
      }
    });

    prefetched[paths.join( // Join on an invalid URI character
    '%')] = true;
  }

  render() {
    var {
      children
    } = this.props;
    var {
      href,
      as
    } = this.formatUrls(this.props.href, this.props.as); // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

    if (typeof children === 'string') {
      children = _react.default.createElement("a", null, children);
    } // This will return the first child, if multiple are provided it will throw an error


    var child = _react.Children.only(children);

    var props = {
      ref: el => {
        this.handleRef(el);

        if (child && typeof child === 'object' && child.ref) {
          if (typeof child.ref === 'function') child.ref(el);else if (typeof child.ref === 'object') {
            child.ref.current = el;
          }
        }
      },
      onMouseEnter: e => {
        if (child.props && typeof child.props.onMouseEnter === 'function') {
          child.props.onMouseEnter(e);
        }

        this.prefetch({
          priority: true
        });
      },
      onClick: e => {
        if (child.props && typeof child.props.onClick === 'function') {
          child.props.onClick(e);
        }

        if (!e.defaultPrevented) {
          this.linkClicked(e);
        }
      }
    }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
    // defined, we specify the current 'href', so that repetition is not needed by the user

    if (this.props.passHref || child.type === 'a' && !('href' in child.props)) {
      props.href = as || href;
    } // Add the ending slash to the paths. So, we can serve the
    // "<page>/index.html" directly.


    if (false) { var rewriteUrlForNextExport; }

    return _react.default.cloneElement(child, props);
  }

}

if (true) {
  var warn = (0, _utils.execOnce)(console.error); // This module gets removed by webpack.IgnorePlugin

  var PropTypes = __webpack_require__(/*! prop-types */ "prop-types");

  var exact = __webpack_require__(/*! prop-types-exact */ "prop-types-exact"); // @ts-ignore the property is supported, when declaring it on the class it outputs an extra bit of code which is not needed.


  Link.propTypes = exact({
    href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    prefetch: PropTypes.bool,
    replace: PropTypes.bool,
    shallow: PropTypes.bool,
    passHref: PropTypes.bool,
    scroll: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.element, (props, propName) => {
      var value = props[propName];

      if (typeof value === 'string') {
        warn("Warning: You're using a string directly inside <Link>. This usage has been deprecated. Please add an <a> tag as child of <Link>");
      }

      return null;
    }]).isRequired
  });
}

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/client/router.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/router.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router2 = _interopRequireWildcard(__webpack_require__(/*! ../next-server/lib/router/router */ "./node_modules/next/dist/next-server/lib/router/router.js"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__(/*! ../next-server/lib/router-context */ "./node_modules/next/dist/next-server/lib/router-context.js");

var _withRouter = _interopRequireDefault(__webpack_require__(/*! ./with-router */ "./node_modules/next/dist/client/with-router.js"));

exports.withRouter = _withRouter.default;
/* global window */

var singletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

var urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'isFallback'];
var routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
var coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get() {
    return _router2.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get() {
      var router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  // We don't really know the types here, so we add them later instead
  ;

  singletonRouter[field] = function () {
    var router = getRouter();
    return router[field](...arguments);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router2.default.events.on(event, function () {
      var eventField = "on" + event.charAt(0).toUpperCase() + event.substring(1);
      var _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...arguments);
        } catch (err) {
          // tslint:disable-next-line:no-console
          console.error("Error when running the Router event: " + eventField); // tslint:disable-next-line:no-console

          console.error(err.message + "\n" + err.stack);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    var message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
} // Export the singletonRouter and this is the public API.


var _default = singletonRouter; // Reexport the withRoute HOC

exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
} // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.


var createRouter = function createRouter() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  singletonRouter.router = new _router2.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}; // This function is used to create the `withRouter` router instance


exports.createRouter = createRouter;

function makePublicRouterInstance(router) {
  var _router = router;
  var instance = {};

  for (var property of urlPropertyFields) {
    if (typeof _router[property] === 'object') {
      instance[property] = Object.assign({}, _router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = _router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router2.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = function () {
      return _router[field](...arguments);
    };
  });
  return instance;
}

/***/ }),

/***/ "./node_modules/next/dist/client/with-router.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/client/with-router.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router = __webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return _react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (true) {
    var name = ComposedComponent.displayName || ComposedComponent.name || 'Unknown';
    WithRouterWrapper.displayName = "withRouter(" + name + ")";
  }

  return WithRouterWrapper;
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/mitt.js":
/*!********************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/mitt.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
MIT License

Copyright (c) Jason Miller (https://jasonformat.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

Object.defineProperty(exports, "__esModule", {
  value: true
});

function mitt() {
  const all = Object.create(null);
  return {
    on(type, handler) {
      ;
      (all[type] || (all[type] = [])).push(handler);
    },

    off(type, handler) {
      if (all[type]) {
        // tslint:disable-next-line:no-bitwise
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },

    emit(type, ...evts) {
      // eslint-disable-next-line array-callback-return
      ;
      (all[type] || []).slice().map(handler => {
        handler(...evts);
      });
    }

  };
}

exports.default = mitt;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router-context.js":
/*!******************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router-context.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const React = __importStar(__webpack_require__(/*! react */ "react"));

exports.RouterContext = React.createContext(null);

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/router.js":
/*!*****************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/router.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__(/*! url */ "url");

const mitt_1 = __importDefault(__webpack_require__(/*! ../mitt */ "./node_modules/next/dist/next-server/lib/mitt.js"));

const utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/next/dist/next-server/lib/utils.js");

const is_dynamic_1 = __webpack_require__(/*! ./utils/is-dynamic */ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js");

const route_matcher_1 = __webpack_require__(/*! ./utils/route-matcher */ "./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js");

const route_regex_1 = __webpack_require__(/*! ./utils/route-regex */ "./node_modules/next/dist/next-server/lib/router/utils/route-regex.js");

function addBasePath(path) {
  // variable is always a string
  const p = "";
  return path.indexOf(p) !== 0 ? p + path : path;
}

function toRoute(path) {
  return path.replace(/\/$/, '') || '/';
}

const prepareRoute = path => toRoute(!path || path === '/' ? '/index' : path);

function fetchNextData(pathname, query, isServerRender, cb) {
  let attempts = isServerRender ? 3 : 1;

  function getResponse() {
    return fetch(utils_1.formatWithValidation({
      // @ts-ignore __NEXT_DATA__
      pathname: `/_next/data/${__NEXT_DATA__.buildId}${pathname}.json`,
      query
    }), {
      // Cookies are required to be present for Next.js' SSG "Preview Mode".
      // Cookies may also be required for `getServerSideProps`.
      //
      // > `fetch` won’t send cookies, unless you set the credentials init
      // > option.
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      //
      // > For maximum browser compatibility when it comes to sending &
      // > receiving cookies, always supply the `credentials: 'same-origin'`
      // > option instead of relying on the default.
      // https://github.com/github/fetch#caveats
      credentials: 'same-origin'
    }).then(res => {
      if (!res.ok) {
        if (--attempts > 0 && res.status >= 500) {
          return getResponse();
        }

        throw new Error(`Failed to load static props`);
      }

      return res.json();
    });
  }

  return getResponse().then(data => {
    return cb ? cb(data) : data;
  }).catch(err => {
    // We should only trigger a server-side transition if this was caused
    // on a client-side transition. Otherwise, we'd get into an infinite
    // loop.
    if (!isServerRender) {
      ;
      err.code = 'PAGE_LOAD_ERROR';
    }

    throw err;
  });
}

class Router {
  constructor(pathname, query, as, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component,
    err,
    subscription,
    isFallback
  }) {
    // Static Data Cache
    this.sdc = {};

    this.onPopState = e => {
      if (!e.state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname,
          query
        } = this;
        this.changeState('replaceState', utils_1.formatWithValidation({
          pathname,
          query
        }), utils_1.getURL());
        return;
      } // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site


      if (e.state && this.isSsr && e.state.as === this.asPath && url_1.parse(e.state.url).pathname === this.pathname) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(e.state)) {
        return;
      }

      const {
        url,
        as,
        options
      } = e.state;

      if (true) {
        if (typeof url === 'undefined' || typeof as === 'undefined') {
          console.warn('`popstate` event triggered but `event.state` did not have `url` or `as` https://err.sh/zeit/next.js/popstate-state-empty');
        }
      }

      this.replace(url, as, options);
    };

    this._getStaticData = asPath => {
      const pathname = prepareRoute(url_1.parse(asPath).pathname);
      return  false ? undefined : fetchNextData(pathname, null, this.isSsr, data => this.sdc[pathname] = data);
    };

    this._getServerData = asPath => {
      let {
        pathname,
        query
      } = url_1.parse(asPath, true);
      pathname = prepareRoute(pathname);
      return fetchNextData(pathname, query, this.isSsr);
    }; // represents the current component key


    this.route = toRoute(pathname); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (pathname !== '/_error') {
      this.components[this.route] = {
        Component,
        props: initialProps,
        err,
        __N_SSG: initialProps && initialProps.__N_SSG,
        __N_SSP: initialProps && initialProps.__N_SSP
      };
    }

    this.components['/_app'] = {
      Component: App
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = pathname;
    this.query = query; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    this.asPath = // @ts-ignore this is temporarily global (attached to window)
    is_dynamic_1.isDynamicRoute(pathname) && __NEXT_DATA__.autoExport ? pathname : as;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;
    this.isFallback = isFallback;

    if (false) {}
  } // @deprecated backwards compatibility even though it's a private method.


  static _rewriteUrlForNextExport(url) {
    if (false) {} else {
      return url;
    }
  }

  update(route, mod) {
    const Component = mod.default || mod;
    const data = this.components[route];

    if (!data) {
      throw new Error(`Cannot update unavailable route: ${route}`);
    }

    const newData = Object.assign(Object.assign({}, data), {
      Component,
      __N_SSG: mod.__N_SSG,
      __N_SSP: mod.__N_SSP
    });
    this.components[route] = newData; // pages/_app.js updated

    if (route === '/_app') {
      this.notify(this.components[this.route]);
      return;
    }

    if (route === this.route) {
      this.notify(newData);
    }
  }

  reload() {
    window.location.reload();
  }
  /**
   * Go back in history
   */


  back() {
    window.history.back();
  }
  /**
   * Performs a `pushState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */


  push(url, as = url, options = {}) {
    return this.change('pushState', url, as, options);
  }
  /**
   * Performs a `replaceState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */


  replace(url, as = url, options = {}) {
    return this.change('replaceState', url, as, options);
  }

  change(method, _url, _as, options) {
    return new Promise((resolve, reject) => {
      if (!options._h) {
        this.isSsr = false;
      } // marking route changes as a navigation start entry


      if (utils_1.ST) {
        performance.mark('routeChange');
      } // If url and as provided as an object representation,
      // we'll format them into the string version here.


      const url = typeof _url === 'object' ? utils_1.formatWithValidation(_url) : _url;
      let as = typeof _as === 'object' ? utils_1.formatWithValidation(_as) : _as; // Add the ending slash to the paths. So, we can serve the
      // "<page>/index.html" directly for the SSR page.

      if (false) {}

      this.abortComponentLoad(as); // If the url change is only related to a hash change
      // We should not proceed. We should only change the state.
      // WARNING: `_h` is an internal option for handing Next.js client-side
      // hydration. Your app should _never_ use this property. It may change at
      // any time without notice.

      if (!options._h && this.onlyAHashChange(as)) {
        this.asPath = as;
        Router.events.emit('hashChangeStart', as);
        this.changeState(method, url, addBasePath(as), options);
        this.scrollToHash(as);
        Router.events.emit('hashChangeComplete', as);
        return resolve(true);
      }

      const {
        pathname,
        query,
        protocol
      } = url_1.parse(url, true);

      if (!pathname || protocol) {
        if (true) {
          throw new Error(`Invalid href passed to router: ${url} https://err.sh/zeit/next.js/invalid-href-passed`);
        }

        return resolve(false);
      } // If asked to change the current URL we should reload the current page
      // (not location.reload() but reload getInitialProps and other Next.js stuffs)
      // We also need to set the method = replaceState always
      // as this should not go into the history (That's how browsers work)
      // We should compare the new asPath to the current asPath, not the url


      if (!this.urlIsNew(as)) {
        method = 'replaceState';
      }

      const route = toRoute(pathname);
      const {
        shallow = false
      } = options;

      if (is_dynamic_1.isDynamicRoute(route)) {
        const {
          pathname: asPathname
        } = url_1.parse(as);
        const routeRegex = route_regex_1.getRouteRegex(route);
        const routeMatch = route_matcher_1.getRouteMatcher(routeRegex)(asPathname);

        if (!routeMatch) {
          const missingParams = Object.keys(routeRegex.groups).filter(param => !query[param]);

          if (missingParams.length > 0) {
            if (true) {
              console.warn(`Mismatching \`as\` and \`href\` failed to manually provide ` + `the params: ${missingParams.join(', ')} in the \`href\`'s \`query\``);
            }

            return reject(new Error(`The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). ` + `Read more: https://err.sh/zeit/next.js/incompatible-href-as`));
          }
        } else {
          // Merge params into `query`, overwriting any specified in search
          Object.assign(query, routeMatch);
        }
      }

      Router.events.emit('routeChangeStart', as); // If shallow is true and the route exists in the router cache we reuse the previous result

      this.getRouteInfo(route, pathname, query, as, shallow).then(routeInfo => {
        const {
          error
        } = routeInfo;

        if (error && error.cancelled) {
          return resolve(false);
        }

        Router.events.emit('beforeHistoryChange', as);
        this.changeState(method, url, addBasePath(as), options);

        if (true) {
          const appComp = this.components['/_app'].Component;
          window.next.isPrerendered = appComp.getInitialProps === appComp.origGetInitialProps && !routeInfo.Component.getInitialProps;
        }

        this.set(route, pathname, query, as, routeInfo);

        if (error) {
          Router.events.emit('routeChangeError', error, as);
          throw error;
        }

        Router.events.emit('routeChangeComplete', as);
        return resolve(true);
      }, reject);
    });
  }

  changeState(method, url, as, options = {}) {
    if (true) {
      if (typeof window.history === 'undefined') {
        console.error(`Warning: window.history is not available.`);
        return;
      }

      if (typeof window.history[method] === 'undefined') {
        console.error(`Warning: window.history.${method} is not available`);
        return;
      }
    }

    if (method !== 'pushState' || utils_1.getURL() !== as) {
      window.history[method]({
        url,
        as,
        options
      }, // Most browsers currently ignores this parameter, although they may use it in the future.
      // Passing the empty string here should be safe against future changes to the method.
      // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
      '', as);
    }
  }

  getRouteInfo(route, pathname, query, as, shallow = false) {
    const cachedRouteInfo = this.components[route]; // If there is a shallow route transition possible
    // If the route is already rendered on the screen.

    if (shallow && cachedRouteInfo && this.route === route) {
      return Promise.resolve(cachedRouteInfo);
    }

    const handleError = (err, loadErrorFail) => {
      return new Promise(resolve => {
        if (err.code === 'PAGE_LOAD_ERROR' || loadErrorFail) {
          // If we can't load the page it could be one of following reasons
          //  1. Page doesn't exists
          //  2. Page does exist in a different zone
          //  3. Internal error while loading the page
          // So, doing a hard reload is the proper way to deal with this.
          window.location.href = as; // Changing the URL doesn't block executing the current code path.
          // So, we need to mark it as a cancelled error and stop the routing logic.

          err.cancelled = true; // @ts-ignore TODO: fix the control flow here

          return resolve({
            error: err
          });
        }

        if (err.cancelled) {
          // @ts-ignore TODO: fix the control flow here
          return resolve({
            error: err
          });
        }

        resolve(this.fetchComponent('/_error').then(res => {
          const {
            page: Component
          } = res;
          const routeInfo = {
            Component,
            err
          };
          return new Promise(resolve => {
            this.getInitialProps(Component, {
              err,
              pathname,
              query
            }).then(props => {
              routeInfo.props = props;
              routeInfo.error = err;
              resolve(routeInfo);
            }, gipErr => {
              console.error('Error in error page `getInitialProps`: ', gipErr);
              routeInfo.error = err;
              routeInfo.props = {};
              resolve(routeInfo);
            });
          });
        }).catch(err => handleError(err, true)));
      });
    };

    return new Promise((resolve, reject) => {
      if (cachedRouteInfo) {
        return resolve(cachedRouteInfo);
      }

      this.fetchComponent(route).then(res => resolve({
        Component: res.page,
        __N_SSG: res.mod.__N_SSG,
        __N_SSP: res.mod.__N_SSP
      }), reject);
    }).then(routeInfo => {
      const {
        Component,
        __N_SSG,
        __N_SSP
      } = routeInfo;

      if (true) {
        const {
          isValidElementType
        } = __webpack_require__(/*! react-is */ "./node_modules/next/node_modules/react-is/index.js");

        if (!isValidElementType(Component)) {
          throw new Error(`The default export is not a React Component in page: "${pathname}"`);
        }
      }

      return this._getData(() => __N_SSG ? this._getStaticData(as) : __N_SSP ? this._getServerData(as) : this.getInitialProps(Component, // we provide AppTree later so this needs to be `any`
      {
        pathname,
        query,
        asPath: as
      })).then(props => {
        routeInfo.props = props;
        this.components[route] = routeInfo;
        return routeInfo;
      });
    }).catch(handleError);
  }

  set(route, pathname, query, as, data) {
    this.isFallback = false;
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    this.notify(data);
  }
  /**
   * Callback to execute before replacing router state
   * @param cb callback to be executed
   */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value

    if (hash === '') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }
  /**
   * Prefetch page code, you may wait for the data during page rendering.
   * This feature only works in production!
   * @param url the href of prefetched page
   * @param asPath the as path of the prefetched page
   */


  prefetch(url, asPath = url, options = {}) {
    return new Promise((resolve, reject) => {
      const {
        pathname,
        protocol
      } = url_1.parse(url);

      if (!pathname || protocol) {
        if (true) {
          throw new Error(`Invalid href passed to router: ${url} https://err.sh/zeit/next.js/invalid-href-passed`);
        }

        return;
      } // Prefetch is not supported in development mode because it would trigger on-demand-entries


      if (true) {
        return;
      }

      Promise.all([this.pageLoader.prefetchData(url, asPath), this.pageLoader[options.priority ? 'loadPage' : 'prefetch'](toRoute(pathname))]).then(() => resolve(), reject);
    });
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    const componentResult = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return componentResult;
  }

  _getData(fn) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    return fn().then(data => {
      if (cancel === this.clc) {
        this.clc = null;
      }

      if (cancelled) {
        const err = new Error('Loading initial props cancelled');
        err.cancelled = true;
        throw err;
      }

      return data;
    });
  }

  getInitialProps(Component, ctx) {
    const {
      Component: App
    } = this.components['/_app'];

    const AppTree = this._wrapApp(App);

    ctx.AppTree = AppTree;
    return utils_1.loadGetInitialProps(App, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }

  abortComponentLoad(as) {
    if (this.clc) {
      const e = new Error('Route Cancelled');
      e.cancelled = true;
      Router.events.emit('routeChangeError', e, as);
      this.clc();
      this.clc = null;
    }
  }

  notify(data) {
    this.sub(data, this.components['/_app'].Component);
  }

}

exports.default = Router;
Router.events = mitt_1.default();

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js":
/*!***************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
}); // Identify /[param]/ in route string

const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}

exports.isDynamicRoute = isDynamicRoute;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js":
/*!******************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function getRouteMatcher(routeRegex) {
  const {
    re,
    groups
  } = routeRegex;
  return pathname => {
    const routeMatch = re.exec(pathname);

    if (!routeMatch) {
      return false;
    }

    const decode = decodeURIComponent;
    const params = {};
    Object.keys(groups).forEach(slugName => {
      const g = groups[slugName];
      const m = routeMatch[g.pos];

      if (m !== undefined) {
        params[slugName] = ~m.indexOf('/') ? m.split('/').map(entry => decode(entry)) : g.repeat ? [decode(m)] : decode(m);
      }
    });
    return params;
  };
}

exports.getRouteMatcher = getRouteMatcher;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/route-regex.js":
/*!****************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/route-regex.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function getRouteRegex(normalizedRoute) {
  // Escape all characters that could be considered RegEx
  const escapedRoute = (normalizedRoute.replace(/\/$/, '') || '/').replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
  const groups = {};
  let groupIndex = 1;
  const parameterizedRoute = escapedRoute.replace(/\/\\\[([^/]+?)\\\](?=\/|$)/g, (_, $1) => {
    const isCatchAll = /^(\\\.){3}/.test($1);
    groups[$1 // Un-escape key
    .replace(/\\([|\\{}()[\]^$+*?.-])/g, '$1').replace(/^\.{3}/, '') // eslint-disable-next-line no-sequences
    ] = {
      pos: groupIndex++,
      repeat: isCatchAll
    };
    return isCatchAll ? '/(.+?)' : '/([^/]+?)';
  });
  return {
    re: new RegExp('^' + parameterizedRoute + '(?:/)?$', 'i'),
    groups
  };
}

exports.getRouteRegex = getRouteRegex;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/utils.js":
/*!*********************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/utils.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__(/*! url */ "url");
/**
 * Utils
 */


function execOnce(fn) {
  let used = false;
  let result = null;
  return (...args) => {
    if (!used) {
      used = true;
      result = fn.apply(this, args);
    }

    return result;
  };
}

exports.execOnce = execOnce;

function getLocationOrigin() {
  const {
    protocol,
    hostname,
    port
  } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

exports.getLocationOrigin = getLocationOrigin;

function getURL() {
  const {
    href
  } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

exports.getURL = getURL;

function getDisplayName(Component) {
  return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}

exports.getDisplayName = getDisplayName;

function isResSent(res) {
  return res.finished || res.headersSent;
}

exports.isResSent = isResSent;

async function loadGetInitialProps(App, ctx) {
  var _a;

  if (true) {
    if ((_a = App.prototype) === null || _a === void 0 ? void 0 : _a.getInitialProps) {
      const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://err.sh/zeit/next.js/get-initial-props-as-an-instance-method for more information.`;
      throw new Error(message);
    }
  } // when called from _app `ctx` is nested in `ctx`


  const res = ctx.res || ctx.ctx && ctx.ctx.res;

  if (!App.getInitialProps) {
    if (ctx.ctx && ctx.Component) {
      // @ts-ignore pageProps default
      return {
        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
      };
    }

    return {};
  }

  const props = await App.getInitialProps(ctx);

  if (res && isResSent(res)) {
    return props;
  }

  if (!props) {
    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  if (true) {
    if (Object.keys(props).length === 0 && !ctx.ctx) {
      console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://err.sh/zeit/next.js/empty-object-getInitialProps`);
    }
  }

  return props;
}

exports.loadGetInitialProps = loadGetInitialProps;
exports.urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];

function formatWithValidation(url, options) {
  if (true) {
    if (url !== null && typeof url === 'object') {
      Object.keys(url).forEach(key => {
        if (exports.urlObjectKeys.indexOf(key) === -1) {
          console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
        }
      });
    }
  }

  return url_1.format(url, options);
}

exports.formatWithValidation = formatWithValidation;
exports.SP = typeof performance !== 'undefined';
exports.ST = exports.SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';

/***/ }),

/***/ "./node_modules/next/link.js":
/*!***********************************!*\
  !*** ./node_modules/next/link.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/link */ "./node_modules/next/dist/client/link.js")


/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/next/node_modules/@babel/runtime/helpers/typeof.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/typeof.js":
/*!*************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/typeof.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/next/node_modules/react-is/cjs/react-is.development.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/next/node_modules/react-is/cjs/react-is.development.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.8.6
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' ||
  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
}

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;
    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;
          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;
              default:
                return $$typeof;
            }
        }
      case REACT_LAZY_TYPE:
      case REACT_MEMO_TYPE:
      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
}

// AsyncMode is deprecated along with isAsyncMode
var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;

var hasWarnedAboutDeprecatedIsAsyncMode = false;

// AsyncMode should be deprecated
function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true;
      lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }
  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.typeOf = typeOf;
exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isValidElementType = isValidElementType;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
  })();
}


/***/ }),

/***/ "./node_modules/next/node_modules/react-is/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/next/node_modules/react-is/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/next/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./src/components/elements/form/ProvinceSelector.tsx":
/*!***********************************************************!*\
  !*** ./src/components/elements/form/ProvinceSelector.tsx ***!
  \***********************************************************/
/*! exports provided: ProvinceSelector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvinceSelector", function() { return ProvinceSelector; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../constants/UI/Colors.constant */ "./src/constants/UI/Colors.constant.ts");
/* harmony import */ var _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../constants/UI/UI.constant */ "./src/constants/UI/UI.constant.ts");
/* harmony import */ var _store_actions_ui_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../store/actions/ui.action */ "./src/store/actions/ui.action.ts");
var _jsxFileName = "/usr/src/app/src/components/elements/form/ProvinceSelector.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;







const ProvinceSelector = ({
  provinces
}) => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useDispatch"])();
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_2__["useRouter"])();
  const {
    searchKeyword
  } = router.query;
  const {
    searchProvince
  } = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(state => state.uiReducer);

  const onChangeProvince = async e => {
    const selectedProvince = e.target.value; //  update our redux (we'll need this info for our post requests)

    await dispatch(Object(_store_actions_ui_action__WEBPACK_IMPORTED_MODULE_7__["setSearchKey"])("searchProvince", selectedProvince));

    if (!searchKeyword) {
      return;
    }

    router.push({
      pathname: "/posts",
      query: {
        searchProvince: e.target.value,
        searchKeyword,
        page: 1 // since its a new search, page will be always 1!

      }
    });
  };

  const onRenderProvinces = () => {
    return provinces.map(province => __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["MenuItem"], {
      key: province.stateName,
      value: province.stateCode,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 46,
        columnNumber: 7
      }
    }, province.stateCode));
  };

  return __jsx(Container, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 5
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Select"], {
    value: searchProvince,
    onChange: onChangeProvince,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 7
    }
  }, onRenderProvinces()));
};
const Container = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div.withConfig({
  displayName: "ProvinceSelector__Container",
  componentId: "sc-12bi6i-0"
})(["@media screen and (min-width:", "){border-bottom:1px solid silver;}.MuiInput-underline:after{border-bottom:2px solid ", ";}.MuiInputBase-root{height:100%;}.MuiInput-underline:before{border-bottom:unset;}"], _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_6__["UI"].mediumLayoutBreak, _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_5__["colors"].primary);

/***/ }),

/***/ "./src/components/elements/ui/Breadcumb.tsx":
/*!**************************************************!*\
  !*** ./src/components/elements/ui/Breadcumb.tsx ***!
  \**************************************************/
/*! exports provided: Breadcumb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Breadcumb", function() { return Breadcumb; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants/UI/Colors.constant */ "./src/constants/UI/Colors.constant.ts");
var _jsxFileName = "/usr/src/app/src/components/elements/ui/Breadcumb.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const Breadcumb = ({
  parent,
  child,
  parentLink,
  childLink
}) => {
  const onRenderParent = () => {
    if (parent) {
      if (parentLink) {
        return __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
          href: parentLink,
          __self: undefined,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 19,
            columnNumber: 11
          }
        }, __jsx(DarkBoldText, {
          __self: undefined,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 20,
            columnNumber: 13
          }
        }, parent));
      } else {
        return __jsx(DarkBoldText, {
          __self: undefined,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 24,
            columnNumber: 16
          }
        }, parent);
      }
    }
  };

  const onRenderChild = () => {
    if (child) {
      if (childLink) {
        return __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
          href: childLink,
          __self: undefined,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 32,
            columnNumber: 16
          }
        }, child);
      } else {
        return child;
      }
    }
  };

  return __jsx(BreadcumbContainer, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 5
    }
  }, onRenderParent(), ` › `, onRenderChild());
};
const BreadcumbContainer = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
  displayName: "Breadcumb__BreadcumbContainer",
  componentId: "sla1l1-0"
})(["font-size:12px;color:", ";"], () => _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_3__["colors"].silver);
const DarkBoldText = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.span.withConfig({
  displayName: "Breadcumb__DarkBoldText",
  componentId: "sla1l1-1"
})(["color:", ";font-weight:500;"], () => _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_3__["colors"].dark);

/***/ }),

/***/ "./src/components/elements/ui/InfoTag.tsx":
/*!************************************************!*\
  !*** ./src/components/elements/ui/InfoTag.tsx ***!
  \************************************************/
/*! exports provided: InfoTag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfoTag", function() { return InfoTag; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../constants/UI/Colors.constant */ "./src/constants/UI/Colors.constant.ts");
/* harmony import */ var _constants_UI_Typography_constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants/UI/Typography.constant */ "./src/constants/UI/Typography.constant.ts");
/* harmony import */ var _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../constants/UI/UI.constant */ "./src/constants/UI/UI.constant.ts");
var _jsxFileName = "/usr/src/app/src/components/elements/ui/InfoTag.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const InfoTag = ({
  text,
  icon
}) => {
  return __jsx(Container, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 5
    }
  }, __jsx(Icon, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 7
    }
  }, icon), __jsx(Text, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 7
    }
  }, text));
};
const Container = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "InfoTag__Container",
  componentId: "sc-4rr5iy-0"
})(["display:flex;flex-direction:row;flex-wrap:wrap;flex:6;flex-basis:200px;max-width:200px;margin-bottom:0.5rem;@media screen and (max-width:", "px){margin-bottom:1.5rem;}&:hover{svg,[class*=\"Text\"]{color:", ";}}"], _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_4__["UI"].mediumLayoutBreak, _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_2__["colors"].primary);
const Icon = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "InfoTag__Icon",
  componentId: "sc-4rr5iy-1"
})(["flex:2;display:flex;justify-content:center;max-width:20px;align-items:center;svg{color:", ";font-size:1.5rem;}"], _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_2__["colors"].dark);
const Text = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "InfoTag__Text",
  componentId: "sc-4rr5iy-2"
})(["flex:4;color:", ";font-size:", "px;display:flex;flex-direction:column;justify-content:center;padding-left:1rem;"], _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_2__["colors"].dark, _constants_UI_Typography_constant__WEBPACK_IMPORTED_MODULE_3__["typography"].smallTextSize);

/***/ }),

/***/ "./src/components/pages/index/NotFoundContainer.tsx":
/*!**********************************************************!*\
  !*** ./src/components/pages/index/NotFoundContainer.tsx ***!
  \**********************************************************/
/*! exports provided: NotFoundContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotFoundContainer", function() { return NotFoundContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../constants/UI/Colors.constant */ "./src/constants/UI/Colors.constant.ts");
var _jsxFileName = "/usr/src/app/src/components/pages/index/NotFoundContainer.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const NotFoundContainer = props => {
  return __jsx(Container, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 5
    }
  }, __jsx(ImgContainer, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 7
    }
  }, __jsx(PostNotFoundImg, {
    src: `/images/postNotFound.svg`,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 9
    }
  }), __jsx(Text, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 9
    }
  }, props.text)));
};
const Container = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "NotFoundContainer__Container",
  componentId: "sc-1p8pbr6-0"
})(["display:flex;justify-content:center;align-items:center;margin-top:3rem;flex-wrap:wrap;"]);
const ImgContainer = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "NotFoundContainer__ImgContainer",
  componentId: "sc-1p8pbr6-1"
})(["display:flex;flex-wrap:wrap;justify-content:center;align-items:center;"]);
const PostNotFoundImg = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.img.withConfig({
  displayName: "NotFoundContainer__PostNotFoundImg",
  componentId: "sc-1p8pbr6-2"
})(["max-width:150px;flex:100%;"]);
const Text = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.p.withConfig({
  displayName: "NotFoundContainer__Text",
  componentId: "sc-1p8pbr6-3"
})(["text-align:center;margin-top:1rem;flex:100%;color:", ";font-size:14px;margin-top:2rem;"], _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_2__["colors"].silver);

/***/ }),

/***/ "./src/components/pages/posts/PostCTA.tsx":
/*!************************************************!*\
  !*** ./src/components/pages/posts/PostCTA.tsx ***!
  \************************************************/
/*! exports provided: PostCTA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostCTA", function() { return PostCTA; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "@fortawesome/react-fontawesome");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../helpers/LanguageHelper */ "./src/helpers/LanguageHelper.ts");
var _jsxFileName = "/usr/src/app/src/components/pages/posts/PostCTA.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const PostCTA = ({
  email,
  phone,
  externalUrl
}) => {
  let CTAInfo;

  if (email) {
    CTAInfo = {
      icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faEnvelope"],
      link: `mailto:${email}`,
      translatedString: "postApplyBtn"
    };
  } else if (phone) {
    CTAInfo = {
      icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faMobileAlt"],
      link: `tel:${phone}`,
      translatedString: "postCallPhone"
    };
  } else if (externalUrl) {
    CTAInfo = {
      icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faLink"],
      link: externalUrl,
      translatedString: "postVisitExternalLink"
    };
  }

  return __jsx(Container, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 5
    }
  }, __jsx("a", {
    href: CTAInfo.link,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 7
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    className: "wobble-hor-bottom",
    variant: "contained",
    color: "secondary",
    size: "large",
    startIcon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
      icon: CTAInfo.icon,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51,
        columnNumber: 22
      }
    }),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 9
    }
  }, _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_5__["TS"].string("post", CTAInfo.translatedString).toUpperCase())));
};
const Container = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div.withConfig({
  displayName: "PostCTA__Container",
  componentId: "sc-1qn21yj-0"
})([""]);

/***/ }),

/***/ "./src/components/pages/posts/SearchBar.tsx":
/*!**************************************************!*\
  !*** ./src/components/pages/posts/SearchBar.tsx ***!
  \**************************************************/
/*! exports provided: SearchBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchBar", function() { return SearchBar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../constants/UI/UI.constant */ "./src/constants/UI/UI.constant.ts");
/* harmony import */ var _store_actions_ui_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../store/actions/ui.action */ "./src/store/actions/ui.action.ts");
/* harmony import */ var _elements_form_ProvinceSelector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../elements/form/ProvinceSelector */ "./src/components/elements/form/ProvinceSelector.tsx");
var _jsxFileName = "/usr/src/app/src/components/pages/posts/SearchBar.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;







const SearchBar = props => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_1__["useRouter"])();
  const {
    searchProvince
  } = router.query;
  const {
    0: hookSearchInput,
    1: setHookSearchInput
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");

  const onSubmit = async e => {
    e.preventDefault();
    await dispatch(Object(_store_actions_ui_action__WEBPACK_IMPORTED_MODULE_5__["setSearchKey"])("searchKeyword", hookSearchInput)); // console.log("submitted search!");
    // console.log(router.pathname);

    router.push({
      pathname: "/posts",
      query: {
        searchProvince,
        searchKeyword: hookSearchInput,
        page: 1 // since its a new search, page will be always 1!

      }
    });
  };

  return __jsx(FormContainer, {
    onSubmit: onSubmit,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 5
    }
  }, __jsx(SearchBarInput, {
    type: "text",
    title: "Search",
    onChange: e => setHookSearchInput(e.target.value),
    value: hookSearchInput,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 7
    }
  }), __jsx(ProvinceContainer, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 7
    }
  }, __jsx(_elements_form_ProvinceSelector__WEBPACK_IMPORTED_MODULE_6__["ProvinceSelector"], {
    provinces: props.provinces,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 9
    }
  })));
};
const FormContainer = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.form.withConfig({
  displayName: "SearchBar__FormContainer",
  componentId: "sc-1je134r-0"
})(["flex:100%;margin-bottom:1rem;display:flex;flex-wrap:wrap;flex-direction:row-reverse;@media screen and (min-width:", "px){flex:7;justify-content:center;align-items:center;display:flex;max-width:700px;margin-left:4rem;}"], _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_4__["UI"].mediumLayoutBreak);
const ProvinceContainer = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.div.withConfig({
  displayName: "SearchBar__ProvinceContainer",
  componentId: "sc-1je134r-1"
})(["flex:20%;display:flex;justify-content:center;height:3.3rem;padding-right:1rem;@media screen and (min-width:", "px){width:100%;max-width:70px;}[class*=\"MuiInput\"]{width:100%;border-radius:24px;padding-right:5px;}"], _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_4__["UI"].mediumLayoutBreak);
const SearchBarInput = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.input.withConfig({
  displayName: "SearchBar__SearchBarInput",
  componentId: "sc-1je134r-2"
})(["border:1px solid #dfe1e5;border-radius:24px;height:44px;background-image:url(\"/images/search.png\");background-repeat:no-repeat;background-position:98% 50%;font-size:14px;padding-left:20px;flex:80%;:focus,:focus,:focus{outline:none;}:hover{box-shadow:0 1px 6px 0 rgba(32,33,36,0.28);}"]);

/***/ }),

/***/ "./src/components/pages/posts/SearchLogo.tsx":
/*!***************************************************!*\
  !*** ./src/components/pages/posts/SearchLogo.tsx ***!
  \***************************************************/
/*! exports provided: SearchLogo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchLogo", function() { return SearchLogo; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants_Env_constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants/Env.constant */ "./src/constants/Env.constant.ts");
/* harmony import */ var _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../constants/UI/UI.constant */ "./src/constants/UI/UI.constant.ts");
var _jsxFileName = "/usr/src/app/src/components/pages/posts/SearchLogo.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const SearchLogo = () => {
  return __jsx(Container, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 5
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 7
    }
  }, __jsx("img", {
    src: `/images/logo-${_constants_Env_constant__WEBPACK_IMPORTED_MODULE_3__["appEnv"].language}.svg`,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 9
    }
  })));
};
const Container = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
  displayName: "SearchLogo__Container",
  componentId: "atffdm-0"
})(["cursor:pointer;flex:100%;justify-content:center;align-items:center;display:flex;margin-bottom:1rem;width:120px;height:70px;img{width:120px;}@media screen and (min-width:", "px){flex:1;max-width:120px;img{margin-left:3rem;}}"], _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_4__["UI"].mediumLayoutBreak);

/***/ }),

/***/ "./src/components/pages/posts/SearchTabs.tsx":
/*!***************************************************!*\
  !*** ./src/components/pages/posts/SearchTabs.tsx ***!
  \***************************************************/
/*! exports provided: SearchTabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchTabs", function() { return SearchTabs; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../constants/UI/Colors.constant */ "./src/constants/UI/Colors.constant.ts");
/* harmony import */ var _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants/UI/UI.constant */ "./src/constants/UI/UI.constant.ts");
/* harmony import */ var _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../helpers/LanguageHelper */ "./src/helpers/LanguageHelper.ts");
var _jsxFileName = "/usr/src/app/src/components/pages/posts/SearchTabs.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const SearchTabs = () => {
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(TabList, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 7
    }
  }, __jsx(TabItem, {
    active: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 9
    }
  }, _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_4__["TS"].string("ui", "tabJobs"))), __jsx(Divisor, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }
  }));
};
const TabList = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.ul.withConfig({
  displayName: "SearchTabs__TabList",
  componentId: "serhyh-0"
})(["flex:100%;list-style-type:none;margin:0;padding:0;display:flex;flex-wrap:wrap;"]);
const TabItem = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.li.withConfig({
  displayName: "SearchTabs__TabItem",
  componentId: "serhyh-1"
})(["cursor:pointer;margin-right:0.5rem;padding:0.5rem;color:", ";", ""], ({
  active
}) => active ? _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_2__["colors"].primary : _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_2__["colors"].secondaryGray, ({
  active
}) => active && Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["css"])(["border-bottom:2px solid ", ";"], _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_2__["colors"].primary));
const Divisor = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "SearchTabs__Divisor",
  componentId: "serhyh-2"
})(["position:absolute;left:0;width:100%;height:1px;background-color:", ";@media screen and (max-width:", "px){display:none;}"], _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_2__["colors"].secondaryGray, _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_3__["UI"].mediumLayoutBreak);

/***/ }),

/***/ "./src/components/pages/posts/results/SearchItem.tsx":
/*!***********************************************************!*\
  !*** ./src/components/pages/posts/results/SearchItem.tsx ***!
  \***********************************************************/
/*! exports provided: SearchItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchItem", function() { return SearchItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../constants/UI/Colors.constant */ "./src/constants/UI/Colors.constant.ts");
/* harmony import */ var _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../constants/UI/UI.constant */ "./src/constants/UI/UI.constant.ts");
/* harmony import */ var _helpers_DateHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../helpers/DateHelper */ "./src/helpers/DateHelper.ts");
/* harmony import */ var _elements_ui_Breadcumb__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../elements/ui/Breadcumb */ "./src/components/elements/ui/Breadcumb.tsx");
var _jsxFileName = "/usr/src/app/src/components/pages/posts/results/SearchItem.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






const SearchItem = ({
  id,
  category,
  tags,
  title,
  date,
  description,
  slug,
  stateCode
}) => {
  const humanDate = _helpers_DateHelper__WEBPACK_IMPORTED_MODULE_5__["DateHelper"].displayHumanDate(date);
  return __jsx(Container, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 5
    }
  }, __jsx(_elements_ui_Breadcumb__WEBPACK_IMPORTED_MODULE_6__["Breadcumb"], {
    parent: `${stateCode} - ${category}`,
    child: tags,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }
  }), __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/posts/[slug]",
    as: `/posts/${slug}`,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }
  }, __jsx(Title, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 9
    }
  }, title)), __jsx(MobileDate, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }
  }, humanDate), __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/posts/[slug]",
    as: `/posts/${slug}`,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 7
    }
  }, __jsx(Description, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 9
    }
  }, __jsx(DesktopDate, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 11
    }
  }, humanDate, " - "), description)));
};
const Container = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
  displayName: "SearchItem__Container",
  componentId: "cxzb8i-0"
})(["flex:100%;background-color:#fff;margin:0 0 10px 0;box-shadow:0 1px 6px rgba(32,33,36,0.28);border-radius:8px;border-bottom:1px hidden #fff;padding:1.5rem;word-break:break-all;@media screen and (min-width:", "px){box-shadow:none;padding-left:0;max-width:652px;}"], _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_4__["UI"].mediumLayoutBreak);
const Title = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
  displayName: "SearchItem__Title",
  componentId: "cxzb8i-1"
})(["font-size:18px;margin-top:1rem;font-weight:300;color:", ";cursor:pointer;&:hover{text-decoration:underline;}"], () => _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_3__["colors"].primary);
const Description = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
  displayName: "SearchItem__Description",
  componentId: "cxzb8i-2"
})(["cursor:pointer;color:", ";font-size:14px;margin-top:0.5rem;line-height:1.4;white-space:pre-wrap;&:hover{text-decoration:underline;}"], () => _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_3__["colors"].dark);
const MobileDate = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
  displayName: "SearchItem__MobileDate",
  componentId: "cxzb8i-3"
})(["@media screen and (max-width:", "px){color:", ";margin-top:1rem;font-size:14px;display:block;}display:none;"], _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_4__["UI"].mediumLayoutBreak, () => _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_3__["colors"].silver);
const DesktopDate = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.span.withConfig({
  displayName: "SearchItem__DesktopDate",
  componentId: "cxzb8i-4"
})(["@media screen and (min-width:", "px){color:", ";font-size:14px;display:inline;}display:none;"], _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_4__["UI"].mediumLayoutBreak, () => _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_3__["colors"].silver);

/***/ }),

/***/ "./src/components/pages/posts/results/SearchResults.tsx":
/*!**************************************************************!*\
  !*** ./src/components/pages/posts/results/SearchResults.tsx ***!
  \**************************************************************/
/*! exports provided: SearchResults */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchResults", function() { return SearchResults; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../helpers/LanguageHelper */ "./src/helpers/LanguageHelper.ts");
/* harmony import */ var _index_NotFoundContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../index/NotFoundContainer */ "./src/components/pages/index/NotFoundContainer.tsx");
/* harmony import */ var _SearchItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SearchItem */ "./src/components/pages/posts/results/SearchItem.tsx");
var _jsxFileName = "/usr/src/app/src/components/pages/posts/results/SearchResults.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const SearchResults = ({
  posts
}) => {
  const filteredPosts = posts.filter(post => post.owner);

  const onRenderPosts = () => {
    if (!filteredPosts.length) {
      return __jsx(_index_NotFoundContainer__WEBPACK_IMPORTED_MODULE_3__["NotFoundContainer"], {
        text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_2__["TS"].string("post", "postsNotFound"),
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17,
          columnNumber: 14
        }
      });
    }

    return __jsx(Container, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21,
        columnNumber: 7
      }
    }, filteredPosts === null || filteredPosts === void 0 ? void 0 : filteredPosts.map(post => __jsx(_SearchItem__WEBPACK_IMPORTED_MODULE_4__["SearchItem"], {
      id: post._id,
      key: post._id,
      category: post.sector,
      tags: post.jobRoles.join(","),
      title: post.title,
      date: post.createdAt,
      description: post.content,
      slug: post.slug,
      stateCode: post.stateCode,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23,
        columnNumber: 11
      }
    })));
  };

  return onRenderPosts();
};
const Container = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({
  displayName: "SearchResults__Container",
  componentId: "r13t24-0"
})(["margin-top:2rem;"]);

/***/ }),

/***/ "./src/components/seo/NextSEOPost.tsx":
/*!********************************************!*\
  !*** ./src/components/seo/NextSEOPost.tsx ***!
  \********************************************/
/*! exports provided: NextSEOPost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NextSEOPost", function() { return NextSEOPost; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_seo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-seo */ "next-seo");
/* harmony import */ var next_seo__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_seo__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_Env_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants/Env.constant */ "./src/constants/Env.constant.ts");
var _jsxFileName = "/usr/src/app/src/components/seo/NextSEOPost.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const NextSEOPost = ({
  jobRole,
  title,
  description,
  link,
  city,
  stateCode
}) => {
  return __jsx(next_seo__WEBPACK_IMPORTED_MODULE_1__["NextSeo"], {
    title: `Vaga para ${jobRole} em ${city}, ${stateCode}`,
    description: description,
    canonical: link,
    openGraph: {
      url: link,
      title: `Vaga para ${jobRole} em ${city}, ${stateCode}`,
      description,
      images: [{
        url: "/images/seo/emprego-urgente800600.png",
        width: 800,
        height: 600,
        alt: "Emprego urgente logo"
      }],
      site_name: _constants_Env_constant__WEBPACK_IMPORTED_MODULE_2__["appEnv"].appName
    },
    twitter: {
      handle: "@handle",
      site: "@site",
      cardType: "summary_large_image"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 5
    }
  });
};

/***/ }),

/***/ "./src/components/seo/NextSEOPosts.tsx":
/*!*********************************************!*\
  !*** ./src/components/seo/NextSEOPosts.tsx ***!
  \*********************************************/
/*! exports provided: NextSEOPosts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NextSEOPosts", function() { return NextSEOPosts; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_seo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-seo */ "next-seo");
/* harmony import */ var next_seo__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_seo__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_Env_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants/Env.constant */ "./src/constants/Env.constant.ts");
/* harmony import */ var _types_Global_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../types/Global.types */ "./src/types/Global.types.ts");
var _jsxFileName = "/usr/src/app/src/components/seo/NextSEOPosts.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const NextSEOPosts = ({
  postsQty,
  jobRole,
  city,
  stateCode
}) => {
  switch (_constants_Env_constant__WEBPACK_IMPORTED_MODULE_2__["appEnv"].language) {
    case _types_Global_types__WEBPACK_IMPORTED_MODULE_3__["AvailableLanguages"].ptBr:
      const title = `Emprego Urgente | ${postsQty} vagas de ${jobRole} em ${city}, ${stateCode}`;
      const description = `Cadastre seu currículo agora mesmo e tenha acesso a mais de ${postsQty} vagas de ${jobRole} em todo Brasil!`;
      const link = "https://www.empregourgente.com";
      return __jsx(next_seo__WEBPACK_IMPORTED_MODULE_1__["NextSeo"], {
        title: title,
        description: description,
        canonical: link,
        openGraph: {
          url: link,
          title,
          description,
          images: [{
            url: "/images/seo/emprego-urgente800600.png",
            width: 800,
            height: 600,
            alt: "Emprego urgente logo"
          }],
          site_name: _constants_Env_constant__WEBPACK_IMPORTED_MODULE_2__["appEnv"].appName
        },
        twitter: {
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image"
        },
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26,
          columnNumber: 9
        }
      });

    case _types_Global_types__WEBPACK_IMPORTED_MODULE_3__["AvailableLanguages"].eng:
      return null;
    // TODO: Configure SEO for this page in english
  }
};

/***/ }),

/***/ "./src/constants/Env.constant.ts":
/*!***************************************!*\
  !*** ./src/constants/Env.constant.ts ***!
  \***************************************/
/*! exports provided: ENV, appEnv */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENV", function() { return ENV; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appEnv", function() { return appEnv; });
/* harmony import */ var _types_Global_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/Global.types */ "./src/types/Global.types.ts");

const ENV = _types_Global_types__WEBPACK_IMPORTED_MODULE_0__["EnvironmentTypes"].Development; // set the current environment here

const defineServerUrl = () => {
  // Solution if fails to connect: https://stackoverflow.com/questions/33704130/react-native-android-fetch-failing-on-connection-to-local-api
  // You must use LAN on Expo developer tools settings, otherwise it won't map the docker container.
  switch (ENV) {
    case _types_Global_types__WEBPACK_IMPORTED_MODULE_0__["EnvironmentTypes"].Development:
      // Next.JS will break on Router.push if we're not checking where specifically to submit our requests. Tricky issue, but only happens on development.
      // For more info, please check: https://github.com/apollographql/apollo-link/issues/375
      if (true) {
        return "http://app-api:3000"; // were running on server
      } else {}

    case _types_Global_types__WEBPACK_IMPORTED_MODULE_0__["EnvironmentTypes"].Production:
      return "https://api.empregourgente.com";

    case _types_Global_types__WEBPACK_IMPORTED_MODULE_0__["EnvironmentTypes"].Staging:
      return "https://staging.empregourgente.com";
  }
};

const appEnv = {
  appName: "Emprego Urgente",
  appNameFull: "Emprego Urgente LLC",
  appPrivacyPolicyUrl: "https://empregourgente.com/privacy",
  appUrl: "https://empregourgente.com",
  appState: "ES",
  appAddress: "Av Hugo Musso",
  appCity: "Vila Velha",
  appCountry: "Brazil",
  appEmail: "admin@empregourgente.com",
  language: _types_Global_types__WEBPACK_IMPORTED_MODULE_0__["AvailableLanguages"].ptBr,
  serverUrl: defineServerUrl(),
  // current serverUrl
  oauth: {
    // * REMEMBER: you should also configure app.json with proper ids
    google: {
      // * Docs: https://docs.expo.io/versions/latest/sdk/google/
      iosClientId: "1053239267142-p1ofcpk9lu4o3tom5lk29hf073dcstc3.apps.googleusercontent.com",
      // from GoogleService-Info.plist
      // from google developers console
      androidClientId: "1053239267142-a7cifhker3gn299guu0oer711g1go9r1.apps.googleusercontent.com",
      androidStandaloneAppClientId: "1053239267142-ejd570705r05ci422khsfsr5tt7qj2qs.apps.googleusercontent.com",
      iosStandaloneAppClientId: "1053239267142-ujhhl1gajisdavkp81qbtb16kfthabsn.apps.googleusercontent.com"
    },
    // * Docs: https://docs.expo.io/versions/latest/sdk/facebook/
    facebook: {
      appId: "635354810586069",
      appName: "Emprego Urgente"
    }
  },
  admob: {
    // * Docs: https://docs.expo.io/versions/latest/sdk/admob/
    // * REMEMBER: you should also configure app.json with proper ids
    enabled: true,
    adUnitID: "ca-app-pub-6892417234935549/5214954384"
  },
  onboarding: {
    // * Configure it at Onboarding.screen.tsx
    enabled: false
  },
  monitoring: {
    sentry: {
      dns: "https://f71fae3a5cb8473a9d7e2c9f584e5de9@sentry.io/1887002",
      projectName: "emprego-urgente",
      organizationName: "emprego-urgente"
    },
    googleAnalytics: {
      UA: "UA-156516010-1"
    }
  }
};

/***/ }),

/***/ "./src/constants/UI/Colors.constant.ts":
/*!*********************************************!*\
  !*** ./src/constants/UI/Colors.constant.ts ***!
  \*********************************************/
/*! exports provided: colors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colors", function() { return colors; });
const colors = {
  primary: "#1D58FF",
  primaryDark: "#143491",
  accent: "#F42D59",
  accentDark: "#b82142",
  accentLight: "#ff698a",
  dark: "#253031",
  darker: "#212121",
  gray: "#212121",
  white: "#F1F1F1",
  green: "#3ED400",
  lightGreen: "#A1FF7A",
  lightGray: "#F5F5F5",
  mediumGray: "#f0f0f0",
  backgroundGray: "#F5F5F5",
  red: "#FF6724",
  blue: "#5483EF",
  lightBlue: "#50B0FB",
  yellow: "#FFDC30",
  backgroundGmail: "#D44638",
  backgroundFacebook: "#4267B2",
  silver: "#808a8b",
  secondaryGray: "rgba(0,0,0,0.14)",
  whatsappGreen: "#25D366",
  facebookBlue: "#4064AD"
};

/***/ }),

/***/ "./src/constants/UI/Common.constant.ts":
/*!*********************************************!*\
  !*** ./src/constants/UI/Common.constant.ts ***!
  \*********************************************/
/*! exports provided: H1, H2, Small, P */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H1", function() { return H1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H2", function() { return H2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Small", function() { return Small; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P", function() { return P; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Colors_constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Colors.constant */ "./src/constants/UI/Colors.constant.ts");
/* harmony import */ var _Typography_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Typography.constant */ "./src/constants/UI/Typography.constant.ts");



const H1 = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.h1.withConfig({
  displayName: "Commonconstant__H1",
  componentId: "xvltui-0"
})(["color:", ";"], _Colors_constant__WEBPACK_IMPORTED_MODULE_1__["colors"].primary);
const H2 = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.h2.withConfig({
  displayName: "Commonconstant__H2",
  componentId: "xvltui-1"
})(["color:", ";"], _Colors_constant__WEBPACK_IMPORTED_MODULE_1__["colors"].primary);
const Small = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.p.withConfig({
  displayName: "Commonconstant__Small",
  componentId: "xvltui-2"
})(["font-size:", "px;color:", ";"], _Typography_constant__WEBPACK_IMPORTED_MODULE_2__["typography"].smallTextSize, _Colors_constant__WEBPACK_IMPORTED_MODULE_1__["colors"].dark);
const P = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.p.withConfig({
  displayName: "Commonconstant__P",
  componentId: "xvltui-3"
})(["color:", ";"], _Colors_constant__WEBPACK_IMPORTED_MODULE_1__["colors"].silver);

/***/ }),

/***/ "./src/constants/UI/Typography.constant.ts":
/*!*************************************************!*\
  !*** ./src/constants/UI/Typography.constant.ts ***!
  \*************************************************/
/*! exports provided: typography */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typography", function() { return typography; });
const typography = {
  smallTextSize: 12,
  mediumTextSize: 16,
  largeTextSize: 21,
  ultraLargeTextSize: 28
};

/***/ }),

/***/ "./src/constants/UI/UI.constant.ts":
/*!*****************************************!*\
  !*** ./src/constants/UI/UI.constant.ts ***!
  \*****************************************/
/*! exports provided: UI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UI", function() { return UI; });
const UI = {
  mediumLayoutBreak: 700,
  // in px
  smallLayoutBreak: 400
};

/***/ }),

/***/ "./src/helpers/APIHelper.ts":
/*!**********************************!*\
  !*** ./src/helpers/APIHelper.ts ***!
  \**********************************/
/*! exports provided: APIHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APIHelper", function() { return APIHelper; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_Env_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/Env.constant */ "./src/constants/Env.constant.ts");
/* harmony import */ var _types_Global_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types/Global.types */ "./src/types/Global.types.ts");
/* harmony import */ var _LanguageHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LanguageHelper */ "./src/helpers/LanguageHelper.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class APIHelper {}

_defineProperty(APIHelper, "request", async (method, url, data, useAuth = true, customHeaders = {}, onTimeoutCallback = () => null, timeout = 5000) => {
  let AUTH_HEADERS;

  try {
    if (useAuth) {
      const token = await window.localStorage.getItem("token");
      AUTH_HEADERS = {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json"
      };
    }

    const GUEST_HEADERS = {
      "Content-type": "application/json"
    }; // prepare connection timeout callback

    const abort = axios__WEBPACK_IMPORTED_MODULE_0___default.a.CancelToken.source();
    const timeoutCallback = setTimeout(() => {
      abort.cancel(`Timeout of ${timeout}ms.`);

      if (onTimeoutCallback() !== null) {
        onTimeoutCallback();
      } else {
        console.log("request timeout");
        alert(_LanguageHelper__WEBPACK_IMPORTED_MODULE_4__["TS"].string("global", "requestTimeoutTitle"));
        next_router__WEBPACK_IMPORTED_MODULE_1___default.a.push("/login");
      }
    }, timeout);

    if (_constants_Env_constant__WEBPACK_IMPORTED_MODULE_2__["ENV"] === _types_Global_types__WEBPACK_IMPORTED_MODULE_3__["EnvironmentTypes"].Development) {
      console.log(`Request to: ${_constants_Env_constant__WEBPACK_IMPORTED_MODULE_2__["appEnv"].serverUrl}${url}`);
    } // execute request


    const response = await axios__WEBPACK_IMPORTED_MODULE_0___default()({
      method,
      url: `${_constants_Env_constant__WEBPACK_IMPORTED_MODULE_2__["appEnv"].serverUrl}${url}`,
      data,
      cancelToken: abort.token,

      validateStatus(status) {
        return status >= 200 && status <= 500; // default
      },

      headers: useAuth ? _objectSpread({}, AUTH_HEADERS, {}, customHeaders) : _objectSpread({}, GUEST_HEADERS, {}, customHeaders)
    }); // If user is not authenticated...
    // 401 = Unauthorized status

    if (response.status === 401) {
      console.log("User is not authenticated. Redirecting to Login..."); // clear current redux store
      // persistor.purge();

      console.log("authentication error");
      alert(_LanguageHelper__WEBPACK_IMPORTED_MODULE_4__["TS"].string("account", "loginUserNotAuthenticated"));
      next_router__WEBPACK_IMPORTED_MODULE_1___default.a.push("/login"); // NavigationHelper.navigate("Auth", null);
    }

    clearTimeout(timeoutCallback);
    return response;
  } catch (error) {
    console.log(error);
  }
});

/***/ }),

/***/ "./src/helpers/DateHelper.ts":
/*!***********************************!*\
  !*** ./src/helpers/DateHelper.ts ***!
  \***********************************/
/*! exports provided: DateHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateHelper", function() { return DateHelper; });
/* harmony import */ var moment_locale_pt_br__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment/locale/pt-br */ "moment/locale/pt-br");
/* harmony import */ var moment_locale_pt_br__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment_locale_pt_br__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_Env_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/Env.constant */ "./src/constants/Env.constant.ts");
/* harmony import */ var _types_Global_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types/Global.types */ "./src/types/Global.types.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class DateHelper {}

_defineProperty(DateHelper, "displayHumanDate", date => {
  switch (_constants_Env_constant__WEBPACK_IMPORTED_MODULE_2__["appEnv"].language) {
    case _types_Global_types__WEBPACK_IMPORTED_MODULE_3__["AvailableLanguages"].ptBr:
      return moment__WEBPACK_IMPORTED_MODULE_1___default()(date).locale("pt-br").format("ddd, DD MMM YY");

    case _types_Global_types__WEBPACK_IMPORTED_MODULE_3__["AvailableLanguages"].eng:
      return moment__WEBPACK_IMPORTED_MODULE_1___default()(date).locale("en").format("ddd, MMM Do YY");

    default:
      return moment__WEBPACK_IMPORTED_MODULE_1___default()(date).locale("en").format("ddd, MMM Do YY");
  }
});

_defineProperty(DateHelper, "_analyzeDate", (inputFormat, separator) => {
  const splittedData = inputFormat.split(separator);
  const dataComponentsPosition = {
    month: {
      index: 0,
      characters: 0
    },
    year: {
      index: 0,
      characters: 0
    },
    day: {
      index: 0,
      characters: 0
    }
  }; // tslint:disable-next-line: forin

  for (const index in splittedData) {
    if (splittedData[index].includes("D")) {
      dataComponentsPosition.day.index = parseInt(index);
      dataComponentsPosition.day.characters = splittedData[index].length;
    }

    if (splittedData[index].includes("M")) {
      dataComponentsPosition.month.index = parseInt(index);
      dataComponentsPosition.month.characters = splittedData[index].length;
    }

    if (splittedData[index].includes("Y")) {
      dataComponentsPosition.year.index = parseInt(index);
      dataComponentsPosition.year.characters = splittedData[index].length;
    }
  }

  return dataComponentsPosition;
});

_defineProperty(DateHelper, "parseDataToServerFormat", (rawData, inputFormat, separator) => {
  const splittedRawData = rawData.split(separator);

  const analyzedInputFormat = DateHelper._analyzeDate(inputFormat, separator);

  const month = splittedRawData[analyzedInputFormat.month.index];
  const day = splittedRawData[analyzedInputFormat.day.index];
  const year = splittedRawData[analyzedInputFormat.year.index]; // this function will always output to this format: MM/DD/YYYY (server accepted format)

  return `${month}${separator}${day}${separator}${year}`;
});

/***/ }),

/***/ "./src/helpers/GenericHelper.ts":
/*!**************************************!*\
  !*** ./src/helpers/GenericHelper.ts ***!
  \**************************************/
/*! exports provided: GenericHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenericHelper", function() { return GenericHelper; });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class GenericHelper {}

_defineProperty(GenericHelper, "parseMaskedInput", (unit, delimiter, value) => {
  const parsedValue = value.replace(unit, "").replace(/\./g, "").replace(/\,/g, delimiter);
  return parseFloat(parsedValue);
});

_defineProperty(GenericHelper, "generateUrlParams", (baseUrl, params) => {
  const values = Object.keys(params).map(key => params[key]);
  const everyNull = values.every(value => value === null || undefined);

  if (everyNull) {
    return baseUrl;
  }

  baseUrl += `?`;
  Object.entries(params).map(([key, value]) => {
    if (value) {
      baseUrl += `${key}=${value}&`;
    }
  });
  baseUrl = baseUrl.slice(0, baseUrl.length - 1);
  return baseUrl;
});

/***/ }),

/***/ "./src/helpers/LanguageHelper.ts":
/*!***************************************!*\
  !*** ./src/helpers/LanguageHelper.ts ***!
  \***************************************/
/*! exports provided: TS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TS", function() { return TS; });
/* harmony import */ var _constants_Env_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/Env.constant */ "./src/constants/Env.constant.ts");
/* harmony import */ var _languages_global_lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../languages/global.lang */ "./src/languages/global.lang.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class TS {}

_defineProperty(TS, "replaceTemplateStrings", (str, customVars) => {
  const customVarsKeys = Object.keys(customVars);

  if (customVarsKeys) {
    for (const k of customVarsKeys) {
      str = str.replace(new RegExp(`{{${k}}}`, "g"), customVars[k]);
    }
  }

  return str;
});

_defineProperty(TS, "string", (model = null, key, customVars = {}) => {
  if (!model) {
    // pass only the global strings
    return TS.replaceTemplateStrings(_languages_global_lang__WEBPACK_IMPORTED_MODULE_1__["globalStrings"][key][_constants_Env_constant__WEBPACK_IMPORTED_MODULE_0__["appEnv"].language], customVars);
  } // load language strings for a specific model


  const {
    strings
  } = __webpack_require__("./src/languages sync recursive ^\\.\\/.*\\.lang\\.ts$")(`./${model}.lang.ts`); // add our global generic strings


  const languageStrings = _objectSpread({}, strings, {}, _languages_global_lang__WEBPACK_IMPORTED_MODULE_1__["globalStrings"]);

  let string = languageStrings[key][_constants_Env_constant__WEBPACK_IMPORTED_MODULE_0__["appEnv"].language];
  const customVarsKeys = Object.keys(customVars);

  if (customVarsKeys) {
    for (const k of customVarsKeys) {
      string = string.replace(new RegExp(`{{${k}}}`, "g"), customVars[k]);
    }
  }

  return string;
});

/***/ }),

/***/ "./src/languages sync recursive ^\\.\\/.*\\.lang\\.ts$":
/*!***********************************************!*\
  !*** ./src/languages sync ^\.\/.*\.lang\.ts$ ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./account.lang.ts": "./src/languages/account.lang.ts",
	"./form.lang.ts": "./src/languages/form.lang.ts",
	"./global.lang.ts": "./src/languages/global.lang.ts",
	"./landing.lang.ts": "./src/languages/landing.lang.ts",
	"./post.lang.ts": "./src/languages/post.lang.ts",
	"./ui.lang.ts": "./src/languages/ui.lang.ts"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/languages sync recursive ^\\.\\/.*\\.lang\\.ts$";

/***/ }),

/***/ "./src/languages/account.lang.ts":
/*!***************************************!*\
  !*** ./src/languages/account.lang.ts ***!
  \***************************************/
/*! exports provided: strings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
const strings = {
  accountInfoUpdated: {
    eng: "Your account info was updated!",
    ptBr: "As informações da sua conta foram atualizadas!"
  },
  loginButtonText: {
    eng: "Login",
    ptBr: "Login"
  },
  logoutButtonText: {
    eng: "Logout",
    ptBr: "Logout"
  },
  emailInput: {
    eng: "Email",
    ptBr: "Email"
  },
  passwordInput: {
    eng: "Password",
    ptBr: "Senha"
  },
  passwordConfirmInput: {
    eng: "Password confirmation",
    ptBr: "Confirmação de senha"
  },
  registerCreateYourAccount: {
    eng: "Create your Account",
    ptBr: "Crie sua Conta"
  },
  registerButtonText: {
    eng: "Sign Up",
    ptBr: "Registrar"
  },
  registerInputName: {
    eng: "Name",
    ptBr: "Nome"
  },
  registerInputEmail: {
    eng: "Email",
    ptBr: "Email"
  },
  accountJobSeeker: {
    eng: "Job Seeker",
    ptBr: "Procuro Emprego"
  },
  accountCompany: {
    eng: "Company",
    ptBr: "Empresa"
  },
  registerInputPassword: {
    eng: "Password",
    ptBr: "Senha"
  },
  registerInputPasswordConfirmation: {
    eng: "Password Confirmation",
    ptBr: "Confirmação de senha"
  },
  registerSuccess: {
    eng: "Your new account was created successfully!",
    ptBr: "Sua nova conta foi criada com sucesso!"
  },
  loginFailedTitle: {
    eng: "Error",
    ptBr: "Erro"
  },
  loginAuthenticationError: {
    eng: "Authentication error",
    ptBr: "Erro de autenticação"
  },
  loginUserNotAuthenticated: {
    eng: "Please login again!",
    ptBr: "Por favor, realize o login novamente!"
  },
  loginSuccessTitle: {
    eng: "Success!",
    ptBr: "Tudo certo!"
  },
  loginNoEmail: {
    eng: "Please, insert an e-mail address",
    ptBr: "Por favor, insira seu endereço de email"
  },
  loginNoPassword: {
    eng: "Please, insert a password",
    ptBr: "Por favor, insira sua senha"
  },
  loginDontHaveAccount: {
    eng: "Don't have an account?",
    ptBr: "Ainda não possui uma conta?"
  },
  loginSignupHere: {
    eng: "Create Account",
    ptBr: "Criar Conta"
  },
  changePasswordLoginText: {
    eng: "Change password",
    ptBr: "Mudar senha"
  },
  forgotPasswordLoginText: {
    eng: "Forgot Password?",
    ptBr: "Esqueceu sua Senha?"
  },
  changePasswordTitle: {
    eng: "Change your Password",
    ptBr: "Trocar sua Senha"
  },
  changePasswordButton: {
    eng: "Change",
    ptBr: "Trocar"
  },
  changePasswordCurrentPasswordInput: {
    eng: "Current Password",
    ptBr: "Senha Atual"
  },
  changePasswordNewPasswordInput: {
    eng: "New Password",
    ptBr: "Nova Senha"
  },
  changePasswordRepeatNewPasswordInput: {
    eng: "Repeat Your New Password",
    ptBr: "Repita Sua Nova Senha"
  },
  accountDeletionConfirmationText: {
    eng: "This will delete your account and all information associated with it. Are you sure?",
    ptBr: "Essa ação irá deletar sua conta e toda informação associada a ela. Tem certeza que deseja prosseguir?"
  },
  accountLogoutConfirmationText: {
    eng: "Are you sure that you want to logout?",
    ptBr: "Tem certeza que deseja deslogar?"
  },
  accountDeletionConfirmYes: {
    eng: "Yes, delete account",
    ptBr: "Sim, deletar conta"
  },
  forgotPasswordTitle: {
    eng: "Forgot Password",
    ptBr: "Esqueci Minha Senha"
  },
  forgotPasswordText: {
    eng: "Fill your e-mail below to receive a link to reset your password",
    ptBr: "Preencha seu e-mail abaixo para receber um link e resetar sua senha"
  },
  forgotPasswordButton: {
    eng: "Recover Password",
    ptBr: "Recuperar Senha"
  },
  loginWithGmail: {
    eng: "Login with Gmail",
    ptBr: "Login com Gmail"
  },
  loginWithFacebook: {
    eng: "Login with Facebook",
    ptBr: "Login com Facebook"
  },
  termsOfUsePart1: {
    eng: "By signing in you agree with our",
    ptBr: "Ao logar você com nossos"
  },
  termsOfUsePart2: {
    eng: "terms of use",
    ptBr: "termos de uso"
  },
  loginOrSignInWithText: {
    eng: "Or Sign in with",
    ptBr: "Ou acesse com"
  },
  loginSelectAccountTypeTitle: {
    eng: "Account Type",
    ptBr: "Tipo de Conta"
  },
  loginSelectAccountTypeText: {
    eng: "Please, select your account type",
    ptBr: "Por favor, selecione seu tipo de conta"
  },
  initialAccountDetailsTitle: {
    eng: "Important Details",
    ptBr: "Detalhes Importantes"
  },
  initialAccountDetailsDescription: {
    eng: "Please, fill the fields below so we can find relevant jobs for you:",
    ptBr: "IMPORTANTE: Preencha os campos abaixo!"
  },
  genericPositionsOfInterestFillError: {
    eng: "Please, fill your position of interest.",
    ptBr: "Por favor, preencha suas vagas de interesse."
  }
};

/***/ }),

/***/ "./src/languages/form.lang.ts":
/*!************************************!*\
  !*** ./src/languages/form.lang.ts ***!
  \************************************/
/*! exports provided: strings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
const strings = {
  indexSearchInput: {
    eng: "Search for a job...",
    ptBr: "Digite uma vaga..."
  },
  birthdayInputLabel: {
    eng: "Birthday",
    ptBr: "Aniversário"
  },
  birthdayInputPlaceholder: {
    eng: "Select your birthday",
    ptBr: "Sua data de nascimento"
  },
  birthdayInputFormat: {
    eng: "YYYY/MM/DD",
    ptBr: "DD/MM/YYYY"
  },
  dateInputFormat: {
    eng: "MM/DD/YYYY",
    ptBr: "DD/MM/YYYY"
  },
  selectProvinceText: {
    eng: "Please, select your province...",
    ptBr: "Selecione seu estado..."
  },
  selectCityText: {
    eng: "Please, select your province first",
    ptBr: "Selecione seu estado primeiro"
  },
  locationDefaultError: {
    eng: "Please, select your province and city",
    ptBr: "Por favor, selecione seu estado e cidade"
  }
};

/***/ }),

/***/ "./src/languages/global.lang.ts":
/*!**************************************!*\
  !*** ./src/languages/global.lang.ts ***!
  \**************************************/
/*! exports provided: globalStrings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "globalStrings", function() { return globalStrings; });
const globalStrings = {
  currency: {
    eng: "CAD",
    ptBr: "R$"
  },
  networkErrorTitle: {
    eng: "Oops!",
    ptBr: "Oops!"
  },
  networkErrorMessage: {
    eng: "Please turn on your mobile connection.",
    ptBr: "Por favor, ative sua internet móvel"
  },
  requestTimeoutTitle: {
    eng: "Request timeout",
    ptBr: "Tempo de requisição excedido"
  },
  requestTimeoutMessage: {
    eng: "Server is probably offline. Please, try again later.",
    ptBr: "Nosso servidor está desligado no momento. Por favor, tente novamente mais tarde."
  },
  genericErrorTitle: {
    eng: "Oops!",
    ptBr: "Oops!"
  },
  genericOptional: {
    eng: "Optional",
    ptBr: "Opcional"
  },
  genericSuccessTitle: {
    eng: "Success!",
    ptBr: "Tudo certo!"
  },
  genericConfirmationTitle: {
    eng: "Confirmation",
    ptBr: "Confirmação"
  },
  genericTextYes: {
    eng: "Yes",
    ptBr: "Sim"
  },
  genericTextYesDelete: {
    eng: "Yes, delete",
    ptBr: "Sim, deletar"
  },
  genericTextNo: {
    eng: "No",
    ptBr: "Não"
  },
  genericConfirm: {
    eng: "Confirm",
    ptBr: "Confirmar"
  },
  genericCancel: {
    eng: "Cancel",
    ptBr: "Cancelar"
  },
  genericAdd: {
    eng: "Add",
    ptBr: "Adicionar"
  },
  genericDelete: {
    eng: "Delete",
    ptBr: "Deletar"
  },
  genericSubmit: {
    eng: "Submit",
    ptBr: "Enviar"
  },
  genericSelect: {
    eng: "Select",
    ptBr: "Selecionar"
  },
  genericActive: {
    eng: "Active",
    ptBr: "Ativo"
  },
  genericFollowingFieldsInvalid: {
    eng: "Please, fill the following fields before proceeding:",
    ptBr: "Por favor, preencha os seguintes campos:"
  },
  genericAreYouSureTitle: {
    eng: "Confirmation",
    ptBr: "Confirmação"
  },
  genericAreYouSureDeleteItem: {
    eng: "Are you sure that you want to delete this item? This action cannot be undone!",
    ptBr: "Você tem certeza que deseja deletar esse item? Essa ação não pode ser desfeita!"
  },
  joinOurCommunity: {
    eng: "Join our communities!",
    ptBr: "Participe de nossas comunidades!"
  }
};

/***/ }),

/***/ "./src/languages/landing.lang.ts":
/*!***************************************!*\
  !*** ./src/languages/landing.lang.ts ***!
  \***************************************/
/*! exports provided: strings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
const strings = {
  searchButton: {
    eng: "Search",
    ptBr: "Buscar"
  }
};

/***/ }),

/***/ "./src/languages/post.lang.ts":
/*!************************************!*\
  !*** ./src/languages/post.lang.ts ***!
  \************************************/
/*! exports provided: strings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
const strings = {
  postsNotFound: {
    eng: "Posts not found!",
    ptBr: "Nenhuma vaga encontrada!"
  },
  errorModalInputNotFilled: {
    eng: 'The input "{{inputName}}" is not filled.',
    ptBr: 'O campo "{{inputName}}" não foi preenchido.'
  },
  postApplyFor: {
    eng: "Apply for",
    ptBr: "Aplicar para"
  },
  postBenefitFoodTicket: {
    eng: "Meal ticket",
    ptBr: "Vale-refeição"
  },
  postBenefitMeal: {
    eng: "Meal",
    ptBr: "Refeição"
  },
  postBenefitHealthCare: {
    eng: "Healthcare",
    ptBr: "Plano de saúde"
  },
  postBenefitTransportation: {
    eng: "Transportation",
    ptBr: "Vale-transporte"
  },
  postSearchPlaceholder: {
    eng: "Search for a position",
    ptBr: "Procure por uma vaga"
  },
  postCreationSuccess: {
    eng: "Your post was created!",
    ptBr: "Seu post foi criado!"
  },
  postModalAttachAPicture: {
    eng: "Attach a Picture",
    ptBr: "Anexe uma Imagem"
  },
  postModalSubmitCTA: {
    eng: "Submit",
    ptBr: "Enviar"
  },
  postAddLabel: {
    eng: "Add a job post",
    ptBr: "Adicionar vaga"
  },
  postModalTitle: {
    eng: "Create a New Post",
    ptBr: "Adicionar Vaga"
  },
  postFieldTitle: {
    eng: "Ad Title",
    ptBr: "Título do anúncio"
  },
  postFieldJobRole: {
    eng: "Job Role(s)",
    ptBr: "Vaga(s)"
  },
  postErrorJobRoles: {
    eng: "Please, add some job roles to your post",
    ptBr: "Por favor, adicione algumas vagas ao seu post."
  },
  postInputTitle: {
    eng: "Title",
    ptBr: "Título"
  },
  postFieldCategory: {
    eng: "Category",
    ptBr: "Categoria"
  },
  postFieldCountry: {
    eng: "Country",
    ptBr: "País"
  },
  postFieldCity: {
    eng: "City",
    ptBr: "Cidade"
  },
  postFieldState: {
    eng: "State",
    ptBr: "Estado"
  },
  postFieldSector: {
    eng: "Sector",
    ptBr: "Setor"
  },
  postFieldMonthlySalary: {
    eng: "Monthly Salary",
    ptBr: "Salário Mensal"
  },
  postFieldPositionType: {
    eng: "Position Type",
    ptBr: "Tipo de Vaga"
  },
  postFieldEmail: {
    eng: "E-mail",
    ptBr: "E-mail"
  },
  postFieldContent: {
    eng: "Content",
    ptBr: "Conteúdo"
  },
  postApplyBtn: {
    eng: "Easy Apply",
    ptBr: "Enviar Currículo"
  },
  postCallPhone: {
    eng: "Call",
    ptBr: "Ligar"
  },
  postVisitExternalLink: {
    eng: "Apply Externally",
    ptBr: "Aplicar Externamente"
  },
  postSuccessfulSubmission: {
    eng: "Resume submitted successfully!",
    ptBr: "Currículo enviado com sucesso!"
  },
  postsNoPostFound: {
    eng: "No Posts found!",
    ptBr: "Nenhuma vaga encontrada!"
  },
  postModalSelectImageSource: {
    eng: "Source",
    ptBr: "Fonte"
  },
  postModalSelectImageSourceText: {
    eng: "Please, select where you'd like to pick your image from",
    ptBr: "Selecione de onde você deseja escolher sua imagem"
  },
  postImages: {
    eng: "Images",
    ptBr: "Imagens"
  },
  postCamera: {
    eng: "Camera",
    ptBr: "Câmera"
  },
  postSalary: {
    eng: "Monthly Salary",
    ptBr: "Salário Mensal"
  },
  postCategoryJob: {
    eng: "Job",
    ptBr: "Emprego"
  },
  postCategoryInternship: {
    eng: "Internship",
    ptBr: "Estágio"
  },
  postCategoryTemporary: {
    eng: "Temporary",
    ptBr: "Temporário"
  },
  postPositionTypeFullTime: {
    eng: "Full-time",
    ptBr: "Período Integral"
  },
  postPositionTypePartTime: {
    eng: "Part-time",
    ptBr: "Meio período"
  },
  postPositionTypeCustom: {
    eng: "Custom",
    ptBr: "Outro"
  },
  postExperienceNotRequired: {
    eng: "Experience required!",
    ptBr: "Experiência necessária!"
  }
};

/***/ }),

/***/ "./src/languages/ui.lang.ts":
/*!**********************************!*\
  !*** ./src/languages/ui.lang.ts ***!
  \**********************************/
/*! exports provided: strings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
const strings = {
  tabJobs: {
    eng: "JOBS",
    ptBr: "VAGAS"
  }
};

/***/ }),

/***/ "./src/pages/posts/[slug].tsx":
/*!************************************!*\
  !*** ./src/pages/posts/[slug].tsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "@fortawesome/react-fontawesome");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_seo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next-seo */ "next-seo");
/* harmony import */ var next_seo__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_seo__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_linkify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-linkify */ "react-linkify");
/* harmony import */ var react_linkify__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_linkify__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! . */ "./src/pages/posts/index.tsx");
/* harmony import */ var _components_elements_ui_Breadcumb__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/elements/ui/Breadcumb */ "./src/components/elements/ui/Breadcumb.tsx");
/* harmony import */ var _components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/elements/ui/InfoTag */ "./src/components/elements/ui/InfoTag.tsx");
/* harmony import */ var _components_pages_posts_PostCTA__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/pages/posts/PostCTA */ "./src/components/pages/posts/PostCTA.tsx");
/* harmony import */ var _components_pages_posts_SearchBar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/pages/posts/SearchBar */ "./src/components/pages/posts/SearchBar.tsx");
/* harmony import */ var _components_pages_posts_SearchLogo__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/pages/posts/SearchLogo */ "./src/components/pages/posts/SearchLogo.tsx");
/* harmony import */ var _components_seo_NextSEOPost__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/seo/NextSEOPost */ "./src/components/seo/NextSEOPost.tsx");
/* harmony import */ var _constants_Env_constant__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../constants/Env.constant */ "./src/constants/Env.constant.ts");
/* harmony import */ var _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../constants/UI/Colors.constant */ "./src/constants/UI/Colors.constant.ts");
/* harmony import */ var _constants_UI_Common_constant__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../constants/UI/Common.constant */ "./src/constants/UI/Common.constant.ts");
/* harmony import */ var _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../constants/UI/UI.constant */ "./src/constants/UI/UI.constant.ts");
/* harmony import */ var _helpers_DateHelper__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../helpers/DateHelper */ "./src/helpers/DateHelper.ts");
/* harmony import */ var _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../helpers/LanguageHelper */ "./src/helpers/LanguageHelper.ts");
/* harmony import */ var _store_actions_form_actions__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../store/actions/form.actions */ "./src/store/actions/form.actions.ts");
/* harmony import */ var _store_actions_post_action__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../store/actions/post.action */ "./src/store/actions/post.action.ts");
/* harmony import */ var _types_Post_types__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../types/Post.types */ "./src/types/Post.types.ts");
var _jsxFileName = "/usr/src/app/src/pages/posts/[slug].tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;























const IndividualPage = ({
  post,
  provinces
}) => {
  //  human readable date -
  const humanDate = _helpers_DateHelper__WEBPACK_IMPORTED_MODULE_18__["DateHelper"].displayHumanDate(post.createdAt);

  const onRenderPositionType = () => {
    switch (post.positionType) {
      case _types_Post_types__WEBPACK_IMPORTED_MODULE_22__["PostPositionType"].FullTime:
        return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_9__["InfoTag"], {
          icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faBriefcase"],
            __self: undefined,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 54,
              columnNumber: 19
            }
          }),
          text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_19__["TS"].string("post", "postPositionTypeFullTime"),
          __self: undefined,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 53,
            columnNumber: 11
          }
        });

      case _types_Post_types__WEBPACK_IMPORTED_MODULE_22__["PostPositionType"].PartTime:
        return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_9__["InfoTag"], {
          icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faClock"],
            __self: undefined,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 62,
              columnNumber: 19
            }
          }),
          text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_19__["TS"].string("post", "postPositionTypePartTime"),
          __self: undefined,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 61,
            columnNumber: 11
          }
        });

      case _types_Post_types__WEBPACK_IMPORTED_MODULE_22__["PostPositionType"].Custom:
        return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_9__["InfoTag"], {
          icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faUserClock"],
            __self: undefined,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 70,
              columnNumber: 19
            }
          }),
          text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_19__["TS"].string("post", "postPositionTypeCustom"),
          __self: undefined,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 69,
            columnNumber: 11
          }
        });
    }
  };

  const onRenderExperienceRequired = () => {
    if (post.experienceRequired) {
      return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_9__["InfoTag"], {
        icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
          icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faMagic"],
          __self: undefined,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 81,
            columnNumber: 17
          }
        }),
        text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_19__["TS"].string("post", "postExperienceNotRequired"),
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 80,
          columnNumber: 9
        }
      });
    }

    return null;
  };

  const onRenderCategory = () => {
    switch (post.category) {
      case _types_Post_types__WEBPACK_IMPORTED_MODULE_22__["PostCategory"].Job:
        return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_9__["InfoTag"], {
          icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faUserTie"],
            __self: undefined,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 95,
              columnNumber: 19
            }
          }),
          text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_19__["TS"].string("post", "postCategoryJob"),
          __self: undefined,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 94,
            columnNumber: 11
          }
        });

      case _types_Post_types__WEBPACK_IMPORTED_MODULE_22__["PostCategory"].Internship:
        return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_9__["InfoTag"], {
          icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faUser"],
            __self: undefined,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 102,
              columnNumber: 19
            }
          }),
          text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_19__["TS"].string("post", "postCategoryInternship"),
          __self: undefined,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 101,
            columnNumber: 11
          }
        });

      case _types_Post_types__WEBPACK_IMPORTED_MODULE_22__["PostCategory"].Temporary:
        return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_9__["InfoTag"], {
          icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faBusinessTime"],
            __self: undefined,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 110,
              columnNumber: 19
            }
          }),
          text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_19__["TS"].string("post", "postCategoryTemporary"),
          __self: undefined,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 109,
            columnNumber: 11
          }
        });
    }
  };

  const onRenderBenefits = () => {
    var _post$benefits;

    return (_post$benefits = post.benefits) === null || _post$benefits === void 0 ? void 0 : _post$benefits.map(benefit => {
      switch (benefit) {
        case _types_Post_types__WEBPACK_IMPORTED_MODULE_22__["PostBenefits"].FoodTicket:
          return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_9__["InfoTag"], {
            key: benefit,
            icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
              icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faTicketAlt"],
              __self: undefined,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 124,
                columnNumber: 21
              }
            }),
            text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_19__["TS"].string("post", "postBenefitFoodTicket"),
            __self: undefined,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 122,
              columnNumber: 13
            }
          });

        case _types_Post_types__WEBPACK_IMPORTED_MODULE_22__["PostBenefits"].HealthCare:
          return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_9__["InfoTag"], {
            key: benefit,
            icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
              icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faBriefcaseMedical"],
              __self: undefined,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 132,
                columnNumber: 21
              }
            }),
            text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_19__["TS"].string("post", "postBenefitHealthCare"),
            __self: undefined,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 130,
              columnNumber: 13
            }
          });

        case _types_Post_types__WEBPACK_IMPORTED_MODULE_22__["PostBenefits"].Meal:
          return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_9__["InfoTag"], {
            key: benefit,
            icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
              icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faDrumstickBite"],
              __self: undefined,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 140,
                columnNumber: 21
              }
            }),
            text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_19__["TS"].string("post", "postBenefitMeal"),
            __self: undefined,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 138,
              columnNumber: 13
            }
          });

        case _types_Post_types__WEBPACK_IMPORTED_MODULE_22__["PostBenefits"].Transportation:
          return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_9__["InfoTag"], {
            key: benefit,
            icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
              icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faBusAlt"],
              __self: undefined,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 148,
                columnNumber: 21
              }
            }),
            text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_19__["TS"].string("post", "postBenefitTransportation"),
            __self: undefined,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 146,
              columnNumber: 13
            }
          });
      }
    });
  };

  const onRenderSalary = () => {
    return post.monthlySalary && __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_9__["InfoTag"], {
      icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faMoneyBill"],
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160,
          columnNumber: 17
        }
      }),
      text: `${_helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_19__["TS"].string("post", "currency")} ${post.monthlySalary}`,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 159,
        columnNumber: 9
      }
    });
  };

  const getFacebookLink = stateCode => {
    const facebookGroupLinks = {
      ES: "https://www.facebook.com/groups/empregoses/",
      SP: "https://www.facebook.com/groups/empregosessp/",
      MG: "https://www.facebook.com/groups/grupoempregosbh/"
    };
    return facebookGroupLinks[stateCode];
  };

  const getJobJsonLDType = () => {
    switch (post.positionType) {
      case _types_Post_types__WEBPACK_IMPORTED_MODULE_22__["PostPositionType"].FullTime:
        return "FULL_TIME";

      case _types_Post_types__WEBPACK_IMPORTED_MODULE_22__["PostPositionType"].PartTime:
        return "PART_TIME";

      default:
        return "OTHER";
    }
  };

  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_components_seo_NextSEOPost__WEBPACK_IMPORTED_MODULE_13__["NextSEOPost"], {
    jobRole: post.jobRoles[0] || post.title,
    title: post.title,
    description: post.content,
    link: post.externalUrl || _constants_Env_constant__WEBPACK_IMPORTED_MODULE_14__["appEnv"].serverUrl,
    city: post.city,
    stateCode: post.stateCode,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 190,
      columnNumber: 7
    }
  }), __jsx(next_seo__WEBPACK_IMPORTED_MODULE_4__["JobPostingJsonLd"], {
    datePosted: post.createdAt,
    description: post.content,
    hiringOrganization: {
      name: post.companyName,
      sameAs: null
    },
    jobLocation: {
      streetAddress: post.neighborhood,
      addressLocality: post.city,
      addressRegion: post.stateCode,
      postalCode: post.zipCode,
      addressCountry: "Brasil"
    },
    title: post.title,
    baseSalary: {
      currency: "BRL",
      value: post.monthlySalary,
      unitText: "MONTH"
    },
    employmentType: getJobJsonLDType(),
    jobLocationType: null,
    validThrough: null,
    applicantLocationRequirements: null,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 198,
      columnNumber: 7
    }
  }), __jsx(___WEBPACK_IMPORTED_MODULE_7__["SearchContainer"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 223,
      columnNumber: 7
    }
  }, __jsx(___WEBPACK_IMPORTED_MODULE_7__["SearchHeader"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 224,
      columnNumber: 9
    }
  }, __jsx(_components_pages_posts_SearchLogo__WEBPACK_IMPORTED_MODULE_12__["SearchLogo"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 225,
      columnNumber: 11
    }
  }), __jsx(_components_pages_posts_SearchBar__WEBPACK_IMPORTED_MODULE_11__["SearchBar"], {
    provinces: provinces,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 226,
      columnNumber: 11
    }
  }))), __jsx(Cover, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 230,
      columnNumber: 7
    }
  }, __jsx(_components_pages_posts_PostCTA__WEBPACK_IMPORTED_MODULE_10__["PostCTA"], {
    phone: post.phone,
    externalUrl: post.externalUrl,
    email: post.email,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 231,
      columnNumber: 9
    }
  })), __jsx(___WEBPACK_IMPORTED_MODULE_7__["SearchContainer"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 237,
      columnNumber: 7
    }
  }, __jsx(___WEBPACK_IMPORTED_MODULE_7__["SearchMain"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 238,
      columnNumber: 9
    }
  }, __jsx(_constants_UI_Common_constant__WEBPACK_IMPORTED_MODULE_16__["H1"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 239,
      columnNumber: 11
    }
  }, post.title), __jsx(_components_elements_ui_Breadcumb__WEBPACK_IMPORTED_MODULE_8__["Breadcumb"], {
    parent: post.sector,
    child: post.jobRoles.join(", "),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 240,
      columnNumber: 11
    }
  }), __jsx(_constants_UI_Common_constant__WEBPACK_IMPORTED_MODULE_16__["Small"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 241,
      columnNumber: 11
    }
  }, humanDate), __jsx(ContentArea, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 242,
      columnNumber: 11
    }
  }, __jsx(react_linkify__WEBPACK_IMPORTED_MODULE_5___default.a, {
    properties: {
      target: "_blank"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 243,
      columnNumber: 13
    }
  }, post.content)), __jsx(InfoTagsContainer, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 246,
      columnNumber: 11
    }
  }, __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_9__["InfoTag"], {
    icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
      icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faMapMarkedAlt"],
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 248,
        columnNumber: 21
      }
    }),
    text: `${post.city}, ${post.stateCode}`,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 247,
      columnNumber: 13
    }
  }), onRenderPositionType(), onRenderExperienceRequired(), onRenderCategory(), onRenderBenefits(), onRenderSalary()), __jsx(_constants_UI_Common_constant__WEBPACK_IMPORTED_MODULE_16__["H2"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 257,
      columnNumber: 11
    }
  }, _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_19__["TS"].string("global", "joinOurCommunity")), __jsx(CommunitiesContainer, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 258,
      columnNumber: 11
    }
  }, __jsx("a", {
    href: `http://bit.ly/emprego-urgente-${post.stateCode.toLowerCase()}4`,
    target: "_blank",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 259,
      columnNumber: 13
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "outlined",
    className: "btnWhatsapp",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 263,
      columnNumber: 15
    }
  }, "WHATSAPP")), __jsx("a", {
    href: getFacebookLink(post.stateCode),
    target: "_blank",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 268,
      columnNumber: 13
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "outlined",
    className: "btnFacebook",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 269,
      columnNumber: 15
    }
  }, "FACEBOOK")), __jsx("a", {
    href: `https://bit.ly/emprego-urgente-link1`,
    target: "_blank",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 274,
      columnNumber: 13
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "outlined",
    className: "btnEU",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 275,
      columnNumber: 15
    }
  }, "APP"))))));
};

IndividualPage.getInitialProps = async ctx => {
  const {
    slug
  } = ctx.query;
  await ctx.store.dispatch(Object(_store_actions_form_actions__WEBPACK_IMPORTED_MODULE_20__["loadCountryProvinces"])(_constants_Env_constant__WEBPACK_IMPORTED_MODULE_14__["appEnv"].appCountry));
  await ctx.store.dispatch(Object(_store_actions_post_action__WEBPACK_IMPORTED_MODULE_21__["postReadOne"])(null, slug));
  const provinces = ctx.store.getState().formReducer.states;
  const post = ctx.store.getState().postReducer.post;
  return {
    post,
    provinces
  };
};

/* harmony default export */ __webpack_exports__["default"] = (IndividualPage);
const Cover = styled_components__WEBPACK_IMPORTED_MODULE_6___default.a.div.withConfig({
  displayName: "slug__Cover",
  componentId: "kkh1jm-0"
})(["width:100%;height:200px;background-color:", ";background-repeat:no-repeat;background-image:url(\"/images/posts/post-1.webp\");background-blend-mode:multiply;background-size:cover;background-position:center;display:flex;justify-content:center;align-items:center;"], _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_15__["colors"].primary);
const InfoTagsContainer = styled_components__WEBPACK_IMPORTED_MODULE_6___default.a.div.withConfig({
  displayName: "slug__InfoTagsContainer",
  componentId: "kkh1jm-1"
})(["display:flex;flex-wrap:wrap;flex-direction:row;justify-content:flex-start;margin-top:3rem;margin-bottom:3rem;@media screen and (max-width:", "px){justify-content:center;}"], _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_17__["UI"].mediumLayoutBreak);
const ContentArea = styled_components__WEBPACK_IMPORTED_MODULE_6___default.a.p.withConfig({
  displayName: "slug__ContentArea",
  componentId: "kkh1jm-2"
})(["color:", ";white-space:pre-wrap;"], _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_15__["colors"].silver);
const CommunitiesContainer = styled_components__WEBPACK_IMPORTED_MODULE_6___default.a.div.withConfig({
  displayName: "slug__CommunitiesContainer",
  componentId: "kkh1jm-3"
})(["display:flex;flex-direction:row;flex-wrap:wrap;width:80%;justify-content:space-between;.btnWhatsapp{background-color:white;border:1px solid ", ";color:", ";}.btnFacebook{background-color:white;border:1px solid ", ";color:", ";}.btnEU{background-color:white;border:1px solid ", ";color:", ";}"], _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_15__["colors"].whatsappGreen, _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_15__["colors"].whatsappGreen, _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_15__["colors"].facebookBlue, _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_15__["colors"].facebookBlue, _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_15__["colors"].accent, _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_15__["colors"].accent);

/***/ }),

/***/ "./src/pages/posts/index.tsx":
/*!***********************************!*\
  !*** ./src/pages/posts/index.tsx ***!
  \***********************************/
/*! exports provided: default, PaginationContainer, SearchMain, SearchHeader, SearchContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginationContainer", function() { return PaginationContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchMain", function() { return SearchMain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchHeader", function() { return SearchHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchContainer", function() { return SearchContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_lab_Pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/lab/Pagination */ "@material-ui/lab/Pagination");
/* harmony import */ var _material_ui_lab_Pagination__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_lab_Pagination__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_pages_posts_results_SearchResults__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/pages/posts/results/SearchResults */ "./src/components/pages/posts/results/SearchResults.tsx");
/* harmony import */ var _components_pages_posts_SearchBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/pages/posts/SearchBar */ "./src/components/pages/posts/SearchBar.tsx");
/* harmony import */ var _components_pages_posts_SearchLogo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/pages/posts/SearchLogo */ "./src/components/pages/posts/SearchLogo.tsx");
/* harmony import */ var _components_pages_posts_SearchTabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/pages/posts/SearchTabs */ "./src/components/pages/posts/SearchTabs.tsx");
/* harmony import */ var _components_seo_NextSEOPosts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/seo/NextSEOPosts */ "./src/components/seo/NextSEOPosts.tsx");
/* harmony import */ var _constants_Env_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../constants/Env.constant */ "./src/constants/Env.constant.ts");
/* harmony import */ var _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../constants/UI/Colors.constant */ "./src/constants/UI/Colors.constant.ts");
/* harmony import */ var _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../constants/UI/UI.constant */ "./src/constants/UI/UI.constant.ts");
/* harmony import */ var _store_actions_form_actions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../store/actions/form.actions */ "./src/store/actions/form.actions.ts");
/* harmony import */ var _store_actions_post_action__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../store/actions/post.action */ "./src/store/actions/post.action.ts");
var _jsxFileName = "/usr/src/app/src/pages/posts/index.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;















const Posts = ({
  provinces,
  posts,
  paginationData
}) => {
  var _posts$, _posts$2;

  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_2__["useRouter"])();
  const {
    searchProvince,
    searchKeyword
  } = router.query;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    console.log(paginationData);
  }, [paginationData]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    // scroll to top on pagination our router.query change
    window.scrollTo(0, 0);
  }, [router.query]);

  const onPageChange = page => {
    router.push({
      pathname: "/posts",
      query: {
        searchProvince,
        searchKeyword,
        page
      }
    });
  };

  const jobRole = ((_posts$ = posts[0]) === null || _posts$ === void 0 ? void 0 : _posts$.jobRoles[0]) || searchKeyword || ""; // lets assume the job role based on the first result. If not found, use user searchKeyword

  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, posts && __jsx(_components_seo_NextSEOPosts__WEBPACK_IMPORTED_MODULE_8__["NextSEOPosts"], {
    jobRole: jobRole,
    postsQty: posts.length,
    city: ((_posts$2 = posts[0]) === null || _posts$2 === void 0 ? void 0 : _posts$2.city) || null,
    stateCode: searchProvince,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 9
    }
  }), __jsx(SearchContainer, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 7
    }
  }, __jsx(SearchHeader, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 9
    }
  }, __jsx(_components_pages_posts_SearchLogo__WEBPACK_IMPORTED_MODULE_6__["SearchLogo"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 11
    }
  }), __jsx(_components_pages_posts_SearchBar__WEBPACK_IMPORTED_MODULE_5__["SearchBar"], {
    provinces: provinces,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 11
    }
  })), __jsx(SearchMain, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 9
    }
  }, __jsx(_components_pages_posts_SearchTabs__WEBPACK_IMPORTED_MODULE_7__["SearchTabs"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 11
    }
  }), __jsx(_components_pages_posts_results_SearchResults__WEBPACK_IMPORTED_MODULE_4__["SearchResults"], {
    posts: posts,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 11
    }
  }), __jsx(PaginationContainer, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 11
    }
  }, __jsx(_material_ui_lab_Pagination__WEBPACK_IMPORTED_MODULE_1___default.a, {
    size: "large",
    color: "primary",
    page: paginationData.page,
    count: paginationData.totalPages,
    onChange: (e, page) => {
      console.log(`CHANGING TO PAGE ${page}`);
      onPageChange(page);
    },
    hideNextButton: !paginationData.hasNextPage,
    hidePrevButton: !paginationData.hasPrevPage,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 13
    }
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (Posts);

Posts.getInitialProps = async ctx => {
  await ctx.store.dispatch(Object(_store_actions_form_actions__WEBPACK_IMPORTED_MODULE_12__["loadCountryProvinces"])(_constants_Env_constant__WEBPACK_IMPORTED_MODULE_9__["appEnv"].appCountry));
  console.log("Loading provinces...");
  const provinces = ctx.store.getState().formReducer.states; // populate province dropdown

  console.log("Loading pagination data...");
  const {
    searchProvince,
    searchKeyword,
    page = 1
  } = ctx.query;
  console.log(ctx.query);
  await ctx.store.dispatch(Object(_store_actions_post_action__WEBPACK_IMPORTED_MODULE_13__["postReadFeed"])(page, 40, searchProvince, searchKeyword, false));
  const {
    posts
  } = ctx.store.getState().postReducer;
  const {
    paginationData
  } = ctx.store.getState().uiReducer;
  return {
    provinces,
    posts,
    paginationData
  };
};

const PaginationContainer = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.div.withConfig({
  displayName: "posts__PaginationContainer",
  componentId: "sc-90uezp-0"
})(["display:flex;justify-content:center;align-items:center;"]);
const SearchMain = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.div.withConfig({
  displayName: "posts__SearchMain",
  componentId: "sc-90uezp-1"
})(["@media screen and (min-width:", "px){margin-left:13rem;margin-right:7.7rem;max-width:700px;margin-top:4rem;}"], _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_11__["UI"].mediumLayoutBreak);
const SearchHeader = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.div.withConfig({
  displayName: "posts__SearchHeader",
  componentId: "sc-90uezp-2"
})(["display:flex;flex-wrap:wrap;flex:1;@media screen and (min-width:", "px){flex:8;margin-top:1rem;}"], _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_11__["UI"].mediumLayoutBreak);
const SearchContainer = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.div.withConfig({
  displayName: "posts__SearchContainer",
  componentId: "sc-90uezp-3"
})(["padding:1rem;@media screen and (min-width:", "px){padding:0;}a{color:", ";&:visited{color:", ";}}"], _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_11__["UI"].mediumLayoutBreak, _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_10__["colors"].primary, _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_10__["colors"].accent);

/***/ }),

/***/ "./src/store/actions/form.actions.ts":
/*!*******************************************!*\
  !*** ./src/store/actions/form.actions.ts ***!
  \*******************************************/
/*! exports provided: loadCountries, loadCountryProvinces, loadProvinceCities, loadJobRoles, readSectors, clearJobRoles, wizardFormUpdateCurrentStep, wizardFormUpdateTotalSteps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadCountries", function() { return loadCountries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadCountryProvinces", function() { return loadCountryProvinces; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadProvinceCities", function() { return loadProvinceCities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadJobRoles", function() { return loadJobRoles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readSectors", function() { return readSectors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearJobRoles", function() { return clearJobRoles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wizardFormUpdateCurrentStep", function() { return wizardFormUpdateCurrentStep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wizardFormUpdateTotalSteps", function() { return wizardFormUpdateTotalSteps; });
/* harmony import */ var _helpers_APIHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/APIHelper */ "./src/helpers/APIHelper.ts");
/* harmony import */ var _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/LanguageHelper */ "./src/helpers/LanguageHelper.ts");
/* harmony import */ var _types_Request_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types/Request.types */ "./src/types/Request.types.ts");
/* harmony import */ var _reducers_form_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../reducers/form.reducer */ "./src/store/reducers/form.reducer.ts");
/* harmony import */ var _ui_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui.action */ "./src/store/actions/ui.action.ts");





const loadCountries = () => async dispatch => {
  const response = await _helpers_APIHelper__WEBPACK_IMPORTED_MODULE_0__["APIHelper"].request(_types_Request_types__WEBPACK_IMPORTED_MODULE_2__["RequestTypes"].GET, `/country`, {}, false);

  if (response) {
    const data = response.data;
    await dispatch(Object(_ui_action__WEBPACK_IMPORTED_MODULE_4__["setLoading"])(false, "loadingLocation"));

    if (response.status !== 200) {
      alert(response.data.message);
    }

    dispatch({
      type: _reducers_form_reducer__WEBPACK_IMPORTED_MODULE_3__["READ_COUNTRIES"],
      payload: data
    });
  }
};
const loadCountryProvinces = (country, addDefaultOption = false) => async dispatch => {
  const response = await _helpers_APIHelper__WEBPACK_IMPORTED_MODULE_0__["APIHelper"].request(_types_Request_types__WEBPACK_IMPORTED_MODULE_2__["RequestTypes"].GET, `/places/${country}?statesOnly=true`, {}, false);

  if (response) {
    let data = response.data;

    if (addDefaultOption) {
      // adds default option if needed
      data = [{
        stateName: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_1__["TS"].string("form", "selectProvinceText"),
        stateCode: "default"
      }, ...data];
    }

    if (response.status !== 200) {
      alert(response.data.message);
    }

    dispatch({
      type: _reducers_form_reducer__WEBPACK_IMPORTED_MODULE_3__["READ_STATES"],
      payload: data
    });
  }
};
const loadProvinceCities = (country, stateCode) => async dispatch => {
  const response = await _helpers_APIHelper__WEBPACK_IMPORTED_MODULE_0__["APIHelper"].request(_types_Request_types__WEBPACK_IMPORTED_MODULE_2__["RequestTypes"].GET, `/places/${country}/${stateCode}?citiesOnly=true`, {}, false);

  if (response) {
    const data = response.data;
    await dispatch(Object(_ui_action__WEBPACK_IMPORTED_MODULE_4__["setLoading"])(false, "loadingLocation"));

    if (response.status !== 200) {
      alert(response.data.message);
    }

    dispatch({
      type: _reducers_form_reducer__WEBPACK_IMPORTED_MODULE_3__["READ_CITIES"],
      payload: data
    });
  }
};
const loadJobRoles = keyword => async dispatch => {
  const response = await _helpers_APIHelper__WEBPACK_IMPORTED_MODULE_0__["APIHelper"].request(_types_Request_types__WEBPACK_IMPORTED_MODULE_2__["RequestTypes"].GET, `/sectors/search/${keyword}`, {}, true);

  if (response) {
    const data = response.data;

    if (response.status !== 200) {
      alert(response.data.message);
    }

    dispatch({
      type: _reducers_form_reducer__WEBPACK_IMPORTED_MODULE_3__["READ_JOB_ROLES"],
      payload: data
    });
  }
};
const readSectors = country => async dispatch => {
  const response = await _helpers_APIHelper__WEBPACK_IMPORTED_MODULE_0__["APIHelper"].request(_types_Request_types__WEBPACK_IMPORTED_MODULE_2__["RequestTypes"].GET, `/sectors/${country}`, {}, true);

  if (response) {
    const data = response.data;

    if (response.status !== 200) {
      alert(response.data.message);
    }

    dispatch({
      type: _reducers_form_reducer__WEBPACK_IMPORTED_MODULE_3__["READ_SECTORS"],
      payload: data
    });
  }
};
const clearJobRoles = () => dispatch => {
  dispatch({
    type: _reducers_form_reducer__WEBPACK_IMPORTED_MODULE_3__["CLEAR_JOB_ROLES"]
  });
};
const wizardFormUpdateCurrentStep = (key, currentStep) => async dispatch => {
  dispatch({
    type: _reducers_form_reducer__WEBPACK_IMPORTED_MODULE_3__["WIZARD_FORM_UPDATE_CURRENT_STEP"],
    payload: {
      key,
      currentStep
    }
  });
};
const wizardFormUpdateTotalSteps = (key, totalSteps) => async dispatch => {
  dispatch({
    type: _reducers_form_reducer__WEBPACK_IMPORTED_MODULE_3__["WIZARD_FORM_UPDATE_TOTAL_STEPS"],
    payload: {
      key,
      totalSteps
    }
  });
};

/***/ }),

/***/ "./src/store/actions/post.action.ts":
/*!******************************************!*\
  !*** ./src/store/actions/post.action.ts ***!
  \******************************************/
/*! exports provided: postRead, postReadFeed, postClearAll, postReadOne */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postRead", function() { return postRead; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postReadFeed", function() { return postReadFeed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postClearAll", function() { return postClearAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postReadOne", function() { return postReadOne; });
/* harmony import */ var _helpers_APIHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/APIHelper */ "./src/helpers/APIHelper.ts");
/* harmony import */ var _helpers_GenericHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/GenericHelper */ "./src/helpers/GenericHelper.ts");
/* harmony import */ var _types_Request_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types/Request.types */ "./src/types/Request.types.ts");
/* harmony import */ var _reducers_post_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../reducers/post.reducer */ "./src/store/reducers/post.reducer.ts");
/* harmony import */ var _ui_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui.action */ "./src/store/actions/ui.action.ts");





const postRead = (addToEnd = false, page, limit, keyword, stateCode) => // filter by province stateCode
async dispatch => {
  const postUrl = _helpers_GenericHelper__WEBPACK_IMPORTED_MODULE_1__["GenericHelper"].generateUrlParams("/post", {
    page,
    limit,
    keyword,
    stateCode
  });
  const response = await _helpers_APIHelper__WEBPACK_IMPORTED_MODULE_0__["APIHelper"].request(_types_Request_types__WEBPACK_IMPORTED_MODULE_2__["RequestTypes"].GET, postUrl, {}, false);

  if (response) {
    if (response.status !== 200) {
      alert(response.data.message);
      return;
    }

    dispatch({
      type: addToEnd ? _reducers_post_reducer__WEBPACK_IMPORTED_MODULE_3__["POST_READ_ADD"] : _reducers_post_reducer__WEBPACK_IMPORTED_MODULE_3__["POST_READ"],
      payload: response.data.docs
    });
    return response.data;
  }
};
const postReadFeed = (page, limit, provinceData, keywordData, addToEnd) => async dispatch => {
  // @ts-ignore
  const payload = await dispatch(postRead(addToEnd, page, limit, keywordData, provinceData));
  await dispatch(Object(_ui_action__WEBPACK_IMPORTED_MODULE_4__["setPaginationKeyValues"])(payload)); // save new pagination loading values
};
const postClearAll = () => async dispatch => {
  await dispatch({
    type: _reducers_post_reducer__WEBPACK_IMPORTED_MODULE_3__["POST_CLEAR"]
  });
};
const postReadOne = (id, slug) => async dispatch => {
  let requestUrl;

  if (id) {
    requestUrl = `?id=${id}`;
  }

  if (slug) {
    requestUrl = `?slug=${slug}`;
  }

  const response = await _helpers_APIHelper__WEBPACK_IMPORTED_MODULE_0__["APIHelper"].request(_types_Request_types__WEBPACK_IMPORTED_MODULE_2__["RequestTypes"].GET, `/post/${requestUrl}`, {}, false);

  if (response) {
    const data = response.data;

    if (response.status !== 200) {
      alert(response.data.message);
    }

    await dispatch({
      type: _reducers_post_reducer__WEBPACK_IMPORTED_MODULE_3__["POST_READ_ONE"],
      payload: data
    });
  }
};

/***/ }),

/***/ "./src/store/actions/ui.action.ts":
/*!****************************************!*\
  !*** ./src/store/actions/ui.action.ts ***!
  \****************************************/
/*! exports provided: setSearchKey, setLoading, setPaginationKeyValues */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSearchKey", function() { return setSearchKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLoading", function() { return setLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPaginationKeyValues", function() { return setPaginationKeyValues; });
/* harmony import */ var _reducers_ui_reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reducers/ui.reducer */ "./src/store/reducers/ui.reducer.ts");

const setSearchKey = (key, value) => async dispatch => {
  dispatch({
    type: _reducers_ui_reducer__WEBPACK_IMPORTED_MODULE_0__["SET_SEARCH_KEY_VALUE"],
    payload: {
      key,
      value
    }
  });
};
const setLoading = (status, key = "default") => dispatch => {
  // status regulates if we're in a loading state or not (useful for triggering the loading)
  // key is used to set a loading bar to only certain elements (like BlockButton for example), if needed.
  dispatch({
    type: _reducers_ui_reducer__WEBPACK_IMPORTED_MODULE_0__["SET_LOADING"],
    payload: {
      status,
      key
    }
  });
};
const setPaginationKeyValues = payload => async dispatch => {
  dispatch({
    type: _reducers_ui_reducer__WEBPACK_IMPORTED_MODULE_0__["SET_PAGINATION_LOADING_KEY_VALUES"],
    payload
  });
};

/***/ }),

/***/ "./src/store/reducers/form.reducer.ts":
/*!********************************************!*\
  !*** ./src/store/reducers/form.reducer.ts ***!
  \********************************************/
/*! exports provided: formReducer, READ_COUNTRIES, READ_STATES, READ_CITIES, READ_JOB_ROLES, CLEAR_JOB_ROLES, READ_SECTORS, WIZARD_FORM_UPDATE_CURRENT_STEP, WIZARD_FORM_UPDATE_TOTAL_STEPS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formReducer", function() { return formReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "READ_COUNTRIES", function() { return READ_COUNTRIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "READ_STATES", function() { return READ_STATES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "READ_CITIES", function() { return READ_CITIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "READ_JOB_ROLES", function() { return READ_JOB_ROLES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLEAR_JOB_ROLES", function() { return CLEAR_JOB_ROLES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "READ_SECTORS", function() { return READ_SECTORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WIZARD_FORM_UPDATE_CURRENT_STEP", function() { return WIZARD_FORM_UPDATE_CURRENT_STEP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WIZARD_FORM_UPDATE_TOTAL_STEPS", function() { return WIZARD_FORM_UPDATE_TOTAL_STEPS; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const INITIAL_STATE = {
  countries: [],
  states: [],
  cities: [],
  jobRoles: [],
  wizardForm: {
    resumeWizardForm: {
      currentStep: 0
    }
  },
  sectors: []
};
const formReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case READ_COUNTRIES:
      return _objectSpread({}, state, {
        countries: action.payload
      });

    case READ_STATES:
      return _objectSpread({}, state, {
        states: action.payload
      });

    case READ_CITIES:
      return _objectSpread({}, state, {
        cities: action.payload
      });

    case READ_JOB_ROLES:
      return _objectSpread({}, state, {
        jobRoles: action.payload
      });

    case READ_SECTORS:
      return _objectSpread({}, state, {
        sectors: action.payload
      });

    case CLEAR_JOB_ROLES:
      return _objectSpread({}, state, {
        jobRoles: INITIAL_STATE.jobRoles
      });

    case WIZARD_FORM_UPDATE_CURRENT_STEP:
      return _objectSpread({}, state, {
        wizardForm: {
          [action.payload.key]: _objectSpread({}, state.wizardForm[action.payload.key], {
            currentStep: action.payload.currentStep
          })
        }
      });

    case WIZARD_FORM_UPDATE_TOTAL_STEPS:
      return _objectSpread({}, state, {
        wizardForm: {
          [action.payload.key]: _objectSpread({}, state.wizardForm[action.payload.key], {
            totalSteps: action.payload.totalSteps
          })
        }
      });

    default:
      return state;
  }
};
const READ_COUNTRIES = "READ_COUNTRIES";
const READ_STATES = "READ_STATES";
const READ_CITIES = "READ_CITIES";
const READ_JOB_ROLES = "READ_JOB_ROLES";
const CLEAR_JOB_ROLES = "CLEAR_JOB_ROLES";
const READ_SECTORS = "READ_SECTORS";
const WIZARD_FORM_UPDATE_CURRENT_STEP = "WIZARD_FORM_UPDATE_CURRENT_STEP";
const WIZARD_FORM_UPDATE_TOTAL_STEPS = "WIZARD_FORM_UPDATE_TOTAL_STEPS";

/***/ }),

/***/ "./src/store/reducers/post.reducer.ts":
/*!********************************************!*\
  !*** ./src/store/reducers/post.reducer.ts ***!
  \********************************************/
/*! exports provided: postReducer, POST_CREATE, POST_READ, POST_READ_ADD, POST_UPDATE, POST_DELETE, POST_CLEAR, POST_READ_ONE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postReducer", function() { return postReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POST_CREATE", function() { return POST_CREATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POST_READ", function() { return POST_READ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POST_READ_ADD", function() { return POST_READ_ADD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POST_UPDATE", function() { return POST_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POST_DELETE", function() { return POST_DELETE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POST_CLEAR", function() { return POST_CLEAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POST_READ_ONE", function() { return POST_READ_ONE; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const INITIAL_STATE = {
  posts: [],
  post: null // individual post page

};
const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_READ_ONE:
      return _objectSpread({}, state, {
        post: action.payload
      });

    case POST_READ:
      return _objectSpread({}, state, {
        posts: action.payload
      });

    case POST_READ_ADD:
      const uniquePosts = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.uniqBy([...state.posts, ...action.payload], function (post) {
        return post._id;
      });

      return _objectSpread({}, state, {
        posts: uniquePosts // make sure its unique

      });

    case POST_UPDATE:
      const updatedPost = action.payload;
      const updatedPosts = state.posts.map(post => {
        // find the post that we want to replace and replace it
        if (post._id === updatedPost._id) {
          return updatedPost;
        }

        return post;
      }); // then update our state with our updated posts

      return _objectSpread({}, state, {
        posts: updatedPosts
      });

    case POST_DELETE:
      return _objectSpread({}, state, {
        posts: state.posts.filter(post => post._id !== action.payload)
      });

    case POST_CLEAR:
      return {
        posts: INITIAL_STATE.posts
      };

    default:
      return state;
  }
};
const POST_CREATE = "POST_CREATE";
const POST_READ = "POST_READ";
const POST_READ_ADD = "POST_READ_ADD";
const POST_UPDATE = "POST_UPDATE";
const POST_DELETE = "POST_DELETE";
const POST_CLEAR = "POST_CLEAR";
const POST_READ_ONE = "POST_READ_ONE";

/***/ }),

/***/ "./src/store/reducers/ui.reducer.ts":
/*!******************************************!*\
  !*** ./src/store/reducers/ui.reducer.ts ***!
  \******************************************/
/*! exports provided: default, SET_LOADING, SET_MESSAGE, CLEAR_MESSAGE, SET_SEARCH_KEY_VALUE, SET_PAGINATION_LOADING_KEY_VALUES, TOGGLE_MODAL, SET_MODAL_STATUS, ADD_ATTACHED_IMAGE, REMOVE_ATTACHED_IMAGE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_LOADING", function() { return SET_LOADING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_MESSAGE", function() { return SET_MESSAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLEAR_MESSAGE", function() { return CLEAR_MESSAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SEARCH_KEY_VALUE", function() { return SET_SEARCH_KEY_VALUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_PAGINATION_LOADING_KEY_VALUES", function() { return SET_PAGINATION_LOADING_KEY_VALUES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOGGLE_MODAL", function() { return TOGGLE_MODAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_MODAL_STATUS", function() { return SET_MODAL_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_ATTACHED_IMAGE", function() { return ADD_ATTACHED_IMAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_ATTACHED_IMAGE", function() { return REMOVE_ATTACHED_IMAGE; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const INITIAL_STATE = {
  searchProvince: "ES",
  searchKeyword: null,
  isLoading: {
    status: false,
    key: null
  },
  paginationData: {
    // not persistent
    page: 1,
    // start on page 1
    totalDocs: null,
    limit: null,
    totalPages: null,
    hasPrevPage: null,
    hasNextPage: null,
    prevPage: null,
    nextPage: null
  }
};
/* harmony default export */ __webpack_exports__["default"] = ((state = INITIAL_STATE, action) => {
  var _action$payload;

  switch (action.type) {
    case SET_SEARCH_KEY_VALUE:
      return _objectSpread({}, state, {
        [action.payload.key]: action.payload.value
      });

    case SET_LOADING:
      return _objectSpread({}, state, {
        isLoading: {
          status: action.payload.status,
          key: action.payload.key
        }
      });

    case SET_PAGINATION_LOADING_KEY_VALUES:
      // remove docs, since we dont store it here
      if ((_action$payload = action.payload) === null || _action$payload === void 0 ? void 0 : _action$payload.docs) {
        delete action.payload.docs;
      }

      return _objectSpread({}, state, {
        paginationData: _objectSpread({}, action.payload)
      });

    default:
      return state;
  }
});
const SET_LOADING = "SET_LOADING";
const SET_MESSAGE = "SET_ERROR";
const CLEAR_MESSAGE = "CLEAR_MESSAGE";
const SET_SEARCH_KEY_VALUE = "SET_SEARCH_KEY_VALUE";
const SET_PAGINATION_LOADING_KEY_VALUES = "SET_PAGINATION_LOADING_KEY_VALUES";
const TOGGLE_MODAL = "TOGGLE_MODAL";
const SET_MODAL_STATUS = "SET_MODAL_STATUS";
const ADD_ATTACHED_IMAGE = "ADD_ATTACHED_IMAGE";
const REMOVE_ATTACHED_IMAGE = "REMOVE_ATTACHED_IMAGE";

/***/ }),

/***/ "./src/types/Global.types.ts":
/*!***********************************!*\
  !*** ./src/types/Global.types.ts ***!
  \***********************************/
/*! exports provided: EnvironmentTypes, AvailableLanguages */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnvironmentTypes", function() { return EnvironmentTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AvailableLanguages", function() { return AvailableLanguages; });
let EnvironmentTypes;

(function (EnvironmentTypes) {
  EnvironmentTypes["Production"] = "Production";
  EnvironmentTypes["Staging"] = "Staging";
  EnvironmentTypes["Development"] = "Development";
})(EnvironmentTypes || (EnvironmentTypes = {}));

let AvailableLanguages;

(function (AvailableLanguages) {
  AvailableLanguages["eng"] = "eng";
  AvailableLanguages["ptBr"] = "ptBr";
})(AvailableLanguages || (AvailableLanguages = {}));

/***/ }),

/***/ "./src/types/Post.types.ts":
/*!*********************************!*\
  !*** ./src/types/Post.types.ts ***!
  \*********************************/
/*! exports provided: PostCategory, PostBenefits, IPostApplicationStatus, PostPositionType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostCategory", function() { return PostCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostBenefits", function() { return PostBenefits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IPostApplicationStatus", function() { return IPostApplicationStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostPositionType", function() { return PostPositionType; });
let PostCategory;

(function (PostCategory) {
  PostCategory["Job"] = "Job";
  PostCategory["Internship"] = "Internship";
  PostCategory["Temporary"] = "Temporary";
})(PostCategory || (PostCategory = {}));

let PostBenefits;

(function (PostBenefits) {
  PostBenefits["Meal"] = "Meal";
  PostBenefits["FoodTicket"] = "FoodTicket";
  PostBenefits["Transportation"] = "Transportation";
  PostBenefits["HealthCare"] = "HealthCare";
})(PostBenefits || (PostBenefits = {}));

let IPostApplicationStatus;

(function (IPostApplicationStatus) {
  IPostApplicationStatus["Pending"] = "Pending";
  IPostApplicationStatus["Done"] = "Done";
})(IPostApplicationStatus || (IPostApplicationStatus = {}));

let PostPositionType;

(function (PostPositionType) {
  PostPositionType["FullTime"] = "Full-time";
  PostPositionType["PartTime"] = "Part-time";
  PostPositionType["Custom"] = "Custom";
})(PostPositionType || (PostPositionType = {}));

/***/ }),

/***/ "./src/types/Request.types.ts":
/*!************************************!*\
  !*** ./src/types/Request.types.ts ***!
  \************************************/
/*! exports provided: RequestTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestTypes", function() { return RequestTypes; });
let RequestTypes;

(function (RequestTypes) {
  RequestTypes["POST"] = "post";
  RequestTypes["GET"] = "get";
  RequestTypes["PATCH"] = "patch";
  RequestTypes["UPDATE"] = "update";
  RequestTypes["DELETE"] = "delete";
})(RequestTypes || (RequestTypes = {}));

/***/ }),

/***/ 4:
/*!******************************************!*\
  !*** multi ./src/pages/posts/[slug].tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /usr/src/app/src/pages/posts/[slug].tsx */"./src/pages/posts/[slug].tsx");


/***/ }),

/***/ "@fortawesome/free-solid-svg-icons":
/*!****************************************************!*\
  !*** external "@fortawesome/free-solid-svg-icons" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@fortawesome/free-solid-svg-icons");

/***/ }),

/***/ "@fortawesome/react-fontawesome":
/*!*************************************************!*\
  !*** external "@fortawesome/react-fontawesome" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@fortawesome/react-fontawesome");

/***/ }),

/***/ "@material-ui/core":
/*!************************************!*\
  !*** external "@material-ui/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core");

/***/ }),

/***/ "@material-ui/lab/Pagination":
/*!**********************************************!*\
  !*** external "@material-ui/lab/Pagination" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/lab/Pagination");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "moment/locale/pt-br":
/*!**************************************!*\
  !*** external "moment/locale/pt-br" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment/locale/pt-br");

/***/ }),

/***/ "next-seo":
/*!***************************!*\
  !*** external "next-seo" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next-seo");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "prop-types-exact":
/*!***********************************!*\
  !*** external "prop-types-exact" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types-exact");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-linkify":
/*!********************************!*\
  !*** external "react-linkify" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-linkify");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=[slug].js.map