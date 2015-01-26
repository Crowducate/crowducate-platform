Template.teach.events({
    'click #addResource': function(event, template){
        event.preventDefault();

        // create an empty resource container
        var resource = {}

        //getting a value of each field
        resource.title = template.find('#resourceTitle').value;
        resource.author = template.find('#authorName').value;
        resource.keywords = template.find('#resourceKeywords').value;
        resource.published = template.find('#resourcePublished').value;
        resource.description = template.find('#descriptionText').value;

        //adding resource to collection
        Resources.insert(resource);

        // Redirect to the learn page, for now
        Router.go('learn');
    }
});

Template.teach.rendered = function() {
    $('#resourceKeywords').selectize({
        delimiter: ',',
        persist: false,
        create: function(input) {
            return {
                value: input,
                text: input
            }
        }
    });
};
