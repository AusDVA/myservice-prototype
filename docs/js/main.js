'use strict';

jQuery(document).ready(function ($) {
	// open the panel
	$('.panel-btn').on('click', function (event) {
		event.preventDefault();
		$('.panel').addClass('is-visible');
		$("#email").focus();
	});
	// close the panel
	$('.panel').on('click', function (event) {
		if ($(event.target).is('.panel') || $(event.target).is('.panel-close')) {
			$('.panel').removeClass('is-visible');
			event.preventDefault();
		}
	});
	// open help panel on unauth screen
	$('.panel-help').on('click', function (event) {
		event.preventDefault();
		$('.panel-home-help').addClass('is-visible');
	});
	// close the help panel
	$('.panel-home-help').on('click', function (event) {
		if ($(event.target).is('.panel-home-help') || $(event.target).is('.panel-close')) {
			$('.panel-home-help').removeClass('is-visible');
			event.preventDefault();
		}
	});

	// open vvcs panel
	$('.vvcs-panel-btn').on('click', function (event) {
		event.preventDefault();
		$('.panel-vvcs').addClass('is-visible');
	});
	// close the vvcs panel
	$('.panel-vvcs').on('click', function (event) {
		if ($(event.target).is('.panel-vvcs') || $(event.target).is('.panel-close')) {
			$('.panel-vvcs').removeClass('is-visible');
			event.preventDefault();
		}
	});

	// open feedback panel
	$('.feedback-panel-btn').on('click', function (event) {
		event.preventDefault();
		$('.panel-feedback').addClass('is-visible');
	});
	// close the feedback panel
	$('.panel-feedback').on('click', function (event) {
		if ($(event.target).is('.panel-feedback') || $(event.target).is('.panel-close')) {
			$('.panel-feedback').removeClass('is-visible');
			event.preventDefault();
		}
	});

	// Help slide gesture
	var panels = $('.panel');
	panels.map(function (index, panel) {
		var panelContainer = $(panel).find('.panel-container');
		var panelHeader = $(panel).find('.panel-header');
		var originX = 0;
		var lastX = 0;
		var dragging = false;
		var uiBunch = panelContainer.add(panelHeader);
		uiBunch.on('mousedown touchstart', function (event) {
			if (!dragging && !$(event.target).is('.panel-close')) {
				dragging = true;
				originX = event.screenX || event.targetTouches[0].screenX;
				lastX = originX;
			}
		});
		uiBunch.on('mousemove touchmove', function (event) {
			if (dragging) {
				lastX = event.screenX || event.targetTouches[0].screenX;
				var newX = lastX - originX;
				if (newX >= 0) uiBunch.css({ right: -newX + 'px' });
			}
		});
		uiBunch.on('mouseup touchend', function (event) {
			if (dragging && !$(event.target).is('.panel-close')) {
				dragging = false;
				var newX = (event.screenX || lastX) - originX;
				if (newX > panelContainer[0].offsetWidth * 0.25) {
					$(panel).removeClass('is-visible').addClass('swipe-closing');
					window.setTimeout(function () {
						$(panel).removeClass('swipe-closing');
						uiBunch.css({ right: '' });
					}, 400);
				} else {
					uiBunch.css({ right: '0px', transition: 'right 0.3s' });
					window.setTimeout(function () {
						uiBunch.css({ transition: '' });
					}, 300);
				}
			}
		});
	});

	// Toast mockup
	$(".call-toast").on("click", function () {
		var randomWToastTypes = ["success", "information", "alert", "error"];
		var randomWords = ["ink Fairy Armadillo", "Okapi", "Glaucus Atlanticus", "The Maned Wolf", "Fossa", "Iguana"];
		function getRandomArbitrary(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}
		var randInt = getRandomArbitrary(4);
		var animal = randomWords[randInt];
		var toastType = randomWToastTypes[randInt];

		document.body.setAttribute('tabindex', '0');
		document.body.focus();
		document.body.removeAttribute('tabindex');

		var now = new Date().toLocaleString();

		jQuery('.toast-container').append('<button class="uikit-btn toast" role="alert" type="button"><div class="toast__type toast__type--' + toastType + '"><span class="sr">' + toastType + '</span></div><div class="toast__message"><p>You added a ' + animal + ' at ' + now + '</p></div></button>');

		jQuery(".toast-container").show();
	});

	jQuery(".toast-container").on("click", "button", function (event) {
		jQuery(this).hide();
	});

	// TODO:: fade in docs once (relationship status is selected)
});