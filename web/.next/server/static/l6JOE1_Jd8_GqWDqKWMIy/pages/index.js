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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "2Sv6":
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

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("QeBL");


/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

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

/***/ "Dtiu":
/***/ (function(module, exports) {

module.exports = require("styled-components");

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

/***/ "JXHo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APIHelper; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zr5I");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_Env_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("LocT");
/* harmony import */ var _types_Global_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("EGZL");
/* harmony import */ var _LanguageHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("PJYc");
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
        alert(_LanguageHelper__WEBPACK_IMPORTED_MODULE_4__[/* TS */ "a"].string("global", "requestTimeoutTitle"));
        next_router__WEBPACK_IMPORTED_MODULE_1___default.a.push("/login");
      }
    }, timeout);

    if (_constants_Env_constant__WEBPACK_IMPORTED_MODULE_2__[/* ENV */ "a"] === _types_Global_types__WEBPACK_IMPORTED_MODULE_3__[/* EnvironmentTypes */ "b"].Development) {
      console.log(`Request to: ${_constants_Env_constant__WEBPACK_IMPORTED_MODULE_2__[/* appEnv */ "b"].serverUrl}${url}`);
    } // execute request


    const response = await axios__WEBPACK_IMPORTED_MODULE_0___default()({
      method,
      url: `${_constants_Env_constant__WEBPACK_IMPORTED_MODULE_2__[/* appEnv */ "b"].serverUrl}${url}`,
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
      alert(_LanguageHelper__WEBPACK_IMPORTED_MODULE_4__[/* TS */ "a"].string("account", "loginUserNotAuthenticated"));
      next_router__WEBPACK_IMPORTED_MODULE_1___default.a.push("/login"); // NavigationHelper.navigate("Auth", null);
    }

    clearTimeout(timeoutCallback);
    return response;
  } catch (error) {
    console.log(error);
  }
});

/***/ }),

/***/ "KFmP":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./account.lang.ts": "KdgN",
	"./form.lang.ts": "w9mT",
	"./global.lang.ts": "Mv7X",
	"./landing.lang.ts": "ebiE",
	"./post.lang.ts": "2Sv6",
	"./ui.lang.ts": "PMmq"
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
webpackContext.id = "KFmP";

/***/ }),

/***/ "KKbo":
/***/ (function(module, exports) {

module.exports = require("@material-ui/core");

/***/ }),

/***/ "KdgN":
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

/***/ "Mv7X":
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

/***/ "No/t":
/***/ (function(module, exports) {

module.exports = require("@fortawesome/free-solid-svg-icons");

/***/ }),

/***/ "PJYc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TS; });
/* harmony import */ var _constants_Env_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("LocT");
/* harmony import */ var _languages_global_lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Mv7X");
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
    return TS.replaceTemplateStrings(_languages_global_lang__WEBPACK_IMPORTED_MODULE_1__["globalStrings"][key][_constants_Env_constant__WEBPACK_IMPORTED_MODULE_0__[/* appEnv */ "b"].language], customVars);
  } // load language strings for a specific model


  const {
    strings
  } = __webpack_require__("KFmP")(`./${model}.lang.ts`); // add our global generic strings


  const languageStrings = _objectSpread({}, strings, {}, _languages_global_lang__WEBPACK_IMPORTED_MODULE_1__["globalStrings"]);

  let string = languageStrings[key][_constants_Env_constant__WEBPACK_IMPORTED_MODULE_0__[/* appEnv */ "b"].language];
  const customVarsKeys = Object.keys(customVars);

  if (customVarsKeys) {
    for (const k of customVarsKeys) {
      string = string.replace(new RegExp(`{{${k}}}`, "g"), customVars[k]);
    }
  }

  return string;
});

/***/ }),

/***/ "PMmq":
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

/***/ "QeBL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__("No/t");

// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__("uhWA");

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");
var router_default = /*#__PURE__*/__webpack_require__.n(router_);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__("Dtiu");
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: ./src/components/elements/form/ProvinceSelector.tsx
var ProvinceSelector = __webpack_require__("jBZR");

// CONCATENATED MODULE: ./src/components/pages/index/Header.tsx

var __jsx = external_react_default.a.createElement;

const Header = props => {
  return __jsx(HeaderContainer, null, __jsx(Nav, null, __jsx(NavLeft, null), __jsx(NavRight, null)));
};
const HeaderContainer = external_styled_components_default.a.header.withConfig({
  displayName: "Header__HeaderContainer",
  componentId: "hhn0vu-0"
})(["width:100%;"]);
const Nav = external_styled_components_default.a.nav.withConfig({
  displayName: "Header__Nav",
  componentId: "hhn0vu-1"
})(["height:100%;display:flex;justify-content:space-between;padding:1em;"]);
const NavLeft = external_styled_components_default.a.div.withConfig({
  displayName: "Header__NavLeft",
  componentId: "hhn0vu-2"
})(["display:flex;a{text-decoration:none;color:#757575;font-weight:bold;margin-right:1em;padding:1em 1em 0.5em 0.5em;}"]);
const NavRight = external_styled_components_default.a.div.withConfig({
  displayName: "Header__NavRight",
  componentId: "hhn0vu-3"
})(["display:flex;justify-content:flex-end;margin-top:-0.3em;i{position:relative;top:0.5em;}a{padding:0 0.5em;margin-right:1em;}a,i,img{height:2em;width:2em;font-size:1.1em;}.fa-th,.fa-bell{color:#757575;}#profile-picture{border-radius:50%;}"]); // const LinkActive = styled.a`
//   color: #4285f4;
//   border-bottom: 2px solid #4285f4;
// `;
// const LinkActiveText = styled.span`
//   color: #4285f4;
//   position: relative;
//   top: -0.6em;
//   left: 0.2em;
// `;
// const LinkNotActive = styled.span`
//   position: relative;
//   top: -0.6em;
//   left: 0.2em;
// `;
// EXTERNAL MODULE: ./src/constants/Env.constant.ts
var Env_constant = __webpack_require__("LocT");

// CONCATENATED MODULE: ./src/components/pages/index/Logo.tsx

var Logo_jsx = external_react_default.a.createElement;


const Logo = () => {
  return Logo_jsx(LogoContainer, null, Logo_jsx("img", {
    src: `/images/logo-${Env_constant["b" /* appEnv */].language}.svg`
  }));
};
const LogoContainer = external_styled_components_default.a.div.withConfig({
  displayName: "Logo__LogoContainer",
  componentId: "sc-19lfkte-0"
})(["width:15rem;margin:auto;margin-bottom:2rem;"]);
// EXTERNAL MODULE: external "next-seo"
var external_next_seo_ = __webpack_require__("efsx");

// EXTERNAL MODULE: ./src/types/Global.types.ts
var Global_types = __webpack_require__("EGZL");

// CONCATENATED MODULE: ./src/components/seo/NextSEOIndex.tsx

var NextSEOIndex_jsx = external_react_default.a.createElement;



const NextSEOIndex = () => {
  switch (Env_constant["b" /* appEnv */].language) {
    case Global_types["a" /* AvailableLanguages */].ptBr:
      const title = "Emprego Urgente | Vagas de emprego disponíveis em sua região";
      const description = "Procurando vagas? Aqui na Emprego Urgente você encontra milhares vagas disponíveis em todo Brasil! Cadastre seu currículo agora mesmo!";
      const link = "https://www.empregourgente.com";
      return NextSEOIndex_jsx(external_next_seo_["NextSeo"], {
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
// EXTERNAL MODULE: ./src/constants/UI/Colors.constant.ts
var Colors_constant = __webpack_require__("xRM6");

// EXTERNAL MODULE: ./src/constants/UI/UI.constant.ts
var UI_constant = __webpack_require__("s4+u");

// EXTERNAL MODULE: ./src/helpers/LanguageHelper.ts
var LanguageHelper = __webpack_require__("PJYc");

// EXTERNAL MODULE: ./src/store/actions/form.actions.ts
var form_actions = __webpack_require__("ZJ/O");

// EXTERNAL MODULE: ./src/store/actions/post.action.ts + 1 modules
var post_action = __webpack_require__("nH3H");

// EXTERNAL MODULE: ./src/store/actions/ui.action.ts
var ui_action = __webpack_require__("gLWS");

// CONCATENATED MODULE: ./src/pages/index.tsx

var pages_jsx = external_react_default.a.createElement;


















const Home = props => {
  const {
    0: hookSearchField,
    1: hookSetSearchField
  } = Object(external_react_["useState"])("");
  const {
    searchProvince
  } = Object(external_react_redux_["useSelector"])(state => state.uiReducer);
  const dispatch = Object(external_react_redux_["useDispatch"])();

  const onSubmit = async e => {
    console.log("Submitting search");
    e.preventDefault(); // validate and set our keyword to the state

    await dispatch(Object(ui_action["c" /* setSearchKey */])("searchKeyword", hookSearchField));
    await dispatch(Object(post_action["a" /* postClearAll */])()); // clear post state, if present.

    router_default.a.push({
      pathname: "/posts",
      query: {
        searchProvince,
        searchKeyword: hookSearchField
      }
    });
  };

  return pages_jsx(external_react_default.a.Fragment, null, pages_jsx(NextSEOIndex, null), pages_jsx(Header, null), pages_jsx(MainContainer, null, pages_jsx(Logo, null), pages_jsx(Form, {
    id: "search-form",
    onSubmit: onSubmit
  }, pages_jsx(SearchBarContainer, null, pages_jsx(ProvinceSelector["a" /* ProvinceSelector */], {
    provinces: props.provinces
  }), pages_jsx(SearchInput, {
    type: "text",
    placeholder: LanguageHelper["a" /* TS */].string("form", "indexSearchInput"),
    name: "q",
    value: hookSearchField,
    onChange: e => {
      hookSetSearchField(e.target.value);
    }
  })), pages_jsx(BlueSearchButton, {
    type: "submit",
    form: "search-form"
  }, pages_jsx(react_fontawesome_["FontAwesomeIcon"], {
    icon: free_solid_svg_icons_["faSearch"]
  })), pages_jsx(CTAButtonsContainer, null, pages_jsx(SearchLargeDeviceButton, {
    type: "submit",
    form: "search-form"
  }, LanguageHelper["a" /* TS */].string("landing", "searchButton"))))));
};

/* harmony default export */ var pages = __webpack_exports__["default"] = (Home);

Home.getInitialProps = async ctx => {
  await ctx.store.dispatch(Object(form_actions["a" /* loadCountryProvinces */])(Env_constant["b" /* appEnv */].appCountry));
  const provinces = ctx.store.getState().formReducer.states;
  return {
    provinces
  };
};

const MainContainer = external_styled_components_default.a.main.withConfig({
  displayName: "pages__MainContainer",
  componentId: "sc-107eczz-0"
})(["margin-top:75px;i{color:white;}@media screen and (min-width:750px){margin-top:150px;}"]);
const SearchBarContainer = external_styled_components_default.a.div.withConfig({
  displayName: "pages__SearchBarContainer",
  componentId: "sc-107eczz-1"
})(["display:flex;flex-wrap:wrap;flex-direction:row;position:relative;flex:10;.MuiInput-root{position:absolute;top:0;left:21px;height:100%;}"]);
const Form = external_styled_components_default.a.form.withConfig({
  displayName: "pages__Form",
  componentId: "sc-107eczz-2"
})(["width:95%;max-width:550px;display:flex;margin:15px auto;position:relative;button,input{outline:none;}"]);
const SearchInput = external_styled_components_default.a.input.withConfig({
  displayName: "pages__SearchInput",
  componentId: "sc-107eczz-3"
})(["flex-grow:1;border:1px solid #d9d9d9;padding:0.7em;flex:8;padding-left:6rem;@media screen and (max-width:", "px){border-top-left-radius:24px;border-bottom-left-radius:24px;}@media screen and (min-width:", "px){border-radius:24px;}"], UI_constant["a" /* UI */].mediumLayoutBreak, UI_constant["a" /* UI */].mediumLayoutBreak);
const BlueSearchButton = external_styled_components_default.a.button.withConfig({
  displayName: "pages__BlueSearchButton",
  componentId: "sc-107eczz-4"
})(["margin-left:-5px;border-radius:0 3px 3px 0;background-color:", ";border:1px solid ", ";padding:0.7em;z-index:1;@media screen and (min-width:", "px){display:none;}svg{color:white;}"], Colors_constant["a" /* colors */].primary, Colors_constant["a" /* colors */].primaryDark, UI_constant["a" /* UI */].mediumLayoutBreak);
const CTAButtonsContainer = external_styled_components_default.a.div.withConfig({
  displayName: "pages__CTAButtonsContainer",
  componentId: "sc-107eczz-5"
})(["@media screen and (max-width:749px){display:none;}@media screen and (min-width:750px){font-family:arial,sans-serif;position:absolute;top:70px;width:260px;left:0;right:0;margin:0 auto;font-size:medium;justify-content:center;display:flex;button{color:#757575;background-color:#f2f2f2;height:36px;font-size:0.8em;font-weight:bold;border:1px solid #f2f2f2;border-radius:2px;}}"]);
const SearchLargeDeviceButton = external_styled_components_default.a.button.withConfig({
  displayName: "pages__SearchLargeDeviceButton",
  componentId: "sc-107eczz-6"
})(["@media screen and (min-width:750px){margin-right:0.5em;}"]);

/***/ }),

/***/ "YLtl":
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "ZJ/O":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export loadCountries */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return loadCountryProvinces; });
/* unused harmony export loadProvinceCities */
/* unused harmony export loadJobRoles */
/* unused harmony export readSectors */
/* unused harmony export clearJobRoles */
/* unused harmony export wizardFormUpdateCurrentStep */
/* unused harmony export wizardFormUpdateTotalSteps */
/* harmony import */ var _helpers_APIHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("JXHo");
/* harmony import */ var _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("PJYc");
/* harmony import */ var _types_Request_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("qQw+");
/* harmony import */ var _reducers_form_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("5BNg");
/* harmony import */ var _ui_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("gLWS");





const loadCountries = () => async dispatch => {
  const response = await _helpers_APIHelper__WEBPACK_IMPORTED_MODULE_0__[/* APIHelper */ "a"].request(_types_Request_types__WEBPACK_IMPORTED_MODULE_2__[/* RequestTypes */ "a"].GET, `/country`, {}, false);

  if (response) {
    const data = response.data;
    await dispatch(Object(_ui_action__WEBPACK_IMPORTED_MODULE_4__[/* setLoading */ "a"])(false, "loadingLocation"));

    if (response.status !== 200) {
      alert(response.data.message);
    }

    dispatch({
      type: _reducers_form_reducer__WEBPACK_IMPORTED_MODULE_3__[/* READ_COUNTRIES */ "c"],
      payload: data
    });
  }
};
const loadCountryProvinces = (country, addDefaultOption = false) => async dispatch => {
  const response = await _helpers_APIHelper__WEBPACK_IMPORTED_MODULE_0__[/* APIHelper */ "a"].request(_types_Request_types__WEBPACK_IMPORTED_MODULE_2__[/* RequestTypes */ "a"].GET, `/places/${country}?statesOnly=true`, {}, false);

  if (response) {
    let data = response.data;

    if (addDefaultOption) {
      // adds default option if needed
      data = [{
        stateName: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_1__[/* TS */ "a"].string("form", "selectProvinceText"),
        stateCode: "default"
      }, ...data];
    }

    if (response.status !== 200) {
      alert(response.data.message);
    }

    dispatch({
      type: _reducers_form_reducer__WEBPACK_IMPORTED_MODULE_3__[/* READ_STATES */ "f"],
      payload: data
    });
  }
};
const loadProvinceCities = (country, stateCode) => async dispatch => {
  const response = await _helpers_APIHelper__WEBPACK_IMPORTED_MODULE_0__[/* APIHelper */ "a"].request(_types_Request_types__WEBPACK_IMPORTED_MODULE_2__[/* RequestTypes */ "a"].GET, `/places/${country}/${stateCode}?citiesOnly=true`, {}, false);

  if (response) {
    const data = response.data;
    await dispatch(Object(_ui_action__WEBPACK_IMPORTED_MODULE_4__[/* setLoading */ "a"])(false, "loadingLocation"));

    if (response.status !== 200) {
      alert(response.data.message);
    }

    dispatch({
      type: _reducers_form_reducer__WEBPACK_IMPORTED_MODULE_3__[/* READ_CITIES */ "b"],
      payload: data
    });
  }
};
const loadJobRoles = keyword => async dispatch => {
  const response = await _helpers_APIHelper__WEBPACK_IMPORTED_MODULE_0__[/* APIHelper */ "a"].request(_types_Request_types__WEBPACK_IMPORTED_MODULE_2__[/* RequestTypes */ "a"].GET, `/sectors/search/${keyword}`, {}, true);

  if (response) {
    const data = response.data;

    if (response.status !== 200) {
      alert(response.data.message);
    }

    dispatch({
      type: _reducers_form_reducer__WEBPACK_IMPORTED_MODULE_3__[/* READ_JOB_ROLES */ "d"],
      payload: data
    });
  }
};
const readSectors = country => async dispatch => {
  const response = await _helpers_APIHelper__WEBPACK_IMPORTED_MODULE_0__[/* APIHelper */ "a"].request(_types_Request_types__WEBPACK_IMPORTED_MODULE_2__[/* RequestTypes */ "a"].GET, `/sectors/${country}`, {}, true);

  if (response) {
    const data = response.data;

    if (response.status !== 200) {
      alert(response.data.message);
    }

    dispatch({
      type: _reducers_form_reducer__WEBPACK_IMPORTED_MODULE_3__[/* READ_SECTORS */ "e"],
      payload: data
    });
  }
};
const clearJobRoles = () => dispatch => {
  dispatch({
    type: _reducers_form_reducer__WEBPACK_IMPORTED_MODULE_3__[/* CLEAR_JOB_ROLES */ "a"]
  });
};
const wizardFormUpdateCurrentStep = (key, currentStep) => async dispatch => {
  dispatch({
    type: _reducers_form_reducer__WEBPACK_IMPORTED_MODULE_3__[/* WIZARD_FORM_UPDATE_CURRENT_STEP */ "g"],
    payload: {
      key,
      currentStep
    }
  });
};
const wizardFormUpdateTotalSteps = (key, totalSteps) => async dispatch => {
  dispatch({
    type: _reducers_form_reducer__WEBPACK_IMPORTED_MODULE_3__[/* WIZARD_FORM_UPDATE_TOTAL_STEPS */ "h"],
    payload: {
      key,
      totalSteps
    }
  });
};

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "ebiE":
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

/***/ "efsx":
/***/ (function(module, exports) {

module.exports = require("next-seo");

/***/ }),

/***/ "gLWS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return setSearchKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return setLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return setPaginationKeyValues; });
/* harmony import */ var _reducers_ui_reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5OW9");

const setSearchKey = (key, value) => async dispatch => {
  dispatch({
    type: _reducers_ui_reducer__WEBPACK_IMPORTED_MODULE_0__[/* SET_SEARCH_KEY_VALUE */ "c"],
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
    type: _reducers_ui_reducer__WEBPACK_IMPORTED_MODULE_0__[/* SET_LOADING */ "a"],
    payload: {
      status,
      key
    }
  });
};
const setPaginationKeyValues = payload => async dispatch => {
  dispatch({
    type: _reducers_ui_reducer__WEBPACK_IMPORTED_MODULE_0__[/* SET_PAGINATION_LOADING_KEY_VALUES */ "b"],
    payload
  });
};

/***/ }),

/***/ "h74D":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "jBZR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProvinceSelector; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("KKbo");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("h74D");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Dtiu");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("xRM6");
/* harmony import */ var _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("s4+u");
/* harmony import */ var _store_actions_ui_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("gLWS");

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

    await dispatch(Object(_store_actions_ui_action__WEBPACK_IMPORTED_MODULE_7__[/* setSearchKey */ "c"])("searchProvince", selectedProvince));

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
      value: province.stateCode
    }, province.stateCode));
  };

  return __jsx(Container, null, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Select"], {
    value: searchProvince,
    onChange: onChangeProvince
  }, onRenderProvinces()));
};
const Container = styled_components__WEBPACK_IMPORTED_MODULE_4___default.a.div.withConfig({
  displayName: "ProvinceSelector__Container",
  componentId: "sc-12bi6i-0"
})(["@media screen and (min-width:", "){border-bottom:1px solid silver;}.MuiInput-underline:after{border-bottom:2px solid ", ";}.MuiInputBase-root{height:100%;}.MuiInput-underline:before{border-bottom:unset;}"], _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_6__[/* UI */ "a"].mediumLayoutBreak, _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_5__[/* colors */ "a"].primary);

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

/***/ "nH3H":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ postReadFeed; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ postClearAll; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ postReadOne; });

// UNUSED EXPORTS: postRead

// EXTERNAL MODULE: ./src/helpers/APIHelper.ts
var APIHelper = __webpack_require__("JXHo");

// CONCATENATED MODULE: ./src/helpers/GenericHelper.ts
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
// EXTERNAL MODULE: ./src/types/Request.types.ts
var Request_types = __webpack_require__("qQw+");

// EXTERNAL MODULE: ./src/store/reducers/post.reducer.ts
var post_reducer = __webpack_require__("n6gx");

// EXTERNAL MODULE: ./src/store/actions/ui.action.ts
var ui_action = __webpack_require__("gLWS");

// CONCATENATED MODULE: ./src/store/actions/post.action.ts





const postRead = (addToEnd = false, page, limit, keyword, stateCode) => // filter by province stateCode
async dispatch => {
  const postUrl = GenericHelper.generateUrlParams("/post", {
    page,
    limit,
    keyword,
    stateCode
  });
  const response = await APIHelper["a" /* APIHelper */].request(Request_types["a" /* RequestTypes */].GET, postUrl, {}, false);

  if (response) {
    if (response.status !== 200) {
      alert(response.data.message);
      return;
    }

    dispatch({
      type: addToEnd ? post_reducer["c" /* POST_READ_ADD */] : post_reducer["b" /* POST_READ */],
      payload: response.data.docs
    });
    return response.data;
  }
};
const postReadFeed = (page, limit, provinceData, keywordData, addToEnd) => async dispatch => {
  // @ts-ignore
  const payload = await dispatch(postRead(addToEnd, page, limit, keywordData, provinceData));
  await dispatch(Object(ui_action["b" /* setPaginationKeyValues */])(payload)); // save new pagination loading values
};
const postClearAll = () => async dispatch => {
  await dispatch({
    type: post_reducer["a" /* POST_CLEAR */]
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

  const response = await APIHelper["a" /* APIHelper */].request(Request_types["a" /* RequestTypes */].GET, `/post/${requestUrl}`, {}, false);

  if (response) {
    const data = response.data;

    if (response.status !== 200) {
      alert(response.data.message);
    }

    await dispatch({
      type: post_reducer["d" /* POST_READ_ONE */],
      payload: data
    });
  }
};

/***/ }),

/***/ "qQw+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestTypes; });
let RequestTypes;

(function (RequestTypes) {
  RequestTypes["POST"] = "post";
  RequestTypes["GET"] = "get";
  RequestTypes["PATCH"] = "patch";
  RequestTypes["UPDATE"] = "update";
  RequestTypes["DELETE"] = "delete";
})(RequestTypes || (RequestTypes = {}));

/***/ }),

/***/ "s4+u":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UI; });
const UI = {
  mediumLayoutBreak: 700,
  // in px
  smallLayoutBreak: 400
};

/***/ }),

/***/ "uhWA":
/***/ (function(module, exports) {

module.exports = require("@fortawesome/react-fontawesome");

/***/ }),

/***/ "w9mT":
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

/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });