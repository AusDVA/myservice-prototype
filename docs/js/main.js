'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

jQuery(document).ready(function ($) {
	// open the panel
	$('.panel-btn').on('click', function (event) {
		event.preventDefault();
		$('.panel').addClass('is-visible');
		$("#email").focus();
	});
	// close the panel
	$('.panel').on('click', function (event) {
		if ($(event.target).is('.panel') || $(event.target).is('.panel-close')) {
			$('.panel').removeClass('is-visible');
			event.preventDefault();
		}
	});
	// open help panel on unauth screen
	$('.panel-help').on('click', function (event) {
		event.preventDefault();
		$('.panel-home-help').addClass('is-visible');
	});
	// close the help panel
	$('.panel-home-help').on('click', function (event) {
		if ($(event.target).is('.panel-home-help') || $(event.target).is('.panel-close')) {
			$('.panel-home-help').removeClass('is-visible');
			event.preventDefault();
		}
	});

	// open vvcs panel
	$('.vvcs-panel-btn').on('click', function (event) {
		event.preventDefault();
		$('.panel-vvcs').addClass('is-visible');
	});
	// close the vvcs panel
	$('.panel-vvcs').on('click', function (event) {
		if ($(event.target).is('.panel-vvcs') || $(event.target).is('.panel-close')) {
			$('.panel-vvcs').removeClass('is-visible');
			event.preventDefault();
		}
	});

	// open feedback panel
	$('.feedback-panel-btn').on('click', function (event) {
		event.preventDefault();
		$('.panel-feedback').addClass('is-visible');
	});
	// close the feedback panel
	$('.panel-feedback').on('click', function (event) {
		if ($(event.target).is('.panel-feedback') || $(event.target).is('.panel-close')) {
			$('.panel-feedback').removeClass('is-visible');
			event.preventDefault();
		}
	});

	// Help slide gesture
	var panels = $('.panel');
	panels.map(function (index, panel) {
		var panelContainer = $(panel).find('.panel-container');
		var panelHeader = $(panel).find('.panel-header');
		var originX = 0;
		var lastX = 0;
		var dragging = false;
		var uiBunch = panelContainer.add(panelHeader);
		uiBunch.on('mousedown touchstart', function (event) {
			if (!dragging && !$(event.target).is('.panel-close')) {
				dragging = true;
				originX = event.screenX || event.targetTouches[0].screenX;
				lastX = originX;
			}
		});
		uiBunch.on('mousemove touchmove', function (event) {
			if (dragging) {
				lastX = event.screenX || event.targetTouches[0].screenX;
				var newX = lastX - originX;
				if (newX >= 0) uiBunch.css({ right: -newX + 'px' });
			}
		});
		uiBunch.on('mouseup touchend', function (event) {
			if (dragging && !$(event.target).is('.panel-close')) {
				dragging = false;
				var newX = (event.screenX || lastX) - originX;
				if (newX > panelContainer[0].offsetWidth * 0.25) {
					$(panel).removeClass('is-visible').addClass('swipe-closing');
					window.setTimeout(function () {
						$(panel).removeClass('swipe-closing');
						uiBunch.css({ right: '' });
					}, 400);
				} else {
					uiBunch.css({ right: '0px', transition: 'right 0.3s' });
					window.setTimeout(function () {
						uiBunch.css({ transition: '' });
					}, 300);
				}
			}
		});
	});

	// Toast mockup
	$(".call-toast").on("click", function () {
		var randomWToastTypes = ["success", "information", "alert", "error"];
		var randomWords = ["ink Fairy Armadillo", "Okapi", "Glaucus Atlanticus", "The Maned Wolf", "Fossa", "Iguana"];
		function getRandomArbitrary(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}
		var randInt = getRandomArbitrary(4);
		var animal = randomWords[randInt];
		var toastType = randomWToastTypes[randInt];

		document.body.setAttribute('tabindex', '0');
		document.body.focus();
		document.body.removeAttribute('tabindex');

		var now = new Date().toLocaleString();

		jQuery('.toast-container').append('<button class="uikit-btn toast" role="alert" type="button"><div class="toast__type toast__type--' + toastType + '"><span class="sr">' + toastType + '</span></div><div class="toast__message"><p>You added a ' + animal + ' at ' + now + '</p></div></button>');

		jQuery(".toast-container").show();
	});

	jQuery(".toast-container").on("click", "button", function (event) {
		jQuery(this).hide();
	});

	// Student claim pages
	// TODO:: this would be better placed in a separate file
	if ("veteranFlow" in localStorage) {
		$(".pt-flow--veteran").show("fast");
	}

	if ("studentFlow" in localStorage) {
		$(".pt-flow--student").show("fast");
	}

	if ("claimantFlow" in localStorage) {
		$(".pt-flow--claimant").show("fast");
	}

	// Student questions 
	if ("studentFlow" in localStorage) {
		var question = {
			pageheader1: "Personal details	",
			pageheader1a: "Veterans details",
			pageheader1b: "Student details",
			id1: "Title",
			id2: "First name",
			id3: "Last name",
			id4: "Date of birth  <span class='hint'>(DD / MM / YYYY)</span>",
			id5: "",
			id5a: "",
			id6: "",
			id7: "Are you in a recognised partnered relationship?",
			id8: "Will you be living at the same address with your partner while you're studying?",
			id8a: "[TEXT TBD] You will be eligible for a lesser payment",
			id9: "",
			id9a: "",
			id9b: "Provide any supporting documents to prove your relationship to the student.",
			id10: "Student's level of study",
			id10a: "[TEXT TBD] You are no longer eligible",
			id11: "Grade This Year",
			id12: "Name of School",
			id13: "School address",
			id14: "School phone number",
			id15: "What type of education will you be studying this year?",
			id16: "Where are you studying?",
			id17: "Course name / Degree name",
			id18: "Course Code  / Degree code",
			id19: "Date you started or plan to start studying <span class='hint'>(DD / MM / YYYY)</span>",
			id20: "Date you plan to complete your studies <span class='hint'>(MM / YYYY)</span>",
			id21: "Are you studying full time?",
			id21b: "When do you intend on returning to full-time study? (optional)  <span class='hint'>(MM / YYYY)</span>",
			id21c: "Have you enrolled?",
			id21ci: "Please notify DVA when you have enrolled. You may continue to submit the claim, although the claim will not be received without proof of enrolment.",
			id21u: "Please provide evidence to explain why you study part-time",
			id22: "Is this your current address?",
			id23: "Will you be living at your parents home while studying?",
			id23a: "What best describes your situation?",
			id23ai: "[TEXT TBD] The DVA can assist you",
			id24: "Do you need rent assistance? <span class='hint'>(optional)</span>",
			id24a: "Do you have your rental details?",
			id24a1: "When will  you be living at the rental address <span class='hint'>(DD / MM / YYYY)</span>",
			id24a2: "When does the your rental agreement end? <span class='hint'>(DD / MM / YYYY)</span>",
			id24a3: "What type of payment do you make for accommodation?",
			id24a3a: "Please provide details...",
			id24a4: "Name of person or agency you pay rent to",
			id24a5: "Email address",
			id24a6: "Contact number",
			id24a7: "How much do you pay per fortnight?  ",
			id24a8: "Are you sharing your accommodation with anyone else?",
			id24a9: "Are meals included in the accommodation costs?",
			id24a9a: "How much of the payment is for meals?  ",
			id25: "Provide any supporting documents, for example rental agreement",
			id26: "Who receives the Family Tax Benefit for the student?",
			id26a: "What is your Customer Reference Number (optional)",
			id26b: "What percentage do you care for your child?",
			id26b1: "[Text TBD] You may not be eligible",
			id26b2: "[Text TBD] The other care giver may not be eligible",
			id26c: "What is the name of the other care giver? (optional)",
			id26d: "What are the contact details for the other care giver? (optional)",
			id27: "Your Tax File Number",
			id28: "Would you like to have the your education allowance taxed?  ",
			id28a: "How much do you pay per fortnight? ",
			id28ai: "Payments will be made directly to these bank account details.",
			id29: "Account Name",
			id30: "BSB",
			id31: "Account Number",
			id32: "Are you studying full time or planning to study full time?",
			id33a: "Are you or were you cared for by a veteran who is significantly injured or deceased?",
			id33b: "Are you a veteran who is significantly injured as a result of your service?",
			id34: "Are you applying for a student?",
			id35: "Do you provide care for the student or receive the Family Tax Benefit for them?",
			id36: "Is the student the dependant of a veteran who is significantly injured or deceased?",
			id37: "You are eligible to apply for student support payments.",
			id38: "You may need to provide more evidence to apply for student support payments.",
			id39: "You are not eligible for student support payments. For more information call 133 254.",
			id40: "Are you a student, or carer claiming on behalf of a student?",
			id41: "Veterans Title",
			id42: "Veterans First name",
			id43: "Veterans Last name",
			id44: "Veterans Date of Birth",
			id45: "DVA file number",
			id46: "PMKeyS ID (preferred)",
			id47: "Your relationship to the veteran",
			id48: "Please provide a brief statement explaining how you came into the veterans care. ",
			id49: "Student's parent/family status"

		};
	}

	if ("veteranFlow" in localStorage || "claimantFlow" in localStorage) {
		var _question;

		var question = (_question = {
			pageheader1: "Student details	",
			id1: "Student's Title",
			id2: "Student's given name <span class='hint'>(First name)</span>",
			id3: "Student's surname <span class='hint'>(Last name)</span>",
			id4: "Student's date of birth  <span class='hint'>(DD / MM / YYYY)</span>",
			id5: "Your relationship to the student",
			id5a: "Provide a brief statement explaining how the student came into your care. ",
			id6: "Is the student employed full time?",
			id7: "",
			id8: "",
			id8a: "",
			id9: "What is the Veteran/Member's relationship to the student?",
			id9a: "Provide a brief statement explaining how the student came into your care. ",
			id9b: "Provide any supporting documents to prove your relationship to the student.",
			id10: "Level of study",
			id10a: "[TEXT TBD] You are no longer eligible",
			id11: "Grade This Year",
			id12: "Name of School",
			id13: "School address",
			id14: "School phone number",
			id15: "What type of education will the student be studying this year?",
			id16: "Where is James studying?",
			id17: "Course name / Degree name",
			id18: "Course Code  / Degree code",
			id19: "Date the student started or plan to start studying <span class='hint'>(DD / MM / YYYY)</span>",
			id20: "Date the student plans to complete their studies <span class='hint'>(  MM / YYYY)</span>",
			id21: "Is James studying full time?",
			id21b: "When do you intend on returning to full-time study? <span class='hint'>(optional)</span>  <span class='hint'>(  MM / YYYY)</span>",
			id21c: "Is James enrolled?",
			id21ci: "Please notify DVA when you have enrolled. You may continue to submit the claim, although the claim will not be received without proof of enrolment.",
			id21u: "Please provide evidence to explain why the student is studying part-time",
			id22: "Is this the student’s address? ",
			id23: "Is the student living away from home to study?",
			id23a: "What best describes the student’s situation? ",
			id23ai: "[TEXT TBD] The DVA can assist you",
			id24: "Is the student renting? ",
			id24a: "Do you know the student's rental details?",
			id24a1: "When will the student be living at the rental address <span class='hint'>(DD / MM / YYYY)</span>",
			id24a2: "When does the student's rental agreement end? <span class='hint'>(DD / MM / YYYY)</span>",
			id24a3: "What type of payment does the student make for accommodation?",
			id24a4: "Name of person or agency the student pays rent to",
			id24a5: "Email address",
			id24a6: "Contact number",
			id24a7: "How much does the student pay per fortnight?",
			id24a8: "Is the student sharing accommodation with anyone else?",
			id24a9: "Are meals included in the accommodation costs?",
			id24a9a: "How much of the payment is for meals?  "
		}, _defineProperty(_question, 'id24', ""), _defineProperty(_question, 'id25', "Provide any supporting documents, for example rental agreement"), _defineProperty(_question, 'id26', "Who receives the Family Tax Benefit for the student?"), _defineProperty(_question, 'id26a', "What is their Customer Reference Number <span class='hint'>(optional)</span>"), _defineProperty(_question, 'id26b', "What is the percentage care of a parent?"), _defineProperty(_question, 'id26b1', "[Text TBD] You may not be eligible"), _defineProperty(_question, 'id26b2', "[Text TBD] The other care giver may not be eligible"), _defineProperty(_question, 'id26c', "What is the name of the other care giver? <span class='hint'>(optional)</span>"), _defineProperty(_question, 'id26d', "What are the contact details for the other care giver? <span class='hint'>(optional)</span>"), _defineProperty(_question, 'id27', "Student's Tax File Number"), _defineProperty(_question, 'id28', "Would you like to have the student's  education allowance taxed?  "), _defineProperty(_question, 'id28a', "How much does the student pay per fortnight?  "), _defineProperty(_question, 'id28ai', "Payments will be made directly to these bank account details.	"), _defineProperty(_question, 'id29', "Account Name"), _defineProperty(_question, 'id30', "BSB"), _defineProperty(_question, 'id31', "Account Number"), _defineProperty(_question, 'id32', ""), _defineProperty(_question, 'id33a', ""), _defineProperty(_question, 'id33b', "Are you a veteran who is significantly injured as a result of your service?"), _defineProperty(_question, 'id34', "Are you applying for a student?"), _defineProperty(_question, 'id35', "Do you provide care for the student or receive the Family Tax Benefit for them?"), _defineProperty(_question, 'id36', ""), _defineProperty(_question, 'id37', "You are eligible to apply for student support payments."), _defineProperty(_question, 'id38', "You may need to provide more evidence to apply for student support payments."), _defineProperty(_question, 'id39', "You are not eligible for student support payments. For more information call 133 254."), _defineProperty(_question, 'id40', "Are you a student, or carer claiming on behalf of a student?"), _defineProperty(_question, 'id41', "Veterans Title"), _defineProperty(_question, 'id42', "Veterans First name"), _defineProperty(_question, 'id43', "Veterans Last name"), _defineProperty(_question, 'id44', "Veterans Date of Birth"), _defineProperty(_question, 'id45', "DVA file number"), _defineProperty(_question, 'id46', "PMKeyS ID (preferred)"), _defineProperty(_question, 'id47', "Your relationship to the veteran"), _defineProperty(_question, 'id49', "James' parents are;"), _question);
	}

	if ("claimantFlow" in localStorage) {
		question.id5 = "What is the Veteran's relationship to the student?";
		question.id5a = "Provide a brief statement explaining how the student came into the veterans care. ";
		question.id9 = "What is the Veteran's relationship to the student?";
		question.id47 = "The students relationship to the veteran";
		question.id33b = "Is the student the dependant of a veteran who is significantly injured or deceased?";
		question.id35 = "Does the Veteran provide care for the student or receive the Family Tax Benefit for them?";
		question.id36 = "";
		question.id48 = "Please provide a brief statement explaining how the student came into the veterans care. ";
		question.pageheader1 = "Student and veteran details	";
		question.pageheader1a = "Veterans details";
		question.pageheader1b = "Student details";
	}

	for (var key in question) {
		$("#question_" + key).html(question[key]);
	}

	// Student landing page
	if (window.location.pathname === "/student-assistance-landing") {
		console.log('Student landing page');

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

		localStorage.clear();
		var flow = getUrlParameter('flow');
		var age = getUrlParameter('studentAge');
		var docUploads = getUrlParameter('docUploads');

		if (flow) {
			localStorage.setItem(flow, true);
			if (age) {
				localStorage.setItem('studentAge', age);
			}
			if (docUploads) {
				localStorage.setItem('docUploads', docUploads);
			}
		} else {
			alert('The prototype requires a flow and age in the url string e.g.  ' + location.protocol + '//' + location.host + location.pathname + '?flow=studentFlow&studentAge=10');
		}
	}

	// All student pages 
	if (window.location.href.indexOf("student") > -1) {

		console.log('All student pages');
		$(".pt-showIfDocumentUploadShoppingCart").hide();
		if (localStorage.getItem('docUploads') === 'shopping') {
			$(".pt-showIfDocumentUploadShoppingCart").show();
		}

		$(".upload-list").show();
	}

	if (window.location.pathname === "/studentpreeligibility") {
		var eligible = function eligible() {
			console.log('checking eligible status');

			console.log('fullTimeStudy ' + localStorage.getItem('fullTimeStudy'));
			console.log('veteranSignificantlyInjured ' + localStorage.getItem('veteranSignificantlyInjured'));
			console.log('careForStudentOrFTB ' + localStorage.getItem('careForStudentOrFTB'));
			// console.log('studentFlow ' + localStorage.getItem('studentFlow'));
			// console.log('veteranFlow ' + localStorage.getItem('veteranFlow'));
			// console.log('claimantFlow ' + localStorage.getItem('claimantFlow'));

			if (localStorage.getItem('studentFlow') === 'true') {
				console.log('IS STUDENT');
				if (localStorage.getItem('veteranSignificantlyInjured') === 'true' && localStorage.getItem('fullTimeStudy') === 'true') {
					$(".pt-outcome--yes").show();
					$(".pt-outcome--no, .pt-outcome--maybe").hide();
				} else if (localStorage.getItem('veteranSignificantlyInjured') === 'true' && localStorage.getItem('fullTimeStudy') === 'false') {
					$(".pt-outcome--maybe").show();
					$(".pt-outcome--no, .pt-outcome--yes").hide();
				} else if (localStorage.getItem('veteranSignificantlyInjured') === 'false' && localStorage.getItem('fullTimeStudy') === 'true') {
					$(".pt-outcome--maybe").show();
					$(".pt-outcome--no, .pt-outcome--yes").hide();
				}
			} else if (localStorage.getItem('veteranFlow') === 'true' || localStorage.getItem('claimantFlow') === 'true') {

				if (localStorage.getItem('veteranSignificantlyInjured') === 'true' && localStorage.getItem('realStudent') === 'true' && localStorage.getItem('careForStudentOrFTB') === 'true') {
					$(".pt-outcome--yes").show();
					$(".pt-outcome--no, .pt-outcome--maybe").hide();
				} else if (localStorage.getItem('realStudent') === 'false') {
					$(".pt-outcome--no").show();
					$(".pt-outcome--yes, .pt-outcome--maybe").hide();
				} else if (localStorage.getItem('veteranSignificantlyInjured') === 'true' && localStorage.getItem('realStudent') === 'true' && localStorage.getItem('careForStudentOrFTB') === 'true') {
					$(".pt-outcome--yes").show();
					$(".pt-outcome--no, .pt-outcome--maybe").hide();
				} else if (localStorage.getItem('veteranSignificantlyInjured') === 'false' && localStorage.getItem('realStudent') === 'true' && localStorage.getItem('careForStudentOrFTB') === 'true') {
					$(".pt-outcome--maybe").show();
					$(".pt-outcome--no, .pt-outcome--yes").hide();
				} else if (localStorage.getItem('veteranSignificantlyInjured') === 'true' && localStorage.getItem('realStudent') === 'true' && localStorage.getItem('careForStudentOrFTB') === 'false') {
					$(".pt-outcome--maybe").show();
					$(".pt-outcome--no, .pt-outcome--yes").hide();
				} else if (localStorage.getItem('veteranSignificantlyInjured') === 'false' && localStorage.getItem('realStudent') === 'true' && localStorage.getItem('careForStudentOrFTB') === 'false') {
					$(".pt-outcome--maybe").show();
					$(".pt-outcome--no, .pt-outcome--yes").hide();
				} else {
					$(".pt-outcome--no, .pt-outcome--yes, .pt-outcome--maybe").hide();
				}
			}
		};

		// Page eligibility
		$(".pt-outcome").hide();
		$(".pt-showIfStudentConfirm").hide();
		$(".pt-showIfClaimantConfirm").hide();
		$(".pt-showIfStudentVeteranInjured").hide();

		if (localStorage.getItem('studentAge') > 15 && localStorage.getItem('studentAge') < 18) {

			$(".pt-flow--confirmStudentOrClaimant").hide();
			$(".pt-showIfStudentVeteranInjured").show();
			localStorage.setItem('studentFlowConfirmed', true);
		}

		$('input[name=eligibilityPersonType]').change(function () {
			if ($('input[name=eligibilityPersonType]:checked').val() === 'student') {

				$(".pt-showIfStudentConfirm").show();
				$(".pt-showIfStudentVeteranInjured").show();

				if (localStorage.getItem('claimantFlow')) {
					localStorage.removeItem('claimantFlow');
					localStorage.removeItem('claimantFlowConfirmed');
					localStorage.setItem('studentFlow', true);
					localStorage.setItem('studentFlowConfirmed', true);
					window.location.reload(true);
				}
			} else if ($('input[name=eligibilityPersonType]:checked').val() === 'carer') {

				$(".pt-showIfClaimantConfirm").show();

				if (localStorage.getItem('studentFlow')) {
					localStorage.removeItem('studentFlow');
					localStorage.removeItem('studentFlowConfirmed');
					localStorage.setItem('claimantFlow', true);
					localStorage.setItem('claimantFlowConfirmed', true);
					window.location.reload(true);
				}
			}
		});

		// show all for veterans 
		if (localStorage.getItem('veteranFlow')) {
			$(".pt-showIfClaimantConfirm").show();
		}

		if (localStorage.getItem('claimantFlowConfirmed')) {
			$('#eligibilityPersonType-carer').prop('checked', true);
		}

		if (localStorage.getItem('studentFlowConfirmed')) {
			$('#eligibilityPersonType-student').prop('checked', true);
		}

		$('input[name=eligibilityPersonType]').trigger("change");

		// student only flow
		// TODO: refactor!  
		$('input[name=eligibilityFullTimeStudy]').change(function () {
			if ($('input[name=eligibilityFullTimeStudy]:checked').val() === 'full-time') {
				localStorage.removeItem('fullTimeStudy');
				localStorage.setItem('fullTimeStudy', true);
				localStorage.removeItem('studentLoadOfStudy');
				localStorage.setItem('studentLoadOfStudy', 'full-time');
			} else if ($('input[name=eligibilityFullTimeStudy]:checked').val() === 'part-time') {
				localStorage.removeItem('fullTimeStudy');
				localStorage.setItem('fullTimeStudy', false);
				localStorage.removeItem('studentLoadOfStudy');
				localStorage.setItem('studentLoadOfStudy', 'part-time');
			}
			eligible();
		});

		$('input[name=eligibilityCaredForByVeteran]').change(function () {
			if ($('input[name=eligibilityCaredForByVeteran]:checked').val() === 'yes') {

				localStorage.removeItem('veteranSignificantlyInjured');
				localStorage.setItem('veteranSignificantlyInjured', true);
			} else if ($('input[name=eligibilityCaredForByVeteran]:checked').val() === 'no') {

				localStorage.removeItem('veteranSignificantlyInjured');
				localStorage.setItem('veteranSignificantlyInjured', false);
			}

			eligible();
		});

		// veteran and claimant flow 
		$('input[name=eligibilityVeteranSignificantlyInjured]').change(function () {
			if ($('input[name=eligibilityVeteranSignificantlyInjured]:checked').val() === 'yes') {
				localStorage.setItem('veteranSignificantlyInjured', true);
			} else if ($('input[name=eligibilityVeteranSignificantlyInjured]:checked').val() === 'no') {

				localStorage.removeItem('veteranSignificantlyInjured');
				localStorage.setItem('veteranSignificantlyInjured', false);
			}
			eligible();
		});

		$('input[name=eligibilityStudentFullTimeStudy]').change(function () {
			if ($('input[name=eligibilityStudentFullTimeStudy]:checked').val() === 'yes') {
				localStorage.setItem('realStudent', true);
			} else if ($('input[name=eligibilityStudentFullTimeStudy]:checked').val() === 'no') {
				localStorage.removeItem('realStudent');
				localStorage.setItem('realStudent', false);
			}
			eligible();
		});

		$('input[name=eligibilityCareForStudentOrFTB]').change(function () {
			if ($('input[name=eligibilityCareForStudentOrFTB]:checked').val() === 'yes') {
				localStorage.setItem('careForStudentOrFTB', true);
			} else if ($('input[name=eligibilityCareForStudentOrFTB]:checked').val() === 'no') {
				localStorage.removeItem('careForStudentOrFTB');
				localStorage.setItem('careForStudentOrFTB', false);
			}
			eligible();
		});
	}

	if (window.location.pathname === "/studentclaim1") {
		// Page 1
		$(".pt-studentAge--mature").hide();
		$(".pt-showIfStudentLivingAtHome").hide();
		$(".pt-studentLivingSameAddress").hide();
		$(".pt-studentLivingWithPartnerLessRate").hide();
		$(".upload-list").show();

		$("#firstName").focusout(function () {
			if ($(this).val()) {
				localStorage.removeItem('studentName');
				localStorage.setItem('studentName', $(this).val());
			} else {
				localStorage.removeItem('studentName');
			}
		});

		$('input[name=studyAwayFromHomeRadio]').change(function () {

			if ($('input[name=studyAwayFromHomeRadio]:checked').val() === 'yes') {
				$(".pt-showIfLivingAway").show('fast');
				$(".pt-showIfNoPartner").hide();

				localStorage.removeItem('studyAwayFromHome');
				localStorage.setItem('studyAwayFromHome', true);

				if (localStorage.getItem('studentPartneredRelationship') === 'no') {
					$(".pt-showIfNoPartner").show('fast');
				}
			} else {
				$(".pt-showIfLivingAway").hide();
				$(".pt-showIfNoPartner").hide();
				localStorage.removeItem('studyAwayFromHome');

				// skip the living arrangment details 
				$('.btnNext').click(function () {
					event.stopPropagation();
					window.location.href = 'studentclaim3';
				});
			}
		});

		$('input[name=engagedInFullTimeEmployment]').change(function () {
			$(".pt-showIfStudentLivingAtHome").show();
		});

		// Calculate student age
		$(".pt-student-dob > :input").focusout(function () {
			var dobDay = $("#dd-date").val();
			var dobMonth = $("#mm-date").val();
			var dobYear = $("#yyyy-date").val();

			if (dobDay && dobMonth && dobYear) {
				var dob = dobYear + '-' + dobMonth + '-' + dobDay;
				dob = new Date(dob);
				var today = new Date();
				var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
				console.log(age + ' years old');
				localStorage.removeItem('studentAge');
				localStorage.setItem('studentAge', age);

				// TODO: handle state better and make this a separate function 
				if (localStorage.getItem('studentAge') > 15) {

					if ("veteranFlow" in localStorage) {
						$(".pt-studentAge--mature").each(function () {
							if ($(this).is(".pt-flow--veteran")) {
								$(this).show("fast");
							}
						});
					}

					if ("studentFlow" in localStorage) {
						$(".pt-studentAge--mature").each(function () {
							if ($(this).is(".pt-flow--student")) {
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
				} else {
					$(".pt-studentAge--mature").hide("slow");
				}
			}
		});

		if (localStorage.getItem('studentAge') > 15) {

			if ("veteranFlow" in localStorage) {
				$(".pt-studentAge--mature").each(function () {
					if ($(this).is(".pt-flow--veteran")) {
						$(this).show("fast");
					}
				});
			}

			if ("studentFlow" in localStorage) {
				$(".pt-studentAge--mature").each(function () {
					if ($(this).is(".pt-flow--student")) {
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
		} else {
			$(".pt-studentAge--mature").hide("slow");
		}

		$('input[name=studentLivingWithPartner]').change(function () {
			if ($('input[name=studentLivingWithPartner]:checked').val() === 'yes') {
				$(".pt-studentLivingWithPartnerLessRate").show();
			} else {
				$(".pt-studentLivingWithPartnerLessRate").hide();
			}
		});

		$('input[name=studentPartneredRelationship]').change(function () {
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
			if (selected_option === 'other') {
				$('#relationshipToVeteranOther').show("fast");
			} else {
				$('#relationshipToVeteranOther').hide("slow");
			}
		});

		$("#relationshipToStudent").change(function () {
			var selected_option = $('#relationshipToStudent').val();
			if (selected_option === 'other') {
				$('#relationshipToStudentOther').show("fast");
			} else {
				$('#relationshipToStudentOther').hide("slow");
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
	}

	if (window.location.pathname === "/studentclaim2") {
		// Page 2

		$(".pt-showIfHomeless").hide();
		$(".pt-showIfRequireRentAssistance").hide();
		$(".pt-showIfRentAssistanceKnown").hide();
		$(".pt-showIfNotRentLandLord").hide();
		$(".pt-typeOfAccommodationPaymentOther").hide();
		$(".pt-showIfLivingAway").hide();

		$(".pt-showIfNotPrimaryStudent").show();

		$("#studyAwayFromHomeExplanation").change(function () {
			var selected_option = $('#studyAwayFromHomeExplanation').val();
			if (selected_option === 'homeless') {
				$(".pt-showIfHomeless").show('fast');
			} else {
				$(".pt-showIfHomeless").hide();
			}
		});

		$('input[name=requireRentAssistanceRadio]').change(function () {
			if ($('input[name=requireRentAssistanceRadio]:checked').val() === 'yes') {
				$(".pt-showIfRequireRentAssistance").show('fast');
			} else {
				$(".pt-showIfRequireRentAssistance").hide();
			}
		});

		$('input[name=knowRentalDetails]').change(function () {
			if ($('input[name=knowRentalDetails]:checked').val() === 'yes') {
				$(".pt-showIfRentAssistanceKnown").show('fast');
			} else {
				$(".pt-showIfRentAssistanceKnown").hide();
			}
		});

		$('input[name=typeOfAccommodationPayment]').change(function () {
			if ($('input[name=typeOfAccommodationPayment]:checked').val() === 'private') {
				$(".pt-showIfNotRentLandLord").hide();
			} else {
				$(".pt-showIfNotRentLandLord").show();
			}
		});

		$('input[name=typeOfAccommodationPayment]').change(function () {
			if ($('input[name=typeOfAccommodationPayment]:checked').val() === 'other') {
				$(".pt-typeOfAccommodationPaymentOther").show('fast');
			} else {
				$(".pt-typeOfAccommodationPaymentOther").hide();
			}
		});
	}

	if (window.location.pathname === "/studentclaim3") {
		// page 3
		$(".pt-showIfNotPrimaryStudent").hide();
		$(".pt-showIfPrimary").hide();
		$(".pt-showIfSecondary").hide();
		$(".pt-showIfTertiary").hide();
		$(".pt-showIfPartTime").hide();
		$(".pt-noLongerEligible").hide();
		$(".pt-noLongerEligibleTwo").hide();
		$(".pt-showIfStudyLoadNotAnswered").hide();
		$(".pt-showIfEnrolled").hide();

		if (localStorage.getItem('studentLevelOfStudy') !== 'primary') {
			$(".pt-showIfNotPrimaryStudent").show('fast');
		}

		$("#studentLevelOfStudy").change(function () {
			var selected_option = $('#studentLevelOfStudy').val();
			console.log('input studentLevelOfStudy changed to ' + $("#studentLevelOfStudy").val());
			var grade_options;

			if (selected_option === 'primary') {
				console.log(' selected_option = ' + selected_option);

				$(".pt-noLongerEligible").hide();
				$(".pt-showIfSecondary").hide();
				$(".pt-showIfTertiary").hide();
				$(".pt-showIfPrimary").show('fast');

				localStorage.removeItem('studentLevelOfStudy');
				localStorage.setItem('studentLevelOfStudy', 'primary');
				$(".pagination").find('button').prop('disabled', false);

				$("#studentGradeThisYearSelect option[value='7']").remove();
				$("#studentGradeThisYearSelect option[value='8']").remove();
				$("#studentGradeThisYearSelect option[value='9']").remove();
				$("#studentGradeThisYearSelect option[value='10']").remove();
				$("#studentGradeThisYearSelect option[value='11']").remove();
				$("#studentGradeThisYearSelect option[value='12']").remove();
			} else if (selected_option === 'secondary') {
				console.log(' selected_option = ' + selected_option);
				$(".pt-noLongerEligible").hide();
				$(".pt-showIfTertiary").hide();
				$(".pt-showIfPrimary").hide();

				$(".pt-showIfSecondary").show();

				localStorage.removeItem('studentLevelOfStudy');
				localStorage.setItem('studentLevelOfStudy', 'secondary');

				$("#studentGradeThisYearSelect option[value='0']").remove();
				$("#studentGradeThisYearSelect option[value='1']").remove();
				$("#studentGradeThisYearSelect option[value='2']").remove();
				$("#studentGradeThisYearSelect option[value='3']").remove();
				$("#studentGradeThisYearSelect option[value='4']").remove();
				$("#studentGradeThisYearSelect option[value='5']").remove();
				$("#studentGradeThisYearSelect option[value='6']").remove();

				$(".pagination").find('button').prop('disabled', false);
			} else if (selected_option === 'tertiary' || selected_option === 'apprenticeship') {
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

			// $("#studentGradeThisYearSelect").removeItem

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

		$('input[name=enroleStatus]').change(function () {
			if ($('input[name=enroleStatus]:checked').val() === 'no') {
				$(".pt-noLongerEligibleTwo").show();
				$(".pt-showIfEnrolled").hide();
			} else {
				$(".pt-noLongerEligibleTwo").hide();
				$(".pt-showIfEnrolled").show();
			}
		});
	}

	if (window.location.pathname === "/studentclaim4") {
		// Page 4
		$(".pt-showIfCentrelinkCustomer").hide();
		$('.pt-studentAge--mature').hide();
		$('.pt-showIfEducationAllowanceTaxed').hide();
		$('.pt-showIfCarePercentageLow').hide();
		$('.pt-showIfCarePercentageHigh').hide();

		if (localStorage.getItem('studentAge') > 15) {
			console.log('mature student');
			$('.pt-studentAge--mature').show();
		}

		$("#studentTFN").focusout(function () {
			if ($(this).val()) {
				localStorage.removeItem('studentTFN');
				localStorage.setItem('studentTFN', true);
			} else {
				localStorage.removeItem('studentTFN');
			}
		});

		$('input[name=whoReceivesFTB]').change(function () {
			if ($('input[name=whoReceivesFTB]:checked').val() === 'no-one' || $('input[name=whoReceivesFTB]:checked').val() === 'myself') {
				$(".pt-showIfCentrelinkCustomer").hide();
			} else {
				$(".pt-showIfCentrelinkCustomer").show('fast');
			}
		});

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

			// if (this.value < 35) {
			// 	$('.pt-showIfCarePercentageLow').show();
			// 	$('.pt-showIfCarePercentageHigh').hide();
			// }
			// else if (this.value > 65) {
			// 	$('.pt-showIfCarePercentageHigh').show();
			// 	$('.pt-showIfCarePercentageLow').hide();
			// } else {
			// 	$('.pt-showIfCarePercentageHigh').hide();
			// 	$('.pt-showIfCarePercentageLow').hide();
			// }
		});

		$('input[name=educationAllowanceTaxed]').change(function () {
			if ($('input[name=educationAllowanceTaxed]:checked').val() === 'yes') {
				$(".pt-showIfEducationAllowanceTaxed").show('fast');
			} else {
				$(".pt-showIfEducationAllowanceTaxed").hide();
			}
		});
	}

	if (window.location.pathname === "/studentclaim6") {
		// var someDate = new Date();
		// var numberOfDaysToAdd = 14;
		// someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
		// var dd = someDate.getDate();
		// var mm = someDate.getMonth() + 1;
		// var y = someDate.getFullYear();

		// var someFormattedDate = dd + '/' + mm + '/' + y;

		var businessDays = 5,
		    counter = 1; // set to 1 to count from next business day
		while (businessDays > 0) {
			var tmp = new Date();
			tmp.setDate(tmp.getDate() + counter++);
			switch (tmp.getDay()) {
				case 0:case 6:
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
		this.studentName;
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
		}, 3500);
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
		if ("studentFlow" in localStorage || "veteranFlow" in localStorage || "claimantFlow" in localStorage) {

			// Proof of relationship for all
			this.docsRequired.indexOf("proofOfRelationship") === -1 ? this.docsRequired.push("proofOfRelationship") : console.log();

			if ("studentFlow" in localStorage) {
				this.type = 'student';
			} else if ("veteranFlow" in localStorage) {
				this.type = 'veteran';
			} else if ("claimantFlow" in localStorage) {
				this.type = 'claimant';
			}
		}

		// check student age
		if ("studentAge" in localStorage) {
			this.studentAge = localStorage.getItem('studentAge');
			if (this.studentAge > 15) {
				this.docsRequired.indexOf("proofOfEnrolment") === -1 ? this.docsRequired.push("proofOfEnrolment") : console.log();
			}
		}
		// check if living away from home
		if ("studyAwayFromHome" in localStorage) {
			this.docsRequired.indexOf("proofOfResidence") === -1 ? this.docsRequired.push("proofOfResidence") : console.log();
		} else {
			var i = this.docsRequired.indexOf("proofOfResidence");
			if (i != -1) {
				this.docsRequired.splice(i, 1);
			}
		}

		// Display if  Study load == part time
		if (localStorage.getItem('studentLoadOfStudy') === 'part-time') {

			this.docsRequired.indexOf("partTimeStudyReason") === -1 ? this.docsRequired.push("partTimeStudyReason") : console.log();
		} else {
			var i = this.docsRequired.indexOf("partTimeStudyReason");
			if (i != -1) {
				this.docsRequired.splice(i, 1);
			}
		}

		if (this.type === 'student') {
			if (localStorage.getItem('studentTFN')) {
				var i = this.docsRequired.indexOf("noTFN");
				if (i != -1) {
					this.docsRequired.splice(i, 1);
				}

				this.docsRequired.indexOf("tFNDeclaraion") === -1 ? this.docsRequired.push("tFNDeclaraion") : console.log();
			} else {
				var i = this.docsRequired.indexOf("tFNDeclaraion");
				if (i != -1) {
					this.docsRequired.splice(i, 1);
				}
				this.docsRequired.indexOf("noTFN") === -1 ? this.docsRequired.push("noTFN") : console.log();
			}
		}

		// show all required docs 
		$.each(this.docsRequired, function () {
			$('.pt-' + this).show('slow');
		});

		// console.log(this.docsRequired);
		// console.log(this.studentAge);
		// console.log(this.type);
	};

	// create a new person
	var counter = new Person();

	// PoC file upload for prototype
	;(function (document, window, index) {
		var inputs = document.querySelectorAll('.file-upload__input');
		Array.prototype.forEach.call(inputs, function (input) {
			var label = input.nextElementSibling,
			    labelVal = label.innerHTML;

			input.addEventListener('change', function (e) {
				var fileName = '';

				fileName = e.target.value.split('\\').pop();

				if (fileName) {
					label.querySelector('.file-upload__file-name').innerHTML = fileName;
					label.querySelector('.file-upload__file-name').classList.add('file-upload__file-name--uploaded');
					label.querySelector('.uikit-btn').innerHTML = 'Remove';
					label.querySelector('.uikit-btn').classList.add('uikit-btn--tertiary');

					var status = label.querySelector('.file-upload__file-name').closest('tr');

					console.log(status);

					status = status.querySelector('.file-status');
					status.innerHTML = 'Remove';
					status.innerHTML = '<span> Uploaded</span>';
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
	})(document, window, 0);
});