Template._header.helpers({
	'usermail': function() {
		return Meteor.user().emails[0].address
	}
});
