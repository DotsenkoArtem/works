"use strict";

// const images = document.querySelectorAll('.lazy');
// for (let image of images) {

// 	let img = document.createElement('img');
// 	img.src = image.dataset.src;
// 	img.addEventListener('load', ()=>{
// 		image.src = img.src;
// 		image.classList.remove('lazy');
//     delete image.dataset.src

//     // Или так
//     // image.removeAttribute('data-src');
// 		// image.parentElement.classList.add('loaded');
//     // console.dir(image);

// 	})
// }

// PAGE PRELOADER FUNCTION
// добавить #preloader.preloader в html
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
window.addEventListener("load", function () {
  preloaderInit(350);
  handleModals();
});
function preloaderInit(transition) {
  preloader.style.transition = "opacity ".concat(transition, "ms");
  preloader.classList.add("fade-out");
  setTimeout(function () {
    preloader.remove();
  }, transition);
}
function handleModals() {
  var modalBtns = document.querySelectorAll(".js-modal-trigger");
  modalBtns.forEach(function (modalBtn) {
    // Продолжительность анимации
    var duration;
    var modal = document.querySelector("#".concat(modalBtn.dataset.target));
    var modalClose = modal.querySelector(".modal__close");
    var modalBackdrop = document.createElement("div");
    modalBackdrop.className = "modal-backdrop";
    modalBtn.addEventListener("click", openModal);
    modalBackdrop.addEventListener("click", function () {
      closeModal(modal, duration);
    });
    modalClose.addEventListener("click", function () {
      closeModal(modal, duration);
    });

    // Open-close functions
    function openModal() {
      // Если в дата-атрибуте значение указано равным 0, то продолжительность анимации 0.
      modalBtn.dataset.duration === "0" ? duration = 0 :
      // В остальных случаях, если указано целочисленное значение, то берем его, если нет, то 350 по умолчанию.
      duration = +modalBtn.dataset.duration || 350; // В
      modal.style.transition = "".concat(duration, "ms ease-out");
      modal.style.display = "flex";
      // Таймаут для того, чтобы отрабатывала анимация
      setTimeout(function () {
        modal.classList.add("shown");
      }, 0);
      modal.append(modalBackdrop);
    }
    function closeModal() {
      modal.classList.remove("shown");
      setTimeout(function () {
        modal.style = "";
        modalBackdrop.remove();
      }, duration);
    }
  });
}

// - - - - - - - - - - - - - - - - - - -

// let map;

// main();
// async function main() {
//   // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты API
//   await ymaps3.ready;

//   // Создание карты
//   map = new ymaps3.YMap(document.getElementById("map"), {
//     location: {
//       // Координаты центра карты
//       // Порядок по умолчанию: «долгота, широта»
//       center: [30.251826, 59.945463],

//       // Уровень масштабирования
//       // Допустимые значения: от 0 (весь мир) до 21.
//       zoom: 18,
//     },
//   });

//   // Добавляем слой для отображения схематической карты
//   map.addChild(new ymaps3.YMapDefaultSchemeLayer());

// /*   map.addChild(
//     new ymaps3.YMapFeatureDataSource({
//       id: "featureSource",
//     })
//   );
//   map.addChild(
//     new ymaps3.YMapLayer({
//       source: "featureSource",
//       type: "features",
//       zIndex: 2010,
//     })
//   );
//   const polygonFeature = new ymaps3.YMapFeature({
//     id: "polygon",
//     source: "featureSource",
//     geometry: {
//       type: "Polygon",
//       coordinates: [
//         [
//           [30.251826, 59.945463],
//           [30.271826, 59.945463],
//           [30.271826, 59.935463],
//           [30.251826, 59.935463],
//           [30.251826, 59.945463],
//         ],
//       ],
//     },
//     style: {
//       stroke: [{ width: 6, color: "rgb(14, 194, 219)" }],
//       fill: "rgba(56, 56, 219, 0.5)",
//     },
//   }); */
//   // map.addChild(polygonFeature);

//   map.addChild(
//     new ymaps3.YMapFeatureDataSource({
//       id: "markerSource",
//     })
//   );

//   map.addChild(
//     new ymaps3.YMapLayer({
//       source: "markerSource",
//       type: "features",
//       zIndex: 2010,
//     })
//   );

//   const markerElement = document.createElement("div");
//   markerElement.className = "marker-class";
//   markerElement.innerText = "I'm marker!";

//   const marker12 = new ymaps3.YMapMarker(
//     {
//       source: "markerSource",
//       coordinates: [30.251826, 59.945463],
//       draggable: true,
//       mapFollowsOnDrag: true,
//     },
//     markerElement
//   );

//   map.addChild(marker12);

//   console.log(marker12);
// }

// new WOW({
// 	offset:       300,
// }).init();

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++==

initMap();
function initMap() {
  return _initMap.apply(this, arguments);
} // M E N U   M O B I L E
function _initMap() {
  _initMap = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var _ymaps, YMap, YMapDefaultSchemeLayer, map;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return ymaps3.ready;
        case 2:
          _ymaps = ymaps3, YMap = _ymaps.YMap, YMapDefaultSchemeLayer = _ymaps.YMapDefaultSchemeLayer; // Иницилиазируем карту
          map = new YMap(
          // Передаём ссылку на HTMLElement контейнера
          document.getElementById('map'),
          // Передаём параметры инициализации карты
          {
            location: {
              // Координаты центра карты
              center: [30.251826, 59.945463],
              // Уровень масштабирования
              zoom: 17
            }
          }); // Добавляем слой для отображения схематической карты
          map.addChild(new YMapDefaultSchemeLayer());
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _initMap.apply(this, arguments);
}
var menuTrigger = document.querySelector(".js-menu-mobile-trigger");
var menu = document.querySelector(".js-menu-mobile");
var menuOverl = document.querySelector(".js-menu-mobile-overl");
var menuCloseBtn = document.querySelector(".js-menu-mobile-close");
document.addEventListener("DOMContentLoaded", function () {
  navBarHandle(menuTrigger, menu);
});

// Открытие-закрытие мобильного навбара
function navBarHandle(menuTrigger, menu) {
  // const items = menu.querySelectorAll(".js-menu-item");

  // let isDelay;

  // function menuItemsAddDelay(menu) {
  //   let delay = 0.2;
  //   for (let item of items) {
  //     delay += 0.05;
  //     item.style.transitionDelay = `${delay}s`;
  //   }
  //   isDelay = true;
  // }

  // function menuItemsRemoveDelay(menu) {
  //   for (let item of items) {
  //     item.style.transitionDelay = ``;
  //   }
  //   isDelay = false;
  // }

  menuTrigger.addEventListener("click", function () {
    // isDelay ? menuItemsRemoveDelay(menu) : menuItemsAddDelay(menu);
    // menuTrigger.classList.toggle("open");
    menu.classList.add("open");
    menuOverl.classList.add("open");
    document.body.classList.add("scroll-hidden");
  });
  menuCloseBtn.addEventListener("click", menuClose);
  menuOverl.addEventListener("click", menuClose);
  function menuClose() {
    // menuItemsRemoveDelay(menu);
    // menuTrigger.classList.remove("open");
    menu.classList.remove("open");
    menuOverl.classList.remove("open");
    document.body.classList.remove("scroll-hidden");
  }
}