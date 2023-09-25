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
window.addEventListener("load", () => {
  preloaderInit(350);
  handleModals();
});

function preloaderInit(transition) {
  preloader.style.transition = `opacity ${transition}ms`;
  preloader.classList.add("fade-out");

  setTimeout(function () {
    preloader.remove();
  }, transition);
}



function handleModals() {
  let modalBtns = document.querySelectorAll(".js-modal-trigger");

  modalBtns.forEach((modalBtn) => {
    // Продолжительность анимации
    let duration;
    let modal = document.querySelector(`#${modalBtn.dataset.target}`);
    let modalClose = modal.querySelector(".modal__close");

    let modalBackdrop = document.createElement("div");
    modalBackdrop.className = "modal-backdrop";

    modalBtn.addEventListener("click", openModal);
    modalBackdrop.addEventListener("click", function() {
      closeModal(modal, duration)
    });
    modalClose.addEventListener("click", function() {
      closeModal(modal, duration)
    });

    // Open-close functions
    function openModal() {
      // Если в дата-атрибуте значение указано равным 0, то продолжительность анимации 0.
      modalBtn.dataset.duration === "0"
        ? (duration = 0)
        : // В остальных случаях, если указано целочисленное значение, то берем его, если нет, то 350 по умолчанию.
          (duration = +modalBtn.dataset.duration || 350); // В
      modal.style.transition = `${duration}ms ease-out`;

      modal.style.display = `flex`;
      // Таймаут для того, чтобы отрабатывала анимация
      setTimeout(() => {
        modal.classList.add("shown");
      }, 0);
      modal.append(modalBackdrop);
    }

    function closeModal() {
      modal.classList.remove("shown");
      setTimeout(() => {
        modal.style = ``;
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

async function initMap() {
    // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer} = ymaps3;

    // Иницилиазируем карту
    const map = new YMap(
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
        }
    );

    // Добавляем слой для отображения схематической карты
    map.addChild(new YMapDefaultSchemeLayer());
}











// M E N U   M O B I L E
const menuTrigger = document.querySelector(".js-menu-mobile-trigger");
const menu = document.querySelector(".js-menu-mobile");
const menuOverl = document.querySelector(".js-menu-mobile-overl");
const menuCloseBtn = document.querySelector(".js-menu-mobile-close");

document.addEventListener("DOMContentLoaded", () => {
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
