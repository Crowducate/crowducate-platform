Template.lesson.created = function () {
    /*
    Cancel lesson edit mode by
    setting reactive variable to false
    and removing rich text editor
    */
    lessonEditCleanup = function () {
        console.log("Cancel lesson edit.");
        // set the lesson edit mode to false
        editingLessonText.set(false);

        // Hide the rich text editor
        $('#rich-text-editor').destroy();

        // Empty the content returned by the rich text area
        // TODO: see if the destroy() method can return no text
        // this would make the code/cleanup a lot simpler
        $('#rich-text-editor').text('');
    };
};
