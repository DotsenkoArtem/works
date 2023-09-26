"use strict";

Fancybox.bind("[data-fancybox='gallery']", {
  Thumbs: {
    type: false
  },
  transition: "classic"
});
Fancybox.bind("[data-fancybox='gallery2']", {
  Thumbs: {
    type: false
  },
  transition: "classic"
});
Fancybox.bind("[data-fancybox='gallery3']", {
  Thumbs: {
    type: false
  },
  transition: "classic"
});
Fancybox.bind("[data-fancybox='gallery4']", {
  Thumbs: {
    type: false
  },
  transition: "classic"
});

// T A B S
"use strict";
var tabsBoxes = document.querySelectorAll(".tabs-wrap");
var _loop = function _loop() {
  // ПОЛУЧЕНИЕ МАССИВА ВСЕХ ВКЛАДОК
  var tabs = tabsBoxes[i].querySelectorAll(".tabs__btn");
  // ПОЛУЧЕНИЕ БЛОКА С ЭЛЕМЕНТАМИ КОНТЕНТА ВКЛАДОК
  var tabsContent = tabsBoxes[i].querySelector(".tabs-content");
  // ПОЛУЧЕНИЕ ВСЕХ ЭЛЕМЕНТОВ КОНТЕНТА ВКЛАДОК
  var tabsContentItems = tabsContent.querySelectorAll(".tabs-content__item");
  for (var _i = 0; _i < tabs.length; _i++) {
    var tab = tabs[_i];
    tab.addEventListener("click", function () {
      // УБАРИЕМ КЛАСС "ACTIVE" СО ВСЕХ ВКЛАДОК
      for (var j = 0; j < tabs.length; j++) {
        tabs[j].classList.remove("active");
      }

      // АКТИВНАЯ ВКЛАДКА ПРИ КЛИКЕ
      var tabContentId = "#" + this.dataset.target;
      this.classList.add("active");

      // УБАРИЕМ КЛАСС "ACTIVE" СО ВСЕХ ЭЛЕМЕНТОВ КОНТЕНТА ВКЛАДОК
      for (var k = 0; k < tabsContentItems.length; k++) {
        tabsContentItems[k].classList.remove("active");
      }

      // АКТИВНЫЙ ЭЛЕМЕНТ КОНТЕНА ВКЛАДКИ ПРИ КЛИКЕ
      tabsContent.querySelector(tabContentId).classList.add("active");
    });
  }
};
for (var i = 0; i < tabsBoxes.length; i++) {
  _loop();
}

// ==============================================================================================================