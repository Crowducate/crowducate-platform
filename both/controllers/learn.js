LearnController = AppController.extend({
    waitOn: function() {
        return this.subscribe('courses');
    },
    data: function () {
        return Resources.find();
    }
});
