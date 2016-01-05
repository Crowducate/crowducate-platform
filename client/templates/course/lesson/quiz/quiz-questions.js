Template.quizQuestions.helpers({
    questions: function(){
        if (!this.quiz) return;
        var id = this.quiz._id;
        console.log("this. quiz id : " + id);

        var questions = Questions.find({"quizId": id}).fetch();

        console.log(questions);
        return questions;
    }
});