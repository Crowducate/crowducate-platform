Template.sectionTitle.events({
    /*
    Update section title when editable is submitted
    */
    'click .editable-submit': function (event, template) {
        // Get the new section title from template
        var newSectionTitle = template.find('input').value;

        // override current title in template data
        this.title = newSectionTitle;

        // Get current sections from parent template data
        var sections = Template.parentData().sections;

        // Get course ID from parent template data
        var courseID = Template.parentData()._id;

        // Update course sections
        Courses.update(courseID, {$set: {'sections': sections}});
    },
});
