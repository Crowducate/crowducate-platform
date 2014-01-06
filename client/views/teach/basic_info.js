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

		course._id = Courses.insert(course);
		Router.routes['curriculum'];
	}
});