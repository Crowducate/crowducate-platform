Template.lessonEditToolbar.events({
    'click #save-lesson-edit': function (event, template) {
        console.log(this);
    },
    'click #cancel-lesson-edit': function (event, template) {
        // Remove the rich text editor
        $('.lesson-text').destroy();

        // De-activate lesson edit mode
        editingLessonText.set(false);
    }
});
