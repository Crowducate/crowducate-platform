Template.courseSidebarSection.helpers({
    'editingThisCourse': function () {
        // Get the course ID from parent template
        var courseID = Template.parentData()._id;

        // return true if editing this course
        return (Session.get('editingCourseID') === courseID);
    },
    'section': function () {
      // Get the section from template level subscription
      return Template.instance().section();
    }
});

Template.courseSidebarSection.onCreated(function () {
  // Call 'this' 'instance' for consistancy
  var instance = this;

  // Get section ID from instance data
  var sectionID = instance.data;

  // Subscribe to a single section (template level subscription)
  instance.subscribe('singleSection', sectionID);

  // Define function to return single section for this template
  instance.section = function () {
    return Sections.findOne(sectionID);
  };
});
