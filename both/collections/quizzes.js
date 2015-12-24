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


//this schema will validate the overall questions collection
/*QuizzesQuestionsSchema = new SimpleSchema({
    questions: {
        type: Array
    }
});*/

QuizQuestionOptionSchema = new SimpleSchema({

})

//This schema will validate the initial creation of a quiz
QuizzesSchema = new SimpleSchema({
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

    "questions.$.id": {
        type: String,
        optional: true
    },
    "questions.$.questionType": {
        type:String,
        optional: true
    },
    "questions.$.quizId": {
        type:String,
        optional: true
    },
    "questions.$.title": {
        type:String,
        optional: true
    },
    "questions.$.description" : {
        type:String,
        optional: true
    },
   /* "questions.$.options" : {
        type: Array,
        optional: true
    },*/
    "questions.$.numAnswerOptions": {
        type:String,
        optional: true
    },
    "questions.$.saved" : {
        type: Boolean,
        optional: true
    },
    "questions.$.answered": {
        type:Boolean,
        optional: true
    },
    lessonID: {
        type:String,
    },
});

Quizzes.attachSchema(QuizzesSchema);
