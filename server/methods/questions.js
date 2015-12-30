Meteor.methods({
    'addQuestion': function( question, params){

        console.log(" METEOR METHODS add question : ");
        Questions.insert(question)
    }
})