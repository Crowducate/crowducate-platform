Template.addSection.events({
    'click #add-section-button': function (event, template) {
        /*
        / Add new section to the course
        */

        // Get current sections, before adding new section
        if (this.sectionIDs) {
            // If sections exists, use them
            var sectionIDs = this.sectionIDs;
        } else {
            // otherwise create empty sections array
            var sectionIDs = [];
        }

        // Get the title of new section
        var title = template.find('#section-title').value;

        // Set section title in new section object
        var newSection = {'title': title};

        // Insert new section into database
        var newSectionID = Sections.insert(newSection);

        // Add section ID to existing sections
        sectionIDs.push(newSectionID);

        // Update the course with new section
        Courses.update(this._id, {$set: {'sectionIDs': sectionIDs}});

        // Reset the value of section title field
        $("#section-title").val("");
    }
});
