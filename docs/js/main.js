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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiZ2V0VXJsUGFyYW1ldGVyIiwic1BhcmFtIiwic1BhZ2VVUkwiLCJkZWNvZGVVUklDb21wb25lbnQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0cmluZyIsInNVUkxWYXJpYWJsZXMiLCJzcGxpdCIsInNQYXJhbWV0ZXJOYW1lIiwiaSIsImxlbmd0aCIsInVuZGVmaW5lZCIsInRvZGF5IiwibW9tZW50IiwiZm9ybWF0IiwiJCIsImh0bWwiLCJqUXVlcnkiLCJkb2N1bWVudCIsInJlYWR5IiwicGFuZWxzIiwibWFwIiwiaW5kZXgiLCJwYW5lbCIsInBhbmVsQ29udGFpbmVyIiwiZmluZCIsInBhbmVsSGVhZGVyIiwib3JpZ2luWCIsImxhc3RYIiwiZHJhZ2dpbmciLCJ1aUJ1bmNoIiwiYWRkIiwib24iLCJldmVudCIsInRhcmdldCIsImlzIiwic2NyZWVuWCIsInRhcmdldFRvdWNoZXMiLCJuZXdYIiwiY3NzIiwicmlnaHQiLCJvZmZzZXRXaWR0aCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJzZXRUaW1lb3V0IiwidHJhbnNpdGlvbiIsInJhbmRvbVdUb2FzdFR5cGVzIiwicmFuZG9tV29yZHMiLCJnZXRSYW5kb21BcmJpdHJhcnkiLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kSW50IiwiYW5pbWFsIiwidG9hc3RUeXBlIiwiYm9keSIsInNldEF0dHJpYnV0ZSIsImZvY3VzIiwicmVtb3ZlQXR0cmlidXRlIiwibm93IiwiRGF0ZSIsInRvTG9jYWxlU3RyaW5nIiwiYXBwZW5kIiwic2hvdyIsImhpZGUiLCJFbGVtZW50IiwicHJvdG90eXBlIiwibWF0Y2hlcyIsIm1zTWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwiY2xvc2VzdCIsInMiLCJlbCIsImRvY3VtZW50RWxlbWVudCIsImNvbnRhaW5zIiwicGFyZW50RWxlbWVudCIsInBhcmVudE5vZGUiLCJub2RlVHlwZSIsImdldE9mZnNldERvY3VtZW50VG9wIiwicEVsZW1lbnQiLCJzY3JvbGxUb3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJyZWdpc3RlclRvb2x0aXAiLCJST09UX0VMRU1FTlRfQ0xBU1MiLCJUQUJfQ0xBU1MiLCJBUklBX0hJRERFTl9BVFRSIiwiQVJJQV9FWFBBTkRFRF9BVFRSIiwiY29udHJvbCIsInJvb3RFbGVtZW50IiwiY29udGVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ0YWIiLCJtZXNzYWdlIiwiY2xvc2UiLCJ0YWJPcmlnaW5hbENsYXNzTmFtZSIsImNsYXNzTmFtZSIsInNob3dUb29sdGlwIiwiY2xvYWsiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJjc3NUZXh0IiwiaW5zZXJ0QmVmb3JlIiwiYXBwZW5kQ2hpbGQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY2xpY2tPdXRIYW5kbGVyIiwicmVtb3ZlQ2hpbGQiLCJjbGllbnRIZWlnaHQiLCJjb25zb2xlIiwibG9nIiwib2Zmc2V0VG9wIiwib2Zmc2V0SGVpZ2h0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImVzY2FwZUhhbmRsZXIiLCJoaWRlVG9vbHRpcCIsImNsb3NlVG9vbHRpcCIsInBFdmVudCIsImtleSIsInByZXZlbnREZWZhdWx0IiwiZm9yRWFjaCIsImNhbGwiLCJjbGljayIsImV2Iiwic2libGluZ3MiLCJ0aGlzQm94IiwibmV4dCIsIm5vdCIsIm1vdXNlb3ZlciIsImNoZWNrZWRCb3giLCJtb3VzZWxlYXZlIiwiY2xhaW1UeXBlIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIm9wZW4iLCJpbml0aWFsQnV0dG9uVGV4dCIsInRvZ2dsZUNsYXNzIiwic3RvcFByb3BhZ2F0aW9uIiwiaW5wdXRzIiwicXVlcnlTZWxlY3RvckFsbCIsIkFycmF5IiwiaW5wdXQiLCJsYWJlbCIsIm5leHRFbGVtZW50U2libGluZyIsImxhYmVsVmFsIiwiaW5uZXJIVE1MIiwiY2F0ZWdvcnlUciIsImNhdGVnb3J5IiwicXVlcnlTZWxlY3RvciIsImNhdGVnb3J5TmFtZSIsImUiLCJ2YWx1ZSIsImZpbGVOYW1lIiwicG9wIiwib3V0ZXJIVE1MIiwiY2xhc3NMaXN0Iiwic3RhdHVzIiwiY2F0ZWdvcnlUckNsYXNzIiwicmVtb3ZlIiwiQVUiLCJhbmltYXRlIiwiQ2FsY3VsYXRlQW5pbWF0aW9uU3BlY3MiLCJpbml0aWFsU2l6ZSIsImVuZFNpemUiLCJzcGVlZCIsInN0ZXBTaXplIiwic3RlcHMiLCJpbnRlcnZhbFRpbWUiLCJkaXN0YW5jZSIsImFicyIsImNlaWwiLCJtb2R1bGUiLCJHZXRDU1NQcm9wZXJ0eUJlY2F1c2VJRSIsImVsZW1lbnQiLCJwcm9wZXJ0eSIsImdldENvbXB1dGVkU3R5bGUiLCJzcGFjZSIsImN1cnJlbnRTdHlsZSIsIkNhbGN1bGF0ZUF1dG8iLCJkaW1lbnNpb24iLCJjbGllbnRXaWR0aCIsInBhcnNlSW50IiwiU3RvcCIsImNsZWFySW50ZXJ2YWwiLCJBVWFuaW1hdGlvbiIsIlJ1biIsIm9wdGlvbnMiLCJlbGVtZW50cyIsImNhbGxiYWNrIiwiQVVpbnRlcmF0aW9uIiwiQVVpbnRlcmF0aW9ucyIsImFuaW1hdGlvblNwZWNzIiwiaXRlcmF0ZUNvdW50ZXIiLCJBVXRvZ2dsZVN0YXRlIiwic2V0SW50ZXJ2YWwiLCJUb2dnbGUiLCJjbG9zZVNpemUiLCJvcGVuU2l6ZSIsInByZWZ1bmN0aW9uIiwicG9zdGZ1bmN0aW9uIiwiQVV0b2dnbGVJbnRlcmF0aW9uIiwiQVV0b2dnbGVJbnRlcmF0aW9ucyIsInRhcmdldFNpemUiLCJwcmVTdGF0ZSIsInBvc3RTdGF0ZSIsImN1cnJlbnRTaXplIiwiRXJyb3IiLCJyZXR1cm5QYXJhbSIsImV4cG9ydHMiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV2YWwiLCJhY2NvcmRpb24iLCJzZXRBcmlhUm9sZXMiLCJzdGF0ZSIsInRvZ2dsZUNsYXNzZXMiLCJvcGVuaW5nQ2xhc3MiLCJjbG9zaW5nQ2xhc3MiLCJvbGRDbGFzcyIsIm5ld0NsYXNzIiwicmVwbGFjZSIsIlJlZ0V4cCIsImpvaW4iLCJjYWxsYmFja3MiLCJjYW5jZWxCdWJibGUiLCJlcnJvciIsInRhcmdldElkIiwiZ2V0QXR0cmlidXRlIiwiZ2V0RWxlbWVudEJ5SWQiLCJkaXNwbGF5Iiwib25PcGVuIiwib25DbG9zZSIsImhlaWdodCIsImFmdGVyQ2xvc2UiLCJhZnRlck9wZW4iLCJPcGVuIiwiQ2xvc2UiLCJoYXNDbGFzcyIsInBhcmVudCIsInRvZ2dsZSIsImF0dHIiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFJQSxlQUFlLEdBQUcsU0FBU0EsZUFBVCxDQUF5QkMsTUFBekIsRUFBaUM7QUFDckQsTUFBSUMsUUFBUSxHQUFHQyxrQkFBa0IsQ0FBQ0MsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxNQUFoQixDQUF1QkMsU0FBdkIsQ0FBaUMsQ0FBakMsQ0FBRCxDQUFqQztBQUFBLE1BQ0VDLGFBQWEsR0FBR04sUUFBUSxDQUFDTyxLQUFULENBQWUsR0FBZixDQURsQjtBQUFBLE1BRUVDLGNBRkY7QUFBQSxNQUdFQyxDQUhGOztBQUtBLE9BQUtBLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsR0FBR0gsYUFBYSxDQUFDSSxNQUE5QixFQUFzQ0QsQ0FBQyxFQUF2QyxFQUEyQztBQUN6Q0QsSUFBQUEsY0FBYyxHQUFHRixhQUFhLENBQUNHLENBQUQsQ0FBYixDQUFpQkYsS0FBakIsQ0FBdUIsR0FBdkIsQ0FBakI7O0FBRUEsUUFBSUMsY0FBYyxDQUFDLENBQUQsQ0FBZCxLQUFzQlQsTUFBMUIsRUFBa0M7QUFDaEMsYUFBT1MsY0FBYyxDQUFDLENBQUQsQ0FBZCxLQUFzQkcsU0FBdEIsR0FBa0MsSUFBbEMsR0FBeUNILGNBQWMsQ0FBQyxDQUFELENBQTlEO0FBQ0Q7QUFDRjtBQUNGLENBYkQsQyxDQWVBOzs7QUFDQSxJQUFJSSxLQUFLLEdBQUdDLE1BQU0sR0FBR0MsTUFBVCxDQUFnQixhQUFoQixDQUFaO0FBQ0FDLENBQUMsQ0FBQyxnQkFBRCxDQUFELENBQW9CQyxJQUFwQixDQUF5Qkos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QUMsQ0FBQyxJQUFELENBQUQsQ0FBUWlPLElBQVIsQ0FBYSxVQUFiLE1BQTZCLEVBQTNILENBQUosRUFBb0k7QUFDbEkxRixNQUFBQSxDQUFDLENBQUMvQixjQUFGO0FBQ0EsYUFBTyxLQUFQO0FBQ0Q7QUFFRixHQVBEO0FBUUQsQ0FuQkQiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZ2V0VXJsUGFyYW1ldGVyID0gZnVuY3Rpb24gZ2V0VXJsUGFyYW1ldGVyKHNQYXJhbSkge1xyXG4gIHZhciBzUGFnZVVSTCA9IGRlY29kZVVSSUNvbXBvbmVudCh3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKSksXHJcbiAgICBzVVJMVmFyaWFibGVzID0gc1BhZ2VVUkwuc3BsaXQoJyYnKSxcclxuICAgIHNQYXJhbWV0ZXJOYW1lLFxyXG4gICAgaTtcclxuXHJcbiAgZm9yIChpID0gMDsgaSA8IHNVUkxWYXJpYWJsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgIHNQYXJhbWV0ZXJOYW1lID0gc1VSTFZhcmlhYmxlc1tpXS5zcGxpdCgnPScpO1xyXG5cclxuICAgIGlmIChzUGFyYW1ldGVyTmFtZVswXSA9PT0gc1BhcmFtKSB7XHJcbiAgICAgIHJldHVybiBzUGFyYW1ldGVyTmFtZVsxXSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHNQYXJhbWV0ZXJOYW1lWzFdO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8vIHRvZGF5J3MgZGF0ZSBhdmFpbGFibGUgZXZlcnl3aGVyZSBcclxudmFyIHRvZGF5ID0gbW9tZW50KCkuZm9ybWF0KCdEIE1NTU0gWVlZWScpO1xyXG4kKFwiLnB0LWRhdGUtdG9kYXlcIikuaHRtbCh0b2RheSk7XHJcblxyXG5cclxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoJCkge1xyXG4gIC8vIEhlbHAgc2xpZGUgZ2VzdHVyZVxyXG4gIGxldCBwYW5lbHMgPSAkKCcucGFuZWwnKTtcclxuICBwYW5lbHMubWFwKChpbmRleCwgcGFuZWwpID0+IHtcclxuICAgIGxldCBwYW5lbENvbnRhaW5lciA9ICQocGFuZWwpLmZpbmQoJy5wYW5lbC1jb250YWluZXInKTtcclxuICAgIGxldCBwYW5lbEhlYWRlciA9ICQocGFuZWwpLmZpbmQoJy5wYW5lbC1oZWFkZXInKTtcclxuICAgIGxldCBvcmlnaW5YID0gMDtcclxuICAgIGxldCBsYXN0WCA9IDA7XHJcbiAgICBsZXQgZHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgIGxldCB1aUJ1bmNoID0gcGFuZWxDb250YWluZXIuYWRkKHBhbmVsSGVhZGVyKTtcclxuICAgIHVpQnVuY2gub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmICghZHJhZ2dpbmcgJiYgISQoZXZlbnQudGFyZ2V0KS5pcygnLnBhbmVsLWNsb3NlJykpIHtcclxuICAgICAgICBkcmFnZ2luZyA9IHRydWU7XHJcbiAgICAgICAgb3JpZ2luWCA9IGV2ZW50LnNjcmVlblggfHwgZXZlbnQudGFyZ2V0VG91Y2hlc1swXS5zY3JlZW5YO1xyXG4gICAgICAgIGxhc3RYID0gb3JpZ2luWDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB1aUJ1bmNoLm9uKCdtb3VzZW1vdmUgdG91Y2htb3ZlJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChkcmFnZ2luZykge1xyXG4gICAgICAgIGxhc3RYID0gKGV2ZW50LnNjcmVlblggfHwgZXZlbnQudGFyZ2V0VG91Y2hlc1swXS5zY3JlZW5YKTtcclxuICAgICAgICBsZXQgbmV3WCA9IGxhc3RYIC0gb3JpZ2luWDtcclxuICAgICAgICBpZiAobmV3WCA+PSAwKVxyXG4gICAgICAgICAgdWlCdW5jaC5jc3Moe1xyXG4gICAgICAgICAgICByaWdodDogLW5ld1ggKyAncHgnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB1aUJ1bmNoLm9uKCdtb3VzZXVwIHRvdWNoZW5kJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChkcmFnZ2luZyAmJiAhJChldmVudC50YXJnZXQpLmlzKCcucGFuZWwtY2xvc2UnKSkge1xyXG4gICAgICAgIGRyYWdnaW5nID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IG5ld1ggPSAoZXZlbnQuc2NyZWVuWCB8fCBsYXN0WCkgLSBvcmlnaW5YO1xyXG4gICAgICAgIGlmIChuZXdYID4gKHBhbmVsQ29udGFpbmVyWzBdLm9mZnNldFdpZHRoICogMC4yNSkpIHtcclxuICAgICAgICAgICQocGFuZWwpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJykuYWRkQ2xhc3MoJ3N3aXBlLWNsb3NpbmcnKTtcclxuICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgJChwYW5lbCkucmVtb3ZlQ2xhc3MoJ3N3aXBlLWNsb3NpbmcnKTtcclxuICAgICAgICAgICAgdWlCdW5jaC5jc3Moe1xyXG4gICAgICAgICAgICAgIHJpZ2h0OiAnJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0sIDQwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHVpQnVuY2guY3NzKHtcclxuICAgICAgICAgICAgcmlnaHQ6ICcwcHgnLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAncmlnaHQgMC4zcydcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB1aUJ1bmNoLmNzcyh7XHJcbiAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJydcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG5cclxuICAvLyBUb2FzdCBtb2NrdXBcclxuICAkKFwiLmNhbGwtdG9hc3RcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgcmFuZG9tV1RvYXN0VHlwZXMgPSBbXCJzdWNjZXNzXCIsIFwiaW5mb3JtYXRpb25cIiwgXCJhbGVydFwiLCBcImVycm9yXCJdO1xyXG4gICAgdmFyIHJhbmRvbVdvcmRzID0gW1wiaW5rIEZhaXJ5IEFybWFkaWxsb1wiLCBcIk9rYXBpXCIsIFwiR2xhdWN1cyBBdGxhbnRpY3VzXCIsIFwiVGhlIE1hbmVkIFdvbGZcIiwgXCJGb3NzYVwiLCBcIklndWFuYVwiXTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRSYW5kb21BcmJpdHJhcnkobWF4KSB7XHJcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKG1heCkpO1xyXG4gICAgfVxyXG4gICAgdmFyIHJhbmRJbnQgPSBnZXRSYW5kb21BcmJpdHJhcnkoNCk7XHJcbiAgICB2YXIgYW5pbWFsID0gcmFuZG9tV29yZHNbcmFuZEludF07XHJcbiAgICB2YXIgdG9hc3RUeXBlID0gcmFuZG9tV1RvYXN0VHlwZXNbcmFuZEludF07XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcclxuICAgIGRvY3VtZW50LmJvZHkuZm9jdXMoKTtcclxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xyXG5cclxuICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCk7XHJcblxyXG4gICAgalF1ZXJ5KCcudG9hc3QtY29udGFpbmVyJykuYXBwZW5kKCc8YnV0dG9uIGNsYXNzPVwidWlraXQtYnRuIHRvYXN0XCIgcm9sZT1cImFsZXJ0XCIgdHlwZT1cImJ1dHRvblwiPjxkaXYgY2xhc3M9XCJ0b2FzdF9fdHlwZSB0b2FzdF9fdHlwZS0tJyArIHRvYXN0VHlwZSArICdcIj48c3BhbiBjbGFzcz1cInNyXCI+JyArIHRvYXN0VHlwZSArICc8L3NwYW4+PC9kaXY+PGRpdiBjbGFzcz1cInRvYXN0X19tZXNzYWdlXCI+PHA+WW91IGFkZGVkIGEgJyArIGFuaW1hbCArICcgYXQgJyArIG5vdyArICc8L3A+PC9kaXY+PC9idXR0b24+Jyk7XHJcblxyXG4gICAgalF1ZXJ5KFwiLnRvYXN0LWNvbnRhaW5lclwiKS5zaG93KCk7XHJcbiAgfSk7XHJcblxyXG4gIGpRdWVyeShcIi50b2FzdC1jb250YWluZXJcIikub24oXCJjbGlja1wiLCBcImJ1dHRvblwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGpRdWVyeSh0aGlzKS5oaWRlKCk7XHJcbiAgfSk7XHJcblxyXG5cclxuXHJcbiAgLy8gbWF0Y2hlcyBwb2xseWZpbGxcclxuICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcclxuICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPSBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3JcclxuICB9XHJcblxyXG4gIC8vY2xvc2VzdCBwb2xseWZpbGxcclxuICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QpIHtcclxuICAgIEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QgPSBmdW5jdGlvbiAocykge1xyXG4gICAgICB2YXIgZWwgPSB0aGlzXHJcbiAgICAgIGlmICghZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNvbnRhaW5zKGVsKSkgcmV0dXJuIG51bGxcclxuICAgICAgZG8ge1xyXG4gICAgICAgIGlmIChlbC5tYXRjaGVzKHMpKSByZXR1cm4gZWxcclxuICAgICAgICBlbCA9IGVsLnBhcmVudEVsZW1lbnQgfHwgZWwucGFyZW50Tm9kZVxyXG4gICAgICB9IHdoaWxlIChlbCAhPT0gbnVsbCAmJiBlbC5ub2RlVHlwZSA9PT0gMSlcclxuICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvLyBUb29sdGlwXHJcbiAgZnVuY3Rpb24gZ2V0T2Zmc2V0RG9jdW1lbnRUb3AocEVsZW1lbnQpIHtcclxuICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wICsgcEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZWdpc3RlclRvb2x0aXAocEVsZW1lbnQpIHtcclxuXHJcbiAgICBjb25zdCBST09UX0VMRU1FTlRfQ0xBU1MgPSAndG9vbHRpcCdcclxuICAgIGNvbnN0IFRBQl9DTEFTUyA9IGAke1JPT1RfRUxFTUVOVF9DTEFTU31fX3RhYmBcclxuXHJcbiAgICBjb25zdCBBUklBX0hJRERFTl9BVFRSID0gJ2FyaWEtaGlkZGVuJ1xyXG4gICAgY29uc3QgQVJJQV9FWFBBTkRFRF9BVFRSID0gJ2FyaWEtZXhwYW5kZWQnXHJcblxyXG4gICAgY29uc3QgY29udHJvbCA9IHBFbGVtZW50XHJcbiAgICBjb25zdCByb290RWxlbWVudCA9IGNvbnRyb2wuY2xvc2VzdChgLiR7Uk9PVF9FTEVNRU5UX0NMQVNTfWApXHJcbiAgICBjb25zdCBjb250ZW50ID0gcm9vdEVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHtST09UX0VMRU1FTlRfQ0xBU1N9X19jb250ZW50YClbMF1cclxuICAgIGNvbnN0IHRhYiA9IHJvb3RFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoVEFCX0NMQVNTKVswXVxyXG4gICAgY29uc3QgbWVzc2FnZSA9IHJvb3RFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7Uk9PVF9FTEVNRU5UX0NMQVNTfV9fbWVzc2FnZWApWzBdXHJcbiAgICBjb25zdCBjbG9zZSA9IHJvb3RFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7Uk9PVF9FTEVNRU5UX0NMQVNTfV9fY2xvc2VgKVswXVxyXG5cclxuICAgIGNvbnN0IHRhYk9yaWdpbmFsQ2xhc3NOYW1lID0gdGFiLmNsYXNzTmFtZVxyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dUb29sdGlwKCkge1xyXG4gICAgICBjb25zdCBjbG9hayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgIGNsb2FrLnN0eWxlLmNzc1RleHQgPSAnaGVpZ2h0OiAwOyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7J1xyXG4gICAgICBjb250ZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNsb2FrLCBjb250ZW50KVxyXG4gICAgICBjbG9hay5hcHBlbmRDaGlsZChjb250ZW50KVxyXG5cclxuICAgICAgY29udGVudC5zZXRBdHRyaWJ1dGUoQVJJQV9ISURERU5fQVRUUiwgZmFsc2UpXHJcblxyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrT3V0SGFuZGxlcilcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNsb2FrLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoY29udGVudClcclxuICAgICAgICBjbG9hay5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNsb2FrKVxyXG5cclxuICAgICAgICBjb250cm9sLnNldEF0dHJpYnV0ZShBUklBX0VYUEFOREVEX0FUVFIsIHRydWUpXHJcblxyXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGAke3RhYk9yaWdpbmFsQ2xhc3NOYW1lfSAke1RBQl9DTEFTU30tLWFjdGl2ZWBcclxuXHJcbiAgICAgICAgaWYgKGNvbnRlbnQuY2xpZW50SGVpZ2h0ID4gKGNvbnRlbnQuc2Nyb2xsVG9wICsgY29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnYWRkaW5nIHRvb2x0aXBfX3RhYi0tYm90dG9tJyk7XHJcbiAgICAgICAgICB0YWIuY2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lfSAke1RBQl9DTEFTU30tLWJvdHRvbWBcclxuICAgICAgICAgIGNvbnRlbnQuc3R5bGUudG9wID0gYCR7Y29udHJvbC5vZmZzZXRUb3AgKyB0YWIuY2xpZW50SGVpZ2h0ICsgdGFiLm9mZnNldFRvcCArIHRhYi5vZmZzZXRIZWlnaHR9cHhgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdhZGRpbmcgdG9vbHRpcF9fdGFiLS10b3AnKTtcclxuICAgICAgICAgIHRhYi5jbGFzc05hbWUgPSBgJHtjbGFzc05hbWV9ICR7VEFCX0NMQVNTfS0tdG9wYFxyXG4gICAgICAgICAgY29udGVudC5zdHlsZS50b3AgPSBgJHtjb250cm9sLm9mZnNldFRvcCAtIGNvbnRlbnQuY2xpZW50SGVpZ2h0ICsgdGFiLm9mZnNldFRvcH1weGBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXNjYXBlSGFuZGxlcilcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrT3V0SGFuZGxlcilcclxuXHJcbiAgICAgICAgY29udGVudC5mb2N1cygpXHJcbiAgICAgIH0sIDApXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGlkZVRvb2x0aXAoKSB7XHJcbiAgICAgIGNvbnRlbnQuc2V0QXR0cmlidXRlKEFSSUFfSElEREVOX0FUVFIsIHRydWUpXHJcbiAgICAgIGNvbnRyb2wuc2V0QXR0cmlidXRlKEFSSUFfRVhQQU5ERURfQVRUUiwgZmFsc2UpXHJcblxyXG4gICAgICB0YWIuY2xhc3NOYW1lID0gdGFiT3JpZ2luYWxDbGFzc05hbWU7XHJcblxyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIGVzY2FwZUhhbmRsZXIpXHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tPdXRIYW5kbGVyKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlVG9vbHRpcCgpIHtcclxuICAgICAgaGlkZVRvb2x0aXAoKVxyXG4gICAgICBjb250cm9sLmZvY3VzKClcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBlc2NhcGVIYW5kbGVyKHBFdmVudCkge1xyXG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSAnRXNjYXBlJykge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY29udGVudC5jb250YWlucyhwRXZlbnQudGFyZ2V0KSkge1xyXG4gICAgICAgIGNsb3NlVG9vbHRpcCgpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaGlkZVRvb2x0aXAoKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xpY2tPdXRIYW5kbGVyKHBFdmVudCkge1xyXG4gICAgICBpZiAoIWNvbnRlbnQuY29udGFpbnMocEV2ZW50LnRhcmdldCkpIHtcclxuICAgICAgICBoaWRlVG9vbHRpcCgpXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd1Rvb2x0aXApXHJcbiAgICBjb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKHBFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQua2V5ID09PSAnICcgfHwgZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgIHNob3dUb29sdGlwKClcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlVG9vbHRpcClcclxuICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKHBFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQua2V5ID09PSAnICcgfHwgZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgIGNsb3NlVG9vbHRpcCgpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gIH1cclxuXHJcbiAgW10uZm9yRWFjaC5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Rvb2x0aXBfX2NvbnRyb2wnKSwgcEVsZW1lbnQgPT4gcmVnaXN0ZXJUb29sdGlwKHBFbGVtZW50KSlcclxuXHJcbiAgLy8gVGhyZWUgc3RhdGUgY2hlY2sgYm94ZXMgXHJcbiAgJChcIi5teXMtcmFkaW9fX2NvbnRyb2xcIikuY2xpY2soZnVuY3Rpb24gKGV2KSB7XHJcbiAgICBsZXQgc2libGluZ3MgPSAkKHRoaXMpLmNsb3Nlc3QoXCIubXlzLXJhZGlvLWdyb3VwXCIpLmZpbmQoXCIubXlzLXJhZGlvX19ib3hcIik7XHJcbiAgICBsZXQgdGhpc0JveCA9ICQodGhpcykubmV4dChcIi5teXMtcmFkaW9fX2JveFwiKTtcclxuICAgICQoc2libGluZ3MpLnJlbW92ZUNsYXNzKCdteXMtcmFkaW9fX2JveC0tbm90LXNlbGVjdGVkJyk7XHJcbiAgICAkKHNpYmxpbmdzKS5ub3QodGhpc0JveCkuYWRkQ2xhc3MoJ215cy1yYWRpb19fYm94LS1ub3Qtc2VsZWN0ZWQnKTtcclxuICB9KTtcclxuXHJcbiAgJChcIi5teXMtcmFkaW8tZ3JvdXBcIikubW91c2VvdmVyKGZ1bmN0aW9uIChldikge1xyXG4gICAgbGV0IGNoZWNrZWRCb3ggPSAkKHRoaXMpLmZpbmQoXCJpbnB1dDpjaGVja2VkXCIpLm5leHQoXCIubXlzLXJhZGlvX19ib3hcIik7XHJcbiAgICBpZiAoY2hlY2tlZEJveC5sZW5ndGggIT09IDApIHtcclxuICAgICAgbGV0IHNpYmxpbmdzID0gJCh0aGlzKS5maW5kKFwiLm15cy1yYWRpb19fYm94XCIpO1xyXG4gICAgICBsZXQgY2hlY2tlZEJveCA9ICQodGhpcykubmV4dChcIi5teXMtcmFkaW9fX2JveFwiKTtcclxuICAgICAgJChzaWJsaW5ncykucmVtb3ZlQ2xhc3MoJ215cy1yYWRpb19fYm94LS1ub3Qtc2VsZWN0ZWQnKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgJChcIi5teXMtcmFkaW8tZ3JvdXBcIikubW91c2VsZWF2ZShmdW5jdGlvbiAoZXYpIHtcclxuICAgIGxldCBjaGVja2VkQm94ID0gJCh0aGlzKS5maW5kKFwiaW5wdXQ6Y2hlY2tlZFwiKS5uZXh0KFwiLm15cy1yYWRpb19fYm94XCIpO1xyXG4gICAgaWYgKGNoZWNrZWRCb3gubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgIGxldCBzaWJsaW5ncyA9ICQodGhpcykuZmluZChcIi5teXMtcmFkaW9fX2JveFwiKTtcclxuICAgICAgJChzaWJsaW5ncykucmVtb3ZlQ2xhc3MoJ215cy1yYWRpb19fYm94LS1ub3Qtc2VsZWN0ZWQnKTtcclxuICAgICAgJChzaWJsaW5ncykubm90KGNoZWNrZWRCb3gpLmFkZENsYXNzKCdteXMtcmFkaW9fX2JveC0tbm90LXNlbGVjdGVkJyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHZhciBjbGFpbVR5cGUgPSBnZXRVcmxQYXJhbWV0ZXIoJ2NsYWltVHlwZScpO1xyXG5cclxuICBpZiAoY2xhaW1UeXBlKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2xhaW1UeXBlJywgY2xhaW1UeXBlKTtcclxuICB9XHJcblxyXG5cclxuICAvLyBTd2FwIHRleHQgb24gdG9wIHBhbmVsIGFjY29yZGlvbiBidXR0b25cclxuICB2YXIgb3BlbiA9IGZhbHNlO1xyXG4gIHZhciBpbml0aWFsQnV0dG9uVGV4dCA9ICQoXCIuYWNjb3JkaW9uLXRvcHBhbmVsLWJ0blwiKS5odG1sKCk7XHJcbiAgJChcIi5hY2NvcmRpb24tdG9wcGFuZWwtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvLyBJIGRvbid0IHRoaW5rIHRoaXMgaXMgYSBnb29kIGlkZWFcclxuICAgIC8vIGNoYW5nZSB0aGUgYnV0dG9uIHRleHRcclxuICAgIC8vIG9wZW4gPSAhb3BlbjtcclxuICAgIC8vIGlmIChvcGVuKSB7XHJcbiAgICAvLyAgICQoXCIuYWNjb3JkaW9uLXRvcHBhbmVsLWJ0blwiKS5odG1sKFwiQ2xvc2VcIik7XHJcbiAgICAvLyB9IGVsc2Uge1xyXG4gICAgLy8gICAkKFwiLmFjY29yZGlvbi10b3BwYW5lbC1idG5cIikuaHRtbChpbml0aWFsQnV0dG9uVGV4dCk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgJCh0aGlzKS5jbG9zZXN0KCcudWlraXQtYWNjb3JkaW9uJykudG9nZ2xlQ2xhc3MoXCJhY2NvcmRpb24tY2xvc2VkXCIpO1xyXG4gICAgLy8gaGlkZSB0aGUgc3dpdGNoIGFjY291bnQgYm94XHJcbiAgICAkKHRoaXMpLmNsb3Nlc3QoJy5jb250YWluZXInKS5maW5kKFwiLnN3aXRjaC1hY2NvdW50LWJveFwiKS5hZGRDbGFzcyhcInN3aXRjaC1hY2NvdW50LWJveC0taGlkZVwiKTtcclxuICB9KTtcclxuXHJcbiAgLy8gc3dhcC1ib3gtdW4taGlkZVxyXG4gICQoXCIuc3dpdGNoLWFjY291bnQtYnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uIChldikge1xyXG4gICAgJCh0aGlzKS5jbG9zZXN0KCcuY29udGFpbmVyJykuZmluZChcIi5zd2l0Y2gtYWNjb3VudC1ib3hcIikudG9nZ2xlQ2xhc3MoXCJzd2l0Y2gtYWNjb3VudC1ib3gtLWhpZGVcIik7XHJcbiAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwic3dpdGNoLWFjY291bnQtYnV0dG9uLS1vcGVuXCIpO1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfSk7XHJcblxyXG4gICQoXCIuc3dpdGNoLWFjY291bnQtYm94X19saW5rXCIpLmNsaWNrKGZ1bmN0aW9uIChldikge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyBQb0MgZmlsZSB1cGxvYWQgZm9yIHByb3RvdHlwZVxyXG4vLyBUT0RPOjogaGFuZGxlIGNhbmNlbCBcclxuLy8gVE9ETzo6IGFkZCBhZGRpdGlvbmFsIGl0ZW1zIFxyXG5cclxuKGZ1bmN0aW9uIChkb2N1bWVudCwgd2luZG93LCBpbmRleCkge1xyXG4gIC8vIHZhciBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmlsZS11cGxvYWRfX2lucHV0Jyk7XHJcbiAgLy8gaWYgKCFpbnB1dHMpIHtcclxuICB2YXIgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZpbGUtdXBsb2FkLWRlZmF1bHRfX2lucHV0Jyk7XHJcbiAgLy8gfVxyXG5cclxuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGlucHV0cywgZnVuY3Rpb24gKGlucHV0KSB7XHJcbiAgICB2YXIgbGFiZWwgPSBpbnB1dC5uZXh0RWxlbWVudFNpYmxpbmcsXHJcbiAgICAgIGxhYmVsVmFsID0gbGFiZWwuaW5uZXJIVE1MLFxyXG4gICAgICBjYXRlZ29yeVRyID0gaW5wdXQuY2xvc2VzdChcInRyXCIpLFxyXG4gICAgICBjYXRlZ29yeSA9IGNhdGVnb3J5VHIucXVlcnlTZWxlY3Rvcignc2VsZWN0JyksXHJcbiAgICAgIGNhdGVnb3J5TmFtZSA9ICcnO1xyXG5cclxuICAgIGlmIChjYXRlZ29yeSkge1xyXG4gICAgICBjYXRlZ29yeS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGNhdGVnb3J5TmFtZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICB2YXIgZmlsZU5hbWUgPSAnJztcclxuXHJcbiAgICAgIGZpbGVOYW1lID0gZS50YXJnZXQudmFsdWUuc3BsaXQoJ1xcXFwnKS5wb3AoKTtcclxuXHJcbiAgICAgIGlmIChmaWxlTmFtZSkge1xyXG5cclxuICAgICAgICBjYXRlZ29yeS5vdXRlckhUTUwgPSAnPGxhYmVsPicgKyBjYXRlZ29yeU5hbWUgKyAnPC9sYWJlbD4nO1xyXG5cclxuICAgICAgICAvLyBsYWJlbC5xdWVyeVNlbGVjdG9yKCcuZmlsZS11cGxvYWQtZGVmYXVsdF9fZmlsZS1uYW1lJykuaW5uZXJIVE1MID0gZmlsZU5hbWU7XHJcbiAgICAgICAgY2F0ZWdvcnlUci5xdWVyeVNlbGVjdG9yKCcuZmlsZS11cGxvYWQtZGVmYXVsdF9fZmlsZS1uYW1lJykuaW5uZXJIVE1MID0gZmlsZU5hbWU7XHJcbiAgICAgICAgY2F0ZWdvcnlUci5xdWVyeVNlbGVjdG9yKCcuZmlsZS11cGxvYWQtZGVmYXVsdF9fZmlsZS1uYW1lJykuY2xhc3NMaXN0LmFkZCgnZmlsZS11cGxvYWQtZGVmYXVsdF9fZmlsZS1uYW1lLS11cGxvYWRlZCcpO1xyXG4gICAgICAgIGxhYmVsLnF1ZXJ5U2VsZWN0b3IoJy51aWtpdC1idG4nKS5pbm5lckhUTUwgPSAnUmVtb3ZlJztcclxuICAgICAgICBsYWJlbC5xdWVyeVNlbGVjdG9yKCcudWlraXQtYnRuJykuY2xhc3NMaXN0LmFkZCgndWlraXQtYnRuLS10ZXJ0aWFyeScpO1xyXG5cclxuICAgICAgICAkKCcuZmlsZS11cGxvYWQtLWFkZCcpLnNob3coKTtcclxuICAgICAgICAkKCcucHQtdXBsb2FkLWxpc3Qtb3B0aW9uYWwnKS5zaG93KCk7XHJcblxyXG4gICAgICAgIHZhciBzdGF0dXMgPSBjYXRlZ29yeVRyLnF1ZXJ5U2VsZWN0b3IoJy5maWxlLXVwbG9hZC1kZWZhdWx0X19maWxlLW5hbWUnKS5jbG9zZXN0KCd0cicpO1xyXG4gICAgICAgIHZhciBjYXRlZ29yeVRyQ2xhc3MgPSBjYXRlZ29yeVRyO1xyXG5cclxuXHJcbiAgICAgICAgc3RhdHVzID0gc3RhdHVzLnF1ZXJ5U2VsZWN0b3IoJy5maWxlLXN0YXR1cycpO1xyXG4gICAgICAgIGlmIChzdGF0dXMpIHtcclxuICAgICAgICAgIHN0YXR1cy5pbm5lckhUTUwgPSAnUmVtb3ZlJztcclxuICAgICAgICAgIHN0YXR1cy5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJzclwiPiBVcGxvYWRlZDwvc3Bhbj4nO1xyXG4gICAgICAgICAgc3RhdHVzID0gc3RhdHVzLmNsYXNzTGlzdDtcclxuICAgICAgICAgIHN0YXR1cy5yZW1vdmUoJ2ZpbGUtc3RhdHVzLS1yZXF1aXJlZCcpO1xyXG4gICAgICAgICAgc3RhdHVzLmFkZCgnZmlsZS1zdGF0dXMtLXVwbG9hZGVkJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXRlZ29yeVRyQ2xhc3MuY2xhc3NMaXN0LmFkZCgnZmlsZS11cGxvYWQtZGVmYXVsdF9fcm93LS11cGxvYWRlZCcpO1xyXG5cclxuXHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICBsYWJlbC5pbm5lckhUTUwgPSBsYWJlbFZhbDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRmlyZWZveCBidWcgZml4XHJcbiAgICAvLyBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGZ1bmN0aW9uICgpIHsgaW5wdXQuY2xhc3NMaXN0LmFkZCgnaGFzLWZvY3VzJyk7IH0pO1xyXG4gICAgLy8gaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uICgpIHsgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnaGFzLWZvY3VzJyk7IH0pO1xyXG4gIH0pO1xyXG59KGRvY3VtZW50LCB3aW5kb3csIDApKTtcclxuXHJcblxyXG5cclxuLyohIEBnb3YuYXUvYW5pbWF0ZSB2MS4wLjEyICovXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICpcclxuICogQW5pbWF0ZSBmdW5jdGlvblxyXG4gKlxyXG4gKiBBIGZ1bmN0aW9uIHRvIG9wZW4sIGNsb3NlIGFuZCB0b2dnbGUgdGhlIGRpc3BsYXkgb2YgcGFnZSBlbGVtZW50cy5cclxuICpcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudmFyIEFVID0gQVUgfHwge307XHJcblxyXG4oZnVuY3Rpb24gKEFVKSB7XHJcblxyXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBOQU1FU1BBQ0UgTU9EVUxFXHJcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIHZhciBhbmltYXRlID0ge31cclxuXHJcblxyXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBQUklWQVRFIEZVTkNUSU9OU1xyXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvKipcclxuICAgKiBQUklWQVRFXHJcbiAgICogQ2FsY3VsYXRlIHRoZSByZXF1aXJlbWVudHMgZm9yIHRoZSBkZXNpcmVkIGFuaW1hdGlvblxyXG4gICAqXHJcbiAgICogQHBhcmFtICB7aW50ZWdlcn0gaW5pdGlhbFNpemUgLSBUaGUgaW5pdGlhbCBzaXplIG9mIHRoZSBlbGVtZW50IHRvIGFuaW1hdGVcclxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBlbmRTaXplICAgICAtIFRoZSBzaXplIHRoZSBlbGVtZW50IGFmdGVyIHRoZSBhbmltYXRpb24gY29tcGxldGVzXHJcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgc3BlZWQgICAgICAgLSBUaGUgc3BlZWQgb2YgdGhlIGFuaW1hdGlvbiBpbiBtc1xyXG4gICAqXHJcbiAgICogQHJldHVybiB7b2JqZWN0fSAgICAgICAgICAgICAgLSBSZXF1aXJlZCBzdGVwcywgc3RlcFNpemUgYW5kIGludGVydmFsVGltZSBmb3IgdGhlIGFuaW1hdGlvblxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIENhbGN1bGF0ZUFuaW1hdGlvblNwZWNzKGluaXRpYWxTaXplLCBlbmRTaXplLCBzcGVlZCkge1xyXG5cclxuICAgIGlmIChpbml0aWFsU2l6ZSA9PT0gZW5kU2l6ZSkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0ZXBTaXplOiAwLFxyXG4gICAgICAgIHN0ZXBzOiAwLFxyXG4gICAgICAgIGludGVydmFsVGltZTogMCxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGlzdGFuY2UgPSBlbmRTaXplIC0gaW5pdGlhbFNpemU7IC8vIHRoZSBvdmVyYWxsIGRpc3RhbmNlIHRoZSBhbmltYXRpb24gbmVlZHMgdG8gdHJhdmVsXHJcbiAgICB2YXIgaW50ZXJ2YWxUaW1lID0gKHNwZWVkIC8gZGlzdGFuY2UpOyAvLyB0aGUgdGltZSBlYWNoIHNldEludGVydmFsIGl0ZXJhdGlvbiB3aWxsIHRha2VcclxuICAgIHZhciBzdGVwU2l6ZSA9IGRpc3RhbmNlIDwgMCA/IC0xIDogMTsgLy8gaWYgZGlzdGFuY2UgaXMgbmVnYXRpdmUgdGhlbiB3ZSBzZXQgc3RlcFNpemUgdG8gLTFcclxuICAgIHZhciBzdGVwcyA9IE1hdGguYWJzKGRpc3RhbmNlIC8gc3RlcFNpemUpOyAvLyB0aGUgYW1vdW50IG9mIHN0ZXBzIHJlcXVpcmVkIHRvIGdldCB0byBlbmRTaXplXHJcbiAgICBpbnRlcnZhbFRpbWUgPSBzcGVlZCAvIHN0ZXBzO1xyXG5cclxuICAgIC8vIHdlIG5lZWQgdG8gYWRqdXN0IG91ciBhbmltYXRpb24gc3BlY3MgaWYgaW50ZXJ2YWwgdGltZSBleGNlZWRzIDYwRlBTIGVnIGludGVydmFsVGltZSA8IDE2LjY3bXNcclxuICAgIGlmIChNYXRoLmFicyhpbnRlcnZhbFRpbWUpIDwgKDEwMDAgLyA2MCkpIHtcclxuICAgICAgaW50ZXJ2YWxUaW1lID0gKDEwMDAgLyA2MCk7IC8vIGxldOKAmXMgbm90IGdldCBsb3dlciB0aGF0IDYwRlBTXHJcbiAgICAgIHN0ZXBzID0gTWF0aC5jZWlsKE1hdGguYWJzKHNwZWVkIC8gaW50ZXJ2YWxUaW1lKSk7IC8vIHdlIG5vdyBuZWVkIHRoZSBzdGVwcyBhbmQgbWFrZSBzdXJlIHdlIGNlaWwgdGhlbSBzbyAtMSB3b24ndCBtYWtlIHRoZW0gbmVnYXRpdmVcclxuICAgICAgc3RlcFNpemUgPSBkaXN0YW5jZSAvIHN0ZXBzOyAvLyBsYXN0IHRoaW5nIGlzIHN0ZXAgc2l6ZXMgd2hpY2ggYXJlIGRlcml2ZWQgZnJvbSBhbGwgb2YgdGhlIGFib3ZlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RlcFNpemU6IHN0ZXBTaXplLFxyXG4gICAgICBzdGVwczogKHN0ZXBzIC0gMSksXHJcbiAgICAgIGludGVydmFsVGltZTogaW50ZXJ2YWxUaW1lLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vIGV4cG9ydCBmb3Igbm9kZSBhbmQgYmFiZWwgZW52aXJvbm1lbnRzXHJcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBhbmltYXRlLkNhbGN1bGF0ZUFuaW1hdGlvblNwZWNzID0gQ2FsY3VsYXRlQW5pbWF0aW9uU3BlY3M7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFBVQkxJQyBGVU5DVElPTlNcclxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLyoqXHJcbiAgICogR2V0dGluZyBjb21wdXRlZCBDU1Mgc3R5bGVzIGZyb20gbm9ybWFsIGJyb3dzZXJzIGFuZCBJRVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGVsZW1lbnQgIC0gVGhlIERPTSBlbGVtZW50IHdlIHdhbnQgdG8gZ2V0IHRoZSBjb21wdXRlZCBzdHlsZSBmcm9tXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IC0gVGhlIENTUyBwcm9wZXJ0eVxyXG4gICAqXHJcbiAgICogQHJldHVybiB7c3RyaW5nfGludGVnZXJ9IC0gVGhlIENTUyB2YWx1ZSBmb3IgdGhlIHByb3BlcnR5XHJcbiAgICovXHJcbiAgYW5pbWF0ZS5HZXRDU1NQcm9wZXJ0eUJlY2F1c2VJRSA9IGZ1bmN0aW9uIChlbGVtZW50LCBwcm9wZXJ0eSkge1xyXG4gICAgaWYgKHR5cGVvZiBnZXRDb21wdXRlZFN0eWxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudClbcHJvcGVydHldO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIHNwYWNlID0gZWxlbWVudC5jdXJyZW50U3R5bGVbcHJvcGVydHldO1xyXG5cclxuICAgICAgaWYgKHNwYWNlID09PSAnYXV0bycpIHtcclxuICAgICAgICBzcGFjZSA9IEFVLmFuaW1hdGUuQ2FsY3VsYXRlQXV0byhlbGVtZW50LCBwcm9wZXJ0eSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBzcGFjZTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlIHRoZSBzaXplIG9mIHRoZSBlbGVtZW50IHdoZW4gaXTigJlzIGRpbWVuc2lvbihoZWlnaHQgb3Igd2lkdGgpIGlzIHNldCB0byBhdXRvXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtvYmplY3R9IGVsZW1lbnQgICAtIFRoZSBlbGVtZW50IHRvIHJlYWQgYXV0byBoZWlnaHQgZnJvbVxyXG4gICAqIEBwYXJhbSAge3N0cmluZ30gZGltZW5zaW9uIC0gVGhlIGRpbWVuc2lvbiB0byBtZWFzdXJlXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtpbnRlZ2VyfSAgICAgICAgICAtIFRoZSBzaXplIG9mIHRoZSBlbGVtZW50IHdoZW4gYXQgZGltZW5zaW9uKGhlaWdodCBvciB3aWR0aCkgaXMgc2V0IHRvICdhdXRvJ1xyXG4gICAqL1xyXG4gIGFuaW1hdGUuQ2FsY3VsYXRlQXV0byA9IGZ1bmN0aW9uIChlbGVtZW50LCBkaW1lbnNpb24pIHtcclxuICAgIHZhciBpbml0aWFsU2l6ZTtcclxuICAgIHZhciBlbmRTaXplO1xyXG5cclxuICAgIGlmIChkaW1lbnNpb24gPT09ICdoZWlnaHQnKSB7XHJcbiAgICAgIGluaXRpYWxTaXplID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7IC8vIGdldCBjdXJyZW50IGhlaWdodFxyXG4gICAgICBlbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSAnYXV0byc7IC8vIHNldCBoZWlnaHQgdG8gYXV0b1xyXG4gICAgICBlbmRTaXplID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7IC8vIGdldCBoZWlnaHQgYWdhaW5cclxuICAgICAgZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gaW5pdGlhbFNpemUgKyAncHgnOyAvLyBzZXQgYmFjayB0byBpbml0aWFsIGhlaWdodFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW5pdGlhbFNpemUgPSBlbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgICBlbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSAnYXV0byc7XHJcbiAgICAgIGVuZFNpemUgPSBlbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgICBlbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSBpbml0aWFsU2l6ZSArICdweCc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBhcnNlSW50KGVuZFNpemUpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIGFueSBhdSBhbmltYXRpb24gb24gYSBET00gZWxlbWVudFxyXG4gICAqXHJcbiAgICogQHBhcmFtICB7b2JqZWN0fSBlbGVtZW50IC0gVGhlIGVsZW1lbnQgdG8gc3RvcCBhbmltYXRpbmdcclxuICAgKi9cclxuICBhbmltYXRlLlN0b3AgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgY2xlYXJJbnRlcnZhbChlbGVtZW50LkFVYW5pbWF0aW9uKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1hZ2ljYWwgYW5pbWF0aW9uIGZ1bmN0aW9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtvYmplY3R9ICAgICAgICAgb3B0aW9ucyAgICAgICAgICAtIFRoZSBvcHRpb25zIGZvciB0aGUgYW5pbWF0aW9uXHJcbiAgICogQHBhcmFtICB7b2JqZWN0fSAgICAgICAgIG9wdGlvbnMuZWxlbWVudCAgLSBFbGVtZW50L3Mgd2UgYXJlIGFuaW1hdGluZyAoRE9NIG5vZGVzKVxyXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICBvcHRpb25zLnByb3BlcnR5IC0gVGhlIENTUyBwcm9wZXJ0eSB0byBhbmltYXRlXHJcbiAgICogQHBhcmFtICB7aW50ZWdlcnxzdHJpbmd9IG9wdGlvbnMuZW5kU2l6ZSAgLSBUaGUgc2l6ZSB0aGUgZWxlbWVudCBzaG91bGQgYW5pbWF0ZSB0by4gQ2FuIGJlICdhdXRvJyBvciBwaXhlbCB2YWx1ZVxyXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9ICAgICAgICBvcHRpb25zLnNwZWVkICAgIC0gVGhlIHNwZWVkIG9mIHRoZSBhbmltYXRpb24gaW4gbWlsbGlzZWNvbmRzIFtvcHRpb25hbF0gW2RlZmF1bHQ6IDI1MF1cclxuICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgb3B0aW9ucy5jYWxsYmFjayAtIEEgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgYWZ0ZXIgdGhlIGFuaW1hdGlvbiBlbmRzIFtvcHRpb25hbF1cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge3Vua25vd259ICAgICAgICAgICAgICAgICAgICAgICAgIC0gVGhlIHJldHVybiB2YWx1ZSBwYXNzZWQgb24gZnJvbSBvdXIgb3B0aW9ucy5jYWxsYmFjayBmdW5jdGlvbiBbb3B0aW9uYWxdXHJcbiAgICovXHJcbiAgYW5pbWF0ZS5SdW4gPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgLy8gZGVmYXVsdHNcclxuICAgIHZhciBlbGVtZW50cyA9IG9wdGlvbnMuZWxlbWVudDtcclxuICAgIHZhciBzcGVlZCA9IG9wdGlvbnMuc3BlZWQgfHwgMjUwO1xyXG5cclxuICAgIC8vIG1ha2luZyBhIHNpbmdsZSBET00gZWxlbWVudCBpdGVyYXRhYmxlXHJcbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgZWxlbWVudHMgPSBbZWxlbWVudHNdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1ha2luZyBhIGNhbGxiYWNrIGlmIG5vbmUgd2FzIHByb3ZpZGVkXHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgb3B0aW9ucy5jYWxsYmFjayA9IGZ1bmN0aW9uICgpIHsgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhZGRpbmcgaXRlcmF0aW9uIGNvdW50c1xyXG4gICAgZWxlbWVudHNbMF0uQVVpbnRlcmF0aW9uID0gMDtcclxuICAgIGVsZW1lbnRzWzBdLkFVaW50ZXJhdGlvbnMgPSBlbGVtZW50cy5sZW5ndGg7XHJcblxyXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGFsbCBET00gbm9kZXNcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIGVsZW1lbnQgPSBlbGVtZW50c1tpXTsgLy8gdGhpcyBlbGVtZW50XHJcbiAgICAgIEFVLmFuaW1hdGUuU3RvcChlbGVtZW50KTsgLy8gc3RvcCBhbnkgcHJldmlvdXMgYW5pbWF0aW9uc1xyXG4gICAgICB2YXIgaW5pdGlhbFNpemUgPSBwYXJzZUludChBVS5hbmltYXRlLkdldENTU1Byb3BlcnR5QmVjYXVzZUlFKGVsZW1lbnQsIG9wdGlvbnMucHJvcGVydHkpKTsgLy8gdGhlIGVsZW1lbnRzIGN1cnJlbnQgc2l6ZVxyXG4gICAgICB2YXIgZW5kU2l6ZSA9IG9wdGlvbnMuZW5kU2l6ZTsgLy8gdGhlIGVsZW1lbnQgZW5kIHNpemVcclxuXHJcbiAgICAgIGlmIChvcHRpb25zLmVuZFNpemUgPT09ICdhdXRvJykgeyAvLyBjYWxjdWxhdGUgd2hhdCAnYXV0bycgbWVhbnMgaW4gcGl4ZWxcclxuICAgICAgICBlbmRTaXplID0gQVUuYW5pbWF0ZS5DYWxjdWxhdGVBdXRvKGVsZW1lbnQsIG9wdGlvbnMucHJvcGVydHkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBjYWxjdWxhdGUgb3VyIGFuaW1hdGlvbiBzcGVjc1xyXG4gICAgICB2YXIgYW5pbWF0aW9uU3BlY3MgPSBDYWxjdWxhdGVBbmltYXRpb25TcGVjcyhpbml0aWFsU2l6ZSwgZW5kU2l6ZSwgc3BlZWQpO1xyXG4gICAgICB2YXIgaXRlcmF0ZUNvdW50ZXIgPSBpbml0aWFsU2l6ZTtcclxuXHJcbiAgICAgIC8vIHNldCBzdGF0ZVxyXG4gICAgICBpZiAoYW5pbWF0aW9uU3BlY3Muc3RlcFNpemUgPCAwKSB7XHJcbiAgICAgICAgZWxlbWVudC5BVXRvZ2dsZVN0YXRlID0gJ2Nsb3NpbmcnO1xyXG4gICAgICB9IGVsc2UgaWYgKGFuaW1hdGlvblNwZWNzLnN0ZXBTaXplID4gMCkge1xyXG4gICAgICAgIGVsZW1lbnQuQVV0b2dnbGVTdGF0ZSA9ICdvcGVuaW5nJztcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gc2NvcGluZyB2YXJpYWJsZVxyXG4gICAgICAoZnVuY3Rpb24gKGVsZW1lbnQsIGluaXRpYWxTaXplLCBpdGVyYXRlQ291bnRlciwgYW5pbWF0aW9uU3BlY3MsIGVuZFNpemUpIHtcclxuICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIGFuaW1hdGlvbiBieSBhZGRpbmcgaXQgdG8gdGhlIERPTSBlbGVtZW50XHJcbiAgICAgICAgZWxlbWVudC5BVWFuaW1hdGlvbiA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAvLyB3aGVuIHdlIGFyZSBhdCB0aGUgZW5kXHJcbiAgICAgICAgICBpZiAoaW5pdGlhbFNpemUgPT09IGVuZFNpemUgfHwgYW5pbWF0aW9uU3BlY3Muc3RlcHMgPT09IDApIHtcclxuICAgICAgICAgICAgQVUuYW5pbWF0ZS5TdG9wKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtvcHRpb25zLnByb3BlcnR5XSA9IGVuZFNpemUgKyAncHgnOyAvLyBzZXQgdG8gZW5kU2l6ZVxyXG4gICAgICAgICAgICBlbGVtZW50LkFVdG9nZ2xlU3RhdGUgPSAnJztcclxuXHJcbiAgICAgICAgICAgIGVsZW1lbnRzWzBdLkFVaW50ZXJhdGlvbisrO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVtb3ZpbmcgYXV0byBzbyBDU1MgY2FuIHRha2Ugb3ZlclxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5lbmRTaXplID09PSAnYXV0bycpIHtcclxuICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW29wdGlvbnMucHJvcGVydHldID0gJyc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHdoZW4gYWxsIGl0ZXJhdGlvbnMgaGF2ZSBmaW5pc2hlZCwgcnVuIHRoZSBjYWxsYmFja1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudHNbMF0uQVVpbnRlcmF0aW9uID49IGVsZW1lbnRzWzBdLkFVaW50ZXJhdGlvbnMpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5jYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gaWYgd2UgYXJlIHN0aWxsIGFuaW1hdGluZ1xyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGl0ZXJhdGVDb3VudGVyICs9IGFuaW1hdGlvblNwZWNzLnN0ZXBTaXplO1xyXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlW29wdGlvbnMucHJvcGVydHldID0gaXRlcmF0ZUNvdW50ZXIgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgYW5pbWF0aW9uU3BlY3Muc3RlcHMtLTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSwgTWF0aC5hYnMoYW5pbWF0aW9uU3BlY3MuaW50ZXJ2YWxUaW1lKSk7XHJcbiAgICAgIH0pKGVsZW1lbnQsIGluaXRpYWxTaXplLCBpdGVyYXRlQ291bnRlciwgYW5pbWF0aW9uU3BlY3MsIGVuZFNpemUpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGUgYW5pbWF0aW9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtvYmplY3R9ICAgICAgICAgb3B0aW9ucyAgICAgICAgICAgICAgLSBUaGUgb3B0aW9ucyBmb3IgdGhlIGFuaW1hdGlvblxyXG4gICAqIEBwYXJhbSAge29iamVjdH0gICAgICAgICBvcHRpb25zLmVsZW1lbnQgICAgICAtIEVsZW1lbnQvcyB3ZSBhcmUgYW5pbWF0aW5nIChET00gbm9kZXMpXHJcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgIG9wdGlvbnMucHJvcGVydHkgICAgIC0gVGhlIENTUyBwcm9wZXJ0eSB0byBhbmltYXRlIFtvcHRpb25hbF0gW2RlZmF1bHQ6ICdoZWlnaHQnXVxyXG4gICAqIEBwYXJhbSAge2ludGVnZXJ8c3RyaW5nfSBvcHRpb25zLmNsb3NlU2l6ZSAgICAtIFRoZSBzaXplIHRoZSBlbGVtZW50IHNob3VsZCBjbG9zZSB0by4gQ2FuIGJlICdhdXRvJyBvciBwaXhlbCB2YWx1ZSBbb3B0aW9uYWxdIFtkZWZhdWx0OiAwXVxyXG4gICAqIEBwYXJhbSAge2ludGVnZXJ8c3RyaW5nfSBvcHRpb25zLm9wZW5TaXplICAgICAtIFRoZSBzaXplIHRoZSBlbGVtZW50IHNob3VsZCBvcGVuIHRvLiBDYW4gYmUgJ2F1dG8nIG9yIHBpeGVsIHZhbHVlIFtvcHRpb25hbF0gW2RlZmF1bHQ6ICdhdXRvJ11cclxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSAgICAgICAgb3B0aW9ucy5zcGVlZCAgICAgICAgLSBUaGUgc3BlZWQgb2YgdGhlIGFuaW1hdGlvbiBpbiBtaWxsaXNlY29uZHMgW29wdGlvbmFsXSBbZGVmYXVsdDogMjUwXVxyXG4gICAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICBvcHRpb25zLnByZWZ1bmN0aW9uICAtIEEgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgYmVmb3JlIGVhY2ggYW5pbWF0aW9uIHN0YXJ0cywgcGFzc2VzIHtvYmplY3R9IGVsZW1lbnQsIHtzdHJpbmd9IHN0YXRlIFtvcHRpb25hbF1cclxuICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgb3B0aW9ucy5wb3N0ZnVuY3Rpb24gLSBBIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIGFmdGVyIGVhY2ggYW5pbWF0aW9uIGVuZHMsIHBhc3NlcyB7b2JqZWN0fSBlbGVtZW50LCB7c3RyaW5nfSBzdGF0ZSBbb3B0aW9uYWxdXHJcbiAgICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgIG9wdGlvbnMuY2FsbGJhY2sgICAgIC0gQSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBhZnRlciB0aGUgYW5pbWF0aW9uIGVuZHMsIHBhc3NlcyB7b2JqZWN0fSBlbGVtZW50LCB7c3RyaW5nfSBzdGF0ZSBbb3B0aW9uYWxdXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHt1bmtub3dufSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLSBUaGUgcmV0dXJuIHZhbHVlIHBhc3NlZCBvbiBmcm9tIG91ciBvcHRpb25zLmNhbGxiYWNrIGZ1bmN0aW9uIFtvcHRpb25hbF1cclxuICAgKi9cclxuICBhbmltYXRlLlRvZ2dsZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblxyXG4gICAgdmFyIGVsZW1lbnRzID0gb3B0aW9ucy5lbGVtZW50O1xyXG4gICAgdmFyIHByb3BlcnR5ID0gb3B0aW9ucy5wcm9wZXJ0eSB8fCAnaGVpZ2h0JztcclxuICAgIHZhciBzcGVlZCA9IG9wdGlvbnMuc3BlZWQgfHwgMjUwO1xyXG4gICAgdmFyIGNsb3NlU2l6ZSA9IG9wdGlvbnMuY2xvc2VTaXplID09PSB1bmRlZmluZWQgPyAwIDogb3B0aW9ucy5jbG9zZVNpemU7XHJcbiAgICB2YXIgb3BlblNpemUgPSBvcHRpb25zLm9wZW5TaXplID09PSB1bmRlZmluZWQgPyAnYXV0bycgOiBvcHRpb25zLm9wZW5TaXplO1xyXG5cclxuICAgIC8vIG1ha2luZyBhIHNpbmdsZSBET00gZWxlbWVudCBpdGVyYXRhYmxlXHJcbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgZWxlbWVudHMgPSBbZWxlbWVudHNdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1ha2luZyBhIHByZWZ1bmN0aW9uIGlmIG5vbmUgd2FzIHByb3ZpZGVkXHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMucHJlZnVuY3Rpb24gIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgb3B0aW9ucy5wcmVmdW5jdGlvbiA9IGZ1bmN0aW9uICgpIHsgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtYWtpbmcgYSBwb3N0ZnVuY3Rpb24gaWYgbm9uZSB3YXMgcHJvdmlkZWRcclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5wb3N0ZnVuY3Rpb24gIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgb3B0aW9ucy5wb3N0ZnVuY3Rpb24gPSBmdW5jdGlvbiAoKSB7IH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWFraW5nIGEgY2FsbGJhY2sgaWYgbm9uZSB3YXMgcHJvdmlkZWRcclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5jYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBvcHRpb25zLmNhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZGluZyBpdGVyYXRpb24gY291bnRzXHJcbiAgICBlbGVtZW50c1swXS5BVXRvZ2dsZUludGVyYXRpb24gPSAwO1xyXG4gICAgZWxlbWVudHNbMF0uQVV0b2dnbGVJbnRlcmF0aW9ucyA9IGVsZW1lbnRzLmxlbmd0aDtcclxuXHJcbiAgICAvLyBpdGVyYXRlIG92ZXIgYWxsIERPTSBub2Rlc1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xyXG5cclxuICAgICAgQVUuYW5pbWF0ZS5TdG9wKGVsZW1lbnQpO1xyXG5cclxuICAgICAgdmFyIHRhcmdldFNpemU7IC8vIHRoZSBzaXplIHRoZSBlbGVtZW50IHNob3VsZCBvcGVuL2Nsb3NlIHRvIGFmdGVyIHRvZ2dsZSBpcyBjbGlja2VkXHJcbiAgICAgIHZhciBwcmVTdGF0ZSA9ICcnOyAvLyB0aGUgc3RhdGUgd2UgYW5pbWF0ZSB0byBmb3IgdGhlIHByZWZ1bmN0aW9uIGFuZCBjYWxsYmFjayBmdW5jdGlvbnNcclxuICAgICAgdmFyIHBvc3RTdGF0ZSA9ICcnOyAvLyB0aGUgc3RhdGUgd2UgYW5pbWF0ZSB0byBmb3IgdGhlIHByZWZ1bmN0aW9uIGFuZCBjYWxsYmFjayBmdW5jdGlvbnNcclxuICAgICAgdmFyIGN1cnJlbnRTaXplID0gcGFyc2VJbnQoQVUuYW5pbWF0ZS5HZXRDU1NQcm9wZXJ0eUJlY2F1c2VJRShlbGVtZW50LCBvcHRpb25zLnByb3BlcnR5KSk7IC8vIHRoZSBjdXJyZW50IHNpemUgb2YgdGhlIGVsZW1lbnRcclxuXHJcbiAgICAgIGlmIChjdXJyZW50U2l6ZSA9PT0gY2xvc2VTaXplIHx8IGVsZW1lbnQuQVV0b2dnbGVTdGF0ZSA9PT0gJ2Nsb3NpbmcnKSB7XHJcbiAgICAgICAgdGFyZ2V0U2l6ZSA9IG9wZW5TaXplO1xyXG4gICAgICAgIHByZVN0YXRlID0gJ29wZW5pbmcnO1xyXG4gICAgICAgIHBvc3RTdGF0ZSA9ICdvcGVuJztcclxuICAgICAgfSBlbHNlIGlmIChjdXJyZW50U2l6ZSAhPT0gY2xvc2VTaXplIHx8IGVsZW1lbnQuQVV0b2dnbGVTdGF0ZSA9PT0gJ29wZW5pbmcnKSB7XHJcbiAgICAgICAgdGFyZ2V0U2l6ZSA9IGNsb3NlU2l6ZTtcclxuICAgICAgICBwcmVTdGF0ZSA9ICdjbG9zaW5nJztcclxuICAgICAgICBwb3N0U3RhdGUgPSAnY2xvc2VkJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FVLmFuaW1hdGUuVG9nZ2xlIGNhbm5vdCBkZXRlcm1pbmUgc3RhdGUgb2YgZWxlbWVudCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBydW4gcHJlZnVuY3Rpb24gb25jZSBwZXIgZWxlbWVudFxyXG4gICAgICBvcHRpb25zLnByZWZ1bmN0aW9uKGVsZW1lbnQsIHByZVN0YXRlKTtcclxuXHJcbiAgICAgIC8vIHNob290IG9mZiBhbmltYXRpb25cclxuICAgICAgQVUuYW5pbWF0ZS5SdW4oe1xyXG4gICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXHJcbiAgICAgICAgZW5kU2l6ZTogdGFyZ2V0U2l6ZSxcclxuICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHksXHJcbiAgICAgICAgc3BlZWQ6IHNwZWVkLFxyXG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7IC8vIG1ha2luZyBzdXJlIHdlIGZpcmUgdGhlIGNhbGxiYWNrIG9ubHkgb25jZVxyXG4gICAgICAgICAgZWxlbWVudHNbMF0uQVV0b2dnbGVJbnRlcmF0aW9uKys7XHJcblxyXG4gICAgICAgICAgaWYgKGVsZW1lbnRzWzBdLkFVdG9nZ2xlSW50ZXJhdGlvbiA9PT0gZWxlbWVudHNbMF0uQVVpbnRlcmF0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgcmV0dXJuUGFyYW0gPSBvcHRpb25zLmNhbGxiYWNrKGVsZW1lbnQsIHBvc3RTdGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBydW4gcG9zdGZ1bmN0aW9uIG9uY2UgcGVyIGVsZW1lbnRcclxuICAgICAgICAgICAgb3B0aW9ucy5wb3N0ZnVuY3Rpb24oZWxlbWVudCwgcG9zdFN0YXRlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5QYXJhbTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBydW4gcG9zdGZ1bmN0aW9uIG9uY2UgcGVyIGVsZW1lbnRcclxuICAgICAgICAgIG9wdGlvbnMucG9zdGZ1bmN0aW9uKGVsZW1lbnQsIHBvc3RTdGF0ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICBBVS5hbmltYXRlID0gYW5pbWF0ZTtcclxuXHJcbn0oQVUpKTtcclxuXHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICBtb2R1bGUuZXhwb3J0cyA9IEFVO1xyXG59XHJcblxyXG5cclxuaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xyXG4gICAgdmFsdWU6IHRydWVcclxuICB9KTtcclxuXHJcbiAgZXZhbCgnZXhwb3J0cy5kZWZhdWx0ID0gQVUnKTtcclxufVxyXG5cclxuXHJcblxyXG4vKiEgQGdvdi5hdS9hY2NvcmRpb24gdjcuMC43ICovXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICpcclxuICogQWNjb3JkaW9uIGZ1bmN0aW9uXHJcbiAqXHJcbiAqIEEgY29tcG9uZW50IHRvIGFsbG93IHVzZXJzIHRvIHNob3cgb3IgaGlkZSBwYWdlIGVsZW1lbnRzLlxyXG4gKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG52YXIgQVUgPSBBVSB8fCB7fTtcclxuXHJcbihmdW5jdGlvbiAoQVUpIHtcclxuXHJcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE5BTUVTUEFDRSBNT0RVTEVcclxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgdmFyIGFjY29yZGlvbiA9IHt9XHJcblxyXG5cclxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUFJJVkFURSBGVU5DVElPTlNcclxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLyoqXHJcbiAgICogUFJJVkFURVxyXG4gICAqIFNldCB0aGUgY29ycmVjdCBBcmlhIHJvbGVzIGZvciBnaXZlbiBlbGVtZW50IG9uIHRoZSBhY2NvcmRpb24gdGl0bGUgYW5kIGJvZHlcclxuICAgKlxyXG4gICAqIEBwYXJhbSAge29iamVjdH0gZWxlbWVudCAtIFRoZSBET00gZWxlbWVudCB3ZSB3YW50IHRvIHNldCBhdHRyaWJ1dGVzIGZvclxyXG4gICAqIEBwYXJhbSAge29iamVjdH0gdGFyZ2V0ICAtIFRoZSBET00gZWxlbWVudCB3ZSB3YW50IHRvIHNldCBhdHRyaWJ1dGVzIGZvclxyXG4gICAqIEBwYXJhbSAge3N0cmluZ30gc3RhdGUgICAtIFRoZSBET00gZWxlbWVudCB3ZSB3YW50IHRvIHNldCBhdHRyaWJ1dGVzIGZvclxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHNldEFyaWFSb2xlcyhlbGVtZW50LCB0YXJnZXQsIHN0YXRlKSB7XHJcblxyXG4gICAgaWYgKHN0YXRlID09PSAnY2xvc2luZycpIHtcclxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFBSSVZBVEVcclxuICAgKiBJRTggY29tcGF0aWJsZSBmdW5jdGlvbiBmb3IgcmVwbGFjaW5nIGNsYXNzZXMgb24gYSBET00gbm9kZVxyXG4gICAqXHJcbiAgICogQHBhcmFtICB7b2JqZWN0fSBlbGVtZW50ICAgICAgLSBUaGUgRE9NIGVsZW1lbnQgd2Ugd2FudCB0byB0b2dnbGUgY2xhc3NlcyBvblxyXG4gICAqIEBwYXJhbSAge29iamVjdH0gdGFyZ2V0ICAgICAgIC0gVGhlIERPTSBlbGVtZW50IHdlIHdhbnQgdG8gdG9nZ2xlIGNsYXNzZXMgb25cclxuICAgKiBAcGFyYW0gIHtvYmplY3R9IHN0YXRlICAgICAgICAtIFRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBhbmltYXRpb24gb24gdGhlIGVsZW1lbnRcclxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IG9wZW5pbmdDbGFzcyAtIFRoZSBmaXJzdENsYXNzIHlvdSB3YW50IHRvIHRvZ2dsZSBvbiB0aGUgRE9NIG5vZGVcclxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IGNsb3NpbmdDbGFzcyAtIFRoZSBzZWNvbmRDbGFzcyB5b3Ugd2FudCB0byB0b2dnbGUgb24gdGhlIERPTSBub2RlXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gdG9nZ2xlQ2xhc3NlcyhlbGVtZW50LCBzdGF0ZSwgb3BlbmluZ0NsYXNzLCBjbG9zaW5nQ2xhc3MpIHtcclxuXHJcbiAgICBpZiAoc3RhdGUgPT09ICdvcGVuaW5nJyB8fCBzdGF0ZSA9PT0gJ29wZW4nKSB7XHJcbiAgICAgIHZhciBvbGRDbGFzcyA9IG9wZW5pbmdDbGFzcyB8fCAnYXUtYWNjb3JkaW9uLS1jbG9zZWQnO1xyXG4gICAgICB2YXIgbmV3Q2xhc3MgPSBjbG9zaW5nQ2xhc3MgfHwgJ2F1LWFjY29yZGlvbi0tb3Blbic7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgb2xkQ2xhc3MgPSBjbG9zaW5nQ2xhc3MgfHwgJ2F1LWFjY29yZGlvbi0tb3Blbic7XHJcbiAgICAgIHZhciBuZXdDbGFzcyA9IG9wZW5pbmdDbGFzcyB8fCAnYXUtYWNjb3JkaW9uLS1jbG9zZWQnO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIG9sZENsYXNzKTtcclxuICAgIGFkZENsYXNzKGVsZW1lbnQsIG5ld0NsYXNzKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBQUklWQVRFXHJcbiAgICogSUU4IGNvbXBhdGlibGUgZnVuY3Rpb24gZm9yIHJlbW92aW5nIGEgY2xhc3NcclxuICAgKlxyXG4gICAqIEBwYXJhbSAge29iamVjdH0gZWxlbWVudCAgIC0gVGhlIERPTSBlbGVtZW50IHdlIHdhbnQgdG8gbWFuaXB1bGF0ZVxyXG4gICAqIEBwYXJhbSAge29iamVjdH0gY2xhc3NOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNsYXNzIHRvIGJlIHJlbW92ZWRcclxuICAgKi9cclxuICBmdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xyXG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKFwiKF58XFxcXGIpXCIgKyBjbGFzc05hbWUuc3BsaXQoXCIgXCIpLmpvaW4oXCJ8XCIpICsgXCIoXFxcXGJ8JClcIiwgXCJnaVwiKSwgXCIgXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFBSSVZBVEVcclxuICAgKiBJRTggY29tcGF0aWJsZSBmdW5jdGlvbiBmb3IgYWRkaW5nIGEgY2xhc3NcclxuICAgKlxyXG4gICAqIEBwYXJhbSAge29iamVjdH0gZWxlbWVudCAgIC0gVGhlIERPTSBlbGVtZW50IHdlIHdhbnQgdG8gbWFuaXB1bGF0ZVxyXG4gICAqIEBwYXJhbSAge29iamVjdH0gY2xhc3NOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNsYXNzIHRvIGJlIGFkZGVkXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcclxuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lICsgXCIgXCIgKyBjbGFzc05hbWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFBVQkxJQyBGVU5DVElPTlNcclxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlIGFuIGFjY29yZGlvbiBlbGVtZW50XHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBlbGVtZW50cyAgLSBUaGUgRE9NIG5vZGUvcyB0byB0b2dnbGVcclxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBzcGVlZCAgICAgLSBUaGUgc3BlZWQgaW4gbXMgZm9yIHRoZSBhbmltYXRpb25cclxuICAgKiBAcGFyYW0gIHtvYmplY3R9ICBjYWxsYmFja3MgLSBBbiBvYmplY3Qgb2YgZm91ciBvcHRpb25hbCBjYWxsYmFja3M6IHsgb25PcGVuLCBhZnRlck9wZW4sIG9uQ2xvc2UsIGFmdGVyQ2xvc2UgfVxyXG4gICAqXHJcbiAgICovXHJcbiAgYWNjb3JkaW9uLlRvZ2dsZSA9IGZ1bmN0aW9uIChlbGVtZW50cywgc3BlZWQsIGNhbGxiYWNrcykge1xyXG5cclxuICAgIC8vIHN0b3AgZXZlbnQgcHJvcGFnYXRpb25cclxuICAgIHRyeSB7XHJcbiAgICAgIHdpbmRvdy5ldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7IH1cclxuXHJcbiAgICAvLyBtYWtpbmcgc3VyZSB3ZSBjYW4gaXRlcmF0ZSBvdmVyIGp1c3Qgb25lIERPTSBlbGVtZW50XHJcbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgZWxlbWVudHMgPSBbZWxlbWVudHNdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWNrIHRoaXMgb25jZVxyXG4gICAgaWYgKHR5cGVvZiBjYWxsYmFja3MgIT0gJ29iamVjdCcpIHtcclxuICAgICAgY2FsbGJhY2tzID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgdmFyIGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcclxuICAgICAgdmFyIHRhcmdldElkID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcclxuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldElkKTtcclxuXHJcbiAgICAgIGlmICh0YXJnZXQgPT0gbnVsbCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICdBVS5hY2NvcmRpb24uVG9nZ2xlIGNhbm5vdCBmaW5kIHRoZSB0YXJnZXQgdG8gYmUgdG9nZ2xlZCBmcm9tIGluc2lkZSBhcmlhLWNvbnRyb2xzLlxcbicgK1xyXG4gICAgICAgICAgJ01ha2Ugc3VyZSB0aGUgZmlyc3QgYXJndW1lbnQgeW91IGdpdmUgQVUuYWNjb3JkaW9uLlRvZ2dsZSBpcyB0aGUgRE9NIGVsZW1lbnQgKGEgYnV0dG9uIG9yIGEgbGluaykgdGhhdCBoYXMgYW4gYXJpYS1jb250cm9scyBhdHRyaWJ1dGUgdGhhdCBwb2ludHMgJyArXHJcbiAgICAgICAgICAndG8gYSBkaXYgdGhhdCB5b3Ugd2FudCB0byB0b2dnbGUuJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHJcbiAgICAgIChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgIEFVLmFuaW1hdGUuVG9nZ2xlKHtcclxuICAgICAgICAgIGVsZW1lbnQ6IHRhcmdldCxcclxuICAgICAgICAgIHByb3BlcnR5OiAnaGVpZ2h0JyxcclxuICAgICAgICAgIHNwZWVkOiBzcGVlZCB8fCAyNTAsXHJcbiAgICAgICAgICBwcmVmdW5jdGlvbjogZnVuY3Rpb24gKHRhcmdldCwgc3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKHN0YXRlID09PSAnb3BlbmluZycpIHtcclxuICAgICAgICAgICAgICB0YXJnZXQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblxyXG4gICAgICAgICAgICAgIC8vIHJ1biB3aGVuIG9wZW5pbmdcclxuICAgICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrcy5vbk9wZW4gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbk9wZW4oKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgLy8gcnVuIHdoZW4gY2xvc2luZ1xyXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2tzLm9uQ2xvc2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZXRBcmlhUm9sZXMoZWxlbWVudCwgdGFyZ2V0LCBzdGF0ZSk7XHJcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzZXMoZWxlbWVudCwgc3RhdGUpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHBvc3RmdW5jdGlvbjogZnVuY3Rpb24gKHRhcmdldCwgc3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKHN0YXRlID09PSAnY2xvc2VkJykge1xyXG4gICAgICAgICAgICAgIC8vIHJ1biBhZnRlciBjbG9zaW5nXHJcbiAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnJztcclxuICAgICAgICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gJyc7XHJcblxyXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2tzLmFmdGVyQ2xvc2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5hZnRlckNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vIHJ1biBhZnRlciBvcGVuaW5nXHJcbiAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnJztcclxuICAgICAgICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gJyc7XHJcblxyXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2tzLmFmdGVyT3BlbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLmFmdGVyT3BlbigpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdG9nZ2xlQ2xhc3Nlcyh0YXJnZXQsIHN0YXRlKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pKGVsZW1lbnQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIE9wZW4gYSBncm91cCBvZiBhY2NvcmRpb24gZWxlbWVudHNcclxuICAgKlxyXG4gICAqIEBwYXJhbSAge3N0cmluZ30gIGVsZW1lbnRzIC0gVGhlIERPTSBub2RlL3MgdG8gdG9nZ2xlXHJcbiAgICogQHBhcmFtICB7aW50ZWdlcn0gc3BlZWQgICAgLSBUaGUgc3BlZWQgaW4gbXMgZm9yIHRoZSBhbmltYXRpb25cclxuICAgKlxyXG4gICAqL1xyXG4gIGFjY29yZGlvbi5PcGVuID0gZnVuY3Rpb24gKGVsZW1lbnRzLCBzcGVlZCkge1xyXG5cclxuICAgIC8vIHN0b3AgZXZlbnQgcHJvcGFnYXRpb25cclxuICAgIHRyeSB7XHJcbiAgICAgIHdpbmRvdy5ldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7IH1cclxuXHJcbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgZWxlbWVudHMgPSBbZWxlbWVudHNdO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIHZhciBlbGVtZW50ID0gZWxlbWVudHNbaV07XHJcbiAgICAgIHZhciB0YXJnZXRJZCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XHJcbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCk7XHJcblxyXG4gICAgICAvLyBsZXTigJlzIGZpbmQgb3V0IGlmIHRoaXMgYWNjb3JkaW9uIGlzIHN0aWxsIGNsb3NlZFxyXG4gICAgICB2YXIgaGVpZ2h0ID0gMDtcclxuICAgICAgaWYgKHR5cGVvZiBnZXRDb21wdXRlZFN0eWxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGhlaWdodCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhcmdldCkuaGVpZ2h0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhlaWdodCA9IHRhcmdldC5jdXJyZW50U3R5bGUuaGVpZ2h0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFyc2VJbnQoaGVpZ2h0KSA9PT0gMCkge1xyXG4gICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAnMHB4JztcclxuICAgICAgfVxyXG5cclxuICAgICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnJztcclxuICAgICAgdG9nZ2xlQ2xhc3Nlcyh0YXJnZXQsICdvcGVuaW5nJyk7XHJcbiAgICAgIHRvZ2dsZUNsYXNzZXMoZWxlbWVudCwgJ29wZW5pbmcnKTtcclxuICAgICAgc2V0QXJpYVJvbGVzKGVsZW1lbnQsIHRhcmdldCwgJ29wZW5pbmcnKTtcclxuXHJcbiAgICAgIChmdW5jdGlvbiAodGFyZ2V0LCBzcGVlZCwgZWxlbWVudCkge1xyXG4gICAgICAgIEFVLmFuaW1hdGUuUnVuKHtcclxuICAgICAgICAgIGVsZW1lbnQ6IHRhcmdldCxcclxuICAgICAgICAgIHByb3BlcnR5OiAnaGVpZ2h0JyxcclxuICAgICAgICAgIGVuZFNpemU6ICdhdXRvJyxcclxuICAgICAgICAgIHNwZWVkOiBzcGVlZCB8fCAyNTAsXHJcbiAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0b2dnbGVDbGFzc2VzKGVsZW1lbnQsICdvcGVuaW5nJyk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KSh0YXJnZXQsIHNwZWVkLCBlbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2UgYSBncm91cCBvZiBhY2NvcmRpb24gZWxlbWVudHNcclxuICAgKlxyXG4gICAqIEBwYXJhbSAge3N0cmluZ30gIGVsZW1lbnRzIC0gVGhlIERPTSBub2RlL3MgdG8gdG9nZ2xlXHJcbiAgICogQHBhcmFtICB7aW50ZWdlcn0gc3BlZWQgICAgLSBUaGUgc3BlZWQgaW4gbXMgZm9yIHRoZSBhbmltYXRpb25cclxuICAgKlxyXG4gICAqL1xyXG4gIGFjY29yZGlvbi5DbG9zZSA9IGZ1bmN0aW9uIChlbGVtZW50cywgc3BlZWQpIHtcclxuXHJcbiAgICAvLyBzdG9wIGV2ZW50IHByb3BhZ2F0aW9uXHJcbiAgICB0cnkge1xyXG4gICAgICB3aW5kb3cuZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikgeyB9XHJcblxyXG4gICAgaWYgKGVsZW1lbnRzLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGVsZW1lbnRzID0gW2VsZW1lbnRzXTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xyXG4gICAgICB2YXIgdGFyZ2V0SWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xyXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpO1xyXG5cclxuICAgICAgdG9nZ2xlQ2xhc3NlcyhlbGVtZW50LCAnY2xvc2luZycpO1xyXG4gICAgICBzZXRBcmlhUm9sZXMoZWxlbWVudCwgdGFyZ2V0LCAnY2xvc2luZycpO1xyXG5cclxuICAgICAgKGZ1bmN0aW9uICh0YXJnZXQsIHNwZWVkKSB7XHJcbiAgICAgICAgQVUuYW5pbWF0ZS5SdW4oe1xyXG4gICAgICAgICAgZWxlbWVudDogdGFyZ2V0LFxyXG4gICAgICAgICAgcHJvcGVydHk6ICdoZWlnaHQnLFxyXG4gICAgICAgICAgZW5kU2l6ZTogMCxcclxuICAgICAgICAgIHNwZWVkOiBzcGVlZCB8fCAyNTAsXHJcbiAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgICAgICAgICB0b2dnbGVDbGFzc2VzKHRhcmdldCwgJ2Nsb3NlJyk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KSh0YXJnZXQsIHNwZWVkKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgQVUuYWNjb3JkaW9uID0gYWNjb3JkaW9uO1xyXG5cclxufShBVSkpO1xyXG5cclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gIG1vZHVsZS5leHBvcnRzID0gQVU7XHJcbn1cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcclxuICAkKFwiLmFjY29yZGlvblwiKS5vbihcImNsaWNrXCIsIFwiLmFjY29yZGlvbi1idXR0b25cIiwgZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcyhcInJvdGF0ZS05MFwiKSkge1xyXG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwicm90YXRlLTkwXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcInJvdGF0ZS05MFwiKTtcclxuICAgIH1cclxuXHJcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCIuYWNjb3JkaW9uLWNvbnRlbnRcIikudG9nZ2xlKCk7XHJcbiAgfSk7XHJcblxyXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCJhXCIsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICBpZiAoISh0eXBlb2YgJCh0aGlzKS5hdHRyKFwiZGlzYWJsZWRcIikgIT09IHVuZGVmaW5lZCAmJiAkKHRoaXMpLmF0dHIoXCJkaXNhYmxlZFwiKSAhPT0gXCJkaXNhYmxlZFwiICYmICQodGhpcykuYXR0cihcImRpc2FibGVkXCIpICE9PSBcIlwiKSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICB9KVxyXG59KSJdLCJmaWxlIjoibWFpbi5qcyJ9
