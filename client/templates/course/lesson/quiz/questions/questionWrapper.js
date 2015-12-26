Template.questionWrapper.helpers({
    isMultipleAnswer: function(){
        console.log("is multiple answer");
        console.log(Template.currentData());
        console.log(Template.parentData());
        console.log(this);
        var question = Template.currentData().question;
        return question.questionType == QuizOptions.MULTIPLE_CHOICE_MULTIPLE_ANSWERS;
    },
    isSingleAnswer: function(){
        var question = Template.currentData().question;
        return question.questionType == QuizOptions.MULTIPLE_CHOICE_SINGLE_ANSWER;
    },
    isTrueOrFalse: function(){

        console.log("isTrueOrFalse");
        console.log(Template.currentData());
        console.log(Template.parentData());
        console.log(this);
        var question = Template.currentData().question;
        return question.questionType == QuizOptions.TRUE_OR_FALSE;
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

