Template.questionWrapperTitle.helpers({
    isMultipleAnswer: function(){
        var question =  this.question;
        return question? question.questionType == QuizOptions.MULTIPLE_CHOICE_MULTIPLE_ANSWERS : false;
    },
    isSingleAnswer: function(){
        var question = this.question;
        return question? question.questionType == QuizOptions.MULTIPLE_CHOICE_SINGLE_ANSWER : false;
    },
    isTrueOrFalse: function(){

        var question = this.question;
        return question ? question.questionType == QuizOptions.TRUE_OR_FALSE : false;
    },

    questionIndex: function(){
        return Template.currentData().index + 1;
    }
});

Template.questionWrapperTitle.events({
    'deleteQuestion .question-wrapper-row': function(event){
        var question = Template.currentData().question;
        Meteor.call("removeQuestion", question);
    }
});

