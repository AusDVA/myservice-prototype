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
