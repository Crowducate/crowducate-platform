Schema.passwordEdit = new SimpleSchema({
  old: {
    type: String,
    label: "Old Password",
    min: 6,
    max: 30
  },
  new: {
    type: String,
    label: "New Password",
    min: 6,
    max: 30
  },
  newConfirm: {
    type: String,
    label: "Confirm Password",
    min: 6,
    max: 30,
    custom: function() {
      // This custom function renders an error, if this field is not equal to
      // the new Password field supplied in the form.
      if (this.value !== this.field('new').value) {
        return "passwordMismatch";
      }
    }
  }
});

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
    max: 300,
    optional: true
  }
});

Schema.User = new SimpleSchema({
  username: {
    type: String,
    optional: false,
    min: 3,
    max: 15
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
