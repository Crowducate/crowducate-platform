LearnController = AppController.extend({
    waitOn: function() {
        return this.subscribe('publishedCourses');
    },
    data: function () {
        return Resources.find();
    }
});
