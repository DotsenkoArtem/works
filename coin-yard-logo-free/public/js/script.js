"use strict";

window.addEventListener("load", function () {
  setPreloader();
  modalsHandle();
  setTimer(0, 2, 11);

  // INPUT MASK
  const selector = document.querySelector('[name="userPhone"]');
  const im = new Inputmask("+7 (\\999) 999-99-99");
  im.mask(selector);
  // - - - - - - - - - - - - - - - - - - -
});

// PAGE PRELOADER FUNCTION
// добавить #preloader.preloader в html
function setPreloader() {
  const PRELOADERTRANSITION = 350;
  preloader.style.transition = `opacity ${PRELOADERTRANSITION}ms`;
  preloader.classList.add("fade-out");

  setTimeout(function () {
    preloader.remove();
  }, PRELOADERTRANSITION);
}
// - - - - - - - - - - - - - - - - - - -

// MODALS
function modalsHandle() {
  const modalOpenBtns = document.querySelectorAll(".js-modal-trigger");

  if (modalOpenBtns) {
    for (let i = 0; i < modalOpenBtns.length; i++) {
      let modalOpenBtn = modalOpenBtns[i];
      modalOpenBtn.addEventListener("click", () => {
        openModal(modalOpenBtn);
      });
    }
  }

  function openModal(modalOpenBtn) {
    let modal = document.getElementById(modalOpenBtn.dataset.target);
    modal.classList.remove("closed");
    modal.classList.add("opened");

    let modalCloseBtns = modal.getElementsByClassName("js-modal-close");

    for (let i = 0; i < modalCloseBtns.length; i++) {
      let modalCloseBtn = modalCloseBtns[i];
      modalCloseBtn.addEventListener("click", () => {
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
function setTimer(startHours, startMinutes, startSeconds) {
  // localStorage.lear()
  // Высчитали время таймера
  let timerStartValue =
    (startHours * 3600 + startMinutes * 60 + startSeconds) * 1000;

  let timerTmpStartValue = parseInt(
    window.localStorage.getItem("timerTmpStartValue")
  );
  if (timerTmpStartValue && timerTmpStartValue !== timerStartValue) {
    localStorage.clear();
  }

  window.localStorage.setItem("timerTmpStartValue", timerStartValue);

  // Таймстамп-окончание таймера
  let timerStopStamp = new Date().getTime() + timerStartValue;

  let finishTimer = parseInt(localStorage.getItem("timerEnd"));
  if (finishTimer) {
    timerStopStamp = finishTimer;
  }

  // const days = document.querySelector(".timer .js-timer-day");
  const hours = document.querySelector(".timer .js-timer-hour");
  const minutes = document.querySelector(".timer .js-timer-min");
  const seconds = document.querySelector(".timer .js-timer-sec");
  const timerLamp = document.querySelector(".js-timer-lamp");

  function updateTimer() {
    setTimeout(function () {
      timerLamp.classList.toggle("turned-off");
      // Текущий timestamp
      let currentTime = new Date().getTime();

      // Возобновление счетчика
      if (timerStopStamp <= currentTime) {
        timerStopStamp += timerStartValue;
      }

      // Текущий таймстамп-остаток таймера
      let timerCurrentValue = timerStopStamp - currentTime;

      // Получение значений таймера
      let timerCurrentHours = new Date(timerCurrentValue).getUTCHours();
      let timerCurrentMinutes = new Date(timerCurrentValue).getUTCMinutes();
      let timerCurrentSeconds = new Date(timerCurrentValue).getUTCSeconds();

      // Вставка значений с добавлением нуля
      hours.innerHTML = `${setZero(timerCurrentHours)}`;
      minutes.innerHTML = `${setZero(timerCurrentMinutes)}`;
      seconds.innerHTML = `${setZero(timerCurrentSeconds)}`;

      // Запись в LocalStorage
      window.localStorage.setItem("timerEnd", timerStopStamp);

      setTimeout(updateTimer, 1000);
    }, 0);
  }

  function setZero(val) {
    return val < 10 ? `0${val}` : `${val}`;
  }

  updateTimer();
}

// FORM
const sounds = {
  success: "audio/success.mp3",
  error: "audio/error-1.mp3",
};
let soundSuccess = new Sound(sounds.success);
let soundError = new Sound(sounds.error);
let alertSound = soundSuccess;

function Sound(src) {
  let audio = document.createElement("audio");
  audio.src = src;
  this.play = function () {
    audio.play();
  };
}

// Массив всех форм
let forms = document.forms;
for (let i = 0; i < forms.length; i++) {
  let form = forms[i];

  form.addEventListener("submit", function (event) {
    send(event, "php/mail.php");
  });

  function send(event, php) {
    // Установка лоадера на кнопку submit
    setupLoader(form);

    // console.log("Отправка запроса!!!");

    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    var req = new XMLHttpRequest();
    req.open("POST", php, true);

    req.onload = function () {
      // Определение переменных для оповещения
      let thanks = document.createElement("div");
      let thanksContent = document.createElement("div");
      let thanksClose = document.createElement("div");
      let messageSuccessful =
        "<h3><span>Спасибо</span>Мы перезвоним Вам в ближайшее время!</h3>";
      let limitExceeded =
        "<h3><span>Ошибка.</span>Превышен максимальный размер прикрепляемых файлов (10мб).</h3>";
      let messageError = "<h3><span>Ошибка</span>Сообщение не отправлено</h3>";

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
        let json = JSON.parse(this.response); // Ебанный internet explorer 11
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
      for (let i = 0; i < form.elements.length; i++) {
        form.elements[i].disabled = false;
      }

      // Автоматическое удаление окна оповещения
      setTimeout(function () {
        removeThanks();
      }, 5000);

      // Удаление окна оповещения
      function removeThanks() {
        thanks.classList.remove("active");
        thanks.style.animation = "slideOutRightBottom .5s ease forwards";
        setTimeout(() => {
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
}

// Функции установки, удаления лоадера кнопки формы
function setupLoader(form) {
  let loader = document.createElement("div");
  loader.className = "submit-loader";
  form.querySelector(".loader-container ").appendChild(loader);
}

function removeLoader(form) {
  let loader = form.querySelector(".submit-loader");
  loader.remove();
}
