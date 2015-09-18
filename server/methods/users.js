Meteor.methods({
    'User.update': function (modifier,documentId) {
        check(modifier,Schema.User);
        Meteor.users.update(documentId, modifier);
    },
    'changePassword': function(modifier,documentId) {
        check(modifier,Schema.User);
        console.log("invoke password change");
    }
});