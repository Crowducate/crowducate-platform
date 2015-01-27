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
    // Attach the summernote editor to the description field
    $('#descriptionText').summernote({
        'height': 150
    });

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
        maxOptions: 5,
        options: tagOptions,
        onItemAdd: function (item) {
            // Check to see if tag exists in Tags collection
            // by querying the database for the tag name
            // and checking the length of the result
            var existingTag = Tags.find({"name": item}).fetch().length;
            if (!existingTag ) {
                // Add the tag to the Tags collection
                // TODO: figure out how to limit duplicate tags
                // e.g. 'Beans' and 'beans'
                // unless this is not an issue
                Tags.insert({"name": item});
            }
        }
    });
};
