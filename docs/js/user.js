'use strict';

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
}

// returns serializes form data from a form 
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
}

// end utility functions 


// call up the persona panel via keyboard 
$(document).keypress(function (e) {

  switch (e.which) {
    case 126:
      //tilda + shift
      $('.pt-persona-switcher').toggle();
      // addListeners();
      break;
    default:
  }
});

// window.onload = addListeners();

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

initNomRep();

// banners
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

  if (localStorage.getItem('switchFlow') == 'active') {
    jQuery('.pt-managing-user ').show();
  } else {}
  // jQuery('.switch-account-button').removeClass("switch-account-button--current");


  // hide switch account overlay when clicking elsewhere on the page
  $(document).on("click", function () {
    $(".switch-account-box").addClass("switch-account-box--hide");
  });
}

initSwitch();

// to generate more users, go to www.json-generator.com and paste in the data from /docs/data/user.generator 
// and paste in the generated users in to /docs/data/user.json

// Pull in the json content 
$.ajax({
  url: '/docs/data/user.json',
  async: false,
  dataType: 'json'
}).done(function (data) {

  console.log('User data back');

  localStorage.setItem('allPersons', JSON.stringify(data.person));

  // set the default MyService user if no user has been requested 
  if (!localStorage.getItem('person')) {
    localStorage.setItem('person', JSON.stringify(data.person[0]));
    console.log('setting the default user');
  }

  // populate the user dropdown list with users from the json
  var $userSelect = $('#user-drop-down');
  $userSelect.empty();
  $userSelect.append('<option>-- Select a user --</option>');
  $.each(data.person, function (key, value) {
    $userSelect.append('<option value=' + value._id + '>' + value.nameFull + '</option>');
  });

  // switch the user 
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
});

// put the user from user.js in to local storage and the users clients in to session storage 
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

  sessionStorage.setItem('usersClients', JSON.stringify(window.allClients));
  // sessionStorage.setItem('usersMultipleClients', JSON.stringify(window.allClients));

  sessionStorage.setItem('usersReps', JSON.stringify(window.allReps));

  var firstTimeUser = true;
  if (sessionStorage.getItem('sessionGuid')) {
    firstTimeUser = false;
  }

  // count number of clients 
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
  }

  // if (sessionReps) {
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
    user.numberOfReps = 0;
    // localStorage.setItem('repFlow', 'newbie');
  }

  if (user.claims) {
    user.numberOfClaims = user.claims.length;
  } else {
    user.numberOfClaims = 0;
  }

  // show hide the switch account buttons

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
    $('.pt-switch-account').hide();
    // alert('hiding');
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
    practitioners = '<ul>';
    $.each(data.practitioners, function (index, pract) {
      if (user.practitioners.includes(pract._id)) {
        practitioners += '<li>' + pract.nameFull + '</li>';
      }
    });
    practitioners += '</ul>';
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
        console.log('writing to an EXISTING client');

        // add new form data to an existing client
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
        console.log('writing to an EXISTING client');

        // add new form data to an existing client
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

        client.nameFull = client.nameFirst + ' ' + client.nameLast;

        // switch list
        clientListHtml += '<li><a href="/auth?switchFlow=active&switchId=' + client.id + '" class="switch-account-box__link"><strong>';
        clientListHtml += client.nameFirst + ' ' + client.nameLast + '</strong>';
        clientListHtml += ' (' + client.role + ')</a></li>';

        // all clients list
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
    });

    // add current user to the list
    clientListHtml += '<li><a id="returnProfile" href="javascript:void(0);" class="switch-account-box__link switch-account-box__link--self">';
    clientListHtml += '<i class="far fa-repeat-alt"></i> Back to my own account</a></li>';

    $('.pt-current-user-client-list').html(clientListHtml);
    $('.pt-client-list-full').html(clientListFullHtml);

    // hide the return to profile banner 
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

        rep.nameFull = rep.nameFirst + ' ' + rep.nameLast;

        // all reps list
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
    });

    // $('.pt-current-user-rep-list').html(repListHtml);
    $('.pt-rep-list-full').html(repListFullHtml);
  }
}

var currentPerson = JSON.parse(localStorage.getItem('person'));

if (!currentPerson.cards || currentPerson.cards.length < 1) {
  $("#healthcard").hide();
}