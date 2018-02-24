'use strict';

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
	if ("veteranFlow" in sessionStorage) {
		$(".pt-flow--veteran").show("fast");
	}

	if ("studentFlow" in sessionStorage) {
		$(".pt-flow--student").show("fast");
	}

	if ("claimantFlow" in sessionStorage) {
		$(".pt-flow--claimant").show("fast");
	}

	// Student questions 
	if ("studentFlow" in sessionStorage) {
		var question = {
			pageheader1: "Personal details	<span>(Student claims)</span>",
			pageheader1a: "Veterans details",
			pageheader1b: "Student details",
			id1: "Title",
			id2: "First name",
			id3: "Last name",
			id4: "Date of birth",
			id5: "",
			id5a: "",
			id6: "",
			id7: "Are you in a partnered relationship?",
			id8: "Will you be living at the same address with your partner while you're studying?",
			id8a: "[TEXT TBD] You will be eligible for a lesser payment",
			id9: "",
			id9a: "",
			id9b: "Provide any supporting documents to prove your relationship to the student.",
			id10: "Type of study",
			id10a: "[TEXT TBD] You are no longer eligible",
			id11: "Grade This Year",
			id12: "Name of School",
			id13: "School address",
			id14: "School phone number",
			id15: "What type of education will you be studying this year?",
			id16: "Where are you currently  studying or planning to study?",
			id17: "What course are you studying?",
			id18: "Course Code",
			id19: "Date you started or plan to start studying <span class='hint'>(DD / MM / YYYY)</span>",
			id20: "Date you plan to complete your studies <span class='hint'>(MM / YYYY)</span>",
			id21: "What is your study load?",
			id21b: "When do you intend on returning to full-time study? (optional)  <span class='hint'>(MM / YYYY)</span>",
			id21c: "Have you enrolled in this course?",
			id21ci: "[TEXT TBD] You are no longer eligible",
			id21u: "Please provide evidence to explain why you study part-time",
			id22: "Is this your current address?",
			id23: "Will you be living away from home while studying?",
			id23a: "What best describes your situation? I:",
			id23ai: "[TEXT TBD] The DVA can assist you",
			id24: "Do you need rent assistance? (optional)",
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
			id34: "Are you applying for a student who is studying full time or planning to study full time?",
			id35: "Do you provide care for the student or receive the Family Tax Benefit for them?",
			id36: "Is the student the dependant of a veteran who is significantly injured or deceased?",
			id37: "You are eligible to apply for student support payments.",
			id38: "You may need to provide more evidence to apply for student support payments.",
			id39: "You are not eligible for student support payments. For more information call 133 254.",
			id40: "Are you a student, or carer claiming on behalf of a student?",
			id41: "Veterans Titile",
			id42: "Veterans First name",
			id43: "Veterans Last name",
			id44: "Veterans Date of Birth",
			id45: "DVA file number (if known)",
			id46: "PMKeyS ID (if known)",
			id47: "Your relationship to the veteran",
			id48: "Please provide a brief statement explaining how you came into the veterans care. "

		};
	}

	if ("veteranFlow" in sessionStorage || "claimantFlow" in sessionStorage) {
		var question = {
			pageheader1: "Student details	<span>(Student claims)</span>",
			id1: "Student's Title",
			id2: "Student's First name",
			id3: "Student's Last name",
			id4: "Student's Date of birth",
			id5: "Your relationship to the student",
			id5a: "Provide a brief statement explaining how the student came into your care. If relevant, provide a copy of any standing orders from the Family Court or other proof of care documents.",
			id6: "Will the student be working full time while studying?",
			id7: "",
			id8: "",
			id8a: "",
			id9: "What is the Veteran/Member's relationship to the student?",
			id9a: "Provide a brief statement explaining how the student came into your care. If relevant, provide a copy of any standing orders from the Family Court or other proof of care documents.",
			id9b: "Provide any supporting documents to prove your relationship to the student.",
			id10: "Type of study",
			id10a: "[TEXT TBD] You are no longer eligible",
			id11: "Grade This Year",
			id12: "Name of School",
			id13: "School address",
			id14: "School phone number",
			id15: "What type of education will the student be studying this year?",
			id16: "Where is the student currently  studying or planning to study?",
			id17: "What course is the student studying?",
			id18: "Course Code",
			id19: "Date the student started or plan to start studying <span class='hint'>(DD / MM / YYYY)</span>",
			id20: "Date the student plans to complete their studies <span class='hint'>(  MM / YYYY)</span>",
			id21: "What is the student's study load?",
			id21b: "When do you intend on returning to full-time study? (optional)  <span class='hint'>(  MM / YYYY)</span>",
			id21c: "Has the student enrolled in this course?",
			id21ci: "[TEXT TBD] You are no longer eligible",
			id21u: "Please provide evidence to explain why the student is studying part-time",
			id22: "Is this the student’s address? ",
			id23: "Will the student be living away from home while studying?",
			id23a: "What best describes the student’s situation? The student:",
			id23ai: "[TEXT TBD] The DVA can assist you",
			id24: "Does the student need rent assistance? (optional)",
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
			id24a9a: "How much of the payment is for meals?  ",
			id25: "Provide any supporting documents, for example rental agreement",
			id26: "Who receives the Family Tax Benefit for the student?",
			id26a: "What is their Customer Reference Number (optional)",
			id26b: "What is the percentage care of a parent?",
			id26b1: "[Text TBD] You may not be eligible",
			id26b2: "[Text TBD] The other care giver may not be eligible",
			id26c: "What is the name of the other care giver? (optional)",
			id26d: "What are the contact details for the other care giver? (optional)",
			id27: "Student's Tax File Number",
			id28: "Would you like to have the student's  education allowance taxed?  ",
			id28a: "How much does the student pay per fortnight?  ",
			id28ai: "Payments will be made directly to these bank account details.	",
			id29: "Account Name",
			id30: "BSB",
			id31: "Account Number",
			id32: "",
			id33a: "",
			id33b: "Are you a veteran who is significantly injured as a result of your service?",
			id34: "Are you applying for a student who is studying full time or planning to study full time?",
			id35: "Do you provide care for the student or receive the Family Tax Benefit for them?",
			id36: "",
			id37: "You are eligible to apply for student support payments.",
			id38: "You may need to provide more evidence to apply for student support payments.",
			id39: "You are not eligible for student support payments. For more information call 133 254.",
			id40: "Are you a student, or carer claiming on behalf of a student?"

		};
	}

	if ("claimantFlow" in sessionStorage) {
		question.id5 = "What is the Veteran's relationship to the student?";
		question.id9 = "What is the Veteran's relationship to the student?";
		question.id47 = "The students relationship to the veteran";
		question.id33b = "Is the student the dependant of a veteran who is significantly injured or deceased?";
		question.id35 = "Does the Veteran provide care for the student or receive the Family Tax Benefit for them?";
		question.id36 = "";
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

		sessionStorage.clear();
		var flow = getUrlParameter('flow');
		var age = getUrlParameter('studentAge');

		if (flow) {
			sessionStorage.setItem(flow, true);
			if (age) {
				sessionStorage.setItem('studentAge', age);
			}
		} else {
			alert('The prototype requires a flow and age in the url string e.g.  ' + location.protocol + '//' + location.host + location.pathname + '?flow=studentFlow&studentAge=10');
		}
	}

	// All student pages 
	if (window.location.href.indexOf("student") > -1) {
		console.log('All student pages');
	}

	if (window.location.pathname === "/studentpreeligibility") {
		var eligible = function eligible() {
			console.log('checking eligible status');
			if (sessionStorage.getItem('fullTimeStudy') === 'false') {
				$(".pt-outcome--no").show();
				$(".pt-outcome--yes, .pt-outcome--maybe").hide();
			} else if (sessionStorage.getItem('veteranSignificantlyInjured') === 'true' && sessionStorage.getItem('fullTimeStudy') === 'true' && sessionStorage.getItem('careForStudentOrFTB') === 'true') {
				$(".pt-outcome--yes").show();
				$(".pt-outcome--no, .pt-outcome--maybe").hide();
			} else if (sessionStorage.getItem('veteranSignificantlyInjured') === 'false' && sessionStorage.getItem('fullTimeStudy') === 'true' && sessionStorage.getItem('careForStudentOrFTB') === 'true') {
				$(".pt-outcome--maybe").show();
				$(".pt-outcome--no, .pt-outcome--yes").hide();
			} else if (sessionStorage.getItem('veteranSignificantlyInjured') === 'true' && sessionStorage.getItem('fullTimeStudy') === 'true' && sessionStorage.getItem('careForStudentOrFTB') === 'false') {
				$(".pt-outcome--maybe").show();
				$(".pt-outcome--no, .pt-outcome--yes").hide();
			} else if (sessionStorage.getItem('veteranSignificantlyInjured') === 'false' && sessionStorage.getItem('fullTimeStudy') === 'true' && sessionStorage.getItem('careForStudentOrFTB') === 'false') {
				$(".pt-outcome--maybe").show();
				$(".pt-outcome--no, .pt-outcome--yes").hide();
			} else {
				$(".pt-outcome--no, .pt-outcome--yes, .pt-outcome--maybe").hide();
			}
		};

		// Page eligibility
		$(".pt-outcome").hide();
		$(".pt-showIfStudentConfirm").hide();
		$(".pt-showIfClaimantConfirm").hide();
		$(".pt-showIfStudentVeteranInjured").hide();

		$('input[name=eligibilityPersonType]').change(function () {
			if ($('input[name=eligibilityPersonType]:checked').val() === 'student') {

				$(".pt-showIfStudentConfirm").show();

				if (sessionStorage.getItem('claimantFlow')) {
					sessionStorage.removeItem('claimantFlow');
					sessionStorage.removeItem('claimantFlowConfirmed');
					sessionStorage.setItem('studentFlow', true);
					sessionStorage.setItem('studentFlowConfirmed', true);
					window.location.reload(true);
				}
			} else if ($('input[name=eligibilityPersonType]:checked').val() === 'carer') {

				$(".pt-showIfClaimantConfirm").show();

				if (sessionStorage.getItem('studentFlow')) {
					sessionStorage.removeItem('studentFlow');
					sessionStorage.removeItem('studentFlowConfirmed');
					sessionStorage.setItem('claimantFlow', true);
					sessionStorage.setItem('claimantFlowConfirmed', true);
					window.location.reload(true);
				}
			}
		});

		if (sessionStorage.getItem('claimantFlowConfirmed')) {
			$('#eligibilityPersonType-carer').prop('checked', true);
		}

		if (sessionStorage.getItem('studentFlowConfirmed')) {
			$('#eligibilityPersonType-student').prop('checked', true);
		}

		$('input[name=eligibilityPersonType]').trigger("change");

		// student only flow
		$('input[name=eligibilityFullTimeStudy]').change(function () {
			if ($('input[name=eligibilityFullTimeStudy]:checked').val() === 'yes') {

				$(".pt-showIfStudentVeteranInjured").show();

				sessionStorage.setItem('fullTimeStudy', true);
				$(".pt-outcome--maybe, .pt-outcome--yes, .pt-outcome--no").hide();
			} else if ($('input[name=eligibilityFullTimeStudy]:checked').val() === 'no') {
				sessionStorage.removeItem('fullTimeStudy');
				$(".pt-outcome--no").show();
				$(".pt-outcome--maybe, .pt-outcome--yes").hide();
			}
		});

		$('input[name=eligibilityCaredForByVeteran]').change(function () {
			if ($('input[name=eligibilityCaredForByVeteran]:checked').val() === 'yes') {
				if (sessionStorage.getItem('fullTimeStudy')) {
					$(".pt-outcome--yes").show();
					$(".pt-outcome--no, .pt-outcome--maybe").hide();
				}
			} else if ($('input[name=eligibilityCaredForByVeteran]:checked').val() === 'no') {

				$(".pt-outcome--maybe").show();
				$(".pt-outcome--no, .pt-outcome--yes").hide();
			}
		});

		// veteran and claiment flow 
		$('input[name=eligibilityVeteranSignificantlyInjured]').change(function () {
			if ($('input[name=eligibilityVeteranSignificantlyInjured]:checked').val() === 'yes') {
				sessionStorage.setItem('veteranSignificantlyInjured', true);
			} else if ($('input[name=eligibilityVeteranSignificantlyInjured]:checked').val() === 'no') {

				sessionStorage.removeItem('veteranSignificantlyInjured');
				sessionStorage.setItem('veteranSignificantlyInjured', false);
			}
			eligible();
		});

		$('input[name=eligibilityStudentFullTimeStudy]').change(function () {
			if ($('input[name=eligibilityStudentFullTimeStudy]:checked').val() === 'yes') {
				sessionStorage.setItem('fullTimeStudy', true);
			} else if ($('input[name=eligibilityStudentFullTimeStudy]:checked').val() === 'no') {
				sessionStorage.removeItem('fullTimeStudy');
				sessionStorage.setItem('fullTimeStudy', false);
			}
			eligible();
		});

		$('input[name=eligibilityCareForStudentOrFTB]').change(function () {
			if ($('input[name=eligibilityCareForStudentOrFTB]:checked').val() === 'yes') {
				sessionStorage.setItem('careForStudentOrFTB', true);
			} else if ($('input[name=eligibilityCareForStudentOrFTB]:checked').val() === 'no') {
				sessionStorage.removeItem('careForStudentOrFTB');
				sessionStorage.setItem('careForStudentOrFTB', false);
			}
			eligible();
		});
	}

	if (window.location.pathname === "/studentclaim1") {
		// Page 1
		$(".pt-studentAge--mature").hide();
		$(".pt-studentLivingSameAddress").hide();
		$(".pt-studentLivingWithPartnerLessRate").hide();
		$(".upload-list").show();

		$('input[name=studyAwayFromHomeRadio]').change(function () {

			if ($('input[name=studyAwayFromHomeRadio]:checked').val() === 'yes') {
				$(".pt-showIfLivingAway").show('fast');
				$(".pt-showIfNoPartner").hide();

				sessionStorage.removeItem('studyAwayFromHome');
				sessionStorage.setItem('studyAwayFromHome', true);

				if (sessionStorage.getItem('studentPartneredRelationship') === 'no') {
					$(".pt-showIfNoPartner").show('fast');
				}
			} else {
				$(".pt-showIfLivingAway").hide();
				$(".pt-showIfNoPartner").hide();
				sessionStorage.removeItem('studyAwayFromHome');

				// skip the livering arangement details 
				$('.btnNext').click(function () {
					event.stopPropagation();
					window.location.href = 'studentclaim3';
				});
			}
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
				sessionStorage.removeItem('studentAge');
				sessionStorage.setItem('studentAge', age);

				// TODO: handle state better and make this a separate function 
				if (sessionStorage.getItem('studentAge') > 15) {

					if ("veteranFlow" in sessionStorage) {
						$(".pt-studentAge--mature").each(function () {
							if ($(this).is(".pt-flow--veteran")) {
								$(this).show("fast");
							}
						});
					}

					if ("studentFlow" in sessionStorage) {
						$(".pt-studentAge--mature").each(function () {
							if ($(this).is(".pt-flow--student")) {
								$(this).show("fast");
							}
						});
					}

					if ("claimantFlow" in sessionStorage) {
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

		if (sessionStorage.getItem('studentAge') > 15) {

			if ("veteranFlow" in sessionStorage) {
				$(".pt-studentAge--mature").each(function () {
					if ($(this).is(".pt-flow--veteran")) {
						$(this).show("fast");
					}
				});
			}

			if ("studentFlow" in sessionStorage) {
				$(".pt-studentAge--mature").each(function () {
					if ($(this).is(".pt-flow--student")) {
						$(this).show("fast");
					}
				});
			}

			if ("claimantFlow" in sessionStorage) {
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
				sessionStorage.removeItem('studentPartneredRelationship');
				sessionStorage.setItem('studentPartneredRelationship', 'yes');
				$(".pt-studentLivingSameAddress").show();
			} else {
				sessionStorage.removeItem('studentPartneredRelationship');
				sessionStorage.setItem('studentPartneredRelationship', 'no');
				$(".pt-studentLivingSameAddress").hide();
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
		$(".pt-showIfNotPrimaryStudent").hide();
		$(".pt-showIfHomeless").hide();
		$(".pt-showIfRequireRentAssistance").hide();
		$(".pt-showIfRentAssistanceKnown").hide();
		$(".pt-showIfNotRentLandLord").hide();
		$(".pt-typeOfAccommodationPaymentOther").hide();

		if (sessionStorage.getItem('studentLevelOfStudy') !== 'primary') {
			$(".pt-showIfNotPrimaryStudent").show('fast');
		}

		$(".pt-showIfLivingAway").hide();

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
		// page 2
		$(".pt-showIfPrimary").hide();
		$(".pt-showIfSecondary").hide();
		$(".pt-showIfTertiary").hide();
		$(".pt-showIfPartTime").hide();
		$(".pt-noLongerEligible").hide();
		$(".pt-noLongerEligibleTwo").hide();

		$("#studentLevelOfStudy").change(function () {
			var selected_option = $('#studentLevelOfStudy').val();
			console.log('input studentLevelOfStudy changed to ' + $("#studentLevelOfStudy").val());
			var grade_options;

			if (selected_option === 'primary') {

				$(".pt-noLongerEligible").hide();
				$(".pt-showIfSecondary").hide();
				$(".pt-showIfTertiary").hide();
				$(".pt-showIfPrimary").show('fast');

				sessionStorage.removeItem('studentLevelOfStudy');
				sessionStorage.setItem('studentLevelOfStudy', 'primary');
				$(".pagination").find('button').prop('disabled', false);
				// grade_options == 


				$("#studentGradeThisYearSelect option[value='7']").remove();
				$("#studentGradeThisYearSelect option[value='8']").remove();
				$("#studentGradeThisYearSelect option[value='9']").remove();
				$("#studentGradeThisYearSelect option[value='10']").remove();
				$("#studentGradeThisYearSelect option[value='11']").remove();
				$("#studentGradeThisYearSelect option[value='12']").remove();
			} else if (selected_option === 'secondary') {
				$(".pt-noLongerEligible").hide();
				$(".pt-showIfTertiary").hide();
				$(".pt-showIfPrimary").hide();
				$(".pt-showIfSecondary").show('fast');

				sessionStorage.removeItem('studentLevelOfStudy');
				sessionStorage.setItem('studentLevelOfStudy', 'secondary');

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

				sessionStorage.removeItem('studentLevelOfStudy');
				sessionStorage.setItem('studentLevelOfStudy', 'tertiary');
				$(".pagination").find('button').prop('disabled', false);
			}

			// $("#studentGradeThisYearSelect").removeItem

		});

		$('input[name=studyLoad]').change(function () {
			if ($('input[name=studyLoad]:checked').val() === 'part-time') {
				$(".pt-showIfPartTime").show('fast');
				sessionStorage.removeItem('studentLoadOfStudy');
				sessionStorage.setItem('studentLoadOfStudy', 'part-time');
			} else {
				$(".pt-showIfPartTime").hide();
				sessionStorage.removeItem('studentLoadOfStudy');
				sessionStorage.setItem('studentLoadOfStudy', 'full-time');
			}
		});

		$('input[name=enroleStatus]').change(function () {
			if ($('input[name=enroleStatus]:checked').val() === 'no') {
				$(".pt-noLongerEligibleTwo").show();
			} else {
				$(".pt-noLongerEligibleTwo").hide();
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

		if (sessionStorage.getItem('studentAge') > 15) {
			console.log('mature student');
			$('.pt-studentAge--mature').show();
		}

		$("#studentTFN").focusout(function () {
			if ($(this).val()) {
				sessionStorage.removeItem('studentTFN');
				sessionStorage.setItem('studentTFN', true);
			} else {
				sessionStorage.removeItem('studentTFN');
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
		if ("studentFlow" in sessionStorage || "veteranFlow" in sessionStorage || "claimantFlow" in sessionStorage) {

			// Proof of relationship for all
			this.docsRequired.indexOf("proofOfRelationship") === -1 ? this.docsRequired.push("proofOfRelationship") : console.log();

			if ("studentFlow" in sessionStorage) {
				this.type = 'student';
			} else if ("veteranFlow" in sessionStorage) {
				this.type = 'veteran';
			} else if ("claimantFlow" in sessionStorage) {
				this.type = 'claimant';
			}
		}

		// check student age
		if ("studentAge" in sessionStorage) {
			this.studentAge = sessionStorage.getItem('studentAge');
			if (this.studentAge > 15) {
				this.docsRequired.indexOf("proofOfEnrolment") === -1 ? this.docsRequired.push("proofOfEnrolment") : console.log();
			}
		}
		// check if living away from home
		if ("studyAwayFromHome" in sessionStorage) {
			this.docsRequired.indexOf("proofOfResidence") === -1 ? this.docsRequired.push("proofOfResidence") : console.log();
		} else {
			var i = this.docsRequired.indexOf("proofOfResidence");
			if (i != -1) {
				this.docsRequired.splice(i, 1);
			}
		}

		// Display if Study level == Tertiary &; Study load == part time
		if (sessionStorage.getItem('studentLevelOfStudy') === 'tertiary' && sessionStorage.getItem('studentLoadOfStudy') === 'part-time') {

			this.docsRequired.indexOf("partTimeStudyReason") === -1 ? this.docsRequired.push("partTimeStudyReason") : console.log();
		} else {
			var i = this.docsRequired.indexOf("partTimeStudyReason");
			if (i != -1) {
				this.docsRequired.splice(i, 1);
			}
		}

		if (this.type === 'student') {
			if (sessionStorage.getItem('studentTFN')) {
				this.docsRequired.indexOf("tFNDeclaraion") === -1 ? this.docsRequired.push("tFNDeclaraion") : console.log();
			} else {
				var i = this.docsRequired.indexOf("tFNDeclaraion");
				if (i != -1) {
					this.docsRequired.splice(i, 1);
				}
			}
		}

		// show all required docs 
		$.each(this.docsRequired, function () {
			$('.pt-' + this).show();
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
					label.querySelector('.uikit-btn').innerHTML = 'Remove';
					label.querySelector('.uikit-btn').classList.add('uikit-btn--tertiary');

					var status = label.querySelector('.file-upload__file-name').closest('tr');
					console.log(status);

					status = status.querySelector('.file-status');
					status.innerHTML = 'Remove';
					status.innerHTML = '<span> Uploaded</span>';
					status = status.classList;
					console.log(status);
					status.remove('file-status--required');
					status.add('file-status--uploaded');
				} else {

					label.innerHTML = labelVal;
				}
			});

			// Firefox bug fix
			input.addEventListener('focus', function () {
				input.classList.add('has-focus');
			});
			input.addEventListener('blur', function () {
				input.classList.remove('has-focus');
			});
		});
	})(document, window, 0);
});