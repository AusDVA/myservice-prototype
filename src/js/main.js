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
        if (content.clientHeight > getOffsetDocumentTop(tab)) {
          tab.className = `${className} ${TAB_CLASS}--bottom`
          content.style.top = `${control.offsetTop + tab.offsetTop + tab.offsetHeight}px`
        } else {
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


  // Nom rep pages
  function initNomRep() {

    var repFlow = getUrlParameter('repFlow');

    if (repFlow) {

      localStorage.setItem('repFlow', repFlow);

    } else if ("repFlow" in localStorage) {

    } else {
      localStorage.setItem('repFlow', 'none');
    }

    if ((localStorage.getItem('repFlow') == 'both')) {
      // alert('asdf');
      jQuery(".pt-first-time-no").show();
      jQuery(".pt-rep-flow-representing-no").hide();
      jQuery(".pt-rep-flow-represented-no").hide();
      jQuery(".pt-rep-flow-none").hide();
      jQuery(".pt-rep-flow-representing").show();
      jQuery(".pt-rep-flow-represented").show();
    } else if ((localStorage.getItem('repFlow') == 'none')) {
      jQuery(".pt-first-time-no").show();
      jQuery(".pt-rep-flow-representing").hide();
      jQuery(".pt-rep-flow-represented").hide();
      jQuery(".pt-rep-flow-none-no").hide();
      jQuery(".pt-rep-flow-none").show();
    } else if ((localStorage.getItem('repFlow') == 'representing')) {
      jQuery(".pt-first-time-no").show();
      jQuery(".pt-rep-flow-represented").hide();
      jQuery(".pt-rep-flow-representing-no").hide();
      jQuery(".pt-rep-flow-none").hide();
      jQuery(".pt-rep-flow-representing").show();
    } else if ((localStorage.getItem('repFlow') == 'represented')) {
      jQuery(".pt-first-time-no").show();
      jQuery(".pt-rep-flow-representing").hide();
      jQuery(".pt-rep-flow-none").hide();
      jQuery(".pt-rep-flow-represented").show();
      jQuery(".pt-rep-flow-represented-no").hide();
    } else if ((localStorage.getItem('repFlow') == 'newbie')) {
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

    } else if ("bannerFlow" in localStorage) {

    } else {
      localStorage.setItem('bannerFlow', 'none');
    }

    if ((localStorage.getItem('bannerFlow') == 'all')) {
      jQuery(".pt-banner-service").show();
      jQuery(".pt-banner-nr-rep").show();
    } else if ((localStorage.getItem('bannerFlow') == 'none')) {
      jQuery(".pt-banner-service").hide();
      jQuery(".pt-banner-nr-rep").hide();
    } else if ((localStorage.getItem('bannerFlow') == 'service')) {
      jQuery(".pt-banner-service").show();
      jQuery(".pt-banner-nr-rep").hide();
    } else if ((localStorage.getItem('bannerFlow') == 'nr-rep')) {
      jQuery(".pt-banner-service").hide();
      jQuery(".pt-banner-nr-rep").show();
    }
  }

  initBanners();

  // Switch account
  function initSwitch() {

    var switchFlow = getUrlParameter('switchFlow');
    var switchId = getUrlParameter('switchId');

    if (switchFlow) {
      localStorage.setItem('switchFlow', switchFlow);
      localStorage.setItem('switchId', switchId);
      jQuery('.pt-managing-user ').slideDown('fast');
    }



    if ((localStorage.getItem('switchFlow') == 'active')) {
      // jQuery('.switch-account-button').addClass("switch-account-button--current");
      jQuery('.pt-managing-user ').show();

    } else {
      // jQuery('.switch-account-button').removeClass("switch-account-button--current");
    }
  }

  initSwitch();

  $("#returnProfile").click(function () {
    jQuery('.pt-managing-user ').slideUp('fast');
    localStorage.setItem('switchFlow', 'none');
  });

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


$(document).on("click", function () {
  $(".switch-account-box").addClass("switch-account-box--hide");
});



// local storage a user 
// to generate more users, go to www.json-generator.com and paste in the data from /docs/data/user.generator 
// and paste in the generated users in to /docs/data/user.json

if (typeof (Storage) !== "undefined") {

  // Pull in the json content 
  $.ajax({
    url: '/docs/data/user.json',
    async: false,
    dataType: 'json'
  }).done(function (data) {

    console.log('User data back');


    $.each(data, function (index, element) {

      // console.log(element);

    });



    // Switch account
    function writeUser() {
      const user = JSON.parse(localStorage.getItem('person'));
      console.log('writing user');
      var userHtml = '';

      // localStorage.setItem('switchId');
      // localStorage.removeItem('switchId');
      // localStorage.setItem('switchFlow', 'none');
      // console.log(user);


      if (user.reps.length > 0) {
        user.numberOfClients = user.clients.length;
        $('.pt-switch-account').show();
      } else {
        user.numberOfClients = 'none';
        $('.pt-switch-account').hide();
      }

      var start = '<div class="pt-flex-grid"><div class="pt-col">';
      var end = '</div></div>'
      userHtml += start + 'Name </div><div class="pt-col">' + user.nameFull + end;
      // userHtml += start + 'DOB </div><div class="pt-col">' + moment(user.dob).format('YYYY-MM-DD') + end;
      // userHtml += start + 'DVA Number </div><div class="pt-col">' + user.dVAClientNumber + end;
      userHtml += start + 'Is a veteran </div><div class="pt-col">' + user.veteran + end;
      userHtml += start + 'Number of clients </div><div class="pt-col">' + user.numberOfClients + end;
      // userHtml += start + 'Last payment</div><div class="pt-col">' + user.lastPayment + end;



      user.picture = '<img class="pt-image-circle" src="' + user.picture + '">';

      $('#userContainerId').html(userHtml);
      $('.pt-current-user-name-picture').html(user.picture);
      $('.pt-current-user-name-first').html(user.name.first);
      $('.pt-current-user-name-full').html(user.nameFull);

      var clientListHtml = '';

      $.each(user.clients, function (key, client) {

        clientListHtml += '<li><a href="/auth?switchFlow=active&switchId=' + client.id + '" class="switch-account-box__link"><strong>';
        clientListHtml += client.nameFull + '</strong>';
        clientListHtml += ' (' + client.role + ')</a></li>';
      });

      if ((user.reps.length > 0) && (localStorage.getItem('switchFlow') == 'active')) {
        $('.pt-current-user-name-first').html(user.clients[localStorage.getItem('switchId')].nameFull);
        $('.pt-current-user-name-full').html(user.clients[localStorage.getItem('switchId')].nameFull);
      }



      console.log('user - CHANGE');


      $('.pt-current-user-client-list').html(clientListHtml);

    }

    writeUser();




    var $userSelect = $('#user-drop-down');
    $userSelect.empty();
    $.each(data, function (key, value) {
      $userSelect.append('<option value=' + value._id + '>' + value.nameFull + '</option>');
    });

    $userSelect.change(function () {

      var selectedId = this.value;

      $.each(data, function (index, element) {

        if (element._id === selectedId) {
          console.log('index = ' + index);
          localStorage.setItem('person', JSON.stringify(data[index]));
          writeUser();
        }

      });


    });



    //   $("#highest-rank").change(function () {
    //     if (22 < this.value && this.value < 30) {
    //       console.log(this);
    //       console.log($("#highest-rank option:selected").text());
    //       var content = $("#highest-rank option:selected").text();;


    //       $("#rank-info-chosen").html(content);

    //       $("#rank-info").show();
    //     } else {
    //       $("#rank-info").hide();
    //     }
    //   });
    // });



    // $.each(user, function (index, element) {

    // if (element.army) {
    //   armArmy = element.army;
    // }
    // if (element.navy) {
    //   armNavy = element.navy;
    // }
    // if (element.airforce) {
    //   armAirforce = element.airforce;
    // }

    // console.log(element);

    // });







  });
} else {
  alert("Sorry, your browser does not support web storage...");
}

$(document).keypress(function (e) {
  switch (e.which) {
    case 96: //tilda
      $('.pt-choose-user').toggle();
      break;
    default:
  }

  // alert(e.which);
});





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
      options.callback = function () {};
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
      options.prefunction = function () {};
    }

    // making a postfunction if none was provided
    if (typeof options.postfunction !== 'function') {
      options.postfunction = function () {};
    }

    // making a callback if none was provided
    if (typeof options.callback !== 'function') {
      options.callback = function () {};
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
    } catch (error) {}

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
    } catch (error) {}

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