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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ RecentPlays; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _barrel_optimize_names_GiTrophyCup_react_icons_gi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! __barrel_optimize__?names=GiTrophyCup!=!react-icons/gi */ \"(app-pages-browser)/./node_modules/react-icons/gi/index.esm.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\nconst people = [\n    {\n        name: \"Leslie Alexander\",\n        email: \"leslie.alexander@example.com\",\n        role: \"Co-Founder / CEO\",\n        imageUrl: \"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80\",\n        lastSeen: \"3h ago\",\n        lastSeenDateTime: \"2023-01-23T13:23Z\"\n    },\n    {\n        name: \"Michael Foster\",\n        email: \"michael.foster@example.com\",\n        role: \"Co-Founder / CTO\",\n        imageUrl: \"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80\",\n        lastSeen: \"3h ago\",\n        lastSeenDateTime: \"2023-01-23T13:23Z\"\n    },\n    {\n        name: \"Dries Vincent\",\n        email: \"dries.vincent@example.com\",\n        role: \"Business Relations\",\n        imageUrl: \"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80\",\n        lastSeen: null\n    },\n    {\n        name: \"Lindsay Walton\",\n        email: \"lindsay.walton@example.com\",\n        role: \"Front-end Developer\",\n        imageUrl: \"https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80\",\n        lastSeen: \"3h ago\",\n        lastSeenDateTime: \"2023-01-23T13:23Z\"\n    },\n    {\n        name: \"Courtney Henry\",\n        email: \"courtney.henry@example.com\",\n        role: \"Designer\",\n        imageUrl: \"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80\",\n        lastSeen: \"3h ago\",\n        lastSeenDateTime: \"2023-01-23T13:23Z\"\n    }\n];\nfunction RecentPlays(param) {\n    let { plays, className } = param;\n    plays.sort((a, b)=>{\n        return b.playDetails.date_completed - a.playDetails.date_completed;\n    });\n    const here_plays = plays.slice(0, 4);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: className,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex flex-row items-center w-[100%] h-[100%] rounded-2xl bg-white/[0.6] text-black p-8\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                    className: \"font-semibold\",\n                    children: \"Recent Plays\"\n                }, void 0, false, {\n                    fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                    lineNumber: 71,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                    className: \"max-w-md divide-y divide-gray-200 dark:divide-gray-700\",\n                    children: here_plays.map((play)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                            className: \"py-3\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex items-center space-x-4\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"flex-1 min-w-0\",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                            className: \"text-sm font-medium text-gray-900 truncate\",\n                                            children: person.name\n                                        }, void 0, false, {\n                                            fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                                            lineNumber: 77,\n                                            columnNumber: 37\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                                        lineNumber: 76,\n                                        columnNumber: 33\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"flex flex-row items-center text-amber-500 my-blur transparent-dark rounded-md px-3 py-1 text-sm font-medium\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_GiTrophyCup_react_icons_gi__WEBPACK_IMPORTED_MODULE_1__.GiTrophyCup, {\n                                                className: \"h-4 w-auto \"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                                                lineNumber: 82,\n                                                columnNumber: 37\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                                className: \"m-1\",\n                                                children: Math.floor(Math.random() * 1000) + 1\n                                            }, void 0, false, {\n                                                fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                                                lineNumber: 83,\n                                                columnNumber: 37\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                                        lineNumber: 81,\n                                        columnNumber: 33\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                                lineNumber: 75,\n                                columnNumber: 29\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                            lineNumber: 74,\n                            columnNumber: 25\n                        }, this))\n                }, void 0, false, {\n                    fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n                    lineNumber: 72,\n                    columnNumber: 17\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n            lineNumber: 70,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/arundeegutla/Library/CloudStorage/OneDrive-UniversityofCentralFlorida/Third-Year/Fall/knight-hacks-2023/front-end/src/components/RecentPlays.tsx\",\n        lineNumber: 69,\n        columnNumber: 9\n    }, this);\n}\n_c = RecentPlays;\nvar _c;\n$RefreshReg$(_c, \"RecentPlays\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1JlY2VudFBsYXlzLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRzZDO0FBRzdDLE1BQU1DLFNBQVM7SUFDWDtRQUNJQyxNQUFNO1FBQ05DLE9BQU87UUFDUEMsTUFBTTtRQUNOQyxVQUNJO1FBQ0pDLFVBQVU7UUFDVkMsa0JBQWtCO0lBQ3RCO0lBQ0E7UUFDSUwsTUFBTTtRQUNOQyxPQUFPO1FBQ1BDLE1BQU07UUFDTkMsVUFDSTtRQUNKQyxVQUFVO1FBQ1ZDLGtCQUFrQjtJQUN0QjtJQUNBO1FBQ0lMLE1BQU07UUFDTkMsT0FBTztRQUNQQyxNQUFNO1FBQ05DLFVBQ0k7UUFDSkMsVUFBVTtJQUNkO0lBQ0E7UUFDSUosTUFBTTtRQUNOQyxPQUFPO1FBQ1BDLE1BQU07UUFDTkMsVUFDSTtRQUNKQyxVQUFVO1FBQ1ZDLGtCQUFrQjtJQUN0QjtJQUNBO1FBQ0lMLE1BQU07UUFDTkMsT0FBTztRQUNQQyxNQUFNO1FBQ05DLFVBQ0k7UUFDSkMsVUFBVTtRQUNWQyxrQkFBa0I7SUFDdEI7Q0FDSDtBQUVjLFNBQVNDLFlBQVksS0FNbkM7UUFObUMsRUFDaENDLEtBQUssRUFDTEMsU0FBUyxFQUlaLEdBTm1DO0lBUWhDRCxNQUFNRSxJQUFJLENBQUMsQ0FBQ0MsR0FBR0M7UUFDWCxPQUFPQSxFQUFFQyxXQUFXLENBQUNDLGNBQWMsR0FBR0gsRUFBRUUsV0FBVyxDQUFDQyxjQUFjO0lBQ3RFO0lBRUEsTUFBTUMsYUFBYVAsTUFBTVEsS0FBSyxDQUFDLEdBQUc7SUFFbEMscUJBQ0ksOERBQUNDO1FBQUlSLFdBQVdBO2tCQUNaLDRFQUFDUTtZQUFJUixXQUFVOzs4QkFDWCw4REFBQ1M7b0JBQUdULFdBQVU7OEJBQWdCOzs7Ozs7OEJBQzlCLDhEQUFDVTtvQkFBR1YsV0FBVTs4QkFDVE0sV0FBV0ssR0FBRyxDQUFDLENBQUNDLHFCQUNiLDhEQUFDQzs0QkFBR2IsV0FBVTtzQ0FDViw0RUFBQ1E7Z0NBQUlSLFdBQVU7O2tEQUNYLDhEQUFDUTt3Q0FBSVIsV0FBVTtrREFDWCw0RUFBQ2M7NENBQUVkLFdBQVU7c0RBQ1JlLE9BQU92QixJQUFJOzs7Ozs7Ozs7OztrREFHcEIsOERBQUNnQjt3Q0FBSVIsV0FBVTs7MERBQ1gsOERBQUNWLDBGQUFXQTtnREFBQ1UsV0FBVTs7Ozs7OzBEQUN2Qiw4REFBQ2dCO2dEQUFHaEIsV0FBVTswREFDVGlCLEtBQUtDLEtBQUssQ0FBQ0QsS0FBS0UsTUFBTSxLQUFLLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVU1RTtLQXhDd0JyQiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9SZWNlbnRQbGF5cy50c3g/MzBlYiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7IC8vIFRoaXMgaXMgYSBjbGllbnQgY29tcG9uZW50IPCfkYjwn4+9XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnZmlyZWJhc2UvYXV0aCc7XG5pbXBvcnQgeyBGYVVzZXIgfSBmcm9tICdyZWFjdC1pY29ucy9mYSc7XG5pbXBvcnQgeyBHaVRyb3BoeUN1cCB9IGZyb20gJ3JlYWN0LWljb25zL2dpJztcbmltcG9ydCB7IFBsYXkgfSBmcm9tICdAL2FwcC9tb2RlbHMnO1xuXG5jb25zdCBwZW9wbGUgPSBbXG4gICAge1xuICAgICAgICBuYW1lOiAnTGVzbGllIEFsZXhhbmRlcicsXG4gICAgICAgIGVtYWlsOiAnbGVzbGllLmFsZXhhbmRlckBleGFtcGxlLmNvbScsXG4gICAgICAgIHJvbGU6ICdDby1Gb3VuZGVyIC8gQ0VPJyxcbiAgICAgICAgaW1hZ2VVcmw6XG4gICAgICAgICAgICAnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE0OTQ3OTAxMDgzNzctYmU5YzI5YjI5MzMwP2l4bGliPXJiLTEuMi4xJml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU1EZDkmYXV0bz1mb3JtYXQmZml0PWZhY2VhcmVhJmZhY2VwYWQ9MiZ3PTI1NiZoPTI1NiZxPTgwJyxcbiAgICAgICAgbGFzdFNlZW46ICczaCBhZ28nLFxuICAgICAgICBsYXN0U2VlbkRhdGVUaW1lOiAnMjAyMy0wMS0yM1QxMzoyM1onLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnTWljaGFlbCBGb3N0ZXInLFxuICAgICAgICBlbWFpbDogJ21pY2hhZWwuZm9zdGVyQGV4YW1wbGUuY29tJyxcbiAgICAgICAgcm9sZTogJ0NvLUZvdW5kZXIgLyBDVE8nLFxuICAgICAgICBpbWFnZVVybDpcbiAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxOTI0NDcwMzk5NS1mNGUwZjMwMDA2ZDU/aXhsaWI9cmItMS4yLjEmaXhpZD1leUpoY0hCZmFXUWlPakV5TURkOSZhdXRvPWZvcm1hdCZmaXQ9ZmFjZWFyZWEmZmFjZXBhZD0yJnc9MjU2Jmg9MjU2JnE9ODAnLFxuICAgICAgICBsYXN0U2VlbjogJzNoIGFnbycsXG4gICAgICAgIGxhc3RTZWVuRGF0ZVRpbWU6ICcyMDIzLTAxLTIzVDEzOjIzWicsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdEcmllcyBWaW5jZW50JyxcbiAgICAgICAgZW1haWw6ICdkcmllcy52aW5jZW50QGV4YW1wbGUuY29tJyxcbiAgICAgICAgcm9sZTogJ0J1c2luZXNzIFJlbGF0aW9ucycsXG4gICAgICAgIGltYWdlVXJsOlxuICAgICAgICAgICAgJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTA2Nzk0Nzc4MjAyLWNhZDg0Y2Y0NWYxZD9peGxpYj1yYi0xLjIuMSZpeGlkPWV5SmhjSEJmYVdRaU9qRXlNRGQ5JmF1dG89Zm9ybWF0JmZpdD1mYWNlYXJlYSZmYWNlcGFkPTImdz0yNTYmaD0yNTYmcT04MCcsXG4gICAgICAgIGxhc3RTZWVuOiBudWxsLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnTGluZHNheSBXYWx0b24nLFxuICAgICAgICBlbWFpbDogJ2xpbmRzYXkud2FsdG9uQGV4YW1wbGUuY29tJyxcbiAgICAgICAgcm9sZTogJ0Zyb250LWVuZCBEZXZlbG9wZXInLFxuICAgICAgICBpbWFnZVVybDpcbiAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUxNzg0MTkwNTI0MC00NzI5ODhiYWJkZjk/aXhsaWI9cmItMS4yLjEmaXhpZD1leUpoY0hCZmFXUWlPakV5TURkOSZhdXRvPWZvcm1hdCZmaXQ9ZmFjZWFyZWEmZmFjZXBhZD0yJnc9MjU2Jmg9MjU2JnE9ODAnLFxuICAgICAgICBsYXN0U2VlbjogJzNoIGFnbycsXG4gICAgICAgIGxhc3RTZWVuRGF0ZVRpbWU6ICcyMDIzLTAxLTIzVDEzOjIzWicsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdDb3VydG5leSBIZW5yeScsXG4gICAgICAgIGVtYWlsOiAnY291cnRuZXkuaGVucnlAZXhhbXBsZS5jb20nLFxuICAgICAgICByb2xlOiAnRGVzaWduZXInLFxuICAgICAgICBpbWFnZVVybDpcbiAgICAgICAgICAgICdodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTQzODc2MTY4MTAzMy02NDYxZmZhZDhkODA/aXhsaWI9cmItMS4yLjEmaXhpZD1leUpoY0hCZmFXUWlPakV5TURkOSZhdXRvPWZvcm1hdCZmaXQ9ZmFjZWFyZWEmZmFjZXBhZD0yJnc9MjU2Jmg9MjU2JnE9ODAnLFxuICAgICAgICBsYXN0U2VlbjogJzNoIGFnbycsXG4gICAgICAgIGxhc3RTZWVuRGF0ZVRpbWU6ICcyMDIzLTAxLTIzVDEzOjIzWicsXG4gICAgfSxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJlY2VudFBsYXlzKHtcbiAgICBwbGF5cyxcbiAgICBjbGFzc05hbWUsXG59OiB7XG4gICAgcGxheXM6IFBsYXlbXTtcbiAgICBjbGFzc05hbWU6IHN0cmluZztcbn0pIHtcblxuICAgIHBsYXlzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgcmV0dXJuIGIucGxheURldGFpbHMuZGF0ZV9jb21wbGV0ZWQgLSBhLnBsYXlEZXRhaWxzLmRhdGVfY29tcGxldGVkO1xuICAgIH0pO1xuXG4gICAgY29uc3QgaGVyZV9wbGF5cyA9IHBsYXlzLnNsaWNlKDAsIDQpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1yb3cgaXRlbXMtY2VudGVyIHctWzEwMCVdIGgtWzEwMCVdIHJvdW5kZWQtMnhsIGJnLXdoaXRlL1swLjZdIHRleHQtYmxhY2sgcC04XCI+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGRcIj5SZWNlbnQgUGxheXM8L2gyPlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJtYXgtdy1tZCBkaXZpZGUteSBkaXZpZGUtZ3JheS0yMDAgZGFyazpkaXZpZGUtZ3JheS03MDBcIj5cbiAgICAgICAgICAgICAgICAgICAge2hlcmVfcGxheXMubWFwKChwbGF5KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwicHktM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCB0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwZXJzb24ubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXJvdyBpdGVtcy1jZW50ZXIgdGV4dC1hbWJlci01MDAgbXktYmx1ciB0cmFuc3BhcmVudC1kYXJrIHJvdW5kZWQtbWQgcHgtMyBweS0xIHRleHQtc20gZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxHaVRyb3BoeUN1cCBjbGFzc05hbWU9XCJoLTQgdy1hdXRvIFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwibS0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDApICsgMX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuIl0sIm5hbWVzIjpbIkdpVHJvcGh5Q3VwIiwicGVvcGxlIiwibmFtZSIsImVtYWlsIiwicm9sZSIsImltYWdlVXJsIiwibGFzdFNlZW4iLCJsYXN0U2VlbkRhdGVUaW1lIiwiUmVjZW50UGxheXMiLCJwbGF5cyIsImNsYXNzTmFtZSIsInNvcnQiLCJhIiwiYiIsInBsYXlEZXRhaWxzIiwiZGF0ZV9jb21wbGV0ZWQiLCJoZXJlX3BsYXlzIiwic2xpY2UiLCJkaXYiLCJoMiIsInVsIiwibWFwIiwicGxheSIsImxpIiwicCIsInBlcnNvbiIsImgzIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/RecentPlays.tsx\n"));

/***/ })

});