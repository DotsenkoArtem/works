"use strict";

window.addEventListener("load", function () {
  setPreloader();
  modalsHandle();
  setTimer(0, 1, 11);

  // INPUT MASK
  var selector = document.querySelector('[name="userPhone"]');
  var im = new Inputmask("+7 (\\999) 999-99-99");
  im.mask(selector);
  // - - - - - - - - - - - - - - - - - - -
});

// PAGE PRELOADER FUNCTION
// добавить #preloader.preloader в html
function setPreloader() {
  var PRELOADERTRANSITION = 350;
  preloader.style.transition = "opacity ".concat(PRELOADERTRANSITION, "ms");
  preloader.classList.add("fade-out");
  setTimeout(function () {
    preloader.remove();
  }, PRELOADERTRANSITION);
}
// - - - - - - - - - - - - - - - - - - -

// MODALS
function modalsHandle() {
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
}
// - - - - - - - - - - - - - - - - - - -

// TIMER
function setTimer() {
  var startHours = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 11;
  var startMinutes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 11;
  var startSeconds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 11;
  // Высчитали время таймера
  var timerStartValue = (startHours * 3600 + startMinutes * 60 + startSeconds) * 1000;
  var timerTmpStartValue = parseInt(window.localStorage.getItem('timerTmpStartValue'));
  if (timerTmpStartValue && timerTmpStartValue !== timerStartValue) {
    localStorage.clear();
  }
  window.localStorage.setItem('timerTmpStartValue', timerStartValue);
  console.log('timerTmpStartValue: ', timerTmpStartValue);

  // Таймстамп-окончание таймера
  var timerStopStamp = new Date().getTime() + timerStartValue;
  var finishTimer = parseInt(localStorage.getItem('timerEnd'));
  if (finishTimer) {
    timerStopStamp = finishTimer;
  }
  console.log('finishTimer: ', finishTimer);

  // localStorage.clear()

  // if(finishTimer && finishTimer < new Date().getTime()) {
  // }

  // const days = document.querySelector(".timer .js-timer-day");
  var hours = document.querySelector(".timer .js-timer-hour");
  var minutes = document.querySelector(".timer .js-timer-min");
  var seconds = document.querySelector(".timer .js-timer-sec");
  var timerLamp = document.querySelector(".js-timer-lamp");
  function updateTimer() {
    setTimeout(function () {
      timerLamp.classList.toggle('turned-off');
      // Текущий timestamp
      var currentTime = new Date().getTime();

      // Возобновление счетчика
      if (timerStopStamp <= currentTime) {
        timerStopStamp += timerStartValue;
      }

      // Текущий таймстамп-остаток таймера
      var timerCurrentValue = timerStopStamp - currentTime;

      // window.localStorage.setItem("timerStop", timerCurrentValue.getTime());
      // console.log("timerStop.getTime(): ", +timerStop);

      // Получение значений таймера
      var timerCurrentHours = new Date(timerCurrentValue).getUTCHours();
      var timerCurrentMinutes = new Date(timerCurrentValue).getUTCMinutes();
      var timerCurrentSeconds = new Date(timerCurrentValue).getUTCSeconds();

      // Вставка значений с добавлением нуля
      hours.innerHTML = "".concat(setZero(timerCurrentHours));
      minutes.innerHTML = "".concat(setZero(timerCurrentMinutes));
      seconds.innerHTML = "".concat(setZero(timerCurrentSeconds));

      // Запись в LocalStorage
      window.localStorage.setItem('timerEnd', timerStopStamp);
      setTimeout(updateTimer, 1000);
    }, 0);
  }
  function setZero(val) {
    return val < 10 ? "0".concat(val) : "".concat(val);
  }
  updateTimer();
}