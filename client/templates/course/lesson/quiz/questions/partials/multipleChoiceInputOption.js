Template.multipleChoiceInputField.helpers({
    isPreviewMode: function(){
        return Blaze._globalHelpers['isEditingCurrentCourse']() == false;
    },
    multipleAnswersAllowed: function(){
        return Template.currentData().multipleAnswersAllowed;
    },

    option: function(){
        return Template.currentData().option;
    },

    index: function(){
        return Template.currentData().index;
    },

    isChecked: function(){
        var option = Template.currentData().option;
        var isEdit = Blaze._globalHelpers['isEditingCurrentCourse']() == true;

        return option.isCorrect && isEdit;
    }
});

Template.multipleChoiceInputField.events({
    'keyup .js-option-title-input': function(event){
        var index = parseInt(event.target.id);
        var text = $(event.target).val();
        var question = Template.currentData().question;
        var option = Template.currentData().option;
        option.title = text;
    },
})