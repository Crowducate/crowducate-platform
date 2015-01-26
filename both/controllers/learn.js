LearnController = AppController.extend({
    waitOn: function() {
        return this.subscribe('resources');
    },
    data: function () {
        return Resources.find();
    }
});
