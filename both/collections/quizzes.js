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

//This schema will validate the initial creation of a quiz
QuizzesSchema.QuizzesSchema = new SimpleSchema({
    title: {
        type:String,
        label: "Quiz Title",
        min: 4,
        max: 140
    },
    questions: {
        type: [Object],
        optional: true
    },

    lessonID: {
        type:String,
    },
});

Quizzes.attachSchema(QuizzesSchema.QuizzesSchema);


