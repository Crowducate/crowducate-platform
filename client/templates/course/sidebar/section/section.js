Template.courseSidebarSection.helpers({
    'lessons': function () {
        // Get lesson IDs array
        var lessonIDs = this.lessonIDs;

        // Get lessons from database
        var lessons = Lessons.find({_id: {$in: lessonIDs}});

        return lessons;
    }
});
