// G A L L E R Y
Fancybox.bind("[data-fancybox='gallery']", {
  Thumbs: {
    type: false,
  },
  transition: "classic",
});

Fancybox.bind("[data-fancybox='gallery2']", {
  Thumbs: {
    type: false,
  },
  transition: "classic",
});

Fancybox.bind("[data-fancybox='gallery3']", {
  Thumbs: {
    type: false,
  },
  transition: "classic",
});

Fancybox.bind("[data-fancybox='gallery4']", {
  Thumbs: {
    type: false,
  },
  transition: "classic",
});
// ======================================================

// T A B S
const tabsBoxes = document.querySelectorAll(".tabs-wrap");

for (let i = 0; i < tabsBoxes.length; i++) {
  const tabs = tabsBoxes[i].querySelectorAll(".tabs__btn");
  const tabsContent = tabsBoxes[i].querySelector(".tabs-content");
  const tabsContentItems = tabsContent.querySelectorAll(".tabs-content__item");

  for (let i = 0; i < tabs.length; i++) {
    let tab = tabs[i];

    tab.addEventListener("click", function () {
      for (let j = 0; j < tabs.length; j++) {
        tabs[j].classList.remove("active");
      }

      let tabContentId = "#" + this.dataset.target;
      this.classList.add("active");

      for (let k = 0; k < tabsContentItems.length; k++) {
        tabsContentItems[k].classList.remove("active");
      }

      tabsContent.querySelector(tabContentId).classList.add("active");
    });
  }
}

// ======================================================
