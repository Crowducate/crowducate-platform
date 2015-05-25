Template.courseInfo.helpers({
  'editingThisCourse': function (event, template) {
    // return true if user is editing this course
    return editingThisCourseVar.get();
  }
});
