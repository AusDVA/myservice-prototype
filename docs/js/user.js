"use strict";

// utility functions 
// returns age from date of birth string 
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
    age--;
  }

  return age;
} // returns serializes form data from a form 


function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};
  $.map(unindexed_array, function (n, i) {
    indexed_array[n['name']] = n['value'];
  });
  return indexed_array;
}

function guidGenerator() {
  var S4 = function S4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  };

  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
} // end utility functions 
// call up the persona panel via keyboard 


$(document).keypress(function (e) {
  switch (e.which) {
    case 126:
      //tilda + shift
      $('.pt-persona-switcher').toggle(); // addListeners();

      break;

    default:
  }
}); // window.onload = addListeners();
// function addListeners() {
//   document.getElementsByClassName('pt-persona-switcher')[0].addEventListener('mousedown', mouseDown, false);
//   window.addEventListener('mouseup', mouseUp, false);
// }
// function mouseUp() {
//   window.removeEventListener('mousemove', divMove, true);
// }
// function mouseDown(e) {
//   window.addEventListener('mousemove', divMove, true);
// }
// function divMove(e) {
//   var div = document.getElementsByClassName('pt-persona-switcher')[0];
//   div.style.position = 'absolute';
//   div.style.top = e.clientY + 'px';
//   div.style.left = e.clientX + 'px';
// }
// or via logo long press
// // grab the element
// var el = document.getElementById('mys-logo');
// // listen for the long-press event
// el.addEventListener('long-press', function (e) {
//   // stop the event from bubbling up
//   e.preventDefault()
//   $('.pt-persona-switcher').toggle();
// });

document.addEventListener('swiped-left', function (e) {
  console.log(e.target); // element that was swiped

  $('.pt-persona-switcher').toggle();
});

function initNomRep() {
  var repFlow = getUrlParameter('repFlow');

  if (repFlow) {
    localStorage.setItem('repFlow', repFlow);
  } else if ("repFlow" in localStorage) {} else {
    localStorage.setItem('repFlow', 'none');
  }

  if (localStorage.getItem('repFlow') == 'both') {
    jQuery(".pt-first-time-no").show();
    jQuery(".pt-rep-flow-representing-no").hide();
    jQuery(".pt-rep-flow-represented-no").hide();
    jQuery(".pt-rep-flow-none").hide();
    jQuery(".pt-rep-flow-representing").show();
    jQuery(".pt-rep-flow-represented").show();
  } else if (localStorage.getItem('repFlow') == 'none') {
    jQuery(".pt-first-time-no").show();
    jQuery(".pt-rep-flow-representing").hide();
    jQuery(".pt-rep-flow-represented").hide();
    jQuery(".pt-rep-flow-none-no").hide();
    jQuery(".pt-rep-flow-none").show();
  } else if (localStorage.getItem('repFlow') == 'representing') {
    jQuery(".pt-first-time-no").show();
    jQuery(".pt-rep-flow-represented").hide();
    jQuery(".pt-rep-flow-representing-no").hide();
    jQuery(".pt-rep-flow-none").hide();
    jQuery(".pt-rep-flow-representing").show();
  } else if (localStorage.getItem('repFlow') == 'represented') {
    jQuery(".pt-first-time-no").show();
    jQuery(".pt-rep-flow-representing").hide();
    jQuery(".pt-rep-flow-none").hide();
    jQuery(".pt-rep-flow-represented").show();
    jQuery(".pt-rep-flow-represented-no").hide();
  } else if (localStorage.getItem('repFlow') == 'newbie') {
    jQuery(".pt-first-time-no").hide();
    jQuery(".pt-first-time").show();
  }
}

initNomRep(); // banners

function initBanners() {
  var bannerFlow = getUrlParameter('bannerFlow');

  if (bannerFlow) {
    localStorage.setItem('bannerFlow', bannerFlow);
  } else if ("bannerFlow" in localStorage) {} else {
    localStorage.setItem('bannerFlow', 'none');
  }

  if (localStorage.getItem('bannerFlow') == 'all') {
    jQuery(".pt-banner-service").show();
    jQuery(".pt-banner-nr-rep").show();
  } else if (localStorage.getItem('bannerFlow') == 'none') {
    jQuery(".pt-banner-service").hide();
    jQuery(".pt-banner-nr-rep").hide();
  } else if (localStorage.getItem('bannerFlow') == 'service') {
    jQuery(".pt-banner-service").show();
    jQuery(".pt-banner-nr-rep").hide();
  } else if (localStorage.getItem('bannerFlow') == 'nr-rep') {
    jQuery(".pt-banner-service").hide();
    jQuery(".pt-banner-nr-rep").show();
  }
}

initBanners(); // Switch account

function initSwitch() {
  var switchFlow = getUrlParameter('switchFlow');
  var switchId = getUrlParameter('switchId');

  if (switchFlow) {
    localStorage.setItem('switchFlow', switchFlow);
    localStorage.setItem('switchId', switchId);
    jQuery('.pt-managing-user ').slideDown('fast');
  }

  if (localStorage.getItem('switchFlow') == 'active') {
    jQuery('.pt-managing-user ').show();
  } else {} // jQuery('.switch-account-button').removeClass("switch-account-button--current");
  // hide switch account overlay when clicking elsewhere on the page


  $(document).on("click", function () {
    $(".switch-account-box").addClass("switch-account-box--hide");
  });
}

initSwitch(); // to generate more users, go to www.json-generator.com and paste in the data from /docs/data/user.generator 
// and paste in the generated users in to /docs/data/user.json
// Pull in the json content 

$.ajax({
  url: '/docs/data/user.json',
  async: false,
  dataType: 'json'
}).done(function (data) {
  console.log('User data back');
  localStorage.setItem('allPersons', JSON.stringify(data.person)); // set the default MyService user if no user has been requested 

  if (!localStorage.getItem('person')) {
    localStorage.setItem('person', JSON.stringify(data.person[0]));
    console.log('setting the default user');
  } // populate the user dropdown list with users from the json


  var $userSelect = $('#user-drop-down');
  $userSelect.empty();
  $userSelect.append('<option>-- Select a user --</option>');
  $.each(data.person, function (key, value) {
    $userSelect.append('<option value=' + value._id + '>' + value.nameFull + '</option>');
  }); // switch the user 

  $userSelect.change(function () {
    var selectedId = this.value;
    sessionStorage.removeItem('usersClients');
    sessionStorage.removeItem('usersReps');
    sessionStorage.removeItem('sessionGuid');
    $.each(data.person, function (index, element) {
      if (element._id === selectedId) {
        localStorage.setItem('person', JSON.stringify(data.person[index]));
        localStorage.setItem('switchId', 'none');
        jQuery('.pt-managing-user').slideUp('fast');
        localStorage.setItem('switchFlow', 'none');
        writeUser();
      }
    });
  });
  writeUser();
}); // put the user from user.js in to local storage and the users clients in to session storage 

function writeUser() {
  console.log('Writing user  ');
  var user = JSON.parse(localStorage.getItem('person'));
  var sessionClients = JSON.parse(sessionStorage.getItem('usersClients'));
  var sessionReps = JSON.parse(sessionStorage.getItem('usersReps'));
  window.allClients = [];
  window.allReps = [];

  if (sessionClients) {
    $.each(sessionClients, function (index, client) {
      // add new form data to an existing client
      window.allClients.push(client);
    });
  } else {
    // no client data in session so get it from the user 
    $.each(user.clients, function (index, client) {
      window.allClients.push(client);
    });
  }

  if (sessionReps) {
    $.each(sessionReps, function (index, rep) {
      // add new form data to an existing rep
      window.allReps.push(rep);
    });
  } else {
    // no rep data in session so get it from the user 
    $.each(user.reps, function (index, rep) {
      window.allReps.push(rep);
    });
  }

  sessionStorage.setItem('usersClients', JSON.stringify(window.allClients)); // sessionStorage.setItem('usersMultipleClients', JSON.stringify(window.allClients));

  sessionStorage.setItem('usersReps', JSON.stringify(window.allReps));
  var firstTimeUser = true;

  if (sessionStorage.getItem('sessionGuid')) {
    firstTimeUser = false;
  } // count number of clients 


  var sessionClientSubmitted = false;
  var sessionRepSubmitted = false;

  if (window.allClients.length > 0 && window.allReps.length > 0) {
    // console.log(' both');
    localStorage.setItem('repFlow', 'both');
    $('.pt-switch-account').show();

    if (user.clients) {
      sessionClientSubmitted = true;
    }
  } else if (window.allClients.length > 0) {
    console.log(' representing');
    localStorage.setItem('repFlow', 'representing');

    if (user.clients) {
      sessionClientSubmitted = true;
    }
  } else if (window.allReps.length > 0) {
    console.log(' represented');
    localStorage.setItem('repFlow', 'represented');

    if (user.reps) {
      sessionRepSubmitted = true;
    }
  } // if (sessionReps) {
  //   localStorage.setItem('repFlow', 'representing');
  //   if (sessionReps.rep[0].submittedApplication == "true") {
  //     localStorage.setItem('repFlow', 'representing');
  //     var sessionRepSubmitted = true;
  //     user.reps.push(sessionReps.rep[0]);
  //   }
  //   if (sessionReps.rep[0].role == "Cease") {
  //     user.numberOfReps = 0
  //     user.reps.length = 0;
  //     sessionRepSubmitted = false;
  //     localStorage.setItem('repFlow', 'none');
  //     sessionStorage.removeItem('usersReps');
  //     if (!window.location.hash) {
  //       window.location = window.location + '#rep-list';
  //       window.location.reload();
  //     }
  //   }
  // }
  // set


  if (user.clients.length > 0 || sessionClientSubmitted === true) {
    if (user.clients.length > 0) {
      user.numberOfClients = user.clients.length;
    } else {
      user.numberOfClients = window.allClients.length;
    }
  } else if (user.clients.length < 1) {
    user.numberOfClients = 0;
  }

  if (user.reps.length > 0 || sessionRepSubmitted === true) {
    if (user.reps.length > 0) {
      user.numberOfReps = user.reps.length;
    } else {
      user.numberOfReps = window.allReps.length;
    }
  } else if (user.reps.length < 1) {
    user.numberOfReps = 0; // localStorage.setItem('repFlow', 'newbie');
  }

  if (user.claims) {
    user.numberOfClaims = user.claims.length;
  } else {
    user.numberOfClaims = 0;
  } // show hide the switch account buttons
  // console.log('sessionClientSubmitted -> ' + sessionClientSubmitted);
  // console.log('window.allClients.length -> ' + window.allClients.length);


  if (sessionRepSubmitted === true && sessionClientSubmitted === true) {
    localStorage.setItem('repFlow', 'both');
    $('.pt-switch-account').show();
    firstTimeUser = false;
  } else if (sessionRepSubmitted === true || user.numberOfReps > 0) {
    // localStorage.setItem('repFlow', 'represented');
    firstTimeUser = false;
  } else if (sessionClientSubmitted === true || window.allClients.length > 0) {
    // localStorage.setItem('repFlow', 'representing');
    $('.pt-switch-account').show();
    firstTimeUser = false;
  } else {
    $('.pt-switch-account').hide(); // alert('hiding');
  }

  if (firstTimeUser) {
    localStorage.setItem('repFlow', 'newbie');
  }

  var practitioners = "";
  $.ajax({
    url: '/docs/data/medical-practitioner.json',
    type: 'GET',
    dataType: 'json',
    async: false
  }).done(function (data) {
    practitioners = "<ul>";
    $.each(data.practitioners, function (index, pract) {
      if (user.practitioners.includes(pract._id)) {
        practitioners += "<li>".concat(pract.nameFull, "</li>");
      }
    });
    practitioners += "</ul>";
  });
  var userHtml = '';
  var start = '<div class="pt-flex-grid"><div class="pt-col">';
  var end = '</div></div>';
  userHtml += start + 'Name </div><div class="pt-col">' + user.nameFull + end;
  userHtml += start + 'Age </div><div class="pt-col">' + getAge(user.dob) + end;
  userHtml += start + 'Is a veteran </div><div class="pt-col">' + user.veteran + end;
  userHtml += start + 'Practitioners </div><div class="pt-col">' + practitioners + end;
  userHtml += start + 'Currently Serving </div><div class="pt-col">' + user.isCurrentlyServing + end;
  userHtml += start + 'Clients </div><div class="pt-col">' + user.numberOfClients + end;
  userHtml += start + 'Reps </div><div class="pt-col">' + user.numberOfReps + end;
  userHtml += start + 'Last payment </div><div class="pt-col">' + user.lastPayment + end;
  userHtml += start + 'Claims </div><div class="pt-col">' + user.numberOfClaims + end;
  userHtml += start + 'Story </div><div class="pt-col">' + user.story + end;
  user.picture = '<img class="pt-image-circle" src="' + user.picture + '">';
  $('#userContainerId').html(userHtml);
  $('.pt-current-user-name-picture').html(user.picture);
  $('.pt-current-user-name-first').html(user.name.first);
  $('.pt-current-user-name-full').html(user.nameFull);
  $('.pt-current-user-last-payment').html(user.lastPayment);
  $('.pt-current-user-number-of-claims').html(user.numberOfClaims);
}

function writeClient(form) {
  var formData = getFormData(form);
  var clients = sessionStorage.getItem('usersClients');

  if (clients) {
    // clients in session data
    console.log('There are clients in session');
    var existingClient = false;
    var parsedClients = JSON.parse(clients);
    var sessionGuid = sessionStorage.getItem('sessionGuid');
    $.each(parsedClients, function (index, element) {
      if (element.id === sessionGuid) {
        console.log('writing to an EXISTING client'); // add new form data to an existing client

        $.extend(true, window.allClients[index], formData);
        existingClient = true;
      }
    });

    if (existingClient === false) {
      console.log('writing to a NEW client');
      window.allClients.push(formData);
    }
  } else {
    console.log('no clients so writing to a NEW client');
    window.allClients.push(formData);
  }

  sessionStorage.setItem('usersClients', JSON.stringify(window.allClients));
}

function writeRep(form) {
  var formData = getFormData(form);
  var reps = sessionStorage.getItem('usersReps');

  if (reps) {
    // reps in session data
    console.log('There are reps in session');
    var existingRep = false;
    var parsedReps = JSON.parse(reps);
    var sessionGuid = sessionStorage.getItem('sessionGuid');
    $.each(parsedReps, function (index, element) {
      if (element.id === sessionGuid) {
        console.log('writing to an EXISTING client'); // add new form data to an existing client

        $.extend(true, window.allReps[index], formData);
        existingRep = true;
      }
    });

    if (existingRep === false) {
      console.log('writing to a NEW client');
      window.allReps.push(formData);
    }
  } else {
    console.log('no reps so writing to a NEW client');
    window.allReps.push(formData);
  }

  sessionStorage.setItem('usersReps', JSON.stringify(window.allReps));
}

function readClient() {
  console.log('Reading client data');
  var urlId = getUrlParameter('id');

  if (urlId) {
    sessionStorage.setItem('sessionGuid', urlId);
  }

  var clients = sessionStorage.getItem('usersClients');
  var parsedClients = JSON.parse(clients);
  var user = localStorage.getItem('person');
  var parsedUser = JSON.parse(user);
  var sessionGuid = sessionStorage.getItem('sessionGuid');

  if (parsedClients) {
    var clientListHtml = '';
    var clientListFullHtml = '';
    var switchId = localStorage.getItem('switchId');
    $.each(parsedClients, function (index, client) {
      // write the client currently being worked on
      if (client.id === sessionGuid) {
        $.each(client, function (index, client) {
          $('.pt-current-client-' + index).html(client);
        });
      }

      if (client.id == switchId) {
        this.nameFull = this.nameFirst + ' ' + this.nameLast;
        $('.pt-current-user-name-first').html(this.nameFirst);
        $('.pt-current-user-name-full').html(this.nameFull);
      }

      if (client.role !== "Cease") {
        client.nameFull = client.nameFirst + ' ' + client.nameLast; // switch list

        clientListHtml += '<li><a href="/auth?switchFlow=active&switchId=' + client.id + '" class="switch-account-box__link"><strong>';
        clientListHtml += client.nameFirst + ' ' + client.nameLast + '</strong>';
        clientListHtml += ' (' + client.role + ')</a></li>'; // all clients list

        clientListFullHtml += '<div class="row"><div class="col-sm-12 margin-below--mid"><div class="horizontal-card-section">';
        clientListFullHtml += '<div class="card card--horizontal flex-container"><div class="flex-item flex-item--icon-only">';
        clientListFullHtml += '<span class="fal fa-icon-nr fa-user-edit"></span> </div><div class="flex-item flex-item--large"><p><strong>';
        clientListFullHtml += client.nameFirst + ' ' + client.nameLast;
        clientListFullHtml += '</strong></p>  <p><strong> Your current role: </strong>';
        clientListFullHtml += client.role;
        clientListFullHtml += '</p><p> <strong> Representation date: </strong>';
        clientListFullHtml += client.startDateDd + ' / ' + client.startDateMm + ' / ' + client.startDateYyyy;
        clientListFullHtml += ' to ';

        if (client.endDateDd) {
          clientListFullHtml += client.endDateDd + ' / ' + client.endDateMm + ' / ' + client.endDateYyyy;
        } else {
          clientListFullHtml += '(no fixed end date)</p>';
        }

        if (client.enquireOnline) {
          clientListFullHtml += '<p><strong> Online access: </strong>';
          clientListFullHtml += client.enquireOnline + '</p>';
        }

        clientListFullHtml += '</div><div class="flex-item flex-item--right-align"><p><button class="uikit-btn small uikit-btn--tertiary" onclick="window.location.href=\'/auth/profile/nomrep/form-client-3';
        clientListFullHtml += '?state=edit&id=' + client.id + '\'">';
        clientListFullHtml += 'Edit Role</button></p></div></div></div></div></div>';
      }
    }); // add current user to the list

    clientListHtml += '<li><a id="returnProfile" href="javascript:void(0);" class="switch-account-box__link switch-account-box__link--self">';
    clientListHtml += '<i class="far fa-repeat-alt"></i> Back to my own account</a></li>';
    $('.pt-current-user-client-list').html(clientListHtml);
    $('.pt-client-list-full').html(clientListFullHtml); // hide the return to profile banner 

    $("#returnProfile").click(function () {
      jQuery('.pt-managing-user').slideUp('fast');
      localStorage.setItem('switchFlow', 'none');
      writeUser();
      window.reload();
    });
  }
}

readClient();

function readRep() {
  console.log('Reading rep data');
  var reps = sessionStorage.getItem('usersReps');
  var parsedReps = JSON.parse(reps);
  var sessionGuid = sessionStorage.getItem('sessionGuid');

  if (parsedReps) {
    var repListFullHtml = '';
    $.each(parsedReps, function (index, rep) {
      // write the rep currently being worked on
      if (rep.id === sessionGuid) {
        $.each(rep, function (index, rep) {
          $('.pt-current-rep-' + index).html(rep);
        });
      }

      if (rep.role !== "Cease") {
        rep.nameFull = rep.nameFirst + ' ' + rep.nameLast; // all reps list

        repListFullHtml += '<div class="row"><div class="col-sm-12 margin-below--mid"><div class="horizontal-card-section">';
        repListFullHtml += '<div class="card card--horizontal flex-container"><div class="flex-item flex-item--icon-only">';
        repListFullHtml += '<span class="fal fa-icon-nr fa-user-edit"></span> </div><div class="flex-item flex-item--large"><p><strong>';
        repListFullHtml += rep.nameFirst + ' ' + rep.nameLast;
        repListFullHtml += '</strong></p>  <p><strong> Your current role: </strong>';
        repListFullHtml += rep.role;
        repListFullHtml += '</p><p> <strong> Representation date: </strong>';
        repListFullHtml += rep.startDateDd + ' / ' + rep.startDateMm + ' / ' + rep.startDateYyyy;
        repListFullHtml += ' to ';

        if (rep.endDateDd) {
          repListFullHtml += rep.endDateDd + ' / ' + rep.endDateMm + ' / ' + rep.endDateYyyy;
        } else {
          repListFullHtml += '(no fixed end date)</p>';
        }

        if (rep.enquireOnline) {
          repListFullHtml += '<p><strong> Online access: </strong>';
          repListFullHtml += rep.enquireOnline + '</p>';
        }

        repListFullHtml += '</div><div class="flex-item flex-item--right-align"><p><button class="uikit-btn small uikit-btn--tertiary" onclick="window.location.href=\'/auth/profile/nomrep/form-rep-3';
        repListFullHtml += '?state=edit&id=' + rep.id + '\'">';
        repListFullHtml += 'Edit Role</button></p></div></div></div></div></div>';
      }
    }); // $('.pt-current-user-rep-list').html(repListHtml);

    $('.pt-rep-list-full').html(repListFullHtml);
  }
}

var currentPerson = JSON.parse(localStorage.getItem('person'));

if (!currentPerson.cards || currentPerson.cards.length < 1) {
  $("#healthcard").hide();
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiZ2V0QWdlIiwiZGF0ZVN0cmluZyIsInRvZGF5IiwiRGF0ZSIsImJpcnRoRGF0ZSIsImFnZSIsImdldEZ1bGxZZWFyIiwibSIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImdldEZvcm1EYXRhIiwiJGZvcm0iLCJ1bmluZGV4ZWRfYXJyYXkiLCJzZXJpYWxpemVBcnJheSIsImluZGV4ZWRfYXJyYXkiLCIkIiwibWFwIiwibiIsImkiLCJndWlkR2VuZXJhdG9yIiwiUzQiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJzdWJzdHJpbmciLCJkb2N1bWVudCIsImtleXByZXNzIiwiZSIsIndoaWNoIiwidG9nZ2xlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbnNvbGUiLCJsb2ciLCJ0YXJnZXQiLCJpbml0Tm9tUmVwIiwicmVwRmxvdyIsImdldFVybFBhcmFtZXRlciIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJnZXRJdGVtIiwialF1ZXJ5Iiwic2hvdyIsImhpZGUiLCJpbml0QmFubmVycyIsImJhbm5lckZsb3ciLCJpbml0U3dpdGNoIiwic3dpdGNoRmxvdyIsInN3aXRjaElkIiwic2xpZGVEb3duIiwib24iLCJhZGRDbGFzcyIsImFqYXgiLCJ1cmwiLCJhc3luYyIsImRhdGFUeXBlIiwiZG9uZSIsImRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwicGVyc29uIiwiJHVzZXJTZWxlY3QiLCJlbXB0eSIsImFwcGVuZCIsImVhY2giLCJrZXkiLCJ2YWx1ZSIsIl9pZCIsIm5hbWVGdWxsIiwiY2hhbmdlIiwic2VsZWN0ZWRJZCIsInNlc3Npb25TdG9yYWdlIiwicmVtb3ZlSXRlbSIsImluZGV4IiwiZWxlbWVudCIsInNsaWRlVXAiLCJ3cml0ZVVzZXIiLCJ1c2VyIiwicGFyc2UiLCJzZXNzaW9uQ2xpZW50cyIsInNlc3Npb25SZXBzIiwid2luZG93IiwiYWxsQ2xpZW50cyIsImFsbFJlcHMiLCJjbGllbnQiLCJwdXNoIiwiY2xpZW50cyIsInJlcCIsInJlcHMiLCJmaXJzdFRpbWVVc2VyIiwic2Vzc2lvbkNsaWVudFN1Ym1pdHRlZCIsInNlc3Npb25SZXBTdWJtaXR0ZWQiLCJsZW5ndGgiLCJudW1iZXJPZkNsaWVudHMiLCJudW1iZXJPZlJlcHMiLCJjbGFpbXMiLCJudW1iZXJPZkNsYWltcyIsInByYWN0aXRpb25lcnMiLCJ0eXBlIiwicHJhY3QiLCJpbmNsdWRlcyIsInVzZXJIdG1sIiwic3RhcnQiLCJlbmQiLCJkb2IiLCJ2ZXRlcmFuIiwiaXNDdXJyZW50bHlTZXJ2aW5nIiwibGFzdFBheW1lbnQiLCJzdG9yeSIsInBpY3R1cmUiLCJodG1sIiwibmFtZSIsImZpcnN0Iiwid3JpdGVDbGllbnQiLCJmb3JtIiwiZm9ybURhdGEiLCJleGlzdGluZ0NsaWVudCIsInBhcnNlZENsaWVudHMiLCJzZXNzaW9uR3VpZCIsImlkIiwiZXh0ZW5kIiwid3JpdGVSZXAiLCJleGlzdGluZ1JlcCIsInBhcnNlZFJlcHMiLCJyZWFkQ2xpZW50IiwidXJsSWQiLCJwYXJzZWRVc2VyIiwiY2xpZW50TGlzdEh0bWwiLCJjbGllbnRMaXN0RnVsbEh0bWwiLCJuYW1lRmlyc3QiLCJuYW1lTGFzdCIsInJvbGUiLCJzdGFydERhdGVEZCIsInN0YXJ0RGF0ZU1tIiwic3RhcnREYXRlWXl5eSIsImVuZERhdGVEZCIsImVuZERhdGVNbSIsImVuZERhdGVZeXl5IiwiZW5xdWlyZU9ubGluZSIsImNsaWNrIiwicmVsb2FkIiwicmVhZFJlcCIsInJlcExpc3RGdWxsSHRtbCIsImN1cnJlbnRQZXJzb24iLCJjYXJkcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUVBO0FBQ0EsU0FBU0EsTUFBVCxDQUFnQkMsVUFBaEIsRUFBNEI7QUFDMUIsTUFBSUMsS0FBSyxHQUFHLElBQUlDLElBQUosRUFBWjtBQUNBLE1BQUlDLFNBQVMsR0FBRyxJQUFJRCxJQUFKLENBQVNGLFVBQVQsQ0FBaEI7QUFDQSxNQUFJSSxHQUFHLEdBQUdILEtBQUssQ0FBQ0ksV0FBTixLQUFzQkYs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QixDQUF6RCxFQUE0RDtBQUMxRDVFLEVBQUFBLENBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUIyQixJQUFqQjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdXRpbGl0eSBmdW5jdGlvbnMgXG5cbi8vIHJldHVybnMgYWdlIGZyb20gZGF0ZSBvZiBiaXJ0aCBzdHJpbmcgXG5mdW5jdGlvbiBnZXRBZ2UoZGF0ZVN0cmluZykge1xuICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICB2YXIgYmlydGhEYXRlID0gbmV3IERhdGUoZGF0ZVN0cmluZyk7XG4gIHZhciBhZ2UgPSB0b2RheS5nZXRGdWxsWWVhcigpIC0gYmlydGhEYXRlLmdldEZ1bGxZZWFyKCk7XG4gIHZhciBtID0gdG9kYXkuZ2V0TW9udGgoKSAtIGJpcnRoRGF0ZS5nZXRNb250aCgpO1xuICBpZiAobSA8IDAgfHwgKG0gPT09IDAgJiYgdG9kYXkuZ2V0RGF0ZSgpIDwgYmlydGhEYXRlLmdldERhdGUoKSkpIHtcbiAgICBhZ2UtLTtcbiAgfVxuICByZXR1cm4gYWdlO1xufVxuXG4vLyByZXR1cm5zIHNlcmlhbGl6ZXMgZm9ybSBkYXRhIGZyb20gYSBmb3JtIFxuZnVuY3Rpb24gZ2V0Rm9ybURhdGEoJGZvcm0pIHtcbiAgdmFyIHVuaW5kZXhlZF9hcnJheSA9ICRmb3JtLnNlcmlhbGl6ZUFycmF5KCk7XG4gIHZhciBpbmRleGVkX2FycmF5ID0ge307XG5cbiAgJC5tYXAodW5pbmRleGVkX2FycmF5LCBmdW5jdGlvbiAobiwgaSkge1xuICAgIGluZGV4ZWRfYXJyYXlbblsnbmFtZSddXSA9IG5bJ3ZhbHVlJ107XG4gIH0pO1xuXG4gIHJldHVybiBpbmRleGVkX2FycmF5O1xufVxuXG5mdW5jdGlvbiBndWlkR2VuZXJhdG9yKCkge1xuICB2YXIgUzQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICgoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApIHwgMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKTtcbiAgfTtcbiAgcmV0dXJuIChTNCgpICsgUzQoKSArIFwiLVwiICsgUzQoKSArIFwiLVwiICsgUzQoKSArIFwiLVwiICsgUzQoKSArIFwiLVwiICsgUzQoKSArIFM0KCkgKyBTNCgpKTtcbn1cblxuLy8gZW5kIHV0aWxpdHkgZnVuY3Rpb25zIFxuXG5cbi8vIGNhbGwgdXAgdGhlIHBlcnNvbmEgcGFuZWwgdmlhIGtleWJvYXJkIFxuJChkb2N1bWVudCkua2V5cHJlc3MoZnVuY3Rpb24gKGUpIHtcblxuICBzd2l0Y2ggKGUud2hpY2gpIHtcbiAgICBjYXNlIDEyNjogLy90aWxkYSArIHNoaWZ0XG4gICAgICAkKCcucHQtcGVyc29uYS1zd2l0Y2hlcicpLnRvZ2dsZSgpO1xuICAgICAgLy8gYWRkTGlzdGVuZXJzKCk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICB9XG59KTtcblxuLy8gd2luZG93Lm9ubG9hZCA9IGFkZExpc3RlbmVycygpO1xuXG4vLyBmdW5jdGlvbiBhZGRMaXN0ZW5lcnMoKSB7XG4vLyAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3B0LXBlcnNvbmEtc3dpdGNoZXInKVswXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZURvd24sIGZhbHNlKTtcbi8vICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwLCBmYWxzZSk7XG5cbi8vIH1cblxuLy8gZnVuY3Rpb24gbW91c2VVcCgpIHtcbi8vICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRpdk1vdmUsIHRydWUpO1xuLy8gfVxuXG4vLyBmdW5jdGlvbiBtb3VzZURvd24oZSkge1xuLy8gICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZGl2TW92ZSwgdHJ1ZSk7XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIGRpdk1vdmUoZSkge1xuLy8gICB2YXIgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHQtcGVyc29uYS1zd2l0Y2hlcicpWzBdO1xuLy8gICBkaXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuLy8gICBkaXYuc3R5bGUudG9wID0gZS5jbGllbnRZICsgJ3B4Jztcbi8vICAgZGl2LnN0eWxlLmxlZnQgPSBlLmNsaWVudFggKyAncHgnO1xuLy8gfVxuXG5cbi8vIG9yIHZpYSBsb2dvIGxvbmcgcHJlc3NcblxuLy8gLy8gZ3JhYiB0aGUgZWxlbWVudFxuLy8gdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215cy1sb2dvJyk7XG5cbi8vIC8vIGxpc3RlbiBmb3IgdGhlIGxvbmctcHJlc3MgZXZlbnRcbi8vIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvbmctcHJlc3MnLCBmdW5jdGlvbiAoZSkge1xuLy8gICAvLyBzdG9wIHRoZSBldmVudCBmcm9tIGJ1YmJsaW5nIHVwXG4vLyAgIGUucHJldmVudERlZmF1bHQoKVxuLy8gICAkKCcucHQtcGVyc29uYS1zd2l0Y2hlcicpLnRvZ2dsZSgpO1xuLy8gfSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3N3aXBlZC1sZWZ0JywgZnVuY3Rpb24gKGUpIHtcbiAgY29uc29sZS5sb2coZS50YXJnZXQpOyAvLyBlbGVtZW50IHRoYXQgd2FzIHN3aXBlZFxuICAkKCcucHQtcGVyc29uYS1zd2l0Y2hlcicpLnRvZ2dsZSgpO1xufSk7XG5cblxuXG5mdW5jdGlvbiBpbml0Tm9tUmVwKCkge1xuXG4gIHZhciByZXBGbG93ID0gZ2V0VXJsUGFyYW1ldGVyKCdyZXBGbG93Jyk7XG5cbiAgaWYgKHJlcEZsb3cpIHtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXBGbG93JywgcmVwRmxvdyk7XG5cbiAgfSBlbHNlIGlmIChcInJlcEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHtcblxuICB9IGVsc2Uge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXBGbG93JywgJ25vbmUnKTtcbiAgfVxuXG4gIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3JlcEZsb3cnKSA9PSAnYm90aCcpKSB7XG4gICAgalF1ZXJ5KFwiLnB0LWZpcnN0LXRpbWUtbm9cIikuc2hvdygpO1xuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1yZXByZXNlbnRpbmctbm9cIikuaGlkZSgpO1xuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1yZXByZXNlbnRlZC1ub1wiKS5oaWRlKCk7XG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LW5vbmVcIikuaGlkZSgpO1xuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1yZXByZXNlbnRpbmdcIikuc2hvdygpO1xuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1yZXByZXNlbnRlZFwiKS5zaG93KCk7XG4gIH0gZWxzZSBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZXBGbG93JykgPT0gJ25vbmUnKSkge1xuICAgIGpRdWVyeShcIi5wdC1maXJzdC10aW1lLW5vXCIpLnNob3coKTtcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctcmVwcmVzZW50aW5nXCIpLmhpZGUoKTtcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctcmVwcmVzZW50ZWRcIikuaGlkZSgpO1xuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1ub25lLW5vXCIpLmhpZGUoKTtcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctbm9uZVwiKS5zaG93KCk7XG4gIH0gZWxzZSBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZXBGbG93JykgPT0gJ3JlcHJlc2VudGluZycpKSB7XG4gICAgalF1ZXJ5KFwiLnB0LWZpcnN0LXRpbWUtbm9cIikuc2hvdygpO1xuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1yZXByZXNlbnRlZFwiKS5oaWRlKCk7XG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LXJlcHJlc2VudGluZy1ub1wiKS5oaWRlKCk7XG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LW5vbmVcIikuaGlkZSgpO1xuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1yZXByZXNlbnRpbmdcIikuc2hvdygpO1xuICB9IGVsc2UgaWYgKChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmVwRmxvdycpID09ICdyZXByZXNlbnRlZCcpKSB7XG4gICAgalF1ZXJ5KFwiLnB0LWZpcnN0LXRpbWUtbm9cIikuc2hvdygpO1xuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1yZXByZXNlbnRpbmdcIikuaGlkZSgpO1xuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1ub25lXCIpLmhpZGUoKTtcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctcmVwcmVzZW50ZWRcIikuc2hvdygpO1xuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1yZXByZXNlbnRlZC1ub1wiKS5oaWRlKCk7XG4gIH0gZWxzZSBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZXBGbG93JykgPT0gJ25ld2JpZScpKSB7XG4gICAgalF1ZXJ5KFwiLnB0LWZpcnN0LXRpbWUtbm9cIikuaGlkZSgpO1xuICAgIGpRdWVyeShcIi5wdC1maXJzdC10aW1lXCIpLnNob3coKTtcbiAgfVxufVxuXG5pbml0Tm9tUmVwKCk7XG5cblxuLy8gYmFubmVyc1xuZnVuY3Rpb24gaW5pdEJhbm5lcnMoKSB7XG5cbiAgdmFyIGJhbm5lckZsb3cgPSBnZXRVcmxQYXJhbWV0ZXIoJ2Jhbm5lckZsb3cnKTtcblxuICBpZiAoYmFubmVyRmxvdykge1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Jhbm5lckZsb3cnLCBiYW5uZXJGbG93KTtcblxuICB9IGVsc2UgaWYgKFwiYmFubmVyRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xuXG4gIH0gZWxzZSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Jhbm5lckZsb3cnLCAnbm9uZScpO1xuICB9XG5cbiAgaWYgKChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmFubmVyRmxvdycpID09ICdhbGwnKSkge1xuICAgIGpRdWVyeShcIi5wdC1iYW5uZXItc2VydmljZVwiKS5zaG93KCk7XG4gICAgalF1ZXJ5KFwiLnB0LWJhbm5lci1uci1yZXBcIikuc2hvdygpO1xuICB9IGVsc2UgaWYgKChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmFubmVyRmxvdycpID09ICdub25lJykpIHtcbiAgICBqUXVlcnkoXCIucHQtYmFubmVyLXNlcnZpY2VcIikuaGlkZSgpO1xuICAgIGpRdWVyeShcIi5wdC1iYW5uZXItbnItcmVwXCIpLmhpZGUoKTtcbiAgfSBlbHNlIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Jhbm5lckZsb3cnKSA9PSAnc2VydmljZScpKSB7XG4gICAgalF1ZXJ5KFwiLnB0LWJhbm5lci1zZXJ2aWNlXCIpLnNob3coKTtcbiAgICBqUXVlcnkoXCIucHQtYmFubmVyLW5yLXJlcFwiKS5oaWRlKCk7XG4gIH0gZWxzZSBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiYW5uZXJGbG93JykgPT0gJ25yLXJlcCcpKSB7XG4gICAgalF1ZXJ5KFwiLnB0LWJhbm5lci1zZXJ2aWNlXCIpLmhpZGUoKTtcbiAgICBqUXVlcnkoXCIucHQtYmFubmVyLW5yLXJlcFwiKS5zaG93KCk7XG4gIH1cbn1cblxuaW5pdEJhbm5lcnMoKTtcblxuXG4vLyBTd2l0Y2ggYWNjb3VudFxuZnVuY3Rpb24gaW5pdFN3aXRjaCgpIHtcblxuICB2YXIgc3dpdGNoRmxvdyA9IGdldFVybFBhcmFtZXRlcignc3dpdGNoRmxvdycpO1xuICB2YXIgc3dpdGNoSWQgPSBnZXRVcmxQYXJhbWV0ZXIoJ3N3aXRjaElkJyk7XG5cbiAgaWYgKHN3aXRjaEZsb3cpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3dpdGNoRmxvdycsIHN3aXRjaEZsb3cpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzd2l0Y2hJZCcsIHN3aXRjaElkKTtcbiAgICBqUXVlcnkoJy5wdC1tYW5hZ2luZy11c2VyICcpLnNsaWRlRG93bignZmFzdCcpO1xuICB9XG5cbiAgaWYgKChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3dpdGNoRmxvdycpID09ICdhY3RpdmUnKSkge1xuICAgIGpRdWVyeSgnLnB0LW1hbmFnaW5nLXVzZXIgJykuc2hvdygpO1xuXG4gIH0gZWxzZSB7XG4gICAgLy8galF1ZXJ5KCcuc3dpdGNoLWFjY291bnQtYnV0dG9uJykucmVtb3ZlQ2xhc3MoXCJzd2l0Y2gtYWNjb3VudC1idXR0b24tLWN1cnJlbnRcIik7XG4gIH1cblxuXG5cbiAgLy8gaGlkZSBzd2l0Y2ggYWNjb3VudCBvdmVybGF5IHdoZW4gY2xpY2tpbmcgZWxzZXdoZXJlIG9uIHRoZSBwYWdlXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICQoXCIuc3dpdGNoLWFjY291bnQtYm94XCIpLmFkZENsYXNzKFwic3dpdGNoLWFjY291bnQtYm94LS1oaWRlXCIpO1xuICB9KTtcblxufVxuXG5pbml0U3dpdGNoKCk7XG5cblxuXG5cbi8vIHRvIGdlbmVyYXRlIG1vcmUgdXNlcnMsIGdvIHRvIHd3dy5qc29uLWdlbmVyYXRvci5jb20gYW5kIHBhc3RlIGluIHRoZSBkYXRhIGZyb20gL2RvY3MvZGF0YS91c2VyLmdlbmVyYXRvciBcbi8vIGFuZCBwYXN0ZSBpbiB0aGUgZ2VuZXJhdGVkIHVzZXJzIGluIHRvIC9kb2NzL2RhdGEvdXNlci5qc29uXG5cbi8vIFB1bGwgaW4gdGhlIGpzb24gY29udGVudCBcbiQuYWpheCh7XG4gIHVybDogJy9kb2NzL2RhdGEvdXNlci5qc29uJyxcbiAgYXN5bmM6IGZhbHNlLFxuICBkYXRhVHlwZTogJ2pzb24nXG59KS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgY29uc29sZS5sb2coJ1VzZXIgZGF0YSBiYWNrJyk7XG5cblxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsUGVyc29ucycsIEpTT04uc3RyaW5naWZ5KGRhdGEucGVyc29uKSk7XG5cbiAgLy8gc2V0IHRoZSBkZWZhdWx0IE15U2VydmljZSB1c2VyIGlmIG5vIHVzZXIgaGFzIGJlZW4gcmVxdWVzdGVkIFxuICBpZiAoIShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGVyc29uJykpKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BlcnNvbicsIEpTT04uc3RyaW5naWZ5KGRhdGEucGVyc29uWzBdKSk7XG4gICAgY29uc29sZS5sb2coJ3NldHRpbmcgdGhlIGRlZmF1bHQgdXNlcicpO1xuICB9XG5cbiAgLy8gcG9wdWxhdGUgdGhlIHVzZXIgZHJvcGRvd24gbGlzdCB3aXRoIHVzZXJzIGZyb20gdGhlIGpzb25cbiAgdmFyICR1c2VyU2VsZWN0ID0gJCgnI3VzZXItZHJvcC1kb3duJyk7XG4gICR1c2VyU2VsZWN0LmVtcHR5KCk7XG4gICR1c2VyU2VsZWN0LmFwcGVuZCgnPG9wdGlvbj4tLSBTZWxlY3QgYSB1c2VyIC0tPC9vcHRpb24+Jyk7XG4gICQuZWFjaChkYXRhLnBlcnNvbiwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAkdXNlclNlbGVjdC5hcHBlbmQoJzxvcHRpb24gdmFsdWU9JyArIHZhbHVlLl9pZCArICc+JyArIHZhbHVlLm5hbWVGdWxsICsgJzwvb3B0aW9uPicpO1xuICB9KTtcblxuICAvLyBzd2l0Y2ggdGhlIHVzZXIgXG4gICR1c2VyU2VsZWN0LmNoYW5nZShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGVjdGVkSWQgPSB0aGlzLnZhbHVlO1xuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJzQ2xpZW50cycpO1xuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJzUmVwcycpO1xuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3Nlc3Npb25HdWlkJyk7XG5cbiAgICAkLmVhY2goZGF0YS5wZXJzb24sIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuXG4gICAgICBpZiAoZWxlbWVudC5faWQgPT09IHNlbGVjdGVkSWQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BlcnNvbicsIEpTT04uc3RyaW5naWZ5KGRhdGEucGVyc29uW2luZGV4XSkpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3dpdGNoSWQnLCAnbm9uZScpO1xuICAgICAgICBqUXVlcnkoJy5wdC1tYW5hZ2luZy11c2VyJykuc2xpZGVVcCgnZmFzdCcpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3dpdGNoRmxvdycsICdub25lJyk7XG4gICAgICAgIHdyaXRlVXNlcigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgd3JpdGVVc2VyKCk7XG59KTtcblxuXG4vLyBwdXQgdGhlIHVzZXIgZnJvbSB1c2VyLmpzIGluIHRvIGxvY2FsIHN0b3JhZ2UgYW5kIHRoZSB1c2VycyBjbGllbnRzIGluIHRvIHNlc3Npb24gc3RvcmFnZSBcbmZ1bmN0aW9uIHdyaXRlVXNlcigpIHtcblxuICBjb25zb2xlLmxvZygnV3JpdGluZyB1c2VyICAnKTtcblxuICBjb25zdCB1c2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGVyc29uJykpO1xuICBjb25zdCBzZXNzaW9uQ2xpZW50cyA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcnNDbGllbnRzJykpO1xuICBjb25zdCBzZXNzaW9uUmVwcyA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcnNSZXBzJykpO1xuXG4gIHdpbmRvdy5hbGxDbGllbnRzID0gW107XG4gIHdpbmRvdy5hbGxSZXBzID0gW107XG5cbiAgaWYgKHNlc3Npb25DbGllbnRzKSB7XG5cbiAgICAkLmVhY2goc2Vzc2lvbkNsaWVudHMsIGZ1bmN0aW9uIChpbmRleCwgY2xpZW50KSB7XG4gICAgICAvLyBhZGQgbmV3IGZvcm0gZGF0YSB0byBhbiBleGlzdGluZyBjbGllbnRcbiAgICAgIHdpbmRvdy5hbGxDbGllbnRzLnB1c2goY2xpZW50KTtcbiAgICB9KTtcblxuICB9IGVsc2UgeyAvLyBubyBjbGllbnQgZGF0YSBpbiBzZXNzaW9uIHNvIGdldCBpdCBmcm9tIHRoZSB1c2VyIFxuICAgICQuZWFjaCh1c2VyLmNsaWVudHMsIGZ1bmN0aW9uIChpbmRleCwgY2xpZW50KSB7XG5cbiAgICAgIHdpbmRvdy5hbGxDbGllbnRzLnB1c2goY2xpZW50KTtcblxuICAgIH0pO1xuICB9XG5cbiAgaWYgKHNlc3Npb25SZXBzKSB7XG5cbiAgICAkLmVhY2goc2Vzc2lvblJlcHMsIGZ1bmN0aW9uIChpbmRleCwgcmVwKSB7XG4gICAgICAvLyBhZGQgbmV3IGZvcm0gZGF0YSB0byBhbiBleGlzdGluZyByZXBcbiAgICAgIHdpbmRvdy5hbGxSZXBzLnB1c2gocmVwKTtcbiAgICB9KTtcblxuICB9IGVsc2UgeyAvLyBubyByZXAgZGF0YSBpbiBzZXNzaW9uIHNvIGdldCBpdCBmcm9tIHRoZSB1c2VyIFxuICAgICQuZWFjaCh1c2VyLnJlcHMsIGZ1bmN0aW9uIChpbmRleCwgcmVwKSB7XG5cbiAgICAgIHdpbmRvdy5hbGxSZXBzLnB1c2gocmVwKTtcblxuICAgIH0pO1xuICB9XG5cblxuICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1c2Vyc0NsaWVudHMnLCBKU09OLnN0cmluZ2lmeSh3aW5kb3cuYWxsQ2xpZW50cykpO1xuICAvLyBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1c2Vyc011bHRpcGxlQ2xpZW50cycsIEpTT04uc3RyaW5naWZ5KHdpbmRvdy5hbGxDbGllbnRzKSk7XG5cbiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgndXNlcnNSZXBzJywgSlNPTi5zdHJpbmdpZnkod2luZG93LmFsbFJlcHMpKTtcblxuICB2YXIgZmlyc3RUaW1lVXNlciA9IHRydWU7XG4gIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uR3VpZCcpKSB7XG4gICAgZmlyc3RUaW1lVXNlciA9IGZhbHNlO1xuICB9XG5cbiAgLy8gY291bnQgbnVtYmVyIG9mIGNsaWVudHMgXG4gIHZhciBzZXNzaW9uQ2xpZW50U3VibWl0dGVkID0gZmFsc2U7XG4gIHZhciBzZXNzaW9uUmVwU3VibWl0dGVkID0gZmFsc2U7XG5cblxuXG4gIGlmICgod2luZG93LmFsbENsaWVudHMubGVuZ3RoID4gMCkgJiYgKHdpbmRvdy5hbGxSZXBzLmxlbmd0aCA+IDApKSB7XG4gICAgLy8gY29uc29sZS5sb2coJyBib3RoJyk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlcEZsb3cnLCAnYm90aCcpO1xuICAgICQoJy5wdC1zd2l0Y2gtYWNjb3VudCcpLnNob3coKTtcblxuICAgIGlmICh1c2VyLmNsaWVudHMpIHtcbiAgICAgIHNlc3Npb25DbGllbnRTdWJtaXR0ZWQgPSB0cnVlO1xuICAgIH1cblxuICB9IGVsc2UgaWYgKHdpbmRvdy5hbGxDbGllbnRzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zb2xlLmxvZygnIHJlcHJlc2VudGluZycpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXBGbG93JywgJ3JlcHJlc2VudGluZycpO1xuICAgIGlmICh1c2VyLmNsaWVudHMpIHtcbiAgICAgIHNlc3Npb25DbGllbnRTdWJtaXR0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSBlbHNlIGlmICh3aW5kb3cuYWxsUmVwcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc29sZS5sb2coJyByZXByZXNlbnRlZCcpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXBGbG93JywgJ3JlcHJlc2VudGVkJyk7XG4gICAgaWYgKHVzZXIucmVwcykge1xuICAgICAgc2Vzc2lvblJlcFN1Ym1pdHRlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgKHNlc3Npb25SZXBzKSB7XG4gIC8vICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlcEZsb3cnLCAncmVwcmVzZW50aW5nJyk7XG4gIC8vICAgaWYgKHNlc3Npb25SZXBzLnJlcFswXS5zdWJtaXR0ZWRBcHBsaWNhdGlvbiA9PSBcInRydWVcIikge1xuICAvLyAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlcEZsb3cnLCAncmVwcmVzZW50aW5nJyk7XG4gIC8vICAgICB2YXIgc2Vzc2lvblJlcFN1Ym1pdHRlZCA9IHRydWU7XG4gIC8vICAgICB1c2VyLnJlcHMucHVzaChzZXNzaW9uUmVwcy5yZXBbMF0pO1xuICAvLyAgIH1cblxuICAvLyAgIGlmIChzZXNzaW9uUmVwcy5yZXBbMF0ucm9sZSA9PSBcIkNlYXNlXCIpIHtcbiAgLy8gICAgIHVzZXIubnVtYmVyT2ZSZXBzID0gMFxuICAvLyAgICAgdXNlci5yZXBzLmxlbmd0aCA9IDA7XG4gIC8vICAgICBzZXNzaW9uUmVwU3VibWl0dGVkID0gZmFsc2U7XG4gIC8vICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVwRmxvdycsICdub25lJyk7XG4gIC8vICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCd1c2Vyc1JlcHMnKTtcbiAgLy8gICAgIGlmICghd2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgLy8gICAgICAgd2luZG93LmxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uICsgJyNyZXAtbGlzdCc7XG4gIC8vICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgLy8gICAgIH1cbiAgLy8gICB9XG5cbiAgLy8gfVxuXG5cbiAgLy8gc2V0XG4gIGlmICgodXNlci5jbGllbnRzLmxlbmd0aCA+IDApIHx8IChzZXNzaW9uQ2xpZW50U3VibWl0dGVkID09PSB0cnVlKSkge1xuXG4gICAgaWYgKHVzZXIuY2xpZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICB1c2VyLm51bWJlck9mQ2xpZW50cyA9IHVzZXIuY2xpZW50cy5sZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVzZXIubnVtYmVyT2ZDbGllbnRzID0gd2luZG93LmFsbENsaWVudHMubGVuZ3RoO1xuICAgIH1cblxuICB9IGVsc2UgaWYgKHVzZXIuY2xpZW50cy5sZW5ndGggPCAxKSB7XG4gICAgdXNlci5udW1iZXJPZkNsaWVudHMgPSAwO1xuICB9XG5cbiAgaWYgKCh1c2VyLnJlcHMubGVuZ3RoID4gMCkgfHwgKHNlc3Npb25SZXBTdWJtaXR0ZWQgPT09IHRydWUpKSB7XG5cbiAgICBpZiAodXNlci5yZXBzLmxlbmd0aCA+IDApIHtcbiAgICAgIHVzZXIubnVtYmVyT2ZSZXBzID0gdXNlci5yZXBzLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXNlci5udW1iZXJPZlJlcHMgPSB3aW5kb3cuYWxsUmVwcy5sZW5ndGg7XG4gICAgfVxuICB9IGVsc2UgaWYgKHVzZXIucmVwcy5sZW5ndGggPCAxKSB7XG4gICAgdXNlci5udW1iZXJPZlJlcHMgPSAwO1xuICAgIC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXBGbG93JywgJ25ld2JpZScpO1xuICB9XG5cbiAgaWYgKHVzZXIuY2xhaW1zKSB7XG4gICAgdXNlci5udW1iZXJPZkNsYWltcyA9IHVzZXIuY2xhaW1zLmxlbmd0aDtcbiAgfSBlbHNlIHtcbiAgICB1c2VyLm51bWJlck9mQ2xhaW1zID0gMDtcbiAgfVxuXG5cbiAgLy8gc2hvdyBoaWRlIHRoZSBzd2l0Y2ggYWNjb3VudCBidXR0b25zXG5cbiAgLy8gY29uc29sZS5sb2coJ3Nlc3Npb25DbGllbnRTdWJtaXR0ZWQgLT4gJyArIHNlc3Npb25DbGllbnRTdWJtaXR0ZWQpO1xuICAvLyBjb25zb2xlLmxvZygnd2luZG93LmFsbENsaWVudHMubGVuZ3RoIC0+ICcgKyB3aW5kb3cuYWxsQ2xpZW50cy5sZW5ndGgpO1xuICBpZiAoKHNlc3Npb25SZXBTdWJtaXR0ZWQgPT09IHRydWUpICYmIChzZXNzaW9uQ2xpZW50U3VibWl0dGVkID09PSB0cnVlKSkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXBGbG93JywgJ2JvdGgnKTtcbiAgICAkKCcucHQtc3dpdGNoLWFjY291bnQnKS5zaG93KCk7XG4gICAgZmlyc3RUaW1lVXNlciA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKChzZXNzaW9uUmVwU3VibWl0dGVkID09PSB0cnVlKSB8fCAodXNlci5udW1iZXJPZlJlcHMgPiAwKSkge1xuICAgIC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXBGbG93JywgJ3JlcHJlc2VudGVkJyk7XG4gICAgZmlyc3RUaW1lVXNlciA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKChzZXNzaW9uQ2xpZW50U3VibWl0dGVkID09PSB0cnVlKSB8fCAod2luZG93LmFsbENsaWVudHMubGVuZ3RoID4gMCkpIHtcbiAgICAvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVwRmxvdycsICdyZXByZXNlbnRpbmcnKTtcbiAgICAkKCcucHQtc3dpdGNoLWFjY291bnQnKS5zaG93KCk7XG4gICAgZmlyc3RUaW1lVXNlciA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgICQoJy5wdC1zd2l0Y2gtYWNjb3VudCcpLmhpZGUoKTtcbiAgICAvLyBhbGVydCgnaGlkaW5nJyk7XG4gIH1cblxuICBpZiAoZmlyc3RUaW1lVXNlcikge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXBGbG93JywgJ25ld2JpZScpO1xuICB9XG5cbiAgdmFyIHByYWN0aXRpb25lcnMgPSBcIlwiO1xuXG4gICQuYWpheCh7XG4gICAgdXJsOiAnL2RvY3MvZGF0YS9tZWRpY2FsLXByYWN0aXRpb25lci5qc29uJyxcbiAgICB0eXBlOiAnR0VUJyxcbiAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgIGFzeW5jOiBmYWxzZVxuICB9KVxuICAuZG9uZSgoZGF0YSkgPT4ge1xuICAgIHByYWN0aXRpb25lcnMgPSBgPHVsPmA7XG4gICAgJC5lYWNoKGRhdGEucHJhY3RpdGlvbmVycywgKGluZGV4LCBwcmFjdCkgPT4ge1xuICAgICAgaWYgKHVzZXIucHJhY3RpdGlvbmVycy5pbmNsdWRlcyhwcmFjdC5faWQpKSB7XG4gICAgICAgIHByYWN0aXRpb25lcnMgKz0gYDxsaT4ke3ByYWN0Lm5hbWVGdWxsfTwvbGk+YDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBwcmFjdGl0aW9uZXJzICs9IGA8L3VsPmA7XG4gIH0pO1xuXG5cbiAgdmFyIHVzZXJIdG1sID0gJyc7XG4gIHZhciBzdGFydCA9ICc8ZGl2IGNsYXNzPVwicHQtZmxleC1ncmlkXCI+PGRpdiBjbGFzcz1cInB0LWNvbFwiPic7XG4gIHZhciBlbmQgPSAnPC9kaXY+PC9kaXY+J1xuICB1c2VySHRtbCArPSBzdGFydCArICdOYW1lIDwvZGl2PjxkaXYgY2xhc3M9XCJwdC1jb2xcIj4nICsgdXNlci5uYW1lRnVsbCArIGVuZDtcbiAgdXNlckh0bWwgKz0gc3RhcnQgKyAnQWdlIDwvZGl2PjxkaXYgY2xhc3M9XCJwdC1jb2xcIj4nICsgZ2V0QWdlKHVzZXIuZG9iKSArIGVuZDtcbiAgdXNlckh0bWwgKz0gc3RhcnQgKyAnSXMgYSB2ZXRlcmFuIDwvZGl2PjxkaXYgY2xhc3M9XCJwdC1jb2xcIj4nICsgdXNlci52ZXRlcmFuICsgZW5kO1xuICB1c2VySHRtbCArPSBzdGFydCArICdQcmFjdGl0aW9uZXJzIDwvZGl2PjxkaXYgY2xhc3M9XCJwdC1jb2xcIj4nICsgcHJhY3RpdGlvbmVycyArIGVuZDtcbiAgdXNlckh0bWwgKz0gc3RhcnQgKyAnQ3VycmVudGx5IFNlcnZpbmcgPC9kaXY+PGRpdiBjbGFzcz1cInB0LWNvbFwiPicgKyB1c2VyLmlzQ3VycmVudGx5U2VydmluZyArIGVuZDtcbiAgdXNlckh0bWwgKz0gc3RhcnQgKyAnQ2xpZW50cyA8L2Rpdj48ZGl2IGNsYXNzPVwicHQtY29sXCI+JyArIHVzZXIubnVtYmVyT2ZDbGllbnRzICsgZW5kO1xuICB1c2VySHRtbCArPSBzdGFydCArICdSZXBzIDwvZGl2PjxkaXYgY2xhc3M9XCJwdC1jb2xcIj4nICsgdXNlci5udW1iZXJPZlJlcHMgKyBlbmQ7XG4gIHVzZXJIdG1sICs9IHN0YXJ0ICsgJ0xhc3QgcGF5bWVudCA8L2Rpdj48ZGl2IGNsYXNzPVwicHQtY29sXCI+JyArIHVzZXIubGFzdFBheW1lbnQgKyBlbmQ7XG4gIHVzZXJIdG1sICs9IHN0YXJ0ICsgJ0NsYWltcyA8L2Rpdj48ZGl2IGNsYXNzPVwicHQtY29sXCI+JyArIHVzZXIubnVtYmVyT2ZDbGFpbXMgKyBlbmQ7XG4gIHVzZXJIdG1sICs9IHN0YXJ0ICsgJ1N0b3J5IDwvZGl2PjxkaXYgY2xhc3M9XCJwdC1jb2xcIj4nICsgdXNlci5zdG9yeSArIGVuZDtcblxuICB1c2VyLnBpY3R1cmUgPSAnPGltZyBjbGFzcz1cInB0LWltYWdlLWNpcmNsZVwiIHNyYz1cIicgKyB1c2VyLnBpY3R1cmUgKyAnXCI+JztcblxuXG4gICQoJyN1c2VyQ29udGFpbmVySWQnKS5odG1sKHVzZXJIdG1sKTtcbiAgJCgnLnB0LWN1cnJlbnQtdXNlci1uYW1lLXBpY3R1cmUnKS5odG1sKHVzZXIucGljdHVyZSk7XG4gICQoJy5wdC1jdXJyZW50LXVzZXItbmFtZS1maXJzdCcpLmh0bWwodXNlci5uYW1lLmZpcnN0KTtcbiAgJCgnLnB0LWN1cnJlbnQtdXNlci1uYW1lLWZ1bGwnKS5odG1sKHVzZXIubmFtZUZ1bGwpO1xuICAkKCcucHQtY3VycmVudC11c2VyLWxhc3QtcGF5bWVudCcpLmh0bWwodXNlci5sYXN0UGF5bWVudCk7XG4gICQoJy5wdC1jdXJyZW50LXVzZXItbnVtYmVyLW9mLWNsYWltcycpLmh0bWwodXNlci5udW1iZXJPZkNsYWltcyk7XG5cblxufVxuXG5cblxuXG5mdW5jdGlvbiB3cml0ZUNsaWVudChmb3JtKSB7XG5cbiAgdmFyIGZvcm1EYXRhID0gZ2V0Rm9ybURhdGEoZm9ybSk7XG4gIHZhciBjbGllbnRzID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcnNDbGllbnRzJyk7XG5cbiAgaWYgKGNsaWVudHMpIHsgLy8gY2xpZW50cyBpbiBzZXNzaW9uIGRhdGFcbiAgICBjb25zb2xlLmxvZygnVGhlcmUgYXJlIGNsaWVudHMgaW4gc2Vzc2lvbicpO1xuICAgIHZhciBleGlzdGluZ0NsaWVudCA9IGZhbHNlO1xuICAgIHZhciBwYXJzZWRDbGllbnRzID0gSlNPTi5wYXJzZShjbGllbnRzKTtcbiAgICB2YXIgc2Vzc2lvbkd1aWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uR3VpZCcpO1xuXG4gICAgJC5lYWNoKHBhcnNlZENsaWVudHMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuXG4gICAgICBpZiAoZWxlbWVudC5pZCA9PT0gc2Vzc2lvbkd1aWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3dyaXRpbmcgdG8gYW4gRVhJU1RJTkcgY2xpZW50Jyk7XG5cbiAgICAgICAgLy8gYWRkIG5ldyBmb3JtIGRhdGEgdG8gYW4gZXhpc3RpbmcgY2xpZW50XG4gICAgICAgICQuZXh0ZW5kKHRydWUsIHdpbmRvdy5hbGxDbGllbnRzW2luZGV4XSwgZm9ybURhdGEpO1xuICAgICAgICBleGlzdGluZ0NsaWVudCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoZXhpc3RpbmdDbGllbnQgPT09IGZhbHNlKSB7XG4gICAgICBjb25zb2xlLmxvZygnd3JpdGluZyB0byBhIE5FVyBjbGllbnQnKTtcbiAgICAgIHdpbmRvdy5hbGxDbGllbnRzLnB1c2goZm9ybURhdGEpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKCdubyBjbGllbnRzIHNvIHdyaXRpbmcgdG8gYSBORVcgY2xpZW50Jyk7XG4gICAgd2luZG93LmFsbENsaWVudHMucHVzaChmb3JtRGF0YSk7XG4gIH1cblxuICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1c2Vyc0NsaWVudHMnLCBKU09OLnN0cmluZ2lmeSh3aW5kb3cuYWxsQ2xpZW50cykpO1xufVxuXG5cbmZ1bmN0aW9uIHdyaXRlUmVwKGZvcm0pIHtcblxuICB2YXIgZm9ybURhdGEgPSBnZXRGb3JtRGF0YShmb3JtKTtcbiAgdmFyIHJlcHMgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2Vyc1JlcHMnKTtcblxuICBpZiAocmVwcykgeyAvLyByZXBzIGluIHNlc3Npb24gZGF0YVxuICAgIGNvbnNvbGUubG9nKCdUaGVyZSBhcmUgcmVwcyBpbiBzZXNzaW9uJyk7XG4gICAgdmFyIGV4aXN0aW5nUmVwID0gZmFsc2U7XG4gICAgdmFyIHBhcnNlZFJlcHMgPSBKU09OLnBhcnNlKHJlcHMpO1xuICAgIHZhciBzZXNzaW9uR3VpZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Nlc3Npb25HdWlkJyk7XG5cbiAgICAkLmVhY2gocGFyc2VkUmVwcywgZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG5cbiAgICAgIGlmIChlbGVtZW50LmlkID09PSBzZXNzaW9uR3VpZCkge1xuICAgICAgICBjb25zb2xlLmxvZygnd3JpdGluZyB0byBhbiBFWElTVElORyBjbGllbnQnKTtcblxuICAgICAgICAvLyBhZGQgbmV3IGZvcm0gZGF0YSB0byBhbiBleGlzdGluZyBjbGllbnRcbiAgICAgICAgJC5leHRlbmQodHJ1ZSwgd2luZG93LmFsbFJlcHNbaW5kZXhdLCBmb3JtRGF0YSk7XG4gICAgICAgIGV4aXN0aW5nUmVwID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChleGlzdGluZ1JlcCA9PT0gZmFsc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd3cml0aW5nIHRvIGEgTkVXIGNsaWVudCcpO1xuICAgICAgd2luZG93LmFsbFJlcHMucHVzaChmb3JtRGF0YSk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coJ25vIHJlcHMgc28gd3JpdGluZyB0byBhIE5FVyBjbGllbnQnKTtcbiAgICB3aW5kb3cuYWxsUmVwcy5wdXNoKGZvcm1EYXRhKTtcbiAgfVxuXG4gIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3VzZXJzUmVwcycsIEpTT04uc3RyaW5naWZ5KHdpbmRvdy5hbGxSZXBzKSk7XG59XG5cbmZ1bmN0aW9uIHJlYWRDbGllbnQoKSB7XG4gIGNvbnNvbGUubG9nKCdSZWFkaW5nIGNsaWVudCBkYXRhJyk7XG5cbiAgdmFyIHVybElkID0gZ2V0VXJsUGFyYW1ldGVyKCdpZCcpO1xuXG4gIGlmICh1cmxJZCkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3Nlc3Npb25HdWlkJywgdXJsSWQpO1xuICB9XG5cbiAgdmFyIGNsaWVudHMgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2Vyc0NsaWVudHMnKTtcbiAgdmFyIHBhcnNlZENsaWVudHMgPSBKU09OLnBhcnNlKGNsaWVudHMpO1xuICB2YXIgdXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwZXJzb24nKTtcbiAgdmFyIHBhcnNlZFVzZXIgPSBKU09OLnBhcnNlKHVzZXIpO1xuICB2YXIgc2Vzc2lvbkd1aWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uR3VpZCcpO1xuXG4gIGlmIChwYXJzZWRDbGllbnRzKSB7XG4gICAgdmFyIGNsaWVudExpc3RIdG1sID0gJyc7XG4gICAgdmFyIGNsaWVudExpc3RGdWxsSHRtbCA9ICcnO1xuICAgIHZhciBzd2l0Y2hJZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzd2l0Y2hJZCcpO1xuXG4gICAgJC5lYWNoKHBhcnNlZENsaWVudHMsIGZ1bmN0aW9uIChpbmRleCwgY2xpZW50KSB7XG5cbiAgICAgIC8vIHdyaXRlIHRoZSBjbGllbnQgY3VycmVudGx5IGJlaW5nIHdvcmtlZCBvblxuICAgICAgaWYgKGNsaWVudC5pZCA9PT0gc2Vzc2lvbkd1aWQpIHtcbiAgICAgICAgJC5lYWNoKGNsaWVudCwgZnVuY3Rpb24gKGluZGV4LCBjbGllbnQpIHtcbiAgICAgICAgICAkKCcucHQtY3VycmVudC1jbGllbnQtJyArIGluZGV4KS5odG1sKGNsaWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2xpZW50LmlkID09IHN3aXRjaElkKSB7XG4gICAgICAgIHRoaXMubmFtZUZ1bGwgPSB0aGlzLm5hbWVGaXJzdCArICcgJyArIHRoaXMubmFtZUxhc3Q7XG4gICAgICAgICQoJy5wdC1jdXJyZW50LXVzZXItbmFtZS1maXJzdCcpLmh0bWwodGhpcy5uYW1lRmlyc3QpO1xuICAgICAgICAkKCcucHQtY3VycmVudC11c2VyLW5hbWUtZnVsbCcpLmh0bWwodGhpcy5uYW1lRnVsbCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjbGllbnQucm9sZSAhPT0gXCJDZWFzZVwiKSB7XG5cbiAgICAgICAgY2xpZW50Lm5hbWVGdWxsID0gY2xpZW50Lm5hbWVGaXJzdCArICcgJyArIGNsaWVudC5uYW1lTGFzdDtcblxuICAgICAgICAvLyBzd2l0Y2ggbGlzdFxuICAgICAgICBjbGllbnRMaXN0SHRtbCArPSAnPGxpPjxhIGhyZWY9XCIvYXV0aD9zd2l0Y2hGbG93PWFjdGl2ZSZzd2l0Y2hJZD0nICsgY2xpZW50LmlkICsgJ1wiIGNsYXNzPVwic3dpdGNoLWFjY291bnQtYm94X19saW5rXCI+PHN0cm9uZz4nO1xuICAgICAgICBjbGllbnRMaXN0SHRtbCArPSBjbGllbnQubmFtZUZpcnN0ICsgJyAnICsgY2xpZW50Lm5hbWVMYXN0ICsgJzwvc3Ryb25nPic7XG4gICAgICAgIGNsaWVudExpc3RIdG1sICs9ICcgKCcgKyBjbGllbnQucm9sZSArICcpPC9hPjwvbGk+JztcblxuICAgICAgICAvLyBhbGwgY2xpZW50cyBsaXN0XG4gICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tMTIgbWFyZ2luLWJlbG93LS1taWRcIj48ZGl2IGNsYXNzPVwiaG9yaXpvbnRhbC1jYXJkLXNlY3Rpb25cIj4nO1xuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gJzxkaXYgY2xhc3M9XCJjYXJkIGNhcmQtLWhvcml6b250YWwgZmxleC1jb250YWluZXJcIj48ZGl2IGNsYXNzPVwiZmxleC1pdGVtIGZsZXgtaXRlbS0taWNvbi1vbmx5XCI+JztcbiAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9ICc8c3BhbiBjbGFzcz1cImZhbCBmYS1pY29uLW5yIGZhLXVzZXItZWRpdFwiPjwvc3Bhbj4gPC9kaXY+PGRpdiBjbGFzcz1cImZsZXgtaXRlbSBmbGV4LWl0ZW0tLWxhcmdlXCI+PHA+PHN0cm9uZz4nO1xuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gY2xpZW50Lm5hbWVGaXJzdCArICcgJyArIGNsaWVudC5uYW1lTGFzdDtcbiAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9ICc8L3N0cm9uZz48L3A+ICA8cD48c3Ryb25nPiBZb3VyIGN1cnJlbnQgcm9sZTogPC9zdHJvbmc+J1xuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gY2xpZW50LnJvbGU7XG4gICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSAnPC9wPjxwPiA8c3Ryb25nPiBSZXByZXNlbnRhdGlvbiBkYXRlOiA8L3N0cm9uZz4nO1xuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gY2xpZW50LnN0YXJ0RGF0ZURkICsgJyAvICcgKyBjbGllbnQuc3RhcnREYXRlTW0gKyAnIC8gJyArIGNsaWVudC5zdGFydERhdGVZeXl5O1xuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gJyB0byAnO1xuICAgICAgICBpZiAoY2xpZW50LmVuZERhdGVEZCkge1xuICAgICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSBjbGllbnQuZW5kRGF0ZURkICsgJyAvICcgKyBjbGllbnQuZW5kRGF0ZU1tICsgJyAvICcgKyBjbGllbnQuZW5kRGF0ZVl5eXk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9ICcobm8gZml4ZWQgZW5kIGRhdGUpPC9wPic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNsaWVudC5lbnF1aXJlT25saW5lKSB7XG4gICAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9ICc8cD48c3Ryb25nPiBPbmxpbmUgYWNjZXNzOiA8L3N0cm9uZz4nO1xuICAgICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSBjbGllbnQuZW5xdWlyZU9ubGluZSArICc8L3A+JztcbiAgICAgICAgfVxuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gJzwvZGl2PjxkaXYgY2xhc3M9XCJmbGV4LWl0ZW0gZmxleC1pdGVtLS1yaWdodC1hbGlnblwiPjxwPjxidXR0b24gY2xhc3M9XCJ1aWtpdC1idG4gc21hbGwgdWlraXQtYnRuLS10ZXJ0aWFyeVwiIG9uY2xpY2s9XCJ3aW5kb3cubG9jYXRpb24uaHJlZj1cXCcvYXV0aC9wcm9maWxlL25vbXJlcC9mb3JtLWNsaWVudC0zJztcbiAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9ICc/c3RhdGU9ZWRpdCZpZD0nICsgY2xpZW50LmlkICsgJ1xcJ1wiPic7XG4gICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSAnRWRpdCBSb2xlPC9idXR0b24+PC9wPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PidcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgLy8gYWRkIGN1cnJlbnQgdXNlciB0byB0aGUgbGlzdFxuICAgIGNsaWVudExpc3RIdG1sICs9ICc8bGk+PGEgaWQ9XCJyZXR1cm5Qcm9maWxlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKTtcIiBjbGFzcz1cInN3aXRjaC1hY2NvdW50LWJveF9fbGluayBzd2l0Y2gtYWNjb3VudC1ib3hfX2xpbmstLXNlbGZcIj4nO1xuICAgIGNsaWVudExpc3RIdG1sICs9ICc8aSBjbGFzcz1cImZhciBmYS1yZXBlYXQtYWx0XCI+PC9pPiBCYWNrIHRvIG15IG93biBhY2NvdW50PC9hPjwvbGk+JztcblxuICAgICQoJy5wdC1jdXJyZW50LXVzZXItY2xpZW50LWxpc3QnKS5odG1sKGNsaWVudExpc3RIdG1sKTtcbiAgICAkKCcucHQtY2xpZW50LWxpc3QtZnVsbCcpLmh0bWwoY2xpZW50TGlzdEZ1bGxIdG1sKTtcblxuICAgIC8vIGhpZGUgdGhlIHJldHVybiB0byBwcm9maWxlIGJhbm5lciBcbiAgICAkKFwiI3JldHVyblByb2ZpbGVcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgalF1ZXJ5KCcucHQtbWFuYWdpbmctdXNlcicpLnNsaWRlVXAoJ2Zhc3QnKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzd2l0Y2hGbG93JywgJ25vbmUnKTtcbiAgICAgIHdyaXRlVXNlcigpO1xuICAgICAgd2luZG93LnJlbG9hZCgpO1xuICAgIH0pO1xuXG4gIH1cbn1cblxucmVhZENsaWVudCgpO1xuXG5mdW5jdGlvbiByZWFkUmVwKCkge1xuICBjb25zb2xlLmxvZygnUmVhZGluZyByZXAgZGF0YScpO1xuICB2YXIgcmVwcyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJzUmVwcycpO1xuICB2YXIgcGFyc2VkUmVwcyA9IEpTT04ucGFyc2UocmVwcyk7XG4gIHZhciBzZXNzaW9uR3VpZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Nlc3Npb25HdWlkJyk7XG5cbiAgaWYgKHBhcnNlZFJlcHMpIHtcblxuICAgIHZhciByZXBMaXN0RnVsbEh0bWwgPSAnJztcbiAgICAkLmVhY2gocGFyc2VkUmVwcywgZnVuY3Rpb24gKGluZGV4LCByZXApIHtcblxuICAgICAgLy8gd3JpdGUgdGhlIHJlcCBjdXJyZW50bHkgYmVpbmcgd29ya2VkIG9uXG4gICAgICBpZiAocmVwLmlkID09PSBzZXNzaW9uR3VpZCkge1xuICAgICAgICAkLmVhY2gocmVwLCBmdW5jdGlvbiAoaW5kZXgsIHJlcCkge1xuICAgICAgICAgICQoJy5wdC1jdXJyZW50LXJlcC0nICsgaW5kZXgpLmh0bWwocmVwKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXAucm9sZSAhPT0gXCJDZWFzZVwiKSB7XG5cbiAgICAgICAgcmVwLm5hbWVGdWxsID0gcmVwLm5hbWVGaXJzdCArICcgJyArIHJlcC5uYW1lTGFzdDtcblxuICAgICAgICAvLyBhbGwgcmVwcyBsaXN0XG4gICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tMTIgbWFyZ2luLWJlbG93LS1taWRcIj48ZGl2IGNsYXNzPVwiaG9yaXpvbnRhbC1jYXJkLXNlY3Rpb25cIj4nO1xuICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gJzxkaXYgY2xhc3M9XCJjYXJkIGNhcmQtLWhvcml6b250YWwgZmxleC1jb250YWluZXJcIj48ZGl2IGNsYXNzPVwiZmxleC1pdGVtIGZsZXgtaXRlbS0taWNvbi1vbmx5XCI+JztcbiAgICAgICAgcmVwTGlzdEZ1bGxIdG1sICs9ICc8c3BhbiBjbGFzcz1cImZhbCBmYS1pY29uLW5yIGZhLXVzZXItZWRpdFwiPjwvc3Bhbj4gPC9kaXY+PGRpdiBjbGFzcz1cImZsZXgtaXRlbSBmbGV4LWl0ZW0tLWxhcmdlXCI+PHA+PHN0cm9uZz4nO1xuICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gcmVwLm5hbWVGaXJzdCArICcgJyArIHJlcC5uYW1lTGFzdDtcbiAgICAgICAgcmVwTGlzdEZ1bGxIdG1sICs9ICc8L3N0cm9uZz48L3A+ICA8cD48c3Ryb25nPiBZb3VyIGN1cnJlbnQgcm9sZTogPC9zdHJvbmc+J1xuICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gcmVwLnJvbGU7XG4gICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSAnPC9wPjxwPiA8c3Ryb25nPiBSZXByZXNlbnRhdGlvbiBkYXRlOiA8L3N0cm9uZz4nO1xuICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gcmVwLnN0YXJ0RGF0ZURkICsgJyAvICcgKyByZXAuc3RhcnREYXRlTW0gKyAnIC8gJyArIHJlcC5zdGFydERhdGVZeXl5O1xuICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gJyB0byAnO1xuICAgICAgICBpZiAocmVwLmVuZERhdGVEZCkge1xuICAgICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSByZXAuZW5kRGF0ZURkICsgJyAvICcgKyByZXAuZW5kRGF0ZU1tICsgJyAvICcgKyByZXAuZW5kRGF0ZVl5eXk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVwTGlzdEZ1bGxIdG1sICs9ICcobm8gZml4ZWQgZW5kIGRhdGUpPC9wPic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcC5lbnF1aXJlT25saW5lKSB7XG4gICAgICAgICAgcmVwTGlzdEZ1bGxIdG1sICs9ICc8cD48c3Ryb25nPiBPbmxpbmUgYWNjZXNzOiA8L3N0cm9uZz4nO1xuICAgICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSByZXAuZW5xdWlyZU9ubGluZSArICc8L3A+JztcbiAgICAgICAgfVxuICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gJzwvZGl2PjxkaXYgY2xhc3M9XCJmbGV4LWl0ZW0gZmxleC1pdGVtLS1yaWdodC1hbGlnblwiPjxwPjxidXR0b24gY2xhc3M9XCJ1aWtpdC1idG4gc21hbGwgdWlraXQtYnRuLS10ZXJ0aWFyeVwiIG9uY2xpY2s9XCJ3aW5kb3cubG9jYXRpb24uaHJlZj1cXCcvYXV0aC9wcm9maWxlL25vbXJlcC9mb3JtLXJlcC0zJztcbiAgICAgICAgcmVwTGlzdEZ1bGxIdG1sICs9ICc/c3RhdGU9ZWRpdCZpZD0nICsgcmVwLmlkICsgJ1xcJ1wiPic7XG4gICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSAnRWRpdCBSb2xlPC9idXR0b24+PC9wPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PidcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgLy8gJCgnLnB0LWN1cnJlbnQtdXNlci1yZXAtbGlzdCcpLmh0bWwocmVwTGlzdEh0bWwpO1xuICAgICQoJy5wdC1yZXAtbGlzdC1mdWxsJykuaHRtbChyZXBMaXN0RnVsbEh0bWwpO1xuICB9XG59XG5cbmxldCBjdXJyZW50UGVyc29uID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGVyc29uJykpO1xuXG5pZiAoIWN1cnJlbnRQZXJzb24uY2FyZHMgfHwgY3VycmVudFBlcnNvbi5jYXJkcy5sZW5ndGggPCAxKSB7XG4gICQoXCIjaGVhbHRoY2FyZFwiKS5oaWRlKCk7XG59Il0sImZpbGUiOiJ1c2VyLmpzIn0=
