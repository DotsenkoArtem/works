window.addEventListener("load", catalogMenuHandle);

function catalogMenuHandle() {
  const catalogMenuTriggers = document.querySelectorAll(
    ".catalog-menu-trigger"
  );

  catalogMenuTriggers.forEach((item) => {
    let catalogMenuWrap = item.querySelector(".catalog-menu-wrap");
    let catalogBackDrop = item.querySelector(".catalog-menu-backdrop");
    let catalogMenu = item.querySelector(".catalog-menu");

    alignCatCenter();
    function alignCatCenter() {
      catalogMenuWrap.style.left = `-${
        (catalogMenuWrap.getBoundingClientRect().left -
          (document.documentElement.clientWidth -
            catalogMenuWrap.getBoundingClientRect().right)) /
        2
      }px`;
    }

    setbackDrop();
    function setbackDrop() {
      catalogBackDrop.style.left = `-${
        catalogBackDrop.getBoundingClientRect().left
      }px`;
      catalogBackDrop.style.height = `${
        document.documentElement.offsetHeight -
        catalogBackDrop.getBoundingClientRect().top
      }px`;
    }

    item.addEventListener("mouseover", showCatalogMenu);
    item.addEventListener("mouseleave", hideCatalogMenu);
    catalogMenu.addEventListener("mouseleave", hideCatalogMenu);

    function showCatalogMenu() {
      catalogMenuWrap.classList.remove("hidden");
      catalogMenuWrap.classList.add("shown");
      item.removeEventListener("mouseover", showCatalogMenu);

      setTimeout(() => {
        item.addEventListener("mouseover", showCatalogMenu);
      }, 350);
    }

    function hideCatalogMenu() {
      catalogMenuWrap.classList.remove("shown");
      catalogMenuWrap.classList.add("hidden");

      item.removeEventListener("mouseleave", hideCatalogMenu);
      catalogMenu.removeEventListener("mouseleave", hideCatalogMenu);

      setTimeout(() => {
        item.addEventListener("mouseleave", hideCatalogMenu);
        catalogMenu.addEventListener("mouseleave", hideCatalogMenu);
      }, 350);
    }
  });
}
