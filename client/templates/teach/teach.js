Template.teach.events({
    'click #addCourse': function(event, template){
        // prevent default button submit
        event.preventDefault();

        // create an empty course container
        var course = {}

        // Getting form field values
        // Converting keywords to array
        // all other values are strings
        course.title = template.find('#courseTitle').value; // string
        course.author = template.find('#authorName').value; // string
        course.keywords = template.find('#courseKeywords').value.split(','); // split keywords to array
        course.published = template.find('#coursePublished').value; // string
        //course.description = template.find('#descriptionText').value; // string
        course.about = $('#aboutText').code(); // Get the HTML code from the Summernote editor
        //adding course to collection
        Courses.insert(course);

        // Redirect to the learn page, for now
        Router.go('learn');
    }
});

Template.teach.rendered = function() {
    // Attach the summernote editor to the description field
    $('#aboutText').summernote({
        'height': 150,
        toolbar: [
            //[groupname, [button list]]
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
        ]
    });

    // Get an array of the existing tags
    var tagOptions = Tags.find().fetch();

    $('#courseKeywords').selectize({
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
