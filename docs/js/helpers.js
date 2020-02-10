// client side helper functions

var helpers = {
  //storeFormElements will grab all inputs on the page and saves them in session storage
  storeFormElements: function() {
    let formElements = document.querySelectorAll(
      "input[id], textarea.uikit-text-input"
    );

    if (btnNext) {
      // inputs saved to session storage when the next button is selected on each page
      document.getElementById("btnNext").addEventListener("click", function() {
        return formElements.forEach(element =>
          //checking for the selected input & if the textarea has any text
          (element && element.checked) ||
          (element.nodeName === "TEXTAREA" && element.value)
            ? //storing in session storage
              sessionStorage.setItem(element.id.slice(0, -2), element.value)
            : ""
        );
      });
    }
  }
};

// helper methods to be run on document ready
$(document).ready(function() {
  helpers.storeFormElements();
});

//  : " "

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJoZWxwZXJzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGNsaWVudCBzaWRlIGhlbHBlciBmdW5jdGlvbnNcblxudmFyIGhlbHBlcnMgPSB7XG4gIC8vc3RvcmVGb3JtRWxlbWVudHMgd2lsbCBncmFiIGFsbCBpbnB1dHMgb24gdGhlIHBhZ2UgYW5kIHNhdmVzIHRoZW0gaW4gc2Vzc2lvbiBzdG9yYWdlXG4gIHN0b3JlRm9ybUVsZW1lbnRzOiBmdW5jdGlvbigpIHtcbiAgICBsZXQgZm9ybUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgIFwiaW5wdXRbaWRdLCB0ZXh0YXJlYS51aWtpdC10ZXh0LWlucHV0XCJcbiAgICApO1xuXG4gICAgaWYgKGJ0bk5leHQpIHtcbiAgICAgIC8vIGlucHV0cyBzYXZlZCB0byBzZXNzaW9uIHN0b3JhZ2Ugd2hlbiB0aGUgbmV4dCBidXR0b24gaXMgc2VsZWN0ZWQgb24gZWFjaCBwYWdlXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bk5leHRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZm9ybUVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PlxuICAgICAgICAgIC8vY2hlY2tpbmcgZm9yIHRoZSBzZWxlY3RlZCBpbnB1dCAmIGlmIHRoZSB0ZXh0YXJlYSBoYXMgYW55IHRleHRcbiAgICAgICAgICAoZWxlbWVudCAmJiBlbGVtZW50LmNoZWNrZWQpIHx8XG4gICAgICAgICAgKGVsZW1lbnQubm9kZU5hbWUgPT09IFwiVEVYVEFSRUFcIiAmJiBlbGVtZW50LnZhbHVlKVxuICAgICAgICAgICAgPyAvL3N0b3JpbmcgaW4gc2Vzc2lvbiBzdG9yYWdlXG4gICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oZWxlbWVudC5pZC5zbGljZSgwLCAtMiksIGVsZW1lbnQudmFsdWUpXG4gICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcblxuLy8gaGVscGVyIG1ldGhvZHMgdG8gYmUgcnVuIG9uIGRvY3VtZW50IHJlYWR5XG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgaGVscGVycy5zdG9yZUZvcm1FbGVtZW50cygpO1xufSk7XG5cbi8vICA6IFwiIFwiXG4iXSwiZmlsZSI6ImhlbHBlcnMuanMifQ==
