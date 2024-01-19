/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _slide_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slide.js */ \"./js/slide.js\");\n\r\n\r\nconst slide = new _slide_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\".slide\", \".wrapper\");\r\nslide.init();\r\nslide.changeSlide(3);\r\n\n\n//# sourceURL=webpack://projeto-slide/./js/script.js?");

/***/ }),

/***/ "./js/slide.js":
/*!*********************!*\
  !*** ./js/slide.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Slide)\n/* harmony export */ });\nclass Slide {\r\n  constructor(slide, wrapper) {\r\n    this.slide = document.querySelector(slide);\r\n    this.wrapper = document.querySelector(wrapper);\r\n    if (!this.wrapper || !this.slide) {\r\n      console.error(\"Wrapper or slide not found.\");\r\n      return;\r\n    }\r\n    // Este objeto vai ser geral, vai ter referencia dos números, na onde esta o slide, quando foi movido o mouse, finalPosition = posição final, startX = pegando referencia inicial onde foi executado o click ,movement= o total que se moveu\r\n    this.dist = { finalPosition: 0, startX: 0, movement: 0 };\r\n  }\r\n  //atualzar o movement\r\n  updatePosition(clientX) {\r\n    this.dist.movement = (this.dist.startX - clientX) * 1.5;\r\n    return this.dist.finalPosition - this.dist.movement;\r\n  }\r\n  moveSlide(distX) {\r\n    this.dist.movePosition = distX;\r\n    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;\r\n  }\r\n  //o evento que começe\r\n  onStart(event) {\r\n    let movetype;\r\n    if (event.type === \"mousedown\") {\r\n      event.preventDefault(); //evitar que não ocorra a puxar a imagem\r\n      this.dist.startX = event.clientX;\r\n      console.log(event);\r\n      movetype = \"mousemove\";\r\n    } else {\r\n      this.dist.startX = event.changedTouches[0].clientX;\r\n      console.log(event);\r\n      movetype = \"touchmove\";\r\n    }\r\n    // console.log(\"Mousedown\");\r\n    // o mousemouve sera excutado quando somento houver click e executará o callback de onMove\r\n\r\n    this.wrapper.addEventListener(movetype, this.onMove);\r\n  }\r\n  onMove(event) {\r\n    // console.log(\"moveu\");\r\n\r\n    const pointerPosition =\r\n      event.type === \"mousemove\"\r\n        ? event.clientX\r\n        : event.changedTouches[0].clientX;\r\n    const finalPosition = this.updatePosition(pointerPosition);\r\n    this.moveSlide(finalPosition);\r\n  }\r\n  //adicionamdo os evento ao clicar e mouver\r\n  addSlideEvent() {\r\n    this.wrapper.addEventListener(\"mousedown\", this.onStart);\r\n    this.wrapper.addEventListener(\"touchstart\", this.onStart);\r\n    this.wrapper.addEventListener(\"mouseup\", this.onEnd);\r\n    this.wrapper.addEventListener(\"touchend\", this.onEnd);\r\n  }\r\n  // remove o mouse move ao desclicar o evento\r\n  onEnd(event) {\r\n    // console.log(\"acabou\");\r\n    const movetype = event.type === \"mouseup\" ? \"mousemove\" : \"touchmove\";\r\n\r\n    this.wrapper.removeEventListener(movetype, this.onMove);\r\n    this.dist.finalPosition = this.dist.movePosition;\r\n  }\r\n  // colocando todos callback no bind em forma de paramentro\r\n  bindEvent() {\r\n    this.onStart = this.onStart.bind(this);\r\n    this.onMove = this.onMove.bind(this);\r\n    this.onEnd = this.onEnd.bind(this);\r\n    this.updatePosition = this.updatePosition.bind(this);\r\n  }\r\n  // slides-config\r\n\r\n  // configuração para deixa a imagem no centra do site\r\n  slidePosition(slide) {\r\n    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;\r\n    return -(slide.offsetLeft - margin);\r\n  }\r\n  //  transformando o slide em array para pode falar com cada elemento\r\n  slidesConfig() {\r\n    this.slideArray = [...this.slide.children].map((element) => {\r\n      const position = this.slidePosition(element);\r\n      return { position, element };\r\n    });\r\n  }\r\n  // index da navegação dos slides\r\n  slidesIndexNav(index) {\r\n    const last = this.slideArray.length - 1;\r\n\r\n    this.index = {\r\n      preve: index ? index - 1 : undefined,\r\n      active: index,\r\n      next: index === last ? undefined : index + 1,\r\n    };\r\n  }\r\n  // um metoda que muda o slide com passar do index\r\n  changeSlide(index) {\r\n    const activeSlide = this.slideArray[index];\r\n    this.moveSlide(this.slideArray[index].position);\r\n    this.slidesIndexNav(index);\r\n    this.dist.finalPosition = activeSlide.position;\r\n  }\r\n  // iniciar os eventos\r\n  init() {\r\n    this.bindEvent();\r\n    this.addSlideEvent();\r\n    this.slidesConfig();\r\n    this.slidePosition(this.slide);\r\n    return this;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://projeto-slide/./js/slide.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/script.js");
/******/ 	
/******/ })()
;