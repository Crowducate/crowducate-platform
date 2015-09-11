Template.sectionLesson.created = function () {
  // Save lesson ID as instance variable
  this.lessonID = this.data;

  // Subscribe to single section lesson
  this.subscribe('singleLesson', this.lessonID);
};

Template.sectionLesson.helpers({
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

    // set active lesson ID reactive variable
    // to the value of clicked lesson
    activeLessonID.set(lessonID);
  }
});
