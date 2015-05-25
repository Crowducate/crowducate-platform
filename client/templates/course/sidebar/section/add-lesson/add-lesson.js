Template.addLesson.events({
    'submit #add-lesson-form': function (event, template) {
      event.preventDefault();

      // Get lesson name
      var lessonName = template.find(".lesson-name").value;

      // Get section ID from current data context
      var sectionID = String(this);

      // Create temporary lesson object
      var lessonObject = {
        'name': lessonName
      };

      // Add lesson to database,
      // getting lesson ID in return
      var lessonId = Lessons.insert(lessonObject);

      // Add lesson ID to section record
      Sections.update(sectionID, {$push: {'lessonIDs': lessonId}});

      // Clear the lesson name field
      $(".lesson-name").val('');
  }
});
