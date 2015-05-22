Template.sectionLesson.created = function () {
  // Create new reactive variable for course edit state
  this.editingCourseVar = new ReactiveVar(false);

  // Save lesson ID as instance variable
  this.lessonID = this.data;

  // Subscribe to single section lesson
  this.subscribe('singleLesson', this.lessonID);

  // Get the current router
  controller = Router.current();

  // Get current course from router
  currentCourseId = controller.params._id;

  /*
  * when user is editing the active course,
  * set the value of a reactive variable (true/false)
  * Used to show/hide wysiwyg editor.
  */
  this.autorun(function () {
    var instance = Template.instance();

    // Update course edit variable when editing course
    if (currentCourseId === Session.get('editingCourseID')) {
      instance.editingCourseVar.set(true);
    } else {
      instance.editingCourseVar.set(false);
    };
  });
};

Template.sectionLesson.helpers({
  'editingCourse': function () {
    // Get template instance
    var instance = Template.instance();

    // Keep track of whether user is editing course
    return instance.editingCourseVar.get();
  },
  'lesson': function () {
    // Get template instance as variable
    var instance = Template.instance();

    // Get lesson ID from template instance
    var lessonID = instance.lessonID;

    // Get lesson object from database
    var lessonObject = Lessons.findOne(lessonID);

    return lessonObject;
  }
});

Template.sectionLesson.events({
  'click .sidebar-lesson-link': function (event) {
    event.preventDefault();

    // Get lesson ID variable from data context
    var lessonID = String(this);

    // Check if user is editing lesson text
    if (editingLessonText.get()) {
      // if so, alert them that changes might be lost
      if (window.confirm("Changes may be lost! Proceed?")) {
        // Remove rich text and set edit mode to false
        lessonEditCleanup();

        // set active lesson ID reactive variable
        // to the value of clicked lesson
        activeLessonID.set(lessonID);
      }
    } else {
      // set active lesson ID reactive variable
      // to the value of clicked lesson
      activeLessonID.set(lessonID);
    }
  }
});
