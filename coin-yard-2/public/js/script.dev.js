"use strict";

window.addEventListener("load", function () {
  setPreloader();
  modalsHandle();
  setTimer(3, 24, 57);

  // INPUT MASK
  var selector = document.querySelectorAll('[name="userPhone"]');
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
  function openModal(modalOpenBtn) {
    var modal = document.getElementById(modalOpenBtn.dataset.target);
    modal.classList.remove("closed");
    modal.classList.add("opened");
    document.body.classList.add('scroll-hidden');
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
    document.body.classList.remove('scroll-hidden');
  }
}
// - - - - - - - - - - - - - - - - - - -

// TIMER
function setTimer(startHours, startMinutes, startSeconds) {
  // localStorage.lear()
  // Высчитали время таймера
  var timerStartValue = (startHours * 3600 + startMinutes * 60 + startSeconds) * 1000;
  var timerTmpStartValue = parseInt(window.localStorage.getItem("timerTmpStartValueCoin2"));

  // Очистка хранилища при изменении диапазона таймера
  if (timerTmpStartValue && timerTmpStartValue !== timerStartValue) {
    localStorage.clear();
  }
  window.localStorage.setItem("timerTmpStartValueCoin2", timerStartValue);

  // Таймстамп-окончание таймера
  var timerStopStamp = new Date().getTime() + timerStartValue;
  var finishTimer = parseInt(localStorage.getItem("timerEndCoin2"));
  if (finishTimer) {
    timerStopStamp = finishTimer;
  }
  var hours = document.querySelectorAll(".timer .js-timer-hour");
  var minutes = document.querySelectorAll(".timer .js-timer-min");
  var seconds = document.querySelectorAll(".timer .js-timer-sec");
  var timerLamp = document.querySelectorAll(".js-timer-lamp");

  // function updateTimer() {
  var timerId = setTimeout(function updateTimer() {
    // timerLamp.classList.toggle("turned-off");
    timerLamp.forEach(function (elem) {
      elem.classList.toggle("turned-off");
    });
    // Текущий timestamp
    var currentTime = new Date().getTime();

    // Возобновление счетчика
    if (timerStopStamp <= currentTime) {
      // timerStopStamp += timerStartValue;
      timerStopStamp = currentTime + timerStartValue;
    }

    // Текущий таймстамп-остаток таймера
    var timerCurrentValue = timerStopStamp - currentTime;

    // Получение значений таймера
    var timerCurrentHours = new Date(timerCurrentValue).getUTCHours();
    var timerCurrentMinutes = new Date(timerCurrentValue).getUTCMinutes();
    var timerCurrentSeconds = new Date(timerCurrentValue).getUTCSeconds();

    // Вставка значений с добавлением нуля
    // hours.innerHTML = `${setZero(timerCurrentHours)}`;
    // minutes.innerHTML = `${setZero(timerCurrentMinutes)}`;
    // seconds.innerHTML = `${setZero(timerCurrentSeconds)}`;
    hours.forEach(function (elem) {
      elem.innerHTML = "".concat(setZero(timerCurrentHours));
    });
    minutes.forEach(function (elem) {
      elem.innerHTML = "".concat(setZero(timerCurrentMinutes));
    });
    seconds.forEach(function (elem) {
      elem.innerHTML = "".concat(setZero(timerCurrentSeconds));
    });

    // Запись в LocalStorage
    window.localStorage.setItem("timerEndCoin2", timerStopStamp);
    timerId = setTimeout(updateTimer, 1000);
  }, 0);
  // }

  function setZero(val) {
    return val < 10 ? "0".concat(val) : "".concat(val);
  }

  // updateTimer();
}

// FORM
var sounds = {
  success: "audio/success.mp3",
  error: "audio/error-1.mp3"
};
var soundSuccess = new Sound(sounds.success);
var soundError = new Sound(sounds.error);
var alertSound = soundSuccess;
function Sound(src) {
  var audio = document.createElement("audio");
  audio.src = src;
  this.play = function () {
    audio.play();
  };
}

// Массив всех форм
var forms = document.forms;
var _loop2 = function _loop2() {
  var form = forms[i];
  form.addEventListener("submit", function (event) {
    send(event, "php/mail.php");
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
      for (var _i2 = 0; _i2 < form.elements.length; _i2++) {
        form.elements[_i2].disabled = false;
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
for (var i = 0; i < forms.length; i++) {
  _loop2();
}

// Функции установки, удаления лоадера кнопки формы
function setupLoader(form) {
  var loader = document.createElement("div");
  loader.className = "submit-loader";
  form.querySelector(".loader-container ").appendChild(loader);
}
function removeLoader(form) {
  var loader = form.querySelector(".submit-loader");
  loader.remove();
}