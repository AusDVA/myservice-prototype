
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
	let panels = $('.panel');
	panels.map((index, panel) => {
		let panelContainer = $(panel).find('.panel-container');
		let panelHeader = $(panel).find('.panel-header');
		let originX = 0;
		let lastX = 0;
		let dragging = false;
		let uiBunch = panelContainer.add(panelHeader);
		uiBunch.on('mousedown touchstart', (event) => {
			if (!dragging && !$(event.target).is('.panel-close')) {
				dragging = true;
				originX = event.screenX || event.targetTouches[0].screenX;
				lastX = originX;
			}
		});
		uiBunch.on('mousemove touchmove', (event) => {
			if (dragging) {
				lastX = (event.screenX || event.targetTouches[0].screenX);
				let newX = lastX - originX;
				if (newX >= 0)
					uiBunch.css({ right: -newX + 'px' });
			}
		});
		uiBunch.on('mouseup touchend', (event) => {
			if (dragging && !$(event.target).is('.panel-close')) {
				dragging = false;
				let newX = (event.screenX || lastX) - originX;
				if (newX > (panelContainer[0].offsetWidth * 0.25)) {
					$(panel).removeClass('is-visible').addClass('swipe-closing');
					window.setTimeout(() => {
						$(panel).removeClass('swipe-closing');
						uiBunch.css({ right: '' });
					}, 400);
				}
				else {
					uiBunch.css({ right: '0px', transition: 'right 0.3s' });
					window.setTimeout(() => { uiBunch.css({ transition: '' }); }, 300);
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
			id1: "Title",
			id2: "First name",
			id3: "Last name",
			id4: "Date of birth",
			id5: "",
			id5a: "",
			id6: "",
			id7: "Are you in a partnered relationship?",
			id8: "Will you be living at the same address with your partner whilst studying?",
			id8a: "[TEXT TBD] You will be eligible for a lesser payment",
			id9: "",
			id9a: "",
			id9b: "Please provide any supporting documents",
			id10: "Level of study",
			id10a: "[TEXT TBD] You are no longer eligible",
			id11: "Grade This Year",
			id12: "Name of School",
			id13: "Address of School",
			id14: "Telephone Number of School",
			id15: "What type of education will you undertake this year?",
			id16: "Where is are you currently studying/planning to study?",
			id17: "What course are you undertaking?",
			id18: "Course Code",
			id19: "Date you started or plan to start studying <span class='hint'>(DD / MM / YYYY)</span>",
			id20: "Date you plan to complete your studies <span class='hint'>(MM / YYYY)</span>",
			id21: "What is your study load?",
			id21b: "When do you intend on returning to full-time study? (optional)  <span class='hint'>(MM / YYYY)</span>",
			id21c: "Have you enrolled in this course?",
			id21ci: "[TEXT TBD] You are no longer eligible",
			id21u: "Please provide evidence to explain why you study part-time",
			id22: "Is this your current address?",
			id23: "Will you be living away from home whilst undertaking study?",
			id23a: "Please select a statement that best describes the situation",
			id23ai: "[TEXT TBD] The DVA can assist you",
			id24: "Do you require rent assistance? (optional)",
			id24a: "Do you have your rental details?",
			id24a1: "Date you began/will be living at a new rental address<span class='hint'>(DD / MM / YYYY)</span>",
			id24a2: "Date your rental agreement ends<span class='hint'>(DD / MM / YYYY)</span>",
			id24a3: "What type of accommodation payment do you make?",
			id24a3a: "Please provide details...",
			id24a4: "Name of person or agency you pay rent to",
			id24a5: "What is their email address?",
			id24a6: "What is their contact  Number?",
			id24a7: "How much do you pay per fortnight? ",
			id24a8: "Are you sharing residence with anyone else?",
			id24a9: "Do you receive meals as part of your accommodation costs? ",
			id24a9a: "How much of the payment is for meals?  ",
			id25: "Please provide any supporting documents (e.g. Rental agreement)",
			id26: "Who currently receives the Family Tax Benefit for the student?",
			id26a: "What is your Customer Reference Number (optional)",
			id26b: "What percentage do you care for your child?",
			id26b1: "[Text TBD] You may not be eligible",
			id26b2: "[Text TBD] The other care giver may not be eligible",
			id26c: "What is the name of the other care giver? (optional)",
			id26d: "What are the best contact details for the other care-giver ? (optional)",
			id27: "Your Tax File Number",
			id28: "Would you like your education allowance taxed? ",
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
			id39: "You are not eligible for student support payments. Find out more about <other DVA payments><link to: claims page> or call 133 254.",
		};
	}










	if (("veteranFlow" in sessionStorage) || ("claimantFlow" in sessionStorage)) {
		var question = {
			id1: "Student's Title",
			id2: "Student's First name",
			id3: "Student's Last name",
			id4: "Student's Date of birth",
			id5: "Your relationship to the student",
			id5a: "Please provide a brief statement explaining how the student came into your care. If relevant, please provide a copy of any standing orders from the Family Court etc.",
			id6: "Will the student be engaged in full time employment whilst studying?",
			id7: "",
			id8: "",
			id8a: "",
			id9: "What is the Veteran/Member's relationship to the student?",
			id9a: "Please provide a brief statement explaining how the student came into their care. If relevant, please provide a copy of any standing orders from the Family Court etc.",
			id9b: "Please provide any supporting documents",
			id10: "Student's level of study",
			id10a: "[TEXT TBD] You are no longer eligible",
			id11: "Grade This Year",
			id12: "Name of School",
			id13: "Address of School",
			id14: "Telephone Number of School",
			id15: "What type of education will the student undertake this year?",
			id16: "Where is the student currently studying/planning to study?",
			id17: "What course is the student undertaking?",
			id18: "Course Code",
			id19: "Date the student started or plans to start studying <span class='hint'>(DD / MM / YYYY)</span>",
			id20: "Date the student plans to complete their studies <span class='hint'>(  MM / YYYY)</span>",
			id21: "What is the student's study load?",
			id21b: "When do you intend on returning to full-time study? (optional)  <span class='hint'>(  MM / YYYY)</span>",
			id21c: "Has the student enrolled in this course?",
			id21ci: "[TEXT TBD] You are no longer eligible",
			id21u: "Please provide evidence to explain why the student is studying part-time",
			id22: "Is this the student’s address? ",
			id23: "Will the student be living away from home whilst undertaking study?",
			id23a: "Please select a statement that best describes the situation",
			id23ai: "[TEXT TBD] The DVA can assist you",
			id24: "Does the student require rent assistance? (optional)",
			id24a: "Do you know the student's rental details?",
			id24a1: "Date the student began/will be living at a new rental address<span class='hint'>(DD / MM / YYYY)</span>",
			id24a2: "Date the student rental agreement ends<span class='hint'>(DD / MM / YYYY)</span>",
			id24a3: "What type of accommodation payment does the student make?",
			id24a4: "Name of person or agency the student pays rent to",
			id24a5: "What is their email address?",
			id24a6: "What is their contact  Number?",
			id24a7: "How much do you pay per fortnight? ",
			id24a8: "Is the student sharing residence with anyone else?",
			id24a9: "Do you receive meals as part of your accommodation costs? ",
			id24a9a: "How much of the payment is for meals?  ",
			id25: "Please provide any supporting documents (e.g. Rental agreement)",
			id26: "Who currently receives the Family Tax Benefit for the student?",
			id26a: "What is your Customer Reference Number (if known)",
			id26b: "What is your percentage care?",
			id26b1: "[Text TBD] You may not be eligible",
			id26b2: "[Text TBD] The other care giver may not be eligible",
			id26c: "What is the name of the other care giver? (optional)",
			id26d: "What are the best contact details for the other care-giver ? (optional)",
			id27: "Student's Tax File Number",
			id28: "Would you like your education allowance taxed? ",
			id28a: "How much do you pay per fortnight? ",
			id28ai: "Payments will be made directly to these bank account details.	",
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
			id39: "You are not eligible for student support payments. Find out more about <other DVA payments><link to: claims page> or call 133 254.",

		};
	}


	if ("claimantFlow" in sessionStorage) {
		question.id5 = "What is the Veteran/Member's relationship to the student?"
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
			alert('The prototype requires a flow and age in the url string e.g.  ' + location.protocol + '//' + location.host + location.pathname + '?flow=studentFlow&studentAge=10')
		}


	}

	// All student pages 

	if (window.location.href.indexOf("student") > -1) {
		console.log('All student pages');

		// Proof of relationship = proofOfRelationship
		// Proof of residence = proofOfResidence
		// Proof of enrolment = proofOfEnrolment
		// Part-time study reason = partTimeStudyReason
		// Tax file number declaration = tFNDeclaraion
		$('.proofOfRelationship, .proofOfResidence, .proofOfEnrolment, .partTimeStudyReason, .tFNDeclaraion').hide();
	}

	if (window.location.pathname === "/studentpreeligibility") {
		// Page eligibility
		$(".pt-outcome").show();
	}

	if (window.location.pathname === "/studentclaim1") {
		// Page 1
		$(".pt-studentAge--mature").hide();
		$(".pt-studentLivingSameAddress").hide();
		$(".pt-studentLivingWithPartnerLessRate").hide();
		$(".upload-list").show();

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
				// $(".pagination").find('button').prop('disabled', true);
			} else {
				$(".pt-studentLivingWithPartnerLessRate").hide();
				// $(".pagination").find('button').prop('disabled', false);
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

			}
			else if (selected_option === 'secondary') {
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
			}
			else if (selected_option === 'tertiary') {
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

	if (window.location.pathname === "/studentclaim3") {
		// Page 3
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
			}
		});

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
		if (("studentFlow" in sessionStorage) || ("veteranFlow" in sessionStorage) || ("claimantFlow" in sessionStorage)) {

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
		if ((sessionStorage.getItem('studentLevelOfStudy') === 'tertiary') && (sessionStorage.getItem('studentLoadOfStudy') === 'part-time')) {
			console.log('studentLevelOfStudy and studentLoadOfStudy = true')
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
			$('.' + this).show();
		});

		// this.docsRequired = ['123', 'wqerwe'];
		console.log(this.docsRequired);
		console.log(this.studentAge);
		console.log(this.type);
	};

	// create a new person
	var counter = new Person();


	// PoC file upload for prototype
	; (function (document, window, index) {
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
					label.querySelector('.uikit-btn').classList.add('uikit-btn--tertiary')

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
			input.addEventListener('focus', function () { input.classList.add('has-focus'); });
			input.addEventListener('blur', function () { input.classList.remove('has-focus'); });
		});
	}(document, window, 0));


});
