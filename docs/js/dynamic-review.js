$(document).ready(function() {
  //Mobility
  dynamicAnswer(
    "Is your ability to move around when undertaking your usual activities affected?",
    "move-ability"
  );
  dynamicAnswer(
    "Do you need the assistance of an aid to help you get around?",
    "move-aid"
  );
  dynamicAnswer("Do you require assistance to travel?", "travel-aid");
  dynamicAnswer(
    "Do your conditions restrict you to your home?",
    "home-restricted"
  );
  dynamicAnswer(
    "The more detail you provide the more we can understand how we may be able to support you.",
    "mobility-deta"
  );

  //Recreational Activities
  dynamicAnswer(
    "Have you given up any recreational activities?",
    "recreational-given-up"
  );
  dynamicAnswer(
    "Have you reduced your involvement in any recreational activities?",
    "recreational-reduced"
  );
  dynamicAnswer(
    "Are there activities you planned to undertake but now cannot?",
    "activities-cannot-undertake"
  );
  dynamicAnswer(
    "The more detail you provide the more we can understand how we may be able to support you.",
    "recreational-detai"
  );

  //Personal Relationships
  dynamicAnswer("Is your social life affected?", "social-affected");
  dynamicAnswer(
    "Are your daily interactions with people affected?",
    "interactions-affected"
  );

  dynamicAnswer(
    "Are your relationships with your family affected?",
    "relationships-affected"
  );
  dynamicAnswer(
    "Is your ability to form or maintain intimate relationships affected?",
    "intimate-affected"
  );
  dynamicAnswer(
    "Do you require assistance with personal care?",
    "personal-assistance"
  );
  dynamicAnswer(
    "Has your connection to the community been affected?",
    "community-connection"
  );

  dynamicAnswer(
    "Has your conditions affected your ability to work?",
    "work-affected"
  );
  dynamicAnswer(
    "The more detail you provide the more we can understand how we may be able to support you.",
    "relationship-detai"
  );

  //Domestic Activities
  dynamicAnswer(
    "Does it take longer for you to complete your domestic activities?",
    "domestic-longer"
  );
  dynamicAnswer("Do you need help with domestic activities?", "domestic-help");
  dynamicAnswer(
    "Have you had to stop performing any domestic activities?",
    "domestic-stop"
  );
  dynamicAnswer(
    "Have your immediate family taken over any domestic activities you normally undertook?",
    "domestic-family"
  );
  dynamicAnswer(
    "The more detail you provide the more we can understand how we may be able to support you.",
    "domestic-detai"
  );

  //Employment
  dynamicAnswer("Are you employed?", "is-employed");
  dynamicAnswer("Has the way you work been affected?", "work-affected");
  dynamicAnswer(
    "Have your duties or responsibilities changed?",
    "duties-changed"
  );
  dynamicAnswer("Have your work hours reduced or changed?", "work-reduced");
  dynamicAnswer("Have you had to change jobs?", "changed-jobs");
  dynamicAnswer("Have you had a reduction in pay?", "pay-reduction");
  dynamicAnswer("Are you concerned you may lose your job?", "job-loss");
  dynamicAnswer(
    "Are your promotional opportunities restricted?",
    "promotional-restricted"
  );
  dynamicAnswer("Have you had to change jobs?", "changed-jobs");
  dynamicAnswer("Have you had a reduction in pay?", "pay-reduction");
  dynamicAnswer("Are you concerned you may lose your job?", "job-loss");
  dynamicAnswer(
    "Are your promotional opportunities restricted?",
    "promotional-restricted"
  );
  dynamicAnswer(
    "Do you believe you can be more effective in your job if you had additional support/training to better manage your conditions?",
    "job-effective"
  );
  dynamicAnswer(
    "Have your conditions affected your ability to work?",
    "work-ability"
  );
  dynamicAnswer(
    "Have you had any retraining to help you gain or retain employment?",
    "retain-employment"
  );
  dynamicAnswer(
    "Have you lost a job (excluding any medical discharge from the ADF) because of your conditions?",
    "job-lost"
  );
  dynamicAnswer(
    "The more detail you provide the more we can understand how we may be able to support you.",
    "employment-detai"
  );

  //Treatment
  dynamicAnswer(
    "Have you undertaken any treatment from your conditions?",
    "undertake-treatment"
  );
  dynamicAnswer("Are you still undergoing treatment?", "still-treatment");
  dynamicAnswer(
    "Have you been advised that further treatment will not improve your conditions?",
    "been-advised"
  );
  dynamicAnswer(
    "Tell us in your own words any other impacts of your condition that have not been already covered.",
    "treatment-detai"
  );
});

function dynamicAnswer(selector, answer) {
  if (answer.includes("deta")) {
    if (answer == "domestic-detai") {
      printAnswer = sessionStorage.getItem(answer);
      printAnswer === null
        ? $(".domestic-detail .rev-sub__item-answer")
            .parent()
            .hide()
        : $(".domestic-detail .rev-sub__item-answer").text(printAnswer);
    }

    if (answer == "recreational-detai") {
      printAnswer = sessionStorage.getItem(answer);
      printAnswer === null
        ? $(".recreational-detail .rev-sub__item-answer")
            .parent()
            .hide()
        : $(".recreational-detail .rev-sub__item-answer").text(printAnswer);
    }
    if (answer == "employment-detai") {
      printAnswer = sessionStorage.getItem(answer);
      printAnswer === null
        ? $(".employment-detail .rev-sub__item-answer")
            .parent()
            .hide()
        : $(".employment-detail .rev-sub__item-answer").text(printAnswer);
    }
    if (answer == "mobility-deta") {
      printAnswer = sessionStorage.getItem(answer);
      printAnswer === null
        ? $(".mobility-detail .rev-sub__item-answer")
            .parent()
            .hide()
        : $(".mobility-detail .rev-sub__item-answer").text(printAnswer);
    }

    if (answer == "relationship-detai") {
      printAnswer = sessionStorage.getItem(answer);
      printAnswer === null
        ? $(".personal-detail .rev-sub__item-answer")
            .parent()
            .hide()
        : $(".personal-detail .rev-sub__item-answer").text(printAnswer);
    }

    if (answer == "treatment-detai") {
      printAnswer = sessionStorage.getItem(answer);
      printAnswer === null
        ? $(".treatments-detail .rev-sub__item-answer")
            .parent()
            .hide()
        : $(".treatments-detail .rev-sub__item-answer").text(printAnswer);
    }
  } else {
    printAnswer = sessionStorage.getItem(answer);
    moreAnswer = sessionStorage.getItem(answer + "-mo");
    let questionDiv = $(".rev-sub__item-question:contains(" + selector + ")");
    printAnswer === null
      ? questionDiv.parent().hide()
      : questionDiv
          .next()
          .text(validateAnswer(printAnswer) + (moreAnswer ? moreAnswer : ""));
  }
}

function validateAnswer(answer) {
  if (answer) {
    if (answer === "no") return "No. ";
    if (answer === "yes") return "Yes. ";
  } else {
    return "(no answer)";
  }
}
