Template.courseSidebarSection.helpers({
    'lessons': function () {
        // Get lesson IDs array
        var lessonIDs = this.lessonIDs;

        // Get lessons from database
        var lessons = Lessons.find({_id: {$in: lessonIDs}});

        return lessons;
    },
    'editingThisCourse': function () {
        // Get the course ID from parent template
        var courseID = Template.parentData()._id;

        // return true if editing this course
        return (Session.get('editingCourseID') === courseID);
    }
});
