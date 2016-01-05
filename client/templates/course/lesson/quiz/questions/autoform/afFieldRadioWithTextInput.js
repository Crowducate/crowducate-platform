Template.afFieldRadioWithTextInput.helpers({
    isHidden: function(){
        var question = Session.get("currentQuestionToBuild");

        //the true-or-false questions will always have only two options
        if (this.questionType == QuizOptions.TRUE_OR_FALSE){
            return this.index > 1;
        }

        //for the multiple choice - check the number of options selected in the GUI
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
    },

    isTrueOrFalse: function(){
        return this.questionType == QuizOptions.TRUE_OR_FALSE;
    },

    trueOrFalseLabel: function(){
        var label;
        if (this.index < 2){
            return this.index == 0 ? "True" : "False";
        }
        return label;
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
                options[i].isSelected = $(event.target).val() == "on";
            }else{
                options[i].isSelected = false;
            }
        }
        Session.set("currentQuestionToBuild", question);
    },
    'change .js-answer-option-checkbox': function(event){
        var question = Session.get("currentQuestionToBuild");
        var editedOption = this;

        //update the questions
        var options = question.optionTitles;

        for (var i= 0; i< options.length; i++){
            if (options[i].index.toString() == editedOption.index.toString()){
                options[i].isSelected = $(event.target).val() == "on";
            }
        }
        Session.set("currentQuestionToBuild", question);
    }
});