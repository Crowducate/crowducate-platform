Template.multipleChoiceTemplate.created = function(){
    this.numQuizOptions = new ReactiveVar(0);
};

Template.multipleChoiceTemplate.helpers({
    isMultipleAnswers: function(){
        var question = Template.currentData().question;
        return question.questionType == QuizOptions.MULTIPLE_CHOICE_MULTIPLE_ANSWERS;
    },

    isPreviewMode: function(){
        return Blaze._globalHelpers['isEditingCurrentCourse']() == false;
    },

    selectInputOptions: function(){
        var selectOptions = [];
        var optionObj = {};

        //check if the question has a saved configuration
        var question = Template.currentData().question;

        //set the title (prompt) row for the select input component:
        optionObj.text = "Select number of options";
        optionObj.value = "";
        optionObj.disabled = true;
        var selectedOptionIndex = 0;
        if (question.options)
        {
            //if the options have been set:
            selectedOptionIndex = question.options.length - 1; //the numbering starts with 2 (min number of options)
        }
        else{
            optionObj.selected = true;
        }

        selectOptions.push(optionObj);

        for (var i = 1; i < 8; i++){ // the min number of options should be 2, so starting the loop from 1
            optionObj = {};
            optionObj.text = i+1;
            optionObj.value = i+1;
            selectOptions.push(optionObj);
        }
        selectOptions[selectedOptionIndex].selected = true;
        return selectOptions;
    },

    selectedNumberOfOptions: function(){
        var num = Template.instance().numQuizOptions.get();
        var options = [];

        //check if the question has a saved configuration
        var question = Template.currentData().question;
        if (question.options){
            num = question.options.length;
        }

        for (var i=0 ; i < num; i++)
        {
            if (question.options)
            {
                options.push(question.options[i])
            }else{
                options.push({title:"", isCorrect: false});
            }
        }
        return options;
    },

    optionsDisabled: function(){
        return Blaze._globalHelpers['isEditingCurrentCourse']() == false;
    }
});

Template.multipleChoiceTemplate.events({
    'change #numQuestions': function(event){

        var numOptions = $(event.target).val();
        Template.instance().numQuizOptions.set(numOptions);

        var question = Template.currentData().question;
        question.numAnswerOptions = numOptions;

        var options = [];
        for ( var i= 0; i< numOptions; i++){
            var option = {};
            option.title = "";
            option.isCorrect = false;
            options.push(option);
        }
        //question.options = options;
    },


});