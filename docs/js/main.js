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

// today's date available everywhere 
var today = moment().format('D MMMM YYYY');
$(".pt-date-today").html(today);


jQuery(document).ready(function ($) {
  // Help slide gesture
  let panels = $('.panel');
  panels.map((index, panel) => {
    let panelContainer = $(panel).find('.panel-container');
    let panelHeader = $(panel).find('.panel-header');
    let originX = 0;
    let lastX = 0;
    let dragging = false;
    let uiBunch = panelContainer.add(panelHeader);
    uiBunch.on('mousedown touchstart', (event) => {
      if (!dragging && !$(event.target).is('.panel-close')) {
        dragging = true;
        originX = event.screenX || event.targetTouches[0].screenX;
        lastX = originX;
      }
    });
    uiBunch.on('mousemove touchmove', (event) => {
      if (dragging) {
        lastX = (event.screenX || event.targetTouches[0].screenX);
        let newX = lastX - originX;
        if (newX >= 0)
          uiBunch.css({
            right: -newX + 'px'
          });
      }
    });
    uiBunch.on('mouseup touchend', (event) => {
      if (dragging && !$(event.target).is('.panel-close')) {
        dragging = false;
        let newX = (event.screenX || lastX) - originX;
        if (newX > (panelContainer[0].offsetWidth * 0.25)) {
          $(panel).removeClass('is-visible').addClass('swipe-closing');
          window.setTimeout(() => {
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
          window.setTimeout(() => {
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
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector
  }

  //closest pollyfill
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      var el = this
      if (!document.documentElement.contains(el)) return null
      do {
        if (el.matches(s)) return el
        el = el.parentElement || el.parentNode
      } while (el !== null && el.nodeType === 1)
      return null
    }
  }


  // Tooltip
  function getOffsetDocumentTop(pElement) {
    return document.documentElement.scrollTop + pElement.getBoundingClientRect().top
  }

  function registerTooltip(pElement) {

    const ROOT_ELEMENT_CLASS = 'tooltip'
    const TAB_CLASS = `${ROOT_ELEMENT_CLASS}__tab`

    const ARIA_HIDDEN_ATTR = 'aria-hidden'
    const ARIA_EXPANDED_ATTR = 'aria-expanded'

    const control = pElement
    const rootElement = control.closest(`.${ROOT_ELEMENT_CLASS}`)
    const content = rootElement.getElementsByClassName(`${ROOT_ELEMENT_CLASS}__content`)[0]
    const tab = rootElement.getElementsByClassName(TAB_CLASS)[0]
    const message = rootElement.getElementsByClassName(`${ROOT_ELEMENT_CLASS}__message`)[0]
    const close = rootElement.getElementsByClassName(`${ROOT_ELEMENT_CLASS}__close`)[0]

    const tabOriginalClassName = tab.className

    function showTooltip() {
      const cloak = document.createElement('div')
      cloak.style.cssText = 'height: 0; overflow: hidden; position: relative;'
      content.parentNode.insertBefore(cloak, content)
      cloak.appendChild(content)

      content.setAttribute(ARIA_HIDDEN_ATTR, false)

      document.removeEventListener('click', clickOutHandler)

      setTimeout(() => {
        cloak.parentNode.appendChild(content)
        cloak.parentNode.removeChild(cloak)

        control.setAttribute(ARIA_EXPANDED_ATTR, true)

        const className = `${tabOriginalClassName} ${TAB_CLASS}--active`

        if (content.clientHeight > (content.scrollTop + content.getBoundingClientRect().top)) {
          console.log('adding tooltip__tab--bottom');
          tab.className = `${className} ${TAB_CLASS}--bottom`
          content.style.top = `${control.offsetTop + tab.clientHeight + tab.offsetTop + tab.offsetHeight}px`
        } else {
          console.log('adding tooltip__tab--top');
          tab.className = `${className} ${TAB_CLASS}--top`
          content.style.top = `${control.offsetTop - content.clientHeight + tab.offsetTop}px`
        }

        document.addEventListener('keyup', escapeHandler)
        document.addEventListener('click', clickOutHandler)

        content.focus()
      }, 0)
    }

    function hideTooltip() {
      content.setAttribute(ARIA_HIDDEN_ATTR, true)
      control.setAttribute(ARIA_EXPANDED_ATTR, false)

      tab.className = tabOriginalClassName;

      document.removeEventListener('keyup', escapeHandler)
      document.removeEventListener('click', clickOutHandler)
    }

    function closeTooltip() {
      hideTooltip()
      control.focus()
    }

    function escapeHandler(pEvent) {
      if (event.key !== 'Escape') {
        return
      }

      if (content.contains(pEvent.target)) {
        closeTooltip()
      } else {
        hideTooltip()
      }
    }

    function clickOutHandler(pEvent) {
      if (!content.contains(pEvent.target)) {
        hideTooltip()
      }
    }

    control.addEventListener('click', showTooltip)
    control.addEventListener('keypress', (pEvent) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        showTooltip()
      }
    })

    close.addEventListener('click', closeTooltip)
    close.addEventListener('keypress', (pEvent) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        closeTooltip()
      }
    })

  }

  [].forEach.call(document.getElementsByClassName('tooltip__control'), pElement => registerTooltip(pElement))

  // Three state check boxes 
  $(".mys-radio__control").click(function (ev) {
    let siblings = $(this).closest(".mys-radio-group").find(".mys-radio__box");
    let thisBox = $(this).next(".mys-radio__box");
    $(siblings).removeClass('mys-radio__box--not-selected');
    $(siblings).not(thisBox).addClass('mys-radio__box--not-selected');
  });

  $(".mys-radio-group").mouseover(function (ev) {
    let checkedBox = $(this).find("input:checked").next(".mys-radio__box");
    if (checkedBox.length !== 0) {
      let siblings = $(this).find(".mys-radio__box");
      let checkedBox = $(this).next(".mys-radio__box");
      $(siblings).removeClass('mys-radio__box--not-selected');
    }
  });

  $(".mys-radio-group").mouseleave(function (ev) {
    let checkedBox = $(this).find("input:checked").next(".mys-radio__box");
    if (checkedBox.length !== 0) {
      let siblings = $(this).find(".mys-radio__box");
      $(siblings).removeClass('mys-radio__box--not-selected');
      $(siblings).not(checkedBox).addClass('mys-radio__box--not-selected');
    }
  });

  var claimType = getUrlParameter('claimType');

  if (claimType) {
    localStorage.setItem('claimType', claimType);
  }


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
    event.stopPropagation();
  });

  $(".switch-account-box__link").click(function (ev) {
    event.stopPropagation();
  });
});






// PoC file upload for prototype
// TODO:: handle cancel 
// TODO:: add additional items 

(function (document, window, index) {
  // var inputs = document.querySelectorAll('.file-upload__input');
  // if (!inputs) {
  var inputs = document.querySelectorAll('.file-upload-default__input');
  // }

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

        category.outerHTML = '<label>' + categoryName + '</label>';

        // label.querySelector('.file-upload-default__file-name').innerHTML = fileName;
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
    });

    // Firefox bug fix
    // input.addEventListener('focus', function () { input.classList.add('has-focus'); });
    // input.addEventListener('blur', function () { input.classList.remove('has-focus'); });
  });
}(document, window, 0));



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
  var animate = {}


  //--------------------------------------------------------------------------------------------------------------------------------------------------------------
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
        intervalTime: 0,
      };
    }

    var distance = endSize - initialSize; // the overall distance the animation needs to travel
    var intervalTime = (speed / distance); // the time each setInterval iteration will take
    var stepSize = distance < 0 ? -1 : 1; // if distance is negative then we set stepSize to -1
    var steps = Math.abs(distance / stepSize); // the amount of steps required to get to endSize
    intervalTime = speed / steps;

    // we need to adjust our animation specs if interval time exceeds 60FPS eg intervalTime < 16.67ms
    if (Math.abs(intervalTime) < (1000 / 60)) {
      intervalTime = (1000 / 60); // let’s not get lower that 60FPS
      steps = Math.ceil(Math.abs(speed / intervalTime)); // we now need the steps and make sure we ceil them so -1 won't make them negative
      stepSize = distance / steps; // last thing is step sizes which are derived from all of the above
    }

    return {
      stepSize: stepSize,
      steps: (steps - 1),
      intervalTime: intervalTime,
    };
  }

  // export for node and babel environments
  if (typeof module !== 'undefined') {
    animate.CalculateAnimationSpecs = CalculateAnimationSpecs;
  }


  //--------------------------------------------------------------------------------------------------------------------------------------------------------------
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
    var speed = options.speed || 250;

    // making a single DOM element iteratable
    if (elements.length === undefined) {
      elements = [elements];
    }

    // making a callback if none was provided
    if (typeof options.callback !== 'function') {
      options.callback = function () { };
    }

    // adding iteration counts
    elements[0].AUinteration = 0;
    elements[0].AUinterations = elements.length;

    // iterate over all DOM nodes
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i]; // this element
      AU.animate.Stop(element); // stop any previous animations
      var initialSize = parseInt(AU.animate.GetCSSPropertyBecauseIE(element, options.property)); // the elements current size
      var endSize = options.endSize; // the element end size

      if (options.endSize === 'auto') { // calculate what 'auto' means in pixel
        endSize = AU.animate.CalculateAuto(element, options.property);
      }

      // calculate our animation specs
      var animationSpecs = CalculateAnimationSpecs(initialSize, endSize, speed);
      var iterateCounter = initialSize;

      // set state
      if (animationSpecs.stepSize < 0) {
        element.AUtoggleState = 'closing';
      } else if (animationSpecs.stepSize > 0) {
        element.AUtoggleState = 'opening';
      }

      // scoping variable
      (function (element, initialSize, iterateCounter, animationSpecs, endSize) {
        // keep track of animation by adding it to the DOM element
        element.AUanimation = setInterval(function () {

          // when we are at the end
          if (initialSize === endSize || animationSpecs.steps === 0) {
            AU.animate.Stop(element);

            element.style[options.property] = endSize + 'px'; // set to endSize
            element.AUtoggleState = '';

            elements[0].AUinteration++;

            // removing auto so CSS can take over
            if (options.endSize === 'auto') {
              element.style[options.property] = '';
            }

            // when all iterations have finished, run the callback
            if (elements[0].AUinteration >= elements[0].AUinterations) {
              return options.callback();
            }
          }

          // if we are still animating
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
    var openSize = options.openSize === undefined ? 'auto' : options.openSize;

    // making a single DOM element iteratable
    if (elements.length === undefined) {
      elements = [elements];
    }

    // making a prefunction if none was provided
    if (typeof options.prefunction !== 'function') {
      options.prefunction = function () { };
    }

    // making a postfunction if none was provided
    if (typeof options.postfunction !== 'function') {
      options.postfunction = function () { };
    }

    // making a callback if none was provided
    if (typeof options.callback !== 'function') {
      options.callback = function () { };
    }

    // adding iteration counts
    elements[0].AUtoggleInteration = 0;
    elements[0].AUtoggleInterations = elements.length;

    // iterate over all DOM nodes
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
      }

      // run prefunction once per element
      options.prefunction(element, preState);

      // shoot off animation
      AU.animate.Run({
        element: element,
        endSize: targetSize,
        property: property,
        speed: speed,
        callback: function () { // making sure we fire the callback only once
          elements[0].AUtoggleInteration++;

          if (elements[0].AUtoggleInteration === elements[0].AUinterations) {
            var returnParam = options.callback(element, postState);

            // run postfunction once per element
            options.postfunction(element, postState);

            return returnParam;
          }

          // run postfunction once per element
          options.postfunction(element, postState);
        },
      });

    }
  };


  AU.animate = animate;

}(AU));


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
  var accordion = {}


  //--------------------------------------------------------------------------------------------------------------------------------------------------------------
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
  }


  //--------------------------------------------------------------------------------------------------------------------------------------------------------------
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
    } catch (error) { }

    // making sure we can iterate over just one DOM element
    if (elements.length === undefined) {
      elements = [elements];
    }

    // check this once
    if (typeof callbacks != 'object') {
      callbacks = {};
    }

    for (var i = 0; i < elements.length; i++) {

      var element = elements[i];
      var targetId = element.getAttribute('aria-controls');
      var target = document.getElementById(targetId);

      if (target == null) {
        throw new Error(
          'AU.accordion.Toggle cannot find the target to be toggled from inside aria-controls.\n' +
          'Make sure the first argument you give AU.accordion.Toggle is the DOM element (a button or a link) that has an aria-controls attribute that points ' +
          'to a div that you want to toggle.'
        );
      }

      target.style.display = 'block';

      (function (element) {
        AU.animate.Toggle({
          element: target,
          property: 'height',
          speed: speed || 250,
          prefunction: function (target, state) {
            if (state === 'opening') {
              target.style.display = 'block';

              // run when opening
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
          postfunction: function (target, state) {
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
          },
        });
      })(element);

    }

    return false;

  }


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
    } catch (error) { }

    if (elements.length === undefined) {
      elements = [elements];
    }

    for (var i = 0; i < elements.length; i++) {

      var element = elements[i];
      var targetId = element.getAttribute('aria-controls');
      var target = document.getElementById(targetId);

      // let’s find out if this accordion is still closed
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
          callback: function () {
            toggleClasses(element, 'opening');
          },
        });
      })(target, speed, element);
    }

  }


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
    } catch (error) { }

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
          callback: function () {
            target.style.display = '';
            toggleClasses(target, 'close');
          },
        });
      })(target, speed);
    }

  }


  AU.accordion = accordion;

}(AU));


if (typeof module !== 'undefined') {
  module.exports = AU;
}

$(document).ready(() => {
  $(".accordion").on("click", ".accordion-button", function() {
    if ($(this).hasClass("rotate-90")) {
      $(this).removeClass("rotate-90");
    } else {
      $(this).addClass("rotate-90");
    }

    $(this).parent().find(".accordion-content").toggle();
  });

  $(document).on("click", "a", function(e) {

    if (!(typeof $(this).attr("disabled") !== undefined && $(this).attr("disabled") !== "disabled" && $(this).attr("disabled") !== "")) {
      e.preventDefault();
      return false
    }

  })
})

$(document).ready(function() {
  $(".dva-phone").replaceWith(`<a href="tel:1800555254">1800 555 254</a>`);
})

document.addEventListener('swiped-right', function (e) {
  $('#state-switcher').toggle();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBnZXRVcmxQYXJhbWV0ZXIgPSBmdW5jdGlvbiBnZXRVcmxQYXJhbWV0ZXIoc1BhcmFtKSB7XG4gIHZhciBzUGFnZVVSTCA9IGRlY29kZVVSSUNvbXBvbmVudCh3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKSksXG4gICAgc1VSTFZhcmlhYmxlcyA9IHNQYWdlVVJMLnNwbGl0KCcmJyksXG4gICAgc1BhcmFtZXRlck5hbWUsXG4gICAgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgc1VSTFZhcmlhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgIHNQYXJhbWV0ZXJOYW1lID0gc1VSTFZhcmlhYmxlc1tpXS5zcGxpdCgnPScpO1xuXG4gICAgaWYgKHNQYXJhbWV0ZXJOYW1lWzBdID09PSBzUGFyYW0pIHtcbiAgICAgIHJldHVybiBzUGFyYW1ldGVyTmFtZVsxXSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHNQYXJhbWV0ZXJOYW1lWzFdO1xuICAgIH1cbiAgfVxufTtcblxuLy8gdG9kYXkncyBkYXRlIGF2YWlsYWJsZSBldmVyeXdoZXJlIFxudmFyIHRvZGF5ID0gbW9tZW50KCkuZm9ybWF0KCdEIE1NTU0gWVlZWScpO1xuJChcIi5wdC1kYXRlLXRvZGF5XCIpLmh0bWwodG9kYXkpO1xuXG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCQpIHtcbiAgLy8gSGVscCBzbGlkZSBnZXN0dXJlXG4gIGxldCBwYW5lbHMgPSAkKCcucGFuZWwnKTtcbiAgcGFuZWxzLm1hcCgoaW5kZXgsIHBhbmVsKSA9PiB7XG4gICAgbGV0IHBhbmVsQ29udGFpbmVyID0gJChwYW5lbCkuZmluZCgnLnBhbmVsLWNvbnRhaW5lcicpO1xuICAgIGxldCBwYW5lbEhlYWRlciA9ICQocGFuZWwpLmZpbmQoJy5wYW5lbC1oZWFkZXInKTtcbiAgICBsZXQgb3JpZ2luWCA9IDA7XG4gICAgbGV0IGxhc3RYID0gMDtcbiAgICBsZXQgZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICBsZXQgdWlCdW5jaCA9IHBhbmVsQ29udGFpbmVyLmFkZChwYW5lbEhlYWRlcik7XG4gICAgdWlCdW5jaC5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmICghZHJhZ2dpbmcgJiYgISQoZXZlbnQudGFyZ2V0KS5pcygnLnBhbmVsLWNsb3NlJykpIHtcbiAgICAgICAgZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICBvcmlnaW5YID0gZXZlbnQuc2NyZWVuWCB8fCBldmVudC50YXJnZXRUb3VjaGVzWzBdLnNjcmVlblg7XG4gICAgICAgIGxhc3RYID0gb3JpZ2luWDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB1aUJ1bmNoLm9uKCdtb3VzZW1vdmUgdG91Y2htb3ZlJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgbGFzdFggPSAoZXZlbnQuc2NyZWVuWCB8fCBldmVudC50YXJnZXRUb3VjaGVzWzBdLnNjcmVlblgpO1xuICAgICAgICBsZXQgbmV3WCA9IGxhc3RYIC0gb3JpZ2luWDtcbiAgICAgICAgaWYgKG5ld1ggPj0gMClcbiAgICAgICAgICB1aUJ1bmNoLmNzcyh7XG4gICAgICAgICAgICByaWdodDogLW5ld1ggKyAncHgnXG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdWlCdW5jaC5vbignbW91c2V1cCB0b3VjaGVuZCcsIChldmVudCkgPT4ge1xuICAgICAgaWYgKGRyYWdnaW5nICYmICEkKGV2ZW50LnRhcmdldCkuaXMoJy5wYW5lbC1jbG9zZScpKSB7XG4gICAgICAgIGRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIGxldCBuZXdYID0gKGV2ZW50LnNjcmVlblggfHwgbGFzdFgpIC0gb3JpZ2luWDtcbiAgICAgICAgaWYgKG5ld1ggPiAocGFuZWxDb250YWluZXJbMF0ub2Zmc2V0V2lkdGggKiAwLjI1KSkge1xuICAgICAgICAgICQocGFuZWwpLnJlbW92ZUNsYXNzKCdpcy12aXNpYmxlJykuYWRkQ2xhc3MoJ3N3aXBlLWNsb3NpbmcnKTtcbiAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkKHBhbmVsKS5yZW1vdmVDbGFzcygnc3dpcGUtY2xvc2luZycpO1xuICAgICAgICAgICAgdWlCdW5jaC5jc3Moe1xuICAgICAgICAgICAgICByaWdodDogJydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sIDQwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdWlCdW5jaC5jc3Moe1xuICAgICAgICAgICAgcmlnaHQ6ICcwcHgnLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3JpZ2h0IDAuM3MnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdWlCdW5jaC5jc3Moe1xuICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuXG4gIC8vIFRvYXN0IG1vY2t1cFxuICAkKFwiLmNhbGwtdG9hc3RcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJhbmRvbVdUb2FzdFR5cGVzID0gW1wic3VjY2Vzc1wiLCBcImluZm9ybWF0aW9uXCIsIFwiYWxlcnRcIiwgXCJlcnJvclwiXTtcbiAgICB2YXIgcmFuZG9tV29yZHMgPSBbXCJpbmsgRmFpcnkgQXJtYWRpbGxvXCIsIFwiT2thcGlcIiwgXCJHbGF1Y3VzIEF0bGFudGljdXNcIiwgXCJUaGUgTWFuZWQgV29sZlwiLCBcIkZvc3NhXCIsIFwiSWd1YW5hXCJdO1xuXG4gICAgZnVuY3Rpb24gZ2V0UmFuZG9tQXJiaXRyYXJ5KG1heCkge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IobWF4KSk7XG4gICAgfVxuICAgIHZhciByYW5kSW50ID0gZ2V0UmFuZG9tQXJiaXRyYXJ5KDQpO1xuICAgIHZhciBhbmltYWwgPSByYW5kb21Xb3Jkc1tyYW5kSW50XTtcbiAgICB2YXIgdG9hc3RUeXBlID0gcmFuZG9tV1RvYXN0VHlwZXNbcmFuZEludF07XG5cbiAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuICAgIGRvY3VtZW50LmJvZHkuZm9jdXMoKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcblxuICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCk7XG5cbiAgICBqUXVlcnkoJy50b2FzdC1jb250YWluZXInKS5hcHBlbmQoJzxidXR0b24gY2xhc3M9XCJ1aWtpdC1idG4gdG9hc3RcIiByb2xlPVwiYWxlcnRcIiB0eXBlPVwiYnV0dG9uXCI+PGRpdiBjbGFzcz1cInRvYXN0X190eXBlIHRvYXN0X190eXBlLS0nICsgdG9hc3RUeXBlICsgJ1wiPjxzcGFuIGNsYXNzPVwic3JcIj4nICsgdG9hc3RUeXBlICsgJzwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVwidG9hc3RfX21lc3NhZ2VcIj48cD5Zb3UgYWRkZWQgYSAnICsgYW5pbWFsICsgJyBhdCAnICsgbm93ICsgJzwvcD48L2Rpdj48L2J1dHRvbj4nKTtcblxuICAgIGpRdWVyeShcIi50b2FzdC1jb250YWluZXJcIikuc2hvdygpO1xuICB9KTtcblxuICBqUXVlcnkoXCIudG9hc3QtY29udGFpbmVyXCIpLm9uKFwiY2xpY2tcIiwgXCJidXR0b25cIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgalF1ZXJ5KHRoaXMpLmhpZGUoKTtcbiAgfSk7XG5cblxuXG4gIC8vIG1hdGNoZXMgcG9sbHlmaWxsXG4gIGlmICghRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcykge1xuICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPSBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3JcbiAgfVxuXG4gIC8vY2xvc2VzdCBwb2xseWZpbGxcbiAgaWYgKCFFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0KSB7XG4gICAgRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCA9IGZ1bmN0aW9uIChzKSB7XG4gICAgICB2YXIgZWwgPSB0aGlzXG4gICAgICBpZiAoIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250YWlucyhlbCkpIHJldHVybiBudWxsXG4gICAgICBkbyB7XG4gICAgICAgIGlmIChlbC5tYXRjaGVzKHMpKSByZXR1cm4gZWxcbiAgICAgICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50IHx8IGVsLnBhcmVudE5vZGVcbiAgICAgIH0gd2hpbGUgKGVsICE9PSBudWxsICYmIGVsLm5vZGVUeXBlID09PSAxKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuXG4gIC8vIFRvb2x0aXBcbiAgZnVuY3Rpb24gZ2V0T2Zmc2V0RG9jdW1lbnRUb3AocEVsZW1lbnQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCArIHBFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcFxuICB9XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXJUb29sdGlwKHBFbGVtZW50KSB7XG5cbiAgICBjb25zdCBST09UX0VMRU1FTlRfQ0xBU1MgPSAndG9vbHRpcCdcbiAgICBjb25zdCBUQUJfQ0xBU1MgPSBgJHtST09UX0VMRU1FTlRfQ0xBU1N9X190YWJgXG5cbiAgICBjb25zdCBBUklBX0hJRERFTl9BVFRSID0gJ2FyaWEtaGlkZGVuJ1xuICAgIGNvbnN0IEFSSUFfRVhQQU5ERURfQVRUUiA9ICdhcmlhLWV4cGFuZGVkJ1xuXG4gICAgY29uc3QgY29udHJvbCA9IHBFbGVtZW50XG4gICAgY29uc3Qgcm9vdEVsZW1lbnQgPSBjb250cm9sLmNsb3Nlc3QoYC4ke1JPT1RfRUxFTUVOVF9DTEFTU31gKVxuICAgIGNvbnN0IGNvbnRlbnQgPSByb290RWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke1JPT1RfRUxFTUVOVF9DTEFTU31fX2NvbnRlbnRgKVswXVxuICAgIGNvbnN0IHRhYiA9IHJvb3RFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoVEFCX0NMQVNTKVswXVxuICAgIGNvbnN0IG1lc3NhZ2UgPSByb290RWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke1JPT1RfRUxFTUVOVF9DTEFTU31fX21lc3NhZ2VgKVswXVxuICAgIGNvbnN0IGNsb3NlID0gcm9vdEVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHtST09UX0VMRU1FTlRfQ0xBU1N9X19jbG9zZWApWzBdXG5cbiAgICBjb25zdCB0YWJPcmlnaW5hbENsYXNzTmFtZSA9IHRhYi5jbGFzc05hbWVcblxuICAgIGZ1bmN0aW9uIHNob3dUb29sdGlwKCkge1xuICAgICAgY29uc3QgY2xvYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgY2xvYWsuc3R5bGUuY3NzVGV4dCA9ICdoZWlnaHQ6IDA7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsnXG4gICAgICBjb250ZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNsb2FrLCBjb250ZW50KVxuICAgICAgY2xvYWsuYXBwZW5kQ2hpbGQoY29udGVudClcblxuICAgICAgY29udGVudC5zZXRBdHRyaWJ1dGUoQVJJQV9ISURERU5fQVRUUiwgZmFsc2UpXG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tPdXRIYW5kbGVyKVxuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY2xvYWsucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChjb250ZW50KVxuICAgICAgICBjbG9hay5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNsb2FrKVxuXG4gICAgICAgIGNvbnRyb2wuc2V0QXR0cmlidXRlKEFSSUFfRVhQQU5ERURfQVRUUiwgdHJ1ZSlcblxuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBgJHt0YWJPcmlnaW5hbENsYXNzTmFtZX0gJHtUQUJfQ0xBU1N9LS1hY3RpdmVgXG5cbiAgICAgICAgaWYgKGNvbnRlbnQuY2xpZW50SGVpZ2h0ID4gKGNvbnRlbnQuc2Nyb2xsVG9wICsgY29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2FkZGluZyB0b29sdGlwX190YWItLWJvdHRvbScpO1xuICAgICAgICAgIHRhYi5jbGFzc05hbWUgPSBgJHtjbGFzc05hbWV9ICR7VEFCX0NMQVNTfS0tYm90dG9tYFxuICAgICAgICAgIGNvbnRlbnQuc3R5bGUudG9wID0gYCR7Y29udHJvbC5vZmZzZXRUb3AgKyB0YWIuY2xpZW50SGVpZ2h0ICsgdGFiLm9mZnNldFRvcCArIHRhYi5vZmZzZXRIZWlnaHR9cHhgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2FkZGluZyB0b29sdGlwX190YWItLXRvcCcpO1xuICAgICAgICAgIHRhYi5jbGFzc05hbWUgPSBgJHtjbGFzc05hbWV9ICR7VEFCX0NMQVNTfS0tdG9wYFxuICAgICAgICAgIGNvbnRlbnQuc3R5bGUudG9wID0gYCR7Y29udHJvbC5vZmZzZXRUb3AgLSBjb250ZW50LmNsaWVudEhlaWdodCArIHRhYi5vZmZzZXRUb3B9cHhgXG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGVzY2FwZUhhbmRsZXIpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tPdXRIYW5kbGVyKVxuXG4gICAgICAgIGNvbnRlbnQuZm9jdXMoKVxuICAgICAgfSwgMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoaWRlVG9vbHRpcCgpIHtcbiAgICAgIGNvbnRlbnQuc2V0QXR0cmlidXRlKEFSSUFfSElEREVOX0FUVFIsIHRydWUpXG4gICAgICBjb250cm9sLnNldEF0dHJpYnV0ZShBUklBX0VYUEFOREVEX0FUVFIsIGZhbHNlKVxuXG4gICAgICB0YWIuY2xhc3NOYW1lID0gdGFiT3JpZ2luYWxDbGFzc05hbWU7XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXNjYXBlSGFuZGxlcilcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tPdXRIYW5kbGVyKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlVG9vbHRpcCgpIHtcbiAgICAgIGhpZGVUb29sdGlwKClcbiAgICAgIGNvbnRyb2wuZm9jdXMoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVzY2FwZUhhbmRsZXIocEV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSAnRXNjYXBlJykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGNvbnRlbnQuY29udGFpbnMocEV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgY2xvc2VUb29sdGlwKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhpZGVUb29sdGlwKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGlja091dEhhbmRsZXIocEV2ZW50KSB7XG4gICAgICBpZiAoIWNvbnRlbnQuY29udGFpbnMocEV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgaGlkZVRvb2x0aXAoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93VG9vbHRpcClcbiAgICBjb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKHBFdmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJyAnIHx8IGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIHNob3dUb29sdGlwKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVRvb2x0aXApXG4gICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAocEV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSAnICcgfHwgZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgY2xvc2VUb29sdGlwKClcbiAgICAgIH1cbiAgICB9KVxuXG4gIH1cblxuICBbXS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndG9vbHRpcF9fY29udHJvbCcpLCBwRWxlbWVudCA9PiByZWdpc3RlclRvb2x0aXAocEVsZW1lbnQpKVxuXG4gIC8vIFRocmVlIHN0YXRlIGNoZWNrIGJveGVzIFxuICAkKFwiLm15cy1yYWRpb19fY29udHJvbFwiKS5jbGljayhmdW5jdGlvbiAoZXYpIHtcbiAgICBsZXQgc2libGluZ3MgPSAkKHRoaXMpLmNsb3Nlc3QoXCIubXlzLXJhZGlvLWdyb3VwXCIpLmZpbmQoXCIubXlzLXJhZGlvX19ib3hcIik7XG4gICAgbGV0IHRoaXNCb3ggPSAkKHRoaXMpLm5leHQoXCIubXlzLXJhZGlvX19ib3hcIik7XG4gICAgJChzaWJsaW5ncykucmVtb3ZlQ2xhc3MoJ215cy1yYWRpb19fYm94LS1ub3Qtc2VsZWN0ZWQnKTtcbiAgICAkKHNpYmxpbmdzKS5ub3QodGhpc0JveCkuYWRkQ2xhc3MoJ215cy1yYWRpb19fYm94LS1ub3Qtc2VsZWN0ZWQnKTtcbiAgfSk7XG5cbiAgJChcIi5teXMtcmFkaW8tZ3JvdXBcIikubW91c2VvdmVyKGZ1bmN0aW9uIChldikge1xuICAgIGxldCBjaGVja2VkQm94ID0gJCh0aGlzKS5maW5kKFwiaW5wdXQ6Y2hlY2tlZFwiKS5uZXh0KFwiLm15cy1yYWRpb19fYm94XCIpO1xuICAgIGlmIChjaGVja2VkQm94Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgbGV0IHNpYmxpbmdzID0gJCh0aGlzKS5maW5kKFwiLm15cy1yYWRpb19fYm94XCIpO1xuICAgICAgbGV0IGNoZWNrZWRCb3ggPSAkKHRoaXMpLm5leHQoXCIubXlzLXJhZGlvX19ib3hcIik7XG4gICAgICAkKHNpYmxpbmdzKS5yZW1vdmVDbGFzcygnbXlzLXJhZGlvX19ib3gtLW5vdC1zZWxlY3RlZCcpO1xuICAgIH1cbiAgfSk7XG5cbiAgJChcIi5teXMtcmFkaW8tZ3JvdXBcIikubW91c2VsZWF2ZShmdW5jdGlvbiAoZXYpIHtcbiAgICBsZXQgY2hlY2tlZEJveCA9ICQodGhpcykuZmluZChcImlucHV0OmNoZWNrZWRcIikubmV4dChcIi5teXMtcmFkaW9fX2JveFwiKTtcbiAgICBpZiAoY2hlY2tlZEJveC5sZW5ndGggIT09IDApIHtcbiAgICAgIGxldCBzaWJsaW5ncyA9ICQodGhpcykuZmluZChcIi5teXMtcmFkaW9fX2JveFwiKTtcbiAgICAgICQoc2libGluZ3MpLnJlbW92ZUNsYXNzKCdteXMtcmFkaW9fX2JveC0tbm90LXNlbGVjdGVkJyk7XG4gICAgICAkKHNpYmxpbmdzKS5ub3QoY2hlY2tlZEJveCkuYWRkQ2xhc3MoJ215cy1yYWRpb19fYm94LS1ub3Qtc2VsZWN0ZWQnKTtcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBjbGFpbVR5cGUgPSBnZXRVcmxQYXJhbWV0ZXIoJ2NsYWltVHlwZScpO1xuXG4gIGlmIChjbGFpbVR5cGUpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2xhaW1UeXBlJywgY2xhaW1UeXBlKTtcbiAgfVxuXG5cbiAgLy8gU3dhcCB0ZXh0IG9uIHRvcCBwYW5lbCBhY2NvcmRpb24gYnV0dG9uXG4gIHZhciBvcGVuID0gZmFsc2U7XG4gIHZhciBpbml0aWFsQnV0dG9uVGV4dCA9ICQoXCIuYWNjb3JkaW9uLXRvcHBhbmVsLWJ0blwiKS5odG1sKCk7XG4gICQoXCIuYWNjb3JkaW9uLXRvcHBhbmVsLWJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cbiAgICAvLyBJIGRvbid0IHRoaW5rIHRoaXMgaXMgYSBnb29kIGlkZWFcbiAgICAvLyBjaGFuZ2UgdGhlIGJ1dHRvbiB0ZXh0XG4gICAgLy8gb3BlbiA9ICFvcGVuO1xuICAgIC8vIGlmIChvcGVuKSB7XG4gICAgLy8gICAkKFwiLmFjY29yZGlvbi10b3BwYW5lbC1idG5cIikuaHRtbChcIkNsb3NlXCIpO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICAkKFwiLmFjY29yZGlvbi10b3BwYW5lbC1idG5cIikuaHRtbChpbml0aWFsQnV0dG9uVGV4dCk7XG4gICAgLy8gfVxuXG4gICAgJCh0aGlzKS5jbG9zZXN0KCcudWlraXQtYWNjb3JkaW9uJykudG9nZ2xlQ2xhc3MoXCJhY2NvcmRpb24tY2xvc2VkXCIpO1xuICAgIC8vIGhpZGUgdGhlIHN3aXRjaCBhY2NvdW50IGJveFxuICAgICQodGhpcykuY2xvc2VzdCgnLmNvbnRhaW5lcicpLmZpbmQoXCIuc3dpdGNoLWFjY291bnQtYm94XCIpLmFkZENsYXNzKFwic3dpdGNoLWFjY291bnQtYm94LS1oaWRlXCIpO1xuICB9KTtcblxuICAvLyBzd2FwLWJveC11bi1oaWRlXG4gICQoXCIuc3dpdGNoLWFjY291bnQtYnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uIChldikge1xuICAgICQodGhpcykuY2xvc2VzdCgnLmNvbnRhaW5lcicpLmZpbmQoXCIuc3dpdGNoLWFjY291bnQtYm94XCIpLnRvZ2dsZUNsYXNzKFwic3dpdGNoLWFjY291bnQtYm94LS1oaWRlXCIpO1xuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoXCJzd2l0Y2gtYWNjb3VudC1idXR0b24tLW9wZW5cIik7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gICQoXCIuc3dpdGNoLWFjY291bnQtYm94X19saW5rXCIpLmNsaWNrKGZ1bmN0aW9uIChldikge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcbn0pO1xuXG5cblxuXG5cblxuLy8gUG9DIGZpbGUgdXBsb2FkIGZvciBwcm90b3R5cGVcbi8vIFRPRE86OiBoYW5kbGUgY2FuY2VsIFxuLy8gVE9ETzo6IGFkZCBhZGRpdGlvbmFsIGl0ZW1zIFxuXG4oZnVuY3Rpb24gKGRvY3VtZW50LCB3aW5kb3csIGluZGV4KSB7XG4gIC8vIHZhciBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmlsZS11cGxvYWRfX2lucHV0Jyk7XG4gIC8vIGlmICghaW5wdXRzKSB7XG4gIHZhciBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmlsZS11cGxvYWQtZGVmYXVsdF9faW5wdXQnKTtcbiAgLy8gfVxuXG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoaW5wdXRzLCBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICB2YXIgbGFiZWwgPSBpbnB1dC5uZXh0RWxlbWVudFNpYmxpbmcsXG4gICAgICBsYWJlbFZhbCA9IGxhYmVsLmlubmVySFRNTCxcbiAgICAgIGNhdGVnb3J5VHIgPSBpbnB1dC5jbG9zZXN0KFwidHJcIiksXG4gICAgICBjYXRlZ29yeSA9IGNhdGVnb3J5VHIucXVlcnlTZWxlY3Rvcignc2VsZWN0JyksXG4gICAgICBjYXRlZ29yeU5hbWUgPSAnJztcblxuICAgIGlmIChjYXRlZ29yeSkge1xuICAgICAgY2F0ZWdvcnkuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY2F0ZWdvcnlOYW1lID0gdGhpcy52YWx1ZTtcbiAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBmaWxlTmFtZSA9ICcnO1xuXG4gICAgICBmaWxlTmFtZSA9IGUudGFyZ2V0LnZhbHVlLnNwbGl0KCdcXFxcJykucG9wKCk7XG5cbiAgICAgIGlmIChmaWxlTmFtZSkge1xuXG4gICAgICAgIGNhdGVnb3J5Lm91dGVySFRNTCA9ICc8bGFiZWw+JyArIGNhdGVnb3J5TmFtZSArICc8L2xhYmVsPic7XG5cbiAgICAgICAgLy8gbGFiZWwucXVlcnlTZWxlY3RvcignLmZpbGUtdXBsb2FkLWRlZmF1bHRfX2ZpbGUtbmFtZScpLmlubmVySFRNTCA9IGZpbGVOYW1lO1xuICAgICAgICBjYXRlZ29yeVRyLnF1ZXJ5U2VsZWN0b3IoJy5maWxlLXVwbG9hZC1kZWZhdWx0X19maWxlLW5hbWUnKS5pbm5lckhUTUwgPSBmaWxlTmFtZTtcbiAgICAgICAgY2F0ZWdvcnlUci5xdWVyeVNlbGVjdG9yKCcuZmlsZS11cGxvYWQtZGVmYXVsdF9fZmlsZS1uYW1lJykuY2xhc3NMaXN0LmFkZCgnZmlsZS11cGxvYWQtZGVmYXVsdF9fZmlsZS1uYW1lLS11cGxvYWRlZCcpO1xuICAgICAgICBsYWJlbC5xdWVyeVNlbGVjdG9yKCcudWlraXQtYnRuJykuaW5uZXJIVE1MID0gJ1JlbW92ZSc7XG4gICAgICAgIGxhYmVsLnF1ZXJ5U2VsZWN0b3IoJy51aWtpdC1idG4nKS5jbGFzc0xpc3QuYWRkKCd1aWtpdC1idG4tLXRlcnRpYXJ5Jyk7XG5cbiAgICAgICAgJCgnLmZpbGUtdXBsb2FkLS1hZGQnKS5zaG93KCk7XG4gICAgICAgICQoJy5wdC11cGxvYWQtbGlzdC1vcHRpb25hbCcpLnNob3coKTtcblxuICAgICAgICB2YXIgc3RhdHVzID0gY2F0ZWdvcnlUci5xdWVyeVNlbGVjdG9yKCcuZmlsZS11cGxvYWQtZGVmYXVsdF9fZmlsZS1uYW1lJykuY2xvc2VzdCgndHInKTtcbiAgICAgICAgdmFyIGNhdGVnb3J5VHJDbGFzcyA9IGNhdGVnb3J5VHI7XG5cblxuICAgICAgICBzdGF0dXMgPSBzdGF0dXMucXVlcnlTZWxlY3RvcignLmZpbGUtc3RhdHVzJyk7XG4gICAgICAgIGlmIChzdGF0dXMpIHtcbiAgICAgICAgICBzdGF0dXMuaW5uZXJIVE1MID0gJ1JlbW92ZSc7XG4gICAgICAgICAgc3RhdHVzLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInNyXCI+IFVwbG9hZGVkPC9zcGFuPic7XG4gICAgICAgICAgc3RhdHVzID0gc3RhdHVzLmNsYXNzTGlzdDtcbiAgICAgICAgICBzdGF0dXMucmVtb3ZlKCdmaWxlLXN0YXR1cy0tcmVxdWlyZWQnKTtcbiAgICAgICAgICBzdGF0dXMuYWRkKCdmaWxlLXN0YXR1cy0tdXBsb2FkZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhdGVnb3J5VHJDbGFzcy5jbGFzc0xpc3QuYWRkKCdmaWxlLXVwbG9hZC1kZWZhdWx0X19yb3ctLXVwbG9hZGVkJyk7XG5cblxuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGxhYmVsLmlubmVySFRNTCA9IGxhYmVsVmFsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gRmlyZWZveCBidWcgZml4XG4gICAgLy8gaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBmdW5jdGlvbiAoKSB7IGlucHV0LmNsYXNzTGlzdC5hZGQoJ2hhcy1mb2N1cycpOyB9KTtcbiAgICAvLyBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgZnVuY3Rpb24gKCkgeyBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtZm9jdXMnKTsgfSk7XG4gIH0pO1xufShkb2N1bWVudCwgd2luZG93LCAwKSk7XG5cblxuXG4vKiEgQGdvdi5hdS9hbmltYXRlIHYxLjAuMTIgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqXG4gKiBBbmltYXRlIGZ1bmN0aW9uXG4gKlxuICogQSBmdW5jdGlvbiB0byBvcGVuLCBjbG9zZSBhbmQgdG9nZ2xlIHRoZSBkaXNwbGF5IG9mIHBhZ2UgZWxlbWVudHMuXG4gKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG52YXIgQVUgPSBBVSB8fCB7fTtcblxuKGZ1bmN0aW9uIChBVSkge1xuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gTkFNRVNQQUNFIE1PRFVMRVxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHZhciBhbmltYXRlID0ge31cblxuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gUFJJVkFURSBGVU5DVElPTlNcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvKipcbiAgICogUFJJVkFURVxuICAgKiBDYWxjdWxhdGUgdGhlIHJlcXVpcmVtZW50cyBmb3IgdGhlIGRlc2lyZWQgYW5pbWF0aW9uXG4gICAqXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IGluaXRpYWxTaXplIC0gVGhlIGluaXRpYWwgc2l6ZSBvZiB0aGUgZWxlbWVudCB0byBhbmltYXRlXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IGVuZFNpemUgICAgIC0gVGhlIHNpemUgdGhlIGVsZW1lbnQgYWZ0ZXIgdGhlIGFuaW1hdGlvbiBjb21wbGV0ZXNcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgc3BlZWQgICAgICAgLSBUaGUgc3BlZWQgb2YgdGhlIGFuaW1hdGlvbiBpbiBtc1xuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgICAgICAtIFJlcXVpcmVkIHN0ZXBzLCBzdGVwU2l6ZSBhbmQgaW50ZXJ2YWxUaW1lIGZvciB0aGUgYW5pbWF0aW9uXG4gICAqL1xuICBmdW5jdGlvbiBDYWxjdWxhdGVBbmltYXRpb25TcGVjcyhpbml0aWFsU2l6ZSwgZW5kU2l6ZSwgc3BlZWQpIHtcblxuICAgIGlmIChpbml0aWFsU2l6ZSA9PT0gZW5kU2l6ZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RlcFNpemU6IDAsXG4gICAgICAgIHN0ZXBzOiAwLFxuICAgICAgICBpbnRlcnZhbFRpbWU6IDAsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciBkaXN0YW5jZSA9IGVuZFNpemUgLSBpbml0aWFsU2l6ZTsgLy8gdGhlIG92ZXJhbGwgZGlzdGFuY2UgdGhlIGFuaW1hdGlvbiBuZWVkcyB0byB0cmF2ZWxcbiAgICB2YXIgaW50ZXJ2YWxUaW1lID0gKHNwZWVkIC8gZGlzdGFuY2UpOyAvLyB0aGUgdGltZSBlYWNoIHNldEludGVydmFsIGl0ZXJhdGlvbiB3aWxsIHRha2VcbiAgICB2YXIgc3RlcFNpemUgPSBkaXN0YW5jZSA8IDAgPyAtMSA6IDE7IC8vIGlmIGRpc3RhbmNlIGlzIG5lZ2F0aXZlIHRoZW4gd2Ugc2V0IHN0ZXBTaXplIHRvIC0xXG4gICAgdmFyIHN0ZXBzID0gTWF0aC5hYnMoZGlzdGFuY2UgLyBzdGVwU2l6ZSk7IC8vIHRoZSBhbW91bnQgb2Ygc3RlcHMgcmVxdWlyZWQgdG8gZ2V0IHRvIGVuZFNpemVcbiAgICBpbnRlcnZhbFRpbWUgPSBzcGVlZCAvIHN0ZXBzO1xuXG4gICAgLy8gd2UgbmVlZCB0byBhZGp1c3Qgb3VyIGFuaW1hdGlvbiBzcGVjcyBpZiBpbnRlcnZhbCB0aW1lIGV4Y2VlZHMgNjBGUFMgZWcgaW50ZXJ2YWxUaW1lIDwgMTYuNjdtc1xuICAgIGlmIChNYXRoLmFicyhpbnRlcnZhbFRpbWUpIDwgKDEwMDAgLyA2MCkpIHtcbiAgICAgIGludGVydmFsVGltZSA9ICgxMDAwIC8gNjApOyAvLyBsZXTigJlzIG5vdCBnZXQgbG93ZXIgdGhhdCA2MEZQU1xuICAgICAgc3RlcHMgPSBNYXRoLmNlaWwoTWF0aC5hYnMoc3BlZWQgLyBpbnRlcnZhbFRpbWUpKTsgLy8gd2Ugbm93IG5lZWQgdGhlIHN0ZXBzIGFuZCBtYWtlIHN1cmUgd2UgY2VpbCB0aGVtIHNvIC0xIHdvbid0IG1ha2UgdGhlbSBuZWdhdGl2ZVxuICAgICAgc3RlcFNpemUgPSBkaXN0YW5jZSAvIHN0ZXBzOyAvLyBsYXN0IHRoaW5nIGlzIHN0ZXAgc2l6ZXMgd2hpY2ggYXJlIGRlcml2ZWQgZnJvbSBhbGwgb2YgdGhlIGFib3ZlXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0ZXBTaXplOiBzdGVwU2l6ZSxcbiAgICAgIHN0ZXBzOiAoc3RlcHMgLSAxKSxcbiAgICAgIGludGVydmFsVGltZTogaW50ZXJ2YWxUaW1lLFxuICAgIH07XG4gIH1cblxuICAvLyBleHBvcnQgZm9yIG5vZGUgYW5kIGJhYmVsIGVudmlyb25tZW50c1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBhbmltYXRlLkNhbGN1bGF0ZUFuaW1hdGlvblNwZWNzID0gQ2FsY3VsYXRlQW5pbWF0aW9uU3BlY3M7XG4gIH1cblxuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gUFVCTElDIEZVTkNUSU9OU1xuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8qKlxuICAgKiBHZXR0aW5nIGNvbXB1dGVkIENTUyBzdHlsZXMgZnJvbSBub3JtYWwgYnJvd3NlcnMgYW5kIElFXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBlbGVtZW50ICAtIFRoZSBET00gZWxlbWVudCB3ZSB3YW50IHRvIGdldCB0aGUgY29tcHV0ZWQgc3R5bGUgZnJvbVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgLSBUaGUgQ1NTIHByb3BlcnR5XG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ3xpbnRlZ2VyfSAtIFRoZSBDU1MgdmFsdWUgZm9yIHRoZSBwcm9wZXJ0eVxuICAgKi9cbiAgYW5pbWF0ZS5HZXRDU1NQcm9wZXJ0eUJlY2F1c2VJRSA9IGZ1bmN0aW9uIChlbGVtZW50LCBwcm9wZXJ0eSkge1xuICAgIGlmICh0eXBlb2YgZ2V0Q29tcHV0ZWRTdHlsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVtwcm9wZXJ0eV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzcGFjZSA9IGVsZW1lbnQuY3VycmVudFN0eWxlW3Byb3BlcnR5XTtcblxuICAgICAgaWYgKHNwYWNlID09PSAnYXV0bycpIHtcbiAgICAgICAgc3BhY2UgPSBBVS5hbmltYXRlLkNhbGN1bGF0ZUF1dG8oZWxlbWVudCwgcHJvcGVydHkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3BhY2U7XG4gICAgfVxuICB9O1xuXG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgc2l6ZSBvZiB0aGUgZWxlbWVudCB3aGVuIGl04oCZcyBkaW1lbnNpb24oaGVpZ2h0IG9yIHdpZHRoKSBpcyBzZXQgdG8gYXV0b1xuICAgKlxuICAgKiBAcGFyYW0gIHtvYmplY3R9IGVsZW1lbnQgICAtIFRoZSBlbGVtZW50IHRvIHJlYWQgYXV0byBoZWlnaHQgZnJvbVxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IGRpbWVuc2lvbiAtIFRoZSBkaW1lbnNpb24gdG8gbWVhc3VyZVxuICAgKlxuICAgKiBAcmV0dXJuIHtpbnRlZ2VyfSAgICAgICAgICAtIFRoZSBzaXplIG9mIHRoZSBlbGVtZW50IHdoZW4gYXQgZGltZW5zaW9uKGhlaWdodCBvciB3aWR0aCkgaXMgc2V0IHRvICdhdXRvJ1xuICAgKi9cbiAgYW5pbWF0ZS5DYWxjdWxhdGVBdXRvID0gZnVuY3Rpb24gKGVsZW1lbnQsIGRpbWVuc2lvbikge1xuICAgIHZhciBpbml0aWFsU2l6ZTtcbiAgICB2YXIgZW5kU2l6ZTtcblxuICAgIGlmIChkaW1lbnNpb24gPT09ICdoZWlnaHQnKSB7XG4gICAgICBpbml0aWFsU2l6ZSA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0OyAvLyBnZXQgY3VycmVudCBoZWlnaHRcbiAgICAgIGVsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9ICdhdXRvJzsgLy8gc2V0IGhlaWdodCB0byBhdXRvXG4gICAgICBlbmRTaXplID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7IC8vIGdldCBoZWlnaHQgYWdhaW5cbiAgICAgIGVsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9IGluaXRpYWxTaXplICsgJ3B4JzsgLy8gc2V0IGJhY2sgdG8gaW5pdGlhbCBoZWlnaHRcbiAgICB9IGVsc2Uge1xuICAgICAgaW5pdGlhbFNpemUgPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gJ2F1dG8nO1xuICAgICAgZW5kU2l6ZSA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICBlbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSBpbml0aWFsU2l6ZSArICdweCc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlSW50KGVuZFNpemUpO1xuICB9O1xuXG5cbiAgLyoqXG4gICAqIFN0b3AgYW55IGF1IGFuaW1hdGlvbiBvbiBhIERPTSBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSAge29iamVjdH0gZWxlbWVudCAtIFRoZSBlbGVtZW50IHRvIHN0b3AgYW5pbWF0aW5nXG4gICAqL1xuICBhbmltYXRlLlN0b3AgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGNsZWFySW50ZXJ2YWwoZWxlbWVudC5BVWFuaW1hdGlvbik7XG4gIH07XG5cblxuICAvKipcbiAgICogVGhlIG1hZ2ljYWwgYW5pbWF0aW9uIGZ1bmN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSAge29iamVjdH0gICAgICAgICBvcHRpb25zICAgICAgICAgIC0gVGhlIG9wdGlvbnMgZm9yIHRoZSBhbmltYXRpb25cbiAgICogQHBhcmFtICB7b2JqZWN0fSAgICAgICAgIG9wdGlvbnMuZWxlbWVudCAgLSBFbGVtZW50L3Mgd2UgYXJlIGFuaW1hdGluZyAoRE9NIG5vZGVzKVxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgb3B0aW9ucy5wcm9wZXJ0eSAtIFRoZSBDU1MgcHJvcGVydHkgdG8gYW5pbWF0ZVxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfHN0cmluZ30gb3B0aW9ucy5lbmRTaXplICAtIFRoZSBzaXplIHRoZSBlbGVtZW50IHNob3VsZCBhbmltYXRlIHRvLiBDYW4gYmUgJ2F1dG8nIG9yIHBpeGVsIHZhbHVlXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9ICAgICAgICBvcHRpb25zLnNwZWVkICAgIC0gVGhlIHNwZWVkIG9mIHRoZSBhbmltYXRpb24gaW4gbWlsbGlzZWNvbmRzIFtvcHRpb25hbF0gW2RlZmF1bHQ6IDI1MF1cbiAgICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgIG9wdGlvbnMuY2FsbGJhY2sgLSBBIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIGFmdGVyIHRoZSBhbmltYXRpb24gZW5kcyBbb3B0aW9uYWxdXG4gICAqXG4gICAqIEByZXR1cm4ge3Vua25vd259ICAgICAgICAgICAgICAgICAgICAgICAgIC0gVGhlIHJldHVybiB2YWx1ZSBwYXNzZWQgb24gZnJvbSBvdXIgb3B0aW9ucy5jYWxsYmFjayBmdW5jdGlvbiBbb3B0aW9uYWxdXG4gICAqL1xuICBhbmltYXRlLlJ1biA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgLy8gZGVmYXVsdHNcbiAgICB2YXIgZWxlbWVudHMgPSBvcHRpb25zLmVsZW1lbnQ7XG4gICAgdmFyIHNwZWVkID0gb3B0aW9ucy5zcGVlZCB8fCAyNTA7XG5cbiAgICAvLyBtYWtpbmcgYSBzaW5nbGUgRE9NIGVsZW1lbnQgaXRlcmF0YWJsZVxuICAgIGlmIChlbGVtZW50cy5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgZWxlbWVudHMgPSBbZWxlbWVudHNdO1xuICAgIH1cblxuICAgIC8vIG1ha2luZyBhIGNhbGxiYWNrIGlmIG5vbmUgd2FzIHByb3ZpZGVkXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvcHRpb25zLmNhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIH1cblxuICAgIC8vIGFkZGluZyBpdGVyYXRpb24gY291bnRzXG4gICAgZWxlbWVudHNbMF0uQVVpbnRlcmF0aW9uID0gMDtcbiAgICBlbGVtZW50c1swXS5BVWludGVyYXRpb25zID0gZWxlbWVudHMubGVuZ3RoO1xuXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGFsbCBET00gbm9kZXNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZWxlbWVudCA9IGVsZW1lbnRzW2ldOyAvLyB0aGlzIGVsZW1lbnRcbiAgICAgIEFVLmFuaW1hdGUuU3RvcChlbGVtZW50KTsgLy8gc3RvcCBhbnkgcHJldmlvdXMgYW5pbWF0aW9uc1xuICAgICAgdmFyIGluaXRpYWxTaXplID0gcGFyc2VJbnQoQVUuYW5pbWF0ZS5HZXRDU1NQcm9wZXJ0eUJlY2F1c2VJRShlbGVtZW50LCBvcHRpb25zLnByb3BlcnR5KSk7IC8vIHRoZSBlbGVtZW50cyBjdXJyZW50IHNpemVcbiAgICAgIHZhciBlbmRTaXplID0gb3B0aW9ucy5lbmRTaXplOyAvLyB0aGUgZWxlbWVudCBlbmQgc2l6ZVxuXG4gICAgICBpZiAob3B0aW9ucy5lbmRTaXplID09PSAnYXV0bycpIHsgLy8gY2FsY3VsYXRlIHdoYXQgJ2F1dG8nIG1lYW5zIGluIHBpeGVsXG4gICAgICAgIGVuZFNpemUgPSBBVS5hbmltYXRlLkNhbGN1bGF0ZUF1dG8oZWxlbWVudCwgb3B0aW9ucy5wcm9wZXJ0eSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNhbGN1bGF0ZSBvdXIgYW5pbWF0aW9uIHNwZWNzXG4gICAgICB2YXIgYW5pbWF0aW9uU3BlY3MgPSBDYWxjdWxhdGVBbmltYXRpb25TcGVjcyhpbml0aWFsU2l6ZSwgZW5kU2l6ZSwgc3BlZWQpO1xuICAgICAgdmFyIGl0ZXJhdGVDb3VudGVyID0gaW5pdGlhbFNpemU7XG5cbiAgICAgIC8vIHNldCBzdGF0ZVxuICAgICAgaWYgKGFuaW1hdGlvblNwZWNzLnN0ZXBTaXplIDwgMCkge1xuICAgICAgICBlbGVtZW50LkFVdG9nZ2xlU3RhdGUgPSAnY2xvc2luZyc7XG4gICAgICB9IGVsc2UgaWYgKGFuaW1hdGlvblNwZWNzLnN0ZXBTaXplID4gMCkge1xuICAgICAgICBlbGVtZW50LkFVdG9nZ2xlU3RhdGUgPSAnb3BlbmluZyc7XG4gICAgICB9XG5cbiAgICAgIC8vIHNjb3BpbmcgdmFyaWFibGVcbiAgICAgIChmdW5jdGlvbiAoZWxlbWVudCwgaW5pdGlhbFNpemUsIGl0ZXJhdGVDb3VudGVyLCBhbmltYXRpb25TcGVjcywgZW5kU2l6ZSkge1xuICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIGFuaW1hdGlvbiBieSBhZGRpbmcgaXQgdG8gdGhlIERPTSBlbGVtZW50XG4gICAgICAgIGVsZW1lbnQuQVVhbmltYXRpb24gPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAvLyB3aGVuIHdlIGFyZSBhdCB0aGUgZW5kXG4gICAgICAgICAgaWYgKGluaXRpYWxTaXplID09PSBlbmRTaXplIHx8IGFuaW1hdGlvblNwZWNzLnN0ZXBzID09PSAwKSB7XG4gICAgICAgICAgICBBVS5hbmltYXRlLlN0b3AoZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbb3B0aW9ucy5wcm9wZXJ0eV0gPSBlbmRTaXplICsgJ3B4JzsgLy8gc2V0IHRvIGVuZFNpemVcbiAgICAgICAgICAgIGVsZW1lbnQuQVV0b2dnbGVTdGF0ZSA9ICcnO1xuXG4gICAgICAgICAgICBlbGVtZW50c1swXS5BVWludGVyYXRpb24rKztcblxuICAgICAgICAgICAgLy8gcmVtb3ZpbmcgYXV0byBzbyBDU1MgY2FuIHRha2Ugb3ZlclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZW5kU2l6ZSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbb3B0aW9ucy5wcm9wZXJ0eV0gPSAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gd2hlbiBhbGwgaXRlcmF0aW9ucyBoYXZlIGZpbmlzaGVkLCBydW4gdGhlIGNhbGxiYWNrXG4gICAgICAgICAgICBpZiAoZWxlbWVudHNbMF0uQVVpbnRlcmF0aW9uID49IGVsZW1lbnRzWzBdLkFVaW50ZXJhdGlvbnMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBpZiB3ZSBhcmUgc3RpbGwgYW5pbWF0aW5nXG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpdGVyYXRlQ291bnRlciArPSBhbmltYXRpb25TcGVjcy5zdGVwU2l6ZTtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbb3B0aW9ucy5wcm9wZXJ0eV0gPSBpdGVyYXRlQ291bnRlciArICdweCc7XG5cbiAgICAgICAgICAgIGFuaW1hdGlvblNwZWNzLnN0ZXBzLS07XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sIE1hdGguYWJzKGFuaW1hdGlvblNwZWNzLmludGVydmFsVGltZSkpO1xuICAgICAgfSkoZWxlbWVudCwgaW5pdGlhbFNpemUsIGl0ZXJhdGVDb3VudGVyLCBhbmltYXRpb25TcGVjcywgZW5kU2l6ZSk7XG4gICAgfVxuICB9O1xuXG5cbiAgLyoqXG4gICAqIFRvZ2dsZSBhbmltYXRpb25cbiAgICpcbiAgICogQHBhcmFtICB7b2JqZWN0fSAgICAgICAgIG9wdGlvbnMgICAgICAgICAgICAgIC0gVGhlIG9wdGlvbnMgZm9yIHRoZSBhbmltYXRpb25cbiAgICogQHBhcmFtICB7b2JqZWN0fSAgICAgICAgIG9wdGlvbnMuZWxlbWVudCAgICAgIC0gRWxlbWVudC9zIHdlIGFyZSBhbmltYXRpbmcgKERPTSBub2RlcylcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgIG9wdGlvbnMucHJvcGVydHkgICAgIC0gVGhlIENTUyBwcm9wZXJ0eSB0byBhbmltYXRlIFtvcHRpb25hbF0gW2RlZmF1bHQ6ICdoZWlnaHQnXVxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfHN0cmluZ30gb3B0aW9ucy5jbG9zZVNpemUgICAgLSBUaGUgc2l6ZSB0aGUgZWxlbWVudCBzaG91bGQgY2xvc2UgdG8uIENhbiBiZSAnYXV0bycgb3IgcGl4ZWwgdmFsdWUgW29wdGlvbmFsXSBbZGVmYXVsdDogMF1cbiAgICogQHBhcmFtICB7aW50ZWdlcnxzdHJpbmd9IG9wdGlvbnMub3BlblNpemUgICAgIC0gVGhlIHNpemUgdGhlIGVsZW1lbnQgc2hvdWxkIG9wZW4gdG8uIENhbiBiZSAnYXV0bycgb3IgcGl4ZWwgdmFsdWUgW29wdGlvbmFsXSBbZGVmYXVsdDogJ2F1dG8nXVxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSAgICAgICAgb3B0aW9ucy5zcGVlZCAgICAgICAgLSBUaGUgc3BlZWQgb2YgdGhlIGFuaW1hdGlvbiBpbiBtaWxsaXNlY29uZHMgW29wdGlvbmFsXSBbZGVmYXVsdDogMjUwXVxuICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgb3B0aW9ucy5wcmVmdW5jdGlvbiAgLSBBIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIGJlZm9yZSBlYWNoIGFuaW1hdGlvbiBzdGFydHMsIHBhc3NlcyB7b2JqZWN0fSBlbGVtZW50LCB7c3RyaW5nfSBzdGF0ZSBbb3B0aW9uYWxdXG4gICAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICBvcHRpb25zLnBvc3RmdW5jdGlvbiAtIEEgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgYWZ0ZXIgZWFjaCBhbmltYXRpb24gZW5kcywgcGFzc2VzIHtvYmplY3R9IGVsZW1lbnQsIHtzdHJpbmd9IHN0YXRlIFtvcHRpb25hbF1cbiAgICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgIG9wdGlvbnMuY2FsbGJhY2sgICAgIC0gQSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBhZnRlciB0aGUgYW5pbWF0aW9uIGVuZHMsIHBhc3NlcyB7b2JqZWN0fSBlbGVtZW50LCB7c3RyaW5nfSBzdGF0ZSBbb3B0aW9uYWxdXG4gICAqXG4gICAqIEByZXR1cm4ge3Vua25vd259ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIFRoZSByZXR1cm4gdmFsdWUgcGFzc2VkIG9uIGZyb20gb3VyIG9wdGlvbnMuY2FsbGJhY2sgZnVuY3Rpb24gW29wdGlvbmFsXVxuICAgKi9cbiAgYW5pbWF0ZS5Ub2dnbGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXG4gICAgdmFyIGVsZW1lbnRzID0gb3B0aW9ucy5lbGVtZW50O1xuICAgIHZhciBwcm9wZXJ0eSA9IG9wdGlvbnMucHJvcGVydHkgfHwgJ2hlaWdodCc7XG4gICAgdmFyIHNwZWVkID0gb3B0aW9ucy5zcGVlZCB8fCAyNTA7XG4gICAgdmFyIGNsb3NlU2l6ZSA9IG9wdGlvbnMuY2xvc2VTaXplID09PSB1bmRlZmluZWQgPyAwIDogb3B0aW9ucy5jbG9zZVNpemU7XG4gICAgdmFyIG9wZW5TaXplID0gb3B0aW9ucy5vcGVuU2l6ZSA9PT0gdW5kZWZpbmVkID8gJ2F1dG8nIDogb3B0aW9ucy5vcGVuU2l6ZTtcblxuICAgIC8vIG1ha2luZyBhIHNpbmdsZSBET00gZWxlbWVudCBpdGVyYXRhYmxlXG4gICAgaWYgKGVsZW1lbnRzLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbGVtZW50cyA9IFtlbGVtZW50c107XG4gICAgfVxuXG4gICAgLy8gbWFraW5nIGEgcHJlZnVuY3Rpb24gaWYgbm9uZSB3YXMgcHJvdmlkZWRcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMucHJlZnVuY3Rpb24gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG9wdGlvbnMucHJlZnVuY3Rpb24gPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgfVxuXG4gICAgLy8gbWFraW5nIGEgcG9zdGZ1bmN0aW9uIGlmIG5vbmUgd2FzIHByb3ZpZGVkXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLnBvc3RmdW5jdGlvbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3B0aW9ucy5wb3N0ZnVuY3Rpb24gPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgfVxuXG4gICAgLy8gbWFraW5nIGEgY2FsbGJhY2sgaWYgbm9uZSB3YXMgcHJvdmlkZWRcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG9wdGlvbnMuY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgfVxuXG4gICAgLy8gYWRkaW5nIGl0ZXJhdGlvbiBjb3VudHNcbiAgICBlbGVtZW50c1swXS5BVXRvZ2dsZUludGVyYXRpb24gPSAwO1xuICAgIGVsZW1lbnRzWzBdLkFVdG9nZ2xlSW50ZXJhdGlvbnMgPSBlbGVtZW50cy5sZW5ndGg7XG5cbiAgICAvLyBpdGVyYXRlIG92ZXIgYWxsIERPTSBub2Rlc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBlbGVtZW50ID0gZWxlbWVudHNbaV07XG5cbiAgICAgIEFVLmFuaW1hdGUuU3RvcChlbGVtZW50KTtcblxuICAgICAgdmFyIHRhcmdldFNpemU7IC8vIHRoZSBzaXplIHRoZSBlbGVtZW50IHNob3VsZCBvcGVuL2Nsb3NlIHRvIGFmdGVyIHRvZ2dsZSBpcyBjbGlja2VkXG4gICAgICB2YXIgcHJlU3RhdGUgPSAnJzsgLy8gdGhlIHN0YXRlIHdlIGFuaW1hdGUgdG8gZm9yIHRoZSBwcmVmdW5jdGlvbiBhbmQgY2FsbGJhY2sgZnVuY3Rpb25zXG4gICAgICB2YXIgcG9zdFN0YXRlID0gJyc7IC8vIHRoZSBzdGF0ZSB3ZSBhbmltYXRlIHRvIGZvciB0aGUgcHJlZnVuY3Rpb24gYW5kIGNhbGxiYWNrIGZ1bmN0aW9uc1xuICAgICAgdmFyIGN1cnJlbnRTaXplID0gcGFyc2VJbnQoQVUuYW5pbWF0ZS5HZXRDU1NQcm9wZXJ0eUJlY2F1c2VJRShlbGVtZW50LCBvcHRpb25zLnByb3BlcnR5KSk7IC8vIHRoZSBjdXJyZW50IHNpemUgb2YgdGhlIGVsZW1lbnRcblxuICAgICAgaWYgKGN1cnJlbnRTaXplID09PSBjbG9zZVNpemUgfHwgZWxlbWVudC5BVXRvZ2dsZVN0YXRlID09PSAnY2xvc2luZycpIHtcbiAgICAgICAgdGFyZ2V0U2l6ZSA9IG9wZW5TaXplO1xuICAgICAgICBwcmVTdGF0ZSA9ICdvcGVuaW5nJztcbiAgICAgICAgcG9zdFN0YXRlID0gJ29wZW4nO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50U2l6ZSAhPT0gY2xvc2VTaXplIHx8IGVsZW1lbnQuQVV0b2dnbGVTdGF0ZSA9PT0gJ29wZW5pbmcnKSB7XG4gICAgICAgIHRhcmdldFNpemUgPSBjbG9zZVNpemU7XG4gICAgICAgIHByZVN0YXRlID0gJ2Nsb3NpbmcnO1xuICAgICAgICBwb3N0U3RhdGUgPSAnY2xvc2VkJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQVUuYW5pbWF0ZS5Ub2dnbGUgY2Fubm90IGRldGVybWluZSBzdGF0ZSBvZiBlbGVtZW50Jyk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJ1biBwcmVmdW5jdGlvbiBvbmNlIHBlciBlbGVtZW50XG4gICAgICBvcHRpb25zLnByZWZ1bmN0aW9uKGVsZW1lbnQsIHByZVN0YXRlKTtcblxuICAgICAgLy8gc2hvb3Qgb2ZmIGFuaW1hdGlvblxuICAgICAgQVUuYW5pbWF0ZS5SdW4oe1xuICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICBlbmRTaXplOiB0YXJnZXRTaXplLFxuICAgICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgIHNwZWVkOiBzcGVlZCxcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uICgpIHsgLy8gbWFraW5nIHN1cmUgd2UgZmlyZSB0aGUgY2FsbGJhY2sgb25seSBvbmNlXG4gICAgICAgICAgZWxlbWVudHNbMF0uQVV0b2dnbGVJbnRlcmF0aW9uKys7XG5cbiAgICAgICAgICBpZiAoZWxlbWVudHNbMF0uQVV0b2dnbGVJbnRlcmF0aW9uID09PSBlbGVtZW50c1swXS5BVWludGVyYXRpb25zKSB7XG4gICAgICAgICAgICB2YXIgcmV0dXJuUGFyYW0gPSBvcHRpb25zLmNhbGxiYWNrKGVsZW1lbnQsIHBvc3RTdGF0ZSk7XG5cbiAgICAgICAgICAgIC8vIHJ1biBwb3N0ZnVuY3Rpb24gb25jZSBwZXIgZWxlbWVudFxuICAgICAgICAgICAgb3B0aW9ucy5wb3N0ZnVuY3Rpb24oZWxlbWVudCwgcG9zdFN0YXRlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHJldHVyblBhcmFtO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHJ1biBwb3N0ZnVuY3Rpb24gb25jZSBwZXIgZWxlbWVudFxuICAgICAgICAgIG9wdGlvbnMucG9zdGZ1bmN0aW9uKGVsZW1lbnQsIHBvc3RTdGF0ZSk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgIH1cbiAgfTtcblxuXG4gIEFVLmFuaW1hdGUgPSBhbmltYXRlO1xuXG59KEFVKSk7XG5cblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gQVU7XG59XG5cblxuaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxuICB9KTtcblxuICBldmFsKCdleHBvcnRzLmRlZmF1bHQgPSBBVScpO1xufVxuXG5cblxuLyohIEBnb3YuYXUvYWNjb3JkaW9uIHY3LjAuNyAqL1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICpcbiAqIEFjY29yZGlvbiBmdW5jdGlvblxuICpcbiAqIEEgY29tcG9uZW50IHRvIGFsbG93IHVzZXJzIHRvIHNob3cgb3IgaGlkZSBwYWdlIGVsZW1lbnRzLlxuICpcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIEFVID0gQVUgfHwge307XG5cbihmdW5jdGlvbiAoQVUpIHtcblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIE5BTUVTUEFDRSBNT0RVTEVcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICB2YXIgYWNjb3JkaW9uID0ge31cblxuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gUFJJVkFURSBGVU5DVElPTlNcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvKipcbiAgICogUFJJVkFURVxuICAgKiBTZXQgdGhlIGNvcnJlY3QgQXJpYSByb2xlcyBmb3IgZ2l2ZW4gZWxlbWVudCBvbiB0aGUgYWNjb3JkaW9uIHRpdGxlIGFuZCBib2R5XG4gICAqXG4gICAqIEBwYXJhbSAge29iamVjdH0gZWxlbWVudCAtIFRoZSBET00gZWxlbWVudCB3ZSB3YW50IHRvIHNldCBhdHRyaWJ1dGVzIGZvclxuICAgKiBAcGFyYW0gIHtvYmplY3R9IHRhcmdldCAgLSBUaGUgRE9NIGVsZW1lbnQgd2Ugd2FudCB0byBzZXQgYXR0cmlidXRlcyBmb3JcbiAgICogQHBhcmFtICB7c3RyaW5nfSBzdGF0ZSAgIC0gVGhlIERPTSBlbGVtZW50IHdlIHdhbnQgdG8gc2V0IGF0dHJpYnV0ZXMgZm9yXG4gICAqL1xuICBmdW5jdGlvbiBzZXRBcmlhUm9sZXMoZWxlbWVudCwgdGFyZ2V0LCBzdGF0ZSkge1xuXG4gICAgaWYgKHN0YXRlID09PSAnY2xvc2luZycpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBSSVZBVEVcbiAgICogSUU4IGNvbXBhdGlibGUgZnVuY3Rpb24gZm9yIHJlcGxhY2luZyBjbGFzc2VzIG9uIGEgRE9NIG5vZGVcbiAgICpcbiAgICogQHBhcmFtICB7b2JqZWN0fSBlbGVtZW50ICAgICAgLSBUaGUgRE9NIGVsZW1lbnQgd2Ugd2FudCB0byB0b2dnbGUgY2xhc3NlcyBvblxuICAgKiBAcGFyYW0gIHtvYmplY3R9IHRhcmdldCAgICAgICAtIFRoZSBET00gZWxlbWVudCB3ZSB3YW50IHRvIHRvZ2dsZSBjbGFzc2VzIG9uXG4gICAqIEBwYXJhbSAge29iamVjdH0gc3RhdGUgICAgICAgIC0gVGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGFuaW1hdGlvbiBvbiB0aGUgZWxlbWVudFxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IG9wZW5pbmdDbGFzcyAtIFRoZSBmaXJzdENsYXNzIHlvdSB3YW50IHRvIHRvZ2dsZSBvbiB0aGUgRE9NIG5vZGVcbiAgICogQHBhcmFtICB7c3RyaW5nfSBjbG9zaW5nQ2xhc3MgLSBUaGUgc2Vjb25kQ2xhc3MgeW91IHdhbnQgdG8gdG9nZ2xlIG9uIHRoZSBET00gbm9kZVxuICAgKi9cbiAgZnVuY3Rpb24gdG9nZ2xlQ2xhc3NlcyhlbGVtZW50LCBzdGF0ZSwgb3BlbmluZ0NsYXNzLCBjbG9zaW5nQ2xhc3MpIHtcblxuICAgIGlmIChzdGF0ZSA9PT0gJ29wZW5pbmcnIHx8IHN0YXRlID09PSAnb3BlbicpIHtcbiAgICAgIHZhciBvbGRDbGFzcyA9IG9wZW5pbmdDbGFzcyB8fCAnYXUtYWNjb3JkaW9uLS1jbG9zZWQnO1xuICAgICAgdmFyIG5ld0NsYXNzID0gY2xvc2luZ0NsYXNzIHx8ICdhdS1hY2NvcmRpb24tLW9wZW4nO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgb2xkQ2xhc3MgPSBjbG9zaW5nQ2xhc3MgfHwgJ2F1LWFjY29yZGlvbi0tb3Blbic7XG4gICAgICB2YXIgbmV3Q2xhc3MgPSBvcGVuaW5nQ2xhc3MgfHwgJ2F1LWFjY29yZGlvbi0tY2xvc2VkJztcbiAgICB9XG5cbiAgICByZW1vdmVDbGFzcyhlbGVtZW50LCBvbGRDbGFzcyk7XG4gICAgYWRkQ2xhc3MoZWxlbWVudCwgbmV3Q2xhc3MpO1xuICB9XG5cblxuICAvKipcbiAgICogUFJJVkFURVxuICAgKiBJRTggY29tcGF0aWJsZSBmdW5jdGlvbiBmb3IgcmVtb3ZpbmcgYSBjbGFzc1xuICAgKlxuICAgKiBAcGFyYW0gIHtvYmplY3R9IGVsZW1lbnQgICAtIFRoZSBET00gZWxlbWVudCB3ZSB3YW50IHRvIG1hbmlwdWxhdGVcbiAgICogQHBhcmFtICB7b2JqZWN0fSBjbGFzc05hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY2xhc3MgdG8gYmUgcmVtb3ZlZFxuICAgKi9cbiAgZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoXnxcXFxcYilcIiArIGNsYXNzTmFtZS5zcGxpdChcIiBcIikuam9pbihcInxcIikgKyBcIihcXFxcYnwkKVwiLCBcImdpXCIpLCBcIiBcIik7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogUFJJVkFURVxuICAgKiBJRTggY29tcGF0aWJsZSBmdW5jdGlvbiBmb3IgYWRkaW5nIGEgY2xhc3NcbiAgICpcbiAgICogQHBhcmFtICB7b2JqZWN0fSBlbGVtZW50ICAgLSBUaGUgRE9NIGVsZW1lbnQgd2Ugd2FudCB0byBtYW5pcHVsYXRlXG4gICAqIEBwYXJhbSAge29iamVjdH0gY2xhc3NOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNsYXNzIHRvIGJlIGFkZGVkXG4gICAqL1xuICBmdW5jdGlvbiBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lICsgXCIgXCIgKyBjbGFzc05hbWU7XG4gICAgfVxuICB9XG5cblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFBVQkxJQyBGVU5DVElPTlNcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvKipcbiAgICogVG9nZ2xlIGFuIGFjY29yZGlvbiBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gIGVsZW1lbnRzICAtIFRoZSBET00gbm9kZS9zIHRvIHRvZ2dsZVxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBzcGVlZCAgICAgLSBUaGUgc3BlZWQgaW4gbXMgZm9yIHRoZSBhbmltYXRpb25cbiAgICogQHBhcmFtICB7b2JqZWN0fSAgY2FsbGJhY2tzIC0gQW4gb2JqZWN0IG9mIGZvdXIgb3B0aW9uYWwgY2FsbGJhY2tzOiB7IG9uT3BlbiwgYWZ0ZXJPcGVuLCBvbkNsb3NlLCBhZnRlckNsb3NlIH1cbiAgICpcbiAgICovXG4gIGFjY29yZGlvbi5Ub2dnbGUgPSBmdW5jdGlvbiAoZWxlbWVudHMsIHNwZWVkLCBjYWxsYmFja3MpIHtcblxuICAgIC8vIHN0b3AgZXZlbnQgcHJvcGFnYXRpb25cbiAgICB0cnkge1xuICAgICAgd2luZG93LmV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9IGNhdGNoIChlcnJvcikgeyB9XG5cbiAgICAvLyBtYWtpbmcgc3VyZSB3ZSBjYW4gaXRlcmF0ZSBvdmVyIGp1c3Qgb25lIERPTSBlbGVtZW50XG4gICAgaWYgKGVsZW1lbnRzLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbGVtZW50cyA9IFtlbGVtZW50c107XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgdGhpcyBvbmNlXG4gICAgaWYgKHR5cGVvZiBjYWxsYmFja3MgIT0gJ29iamVjdCcpIHtcbiAgICAgIGNhbGxiYWNrcyA9IHt9O1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgdmFyIGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcbiAgICAgIHZhciB0YXJnZXRJZCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpO1xuXG4gICAgICBpZiAodGFyZ2V0ID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdBVS5hY2NvcmRpb24uVG9nZ2xlIGNhbm5vdCBmaW5kIHRoZSB0YXJnZXQgdG8gYmUgdG9nZ2xlZCBmcm9tIGluc2lkZSBhcmlhLWNvbnRyb2xzLlxcbicgK1xuICAgICAgICAgICdNYWtlIHN1cmUgdGhlIGZpcnN0IGFyZ3VtZW50IHlvdSBnaXZlIEFVLmFjY29yZGlvbi5Ub2dnbGUgaXMgdGhlIERPTSBlbGVtZW50IChhIGJ1dHRvbiBvciBhIGxpbmspIHRoYXQgaGFzIGFuIGFyaWEtY29udHJvbHMgYXR0cmlidXRlIHRoYXQgcG9pbnRzICcgK1xuICAgICAgICAgICd0byBhIGRpdiB0aGF0IHlvdSB3YW50IHRvIHRvZ2dsZS4nXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgICAgKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIEFVLmFuaW1hdGUuVG9nZ2xlKHtcbiAgICAgICAgICBlbGVtZW50OiB0YXJnZXQsXG4gICAgICAgICAgcHJvcGVydHk6ICdoZWlnaHQnLFxuICAgICAgICAgIHNwZWVkOiBzcGVlZCB8fCAyNTAsXG4gICAgICAgICAgcHJlZnVuY3Rpb246IGZ1bmN0aW9uICh0YXJnZXQsIHN0YXRlKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09ICdvcGVuaW5nJykge1xuICAgICAgICAgICAgICB0YXJnZXQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgICAgICAgICAgLy8gcnVuIHdoZW4gb3BlbmluZ1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrcy5vbk9wZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3Mub25PcGVuKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIHJ1biB3aGVuIGNsb3NpbmdcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFja3Mub25DbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5vbkNsb3NlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0QXJpYVJvbGVzKGVsZW1lbnQsIHRhcmdldCwgc3RhdGUpO1xuICAgICAgICAgICAgdG9nZ2xlQ2xhc3NlcyhlbGVtZW50LCBzdGF0ZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb3N0ZnVuY3Rpb246IGZ1bmN0aW9uICh0YXJnZXQsIHN0YXRlKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgICAgICAgIC8vIHJ1biBhZnRlciBjbG9zaW5nXG4gICAgICAgICAgICAgIHRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAnJztcblxuICAgICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrcy5hZnRlckNsb3NlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLmFmdGVyQ2xvc2UoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gcnVuIGFmdGVyIG9wZW5pbmdcbiAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9ICcnO1xuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2tzLmFmdGVyT3BlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5hZnRlck9wZW4oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b2dnbGVDbGFzc2VzKHRhcmdldCwgc3RhdGUpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSkoZWxlbWVudCk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIE9wZW4gYSBncm91cCBvZiBhY2NvcmRpb24gZWxlbWVudHNcbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgZWxlbWVudHMgLSBUaGUgRE9NIG5vZGUvcyB0byB0b2dnbGVcbiAgICogQHBhcmFtICB7aW50ZWdlcn0gc3BlZWQgICAgLSBUaGUgc3BlZWQgaW4gbXMgZm9yIHRoZSBhbmltYXRpb25cbiAgICpcbiAgICovXG4gIGFjY29yZGlvbi5PcGVuID0gZnVuY3Rpb24gKGVsZW1lbnRzLCBzcGVlZCkge1xuXG4gICAgLy8gc3RvcCBldmVudCBwcm9wYWdhdGlvblxuICAgIHRyeSB7XG4gICAgICB3aW5kb3cuZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7IH1cblxuICAgIGlmIChlbGVtZW50cy5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgZWxlbWVudHMgPSBbZWxlbWVudHNdO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgdmFyIGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcbiAgICAgIHZhciB0YXJnZXRJZCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpO1xuXG4gICAgICAvLyBsZXTigJlzIGZpbmQgb3V0IGlmIHRoaXMgYWNjb3JkaW9uIGlzIHN0aWxsIGNsb3NlZFxuICAgICAgdmFyIGhlaWdodCA9IDA7XG4gICAgICBpZiAodHlwZW9mIGdldENvbXB1dGVkU3R5bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGhlaWdodCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhcmdldCkuaGVpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGVpZ2h0ID0gdGFyZ2V0LmN1cnJlbnRTdHlsZS5oZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJzZUludChoZWlnaHQpID09PSAwKSB7XG4gICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAnMHB4JztcbiAgICAgIH1cblxuICAgICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgIHRvZ2dsZUNsYXNzZXModGFyZ2V0LCAnb3BlbmluZycpO1xuICAgICAgdG9nZ2xlQ2xhc3NlcyhlbGVtZW50LCAnb3BlbmluZycpO1xuICAgICAgc2V0QXJpYVJvbGVzKGVsZW1lbnQsIHRhcmdldCwgJ29wZW5pbmcnKTtcblxuICAgICAgKGZ1bmN0aW9uICh0YXJnZXQsIHNwZWVkLCBlbGVtZW50KSB7XG4gICAgICAgIEFVLmFuaW1hdGUuUnVuKHtcbiAgICAgICAgICBlbGVtZW50OiB0YXJnZXQsXG4gICAgICAgICAgcHJvcGVydHk6ICdoZWlnaHQnLFxuICAgICAgICAgIGVuZFNpemU6ICdhdXRvJyxcbiAgICAgICAgICBzcGVlZDogc3BlZWQgfHwgMjUwLFxuICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0b2dnbGVDbGFzc2VzKGVsZW1lbnQsICdvcGVuaW5nJyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9KSh0YXJnZXQsIHNwZWVkLCBlbGVtZW50KTtcbiAgICB9XG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIENsb3NlIGEgZ3JvdXAgb2YgYWNjb3JkaW9uIGVsZW1lbnRzXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gIGVsZW1lbnRzIC0gVGhlIERPTSBub2RlL3MgdG8gdG9nZ2xlXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IHNwZWVkICAgIC0gVGhlIHNwZWVkIGluIG1zIGZvciB0aGUgYW5pbWF0aW9uXG4gICAqXG4gICAqL1xuICBhY2NvcmRpb24uQ2xvc2UgPSBmdW5jdGlvbiAoZWxlbWVudHMsIHNwZWVkKSB7XG5cbiAgICAvLyBzdG9wIGV2ZW50IHByb3BhZ2F0aW9uXG4gICAgdHJ5IHtcbiAgICAgIHdpbmRvdy5ldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHsgfVxuXG4gICAgaWYgKGVsZW1lbnRzLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbGVtZW50cyA9IFtlbGVtZW50c107XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICB2YXIgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgICAgdmFyIHRhcmdldElkID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCk7XG5cbiAgICAgIHRvZ2dsZUNsYXNzZXMoZWxlbWVudCwgJ2Nsb3NpbmcnKTtcbiAgICAgIHNldEFyaWFSb2xlcyhlbGVtZW50LCB0YXJnZXQsICdjbG9zaW5nJyk7XG5cbiAgICAgIChmdW5jdGlvbiAodGFyZ2V0LCBzcGVlZCkge1xuICAgICAgICBBVS5hbmltYXRlLlJ1bih7XG4gICAgICAgICAgZWxlbWVudDogdGFyZ2V0LFxuICAgICAgICAgIHByb3BlcnR5OiAnaGVpZ2h0JyxcbiAgICAgICAgICBlbmRTaXplOiAwLFxuICAgICAgICAgIHNwZWVkOiBzcGVlZCB8fCAyNTAsXG4gICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICB0b2dnbGVDbGFzc2VzKHRhcmdldCwgJ2Nsb3NlJyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9KSh0YXJnZXQsIHNwZWVkKTtcbiAgICB9XG5cbiAgfVxuXG5cbiAgQVUuYWNjb3JkaW9uID0gYWNjb3JkaW9uO1xuXG59KEFVKSk7XG5cblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gQVU7XG59XG5cbiQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcbiAgJChcIi5hY2NvcmRpb25cIikub24oXCJjbGlja1wiLCBcIi5hY2NvcmRpb24tYnV0dG9uXCIsIGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwicm90YXRlLTkwXCIpKSB7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwicm90YXRlLTkwXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKFwicm90YXRlLTkwXCIpO1xuICAgIH1cblxuICAgICQodGhpcykucGFyZW50KCkuZmluZChcIi5hY2NvcmRpb24tY29udGVudFwiKS50b2dnbGUoKTtcbiAgfSk7XG5cbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcImFcIiwgZnVuY3Rpb24oZSkge1xuXG4gICAgaWYgKCEodHlwZW9mICQodGhpcykuYXR0cihcImRpc2FibGVkXCIpICE9PSB1bmRlZmluZWQgJiYgJCh0aGlzKS5hdHRyKFwiZGlzYWJsZWRcIikgIT09IFwiZGlzYWJsZWRcIiAmJiAkKHRoaXMpLmF0dHIoXCJkaXNhYmxlZFwiKSAhPT0gXCJcIikpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICB9KVxufSlcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICQoXCIuZHZhLXBob25lXCIpLnJlcGxhY2VXaXRoKGA8YSBocmVmPVwidGVsOjE4MDA1NTUyNTRcIj4xODAwIDU1NSAyNTQ8L2E+YCk7XG59KVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzd2lwZWQtcmlnaHQnLCBmdW5jdGlvbiAoZSkge1xuICAkKCcjc3RhdGUtc3dpdGNoZXInKS50b2dnbGUoKTtcbn0pOyJdLCJmaWxlIjoibWFpbi5qcyJ9
