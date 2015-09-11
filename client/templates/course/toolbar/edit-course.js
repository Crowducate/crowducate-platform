Template.editCourse.events({
  'click #edit-course':function(event, template){
    // Get reference to Router
    var router = Router.current();

    // Get Course ID from router
    var courseId = router.params._id;

    // set editing course session variable to this course id
    Session.set('editingCourseId', courseId);
  }
});

Template.editCourse.helpers({
	'canEditCourse': function() {
    //
		// var router = Router.current();
    //
		// var courseId = router.params._id;
    //
		// //TODO: fine grain
		// var course = Courses.findOne({_id: courseId});
    //
		// //TODO solve exceptions, which are most likely resulting from data not being available early enough.
		// if (Meteor.user().username == course.owner)
		// {
		// 	return true;
		// }
		// else
		// {
		// 	return false;
		// }
    //
	}
});
