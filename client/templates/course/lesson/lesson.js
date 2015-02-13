Template.lesson.helpers({
    'activeLesson': function () {
        // Get the lesson ID from session
        // TODO: see if this can be done via reactive var
        var lessonID = Session.get('activeLesson');

        // Get the lesson from DB
        // selecting the zeroth array item
        // TODO: see if findOne would be better here.
        var lesson = Lessons.find(lessonID).fetch()[0];

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
