Template.trueOrFalseTemplate.helpers({
    optionsDisabled: function(){
        return Blaze._globalHelpers['isEditingCurrentCourse']() == false;
    },

    isTrue: function(){
        //do not display correct answer in the preview mode
        var isPreviewMode = Blaze._globalHelpers['isEditingCurrentCourse']() == false;
        var question = Template.currentData().question;

        if (question.correctAnswer)
        {
            return question.correctAnswer.toLowerCase() == "true" && !isPreviewMode;
        }
        return false
    },

    isFalse: function(){
        //do not display correct answer in the preview mode
        var isPreviewMode = Blaze._globalHelpers['isEditingCurrentCourse']() == false
        var question = Template.currentData().question;

        if (question.correctAnswer)
        {
            return question.correctAnswer.toLowerCase() == "false" && !isPreviewMode;
        }
        return false
    }

});

Template.trueOrFalseTemplate.events({
    'change .js-option-selected': function(event){
        var value = event.target.value;
        var question = Template.currentData().question;

        var isPreviewMode = Blaze._globalHelpers['isEditingCurrentCourse']() == false;
        if (!isPreviewMode)
        {
            //mark the answer as correct for this question
            question.correctAnswer = value;
        }
        else
        {
            //mark the question as answered
            question.answered = true;
        }


    }
})