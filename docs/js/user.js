// utility functions 

// returns age from date of birth string 
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
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
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

// end utility functions 


// call up the persona panel via keyboard 
$(document).keypress(function (e) {

  switch (e.which) {
    case 126: //tilda + shift
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

  } else if ("repFlow" in localStorage) {

  } else {
    localStorage.setItem('repFlow', 'none');
  }

  if ((localStorage.getItem('repFlow') == 'both')) {
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
    jQuery('.pt-managing-user ').show();

  } else {
    // jQuery('.switch-account-button').removeClass("switch-account-button--current");
  }



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
  if (!(localStorage.getItem('person'))) {
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

  const user = JSON.parse(localStorage.getItem('person'));
  const sessionClients = JSON.parse(sessionStorage.getItem('usersClients'));
  const sessionReps = JSON.parse(sessionStorage.getItem('usersReps'));

  window.allClients = [];
  window.allReps = [];

  if (sessionClients) {

    $.each(sessionClients, function (index, client) {
      // add new form data to an existing client
      window.allClients.push(client);
    });

  } else { // no client data in session so get it from the user 
    $.each(user.clients, function (index, client) {

      window.allClients.push(client);

    });
  }

  if (sessionReps) {

    $.each(sessionReps, function (index, rep) {
      // add new form data to an existing rep
      window.allReps.push(rep);
    });

  } else { // no rep data in session so get it from the user 
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



  if ((window.allClients.length > 0) && (window.allReps.length > 0)) {
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
  if ((user.clients.length > 0) || (sessionClientSubmitted === true)) {

    if (user.clients.length > 0) {
      user.numberOfClients = user.clients.length;
    } else {
      user.numberOfClients = window.allClients.length;
    }

  } else if (user.clients.length < 1) {
    user.numberOfClients = 0;
  }

  if ((user.reps.length > 0) || (sessionRepSubmitted === true)) {

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
  if ((sessionRepSubmitted === true) && (sessionClientSubmitted === true)) {
    localStorage.setItem('repFlow', 'both');
    $('.pt-switch-account').show();
    firstTimeUser = false;
  } else if ((sessionRepSubmitted === true) || (user.numberOfReps > 0)) {
    // localStorage.setItem('repFlow', 'represented');
    firstTimeUser = false;
  } else if ((sessionClientSubmitted === true) || (window.allClients.length > 0)) {
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
  })
  .done((data) => {
    practitioners = `<ul>`;
    $.each(data.practitioners, (index, pract) => {
      if (user.practitioners.includes(pract._id)) {
        practitioners += `<li>${pract.nameFull}</li>`;
      }
    });
    practitioners += `</ul>`;
  });


  var userHtml = '';
  var start = '<div class="pt-flex-grid"><div class="pt-col">';
  var end = '</div></div>'
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

  if (clients) { // clients in session data
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

  if (reps) { // reps in session data
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
        clientListFullHtml += '</strong></p>  <p><strong> Your current role: </strong>'
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
        clientListFullHtml += 'Edit Role</button></p></div></div></div></div></div>'
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
        repListFullHtml += '</strong></p>  <p><strong> Your current role: </strong>'
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
        repListFullHtml += 'Edit Role</button></p></div></div></div></div></div>'
      }

    });

    // $('.pt-current-user-rep-list').html(repListHtml);
    $('.pt-rep-list-full').html(repListFullHtml);
  }
}

let currentPerson = JSON.parse(localStorage.getItem('person'));

if (!currentPerson.cards || currentPerson.cards.length < 1) {
  $("#healthcard").hide();
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1c2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHV0aWxpdHkgZnVuY3Rpb25zIFxyXG5cclxuLy8gcmV0dXJucyBhZ2UgZnJvbSBkYXRlIG9mIGJpcnRoIHN0cmluZyBcclxuZnVuY3Rpb24gZ2V0QWdlKGRhdGVTdHJpbmcpIHtcclxuICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gIHZhciBiaXJ0aERhdGUgPSBuZXcgRGF0ZShkYXRlU3RyaW5nKTtcclxuICB2YXIgYWdlID0gdG9kYXkuZ2V0RnVsbFllYXIoKSAtIGJpcnRoRGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gIHZhciBtID0gdG9kYXkuZ2V0TW9udGgoKSAtIGJpcnRoRGF0ZS5nZXRNb250aCgpO1xyXG4gIGlmIChtIDwgMCB8fCAobSA9PT0gMCAmJiB0b2RheS5nZXREYXRlKCkgPCBiaXJ0aERhdGUuZ2V0RGF0ZSgpKSkge1xyXG4gICAgYWdlLS07XHJcbiAgfVxyXG4gIHJldHVybiBhZ2U7XHJcbn1cclxuXHJcbi8vIHJldHVybnMgc2VyaWFsaXplcyBmb3JtIGRhdGEgZnJvbSBhIGZvcm0gXHJcbmZ1bmN0aW9uIGdldEZvcm1EYXRhKCRmb3JtKSB7XHJcbiAgdmFyIHVuaW5kZXhlZF9hcnJheSA9ICRmb3JtLnNlcmlhbGl6ZUFycmF5KCk7XHJcbiAgdmFyIGluZGV4ZWRfYXJyYXkgPSB7fTtcclxuXHJcbiAgJC5tYXAodW5pbmRleGVkX2FycmF5LCBmdW5jdGlvbiAobiwgaSkge1xyXG4gICAgaW5kZXhlZF9hcnJheVtuWyduYW1lJ11dID0gblsndmFsdWUnXTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGluZGV4ZWRfYXJyYXk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGd1aWRHZW5lcmF0b3IoKSB7XHJcbiAgdmFyIFM0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuICgoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApIHwgMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKTtcclxuICB9O1xyXG4gIHJldHVybiAoUzQoKSArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBTNCgpICsgUzQoKSk7XHJcbn1cclxuXHJcbi8vIGVuZCB1dGlsaXR5IGZ1bmN0aW9ucyBcclxuXHJcblxyXG4vLyBjYWxsIHVwIHRoZSBwZXJzb25hIHBhbmVsIHZpYSBrZXlib2FyZCBcclxuJChkb2N1bWVudCkua2V5cHJlc3MoZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgc3dpdGNoIChlLndoaWNoKSB7XHJcbiAgICBjYXNlIDEyNjogLy90aWxkYSArIHNoaWZ0XHJcbiAgICAgICQoJy5wdC1wZXJzb25hLXN3aXRjaGVyJykudG9nZ2xlKCk7XHJcbiAgICAgIC8vIGFkZExpc3RlbmVycygpO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIHdpbmRvdy5vbmxvYWQgPSBhZGRMaXN0ZW5lcnMoKTtcclxuXHJcbi8vIGZ1bmN0aW9uIGFkZExpc3RlbmVycygpIHtcclxuLy8gICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwdC1wZXJzb25hLXN3aXRjaGVyJylbMF0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2VEb3duLCBmYWxzZSk7XHJcbi8vICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwLCBmYWxzZSk7XHJcblxyXG4vLyB9XHJcblxyXG4vLyBmdW5jdGlvbiBtb3VzZVVwKCkge1xyXG4vLyAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBkaXZNb3ZlLCB0cnVlKTtcclxuLy8gfVxyXG5cclxuLy8gZnVuY3Rpb24gbW91c2VEb3duKGUpIHtcclxuLy8gICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZGl2TW92ZSwgdHJ1ZSk7XHJcbi8vIH1cclxuXHJcbi8vIGZ1bmN0aW9uIGRpdk1vdmUoZSkge1xyXG4vLyAgIHZhciBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwdC1wZXJzb25hLXN3aXRjaGVyJylbMF07XHJcbi8vICAgZGl2LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuLy8gICBkaXYuc3R5bGUudG9wID0gZS5jbGllbnRZICsgJ3B4JztcclxuLy8gICBkaXYuc3R5bGUubGVmdCA9IGUuY2xpZW50WCArICdweCc7XHJcbi8vIH1cclxuXHJcblxyXG4vLyBvciB2aWEgbG9nbyBsb25nIHByZXNzXHJcblxyXG4vLyAvLyBncmFiIHRoZSBlbGVtZW50XHJcbi8vIHZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteXMtbG9nbycpO1xyXG5cclxuLy8gLy8gbGlzdGVuIGZvciB0aGUgbG9uZy1wcmVzcyBldmVudFxyXG4vLyBlbC5hZGRFdmVudExpc3RlbmVyKCdsb25nLXByZXNzJywgZnVuY3Rpb24gKGUpIHtcclxuLy8gICAvLyBzdG9wIHRoZSBldmVudCBmcm9tIGJ1YmJsaW5nIHVwXHJcbi8vICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbi8vICAgJCgnLnB0LXBlcnNvbmEtc3dpdGNoZXInKS50b2dnbGUoKTtcclxuLy8gfSk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzd2lwZWQtbGVmdCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc29sZS5sb2coZS50YXJnZXQpOyAvLyBlbGVtZW50IHRoYXQgd2FzIHN3aXBlZFxyXG4gICQoJy5wdC1wZXJzb25hLXN3aXRjaGVyJykudG9nZ2xlKCk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBpbml0Tm9tUmVwKCkge1xyXG5cclxuICB2YXIgcmVwRmxvdyA9IGdldFVybFBhcmFtZXRlcigncmVwRmxvdycpO1xyXG5cclxuICBpZiAocmVwRmxvdykge1xyXG5cclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXBGbG93JywgcmVwRmxvdyk7XHJcblxyXG4gIH0gZWxzZSBpZiAoXCJyZXBGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVwRmxvdycsICdub25lJyk7XHJcbiAgfVxyXG5cclxuICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZXBGbG93JykgPT0gJ2JvdGgnKSkge1xyXG4gICAgalF1ZXJ5KFwiLnB0LWZpcnN0LXRpbWUtbm9cIikuc2hvdygpO1xyXG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LXJlcHJlc2VudGluZy1ub1wiKS5oaWRlKCk7XHJcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctcmVwcmVzZW50ZWQtbm9cIikuaGlkZSgpO1xyXG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LW5vbmVcIikuaGlkZSgpO1xyXG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LXJlcHJlc2VudGluZ1wiKS5zaG93KCk7XHJcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctcmVwcmVzZW50ZWRcIikuc2hvdygpO1xyXG4gIH0gZWxzZSBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZXBGbG93JykgPT0gJ25vbmUnKSkge1xyXG4gICAgalF1ZXJ5KFwiLnB0LWZpcnN0LXRpbWUtbm9cIikuc2hvdygpO1xyXG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LXJlcHJlc2VudGluZ1wiKS5oaWRlKCk7XHJcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctcmVwcmVzZW50ZWRcIikuaGlkZSgpO1xyXG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LW5vbmUtbm9cIikuaGlkZSgpO1xyXG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LW5vbmVcIikuc2hvdygpO1xyXG4gIH0gZWxzZSBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZXBGbG93JykgPT0gJ3JlcHJlc2VudGluZycpKSB7XHJcbiAgICBqUXVlcnkoXCIucHQtZmlyc3QtdGltZS1ub1wiKS5zaG93KCk7XHJcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctcmVwcmVzZW50ZWRcIikuaGlkZSgpO1xyXG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LXJlcHJlc2VudGluZy1ub1wiKS5oaWRlKCk7XHJcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctbm9uZVwiKS5oaWRlKCk7XHJcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctcmVwcmVzZW50aW5nXCIpLnNob3coKTtcclxuICB9IGVsc2UgaWYgKChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmVwRmxvdycpID09ICdyZXByZXNlbnRlZCcpKSB7XHJcbiAgICBqUXVlcnkoXCIucHQtZmlyc3QtdGltZS1ub1wiKS5zaG93KCk7XHJcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctcmVwcmVzZW50aW5nXCIpLmhpZGUoKTtcclxuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1ub25lXCIpLmhpZGUoKTtcclxuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1yZXByZXNlbnRlZFwiKS5zaG93KCk7XHJcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctcmVwcmVzZW50ZWQtbm9cIikuaGlkZSgpO1xyXG4gIH0gZWxzZSBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZXBGbG93JykgPT0gJ25ld2JpZScpKSB7XHJcbiAgICBqUXVlcnkoXCIucHQtZmlyc3QtdGltZS1ub1wiKS5oaWRlKCk7XHJcbiAgICBqUXVlcnkoXCIucHQtZmlyc3QtdGltZVwiKS5zaG93KCk7XHJcbiAgfVxyXG59XHJcblxyXG5pbml0Tm9tUmVwKCk7XHJcblxyXG5cclxuLy8gYmFubmVyc1xyXG5mdW5jdGlvbiBpbml0QmFubmVycygpIHtcclxuXHJcbiAgdmFyIGJhbm5lckZsb3cgPSBnZXRVcmxQYXJhbWV0ZXIoJ2Jhbm5lckZsb3cnKTtcclxuXHJcbiAgaWYgKGJhbm5lckZsb3cpIHtcclxuXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYmFubmVyRmxvdycsIGJhbm5lckZsb3cpO1xyXG5cclxuICB9IGVsc2UgaWYgKFwiYmFubmVyRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Jhbm5lckZsb3cnLCAnbm9uZScpO1xyXG4gIH1cclxuXHJcbiAgaWYgKChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmFubmVyRmxvdycpID09ICdhbGwnKSkge1xyXG4gICAgalF1ZXJ5KFwiLnB0LWJhbm5lci1zZXJ2aWNlXCIpLnNob3coKTtcclxuICAgIGpRdWVyeShcIi5wdC1iYW5uZXItbnItcmVwXCIpLnNob3coKTtcclxuICB9IGVsc2UgaWYgKChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmFubmVyRmxvdycpID09ICdub25lJykpIHtcclxuICAgIGpRdWVyeShcIi5wdC1iYW5uZXItc2VydmljZVwiKS5oaWRlKCk7XHJcbiAgICBqUXVlcnkoXCIucHQtYmFubmVyLW5yLXJlcFwiKS5oaWRlKCk7XHJcbiAgfSBlbHNlIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Jhbm5lckZsb3cnKSA9PSAnc2VydmljZScpKSB7XHJcbiAgICBqUXVlcnkoXCIucHQtYmFubmVyLXNlcnZpY2VcIikuc2hvdygpO1xyXG4gICAgalF1ZXJ5KFwiLnB0LWJhbm5lci1uci1yZXBcIikuaGlkZSgpO1xyXG4gIH0gZWxzZSBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiYW5uZXJGbG93JykgPT0gJ25yLXJlcCcpKSB7XHJcbiAgICBqUXVlcnkoXCIucHQtYmFubmVyLXNlcnZpY2VcIikuaGlkZSgpO1xyXG4gICAgalF1ZXJ5KFwiLnB0LWJhbm5lci1uci1yZXBcIikuc2hvdygpO1xyXG4gIH1cclxufVxyXG5cclxuaW5pdEJhbm5lcnMoKTtcclxuXHJcblxyXG4vLyBTd2l0Y2ggYWNjb3VudFxyXG5mdW5jdGlvbiBpbml0U3dpdGNoKCkge1xyXG5cclxuICB2YXIgc3dpdGNoRmxvdyA9IGdldFVybFBhcmFtZXRlcignc3dpdGNoRmxvdycpO1xyXG4gIHZhciBzd2l0Y2hJZCA9IGdldFVybFBhcmFtZXRlcignc3dpdGNoSWQnKTtcclxuXHJcbiAgaWYgKHN3aXRjaEZsb3cpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzd2l0Y2hGbG93Jywgc3dpdGNoRmxvdyk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3dpdGNoSWQnLCBzd2l0Y2hJZCk7XHJcbiAgICBqUXVlcnkoJy5wdC1tYW5hZ2luZy11c2VyICcpLnNsaWRlRG93bignZmFzdCcpO1xyXG4gIH1cclxuXHJcbiAgaWYgKChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3dpdGNoRmxvdycpID09ICdhY3RpdmUnKSkge1xyXG4gICAgalF1ZXJ5KCcucHQtbWFuYWdpbmctdXNlciAnKS5zaG93KCk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBqUXVlcnkoJy5zd2l0Y2gtYWNjb3VudC1idXR0b24nKS5yZW1vdmVDbGFzcyhcInN3aXRjaC1hY2NvdW50LWJ1dHRvbi0tY3VycmVudFwiKTtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgLy8gaGlkZSBzd2l0Y2ggYWNjb3VudCBvdmVybGF5IHdoZW4gY2xpY2tpbmcgZWxzZXdoZXJlIG9uIHRoZSBwYWdlXHJcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKFwiLnN3aXRjaC1hY2NvdW50LWJveFwiKS5hZGRDbGFzcyhcInN3aXRjaC1hY2NvdW50LWJveC0taGlkZVwiKTtcclxuICB9KTtcclxuXHJcbn1cclxuXHJcbmluaXRTd2l0Y2goKTtcclxuXHJcblxyXG5cclxuXHJcbi8vIHRvIGdlbmVyYXRlIG1vcmUgdXNlcnMsIGdvIHRvIHd3dy5qc29uLWdlbmVyYXRvci5jb20gYW5kIHBhc3RlIGluIHRoZSBkYXRhIGZyb20gL2RvY3MvZGF0YS91c2VyLmdlbmVyYXRvciBcclxuLy8gYW5kIHBhc3RlIGluIHRoZSBnZW5lcmF0ZWQgdXNlcnMgaW4gdG8gL2RvY3MvZGF0YS91c2VyLmpzb25cclxuXHJcbi8vIFB1bGwgaW4gdGhlIGpzb24gY29udGVudCBcclxuJC5hamF4KHtcclxuICB1cmw6ICcvZG9jcy9kYXRhL3VzZXIuanNvbicsXHJcbiAgYXN5bmM6IGZhbHNlLFxyXG4gIGRhdGFUeXBlOiAnanNvbidcclxufSkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICBjb25zb2xlLmxvZygnVXNlciBkYXRhIGJhY2snKTtcclxuXHJcblxyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxQZXJzb25zJywgSlNPTi5zdHJpbmdpZnkoZGF0YS5wZXJzb24pKTtcclxuXHJcbiAgLy8gc2V0IHRoZSBkZWZhdWx0IE15U2VydmljZSB1c2VyIGlmIG5vIHVzZXIgaGFzIGJlZW4gcmVxdWVzdGVkIFxyXG4gIGlmICghKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwZXJzb24nKSkpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwZXJzb24nLCBKU09OLnN0cmluZ2lmeShkYXRhLnBlcnNvblswXSkpO1xyXG4gICAgY29uc29sZS5sb2coJ3NldHRpbmcgdGhlIGRlZmF1bHQgdXNlcicpO1xyXG4gIH1cclxuXHJcbiAgLy8gcG9wdWxhdGUgdGhlIHVzZXIgZHJvcGRvd24gbGlzdCB3aXRoIHVzZXJzIGZyb20gdGhlIGpzb25cclxuICB2YXIgJHVzZXJTZWxlY3QgPSAkKCcjdXNlci1kcm9wLWRvd24nKTtcclxuICAkdXNlclNlbGVjdC5lbXB0eSgpO1xyXG4gICR1c2VyU2VsZWN0LmFwcGVuZCgnPG9wdGlvbj4tLSBTZWxlY3QgYSB1c2VyIC0tPC9vcHRpb24+Jyk7XHJcbiAgJC5lYWNoKGRhdGEucGVyc29uLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgJHVzZXJTZWxlY3QuYXBwZW5kKCc8b3B0aW9uIHZhbHVlPScgKyB2YWx1ZS5faWQgKyAnPicgKyB2YWx1ZS5uYW1lRnVsbCArICc8L29wdGlvbj4nKTtcclxuICB9KTtcclxuXHJcbiAgLy8gc3dpdGNoIHRoZSB1c2VyIFxyXG4gICR1c2VyU2VsZWN0LmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VsZWN0ZWRJZCA9IHRoaXMudmFsdWU7XHJcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCd1c2Vyc0NsaWVudHMnKTtcclxuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJzUmVwcycpO1xyXG4gICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgnc2Vzc2lvbkd1aWQnKTtcclxuXHJcbiAgICAkLmVhY2goZGF0YS5wZXJzb24sIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG5cclxuICAgICAgaWYgKGVsZW1lbnQuX2lkID09PSBzZWxlY3RlZElkKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BlcnNvbicsIEpTT04uc3RyaW5naWZ5KGRhdGEucGVyc29uW2luZGV4XSkpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzd2l0Y2hJZCcsICdub25lJyk7XHJcbiAgICAgICAgalF1ZXJ5KCcucHQtbWFuYWdpbmctdXNlcicpLnNsaWRlVXAoJ2Zhc3QnKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3dpdGNoRmxvdycsICdub25lJyk7XHJcbiAgICAgICAgd3JpdGVVc2VyKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIHdyaXRlVXNlcigpO1xyXG59KTtcclxuXHJcblxyXG4vLyBwdXQgdGhlIHVzZXIgZnJvbSB1c2VyLmpzIGluIHRvIGxvY2FsIHN0b3JhZ2UgYW5kIHRoZSB1c2VycyBjbGllbnRzIGluIHRvIHNlc3Npb24gc3RvcmFnZSBcclxuZnVuY3Rpb24gd3JpdGVVc2VyKCkge1xyXG5cclxuICBjb25zb2xlLmxvZygnV3JpdGluZyB1c2VyICAnKTtcclxuXHJcbiAgY29uc3QgdXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BlcnNvbicpKTtcclxuICBjb25zdCBzZXNzaW9uQ2xpZW50cyA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcnNDbGllbnRzJykpO1xyXG4gIGNvbnN0IHNlc3Npb25SZXBzID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2Vyc1JlcHMnKSk7XHJcblxyXG4gIHdpbmRvdy5hbGxDbGllbnRzID0gW107XHJcbiAgd2luZG93LmFsbFJlcHMgPSBbXTtcclxuXHJcbiAgaWYgKHNlc3Npb25DbGllbnRzKSB7XHJcblxyXG4gICAgJC5lYWNoKHNlc3Npb25DbGllbnRzLCBmdW5jdGlvbiAoaW5kZXgsIGNsaWVudCkge1xyXG4gICAgICAvLyBhZGQgbmV3IGZvcm0gZGF0YSB0byBhbiBleGlzdGluZyBjbGllbnRcclxuICAgICAgd2luZG93LmFsbENsaWVudHMucHVzaChjbGllbnQpO1xyXG4gICAgfSk7XHJcblxyXG4gIH0gZWxzZSB7IC8vIG5vIGNsaWVudCBkYXRhIGluIHNlc3Npb24gc28gZ2V0IGl0IGZyb20gdGhlIHVzZXIgXHJcbiAgICAkLmVhY2godXNlci5jbGllbnRzLCBmdW5jdGlvbiAoaW5kZXgsIGNsaWVudCkge1xyXG5cclxuICAgICAgd2luZG93LmFsbENsaWVudHMucHVzaChjbGllbnQpO1xyXG5cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNlc3Npb25SZXBzKSB7XHJcblxyXG4gICAgJC5lYWNoKHNlc3Npb25SZXBzLCBmdW5jdGlvbiAoaW5kZXgsIHJlcCkge1xyXG4gICAgICAvLyBhZGQgbmV3IGZvcm0gZGF0YSB0byBhbiBleGlzdGluZyByZXBcclxuICAgICAgd2luZG93LmFsbFJlcHMucHVzaChyZXApO1xyXG4gICAgfSk7XHJcblxyXG4gIH0gZWxzZSB7IC8vIG5vIHJlcCBkYXRhIGluIHNlc3Npb24gc28gZ2V0IGl0IGZyb20gdGhlIHVzZXIgXHJcbiAgICAkLmVhY2godXNlci5yZXBzLCBmdW5jdGlvbiAoaW5kZXgsIHJlcCkge1xyXG5cclxuICAgICAgd2luZG93LmFsbFJlcHMucHVzaChyZXApO1xyXG5cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3VzZXJzQ2xpZW50cycsIEpTT04uc3RyaW5naWZ5KHdpbmRvdy5hbGxDbGllbnRzKSk7XHJcbiAgLy8gc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgndXNlcnNNdWx0aXBsZUNsaWVudHMnLCBKU09OLnN0cmluZ2lmeSh3aW5kb3cuYWxsQ2xpZW50cykpO1xyXG5cclxuICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1c2Vyc1JlcHMnLCBKU09OLnN0cmluZ2lmeSh3aW5kb3cuYWxsUmVwcykpO1xyXG5cclxuICB2YXIgZmlyc3RUaW1lVXNlciA9IHRydWU7XHJcbiAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Nlc3Npb25HdWlkJykpIHtcclxuICAgIGZpcnN0VGltZVVzZXIgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8vIGNvdW50IG51bWJlciBvZiBjbGllbnRzIFxyXG4gIHZhciBzZXNzaW9uQ2xpZW50U3VibWl0dGVkID0gZmFsc2U7XHJcbiAgdmFyIHNlc3Npb25SZXBTdWJtaXR0ZWQgPSBmYWxzZTtcclxuXHJcblxyXG5cclxuICBpZiAoKHdpbmRvdy5hbGxDbGllbnRzLmxlbmd0aCA+IDApICYmICh3aW5kb3cuYWxsUmVwcy5sZW5ndGggPiAwKSkge1xyXG4gICAgLy8gY29uc29sZS5sb2coJyBib3RoJyk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVwRmxvdycsICdib3RoJyk7XHJcbiAgICAkKCcucHQtc3dpdGNoLWFjY291bnQnKS5zaG93KCk7XHJcblxyXG4gICAgaWYgKHVzZXIuY2xpZW50cykge1xyXG4gICAgICBzZXNzaW9uQ2xpZW50U3VibWl0dGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgfSBlbHNlIGlmICh3aW5kb3cuYWxsQ2xpZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBjb25zb2xlLmxvZygnIHJlcHJlc2VudGluZycpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlcEZsb3cnLCAncmVwcmVzZW50aW5nJyk7XHJcbiAgICBpZiAodXNlci5jbGllbnRzKSB7XHJcbiAgICAgIHNlc3Npb25DbGllbnRTdWJtaXR0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAod2luZG93LmFsbFJlcHMubGVuZ3RoID4gMCkge1xyXG4gICAgY29uc29sZS5sb2coJyByZXByZXNlbnRlZCcpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlcEZsb3cnLCAncmVwcmVzZW50ZWQnKTtcclxuICAgIGlmICh1c2VyLnJlcHMpIHtcclxuICAgICAgc2Vzc2lvblJlcFN1Ym1pdHRlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBpZiAoc2Vzc2lvblJlcHMpIHtcclxuICAvLyAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXBGbG93JywgJ3JlcHJlc2VudGluZycpO1xyXG4gIC8vICAgaWYgKHNlc3Npb25SZXBzLnJlcFswXS5zdWJtaXR0ZWRBcHBsaWNhdGlvbiA9PSBcInRydWVcIikge1xyXG4gIC8vICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVwRmxvdycsICdyZXByZXNlbnRpbmcnKTtcclxuICAvLyAgICAgdmFyIHNlc3Npb25SZXBTdWJtaXR0ZWQgPSB0cnVlO1xyXG4gIC8vICAgICB1c2VyLnJlcHMucHVzaChzZXNzaW9uUmVwcy5yZXBbMF0pO1xyXG4gIC8vICAgfVxyXG5cclxuICAvLyAgIGlmIChzZXNzaW9uUmVwcy5yZXBbMF0ucm9sZSA9PSBcIkNlYXNlXCIpIHtcclxuICAvLyAgICAgdXNlci5udW1iZXJPZlJlcHMgPSAwXHJcbiAgLy8gICAgIHVzZXIucmVwcy5sZW5ndGggPSAwO1xyXG4gIC8vICAgICBzZXNzaW9uUmVwU3VibWl0dGVkID0gZmFsc2U7XHJcbiAgLy8gICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXBGbG93JywgJ25vbmUnKTtcclxuICAvLyAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcnNSZXBzJyk7XHJcbiAgLy8gICAgIGlmICghd2luZG93LmxvY2F0aW9uLmhhc2gpIHtcclxuICAvLyAgICAgICB3aW5kb3cubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24gKyAnI3JlcC1saXN0JztcclxuICAvLyAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH1cclxuXHJcbiAgLy8gfVxyXG5cclxuXHJcbiAgLy8gc2V0XHJcbiAgaWYgKCh1c2VyLmNsaWVudHMubGVuZ3RoID4gMCkgfHwgKHNlc3Npb25DbGllbnRTdWJtaXR0ZWQgPT09IHRydWUpKSB7XHJcblxyXG4gICAgaWYgKHVzZXIuY2xpZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHVzZXIubnVtYmVyT2ZDbGllbnRzID0gdXNlci5jbGllbnRzLmxlbmd0aDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHVzZXIubnVtYmVyT2ZDbGllbnRzID0gd2luZG93LmFsbENsaWVudHMubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICB9IGVsc2UgaWYgKHVzZXIuY2xpZW50cy5sZW5ndGggPCAxKSB7XHJcbiAgICB1c2VyLm51bWJlck9mQ2xpZW50cyA9IDA7XHJcbiAgfVxyXG5cclxuICBpZiAoKHVzZXIucmVwcy5sZW5ndGggPiAwKSB8fCAoc2Vzc2lvblJlcFN1Ym1pdHRlZCA9PT0gdHJ1ZSkpIHtcclxuXHJcbiAgICBpZiAodXNlci5yZXBzLmxlbmd0aCA+IDApIHtcclxuICAgICAgdXNlci5udW1iZXJPZlJlcHMgPSB1c2VyLnJlcHMubGVuZ3RoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdXNlci5udW1iZXJPZlJlcHMgPSB3aW5kb3cuYWxsUmVwcy5sZW5ndGg7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmICh1c2VyLnJlcHMubGVuZ3RoIDwgMSkge1xyXG4gICAgdXNlci5udW1iZXJPZlJlcHMgPSAwO1xyXG4gICAgLy8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlcEZsb3cnLCAnbmV3YmllJyk7XHJcbiAgfVxyXG5cclxuICBpZiAodXNlci5jbGFpbXMpIHtcclxuICAgIHVzZXIubnVtYmVyT2ZDbGFpbXMgPSB1c2VyLmNsYWltcy5sZW5ndGg7XHJcbiAgfSBlbHNlIHtcclxuICAgIHVzZXIubnVtYmVyT2ZDbGFpbXMgPSAwO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIHNob3cgaGlkZSB0aGUgc3dpdGNoIGFjY291bnQgYnV0dG9uc1xyXG5cclxuICAvLyBjb25zb2xlLmxvZygnc2Vzc2lvbkNsaWVudFN1Ym1pdHRlZCAtPiAnICsgc2Vzc2lvbkNsaWVudFN1Ym1pdHRlZCk7XHJcbiAgLy8gY29uc29sZS5sb2coJ3dpbmRvdy5hbGxDbGllbnRzLmxlbmd0aCAtPiAnICsgd2luZG93LmFsbENsaWVudHMubGVuZ3RoKTtcclxuICBpZiAoKHNlc3Npb25SZXBTdWJtaXR0ZWQgPT09IHRydWUpICYmIChzZXNzaW9uQ2xpZW50U3VibWl0dGVkID09PSB0cnVlKSkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlcEZsb3cnLCAnYm90aCcpO1xyXG4gICAgJCgnLnB0LXN3aXRjaC1hY2NvdW50Jykuc2hvdygpO1xyXG4gICAgZmlyc3RUaW1lVXNlciA9IGZhbHNlO1xyXG4gIH0gZWxzZSBpZiAoKHNlc3Npb25SZXBTdWJtaXR0ZWQgPT09IHRydWUpIHx8ICh1c2VyLm51bWJlck9mUmVwcyA+IDApKSB7XHJcbiAgICAvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVwRmxvdycsICdyZXByZXNlbnRlZCcpO1xyXG4gICAgZmlyc3RUaW1lVXNlciA9IGZhbHNlO1xyXG4gIH0gZWxzZSBpZiAoKHNlc3Npb25DbGllbnRTdWJtaXR0ZWQgPT09IHRydWUpIHx8ICh3aW5kb3cuYWxsQ2xpZW50cy5sZW5ndGggPiAwKSkge1xyXG4gICAgLy8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlcEZsb3cnLCAncmVwcmVzZW50aW5nJyk7XHJcbiAgICAkKCcucHQtc3dpdGNoLWFjY291bnQnKS5zaG93KCk7XHJcbiAgICBmaXJzdFRpbWVVc2VyID0gZmFsc2U7XHJcbiAgfSBlbHNlIHtcclxuICAgICQoJy5wdC1zd2l0Y2gtYWNjb3VudCcpLmhpZGUoKTtcclxuICAgIC8vIGFsZXJ0KCdoaWRpbmcnKTtcclxuICB9XHJcblxyXG4gIGlmIChmaXJzdFRpbWVVc2VyKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVwRmxvdycsICduZXdiaWUnKTtcclxuICB9XHJcblxyXG4gIHZhciBwcmFjdGl0aW9uZXJzID0gXCJcIjtcclxuXHJcbiAgJC5hamF4KHtcclxuICAgIHVybDogJy9kb2NzL2RhdGEvbWVkaWNhbC1wcmFjdGl0aW9uZXIuanNvbicsXHJcbiAgICB0eXBlOiAnR0VUJyxcclxuICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICBhc3luYzogZmFsc2VcclxuICB9KVxyXG4gIC5kb25lKChkYXRhKSA9PiB7XHJcbiAgICBwcmFjdGl0aW9uZXJzID0gYDx1bD5gO1xyXG4gICAgJC5lYWNoKGRhdGEucHJhY3RpdGlvbmVycywgKGluZGV4LCBwcmFjdCkgPT4ge1xyXG4gICAgICBpZiAodXNlci5wcmFjdGl0aW9uZXJzLmluY2x1ZGVzKHByYWN0Ll9pZCkpIHtcclxuICAgICAgICBwcmFjdGl0aW9uZXJzICs9IGA8bGk+JHtwcmFjdC5uYW1lRnVsbH08L2xpPmA7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcHJhY3RpdGlvbmVycyArPSBgPC91bD5gO1xyXG4gIH0pO1xyXG5cclxuXHJcbiAgdmFyIHVzZXJIdG1sID0gJyc7XHJcbiAgdmFyIHN0YXJ0ID0gJzxkaXYgY2xhc3M9XCJwdC1mbGV4LWdyaWRcIj48ZGl2IGNsYXNzPVwicHQtY29sXCI+JztcclxuICB2YXIgZW5kID0gJzwvZGl2PjwvZGl2PidcclxuICB1c2VySHRtbCArPSBzdGFydCArICdOYW1lIDwvZGl2PjxkaXYgY2xhc3M9XCJwdC1jb2xcIj4nICsgdXNlci5uYW1lRnVsbCArIGVuZDtcclxuICB1c2VySHRtbCArPSBzdGFydCArICdBZ2UgPC9kaXY+PGRpdiBjbGFzcz1cInB0LWNvbFwiPicgKyBnZXRBZ2UodXNlci5kb2IpICsgZW5kO1xyXG4gIHVzZXJIdG1sICs9IHN0YXJ0ICsgJ0lzIGEgdmV0ZXJhbiA8L2Rpdj48ZGl2IGNsYXNzPVwicHQtY29sXCI+JyArIHVzZXIudmV0ZXJhbiArIGVuZDtcclxuICB1c2VySHRtbCArPSBzdGFydCArICdQcmFjdGl0aW9uZXJzIDwvZGl2PjxkaXYgY2xhc3M9XCJwdC1jb2xcIj4nICsgcHJhY3RpdGlvbmVycyArIGVuZDtcclxuICB1c2VySHRtbCArPSBzdGFydCArICdDdXJyZW50bHkgU2VydmluZyA8L2Rpdj48ZGl2IGNsYXNzPVwicHQtY29sXCI+JyArIHVzZXIuaXNDdXJyZW50bHlTZXJ2aW5nICsgZW5kO1xyXG4gIHVzZXJIdG1sICs9IHN0YXJ0ICsgJ0NsaWVudHMgPC9kaXY+PGRpdiBjbGFzcz1cInB0LWNvbFwiPicgKyB1c2VyLm51bWJlck9mQ2xpZW50cyArIGVuZDtcclxuICB1c2VySHRtbCArPSBzdGFydCArICdSZXBzIDwvZGl2PjxkaXYgY2xhc3M9XCJwdC1jb2xcIj4nICsgdXNlci5udW1iZXJPZlJlcHMgKyBlbmQ7XHJcbiAgdXNlckh0bWwgKz0gc3RhcnQgKyAnTGFzdCBwYXltZW50IDwvZGl2PjxkaXYgY2xhc3M9XCJwdC1jb2xcIj4nICsgdXNlci5sYXN0UGF5bWVudCArIGVuZDtcclxuICB1c2VySHRtbCArPSBzdGFydCArICdDbGFpbXMgPC9kaXY+PGRpdiBjbGFzcz1cInB0LWNvbFwiPicgKyB1c2VyLm51bWJlck9mQ2xhaW1zICsgZW5kO1xyXG4gIHVzZXJIdG1sICs9IHN0YXJ0ICsgJ1N0b3J5IDwvZGl2PjxkaXYgY2xhc3M9XCJwdC1jb2xcIj4nICsgdXNlci5zdG9yeSArIGVuZDtcclxuXHJcbiAgdXNlci5waWN0dXJlID0gJzxpbWcgY2xhc3M9XCJwdC1pbWFnZS1jaXJjbGVcIiBzcmM9XCInICsgdXNlci5waWN0dXJlICsgJ1wiPic7XHJcblxyXG5cclxuICAkKCcjdXNlckNvbnRhaW5lcklkJykuaHRtbCh1c2VySHRtbCk7XHJcbiAgJCgnLnB0LWN1cnJlbnQtdXNlci1uYW1lLXBpY3R1cmUnKS5odG1sKHVzZXIucGljdHVyZSk7XHJcbiAgJCgnLnB0LWN1cnJlbnQtdXNlci1uYW1lLWZpcnN0JykuaHRtbCh1c2VyLm5hbWUuZmlyc3QpO1xyXG4gICQoJy5wdC1jdXJyZW50LXVzZXItbmFtZS1mdWxsJykuaHRtbCh1c2VyLm5hbWVGdWxsKTtcclxuICAkKCcucHQtY3VycmVudC11c2VyLWxhc3QtcGF5bWVudCcpLmh0bWwodXNlci5sYXN0UGF5bWVudCk7XHJcbiAgJCgnLnB0LWN1cnJlbnQtdXNlci1udW1iZXItb2YtY2xhaW1zJykuaHRtbCh1c2VyLm51bWJlck9mQ2xhaW1zKTtcclxuXHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiB3cml0ZUNsaWVudChmb3JtKSB7XHJcblxyXG4gIHZhciBmb3JtRGF0YSA9IGdldEZvcm1EYXRhKGZvcm0pO1xyXG4gIHZhciBjbGllbnRzID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcnNDbGllbnRzJyk7XHJcblxyXG4gIGlmIChjbGllbnRzKSB7IC8vIGNsaWVudHMgaW4gc2Vzc2lvbiBkYXRhXHJcbiAgICBjb25zb2xlLmxvZygnVGhlcmUgYXJlIGNsaWVudHMgaW4gc2Vzc2lvbicpO1xyXG4gICAgdmFyIGV4aXN0aW5nQ2xpZW50ID0gZmFsc2U7XHJcbiAgICB2YXIgcGFyc2VkQ2xpZW50cyA9IEpTT04ucGFyc2UoY2xpZW50cyk7XHJcbiAgICB2YXIgc2Vzc2lvbkd1aWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uR3VpZCcpO1xyXG5cclxuICAgICQuZWFjaChwYXJzZWRDbGllbnRzLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuXHJcbiAgICAgIGlmIChlbGVtZW50LmlkID09PSBzZXNzaW9uR3VpZCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd3cml0aW5nIHRvIGFuIEVYSVNUSU5HIGNsaWVudCcpO1xyXG5cclxuICAgICAgICAvLyBhZGQgbmV3IGZvcm0gZGF0YSB0byBhbiBleGlzdGluZyBjbGllbnRcclxuICAgICAgICAkLmV4dGVuZCh0cnVlLCB3aW5kb3cuYWxsQ2xpZW50c1tpbmRleF0sIGZvcm1EYXRhKTtcclxuICAgICAgICBleGlzdGluZ0NsaWVudCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChleGlzdGluZ0NsaWVudCA9PT0gZmFsc2UpIHtcclxuICAgICAgY29uc29sZS5sb2coJ3dyaXRpbmcgdG8gYSBORVcgY2xpZW50Jyk7XHJcbiAgICAgIHdpbmRvdy5hbGxDbGllbnRzLnB1c2goZm9ybURhdGEpO1xyXG4gICAgfVxyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5sb2coJ25vIGNsaWVudHMgc28gd3JpdGluZyB0byBhIE5FVyBjbGllbnQnKTtcclxuICAgIHdpbmRvdy5hbGxDbGllbnRzLnB1c2goZm9ybURhdGEpO1xyXG4gIH1cclxuXHJcbiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgndXNlcnNDbGllbnRzJywgSlNPTi5zdHJpbmdpZnkod2luZG93LmFsbENsaWVudHMpKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHdyaXRlUmVwKGZvcm0pIHtcclxuXHJcbiAgdmFyIGZvcm1EYXRhID0gZ2V0Rm9ybURhdGEoZm9ybSk7XHJcbiAgdmFyIHJlcHMgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2Vyc1JlcHMnKTtcclxuXHJcbiAgaWYgKHJlcHMpIHsgLy8gcmVwcyBpbiBzZXNzaW9uIGRhdGFcclxuICAgIGNvbnNvbGUubG9nKCdUaGVyZSBhcmUgcmVwcyBpbiBzZXNzaW9uJyk7XHJcbiAgICB2YXIgZXhpc3RpbmdSZXAgPSBmYWxzZTtcclxuICAgIHZhciBwYXJzZWRSZXBzID0gSlNPTi5wYXJzZShyZXBzKTtcclxuICAgIHZhciBzZXNzaW9uR3VpZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Nlc3Npb25HdWlkJyk7XHJcblxyXG4gICAgJC5lYWNoKHBhcnNlZFJlcHMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG5cclxuICAgICAgaWYgKGVsZW1lbnQuaWQgPT09IHNlc3Npb25HdWlkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3dyaXRpbmcgdG8gYW4gRVhJU1RJTkcgY2xpZW50Jyk7XHJcblxyXG4gICAgICAgIC8vIGFkZCBuZXcgZm9ybSBkYXRhIHRvIGFuIGV4aXN0aW5nIGNsaWVudFxyXG4gICAgICAgICQuZXh0ZW5kKHRydWUsIHdpbmRvdy5hbGxSZXBzW2luZGV4XSwgZm9ybURhdGEpO1xyXG4gICAgICAgIGV4aXN0aW5nUmVwID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGV4aXN0aW5nUmVwID09PSBmYWxzZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnd3JpdGluZyB0byBhIE5FVyBjbGllbnQnKTtcclxuICAgICAgd2luZG93LmFsbFJlcHMucHVzaChmb3JtRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZygnbm8gcmVwcyBzbyB3cml0aW5nIHRvIGEgTkVXIGNsaWVudCcpO1xyXG4gICAgd2luZG93LmFsbFJlcHMucHVzaChmb3JtRGF0YSk7XHJcbiAgfVxyXG5cclxuICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1c2Vyc1JlcHMnLCBKU09OLnN0cmluZ2lmeSh3aW5kb3cuYWxsUmVwcykpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWFkQ2xpZW50KCkge1xyXG4gIGNvbnNvbGUubG9nKCdSZWFkaW5nIGNsaWVudCBkYXRhJyk7XHJcblxyXG4gIHZhciB1cmxJZCA9IGdldFVybFBhcmFtZXRlcignaWQnKTtcclxuXHJcbiAgaWYgKHVybElkKSB7XHJcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdzZXNzaW9uR3VpZCcsIHVybElkKTtcclxuICB9XHJcblxyXG4gIHZhciBjbGllbnRzID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcnNDbGllbnRzJyk7XHJcbiAgdmFyIHBhcnNlZENsaWVudHMgPSBKU09OLnBhcnNlKGNsaWVudHMpO1xyXG4gIHZhciB1c2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BlcnNvbicpO1xyXG4gIHZhciBwYXJzZWRVc2VyID0gSlNPTi5wYXJzZSh1c2VyKTtcclxuICB2YXIgc2Vzc2lvbkd1aWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uR3VpZCcpO1xyXG5cclxuICBpZiAocGFyc2VkQ2xpZW50cykge1xyXG4gICAgdmFyIGNsaWVudExpc3RIdG1sID0gJyc7XHJcbiAgICB2YXIgY2xpZW50TGlzdEZ1bGxIdG1sID0gJyc7XHJcbiAgICB2YXIgc3dpdGNoSWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3dpdGNoSWQnKTtcclxuXHJcbiAgICAkLmVhY2gocGFyc2VkQ2xpZW50cywgZnVuY3Rpb24gKGluZGV4LCBjbGllbnQpIHtcclxuXHJcbiAgICAgIC8vIHdyaXRlIHRoZSBjbGllbnQgY3VycmVudGx5IGJlaW5nIHdvcmtlZCBvblxyXG4gICAgICBpZiAoY2xpZW50LmlkID09PSBzZXNzaW9uR3VpZCkge1xyXG4gICAgICAgICQuZWFjaChjbGllbnQsIGZ1bmN0aW9uIChpbmRleCwgY2xpZW50KSB7XHJcbiAgICAgICAgICAkKCcucHQtY3VycmVudC1jbGllbnQtJyArIGluZGV4KS5odG1sKGNsaWVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjbGllbnQuaWQgPT0gc3dpdGNoSWQpIHtcclxuICAgICAgICB0aGlzLm5hbWVGdWxsID0gdGhpcy5uYW1lRmlyc3QgKyAnICcgKyB0aGlzLm5hbWVMYXN0O1xyXG4gICAgICAgICQoJy5wdC1jdXJyZW50LXVzZXItbmFtZS1maXJzdCcpLmh0bWwodGhpcy5uYW1lRmlyc3QpO1xyXG4gICAgICAgICQoJy5wdC1jdXJyZW50LXVzZXItbmFtZS1mdWxsJykuaHRtbCh0aGlzLm5hbWVGdWxsKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNsaWVudC5yb2xlICE9PSBcIkNlYXNlXCIpIHtcclxuXHJcbiAgICAgICAgY2xpZW50Lm5hbWVGdWxsID0gY2xpZW50Lm5hbWVGaXJzdCArICcgJyArIGNsaWVudC5uYW1lTGFzdDtcclxuXHJcbiAgICAgICAgLy8gc3dpdGNoIGxpc3RcclxuICAgICAgICBjbGllbnRMaXN0SHRtbCArPSAnPGxpPjxhIGhyZWY9XCIvYXV0aD9zd2l0Y2hGbG93PWFjdGl2ZSZzd2l0Y2hJZD0nICsgY2xpZW50LmlkICsgJ1wiIGNsYXNzPVwic3dpdGNoLWFjY291bnQtYm94X19saW5rXCI+PHN0cm9uZz4nO1xyXG4gICAgICAgIGNsaWVudExpc3RIdG1sICs9IGNsaWVudC5uYW1lRmlyc3QgKyAnICcgKyBjbGllbnQubmFtZUxhc3QgKyAnPC9zdHJvbmc+JztcclxuICAgICAgICBjbGllbnRMaXN0SHRtbCArPSAnICgnICsgY2xpZW50LnJvbGUgKyAnKTwvYT48L2xpPic7XHJcblxyXG4gICAgICAgIC8vIGFsbCBjbGllbnRzIGxpc3RcclxuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwiY29sLXNtLTEyIG1hcmdpbi1iZWxvdy0tbWlkXCI+PGRpdiBjbGFzcz1cImhvcml6b250YWwtY2FyZC1zZWN0aW9uXCI+JztcclxuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gJzxkaXYgY2xhc3M9XCJjYXJkIGNhcmQtLWhvcml6b250YWwgZmxleC1jb250YWluZXJcIj48ZGl2IGNsYXNzPVwiZmxleC1pdGVtIGZsZXgtaXRlbS0taWNvbi1vbmx5XCI+JztcclxuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gJzxzcGFuIGNsYXNzPVwiZmFsIGZhLWljb24tbnIgZmEtdXNlci1lZGl0XCI+PC9zcGFuPiA8L2Rpdj48ZGl2IGNsYXNzPVwiZmxleC1pdGVtIGZsZXgtaXRlbS0tbGFyZ2VcIj48cD48c3Ryb25nPic7XHJcbiAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9IGNsaWVudC5uYW1lRmlyc3QgKyAnICcgKyBjbGllbnQubmFtZUxhc3Q7XHJcbiAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9ICc8L3N0cm9uZz48L3A+ICA8cD48c3Ryb25nPiBZb3VyIGN1cnJlbnQgcm9sZTogPC9zdHJvbmc+J1xyXG4gICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSBjbGllbnQucm9sZTtcclxuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gJzwvcD48cD4gPHN0cm9uZz4gUmVwcmVzZW50YXRpb24gZGF0ZTogPC9zdHJvbmc+JztcclxuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gY2xpZW50LnN0YXJ0RGF0ZURkICsgJyAvICcgKyBjbGllbnQuc3RhcnREYXRlTW0gKyAnIC8gJyArIGNsaWVudC5zdGFydERhdGVZeXl5O1xyXG4gICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSAnIHRvICc7XHJcbiAgICAgICAgaWYgKGNsaWVudC5lbmREYXRlRGQpIHtcclxuICAgICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSBjbGllbnQuZW5kRGF0ZURkICsgJyAvICcgKyBjbGllbnQuZW5kRGF0ZU1tICsgJyAvICcgKyBjbGllbnQuZW5kRGF0ZVl5eXk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSAnKG5vIGZpeGVkIGVuZCBkYXRlKTwvcD4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2xpZW50LmVucXVpcmVPbmxpbmUpIHtcclxuICAgICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSAnPHA+PHN0cm9uZz4gT25saW5lIGFjY2VzczogPC9zdHJvbmc+JztcclxuICAgICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSBjbGllbnQuZW5xdWlyZU9ubGluZSArICc8L3A+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9ICc8L2Rpdj48ZGl2IGNsYXNzPVwiZmxleC1pdGVtIGZsZXgtaXRlbS0tcmlnaHQtYWxpZ25cIj48cD48YnV0dG9uIGNsYXNzPVwidWlraXQtYnRuIHNtYWxsIHVpa2l0LWJ0bi0tdGVydGlhcnlcIiBvbmNsaWNrPVwid2luZG93LmxvY2F0aW9uLmhyZWY9XFwnL2F1dGgvcHJvZmlsZS9ub21yZXAvZm9ybS1jbGllbnQtMyc7XHJcbiAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9ICc/c3RhdGU9ZWRpdCZpZD0nICsgY2xpZW50LmlkICsgJ1xcJ1wiPic7XHJcbiAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9ICdFZGl0IFJvbGU8L2J1dHRvbj48L3A+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+J1xyXG4gICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gYWRkIGN1cnJlbnQgdXNlciB0byB0aGUgbGlzdFxyXG4gICAgY2xpZW50TGlzdEh0bWwgKz0gJzxsaT48YSBpZD1cInJldHVyblByb2ZpbGVcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApO1wiIGNsYXNzPVwic3dpdGNoLWFjY291bnQtYm94X19saW5rIHN3aXRjaC1hY2NvdW50LWJveF9fbGluay0tc2VsZlwiPic7XHJcbiAgICBjbGllbnRMaXN0SHRtbCArPSAnPGkgY2xhc3M9XCJmYXIgZmEtcmVwZWF0LWFsdFwiPjwvaT4gQmFjayB0byBteSBvd24gYWNjb3VudDwvYT48L2xpPic7XHJcblxyXG4gICAgJCgnLnB0LWN1cnJlbnQtdXNlci1jbGllbnQtbGlzdCcpLmh0bWwoY2xpZW50TGlzdEh0bWwpO1xyXG4gICAgJCgnLnB0LWNsaWVudC1saXN0LWZ1bGwnKS5odG1sKGNsaWVudExpc3RGdWxsSHRtbCk7XHJcblxyXG4gICAgLy8gaGlkZSB0aGUgcmV0dXJuIHRvIHByb2ZpbGUgYmFubmVyIFxyXG4gICAgJChcIiNyZXR1cm5Qcm9maWxlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgalF1ZXJ5KCcucHQtbWFuYWdpbmctdXNlcicpLnNsaWRlVXAoJ2Zhc3QnKTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N3aXRjaEZsb3cnLCAnbm9uZScpO1xyXG4gICAgICB3cml0ZVVzZXIoKTtcclxuICAgICAgd2luZG93LnJlbG9hZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gIH1cclxufVxyXG5cclxucmVhZENsaWVudCgpO1xyXG5cclxuZnVuY3Rpb24gcmVhZFJlcCgpIHtcclxuICBjb25zb2xlLmxvZygnUmVhZGluZyByZXAgZGF0YScpO1xyXG4gIHZhciByZXBzID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcnNSZXBzJyk7XHJcbiAgdmFyIHBhcnNlZFJlcHMgPSBKU09OLnBhcnNlKHJlcHMpO1xyXG4gIHZhciBzZXNzaW9uR3VpZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Nlc3Npb25HdWlkJyk7XHJcblxyXG4gIGlmIChwYXJzZWRSZXBzKSB7XHJcblxyXG4gICAgdmFyIHJlcExpc3RGdWxsSHRtbCA9ICcnO1xyXG4gICAgJC5lYWNoKHBhcnNlZFJlcHMsIGZ1bmN0aW9uIChpbmRleCwgcmVwKSB7XHJcblxyXG4gICAgICAvLyB3cml0ZSB0aGUgcmVwIGN1cnJlbnRseSBiZWluZyB3b3JrZWQgb25cclxuICAgICAgaWYgKHJlcC5pZCA9PT0gc2Vzc2lvbkd1aWQpIHtcclxuICAgICAgICAkLmVhY2gocmVwLCBmdW5jdGlvbiAoaW5kZXgsIHJlcCkge1xyXG4gICAgICAgICAgJCgnLnB0LWN1cnJlbnQtcmVwLScgKyBpbmRleCkuaHRtbChyZXApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocmVwLnJvbGUgIT09IFwiQ2Vhc2VcIikge1xyXG5cclxuICAgICAgICByZXAubmFtZUZ1bGwgPSByZXAubmFtZUZpcnN0ICsgJyAnICsgcmVwLm5hbWVMYXN0O1xyXG5cclxuICAgICAgICAvLyBhbGwgcmVwcyBsaXN0XHJcbiAgICAgICAgcmVwTGlzdEZ1bGxIdG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS0xMiBtYXJnaW4tYmVsb3ctLW1pZFwiPjxkaXYgY2xhc3M9XCJob3Jpem9udGFsLWNhcmQtc2VjdGlvblwiPic7XHJcbiAgICAgICAgcmVwTGlzdEZ1bGxIdG1sICs9ICc8ZGl2IGNsYXNzPVwiY2FyZCBjYXJkLS1ob3Jpem9udGFsIGZsZXgtY29udGFpbmVyXCI+PGRpdiBjbGFzcz1cImZsZXgtaXRlbSBmbGV4LWl0ZW0tLWljb24tb25seVwiPic7XHJcbiAgICAgICAgcmVwTGlzdEZ1bGxIdG1sICs9ICc8c3BhbiBjbGFzcz1cImZhbCBmYS1pY29uLW5yIGZhLXVzZXItZWRpdFwiPjwvc3Bhbj4gPC9kaXY+PGRpdiBjbGFzcz1cImZsZXgtaXRlbSBmbGV4LWl0ZW0tLWxhcmdlXCI+PHA+PHN0cm9uZz4nO1xyXG4gICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSByZXAubmFtZUZpcnN0ICsgJyAnICsgcmVwLm5hbWVMYXN0O1xyXG4gICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSAnPC9zdHJvbmc+PC9wPiAgPHA+PHN0cm9uZz4gWW91ciBjdXJyZW50IHJvbGU6IDwvc3Ryb25nPidcclxuICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gcmVwLnJvbGU7XHJcbiAgICAgICAgcmVwTGlzdEZ1bGxIdG1sICs9ICc8L3A+PHA+IDxzdHJvbmc+IFJlcHJlc2VudGF0aW9uIGRhdGU6IDwvc3Ryb25nPic7XHJcbiAgICAgICAgcmVwTGlzdEZ1bGxIdG1sICs9IHJlcC5zdGFydERhdGVEZCArICcgLyAnICsgcmVwLnN0YXJ0RGF0ZU1tICsgJyAvICcgKyByZXAuc3RhcnREYXRlWXl5eTtcclxuICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gJyB0byAnO1xyXG4gICAgICAgIGlmIChyZXAuZW5kRGF0ZURkKSB7XHJcbiAgICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gcmVwLmVuZERhdGVEZCArICcgLyAnICsgcmVwLmVuZERhdGVNbSArICcgLyAnICsgcmVwLmVuZERhdGVZeXl5O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gJyhubyBmaXhlZCBlbmQgZGF0ZSk8L3A+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlcC5lbnF1aXJlT25saW5lKSB7XHJcbiAgICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gJzxwPjxzdHJvbmc+IE9ubGluZSBhY2Nlc3M6IDwvc3Ryb25nPic7XHJcbiAgICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gcmVwLmVucXVpcmVPbmxpbmUgKyAnPC9wPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSAnPC9kaXY+PGRpdiBjbGFzcz1cImZsZXgtaXRlbSBmbGV4LWl0ZW0tLXJpZ2h0LWFsaWduXCI+PHA+PGJ1dHRvbiBjbGFzcz1cInVpa2l0LWJ0biBzbWFsbCB1aWtpdC1idG4tLXRlcnRpYXJ5XCIgb25jbGljaz1cIndpbmRvdy5sb2NhdGlvbi5ocmVmPVxcJy9hdXRoL3Byb2ZpbGUvbm9tcmVwL2Zvcm0tcmVwLTMnO1xyXG4gICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSAnP3N0YXRlPWVkaXQmaWQ9JyArIHJlcC5pZCArICdcXCdcIj4nO1xyXG4gICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSAnRWRpdCBSb2xlPC9idXR0b24+PC9wPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PidcclxuICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8vICQoJy5wdC1jdXJyZW50LXVzZXItcmVwLWxpc3QnKS5odG1sKHJlcExpc3RIdG1sKTtcclxuICAgICQoJy5wdC1yZXAtbGlzdC1mdWxsJykuaHRtbChyZXBMaXN0RnVsbEh0bWwpO1xyXG4gIH1cclxufVxyXG5cclxubGV0IGN1cnJlbnRQZXJzb24gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwZXJzb24nKSk7XHJcblxyXG5pZiAoIWN1cnJlbnRQZXJzb24uY2FyZHMgfHwgY3VycmVudFBlcnNvbi5jYXJkcy5sZW5ndGggPCAxKSB7XHJcbiAgJChcIiNoZWFsdGhjYXJkXCIpLmhpZGUoKTtcclxufSJdLCJmaWxlIjoidXNlci5qcyJ9
