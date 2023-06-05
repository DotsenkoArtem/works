"use strict";

// PAGE PRELOADER FUNCTION
// добавить #preloader.preloader в html
window.onload = function () {
  var PRELOADERTRANSITION = 350;
  preloader.style.transition = "opacity ".concat(PRELOADERTRANSITION, "ms");
  preloader.classList.add('fade-out');
  setTimeout(function () {
    preloader.remove();
  }, PRELOADERTRANSITION);
};
// - - - - - - - - - - - - - - - - - - - 

// INPUT MASK
var selector = document.querySelector('[name="userPhone"]');
var im = new Inputmask("+7 (\\999) 999-99-99");
im.mask(selector);
// - - - - - - - - - - - - - - - - - - - 

// MODALS
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
// - - - - - - - - - - - - - - - - - - -