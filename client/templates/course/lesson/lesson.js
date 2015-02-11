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
