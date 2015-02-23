Template.courseToolbar.helpers({
    'editMode': function (event, template) {
        // return true if user is editing this course
        return (Session.get('editingCourseID') === this._id);
    }
});
