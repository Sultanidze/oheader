$(document).ready(function(){
	"use strict"

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
						console.log("sdfsdff")
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

	// rating and specials sliders
	var sliders = (function(){
		var obj = {};

		obj.settingsRating = {
			arrows: false,
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
		obj.$slidersRating = $(".js-slider__string_rating");
		obj.slidersRatingInit = function(){
			obj.$slidersRating.slick(obj.settingsRating);
		};

		obj.settingsSpecials = {
			arrows: false,
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
		obj.$slidersSpecials = $(".js-slider__string_specials");
		obj.slidersSpecialsInit = function(){
			obj.$slidersSpecials.slick(obj.settingsSpecials);
		};

		obj.init = function(){
			obj.slidersRatingInit();
			obj.slidersSpecialsInit();
		}

		return obj;	// return object with menu methods and buttons
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

	// executable part
	header.init();	// header module init
	indexContents.linkInit();	// content links functionality
	sliders.init();	// footer module init
	footer.init();	// footer module init

	seoMap.init();	// footer module init
});