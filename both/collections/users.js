Schema = {};

Schema.UserProfile = new SimpleSchema({
    gender: {
        type: String,
        allowedValues: [
            "Female",
            "Male",
            "Unknown"
        ]
    },
    language: {
        type: String,
        optional: true
    },
    biography: {
        type: String,
        max: 300
    }
});

Schema.User = new SimpleSchema({
    username: {
        type: String
    },
    password: {
        type: String,
        optional: true,
        min: 8
    },
    passwordCheck: {
        type: String,
        optional: true,
        min: 8,
        custom: function () {
            if (this.value !== this.field('password').value) {
                return "passwordMismatch";
            }
        }
    },
    emails: {
        type: Array,
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

Meteor.users.attachSchema(Schema.User);