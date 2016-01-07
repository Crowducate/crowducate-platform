Meteor.methods({
    'addQuestion': function(question, params){
        console.log(" add question : ");
        Questions.insert(question)
    },
    'removeQuestion': function(question){
        Questions.remove({"id": question.id})
    }
})