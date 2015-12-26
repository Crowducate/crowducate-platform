Template.editableTitleDescription.events({
    'keyup #questionTitle': function(event){
        var titleStr = $(event.target).val();
        var question = Template.currentData().question;
        console.log(question)
        question.title = titleStr;
    },

    'keyup #questionDescription': function(event){
        var description = $(event.target).val();
        var question = Template.currentData().question;
        question.description = description;
    },
});

