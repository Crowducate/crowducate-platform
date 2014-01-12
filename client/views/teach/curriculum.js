Template.curriculum.events({
	'submit form': function (e) {
		e.preventDefault();

		var $lectureTitle = $(e.target).find('[name=lectureTitle]');

    	var lecture = {
    		lectureTitle: $lectureTitle.val(),
    		courseId: basicinfo.data._id
    	};

    console.log('add lecture', lecture);

		Meteor.call('addLecture', lecture, function(error, id) { 
			if (error)
				return alert(error.reason);
		});

    return false;
	}
});