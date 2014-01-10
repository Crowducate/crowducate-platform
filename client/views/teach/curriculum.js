Template.basicinfo.events({
	'submit form': function (e) {
		e.preventDefault();

		var lecture = {
		lectureTitle: $(e.target).find('[name=lectureTitle]').val()}

		Meteor.call('addLecture', lecture, function(error, id) { 
			if (error)
				return alert(error.reason);
		});
	}
});