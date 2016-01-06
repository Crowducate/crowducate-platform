Meteor.methods({
    'addQuestion': function( question, params){

        console.log(" METEOR METHODS add question : ");
        Questions.insert(question)
    },
    'addSingleAnswerQuestion': function(question, params){
        console.log(" METEOR METHODS add SINGLE option question : ");
        Questions.insert(question)
    },
    'removeQuestion': function(question){
        Questions.remove({"id": question.id})
    }
})