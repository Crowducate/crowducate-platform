Template.courseInfo.created = function(){
  // Create new reactive variable for course edit state
  this.editingCourseVar = new ReactiveVar(false);

  // Get the current router
  controller = Router.current();

  // Get current course from router
  currentCourse = controller.params._id;

  /*
  * when user is editing the active course,
  * set the value of a reactive variable (true/false)
  * Used to show/hide wysiwyg editor.
  */
  this.autorun(function () {
      var instance = Template.instance();

      // Update course edit variable when editing course
      if (currentCourse === Session.get('editingCourseID')) {
          instance.editingCourseVar.set(true);
      } else {
          instance.editingCourseVar.set(false);
      };
  });
};

Template.courseInfo.helpers({
  'editingThisCourse': function () {
      var instance = Template.instance();
      // Keep track of whether user is editing course
      return instance.editingCourseVar.get();
  }
});
