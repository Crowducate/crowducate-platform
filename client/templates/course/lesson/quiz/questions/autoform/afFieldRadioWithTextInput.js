Template.afFieldRadioWithTextInput.helpers({
    isHidden: function(){
        var question = Session.get("currentQuestionToBuild");
        var totalQuestions = question.optionTitles;
        if (totalQuestions &&  parseInt(this.index) < totalQuestions.length ){
            return false;
        }
        return true;
    },

    isSingleAnswer: function(){
        return this.questionType == QuizOptions.MULTIPLE_CHOICE_SINGLE_ANSWER
    },

    isMultipleAnswer: function(){
        return this.questionType == QuizOptions.MULTIPLE_CHOICE_MULTIPLE_ANSWERS;
    }
});

Template.afFieldRadioWithTextInput.events({
    'keyup .js-answer-option-input': function(event){
        var question = Session.get("currentQuestionToBuild");
        var editedOption = this;
        //update the questions

        var options = question.optionTitles;

        for (var i= 0; i< options.length; i++){
            if (options[i].index.toString() == editedOption.index.toString()){
                options[i].title = $(event.target).val();
                //update the session var
                Session.set("currentQuestionToBuild", question);
            }
        }

    },

    'change .js-answer-option-radio': function(event){
        var question = Session.get("currentQuestionToBuild");
        var editedOption = this;

        //update the questions
        var options = question.optionTitles;

        for (var i= 0; i< options.length; i++){
            if (options[i].index.toString() == editedOption.index.toString()){
                console.log("checked : " + $(event.target).val())
                options[i].isSelected = $(event.target).val() == "on";
                //update the session var

            }else{
                options[i].isSelected = false;
            }
        }
        Session.set("currentQuestionToBuild", question);
    }
})