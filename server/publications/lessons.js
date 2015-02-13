Meteor.publish('lessons', function () {
    return Lessons.find();
});

Meteor.publish('courseLessons', function (courseID) {
    return Courses.findOne(courseID).lessons();
});
