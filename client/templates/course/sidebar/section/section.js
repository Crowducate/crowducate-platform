Template.courseSidebarSection.helpers({
    'editMode': function () {
        return Session.get('editMode');
    },
    'lessons': function () {
        // Get lesson IDs array
        var lessonIDs = this.lessonIDs;

        // Get lessons from database
        var lessons = Lessons.find({_id: {$in: lessonIDs}});

        return lessons;
    }
});

//Template.section.events({
//    'click .add-lesson': function (event, template) {
//        // get the value of the input field
//        var lessonTitle = template.find('.lesson-title').value;
//
//        // Make sure the lesson title contains one or more characters
//        // and add lesson to section
//        if (lessonTitle.length) {
//            // set up a demonstration lesson with title
//            var newLesson = {"title": lessonTitle};
//
//            // get the template data for use in this funciton
//            // TODO: Re-write this to interact with database
//            var courseData = template.data;
//
//            // add the example lesson to the lessons object
//            courseData.lessons.push(newLesson);
//
//            // Set the reactive variable to include the new lesson
//            // sections is defined in the resource-sidebar.js
//            sections.set(courseData);
//
//            // Reset the template field
//           $('.lesson-name').val('');
//        }
//    }
//});
//Template.courseSidebarSection.events({
//    'click .add-lesson': function (event, template) {
//        // get the value of the input field
//        var lessonTitle = template.find('.lesson-title').value;
//
//        // Make sure the lesson title contains one or more characters
//        // and add lesson to section
//        if (lessonTitle.length) {
//            // set up a demonstration lesson with title
//            var newLesson = {"title": lessonTitle};
//
//            // get the template data for use in this funciton
//            // TODO: Re-write this to interact with database
//            var courseData = template.data;
//
//            // add the example lesson to the lessons object
//            courseData.lessons.push(newLesson);
//
//            // Set the reactive variable to include the new lesson
//            // sections is defined in the resource-sidebar.js
//            sections.set(courseData);
//
//            // Reset the template field
//           $('.lesson-name').val('');
//        }
//    }
//});
