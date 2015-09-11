// Inherit 'editingThisCourse' helper from course toolbar template
Template.lessonText.helpers({
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
  }
});
