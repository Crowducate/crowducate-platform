Template.courseSidebarSection.helpers({
    'editingThisCourse': function () {
        // Get the course ID from parent template
        var courseID = Template.parentData()._id;

        // return true if editing this course
        return (Session.get('editingCourseID') === courseID);
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
