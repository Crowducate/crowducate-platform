Meteor.publish('courses', function () {
    return Courses.find();
});

Meteor.publish('taggedCourses', function (tag) {
    return Courses.find({'keywords': tag});
});
