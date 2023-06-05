"use strict";

window.addEventListener("load", function () {
  setPreloader();
  modalsHandle();
  setTimer(0, 1, 11);

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

  // Functions
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
function setTimer(startHours = 11, startMinutes = 11, startSeconds = 11) {
  // Высчитали время таймера
  let timerStartValue = (startHours * 3600 + startMinutes * 60 + startSeconds) * 1000;


  let timerTmpStartValue = parseInt(window.localStorage.getItem('timerTmpStartValue'))
  if(timerTmpStartValue && timerTmpStartValue !== timerStartValue) {
    localStorage.clear()
  }


  window.localStorage.setItem('timerTmpStartValue', timerStartValue)
  console.log('timerTmpStartValue: ', timerTmpStartValue);

  // Таймстамп-окончание таймера
  let timerStopStamp = new Date().getTime() + timerStartValue


  let finishTimer =  parseInt(localStorage.getItem('timerEnd'))
  if(finishTimer) {
    timerStopStamp = finishTimer
  }
  console.log('finishTimer: ', finishTimer);

  // localStorage.clear()
  
  // if(finishTimer && finishTimer < new Date().getTime()) {
  // }



  // const days = document.querySelector(".timer .js-timer-day");
  const hours = document.querySelector(".timer .js-timer-hour");
  const minutes = document.querySelector(".timer .js-timer-min");
  const seconds = document.querySelector(".timer .js-timer-sec");
  const timerLamp = document.querySelector(".js-timer-lamp");

  function updateTimer() {
    setTimeout(function () {


      timerLamp.classList.toggle('turned-off')
      // Текущий timestamp
      let currentTime = new Date().getTime();

      // Возобновление счетчика
      if (timerStopStamp <= currentTime) {
        timerStopStamp += timerStartValue;
      }


      // Текущий таймстамп-остаток таймера
      let timerCurrentValue = timerStopStamp - currentTime;

      // window.localStorage.setItem("timerStop", timerCurrentValue.getTime());
      // console.log("timerStop.getTime(): ", +timerStop);

      // Получение значений таймера
      let timerCurrentHours = new Date(timerCurrentValue).getUTCHours();
      let timerCurrentMinutes = new Date(timerCurrentValue).getUTCMinutes();
      let timerCurrentSeconds = new Date(timerCurrentValue).getUTCSeconds();

      // Вставка значений с добавлением нуля
      hours.innerHTML = `${setZero(timerCurrentHours)}`;
      minutes.innerHTML = `${setZero(timerCurrentMinutes)}`;
      seconds.innerHTML = `${setZero(timerCurrentSeconds)}`;



      // Запись в LocalStorage
      window.localStorage.setItem('timerEnd', timerStopStamp)

      setTimeout(updateTimer, 1000);
    }, 0);
  }

  function setZero(val) {
    return val < 10 ? `0${val}` : `${val}`;
  }

  updateTimer();
}