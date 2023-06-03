"use strict"
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

window.onload = function() {
	const PRELOADERTRANSITION = 350
	preloader.style.transition = `opacity ${PRELOADERTRANSITION}ms`
	preloader.classList.add('fade-out')

	setTimeout(function(){
		preloader.remove()
	},PRELOADERTRANSITION)
}
// - - - - - - - - - - - - - - - - - - - 




// new WOW({
// 	offset:       300,
// }).init();
