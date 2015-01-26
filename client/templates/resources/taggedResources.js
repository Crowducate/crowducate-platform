Template.taggedResources.helpers({
    'resources': function () {
        return Resources.find().fetch();
    },
    'tag': function () {
        return Session.get('tag');
    }
});
