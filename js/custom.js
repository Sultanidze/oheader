$(document).ready(function(){
	// stick header in top of window
	$("#headerNew").stick_in_parent();

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
	$menuBtn.on("mouseenter", function(){
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
	$("footer").find(".js-accordion__trigger").on("click", function(){
		$(this).siblings(".js-accordion__content").slideToggle(200);
		$(this).parent().toggleClass("opened");
	});
});