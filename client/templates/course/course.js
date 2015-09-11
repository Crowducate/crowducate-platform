Template.course.created = function () {
  // Get reference to template instance
  var instance = this;

  // Get reference to router
  var router = Router.current();

  // Get course ID from router
  instance.courseId = router.params._id;

  // Subscribe to single course
  instance.subscribe('singleCourse', instance.courseId);

  // Set the empty active lesson ID variable
  activeLessonID = new ReactiveVar(undefined);
};

Template.course.helpers({
  'course': function () {
    // Get reference to Template instance
    var instance = Template.instance();

    // Get current course
    var course = Courses.findOne(instance.courseId);

    return course;
  }
});
