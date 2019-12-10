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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBnZXRVcmxQYXJhbWV0ZXIgPSBmdW5jdGlvbiBnZXRVcmxQYXJhbWV0ZXIoc1BhcmFtKSB7XHJcbiAgdmFyIHNQYWdlVVJMID0gZGVjb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpKSxcclxuICAgIHNVUkxWYXJpYWJsZXMgPSBzUGFnZVVSTC5zcGxpdCgnJicpLFxyXG4gICAgc1BhcmFtZXRlck5hbWUsXHJcbiAgICBpO1xyXG5cclxuICBmb3IgKGkgPSAwOyBpIDwgc1VSTFZhcmlhYmxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgc1BhcmFtZXRlck5hbWUgPSBzVVJMVmFyaWFibGVzW2ldLnNwbGl0KCc9Jyk7XHJcblxyXG4gICAgaWYgKHNQYXJhbWV0ZXJOYW1lWzBdID09PSBzUGFyYW0pIHtcclxuICAgICAgcmV0dXJuIHNQYXJhbWV0ZXJOYW1lWzFdID09PSB1bmRlZmluZWQgPyB0cnVlIDogc1BhcmFtZXRlck5hbWVbMV07XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gdG9kYXkncyBkYXRlIGF2YWlsYWJsZSBldmVyeXdoZXJlIFxyXG52YXIgdG9kYXkgPSBtb21lbnQoKS5mb3JtYXQoJ0QgTU1NTSBZWVlZJyk7XHJcbiQoXCIucHQtZGF0ZS10b2RheVwiKS5odG1sKHRvZGF5KTtcclxuXHJcblxyXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgkKSB7XHJcbiAgLy8gSGVscCBzbGlkZSBnZXN0dXJlXHJcbiAgbGV0IHBhbmVscyA9ICQoJy5wYW5lbCcpO1xyXG4gIHBhbmVscy5tYXAoKGluZGV4LCBwYW5lbCkgPT4ge1xyXG4gICAgbGV0IHBhbmVsQ29udGFpbmVyID0gJChwYW5lbCkuZmluZCgnLnBhbmVsLWNvbnRhaW5lcicpO1xyXG4gICAgbGV0IHBhbmVsSGVhZGVyID0gJChwYW5lbCkuZmluZCgnLnBhbmVsLWhlYWRlcicpO1xyXG4gICAgbGV0IG9yaWdpblggPSAwO1xyXG4gICAgbGV0IGxhc3RYID0gMDtcclxuICAgIGxldCBkcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgbGV0IHVpQnVuY2ggPSBwYW5lbENvbnRhaW5lci5hZGQocGFuZWxIZWFkZXIpO1xyXG4gICAgdWlCdW5jaC5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKCFkcmFnZ2luZyAmJiAhJChldmVudC50YXJnZXQpLmlzKCcucGFuZWwtY2xvc2UnKSkge1xyXG4gICAgICAgIGRyYWdnaW5nID0gdHJ1ZTtcclxuICAgICAgICBvcmlnaW5YID0gZXZlbnQuc2NyZWVuWCB8fCBldmVudC50YXJnZXRUb3VjaGVzWzBdLnNjcmVlblg7XHJcbiAgICAgICAgbGFzdFggPSBvcmlnaW5YO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHVpQnVuY2gub24oJ21vdXNlbW92ZSB0b3VjaG1vdmUnLCAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKGRyYWdnaW5nKSB7XHJcbiAgICAgICAgbGFzdFggPSAoZXZlbnQuc2NyZWVuWCB8fCBldmVudC50YXJnZXRUb3VjaGVzWzBdLnNjcmVlblgpO1xyXG4gICAgICAgIGxldCBuZXdYID0gbGFzdFggLSBvcmlnaW5YO1xyXG4gICAgICAgIGlmIChuZXdYID49IDApXHJcbiAgICAgICAgICB1aUJ1bmNoLmNzcyh7XHJcbiAgICAgICAgICAgIHJpZ2h0OiAtbmV3WCArICdweCdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHVpQnVuY2gub24oJ21vdXNldXAgdG91Y2hlbmQnLCAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKGRyYWdnaW5nICYmICEkKGV2ZW50LnRhcmdldCkuaXMoJy5wYW5lbC1jbG9zZScpKSB7XHJcbiAgICAgICAgZHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgICAgICBsZXQgbmV3WCA9IChldmVudC5zY3JlZW5YIHx8IGxhc3RYKSAtIG9yaWdpblg7XHJcbiAgICAgICAgaWYgKG5ld1ggPiAocGFuZWxDb250YWluZXJbMF0ub2Zmc2V0V2lkdGggKiAwLjI1KSkge1xyXG4gICAgICAgICAgJChwYW5lbCkucmVtb3ZlQ2xhc3MoJ2lzLXZpc2libGUnKS5hZGRDbGFzcygnc3dpcGUtY2xvc2luZycpO1xyXG4gICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAkKHBhbmVsKS5yZW1vdmVDbGFzcygnc3dpcGUtY2xvc2luZycpO1xyXG4gICAgICAgICAgICB1aUJ1bmNoLmNzcyh7XHJcbiAgICAgICAgICAgICAgcmlnaHQ6ICcnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSwgNDAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdWlCdW5jaC5jc3Moe1xyXG4gICAgICAgICAgICByaWdodDogJzBweCcsXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICdyaWdodCAwLjNzJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHVpQnVuY2guY3NzKHtcclxuICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcblxyXG4gIC8vIFRvYXN0IG1vY2t1cFxyXG4gICQoXCIuY2FsbC10b2FzdFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciByYW5kb21XVG9hc3RUeXBlcyA9IFtcInN1Y2Nlc3NcIiwgXCJpbmZvcm1hdGlvblwiLCBcImFsZXJ0XCIsIFwiZXJyb3JcIl07XHJcbiAgICB2YXIgcmFuZG9tV29yZHMgPSBbXCJpbmsgRmFpcnkgQXJtYWRpbGxvXCIsIFwiT2thcGlcIiwgXCJHbGF1Y3VzIEF0bGFudGljdXNcIiwgXCJUaGUgTWFuZWQgV29sZlwiLCBcIkZvc3NhXCIsIFwiSWd1YW5hXCJdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFJhbmRvbUFyYml0cmFyeShtYXgpIHtcclxuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IobWF4KSk7XHJcbiAgICB9XHJcbiAgICB2YXIgcmFuZEludCA9IGdldFJhbmRvbUFyYml0cmFyeSg0KTtcclxuICAgIHZhciBhbmltYWwgPSByYW5kb21Xb3Jkc1tyYW5kSW50XTtcclxuICAgIHZhciB0b2FzdFR5cGUgPSByYW5kb21XVG9hc3RUeXBlc1tyYW5kSW50XTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5mb2N1cygpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XHJcblxyXG4gICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKTtcclxuXHJcbiAgICBqUXVlcnkoJy50b2FzdC1jb250YWluZXInKS5hcHBlbmQoJzxidXR0b24gY2xhc3M9XCJ1aWtpdC1idG4gdG9hc3RcIiByb2xlPVwiYWxlcnRcIiB0eXBlPVwiYnV0dG9uXCI+PGRpdiBjbGFzcz1cInRvYXN0X190eXBlIHRvYXN0X190eXBlLS0nICsgdG9hc3RUeXBlICsgJ1wiPjxzcGFuIGNsYXNzPVwic3JcIj4nICsgdG9hc3RUeXBlICsgJzwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVwidG9hc3RfX21lc3NhZ2VcIj48cD5Zb3UgYWRkZWQgYSAnICsgYW5pbWFsICsgJyBhdCAnICsgbm93ICsgJzwvcD48L2Rpdj48L2J1dHRvbj4nKTtcclxuXHJcbiAgICBqUXVlcnkoXCIudG9hc3QtY29udGFpbmVyXCIpLnNob3coKTtcclxuICB9KTtcclxuXHJcbiAgalF1ZXJ5KFwiLnRvYXN0LWNvbnRhaW5lclwiKS5vbihcImNsaWNrXCIsIFwiYnV0dG9uXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgalF1ZXJ5KHRoaXMpLmhpZGUoKTtcclxuICB9KTtcclxuXHJcblxyXG5cclxuICAvLyBtYXRjaGVzIHBvbGx5ZmlsbFxyXG4gIGlmICghRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcykge1xyXG4gICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9IEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvclxyXG4gIH1cclxuXHJcbiAgLy9jbG9zZXN0IHBvbGx5ZmlsbFxyXG4gIGlmICghRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCkge1xyXG4gICAgRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCA9IGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgIHZhciBlbCA9IHRoaXNcclxuICAgICAgaWYgKCFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGFpbnMoZWwpKSByZXR1cm4gbnVsbFxyXG4gICAgICBkbyB7XHJcbiAgICAgICAgaWYgKGVsLm1hdGNoZXMocykpIHJldHVybiBlbFxyXG4gICAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudCB8fCBlbC5wYXJlbnROb2RlXHJcbiAgICAgIH0gd2hpbGUgKGVsICE9PSBudWxsICYmIGVsLm5vZGVUeXBlID09PSAxKVxyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8vIFRvb2x0aXBcclxuICBmdW5jdGlvbiBnZXRPZmZzZXREb2N1bWVudFRvcChwRWxlbWVudCkge1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgKyBwRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3BcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyVG9vbHRpcChwRWxlbWVudCkge1xyXG5cclxuICAgIGNvbnN0IFJPT1RfRUxFTUVOVF9DTEFTUyA9ICd0b29sdGlwJ1xyXG4gICAgY29uc3QgVEFCX0NMQVNTID0gYCR7Uk9PVF9FTEVNRU5UX0NMQVNTfV9fdGFiYFxyXG5cclxuICAgIGNvbnN0IEFSSUFfSElEREVOX0FUVFIgPSAnYXJpYS1oaWRkZW4nXHJcbiAgICBjb25zdCBBUklBX0VYUEFOREVEX0FUVFIgPSAnYXJpYS1leHBhbmRlZCdcclxuXHJcbiAgICBjb25zdCBjb250cm9sID0gcEVsZW1lbnRcclxuICAgIGNvbnN0IHJvb3RFbGVtZW50ID0gY29udHJvbC5jbG9zZXN0KGAuJHtST09UX0VMRU1FTlRfQ0xBU1N9YClcclxuICAgIGNvbnN0IGNvbnRlbnQgPSByb290RWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke1JPT1RfRUxFTUVOVF9DTEFTU31fX2NvbnRlbnRgKVswXVxyXG4gICAgY29uc3QgdGFiID0gcm9vdEVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShUQUJfQ0xBU1MpWzBdXHJcbiAgICBjb25zdCBtZXNzYWdlID0gcm9vdEVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHtST09UX0VMRU1FTlRfQ0xBU1N9X19tZXNzYWdlYClbMF1cclxuICAgIGNvbnN0IGNsb3NlID0gcm9vdEVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHtST09UX0VMRU1FTlRfQ0xBU1N9X19jbG9zZWApWzBdXHJcblxyXG4gICAgY29uc3QgdGFiT3JpZ2luYWxDbGFzc05hbWUgPSB0YWIuY2xhc3NOYW1lXHJcblxyXG4gICAgZnVuY3Rpb24gc2hvd1Rvb2x0aXAoKSB7XHJcbiAgICAgIGNvbnN0IGNsb2FrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgY2xvYWsuc3R5bGUuY3NzVGV4dCA9ICdoZWlnaHQ6IDA7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsnXHJcbiAgICAgIGNvbnRlbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY2xvYWssIGNvbnRlbnQpXHJcbiAgICAgIGNsb2FrLmFwcGVuZENoaWxkKGNvbnRlbnQpXHJcblxyXG4gICAgICBjb250ZW50LnNldEF0dHJpYnV0ZShBUklBX0hJRERFTl9BVFRSLCBmYWxzZSlcclxuXHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tPdXRIYW5kbGVyKVxyXG5cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY2xvYWsucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChjb250ZW50KVxyXG4gICAgICAgIGNsb2FrLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2xvYWspXHJcblxyXG4gICAgICAgIGNvbnRyb2wuc2V0QXR0cmlidXRlKEFSSUFfRVhQQU5ERURfQVRUUiwgdHJ1ZSlcclxuXHJcbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gYCR7dGFiT3JpZ2luYWxDbGFzc05hbWV9ICR7VEFCX0NMQVNTfS0tYWN0aXZlYFxyXG5cclxuICAgICAgICBpZiAoY29udGVudC5jbGllbnRIZWlnaHQgPiAoY29udGVudC5zY3JvbGxUb3AgKyBjb250ZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCkpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdhZGRpbmcgdG9vbHRpcF9fdGFiLS1ib3R0b20nKTtcclxuICAgICAgICAgIHRhYi5jbGFzc05hbWUgPSBgJHtjbGFzc05hbWV9ICR7VEFCX0NMQVNTfS0tYm90dG9tYFxyXG4gICAgICAgICAgY29udGVudC5zdHlsZS50b3AgPSBgJHtjb250cm9sLm9mZnNldFRvcCArIHRhYi5jbGllbnRIZWlnaHQgKyB0YWIub2Zmc2V0VG9wICsgdGFiLm9mZnNldEhlaWdodH1weGBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ2FkZGluZyB0b29sdGlwX190YWItLXRvcCcpO1xyXG4gICAgICAgICAgdGFiLmNsYXNzTmFtZSA9IGAke2NsYXNzTmFtZX0gJHtUQUJfQ0xBU1N9LS10b3BgXHJcbiAgICAgICAgICBjb250ZW50LnN0eWxlLnRvcCA9IGAke2NvbnRyb2wub2Zmc2V0VG9wIC0gY29udGVudC5jbGllbnRIZWlnaHQgKyB0YWIub2Zmc2V0VG9wfXB4YFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlc2NhcGVIYW5kbGVyKVxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tPdXRIYW5kbGVyKVxyXG5cclxuICAgICAgICBjb250ZW50LmZvY3VzKClcclxuICAgICAgfSwgMClcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlVG9vbHRpcCgpIHtcclxuICAgICAgY29udGVudC5zZXRBdHRyaWJ1dGUoQVJJQV9ISURERU5fQVRUUiwgdHJ1ZSlcclxuICAgICAgY29udHJvbC5zZXRBdHRyaWJ1dGUoQVJJQV9FWFBBTkRFRF9BVFRSLCBmYWxzZSlcclxuXHJcbiAgICAgIHRhYi5jbGFzc05hbWUgPSB0YWJPcmlnaW5hbENsYXNzTmFtZTtcclxuXHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXNjYXBlSGFuZGxlcilcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja091dEhhbmRsZXIpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VUb29sdGlwKCkge1xyXG4gICAgICBoaWRlVG9vbHRpcCgpXHJcbiAgICAgIGNvbnRyb2wuZm9jdXMoKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVzY2FwZUhhbmRsZXIocEV2ZW50KSB7XHJcbiAgICAgIGlmIChldmVudC5rZXkgIT09ICdFc2NhcGUnKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjb250ZW50LmNvbnRhaW5zKHBFdmVudC50YXJnZXQpKSB7XHJcbiAgICAgICAgY2xvc2VUb29sdGlwKClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBoaWRlVG9vbHRpcCgpXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbGlja091dEhhbmRsZXIocEV2ZW50KSB7XHJcbiAgICAgIGlmICghY29udGVudC5jb250YWlucyhwRXZlbnQudGFyZ2V0KSkge1xyXG4gICAgICAgIGhpZGVUb29sdGlwKClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93VG9vbHRpcClcclxuICAgIGNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAocEV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC5rZXkgPT09ICcgJyB8fCBldmVudC5rZXkgPT09ICdFbnRlcicpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgc2hvd1Rvb2x0aXAoKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VUb29sdGlwKVxyXG4gICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAocEV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC5rZXkgPT09ICcgJyB8fCBldmVudC5rZXkgPT09ICdFbnRlcicpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgY2xvc2VUb29sdGlwKClcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgfVxyXG5cclxuICBbXS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndG9vbHRpcF9fY29udHJvbCcpLCBwRWxlbWVudCA9PiByZWdpc3RlclRvb2x0aXAocEVsZW1lbnQpKVxyXG5cclxuICAvLyBUaHJlZSBzdGF0ZSBjaGVjayBib3hlcyBcclxuICAkKFwiLm15cy1yYWRpb19fY29udHJvbFwiKS5jbGljayhmdW5jdGlvbiAoZXYpIHtcclxuICAgIGxldCBzaWJsaW5ncyA9ICQodGhpcykuY2xvc2VzdChcIi5teXMtcmFkaW8tZ3JvdXBcIikuZmluZChcIi5teXMtcmFkaW9fX2JveFwiKTtcclxuICAgIGxldCB0aGlzQm94ID0gJCh0aGlzKS5uZXh0KFwiLm15cy1yYWRpb19fYm94XCIpO1xyXG4gICAgJChzaWJsaW5ncykucmVtb3ZlQ2xhc3MoJ215cy1yYWRpb19fYm94LS1ub3Qtc2VsZWN0ZWQnKTtcclxuICAgICQoc2libGluZ3MpLm5vdCh0aGlzQm94KS5hZGRDbGFzcygnbXlzLXJhZGlvX19ib3gtLW5vdC1zZWxlY3RlZCcpO1xyXG4gIH0pO1xyXG5cclxuICAkKFwiLm15cy1yYWRpby1ncm91cFwiKS5tb3VzZW92ZXIoZnVuY3Rpb24gKGV2KSB7XHJcbiAgICBsZXQgY2hlY2tlZEJveCA9ICQodGhpcykuZmluZChcImlucHV0OmNoZWNrZWRcIikubmV4dChcIi5teXMtcmFkaW9fX2JveFwiKTtcclxuICAgIGlmIChjaGVja2VkQm94Lmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICBsZXQgc2libGluZ3MgPSAkKHRoaXMpLmZpbmQoXCIubXlzLXJhZGlvX19ib3hcIik7XHJcbiAgICAgIGxldCBjaGVja2VkQm94ID0gJCh0aGlzKS5uZXh0KFwiLm15cy1yYWRpb19fYm94XCIpO1xyXG4gICAgICAkKHNpYmxpbmdzKS5yZW1vdmVDbGFzcygnbXlzLXJhZGlvX19ib3gtLW5vdC1zZWxlY3RlZCcpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAkKFwiLm15cy1yYWRpby1ncm91cFwiKS5tb3VzZWxlYXZlKGZ1bmN0aW9uIChldikge1xyXG4gICAgbGV0IGNoZWNrZWRCb3ggPSAkKHRoaXMpLmZpbmQoXCJpbnB1dDpjaGVja2VkXCIpLm5leHQoXCIubXlzLXJhZGlvX19ib3hcIik7XHJcbiAgICBpZiAoY2hlY2tlZEJveC5sZW5ndGggIT09IDApIHtcclxuICAgICAgbGV0IHNpYmxpbmdzID0gJCh0aGlzKS5maW5kKFwiLm15cy1yYWRpb19fYm94XCIpO1xyXG4gICAgICAkKHNpYmxpbmdzKS5yZW1vdmVDbGFzcygnbXlzLXJhZGlvX19ib3gtLW5vdC1zZWxlY3RlZCcpO1xyXG4gICAgICAkKHNpYmxpbmdzKS5ub3QoY2hlY2tlZEJveCkuYWRkQ2xhc3MoJ215cy1yYWRpb19fYm94LS1ub3Qtc2VsZWN0ZWQnKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgdmFyIGNsYWltVHlwZSA9IGdldFVybFBhcmFtZXRlcignY2xhaW1UeXBlJyk7XHJcblxyXG4gIGlmIChjbGFpbVR5cGUpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGFpbVR5cGUnLCBjbGFpbVR5cGUpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIFN3YXAgdGV4dCBvbiB0b3AgcGFuZWwgYWNjb3JkaW9uIGJ1dHRvblxyXG4gIHZhciBvcGVuID0gZmFsc2U7XHJcbiAgdmFyIGluaXRpYWxCdXR0b25UZXh0ID0gJChcIi5hY2NvcmRpb24tdG9wcGFuZWwtYnRuXCIpLmh0bWwoKTtcclxuICAkKFwiLmFjY29yZGlvbi10b3BwYW5lbC1idG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8vIEkgZG9uJ3QgdGhpbmsgdGhpcyBpcyBhIGdvb2QgaWRlYVxyXG4gICAgLy8gY2hhbmdlIHRoZSBidXR0b24gdGV4dFxyXG4gICAgLy8gb3BlbiA9ICFvcGVuO1xyXG4gICAgLy8gaWYgKG9wZW4pIHtcclxuICAgIC8vICAgJChcIi5hY2NvcmRpb24tdG9wcGFuZWwtYnRuXCIpLmh0bWwoXCJDbG9zZVwiKTtcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgICQoXCIuYWNjb3JkaW9uLXRvcHBhbmVsLWJ0blwiKS5odG1sKGluaXRpYWxCdXR0b25UZXh0KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAkKHRoaXMpLmNsb3Nlc3QoJy51aWtpdC1hY2NvcmRpb24nKS50b2dnbGVDbGFzcyhcImFjY29yZGlvbi1jbG9zZWRcIik7XHJcbiAgICAvLyBoaWRlIHRoZSBzd2l0Y2ggYWNjb3VudCBib3hcclxuICAgICQodGhpcykuY2xvc2VzdCgnLmNvbnRhaW5lcicpLmZpbmQoXCIuc3dpdGNoLWFjY291bnQtYm94XCIpLmFkZENsYXNzKFwic3dpdGNoLWFjY291bnQtYm94LS1oaWRlXCIpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBzd2FwLWJveC11bi1oaWRlXHJcbiAgJChcIi5zd2l0Y2gtYWNjb3VudC1idXR0b25cIikuY2xpY2soZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAkKHRoaXMpLmNsb3Nlc3QoJy5jb250YWluZXInKS5maW5kKFwiLnN3aXRjaC1hY2NvdW50LWJveFwiKS50b2dnbGVDbGFzcyhcInN3aXRjaC1hY2NvdW50LWJveC0taGlkZVwiKTtcclxuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoXCJzd2l0Y2gtYWNjb3VudC1idXR0b24tLW9wZW5cIik7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICB9KTtcclxuXHJcbiAgJChcIi5zd2l0Y2gtYWNjb3VudC1ib3hfX2xpbmtcIikuY2xpY2soZnVuY3Rpb24gKGV2KSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICB9KTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vIFBvQyBmaWxlIHVwbG9hZCBmb3IgcHJvdG90eXBlXHJcbi8vIFRPRE86OiBoYW5kbGUgY2FuY2VsIFxyXG4vLyBUT0RPOjogYWRkIGFkZGl0aW9uYWwgaXRlbXMgXHJcblxyXG4oZnVuY3Rpb24gKGRvY3VtZW50LCB3aW5kb3csIGluZGV4KSB7XHJcbiAgLy8gdmFyIGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWxlLXVwbG9hZF9faW5wdXQnKTtcclxuICAvLyBpZiAoIWlucHV0cykge1xyXG4gIHZhciBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmlsZS11cGxvYWQtZGVmYXVsdF9faW5wdXQnKTtcclxuICAvLyB9XHJcblxyXG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoaW5wdXRzLCBmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgIHZhciBsYWJlbCA9IGlucHV0Lm5leHRFbGVtZW50U2libGluZyxcclxuICAgICAgbGFiZWxWYWwgPSBsYWJlbC5pbm5lckhUTUwsXHJcbiAgICAgIGNhdGVnb3J5VHIgPSBpbnB1dC5jbG9zZXN0KFwidHJcIiksXHJcbiAgICAgIGNhdGVnb3J5ID0gY2F0ZWdvcnlUci5xdWVyeVNlbGVjdG9yKCdzZWxlY3QnKSxcclxuICAgICAgY2F0ZWdvcnlOYW1lID0gJyc7XHJcblxyXG4gICAgaWYgKGNhdGVnb3J5KSB7XHJcbiAgICAgIGNhdGVnb3J5LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgY2F0ZWdvcnlOYW1lID0gdGhpcy52YWx1ZTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIHZhciBmaWxlTmFtZSA9ICcnO1xyXG5cclxuICAgICAgZmlsZU5hbWUgPSBlLnRhcmdldC52YWx1ZS5zcGxpdCgnXFxcXCcpLnBvcCgpO1xyXG5cclxuICAgICAgaWYgKGZpbGVOYW1lKSB7XHJcblxyXG4gICAgICAgIGNhdGVnb3J5Lm91dGVySFRNTCA9ICc8bGFiZWw+JyArIGNhdGVnb3J5TmFtZSArICc8L2xhYmVsPic7XHJcblxyXG4gICAgICAgIC8vIGxhYmVsLnF1ZXJ5U2VsZWN0b3IoJy5maWxlLXVwbG9hZC1kZWZhdWx0X19maWxlLW5hbWUnKS5pbm5lckhUTUwgPSBmaWxlTmFtZTtcclxuICAgICAgICBjYXRlZ29yeVRyLnF1ZXJ5U2VsZWN0b3IoJy5maWxlLXVwbG9hZC1kZWZhdWx0X19maWxlLW5hbWUnKS5pbm5lckhUTUwgPSBmaWxlTmFtZTtcclxuICAgICAgICBjYXRlZ29yeVRyLnF1ZXJ5U2VsZWN0b3IoJy5maWxlLXVwbG9hZC1kZWZhdWx0X19maWxlLW5hbWUnKS5jbGFzc0xpc3QuYWRkKCdmaWxlLXVwbG9hZC1kZWZhdWx0X19maWxlLW5hbWUtLXVwbG9hZGVkJyk7XHJcbiAgICAgICAgbGFiZWwucXVlcnlTZWxlY3RvcignLnVpa2l0LWJ0bicpLmlubmVySFRNTCA9ICdSZW1vdmUnO1xyXG4gICAgICAgIGxhYmVsLnF1ZXJ5U2VsZWN0b3IoJy51aWtpdC1idG4nKS5jbGFzc0xpc3QuYWRkKCd1aWtpdC1idG4tLXRlcnRpYXJ5Jyk7XHJcblxyXG4gICAgICAgICQoJy5maWxlLXVwbG9hZC0tYWRkJykuc2hvdygpO1xyXG4gICAgICAgICQoJy5wdC11cGxvYWQtbGlzdC1vcHRpb25hbCcpLnNob3coKTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXR1cyA9IGNhdGVnb3J5VHIucXVlcnlTZWxlY3RvcignLmZpbGUtdXBsb2FkLWRlZmF1bHRfX2ZpbGUtbmFtZScpLmNsb3Nlc3QoJ3RyJyk7XHJcbiAgICAgICAgdmFyIGNhdGVnb3J5VHJDbGFzcyA9IGNhdGVnb3J5VHI7XHJcblxyXG5cclxuICAgICAgICBzdGF0dXMgPSBzdGF0dXMucXVlcnlTZWxlY3RvcignLmZpbGUtc3RhdHVzJyk7XHJcbiAgICAgICAgaWYgKHN0YXR1cykge1xyXG4gICAgICAgICAgc3RhdHVzLmlubmVySFRNTCA9ICdSZW1vdmUnO1xyXG4gICAgICAgICAgc3RhdHVzLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInNyXCI+IFVwbG9hZGVkPC9zcGFuPic7XHJcbiAgICAgICAgICBzdGF0dXMgPSBzdGF0dXMuY2xhc3NMaXN0O1xyXG4gICAgICAgICAgc3RhdHVzLnJlbW92ZSgnZmlsZS1zdGF0dXMtLXJlcXVpcmVkJyk7XHJcbiAgICAgICAgICBzdGF0dXMuYWRkKCdmaWxlLXN0YXR1cy0tdXBsb2FkZWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhdGVnb3J5VHJDbGFzcy5jbGFzc0xpc3QuYWRkKCdmaWxlLXVwbG9hZC1kZWZhdWx0X19yb3ctLXVwbG9hZGVkJyk7XHJcblxyXG5cclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIGxhYmVsLmlubmVySFRNTCA9IGxhYmVsVmFsO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBGaXJlZm94IGJ1ZyBmaXhcclxuICAgIC8vIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgZnVuY3Rpb24gKCkgeyBpbnB1dC5jbGFzc0xpc3QuYWRkKCdoYXMtZm9jdXMnKTsgfSk7XHJcbiAgICAvLyBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgZnVuY3Rpb24gKCkgeyBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtZm9jdXMnKTsgfSk7XHJcbiAgfSk7XHJcbn0oZG9jdW1lbnQsIHdpbmRvdywgMCkpO1xyXG5cclxuXHJcblxyXG4vKiEgQGdvdi5hdS9hbmltYXRlIHYxLjAuMTIgKi9cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKlxyXG4gKiBBbmltYXRlIGZ1bmN0aW9uXHJcbiAqXHJcbiAqIEEgZnVuY3Rpb24gdG8gb3BlbiwgY2xvc2UgYW5kIHRvZ2dsZSB0aGUgZGlzcGxheSBvZiBwYWdlIGVsZW1lbnRzLlxyXG4gKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG52YXIgQVUgPSBBVSB8fCB7fTtcclxuXHJcbihmdW5jdGlvbiAoQVUpIHtcclxuXHJcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE5BTUVTUEFDRSBNT0RVTEVcclxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgdmFyIGFuaW1hdGUgPSB7fVxyXG5cclxuXHJcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFBSSVZBVEUgRlVOQ1RJT05TXHJcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8qKlxyXG4gICAqIFBSSVZBVEVcclxuICAgKiBDYWxjdWxhdGUgdGhlIHJlcXVpcmVtZW50cyBmb3IgdGhlIGRlc2lyZWQgYW5pbWF0aW9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBpbml0aWFsU2l6ZSAtIFRoZSBpbml0aWFsIHNpemUgb2YgdGhlIGVsZW1lbnQgdG8gYW5pbWF0ZVxyXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IGVuZFNpemUgICAgIC0gVGhlIHNpemUgdGhlIGVsZW1lbnQgYWZ0ZXIgdGhlIGFuaW1hdGlvbiBjb21wbGV0ZXNcclxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBzcGVlZCAgICAgICAtIFRoZSBzcGVlZCBvZiB0aGUgYW5pbWF0aW9uIGluIG1zXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgICAgICAtIFJlcXVpcmVkIHN0ZXBzLCBzdGVwU2l6ZSBhbmQgaW50ZXJ2YWxUaW1lIGZvciB0aGUgYW5pbWF0aW9uXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gQ2FsY3VsYXRlQW5pbWF0aW9uU3BlY3MoaW5pdGlhbFNpemUsIGVuZFNpemUsIHNwZWVkKSB7XHJcblxyXG4gICAgaWYgKGluaXRpYWxTaXplID09PSBlbmRTaXplKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RlcFNpemU6IDAsXHJcbiAgICAgICAgc3RlcHM6IDAsXHJcbiAgICAgICAgaW50ZXJ2YWxUaW1lOiAwLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkaXN0YW5jZSA9IGVuZFNpemUgLSBpbml0aWFsU2l6ZTsgLy8gdGhlIG92ZXJhbGwgZGlzdGFuY2UgdGhlIGFuaW1hdGlvbiBuZWVkcyB0byB0cmF2ZWxcclxuICAgIHZhciBpbnRlcnZhbFRpbWUgPSAoc3BlZWQgLyBkaXN0YW5jZSk7IC8vIHRoZSB0aW1lIGVhY2ggc2V0SW50ZXJ2YWwgaXRlcmF0aW9uIHdpbGwgdGFrZVxyXG4gICAgdmFyIHN0ZXBTaXplID0gZGlzdGFuY2UgPCAwID8gLTEgOiAxOyAvLyBpZiBkaXN0YW5jZSBpcyBuZWdhdGl2ZSB0aGVuIHdlIHNldCBzdGVwU2l6ZSB0byAtMVxyXG4gICAgdmFyIHN0ZXBzID0gTWF0aC5hYnMoZGlzdGFuY2UgLyBzdGVwU2l6ZSk7IC8vIHRoZSBhbW91bnQgb2Ygc3RlcHMgcmVxdWlyZWQgdG8gZ2V0IHRvIGVuZFNpemVcclxuICAgIGludGVydmFsVGltZSA9IHNwZWVkIC8gc3RlcHM7XHJcblxyXG4gICAgLy8gd2UgbmVlZCB0byBhZGp1c3Qgb3VyIGFuaW1hdGlvbiBzcGVjcyBpZiBpbnRlcnZhbCB0aW1lIGV4Y2VlZHMgNjBGUFMgZWcgaW50ZXJ2YWxUaW1lIDwgMTYuNjdtc1xyXG4gICAgaWYgKE1hdGguYWJzKGludGVydmFsVGltZSkgPCAoMTAwMCAvIDYwKSkge1xyXG4gICAgICBpbnRlcnZhbFRpbWUgPSAoMTAwMCAvIDYwKTsgLy8gbGV04oCZcyBub3QgZ2V0IGxvd2VyIHRoYXQgNjBGUFNcclxuICAgICAgc3RlcHMgPSBNYXRoLmNlaWwoTWF0aC5hYnMoc3BlZWQgLyBpbnRlcnZhbFRpbWUpKTsgLy8gd2Ugbm93IG5lZWQgdGhlIHN0ZXBzIGFuZCBtYWtlIHN1cmUgd2UgY2VpbCB0aGVtIHNvIC0xIHdvbid0IG1ha2UgdGhlbSBuZWdhdGl2ZVxyXG4gICAgICBzdGVwU2l6ZSA9IGRpc3RhbmNlIC8gc3RlcHM7IC8vIGxhc3QgdGhpbmcgaXMgc3RlcCBzaXplcyB3aGljaCBhcmUgZGVyaXZlZCBmcm9tIGFsbCBvZiB0aGUgYWJvdmVcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdGVwU2l6ZTogc3RlcFNpemUsXHJcbiAgICAgIHN0ZXBzOiAoc3RlcHMgLSAxKSxcclxuICAgICAgaW50ZXJ2YWxUaW1lOiBpbnRlcnZhbFRpbWUsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8gZXhwb3J0IGZvciBub2RlIGFuZCBiYWJlbCBlbnZpcm9ubWVudHNcclxuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIGFuaW1hdGUuQ2FsY3VsYXRlQW5pbWF0aW9uU3BlY3MgPSBDYWxjdWxhdGVBbmltYXRpb25TcGVjcztcclxuICB9XHJcblxyXG5cclxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUFVCTElDIEZVTkNUSU9OU1xyXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvKipcclxuICAgKiBHZXR0aW5nIGNvbXB1dGVkIENTUyBzdHlsZXMgZnJvbSBub3JtYWwgYnJvd3NlcnMgYW5kIElFXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29iamVjdH0gZWxlbWVudCAgLSBUaGUgRE9NIGVsZW1lbnQgd2Ugd2FudCB0byBnZXQgdGhlIGNvbXB1dGVkIHN0eWxlIGZyb21cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgLSBUaGUgQ1NTIHByb3BlcnR5XHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtzdHJpbmd8aW50ZWdlcn0gLSBUaGUgQ1NTIHZhbHVlIGZvciB0aGUgcHJvcGVydHlcclxuICAgKi9cclxuICBhbmltYXRlLkdldENTU1Byb3BlcnR5QmVjYXVzZUlFID0gZnVuY3Rpb24gKGVsZW1lbnQsIHByb3BlcnR5KSB7XHJcbiAgICBpZiAodHlwZW9mIGdldENvbXB1dGVkU3R5bGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVtwcm9wZXJ0eV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgc3BhY2UgPSBlbGVtZW50LmN1cnJlbnRTdHlsZVtwcm9wZXJ0eV07XHJcblxyXG4gICAgICBpZiAoc3BhY2UgPT09ICdhdXRvJykge1xyXG4gICAgICAgIHNwYWNlID0gQVUuYW5pbWF0ZS5DYWxjdWxhdGVBdXRvKGVsZW1lbnQsIHByb3BlcnR5KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHNwYWNlO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICAvKipcclxuICAgKiBDYWxjdWxhdGUgdGhlIHNpemUgb2YgdGhlIGVsZW1lbnQgd2hlbiBpdOKAmXMgZGltZW5zaW9uKGhlaWdodCBvciB3aWR0aCkgaXMgc2V0IHRvIGF1dG9cclxuICAgKlxyXG4gICAqIEBwYXJhbSAge29iamVjdH0gZWxlbWVudCAgIC0gVGhlIGVsZW1lbnQgdG8gcmVhZCBhdXRvIGhlaWdodCBmcm9tXHJcbiAgICogQHBhcmFtICB7c3RyaW5nfSBkaW1lbnNpb24gLSBUaGUgZGltZW5zaW9uIHRvIG1lYXN1cmVcclxuICAgKlxyXG4gICAqIEByZXR1cm4ge2ludGVnZXJ9ICAgICAgICAgIC0gVGhlIHNpemUgb2YgdGhlIGVsZW1lbnQgd2hlbiBhdCBkaW1lbnNpb24oaGVpZ2h0IG9yIHdpZHRoKSBpcyBzZXQgdG8gJ2F1dG8nXHJcbiAgICovXHJcbiAgYW5pbWF0ZS5DYWxjdWxhdGVBdXRvID0gZnVuY3Rpb24gKGVsZW1lbnQsIGRpbWVuc2lvbikge1xyXG4gICAgdmFyIGluaXRpYWxTaXplO1xyXG4gICAgdmFyIGVuZFNpemU7XHJcblxyXG4gICAgaWYgKGRpbWVuc2lvbiA9PT0gJ2hlaWdodCcpIHtcclxuICAgICAgaW5pdGlhbFNpemUgPSBlbGVtZW50LmNsaWVudEhlaWdodDsgLy8gZ2V0IGN1cnJlbnQgaGVpZ2h0XHJcbiAgICAgIGVsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9ICdhdXRvJzsgLy8gc2V0IGhlaWdodCB0byBhdXRvXHJcbiAgICAgIGVuZFNpemUgPSBlbGVtZW50LmNsaWVudEhlaWdodDsgLy8gZ2V0IGhlaWdodCBhZ2FpblxyXG4gICAgICBlbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSBpbml0aWFsU2l6ZSArICdweCc7IC8vIHNldCBiYWNrIHRvIGluaXRpYWwgaGVpZ2h0XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpbml0aWFsU2l6ZSA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICAgIGVsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9ICdhdXRvJztcclxuICAgICAgZW5kU2l6ZSA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICAgIGVsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9IGluaXRpYWxTaXplICsgJ3B4JztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGFyc2VJbnQoZW5kU2l6ZSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgYW55IGF1IGFuaW1hdGlvbiBvbiBhIERPTSBlbGVtZW50XHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtvYmplY3R9IGVsZW1lbnQgLSBUaGUgZWxlbWVudCB0byBzdG9wIGFuaW1hdGluZ1xyXG4gICAqL1xyXG4gIGFuaW1hdGUuU3RvcCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICBjbGVhckludGVydmFsKGVsZW1lbnQuQVVhbmltYXRpb24pO1xyXG4gIH07XHJcblxyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWFnaWNhbCBhbmltYXRpb24gZnVuY3Rpb25cclxuICAgKlxyXG4gICAqIEBwYXJhbSAge29iamVjdH0gICAgICAgICBvcHRpb25zICAgICAgICAgIC0gVGhlIG9wdGlvbnMgZm9yIHRoZSBhbmltYXRpb25cclxuICAgKiBAcGFyYW0gIHtvYmplY3R9ICAgICAgICAgb3B0aW9ucy5lbGVtZW50ICAtIEVsZW1lbnQvcyB3ZSBhcmUgYW5pbWF0aW5nIChET00gbm9kZXMpXHJcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgIG9wdGlvbnMucHJvcGVydHkgLSBUaGUgQ1NTIHByb3BlcnR5IHRvIGFuaW1hdGVcclxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfHN0cmluZ30gb3B0aW9ucy5lbmRTaXplICAtIFRoZSBzaXplIHRoZSBlbGVtZW50IHNob3VsZCBhbmltYXRlIHRvLiBDYW4gYmUgJ2F1dG8nIG9yIHBpeGVsIHZhbHVlXHJcbiAgICogQHBhcmFtICB7aW50ZWdlcn0gICAgICAgIG9wdGlvbnMuc3BlZWQgICAgLSBUaGUgc3BlZWQgb2YgdGhlIGFuaW1hdGlvbiBpbiBtaWxsaXNlY29uZHMgW29wdGlvbmFsXSBbZGVmYXVsdDogMjUwXVxyXG4gICAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICBvcHRpb25zLmNhbGxiYWNrIC0gQSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBhZnRlciB0aGUgYW5pbWF0aW9uIGVuZHMgW29wdGlvbmFsXVxyXG4gICAqXHJcbiAgICogQHJldHVybiB7dW5rbm93bn0gICAgICAgICAgICAgICAgICAgICAgICAgLSBUaGUgcmV0dXJuIHZhbHVlIHBhc3NlZCBvbiBmcm9tIG91ciBvcHRpb25zLmNhbGxiYWNrIGZ1bmN0aW9uIFtvcHRpb25hbF1cclxuICAgKi9cclxuICBhbmltYXRlLlJ1biA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAvLyBkZWZhdWx0c1xyXG4gICAgdmFyIGVsZW1lbnRzID0gb3B0aW9ucy5lbGVtZW50O1xyXG4gICAgdmFyIHNwZWVkID0gb3B0aW9ucy5zcGVlZCB8fCAyNTA7XHJcblxyXG4gICAgLy8gbWFraW5nIGEgc2luZ2xlIERPTSBlbGVtZW50IGl0ZXJhdGFibGVcclxuICAgIGlmIChlbGVtZW50cy5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBlbGVtZW50cyA9IFtlbGVtZW50c107XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWFraW5nIGEgY2FsbGJhY2sgaWYgbm9uZSB3YXMgcHJvdmlkZWRcclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5jYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBvcHRpb25zLmNhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFkZGluZyBpdGVyYXRpb24gY291bnRzXHJcbiAgICBlbGVtZW50c1swXS5BVWludGVyYXRpb24gPSAwO1xyXG4gICAgZWxlbWVudHNbMF0uQVVpbnRlcmF0aW9ucyA9IGVsZW1lbnRzLmxlbmd0aDtcclxuXHJcbiAgICAvLyBpdGVyYXRlIG92ZXIgYWxsIERPTSBub2Rlc1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgZWxlbWVudCA9IGVsZW1lbnRzW2ldOyAvLyB0aGlzIGVsZW1lbnRcclxuICAgICAgQVUuYW5pbWF0ZS5TdG9wKGVsZW1lbnQpOyAvLyBzdG9wIGFueSBwcmV2aW91cyBhbmltYXRpb25zXHJcbiAgICAgIHZhciBpbml0aWFsU2l6ZSA9IHBhcnNlSW50KEFVLmFuaW1hdGUuR2V0Q1NTUHJvcGVydHlCZWNhdXNlSUUoZWxlbWVudCwgb3B0aW9ucy5wcm9wZXJ0eSkpOyAvLyB0aGUgZWxlbWVudHMgY3VycmVudCBzaXplXHJcbiAgICAgIHZhciBlbmRTaXplID0gb3B0aW9ucy5lbmRTaXplOyAvLyB0aGUgZWxlbWVudCBlbmQgc2l6ZVxyXG5cclxuICAgICAgaWYgKG9wdGlvbnMuZW5kU2l6ZSA9PT0gJ2F1dG8nKSB7IC8vIGNhbGN1bGF0ZSB3aGF0ICdhdXRvJyBtZWFucyBpbiBwaXhlbFxyXG4gICAgICAgIGVuZFNpemUgPSBBVS5hbmltYXRlLkNhbGN1bGF0ZUF1dG8oZWxlbWVudCwgb3B0aW9ucy5wcm9wZXJ0eSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNhbGN1bGF0ZSBvdXIgYW5pbWF0aW9uIHNwZWNzXHJcbiAgICAgIHZhciBhbmltYXRpb25TcGVjcyA9IENhbGN1bGF0ZUFuaW1hdGlvblNwZWNzKGluaXRpYWxTaXplLCBlbmRTaXplLCBzcGVlZCk7XHJcbiAgICAgIHZhciBpdGVyYXRlQ291bnRlciA9IGluaXRpYWxTaXplO1xyXG5cclxuICAgICAgLy8gc2V0IHN0YXRlXHJcbiAgICAgIGlmIChhbmltYXRpb25TcGVjcy5zdGVwU2l6ZSA8IDApIHtcclxuICAgICAgICBlbGVtZW50LkFVdG9nZ2xlU3RhdGUgPSAnY2xvc2luZyc7XHJcbiAgICAgIH0gZWxzZSBpZiAoYW5pbWF0aW9uU3BlY3Muc3RlcFNpemUgPiAwKSB7XHJcbiAgICAgICAgZWxlbWVudC5BVXRvZ2dsZVN0YXRlID0gJ29wZW5pbmcnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBzY29waW5nIHZhcmlhYmxlXHJcbiAgICAgIChmdW5jdGlvbiAoZWxlbWVudCwgaW5pdGlhbFNpemUsIGl0ZXJhdGVDb3VudGVyLCBhbmltYXRpb25TcGVjcywgZW5kU2l6ZSkge1xyXG4gICAgICAgIC8vIGtlZXAgdHJhY2sgb2YgYW5pbWF0aW9uIGJ5IGFkZGluZyBpdCB0byB0aGUgRE9NIGVsZW1lbnRcclxuICAgICAgICBlbGVtZW50LkFVYW5pbWF0aW9uID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgIC8vIHdoZW4gd2UgYXJlIGF0IHRoZSBlbmRcclxuICAgICAgICAgIGlmIChpbml0aWFsU2l6ZSA9PT0gZW5kU2l6ZSB8fCBhbmltYXRpb25TcGVjcy5zdGVwcyA9PT0gMCkge1xyXG4gICAgICAgICAgICBBVS5hbmltYXRlLlN0b3AoZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlW29wdGlvbnMucHJvcGVydHldID0gZW5kU2l6ZSArICdweCc7IC8vIHNldCB0byBlbmRTaXplXHJcbiAgICAgICAgICAgIGVsZW1lbnQuQVV0b2dnbGVTdGF0ZSA9ICcnO1xyXG5cclxuICAgICAgICAgICAgZWxlbWVudHNbMF0uQVVpbnRlcmF0aW9uKys7XHJcblxyXG4gICAgICAgICAgICAvLyByZW1vdmluZyBhdXRvIHNvIENTUyBjYW4gdGFrZSBvdmVyXHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmVuZFNpemUgPT09ICdhdXRvJykge1xyXG4gICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbb3B0aW9ucy5wcm9wZXJ0eV0gPSAnJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gd2hlbiBhbGwgaXRlcmF0aW9ucyBoYXZlIGZpbmlzaGVkLCBydW4gdGhlIGNhbGxiYWNrXHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50c1swXS5BVWludGVyYXRpb24gPj0gZWxlbWVudHNbMF0uQVVpbnRlcmF0aW9ucykge1xyXG4gICAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBpZiB3ZSBhcmUgc3RpbGwgYW5pbWF0aW5nXHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaXRlcmF0ZUNvdW50ZXIgKz0gYW5pbWF0aW9uU3BlY3Muc3RlcFNpemU7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbb3B0aW9ucy5wcm9wZXJ0eV0gPSBpdGVyYXRlQ291bnRlciArICdweCc7XHJcblxyXG4gICAgICAgICAgICBhbmltYXRpb25TcGVjcy5zdGVwcy0tO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LCBNYXRoLmFicyhhbmltYXRpb25TcGVjcy5pbnRlcnZhbFRpbWUpKTtcclxuICAgICAgfSkoZWxlbWVudCwgaW5pdGlhbFNpemUsIGl0ZXJhdGVDb3VudGVyLCBhbmltYXRpb25TcGVjcywgZW5kU2l6ZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZSBhbmltYXRpb25cclxuICAgKlxyXG4gICAqIEBwYXJhbSAge29iamVjdH0gICAgICAgICBvcHRpb25zICAgICAgICAgICAgICAtIFRoZSBvcHRpb25zIGZvciB0aGUgYW5pbWF0aW9uXHJcbiAgICogQHBhcmFtICB7b2JqZWN0fSAgICAgICAgIG9wdGlvbnMuZWxlbWVudCAgICAgIC0gRWxlbWVudC9zIHdlIGFyZSBhbmltYXRpbmcgKERPTSBub2RlcylcclxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgb3B0aW9ucy5wcm9wZXJ0eSAgICAgLSBUaGUgQ1NTIHByb3BlcnR5IHRvIGFuaW1hdGUgW29wdGlvbmFsXSBbZGVmYXVsdDogJ2hlaWdodCddXHJcbiAgICogQHBhcmFtICB7aW50ZWdlcnxzdHJpbmd9IG9wdGlvbnMuY2xvc2VTaXplICAgIC0gVGhlIHNpemUgdGhlIGVsZW1lbnQgc2hvdWxkIGNsb3NlIHRvLiBDYW4gYmUgJ2F1dG8nIG9yIHBpeGVsIHZhbHVlIFtvcHRpb25hbF0gW2RlZmF1bHQ6IDBdXHJcbiAgICogQHBhcmFtICB7aW50ZWdlcnxzdHJpbmd9IG9wdGlvbnMub3BlblNpemUgICAgIC0gVGhlIHNpemUgdGhlIGVsZW1lbnQgc2hvdWxkIG9wZW4gdG8uIENhbiBiZSAnYXV0bycgb3IgcGl4ZWwgdmFsdWUgW29wdGlvbmFsXSBbZGVmYXVsdDogJ2F1dG8nXVxyXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9ICAgICAgICBvcHRpb25zLnNwZWVkICAgICAgICAtIFRoZSBzcGVlZCBvZiB0aGUgYW5pbWF0aW9uIGluIG1pbGxpc2Vjb25kcyBbb3B0aW9uYWxdIFtkZWZhdWx0OiAyNTBdXHJcbiAgICogQHBhcmFtICB7ZnVuY3Rpb259ICAgICAgIG9wdGlvbnMucHJlZnVuY3Rpb24gIC0gQSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBiZWZvcmUgZWFjaCBhbmltYXRpb24gc3RhcnRzLCBwYXNzZXMge29iamVjdH0gZWxlbWVudCwge3N0cmluZ30gc3RhdGUgW29wdGlvbmFsXVxyXG4gICAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgICAgICBvcHRpb25zLnBvc3RmdW5jdGlvbiAtIEEgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgYWZ0ZXIgZWFjaCBhbmltYXRpb24gZW5kcywgcGFzc2VzIHtvYmplY3R9IGVsZW1lbnQsIHtzdHJpbmd9IHN0YXRlIFtvcHRpb25hbF1cclxuICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gICAgICAgb3B0aW9ucy5jYWxsYmFjayAgICAgLSBBIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIGFmdGVyIHRoZSBhbmltYXRpb24gZW5kcywgcGFzc2VzIHtvYmplY3R9IGVsZW1lbnQsIHtzdHJpbmd9IHN0YXRlIFtvcHRpb25hbF1cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge3Vua25vd259ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIFRoZSByZXR1cm4gdmFsdWUgcGFzc2VkIG9uIGZyb20gb3VyIG9wdGlvbnMuY2FsbGJhY2sgZnVuY3Rpb24gW29wdGlvbmFsXVxyXG4gICAqL1xyXG4gIGFuaW1hdGUuVG9nZ2xlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHJcbiAgICB2YXIgZWxlbWVudHMgPSBvcHRpb25zLmVsZW1lbnQ7XHJcbiAgICB2YXIgcHJvcGVydHkgPSBvcHRpb25zLnByb3BlcnR5IHx8ICdoZWlnaHQnO1xyXG4gICAgdmFyIHNwZWVkID0gb3B0aW9ucy5zcGVlZCB8fCAyNTA7XHJcbiAgICB2YXIgY2xvc2VTaXplID0gb3B0aW9ucy5jbG9zZVNpemUgPT09IHVuZGVmaW5lZCA/IDAgOiBvcHRpb25zLmNsb3NlU2l6ZTtcclxuICAgIHZhciBvcGVuU2l6ZSA9IG9wdGlvbnMub3BlblNpemUgPT09IHVuZGVmaW5lZCA/ICdhdXRvJyA6IG9wdGlvbnMub3BlblNpemU7XHJcblxyXG4gICAgLy8gbWFraW5nIGEgc2luZ2xlIERPTSBlbGVtZW50IGl0ZXJhdGFibGVcclxuICAgIGlmIChlbGVtZW50cy5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBlbGVtZW50cyA9IFtlbGVtZW50c107XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWFraW5nIGEgcHJlZnVuY3Rpb24gaWYgbm9uZSB3YXMgcHJvdmlkZWRcclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5wcmVmdW5jdGlvbiAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBvcHRpb25zLnByZWZ1bmN0aW9uID0gZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1ha2luZyBhIHBvc3RmdW5jdGlvbiBpZiBub25lIHdhcyBwcm92aWRlZFxyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLnBvc3RmdW5jdGlvbiAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBvcHRpb25zLnBvc3RmdW5jdGlvbiA9IGZ1bmN0aW9uICgpIHsgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtYWtpbmcgYSBjYWxsYmFjayBpZiBub25lIHdhcyBwcm92aWRlZFxyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIG9wdGlvbnMuY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7IH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWRkaW5nIGl0ZXJhdGlvbiBjb3VudHNcclxuICAgIGVsZW1lbnRzWzBdLkFVdG9nZ2xlSW50ZXJhdGlvbiA9IDA7XHJcbiAgICBlbGVtZW50c1swXS5BVXRvZ2dsZUludGVyYXRpb25zID0gZWxlbWVudHMubGVuZ3RoO1xyXG5cclxuICAgIC8vIGl0ZXJhdGUgb3ZlciBhbGwgRE9NIG5vZGVzXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBlbGVtZW50ID0gZWxlbWVudHNbaV07XHJcblxyXG4gICAgICBBVS5hbmltYXRlLlN0b3AoZWxlbWVudCk7XHJcblxyXG4gICAgICB2YXIgdGFyZ2V0U2l6ZTsgLy8gdGhlIHNpemUgdGhlIGVsZW1lbnQgc2hvdWxkIG9wZW4vY2xvc2UgdG8gYWZ0ZXIgdG9nZ2xlIGlzIGNsaWNrZWRcclxuICAgICAgdmFyIHByZVN0YXRlID0gJyc7IC8vIHRoZSBzdGF0ZSB3ZSBhbmltYXRlIHRvIGZvciB0aGUgcHJlZnVuY3Rpb24gYW5kIGNhbGxiYWNrIGZ1bmN0aW9uc1xyXG4gICAgICB2YXIgcG9zdFN0YXRlID0gJyc7IC8vIHRoZSBzdGF0ZSB3ZSBhbmltYXRlIHRvIGZvciB0aGUgcHJlZnVuY3Rpb24gYW5kIGNhbGxiYWNrIGZ1bmN0aW9uc1xyXG4gICAgICB2YXIgY3VycmVudFNpemUgPSBwYXJzZUludChBVS5hbmltYXRlLkdldENTU1Byb3BlcnR5QmVjYXVzZUlFKGVsZW1lbnQsIG9wdGlvbnMucHJvcGVydHkpKTsgLy8gdGhlIGN1cnJlbnQgc2l6ZSBvZiB0aGUgZWxlbWVudFxyXG5cclxuICAgICAgaWYgKGN1cnJlbnRTaXplID09PSBjbG9zZVNpemUgfHwgZWxlbWVudC5BVXRvZ2dsZVN0YXRlID09PSAnY2xvc2luZycpIHtcclxuICAgICAgICB0YXJnZXRTaXplID0gb3BlblNpemU7XHJcbiAgICAgICAgcHJlU3RhdGUgPSAnb3BlbmluZyc7XHJcbiAgICAgICAgcG9zdFN0YXRlID0gJ29wZW4nO1xyXG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRTaXplICE9PSBjbG9zZVNpemUgfHwgZWxlbWVudC5BVXRvZ2dsZVN0YXRlID09PSAnb3BlbmluZycpIHtcclxuICAgICAgICB0YXJnZXRTaXplID0gY2xvc2VTaXplO1xyXG4gICAgICAgIHByZVN0YXRlID0gJ2Nsb3NpbmcnO1xyXG4gICAgICAgIHBvc3RTdGF0ZSA9ICdjbG9zZWQnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQVUuYW5pbWF0ZS5Ub2dnbGUgY2Fubm90IGRldGVybWluZSBzdGF0ZSBvZiBlbGVtZW50Jyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHJ1biBwcmVmdW5jdGlvbiBvbmNlIHBlciBlbGVtZW50XHJcbiAgICAgIG9wdGlvbnMucHJlZnVuY3Rpb24oZWxlbWVudCwgcHJlU3RhdGUpO1xyXG5cclxuICAgICAgLy8gc2hvb3Qgb2ZmIGFuaW1hdGlvblxyXG4gICAgICBBVS5hbmltYXRlLlJ1bih7XHJcbiAgICAgICAgZWxlbWVudDogZWxlbWVudCxcclxuICAgICAgICBlbmRTaXplOiB0YXJnZXRTaXplLFxyXG4gICAgICAgIHByb3BlcnR5OiBwcm9wZXJ0eSxcclxuICAgICAgICBzcGVlZDogc3BlZWQsXHJcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uICgpIHsgLy8gbWFraW5nIHN1cmUgd2UgZmlyZSB0aGUgY2FsbGJhY2sgb25seSBvbmNlXHJcbiAgICAgICAgICBlbGVtZW50c1swXS5BVXRvZ2dsZUludGVyYXRpb24rKztcclxuXHJcbiAgICAgICAgICBpZiAoZWxlbWVudHNbMF0uQVV0b2dnbGVJbnRlcmF0aW9uID09PSBlbGVtZW50c1swXS5BVWludGVyYXRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciByZXR1cm5QYXJhbSA9IG9wdGlvbnMuY2FsbGJhY2soZWxlbWVudCwgcG9zdFN0YXRlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJ1biBwb3N0ZnVuY3Rpb24gb25jZSBwZXIgZWxlbWVudFxyXG4gICAgICAgICAgICBvcHRpb25zLnBvc3RmdW5jdGlvbihlbGVtZW50LCBwb3N0U3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJldHVyblBhcmFtO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIHJ1biBwb3N0ZnVuY3Rpb24gb25jZSBwZXIgZWxlbWVudFxyXG4gICAgICAgICAgb3B0aW9ucy5wb3N0ZnVuY3Rpb24oZWxlbWVudCwgcG9zdFN0YXRlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIEFVLmFuaW1hdGUgPSBhbmltYXRlO1xyXG5cclxufShBVSkpO1xyXG5cclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gIG1vZHVsZS5leHBvcnRzID0gQVU7XHJcbn1cclxuXHJcblxyXG5pZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XHJcbiAgICB2YWx1ZTogdHJ1ZVxyXG4gIH0pO1xyXG5cclxuICBldmFsKCdleHBvcnRzLmRlZmF1bHQgPSBBVScpO1xyXG59XHJcblxyXG5cclxuXHJcbi8qISBAZ292LmF1L2FjY29yZGlvbiB2Ny4wLjcgKi9cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKlxyXG4gKiBBY2NvcmRpb24gZnVuY3Rpb25cclxuICpcclxuICogQSBjb21wb25lbnQgdG8gYWxsb3cgdXNlcnMgdG8gc2hvdyBvciBoaWRlIHBhZ2UgZWxlbWVudHMuXHJcbiAqXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbnZhciBBVSA9IEFVIHx8IHt9O1xyXG5cclxuKGZ1bmN0aW9uIChBVSkge1xyXG5cclxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gTkFNRVNQQUNFIE1PRFVMRVxyXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICB2YXIgYWNjb3JkaW9uID0ge31cclxuXHJcblxyXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBQUklWQVRFIEZVTkNUSU9OU1xyXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvKipcclxuICAgKiBQUklWQVRFXHJcbiAgICogU2V0IHRoZSBjb3JyZWN0IEFyaWEgcm9sZXMgZm9yIGdpdmVuIGVsZW1lbnQgb24gdGhlIGFjY29yZGlvbiB0aXRsZSBhbmQgYm9keVxyXG4gICAqXHJcbiAgICogQHBhcmFtICB7b2JqZWN0fSBlbGVtZW50IC0gVGhlIERPTSBlbGVtZW50IHdlIHdhbnQgdG8gc2V0IGF0dHJpYnV0ZXMgZm9yXHJcbiAgICogQHBhcmFtICB7b2JqZWN0fSB0YXJnZXQgIC0gVGhlIERPTSBlbGVtZW50IHdlIHdhbnQgdG8gc2V0IGF0dHJpYnV0ZXMgZm9yXHJcbiAgICogQHBhcmFtICB7c3RyaW5nfSBzdGF0ZSAgIC0gVGhlIERPTSBlbGVtZW50IHdlIHdhbnQgdG8gc2V0IGF0dHJpYnV0ZXMgZm9yXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gc2V0QXJpYVJvbGVzKGVsZW1lbnQsIHRhcmdldCwgc3RhdGUpIHtcclxuXHJcbiAgICBpZiAoc3RhdGUgPT09ICdjbG9zaW5nJykge1xyXG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogUFJJVkFURVxyXG4gICAqIElFOCBjb21wYXRpYmxlIGZ1bmN0aW9uIGZvciByZXBsYWNpbmcgY2xhc3NlcyBvbiBhIERPTSBub2RlXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtvYmplY3R9IGVsZW1lbnQgICAgICAtIFRoZSBET00gZWxlbWVudCB3ZSB3YW50IHRvIHRvZ2dsZSBjbGFzc2VzIG9uXHJcbiAgICogQHBhcmFtICB7b2JqZWN0fSB0YXJnZXQgICAgICAgLSBUaGUgRE9NIGVsZW1lbnQgd2Ugd2FudCB0byB0b2dnbGUgY2xhc3NlcyBvblxyXG4gICAqIEBwYXJhbSAge29iamVjdH0gc3RhdGUgICAgICAgIC0gVGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGFuaW1hdGlvbiBvbiB0aGUgZWxlbWVudFxyXG4gICAqIEBwYXJhbSAge3N0cmluZ30gb3BlbmluZ0NsYXNzIC0gVGhlIGZpcnN0Q2xhc3MgeW91IHdhbnQgdG8gdG9nZ2xlIG9uIHRoZSBET00gbm9kZVxyXG4gICAqIEBwYXJhbSAge3N0cmluZ30gY2xvc2luZ0NsYXNzIC0gVGhlIHNlY29uZENsYXNzIHlvdSB3YW50IHRvIHRvZ2dsZSBvbiB0aGUgRE9NIG5vZGVcclxuICAgKi9cclxuICBmdW5jdGlvbiB0b2dnbGVDbGFzc2VzKGVsZW1lbnQsIHN0YXRlLCBvcGVuaW5nQ2xhc3MsIGNsb3NpbmdDbGFzcykge1xyXG5cclxuICAgIGlmIChzdGF0ZSA9PT0gJ29wZW5pbmcnIHx8IHN0YXRlID09PSAnb3BlbicpIHtcclxuICAgICAgdmFyIG9sZENsYXNzID0gb3BlbmluZ0NsYXNzIHx8ICdhdS1hY2NvcmRpb24tLWNsb3NlZCc7XHJcbiAgICAgIHZhciBuZXdDbGFzcyA9IGNsb3NpbmdDbGFzcyB8fCAnYXUtYWNjb3JkaW9uLS1vcGVuJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBvbGRDbGFzcyA9IGNsb3NpbmdDbGFzcyB8fCAnYXUtYWNjb3JkaW9uLS1vcGVuJztcclxuICAgICAgdmFyIG5ld0NsYXNzID0gb3BlbmluZ0NsYXNzIHx8ICdhdS1hY2NvcmRpb24tLWNsb3NlZCc7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgb2xkQ2xhc3MpO1xyXG4gICAgYWRkQ2xhc3MoZWxlbWVudCwgbmV3Q2xhc3MpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFBSSVZBVEVcclxuICAgKiBJRTggY29tcGF0aWJsZSBmdW5jdGlvbiBmb3IgcmVtb3ZpbmcgYSBjbGFzc1xyXG4gICAqXHJcbiAgICogQHBhcmFtICB7b2JqZWN0fSBlbGVtZW50ICAgLSBUaGUgRE9NIGVsZW1lbnQgd2Ugd2FudCB0byBtYW5pcHVsYXRlXHJcbiAgICogQHBhcmFtICB7b2JqZWN0fSBjbGFzc05hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY2xhc3MgdG8gYmUgcmVtb3ZlZFxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XHJcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoXnxcXFxcYilcIiArIGNsYXNzTmFtZS5zcGxpdChcIiBcIikuam9pbihcInxcIikgKyBcIihcXFxcYnwkKVwiLCBcImdpXCIpLCBcIiBcIik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogUFJJVkFURVxyXG4gICAqIElFOCBjb21wYXRpYmxlIGZ1bmN0aW9uIGZvciBhZGRpbmcgYSBjbGFzc1xyXG4gICAqXHJcbiAgICogQHBhcmFtICB7b2JqZWN0fSBlbGVtZW50ICAgLSBUaGUgRE9NIGVsZW1lbnQgd2Ugd2FudCB0byBtYW5pcHVsYXRlXHJcbiAgICogQHBhcmFtICB7b2JqZWN0fSBjbGFzc05hbWUgLSBUaGUgbmFtZSBvZiB0aGUgY2xhc3MgdG8gYmUgYWRkZWRcclxuICAgKi9cclxuICBmdW5jdGlvbiBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xyXG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUgKyBcIiBcIiArIGNsYXNzTmFtZTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUFVCTElDIEZVTkNUSU9OU1xyXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvKipcclxuICAgKiBUb2dnbGUgYW4gYWNjb3JkaW9uIGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSAge3N0cmluZ30gIGVsZW1lbnRzICAtIFRoZSBET00gbm9kZS9zIHRvIHRvZ2dsZVxyXG4gICAqIEBwYXJhbSAge2ludGVnZXJ9IHNwZWVkICAgICAtIFRoZSBzcGVlZCBpbiBtcyBmb3IgdGhlIGFuaW1hdGlvblxyXG4gICAqIEBwYXJhbSAge29iamVjdH0gIGNhbGxiYWNrcyAtIEFuIG9iamVjdCBvZiBmb3VyIG9wdGlvbmFsIGNhbGxiYWNrczogeyBvbk9wZW4sIGFmdGVyT3Blbiwgb25DbG9zZSwgYWZ0ZXJDbG9zZSB9XHJcbiAgICpcclxuICAgKi9cclxuICBhY2NvcmRpb24uVG9nZ2xlID0gZnVuY3Rpb24gKGVsZW1lbnRzLCBzcGVlZCwgY2FsbGJhY2tzKSB7XHJcblxyXG4gICAgLy8gc3RvcCBldmVudCBwcm9wYWdhdGlvblxyXG4gICAgdHJ5IHtcclxuICAgICAgd2luZG93LmV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHsgfVxyXG5cclxuICAgIC8vIG1ha2luZyBzdXJlIHdlIGNhbiBpdGVyYXRlIG92ZXIganVzdCBvbmUgRE9NIGVsZW1lbnRcclxuICAgIGlmIChlbGVtZW50cy5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBlbGVtZW50cyA9IFtlbGVtZW50c107XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlY2sgdGhpcyBvbmNlXHJcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrcyAhPSAnb2JqZWN0Jykge1xyXG4gICAgICBjYWxsYmFja3MgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xyXG4gICAgICB2YXIgdGFyZ2V0SWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xyXG4gICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0SWQpO1xyXG5cclxuICAgICAgaWYgKHRhcmdldCA9PSBudWxsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgJ0FVLmFjY29yZGlvbi5Ub2dnbGUgY2Fubm90IGZpbmQgdGhlIHRhcmdldCB0byBiZSB0b2dnbGVkIGZyb20gaW5zaWRlIGFyaWEtY29udHJvbHMuXFxuJyArXHJcbiAgICAgICAgICAnTWFrZSBzdXJlIHRoZSBmaXJzdCBhcmd1bWVudCB5b3UgZ2l2ZSBBVS5hY2NvcmRpb24uVG9nZ2xlIGlzIHRoZSBET00gZWxlbWVudCAoYSBidXR0b24gb3IgYSBsaW5rKSB0aGF0IGhhcyBhbiBhcmlhLWNvbnRyb2xzIGF0dHJpYnV0ZSB0aGF0IHBvaW50cyAnICtcclxuICAgICAgICAgICd0byBhIGRpdiB0aGF0IHlvdSB3YW50IHRvIHRvZ2dsZS4nXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgICAgKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgQVUuYW5pbWF0ZS5Ub2dnbGUoe1xyXG4gICAgICAgICAgZWxlbWVudDogdGFyZ2V0LFxyXG4gICAgICAgICAgcHJvcGVydHk6ICdoZWlnaHQnLFxyXG4gICAgICAgICAgc3BlZWQ6IHNwZWVkIHx8IDI1MCxcclxuICAgICAgICAgIHByZWZ1bmN0aW9uOiBmdW5jdGlvbiAodGFyZ2V0LCBzdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09ICdvcGVuaW5nJykge1xyXG4gICAgICAgICAgICAgIHRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHJcbiAgICAgICAgICAgICAgLy8gcnVuIHdoZW4gb3BlbmluZ1xyXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2tzLm9uT3BlbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uT3BlbigpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyBydW4gd2hlbiBjbG9zaW5nXHJcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFja3Mub25DbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLm9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNldEFyaWFSb2xlcyhlbGVtZW50LCB0YXJnZXQsIHN0YXRlKTtcclxuICAgICAgICAgICAgdG9nZ2xlQ2xhc3NlcyhlbGVtZW50LCBzdGF0ZSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcG9zdGZ1bmN0aW9uOiBmdW5jdGlvbiAodGFyZ2V0LCBzdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09ICdjbG9zZWQnKSB7XHJcbiAgICAgICAgICAgICAgLy8gcnVuIGFmdGVyIGNsb3NpbmdcclxuICAgICAgICAgICAgICB0YXJnZXQuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgICAgICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFja3MuYWZ0ZXJDbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLmFmdGVyQ2xvc2UoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgLy8gcnVuIGFmdGVyIG9wZW5pbmdcclxuICAgICAgICAgICAgICB0YXJnZXQuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgICAgICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFja3MuYWZ0ZXJPcGVuID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja3MuYWZ0ZXJPcGVuKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0b2dnbGVDbGFzc2VzKHRhcmdldCwgc3RhdGUpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSkoZWxlbWVudCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogT3BlbiBhIGdyb3VwIG9mIGFjY29yZGlvbiBlbGVtZW50c1xyXG4gICAqXHJcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgZWxlbWVudHMgLSBUaGUgRE9NIG5vZGUvcyB0byB0b2dnbGVcclxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBzcGVlZCAgICAtIFRoZSBzcGVlZCBpbiBtcyBmb3IgdGhlIGFuaW1hdGlvblxyXG4gICAqXHJcbiAgICovXHJcbiAgYWNjb3JkaW9uLk9wZW4gPSBmdW5jdGlvbiAoZWxlbWVudHMsIHNwZWVkKSB7XHJcblxyXG4gICAgLy8gc3RvcCBldmVudCBwcm9wYWdhdGlvblxyXG4gICAgdHJ5IHtcclxuICAgICAgd2luZG93LmV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHsgfVxyXG5cclxuICAgIGlmIChlbGVtZW50cy5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBlbGVtZW50cyA9IFtlbGVtZW50c107XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgdmFyIGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcclxuICAgICAgdmFyIHRhcmdldElkID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcclxuICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldElkKTtcclxuXHJcbiAgICAgIC8vIGxldOKAmXMgZmluZCBvdXQgaWYgdGhpcyBhY2NvcmRpb24gaXMgc3RpbGwgY2xvc2VkXHJcbiAgICAgIHZhciBoZWlnaHQgPSAwO1xyXG4gICAgICBpZiAodHlwZW9mIGdldENvbXB1dGVkU3R5bGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGFyZ2V0KS5oZWlnaHQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gdGFyZ2V0LmN1cnJlbnRTdHlsZS5oZWlnaHQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwYXJzZUludChoZWlnaHQpID09PSAwKSB7XHJcbiAgICAgICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9ICcwcHgnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0YXJnZXQuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgICB0b2dnbGVDbGFzc2VzKHRhcmdldCwgJ29wZW5pbmcnKTtcclxuICAgICAgdG9nZ2xlQ2xhc3NlcyhlbGVtZW50LCAnb3BlbmluZycpO1xyXG4gICAgICBzZXRBcmlhUm9sZXMoZWxlbWVudCwgdGFyZ2V0LCAnb3BlbmluZycpO1xyXG5cclxuICAgICAgKGZ1bmN0aW9uICh0YXJnZXQsIHNwZWVkLCBlbGVtZW50KSB7XHJcbiAgICAgICAgQVUuYW5pbWF0ZS5SdW4oe1xyXG4gICAgICAgICAgZWxlbWVudDogdGFyZ2V0LFxyXG4gICAgICAgICAgcHJvcGVydHk6ICdoZWlnaHQnLFxyXG4gICAgICAgICAgZW5kU2l6ZTogJ2F1dG8nLFxyXG4gICAgICAgICAgc3BlZWQ6IHNwZWVkIHx8IDI1MCxcclxuICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzZXMoZWxlbWVudCwgJ29wZW5pbmcnKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pKHRhcmdldCwgc3BlZWQsIGVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBDbG9zZSBhIGdyb3VwIG9mIGFjY29yZGlvbiBlbGVtZW50c1xyXG4gICAqXHJcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgZWxlbWVudHMgLSBUaGUgRE9NIG5vZGUvcyB0byB0b2dnbGVcclxuICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSBzcGVlZCAgICAtIFRoZSBzcGVlZCBpbiBtcyBmb3IgdGhlIGFuaW1hdGlvblxyXG4gICAqXHJcbiAgICovXHJcbiAgYWNjb3JkaW9uLkNsb3NlID0gZnVuY3Rpb24gKGVsZW1lbnRzLCBzcGVlZCkge1xyXG5cclxuICAgIC8vIHN0b3AgZXZlbnQgcHJvcGFnYXRpb25cclxuICAgIHRyeSB7XHJcbiAgICAgIHdpbmRvdy5ldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7IH1cclxuXHJcbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgZWxlbWVudHMgPSBbZWxlbWVudHNdO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIHZhciBlbGVtZW50ID0gZWxlbWVudHNbaV07XHJcbiAgICAgIHZhciB0YXJnZXRJZCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XHJcbiAgICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRJZCk7XHJcblxyXG4gICAgICB0b2dnbGVDbGFzc2VzKGVsZW1lbnQsICdjbG9zaW5nJyk7XHJcbiAgICAgIHNldEFyaWFSb2xlcyhlbGVtZW50LCB0YXJnZXQsICdjbG9zaW5nJyk7XHJcblxyXG4gICAgICAoZnVuY3Rpb24gKHRhcmdldCwgc3BlZWQpIHtcclxuICAgICAgICBBVS5hbmltYXRlLlJ1bih7XHJcbiAgICAgICAgICBlbGVtZW50OiB0YXJnZXQsXHJcbiAgICAgICAgICBwcm9wZXJ0eTogJ2hlaWdodCcsXHJcbiAgICAgICAgICBlbmRTaXplOiAwLFxyXG4gICAgICAgICAgc3BlZWQ6IHNwZWVkIHx8IDI1MCxcclxuICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzZXModGFyZ2V0LCAnY2xvc2UnKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pKHRhcmdldCwgc3BlZWQpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG5cclxuICBBVS5hY2NvcmRpb24gPSBhY2NvcmRpb247XHJcblxyXG59KEFVKSk7XHJcblxyXG5cclxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSBBVTtcclxufVxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xyXG4gICQoXCIuYWNjb3JkaW9uXCIpLm9uKFwiY2xpY2tcIiwgXCIuYWNjb3JkaW9uLWJ1dHRvblwiLCBmdW5jdGlvbigpIHtcclxuICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwicm90YXRlLTkwXCIpKSB7XHJcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJyb3RhdGUtOTBcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKHRoaXMpLmFkZENsYXNzKFwicm90YXRlLTkwXCIpO1xyXG4gICAgfVxyXG5cclxuICAgICQodGhpcykucGFyZW50KCkuZmluZChcIi5hY2NvcmRpb24tY29udGVudFwiKS50b2dnbGUoKTtcclxuICB9KTtcclxuXHJcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcImFcIiwgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIGlmICghKHR5cGVvZiAkKHRoaXMpLmF0dHIoXCJkaXNhYmxlZFwiKSAhPT0gdW5kZWZpbmVkICYmICQodGhpcykuYXR0cihcImRpc2FibGVkXCIpICE9PSBcImRpc2FibGVkXCIgJiYgJCh0aGlzKS5hdHRyKFwiZGlzYWJsZWRcIikgIT09IFwiXCIpKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gIH0pXHJcbn0pIl0sImZpbGUiOiJtYWluLmpzIn0=
