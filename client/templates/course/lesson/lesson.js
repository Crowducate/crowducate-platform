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
            $('.lesson-text').summernote({
                // TODO: add more config parameters as needed
                height: 300
            });
        }
    }
});
