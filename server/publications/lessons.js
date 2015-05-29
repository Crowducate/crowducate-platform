Meteor.publish('lessons', function () {
    return Lessons.find();
});

Meteor.publish('singleLesson', function (lessonID) {
    return Lessons.find({"_id": lessonID});
});
