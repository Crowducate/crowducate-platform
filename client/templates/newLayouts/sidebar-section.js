Template.sidebarSection.events({
    'click .add-page': function (event, template) {
        // get the value of the input field
        var lessonTitle = template.find('.page-name').value;

        // Make sure the lesson title contains one or more characters
        // and add lesson to section
        if (lessonTitle.length) {
            // set up a demonstration lesson with title
            var newLesson = {"title": lessonTitle};

            // get the template data for use in this funciton
            var resourceData = template.data;

            // add the example lesson to the lessons object
            resourceData.lessons.push(newLesson);

            // Set the reactive variable to include the new lesson
            // sections is defined in the resource-sidebar.js
            sections.set(resourceData);

            // Reset the template field
           $('.page-name').val('');
        }
    }
});
