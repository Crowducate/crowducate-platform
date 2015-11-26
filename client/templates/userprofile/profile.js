Template.profile.helpers({
	'thisUser': function() {
		return Meteor.users.findOne({'id':this._id});
	},
	'firstname': function() {
		var first = Meteor.user().realname.split(' ');
		return first[0];
	}
});
// Implementation of Biography update via profile is put on Hold.
/*
Template.profile.events({
	'click .edit-bio': function() {
		if (Session.get("bioEditable"))
		{
			var biography = $(".editable-bio").val();
			var origin = $("#biography");
			origin.text(biography);
			$(".editable-bio").replaceWith(origin);
			$(".statusbio").remove();
			Session.set("bioEditable", false);
		}
		else
		{
			var editableText = $("<textarea style='width:600px;height:75px;' class='editable-bio' /> <p class='statusbio'></p>");
			var pHtml = $("#biography").text();
			editableText.val(pHtml);
			$("#biography").replaceWith(editableText);
			Session.set("bioEditable", "true");
		}
	},
	'change .editable-bio': function(event,template) {
		console.log("oh you changed smth");
		var biography = template.find(".editable-bio").value;
		if (biography.length > 300)
		{
			$("#bio-error").text("You may not have more than 300 characters in your biography");
		}
		else
		{
			$("#bio-error").text("");
			// TODO Rewrite with autoform
			//Meteor.call("User.update", Meteor.userId(),"biography", biography);
			var origin = $("#biography");
			origin.text(biography);
			$(".editable-bio").replaceWith(origin);
			$(".statusbio").remove();
		}
	},
	'keyup .editable-bio': function() {
		var postLength = $(".editable-bio").val().length;
		var charactersLeft = 300 - postLength;
		$('.statusbio').text(charactersLeft + " characters left");
	}
});
*/
