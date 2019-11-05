// // Student claim pages
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
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
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
    $('.btnNext').prop('onclick', null);
    $('.btnNext').click(function () {
      // event.stopPropagation();
      window.location.href = '/studentclaimupload';
    })
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
"use strict";