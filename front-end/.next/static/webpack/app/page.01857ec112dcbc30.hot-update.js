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

/***/ "(app-pages-browser)/./src/components/RecentPlays.tsx":
/*!****************************************!*\
  !*** ./src/components/RecentPlays.tsx ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ RecentPlays; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _barrel_optimize_names_FaUser_react_icons_fa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! __barrel_optimize__?names=FaUser!=!react-icons/fa */ \"(app-pages-browser)/./node_modules/react-icons/fa/index.esm.js\");\n/* harmony import */ var _barrel_optimize_names_GiTrophyCup_react_icons_gi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! __barrel_optimize__?names=GiTrophyCup!=!react-icons/gi */ \"(app-pages-browser)/./node_modules/react-icons/gi/index.esm.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\n\nconst people = [\n    {\n        name: \"Leslie Alexander\",\n        email: \"leslie.alexander@example.com\",\n        role: \"Co-Founder / CEO\",\n        imageUrl: \"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80\",\n        lastSeen: \"3h ago\",\n        lastSeenDateTime: \"2023-01-23T13:23Z\"\n    },\n    {\n        name: \"Michael Foster\",\n        email: \"michael.foster@example.com\",\n        role: \"Co-Founder / CTO\",\n        imageUrl: \"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80\",\n        lastSeen: \"3h ago\",\n        lastSeenDateTime: \"2023-01-23T13:23Z\"\n    },\n    {\n        name: \"Dries Vincent\",\n        email: \"dries.vincent@example.com\",\n        role: \"Business Relations\",\n        imageUrl: \"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80\",\n        lastSeen: null\n    },\n    {\n        name: \"Lindsay Walton\",\n        email: \"lindsay.walton@example.com\",\n        role: \"Front-end Developer\",\n        imageUrl: \"https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80\",\n        lastSeen: \"3h ago\",\n        lastSeenDateTime: \"2023-01-23T13:23Z\"\n    },\n    {\n        name: \"Courtney Henry\",\n        email: \"courtney.henry@example.com\",\n        role: \"Designer\",\n        imageUrl: \"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80\",\n        lastSeen: \"3h ago\",\n        lastSeenDateTime: \"2023-01-23T13:23Z\"\n    }\n];\nfunction RecentPlays(param) {\n    let { plays, className } = param;\n    const getProfilePic = ()=>{\n        if (!profile || !profile.metadata || !profile.metadata.photoURL) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FaUser_react_icons_fa__WEBPACK_IMPORTED_MODULE_1__.FaUser, {\n            className: \"h-40 aspect-square rounded-full\"\n        }, void 0, false, {\n            fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n            lineNumber: 58,\n            columnNumber: 20\n        }, this);\n        const url = profile.metadata.photoURL !== null ? profile.metadata.photoURL : \"\";\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n            src: url,\n            className: \"h-40 aspect-square rounded-full\"\n        }, void 0, false, {\n            fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n            lineNumber: 61,\n            columnNumber: 16\n        }, this);\n    };\n    const getName = ()=>{\n        if (!profile || !profile.metadata || !profile.metadata.displayName) return \"No Name\";\n        return profile.metadata.displayName;\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: className,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex flex-row items-center w-[100%] h-[100%] rounded-2xl bg-white/[0.6] text-black p-8\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: getProfilePic()\n                }, void 0, false, {\n                    fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                    lineNumber: 73,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex flex-col justify-center items-start ml-3\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                children: [\n                                    \"Hi, \",\n                                    getName()\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                                lineNumber: 76,\n                                columnNumber: 25\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                            lineNumber: 75,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"block\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"flex flex-row justify-center items-center \",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"flex flex-row items-center text-amber-500 bg-gray-700 rounded-md px-3 py-2 text-sm font-medium mb-2\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_GiTrophyCup_react_icons_gi__WEBPACK_IMPORTED_MODULE_2__.GiTrophyCup, {\n                                                className: \"h-8 w-auto \"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                                                lineNumber: 83,\n                                                columnNumber: 37\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                                className: \"m-1\",\n                                                children: \"20002\"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                                                lineNumber: 84,\n                                                columnNumber: 37\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                                        lineNumber: 82,\n                                        columnNumber: 33\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                                    lineNumber: 81,\n                                    columnNumber: 29\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                                lineNumber: 80,\n                                columnNumber: 25\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                            lineNumber: 79,\n                            columnNumber: 21\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                    lineNumber: 74,\n                    columnNumber: 17\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n            lineNumber: 72,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n        lineNumber: 71,\n        columnNumber: 9\n    }, this);\n}\n_c = RecentPlays;\nvar _c;\n$RefreshReg$(_c, \"RecentPlays\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1JlY2VudFBsYXlzLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUV3QztBQUNJO0FBRzVDLE1BQU1FLFNBQVM7SUFDWDtRQUNJQyxNQUFNO1FBQ05DLE9BQU87UUFDUEMsTUFBTTtRQUNOQyxVQUNJO1FBQ0pDLFVBQVU7UUFDVkMsa0JBQWtCO0lBQ3RCO0lBQ0E7UUFDSUwsTUFBTTtRQUNOQyxPQUFPO1FBQ1BDLE1BQU07UUFDTkMsVUFDSTtRQUNKQyxVQUFVO1FBQ1ZDLGtCQUFrQjtJQUN0QjtJQUNBO1FBQ0lMLE1BQU07UUFDTkMsT0FBTztRQUNQQyxNQUFNO1FBQ05DLFVBQ0k7UUFDSkMsVUFBVTtJQUNkO0lBQ0E7UUFDSUosTUFBTTtRQUNOQyxPQUFPO1FBQ1BDLE1BQU07UUFDTkMsVUFDSTtRQUNKQyxVQUFVO1FBQ1ZDLGtCQUFrQjtJQUN0QjtJQUNBO1FBQ0lMLE1BQU07UUFDTkMsT0FBTztRQUNQQyxNQUFNO1FBQ05DLFVBQ0k7UUFDSkMsVUFBVTtRQUNWQyxrQkFBa0I7SUFDdEI7Q0FDSDtBQUVjLFNBQVNDLFlBQVksS0FBdUQ7UUFBdkQsRUFBQ0MsS0FBSyxFQUFDQyxTQUFTLEVBQXVDLEdBQXZEO0lBRWhDLE1BQU1DLGdCQUFnQjtRQUNsQixJQUFJLENBQUNDLFdBQVcsQ0FBQ0EsUUFBUUMsUUFBUSxJQUFJLENBQUNELFFBQVFDLFFBQVEsQ0FBQ0MsUUFBUSxFQUMzRCxxQkFBTyw4REFBQ2YsZ0ZBQU1BO1lBQUNXLFdBQVU7Ozs7OztRQUM3QixNQUFNSyxNQUNGSCxRQUFRQyxRQUFRLENBQUNDLFFBQVEsS0FBSyxPQUFPRixRQUFRQyxRQUFRLENBQUNDLFFBQVEsR0FBRztRQUNyRSxxQkFBTyw4REFBQ0U7WUFBSUMsS0FBS0Y7WUFBS0wsV0FBVTs7Ozs7O0lBQ3BDO0lBRUEsTUFBTVEsVUFBVTtRQUNaLElBQUksQ0FBQ04sV0FBVyxDQUFDQSxRQUFRQyxRQUFRLElBQUksQ0FBQ0QsUUFBUUMsUUFBUSxDQUFDTSxXQUFXLEVBQzlELE9BQU87UUFDWCxPQUFPUCxRQUFRQyxRQUFRLENBQUNNLFdBQVc7SUFDdkM7SUFFQSxxQkFDSSw4REFBQ0M7UUFBSVYsV0FBV0E7a0JBQ1osNEVBQUNVO1lBQUlWLFdBQVU7OzhCQUNYLDhEQUFDVTs4QkFBS1Q7Ozs7Ozs4QkFDTiw4REFBQ1M7b0JBQUlWLFdBQVU7O3NDQUNYLDhEQUFDVTtzQ0FDRyw0RUFBQ0M7O29DQUFHO29DQUFLSDs7Ozs7Ozs7Ozs7O3NDQUdiLDhEQUFDRTtzQ0FDRyw0RUFBQ0E7Z0NBQUlWLFdBQVU7MENBQ1gsNEVBQUNVO29DQUFJVixXQUFVOzhDQUNYLDRFQUFDVTt3Q0FBSVYsV0FBVTs7MERBQ1gsOERBQUNWLDBGQUFXQTtnREFBQ1UsV0FBVTs7Ozs7OzBEQUN2Qiw4REFBQ1k7Z0RBQUdaLFdBQVU7MERBQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU3hEO0tBdkN3QkYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvUmVjZW50UGxheXMudHN4PzMwZWIiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnOyAvLyBUaGlzIGlzIGEgY2xpZW50IGNvbXBvbmVudCDwn5GI8J+PvVxuaW1wb3J0IHsgVXNlciB9IGZyb20gJ2ZpcmViYXNlL2F1dGgnO1xuaW1wb3J0IHsgRmFVc2VyIH0gZnJvbSAncmVhY3QtaWNvbnMvZmEnO1xuaW1wb3J0IHsgR2lUcm9waHlDdXAgfSBmcm9tICdyZWFjdC1pY29ucy9naSdcbmltcG9ydCB7IFBsYXkgfSBmcm9tICdAL2FwcC9tb2RlbHMnO1xuXG5jb25zdCBwZW9wbGUgPSBbXG4gICAge1xuICAgICAgICBuYW1lOiAnTGVzbGllIEFsZXhhbmRlcicsXG4gICAgICAgIGVtYWlsOiAnbGVzbGllLmFsZXhhbmRlckBleGFtcGxlLmNvbScsXG4gICAgICAgIHJvbGU6ICdDby1Gb3VuZGVyIC8gQ0VPJyxcbiAgICAgICAgaW1hZ2VVcmw6XG4gICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0OTQ3OTAxMDgzNzctYmU5YzI5YjI5MzMwP2l4bGliPXJiLTEuMi4xJml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU1EZDkmYXV0bz1mb3JtYXQmZml0PWZhY2VhcmVhJmZhY2VwYWQ9MiZ3PTI1NiZoPTI1NiZxPTgwJyxcbiAgICAgICAgbGFzdFNlZW46ICczaCBhZ28nLFxuICAgICAgICBsYXN0U2VlbkRhdGVUaW1lOiAnMjAyMy0wMS0yM1QxMzoyM1onLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnTWljaGFlbCBGb3N0ZXInLFxuICAgICAgICBlbWFpbDogJ21pY2hhZWwuZm9zdGVyQGV4YW1wbGUuY29tJyxcbiAgICAgICAgcm9sZTogJ0NvLUZvdW5kZXIgLyBDVE8nLFxuICAgICAgICBpbWFnZVVybDpcbiAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxOTI0NDcwMzk5NS1mNGUwZjMwMDA2ZDU/aXhsaWI9cmItMS4yLjEmaXhpZD1leUpoY0hCZmFXUWlPakV5TURkOSZhdXRvPWZvcm1hdCZmaXQ9ZmFjZWFyZWEmZmFjZXBhZD0yJnc9MjU2Jmg9MjU2JnE9ODAnLFxuICAgICAgICBsYXN0U2VlbjogJzNoIGFnbycsXG4gICAgICAgIGxhc3RTZWVuRGF0ZVRpbWU6ICcyMDIzLTAxLTIzVDEzOjIzWicsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdEcmllcyBWaW5jZW50JyxcbiAgICAgICAgZW1haWw6ICdkcmllcy52aW5jZW50QGV4YW1wbGUuY29tJyxcbiAgICAgICAgcm9sZTogJ0J1c2luZXNzIFJlbGF0aW9ucycsXG4gICAgICAgIGltYWdlVXJsOlxuICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTA2Nzk0Nzc4MjAyLWNhZDg0Y2Y0NWYxZD9peGxpYj1yYi0xLjIuMSZpeGlkPWV5SmhjSEJmYVdRaU9qRXlNRGQ5JmF1dG89Zm9ybWF0JmZpdD1mYWNlYXJlYSZmYWNlcGFkPTImdz0yNTYmaD0yNTYmcT04MCcsXG4gICAgICAgIGxhc3RTZWVuOiBudWxsLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnTGluZHNheSBXYWx0b24nLFxuICAgICAgICBlbWFpbDogJ2xpbmRzYXkud2FsdG9uQGV4YW1wbGUuY29tJyxcbiAgICAgICAgcm9sZTogJ0Zyb250LWVuZCBEZXZlbG9wZXInLFxuICAgICAgICBpbWFnZVVybDpcbiAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNzg0MTkwNTI0MC00NzI5ODhiYWJkZjk/aXhsaWI9cmItMS4yLjEmaXhpZD1leUpoY0hCZmFXUWlPakV5TURkOSZhdXRvPWZvcm1hdCZmaXQ9ZmFjZWFyZWEmZmFjZXBhZD0yJnc9MjU2Jmg9MjU2JnE9ODAnLFxuICAgICAgICBsYXN0U2VlbjogJzNoIGFnbycsXG4gICAgICAgIGxhc3RTZWVuRGF0ZVRpbWU6ICcyMDIzLTAxLTIzVDEzOjIzWicsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdDb3VydG5leSBIZW5yeScsXG4gICAgICAgIGVtYWlsOiAnY291cnRuZXkuaGVucnlAZXhhbXBsZS5jb20nLFxuICAgICAgICByb2xlOiAnRGVzaWduZXInLFxuICAgICAgICBpbWFnZVVybDpcbiAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQzODc2MTY4MTAzMy02NDYxZmZhZDhkODA/aXhsaWI9cmItMS4yLjEmaXhpZD1leUpoY0hCZmFXUWlPakV5TURkOSZhdXRvPWZvcm1hdCZmaXQ9ZmFjZWFyZWEmZmFjZXBhZD0yJnc9MjU2Jmg9MjU2JnE9ODAnLFxuICAgICAgICBsYXN0U2VlbjogJzNoIGFnbycsXG4gICAgICAgIGxhc3RTZWVuRGF0ZVRpbWU6ICcyMDIzLTAxLTIzVDEzOjIzWicsXG4gICAgfVxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVjZW50UGxheXMoe3BsYXlzLGNsYXNzTmFtZSx9OiB7cGxheXM6IFBsYXlbXTsgY2xhc3NOYW1lOiBzdHJpbmc7fSkge1xuXG4gICAgY29uc3QgZ2V0UHJvZmlsZVBpYyA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFwcm9maWxlIHx8ICFwcm9maWxlLm1ldGFkYXRhIHx8ICFwcm9maWxlLm1ldGFkYXRhLnBob3RvVVJMKVxuICAgICAgICAgICAgcmV0dXJuIDxGYVVzZXIgY2xhc3NOYW1lPVwiaC00MCBhc3BlY3Qtc3F1YXJlIHJvdW5kZWQtZnVsbFwiIC8+O1xuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9XG4gICAgICAgICAgICBwcm9maWxlLm1ldGFkYXRhLnBob3RvVVJMICE9PSBudWxsID8gcHJvZmlsZS5tZXRhZGF0YS5waG90b1VSTCA6ICcnO1xuICAgICAgICByZXR1cm4gPGltZyBzcmM9e3VybH0gY2xhc3NOYW1lPVwiaC00MCBhc3BlY3Qtc3F1YXJlIHJvdW5kZWQtZnVsbFwiIC8+O1xuICAgIH07XG5cbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXByb2ZpbGUgfHwgIXByb2ZpbGUubWV0YWRhdGEgfHwgIXByb2ZpbGUubWV0YWRhdGEuZGlzcGxheU5hbWUpXG4gICAgICAgICAgICByZXR1cm4gJ05vIE5hbWUnO1xuICAgICAgICByZXR1cm4gcHJvZmlsZS5tZXRhZGF0YS5kaXNwbGF5TmFtZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1yb3cgaXRlbXMtY2VudGVyIHctWzEwMCVdIGgtWzEwMCVdIHJvdW5kZWQtMnhsIGJnLXdoaXRlL1swLjZdIHRleHQtYmxhY2sgcC04XCI+XG4gICAgICAgICAgICAgICAgPGRpdj57Z2V0UHJvZmlsZVBpYygpfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1zdGFydCBtbC0zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDE+SGksIHtnZXROYW1lKCl9PC9oMT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1yb3cganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyIFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXIgdGV4dC1hbWJlci01MDAgYmctZ3JheS03MDAgcm91bmRlZC1tZCBweC0zIHB5LTIgdGV4dC1zbSBmb250LW1lZGl1bSBtYi0yJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxHaVRyb3BoeUN1cCBjbGFzc05hbWU9XCJoLTggdy1hdXRvIFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9J20tMSc+MjAwMDI8L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuIl0sIm5hbWVzIjpbIkZhVXNlciIsIkdpVHJvcGh5Q3VwIiwicGVvcGxlIiwibmFtZSIsImVtYWlsIiwicm9sZSIsImltYWdlVXJsIiwibGFzdFNlZW4iLCJsYXN0U2VlbkRhdGVUaW1lIiwiUmVjZW50UGxheXMiLCJwbGF5cyIsImNsYXNzTmFtZSIsImdldFByb2ZpbGVQaWMiLCJwcm9maWxlIiwibWV0YWRhdGEiLCJwaG90b1VSTCIsInVybCIsImltZyIsInNyYyIsImdldE5hbWUiLCJkaXNwbGF5TmFtZSIsImRpdiIsImgxIiwiaDIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/RecentPlays.tsx\n"));

/***/ })

});