Fancybox.bind("[data-fancybox]", {
  
    Thumbs: {
      type: false,
    },
    transition: 'classic',
  
});


// T A B S
"use strict"

const tabsBoxes = document.querySelectorAll('.tabs-wrap');

for (let i = 0; i < tabsBoxes.length; i++) {
	// ПОЛУЧЕНИЕ МАССИВА ВСЕХ ВКЛАДОК
	const tabs = tabsBoxes[i].querySelectorAll('.tabs__btn');
	// ПОЛУЧЕНИЕ БЛОКА С ЭЛЕМЕНТАМИ КОНТЕНТА ВКЛАДОК
	const tabsContent = tabsBoxes[i].querySelector('.tabs-content');
	// ПОЛУЧЕНИЕ ВСЕХ ЭЛЕМЕНТОВ КОНТЕНТА ВКЛАДОК
	const tabsContentItems = tabsContent.querySelectorAll('.tabs-content__item');


	for (let i = 0; i < tabs.length; i++) {
		let tab = tabs[i];

		tab.addEventListener('click', function () {
			// УБАРИЕМ КЛАСС "ACTIVE" СО ВСЕХ ВКЛАДОК
			for (let j = 0; j < tabs.length; j++) {
				tabs[j].classList.remove('active');
			}


			// АКТИВНАЯ ВКЛАДКА ПРИ КЛИКЕ
			let tabContentId = '#' + this.dataset.target;
			this.classList.add('active');

			// УБАРИЕМ КЛАСС "ACTIVE" СО ВСЕХ ЭЛЕМЕНТОВ КОНТЕНТА ВКЛАДОК
			for (let k = 0; k < tabsContentItems.length; k++) {
				tabsContentItems[k].classList.remove('active');
			}

			// АКТИВНЫЙ ЭЛЕМЕНТ КОНТЕНА ВКЛАДКИ ПРИ КЛИКЕ
			tabsContent.querySelector(tabContentId).classList.add('active');
		})
	}
}

// ==============================================================================================================
