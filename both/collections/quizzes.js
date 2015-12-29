Quizzes = new Mongo.Collection('quizzes');

QuizzesSchema.AnswerOptionSchema = new SimpleSchema({
    title: {
        type:String,
        optional: true,
        defaultValue: ""
    },
    isCorrect: {
        type: Boolean,
        defaultValue: false
    },
});

QuizzesSchema.TrueOrFalseSchema = new SimpleSchema({

    group:{
        label: "",
        type:String,
        optional: true,
        allowedValues: ["True", "False"],
        autoform: {
            type: "select-radio"
        }
    }
})

QuizzesSchema.BooleanAnswerOptionSchema = new SimpleSchema({
    label: {
        type:String,
        optional:false,
        allowedValues: ['True', 'False']
    },
    isCorrect:{
        type:Boolean,
        defaultValue: false
    }
})

//this schema will validate the overall questions collection
QuizzesSchema.QuestionsSchema = new SimpleSchema({
    id: {
        type: String,
        optional: false
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
    options : {
        type: [QuizzesSchema.TrueOrFalseSchema],
        optional: true
    },

    saved : {
        type: Boolean,
        optional: true
    },
    answered: {
        type:Boolean,
        optional: true
    },
});


//This schema will validate the initial creation of a quiz
QuizzesSchema.QuizzesSchema = new SimpleSchema({
    title: {
        type:String,
        label: "Quiz Title",
        min: 4,
        max: 140
    },
    questions: {
        //type: [Object],
        type: [QuizzesSchema.QuestionsSchema],
        optional: true
    },

    lessonID: {
        type:String,
    },
});

Quizzes.attachSchema(QuizzesSchema.QuizzesSchema);


/*
 level: {
 label: "Level",
 type: String,
 optional: false,
 allowedValues: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
 autoform: {
 group: studentData,
 type: 'select-radio-inline'
 }
 },
 */

//schema for validation of specific question types

