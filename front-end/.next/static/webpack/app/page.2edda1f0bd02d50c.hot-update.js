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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ RecentPlays; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _barrel_optimize_names_GiTrophyCup_react_icons_gi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! __barrel_optimize__?names=GiTrophyCup!=!react-icons/gi */ \"(app-pages-browser)/./node_modules/react-icons/gi/index.esm.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\nconst people = [\n    {\n        name: \"Leslie Alexander\",\n        email: \"leslie.alexander@example.com\",\n        role: \"Co-Founder / CEO\",\n        imageUrl: \"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80\",\n        lastSeen: \"3h ago\",\n        lastSeenDateTime: \"2023-01-23T13:23Z\"\n    },\n    {\n        name: \"Michael Foster\",\n        email: \"michael.foster@example.com\",\n        role: \"Co-Founder / CTO\",\n        imageUrl: \"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80\",\n        lastSeen: \"3h ago\",\n        lastSeenDateTime: \"2023-01-23T13:23Z\"\n    },\n    {\n        name: \"Dries Vincent\",\n        email: \"dries.vincent@example.com\",\n        role: \"Business Relations\",\n        imageUrl: \"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80\",\n        lastSeen: null\n    },\n    {\n        name: \"Lindsay Walton\",\n        email: \"lindsay.walton@example.com\",\n        role: \"Front-end Developer\",\n        imageUrl: \"https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80\",\n        lastSeen: \"3h ago\",\n        lastSeenDateTime: \"2023-01-23T13:23Z\"\n    },\n    {\n        name: \"Courtney Henry\",\n        email: \"courtney.henry@example.com\",\n        role: \"Designer\",\n        imageUrl: \"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80\",\n        lastSeen: \"3h ago\",\n        lastSeenDateTime: \"2023-01-23T13:23Z\"\n    }\n];\nfunction RecentPlays(param) {\n    let { plays, className } = param;\n    plays.sort((a, b)=>{\n        return b.playDetails.date_completed - a.playDetails.date_completed;\n    });\n    const here_plays = plays.slice(0, 4);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: className,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex flex-row items-center w-[100%] h-[100%] rounded-2xl bg-white/[0.6] text-black p-8\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                    className: \"font-semibold\",\n                    children: \"Recent Plays\"\n                }, void 0, false, {\n                    fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                    lineNumber: 71,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                    className: \"max-w-md divide-y divide-gray-200 dark:divide-gray-700\",\n                    children: here_plays.map((play)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                            className: \"py-3\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex items-center space-x-4\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"flex-1 min-w-0\",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                            className: \"text-sm font-medium text-gray-900 truncate\",\n                                            children: play.algoId\n                                        }, void 0, false, {\n                                            fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                                            lineNumber: 77,\n                                            columnNumber: 37\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                                        lineNumber: 76,\n                                        columnNumber: 33\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"flex flex-row items-center text-amber-500 my-blur transparent-dark rounded-md px-3 py-1 text-sm font-medium\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_GiTrophyCup_react_icons_gi__WEBPACK_IMPORTED_MODULE_1__.GiTrophyCup, {\n                                                className: \"h-4 w-auto \"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                                                lineNumber: 82,\n                                                columnNumber: 37\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                                className: \"m-1\",\n                                                children: Math.floor(Math.random() * 1000) + 1\n                                            }, void 0, false, {\n                                                fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                                                lineNumber: 83,\n                                                columnNumber: 37\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                                        lineNumber: 81,\n                                        columnNumber: 33\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                                lineNumber: 75,\n                                columnNumber: 29\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                            lineNumber: 74,\n                            columnNumber: 25\n                        }, this))\n                }, void 0, false, {\n                    fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                    lineNumber: 72,\n                    columnNumber: 17\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n            lineNumber: 70,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n        lineNumber: 69,\n        columnNumber: 9\n    }, this);\n}\n_c = RecentPlays;\nvar _c;\n$RefreshReg$(_c, \"RecentPlays\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1JlY2VudFBsYXlzLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRzZDO0FBRzdDLE1BQU1DLFNBQVM7SUFDWDtRQUNJQyxNQUFNO1FBQ05DLE9BQU87UUFDUEMsTUFBTTtRQUNOQyxVQUNJO1FBQ0pDLFVBQVU7UUFDVkMsa0JBQWtCO0lBQ3RCO0lBQ0E7UUFDSUwsTUFBTTtRQUNOQyxPQUFPO1FBQ1BDLE1BQU07UUFDTkMsVUFDSTtRQUNKQyxVQUFVO1FBQ1ZDLGtCQUFrQjtJQUN0QjtJQUNBO1FBQ0lMLE1BQU07UUFDTkMsT0FBTztRQUNQQyxNQUFNO1FBQ05DLFVBQ0k7UUFDSkMsVUFBVTtJQUNkO0lBQ0E7UUFDSUosTUFBTTtRQUNOQyxPQUFPO1FBQ1BDLE1BQU07UUFDTkMsVUFDSTtRQUNKQyxVQUFVO1FBQ1ZDLGtCQUFrQjtJQUN0QjtJQUNBO1FBQ0lMLE1BQU07UUFDTkMsT0FBTztRQUNQQyxNQUFNO1FBQ05DLFVBQ0k7UUFDSkMsVUFBVTtRQUNWQyxrQkFBa0I7SUFDdEI7Q0FDSDtBQUVjLFNBQVNDLFlBQVksS0FNbkM7UUFObUMsRUFDaENDLEtBQUssRUFDTEMsU0FBUyxFQUlaLEdBTm1DO0lBUWhDRCxNQUFNRSxJQUFJLENBQUMsQ0FBQ0MsR0FBR0M7UUFDWCxPQUFPQSxFQUFFQyxXQUFXLENBQUNDLGNBQWMsR0FBR0gsRUFBRUUsV0FBVyxDQUFDQyxjQUFjO0lBQ3RFO0lBRUEsTUFBTUMsYUFBYVAsTUFBTVEsS0FBSyxDQUFDLEdBQUc7SUFFbEMscUJBQ0ksOERBQUNDO1FBQUlSLFdBQVdBO2tCQUNaLDRFQUFDUTtZQUFJUixXQUFVOzs4QkFDWCw4REFBQ1M7b0JBQUdULFdBQVU7OEJBQWdCOzs7Ozs7OEJBQzlCLDhEQUFDVTtvQkFBR1YsV0FBVTs4QkFDVE0sV0FBV0ssR0FBRyxDQUFDLENBQUNDLHFCQUNiLDhEQUFDQzs0QkFBR2IsV0FBVTtzQ0FDViw0RUFBQ1E7Z0NBQUlSLFdBQVU7O2tEQUNYLDhEQUFDUTt3Q0FBSVIsV0FBVTtrREFDWCw0RUFBQ2M7NENBQUVkLFdBQVU7c0RBQ1JZLEtBQUtHLE1BQU07Ozs7Ozs7Ozs7O2tEQUdwQiw4REFBQ1A7d0NBQUlSLFdBQVU7OzBEQUNYLDhEQUFDViwwRkFBV0E7Z0RBQUNVLFdBQVU7Ozs7OzswREFDdkIsOERBQUNnQjtnREFBR2hCLFdBQVU7MERBQ1RpQixLQUFLQyxLQUFLLENBQUNELEtBQUtFLE1BQU0sS0FBSyxRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVNUU7S0F4Q3dCckIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvUmVjZW50UGxheXMudHN4PzMwZWIiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnOyAvLyBUaGlzIGlzIGEgY2xpZW50IGNvbXBvbmVudCDwn5GI8J+PvVxuaW1wb3J0IHsgVXNlciB9IGZyb20gJ2ZpcmViYXNlL2F1dGgnO1xuaW1wb3J0IHsgRmFVc2VyIH0gZnJvbSAncmVhY3QtaWNvbnMvZmEnO1xuaW1wb3J0IHsgR2lUcm9waHlDdXAgfSBmcm9tICdyZWFjdC1pY29ucy9naSc7XG5pbXBvcnQgeyBQbGF5IH0gZnJvbSAnQC9hcHAvbW9kZWxzJztcblxuY29uc3QgcGVvcGxlID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogJ0xlc2xpZSBBbGV4YW5kZXInLFxuICAgICAgICBlbWFpbDogJ2xlc2xpZS5hbGV4YW5kZXJAZXhhbXBsZS5jb20nLFxuICAgICAgICByb2xlOiAnQ28tRm91bmRlciAvIENFTycsXG4gICAgICAgIGltYWdlVXJsOlxuICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNDk0NzkwMTA4Mzc3LWJlOWMyOWIyOTMzMD9peGxpYj1yYi0xLjIuMSZpeGlkPWV5SmhjSEJmYVdRaU9qRXlNRGQ5JmF1dG89Zm9ybWF0JmZpdD1mYWNlYXJlYSZmYWNlcGFkPTImdz0yNTYmaD0yNTYmcT04MCcsXG4gICAgICAgIGxhc3RTZWVuOiAnM2ggYWdvJyxcbiAgICAgICAgbGFzdFNlZW5EYXRlVGltZTogJzIwMjMtMDEtMjNUMTM6MjNaJyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ01pY2hhZWwgRm9zdGVyJyxcbiAgICAgICAgZW1haWw6ICdtaWNoYWVsLmZvc3RlckBleGFtcGxlLmNvbScsXG4gICAgICAgIHJvbGU6ICdDby1Gb3VuZGVyIC8gQ1RPJyxcbiAgICAgICAgaW1hZ2VVcmw6XG4gICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTkyNDQ3MDM5OTUtZjRlMGYzMDAwNmQ1P2l4bGliPXJiLTEuMi4xJml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU1EZDkmYXV0bz1mb3JtYXQmZml0PWZhY2VhcmVhJmZhY2VwYWQ9MiZ3PTI1NiZoPTI1NiZxPTgwJyxcbiAgICAgICAgbGFzdFNlZW46ICczaCBhZ28nLFxuICAgICAgICBsYXN0U2VlbkRhdGVUaW1lOiAnMjAyMy0wMS0yM1QxMzoyM1onLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnRHJpZXMgVmluY2VudCcsXG4gICAgICAgIGVtYWlsOiAnZHJpZXMudmluY2VudEBleGFtcGxlLmNvbScsXG4gICAgICAgIHJvbGU6ICdCdXNpbmVzcyBSZWxhdGlvbnMnLFxuICAgICAgICBpbWFnZVVybDpcbiAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUwNjc5NDc3ODIwMi1jYWQ4NGNmNDVmMWQ/aXhsaWI9cmItMS4yLjEmaXhpZD1leUpoY0hCZmFXUWlPakV5TURkOSZhdXRvPWZvcm1hdCZmaXQ9ZmFjZWFyZWEmZmFjZXBhZD0yJnc9MjU2Jmg9MjU2JnE9ODAnLFxuICAgICAgICBsYXN0U2VlbjogbnVsbCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ0xpbmRzYXkgV2FsdG9uJyxcbiAgICAgICAgZW1haWw6ICdsaW5kc2F5LndhbHRvbkBleGFtcGxlLmNvbScsXG4gICAgICAgIHJvbGU6ICdGcm9udC1lbmQgRGV2ZWxvcGVyJyxcbiAgICAgICAgaW1hZ2VVcmw6XG4gICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MTc4NDE5MDUyNDAtNDcyOTg4YmFiZGY5P2l4bGliPXJiLTEuMi4xJml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU1EZDkmYXV0bz1mb3JtYXQmZml0PWZhY2VhcmVhJmZhY2VwYWQ9MiZ3PTI1NiZoPTI1NiZxPTgwJyxcbiAgICAgICAgbGFzdFNlZW46ICczaCBhZ28nLFxuICAgICAgICBsYXN0U2VlbkRhdGVUaW1lOiAnMjAyMy0wMS0yM1QxMzoyM1onLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnQ291cnRuZXkgSGVucnknLFxuICAgICAgICBlbWFpbDogJ2NvdXJ0bmV5LmhlbnJ5QGV4YW1wbGUuY29tJyxcbiAgICAgICAgcm9sZTogJ0Rlc2lnbmVyJyxcbiAgICAgICAgaW1hZ2VVcmw6XG4gICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0Mzg3NjE2ODEwMzMtNjQ2MWZmYWQ4ZDgwP2l4bGliPXJiLTEuMi4xJml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU1EZDkmYXV0bz1mb3JtYXQmZml0PWZhY2VhcmVhJmZhY2VwYWQ9MiZ3PTI1NiZoPTI1NiZxPTgwJyxcbiAgICAgICAgbGFzdFNlZW46ICczaCBhZ28nLFxuICAgICAgICBsYXN0U2VlbkRhdGVUaW1lOiAnMjAyMy0wMS0yM1QxMzoyM1onLFxuICAgIH0sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZWNlbnRQbGF5cyh7XG4gICAgcGxheXMsXG4gICAgY2xhc3NOYW1lLFxufToge1xuICAgIHBsYXlzOiBQbGF5W107XG4gICAgY2xhc3NOYW1lOiBzdHJpbmc7XG59KSB7XG5cbiAgICBwbGF5cy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIHJldHVybiBiLnBsYXlEZXRhaWxzLmRhdGVfY29tcGxldGVkIC0gYS5wbGF5RGV0YWlscy5kYXRlX2NvbXBsZXRlZDtcbiAgICB9KTtcblxuICAgIGNvbnN0IGhlcmVfcGxheXMgPSBwbGF5cy5zbGljZSgwLCA0KTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IGl0ZW1zLWNlbnRlciB3LVsxMDAlXSBoLVsxMDAlXSByb3VuZGVkLTJ4bCBiZy13aGl0ZS9bMC42XSB0ZXh0LWJsYWNrIHAtOFwiPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkXCI+UmVjZW50IFBsYXlzPC9oMj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibWF4LXctbWQgZGl2aWRlLXkgZGl2aWRlLWdyYXktMjAwIGRhcms6ZGl2aWRlLWdyYXktNzAwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtoZXJlX3BsYXlzLm1hcCgocGxheSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInB5LTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBtaW4tdy0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgdHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGxheS5hbGdvSWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1yb3cgaXRlbXMtY2VudGVyIHRleHQtYW1iZXItNTAwIG15LWJsdXIgdHJhbnNwYXJlbnQtZGFyayByb3VuZGVkLW1kIHB4LTMgcHktMSB0ZXh0LXNtIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8R2lUcm9waHlDdXAgY2xhc3NOYW1lPVwiaC00IHctYXV0byBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cIm0tMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwKSArIDF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cbiJdLCJuYW1lcyI6WyJHaVRyb3BoeUN1cCIsInBlb3BsZSIsIm5hbWUiLCJlbWFpbCIsInJvbGUiLCJpbWFnZVVybCIsImxhc3RTZWVuIiwibGFzdFNlZW5EYXRlVGltZSIsIlJlY2VudFBsYXlzIiwicGxheXMiLCJjbGFzc05hbWUiLCJzb3J0IiwiYSIsImIiLCJwbGF5RGV0YWlscyIsImRhdGVfY29tcGxldGVkIiwiaGVyZV9wbGF5cyIsInNsaWNlIiwiZGl2IiwiaDIiLCJ1bCIsIm1hcCIsInBsYXkiLCJsaSIsInAiLCJhbGdvSWQiLCJoMyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/RecentPlays.tsx\n"));

/***/ })

});