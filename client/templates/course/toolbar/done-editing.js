Template.doneEditingCourse.events({
    'click #done-editing-course': function () {
        // Clear editing course ID session variable
        Session.set('editingCourseID', undefined);
    },
});
