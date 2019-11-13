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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuanMiXSwibmFtZXMiOlsiZ2V0QWdlIiwiZGF0ZVN0cmluZyIsInRvZGF5IiwiRGF0ZSIsImJpcnRoRGF0ZSIsImFnZSIsImdldEZ1bGxZZWFyIiwibSIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImdldEZvcm1EYXRhIiwiJGZvcm0iLCJ1bmluZGV4ZWRfYXJyYXkiLCJzZXJpYWxpemVBcnJheSIsImluZGV4ZWRfYXJyYXkiLCIkIiwibWFwIiwibiIsImkiLCJndWlkR2VuZXJhdG9yIiwiUzQiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJzdWJzdHJpbmciLCJkb2N1bWVudCIsImtleXByZXNzIiwiZSIsIndoaWNoIiwidG9nZ2xlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbnNvbGUiLCJsb2ciLCJ0YXJnZXQiLCJpbml0Tm9tUmVwIiwicmVwRmxvdyIsImdldFVybFBhcmFtZXRlciIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJnZXRJdGVtIiwialF1ZXJ5Iiwic2hvdyIsImhpZGUiLCJpbml0QmFubmVycyIsImJhbm5lckZsb3ciLCJpbml0U3dpdGNoIiwic3dpdGNoRmxvdyIsInN3aXRjaElkIiwic2xpZGVEb3duIiwib24iLCJhZGRDbGFzcyIsImFqYXgiLCJ1cmwiLCJhc3luYyIsImRhdGFUeXBlIiwiZG9uZSIsImRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwicGVyc29uIiwiJHVzZXJTZWxlY3QiLCJlbXB0eSIsImFwcGVuZCIsImVhY2giLCJrZXkiLCJ2YWx1ZSIsIl9pZCIsIm5hbWVGdWxsIiwiY2hhbmdlIiwic2VsZWN0ZWRJZCIsInNlc3Npb25TdG9yYWdlIiwicmVtb3ZlSXRlbSIsImluZGV4IiwiZWxlbWVudCIsInNsaWRlVXAiLCJ3cml0ZVVzZXIiLCJ1c2VyIiwicGFyc2UiLCJzZXNzaW9uQ2xpZW50cyIsInNlc3Npb25SZXBzIiwid2luZG93IiwiYWxsQ2xpZW50cyIsImFsbFJlcHMiLCJjbGllbnQiLCJwdXNoIiwiY2xpZW50cyIsInJlcCIsInJlcHMiLCJmaXJzdFRpbWVVc2VyIiwic2Vzc2lvbkNsaWVudFN1Ym1pdHRlZCIsInNlc3Npb25SZXBTdWJtaXR0ZWQiLCJsZW5ndGgiLCJudW1iZXJPZkNsaWVudHMiLCJudW1iZXJPZlJlcHMiLCJjbGFpbXMiLCJudW1iZXJPZkNsYWltcyIsInByYWN0aXRpb25lcnMiLCJ0eXBlIiwicHJhY3QiLCJpbmNsdWRlcyIsInVzZXJIdG1sIiwic3RhcnQiLCJlbmQiLCJkb2IiLCJ2ZXRlcmFuIiwiaXNDdXJyZW50bHlTZXJ2aW5nIiwibGFzdFBheW1lbnQiLCJzdG9yeSIsInBpY3R1cmUiLCJodG1sIiwibmFtZSIsImZpcnN0Iiwid3JpdGVDbGllbnQiLCJmb3JtIiwiZm9ybURhdGEiLCJleGlzdGluZ0NsaWVudCIsInBhcnNlZENsaWVudHMiLCJzZXNzaW9uR3VpZCIsImlkIiwiZXh0ZW5kIiwid3JpdGVSZXAiLCJleGlzdGluZ1JlcCIsInBhcnNlZFJlcHMiLCJyZWFkQ2xpZW50IiwidXJsSWQiLCJwYXJzZWRVc2VyIiwiY2xpZW50TGlzdEh0bWwiLCJjbGllbnRMaXN0RnVsbEh0bWwiLCJuYW1lRmlyc3QiLCJuYW1lTGFzdCIsInJvbGUiLCJzdGFydERhdGVEZCIsInN0YXJ0RGF0ZU1tIiwic3RhcnREYXRlWXl5eSIsImVuZERhdGVEZCIsImVuZERhdGVNbSIsImVuZERhdGVZeXl5IiwiZW5xdWlyZU9ubGluZSIsImNsaWNrIiwicmVsb2FkIiwicmVhZFJlcCIsInJlcExpc3RGdWxsSHRtbCIsImN1cnJlbnRQZXJzb24iLCJjYXJkcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUVBO0FBQ0EsU0FBU0EsTUFBVCxDQUFnQkMsVUFBaEIsRUFBNEI7QUFDMUIsTUFBSUMsS0FBSyxHQUFHLElBQUlDLElBQUosRUFBWjtBQUNBLE1BQUlDLFNBQVMsR0FBRyxJQUFJRCxJQUFKLENBQVNGLFVBQVQsQ0FBaEI7QUFDQSxNQUFJSSxHQUFHLEdBQUdILEtBQUssQ0FBQ0ksV0FBTixLQUFzQkYs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QixDQUF6RCxFQUE0RDtBQUMxRDVFLEVBQUFBLENBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUIyQixJQUFqQjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdXRpbGl0eSBmdW5jdGlvbnMgXHJcblxyXG4vLyByZXR1cm5zIGFnZSBmcm9tIGRhdGUgb2YgYmlydGggc3RyaW5nIFxyXG5mdW5jdGlvbiBnZXRBZ2UoZGF0ZVN0cmluZykge1xyXG4gIHZhciB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgdmFyIGJpcnRoRGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHJpbmcpO1xyXG4gIHZhciBhZ2UgPSB0b2RheS5nZXRGdWxsWWVhcigpIC0gYmlydGhEYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgdmFyIG0gPSB0b2RheS5nZXRNb250aCgpIC0gYmlydGhEYXRlLmdldE1vbnRoKCk7XHJcbiAgaWYgKG0gPCAwIHx8IChtID09PSAwICYmIHRvZGF5LmdldERhdGUoKSA8IGJpcnRoRGF0ZS5nZXREYXRlKCkpKSB7XHJcbiAgICBhZ2UtLTtcclxuICB9XHJcbiAgcmV0dXJuIGFnZTtcclxufVxyXG5cclxuLy8gcmV0dXJucyBzZXJpYWxpemVzIGZvcm0gZGF0YSBmcm9tIGEgZm9ybSBcclxuZnVuY3Rpb24gZ2V0Rm9ybURhdGEoJGZvcm0pIHtcclxuICB2YXIgdW5pbmRleGVkX2FycmF5ID0gJGZvcm0uc2VyaWFsaXplQXJyYXkoKTtcclxuICB2YXIgaW5kZXhlZF9hcnJheSA9IHt9O1xyXG5cclxuICAkLm1hcCh1bmluZGV4ZWRfYXJyYXksIGZ1bmN0aW9uIChuLCBpKSB7XHJcbiAgICBpbmRleGVkX2FycmF5W25bJ25hbWUnXV0gPSBuWyd2YWx1ZSddO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gaW5kZXhlZF9hcnJheTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ3VpZEdlbmVyYXRvcigpIHtcclxuICB2YXIgUzQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gKCgoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMCkgfCAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpO1xyXG4gIH07XHJcbiAgcmV0dXJuIChTNCgpICsgUzQoKSArIFwiLVwiICsgUzQoKSArIFwiLVwiICsgUzQoKSArIFwiLVwiICsgUzQoKSArIFwiLVwiICsgUzQoKSArIFM0KCkgKyBTNCgpKTtcclxufVxyXG5cclxuLy8gZW5kIHV0aWxpdHkgZnVuY3Rpb25zIFxyXG5cclxuXHJcbi8vIGNhbGwgdXAgdGhlIHBlcnNvbmEgcGFuZWwgdmlhIGtleWJvYXJkIFxyXG4kKGRvY3VtZW50KS5rZXlwcmVzcyhmdW5jdGlvbiAoZSkge1xyXG5cclxuICBzd2l0Y2ggKGUud2hpY2gpIHtcclxuICAgIGNhc2UgMTI2OiAvL3RpbGRhICsgc2hpZnRcclxuICAgICAgJCgnLnB0LXBlcnNvbmEtc3dpdGNoZXInKS50b2dnbGUoKTtcclxuICAgICAgLy8gYWRkTGlzdGVuZXJzKCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICB9XHJcbn0pO1xyXG5cclxuLy8gd2luZG93Lm9ubG9hZCA9IGFkZExpc3RlbmVycygpO1xyXG5cclxuLy8gZnVuY3Rpb24gYWRkTGlzdGVuZXJzKCkge1xyXG4vLyAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3B0LXBlcnNvbmEtc3dpdGNoZXInKVswXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZURvd24sIGZhbHNlKTtcclxuLy8gICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlVXAsIGZhbHNlKTtcclxuXHJcbi8vIH1cclxuXHJcbi8vIGZ1bmN0aW9uIG1vdXNlVXAoKSB7XHJcbi8vICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRpdk1vdmUsIHRydWUpO1xyXG4vLyB9XHJcblxyXG4vLyBmdW5jdGlvbiBtb3VzZURvd24oZSkge1xyXG4vLyAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBkaXZNb3ZlLCB0cnVlKTtcclxuLy8gfVxyXG5cclxuLy8gZnVuY3Rpb24gZGl2TW92ZShlKSB7XHJcbi8vICAgdmFyIGRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3B0LXBlcnNvbmEtc3dpdGNoZXInKVswXTtcclxuLy8gICBkaXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4vLyAgIGRpdi5zdHlsZS50b3AgPSBlLmNsaWVudFkgKyAncHgnO1xyXG4vLyAgIGRpdi5zdHlsZS5sZWZ0ID0gZS5jbGllbnRYICsgJ3B4JztcclxuLy8gfVxyXG5cclxuXHJcbi8vIG9yIHZpYSBsb2dvIGxvbmcgcHJlc3NcclxuXHJcbi8vIC8vIGdyYWIgdGhlIGVsZW1lbnRcclxuLy8gdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215cy1sb2dvJyk7XHJcblxyXG4vLyAvLyBsaXN0ZW4gZm9yIHRoZSBsb25nLXByZXNzIGV2ZW50XHJcbi8vIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvbmctcHJlc3MnLCBmdW5jdGlvbiAoZSkge1xyXG4vLyAgIC8vIHN0b3AgdGhlIGV2ZW50IGZyb20gYnViYmxpbmcgdXBcclxuLy8gICBlLnByZXZlbnREZWZhdWx0KClcclxuLy8gICAkKCcucHQtcGVyc29uYS1zd2l0Y2hlcicpLnRvZ2dsZSgpO1xyXG4vLyB9KTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3N3aXBlZC1sZWZ0JywgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zb2xlLmxvZyhlLnRhcmdldCk7IC8vIGVsZW1lbnQgdGhhdCB3YXMgc3dpcGVkXHJcbiAgJCgnLnB0LXBlcnNvbmEtc3dpdGNoZXInKS50b2dnbGUoKTtcclxufSk7XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGluaXROb21SZXAoKSB7XHJcblxyXG4gIHZhciByZXBGbG93ID0gZ2V0VXJsUGFyYW1ldGVyKCdyZXBGbG93Jyk7XHJcblxyXG4gIGlmIChyZXBGbG93KSB7XHJcblxyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlcEZsb3cnLCByZXBGbG93KTtcclxuXHJcbiAgfSBlbHNlIGlmIChcInJlcEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXBGbG93JywgJ25vbmUnKTtcclxuICB9XHJcblxyXG4gIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3JlcEZsb3cnKSA9PSAnYm90aCcpKSB7XHJcbiAgICBqUXVlcnkoXCIucHQtZmlyc3QtdGltZS1ub1wiKS5zaG93KCk7XHJcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctcmVwcmVzZW50aW5nLW5vXCIpLmhpZGUoKTtcclxuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1yZXByZXNlbnRlZC1ub1wiKS5oaWRlKCk7XHJcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctbm9uZVwiKS5oaWRlKCk7XHJcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctcmVwcmVzZW50aW5nXCIpLnNob3coKTtcclxuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1yZXByZXNlbnRlZFwiKS5zaG93KCk7XHJcbiAgfSBlbHNlIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3JlcEZsb3cnKSA9PSAnbm9uZScpKSB7XHJcbiAgICBqUXVlcnkoXCIucHQtZmlyc3QtdGltZS1ub1wiKS5zaG93KCk7XHJcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctcmVwcmVzZW50aW5nXCIpLmhpZGUoKTtcclxuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1yZXByZXNlbnRlZFwiKS5oaWRlKCk7XHJcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctbm9uZS1ub1wiKS5oaWRlKCk7XHJcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctbm9uZVwiKS5zaG93KCk7XHJcbiAgfSBlbHNlIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3JlcEZsb3cnKSA9PSAncmVwcmVzZW50aW5nJykpIHtcclxuICAgIGpRdWVyeShcIi5wdC1maXJzdC10aW1lLW5vXCIpLnNob3coKTtcclxuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1yZXByZXNlbnRlZFwiKS5oaWRlKCk7XHJcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctcmVwcmVzZW50aW5nLW5vXCIpLmhpZGUoKTtcclxuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1ub25lXCIpLmhpZGUoKTtcclxuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1yZXByZXNlbnRpbmdcIikuc2hvdygpO1xyXG4gIH0gZWxzZSBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZXBGbG93JykgPT0gJ3JlcHJlc2VudGVkJykpIHtcclxuICAgIGpRdWVyeShcIi5wdC1maXJzdC10aW1lLW5vXCIpLnNob3coKTtcclxuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1yZXByZXNlbnRpbmdcIikuaGlkZSgpO1xyXG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LW5vbmVcIikuaGlkZSgpO1xyXG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LXJlcHJlc2VudGVkXCIpLnNob3coKTtcclxuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1yZXByZXNlbnRlZC1ub1wiKS5oaWRlKCk7XHJcbiAgfSBlbHNlIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3JlcEZsb3cnKSA9PSAnbmV3YmllJykpIHtcclxuICAgIGpRdWVyeShcIi5wdC1maXJzdC10aW1lLW5vXCIpLmhpZGUoKTtcclxuICAgIGpRdWVyeShcIi5wdC1maXJzdC10aW1lXCIpLnNob3coKTtcclxuICB9XHJcbn1cclxuXHJcbmluaXROb21SZXAoKTtcclxuXHJcblxyXG4vLyBiYW5uZXJzXHJcbmZ1bmN0aW9uIGluaXRCYW5uZXJzKCkge1xyXG5cclxuICB2YXIgYmFubmVyRmxvdyA9IGdldFVybFBhcmFtZXRlcignYmFubmVyRmxvdycpO1xyXG5cclxuICBpZiAoYmFubmVyRmxvdykge1xyXG5cclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdiYW5uZXJGbG93JywgYmFubmVyRmxvdyk7XHJcblxyXG4gIH0gZWxzZSBpZiAoXCJiYW5uZXJGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYmFubmVyRmxvdycsICdub25lJyk7XHJcbiAgfVxyXG5cclxuICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiYW5uZXJGbG93JykgPT0gJ2FsbCcpKSB7XHJcbiAgICBqUXVlcnkoXCIucHQtYmFubmVyLXNlcnZpY2VcIikuc2hvdygpO1xyXG4gICAgalF1ZXJ5KFwiLnB0LWJhbm5lci1uci1yZXBcIikuc2hvdygpO1xyXG4gIH0gZWxzZSBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiYW5uZXJGbG93JykgPT0gJ25vbmUnKSkge1xyXG4gICAgalF1ZXJ5KFwiLnB0LWJhbm5lci1zZXJ2aWNlXCIpLmhpZGUoKTtcclxuICAgIGpRdWVyeShcIi5wdC1iYW5uZXItbnItcmVwXCIpLmhpZGUoKTtcclxuICB9IGVsc2UgaWYgKChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmFubmVyRmxvdycpID09ICdzZXJ2aWNlJykpIHtcclxuICAgIGpRdWVyeShcIi5wdC1iYW5uZXItc2VydmljZVwiKS5zaG93KCk7XHJcbiAgICBqUXVlcnkoXCIucHQtYmFubmVyLW5yLXJlcFwiKS5oaWRlKCk7XHJcbiAgfSBlbHNlIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Jhbm5lckZsb3cnKSA9PSAnbnItcmVwJykpIHtcclxuICAgIGpRdWVyeShcIi5wdC1iYW5uZXItc2VydmljZVwiKS5oaWRlKCk7XHJcbiAgICBqUXVlcnkoXCIucHQtYmFubmVyLW5yLXJlcFwiKS5zaG93KCk7XHJcbiAgfVxyXG59XHJcblxyXG5pbml0QmFubmVycygpO1xyXG5cclxuXHJcbi8vIFN3aXRjaCBhY2NvdW50XHJcbmZ1bmN0aW9uIGluaXRTd2l0Y2goKSB7XHJcblxyXG4gIHZhciBzd2l0Y2hGbG93ID0gZ2V0VXJsUGFyYW1ldGVyKCdzd2l0Y2hGbG93Jyk7XHJcbiAgdmFyIHN3aXRjaElkID0gZ2V0VXJsUGFyYW1ldGVyKCdzd2l0Y2hJZCcpO1xyXG5cclxuICBpZiAoc3dpdGNoRmxvdykge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N3aXRjaEZsb3cnLCBzd2l0Y2hGbG93KTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzd2l0Y2hJZCcsIHN3aXRjaElkKTtcclxuICAgIGpRdWVyeSgnLnB0LW1hbmFnaW5nLXVzZXIgJykuc2xpZGVEb3duKCdmYXN0Jyk7XHJcbiAgfVxyXG5cclxuICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzd2l0Y2hGbG93JykgPT0gJ2FjdGl2ZScpKSB7XHJcbiAgICBqUXVlcnkoJy5wdC1tYW5hZ2luZy11c2VyICcpLnNob3coKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIGpRdWVyeSgnLnN3aXRjaC1hY2NvdW50LWJ1dHRvbicpLnJlbW92ZUNsYXNzKFwic3dpdGNoLWFjY291bnQtYnV0dG9uLS1jdXJyZW50XCIpO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICAvLyBoaWRlIHN3aXRjaCBhY2NvdW50IG92ZXJsYXkgd2hlbiBjbGlja2luZyBlbHNld2hlcmUgb24gdGhlIHBhZ2VcclxuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICQoXCIuc3dpdGNoLWFjY291bnQtYm94XCIpLmFkZENsYXNzKFwic3dpdGNoLWFjY291bnQtYm94LS1oaWRlXCIpO1xyXG4gIH0pO1xyXG5cclxufVxyXG5cclxuaW5pdFN3aXRjaCgpO1xyXG5cclxuXHJcblxyXG5cclxuLy8gdG8gZ2VuZXJhdGUgbW9yZSB1c2VycywgZ28gdG8gd3d3Lmpzb24tZ2VuZXJhdG9yLmNvbSBhbmQgcGFzdGUgaW4gdGhlIGRhdGEgZnJvbSAvZG9jcy9kYXRhL3VzZXIuZ2VuZXJhdG9yIFxyXG4vLyBhbmQgcGFzdGUgaW4gdGhlIGdlbmVyYXRlZCB1c2VycyBpbiB0byAvZG9jcy9kYXRhL3VzZXIuanNvblxyXG5cclxuLy8gUHVsbCBpbiB0aGUganNvbiBjb250ZW50IFxyXG4kLmFqYXgoe1xyXG4gIHVybDogJy9kb2NzL2RhdGEvdXNlci5qc29uJyxcclxuICBhc3luYzogZmFsc2UsXHJcbiAgZGF0YVR5cGU6ICdqc29uJ1xyXG59KS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gIGNvbnNvbGUubG9nKCdVc2VyIGRhdGEgYmFjaycpO1xyXG5cclxuXHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FsbFBlcnNvbnMnLCBKU09OLnN0cmluZ2lmeShkYXRhLnBlcnNvbikpO1xyXG5cclxuICAvLyBzZXQgdGhlIGRlZmF1bHQgTXlTZXJ2aWNlIHVzZXIgaWYgbm8gdXNlciBoYXMgYmVlbiByZXF1ZXN0ZWQgXHJcbiAgaWYgKCEobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BlcnNvbicpKSkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BlcnNvbicsIEpTT04uc3RyaW5naWZ5KGRhdGEucGVyc29uWzBdKSk7XHJcbiAgICBjb25zb2xlLmxvZygnc2V0dGluZyB0aGUgZGVmYXVsdCB1c2VyJyk7XHJcbiAgfVxyXG5cclxuICAvLyBwb3B1bGF0ZSB0aGUgdXNlciBkcm9wZG93biBsaXN0IHdpdGggdXNlcnMgZnJvbSB0aGUganNvblxyXG4gIHZhciAkdXNlclNlbGVjdCA9ICQoJyN1c2VyLWRyb3AtZG93bicpO1xyXG4gICR1c2VyU2VsZWN0LmVtcHR5KCk7XHJcbiAgJHVzZXJTZWxlY3QuYXBwZW5kKCc8b3B0aW9uPi0tIFNlbGVjdCBhIHVzZXIgLS08L29wdGlvbj4nKTtcclxuICAkLmVhY2goZGF0YS5wZXJzb24sIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAkdXNlclNlbGVjdC5hcHBlbmQoJzxvcHRpb24gdmFsdWU9JyArIHZhbHVlLl9pZCArICc+JyArIHZhbHVlLm5hbWVGdWxsICsgJzwvb3B0aW9uPicpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBzd2l0Y2ggdGhlIHVzZXIgXHJcbiAgJHVzZXJTZWxlY3QuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzZWxlY3RlZElkID0gdGhpcy52YWx1ZTtcclxuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJzQ2xpZW50cycpO1xyXG4gICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcnNSZXBzJyk7XHJcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdzZXNzaW9uR3VpZCcpO1xyXG5cclxuICAgICQuZWFjaChkYXRhLnBlcnNvbiwgZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XHJcblxyXG4gICAgICBpZiAoZWxlbWVudC5faWQgPT09IHNlbGVjdGVkSWQpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGVyc29uJywgSlNPTi5zdHJpbmdpZnkoZGF0YS5wZXJzb25baW5kZXhdKSk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N3aXRjaElkJywgJ25vbmUnKTtcclxuICAgICAgICBqUXVlcnkoJy5wdC1tYW5hZ2luZy11c2VyJykuc2xpZGVVcCgnZmFzdCcpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzd2l0Y2hGbG93JywgJ25vbmUnKTtcclxuICAgICAgICB3cml0ZVVzZXIoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgd3JpdGVVc2VyKCk7XHJcbn0pO1xyXG5cclxuXHJcbi8vIHB1dCB0aGUgdXNlciBmcm9tIHVzZXIuanMgaW4gdG8gbG9jYWwgc3RvcmFnZSBhbmQgdGhlIHVzZXJzIGNsaWVudHMgaW4gdG8gc2Vzc2lvbiBzdG9yYWdlIFxyXG5mdW5jdGlvbiB3cml0ZVVzZXIoKSB7XHJcblxyXG4gIGNvbnNvbGUubG9nKCdXcml0aW5nIHVzZXIgICcpO1xyXG5cclxuICBjb25zdCB1c2VyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGVyc29uJykpO1xyXG4gIGNvbnN0IHNlc3Npb25DbGllbnRzID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2Vyc0NsaWVudHMnKSk7XHJcbiAgY29uc3Qgc2Vzc2lvblJlcHMgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJzUmVwcycpKTtcclxuXHJcbiAgd2luZG93LmFsbENsaWVudHMgPSBbXTtcclxuICB3aW5kb3cuYWxsUmVwcyA9IFtdO1xyXG5cclxuICBpZiAoc2Vzc2lvbkNsaWVudHMpIHtcclxuXHJcbiAgICAkLmVhY2goc2Vzc2lvbkNsaWVudHMsIGZ1bmN0aW9uIChpbmRleCwgY2xpZW50KSB7XHJcbiAgICAgIC8vIGFkZCBuZXcgZm9ybSBkYXRhIHRvIGFuIGV4aXN0aW5nIGNsaWVudFxyXG4gICAgICB3aW5kb3cuYWxsQ2xpZW50cy5wdXNoKGNsaWVudCk7XHJcbiAgICB9KTtcclxuXHJcbiAgfSBlbHNlIHsgLy8gbm8gY2xpZW50IGRhdGEgaW4gc2Vzc2lvbiBzbyBnZXQgaXQgZnJvbSB0aGUgdXNlciBcclxuICAgICQuZWFjaCh1c2VyLmNsaWVudHMsIGZ1bmN0aW9uIChpbmRleCwgY2xpZW50KSB7XHJcblxyXG4gICAgICB3aW5kb3cuYWxsQ2xpZW50cy5wdXNoKGNsaWVudCk7XHJcblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpZiAoc2Vzc2lvblJlcHMpIHtcclxuXHJcbiAgICAkLmVhY2goc2Vzc2lvblJlcHMsIGZ1bmN0aW9uIChpbmRleCwgcmVwKSB7XHJcbiAgICAgIC8vIGFkZCBuZXcgZm9ybSBkYXRhIHRvIGFuIGV4aXN0aW5nIHJlcFxyXG4gICAgICB3aW5kb3cuYWxsUmVwcy5wdXNoKHJlcCk7XHJcbiAgICB9KTtcclxuXHJcbiAgfSBlbHNlIHsgLy8gbm8gcmVwIGRhdGEgaW4gc2Vzc2lvbiBzbyBnZXQgaXQgZnJvbSB0aGUgdXNlciBcclxuICAgICQuZWFjaCh1c2VyLnJlcHMsIGZ1bmN0aW9uIChpbmRleCwgcmVwKSB7XHJcblxyXG4gICAgICB3aW5kb3cuYWxsUmVwcy5wdXNoKHJlcCk7XHJcblxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgndXNlcnNDbGllbnRzJywgSlNPTi5zdHJpbmdpZnkod2luZG93LmFsbENsaWVudHMpKTtcclxuICAvLyBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1c2Vyc011bHRpcGxlQ2xpZW50cycsIEpTT04uc3RyaW5naWZ5KHdpbmRvdy5hbGxDbGllbnRzKSk7XHJcblxyXG4gIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3VzZXJzUmVwcycsIEpTT04uc3RyaW5naWZ5KHdpbmRvdy5hbGxSZXBzKSk7XHJcblxyXG4gIHZhciBmaXJzdFRpbWVVc2VyID0gdHJ1ZTtcclxuICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnc2Vzc2lvbkd1aWQnKSkge1xyXG4gICAgZmlyc3RUaW1lVXNlciA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLy8gY291bnQgbnVtYmVyIG9mIGNsaWVudHMgXHJcbiAgdmFyIHNlc3Npb25DbGllbnRTdWJtaXR0ZWQgPSBmYWxzZTtcclxuICB2YXIgc2Vzc2lvblJlcFN1Ym1pdHRlZCA9IGZhbHNlO1xyXG5cclxuXHJcblxyXG4gIGlmICgod2luZG93LmFsbENsaWVudHMubGVuZ3RoID4gMCkgJiYgKHdpbmRvdy5hbGxSZXBzLmxlbmd0aCA+IDApKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnIGJvdGgnKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXBGbG93JywgJ2JvdGgnKTtcclxuICAgICQoJy5wdC1zd2l0Y2gtYWNjb3VudCcpLnNob3coKTtcclxuXHJcbiAgICBpZiAodXNlci5jbGllbnRzKSB7XHJcbiAgICAgIHNlc3Npb25DbGllbnRTdWJtaXR0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICB9IGVsc2UgaWYgKHdpbmRvdy5hbGxDbGllbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGNvbnNvbGUubG9nKCcgcmVwcmVzZW50aW5nJyk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVwRmxvdycsICdyZXByZXNlbnRpbmcnKTtcclxuICAgIGlmICh1c2VyLmNsaWVudHMpIHtcclxuICAgICAgc2Vzc2lvbkNsaWVudFN1Ym1pdHRlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmICh3aW5kb3cuYWxsUmVwcy5sZW5ndGggPiAwKSB7XHJcbiAgICBjb25zb2xlLmxvZygnIHJlcHJlc2VudGVkJyk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVwRmxvdycsICdyZXByZXNlbnRlZCcpO1xyXG4gICAgaWYgKHVzZXIucmVwcykge1xyXG4gICAgICBzZXNzaW9uUmVwU3VibWl0dGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGlmIChzZXNzaW9uUmVwcykge1xyXG4gIC8vICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlcEZsb3cnLCAncmVwcmVzZW50aW5nJyk7XHJcbiAgLy8gICBpZiAoc2Vzc2lvblJlcHMucmVwWzBdLnN1Ym1pdHRlZEFwcGxpY2F0aW9uID09IFwidHJ1ZVwiKSB7XHJcbiAgLy8gICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXBGbG93JywgJ3JlcHJlc2VudGluZycpO1xyXG4gIC8vICAgICB2YXIgc2Vzc2lvblJlcFN1Ym1pdHRlZCA9IHRydWU7XHJcbiAgLy8gICAgIHVzZXIucmVwcy5wdXNoKHNlc3Npb25SZXBzLnJlcFswXSk7XHJcbiAgLy8gICB9XHJcblxyXG4gIC8vICAgaWYgKHNlc3Npb25SZXBzLnJlcFswXS5yb2xlID09IFwiQ2Vhc2VcIikge1xyXG4gIC8vICAgICB1c2VyLm51bWJlck9mUmVwcyA9IDBcclxuICAvLyAgICAgdXNlci5yZXBzLmxlbmd0aCA9IDA7XHJcbiAgLy8gICAgIHNlc3Npb25SZXBTdWJtaXR0ZWQgPSBmYWxzZTtcclxuICAvLyAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlcEZsb3cnLCAnbm9uZScpO1xyXG4gIC8vICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCd1c2Vyc1JlcHMnKTtcclxuICAvLyAgICAgaWYgKCF3aW5kb3cubG9jYXRpb24uaGFzaCkge1xyXG4gIC8vICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbiArICcjcmVwLWxpc3QnO1xyXG4gIC8vICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfVxyXG5cclxuICAvLyB9XHJcblxyXG5cclxuICAvLyBzZXRcclxuICBpZiAoKHVzZXIuY2xpZW50cy5sZW5ndGggPiAwKSB8fCAoc2Vzc2lvbkNsaWVudFN1Ym1pdHRlZCA9PT0gdHJ1ZSkpIHtcclxuXHJcbiAgICBpZiAodXNlci5jbGllbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgdXNlci5udW1iZXJPZkNsaWVudHMgPSB1c2VyLmNsaWVudHMubGVuZ3RoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdXNlci5udW1iZXJPZkNsaWVudHMgPSB3aW5kb3cuYWxsQ2xpZW50cy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gIH0gZWxzZSBpZiAodXNlci5jbGllbnRzLmxlbmd0aCA8IDEpIHtcclxuICAgIHVzZXIubnVtYmVyT2ZDbGllbnRzID0gMDtcclxuICB9XHJcblxyXG4gIGlmICgodXNlci5yZXBzLmxlbmd0aCA+IDApIHx8IChzZXNzaW9uUmVwU3VibWl0dGVkID09PSB0cnVlKSkge1xyXG5cclxuICAgIGlmICh1c2VyLnJlcHMubGVuZ3RoID4gMCkge1xyXG4gICAgICB1c2VyLm51bWJlck9mUmVwcyA9IHVzZXIucmVwcy5sZW5ndGg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB1c2VyLm51bWJlck9mUmVwcyA9IHdpbmRvdy5hbGxSZXBzLmxlbmd0aDtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHVzZXIucmVwcy5sZW5ndGggPCAxKSB7XHJcbiAgICB1c2VyLm51bWJlck9mUmVwcyA9IDA7XHJcbiAgICAvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVwRmxvdycsICduZXdiaWUnKTtcclxuICB9XHJcblxyXG4gIGlmICh1c2VyLmNsYWltcykge1xyXG4gICAgdXNlci5udW1iZXJPZkNsYWltcyA9IHVzZXIuY2xhaW1zLmxlbmd0aDtcclxuICB9IGVsc2Uge1xyXG4gICAgdXNlci5udW1iZXJPZkNsYWltcyA9IDA7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gc2hvdyBoaWRlIHRoZSBzd2l0Y2ggYWNjb3VudCBidXR0b25zXHJcblxyXG4gIC8vIGNvbnNvbGUubG9nKCdzZXNzaW9uQ2xpZW50U3VibWl0dGVkIC0+ICcgKyBzZXNzaW9uQ2xpZW50U3VibWl0dGVkKTtcclxuICAvLyBjb25zb2xlLmxvZygnd2luZG93LmFsbENsaWVudHMubGVuZ3RoIC0+ICcgKyB3aW5kb3cuYWxsQ2xpZW50cy5sZW5ndGgpO1xyXG4gIGlmICgoc2Vzc2lvblJlcFN1Ym1pdHRlZCA9PT0gdHJ1ZSkgJiYgKHNlc3Npb25DbGllbnRTdWJtaXR0ZWQgPT09IHRydWUpKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVwRmxvdycsICdib3RoJyk7XHJcbiAgICAkKCcucHQtc3dpdGNoLWFjY291bnQnKS5zaG93KCk7XHJcbiAgICBmaXJzdFRpbWVVc2VyID0gZmFsc2U7XHJcbiAgfSBlbHNlIGlmICgoc2Vzc2lvblJlcFN1Ym1pdHRlZCA9PT0gdHJ1ZSkgfHwgKHVzZXIubnVtYmVyT2ZSZXBzID4gMCkpIHtcclxuICAgIC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXBGbG93JywgJ3JlcHJlc2VudGVkJyk7XHJcbiAgICBmaXJzdFRpbWVVc2VyID0gZmFsc2U7XHJcbiAgfSBlbHNlIGlmICgoc2Vzc2lvbkNsaWVudFN1Ym1pdHRlZCA9PT0gdHJ1ZSkgfHwgKHdpbmRvdy5hbGxDbGllbnRzLmxlbmd0aCA+IDApKSB7XHJcbiAgICAvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVwRmxvdycsICdyZXByZXNlbnRpbmcnKTtcclxuICAgICQoJy5wdC1zd2l0Y2gtYWNjb3VudCcpLnNob3coKTtcclxuICAgIGZpcnN0VGltZVVzZXIgPSBmYWxzZTtcclxuICB9IGVsc2Uge1xyXG4gICAgJCgnLnB0LXN3aXRjaC1hY2NvdW50JykuaGlkZSgpO1xyXG4gICAgLy8gYWxlcnQoJ2hpZGluZycpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGZpcnN0VGltZVVzZXIpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXBGbG93JywgJ25ld2JpZScpO1xyXG4gIH1cclxuXHJcbiAgdmFyIHByYWN0aXRpb25lcnMgPSBcIlwiO1xyXG5cclxuICAkLmFqYXgoe1xyXG4gICAgdXJsOiAnL2RvY3MvZGF0YS9tZWRpY2FsLXByYWN0aXRpb25lci5qc29uJyxcclxuICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgIGFzeW5jOiBmYWxzZVxyXG4gIH0pXHJcbiAgLmRvbmUoKGRhdGEpID0+IHtcclxuICAgIHByYWN0aXRpb25lcnMgPSBgPHVsPmA7XHJcbiAgICAkLmVhY2goZGF0YS5wcmFjdGl0aW9uZXJzLCAoaW5kZXgsIHByYWN0KSA9PiB7XHJcbiAgICAgIGlmICh1c2VyLnByYWN0aXRpb25lcnMuaW5jbHVkZXMocHJhY3QuX2lkKSkge1xyXG4gICAgICAgIHByYWN0aXRpb25lcnMgKz0gYDxsaT4ke3ByYWN0Lm5hbWVGdWxsfTwvbGk+YDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBwcmFjdGl0aW9uZXJzICs9IGA8L3VsPmA7XHJcbiAgfSk7XHJcblxyXG5cclxuICB2YXIgdXNlckh0bWwgPSAnJztcclxuICB2YXIgc3RhcnQgPSAnPGRpdiBjbGFzcz1cInB0LWZsZXgtZ3JpZFwiPjxkaXYgY2xhc3M9XCJwdC1jb2xcIj4nO1xyXG4gIHZhciBlbmQgPSAnPC9kaXY+PC9kaXY+J1xyXG4gIHVzZXJIdG1sICs9IHN0YXJ0ICsgJ05hbWUgPC9kaXY+PGRpdiBjbGFzcz1cInB0LWNvbFwiPicgKyB1c2VyLm5hbWVGdWxsICsgZW5kO1xyXG4gIHVzZXJIdG1sICs9IHN0YXJ0ICsgJ0FnZSA8L2Rpdj48ZGl2IGNsYXNzPVwicHQtY29sXCI+JyArIGdldEFnZSh1c2VyLmRvYikgKyBlbmQ7XHJcbiAgdXNlckh0bWwgKz0gc3RhcnQgKyAnSXMgYSB2ZXRlcmFuIDwvZGl2PjxkaXYgY2xhc3M9XCJwdC1jb2xcIj4nICsgdXNlci52ZXRlcmFuICsgZW5kO1xyXG4gIHVzZXJIdG1sICs9IHN0YXJ0ICsgJ1ByYWN0aXRpb25lcnMgPC9kaXY+PGRpdiBjbGFzcz1cInB0LWNvbFwiPicgKyBwcmFjdGl0aW9uZXJzICsgZW5kO1xyXG4gIHVzZXJIdG1sICs9IHN0YXJ0ICsgJ0N1cnJlbnRseSBTZXJ2aW5nIDwvZGl2PjxkaXYgY2xhc3M9XCJwdC1jb2xcIj4nICsgdXNlci5pc0N1cnJlbnRseVNlcnZpbmcgKyBlbmQ7XHJcbiAgdXNlckh0bWwgKz0gc3RhcnQgKyAnQ2xpZW50cyA8L2Rpdj48ZGl2IGNsYXNzPVwicHQtY29sXCI+JyArIHVzZXIubnVtYmVyT2ZDbGllbnRzICsgZW5kO1xyXG4gIHVzZXJIdG1sICs9IHN0YXJ0ICsgJ1JlcHMgPC9kaXY+PGRpdiBjbGFzcz1cInB0LWNvbFwiPicgKyB1c2VyLm51bWJlck9mUmVwcyArIGVuZDtcclxuICB1c2VySHRtbCArPSBzdGFydCArICdMYXN0IHBheW1lbnQgPC9kaXY+PGRpdiBjbGFzcz1cInB0LWNvbFwiPicgKyB1c2VyLmxhc3RQYXltZW50ICsgZW5kO1xyXG4gIHVzZXJIdG1sICs9IHN0YXJ0ICsgJ0NsYWltcyA8L2Rpdj48ZGl2IGNsYXNzPVwicHQtY29sXCI+JyArIHVzZXIubnVtYmVyT2ZDbGFpbXMgKyBlbmQ7XHJcbiAgdXNlckh0bWwgKz0gc3RhcnQgKyAnU3RvcnkgPC9kaXY+PGRpdiBjbGFzcz1cInB0LWNvbFwiPicgKyB1c2VyLnN0b3J5ICsgZW5kO1xyXG5cclxuICB1c2VyLnBpY3R1cmUgPSAnPGltZyBjbGFzcz1cInB0LWltYWdlLWNpcmNsZVwiIHNyYz1cIicgKyB1c2VyLnBpY3R1cmUgKyAnXCI+JztcclxuXHJcblxyXG4gICQoJyN1c2VyQ29udGFpbmVySWQnKS5odG1sKHVzZXJIdG1sKTtcclxuICAkKCcucHQtY3VycmVudC11c2VyLW5hbWUtcGljdHVyZScpLmh0bWwodXNlci5waWN0dXJlKTtcclxuICAkKCcucHQtY3VycmVudC11c2VyLW5hbWUtZmlyc3QnKS5odG1sKHVzZXIubmFtZS5maXJzdCk7XHJcbiAgJCgnLnB0LWN1cnJlbnQtdXNlci1uYW1lLWZ1bGwnKS5odG1sKHVzZXIubmFtZUZ1bGwpO1xyXG4gICQoJy5wdC1jdXJyZW50LXVzZXItbGFzdC1wYXltZW50JykuaHRtbCh1c2VyLmxhc3RQYXltZW50KTtcclxuICAkKCcucHQtY3VycmVudC11c2VyLW51bWJlci1vZi1jbGFpbXMnKS5odG1sKHVzZXIubnVtYmVyT2ZDbGFpbXMpO1xyXG5cclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIHdyaXRlQ2xpZW50KGZvcm0pIHtcclxuXHJcbiAgdmFyIGZvcm1EYXRhID0gZ2V0Rm9ybURhdGEoZm9ybSk7XHJcbiAgdmFyIGNsaWVudHMgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2Vyc0NsaWVudHMnKTtcclxuXHJcbiAgaWYgKGNsaWVudHMpIHsgLy8gY2xpZW50cyBpbiBzZXNzaW9uIGRhdGFcclxuICAgIGNvbnNvbGUubG9nKCdUaGVyZSBhcmUgY2xpZW50cyBpbiBzZXNzaW9uJyk7XHJcbiAgICB2YXIgZXhpc3RpbmdDbGllbnQgPSBmYWxzZTtcclxuICAgIHZhciBwYXJzZWRDbGllbnRzID0gSlNPTi5wYXJzZShjbGllbnRzKTtcclxuICAgIHZhciBzZXNzaW9uR3VpZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Nlc3Npb25HdWlkJyk7XHJcblxyXG4gICAgJC5lYWNoKHBhcnNlZENsaWVudHMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG5cclxuICAgICAgaWYgKGVsZW1lbnQuaWQgPT09IHNlc3Npb25HdWlkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3dyaXRpbmcgdG8gYW4gRVhJU1RJTkcgY2xpZW50Jyk7XHJcblxyXG4gICAgICAgIC8vIGFkZCBuZXcgZm9ybSBkYXRhIHRvIGFuIGV4aXN0aW5nIGNsaWVudFxyXG4gICAgICAgICQuZXh0ZW5kKHRydWUsIHdpbmRvdy5hbGxDbGllbnRzW2luZGV4XSwgZm9ybURhdGEpO1xyXG4gICAgICAgIGV4aXN0aW5nQ2xpZW50ID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGV4aXN0aW5nQ2xpZW50ID09PSBmYWxzZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnd3JpdGluZyB0byBhIE5FVyBjbGllbnQnKTtcclxuICAgICAgd2luZG93LmFsbENsaWVudHMucHVzaChmb3JtRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZygnbm8gY2xpZW50cyBzbyB3cml0aW5nIHRvIGEgTkVXIGNsaWVudCcpO1xyXG4gICAgd2luZG93LmFsbENsaWVudHMucHVzaChmb3JtRGF0YSk7XHJcbiAgfVxyXG5cclxuICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1c2Vyc0NsaWVudHMnLCBKU09OLnN0cmluZ2lmeSh3aW5kb3cuYWxsQ2xpZW50cykpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gd3JpdGVSZXAoZm9ybSkge1xyXG5cclxuICB2YXIgZm9ybURhdGEgPSBnZXRGb3JtRGF0YShmb3JtKTtcclxuICB2YXIgcmVwcyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJzUmVwcycpO1xyXG5cclxuICBpZiAocmVwcykgeyAvLyByZXBzIGluIHNlc3Npb24gZGF0YVxyXG4gICAgY29uc29sZS5sb2coJ1RoZXJlIGFyZSByZXBzIGluIHNlc3Npb24nKTtcclxuICAgIHZhciBleGlzdGluZ1JlcCA9IGZhbHNlO1xyXG4gICAgdmFyIHBhcnNlZFJlcHMgPSBKU09OLnBhcnNlKHJlcHMpO1xyXG4gICAgdmFyIHNlc3Npb25HdWlkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnc2Vzc2lvbkd1aWQnKTtcclxuXHJcbiAgICAkLmVhY2gocGFyc2VkUmVwcywgZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XHJcblxyXG4gICAgICBpZiAoZWxlbWVudC5pZCA9PT0gc2Vzc2lvbkd1aWQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnd3JpdGluZyB0byBhbiBFWElTVElORyBjbGllbnQnKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIG5ldyBmb3JtIGRhdGEgdG8gYW4gZXhpc3RpbmcgY2xpZW50XHJcbiAgICAgICAgJC5leHRlbmQodHJ1ZSwgd2luZG93LmFsbFJlcHNbaW5kZXhdLCBmb3JtRGF0YSk7XHJcbiAgICAgICAgZXhpc3RpbmdSZXAgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZXhpc3RpbmdSZXAgPT09IGZhbHNlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCd3cml0aW5nIHRvIGEgTkVXIGNsaWVudCcpO1xyXG4gICAgICB3aW5kb3cuYWxsUmVwcy5wdXNoKGZvcm1EYXRhKTtcclxuICAgIH1cclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUubG9nKCdubyByZXBzIHNvIHdyaXRpbmcgdG8gYSBORVcgY2xpZW50Jyk7XHJcbiAgICB3aW5kb3cuYWxsUmVwcy5wdXNoKGZvcm1EYXRhKTtcclxuICB9XHJcblxyXG4gIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3VzZXJzUmVwcycsIEpTT04uc3RyaW5naWZ5KHdpbmRvdy5hbGxSZXBzKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWRDbGllbnQoKSB7XHJcbiAgY29uc29sZS5sb2coJ1JlYWRpbmcgY2xpZW50IGRhdGEnKTtcclxuXHJcbiAgdmFyIHVybElkID0gZ2V0VXJsUGFyYW1ldGVyKCdpZCcpO1xyXG5cclxuICBpZiAodXJsSWQpIHtcclxuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3Nlc3Npb25HdWlkJywgdXJsSWQpO1xyXG4gIH1cclxuXHJcbiAgdmFyIGNsaWVudHMgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2Vyc0NsaWVudHMnKTtcclxuICB2YXIgcGFyc2VkQ2xpZW50cyA9IEpTT04ucGFyc2UoY2xpZW50cyk7XHJcbiAgdmFyIHVzZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGVyc29uJyk7XHJcbiAgdmFyIHBhcnNlZFVzZXIgPSBKU09OLnBhcnNlKHVzZXIpO1xyXG4gIHZhciBzZXNzaW9uR3VpZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Nlc3Npb25HdWlkJyk7XHJcblxyXG4gIGlmIChwYXJzZWRDbGllbnRzKSB7XHJcbiAgICB2YXIgY2xpZW50TGlzdEh0bWwgPSAnJztcclxuICAgIHZhciBjbGllbnRMaXN0RnVsbEh0bWwgPSAnJztcclxuICAgIHZhciBzd2l0Y2hJZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzd2l0Y2hJZCcpO1xyXG5cclxuICAgICQuZWFjaChwYXJzZWRDbGllbnRzLCBmdW5jdGlvbiAoaW5kZXgsIGNsaWVudCkge1xyXG5cclxuICAgICAgLy8gd3JpdGUgdGhlIGNsaWVudCBjdXJyZW50bHkgYmVpbmcgd29ya2VkIG9uXHJcbiAgICAgIGlmIChjbGllbnQuaWQgPT09IHNlc3Npb25HdWlkKSB7XHJcbiAgICAgICAgJC5lYWNoKGNsaWVudCwgZnVuY3Rpb24gKGluZGV4LCBjbGllbnQpIHtcclxuICAgICAgICAgICQoJy5wdC1jdXJyZW50LWNsaWVudC0nICsgaW5kZXgpLmh0bWwoY2xpZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNsaWVudC5pZCA9PSBzd2l0Y2hJZCkge1xyXG4gICAgICAgIHRoaXMubmFtZUZ1bGwgPSB0aGlzLm5hbWVGaXJzdCArICcgJyArIHRoaXMubmFtZUxhc3Q7XHJcbiAgICAgICAgJCgnLnB0LWN1cnJlbnQtdXNlci1uYW1lLWZpcnN0JykuaHRtbCh0aGlzLm5hbWVGaXJzdCk7XHJcbiAgICAgICAgJCgnLnB0LWN1cnJlbnQtdXNlci1uYW1lLWZ1bGwnKS5odG1sKHRoaXMubmFtZUZ1bGwpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2xpZW50LnJvbGUgIT09IFwiQ2Vhc2VcIikge1xyXG5cclxuICAgICAgICBjbGllbnQubmFtZUZ1bGwgPSBjbGllbnQubmFtZUZpcnN0ICsgJyAnICsgY2xpZW50Lm5hbWVMYXN0O1xyXG5cclxuICAgICAgICAvLyBzd2l0Y2ggbGlzdFxyXG4gICAgICAgIGNsaWVudExpc3RIdG1sICs9ICc8bGk+PGEgaHJlZj1cIi9hdXRoP3N3aXRjaEZsb3c9YWN0aXZlJnN3aXRjaElkPScgKyBjbGllbnQuaWQgKyAnXCIgY2xhc3M9XCJzd2l0Y2gtYWNjb3VudC1ib3hfX2xpbmtcIj48c3Ryb25nPic7XHJcbiAgICAgICAgY2xpZW50TGlzdEh0bWwgKz0gY2xpZW50Lm5hbWVGaXJzdCArICcgJyArIGNsaWVudC5uYW1lTGFzdCArICc8L3N0cm9uZz4nO1xyXG4gICAgICAgIGNsaWVudExpc3RIdG1sICs9ICcgKCcgKyBjbGllbnQucm9sZSArICcpPC9hPjwvbGk+JztcclxuXHJcbiAgICAgICAgLy8gYWxsIGNsaWVudHMgbGlzdFxyXG4gICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tMTIgbWFyZ2luLWJlbG93LS1taWRcIj48ZGl2IGNsYXNzPVwiaG9yaXpvbnRhbC1jYXJkLXNlY3Rpb25cIj4nO1xyXG4gICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSAnPGRpdiBjbGFzcz1cImNhcmQgY2FyZC0taG9yaXpvbnRhbCBmbGV4LWNvbnRhaW5lclwiPjxkaXYgY2xhc3M9XCJmbGV4LWl0ZW0gZmxleC1pdGVtLS1pY29uLW9ubHlcIj4nO1xyXG4gICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSAnPHNwYW4gY2xhc3M9XCJmYWwgZmEtaWNvbi1uciBmYS11c2VyLWVkaXRcIj48L3NwYW4+IDwvZGl2PjxkaXYgY2xhc3M9XCJmbGV4LWl0ZW0gZmxleC1pdGVtLS1sYXJnZVwiPjxwPjxzdHJvbmc+JztcclxuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gY2xpZW50Lm5hbWVGaXJzdCArICcgJyArIGNsaWVudC5uYW1lTGFzdDtcclxuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gJzwvc3Ryb25nPjwvcD4gIDxwPjxzdHJvbmc+IFlvdXIgY3VycmVudCByb2xlOiA8L3N0cm9uZz4nXHJcbiAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9IGNsaWVudC5yb2xlO1xyXG4gICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSAnPC9wPjxwPiA8c3Ryb25nPiBSZXByZXNlbnRhdGlvbiBkYXRlOiA8L3N0cm9uZz4nO1xyXG4gICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSBjbGllbnQuc3RhcnREYXRlRGQgKyAnIC8gJyArIGNsaWVudC5zdGFydERhdGVNbSArICcgLyAnICsgY2xpZW50LnN0YXJ0RGF0ZVl5eXk7XHJcbiAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9ICcgdG8gJztcclxuICAgICAgICBpZiAoY2xpZW50LmVuZERhdGVEZCkge1xyXG4gICAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9IGNsaWVudC5lbmREYXRlRGQgKyAnIC8gJyArIGNsaWVudC5lbmREYXRlTW0gKyAnIC8gJyArIGNsaWVudC5lbmREYXRlWXl5eTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9ICcobm8gZml4ZWQgZW5kIGRhdGUpPC9wPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjbGllbnQuZW5xdWlyZU9ubGluZSkge1xyXG4gICAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9ICc8cD48c3Ryb25nPiBPbmxpbmUgYWNjZXNzOiA8L3N0cm9uZz4nO1xyXG4gICAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9IGNsaWVudC5lbnF1aXJlT25saW5lICsgJzwvcD4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gJzwvZGl2PjxkaXYgY2xhc3M9XCJmbGV4LWl0ZW0gZmxleC1pdGVtLS1yaWdodC1hbGlnblwiPjxwPjxidXR0b24gY2xhc3M9XCJ1aWtpdC1idG4gc21hbGwgdWlraXQtYnRuLS10ZXJ0aWFyeVwiIG9uY2xpY2s9XCJ3aW5kb3cubG9jYXRpb24uaHJlZj1cXCcvYXV0aC9wcm9maWxlL25vbXJlcC9mb3JtLWNsaWVudC0zJztcclxuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gJz9zdGF0ZT1lZGl0JmlkPScgKyBjbGllbnQuaWQgKyAnXFwnXCI+JztcclxuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gJ0VkaXQgUm9sZTwvYnV0dG9uPjwvcD48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj4nXHJcbiAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBhZGQgY3VycmVudCB1c2VyIHRvIHRoZSBsaXN0XHJcbiAgICBjbGllbnRMaXN0SHRtbCArPSAnPGxpPjxhIGlkPVwicmV0dXJuUHJvZmlsZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMCk7XCIgY2xhc3M9XCJzd2l0Y2gtYWNjb3VudC1ib3hfX2xpbmsgc3dpdGNoLWFjY291bnQtYm94X19saW5rLS1zZWxmXCI+JztcclxuICAgIGNsaWVudExpc3RIdG1sICs9ICc8aSBjbGFzcz1cImZhciBmYS1yZXBlYXQtYWx0XCI+PC9pPiBCYWNrIHRvIG15IG93biBhY2NvdW50PC9hPjwvbGk+JztcclxuXHJcbiAgICAkKCcucHQtY3VycmVudC11c2VyLWNsaWVudC1saXN0JykuaHRtbChjbGllbnRMaXN0SHRtbCk7XHJcbiAgICAkKCcucHQtY2xpZW50LWxpc3QtZnVsbCcpLmh0bWwoY2xpZW50TGlzdEZ1bGxIdG1sKTtcclxuXHJcbiAgICAvLyBoaWRlIHRoZSByZXR1cm4gdG8gcHJvZmlsZSBiYW5uZXIgXHJcbiAgICAkKFwiI3JldHVyblByb2ZpbGVcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICBqUXVlcnkoJy5wdC1tYW5hZ2luZy11c2VyJykuc2xpZGVVcCgnZmFzdCcpO1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3dpdGNoRmxvdycsICdub25lJyk7XHJcbiAgICAgIHdyaXRlVXNlcigpO1xyXG4gICAgICB3aW5kb3cucmVsb2FkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG59XHJcblxyXG5yZWFkQ2xpZW50KCk7XHJcblxyXG5mdW5jdGlvbiByZWFkUmVwKCkge1xyXG4gIGNvbnNvbGUubG9nKCdSZWFkaW5nIHJlcCBkYXRhJyk7XHJcbiAgdmFyIHJlcHMgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2Vyc1JlcHMnKTtcclxuICB2YXIgcGFyc2VkUmVwcyA9IEpTT04ucGFyc2UocmVwcyk7XHJcbiAgdmFyIHNlc3Npb25HdWlkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnc2Vzc2lvbkd1aWQnKTtcclxuXHJcbiAgaWYgKHBhcnNlZFJlcHMpIHtcclxuXHJcbiAgICB2YXIgcmVwTGlzdEZ1bGxIdG1sID0gJyc7XHJcbiAgICAkLmVhY2gocGFyc2VkUmVwcywgZnVuY3Rpb24gKGluZGV4LCByZXApIHtcclxuXHJcbiAgICAgIC8vIHdyaXRlIHRoZSByZXAgY3VycmVudGx5IGJlaW5nIHdvcmtlZCBvblxyXG4gICAgICBpZiAocmVwLmlkID09PSBzZXNzaW9uR3VpZCkge1xyXG4gICAgICAgICQuZWFjaChyZXAsIGZ1bmN0aW9uIChpbmRleCwgcmVwKSB7XHJcbiAgICAgICAgICAkKCcucHQtY3VycmVudC1yZXAtJyArIGluZGV4KS5odG1sKHJlcCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyZXAucm9sZSAhPT0gXCJDZWFzZVwiKSB7XHJcblxyXG4gICAgICAgIHJlcC5uYW1lRnVsbCA9IHJlcC5uYW1lRmlyc3QgKyAnICcgKyByZXAubmFtZUxhc3Q7XHJcblxyXG4gICAgICAgIC8vIGFsbCByZXBzIGxpc3RcclxuICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwiY29sLXNtLTEyIG1hcmdpbi1iZWxvdy0tbWlkXCI+PGRpdiBjbGFzcz1cImhvcml6b250YWwtY2FyZC1zZWN0aW9uXCI+JztcclxuICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gJzxkaXYgY2xhc3M9XCJjYXJkIGNhcmQtLWhvcml6b250YWwgZmxleC1jb250YWluZXJcIj48ZGl2IGNsYXNzPVwiZmxleC1pdGVtIGZsZXgtaXRlbS0taWNvbi1vbmx5XCI+JztcclxuICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gJzxzcGFuIGNsYXNzPVwiZmFsIGZhLWljb24tbnIgZmEtdXNlci1lZGl0XCI+PC9zcGFuPiA8L2Rpdj48ZGl2IGNsYXNzPVwiZmxleC1pdGVtIGZsZXgtaXRlbS0tbGFyZ2VcIj48cD48c3Ryb25nPic7XHJcbiAgICAgICAgcmVwTGlzdEZ1bGxIdG1sICs9IHJlcC5uYW1lRmlyc3QgKyAnICcgKyByZXAubmFtZUxhc3Q7XHJcbiAgICAgICAgcmVwTGlzdEZ1bGxIdG1sICs9ICc8L3N0cm9uZz48L3A+ICA8cD48c3Ryb25nPiBZb3VyIGN1cnJlbnQgcm9sZTogPC9zdHJvbmc+J1xyXG4gICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSByZXAucm9sZTtcclxuICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gJzwvcD48cD4gPHN0cm9uZz4gUmVwcmVzZW50YXRpb24gZGF0ZTogPC9zdHJvbmc+JztcclxuICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gcmVwLnN0YXJ0RGF0ZURkICsgJyAvICcgKyByZXAuc3RhcnREYXRlTW0gKyAnIC8gJyArIHJlcC5zdGFydERhdGVZeXl5O1xyXG4gICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSAnIHRvICc7XHJcbiAgICAgICAgaWYgKHJlcC5lbmREYXRlRGQpIHtcclxuICAgICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSByZXAuZW5kRGF0ZURkICsgJyAvICcgKyByZXAuZW5kRGF0ZU1tICsgJyAvICcgKyByZXAuZW5kRGF0ZVl5eXk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSAnKG5vIGZpeGVkIGVuZCBkYXRlKTwvcD4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVwLmVucXVpcmVPbmxpbmUpIHtcclxuICAgICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSAnPHA+PHN0cm9uZz4gT25saW5lIGFjY2VzczogPC9zdHJvbmc+JztcclxuICAgICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSByZXAuZW5xdWlyZU9ubGluZSArICc8L3A+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVwTGlzdEZ1bGxIdG1sICs9ICc8L2Rpdj48ZGl2IGNsYXNzPVwiZmxleC1pdGVtIGZsZXgtaXRlbS0tcmlnaHQtYWxpZ25cIj48cD48YnV0dG9uIGNsYXNzPVwidWlraXQtYnRuIHNtYWxsIHVpa2l0LWJ0bi0tdGVydGlhcnlcIiBvbmNsaWNrPVwid2luZG93LmxvY2F0aW9uLmhyZWY9XFwnL2F1dGgvcHJvZmlsZS9ub21yZXAvZm9ybS1yZXAtMyc7XHJcbiAgICAgICAgcmVwTGlzdEZ1bGxIdG1sICs9ICc/c3RhdGU9ZWRpdCZpZD0nICsgcmVwLmlkICsgJ1xcJ1wiPic7XHJcbiAgICAgICAgcmVwTGlzdEZ1bGxIdG1sICs9ICdFZGl0IFJvbGU8L2J1dHRvbj48L3A+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+J1xyXG4gICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gJCgnLnB0LWN1cnJlbnQtdXNlci1yZXAtbGlzdCcpLmh0bWwocmVwTGlzdEh0bWwpO1xyXG4gICAgJCgnLnB0LXJlcC1saXN0LWZ1bGwnKS5odG1sKHJlcExpc3RGdWxsSHRtbCk7XHJcbiAgfVxyXG59XHJcblxyXG5sZXQgY3VycmVudFBlcnNvbiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BlcnNvbicpKTtcclxuXHJcbmlmICghY3VycmVudFBlcnNvbi5jYXJkcyB8fCBjdXJyZW50UGVyc29uLmNhcmRzLmxlbmd0aCA8IDEpIHtcclxuICAkKFwiI2hlYWx0aGNhcmRcIikuaGlkZSgpO1xyXG59Il0sImZpbGUiOiJ1c2VyLmpzIn0=
