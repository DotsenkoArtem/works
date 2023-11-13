/* 
  ВЫВОДЫ:
  - лучше СТАВИТЬ слушатель события (в данном случае 'mouseover') НА ЭЛЕМЕНТ, который НЕ СОДЕРЖИТ ДЕТЕЙ, потому что при движении мыши в момент наведения на потомков функция обработчик срабатывает заново.
*/

window.addEventListener("load", catalogMenuHandle);

function catalogMenuHandle() {
  const menuAnimDuration = 350;
  const catalogMenuTriggers = document.querySelectorAll(
    ".catalog-menu-trigger"
  );

  catalogMenuTriggers.forEach((item) => {
    const catalogMenuWrap = item.querySelector(".catalog-menu-wrap");
    const catalogMenuLink = item.querySelector(".catalog-menu-trigger > a");

    alignCatCenter();

    // ADDING EVENTS
    catalogMenuLink.addEventListener("mouseover", showCatalogMenu);
    item.addEventListener("mouseleave", hideCatalogMenu);

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
      let catalogMenuBackdrop = document.querySelector(".catalog-menu-backdrop");
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
    function showCatalogMenu() {
      setBackDrop();
      catalogMenuWrap.classList.remove("hidden");
      catalogMenuWrap.classList.add("shown");
    }

    // Исчезновение меню
    function hideCatalogMenu() {
      removeBackDrop();
      catalogMenuWrap.classList.remove("shown");
      catalogMenuWrap.classList.add("hidden");
    }
  });
}
