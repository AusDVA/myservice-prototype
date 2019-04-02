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
        if (newX >= 0) uiBunch.css({
          right: -newX + 'px'
        });
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
            uiBunch.css({
              right: ''
            });
          }, 400);
        } else {
          uiBunch.css({
            right: '0px',
            transition: 'right 0.3s'
          });
          window.setTimeout(function () {
            uiBunch.css({
              transition: ''
            });
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
        cloak.parentNode.removeChild(cloak);

        control.setAttribute(ARIA_EXPANDED_ATTR, true);

        var className = tabOriginalClassName + ' ' + TAB_CLASS + '--active';
        if (content.clientHeight > getOffsetDocumentTop(tab)) {
          tab.className = className + ' ' + TAB_CLASS + '--bottom';
          content.style.top = control.offsetTop + tab.offsetTop + tab.offsetHeight + 'px';
        } else {
          tab.className = className + ' ' + TAB_CLASS + '--top';
          content.style.top = control.offsetTop - content.clientHeight + tab.offsetTop + 'px';
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

  var claimType = getUrlParameter('claimType');

  if (claimType) {
    localStorage.setItem('claimType', claimType);
  }

  // Nom rep pages
  function initNomRep() {

    var repFlow = getUrlParameter('repFlow');

    if (repFlow) {

      localStorage.setItem('repFlow', repFlow);
    } else if ("repFlow" in localStorage) {} else {
      localStorage.setItem('repFlow', 'none');
    }

    if (localStorage.getItem('repFlow') == 'both') {
      // alert('asdf');
      jQuery(".pt-first-time").hide();
      jQuery(".pt-rep-flow-representing-no").hide();
      jQuery(".pt-rep-flow-represented-no").hide();
      jQuery(".pt-rep-flow-none").hide();
      jQuery(".pt-rep-flow-representing").show();
      jQuery(".pt-rep-flow-represented").show();
    } else if (localStorage.getItem('repFlow') == 'none') {
      jQuery(".pt-first-time").hide();
      jQuery(".pt-rep-flow-representing").hide();
      jQuery(".pt-rep-flow-represented").hide();
      jQuery(".pt-rep-flow-none-no").hide();
      jQuery(".pt-rep-flow-none").show();
    } else if (localStorage.getItem('repFlow') == 'representing') {
      jQuery(".pt-first-time").hide();
      jQuery(".pt-rep-flow-represented").hide();
      jQuery(".pt-rep-flow-representing-no").hide();
      jQuery(".pt-rep-flow-none").hide();
      jQuery(".pt-rep-flow-representing").show();
    } else if (localStorage.getItem('repFlow') == 'represented') {
      jQuery(".pt-first-time").hide();
      jQuery(".pt-rep-flow-representing").hide();
      jQuery(".pt-rep-flow-none").hide();
      jQuery(".pt-rep-flow-represented").show();
      jQuery(".pt-rep-flow-represented-no").hide();
    } else if (localStorage.getItem('repFlow') == 'newbie') {
      jQuery(".pt-first-time-no").hide();
      jQuery(".pt-first-time").show();
    }
  }

  initNomRep();

  // banners
  function initBanners() {

    var bannerFlow = getUrlParameter('bannerFlow');

    if (bannerFlow) {

      localStorage.setItem('bannerFlow', bannerFlow);
    } else if ("bannerFlow" in localStorage) {} else {
      localStorage.setItem('bannerFlow', 'none');
    }

    if (localStorage.getItem('bannerFlow') == 'all') {
      jQuery(".pt-banner-service").show();
      jQuery(".pt-banner-nr-rep").show();
    } else if (localStorage.getItem('bannerFlow') == 'none') {
      jQuery(".pt-banner-service").hide();
      jQuery(".pt-banner-nr-rep").hide();
    } else if (localStorage.getItem('bannerFlow') == 'service') {
      jQuery(".pt-banner-service").show();
      jQuery(".pt-banner-nr-rep").hide();
    } else if (localStorage.getItem('bannerFlow') == 'nr-rep') {
      jQuery(".pt-banner-service").hide();
      jQuery(".pt-banner-nr-rep").show();
    }
  }

  initBanners();

  // Switch account
  function initSwitch() {

    var switchFlow = getUrlParameter('switchFlow');

    if (switchFlow) {
      localStorage.setItem('switchFlow', switchFlow);
    } else {
      // localStorage.setItem('switchFlow', 'none');
    }
    if (localStorage.getItem('switchFlow') == 'active') {
      jQuery('.switch-account-button').addClass("switch-account-button--current");
    } else {
      jQuery('.switch-account-button').removeClass("switch-account-button--current");
    }
  }

  initSwitch();

  // Swap text on top panel accordion button
  var open = false;
  var initialButtonText = $(".accordion-toppanel-btn").html();
  $(".accordion-toppanel-btn").click(function () {

    // I don't think this is a good idea
    // change the button text
    // open = !open;
    // if (open) {
    //   $(".accordion-toppanel-btn").html("Close");
    // } else {
    //   $(".accordion-toppanel-btn").html(initialButtonText);
    // }

    $(this).closest('.uikit-accordion').toggleClass("accordion-closed");
    // hide the switch account box
    $(this).closest('.container').find(".switch-account-box").addClass("switch-account-box--hide");
  });

  // swap-box-un-hide
  $(".switch-account-button").click(function (ev) {
    $(this).closest('.container').find(".switch-account-box").toggleClass("switch-account-box--hide");
    $(this).toggleClass("switch-account-button--open");
  });
});