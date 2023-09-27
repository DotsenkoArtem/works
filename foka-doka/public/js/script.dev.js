"use strict";

window.addEventListener("load", function () {
  preloaderInit(350);
  handleModals();
});

// P A G E   P R E L O A D E R   F U N C T I O N
function preloaderInit(transition) {
  preloader.style.transition = "opacity ".concat(transition, "ms");
  preloader.classList.add("fade-out");
  setTimeout(function () {
    preloader.remove();
  }, transition);
}

// M O D A L   F U N C T I O N
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

// ======================================================

// M E N U   M O B I L E
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
// ======================================================

// M A P   S E T   L O C A T I O N
var windowWidth;
function setMapLocation() {
  windowWidth = document.documentElement.clientWidth;
  windowWidth > 575 ? map.setLocation({
    center: [30.251826, 59.9455],
    zoom: 17
  }) : map.setLocation({
    center: [30.2533, 59.9462],
    zoom: 17
  });
}
window.addEventListener('load', setMapLocation);
window.addEventListener("resize", setMapLocation);
// ======================================================