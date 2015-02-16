Template.courseSidebarSection.helpers({
    'lessons': function () {
        // Get lesson IDs array
        var lessonIDs = this.lessonIDs;

        // Get lessons from database
        var lessons = Lessons.find({_id: {$in: lessonIDs}});

        return lessons;
    }
});

Template.courseSidebarSection.events({
    'click .editable-submit': function (event, template) {
        // Get the value of the inline editor
        var newName = template.find('input').value;

        // update the lesson in database
        Lessons.update(this._id, {$set: {'name': newName}});
    }
});
