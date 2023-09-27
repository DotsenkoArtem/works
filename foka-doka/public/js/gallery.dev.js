"use strict";

// G A L L E R Y
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
// ======================================================

// T A B S
var tabsBoxes = document.querySelectorAll(".tabs-wrap");
var _loop = function _loop() {
  var tabs = tabsBoxes[i].querySelectorAll(".tabs__btn");
  var tabsContent = tabsBoxes[i].querySelector(".tabs-content");
  var tabsContentItems = tabsContent.querySelectorAll(".tabs-content__item");
  for (var _i = 0; _i < tabs.length; _i++) {
    var tab = tabs[_i];
    tab.addEventListener("click", function () {
      for (var j = 0; j < tabs.length; j++) {
        tabs[j].classList.remove("active");
      }
      var tabContentId = "#" + this.dataset.target;
      this.classList.add("active");
      for (var k = 0; k < tabsContentItems.length; k++) {
        tabsContentItems[k].classList.remove("active");
      }
      tabsContent.querySelector(tabContentId).classList.add("active");
    });
  }
};
for (var i = 0; i < tabsBoxes.length; i++) {
  _loop();
}

// ======================================================