// TODO: Populate the list data http://localhost:5000/auth/profile/nomrep with the user they just created (one only - the second one Authorisation request)

// TODO: Make this page http://localhost:5000/auth/profile/nomrep/edit-client take the client user name

// TODO: make ceased work on http: //localhost:5000/auth/profile/nomrep#rep-list

// TODO: Scenario 6 Make sure http://localhost:5000/auth/profile/nomrep represents the dropdown list  

console.log('init user');



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


$(document).keypress(function (e) {

  switch (e.which) {
    case 126: //tilda + shift
      $('.pt-choose-user').toggle();
      break;
    default:
  }
});


// Nom rep pages
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





// local storage a user 
function writeUser() {

  console.log('Writing user  ');

  const user = JSON.parse(localStorage.getItem('person'));
  const sessionClients = JSON.parse(sessionStorage.getItem('usersClients'));
  const sessionReps = JSON.parse(sessionStorage.getItem('usersReps'));

  // count number of clients 
  var sessionClientSubmitted = false;
  if (sessionClients) {
    localStorage.setItem('repFlow', 'representing');
    if (sessionClients.client[0].submittedApplication == "true") {
      localStorage.setItem('repFlow', 'representing');
      var sessionClientSubmitted = true;
      // push the client to the user
      user.clients.push(sessionClients.client[0]);
    }
  }

  var sessionRepSubmitted = false;
  if (sessionReps) {
    localStorage.setItem('repFlow', 'representing');
    if (sessionReps.rep[0].submittedApplication == "true") {
      localStorage.setItem('repFlow', 'representing');
      var sessionRepSubmitted = true;
      // push the rep to the user
      user.reps.push(sessionReps.rep[0]);
    }
  }


  if ((user.clients.length > 0) || (sessionClientSubmitted === true)) {

    if (user.clients.length > 0) {
      user.numberOfClients = user.clients.length;
    } else {
      user.numberOfClients = sessionClients.client.length;
    }

    // $('.pt-switch-account').show();
    // localStorage.setItem('repFlow', 'representing');

  } else if (user.clients.length < 1) {
    user.numberOfClients = 0;
    // $('.pt-switch-account').hide();
    // localStorage.setItem('repFlow', 'newbie');
  }

  if ((user.reps.length > 0) || (sessionRepSubmitted === true)) {

    if (user.reps.length > 0) {
      user.numberOfReps = user.reps.length;
    } else {
      user.numberOfReps = sessionClients.rep.length;
    }

    // localStorage.setItem('repFlow', 'represented');

  } else if (user.reps.length < 1) {
    user.numberOfReps = 0;
    // localStorage.setItem('repFlow', 'newbie');
  }

  console.log('sessionRepSubmitted');
  console.log(sessionRepSubmitted);

  console.log('sessionClientSubmitted');
  console.log(sessionClientSubmitted);

  if ((sessionRepSubmitted === true) && (sessionClientSubmitted === true)) {
    localStorage.setItem('repFlow', 'both');
    $('.pt-switch-account').show();
  } else if ((sessionRepSubmitted === true) || (user.reps.length > 0)) {
    localStorage.setItem('repFlow', 'represented');
    $('.pt-switch-account').show();
  } else if ((sessionClientSubmitted === true) || (user.clients.length > 0)) {
    localStorage.setItem('repFlow', 'representing');
    $('.pt-switch-account').show();
  } else {
    localStorage.setItem('repFlow', 'newbie');
    $('.pt-switch-account').hide();
  }


  var userHtml = '';
  var start = '<div class="pt-flex-grid"><div class="pt-col">';
  var end = '</div></div>'
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

  $.each(user.clients, function (key, client) {

    client.nameFull = client.nameFirst + ' ' + client.nameLast;
    clientListHtml += '<li><a href="/auth?switchFlow=active&switchId=' + client.id + '" class="switch-account-box__link"><strong>';
    clientListHtml += client.nameFirst + ' ' + client.nameLast + '</strong>';
    clientListHtml += ' (' + client.role + ')</a></li>';
  });

  if ((user.clients.length > 0) && (localStorage.getItem('switchFlow') == 'active')) {

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


// to generate more users, go to www.json-generator.com and paste in the data from /docs/data/user.generator 
// and paste in the generated users in to /docs/data/user.json
window.onload = function () {
  if (typeof (Storage) !== "undefined") {

    // Pull in the json content 
    $.ajax({
      url: '/docs/data/user.json',
      async: false,
      dataType: 'json'
    }).done(function (data) {



      console.log('User data back');

      // console.log(data);

      $.each(data.person, function (index, element) {

        // console.log(element);

      });


      localStorage.setItem('allPersons', JSON.stringify(data.person));


      // set the default MyService user if no user exists
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

        $.each(data.person, function (index, element) {

          if (element._id === selectedId) {
            // console.log('index = ' + index);

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
  } else {
    console.log("browser does not support web storage...");
  }
}



function writeRep(form) {

  var formData = getFormData(form);
  var reps = sessionStorage.getItem('usersReps');


  if (reps) { // reps in session data

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

  } else { // no reps 

    var repArray = $.makeArray(formData);
    sessionStorage.setItem('usersReps', '{"rep":' + JSON.stringify(repArray) + '}');
  }
}

function writeClient(form) {

  var formData = getFormData(form);
  var clients = sessionStorage.getItem('usersClients');


  if (clients) { // clients in session data

    var parsedClients = JSON.parse(clients);
    var sessionGuid = sessionStorage.getItem('sessionGuid');

    $.each(parsedClients.client, function (index, element) {

      if (element.id === sessionGuid) {
        console.log('writing to the user in session');

        clients = JSON.stringify(parsedClients);
        $.extend(true, parsedClients.client[index], formData);

      } else {
        // TODO: this needs to push but the arrays don't match
        // $.extend({}, parsedClients.client[index], formData);
        // $.merge(parsedClients.client[index]), formData));

      }
    });

    sessionStorage.setItem('usersClients', JSON.stringify(parsedClients));

  } else { // no clients 

    var clientArray = $.makeArray(formData);
    sessionStorage.setItem('usersClients', '{"client":' + JSON.stringify(clientArray) + '}');
  }
}

function readClient() {

  console.log('Reading client data');
  var clients = sessionStorage.getItem('usersClients');
  var parsedClients = JSON.parse(clients);
  if (parsedClients) {

    $.each(parsedClients.client, function (index, element) {

      $.each(element, function (index, element) {
        $('.pt-current-client-' + index).html(element);
      });
    });
  }
}

function readRep() {

  console.log('Reading rep data');
  var reps = sessionStorage.getItem('usersReps');
  var parsedReps = JSON.parse(reps);
  if (parsedReps) {

    $.each(parsedReps.rep, function (index, element) {

      $.each(element, function (index, element) {

        console.log('elementelementelement =');
        console.log(element);

        $('.pt-current-rep-' + index).html(element);
      });
    });
  }
}