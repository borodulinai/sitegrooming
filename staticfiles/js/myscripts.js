$('.multiple-items').slick({
	infinite: true,
	dots: true, // показывать точки индикаторы
	slidesToShow: 3, // показывать по 3 слайда
	slidesToScroll: 1, // скроллить по 1 слайду
	autoplay: true,
	autoplaySpeed: 2000,
	arrows: true, // не показывать стрелки
	//		dotsClass: 'slick-dots', // название класса для точек
	responsive: [{
		breakpoint: 1025, // максимальная ширина экрана
		settings: {
			slidesToShow: 2, // показывать по 2 слайда
		}
	}, {
		breakpoint: 688,
		settings: {
			slidesToShow: 1,
		}
	}]
});

$('.multiple-items2').slick({
	infinite: true,
	dots: true, // показывать точки индикаторы
	slidesToShow: 3, // показывать по 3 слайда
	// slidesToScroll: 1, // скроллить по 1 слайду
	autoplay: true,
	autoplaySpeed: 3000,
	arrows: true, // не показывать стрелки

});
