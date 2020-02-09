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

  localStorage.setItem('allPersons', JSON.stringify(data.person));

  // set the default MyService user if no user has been requested 
  if (!(localStorage.getItem('person'))) {
    localStorage.setItem('person', JSON.stringify(data.person[0]));
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
    localStorage.setItem('repFlow', 'representing');
    if (user.clients) {
      sessionClientSubmitted = true;
    }
  } else if (window.allReps.length > 0) {
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
    var existingClient = false;
    var parsedClients = JSON.parse(clients);
    var sessionGuid = sessionStorage.getItem('sessionGuid');

    $.each(parsedClients, function (index, element) {

      if (element.id === sessionGuid) {

        // add new form data to an existing client
        $.extend(true, window.allClients[index], formData);
        existingClient = true;
      }
    });

    if (existingClient === false) {
      window.allClients.push(formData);
    }

  } else {
    window.allClients.push(formData);
  }

  sessionStorage.setItem('usersClients', JSON.stringify(window.allClients));
}


function writeRep(form) {

  var formData = getFormData(form);
  var reps = sessionStorage.getItem('usersReps');

  if (reps) { // reps in session data
    var existingRep = false;
    var parsedReps = JSON.parse(reps);
    var sessionGuid = sessionStorage.getItem('sessionGuid');

    $.each(parsedReps, function (index, element) {

      if (element.id === sessionGuid) {

        // add new form data to an existing client
        $.extend(true, window.allReps[index], formData);
        existingRep = true;
      }
    });

    if (existingRep === false) {
      window.allReps.push(formData);
    }

  } else {
    window.allReps.push(formData);
  }

  sessionStorage.setItem('usersReps', JSON.stringify(window.allReps));
}

function readClient() {

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1c2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHV0aWxpdHkgZnVuY3Rpb25zIFxuXG4vLyByZXR1cm5zIGFnZSBmcm9tIGRhdGUgb2YgYmlydGggc3RyaW5nIFxuZnVuY3Rpb24gZ2V0QWdlKGRhdGVTdHJpbmcpIHtcbiAgdmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgdmFyIGJpcnRoRGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHJpbmcpO1xuICB2YXIgYWdlID0gdG9kYXkuZ2V0RnVsbFllYXIoKSAtIGJpcnRoRGF0ZS5nZXRGdWxsWWVhcigpO1xuICB2YXIgbSA9IHRvZGF5LmdldE1vbnRoKCkgLSBiaXJ0aERhdGUuZ2V0TW9udGgoKTtcbiAgaWYgKG0gPCAwIHx8IChtID09PSAwICYmIHRvZGF5LmdldERhdGUoKSA8IGJpcnRoRGF0ZS5nZXREYXRlKCkpKSB7XG4gICAgYWdlLS07XG4gIH1cbiAgcmV0dXJuIGFnZTtcbn1cblxuLy8gcmV0dXJucyBzZXJpYWxpemVzIGZvcm0gZGF0YSBmcm9tIGEgZm9ybSBcbmZ1bmN0aW9uIGdldEZvcm1EYXRhKCRmb3JtKSB7XG4gIHZhciB1bmluZGV4ZWRfYXJyYXkgPSAkZm9ybS5zZXJpYWxpemVBcnJheSgpO1xuICB2YXIgaW5kZXhlZF9hcnJheSA9IHt9O1xuXG4gICQubWFwKHVuaW5kZXhlZF9hcnJheSwgZnVuY3Rpb24gKG4sIGkpIHtcbiAgICBpbmRleGVkX2FycmF5W25bJ25hbWUnXV0gPSBuWyd2YWx1ZSddO1xuICB9KTtcblxuICByZXR1cm4gaW5kZXhlZF9hcnJheTtcbn1cblxuZnVuY3Rpb24gZ3VpZEdlbmVyYXRvcigpIHtcbiAgdmFyIFM0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKSB8IDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSk7XG4gIH07XG4gIHJldHVybiAoUzQoKSArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBTNCgpICsgUzQoKSk7XG59XG5cbi8vIGVuZCB1dGlsaXR5IGZ1bmN0aW9ucyBcblxuXG4vLyBjYWxsIHVwIHRoZSBwZXJzb25hIHBhbmVsIHZpYSBrZXlib2FyZCBcbiQoZG9jdW1lbnQpLmtleXByZXNzKGZ1bmN0aW9uIChlKSB7XG5cbiAgc3dpdGNoIChlLndoaWNoKSB7XG4gICAgY2FzZSAxMjY6IC8vdGlsZGEgKyBzaGlmdFxuICAgICAgJCgnLnB0LXBlcnNvbmEtc3dpdGNoZXInKS50b2dnbGUoKTtcbiAgICAgIC8vIGFkZExpc3RlbmVycygpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgfVxufSk7XG5cbi8vIHdpbmRvdy5vbmxvYWQgPSBhZGRMaXN0ZW5lcnMoKTtcblxuLy8gZnVuY3Rpb24gYWRkTGlzdGVuZXJzKCkge1xuLy8gICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwdC1wZXJzb25hLXN3aXRjaGVyJylbMF0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2VEb3duLCBmYWxzZSk7XG4vLyAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcCwgZmFsc2UpO1xuXG4vLyB9XG5cbi8vIGZ1bmN0aW9uIG1vdXNlVXAoKSB7XG4vLyAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBkaXZNb3ZlLCB0cnVlKTtcbi8vIH1cblxuLy8gZnVuY3Rpb24gbW91c2VEb3duKGUpIHtcbi8vICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRpdk1vdmUsIHRydWUpO1xuLy8gfVxuXG4vLyBmdW5jdGlvbiBkaXZNb3ZlKGUpIHtcbi8vICAgdmFyIGRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3B0LXBlcnNvbmEtc3dpdGNoZXInKVswXTtcbi8vICAgZGl2LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbi8vICAgZGl2LnN0eWxlLnRvcCA9IGUuY2xpZW50WSArICdweCc7XG4vLyAgIGRpdi5zdHlsZS5sZWZ0ID0gZS5jbGllbnRYICsgJ3B4Jztcbi8vIH1cblxuXG4vLyBvciB2aWEgbG9nbyBsb25nIHByZXNzXG5cbi8vIC8vIGdyYWIgdGhlIGVsZW1lbnRcbi8vIHZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteXMtbG9nbycpO1xuXG4vLyAvLyBsaXN0ZW4gZm9yIHRoZSBsb25nLXByZXNzIGV2ZW50XG4vLyBlbC5hZGRFdmVudExpc3RlbmVyKCdsb25nLXByZXNzJywgZnVuY3Rpb24gKGUpIHtcbi8vICAgLy8gc3RvcCB0aGUgZXZlbnQgZnJvbSBidWJibGluZyB1cFxuLy8gICBlLnByZXZlbnREZWZhdWx0KClcbi8vICAgJCgnLnB0LXBlcnNvbmEtc3dpdGNoZXInKS50b2dnbGUoKTtcbi8vIH0pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzd2lwZWQtbGVmdCcsIGZ1bmN0aW9uIChlKSB7XG4gICQoJy5wdC1wZXJzb25hLXN3aXRjaGVyJykudG9nZ2xlKCk7XG59KTtcblxuXG5cbmZ1bmN0aW9uIGluaXROb21SZXAoKSB7XG5cbiAgdmFyIHJlcEZsb3cgPSBnZXRVcmxQYXJhbWV0ZXIoJ3JlcEZsb3cnKTtcblxuICBpZiAocmVwRmxvdykge1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlcEZsb3cnLCByZXBGbG93KTtcblxuICB9IGVsc2UgaWYgKFwicmVwRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xuXG4gIH0gZWxzZSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlcEZsb3cnLCAnbm9uZScpO1xuICB9XG5cbiAgaWYgKChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmVwRmxvdycpID09ICdib3RoJykpIHtcbiAgICBqUXVlcnkoXCIucHQtZmlyc3QtdGltZS1ub1wiKS5zaG93KCk7XG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LXJlcHJlc2VudGluZy1ub1wiKS5oaWRlKCk7XG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LXJlcHJlc2VudGVkLW5vXCIpLmhpZGUoKTtcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctbm9uZVwiKS5oaWRlKCk7XG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LXJlcHJlc2VudGluZ1wiKS5zaG93KCk7XG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LXJlcHJlc2VudGVkXCIpLnNob3coKTtcbiAgfSBlbHNlIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3JlcEZsb3cnKSA9PSAnbm9uZScpKSB7XG4gICAgalF1ZXJ5KFwiLnB0LWZpcnN0LXRpbWUtbm9cIikuc2hvdygpO1xuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1yZXByZXNlbnRpbmdcIikuaGlkZSgpO1xuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1yZXByZXNlbnRlZFwiKS5oaWRlKCk7XG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LW5vbmUtbm9cIikuaGlkZSgpO1xuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1ub25lXCIpLnNob3coKTtcbiAgfSBlbHNlIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3JlcEZsb3cnKSA9PSAncmVwcmVzZW50aW5nJykpIHtcbiAgICBqUXVlcnkoXCIucHQtZmlyc3QtdGltZS1ub1wiKS5zaG93KCk7XG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LXJlcHJlc2VudGVkXCIpLmhpZGUoKTtcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctcmVwcmVzZW50aW5nLW5vXCIpLmhpZGUoKTtcbiAgICBqUXVlcnkoXCIucHQtcmVwLWZsb3ctbm9uZVwiKS5oaWRlKCk7XG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LXJlcHJlc2VudGluZ1wiKS5zaG93KCk7XG4gIH0gZWxzZSBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZXBGbG93JykgPT0gJ3JlcHJlc2VudGVkJykpIHtcbiAgICBqUXVlcnkoXCIucHQtZmlyc3QtdGltZS1ub1wiKS5zaG93KCk7XG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LXJlcHJlc2VudGluZ1wiKS5oaWRlKCk7XG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LW5vbmVcIikuaGlkZSgpO1xuICAgIGpRdWVyeShcIi5wdC1yZXAtZmxvdy1yZXByZXNlbnRlZFwiKS5zaG93KCk7XG4gICAgalF1ZXJ5KFwiLnB0LXJlcC1mbG93LXJlcHJlc2VudGVkLW5vXCIpLmhpZGUoKTtcbiAgfSBlbHNlIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3JlcEZsb3cnKSA9PSAnbmV3YmllJykpIHtcbiAgICBqUXVlcnkoXCIucHQtZmlyc3QtdGltZS1ub1wiKS5oaWRlKCk7XG4gICAgalF1ZXJ5KFwiLnB0LWZpcnN0LXRpbWVcIikuc2hvdygpO1xuICB9XG59XG5cbmluaXROb21SZXAoKTtcblxuXG4vLyBiYW5uZXJzXG5mdW5jdGlvbiBpbml0QmFubmVycygpIHtcblxuICB2YXIgYmFubmVyRmxvdyA9IGdldFVybFBhcmFtZXRlcignYmFubmVyRmxvdycpO1xuXG4gIGlmIChiYW5uZXJGbG93KSB7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYmFubmVyRmxvdycsIGJhbm5lckZsb3cpO1xuXG4gIH0gZWxzZSBpZiAoXCJiYW5uZXJGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XG5cbiAgfSBlbHNlIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYmFubmVyRmxvdycsICdub25lJyk7XG4gIH1cblxuICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiYW5uZXJGbG93JykgPT0gJ2FsbCcpKSB7XG4gICAgalF1ZXJ5KFwiLnB0LWJhbm5lci1zZXJ2aWNlXCIpLnNob3coKTtcbiAgICBqUXVlcnkoXCIucHQtYmFubmVyLW5yLXJlcFwiKS5zaG93KCk7XG4gIH0gZWxzZSBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiYW5uZXJGbG93JykgPT0gJ25vbmUnKSkge1xuICAgIGpRdWVyeShcIi5wdC1iYW5uZXItc2VydmljZVwiKS5oaWRlKCk7XG4gICAgalF1ZXJ5KFwiLnB0LWJhbm5lci1uci1yZXBcIikuaGlkZSgpO1xuICB9IGVsc2UgaWYgKChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmFubmVyRmxvdycpID09ICdzZXJ2aWNlJykpIHtcbiAgICBqUXVlcnkoXCIucHQtYmFubmVyLXNlcnZpY2VcIikuc2hvdygpO1xuICAgIGpRdWVyeShcIi5wdC1iYW5uZXItbnItcmVwXCIpLmhpZGUoKTtcbiAgfSBlbHNlIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Jhbm5lckZsb3cnKSA9PSAnbnItcmVwJykpIHtcbiAgICBqUXVlcnkoXCIucHQtYmFubmVyLXNlcnZpY2VcIikuaGlkZSgpO1xuICAgIGpRdWVyeShcIi5wdC1iYW5uZXItbnItcmVwXCIpLnNob3coKTtcbiAgfVxufVxuXG5pbml0QmFubmVycygpO1xuXG5cbi8vIFN3aXRjaCBhY2NvdW50XG5mdW5jdGlvbiBpbml0U3dpdGNoKCkge1xuXG4gIHZhciBzd2l0Y2hGbG93ID0gZ2V0VXJsUGFyYW1ldGVyKCdzd2l0Y2hGbG93Jyk7XG4gIHZhciBzd2l0Y2hJZCA9IGdldFVybFBhcmFtZXRlcignc3dpdGNoSWQnKTtcblxuICBpZiAoc3dpdGNoRmxvdykge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzd2l0Y2hGbG93Jywgc3dpdGNoRmxvdyk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N3aXRjaElkJywgc3dpdGNoSWQpO1xuICAgIGpRdWVyeSgnLnB0LW1hbmFnaW5nLXVzZXIgJykuc2xpZGVEb3duKCdmYXN0Jyk7XG4gIH1cblxuICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzd2l0Y2hGbG93JykgPT0gJ2FjdGl2ZScpKSB7XG4gICAgalF1ZXJ5KCcucHQtbWFuYWdpbmctdXNlciAnKS5zaG93KCk7XG5cbiAgfSBlbHNlIHtcbiAgICAvLyBqUXVlcnkoJy5zd2l0Y2gtYWNjb3VudC1idXR0b24nKS5yZW1vdmVDbGFzcyhcInN3aXRjaC1hY2NvdW50LWJ1dHRvbi0tY3VycmVudFwiKTtcbiAgfVxuXG5cblxuICAvLyBoaWRlIHN3aXRjaCBhY2NvdW50IG92ZXJsYXkgd2hlbiBjbGlja2luZyBlbHNld2hlcmUgb24gdGhlIHBhZ2VcbiAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgJChcIi5zd2l0Y2gtYWNjb3VudC1ib3hcIikuYWRkQ2xhc3MoXCJzd2l0Y2gtYWNjb3VudC1ib3gtLWhpZGVcIik7XG4gIH0pO1xuXG59XG5cbmluaXRTd2l0Y2goKTtcblxuXG5cblxuLy8gdG8gZ2VuZXJhdGUgbW9yZSB1c2VycywgZ28gdG8gd3d3Lmpzb24tZ2VuZXJhdG9yLmNvbSBhbmQgcGFzdGUgaW4gdGhlIGRhdGEgZnJvbSAvZG9jcy9kYXRhL3VzZXIuZ2VuZXJhdG9yIFxuLy8gYW5kIHBhc3RlIGluIHRoZSBnZW5lcmF0ZWQgdXNlcnMgaW4gdG8gL2RvY3MvZGF0YS91c2VyLmpzb25cblxuLy8gUHVsbCBpbiB0aGUganNvbiBjb250ZW50IFxuJC5hamF4KHtcbiAgdXJsOiAnL2RvY3MvZGF0YS91c2VyLmpzb24nLFxuICBhc3luYzogZmFsc2UsXG4gIGRhdGFUeXBlOiAnanNvbidcbn0pLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcblxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsUGVyc29ucycsIEpTT04uc3RyaW5naWZ5KGRhdGEucGVyc29uKSk7XG5cbiAgLy8gc2V0IHRoZSBkZWZhdWx0IE15U2VydmljZSB1c2VyIGlmIG5vIHVzZXIgaGFzIGJlZW4gcmVxdWVzdGVkIFxuICBpZiAoIShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGVyc29uJykpKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BlcnNvbicsIEpTT04uc3RyaW5naWZ5KGRhdGEucGVyc29uWzBdKSk7XG4gIH1cblxuICAvLyBwb3B1bGF0ZSB0aGUgdXNlciBkcm9wZG93biBsaXN0IHdpdGggdXNlcnMgZnJvbSB0aGUganNvblxuICB2YXIgJHVzZXJTZWxlY3QgPSAkKCcjdXNlci1kcm9wLWRvd24nKTtcbiAgJHVzZXJTZWxlY3QuZW1wdHkoKTtcbiAgJHVzZXJTZWxlY3QuYXBwZW5kKCc8b3B0aW9uPi0tIFNlbGVjdCBhIHVzZXIgLS08L29wdGlvbj4nKTtcbiAgJC5lYWNoKGRhdGEucGVyc29uLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICR1c2VyU2VsZWN0LmFwcGVuZCgnPG9wdGlvbiB2YWx1ZT0nICsgdmFsdWUuX2lkICsgJz4nICsgdmFsdWUubmFtZUZ1bGwgKyAnPC9vcHRpb24+Jyk7XG4gIH0pO1xuXG4gIC8vIHN3aXRjaCB0aGUgdXNlciBcbiAgJHVzZXJTZWxlY3QuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZWN0ZWRJZCA9IHRoaXMudmFsdWU7XG4gICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcnNDbGllbnRzJyk7XG4gICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcnNSZXBzJyk7XG4gICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgnc2Vzc2lvbkd1aWQnKTtcblxuICAgICQuZWFjaChkYXRhLnBlcnNvbiwgZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG5cbiAgICAgIGlmIChlbGVtZW50Ll9pZCA9PT0gc2VsZWN0ZWRJZCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGVyc29uJywgSlNPTi5zdHJpbmdpZnkoZGF0YS5wZXJzb25baW5kZXhdKSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzd2l0Y2hJZCcsICdub25lJyk7XG4gICAgICAgIGpRdWVyeSgnLnB0LW1hbmFnaW5nLXVzZXInKS5zbGlkZVVwKCdmYXN0Jyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzd2l0Y2hGbG93JywgJ25vbmUnKTtcbiAgICAgICAgd3JpdGVVc2VyKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICB3cml0ZVVzZXIoKTtcbn0pO1xuXG5cbi8vIHB1dCB0aGUgdXNlciBmcm9tIHVzZXIuanMgaW4gdG8gbG9jYWwgc3RvcmFnZSBhbmQgdGhlIHVzZXJzIGNsaWVudHMgaW4gdG8gc2Vzc2lvbiBzdG9yYWdlIFxuZnVuY3Rpb24gd3JpdGVVc2VyKCkge1xuXG4gIGNvbnN0IHVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwZXJzb24nKSk7XG4gIGNvbnN0IHNlc3Npb25DbGllbnRzID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2Vyc0NsaWVudHMnKSk7XG4gIGNvbnN0IHNlc3Npb25SZXBzID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2Vyc1JlcHMnKSk7XG5cbiAgd2luZG93LmFsbENsaWVudHMgPSBbXTtcbiAgd2luZG93LmFsbFJlcHMgPSBbXTtcblxuICBpZiAoc2Vzc2lvbkNsaWVudHMpIHtcblxuICAgICQuZWFjaChzZXNzaW9uQ2xpZW50cywgZnVuY3Rpb24gKGluZGV4LCBjbGllbnQpIHtcbiAgICAgIC8vIGFkZCBuZXcgZm9ybSBkYXRhIHRvIGFuIGV4aXN0aW5nIGNsaWVudFxuICAgICAgd2luZG93LmFsbENsaWVudHMucHVzaChjbGllbnQpO1xuICAgIH0pO1xuXG4gIH0gZWxzZSB7IC8vIG5vIGNsaWVudCBkYXRhIGluIHNlc3Npb24gc28gZ2V0IGl0IGZyb20gdGhlIHVzZXIgXG4gICAgJC5lYWNoKHVzZXIuY2xpZW50cywgZnVuY3Rpb24gKGluZGV4LCBjbGllbnQpIHtcblxuICAgICAgd2luZG93LmFsbENsaWVudHMucHVzaChjbGllbnQpO1xuXG4gICAgfSk7XG4gIH1cblxuICBpZiAoc2Vzc2lvblJlcHMpIHtcblxuICAgICQuZWFjaChzZXNzaW9uUmVwcywgZnVuY3Rpb24gKGluZGV4LCByZXApIHtcbiAgICAgIC8vIGFkZCBuZXcgZm9ybSBkYXRhIHRvIGFuIGV4aXN0aW5nIHJlcFxuICAgICAgd2luZG93LmFsbFJlcHMucHVzaChyZXApO1xuICAgIH0pO1xuXG4gIH0gZWxzZSB7IC8vIG5vIHJlcCBkYXRhIGluIHNlc3Npb24gc28gZ2V0IGl0IGZyb20gdGhlIHVzZXIgXG4gICAgJC5lYWNoKHVzZXIucmVwcywgZnVuY3Rpb24gKGluZGV4LCByZXApIHtcblxuICAgICAgd2luZG93LmFsbFJlcHMucHVzaChyZXApO1xuXG4gICAgfSk7XG4gIH1cblxuXG4gIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3VzZXJzQ2xpZW50cycsIEpTT04uc3RyaW5naWZ5KHdpbmRvdy5hbGxDbGllbnRzKSk7XG4gIC8vIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3VzZXJzTXVsdGlwbGVDbGllbnRzJywgSlNPTi5zdHJpbmdpZnkod2luZG93LmFsbENsaWVudHMpKTtcblxuICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1c2Vyc1JlcHMnLCBKU09OLnN0cmluZ2lmeSh3aW5kb3cuYWxsUmVwcykpO1xuXG4gIHZhciBmaXJzdFRpbWVVc2VyID0gdHJ1ZTtcbiAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Nlc3Npb25HdWlkJykpIHtcbiAgICBmaXJzdFRpbWVVc2VyID0gZmFsc2U7XG4gIH1cblxuICAvLyBjb3VudCBudW1iZXIgb2YgY2xpZW50cyBcbiAgdmFyIHNlc3Npb25DbGllbnRTdWJtaXR0ZWQgPSBmYWxzZTtcbiAgdmFyIHNlc3Npb25SZXBTdWJtaXR0ZWQgPSBmYWxzZTtcblxuXG5cbiAgaWYgKCh3aW5kb3cuYWxsQ2xpZW50cy5sZW5ndGggPiAwKSAmJiAod2luZG93LmFsbFJlcHMubGVuZ3RoID4gMCkpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnIGJvdGgnKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVwRmxvdycsICdib3RoJyk7XG4gICAgJCgnLnB0LXN3aXRjaC1hY2NvdW50Jykuc2hvdygpO1xuXG4gICAgaWYgKHVzZXIuY2xpZW50cykge1xuICAgICAgc2Vzc2lvbkNsaWVudFN1Ym1pdHRlZCA9IHRydWU7XG4gICAgfVxuXG4gIH0gZWxzZSBpZiAod2luZG93LmFsbENsaWVudHMubGVuZ3RoID4gMCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXBGbG93JywgJ3JlcHJlc2VudGluZycpO1xuICAgIGlmICh1c2VyLmNsaWVudHMpIHtcbiAgICAgIHNlc3Npb25DbGllbnRTdWJtaXR0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSBlbHNlIGlmICh3aW5kb3cuYWxsUmVwcy5sZW5ndGggPiAwKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlcEZsb3cnLCAncmVwcmVzZW50ZWQnKTtcbiAgICBpZiAodXNlci5yZXBzKSB7XG4gICAgICBzZXNzaW9uUmVwU3VibWl0dGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBpZiAoc2Vzc2lvblJlcHMpIHtcbiAgLy8gICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVwRmxvdycsICdyZXByZXNlbnRpbmcnKTtcbiAgLy8gICBpZiAoc2Vzc2lvblJlcHMucmVwWzBdLnN1Ym1pdHRlZEFwcGxpY2F0aW9uID09IFwidHJ1ZVwiKSB7XG4gIC8vICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVwRmxvdycsICdyZXByZXNlbnRpbmcnKTtcbiAgLy8gICAgIHZhciBzZXNzaW9uUmVwU3VibWl0dGVkID0gdHJ1ZTtcbiAgLy8gICAgIHVzZXIucmVwcy5wdXNoKHNlc3Npb25SZXBzLnJlcFswXSk7XG4gIC8vICAgfVxuXG4gIC8vICAgaWYgKHNlc3Npb25SZXBzLnJlcFswXS5yb2xlID09IFwiQ2Vhc2VcIikge1xuICAvLyAgICAgdXNlci5udW1iZXJPZlJlcHMgPSAwXG4gIC8vICAgICB1c2VyLnJlcHMubGVuZ3RoID0gMDtcbiAgLy8gICAgIHNlc3Npb25SZXBTdWJtaXR0ZWQgPSBmYWxzZTtcbiAgLy8gICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXBGbG93JywgJ25vbmUnKTtcbiAgLy8gICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJzUmVwcycpO1xuICAvLyAgICAgaWYgKCF3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuICAvLyAgICAgICB3aW5kb3cubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24gKyAnI3JlcC1saXN0JztcbiAgLy8gICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAvLyAgICAgfVxuICAvLyAgIH1cblxuICAvLyB9XG5cblxuICAvLyBzZXRcbiAgaWYgKCh1c2VyLmNsaWVudHMubGVuZ3RoID4gMCkgfHwgKHNlc3Npb25DbGllbnRTdWJtaXR0ZWQgPT09IHRydWUpKSB7XG5cbiAgICBpZiAodXNlci5jbGllbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHVzZXIubnVtYmVyT2ZDbGllbnRzID0gdXNlci5jbGllbnRzLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXNlci5udW1iZXJPZkNsaWVudHMgPSB3aW5kb3cuYWxsQ2xpZW50cy5sZW5ndGg7XG4gICAgfVxuXG4gIH0gZWxzZSBpZiAodXNlci5jbGllbnRzLmxlbmd0aCA8IDEpIHtcbiAgICB1c2VyLm51bWJlck9mQ2xpZW50cyA9IDA7XG4gIH1cblxuICBpZiAoKHVzZXIucmVwcy5sZW5ndGggPiAwKSB8fCAoc2Vzc2lvblJlcFN1Ym1pdHRlZCA9PT0gdHJ1ZSkpIHtcblxuICAgIGlmICh1c2VyLnJlcHMubGVuZ3RoID4gMCkge1xuICAgICAgdXNlci5udW1iZXJPZlJlcHMgPSB1c2VyLnJlcHMubGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICB1c2VyLm51bWJlck9mUmVwcyA9IHdpbmRvdy5hbGxSZXBzLmxlbmd0aDtcbiAgICB9XG4gIH0gZWxzZSBpZiAodXNlci5yZXBzLmxlbmd0aCA8IDEpIHtcbiAgICB1c2VyLm51bWJlck9mUmVwcyA9IDA7XG4gICAgLy8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlcEZsb3cnLCAnbmV3YmllJyk7XG4gIH1cblxuICBpZiAodXNlci5jbGFpbXMpIHtcbiAgICB1c2VyLm51bWJlck9mQ2xhaW1zID0gdXNlci5jbGFpbXMubGVuZ3RoO1xuICB9IGVsc2Uge1xuICAgIHVzZXIubnVtYmVyT2ZDbGFpbXMgPSAwO1xuICB9XG5cblxuICAvLyBzaG93IGhpZGUgdGhlIHN3aXRjaCBhY2NvdW50IGJ1dHRvbnNcblxuICAvLyBjb25zb2xlLmxvZygnc2Vzc2lvbkNsaWVudFN1Ym1pdHRlZCAtPiAnICsgc2Vzc2lvbkNsaWVudFN1Ym1pdHRlZCk7XG4gIC8vIGNvbnNvbGUubG9nKCd3aW5kb3cuYWxsQ2xpZW50cy5sZW5ndGggLT4gJyArIHdpbmRvdy5hbGxDbGllbnRzLmxlbmd0aCk7XG4gIGlmICgoc2Vzc2lvblJlcFN1Ym1pdHRlZCA9PT0gdHJ1ZSkgJiYgKHNlc3Npb25DbGllbnRTdWJtaXR0ZWQgPT09IHRydWUpKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlcEZsb3cnLCAnYm90aCcpO1xuICAgICQoJy5wdC1zd2l0Y2gtYWNjb3VudCcpLnNob3coKTtcbiAgICBmaXJzdFRpbWVVc2VyID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoKHNlc3Npb25SZXBTdWJtaXR0ZWQgPT09IHRydWUpIHx8ICh1c2VyLm51bWJlck9mUmVwcyA+IDApKSB7XG4gICAgLy8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlcEZsb3cnLCAncmVwcmVzZW50ZWQnKTtcbiAgICBmaXJzdFRpbWVVc2VyID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoKHNlc3Npb25DbGllbnRTdWJtaXR0ZWQgPT09IHRydWUpIHx8ICh3aW5kb3cuYWxsQ2xpZW50cy5sZW5ndGggPiAwKSkge1xuICAgIC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXBGbG93JywgJ3JlcHJlc2VudGluZycpO1xuICAgICQoJy5wdC1zd2l0Y2gtYWNjb3VudCcpLnNob3coKTtcbiAgICBmaXJzdFRpbWVVc2VyID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgJCgnLnB0LXN3aXRjaC1hY2NvdW50JykuaGlkZSgpO1xuICAgIC8vIGFsZXJ0KCdoaWRpbmcnKTtcbiAgfVxuXG4gIGlmIChmaXJzdFRpbWVVc2VyKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlcEZsb3cnLCAnbmV3YmllJyk7XG4gIH1cblxuICB2YXIgcHJhY3RpdGlvbmVycyA9IFwiXCI7XG5cbiAgJC5hamF4KHtcbiAgICB1cmw6ICcvZG9jcy9kYXRhL21lZGljYWwtcHJhY3RpdGlvbmVyLmpzb24nLFxuICAgIHR5cGU6ICdHRVQnLFxuICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgYXN5bmM6IGZhbHNlXG4gIH0pXG4gIC5kb25lKChkYXRhKSA9PiB7XG4gICAgcHJhY3RpdGlvbmVycyA9IGA8dWw+YDtcbiAgICAkLmVhY2goZGF0YS5wcmFjdGl0aW9uZXJzLCAoaW5kZXgsIHByYWN0KSA9PiB7XG4gICAgICBpZiAodXNlci5wcmFjdGl0aW9uZXJzLmluY2x1ZGVzKHByYWN0Ll9pZCkpIHtcbiAgICAgICAgcHJhY3RpdGlvbmVycyArPSBgPGxpPiR7cHJhY3QubmFtZUZ1bGx9PC9saT5gO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHByYWN0aXRpb25lcnMgKz0gYDwvdWw+YDtcbiAgfSk7XG5cblxuICB2YXIgdXNlckh0bWwgPSAnJztcbiAgdmFyIHN0YXJ0ID0gJzxkaXYgY2xhc3M9XCJwdC1mbGV4LWdyaWRcIj48ZGl2IGNsYXNzPVwicHQtY29sXCI+JztcbiAgdmFyIGVuZCA9ICc8L2Rpdj48L2Rpdj4nXG4gIHVzZXJIdG1sICs9IHN0YXJ0ICsgJ05hbWUgPC9kaXY+PGRpdiBjbGFzcz1cInB0LWNvbFwiPicgKyB1c2VyLm5hbWVGdWxsICsgZW5kO1xuICB1c2VySHRtbCArPSBzdGFydCArICdBZ2UgPC9kaXY+PGRpdiBjbGFzcz1cInB0LWNvbFwiPicgKyBnZXRBZ2UodXNlci5kb2IpICsgZW5kO1xuICB1c2VySHRtbCArPSBzdGFydCArICdJcyBhIHZldGVyYW4gPC9kaXY+PGRpdiBjbGFzcz1cInB0LWNvbFwiPicgKyB1c2VyLnZldGVyYW4gKyBlbmQ7XG4gIHVzZXJIdG1sICs9IHN0YXJ0ICsgJ1ByYWN0aXRpb25lcnMgPC9kaXY+PGRpdiBjbGFzcz1cInB0LWNvbFwiPicgKyBwcmFjdGl0aW9uZXJzICsgZW5kO1xuICB1c2VySHRtbCArPSBzdGFydCArICdDdXJyZW50bHkgU2VydmluZyA8L2Rpdj48ZGl2IGNsYXNzPVwicHQtY29sXCI+JyArIHVzZXIuaXNDdXJyZW50bHlTZXJ2aW5nICsgZW5kO1xuICB1c2VySHRtbCArPSBzdGFydCArICdDbGllbnRzIDwvZGl2PjxkaXYgY2xhc3M9XCJwdC1jb2xcIj4nICsgdXNlci5udW1iZXJPZkNsaWVudHMgKyBlbmQ7XG4gIHVzZXJIdG1sICs9IHN0YXJ0ICsgJ1JlcHMgPC9kaXY+PGRpdiBjbGFzcz1cInB0LWNvbFwiPicgKyB1c2VyLm51bWJlck9mUmVwcyArIGVuZDtcbiAgdXNlckh0bWwgKz0gc3RhcnQgKyAnTGFzdCBwYXltZW50IDwvZGl2PjxkaXYgY2xhc3M9XCJwdC1jb2xcIj4nICsgdXNlci5sYXN0UGF5bWVudCArIGVuZDtcbiAgdXNlckh0bWwgKz0gc3RhcnQgKyAnQ2xhaW1zIDwvZGl2PjxkaXYgY2xhc3M9XCJwdC1jb2xcIj4nICsgdXNlci5udW1iZXJPZkNsYWltcyArIGVuZDtcbiAgdXNlckh0bWwgKz0gc3RhcnQgKyAnU3RvcnkgPC9kaXY+PGRpdiBjbGFzcz1cInB0LWNvbFwiPicgKyB1c2VyLnN0b3J5ICsgZW5kO1xuXG4gIHVzZXIucGljdHVyZSA9ICc8aW1nIGNsYXNzPVwicHQtaW1hZ2UtY2lyY2xlXCIgc3JjPVwiJyArIHVzZXIucGljdHVyZSArICdcIj4nO1xuXG5cbiAgJCgnI3VzZXJDb250YWluZXJJZCcpLmh0bWwodXNlckh0bWwpO1xuICAkKCcucHQtY3VycmVudC11c2VyLW5hbWUtcGljdHVyZScpLmh0bWwodXNlci5waWN0dXJlKTtcbiAgJCgnLnB0LWN1cnJlbnQtdXNlci1uYW1lLWZpcnN0JykuaHRtbCh1c2VyLm5hbWUuZmlyc3QpO1xuICAkKCcucHQtY3VycmVudC11c2VyLW5hbWUtZnVsbCcpLmh0bWwodXNlci5uYW1lRnVsbCk7XG4gICQoJy5wdC1jdXJyZW50LXVzZXItbGFzdC1wYXltZW50JykuaHRtbCh1c2VyLmxhc3RQYXltZW50KTtcbiAgJCgnLnB0LWN1cnJlbnQtdXNlci1udW1iZXItb2YtY2xhaW1zJykuaHRtbCh1c2VyLm51bWJlck9mQ2xhaW1zKTtcblxuXG59XG5cblxuXG5cbmZ1bmN0aW9uIHdyaXRlQ2xpZW50KGZvcm0pIHtcblxuICB2YXIgZm9ybURhdGEgPSBnZXRGb3JtRGF0YShmb3JtKTtcbiAgdmFyIGNsaWVudHMgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2Vyc0NsaWVudHMnKTtcblxuICBpZiAoY2xpZW50cykgeyAvLyBjbGllbnRzIGluIHNlc3Npb24gZGF0YVxuICAgIHZhciBleGlzdGluZ0NsaWVudCA9IGZhbHNlO1xuICAgIHZhciBwYXJzZWRDbGllbnRzID0gSlNPTi5wYXJzZShjbGllbnRzKTtcbiAgICB2YXIgc2Vzc2lvbkd1aWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uR3VpZCcpO1xuXG4gICAgJC5lYWNoKHBhcnNlZENsaWVudHMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuXG4gICAgICBpZiAoZWxlbWVudC5pZCA9PT0gc2Vzc2lvbkd1aWQpIHtcblxuICAgICAgICAvLyBhZGQgbmV3IGZvcm0gZGF0YSB0byBhbiBleGlzdGluZyBjbGllbnRcbiAgICAgICAgJC5leHRlbmQodHJ1ZSwgd2luZG93LmFsbENsaWVudHNbaW5kZXhdLCBmb3JtRGF0YSk7XG4gICAgICAgIGV4aXN0aW5nQ2xpZW50ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChleGlzdGluZ0NsaWVudCA9PT0gZmFsc2UpIHtcbiAgICAgIHdpbmRvdy5hbGxDbGllbnRzLnB1c2goZm9ybURhdGEpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHdpbmRvdy5hbGxDbGllbnRzLnB1c2goZm9ybURhdGEpO1xuICB9XG5cbiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgndXNlcnNDbGllbnRzJywgSlNPTi5zdHJpbmdpZnkod2luZG93LmFsbENsaWVudHMpKTtcbn1cblxuXG5mdW5jdGlvbiB3cml0ZVJlcChmb3JtKSB7XG5cbiAgdmFyIGZvcm1EYXRhID0gZ2V0Rm9ybURhdGEoZm9ybSk7XG4gIHZhciByZXBzID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcnNSZXBzJyk7XG5cbiAgaWYgKHJlcHMpIHsgLy8gcmVwcyBpbiBzZXNzaW9uIGRhdGFcbiAgICB2YXIgZXhpc3RpbmdSZXAgPSBmYWxzZTtcbiAgICB2YXIgcGFyc2VkUmVwcyA9IEpTT04ucGFyc2UocmVwcyk7XG4gICAgdmFyIHNlc3Npb25HdWlkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnc2Vzc2lvbkd1aWQnKTtcblxuICAgICQuZWFjaChwYXJzZWRSZXBzLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcblxuICAgICAgaWYgKGVsZW1lbnQuaWQgPT09IHNlc3Npb25HdWlkKSB7XG5cbiAgICAgICAgLy8gYWRkIG5ldyBmb3JtIGRhdGEgdG8gYW4gZXhpc3RpbmcgY2xpZW50XG4gICAgICAgICQuZXh0ZW5kKHRydWUsIHdpbmRvdy5hbGxSZXBzW2luZGV4XSwgZm9ybURhdGEpO1xuICAgICAgICBleGlzdGluZ1JlcCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoZXhpc3RpbmdSZXAgPT09IGZhbHNlKSB7XG4gICAgICB3aW5kb3cuYWxsUmVwcy5wdXNoKGZvcm1EYXRhKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB3aW5kb3cuYWxsUmVwcy5wdXNoKGZvcm1EYXRhKTtcbiAgfVxuXG4gIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3VzZXJzUmVwcycsIEpTT04uc3RyaW5naWZ5KHdpbmRvdy5hbGxSZXBzKSk7XG59XG5cbmZ1bmN0aW9uIHJlYWRDbGllbnQoKSB7XG5cbiAgdmFyIHVybElkID0gZ2V0VXJsUGFyYW1ldGVyKCdpZCcpO1xuXG4gIGlmICh1cmxJZCkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3Nlc3Npb25HdWlkJywgdXJsSWQpO1xuICB9XG5cbiAgdmFyIGNsaWVudHMgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2Vyc0NsaWVudHMnKTtcbiAgdmFyIHBhcnNlZENsaWVudHMgPSBKU09OLnBhcnNlKGNsaWVudHMpO1xuICB2YXIgdXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwZXJzb24nKTtcbiAgdmFyIHBhcnNlZFVzZXIgPSBKU09OLnBhcnNlKHVzZXIpO1xuICB2YXIgc2Vzc2lvbkd1aWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uR3VpZCcpO1xuXG4gIGlmIChwYXJzZWRDbGllbnRzKSB7XG4gICAgdmFyIGNsaWVudExpc3RIdG1sID0gJyc7XG4gICAgdmFyIGNsaWVudExpc3RGdWxsSHRtbCA9ICcnO1xuICAgIHZhciBzd2l0Y2hJZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzd2l0Y2hJZCcpO1xuXG4gICAgJC5lYWNoKHBhcnNlZENsaWVudHMsIGZ1bmN0aW9uIChpbmRleCwgY2xpZW50KSB7XG5cbiAgICAgIC8vIHdyaXRlIHRoZSBjbGllbnQgY3VycmVudGx5IGJlaW5nIHdvcmtlZCBvblxuICAgICAgaWYgKGNsaWVudC5pZCA9PT0gc2Vzc2lvbkd1aWQpIHtcbiAgICAgICAgJC5lYWNoKGNsaWVudCwgZnVuY3Rpb24gKGluZGV4LCBjbGllbnQpIHtcbiAgICAgICAgICAkKCcucHQtY3VycmVudC1jbGllbnQtJyArIGluZGV4KS5odG1sKGNsaWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2xpZW50LmlkID09IHN3aXRjaElkKSB7XG4gICAgICAgIHRoaXMubmFtZUZ1bGwgPSB0aGlzLm5hbWVGaXJzdCArICcgJyArIHRoaXMubmFtZUxhc3Q7XG4gICAgICAgICQoJy5wdC1jdXJyZW50LXVzZXItbmFtZS1maXJzdCcpLmh0bWwodGhpcy5uYW1lRmlyc3QpO1xuICAgICAgICAkKCcucHQtY3VycmVudC11c2VyLW5hbWUtZnVsbCcpLmh0bWwodGhpcy5uYW1lRnVsbCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjbGllbnQucm9sZSAhPT0gXCJDZWFzZVwiKSB7XG5cbiAgICAgICAgY2xpZW50Lm5hbWVGdWxsID0gY2xpZW50Lm5hbWVGaXJzdCArICcgJyArIGNsaWVudC5uYW1lTGFzdDtcblxuICAgICAgICAvLyBzd2l0Y2ggbGlzdFxuICAgICAgICBjbGllbnRMaXN0SHRtbCArPSAnPGxpPjxhIGhyZWY9XCIvYXV0aD9zd2l0Y2hGbG93PWFjdGl2ZSZzd2l0Y2hJZD0nICsgY2xpZW50LmlkICsgJ1wiIGNsYXNzPVwic3dpdGNoLWFjY291bnQtYm94X19saW5rXCI+PHN0cm9uZz4nO1xuICAgICAgICBjbGllbnRMaXN0SHRtbCArPSBjbGllbnQubmFtZUZpcnN0ICsgJyAnICsgY2xpZW50Lm5hbWVMYXN0ICsgJzwvc3Ryb25nPic7XG4gICAgICAgIGNsaWVudExpc3RIdG1sICs9ICcgKCcgKyBjbGllbnQucm9sZSArICcpPC9hPjwvbGk+JztcblxuICAgICAgICAvLyBhbGwgY2xpZW50cyBsaXN0XG4gICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tMTIgbWFyZ2luLWJlbG93LS1taWRcIj48ZGl2IGNsYXNzPVwiaG9yaXpvbnRhbC1jYXJkLXNlY3Rpb25cIj4nO1xuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gJzxkaXYgY2xhc3M9XCJjYXJkIGNhcmQtLWhvcml6b250YWwgZmxleC1jb250YWluZXJcIj48ZGl2IGNsYXNzPVwiZmxleC1pdGVtIGZsZXgtaXRlbS0taWNvbi1vbmx5XCI+JztcbiAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9ICc8c3BhbiBjbGFzcz1cImZhbCBmYS1pY29uLW5yIGZhLXVzZXItZWRpdFwiPjwvc3Bhbj4gPC9kaXY+PGRpdiBjbGFzcz1cImZsZXgtaXRlbSBmbGV4LWl0ZW0tLWxhcmdlXCI+PHA+PHN0cm9uZz4nO1xuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gY2xpZW50Lm5hbWVGaXJzdCArICcgJyArIGNsaWVudC5uYW1lTGFzdDtcbiAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9ICc8L3N0cm9uZz48L3A+ICA8cD48c3Ryb25nPiBZb3VyIGN1cnJlbnQgcm9sZTogPC9zdHJvbmc+J1xuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gY2xpZW50LnJvbGU7XG4gICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSAnPC9wPjxwPiA8c3Ryb25nPiBSZXByZXNlbnRhdGlvbiBkYXRlOiA8L3N0cm9uZz4nO1xuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gY2xpZW50LnN0YXJ0RGF0ZURkICsgJyAvICcgKyBjbGllbnQuc3RhcnREYXRlTW0gKyAnIC8gJyArIGNsaWVudC5zdGFydERhdGVZeXl5O1xuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gJyB0byAnO1xuICAgICAgICBpZiAoY2xpZW50LmVuZERhdGVEZCkge1xuICAgICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSBjbGllbnQuZW5kRGF0ZURkICsgJyAvICcgKyBjbGllbnQuZW5kRGF0ZU1tICsgJyAvICcgKyBjbGllbnQuZW5kRGF0ZVl5eXk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9ICcobm8gZml4ZWQgZW5kIGRhdGUpPC9wPic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNsaWVudC5lbnF1aXJlT25saW5lKSB7XG4gICAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9ICc8cD48c3Ryb25nPiBPbmxpbmUgYWNjZXNzOiA8L3N0cm9uZz4nO1xuICAgICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSBjbGllbnQuZW5xdWlyZU9ubGluZSArICc8L3A+JztcbiAgICAgICAgfVxuICAgICAgICBjbGllbnRMaXN0RnVsbEh0bWwgKz0gJzwvZGl2PjxkaXYgY2xhc3M9XCJmbGV4LWl0ZW0gZmxleC1pdGVtLS1yaWdodC1hbGlnblwiPjxwPjxidXR0b24gY2xhc3M9XCJ1aWtpdC1idG4gc21hbGwgdWlraXQtYnRuLS10ZXJ0aWFyeVwiIG9uY2xpY2s9XCJ3aW5kb3cubG9jYXRpb24uaHJlZj1cXCcvYXV0aC9wcm9maWxlL25vbXJlcC9mb3JtLWNsaWVudC0zJztcbiAgICAgICAgY2xpZW50TGlzdEZ1bGxIdG1sICs9ICc/c3RhdGU9ZWRpdCZpZD0nICsgY2xpZW50LmlkICsgJ1xcJ1wiPic7XG4gICAgICAgIGNsaWVudExpc3RGdWxsSHRtbCArPSAnRWRpdCBSb2xlPC9idXR0b24+PC9wPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PidcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgLy8gYWRkIGN1cnJlbnQgdXNlciB0byB0aGUgbGlzdFxuICAgIGNsaWVudExpc3RIdG1sICs9ICc8bGk+PGEgaWQ9XCJyZXR1cm5Qcm9maWxlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKTtcIiBjbGFzcz1cInN3aXRjaC1hY2NvdW50LWJveF9fbGluayBzd2l0Y2gtYWNjb3VudC1ib3hfX2xpbmstLXNlbGZcIj4nO1xuICAgIGNsaWVudExpc3RIdG1sICs9ICc8aSBjbGFzcz1cImZhciBmYS1yZXBlYXQtYWx0XCI+PC9pPiBCYWNrIHRvIG15IG93biBhY2NvdW50PC9hPjwvbGk+JztcblxuICAgICQoJy5wdC1jdXJyZW50LXVzZXItY2xpZW50LWxpc3QnKS5odG1sKGNsaWVudExpc3RIdG1sKTtcbiAgICAkKCcucHQtY2xpZW50LWxpc3QtZnVsbCcpLmh0bWwoY2xpZW50TGlzdEZ1bGxIdG1sKTtcblxuICAgIC8vIGhpZGUgdGhlIHJldHVybiB0byBwcm9maWxlIGJhbm5lciBcbiAgICAkKFwiI3JldHVyblByb2ZpbGVcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgalF1ZXJ5KCcucHQtbWFuYWdpbmctdXNlcicpLnNsaWRlVXAoJ2Zhc3QnKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzd2l0Y2hGbG93JywgJ25vbmUnKTtcbiAgICAgIHdyaXRlVXNlcigpO1xuICAgICAgd2luZG93LnJlbG9hZCgpO1xuICAgIH0pO1xuXG4gIH1cbn1cblxucmVhZENsaWVudCgpO1xuXG5mdW5jdGlvbiByZWFkUmVwKCkge1xuICB2YXIgcmVwcyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VzZXJzUmVwcycpO1xuICB2YXIgcGFyc2VkUmVwcyA9IEpTT04ucGFyc2UocmVwcyk7XG4gIHZhciBzZXNzaW9uR3VpZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Nlc3Npb25HdWlkJyk7XG5cbiAgaWYgKHBhcnNlZFJlcHMpIHtcblxuICAgIHZhciByZXBMaXN0RnVsbEh0bWwgPSAnJztcbiAgICAkLmVhY2gocGFyc2VkUmVwcywgZnVuY3Rpb24gKGluZGV4LCByZXApIHtcblxuICAgICAgLy8gd3JpdGUgdGhlIHJlcCBjdXJyZW50bHkgYmVpbmcgd29ya2VkIG9uXG4gICAgICBpZiAocmVwLmlkID09PSBzZXNzaW9uR3VpZCkge1xuICAgICAgICAkLmVhY2gocmVwLCBmdW5jdGlvbiAoaW5kZXgsIHJlcCkge1xuICAgICAgICAgICQoJy5wdC1jdXJyZW50LXJlcC0nICsgaW5kZXgpLmh0bWwocmVwKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXAucm9sZSAhPT0gXCJDZWFzZVwiKSB7XG5cbiAgICAgICAgcmVwLm5hbWVGdWxsID0gcmVwLm5hbWVGaXJzdCArICcgJyArIHJlcC5uYW1lTGFzdDtcblxuICAgICAgICAvLyBhbGwgcmVwcyBsaXN0XG4gICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tMTIgbWFyZ2luLWJlbG93LS1taWRcIj48ZGl2IGNsYXNzPVwiaG9yaXpvbnRhbC1jYXJkLXNlY3Rpb25cIj4nO1xuICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gJzxkaXYgY2xhc3M9XCJjYXJkIGNhcmQtLWhvcml6b250YWwgZmxleC1jb250YWluZXJcIj48ZGl2IGNsYXNzPVwiZmxleC1pdGVtIGZsZXgtaXRlbS0taWNvbi1vbmx5XCI+JztcbiAgICAgICAgcmVwTGlzdEZ1bGxIdG1sICs9ICc8c3BhbiBjbGFzcz1cImZhbCBmYS1pY29uLW5yIGZhLXVzZXItZWRpdFwiPjwvc3Bhbj4gPC9kaXY+PGRpdiBjbGFzcz1cImZsZXgtaXRlbSBmbGV4LWl0ZW0tLWxhcmdlXCI+PHA+PHN0cm9uZz4nO1xuICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gcmVwLm5hbWVGaXJzdCArICcgJyArIHJlcC5uYW1lTGFzdDtcbiAgICAgICAgcmVwTGlzdEZ1bGxIdG1sICs9ICc8L3N0cm9uZz48L3A+ICA8cD48c3Ryb25nPiBZb3VyIGN1cnJlbnQgcm9sZTogPC9zdHJvbmc+J1xuICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gcmVwLnJvbGU7XG4gICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSAnPC9wPjxwPiA8c3Ryb25nPiBSZXByZXNlbnRhdGlvbiBkYXRlOiA8L3N0cm9uZz4nO1xuICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gcmVwLnN0YXJ0RGF0ZURkICsgJyAvICcgKyByZXAuc3RhcnREYXRlTW0gKyAnIC8gJyArIHJlcC5zdGFydERhdGVZeXl5O1xuICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gJyB0byAnO1xuICAgICAgICBpZiAocmVwLmVuZERhdGVEZCkge1xuICAgICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSByZXAuZW5kRGF0ZURkICsgJyAvICcgKyByZXAuZW5kRGF0ZU1tICsgJyAvICcgKyByZXAuZW5kRGF0ZVl5eXk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVwTGlzdEZ1bGxIdG1sICs9ICcobm8gZml4ZWQgZW5kIGRhdGUpPC9wPic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcC5lbnF1aXJlT25saW5lKSB7XG4gICAgICAgICAgcmVwTGlzdEZ1bGxIdG1sICs9ICc8cD48c3Ryb25nPiBPbmxpbmUgYWNjZXNzOiA8L3N0cm9uZz4nO1xuICAgICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSByZXAuZW5xdWlyZU9ubGluZSArICc8L3A+JztcbiAgICAgICAgfVxuICAgICAgICByZXBMaXN0RnVsbEh0bWwgKz0gJzwvZGl2PjxkaXYgY2xhc3M9XCJmbGV4LWl0ZW0gZmxleC1pdGVtLS1yaWdodC1hbGlnblwiPjxwPjxidXR0b24gY2xhc3M9XCJ1aWtpdC1idG4gc21hbGwgdWlraXQtYnRuLS10ZXJ0aWFyeVwiIG9uY2xpY2s9XCJ3aW5kb3cubG9jYXRpb24uaHJlZj1cXCcvYXV0aC9wcm9maWxlL25vbXJlcC9mb3JtLXJlcC0zJztcbiAgICAgICAgcmVwTGlzdEZ1bGxIdG1sICs9ICc/c3RhdGU9ZWRpdCZpZD0nICsgcmVwLmlkICsgJ1xcJ1wiPic7XG4gICAgICAgIHJlcExpc3RGdWxsSHRtbCArPSAnRWRpdCBSb2xlPC9idXR0b24+PC9wPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PidcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgLy8gJCgnLnB0LWN1cnJlbnQtdXNlci1yZXAtbGlzdCcpLmh0bWwocmVwTGlzdEh0bWwpO1xuICAgICQoJy5wdC1yZXAtbGlzdC1mdWxsJykuaHRtbChyZXBMaXN0RnVsbEh0bWwpO1xuICB9XG59XG5cbmxldCBjdXJyZW50UGVyc29uID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGVyc29uJykpO1xuXG5pZiAoIWN1cnJlbnRQZXJzb24uY2FyZHMgfHwgY3VycmVudFBlcnNvbi5jYXJkcy5sZW5ndGggPCAxKSB7XG4gICQoXCIjaGVhbHRoY2FyZFwiKS5oaWRlKCk7XG59Il0sImZpbGUiOiJ1c2VyLmpzIn0=
