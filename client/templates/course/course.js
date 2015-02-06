Template.course.events({
    'click  #edit-course': function () {
        // in edit mode,
        // add rich text editor
        if (Session.get('editMode')) {
            $('.course-page-content').summernote();
        }
    },
    'click #cancel-edit-course': function () {
        // not in edit mode,
        // remove rich text editor
        if (!Session.get('editMode')) {
            $('.course-page-content').destroy();
        }
    }
});
