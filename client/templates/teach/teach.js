Template.teach.events({
    'click #addResource': function(event, template){
        event.preventDefault();
        //getting a value of each field
        var title = template.find('#resourceTitle').value;
        var keywords = template.find('#resourceKeywords').value;
        var author = template.find('#authorName').value;
        var description = template.find('#descriptionText').value;

        //adding resource to collection
        Resources.insert({title: title, authoredBy: author, description: description, keywords: keywords});

        // Redirect to the learn page, for now
        Router.go('learn');
    }
})
