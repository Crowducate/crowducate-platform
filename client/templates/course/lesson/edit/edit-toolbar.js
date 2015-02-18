Template.lessonEditToolbar.events({
    'click #save-lesson-edit': function (event, template) {
        // get the lesson ID
        var lessonID = this._id;

        // Get the HTML from rich text editor
        var lessonText = $('#rich-text-editor').code();

        // update the lesson in database
        Lessons.update(lessonID, {$set: {'text': lessonText}});

        // Clean up rich text editor and reactive variable
        lessonEditCleanup();
    },
    'click #cancel-lesson-edit': function (event, template) {
        // Clean up rich text editor and reactive variable
        lessonEditCleanup();
    }
});
