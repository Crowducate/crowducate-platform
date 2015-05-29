Meteor.publish('resources', function () {
    return Resources.find();
});

Meteor.publish('taggedResources', function (tag) {
    return Resources.find({'keywords': tag});
});
