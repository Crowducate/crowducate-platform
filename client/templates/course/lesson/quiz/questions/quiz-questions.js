Template.quizQuestions.helpers({
    questions: function(){
        if (!this.quiz) return;
        var id = this.quiz._id;
        var questions = Questions.find({"quizId": id}).fetch();
        return questions;
    }
});