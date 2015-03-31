Template.licenseQuestions.helpers({
  'attribution': function () {
    return true;
  },
  'shareAlike': function () {
    return true;
  },
  'allowAdaptation': function () {
    return true;
  },
  'allowCommercial': function () {
    return true;
  },
  'freeCulture': function () {
    return true;
  }
});

Template.licenseQuestions.created = function () {
  // Creative Commons license reactive variables
  var ccAdaptation = new ReactiveVar(),
      ccCommercial = new ReactiveVar();

}
