Meteor.publish('courses', function () {
    return Courses.find();
});

Meteor.publish('publishedCourses', function () {
    return Courses.find({"published": "true"});
});

Meteor.publish('taggedCourses', function (tag) {
    return Courses.find({"keywords": tag});
});

Meteor.publish('singleCourse', function (courseID) {
    return Courses.find({"_id": courseID});
});
