Template.profile.helpers({
	'profile': function() {
		return Meteor.users.findOne({'id':this._id});
	},
	'firstname': function() {
		var first = Meteor.user().realname.split(' ');
		return first[0];
	}
});