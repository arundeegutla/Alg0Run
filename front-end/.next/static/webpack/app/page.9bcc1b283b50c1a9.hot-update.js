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

/***/ "(app-pages-browser)/./src/components/Profile.tsx":
/*!************************************!*\
  !*** ./src/components/Profile.tsx ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Profile; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _barrel_optimize_names_FaUser_react_icons_fa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! __barrel_optimize__?names=FaUser!=!react-icons/fa */ \"(app-pages-browser)/./node_modules/react-icons/fa/index.esm.js\");\n/* harmony import */ var _barrel_optimize_names_GiTrophyCup_react_icons_gi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! __barrel_optimize__?names=GiTrophyCup!=!react-icons/gi */ \"(app-pages-browser)/./node_modules/react-icons/gi/index.esm.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\n\nfunction Profile(param) {\n    let { profile, className } = param;\n    const getProfilePic = ()=>{\n        if (!profile || !profile.metadata || !profile.metadata.photoURL) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FaUser_react_icons_fa__WEBPACK_IMPORTED_MODULE_1__.FaUser, {\n            className: \"h-40 aspect-square rounded-full\"\n        }, void 0, false, {\n            fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/Profile.tsx\",\n            lineNumber: 22,\n            columnNumber: 20\n        }, this);\n        const url = profile.metadata.photoURL !== null ? profile.metadata.photoURL : \"\";\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n            src: url,\n            className: \"h-40 aspect-square rounded-full\"\n        }, void 0, false, {\n            fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/Profile.tsx\",\n            lineNumber: 25,\n            columnNumber: 16\n        }, this);\n    };\n    const getName = ()=>{\n        if (!profile || !profile.metadata || !profile.metadata.displayName) return \"No Name\";\n        return profile.metadata.displayName;\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: className,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex flex-row w-[40%] h-[40%] rounded-2xl bg-white/[0.6] text-black p-8\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: getProfilePic()\n                }, void 0, false, {\n                    fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/Profile.tsx\",\n                    lineNumber: 37,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex flex-col justify-center items-start ml-3\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                children: [\n                                    \"Hi, \",\n                                    getName()\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/Profile.tsx\",\n                                lineNumber: 41,\n                                columnNumber: 25\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/Profile.tsx\",\n                            lineNumber: 40,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"block\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"flex flex-row justify-center items-center \",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"flex flex-row items-center text-amber-500 bg-gray-700 rounded-md px-3 py-2 text-sm font-medium mb-2\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_GiTrophyCup_react_icons_gi__WEBPACK_IMPORTED_MODULE_2__.GiTrophyCup, {\n                                                className: \"h-8 w-auto \"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/Profile.tsx\",\n                                                lineNumber: 48,\n                                                columnNumber: 37\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                                className: \"m-1\",\n                                                children: \"20002\"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/Profile.tsx\",\n                                                lineNumber: 49,\n                                                columnNumber: 37\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/Profile.tsx\",\n                                        lineNumber: 47,\n                                        columnNumber: 33\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/Profile.tsx\",\n                                    lineNumber: 46,\n                                    columnNumber: 29\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/Profile.tsx\",\n                                lineNumber: 45,\n                                columnNumber: 25\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/Profile.tsx\",\n                            lineNumber: 44,\n                            columnNumber: 21\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/Profile.tsx\",\n                    lineNumber: 38,\n                    columnNumber: 17\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/Profile.tsx\",\n            lineNumber: 36,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/Profile.tsx\",\n        lineNumber: 35,\n        columnNumber: 9\n    }, this);\n}\n_c = Profile;\nvar _c;\n$RefreshReg$(_c, \"Profile\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1Byb2ZpbGUudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRXdDO0FBQ0k7QUFTN0IsU0FBU0UsUUFBUSxLQU0vQjtRQU4rQixFQUM1QkMsT0FBTyxFQUNQQyxTQUFTLEVBSVosR0FOK0I7SUFPNUIsTUFBTUMsZ0JBQWdCO1FBQ2xCLElBQUksQ0FBQ0YsV0FBVyxDQUFDQSxRQUFRRyxRQUFRLElBQUksQ0FBQ0gsUUFBUUcsUUFBUSxDQUFDQyxRQUFRLEVBQzNELHFCQUFPLDhEQUFDUCxnRkFBTUE7WUFBQ0ksV0FBVTs7Ozs7O1FBQzdCLE1BQU1JLE1BQ0ZMLFFBQVFHLFFBQVEsQ0FBQ0MsUUFBUSxLQUFLLE9BQU9KLFFBQVFHLFFBQVEsQ0FBQ0MsUUFBUSxHQUFHO1FBQ3JFLHFCQUFPLDhEQUFDRTtZQUFJQyxLQUFLRjtZQUFLSixXQUFVOzs7Ozs7SUFDcEM7SUFFQSxNQUFNTyxVQUFVO1FBQ1osSUFBSSxDQUFDUixXQUFXLENBQUNBLFFBQVFHLFFBQVEsSUFBSSxDQUFDSCxRQUFRRyxRQUFRLENBQUNNLFdBQVcsRUFDOUQsT0FBTztRQUNYLE9BQU9ULFFBQVFHLFFBQVEsQ0FBQ00sV0FBVztJQUN2QztJQUVBLHFCQUNJLDhEQUFDQztRQUFJVCxXQUFXQTtrQkFDWiw0RUFBQ1M7WUFBSVQsV0FBVTs7OEJBQ1gsOERBQUNTOzhCQUFLUjs7Ozs7OzhCQUNOLDhEQUFDUTtvQkFBSVQsV0FBVTs7c0NBRVgsOERBQUNTO3NDQUNHLDRFQUFDQzs7b0NBQUc7b0NBQUtIOzs7Ozs7Ozs7Ozs7c0NBR2IsOERBQUNFO3NDQUNHLDRFQUFDQTtnQ0FBSVQsV0FBVTswQ0FDWCw0RUFBQ1M7b0NBQUlULFdBQVU7OENBQ1gsNEVBQUNTO3dDQUFJVCxXQUFVOzswREFDWCw4REFBQ0gsMEZBQVdBO2dEQUFDRyxXQUFVOzs7Ozs7MERBQ3ZCLDhEQUFDVztnREFBR1gsV0FBVTswREFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTeEQ7S0E3Q3dCRiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9Qcm9maWxlLnRzeD82NDdjIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JzsgLy8gVGhpcyBpcyBhIGNsaWVudCBjb21wb25lbnQg8J+RiPCfj71cbmltcG9ydCB7IFVzZXIgfSBmcm9tICdmaXJlYmFzZS9hdXRoJztcbmltcG9ydCB7IEZhVXNlciB9IGZyb20gJ3JlYWN0LWljb25zL2ZhJztcbmltcG9ydCB7IEdpVHJvcGh5Q3VwIH0gZnJvbSAncmVhY3QtaWNvbnMvZ2knXG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgICB0eXBlIE15VXNlciA9IHtcbiAgICAgICAgbWV0YWRhdGE6IFVzZXIgfCB1bmRlZmluZWQgfCBudWxsO1xuICAgICAgICBzY29yZTogbnVtYmVyO1xuICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFByb2ZpbGUoe1xuICAgIHByb2ZpbGUsXG4gICAgY2xhc3NOYW1lLFxufToge1xuICAgIHByb2ZpbGU6IE15VXNlcjtcbiAgICBjbGFzc05hbWU6IHN0cmluZztcbn0pIHtcbiAgICBjb25zdCBnZXRQcm9maWxlUGljID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXByb2ZpbGUgfHwgIXByb2ZpbGUubWV0YWRhdGEgfHwgIXByb2ZpbGUubWV0YWRhdGEucGhvdG9VUkwpXG4gICAgICAgICAgICByZXR1cm4gPEZhVXNlciBjbGFzc05hbWU9XCJoLTQwIGFzcGVjdC1zcXVhcmUgcm91bmRlZC1mdWxsXCIgLz47XG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID1cbiAgICAgICAgICAgIHByb2ZpbGUubWV0YWRhdGEucGhvdG9VUkwgIT09IG51bGwgPyBwcm9maWxlLm1ldGFkYXRhLnBob3RvVVJMIDogJyc7XG4gICAgICAgIHJldHVybiA8aW1nIHNyYz17dXJsfSBjbGFzc05hbWU9XCJoLTQwIGFzcGVjdC1zcXVhcmUgcm91bmRlZC1mdWxsXCIgLz47XG4gICAgfTtcblxuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PiB7XG4gICAgICAgIGlmICghcHJvZmlsZSB8fCAhcHJvZmlsZS5tZXRhZGF0YSB8fCAhcHJvZmlsZS5tZXRhZGF0YS5kaXNwbGF5TmFtZSlcbiAgICAgICAgICAgIHJldHVybiAnTm8gTmFtZSc7XG4gICAgICAgIHJldHVybiBwcm9maWxlLm1ldGFkYXRhLmRpc3BsYXlOYW1lO1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXJvdyB3LVs0MCVdIGgtWzQwJV0gcm91bmRlZC0yeGwgYmctd2hpdGUvWzAuNl0gdGV4dC1ibGFjayBwLThcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PntnZXRQcm9maWxlUGljKCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGp1c3RpZnktY2VudGVyIGl0ZW1zLXN0YXJ0IG1sLTNcIj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgxPkhpLCB7Z2V0TmFtZSgpfTwvaDE+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZsZXggZmxleC1yb3cgaXRlbXMtY2VudGVyIHRleHQtYW1iZXItNTAwIGJnLWdyYXktNzAwIHJvdW5kZWQtbWQgcHgtMyBweS0yIHRleHQtc20gZm9udC1tZWRpdW0gbWItMic+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8R2lUcm9waHlDdXAgY2xhc3NOYW1lPVwiaC04IHctYXV0byBcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPSdtLTEnPjIwMDAyPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbiJdLCJuYW1lcyI6WyJGYVVzZXIiLCJHaVRyb3BoeUN1cCIsIlByb2ZpbGUiLCJwcm9maWxlIiwiY2xhc3NOYW1lIiwiZ2V0UHJvZmlsZVBpYyIsIm1ldGFkYXRhIiwicGhvdG9VUkwiLCJ1cmwiLCJpbWciLCJzcmMiLCJnZXROYW1lIiwiZGlzcGxheU5hbWUiLCJkaXYiLCJoMSIsImgyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/Profile.tsx\n"));

/***/ })

});