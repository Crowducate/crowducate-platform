Meteor.publish('singleSection', function (sectionID) {
    return Sections.find({"_id": sectionID});
});
