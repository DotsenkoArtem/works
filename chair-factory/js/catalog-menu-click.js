window.addEventListener("load", catalogMenuHandle);

function catalogMenuHandle() {
  const menuAnimDuration = 350;
  const catalogMenuTriggers = document.querySelectorAll(
    ".catalog-menu-trigger"
  );

  catalogMenuTriggers.forEach((item) => {
    let catalogMenuWrap = item.querySelector(".catalog-menu-wrap");
    let catalogMenuLink = item.querySelector(".catalog-menu-trigger > a");

    alignCatCenter();

    // ADDING EVENTS
    item.addEventListener("click", openCatalogMenu);
    // catalogMenuLink.addEventListener("click", openCatalogMenu);

    // FUNCTIONS
    // Выравнивание меню по центру окна
    function alignCatCenter() {
      catalogMenuWrap.style.left = `-${
        (catalogMenuWrap.getBoundingClientRect().left -
          (document.documentElement.clientWidth -
            catalogMenuWrap.getBoundingClientRect().right)) /
        2
      }px`;
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
      if(event.target === catalogMenuLink) {
        event.preventDefault();
      }
      event.stopPropagation();


      if (!catalogMenuWrap.classList.contains("shown")) {
        // Закрытие всех ранее открытых меню
        catalogMenuTriggers.forEach((elem) => {
          let catalogMenuWrapShown = elem.querySelector(
            ".catalog-menu-wrap.shown"
          );
          // Если есть открытое меню
          if (catalogMenuWrapShown) {
            catalogMenuWrapShown.classList.remove("shown");
            catalogMenuWrapShown.classList.add("hidden");
            let catalogMenuLinkShown = elem.querySelector(
              ".catalog-menu-trigger > a"
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
        (catalogMenuWrap.classList.contains("shown") &&
          event.target === catalogMenuLink) ||
        (catalogMenuWrap.classList.contains("shown") &&
          event.target.parentNode === catalogMenuLink)
      ) {
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
      // closeIcon.addEventListener("click", closeCatalogMenu);
    }
    // Удаление иконки Х
    function removeCloseIcon() {
      let closeIcon = document.querySelector(".close-icon");
      if (closeIcon) {
        closeIcon.remove();
      }
    }
  });
}
