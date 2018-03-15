
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

	// TODO:: fade in docs once (relationship status is selected)

	// Student claim pages
	// TODO:: this would be better placed in a separate file



	function initStudents() {

		var studentName = localStorage.getItem('studentName');

		console.log(studentName);
		// Student questions 
		if ("studentFlow" in localStorage) {
			var question = {
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
				id8: "Are you living away from home for any of the above reasons?",
				id8a: "[TEXT TBD] You will be eligible for a lesser payment",
				id9: "",
				id9a: "",
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
				id24: "Are you renting?",
				id24x: "Are you sharing the cost of rent with anyone else?",
				id24a: "Do you have your rental details?",
				id24a1: "When did you start renting? <span class='hint'>(DD / MM / YYYY)</span>",
				id24a2: "When does the your rental agreement end? <span class='hint'>(DD / MM / YYYY)</span>",
				id24a3: "What type of payment do you make for accommodation?",
				id24a3a: "Please provide details...",
				id24a4: "Name of person or agency you pay rent to",
				id24a5: "Email address",
				id24a6: "Contact number",
				id24a7: "How much rent do you pay every two week? <span class='hint display-block'>This does not include meals</span> ",
				id24a8: "Do you share the cost of rent with anyone else? ",
				id24a9: "Are meals included in the accommodation costs?",
				id24a9a: "How much of the payment is for meals?  ",
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
				id28a: "How much rent do you pay every two week? <span class='hint display-block'>This does not include meals</span> ",
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

			};
		}


		if (("veteranFlow" in localStorage) || ("claimantFlow" in localStorage)) {
			var question = {
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
				id24: "Is renting?",
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
				id24a9: "Are meals included in the accommodation costs?",
				id24a9a: "How much of the payment is for meals?  ",
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
				id42: "Veterans First name",
				id43: "Veterans Last name",
				id44: "Veterans Date of Birth",
				id45: "DVA file number",
				id46: "PMKeyS ID (preferred)",
				id47: "Your relationship to the veteran",
				id49: "James' parents are;",
				id50: "Have",
				id50a: "apply",
			};

			question.id24 = "Is " + studentName + " renting?";
			question.id24x = "Is " + studentName + " sharing the cost of rent with anyone else?";
			question.id24a1 = "When did " + studentName + " start renting? <span class='hint'>(DD / MM / YYYY)</span>";
			question.id24a8 = "Does " + studentName + " share  the cost of rent with anyone else? ";

			question.id24a7 = "How much rent does " + studentName + " pay every two weeks ?<span class='hint display-block'>This does not include meals</span> ";

		}

		if ("claimantFlow" in localStorage) {
			question.id5 = "The veteran is the student's";
			question.id5a = "Provide a brief statement explaining how the student came into the veterans care. ";
			question.id6 = "Is the student employed full time? <span class='hint display-block'>This does not include apprenticeships.</span>";
			question.id9 = "What is the Veteran's relationship to the student?";
			question.id47 = "The students relationship to the veteran";
			question.id33a = "Is the student dependent on the veteran? <span class='hint'>Completely or substantially</span>"
			question.id33b = "Is the veteran significantly injured or deceased because of their service? For example:";
			question.id35 = "Does the Veteran provide care for the student or receive the Family Tax Benefit for them?";
			question.id36 = "";
			question.id48 = "Please provide a brief statement explaining how the student came into the veterans care. ";
			question.pageheader1 = "Student and veteran details	";
			question.pageheader1a = "Veterans details";
			question.pageheader1b = "Student details";
		}

		console.log(question);
		for (var key in question) {
			$("#question_" + key).html(question[key]);
		}


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
			}
			if (act) {
				localStorage.setItem('act', act);
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
		}

		function resetForm($form) {
			// $form.find('input:text, input:password, input:file, select, textarea').val('');
			// $form.find('input:radio, input:checkbox')
			// 	.removeAttr('checked').removeAttr('selected');

			// Use a whitelist of fields to minimize unintended side effects.
			// $('INPUT:text, INPUT:password, INPUT:file, SELECT, TEXTAREA', $form).val('');
			// De-select any checkboxes, radios and drop-down menus
			// $('INPUT:checkbox, INPUT:radio', $form).removeAttr('checked').removeAttr('selected');
			// $('INPUT:checkbox, INPUT:radio:not(name="confirmStudentOrClaimant")', $form).prop('checked', false);

			$('input[type=radio]:checked').not('input[type=radio][name=confirmStudentOrClaimant]').prop('checked', false);

			// $('input').prop('checked', false);
			// $(".thisclass:not(#thisid)").doAction();
			// confirmStudentOrClaimant
		}

		init();



		$('input[name=fTBYou]').change(function () {
			if ($('input[name=fTBYou]:checked').val() === 'yes') {

				$(".pt-showIfYourFTB").show();
				$(".pt-showIfSomeoneElseFTB").hide();
				$(".pt-showIfCentrelinkCustomer").show();
				localStorage.removeItem('veteranReceivesFTB');
				localStorage.setItem('veteranReceivesFTB', true);

				if ("veteranFlow" in localStorage) {
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
				console.log('val of employment ' + $('input[name=engagedInFullTimeEmployment]:checked').val());
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
					$(".pt-showIfStudentUnder0").hide();

					// veteran and claimant flow only
					if (("veteranFlow" in localStorage)) {

						// if over 18, suggest student claims on their own 
						if (localStorage.getItem('studentAge') > 17) {
							init();
							resetForm($('#pt-form'));
							$(".pt-showIfStudentShouldClaimThemselves").show();
							$(".pt-showIfStudentUnder18").hide();
						} else {
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
						if (localStorage.getItem('studentAge') > 17) {
							init();
							$(".pt-showIfStudentShouldClaimThemselves").show();
							$(".pt-showIfStudentUnder18").hide();
						} else if ((localStorage.getItem('studentAge') > 15) && (localStorage.getItem('studentAge') < 18)) {
							init();
							$(".pt-showIfStudentShouldClaimThemselves").hide();
							$(".pt-claimantShowIfStudentOver16").show();
						} else {
							init();
							$(".pt-showIfStudentShouldClaimThemselves").hide();
							$(".pt-showIfStudentUnder18").show();
						}


						$('input[name=veteranSignificantlyInjured]').change(function () {
							if ($('input[name=veteranSignificantlyInjured]:checked').val() === 'yes') {
								$(".pt-showIfStudentUnder18").show();
								$(".pt-showIfStudentNotDependant").hide();
							} else {
								$(".pt-showIfStudentUnder18").hide();
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
				console.log(selected_option);

				if ((selected_option === 'adoptive-parent') || (selected_option === 'parent')) {
					console.log('valid');
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

			// var selected_option = $('input[name=confirmStudentOrClaimant]:checked').val();

			init();

			// console.log((selected_option));


			if ($('input[name=confirmStudentOrClaimant]:checked').val() === 'guardian') {
				localStorage.removeItem('studentFlow');
				localStorage.removeItem('studentFlowConfirmed');
				localStorage.setItem('claimantFlow', true);
				localStorage.setItem('claimantFlowConfirmed', true);

				$(".pt-student-dob").show();

			} else if ($('input[name=confirmStudentOrClaimant]:checked').val() === 'student') {
				localStorage.removeItem('claimantFlowConfirmed');
				localStorage.setItem('claimantFlowConfirmed', true);
				localStorage.removeItem('claimantFlow');
				localStorage.removeItem('claimantFlowConfirmed');
				localStorage.setItem('studentFlow', true);
				localStorage.setItem('studentFlowConfirmed', true);
				$(".pt-student-dob").hide();
				$('.pt-studentFullTime').show();
				$(".pt-showIfStudentConfirmed").show();
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

		// only for veteran and parent/guardian flows
		if (("veteranFlow" in localStorage) || ("claimantFlow" in localStorage)) {
			// get the name from storage 
			if (localStorage.getItem('studentName')) {
				// add '
				var apostrophe = "'";
				// add s to ' if student's name doesn't end in s
				if (localStorage.getItem('studentName').slice(-1) !== "s") {
					apostrophe = apostrophe + "s";
				}
			}

			var studentApostrophedName = localStorage.getItem('studentName') + apostrophe;
			// both apostrophed and straight names are used in the screens 
			$(".studentNameApostrophed").html(studentApostrophedName);
			$(".studentName").html(localStorage.getItem('studentName'));


		} else {
			$(".studentNameApostrophed").html('');
			$(".studentName").html('');
		}

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

		initStudents();
		$(".pt-studentAge--mature").hide();
		$(".pt-showIfStudentLivingAtHome").hide();
		$(".pt-studentLivingSameAddress").hide();
		$(".pt-studentLivingWithPartnerLessRate").hide();
		$(".pt-showLivingLocation").hide();
		$(".upload-list").show();
		$(".pt-showIfLivingAwayFromHome").hide();
		$(".pt-showIfDocumentUploadShoppingCart").hide();



		$("#firstName").focusout(function () {
			if ($(this).val()) {
				localStorage.removeItem('studentName');
				localStorage.setItem('studentName', $(this).val());
			} else {
				localStorage.removeItem('studentName');
			}
		});




		if (localStorage.getItem('studentAge') > 15) {

			if ("studentFlow" in localStorage) {
				$(".pt-studentAge--mature").each(function () {
					if ($(this).is(".pt-flow--student")) {
						$(this).show("fast");
					}
				});

				$("#veteranFirstName").focusout(function () {
					if ($(this).val()) {
						localStorage.removeItem('veteranFirstName');
						localStorage.setItem('veteranFirstName', $(this).val());
					} else {
						localStorage.removeItem('veteranFirstName');
					}
				});

				$("#veteranLastName").focusout(function () {
					if ($(this).val()) {
						localStorage.removeItem('veteranLastName');
						localStorage.setItem('veteranLastName', $(this).val());
					} else {
						localStorage.removeItem('veteranLastName');
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

		} else {
			$(".pt-studentAge--mature").hide("slow");
			$(".pt-showLivingLocation").show();

		}

		$('input[name=studentLivingLocation]').change(function () {

			localStorage.removeItem('studentLivingLocation');
			localStorage.setItem('studentLivingLocation', $('input[name=studentLivingLocation]:checked').val());

			if ($('input[name=studentLivingLocation]:checked').val() === 'homeless') {
				$(".pt-showIfLivingAway").hide();
				$(".pt-showIfNoPartner").hide();

				// skip the living arrangement details 
				$('.btnNext').prop('onclick', null);
				$('.btnNext').click(function () {
					// event.stopPropagation();
					window.location.href = 'studentclaim3';
				});
			} else {


				$(".pt-showIfLivingAway").show('fast');
				$(".pt-showIfNoPartner").hide();

				if (localStorage.getItem('studentPartneredRelationship') === 'no') {
					$(".pt-showIfNoPartner").show();
				}

			}

			if ($('input[name=studentLivingLocation]:checked').val() === 'away-from-home') {
				$(".pt-showIfLivingAwayFromHome").show();
			} else {
				$(".pt-showIfLivingAwayFromHome").hide();
			}

		});


		// extra details for students 
		if ("studentFlow" in localStorage) {

			$('.btnNext').prop('onclick', null);

			$('.btnNext').click(function () {

				window.location.href = 'studentclaim1a';

			});
		}

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
			if ($('input[name=studentLivingAwayValidReason]:checked').val() === 'yes') {
				localStorage.removeItem('studentLivingAwayValidReason');
				localStorage.removeItem('studentLivingLocation');
				localStorage.setItem('studentLivingLocation', 'away-from-home');
				localStorage.setItem('studentLivingAwayValidReason', true);

			} else {
				localStorage.removeItem('studentLivingAwayValidReason');
				localStorage.removeItem('studentLivingLocation');
				localStorage.setItem('studentLivingLocation', 'at-home');
			}
		});

	}

	// Page 1a
	if (window.location.pathname === "/studentclaim1a") {

		initStudents();

		$(".pt-showLivingLocation").hide();
		$(".pt-showIfLivingAwayFromHome").hide();

		$('input[name=studentPartneredRelationship]').change(function () {

			$(".pt-showLivingLocation").show();

		});
		$('input[name=studentLivingLocation]').change(function () {
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
			}
		});





	}


	if (window.location.pathname === "/studentclaim2") {
		// Page 2 
		initStudents();
		$(".pt-showIfHomeless").hide();
		$(".pt-showIfRequireRentAssistance").hide();
		$(".pt-showIfRenting").hide();
		$(".pt-showIfNotRentLandLord").hide();
		$(".pt-typeOfAccommodationPaymentOther").hide();
		$(".pt-rentPayed").hide();
		$(".pt-showIfAdditionalAddress").hide();
		$(".pt-showIfLivingAway").hide();

		if ((localStorage.getItem('studentLivingLocation') === 'at-home')
			|| (localStorage.getItem('studentPartneredRelationship') === 'yes')
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

		$('input[name=isStudentRenting]').change(function () {
			if ($('input[name=isStudentRenting]:checked').val() === 'yes') {
				$(".pt-showIfRequireRentAssistance").show();
				$(".pt-showIfRenting").show('fast');
				localStorage.removeItem('studentRenting');
				localStorage.setItem('studentRenting', true);
			} else {
				localStorage.removeItem('studentRenting');
				$(".pt-showIfRenting").hide();
			}
		});

		$('input[name=sharingResidence]').change(function () {

			$(".pt-rentPayed").show();

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
		if ("veteranFlow" in localStorage) {
			$('.btnNext').prop('onclick', null);
			$('.btnNext').click(function () {
				// event.stopPropagation();
				window.location.href = '/studentclaimupload';
			})
		}


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

			}
			else if (selected_option === 'secondary') {
				console.log(' selected_option = ' + selected_option);
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

	if (window.location.pathname === "/studentclaim4") {
		// Page 4
		initStudents();

		$('.pt-studentAge--mature').hide();
		$('.pt-showIfEducationAllowanceTaxed').hide();
		$('.pt-showIfCarePercentageLow').hide();
		$('.pt-showIfCarePercentageHigh').hide();
		$('.bank-details-container').hide();


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
				$(".pt-showIfEducationAllowanceTaxed").show('fast');
			} else {
				$(".pt-showIfEducationAllowanceTaxed").hide();
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
				$(".pt-showIfStudentTFN").show('fast');
				localStorage.setItem('studentTFN', true);
			} else {
				$(".pt-showIfStudentTFN").hide();
				localStorage.setItem('studentTFN', false);
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


		// check relationship 

		if ("veteranFlow" in localStorage) {
			if ((localStorage.getItem('veteranReceivesFTB') === 'false') && (localStorage.getItem('studentName') !== null)) {
				// if (true) {
				this.docsRequired.indexOf("proofOfRelationship") === -1 ? this.docsRequired.push("proofOfRelationship") : console.log();
			}
		} else {
			if ((localStorage.getItem('veteranFirstName') !== null) && (localStorage.getItem('veteranLastName') !== null)) {
				// if (true) {
				this.docsRequired.indexOf("proofOfRelationship") === -1 ? this.docsRequired.push("proofOfRelationship") : console.log();
			}
		}

		// check student age
		if (("studentAge" in localStorage) && ("enrolStatus" in localStorage)) {
			this.studentAge = localStorage.getItem('studentAge');
			if (this.studentAge > 15) {
				this.docsRequired.indexOf("proofOfEnrolment") === -1 ? this.docsRequired.push("proofOfEnrolment") : console.log();
			}
		}
		// check if living away from home

		if (localStorage.getItem('studentRenting')) {
			this.docsRequired.indexOf("proofOfResidence") === -1 ? this.docsRequired.push("proofOfResidence") : console.log();
		} else {
			var i = this.docsRequired.indexOf("proofOfResidence");
			if (i != -1) {
				this.docsRequired.splice(i, 1);
			}
		}

		// Display if  Study load == part time
		if ((localStorage.getItem('studentLoadOfStudy') === 'part-time')) {

			this.docsRequired.indexOf("partTimeStudyReason") === -1 ? this.docsRequired.push("partTimeStudyReason") : console.log();
		} else {
			var i = this.docsRequired.indexOf("partTimeStudyReason");
			if (i != -1) {
				this.docsRequired.splice(i, 1);
			}
		}

		if (this.type === 'student') {

			if (localStorage.getItem('studentTFN') === 'true') {
				var i = this.docsRequired.indexOf("noTFN");
				if (i != -1) {
					this.docsRequired.splice(i, 1);
				}

				this.docsRequired.indexOf("tFNDeclaraion") === -1 ? this.docsRequired.push("tFNDeclaraion") : console.log();

			} else {
				// var i = this.docsRequired.indexOf("tFNDeclaraion");
				// if (i != -1) {
				// 	this.docsRequired.splice(i, 1);
				// }
				// this.docsRequired.indexOf("noTFN") === -1 ? this.docsRequired.push("noTFN") : console.log();

			}
		}

		// show all required docs 
		//console.log('number of docs required = ' + this.docsRequired.length);

		if (this.docsRequired.length > 0) {
			jQuery(".pt-showIfDocumentUploadShoppingCart").show();
			$.each(this.docsRequired, function () {
				console.log('docs required = ' + this);
				// $('.pt-' + this).show('slow');

				$('.pt-' + this).removeClass('display-none');
				$('.pt-' + this).addClass('display-block');

			});
		}


		// console.log(this.docsRequired);
		// console.log(this.studentAge);
		// console.log(this.type);
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

			input.addEventListener('change', function (e) {
				var fileName = '';

				fileName = e.target.value.split('\\').pop();

				if (fileName) {
					label.querySelector('.file-upload__file-name').innerHTML = fileName;
					label.querySelector('.file-upload__file-name').classList.add('file-upload__file-name--uploaded');
					label.querySelector('.uikit-btn').innerHTML = 'Remove';
					label.querySelector('.uikit-btn').classList.add('uikit-btn--tertiary');

					$('.file-upload--add').show();

					var status = label.querySelector('.file-upload__file-name').closest('tr');


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
	}(document, window, 0));


	$(".accordion__trigger").click(function () {

		$(this).toggleClass("accordion__trigger--open accordion__trigger--closed");
		$(this).closest(".accordion").toggleClass("accordion--closed accordion--open");

	});

});
