Template.teach.events({
    'change #courseCoverImage': function (event, template) {
        // Get the first file selected by the user
        // TODO: only allow the users to select one file
        // TODO: make sure the file is an image of allowed format (png, jpeg, webp)
        var image = event.target.files[0];

        // Insert the image into the database
        // getting the image ID for use in the course object
        var imageObject = Images.insert(image);

        // The image id is stored in the image object
        var imageId = imageObject._id;

        // Create a reactive var to be used when the course is added
        imageIdVar = new ReactiveVar(imageId);
    },
    'click #addCourse': function(event, template){
        // prevent default button submit
        event.preventDefault();

        // create an empty course container
        var course = {
            // Get form field values
            title: template.find('#courseTitle').value, // string

            // Cover Image ID comes from reactive var set in #courseCoverImage change event
            coverImageId: imageIdVar.get(),

            author: template.find('#authorName').value, // string
            keywords: template.find('#courseKeywords').value.split(','), // split keywords to array
            published: template.find('#coursePublished').value, // string
            about: $('#aboutText').code() // Get the HTML code from the Summernote editor
        };

        // Add course to collection
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
