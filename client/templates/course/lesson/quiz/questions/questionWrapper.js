Template.questionWrapper.helpers({
    isMultipleAnswer: function(){
        console.log("is multiple answer");
        console.log( Session.get("currentQuestionToBuild"));

        var question =  Session.get("currentQuestionToBuild");;
        return question? question.questionType == QuizOptions.MULTIPLE_CHOICE_MULTIPLE_ANSWERS : false;
    },
    isSingleAnswer: function(){
        var question = Session.get("currentQuestionToBuild");;
        return question? question.questionType == QuizOptions.MULTIPLE_CHOICE_SINGLE_ANSWER : false;
    },
    isTrueOrFalse: function(){

        var question = Session.get("currentQuestionToBuild");;
        return question ? question.questionType == QuizOptions.TRUE_OR_FALSE : false;
    },

    questionIndex: function(){
        return Template.currentData().index + 1;
    }
});

Template.questionWrapper.events({
    'deleteQuestion .question-wrapper-row': function(event){
        var quiz = Template.parentData().activeQuiz;
        var question = Template.currentData().question;

        //remove the question
        var index = quiz.questions.indexOf(question);
        quiz.questions.splice(index, 1);

        var updateEvent = document.createEvent("Event");
        updateEvent.initEvent("questionDeleted", true, true);
        event.target.dispatchEvent(updateEvent);
    }
});

