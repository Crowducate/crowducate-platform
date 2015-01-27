Meteor.methods({
    'searchTagsLike': function(search) {
        // return tags containing a search string
        var regex = ".*" + search + ".*";
        return Tags.find({"name": {$regex: regex}}).fetch();
    },
    'searchTagsEqual': function(search) {
        // return tags that equal the search string
        return Tags.find({'name': search}).fetch();
    },
    insertTag: function (tag) {
        var checkExisting = Meteor.call('searchTagsEqual', tag);

        if (checkExisting.length) {
            console.log("Tag already exists.");
        } else {
            console.log("Inserting tag.");
            Tags.insert({'name': tag});
        }
    }
});
