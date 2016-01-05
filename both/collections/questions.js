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
       /* custom: function() {
            // This custom function renders an error, if this field is not equal to
            // the new Password field supplied in the form.
            console.log(" custom validation ");
            console.log("this.value, this.field ");
            console.log(this.value);
            console.log(this.field);
            console.log(this)
            return "invalidQuestionSettings"
        }*/
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
