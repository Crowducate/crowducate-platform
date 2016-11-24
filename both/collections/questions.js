Questions = new Mongo.Collection('questions');

QuestionSchema = new SimpleSchema({
    id: {
        type: String,
        optional: false,
        unique: true
    },
    questionType: {
        type:String,
        optional: false
    },
    quizId: {
        type:String,
        optional: false
    },
    title: {
        type:String,
        optional: false
    },
    description : {
        type:String,
        optional: false
    },
    numberOfOptions: {

        type: Number,
        optional: true,
        max: 10,
        min: 2
    },
    optionTitles: {
        label: "Options",
        type: [Object],
        optional: false,
        autoform: {
            type: "radio-with-text-input",
            options: function(){
                var optionsArray = [];

                for ( var i=0; i < 8; i++){
                    var option = Quiz.generateAnswerOption("", false, i)
                    optionsArray.push(option);
                }
                return optionsArray;
            }
        },
        custom: function() {
            // This custom function renders an error, if this field is not equal to
            // the new Password field supplied in the form.
            var titlesValid = true;
            var selectionFound = false;
            for (var i = 0; i < this.value.length; i++){
                var obj = this.value[i];
                if (!obj.title){
                    titlesValid = false;
                    return "invalidQuestionTitles";
                }
                if (obj.isSelected){
                    selectionFound = true;
                }
            }
            if (!selectionFound){
                return "invalidQuestionSelection";
            }
        }
    },

    "optionTitles.$.title": {
        type:String,
        optional: false
    },

    "optionTitles.$.isSelected": {
        type:Boolean,
        optional: false
    },
    "optionTitles.$.index":{
        type:Number,
        optional: false
    },


    options:{
        label: "Options",
        type: [Object],
    }
})


Questions.attachSchema(QuestionSchema);
