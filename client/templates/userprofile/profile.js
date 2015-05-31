Template.profile.helpers({
	'profile': function() {
		return Meteor.users.findOne({'id':this._id});
	},
	'firstname': function() {
		var first = Meteor.user().realname.split(' ');
		return first[0];
	}
});

Template.profile.events({
	'click .edit-bio': function() {
		var editableText = $("<textarea style='width:600px;height:75px;' class='editable-bio' />");
		var pHtml = $("#biography").text();
		editableText.val(pHtml);
		$("#biography").replaceWith(editableText)
		
		
	},
	'change .editable-bio': function(event,template) {
		console.log("oh your changed smth");
		var biography = template.find(".editable-bio").value;
		Meteor.call("User.update", Meteor.userId(),"biography", biography);
		var origin = $("<p id='biography'></p>");
		origin.text(biography);
		$(".editable-bio").replaceWith(origin);

	}
});