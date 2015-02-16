Template.lesson.helpers({
    'activeLesson': function () {
        // Get the lesson ID from session
        // TODO: see if this can be done via reactive var
        var lessonID = Session.get('activeLesson');

        // Get the lesson from DB
        // selecting the zeroth array item
        var lesson = Lessons.findOne({_id: lessonID});

        return lesson;
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
        } else if (!Session.get('editMode')) {
            // not in edit mode,
            // remove rich text editor
            // from lesson text
            $('.lesson-text').destroy();
        }
    }
});
