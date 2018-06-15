'use strict';

var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	    sURLVariables = sPageURL.split('&'),
	    sParameterName,
	    i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};

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

	// matches pollyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	//closest pollyfill
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (s) {
			var el = this;
			if (!document.documentElement.contains(el)) return null;
			do {
				if (el.matches(s)) return el;
				el = el.parentElement || el.parentNode;
			} while (el !== null && el.nodeType === 1);
			return null;
		};
	}

	// Tooltip
	function getOffsetDocumentTop(pElement) {
		return document.documentElement.scrollTop + pElement.getBoundingClientRect().top;
	}

	function registerTooltip(pElement) {

		var ROOT_ELEMENT_CLASS = 'tooltip';
		var TAB_CLASS = ROOT_ELEMENT_CLASS + '__tab';

		var ARIA_HIDDEN_ATTR = 'aria-hidden';
		var ARIA_EXPANDED_ATTR = 'aria-expanded';

		var control = pElement;
		var rootElement = control.closest('.' + ROOT_ELEMENT_CLASS);
		var content = rootElement.getElementsByClassName(ROOT_ELEMENT_CLASS + '__content')[0];
		var tab = rootElement.getElementsByClassName(TAB_CLASS)[0];
		var message = rootElement.getElementsByClassName(ROOT_ELEMENT_CLASS + '__message')[0];
		var close = rootElement.getElementsByClassName(ROOT_ELEMENT_CLASS + '__close')[0];

		var tabOriginalClassName = tab.className;

		function showTooltip() {
			var cloak = document.createElement('div');
			cloak.style.cssText = 'height: 0; overflow: hidden; position: relative;';
			content.parentNode.insertBefore(cloak, content);
			cloak.appendChild(content);

			content.setAttribute(ARIA_HIDDEN_ATTR, false);

			document.removeEventListener('click', clickOutHandler);

			setTimeout(function () {
				cloak.parentNode.appendChild(content);
				cloak.remove();

				control.setAttribute(ARIA_EXPANDED_ATTR, true);

				var className = tabOriginalClassName + ' ' + TAB_CLASS + '--active';
				if (content.clientHeight > getOffsetDocumentTop(tab)) {
					tab.className = className + ' ' + TAB_CLASS + '--bottom';
					content.style.top = tab.offsetTop + tab.offsetHeight + 'px';
				} else {
					tab.className = className + ' ' + TAB_CLASS + '--top';
					content.style.top = tab.offsetTop - content.clientHeight + 'px';
				}

				document.addEventListener('keyup', escapeHandler);
				document.addEventListener('click', clickOutHandler);

				content.focus();
			}, 0);
		}

		function hideTooltip() {
			content.setAttribute(ARIA_HIDDEN_ATTR, true);
			control.setAttribute(ARIA_EXPANDED_ATTR, false);

			tab.className = tabOriginalClassName;

			document.removeEventListener('keyup', escapeHandler);
			document.removeEventListener('click', clickOutHandler);
		}

		function closeTooltip() {
			hideTooltip();
			control.focus();
		}

		function escapeHandler(pEvent) {
			if (event.key !== 'Escape') {
				return;
			}

			if (content.contains(pEvent.target)) {
				closeTooltip();
			} else {
				hideTooltip();
			}
		}

		function clickOutHandler(pEvent) {
			if (!content.contains(pEvent.target)) {
				hideTooltip();
			}
		}

		control.addEventListener('click', showTooltip);
		control.addEventListener('keypress', function (pEvent) {
			if (event.key === ' ' || event.key === 'Enter') {
				event.preventDefault();
				showTooltip();
			}
		});

		close.addEventListener('click', closeTooltip);
		close.addEventListener('keypress', function (pEvent) {
			if (event.key === ' ' || event.key === 'Enter') {
				event.preventDefault();
				closeTooltip();
			}
		});
	}

	[].forEach.call(document.getElementsByClassName('tooltip__control'), function (pElement) {
		return registerTooltip(pElement);
	});

	// Three state check boxes 
	$(".mys-radio__control").click(function (ev) {
		var siblings = $(this).closest(".mys-radio-group").find(".mys-radio__box");
		var thisBox = $(this).next(".mys-radio__box");
		$(siblings).removeClass('mys-radio__box--not-selected');
		$(siblings).not(thisBox).addClass('mys-radio__box--not-selected');
	});

	$(".mys-radio-group").mouseover(function (ev) {
		var checkedBox = $(this).find("input:checked").next(".mys-radio__box");
		if (checkedBox.length !== 0) {
			var siblings = $(this).find(".mys-radio__box");
			var _checkedBox = $(this).next(".mys-radio__box");
			$(siblings).removeClass('mys-radio__box--not-selected');
		}
	});

	$(".mys-radio-group").mouseleave(function (ev) {
		var checkedBox = $(this).find("input:checked").next(".mys-radio__box");
		if (checkedBox.length !== 0) {
			var siblings = $(this).find(".mys-radio__box");
			$(siblings).removeClass('mys-radio__box--not-selected');
			$(siblings).not(checkedBox).addClass('mys-radio__box--not-selected');
		}
	});

	// Large icon-based check boxes 
	// $(".mys-radio__control").click(function (ev) {
	// 	let siblings = $(this).closest(".mys-radio-group").find(".mys-radio__box");
	// 	let thisBox = $(this).next(".mys-radio__box");
	// 	$(siblings).removeClass('mys-radio__box--not-selected mys-radio__box--large-not-selected');
	// 	$(siblings).not(thisBox).addClass('mys-radio__box--not-selected mys-radio__box--large-not-selected');
	// });

	// $(".mys-radio-group").mouseover(function (ev) {
	// 	let checkedBox = $(this).find("input:checked").next(".mys-radio__box");
	// 	if (checkedBox.length !== 0) {
	// 		let siblings = $(this).find(".mys-radio__box");
	// 		let checkedBox = $(this).next(".mys-radio__box");
	// 		$(siblings).removeClass('mys-radio__box--not-selected mys-radio__box--large-not-selected');
	// 	}
	// });

	// $(".mys-radio-group").mouseleave(function (ev) {
	// 	let checkedBox = $(this).find("input:checked").next(".mys-radio__box");
	// 	if (checkedBox.length !== 0) {
	// 		let siblings = $(this).find(".mys-radio__box");
	// 		$(siblings).removeClass('mys-radio__box--not-selected mys-radio__box--large-not-selected');
	// 		$(siblings).not(checkedBox).addClass('mys-radio__box--not-selected mys-radio__box--large-not-selected');
	// 	}
	// });


	var claimType = getUrlParameter('claimType');

	if (claimType) {
		localStorage.setItem('claimType', claimType);
	}
	// if (localStorage.getItem('claimType') === 'cbd') {
	// 	$(".pt-claim-type--cbd").show();
	// 	$(".pt-claim-type--normal").hide();
	// }
});