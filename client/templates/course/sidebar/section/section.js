Template.courseSidebarSection.helpers({
  'editingThisCourse': function (event, template) {
    // Get reference to current router
    var router = Router.current();

    // Get Course ID from router
    var currentCourseId = router.params._id;

    // Get value of editing course session variable
    var editingCourseId = Session.get('editingCourseId')

    // See if user is editing current course
    var editingCurrentCourse = (editingCourseId === currentCourseId);

    // return true if user is editing this course
    return editingCurrentCourse;
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
