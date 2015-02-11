Template.addSection.events({
    'click #add-section-button': function (event, template) {
        /*
        / Add new section to the course
        */

        // Get current sections, before adding new section
        if (this.sections) {
            // If sections exists, use them
            var sections = this.sections;
        } else {
            // otherwise create empty sections array
            var sections = [];
        }

        // Get the title of new section
        var title = template.find('#section-title').value;

        // Set section title in new section object
        var newSection = {'title': title};

        // Add section to end of existing sections
        sections.push(newSection);

        // Update the course with new section
        Courses.update(this._id, {$set: {'sections': sections}});

        // Reset the value of section title field
        $("#section-title").val("");
    }
});
