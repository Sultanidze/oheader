$(document).ready(function(){

	// menu module
	var menu = (function(){
		"use strict"
		var obj = {};	// module returned object

		obj.headerStick = function(){
			// stick header in top of window
			$("#headerWrapper").stick_in_parent();
		};

		// menu hiding/appearance
		obj.$mainMenu = $("#mainMenu");
		obj.$menuBtn = $("#menuBtn");
		obj.$closeIcon = obj.$menuBtn.find(".b-icon_bars");
		obj.$openIcon = obj.$menuBtn.find(".fa-times");
		obj.menuHeight = obj.$mainMenu.outerHeight();

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
			obj.$mainMenu.css("top", "100%");
			obj.$mainMenu.animate({
				height: obj.menuHeight
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
		};

		obj.init = function(){
			obj.headerStick();	// stick header
			obj.menuToggler();	// menu open/close functionality 
		}

		return obj;	// return object with menu methods and buttons
	})();
	// menu module end

	// footer module
	var footer = (function(){
		"use strict"
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
	(function(){
		var settingsRating = {
			arrows: false,
			infinite: true,
			speed: 400,
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplay: true,
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

		var $slidersRating = $(".js-slider__string_rating").slick(settingsRating);

		var settingsSpecials = {
			arrows: false,
			infinite: true,
			speed: 400,
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
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

		var $slidersSpecials = $(".js-slider__string_specials").slick(settingsSpecials);
		
	})();


	// seoMap module
	var seoMap = (function(){
		"use strict"
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

		return obj;	// return object with menu methods and buttons
	})();

 //    function scrollToSection($link, e) {
 //        e.preventDefault();
 //        var 
 //             link = $el.attr('href')
 //            ,$target = $(link)
 //            ,offset = top_offset
 //            ;

 //        if ($(window).width() <= breakpoint) {
 //            offset = 0;
 //        }
 //        $('html,body').animate({ scrollTop: $target.offset().top - offset }, 500, 'swing');
 //    }

	// // index section links scroll functionality
	// (function(){
	// 	var sectionLinks = $();

	// });

	// executable part
	menu.init();	// menu module init
	footer.init();	// footer module init
	seoMap.init();	// footer module init
});