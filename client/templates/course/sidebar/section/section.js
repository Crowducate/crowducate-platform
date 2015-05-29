Template.courseSidebarSection.helpers({
  'editingThisCourse': function () {
    // Return the boolean value of editing this course reactive variable
    return editingThisCourseVar.get();
  },
  'section': function () {
    // Get the section ID from template data
    var sectionID = String(this);

    // Make sure template subscription is ready
    if (Template.instance().subscriptionsReady()) {
      // Get the section from database
      var section = Sections.findOne(sectionID);
;
      // Get the section from template level subscription
      return section;
    }
  }
});

Template.courseSidebarSection.onCreated(function () {
  // Call 'this' 'instance' for consistancy
  var instance = this;

  // Get section ID from instance data
  var sectionID = instance.data;

  // Subscribe to a single section (template level subscription)
  instance.subscribe('singleSection', sectionID);
});
