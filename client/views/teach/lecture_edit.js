Tabnav = {
  _deps: new Deps.Dependency,
  currentTab: 'excercise',
  getCurrentTab: function(){
    this._deps.depend();
    return this.currentTab;
  },
  setCurrentTab: function(value){
    if(value === this.currentTab) return;
    this.currentTab = value;
    this._deps.changed();
  }
};

Template.lectureedit.helpers({
  curriculumPath: function(){
    return Router.path('curriculum', {_id: this.course._id});
  },
  isCurrentTab: function(tab){
    console.log( 'isCurrentTab', Tabnav.getCurrentTab() );
    return (Tabnav.getCurrentTab() === tab);
  }
});

Template.lectureedit.events({
  'click .change-tab': function(e, template){
    e.preventDefault();
    Tabnav.setCurrentTab($(e.target).attr('data-tab'));
  },
  'submit #exercise-form': function(e, template){
    e.preventDefault();
    console.log('template data', template);
    var excercise = {
      intro: $(e.target).find('textarea[name="intro"]').val(),
      instructions: $(e.target).find('textarea[name="instructions"]').val(),
      lectureId: template.data.lecture._id
    };
    Meteor.call('saveExercise', excercise, function(err, result){
      if (err)
        return alert(err.reason);
    });
  },
  'submit #quiz-form': function(e, template){
    e.preventDefault();

    var quiz = {
      quizIntro: $(e.target).find('textarea[name="quizIntro"]').val(),
      answer1: $(e.target).find('input[name="answer1"]').val(),
      answer2: $(e.target).find('input[name="answer2"]').val(),
      answer3: $(e.target).find('input[name="answer3"]').val(),
      answer4: $(e.target).find('input[name="answer4"]').val(),
      correctAnswer: $(e.target).find('input[name="optionsAnswers"]:checked').val(),
      lectureId: template.data.lecture._id
    };

    Meteor.call('saveQuiz', quiz, function(err, result){
      if(err)
        return alert(err.reason);
    });
  }
});