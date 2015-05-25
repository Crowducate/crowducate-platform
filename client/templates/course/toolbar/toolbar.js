Template.courseToolbar.helpers({
  'editingThisCourse': function (event, template) {
    // return true if user is editing this course
    return editingThisCourseVar.get();
  }
});

Template.courseToolbar.created = function () {
  // keep track of whether user is editing this course
  // Used in child templates such as lesson and sidebar
  editingThisCourseVar = new ReactiveVar(false);

  // Get the current router object
  var controller = Router.current();

  // Get course ID from router object
  var courseID = controller.params._id;

  this.autorun(function () {
    if (Session.get('editingCourseID') === courseID) {
      editingThisCourseVar.set(true);
    } else {
      editingThisCourseVar.set(false);
    };
  });
}
