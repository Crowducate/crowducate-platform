Lectures = new Meteor.Collection('lectures');

Meteor.methods({
	addLecture: function (lectureAttributes) {
		console.log('Method.addLecture', lectureAttributes);
		var course = Courses.findOne(lectureAttributes.postId);
		var lecture = _.extend(_.pick(lectureAttributes, 'lectureTitle', 'courseId', 'sectionId'));
    lecture.owner = Meteor.userId();
		console.log('lecture', lecture);
		var lectureId = Lectures.insert(lecture);

		return lectureId;
	},
  saveExercise: function (exerciseAttribtues){
    console.log('saveExercise', exerciseAttribtues);
    var exercise = _.extend(_.pick(exerciseAttribtues, 'intro', 'instructions'));

    Lectures.update({_id: exerciseAttribtues.lectureId}, {$set: exercise});
  },
  saveQuiz: function(quizAttributes){
    console.log('saveQuiz', quizAttributes);
    var quiz = _.extend(_.pick(
      quizAttributes,
      'quizIntro',
      'answer1',
      'answer2',
      'answer3',
      'answer4',
      'correctAnswer'
      ));

    Lectures.update({_id: quizAttributes.lectureId}, {$set: quiz});
  }
});