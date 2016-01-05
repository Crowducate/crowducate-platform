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


Quizzes.attachSchema(QuizzesSchema.QuizzesSchema);


