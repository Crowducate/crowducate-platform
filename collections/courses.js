Courses = new Meteor.Collection('courses');

Meteor.methods({
	createCourse: function (courseAttributes) {
		// ensure the post has a title
		/*if (!courseAttributes.Coursetitle)
		throw new Meteor.Error(422, 'Please fill in a headline');*/

		//course._id = Courses.insert(course);

		var course = _.extend(_.pick(courseAttributes, 'courseTitle', 'subtitle', 'keywords','category','age', 'owner'));

		var courseId = Courses.insert(course);

		return courseId;
	}
});