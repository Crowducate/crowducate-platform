Template.profile.helpers({
	'profile': function() {
		return Meteor.users.findOne({'id':this._id});
	}
})