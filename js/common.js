$(function() {

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});

$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

});

function maskPhone(selector, masked = '+7 (___) ___-__-__') {
	const elems = document.querySelectorAll(selector);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		console.log(template);
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i !== -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type === "blur" && this.value.length < 5) {
			this.value = "";
		}

	}

	for (const elem of elems) {
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}
	
}

document.addEventListener('DOMContentLoaded', ()=> {

	maskPhone('input[type="tel"]')

	// Smooth scroll when link clicked
	const $page = $('html, body');
	$('a[href*="#"]').click(function() {
		$page.animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 800);
		return false;
	});

	const onScrollHeader = () => { // объявляем основную функцию onScrollHeader
		const header = $('.header') // находим header и записываем в константу
		let prevScroll = $(window).scrollTop() // узнаем на сколько была прокручена страница ранее
		let currentScroll // на сколько прокручена страница сейчас (пока нет значения)
	
		$(window).scroll(() => { // при прокрутке страницы
		  currentScroll = $(window).scrollTop() // узнаем на сколько прокрутили страницу
		  const headerHidden = () => header.hasClass('header_hidden') // узнаем скрыт header или нет
		  if (currentScroll > prevScroll && !headerHidden()) { // если прокручиваем страницу вниз и header не скрыт
			header.addClass('header_hidden') // то скрываем header
		  }
		  if (currentScroll < prevScroll && headerHidden()) { // если прокручиваем страницу вверх и header скрыт
			header.removeClass('header_hidden') // то отображаем header
		  }
		  prevScroll = currentScroll // записываем на сколько прокручена страница на данный момент
		})
	}
	  
	onScrollHeader() // вызываем основную функцию onScrollHeader

	document.querySelectorAll('.product__btn').forEach((item)=> {
		item.addEventListener('click', (e) => {
			e.preventDefault()
			document.querySelector('html').style.overflowY = 'hidden'
			document.querySelector('.modal').style.display = 'flex'
			setTimeout(()=> {
				document.querySelector('.modal').style.opacity = 1
			}, 500)
		})
	})

	document.querySelector('.modal__btn').addEventListener('click', (e) => {
		e.preventDefault()
		document.querySelector('html').style.overflowY = 'hidden'
		document.querySelector('.modal').style.display = 'flex'
		setTimeout(()=> {
			document.querySelector('.modal').style.opacity = 1
		}, 500)
	})
	
	document.querySelector('.modal__close').addEventListener('click', ()=> {
		document.querySelector('html').style.overflowY = 'auto'
		document.querySelector('.modal').style.opacity = 0
		setTimeout(()=> {
			document.querySelector('.modal').style.display = 'none'
		}, 500)
	})
	
	document.querySelector('.modal__overlay').addEventListener('click', ()=> {
		document.querySelector('html').style.overflowY = 'auto'
		document.querySelector('.modal').style.opacity = 0
		setTimeout(()=> {
			document.querySelector('.modal').style.display = 'none'
		}, 500)
	})

	document.querySelector('.burger').addEventListener('click', e => {
		e.preventDefault()
		if (e.target.closest('.burger').querySelector('.burger__text').textContent === 'Меню') {
			document.querySelector('.modal__nav').style.display = 'flex'
			document.querySelector('html').style.overflowY = 'hidden'
			document.querySelector('.burger__text').innerHTML = 'Закрыть'
			document.querySelector('.burger__lines img').src = 'img/nav__close.svg'
			setTimeout(()=> {
				document.querySelector('.modal__nav').style.transform = 'translateY(0%)'
			}, 100)
		} else if (e.target.closest('.burger').querySelector('.burger__text').textContent === 'Закрыть') {
			document.querySelector('.modal__nav').style.transform = 'translateY(-100%)'
			document.querySelector('html').style.overflowY = 'auto'
			document.querySelector('.burger__text').innerHTML = 'Меню'
			document.querySelector('.burger__lines img').src = 'img/nav__burger.svg'
			setTimeout(()=> {
				document.querySelector('.modal__nav').style.display = 'none'
			}, 500)
		}
	})

	document.querySelectorAll('.modal__nav__link').forEach(e => {
		e.addEventListener('click', (event)=> {
			event.preventDefault()
			document.querySelector('.modal__nav').style.transform = 'translateY(-100%)'
			document.querySelector('html').style.overflowY = 'auto'
			document.querySelector('.burger__text').innerHTML = 'Меню'
			document.querySelector('.burger__lines img').src = 'img/nav__burger.svg'
			setTimeout(()=> {
				document.querySelector('.modal__nav').style.display = 'none'
			}, 500)
			document.querySelector('header').classList.add('header_hidden')
		})
		
	})

	$('.first .product__slider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		prevArrow: '.first .arrow.prev',
		nextArrow: '.first .arrow.next',
		adaptiveHeight: true
	  });

	  $('.second .product__slider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		prevArrow: '.second .arrow.prev',
		nextArrow: '.second .arrow.next',
		adaptiveHeight: true
	  });

	  $('.third .product__slider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		prevArrow: '.third .arrow.prev',
		nextArrow: '.third .arrow.next',
		adaptiveHeight: true
	  });
})
