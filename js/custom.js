$(document).ready(function(){
	// stick header in top of window
	$("#headerWrapper").stick_in_parent();

	// menu functionality
	(function(){
		"use strict"
		// menu hiding/appearance
		var  $mainMenu = $("#mainMenu")
			,$menuBtn = $("#menuBtn")
			,$closeIcon = $menuBtn.find(".b-icon_bars")
			,$openIcon = $menuBtn.find(".fa-times")
			,menuHeight = $mainMenu.outerHeight();
			;
		// menu btn icon toggle
		var menuBtnToggle = function(){
			if ($mainMenu.hasClass("opened")){
				$closeIcon.fadeOut(200);
				$openIcon.fadeIn(200);
			} else {
				$openIcon.fadeOut(200);
				$closeIcon.fadeIn(200);
			}
		};
		// menu open
		var openMenu = function(){
			$mainMenu.css("top", "100%");
			$mainMenu.animate({
				height: menuHeight
			}, 200);
			$mainMenu.addClass("opened");
			menuBtnToggle();
		};
		// menu close
		var closeMenu = function(){
			$mainMenu.animate({
				height: "0"
			}, 200, function(){
				$mainMenu.css("top", "-9999px");
			});
			$mainMenu.removeClass("opened");
			menuBtnToggle();
		};
		// menu close after some scroll
		var closeAfterScroll = function(){
			var  SCROLL_VAL_PX = 100	// close after 100px scroll
				,startCoor = $mainMenu.offset().top
				;

			var menuScrollHandler = function (){
				var currentCoor = $mainMenu.offset().top;

				if (Math.abs(currentCoor - startCoor) >= SCROLL_VAL_PX){
					closeMenu();
					$(document).off("scroll", menuScrollHandler);
				}
			}
			$(document).on("scroll", menuScrollHandler);
		};

		// open/close menue on mouseenter event
		$menuBtn.on("mouseenter click", function(){
			if ($mainMenu.hasClass("opened")){
				closeMenu();
			} else {
				openMenu();
			};
			if ($mainMenu.hasClass("opened")){
				closeAfterScroll();
			}
		});
		// close menu after click on close btn
		$mainMenu.find(".js-menu__close").on("click", closeMenu);
		
		// mobile Footer accordion
		var $accordionTriggers = $("footer").find(".js-accordion__trigger");
		var $accordionContents = $("footer").find(".js-accordion__content");
		$accordionTriggers.on("click", function(){
			var  $trigger = $(this)
				,$content = $trigger.siblings(".js-accordion__content")
				;
			// close all opened accordion items except of clicked
			$accordionContents.each(function(){
				if (($(this)[0] !== $content[0])&&($(this).parent().hasClass("opened"))){
					console.log("sdfsdff")
					$(this).slideUp(200);
					$(this).parent().removeClass("opened");
				}
			});
			$content.slideToggle(200);
			$trigger.parent().toggleClass("opened");
		});
	})();
	// menu functionality end

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

	// seoMap links click
	(function(){
		var  $map = $("#seoMap")
			,$links = $map.find(".js-link_region")
			,$titles = $links.find(".js-title")
			;

		$links.on("click", function(){
			return false;
		});

		$titles.on("click", function(){
			var $link = $(this).parent(".js-link_region");
			window.open($link.attr("href"), $link.attr("target"));
		});

	})();

 //    function scrollToSection($link, e) {
 //        e.preventDefault();
 //        var 
 //             link = $el.attr('href'),
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
});