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




	// Studient claim pages
	// Flows 
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
			id2: "First Name",
			id3: "Last Name",
			id4: "Date of Birth",
			id5: "",
			id5a: "",
			id6: "",
			id7: "Are you in a partnered relationship?",
			id8: "Will you be living at the same address with your partner whilst studying?",
			id8a: "[TEXT TBD] You are no longer eligible",
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
			id22: "Is this your current address?",
			id23: "Will you be living away from home whilst undertaking study?",
			id23a: "Please select a statement that best describes the situation",
			id23ai: "[TEXT TBD] The DVA can assist you",
			id24: "Do you require rent assistance? (optional)",
			id24a: "Do you have your rental details?",
			id24a1: "Date you began/will be living at a new rental address",
			id24a2: "Date your rental agreement ends",
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
			id26c: "What is the name of the other care giver? (optional)",
			id26d: "What are the best contact details for the other care-giver ? (optional)",
			id27: "Your Tax File Number",
			id28: "Would you like your education allowance taxed? ",
			id28a: "How much do you pay per fortnight? ",
			id28ai: "Payments will be made directly to these bank account details.	If you applying for a student 18 years and over, please enter their Bank details.",
			id29: "Account Name",
			id30: "BSB",
			id31: "Account Number",
		};
	}

	if (("veteranFlow" in sessionStorage) || ("claimantFlow" in sessionStorage)) {
		var question = {
			id1: "Student's Title",
			id2: "Student's First Name",
			id3: "Student's Last Name",
			id4: "Student's Date of Birth",
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
			id22: "Is this the student’s address? ",
			id23: "Will the student be living away from home whilst undertaking study?",
			id23a: "Please select a statement that best describes the situation",
			id23ai: "[TEXT TBD] The DVA can assist you",
			id24: "Does the student require rent assistance? (optional)",
			id24a: "Do you know the student's rental details?",
			id24a1: "Date the student began/will be living at a new rental address",
			id24a2: "Date the student rental agreement ends",
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
			id26a: "What is your Customer Reference Number (optional)",
			id26b: "What is the percentage care of a parent?",
			id26c: "What is the name of the other care giver? (optional)",
			id26d: "What are the best contact details for the other care-giver ? (optional)",
			id27: "Student's Tax File Number",
			id28: "Would you like your education allowance taxed? ",
			id28a: "How much do you pay per fortnight? ",
			id28ai: "Payments will be made directly to these bank account details.	If you applying for a student 18 years and over, please enter their Bank details.",
			id29: "Account Name",
			id30: "BSB",
			id31: "Account Number",
		};
	}

	for (var key in question) {
		$("#question_" + key).html(question[key]);
	}

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

	// Page 1
	$(".pt-studentAge--mature").hide();
	$(".pt-studentLivingSameAddress").hide();

	$(".pt-noLongerEligible").hide();

	$('input[name=studentLivingWithPartner]').change(function () {
		console.log('input studentLivingWithPartner changed to ' + $('input[name=studentLivingWithPartner]:checked').val());
		if ($('input[name=studentLivingWithPartner]:checked').val() === 'yes') {
			console.log('noLongerEligible show');
			$(".pt-noLongerEligible").show();
			$(".pagination *").hide();
		} else {
			console.log('noLongerEligible hide');
			$(".pt-noLongerEligible").hide();
			$(".pagination *").show('fast');
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





	// page 2

	$(".pt-showIfPrimary").hide();
	$(".pt-showIfSecondary").hide();
	$(".pt-showIfTertiary").hide();
	$(".pt-showIfPartTime").hide();




	$('input[name=studentLevelOfStudy]').change(function () {
		console.log('input studentLevelOfStudy changed to ' + $('input[name=studentLevelOfStudy]:checked').val());
		if ($('input[name=studentLevelOfStudy]:checked').val() === 'primary') {

			$(".pt-noLongerEligible").hide();
			$(".pt-showIfSecondary").hide();
			$(".pt-showIfTertiary").hide();
			$(".pt-showIfPrimary").show('fast');

			sessionStorage.removeItem('studentLevelOfStudy');
			sessionStorage.setItem('studentLevelOfStudy', 'primary');

		}
		else if ($('input[name=studentLevelOfStudy]:checked').val() === 'secondary') {
			$(".pt-noLongerEligible").hide();
			$(".pt-showIfTertiary").hide();
			$(".pt-showIfPrimary").hide();
			$(".pt-showIfSecondary").show('fast');

			sessionStorage.removeItem('studentLevelOfStudy');
			sessionStorage.setItem('studentLevelOfStudy', 'secondary');
		}
		else if ($('input[name=studentLevelOfStudy]:checked').val() === 'tertiary') {
			$(".pt-noLongerEligible").hide();
			$(".pt-showIfPrimary").hide();
			$(".pt-showIfSecondary").hide();
			$(".pt-showIfTertiary").show('fast');

			sessionStorage.removeItem('studentLevelOfStudy');
			sessionStorage.setItem('studentLevelOfStudy', 'tertiary');
		}
		else if ($('input[name=studentLevelOfStudy]:checked').val() === 'none') {

			$(".pt-showIfPrimary").hide();
			$(".pt-showIfSecondary").hide();
			$(".pt-showIfTertiary").hide();
			$(".pt-noLongerEligible").show('fast');

			sessionStorage.removeItem('studentLevelOfStudy');
			sessionStorage.setItem('studentLevelOfStudy', 'none');
		}
	});

	$('input[name=studyLoad]').change(function () {
		if ($('input[name=studyLoad]:checked').val() === 'part-time') {
			$(".pt-showIfPartTime").show('fast');
		} else {
			$(".pt-showIfPartTime").hide();
		}
	});




	// Page 3
	$(".pt-showIfNotPrimaryStudent").hide();
	$(".pt-showIfHomeless").hide();
	$(".pt-showIfRequireRentAssistance").hide();
	$(".pt-showIfRentAssistanceKnown").hide();
	$(".pt-typeOfAccommodationPaymentOther").hide();


	if (sessionStorage.getItem('studentLevelOfStudy') !== 'primary') {
		$(".pt-showIfNotPrimaryStudent").show('fast');
	}

	$(".pt-showIfLivingAway").hide();

	$('input[name=studyAwayFromHomeRadio]').change(function () {

		if ($('input[name=studyAwayFromHomeRadio]:checked').val() === 'yes') {
			$(".pt-showIfLivingAway").show('fast');
			$(".pt-showIfNoPartner").hide();

			if (sessionStorage.getItem('studentPartneredRelationship') === 'no') {
				$(".pt-showIfNoPartner").show('fast');
			}
		} else {
			$(".pt-showIfLivingAway").hide();
			$(".pt-showIfNoPartner").hide();
		}
	});

	$("#studyAwayFromHomeExplination").change(function () {
		var selected_option = $('#studyAwayFromHomeExplination').val();
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
		if ($('input[name=typeOfAccommodationPayment]:checked').val() === 'other') {
			$(".pt-typeOfAccommodationPaymentOther").show('fast');
		} else {
			$(".pt-typeOfAccommodationPaymentOther").hide();
		}
	});







});
