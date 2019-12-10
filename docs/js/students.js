// Student claim pages
jQuery(document).ready(function ($) {

  // alert('window.location.pathname' + window.location.pathname);

  function initStudents() {

    var studentNameFirst = localStorage.getItem('studentNameFirst');
    // get the name from storage 
    if (localStorage.getItem('studentNameFirst')) {
      // add '
      var apostrophe = "'";
      // add s to ' if student's name doesn't end in s
      if (localStorage.getItem('studentNameFirst').slice(-1) !== "s") {
        apostrophe = apostrophe + "s";
      }
    }

    var studentNameFirstApostrophed = localStorage.getItem('studentNameFirst') + apostrophe;

    // only for veteran and parent/guardian flows
    if (("veteranFlow" in localStorage) || ("claimantFlow" in localStorage)) {

      // both apostrophed and straight names are used in the screens 
      $(".studentNameFirstApostrophed").html(studentNameFirstApostrophed);
      $(".studentNameFirst").html(localStorage.getItem('studentNameFirst'));


    } else {
      $(".studentNameFirstApostrophed").html('');
      $(".studentNameFirst").html('');
    }

    // Pull in the json content 
    $.ajax({
      url: '/docs/data/student-claim-content.json',
      async: false,
      dataType: 'json',
    }).done(function (data) {

      console.log('Content data back');

      var contentSet = [];
      var contentVeteran = [];
      var contentStudent = [];
      var contentParentGuardian = [];
      var contentMessages = [];

      $.each(data.contents, function (index, element) {

        if (element.veteran) {
          contentVeteran = element.veteran;
        }
        if (element.parentGuardian) {
          contentParentGuardian = element.parentGuardian;
        }
        if (element.student) {
          contentStudent = element.student;
        }
        if (element.messages) {
          contentMessages = element.messages;
        }

      });

      if ("veteranFlow" in localStorage) {

        contentSet = Object.assign({}, contentMessages, contentVeteran);
      }

      if ("claimantFlow" in localStorage) {

        contentSet = Object.assign({}, contentMessages, contentParentGuardian);
      }

      if ("studentFlow" in localStorage) {

        contentSet = Object.assign({}, contentMessages, contentStudent);
      }

      for (var key in contentSet) {
        var content = contentSet[key].replace(/{{studentNameFirstApostrophed}}/g, studentNameFirstApostrophed);
        content = content.replace(/{{studentNameFirst}}/g, studentNameFirst);
        $("#question_" + key).html(content);
      }
    });

  }

  function initFlow() {
    if ("veteranFlow" in localStorage) {
      $(".pt-flow--veteran").show("fast");
    }

    if ("studentFlow" in localStorage) {
      $(".pt-flow--student").show("fast");
    }

    if ("claimantFlow" in localStorage) {
      $(".pt-flow--claimant").show("fast");
    }
  }

  // TODO:: handle reset if change of age after other flows
  if (window.location.pathname === "/auth/claim/studentpreeligibility") {

    localStorage.clear();

    // now in main
    // var getUrlParameter = function getUrlParameter(sParam) {
    //   var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    //     sURLVariables = sPageURL.split('&'),
    //     sParameterName,
    //     i;

    //   for (i = 0; i < sURLVariables.length; i++) {
    //     sParameterName = sURLVariables[i].split('=');

    //     if (sParameterName[0] === sParam) {
    //       return sParameterName[1] === undefined ? true : sParameterName[1];
    //     }
    //   }
    // };

    var flow = getUrlParameter('flow');
    var age = getUrlParameter('studentAge');
    var docUploads = getUrlParameter('docUploads');
    var act = getUrlParameter('act');


    console.log('flow = ' + flow);

    if (flow) {
      localStorage.setItem(flow, true);
      localStorage.setItem('flow', flow);
      if (age) {
        localStorage.setItem('studentAge', age);
      }
      if (docUploads) {
        localStorage.setItem('docUploads', docUploads);
      } else { // setting all flows to shopping card uploads by default 
        localStorage.setItem('docUploads', 'shopping');
      }
      if (act) {
        localStorage.setItem('act', act);
      } else { // setting everyone to mrca if not specified 
        localStorage.setItem('act', 'mrca');
      }
    } else {
      // alert('The prototype requires a flow and age in the url string e.g.  ' + location.protocol + '//' + location.host + location.pathname + '?flow=studentFlow&studentAge=10')
    }

    if (flow !== (localStorage.getItem('flow'))) {
      window.location.reload(true);
    }

    initStudents();


    if ("veteranFlow" in localStorage) {

      // alert('im vet');

      $(".pt-flow--veteran").show();
    }

    if ("studentFlow" in localStorage) {
      $(".pt-flow--student").show();
    }

    if ("claimantFlow" in localStorage) {
      $(".pt-flow--claimant").show();
    }

    function init() {
      console.log('loading init');

      $(".pt-showIfStudentShouldClaimThemselves").hide();
      $(".pt-showIfStudentUnder18").hide();
      $(".pt-showIfCentrelinkCustomer").hide();
      $(".pt-showIfYourFTB").hide();
      $(".pt-showIfSomeoneElseFTB").hide();
      $(".pt-showIfNoFTB").hide();
      $(".pt-showIfStudentBetween16and18").hide();
      $(".pt-showIfStudentUnder0").hide();
      $(".pt-showIfNoTFN").hide();
      $(".pt-showFTBIsBest").hide();
      $('.pt-showIfMRCA').hide();
      $(".pt-showIfStudentFullTimeAndMRCA").hide();
      $(".pt-vetShowIfStudentFullTimeAndMRCA").hide();
      $(".pt-showIfStudentConfirmed").hide();
      $('.pt-showIfEngagedInFullTimeEmployment').hide();
      $(".pt-showIfStudentDependantOnVeteran").hide();
      $('.pt-showIfRelationshipValid').hide();
      $('.pt-studentFullTime').hide();
      $('.pt-showIfStudentCantClaim').hide();
      $('.pt-showIfStudentNotDependant').hide();
      $('.pt-aboutYou').hide();
      $('.pt-studentOver25').hide();
      $('.pt-studentTooyoung').hide();
      $('.pt-VeteranRelationshipToStudent').hide();
      $(".pt-StudentRelationshipToVeteran").hide();
      $(".pt-StudentRelationshipToClaimant").hide();
    }

    function resetForm($form) {

      $('input[type=radio]:checked').not('input[type=radio][name=confirmStudentOrClaimant]').prop('checked', false);
    }

    init();



    $('input[name=fTBYou]').change(function () {
      if ($('input[name=fTBYou]:checked').val() === 'yes') {

        $(".pt-showIfYourFTB").show();
        $(".pt-showIfSomeoneElseFTB").hide();
        $(".pt-showIfCentrelinkCustomer").show();
        localStorage.removeItem('veteranReceivesFTB');
        localStorage.setItem('veteranReceivesFTB', true);

        if (("veteranFlow" in localStorage) || ("claimantFlow" in localStorage)) {
          if ((localStorage.getItem('studentAge') <= 18) && (localStorage.getItem('studentAge') > 15)) {
            $(".pt-showFTBIsBest").show();


          }
        }
        if (("veteranFlow" in localStorage)) {
          if ((localStorage.getItem('studentAge') <= 18) && (localStorage.getItem('studentAge') > 15)) {

            $(".pt-vetStudentEngagedInFullTimeEmployment").show();

          }
        }
        if (!("claimantFlow" in localStorage)) {
          // if student 16 or 17 ask for TFN
          if ((localStorage.getItem('studentAge') <= 18) && (localStorage.getItem('studentAge') > 15)) {
            $(".pt-showIfStudentBetween16and18").show();

          } else {
            $(".pt-showIfStudentBetween16and18").hide();
          }
        }

      } else {
        $(".pt-showIfYourFTB").hide();
        $(".pt-showIfSomeoneElseFTB").show();
        $(".pt-showIfCentrelinkCustomer").hide();
        localStorage.removeItem('veteranReceivesFTB');
        localStorage.setItem('veteranReceivesFTB', false);
      }
    });



    $('input[name=fTBSomeoneElse]').change(function () {
      if ($('input[name=fTBSomeoneElse]:checked').val() === 'yes') {

        $(".pt-showIfNoFTB").show();
      } else {
        $(".pt-showIfNoFTB").hide();
        $(".pt-showIfCentrelinkCustomer").hide();

        // if student 16 or 17 ask for TFN
        if (!("claimantFlow" in localStorage)) {
          if ((localStorage.getItem('studentAge') <= 18) && (localStorage.getItem('studentAge') > 15)) {
            $(".pt-showIfStudentBetween16and18").show();
          } else {
            $(".pt-showIfStudentBetween16and18").hide();
          }
        }
        if ("veteranFlow" in localStorage) {
          if ((localStorage.getItem('studentAge') < 18) && (localStorage.getItem('studentAge') > 15)) {
            $(".pt-vetStudentEngagedInFullTimeEmployment").show();
          }
        }
      }
    });

    $('input[name=engagedInFullTimeEmployment]').change(function () {
      if ($('input[name=engagedInFullTimeEmployment]:checked').val() === 'yes') {
        if (("veteranFlow" in localStorage)) {
          $(".pt-vetShowIfStudentFullTimeAndMRCA").show();

        } else {
          $(".pt-showIfStudentFullTimeAndMRCA").show();
        }
      } else {
        $(".pt-vetShowIfStudentFullTimeAndMRCA").hide();
        $(".pt-showIfStudentFullTimeAndMRCA").hide();
        $(".pt-StudentRelationshipToVeteran").show();
      }
      if (("veteranFlow" in localStorage)) {
        $(".pt-final-toggle").show();
      }
    });

    // Calculate student age
    $(".pt-student-dob > :input").keyup(function () {
      var dobDay = $("#dd-date").val();
      var dobMonth = $("#mm-date").val();
      var dobYear = $("#yyyy-date").val();

      // if a valid date
      if (dobDay && dobMonth && (dobYear.length === 4)) {



        if (dobDay.length === 1) {
          dobDay = "0" + dobDay;
        }
        if (dobMonth.length === 1) {
          dobMonth = "0" + dobMonth;
        }
        var dob = dobYear + '-' + dobMonth + '-' + dobDay;

        dob = new Date(dob);
        var today = new Date();
        var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));

        localStorage.removeItem('studentAge');
        localStorage.setItem('studentAge', age);
        console.debug('student age: ', age);

        // validation:: older than 5
        if (localStorage.getItem('studentAge') < 5) {
          init();
          resetForm($('#pt-form'));
          $(".pt-showIfStudentUnder0").show();
        } else {
          console.log('student is older than 4');
          $(".pt-showIfStudentUnder0").hide();

          // veteran and claimant flow only
          if (("veteranFlow" in localStorage)) {

            // if over 18, suggest student claims on their own 
            if (localStorage.getItem('studentAge') > 24) {
              init();
              $(".pt-showIfStudentCantClaim").show();
            } else if (localStorage.getItem('studentAge') > 17) {

              init();
              resetForm($('#pt-form'));
              $(".pt-showIfStudentShouldClaimThemselves").show();
              // $(".pt-showIfStudentUnder18").hide();
            } else {
              init();
              $(".pt-showIfStudentShouldClaimThemselves").hide();
              $(".pt-VeteranRelationshipToStudent").show();
              $(".pt-StudentRelationshipToVeteran").hide();
              $(".pt-showIfStudentUnder18").show();
              // $(".pt-claimantShowIfStudentOver16").show();

            }

            $('input[name=veteranSignificantlyInjured]').change(function () {
              if ($('input[name=veteranSignificantlyInjured]:checked').val() === 'yes') {
                $(".pt-showIfStudentNotDependant").show();
              } else {
                $(".pt-showIfStudentNotDependant").hide();
              }
            });
          }

          // claimant flow only
          if ("claimantFlow" in localStorage) {
            if (localStorage.getItem('studentAge') > 24) {
              init();
              $(".pt-showIfStudentCantClaim").show();
            } else if (localStorage.getItem('studentAge') > 17) {
              init();
              $(".pt-showIfStudentShouldClaimThemselves").show();
              // $(".pt-showIfStudentUnder18").hide();
            } else if ((localStorage.getItem('studentAge') > 15) && (localStorage.getItem('studentAge') <= 18)) {
              init();
              $(".pt-showIfStudentShouldClaimThemselves").hide();
              $(".pt-claimantShowIfStudentOver16").show();


            } else { // under 16
              init();
              $(".pt-showIfEngagedInFullTimeEmployment").show();
              $(".pt-StudentRelationshipToVeteran").show();
            }


            $('input[name=veteranSignificantlyInjured]').change(function () {
              if ($('input[name=veteranSignificantlyInjured]:checked').val() === 'yes') {
                $(".pt-showIfStudentUnder18").show();
                $(".pt-StudentRelationshipToClaimant").show();
                $(".pt-aboutYou").show();
                $(".pt-showIfStudentNotDependant").hide();
              } else {
                $(".pt-showIfStudentUnder18").hide();
                $(".pt-aboutYou").hide();
                $(".pt-showIfStudentNotDependant").show();
              }
            });

          }
        }

      }
    });

    $("#relationshipToStudent").change(function () {

      var selected_option = $('#relationshipToStudent').val();

      localStorage.removeItem('relationshipType');
      localStorage.setItem('relationshipType', selected_option);

      if ("claimantFlow" in localStorage) {

        if ((selected_option === 'adoptive-parent') || (selected_option === 'parent')) {

          $('.pt-showIfRelationshipValid').hide();
          $('#relationshipToStudentOther').hide();
          $('.pt-showIfStudentDependantOnVeteran').show();

        } else if (selected_option === 'other') {
          $('#relationshipToStudentOther').show();
        } else {
          $('.pt-showIfRelationshipValid').show();
          $('#relationshipToStudentOther').hide();
          $('.pt-showIfStudentDependantOnVeteran').hide();
        }

      } else {
        if (selected_option === 'other') {
          $('#relationshipToStudentOther').show();
        } else {
          $('#relationshipToStudentOther').hide();
        }
      }

    });

    // confirm student or claimant
    $('input[name=confirmStudentOrClaimant]').change(function () {
      // localStorage.clear();


      if ($('input[name=confirmStudentOrClaimant]:checked').val() === 'guardian') {
        localStorage.removeItem('studentFlow');
        localStorage.removeItem('studentFlowConfirmed');
        localStorage.setItem('claimantFlow', true);
        localStorage.setItem('claimantFlowConfirmed', true);
        init();

        $(".pt-student-dob").show();

        initStudents();

      } else if ($('input[name=confirmStudentOrClaimant]:checked').val() === 'student') {
        localStorage.removeItem('claimantFlowConfirmed');
        localStorage.removeItem('claimantFlow');
        localStorage.setItem('studentFlow', true);
        localStorage.setItem('studentFlowConfirmed', true);
        init();
        $(".pt-student-dob").hide();
        $('.pt-studentFullTime').show();
        $(".pt-showIfStudentConfirmed").show();

        console.log(localStorage.getItem('studentAge'));

        // Show warning eligibility message if student is over 25.
        if (localStorage.getItem('studentAge') > 24) {
          console.log('over 25');
          $(".pt-studentOver25").show();
          $(".pt-studentTooyoung").hide();
          $('.pt-studentFullTime').show();
          $(".pt-showIfStudentConfirmed").show();
        }

        // Show error message if student is under 16
        if (localStorage.getItem('studentAge') < 16) {
          console.log('under 16');
          $(".pt-studentTooyoung").show();
          $('.pt-studentFullTime').hide();
          $(".pt-showIfStudentConfirmed").hide();
          $(".pagination").find('.btnNext').prop('disabled', true);
        }

        initStudents();
      }

      resetForm($('#pt-form'));



    });

    $('input[name=engagedInFullTimeEmployment]').change(function () {

      if ($('input[name=engagedInFullTimeEmployment]:checked').val() === 'yes') {

      } else {
        if (!("veteranFlow" in localStorage)) {

          $('.pt-showIfEngagedInFullTimeEmployment').show();
          if (!("claimantFlow" in localStorage)) {
            $('.pt-showIfRelationshipValid').show();
          }
        }
      }
    });

    if (!("studentFlow" in localStorage)) {

    }

    $('input[name=studentDependantOnVeteran]').change(function () {
      if ($('input[name=studentDependantOnVeteran]:checked').val() === 'yes') {
        $('.pt-showIfStudentNotDependant').hide();
        $('.pt-showIfStudentDependantOnVeteran').show();
      } else {

        $('.pt-showIfStudentNotDependant').show();
        $('.pt-showIfStudentDependantOnVeteran').hide();
      }
    });

  }


  // All student pages 
  if (window.location.href.indexOf("student") > -1) {

    console.log('All student pages');

    $(".pt-showIfDocumentUploadShoppingCart").hide();
    $(".pt-final-toggle").hide();



    $('input[name=doesStudentHaveTFN]').change(function () {
      if (localStorage.getItem('act') === 'mrca') {
        $('.pt-showIfMRCA').show();
      }

      if ($('input[name=doesStudentHaveTFN]:checked').val() === 'yes') {
        localStorage.removeItem('studentHasTFN');
        localStorage.setItem('studentHasTFN', true);
      } else {
        localStorage.removeItem('studentHasTFN');
        localStorage.removeItem('tfn');
      }
    });



    $(".upload-list").show();
  }

  // Page 1
  if (window.location.pathname === "/auth/claim/studentclaim1") {

    initStudents();
    initFlow();

    $(".pt-studentAge--mature").hide();
    $(".pt-showIfStudentLivingAtHome").hide();
    $(".pt-studentLivingSameAddress").hide();
    $(".pt-studentLivingWithPartnerLessRate").hide();
    $(".pt-showLivingLocation").hide();
    $(".upload-list").show();
    $(".pt-showIfLivingAwayFromHome").hide();
    $(".pt-showIfDocumentUploadShoppingCart").hide();
    $(".pt-partneredRelationship").hide();
    $(".pt-livingWithPartner").hide();

    // if (true) {
    if (localStorage.getItem('studentAge') > 15) {

      if ("studentFlow" in localStorage) {
        $(".pt-studentAge--mature").each(function () {
          if ($(this).is(".pt-flow--student")) {
            $(this).show("fast");
          }
        });
      }

      if ("veteranFlow" in localStorage) {
        $(".pt-studentAge--mature").each(function () {
          if ($(this).is(".pt-flow--veteran")) {
            $(this).show("fast");
          }
        });
      }

      if ("claimantFlow" in localStorage) {
        $(".pt-studentAge--mature").each(function () {
          if ($(this).is(".pt-flow--claimant")) {
            $(this).show("fast");
          }
        });
      }


      $("#veteranNameFirst").focusout(function () {
        if ($(this).val()) {
          localStorage.removeItem('veteranNameFirst');
          localStorage.setItem('veteranNameFirst', $(this).val());
        } else {
          localStorage.removeItem('veteranNameFirst');
        }
      });

      $("#veteranNameLast").focusout(function () {
        if ($(this).val()) {
          localStorage.removeItem('veteranNameLast');
          localStorage.setItem('veteranNameLast', $(this).val());
        } else {
          localStorage.removeItem('veteranNameLast');
        }
      });



    } else {
      $(".pt-studentAge--mature").hide("slow");
    }

    $(".pt-partneredRelationship").hide();

    // extra details for students 
    if (("studentFlow" in localStorage) || "claimantFlow" in localStorage) {
      $('.btnNext').prop('onclick', null);
      $('.btnNext').click(function () {
        window.location.href = '/auth/claim/studentclaim1a';
      });
    }


    $('input[name=gender]').change(function () {
      if (localStorage.getItem('studentAge') > 15) {
        $(".pt-partneredRelationship").show();
      } else {
        $(".pt-showLivingLocation").show();
      }
    });

    $("#firstName").focusout(function () {
      if ($(this).val()) {
        localStorage.removeItem('studentNameFirst');
        localStorage.setItem('studentNameFirst', $(this).val());
      } else {
        localStorage.removeItem('studentNameFirst');
      }
    });

    $("#lastName").focusout(function () {
      if ($(this).val()) {
        localStorage.removeItem('studentNameLast');
        localStorage.setItem('studentNameLast', $(this).val());
      } else {
        localStorage.removeItem('studentNameLast');
      }
    });



    $('input[name=studentLivingLocation]').change(function () {

      localStorage.removeItem('studentLivingLocation');
      localStorage.setItem('studentLivingLocation', $('input[name=studentLivingLocation]:checked').val());

      if ($('input[name=studentLivingLocation]:checked').val() === 'homeless') {
        $(".pt-showIfLivingAway").hide();
        $(".pt-showIfNoPartner").hide();
        $(".pt-livingWithPartner").hide();
        $("pt-final-toggle").hide();

        // skip the living arrangement details 
        $('.btnNext').prop('onclick', null);
        $('.btnNext').click(function () {
          // event.stopPropagation();
          window.location.href = '/auth/claim/studentclaim3';
        });
      } else {

        $(".pt-showIfLivingAway").show('fast');
        $(".pt-showIfNoPartner").hide();
        $("pt-final-toggle").hide();
        if (localStorage.getItem('studentPartneredRelationship') === 'no') {
          $(".pt-showIfNoPartner").show();
          $(".pt-livingWithPartner").hide();

        }

      }

      if ($('input[name=studentLivingLocation]:checked').val() === 'away-from-home') {
        $(".pt-showIfLivingAwayFromHome").show();
      } else {
        $(".pt-showIfLivingAwayFromHome").hide();
      }
    });


    $('input[name=studentLivingWithPartner]').change(function () {
      if ($('input[name=studentLivingWithPartner]:checked').val() === 'yes') {

        $(".pt-studentLivingWithPartnerLessRate").show();
      } else {
        $(".pt-studentLivingWithPartnerLessRate").hide();
      }
    });


    $('input[name=studentPartneredRelationship]').change(function () {
      $(".pt-showLivingLocation").show();
      if ($('input[name=studentPartneredRelationship]:checked').val() === 'yes') {
        localStorage.removeItem('studentPartneredRelationship');
        localStorage.setItem('studentPartneredRelationship', 'yes');
        $(".pt-studentLivingSameAddress").show();
      } else {
        localStorage.removeItem('studentPartneredRelationship');
        localStorage.setItem('studentPartneredRelationship', 'no');
        $(".pt-studentLivingSameAddress").hide();
      }
    });


    $("#relationshipToVeteran").change(function () {

      var selected_option = $('#relationshipToVeteran').val();

      localStorage.removeItem('relationshipType');
      localStorage.setItem('relationshipType', selected_option);

      if (selected_option === 'other') {
        $('#relationshipToVeteranOther').show("fast");
      } else {
        $('#relationshipToVeteranOther').hide("slow");
      }
    });


    $("#veteranRelationshipToStudent").change(function () {
      var selected_option = $('#veteranRelationshipToStudent').val();
      if (selected_option === 'other') {
        $('#veteranRelationshipToStudentOther').show("fast");
      } else {
        $('#veteranRelationshipToStudentOther').hide("slow");
      }
    });

    $('input[name=studentLivingAwayValidReason]').change(function () {

      if ($('input[name=studentLivingAwayValidReason]:checked').val() === 'yes' &&
        $('input[name=studentPartneredRelationship]:checked').val() === 'yes') {
        $(".pt-livingWithPartner").show();
        localStorage.removeItem('studentLivingAwayValidReason');
        localStorage.removeItem('studentLivingLocation');
        localStorage.setItem('studentLivingLocation', 'away-from-home');
        localStorage.setItem('studentLivingAwayValidReason', true);
      } else if ($('input[name=studentLivingAwayValidReason]:checked').val() === 'yes') {
        localStorage.removeItem('studentLivingAwayValidReason');
        localStorage.removeItem('studentLivingLocation');
        localStorage.setItem('studentLivingLocation', 'away-from-home');
        localStorage.setItem('studentLivingAwayValidReason', true);
        $(".pt-final-toggle").show();
      } else {
        localStorage.removeItem('studentLivingAwayValidReason');
        localStorage.removeItem('studentLivingLocation');
        localStorage.setItem('studentLivingLocation', 'at-home');
        $(".pt-livingWithPartner").hide();
        $(".pt-final-toggle").show();
      }
    });




    $('input[name=studentLivingWithPartner]').change(function () {
      $(".pt-final-toggle").show();
      if ($('input[name=studentLivingWithPartner]:checked').val() === 'yes') {
        localStorage.removeItem('studentLivingWithPartner');
        localStorage.setItem('studentLivingWithPartner', 'yes');
      } else {
        localStorage.removeItem('studentLivingWithPartner');
        localStorage.setItem('studentLivingWithPartner', 'no');
      }
    });

  }

  // Page 1a
  if (window.location.pathname === "/auth/claim/studentclaim1a") {
    initStudents();
    initFlow();

    $(".pt-showLivingLocation").hide();
    $(".pt-showIfLivingAwayFromHome").hide();
    $(".pt-livingWithPartner").hide();
    if ("claimantFlow" in localStorage) {
      $(".pt-partneredRelationship").hide();
    }

    $("#firstName").focusout(function () {
      if ($(this).val()) {
        localStorage.removeItem('studentNameFirst');
        localStorage.setItem('studentNameFirst', $(this).val());
      } else {
        localStorage.removeItem('studentNameFirst');
      }
    });

    $("#lastName").focusout(function () {
      if ($(this).val()) {
        localStorage.removeItem('studentNameLast');
        localStorage.setItem('studentNameLast', $(this).val());
      } else {
        localStorage.removeItem('studentNameLast');
      }
    });

    $('input[name=gender]').change(function () {
      if (localStorage.getItem('studentAge') > 15) {
        $(".pt-partneredRelationship").show();
      } else {
        $(".pt-showLivingLocation").show();
      }
    });

    $('input[name=studentPartneredRelationship]').change(function () {
      $(".pt-showLivingLocation").show();
    });

    $('input[name=studentLivingLocation]').change(function () {
      if ($('input[name=studentLivingLocation]:checked').val() === 'homeless') {
        localStorage.removeItem('studentLivingLocation');
        localStorage.setItem('studentLivingLocation', 'homeless');
        $(".pt-final-toggle").hide();
        $(".pt-livingWithPartner").hide();
      } else if ($('input[name=studentLivingLocation]:checked').val() === 'at-home') {
        localStorage.removeItem('studentLivingLocation');
        localStorage.setItem('studentLivingLocation', 'at-home');
        $(".pt-livingWithPartner").hide();
        $(".pt-final-toggle").hide();
      } else if ($('input[name=studentLivingLocation]:checked').val() === 'away-from-home') {
        localStorage.removeItem('studentLivingLocation');
        localStorage.setItem('studentLivingLocation', 'away-from-home');
      } else {
        localStorage.removeItem('studentLivingLocation');
      }

      if ($('input[name=studentLivingLocation]:checked').val() === 'away-from-home') {
        $(".pt-showIfLivingAwayFromHome").show();
      } else {
        $(".pt-showIfLivingAwayFromHome").hide();
      }

      if ($('input[name=studentLivingLocation]:checked').val() === 'homeless') {
        // skip the living arrangement details 
        $('.btnNext').prop('onclick', null);
        $('.btnNext').click(function () {
          window.location.href = '/auth/claim/studentclaim3';
        });
      } else if (($('input[name=studentLivingLocation]:checked').val() === 'at-home')) {
        if ("studentFlow" in localStorage) {
          // skip the living arrangement details 
          $('.btnNext').prop('onclick', null);
          $('.btnNext').click(function () {
            window.location.href = '/auth/claim/studentclaim3';
          });
        } else {
          $('.btnNext').prop('onclick', null);
          $('.btnNext').click(function () {
            window.location.href = '/auth/claim/studentclaim2';
          });
        }
      } else {
        $('.btnNext').prop('onclick', null);
        $('.btnNext').click(function () {
          window.location.href = '/auth/claim/studentclaim2';
        });
      }
    });


    $('input[name=studentLivingAwayValidReason]').change(function () {

      if ($('input[name=studentLivingAwayValidReason]:checked').val() === 'yes' &&
        $('input[name=studentPartneredRelationship]:checked').val() === 'yes') {
        $(".pt-livingWithPartner").show();
        localStorage.removeItem('studentLivingAwayValidReason');
        localStorage.removeItem('studentLivingLocation');
        localStorage.setItem('studentLivingLocation', 'away-from-home');
        localStorage.setItem('studentLivingAwayValidReason', true);
      } else if ($('input[name=studentLivingAwayValidReason]:checked').val() === 'yes') {
        localStorage.removeItem('studentLivingAwayValidReason');
        localStorage.removeItem('studentLivingLocation');
        localStorage.setItem('studentLivingLocation', 'away-from-home');
        localStorage.setItem('studentLivingAwayValidReason', true);
        $(".pt-final-toggle").show();
      } else {
        localStorage.removeItem('studentLivingAwayValidReason');
        localStorage.removeItem('studentLivingLocation');
        localStorage.setItem('studentLivingLocation', 'at-home');
        $(".pt-livingWithPartner").hide();
        $(".pt-final-toggle").show();
      }
    });


    $('input[name=studentPartneredRelationship]').change(function () {

      $(".pt-showLivingLocation").show();

      if ($('input[name=studentPartneredRelationship]:checked').val() === 'yes') {
        localStorage.removeItem('studentPartneredRelationship');
        localStorage.setItem('studentPartneredRelationship', 'yes');
      } else {
        localStorage.removeItem('studentPartneredRelationship');
        localStorage.setItem('studentPartneredRelationship', 'no');
        $(".pt-studentLivingSameAddress").hide();
      }
    });


    $('input[name=studentLivingWithPartner]').change(function () {
      $(".pt-final-toggle").show();
      if ($('input[name=studentLivingWithPartner]:checked').val() === 'yes') {
        localStorage.removeItem('studentLivingWithPartner');
        localStorage.setItem('studentLivingWithPartner', 'yes');
      } else {
        localStorage.removeItem('studentLivingWithPartner');
        localStorage.setItem('studentLivingWithPartner', 'no');
      }
    });


  }


  if (window.location.pathname === "/auth/claim/studentclaim2") {
    // Page 2 
    initStudents();
    initFlow();
    $(".pt-showIfHomeless").hide();
    $(".pt-showIfRequireRentAssistance").hide();
    $(".pt-showIfRenting").hide();
    $(".pt-showIfNotRentLandLord").hide();
    $(".pt-rentPayed").hide();
    $(".pt-showIfAdditionalAddress").hide();
    $(".pt-showIfLivingAway").hide();
    $(".pt-showIfBoarding").hide();
    $(".pt-boardPaid").hide();
    $(".pt-showIfOther").hide();


    if ((localStorage.getItem('studentLivingLocation') === 'at-home') ||
      (localStorage.getItem('studentLivingWithPartner') === 'yes') ||
      (localStorage.getItem('studentAge') < 16)) {
      $(".pt-showIfLivingAway").hide();
    } else {
      $(".pt-showIfLivingAway").show();
    }

    $("#studyAwayFromHomeExplanation").change(function () {
      var selected_option = $('#studyAwayFromHomeExplanation').val();
      if (selected_option === 'homeless') {
        $(".pt-showIfHomeless").show('fast');
      } else {
        $(".pt-showIfHomeless").hide();
      }
    });


    $('input[name=studentLivingArrangement]').change(function () {
      if ($('input[name=studentLivingArrangement]:checked').val() === 'renting') {
        $(".pt-showIfRequireRentAssistance").show();
        $(".pt-showIfRenting").show('fast');
        $(".pt-showIfBoarding").hide();
        $(".pt-boardPaid").hide();
        $(".pt-showIfOther").hide();
        localStorage.removeItem('studentLivingArrangement');
        localStorage.setItem('studentLivingArrangement', 'renting');
      } else if ($('input[name=studentLivingArrangement]:checked').val() === 'boarding') {
        $(".pt-boardPaid").show();
        $(".pt-showIfBoarding").show('fast');
        $(".pt-showIfRenting").hide();
        $(".pt-showIfOther").hide();
        $(".pt-showIfRequireRentAssistance").hide();
        localStorage.removeItem('studentLivingArrangement');
        localStorage.setItem('studentLivingArrangement', 'boarding');
      } else if ($('input[name=studentLivingArrangement]:checked').val() === 'other') {
        localStorage.removeItem('studentLivingArrangement');
        localStorage.setItem('studentLivingArrangement', 'other');
        $(".pt-showIfOther").show();
        $(".pt-boardPaid").hide();
        $(".pt-showIfBoarding").hide();
        $(".pt-showIfRenting").hide();
        $(".pt-showIfRequireRentAssistance").hide();
      } else {
        localStorage.removeItem('studentLivingArrangement');
      }
    });



    $('input[name=sharingResidence]').change(function () {

      $(".pt-rentPayed").show();

    });


    $('input[name=sameAsPostal]').change(function () {

      if ($(this).is(':checked')) {
        $(".pt-showIfAdditionalAddress").hide();
      } else {
        $(".pt-showIfAdditionalAddress").show();
      }
    });

  }

  if (window.location.pathname === "/auth/claim/studentclaim3") {
    // page 3
    initStudents();
    initFlow();
    $(".pt-showIfNotPrimaryStudent").hide();
    $(".pt-showIfPrimary").hide();
    $(".pt-showIfSecondary").hide();
    $(".pt-showIfTertiary").hide();
    $(".pt-showIfPartTime").hide();
    $(".pt-noLongerEligible").hide();
    $(".pt-noLongerEligibleTwo").hide();
    $(".pt-showIfStudyLoadNotAnswered").hide();
    $(".pt-showIfEnrolled").hide();
    $(".pt-enrollStatusStudentOver25").hide();
    // $(".pt-enrollDatestudentOver25").hide();



    // skip the financial details if we're in veteran flow
    // if ("veteranFlow" in localStorage) {
    //   $('.btnNext').prop('onclick', null);
    //   $('.btnNext').click(function () {
    //     // event.stopPropagation();
    //     window.location.href = '/studentclaimupload';
    //   })
    // }


    if (localStorage.getItem('studentLevelOfStudy') !== 'primary') {
      $(".pt-showIfNotPrimaryStudent").show('fast');
    }

    $("#studentLevelOfStudy").change(function () {
      var selected_option = $('#studentLevelOfStudy').val();

      var grade_options;

      if (selected_option === 'primary') {
        $(".pt-noLongerEligible").hide();
        $(".pt-showIfSecondary").hide();
        $(".pt-showIfTertiary").hide();
        $(".pt-showIfPrimary").show('fast');

        localStorage.removeItem('studentLevelOfStudy');
        localStorage.setItem('studentLevelOfStudy', 'primary');
        $(".pagination").find('button').prop('disabled', false);

      } else if (selected_option.startsWith('secondary')) {

        $(".pt-noLongerEligible").hide();
        $(".pt-showIfTertiary").hide();
        $(".pt-showIfPrimary").hide();

        $(".pt-showIfSecondary").show();

        localStorage.removeItem('studentLevelOfStudy');
        localStorage.setItem('studentLevelOfStudy', 'secondary');

        $(".pagination").find('button').prop('disabled', false);
      } else if ((selected_option.startsWith('tertiary')) || (selected_option === 'apprenticeship')) {
        $(".pt-noLongerEligible").hide();
        $(".pt-showIfPrimary").hide();
        $(".pt-showIfSecondary").hide();
        $(".pt-showIfTertiary").show('fast');
        if (localStorage.getItem('studentLoadOfStudy') === null) {
          $(".pt-showIfStudyLoadNotAnswered").show('fast');
        }

        if (localStorage.getItem('studentLoadOfStudy') === 'part-time') {
          $(".pt-showIfPartTime").show('fast');
        }


        localStorage.removeItem('studentLevelOfStudy');
        localStorage.setItem('studentLevelOfStudy', 'tertiary');
        $(".pagination").find('button').prop('disabled', false);
      }


    });


    $('input[name=studyLoad]').change(function () {
      if ($('input[name=studyLoad]:checked').val() === 'part-time') {
        $(".pt-showIfPartTime").show('fast');
        localStorage.removeItem('studentLoadOfStudy');
        localStorage.setItem('studentLoadOfStudy', 'part-time');
      } else {
        $(".pt-showIfPartTime").hide();
        localStorage.removeItem('studentLoadOfStudy');
        localStorage.setItem('studentLoadOfStudy', 'full-time');
      }
    });

    $('input[name=enrolStatus]').change(function () {
      if ($('input[name=enrolStatus]:checked').val() === 'no') {
        localStorage.removeItem('enrolStatus');

        $(".pt-noLongerEligibleTwo").show();
        $(".pt-showIfEnrolled").hide();

        // Show an error message if the student is 25 or older and hasn't enrolled
        if (localStorage.getItem('studentAge') > 24) {
          $(".pt-enrollStatusStudentOver25").show();
          $(".pt-noLongerEligibleTwo").hide();
          // $(".pt-enrollDatestudentOver25").hide();
          $(".pagination").find('.btnNext').prop('disabled', true);
        }
      } else {
        localStorage.removeItem('enrolStatus');
        localStorage.setItem('enrolStatus', true);
        $(".pt-noLongerEligibleTwo").hide();
        $(".pt-enrollStatusStudentOver25").hide();
        $(".pt-showIfEnrolled").show();
        //show an error message if the student is 25 or older and enrolled after they turned 25. The smarts don't exist in prototype.
        if (localStorage.getItem('studentAge') > 24) {
          // $(".pt-enrollDatestudentOver25").show();
          $(".pagination").find('.btnNext').prop('disabled', false);
        }
      }
    });
  }

  if (window.location.pathname === "/auth/claim/studentclaimupload") {
    initStudents();
  }

  if (window.location.pathname === "/auth/claim/studentclaim4") {
    // Page 4
    initStudents();
    initFlow();
    $('.pt-studentAge--mature').hide();
    $('.pt-showIfEducationAllowanceTaxed').hide();
    $('.pt-showIfEducationAllowanceNotTaxed').hide();
    $('.pt-showIfCarePercentageLow').hide();
    $('.pt-showIfCarePercentageHigh').hide();
    $('.bank-details-container').hide();
    $('.pt-showIfNoStudentTFN').hide();
    $('.pt-showIfStudentTFN').hide();
    $('.pt-studentFinancialPermission').hide();


    // if student 16 or 17 ask for TFN
    if (("claimantFlow" in localStorage) || ("veteranFlow" in localStorage)) {
      if ((localStorage.getItem('studentAge') <= 18) && (localStorage.getItem('studentAge') > 15)) {
        $(".pt-showIfStudentBetween16and18").show();

      } else {
        $(".pt-showIfStudentBetween16and18").hide();
      }
    }

    if (("studentFlow" in localStorage)) {
      if ((localStorage.getItem('studentAge') < 18) && (localStorage.getItem('studentAge') > 15)) {
        $('.pt-studentFinancialPermission').show();
      }
    }




    if (localStorage.getItem('studentAge') > 15) {
      $('.pt-studentAge--mature').show();
    }


    $('input[name=educationAllowanceTaxed]').change(function () {
      if ($('input[name=educationAllowanceTaxed]:checked').val() === 'yes') {
        $(".pt-showIfEducationAllowanceTaxed").show();
        $('.pt-showIfEducationAllowanceNotTaxed').hide();
      } else {
        $(".pt-showIfEducationAllowanceTaxed").hide();
        $('.pt-showIfEducationAllowanceNotTaxed').show('fast');
      }
    });



    // bank details button function
    $("#btnAddBank").click(function () {
      $(".bank-details-container").show("fast");
      $("#btnAddBank-box").hide();
      $("#bankoptional").hide();
      $("#btnCancelBank").show();
      $("#bank-name").focus();
    });
    $("#btnCancelBank").click(function () {
      $(".bank-details-container").hide("fast");
      $("#btnCancelBank").hide();
      $("#bankoptional").show();
      $("#btnAddBank-box").show();
    });

    $(".message-close").click(function () {
      $(".bank-details-container").hide("fast");
    });

    $('input[name=doesStudentHaveTFN]').change(function () {
      if ($('input[name=doesStudentHaveTFN]:checked').val() === 'yes') {
        localStorage.setItem('studentTFN', true);
        $(".pt-showIfNoStudentTFN").hide();
        $(".pt-showIfStudentTFN").show();
      } else {
        localStorage.setItem('studentTFN', false);
        localStorage.removeItem('tfn');
        $(".pt-showIfNoStudentTFN").show('fast');
        $(".pt-showIfStudentTFN").hide();
      }
    });

  }


  if (window.location.pathname === "/auth/claim/studentclaim4a") {
    initStudents();
    initFlow();
  }

  if (window.location.pathname === "/auth/claim/studentclaim6") {
    initStudents();

    $(".pt-showIfNoStudentTFN").hide();

    if (!(localStorage.getItem('studentHasTFN')) && (localStorage.getItem('studentAge') > 15)) {
      $(".pt-showIfNoStudentTFN").show();
    }

    var businessDays = 5,
      counter = 1; // set to 1 to count from next business day
    while (businessDays > 0) {
      var tmp = new Date();
      tmp.setDate(tmp.getDate() + counter++);
      switch (tmp.getDay()) {
        case 0:
        case 6:
          break; // sunday & saturday
        default:
          businessDays--;
      };
    }

    document.querySelector(".pt-bussnessDaysOutcome").innerHTML = tmp.toDateString();
  }


  // PoC check docs required for prototype

  function Person() {
    // how many times is the called
    this.i = 0;

    this.studentAge;
    this.studentNameFirst;
    this.docsRequired = [];

    // privileged init method
    this.init();
  }

  // defining init method
  Person.prototype.init = function () {
    // reassign this
    var _this = this;
    _this.checkDocs();
    setInterval(function () {

      _this.checkDocs();
    }, 1500);
  };

  Person.prototype.checkDocs = function () {
    this.i++;

    // list of docs
    // Proof of relationship = proofOfRelationship
    // Proof of residence = proofOfResidence
    // Proof of enrolment = proofOfEnrolment
    // Part-time study reason = partTimeStudyReason
    // Tax file number declaration = tFNDeclaraion

    // check type of person 
    if (("studentFlow" in localStorage) || ("veteranFlow" in localStorage) || ("claimantFlow" in localStorage)) {

      if ("studentFlow" in localStorage) {
        this.type = 'student';
      } else if ("veteranFlow" in localStorage) {
        this.type = 'veteran';
      } else if ("claimantFlow" in localStorage) {
        this.type = 'claimant';
      }
    }


    // Proof of relationship 
    if ("veteranFlow" in localStorage) {
      if ((localStorage.getItem('studentNameFirst') !== null) && (localStorage.getItem('studentNameLast') !== null)) {
        initStudents();
        this.docsRequired.indexOf("proofOfRelationshipClaimantStudent") === -1 ? this.docsRequired.push("proofOfRelationshipClaimantStudent") : console.log();
      } else {
        var i = this.docsRequired.indexOf("proofOfRelationshipClaimantStudent");
        if (i != -1) {
          this.docsRequired.splice(i, 1);
          $('.pt-proofOfRelationshipClaimantStudent').addClass('display-none');
        }
      }
    } else if ("studentFlow" in localStorage) {
      if ((localStorage.getItem('veteranNameFirst') !== null) && (localStorage.getItem('veteranNameLast') !== null)) {
        this.docsRequired.indexOf("proofOfRelationship") === -1 ? this.docsRequired.push("proofOfRelationship") : console.log();
      } else {
        var i = this.docsRequired.indexOf("proofOfRelationship");
        if (i != -1) {
          this.docsRequired.splice(i, 1);
          $('.pt-proofOfRelationship').addClass('display-none');
        }
      }
    } else if ("claimantFlow" in localStorage) {
      if ((localStorage.getItem('veteranNameFirst') !== null) && (localStorage.getItem('veteranNameLast') !== null) && (localStorage.getItem('studentNameFirst') !== null) && (localStorage.getItem('studentNameLast') !== null)) {
        initStudents();
        if ((localStorage.getItem('veteranNameFirst') !== null) && (localStorage.getItem('veteranNameLast') !== null)) {
          this.docsRequired.indexOf("proofOfRelationshipVeteranStudent") === -1 ? this.docsRequired.push("proofOfRelationshipVeteranStudent") : console.log();
        } else {
          var i = this.docsRequired.indexOf("proofOfRelationshipVeteranStudent");
          if (i != -1) {
            this.docsRequired.splice(i, 1);
            $('.pt-proofOfRelationshipVeteranStudent').addClass('display-none');
          }
        }

        if ((localStorage.getItem('studentNameFirst') !== null) && (localStorage.getItem('studentNameLast') !== null)) {
          this.docsRequired.indexOf("proofOfRelationshipClaimantStudent") === -1 ? this.docsRequired.push("proofOfRelationshipClaimantStudent") : console.log();
        } else {
          var i = this.docsRequired.indexOf("proofOfRelationshipClaimantStudent");
          if (i != -1) {
            this.docsRequired.splice(i, 1);
            $('.pt-proofOfRelationshipClaimantStudent').addClass('display-none');
          }
        }
      }
    }


    // Proof of enrolment 
    if ("enrolStatus" in localStorage) {
      this.docsRequired.indexOf("proofOfEnrolment") === -1 ? this.docsRequired.push("proofOfEnrolment") : console.log();
    } else {

      var i = this.docsRequired.indexOf("proofOfEnrolment");
      if (i != -1) {
        this.docsRequired.splice(i, 1);
        $('.pt-proofOfEnrolment').addClass('display-none');
      }
    }

    // Proof of residence 
    if (localStorage.getItem('studentLivingLocation') === 'away-from-home') {
      this.docsRequired.indexOf("proofOfResidence") === -1 ? this.docsRequired.push("proofOfResidence") : console.log();
    } else {
      var i = this.docsRequired.indexOf("proofOfResidence");
      if (i != -1) {
        this.docsRequired.splice(i, 1);
        $('.pt-proofOfResidence').addClass('display-none');
      }
    }

    // Part-time study reason 
    if ((localStorage.getItem('studentLoadOfStudy') === 'part-time')) {
      this.docsRequired.indexOf("partTimeStudyReason") === -1 ? this.docsRequired.push("partTimeStudyReason") : console.log();
    } else {
      var i = this.docsRequired.indexOf("partTimeStudyReason");
      if (i != -1) {
        this.docsRequired.splice(i, 1);
        $('.pt-partTimeStudyReason').addClass('display-none');
      }
    }

    // show all required docs 
    if (this.docsRequired.length > 0) {
      jQuery(".pt-showIfDocumentUploadShoppingCart").show();
      $.each(this.docsRequired, function () {
        $('.pt-' + this).removeClass('display-none');
      });
    }

  };

  // create a new person
  var counter = new Person();





  $(".accordion__trigger").click(function () {

    $(this).toggleClass("accordion__trigger--open accordion__trigger--closed");
    $(this).closest(".accordion").toggleClass("accordion--closed accordion--open");

  });

  $('input[name=tax-file-number]').change(function () {
    if (this.value) {
      console.log('TFN set to: ', this.value);
      localStorage.setItem('tfn', this.value);
    } else {
      localStorage.removeItem('tfn');
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdHVkZW50cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTdHVkZW50IGNsYWltIHBhZ2VzXHJcbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCQpIHtcclxuXHJcbiAgLy8gYWxlcnQoJ3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZScgKyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xyXG5cclxuICBmdW5jdGlvbiBpbml0U3R1ZGVudHMoKSB7XHJcblxyXG4gICAgdmFyIHN0dWRlbnROYW1lRmlyc3QgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudE5hbWVGaXJzdCcpO1xyXG4gICAgLy8gZ2V0IHRoZSBuYW1lIGZyb20gc3RvcmFnZSBcclxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudE5hbWVGaXJzdCcpKSB7XHJcbiAgICAgIC8vIGFkZCAnXHJcbiAgICAgIHZhciBhcG9zdHJvcGhlID0gXCInXCI7XHJcbiAgICAgIC8vIGFkZCBzIHRvICcgaWYgc3R1ZGVudCdzIG5hbWUgZG9lc24ndCBlbmQgaW4gc1xyXG4gICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnROYW1lRmlyc3QnKS5zbGljZSgtMSkgIT09IFwic1wiKSB7XHJcbiAgICAgICAgYXBvc3Ryb3BoZSA9IGFwb3N0cm9waGUgKyBcInNcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBzdHVkZW50TmFtZUZpcnN0QXBvc3Ryb3BoZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudE5hbWVGaXJzdCcpICsgYXBvc3Ryb3BoZTtcclxuXHJcbiAgICAvLyBvbmx5IGZvciB2ZXRlcmFuIGFuZCBwYXJlbnQvZ3VhcmRpYW4gZmxvd3NcclxuICAgIGlmICgoXCJ2ZXRlcmFuRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkgfHwgKFwiY2xhaW1hbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSkge1xyXG5cclxuICAgICAgLy8gYm90aCBhcG9zdHJvcGhlZCBhbmQgc3RyYWlnaHQgbmFtZXMgYXJlIHVzZWQgaW4gdGhlIHNjcmVlbnMgXHJcbiAgICAgICQoXCIuc3R1ZGVudE5hbWVGaXJzdEFwb3N0cm9waGVkXCIpLmh0bWwoc3R1ZGVudE5hbWVGaXJzdEFwb3N0cm9waGVkKTtcclxuICAgICAgJChcIi5zdHVkZW50TmFtZUZpcnN0XCIpLmh0bWwobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnROYW1lRmlyc3QnKSk7XHJcblxyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQoXCIuc3R1ZGVudE5hbWVGaXJzdEFwb3N0cm9waGVkXCIpLmh0bWwoJycpO1xyXG4gICAgICAkKFwiLnN0dWRlbnROYW1lRmlyc3RcIikuaHRtbCgnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUHVsbCBpbiB0aGUganNvbiBjb250ZW50IFxyXG4gICAgJC5hamF4KHtcclxuICAgICAgdXJsOiAnL2RvY3MvZGF0YS9zdHVkZW50LWNsYWltLWNvbnRlbnQuanNvbicsXHJcbiAgICAgIGFzeW5jOiBmYWxzZSxcclxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgIH0pLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKCdDb250ZW50IGRhdGEgYmFjaycpO1xyXG5cclxuICAgICAgdmFyIGNvbnRlbnRTZXQgPSBbXTtcclxuICAgICAgdmFyIGNvbnRlbnRWZXRlcmFuID0gW107XHJcbiAgICAgIHZhciBjb250ZW50U3R1ZGVudCA9IFtdO1xyXG4gICAgICB2YXIgY29udGVudFBhcmVudEd1YXJkaWFuID0gW107XHJcbiAgICAgIHZhciBjb250ZW50TWVzc2FnZXMgPSBbXTtcclxuXHJcbiAgICAgICQuZWFjaChkYXRhLmNvbnRlbnRzLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgaWYgKGVsZW1lbnQudmV0ZXJhbikge1xyXG4gICAgICAgICAgY29udGVudFZldGVyYW4gPSBlbGVtZW50LnZldGVyYW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlbGVtZW50LnBhcmVudEd1YXJkaWFuKSB7XHJcbiAgICAgICAgICBjb250ZW50UGFyZW50R3VhcmRpYW4gPSBlbGVtZW50LnBhcmVudEd1YXJkaWFuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZWxlbWVudC5zdHVkZW50KSB7XHJcbiAgICAgICAgICBjb250ZW50U3R1ZGVudCA9IGVsZW1lbnQuc3R1ZGVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVsZW1lbnQubWVzc2FnZXMpIHtcclxuICAgICAgICAgIGNvbnRlbnRNZXNzYWdlcyA9IGVsZW1lbnQubWVzc2FnZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoXCJ2ZXRlcmFuRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG5cclxuICAgICAgICBjb250ZW50U2V0ID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGVudE1lc3NhZ2VzLCBjb250ZW50VmV0ZXJhbik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChcImNsYWltYW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG5cclxuICAgICAgICBjb250ZW50U2V0ID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGVudE1lc3NhZ2VzLCBjb250ZW50UGFyZW50R3VhcmRpYW4pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoXCJzdHVkZW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG5cclxuICAgICAgICBjb250ZW50U2V0ID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGVudE1lc3NhZ2VzLCBjb250ZW50U3R1ZGVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAodmFyIGtleSBpbiBjb250ZW50U2V0KSB7XHJcbiAgICAgICAgdmFyIGNvbnRlbnQgPSBjb250ZW50U2V0W2tleV0ucmVwbGFjZSgve3tzdHVkZW50TmFtZUZpcnN0QXBvc3Ryb3BoZWR9fS9nLCBzdHVkZW50TmFtZUZpcnN0QXBvc3Ryb3BoZWQpO1xyXG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoL3t7c3R1ZGVudE5hbWVGaXJzdH19L2csIHN0dWRlbnROYW1lRmlyc3QpO1xyXG4gICAgICAgICQoXCIjcXVlc3Rpb25fXCIgKyBrZXkpLmh0bWwoY29udGVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRGbG93KCkge1xyXG4gICAgaWYgKFwidmV0ZXJhbkZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgJChcIi5wdC1mbG93LS12ZXRlcmFuXCIpLnNob3coXCJmYXN0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcInN0dWRlbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICQoXCIucHQtZmxvdy0tc3R1ZGVudFwiKS5zaG93KFwiZmFzdFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXCJjbGFpbWFudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgJChcIi5wdC1mbG93LS1jbGFpbWFudFwiKS5zaG93KFwiZmFzdFwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIFRPRE86OiBoYW5kbGUgcmVzZXQgaWYgY2hhbmdlIG9mIGFnZSBhZnRlciBvdGhlciBmbG93c1xyXG4gIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09IFwiL2F1dGgvY2xhaW0vc3R1ZGVudHByZWVsaWdpYmlsaXR5XCIpIHtcclxuXHJcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuXHJcbiAgICAvLyBub3cgaW4gbWFpblxyXG4gICAgLy8gdmFyIGdldFVybFBhcmFtZXRlciA9IGZ1bmN0aW9uIGdldFVybFBhcmFtZXRlcihzUGFyYW0pIHtcclxuICAgIC8vICAgdmFyIHNQYWdlVVJMID0gZGVjb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpKSxcclxuICAgIC8vICAgICBzVVJMVmFyaWFibGVzID0gc1BhZ2VVUkwuc3BsaXQoJyYnKSxcclxuICAgIC8vICAgICBzUGFyYW1ldGVyTmFtZSxcclxuICAgIC8vICAgICBpO1xyXG5cclxuICAgIC8vICAgZm9yIChpID0gMDsgaSA8IHNVUkxWYXJpYWJsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgIC8vICAgICBzUGFyYW1ldGVyTmFtZSA9IHNVUkxWYXJpYWJsZXNbaV0uc3BsaXQoJz0nKTtcclxuXHJcbiAgICAvLyAgICAgaWYgKHNQYXJhbWV0ZXJOYW1lWzBdID09PSBzUGFyYW0pIHtcclxuICAgIC8vICAgICAgIHJldHVybiBzUGFyYW1ldGVyTmFtZVsxXSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHNQYXJhbWV0ZXJOYW1lWzFdO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgfVxyXG4gICAgLy8gfTtcclxuXHJcbiAgICB2YXIgZmxvdyA9IGdldFVybFBhcmFtZXRlcignZmxvdycpO1xyXG4gICAgdmFyIGFnZSA9IGdldFVybFBhcmFtZXRlcignc3R1ZGVudEFnZScpO1xyXG4gICAgdmFyIGRvY1VwbG9hZHMgPSBnZXRVcmxQYXJhbWV0ZXIoJ2RvY1VwbG9hZHMnKTtcclxuICAgIHZhciBhY3QgPSBnZXRVcmxQYXJhbWV0ZXIoJ2FjdCcpO1xyXG5cclxuXHJcbiAgICBjb25zb2xlLmxvZygnZmxvdyA9ICcgKyBmbG93KTtcclxuXHJcbiAgICBpZiAoZmxvdykge1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShmbG93LCB0cnVlKTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Zsb3cnLCBmbG93KTtcclxuICAgICAgaWYgKGFnZSkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50QWdlJywgYWdlKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZG9jVXBsb2Fkcykge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkb2NVcGxvYWRzJywgZG9jVXBsb2Fkcyk7XHJcbiAgICAgIH0gZWxzZSB7IC8vIHNldHRpbmcgYWxsIGZsb3dzIHRvIHNob3BwaW5nIGNhcmQgdXBsb2FkcyBieSBkZWZhdWx0IFxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkb2NVcGxvYWRzJywgJ3Nob3BwaW5nJyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGFjdCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY3QnLCBhY3QpO1xyXG4gICAgICB9IGVsc2UgeyAvLyBzZXR0aW5nIGV2ZXJ5b25lIHRvIG1yY2EgaWYgbm90IHNwZWNpZmllZCBcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWN0JywgJ21yY2EnKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gYWxlcnQoJ1RoZSBwcm90b3R5cGUgcmVxdWlyZXMgYSBmbG93IGFuZCBhZ2UgaW4gdGhlIHVybCBzdHJpbmcgZS5nLiAgJyArIGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmhvc3QgKyBsb2NhdGlvbi5wYXRobmFtZSArICc/Zmxvdz1zdHVkZW50RmxvdyZzdHVkZW50QWdlPTEwJylcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZmxvdyAhPT0gKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmbG93JykpKSB7XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFN0dWRlbnRzKCk7XHJcblxyXG5cclxuICAgIGlmIChcInZldGVyYW5GbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XHJcblxyXG4gICAgICAvLyBhbGVydCgnaW0gdmV0Jyk7XHJcblxyXG4gICAgICAkKFwiLnB0LWZsb3ctLXZldGVyYW5cIikuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcInN0dWRlbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICQoXCIucHQtZmxvdy0tc3R1ZGVudFwiKS5zaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFwiY2xhaW1hbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICQoXCIucHQtZmxvdy0tY2xhaW1hbnRcIikuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdsb2FkaW5nIGluaXQnKTtcclxuXHJcbiAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudFNob3VsZENsYWltVGhlbXNlbHZlc1wiKS5oaWRlKCk7XHJcbiAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudFVuZGVyMThcIikuaGlkZSgpO1xyXG4gICAgICAkKFwiLnB0LXNob3dJZkNlbnRyZWxpbmtDdXN0b21lclwiKS5oaWRlKCk7XHJcbiAgICAgICQoXCIucHQtc2hvd0lmWW91ckZUQlwiKS5oaWRlKCk7XHJcbiAgICAgICQoXCIucHQtc2hvd0lmU29tZW9uZUVsc2VGVEJcIikuaGlkZSgpO1xyXG4gICAgICAkKFwiLnB0LXNob3dJZk5vRlRCXCIpLmhpZGUoKTtcclxuICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50QmV0d2VlbjE2YW5kMThcIikuaGlkZSgpO1xyXG4gICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRVbmRlcjBcIikuaGlkZSgpO1xyXG4gICAgICAkKFwiLnB0LXNob3dJZk5vVEZOXCIpLmhpZGUoKTtcclxuICAgICAgJChcIi5wdC1zaG93RlRCSXNCZXN0XCIpLmhpZGUoKTtcclxuICAgICAgJCgnLnB0LXNob3dJZk1SQ0EnKS5oaWRlKCk7XHJcbiAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudEZ1bGxUaW1lQW5kTVJDQVwiKS5oaWRlKCk7XHJcbiAgICAgICQoXCIucHQtdmV0U2hvd0lmU3R1ZGVudEZ1bGxUaW1lQW5kTVJDQVwiKS5oaWRlKCk7XHJcbiAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudENvbmZpcm1lZFwiKS5oaWRlKCk7XHJcbiAgICAgICQoJy5wdC1zaG93SWZFbmdhZ2VkSW5GdWxsVGltZUVtcGxveW1lbnQnKS5oaWRlKCk7XHJcbiAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudERlcGVuZGFudE9uVmV0ZXJhblwiKS5oaWRlKCk7XHJcbiAgICAgICQoJy5wdC1zaG93SWZSZWxhdGlvbnNoaXBWYWxpZCcpLmhpZGUoKTtcclxuICAgICAgJCgnLnB0LXN0dWRlbnRGdWxsVGltZScpLmhpZGUoKTtcclxuICAgICAgJCgnLnB0LXNob3dJZlN0dWRlbnRDYW50Q2xhaW0nKS5oaWRlKCk7XHJcbiAgICAgICQoJy5wdC1zaG93SWZTdHVkZW50Tm90RGVwZW5kYW50JykuaGlkZSgpO1xyXG4gICAgICAkKCcucHQtYWJvdXRZb3UnKS5oaWRlKCk7XHJcbiAgICAgICQoJy5wdC1zdHVkZW50T3ZlcjI1JykuaGlkZSgpO1xyXG4gICAgICAkKCcucHQtc3R1ZGVudFRvb3lvdW5nJykuaGlkZSgpO1xyXG4gICAgICAkKCcucHQtVmV0ZXJhblJlbGF0aW9uc2hpcFRvU3R1ZGVudCcpLmhpZGUoKTtcclxuICAgICAgJChcIi5wdC1TdHVkZW50UmVsYXRpb25zaGlwVG9WZXRlcmFuXCIpLmhpZGUoKTtcclxuICAgICAgJChcIi5wdC1TdHVkZW50UmVsYXRpb25zaGlwVG9DbGFpbWFudFwiKS5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVzZXRGb3JtKCRmb3JtKSB7XHJcblxyXG4gICAgICAkKCdpbnB1dFt0eXBlPXJhZGlvXTpjaGVja2VkJykubm90KCdpbnB1dFt0eXBlPXJhZGlvXVtuYW1lPWNvbmZpcm1TdHVkZW50T3JDbGFpbWFudF0nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKTtcclxuXHJcblxyXG5cclxuICAgICQoJ2lucHV0W25hbWU9ZlRCWW91XScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPWZUQllvdV06Y2hlY2tlZCcpLnZhbCgpID09PSAneWVzJykge1xyXG5cclxuICAgICAgICAkKFwiLnB0LXNob3dJZllvdXJGVEJcIikuc2hvdygpO1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmU29tZW9uZUVsc2VGVEJcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmQ2VudHJlbGlua0N1c3RvbWVyXCIpLnNob3coKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndmV0ZXJhblJlY2VpdmVzRlRCJyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ZldGVyYW5SZWNlaXZlc0ZUQicsIHRydWUpO1xyXG5cclxuICAgICAgICBpZiAoKFwidmV0ZXJhbkZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHx8IChcImNsYWltYW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkpIHtcclxuICAgICAgICAgIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA8PSAxOCkgJiYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPiAxNSkpIHtcclxuICAgICAgICAgICAgJChcIi5wdC1zaG93RlRCSXNCZXN0XCIpLnNob3coKTtcclxuXHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKFwidmV0ZXJhbkZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpKSB7XHJcbiAgICAgICAgICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPD0gMTgpICYmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudEFnZScpID4gMTUpKSB7XHJcblxyXG4gICAgICAgICAgICAkKFwiLnB0LXZldFN0dWRlbnRFbmdhZ2VkSW5GdWxsVGltZUVtcGxveW1lbnRcIikuc2hvdygpO1xyXG5cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEoXCJjbGFpbWFudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpKSB7XHJcbiAgICAgICAgICAvLyBpZiBzdHVkZW50IDE2IG9yIDE3IGFzayBmb3IgVEZOXHJcbiAgICAgICAgICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPD0gMTgpICYmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudEFnZScpID4gMTUpKSB7XHJcbiAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudEJldHdlZW4xNmFuZDE4XCIpLnNob3coKTtcclxuXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRCZXR3ZWVuMTZhbmQxOFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKFwiLnB0LXNob3dJZllvdXJGVEJcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmU29tZW9uZUVsc2VGVEJcIikuc2hvdygpO1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmQ2VudHJlbGlua0N1c3RvbWVyXCIpLmhpZGUoKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndmV0ZXJhblJlY2VpdmVzRlRCJyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ZldGVyYW5SZWNlaXZlc0ZUQicsIGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAkKCdpbnB1dFtuYW1lPWZUQlNvbWVvbmVFbHNlXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPWZUQlNvbWVvbmVFbHNlXTpjaGVja2VkJykudmFsKCkgPT09ICd5ZXMnKSB7XHJcblxyXG4gICAgICAgICQoXCIucHQtc2hvd0lmTm9GVEJcIikuc2hvdygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmTm9GVEJcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmQ2VudHJlbGlua0N1c3RvbWVyXCIpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgLy8gaWYgc3R1ZGVudCAxNiBvciAxNyBhc2sgZm9yIFRGTlxyXG4gICAgICAgIGlmICghKFwiY2xhaW1hbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSkge1xyXG4gICAgICAgICAgaWYgKChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudEFnZScpIDw9IDE4KSAmJiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDE1KSkge1xyXG4gICAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRCZXR3ZWVuMTZhbmQxOFwiKS5zaG93KCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRCZXR3ZWVuMTZhbmQxOFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChcInZldGVyYW5GbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICAgICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPCAxOCkgJiYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPiAxNSkpIHtcclxuICAgICAgICAgICAgJChcIi5wdC12ZXRTdHVkZW50RW5nYWdlZEluRnVsbFRpbWVFbXBsb3ltZW50XCIpLnNob3coKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJ2lucHV0W25hbWU9ZW5nYWdlZEluRnVsbFRpbWVFbXBsb3ltZW50XScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPWVuZ2FnZWRJbkZ1bGxUaW1lRW1wbG95bWVudF06Y2hlY2tlZCcpLnZhbCgpID09PSAneWVzJykge1xyXG4gICAgICAgIGlmICgoXCJ2ZXRlcmFuRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkpIHtcclxuICAgICAgICAgICQoXCIucHQtdmV0U2hvd0lmU3R1ZGVudEZ1bGxUaW1lQW5kTVJDQVwiKS5zaG93KCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRGdWxsVGltZUFuZE1SQ0FcIikuc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKFwiLnB0LXZldFNob3dJZlN0dWRlbnRGdWxsVGltZUFuZE1SQ0FcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudEZ1bGxUaW1lQW5kTVJDQVwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5wdC1TdHVkZW50UmVsYXRpb25zaGlwVG9WZXRlcmFuXCIpLnNob3coKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoKFwidmV0ZXJhbkZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpKSB7XHJcbiAgICAgICAgJChcIi5wdC1maW5hbC10b2dnbGVcIikuc2hvdygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgc3R1ZGVudCBhZ2VcclxuICAgICQoXCIucHQtc3R1ZGVudC1kb2IgPiA6aW5wdXRcIikua2V5dXAoZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgZG9iRGF5ID0gJChcIiNkZC1kYXRlXCIpLnZhbCgpO1xyXG4gICAgICB2YXIgZG9iTW9udGggPSAkKFwiI21tLWRhdGVcIikudmFsKCk7XHJcbiAgICAgIHZhciBkb2JZZWFyID0gJChcIiN5eXl5LWRhdGVcIikudmFsKCk7XHJcblxyXG4gICAgICAvLyBpZiBhIHZhbGlkIGRhdGVcclxuICAgICAgaWYgKGRvYkRheSAmJiBkb2JNb250aCAmJiAoZG9iWWVhci5sZW5ndGggPT09IDQpKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKGRvYkRheS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgIGRvYkRheSA9IFwiMFwiICsgZG9iRGF5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZG9iTW9udGgubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICBkb2JNb250aCA9IFwiMFwiICsgZG9iTW9udGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBkb2IgPSBkb2JZZWFyICsgJy0nICsgZG9iTW9udGggKyAnLScgKyBkb2JEYXk7XHJcblxyXG4gICAgICAgIGRvYiA9IG5ldyBEYXRlKGRvYik7XHJcbiAgICAgICAgdmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAgICAgICB2YXIgYWdlID0gTWF0aC5mbG9vcigodG9kYXkgLSBkb2IpIC8gKDM2NS4yNSAqIDI0ICogNjAgKiA2MCAqIDEwMDApKTtcclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRBZ2UnKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudEFnZScsIGFnZSk7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1Zygnc3R1ZGVudCBhZ2U6ICcsIGFnZSk7XHJcblxyXG4gICAgICAgIC8vIHZhbGlkYXRpb246OiBvbGRlciB0aGFuIDVcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA8IDUpIHtcclxuICAgICAgICAgIGluaXQoKTtcclxuICAgICAgICAgIHJlc2V0Rm9ybSgkKCcjcHQtZm9ybScpKTtcclxuICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudFVuZGVyMFwiKS5zaG93KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdzdHVkZW50IGlzIG9sZGVyIHRoYW4gNCcpO1xyXG4gICAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50VW5kZXIwXCIpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAvLyB2ZXRlcmFuIGFuZCBjbGFpbWFudCBmbG93IG9ubHlcclxuICAgICAgICAgIGlmICgoXCJ2ZXRlcmFuRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmIG92ZXIgMTgsIHN1Z2dlc3Qgc3R1ZGVudCBjbGFpbXMgb24gdGhlaXIgb3duIFxyXG4gICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDI0KSB7XHJcbiAgICAgICAgICAgICAgaW5pdCgpO1xyXG4gICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudENhbnRDbGFpbVwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDE3KSB7XHJcblxyXG4gICAgICAgICAgICAgIGluaXQoKTtcclxuICAgICAgICAgICAgICByZXNldEZvcm0oJCgnI3B0LWZvcm0nKSk7XHJcbiAgICAgICAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50U2hvdWxkQ2xhaW1UaGVtc2VsdmVzXCIpLnNob3coKTtcclxuICAgICAgICAgICAgICAvLyAkKFwiLnB0LXNob3dJZlN0dWRlbnRVbmRlcjE4XCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpbml0KCk7XHJcbiAgICAgICAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50U2hvdWxkQ2xhaW1UaGVtc2VsdmVzXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAkKFwiLnB0LVZldGVyYW5SZWxhdGlvbnNoaXBUb1N0dWRlbnRcIikuc2hvdygpO1xyXG4gICAgICAgICAgICAgICQoXCIucHQtU3R1ZGVudFJlbGF0aW9uc2hpcFRvVmV0ZXJhblwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50VW5kZXIxOFwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgLy8gJChcIi5wdC1jbGFpbWFudFNob3dJZlN0dWRlbnRPdmVyMTZcIikuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT12ZXRlcmFuU2lnbmlmaWNhbnRseUluanVyZWRdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT12ZXRlcmFuU2lnbmlmaWNhbnRseUluanVyZWRdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcclxuICAgICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudE5vdERlcGVuZGFudFwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudE5vdERlcGVuZGFudFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBjbGFpbWFudCBmbG93IG9ubHlcclxuICAgICAgICAgIGlmIChcImNsYWltYW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDI0KSB7XHJcbiAgICAgICAgICAgICAgaW5pdCgpO1xyXG4gICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudENhbnRDbGFpbVwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDE3KSB7XHJcbiAgICAgICAgICAgICAgaW5pdCgpO1xyXG4gICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudFNob3VsZENsYWltVGhlbXNlbHZlc1wiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgLy8gJChcIi5wdC1zaG93SWZTdHVkZW50VW5kZXIxOFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPiAxNSkgJiYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPD0gMTgpKSB7XHJcbiAgICAgICAgICAgICAgaW5pdCgpO1xyXG4gICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudFNob3VsZENsYWltVGhlbXNlbHZlc1wiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgJChcIi5wdC1jbGFpbWFudFNob3dJZlN0dWRlbnRPdmVyMTZcIikuc2hvdygpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIHVuZGVyIDE2XHJcbiAgICAgICAgICAgICAgaW5pdCgpO1xyXG4gICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmRW5nYWdlZEluRnVsbFRpbWVFbXBsb3ltZW50XCIpLnNob3coKTtcclxuICAgICAgICAgICAgICAkKFwiLnB0LVN0dWRlbnRSZWxhdGlvbnNoaXBUb1ZldGVyYW5cIikuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT12ZXRlcmFuU2lnbmlmaWNhbnRseUluanVyZWRdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT12ZXRlcmFuU2lnbmlmaWNhbnRseUluanVyZWRdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcclxuICAgICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudFVuZGVyMThcIikuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5wdC1TdHVkZW50UmVsYXRpb25zaGlwVG9DbGFpbWFudFwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnB0LWFib3V0WW91XCIpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudE5vdERlcGVuZGFudFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudFVuZGVyMThcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5wdC1hYm91dFlvdVwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnROb3REZXBlbmRhbnRcIikuc2hvdygpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjcmVsYXRpb25zaGlwVG9TdHVkZW50XCIpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICB2YXIgc2VsZWN0ZWRfb3B0aW9uID0gJCgnI3JlbGF0aW9uc2hpcFRvU3R1ZGVudCcpLnZhbCgpO1xyXG5cclxuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3JlbGF0aW9uc2hpcFR5cGUnKTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlbGF0aW9uc2hpcFR5cGUnLCBzZWxlY3RlZF9vcHRpb24pO1xyXG5cclxuICAgICAgaWYgKFwiY2xhaW1hbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XHJcblxyXG4gICAgICAgIGlmICgoc2VsZWN0ZWRfb3B0aW9uID09PSAnYWRvcHRpdmUtcGFyZW50JykgfHwgKHNlbGVjdGVkX29wdGlvbiA9PT0gJ3BhcmVudCcpKSB7XHJcblxyXG4gICAgICAgICAgJCgnLnB0LXNob3dJZlJlbGF0aW9uc2hpcFZhbGlkJykuaGlkZSgpO1xyXG4gICAgICAgICAgJCgnI3JlbGF0aW9uc2hpcFRvU3R1ZGVudE90aGVyJykuaGlkZSgpO1xyXG4gICAgICAgICAgJCgnLnB0LXNob3dJZlN0dWRlbnREZXBlbmRhbnRPblZldGVyYW4nKS5zaG93KCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRfb3B0aW9uID09PSAnb3RoZXInKSB7XHJcbiAgICAgICAgICAkKCcjcmVsYXRpb25zaGlwVG9TdHVkZW50T3RoZXInKS5zaG93KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICQoJy5wdC1zaG93SWZSZWxhdGlvbnNoaXBWYWxpZCcpLnNob3coKTtcclxuICAgICAgICAgICQoJyNyZWxhdGlvbnNoaXBUb1N0dWRlbnRPdGhlcicpLmhpZGUoKTtcclxuICAgICAgICAgICQoJy5wdC1zaG93SWZTdHVkZW50RGVwZW5kYW50T25WZXRlcmFuJykuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkX29wdGlvbiA9PT0gJ290aGVyJykge1xyXG4gICAgICAgICAgJCgnI3JlbGF0aW9uc2hpcFRvU3R1ZGVudE90aGVyJykuc2hvdygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkKCcjcmVsYXRpb25zaGlwVG9TdHVkZW50T3RoZXInKS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gY29uZmlybSBzdHVkZW50IG9yIGNsYWltYW50XHJcbiAgICAkKCdpbnB1dFtuYW1lPWNvbmZpcm1TdHVkZW50T3JDbGFpbWFudF0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAvLyBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuXHJcblxyXG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1jb25maXJtU3R1ZGVudE9yQ2xhaW1hbnRdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ2d1YXJkaWFuJykge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50RmxvdycpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50Rmxvd0NvbmZpcm1lZCcpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGFpbWFudEZsb3cnLCB0cnVlKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2xhaW1hbnRGbG93Q29uZmlybWVkJywgdHJ1ZSk7XHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgICAgICAkKFwiLnB0LXN0dWRlbnQtZG9iXCIpLnNob3coKTtcclxuXHJcbiAgICAgICAgaW5pdFN0dWRlbnRzKCk7XHJcblxyXG4gICAgICB9IGVsc2UgaWYgKCQoJ2lucHV0W25hbWU9Y29uZmlybVN0dWRlbnRPckNsYWltYW50XTpjaGVja2VkJykudmFsKCkgPT09ICdzdHVkZW50Jykge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjbGFpbWFudEZsb3dDb25maXJtZWQnKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY2xhaW1hbnRGbG93Jyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRGbG93JywgdHJ1ZSk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRGbG93Q29uZmlybWVkJywgdHJ1ZSk7XHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgICAgICQoXCIucHQtc3R1ZGVudC1kb2JcIikuaGlkZSgpO1xyXG4gICAgICAgICQoJy5wdC1zdHVkZW50RnVsbFRpbWUnKS5zaG93KCk7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50Q29uZmlybWVkXCIpLnNob3coKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2cobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSk7XHJcblxyXG4gICAgICAgIC8vIFNob3cgd2FybmluZyBlbGlnaWJpbGl0eSBtZXNzYWdlIGlmIHN0dWRlbnQgaXMgb3ZlciAyNS5cclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDI0KSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnb3ZlciAyNScpO1xyXG4gICAgICAgICAgJChcIi5wdC1zdHVkZW50T3ZlcjI1XCIpLnNob3coKTtcclxuICAgICAgICAgICQoXCIucHQtc3R1ZGVudFRvb3lvdW5nXCIpLmhpZGUoKTtcclxuICAgICAgICAgICQoJy5wdC1zdHVkZW50RnVsbFRpbWUnKS5zaG93KCk7XHJcbiAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRDb25maXJtZWRcIikuc2hvdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2hvdyBlcnJvciBtZXNzYWdlIGlmIHN0dWRlbnQgaXMgdW5kZXIgMTZcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA8IDE2KSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygndW5kZXIgMTYnKTtcclxuICAgICAgICAgICQoXCIucHQtc3R1ZGVudFRvb3lvdW5nXCIpLnNob3coKTtcclxuICAgICAgICAgICQoJy5wdC1zdHVkZW50RnVsbFRpbWUnKS5oaWRlKCk7XHJcbiAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRDb25maXJtZWRcIikuaGlkZSgpO1xyXG4gICAgICAgICAgJChcIi5wYWdpbmF0aW9uXCIpLmZpbmQoJy5idG5OZXh0JykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXRTdHVkZW50cygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXNldEZvcm0oJCgnI3B0LWZvcm0nKSk7XHJcblxyXG5cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdpbnB1dFtuYW1lPWVuZ2FnZWRJbkZ1bGxUaW1lRW1wbG95bWVudF0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9ZW5nYWdlZEluRnVsbFRpbWVFbXBsb3ltZW50XTpjaGVja2VkJykudmFsKCkgPT09ICd5ZXMnKSB7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICghKFwidmV0ZXJhbkZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpKSB7XHJcblxyXG4gICAgICAgICAgJCgnLnB0LXNob3dJZkVuZ2FnZWRJbkZ1bGxUaW1lRW1wbG95bWVudCcpLnNob3coKTtcclxuICAgICAgICAgIGlmICghKFwiY2xhaW1hbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSkge1xyXG4gICAgICAgICAgICAkKCcucHQtc2hvd0lmUmVsYXRpb25zaGlwVmFsaWQnKS5zaG93KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIShcInN0dWRlbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnREZXBlbmRhbnRPblZldGVyYW5dJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9c3R1ZGVudERlcGVuZGFudE9uVmV0ZXJhbl06Y2hlY2tlZCcpLnZhbCgpID09PSAneWVzJykge1xyXG4gICAgICAgICQoJy5wdC1zaG93SWZTdHVkZW50Tm90RGVwZW5kYW50JykuaGlkZSgpO1xyXG4gICAgICAgICQoJy5wdC1zaG93SWZTdHVkZW50RGVwZW5kYW50T25WZXRlcmFuJykuc2hvdygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAkKCcucHQtc2hvd0lmU3R1ZGVudE5vdERlcGVuZGFudCcpLnNob3coKTtcclxuICAgICAgICAkKCcucHQtc2hvd0lmU3R1ZGVudERlcGVuZGFudE9uVmV0ZXJhbicpLmhpZGUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcblxyXG4gIC8vIEFsbCBzdHVkZW50IHBhZ2VzIFxyXG4gIGlmICh3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKFwic3R1ZGVudFwiKSA+IC0xKSB7XHJcblxyXG4gICAgY29uc29sZS5sb2coJ0FsbCBzdHVkZW50IHBhZ2VzJyk7XHJcblxyXG4gICAgJChcIi5wdC1zaG93SWZEb2N1bWVudFVwbG9hZFNob3BwaW5nQ2FydFwiKS5oaWRlKCk7XHJcbiAgICAkKFwiLnB0LWZpbmFsLXRvZ2dsZVwiKS5oaWRlKCk7XHJcblxyXG5cclxuXHJcbiAgICAkKCdpbnB1dFtuYW1lPWRvZXNTdHVkZW50SGF2ZVRGTl0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjdCcpID09PSAnbXJjYScpIHtcclxuICAgICAgICAkKCcucHQtc2hvd0lmTVJDQScpLnNob3coKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9ZG9lc1N0dWRlbnRIYXZlVEZOXTpjaGVja2VkJykudmFsKCkgPT09ICd5ZXMnKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRIYXNURk4nKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudEhhc1RGTicsIHRydWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50SGFzVEZOJyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3RmbicpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICQoXCIudXBsb2FkLWxpc3RcIikuc2hvdygpO1xyXG4gIH1cclxuXHJcbiAgLy8gUGFnZSAxXHJcbiAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gXCIvYXV0aC9jbGFpbS9zdHVkZW50Y2xhaW0xXCIpIHtcclxuXHJcbiAgICBpbml0U3R1ZGVudHMoKTtcclxuICAgIGluaXRGbG93KCk7XHJcblxyXG4gICAgJChcIi5wdC1zdHVkZW50QWdlLS1tYXR1cmVcIikuaGlkZSgpO1xyXG4gICAgJChcIi5wdC1zaG93SWZTdHVkZW50TGl2aW5nQXRIb21lXCIpLmhpZGUoKTtcclxuICAgICQoXCIucHQtc3R1ZGVudExpdmluZ1NhbWVBZGRyZXNzXCIpLmhpZGUoKTtcclxuICAgICQoXCIucHQtc3R1ZGVudExpdmluZ1dpdGhQYXJ0bmVyTGVzc1JhdGVcIikuaGlkZSgpO1xyXG4gICAgJChcIi5wdC1zaG93TGl2aW5nTG9jYXRpb25cIikuaGlkZSgpO1xyXG4gICAgJChcIi51cGxvYWQtbGlzdFwiKS5zaG93KCk7XHJcbiAgICAkKFwiLnB0LXNob3dJZkxpdmluZ0F3YXlGcm9tSG9tZVwiKS5oaWRlKCk7XHJcbiAgICAkKFwiLnB0LXNob3dJZkRvY3VtZW50VXBsb2FkU2hvcHBpbmdDYXJ0XCIpLmhpZGUoKTtcclxuICAgICQoXCIucHQtcGFydG5lcmVkUmVsYXRpb25zaGlwXCIpLmhpZGUoKTtcclxuICAgICQoXCIucHQtbGl2aW5nV2l0aFBhcnRuZXJcIikuaGlkZSgpO1xyXG5cclxuICAgIC8vIGlmICh0cnVlKSB7XHJcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDE1KSB7XHJcblxyXG4gICAgICBpZiAoXCJzdHVkZW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgICQoXCIucHQtc3R1ZGVudEFnZS0tbWF0dXJlXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgaWYgKCQodGhpcykuaXMoXCIucHQtZmxvdy0tc3R1ZGVudFwiKSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnNob3coXCJmYXN0XCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoXCJ2ZXRlcmFuRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgICQoXCIucHQtc3R1ZGVudEFnZS0tbWF0dXJlXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgaWYgKCQodGhpcykuaXMoXCIucHQtZmxvdy0tdmV0ZXJhblwiKSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnNob3coXCJmYXN0XCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoXCJjbGFpbWFudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICAkKFwiLnB0LXN0dWRlbnRBZ2UtLW1hdHVyZVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiLnB0LWZsb3ctLWNsYWltYW50XCIpKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuc2hvdyhcImZhc3RcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICAkKFwiI3ZldGVyYW5OYW1lRmlyc3RcIikuZm9jdXNvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbCgpKSB7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndmV0ZXJhbk5hbWVGaXJzdCcpO1xyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ZldGVyYW5OYW1lRmlyc3QnLCAkKHRoaXMpLnZhbCgpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3ZldGVyYW5OYW1lRmlyc3QnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJChcIiN2ZXRlcmFuTmFtZUxhc3RcIikuZm9jdXNvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbCgpKSB7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndmV0ZXJhbk5hbWVMYXN0Jyk7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndmV0ZXJhbk5hbWVMYXN0JywgJCh0aGlzKS52YWwoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd2ZXRlcmFuTmFtZUxhc3QnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJChcIi5wdC1zdHVkZW50QWdlLS1tYXR1cmVcIikuaGlkZShcInNsb3dcIik7XHJcbiAgICB9XHJcblxyXG4gICAgJChcIi5wdC1wYXJ0bmVyZWRSZWxhdGlvbnNoaXBcIikuaGlkZSgpO1xyXG5cclxuICAgIC8vIGV4dHJhIGRldGFpbHMgZm9yIHN0dWRlbnRzIFxyXG4gICAgaWYgKChcInN0dWRlbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB8fCBcImNsYWltYW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAkKCcuYnRuTmV4dCcpLnByb3AoJ29uY2xpY2snLCBudWxsKTtcclxuICAgICAgJCgnLmJ0bk5leHQnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2F1dGgvY2xhaW0vc3R1ZGVudGNsYWltMWEnO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgJCgnaW5wdXRbbmFtZT1nZW5kZXJdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPiAxNSkge1xyXG4gICAgICAgICQoXCIucHQtcGFydG5lcmVkUmVsYXRpb25zaGlwXCIpLnNob3coKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKFwiLnB0LXNob3dMaXZpbmdMb2NhdGlvblwiKS5zaG93KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZmlyc3ROYW1lXCIpLmZvY3Vzb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKCQodGhpcykudmFsKCkpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudE5hbWVGaXJzdCcpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TmFtZUZpcnN0JywgJCh0aGlzKS52YWwoKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnROYW1lRmlyc3QnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNsYXN0TmFtZVwiKS5mb2N1c291dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmICgkKHRoaXMpLnZhbCgpKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnROYW1lTGFzdCcpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TmFtZUxhc3QnLCAkKHRoaXMpLnZhbCgpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudE5hbWVMYXN0Jyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nTG9jYXRpb25dJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdMb2NhdGlvbicsICQoJ2lucHV0W25hbWU9c3R1ZGVudExpdmluZ0xvY2F0aW9uXTpjaGVja2VkJykudmFsKCkpO1xyXG5cclxuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9c3R1ZGVudExpdmluZ0xvY2F0aW9uXTpjaGVja2VkJykudmFsKCkgPT09ICdob21lbGVzcycpIHtcclxuICAgICAgICAkKFwiLnB0LXNob3dJZkxpdmluZ0F3YXlcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmTm9QYXJ0bmVyXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiLnB0LWxpdmluZ1dpdGhQYXJ0bmVyXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwicHQtZmluYWwtdG9nZ2xlXCIpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgLy8gc2tpcCB0aGUgbGl2aW5nIGFycmFuZ2VtZW50IGRldGFpbHMgXHJcbiAgICAgICAgJCgnLmJ0bk5leHQnKS5wcm9wKCdvbmNsaWNrJywgbnVsbCk7XHJcbiAgICAgICAgJCgnLmJ0bk5leHQnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hdXRoL2NsYWltL3N0dWRlbnRjbGFpbTMnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAkKFwiLnB0LXNob3dJZkxpdmluZ0F3YXlcIikuc2hvdygnZmFzdCcpO1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmTm9QYXJ0bmVyXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwicHQtZmluYWwtdG9nZ2xlXCIpLmhpZGUoKTtcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRQYXJ0bmVyZWRSZWxhdGlvbnNoaXAnKSA9PT0gJ25vJykge1xyXG4gICAgICAgICAgJChcIi5wdC1zaG93SWZOb1BhcnRuZXJcIikuc2hvdygpO1xyXG4gICAgICAgICAgJChcIi5wdC1saXZpbmdXaXRoUGFydG5lclwiKS5oaWRlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdMb2NhdGlvbl06Y2hlY2tlZCcpLnZhbCgpID09PSAnYXdheS1mcm9tLWhvbWUnKSB7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZMaXZpbmdBd2F5RnJvbUhvbWVcIikuc2hvdygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmTGl2aW5nQXdheUZyb21Ib21lXCIpLmhpZGUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgICQoJ2lucHV0W25hbWU9c3R1ZGVudExpdmluZ1dpdGhQYXJ0bmVyXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdXaXRoUGFydG5lcl06Y2hlY2tlZCcpLnZhbCgpID09PSAneWVzJykge1xyXG5cclxuICAgICAgICAkKFwiLnB0LXN0dWRlbnRMaXZpbmdXaXRoUGFydG5lckxlc3NSYXRlXCIpLnNob3coKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKFwiLnB0LXN0dWRlbnRMaXZpbmdXaXRoUGFydG5lckxlc3NSYXRlXCIpLmhpZGUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgICQoJ2lucHV0W25hbWU9c3R1ZGVudFBhcnRuZXJlZFJlbGF0aW9uc2hpcF0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKFwiLnB0LXNob3dMaXZpbmdMb2NhdGlvblwiKS5zaG93KCk7XHJcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRQYXJ0bmVyZWRSZWxhdGlvbnNoaXBdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudFBhcnRuZXJlZFJlbGF0aW9uc2hpcCcpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50UGFydG5lcmVkUmVsYXRpb25zaGlwJywgJ3llcycpO1xyXG4gICAgICAgICQoXCIucHQtc3R1ZGVudExpdmluZ1NhbWVBZGRyZXNzXCIpLnNob3coKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudFBhcnRuZXJlZFJlbGF0aW9uc2hpcCcpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50UGFydG5lcmVkUmVsYXRpb25zaGlwJywgJ25vJyk7XHJcbiAgICAgICAgJChcIi5wdC1zdHVkZW50TGl2aW5nU2FtZUFkZHJlc3NcIikuaGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgJChcIiNyZWxhdGlvbnNoaXBUb1ZldGVyYW5cIikuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIHZhciBzZWxlY3RlZF9vcHRpb24gPSAkKCcjcmVsYXRpb25zaGlwVG9WZXRlcmFuJykudmFsKCk7XHJcblxyXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgncmVsYXRpb25zaGlwVHlwZScpO1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVsYXRpb25zaGlwVHlwZScsIHNlbGVjdGVkX29wdGlvbik7XHJcblxyXG4gICAgICBpZiAoc2VsZWN0ZWRfb3B0aW9uID09PSAnb3RoZXInKSB7XHJcbiAgICAgICAgJCgnI3JlbGF0aW9uc2hpcFRvVmV0ZXJhbk90aGVyJykuc2hvdyhcImZhc3RcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnI3JlbGF0aW9uc2hpcFRvVmV0ZXJhbk90aGVyJykuaGlkZShcInNsb3dcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAkKFwiI3ZldGVyYW5SZWxhdGlvbnNoaXBUb1N0dWRlbnRcIikuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGVjdGVkX29wdGlvbiA9ICQoJyN2ZXRlcmFuUmVsYXRpb25zaGlwVG9TdHVkZW50JykudmFsKCk7XHJcbiAgICAgIGlmIChzZWxlY3RlZF9vcHRpb24gPT09ICdvdGhlcicpIHtcclxuICAgICAgICAkKCcjdmV0ZXJhblJlbGF0aW9uc2hpcFRvU3R1ZGVudE90aGVyJykuc2hvdyhcImZhc3RcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnI3ZldGVyYW5SZWxhdGlvbnNoaXBUb1N0dWRlbnRPdGhlcicpLmhpZGUoXCJzbG93XCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb25dJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb25dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycgJiZcclxuICAgICAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnRQYXJ0bmVyZWRSZWxhdGlvbnNoaXBdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcclxuICAgICAgICAkKFwiLnB0LWxpdmluZ1dpdGhQYXJ0bmVyXCIpLnNob3coKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ0F3YXlWYWxpZFJlYXNvbicpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJywgJ2F3YXktZnJvbS1ob21lJyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb24nLCB0cnVlKTtcclxuICAgICAgfSBlbHNlIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb25dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ0F3YXlWYWxpZFJlYXNvbicpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJywgJ2F3YXktZnJvbS1ob21lJyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb24nLCB0cnVlKTtcclxuICAgICAgICAkKFwiLnB0LWZpbmFsLXRvZ2dsZVwiKS5zaG93KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb24nKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdMb2NhdGlvbicsICdhdC1ob21lJyk7XHJcbiAgICAgICAgJChcIi5wdC1saXZpbmdXaXRoUGFydG5lclwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5wdC1maW5hbC10b2dnbGVcIikuc2hvdygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdXaXRoUGFydG5lcl0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKFwiLnB0LWZpbmFsLXRvZ2dsZVwiKS5zaG93KCk7XHJcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdXaXRoUGFydG5lcl06Y2hlY2tlZCcpLnZhbCgpID09PSAneWVzJykge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nV2l0aFBhcnRuZXInKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ1dpdGhQYXJ0bmVyJywgJ3llcycpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nV2l0aFBhcnRuZXInKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ1dpdGhQYXJ0bmVyJywgJ25vJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIFBhZ2UgMWFcclxuICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSBcIi9hdXRoL2NsYWltL3N0dWRlbnRjbGFpbTFhXCIpIHtcclxuICAgIGluaXRTdHVkZW50cygpO1xyXG4gICAgaW5pdEZsb3coKTtcclxuXHJcbiAgICAkKFwiLnB0LXNob3dMaXZpbmdMb2NhdGlvblwiKS5oaWRlKCk7XHJcbiAgICAkKFwiLnB0LXNob3dJZkxpdmluZ0F3YXlGcm9tSG9tZVwiKS5oaWRlKCk7XHJcbiAgICAkKFwiLnB0LWxpdmluZ1dpdGhQYXJ0bmVyXCIpLmhpZGUoKTtcclxuICAgIGlmIChcImNsYWltYW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAkKFwiLnB0LXBhcnRuZXJlZFJlbGF0aW9uc2hpcFwiKS5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgJChcIiNmaXJzdE5hbWVcIikuZm9jdXNvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAoJCh0aGlzKS52YWwoKSkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TmFtZUZpcnN0Jyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnROYW1lRmlyc3QnLCAkKHRoaXMpLnZhbCgpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudE5hbWVGaXJzdCcpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2xhc3ROYW1lXCIpLmZvY3Vzb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKCQodGhpcykudmFsKCkpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudE5hbWVMYXN0Jyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnROYW1lTGFzdCcsICQodGhpcykudmFsKCkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TmFtZUxhc3QnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnaW5wdXRbbmFtZT1nZW5kZXJdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPiAxNSkge1xyXG4gICAgICAgICQoXCIucHQtcGFydG5lcmVkUmVsYXRpb25zaGlwXCIpLnNob3coKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKFwiLnB0LXNob3dMaXZpbmdMb2NhdGlvblwiKS5zaG93KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJ2lucHV0W25hbWU9c3R1ZGVudFBhcnRuZXJlZFJlbGF0aW9uc2hpcF0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKFwiLnB0LXNob3dMaXZpbmdMb2NhdGlvblwiKS5zaG93KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdMb2NhdGlvbl0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nTG9jYXRpb25dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ2hvbWVsZXNzJykge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJywgJ2hvbWVsZXNzJyk7XHJcbiAgICAgICAgJChcIi5wdC1maW5hbC10b2dnbGVcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIucHQtbGl2aW5nV2l0aFBhcnRuZXJcIikuaGlkZSgpO1xyXG4gICAgICB9IGVsc2UgaWYgKCQoJ2lucHV0W25hbWU9c3R1ZGVudExpdmluZ0xvY2F0aW9uXTpjaGVja2VkJykudmFsKCkgPT09ICdhdC1ob21lJykge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJywgJ2F0LWhvbWUnKTtcclxuICAgICAgICAkKFwiLnB0LWxpdmluZ1dpdGhQYXJ0bmVyXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiLnB0LWZpbmFsLXRvZ2dsZVwiKS5oaWRlKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nTG9jYXRpb25dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ2F3YXktZnJvbS1ob21lJykge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJywgJ2F3YXktZnJvbS1ob21lJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMaXZpbmdMb2NhdGlvbicpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nTG9jYXRpb25dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ2F3YXktZnJvbS1ob21lJykge1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmTGl2aW5nQXdheUZyb21Ib21lXCIpLnNob3coKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKFwiLnB0LXNob3dJZkxpdmluZ0F3YXlGcm9tSG9tZVwiKS5oaWRlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdMb2NhdGlvbl06Y2hlY2tlZCcpLnZhbCgpID09PSAnaG9tZWxlc3MnKSB7XHJcbiAgICAgICAgLy8gc2tpcCB0aGUgbGl2aW5nIGFycmFuZ2VtZW50IGRldGFpbHMgXHJcbiAgICAgICAgJCgnLmJ0bk5leHQnKS5wcm9wKCdvbmNsaWNrJywgbnVsbCk7XHJcbiAgICAgICAgJCgnLmJ0bk5leHQnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYXV0aC9jbGFpbS9zdHVkZW50Y2xhaW0zJztcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIGlmICgoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nTG9jYXRpb25dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ2F0LWhvbWUnKSkge1xyXG4gICAgICAgIGlmIChcInN0dWRlbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICAgICAvLyBza2lwIHRoZSBsaXZpbmcgYXJyYW5nZW1lbnQgZGV0YWlscyBcclxuICAgICAgICAgICQoJy5idG5OZXh0JykucHJvcCgnb25jbGljaycsIG51bGwpO1xyXG4gICAgICAgICAgJCgnLmJ0bk5leHQnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hdXRoL2NsYWltL3N0dWRlbnRjbGFpbTMnO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICQoJy5idG5OZXh0JykucHJvcCgnb25jbGljaycsIG51bGwpO1xyXG4gICAgICAgICAgJCgnLmJ0bk5leHQnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hdXRoL2NsYWltL3N0dWRlbnRjbGFpbTInO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJy5idG5OZXh0JykucHJvcCgnb25jbGljaycsIG51bGwpO1xyXG4gICAgICAgICQoJy5idG5OZXh0JykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2F1dGgvY2xhaW0vc3R1ZGVudGNsYWltMic7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb25dJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb25dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycgJiZcclxuICAgICAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnRQYXJ0bmVyZWRSZWxhdGlvbnNoaXBdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcclxuICAgICAgICAkKFwiLnB0LWxpdmluZ1dpdGhQYXJ0bmVyXCIpLnNob3coKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ0F3YXlWYWxpZFJlYXNvbicpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJywgJ2F3YXktZnJvbS1ob21lJyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb24nLCB0cnVlKTtcclxuICAgICAgfSBlbHNlIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb25dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ0F3YXlWYWxpZFJlYXNvbicpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJywgJ2F3YXktZnJvbS1ob21lJyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb24nLCB0cnVlKTtcclxuICAgICAgICAkKFwiLnB0LWZpbmFsLXRvZ2dsZVwiKS5zaG93KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb24nKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdMb2NhdGlvbicsICdhdC1ob21lJyk7XHJcbiAgICAgICAgJChcIi5wdC1saXZpbmdXaXRoUGFydG5lclwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5wdC1maW5hbC10b2dnbGVcIikuc2hvdygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgJCgnaW5wdXRbbmFtZT1zdHVkZW50UGFydG5lcmVkUmVsYXRpb25zaGlwXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAkKFwiLnB0LXNob3dMaXZpbmdMb2NhdGlvblwiKS5zaG93KCk7XHJcblxyXG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50UGFydG5lcmVkUmVsYXRpb25zaGlwXTpjaGVja2VkJykudmFsKCkgPT09ICd5ZXMnKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRQYXJ0bmVyZWRSZWxhdGlvbnNoaXAnKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudFBhcnRuZXJlZFJlbGF0aW9uc2hpcCcsICd5ZXMnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudFBhcnRuZXJlZFJlbGF0aW9uc2hpcCcpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50UGFydG5lcmVkUmVsYXRpb25zaGlwJywgJ25vJyk7XHJcbiAgICAgICAgJChcIi5wdC1zdHVkZW50TGl2aW5nU2FtZUFkZHJlc3NcIikuaGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nV2l0aFBhcnRuZXJdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgJChcIi5wdC1maW5hbC10b2dnbGVcIikuc2hvdygpO1xyXG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nV2l0aFBhcnRuZXJdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ1dpdGhQYXJ0bmVyJyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdXaXRoUGFydG5lcicsICd5ZXMnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ1dpdGhQYXJ0bmVyJyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdXaXRoUGFydG5lcicsICdubycpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gIH1cclxuXHJcblxyXG4gIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09IFwiL2F1dGgvY2xhaW0vc3R1ZGVudGNsYWltMlwiKSB7XHJcbiAgICAvLyBQYWdlIDIgXHJcbiAgICBpbml0U3R1ZGVudHMoKTtcclxuICAgIGluaXRGbG93KCk7XHJcbiAgICAkKFwiLnB0LXNob3dJZkhvbWVsZXNzXCIpLmhpZGUoKTtcclxuICAgICQoXCIucHQtc2hvd0lmUmVxdWlyZVJlbnRBc3Npc3RhbmNlXCIpLmhpZGUoKTtcclxuICAgICQoXCIucHQtc2hvd0lmUmVudGluZ1wiKS5oaWRlKCk7XHJcbiAgICAkKFwiLnB0LXNob3dJZk5vdFJlbnRMYW5kTG9yZFwiKS5oaWRlKCk7XHJcbiAgICAkKFwiLnB0LXJlbnRQYXllZFwiKS5oaWRlKCk7XHJcbiAgICAkKFwiLnB0LXNob3dJZkFkZGl0aW9uYWxBZGRyZXNzXCIpLmhpZGUoKTtcclxuICAgICQoXCIucHQtc2hvd0lmTGl2aW5nQXdheVwiKS5oaWRlKCk7XHJcbiAgICAkKFwiLnB0LXNob3dJZkJvYXJkaW5nXCIpLmhpZGUoKTtcclxuICAgICQoXCIucHQtYm9hcmRQYWlkXCIpLmhpZGUoKTtcclxuICAgICQoXCIucHQtc2hvd0lmT3RoZXJcIikuaGlkZSgpO1xyXG5cclxuXHJcbiAgICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKSA9PT0gJ2F0LWhvbWUnKSB8fFxyXG4gICAgICAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRMaXZpbmdXaXRoUGFydG5lcicpID09PSAneWVzJykgfHxcclxuICAgICAgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPCAxNikpIHtcclxuICAgICAgJChcIi5wdC1zaG93SWZMaXZpbmdBd2F5XCIpLmhpZGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQoXCIucHQtc2hvd0lmTGl2aW5nQXdheVwiKS5zaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgJChcIiNzdHVkeUF3YXlGcm9tSG9tZUV4cGxhbmF0aW9uXCIpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxlY3RlZF9vcHRpb24gPSAkKCcjc3R1ZHlBd2F5RnJvbUhvbWVFeHBsYW5hdGlvbicpLnZhbCgpO1xyXG4gICAgICBpZiAoc2VsZWN0ZWRfb3B0aW9uID09PSAnaG9tZWxlc3MnKSB7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZIb21lbGVzc1wiKS5zaG93KCdmYXN0Jyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZIb21lbGVzc1wiKS5oaWRlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdBcnJhbmdlbWVudF0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nQXJyYW5nZW1lbnRdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3JlbnRpbmcnKSB7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZSZXF1aXJlUmVudEFzc2lzdGFuY2VcIikuc2hvdygpO1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmUmVudGluZ1wiKS5zaG93KCdmYXN0Jyk7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZCb2FyZGluZ1wiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5wdC1ib2FyZFBhaWRcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmT3RoZXJcIikuaGlkZSgpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nQXJyYW5nZW1lbnQnKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0FycmFuZ2VtZW50JywgJ3JlbnRpbmcnKTtcclxuICAgICAgfSBlbHNlIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdBcnJhbmdlbWVudF06Y2hlY2tlZCcpLnZhbCgpID09PSAnYm9hcmRpbmcnKSB7XHJcbiAgICAgICAgJChcIi5wdC1ib2FyZFBhaWRcIikuc2hvdygpO1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmQm9hcmRpbmdcIikuc2hvdygnZmFzdCcpO1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmUmVudGluZ1wiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZPdGhlclwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZSZXF1aXJlUmVudEFzc2lzdGFuY2VcIikuaGlkZSgpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nQXJyYW5nZW1lbnQnKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0FycmFuZ2VtZW50JywgJ2JvYXJkaW5nJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nQXJyYW5nZW1lbnRdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ290aGVyJykge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nQXJyYW5nZW1lbnQnKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0FycmFuZ2VtZW50JywgJ290aGVyJyk7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZPdGhlclwiKS5zaG93KCk7XHJcbiAgICAgICAgJChcIi5wdC1ib2FyZFBhaWRcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmQm9hcmRpbmdcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmUmVudGluZ1wiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZSZXF1aXJlUmVudEFzc2lzdGFuY2VcIikuaGlkZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nQXJyYW5nZW1lbnQnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAkKCdpbnB1dFtuYW1lPXNoYXJpbmdSZXNpZGVuY2VdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICQoXCIucHQtcmVudFBheWVkXCIpLnNob3coKTtcclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgJCgnaW5wdXRbbmFtZT1zYW1lQXNQb3N0YWxdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZBZGRpdGlvbmFsQWRkcmVzc1wiKS5oaWRlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZBZGRpdGlvbmFsQWRkcmVzc1wiKS5zaG93KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09IFwiL2F1dGgvY2xhaW0vc3R1ZGVudGNsYWltM1wiKSB7XHJcbiAgICAvLyBwYWdlIDNcclxuICAgIGluaXRTdHVkZW50cygpO1xyXG4gICAgaW5pdEZsb3coKTtcclxuICAgICQoXCIucHQtc2hvd0lmTm90UHJpbWFyeVN0dWRlbnRcIikuaGlkZSgpO1xyXG4gICAgJChcIi5wdC1zaG93SWZQcmltYXJ5XCIpLmhpZGUoKTtcclxuICAgICQoXCIucHQtc2hvd0lmU2Vjb25kYXJ5XCIpLmhpZGUoKTtcclxuICAgICQoXCIucHQtc2hvd0lmVGVydGlhcnlcIikuaGlkZSgpO1xyXG4gICAgJChcIi5wdC1zaG93SWZQYXJ0VGltZVwiKS5oaWRlKCk7XHJcbiAgICAkKFwiLnB0LW5vTG9uZ2VyRWxpZ2libGVcIikuaGlkZSgpO1xyXG4gICAgJChcIi5wdC1ub0xvbmdlckVsaWdpYmxlVHdvXCIpLmhpZGUoKTtcclxuICAgICQoXCIucHQtc2hvd0lmU3R1ZHlMb2FkTm90QW5zd2VyZWRcIikuaGlkZSgpO1xyXG4gICAgJChcIi5wdC1zaG93SWZFbnJvbGxlZFwiKS5oaWRlKCk7XHJcbiAgICAkKFwiLnB0LWVucm9sbFN0YXR1c1N0dWRlbnRPdmVyMjVcIikuaGlkZSgpO1xyXG4gICAgLy8gJChcIi5wdC1lbnJvbGxEYXRlc3R1ZGVudE92ZXIyNVwiKS5oaWRlKCk7XHJcblxyXG5cclxuXHJcbiAgICAvLyBza2lwIHRoZSBmaW5hbmNpYWwgZGV0YWlscyBpZiB3ZSdyZSBpbiB2ZXRlcmFuIGZsb3dcclxuICAgIC8vIGlmIChcInZldGVyYW5GbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XHJcbiAgICAvLyAgICQoJy5idG5OZXh0JykucHJvcCgnb25jbGljaycsIG51bGwpO1xyXG4gICAgLy8gICAkKCcuYnRuTmV4dCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICAvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIC8vICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvc3R1ZGVudGNsYWltdXBsb2FkJztcclxuICAgIC8vICAgfSlcclxuICAgIC8vIH1cclxuXHJcblxyXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50TGV2ZWxPZlN0dWR5JykgIT09ICdwcmltYXJ5Jykge1xyXG4gICAgICAkKFwiLnB0LXNob3dJZk5vdFByaW1hcnlTdHVkZW50XCIpLnNob3coJ2Zhc3QnKTtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiI3N0dWRlbnRMZXZlbE9mU3R1ZHlcIikuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGVjdGVkX29wdGlvbiA9ICQoJyNzdHVkZW50TGV2ZWxPZlN0dWR5JykudmFsKCk7XHJcblxyXG4gICAgICB2YXIgZ3JhZGVfb3B0aW9ucztcclxuXHJcbiAgICAgIGlmIChzZWxlY3RlZF9vcHRpb24gPT09ICdwcmltYXJ5Jykge1xyXG4gICAgICAgICQoXCIucHQtbm9Mb25nZXJFbGlnaWJsZVwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZTZWNvbmRhcnlcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmVGVydGlhcnlcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmUHJpbWFyeVwiKS5zaG93KCdmYXN0Jyk7XHJcblxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGV2ZWxPZlN0dWR5Jyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMZXZlbE9mU3R1ZHknLCAncHJpbWFyeScpO1xyXG4gICAgICAgICQoXCIucGFnaW5hdGlvblwiKS5maW5kKCdidXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHJcbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRfb3B0aW9uLnN0YXJ0c1dpdGgoJ3NlY29uZGFyeScpKSB7XHJcblxyXG4gICAgICAgICQoXCIucHQtbm9Mb25nZXJFbGlnaWJsZVwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZUZXJ0aWFyeVwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZQcmltYXJ5XCIpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZTZWNvbmRhcnlcIikuc2hvdygpO1xyXG5cclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExldmVsT2ZTdHVkeScpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TGV2ZWxPZlN0dWR5JywgJ3NlY29uZGFyeScpO1xyXG5cclxuICAgICAgICAkKFwiLnBhZ2luYXRpb25cIikuZmluZCgnYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoKHNlbGVjdGVkX29wdGlvbi5zdGFydHNXaXRoKCd0ZXJ0aWFyeScpKSB8fCAoc2VsZWN0ZWRfb3B0aW9uID09PSAnYXBwcmVudGljZXNoaXAnKSkge1xyXG4gICAgICAgICQoXCIucHQtbm9Mb25nZXJFbGlnaWJsZVwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZQcmltYXJ5XCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiLnB0LXNob3dJZlNlY29uZGFyeVwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZUZXJ0aWFyeVwiKS5zaG93KCdmYXN0Jyk7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50TG9hZE9mU3R1ZHknKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkeUxvYWROb3RBbnN3ZXJlZFwiKS5zaG93KCdmYXN0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRMb2FkT2ZTdHVkeScpID09PSAncGFydC10aW1lJykge1xyXG4gICAgICAgICAgJChcIi5wdC1zaG93SWZQYXJ0VGltZVwiKS5zaG93KCdmYXN0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMZXZlbE9mU3R1ZHknKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExldmVsT2ZTdHVkeScsICd0ZXJ0aWFyeScpO1xyXG4gICAgICAgICQoXCIucGFnaW5hdGlvblwiKS5maW5kKCdidXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgJCgnaW5wdXRbbmFtZT1zdHVkeUxvYWRdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9c3R1ZHlMb2FkXTpjaGVja2VkJykudmFsKCkgPT09ICdwYXJ0LXRpbWUnKSB7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZQYXJ0VGltZVwiKS5zaG93KCdmYXN0Jyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMb2FkT2ZTdHVkeScpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TG9hZE9mU3R1ZHknLCAncGFydC10aW1lJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZQYXJ0VGltZVwiKS5oaWRlKCk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMb2FkT2ZTdHVkeScpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TG9hZE9mU3R1ZHknLCAnZnVsbC10aW1lJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJ2lucHV0W25hbWU9ZW5yb2xTdGF0dXNdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9ZW5yb2xTdGF0dXNdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ25vJykge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdlbnJvbFN0YXR1cycpO1xyXG5cclxuICAgICAgICAkKFwiLnB0LW5vTG9uZ2VyRWxpZ2libGVUd29cIikuc2hvdygpO1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmRW5yb2xsZWRcIikuaGlkZSgpO1xyXG5cclxuICAgICAgICAvLyBTaG93IGFuIGVycm9yIG1lc3NhZ2UgaWYgdGhlIHN0dWRlbnQgaXMgMjUgb3Igb2xkZXIgYW5kIGhhc24ndCBlbnJvbGxlZFxyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudEFnZScpID4gMjQpIHtcclxuICAgICAgICAgICQoXCIucHQtZW5yb2xsU3RhdHVzU3R1ZGVudE92ZXIyNVwiKS5zaG93KCk7XHJcbiAgICAgICAgICAkKFwiLnB0LW5vTG9uZ2VyRWxpZ2libGVUd29cIikuaGlkZSgpO1xyXG4gICAgICAgICAgLy8gJChcIi5wdC1lbnJvbGxEYXRlc3R1ZGVudE92ZXIyNVwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAkKFwiLnBhZ2luYXRpb25cIikuZmluZCgnLmJ0bk5leHQnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZW5yb2xTdGF0dXMnKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZW5yb2xTdGF0dXMnLCB0cnVlKTtcclxuICAgICAgICAkKFwiLnB0LW5vTG9uZ2VyRWxpZ2libGVUd29cIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIucHQtZW5yb2xsU3RhdHVzU3R1ZGVudE92ZXIyNVwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZFbnJvbGxlZFwiKS5zaG93KCk7XHJcbiAgICAgICAgLy9zaG93IGFuIGVycm9yIG1lc3NhZ2UgaWYgdGhlIHN0dWRlbnQgaXMgMjUgb3Igb2xkZXIgYW5kIGVucm9sbGVkIGFmdGVyIHRoZXkgdHVybmVkIDI1LiBUaGUgc21hcnRzIGRvbid0IGV4aXN0IGluIHByb3RvdHlwZS5cclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDI0KSB7XHJcbiAgICAgICAgICAvLyAkKFwiLnB0LWVucm9sbERhdGVzdHVkZW50T3ZlcjI1XCIpLnNob3coKTtcclxuICAgICAgICAgICQoXCIucGFnaW5hdGlvblwiKS5maW5kKCcuYnRuTmV4dCcpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSBcIi9hdXRoL2NsYWltL3N0dWRlbnRjbGFpbXVwbG9hZFwiKSB7XHJcbiAgICBpbml0U3R1ZGVudHMoKTtcclxuICB9XHJcblxyXG4gIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09IFwiL2F1dGgvY2xhaW0vc3R1ZGVudGNsYWltNFwiKSB7XHJcbiAgICAvLyBQYWdlIDRcclxuICAgIGluaXRTdHVkZW50cygpO1xyXG4gICAgaW5pdEZsb3coKTtcclxuICAgICQoJy5wdC1zdHVkZW50QWdlLS1tYXR1cmUnKS5oaWRlKCk7XHJcbiAgICAkKCcucHQtc2hvd0lmRWR1Y2F0aW9uQWxsb3dhbmNlVGF4ZWQnKS5oaWRlKCk7XHJcbiAgICAkKCcucHQtc2hvd0lmRWR1Y2F0aW9uQWxsb3dhbmNlTm90VGF4ZWQnKS5oaWRlKCk7XHJcbiAgICAkKCcucHQtc2hvd0lmQ2FyZVBlcmNlbnRhZ2VMb3cnKS5oaWRlKCk7XHJcbiAgICAkKCcucHQtc2hvd0lmQ2FyZVBlcmNlbnRhZ2VIaWdoJykuaGlkZSgpO1xyXG4gICAgJCgnLmJhbmstZGV0YWlscy1jb250YWluZXInKS5oaWRlKCk7XHJcbiAgICAkKCcucHQtc2hvd0lmTm9TdHVkZW50VEZOJykuaGlkZSgpO1xyXG4gICAgJCgnLnB0LXNob3dJZlN0dWRlbnRURk4nKS5oaWRlKCk7XHJcbiAgICAkKCcucHQtc3R1ZGVudEZpbmFuY2lhbFBlcm1pc3Npb24nKS5oaWRlKCk7XHJcblxyXG5cclxuICAgIC8vIGlmIHN0dWRlbnQgMTYgb3IgMTcgYXNrIGZvciBURk5cclxuICAgIGlmICgoXCJjbGFpbWFudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHx8IChcInZldGVyYW5GbG93XCIgaW4gbG9jYWxTdG9yYWdlKSkge1xyXG4gICAgICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPD0gMTgpICYmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudEFnZScpID4gMTUpKSB7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50QmV0d2VlbjE2YW5kMThcIikuc2hvdygpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRCZXR3ZWVuMTZhbmQxOFwiKS5oaWRlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoKFwic3R1ZGVudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpKSB7XHJcbiAgICAgIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA8IDE4KSAmJiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDE1KSkge1xyXG4gICAgICAgICQoJy5wdC1zdHVkZW50RmluYW5jaWFsUGVybWlzc2lvbicpLnNob3coKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudEFnZScpID4gMTUpIHtcclxuICAgICAgJCgnLnB0LXN0dWRlbnRBZ2UtLW1hdHVyZScpLnNob3coKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgJCgnaW5wdXRbbmFtZT1lZHVjYXRpb25BbGxvd2FuY2VUYXhlZF0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1lZHVjYXRpb25BbGxvd2FuY2VUYXhlZF06Y2hlY2tlZCcpLnZhbCgpID09PSAneWVzJykge1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmRWR1Y2F0aW9uQWxsb3dhbmNlVGF4ZWRcIikuc2hvdygpO1xyXG4gICAgICAgICQoJy5wdC1zaG93SWZFZHVjYXRpb25BbGxvd2FuY2VOb3RUYXhlZCcpLmhpZGUoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKFwiLnB0LXNob3dJZkVkdWNhdGlvbkFsbG93YW5jZVRheGVkXCIpLmhpZGUoKTtcclxuICAgICAgICAkKCcucHQtc2hvd0lmRWR1Y2F0aW9uQWxsb3dhbmNlTm90VGF4ZWQnKS5zaG93KCdmYXN0Jyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgLy8gYmFuayBkZXRhaWxzIGJ1dHRvbiBmdW5jdGlvblxyXG4gICAgJChcIiNidG5BZGRCYW5rXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgJChcIi5iYW5rLWRldGFpbHMtY29udGFpbmVyXCIpLnNob3coXCJmYXN0XCIpO1xyXG4gICAgICAkKFwiI2J0bkFkZEJhbmstYm94XCIpLmhpZGUoKTtcclxuICAgICAgJChcIiNiYW5rb3B0aW9uYWxcIikuaGlkZSgpO1xyXG4gICAgICAkKFwiI2J0bkNhbmNlbEJhbmtcIikuc2hvdygpO1xyXG4gICAgICAkKFwiI2JhbmstbmFtZVwiKS5mb2N1cygpO1xyXG4gICAgfSk7XHJcbiAgICAkKFwiI2J0bkNhbmNlbEJhbmtcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKFwiLmJhbmstZGV0YWlscy1jb250YWluZXJcIikuaGlkZShcImZhc3RcIik7XHJcbiAgICAgICQoXCIjYnRuQ2FuY2VsQmFua1wiKS5oaWRlKCk7XHJcbiAgICAgICQoXCIjYmFua29wdGlvbmFsXCIpLnNob3coKTtcclxuICAgICAgJChcIiNidG5BZGRCYW5rLWJveFwiKS5zaG93KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiLm1lc3NhZ2UtY2xvc2VcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKFwiLmJhbmstZGV0YWlscy1jb250YWluZXJcIikuaGlkZShcImZhc3RcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdpbnB1dFtuYW1lPWRvZXNTdHVkZW50SGF2ZVRGTl0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1kb2VzU3R1ZGVudEhhdmVURk5dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudFRGTicsIHRydWUpO1xyXG4gICAgICAgICQoXCIucHQtc2hvd0lmTm9TdHVkZW50VEZOXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRURk5cIikuc2hvdygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50VEZOJywgZmFsc2UpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0Zm4nKTtcclxuICAgICAgICAkKFwiLnB0LXNob3dJZk5vU3R1ZGVudFRGTlwiKS5zaG93KCdmYXN0Jyk7XHJcbiAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50VEZOXCIpLmhpZGUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcblxyXG4gIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09IFwiL2F1dGgvY2xhaW0vc3R1ZGVudGNsYWltNGFcIikge1xyXG4gICAgaW5pdFN0dWRlbnRzKCk7XHJcbiAgICBpbml0RmxvdygpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gXCIvYXV0aC9jbGFpbS9zdHVkZW50Y2xhaW02XCIpIHtcclxuICAgIGluaXRTdHVkZW50cygpO1xyXG5cclxuICAgICQoXCIucHQtc2hvd0lmTm9TdHVkZW50VEZOXCIpLmhpZGUoKTtcclxuXHJcbiAgICBpZiAoIShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudEhhc1RGTicpKSAmJiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDE1KSkge1xyXG4gICAgICAkKFwiLnB0LXNob3dJZk5vU3R1ZGVudFRGTlwiKS5zaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGJ1c2luZXNzRGF5cyA9IDUsXHJcbiAgICAgIGNvdW50ZXIgPSAxOyAvLyBzZXQgdG8gMSB0byBjb3VudCBmcm9tIG5leHQgYnVzaW5lc3MgZGF5XHJcbiAgICB3aGlsZSAoYnVzaW5lc3NEYXlzID4gMCkge1xyXG4gICAgICB2YXIgdG1wID0gbmV3IERhdGUoKTtcclxuICAgICAgdG1wLnNldERhdGUodG1wLmdldERhdGUoKSArIGNvdW50ZXIrKyk7XHJcbiAgICAgIHN3aXRjaCAodG1wLmdldERheSgpKSB7XHJcbiAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgIGJyZWFrOyAvLyBzdW5kYXkgJiBzYXR1cmRheVxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBidXNpbmVzc0RheXMtLTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnB0LWJ1c3NuZXNzRGF5c091dGNvbWVcIikuaW5uZXJIVE1MID0gdG1wLnRvRGF0ZVN0cmluZygpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIFBvQyBjaGVjayBkb2NzIHJlcXVpcmVkIGZvciBwcm90b3R5cGVcclxuXHJcbiAgZnVuY3Rpb24gUGVyc29uKCkge1xyXG4gICAgLy8gaG93IG1hbnkgdGltZXMgaXMgdGhlIGNhbGxlZFxyXG4gICAgdGhpcy5pID0gMDtcclxuXHJcbiAgICB0aGlzLnN0dWRlbnRBZ2U7XHJcbiAgICB0aGlzLnN0dWRlbnROYW1lRmlyc3Q7XHJcbiAgICB0aGlzLmRvY3NSZXF1aXJlZCA9IFtdO1xyXG5cclxuICAgIC8vIHByaXZpbGVnZWQgaW5pdCBtZXRob2RcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gZGVmaW5pbmcgaW5pdCBtZXRob2RcclxuICBQZXJzb24ucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyByZWFzc2lnbiB0aGlzXHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgX3RoaXMuY2hlY2tEb2NzKCk7XHJcbiAgICBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBfdGhpcy5jaGVja0RvY3MoKTtcclxuICAgIH0sIDE1MDApO1xyXG4gIH07XHJcblxyXG4gIFBlcnNvbi5wcm90b3R5cGUuY2hlY2tEb2NzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5pKys7XHJcblxyXG4gICAgLy8gbGlzdCBvZiBkb2NzXHJcbiAgICAvLyBQcm9vZiBvZiByZWxhdGlvbnNoaXAgPSBwcm9vZk9mUmVsYXRpb25zaGlwXHJcbiAgICAvLyBQcm9vZiBvZiByZXNpZGVuY2UgPSBwcm9vZk9mUmVzaWRlbmNlXHJcbiAgICAvLyBQcm9vZiBvZiBlbnJvbG1lbnQgPSBwcm9vZk9mRW5yb2xtZW50XHJcbiAgICAvLyBQYXJ0LXRpbWUgc3R1ZHkgcmVhc29uID0gcGFydFRpbWVTdHVkeVJlYXNvblxyXG4gICAgLy8gVGF4IGZpbGUgbnVtYmVyIGRlY2xhcmF0aW9uID0gdEZORGVjbGFyYWlvblxyXG5cclxuICAgIC8vIGNoZWNrIHR5cGUgb2YgcGVyc29uIFxyXG4gICAgaWYgKChcInN0dWRlbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB8fCAoXCJ2ZXRlcmFuRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkgfHwgKFwiY2xhaW1hbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSkge1xyXG5cclxuICAgICAgaWYgKFwic3R1ZGVudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICB0aGlzLnR5cGUgPSAnc3R1ZGVudCc7XHJcbiAgICAgIH0gZWxzZSBpZiAoXCJ2ZXRlcmFuRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgIHRoaXMudHlwZSA9ICd2ZXRlcmFuJztcclxuICAgICAgfSBlbHNlIGlmIChcImNsYWltYW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgIHRoaXMudHlwZSA9ICdjbGFpbWFudCc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gUHJvb2Ygb2YgcmVsYXRpb25zaGlwIFxyXG4gICAgaWYgKFwidmV0ZXJhbkZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgaWYgKChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudE5hbWVGaXJzdCcpICE9PSBudWxsKSAmJiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnROYW1lTGFzdCcpICE9PSBudWxsKSkge1xyXG4gICAgICAgIGluaXRTdHVkZW50cygpO1xyXG4gICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLmluZGV4T2YoXCJwcm9vZk9mUmVsYXRpb25zaGlwQ2xhaW1hbnRTdHVkZW50XCIpID09PSAtMSA/IHRoaXMuZG9jc1JlcXVpcmVkLnB1c2goXCJwcm9vZk9mUmVsYXRpb25zaGlwQ2xhaW1hbnRTdHVkZW50XCIpIDogY29uc29sZS5sb2coKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgaSA9IHRoaXMuZG9jc1JlcXVpcmVkLmluZGV4T2YoXCJwcm9vZk9mUmVsYXRpb25zaGlwQ2xhaW1hbnRTdHVkZW50XCIpO1xyXG4gICAgICAgIGlmIChpICE9IC0xKSB7XHJcbiAgICAgICAgICB0aGlzLmRvY3NSZXF1aXJlZC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAkKCcucHQtcHJvb2ZPZlJlbGF0aW9uc2hpcENsYWltYW50U3R1ZGVudCcpLmFkZENsYXNzKCdkaXNwbGF5LW5vbmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoXCJzdHVkZW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG4gICAgICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd2ZXRlcmFuTmFtZUZpcnN0JykgIT09IG51bGwpICYmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndmV0ZXJhbk5hbWVMYXN0JykgIT09IG51bGwpKSB7XHJcbiAgICAgICAgdGhpcy5kb2NzUmVxdWlyZWQuaW5kZXhPZihcInByb29mT2ZSZWxhdGlvbnNoaXBcIikgPT09IC0xID8gdGhpcy5kb2NzUmVxdWlyZWQucHVzaChcInByb29mT2ZSZWxhdGlvbnNoaXBcIikgOiBjb25zb2xlLmxvZygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBpID0gdGhpcy5kb2NzUmVxdWlyZWQuaW5kZXhPZihcInByb29mT2ZSZWxhdGlvbnNoaXBcIik7XHJcbiAgICAgICAgaWYgKGkgIT0gLTEpIHtcclxuICAgICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICQoJy5wdC1wcm9vZk9mUmVsYXRpb25zaGlwJykuYWRkQ2xhc3MoJ2Rpc3BsYXktbm9uZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChcImNsYWltYW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG4gICAgICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd2ZXRlcmFuTmFtZUZpcnN0JykgIT09IG51bGwpICYmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndmV0ZXJhbk5hbWVMYXN0JykgIT09IG51bGwpICYmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudE5hbWVGaXJzdCcpICE9PSBudWxsKSAmJiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnROYW1lTGFzdCcpICE9PSBudWxsKSkge1xyXG4gICAgICAgIGluaXRTdHVkZW50cygpO1xyXG4gICAgICAgIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ZldGVyYW5OYW1lRmlyc3QnKSAhPT0gbnVsbCkgJiYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd2ZXRlcmFuTmFtZUxhc3QnKSAhPT0gbnVsbCkpIHtcclxuICAgICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLmluZGV4T2YoXCJwcm9vZk9mUmVsYXRpb25zaGlwVmV0ZXJhblN0dWRlbnRcIikgPT09IC0xID8gdGhpcy5kb2NzUmVxdWlyZWQucHVzaChcInByb29mT2ZSZWxhdGlvbnNoaXBWZXRlcmFuU3R1ZGVudFwiKSA6IGNvbnNvbGUubG9nKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBpID0gdGhpcy5kb2NzUmVxdWlyZWQuaW5kZXhPZihcInByb29mT2ZSZWxhdGlvbnNoaXBWZXRlcmFuU3R1ZGVudFwiKTtcclxuICAgICAgICAgIGlmIChpICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgJCgnLnB0LXByb29mT2ZSZWxhdGlvbnNoaXBWZXRlcmFuU3R1ZGVudCcpLmFkZENsYXNzKCdkaXNwbGF5LW5vbmUnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnROYW1lRmlyc3QnKSAhPT0gbnVsbCkgJiYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50TmFtZUxhc3QnKSAhPT0gbnVsbCkpIHtcclxuICAgICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLmluZGV4T2YoXCJwcm9vZk9mUmVsYXRpb25zaGlwQ2xhaW1hbnRTdHVkZW50XCIpID09PSAtMSA/IHRoaXMuZG9jc1JlcXVpcmVkLnB1c2goXCJwcm9vZk9mUmVsYXRpb25zaGlwQ2xhaW1hbnRTdHVkZW50XCIpIDogY29uc29sZS5sb2coKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIGkgPSB0aGlzLmRvY3NSZXF1aXJlZC5pbmRleE9mKFwicHJvb2ZPZlJlbGF0aW9uc2hpcENsYWltYW50U3R1ZGVudFwiKTtcclxuICAgICAgICAgIGlmIChpICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgJCgnLnB0LXByb29mT2ZSZWxhdGlvbnNoaXBDbGFpbWFudFN0dWRlbnQnKS5hZGRDbGFzcygnZGlzcGxheS1ub25lJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIFByb29mIG9mIGVucm9sbWVudCBcclxuICAgIGlmIChcImVucm9sU3RhdHVzXCIgaW4gbG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLmluZGV4T2YoXCJwcm9vZk9mRW5yb2xtZW50XCIpID09PSAtMSA/IHRoaXMuZG9jc1JlcXVpcmVkLnB1c2goXCJwcm9vZk9mRW5yb2xtZW50XCIpIDogY29uc29sZS5sb2coKTtcclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICB2YXIgaSA9IHRoaXMuZG9jc1JlcXVpcmVkLmluZGV4T2YoXCJwcm9vZk9mRW5yb2xtZW50XCIpO1xyXG4gICAgICBpZiAoaSAhPSAtMSkge1xyXG4gICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLnNwbGljZShpLCAxKTtcclxuICAgICAgICAkKCcucHQtcHJvb2ZPZkVucm9sbWVudCcpLmFkZENsYXNzKCdkaXNwbGF5LW5vbmUnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFByb29mIG9mIHJlc2lkZW5jZSBcclxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJykgPT09ICdhd2F5LWZyb20taG9tZScpIHtcclxuICAgICAgdGhpcy5kb2NzUmVxdWlyZWQuaW5kZXhPZihcInByb29mT2ZSZXNpZGVuY2VcIikgPT09IC0xID8gdGhpcy5kb2NzUmVxdWlyZWQucHVzaChcInByb29mT2ZSZXNpZGVuY2VcIikgOiBjb25zb2xlLmxvZygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGkgPSB0aGlzLmRvY3NSZXF1aXJlZC5pbmRleE9mKFwicHJvb2ZPZlJlc2lkZW5jZVwiKTtcclxuICAgICAgaWYgKGkgIT0gLTEpIHtcclxuICAgICAgICB0aGlzLmRvY3NSZXF1aXJlZC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgJCgnLnB0LXByb29mT2ZSZXNpZGVuY2UnKS5hZGRDbGFzcygnZGlzcGxheS1ub25lJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBQYXJ0LXRpbWUgc3R1ZHkgcmVhc29uIFxyXG4gICAgaWYgKChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudExvYWRPZlN0dWR5JykgPT09ICdwYXJ0LXRpbWUnKSkge1xyXG4gICAgICB0aGlzLmRvY3NSZXF1aXJlZC5pbmRleE9mKFwicGFydFRpbWVTdHVkeVJlYXNvblwiKSA9PT0gLTEgPyB0aGlzLmRvY3NSZXF1aXJlZC5wdXNoKFwicGFydFRpbWVTdHVkeVJlYXNvblwiKSA6IGNvbnNvbGUubG9nKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgaSA9IHRoaXMuZG9jc1JlcXVpcmVkLmluZGV4T2YoXCJwYXJ0VGltZVN0dWR5UmVhc29uXCIpO1xyXG4gICAgICBpZiAoaSAhPSAtMSkge1xyXG4gICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLnNwbGljZShpLCAxKTtcclxuICAgICAgICAkKCcucHQtcGFydFRpbWVTdHVkeVJlYXNvbicpLmFkZENsYXNzKCdkaXNwbGF5LW5vbmUnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHNob3cgYWxsIHJlcXVpcmVkIGRvY3MgXHJcbiAgICBpZiAodGhpcy5kb2NzUmVxdWlyZWQubGVuZ3RoID4gMCkge1xyXG4gICAgICBqUXVlcnkoXCIucHQtc2hvd0lmRG9jdW1lbnRVcGxvYWRTaG9wcGluZ0NhcnRcIikuc2hvdygpO1xyXG4gICAgICAkLmVhY2godGhpcy5kb2NzUmVxdWlyZWQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcucHQtJyArIHRoaXMpLnJlbW92ZUNsYXNzKCdkaXNwbGF5LW5vbmUnKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gIH07XHJcblxyXG4gIC8vIGNyZWF0ZSBhIG5ldyBwZXJzb25cclxuICB2YXIgY291bnRlciA9IG5ldyBQZXJzb24oKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICQoXCIuYWNjb3JkaW9uX190cmlnZ2VyXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwiYWNjb3JkaW9uX190cmlnZ2VyLS1vcGVuIGFjY29yZGlvbl9fdHJpZ2dlci0tY2xvc2VkXCIpO1xyXG4gICAgJCh0aGlzKS5jbG9zZXN0KFwiLmFjY29yZGlvblwiKS50b2dnbGVDbGFzcyhcImFjY29yZGlvbi0tY2xvc2VkIGFjY29yZGlvbi0tb3BlblwiKTtcclxuXHJcbiAgfSk7XHJcblxyXG4gICQoJ2lucHV0W25hbWU9dGF4LWZpbGUtbnVtYmVyXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy52YWx1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnVEZOIHNldCB0bzogJywgdGhpcy52YWx1ZSk7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0Zm4nLCB0aGlzLnZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0Zm4nKTtcclxuICAgIH1cclxuICB9KTtcclxufSk7Il0sImZpbGUiOiJzdHVkZW50cy5qcyJ9
