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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0dWRlbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFJQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUlBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFFQTtBQUVBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBTUE7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAvLyBTdHVkZW50IGNsYWltIHBhZ2VzXG4vLyBqUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgkKSB7XG5cbi8vICAgLy8gYWxlcnQoJ3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZScgKyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuXG4vLyAgIGZ1bmN0aW9uIGluaXRTdHVkZW50cygpIHtcblxuLy8gICAgIHZhciBzdHVkZW50TmFtZUZpcnN0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnROYW1lRmlyc3QnKTtcbi8vICAgICAvLyBnZXQgdGhlIG5hbWUgZnJvbSBzdG9yYWdlIFxuLy8gICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudE5hbWVGaXJzdCcpKSB7XG4vLyAgICAgICAvLyBhZGQgJ1xuLy8gICAgICAgdmFyIGFwb3N0cm9waGUgPSBcIidcIjtcbi8vICAgICAgIC8vIGFkZCBzIHRvICcgaWYgc3R1ZGVudCdzIG5hbWUgZG9lc24ndCBlbmQgaW4gc1xuLy8gICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50TmFtZUZpcnN0Jykuc2xpY2UoLTEpICE9PSBcInNcIikge1xuLy8gICAgICAgICBhcG9zdHJvcGhlID0gYXBvc3Ryb3BoZSArIFwic1wiO1xuLy8gICAgICAgfVxuLy8gICAgIH1cblxuLy8gICAgIHZhciBzdHVkZW50TmFtZUZpcnN0QXBvc3Ryb3BoZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudE5hbWVGaXJzdCcpICsgYXBvc3Ryb3BoZTtcblxuLy8gICAgIC8vIG9ubHkgZm9yIHZldGVyYW4gYW5kIHBhcmVudC9ndWFyZGlhbiBmbG93c1xuLy8gICAgIGlmICgoXCJ2ZXRlcmFuRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkgfHwgKFwiY2xhaW1hbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSkge1xuXG4vLyAgICAgICAvLyBib3RoIGFwb3N0cm9waGVkIGFuZCBzdHJhaWdodCBuYW1lcyBhcmUgdXNlZCBpbiB0aGUgc2NyZWVucyBcbi8vICAgICAgICQoXCIuc3R1ZGVudE5hbWVGaXJzdEFwb3N0cm9waGVkXCIpLmh0bWwoc3R1ZGVudE5hbWVGaXJzdEFwb3N0cm9waGVkKTtcbi8vICAgICAgICQoXCIuc3R1ZGVudE5hbWVGaXJzdFwiKS5odG1sKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50TmFtZUZpcnN0JykpO1xuXG5cbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgJChcIi5zdHVkZW50TmFtZUZpcnN0QXBvc3Ryb3BoZWRcIikuaHRtbCgnJyk7XG4vLyAgICAgICAkKFwiLnN0dWRlbnROYW1lRmlyc3RcIikuaHRtbCgnJyk7XG4vLyAgICAgfVxuXG4vLyAgICAgLy8gUHVsbCBpbiB0aGUganNvbiBjb250ZW50IFxuLy8gICAgICQuYWpheCh7XG4vLyAgICAgICB1cmw6ICcvZG9jcy9kYXRhL3N0dWRlbnQtY2xhaW0tY29udGVudC5qc29uJyxcbi8vICAgICAgIGFzeW5jOiBmYWxzZSxcbi8vICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4vLyAgICAgfSkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xuXG4vLyAgICAgICBjb25zb2xlLmxvZygnQ29udGVudCBkYXRhIGJhY2snKTtcblxuLy8gICAgICAgdmFyIGNvbnRlbnRTZXQgPSBbXTtcbi8vICAgICAgIHZhciBjb250ZW50VmV0ZXJhbiA9IFtdO1xuLy8gICAgICAgdmFyIGNvbnRlbnRTdHVkZW50ID0gW107XG4vLyAgICAgICB2YXIgY29udGVudFBhcmVudEd1YXJkaWFuID0gW107XG4vLyAgICAgICB2YXIgY29udGVudE1lc3NhZ2VzID0gW107XG5cbi8vICAgICAgICQuZWFjaChkYXRhLmNvbnRlbnRzLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcblxuLy8gICAgICAgICBpZiAoZWxlbWVudC52ZXRlcmFuKSB7XG4vLyAgICAgICAgICAgY29udGVudFZldGVyYW4gPSBlbGVtZW50LnZldGVyYW47XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgaWYgKGVsZW1lbnQucGFyZW50R3VhcmRpYW4pIHtcbi8vICAgICAgICAgICBjb250ZW50UGFyZW50R3VhcmRpYW4gPSBlbGVtZW50LnBhcmVudEd1YXJkaWFuO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGlmIChlbGVtZW50LnN0dWRlbnQpIHtcbi8vICAgICAgICAgICBjb250ZW50U3R1ZGVudCA9IGVsZW1lbnQuc3R1ZGVudDtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBpZiAoZWxlbWVudC5tZXNzYWdlcykge1xuLy8gICAgICAgICAgIGNvbnRlbnRNZXNzYWdlcyA9IGVsZW1lbnQubWVzc2FnZXM7XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgfSk7XG5cbi8vICAgICAgIGlmIChcInZldGVyYW5GbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XG5cbi8vICAgICAgICAgY29udGVudFNldCA9IE9iamVjdC5hc3NpZ24oe30sIGNvbnRlbnRNZXNzYWdlcywgY29udGVudFZldGVyYW4pO1xuLy8gICAgICAgfVxuXG4vLyAgICAgICBpZiAoXCJjbGFpbWFudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHtcblxuLy8gICAgICAgICBjb250ZW50U2V0ID0gT2JqZWN0LmFzc2lnbih7fSwgY29udGVudE1lc3NhZ2VzLCBjb250ZW50UGFyZW50R3VhcmRpYW4pO1xuLy8gICAgICAgfVxuXG4vLyAgICAgICBpZiAoXCJzdHVkZW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xuXG4vLyAgICAgICAgIGNvbnRlbnRTZXQgPSBPYmplY3QuYXNzaWduKHt9LCBjb250ZW50TWVzc2FnZXMsIGNvbnRlbnRTdHVkZW50KTtcbi8vICAgICAgIH1cblxuLy8gICAgICAgZm9yICh2YXIga2V5IGluIGNvbnRlbnRTZXQpIHtcbi8vICAgICAgICAgdmFyIGNvbnRlbnQgPSBjb250ZW50U2V0W2tleV0ucmVwbGFjZSgve3tzdHVkZW50TmFtZUZpcnN0QXBvc3Ryb3BoZWR9fS9nLCBzdHVkZW50TmFtZUZpcnN0QXBvc3Ryb3BoZWQpO1xuLy8gICAgICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC97e3N0dWRlbnROYW1lRmlyc3R9fS9nLCBzdHVkZW50TmFtZUZpcnN0KTtcbi8vICAgICAgICAgJChcIiNxdWVzdGlvbl9cIiArIGtleSkuaHRtbChjb250ZW50KTtcbi8vICAgICAgIH1cbi8vICAgICB9KTtcblxuLy8gICB9XG5cbi8vICAgZnVuY3Rpb24gaW5pdEZsb3coKSB7XG4vLyAgICAgaWYgKFwidmV0ZXJhbkZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHtcbi8vICAgICAgICQoXCIucHQtZmxvdy0tdmV0ZXJhblwiKS5zaG93KFwiZmFzdFwiKTtcbi8vICAgICB9XG5cbi8vICAgICBpZiAoXCJzdHVkZW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xuLy8gICAgICAgJChcIi5wdC1mbG93LS1zdHVkZW50XCIpLnNob3coXCJmYXN0XCIpO1xuLy8gICAgIH1cblxuLy8gICAgIGlmIChcImNsYWltYW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xuLy8gICAgICAgJChcIi5wdC1mbG93LS1jbGFpbWFudFwiKS5zaG93KFwiZmFzdFwiKTtcbi8vICAgICB9XG4vLyAgIH1cblxuLy8gICAvLyBUT0RPOjogaGFuZGxlIHJlc2V0IGlmIGNoYW5nZSBvZiBhZ2UgYWZ0ZXIgb3RoZXIgZmxvd3Ncbi8vICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gXCIvYXV0aC9jbGFpbS9zdHVkZW50cHJlZWxpZ2liaWxpdHlcIikge1xuXG4vLyAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG5cbi8vICAgICAvLyBub3cgaW4gbWFpblxuLy8gICAgIC8vIHZhciBnZXRVcmxQYXJhbWV0ZXIgPSBmdW5jdGlvbiBnZXRVcmxQYXJhbWV0ZXIoc1BhcmFtKSB7XG4vLyAgICAgLy8gICB2YXIgc1BhZ2VVUkwgPSBkZWNvZGVVUklDb21wb25lbnQod2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSkpLFxuLy8gICAgIC8vICAgICBzVVJMVmFyaWFibGVzID0gc1BhZ2VVUkwuc3BsaXQoJyYnKSxcbi8vICAgICAvLyAgICAgc1BhcmFtZXRlck5hbWUsXG4vLyAgICAgLy8gICAgIGk7XG5cbi8vICAgICAvLyAgIGZvciAoaSA9IDA7IGkgPCBzVVJMVmFyaWFibGVzLmxlbmd0aDsgaSsrKSB7XG4vLyAgICAgLy8gICAgIHNQYXJhbWV0ZXJOYW1lID0gc1VSTFZhcmlhYmxlc1tpXS5zcGxpdCgnPScpO1xuXG4vLyAgICAgLy8gICAgIGlmIChzUGFyYW1ldGVyTmFtZVswXSA9PT0gc1BhcmFtKSB7XG4vLyAgICAgLy8gICAgICAgcmV0dXJuIHNQYXJhbWV0ZXJOYW1lWzFdID09PSB1bmRlZmluZWQgPyB0cnVlIDogc1BhcmFtZXRlck5hbWVbMV07XG4vLyAgICAgLy8gICAgIH1cbi8vICAgICAvLyAgIH1cbi8vICAgICAvLyB9O1xuXG4vLyAgICAgdmFyIGZsb3cgPSBnZXRVcmxQYXJhbWV0ZXIoJ2Zsb3cnKTtcbi8vICAgICB2YXIgYWdlID0gZ2V0VXJsUGFyYW1ldGVyKCdzdHVkZW50QWdlJyk7XG4vLyAgICAgdmFyIGRvY1VwbG9hZHMgPSBnZXRVcmxQYXJhbWV0ZXIoJ2RvY1VwbG9hZHMnKTtcbi8vICAgICB2YXIgYWN0ID0gZ2V0VXJsUGFyYW1ldGVyKCdhY3QnKTtcblxuXG4vLyAgICAgY29uc29sZS5sb2coJ2Zsb3cgPSAnICsgZmxvdyk7XG5cbi8vICAgICBpZiAoZmxvdykge1xuLy8gICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oZmxvdywgdHJ1ZSk7XG4vLyAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmxvdycsIGZsb3cpO1xuLy8gICAgICAgaWYgKGFnZSkge1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudEFnZScsIGFnZSk7XG4vLyAgICAgICB9XG4vLyAgICAgICBpZiAoZG9jVXBsb2Fkcykge1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZG9jVXBsb2FkcycsIGRvY1VwbG9hZHMpO1xuLy8gICAgICAgfSBlbHNlIHsgLy8gc2V0dGluZyBhbGwgZmxvd3MgdG8gc2hvcHBpbmcgY2FyZCB1cGxvYWRzIGJ5IGRlZmF1bHQgXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkb2NVcGxvYWRzJywgJ3Nob3BwaW5nJyk7XG4vLyAgICAgICB9XG4vLyAgICAgICBpZiAoYWN0KSB7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY3QnLCBhY3QpO1xuLy8gICAgICAgfSBlbHNlIHsgLy8gc2V0dGluZyBldmVyeW9uZSB0byBtcmNhIGlmIG5vdCBzcGVjaWZpZWQgXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY3QnLCAnbXJjYScpO1xuLy8gICAgICAgfVxuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICAvLyBhbGVydCgnVGhlIHByb3RvdHlwZSByZXF1aXJlcyBhIGZsb3cgYW5kIGFnZSBpbiB0aGUgdXJsIHN0cmluZyBlLmcuICAnICsgbG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgbG9jYXRpb24uaG9zdCArIGxvY2F0aW9uLnBhdGhuYW1lICsgJz9mbG93PXN0dWRlbnRGbG93JnN0dWRlbnRBZ2U9MTAnKVxuLy8gICAgIH1cblxuLy8gICAgIGlmIChmbG93ICE9PSAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Zsb3cnKSkpIHtcbi8vICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XG4vLyAgICAgfVxuXG4vLyAgICAgaW5pdFN0dWRlbnRzKCk7XG5cblxuLy8gICAgIGlmIChcInZldGVyYW5GbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XG5cbi8vICAgICAgIC8vIGFsZXJ0KCdpbSB2ZXQnKTtcblxuLy8gICAgICAgJChcIi5wdC1mbG93LS12ZXRlcmFuXCIpLnNob3coKTtcbi8vICAgICB9XG5cbi8vICAgICBpZiAoXCJzdHVkZW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xuLy8gICAgICAgJChcIi5wdC1mbG93LS1zdHVkZW50XCIpLnNob3coKTtcbi8vICAgICB9XG5cbi8vICAgICBpZiAoXCJjbGFpbWFudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHtcbi8vICAgICAgICQoXCIucHQtZmxvdy0tY2xhaW1hbnRcIikuc2hvdygpO1xuLy8gICAgIH1cblxuLy8gICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4vLyAgICAgICBjb25zb2xlLmxvZygnbG9hZGluZyBpbml0Jyk7XG5cbi8vICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudFNob3VsZENsYWltVGhlbXNlbHZlc1wiKS5oaWRlKCk7XG4vLyAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRVbmRlcjE4XCIpLmhpZGUoKTtcbi8vICAgICAgICQoXCIucHQtc2hvd0lmQ2VudHJlbGlua0N1c3RvbWVyXCIpLmhpZGUoKTtcbi8vICAgICAgICQoXCIucHQtc2hvd0lmWW91ckZUQlwiKS5oaWRlKCk7XG4vLyAgICAgICAkKFwiLnB0LXNob3dJZlNvbWVvbmVFbHNlRlRCXCIpLmhpZGUoKTtcbi8vICAgICAgICQoXCIucHQtc2hvd0lmTm9GVEJcIikuaGlkZSgpO1xuLy8gICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50QmV0d2VlbjE2YW5kMThcIikuaGlkZSgpO1xuLy8gICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50VW5kZXIwXCIpLmhpZGUoKTtcbi8vICAgICAgICQoXCIucHQtc2hvd0lmTm9URk5cIikuaGlkZSgpO1xuLy8gICAgICAgJChcIi5wdC1zaG93RlRCSXNCZXN0XCIpLmhpZGUoKTtcbi8vICAgICAgICQoJy5wdC1zaG93SWZNUkNBJykuaGlkZSgpO1xuLy8gICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50RnVsbFRpbWVBbmRNUkNBXCIpLmhpZGUoKTtcbi8vICAgICAgICQoXCIucHQtdmV0U2hvd0lmU3R1ZGVudEZ1bGxUaW1lQW5kTVJDQVwiKS5oaWRlKCk7XG4vLyAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRDb25maXJtZWRcIikuaGlkZSgpO1xuLy8gICAgICAgJCgnLnB0LXNob3dJZkVuZ2FnZWRJbkZ1bGxUaW1lRW1wbG95bWVudCcpLmhpZGUoKTtcbi8vICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudERlcGVuZGFudE9uVmV0ZXJhblwiKS5oaWRlKCk7XG4vLyAgICAgICAkKCcucHQtc2hvd0lmUmVsYXRpb25zaGlwVmFsaWQnKS5oaWRlKCk7XG4vLyAgICAgICAkKCcucHQtc3R1ZGVudEZ1bGxUaW1lJykuaGlkZSgpO1xuLy8gICAgICAgJCgnLnB0LXNob3dJZlN0dWRlbnRDYW50Q2xhaW0nKS5oaWRlKCk7XG4vLyAgICAgICAkKCcucHQtc2hvd0lmU3R1ZGVudE5vdERlcGVuZGFudCcpLmhpZGUoKTtcbi8vICAgICAgICQoJy5wdC1hYm91dFlvdScpLmhpZGUoKTtcbi8vICAgICAgICQoJy5wdC1zdHVkZW50T3ZlcjI1JykuaGlkZSgpO1xuLy8gICAgICAgJCgnLnB0LXN0dWRlbnRUb295b3VuZycpLmhpZGUoKTtcbi8vICAgICAgICQoJy5wdC1WZXRlcmFuUmVsYXRpb25zaGlwVG9TdHVkZW50JykuaGlkZSgpO1xuLy8gICAgICAgJChcIi5wdC1TdHVkZW50UmVsYXRpb25zaGlwVG9WZXRlcmFuXCIpLmhpZGUoKTtcbi8vICAgICAgICQoXCIucHQtU3R1ZGVudFJlbGF0aW9uc2hpcFRvQ2xhaW1hbnRcIikuaGlkZSgpO1xuLy8gICAgIH1cblxuLy8gICAgIGZ1bmN0aW9uIHJlc2V0Rm9ybSgkZm9ybSkge1xuXG4vLyAgICAgICAkKCdpbnB1dFt0eXBlPXJhZGlvXTpjaGVja2VkJykubm90KCdpbnB1dFt0eXBlPXJhZGlvXVtuYW1lPWNvbmZpcm1TdHVkZW50T3JDbGFpbWFudF0nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuLy8gICAgIH1cblxuLy8gICAgIGluaXQoKTtcblxuXG5cbi8vICAgICAkKCdpbnB1dFtuYW1lPWZUQllvdV0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuLy8gICAgICAgaWYgKCQoJ2lucHV0W25hbWU9ZlRCWW91XTpjaGVja2VkJykudmFsKCkgPT09ICd5ZXMnKSB7XG5cbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZZb3VyRlRCXCIpLnNob3coKTtcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZTb21lb25lRWxzZUZUQlwiKS5oaWRlKCk7XG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmQ2VudHJlbGlua0N1c3RvbWVyXCIpLnNob3coKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3ZldGVyYW5SZWNlaXZlc0ZUQicpO1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndmV0ZXJhblJlY2VpdmVzRlRCJywgdHJ1ZSk7XG5cbi8vICAgICAgICAgaWYgKChcInZldGVyYW5GbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB8fCAoXCJjbGFpbWFudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpKSB7XG4vLyAgICAgICAgICAgaWYgKChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudEFnZScpIDw9IDE4KSAmJiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDE1KSkge1xuLy8gICAgICAgICAgICAgJChcIi5wdC1zaG93RlRCSXNCZXN0XCIpLnNob3coKTtcblxuXG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGlmICgoXCJ2ZXRlcmFuRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkpIHtcbi8vICAgICAgICAgICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPD0gMTgpICYmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudEFnZScpID4gMTUpKSB7XG5cbi8vICAgICAgICAgICAgICQoXCIucHQtdmV0U3R1ZGVudEVuZ2FnZWRJbkZ1bGxUaW1lRW1wbG95bWVudFwiKS5zaG93KCk7XG5cbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgaWYgKCEoXCJjbGFpbWFudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpKSB7XG4vLyAgICAgICAgICAgLy8gaWYgc3R1ZGVudCAxNiBvciAxNyBhc2sgZm9yIFRGTlxuLy8gICAgICAgICAgIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA8PSAxOCkgJiYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPiAxNSkpIHtcbi8vICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudEJldHdlZW4xNmFuZDE4XCIpLnNob3coKTtcblxuLy8gICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRCZXR3ZWVuMTZhbmQxOFwiKS5oaWRlKCk7XG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG5cbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmWW91ckZUQlwiKS5oaWRlKCk7XG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmU29tZW9uZUVsc2VGVEJcIikuc2hvdygpO1xuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZkNlbnRyZWxpbmtDdXN0b21lclwiKS5oaWRlKCk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd2ZXRlcmFuUmVjZWl2ZXNGVEInKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ZldGVyYW5SZWNlaXZlc0ZUQicsIGZhbHNlKTtcbi8vICAgICAgIH1cbi8vICAgICB9KTtcblxuXG5cbi8vICAgICAkKCdpbnB1dFtuYW1lPWZUQlNvbWVvbmVFbHNlXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4vLyAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1mVEJTb21lb25lRWxzZV06Y2hlY2tlZCcpLnZhbCgpID09PSAneWVzJykge1xuXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmTm9GVEJcIikuc2hvdygpO1xuLy8gICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZOb0ZUQlwiKS5oaWRlKCk7XG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmQ2VudHJlbGlua0N1c3RvbWVyXCIpLmhpZGUoKTtcblxuLy8gICAgICAgICAvLyBpZiBzdHVkZW50IDE2IG9yIDE3IGFzayBmb3IgVEZOXG4vLyAgICAgICAgIGlmICghKFwiY2xhaW1hbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSkge1xuLy8gICAgICAgICAgIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA8PSAxOCkgJiYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPiAxNSkpIHtcbi8vICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudEJldHdlZW4xNmFuZDE4XCIpLnNob3coKTtcbi8vICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50QmV0d2VlbjE2YW5kMThcIikuaGlkZSgpO1xuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgICAgICBpZiAoXCJ2ZXRlcmFuRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xuLy8gICAgICAgICAgIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA8IDE4KSAmJiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDE1KSkge1xuLy8gICAgICAgICAgICAgJChcIi5wdC12ZXRTdHVkZW50RW5nYWdlZEluRnVsbFRpbWVFbXBsb3ltZW50XCIpLnNob3coKTtcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH1cbi8vICAgICB9KTtcblxuLy8gICAgICQoJ2lucHV0W25hbWU9ZW5nYWdlZEluRnVsbFRpbWVFbXBsb3ltZW50XScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4vLyAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1lbmdhZ2VkSW5GdWxsVGltZUVtcGxveW1lbnRdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcbi8vICAgICAgICAgaWYgKChcInZldGVyYW5GbG93XCIgaW4gbG9jYWxTdG9yYWdlKSkge1xuLy8gICAgICAgICAgICQoXCIucHQtdmV0U2hvd0lmU3R1ZGVudEZ1bGxUaW1lQW5kTVJDQVwiKS5zaG93KCk7XG5cbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRGdWxsVGltZUFuZE1SQ0FcIikuc2hvdygpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAkKFwiLnB0LXZldFNob3dJZlN0dWRlbnRGdWxsVGltZUFuZE1SQ0FcIikuaGlkZSgpO1xuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRGdWxsVGltZUFuZE1SQ0FcIikuaGlkZSgpO1xuLy8gICAgICAgICAkKFwiLnB0LVN0dWRlbnRSZWxhdGlvbnNoaXBUb1ZldGVyYW5cIikuc2hvdygpO1xuLy8gICAgICAgfVxuLy8gICAgICAgaWYgKChcInZldGVyYW5GbG93XCIgaW4gbG9jYWxTdG9yYWdlKSkge1xuLy8gICAgICAgICAkKFwiLnB0LWZpbmFsLXRvZ2dsZVwiKS5zaG93KCk7XG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG5cbi8vICAgICAvLyBDYWxjdWxhdGUgc3R1ZGVudCBhZ2Vcbi8vICAgICAkKFwiLnB0LXN0dWRlbnQtZG9iID4gOmlucHV0XCIpLmtleXVwKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgIHZhciBkb2JEYXkgPSAkKFwiI2RkLWRhdGVcIikudmFsKCk7XG4vLyAgICAgICB2YXIgZG9iTW9udGggPSAkKFwiI21tLWRhdGVcIikudmFsKCk7XG4vLyAgICAgICB2YXIgZG9iWWVhciA9ICQoXCIjeXl5eS1kYXRlXCIpLnZhbCgpO1xuXG4vLyAgICAgICAvLyBpZiBhIHZhbGlkIGRhdGVcbi8vICAgICAgIGlmIChkb2JEYXkgJiYgZG9iTW9udGggJiYgKGRvYlllYXIubGVuZ3RoID09PSA0KSkge1xuXG5cblxuLy8gICAgICAgICBpZiAoZG9iRGF5Lmxlbmd0aCA9PT0gMSkge1xuLy8gICAgICAgICAgIGRvYkRheSA9IFwiMFwiICsgZG9iRGF5O1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGlmIChkb2JNb250aC5sZW5ndGggPT09IDEpIHtcbi8vICAgICAgICAgICBkb2JNb250aCA9IFwiMFwiICsgZG9iTW9udGg7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgdmFyIGRvYiA9IGRvYlllYXIgKyAnLScgKyBkb2JNb250aCArICctJyArIGRvYkRheTtcblxuLy8gICAgICAgICBkb2IgPSBuZXcgRGF0ZShkb2IpO1xuLy8gICAgICAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuLy8gICAgICAgICB2YXIgYWdlID0gTWF0aC5mbG9vcigodG9kYXkgLSBkb2IpIC8gKDM2NS4yNSAqIDI0ICogNjAgKiA2MCAqIDEwMDApKTtcblxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudEFnZScpO1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudEFnZScsIGFnZSk7XG4vLyAgICAgICAgIGNvbnNvbGUuZGVidWcoJ3N0dWRlbnQgYWdlOiAnLCBhZ2UpO1xuXG4vLyAgICAgICAgIC8vIHZhbGlkYXRpb246OiBvbGRlciB0aGFuIDVcbi8vICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPCA1KSB7XG4vLyAgICAgICAgICAgaW5pdCgpO1xuLy8gICAgICAgICAgIHJlc2V0Rm9ybSgkKCcjcHQtZm9ybScpKTtcbi8vICAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRVbmRlcjBcIikuc2hvdygpO1xuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdzdHVkZW50IGlzIG9sZGVyIHRoYW4gNCcpO1xuLy8gICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudFVuZGVyMFwiKS5oaWRlKCk7XG5cbi8vICAgICAgICAgICAvLyB2ZXRlcmFuIGFuZCBjbGFpbWFudCBmbG93IG9ubHlcbi8vICAgICAgICAgICBpZiAoKFwidmV0ZXJhbkZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpKSB7XG5cbi8vICAgICAgICAgICAgIC8vIGlmIG92ZXIgMTgsIHN1Z2dlc3Qgc3R1ZGVudCBjbGFpbXMgb24gdGhlaXIgb3duIFxuLy8gICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPiAyNCkge1xuLy8gICAgICAgICAgICAgICBpbml0KCk7XG4vLyAgICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudENhbnRDbGFpbVwiKS5zaG93KCk7XG4vLyAgICAgICAgICAgICB9IGVsc2UgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPiAxNykge1xuXG4vLyAgICAgICAgICAgICAgIGluaXQoKTtcbi8vICAgICAgICAgICAgICAgcmVzZXRGb3JtKCQoJyNwdC1mb3JtJykpO1xuLy8gICAgICAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRTaG91bGRDbGFpbVRoZW1zZWx2ZXNcIikuc2hvdygpO1xuLy8gICAgICAgICAgICAgICAvLyAkKFwiLnB0LXNob3dJZlN0dWRlbnRVbmRlcjE4XCIpLmhpZGUoKTtcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgIGluaXQoKTtcbi8vICAgICAgICAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50U2hvdWxkQ2xhaW1UaGVtc2VsdmVzXCIpLmhpZGUoKTtcbi8vICAgICAgICAgICAgICAgJChcIi5wdC1WZXRlcmFuUmVsYXRpb25zaGlwVG9TdHVkZW50XCIpLnNob3coKTtcbi8vICAgICAgICAgICAgICAgJChcIi5wdC1TdHVkZW50UmVsYXRpb25zaGlwVG9WZXRlcmFuXCIpLmhpZGUoKTtcbi8vICAgICAgICAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50VW5kZXIxOFwiKS5zaG93KCk7XG4vLyAgICAgICAgICAgICAgIC8vICQoXCIucHQtY2xhaW1hbnRTaG93SWZTdHVkZW50T3ZlcjE2XCIpLnNob3coKTtcblxuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAkKCdpbnB1dFtuYW1lPXZldGVyYW5TaWduaWZpY2FudGx5SW5qdXJlZF0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT12ZXRlcmFuU2lnbmlmaWNhbnRseUluanVyZWRdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcbi8vICAgICAgICAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnROb3REZXBlbmRhbnRcIikuc2hvdygpO1xuLy8gICAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudE5vdERlcGVuZGFudFwiKS5oaWRlKCk7XG4vLyAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgIH1cblxuLy8gICAgICAgICAgIC8vIGNsYWltYW50IGZsb3cgb25seVxuLy8gICAgICAgICAgIGlmIChcImNsYWltYW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xuLy8gICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPiAyNCkge1xuLy8gICAgICAgICAgICAgICBpbml0KCk7XG4vLyAgICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudENhbnRDbGFpbVwiKS5zaG93KCk7XG4vLyAgICAgICAgICAgICB9IGVsc2UgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPiAxNykge1xuLy8gICAgICAgICAgICAgICBpbml0KCk7XG4vLyAgICAgICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudFNob3VsZENsYWltVGhlbXNlbHZlc1wiKS5zaG93KCk7XG4vLyAgICAgICAgICAgICAgIC8vICQoXCIucHQtc2hvd0lmU3R1ZGVudFVuZGVyMThcIikuaGlkZSgpO1xuLy8gICAgICAgICAgICAgfSBlbHNlIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDE1KSAmJiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA8PSAxOCkpIHtcbi8vICAgICAgICAgICAgICAgaW5pdCgpO1xuLy8gICAgICAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRTaG91bGRDbGFpbVRoZW1zZWx2ZXNcIikuaGlkZSgpO1xuLy8gICAgICAgICAgICAgICAkKFwiLnB0LWNsYWltYW50U2hvd0lmU3R1ZGVudE92ZXIxNlwiKS5zaG93KCk7XG5cblxuLy8gICAgICAgICAgICAgfSBlbHNlIHsgLy8gdW5kZXIgMTZcbi8vICAgICAgICAgICAgICAgaW5pdCgpO1xuLy8gICAgICAgICAgICAgICAkKFwiLnB0LXNob3dJZkVuZ2FnZWRJbkZ1bGxUaW1lRW1wbG95bWVudFwiKS5zaG93KCk7XG4vLyAgICAgICAgICAgICAgICQoXCIucHQtU3R1ZGVudFJlbGF0aW9uc2hpcFRvVmV0ZXJhblwiKS5zaG93KCk7XG4vLyAgICAgICAgICAgICB9XG5cblxuLy8gICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT12ZXRlcmFuU2lnbmlmaWNhbnRseUluanVyZWRdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9dmV0ZXJhblNpZ25pZmljYW50bHlJbmp1cmVkXTpjaGVja2VkJykudmFsKCkgPT09ICd5ZXMnKSB7XG4vLyAgICAgICAgICAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50VW5kZXIxOFwiKS5zaG93KCk7XG4vLyAgICAgICAgICAgICAgICAgJChcIi5wdC1TdHVkZW50UmVsYXRpb25zaGlwVG9DbGFpbWFudFwiKS5zaG93KCk7XG4vLyAgICAgICAgICAgICAgICAgJChcIi5wdC1hYm91dFlvdVwiKS5zaG93KCk7XG4vLyAgICAgICAgICAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50Tm90RGVwZW5kYW50XCIpLmhpZGUoKTtcbi8vICAgICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRVbmRlcjE4XCIpLmhpZGUoKTtcbi8vICAgICAgICAgICAgICAgICAkKFwiLnB0LWFib3V0WW91XCIpLmhpZGUoKTtcbi8vICAgICAgICAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnROb3REZXBlbmRhbnRcIikuc2hvdygpO1xuLy8gICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuXG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG5cbi8vICAgICAkKFwiI3JlbGF0aW9uc2hpcFRvU3R1ZGVudFwiKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuXG4vLyAgICAgICB2YXIgc2VsZWN0ZWRfb3B0aW9uID0gJCgnI3JlbGF0aW9uc2hpcFRvU3R1ZGVudCcpLnZhbCgpO1xuXG4vLyAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgncmVsYXRpb25zaGlwVHlwZScpO1xuLy8gICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlbGF0aW9uc2hpcFR5cGUnLCBzZWxlY3RlZF9vcHRpb24pO1xuXG4vLyAgICAgICBpZiAoXCJjbGFpbWFudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHtcblxuLy8gICAgICAgICBpZiAoKHNlbGVjdGVkX29wdGlvbiA9PT0gJ2Fkb3B0aXZlLXBhcmVudCcpIHx8IChzZWxlY3RlZF9vcHRpb24gPT09ICdwYXJlbnQnKSkge1xuXG4vLyAgICAgICAgICAgJCgnLnB0LXNob3dJZlJlbGF0aW9uc2hpcFZhbGlkJykuaGlkZSgpO1xuLy8gICAgICAgICAgICQoJyNyZWxhdGlvbnNoaXBUb1N0dWRlbnRPdGhlcicpLmhpZGUoKTtcbi8vICAgICAgICAgICAkKCcucHQtc2hvd0lmU3R1ZGVudERlcGVuZGFudE9uVmV0ZXJhbicpLnNob3coKTtcblxuLy8gICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkX29wdGlvbiA9PT0gJ290aGVyJykge1xuLy8gICAgICAgICAgICQoJyNyZWxhdGlvbnNoaXBUb1N0dWRlbnRPdGhlcicpLnNob3coKTtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAkKCcucHQtc2hvd0lmUmVsYXRpb25zaGlwVmFsaWQnKS5zaG93KCk7XG4vLyAgICAgICAgICAgJCgnI3JlbGF0aW9uc2hpcFRvU3R1ZGVudE90aGVyJykuaGlkZSgpO1xuLy8gICAgICAgICAgICQoJy5wdC1zaG93SWZTdHVkZW50RGVwZW5kYW50T25WZXRlcmFuJykuaGlkZSgpO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIGlmIChzZWxlY3RlZF9vcHRpb24gPT09ICdvdGhlcicpIHtcbi8vICAgICAgICAgICAkKCcjcmVsYXRpb25zaGlwVG9TdHVkZW50T3RoZXInKS5zaG93KCk7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgJCgnI3JlbGF0aW9uc2hpcFRvU3R1ZGVudE90aGVyJykuaGlkZSgpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG5cbi8vICAgICB9KTtcblxuLy8gICAgIC8vIGNvbmZpcm0gc3R1ZGVudCBvciBjbGFpbWFudFxuLy8gICAgICQoJ2lucHV0W25hbWU9Y29uZmlybVN0dWRlbnRPckNsYWltYW50XScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAvLyBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcblxuXG4vLyAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1jb25maXJtU3R1ZGVudE9yQ2xhaW1hbnRdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ2d1YXJkaWFuJykge1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudEZsb3cnKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRGbG93Q29uZmlybWVkJyk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGFpbWFudEZsb3cnLCB0cnVlKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NsYWltYW50Rmxvd0NvbmZpcm1lZCcsIHRydWUpO1xuLy8gICAgICAgICBpbml0KCk7XG5cbi8vICAgICAgICAgJChcIi5wdC1zdHVkZW50LWRvYlwiKS5zaG93KCk7XG5cbi8vICAgICAgICAgaW5pdFN0dWRlbnRzKCk7XG5cbi8vICAgICAgIH0gZWxzZSBpZiAoJCgnaW5wdXRbbmFtZT1jb25maXJtU3R1ZGVudE9yQ2xhaW1hbnRdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3N0dWRlbnQnKSB7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjbGFpbWFudEZsb3dDb25maXJtZWQnKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2NsYWltYW50RmxvdycpO1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudEZsb3cnLCB0cnVlKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRGbG93Q29uZmlybWVkJywgdHJ1ZSk7XG4vLyAgICAgICAgIGluaXQoKTtcbi8vICAgICAgICAgJChcIi5wdC1zdHVkZW50LWRvYlwiKS5oaWRlKCk7XG4vLyAgICAgICAgICQoJy5wdC1zdHVkZW50RnVsbFRpbWUnKS5zaG93KCk7XG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudENvbmZpcm1lZFwiKS5zaG93KCk7XG5cbi8vICAgICAgICAgY29uc29sZS5sb2cobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSk7XG5cbi8vICAgICAgICAgLy8gU2hvdyB3YXJuaW5nIGVsaWdpYmlsaXR5IG1lc3NhZ2UgaWYgc3R1ZGVudCBpcyBvdmVyIDI1LlxuLy8gICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDI0KSB7XG4vLyAgICAgICAgICAgY29uc29sZS5sb2coJ292ZXIgMjUnKTtcbi8vICAgICAgICAgICAkKFwiLnB0LXN0dWRlbnRPdmVyMjVcIikuc2hvdygpO1xuLy8gICAgICAgICAgICQoXCIucHQtc3R1ZGVudFRvb3lvdW5nXCIpLmhpZGUoKTtcbi8vICAgICAgICAgICAkKCcucHQtc3R1ZGVudEZ1bGxUaW1lJykuc2hvdygpO1xuLy8gICAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudENvbmZpcm1lZFwiKS5zaG93KCk7XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICAvLyBTaG93IGVycm9yIG1lc3NhZ2UgaWYgc3R1ZGVudCBpcyB1bmRlciAxNlxuLy8gICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA8IDE2KSB7XG4vLyAgICAgICAgICAgY29uc29sZS5sb2coJ3VuZGVyIDE2Jyk7XG4vLyAgICAgICAgICAgJChcIi5wdC1zdHVkZW50VG9veW91bmdcIikuc2hvdygpO1xuLy8gICAgICAgICAgICQoJy5wdC1zdHVkZW50RnVsbFRpbWUnKS5oaWRlKCk7XG4vLyAgICAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50Q29uZmlybWVkXCIpLmhpZGUoKTtcbi8vICAgICAgICAgICAkKFwiLnBhZ2luYXRpb25cIikuZmluZCgnLmJ0bk5leHQnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgaW5pdFN0dWRlbnRzKCk7XG4vLyAgICAgICB9XG5cbi8vICAgICAgIHJlc2V0Rm9ybSgkKCcjcHQtZm9ybScpKTtcblxuXG5cbi8vICAgICB9KTtcblxuLy8gICAgICQoJ2lucHV0W25hbWU9ZW5nYWdlZEluRnVsbFRpbWVFbXBsb3ltZW50XScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPWVuZ2FnZWRJbkZ1bGxUaW1lRW1wbG95bWVudF06Y2hlY2tlZCcpLnZhbCgpID09PSAneWVzJykge1xuXG4vLyAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICBpZiAoIShcInZldGVyYW5GbG93XCIgaW4gbG9jYWxTdG9yYWdlKSkge1xuXG4vLyAgICAgICAgICAgJCgnLnB0LXNob3dJZkVuZ2FnZWRJbkZ1bGxUaW1lRW1wbG95bWVudCcpLnNob3coKTtcbi8vICAgICAgICAgICBpZiAoIShcImNsYWltYW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkpIHtcbi8vICAgICAgICAgICAgICQoJy5wdC1zaG93SWZSZWxhdGlvbnNoaXBWYWxpZCcpLnNob3coKTtcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH1cbi8vICAgICB9KTtcblxuLy8gICAgIGlmICghKFwic3R1ZGVudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpKSB7XG5cbi8vICAgICB9XG5cbi8vICAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnREZXBlbmRhbnRPblZldGVyYW5dJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnREZXBlbmRhbnRPblZldGVyYW5dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcbi8vICAgICAgICAgJCgnLnB0LXNob3dJZlN0dWRlbnROb3REZXBlbmRhbnQnKS5oaWRlKCk7XG4vLyAgICAgICAgICQoJy5wdC1zaG93SWZTdHVkZW50RGVwZW5kYW50T25WZXRlcmFuJykuc2hvdygpO1xuLy8gICAgICAgfSBlbHNlIHtcblxuLy8gICAgICAgICAkKCcucHQtc2hvd0lmU3R1ZGVudE5vdERlcGVuZGFudCcpLnNob3coKTtcbi8vICAgICAgICAgJCgnLnB0LXNob3dJZlN0dWRlbnREZXBlbmRhbnRPblZldGVyYW4nKS5oaWRlKCk7XG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG5cbi8vICAgfVxuXG5cbi8vICAgLy8gQWxsIHN0dWRlbnQgcGFnZXMgXG4vLyAgIGlmICh3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKFwic3R1ZGVudFwiKSA+IC0xKSB7XG5cbi8vICAgICBjb25zb2xlLmxvZygnQWxsIHN0dWRlbnQgcGFnZXMnKTtcblxuLy8gICAgICQoXCIucHQtc2hvd0lmRG9jdW1lbnRVcGxvYWRTaG9wcGluZ0NhcnRcIikuaGlkZSgpO1xuLy8gICAgICQoXCIucHQtZmluYWwtdG9nZ2xlXCIpLmhpZGUoKTtcblxuXG5cbi8vICAgICAkKCdpbnB1dFtuYW1lPWRvZXNTdHVkZW50SGF2ZVRGTl0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuLy8gICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY3QnKSA9PT0gJ21yY2EnKSB7XG4vLyAgICAgICAgICQoJy5wdC1zaG93SWZNUkNBJykuc2hvdygpO1xuLy8gICAgICAgfVxuXG4vLyAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1kb2VzU3R1ZGVudEhhdmVURk5dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRIYXNURk4nKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRIYXNURk4nLCB0cnVlKTtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50SGFzVEZOJyk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0Zm4nKTtcbi8vICAgICAgIH1cbi8vICAgICB9KTtcblxuXG5cbi8vICAgICAkKFwiLnVwbG9hZC1saXN0XCIpLnNob3coKTtcbi8vICAgfVxuXG4vLyAgIC8vIFBhZ2UgMVxuLy8gICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSBcIi9hdXRoL2NsYWltL3N0dWRlbnRjbGFpbTFcIikge1xuXG4vLyAgICAgaW5pdFN0dWRlbnRzKCk7XG4vLyAgICAgaW5pdEZsb3coKTtcblxuLy8gICAgICQoXCIucHQtc3R1ZGVudEFnZS0tbWF0dXJlXCIpLmhpZGUoKTtcbi8vICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRMaXZpbmdBdEhvbWVcIikuaGlkZSgpO1xuLy8gICAgICQoXCIucHQtc3R1ZGVudExpdmluZ1NhbWVBZGRyZXNzXCIpLmhpZGUoKTtcbi8vICAgICAkKFwiLnB0LXN0dWRlbnRMaXZpbmdXaXRoUGFydG5lckxlc3NSYXRlXCIpLmhpZGUoKTtcbi8vICAgICAkKFwiLnB0LXNob3dMaXZpbmdMb2NhdGlvblwiKS5oaWRlKCk7XG4vLyAgICAgJChcIi51cGxvYWQtbGlzdFwiKS5zaG93KCk7XG4vLyAgICAgJChcIi5wdC1zaG93SWZMaXZpbmdBd2F5RnJvbUhvbWVcIikuaGlkZSgpO1xuLy8gICAgICQoXCIucHQtc2hvd0lmRG9jdW1lbnRVcGxvYWRTaG9wcGluZ0NhcnRcIikuaGlkZSgpO1xuLy8gICAgICQoXCIucHQtcGFydG5lcmVkUmVsYXRpb25zaGlwXCIpLmhpZGUoKTtcbi8vICAgICAkKFwiLnB0LWxpdmluZ1dpdGhQYXJ0bmVyXCIpLmhpZGUoKTtcblxuLy8gICAgIC8vIGlmICh0cnVlKSB7XG4vLyAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPiAxNSkge1xuXG4vLyAgICAgICBpZiAoXCJzdHVkZW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xuLy8gICAgICAgICAkKFwiLnB0LXN0dWRlbnRBZ2UtLW1hdHVyZVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICBpZiAoJCh0aGlzKS5pcyhcIi5wdC1mbG93LS1zdHVkZW50XCIpKSB7XG4vLyAgICAgICAgICAgICAkKHRoaXMpLnNob3coXCJmYXN0XCIpO1xuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgfSk7XG4vLyAgICAgICB9XG5cbi8vICAgICAgIGlmIChcInZldGVyYW5GbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XG4vLyAgICAgICAgICQoXCIucHQtc3R1ZGVudEFnZS0tbWF0dXJlXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiLnB0LWZsb3ctLXZldGVyYW5cIikpIHtcbi8vICAgICAgICAgICAgICQodGhpcykuc2hvdyhcImZhc3RcIik7XG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICB9KTtcbi8vICAgICAgIH1cblxuLy8gICAgICAgaWYgKFwiY2xhaW1hbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XG4vLyAgICAgICAgICQoXCIucHQtc3R1ZGVudEFnZS0tbWF0dXJlXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgIGlmICgkKHRoaXMpLmlzKFwiLnB0LWZsb3ctLWNsYWltYW50XCIpKSB7XG4vLyAgICAgICAgICAgICAkKHRoaXMpLnNob3coXCJmYXN0XCIpO1xuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgfSk7XG4vLyAgICAgICB9XG5cblxuLy8gICAgICAgJChcIiN2ZXRlcmFuTmFtZUZpcnN0XCIpLmZvY3Vzb3V0KGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgaWYgKCQodGhpcykudmFsKCkpIHtcbi8vICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndmV0ZXJhbk5hbWVGaXJzdCcpO1xuLy8gICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd2ZXRlcmFuTmFtZUZpcnN0JywgJCh0aGlzKS52YWwoKSk7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3ZldGVyYW5OYW1lRmlyc3QnKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfSk7XG5cbi8vICAgICAgICQoXCIjdmV0ZXJhbk5hbWVMYXN0XCIpLmZvY3Vzb3V0KGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgaWYgKCQodGhpcykudmFsKCkpIHtcbi8vICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndmV0ZXJhbk5hbWVMYXN0Jyk7XG4vLyAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ZldGVyYW5OYW1lTGFzdCcsICQodGhpcykudmFsKCkpO1xuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd2ZXRlcmFuTmFtZUxhc3QnKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfSk7XG5cblxuXG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgICQoXCIucHQtc3R1ZGVudEFnZS0tbWF0dXJlXCIpLmhpZGUoXCJzbG93XCIpO1xuLy8gICAgIH1cblxuLy8gICAgICQoXCIucHQtcGFydG5lcmVkUmVsYXRpb25zaGlwXCIpLmhpZGUoKTtcblxuLy8gICAgIC8vIGV4dHJhIGRldGFpbHMgZm9yIHN0dWRlbnRzIFxuLy8gICAgIGlmICgoXCJzdHVkZW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkgfHwgXCJjbGFpbWFudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHtcbi8vICAgICAgICQoJy5idG5OZXh0JykucHJvcCgnb25jbGljaycsIG51bGwpO1xuLy8gICAgICAgJCgnLmJ0bk5leHQnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hdXRoL2NsYWltL3N0dWRlbnRjbGFpbTFhJztcbi8vICAgICAgIH0pO1xuLy8gICAgIH1cblxuXG4vLyAgICAgJCgnaW5wdXRbbmFtZT1nZW5kZXJdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudEFnZScpID4gMTUpIHtcbi8vICAgICAgICAgJChcIi5wdC1wYXJ0bmVyZWRSZWxhdGlvbnNoaXBcIikuc2hvdygpO1xuLy8gICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgJChcIi5wdC1zaG93TGl2aW5nTG9jYXRpb25cIikuc2hvdygpO1xuLy8gICAgICAgfVxuLy8gICAgIH0pO1xuXG4vLyAgICAgJChcIiNmaXJzdE5hbWVcIikuZm9jdXNvdXQoZnVuY3Rpb24gKCkge1xuLy8gICAgICAgaWYgKCQodGhpcykudmFsKCkpIHtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnROYW1lRmlyc3QnKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnROYW1lRmlyc3QnLCAkKHRoaXMpLnZhbCgpKTtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TmFtZUZpcnN0Jyk7XG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG5cbi8vICAgICAkKFwiI2xhc3ROYW1lXCIpLmZvY3Vzb3V0KGZ1bmN0aW9uICgpIHtcbi8vICAgICAgIGlmICgkKHRoaXMpLnZhbCgpKSB7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TmFtZUxhc3QnKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnROYW1lTGFzdCcsICQodGhpcykudmFsKCkpO1xuLy8gICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnROYW1lTGFzdCcpO1xuLy8gICAgICAgfVxuLy8gICAgIH0pO1xuXG5cblxuLy8gICAgICQoJ2lucHV0W25hbWU9c3R1ZGVudExpdmluZ0xvY2F0aW9uXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcbi8vICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nLCAkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdMb2NhdGlvbl06Y2hlY2tlZCcpLnZhbCgpKTtcblxuLy8gICAgICAgaWYgKCQoJ2lucHV0W25hbWU9c3R1ZGVudExpdmluZ0xvY2F0aW9uXTpjaGVja2VkJykudmFsKCkgPT09ICdob21lbGVzcycpIHtcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZMaXZpbmdBd2F5XCIpLmhpZGUoKTtcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZOb1BhcnRuZXJcIikuaGlkZSgpO1xuLy8gICAgICAgICAkKFwiLnB0LWxpdmluZ1dpdGhQYXJ0bmVyXCIpLmhpZGUoKTtcbi8vICAgICAgICAgJChcInB0LWZpbmFsLXRvZ2dsZVwiKS5oaWRlKCk7XG5cbi8vICAgICAgICAgLy8gc2tpcCB0aGUgbGl2aW5nIGFycmFuZ2VtZW50IGRldGFpbHMgXG4vLyAgICAgICAgICQoJy5idG5OZXh0JykucHJvcCgnb25jbGljaycsIG51bGwpO1xuLy8gICAgICAgICAkKCcuYnRuTmV4dCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbi8vICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYXV0aC9jbGFpbS9zdHVkZW50Y2xhaW0zJztcbi8vICAgICAgICAgfSk7XG4vLyAgICAgICB9IGVsc2Uge1xuXG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmTGl2aW5nQXdheVwiKS5zaG93KCdmYXN0Jyk7XG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmTm9QYXJ0bmVyXCIpLmhpZGUoKTtcbi8vICAgICAgICAgJChcInB0LWZpbmFsLXRvZ2dsZVwiKS5oaWRlKCk7XG4vLyAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudFBhcnRuZXJlZFJlbGF0aW9uc2hpcCcpID09PSAnbm8nKSB7XG4vLyAgICAgICAgICAgJChcIi5wdC1zaG93SWZOb1BhcnRuZXJcIikuc2hvdygpO1xuLy8gICAgICAgICAgICQoXCIucHQtbGl2aW5nV2l0aFBhcnRuZXJcIikuaGlkZSgpO1xuXG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgfVxuXG4vLyAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nTG9jYXRpb25dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ2F3YXktZnJvbS1ob21lJykge1xuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZkxpdmluZ0F3YXlGcm9tSG9tZVwiKS5zaG93KCk7XG4vLyAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZkxpdmluZ0F3YXlGcm9tSG9tZVwiKS5oaWRlKCk7XG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG5cblxuLy8gICAgICQoJ2lucHV0W25hbWU9c3R1ZGVudExpdmluZ1dpdGhQYXJ0bmVyXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4vLyAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nV2l0aFBhcnRuZXJdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcblxuLy8gICAgICAgICAkKFwiLnB0LXN0dWRlbnRMaXZpbmdXaXRoUGFydG5lckxlc3NSYXRlXCIpLnNob3coKTtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICQoXCIucHQtc3R1ZGVudExpdmluZ1dpdGhQYXJ0bmVyTGVzc1JhdGVcIikuaGlkZSgpO1xuLy8gICAgICAgfVxuLy8gICAgIH0pO1xuXG5cbi8vICAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnRQYXJ0bmVyZWRSZWxhdGlvbnNoaXBdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICQoXCIucHQtc2hvd0xpdmluZ0xvY2F0aW9uXCIpLnNob3coKTtcbi8vICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRQYXJ0bmVyZWRSZWxhdGlvbnNoaXBdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRQYXJ0bmVyZWRSZWxhdGlvbnNoaXAnKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRQYXJ0bmVyZWRSZWxhdGlvbnNoaXAnLCAneWVzJyk7XG4vLyAgICAgICAgICQoXCIucHQtc3R1ZGVudExpdmluZ1NhbWVBZGRyZXNzXCIpLnNob3coKTtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50UGFydG5lcmVkUmVsYXRpb25zaGlwJyk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50UGFydG5lcmVkUmVsYXRpb25zaGlwJywgJ25vJyk7XG4vLyAgICAgICAgICQoXCIucHQtc3R1ZGVudExpdmluZ1NhbWVBZGRyZXNzXCIpLmhpZGUoKTtcbi8vICAgICAgIH1cbi8vICAgICB9KTtcblxuXG4vLyAgICAgJChcIiNyZWxhdGlvbnNoaXBUb1ZldGVyYW5cIikuY2hhbmdlKGZ1bmN0aW9uICgpIHtcblxuLy8gICAgICAgdmFyIHNlbGVjdGVkX29wdGlvbiA9ICQoJyNyZWxhdGlvbnNoaXBUb1ZldGVyYW4nKS52YWwoKTtcblxuLy8gICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3JlbGF0aW9uc2hpcFR5cGUnKTtcbi8vICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZWxhdGlvbnNoaXBUeXBlJywgc2VsZWN0ZWRfb3B0aW9uKTtcblxuLy8gICAgICAgaWYgKHNlbGVjdGVkX29wdGlvbiA9PT0gJ290aGVyJykge1xuLy8gICAgICAgICAkKCcjcmVsYXRpb25zaGlwVG9WZXRlcmFuT3RoZXInKS5zaG93KFwiZmFzdFwiKTtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICQoJyNyZWxhdGlvbnNoaXBUb1ZldGVyYW5PdGhlcicpLmhpZGUoXCJzbG93XCIpO1xuLy8gICAgICAgfVxuLy8gICAgIH0pO1xuXG5cbi8vICAgICAkKFwiI3ZldGVyYW5SZWxhdGlvbnNoaXBUb1N0dWRlbnRcIikuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgIHZhciBzZWxlY3RlZF9vcHRpb24gPSAkKCcjdmV0ZXJhblJlbGF0aW9uc2hpcFRvU3R1ZGVudCcpLnZhbCgpO1xuLy8gICAgICAgaWYgKHNlbGVjdGVkX29wdGlvbiA9PT0gJ290aGVyJykge1xuLy8gICAgICAgICAkKCcjdmV0ZXJhblJlbGF0aW9uc2hpcFRvU3R1ZGVudE90aGVyJykuc2hvdyhcImZhc3RcIik7XG4vLyAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAkKCcjdmV0ZXJhblJlbGF0aW9uc2hpcFRvU3R1ZGVudE90aGVyJykuaGlkZShcInNsb3dcIik7XG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG5cbi8vICAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb25dJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcblxuLy8gICAgICAgaWYgKCQoJ2lucHV0W25hbWU9c3R1ZGVudExpdmluZ0F3YXlWYWxpZFJlYXNvbl06Y2hlY2tlZCcpLnZhbCgpID09PSAneWVzJyAmJlxuLy8gICAgICAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnRQYXJ0bmVyZWRSZWxhdGlvbnNoaXBdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcbi8vICAgICAgICAgJChcIi5wdC1saXZpbmdXaXRoUGFydG5lclwiKS5zaG93KCk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nQXdheVZhbGlkUmVhc29uJyk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdMb2NhdGlvbicsICdhd2F5LWZyb20taG9tZScpO1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0F3YXlWYWxpZFJlYXNvbicsIHRydWUpO1xuLy8gICAgICAgfSBlbHNlIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb25dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb24nKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMaXZpbmdMb2NhdGlvbicpO1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJywgJ2F3YXktZnJvbS1ob21lJyk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TGl2aW5nQXdheVZhbGlkUmVhc29uJywgdHJ1ZSk7XG4vLyAgICAgICAgICQoXCIucHQtZmluYWwtdG9nZ2xlXCIpLnNob3coKTtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nQXdheVZhbGlkUmVhc29uJyk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdMb2NhdGlvbicsICdhdC1ob21lJyk7XG4vLyAgICAgICAgICQoXCIucHQtbGl2aW5nV2l0aFBhcnRuZXJcIikuaGlkZSgpO1xuLy8gICAgICAgICAkKFwiLnB0LWZpbmFsLXRvZ2dsZVwiKS5zaG93KCk7XG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG5cblxuXG5cbi8vICAgICAkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdXaXRoUGFydG5lcl0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuLy8gICAgICAgJChcIi5wdC1maW5hbC10b2dnbGVcIikuc2hvdygpO1xuLy8gICAgICAgaWYgKCQoJ2lucHV0W25hbWU9c3R1ZGVudExpdmluZ1dpdGhQYXJ0bmVyXTpjaGVja2VkJykudmFsKCkgPT09ICd5ZXMnKSB7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nV2l0aFBhcnRuZXInKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdXaXRoUGFydG5lcicsICd5ZXMnKTtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nV2l0aFBhcnRuZXInKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdXaXRoUGFydG5lcicsICdubycpO1xuLy8gICAgICAgfVxuLy8gICAgIH0pO1xuXG4vLyAgIH1cblxuLy8gICAvLyBQYWdlIDFhXG4vLyAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09IFwiL2F1dGgvY2xhaW0vc3R1ZGVudGNsYWltMWFcIikge1xuLy8gICAgIGluaXRTdHVkZW50cygpO1xuLy8gICAgIGluaXRGbG93KCk7XG5cbi8vICAgICAkKFwiLnB0LXNob3dMaXZpbmdMb2NhdGlvblwiKS5oaWRlKCk7XG4vLyAgICAgJChcIi5wdC1zaG93SWZMaXZpbmdBd2F5RnJvbUhvbWVcIikuaGlkZSgpO1xuLy8gICAgICQoXCIucHQtbGl2aW5nV2l0aFBhcnRuZXJcIikuaGlkZSgpO1xuLy8gICAgIGlmIChcImNsYWltYW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xuLy8gICAgICAgJChcIi5wdC1wYXJ0bmVyZWRSZWxhdGlvbnNoaXBcIikuaGlkZSgpO1xuLy8gICAgIH1cblxuLy8gICAgICQoXCIjZmlyc3ROYW1lXCIpLmZvY3Vzb3V0KGZ1bmN0aW9uICgpIHtcbi8vICAgICAgIGlmICgkKHRoaXMpLnZhbCgpKSB7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TmFtZUZpcnN0Jyk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TmFtZUZpcnN0JywgJCh0aGlzKS52YWwoKSk7XG4vLyAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudE5hbWVGaXJzdCcpO1xuLy8gICAgICAgfVxuLy8gICAgIH0pO1xuXG4vLyAgICAgJChcIiNsYXN0TmFtZVwiKS5mb2N1c291dChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICBpZiAoJCh0aGlzKS52YWwoKSkge1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudE5hbWVMYXN0Jyk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TmFtZUxhc3QnLCAkKHRoaXMpLnZhbCgpKTtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TmFtZUxhc3QnKTtcbi8vICAgICAgIH1cbi8vICAgICB9KTtcblxuLy8gICAgICQoJ2lucHV0W25hbWU9Z2VuZGVyXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4vLyAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDE1KSB7XG4vLyAgICAgICAgICQoXCIucHQtcGFydG5lcmVkUmVsYXRpb25zaGlwXCIpLnNob3coKTtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICQoXCIucHQtc2hvd0xpdmluZ0xvY2F0aW9uXCIpLnNob3coKTtcbi8vICAgICAgIH1cbi8vICAgICB9KTtcblxuLy8gICAgICQoJ2lucHV0W25hbWU9c3R1ZGVudFBhcnRuZXJlZFJlbGF0aW9uc2hpcF0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuLy8gICAgICAgJChcIi5wdC1zaG93TGl2aW5nTG9jYXRpb25cIikuc2hvdygpO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nTG9jYXRpb25dJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdMb2NhdGlvbl06Y2hlY2tlZCcpLnZhbCgpID09PSAnaG9tZWxlc3MnKSB7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdMb2NhdGlvbicsICdob21lbGVzcycpO1xuLy8gICAgICAgICAkKFwiLnB0LWZpbmFsLXRvZ2dsZVwiKS5oaWRlKCk7XG4vLyAgICAgICAgICQoXCIucHQtbGl2aW5nV2l0aFBhcnRuZXJcIikuaGlkZSgpO1xuLy8gICAgICAgfSBlbHNlIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdMb2NhdGlvbl06Y2hlY2tlZCcpLnZhbCgpID09PSAnYXQtaG9tZScpIHtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMaXZpbmdMb2NhdGlvbicpO1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJywgJ2F0LWhvbWUnKTtcbi8vICAgICAgICAgJChcIi5wdC1saXZpbmdXaXRoUGFydG5lclwiKS5oaWRlKCk7XG4vLyAgICAgICAgICQoXCIucHQtZmluYWwtdG9nZ2xlXCIpLmhpZGUoKTtcbi8vICAgICAgIH0gZWxzZSBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nTG9jYXRpb25dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ2F3YXktZnJvbS1ob21lJykge1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJyk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nLCAnYXdheS1mcm9tLWhvbWUnKTtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nKTtcbi8vICAgICAgIH1cblxuLy8gICAgICAgaWYgKCQoJ2lucHV0W25hbWU9c3R1ZGVudExpdmluZ0xvY2F0aW9uXTpjaGVja2VkJykudmFsKCkgPT09ICdhd2F5LWZyb20taG9tZScpIHtcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZMaXZpbmdBd2F5RnJvbUhvbWVcIikuc2hvdygpO1xuLy8gICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZMaXZpbmdBd2F5RnJvbUhvbWVcIikuaGlkZSgpO1xuLy8gICAgICAgfVxuXG4vLyAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nTG9jYXRpb25dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ2hvbWVsZXNzJykge1xuLy8gICAgICAgICAvLyBza2lwIHRoZSBsaXZpbmcgYXJyYW5nZW1lbnQgZGV0YWlscyBcbi8vICAgICAgICAgJCgnLmJ0bk5leHQnKS5wcm9wKCdvbmNsaWNrJywgbnVsbCk7XG4vLyAgICAgICAgICQoJy5idG5OZXh0JykuY2xpY2soZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hdXRoL2NsYWltL3N0dWRlbnRjbGFpbTMnO1xuLy8gICAgICAgICB9KTtcbi8vICAgICAgIH0gZWxzZSBpZiAoKCQoJ2lucHV0W25hbWU9c3R1ZGVudExpdmluZ0xvY2F0aW9uXTpjaGVja2VkJykudmFsKCkgPT09ICdhdC1ob21lJykpIHtcbi8vICAgICAgICAgaWYgKFwic3R1ZGVudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHtcbi8vICAgICAgICAgICAvLyBza2lwIHRoZSBsaXZpbmcgYXJyYW5nZW1lbnQgZGV0YWlscyBcbi8vICAgICAgICAgICAkKCcuYnRuTmV4dCcpLnByb3AoJ29uY2xpY2snLCBudWxsKTtcbi8vICAgICAgICAgICAkKCcuYnRuTmV4dCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hdXRoL2NsYWltL3N0dWRlbnRjbGFpbTMnO1xuLy8gICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICQoJy5idG5OZXh0JykucHJvcCgnb25jbGljaycsIG51bGwpO1xuLy8gICAgICAgICAgICQoJy5idG5OZXh0JykuY2xpY2soZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2F1dGgvY2xhaW0vc3R1ZGVudGNsYWltMic7XG4vLyAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICQoJy5idG5OZXh0JykucHJvcCgnb25jbGljaycsIG51bGwpO1xuLy8gICAgICAgICAkKCcuYnRuTmV4dCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvYXV0aC9jbGFpbS9zdHVkZW50Y2xhaW0yJztcbi8vICAgICAgICAgfSk7XG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG5cblxuLy8gICAgICQoJ2lucHV0W25hbWU9c3R1ZGVudExpdmluZ0F3YXlWYWxpZFJlYXNvbl0nKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuXG4vLyAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nQXdheVZhbGlkUmVhc29uXTpjaGVja2VkJykudmFsKCkgPT09ICd5ZXMnICYmXG4vLyAgICAgICAgICQoJ2lucHV0W25hbWU9c3R1ZGVudFBhcnRuZXJlZFJlbGF0aW9uc2hpcF06Y2hlY2tlZCcpLnZhbCgpID09PSAneWVzJykge1xuLy8gICAgICAgICAkKFwiLnB0LWxpdmluZ1dpdGhQYXJ0bmVyXCIpLnNob3coKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb24nKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMaXZpbmdMb2NhdGlvbicpO1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJywgJ2F3YXktZnJvbS1ob21lJyk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TGl2aW5nQXdheVZhbGlkUmVhc29uJywgdHJ1ZSk7XG4vLyAgICAgICB9IGVsc2UgaWYgKCQoJ2lucHV0W25hbWU9c3R1ZGVudExpdmluZ0F3YXlWYWxpZFJlYXNvbl06Y2hlY2tlZCcpLnZhbCgpID09PSAneWVzJykge1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ0F3YXlWYWxpZFJlYXNvbicpO1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJyk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TGl2aW5nTG9jYXRpb24nLCAnYXdheS1mcm9tLWhvbWUnKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb24nLCB0cnVlKTtcbi8vICAgICAgICAgJChcIi5wdC1maW5hbC10b2dnbGVcIikuc2hvdygpO1xuLy8gICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMaXZpbmdBd2F5VmFsaWRSZWFzb24nKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMaXZpbmdMb2NhdGlvbicpO1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJywgJ2F0LWhvbWUnKTtcbi8vICAgICAgICAgJChcIi5wdC1saXZpbmdXaXRoUGFydG5lclwiKS5oaWRlKCk7XG4vLyAgICAgICAgICQoXCIucHQtZmluYWwtdG9nZ2xlXCIpLnNob3coKTtcbi8vICAgICAgIH1cbi8vICAgICB9KTtcblxuXG4vLyAgICAgJCgnaW5wdXRbbmFtZT1zdHVkZW50UGFydG5lcmVkUmVsYXRpb25zaGlwXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAgICQoXCIucHQtc2hvd0xpdmluZ0xvY2F0aW9uXCIpLnNob3coKTtcblxuLy8gICAgICAgaWYgKCQoJ2lucHV0W25hbWU9c3R1ZGVudFBhcnRuZXJlZFJlbGF0aW9uc2hpcF06Y2hlY2tlZCcpLnZhbCgpID09PSAneWVzJykge1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudFBhcnRuZXJlZFJlbGF0aW9uc2hpcCcpO1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudFBhcnRuZXJlZFJlbGF0aW9uc2hpcCcsICd5ZXMnKTtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50UGFydG5lcmVkUmVsYXRpb25zaGlwJyk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50UGFydG5lcmVkUmVsYXRpb25zaGlwJywgJ25vJyk7XG4vLyAgICAgICAgICQoXCIucHQtc3R1ZGVudExpdmluZ1NhbWVBZGRyZXNzXCIpLmhpZGUoKTtcbi8vICAgICAgIH1cbi8vICAgICB9KTtcblxuXG4vLyAgICAgJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nV2l0aFBhcnRuZXJdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICQoXCIucHQtZmluYWwtdG9nZ2xlXCIpLnNob3coKTtcbi8vICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdXaXRoUGFydG5lcl06Y2hlY2tlZCcpLnZhbCgpID09PSAneWVzJykge1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ1dpdGhQYXJ0bmVyJyk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TGl2aW5nV2l0aFBhcnRuZXInLCAneWVzJyk7XG4vLyAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ1dpdGhQYXJ0bmVyJyk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TGl2aW5nV2l0aFBhcnRuZXInLCAnbm8nKTtcbi8vICAgICAgIH1cbi8vICAgICB9KTtcblxuXG4vLyAgIH1cblxuXG4vLyAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09IFwiL2F1dGgvY2xhaW0vc3R1ZGVudGNsYWltMlwiKSB7XG4vLyAgICAgLy8gUGFnZSAyIFxuLy8gICAgIGluaXRTdHVkZW50cygpO1xuLy8gICAgIGluaXRGbG93KCk7XG4vLyAgICAgJChcIi5wdC1zaG93SWZIb21lbGVzc1wiKS5oaWRlKCk7XG4vLyAgICAgJChcIi5wdC1zaG93SWZSZXF1aXJlUmVudEFzc2lzdGFuY2VcIikuaGlkZSgpO1xuLy8gICAgICQoXCIucHQtc2hvd0lmUmVudGluZ1wiKS5oaWRlKCk7XG4vLyAgICAgJChcIi5wdC1zaG93SWZOb3RSZW50TGFuZExvcmRcIikuaGlkZSgpO1xuLy8gICAgICQoXCIucHQtcmVudFBheWVkXCIpLmhpZGUoKTtcbi8vICAgICAkKFwiLnB0LXNob3dJZkFkZGl0aW9uYWxBZGRyZXNzXCIpLmhpZGUoKTtcbi8vICAgICAkKFwiLnB0LXNob3dJZkxpdmluZ0F3YXlcIikuaGlkZSgpO1xuLy8gICAgICQoXCIucHQtc2hvd0lmQm9hcmRpbmdcIikuaGlkZSgpO1xuLy8gICAgICQoXCIucHQtYm9hcmRQYWlkXCIpLmhpZGUoKTtcbi8vICAgICAkKFwiLnB0LXNob3dJZk90aGVyXCIpLmhpZGUoKTtcblxuXG4vLyAgICAgaWYgKChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJykgPT09ICdhdC1ob21lJykgfHxcbi8vICAgICAgIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudExpdmluZ1dpdGhQYXJ0bmVyJykgPT09ICd5ZXMnKSB8fFxuLy8gICAgICAgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPCAxNikpIHtcbi8vICAgICAgICQoXCIucHQtc2hvd0lmTGl2aW5nQXdheVwiKS5oaWRlKCk7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgICQoXCIucHQtc2hvd0lmTGl2aW5nQXdheVwiKS5zaG93KCk7XG4vLyAgICAgfVxuXG4vLyAgICAgJChcIiNzdHVkeUF3YXlGcm9tSG9tZUV4cGxhbmF0aW9uXCIpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4vLyAgICAgICB2YXIgc2VsZWN0ZWRfb3B0aW9uID0gJCgnI3N0dWR5QXdheUZyb21Ib21lRXhwbGFuYXRpb24nKS52YWwoKTtcbi8vICAgICAgIGlmIChzZWxlY3RlZF9vcHRpb24gPT09ICdob21lbGVzcycpIHtcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZIb21lbGVzc1wiKS5zaG93KCdmYXN0Jyk7XG4vLyAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZkhvbWVsZXNzXCIpLmhpZGUoKTtcbi8vICAgICAgIH1cbi8vICAgICB9KTtcblxuXG4vLyAgICAgJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nQXJyYW5nZW1lbnRdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPXN0dWRlbnRMaXZpbmdBcnJhbmdlbWVudF06Y2hlY2tlZCcpLnZhbCgpID09PSAncmVudGluZycpIHtcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZSZXF1aXJlUmVudEFzc2lzdGFuY2VcIikuc2hvdygpO1xuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZlJlbnRpbmdcIikuc2hvdygnZmFzdCcpO1xuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZkJvYXJkaW5nXCIpLmhpZGUoKTtcbi8vICAgICAgICAgJChcIi5wdC1ib2FyZFBhaWRcIikuaGlkZSgpO1xuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZk90aGVyXCIpLmhpZGUoKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMaXZpbmdBcnJhbmdlbWVudCcpO1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExpdmluZ0FycmFuZ2VtZW50JywgJ3JlbnRpbmcnKTtcbi8vICAgICAgIH0gZWxzZSBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nQXJyYW5nZW1lbnRdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ2JvYXJkaW5nJykge1xuLy8gICAgICAgICAkKFwiLnB0LWJvYXJkUGFpZFwiKS5zaG93KCk7XG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmQm9hcmRpbmdcIikuc2hvdygnZmFzdCcpO1xuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZlJlbnRpbmdcIikuaGlkZSgpO1xuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZk90aGVyXCIpLmhpZGUoKTtcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZSZXF1aXJlUmVudEFzc2lzdGFuY2VcIikuaGlkZSgpO1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ0FycmFuZ2VtZW50Jyk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TGl2aW5nQXJyYW5nZW1lbnQnLCAnYm9hcmRpbmcnKTtcbi8vICAgICAgIH0gZWxzZSBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkZW50TGl2aW5nQXJyYW5nZW1lbnRdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ290aGVyJykge1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExpdmluZ0FycmFuZ2VtZW50Jyk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TGl2aW5nQXJyYW5nZW1lbnQnLCAnb3RoZXInKTtcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZPdGhlclwiKS5zaG93KCk7XG4vLyAgICAgICAgICQoXCIucHQtYm9hcmRQYWlkXCIpLmhpZGUoKTtcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZCb2FyZGluZ1wiKS5oaWRlKCk7XG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmUmVudGluZ1wiKS5oaWRlKCk7XG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmUmVxdWlyZVJlbnRBc3Npc3RhbmNlXCIpLmhpZGUoKTtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGl2aW5nQXJyYW5nZW1lbnQnKTtcbi8vICAgICAgIH1cbi8vICAgICB9KTtcblxuXG5cbi8vICAgICAkKCdpbnB1dFtuYW1lPXNoYXJpbmdSZXNpZGVuY2VdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcblxuLy8gICAgICAgJChcIi5wdC1yZW50UGF5ZWRcIikuc2hvdygpO1xuXG4vLyAgICAgfSk7XG5cblxuLy8gICAgICQoJ2lucHV0W25hbWU9c2FtZUFzUG9zdGFsXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAgIGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmQWRkaXRpb25hbEFkZHJlc3NcIikuaGlkZSgpO1xuLy8gICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZBZGRpdGlvbmFsQWRkcmVzc1wiKS5zaG93KCk7XG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG5cbi8vICAgfVxuXG4vLyAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09IFwiL2F1dGgvY2xhaW0vc3R1ZGVudGNsYWltM1wiKSB7XG4vLyAgICAgLy8gcGFnZSAzXG4vLyAgICAgaW5pdFN0dWRlbnRzKCk7XG4vLyAgICAgaW5pdEZsb3coKTtcbi8vICAgICAkKFwiLnB0LXNob3dJZk5vdFByaW1hcnlTdHVkZW50XCIpLmhpZGUoKTtcbi8vICAgICAkKFwiLnB0LXNob3dJZlByaW1hcnlcIikuaGlkZSgpO1xuLy8gICAgICQoXCIucHQtc2hvd0lmU2Vjb25kYXJ5XCIpLmhpZGUoKTtcbi8vICAgICAkKFwiLnB0LXNob3dJZlRlcnRpYXJ5XCIpLmhpZGUoKTtcbi8vICAgICAkKFwiLnB0LXNob3dJZlBhcnRUaW1lXCIpLmhpZGUoKTtcbi8vICAgICAkKFwiLnB0LW5vTG9uZ2VyRWxpZ2libGVcIikuaGlkZSgpO1xuLy8gICAgICQoXCIucHQtbm9Mb25nZXJFbGlnaWJsZVR3b1wiKS5oaWRlKCk7XG4vLyAgICAgJChcIi5wdC1zaG93SWZTdHVkeUxvYWROb3RBbnN3ZXJlZFwiKS5oaWRlKCk7XG4vLyAgICAgJChcIi5wdC1zaG93SWZFbnJvbGxlZFwiKS5oaWRlKCk7XG4vLyAgICAgJChcIi5wdC1lbnJvbGxTdGF0dXNTdHVkZW50T3ZlcjI1XCIpLmhpZGUoKTtcbi8vICAgICAvLyAkKFwiLnB0LWVucm9sbERhdGVzdHVkZW50T3ZlcjI1XCIpLmhpZGUoKTtcblxuXG5cbi8vICAgICAvLyBza2lwIHRoZSBmaW5hbmNpYWwgZGV0YWlscyBpZiB3ZSdyZSBpbiB2ZXRlcmFuIGZsb3dcbi8vICAgICAvLyBpZiAoXCJ2ZXRlcmFuRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xuLy8gICAgIC8vICAgJCgnLmJ0bk5leHQnKS5wcm9wKCdvbmNsaWNrJywgbnVsbCk7XG4vLyAgICAgLy8gICAkKCcuYnRuTmV4dCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbi8vICAgICAvLyAgICAgLy8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4vLyAgICAgLy8gICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9zdHVkZW50Y2xhaW11cGxvYWQnO1xuLy8gICAgIC8vICAgfSlcbi8vICAgICAvLyB9XG5cblxuLy8gICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudExldmVsT2ZTdHVkeScpICE9PSAncHJpbWFyeScpIHtcbi8vICAgICAgICQoXCIucHQtc2hvd0lmTm90UHJpbWFyeVN0dWRlbnRcIikuc2hvdygnZmFzdCcpO1xuLy8gICAgIH1cblxuLy8gICAgICQoXCIjc3R1ZGVudExldmVsT2ZTdHVkeVwiKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuLy8gICAgICAgdmFyIHNlbGVjdGVkX29wdGlvbiA9ICQoJyNzdHVkZW50TGV2ZWxPZlN0dWR5JykudmFsKCk7XG5cbi8vICAgICAgIHZhciBncmFkZV9vcHRpb25zO1xuXG4vLyAgICAgICBpZiAoc2VsZWN0ZWRfb3B0aW9uID09PSAncHJpbWFyeScpIHtcbi8vICAgICAgICAgJChcIi5wdC1ub0xvbmdlckVsaWdpYmxlXCIpLmhpZGUoKTtcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZTZWNvbmRhcnlcIikuaGlkZSgpO1xuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZlRlcnRpYXJ5XCIpLmhpZGUoKTtcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZQcmltYXJ5XCIpLnNob3coJ2Zhc3QnKTtcblxuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExldmVsT2ZTdHVkeScpO1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3R1ZGVudExldmVsT2ZTdHVkeScsICdwcmltYXJ5Jyk7XG4vLyAgICAgICAgICQoXCIucGFnaW5hdGlvblwiKS5maW5kKCdidXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblxuLy8gICAgICAgfSBlbHNlIGlmIChzZWxlY3RlZF9vcHRpb24uc3RhcnRzV2l0aCgnc2Vjb25kYXJ5JykpIHtcblxuLy8gICAgICAgICAkKFwiLnB0LW5vTG9uZ2VyRWxpZ2libGVcIikuaGlkZSgpO1xuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZlRlcnRpYXJ5XCIpLmhpZGUoKTtcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZQcmltYXJ5XCIpLmhpZGUoKTtcblxuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZlNlY29uZGFyeVwiKS5zaG93KCk7XG5cbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0dWRlbnRMZXZlbE9mU3R1ZHknKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMZXZlbE9mU3R1ZHknLCAnc2Vjb25kYXJ5Jyk7XG5cbi8vICAgICAgICAgJChcIi5wYWdpbmF0aW9uXCIpLmZpbmQoJ2J1dHRvbicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuLy8gICAgICAgfSBlbHNlIGlmICgoc2VsZWN0ZWRfb3B0aW9uLnN0YXJ0c1dpdGgoJ3RlcnRpYXJ5JykpIHx8IChzZWxlY3RlZF9vcHRpb24gPT09ICdhcHByZW50aWNlc2hpcCcpKSB7XG4vLyAgICAgICAgICQoXCIucHQtbm9Mb25nZXJFbGlnaWJsZVwiKS5oaWRlKCk7XG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmUHJpbWFyeVwiKS5oaWRlKCk7XG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmU2Vjb25kYXJ5XCIpLmhpZGUoKTtcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZUZXJ0aWFyeVwiKS5zaG93KCdmYXN0Jyk7XG4vLyAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudExvYWRPZlN0dWR5JykgPT09IG51bGwpIHtcbi8vICAgICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWR5TG9hZE5vdEFuc3dlcmVkXCIpLnNob3coJ2Zhc3QnKTtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudExvYWRPZlN0dWR5JykgPT09ICdwYXJ0LXRpbWUnKSB7XG4vLyAgICAgICAgICAgJChcIi5wdC1zaG93SWZQYXJ0VGltZVwiKS5zaG93KCdmYXN0Jyk7XG4vLyAgICAgICAgIH1cblxuXG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TGV2ZWxPZlN0dWR5Jyk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TGV2ZWxPZlN0dWR5JywgJ3RlcnRpYXJ5Jyk7XG4vLyAgICAgICAgICQoXCIucGFnaW5hdGlvblwiKS5maW5kKCdidXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbi8vICAgICAgIH1cblxuXG4vLyAgICAgfSk7XG5cblxuLy8gICAgICQoJ2lucHV0W25hbWU9c3R1ZHlMb2FkXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4vLyAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1zdHVkeUxvYWRdOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3BhcnQtdGltZScpIHtcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZQYXJ0VGltZVwiKS5zaG93KCdmYXN0Jyk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdHVkZW50TG9hZE9mU3R1ZHknKTtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRMb2FkT2ZTdHVkeScsICdwYXJ0LXRpbWUnKTtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmUGFydFRpbWVcIikuaGlkZSgpO1xuLy8gICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc3R1ZGVudExvYWRPZlN0dWR5Jyk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdHVkZW50TG9hZE9mU3R1ZHknLCAnZnVsbC10aW1lJyk7XG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG5cbi8vICAgICAkKCdpbnB1dFtuYW1lPWVucm9sU3RhdHVzXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4vLyAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1lbnJvbFN0YXR1c106Y2hlY2tlZCcpLnZhbCgpID09PSAnbm8nKSB7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdlbnJvbFN0YXR1cycpO1xuXG4vLyAgICAgICAgICQoXCIucHQtbm9Mb25nZXJFbGlnaWJsZVR3b1wiKS5zaG93KCk7XG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmRW5yb2xsZWRcIikuaGlkZSgpO1xuXG4vLyAgICAgICAgIC8vIFNob3cgYW4gZXJyb3IgbWVzc2FnZSBpZiB0aGUgc3R1ZGVudCBpcyAyNSBvciBvbGRlciBhbmQgaGFzbid0IGVucm9sbGVkXG4vLyAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudEFnZScpID4gMjQpIHtcbi8vICAgICAgICAgICAkKFwiLnB0LWVucm9sbFN0YXR1c1N0dWRlbnRPdmVyMjVcIikuc2hvdygpO1xuLy8gICAgICAgICAgICQoXCIucHQtbm9Mb25nZXJFbGlnaWJsZVR3b1wiKS5oaWRlKCk7XG4vLyAgICAgICAgICAgLy8gJChcIi5wdC1lbnJvbGxEYXRlc3R1ZGVudE92ZXIyNVwiKS5oaWRlKCk7XG4vLyAgICAgICAgICAgJChcIi5wYWdpbmF0aW9uXCIpLmZpbmQoJy5idG5OZXh0JykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Vucm9sU3RhdHVzJyk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbnJvbFN0YXR1cycsIHRydWUpO1xuLy8gICAgICAgICAkKFwiLnB0LW5vTG9uZ2VyRWxpZ2libGVUd29cIikuaGlkZSgpO1xuLy8gICAgICAgICAkKFwiLnB0LWVucm9sbFN0YXR1c1N0dWRlbnRPdmVyMjVcIikuaGlkZSgpO1xuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZkVucm9sbGVkXCIpLnNob3coKTtcbi8vICAgICAgICAgLy9zaG93IGFuIGVycm9yIG1lc3NhZ2UgaWYgdGhlIHN0dWRlbnQgaXMgMjUgb3Igb2xkZXIgYW5kIGVucm9sbGVkIGFmdGVyIHRoZXkgdHVybmVkIDI1LiBUaGUgc21hcnRzIGRvbid0IGV4aXN0IGluIHByb3RvdHlwZS5cbi8vICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPiAyNCkge1xuLy8gICAgICAgICAgIC8vICQoXCIucHQtZW5yb2xsRGF0ZXN0dWRlbnRPdmVyMjVcIikuc2hvdygpO1xuLy8gICAgICAgICAgICQoXCIucGFnaW5hdGlvblwiKS5maW5kKCcuYnRuTmV4dCcpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG4vLyAgIH1cblxuLy8gICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSBcIi9hdXRoL2NsYWltL3N0dWRlbnRjbGFpbXVwbG9hZFwiKSB7XG4vLyAgICAgaW5pdFN0dWRlbnRzKCk7XG4vLyAgIH1cblxuLy8gICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSBcIi9hdXRoL2NsYWltL3N0dWRlbnRjbGFpbTRcIikge1xuLy8gICAgIC8vIFBhZ2UgNFxuLy8gICAgIGluaXRTdHVkZW50cygpO1xuLy8gICAgIGluaXRGbG93KCk7XG4vLyAgICAgJCgnLnB0LXN0dWRlbnRBZ2UtLW1hdHVyZScpLmhpZGUoKTtcbi8vICAgICAkKCcucHQtc2hvd0lmRWR1Y2F0aW9uQWxsb3dhbmNlVGF4ZWQnKS5oaWRlKCk7XG4vLyAgICAgJCgnLnB0LXNob3dJZkVkdWNhdGlvbkFsbG93YW5jZU5vdFRheGVkJykuaGlkZSgpO1xuLy8gICAgICQoJy5wdC1zaG93SWZDYXJlUGVyY2VudGFnZUxvdycpLmhpZGUoKTtcbi8vICAgICAkKCcucHQtc2hvd0lmQ2FyZVBlcmNlbnRhZ2VIaWdoJykuaGlkZSgpO1xuLy8gICAgICQoJy5iYW5rLWRldGFpbHMtY29udGFpbmVyJykuaGlkZSgpO1xuLy8gICAgICQoJy5wdC1zaG93SWZOb1N0dWRlbnRURk4nKS5oaWRlKCk7XG4vLyAgICAgJCgnLnB0LXNob3dJZlN0dWRlbnRURk4nKS5oaWRlKCk7XG4vLyAgICAgJCgnLnB0LXN0dWRlbnRGaW5hbmNpYWxQZXJtaXNzaW9uJykuaGlkZSgpO1xuXG5cbi8vICAgICAvLyBpZiBzdHVkZW50IDE2IG9yIDE3IGFzayBmb3IgVEZOXG4vLyAgICAgaWYgKChcImNsYWltYW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkgfHwgKFwidmV0ZXJhbkZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpKSB7XG4vLyAgICAgICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPD0gMTgpICYmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudEFnZScpID4gMTUpKSB7XG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmU3R1ZGVudEJldHdlZW4xNmFuZDE4XCIpLnNob3coKTtcblxuLy8gICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZTdHVkZW50QmV0d2VlbjE2YW5kMThcIikuaGlkZSgpO1xuLy8gICAgICAgfVxuLy8gICAgIH1cblxuLy8gICAgIGlmICgoXCJzdHVkZW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkpIHtcbi8vICAgICAgIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA8IDE4KSAmJiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRBZ2UnKSA+IDE1KSkge1xuLy8gICAgICAgICAkKCcucHQtc3R1ZGVudEZpbmFuY2lhbFBlcm1pc3Npb24nKS5zaG93KCk7XG4vLyAgICAgICB9XG4vLyAgICAgfVxuXG5cblxuXG4vLyAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPiAxNSkge1xuLy8gICAgICAgJCgnLnB0LXN0dWRlbnRBZ2UtLW1hdHVyZScpLnNob3coKTtcbi8vICAgICB9XG5cblxuLy8gICAgICQoJ2lucHV0W25hbWU9ZWR1Y2F0aW9uQWxsb3dhbmNlVGF4ZWRdJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPWVkdWNhdGlvbkFsbG93YW5jZVRheGVkXTpjaGVja2VkJykudmFsKCkgPT09ICd5ZXMnKSB7XG4vLyAgICAgICAgICQoXCIucHQtc2hvd0lmRWR1Y2F0aW9uQWxsb3dhbmNlVGF4ZWRcIikuc2hvdygpO1xuLy8gICAgICAgICAkKCcucHQtc2hvd0lmRWR1Y2F0aW9uQWxsb3dhbmNlTm90VGF4ZWQnKS5oaWRlKCk7XG4vLyAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZkVkdWNhdGlvbkFsbG93YW5jZVRheGVkXCIpLmhpZGUoKTtcbi8vICAgICAgICAgJCgnLnB0LXNob3dJZkVkdWNhdGlvbkFsbG93YW5jZU5vdFRheGVkJykuc2hvdygnZmFzdCcpO1xuLy8gICAgICAgfVxuLy8gICAgIH0pO1xuXG5cblxuLy8gICAgIC8vIGJhbmsgZGV0YWlscyBidXR0b24gZnVuY3Rpb25cbi8vICAgICAkKFwiI2J0bkFkZEJhbmtcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuLy8gICAgICAgJChcIi5iYW5rLWRldGFpbHMtY29udGFpbmVyXCIpLnNob3coXCJmYXN0XCIpO1xuLy8gICAgICAgJChcIiNidG5BZGRCYW5rLWJveFwiKS5oaWRlKCk7XG4vLyAgICAgICAkKFwiI2JhbmtvcHRpb25hbFwiKS5oaWRlKCk7XG4vLyAgICAgICAkKFwiI2J0bkNhbmNlbEJhbmtcIikuc2hvdygpO1xuLy8gICAgICAgJChcIiNiYW5rLW5hbWVcIikuZm9jdXMoKTtcbi8vICAgICB9KTtcbi8vICAgICAkKFwiI2J0bkNhbmNlbEJhbmtcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuLy8gICAgICAgJChcIi5iYW5rLWRldGFpbHMtY29udGFpbmVyXCIpLmhpZGUoXCJmYXN0XCIpO1xuLy8gICAgICAgJChcIiNidG5DYW5jZWxCYW5rXCIpLmhpZGUoKTtcbi8vICAgICAgICQoXCIjYmFua29wdGlvbmFsXCIpLnNob3coKTtcbi8vICAgICAgICQoXCIjYnRuQWRkQmFuay1ib3hcIikuc2hvdygpO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgJChcIi5tZXNzYWdlLWNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICQoXCIuYmFuay1kZXRhaWxzLWNvbnRhaW5lclwiKS5oaWRlKFwiZmFzdFwiKTtcbi8vICAgICB9KTtcblxuLy8gICAgICQoJ2lucHV0W25hbWU9ZG9lc1N0dWRlbnRIYXZlVEZOXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4vLyAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1kb2VzU3R1ZGVudEhhdmVURk5dOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3llcycpIHtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRURk4nLCB0cnVlKTtcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZOb1N0dWRlbnRURk5cIikuaGlkZSgpO1xuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRURk5cIikuc2hvdygpO1xuLy8gICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0dWRlbnRURk4nLCBmYWxzZSk7XG4vLyAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0Zm4nKTtcbi8vICAgICAgICAgJChcIi5wdC1zaG93SWZOb1N0dWRlbnRURk5cIikuc2hvdygnZmFzdCcpO1xuLy8gICAgICAgICAkKFwiLnB0LXNob3dJZlN0dWRlbnRURk5cIikuaGlkZSgpO1xuLy8gICAgICAgfVxuLy8gICAgIH0pO1xuXG4vLyAgIH1cblxuXG4vLyAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09IFwiL2F1dGgvY2xhaW0vc3R1ZGVudGNsYWltNGFcIikge1xuLy8gICAgIGluaXRTdHVkZW50cygpO1xuLy8gICAgIGluaXRGbG93KCk7XG4vLyAgIH1cblxuLy8gICBpZiAod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSBcIi9hdXRoL2NsYWltL3N0dWRlbnRjbGFpbTZcIikge1xuLy8gICAgIGluaXRTdHVkZW50cygpO1xuXG4vLyAgICAgJChcIi5wdC1zaG93SWZOb1N0dWRlbnRURk5cIikuaGlkZSgpO1xuXG4vLyAgICAgaWYgKCEobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnRIYXNURk4nKSkgJiYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50QWdlJykgPiAxNSkpIHtcbi8vICAgICAgICQoXCIucHQtc2hvd0lmTm9TdHVkZW50VEZOXCIpLnNob3coKTtcbi8vICAgICB9XG5cbi8vICAgICB2YXIgYnVzaW5lc3NEYXlzID0gNSxcbi8vICAgICAgIGNvdW50ZXIgPSAxOyAvLyBzZXQgdG8gMSB0byBjb3VudCBmcm9tIG5leHQgYnVzaW5lc3MgZGF5XG4vLyAgICAgd2hpbGUgKGJ1c2luZXNzRGF5cyA+IDApIHtcbi8vICAgICAgIHZhciB0bXAgPSBuZXcgRGF0ZSgpO1xuLy8gICAgICAgdG1wLnNldERhdGUodG1wLmdldERhdGUoKSArIGNvdW50ZXIrKyk7XG4vLyAgICAgICBzd2l0Y2ggKHRtcC5nZXREYXkoKSkge1xuLy8gICAgICAgICBjYXNlIDA6XG4vLyAgICAgICAgIGNhc2UgNjpcbi8vICAgICAgICAgICBicmVhazsgLy8gc3VuZGF5ICYgc2F0dXJkYXlcbi8vICAgICAgICAgZGVmYXVsdDpcbi8vICAgICAgICAgICBidXNpbmVzc0RheXMtLTtcbi8vICAgICAgIH07XG4vLyAgICAgfVxuXG4vLyAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wdC1idXNzbmVzc0RheXNPdXRjb21lXCIpLmlubmVySFRNTCA9IHRtcC50b0RhdGVTdHJpbmcoKTtcbi8vICAgfVxuXG5cbi8vICAgLy8gUG9DIGNoZWNrIGRvY3MgcmVxdWlyZWQgZm9yIHByb3RvdHlwZVxuXG4vLyAgIGZ1bmN0aW9uIFBlcnNvbigpIHtcbi8vICAgICAvLyBob3cgbWFueSB0aW1lcyBpcyB0aGUgY2FsbGVkXG4vLyAgICAgdGhpcy5pID0gMDtcblxuLy8gICAgIHRoaXMuc3R1ZGVudEFnZTtcbi8vICAgICB0aGlzLnN0dWRlbnROYW1lRmlyc3Q7XG4vLyAgICAgdGhpcy5kb2NzUmVxdWlyZWQgPSBbXTtcblxuLy8gICAgIC8vIHByaXZpbGVnZWQgaW5pdCBtZXRob2Rcbi8vICAgICB0aGlzLmluaXQoKTtcbi8vICAgfVxuXG4vLyAgIC8vIGRlZmluaW5nIGluaXQgbWV0aG9kXG4vLyAgIFBlcnNvbi5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAvLyByZWFzc2lnbiB0aGlzXG4vLyAgICAgdmFyIF90aGlzID0gdGhpcztcbi8vICAgICBfdGhpcy5jaGVja0RvY3MoKTtcbi8vICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAgIF90aGlzLmNoZWNrRG9jcygpO1xuLy8gICAgIH0sIDE1MDApO1xuLy8gICB9O1xuXG4vLyAgIFBlcnNvbi5wcm90b3R5cGUuY2hlY2tEb2NzID0gZnVuY3Rpb24gKCkge1xuLy8gICAgIHRoaXMuaSsrO1xuXG4vLyAgICAgLy8gbGlzdCBvZiBkb2NzXG4vLyAgICAgLy8gUHJvb2Ygb2YgcmVsYXRpb25zaGlwID0gcHJvb2ZPZlJlbGF0aW9uc2hpcFxuLy8gICAgIC8vIFByb29mIG9mIHJlc2lkZW5jZSA9IHByb29mT2ZSZXNpZGVuY2Vcbi8vICAgICAvLyBQcm9vZiBvZiBlbnJvbG1lbnQgPSBwcm9vZk9mRW5yb2xtZW50XG4vLyAgICAgLy8gUGFydC10aW1lIHN0dWR5IHJlYXNvbiA9IHBhcnRUaW1lU3R1ZHlSZWFzb25cbi8vICAgICAvLyBUYXggZmlsZSBudW1iZXIgZGVjbGFyYXRpb24gPSB0Rk5EZWNsYXJhaW9uXG5cbi8vICAgICAvLyBjaGVjayB0eXBlIG9mIHBlcnNvbiBcbi8vICAgICBpZiAoKFwic3R1ZGVudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHx8IChcInZldGVyYW5GbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB8fCAoXCJjbGFpbWFudEZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpKSB7XG5cbi8vICAgICAgIGlmIChcInN0dWRlbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XG4vLyAgICAgICAgIHRoaXMudHlwZSA9ICdzdHVkZW50Jztcbi8vICAgICAgIH0gZWxzZSBpZiAoXCJ2ZXRlcmFuRmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xuLy8gICAgICAgICB0aGlzLnR5cGUgPSAndmV0ZXJhbic7XG4vLyAgICAgICB9IGVsc2UgaWYgKFwiY2xhaW1hbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XG4vLyAgICAgICAgIHRoaXMudHlwZSA9ICdjbGFpbWFudCc7XG4vLyAgICAgICB9XG4vLyAgICAgfVxuXG5cbi8vICAgICAvLyBQcm9vZiBvZiByZWxhdGlvbnNoaXAgXG4vLyAgICAgaWYgKFwidmV0ZXJhbkZsb3dcIiBpbiBsb2NhbFN0b3JhZ2UpIHtcbi8vICAgICAgIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnROYW1lRmlyc3QnKSAhPT0gbnVsbCkgJiYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50TmFtZUxhc3QnKSAhPT0gbnVsbCkpIHtcbi8vICAgICAgICAgaW5pdFN0dWRlbnRzKCk7XG4vLyAgICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLmluZGV4T2YoXCJwcm9vZk9mUmVsYXRpb25zaGlwQ2xhaW1hbnRTdHVkZW50XCIpID09PSAtMSA/IHRoaXMuZG9jc1JlcXVpcmVkLnB1c2goXCJwcm9vZk9mUmVsYXRpb25zaGlwQ2xhaW1hbnRTdHVkZW50XCIpIDogY29uc29sZS5sb2coKTtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIHZhciBpID0gdGhpcy5kb2NzUmVxdWlyZWQuaW5kZXhPZihcInByb29mT2ZSZWxhdGlvbnNoaXBDbGFpbWFudFN0dWRlbnRcIik7XG4vLyAgICAgICAgIGlmIChpICE9IC0xKSB7XG4vLyAgICAgICAgICAgdGhpcy5kb2NzUmVxdWlyZWQuc3BsaWNlKGksIDEpO1xuLy8gICAgICAgICAgICQoJy5wdC1wcm9vZk9mUmVsYXRpb25zaGlwQ2xhaW1hbnRTdHVkZW50JykuYWRkQ2xhc3MoJ2Rpc3BsYXktbm9uZScpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG4vLyAgICAgfSBlbHNlIGlmIChcInN0dWRlbnRGbG93XCIgaW4gbG9jYWxTdG9yYWdlKSB7XG4vLyAgICAgICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd2ZXRlcmFuTmFtZUZpcnN0JykgIT09IG51bGwpICYmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndmV0ZXJhbk5hbWVMYXN0JykgIT09IG51bGwpKSB7XG4vLyAgICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLmluZGV4T2YoXCJwcm9vZk9mUmVsYXRpb25zaGlwXCIpID09PSAtMSA/IHRoaXMuZG9jc1JlcXVpcmVkLnB1c2goXCJwcm9vZk9mUmVsYXRpb25zaGlwXCIpIDogY29uc29sZS5sb2coKTtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIHZhciBpID0gdGhpcy5kb2NzUmVxdWlyZWQuaW5kZXhPZihcInByb29mT2ZSZWxhdGlvbnNoaXBcIik7XG4vLyAgICAgICAgIGlmIChpICE9IC0xKSB7XG4vLyAgICAgICAgICAgdGhpcy5kb2NzUmVxdWlyZWQuc3BsaWNlKGksIDEpO1xuLy8gICAgICAgICAgICQoJy5wdC1wcm9vZk9mUmVsYXRpb25zaGlwJykuYWRkQ2xhc3MoJ2Rpc3BsYXktbm9uZScpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG4vLyAgICAgfSBlbHNlIGlmIChcImNsYWltYW50Rmxvd1wiIGluIGxvY2FsU3RvcmFnZSkge1xuLy8gICAgICAgaWYgKChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndmV0ZXJhbk5hbWVGaXJzdCcpICE9PSBudWxsKSAmJiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ZldGVyYW5OYW1lTGFzdCcpICE9PSBudWxsKSAmJiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0dWRlbnROYW1lRmlyc3QnKSAhPT0gbnVsbCkgJiYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50TmFtZUxhc3QnKSAhPT0gbnVsbCkpIHtcbi8vICAgICAgICAgaW5pdFN0dWRlbnRzKCk7XG4vLyAgICAgICAgIGlmICgobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ZldGVyYW5OYW1lRmlyc3QnKSAhPT0gbnVsbCkgJiYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd2ZXRlcmFuTmFtZUxhc3QnKSAhPT0gbnVsbCkpIHtcbi8vICAgICAgICAgICB0aGlzLmRvY3NSZXF1aXJlZC5pbmRleE9mKFwicHJvb2ZPZlJlbGF0aW9uc2hpcFZldGVyYW5TdHVkZW50XCIpID09PSAtMSA/IHRoaXMuZG9jc1JlcXVpcmVkLnB1c2goXCJwcm9vZk9mUmVsYXRpb25zaGlwVmV0ZXJhblN0dWRlbnRcIikgOiBjb25zb2xlLmxvZygpO1xuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgIHZhciBpID0gdGhpcy5kb2NzUmVxdWlyZWQuaW5kZXhPZihcInByb29mT2ZSZWxhdGlvbnNoaXBWZXRlcmFuU3R1ZGVudFwiKTtcbi8vICAgICAgICAgICBpZiAoaSAhPSAtMSkge1xuLy8gICAgICAgICAgICAgdGhpcy5kb2NzUmVxdWlyZWQuc3BsaWNlKGksIDEpO1xuLy8gICAgICAgICAgICAgJCgnLnB0LXByb29mT2ZSZWxhdGlvbnNoaXBWZXRlcmFuU3R1ZGVudCcpLmFkZENsYXNzKCdkaXNwbGF5LW5vbmUnKTtcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50TmFtZUZpcnN0JykgIT09IG51bGwpICYmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudE5hbWVMYXN0JykgIT09IG51bGwpKSB7XG4vLyAgICAgICAgICAgdGhpcy5kb2NzUmVxdWlyZWQuaW5kZXhPZihcInByb29mT2ZSZWxhdGlvbnNoaXBDbGFpbWFudFN0dWRlbnRcIikgPT09IC0xID8gdGhpcy5kb2NzUmVxdWlyZWQucHVzaChcInByb29mT2ZSZWxhdGlvbnNoaXBDbGFpbWFudFN0dWRlbnRcIikgOiBjb25zb2xlLmxvZygpO1xuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgIHZhciBpID0gdGhpcy5kb2NzUmVxdWlyZWQuaW5kZXhPZihcInByb29mT2ZSZWxhdGlvbnNoaXBDbGFpbWFudFN0dWRlbnRcIik7XG4vLyAgICAgICAgICAgaWYgKGkgIT0gLTEpIHtcbi8vICAgICAgICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLnNwbGljZShpLCAxKTtcbi8vICAgICAgICAgICAgICQoJy5wdC1wcm9vZk9mUmVsYXRpb25zaGlwQ2xhaW1hbnRTdHVkZW50JykuYWRkQ2xhc3MoJ2Rpc3BsYXktbm9uZScpO1xuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgICAgfVxuLy8gICAgIH1cblxuXG4vLyAgICAgLy8gUHJvb2Ygb2YgZW5yb2xtZW50IFxuLy8gICAgIGlmIChcImVucm9sU3RhdHVzXCIgaW4gbG9jYWxTdG9yYWdlKSB7XG4vLyAgICAgICB0aGlzLmRvY3NSZXF1aXJlZC5pbmRleE9mKFwicHJvb2ZPZkVucm9sbWVudFwiKSA9PT0gLTEgPyB0aGlzLmRvY3NSZXF1aXJlZC5wdXNoKFwicHJvb2ZPZkVucm9sbWVudFwiKSA6IGNvbnNvbGUubG9nKCk7XG4vLyAgICAgfSBlbHNlIHtcblxuLy8gICAgICAgdmFyIGkgPSB0aGlzLmRvY3NSZXF1aXJlZC5pbmRleE9mKFwicHJvb2ZPZkVucm9sbWVudFwiKTtcbi8vICAgICAgIGlmIChpICE9IC0xKSB7XG4vLyAgICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLnNwbGljZShpLCAxKTtcbi8vICAgICAgICAgJCgnLnB0LXByb29mT2ZFbnJvbG1lbnQnKS5hZGRDbGFzcygnZGlzcGxheS1ub25lJyk7XG4vLyAgICAgICB9XG4vLyAgICAgfVxuXG4vLyAgICAgLy8gUHJvb2Ygb2YgcmVzaWRlbmNlIFxuLy8gICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3R1ZGVudExpdmluZ0xvY2F0aW9uJykgPT09ICdhd2F5LWZyb20taG9tZScpIHtcbi8vICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLmluZGV4T2YoXCJwcm9vZk9mUmVzaWRlbmNlXCIpID09PSAtMSA/IHRoaXMuZG9jc1JlcXVpcmVkLnB1c2goXCJwcm9vZk9mUmVzaWRlbmNlXCIpIDogY29uc29sZS5sb2coKTtcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgdmFyIGkgPSB0aGlzLmRvY3NSZXF1aXJlZC5pbmRleE9mKFwicHJvb2ZPZlJlc2lkZW5jZVwiKTtcbi8vICAgICAgIGlmIChpICE9IC0xKSB7XG4vLyAgICAgICAgIHRoaXMuZG9jc1JlcXVpcmVkLnNwbGljZShpLCAxKTtcbi8vICAgICAgICAgJCgnLnB0LXByb29mT2ZSZXNpZGVuY2UnKS5hZGRDbGFzcygnZGlzcGxheS1ub25lJyk7XG4vLyAgICAgICB9XG4vLyAgICAgfVxuXG4vLyAgICAgLy8gUGFydC10aW1lIHN0dWR5IHJlYXNvbiBcbi8vICAgICBpZiAoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdHVkZW50TG9hZE9mU3R1ZHknKSA9PT0gJ3BhcnQtdGltZScpKSB7XG4vLyAgICAgICB0aGlzLmRvY3NSZXF1aXJlZC5pbmRleE9mKFwicGFydFRpbWVTdHVkeVJlYXNvblwiKSA9PT0gLTEgPyB0aGlzLmRvY3NSZXF1aXJlZC5wdXNoKFwicGFydFRpbWVTdHVkeVJlYXNvblwiKSA6IGNvbnNvbGUubG9nKCk7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgIHZhciBpID0gdGhpcy5kb2NzUmVxdWlyZWQuaW5kZXhPZihcInBhcnRUaW1lU3R1ZHlSZWFzb25cIik7XG4vLyAgICAgICBpZiAoaSAhPSAtMSkge1xuLy8gICAgICAgICB0aGlzLmRvY3NSZXF1aXJlZC5zcGxpY2UoaSwgMSk7XG4vLyAgICAgICAgICQoJy5wdC1wYXJ0VGltZVN0dWR5UmVhc29uJykuYWRkQ2xhc3MoJ2Rpc3BsYXktbm9uZScpO1xuLy8gICAgICAgfVxuLy8gICAgIH1cblxuLy8gICAgIC8vIHNob3cgYWxsIHJlcXVpcmVkIGRvY3MgXG4vLyAgICAgaWYgKHRoaXMuZG9jc1JlcXVpcmVkLmxlbmd0aCA+IDApIHtcbi8vICAgICAgIGpRdWVyeShcIi5wdC1zaG93SWZEb2N1bWVudFVwbG9hZFNob3BwaW5nQ2FydFwiKS5zaG93KCk7XG4vLyAgICAgICAkLmVhY2godGhpcy5kb2NzUmVxdWlyZWQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgJCgnLnB0LScgKyB0aGlzKS5yZW1vdmVDbGFzcygnZGlzcGxheS1ub25lJyk7XG4vLyAgICAgICB9KTtcbi8vICAgICB9XG5cbi8vICAgfTtcblxuLy8gICAvLyBjcmVhdGUgYSBuZXcgcGVyc29uXG4vLyAgIHZhciBjb3VudGVyID0gbmV3IFBlcnNvbigpO1xuXG5cblxuXG5cbi8vICAgJChcIi5hY2NvcmRpb25fX3RyaWdnZXJcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuXG4vLyAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhcImFjY29yZGlvbl9fdHJpZ2dlci0tb3BlbiBhY2NvcmRpb25fX3RyaWdnZXItLWNsb3NlZFwiKTtcbi8vICAgICAkKHRoaXMpLmNsb3Nlc3QoXCIuYWNjb3JkaW9uXCIpLnRvZ2dsZUNsYXNzKFwiYWNjb3JkaW9uLS1jbG9zZWQgYWNjb3JkaW9uLS1vcGVuXCIpO1xuXG4vLyAgIH0pO1xuXG4vLyAgICQoJ2lucHV0W25hbWU9dGF4LWZpbGUtbnVtYmVyXScpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4vLyAgICAgaWYgKHRoaXMudmFsdWUpIHtcbi8vICAgICAgIGNvbnNvbGUubG9nKCdURk4gc2V0IHRvOiAnLCB0aGlzLnZhbHVlKTtcbi8vICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0Zm4nLCB0aGlzLnZhbHVlKTtcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3RmbicpO1xuLy8gICAgIH1cbi8vICAgfSk7XG4vLyB9KTsiXSwiZmlsZSI6InN0dWRlbnRzLmpzIn0=
