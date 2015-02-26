Template.lesson.helpers({
    'activeLesson': function () {
        // Get the lesson ID from reactive var
        var lessonID = activeLessonID.get();

        // Get the lesson from DB
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
