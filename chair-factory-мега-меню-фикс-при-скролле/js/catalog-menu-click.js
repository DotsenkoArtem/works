const scrollValue = 200;
const topPositionFixed = 20;

window.addEventListener("load", catalogMenuHandle);

function catalogMenuHandle() {
  const menuAnimDuration = 350;
  const catalogMenuTriggers = document.querySelectorAll(".js-menu-trigger");

  catalogMenuTriggers.forEach((item) => {
    let catalogMenuWrap = item.querySelector(".js-menu-wrap");
    let catalogMenuLink = item.querySelector(".js-menu-trigger > a");

    alignCatCenter();

    // ADDING EVENTS
    item.addEventListener("click", openCatalogMenu);

    // FUNCTIONS
    // Выравнивание меню по центру окна
    function alignCatCenter() {
      if (window.scrollY < scrollValue) {
        catalogMenuWrap.style.left = `${
          (document.documentElement.clientWidth -
            catalogMenuWrap.getBoundingClientRect().width) /
            2 -
          catalogMenuWrap.getBoundingClientRect().left
        }px`;
      }
    }

    // Установка бэкдропа
    function setBackDrop() {
      let catalogMenuBackdrop = document.querySelector(
        ".catalog-menu-backdrop"
      );
      if (catalogMenuBackdrop) catalogMenuBackdrop.remove();

      catalogMenuBackdrop = document.createElement("div");
      catalogMenuBackdrop.className = "catalog-menu-backdrop";
      catalogMenuBackdrop.style.top = `${
        item.getBoundingClientRect().bottom + 15 + window.scrollY
      }px`;
      pageWrapper.append(catalogMenuBackdrop);
      catalogMenuBackdrop.classList.add("shown");
    }

    // Удаление бэкдропа
    function removeBackDrop() {
      let catalogMenuBackdrop = document.querySelector(
        ".catalog-menu-backdrop"
      );
      if (catalogMenuBackdrop) {
        catalogMenuBackdrop.classList.remove("shown");
        setTimeout(() => {
          catalogMenuBackdrop.remove();
        }, menuAnimDuration);
      }
    }

    // Появление меню
    function openCatalogMenu(event) {
      // Отмена действия ссылки
      event.preventDefault();
      event.stopPropagation();

      if (!catalogMenuWrap.classList.contains("shown")) {
        // Закрытие всех ранее открытых меню
        catalogMenuTriggers.forEach((elem) => {
          let catalogMenuWrapShown = elem.querySelector(".js-menu-wrap.shown");
          // Если есть открытое меню
          if (catalogMenuWrapShown) {
            catalogMenuWrapShown.classList.remove("shown");
            catalogMenuWrapShown.classList.add("hidden");
            let catalogMenuLinkShown = elem.querySelector(
              ".js-menu-trigger > a"
            );
            catalogMenuLinkShown.classList.remove("catalog-menu-close");
            removeCloseIcon();
          }
        });

        // Установка бэкдропа
        setBackDrop();
        // Перекрашивание ссылки, установка Х
        catalogMenuLink.classList.add("catalog-menu-close");
        addCloseIcon();

        catalogMenuWrap.classList.remove("hidden");
        catalogMenuWrap.classList.add("shown");

        // Закрытие по клику на body
        document.body.addEventListener("click", closeCatalogMenu);
      } else if (
        catalogMenuWrap.classList.contains("shown") &&
        event.target === catalogMenuLink
      ) {
        // console.log(event.target);
        // console.log(event.target === catalogMenuLink);
        closeCatalogMenu();
      }
    }

    // Исчезновение меню
    function closeCatalogMenu() {
      removeBackDrop();

      catalogMenuLink.classList.remove("catalog-menu-close");
      removeCloseIcon();

      catalogMenuWrap.classList.remove("shown");
      catalogMenuWrap.classList.add("hidden");
      document.body.removeEventListener("click", closeCatalogMenu);
    }
    // Добавление иконки Х
    function addCloseIcon() {
      let closeIcon = document.createElement("span");
      closeIcon.className = "close-icon";
      catalogMenuLink.prepend(closeIcon);
    }
    // Удаление иконки Х
    function removeCloseIcon() {
      let closeIcon = document.querySelector(".close-icon");
      if (closeIcon) {
        closeIcon.remove();
      }
    }
  });

  let catalogMenuWraps = document.querySelectorAll(".js-menu-wrap");
  const initiaTopPosition = parseInt(
    getComputedStyle(document.querySelector(".js-menu-wrap")).top
  );

  fixMenuWrap(scrollValue, topPositionFixed);

  window.addEventListener("scroll", function () {
    fixMenuWrap(scrollValue, topPositionFixed);
  });

  function fixMenuWrap(scrollValue, topPositionFixed) {
    if (window.scrollY >= scrollValue) {
      catalogMenuWraps.forEach((item) => {
        if (item.style.position != "fixed") {
          catalogMenuWraps.forEach((item) => {
            item.style.left = `${
              (document.documentElement.clientWidth -
                item.getBoundingClientRect().width) /
              2
            }px`;
            item.style.top = `${topPositionFixed}px`;
            item.style.position = `fixed`;
          });
        }
      });
    } else if (window.scrollY < scrollValue) {
      catalogMenuWraps.forEach((item) => {
        if (item.style.position === "fixed") {
          item.style.left = `${
            item.getBoundingClientRect().left -
            item.parentElement.getBoundingClientRect().left
          }px`;
          item.style.top = `${initiaTopPosition}px`;
          item.style.position = `absolute`;
          console.log("Else worked!");
        }
      });
    }
  }
}
