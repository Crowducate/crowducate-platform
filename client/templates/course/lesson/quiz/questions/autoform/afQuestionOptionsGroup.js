Template.afFieldQuestionOptionsGroup.helpers({

    displayedOptions: function(){
        var question = Session.get("currentQuestionToBuild");

        var displayedOptions = [];
        var allOptions = Template.instance().data.selectOptions;

        var totalQuestions = question && question.optionTitles ? question.optionTitles.length : 0;

        for (var i= 0; i< totalQuestions; i++){
            displayedOptions.push (allOptions[i]);
        }

        return displayedOptions;
    },

    isHidden: function(){

        var question = Session.get("currentQuestionToBuild");
        //the true-or-false questions will always have only two options
        if (question.questionType == QuizOptions.TRUE_OR_FALSE){
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
        var question = Session.get("currentQuestionToBuild");
        return question.questionType == QuizOptions.MULTIPLE_CHOICE_SINGLE_ANSWER
    },

    isMultipleAnswer: function(){
        var question = Session.get("currentQuestionToBuild");
        return question.questionType == QuizOptions.MULTIPLE_CHOICE_MULTIPLE_ANSWERS;
    },

    isTrueOrFalse: function(){
        var question = Session.get("currentQuestionToBuild");
        return question.questionType == QuizOptions.TRUE_OR_FALSE;
    },

    trueOrFalseLabel: function(){
        var label;
        if (this.index < 2){
            return this.index == 0 ? "True" : "False";
        }
        return label;
    },

    answerIndex: function(){
        return this.index + 1;
    },
    answerSelected: function(){
        return this.isSelected;
    }
});

Template.afFieldQuestionOptionsGroup.rendered = function(){
    $('.js-answer-option-radio').attr("checked", false);
}

//

Template.afFieldQuestionOptionsGroup.events({
    'blur .js-answer-option-input': function(event){
        var question = Session.get("currentQuestionToBuild");
        var editedOption = this;
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