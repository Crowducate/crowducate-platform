Meteor.publish('quizzes', function () {
    return Quizzes.find();
});

Meteor.publish('singleQuiz', function (quizID) {
    return Quizzes.find({"_id": quizID});
});

Meteor.publish('questions', function(){
    return Questions.find();
});

