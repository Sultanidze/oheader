$(document).ready(function(){
	"use strict"
	var $window = $(window);

	// header module
	var header = (function(){
		var obj = {};	// module returned object

		// menu hiding/appearance
		obj.$header = $("#headerWrapper");	// header
		// obj.headerHeight = obj.$header.outerHeight();
		obj.$mainMenu = $("#mainMenu");		// menu
		// obj.menuHeight = obj.$mainMenu.outerHeight();
		obj.$menuBtn = $("#menuBtn");		
		obj.$closeIcon = obj.$menuBtn.find(".b-icon_bars");
		obj.$openIcon = obj.$menuBtn.find(".fa-times");

		// stick header in top of window
		obj.headerStick = function(){
			obj.$header.stick_in_parent();
		};

		// menu btn icon toggle
		obj.menuBtnToggle = function(){
			if (obj.$mainMenu.hasClass("opened")){
				obj.$closeIcon.fadeOut(200);
				obj.$openIcon.fadeIn(200);
			} else {
				obj.$openIcon.fadeOut(200);
				obj.$closeIcon.fadeIn(200);
			}
		};
		// menu open
		obj.openMenu = function(){
			var  $menuList = obj.$mainMenu.children("ul")
				,$menuCallback = obj.$mainMenu.children(".js-btn_callback")
				,height = $menuList.outerHeight() + ($menuCallback.is(":visible")?$menuCallback.outerHeight():0)
				;

			obj.$mainMenu.css("top", "100%");
			obj.$mainMenu.animate({
				height: height
			}, 200);
			obj.$mainMenu.addClass("opened");
			obj.menuBtnToggle();
		};
		// menu close
		obj.closeMenu = function(){
			obj.$mainMenu.animate({
				height: "0"
			}, 200, function(){
				obj.$mainMenu.css("top", "-9999px");
			});
			obj.$mainMenu.removeClass("opened");
			obj.menuBtnToggle();
		};
		// menu close after some scroll
		obj.closeAfterScroll = new function(){
			var  o = this
				,startCoor
				;

			o.SCROLL_VAL_PX = 100;	// close after 100px scroll

			o.menuScrollHandler = function (){
				var currentCoor = obj.$mainMenu.offset().top;

				if (Math.abs(currentCoor - startCoor) >= o.SCROLL_VAL_PX){
					obj.closeMenu();
					$(document).off("scroll", o.menuScrollHandler);
				}
			}
			o.init = function(){
				startCoor = obj.$mainMenu.offset().top;
				$(document).on("scroll", o.menuScrollHandler);
			};
		};

		obj.menuToggler = function(){
			// open/close menu on mouseenter event
			obj.$menuBtn.on("mouseenter click", function(){
				if (obj.$mainMenu.hasClass("opened")){
					obj.closeMenu();
				} else {
					obj.openMenu();
				};
				if (obj.$mainMenu.hasClass("opened")){
					obj.closeAfterScroll.init();
				}
			});
			// close menu after click on close btn
			obj.$mainMenu.find(".js-menu__close").on("click", obj.closeMenu);

			$(window).on("resize", function(){	// close menu - prevent visible menu height overflow
				obj.closeMenu();
			});
		};

		obj.init = function(){
			obj.headerStick();	// stick header
			obj.menuToggler();	// menu open/close functionality 
		}

		return obj;	// return object with menu methods and buttons
	})();

	// index contents module
	var indexContents = (function(){
		var obj = {};

		obj.contents = $("#indexContents");
		obj.sectionLinks = obj.contents.find(".js-contents__link")

		obj.scrollToSection = function($link, e){
			e.preventDefault();
	        var 
	             sAnchor = $link.attr('href')
	            ,$target = $(sAnchor)
	            ,offset = header.$header.outerHeight();
	            ;

	        $('html,body').animate({ scrollTop: $target.offset().top - offset }, 500, 'swing');
		}

		obj.linkInit = function(){
			obj.sectionLinks.on("click", function(e){
				obj.scrollToSection($(this), e);
			})
		}

		return obj;
	})();

	// footer module
	var footer = (function(){
		var obj = {};	// module returned object

		// mobile Footer accordion
		obj.$accordionTriggers = $("footer").find(".js-accordion__trigger");
		obj.$accordionContents = $("footer").find(".js-accordion__content");

		obj.mobileAccordion = function() {
			obj.$accordionTriggers.on("click", function(){
				var  $trigger = $(this)
					,$content = $trigger.siblings(".js-accordion__content")
					;
				// close all opened accordion items except of clicked
				obj.$accordionContents.each(function(){
					if (($(this)[0] !== $content[0])&&($(this).parent().hasClass("opened"))){
						$(this).slideUp(200);
						$(this).parent().removeClass("opened");
					}
				});
				$content.slideToggle(200);
				$trigger.parent().toggleClass("opened");
			});
		}

		obj.init = function(){
			obj.mobileAccordion();	// mobile footer accordion functionality
		}

		return obj;	// return object with menu methods and buttons
	})();

	// sliders module
	var sliders = (function(){
		var obj = {};

		obj.rating = {};	// rating slider object - contains '$slider' and 'settings' fields
		obj.rating.settings = {
			arrows: true,
			// prevArrow: '$(this).parent().siblings(".js-slider_left")',
			// nextArrow: '$(this).parent().siblings(".js-slider_right")',
			infinite: true,
			speed: 400,
			slidesToShow: 3,
			slidesToScroll: 1,
			// autoplay: true,
			autoplaySpeed: 4400,
			responsive: [
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1
				  }
				}
			]
		};
		obj.rating.$section = $("#rating");
		obj.rating.$slider = obj.rating.$section.find(".js-slider__string");	// two objects
		// obj.rating.$prevBtn = obj.rating.$slider.parent().siblings(".js-slider_left");
		// obj.rating.$nextBtn = obj.rating.$slider.parent().siblings(".js-slider_right");

		// slider settings object extend function
		function addBtnsSettings(oSlider){
			var 
				 t = this
				,settings = {}
				;

			settings.prevArrow = $(t).parent().siblings(".js-slider_left");
			settings.nextArrow = $(t).parent().siblings(".js-slider_right");

			return	jQuery.extend(settings, oSlider.settings);
		};
		// init slider function
		function init(oSlider){
			oSlider.$slider.each(function(){
				$(this).slick(addBtnsSettings.call(this, oSlider))
			});
		};
		// init rating slider function
		obj.rating.init = function(){
		// 	// obj.rating.$slider.slick(function(){
		// 	// 	var 
		// 	// 		 t = this
		// 	// 		,settings = {}
		// 	// 		;

		// 	// 	settings.prevArrow = $(t).parent().siblings(".js-slider_left");
		// 	// 	settings.nextArrow = $(t).parent().siblings(".js-slider_right");

		// 	// 	return	jQuery.extend(settings, obj.rating.settings);	
		// 	// }.call(obj.rating.$slider));
		// 	obj.rating.$slider.each(function(){
		// 		$(this).slick(addBtnsSettings.call(this, obj.rating))
		// 	});
			init(obj.rating);
		};

		obj.specials = {};
		obj.specials.settings = {
			arrows: true,
			infinite: true,
			speed: 400,
			slidesToShow: 2,
			slidesToScroll: 1,
			// autoplay: true,
			autoplaySpeed: 4400,
			responsive: [
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1
				  }
				}
			]
		};
		obj.specials.$section = $("#specials");	
		obj.specials.$slider = obj.specials.$section.find(".js-slider__string");
		obj.specials.init = function(){
			init(obj.specials);
		};

		obj.init = function(){
			obj.rating.init();
			obj.specials.init();
		}

		return obj;	// return object with menu methods and buttons
	})();

	// tabs module (in Rating, Specials)
	var tabs = (function(){
		// tabs init function
		function init(oTabbed){
			var sActiveTabClass = "b-btn_active js-tab_active";
			oTabbed.$contents.each(function(){
				if (!$(this).hasClass("js-content_active")){
					
					$(this).css("display", "none").removeClass("hidden");
				}
			});
			oTabbed.$tabs.on("click", function(){
				if ($(this).hasClass("js-tab_active")){
					return false	// if active tab clicked do nothing
				};
				
				if (!oTabbed.$contents.is(":animated")){
					var index = oTabbed.$tabs.index(this);	// index of clicked tab

					oTabbed.$tabs.removeClass(sActiveTabClass);
					$(this).addClass(sActiveTabClass);

					oTabbed.$contents.filter(".js-content_active").fadeOut(400).promise().done(function(){
						var $slider = oTabbed.$contents.eq(index).find(".js-slider__string");	// slider inside
						console.log($slider)

						oTabbed.$contents.eq(index).addClass("js-content_active").fadeIn({
							duration: 400,
							progress: function(){
								if ($slider.length){
									$slider.slick('setPosition'); // prevent hidden slider broken sizes when visible
								}
							}
						});
					});
				}
			});
		}
		
		var obj = {};

		obj.rating = {};
		// obj.rating.$section = $("#rating");
		obj.rating.$section = sliders.rating.$section;
		obj.rating.$tabsBlock = obj.rating.$section.find(".js-tabsBlock");
		obj.rating.$tabs = obj.rating.$tabsBlock.find(".js-tab");
		obj.rating.$contentsBlock = obj.rating.$section.find(".js-tabContentsBlock");
		obj.rating.$contents = obj.rating.$section.find(".js-content");
		obj.rating.init = function(){
			init(obj.rating);
		};

		obj.specials = {};
		obj.specials.$section = sliders.specials.$section;
		obj.specials.$tabsBlock = obj.specials.$section.find(".js-tabsBlock");
		obj.specials.$tabs = obj.specials.$tabsBlock.find(".js-tab");
		obj.specials.$contentsBlock = obj.specials.$section.find(".js-tabContentsBlock");
		obj.specials.$contents = obj.specials.$section.find(".js-content");
		obj.specials.init = function(){
			init(obj.specials);
		};

		obj.init = function(){
			obj.rating.init();	// rating tabs init
			obj.specials.init();// specials tabs init
		}

		return obj;
	})();

	// seoMap module
	var seoMap = (function(){
		var obj = {};	// module returned object

		obj.$map = $("#seoMap");
		obj.$links = obj.$map.find(".js-link_region");
		obj.$titles = obj.$links.find(".js-title");
		
		// prevent regions links default functionality
		obj.regionClick = function(){
			obj.$links.on("click", function(){
				return false;
			});
		};

		// open links when click title
		obj.regionTitleClick = function(){
			obj.$titles.on("click", function(){
				if ($(this).hasClass("js-title_active")){
					return false;
				}
				var $link = $(this).parent(".js-link_region");
				window.open($link.attr("href"), $link.attr("target"));
			});
		};

		obj.init = function(){
			obj.regionClick();
			obj.regionTitleClick();
		}

		return obj;	// return module object
	})();

	// responces slider
	var responces = (function(){
		var obj = {};

		obj.$section = $("#responses");

		obj.$slider = obj.$section.find(".b-slider_responses");

		var  $slideResp = obj.$slider.find(".b-slide_responses")
			,$respFedbBtn = obj.$section.children(".js-btns_category")
			,$responsesBtn = $respFedbBtn.children(".js-btn_responses")
			,$feedbackBtn = $respFedbBtn.children(".js-btn_feedback")
			,$sliderRespControlBtn = obj.$slider.find(".b-slider__control_responses")
			,$sliderRespPrevBtn = obj.$slider.find(".b-slider__controls_responses .b-slider__control_left")
			,$sliderRespNextBtn = obj.$slider.find(".b-slider__controls_responses .b-slider__control_right")
			,$activeSlide = $slideResp.filter(".b-slide_active")
			,$unactiveSlide = $slideResp.filter(":not(.b-slide_active)")
			,$slidesContent = $("#slides").children()	// знаходимо відгуки в прихованому блоці
			,slidesArray = []	// масив з html відгуків
			,responseNum	// зберігає індекс останнього завантаженого відгуку
			,bPrevNext		// чи попередній напрямок запитів "Наступний слайд"
			,widthContainerCss = obj.$slider.outerWidth()	// initial width for desctop
			,widthSlideCss = $activeSlide.outerWidth()	// initial width for desctop
			,widthContainer
			,widthSlide
			,diff	// widthContainer - widthSlide
			;

		obj.slidesInit = function(){
			// initial slides content
			$slidesContent.each(function(index, element){	// заповнюємо масив html відгуків
				slidesArray.push($(element).html())
			});
			// наповнимо слайди початковим контенотом
			$slideResp.eq(0).find(".b-slide__side_front .b-slide__wrap").html(slidesArray[1]);			
			$slideResp.eq(1).find(".b-slide__side_front .b-slide__wrap").html(slidesArray[0]);
			responseNum = 1;	// 2й відгук завантажували останнім
			bPrevNext =true;	// порядок завантаження слайдів був прямий

			// active slide initial position
			$window.on("resize", function(){
				activeSlidePosition();
			}).trigger("resize");
		};

		var  
			activeSlidePosition = function(){
				$activeSlide = $slideResp.filter(".b-slide_active");
				$unactiveSlide = $slideResp.filter(":not(.b-slide_active)");
				$unactiveSlide.css("top", "0px");
				$unactiveSlide.css("left", "0px");
				
				widthContainer = obj.$slider.outerWidth();
				widthSlide = $activeSlide.outerWidth();
				diff = widthContainer - widthSlide;
				if (diff<0){
					widthSlide = widthContainer;
					$slideResp.css("width", widthContainer + "px")
					diff = 0;
				}
				
				$activeSlide.css("top", "30px");
				$activeSlide.css("left", diff + "px");
			}
			,moveLeft = function($slide, bNext){
				$slide.animate({
						top: 20,
						left: diff*1.1
					},	{
						duration: 200,
						easing: "linear",
						queue: "active",	// черга для анімації цього слайда
						done: function(){
							$(this).css("z-index", "-1")	// приберемо на задній фон
						}
					}
				);
				$slide.animate({
						top: 5,
						left: diff*0.99
					},	{
						duration: 200,
						easing: "linear",
						queue: "active"	// черга для анімації цього слайда
					}
				);
				$slide.animate({
						top: 2,
						left: diff*0.5
					},	{
						duration: 300,
						easing: "linear",
						queue: "active",	// черга для анімації цього слайда
						done: function(){
							// завантажимо новий контент слайда
							var $slideContent = $(this).find(".b-slide__side_front .b-slide__wrap");
							$slideContent.fadeOut(100);
							if(bNext){
								if(bPrevNext){
									// перевірка індекса масива перед інкрементом на 1
									if (responseNum == slidesArray.length-1){
										responseNum = 0
									} else {
										++responseNum;
									}
									$slideContent.html(slidesArray[responseNum]);	// відмальовуєм відгук з індексом responseNum
								} else {
									// перевірка індекса масива перед інкрементом на 2
									if (responseNum == slidesArray.length-1){
										responseNum = 1
									} else if (responseNum == slidesArray.length-2){
										responseNum = 0;
									} else {
										responseNum+=2;
									}
									$slideContent.html(slidesArray[responseNum]);
								}
								bPrevNext = true;
							} else {
								if(!bPrevNext){
									// перевірка індекса масива перед декрементом на 1
									if (responseNum == 0){
										responseNum = slidesArray.length - 1
									} else {
										--responseNum;
									}
									$slideContent.html(slidesArray[responseNum]);
								} else {
									// перевірка індекса масива перед декрементом на 2
									if (responseNum == 1){
										responseNum = slidesArray.length - 1
									} else if (responseNum == 0){
										responseNum = slidesArray.length - 2
									} else {
										responseNum-=2;
									}
									$slideContent.html(slidesArray[responseNum]);
								}
								bPrevNext = false;
							}
							
							$slideContent.fadeIn(100);
						}
					}
				);
				$slide.animate({
						top: 0,
						left: 0
					},	{
						duration: 300,
						easing: "linear",
						queue: "active",
						done: function(){
							$slideResp.toggleClass("b-slide_active");
						}
					}
				);
				$slide.dequeue("active");	// запустимо чергу
			}
			,moveRight = function($slide){
				$slide.animate({
						top: 40,
						left: -diff*0.1
					},	{
						duration: 200,
						easing: "linear",
						queue: "unactive",	// черга для анімації цього слайда
						done: function(){
							$(this).css("z-index", "4")
						}
					}
				);
				$slide.animate({
						top: 60,
						left: diff*0.01
					},	{
						duration: 200,
						easing: "linear",
						queue: "unactive"	// черга для анімації цього слайда
					}
				);
				$slide.animate({
						top: 30,
						left: diff
					},	{
						duration: 600,
						easing: "linear",
						queue: "unactive"
					}
				);
				$slide.dequeue("unactive");	// запустимо чергу
			}
			,reshuffle = function($active, $unActive, bNext){
				moveLeft($active, bNext);
				moveRight($unActive);
			};

		obj.sliderInit = function(){
			// sliderInit();
			$responsesBtn.click(function(){
				$respFedbBtn.removeClass("b-rating__btn_active");
				$responsesBtn.addClass("b-rating__btn_active");
				$activeSlide.removeClass("b-slide_rotated");	// rotate back if rotated
			});
			$feedbackBtn.click(function(){
				$respFedbBtn.toggleClass("b-rating__btn_active");
				$activeSlide = $slideResp.filter(".b-slide_active");
				if (!$activeSlide.is(":animated")) {
					$activeSlide.toggleClass("b-slide_rotated");
				}
			});

			$sliderRespControlBtn.click(function(){
				$activeSlide = $slideResp.filter(".b-slide_active");
				if ($activeSlide.hasClass("b-slide_rotated")){
					$feedbackBtn.trigger("click");
				}
			});
			$sliderRespPrevBtn.click(function(){
				$activeSlide = $slideResp.filter(".b-slide_active");
				$unactiveSlide = $slideResp.filter(":not(.b-slide_active)");
				if(!$activeSlide.is(":animated")){
					reshuffle($activeSlide, $unactiveSlide, false);
				}
			});
			$sliderRespNextBtn.click(function(){
				$activeSlide = $slideResp.filter(".b-slide_active");
				$unactiveSlide = $slideResp.filter(":not(.b-slide_active)");
				if(!$activeSlide.is(":animated")){
					reshuffle($activeSlide, $unactiveSlide, true);
				}
			});
		};

		obj.init = function(){
			obj.slidesInit();	// підвантаження слайдів з прихованого блока
			obj.sliderInit();
		}

		return obj;

	})();

	// executable part
	header.init();	// header module init
	indexContents.linkInit();	// content links functionality
	sliders.init();	// sliders module init
	tabs.init();	// tabs init
	responces.init();	// responses slider init
	footer.init();	// footer module init

	seoMap.init();	// seoMap module init
});