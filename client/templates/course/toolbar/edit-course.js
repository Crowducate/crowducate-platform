Template.editCourse.events({
    'click #edit-course':function(event, template){
        // set editing course session variable to this course id
        Session.set('editingCourseID', this._id);
    }
});
