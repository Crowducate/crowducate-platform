Meteor.publish('images', function () {
    return Images.find();
});
