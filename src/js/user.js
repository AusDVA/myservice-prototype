// TODO: make someone with no clients see the “newbie” view of

// TODO: populate this data http://localhost:5000/auth/profile/nomrep/review-rep with the real data 

// TODO: populate this page name http://localhost:5000/auth/profile/nomrep/submitted-rep with the form data name

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

  console.log('Writing user from --- ');

  const user = JSON.parse(localStorage.getItem('person'));


  // count number of clients 
  if (user.clients.length > 0) {
    user.numberOfClients = user.clients.length;
    $('.pt-switch-account').show();
    localStorage.setItem('repFlow', 'representing');
  } else {
    user.numberOfClients = 'none';
    $('.pt-switch-account').hide();
    localStorage.setItem('repFlow', 'newbie');
  }

  var userHtml = '';
  var start = '<div class="pt-flex-grid"><div class="pt-col">';
  var end = '</div></div>'
  userHtml += start + 'Name </div><div class="pt-col">' + user.nameFull + end;
  userHtml += start + 'Age </div><div class="pt-col">' + getAge(user.dob) + end;
  userHtml += start + 'Is a veteran </div><div class="pt-col">' + user.veteran + end;
  userHtml += start + 'Clients </div><div class="pt-col">' + user.numberOfClients + end;
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

  // console.log(user.clients);
  if ((user.clients.length > 0) && (localStorage.getItem('switchFlow') == 'active')) {

    $('.pt-current-user-name-first').html(user.clients[localStorage.getItem('switchId')].nameFirst);
    $('.pt-current-user-name-full').html(user.clients[localStorage.getItem('switchId')].nameFull);
  }

  // console.log('user - CHANGE');

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

      console.log(data);

      $.each(data.person, function (index, element) {

        // console.log(element);

      });





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
            console.log('index = ' + index);

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

$(document).keypress(function (e) {

  switch (e.which) {
    case 126: //tilda + shift
      $('.pt-choose-user').toggle();
      break;
    default:
  }
  // alert(e.which);
});

function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function (n, i) {
    indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
}

function writeRep(form) {
  console.log('writeRep sent form: ');
  var subForm = [];
  $.each(form, function (index, element) {

    if ((element.name === 'nameFirst')) {
      subForm.push({
        nameFirst: element.name
      });
    }
    if ((element.name === 'nameLast')) {
      subForm.push({
        nameLast: element.name
      });
    }

  });


  // Put the object into storage
  sessionStorage.setItem('repData', JSON.stringify(subForm));

  // Retrieve the object from storage
  var retrievedObject = sessionStorage.getItem('repData');

  // console.log('clientRep: ', JSON.parse(retrievedObject));
}

function writeClient(form) {

  // var $form = $("#form_data");
  var data = getFormData(form);

  console.log('writeClient sent form: ');
  console.log(form);
  console.log(data);
  // var subForm = [{}];

  var element = {},
    subForm = [];


  $.each(form, function (index, formElement) {

    // if ((formElement.name === 'nameFirst')) {
    //   element.nameFirst = formElement.value;
    // }
    subForm.push(formElement);
    // if ((element.name === 'nameLast')) {
    //   subForm.push({
    //     nameLast: element.value
    //   });
    // }

  });




  data = data + sessionStorage.getItem('clientData');
  // Put the object into storage
  sessionStorage.setItem('clientData', JSON.stringify(data));
  // var parsedJson = JSON.parse(data);
  // sessionStorage.setItem('clientData', data);


  // Retrieve the object from storage
  var retrievedObject = sessionStorage.getItem('clientData');

  // console.log(retrievedObject);


  // console.log('clientData: ', JSON.parse(retrievedObject));
}

function readClient(form) {

  var clients = sessionStorage.getItem('clientData');
  console.log("clients");
  console.log(clients);
}

readClient();