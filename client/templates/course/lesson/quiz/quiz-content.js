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
        return Session.get("currentQuestionToBuild");
    },

    isMultipleAnswer: function(){

        var editedQuestion = Session.get("currentQuestionToBuild");
        console.log(" IS MULTIPLE ANSWERS");
        console.log(Session.get("currentQuestionToBuild"));

        if (editedQuestion)
        {
            return editedQuestion.questionType == QuizOptions.MULTIPLE_CHOICE_MULTIPLE_ANSWERS;
        }
        return false;

    },
    isSingleAnswer: function(){
        console.log(" IS SINGLE ANSWER");
        var editedQuestion = Session.get("currentQuestionToBuild");
        console.log(Session.get("currentQuestionToBuild"));
        if (editedQuestion)
        {
            return editedQuestion.questionType == QuizOptions.MULTIPLE_CHOICE_SINGLE_ANSWER;
        }
        return false;
    },
    isTrueOrFalse: function(){

        var editedQuestion = Session.get("currentQuestionToBuild");
        console.log(" IS TRUE OR FALSE");
        console.log(Session.get("currentQuestionToBuild"));
        if (editedQuestion)
        {
            return editedQuestion.questionType == QuizOptions.TRUE_OR_FALSE;;
        }
        return false;
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
    currentSelectionNumberOfChoices: function() {
        var formId = AutoForm.getFormId();
        var selection = AutoForm.getFieldValue("numberOfOptions", formId);
        var selectionDropDown = $('.js-number-of-options');
        var numOfOptions = parseInt(selectionDropDown.val());
        var optionsArray;
        if (numOfOptions > 0){
            optionsArray = [];
            for (var i=0; i < numOfOptions; i++){
                var obj = {
                    "title": "some title",
                    "isSelected": true
                }
                optionsArray.push(obj);
            }
            var editedQuestion = Session.get("currentQuestionToBuild");
            editedQuestion.optionTitles = optionsArray;
            Session.set("currentQuestionToBuild", editedQuestion);
        }

        console.log("optoins array : ");
        console.log(optionsArray);

        return optionsArray;
    },

});

Template.quizContent.events({
    'change #questionTypesSelector': function(event){
        Template.instance().addQuestionButtonDisabled.set(false);
        var activeQuiz = Template.currentData().activeQuiz;
        var question = new Object();// new QuizQuestion();
        question.quizId = activeQuiz._id;
        question.id = Random.id(); //assign an id to the question - need this for checking and validating answers
        question.questionType = $('#questionTypesSelector').val();
        question.description = "";
        question.title = "";
        question.options = [];

        $('#questionTypesSelector :first-child').prop('selected', true);

        Session.set("currentQuestionToBuild", question);
    },

    'change .js-number-of-options': function(event){

    },

    'click .submit-quiz-btn': function(event){

        var isPreview = Blaze._globalHelpers['isEditingCurrentCourse']() == false;
        var activeQuiz = Template.currentData().activeQuiz;
        var questions = activeQuiz.questions;

        if (!isPreview){ //edit mode
            var activeQuiz = Template.currentData().activeQuiz;
            var questions = activeQuiz.questions;
            //mark the questions as saved
            for (var q in questions ){
                var question = questions[q];
                //question.saved = true;
            }

            if (questions != undefined){

                var quizToUpdate = Quizzes.findOne({_id: activeQuiz._id});
                Quizzes.update(activeQuiz._id, {$set: {'questions': questions}})
            }

        }
        else{ // preview/exam mode
            for(var question in questions){
                //console.log("answered : " + question.answered);
            }
            console.log(" should submit the quiz")
        }

    },

    'deleteQuestion .question-content': function(event){

        //set the reactive var to update the list of questions
        Template.instance().quizQuestions.set(Template.currentData().activeQuiz.questions);
    }

});