Template.testsingleResourcePage.events({
    'click  #edit-resource': function () {
        // in edit mode,
        // add rich text editor
        if (Session.get('editMode')) {
            $('.resource-page-content').summernote();
        }
    },
    'click #cancel-edit-resource': function () {
        // not in edit mode,
        // remove rich text editor
        if (!Session.get('editMode')) {
            $('.resource-page-content').destroy();
        }
    }
});
