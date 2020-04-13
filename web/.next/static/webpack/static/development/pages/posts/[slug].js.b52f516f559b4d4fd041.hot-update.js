webpackHotUpdate("static/development/pages/posts/[slug].js",{

/***/ "./src/pages/posts/[slug].tsx":
/*!************************************!*\
  !*** ./src/pages/posts/[slug].tsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var next_seo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next-seo */ "./node_modules/next-seo/lib/index.js");
/* harmony import */ var next_seo__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_seo__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_linkify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-linkify */ "./node_modules/react-linkify/dist/index.js");
/* harmony import */ var react_linkify__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_linkify__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! . */ "./src/pages/posts/index.tsx");
/* harmony import */ var _components_elements_ui_Breadcumb__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/elements/ui/Breadcumb */ "./src/components/elements/ui/Breadcumb.tsx");
/* harmony import */ var _components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/elements/ui/InfoTag */ "./src/components/elements/ui/InfoTag.tsx");
/* harmony import */ var _components_pages_posts_PostCTA__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/pages/posts/PostCTA */ "./src/components/pages/posts/PostCTA.tsx");
/* harmony import */ var _components_pages_posts_SearchBar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/pages/posts/SearchBar */ "./src/components/pages/posts/SearchBar.tsx");
/* harmony import */ var _components_pages_posts_SearchLogo__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/pages/posts/SearchLogo */ "./src/components/pages/posts/SearchLogo.tsx");
/* harmony import */ var _components_seo_NextSEOPost__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../components/seo/NextSEOPost */ "./src/components/seo/NextSEOPost.tsx");
/* harmony import */ var _constants_Env_constant__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../constants/Env.constant */ "./src/constants/Env.constant.ts");
/* harmony import */ var _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../constants/UI/Colors.constant */ "./src/constants/UI/Colors.constant.ts");
/* harmony import */ var _constants_UI_Common_constant__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../constants/UI/Common.constant */ "./src/constants/UI/Common.constant.ts");
/* harmony import */ var _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../constants/UI/UI.constant */ "./src/constants/UI/UI.constant.ts");
/* harmony import */ var _helpers_DateHelper__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../helpers/DateHelper */ "./src/helpers/DateHelper.ts");
/* harmony import */ var _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../helpers/LanguageHelper */ "./src/helpers/LanguageHelper.ts");
/* harmony import */ var _store_actions_form_actions__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../store/actions/form.actions */ "./src/store/actions/form.actions.ts");
/* harmony import */ var _store_actions_post_action__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../store/actions/post.action */ "./src/store/actions/post.action.ts");
/* harmony import */ var _types_Post_types__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../types/Post.types */ "./src/types/Post.types.ts");


var _this = undefined,
    _jsxFileName = "/usr/src/app/src/pages/posts/[slug].tsx";


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;























var IndividualPage = function IndividualPage(_ref) {
  var post = _ref.post,
      provinces = _ref.provinces;
  //  human readable date
  var humanDate = _helpers_DateHelper__WEBPACK_IMPORTED_MODULE_19__["DateHelper"].displayHumanDate(post.createdAt);

  var onRenderPositionType = function onRenderPositionType() {
    switch (post.positionType) {
      case _types_Post_types__WEBPACK_IMPORTED_MODULE_23__["PostPositionType"].FullTime:
        return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_10__["InfoTag"], {
          icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faBriefcase"],
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 54,
              columnNumber: 19
            }
          }),
          text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_20__["TS"].string("post", "postPositionTypeFullTime"),
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 53,
            columnNumber: 11
          }
        });

      case _types_Post_types__WEBPACK_IMPORTED_MODULE_23__["PostPositionType"].PartTime:
        return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_10__["InfoTag"], {
          icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faClock"],
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 62,
              columnNumber: 19
            }
          }),
          text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_20__["TS"].string("post", "postPositionTypePartTime"),
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 61,
            columnNumber: 11
          }
        });

      case _types_Post_types__WEBPACK_IMPORTED_MODULE_23__["PostPositionType"].Custom:
        return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_10__["InfoTag"], {
          icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faUserClock"],
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 70,
              columnNumber: 19
            }
          }),
          text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_20__["TS"].string("post", "postPositionTypeCustom"),
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 69,
            columnNumber: 11
          }
        });
    }
  };

  var onRenderExperienceRequired = function onRenderExperienceRequired() {
    if (post.experienceRequired) {
      return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_10__["InfoTag"], {
        icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
          icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faMagic"],
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 81,
            columnNumber: 17
          }
        }),
        text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_20__["TS"].string("post", "postExperienceNotRequired"),
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 80,
          columnNumber: 9
        }
      });
    }

    return null;
  };

  var onRenderCategory = function onRenderCategory() {
    switch (post.category) {
      case _types_Post_types__WEBPACK_IMPORTED_MODULE_23__["PostCategory"].Job:
        return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_10__["InfoTag"], {
          icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faUserTie"],
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 95,
              columnNumber: 19
            }
          }),
          text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_20__["TS"].string("post", "postCategoryJob"),
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 94,
            columnNumber: 11
          }
        });

      case _types_Post_types__WEBPACK_IMPORTED_MODULE_23__["PostCategory"].Internship:
        return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_10__["InfoTag"], {
          icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faUser"],
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 102,
              columnNumber: 19
            }
          }),
          text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_20__["TS"].string("post", "postCategoryInternship"),
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 101,
            columnNumber: 11
          }
        });

      case _types_Post_types__WEBPACK_IMPORTED_MODULE_23__["PostCategory"].Temporary:
        return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_10__["InfoTag"], {
          icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faBusinessTime"],
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 110,
              columnNumber: 19
            }
          }),
          text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_20__["TS"].string("post", "postCategoryTemporary"),
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 109,
            columnNumber: 11
          }
        });
    }
  };

  var onRenderBenefits = function onRenderBenefits() {
    var _post$benefits;

    return (_post$benefits = post.benefits) === null || _post$benefits === void 0 ? void 0 : _post$benefits.map(function (benefit) {
      switch (benefit) {
        case _types_Post_types__WEBPACK_IMPORTED_MODULE_23__["PostBenefits"].FoodTicket:
          return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_10__["InfoTag"], {
            key: benefit,
            icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
              icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faTicketAlt"],
              __self: _this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 124,
                columnNumber: 21
              }
            }),
            text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_20__["TS"].string("post", "postBenefitFoodTicket"),
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 122,
              columnNumber: 13
            }
          });

        case _types_Post_types__WEBPACK_IMPORTED_MODULE_23__["PostBenefits"].HealthCare:
          return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_10__["InfoTag"], {
            key: benefit,
            icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
              icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faBriefcaseMedical"],
              __self: _this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 132,
                columnNumber: 21
              }
            }),
            text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_20__["TS"].string("post", "postBenefitHealthCare"),
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 130,
              columnNumber: 13
            }
          });

        case _types_Post_types__WEBPACK_IMPORTED_MODULE_23__["PostBenefits"].Meal:
          return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_10__["InfoTag"], {
            key: benefit,
            icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
              icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faDrumstickBite"],
              __self: _this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 140,
                columnNumber: 21
              }
            }),
            text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_20__["TS"].string("post", "postBenefitMeal"),
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 138,
              columnNumber: 13
            }
          });

        case _types_Post_types__WEBPACK_IMPORTED_MODULE_23__["PostBenefits"].Transportation:
          return __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_10__["InfoTag"], {
            key: benefit,
            icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
              icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faBusAlt"],
              __self: _this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 148,
                columnNumber: 21
              }
            }),
            text: _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_20__["TS"].string("post", "postBenefitTransportation"),
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 146,
              columnNumber: 13
            }
          });
      }
    });
  };

  var onRenderSalary = function onRenderSalary() {
    return post.monthlySalary && __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_10__["InfoTag"], {
      icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faMoneyBill"],
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160,
          columnNumber: 17
        }
      }),
      text: "".concat(_helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_20__["TS"].string("post", "currency"), " ").concat(post.monthlySalary),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 159,
        columnNumber: 9
      }
    });
  };

  var getFacebookLink = function getFacebookLink(stateCode) {
    var facebookGroupLinks = {
      ES: "https://www.facebook.com/groups/empregoses/",
      SP: "https://www.facebook.com/groups/empregosessp/",
      MG: "https://www.facebook.com/groups/grupoempregosbh/"
    };
    return facebookGroupLinks[stateCode];
  };

  var getJobJsonLDType = function getJobJsonLDType() {
    switch (post.positionType) {
      case _types_Post_types__WEBPACK_IMPORTED_MODULE_23__["PostPositionType"].FullTime:
        return "FULL_TIME";

      case _types_Post_types__WEBPACK_IMPORTED_MODULE_23__["PostPositionType"].PartTime:
        return "PART_TIME";

      default:
        return "OTHER";
    }
  };

  return __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx(_components_seo_NextSEOPost__WEBPACK_IMPORTED_MODULE_14__["NextSEOPost"], {
    jobRole: post.jobRoles[0] || post.title,
    title: post.title,
    description: post.content,
    link: post.externalUrl || _constants_Env_constant__WEBPACK_IMPORTED_MODULE_15__["appEnv"].serverUrl,
    city: post.city,
    stateCode: post.stateCode,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 190,
      columnNumber: 7
    }
  }), __jsx(next_seo__WEBPACK_IMPORTED_MODULE_5__["JobPostingJsonLd"], {
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
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 198,
      columnNumber: 7
    }
  }), __jsx(___WEBPACK_IMPORTED_MODULE_8__["SearchContainer"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 223,
      columnNumber: 7
    }
  }, __jsx(___WEBPACK_IMPORTED_MODULE_8__["SearchHeader"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 224,
      columnNumber: 9
    }
  }, __jsx(_components_pages_posts_SearchLogo__WEBPACK_IMPORTED_MODULE_13__["SearchLogo"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 225,
      columnNumber: 11
    }
  }), __jsx(_components_pages_posts_SearchBar__WEBPACK_IMPORTED_MODULE_12__["SearchBar"], {
    provinces: provinces,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 226,
      columnNumber: 11
    }
  }))), __jsx(Cover, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 230,
      columnNumber: 7
    }
  }, __jsx(_components_pages_posts_PostCTA__WEBPACK_IMPORTED_MODULE_11__["PostCTA"], {
    phone: post.phone,
    externalUrl: post.externalUrl,
    email: post.email,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 231,
      columnNumber: 9
    }
  })), __jsx(___WEBPACK_IMPORTED_MODULE_8__["SearchContainer"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 237,
      columnNumber: 7
    }
  }, __jsx(___WEBPACK_IMPORTED_MODULE_8__["SearchMain"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 238,
      columnNumber: 9
    }
  }, __jsx(_constants_UI_Common_constant__WEBPACK_IMPORTED_MODULE_17__["H1"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 239,
      columnNumber: 11
    }
  }, post.title), __jsx(_components_elements_ui_Breadcumb__WEBPACK_IMPORTED_MODULE_9__["Breadcumb"], {
    parent: post.sector,
    child: post.jobRoles.join(", "),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 240,
      columnNumber: 11
    }
  }), __jsx(_constants_UI_Common_constant__WEBPACK_IMPORTED_MODULE_17__["Small"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 241,
      columnNumber: 11
    }
  }, humanDate), __jsx(ContentArea, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 242,
      columnNumber: 11
    }
  }, __jsx(react_linkify__WEBPACK_IMPORTED_MODULE_6___default.a, {
    properties: {
      target: "_blank"
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 243,
      columnNumber: 13
    }
  }, post.content)), __jsx(InfoTagsContainer, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 246,
      columnNumber: 11
    }
  }, __jsx(_components_elements_ui_InfoTag__WEBPACK_IMPORTED_MODULE_10__["InfoTag"], {
    icon: __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
      icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faMapMarkedAlt"],
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 248,
        columnNumber: 21
      }
    }),
    text: "".concat(post.city, ", ").concat(post.stateCode),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 247,
      columnNumber: 13
    }
  }), onRenderPositionType(), onRenderExperienceRequired(), onRenderCategory(), onRenderBenefits(), onRenderSalary()), __jsx(_constants_UI_Common_constant__WEBPACK_IMPORTED_MODULE_17__["H2"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 257,
      columnNumber: 11
    }
  }, _helpers_LanguageHelper__WEBPACK_IMPORTED_MODULE_20__["TS"].string("global", "joinOurCommunity")), __jsx(CommunitiesContainer, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 258,
      columnNumber: 11
    }
  }, __jsx("a", {
    href: "http://bit.ly/emprego-urgente-".concat(post.stateCode.toLowerCase(), "4"),
    target: "_blank",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 259,
      columnNumber: 13
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], {
    variant: "outlined",
    className: "btnWhatsapp",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 263,
      columnNumber: 15
    }
  }, "WHATSAPP")), __jsx("a", {
    href: getFacebookLink(post.stateCode),
    target: "_blank",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 268,
      columnNumber: 13
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], {
    variant: "outlined",
    className: "btnFacebook",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 269,
      columnNumber: 15
    }
  }, "FACEBOOK")), __jsx("a", {
    href: "https://bit.ly/emprego-urgente-link1",
    target: "_blank",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 274,
      columnNumber: 13
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Button"], {
    variant: "outlined",
    className: "btnEU",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 275,
      columnNumber: 15
    }
  }, "APP"))))));
};

IndividualPage.getInitialProps = function _callee(ctx) {
  var slug, provinces, post;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          slug = ctx.query.slug;
          _context.next = 3;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(ctx.store.dispatch(Object(_store_actions_form_actions__WEBPACK_IMPORTED_MODULE_21__["loadCountryProvinces"])(_constants_Env_constant__WEBPACK_IMPORTED_MODULE_15__["appEnv"].appCountry)));

        case 3:
          _context.next = 5;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(ctx.store.dispatch(Object(_store_actions_post_action__WEBPACK_IMPORTED_MODULE_22__["postReadOne"])(null, slug)));

        case 5:
          provinces = ctx.store.getState().formReducer.states;
          post = ctx.store.getState().postReducer.post;
          return _context.abrupt("return", {
            post: post,
            provinces: provinces
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
};

/* harmony default export */ __webpack_exports__["default"] = (IndividualPage);
var Cover = styled_components__WEBPACK_IMPORTED_MODULE_7__["default"].div.withConfig({
  displayName: "slug__Cover",
  componentId: "kkh1jm-0"
})(["width:100%;height:200px;background-color:", ";background-repeat:no-repeat;background-image:url(\"/images/posts/post-1.webp\");background-blend-mode:multiply;background-size:cover;background-position:center;display:flex;justify-content:center;align-items:center;"], _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_16__["colors"].primary);
var InfoTagsContainer = styled_components__WEBPACK_IMPORTED_MODULE_7__["default"].div.withConfig({
  displayName: "slug__InfoTagsContainer",
  componentId: "kkh1jm-1"
})(["display:flex;flex-wrap:wrap;flex-direction:row;justify-content:flex-start;margin-top:3rem;margin-bottom:3rem;@media screen and (max-width:", "px){justify-content:center;}"], _constants_UI_UI_constant__WEBPACK_IMPORTED_MODULE_18__["UI"].mediumLayoutBreak);
var ContentArea = styled_components__WEBPACK_IMPORTED_MODULE_7__["default"].p.withConfig({
  displayName: "slug__ContentArea",
  componentId: "kkh1jm-2"
})(["color:", ";white-space:pre-wrap;"], _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_16__["colors"].silver);
var CommunitiesContainer = styled_components__WEBPACK_IMPORTED_MODULE_7__["default"].div.withConfig({
  displayName: "slug__CommunitiesContainer",
  componentId: "kkh1jm-3"
})(["display:flex;flex-direction:row;flex-wrap:wrap;width:80%;justify-content:space-between;.btnWhatsapp{background-color:white;border:1px solid ", ";color:", ";}.btnFacebook{background-color:white;border:1px solid ", ";color:", ";}.btnEU{background-color:white;border:1px solid ", ";color:", ";}"], _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_16__["colors"].whatsappGreen, _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_16__["colors"].whatsappGreen, _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_16__["colors"].facebookBlue, _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_16__["colors"].facebookBlue, _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_16__["colors"].accent, _constants_UI_Colors_constant__WEBPACK_IMPORTED_MODULE_16__["colors"].accent);

/***/ })

})
//# sourceMappingURL=[slug].js.b52f516f559b4d4fd041.hot-update.js.map