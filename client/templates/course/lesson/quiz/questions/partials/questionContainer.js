Template.questionContainer.helpers({
    questionType: function(){
        return this.question.questionType;
    },

    options: function(){
        return this.question.optionTitles;
    },

    isMultipleAnswer: function(){
        var question = Template.parentData().question;
        return question.questionType == "Multiple Choice - multiple answers";
    },

    optionTitle: function(){
        return this.title;
    },

    optionSelected: function(){
        Session.get("currentQuestionTypeChanged");
        return this.isSelected;
    },

    questionTitle: function(){
        var question = Template.parentData().question;
        return question.title;
    }
});