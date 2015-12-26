Questions = new Mongo.Collection('questions');

//this schema will validate the overall questions collection
//this schema will validate the overall questions collection
QuestionsSchema = new SimpleSchema({
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

});

Questions.attachSchema(QuestionsSchema);
