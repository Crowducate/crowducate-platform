Meteor.methods({
    'User.update': function (modifier,documentId) {
        check(modifier,Schema.User);
        Meteor.users.update(documentId, modifier);
    },
    'changeUserPassword': function(doc) {
        check(doc,Schema.User);
        console.log("invoke password change " + doc);

    }
});