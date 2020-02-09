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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJub20tcmVwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLy8gTm9tIHJlcCBwYWdlc1xualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoJCkge1xuXG4gIGZ1bmN0aW9uIGluaXROb21SZXAoKSB7XG5cbiAgICB2YXIgcmVwRmxvdyA9IGdldFVybFBhcmFtZXRlcigncmVwRmxvdycpO1xuXG4gICAgaWYgKHJlcEZsb3cpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHJlcEZsb3csIHRydWUpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlcEZsb3cnLCByZXBGbG93KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoJ2FzZGZhc2RmZyBlLmcuICAnICsgbG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgbG9jYXRpb24uaG9zdCArIGxvY2F0aW9uLnBhdGhuYW1lICsgJz9mbG93PXN0dWRlbnRGbG93JnN0dWRlbnRBZ2U9MTAnKTtcbiAgICB9XG4gIH1cblxuICBpbml0Tm9tUmVwKCk7XG59KTsiXSwiZmlsZSI6Im5vbS1yZXAuanMifQ==
