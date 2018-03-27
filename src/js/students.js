// Student claim pages
jQuery(document).ready(function ($) {

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
    var question = '';
    // Student questions 


    if ("studentFlow" in localStorage) {
      console.log('I am in student flow');
      question = {
        pageheader1: "Veteran details	",
        pageheader1a: "Your details",
        pageheader1b: "",
        pageheaderLiving: "Your living arrangements",
        pageheaderStudy: "Your study details",
        id1: "Title",
        id1a: "Gender",
        id2: "Given name <span class='hint'>(first name)</span>",
        id3: "Surname <span class='hint'>(last name)</span>",
        id4: "Date of birth  <span class='hint'>(DD / MM / YYYY)</span>",
        id5: "The veteran is my",
        id5a: "",
        id6: "Are you employed full time? <span class='hint display-block'>This does not include apprenticeships.</span>",
        id7: "Are you married or in a de facto relationship?",
        id7a: "Are you living with your partner?",
        id8: "Are you living away from home for any of the above reasons?",
        id8a: "[TEXT TBD] You will be eligible for a lesser payment",
        id9: "",
        id9a: "Approximately, when will you ",
        id9b: "Provide any supporting documents to prove your relationship to the student.",
        id10: "Level of study",
        id10a: "[TEXT TBD] You are no longer eligible",
        id11: "Grade this year",
        id12: "Name of school",
        id13: "School address",
        id14: "School phone number",
        id15: "What type of education will you be studying this year?",
        id16: "Where are you",
        id17: "Course name / Degree name",
        id18: "Course Code  / Degree code",
        id19: "Date you ",
        id19a: "Approximately, when will you ",
        id20: "Date you plan to complete your studies <span class='hint'>(MM / YYYY)</span>",
        id21: "Are you ",
        id21a: "Tell us more about your",
        id21ai: "Why are you",
        id21b: "When do you intend on returning to full-time study? (optional)  <span class='hint'>(MM / YYYY)</span>",
        id21c: "Have you ",
        id21ci: "Please notify DVA when you have enrolled. You may continue to submit the claim, although the claim will not be received without proof of enrolment.",
        id21u: "Please provide evidence to explain why you study part-time",
        id22: "Residential address",
        id22a: "Postal address",
        id23: "Where are you living?",
        id23a: "What best describes your situation?",
        id23ai: "Why are you",
        id24: "What is your living situation?",
        id24x: "Are you sharing the cost of rent with anyone else?",
        id24a: "Do you have your rental details?",
        id24a1: "When did you start renting? <span class='hint'>(DD / MM / YYYY)</span>",
        id24a2: "When does the your rental agreement end? <span class='hint'>(DD / MM / YYYY)</span>",
        id24a3: "What type of payment do you make for accommodation?",
        id24a3a: "Please provide details...",
        id24a4: "Name of person or agency you pay rent to",
        id24a5: "Email address",
        id24a6: "Contact number",
        id24a7: "How much rent do you pay every two week?",
        id24a8: "Do you share the cost of rent with anyone else? ",
        id24a9: "When did you start boarding / lodging? <span class='hint'>(DD / MM / YYYY)</span>",
        id24a9a: "How much do you pay in board every two week? <span class='hint'>(minus the cost of meals)</span>",
        id24a9b: "Tell us about your situation",
        id25: "Provide any supporting documents, for example rental agreement",
        id26: "Who receives the Family Tax Benefit for the student?",
        id26a: "What is your Customer Reference Number (CRN)",
        id26b: "What percentage do you care for your child?",
        id26b1: "[Text TBD] You may not be eligible",
        id26b2: "[Text TBD] The other care giver may not be eligible",
        id26c: "What is the name of the other care giver? (optional)",
        id26d: "What are the contact details for the other care giver? (optional)",
        id27: "Your tax file number",
        id28: "Would you like to have the your education allowance taxed?  ",
        id28a: "How much rent do you pay every two week? ",
        id28ai: "Payments will be made directly to these bank account details.",
        id29: "Account Name",
        id30: "BSB",
        id31: "Account Number",
        id32: "Are you studying full time or planning to study full time?",
        id33a: "Are you or were you dependant on the veteran? <span class='hint'>Completely or substantially</span>",
        id33b: "Is the veteran significantly injured or deceased because of their service? For example:<span class='hint display-block'> <ul> <li>The veteran has 80 impairment points</li><li>The veteran is totally and permanently impaired</li><li>The veteran is eligible for an extreme disablement adjustment rate</li><li>The veteran is, or was eligible for the special rate disability pension</li></ul> </span>",
        id34: "Are you applying for a student?",
        id35: "Do you provide care for the student or receive the Family Tax Benefit for them?",
        id36: "Is the student the dependant of a veteran who is significantly injured or deceased?",
        id37: "You are eligible to apply for student support payments.",
        id38: "You may need to provide more evidence to apply for student support payments.",
        id39: "You are not eligible for student support payments. For more information call 133 254.",
        id40: "Are you a student, or carer claiming on behalf of a student?",
        id41: "Veteran's title",
        id42: "Veteran's given name <span class='hint'>(first name)</span>",
        id43: "Veteran's surname <span class='hint'>(last name)</span>",
        id44: "Veteran's date of birth",
        id45: "Veteran's DVA file number <span class='hint'>(if known)</span>",
        id46: "PMKeyS ID (preferred)",
        id47: "Your relationship to the veteran",
        id48: "Please provide a brief statement explaining how you came into the veterans care. ",
        id49: "Student's parent/family status",
        id50: "",
        id50a: "Apply",
        id51: "Your bank details",
        id52: "Your tax details",
        id53: "Would you like DVA to withhold tax from this payment?",
        id54: "How much would you like to withhold per fortnight for tax? <span class='hint display-block'> For information about payments see the <a href='https://www.dva.gov.au/factsheet-mrc04-compensation-payment-rates' target='_blank' class='external-link'>DVA website</a></span>",
        id55: "Do you have a tax file number?",
      };
    }



    if (("veteranFlow" in localStorage) || ("claimantFlow" in localStorage)) {
      console.log('I am in veteran / claimant flow flow');
      question = {
        pageheader1: "Student details	",
        pageheaderLiving: "Student's living arrangements",
        pageheaderStudy: "Student's study details",
        id1: "Student's title",
        id1a: "Student's gender",
        id2: "Student's given name <span class='hint'>(first name)</span>",
        id3: "Student's surname <span class='hint'>(last name)</span>",
        id4: "Student's date of birth  <span class='hint'>(DD / MM / YYYY)</span>",
        id5: "The student is my",
        id5a: "Provide a brief statement explaining how the student came into your care. ",
        id6: "Is the student employed full time? <span class='hint display-block'>This does not include apprenticeships.</span>",
        id6a: "Is the student employed full time? <span class='hint display-block'>This does not include apprenticeships.</span>",
        id7: "Is the student in a de facto / married relationship?",
        id8: "Is the student living away from home for any of the above reasons?",
        id8a: "",
        id9: "What is the Veteran/Member's relationship to the student?",
        id9a: "Provide a brief statement explaining how the student came into your care. ",
        id9b: "Provide any supporting documents to prove your relationship to the student.",
        id10: "Level of study",
        id10a: "[TEXT TBD] You are no longer eligible",
        id11: "Grade this year",
        id12: "Name of school",
        id13: "School address",
        id14: "School phone number",
        id15: "What type of education will the student be studying this year?",
        id16: "Where is",
        id17: "Course name / Degree name",
        id18: "Course Code  / Degree code",
        id19: "Date that ",
        id19a: "Approximately, when will ",
        id20: "Date the student plans to complete their studies <span class='hint'>(  MM / YYYY)</span>",
        id21: "Is ",
        id21a: "Tell us more about",
        id21ai: "Why is ",
        id21b: "When do you intend on returning to full-time study? <span class='hint'>(optional)</span>  <span class='hint'>(  MM / YYYY)</span>",
        id21c: "Is ",
        id21ci: "Notify DVA when you have enrolled. You can continue your claim, but the claim will not be complete without proof of enrolment. xxx",
        id21u: "Provide evidence to explain why the student is studying part-time",
        id22: "residential address ",
        id22a: "postal address",
        id23: "Where is the student living?",
        id23a: "What best describes the student’s situation? ",
        id23ai: "Why is ",
        id24x: "Is ",
        id24a: "Do you know the student's rental details?",
        id24a1: "",
        id24a2: "When does the student's rental agreement end? <span class='hint'>(DD / MM / YYYY)</span>",
        id24a3: "What type of payment does the student make for accommodation?",
        id24a4: "Name of person or agency the student pays rent to",
        id24a5: "Email address",
        id24a6: "Contact number",
        id24a7: "How much rent does  pay every two weeks ?",
        id24a8: "",
        id24: "",
        id25: "Provide any supporting documents, for example rental agreement",
        id26: "Do you receive Family Tax Benefit for the student?",
        id26a: "What is your Customer Reference Number",
        id26b: "What is your FTB percentage for James?",
        id26b1: "[Text TBD] You may not be eligible",
        id26b2: "[Text TBD] The other care giver may not be eligible",
        id26c: "What is the name of the other care giver? <span class='hint'>(optional)</span>",
        id26d: "What are the contact details for the other care giver? <span class='hint'>(optional)</span>",
        id27: "Student's Tax File Number",
        id28: "Would you like to have the student's  education allowance taxed?  ",
        id28a: "  ",
        id28ai: "Payments will be made directly to these bank account details.	",
        id29: "Account Name",
        id30: "BSB",
        id31: "Account Number",
        id32: "",
        id33a: "Is the veteran significantly injured or deceased because of their service? For example:<span class='hint display-block'> <ul> <li>The veteran has 80 impairment points</li><li>The veteran is totally and permanently impaired</li><li>The veteran is eligible for an extreme disablement adjustment rate</li><li>The veteran is, or was eligible for the special rate disability pension</li></ul> </span>",
        id33b: "Are you a veteran who is significantly injured as a result of your service?",
        id34: "Are you applying for a student?",
        id35: "Do you provide care for the student or receive the Family Tax Benefit for them?",
        id36: "",
        id37: "You are eligible to apply for student support payments.",
        id38: "You may need to provide more evidence to apply for student support payments.",
        id39: "You are not eligible for student support payments. For more information call 133 254.",
        id40: "Are you a student, or carer claiming on behalf of a student?",
        id41: "Veterans Title",
        id42: "Veteran's given name <span class='hint'>(first name)</span>",
        id43: "Veteran's surname <span class='hint'>(last name)</span>",
        id44: "Veteran's date of birth",
        id45: "Veteran's DVA file number <span class='hint'>(if known)</span>",
        id46: "PMKeyS ID (preferred)",
        id47: "Your relationship to the veteran",
        id49: "James' parents are;",
        id50: "Have",
        id50a: "apply",
        id53: "Would you like DVA to withhold tax from this payment?",
        id54: "How much would you like to withhold per fortnight for tax? <span class='hint display-block'> For information about payments see the <a href='https://www.dva.gov.au/factsheet-mrc04-compensation-payment-rates' target='_blank' class='external-link'>DVA website</a></span>",

      };

      question.id24 = "What is " + studentNameFirstApostrophed + " living situation?";
      question.id24x = "Is " + studentNameFirst + " sharing the cost of rent with anyone else?";
      question.id24a1 = "When did " + studentNameFirst + " start renting? <span class='hint'>(DD / MM / YYYY)</span>";
      question.id24a8 = "Does " + studentNameFirst + " share  the cost of rent with anyone else? ";
      question.id24a7 = "How much rent does " + studentNameFirst + " pay every two weeks? ";
      question.id24a9 = "When did " + studentNameFirst + " start boarding / lodging? <span class='hint'>(DD / MM / YYYY)</span>";
      question.id24a9a = "How much does " + studentNameFirst + " pay in board every two week? <span class='hint'>(minus the cost of meals)</span>";
      question.id24a9b = "Tell us about " + studentNameFirstApostrophed + " situation";

      question.id52 = studentNameFirstApostrophed + " tax details";
      question.id55 = "Does " + studentNameFirst + " have a tax file number?";

    }

    if ("claimantFlow" in localStorage) {
      question.id5 = "The veteran is the student's";
      question.id5a = "Provide a brief statement explaining how the student came into the veterans care. ";
      question.id6 = "Is the student employed full time? <span class='hint display-block'>This does not include apprenticeships.</span>";
      question.id7a = "Is the student living with their partner?";
      question.id9 = "What is the Veteran's relationship to the student?";
      question.id47 = "The students relationship to the veteran";
      question.id33a = "Is the student or was the student dependent on the veteran? <span class='hint'>Completely or substantially</span>";
      question.id33b = "Is the veteran significantly injured or deceased because of their service? For example:<span class='hint display-block'> <ul> <li>The veteran has 80 impairment points</li><li>The veteran is totally and permanently impaired</li><li>The veteran is eligible for an extreme disablement adjustment rate</li><li>The veteran is, or was eligible for the special rate disability pension</li></ul> </span>";
      question.id35 = "Does the Veteran provide care for the student or receive the Family Tax Benefit for them?";
      question.id36 = "";
      question.id48 = "Please provide a brief statement explaining how the student came into the veterans care. ";
      question.pageheader1 = "Veteran details	";
      question.pageheader1a = "Student details";
      question.pageheader1b = "";
      question.id52 = studentNameFirstApostrophed + " tax details";
      question.id53 = "Would you like DVA to withhold tax from this payment?";
      question.id54 = "How much would you like to withhold per fortnight for tax? <span class='hint display-block'> For information about payments see the <a href='https://www.dva.gov.au/factsheet-mrc04-compensation-payment-rates' target='_blank' class='external-link'>DVA website</a></span>";
      question.id55 = "Does " + studentNameFirst + " have a tax file number?";
    }

    for (var key in question) {
      $("#question_" + key).html(question[key]);
    }
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
  if (window.location.pathname === "/studentpreeligibility") {

    // console.log('studentpreeligibility');
    localStorage.clear();


    var getUrlParameter = function getUrlParameter(sParam) {
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
    };

    var flow = getUrlParameter('flow');
    var age = getUrlParameter('studentAge');
    var docUploads = getUrlParameter('docUploads');
    var act = getUrlParameter('act');



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
      alert('The prototype requires a flow and age in the url string e.g.  ' + location.protocol + '//' + location.host + location.pathname + '?flow=studentFlow&studentAge=10')
    }

    if (flow !== (localStorage.getItem('flow'))) {
      window.location.reload(true);
    }

    initStudents();



    function init() {
      console.log('loading init');

      if ("veteranFlow" in localStorage) {
        $(".pt-flow--veteran").show("fast");
      }

      if ("studentFlow" in localStorage) {
        $(".pt-flow--student").show("fast");
      }

      if ("claimantFlow" in localStorage) {
        $(".pt-flow--claimant").show("fast");
      }

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
          if ((localStorage.getItem('studentAge') < 18) && (localStorage.getItem('studentAge') > 15)) {
            $(".pt-showFTBIsBest").show();
          }
        }
        if (!("claimantFlow" in localStorage)) {
          // if student 16 or 17 ask for TFN
          if ((localStorage.getItem('studentAge') < 18) && (localStorage.getItem('studentAge') > 15)) {
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
          if ((localStorage.getItem('studentAge') < 18) && (localStorage.getItem('studentAge') > 15)) {
            $(".pt-showIfStudentBetween16and18").show();
          } else {
            $(".pt-showIfStudentBetween16and18").hide();
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
      }
    });

    // Calculate student age
    $(".pt-student-dob > :input").keyup(function () {
      var dobDay = $("#dd-date").val();
      var dobMonth = $("#mm-date").val();
      var dobYear = $("#yyyy-date").val();

      // if a valid date
      if (dobDay && dobMonth && (dobYear.length === 4)) {
        if (dobDay.longth === 1) {
          dobDay = "0" + dobDay;
        }
        if (dobMonth.longth === 1) {
          dobMonth = "0" + dobMonth;
        }
        var dob = dobYear + '-' + dobMonth + '-' + dobDay;



        dob = new Date(dob);
        var today = new Date();
        var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));

        localStorage.removeItem('studentAge');
        localStorage.setItem('studentAge', age);

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
              $(".pt-showIfStudentUnder18").show();
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
            } else if ((localStorage.getItem('studentAge') > 15) && (localStorage.getItem('studentAge') < 18)) {
              init();
              $(".pt-showIfStudentShouldClaimThemselves").hide();
              $(".pt-claimantShowIfStudentOver16").show();

            } else { // under 16
              init();
              // $(".pt-showIfStudentShouldClaimThemselves").hide();
              // $(".pt-showIfStudentUnder18").show();
              $(".pt-showIfEngagedInFullTimeEmployment").show();

            }


            $('input[name=veteranSignificantlyInjured]').change(function () {
              if ($('input[name=veteranSignificantlyInjured]:checked').val() === 'yes') {
                $(".pt-showIfStudentUnder18").show();
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
      }
    });



    $(".upload-list").show();
  }

  // Page 1
  if (window.location.pathname === "/studentclaim1") {
    console.log('studentclaim1');
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
      console.log('student is older than 15');
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


    // extra details for students 
    if (("studentFlow" in localStorage) || "claimantFlow" in localStorage) {
      $('.btnNext').prop('onclick', null);
      $('.btnNext').click(function () {
        window.location.href = 'studentclaim1a';
      });
    }


    $('input[name=gender]').change(function () {
      if (localStorage.getItem('studentAge') > 15) {
        $(".pt-partneredRelationship").show();
      }
      else {
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
          window.location.href = 'studentclaim3';
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
  if (window.location.pathname === "/studentclaim1a") {
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
      }
      else {
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
          window.location.href = 'studentclaim3';
        });
      } else {
        $('.btnNext').prop('onclick', null);
        $('.btnNext').click(function () {
          window.location.href = 'studentclaim2';
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


  if (window.location.pathname === "/studentclaim2") {
    // Page 2 
    initStudents();
    initFlow();
    $(".pt-showIfHomeless").hide();
    $(".pt-showIfRequireRentAssistance").hide();
    $(".pt-showIfRenting").hide();
    $(".pt-showIfNotRentLandLord").hide();
    $(".pt-typeOfAccommodationPaymentOther").hide();
    $(".pt-rentPayed").hide();
    $(".pt-showIfAdditionalAddress").hide();
    $(".pt-showIfLivingAway").hide();
    $(".pt-showIfBoarding").hide();
    $(".pt-boardPaid").hide();
    $(".pt-showIfOther").hide();


    if ((localStorage.getItem('studentLivingLocation') === 'at-home')
      || (localStorage.getItem('studentLivingWithPartner') === 'yes')
      || (localStorage.getItem('studentAge') < 16)) {
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


    $('input[name=typeOfAccommodationPayment]').change(function () {
      if ($('input[name=typeOfAccommodationPayment]:checked').val() === 'other') {
        $(".pt-typeOfAccommodationPaymentOther").show('fast');
      } else {
        $(".pt-typeOfAccommodationPaymentOther").hide();
      }
    });

    $('input[name=sameAsPostal]').change(function () {

      if ($(this).is(':checked')) {
        $(".pt-showIfAdditionalAddress").hide();
      } else {
        $(".pt-showIfAdditionalAddress").show();
      }
    });

  }

  if (window.location.pathname === "/studentclaim3") {
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

      }
      else if (selected_option === 'secondary') {

        $(".pt-noLongerEligible").hide();
        $(".pt-showIfTertiary").hide();
        $(".pt-showIfPrimary").hide();

        $(".pt-showIfSecondary").show();

        localStorage.removeItem('studentLevelOfStudy');
        localStorage.setItem('studentLevelOfStudy', 'secondary');

        $(".pagination").find('button').prop('disabled', false);
      }
      else if ((selected_option === 'tertiary') || (selected_option === 'apprenticeship')) {
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
      } else {
        localStorage.removeItem('enrolStatus');
        localStorage.setItem('enrolStatus', true);
        $(".pt-noLongerEligibleTwo").hide();
        $(".pt-showIfEnrolled").show();
      }
    });
  }

  if (window.location.pathname === "/studentclaimupload") {
    initStudents();
  }

  if (window.location.pathname === "/studentclaim4") {
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


    // if student 16 or 17 ask for TFN
    if (("claimantFlow" in localStorage) || ("veteranFlow" in localStorage)) {
      if ((localStorage.getItem('studentAge') < 18) && (localStorage.getItem('studentAge') > 15)) {
        $(".pt-showIfStudentBetween16and18").show();
      } else {
        $(".pt-showIfStudentBetween16and18").hide();
      }
    }


    if (localStorage.getItem('studentAge') > 15) {
      console.log('mature student');
      $('.pt-studentAge--mature').show();
    }


    $("#percentageCare").focusout(function () {
      if (this.value < 0 || this.value > 100) {
        $(this).closest('.form-group').addClass('has-error');
        $(this).prev('label').append('<label class="input-error-message">Please enter a percentage between 0 and 100</label>');
        return;
      } else {
        $(this).closest('.form-group').removeClass('has-error');
        $(this).prev('label').empty();
        $(this).prev('label').html(question.id26b);
      }


    });

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
        $(".pt-showIfNoStudentTFN").show('fast');
        $(".pt-showIfStudentTFN").hide();
      }
    });




  }

  if (window.location.pathname === "/studentclaim6") {
    initStudents();

    $(".pt-showIfNoStudentTFN").hide();

    if (!(localStorage.getItem('studentHasTFN')) && (localStorage.getItem('studentAge') > 15)) {
      $(".pt-showIfNoStudentTFN").show();
    }

    var businessDays = 5, counter = 1; // set to 1 to count from next business day
    while (businessDays > 0) {
      var tmp = new Date();
      tmp.setDate(tmp.getDate() + counter++);
      switch (tmp.getDay()) {
        case 0: case 6: break;// sunday & saturday
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
      console.log('remove Proof of enrolment ' + this);
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


    // No more TFN
    // if (this.type === 'student') {

    //   if (localStorage.getItem('studentTFN') === 'true') {
    //     var i = this.docsRequired.indexOf("noTFN");
    //     if (i != -1) {
    //       this.docsRequired.splice(i, 1);
    //     }

    //     this.docsRequired.indexOf("tFNDeclaraion") === -1 ? this.docsRequired.push("tFNDeclaraion") : console.log();

    //   } else {
    //     var i = this.docsRequired.indexOf("tFNDeclaraion");
    //     if (i != -1) {
    //     	this.docsRequired.splice(i, 1);
    //     }
    //     this.docsRequired.indexOf("noTFN") === -1 ? this.docsRequired.push("noTFN") : console.log();
    //   }
    // }

    // show all required docs 
    if (this.docsRequired.length > 0) {
      jQuery(".pt-showIfDocumentUploadShoppingCart").show();
      $.each(this.docsRequired, function () {
        // console.log('docs required = ' + this);
        $('.pt-' + this).removeClass('display-none');
      });
    }

  };

  // create a new person
  var counter = new Person();


  // PoC file upload for prototype
  // TODO:: handle cancel 
  // TODO:: add additional items 
  ; (function (document, window, index) {
    var inputs = document.querySelectorAll('.file-upload__input');
    Array.prototype.forEach.call(inputs, function (input) {
      var label = input.nextElementSibling,
        labelVal = label.innerHTML;

      // removeEvent(label.querySelectorAll('button'), 'click', foo);
      console.log(label.querySelectorAll('button'));


      input.addEventListener('change', function (e) {
        var fileName = '';

        fileName = e.target.value.split('\\').pop();

        console.log('fileName');
        console.log(fileName);

        if (fileName) {
          label.querySelector('.file-upload__file-name').innerHTML = fileName;
          label.querySelector('.file-upload__file-name').classList.add('file-upload__file-name--uploaded');
          label.querySelector('.uikit-btn').innerHTML = 'Remove';
          label.querySelector('.uikit-btn').classList.add('uikit-btn--tertiary');

          $('.file-upload--add').show();

          var status = label.querySelector('.file-upload__file-name').closest('tr');

          status = status.querySelector('.file-status');
          status.innerHTML = 'Remove';
          status.innerHTML = '<span class="sr"> Uploaded</span>';
          status = status.classList;
          status.remove('file-status--required');
          status.add('file-status--uploaded');

        } else {

          label.innerHTML = labelVal;
        }
      });

      // Firefox bug fix
      // input.addEventListener('focus', function () { input.classList.add('has-focus'); });
      // input.addEventListener('blur', function () { input.classList.remove('has-focus'); });
    });
  }(document, window, 0));


  $(".accordion__trigger").click(function () {

    $(this).toggleClass("accordion__trigger--open accordion__trigger--closed");
    $(this).closest(".accordion").toggleClass("accordion--closed accordion--open");

  });

});
