// // Student claim pages
// jQuery(document).ready(function ($) {
//   // alert('window.location.pathname' + window.location.pathname);
//   function initStudents() {
//     var studentNameFirst = localStorage.getItem('studentNameFirst');
//     // get the name from storage 
//     if (localStorage.getItem('studentNameFirst')) {
//       // add '
//       var apostrophe = "'";
//       // add s to ' if student's name doesn't end in s
//       if (localStorage.getItem('studentNameFirst').slice(-1) !== "s") {
//         apostrophe = apostrophe + "s";
//       }
//     }
//     var studentNameFirstApostrophed = localStorage.getItem('studentNameFirst') + apostrophe;
//     // only for veteran and parent/guardian flows
//     if (("veteranFlow" in localStorage) || ("claimantFlow" in localStorage)) {
//       // both apostrophed and straight names are used in the screens 
//       $(".studentNameFirstApostrophed").html(studentNameFirstApostrophed);
//       $(".studentNameFirst").html(localStorage.getItem('studentNameFirst'));
//     } else {
//       $(".studentNameFirstApostrophed").html('');
//       $(".studentNameFirst").html('');
//     }
//     // Pull in the json content 
//     $.ajax({
//       url: '/docs/data/student-claim-content.json',
//       async: false,
//       dataType: 'json',
//     }).done(function (data) {
//       console.log('Content data back');
//       var contentSet = [];
//       var contentVeteran = [];
//       var contentStudent = [];
//       var contentParentGuardian = [];
//       var contentMessages = [];
//       $.each(data.contents, function (index, element) {
//         if (element.veteran) {
//           contentVeteran = element.veteran;
//         }
//         if (element.parentGuardian) {
//           contentParentGuardian = element.parentGuardian;
//         }
//         if (element.student) {
//           contentStudent = element.student;
//         }
//         if (element.messages) {
//           contentMessages = element.messages;
//         }
//       });
//       if ("veteranFlow" in localStorage) {
//         contentSet = Object.assign({}, contentMessages, contentVeteran);
//       }
//       if ("claimantFlow" in localStorage) {
//         contentSet = Object.assign({}, contentMessages, contentParentGuardian);
//       }
//       if ("studentFlow" in localStorage) {
//         contentSet = Object.assign({}, contentMessages, contentStudent);
//       }
//       for (var key in contentSet) {
//         var content = contentSet[key].replace(/{{studentNameFirstApostrophed}}/g, studentNameFirstApostrophed);
//         content = content.replace(/{{studentNameFirst}}/g, studentNameFirst);
//         $("#question_" + key).html(content);
//       }
//     });
//   }
//   function initFlow() {
//     if ("veteranFlow" in localStorage) {
//       $(".pt-flow--veteran").show("fast");
//     }
//     if ("studentFlow" in localStorage) {
//       $(".pt-flow--student").show("fast");
//     }
//     if ("claimantFlow" in localStorage) {
//       $(".pt-flow--claimant").show("fast");
//     }
//   }
//   // TODO:: handle reset if change of age after other flows
//   if (window.location.pathname === "/auth/claim/studentpreeligibility") {
//     localStorage.clear();
//     // now in main
//     // var getUrlParameter = function getUrlParameter(sParam) {
//     //   var sPageURL = decodeURIComponent(window.location.search.substring(1)),
//     //     sURLVariables = sPageURL.split('&'),
//     //     sParameterName,
//     //     i;
//     //   for (i = 0; i < sURLVariables.length; i++) {
//     //     sParameterName = sURLVariables[i].split('=');
//     //     if (sParameterName[0] === sParam) {
//     //       return sParameterName[1] === undefined ? true : sParameterName[1];
//     //     }
//     //   }
//     // };
//     var flow = getUrlParameter('flow');
//     var age = getUrlParameter('studentAge');
//     var docUploads = getUrlParameter('docUploads');
//     var act = getUrlParameter('act');
//     console.log('flow = ' + flow);
//     if (flow) {
//       localStorage.setItem(flow, true);
//       localStorage.setItem('flow', flow);
//       if (age) {
//         localStorage.setItem('studentAge', age);
//       }
//       if (docUploads) {
//         localStorage.setItem('docUploads', docUploads);
//       } else { // setting all flows to shopping card uploads by default 
//         localStorage.setItem('docUploads', 'shopping');
//       }
//       if (act) {
//         localStorage.setItem('act', act);
//       } else { // setting everyone to mrca if not specified 
//         localStorage.setItem('act', 'mrca');
//       }
//     } else {
//       // alert('The prototype requires a flow and age in the url string e.g.  ' + location.protocol + '//' + location.host + location.pathname + '?flow=studentFlow&studentAge=10')
//     }
//     if (flow !== (localStorage.getItem('flow'))) {
//       window.location.reload(true);
//     }
//     initStudents();
//     if ("veteranFlow" in localStorage) {
//       // alert('im vet');
//       $(".pt-flow--veteran").show();
//     }
//     if ("studentFlow" in localStorage) {
//       $(".pt-flow--student").show();
//     }
//     if ("claimantFlow" in localStorage) {
//       $(".pt-flow--claimant").show();
//     }
//     function init() {
//       console.log('loading init');
//       $(".pt-showIfStudentShouldClaimThemselves").hide();
//       $(".pt-showIfStudentUnder18").hide();
//       $(".pt-showIfCentrelinkCustomer").hide();
//       $(".pt-showIfYourFTB").hide();
//       $(".pt-showIfSomeoneElseFTB").hide();
//       $(".pt-showIfNoFTB").hide();
//       $(".pt-showIfStudentBetween16and18").hide();
//       $(".pt-showIfStudentUnder0").hide();
//       $(".pt-showIfNoTFN").hide();
//       $(".pt-showFTBIsBest").hide();
//       $('.pt-showIfMRCA').hide();
//       $(".pt-showIfStudentFullTimeAndMRCA").hide();
//       $(".pt-vetShowIfStudentFullTimeAndMRCA").hide();
//       $(".pt-showIfStudentConfirmed").hide();
//       $('.pt-showIfEngagedInFullTimeEmployment').hide();
//       $(".pt-showIfStudentDependantOnVeteran").hide();
//       $('.pt-showIfRelationshipValid').hide();
//       $('.pt-studentFullTime').hide();
//       $('.pt-showIfStudentCantClaim').hide();
//       $('.pt-showIfStudentNotDependant').hide();
//       $('.pt-aboutYou').hide();
//       $('.pt-studentOver25').hide();
//       $('.pt-studentTooyoung').hide();
//       $('.pt-VeteranRelationshipToStudent').hide();
//       $(".pt-StudentRelationshipToVeteran").hide();
//       $(".pt-StudentRelationshipToClaimant").hide();
//     }
//     function resetForm($form) {
//       $('input[type=radio]:checked').not('input[type=radio][name=confirmStudentOrClaimant]').prop('checked', false);
//     }
//     init();
//     $('input[name=fTBYou]').change(function () {
//       if ($('input[name=fTBYou]:checked').val() === 'yes') {
//         $(".pt-showIfYourFTB").show();
//         $(".pt-showIfSomeoneElseFTB").hide();
//         $(".pt-showIfCentrelinkCustomer").show();
//         localStorage.removeItem('veteranReceivesFTB');
//         localStorage.setItem('veteranReceivesFTB', true);
//         if (("veteranFlow" in localStorage) || ("claimantFlow" in localStorage)) {
//           if ((localStorage.getItem('studentAge') <= 18) && (localStorage.getItem('studentAge') > 15)) {
//             $(".pt-showFTBIsBest").show();
//           }
//         }
//         if (("veteranFlow" in localStorage)) {
//           if ((localStorage.getItem('studentAge') <= 18) && (localStorage.getItem('studentAge') > 15)) {
//             $(".pt-vetStudentEngagedInFullTimeEmployment").show();
//           }
//         }
//         if (!("claimantFlow" in localStorage)) {
//           // if student 16 or 17 ask for TFN
//           if ((localStorage.getItem('studentAge') <= 18) && (localStorage.getItem('studentAge') > 15)) {
//             $(".pt-showIfStudentBetween16and18").show();
//           } else {
//             $(".pt-showIfStudentBetween16and18").hide();
//           }
//         }
//       } else {
//         $(".pt-showIfYourFTB").hide();
//         $(".pt-showIfSomeoneElseFTB").show();
//         $(".pt-showIfCentrelinkCustomer").hide();
//         localStorage.removeItem('veteranReceivesFTB');
//         localStorage.setItem('veteranReceivesFTB', false);
//       }
//     });
//     $('input[name=fTBSomeoneElse]').change(function () {
//       if ($('input[name=fTBSomeoneElse]:checked').val() === 'yes') {
//         $(".pt-showIfNoFTB").show();
//       } else {
//         $(".pt-showIfNoFTB").hide();
//         $(".pt-showIfCentrelinkCustomer").hide();
//         // if student 16 or 17 ask for TFN
//         if (!("claimantFlow" in localStorage)) {
//           if ((localStorage.getItem('studentAge') <= 18) && (localStorage.getItem('studentAge') > 15)) {
//             $(".pt-showIfStudentBetween16and18").show();
//           } else {
//             $(".pt-showIfStudentBetween16and18").hide();
//           }
//         }
//         if ("veteranFlow" in localStorage) {
//           if ((localStorage.getItem('studentAge') < 18) && (localStorage.getItem('studentAge') > 15)) {
//             $(".pt-vetStudentEngagedInFullTimeEmployment").show();
//           }
//         }
//       }
//     });
//     $('input[name=engagedInFullTimeEmployment]').change(function () {
//       if ($('input[name=engagedInFullTimeEmployment]:checked').val() === 'yes') {
//         if (("veteranFlow" in localStorage)) {
//           $(".pt-vetShowIfStudentFullTimeAndMRCA").show();
//         } else {
//           $(".pt-showIfStudentFullTimeAndMRCA").show();
//         }
//       } else {
//         $(".pt-vetShowIfStudentFullTimeAndMRCA").hide();
//         $(".pt-showIfStudentFullTimeAndMRCA").hide();
//         $(".pt-StudentRelationshipToVeteran").show();
//       }
//       if (("veteranFlow" in localStorage)) {
//         $(".pt-final-toggle").show();
//       }
//     });
//     // Calculate student age
//     $(".pt-student-dob > :input").keyup(function () {
//       var dobDay = $("#dd-date").val();
//       var dobMonth = $("#mm-date").val();
//       var dobYear = $("#yyyy-date").val();
//       // if a valid date
//       if (dobDay && dobMonth && (dobYear.length === 4)) {
//         if (dobDay.length === 1) {
//           dobDay = "0" + dobDay;
//         }
//         if (dobMonth.length === 1) {
//           dobMonth = "0" + dobMonth;
//         }
//         var dob = dobYear + '-' + dobMonth + '-' + dobDay;
//         dob = new Date(dob);
//         var today = new Date();
//         var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
//         localStorage.removeItem('studentAge');
//         localStorage.setItem('studentAge', age);
//         console.debug('student age: ', age);
//         // validation:: older than 5
//         if (localStorage.getItem('studentAge') < 5) {
//           init();
//           resetForm($('#pt-form'));
//           $(".pt-showIfStudentUnder0").show();
//         } else {
//           console.log('student is older than 4');
//           $(".pt-showIfStudentUnder0").hide();
//           // veteran and claimant flow only
//           if (("veteranFlow" in localStorage)) {
//             // if over 18, suggest student claims on their own 
//             if (localStorage.getItem('studentAge') > 24) {
//               init();
//               $(".pt-showIfStudentCantClaim").show();
//             } else if (localStorage.getItem('studentAge') > 17) {
//               init();
//               resetForm($('#pt-form'));
//               $(".pt-showIfStudentShouldClaimThemselves").show();
//               // $(".pt-showIfStudentUnder18").hide();
//             } else {
//               init();
//               $(".pt-showIfStudentShouldClaimThemselves").hide();
//               $(".pt-VeteranRelationshipToStudent").show();
//               $(".pt-StudentRelationshipToVeteran").hide();
//               $(".pt-showIfStudentUnder18").show();
//               // $(".pt-claimantShowIfStudentOver16").show();
//             }
//             $('input[name=veteranSignificantlyInjured]').change(function () {
//               if ($('input[name=veteranSignificantlyInjured]:checked').val() === 'yes') {
//                 $(".pt-showIfStudentNotDependant").show();
//               } else {
//                 $(".pt-showIfStudentNotDependant").hide();
//               }
//             });
//           }
//           // claimant flow only
//           if ("claimantFlow" in localStorage) {
//             if (localStorage.getItem('studentAge') > 24) {
//               init();
//               $(".pt-showIfStudentCantClaim").show();
//             } else if (localStorage.getItem('studentAge') > 17) {
//               init();
//               $(".pt-showIfStudentShouldClaimThemselves").show();
//               // $(".pt-showIfStudentUnder18").hide();
//             } else if ((localStorage.getItem('studentAge') > 15) && (localStorage.getItem('studentAge') <= 18)) {
//               init();
//               $(".pt-showIfStudentShouldClaimThemselves").hide();
//               $(".pt-claimantShowIfStudentOver16").show();
//             } else { // under 16
//               init();
//               $(".pt-showIfEngagedInFullTimeEmployment").show();
//               $(".pt-StudentRelationshipToVeteran").show();
//             }
//             $('input[name=veteranSignificantlyInjured]').change(function () {
//               if ($('input[name=veteranSignificantlyInjured]:checked').val() === 'yes') {
//                 $(".pt-showIfStudentUnder18").show();
//                 $(".pt-StudentRelationshipToClaimant").show();
//                 $(".pt-aboutYou").show();
//                 $(".pt-showIfStudentNotDependant").hide();
//               } else {
//                 $(".pt-showIfStudentUnder18").hide();
//                 $(".pt-aboutYou").hide();
//                 $(".pt-showIfStudentNotDependant").show();
//               }
//             });
//           }
//         }
//       }
//     });
//     $("#relationshipToStudent").change(function () {
//       var selected_option = $('#relationshipToStudent').val();
//       localStorage.removeItem('relationshipType');
//       localStorage.setItem('relationshipType', selected_option);
//       if ("claimantFlow" in localStorage) {
//         if ((selected_option === 'adoptive-parent') || (selected_option === 'parent')) {
//           $('.pt-showIfRelationshipValid').hide();
//           $('#relationshipToStudentOther').hide();
//           $('.pt-showIfStudentDependantOnVeteran').show();
//         } else if (selected_option === 'other') {
//           $('#relationshipToStudentOther').show();
//         } else {
//           $('.pt-showIfRelationshipValid').show();
//           $('#relationshipToStudentOther').hide();
//           $('.pt-showIfStudentDependantOnVeteran').hide();
//         }
//       } else {
//         if (selected_option === 'other') {
//           $('#relationshipToStudentOther').show();
//         } else {
//           $('#relationshipToStudentOther').hide();
//         }
//       }
//     });
//     // confirm student or claimant
//     $('input[name=confirmStudentOrClaimant]').change(function () {
//       // localStorage.clear();
//       if ($('input[name=confirmStudentOrClaimant]:checked').val() === 'guardian') {
//         localStorage.removeItem('studentFlow');
//         localStorage.removeItem('studentFlowConfirmed');
//         localStorage.setItem('claimantFlow', true);
//         localStorage.setItem('claimantFlowConfirmed', true);
//         init();
//         $(".pt-student-dob").show();
//         initStudents();
//       } else if ($('input[name=confirmStudentOrClaimant]:checked').val() === 'student') {
//         localStorage.removeItem('claimantFlowConfirmed');
//         localStorage.removeItem('claimantFlow');
//         localStorage.setItem('studentFlow', true);
//         localStorage.setItem('studentFlowConfirmed', true);
//         init();
//         $(".pt-student-dob").hide();
//         $('.pt-studentFullTime').show();
//         $(".pt-showIfStudentConfirmed").show();
//         console.log(localStorage.getItem('studentAge'));
//         // Show warning eligibility message if student is over 25.
//         if (localStorage.getItem('studentAge') > 24) {
//           console.log('over 25');
//           $(".pt-studentOver25").show();
//           $(".pt-studentTooyoung").hide();
//           $('.pt-studentFullTime').show();
//           $(".pt-showIfStudentConfirmed").show();
//         }
//         // Show error message if student is under 16
//         if (localStorage.getItem('studentAge') < 16) {
//           console.log('under 16');
//           $(".pt-studentTooyoung").show();
//           $('.pt-studentFullTime').hide();
//           $(".pt-showIfStudentConfirmed").hide();
//           $(".pagination").find('.btnNext').prop('disabled', true);
//         }
//         initStudents();
//       }
//       resetForm($('#pt-form'));
//     });
//     $('input[name=engagedInFullTimeEmployment]').change(function () {
//       if ($('input[name=engagedInFullTimeEmployment]:checked').val() === 'yes') {
//       } else {
//         if (!("veteranFlow" in localStorage)) {
//           $('.pt-showIfEngagedInFullTimeEmployment').show();
//           if (!("claimantFlow" in localStorage)) {
//             $('.pt-showIfRelationshipValid').show();
//           }
//         }
//       }
//     });
//     if (!("studentFlow" in localStorage)) {
//     }
//     $('input[name=studentDependantOnVeteran]').change(function () {
//       if ($('input[name=studentDependantOnVeteran]:checked').val() === 'yes') {
//         $('.pt-showIfStudentNotDependant').hide();
//         $('.pt-showIfStudentDependantOnVeteran').show();
//       } else {
//         $('.pt-showIfStudentNotDependant').show();
//         $('.pt-showIfStudentDependantOnVeteran').hide();
//       }
//     });
//   }
//   // All student pages 
//   if (window.location.href.indexOf("student") > -1) {
//     console.log('All student pages');
//     $(".pt-showIfDocumentUploadShoppingCart").hide();
//     $(".pt-final-toggle").hide();
//     $('input[name=doesStudentHaveTFN]').change(function () {
//       if (localStorage.getItem('act') === 'mrca') {
//         $('.pt-showIfMRCA').show();
//       }
//       if ($('input[name=doesStudentHaveTFN]:checked').val() === 'yes') {
//         localStorage.removeItem('studentHasTFN');
//         localStorage.setItem('studentHasTFN', true);
//       } else {
//         localStorage.removeItem('studentHasTFN');
//         localStorage.removeItem('tfn');
//       }
//     });
//     $(".upload-list").show();
//   }
//   // Page 1
//   if (window.location.pathname === "/auth/claim/studentclaim1") {
//     initStudents();
//     initFlow();
//     $(".pt-studentAge--mature").hide();
//     $(".pt-showIfStudentLivingAtHome").hide();
//     $(".pt-studentLivingSameAddress").hide();
//     $(".pt-studentLivingWithPartnerLessRate").hide();
//     $(".pt-showLivingLocation").hide();
//     $(".upload-list").show();
//     $(".pt-showIfLivingAwayFromHome").hide();
//     $(".pt-showIfDocumentUploadShoppingCart").hide();
//     $(".pt-partneredRelationship").hide();
//     $(".pt-livingWithPartner").hide();
//     // if (true) {
//     if (localStorage.getItem('studentAge') > 15) {
//       if ("studentFlow" in localStorage) {
//         $(".pt-studentAge--mature").each(function () {
//           if ($(this).is(".pt-flow--student")) {
//             $(this).show("fast");
//           }
//         });
//       }
//       if ("veteranFlow" in localStorage) {
//         $(".pt-studentAge--mature").each(function () {
//           if ($(this).is(".pt-flow--veteran")) {
//             $(this).show("fast");
//           }
//         });
//       }
//       if ("claimantFlow" in localStorage) {
//         $(".pt-studentAge--mature").each(function () {
//           if ($(this).is(".pt-flow--claimant")) {
//             $(this).show("fast");
//           }
//         });
//       }
//       $("#veteranNameFirst").focusout(function () {
//         if ($(this).val()) {
//           localStorage.removeItem('veteranNameFirst');
//           localStorage.setItem('veteranNameFirst', $(this).val());
//         } else {
//           localStorage.removeItem('veteranNameFirst');
//         }
//       });
//       $("#veteranNameLast").focusout(function () {
//         if ($(this).val()) {
//           localStorage.removeItem('veteranNameLast');
//           localStorage.setItem('veteranNameLast', $(this).val());
//         } else {
//           localStorage.removeItem('veteranNameLast');
//         }
//       });
//     } else {
//       $(".pt-studentAge--mature").hide("slow");
//     }
//     $(".pt-partneredRelationship").hide();
//     // extra details for students 
//     if (("studentFlow" in localStorage) || "claimantFlow" in localStorage) {
//       $('.btnNext').prop('onclick', null);
//       $('.btnNext').click(function () {
//         window.location.href = '/auth/claim/studentclaim1a';
//       });
//     }
//     $('input[name=gender]').change(function () {
//       if (localStorage.getItem('studentAge') > 15) {
//         $(".pt-partneredRelationship").show();
//       } else {
//         $(".pt-showLivingLocation").show();
//       }
//     });
//     $("#firstName").focusout(function () {
//       if ($(this).val()) {
//         localStorage.removeItem('studentNameFirst');
//         localStorage.setItem('studentNameFirst', $(this).val());
//       } else {
//         localStorage.removeItem('studentNameFirst');
//       }
//     });
//     $("#lastName").focusout(function () {
//       if ($(this).val()) {
//         localStorage.removeItem('studentNameLast');
//         localStorage.setItem('studentNameLast', $(this).val());
//       } else {
//         localStorage.removeItem('studentNameLast');
//       }
//     });
//     $('input[name=studentLivingLocation]').change(function () {
//       localStorage.removeItem('studentLivingLocation');
//       localStorage.setItem('studentLivingLocation', $('input[name=studentLivingLocation]:checked').val());
//       if ($('input[name=studentLivingLocation]:checked').val() === 'homeless') {
//         $(".pt-showIfLivingAway").hide();
//         $(".pt-showIfNoPartner").hide();
//         $(".pt-livingWithPartner").hide();
//         $("pt-final-toggle").hide();
//         // skip the living arrangement details 
//         $('.btnNext').prop('onclick', null);
//         $('.btnNext').click(function () {
//           // event.stopPropagation();
//           window.location.href = '/auth/claim/studentclaim3';
//         });
//       } else {
//         $(".pt-showIfLivingAway").show('fast');
//         $(".pt-showIfNoPartner").hide();
//         $("pt-final-toggle").hide();
//         if (localStorage.getItem('studentPartneredRelationship') === 'no') {
//           $(".pt-showIfNoPartner").show();
//           $(".pt-livingWithPartner").hide();
//         }
//       }
//       if ($('input[name=studentLivingLocation]:checked').val() === 'away-from-home') {
//         $(".pt-showIfLivingAwayFromHome").show();
//       } else {
//         $(".pt-showIfLivingAwayFromHome").hide();
//       }
//     });
//     $('input[name=studentLivingWithPartner]').change(function () {
//       if ($('input[name=studentLivingWithPartner]:checked').val() === 'yes') {
//         $(".pt-studentLivingWithPartnerLessRate").show();
//       } else {
//         $(".pt-studentLivingWithPartnerLessRate").hide();
//       }
//     });
//     $('input[name=studentPartneredRelationship]').change(function () {
//       $(".pt-showLivingLocation").show();
//       if ($('input[name=studentPartneredRelationship]:checked').val() === 'yes') {
//         localStorage.removeItem('studentPartneredRelationship');
//         localStorage.setItem('studentPartneredRelationship', 'yes');
//         $(".pt-studentLivingSameAddress").show();
//       } else {
//         localStorage.removeItem('studentPartneredRelationship');
//         localStorage.setItem('studentPartneredRelationship', 'no');
//         $(".pt-studentLivingSameAddress").hide();
//       }
//     });
//     $("#relationshipToVeteran").change(function () {
//       var selected_option = $('#relationshipToVeteran').val();
//       localStorage.removeItem('relationshipType');
//       localStorage.setItem('relationshipType', selected_option);
//       if (selected_option === 'other') {
//         $('#relationshipToVeteranOther').show("fast");
//       } else {
//         $('#relationshipToVeteranOther').hide("slow");
//       }
//     });
//     $("#veteranRelationshipToStudent").change(function () {
//       var selected_option = $('#veteranRelationshipToStudent').val();
//       if (selected_option === 'other') {
//         $('#veteranRelationshipToStudentOther').show("fast");
//       } else {
//         $('#veteranRelationshipToStudentOther').hide("slow");
//       }
//     });
//     $('input[name=studentLivingAwayValidReason]').change(function () {
//       if ($('input[name=studentLivingAwayValidReason]:checked').val() === 'yes' &&
//         $('input[name=studentPartneredRelationship]:checked').val() === 'yes') {
//         $(".pt-livingWithPartner").show();
//         localStorage.removeItem('studentLivingAwayValidReason');
//         localStorage.removeItem('studentLivingLocation');
//         localStorage.setItem('studentLivingLocation', 'away-from-home');
//         localStorage.setItem('studentLivingAwayValidReason', true);
//       } else if ($('input[name=studentLivingAwayValidReason]:checked').val() === 'yes') {
//         localStorage.removeItem('studentLivingAwayValidReason');
//         localStorage.removeItem('studentLivingLocation');
//         localStorage.setItem('studentLivingLocation', 'away-from-home');
//         localStorage.setItem('studentLivingAwayValidReason', true);
//         $(".pt-final-toggle").show();
//       } else {
//         localStorage.removeItem('studentLivingAwayValidReason');
//         localStorage.removeItem('studentLivingLocation');
//         localStorage.setItem('studentLivingLocation', 'at-home');
//         $(".pt-livingWithPartner").hide();
//         $(".pt-final-toggle").show();
//       }
//     });
//     $('input[name=studentLivingWithPartner]').change(function () {
//       $(".pt-final-toggle").show();
//       if ($('input[name=studentLivingWithPartner]:checked').val() === 'yes') {
//         localStorage.removeItem('studentLivingWithPartner');
//         localStorage.setItem('studentLivingWithPartner', 'yes');
//       } else {
//         localStorage.removeItem('studentLivingWithPartner');
//         localStorage.setItem('studentLivingWithPartner', 'no');
//       }
//     });
//   }
//   // Page 1a
//   if (window.location.pathname === "/auth/claim/studentclaim1a") {
//     initStudents();
//     initFlow();
//     $(".pt-showLivingLocation").hide();
//     $(".pt-showIfLivingAwayFromHome").hide();
//     $(".pt-livingWithPartner").hide();
//     if ("claimantFlow" in localStorage) {
//       $(".pt-partneredRelationship").hide();
//     }
//     $("#firstName").focusout(function () {
//       if ($(this).val()) {
//         localStorage.removeItem('studentNameFirst');
//         localStorage.setItem('studentNameFirst', $(this).val());
//       } else {
//         localStorage.removeItem('studentNameFirst');
//       }
//     });
//     $("#lastName").focusout(function () {
//       if ($(this).val()) {
//         localStorage.removeItem('studentNameLast');
//         localStorage.setItem('studentNameLast', $(this).val());
//       } else {
//         localStorage.removeItem('studentNameLast');
//       }
//     });
//     $('input[name=gender]').change(function () {
//       if (localStorage.getItem('studentAge') > 15) {
//         $(".pt-partneredRelationship").show();
//       } else {
//         $(".pt-showLivingLocation").show();
//       }
//     });
//     $('input[name=studentPartneredRelationship]').change(function () {
//       $(".pt-showLivingLocation").show();
//     });
//     $('input[name=studentLivingLocation]').change(function () {
//       if ($('input[name=studentLivingLocation]:checked').val() === 'homeless') {
//         localStorage.removeItem('studentLivingLocation');
//         localStorage.setItem('studentLivingLocation', 'homeless');
//         $(".pt-final-toggle").hide();
//         $(".pt-livingWithPartner").hide();
//       } else if ($('input[name=studentLivingLocation]:checked').val() === 'at-home') {
//         localStorage.removeItem('studentLivingLocation');
//         localStorage.setItem('studentLivingLocation', 'at-home');
//         $(".pt-livingWithPartner").hide();
//         $(".pt-final-toggle").hide();
//       } else if ($('input[name=studentLivingLocation]:checked').val() === 'away-from-home') {
//         localStorage.removeItem('studentLivingLocation');
//         localStorage.setItem('studentLivingLocation', 'away-from-home');
//       } else {
//         localStorage.removeItem('studentLivingLocation');
//       }
//       if ($('input[name=studentLivingLocation]:checked').val() === 'away-from-home') {
//         $(".pt-showIfLivingAwayFromHome").show();
//       } else {
//         $(".pt-showIfLivingAwayFromHome").hide();
//       }
//       if ($('input[name=studentLivingLocation]:checked').val() === 'homeless') {
//         // skip the living arrangement details 
//         $('.btnNext').prop('onclick', null);
//         $('.btnNext').click(function () {
//           window.location.href = '/auth/claim/studentclaim3';
//         });
//       } else if (($('input[name=studentLivingLocation]:checked').val() === 'at-home')) {
//         if ("studentFlow" in localStorage) {
//           // skip the living arrangement details 
//           $('.btnNext').prop('onclick', null);
//           $('.btnNext').click(function () {
//             window.location.href = '/auth/claim/studentclaim3';
//           });
//         } else {
//           $('.btnNext').prop('onclick', null);
//           $('.btnNext').click(function () {
//             window.location.href = '/auth/claim/studentclaim2';
//           });
//         }
//       } else {
//         $('.btnNext').prop('onclick', null);
//         $('.btnNext').click(function () {
//           window.location.href = '/auth/claim/studentclaim2';
//         });
//       }
//     });
//     $('input[name=studentLivingAwayValidReason]').change(function () {
//       if ($('input[name=studentLivingAwayValidReason]:checked').val() === 'yes' &&
//         $('input[name=studentPartneredRelationship]:checked').val() === 'yes') {
//         $(".pt-livingWithPartner").show();
//         localStorage.removeItem('studentLivingAwayValidReason');
//         localStorage.removeItem('studentLivingLocation');
//         localStorage.setItem('studentLivingLocation', 'away-from-home');
//         localStorage.setItem('studentLivingAwayValidReason', true);
//       } else if ($('input[name=studentLivingAwayValidReason]:checked').val() === 'yes') {
//         localStorage.removeItem('studentLivingAwayValidReason');
//         localStorage.removeItem('studentLivingLocation');
//         localStorage.setItem('studentLivingLocation', 'away-from-home');
//         localStorage.setItem('studentLivingAwayValidReason', true);
//         $(".pt-final-toggle").show();
//       } else {
//         localStorage.removeItem('studentLivingAwayValidReason');
//         localStorage.removeItem('studentLivingLocation');
//         localStorage.setItem('studentLivingLocation', 'at-home');
//         $(".pt-livingWithPartner").hide();
//         $(".pt-final-toggle").show();
//       }
//     });
//     $('input[name=studentPartneredRelationship]').change(function () {
//       $(".pt-showLivingLocation").show();
//       if ($('input[name=studentPartneredRelationship]:checked').val() === 'yes') {
//         localStorage.removeItem('studentPartneredRelationship');
//         localStorage.setItem('studentPartneredRelationship', 'yes');
//       } else {
//         localStorage.removeItem('studentPartneredRelationship');
//         localStorage.setItem('studentPartneredRelationship', 'no');
//         $(".pt-studentLivingSameAddress").hide();
//       }
//     });
//     $('input[name=studentLivingWithPartner]').change(function () {
//       $(".pt-final-toggle").show();
//       if ($('input[name=studentLivingWithPartner]:checked').val() === 'yes') {
//         localStorage.removeItem('studentLivingWithPartner');
//         localStorage.setItem('studentLivingWithPartner', 'yes');
//       } else {
//         localStorage.removeItem('studentLivingWithPartner');
//         localStorage.setItem('studentLivingWithPartner', 'no');
//       }
//     });
//   }
//   if (window.location.pathname === "/auth/claim/studentclaim2") {
//     // Page 2 
//     initStudents();
//     initFlow();
//     $(".pt-showIfHomeless").hide();
//     $(".pt-showIfRequireRentAssistance").hide();
//     $(".pt-showIfRenting").hide();
//     $(".pt-showIfNotRentLandLord").hide();
//     $(".pt-rentPayed").hide();
//     $(".pt-showIfAdditionalAddress").hide();
//     $(".pt-showIfLivingAway").hide();
//     $(".pt-showIfBoarding").hide();
//     $(".pt-boardPaid").hide();
//     $(".pt-showIfOther").hide();
//     if ((localStorage.getItem('studentLivingLocation') === 'at-home') ||
//       (localStorage.getItem('studentLivingWithPartner') === 'yes') ||
//       (localStorage.getItem('studentAge') < 16)) {
//       $(".pt-showIfLivingAway").hide();
//     } else {
//       $(".pt-showIfLivingAway").show();
//     }
//     $("#studyAwayFromHomeExplanation").change(function () {
//       var selected_option = $('#studyAwayFromHomeExplanation').val();
//       if (selected_option === 'homeless') {
//         $(".pt-showIfHomeless").show('fast');
//       } else {
//         $(".pt-showIfHomeless").hide();
//       }
//     });
//     $('input[name=studentLivingArrangement]').change(function () {
//       if ($('input[name=studentLivingArrangement]:checked').val() === 'renting') {
//         $(".pt-showIfRequireRentAssistance").show();
//         $(".pt-showIfRenting").show('fast');
//         $(".pt-showIfBoarding").hide();
//         $(".pt-boardPaid").hide();
//         $(".pt-showIfOther").hide();
//         localStorage.removeItem('studentLivingArrangement');
//         localStorage.setItem('studentLivingArrangement', 'renting');
//       } else if ($('input[name=studentLivingArrangement]:checked').val() === 'boarding') {
//         $(".pt-boardPaid").show();
//         $(".pt-showIfBoarding").show('fast');
//         $(".pt-showIfRenting").hide();
//         $(".pt-showIfOther").hide();
//         $(".pt-showIfRequireRentAssistance").hide();
//         localStorage.removeItem('studentLivingArrangement');
//         localStorage.setItem('studentLivingArrangement', 'boarding');
//       } else if ($('input[name=studentLivingArrangement]:checked').val() === 'other') {
//         localStorage.removeItem('studentLivingArrangement');
//         localStorage.setItem('studentLivingArrangement', 'other');
//         $(".pt-showIfOther").show();
//         $(".pt-boardPaid").hide();
//         $(".pt-showIfBoarding").hide();
//         $(".pt-showIfRenting").hide();
//         $(".pt-showIfRequireRentAssistance").hide();
//       } else {
//         localStorage.removeItem('studentLivingArrangement');
//       }
//     });
//     $('input[name=sharingResidence]').change(function () {
//       $(".pt-rentPayed").show();
//     });
//     $('input[name=sameAsPostal]').change(function () {
//       if ($(this).is(':checked')) {
//         $(".pt-showIfAdditionalAddress").hide();
//       } else {
//         $(".pt-showIfAdditionalAddress").show();
//       }
//     });
//   }
//   if (window.location.pathname === "/auth/claim/studentclaim3") {
//     // page 3
//     initStudents();
//     initFlow();
//     $(".pt-showIfNotPrimaryStudent").hide();
//     $(".pt-showIfPrimary").hide();
//     $(".pt-showIfSecondary").hide();
//     $(".pt-showIfTertiary").hide();
//     $(".pt-showIfPartTime").hide();
//     $(".pt-noLongerEligible").hide();
//     $(".pt-noLongerEligibleTwo").hide();
//     $(".pt-showIfStudyLoadNotAnswered").hide();
//     $(".pt-showIfEnrolled").hide();
//     $(".pt-enrollStatusStudentOver25").hide();
//     // $(".pt-enrollDatestudentOver25").hide();
//     // skip the financial details if we're in veteran flow
//     // if ("veteranFlow" in localStorage) {
//     //   $('.btnNext').prop('onclick', null);
//     //   $('.btnNext').click(function () {
//     //     // event.stopPropagation();
//     //     window.location.href = '/studentclaimupload';
//     //   })
//     // }
//     if (localStorage.getItem('studentLevelOfStudy') !== 'primary') {
//       $(".pt-showIfNotPrimaryStudent").show('fast');
//     }
//     $("#studentLevelOfStudy").change(function () {
//       var selected_option = $('#studentLevelOfStudy').val();
//       var grade_options;
//       if (selected_option === 'primary') {
//         $(".pt-noLongerEligible").hide();
//         $(".pt-showIfSecondary").hide();
//         $(".pt-showIfTertiary").hide();
//         $(".pt-showIfPrimary").show('fast');
//         localStorage.removeItem('studentLevelOfStudy');
//         localStorage.setItem('studentLevelOfStudy', 'primary');
//         $(".pagination").find('button').prop('disabled', false);
//       } else if (selected_option.startsWith('secondary')) {
//         $(".pt-noLongerEligible").hide();
//         $(".pt-showIfTertiary").hide();
//         $(".pt-showIfPrimary").hide();
//         $(".pt-showIfSecondary").show();
//         localStorage.removeItem('studentLevelOfStudy');
//         localStorage.setItem('studentLevelOfStudy', 'secondary');
//         $(".pagination").find('button').prop('disabled', false);
//       } else if ((selected_option.startsWith('tertiary')) || (selected_option === 'apprenticeship')) {
//         $(".pt-noLongerEligible").hide();
//         $(".pt-showIfPrimary").hide();
//         $(".pt-showIfSecondary").hide();
//         $(".pt-showIfTertiary").show('fast');
//         if (localStorage.getItem('studentLoadOfStudy') === null) {
//           $(".pt-showIfStudyLoadNotAnswered").show('fast');
//         }
//         if (localStorage.getItem('studentLoadOfStudy') === 'part-time') {
//           $(".pt-showIfPartTime").show('fast');
//         }
//         localStorage.removeItem('studentLevelOfStudy');
//         localStorage.setItem('studentLevelOfStudy', 'tertiary');
//         $(".pagination").find('button').prop('disabled', false);
//       }
//     });
//     $('input[name=studyLoad]').change(function () {
//       if ($('input[name=studyLoad]:checked').val() === 'part-time') {
//         $(".pt-showIfPartTime").show('fast');
//         localStorage.removeItem('studentLoadOfStudy');
//         localStorage.setItem('studentLoadOfStudy', 'part-time');
//       } else {
//         $(".pt-showIfPartTime").hide();
//         localStorage.removeItem('studentLoadOfStudy');
//         localStorage.setItem('studentLoadOfStudy', 'full-time');
//       }
//     });
//     $('input[name=enrolStatus]').change(function () {
//       if ($('input[name=enrolStatus]:checked').val() === 'no') {
//         localStorage.removeItem('enrolStatus');
//         $(".pt-noLongerEligibleTwo").show();
//         $(".pt-showIfEnrolled").hide();
//         // Show an error message if the student is 25 or older and hasn't enrolled
//         if (localStorage.getItem('studentAge') > 24) {
//           $(".pt-enrollStatusStudentOver25").show();
//           $(".pt-noLongerEligibleTwo").hide();
//           // $(".pt-enrollDatestudentOver25").hide();
//           $(".pagination").find('.btnNext').prop('disabled', true);
//         }
//       } else {
//         localStorage.removeItem('enrolStatus');
//         localStorage.setItem('enrolStatus', true);
//         $(".pt-noLongerEligibleTwo").hide();
//         $(".pt-enrollStatusStudentOver25").hide();
//         $(".pt-showIfEnrolled").show();
//         //show an error message if the student is 25 or older and enrolled after they turned 25. The smarts don't exist in prototype.
//         if (localStorage.getItem('studentAge') > 24) {
//           // $(".pt-enrollDatestudentOver25").show();
//           $(".pagination").find('.btnNext').prop('disabled', false);
//         }
//       }
//     });
//   }
//   if (window.location.pathname === "/auth/claim/studentclaimupload") {
//     initStudents();
//   }
//   if (window.location.pathname === "/auth/claim/studentclaim4") {
//     // Page 4
//     initStudents();
//     initFlow();
//     $('.pt-studentAge--mature').hide();
//     $('.pt-showIfEducationAllowanceTaxed').hide();
//     $('.pt-showIfEducationAllowanceNotTaxed').hide();
//     $('.pt-showIfCarePercentageLow').hide();
//     $('.pt-showIfCarePercentageHigh').hide();
//     $('.bank-details-container').hide();
//     $('.pt-showIfNoStudentTFN').hide();
//     $('.pt-showIfStudentTFN').hide();
//     $('.pt-studentFinancialPermission').hide();
//     // if student 16 or 17 ask for TFN
//     if (("claimantFlow" in localStorage) || ("veteranFlow" in localStorage)) {
//       if ((localStorage.getItem('studentAge') <= 18) && (localStorage.getItem('studentAge') > 15)) {
//         $(".pt-showIfStudentBetween16and18").show();
//       } else {
//         $(".pt-showIfStudentBetween16and18").hide();
//       }
//     }
//     if (("studentFlow" in localStorage)) {
//       if ((localStorage.getItem('studentAge') < 18) && (localStorage.getItem('studentAge') > 15)) {
//         $('.pt-studentFinancialPermission').show();
//       }
//     }
//     if (localStorage.getItem('studentAge') > 15) {
//       $('.pt-studentAge--mature').show();
//     }
//     $('input[name=educationAllowanceTaxed]').change(function () {
//       if ($('input[name=educationAllowanceTaxed]:checked').val() === 'yes') {
//         $(".pt-showIfEducationAllowanceTaxed").show();
//         $('.pt-showIfEducationAllowanceNotTaxed').hide();
//       } else {
//         $(".pt-showIfEducationAllowanceTaxed").hide();
//         $('.pt-showIfEducationAllowanceNotTaxed').show('fast');
//       }
//     });
//     // bank details button function
//     $("#btnAddBank").click(function () {
//       $(".bank-details-container").show("fast");
//       $("#btnAddBank-box").hide();
//       $("#bankoptional").hide();
//       $("#btnCancelBank").show();
//       $("#bank-name").focus();
//     });
//     $("#btnCancelBank").click(function () {
//       $(".bank-details-container").hide("fast");
//       $("#btnCancelBank").hide();
//       $("#bankoptional").show();
//       $("#btnAddBank-box").show();
//     });
//     $(".message-close").click(function () {
//       $(".bank-details-container").hide("fast");
//     });
//     $('input[name=doesStudentHaveTFN]').change(function () {
//       if ($('input[name=doesStudentHaveTFN]:checked').val() === 'yes') {
//         localStorage.setItem('studentTFN', true);
//         $(".pt-showIfNoStudentTFN").hide();
//         $(".pt-showIfStudentTFN").show();
//       } else {
//         localStorage.setItem('studentTFN', false);
//         localStorage.removeItem('tfn');
//         $(".pt-showIfNoStudentTFN").show('fast');
//         $(".pt-showIfStudentTFN").hide();
//       }
//     });
//   }
//   if (window.location.pathname === "/auth/claim/studentclaim4a") {
//     initStudents();
//     initFlow();
//   }
//   if (window.location.pathname === "/auth/claim/studentclaim6") {
//     initStudents();
//     $(".pt-showIfNoStudentTFN").hide();
//     if (!(localStorage.getItem('studentHasTFN')) && (localStorage.getItem('studentAge') > 15)) {
//       $(".pt-showIfNoStudentTFN").show();
//     }
//     var businessDays = 5,
//       counter = 1; // set to 1 to count from next business day
//     while (businessDays > 0) {
//       var tmp = new Date();
//       tmp.setDate(tmp.getDate() + counter++);
//       switch (tmp.getDay()) {
//         case 0:
//         case 6:
//           break; // sunday & saturday
//         default:
//           businessDays--;
//       };
//     }
//     document.querySelector(".pt-bussnessDaysOutcome").innerHTML = tmp.toDateString();
//   }
//   // PoC check docs required for prototype
//   function Person() {
//     // how many times is the called
//     this.i = 0;
//     this.studentAge;
//     this.studentNameFirst;
//     this.docsRequired = [];
//     // privileged init method
//     this.init();
//   }
//   // defining init method
//   Person.prototype.init = function () {
//     // reassign this
//     var _this = this;
//     _this.checkDocs();
//     setInterval(function () {
//       _this.checkDocs();
//     }, 1500);
//   };
//   Person.prototype.checkDocs = function () {
//     this.i++;
//     // list of docs
//     // Proof of relationship = proofOfRelationship
//     // Proof of residence = proofOfResidence
//     // Proof of enrolment = proofOfEnrolment
//     // Part-time study reason = partTimeStudyReason
//     // Tax file number declaration = tFNDeclaraion
//     // check type of person 
//     if (("studentFlow" in localStorage) || ("veteranFlow" in localStorage) || ("claimantFlow" in localStorage)) {
//       if ("studentFlow" in localStorage) {
//         this.type = 'student';
//       } else if ("veteranFlow" in localStorage) {
//         this.type = 'veteran';
//       } else if ("claimantFlow" in localStorage) {
//         this.type = 'claimant';
//       }
//     }
//     // Proof of relationship 
//     if ("veteranFlow" in localStorage) {
//       if ((localStorage.getItem('studentNameFirst') !== null) && (localStorage.getItem('studentNameLast') !== null)) {
//         initStudents();
//         this.docsRequired.indexOf("proofOfRelationshipClaimantStudent") === -1 ? this.docsRequired.push("proofOfRelationshipClaimantStudent") : console.log();
//       } else {
//         var i = this.docsRequired.indexOf("proofOfRelationshipClaimantStudent");
//         if (i != -1) {
//           this.docsRequired.splice(i, 1);
//           $('.pt-proofOfRelationshipClaimantStudent').addClass('display-none');
//         }
//       }
//     } else if ("studentFlow" in localStorage) {
//       if ((localStorage.getItem('veteranNameFirst') !== null) && (localStorage.getItem('veteranNameLast') !== null)) {
//         this.docsRequired.indexOf("proofOfRelationship") === -1 ? this.docsRequired.push("proofOfRelationship") : console.log();
//       } else {
//         var i = this.docsRequired.indexOf("proofOfRelationship");
//         if (i != -1) {
//           this.docsRequired.splice(i, 1);
//           $('.pt-proofOfRelationship').addClass('display-none');
//         }
//       }
//     } else if ("claimantFlow" in localStorage) {
//       if ((localStorage.getItem('veteranNameFirst') !== null) && (localStorage.getItem('veteranNameLast') !== null) && (localStorage.getItem('studentNameFirst') !== null) && (localStorage.getItem('studentNameLast') !== null)) {
//         initStudents();
//         if ((localStorage.getItem('veteranNameFirst') !== null) && (localStorage.getItem('veteranNameLast') !== null)) {
//           this.docsRequired.indexOf("proofOfRelationshipVeteranStudent") === -1 ? this.docsRequired.push("proofOfRelationshipVeteranStudent") : console.log();
//         } else {
//           var i = this.docsRequired.indexOf("proofOfRelationshipVeteranStudent");
//           if (i != -1) {
//             this.docsRequired.splice(i, 1);
//             $('.pt-proofOfRelationshipVeteranStudent').addClass('display-none');
//           }
//         }
//         if ((localStorage.getItem('studentNameFirst') !== null) && (localStorage.getItem('studentNameLast') !== null)) {
//           this.docsRequired.indexOf("proofOfRelationshipClaimantStudent") === -1 ? this.docsRequired.push("proofOfRelationshipClaimantStudent") : console.log();
//         } else {
//           var i = this.docsRequired.indexOf("proofOfRelationshipClaimantStudent");
//           if (i != -1) {
//             this.docsRequired.splice(i, 1);
//             $('.pt-proofOfRelationshipClaimantStudent').addClass('display-none');
//           }
//         }
//       }
//     }
//     // Proof of enrolment 
//     if ("enrolStatus" in localStorage) {
//       this.docsRequired.indexOf("proofOfEnrolment") === -1 ? this.docsRequired.push("proofOfEnrolment") : console.log();
//     } else {
//       var i = this.docsRequired.indexOf("proofOfEnrolment");
//       if (i != -1) {
//         this.docsRequired.splice(i, 1);
//         $('.pt-proofOfEnrolment').addClass('display-none');
//       }
//     }
//     // Proof of residence 
//     if (localStorage.getItem('studentLivingLocation') === 'away-from-home') {
//       this.docsRequired.indexOf("proofOfResidence") === -1 ? this.docsRequired.push("proofOfResidence") : console.log();
//     } else {
//       var i = this.docsRequired.indexOf("proofOfResidence");
//       if (i != -1) {
//         this.docsRequired.splice(i, 1);
//         $('.pt-proofOfResidence').addClass('display-none');
//       }
//     }
//     // Part-time study reason 
//     if ((localStorage.getItem('studentLoadOfStudy') === 'part-time')) {
//       this.docsRequired.indexOf("partTimeStudyReason") === -1 ? this.docsRequired.push("partTimeStudyReason") : console.log();
//     } else {
//       var i = this.docsRequired.indexOf("partTimeStudyReason");
//       if (i != -1) {
//         this.docsRequired.splice(i, 1);
//         $('.pt-partTimeStudyReason').addClass('display-none');
//       }
//     }
//     // show all required docs 
//     if (this.docsRequired.length > 0) {
//       jQuery(".pt-showIfDocumentUploadShoppingCart").show();
//       $.each(this.docsRequired, function () {
//         $('.pt-' + this).removeClass('display-none');
//       });
//     }
//   };
//   // create a new person
//   var counter = new Person();
//   $(".accordion__trigger").click(function () {
//     $(this).toggleClass("accordion__trigger--open accordion__trigger--closed");
//     $(this).closest(".accordion").toggleClass("accordion--closed accordion--open");
//   });
//   $('input[name=tax-file-number]').change(function () {
//     if (this.value) {
//       console.log('TFN set to: ', this.value);
//       localStorage.setItem('tfn', this.value);
//     } else {
//       localStorage.removeItem('tfn');
//     }
//   });
// });
"use strict";
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0dWRlbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFJQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUlBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFFQTtBQUVBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBTUE7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAvLyBTdHVkZW50IGNsYWltIHBhZ2VzXHJcbi8vIGpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCQpIHtcclxuXHJcbi8vICAgLy8gYWxlcnQoJ3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZScgKyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xyXG5cclxuLy8gICBmdW5jdGlvbiBpbml0U3R1ZGVudHMoKSB7XHJcblxyXG4vLyAgICAgdmFyIHN0dWRlbnROYW1lRmlyc3QgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudE5hbWVGaXJzdCcpO1xyXG4vLyAgICAgLy8gZ2V0IHRoZSBuYW1lIGZyb20gc3RvcmFnZSBcclxuLy8gICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudE5hbWVGaXJzdCcpKSB7XHJcbi8vICAgICAgIC8vIGFkZCAnXHJcbi8vICAgICAgIHZhciBhcG9zdHJvcGhlID0gXCInXCI7XHJcbi8vICAgICAgIC8vIGFkZCBzIHRvICcgaWYgc3R1ZGVudCdzIG5hbWUgZG9lc24ndCBlbmQgaW4gc1xyXG4vLyAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnROYW1lRmlyc3QnKS5zbGljZSgtMSkgIT09IFwic1wiKSB7XHJcbi8vICAgICAgICAgYXBvc3Ryb3BoZSA9IGFwb3N0cm9waGUgKyBcInNcIjtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHZhciBzdHVkZW50TmFtZUZpcnN0QXBvc3Ryb3BoZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudE5hbWVGaXJzdCcpICsgYXBvc3Ryb3BoZTtcclxuXHJcbi8vICAgICAvLyBvbmx5IGZvciB2ZXRlcmFuIGFuZCBwYXJlbnQvZ3VhcmRpYW4gZmxvd3NcclxuLy8gICAgIGlmICgoXCJ2ZXRlcmFuRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkgfHwgKFwiY2xhaW1hbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSkge1xyXG5cclxuLy8gICAgICAgLy8gYm90aCBhcG9zdHJvcGhlZCBhbmQgc3RyYWlnaHQgbmFtZXMgYXJlIHVzZWQgaW4gdGhlIHNjcmVlbnMgXHJcbi8vICAgICAgICQoXCIuc3R1ZGVudE5hbWVGaXJzdEFwb3N0cm9waGVkXCIpLmh0bWwoc3R1ZGVudE5hbWVGaXJzdEFwb3N0cm9waGVkKTtcclxuLy8gICAgICAgJChcIi5zdHVkZW50TmFtZUZpcnN0XCIpLmh0bWwobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnROYW1lRmlyc3QnKSk7XHJcblxyXG5cclxuLy8gICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICQoXCIuc3R1ZGVudE5hbWVGaXJzdEFwb3N0cm9waGVkXCIpLmh0bWwoJycpO1xyXG4vLyAgICAgICAkKFwiLnN0dWRlbnROYW1lRmlyc3RcIikuaHRtbCgnJyk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLy8gUHVsbCBpbiB0aGUganNvbiBjb250ZW50IFxyXG4vLyAgICAgJC5hamF4KHtcclxuLy8gICAgICAgdXJsOiAnL2RvY3MvZGF0YS9zdHVkZW50LWNsYWltLWNvbnRlbnQuanNvbicsXHJcbi8vICAgICAgIGFzeW5jOiBmYWxzZSxcclxuLy8gICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuLy8gICAgIH0pLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbi8vICAgICAgIGNvbnNvbGUubG9nKCdDb250ZW50IGRhdGEgYmFjaycpO1xyXG5cclxuLy8gICAgICAgdmFyIGNvbnRlbnRTZXQgPSBbXTtcclxuLy8gICAgICAgdmFyIGNvbnRlbnRWZXRlcmFuID0gW107XHJcbi8vICAgICAgIHZhciBjb250ZW50U3R1ZGVudCA9IFtdO1xyXG4vLyAgICAgICB2YXIgY29udGVudFBhcmVudEd1YXJkaWFuID0gW107XHJcbi8vICAgICAgIHZhciBjb250ZW50TWVzc2FnZXMgPSBbXTtcclxuXHJcbi8vICAgICAgICQuZWFjaChkYXRhLmNvbnRlbnRzLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcclxuXHJcbi8vICAgICAgICAgaWYgKGVsZW1lbnQudmV0ZXJhbikge1xyXG4vLyAgICAgICAgICAgY29udGVudFZldGVyYW4gPSBlbGVtZW50LnZldGVyYW47XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIGlmIChlbGVtZW50LnBhcmVudEd1YXJkaWFuKSB7XHJcbi8vICAgICAgICAgICBjb250ZW50UGFyZW50R3VhcmRpYW4gPSBlbGVtZW50LnBhcmVudEd1YXJkaWFuO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBpZiAoZWxlbWVudC5zdHVkZW50KSB7XHJcbi8vICAgICAgICAgICBjb250ZW50U3R1ZGVudCA9IGVsZW1lbnQuc3R1ZGVudDtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgaWYgKGVsZW1lbnQubWVzc2FnZXMpIHtcclxuLy8gICAgICAgICAgIGNvbnRlbnRNZXNzYWdlcyA9IGVsZW1lbnQubWVzc2FnZXM7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgfSk7XHJcblxyXG4vLyAgICAgICBpZiAoXCJ2ZXRlcmFuRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG5cclxuLy8gICAgICAgICBjb250ZW50U2V0ID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGVudE1lc3NhZ2VzLCBjb250ZW50VmV0ZXJhbik7XHJcbi8vICAgICAgIH1cclxuXHJcbi8vICAgICAgIGlmIChcImNsYWltYW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG5cclxuLy8gICAgICAgICBjb250ZW50U2V0ID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGVudE1lc3NhZ2VzLCBjb250ZW50UGFyZW50R3VhcmRpYW4pO1xyXG4vLyAgICAgICB9XHJcblxyXG4vLyAgICAgICBpZiAoXCJzdHVkZW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG5cclxuLy8gICAgICAgICBjb250ZW50U2V0ID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGVudE1lc3NhZ2VzLCBjb250ZW50U3R1ZGVudCk7XHJcbi8vICAgICAgIH1cclxuXHJcbi8vICAgICAgIGZvciAodmFyIGtleSBpbiBjb250ZW50U2V0KSB7XHJcbi8vICAgICAgICAgdmFyIGNvbnRlbnQgPSBjb250ZW50U2V0W2tleV0ucmVwbGFjZSgve3tzdHVkZW50TmFtZUZpcnN0QXBvc3Ryb3BoZWR9fS9nLCBzdHVkZW50TmFtZUZpcnN0QXBvc3Ryb3BoZWQpO1xyXG4vLyAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoL3t7c3R1ZGVudE5hbWVGaXJzdH19L2csIHN0dWRlbnROYW1lRmlyc3QpO1xyXG4vLyAgICAgICAgICQoXCIjcXVlc3Rpb25fXCIgKyBrZXkpLmh0bWwoY29udGVudCk7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG5cclxuLy8gICB9XHJcblxyXG4vLyAgIGZ1bmN0aW9uIGluaXRGbG93KCkge1xyXG4vLyAgICAgaWYgKFwidmV0ZXJhbkZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHtcclxuLy8gICAgICAgJChcIi5wdC1mbG93LS12ZXRlcmFuXCIpLnNob3coXCJmYXN0XCIpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGlmIChcInN0dWRlbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XHJcbi8vICAgICAgICQoXCIucHQtZmxvdy0tc3R1ZGVudFwiKS5zaG93KFwiZmFzdFwiKTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBpZiAoXCJjbGFpbWFudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHtcclxuLy8gICAgICAgJChcIi5wdC1mbG93LS1jbGFpbWFudFwiKS5zaG93KFwiZmFzdFwiKTtcclxuLy8gICAgIH1cclxuLy8gICB9XHJcblxyXG4vLyAgIC8vIFRPRE86OiBoYW5kbGUgcmVzZXQgaWYgY2hhbmdlIG9mIGFnZSBhZnRlciBvdGhlciBmbG93c1xyXG4vLyAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09IFwiL2F1dGgvY2xhaW0vc3R1ZGVudHByZWVsaWdpYmlsaXR5XCIpIHtcclxuXHJcbi8vICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuXHJcbi8vICAgICAvLyBub3cgaW4gbWFpblxyXG4vLyAgICAgLy8gdmFyIGdldFVybFBhcmFtZXRlciA9IGZ1bmN0aW9uIGdldFVybFBhcmFtZXRlcihzUGFyYW0pIHtcclxuLy8gICAgIC8vICAgdmFyIHNQYWdlVVJMID0gZGVjb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpKSxcclxuLy8gICAgIC8vICAgICBzVVJMVmFyaWFibGVzID0gc1BhZ2VVUkwuc3BsaXQoJyYnKSxcclxuLy8gICAgIC8vICAgICBzUGFyYW1ldGVyTmFtZSxcclxuLy8gICAgIC8vICAgICBpO1xyXG5cclxuLy8gICAgIC8vICAgZm9yIChpID0gMDsgaSA8IHNVUkxWYXJpYWJsZXMubGVuZ3RoOyBpKyspIHtcclxuLy8gICAgIC8vICAgICBzUGFyYW1ldGVyTmFtZSA9IHNVUkxWYXJpYWJsZXNbaV0uc3BsaXQoJz0nKTtcclxuXHJcbi8vICAgICAvLyAgICAgaWYgKHNQYXJhbWV0ZXJOYW1lWzBdID09PSBzUGFyYW0pIHtcclxuLy8gICAgIC8vICAgICAgIHJldHVybiBzUGFyYW1ldGVyTmFtZVsxXSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHNQYXJhbWV0ZXJOYW1lWzFdO1xyXG4vLyAgICAgLy8gICAgIH1cclxuLy8gICAgIC8vICAgfVxyXG4vLyAgICAgLy8gfTtcclxuXHJcbi8vICAgICB2YXIgZmxvdyA9IGdldFVybFBhcmFtZXRlcignZmxvdycpO1xyXG4vLyAgICAgdmFyIGFnZSA9IGdldFVybFBhcmFtZXRlcignc3R1ZGVudEFnZScpO1xyXG4vLyAgICAgdmFyIGRvY1VwbG9hZHMgPSBnZXRVcmxQYXJhbWV0ZXIoJ2RvY1VwbG9hZHMnKTtcclxuLy8gICAgIHZhciBhY3QgPSBnZXRVcmxQYXJhbWV0ZXIoJ2FjdCcpO1xyXG5cclxuXHJcbi8vICAgICBjb25zb2xlLmxvZygnZmxvdyA9ICcgKyBmbG93KTtcclxuXHJcbi8vICAgICBpZiAoZmxvdykge1xyXG4vLyAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShmbG93LCB0cnVlKTtcclxuLy8gICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Zsb3cnLCBmbG93KTtcclxuLy8gICAgICAgaWYgKGFnZSkge1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50QWdlJywgYWdlKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgICBpZiAoZG9jVXBsb2Fkcykge1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkb2NVcGxvYWRzJywgZG9jVXBsb2Fkcyk7XHJcbi8vICAgICAgIH0gZWxzZSB7IC8vIHNldHRpbmcgYWxsIGZsb3dzIHRvIHNob3BwaW5nIGNhcmQgdXBsb2FkcyBieSBkZWZhdWx0IFxyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkb2NVcGxvYWRzJywgJ3Nob3BwaW5nJyk7XHJcbi8vICAgICAgIH1cclxuLy8gICAgICAgaWYgKGFjdCkge1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY3QnLCBhY3QpO1xyXG4vLyAgICAgICB9IGVsc2UgeyAvLyBzZXR0aW5nIGV2ZXJ5b25lIHRvIG1yY2EgaWYgbm90IHNwZWNpZmllZCBcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWN0JywgJ21yY2EnKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgLy8gYWxlcnQoJ1RoZSBwcm90b3R5cGUgcmVxdWlyZXMgYSBmbG93IGFuZCBhZ2UgaW4gdGhlIHVybCBzdHJpbmcgZS5nLiAgJyArIGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmhvc3QgKyBsb2NhdGlvbi5wYXRobmFtZSArICc/Zmxvdz1zdHVkZW50RmxvdyZzdHVkZW50QWdlPTEwJylcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBpZiAoZmxvdyAhPT0gKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmbG93JykpKSB7XHJcbi8vICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgaW5pdFN0dWRlbnRzKCk7XHJcblxyXG5cclxuLy8gICAgIGlmIChcInZldGVyYW5GbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XHJcblxyXG4vLyAgICAgICAvLyBhbGVydCgnaW0gdmV0Jyk7XHJcblxyXG4vLyAgICAgICAkKFwiLnB0LWZsb3ctLXZldGVyYW5cIikuc2hvdygpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGlmIChcInN0dWRlbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XHJcbi8vICAgICAgICQoXCIucHQtZmxvdy0tc3R1ZGVudFwiKS5zaG93KCk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgaWYgKFwiY2xhaW1hbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XHJcbi8vICAgICAgICQoXCIucHQtZmxvdy0tY2xhaW1hbnRcIikuc2hvdygpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbi8vICAgICAgIGNvbnNvbGUubG9nKCdsb2FkaW5nIGluaXQnKTtcclxuXHJcbi8vICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudFNob3VsZENsYWltVGhlbXNlbHZlc1wiKS5oaWRlKCk7XHJcbi8vICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudFVuZGVyMThcIikuaGlkZSgpO1xyXG4vLyAgICAgICAkKFwiLnB0LXNob3dJZkNlbnRyZWxpbmtDdXN0b21lclwiKS5oaWRlKCk7XHJcbi8vICAgICAgICQoXCIucHQtc2hvd0lmWW91ckZUQlwiKS5oaWRlKCk7XHJcbi8vICAgICAgICQoXCIucHQtc2hvd0lmU29tZW9uZUVsc2VGVEJcIikuaGlkZSgpO1xyXG4vLyAgICAgICAkKFwiLnB0LXNob3dJZk5vRlRCXCIpLmhpZGUoKTtcclxuLy8gICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50QmV0d2VlbjE2YW5kMThcIikuaGlkZSgpO1xyXG4vLyAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRVbmRlcjBcIikuaGlkZSgpO1xyXG4vLyAgICAgICAkKFwiLnB0LXNob3dJZk5vVEZOXCIpLmhpZGUoKTtcclxuLy8gICAgICAgJChcIi5wdC1zaG93RlRCSXNCZXN0XCIpLmhpZGUoKTtcclxuLy8gICAgICAgJCgnLnB0LXNob3dJZk1SQ0EnKS5oaWRlKCk7XHJcbi8vICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudEZ1bGxUaW1lQW5kTVJDQVwiKS5oaWRlKCk7XHJcbi8vICAgICAgICQoXCIucHQtdmV0U2hvd0lmU3R1ZGVudEZ1bGxUaW1lQW5kTVJDQVwiKS5oaWRlKCk7XHJcbi8vICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudENvbmZpcm1lZFwiKS5oaWRlKCk7XHJcbi8vICAgICAgICQoJy5wdC1zaG93SWZFbmdhZ2VkSW5GdWxsVGltZUVtcGxveW1lbnQnKS5oaWRlKCk7XHJcbi8vICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudERlcGVuZGFudE9uVmV0ZXJhblwiKS5oaWRlKCk7XHJcbi8vICAgICAgICQoJy5wdC1zaG93SWZSZWxhdGlvbnNoaXBWYWxpZCcpLmhpZGUoKTtcclxuLy8gICAgICAgJCgnLnB0LXN0dWRlbnRGdWxsVGltZScpLmhpZGUoKTtcclxuLy8gICAgICAgJCgnLnB0LXNob3dJZlN0dWRlbnRDYW50Q2xhaW0nKS5oaWRlKCk7XHJcbi8vICAgICAgICQoJy5wdC1zaG93SWZTdHVkZW50Tm90RGVwZW5kYW50JykuaGlkZSgpO1xyXG4vLyAgICAgICAkKCcucHQtYWJvdXRZb3UnKS5oaWRlKCk7XHJcbi8vICAgICAgICQoJy5wdC1zdHVkZW50T3ZlcjI1JykuaGlkZSgpO1xyXG4vLyAgICAgICAkKCcucHQtc3R1ZGVudFRvb3lvdW5nJykuaGlkZSgpO1xyXG4vLyAgICAgICAkKCcucHQtVmV0ZXJhblJlbGF0aW9uc2hpcFRvU3R1ZGVudCcpLmhpZGUoKTtcclxuLy8gICAgICAgJChcIi5wdC1TdHVkZW50UmVsYXRpb25zaGlwVG9WZXRlcmFuXCIpLmhpZGUoKTtcclxuLy8gICAgICAgJChcIi5wdC1TdHVkZW50UmVsYXRpb25zaGlwVG9DbGFpbWFudFwiKS5oaWRlKCk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgZnVuY3Rpb24gcmVzZXRGb3JtKCRmb3JtKSB7XHJcblxyXG4vLyAgICAgICAkKCdpbnB1dFt0eXBlPXJhZGlvXTpjaGVja2VkJykubm90KCdpbnB1dFt0eXBlPXJhZGlvXVtuYW1lPWNvbmZpcm1TdHVkZW50T3JDbGFpbWFudF0nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGluaXQoKTtcclxuXHJcblxyXG5cclxuLy8gICAgICQoJ2lucHV0W25hbWU9ZlRCWW91XScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPWZUQllvdV06Y2hlY2tlZCcpLnZhbCgpID09PSAneWVzJykge1xyXG5cclxuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZllvdXJGVEJcIikuc2hvdygpO1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmU29tZW9uZUVsc2VGVEJcIikuaGlkZSgpO1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmQ2VudHJlbGlua0N1c3RvbWVyXCIpLnNob3coKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndmV0ZXJhblJlY2VpdmVzRlRCJyk7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ZldGVyYW5SZWNlaXZlc0ZUQicsIHRydWUpO1xyXG5cclxuLy8gICAgICAgICBpZiAoKFwidmV0ZXJhbkZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHx8IChcImNsYWltYW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkpIHtcclxuLy8gICAgICAgICAgIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA8PSAxOCkgJiYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPiAxNSkpIHtcclxuLy8gICAgICAgICAgICAgJChcIi5wdC1zaG93RlRCSXNCZXN0XCIpLnNob3coKTtcclxuXHJcblxyXG4vLyAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBpZiAoKFwidmV0ZXJhbkZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpKSB7XHJcbi8vICAgICAgICAgICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPD0gMTgpICYmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudEFnZScpID4gMTUpKSB7XHJcblxyXG4vLyAgICAgICAgICAgICAkKFwiLnB0LXZldFN0dWRlbnRFbmdhZ2VkSW5GdWxsVGltZUVtcGxveW1lbnRcIikuc2hvdygpO1xyXG5cclxuLy8gICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgaWYgKCEoXCJjbGFpbWFudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpKSB7XHJcbi8vICAgICAgICAgICAvLyBpZiBzdHVkZW50IDE2IG9yIDE3IGFzayBmb3IgVEZOXHJcbi8vICAgICAgICAgICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPD0gMTgpICYmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudEFnZScpID4gMTUpKSB7XHJcbi8vICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudEJldHdlZW4xNmFuZDE4XCIpLnNob3coKTtcclxuXHJcbi8vICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRCZXR3ZWVuMTZhbmQxOFwiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZllvdXJGVEJcIikuaGlkZSgpO1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmU29tZW9uZUVsc2VGVEJcIikuc2hvdygpO1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmQ2VudHJlbGlua0N1c3RvbWVyXCIpLmhpZGUoKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndmV0ZXJhblJlY2VpdmVzRlRCJyk7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ZldGVyYW5SZWNlaXZlc0ZUQicsIGZhbHNlKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfSk7XHJcblxyXG5cclxuXHJcbi8vICAgICAkKCdpbnB1dFtuYW1lPWZUQlNvbWVvbmVFbHNlXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPWZUQlNvbWVvbmVFbHNlXTpjaGVja2VkJykudmFsKCkgPT09ICd5ZXMnKSB7XHJcblxyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmTm9GVEJcIikuc2hvdygpO1xyXG4vLyAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmTm9GVEJcIikuaGlkZSgpO1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmQ2VudHJlbGlua0N1c3RvbWVyXCIpLmhpZGUoKTtcclxuXHJcbi8vICAgICAgICAgLy8gaWYgc3R1ZGVudCAxNiBvciAxNyBhc2sgZm9yIFRGTlxyXG4vLyAgICAgICAgIGlmICghKFwiY2xhaW1hbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSkge1xyXG4vLyAgICAgICAgICAgaWYgKChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudEFnZScpIDw9IDE4KSAmJiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDE1KSkge1xyXG4vLyAgICAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRCZXR3ZWVuMTZhbmQxOFwiKS5zaG93KCk7XHJcbi8vICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRCZXR3ZWVuMTZhbmQxOFwiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIGlmIChcInZldGVyYW5GbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XHJcbi8vICAgICAgICAgICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPCAxOCkgJiYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPiAxNSkpIHtcclxuLy8gICAgICAgICAgICAgJChcIi5wdC12ZXRTdHVkZW50RW5nYWdlZEluRnVsbFRpbWVFbXBsb3ltZW50XCIpLnNob3coKTtcclxuLy8gICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG5cclxuLy8gICAgICQoJ2lucHV0W25hbWU9ZW5nYWdlZEluRnVsbFRpbWVFbXBsb3ltZW50XScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPWVuZ2FnZWRJbkZ1bGxUaW1lRW1wbG95bWVudF06Y2hlY2tlZCcpLnZhbCgpID09PSAneWVzJykge1xyXG4vLyAgICAgICAgIGlmICgoXCJ2ZXRlcmFuRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkpIHtcclxuLy8gICAgICAgICAgICQoXCIucHQtdmV0U2hvd0lmU3R1ZGVudEZ1bGxUaW1lQW5kTVJDQVwiKS5zaG93KCk7XHJcblxyXG4vLyAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRGdWxsVGltZUFuZE1SQ0FcIikuc2hvdygpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAkKFwiLnB0LXZldFNob3dJZlN0dWRlbnRGdWxsVGltZUFuZE1SQ0FcIikuaGlkZSgpO1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudEZ1bGxUaW1lQW5kTVJDQVwiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgJChcIi5wdC1TdHVkZW50UmVsYXRpb25zaGlwVG9WZXRlcmFuXCIpLnNob3coKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgICBpZiAoKFwidmV0ZXJhbkZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpKSB7XHJcbi8vICAgICAgICAgJChcIi5wdC1maW5hbC10b2dnbGVcIikuc2hvdygpO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICB9KTtcclxuXHJcbi8vICAgICAvLyBDYWxjdWxhdGUgc3R1ZGVudCBhZ2VcclxuLy8gICAgICQoXCIucHQtc3R1ZGVudC1kb2IgPiA6aW5wdXRcIikua2V5dXAoZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICB2YXIgZG9iRGF5ID0gJChcIiNkZC1kYXRlXCIpLnZhbCgpO1xyXG4vLyAgICAgICB2YXIgZG9iTW9udGggPSAkKFwiI21tLWRhdGVcIikudmFsKCk7XHJcbi8vICAgICAgIHZhciBkb2JZZWFyID0gJChcIiN5eXl5LWRhdGVcIikudmFsKCk7XHJcblxyXG4vLyAgICAgICAvLyBpZiBhIHZhbGlkIGRhdGVcclxuLy8gICAgICAgaWYgKGRvYkRheSAmJiBkb2JNb250aCAmJiAoZG9iWWVhci5sZW5ndGggPT09IDQpKSB7XHJcblxyXG5cclxuXHJcbi8vICAgICAgICAgaWYgKGRvYkRheS5sZW5ndGggPT09IDEpIHtcclxuLy8gICAgICAgICAgIGRvYkRheSA9IFwiMFwiICsgZG9iRGF5O1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBpZiAoZG9iTW9udGgubGVuZ3RoID09PSAxKSB7XHJcbi8vICAgICAgICAgICBkb2JNb250aCA9IFwiMFwiICsgZG9iTW9udGg7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHZhciBkb2IgPSBkb2JZZWFyICsgJy0nICsgZG9iTW9udGggKyAnLScgKyBkb2JEYXk7XHJcblxyXG4vLyAgICAgICAgIGRvYiA9IG5ldyBEYXRlKGRvYik7XHJcbi8vICAgICAgICAgdmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcclxuLy8gICAgICAgICB2YXIgYWdlID0gTWF0aC5mbG9vcigodG9kYXkgLSBkb2IpIC8gKDM2NS4yNSAqIDI0ICogNjAgKiA2MCAqIDEwMDApKTtcclxuXHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRBZ2UnKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudEFnZScsIGFnZSk7XHJcbi8vICAgICAgICAgY29uc29sZS5kZWJ1Zygnc3R1ZGVudCBhZ2U6ICcsIGFnZSk7XHJcblxyXG4vLyAgICAgICAgIC8vIHZhbGlkYXRpb246OiBvbGRlciB0aGFuIDVcclxuLy8gICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA8IDUpIHtcclxuLy8gICAgICAgICAgIGluaXQoKTtcclxuLy8gICAgICAgICAgIHJlc2V0Rm9ybSgkKCcjcHQtZm9ybScpKTtcclxuLy8gICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudFVuZGVyMFwiKS5zaG93KCk7XHJcbi8vICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdzdHVkZW50IGlzIG9sZGVyIHRoYW4gNCcpO1xyXG4vLyAgICAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50VW5kZXIwXCIpLmhpZGUoKTtcclxuXHJcbi8vICAgICAgICAgICAvLyB2ZXRlcmFuIGFuZCBjbGFpbWFudCBmbG93IG9ubHlcclxuLy8gICAgICAgICAgIGlmICgoXCJ2ZXRlcmFuRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkpIHtcclxuXHJcbi8vICAgICAgICAgICAgIC8vIGlmIG92ZXIgMTgsIHN1Z2dlc3Qgc3R1ZGVudCBjbGFpbXMgb24gdGhlaXIgb3duIFxyXG4vLyAgICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDI0KSB7XHJcbi8vICAgICAgICAgICAgICAgaW5pdCgpO1xyXG4vLyAgICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudENhbnRDbGFpbVwiKS5zaG93KCk7XHJcbi8vICAgICAgICAgICAgIH0gZWxzZSBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDE3KSB7XHJcblxyXG4vLyAgICAgICAgICAgICAgIGluaXQoKTtcclxuLy8gICAgICAgICAgICAgICByZXNldEZvcm0oJCgnI3B0LWZvcm0nKSk7XHJcbi8vICAgICAgICAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50U2hvdWxkQ2xhaW1UaGVtc2VsdmVzXCIpLnNob3coKTtcclxuLy8gICAgICAgICAgICAgICAvLyAkKFwiLnB0LXNob3dJZlN0dWRlbnRVbmRlcjE4XCIpLmhpZGUoKTtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICBpbml0KCk7XHJcbi8vICAgICAgICAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50U2hvdWxkQ2xhaW1UaGVtc2VsdmVzXCIpLmhpZGUoKTtcclxuLy8gICAgICAgICAgICAgICAkKFwiLnB0LVZldGVyYW5SZWxhdGlvbnNoaXBUb1N0dWRlbnRcIikuc2hvdygpO1xyXG4vLyAgICAgICAgICAgICAgICQoXCIucHQtU3R1ZGVudFJlbGF0aW9uc2hpcFRvVmV0ZXJhblwiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50VW5kZXIxOFwiKS5zaG93KCk7XHJcbi8vICAgICAgICAgICAgICAgLy8gJChcIi5wdC1jbGFpbWFudFNob3dJZlN0dWRlbnRPdmVyMTZcIikuc2hvdygpO1xyXG5cclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT12ZXRlcmFuU2lnbmlmaWNhbnRseUluanVyZWRdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT12ZXRlcmFuU2lnbmlmaWNhbnRseUluanVyZWRdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcclxuLy8gICAgICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudE5vdERlcGVuZGFudFwiKS5zaG93KCk7XHJcbi8vICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudE5vdERlcGVuZGFudFwiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAvLyBjbGFpbWFudCBmbG93IG9ubHlcclxuLy8gICAgICAgICAgIGlmIChcImNsYWltYW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG4vLyAgICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDI0KSB7XHJcbi8vICAgICAgICAgICAgICAgaW5pdCgpO1xyXG4vLyAgICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudENhbnRDbGFpbVwiKS5zaG93KCk7XHJcbi8vICAgICAgICAgICAgIH0gZWxzZSBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDE3KSB7XHJcbi8vICAgICAgICAgICAgICAgaW5pdCgpO1xyXG4vLyAgICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudFNob3VsZENsYWltVGhlbXNlbHZlc1wiKS5zaG93KCk7XHJcbi8vICAgICAgICAgICAgICAgLy8gJChcIi5wdC1zaG93SWZTdHVkZW50VW5kZXIxOFwiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgICAgIH0gZWxzZSBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPiAxNSkgJiYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPD0gMTgpKSB7XHJcbi8vICAgICAgICAgICAgICAgaW5pdCgpO1xyXG4vLyAgICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudFNob3VsZENsYWltVGhlbXNlbHZlc1wiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgICAgICAgJChcIi5wdC1jbGFpbWFudFNob3dJZlN0dWRlbnRPdmVyMTZcIikuc2hvdygpO1xyXG5cclxuXHJcbi8vICAgICAgICAgICAgIH0gZWxzZSB7IC8vIHVuZGVyIDE2XHJcbi8vICAgICAgICAgICAgICAgaW5pdCgpO1xyXG4vLyAgICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmRW5nYWdlZEluRnVsbFRpbWVFbXBsb3ltZW50XCIpLnNob3coKTtcclxuLy8gICAgICAgICAgICAgICAkKFwiLnB0LVN0dWRlbnRSZWxhdGlvbnNoaXBUb1ZldGVyYW5cIikuc2hvdygpO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG5cclxuLy8gICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT12ZXRlcmFuU2lnbmlmaWNhbnRseUluanVyZWRdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT12ZXRlcmFuU2lnbmlmaWNhbnRseUluanVyZWRdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcclxuLy8gICAgICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudFVuZGVyMThcIikuc2hvdygpO1xyXG4vLyAgICAgICAgICAgICAgICAgJChcIi5wdC1TdHVkZW50UmVsYXRpb25zaGlwVG9DbGFpbWFudFwiKS5zaG93KCk7XHJcbi8vICAgICAgICAgICAgICAgICAkKFwiLnB0LWFib3V0WW91XCIpLnNob3coKTtcclxuLy8gICAgICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudE5vdERlcGVuZGFudFwiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudFVuZGVyMThcIikuaGlkZSgpO1xyXG4vLyAgICAgICAgICAgICAgICAgJChcIi5wdC1hYm91dFlvdVwiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnROb3REZXBlbmRhbnRcIikuc2hvdygpO1xyXG4vLyAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfSk7XHJcblxyXG4vLyAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG5cclxuLy8gICAgICQoXCIjcmVsYXRpb25zaGlwVG9TdHVkZW50XCIpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyAgICAgICB2YXIgc2VsZWN0ZWRfb3B0aW9uID0gJCgnI3JlbGF0aW9uc2hpcFRvU3R1ZGVudCcpLnZhbCgpO1xyXG5cclxuLy8gICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3JlbGF0aW9uc2hpcFR5cGUnKTtcclxuLy8gICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlbGF0aW9uc2hpcFR5cGUnLCBzZWxlY3RlZF9vcHRpb24pO1xyXG5cclxuLy8gICAgICAgaWYgKFwiY2xhaW1hbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XHJcblxyXG4vLyAgICAgICAgIGlmICgoc2VsZWN0ZWRfb3B0aW9uID09PSAnYWRvcHRpdmUtcGFyZW50JykgfHwgKHNlbGVjdGVkX29wdGlvbiA9PT0gJ3BhcmVudCcpKSB7XHJcblxyXG4vLyAgICAgICAgICAgJCgnLnB0LXNob3dJZlJlbGF0aW9uc2hpcFZhbGlkJykuaGlkZSgpO1xyXG4vLyAgICAgICAgICAgJCgnI3JlbGF0aW9uc2hpcFRvU3R1ZGVudE90aGVyJykuaGlkZSgpO1xyXG4vLyAgICAgICAgICAgJCgnLnB0LXNob3dJZlN0dWRlbnREZXBlbmRhbnRPblZldGVyYW4nKS5zaG93KCk7XHJcblxyXG4vLyAgICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRfb3B0aW9uID09PSAnb3RoZXInKSB7XHJcbi8vICAgICAgICAgICAkKCcjcmVsYXRpb25zaGlwVG9TdHVkZW50T3RoZXInKS5zaG93KCk7XHJcbi8vICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICQoJy5wdC1zaG93SWZSZWxhdGlvbnNoaXBWYWxpZCcpLnNob3coKTtcclxuLy8gICAgICAgICAgICQoJyNyZWxhdGlvbnNoaXBUb1N0dWRlbnRPdGhlcicpLmhpZGUoKTtcclxuLy8gICAgICAgICAgICQoJy5wdC1zaG93SWZTdHVkZW50RGVwZW5kYW50T25WZXRlcmFuJykuaGlkZSgpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgaWYgKHNlbGVjdGVkX29wdGlvbiA9PT0gJ290aGVyJykge1xyXG4vLyAgICAgICAgICAgJCgnI3JlbGF0aW9uc2hpcFRvU3R1ZGVudE90aGVyJykuc2hvdygpO1xyXG4vLyAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAkKCcjcmVsYXRpb25zaGlwVG9TdHVkZW50T3RoZXInKS5oaWRlKCk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICB9XHJcblxyXG4vLyAgICAgfSk7XHJcblxyXG4vLyAgICAgLy8gY29uZmlybSBzdHVkZW50IG9yIGNsYWltYW50XHJcbi8vICAgICAkKCdpbnB1dFtuYW1lPWNvbmZpcm1TdHVkZW50T3JDbGFpbWFudF0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAvLyBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuXHJcblxyXG4vLyAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1jb25maXJtU3R1ZGVudE9yQ2xhaW1hbnRdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ2d1YXJkaWFuJykge1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50RmxvdycpO1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50Rmxvd0NvbmZpcm1lZCcpO1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGFpbWFudEZsb3cnLCB0cnVlKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2xhaW1hbnRGbG93Q29uZmlybWVkJywgdHJ1ZSk7XHJcbi8vICAgICAgICAgaW5pdCgpO1xyXG5cclxuLy8gICAgICAgICAkKFwiLnB0LXN0dWRlbnQtZG9iXCIpLnNob3coKTtcclxuXHJcbi8vICAgICAgICAgaW5pdFN0dWRlbnRzKCk7XHJcblxyXG4vLyAgICAgICB9IGVsc2UgaWYgKCQoJ2lucHV0W25hbWU9Y29uZmlybVN0dWRlbnRPckNsYWltYW50XTpjaGVja2VkJykudmFsKCkgPT09ICdzdHVkZW50Jykge1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjbGFpbWFudEZsb3dDb25maXJtZWQnKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY2xhaW1hbnRGbG93Jyk7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRGbG93JywgdHJ1ZSk7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRGbG93Q29uZmlybWVkJywgdHJ1ZSk7XHJcbi8vICAgICAgICAgaW5pdCgpO1xyXG4vLyAgICAgICAgICQoXCIucHQtc3R1ZGVudC1kb2JcIikuaGlkZSgpO1xyXG4vLyAgICAgICAgICQoJy5wdC1zdHVkZW50RnVsbFRpbWUnKS5zaG93KCk7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50Q29uZmlybWVkXCIpLnNob3coKTtcclxuXHJcbi8vICAgICAgICAgY29uc29sZS5sb2cobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSk7XHJcblxyXG4vLyAgICAgICAgIC8vIFNob3cgd2FybmluZyBlbGlnaWJpbGl0eSBtZXNzYWdlIGlmIHN0dWRlbnQgaXMgb3ZlciAyNS5cclxuLy8gICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDI0KSB7XHJcbi8vICAgICAgICAgICBjb25zb2xlLmxvZygnb3ZlciAyNScpO1xyXG4vLyAgICAgICAgICAgJChcIi5wdC1zdHVkZW50T3ZlcjI1XCIpLnNob3coKTtcclxuLy8gICAgICAgICAgICQoXCIucHQtc3R1ZGVudFRvb3lvdW5nXCIpLmhpZGUoKTtcclxuLy8gICAgICAgICAgICQoJy5wdC1zdHVkZW50RnVsbFRpbWUnKS5zaG93KCk7XHJcbi8vICAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRDb25maXJtZWRcIikuc2hvdygpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLy8gU2hvdyBlcnJvciBtZXNzYWdlIGlmIHN0dWRlbnQgaXMgdW5kZXIgMTZcclxuLy8gICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA8IDE2KSB7XHJcbi8vICAgICAgICAgICBjb25zb2xlLmxvZygndW5kZXIgMTYnKTtcclxuLy8gICAgICAgICAgICQoXCIucHQtc3R1ZGVudFRvb3lvdW5nXCIpLnNob3coKTtcclxuLy8gICAgICAgICAgICQoJy5wdC1zdHVkZW50RnVsbFRpbWUnKS5oaWRlKCk7XHJcbi8vICAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRDb25maXJtZWRcIikuaGlkZSgpO1xyXG4vLyAgICAgICAgICAgJChcIi5wYWdpbmF0aW9uXCIpLmZpbmQoJy5idG5OZXh0JykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGluaXRTdHVkZW50cygpO1xyXG4vLyAgICAgICB9XHJcblxyXG4vLyAgICAgICByZXNldEZvcm0oJCgnI3B0LWZvcm0nKSk7XHJcblxyXG5cclxuXHJcbi8vICAgICB9KTtcclxuXHJcbi8vICAgICAkKCdpbnB1dFtuYW1lPWVuZ2FnZWRJbkZ1bGxUaW1lRW1wbG95bWVudF0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG5cclxuLy8gICAgICAgaWYgKCQoJ2lucHV0W25hbWU9ZW5nYWdlZEluRnVsbFRpbWVFbXBsb3ltZW50XTpjaGVja2VkJykudmFsKCkgPT09ICd5ZXMnKSB7XHJcblxyXG4vLyAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgIGlmICghKFwidmV0ZXJhbkZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpKSB7XHJcblxyXG4vLyAgICAgICAgICAgJCgnLnB0LXNob3dJZkVuZ2FnZWRJbkZ1bGxUaW1lRW1wbG95bWVudCcpLnNob3coKTtcclxuLy8gICAgICAgICAgIGlmICghKFwiY2xhaW1hbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSkge1xyXG4vLyAgICAgICAgICAgICAkKCcucHQtc2hvd0lmUmVsYXRpb25zaGlwVmFsaWQnKS5zaG93KCk7XHJcbi8vICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICB9XHJcbi8vICAgICB9KTtcclxuXHJcbi8vICAgICBpZiAoIShcInN0dWRlbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSkge1xyXG5cclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnREZXBlbmRhbnRPblZldGVyYW5dJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgaWYgKCQoJ2lucHV0W25hbWU9c3R1ZGVudERlcGVuZGFudE9uVmV0ZXJhbl06Y2hlY2tlZCcpLnZhbCgpID09PSAneWVzJykge1xyXG4vLyAgICAgICAgICQoJy5wdC1zaG93SWZTdHVkZW50Tm90RGVwZW5kYW50JykuaGlkZSgpO1xyXG4vLyAgICAgICAgICQoJy5wdC1zaG93SWZTdHVkZW50RGVwZW5kYW50T25WZXRlcmFuJykuc2hvdygpO1xyXG4vLyAgICAgICB9IGVsc2Uge1xyXG5cclxuLy8gICAgICAgICAkKCcucHQtc2hvd0lmU3R1ZGVudE5vdERlcGVuZGFudCcpLnNob3coKTtcclxuLy8gICAgICAgICAkKCcucHQtc2hvd0lmU3R1ZGVudERlcGVuZGFudE9uVmV0ZXJhbicpLmhpZGUoKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfSk7XHJcblxyXG4vLyAgIH1cclxuXHJcblxyXG4vLyAgIC8vIEFsbCBzdHVkZW50IHBhZ2VzIFxyXG4vLyAgIGlmICh3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKFwic3R1ZGVudFwiKSA+IC0xKSB7XHJcblxyXG4vLyAgICAgY29uc29sZS5sb2coJ0FsbCBzdHVkZW50IHBhZ2VzJyk7XHJcblxyXG4vLyAgICAgJChcIi5wdC1zaG93SWZEb2N1bWVudFVwbG9hZFNob3BwaW5nQ2FydFwiKS5oaWRlKCk7XHJcbi8vICAgICAkKFwiLnB0LWZpbmFsLXRvZ2dsZVwiKS5oaWRlKCk7XHJcblxyXG5cclxuXHJcbi8vICAgICAkKCdpbnB1dFtuYW1lPWRvZXNTdHVkZW50SGF2ZVRGTl0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjdCcpID09PSAnbXJjYScpIHtcclxuLy8gICAgICAgICAkKCcucHQtc2hvd0lmTVJDQScpLnNob3coKTtcclxuLy8gICAgICAgfVxyXG5cclxuLy8gICAgICAgaWYgKCQoJ2lucHV0W25hbWU9ZG9lc1N0dWRlbnRIYXZlVEZOXTpjaGVja2VkJykudmFsKCkgPT09ICd5ZXMnKSB7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRIYXNURk4nKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudEhhc1RGTicsIHRydWUpO1xyXG4vLyAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50SGFzVEZOJyk7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3RmbicpO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICB9KTtcclxuXHJcblxyXG5cclxuLy8gICAgICQoXCIudXBsb2FkLWxpc3RcIikuc2hvdygpO1xyXG4vLyAgIH1cclxuXHJcbi8vICAgLy8gUGFnZSAxXHJcbi8vICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gXCIvYXV0aC9jbGFpbS9zdHVkZW50Y2xhaW0xXCIpIHtcclxuXHJcbi8vICAgICBpbml0U3R1ZGVudHMoKTtcclxuLy8gICAgIGluaXRGbG93KCk7XHJcblxyXG4vLyAgICAgJChcIi5wdC1zdHVkZW50QWdlLS1tYXR1cmVcIikuaGlkZSgpO1xyXG4vLyAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50TGl2aW5nQXRIb21lXCIpLmhpZGUoKTtcclxuLy8gICAgICQoXCIucHQtc3R1ZGVudExpdmluZ1NhbWVBZGRyZXNzXCIpLmhpZGUoKTtcclxuLy8gICAgICQoXCIucHQtc3R1ZGVudExpdmluZ1dpdGhQYXJ0bmVyTGVzc1JhdGVcIikuaGlkZSgpO1xyXG4vLyAgICAgJChcIi5wdC1zaG93TGl2aW5nTG9jYXRpb25cIikuaGlkZSgpO1xyXG4vLyAgICAgJChcIi51cGxvYWQtbGlzdFwiKS5zaG93KCk7XHJcbi8vICAgICAkKFwiLnB0LXNob3dJZkxpdmluZ0F3YXlGcm9tSG9tZVwiKS5oaWRlKCk7XHJcbi8vICAgICAkKFwiLnB0LXNob3dJZkRvY3VtZW50VXBsb2FkU2hvcHBpbmdDYXJ0XCIpLmhpZGUoKTtcclxuLy8gICAgICQoXCIucHQtcGFydG5lcmVkUmVsYXRpb25zaGlwXCIpLmhpZGUoKTtcclxuLy8gICAgICQoXCIucHQtbGl2aW5nV2l0aFBhcnRuZXJcIikuaGlkZSgpO1xyXG5cclxuLy8gICAgIC8vIGlmICh0cnVlKSB7XHJcbi8vICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDE1KSB7XHJcblxyXG4vLyAgICAgICBpZiAoXCJzdHVkZW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG4vLyAgICAgICAgICQoXCIucHQtc3R1ZGVudEFnZS0tbWF0dXJlXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCIucHQtZmxvdy0tc3R1ZGVudFwiKSkge1xyXG4vLyAgICAgICAgICAgICAkKHRoaXMpLnNob3coXCJmYXN0XCIpO1xyXG4vLyAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH0pO1xyXG4vLyAgICAgICB9XHJcblxyXG4vLyAgICAgICBpZiAoXCJ2ZXRlcmFuRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG4vLyAgICAgICAgICQoXCIucHQtc3R1ZGVudEFnZS0tbWF0dXJlXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgICAgaWYgKCQodGhpcykuaXMoXCIucHQtZmxvdy0tdmV0ZXJhblwiKSkge1xyXG4vLyAgICAgICAgICAgICAkKHRoaXMpLnNob3coXCJmYXN0XCIpO1xyXG4vLyAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH0pO1xyXG4vLyAgICAgICB9XHJcblxyXG4vLyAgICAgICBpZiAoXCJjbGFpbWFudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHtcclxuLy8gICAgICAgICAkKFwiLnB0LXN0dWRlbnRBZ2UtLW1hdHVyZVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiLnB0LWZsb3ctLWNsYWltYW50XCIpKSB7XHJcbi8vICAgICAgICAgICAgICQodGhpcykuc2hvdyhcImZhc3RcIik7XHJcbi8vICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfSk7XHJcbi8vICAgICAgIH1cclxuXHJcblxyXG4vLyAgICAgICAkKFwiI3ZldGVyYW5OYW1lRmlyc3RcIikuZm9jdXNvdXQoZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpKSB7XHJcbi8vICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndmV0ZXJhbk5hbWVGaXJzdCcpO1xyXG4vLyAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ZldGVyYW5OYW1lRmlyc3QnLCAkKHRoaXMpLnZhbCgpKTtcclxuLy8gICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3ZldGVyYW5OYW1lRmlyc3QnKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgIH0pO1xyXG5cclxuLy8gICAgICAgJChcIiN2ZXRlcmFuTmFtZUxhc3RcIikuZm9jdXNvdXQoZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgIGlmICgkKHRoaXMpLnZhbCgpKSB7XHJcbi8vICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndmV0ZXJhbk5hbWVMYXN0Jyk7XHJcbi8vICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndmV0ZXJhbk5hbWVMYXN0JywgJCh0aGlzKS52YWwoKSk7XHJcbi8vICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd2ZXRlcmFuTmFtZUxhc3QnKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4vLyAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgJChcIi5wdC1zdHVkZW50QWdlLS1tYXR1cmVcIikuaGlkZShcInNsb3dcIik7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgJChcIi5wdC1wYXJ0bmVyZWRSZWxhdGlvbnNoaXBcIikuaGlkZSgpO1xyXG5cclxuLy8gICAgIC8vIGV4dHJhIGRldGFpbHMgZm9yIHN0dWRlbnRzIFxyXG4vLyAgICAgaWYgKChcInN0dWRlbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB8fCBcImNsYWltYW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG4vLyAgICAgICAkKCcuYnRuTmV4dCcpLnByb3AoJ29uY2xpY2snLCBudWxsKTtcclxuLy8gICAgICAgJCgnLmJ0bk5leHQnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2F1dGgvY2xhaW0vc3R1ZGVudGNsYWltMWEnO1xyXG4vLyAgICAgICB9KTtcclxuLy8gICAgIH1cclxuXHJcblxyXG4vLyAgICAgJCgnaW5wdXRbbmFtZT1nZW5kZXJdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPiAxNSkge1xyXG4vLyAgICAgICAgICQoXCIucHQtcGFydG5lcmVkUmVsYXRpb25zaGlwXCIpLnNob3coKTtcclxuLy8gICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAkKFwiLnB0LXNob3dMaXZpbmdMb2NhdGlvblwiKS5zaG93KCk7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG5cclxuLy8gICAgICQoXCIjZmlyc3ROYW1lXCIpLmZvY3Vzb3V0KGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgaWYgKCQodGhpcykudmFsKCkpIHtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudE5hbWVGaXJzdCcpO1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TmFtZUZpcnN0JywgJCh0aGlzKS52YWwoKSk7XHJcbi8vICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnROYW1lRmlyc3QnKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfSk7XHJcblxyXG4vLyAgICAgJChcIiNsYXN0TmFtZVwiKS5mb2N1c291dChmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgIGlmICgkKHRoaXMpLnZhbCgpKSB7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnROYW1lTGFzdCcpO1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TmFtZUxhc3QnLCAkKHRoaXMpLnZhbCgpKTtcclxuLy8gICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudE5hbWVMYXN0Jyk7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG5cclxuXHJcblxyXG4vLyAgICAgJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nTG9jYXRpb25dJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuXHJcbi8vICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcclxuLy8gICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdMb2NhdGlvbicsICQoJ2lucHV0W25hbWU9c3R1ZGVudExpdmluZ0xvY2F0aW9uXTpjaGVja2VkJykudmFsKCkpO1xyXG5cclxuLy8gICAgICAgaWYgKCQoJ2lucHV0W25hbWU9c3R1ZGVudExpdmluZ0xvY2F0aW9uXTpjaGVja2VkJykudmFsKCkgPT09ICdob21lbGVzcycpIHtcclxuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZkxpdmluZ0F3YXlcIikuaGlkZSgpO1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmTm9QYXJ0bmVyXCIpLmhpZGUoKTtcclxuLy8gICAgICAgICAkKFwiLnB0LWxpdmluZ1dpdGhQYXJ0bmVyXCIpLmhpZGUoKTtcclxuLy8gICAgICAgICAkKFwicHQtZmluYWwtdG9nZ2xlXCIpLmhpZGUoKTtcclxuXHJcbi8vICAgICAgICAgLy8gc2tpcCB0aGUgbGl2aW5nIGFycmFuZ2VtZW50IGRldGFpbHMgXHJcbi8vICAgICAgICAgJCgnLmJ0bk5leHQnKS5wcm9wKCdvbmNsaWNrJywgbnVsbCk7XHJcbi8vICAgICAgICAgJCgnLmJ0bk5leHQnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgICAvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuLy8gICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hdXRoL2NsYWltL3N0dWRlbnRjbGFpbTMnO1xyXG4vLyAgICAgICAgIH0pO1xyXG4vLyAgICAgICB9IGVsc2Uge1xyXG5cclxuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZkxpdmluZ0F3YXlcIikuc2hvdygnZmFzdCcpO1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmTm9QYXJ0bmVyXCIpLmhpZGUoKTtcclxuLy8gICAgICAgICAkKFwicHQtZmluYWwtdG9nZ2xlXCIpLmhpZGUoKTtcclxuLy8gICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRQYXJ0bmVyZWRSZWxhdGlvbnNoaXAnKSA9PT0gJ25vJykge1xyXG4vLyAgICAgICAgICAgJChcIi5wdC1zaG93SWZOb1BhcnRuZXJcIikuc2hvdygpO1xyXG4vLyAgICAgICAgICAgJChcIi5wdC1saXZpbmdXaXRoUGFydG5lclwiKS5oaWRlKCk7XHJcblxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgIH1cclxuXHJcbi8vICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdMb2NhdGlvbl06Y2hlY2tlZCcpLnZhbCgpID09PSAnYXdheS1mcm9tLWhvbWUnKSB7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZMaXZpbmdBd2F5RnJvbUhvbWVcIikuc2hvdygpO1xyXG4vLyAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmTGl2aW5nQXdheUZyb21Ib21lXCIpLmhpZGUoKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfSk7XHJcblxyXG5cclxuLy8gICAgICQoJ2lucHV0W25hbWU9c3R1ZGVudExpdmluZ1dpdGhQYXJ0bmVyXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdXaXRoUGFydG5lcl06Y2hlY2tlZCcpLnZhbCgpID09PSAneWVzJykge1xyXG5cclxuLy8gICAgICAgICAkKFwiLnB0LXN0dWRlbnRMaXZpbmdXaXRoUGFydG5lckxlc3NSYXRlXCIpLnNob3coKTtcclxuLy8gICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAkKFwiLnB0LXN0dWRlbnRMaXZpbmdXaXRoUGFydG5lckxlc3NSYXRlXCIpLmhpZGUoKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfSk7XHJcblxyXG5cclxuLy8gICAgICQoJ2lucHV0W25hbWU9c3R1ZGVudFBhcnRuZXJlZFJlbGF0aW9uc2hpcF0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAkKFwiLnB0LXNob3dMaXZpbmdMb2NhdGlvblwiKS5zaG93KCk7XHJcbi8vICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRQYXJ0bmVyZWRSZWxhdGlvbnNoaXBdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudFBhcnRuZXJlZFJlbGF0aW9uc2hpcCcpO1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50UGFydG5lcmVkUmVsYXRpb25zaGlwJywgJ3llcycpO1xyXG4vLyAgICAgICAgICQoXCIucHQtc3R1ZGVudExpdmluZ1NhbWVBZGRyZXNzXCIpLnNob3coKTtcclxuLy8gICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudFBhcnRuZXJlZFJlbGF0aW9uc2hpcCcpO1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50UGFydG5lcmVkUmVsYXRpb25zaGlwJywgJ25vJyk7XHJcbi8vICAgICAgICAgJChcIi5wdC1zdHVkZW50TGl2aW5nU2FtZUFkZHJlc3NcIikuaGlkZSgpO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICB9KTtcclxuXHJcblxyXG4vLyAgICAgJChcIiNyZWxhdGlvbnNoaXBUb1ZldGVyYW5cIikuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuXHJcbi8vICAgICAgIHZhciBzZWxlY3RlZF9vcHRpb24gPSAkKCcjcmVsYXRpb25zaGlwVG9WZXRlcmFuJykudmFsKCk7XHJcblxyXG4vLyAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgncmVsYXRpb25zaGlwVHlwZScpO1xyXG4vLyAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVsYXRpb25zaGlwVHlwZScsIHNlbGVjdGVkX29wdGlvbik7XHJcblxyXG4vLyAgICAgICBpZiAoc2VsZWN0ZWRfb3B0aW9uID09PSAnb3RoZXInKSB7XHJcbi8vICAgICAgICAgJCgnI3JlbGF0aW9uc2hpcFRvVmV0ZXJhbk90aGVyJykuc2hvdyhcImZhc3RcIik7XHJcbi8vICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgJCgnI3JlbGF0aW9uc2hpcFRvVmV0ZXJhbk90aGVyJykuaGlkZShcInNsb3dcIik7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG5cclxuXHJcbi8vICAgICAkKFwiI3ZldGVyYW5SZWxhdGlvbnNoaXBUb1N0dWRlbnRcIikuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgdmFyIHNlbGVjdGVkX29wdGlvbiA9ICQoJyN2ZXRlcmFuUmVsYXRpb25zaGlwVG9TdHVkZW50JykudmFsKCk7XHJcbi8vICAgICAgIGlmIChzZWxlY3RlZF9vcHRpb24gPT09ICdvdGhlcicpIHtcclxuLy8gICAgICAgICAkKCcjdmV0ZXJhblJlbGF0aW9uc2hpcFRvU3R1ZGVudE90aGVyJykuc2hvdyhcImZhc3RcIik7XHJcbi8vICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgJCgnI3ZldGVyYW5SZWxhdGlvbnNoaXBUb1N0dWRlbnRPdGhlcicpLmhpZGUoXCJzbG93XCIpO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICB9KTtcclxuXHJcbi8vICAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb25dJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuXHJcbi8vICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb25dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycgJiZcclxuLy8gICAgICAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnRQYXJ0bmVyZWRSZWxhdGlvbnNoaXBdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcclxuLy8gICAgICAgICAkKFwiLnB0LWxpdmluZ1dpdGhQYXJ0bmVyXCIpLnNob3coKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ0F3YXlWYWxpZFJlYXNvbicpO1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJywgJ2F3YXktZnJvbS1ob21lJyk7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb24nLCB0cnVlKTtcclxuLy8gICAgICAgfSBlbHNlIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb25dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ0F3YXlWYWxpZFJlYXNvbicpO1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJywgJ2F3YXktZnJvbS1ob21lJyk7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb24nLCB0cnVlKTtcclxuLy8gICAgICAgICAkKFwiLnB0LWZpbmFsLXRvZ2dsZVwiKS5zaG93KCk7XHJcbi8vICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb24nKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJyk7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdMb2NhdGlvbicsICdhdC1ob21lJyk7XHJcbi8vICAgICAgICAgJChcIi5wdC1saXZpbmdXaXRoUGFydG5lclwiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgJChcIi5wdC1maW5hbC10b2dnbGVcIikuc2hvdygpO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICB9KTtcclxuXHJcblxyXG5cclxuXHJcbi8vICAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdXaXRoUGFydG5lcl0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAkKFwiLnB0LWZpbmFsLXRvZ2dsZVwiKS5zaG93KCk7XHJcbi8vICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdXaXRoUGFydG5lcl06Y2hlY2tlZCcpLnZhbCgpID09PSAneWVzJykge1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nV2l0aFBhcnRuZXInKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ1dpdGhQYXJ0bmVyJywgJ3llcycpO1xyXG4vLyAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nV2l0aFBhcnRuZXInKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ1dpdGhQYXJ0bmVyJywgJ25vJyk7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG5cclxuLy8gICB9XHJcblxyXG4vLyAgIC8vIFBhZ2UgMWFcclxuLy8gICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSBcIi9hdXRoL2NsYWltL3N0dWRlbnRjbGFpbTFhXCIpIHtcclxuLy8gICAgIGluaXRTdHVkZW50cygpO1xyXG4vLyAgICAgaW5pdEZsb3coKTtcclxuXHJcbi8vICAgICAkKFwiLnB0LXNob3dMaXZpbmdMb2NhdGlvblwiKS5oaWRlKCk7XHJcbi8vICAgICAkKFwiLnB0LXNob3dJZkxpdmluZ0F3YXlGcm9tSG9tZVwiKS5oaWRlKCk7XHJcbi8vICAgICAkKFwiLnB0LWxpdmluZ1dpdGhQYXJ0bmVyXCIpLmhpZGUoKTtcclxuLy8gICAgIGlmIChcImNsYWltYW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG4vLyAgICAgICAkKFwiLnB0LXBhcnRuZXJlZFJlbGF0aW9uc2hpcFwiKS5oaWRlKCk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgJChcIiNmaXJzdE5hbWVcIikuZm9jdXNvdXQoZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICBpZiAoJCh0aGlzKS52YWwoKSkge1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TmFtZUZpcnN0Jyk7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnROYW1lRmlyc3QnLCAkKHRoaXMpLnZhbCgpKTtcclxuLy8gICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudE5hbWVGaXJzdCcpO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICB9KTtcclxuXHJcbi8vICAgICAkKFwiI2xhc3ROYW1lXCIpLmZvY3Vzb3V0KGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgaWYgKCQodGhpcykudmFsKCkpIHtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudE5hbWVMYXN0Jyk7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnROYW1lTGFzdCcsICQodGhpcykudmFsKCkpO1xyXG4vLyAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TmFtZUxhc3QnKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfSk7XHJcblxyXG4vLyAgICAgJCgnaW5wdXRbbmFtZT1nZW5kZXJdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPiAxNSkge1xyXG4vLyAgICAgICAgICQoXCIucHQtcGFydG5lcmVkUmVsYXRpb25zaGlwXCIpLnNob3coKTtcclxuLy8gICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAkKFwiLnB0LXNob3dMaXZpbmdMb2NhdGlvblwiKS5zaG93KCk7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG5cclxuLy8gICAgICQoJ2lucHV0W25hbWU9c3R1ZGVudFBhcnRuZXJlZFJlbGF0aW9uc2hpcF0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAkKFwiLnB0LXNob3dMaXZpbmdMb2NhdGlvblwiKS5zaG93KCk7XHJcbi8vICAgICB9KTtcclxuXHJcbi8vICAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdMb2NhdGlvbl0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nTG9jYXRpb25dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ2hvbWVsZXNzJykge1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJywgJ2hvbWVsZXNzJyk7XHJcbi8vICAgICAgICAgJChcIi5wdC1maW5hbC10b2dnbGVcIikuaGlkZSgpO1xyXG4vLyAgICAgICAgICQoXCIucHQtbGl2aW5nV2l0aFBhcnRuZXJcIikuaGlkZSgpO1xyXG4vLyAgICAgICB9IGVsc2UgaWYgKCQoJ2lucHV0W25hbWU9c3R1ZGVudExpdmluZ0xvY2F0aW9uXTpjaGVja2VkJykudmFsKCkgPT09ICdhdC1ob21lJykge1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJywgJ2F0LWhvbWUnKTtcclxuLy8gICAgICAgICAkKFwiLnB0LWxpdmluZ1dpdGhQYXJ0bmVyXCIpLmhpZGUoKTtcclxuLy8gICAgICAgICAkKFwiLnB0LWZpbmFsLXRvZ2dsZVwiKS5oaWRlKCk7XHJcbi8vICAgICAgIH0gZWxzZSBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nTG9jYXRpb25dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ2F3YXktZnJvbS1ob21lJykge1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJywgJ2F3YXktZnJvbS1ob21lJyk7XHJcbi8vICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMaXZpbmdMb2NhdGlvbicpO1xyXG4vLyAgICAgICB9XHJcblxyXG4vLyAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nTG9jYXRpb25dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ2F3YXktZnJvbS1ob21lJykge1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmTGl2aW5nQXdheUZyb21Ib21lXCIpLnNob3coKTtcclxuLy8gICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZkxpdmluZ0F3YXlGcm9tSG9tZVwiKS5oaWRlKCk7XHJcbi8vICAgICAgIH1cclxuXHJcbi8vICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdMb2NhdGlvbl06Y2hlY2tlZCcpLnZhbCgpID09PSAnaG9tZWxlc3MnKSB7XHJcbi8vICAgICAgICAgLy8gc2tpcCB0aGUgbGl2aW5nIGFycmFuZ2VtZW50IGRldGFpbHMgXHJcbi8vICAgICAgICAgJCgnLmJ0bk5leHQnKS5wcm9wKCdvbmNsaWNrJywgbnVsbCk7XHJcbi8vICAgICAgICAgJCgnLmJ0bk5leHQnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYXV0aC9jbGFpbS9zdHVkZW50Y2xhaW0zJztcclxuLy8gICAgICAgICB9KTtcclxuLy8gICAgICAgfSBlbHNlIGlmICgoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nTG9jYXRpb25dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ2F0LWhvbWUnKSkge1xyXG4vLyAgICAgICAgIGlmIChcInN0dWRlbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XHJcbi8vICAgICAgICAgICAvLyBza2lwIHRoZSBsaXZpbmcgYXJyYW5nZW1lbnQgZGV0YWlscyBcclxuLy8gICAgICAgICAgICQoJy5idG5OZXh0JykucHJvcCgnb25jbGljaycsIG51bGwpO1xyXG4vLyAgICAgICAgICAgJCgnLmJ0bk5leHQnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hdXRoL2NsYWltL3N0dWRlbnRjbGFpbTMnO1xyXG4vLyAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICQoJy5idG5OZXh0JykucHJvcCgnb25jbGljaycsIG51bGwpO1xyXG4vLyAgICAgICAgICAgJCgnLmJ0bk5leHQnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hdXRoL2NsYWltL3N0dWRlbnRjbGFpbTInO1xyXG4vLyAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICQoJy5idG5OZXh0JykucHJvcCgnb25jbGljaycsIG51bGwpO1xyXG4vLyAgICAgICAgICQoJy5idG5OZXh0JykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2F1dGgvY2xhaW0vc3R1ZGVudGNsYWltMic7XHJcbi8vICAgICAgICAgfSk7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG5cclxuXHJcbi8vICAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb25dJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuXHJcbi8vICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb25dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycgJiZcclxuLy8gICAgICAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnRQYXJ0bmVyZWRSZWxhdGlvbnNoaXBdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcclxuLy8gICAgICAgICAkKFwiLnB0LWxpdmluZ1dpdGhQYXJ0bmVyXCIpLnNob3coKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ0F3YXlWYWxpZFJlYXNvbicpO1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJywgJ2F3YXktZnJvbS1ob21lJyk7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb24nLCB0cnVlKTtcclxuLy8gICAgICAgfSBlbHNlIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb25dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ0F3YXlWYWxpZFJlYXNvbicpO1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJywgJ2F3YXktZnJvbS1ob21lJyk7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb24nLCB0cnVlKTtcclxuLy8gICAgICAgICAkKFwiLnB0LWZpbmFsLXRvZ2dsZVwiKS5zaG93KCk7XHJcbi8vICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb24nKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJyk7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdMb2NhdGlvbicsICdhdC1ob21lJyk7XHJcbi8vICAgICAgICAgJChcIi5wdC1saXZpbmdXaXRoUGFydG5lclwiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgJChcIi5wdC1maW5hbC10b2dnbGVcIikuc2hvdygpO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICB9KTtcclxuXHJcblxyXG4vLyAgICAgJCgnaW5wdXRbbmFtZT1zdHVkZW50UGFydG5lcmVkUmVsYXRpb25zaGlwXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyAgICAgICAkKFwiLnB0LXNob3dMaXZpbmdMb2NhdGlvblwiKS5zaG93KCk7XHJcblxyXG4vLyAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50UGFydG5lcmVkUmVsYXRpb25zaGlwXTpjaGVja2VkJykudmFsKCkgPT09ICd5ZXMnKSB7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRQYXJ0bmVyZWRSZWxhdGlvbnNoaXAnKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudFBhcnRuZXJlZFJlbGF0aW9uc2hpcCcsICd5ZXMnKTtcclxuLy8gICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudFBhcnRuZXJlZFJlbGF0aW9uc2hpcCcpO1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50UGFydG5lcmVkUmVsYXRpb25zaGlwJywgJ25vJyk7XHJcbi8vICAgICAgICAgJChcIi5wdC1zdHVkZW50TGl2aW5nU2FtZUFkZHJlc3NcIikuaGlkZSgpO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICB9KTtcclxuXHJcblxyXG4vLyAgICAgJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nV2l0aFBhcnRuZXJdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgJChcIi5wdC1maW5hbC10b2dnbGVcIikuc2hvdygpO1xyXG4vLyAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nV2l0aFBhcnRuZXJdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ1dpdGhQYXJ0bmVyJyk7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdXaXRoUGFydG5lcicsICd5ZXMnKTtcclxuLy8gICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ1dpdGhQYXJ0bmVyJyk7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdXaXRoUGFydG5lcicsICdubycpO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICB9KTtcclxuXHJcblxyXG4vLyAgIH1cclxuXHJcblxyXG4vLyAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09IFwiL2F1dGgvY2xhaW0vc3R1ZGVudGNsYWltMlwiKSB7XHJcbi8vICAgICAvLyBQYWdlIDIgXHJcbi8vICAgICBpbml0U3R1ZGVudHMoKTtcclxuLy8gICAgIGluaXRGbG93KCk7XHJcbi8vICAgICAkKFwiLnB0LXNob3dJZkhvbWVsZXNzXCIpLmhpZGUoKTtcclxuLy8gICAgICQoXCIucHQtc2hvd0lmUmVxdWlyZVJlbnRBc3Npc3RhbmNlXCIpLmhpZGUoKTtcclxuLy8gICAgICQoXCIucHQtc2hvd0lmUmVudGluZ1wiKS5oaWRlKCk7XHJcbi8vICAgICAkKFwiLnB0LXNob3dJZk5vdFJlbnRMYW5kTG9yZFwiKS5oaWRlKCk7XHJcbi8vICAgICAkKFwiLnB0LXJlbnRQYXllZFwiKS5oaWRlKCk7XHJcbi8vICAgICAkKFwiLnB0LXNob3dJZkFkZGl0aW9uYWxBZGRyZXNzXCIpLmhpZGUoKTtcclxuLy8gICAgICQoXCIucHQtc2hvd0lmTGl2aW5nQXdheVwiKS5oaWRlKCk7XHJcbi8vICAgICAkKFwiLnB0LXNob3dJZkJvYXJkaW5nXCIpLmhpZGUoKTtcclxuLy8gICAgICQoXCIucHQtYm9hcmRQYWlkXCIpLmhpZGUoKTtcclxuLy8gICAgICQoXCIucHQtc2hvd0lmT3RoZXJcIikuaGlkZSgpO1xyXG5cclxuXHJcbi8vICAgICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKSA9PT0gJ2F0LWhvbWUnKSB8fFxyXG4vLyAgICAgICAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRMaXZpbmdXaXRoUGFydG5lcicpID09PSAneWVzJykgfHxcclxuLy8gICAgICAgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPCAxNikpIHtcclxuLy8gICAgICAgJChcIi5wdC1zaG93SWZMaXZpbmdBd2F5XCIpLmhpZGUoKTtcclxuLy8gICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICQoXCIucHQtc2hvd0lmTGl2aW5nQXdheVwiKS5zaG93KCk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgJChcIiNzdHVkeUF3YXlGcm9tSG9tZUV4cGxhbmF0aW9uXCIpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgIHZhciBzZWxlY3RlZF9vcHRpb24gPSAkKCcjc3R1ZHlBd2F5RnJvbUhvbWVFeHBsYW5hdGlvbicpLnZhbCgpO1xyXG4vLyAgICAgICBpZiAoc2VsZWN0ZWRfb3B0aW9uID09PSAnaG9tZWxlc3MnKSB7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZIb21lbGVzc1wiKS5zaG93KCdmYXN0Jyk7XHJcbi8vICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZIb21lbGVzc1wiKS5oaWRlKCk7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG5cclxuXHJcbi8vICAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdBcnJhbmdlbWVudF0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nQXJyYW5nZW1lbnRdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3JlbnRpbmcnKSB7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZSZXF1aXJlUmVudEFzc2lzdGFuY2VcIikuc2hvdygpO1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmUmVudGluZ1wiKS5zaG93KCdmYXN0Jyk7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZCb2FyZGluZ1wiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgJChcIi5wdC1ib2FyZFBhaWRcIikuaGlkZSgpO1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmT3RoZXJcIikuaGlkZSgpO1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nQXJyYW5nZW1lbnQnKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0FycmFuZ2VtZW50JywgJ3JlbnRpbmcnKTtcclxuLy8gICAgICAgfSBlbHNlIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdBcnJhbmdlbWVudF06Y2hlY2tlZCcpLnZhbCgpID09PSAnYm9hcmRpbmcnKSB7XHJcbi8vICAgICAgICAgJChcIi5wdC1ib2FyZFBhaWRcIikuc2hvdygpO1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmQm9hcmRpbmdcIikuc2hvdygnZmFzdCcpO1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmUmVudGluZ1wiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZPdGhlclwiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZSZXF1aXJlUmVudEFzc2lzdGFuY2VcIikuaGlkZSgpO1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nQXJyYW5nZW1lbnQnKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0FycmFuZ2VtZW50JywgJ2JvYXJkaW5nJyk7XHJcbi8vICAgICAgIH0gZWxzZSBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nQXJyYW5nZW1lbnRdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ290aGVyJykge1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nQXJyYW5nZW1lbnQnKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0FycmFuZ2VtZW50JywgJ290aGVyJyk7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZPdGhlclwiKS5zaG93KCk7XHJcbi8vICAgICAgICAgJChcIi5wdC1ib2FyZFBhaWRcIikuaGlkZSgpO1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmQm9hcmRpbmdcIikuaGlkZSgpO1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmUmVudGluZ1wiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZSZXF1aXJlUmVudEFzc2lzdGFuY2VcIikuaGlkZSgpO1xyXG4vLyAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nQXJyYW5nZW1lbnQnKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfSk7XHJcblxyXG5cclxuXHJcbi8vICAgICAkKCdpbnB1dFtuYW1lPXNoYXJpbmdSZXNpZGVuY2VdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuXHJcbi8vICAgICAgICQoXCIucHQtcmVudFBheWVkXCIpLnNob3coKTtcclxuXHJcbi8vICAgICB9KTtcclxuXHJcblxyXG4vLyAgICAgJCgnaW5wdXRbbmFtZT1zYW1lQXNQb3N0YWxdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuXHJcbi8vICAgICAgIGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZBZGRpdGlvbmFsQWRkcmVzc1wiKS5oaWRlKCk7XHJcbi8vICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZBZGRpdGlvbmFsQWRkcmVzc1wiKS5zaG93KCk7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG5cclxuLy8gICB9XHJcblxyXG4vLyAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09IFwiL2F1dGgvY2xhaW0vc3R1ZGVudGNsYWltM1wiKSB7XHJcbi8vICAgICAvLyBwYWdlIDNcclxuLy8gICAgIGluaXRTdHVkZW50cygpO1xyXG4vLyAgICAgaW5pdEZsb3coKTtcclxuLy8gICAgICQoXCIucHQtc2hvd0lmTm90UHJpbWFyeVN0dWRlbnRcIikuaGlkZSgpO1xyXG4vLyAgICAgJChcIi5wdC1zaG93SWZQcmltYXJ5XCIpLmhpZGUoKTtcclxuLy8gICAgICQoXCIucHQtc2hvd0lmU2Vjb25kYXJ5XCIpLmhpZGUoKTtcclxuLy8gICAgICQoXCIucHQtc2hvd0lmVGVydGlhcnlcIikuaGlkZSgpO1xyXG4vLyAgICAgJChcIi5wdC1zaG93SWZQYXJ0VGltZVwiKS5oaWRlKCk7XHJcbi8vICAgICAkKFwiLnB0LW5vTG9uZ2VyRWxpZ2libGVcIikuaGlkZSgpO1xyXG4vLyAgICAgJChcIi5wdC1ub0xvbmdlckVsaWdpYmxlVHdvXCIpLmhpZGUoKTtcclxuLy8gICAgICQoXCIucHQtc2hvd0lmU3R1ZHlMb2FkTm90QW5zd2VyZWRcIikuaGlkZSgpO1xyXG4vLyAgICAgJChcIi5wdC1zaG93SWZFbnJvbGxlZFwiKS5oaWRlKCk7XHJcbi8vICAgICAkKFwiLnB0LWVucm9sbFN0YXR1c1N0dWRlbnRPdmVyMjVcIikuaGlkZSgpO1xyXG4vLyAgICAgLy8gJChcIi5wdC1lbnJvbGxEYXRlc3R1ZGVudE92ZXIyNVwiKS5oaWRlKCk7XHJcblxyXG5cclxuXHJcbi8vICAgICAvLyBza2lwIHRoZSBmaW5hbmNpYWwgZGV0YWlscyBpZiB3ZSdyZSBpbiB2ZXRlcmFuIGZsb3dcclxuLy8gICAgIC8vIGlmIChcInZldGVyYW5GbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XHJcbi8vICAgICAvLyAgICQoJy5idG5OZXh0JykucHJvcCgnb25jbGljaycsIG51bGwpO1xyXG4vLyAgICAgLy8gICAkKCcuYnRuTmV4dCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIC8vICAgICAvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuLy8gICAgIC8vICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvc3R1ZGVudGNsYWltdXBsb2FkJztcclxuLy8gICAgIC8vICAgfSlcclxuLy8gICAgIC8vIH1cclxuXHJcblxyXG4vLyAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50TGV2ZWxPZlN0dWR5JykgIT09ICdwcmltYXJ5Jykge1xyXG4vLyAgICAgICAkKFwiLnB0LXNob3dJZk5vdFByaW1hcnlTdHVkZW50XCIpLnNob3coJ2Zhc3QnKTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAkKFwiI3N0dWRlbnRMZXZlbE9mU3R1ZHlcIikuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgdmFyIHNlbGVjdGVkX29wdGlvbiA9ICQoJyNzdHVkZW50TGV2ZWxPZlN0dWR5JykudmFsKCk7XHJcblxyXG4vLyAgICAgICB2YXIgZ3JhZGVfb3B0aW9ucztcclxuXHJcbi8vICAgICAgIGlmIChzZWxlY3RlZF9vcHRpb24gPT09ICdwcmltYXJ5Jykge1xyXG4vLyAgICAgICAgICQoXCIucHQtbm9Mb25nZXJFbGlnaWJsZVwiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZTZWNvbmRhcnlcIikuaGlkZSgpO1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmVGVydGlhcnlcIikuaGlkZSgpO1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmUHJpbWFyeVwiKS5zaG93KCdmYXN0Jyk7XHJcblxyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGV2ZWxPZlN0dWR5Jyk7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMZXZlbE9mU3R1ZHknLCAncHJpbWFyeScpO1xyXG4vLyAgICAgICAgICQoXCIucGFnaW5hdGlvblwiKS5maW5kKCdidXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHJcbi8vICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRfb3B0aW9uLnN0YXJ0c1dpdGgoJ3NlY29uZGFyeScpKSB7XHJcblxyXG4vLyAgICAgICAgICQoXCIucHQtbm9Mb25nZXJFbGlnaWJsZVwiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZUZXJ0aWFyeVwiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZQcmltYXJ5XCIpLmhpZGUoKTtcclxuXHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZTZWNvbmRhcnlcIikuc2hvdygpO1xyXG5cclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExldmVsT2ZTdHVkeScpO1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TGV2ZWxPZlN0dWR5JywgJ3NlY29uZGFyeScpO1xyXG5cclxuLy8gICAgICAgICAkKFwiLnBhZ2luYXRpb25cIikuZmluZCgnYnV0dG9uJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbi8vICAgICAgIH0gZWxzZSBpZiAoKHNlbGVjdGVkX29wdGlvbi5zdGFydHNXaXRoKCd0ZXJ0aWFyeScpKSB8fCAoc2VsZWN0ZWRfb3B0aW9uID09PSAnYXBwcmVudGljZXNoaXAnKSkge1xyXG4vLyAgICAgICAgICQoXCIucHQtbm9Mb25nZXJFbGlnaWJsZVwiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZQcmltYXJ5XCIpLmhpZGUoKTtcclxuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZlNlY29uZGFyeVwiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZUZXJ0aWFyeVwiKS5zaG93KCdmYXN0Jyk7XHJcbi8vICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50TG9hZE9mU3R1ZHknKSA9PT0gbnVsbCkge1xyXG4vLyAgICAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkeUxvYWROb3RBbnN3ZXJlZFwiKS5zaG93KCdmYXN0Jyk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRMb2FkT2ZTdHVkeScpID09PSAncGFydC10aW1lJykge1xyXG4vLyAgICAgICAgICAgJChcIi5wdC1zaG93SWZQYXJ0VGltZVwiKS5zaG93KCdmYXN0Jyk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuXHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMZXZlbE9mU3R1ZHknKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExldmVsT2ZTdHVkeScsICd0ZXJ0aWFyeScpO1xyXG4vLyAgICAgICAgICQoXCIucGFnaW5hdGlvblwiKS5maW5kKCdidXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuLy8gICAgICAgfVxyXG5cclxuXHJcbi8vICAgICB9KTtcclxuXHJcblxyXG4vLyAgICAgJCgnaW5wdXRbbmFtZT1zdHVkeUxvYWRdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgaWYgKCQoJ2lucHV0W25hbWU9c3R1ZHlMb2FkXTpjaGVja2VkJykudmFsKCkgPT09ICdwYXJ0LXRpbWUnKSB7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZQYXJ0VGltZVwiKS5zaG93KCdmYXN0Jyk7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMb2FkT2ZTdHVkeScpO1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TG9hZE9mU3R1ZHknLCAncGFydC10aW1lJyk7XHJcbi8vICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZQYXJ0VGltZVwiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMb2FkT2ZTdHVkeScpO1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TG9hZE9mU3R1ZHknLCAnZnVsbC10aW1lJyk7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG5cclxuLy8gICAgICQoJ2lucHV0W25hbWU9ZW5yb2xTdGF0dXNdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgaWYgKCQoJ2lucHV0W25hbWU9ZW5yb2xTdGF0dXNdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ25vJykge1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdlbnJvbFN0YXR1cycpO1xyXG5cclxuLy8gICAgICAgICAkKFwiLnB0LW5vTG9uZ2VyRWxpZ2libGVUd29cIikuc2hvdygpO1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmRW5yb2xsZWRcIikuaGlkZSgpO1xyXG5cclxuLy8gICAgICAgICAvLyBTaG93IGFuIGVycm9yIG1lc3NhZ2UgaWYgdGhlIHN0dWRlbnQgaXMgMjUgb3Igb2xkZXIgYW5kIGhhc24ndCBlbnJvbGxlZFxyXG4vLyAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudEFnZScpID4gMjQpIHtcclxuLy8gICAgICAgICAgICQoXCIucHQtZW5yb2xsU3RhdHVzU3R1ZGVudE92ZXIyNVwiKS5zaG93KCk7XHJcbi8vICAgICAgICAgICAkKFwiLnB0LW5vTG9uZ2VyRWxpZ2libGVUd29cIikuaGlkZSgpO1xyXG4vLyAgICAgICAgICAgLy8gJChcIi5wdC1lbnJvbGxEYXRlc3R1ZGVudE92ZXIyNVwiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgICAkKFwiLnBhZ2luYXRpb25cIikuZmluZCgnLmJ0bk5leHQnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZW5yb2xTdGF0dXMnKTtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZW5yb2xTdGF0dXMnLCB0cnVlKTtcclxuLy8gICAgICAgICAkKFwiLnB0LW5vTG9uZ2VyRWxpZ2libGVUd29cIikuaGlkZSgpO1xyXG4vLyAgICAgICAgICQoXCIucHQtZW5yb2xsU3RhdHVzU3R1ZGVudE92ZXIyNVwiKS5oaWRlKCk7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZFbnJvbGxlZFwiKS5zaG93KCk7XHJcbi8vICAgICAgICAgLy9zaG93IGFuIGVycm9yIG1lc3NhZ2UgaWYgdGhlIHN0dWRlbnQgaXMgMjUgb3Igb2xkZXIgYW5kIGVucm9sbGVkIGFmdGVyIHRoZXkgdHVybmVkIDI1LiBUaGUgc21hcnRzIGRvbid0IGV4aXN0IGluIHByb3RvdHlwZS5cclxuLy8gICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDI0KSB7XHJcbi8vICAgICAgICAgICAvLyAkKFwiLnB0LWVucm9sbERhdGVzdHVkZW50T3ZlcjI1XCIpLnNob3coKTtcclxuLy8gICAgICAgICAgICQoXCIucGFnaW5hdGlvblwiKS5maW5kKCcuYnRuTmV4dCcpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgfVxyXG4vLyAgICAgfSk7XHJcbi8vICAgfVxyXG5cclxuLy8gICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSBcIi9hdXRoL2NsYWltL3N0dWRlbnRjbGFpbXVwbG9hZFwiKSB7XHJcbi8vICAgICBpbml0U3R1ZGVudHMoKTtcclxuLy8gICB9XHJcblxyXG4vLyAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09IFwiL2F1dGgvY2xhaW0vc3R1ZGVudGNsYWltNFwiKSB7XHJcbi8vICAgICAvLyBQYWdlIDRcclxuLy8gICAgIGluaXRTdHVkZW50cygpO1xyXG4vLyAgICAgaW5pdEZsb3coKTtcclxuLy8gICAgICQoJy5wdC1zdHVkZW50QWdlLS1tYXR1cmUnKS5oaWRlKCk7XHJcbi8vICAgICAkKCcucHQtc2hvd0lmRWR1Y2F0aW9uQWxsb3dhbmNlVGF4ZWQnKS5oaWRlKCk7XHJcbi8vICAgICAkKCcucHQtc2hvd0lmRWR1Y2F0aW9uQWxsb3dhbmNlTm90VGF4ZWQnKS5oaWRlKCk7XHJcbi8vICAgICAkKCcucHQtc2hvd0lmQ2FyZVBlcmNlbnRhZ2VMb3cnKS5oaWRlKCk7XHJcbi8vICAgICAkKCcucHQtc2hvd0lmQ2FyZVBlcmNlbnRhZ2VIaWdoJykuaGlkZSgpO1xyXG4vLyAgICAgJCgnLmJhbmstZGV0YWlscy1jb250YWluZXInKS5oaWRlKCk7XHJcbi8vICAgICAkKCcucHQtc2hvd0lmTm9TdHVkZW50VEZOJykuaGlkZSgpO1xyXG4vLyAgICAgJCgnLnB0LXNob3dJZlN0dWRlbnRURk4nKS5oaWRlKCk7XHJcbi8vICAgICAkKCcucHQtc3R1ZGVudEZpbmFuY2lhbFBlcm1pc3Npb24nKS5oaWRlKCk7XHJcblxyXG5cclxuLy8gICAgIC8vIGlmIHN0dWRlbnQgMTYgb3IgMTcgYXNrIGZvciBURk5cclxuLy8gICAgIGlmICgoXCJjbGFpbWFudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHx8IChcInZldGVyYW5GbG93XCIgaW4gbG9jYWxTdG9yYWdlKSkge1xyXG4vLyAgICAgICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPD0gMTgpICYmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudEFnZScpID4gMTUpKSB7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50QmV0d2VlbjE2YW5kMThcIikuc2hvdygpO1xyXG5cclxuLy8gICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRCZXR3ZWVuMTZhbmQxOFwiKS5oaWRlKCk7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBpZiAoKFwic3R1ZGVudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpKSB7XHJcbi8vICAgICAgIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA8IDE4KSAmJiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDE1KSkge1xyXG4vLyAgICAgICAgICQoJy5wdC1zdHVkZW50RmluYW5jaWFsUGVybWlzc2lvbicpLnNob3coKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuLy8gICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudEFnZScpID4gMTUpIHtcclxuLy8gICAgICAgJCgnLnB0LXN0dWRlbnRBZ2UtLW1hdHVyZScpLnNob3coKTtcclxuLy8gICAgIH1cclxuXHJcblxyXG4vLyAgICAgJCgnaW5wdXRbbmFtZT1lZHVjYXRpb25BbGxvd2FuY2VUYXhlZF0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1lZHVjYXRpb25BbGxvd2FuY2VUYXhlZF06Y2hlY2tlZCcpLnZhbCgpID09PSAneWVzJykge1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmRWR1Y2F0aW9uQWxsb3dhbmNlVGF4ZWRcIikuc2hvdygpO1xyXG4vLyAgICAgICAgICQoJy5wdC1zaG93SWZFZHVjYXRpb25BbGxvd2FuY2VOb3RUYXhlZCcpLmhpZGUoKTtcclxuLy8gICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZkVkdWNhdGlvbkFsbG93YW5jZVRheGVkXCIpLmhpZGUoKTtcclxuLy8gICAgICAgICAkKCcucHQtc2hvd0lmRWR1Y2F0aW9uQWxsb3dhbmNlTm90VGF4ZWQnKS5zaG93KCdmYXN0Jyk7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0pO1xyXG5cclxuXHJcblxyXG4vLyAgICAgLy8gYmFuayBkZXRhaWxzIGJ1dHRvbiBmdW5jdGlvblxyXG4vLyAgICAgJChcIiNidG5BZGRCYW5rXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgJChcIi5iYW5rLWRldGFpbHMtY29udGFpbmVyXCIpLnNob3coXCJmYXN0XCIpO1xyXG4vLyAgICAgICAkKFwiI2J0bkFkZEJhbmstYm94XCIpLmhpZGUoKTtcclxuLy8gICAgICAgJChcIiNiYW5rb3B0aW9uYWxcIikuaGlkZSgpO1xyXG4vLyAgICAgICAkKFwiI2J0bkNhbmNlbEJhbmtcIikuc2hvdygpO1xyXG4vLyAgICAgICAkKFwiI2JhbmstbmFtZVwiKS5mb2N1cygpO1xyXG4vLyAgICAgfSk7XHJcbi8vICAgICAkKFwiI2J0bkNhbmNlbEJhbmtcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAkKFwiLmJhbmstZGV0YWlscy1jb250YWluZXJcIikuaGlkZShcImZhc3RcIik7XHJcbi8vICAgICAgICQoXCIjYnRuQ2FuY2VsQmFua1wiKS5oaWRlKCk7XHJcbi8vICAgICAgICQoXCIjYmFua29wdGlvbmFsXCIpLnNob3coKTtcclxuLy8gICAgICAgJChcIiNidG5BZGRCYW5rLWJveFwiKS5zaG93KCk7XHJcbi8vICAgICB9KTtcclxuXHJcbi8vICAgICAkKFwiLm1lc3NhZ2UtY2xvc2VcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAkKFwiLmJhbmstZGV0YWlscy1jb250YWluZXJcIikuaGlkZShcImZhc3RcIik7XHJcbi8vICAgICB9KTtcclxuXHJcbi8vICAgICAkKCdpbnB1dFtuYW1lPWRvZXNTdHVkZW50SGF2ZVRGTl0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1kb2VzU3R1ZGVudEhhdmVURk5dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcclxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudFRGTicsIHRydWUpO1xyXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmTm9TdHVkZW50VEZOXCIpLmhpZGUoKTtcclxuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRURk5cIikuc2hvdygpO1xyXG4vLyAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50VEZOJywgZmFsc2UpO1xyXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0Zm4nKTtcclxuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZk5vU3R1ZGVudFRGTlwiKS5zaG93KCdmYXN0Jyk7XHJcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50VEZOXCIpLmhpZGUoKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfSk7XHJcblxyXG4vLyAgIH1cclxuXHJcblxyXG4vLyAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09IFwiL2F1dGgvY2xhaW0vc3R1ZGVudGNsYWltNGFcIikge1xyXG4vLyAgICAgaW5pdFN0dWRlbnRzKCk7XHJcbi8vICAgICBpbml0RmxvdygpO1xyXG4vLyAgIH1cclxuXHJcbi8vICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gXCIvYXV0aC9jbGFpbS9zdHVkZW50Y2xhaW02XCIpIHtcclxuLy8gICAgIGluaXRTdHVkZW50cygpO1xyXG5cclxuLy8gICAgICQoXCIucHQtc2hvd0lmTm9TdHVkZW50VEZOXCIpLmhpZGUoKTtcclxuXHJcbi8vICAgICBpZiAoIShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudEhhc1RGTicpKSAmJiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDE1KSkge1xyXG4vLyAgICAgICAkKFwiLnB0LXNob3dJZk5vU3R1ZGVudFRGTlwiKS5zaG93KCk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgdmFyIGJ1c2luZXNzRGF5cyA9IDUsXHJcbi8vICAgICAgIGNvdW50ZXIgPSAxOyAvLyBzZXQgdG8gMSB0byBjb3VudCBmcm9tIG5leHQgYnVzaW5lc3MgZGF5XHJcbi8vICAgICB3aGlsZSAoYnVzaW5lc3NEYXlzID4gMCkge1xyXG4vLyAgICAgICB2YXIgdG1wID0gbmV3IERhdGUoKTtcclxuLy8gICAgICAgdG1wLnNldERhdGUodG1wLmdldERhdGUoKSArIGNvdW50ZXIrKyk7XHJcbi8vICAgICAgIHN3aXRjaCAodG1wLmdldERheSgpKSB7XHJcbi8vICAgICAgICAgY2FzZSAwOlxyXG4vLyAgICAgICAgIGNhc2UgNjpcclxuLy8gICAgICAgICAgIGJyZWFrOyAvLyBzdW5kYXkgJiBzYXR1cmRheVxyXG4vLyAgICAgICAgIGRlZmF1bHQ6XHJcbi8vICAgICAgICAgICBidXNpbmVzc0RheXMtLTtcclxuLy8gICAgICAgfTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnB0LWJ1c3NuZXNzRGF5c091dGNvbWVcIikuaW5uZXJIVE1MID0gdG1wLnRvRGF0ZVN0cmluZygpO1xyXG4vLyAgIH1cclxuXHJcblxyXG4vLyAgIC8vIFBvQyBjaGVjayBkb2NzIHJlcXVpcmVkIGZvciBwcm90b3R5cGVcclxuXHJcbi8vICAgZnVuY3Rpb24gUGVyc29uKCkge1xyXG4vLyAgICAgLy8gaG93IG1hbnkgdGltZXMgaXMgdGhlIGNhbGxlZFxyXG4vLyAgICAgdGhpcy5pID0gMDtcclxuXHJcbi8vICAgICB0aGlzLnN0dWRlbnRBZ2U7XHJcbi8vICAgICB0aGlzLnN0dWRlbnROYW1lRmlyc3Q7XHJcbi8vICAgICB0aGlzLmRvY3NSZXF1aXJlZCA9IFtdO1xyXG5cclxuLy8gICAgIC8vIHByaXZpbGVnZWQgaW5pdCBtZXRob2RcclxuLy8gICAgIHRoaXMuaW5pdCgpO1xyXG4vLyAgIH1cclxuXHJcbi8vICAgLy8gZGVmaW5pbmcgaW5pdCBtZXRob2RcclxuLy8gICBQZXJzb24ucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAvLyByZWFzc2lnbiB0aGlzXHJcbi8vICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4vLyAgICAgX3RoaXMuY2hlY2tEb2NzKCk7XHJcbi8vICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcblxyXG4vLyAgICAgICBfdGhpcy5jaGVja0RvY3MoKTtcclxuLy8gICAgIH0sIDE1MDApO1xyXG4vLyAgIH07XHJcblxyXG4vLyAgIFBlcnNvbi5wcm90b3R5cGUuY2hlY2tEb2NzID0gZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgdGhpcy5pKys7XHJcblxyXG4vLyAgICAgLy8gbGlzdCBvZiBkb2NzXHJcbi8vICAgICAvLyBQcm9vZiBvZiByZWxhdGlvbnNoaXAgPSBwcm9vZk9mUmVsYXRpb25zaGlwXHJcbi8vICAgICAvLyBQcm9vZiBvZiByZXNpZGVuY2UgPSBwcm9vZk9mUmVzaWRlbmNlXHJcbi8vICAgICAvLyBQcm9vZiBvZiBlbnJvbG1lbnQgPSBwcm9vZk9mRW5yb2xtZW50XHJcbi8vICAgICAvLyBQYXJ0LXRpbWUgc3R1ZHkgcmVhc29uID0gcGFydFRpbWVTdHVkeVJlYXNvblxyXG4vLyAgICAgLy8gVGF4IGZpbGUgbnVtYmVyIGRlY2xhcmF0aW9uID0gdEZORGVjbGFyYWlvblxyXG5cclxuLy8gICAgIC8vIGNoZWNrIHR5cGUgb2YgcGVyc29uIFxyXG4vLyAgICAgaWYgKChcInN0dWRlbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB8fCAoXCJ2ZXRlcmFuRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkgfHwgKFwiY2xhaW1hbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSkge1xyXG5cclxuLy8gICAgICAgaWYgKFwic3R1ZGVudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHtcclxuLy8gICAgICAgICB0aGlzLnR5cGUgPSAnc3R1ZGVudCc7XHJcbi8vICAgICAgIH0gZWxzZSBpZiAoXCJ2ZXRlcmFuRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG4vLyAgICAgICAgIHRoaXMudHlwZSA9ICd2ZXRlcmFuJztcclxuLy8gICAgICAgfSBlbHNlIGlmIChcImNsYWltYW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG4vLyAgICAgICAgIHRoaXMudHlwZSA9ICdjbGFpbWFudCc7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH1cclxuXHJcblxyXG4vLyAgICAgLy8gUHJvb2Ygb2YgcmVsYXRpb25zaGlwIFxyXG4vLyAgICAgaWYgKFwidmV0ZXJhbkZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHtcclxuLy8gICAgICAgaWYgKChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudE5hbWVGaXJzdCcpICE9PSBudWxsKSAmJiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnROYW1lTGFzdCcpICE9PSBudWxsKSkge1xyXG4vLyAgICAgICAgIGluaXRTdHVkZW50cygpO1xyXG4vLyAgICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLmluZGV4T2YoXCJwcm9vZk9mUmVsYXRpb25zaGlwQ2xhaW1hbnRTdHVkZW50XCIpID09PSAtMSA/IHRoaXMuZG9jc1JlcXVpcmVkLnB1c2goXCJwcm9vZk9mUmVsYXRpb25zaGlwQ2xhaW1hbnRTdHVkZW50XCIpIDogY29uc29sZS5sb2coKTtcclxuLy8gICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICB2YXIgaSA9IHRoaXMuZG9jc1JlcXVpcmVkLmluZGV4T2YoXCJwcm9vZk9mUmVsYXRpb25zaGlwQ2xhaW1hbnRTdHVkZW50XCIpO1xyXG4vLyAgICAgICAgIGlmIChpICE9IC0xKSB7XHJcbi8vICAgICAgICAgICB0aGlzLmRvY3NSZXF1aXJlZC5zcGxpY2UoaSwgMSk7XHJcbi8vICAgICAgICAgICAkKCcucHQtcHJvb2ZPZlJlbGF0aW9uc2hpcENsYWltYW50U3R1ZGVudCcpLmFkZENsYXNzKCdkaXNwbGF5LW5vbmUnKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0gZWxzZSBpZiAoXCJzdHVkZW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG4vLyAgICAgICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd2ZXRlcmFuTmFtZUZpcnN0JykgIT09IG51bGwpICYmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndmV0ZXJhbk5hbWVMYXN0JykgIT09IG51bGwpKSB7XHJcbi8vICAgICAgICAgdGhpcy5kb2NzUmVxdWlyZWQuaW5kZXhPZihcInByb29mT2ZSZWxhdGlvbnNoaXBcIikgPT09IC0xID8gdGhpcy5kb2NzUmVxdWlyZWQucHVzaChcInByb29mT2ZSZWxhdGlvbnNoaXBcIikgOiBjb25zb2xlLmxvZygpO1xyXG4vLyAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgIHZhciBpID0gdGhpcy5kb2NzUmVxdWlyZWQuaW5kZXhPZihcInByb29mT2ZSZWxhdGlvbnNoaXBcIik7XHJcbi8vICAgICAgICAgaWYgKGkgIT0gLTEpIHtcclxuLy8gICAgICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLnNwbGljZShpLCAxKTtcclxuLy8gICAgICAgICAgICQoJy5wdC1wcm9vZk9mUmVsYXRpb25zaGlwJykuYWRkQ2xhc3MoJ2Rpc3BsYXktbm9uZScpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgfVxyXG4vLyAgICAgfSBlbHNlIGlmIChcImNsYWltYW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xyXG4vLyAgICAgICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd2ZXRlcmFuTmFtZUZpcnN0JykgIT09IG51bGwpICYmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndmV0ZXJhbk5hbWVMYXN0JykgIT09IG51bGwpICYmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudE5hbWVGaXJzdCcpICE9PSBudWxsKSAmJiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnROYW1lTGFzdCcpICE9PSBudWxsKSkge1xyXG4vLyAgICAgICAgIGluaXRTdHVkZW50cygpO1xyXG4vLyAgICAgICAgIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ZldGVyYW5OYW1lRmlyc3QnKSAhPT0gbnVsbCkgJiYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd2ZXRlcmFuTmFtZUxhc3QnKSAhPT0gbnVsbCkpIHtcclxuLy8gICAgICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLmluZGV4T2YoXCJwcm9vZk9mUmVsYXRpb25zaGlwVmV0ZXJhblN0dWRlbnRcIikgPT09IC0xID8gdGhpcy5kb2NzUmVxdWlyZWQucHVzaChcInByb29mT2ZSZWxhdGlvbnNoaXBWZXRlcmFuU3R1ZGVudFwiKSA6IGNvbnNvbGUubG9nKCk7XHJcbi8vICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgIHZhciBpID0gdGhpcy5kb2NzUmVxdWlyZWQuaW5kZXhPZihcInByb29mT2ZSZWxhdGlvbnNoaXBWZXRlcmFuU3R1ZGVudFwiKTtcclxuLy8gICAgICAgICAgIGlmIChpICE9IC0xKSB7XHJcbi8vICAgICAgICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLnNwbGljZShpLCAxKTtcclxuLy8gICAgICAgICAgICAgJCgnLnB0LXByb29mT2ZSZWxhdGlvbnNoaXBWZXRlcmFuU3R1ZGVudCcpLmFkZENsYXNzKCdkaXNwbGF5LW5vbmUnKTtcclxuLy8gICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnROYW1lRmlyc3QnKSAhPT0gbnVsbCkgJiYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50TmFtZUxhc3QnKSAhPT0gbnVsbCkpIHtcclxuLy8gICAgICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLmluZGV4T2YoXCJwcm9vZk9mUmVsYXRpb25zaGlwQ2xhaW1hbnRTdHVkZW50XCIpID09PSAtMSA/IHRoaXMuZG9jc1JlcXVpcmVkLnB1c2goXCJwcm9vZk9mUmVsYXRpb25zaGlwQ2xhaW1hbnRTdHVkZW50XCIpIDogY29uc29sZS5sb2coKTtcclxuLy8gICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgdmFyIGkgPSB0aGlzLmRvY3NSZXF1aXJlZC5pbmRleE9mKFwicHJvb2ZPZlJlbGF0aW9uc2hpcENsYWltYW50U3R1ZGVudFwiKTtcclxuLy8gICAgICAgICAgIGlmIChpICE9IC0xKSB7XHJcbi8vICAgICAgICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLnNwbGljZShpLCAxKTtcclxuLy8gICAgICAgICAgICAgJCgnLnB0LXByb29mT2ZSZWxhdGlvbnNoaXBDbGFpbWFudFN0dWRlbnQnKS5hZGRDbGFzcygnZGlzcGxheS1ub25lJyk7XHJcbi8vICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICB9XHJcbi8vICAgICB9XHJcblxyXG5cclxuLy8gICAgIC8vIFByb29mIG9mIGVucm9sbWVudCBcclxuLy8gICAgIGlmIChcImVucm9sU3RhdHVzXCIgaW4gbG9jYWxTdG9yYWdlKSB7XHJcbi8vICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLmluZGV4T2YoXCJwcm9vZk9mRW5yb2xtZW50XCIpID09PSAtMSA/IHRoaXMuZG9jc1JlcXVpcmVkLnB1c2goXCJwcm9vZk9mRW5yb2xtZW50XCIpIDogY29uc29sZS5sb2coKTtcclxuLy8gICAgIH0gZWxzZSB7XHJcblxyXG4vLyAgICAgICB2YXIgaSA9IHRoaXMuZG9jc1JlcXVpcmVkLmluZGV4T2YoXCJwcm9vZk9mRW5yb2xtZW50XCIpO1xyXG4vLyAgICAgICBpZiAoaSAhPSAtMSkge1xyXG4vLyAgICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLnNwbGljZShpLCAxKTtcclxuLy8gICAgICAgICAkKCcucHQtcHJvb2ZPZkVucm9sbWVudCcpLmFkZENsYXNzKCdkaXNwbGF5LW5vbmUnKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8vIFByb29mIG9mIHJlc2lkZW5jZSBcclxuLy8gICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJykgPT09ICdhd2F5LWZyb20taG9tZScpIHtcclxuLy8gICAgICAgdGhpcy5kb2NzUmVxdWlyZWQuaW5kZXhPZihcInByb29mT2ZSZXNpZGVuY2VcIikgPT09IC0xID8gdGhpcy5kb2NzUmVxdWlyZWQucHVzaChcInByb29mT2ZSZXNpZGVuY2VcIikgOiBjb25zb2xlLmxvZygpO1xyXG4vLyAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgdmFyIGkgPSB0aGlzLmRvY3NSZXF1aXJlZC5pbmRleE9mKFwicHJvb2ZPZlJlc2lkZW5jZVwiKTtcclxuLy8gICAgICAgaWYgKGkgIT0gLTEpIHtcclxuLy8gICAgICAgICB0aGlzLmRvY3NSZXF1aXJlZC5zcGxpY2UoaSwgMSk7XHJcbi8vICAgICAgICAgJCgnLnB0LXByb29mT2ZSZXNpZGVuY2UnKS5hZGRDbGFzcygnZGlzcGxheS1ub25lJyk7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvLyBQYXJ0LXRpbWUgc3R1ZHkgcmVhc29uIFxyXG4vLyAgICAgaWYgKChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudExvYWRPZlN0dWR5JykgPT09ICdwYXJ0LXRpbWUnKSkge1xyXG4vLyAgICAgICB0aGlzLmRvY3NSZXF1aXJlZC5pbmRleE9mKFwicGFydFRpbWVTdHVkeVJlYXNvblwiKSA9PT0gLTEgPyB0aGlzLmRvY3NSZXF1aXJlZC5wdXNoKFwicGFydFRpbWVTdHVkeVJlYXNvblwiKSA6IGNvbnNvbGUubG9nKCk7XHJcbi8vICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICB2YXIgaSA9IHRoaXMuZG9jc1JlcXVpcmVkLmluZGV4T2YoXCJwYXJ0VGltZVN0dWR5UmVhc29uXCIpO1xyXG4vLyAgICAgICBpZiAoaSAhPSAtMSkge1xyXG4vLyAgICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLnNwbGljZShpLCAxKTtcclxuLy8gICAgICAgICAkKCcucHQtcGFydFRpbWVTdHVkeVJlYXNvbicpLmFkZENsYXNzKCdkaXNwbGF5LW5vbmUnKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8vIHNob3cgYWxsIHJlcXVpcmVkIGRvY3MgXHJcbi8vICAgICBpZiAodGhpcy5kb2NzUmVxdWlyZWQubGVuZ3RoID4gMCkge1xyXG4vLyAgICAgICBqUXVlcnkoXCIucHQtc2hvd0lmRG9jdW1lbnRVcGxvYWRTaG9wcGluZ0NhcnRcIikuc2hvdygpO1xyXG4vLyAgICAgICAkLmVhY2godGhpcy5kb2NzUmVxdWlyZWQsIGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgICAkKCcucHQtJyArIHRoaXMpLnJlbW92ZUNsYXNzKCdkaXNwbGF5LW5vbmUnKTtcclxuLy8gICAgICAgfSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgIH07XHJcblxyXG4vLyAgIC8vIGNyZWF0ZSBhIG5ldyBwZXJzb25cclxuLy8gICB2YXIgY291bnRlciA9IG5ldyBQZXJzb24oKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyAgICQoXCIuYWNjb3JkaW9uX190cmlnZ2VyXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHJcbi8vICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwiYWNjb3JkaW9uX190cmlnZ2VyLS1vcGVuIGFjY29yZGlvbl9fdHJpZ2dlci0tY2xvc2VkXCIpO1xyXG4vLyAgICAgJCh0aGlzKS5jbG9zZXN0KFwiLmFjY29yZGlvblwiKS50b2dnbGVDbGFzcyhcImFjY29yZGlvbi0tY2xvc2VkIGFjY29yZGlvbi0tb3BlblwiKTtcclxuXHJcbi8vICAgfSk7XHJcblxyXG4vLyAgICQoJ2lucHV0W25hbWU9dGF4LWZpbGUtbnVtYmVyXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XHJcbi8vICAgICBpZiAodGhpcy52YWx1ZSkge1xyXG4vLyAgICAgICBjb25zb2xlLmxvZygnVEZOIHNldCB0bzogJywgdGhpcy52YWx1ZSk7XHJcbi8vICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0Zm4nLCB0aGlzLnZhbHVlKTtcclxuLy8gICAgIH0gZWxzZSB7XHJcbi8vICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0Zm4nKTtcclxuLy8gICAgIH1cclxuLy8gICB9KTtcclxuLy8gfSk7Il0sImZpbGUiOiJzdHVkZW50cy5qcyJ9
