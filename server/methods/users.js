Meteor.methods({
    'User.update': function (modifier,documentId) {
        check(modifier,Schema.User);
        Meteor.users.update(documentId, modifier);
    },
    'changeUserPassword': function(modifier,documentId) {
        check(modifier,Schema.User);
        console.log("invoke password change" + modifier.password + documentId);

    }
});