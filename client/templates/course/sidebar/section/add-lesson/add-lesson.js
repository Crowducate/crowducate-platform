Template.sectionAddLesson.events({
    'click .add-lesson-button': function (event, template) {
        // Get lesson name
        var lessonName = template.find(".lesson-name").value;

        // Create temporary lesson object
        var lessonObject = {'name': lessonName};

        // Add lesson to database,
        // getting lesson ID in return
        var lessonId = Lessons.insert(lessonObject);
        if (!this.lessonIDs) {
            this.lessonIDs = [];
        }

        // Add lesson ID to array
        this.lessonIDs.push(lessonId);

        // Get course sections array from parent template
        var courseSections = Template.parentData().sections;

        // Get course ID from parent template
        var courseID = Template.parentData()._id;

        // Save course.lessonIDs array to database
        Courses.update(courseID, {$set: {"sections": courseSections}});

        // Clear the lesson name field
        $(".lesson-name").val('');
    }
});
