'use strict';

// Nom rep pages
jQuery(document).ready(function ($) {

  function initNomRep() {

    var repFlow = getUrlParameter('repFlow');

    if (repFlow) {
      localStorage.setItem(repFlow, true);
      localStorage.setItem('repFlow', repFlow);
    } else {
      alert('asdfasdfg e.g.  ' + location.protocol + '//' + location.host + location.pathname + '?flow=studentFlow&studentAge=10');
    }
  }

  initNomRep();
});