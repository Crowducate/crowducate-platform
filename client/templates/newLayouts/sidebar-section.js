Template.sidebarSection.events({
    'click .add-page': function (event, template) {
        // set up a demonstration lesson with title
        var newLesson = {"title": "New lesson"};

        // get the template data for use in this funciton
        var resourceData = template.data;

        // add the example lesson to the lessons object
        resourceData.lessons.push(newLesson);

        // Set the reactive variable to include the new lesson
        // sections is defined in the resource-sidebar.js
        sections.set(resourceData);
    }
});
