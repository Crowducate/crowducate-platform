Template.teach.events({
    'click #addResource': function(event, template){
        event.preventDefault();
        //getting a value of each field
        var title = template.find('#resourceTitle');
        var keywords = template.find('#resourceKeywords');
        var author = template.find('#authorName');
        var description = template.find('#descriptionText');
        //adding resource to collection
        Resources.insert({title: title, author: author, description: description, keywords: keywords});
    }
})
