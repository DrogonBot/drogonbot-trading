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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "/jkW":
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

/***/ "0Bsm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("AroE");

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router = __webpack_require__("nOHt");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return _react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (false) { var name; }

  return WithRouterWrapper;
}

/***/ }),

/***/ "0FOq":
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

// EXTERNAL MODULE: external "@material-ui/core"
var core_ = __webpack_require__("KKbo");

// EXTERNAL MODULE: external "next-seo"
var external_next_seo_ = __webpack_require__("efsx");

// EXTERNAL MODULE: external "react-linkify"
var external_react_linkify_ = __webpack_require__("Zy31");
var external_react_linkify_default = /*#__PURE__*/__webpack_require__.n(external_react_linkify_);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__("Dtiu");
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: ./src/pages/posts/index.tsx + 5 modules
var posts = __webpack_require__("dpWq");

// EXTERNAL MODULE: ./src/components/elements/ui/Breadcumb.tsx
var Breadcumb = __webpack_require__("gcrl");

// EXTERNAL MODULE: ./src/constants/UI/Colors.constant.ts
var Colors_constant = __webpack_require__("xRM6");

// CONCATENATED MODULE: ./src/constants/UI/Typography.constant.ts
const typography = {
  smallTextSize: 12,
  mediumTextSize: 16,
  largeTextSize: 21,
  ultraLargeTextSize: 28
};
// EXTERNAL MODULE: ./src/constants/UI/UI.constant.ts
var UI_constant = __webpack_require__("s4+u");

// CONCATENATED MODULE: ./src/components/elements/ui/InfoTag.tsx

var __jsx = external_react_default.a.createElement;




const InfoTag = ({
  text,
  icon
}) => {
  return __jsx(Container, null, __jsx(Icon, null, icon), __jsx(Text, null, text));
};
const Container = external_styled_components_default.a.div.withConfig({
  displayName: "InfoTag__Container",
  componentId: "sc-4rr5iy-0"
})(["display:flex;flex-direction:row;flex-wrap:wrap;flex:6;flex-basis:200px;max-width:200px;margin-bottom:0.5rem;@media screen and (max-width:", "px){margin-bottom:1.5rem;}&:hover{svg,[class*=\"Text\"]{color:", ";}}"], UI_constant["a" /* UI */].mediumLayoutBreak, Colors_constant["a" /* colors */].primary);
const Icon = external_styled_components_default.a.div.withConfig({
  displayName: "InfoTag__Icon",
  componentId: "sc-4rr5iy-1"
})(["flex:2;display:flex;justify-content:center;max-width:20px;align-items:center;svg{color:", ";font-size:1.5rem;}"], Colors_constant["a" /* colors */].dark);
const Text = external_styled_components_default.a.div.withConfig({
  displayName: "InfoTag__Text",
  componentId: "sc-4rr5iy-2"
})(["flex:4;color:", ";font-size:", "px;display:flex;flex-direction:column;justify-content:center;padding-left:1rem;"], Colors_constant["a" /* colors */].dark, typography.smallTextSize);
// EXTERNAL MODULE: ./src/helpers/LanguageHelper.ts
var LanguageHelper = __webpack_require__("PJYc");

// CONCATENATED MODULE: ./src/components/pages/posts/PostCTA.tsx

var PostCTA_jsx = external_react_default.a.createElement;





const PostCTA = ({
  email,
  phone,
  externalUrl
}) => {
  let CTAInfo;

  if (email) {
    CTAInfo = {
      icon: free_solid_svg_icons_["faEnvelope"],
      link: `mailto:${email}`,
      translatedString: "postApplyBtn"
    };
  } else if (phone) {
    CTAInfo = {
      icon: free_solid_svg_icons_["faMobileAlt"],
      link: `tel:${phone}`,
      translatedString: "postCallPhone"
    };
  } else if (externalUrl) {
    CTAInfo = {
      icon: free_solid_svg_icons_["faLink"],
      link: externalUrl,
      translatedString: "postVisitExternalLink"
    };
  }

  return PostCTA_jsx(PostCTA_Container, null, PostCTA_jsx("a", {
    href: CTAInfo.link
  }, PostCTA_jsx(core_["Button"], {
    className: "wobble-hor-bottom",
    variant: "contained",
    color: "secondary",
    size: "large",
    startIcon: PostCTA_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: CTAInfo.icon
    })
  }, LanguageHelper["a" /* TS */].string("post", CTAInfo.translatedString).toUpperCase())));
};
const PostCTA_Container = external_styled_components_default.a.div.withConfig({
  displayName: "PostCTA__Container",
  componentId: "sc-1qn21yj-0"
})([""]);
// EXTERNAL MODULE: ./src/components/pages/posts/SearchBar.tsx
var SearchBar = __webpack_require__("1Mec");

// EXTERNAL MODULE: ./src/components/pages/posts/SearchLogo.tsx
var SearchLogo = __webpack_require__("FDqc");

// EXTERNAL MODULE: ./src/constants/Env.constant.ts
var Env_constant = __webpack_require__("LocT");

// CONCATENATED MODULE: ./src/components/seo/NextSEOPost.tsx

var NextSEOPost_jsx = external_react_default.a.createElement;


const NextSEOPost = ({
  jobRole,
  title,
  description,
  link,
  city,
  stateCode
}) => {
  return NextSEOPost_jsx(external_next_seo_["NextSeo"], {
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
      site_name: Env_constant["b" /* appEnv */].appName
    },
    twitter: {
      handle: "@handle",
      site: "@site",
      cardType: "summary_large_image"
    }
  });
};
// CONCATENATED MODULE: ./src/constants/UI/Common.constant.ts



const H1 = external_styled_components_default.a.h1.withConfig({
  displayName: "Commonconstant__H1",
  componentId: "xvltui-0"
})(["color:", ";"], Colors_constant["a" /* colors */].primary);
const H2 = external_styled_components_default.a.h2.withConfig({
  displayName: "Commonconstant__H2",
  componentId: "xvltui-1"
})(["color:", ";"], Colors_constant["a" /* colors */].primary);
const Small = external_styled_components_default.a.p.withConfig({
  displayName: "Commonconstant__Small",
  componentId: "xvltui-2"
})(["font-size:", "px;color:", ";"], typography.smallTextSize, Colors_constant["a" /* colors */].dark);
const P = external_styled_components_default.a.p.withConfig({
  displayName: "Commonconstant__P",
  componentId: "xvltui-3"
})(["color:", ";"], Colors_constant["a" /* colors */].silver);
// EXTERNAL MODULE: ./src/helpers/DateHelper.ts
var DateHelper = __webpack_require__("MAEU");

// EXTERNAL MODULE: ./src/store/actions/form.actions.ts
var form_actions = __webpack_require__("ZJ/O");

// EXTERNAL MODULE: ./src/store/actions/post.action.ts + 1 modules
var post_action = __webpack_require__("nH3H");

// CONCATENATED MODULE: ./src/types/Post.types.ts
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
// CONCATENATED MODULE: ./src/pages/posts/[slug].tsx

var _slug_jsx = external_react_default.a.createElement;























const IndividualPage = ({
  post,
  provinces
}) => {
  //human readable date
  const humanDate = DateHelper["a" /* DateHelper */].displayHumanDate(post.createdAt);

  const onRenderPositionType = () => {
    switch (post.positionType) {
      case PostPositionType.FullTime:
        return _slug_jsx(InfoTag, {
          icon: _slug_jsx(react_fontawesome_["FontAwesomeIcon"], {
            icon: free_solid_svg_icons_["faBriefcase"]
          }),
          text: LanguageHelper["a" /* TS */].string("post", "postPositionTypeFullTime")
        });

      case PostPositionType.PartTime:
        return _slug_jsx(InfoTag, {
          icon: _slug_jsx(react_fontawesome_["FontAwesomeIcon"], {
            icon: free_solid_svg_icons_["faClock"]
          }),
          text: LanguageHelper["a" /* TS */].string("post", "postPositionTypePartTime")
        });

      case PostPositionType.Custom:
        return _slug_jsx(InfoTag, {
          icon: _slug_jsx(react_fontawesome_["FontAwesomeIcon"], {
            icon: free_solid_svg_icons_["faUserClock"]
          }),
          text: LanguageHelper["a" /* TS */].string("post", "postPositionTypeCustom")
        });
    }
  };

  const onRenderExperienceRequired = () => {
    if (post.experienceRequired) {
      return _slug_jsx(InfoTag, {
        icon: _slug_jsx(react_fontawesome_["FontAwesomeIcon"], {
          icon: free_solid_svg_icons_["faMagic"]
        }),
        text: LanguageHelper["a" /* TS */].string("post", "postExperienceNotRequired")
      });
    }

    return null;
  };

  const onRenderCategory = () => {
    switch (post.category) {
      case PostCategory.Job:
        return _slug_jsx(InfoTag, {
          icon: _slug_jsx(react_fontawesome_["FontAwesomeIcon"], {
            icon: free_solid_svg_icons_["faUserTie"]
          }),
          text: LanguageHelper["a" /* TS */].string("post", "postCategoryJob")
        });

      case PostCategory.Internship:
        return _slug_jsx(InfoTag, {
          icon: _slug_jsx(react_fontawesome_["FontAwesomeIcon"], {
            icon: free_solid_svg_icons_["faUser"]
          }),
          text: LanguageHelper["a" /* TS */].string("post", "postCategoryInternship")
        });

      case PostCategory.Temporary:
        return _slug_jsx(InfoTag, {
          icon: _slug_jsx(react_fontawesome_["FontAwesomeIcon"], {
            icon: free_solid_svg_icons_["faBusinessTime"]
          }),
          text: LanguageHelper["a" /* TS */].string("post", "postCategoryTemporary")
        });
    }
  };

  const onRenderBenefits = () => {
    var _post$benefits;

    return (_post$benefits = post.benefits) === null || _post$benefits === void 0 ? void 0 : _post$benefits.map(benefit => {
      switch (benefit) {
        case PostBenefits.FoodTicket:
          return _slug_jsx(InfoTag, {
            key: benefit,
            icon: _slug_jsx(react_fontawesome_["FontAwesomeIcon"], {
              icon: free_solid_svg_icons_["faTicketAlt"]
            }),
            text: LanguageHelper["a" /* TS */].string("post", "postBenefitFoodTicket")
          });

        case PostBenefits.HealthCare:
          return _slug_jsx(InfoTag, {
            key: benefit,
            icon: _slug_jsx(react_fontawesome_["FontAwesomeIcon"], {
              icon: free_solid_svg_icons_["faBriefcaseMedical"]
            }),
            text: LanguageHelper["a" /* TS */].string("post", "postBenefitHealthCare")
          });

        case PostBenefits.Meal:
          return _slug_jsx(InfoTag, {
            key: benefit,
            icon: _slug_jsx(react_fontawesome_["FontAwesomeIcon"], {
              icon: free_solid_svg_icons_["faDrumstickBite"]
            }),
            text: LanguageHelper["a" /* TS */].string("post", "postBenefitMeal")
          });

        case PostBenefits.Transportation:
          return _slug_jsx(InfoTag, {
            key: benefit,
            icon: _slug_jsx(react_fontawesome_["FontAwesomeIcon"], {
              icon: free_solid_svg_icons_["faBusAlt"]
            }),
            text: LanguageHelper["a" /* TS */].string("post", "postBenefitTransportation")
          });
      }
    });
  };

  const onRenderSalary = () => {
    return post.monthlySalary && _slug_jsx(InfoTag, {
      icon: _slug_jsx(react_fontawesome_["FontAwesomeIcon"], {
        icon: free_solid_svg_icons_["faMoneyBill"]
      }),
      text: `${LanguageHelper["a" /* TS */].string("post", "currency")} ${post.monthlySalary}`
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
      case PostPositionType.FullTime:
        return "FULL_TIME";

      case PostPositionType.PartTime:
        return "PART_TIME";

      default:
        return "OTHER";
    }
  };

  return _slug_jsx(external_react_default.a.Fragment, null, _slug_jsx(NextSEOPost, {
    jobRole: post.jobRoles[0] || post.title,
    title: post.title,
    description: post.content,
    link: post.externalUrl || Env_constant["b" /* appEnv */].serverUrl,
    city: post.city,
    stateCode: post.stateCode
  }), _slug_jsx(external_next_seo_["JobPostingJsonLd"], {
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
    applicantLocationRequirements: null
  }), _slug_jsx(posts["SearchContainer"], null, _slug_jsx(posts["SearchHeader"], null, _slug_jsx(SearchLogo["a" /* SearchLogo */], null), _slug_jsx(SearchBar["a" /* SearchBar */], {
    provinces: provinces
  }))), _slug_jsx(Cover, null, _slug_jsx(PostCTA, {
    phone: post.phone,
    externalUrl: post.externalUrl,
    email: post.email
  })), _slug_jsx(posts["SearchContainer"], null, _slug_jsx(posts["SearchMain"], null, _slug_jsx(H1, null, post.title), _slug_jsx(Breadcumb["a" /* Breadcumb */], {
    parent: post.sector,
    child: post.jobRoles.join(", ")
  }), _slug_jsx(Small, null, humanDate), _slug_jsx(ContentArea, null, _slug_jsx(external_react_linkify_default.a, {
    properties: {
      target: "_blank"
    }
  }, post.content)), _slug_jsx(InfoTagsContainer, null, _slug_jsx(InfoTag, {
    icon: _slug_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: free_solid_svg_icons_["faMapMarkedAlt"]
    }),
    text: `${post.city}, ${post.stateCode}`
  }), onRenderPositionType(), onRenderExperienceRequired(), onRenderCategory(), onRenderBenefits(), onRenderSalary()), _slug_jsx(H2, null, LanguageHelper["a" /* TS */].string("global", "joinOurCommunity")), _slug_jsx(CommunitiesContainer, null, _slug_jsx("a", {
    href: `http://bit.ly/emprego-urgente-${post.stateCode.toLowerCase()}4`,
    target: "_blank"
  }, _slug_jsx(core_["Button"], {
    variant: "outlined",
    className: "btnWhatsapp"
  }, "WHATSAPP")), _slug_jsx("a", {
    href: getFacebookLink(post.stateCode),
    target: "_blank"
  }, _slug_jsx(core_["Button"], {
    variant: "outlined",
    className: "btnFacebook"
  }, "FACEBOOK")), _slug_jsx("a", {
    href: `https://bit.ly/emprego-urgente-link1`,
    target: "_blank"
  }, _slug_jsx(core_["Button"], {
    variant: "outlined",
    className: "btnEU"
  }, "APP"))))));
};

IndividualPage.getInitialProps = async ctx => {
  const {
    slug
  } = ctx.query;
  await ctx.store.dispatch(Object(form_actions["a" /* loadCountryProvinces */])(Env_constant["b" /* appEnv */].appCountry));
  await ctx.store.dispatch(Object(post_action["c" /* postReadOne */])(null, slug));
  const provinces = ctx.store.getState().formReducer.states;
  const post = ctx.store.getState().postReducer.post;
  return {
    post,
    provinces
  };
};

/* harmony default export */ var _slug_ = __webpack_exports__["default"] = (IndividualPage);
const Cover = external_styled_components_default.a.div.withConfig({
  displayName: "slug__Cover",
  componentId: "kkh1jm-0"
})(["width:100%;height:200px;background-color:", ";background-repeat:no-repeat;background-image:url(\"/images/posts/post-1.webp\");background-blend-mode:multiply;background-size:cover;background-position:center;display:flex;justify-content:center;align-items:center;"], Colors_constant["a" /* colors */].primary);
const InfoTagsContainer = external_styled_components_default.a.div.withConfig({
  displayName: "slug__InfoTagsContainer",
  componentId: "kkh1jm-1"
})(["display:flex;flex-wrap:wrap;flex-direction:row;justify-content:flex-start;margin-top:3rem;margin-bottom:3rem;@media screen and (max-width:", "px){justify-content:center;}"], UI_constant["a" /* UI */].mediumLayoutBreak);
const ContentArea = external_styled_components_default.a.p.withConfig({
  displayName: "slug__ContentArea",
  componentId: "kkh1jm-2"
})(["color:", ";white-space:pre-wrap;"], Colors_constant["a" /* colors */].silver);
const CommunitiesContainer = external_styled_components_default.a.div.withConfig({
  displayName: "slug__CommunitiesContainer",
  componentId: "kkh1jm-3"
})(["display:flex;flex-direction:row;flex-wrap:wrap;width:80%;justify-content:space-between;.btnWhatsapp{background-color:white;border:1px solid ", ";color:", ";}.btnFacebook{background-color:white;border:1px solid ", ";color:", ";}.btnEU{background-color:white;border:1px solid ", ";color:", ";}"], Colors_constant["a" /* colors */].whatsappGreen, Colors_constant["a" /* colors */].whatsappGreen, Colors_constant["a" /* colors */].facebookBlue, Colors_constant["a" /* colors */].facebookBlue, Colors_constant["a" /* colors */].accent, Colors_constant["a" /* colors */].accent);

/***/ }),

/***/ "1Mec":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchBar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("h74D");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Dtiu");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("s4+u");
/* harmony import */ var _store_actions_ui_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("gLWS");
/* harmony import */ var _elements_form_ProvinceSelector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("jBZR");

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
    await dispatch(Object(_store_actions_ui_action__WEBPACK_IMPORTED_MODULE_5__[/* setSearchKey */ "c"])("searchKeyword", hookSearchInput)); // console.log("submitted search!");
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
    onSubmit: onSubmit
  }, __jsx(SearchBarInput, {
    type: "text",
    title: "Search",
    onChange: e => setHookSearchInput(e.target.value),
    value: hookSearchInput
  }), __jsx(ProvinceContainer, null, __jsx(_elements_form_ProvinceSelector__WEBPACK_IMPORTED_MODULE_6__[/* ProvinceSelector */ "a"], {
    provinces: props.provinces
  })));
};
const FormContainer = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.form.withConfig({
  displayName: "SearchBar__FormContainer",
  componentId: "sc-1je134r-0"
})(["flex:100%;margin-bottom:1rem;display:flex;flex-wrap:wrap;flex-direction:row-reverse;@media screen and (min-width:", "px){flex:7;justify-content:center;align-items:center;display:flex;max-width:700px;margin-left:4rem;}"], _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_4__[/* UI */ "a"].mediumLayoutBreak);
const ProvinceContainer = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.div.withConfig({
  displayName: "SearchBar__ProvinceContainer",
  componentId: "sc-1je134r-1"
})(["flex:20%;display:flex;justify-content:center;height:3.3rem;padding-right:1rem;@media screen and (min-width:", "px){width:100%;max-width:70px;}[class*=\"MuiInput\"]{width:100%;border-radius:24px;padding-right:5px;}"], _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_4__[/* UI */ "a"].mediumLayoutBreak);
const SearchBarInput = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.input.withConfig({
  displayName: "SearchBar__SearchBarInput",
  componentId: "sc-1je134r-2"
})(["border:1px solid #dfe1e5;border-radius:24px;height:44px;background-image:url(\"/images/search.png\");background-repeat:no-repeat;background-position:98% 50%;font-size:14px;padding-left:20px;flex:80%;:focus,:focus,:focus{outline:none;}:hover{box-shadow:0 1px 6px 0 rgba(32,33,36,0.28);}"]);

/***/ }),

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

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("0FOq");


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

/***/ "7KCV":
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__("C+bE");

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

/***/ "81rA":
/***/ (function(module, exports) {

module.exports = require("moment/locale/pt-br");

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

/***/ "C+bE":
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

/***/ "FDqc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchLogo; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Dtiu");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants_Env_constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("LocT");
/* harmony import */ var _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("s4+u");

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const SearchLogo = () => {
  return __jsx(Container, null, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/"
  }, __jsx("img", {
    src: `/images/logo-${_constants_Env_constant__WEBPACK_IMPORTED_MODULE_3__[/* appEnv */ "b"].language}.svg`
  })));
};
const Container = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
  displayName: "SearchLogo__Container",
  componentId: "atffdm-0"
})(["cursor:pointer;flex:100%;justify-content:center;align-items:center;display:flex;margin-bottom:1rem;width:120px;height:70px;img{width:120px;}@media screen and (min-width:", "px){flex:1;max-width:120px;img{margin-left:3rem;}}"], _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_4__[/* UI */ "a"].mediumLayoutBreak);

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

/***/ "Jtos":
/***/ (function(module, exports) {

module.exports = require("@material-ui/lab/Pagination");

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

/***/ "MAEU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateHelper; });
/* harmony import */ var moment_locale_pt_br__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("81rA");
/* harmony import */ var moment_locale_pt_br__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment_locale_pt_br__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("wy2R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_Env_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("LocT");
/* harmony import */ var _types_Global_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("EGZL");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class DateHelper {}

_defineProperty(DateHelper, "displayHumanDate", date => {
  switch (_constants_Env_constant__WEBPACK_IMPORTED_MODULE_2__[/* appEnv */ "b"].language) {
    case _types_Global_types__WEBPACK_IMPORTED_MODULE_3__[/* AvailableLanguages */ "a"].ptBr:
      return moment__WEBPACK_IMPORTED_MODULE_1___default()(date).locale("pt-br").format("ddd, DD MMM YY");

    case _types_Global_types__WEBPACK_IMPORTED_MODULE_3__[/* AvailableLanguages */ "a"].eng:
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

/***/ "YFqc":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cTJO")


/***/ }),

/***/ "YLtl":
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "YTqd":
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

/***/ "Zy31":
/***/ (function(module, exports) {

module.exports = require("react-linkify");

/***/ }),

/***/ "bzos":
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "cTJO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("AroE");

var _interopRequireWildcard = __webpack_require__("7KCV");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__("cDcd"));

var _url = __webpack_require__("bzos");

var _utils = __webpack_require__("g/15");

var _router = _interopRequireDefault(__webpack_require__("nOHt"));

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

    if (false) {}

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
      if (false) {}
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

if (false) { var exact, PropTypes, warn; }

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "dZ6Y":
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

/***/ "dpWq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "PaginationContainer", function() { return /* binding */ PaginationContainer; });
__webpack_require__.d(__webpack_exports__, "SearchMain", function() { return /* binding */ SearchMain; });
__webpack_require__.d(__webpack_exports__, "SearchHeader", function() { return /* binding */ SearchHeader; });
__webpack_require__.d(__webpack_exports__, "SearchContainer", function() { return /* binding */ SearchContainer; });

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "@material-ui/lab/Pagination"
var Pagination_ = __webpack_require__("Jtos");
var Pagination_default = /*#__PURE__*/__webpack_require__.n(Pagination_);

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__("Dtiu");
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: ./src/helpers/LanguageHelper.ts
var LanguageHelper = __webpack_require__("PJYc");

// EXTERNAL MODULE: ./src/constants/UI/Colors.constant.ts
var Colors_constant = __webpack_require__("xRM6");

// CONCATENATED MODULE: ./src/components/pages/index/NotFoundContainer.tsx

var __jsx = external_react_default.a.createElement;


const NotFoundContainer = props => {
  return __jsx(Container, null, __jsx(ImgContainer, null, __jsx(PostNotFoundImg, {
    src: `/images/postNotFound.svg`
  }), __jsx(Text, null, props.text)));
};
const Container = external_styled_components_default.a.div.withConfig({
  displayName: "NotFoundContainer__Container",
  componentId: "sc-1p8pbr6-0"
})(["display:flex;justify-content:center;align-items:center;margin-top:3rem;flex-wrap:wrap;"]);
const ImgContainer = external_styled_components_default.a.div.withConfig({
  displayName: "NotFoundContainer__ImgContainer",
  componentId: "sc-1p8pbr6-1"
})(["display:flex;flex-wrap:wrap;justify-content:center;align-items:center;"]);
const PostNotFoundImg = external_styled_components_default.a.img.withConfig({
  displayName: "NotFoundContainer__PostNotFoundImg",
  componentId: "sc-1p8pbr6-2"
})(["max-width:150px;flex:100%;"]);
const Text = external_styled_components_default.a.p.withConfig({
  displayName: "NotFoundContainer__Text",
  componentId: "sc-1p8pbr6-3"
})(["text-align:center;margin-top:1rem;flex:100%;color:", ";font-size:14px;margin-top:2rem;"], Colors_constant["a" /* colors */].silver);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__("YFqc");
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);

// EXTERNAL MODULE: ./src/constants/UI/UI.constant.ts
var UI_constant = __webpack_require__("s4+u");

// EXTERNAL MODULE: ./src/helpers/DateHelper.ts
var DateHelper = __webpack_require__("MAEU");

// EXTERNAL MODULE: ./src/components/elements/ui/Breadcumb.tsx
var Breadcumb = __webpack_require__("gcrl");

// CONCATENATED MODULE: ./src/components/pages/posts/results/SearchItem.tsx

var SearchItem_jsx = external_react_default.a.createElement;






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
  const humanDate = DateHelper["a" /* DateHelper */].displayHumanDate(date);
  return SearchItem_jsx(SearchItem_Container, null, SearchItem_jsx(Breadcumb["a" /* Breadcumb */], {
    parent: `${stateCode} - ${category}`,
    child: tags
  }), SearchItem_jsx(link_default.a, {
    href: "/posts/[slug]",
    as: `/posts/${slug}`
  }, SearchItem_jsx(Title, null, title)), SearchItem_jsx(MobileDate, null, humanDate), SearchItem_jsx(link_default.a, {
    href: "/posts/[slug]",
    as: `/posts/${slug}`
  }, SearchItem_jsx(Description, null, SearchItem_jsx(DesktopDate, null, humanDate, " - "), description)));
};
const SearchItem_Container = external_styled_components_default.a.div.withConfig({
  displayName: "SearchItem__Container",
  componentId: "cxzb8i-0"
})(["flex:100%;background-color:#fff;margin:0 0 10px 0;box-shadow:0 1px 6px rgba(32,33,36,0.28);border-radius:8px;border-bottom:1px hidden #fff;padding:1.5rem;word-break:break-all;@media screen and (min-width:", "px){box-shadow:none;padding-left:0;max-width:652px;}"], UI_constant["a" /* UI */].mediumLayoutBreak);
const Title = external_styled_components_default.a.div.withConfig({
  displayName: "SearchItem__Title",
  componentId: "cxzb8i-1"
})(["font-size:18px;margin-top:1rem;font-weight:300;color:", ";cursor:pointer;&:hover{text-decoration:underline;}"], () => Colors_constant["a" /* colors */].primary);
const Description = external_styled_components_default.a.div.withConfig({
  displayName: "SearchItem__Description",
  componentId: "cxzb8i-2"
})(["cursor:pointer;color:", ";font-size:14px;margin-top:0.5rem;line-height:1.4;white-space:pre-wrap;&:hover{text-decoration:underline;}"], () => Colors_constant["a" /* colors */].dark);
const MobileDate = external_styled_components_default.a.div.withConfig({
  displayName: "SearchItem__MobileDate",
  componentId: "cxzb8i-3"
})(["@media screen and (max-width:", "px){color:", ";margin-top:1rem;font-size:14px;display:block;}display:none;"], UI_constant["a" /* UI */].mediumLayoutBreak, () => Colors_constant["a" /* colors */].silver);
const DesktopDate = external_styled_components_default.a.span.withConfig({
  displayName: "SearchItem__DesktopDate",
  componentId: "cxzb8i-4"
})(["@media screen and (min-width:", "px){color:", ";font-size:14px;display:inline;}display:none;"], UI_constant["a" /* UI */].mediumLayoutBreak, () => Colors_constant["a" /* colors */].silver);
// CONCATENATED MODULE: ./src/components/pages/posts/results/SearchResults.tsx

var SearchResults_jsx = external_react_default.a.createElement;




const SearchResults = ({
  posts
}) => {
  const filteredPosts = posts.filter(post => post.owner);

  const onRenderPosts = () => {
    if (!filteredPosts.length) {
      return SearchResults_jsx(NotFoundContainer, {
        text: LanguageHelper["a" /* TS */].string("post", "postsNotFound")
      });
    }

    return SearchResults_jsx(SearchResults_Container, null, filteredPosts === null || filteredPosts === void 0 ? void 0 : filteredPosts.map(post => SearchResults_jsx(SearchItem, {
      id: post._id,
      key: post._id,
      category: post.sector,
      tags: post.jobRoles.join(","),
      title: post.title,
      date: post.createdAt,
      description: post.content,
      slug: post.slug,
      stateCode: post.stateCode
    })));
  };

  return onRenderPosts();
};
const SearchResults_Container = external_styled_components_default.a.div.withConfig({
  displayName: "SearchResults__Container",
  componentId: "r13t24-0"
})(["margin-top:2rem;"]);
// EXTERNAL MODULE: ./src/components/pages/posts/SearchBar.tsx
var SearchBar = __webpack_require__("1Mec");

// EXTERNAL MODULE: ./src/components/pages/posts/SearchLogo.tsx
var SearchLogo = __webpack_require__("FDqc");

// CONCATENATED MODULE: ./src/components/pages/posts/SearchTabs.tsx

var SearchTabs_jsx = external_react_default.a.createElement;




const SearchTabs = () => {
  return SearchTabs_jsx(external_react_default.a.Fragment, null, SearchTabs_jsx(TabList, null, SearchTabs_jsx(TabItem, {
    active: true
  }, LanguageHelper["a" /* TS */].string("ui", "tabJobs"))), SearchTabs_jsx(Divisor, null));
};
const TabList = external_styled_components_default.a.ul.withConfig({
  displayName: "SearchTabs__TabList",
  componentId: "serhyh-0"
})(["flex:100%;list-style-type:none;margin:0;padding:0;display:flex;flex-wrap:wrap;"]);
const TabItem = external_styled_components_default.a.li.withConfig({
  displayName: "SearchTabs__TabItem",
  componentId: "serhyh-1"
})(["cursor:pointer;margin-right:0.5rem;padding:0.5rem;color:", ";", ""], ({
  active
}) => active ? Colors_constant["a" /* colors */].primary : Colors_constant["a" /* colors */].secondaryGray, ({
  active
}) => active && Object(external_styled_components_["css"])(["border-bottom:2px solid ", ";"], Colors_constant["a" /* colors */].primary));
const Divisor = external_styled_components_default.a.div.withConfig({
  displayName: "SearchTabs__Divisor",
  componentId: "serhyh-2"
})(["position:absolute;left:0;width:100%;height:1px;background-color:", ";@media screen and (max-width:", "px){display:none;}"], Colors_constant["a" /* colors */].secondaryGray, UI_constant["a" /* UI */].mediumLayoutBreak);
// EXTERNAL MODULE: external "next-seo"
var external_next_seo_ = __webpack_require__("efsx");

// EXTERNAL MODULE: ./src/constants/Env.constant.ts
var Env_constant = __webpack_require__("LocT");

// EXTERNAL MODULE: ./src/types/Global.types.ts
var Global_types = __webpack_require__("EGZL");

// CONCATENATED MODULE: ./src/components/seo/NextSEOPosts.tsx

var NextSEOPosts_jsx = external_react_default.a.createElement;



const NextSEOPosts = ({
  postsQty,
  jobRole,
  city,
  stateCode
}) => {
  switch (Env_constant["b" /* appEnv */].language) {
    case Global_types["a" /* AvailableLanguages */].ptBr:
      const title = `Emprego Urgente | ${postsQty} vagas de ${jobRole} em ${city}, ${stateCode}`;
      const description = `Cadastre seu currículo agora mesmo e tenha acesso a mais de ${postsQty} vagas de ${jobRole} em todo Brasil!`;
      const link = "https://www.empregourgente.com";
      return NextSEOPosts_jsx(external_next_seo_["NextSeo"], {
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
// EXTERNAL MODULE: ./src/store/actions/form.actions.ts
var form_actions = __webpack_require__("ZJ/O");

// EXTERNAL MODULE: ./src/store/actions/post.action.ts + 1 modules
var post_action = __webpack_require__("nH3H");

// CONCATENATED MODULE: ./src/pages/posts/index.tsx

var posts_jsx = external_react_default.a.createElement;















const Posts = ({
  provinces,
  posts,
  paginationData
}) => {
  var _posts$, _posts$2;

  const router = Object(router_["useRouter"])();
  const {
    searchProvince,
    searchKeyword
  } = router.query;
  Object(external_react_["useEffect"])(() => {
    console.log(paginationData);
  }, [paginationData]);
  Object(external_react_["useEffect"])(() => {
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

  return posts_jsx(external_react_default.a.Fragment, null, posts && posts_jsx(NextSEOPosts, {
    jobRole: jobRole,
    postsQty: posts.length,
    city: ((_posts$2 = posts[0]) === null || _posts$2 === void 0 ? void 0 : _posts$2.city) || null,
    stateCode: searchProvince
  }), posts_jsx(SearchContainer, null, posts_jsx(SearchHeader, null, posts_jsx(SearchLogo["a" /* SearchLogo */], null), posts_jsx(SearchBar["a" /* SearchBar */], {
    provinces: provinces
  })), posts_jsx(SearchMain, null, posts_jsx(SearchTabs, null), posts_jsx(SearchResults, {
    posts: posts
  }), posts_jsx(PaginationContainer, null, posts_jsx(Pagination_default.a, {
    size: "large",
    color: "primary",
    page: paginationData.page,
    count: paginationData.totalPages,
    onChange: (e, page) => {
      console.log(`CHANGING TO PAGE ${page}`);
      onPageChange(page);
    },
    hideNextButton: !paginationData.hasNextPage,
    hidePrevButton: !paginationData.hasPrevPage
  })))));
};

/* harmony default export */ var pages_posts = __webpack_exports__["default"] = (Posts);

Posts.getInitialProps = async ctx => {
  await ctx.store.dispatch(Object(form_actions["a" /* loadCountryProvinces */])(Env_constant["b" /* appEnv */].appCountry));
  console.log("Loading provinces...");
  const provinces = ctx.store.getState().formReducer.states; // populate province dropdown

  console.log("Loading pagination data...");
  const {
    searchProvince,
    searchKeyword,
    page = 1
  } = ctx.query;
  console.log(ctx.query);
  await ctx.store.dispatch(Object(post_action["b" /* postReadFeed */])(page, 40, searchProvince, searchKeyword, false));
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

const PaginationContainer = external_styled_components_default.a.div.withConfig({
  displayName: "posts__PaginationContainer",
  componentId: "sc-90uezp-0"
})(["display:flex;justify-content:center;align-items:center;"]);
const SearchMain = external_styled_components_default.a.div.withConfig({
  displayName: "posts__SearchMain",
  componentId: "sc-90uezp-1"
})(["@media screen and (min-width:", "px){margin-left:13rem;margin-right:7.7rem;max-width:700px;margin-top:4rem;}"], UI_constant["a" /* UI */].mediumLayoutBreak);
const SearchHeader = external_styled_components_default.a.div.withConfig({
  displayName: "posts__SearchHeader",
  componentId: "sc-90uezp-2"
})(["display:flex;flex-wrap:wrap;flex:1;@media screen and (min-width:", "px){flex:8;margin-top:1rem;}"], UI_constant["a" /* UI */].mediumLayoutBreak);
const SearchContainer = external_styled_components_default.a.div.withConfig({
  displayName: "posts__SearchContainer",
  componentId: "sc-90uezp-3"
})(["padding:1rem;@media screen and (min-width:", "px){padding:0;}a{color:", ";&:visited{color:", ";}}"], UI_constant["a" /* UI */].mediumLayoutBreak, Colors_constant["a" /* colors */].primary, Colors_constant["a" /* colors */].accent);

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

/***/ "elyg":
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

const url_1 = __webpack_require__("bzos");

const mitt_1 = __importDefault(__webpack_require__("dZ6Y"));

const utils_1 = __webpack_require__("g/15");

const is_dynamic_1 = __webpack_require__("/jkW");

const route_matcher_1 = __webpack_require__("gguc");

const route_regex_1 = __webpack_require__("YTqd");

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

      if (false) {}

      this.replace(url, as, options);
    };

    this._getStaticData = asPath => {
      const pathname = prepareRoute(url_1.parse(asPath).pathname);
      return  true && this.sdc[pathname] ? Promise.resolve(this.sdc[pathname]) : fetchNextData(pathname, null, this.isSsr, data => this.sdc[pathname] = data);
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
        if (false) {}

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
            if (false) {}

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

        if (false) {}

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
    if (false) {}

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

      if (false) {}

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
        if (false) {}

        return;
      } // Prefetch is not supported in development mode because it would trigger on-demand-entries


      if (false) {}

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

/***/ "gcrl":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Breadcumb; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Dtiu");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("xRM6");

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
          href: parentLink
        }, __jsx(DarkBoldText, null, parent));
      } else {
        return __jsx(DarkBoldText, null, parent);
      }
    }
  };

  const onRenderChild = () => {
    if (child) {
      if (childLink) {
        return __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
          href: childLink
        }, child);
      } else {
        return child;
      }
    }
  };

  return __jsx(BreadcumbContainer, null, onRenderParent(), ` › `, onRenderChild());
};
const BreadcumbContainer = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({
  displayName: "Breadcumb__BreadcumbContainer",
  componentId: "sla1l1-0"
})(["font-size:12px;color:", ";"], () => _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_3__[/* colors */ "a"].silver);
const DarkBoldText = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.span.withConfig({
  displayName: "Breadcumb__DarkBoldText",
  componentId: "sla1l1-1"
})(["color:", ";font-weight:500;"], () => _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_3__[/* colors */ "a"].dark);

/***/ }),

/***/ "gguc":
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

/***/ "nOHt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("7KCV");

var _interopRequireDefault = __webpack_require__("AroE");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router2 = _interopRequireWildcard(__webpack_require__("elyg"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__("qOIg");

var _withRouter = _interopRequireDefault(__webpack_require__("0Bsm"));

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

/***/ "qOIg":
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

const React = __importStar(__webpack_require__("cDcd"));

exports.RouterContext = React.createContext(null);

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

/***/ "wy2R":
/***/ (function(module, exports) {

module.exports = require("moment");

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