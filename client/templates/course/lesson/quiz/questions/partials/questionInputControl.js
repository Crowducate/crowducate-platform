Template.questionInputControl.helpers({
    isMultipleAnswers: function(){
        var question = Template.currentData().question;
        return question.questionType == QuizOptions.MULTIPLE_CHOICE_MULTIPLE_ANSWERS;
    },

    isChecked: function(){
        var option = Template.currentData().option;
        var isEdit = Blaze._globalHelpers['isEditingCurrentCourse']() == true;

        return option.isCorrect && isEdit;
    }
});

Template.questionInputControl.events({

    'change .js-option-selected': function(event){
        var index = parseInt(event.target.id);

        var question = Template.currentData().question;
        var option = question.options[index];

        isEditMode = Blaze._globalHelpers['isEditingCurrentCourse']() == true;

        //only allow to set answers as correct in the edit mode
        if (isEditMode)
        {
            //if it's a single-answer question, clear all other options
            if (question.questionType == QuizOptions.MULTIPLE_CHOICE_SINGLE_ANSWER
                || question.questionType == QuizOptions.TRUE_OR_FALSE){

                    for( var i = 0; i < question.options.length; i++){
                        question.options[i].isCorrect = false;
                    }
                }
            option.isCorrect = event.target.checked;
        }else{
            question.answered = true;
        }
    }
});