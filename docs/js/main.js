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

		document.body.setAttribute('tabindex', '0');
		document.body.focus();
		document.body.removeAttribute('tabindex');

		var now = new Date().toLocaleString();

		jQuery('.toast-container').append('<button class="uikit-btn toast" role="alert"><div class="toast__type toast__type--success"><span class="sr">Success</span></div><div class="toast__message"><p>You added this at ' + now + '</p></div></button>');

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
			id31: "Account Number"
		};
	}

	if ("veteranFlow" in sessionStorage || "claimantFlow" in sessionStorage) {
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
			id31: "Account Number"
		};
	}

	if ("claimantFlow" in sessionStorage) {
		question.id5 = "What is the Veteran/Member's relationship to the student?";
	}

	for (var key in question) {
		$("#question_" + key).html(question[key]);
	}

	// Page landing
	if (window.location.pathname === "/student-assistance-landing") {
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

		sessionStorage.clear();

		if (flow) {
			console.log(flow);
			sessionStorage.setItem(flow, true);
			console.log(age);
			if (age) {
				sessionStorage.setItem('studentAge', age);
			}
		} else {
			alert('The prototype requires a flow and age in the url string e.g.  ' + location.protocol + '//' + location.host + location.pathname + '?flow=studentFlow&studentAge=10');
		}
	}

	if (window.location.pathname === "/studentclaim1") {
		// Page 1
		$(".pt-studentAge--mature").hide();
		$(".pt-studentLivingSameAddress").hide();
		$(".pt-studentLivingWithPartnerLessRate").hide();

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
			} else if (selected_option === 'tertiary') {
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
			} else {
				$(".pt-showIfPartTime").hide();
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

				if (sessionStorage.getItem('studentPartneredRelationship') === 'no') {
					$(".pt-showIfNoPartner").show('fast');
				}
			} else {
				$(".pt-showIfLivingAway").hide();
				$(".pt-showIfNoPartner").hide();
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
});