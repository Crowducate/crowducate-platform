Template.courseSidebar.helpers({
    /*
    Return true when editing the active course
    Used to display 'Add section' form
    */
    'editingThisCourse': function () {
        // return true if editing this course
        return (Session.get('editingCourseID') === this._id);
    },
    'sections': function () {
      return Courses.findOne().sections();
    }
});
