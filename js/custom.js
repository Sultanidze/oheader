$(document).ready(function(){
	// stick header
	$("#headerNew").stick_in_parent();

	// menu hiding/appearance
	var  $mainMenu = $("#mainMenu")
		,$menuBtn = $("#menuBtn")
		,$closeIcon = $menuBtn.find(".b-icon_bars")
		,$openIcon = $menuBtn.find(".fa-times")
		;
	var menuBtnToggle = function(){
		if ($mainMenu.hasClass("opened")){
			$closeIcon.fadeOut(200);
			$openIcon.fadeIn(200);
		} else {
			$openIcon.fadeOut(200);
			$closeIcon.fadeIn(200);
		}
	};
	var closeMenu = function(){
		$mainMenu.slideUp(200);
		$mainMenu.removeClass("opened");
		menuBtnToggle();
	};
	$menuBtn.on("click", function(){
		$mainMenu.slideToggle(200);
		$mainMenu.toggleClass("opened");
		menuBtnToggle();
		if ($mainMenu.hasClass("opened")){
			var startCoor = $mainMenu.offset().top;
			var menuScrollHandler = function (){
				var currentCoor = $mainMenu.offset().top;

				if (Math.abs(currentCoor - startCoor) >= 100){
					closeMenu();
					$(document).off("scroll", menuScrollHandler);
				}
			}
			$(document).on("scroll", menuScrollHandler);
		}
	});

	$mainMenu.find(".js-menu__close").on("click", closeMenu);
	
});