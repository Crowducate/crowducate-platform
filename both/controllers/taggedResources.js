TaggedResourcesController = AppController.extend({
    waitOn: function() {
        // Wait for the tagged resources to be available for the specific tag
        return this.subscribe('taggedResources', this.params.tag);
    },
    data: function () {
        return Resources.find();
    },
    onAfterAction: function () {
        // Get the tag from the URL parameters
        var tag = this.params.tag;

        // set the reactive state variable "tag" with a value
        //  from our url
        // TODO: try to do this with reactive vars, or similar
        // instead of session variable
        Session.set('tag', this.params.tag);

        // Set the site title for SEO
        Meta.setTitle('Resources tagged "' + tag + '"');
    }
});
