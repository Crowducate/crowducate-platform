Template.courseSidebar.rendered = function () {
    // Get the template instance
    var instance = Template.instance();

    // Get the current router object
    var controller = Router.current();

    // Get course ID from router object
    var courseID = controller.params._id;
};

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
