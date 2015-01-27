TeachController = AppController.extend({
    data: {

    },
    waitOn: function() {
        // Wait for the tags to be available
        return this.subscribe('tags');
    }
});
