Template.lessonQuizTemplate.events({
    'click .sidebar-quiz-link': function(event){
        event.preventDefault();

        var data = Template.currentData();
        var quizId = String(data._id);
        activeQuizID.set(quizId);

        //TODO [EM] temporary code to toggle lesson and quiz
        activeLessonID.set(undefined);
    }
});

Template.lessonQuizTemplate.helpers({
    quiz: function(){
        return Template.currentData();
    }
})