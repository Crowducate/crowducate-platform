Template.curriculum.events({
	'submit form': function (e) {
		e.preventDefault();

		var lecture = {
		  lectureTitle: $(e.target).find('[name=lectureTitle]').val()
    };

    console.log('add lecture', lecture);

		Meteor.call('addLecture', lecture, function(error, id) { 
			if (error)
				return alert(error.reason);
		});

    return false;
	}
});