Template.lesson.helpers({
    'activeLesson': function () {
        // Get the lesson ID from session
        var lessonID = activeLessonID.get();

        // Get the lesson from DB
        // selecting the zeroth array item
        var lesson = Lessons.findOne({_id: lessonID});

        return lesson;
    },
    'editingLessonText': function (template) {
        // return true if editing the lesson text
        // value is set on click event
        return editingLessonText.get();
    }
});

Template.lesson.events({
    'click .lesson-text': function () {
        // editing mode is true if text is clicked
        editingLessonText.set(true);

        // in edit mode,
        // add rich text editor
        // to lesson text
        if (editingLessonText.get()) {
            $('#rich-text-editor').summernote({
                'height': 300,
                'focus': true,
                toolbar: [
                    //[groupname, [button list]]
                    ['style', ['bold', 'italic', 'underline', 'clear']],
                    ['para', ['ul', 'ol']],
                    ['insert', ['link','picture','video','hr']],
                    ['view', ['fullscreen', 'codeview']],
                    ['help', ['help']]
                ]
            });

            // Set the rich text editor code to lesson text
            $('#rich-text-editor').code(this.text);
        }
    }
});

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
