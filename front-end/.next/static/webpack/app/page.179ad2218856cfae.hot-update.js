"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/app/page.tsx":
/*!**************************!*\
  !*** ./src/app/page.tsx ***!
  \**************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _components_NavBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/NavBar */ \"(app-pages-browser)/./src/components/NavBar.tsx\");\n/* harmony import */ var _components_Profile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Profile */ \"(app-pages-browser)/./src/components/Profile.tsx\");\n/* harmony import */ var _firebase_clientApp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../firebase/clientApp */ \"(app-pages-browser)/./firebase/clientApp.ts\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_firebase_hooks_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-firebase-hooks/auth */ \"(app-pages-browser)/./node_modules/react-firebase-hooks/auth/dist/index.esm.js\");\n/* harmony import */ var _components_Loading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/Loading */ \"(app-pages-browser)/./src/components/Loading.tsx\");\n/* harmony import */ var _components_Friends__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Friends */ \"(app-pages-browser)/./src/components/Friends.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nfunction Home() {\n    _s();\n    const [user, loading, error] = (0,react_firebase_hooks_auth__WEBPACK_IMPORTED_MODULE_5__.useAuthState)(_firebase_clientApp__WEBPACK_IMPORTED_MODULE_3__.auth);\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_4__.useRouter)();\n    if (user) {\n        console.log(user.displayName);\n    } else if (loading) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Loading__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n            fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/app/page.tsx\",\n            lineNumber: 23,\n            columnNumber: 13\n        }, this);\n    } else {\n        router.push(\"/auth\");\n        return;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"default flex-row items-stretch flex-wrap\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"h-[50%]\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Profile__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        className: \"profile my-blur my-hover rounded-2xl w-[50%]\",\n                        profile: {\n                            metadata: user,\n                            score: 10\n                        }\n                    }, void 0, false, {\n                        fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/app/page.tsx\",\n                        lineNumber: 34,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Friends__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                        className: \"profile my-blur my-hover rounded-2xl\",\n                        friends: []\n                    }, void 0, false, {\n                        fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/app/page.tsx\",\n                        lineNumber: 35,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Friends__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                        className: \"profile my-blur my-hover rounded-2xl\",\n                        friends: []\n                    }, void 0, false, {\n                        fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/app/page.tsx\",\n                        lineNumber: 36,\n                        columnNumber: 17\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/app/page.tsx\",\n                lineNumber: 33,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"h-[50%]\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Friends__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                        className: \"profile my-blur my-hover rounded-2xl\",\n                        friends: []\n                    }, void 0, false, {\n                        fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/app/page.tsx\",\n                        lineNumber: 39,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Friends__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                        className: \"profile my-blur my-hover rounded-2xl\",\n                        friends: []\n                    }, void 0, false, {\n                        fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/app/page.tsx\",\n                        lineNumber: 40,\n                        columnNumber: 17\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/app/page.tsx\",\n                lineNumber: 38,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_NavBar__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                current: \"Home\"\n            }, void 0, false, {\n                fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/app/page.tsx\",\n                lineNumber: 43,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/app/page.tsx\",\n        lineNumber: 32,\n        columnNumber: 9\n    }, this);\n}\n_s(Home, \"LgcSMBRe1mGgmxuBGL3mXlZuWmg=\", false, function() {\n    return [\n        react_firebase_hooks_auth__WEBPACK_IMPORTED_MODULE_5__.useAuthState,\n        next_navigation__WEBPACK_IMPORTED_MODULE_4__.useRouter\n    ];\n});\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBRzBDO0FBQ0U7QUFFRztBQUNIO0FBQ2E7QUFDZDtBQUNBO0FBRzVCLFNBQVNPOztJQUNwQixNQUFNLENBQUNDLE1BQU1DLFNBQVNDLE1BQU0sR0FBR04sdUVBQVlBLENBQUNGLHFEQUFJQTtJQUVoRCxNQUFNUyxTQUFTUiwwREFBU0E7SUFFeEIsSUFBR0ssTUFBTTtRQUNMSSxRQUFRQyxHQUFHLENBQUNMLEtBQUtNLFdBQVc7SUFDaEMsT0FBTyxJQUFHTCxTQUFTO1FBQ2YscUJBQ0ksOERBQUNKLDJEQUFPQTs7Ozs7SUFFaEIsT0FBTztRQUNITSxPQUFPSSxJQUFJLENBQUM7UUFDWjtJQUNKO0lBR0EscUJBQ0ksOERBQUNDO1FBQUtDLFdBQVU7OzBCQUNaLDhEQUFDQztnQkFBSUQsV0FBVTs7a0NBQ1gsOERBQUNoQiwyREFBT0E7d0JBQUNnQixXQUFVO3dCQUErQ0UsU0FBUzs0QkFBQ0MsVUFBVVo7NEJBQU1hLE9BQU87d0JBQUU7Ozs7OztrQ0FDckcsOERBQUNmLDJEQUFPQTt3QkFBQ1csV0FBVTt3QkFBdUNLLFNBQVMsRUFBRTs7Ozs7O2tDQUNyRSw4REFBQ2hCLDJEQUFPQTt3QkFBQ1csV0FBVTt3QkFBdUNLLFNBQVMsRUFBRTs7Ozs7Ozs7Ozs7OzBCQUV6RSw4REFBQ0o7Z0JBQUlELFdBQVU7O2tDQUNYLDhEQUFDWCwyREFBT0E7d0JBQUNXLFdBQVU7d0JBQXVDSyxTQUFTLEVBQUU7Ozs7OztrQ0FDckUsOERBQUNoQiwyREFBT0E7d0JBQUNXLFdBQVU7d0JBQXVDSyxTQUFTLEVBQUU7Ozs7Ozs7Ozs7OzswQkFHekUsOERBQUN0QiwwREFBTUE7Z0JBQUN1QixTQUFROzs7Ozs7Ozs7Ozs7QUFHNUI7R0FoQ3dCaEI7O1FBQ1dILG1FQUFZQTtRQUU1QkQsc0RBQVNBOzs7S0FISkkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9wYWdlLnRzeD9mNjhhIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcblxuaW1wb3J0IExpc3RHcm91cCBmcm9tICcuLi9jb21wb25lbnRzL0xpc3RHcm91cCc7XG5pbXBvcnQgTmF2QmFyIGZyb20gJy4uL2NvbXBvbmVudHMvTmF2QmFyJztcbmltcG9ydCBQcm9maWxlIGZyb20gJy4uL2NvbXBvbmVudHMvUHJvZmlsZSc7XG5cbmltcG9ydCB7IGF1dGggfSBmcm9tICcuLi8uLi9maXJlYmFzZS9jbGllbnRBcHAnXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L25hdmlnYXRpb24nO1xuaW1wb3J0IHsgdXNlQXV0aFN0YXRlIH0gZnJvbSBcInJlYWN0LWZpcmViYXNlLWhvb2tzL2F1dGhcIjtcbmltcG9ydCBMb2FkaW5nIGZyb20gJ0AvY29tcG9uZW50cy9Mb2FkaW5nJztcbmltcG9ydCBGcmllbmRzIGZyb20gJy4uL2NvbXBvbmVudHMvRnJpZW5kcydcbmltcG9ydCBSZWNlbnRQbGF5cyBmcm9tICdAL2NvbXBvbmVudHMvUmVjZW50UGxheXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xuICAgIGNvbnN0IFt1c2VyLCBsb2FkaW5nLCBlcnJvcl0gPSB1c2VBdXRoU3RhdGUoYXV0aCk7XG5cbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICAgIGlmKHVzZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2codXNlci5kaXNwbGF5TmFtZSk7XG4gICAgfSBlbHNlIGlmKGxvYWRpbmcpIHsgXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TG9hZGluZyAvPlxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvdXRlci5wdXNoKCcvYXV0aCcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8bWFpbiBjbGFzc05hbWU9XCJkZWZhdWx0IGZsZXgtcm93IGl0ZW1zLXN0cmV0Y2ggZmxleC13cmFwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naC1bNTAlXSc+XG4gICAgICAgICAgICAgICAgPFByb2ZpbGUgY2xhc3NOYW1lPSdwcm9maWxlIG15LWJsdXIgbXktaG92ZXIgcm91bmRlZC0yeGwgdy1bNTAlXScgcHJvZmlsZT17e21ldGFkYXRhOiB1c2VyLCBzY29yZTogMTB9fT48L1Byb2ZpbGU+XG4gICAgICAgICAgICAgICAgPEZyaWVuZHMgY2xhc3NOYW1lPSdwcm9maWxlIG15LWJsdXIgbXktaG92ZXIgcm91bmRlZC0yeGwnIGZyaWVuZHM9e1tdfT48L0ZyaWVuZHM+XG4gICAgICAgICAgICAgICAgPEZyaWVuZHMgY2xhc3NOYW1lPSdwcm9maWxlIG15LWJsdXIgbXktaG92ZXIgcm91bmRlZC0yeGwnIGZyaWVuZHM9e1tdfT48L0ZyaWVuZHM+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdoLVs1MCVdJz5cbiAgICAgICAgICAgICAgICA8RnJpZW5kcyBjbGFzc05hbWU9J3Byb2ZpbGUgbXktYmx1ciBteS1ob3ZlciByb3VuZGVkLTJ4bCcgZnJpZW5kcz17W119PjwvRnJpZW5kcz5cbiAgICAgICAgICAgICAgICA8RnJpZW5kcyBjbGFzc05hbWU9J3Byb2ZpbGUgbXktYmx1ciBteS1ob3ZlciByb3VuZGVkLTJ4bCcgZnJpZW5kcz17W119PjwvRnJpZW5kcz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgey8qIDxSZWNlbnRQbGF5cyBjbGFzc05hbWU9J3Byb2ZpbGUgbXktYmx1ciBteS1ob3ZlciByb3VuZGVkLTJ4bCcgcGxheXM9e1tdfT48L1JlY2VudFBsYXlzPiAqL31cbiAgICAgICAgICAgIDxOYXZCYXIgY3VycmVudD0nSG9tZSc+PC9OYXZCYXI+XG4gICAgICAgIDwvbWFpbj5cbiAgICApO1xufVxuIl0sIm5hbWVzIjpbIk5hdkJhciIsIlByb2ZpbGUiLCJhdXRoIiwidXNlUm91dGVyIiwidXNlQXV0aFN0YXRlIiwiTG9hZGluZyIsIkZyaWVuZHMiLCJIb21lIiwidXNlciIsImxvYWRpbmciLCJlcnJvciIsInJvdXRlciIsImNvbnNvbGUiLCJsb2ciLCJkaXNwbGF5TmFtZSIsInB1c2giLCJtYWluIiwiY2xhc3NOYW1lIiwiZGl2IiwicHJvZmlsZSIsIm1ldGFkYXRhIiwic2NvcmUiLCJmcmllbmRzIiwiY3VycmVudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/page.tsx\n"));

/***/ })

});