Template.lesson.helpers({
  'activeLesson': function () {
    // Get the lesson ID from reactive var
    var lessonID = activeLessonID.get();

    // Get the lesson from DB
    var lesson = Lessons.findOne({_id: lessonID});

    return lesson;
  }
});
