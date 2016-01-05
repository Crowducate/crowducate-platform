AutoForm.addInputType("selector-with-text-input", {
    template: "afFieldQuestionOptionsGroup",
    valueOut: function(){
        console.log("from the custom template this ; ");
        console.log(this);
        return "some string";
    },

    valueIn: function(val){
        return val;
    },
    contextAdjust: function(context){
        return context;
    }
});

Template.quizContent.created = function(){
    this.addQuestionButtonDisabled = new ReactiveVar(true);
    this.quizQuestions = new ReactiveVar([]);
    this.quizValidator = new ReactiveVar({});
};

AutoForm.debug();

Template.quizContent.helpers({
    currentQuiz: function(){
        return Template.currentData().activeQuiz;
    },

    questionTypes: function(){
        return QuizOptions.QUESTION_TYPES;
    },

    currentQuestionToBuild:function(){
        console.log("--- current question to build : ");
        console.log(Session.get("currentQuestionToBuild"));
        return Session.get("currentQuestionToBuild") != undefined;
    },

    isMultipleAnswer: function(){

        var editedQuestion = Session.get("currentQuestionToBuild");
        if (editedQuestion)
        {
            return editedQuestion.questionType == QuizOptions.MULTIPLE_CHOICE_MULTIPLE_ANSWERS;
        }
        return false;

    },
    isSingleAnswer: function(){
        var editedQuestion = Session.get("currentQuestionToBuild");
        if (editedQuestion)
        {
            return editedQuestion.questionType == QuizOptions.MULTIPLE_CHOICE_SINGLE_ANSWER;
        }
        return false;
    },
    isTrueOrFalse: function(){

        var editedQuestion = Session.get("currentQuestionToBuild");
        if (editedQuestion)
        {
            return editedQuestion.questionType == QuizOptions.TRUE_OR_FALSE;;
        }
        return false;
    },

    selectedQuestionType: function(){
        var editedQuestion = Session.get("currentQuestionToBuild");
        if (editedQuestion)
        {
            return editedQuestion.questionType;
        }
    },

    quizId: function(){
        var editedQuestion = Session.get("currentQuestionToBuild");
        if (editedQuestion)
        {
            return editedQuestion.quizId
        }
        return null;
    },
    questionId: function(){
        var editedQuestion = Session.get("currentQuestionToBuild");
        if (editedQuestion)
        {
            return editedQuestion.id;
        }
        return null;
    },

    qType: function(){
        var editedQuestion = Session.get("currentQuestionToBuild");
        if (editedQuestion)
        {
            return editedQuestion.questionType;
        }
        return null;
    },

    selectDropdownOptions: function(){
        return [
            {label: "2 choices", value: 2},
            {label: "3 choices", value: 3},
            {label: "4 choices", value: 4},
            {label: "5 choices", value: 5},
            {label: "6 choices", value: 6},
            {label: "7 choices", value: 7},
            {label: "8 choices", value: 8}
        ]
    },
    numOfChoices: function() {
        var formId = AutoForm.getFormId();
        var selection = AutoForm.getFieldValue("numberOfOptions", formId);
        var selectionDropDown = $('.js-number-of-options');
        var numOfOptions = parseInt(selectionDropDown.val()) || 0;

        var editedQuestion = Session.get("currentQuestionToBuild");
        var existingOptions = [];
        console.log(editedQuestion);
        if (editedQuestion && editedQuestion.optionTitles && numOfOptions > 0){
            existingOptions = editedQuestion.optionTitles;
        }

        var isNewType = Session.get("currentQuestionTypeChanged") || Session.get("currentQuestionTypeChanged") == undefined;

        if(existingOptions && existingOptions.length == numOfOptions && !isNewType){
            //the number of options hasn't changed
            console.log(" number of options hasn't changed- return");
            return existingOptions;
        }

        if (isNewType){
            Session.set("currentQuestionTypeChanged", false);
        }
        var optionsArray;
        console.log("--- is New type : " + isNewType);
        console.log("number of options : " + numOfOptions);
        console.log("existing options : " + existingOptions);
        if (numOfOptions > 0){
            optionsArray = [];
            for (var i=0; i < numOfOptions; i++){
                var option;
                if(existingOptions && existingOptions.length > i){
                   option = existingOptions[i];
                }else{
                    option = Quiz.generateAnswerOption("", false, i)
                }
                optionsArray.push(option);
            }
            var editedQuestion = Session.get("currentQuestionToBuild");
            editedQuestion.optionTitles = optionsArray;
            console.log("!!! UPDATED EDITED QUESTION");
            Session.set("currentQuestionToBuild", editedQuestion);
        }

        return optionsArray;
    },

   /* selectedQuestionType: function(){
        var editedQuestion = Session.get("currentQuestionToBuild");
        $('#questionTypesSelector').val(editedQuestion.questionType);
        return editedQuestion.questionType;
    }*/

});

Template.quizContent.events({
    'change #questionTypesSelector': function(event){
        Template.instance().addQuestionButtonDisabled.set(false);
        var activeQuiz = Template.currentData().activeQuiz;
        var questionType = $('#questionTypesSelector').val();
        var question = Quiz.generateQuestion(questionType, activeQuiz._id);
        Session.set("currentQuestionToBuild", question);
        Session.set("currentQuestionTypeChanged", true);
    },


    'deleteQuestion .question-content': function(event){

        //set the reactive var to update the list of questions
        Template.instance().quizQuestions.set(Template.currentData().activeQuiz.questions);
    },

    'click #cancelNewQuestionBtn': function(event){
        Session.set("currentQuestionToBuild", undefined);
        Session.set("currentQuestionTypeChanged", undefined);
        delete Session.keys["currentQuestionToBuild"];
        delete Session.keys["currentQuestionTypeChanged"];
    }

});