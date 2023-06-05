"use strict"

// PAGE PRELOADER FUNCTION
// добавить #preloader.preloader в html

window.onload = function() {
	const PRELOADERTRANSITION = 350
	preloader.style.transition = `opacity ${PRELOADERTRANSITION}ms`
	preloader.classList.add('fade-out')

	setTimeout(function(){
		preloader.remove()
	},PRELOADERTRANSITION)
}
// - - - - - - - - - - - - - - - - - - - 

// INPUT MASK
const selector = document.querySelector('[name="userPhone"]');
const im = new Inputmask("+7 (\\999) 999-99-99");
im.mask(selector);
// - - - - - - - - - - - - - - - - - - - 


// MODALS
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
// - - - - - - - - - - - - - - - - - - - 