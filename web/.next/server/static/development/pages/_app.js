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

/***/ "./node_modules/next/app.js":
/*!**********************************!*\
  !*** ./node_modules/next/app.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/pages/_app */ "./node_modules/next/dist/pages/_app.js")


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

/***/ "./node_modules/next/dist/pages/_app.js":
/*!**********************************************!*\
  !*** ./node_modules/next/dist/pages/_app.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.Container = Container;
exports.createUrl = createUrl;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "./node_modules/next/dist/next-server/lib/utils.js");

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

if (true) {
  warnContainer = (0, _utils.execOnce)(() => {
    console.warn("Warning: the `Container` in `_app` has been deprecated and should be removed. https://err.sh/zeit/next.js/app-container-deprecated");
  });
  warnUrl = (0, _utils.execOnce)(() => {
    console.error("Warning: the 'url' property is deprecated. https://err.sh/zeit/next.js/url-deprecated");
  });
} // @deprecated noop for now until removal


function Container(p) {
  if (true) warnContainer();
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
      if (true) warnUrl();
      return query;
    },

    get pathname() {
      if (true) warnUrl();
      return pathname;
    },

    get asPath() {
      if (true) warnUrl();
      return asPath;
    },

    back: () => {
      if (true) warnUrl();
      router.back();
    },
    push: (url, as) => {
      if (true) warnUrl();
      return router.push(url, as);
    },
    pushTo: (href, as) => {
      if (true) warnUrl();
      var pushRoute = as ? href : '';
      var pushUrl = as || href;
      return router.push(pushRoute, pushUrl);
    },
    replace: (url, as) => {
      if (true) warnUrl();
      return router.replace(url, as);
    },
    replaceTo: (href, as) => {
      if (true) warnUrl();
      var replaceRoute = as ? href : '';
      var replaceUrl = as || href;
      return router.replace(replaceRoute, replaceUrl);
    }
  };
}

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

/***/ "./src/components/seo/NextSEOApp.tsx":
/*!*******************************************!*\
  !*** ./src/components/seo/NextSEOApp.tsx ***!
  \*******************************************/
/*! exports provided: NextSEOApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NextSEOApp", function() { return NextSEOApp; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_seo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-seo */ "next-seo");
/* harmony import */ var next_seo__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_seo__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_Env_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants/Env.constant */ "./src/constants/Env.constant.ts");
/* harmony import */ var _types_Global_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../types/Global.types */ "./src/types/Global.types.ts");
var _jsxFileName = "/usr/src/app/src/components/seo/NextSEOApp.tsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const NextSEOApp = () => {
  switch (_constants_Env_constant__WEBPACK_IMPORTED_MODULE_2__["appEnv"].language) {
    case _types_Global_types__WEBPACK_IMPORTED_MODULE_3__["AvailableLanguages"].ptBr:
      return __jsx(next_seo__WEBPACK_IMPORTED_MODULE_1__["DefaultSeo"], {
        openGraph: {
          type: "website",
          locale: "pt_BR",
          url: _constants_Env_constant__WEBPACK_IMPORTED_MODULE_2__["appEnv"].appUrl,
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
          lineNumber: 10,
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

/***/ "./src/constants/UI/Theme.constant.ts":
/*!********************************************!*\
  !*** ./src/constants/UI/Theme.constant.ts ***!
  \********************************************/
/*! exports provided: MUITheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MUITheme", function() { return MUITheme; });
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Colors_constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Colors.constant */ "./src/constants/UI/Colors.constant.ts");

 // Check the default theme object at: https://material-ui.com/customization/default-theme/
// here we're just overwriting some values...

const MUITheme = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__["createMuiTheme"])({
  palette: {
    primary: {
      light: _Colors_constant__WEBPACK_IMPORTED_MODULE_1__["colors"].lightBlue,
      main: _Colors_constant__WEBPACK_IMPORTED_MODULE_1__["colors"].primary,
      dark: _Colors_constant__WEBPACK_IMPORTED_MODULE_1__["colors"].primaryDark,
      contrastText: _Colors_constant__WEBPACK_IMPORTED_MODULE_1__["colors"].white
    },
    secondary: {
      light: _Colors_constant__WEBPACK_IMPORTED_MODULE_1__["colors"].accentLight,
      main: _Colors_constant__WEBPACK_IMPORTED_MODULE_1__["colors"].accent,
      dark: _Colors_constant__WEBPACK_IMPORTED_MODULE_1__["colors"].accentDark,
      contrastText: _Colors_constant__WEBPACK_IMPORTED_MODULE_1__["colors"].white
    }
  }
});

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-redux-wrapper */ "next-redux-wrapper");
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/app */ "./node_modules/next/app.js");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux-persist/integration/react */ "redux-persist/integration/react");
/* harmony import */ var redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_seo_NextSEOApp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/seo/NextSEOApp */ "./src/components/seo/NextSEOApp.tsx");
/* harmony import */ var _constants_UI_Theme_constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../constants/UI/Theme.constant */ "./src/constants/UI/Theme.constant.ts");
/* harmony import */ var _store_reducers_persist_store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../store/reducers/persist.store */ "./src/store/reducers/persist.store.ts");
var _jsxFileName = "/usr/src/app/src/pages/_app.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }











class MyApp extends next_app__WEBPACK_IMPORTED_MODULE_2___default.a {
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
    return __jsx(react_redux__WEBPACK_IMPORTED_MODULE_4__["Provider"], {
      store: initialStore,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28,
        columnNumber: 7
      }
    }, __jsx(redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_5__["PersistGate"], {
      loading: null,
      persistor: _store_reducers_persist_store__WEBPACK_IMPORTED_MODULE_8__["persistor"],
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 9
      }
    }, __jsx(_components_seo_NextSEOApp__WEBPACK_IMPORTED_MODULE_6__["NextSEOApp"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 11
      }
    }), __jsx(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["ThemeProvider"], {
      theme: _constants_UI_Theme_constant__WEBPACK_IMPORTED_MODULE_7__["MUITheme"],
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 11
      }
    }, __jsx(Component, _extends({}, pageProps, {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32,
        columnNumber: 13
      }
    })))));
  }

} // makeStore function that returns a new store for every request


const makeStore = () => _store_reducers_persist_store__WEBPACK_IMPORTED_MODULE_8__["store"]; // withRedux wrapper that passes the store to the App Component


/* harmony default export */ __webpack_exports__["default"] = (next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1___default()(makeStore)(MyApp));

/***/ }),

/***/ "./src/store/reducers/counter.reducer.ts":
/*!***********************************************!*\
  !*** ./src/store/reducers/counter.reducer.ts ***!
  \***********************************************/
/*! exports provided: counterReducer, COUNTER_CHANGE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "counterReducer", function() { return counterReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COUNTER_CHANGE", function() { return COUNTER_CHANGE; });
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

/***/ "./src/store/reducers/index.reducers.ts":
/*!**********************************************!*\
  !*** ./src/store/reducers/index.reducers.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-persist */ "redux-persist");
/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_persist__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-persist/lib/storage */ "redux-persist/lib/storage");
/* harmony import */ var redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _counter_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./counter.reducer */ "./src/store/reducers/counter.reducer.ts");
/* harmony import */ var _form_reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./form.reducer */ "./src/store/reducers/form.reducer.ts");
/* harmony import */ var _post_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./post.reducer */ "./src/store/reducers/post.reducer.ts");
/* harmony import */ var _ui_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui.reducer */ "./src/store/reducers/ui.reducer.ts");







/*#############################################################|
|                        REDUCERS
*##############################################################*/
// Persist config ========================================

const counterPersistConfig = {
  key: "counterReducer",
  storage: (redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_2___default())
};
const uiPersistConfig = {
  key: "uiReducer",
  storage: (redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_2___default()),
  whitelist: ["searchProvince"]
};
const rootReducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  counterReducer: Object(redux_persist__WEBPACK_IMPORTED_MODULE_1__["persistReducer"])(counterPersistConfig, _counter_reducer__WEBPACK_IMPORTED_MODULE_3__["counterReducer"]),
  uiReducer: Object(redux_persist__WEBPACK_IMPORTED_MODULE_1__["persistReducer"])(uiPersistConfig, _ui_reducer__WEBPACK_IMPORTED_MODULE_6__["default"]),
  postReducer: _post_reducer__WEBPACK_IMPORTED_MODULE_5__["postReducer"],
  formReducer: _form_reducer__WEBPACK_IMPORTED_MODULE_4__["formReducer"]
});
/* harmony default export */ __webpack_exports__["default"] = (rootReducer);

/***/ }),

/***/ "./src/store/reducers/persist.store.ts":
/*!*********************************************!*\
  !*** ./src/store/reducers/persist.store.ts ***!
  \*********************************************/
/*! exports provided: store, persistor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "store", function() { return store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "persistor", function() { return persistor; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-devtools-extension */ "redux-devtools-extension");
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-persist */ "redux-persist");
/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_persist__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-thunk */ "redux-thunk");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _index_reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index.reducers */ "./src/store/reducers/index.reducers.ts");




 // @ts-ignore

const middlewares = [redux_thunk__WEBPACK_IMPORTED_MODULE_3___default.a];
const store = Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(_index_reducers__WEBPACK_IMPORTED_MODULE_4__["default"], Object(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_1__["composeWithDevTools"])(Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(...middlewares) // other store enhancers if any
));
const persistor = Object(redux_persist__WEBPACK_IMPORTED_MODULE_2__["persistStore"])(store);


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

/***/ 0:
/*!*****************************************!*\
  !*** multi private-next-pages/_app.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! private-next-pages/_app.tsx */"./src/pages/_app.tsx");


/***/ }),

/***/ "@material-ui/core":
/*!************************************!*\
  !*** external "@material-ui/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core");

/***/ }),

/***/ "@material-ui/core/styles":
/*!*******************************************!*\
  !*** external "@material-ui/core/styles" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/styles");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "next-redux-wrapper":
/*!*************************************!*\
  !*** external "next-redux-wrapper" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next-redux-wrapper");

/***/ }),

/***/ "next-seo":
/*!***************************!*\
  !*** external "next-seo" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next-seo");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-devtools-extension":
/*!*******************************************!*\
  !*** external "redux-devtools-extension" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-devtools-extension");

/***/ }),

/***/ "redux-persist":
/*!********************************!*\
  !*** external "redux-persist" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-persist");

/***/ }),

/***/ "redux-persist/integration/react":
/*!**************************************************!*\
  !*** external "redux-persist/integration/react" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-persist/integration/react");

/***/ }),

/***/ "redux-persist/lib/storage":
/*!********************************************!*\
  !*** external "redux-persist/lib/storage" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-persist/lib/storage");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

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
//# sourceMappingURL=_app.js.map