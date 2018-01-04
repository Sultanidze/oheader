$(document).ready(function(){
	"use strict"
	var $window = $(window);

	// header module
	var header = (function(){
		var obj = {};	// module returned object

		// menu hiding/appearance
		obj.$header = $("#headerWrapper");	// header
		obj.$mainMenu = $("#mainMenu");		// menu
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
			// open/close menu on click event
			obj.$menuBtn.on("click", function(){
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
		obj.rating.$section = $("#rating");
		obj.rating.$slider = obj.rating.$section.find(".js-slider__string");	// two objects

		// slider settings object extend function
		function addBtnsSettings(oSlider){
			var 
				 t = this
				,settings = {}
				;

			settings.prevArrow = $(t).parent().parent().find(".js-slider_left");
			settings.nextArrow = $(t).parent().parent().find(".js-slider_right");

			return	jQuery.extend(settings, oSlider.settings);
		};
		// init slider function
		function init(oSlider){
			oSlider.$slider.each(function(){
				// var t1 = this;
				$(this).slick(addBtnsSettings.call(this, oSlider));
				// $(window).on("resize", function(){
					// $(t1).slick('resize');
					// console.log("resizee");
				// });
			});
		};
		// init rating slider function
		obj.rating.init = function(){
			init(obj.rating);
		};

		obj.specials = {};
		obj.specials.settings = {
			arrows: true,
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
		obj.specials.$section = $("#specials");	
		obj.specials.$slider = obj.specials.$section.find(".js-slider__string");
		obj.specials.init = function(){
			init(obj.specials);
		};

		// test universal slider init
		obj.slider = {};
		obj.slider.settings = {
			arrows: true,
			infinite: false,
			speed: 400,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false,
			// autoplaySpeed: 4400,
			responsive: [
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1
				  }
				}
			]
		};
		obj.slider.$section = $(".js-slider");
		// console.log(obj.slider.$section);
		obj.slider.$slider = obj.slider.$section.find(".js-slider__string");
		// console.log(obj.slider.$slider);
		obj.slider.init = function(){
			init(obj.slider);
		};

		// slider in blog article
		obj.blogArticle = {};
		obj.blogArticle.settings = {
			arrows: true,
			infinite: false,
			speed: 400,
			slidesToShow: 2,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
				  }
				}
			]
		};
		obj.blogArticle.$section = $("#blogArticle");	
		obj.blogArticle.$slider = obj.blogArticle.$section.find(".js-slider__string");
		obj.blogArticle.init = function(){
			var  slides = obj.blogArticle.$slider.children()
				,slide = slides.filter(".js-centerSlide")	// desired first left visible slide
				,slideIndex = slides.index(slide);	// index of desired first left visible slide among the siblings
				
			init(obj.blogArticle);
			obj.blogArticle.$slider.slick('slickGoTo', slideIndex, true);	// make desired first left slide active
		};

		obj.init = function(){
			obj.rating.init();
			obj.specials.init();
			obj.blogArticle.init();

			obj.slider.init();	// test
		}

		return obj;	// return object with menu methods and buttons
	})();

	// tabs module (in Rating, Specials, Blog, Blog article)
	// tabs init function, sSelector - tabs and content parent selector
	var tabs = function (sSelector){	// this module has bug  "dont use more than 1 sSelector on 1 page"
			var  sActiveTabClass = "b-btn_active js-tab_active"
				,$parent = $(sSelector)
				,$tabsBlock = $parent.find(".js-tabsBlock")
				,$tabs = $tabsBlock.find(".js-tab")
				,$contentsBlock = $parent.find(".js-tabContentsBlock")
				,$contents = $parent.find(".js-content")
				;
			$contents.each(function(){
				if (!$(this).hasClass("js-content_active")){
					
					$(this).css("display", "none").removeClass("hidden");
				}
			});
			$tabs.on("click", function(){
				if ($(this).hasClass("js-tab_active")){
					return false	// if active tab clicked do nothing
				};
				
				if (!$contents.is(":animated")){
					var index = $tabs.index(this);	// index of clicked tab 
                    console.log(index);

					$tabs.removeClass(sActiveTabClass);
					$(this).addClass(sActiveTabClass);

					$contents.filter(".js-content_active").fadeOut(400).promise().done(function(){
						var $slider = $contents.eq(index).find(".js-slider__string");	// slider inside

						if ($slider){
							$contents.eq(index).addClass("js-content_active").fadeIn({
								duration: 400,
								progress: function(){
									if ($slider.length){
										$slider.slick('setPosition'); // prevent hidden slider broken sizes when visible
									}
								},
								done: function(){
									$(window).trigger("resize");
								}
							});
						}
					});
				}
			});
		}

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

	// why-we slider
	var whyWe = (function(){
		var obj ={};

		obj.$section = $("#why-we");
		obj.$slider = obj.$section.find(".js-why-we-slider");
		obj.init = function(){
			obj.$slider.slick({
				dots: false,
				arrows: true,
				infinite: false,
				speed: 300,
				slidesToShow: 1,
				nextArrow: $('.js-why-we-slider-next'),
				prevArrow: $('.js-why-we-slider-prev')
			});
		};

		return obj;
	})();

	// responces slider
	var responces = (function(){
		var obj = {};

		obj.$section = $("#responses");

		obj.$slider = obj.$section.find(".b-slider_responses");

		var  $slideResp = obj.$slider.find(".b-slide_responses")
			,$respFedbBtn = obj.$section.find(".js-btns_category")
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
			,widthSlideCss = $activeSlide.outerWidth()	// initial width for desktop
			,widthContainer
			,widthSlide
			,diff	// widthContainer - widthSlide
			,bSmallScr // true on large screens
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

				if (widthContainer > widthSlideCss){
					if (widthSlide < widthSlideCss){
						$slideResp.css("width", widthSlideCss + "px")
					}
					bSmallScr = false;
					$activeSlide.css("top", "30px");
					diff = widthContainer - widthSlideCss;
					$activeSlide.css("left", diff + "px");
				} else {
					widthSlide = widthContainer;
					$slideResp.css("width", widthContainer + "px")
					bSmallScr = true;
					// diff = 0;
					$activeSlide.css("top", "10px");
					$activeSlide.css("left", "5px");
					$unactiveSlide.css("left", "-5px");
				}
				
			}
			,moveLeft = function($slide, bNext, bSmallScr){	
				$slide.animate({
						top: bSmallScr?9:20,
						left: bSmallScr?40:diff*1.1
					},	{
						duration: bSmallScr?100:200,
						easing: "linear",
						queue: "active",	// черга для анімації цього слайда
						done: function(){
							$(this).css("z-index", "-1")	// приберемо на задній фон
						}
					}
				);
				$slide.animate({
						top: bSmallScr?7:5,
						left: bSmallScr?30:diff*0.99
					},	{
						duration: bSmallScr?100:200,
						easing: "linear",
						queue: "active"	// черга для анімації цього слайда
					}
				);
				$slide.animate({
						top: bSmallScr?5:2,
						left: bSmallScr?15:diff*0.5
					},	{
						duration: bSmallScr?150:300,
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
							
							$slideContent.fadeIn(100).promise().done(function(){
								$(this).css('display', '');
							});
						}
					}
				);
				$slide.animate({
						top: bSmallScr?0:0,
						left: -5
					},	{
						duration: bSmallScr?150:300,
						easing: "linear",
						queue: "active",
						done: function(){
							$slideResp.toggleClass("b-slide_active");
						}
					}
				);
				$slide.dequeue("active");	// запустимо чергу
			}
			,moveRight = function($slide, bSmallScr){
				$slide.animate({
						top: bSmallScr?7:40,
						left: bSmallScr?-40:-diff*0.1
					},	{
						duration: bSmallScr?100:200,
						easing: "linear",
						queue: "unactive",	// черга для анімації цього слайда
						done: function(){
							$(this).css("z-index", "4")
						}
					}
				);
				$slide.animate({
						top: bSmallScr?9:60,
						left: bSmallScr?-30:diff*0.01
					},	{
						duration: bSmallScr?100:200,
						easing: "linear",
						queue: "unactive"	// черга для анімації цього слайда
					}
				);
				$slide.animate({
						top: bSmallScr?10:30,
						left: bSmallScr?5:diff
					},	{
						duration: bSmallScr?300:600,
						easing: "linear",
						queue: "unactive"
					}
				);
				$slide.dequeue("unactive");	// запустимо чергу
			}
			,reshuffle = function($active, $unActive, bNext){
				moveLeft($active, bNext, bSmallScr);
				moveRight($unActive, bSmallScr);
			};

		obj.sliderInit = function(){
			$responsesBtn.click(function(){
				if (!$activeSlide.is(":animated")) {

					if ($activeSlide.hasClass("b-slide_rotated")){
						$feedbackBtn.toggleClass("b-btn_active");
						$responsesBtn.toggleClass("b-btn_active");
					}

					$activeSlide = $slideResp.filter(".b-slide_active");
					$activeSlide.removeClass("b-slide_rotated");	// rotate back if rotated
				}
			});
			$feedbackBtn.click(function(){
				if (!$activeSlide.is(":animated")) {
					$feedbackBtn.toggleClass("b-btn_active");
					$responsesBtn.toggleClass("b-btn_active");
					
					$activeSlide = $slideResp.filter(".b-slide_active");
					$activeSlide.toggleClass("b-slide_rotated");		// rotate back if rotated
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
			obj.sliderInit();	// підвантаження слайдів з прихованого блока
		}

		return obj;
	})();

	// rating stars module
	var stars = (function(){
		var obj = {};

		obj.fillStar = function(){	// ф-я для зафарбовування зірочок для кожного контейнера $("РейтингКонтейнер").each(fillStar)
			var  starsNum = $(this).attr("data-rating")	// к-ть зірочок для зафарбування в атрибуті "data-rating" контейнера
				,$stars = $(this).children("span.fa")
				,i
				;
			// 	fa-star-o контур зірочки
			// 	fa-star зафарбований контур зірочки
			for (i=0; i<starsNum; ++i){
				$stars.eq(i).removeClass("fa-star-o").addClass("fa-star");
			}
		};

		obj.fillAllStars = function(sSelector){	// sSelector - селектор контейнера із зрочками
			var $ratings = $(sSelector);	// контейнер із зірочками
				$ratings.each(function(){obj.fillStar.call(this)});	// add context from each f-n
		}

		obj.init = function(){
			obj.fillAllStars(".js-company__rating");
		}

		return obj;
	})();

	// makes whole div clickable
	var anchorParent = function(){
		$(".js-linked").css("cursor", "pointer").on("click", function(e){
			var link = $(this).find(".js-linked__target")[0];
			link.onclick = function(e){
				e.stopPropagation();
			};
			link.click();
		});
	};

	// osago calculator block functionality
	var osagoCalcBlock =(function(){
		var obj ={};

		var 
			 $vehicleSelect = $("#vehicle")
			,$vehicleForm = $("#vehicleForm")
			,$cityName = $vehicleForm.find("#regCity")
			,$cityId = $vehicleForm.find("#cityId")
			,$cityZone = $vehicleForm.find("#zoneId")
			,$vehicleParameters = $vehicleForm.find(".js-vehicle__block")	// блоки з параметрами ТЗ
			,$vehicleParamSelects = $vehicleParameters.find(".js-selectric")	// селекти параметрів ТЗ
			,$carParameters = $vehicleParameters.filter(".js-car")
			,$carParamSelect = $vehicleParamSelects.filter(".js-selectric_car")
			,$trailerParameters = $vehicleParameters.filter(".js-trailer")
			,$trailerParamSelect = $vehicleParamSelects.filter(".js-selectric_trailer")
			,$busParameters = $vehicleParameters.filter(".js-bus")
			,$busParamSelect = $vehicleParamSelects.filter(".js-selectric_bus")
			,$motoParameters = $vehicleParameters.filter(".js-moto")
			,$motoParamSelect = $vehicleParamSelects.filter(".js-selectric_moto")
			;

		// precomplete при введенні від 0 до 1 символа (до відпрацювання автокомпліта)
		// $field - field with autocomplete and hidden field after
		// clickCallbackFn - callback fn
		obj.precomplete = function(iSymbols, $field, clickCallbackFn){
			// var  $field = $(context)
			var  $idField = $field.next()
				,$zoneIdField
				,$dropMenu = $idField.siblings(".js-precomplete")
				,$menuItems = $dropMenu.children()
				,fieldValue
				,currentValue
				;

			$field.keyup(function(){
				currentValue = $(this).val();
				if ($field.val().length<=iSymbols){
					$dropMenu.show();
				} else{
					$dropMenu.hide();
				}
			})
			$field.on("focus", function(){
				if ($field.val().length<=iSymbols){
					$dropMenu.stop().show();
				}
			});
			$field.on("blur",function(){
				$dropMenu.fadeOut();
			});
			$menuItems.click(function(event){
				var  
					 selectedItem = $(this).text()
					,selectedID = $(this).attr("data-id")
					,selectedZoneID = $(this).attr("data-zone")
					;

				$field.val(selectedItem);
				$field.attr("data-item", selectedItem);
				$idField.val(selectedID);
				if (selectedZoneID){	// перевіряємо чи є додатковий id який треба зберегти
					$idField.next().val(selectedZoneID)
				};
				// $dropMenu.hide();
				$field.blur();
				$field.parents(".b-form__cell").removeClass("b-cell_error");
				$field.parents(".b-form__cell").addClass("b-cell_valid");
				if (clickCallbackFn){
					clickCallbackFn();
				}
			});
		};

		// autocomplete function 
		// (enter string, shows items, select item -> send item id)
		// note: under autocompleted field must be placed hidden input with name attr, to return item id
		obj.fieldAutocomplete = function(iMinChars, $objToComplete, jsonAddr, $dataIdtoSend, callbackFn){
			var  oJS		//відповідний JSоб'єкт до JSON об'єкту AJAX відповіді
				,items = []		// масив елементів
				,propertiesLength	// зберігаємо тут к-ть властивостей item-а
				,bLength3
			    ,itemIds = []	// масив id елементів
			    ,itemOtherIds = []	// масив додаткових id елементів
			    ,criteria = null
			    ,itemIndex
			    ,currentId
			    ,currentOtherId
				;

			$objToComplete.each(function(index){
				var t = this;
				$(t).autoComplete({
					minChars: iMinChars,
				    source: function(term, response){

						if ($dataIdtoSend instanceof jQuery){
							criteria = $dataIdtoSend.val();
						}

				        $.ajax({
			            	type: "get",
			            	data: {item: term, criteria: criteria},
			            	url : jsonAddr,
			            	error : function(){
			            	    alert('error');
			            	},
				        	success: function(data){
					        	items = []; // масив елементів
					    		itemIds = [];	// масив id елементів
					    		itemOtherIds = [];	// масив додаткових id елементів
					        	oJS = data;	//відповідний JSоб'єкт до JSON об'єкту AJAX відповіді
					        	propertiesLength = 0;
					        	var i;
					        	for (i in oJS.items[0]) {
					        		if (oJS.items[0].hasOwnProperty(i)) {
					        			++propertiesLength;
					        		}
					        	}
					        	bLength3 = (propertiesLength == 3);	// маємо додатковий Id (zoneId), треба створити їх масив itemOtherIds
					        	if (oJS.length != 0){	// перевіряємо чи не відсутні співпадіння (чи відповідь не пустий масив)
					        		for (var i = 0; i < oJS.items.length; ++i) {	// наповнимо масив елементів і їхніх id
					        			items.push(oJS.items[i].name);
					        			itemIds.push(oJS.items[i].id);
					        			if (bLength3) {itemOtherIds.push(oJS.items[i].zone_id)};
					        		};
					        		response(items);
					        	}
					        }
				        });
				    },
				    onSelect: function (event, term, item) {
				    	itemIndex = items.indexOf(String(term));	// індекс елемента в масиві (обов'язково type String)
				    	currentId = itemIds[itemIndex];		// id обраного елемента

			    		if (bLength3){currentOtherId = itemOtherIds[itemIndex]}	// зберігаємо обраний zone_id (якщо такі є)
				    	$objToComplete.each(function(){	// заповнимо решту однакових полів однаковими значеннями
				    		if($(this) != $(t)){	// значення в полі на якому ми вибрали значення автокомпліта
				    			$(this).val(term);
				    		};
				    		$(this).attr("data-item", term);	// додаємо атрибут в якому зберігатиметься вибраний item
				    		$(this).next().val(currentId);	// повертаємо id елемента прихованому елементу форми
				    		if (bLength3){$(this).next().next().val(currentOtherId)}	// присвоюємо zone_id 2му прихованому полю
				    	});

						$objToComplete.parent(".b-form__cell").removeClass("b-cell_error").addClass("b-cell_valid");	// позначаємо валідним поле

						if (callbackFn){	// перевіряємо чи існує колбек ф-я в параметрах, щоб уникнути помилки
							callbackFn();
						}
				    }
				});
			});
			$objToComplete.blur(function(){	// при втраті фокуса, якщо ми змінили значення, але не обрали з меню автокомпліта, то повернемо раніше обране значення полю
				var  dataItem = $(this).attr("data-item")	// раніше обране значення, збережене в атрибуті "data-item"
					,fieldValue = $(this).val()	// поточне значення
					;
				if (dataItem && (fieldValue != dataItem)){	// перевірка чи є попередньо обране значення (якщо)
					$(this).val(dataItem);	// як є то запишемо вибране раніше значення
				}
			})
		};

		obj.cityFieldInit = function(){
			// додамо до поля міста реєстрації статичну випадашку при введенні від 0 до 1 символа (до відпрацювання автокомпліта)
			obj.precomplete(2, $("#regCity"));

			//ajax registration city autocomplete
			obj.fieldAutocomplete(3, $("#regCity"), "./ajax/cityRegion.json");	// EWA віддає результат, починаючи з 3х символів

			// якщо ми змінили значення міста реєстрації, але не обрали з меню автокомпліта, то повернемо раніше обране значення
			$cityName.blur(function(){
				var  dataItem = $(this).attr("data-item")	// раніше обране значення, збережене в атрибуті "data-item"
					,fieldValue = $(this).val()	// поточне значення
					;
				if (dataItem && (fieldValue != dataItem)){	// перевірка чи є попередньо обране значення (якщо)
					$(this).val(dataItem);	// як є то запишемо вибране раніше значення
				}
			})
		};

		obj.vehicleChange = function(t){
			var sVehicle = $(t).val();
			switch (sVehicle) {
				case "car":	// авто
					$vehicleParameters.css("display", "none");	// ховаємо всі блоки з параметрами ТЗ
					$vehicleParamSelects.prop("disabled", true);// відключаємо поля параметрів

					$carParameters.show(0);		// показуємо блок параметрів легкового авто
					$carParamSelect.prop("disabled", false);	// вмикаємо поля параметрів легкового авто
					break;
				case "trailer":	// вантажівка
					$vehicleParameters.css("display", "none");	// ховаємо всі блоки з параметрами ТЗ
					$vehicleParamSelects.prop("disabled", true);// відключаємо поля параметрів

					$trailerParameters.show(0);
					$trailerParamSelect.prop("disabled", false);
					break;
				case "bus":	// автобус
					$vehicleParameters.css("display", "none");	// ховаємо всі блоки з параметрами ТЗ
					$vehicleParamSelects.prop("disabled", true);// відключаємо поля параметрів

					$busParameters.show(0);
					$busParamSelect.prop("disabled", false);
					break;
				case "moto": //мотоцикл
					$vehicleParameters.css("display", "none");	// ховаємо всі блоки з параметрами ТЗ
					$vehicleParamSelects.prop("disabled", true);// відключаємо поля параметрів

					$motoParameters.show(0);
					$motoParamSelect.prop("disabled", false);
					break;
			}

		};

		obj.selectsInit = function(){	// ф-я ініціалізації js-функціоналу на підвантаженому блоці пропозицій

			$vehicleSelect.selectric({	//селект вибора ТЗ
				onInit: function() {
					// vehicleChange.call(this);
					obj.vehicleChange(this);
				},
				onChange: function(element) {	// element==this - це наш select, він лишається тим самим об'єктом і після ініціалізації selectric
					// vehicleChange.call(this);
					obj.vehicleChange(this);
					$(element).change();	// fired by default
				}
			});
		
		}

		obj.init = function(){
			// obj.fillAllStars(".js-company__rating");
			obj.selectsInit();
			obj.cityFieldInit();
		}

		return obj;
	})();
	
	// adaptive iframe video
	var iframeAspectRatio = (function(){
		var obj = {};
		
		obj.iframesAll = $("iframe");
		
		obj.calcHeight = function($el){
			$(window).on("resize", function(){
				$el.height($el.width() * $el.attr("data-ratio"))
			}).resize();
		};
		
		obj.aspectRatio = function($el, FcallBack){
			// save aspect ratio
			$el.attr("data-ratio", $el.attr('height') / $el.attr('width'))
			// and remove the hard coded width/height
			.removeAttr('height')
			.removeAttr('width');
			if (typeof(FcallBack) == "function"){
				FcallBack(arguments[0]);
			}
		};

		obj.init = function(sSelector){
			obj.iframesAll.filter(sSelector).each(function(){
				var $this = $(this);
				obj.aspectRatio($this, obj.calcHeight);
			});
		}
		
		return obj;
	})();

	// Blog article description text hover truncate
	var parentHoverTextTruncate = function(sParentSelector, sTextSelector, iLines){
		var
			 $parent = $(sParentSelector)
			,$texts = $parent.find(sTextSelector)//.dotdotdot()
			,height
			;
		// $Texts.css("height, )

		$parent.hover(
			function(){
				// var content = $(this).find(sTextSelector).trigger("originalContent");
				// console.log(content);
				// console.log(content.text());
				// $(this).find(sTextSelector).css("height", "inherit").append(content);
				var $thisText = $(this).find(sTextSelector);
				
					$thisText.trigger("destroy");
					$thisText.css("height", "inherit");
				
				// $(this).find(sTextSelector).trigger("update");
			},
			function(){
				$(this).find(sTextSelector).height(height).dotdotdot();
			}
		);

		$window.on("resize", function(){
			if ($texts.length){	// if truncated texts exist (error preventing)

				// $texts.triggerHandler("originalContent");	// show original text content
				//$texts.dotdotdot();	// activate dotdotdot plugin on texts

				var  element = $texts.children(".g-inline").filter(":visible")[0]
					,textRectangles = element.getClientRects()		// each text line objects
					,container = element.getBoundingClientRect()	// object with element parent position and sizes
					;

				//console.log(container);
				// console.log(container.height);
				// console.log(textRectangles.length);
		
				height = iLines*container.height / textRectangles.length + iLines;
				// console.log(height);
				
				// $texts.height(height).trigger("update");
				$texts.height(height).dotdotdot();
				// $texts.trigger("update");
			}
		}).triggerHandler("resize");
	};

	parentHoverTextTruncate(".js-parent_descrTrunc", ".js-descrTrunc", 2);

	// scrolled links
	var scrolledLinks = (function(){
		var obj = {};

		obj.init = function(sSelector, iTopShift, sTargetSelector){
			sSelector =sSelector || ".js-scrolledLink";	// default selector
			iTopShift = iTopShift || 90;	// висота хедера
			// sTargetSelector = sTargetSelector || "#leedForms"

			$(sSelector).on("click", function(e){
				event.preventDefault();

				var  
					 hrefID = (sTargetSelector)?sTargetSelector:$(this).attr("href")
					,$anchor = $(hrefID)
					,offsetAnchor = $anchor.offset().top - iTopShift;
					;

					console.log($anchor);
				$('html, body').animate({ scrollTop: offsetAnchor}, 400);
				return false;
			})
		}

		return obj;
	})();

	// documents pagnation
	var docPagination = (function(){
		var obj = {};
		
		obj.pagination = function(){
			var $pagination = $('.documents__pagination');

			if ( $pagination.length ){
				var $documents = $(".documents__item");

				$pagination.on('click','a',function(e){
					e.preventDefault();

					var index = $(this).data("index") - 1;
					$documents.removeClass('is--active');
					$documents.eq(index).addClass('is--active');

					$pagination.find("a").removeClass('is--active');
					$(this).addClass('is--active');
				});
			}
		}

		obj.init = function(){
			obj.pagination();
		}

		return obj;
	})();

	// executable part
	anchorParent();	// make all divs clickable
	stars.init();	// rating stars filling
	
	$(".js-selectric").selectric();	// selects stylization

	header.init();	// header module init
	indexContents.linkInit();	// content links functionality
	sliders.init();	// sliders module init
	tabs(".js-tabbed");	// tabs init
	responces.init();	// responses slider init
	whyWe.init();	// why-we slider init
	footer.init();	// footer module init

	seoMap.init();	// seoMap module init

	// press articles
	var $pressArticles = $('.js-press-articles');
	if ( $pressArticles.length ){
		var visiblePressArticlesHeight = $pressArticles.find('.press:nth-child(5)').position().top - $pressArticles.position().top;
		$pressArticles.height(visiblePressArticlesHeight);
		// show/hide articles
		$('.js-more-articles').on('click', function(e){
			e.preventDefault();
			$(this).find('.b-btn').toggleClass('is--hidden');
			$(this).find('.fa').toggleClass('fa-angle-down fa-angle-up');
			$pressArticles.toggleClass('is--opened');
		});
	}

	$('.tooltip').tooltipster({
		theme: 'tooltipster-light',
		position: 'bottom',
		zIndex: 1
	});	// enable tooltips
	
	if ( $(".js-scrollbar").length ){
		$(".js-scrollbar").slimScroll();	//custom scrollbars
	}
	docPagination.init();
	osagoCalcBlock.init();	// OSAGO calc block initialization (hiding vehicles selects, city precomplete and autocomplete)
	if ( $(".js-leeds").length ){
		$(".js-leeds").easytabs();
	}
	scrolledLinks.init();	// scroll to anchors on click
	scrolledLinks.init("#leedsContents a", 90, "#leedForms");	// scroll to leedForms anchor
	iframeAspectRatio.init(".js-preserveAspectRatio");	// make iframe with desired selector height depending on the aspect ratio (width from css)

	
	// popup on site leave
	(function(){
		var $leavePopup = $("#exitPopup");
		var $leaveForm = $(".js-form_exitCallback");
		var $modalError = $(".b-modal_error");
		var $modalExitCallbackSuccess = $("#exitPopupSuccess");
		var exitPopupFirstTimeShow = 15000;
		var exitPopupNextTimeShow = 90000;
		var exitPopupShowFirstTime = false;
		var exitPopupShowNextTime = false;
		var isExitPopupSent = false;
	
		setTimeout(function(){
			exitPopupShowFirstTime = true;
			console.log('Time 1s');
		}, exitPopupFirstTimeShow);

		$(document).mouseleave(function (e) {
			if ( e.clientY <= 0 && exitPopupShowFirstTime || e.clientY <= 0 && exitPopupShowNextTime && !isExitPopupSent ){
				
				$leavePopup.arcticmodal();

				exitPopupShowFirstTime = false;
				exitPopupShowNextTime = false

				setTimeout(function(){
					exitPopupShowNextTime = true;
				}, exitPopupNextTimeShow);
			}
		});

		// leave form submission
		$leaveForm.submit(function(event){
			event.preventDefault();
			var data = $(this).serialize();

			$.ajax({
					type : 'get',
					url: './ajax/create-callback.json',
					data : data,
					cache : false,
					success : function(response){
							if (response.status == true) {
									// in a case of Ajax success:
									$leavePopup.arcticmodal('close');
									isExitPopupSent = true;
									$modalExitCallbackSuccess.arcticmodal();
									
							} else {
								$.arcticmodal('close');
								$modalError.arcticmodal();	// show error modal
							}
					},
					error: function(){
							alert('There is an error!');
					}
			});
		});

	})();

	(function(){
		// scroll to top
		$("#toTop").click(function(event){
			event.preventDefault();
			$('html, body').animate({ scrollTop: 0}, 400);
		});

		// scroll to feedback
		var $scrollToFeedback = $('.js-scrollto-feedback');
		if ( $scrollToFeedback.length ) {
			$scrollToFeedback.click(function(event){
				event.preventDefault();
				var position = $('.feedback').position().top - $('.b-header').height();
				$('html, body').animate({ scrollTop: position}, 400);
			});
		}
	})();

	(function(){
		$('.js-testimonials-slider').slick({
			arrows: true,
			infinite: true,
			speed: 400,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			adaptiveHeight: true,
			autoplaySpeed: 4400,
			nextArrow: $('.js-testimonials-slider-next'),
			prevArrow: $('.js-testimonials-slider-prev')
		});
	})();
});