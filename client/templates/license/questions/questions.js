Template.licenseQuestions.helpers({
  'attribution': function () {
    // All Creative Commons licenses require attribution (except CC Zero)
    return true;
  },
  'shareAlike': function () {
    // Show 'Share Alike' icon if 'share alike' selected

    // Get the value of allow adaptation reactive variable
    var allowAdaptation = ccAdaptation.get();

    // Check to see if Share Alike is selected
    if (allowAdaptation === 'share-alike') {
      return true;
    }
  },
  'allowAdaptation': function () {
    // Hide the 'no derivative works' icon if adaptations are allow

    // get the value of CC Adaptation reactive variable
    var allowAdaptation = ccAdaptation.get();

    // Make sure adaptation is 'yes' or 'share-alike'
    switch (allowAdaptation) {
      case 'yes':
        return true;
        break;
      case 'share-alike':
        return true;
        break;
      case 'no':
        return false;
        break;
    }
  },
  'allowCommercial': function () {
    // Show 'Non-Commercial' icon if 'no commercial uses' is selected

    // Get the value of allow adaptation reactive variable
    var allowCommercial = ccCommercial.get();

    // Determine if commercial uses are allowed
    switch (allowCommercial) {
      case 'yes':
        return true;
        break;
      case 'no':
        return false;
        break;
      }
  },
  'freeCulture': function () {
    // Determine if license choices are Free Cultural Work
    // http://creativecommons.org/freeworks
    // http://freedomdefined.org/Definition

    // Get license choices
    var allowAdaptation = ccAdaptation.get();
    var allowCommercial = ccCommercial.get();

    // Create Free Cultural Work variables
    var fcwAdaptation, fcwCommercial;

    // Check adaptation freedom
    if (allowAdaptation === 'yes' || allowAdaptation === 'share-alike') {
      // Free Cultural Work adaptation requirement met
      fcwAdaptation = true;
    }

    // Check commercial use freedom
    if (allowCommercial === 'yes') {
      // Commercial use requirement met
      fcwCommercial = true;
    }

    // Check if both Free Cultural Work requirements are met
    if (fcwAdaptation && fcwCommercial) {
      return true;
    }
},
'fcwFeedbackColor': function () {
    /*
    Change the color of bootstrap panel
    based on freedoms allowed
      'no adaptations' = 'danger' (not compatible with Crowducate forking)
      'no commercial use' = 'warning' (Not Free Cultural Work)
      otherwise 'succcess' (Free Cultural Work)
    */

    // Get license choices
    var allowAdaptation = ccAdaptation.get();
    var allowCommercial = ccCommercial.get();

    // No derivative works? 'danger' status
    if (allowAdaptation === 'no') {
        return 'danger';
    } else if (allowCommercial === 'no') {
        return 'warning';
    } else {
        return 'success';
    }
}
});

Template.licenseQuestions.created = function () {
  // Creative Commons license reactive variables
  // Default values set to match template dafaults
  ccAdaptation = new ReactiveVar('yes');
  ccCommercial = new ReactiveVar('yes');

};

Template.licenseQuestions.events({
  'change [name=cc-adaptation]': function (event, template) {
    // Set the value of CC Adaptation reactive variable
    ccAdaptation.set(event.target.value);
  },
  'change [name=cc-commercial]': function (event, template) {
    // Set the value of CC Commercial reactive variable
    ccCommercial.set(event.target.value);
  }
});
