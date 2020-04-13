module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("hUgY");


/***/ }),

/***/ "5BNg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return formReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return READ_COUNTRIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return READ_STATES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return READ_CITIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return READ_JOB_ROLES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CLEAR_JOB_ROLES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return READ_SECTORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return WIZARD_FORM_UPDATE_CURRENT_STEP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return WIZARD_FORM_UPDATE_TOTAL_STEPS; });
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

/***/ "5OW9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SET_LOADING; });
/* unused harmony export SET_MESSAGE */
/* unused harmony export CLEAR_MESSAGE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SET_SEARCH_KEY_VALUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SET_PAGINATION_LOADING_KEY_VALUES; });
/* unused harmony export TOGGLE_MODAL */
/* unused harmony export SET_MODAL_STATUS */
/* unused harmony export ADD_ATTACHED_IMAGE */
/* unused harmony export REMOVE_ATTACHED_IMAGE */
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
/* harmony default export */ __webpack_exports__["d"] = ((state = INITIAL_STATE, action) => {
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

/***/ "8Bbg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("B5Ud")


/***/ }),

/***/ "9Pu4":
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/styles");

/***/ }),

/***/ "AroE":
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "B5Ud":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("AroE");

exports.__esModule = true;
exports.Container = Container;
exports.createUrl = createUrl;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _utils = __webpack_require__("g/15");

exports.AppInitialProps = _utils.AppInitialProps;
/**
* `App` component is used for initialize of pages. It allows for overwriting and full control of the `page` initialization.
* This allows for keeping state between navigation, custom error handling, injecting additional data.
*/

async function appGetInitialProps(_ref) {
  var {
    Component,
    ctx
  } = _ref;
  var pageProps = await (0, _utils.loadGetInitialProps)(Component, ctx);
  return {
    pageProps
  };
}

class App extends _react.default.Component {
  // Kept here for backwards compatibility.
  // When someone ended App they could call `super.componentDidCatch`.
  // @deprecated This method is no longer needed. Errors are caught at the top level
  componentDidCatch(error, _errorInfo) {
    throw error;
  }

  render() {
    var {
      router,
      Component,
      pageProps,
      __N_SSG,
      __N_SSP
    } = this.props;
    return _react.default.createElement(Component, Object.assign({}, pageProps, // we don't add the legacy URL prop if it's using non-legacy
    // methods like getStaticProps and getServerSideProps
    !(__N_SSG || __N_SSP) ? {
      url: createUrl(router)
    } : {}));
  }

}

exports.default = App;
App.origGetInitialProps = appGetInitialProps;
App.getInitialProps = appGetInitialProps;
var warnContainer;
var warnUrl;

if (false) {} // @deprecated noop for now until removal


function Container(p) {
  if (false) {}
  return p.children;
}

function createUrl(router) {
  // This is to make sure we don't references the router object at call time
  var {
    pathname,
    asPath,
    query
  } = router;
  return {
    get query() {
      if (false) {}
      return query;
    },

    get pathname() {
      if (false) {}
      return pathname;
    },

    get asPath() {
      if (false) {}
      return asPath;
    },

    back: () => {
      if (false) {}
      router.back();
    },
    push: (url, as) => {
      if (false) {}
      return router.push(url, as);
    },
    pushTo: (href, as) => {
      if (false) {}
      var pushRoute = as ? href : '';
      var pushUrl = as || href;
      return router.push(pushRoute, pushUrl);
    },
    replace: (url, as) => {
      if (false) {}
      return router.replace(url, as);
    },
    replaceTo: (href, as) => {
      if (false) {}
      var replaceRoute = as ? href : '';
      var replaceUrl = as || href;
      return router.replace(replaceRoute, replaceUrl);
    }
  };
}

/***/ }),

/***/ "EGZL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EnvironmentTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AvailableLanguages; });
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

/***/ "JMOJ":
/***/ (function(module, exports) {

module.exports = require("next-redux-wrapper");

/***/ }),

/***/ "JPPj":
/***/ (function(module, exports) {

module.exports = require("redux-persist/integration/react");

/***/ }),

/***/ "KKbo":
/***/ (function(module, exports) {

module.exports = require("@material-ui/core");

/***/ }),

/***/ "LocT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ENV; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return appEnv; });
/* harmony import */ var _types_Global_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("EGZL");

const ENV = _types_Global_types__WEBPACK_IMPORTED_MODULE_0__[/* EnvironmentTypes */ "b"].Development; // set the current environment here

const defineServerUrl = () => {
  // Solution if fails to connect: https://stackoverflow.com/questions/33704130/react-native-android-fetch-failing-on-connection-to-local-api
  // You must use LAN on Expo developer tools settings, otherwise it won't map the docker container.
  switch (ENV) {
    case _types_Global_types__WEBPACK_IMPORTED_MODULE_0__[/* EnvironmentTypes */ "b"].Development:
      // Next.JS will break on Router.push if we're not checking where specifically to submit our requests. Tricky issue, but only happens on development.
      // For more info, please check: https://github.com/apollographql/apollo-link/issues/375
      if (true) {
        return "http://app-api:3000"; // were running on server
      } else {}

    case _types_Global_types__WEBPACK_IMPORTED_MODULE_0__[/* EnvironmentTypes */ "b"].Production:
      return "https://api.empregourgente.com";

    case _types_Global_types__WEBPACK_IMPORTED_MODULE_0__[/* EnvironmentTypes */ "b"].Staging:
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
  language: _types_Global_types__WEBPACK_IMPORTED_MODULE_0__[/* AvailableLanguages */ "a"].ptBr,
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

/***/ "T8f9":
/***/ (function(module, exports) {

module.exports = require("redux-persist/lib/storage");

/***/ }),

/***/ "VNb8":
/***/ (function(module, exports) {

module.exports = require("redux-persist");

/***/ }),

/***/ "YLtl":
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "ZSx1":
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "bzos":
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "efsx":
/***/ (function(module, exports) {

module.exports = require("next-seo");

/***/ }),

/***/ "g/15":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__("bzos");
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

  if (false) {} // when called from _app `ctx` is nested in `ctx`


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

  if (false) {}

  return props;
}

exports.loadGetInitialProps = loadGetInitialProps;
exports.urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];

function formatWithValidation(url, options) {
  if (false) {}

  return url_1.format(url, options);
}

exports.formatWithValidation = formatWithValidation;
exports.SP = typeof performance !== 'undefined';
exports.ST = exports.SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';

/***/ }),

/***/ "h74D":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "hUgY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "@material-ui/core/styles"
var styles_ = __webpack_require__("9Pu4");

// EXTERNAL MODULE: external "next-redux-wrapper"
var external_next_redux_wrapper_ = __webpack_require__("JMOJ");
var external_next_redux_wrapper_default = /*#__PURE__*/__webpack_require__.n(external_next_redux_wrapper_);

// EXTERNAL MODULE: ./node_modules/next/app.js
var app = __webpack_require__("8Bbg");
var app_default = /*#__PURE__*/__webpack_require__.n(app);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: external "redux-persist/integration/react"
var react_ = __webpack_require__("JPPj");

// EXTERNAL MODULE: external "next-seo"
var external_next_seo_ = __webpack_require__("efsx");

// EXTERNAL MODULE: ./src/constants/Env.constant.ts
var Env_constant = __webpack_require__("LocT");

// EXTERNAL MODULE: ./src/types/Global.types.ts
var Global_types = __webpack_require__("EGZL");

// CONCATENATED MODULE: ./src/components/seo/NextSEOApp.tsx

var __jsx = external_react_default.a.createElement;



const NextSEOApp = () => {
  switch (Env_constant["b" /* appEnv */].language) {
    case Global_types["a" /* AvailableLanguages */].ptBr:
      return __jsx(external_next_seo_["DefaultSeo"], {
        openGraph: {
          type: "website",
          locale: "pt_BR",
          url: Env_constant["b" /* appEnv */].appUrl,
          site_name: Env_constant["b" /* appEnv */].appName
        },
        twitter: {
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image"
        }
      });

    case Global_types["a" /* AvailableLanguages */].eng:
      return null;
    // TODO: Configure SEO for this page in english
  }
};
// EXTERNAL MODULE: external "@material-ui/core"
var core_ = __webpack_require__("KKbo");

// EXTERNAL MODULE: ./src/constants/UI/Colors.constant.ts
var Colors_constant = __webpack_require__("xRM6");

// CONCATENATED MODULE: ./src/constants/UI/Theme.constant.ts

 // Check the default theme object at: https://material-ui.com/customization/default-theme/
// here we're just overwriting some values...

const MUITheme = Object(core_["createMuiTheme"])({
  palette: {
    primary: {
      light: Colors_constant["a" /* colors */].lightBlue,
      main: Colors_constant["a" /* colors */].primary,
      dark: Colors_constant["a" /* colors */].primaryDark,
      contrastText: Colors_constant["a" /* colors */].white
    },
    secondary: {
      light: Colors_constant["a" /* colors */].accentLight,
      main: Colors_constant["a" /* colors */].accent,
      dark: Colors_constant["a" /* colors */].accentDark,
      contrastText: Colors_constant["a" /* colors */].white
    }
  }
});
// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// EXTERNAL MODULE: external "redux-devtools-extension"
var external_redux_devtools_extension_ = __webpack_require__("ufKq");

// EXTERNAL MODULE: external "redux-persist"
var external_redux_persist_ = __webpack_require__("VNb8");

// EXTERNAL MODULE: external "redux-thunk"
var external_redux_thunk_ = __webpack_require__("ZSx1");
var external_redux_thunk_default = /*#__PURE__*/__webpack_require__.n(external_redux_thunk_);

// EXTERNAL MODULE: external "redux-persist/lib/storage"
var storage_ = __webpack_require__("T8f9");
var storage_default = /*#__PURE__*/__webpack_require__.n(storage_);

// CONCATENATED MODULE: ./src/store/reducers/counter.reducer.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const INITIAL_STATE = {
  counter: 0
};
const counterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COUNTER_CHANGE:
      return _objectSpread({}, state, {
        counter: action.payload
      });

    default:
      return state;
  }
};
const COUNTER_CHANGE = "COUNTER_CHANGE";
// EXTERNAL MODULE: ./src/store/reducers/form.reducer.ts
var form_reducer = __webpack_require__("5BNg");

// EXTERNAL MODULE: ./src/store/reducers/post.reducer.ts
var post_reducer = __webpack_require__("n6gx");

// EXTERNAL MODULE: ./src/store/reducers/ui.reducer.ts
var ui_reducer = __webpack_require__("5OW9");

// CONCATENATED MODULE: ./src/store/reducers/index.reducers.ts







/*#############################################################|
|                        REDUCERS
*##############################################################*/
// Persist config ========================================

const counterPersistConfig = {
  key: "counterReducer",
  storage: storage_default.a
};
const uiPersistConfig = {
  key: "uiReducer",
  storage: storage_default.a,
  whitelist: ["searchProvince"]
};
const rootReducer = Object(external_redux_["combineReducers"])({
  counterReducer: Object(external_redux_persist_["persistReducer"])(counterPersistConfig, counterReducer),
  uiReducer: Object(external_redux_persist_["persistReducer"])(uiPersistConfig, ui_reducer["d" /* default */]),
  postReducer: post_reducer["e" /* postReducer */],
  formReducer: form_reducer["i" /* formReducer */]
});
/* harmony default export */ var index_reducers = (rootReducer);
// CONCATENATED MODULE: ./src/store/reducers/persist.store.ts




 // @ts-ignore

const middlewares = [external_redux_thunk_default.a];
const store = Object(external_redux_["createStore"])(index_reducers, Object(external_redux_devtools_extension_["composeWithDevTools"])(Object(external_redux_["applyMiddleware"])(...middlewares) // other store enhancers if any
));
const persistor = Object(external_redux_persist_["persistStore"])(store);

// CONCATENATED MODULE: ./src/pages/_app.tsx
var _app_jsx = external_react_default.a.createElement;










class _app_MyApp extends app_default.a {
  static async getInitialProps({
    Component,
    ctx
  }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}; // Anything returned here can be accessed by the client

    return {
      pageProps
    };
  }

  render() {
    // pageProps that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
    // @ts-ignore
    const {
      Component,
      pageProps,
      store: initialStore
    } = this.props;
    return _app_jsx(external_react_redux_["Provider"], {
      store: initialStore
    }, _app_jsx(react_["PersistGate"], {
      loading: null,
      persistor: persistor
    }, _app_jsx(NextSEOApp, null), _app_jsx(styles_["ThemeProvider"], {
      theme: MUITheme
    }, _app_jsx(Component, pageProps))));
  }

} // makeStore function that returns a new store for every request


const makeStore = () => store; // withRedux wrapper that passes the store to the App Component


/* harmony default export */ var _app = __webpack_exports__["default"] = (external_next_redux_wrapper_default()(makeStore)(_app_MyApp));

/***/ }),

/***/ "n6gx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return postReducer; });
/* unused harmony export POST_CREATE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return POST_READ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return POST_READ_ADD; });
/* unused harmony export POST_UPDATE */
/* unused harmony export POST_DELETE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return POST_CLEAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return POST_READ_ONE; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("YLtl");
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

/***/ "rKB8":
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "ufKq":
/***/ (function(module, exports) {

module.exports = require("redux-devtools-extension");

/***/ }),

/***/ "xRM6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return colors; });
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

/***/ })

/******/ });