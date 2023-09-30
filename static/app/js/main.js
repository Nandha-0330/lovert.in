(function ($) {
	"use strict";
	var windowOn = $(window);

	/*======================================
	Preloader activation
	========================================*/
	$(window).on('load', function (event) {
		$('#preloader').delay(500).fadeOut(500);
	});


	/*======================================
	Mobile Menu Js
	========================================*/
	$('#mobile-menu').meanmenu({
		meanMenuContainer: '.mobile-menu',
		meanScreenWidth: "1200",
		meanExpand: ['<i class="fal fa-plus"></i>'],
	});

	$("#mobile-menu2").meanmenu({
		meanMenuContainer: ".mobile-menu2",
		meanScreenWidth: "4000",
		meanExpand: ['<i class="fal fa-plus"></i>'],
	});

	$('.mean-nav > li.has-dropdown').on('click', function (e) {
		e.preventDefault();
		return false;
	});

	// Menu last class
	$('.main-menu nav > ul > li').slice(-2).addClass('menu-last');

	// Search Js
	$(".ms-search-btn").on("click", function (e) {
		$(".search__popup").addClass("search-opened");
		$(".offcanvas__overlay").addClass("overlay-open");
		e.preventDefault();
	});

	$(".search-close-btn, .offcanvas__overlay").on("click", function () {
		$(".search__popup").removeClass("search-opened");
		$(".offcanvas__overlay").removeClass("overlay-open");
	});

	$('.ms-tab-prevent .nav-link').on('click', function (e) {
		e.preventDefault;
	});

	/*======================================
	smoothSctollTop js
	========================================*/
	function smoothSctollTop() {
		$('.smooth a').on('click', function (event) {
			var target = $(this.getAttribute('href'));
			if (target.length) {
				event.preventDefault();
				$('html, body').stop().animate({
					scrollTop: target.offset().top - 100
				}, 1000);
			}
		});
	}
	smoothSctollTop();


	/*======================================
	Sidebar Toggle
	========================================*/
	$(".offcanvas__close,.offcanvas__overlay").on("click", function () {
		$(".offcanvas__info").removeClass("info-open");
		$(".offcanvas__overlay").removeClass("overlay-open");
	});
	$(".sidebar__toggle").on("click", function () {
		$(".offcanvas__info").addClass("info-open");
		$(".offcanvas__overlay").addClass("overlay-open");
	});

	/*======================================
	Body overlay Js
	========================================*/
	$(".body-overlay").on("click", function () {
		$(".offcanvas__area").removeClass("opened");
		$(".body-overlay").removeClass("opened");
	});

	/*======================================
	Sticky Header Js
	========================================*/
	var lastScrollTop = 200;
	$(window).scroll(function (event) {
		var scroll = $(this).scrollTop();
		if (scroll > lastScrollTop) {
			$('#header-sticky').addClass('sticky');
			$('#header-sticky2').addClass('sticky2');
		} else {
			$('#header-sticky').removeClass('sticky');
			$('#header-sticky2').removeClass('sticky2');
		}
	});

	/*======================================
	Data Css js
	========================================*/
	$("[data-background").each(function () {
		$(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
	});

	$("[data-width]").each(function () {
		$(this).css("width", $(this).attr("data-width"));
	});

	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));
	});

	/*======================================
	 Cart Quantity Js
	========================================*/
	$(".cart-minus").on("click",function () {
		var $input = $(this).parent().find("input");
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
		return false;
	});

	$(".cart-plus").on("click",function () {
		var $input = $(this).parent().find("input");
		var count = parseInt($input.val()) + 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
		return false;
	});


	/*======================================
	MagnificPopup image view
	========================================*/
	$('.popup-image').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});

	/*======================================
	MagnificPopup video view
	========================================*/
	$(".popup-video").magnificPopup({
		type: "iframe",
	});

	

	// Mouse Custom Cursor
	function itCursor() {
		var myCursor = jQuery(".mouseCursor");
		if (myCursor.length) {
			if ($("body")) {
				const e = document.querySelector(".cursor-inner"),
					t = document.querySelector(".cursor-outer");
				let n,
					i = 0,
					o = !1;
				(window.onmousemove = function (s) {
					o ||
						(t.style.transform =
							"translate(" + s.clientX + "px, " + s.clientY + "px)"),
						(e.style.transform =
							"translate(" + s.clientX + "px, " + s.clientY + "px)"),
						(n = s.clientY),
						(i = s.clientX);
				}),
					$("body").on("mouseenter", "button, a, .cursor-pointer, .ms-round-dots ul li", function () {
						e.classList.add("cursor-hover"), t.classList.add("cursor-hover");
					}),
					$("body").on("mouseleave", "button, a, .cursor-pointer, .ms-round-dots ul li", function () {
						($(this).is("a", "button") &&
							$(this).closest(".cursor-pointer").length) ||
							(e.classList.remove("cursor-hover"),
								t.classList.remove("cursor-hover"));
					}),
					(e.style.visibility = "visible"),
					(t.style.visibility = "visible");
			}
		}
	}
	itCursor();

	$(".slider-drag").on("mouseenter", function () {
		$(".mouseCursor").addClass("cursor-big");
	});
	$(".slider-drag").on("mouseleave", function () {
		$(".mouseCursor").removeClass("cursor-big");
	});


	// Nice Select Js
	$(".ms-nice-select").niceSelect();

	var bd_rtl = localStorage.getItem('ms_dir');
	let rtl_setting = bd_rtl == 'rtl' ? true : false;

	/*======================================
	Song Active Js
	========================================*/
	var msSongActive = new Swiper(".ms-song-active", {
		rtl: rtl_setting,
		spaceBetween: 25,
		loop: false,
		slidesPerView: 7,
		autoplay: true,
		speed: 6000,
		autoplay: {
			pauseOnMouseEnter: true,
			disableOnInteraction: false,
		},
		breakpoints: {
			1800: {
				slidesPerView: 7
			},
			1600: {
				slidesPerView: 6
			},
			1400: {
				slidesPerView: 5
			},
			1200: {
				slidesPerView: 5
			},
			992: {
				slidesPerView: 4
			},
			768: {
				slidesPerView: 3
			},
			576: {
				slidesPerView: 2
			},
			450: {
				slidesPerView: 2
			},
			0: {
				slidesPerView: 1
			},
		},
	});

	var msSong2Active = new Swiper(".ms-song2-active", {
		rtl: rtl_setting,
		loop: false,
		spaceBetween: 30,
		slidesPerView: 5,
		autoplay: true,
		speed: 6000,
		breakpoints: {
			1800: {
				slidesPerView: 5
			},
			1600: {
				slidesPerView: 6
			},
			1400: {
				slidesPerView: 5
			},
			1200: {
				slidesPerView: 5
			},
			992: {
				slidesPerView: 4
			},
			768: {
				slidesPerView: 3
			},
			576: {
				slidesPerView: 2
			},
			450: {
				slidesPerView: 2
			},
			0: {
				slidesPerView: 1
			},
		},
	});

	/*======================================
	Popular Active Js
	========================================*/
	var msPopularActive = new Swiper(".ms-popular-active", {
		rtl: rtl_setting,
		loop: false,
		spaceBetween: 25,
		slidesPerShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		speed: 6000,
		observeParents: true,
		observer: true,
		breakpoints: {
			1200: {
				slidesPerView: 4
			},
			992: {
				slidesPerView: 3
			},
			768: {
				slidesPerView: 2
			},
			576: {
				slidesPerView: 2
			},
			0: {
				slidesPerView: 1
			},
		},
	});

	var msPopular2Active = new Swiper(".ms-popular2-active", {
		rtl: rtl_setting,
		loop: true,
		spaceBetween: 25,
		slidesPerShow: 6,
		slidesToScroll: 1,
		autoplay: true,
		speed: 6000,
		observeParents: true,
		observer: true,
		breakpoints: {
			1800: {
				slidesPerView: 6
			},
			1600: {
				slidesPerView: 5
			},
			1400: {
				slidesPerView: 4
			},
			1200: {
				slidesPerView: 4
			},
			992: {
				slidesPerView: 3
			},
			768: {
				slidesPerView: 2
			},
			576: {
				slidesPerView: 2
			},
			0: {
				slidesPerView: 1
			},
		},
	});



	/*======================================
	Text Scroll Active Js
	========================================*/
	var msTextScroll = new Swiper(".ms-st-active", {
		rtl: rtl_setting,
		loop: true,
		spaceBetween: 0,
		slidesPerView: "auto",
		autoplay: true,
		simulateTouch: false,
		autoplay: {
			delay: 0,
			disableOnInteraction: true
		},
		speed: 6000,
	});

	var msTextScrollRevers = new Swiper(".ms-str-active", {
		rtl: rtl_setting,
		loop: true,
		spaceBetween: 0,
		slidesPerView: "auto",
		autoplay: true,
		simulateTouch: false,
		autoplay: {
			delay: 0,
			disableOnInteraction: true,
			reverseDirection: true,
		},
		speed: 6000,
	});


	/*======================================
	Event Active Js
	========================================*/
	$(".ms-event-active").slick({
		infinite: true,
		speed: 4000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		arrows: false,
		vertical: true,
		verticalSwiping: true,
		dots: true,
		appendDots: $('.ms-event-dots'),
	});

	/*======================================
	Testimonial Active Js
	========================================*/
	$(".ms-tm-active").slick({
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		arrows: false,
		dots: true,
		rtl: rtl_setting,
		appendDots: $('.ms-tm-dots'),
	});

	$(".ms-tm2-active").slick({
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		arrows: false,
		dots: true,
		rtl: rtl_setting,
		appendDots: $('.ms-tm2-dots'),
	});

	/*======================================
	Partner Active Js
	========================================*/
	var msPartnerActive = new Swiper(".ms-partner-active", {
		rtl: rtl_setting,
		loop: false,
		spaceBetween: 45,
		slidesPerView: 5,
		slidesToScroll: 1,
		autoplay: true,
		speed: 5000,
		observeParents: true,
		observer: true,
		breakpoints: {
			1600: {
				slidesPerView: 5
			},
			1400: {
				slidesPerView: 5
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 70,
			},
			992: {
				slidesPerView: 4
			},
			768: {
				slidesPerView: 3
			},
			576: {
				slidesPerView: 2
			},
			0: {
				slidesPerView: 1
			},
		},
	});



	/*======================================
	Navigation Active Js
	========================================*/
	$(".ms-ns-active").slick({
		speed: 5000,
		autoplay: true,
		autoplaySpeed: 0,
		centerMode: true,
		cssEase: 'linear',
		dots: false,
		arrows: false,
		speed: 3000,
		slidesToScroll: 1,
		variableWidth: true,
		draggable: false,
		rtl: rtl_setting
	});

	/*======================================
	News 3 Active Js
	========================================*/
	$(".ms-news3-active").slick({
		speed: 7000,
		autoplay: true,
		autoplaySpeed: 0,
		centerMode: true,
		cssEase: 'linear',
		dots: false,
		arrows: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		pauseOnHover:true,
		rtl: rtl_setting,
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					centerMode: false,
					slidesToShow: 1,
				},
			},
		],
	});

	var msTrending = new Swiper(".ms-trending-active",
		{
			rtl: rtl_setting,
			loop: false,
			slidesPerView: 4,
			slidesToScroll: 1,
			spaceBetween: 24,
			autoplay: true,
			speed: 6000,
			observeParents: true,
			observer: true,
			breakpoints: {
				1600: { slidesPerView: 4, },
				1400: { slidesPerView: 3, },
				1200: { slidesPerView: 3, },
				992: { slidesPerView: 2, },
				768: { slidesPerView: 2, },
				576: { slidesPerView: 2, },
				450: { slidesPerView: 1, },
				0: { slidesPerView: 1, },
			},
		})

	/*======================================
	Event Like Slider Js
	========================================*/
	var msLikeActive = new Swiper(".ms-like-active", {
		slidesPerView: 2,
		spaceBetween: 30,
		loop: true,
		rtl: rtl_setting,
		navigation: {
			nextEl: ".ms-like-next",
			prevEl: ".ms-like-prev",
		},
		breakpoints: {
			1600: { slidesPerView: 2, },
			1400: { slidesPerView: 2, },
			1200: { slidesPerView: 2, },
			992: { slidesPerView: 1, },
			768: { slidesPerView: 1, },
			576: { slidesPerView: 1, },
			0: { slidesPerView: 1, },
		},
	});

	/*======================================
	Paralax js
	========================================*/
	var b = document.getElementsByTagName("BODY")[0];

	b.addEventListener("mousemove", function (event) {
		parallaxed(event);

	});

	function parallaxed(e) {
		var amountMovedX = (e.clientX * -0.3 / 8);
		var amountMovedY = (e.clientY * -0.3 / 8);
		var x = document.getElementsByClassName("parallaxed");
		var i;
		for (i = 0; i < x.length; i++) {
			x[i].style.transform = 'translate(' + amountMovedX + 'px,' + amountMovedY + 'px)'
		}
	}

	// Model Show And Hide
	$('.ms-model-close').on('click', function () {
		$('#ms-model').modal('hide');
	});
	$('.ms-model-show').on('click', function (e) {
		$('#ms-model').modal('show');
		e.preventDefault();
	});

	$('.ms-model2-close').on('click', function () {
		$('#ms-model2').modal('hide')
	});
	$('.ms-model2-show').on('click', function () {
		$('#ms-model2').modal('show')
	});

	// Date Picker 
	$(".ms-datepicker").datepicker();

	// gsap activation 
	gsap.registerPlugin(ScrollTrigger);
	

	/*----------------------------------------
	Title Animation
	-----------------------------------------*/
	let splitTitleLines = gsap.utils.toArray(".bd-title-anim");

	splitTitleLines.forEach((splitTextLine) => {
	const tl = gsap.timeline({
		scrollTrigger: {
		trigger: splitTextLine,
		start: "top 90%",
		end: "bottom 60%",
		// scrub: true,
		markers: false,
		toggleActions: "play none none none",
		},
	});

	const itemSplitted = new SplitText(splitTextLine, {
		type: "words, lines",
	});
	gsap.set(splitTextLine, {
		perspective: 400
	});
	itemSplitted.split({
		type: "lines"
	});
	tl.from(itemSplitted.lines, {
		duration: 1,
		delay: 0.3,
		opacity: 0,
		rotationX: -80,
		force3D: true,
		transformOrigin: "top center -50",
		stagger: 0.1,
	});
	});

	// 14. fade_up
	gsap.set(".bdFadeUp", {
	y: 50,
	opacity: 0,
	});
	const fadeArray = gsap.utils.toArray(".bdFadeUp");
	fadeArray.forEach((item, i) => {
	let fadeTl = gsap.timeline({
		scrollTrigger: {
		trigger: item,
		start: "top bottom-=150",
		},
	});
	fadeTl.to(item, {
		y: 0,
		opacity: 1,
		ease: "power2.out",
		duration: 1,
	});
	});

	// Accordion-fix JS
	
	if ($('.bd-accordion-fix').length > 0) {
		ScrollTrigger.create({
			trigger: ".bd-accordion-fix",
			start: "top top",
			end: "+=0",
			pin: true,
			pinSpacing: "margin"
		})
	}

	// Tab fix JS
	if ($('.bd-tabs-fix').length > 0){
		ScrollTrigger.create({
			trigger: ".bd-tabs-fix",
			start: "top top",
			end: "+=50",
			pin: true,
			pinSpacing: "margin"
		})
	}

	if ($('.bd-shaking-fix').length > 0) {
		ScrollTrigger.create({
			trigger: ".bd-shaking-fix",
			start: "top top",
			end: "+=50",
			pin: true,
			pinSpacing: "margin",
		})
	}



	// jPlayer js 
	new jPlayerPlaylist(
		{
		  jPlayer: "#jquery_jplayer_1",
		  cssSelectorAncestor: "#jp_container_1"
		},
		[
		  {
			title: "Cro Magnon Man",
			mp3: "http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
			oga: "http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg"
		  },
		  {
			title: "Your Face",
			mp3: "http://www.jplayer.org/audio/mp3/TSP-05-Your_face.mp3",
			oga: "http://www.jplayer.org/audio/ogg/TSP-05-Your_face.ogg"
		  },
		  {
			title: "Cyber Sonnet",
			mp3: "http://www.jplayer.org/audio/mp3/TSP-07-Cybersonnet.mp3",
			oga: "http://www.jplayer.org/audio/ogg/TSP-07-Cybersonnet.ogg"
		  },
		  {
			title: "Tempered Song",
			mp3: "http://www.jplayer.org/audio/mp3/Miaow-01-Tempered-song.mp3",
			oga: "http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg"
		  },
		  {
			title: "Hidden",
			mp3: "http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
			oga: "http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg"
		  },
		  {
			title: "Lentement",
	  
			mp3: "http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
			oga: "http://www.jplayer.org/audio/ogg/Miaow-03-Lentement.ogg"
		  },
		  {
			title: "Lismore",
			mp3: "http://www.jplayer.org/audio/mp3/Miaow-04-Lismore.mp3",
			oga: "http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
		  },
		  {
			title: "The Separation",
			mp3: "http://www.jplayer.org/audio/mp3/Miaow-05-The-separation.mp3",
			oga: "http://www.jplayer.org/audio/ogg/Miaow-05-The-separation.ogg"
		  },
		  {
			title: "Beside Me",
			mp3: "http://www.jplayer.org/audio/mp3/Miaow-06-Beside-me.mp3",
			oga: "http://www.jplayer.org/audio/ogg/Miaow-06-Beside-me.ogg"
		  },
		  {
			title: "Bubble",
	  
			mp3: "http://www.jplayer.org/audio/mp3/Miaow-07-Bubble.mp3",
			oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
		  },
		  {
			title: "Stirring of a Fool",
			mp3: "http://www.jplayer.org/audio/mp3/Miaow-08-Stirring-of-a-fool.mp3",
			oga: "http://www.jplayer.org/audio/ogg/Miaow-08-Stirring-of-a-fool.ogg"
		  },
		  {
			title: "Partir",
	  
			mp3: "http://www.jplayer.org/audio/mp3/Miaow-09-Partir.mp3",
			oga: "http://www.jplayer.org/audio/ogg/Miaow-09-Partir.ogg"
		  }
		],
		{
		  playlistOptions: {
			autoPlay: false,
		  },
		  swfPath: "src/swf/",
		  solution: "html, flash",
		  supplied: "mp3",
		  preload: "auto",
		  wmode: "window",
		  useStateClassSkin: true,
		  autoBlur: false,
		  smoothPlayBar: true,
		  keyEnabled: true,
		  stop: function(e) {
			$(".toggle-play").removeClass("active");
			$(".waves").fadeOut();
		  },
		  pause: function(e) {
			$(".toggle-play").removeClass("active");
			$(".waves").fadeOut();
		  },
		  play: function(e) {
			$(".toggle-play").addClass("active");
			$(".waves").fadeIn();
		  },
		  ready: function(e) {}
		}
	  );
	  $(".toggle-list").bind("click", function() {
		if (!$("body").hasClass("active")) {
		  $("body").addClass("active");
		} else {
		  $("body").removeClass("active");
		}
	  });
	  $(window).on("load", function() {
		$("#jquery_jplayer_1").jPlayer("play");
	  });
	  
	  $(".toggle-play").on("click", function() {
		if (!$(".jp-audio").hasClass("jp-state-playing")) {
		  $("#jquery_jplayer_1").jPlayer("play");
		} else {
		  $("#jquery_jplayer_1").jPlayer("stop");
		}
	  });
	  




})(jQuery);



