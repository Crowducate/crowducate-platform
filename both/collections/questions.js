Questions = new Mongo.Collection('questions');

QuestionsSchema = new SimpleSchema({
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
    options : {
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

Questions.attachSchema(QuestionsSchema);
