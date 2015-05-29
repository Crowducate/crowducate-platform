Template.courseSidebar.helpers({
    /*
    Return true when editing the active course
    Used to display 'Add section' form
    */
    'editingThisCourse': function () {
      // Return the boolean value of editing this course reactive variable
      return editingThisCourseVar.get();
    },
    'sections': function () {
      return Courses.findOne().sections();
    }
});
