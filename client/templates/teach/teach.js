Template.teach.events({
    'click #addResource': function(event, template){
        // prevent default button submit
        event.preventDefault();

        // create an empty resource container
        var resource = {}

        // Getting form field values
        // Converting keywords to array
        // all other values are strings
        resource.title = template.find('#resourceTitle').value; // string
        resource.author = template.find('#authorName').value; // string
        resource.keywords = template.find('#resourceKeywords').value.split(','); // split keywords to array
        resource.published = template.find('#resourcePublished').value; // string
        resource.description = template.find('#descriptionText').value; // string

        //adding resource to collection
        Resources.insert(resource);

        // Redirect to the learn page, for now
        Router.go('learn');
    }
});

Template.teach.rendered = function() {
    // Get an array of the existing tags
    var tagOptions = Tags.find().fetch();

    $('#resourceKeywords').selectize({
        delimiter: ',',
        persist: false,
        valueField: 'name',
        labelField: 'name',
        searchField: 'name',
        create: true, // TODO: Add entries to Tags collection.
        highlight: true,
        options: tagOptions
    });
};
