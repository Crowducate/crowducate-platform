Meteor.publish('images', function () {
    return Images.find();
});

Meteor.publish('courseCoverImage', function (courseId) {
    // Get the course object from course ID parameter
    var courseObject = Courses.findOne(courseId);

    // Get image ID from course object
    var coverImageId = courseObject.coverImageId;

    // Find the course cover image and return it
    return Images.find(coverImageId);
});
