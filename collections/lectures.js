Lectures = new Meteor.Collection('lectures');

Meteor.methods({
	addLecture: function (lectureAttributes) {
		console.log('Method.addLecture', lectureAttributes);
		var course = Courses.findOne(lectureAttributes.postId);
		var lecture = _.extend(_.pick(lectureAttributes, 'lectureTitle', 'courseId'));
		console.log('lecture', lecture);
		var lectureId = Lectures.insert(lecture);

		return lectureId;
	}
});