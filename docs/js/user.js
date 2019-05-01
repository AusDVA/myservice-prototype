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


$(document).keypress(function (e) {

  switch (e.which) {
    case 126:
      //tilda + shift
      $('.pt-choose-user').toggle();
      break;
    default:
  }
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


  // hide the return to profile banner 
  $("#returnProfile").click(function () {
    jQuery('.pt-managing-user').slideUp('fast');
    localStorage.setItem('switchFlow', 'none');
    writeUser();
  });

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

  $.each(data.person, function (index, element) {

    // console.log(element);

  });

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
    sessionStorage.removeItem('usersMultipleClients');
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

  sessionStorage.setItem('usersClients', JSON.stringify(window.allClients));
  sessionStorage.setItem('usersMultipleClients', JSON.stringify(window.allClients));

  // const sessionClientsFromJson = JSON.parse(sessionStorage.getItem('usersMultipleClients'));


  var firstTimeUser = true;
  if (sessionStorage.getItem('sessionGuid')) {
    firstTimeUser = false;
  }

  // count number of clients 
  var sessionClientSubmitted = false;

  console.log('window.allClients  ' + window.allClients);
  console.log(window.allClients.length);
  // console.log(sessionClients.length);

  if (window.allClients.length > 0) {

    // if ((sessionClients != null) || (sessionClients != '')) {

    localStorage.setItem('repFlow', 'representing');
    console.log('why am i here');

    // if client in local storage 
    if (user.clients) {

      sessionClientSubmitted = true;
    }

    // if (sessionClients.client[0].submittedApplication == "true") {
    //   localStorage.setItem('repFlow', 'representing');
    //   var sessionClientSubmitted = true;
    //   // push the client to the user
    //   user.clients.push(sessionClients.client[0]);
    // }

    // if (sessionClients.client[0].role == "Cease") {
    //   user.numberOfClients = 0
    //   user.clients.length = 0;
    //   sessionClientSubmitted = false;
    //   localStorage.setItem('repFlow', 'none');
    //   sessionStorage.removeItem('usersClients');
    //   if (!window.location.hash) {
    //     window.location = window.location + '#rep-list';
    //     window.location.reload();
    //   }
    // }
  }

  var sessionRepSubmitted = false;

  if (sessionReps) {
    localStorage.setItem('repFlow', 'representing');
    if (sessionReps.rep[0].submittedApplication == "true") {
      localStorage.setItem('repFlow', 'representing');
      var sessionRepSubmitted = true;
      user.reps.push(sessionReps.rep[0]);
    }

    if (sessionReps.rep[0].role == "Cease") {
      user.numberOfReps = 0;
      user.reps.length = 0;
      sessionRepSubmitted = false;
      localStorage.setItem('repFlow', 'none');
      sessionStorage.removeItem('usersReps');
      if (!window.location.hash) {
        window.location = window.location + '#rep-list';
        window.location.reload();
      }
    }
  }

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
      user.numberOfReps = sessionClients.rep.length;
    }
  } else if (user.reps.length < 1) {
    user.numberOfReps = 0;
    // localStorage.setItem('repFlow', 'newbie');
  }

  // show hide the switch account buttons

  // console.log('sessionClientSubmitted -> ' + sessionClientSubmitted);
  // console.log('window.allClients.length -> ' + window.allClients.length);
  if (sessionRepSubmitted === true && sessionClientSubmitted === true) {
    localStorage.setItem('repFlow', 'both');
    $('.pt-switch-account').show();
    firstTimeUser = false;
  } else if (sessionRepSubmitted === true || user.numberOfReps > 0) {
    localStorage.setItem('repFlow', 'represented');
    firstTimeUser = false;
  } else if (sessionClientSubmitted === true || window.allClients.length > 0) {
    localStorage.setItem('repFlow', 'representing');
    $('.pt-switch-account').show();
    firstTimeUser = false;
  } else {
    $('.pt-switch-account').hide();
    // alert('hiding');
  }

  if (firstTimeUser) {
    localStorage.setItem('repFlow', 'newbie');
  }

  var userHtml = '';
  var start = '<div class="pt-flex-grid"><div class="pt-col">';
  var end = '</div></div>';
  userHtml += start + 'Name </div><div class="pt-col">' + user.nameFull + end;
  userHtml += start + 'Age </div><div class="pt-col">' + getAge(user.dob) + end;
  userHtml += start + 'Is a veteran </div><div class="pt-col">' + user.veteran + end;
  userHtml += start + 'Clients </div><div class="pt-col">' + user.numberOfClients + end;
  userHtml += start + 'Reps </div><div class="pt-col">' + user.numberOfReps + end;
  userHtml += start + 'Story </div><div class="pt-col">' + user.story + end;

  user.picture = '<img class="pt-image-circle" src="' + user.picture + '">';

  $('#userContainerId').html(userHtml);
  $('.pt-current-user-name-picture').html(user.picture);
  $('.pt-current-user-name-first').html(user.name.first);
  $('.pt-current-user-name-full').html(user.nameFull);

  var clientListHtml = '';

  // refactor this in readClient
  $.each(user.clients, function (key, client) {

    client.nameFull = client.nameFirst + ' ' + client.nameLast;
    clientListHtml += '<li><a href="/auth?switchFlow=active&switchId=' + client.id + '" class="switch-account-box__link"><strong>';
    clientListHtml += client.nameFirst + ' ' + client.nameLast + '</strong>';
    clientListHtml += ' (' + client.role + ')</a></li>';
  });

  if (user.clients.length > 0 && localStorage.getItem('switchFlow') == 'active') {

    var switchId = localStorage.getItem('switchId');

    $.each(user.clients, function (key, client) {

      if (client.id == switchId) {
        this.nameFull = this.nameFirst + ' ' + this.nameLast;
        $('.pt-current-user-name-first').html(this.nameFirst);
        $('.pt-current-user-name-full').html(this.nameFull);
      }
    });
  }

  $('.pt-current-user-client-list').html(clientListHtml);
}

function writeRep(form) {

  var formData = getFormData(form);
  var reps = sessionStorage.getItem('usersReps');

  if (reps) {
    // reps in session data

    var parsedReps = JSON.parse(reps);
    var sessionGuid = sessionStorage.getItem('sessionGuid');

    $.each(parsedReps.rep, function (index, element) {

      console.log('parsedReps');
      console.log(parsedReps);

      if (element.id === sessionGuid) {
        console.log('writing to the user in session');

        reps = JSON.stringify(parsedReps);
        $.extend(true, parsedReps.rep[index], formData);
      } else {
        // TODO: this needs to push but the arrays don't match
        // $.extend({}, parsedReps.rep[index], formData);
        // $.merge(parsedReps.rep[index]), formData));

      }
    });

    sessionStorage.setItem('usersReps', JSON.stringify(parsedReps));
  } else {
    // no reps 

    var repArray = $.makeArray(formData);
    sessionStorage.setItem('usersReps', '{"rep":' + JSON.stringify(repArray) + '}');
  }
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
        console.log('writing to an EXISTING user');

        // add new form data to an existing client
        $.extend(true, window.allClients[index], formData);

        existingClient = true;
      }
    });

    if (existingClient === false) {
      console.log('writing to a NEW user');
      window.allClients.push(formData);
    }
  } else {
    // no clients 
    console.log('no clients?');
    window.allClients.push(formData);
  }

  sessionStorage.setItem('usersClients', JSON.stringify(window.allClients));
}

function readClient() {
  console.log('Reading client data');

  var urlId = getUrlParameter('id');

  if (urlId) {
    sessionStorage.setItem('sessionGuid', urlId);
  }

  var clients = sessionStorage.getItem('usersClients');
  var parsedClients = JSON.parse(clients);

  var sessionGuid = sessionStorage.getItem('sessionGuid');
  if (parsedClients) {
    var clientListFullHtml = '';
    $.each(parsedClients, function (index, client) {

      console.log('client.id ' + client.id);
      console.log('sessionGuid ' + sessionGuid);
      console.log('sessionGuid ' + sessionGuid);

      // write the client currently being worked on
      if (client.id === sessionGuid) {
        $.each(client, function (index, client) {
          $('.pt-current-client-' + index).html(client);
        });
      }

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
      clientListFullHtml += '</div><div class="flex-item flex-item--right-align"><p><a href="/auth/profile/nomrep/edit-client';
      clientListFullHtml += '?id=' + client.id + '">';
      clientListFullHtml += 'Edit Role</a></p></div></div></div></div></div>';
    });

    $('.pt-client-list-full').html(clientListFullHtml);
  }
}

function readRep() {
  console.log('Reading rep data');
  var reps = sessionStorage.getItem('usersReps');
  var parsedReps = JSON.parse(reps);
  if (parsedReps) {

    $.each(parsedReps, function (index, element) {
      if (element.id === sessionGuid) {
        $.each(element, function (index, element) {
          $('.pt-current-rep-' + index).html(element);
        });
      }
    });
  }
}