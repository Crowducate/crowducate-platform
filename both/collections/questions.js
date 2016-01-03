Questions = new Mongo.Collection('questions');

SingleOptionQuestionSchema = new SimpleSchema({
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
            type: "radio-with-text-input"
        },
        custom: function(){
            console.log("THIS IS FROM CUSTOM VALIDATION");
            return "OPTION TITLES field not validated !!!"
        }
    },

    "optionTitles.$.title": {
        type:String,
        optional: false
    },

    "optionTitles.$.isSelected": {
        type:String,
        optional: false
    },


    options:{
        label: "Options",
        type: [Object],
        autoform: {
            type: "radio-with-text-input"
        }
    }
})

TrueFalseQuestionSchema = new SimpleSchema({
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
        label: "My Description",
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
        type: [String],
        optional: false,
    },
    options : {
        label: "Answer options",
        type: String,
        optional: false,
        autoform: {
            type: "select-radio",
            options: function(){
                return[
                    {
                        label: "True",
                        value: "true"
                    },
                    {
                        label: "False",
                        value: "false"
                    }

                ]
            }
        }
    },
});

//Questions.attachSchema(TrueFalseQuestionSchema);
Questions.attachSchema(SingleOptionQuestionSchema);
