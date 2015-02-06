CourseController = AppController.extend({
  waitOn: function() {
        // Wait for the course to be available
        return this.subscribe('singleCourse', this.params._id);
    },
    data: function () {
        // Return the course
        return Courses.findOne();
    },
    onAfterAction: function () {
        // Get the course ID from the URL parameters
        var courseID = this.params._id;

        // Get the course from the database
        var course  = Courses.find(courseID).fetch()[0]; // select the zeroeth array item

        // Set the site title for SEO
        Meta.setTitle(course.title);
    }
});
