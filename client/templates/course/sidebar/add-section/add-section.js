Template.addSection.events({
    'submit #add-section-form': function (event, instance) {
      event.preventDefault(); // prevent page from refreshing
        /*
        / Add new section to the course
        */
        var sectionIDs, // list of section IDs in current course
        sectionTitle, // Title of new section, from template
        newSection, // Object containing new section
        newSectionID; // ID of created section, returned from db insert

        // Get current sections, before adding new section
        if (this.sectionIDs) {
            // If sections exists, use them
            sectionIDs = this.sectionIDs;
        } else {
            // otherwise create empty sections array
            sectionIDs = [];
        }

        // Get the title of new section
        sectionTitle = instance.find('#section-title').value;

        // Set section title in new section object
        newSection = {'title': sectionTitle};

        // Insert new section into database
        newSectionID = Sections.insert(newSection);

        // Add section ID to existing sections
        sectionIDs.push(newSectionID);

        // Update the course with new section
        Courses.update(this._id, {$set: {'sectionIDs': sectionIDs}});

        // Reset the value of section title field
        $("#section-title").val("");
    }
});
