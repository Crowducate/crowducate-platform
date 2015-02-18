Template.lesson.helpers({
    'activeLesson': function () {
        // Get the lesson ID from session
        // TODO: see if this can be done via reactive var
        var lessonID = Session.get('activeLesson');

        // Get the lesson from DB
        // selecting the zeroth array item
        var lesson = Lessons.findOne({_id: lessonID});

        return lesson;
    },
    'editingLessonText': function () {
        // return true if editing the lesson text
        // value is set on click event
        return editingLessonText.get();
    }
});

Template.lesson.events({
    'click .lesson-text': function () {
        // in edit mode,
        // add rich text editor
        // to lesson text
        if (Session.get('editMode')) {
            $('.lesson-text').summernote({
                // TODO: add more config parameters as needed
                height: 300
            });

            // editing lesson text, so set reactive variable
            editingLessonText.set(true);
        }
    }
});
