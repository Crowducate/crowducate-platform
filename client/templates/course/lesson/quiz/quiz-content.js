Template.quizContent.created = function(){
    this.addQuestionButtonDisabled = new ReactiveVar(true);
    this.quizQuestions = new ReactiveVar([]);
    this.quizValidator = new ReactiveVar({});
};

Template.quizContent.helpers({
    currentQuiz: function(){
        return Template.currentData().activeQuiz;
    },

    questionTypes: function(){
        return QuizOptions.QUESTION_TYPES;
    },

    questions: function(){

        //bind to a reactive var updates
        Template.instance().quizQuestions.get();

        var activeQuiz = Template.currentData().activeQuiz;
        return activeQuiz.questions;
    },

    addQuestionButtonDisabled: function(){

        return Template.instance().addQuestionButtonDisabled.get() == true;
    },

    submitButtonLabel: function(){
        //return Blaze._globalHelpers['isEditingCurrentCourse']() == true ? "Save" : "Submit";
        return "Add to Quiz"
    },

    isMultipleAnswer: function(){

        console.log(Template.instance().data)
        var question = Template.instance().data;
        return question.questionType == QuizOptions.MULTIPLE_CHOICE_MULTIPLE_ANSWERS;
    },
    isSingleAnswer: function(){
        var question = Template.instance().data;
        return question.questionType == QuizOptions.MULTIPLE_CHOICE_SINGLE_ANSWER;
    },
    isTrueOrFalse: function(){

        var question = Template.instance().data;
        return question.questionType == QuizOptions.TRUE_OR_FALSE;
    },

    questionIndex: function(){
        return Template.currentData().index + 1;
    }
});

Template.quizContent.events({
    'change #questionTypesSelector': function(event){
        Template.instance().addQuestionButtonDisabled.set(false);
        var activeQuiz = Template.currentData().activeQuiz;

        var question = new Object();// new QuizQuestion();
        question.quizId = activeQuiz._id;
        question.id = Random.id(); //assign an id to the question - need this for checking and validating answers
        question.questionType = $('#questionTypesSelector').val();
        question.saved = false;
        question.answered = false;
        question.description = "";
        question.title = "";
        question.options = [];

        activeQuiz.addNewQuestion(question);

        Template.instance().quizQuestions.set(activeQuiz.questions);
        Template.instance().addQuestionButtonDisabled.set(true);
        $('#questionTypesSelector :first-child').prop('selected', true)
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
                console.log("updating quiz with questions");
                console.log(questions);

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