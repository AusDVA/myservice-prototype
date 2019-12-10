/*!
 * swiped-events.js - v@version@
 * Pure JavaScript swipe events
 * https://github.com/john-doherty/swiped-events
 * @inspiration https://stackoverflow.com/questions/16348031/disable-scrolling-when-touch-moving-certain-element
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
(function (window, document) {

  'use strict';

  // patch CustomEvent to allow constructor creation (IE/Chrome)
  if (typeof window.CustomEvent !== 'function') {

    window.CustomEvent = function (event, params) {

      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };

      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };

    window.CustomEvent.prototype = window.Event.prototype;
  }

  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);
  document.addEventListener('touchend', handleTouchEnd, false);

  var xDown = null;
  var yDown = null;
  var xDiff = null;
  var yDiff = null;
  var timeDown = null;
  var startEl = null;

  function handleTouchEnd(e) {

    // if the user released on a different target, cancel!
    if (startEl !== e.target) return;

    var swipeThreshold = parseInt(startEl.getAttribute('data-swipe-threshold') || '20', 10); // default 10px
    var swipeTimeout = parseInt(startEl.getAttribute('data-swipe-timeout') || '500', 10); // default 1000ms
    var timeDiff = Date.now() - timeDown;
    var eventType = '';

    if (Math.abs(xDiff) > Math.abs(yDiff)) { // most significant
      if (Math.abs(xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
        if (xDiff > 0) {
          eventType = 'swiped-left';
        } else {
          eventType = 'swiped-right';
        }
      }
    } else {
      if (Math.abs(yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
        if (yDiff > 0) {
          eventType = 'swiped-up';
        } else {
          eventType = 'swiped-down';
        }
      }
    }

    if (eventType !== '') {

      // fire event on the element that started the swipe
      startEl.dispatchEvent(new CustomEvent(eventType, {
        bubbles: true,
        cancelable: true
      }));

      // if (console && console.log) console.log(eventType + ' fired on ' + startEl.tagName);
    }

    // reset values
    xDown = null;
    yDown = null;
    timeDown = null;
  }

  function handleTouchStart(e) {

    // if the element has data-swipe-ignore="true" we stop listening for swipe events
    if (e.target.getAttribute('data-swipe-ignore') === 'true') return;

    startEl = e.target;

    timeDown = Date.now();
    xDown = e.touches[0].clientX;
    yDown = e.touches[0].clientY;
    xDiff = 0;
    yDiff = 0;
  }

  function handleTouchMove(e) {

    if (!xDown || !yDown) return;

    var xUp = e.touches[0].clientX;
    var yUp = e.touches[0].clientY;

    xDiff = xDown - xUp;
    yDiff = yDown - yUp;
  }

}(window, document));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzd2lwZWQtZXZlbnRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogc3dpcGVkLWV2ZW50cy5qcyAtIHZAdmVyc2lvbkBcbiAqIFB1cmUgSmF2YVNjcmlwdCBzd2lwZSBldmVudHNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9qb2huLWRvaGVydHkvc3dpcGVkLWV2ZW50c1xuICogQGluc3BpcmF0aW9uIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2MzQ4MDMxL2Rpc2FibGUtc2Nyb2xsaW5nLXdoZW4tdG91Y2gtbW92aW5nLWNlcnRhaW4tZWxlbWVudFxuICogQGF1dGhvciBKb2huIERvaGVydHkgPHd3dy5qb2huZG9oZXJ0eS5pbmZvPlxuICogQGxpY2Vuc2UgTUlUXG4gKi9cbihmdW5jdGlvbiAod2luZG93LCBkb2N1bWVudCkge1xuXG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBwYXRjaCBDdXN0b21FdmVudCB0byBhbGxvdyBjb25zdHJ1Y3RvciBjcmVhdGlvbiAoSUUvQ2hyb21lKVxuICBpZiAodHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudCAhPT0gJ2Z1bmN0aW9uJykge1xuXG4gICAgd2luZG93LkN1c3RvbUV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50LCBwYXJhbXMpIHtcblxuICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHtcbiAgICAgICAgYnViYmxlczogZmFsc2UsXG4gICAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgICBkZXRhaWw6IHVuZGVmaW5lZFxuICAgICAgfTtcblxuICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcbiAgICAgIHJldHVybiBldnQ7XG4gICAgfTtcblxuICAgIHdpbmRvdy5DdXN0b21FdmVudC5wcm90b3R5cGUgPSB3aW5kb3cuRXZlbnQucHJvdG90eXBlO1xuICB9XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGhhbmRsZVRvdWNoU3RhcnQsIGZhbHNlKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgaGFuZGxlVG91Y2hNb3ZlLCBmYWxzZSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgaGFuZGxlVG91Y2hFbmQsIGZhbHNlKTtcblxuICB2YXIgeERvd24gPSBudWxsO1xuICB2YXIgeURvd24gPSBudWxsO1xuICB2YXIgeERpZmYgPSBudWxsO1xuICB2YXIgeURpZmYgPSBudWxsO1xuICB2YXIgdGltZURvd24gPSBudWxsO1xuICB2YXIgc3RhcnRFbCA9IG51bGw7XG5cbiAgZnVuY3Rpb24gaGFuZGxlVG91Y2hFbmQoZSkge1xuXG4gICAgLy8gaWYgdGhlIHVzZXIgcmVsZWFzZWQgb24gYSBkaWZmZXJlbnQgdGFyZ2V0LCBjYW5jZWwhXG4gICAgaWYgKHN0YXJ0RWwgIT09IGUudGFyZ2V0KSByZXR1cm47XG5cbiAgICB2YXIgc3dpcGVUaHJlc2hvbGQgPSBwYXJzZUludChzdGFydEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zd2lwZS10aHJlc2hvbGQnKSB8fCAnMjAnLCAxMCk7IC8vIGRlZmF1bHQgMTBweFxuICAgIHZhciBzd2lwZVRpbWVvdXQgPSBwYXJzZUludChzdGFydEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zd2lwZS10aW1lb3V0JykgfHwgJzUwMCcsIDEwKTsgLy8gZGVmYXVsdCAxMDAwbXNcbiAgICB2YXIgdGltZURpZmYgPSBEYXRlLm5vdygpIC0gdGltZURvd247XG4gICAgdmFyIGV2ZW50VHlwZSA9ICcnO1xuXG4gICAgaWYgKE1hdGguYWJzKHhEaWZmKSA+IE1hdGguYWJzKHlEaWZmKSkgeyAvLyBtb3N0IHNpZ25pZmljYW50XG4gICAgICBpZiAoTWF0aC5hYnMoeERpZmYpID4gc3dpcGVUaHJlc2hvbGQgJiYgdGltZURpZmYgPCBzd2lwZVRpbWVvdXQpIHtcbiAgICAgICAgaWYgKHhEaWZmID4gMCkge1xuICAgICAgICAgIGV2ZW50VHlwZSA9ICdzd2lwZWQtbGVmdCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXZlbnRUeXBlID0gJ3N3aXBlZC1yaWdodCc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKE1hdGguYWJzKHlEaWZmKSA+IHN3aXBlVGhyZXNob2xkICYmIHRpbWVEaWZmIDwgc3dpcGVUaW1lb3V0KSB7XG4gICAgICAgIGlmICh5RGlmZiA+IDApIHtcbiAgICAgICAgICBldmVudFR5cGUgPSAnc3dpcGVkLXVwJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBldmVudFR5cGUgPSAnc3dpcGVkLWRvd24nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50VHlwZSAhPT0gJycpIHtcblxuICAgICAgLy8gZmlyZSBldmVudCBvbiB0aGUgZWxlbWVudCB0aGF0IHN0YXJ0ZWQgdGhlIHN3aXBlXG4gICAgICBzdGFydEVsLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGV2ZW50VHlwZSwge1xuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICB9KSk7XG5cbiAgICAgIC8vIGlmIChjb25zb2xlICYmIGNvbnNvbGUubG9nKSBjb25zb2xlLmxvZyhldmVudFR5cGUgKyAnIGZpcmVkIG9uICcgKyBzdGFydEVsLnRhZ05hbWUpO1xuICAgIH1cblxuICAgIC8vIHJlc2V0IHZhbHVlc1xuICAgIHhEb3duID0gbnVsbDtcbiAgICB5RG93biA9IG51bGw7XG4gICAgdGltZURvd24gPSBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlVG91Y2hTdGFydChlKSB7XG5cbiAgICAvLyBpZiB0aGUgZWxlbWVudCBoYXMgZGF0YS1zd2lwZS1pZ25vcmU9XCJ0cnVlXCIgd2Ugc3RvcCBsaXN0ZW5pbmcgZm9yIHN3aXBlIGV2ZW50c1xuICAgIGlmIChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3dpcGUtaWdub3JlJykgPT09ICd0cnVlJykgcmV0dXJuO1xuXG4gICAgc3RhcnRFbCA9IGUudGFyZ2V0O1xuXG4gICAgdGltZURvd24gPSBEYXRlLm5vdygpO1xuICAgIHhEb3duID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgeURvd24gPSBlLnRvdWNoZXNbMF0uY2xpZW50WTtcbiAgICB4RGlmZiA9IDA7XG4gICAgeURpZmYgPSAwO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlVG91Y2hNb3ZlKGUpIHtcblxuICAgIGlmICgheERvd24gfHwgIXlEb3duKSByZXR1cm47XG5cbiAgICB2YXIgeFVwID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgdmFyIHlVcCA9IGUudG91Y2hlc1swXS5jbGllbnRZO1xuXG4gICAgeERpZmYgPSB4RG93biAtIHhVcDtcbiAgICB5RGlmZiA9IHlEb3duIC0geVVwO1xuICB9XG5cbn0od2luZG93LCBkb2N1bWVudCkpOyJdLCJmaWxlIjoic3dpcGVkLWV2ZW50cy5qcyJ9
