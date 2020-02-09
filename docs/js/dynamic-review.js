$(document).ready(function() {
  //Mobility
  dynamicAnswer(
    "Is your ability to move around when undertaking your usual activities affected?",
    sessionStorage.getItem("move-ability")
  );
  dynamicAnswer(
    "Do you need the assistance of an aid to help you get around?",
    sessionStorage.getItem("move-aid")
  );
  dynamicAnswer(
    "Do you require assistance to travel?",
    sessionStorage.getItem("travel-aid")
  );
  dynamicAnswer(
    "Do your conditions restrict you to your home?",
    sessionStorage.getItem("home-restricted")
  );
  dynamicAnswer(
    "The more detail you provide the more we can understand how we may be able to support you.",
    sessionStorage.getItem("mobility-deta")
  );

  //Recreational Activities
  dynamicAnswer(
    "Have you given up any recreational activities?",
    sessionStorage.getItem("recreational-given-up")
  );
  dynamicAnswer(
    "Have you reduced your involvement in any recreational activities?",
    sessionStorage.getItem("recreational-reduced")
  );
  dynamicAnswer(
    "Are there activities you planned to undertake but now cannot?",
    sessionStorage.getItem("activities-cannot-undertake")
  );
  dynamicAnswer(
    "The more detail you provide the more we can understand how we may be able to support you.",
    sessionStorage.getItem("recreational-deta")
  );

  //Personal Relationships
  dynamicAnswer(
    "Is your social life affected?",
    sessionStorage.getItem("social-affected")
  );
  dynamicAnswer(
    "Are your daily interactions with people affected?",
    sessionStorage.getItem("interactions-affected")
  );
  dynamicAnswer(
    "Is your ability to form or maintain intimate relationships affected?",
    sessionStorage.getItem("intimate-affected")
  );
  dynamicAnswer(
    "Do you require assistance with personal care?",
    sessionStorage.getItem("personal-assistance")
  );
  dynamicAnswer(
    "Has your connection to the community been affected?",
    sessionStorage.getItem("community-connection")
  );
  dynamicAnswer(
    "The more detail you provide the more we can understand how we may be able to support you.",
    sessionStorage.getItem("relationship-detai")
  );

  //Domestic Activities
  dynamicAnswer(
    "Does it take longer for you to complete your domestic activities?",
    sessionStorage.getItem("domestic-longer")
  );
  dynamicAnswer(
    "Do you need help with domestic activities?",
    sessionStorage.getItem("domestic-help")
  );
  dynamicAnswer(
    "Have you had to stop performing any domestic activities?",
    sessionStorage.getItem("domestic-stop")
  );
  dynamicAnswer(
    "Have your immediate family taken over any domestic activities you normally undertook?",
    sessionStorage.getItem("domestic-family")
  );
  dynamicAnswer(
    "The more detail you provide the more we can understand how we may be able to support you.",
    sessionStorage.getItem("domestic-detail")
  );

  //Employment
  dynamicAnswer("Are you employed?", sessionStorage.getItem("is-employed"));
  dynamicAnswer(
    "Has the way you work been affected?",
    sessionStorage.getItem("work-affected")
  );
  dynamicAnswer(
    "Have your duties or responsibilities changed?",
    sessionStorage.getItem("duties-changed")
  );
  dynamicAnswer(
    "Have your work hours reduced or changed?",
    sessionStorage.getItem("work-reduced")
  );
  dynamicAnswer(
    "Have you had to change jobs?",
    sessionStorage.getItem("changed-jobs")
  );
  dynamicAnswer(
    "Have you had a reduction in pay?",
    sessionStorage.getItem("pay-reduction")
  );
  dynamicAnswer(
    "Are you concerned you may lose your job?",
    sessionStorage.getItem("job-loss")
  );
  dynamicAnswer(
    "Are your promotional opportunities restricted?",
    sessionStorage.getItem("promotional-restricted")
  );
  dynamicAnswer(
    "Have you had to change jobs?",
    sessionStorage.getItem("changed-jobs")
  );
  dynamicAnswer(
    "Have you had a reduction in pay?",
    sessionStorage.getItem("pay-reduction")
  );
  dynamicAnswer(
    "Are you concerned you may lose your job?",
    sessionStorage.getItem("job-loss")
  );
  dynamicAnswer(
    "Are your promotional opportunities restricted?",
    sessionStorage.getItem("promotional-restricted")
  );
  dynamicAnswer(
    "Do you believe you can be more effective in your job if you had additional suport/training to better manage your conditions?",
    sessionStorage.getItem("job-effective")
  );
  dynamicAnswer(
    "Have your conditions affected your ability to work?",
    sessionStorage.getItem("work-ability")
  );
  dynamicAnswer(
    "Have you had any retraining to help you gain or retain employment?",
    sessionStorage.getItem("retain-employment")
  );
  dynamicAnswer(
    "Have you lost a job (excluding any medical discharge from the ADF) because of your conditions?",
    sessionStorage.getItem("job-lost")
  );
  dynamicAnswer(
    "The more detail you provide the more we can understand how we may be able to support you.",
    sessionStorage.getItem("work-ability")
  );

  //Treatment
  dynamicAnswer(
    "Have you undertaken any treatment from your conditions?",
    sessionStorage.getItem("undertaken-treatment")
  );
  dynamicAnswer(
    "Are you still undergoing treatment?",
    sessionStorage.getItem("social-affected")
  );
  dynamicAnswer(
    "Have you been advised that further treatment will not improve your conditions?",
    sessionStorage.getItem("been-advised")
  );
  dynamicAnswer(
    "Tell us in your own words any other impacts of your condition that have not been already covered.",
    sessionStorage.getItem("interactions-affected")
  );
});

function dynamicAnswer(selector, answer) {
  $(".rev-sub__item-question:contains(" + selector + ")")
    .next()
    .text(answer);
}
