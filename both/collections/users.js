Schema = {};

Schema.UserProfile = new SimpleSchema({
	realName: {
		type: String,
		regEx: /^[a-zA-Z-]{2,25}$/,
		optional: false
	},
	gender: {
		type: String
	},
	language: {
		type: String
	}

});

Schema.User = new SimpleSchema({
	username: {
		type: String,
		regEx: /^[a-zA-Z-]{2,25}$/,	
	},
	emails: {
		type: [Object]
	},
	"emails.$.address": {
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	createdAt: {
		type: Date
	},
	profile: {
		type: Schema.UserProfile,
		optional: true
	}
});

Meteor.users.attachSchema(Schema.User);