Meteor.methods({
  'User.update': function(modifier, documentId) {
    check(modifier, Schema.User);
    Meteor.users.update(documentId, modifier);
  },
  'changeUserPassword': function(doc) {
    //TODO Refactor to submit form without method
    check(doc, Schema.User);
  },
  'User.biography.update': function(userId, doc) {
    Meteor.users.update(userId, {
      $set: {
        'profile.biography': doc
      }
    });
  }
});
