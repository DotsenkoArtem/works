"use strict";

// PAGE PRELOADER
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
window.addEventListener("load", removePreloader);
function removePreloader() {
  var PRELOADERTRANSITION = 1000;
  preloader.style.transition = "opacity ".concat(PRELOADERTRANSITION, "ms");
  preloader.classList.add("fade-out");
  setTimeout(function () {
    preloader.remove();
  }, PRELOADERTRANSITION);
}
// - - - - - - - - - - - - - - - - - - -

var menuToggle = document.querySelector(".js-navbar-mobile-trigger");
var menu = document.querySelector(".js-navbar-mobile");
// const menuOverl = document.querySelector(".js-overl");

document.addEventListener("DOMContentLoaded", function () {
  navBarHandle(menuToggle, menu);
});

// Открытие-закрытие мобильного навбара
function navBarHandle(menuToggle, menu) {
  var items = menu.querySelectorAll(".js-menu-item");
  var isDelay;
  function menuItemsAddDelay(menu) {
    var delay = 0.2;
    var _iterator = _createForOfIteratorHelper(items),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        delay += 0.05;
        item.style.transitionDelay = "".concat(delay, "s");
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    isDelay = true;
  }
  function menuItemsRemoveDelay(menu) {
    var _iterator2 = _createForOfIteratorHelper(items),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var item = _step2.value;
        item.style.transitionDelay = "";
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    isDelay = false;
  }
  menuToggle.addEventListener("click", function () {
    isDelay ? menuItemsRemoveDelay(menu) : menuItemsAddDelay(menu);
    menuToggle.classList.toggle("open");
    menu.classList.toggle("open");
    document.body.classList.toggle("scroll-hidden");
  });

  // menuOverl.addEventListener("click", menuClose);

  function menuClose() {
    menuItemsRemoveDelay(menu);
    menuToggle.classList.remove("open");
    menu.classList.remove("open");
    document.body.classList.remove("scroll-hidden");
  }
}

// Получение массива кнопок открытия
var modalOpenBtns = document.querySelectorAll(".js-modal-trigger");
if (modalOpenBtns) {
  var _loop = function _loop() {
    var modalOpenBtn = modalOpenBtns[i];
    modalOpenBtn.addEventListener("click", function () {
      openModal(modalOpenBtn);
    });
  };
  for (var i = 0; i < modalOpenBtns.length; i++) {
    _loop();
  }
}

// Functions
function openModal(modalOpenBtn) {
  var modal = document.getElementById(modalOpenBtn.dataset.target);
  modal.classList.remove("closed");
  modal.classList.add("opened");
  var modalCloseBtns = modal.getElementsByClassName("js-modal-close");
  for (var _i = 0; _i < modalCloseBtns.length; _i++) {
    var modalCloseBtn = modalCloseBtns[_i];
    modalCloseBtn.addEventListener("click", function () {
      closeModal(modal);
    });
  }
}
function closeModal(modal) {
  modal.classList.remove("opened");
  modal.classList.add("closed");
}
var sounds = {
  success: 'audio/success.mp3',
  error: 'audio/error-1.mp3'
};
var soundSuccess = new Sound(sounds.success);
var soundError = new Sound(sounds.error);
var alertSound = soundSuccess;
function Sound(src) {
  var audio = document.createElement('audio');
  audio.src = src;
  this.play = function () {
    audio.play();
  };
}

// Массив всех форм
var forms = document.forms;
var _loop2 = function _loop2() {
  var form = forms[_i2];
  form.addEventListener('submit', function (event) {
    send(event, 'php/mail.php');
  });
  function send(event, php) {
    // Установка лоадера на кнопку submit
    setupLoader(form);

    // console.log("Отправка запроса!!!");

    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var req = new XMLHttpRequest();
    req.open("POST", php, true);
    req.onload = function () {
      // Определение переменных для оповещения
      var thanks = document.createElement("div");
      var thanksContent = document.createElement("div");
      var thanksClose = document.createElement("div");
      var messageSuccessful = "<h3><span>Спасибо</span>Мы перезвоним Вам в ближайшее время!</h3>";
      var limitExceeded = "<h3><span>Ошибка.</span>Превышен максимальный размер прикрепляемых файлов (10мб).</h3>";
      var messageError = "<h3><span>Ошибка</span>Сообщение не отправлено</h3>";

      // Установка окна оповещения
      setupThanks();
      function setupThanks() {
        thanks.className = "thanks";
        thanksContent.className = "thanks__content";
        thanksClose.className = "thanks__close";
        thanks.append(thanksContent, thanksClose);
        wrapper.append(thanks);
        // Закрытие окна оповещения
        thanksClose.onclick = function () {
          removeThanks();
        };
      }

      // Удаление лоадера с кнопки submit
      removeLoader(form);
      if (req.status >= 200 && req.status < 400) {
        // console.log("req.status: ", req.status);
        // console.log("this: ", this);
        // console.log("this.response: ", this.response);
        var json = JSON.parse(this.response); // Ебанный internet explorer 11
        // console.log(json);
        // console.log(json.status);

        // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
        if (json.result == "success") {
          // Текстовое содержимое для окна оповещения в зависимости от результата
          thanksContent.innerHTML = messageSuccessful;
          thanks.classList.remove("thanks_error");
          thanks.classList.add("thanks_success");
          alertSound = soundSuccess;
          // Если сообщение отправлено
        } else if (json.result == "limitExceeded") {
          // Текстовое содержимое для окна оповещения в зависимости от результата
          thanksContent.innerHTML = limitExceeded;
          thanks.classList.remove("thanks_success");
          thanks.classList.add("thanks_error");
          alertSound = soundError;
          console.log(json.status);
        } else {
          // Текстовое содержимое для окна оповещения в зависимости от результата
          thanksContent.innerHTML = messageError;
          alertSound = soundError;
          thanks.classList.remove("thanks_success");
          thanks.classList.add("thanks_error");
          console.log(json.status);
        }
        // Если не удалось связаться с php файлом
      } else {
        alert("Ошибка сервера. Номер: " + req.status);
      }

      // Вывод окна оповещения на страницу
      thanks.classList.add("active");
      //!!!!!!!!!!!!!!!!!!!!!!!!!!
      soundPlay(alertSound);
      function soundPlay(sound) {
        sound.play();
      }
      //!!!!!!!!!!!!!!!!!!!!!!!!!!

      // Включаю поля формы после отправки данных
      for (var _i3 = 0; _i3 < form.elements.length; _i3++) {
        form.elements[_i3].disabled = false;
      }

      // Автоматическое удаление окна оповещения
      setTimeout(function () {
        removeThanks();
      }, 5000);

      // Удаление окна оповещения
      function removeThanks() {
        thanks.classList.remove("active");
        thanks.style.animation = "slideOutRightBottom .5s ease forwards";
        setTimeout(function () {
          thanks.remove();
        }, 500);

        // console.log("Выполнено: removeThanks()");
        // console.log(`А это thanks: ${thanks}`);
      }
    };

    // Если не удалось отправить запрос. Стоит блок на хостинге
    req.onerror = function () {
      alert("Ошибка отправки запроса");
    };
    req.send(new FormData(event.target));
  }
};
for (var _i2 = 0; _i2 < forms.length; _i2++) {
  _loop2();
}

// Функции установки, удаления лоадера кнопки формы
function setupLoader(form) {
  var loader = document.createElement("div");
  loader.className = "submit-loader";
  form.appendChild(loader);
}
function removeLoader(form) {
  var loader = form.querySelector(".submit-loader");
  loader.remove();
}