Template.deleteQuizQuestionButton.events({
    'click .delete-template-button': function(event){
        var question = Template.currentData().question;

        //create a custom event
        //use document.createEvent as the CustomEvent is not supported by IE
        var deleteQuestionEvent = document.createEvent("HTMLEvents");
        deleteQuestionEvent.initEvent("deleteQuestion", true,  true);
        deleteQuestionEvent.question = question;

        //dispatch the event from the  target button
        var btn = event.target;
        btn.dispatchEvent(deleteQuestionEvent);

    }
});