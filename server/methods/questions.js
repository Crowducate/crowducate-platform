Meteor.methods({
    'addQuestion': function( question){

        console.log(" METEOR METHODS add question : ");
        console.log(question);
        Questions.insert(question)
    }
})