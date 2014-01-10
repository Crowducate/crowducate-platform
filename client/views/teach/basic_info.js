Template.basicinfo.events({
	'submit form': function (e) {
		e.preventDefault();

		var course = {
		courseTitle: $(e.target).find('[name=courseTitle]').val(),
		subtitle: $(e.target).find('[name=subtitle]').val(), 
		keywords: $(e.target).find('[name=keywords]').val(),
		category: $(e.target).find('[name=category]').val(),
		age: $(e.target).find('[name=age]').val()
		}

		//course._id = Courses.insert(course);

		Meteor.call('createCourse', course, function(error, id) { 
			if (error)
				return alert(error.reason);
		
			Router.go('curriculum', {_id: id}); 
		});
	}
});


/*Template.postSubmit.events({ 
	'submit form': function(e) {
		e.preventDefault();

		var post = {
		url: $(e.target).find('[name=url]').val(),
		title: $(e.target).find('[name=title]').val(), 
		message: $(e.target).find('[name=message]').val()
		}

		Meteor.call('post', post, function(error, id) 
			{ if (error)
				return alert(error.reason);
		Router.go('postPage', {_id: id}); 
	});
	} 
});*/