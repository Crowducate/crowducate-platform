Quizzes = new Mongo.Collection('quizzes');

QuizOptions = {};

QuizOptions.MULTIPLE_CHOICE_SINGLE_ANSWER = "Multiple Choice - single answer";
QuizOptions.MULTIPLE_CHOICE_MULTIPLE_ANSWERS = "Multiple Choice - multiple answers";
QuizOptions.TRUE_OR_FALSE = "True or False";
QuizOptions.QUESTION_TYPES =
    [   QuizOptions.MULTIPLE_CHOICE_SINGLE_ANSWER,
        QuizOptions.MULTIPLE_CHOICE_MULTIPLE_ANSWERS,
        QuizOptions.TRUE_OR_FALSE
    ];


AnswerOptionSchema = new SimpleSchema({
    title: {
        type:String,
        optional: true,
        defaultValue: ""
    },
    isCorrect: {
        type: Boolean,
        defaultValue: false
    },
})

//this schema will validate the overall questions collection
QuestionsSchema = new SimpleSchema({
    id: {
        type: String,
        optional: true
    },
    questionType: {
        type:String,
        optional: true
    },
    quizId: {
        type:String,
        optional: true
    },
    title: {
        type:String,
        optional: true
    },
    description : {
        type:String,
        optional: true
    },
    options : {
        type: [AnswerOptionSchema],
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
QuizzesSchema = new SimpleSchema({
    title: {
        type:String,
        label: "Quiz Title",
        min: 4,
        max: 140
    },
    questions: {
        //type: [Object],
        type: [QuestionsSchema],
        optional: true
    },

    lessonID: {
        type:String,
    },
});

Quizzes.attachSchema(QuizzesSchema);
