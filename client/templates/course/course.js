Template.course.events({
    'click  #edit-course': function () {
        // in edit mode,
        // add rich text editor
        // to lesson text
        if (Session.get('editMode')) {
            $('.lesson-text').summernote({
                // TODO: add more config parameters as needed
                height: 300
            });
        }
    },
    'click #cancel-edit-course': function () {
        // not in edit mode,
        // remove rich text editor
        // from lesson text
        if (!Session.get('editMode')) {
            $('.lesson-text').destroy();
        }
    }
});
