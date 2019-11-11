"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
}; // today's date available everywhere 


var today = moment().format('D MMMM YYYY');
$(".pt-date-today").html(today);
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
  }); // Toast mockup

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
  }); // matches pollyfill

  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  } //closest pollyfill


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
  } // Tooltip


  function getOffsetDocumentTop(pElement) {
    return document.documentElement.scrollTop + pElement.getBoundingClientRect().top;
  }

  function registerTooltip(pElement) {
    var ROOT_ELEMENT_CLASS = 'tooltip';
    var TAB_CLASS = "".concat(ROOT_ELEMENT_CLASS, "__tab");
    var ARIA_HIDDEN_ATTR = 'aria-hidden';
    var ARIA_EXPANDED_ATTR = 'aria-expanded';
    var control = pElement;
    var rootElement = control.closest(".".concat(ROOT_ELEMENT_CLASS));
    var content = rootElement.getElementsByClassName("".concat(ROOT_ELEMENT_CLASS, "__content"))[0];
    var tab = rootElement.getElementsByClassName(TAB_CLASS)[0];
    var message = rootElement.getElementsByClassName("".concat(ROOT_ELEMENT_CLASS, "__message"))[0];
    var close = rootElement.getElementsByClassName("".concat(ROOT_ELEMENT_CLASS, "__close"))[0];
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
        var className = "".concat(tabOriginalClassName, " ").concat(TAB_CLASS, "--active");

        if (content.clientHeight > content.scrollTop + content.getBoundingClientRect().top) {
          console.log('adding tooltip__tab--bottom');
          tab.className = "".concat(className, " ").concat(TAB_CLASS, "--bottom");
          content.style.top = "".concat(control.offsetTop + tab.clientHeight + tab.offsetTop + tab.offsetHeight, "px");
        } else {
          console.log('adding tooltip__tab--top');
          tab.className = "".concat(className, " ").concat(TAB_CLASS, "--top");
          content.style.top = "".concat(control.offsetTop - content.clientHeight + tab.offsetTop, "px");
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
  }); // Three state check boxes 

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
  } // Swap text on top panel accordion button


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
    $(this).closest('.uikit-accordion').toggleClass("accordion-closed"); // hide the switch account box

    $(this).closest('.container').find(".switch-account-box").addClass("switch-account-box--hide");
  }); // swap-box-un-hide

  $(".switch-account-button").click(function (ev) {
    $(this).closest('.container').find(".switch-account-box").toggleClass("switch-account-box--hide");
    $(this).toggleClass("switch-account-button--open");
    event.stopPropagation();
  });
  $(".switch-account-box__link").click(function (ev) {
    event.stopPropagation();
  });
}); // PoC file upload for prototype
// TODO:: handle cancel 
// TODO:: add additional items 

(function (document, window, index) {
  // var inputs = document.querySelectorAll('.file-upload__input');
  // if (!inputs) {
  var inputs = document.querySelectorAll('.file-upload-default__input'); // }

  Array.prototype.forEach.call(inputs, function (input) {
    var label = input.nextElementSibling,
        labelVal = label.innerHTML,
        categoryTr = input.closest("tr"),
        category = categoryTr.querySelector('select'),
        categoryName = '';

    if (category) {
      category.addEventListener('change', function (e) {
        categoryName = this.value;
      });
    }

    input.addEventListener('change', function (e) {
      var fileName = '';
      fileName = e.target.value.split('\\').pop();

      if (fileName) {
        category.outerHTML = '<label>' + categoryName + '</label>'; // label.querySelector('.file-upload-default__file-name').innerHTML = fileName;

        categoryTr.querySelector('.file-upload-default__file-name').innerHTML = fileName;
        categoryTr.querySelector('.file-upload-default__file-name').classList.add('file-upload-default__file-name--uploaded');
        label.querySelector('.uikit-btn').innerHTML = 'Remove';
        label.querySelector('.uikit-btn').classList.add('uikit-btn--tertiary');
        $('.file-upload--add').show();
        $('.pt-upload-list-optional').show();
        var status = categoryTr.querySelector('.file-upload-default__file-name').closest('tr');
        var categoryTrClass = categoryTr;
        status = status.querySelector('.file-status');

        if (status) {
          status.innerHTML = 'Remove';
          status.innerHTML = '<span class="sr"> Uploaded</span>';
          status = status.classList;
          status.remove('file-status--required');
          status.add('file-status--uploaded');
        }

        categoryTrClass.classList.add('file-upload-default__row--uploaded');
      } else {
        label.innerHTML = labelVal;
      }
    }); // Firefox bug fix
    // input.addEventListener('focus', function () { input.classList.add('has-focus'); });
    // input.addEventListener('blur', function () { input.classList.remove('has-focus'); });
  });
})(document, window, 0);
/*! @gov.au/animate v1.0.12 */

/***************************************************************************************************************************************************************
 *
 * Animate function
 *
 * A function to open, close and toggle the display of page elements.
 *
 **************************************************************************************************************************************************************/


var AU = AU || {};

(function (AU) {
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------
  // NAMESPACE MODULE
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------
  var animate = {}; //--------------------------------------------------------------------------------------------------------------------------------------------------------------
  // PRIVATE FUNCTIONS
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------

  /**
   * PRIVATE
   * Calculate the requirements for the desired animation
   *
   * @param  {integer} initialSize - The initial size of the element to animate
   * @param  {integer} endSize     - The size the element after the animation completes
   * @param  {string}  speed       - The speed of the animation in ms
   *
   * @return {object}              - Required steps, stepSize and intervalTime for the animation
   */

  function CalculateAnimationSpecs(initialSize, endSize, speed) {
    if (initialSize === endSize) {
      return {
        stepSize: 0,
        steps: 0,
        intervalTime: 0
      };
    }

    var distance = endSize - initialSize; // the overall distance the animation needs to travel

    var intervalTime = speed / distance; // the time each setInterval iteration will take

    var stepSize = distance < 0 ? -1 : 1; // if distance is negative then we set stepSize to -1

    var steps = Math.abs(distance / stepSize); // the amount of steps required to get to endSize

    intervalTime = speed / steps; // we need to adjust our animation specs if interval time exceeds 60FPS eg intervalTime < 16.67ms

    if (Math.abs(intervalTime) < 1000 / 60) {
      intervalTime = 1000 / 60; // let’s not get lower that 60FPS

      steps = Math.ceil(Math.abs(speed / intervalTime)); // we now need the steps and make sure we ceil them so -1 won't make them negative

      stepSize = distance / steps; // last thing is step sizes which are derived from all of the above
    }

    return {
      stepSize: stepSize,
      steps: steps - 1,
      intervalTime: intervalTime
    };
  } // export for node and babel environments


  if (typeof module !== 'undefined') {
    animate.CalculateAnimationSpecs = CalculateAnimationSpecs;
  } //--------------------------------------------------------------------------------------------------------------------------------------------------------------
  // PUBLIC FUNCTIONS
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------

  /**
   * Getting computed CSS styles from normal browsers and IE
   *
   * @param {object} element  - The DOM element we want to get the computed style from
   * @param {string} property - The CSS property
   *
   * @return {string|integer} - The CSS value for the property
   */


  animate.GetCSSPropertyBecauseIE = function (element, property) {
    if (typeof getComputedStyle !== 'undefined') {
      return window.getComputedStyle(element)[property];
    } else {
      var space = element.currentStyle[property];

      if (space === 'auto') {
        space = AU.animate.CalculateAuto(element, property);
      }

      return space;
    }
  };
  /**
   * Calculate the size of the element when it’s dimension(height or width) is set to auto
   *
   * @param  {object} element   - The element to read auto height from
   * @param  {string} dimension - The dimension to measure
   *
   * @return {integer}          - The size of the element when at dimension(height or width) is set to 'auto'
   */


  animate.CalculateAuto = function (element, dimension) {
    var initialSize;
    var endSize;

    if (dimension === 'height') {
      initialSize = element.clientHeight; // get current height

      element.style[dimension] = 'auto'; // set height to auto

      endSize = element.clientHeight; // get height again

      element.style[dimension] = initialSize + 'px'; // set back to initial height
    } else {
      initialSize = element.clientWidth;
      element.style[dimension] = 'auto';
      endSize = element.clientWidth;
      element.style[dimension] = initialSize + 'px';
    }

    return parseInt(endSize);
  };
  /**
   * Stop any au animation on a DOM element
   *
   * @param  {object} element - The element to stop animating
   */


  animate.Stop = function (element) {
    clearInterval(element.AUanimation);
  };
  /**
   * The magical animation function
   *
   * @param  {object}         options          - The options for the animation
   * @param  {object}         options.element  - Element/s we are animating (DOM nodes)
   * @param  {string}         options.property - The CSS property to animate
   * @param  {integer|string} options.endSize  - The size the element should animate to. Can be 'auto' or pixel value
   * @param  {integer}        options.speed    - The speed of the animation in milliseconds [optional] [default: 250]
   * @param  {function}       options.callback - A function to be executed after the animation ends [optional]
   *
   * @return {unknown}                         - The return value passed on from our options.callback function [optional]
   */


  animate.Run = function (options) {
    // defaults
    var elements = options.element;
    var speed = options.speed || 250; // making a single DOM element iteratable

    if (elements.length === undefined) {
      elements = [elements];
    } // making a callback if none was provided


    if (typeof options.callback !== 'function') {
      options.callback = function () {};
    } // adding iteration counts


    elements[0].AUinteration = 0;
    elements[0].AUinterations = elements.length; // iterate over all DOM nodes

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i]; // this element

      AU.animate.Stop(element); // stop any previous animations

      var initialSize = parseInt(AU.animate.GetCSSPropertyBecauseIE(element, options.property)); // the elements current size

      var endSize = options.endSize; // the element end size

      if (options.endSize === 'auto') {
        // calculate what 'auto' means in pixel
        endSize = AU.animate.CalculateAuto(element, options.property);
      } // calculate our animation specs


      var animationSpecs = CalculateAnimationSpecs(initialSize, endSize, speed);
      var iterateCounter = initialSize; // set state

      if (animationSpecs.stepSize < 0) {
        element.AUtoggleState = 'closing';
      } else if (animationSpecs.stepSize > 0) {
        element.AUtoggleState = 'opening';
      } // scoping variable


      (function (element, initialSize, iterateCounter, animationSpecs, endSize) {
        // keep track of animation by adding it to the DOM element
        element.AUanimation = setInterval(function () {
          // when we are at the end
          if (initialSize === endSize || animationSpecs.steps === 0) {
            AU.animate.Stop(element);
            element.style[options.property] = endSize + 'px'; // set to endSize

            element.AUtoggleState = '';
            elements[0].AUinteration++; // removing auto so CSS can take over

            if (options.endSize === 'auto') {
              element.style[options.property] = '';
            } // when all iterations have finished, run the callback


            if (elements[0].AUinteration >= elements[0].AUinterations) {
              return options.callback();
            }
          } // if we are still animating
          else {
              iterateCounter += animationSpecs.stepSize;
              element.style[options.property] = iterateCounter + 'px';
              animationSpecs.steps--;
            }
        }, Math.abs(animationSpecs.intervalTime));
      })(element, initialSize, iterateCounter, animationSpecs, endSize);
    }
  };
  /**
   * Toggle animation
   *
   * @param  {object}         options              - The options for the animation
   * @param  {object}         options.element      - Element/s we are animating (DOM nodes)
   * @param  {string}         options.property     - The CSS property to animate [optional] [default: 'height']
   * @param  {integer|string} options.closeSize    - The size the element should close to. Can be 'auto' or pixel value [optional] [default: 0]
   * @param  {integer|string} options.openSize     - The size the element should open to. Can be 'auto' or pixel value [optional] [default: 'auto']
   * @param  {integer}        options.speed        - The speed of the animation in milliseconds [optional] [default: 250]
   * @param  {function}       options.prefunction  - A function to be executed before each animation starts, passes {object} element, {string} state [optional]
   * @param  {function}       options.postfunction - A function to be executed after each animation ends, passes {object} element, {string} state [optional]
   * @param  {function}       options.callback     - A function to be executed after the animation ends, passes {object} element, {string} state [optional]
   *
   * @return {unknown}                             - The return value passed on from our options.callback function [optional]
   */


  animate.Toggle = function (options) {
    var elements = options.element;
    var property = options.property || 'height';
    var speed = options.speed || 250;
    var closeSize = options.closeSize === undefined ? 0 : options.closeSize;
    var openSize = options.openSize === undefined ? 'auto' : options.openSize; // making a single DOM element iteratable

    if (elements.length === undefined) {
      elements = [elements];
    } // making a prefunction if none was provided


    if (typeof options.prefunction !== 'function') {
      options.prefunction = function () {};
    } // making a postfunction if none was provided


    if (typeof options.postfunction !== 'function') {
      options.postfunction = function () {};
    } // making a callback if none was provided


    if (typeof options.callback !== 'function') {
      options.callback = function () {};
    } // adding iteration counts


    elements[0].AUtoggleInteration = 0;
    elements[0].AUtoggleInterations = elements.length; // iterate over all DOM nodes

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      AU.animate.Stop(element);
      var targetSize; // the size the element should open/close to after toggle is clicked

      var preState = ''; // the state we animate to for the prefunction and callback functions

      var postState = ''; // the state we animate to for the prefunction and callback functions

      var currentSize = parseInt(AU.animate.GetCSSPropertyBecauseIE(element, options.property)); // the current size of the element

      if (currentSize === closeSize || element.AUtoggleState === 'closing') {
        targetSize = openSize;
        preState = 'opening';
        postState = 'open';
      } else if (currentSize !== closeSize || element.AUtoggleState === 'opening') {
        targetSize = closeSize;
        preState = 'closing';
        postState = 'closed';
      } else {
        throw new Error('AU.animate.Toggle cannot determine state of element');
      } // run prefunction once per element


      options.prefunction(element, preState); // shoot off animation

      AU.animate.Run({
        element: element,
        endSize: targetSize,
        property: property,
        speed: speed,
        callback: function callback() {
          // making sure we fire the callback only once
          elements[0].AUtoggleInteration++;

          if (elements[0].AUtoggleInteration === elements[0].AUinterations) {
            var returnParam = options.callback(element, postState); // run postfunction once per element

            options.postfunction(element, postState);
            return returnParam;
          } // run postfunction once per element


          options.postfunction(element, postState);
        }
      });
    }
  };

  AU.animate = animate;
})(AU);

if (typeof module !== 'undefined') {
  module.exports = AU;
}

if (typeof exports !== 'undefined') {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  eval('exports.default = AU');
}
/*! @gov.au/accordion v7.0.7 */

/***************************************************************************************************************************************************************
 *
 * Accordion function
 *
 * A component to allow users to show or hide page elements.
 *
 **************************************************************************************************************************************************************/


var AU = AU || {};

(function (AU) {
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------
  // NAMESPACE MODULE
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------
  var accordion = {}; //--------------------------------------------------------------------------------------------------------------------------------------------------------------
  // PRIVATE FUNCTIONS
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------

  /**
   * PRIVATE
   * Set the correct Aria roles for given element on the accordion title and body
   *
   * @param  {object} element - The DOM element we want to set attributes for
   * @param  {object} target  - The DOM element we want to set attributes for
   * @param  {string} state   - The DOM element we want to set attributes for
   */

  function setAriaRoles(element, target, state) {
    if (state === 'closing') {
      element.setAttribute('aria-expanded', false);
    } else {
      element.setAttribute('aria-expanded', true);
    }
  }
  /**
   * PRIVATE
   * IE8 compatible function for replacing classes on a DOM node
   *
   * @param  {object} element      - The DOM element we want to toggle classes on
   * @param  {object} target       - The DOM element we want to toggle classes on
   * @param  {object} state        - The current state of the animation on the element
   * @param  {string} openingClass - The firstClass you want to toggle on the DOM node
   * @param  {string} closingClass - The secondClass you want to toggle on the DOM node
   */


  function toggleClasses(element, state, openingClass, closingClass) {
    if (state === 'opening' || state === 'open') {
      var oldClass = openingClass || 'au-accordion--closed';
      var newClass = closingClass || 'au-accordion--open';
    } else {
      var oldClass = closingClass || 'au-accordion--open';
      var newClass = openingClass || 'au-accordion--closed';
    }

    removeClass(element, oldClass);
    addClass(element, newClass);
  }
  /**
   * PRIVATE
   * IE8 compatible function for removing a class
   *
   * @param  {object} element   - The DOM element we want to manipulate
   * @param  {object} className - The name of the class to be removed
   */


  function removeClass(element, className) {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
  }
  /**
   * PRIVATE
   * IE8 compatible function for adding a class
   *
   * @param  {object} element   - The DOM element we want to manipulate
   * @param  {object} className - The name of the class to be added
   */


  function addClass(element, className) {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className = element.className + " " + className;
    }
  } //--------------------------------------------------------------------------------------------------------------------------------------------------------------
  // PUBLIC FUNCTIONS
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------

  /**
   * Toggle an accordion element
   *
   * @param  {string}  elements  - The DOM node/s to toggle
   * @param  {integer} speed     - The speed in ms for the animation
   * @param  {object}  callbacks - An object of four optional callbacks: { onOpen, afterOpen, onClose, afterClose }
   *
   */


  accordion.Toggle = function (elements, speed, callbacks) {
    // stop event propagation
    try {
      window.event.cancelBubble = true;
      event.stopPropagation();
    } catch (error) {} // making sure we can iterate over just one DOM element


    if (elements.length === undefined) {
      elements = [elements];
    } // check this once


    if (_typeof(callbacks) != 'object') {
      callbacks = {};
    }

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var targetId = element.getAttribute('aria-controls');
      var target = document.getElementById(targetId);

      if (target == null) {
        throw new Error('AU.accordion.Toggle cannot find the target to be toggled from inside aria-controls.\n' + 'Make sure the first argument you give AU.accordion.Toggle is the DOM element (a button or a link) that has an aria-controls attribute that points ' + 'to a div that you want to toggle.');
      }

      target.style.display = 'block';

      (function (element) {
        AU.animate.Toggle({
          element: target,
          property: 'height',
          speed: speed || 250,
          prefunction: function prefunction(target, state) {
            if (state === 'opening') {
              target.style.display = 'block'; // run when opening

              if (typeof callbacks.onOpen === 'function') {
                callbacks.onOpen();
              }
            } else {
              // run when closing
              if (typeof callbacks.onClose === 'function') {
                callbacks.onClose();
              }
            }

            setAriaRoles(element, target, state);
            toggleClasses(element, state);
          },
          postfunction: function postfunction(target, state) {
            if (state === 'closed') {
              // run after closing
              target.style.display = '';
              target.style.height = '';

              if (typeof callbacks.afterClose === 'function') {
                callbacks.afterClose();
              }
            } else {
              // run after opening
              target.style.display = '';
              target.style.height = '';

              if (typeof callbacks.afterOpen === 'function') {
                callbacks.afterOpen();
              }
            }

            toggleClasses(target, state);
          }
        });
      })(element);
    }

    return false;
  };
  /**
   * Open a group of accordion elements
   *
   * @param  {string}  elements - The DOM node/s to toggle
   * @param  {integer} speed    - The speed in ms for the animation
   *
   */


  accordion.Open = function (elements, speed) {
    // stop event propagation
    try {
      window.event.cancelBubble = true;
      event.stopPropagation();
    } catch (error) {}

    if (elements.length === undefined) {
      elements = [elements];
    }

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var targetId = element.getAttribute('aria-controls');
      var target = document.getElementById(targetId); // let’s find out if this accordion is still closed

      var height = 0;

      if (typeof getComputedStyle !== 'undefined') {
        height = window.getComputedStyle(target).height;
      } else {
        height = target.currentStyle.height;
      }

      if (parseInt(height) === 0) {
        target.style.height = '0px';
      }

      target.style.display = '';
      toggleClasses(target, 'opening');
      toggleClasses(element, 'opening');
      setAriaRoles(element, target, 'opening');

      (function (target, speed, element) {
        AU.animate.Run({
          element: target,
          property: 'height',
          endSize: 'auto',
          speed: speed || 250,
          callback: function callback() {
            toggleClasses(element, 'opening');
          }
        });
      })(target, speed, element);
    }
  };
  /**
   * Close a group of accordion elements
   *
   * @param  {string}  elements - The DOM node/s to toggle
   * @param  {integer} speed    - The speed in ms for the animation
   *
   */


  accordion.Close = function (elements, speed) {
    // stop event propagation
    try {
      window.event.cancelBubble = true;
      event.stopPropagation();
    } catch (error) {}

    if (elements.length === undefined) {
      elements = [elements];
    }

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var targetId = element.getAttribute('aria-controls');
      var target = document.getElementById(targetId);
      toggleClasses(element, 'closing');
      setAriaRoles(element, target, 'closing');

      (function (target, speed) {
        AU.animate.Run({
          element: target,
          property: 'height',
          endSize: 0,
          speed: speed || 250,
          callback: function callback() {
            target.style.display = '';
            toggleClasses(target, 'close');
          }
        });
      })(target, speed);
    }
  };

  AU.accordion = accordion;
})(AU);

if (typeof module !== 'undefined') {
  module.exports = AU;
}

$(document).ready(function () {
  $(".accordion").on("click", ".accordion-button", function () {
    if ($(this).hasClass("rotate-90")) {
      $(this).removeClass("rotate-90");
    } else {
      $(this).addClass("rotate-90");
    }

    $(this).parent().find(".accordion-content").toggle();
  });
  $(document).on("click", "a", function (e) {
    if (!(_typeof($(this).attr("disabled")) !== undefined && $(this).attr("disabled") !== "disabled" && $(this).attr("disabled") !== "")) {
      e.preventDefault();
      return false;
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZ2V0VXJsUGFyYW1ldGVyIiwic1BhcmFtIiwic1BhZ2VVUkwiLCJkZWNvZGVVUklDb21wb25lbnQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0cmluZyIsInNVUkxWYXJpYWJsZXMiLCJzcGxpdCIsInNQYXJhbWV0ZXJOYW1lIiwiaSIsImxlbmd0aCIsInVuZGVmaW5lZCIsInRvZGF5IiwibW9tZW50IiwiZm9ybWF0IiwiJCIsImh0bWwiLCJqUXVlcnkiLCJkb2N1bWVudCIsInJlYWR5IiwicGFuZWxzIiwibWFwIiwiaW5kZXgiLCJwYW5lbCIsInBhbmVsQ29udGFpbmVyIiwiZmluZCIsInBhbmVsSGVhZGVyIiwib3JpZ2luWCIsImxhc3RYIiwiZHJhZ2dpbmciLCJ1aUJ1bmNoIiwiYWRkIiwib24iLCJldmVudCIsInRhcmdldCIsImlzIiwic2NyZWVuWCIsInRhcmdldFRvdWNoZXMiLCJuZXdYIiwiY3NzIiwicmlnaHQiLCJvZmZzZXRXaWR0aCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJzZXRUaW1lb3V0IiwidHJhbnNpdGlvbiIsInJhbmRvbVdUb2FzdFR5cGVzIiwicmFuZG9tV29yZHMiLCJnZXRSYW5kb21BcmJpdHJhcnkiLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kSW50IiwiYW5pbWFsIiwidG9hc3RUeXBlIiwiYm9keSIsInNldEF0dHJpYnV0ZSIsImZvY3VzIiwicmVtb3ZlQXR0cmlidXRlIiwibm93IiwiRGF0ZSIsInRvTG9jYWxlU3RyaW5nIiwiYXBwZW5kIiwic2hvdyIsImhpZGUiLCJFbGVtZW50IiwicHJvdG90eXBlIiwibWF0Y2hlcyIsIm1zTWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwiY2xvc2VzdCIsInMiLCJlbCIsImRvY3VtZW50RWxlbWVudCIsImNvbnRhaW5zIiwicGFyZW50RWxlbWVudCIsInBhcmVudE5vZGUiLCJub2RlVHlwZSIsImdldE9mZnNldERvY3VtZW50VG9wIiwicEVsZW1lbnQiLCJzY3JvbGxUb3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJyZWdpc3RlclRvb2x0aXAiLCJST09UX0VMRU1FTlRfQ0xBU1MiLCJUQUJfQ0xBU1MiLCJBUklBX0hJRERFTl9BVFRSIiwiQVJJQV9FWFBBTkRFRF9BVFRSIiwiY29udHJvbCIsInJvb3RFbGVtZW50IiwiY29udGVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ0YWIiLCJtZXNzYWdlIiwiY2xvc2UiLCJ0YWJPcmlnaW5hbENsYXNzTmFtZSIsImNsYXNzTmFtZSIsInNob3dUb29sdGlwIiwiY2xvYWsiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJjc3NUZXh0IiwiaW5zZXJ0QmVmb3JlIiwiYXBwZW5kQ2hpbGQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY2xpY2tPdXRIYW5kbGVyIiwicmVtb3ZlQ2hpbGQiLCJjbGllbnRIZWlnaHQiLCJjb25zb2xlIiwibG9nIiwib2Zmc2V0VG9wIiwib2Zmc2V0SGVpZ2h0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImVzY2FwZUhhbmRsZXIiLCJoaWRlVG9vbHRpcCIsImNsb3NlVG9vbHRpcCIsInBFdmVudCIsImtleSIsInByZXZlbnREZWZhdWx0IiwiZm9yRWFjaCIsImNhbGwiLCJjbGljayIsImV2Iiwic2libGluZ3MiLCJ0aGlzQm94IiwibmV4dCIsIm5vdCIsIm1vdXNlb3ZlciIsImNoZWNrZWRCb3giLCJtb3VzZWxlYXZlIiwiY2xhaW1UeXBlIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIm9wZW4iLCJpbml0aWFsQnV0dG9uVGV4dCIsInRvZ2dsZUNsYXNzIiwic3RvcFByb3BhZ2F0aW9uIiwiaW5wdXRzIiwicXVlcnlTZWxlY3RvckFsbCIsIkFycmF5IiwiaW5wdXQiLCJsYWJlbCIsIm5leHRFbGVtZW50U2libGluZyIsImxhYmVsVmFsIiwiaW5uZXJIVE1MIiwiY2F0ZWdvcnlUciIsImNhdGVnb3J5IiwicXVlcnlTZWxlY3RvciIsImNhdGVnb3J5TmFtZSIsImUiLCJ2YWx1ZSIsImZpbGVOYW1lIiwicG9wIiwib3V0ZXJIVE1MIiwiY2xhc3NMaXN0Iiwic3RhdHVzIiwiY2F0ZWdvcnlUckNsYXNzIiwicmVtb3ZlIiwiQVUiLCJhbmltYXRlIiwiQ2FsY3VsYXRlQW5pbWF0aW9uU3BlY3MiLCJpbml0aWFsU2l6ZSIsImVuZFNpemUiLCJzcGVlZCIsInN0ZXBTaXplIiwic3RlcHMiLCJpbnRlcnZhbFRpbWUiLCJkaXN0YW5jZSIsImFicyIsImNlaWwiLCJtb2R1bGUiLCJHZXRDU1NQcm9wZXJ0eUJlY2F1c2VJRSIsImVsZW1lbnQiLCJwcm9wZXJ0eSIsImdldENvbXB1dGVkU3R5bGUiLCJzcGFjZSIsImN1cnJlbnRTdHlsZSIsIkNhbGN1bGF0ZUF1dG8iLCJkaW1lbnNpb24iLCJjbGllbnRXaWR0aCIsInBhcnNlSW50IiwiU3RvcCIsImNsZWFySW50ZXJ2YWwiLCJBVWFuaW1hdGlvbiIsIlJ1biIsIm9wdGlvbnMiLCJlbGVtZW50cyIsImNhbGxiYWNrIiwiQVVpbnRlcmF0aW9uIiwiQVVpbnRlcmF0aW9ucyIsImFuaW1hdGlvblNwZWNzIiwiaXRlcmF0ZUNvdW50ZXIiLCJBVXRvZ2dsZVN0YXRlIiwic2V0SW50ZXJ2YWwiLCJUb2dnbGUiLCJjbG9zZVNpemUiLCJvcGVuU2l6ZSIsInByZWZ1bmN0aW9uIiwicG9zdGZ1bmN0aW9uIiwiQVV0b2dnbGVJbnRlcmF0aW9uIiwiQVV0b2dnbGVJbnRlcmF0aW9ucyIsInRhcmdldFNpemUiLCJwcmVTdGF0ZSIsInBvc3RTdGF0ZSIsImN1cnJlbnRTaXplIiwiRXJyb3IiLCJyZXR1cm5QYXJhbSIsImV4cG9ydHMiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV2YWwiLCJhY2NvcmRpb24iLCJzZXRBcmlhUm9sZXMiLCJzdGF0ZSIsInRvZ2dsZUNsYXNzZXMiLCJvcGVuaW5nQ2xhc3MiLCJjbG9zaW5nQ2xhc3MiLCJvbGRDbGFzcyIsIm5ld0NsYXNzIiwicmVwbGFjZSIsIlJlZ0V4cCIsImpvaW4iLCJjYWxsYmFja3MiLCJjYW5jZWxCdWJibGUiLCJlcnJvciIsInRhcmdldElkIiwiZ2V0QXR0cmlidXRlIiwiZ2V0RWxlbWVudEJ5SWQiLCJkaXNwbGF5Iiwib25PcGVuIiwib25DbG9zZSIsImhlaWdodCIsImFmdGVyQ2xvc2UiLCJhZnRlck9wZW4iLCJPcGVuIiwiQ2xvc2UiLCJoYXNDbGFzcyIsInBhcmVudCIsInRvZ2dsZSIsImF0dHIiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFJQSxlQUFlLEdBQUcsU0FBU0EsZUFBVCxDQUF5QkMsTUFBekIsRUFBaUM7QUFDckQsTUFBSUMsUUFBUSxHQUFHQyxrQkFBa0IsQ0FBQ0MsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxNQUFoQixDQUF1QkMsU0FBdkIsQ0FBaUMsQ0FBakMsQ0FBRCxDQUFqQztBQUFBLE1BQ0VDLGFBQWEsR0FBR04sUUFBUSxDQUFDTyxLQUFULENBQWUsR0FBZixDQURsQjtBQUFBLE1BRUVDLGNBRkY7QUFBQSxNQUdFQyxDQUhGOztBQUtBLE9BQUtBLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBR0gsYUFBYSxDQUFDSSxNQUE5QixFQUFzQ0QsQ0FBQyxFQUF2QyxFQUEyQztBQUN6Q0QsSUFBQUEsY0FBYyxHQUFHRixhQUFhLENBQUNHLENBQUQsQ0FBYixDQUFpQkYsS0FBakIsQ0FBdUIsR0FBdkIsQ0FBakI7O0FBRUEsUUFBSUMsY0FBYyxDQUFDLENBQUQsQ0FBZCxLQUFzQlQsTUFBMUIsRUFBa0M7QUFDaEMsYUFBT1MsY0FBYyxDQUFDLENBQUQsQ0FBZCxLQUFzQkcsU0FBdEIsR0FBa0MsSUFBbEMsR0FBeUNILGNBQWMsQ0FBQyxDQUFELENBQTlEO0FBQ0Q7QUFDRjtBQUNGLENBYkQsQyxDQWVBOzs7QUFDQSxJQUFJSSxLQUFLLEdBQUdDLE1BQU0sR0FBR0MsTUFBVCxDQUFnQixhQUFoQixDQUFaO0FBQ0FDLENBQUMsQ0FBQyxnQkFBRCxDQUFELENBQW9CQyxJQUFwQixDQUF5Qkos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QUMsQ0FBQyxJQUFELENBQUQsQ0FBUWlPLElBQVIsQ0FBYSxVQUFiLE1BQTZCLEVBQTNILENBQUosRUFBb0k7QUFDbEkxRixNQUFBQSxDQUFDLENBQUMvQixjQUFGO0FBQ0EsYUFBTyxLQUFQO0FBQ0Q7QUFFRixHQVBEO0FBUUQsQ0FuQkQiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZ2V0VXJsUGFyYW1ldGVyID0gZnVuY3Rpb24gZ2V0VXJsUGFyYW1ldGVyKHNQYXJhbSkge1xuICB2YXIgc1BhZ2VVUkwgPSBkZWNvZGVVUklDb21wb25lbnQod2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSkpLFxuICAgIHNVUkxWYXJpYWJsZXMgPSBzUGFnZVVSTC5zcGxpdCgnJicpLFxuICAgIHNQYXJhbWV0ZXJOYW1lLFxuICAgIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNVUkxWYXJpYWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICBzUGFyYW1ldGVyTmFtZSA9IHNVUkxWYXJpYWJsZXNbaV0uc3BsaXQoJz0nKTtcblxuICAgIGlmIChzUGFyYW1ldGVyTmFtZVswXSA9PT0gc1BhcmFtKSB7XG4gICAgICByZXR1cm4gc1BhcmFtZXRlck5hbWVbMV0gPT09IHVuZGVmaW5lZCA/IHRydWUgOiBzUGFyYW1ldGVyTmFtZVsxXTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIHRvZGF5J3MgZGF0ZSBhdmFpbGFibGUgZXZlcnl3aGVyZSBcbnZhciB0b2RheSA9IG1vbWVudCgpLmZvcm1hdCgnRCBNTU1NIFlZWVknKTtcbiQoXCIucHQtZGF0ZS10b2RheVwiKS5odG1sKHRvZGF5KTtcblxuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgkKSB7XG4gIC8vIEhlbHAgc2xpZGUgZ2VzdHVyZVxuICBsZXQgcGFuZWxzID0gJCgnLnBhbmVsJyk7XG4gIHBhbmVscy5tYXAoKGluZGV4LCBwYW5lbCkgPT4ge1xuICAgIGxldCBwYW5lbENvbnRhaW5lciA9ICQocGFuZWwpLmZpbmQoJy5wYW5lbC1jb250YWluZXInKTtcbiAgICBsZXQgcGFuZWxIZWFkZXIgPSAkKHBhbmVsKS5maW5kKCcucGFuZWwtaGVhZGVyJyk7XG4gICAgbGV0IG9yaWdpblggPSAwO1xuICAgIGxldCBsYXN0WCA9IDA7XG4gICAgbGV0IGRyYWdnaW5nID0gZmFsc2U7XG4gICAgbGV0IHVpQnVuY2ggPSBwYW5lbENvbnRhaW5lci5hZGQocGFuZWxIZWFkZXIpO1xuICAgIHVpQnVuY2gub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoIWRyYWdnaW5nICYmICEkKGV2ZW50LnRhcmdldCkuaXMoJy5wYW5lbC1jbG9zZScpKSB7XG4gICAgICAgIGRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgb3JpZ2luWCA9IGV2ZW50LnNjcmVlblggfHwgZXZlbnQudGFyZ2V0VG91Y2hlc1swXS5zY3JlZW5YO1xuICAgICAgICBsYXN0WCA9IG9yaWdpblg7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdWlCdW5jaC5vbignbW91c2Vtb3ZlIHRvdWNobW92ZScsIChldmVudCkgPT4ge1xuICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgIGxhc3RYID0gKGV2ZW50LnNjcmVlblggfHwgZXZlbnQudGFyZ2V0VG91Y2hlc1swXS5zY3JlZW5YKTtcbiAgICAgICAgbGV0IG5ld1ggPSBsYXN0WCAtIG9yaWdpblg7XG4gICAgICAgIGlmIChuZXdYID49IDApXG4gICAgICAgICAgdWlCdW5jaC5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6IC1uZXdYICsgJ3B4J1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHVpQnVuY2gub24oJ21vdXNldXAgdG91Y2hlbmQnLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChkcmFnZ2luZyAmJiAhJChldmVudC50YXJnZXQpLmlzKCcucGFuZWwtY2xvc2UnKSkge1xuICAgICAgICBkcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICBsZXQgbmV3WCA9IChldmVudC5zY3JlZW5YIHx8IGxhc3RYKSAtIG9yaWdpblg7XG4gICAgICAgIGlmIChuZXdYID4gKHBhbmVsQ29udGFpbmVyWzBdLm9mZnNldFdpZHRoICogMC4yNSkpIHtcbiAgICAgICAgICAkKHBhbmVsKS5yZW1vdmVDbGFzcygnaXMtdmlzaWJsZScpLmFkZENsYXNzKCdzd2lwZS1jbG9zaW5nJyk7XG4gICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJChwYW5lbCkucmVtb3ZlQ2xhc3MoJ3N3aXBlLWNsb3NpbmcnKTtcbiAgICAgICAgICAgIHVpQnVuY2guY3NzKHtcbiAgICAgICAgICAgICAgcmlnaHQ6ICcnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LCA0MDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVpQnVuY2guY3NzKHtcbiAgICAgICAgICAgIHJpZ2h0OiAnMHB4JyxcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICdyaWdodCAwLjNzJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHVpQnVuY2guY3NzKHtcbiAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cblxuICAvLyBUb2FzdCBtb2NrdXBcbiAgJChcIi5jYWxsLXRvYXN0XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgIHZhciByYW5kb21XVG9hc3RUeXBlcyA9IFtcInN1Y2Nlc3NcIiwgXCJpbmZvcm1hdGlvblwiLCBcImFsZXJ0XCIsIFwiZXJyb3JcIl07XG4gICAgdmFyIHJhbmRvbVdvcmRzID0gW1wiaW5rIEZhaXJ5IEFybWFkaWxsb1wiLCBcIk9rYXBpXCIsIFwiR2xhdWN1cyBBdGxhbnRpY3VzXCIsIFwiVGhlIE1hbmVkIFdvbGZcIiwgXCJGb3NzYVwiLCBcIklndWFuYVwiXTtcblxuICAgIGZ1bmN0aW9uIGdldFJhbmRvbUFyYml0cmFyeShtYXgpIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKG1heCkpO1xuICAgIH1cbiAgICB2YXIgcmFuZEludCA9IGdldFJhbmRvbUFyYml0cmFyeSg0KTtcbiAgICB2YXIgYW5pbWFsID0gcmFuZG9tV29yZHNbcmFuZEludF07XG4gICAgdmFyIHRvYXN0VHlwZSA9IHJhbmRvbVdUb2FzdFR5cGVzW3JhbmRJbnRdO1xuXG4gICAgZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcbiAgICBkb2N1bWVudC5ib2R5LmZvY3VzKCk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG5cbiAgICB2YXIgbm93ID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpO1xuXG4gICAgalF1ZXJ5KCcudG9hc3QtY29udGFpbmVyJykuYXBwZW5kKCc8YnV0dG9uIGNsYXNzPVwidWlraXQtYnRuIHRvYXN0XCIgcm9sZT1cImFsZXJ0XCIgdHlwZT1cImJ1dHRvblwiPjxkaXYgY2xhc3M9XCJ0b2FzdF9fdHlwZSB0b2FzdF9fdHlwZS0tJyArIHRvYXN0VHlwZSArICdcIj48c3BhbiBjbGFzcz1cInNyXCI+JyArIHRvYXN0VHlwZSArICc8L3NwYW4+PC9kaXY+PGRpdiBjbGFzcz1cInRvYXN0X19tZXNzYWdlXCI+PHA+WW91IGFkZGVkIGEgJyArIGFuaW1hbCArICcgYXQgJyArIG5vdyArICc8L3A+PC9kaXY+PC9idXR0b24+Jyk7XG5cbiAgICBqUXVlcnkoXCIudG9hc3QtY29udGFpbmVyXCIpLnNob3coKTtcbiAgfSk7XG5cbiAgalF1ZXJ5KFwiLnRvYXN0LWNvbnRhaW5lclwiKS5vbihcImNsaWNrXCIsIFwiYnV0dG9uXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGpRdWVyeSh0aGlzKS5oaWRlKCk7XG4gIH0pO1xuXG5cblxuICAvLyBtYXRjaGVzIHBvbGx5ZmlsbFxuICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID0gRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yXG4gIH1cblxuICAvL2Nsb3Nlc3QgcG9sbHlmaWxsXG4gIGlmICghRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCkge1xuICAgIEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QgPSBmdW5jdGlvbiAocykge1xuICAgICAgdmFyIGVsID0gdGhpc1xuICAgICAgaWYgKCFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGFpbnMoZWwpKSByZXR1cm4gbnVsbFxuICAgICAgZG8ge1xuICAgICAgICBpZiAoZWwubWF0Y2hlcyhzKSkgcmV0dXJuIGVsXG4gICAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudCB8fCBlbC5wYXJlbnROb2RlXG4gICAgICB9IHdoaWxlIChlbCAhPT0gbnVsbCAmJiBlbC5ub2RlVHlwZSA9PT0gMSlcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cblxuICAvLyBUb29sdGlwXG4gIGZ1bmN0aW9uIGdldE9mZnNldERvY3VtZW50VG9wKHBFbGVtZW50KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgKyBwRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3BcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyVG9vbHRpcChwRWxlbWVudCkge1xuXG4gICAgY29uc3QgUk9PVF9FTEVNRU5UX0NMQVNTID0gJ3Rvb2x0aXAnXG4gICAgY29uc3QgVEFCX0NMQVNTID0gYCR7Uk9PVF9FTEVNRU5UX0NMQVNTfV9fdGFiYFxuXG4gICAgY29uc3QgQVJJQV9ISURERU5fQVRUUiA9ICdhcmlhLWhpZGRlbidcbiAgICBjb25zdCBBUklBX0VYUEFOREVEX0FUVFIgPSAnYXJpYS1leHBhbmRlZCdcblxuICAgIGNvbnN0IGNvbnRyb2wgPSBwRWxlbWVudFxuICAgIGNvbnN0IHJvb3RFbGVtZW50ID0gY29udHJvbC5jbG9zZXN0KGAuJHtST09UX0VMRU1FTlRfQ0xBU1N9YClcbiAgICBjb25zdCBjb250ZW50ID0gcm9vdEVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHtST09UX0VMRU1FTlRfQ0xBU1N9X19jb250ZW50YClbMF1cbiAgICBjb25zdCB0YWIgPSByb290RWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFRBQl9DTEFTUylbMF1cbiAgICBjb25zdCBtZXNzYWdlID0gcm9vdEVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHtST09UX0VMRU1FTlRfQ0xBU1N9X19tZXNzYWdlYClbMF1cbiAgICBjb25zdCBjbG9zZSA9IHJvb3RFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7Uk9PVF9FTEVNRU5UX0NMQVNTfV9fY2xvc2VgKVswXVxuXG4gICAgY29uc3QgdGFiT3JpZ2luYWxDbGFzc05hbWUgPSB0YWIuY2xhc3NOYW1lXG5cbiAgICBmdW5jdGlvbiBzaG93VG9vbHRpcCgpIHtcbiAgICAgIGNvbnN0IGNsb2FrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIGNsb2FrLnN0eWxlLmNzc1RleHQgPSAnaGVpZ2h0OiAwOyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7J1xuICAgICAgY29udGVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShjbG9haywgY29udGVudClcbiAgICAgIGNsb2FrLmFwcGVuZENoaWxkKGNvbnRlbnQpXG5cbiAgICAgIGNvbnRlbnQuc2V0QXR0cmlidXRlKEFSSUFfSElEREVOX0FUVFIsIGZhbHNlKVxuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrT3V0SGFuZGxlcilcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNsb2FrLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoY29udGVudClcbiAgICAgICAgY2xvYWsucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjbG9haylcblxuICAgICAgICBjb250cm9sLnNldEF0dHJpYnV0ZShBUklBX0VYUEFOREVEX0FUVFIsIHRydWUpXG5cbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gYCR7dGFiT3JpZ2luYWxDbGFzc05hbWV9ICR7VEFCX0NMQVNTfS0tYWN0aXZlYFxuXG4gICAgICAgIGlmIChjb250ZW50LmNsaWVudEhlaWdodCA+IChjb250ZW50LnNjcm9sbFRvcCArIGNvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdhZGRpbmcgdG9vbHRpcF9fdGFiLS1ib3R0b20nKTtcbiAgICAgICAgICB0YWIuY2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lfSAke1RBQl9DTEFTU30tLWJvdHRvbWBcbiAgICAgICAgICBjb250ZW50LnN0eWxlLnRvcCA9IGAke2NvbnRyb2wub2Zmc2V0VG9wICsgdGFiLmNsaWVudEhlaWdodCArIHRhYi5vZmZzZXRUb3AgKyB0YWIub2Zmc2V0SGVpZ2h0fXB4YFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdhZGRpbmcgdG9vbHRpcF9fdGFiLS10b3AnKTtcbiAgICAgICAgICB0YWIuY2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lfSAke1RBQl9DTEFTU30tLXRvcGBcbiAgICAgICAgICBjb250ZW50LnN0eWxlLnRvcCA9IGAke2NvbnRyb2wub2Zmc2V0VG9wIC0gY29udGVudC5jbGllbnRIZWlnaHQgKyB0YWIub2Zmc2V0VG9wfXB4YFxuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlc2NhcGVIYW5kbGVyKVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrT3V0SGFuZGxlcilcblxuICAgICAgICBjb250ZW50LmZvY3VzKClcbiAgICAgIH0sIDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGlkZVRvb2x0aXAoKSB7XG4gICAgICBjb250ZW50LnNldEF0dHJpYnV0ZShBUklBX0hJRERFTl9BVFRSLCB0cnVlKVxuICAgICAgY29udHJvbC5zZXRBdHRyaWJ1dGUoQVJJQV9FWFBBTkRFRF9BVFRSLCBmYWxzZSlcblxuICAgICAgdGFiLmNsYXNzTmFtZSA9IHRhYk9yaWdpbmFsQ2xhc3NOYW1lO1xuXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIGVzY2FwZUhhbmRsZXIpXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrT3V0SGFuZGxlcilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZVRvb2x0aXAoKSB7XG4gICAgICBoaWRlVG9vbHRpcCgpXG4gICAgICBjb250cm9sLmZvY3VzKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlc2NhcGVIYW5kbGVyKHBFdmVudCkge1xuICAgICAgaWYgKGV2ZW50LmtleSAhPT0gJ0VzY2FwZScpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChjb250ZW50LmNvbnRhaW5zKHBFdmVudC50YXJnZXQpKSB7XG4gICAgICAgIGNsb3NlVG9vbHRpcCgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoaWRlVG9vbHRpcCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xpY2tPdXRIYW5kbGVyKHBFdmVudCkge1xuICAgICAgaWYgKCFjb250ZW50LmNvbnRhaW5zKHBFdmVudC50YXJnZXQpKSB7XG4gICAgICAgIGhpZGVUb29sdGlwKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd1Rvb2x0aXApXG4gICAgY29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChwRXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgPT09ICcgJyB8fCBldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICBzaG93VG9vbHRpcCgpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VUb29sdGlwKVxuICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKHBFdmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJyAnIHx8IGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNsb3NlVG9vbHRpcCgpXG4gICAgICB9XG4gICAgfSlcblxuICB9XG5cbiAgW10uZm9yRWFjaC5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Rvb2x0aXBfX2NvbnRyb2wnKSwgcEVsZW1lbnQgPT4gcmVnaXN0ZXJUb29sdGlwKHBFbGVtZW50KSlcblxuICAvLyBUaHJlZSBzdGF0ZSBjaGVjayBib3hlcyBcbiAgJChcIi5teXMtcmFkaW9fX2NvbnRyb2xcIikuY2xpY2soZnVuY3Rpb24gKGV2KSB7XG4gICAgbGV0IHNpYmxpbmdzID0gJCh0aGlzKS5jbG9zZXN0KFwiLm15cy1yYWRpby1ncm91cFwiKS5maW5kKFwiLm15cy1yYWRpb19fYm94XCIpO1xuICAgIGxldCB0aGlzQm94ID0gJCh0aGlzKS5uZXh0KFwiLm15cy1yYWRpb19fYm94XCIpO1xuICAgICQoc2libGluZ3MpLnJlbW92ZUNsYXNzKCdteXMtcmFkaW9fX2JveC0tbm90LXNlbGVjdGVkJyk7XG4gICAgJChzaWJsaW5ncykubm90KHRoaXNCb3gpLmFkZENsYXNzKCdteXMtcmFkaW9fX2JveC0tbm90LXNlbGVjdGVkJyk7XG4gIH0pO1xuXG4gICQoXCIubXlzLXJhZGlvLWdyb3VwXCIpLm1vdXNlb3ZlcihmdW5jdGlvbiAoZXYpIHtcbiAgICBsZXQgY2hlY2tlZEJveCA9ICQodGhpcykuZmluZChcImlucHV0OmNoZWNrZWRcIikubmV4dChcIi5teXMtcmFkaW9fX2JveFwiKTtcbiAgICBpZiAoY2hlY2tlZEJveC5sZW5ndGggIT09IDApIHtcbiAgICAgIGxldCBzaWJsaW5ncyA9ICQodGhpcykuZmluZChcIi5teXMtcmFkaW9fX2JveFwiKTtcbiAgICAgIGxldCBjaGVja2VkQm94ID0gJCh0aGlzKS5uZXh0KFwiLm15cy1yYWRpb19fYm94XCIpO1xuICAgICAgJChzaWJsaW5ncykucmVtb3ZlQ2xhc3MoJ215cy1yYWRpb19fYm94LS1ub3Qtc2VsZWN0ZWQnKTtcbiAgICB9XG4gIH0pO1xuXG4gICQoXCIubXlzLXJhZGlvLWdyb3VwXCIpLm1vdXNlbGVhdmUoZnVuY3Rpb24gKGV2KSB7XG4gICAgbGV0IGNoZWNrZWRCb3ggPSAkKHRoaXMpLmZpbmQoXCJpbnB1dDpjaGVja2VkXCIpLm5leHQoXCIubXlzLXJhZGlvX19ib3hcIik7XG4gICAgaWYgKGNoZWNrZWRCb3gubGVuZ3RoICE9PSAwKSB7XG4gICAgICBsZXQgc2libGluZ3MgPSAkKHRoaXMpLmZpbmQoXCIubXlzLXJhZGlvX19ib3hcIik7XG4gICAgICAkKHNpYmxpbmdzKS5yZW1vdmVDbGFzcygnbXlzLXJhZGlvX19ib3gtLW5vdC1zZWxlY3RlZCcpO1xuICAgICAgJChzaWJsaW5ncykubm90KGNoZWNrZWRCb3gpLmFkZENsYXNzKCdteXMtcmFkaW9fX2JveC0tbm90LXNlbGVjdGVkJyk7XG4gICAgfVxuICB9KTtcblxuICB2YXIgY2xhaW1UeXBlID0gZ2V0VXJsUGFyYW1ldGVyKCdjbGFpbVR5cGUnKTtcblxuICBpZiAoY2xhaW1UeXBlKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NsYWltVHlwZScsIGNsYWltVHlwZSk7XG4gIH1cblxuXG4gIC8vIFN3YXAgdGV4dCBvbiB0b3AgcGFuZWwgYWNjb3JkaW9uIGJ1dHRvblxuICB2YXIgb3BlbiA9IGZhbHNlO1xuICB2YXIgaW5pdGlhbEJ1dHRvblRleHQgPSAkKFwiLmFjY29yZGlvbi10b3BwYW5lbC1idG5cIikuaHRtbCgpO1xuICAkKFwiLmFjY29yZGlvbi10b3BwYW5lbC1idG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xuXG4gICAgLy8gSSBkb24ndCB0aGluayB0aGlzIGlzIGEgZ29vZCBpZGVhXG4gICAgLy8gY2hhbmdlIHRoZSBidXR0b24gdGV4dFxuICAgIC8vIG9wZW4gPSAhb3BlbjtcbiAgICAvLyBpZiAob3Blbikge1xuICAgIC8vICAgJChcIi5hY2NvcmRpb24tdG9wcGFuZWwtYnRuXCIpLmh0bWwoXCJDbG9zZVwiKTtcbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgJChcIi5hY2NvcmRpb24tdG9wcGFuZWwtYnRuXCIpLmh0bWwoaW5pdGlhbEJ1dHRvblRleHQpO1xuICAgIC8vIH1cblxuICAgICQodGhpcykuY2xvc2VzdCgnLnVpa2l0LWFjY29yZGlvbicpLnRvZ2dsZUNsYXNzKFwiYWNjb3JkaW9uLWNsb3NlZFwiKTtcbiAgICAvLyBoaWRlIHRoZSBzd2l0Y2ggYWNjb3VudCBib3hcbiAgICAkKHRoaXMpLmNsb3Nlc3QoJy5jb250YWluZXInKS5maW5kKFwiLnN3aXRjaC1hY2NvdW50LWJveFwiKS5hZGRDbGFzcyhcInN3aXRjaC1hY2NvdW50LWJveC0taGlkZVwiKTtcbiAgfSk7XG5cbiAgLy8gc3dhcC1ib3gtdW4taGlkZVxuICAkKFwiLnN3aXRjaC1hY2NvdW50LWJ1dHRvblwiKS5jbGljayhmdW5jdGlvbiAoZXYpIHtcbiAgICAkKHRoaXMpLmNsb3Nlc3QoJy5jb250YWluZXInKS5maW5kKFwiLnN3aXRjaC1hY2NvdW50LWJveFwiKS50b2dnbGVDbGFzcyhcInN3aXRjaC1hY2NvdW50LWJveC0taGlkZVwiKTtcbiAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwic3dpdGNoLWFjY291bnQtYnV0dG9uLS1vcGVuXCIpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICAkKFwiLnN3aXRjaC1hY2NvdW50LWJveF9fbGlua1wiKS5jbGljayhmdW5jdGlvbiAoZXYpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG59KTtcblxuXG5cblxuXG5cbi8vIFBvQyBmaWxlIHVwbG9hZCBmb3IgcHJvdG90eXBlXG4vLyBUT0RPOjogaGFuZGxlIGNhbmNlbCBcbi8vIFRPRE86OiBhZGQgYWRkaXRpb25hbCBpdGVtcyBcblxuKGZ1bmN0aW9uIChkb2N1bWVudCwgd2luZG93LCBpbmRleCkge1xuICAvLyB2YXIgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZpbGUtdXBsb2FkX19pbnB1dCcpO1xuICAvLyBpZiAoIWlucHV0cykge1xuICB2YXIgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZpbGUtdXBsb2FkLWRlZmF1bHRfX2lucHV0Jyk7XG4gIC8vIH1cblxuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGlucHV0cywgZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgdmFyIGxhYmVsID0gaW5wdXQubmV4dEVsZW1lbnRTaWJsaW5nLFxuICAgICAgbGFiZWxWYWwgPSBsYWJlbC5pbm5lckhUTUwsXG4gICAgICBjYXRlZ29yeVRyID0gaW5wdXQuY2xvc2VzdChcInRyXCIpLFxuICAgICAgY2F0ZWdvcnkgPSBjYXRlZ29yeVRyLnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpLFxuICAgICAgY2F0ZWdvcnlOYW1lID0gJyc7XG5cbiAgICBpZiAoY2F0ZWdvcnkpIHtcbiAgICAgIGNhdGVnb3J5LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNhdGVnb3J5TmFtZSA9IHRoaXMudmFsdWU7XG4gICAgICB9KTtcbiAgICB9XG5cblxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgZmlsZU5hbWUgPSAnJztcblxuICAgICAgZmlsZU5hbWUgPSBlLnRhcmdldC52YWx1ZS5zcGxpdCgnXFxcXCcpLnBvcCgpO1xuXG4gICAgICBpZiAoZmlsZU5hbWUpIHtcblxuICAgICAgICBjYXRlZ29yeS5vdXRlckhUTUwgPSAnPGxhYmVsPicgKyBjYXRlZ29yeU5hbWUgKyAnPC9sYWJlbD4nO1xuXG4gICAgICAgIC8vIGxhYmVsLnF1ZXJ5U2VsZWN0b3IoJy5maWxlLXVwbG9hZC1kZWZhdWx0X19maWxlLW5hbWUnKS5pbm5lckhUTUwgPSBmaWxlTmFtZTtcbiAgICAgICAgY2F0ZWdvcnlUci5xdWVyeVNlbGVjdG9yKCcuZmlsZS11cGxvYWQtZGVmYXVsdF9fZmlsZS1uYW1lJykuaW5uZXJIVE1MID0gZmlsZU5hbWU7XG4gICAgICAgIGNhdGVnb3J5VHIucXVlcnlTZWxlY3RvcignLmZpbGUtdXBsb2FkLWRlZmF1bHRfX2ZpbGUtbmFtZScpLmNsYXNzTGlzdC5hZGQoJ2ZpbGUtdXBsb2FkLWRlZmF1bHRfX2ZpbGUtbmFtZS0tdXBsb2FkZWQnKTtcbiAgICAgICAgbGFiZWwucXVlcnlTZWxlY3RvcignLnVpa2l0LWJ0bicpLmlubmVySFRNTCA9ICdSZW1vdmUnO1xuICAgICAgICBsYWJlbC5xdWVyeVNlbGVjdG9yKCcudWlraXQtYnRuJykuY2xhc3NMaXN0LmFkZCgndWlraXQtYnRuLS10ZXJ0aWFyeScpO1xuXG4gICAgICAgICQoJy5maWxlLXVwbG9hZC0tYWRkJykuc2hvdygpO1xuICAgICAgICAkKCcucHQtdXBsb2FkLWxpc3Qtb3B0aW9uYWwnKS5zaG93KCk7XG5cbiAgICAgICAgdmFyIHN0YXR1cyA9IGNhdGVnb3J5VHIucXVlcnlTZWxlY3RvcignLmZpbGUtdXBsb2FkLWRlZmF1bHRfX2ZpbGUtbmFtZScpLmNsb3Nlc3QoJ3RyJyk7XG4gICAgICAgIHZhciBjYXRlZ29yeVRyQ2xhc3MgPSBjYXRlZ29yeVRyO1xuXG5cbiAgICAgICAgc3RhdHVzID0gc3RhdHVzLnF1ZXJ5U2VsZWN0b3IoJy5maWxlLXN0YXR1cycpO1xuICAgICAgICBpZiAoc3RhdHVzKSB7XG4gICAgICAgICAgc3RhdHVzLmlubmVySFRNTCA9ICdSZW1vdmUnO1xuICAgICAgICAgIHN0YXR1cy5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJzclwiPiBVcGxvYWRlZDwvc3Bhbj4nO1xuICAgICAgICAgIHN0YXR1cyA9IHN0YXR1cy5jbGFzc0xpc3Q7XG4gICAgICAgICAgc3RhdHVzLnJlbW92ZSgnZmlsZS1zdGF0dXMtLXJlcXVpcmVkJyk7XG4gICAgICAgICAgc3RhdHVzLmFkZCgnZmlsZS1zdGF0dXMtLXVwbG9hZGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjYXRlZ29yeVRyQ2xhc3MuY2xhc3NMaXN0LmFkZCgnZmlsZS11cGxvYWQtZGVmYXVsdF9fcm93LS11cGxvYWRlZCcpO1xuXG5cblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBsYWJlbC5pbm5lckhUTUwgPSBsYWJlbFZhbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEZpcmVmb3ggYnVnIGZpeFxuICAgIC8vIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgZnVuY3Rpb24gKCkgeyBpbnB1dC5jbGFzc0xpc3QuYWRkKCdoYXMtZm9jdXMnKTsgfSk7XG4gICAgLy8gaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uICgpIHsgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnaGFzLWZvY3VzJyk7IH0pO1xuICB9KTtcbn0oZG9jdW1lbnQsIHdpbmRvdywgMCkpO1xuXG5cblxuLyohIEBnb3YuYXUvYW5pbWF0ZSB2MS4wLjEyICovXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKlxuICogQW5pbWF0ZSBmdW5jdGlvblxuICpcbiAqIEEgZnVuY3Rpb24gdG8gb3BlbiwgY2xvc2UgYW5kIHRvZ2dsZSB0aGUgZGlzcGxheSBvZiBwYWdlIGVsZW1lbnRzLlxuICpcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIEFVID0gQVUgfHwge307XG5cbihmdW5jdGlvbiAoQVUpIHtcblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIE5BTUVTUEFDRSBNT0RVTEVcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICB2YXIgYW5pbWF0ZSA9IHt9XG5cblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFBSSVZBVEUgRlVOQ1RJT05TXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFBSSVZBVEVcbiAgICogQ2FsY3VsYXRlIHRoZSByZXF1aXJlbWVudHMgZm9yIHRoZSBkZXNpcmVkIGFuaW1hdGlvblxuICAgKlxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBpbml0aWFsU2l6ZSAtIFRoZSBpbml0aWFsIHNpemUgb2YgdGhlIGVsZW1lbnQgdG8gYW5pbWF0ZVxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBlbmRTaXplICAgICAtIFRoZSBzaXplIHRoZSBlbGVtZW50IGFmdGVyIHRoZSBhbmltYXRpb24gY29tcGxldGVzXG4gICAqIEBwYXJhbSAge3N0cmluZ30gIHNwZWVkICAgICAgIC0gVGhlIHNwZWVkIG9mIHRoZSBhbmltYXRpb24gaW4gbXNcbiAgICpcbiAgICogQHJldHVybiB7b2JqZWN0fSAgICAgICAgICAgICAgLSBSZXF1aXJlZCBzdGVwcywgc3RlcFNpemUgYW5kIGludGVydmFsVGltZSBmb3IgdGhlIGFuaW1hdGlvblxuICAgKi9cbiAgZnVuY3Rpb24gQ2FsY3VsYXRlQW5pbWF0aW9uU3BlY3MoaW5pdGlhbFNpemUsIGVuZFNpemUsIHNwZWVkKSB7XG5cbiAgICBpZiAoaW5pdGlhbFNpemUgPT09IGVuZFNpemUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0ZXBTaXplOiAwLFxuICAgICAgICBzdGVwczogMCxcbiAgICAgICAgaW50ZXJ2YWxUaW1lOiAwLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgZGlzdGFuY2UgPSBlbmRTaXplIC0gaW5pdGlhbFNpemU7IC8vIHRoZSBvdmVyYWxsIGRpc3RhbmNlIHRoZSBhbmltYXRpb24gbmVlZHMgdG8gdHJhdmVsXG4gICAgdmFyIGludGVydmFsVGltZSA9IChzcGVlZCAvIGRpc3RhbmNlKTsgLy8gdGhlIHRpbWUgZWFjaCBzZXRJbnRlcnZhbCBpdGVyYXRpb24gd2lsbCB0YWtlXG4gICAgdmFyIHN0ZXBTaXplID0gZGlzdGFuY2UgPCAwID8gLTEgOiAxOyAvLyBpZiBkaXN0YW5jZSBpcyBuZWdhdGl2ZSB0aGVuIHdlIHNldCBzdGVwU2l6ZSB0byAtMVxuICAgIHZhciBzdGVwcyA9IE1hdGguYWJzKGRpc3RhbmNlIC8gc3RlcFNpemUpOyAvLyB0aGUgYW1vdW50IG9mIHN0ZXBzIHJlcXVpcmVkIHRvIGdldCB0byBlbmRTaXplXG4gICAgaW50ZXJ2YWxUaW1lID0gc3BlZWQgLyBzdGVwcztcblxuICAgIC8vIHdlIG5lZWQgdG8gYWRqdXN0IG91ciBhbmltYXRpb24gc3BlY3MgaWYgaW50ZXJ2YWwgdGltZSBleGNlZWRzIDYwRlBTIGVnIGludGVydmFsVGltZSA8IDE2LjY3bXNcbiAgICBpZiAoTWF0aC5hYnMoaW50ZXJ2YWxUaW1lKSA8ICgxMDAwIC8gNjApKSB7XG4gICAgICBpbnRlcnZhbFRpbWUgPSAoMTAwMCAvIDYwKTsgLy8gbGV04oCZcyBub3QgZ2V0IGxvd2VyIHRoYXQgNjBGUFNcbiAgICAgIHN0ZXBzID0gTWF0aC5jZWlsKE1hdGguYWJzKHNwZWVkIC8gaW50ZXJ2YWxUaW1lKSk7IC8vIHdlIG5vdyBuZWVkIHRoZSBzdGVwcyBhbmQgbWFrZSBzdXJlIHdlIGNlaWwgdGhlbSBzbyAtMSB3b24ndCBtYWtlIHRoZW0gbmVnYXRpdmVcbiAgICAgIHN0ZXBTaXplID0gZGlzdGFuY2UgLyBzdGVwczsgLy8gbGFzdCB0aGluZyBpcyBzdGVwIHNpemVzIHdoaWNoIGFyZSBkZXJpdmVkIGZyb20gYWxsIG9mIHRoZSBhYm92ZVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzdGVwU2l6ZTogc3RlcFNpemUsXG4gICAgICBzdGVwczogKHN0ZXBzIC0gMSksXG4gICAgICBpbnRlcnZhbFRpbWU6IGludGVydmFsVGltZSxcbiAgICB9O1xuICB9XG5cbiAgLy8gZXhwb3J0IGZvciBub2RlIGFuZCBiYWJlbCBlbnZpcm9ubWVudHNcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgYW5pbWF0ZS5DYWxjdWxhdGVBbmltYXRpb25TcGVjcyA9IENhbGN1bGF0ZUFuaW1hdGlvblNwZWNzO1xuICB9XG5cblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFBVQkxJQyBGVU5DVElPTlNcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvKipcbiAgICogR2V0dGluZyBjb21wdXRlZCBDU1Mgc3R5bGVzIGZyb20gbm9ybWFsIGJyb3dzZXJzIGFuZCBJRVxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZWxlbWVudCAgLSBUaGUgRE9NIGVsZW1lbnQgd2Ugd2FudCB0byBnZXQgdGhlIGNvbXB1dGVkIHN0eWxlIGZyb21cbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IC0gVGhlIENTUyBwcm9wZXJ0eVxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd8aW50ZWdlcn0gLSBUaGUgQ1NTIHZhbHVlIGZvciB0aGUgcHJvcGVydHlcbiAgICovXG4gIGFuaW1hdGUuR2V0Q1NTUHJvcGVydHlCZWNhdXNlSUUgPSBmdW5jdGlvbiAoZWxlbWVudCwgcHJvcGVydHkpIHtcbiAgICBpZiAodHlwZW9mIGdldENvbXB1dGVkU3R5bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudClbcHJvcGVydHldO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc3BhY2UgPSBlbGVtZW50LmN1cnJlbnRTdHlsZVtwcm9wZXJ0eV07XG5cbiAgICAgIGlmIChzcGFjZSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgIHNwYWNlID0gQVUuYW5pbWF0ZS5DYWxjdWxhdGVBdXRvKGVsZW1lbnQsIHByb3BlcnR5KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNwYWNlO1xuICAgIH1cbiAgfTtcblxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIHNpemUgb2YgdGhlIGVsZW1lbnQgd2hlbiBpdOKAmXMgZGltZW5zaW9uKGhlaWdodCBvciB3aWR0aCkgaXMgc2V0IHRvIGF1dG9cbiAgICpcbiAgICogQHBhcmFtICB7b2JqZWN0fSBlbGVtZW50ICAgLSBUaGUgZWxlbWVudCB0byByZWFkIGF1dG8gaGVpZ2h0IGZyb21cbiAgICogQHBhcmFtICB7c3RyaW5nfSBkaW1lbnNpb24gLSBUaGUgZGltZW5zaW9uIHRvIG1lYXN1cmVcbiAgICpcbiAgICogQHJldHVybiB7aW50ZWdlcn0gICAgICAgICAgLSBUaGUgc2l6ZSBvZiB0aGUgZWxlbWVudCB3aGVuIGF0IGRpbWVuc2lvbihoZWlnaHQgb3Igd2lkdGgpIGlzIHNldCB0byAnYXV0bydcbiAgICovXG4gIGFuaW1hdGUuQ2FsY3VsYXRlQXV0byA9IGZ1bmN0aW9uIChlbGVtZW50LCBkaW1lbnNpb24pIHtcbiAgICB2YXIgaW5pdGlhbFNpemU7XG4gICAgdmFyIGVuZFNpemU7XG5cbiAgICBpZiAoZGltZW5zaW9uID09PSAnaGVpZ2h0Jykge1xuICAgICAgaW5pdGlhbFNpemUgPSBlbGVtZW50LmNsaWVudEhlaWdodDsgLy8gZ2V0IGN1cnJlbnQgaGVpZ2h0XG4gICAgICBlbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSAnYXV0byc7IC8vIHNldCBoZWlnaHQgdG8gYXV0b1xuICAgICAgZW5kU2l6ZSA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0OyAvLyBnZXQgaGVpZ2h0IGFnYWluXG4gICAgICBlbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSBpbml0aWFsU2l6ZSArICdweCc7IC8vIHNldCBiYWNrIHRvIGluaXRpYWwgaGVpZ2h0XG4gICAgfSBlbHNlIHtcbiAgICAgIGluaXRpYWxTaXplID0gZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgIGVsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9ICdhdXRvJztcbiAgICAgIGVuZFNpemUgPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gaW5pdGlhbFNpemUgKyAncHgnO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJzZUludChlbmRTaXplKTtcbiAgfTtcblxuXG4gIC8qKlxuICAgKiBTdG9wIGFueSBhdSBhbmltYXRpb24gb24gYSBET00gZWxlbWVudFxuICAgKlxuICAgKiBAcGFyYW0gIHtvYmplY3R9IGVsZW1lbnQgLSBUaGUgZWxlbWVudCB0byBzdG9wIGFuaW1hdGluZ1xuICAgKi9cbiAgYW5pbWF0ZS5TdG9wID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICBjbGVhckludGVydmFsKGVsZW1lbnQuQVVhbmltYXRpb24pO1xuICB9O1xuXG5cbiAgLyoqXG4gICAqIFRoZSBtYWdpY2FsIGFuaW1hdGlvbiBmdW5jdGlvblxuICAgKlxuICAgKiBAcGFyYW0gIHtvYmplY3R9ICAgICAgICAgb3B0aW9ucyAgICAgICAgICAtIFRoZSBvcHRpb25zIGZvciB0aGUgYW5pbWF0aW9uXG4gICAqIEBwYXJhbSAge29iamVjdH0gICAgICAgICBvcHRpb25zLmVsZW1lbnQgIC0gRWxlbWVudC9zIHdlIGFyZSBhbmltYXRpbmcgKERPTSBub2RlcylcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgIG9wdGlvbnMucHJvcGVydHkgLSBUaGUgQ1NTIHByb3BlcnR5IHRvIGFuaW1hdGVcbiAgICogQHBhcmFtICB7aW50ZWdlcnxzdHJpbmd9IG9wdGlvbnMuZW5kU2l6ZSAgLSBUaGUgc2l6ZSB0aGUgZWxlbWVudCBzaG91bGQgYW5pbWF0ZSB0by4gQ2FuIGJlICdhdXRvJyBvciBwaXhlbCB2YWx1ZVxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSAgICAgICAgb3B0aW9ucy5zcGVlZCAgICAtIFRoZSBzcGVlZCBvZiB0aGUgYW5pbWF0aW9uIGluIG1pbGxpc2Vjb25kcyBbb3B0aW9uYWxdIFtkZWZhdWx0OiAyNTBdXG4gICAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICBvcHRpb25zLmNhbGxiYWNrIC0gQSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBhZnRlciB0aGUgYW5pbWF0aW9uIGVuZHMgW29wdGlvbmFsXVxuICAgKlxuICAgKiBAcmV0dXJuIHt1bmtub3dufSAgICAgICAgICAgICAgICAgICAgICAgICAtIFRoZSByZXR1cm4gdmFsdWUgcGFzc2VkIG9uIGZyb20gb3VyIG9wdGlvbnMuY2FsbGJhY2sgZnVuY3Rpb24gW29wdGlvbmFsXVxuICAgKi9cbiAgYW5pbWF0ZS5SdW4gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIC8vIGRlZmF1bHRzXG4gICAgdmFyIGVsZW1lbnRzID0gb3B0aW9ucy5lbGVtZW50O1xuICAgIHZhciBzcGVlZCA9IG9wdGlvbnMuc3BlZWQgfHwgMjUwO1xuXG4gICAgLy8gbWFraW5nIGEgc2luZ2xlIERPTSBlbGVtZW50IGl0ZXJhdGFibGVcbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVsZW1lbnRzID0gW2VsZW1lbnRzXTtcbiAgICB9XG5cbiAgICAvLyBtYWtpbmcgYSBjYWxsYmFjayBpZiBub25lIHdhcyBwcm92aWRlZFxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5jYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3B0aW9ucy5jYWxsYmFjayA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICB9XG5cbiAgICAvLyBhZGRpbmcgaXRlcmF0aW9uIGNvdW50c1xuICAgIGVsZW1lbnRzWzBdLkFVaW50ZXJhdGlvbiA9IDA7XG4gICAgZWxlbWVudHNbMF0uQVVpbnRlcmF0aW9ucyA9IGVsZW1lbnRzLmxlbmd0aDtcblxuICAgIC8vIGl0ZXJhdGUgb3ZlciBhbGwgRE9NIG5vZGVzXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGVsZW1lbnQgPSBlbGVtZW50c1tpXTsgLy8gdGhpcyBlbGVtZW50XG4gICAgICBBVS5hbmltYXRlLlN0b3AoZWxlbWVudCk7IC8vIHN0b3AgYW55IHByZXZpb3VzIGFuaW1hdGlvbnNcbiAgICAgIHZhciBpbml0aWFsU2l6ZSA9IHBhcnNlSW50KEFVLmFuaW1hdGUuR2V0Q1NTUHJvcGVydHlCZWNhdXNlSUUoZWxlbWVudCwgb3B0aW9ucy5wcm9wZXJ0eSkpOyAvLyB0aGUgZWxlbWVudHMgY3VycmVudCBzaXplXG4gICAgICB2YXIgZW5kU2l6ZSA9IG9wdGlvbnMuZW5kU2l6ZTsgLy8gdGhlIGVsZW1lbnQgZW5kIHNpemVcblxuICAgICAgaWYgKG9wdGlvbnMuZW5kU2l6ZSA9PT0gJ2F1dG8nKSB7IC8vIGNhbGN1bGF0ZSB3aGF0ICdhdXRvJyBtZWFucyBpbiBwaXhlbFxuICAgICAgICBlbmRTaXplID0gQVUuYW5pbWF0ZS5DYWxjdWxhdGVBdXRvKGVsZW1lbnQsIG9wdGlvbnMucHJvcGVydHkpO1xuICAgICAgfVxuXG4gICAgICAvLyBjYWxjdWxhdGUgb3VyIGFuaW1hdGlvbiBzcGVjc1xuICAgICAgdmFyIGFuaW1hdGlvblNwZWNzID0gQ2FsY3VsYXRlQW5pbWF0aW9uU3BlY3MoaW5pdGlhbFNpemUsIGVuZFNpemUsIHNwZWVkKTtcbiAgICAgIHZhciBpdGVyYXRlQ291bnRlciA9IGluaXRpYWxTaXplO1xuXG4gICAgICAvLyBzZXQgc3RhdGVcbiAgICAgIGlmIChhbmltYXRpb25TcGVjcy5zdGVwU2l6ZSA8IDApIHtcbiAgICAgICAgZWxlbWVudC5BVXRvZ2dsZVN0YXRlID0gJ2Nsb3NpbmcnO1xuICAgICAgfSBlbHNlIGlmIChhbmltYXRpb25TcGVjcy5zdGVwU2l6ZSA+IDApIHtcbiAgICAgICAgZWxlbWVudC5BVXRvZ2dsZVN0YXRlID0gJ29wZW5pbmcnO1xuICAgICAgfVxuXG4gICAgICAvLyBzY29waW5nIHZhcmlhYmxlXG4gICAgICAoZnVuY3Rpb24gKGVsZW1lbnQsIGluaXRpYWxTaXplLCBpdGVyYXRlQ291bnRlciwgYW5pbWF0aW9uU3BlY3MsIGVuZFNpemUpIHtcbiAgICAgICAgLy8ga2VlcCB0cmFjayBvZiBhbmltYXRpb24gYnkgYWRkaW5nIGl0IHRvIHRoZSBET00gZWxlbWVudFxuICAgICAgICBlbGVtZW50LkFVYW5pbWF0aW9uID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgLy8gd2hlbiB3ZSBhcmUgYXQgdGhlIGVuZFxuICAgICAgICAgIGlmIChpbml0aWFsU2l6ZSA9PT0gZW5kU2l6ZSB8fCBhbmltYXRpb25TcGVjcy5zdGVwcyA9PT0gMCkge1xuICAgICAgICAgICAgQVUuYW5pbWF0ZS5TdG9wKGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlW29wdGlvbnMucHJvcGVydHldID0gZW5kU2l6ZSArICdweCc7IC8vIHNldCB0byBlbmRTaXplXG4gICAgICAgICAgICBlbGVtZW50LkFVdG9nZ2xlU3RhdGUgPSAnJztcblxuICAgICAgICAgICAgZWxlbWVudHNbMF0uQVVpbnRlcmF0aW9uKys7XG5cbiAgICAgICAgICAgIC8vIHJlbW92aW5nIGF1dG8gc28gQ1NTIGNhbiB0YWtlIG92ZXJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmVuZFNpemUgPT09ICdhdXRvJykge1xuICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW29wdGlvbnMucHJvcGVydHldID0gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHdoZW4gYWxsIGl0ZXJhdGlvbnMgaGF2ZSBmaW5pc2hlZCwgcnVuIHRoZSBjYWxsYmFja1xuICAgICAgICAgICAgaWYgKGVsZW1lbnRzWzBdLkFVaW50ZXJhdGlvbiA+PSBlbGVtZW50c1swXS5BVWludGVyYXRpb25zKSB7XG4gICAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gaWYgd2UgYXJlIHN0aWxsIGFuaW1hdGluZ1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaXRlcmF0ZUNvdW50ZXIgKz0gYW5pbWF0aW9uU3BlY3Muc3RlcFNpemU7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlW29wdGlvbnMucHJvcGVydHldID0gaXRlcmF0ZUNvdW50ZXIgKyAncHgnO1xuXG4gICAgICAgICAgICBhbmltYXRpb25TcGVjcy5zdGVwcy0tO1xuICAgICAgICAgIH1cblxuICAgICAgICB9LCBNYXRoLmFicyhhbmltYXRpb25TcGVjcy5pbnRlcnZhbFRpbWUpKTtcbiAgICAgIH0pKGVsZW1lbnQsIGluaXRpYWxTaXplLCBpdGVyYXRlQ291bnRlciwgYW5pbWF0aW9uU3BlY3MsIGVuZFNpemUpO1xuICAgIH1cbiAgfTtcblxuXG4gIC8qKlxuICAgKiBUb2dnbGUgYW5pbWF0aW9uXG4gICAqXG4gICAqIEBwYXJhbSAge29iamVjdH0gICAgICAgICBvcHRpb25zICAgICAgICAgICAgICAtIFRoZSBvcHRpb25zIGZvciB0aGUgYW5pbWF0aW9uXG4gICAqIEBwYXJhbSAge29iamVjdH0gICAgICAgICBvcHRpb25zLmVsZW1lbnQgICAgICAtIEVsZW1lbnQvcyB3ZSBhcmUgYW5pbWF0aW5nIChET00gbm9kZXMpXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICBvcHRpb25zLnByb3BlcnR5ICAgICAtIFRoZSBDU1MgcHJvcGVydHkgdG8gYW5pbWF0ZSBbb3B0aW9uYWxdIFtkZWZhdWx0OiAnaGVpZ2h0J11cbiAgICogQHBhcmFtICB7aW50ZWdlcnxzdHJpbmd9IG9wdGlvbnMuY2xvc2VTaXplICAgIC0gVGhlIHNpemUgdGhlIGVsZW1lbnQgc2hvdWxkIGNsb3NlIHRvLiBDYW4gYmUgJ2F1dG8nIG9yIHBpeGVsIHZhbHVlIFtvcHRpb25hbF0gW2RlZmF1bHQ6IDBdXG4gICAqIEBwYXJhbSAge2ludGVnZXJ8c3RyaW5nfSBvcHRpb25zLm9wZW5TaXplICAgICAtIFRoZSBzaXplIHRoZSBlbGVtZW50IHNob3VsZCBvcGVuIHRvLiBDYW4gYmUgJ2F1dG8nIG9yIHBpeGVsIHZhbHVlIFtvcHRpb25hbF0gW2RlZmF1bHQ6ICdhdXRvJ11cbiAgICogQHBhcmFtICB7aW50ZWdlcn0gICAgICAgIG9wdGlvbnMuc3BlZWQgICAgICAgIC0gVGhlIHNwZWVkIG9mIHRoZSBhbmltYXRpb24gaW4gbWlsbGlzZWNvbmRzIFtvcHRpb25hbF0gW2RlZmF1bHQ6IDI1MF1cbiAgICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgIG9wdGlvbnMucHJlZnVuY3Rpb24gIC0gQSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBiZWZvcmUgZWFjaCBhbmltYXRpb24gc3RhcnRzLCBwYXNzZXMge29iamVjdH0gZWxlbWVudCwge3N0cmluZ30gc3RhdGUgW29wdGlvbmFsXVxuICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgb3B0aW9ucy5wb3N0ZnVuY3Rpb24gLSBBIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIGFmdGVyIGVhY2ggYW5pbWF0aW9uIGVuZHMsIHBhc3NlcyB7b2JqZWN0fSBlbGVtZW50LCB7c3RyaW5nfSBzdGF0ZSBbb3B0aW9uYWxdXG4gICAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICBvcHRpb25zLmNhbGxiYWNrICAgICAtIEEgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgYWZ0ZXIgdGhlIGFuaW1hdGlvbiBlbmRzLCBwYXNzZXMge29iamVjdH0gZWxlbWVudCwge3N0cmluZ30gc3RhdGUgW29wdGlvbmFsXVxuICAgKlxuICAgKiBAcmV0dXJuIHt1bmtub3dufSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLSBUaGUgcmV0dXJuIHZhbHVlIHBhc3NlZCBvbiBmcm9tIG91ciBvcHRpb25zLmNhbGxiYWNrIGZ1bmN0aW9uIFtvcHRpb25hbF1cbiAgICovXG4gIGFuaW1hdGUuVG9nZ2xlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblxuICAgIHZhciBlbGVtZW50cyA9IG9wdGlvbnMuZWxlbWVudDtcbiAgICB2YXIgcHJvcGVydHkgPSBvcHRpb25zLnByb3BlcnR5IHx8ICdoZWlnaHQnO1xuICAgIHZhciBzcGVlZCA9IG9wdGlvbnMuc3BlZWQgfHwgMjUwO1xuICAgIHZhciBjbG9zZVNpemUgPSBvcHRpb25zLmNsb3NlU2l6ZSA9PT0gdW5kZWZpbmVkID8gMCA6IG9wdGlvbnMuY2xvc2VTaXplO1xuICAgIHZhciBvcGVuU2l6ZSA9IG9wdGlvbnMub3BlblNpemUgPT09IHVuZGVmaW5lZCA/ICdhdXRvJyA6IG9wdGlvbnMub3BlblNpemU7XG5cbiAgICAvLyBtYWtpbmcgYSBzaW5nbGUgRE9NIGVsZW1lbnQgaXRlcmF0YWJsZVxuICAgIGlmIChlbGVtZW50cy5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgZWxlbWVudHMgPSBbZWxlbWVudHNdO1xuICAgIH1cblxuICAgIC8vIG1ha2luZyBhIHByZWZ1bmN0aW9uIGlmIG5vbmUgd2FzIHByb3ZpZGVkXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLnByZWZ1bmN0aW9uICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvcHRpb25zLnByZWZ1bmN0aW9uID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIH1cblxuICAgIC8vIG1ha2luZyBhIHBvc3RmdW5jdGlvbiBpZiBub25lIHdhcyBwcm92aWRlZFxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5wb3N0ZnVuY3Rpb24gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG9wdGlvbnMucG9zdGZ1bmN0aW9uID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIH1cblxuICAgIC8vIG1ha2luZyBhIGNhbGxiYWNrIGlmIG5vbmUgd2FzIHByb3ZpZGVkXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvcHRpb25zLmNhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIH1cblxuICAgIC8vIGFkZGluZyBpdGVyYXRpb24gY291bnRzXG4gICAgZWxlbWVudHNbMF0uQVV0b2dnbGVJbnRlcmF0aW9uID0gMDtcbiAgICBlbGVtZW50c1swXS5BVXRvZ2dsZUludGVyYXRpb25zID0gZWxlbWVudHMubGVuZ3RoO1xuXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGFsbCBET00gbm9kZXNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuXG4gICAgICBBVS5hbmltYXRlLlN0b3AoZWxlbWVudCk7XG5cbiAgICAgIHZhciB0YXJnZXRTaXplOyAvLyB0aGUgc2l6ZSB0aGUgZWxlbWVudCBzaG91bGQgb3Blbi9jbG9zZSB0byBhZnRlciB0b2dnbGUgaXMgY2xpY2tlZFxuICAgICAgdmFyIHByZVN0YXRlID0gJyc7IC8vIHRoZSBzdGF0ZSB3ZSBhbmltYXRlIHRvIGZvciB0aGUgcHJlZnVuY3Rpb24gYW5kIGNhbGxiYWNrIGZ1bmN0aW9uc1xuICAgICAgdmFyIHBvc3RTdGF0ZSA9ICcnOyAvLyB0aGUgc3RhdGUgd2UgYW5pbWF0ZSB0byBmb3IgdGhlIHByZWZ1bmN0aW9uIGFuZCBjYWxsYmFjayBmdW5jdGlvbnNcbiAgICAgIHZhciBjdXJyZW50U2l6ZSA9IHBhcnNlSW50KEFVLmFuaW1hdGUuR2V0Q1NTUHJvcGVydHlCZWNhdXNlSUUoZWxlbWVudCwgb3B0aW9ucy5wcm9wZXJ0eSkpOyAvLyB0aGUgY3VycmVudCBzaXplIG9mIHRoZSBlbGVtZW50XG5cbiAgICAgIGlmIChjdXJyZW50U2l6ZSA9PT0gY2xvc2VTaXplIHx8IGVsZW1lbnQuQVV0b2dnbGVTdGF0ZSA9PT0gJ2Nsb3NpbmcnKSB7XG4gICAgICAgIHRhcmdldFNpemUgPSBvcGVuU2l6ZTtcbiAgICAgICAgcHJlU3RhdGUgPSAnb3BlbmluZyc7XG4gICAgICAgIHBvc3RTdGF0ZSA9ICdvcGVuJztcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudFNpemUgIT09IGNsb3NlU2l6ZSB8fCBlbGVtZW50LkFVdG9nZ2xlU3RhdGUgPT09ICdvcGVuaW5nJykge1xuICAgICAgICB0YXJnZXRTaXplID0gY2xvc2VTaXplO1xuICAgICAgICBwcmVTdGF0ZSA9ICdjbG9zaW5nJztcbiAgICAgICAgcG9zdFN0YXRlID0gJ2Nsb3NlZCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FVLmFuaW1hdGUuVG9nZ2xlIGNhbm5vdCBkZXRlcm1pbmUgc3RhdGUgb2YgZWxlbWVudCcpO1xuICAgICAgfVxuXG4gICAgICAvLyBydW4gcHJlZnVuY3Rpb24gb25jZSBwZXIgZWxlbWVudFxuICAgICAgb3B0aW9ucy5wcmVmdW5jdGlvbihlbGVtZW50LCBwcmVTdGF0ZSk7XG5cbiAgICAgIC8vIHNob290IG9mZiBhbmltYXRpb25cbiAgICAgIEFVLmFuaW1hdGUuUnVuKHtcbiAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgZW5kU2l6ZTogdGFyZ2V0U2l6ZSxcbiAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgICBzcGVlZDogc3BlZWQsXG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7IC8vIG1ha2luZyBzdXJlIHdlIGZpcmUgdGhlIGNhbGxiYWNrIG9ubHkgb25jZVxuICAgICAgICAgIGVsZW1lbnRzWzBdLkFVdG9nZ2xlSW50ZXJhdGlvbisrO1xuXG4gICAgICAgICAgaWYgKGVsZW1lbnRzWzBdLkFVdG9nZ2xlSW50ZXJhdGlvbiA9PT0gZWxlbWVudHNbMF0uQVVpbnRlcmF0aW9ucykge1xuICAgICAgICAgICAgdmFyIHJldHVyblBhcmFtID0gb3B0aW9ucy5jYWxsYmFjayhlbGVtZW50LCBwb3N0U3RhdGUpO1xuXG4gICAgICAgICAgICAvLyBydW4gcG9zdGZ1bmN0aW9uIG9uY2UgcGVyIGVsZW1lbnRcbiAgICAgICAgICAgIG9wdGlvbnMucG9zdGZ1bmN0aW9uKGVsZW1lbnQsIHBvc3RTdGF0ZSk7XG5cbiAgICAgICAgICAgIHJldHVybiByZXR1cm5QYXJhbTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBydW4gcG9zdGZ1bmN0aW9uIG9uY2UgcGVyIGVsZW1lbnRcbiAgICAgICAgICBvcHRpb25zLnBvc3RmdW5jdGlvbihlbGVtZW50LCBwb3N0U3RhdGUpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICB9XG4gIH07XG5cblxuICBBVS5hbmltYXRlID0gYW5pbWF0ZTtcblxufShBVSkpO1xuXG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IEFVO1xufVxuXG5cbmlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbiAgfSk7XG5cbiAgZXZhbCgnZXhwb3J0cy5kZWZhdWx0ID0gQVUnKTtcbn1cblxuXG5cbi8qISBAZ292LmF1L2FjY29yZGlvbiB2Ny4wLjcgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqXG4gKiBBY2NvcmRpb24gZnVuY3Rpb25cbiAqXG4gKiBBIGNvbXBvbmVudCB0byBhbGxvdyB1c2VycyB0byBzaG93IG9yIGhpZGUgcGFnZSBlbGVtZW50cy5cbiAqXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciBBVSA9IEFVIHx8IHt9O1xuXG4oZnVuY3Rpb24gKEFVKSB7XG5cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBOQU1FU1BBQ0UgTU9EVUxFXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgdmFyIGFjY29yZGlvbiA9IHt9XG5cblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFBSSVZBVEUgRlVOQ1RJT05TXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFBSSVZBVEVcbiAgICogU2V0IHRoZSBjb3JyZWN0IEFyaWEgcm9sZXMgZm9yIGdpdmVuIGVsZW1lbnQgb24gdGhlIGFjY29yZGlvbiB0aXRsZSBhbmQgYm9keVxuICAgKlxuICAgKiBAcGFyYW0gIHtvYmplY3R9IGVsZW1lbnQgLSBUaGUgRE9NIGVsZW1lbnQgd2Ugd2FudCB0byBzZXQgYXR0cmlidXRlcyBmb3JcbiAgICogQHBhcmFtICB7b2JqZWN0fSB0YXJnZXQgIC0gVGhlIERPTSBlbGVtZW50IHdlIHdhbnQgdG8gc2V0IGF0dHJpYnV0ZXMgZm9yXG4gICAqIEBwYXJhbSAge3N0cmluZ30gc3RhdGUgICAtIFRoZSBET00gZWxlbWVudCB3ZSB3YW50IHRvIHNldCBhdHRyaWJ1dGVzIGZvclxuICAgKi9cbiAgZnVuY3Rpb24gc2V0QXJpYVJvbGVzKGVsZW1lbnQsIHRhcmdldCwgc3RhdGUpIHtcblxuICAgIGlmIChzdGF0ZSA9PT0gJ2Nsb3NpbmcnKSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBQUklWQVRFXG4gICAqIElFOCBjb21wYXRpYmxlIGZ1bmN0aW9uIGZvciByZXBsYWNpbmcgY2xhc3NlcyBvbiBhIERPTSBub2RlXG4gICAqXG4gICAqIEBwYXJhbSAge29iamVjdH0gZWxlbWVudCAgICAgIC0gVGhlIERPTSBlbGVtZW50IHdlIHdhbnQgdG8gdG9nZ2xlIGNsYXNzZXMgb25cbiAgICogQHBhcmFtICB7b2JqZWN0fSB0YXJnZXQgICAgICAgLSBUaGUgRE9NIGVsZW1lbnQgd2Ugd2FudCB0byB0b2dnbGUgY2xhc3NlcyBvblxuICAgKiBAcGFyYW0gIHtvYmplY3R9IHN0YXRlICAgICAgICAtIFRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBhbmltYXRpb24gb24gdGhlIGVsZW1lbnRcbiAgICogQHBhcmFtICB7c3RyaW5nfSBvcGVuaW5nQ2xhc3MgLSBUaGUgZmlyc3RDbGFzcyB5b3Ugd2FudCB0byB0b2dnbGUgb24gdGhlIERPTSBub2RlXG4gICAqIEBwYXJhbSAge3N0cmluZ30gY2xvc2luZ0NsYXNzIC0gVGhlIHNlY29uZENsYXNzIHlvdSB3YW50IHRvIHRvZ2dsZSBvbiB0aGUgRE9NIG5vZGVcbiAgICovXG4gIGZ1bmN0aW9uIHRvZ2dsZUNsYXNzZXMoZWxlbWVudCwgc3RhdGUsIG9wZW5pbmdDbGFzcywgY2xvc2luZ0NsYXNzKSB7XG5cbiAgICBpZiAoc3RhdGUgPT09ICdvcGVuaW5nJyB8fCBzdGF0ZSA9PT0gJ29wZW4nKSB7XG4gICAgICB2YXIgb2xkQ2xhc3MgPSBvcGVuaW5nQ2xhc3MgfHwgJ2F1LWFjY29yZGlvbi0tY2xvc2VkJztcbiAgICAgIHZhciBuZXdDbGFzcyA9IGNsb3NpbmdDbGFzcyB8fCAnYXUtYWNjb3JkaW9uLS1vcGVuJztcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG9sZENsYXNzID0gY2xvc2luZ0NsYXNzIHx8ICdhdS1hY2NvcmRpb24tLW9wZW4nO1xuICAgICAgdmFyIG5ld0NsYXNzID0gb3BlbmluZ0NsYXNzIHx8ICdhdS1hY2NvcmRpb24tLWNsb3NlZCc7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgb2xkQ2xhc3MpO1xuICAgIGFkZENsYXNzKGVsZW1lbnQsIG5ld0NsYXNzKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBSSVZBVEVcbiAgICogSUU4IGNvbXBhdGlibGUgZnVuY3Rpb24gZm9yIHJlbW92aW5nIGEgY2xhc3NcbiAgICpcbiAgICogQHBhcmFtICB7b2JqZWN0fSBlbGVtZW50ICAgLSBUaGUgRE9NIGVsZW1lbnQgd2Ugd2FudCB0byBtYW5pcHVsYXRlXG4gICAqIEBwYXJhbSAge29iamVjdH0gY2xhc3NOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNsYXNzIHRvIGJlIHJlbW92ZWRcbiAgICovXG4gIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKFwiKF58XFxcXGIpXCIgKyBjbGFzc05hbWUuc3BsaXQoXCIgXCIpLmpvaW4oXCJ8XCIpICsgXCIoXFxcXGJ8JClcIiwgXCJnaVwiKSwgXCIgXCIpO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBSSVZBVEVcbiAgICogSUU4IGNvbXBhdGlibGUgZnVuY3Rpb24gZm9yIGFkZGluZyBhIGNsYXNzXG4gICAqXG4gICAqIEBwYXJhbSAge29iamVjdH0gZWxlbWVudCAgIC0gVGhlIERPTSBlbGVtZW50IHdlIHdhbnQgdG8gbWFuaXB1bGF0ZVxuICAgKiBAcGFyYW0gIHtvYmplY3R9IGNsYXNzTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjbGFzcyB0byBiZSBhZGRlZFxuICAgKi9cbiAgZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZSArIFwiIFwiICsgY2xhc3NOYW1lO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBQVUJMSUMgRlVOQ1RJT05TXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLyoqXG4gICAqIFRvZ2dsZSBhbiBhY2NvcmRpb24gZWxlbWVudFxuICAgKlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBlbGVtZW50cyAgLSBUaGUgRE9NIG5vZGUvcyB0byB0b2dnbGVcbiAgICogQHBhcmFtICB7aW50ZWdlcn0gc3BlZWQgICAgIC0gVGhlIHNwZWVkIGluIG1zIGZvciB0aGUgYW5pbWF0aW9uXG4gICAqIEBwYXJhbSAge29iamVjdH0gIGNhbGxiYWNrcyAtIEFuIG9iamVjdCBvZiBmb3VyIG9wdGlvbmFsIGNhbGxiYWNrczogeyBvbk9wZW4sIGFmdGVyT3Blbiwgb25DbG9zZSwgYWZ0ZXJDbG9zZSB9XG4gICAqXG4gICAqL1xuICBhY2NvcmRpb24uVG9nZ2xlID0gZnVuY3Rpb24gKGVsZW1lbnRzLCBzcGVlZCwgY2FsbGJhY2tzKSB7XG5cbiAgICAvLyBzdG9wIGV2ZW50IHByb3BhZ2F0aW9uXG4gICAgdHJ5IHtcbiAgICAgIHdpbmRvdy5ldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHsgfVxuXG4gICAgLy8gbWFraW5nIHN1cmUgd2UgY2FuIGl0ZXJhdGUgb3ZlciBqdXN0IG9uZSBET00gZWxlbWVudFxuICAgIGlmIChlbGVtZW50cy5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgZWxlbWVudHMgPSBbZWxlbWVudHNdO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIHRoaXMgb25jZVxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2tzICE9ICdvYmplY3QnKSB7XG4gICAgICBjYWxsYmFja3MgPSB7fTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIHZhciBlbGVtZW50ID0gZWxlbWVudHNbaV07XG4gICAgICB2YXIgdGFyZ2V0SWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldElkKTtcblxuICAgICAgaWYgKHRhcmdldCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnQVUuYWNjb3JkaW9uLlRvZ2dsZSBjYW5ub3QgZmluZCB0aGUgdGFyZ2V0IHRvIGJlIHRvZ2dsZWQgZnJvbSBpbnNpZGUgYXJpYS1jb250cm9scy5cXG4nICtcbiAgICAgICAgICAnTWFrZSBzdXJlIHRoZSBmaXJzdCBhcmd1bWVudCB5b3UgZ2l2ZSBBVS5hY2NvcmRpb24uVG9nZ2xlIGlzIHRoZSBET00gZWxlbWVudCAoYSBidXR0b24gb3IgYSBsaW5rKSB0aGF0IGhhcyBhbiBhcmlhLWNvbnRyb2xzIGF0dHJpYnV0ZSB0aGF0IHBvaW50cyAnICtcbiAgICAgICAgICAndG8gYSBkaXYgdGhhdCB5b3Ugd2FudCB0byB0b2dnbGUuJ1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0YXJnZXQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgIChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBBVS5hbmltYXRlLlRvZ2dsZSh7XG4gICAgICAgICAgZWxlbWVudDogdGFyZ2V0LFxuICAgICAgICAgIHByb3BlcnR5OiAnaGVpZ2h0JyxcbiAgICAgICAgICBzcGVlZDogc3BlZWQgfHwgMjUwLFxuICAgICAgICAgIHByZWZ1bmN0aW9uOiBmdW5jdGlvbiAodGFyZ2V0LCBzdGF0ZSkge1xuICAgICAgICAgICAgaWYgKHN0YXRlID09PSAnb3BlbmluZycpIHtcbiAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgICAgICAgIC8vIHJ1biB3aGVuIG9wZW5pbmdcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFja3Mub25PcGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uT3BlbigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBydW4gd2hlbiBjbG9zaW5nXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2tzLm9uQ2xvc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25DbG9zZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldEFyaWFSb2xlcyhlbGVtZW50LCB0YXJnZXQsIHN0YXRlKTtcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzZXMoZWxlbWVudCwgc3RhdGUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcG9zdGZ1bmN0aW9uOiBmdW5jdGlvbiAodGFyZ2V0LCBzdGF0ZSkge1xuICAgICAgICAgICAgaWYgKHN0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICAgICAgICAvLyBydW4gYWZ0ZXIgY2xvc2luZ1xuICAgICAgICAgICAgICB0YXJnZXQuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gJyc7XG5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFja3MuYWZ0ZXJDbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5hZnRlckNsb3NlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIHJ1biBhZnRlciBvcGVuaW5nXG4gICAgICAgICAgICAgIHRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAnJztcblxuICAgICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrcy5hZnRlck9wZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3MuYWZ0ZXJPcGVuKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG9nZ2xlQ2xhc3Nlcyh0YXJnZXQsIHN0YXRlKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0pKGVsZW1lbnQpO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIH1cblxuXG4gIC8qKlxuICAgKiBPcGVuIGEgZ3JvdXAgb2YgYWNjb3JkaW9uIGVsZW1lbnRzXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gIGVsZW1lbnRzIC0gVGhlIERPTSBub2RlL3MgdG8gdG9nZ2xlXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IHNwZWVkICAgIC0gVGhlIHNwZWVkIGluIG1zIGZvciB0aGUgYW5pbWF0aW9uXG4gICAqXG4gICAqL1xuICBhY2NvcmRpb24uT3BlbiA9IGZ1bmN0aW9uIChlbGVtZW50cywgc3BlZWQpIHtcblxuICAgIC8vIHN0b3AgZXZlbnQgcHJvcGFnYXRpb25cbiAgICB0cnkge1xuICAgICAgd2luZG93LmV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9IGNhdGNoIChlcnJvcikgeyB9XG5cbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVsZW1lbnRzID0gW2VsZW1lbnRzXTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIHZhciBlbGVtZW50ID0gZWxlbWVudHNbaV07XG4gICAgICB2YXIgdGFyZ2V0SWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldElkKTtcblxuICAgICAgLy8gbGV04oCZcyBmaW5kIG91dCBpZiB0aGlzIGFjY29yZGlvbiBpcyBzdGlsbCBjbG9zZWRcbiAgICAgIHZhciBoZWlnaHQgPSAwO1xuICAgICAgaWYgKHR5cGVvZiBnZXRDb21wdXRlZFN0eWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBoZWlnaHQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpLmhlaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhlaWdodCA9IHRhcmdldC5jdXJyZW50U3R5bGUuaGVpZ2h0O1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyc2VJbnQoaGVpZ2h0KSA9PT0gMCkge1xuICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gJzBweCc7XG4gICAgICB9XG5cbiAgICAgIHRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICB0b2dnbGVDbGFzc2VzKHRhcmdldCwgJ29wZW5pbmcnKTtcbiAgICAgIHRvZ2dsZUNsYXNzZXMoZWxlbWVudCwgJ29wZW5pbmcnKTtcbiAgICAgIHNldEFyaWFSb2xlcyhlbGVtZW50LCB0YXJnZXQsICdvcGVuaW5nJyk7XG5cbiAgICAgIChmdW5jdGlvbiAodGFyZ2V0LCBzcGVlZCwgZWxlbWVudCkge1xuICAgICAgICBBVS5hbmltYXRlLlJ1bih7XG4gICAgICAgICAgZWxlbWVudDogdGFyZ2V0LFxuICAgICAgICAgIHByb3BlcnR5OiAnaGVpZ2h0JyxcbiAgICAgICAgICBlbmRTaXplOiAnYXV0bycsXG4gICAgICAgICAgc3BlZWQ6IHNwZWVkIHx8IDI1MCxcbiAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdG9nZ2xlQ2xhc3NlcyhlbGVtZW50LCAnb3BlbmluZycpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSkodGFyZ2V0LCBzcGVlZCwgZWxlbWVudCk7XG4gICAgfVxuXG4gIH1cblxuXG4gIC8qKlxuICAgKiBDbG9zZSBhIGdyb3VwIG9mIGFjY29yZGlvbiBlbGVtZW50c1xuICAgKlxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBlbGVtZW50cyAtIFRoZSBET00gbm9kZS9zIHRvIHRvZ2dsZVxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBzcGVlZCAgICAtIFRoZSBzcGVlZCBpbiBtcyBmb3IgdGhlIGFuaW1hdGlvblxuICAgKlxuICAgKi9cbiAgYWNjb3JkaW9uLkNsb3NlID0gZnVuY3Rpb24gKGVsZW1lbnRzLCBzcGVlZCkge1xuXG4gICAgLy8gc3RvcCBldmVudCBwcm9wYWdhdGlvblxuICAgIHRyeSB7XG4gICAgICB3aW5kb3cuZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7IH1cblxuICAgIGlmIChlbGVtZW50cy5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgZWxlbWVudHMgPSBbZWxlbWVudHNdO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgdmFyIGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcbiAgICAgIHZhciB0YXJnZXRJZCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpO1xuXG4gICAgICB0b2dnbGVDbGFzc2VzKGVsZW1lbnQsICdjbG9zaW5nJyk7XG4gICAgICBzZXRBcmlhUm9sZXMoZWxlbWVudCwgdGFyZ2V0LCAnY2xvc2luZycpO1xuXG4gICAgICAoZnVuY3Rpb24gKHRhcmdldCwgc3BlZWQpIHtcbiAgICAgICAgQVUuYW5pbWF0ZS5SdW4oe1xuICAgICAgICAgIGVsZW1lbnQ6IHRhcmdldCxcbiAgICAgICAgICBwcm9wZXJ0eTogJ2hlaWdodCcsXG4gICAgICAgICAgZW5kU2l6ZTogMCxcbiAgICAgICAgICBzcGVlZDogc3BlZWQgfHwgMjUwLFxuICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgdG9nZ2xlQ2xhc3Nlcyh0YXJnZXQsICdjbG9zZScpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSkodGFyZ2V0LCBzcGVlZCk7XG4gICAgfVxuXG4gIH1cblxuXG4gIEFVLmFjY29yZGlvbiA9IGFjY29yZGlvbjtcblxufShBVSkpO1xuXG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IEFVO1xufVxuXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG4gICQoXCIuYWNjb3JkaW9uXCIpLm9uKFwiY2xpY2tcIiwgXCIuYWNjb3JkaW9uLWJ1dHRvblwiLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcInJvdGF0ZS05MFwiKSkge1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcInJvdGF0ZS05MFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcInJvdGF0ZS05MFwiKTtcbiAgICB9XG5cbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCIuYWNjb3JkaW9uLWNvbnRlbnRcIikudG9nZ2xlKCk7XG4gIH0pO1xuXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCJhXCIsIGZ1bmN0aW9uKGUpIHtcblxuICAgIGlmICghKHR5cGVvZiAkKHRoaXMpLmF0dHIoXCJkaXNhYmxlZFwiKSAhPT0gdW5kZWZpbmVkICYmICQodGhpcykuYXR0cihcImRpc2FibGVkXCIpICE9PSBcImRpc2FibGVkXCIgJiYgJCh0aGlzKS5hdHRyKFwiZGlzYWJsZWRcIikgIT09IFwiXCIpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgfSlcbn0pIl0sImZpbGUiOiJtYWluLmpzIn0=
