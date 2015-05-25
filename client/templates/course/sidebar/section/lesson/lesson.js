Template.sectionLesson.created = function () {
  // Save lesson ID as instance variable
  this.lessonID = this.data;

  // Subscribe to single section lesson
  this.subscribe('singleLesson', this.lessonID);
};

Template.sectionLesson.helpers({
  'editingCourse': function () {
    // Return the boolean value of editing this course reactive variable
    return editingThisCourseVar.get();
  },
  'lesson': function () {
    // Get template instance as variable
    var instance = Template.instance();

    // Get lesson ID from template instance
    var lessonID = instance.lessonID;

    // Get lesson object from database
    var lessonObject = Lessons.findOne(lessonID);

    return lessonObject;
  }
});

Template.sectionLesson.events({
  'click .sidebar-lesson-link': function (event) {
    event.preventDefault();

    // Get lesson ID variable from data context
    var lessonID = String(this);

    // set active lesson ID reactive variable
    // to the value of clicked lesson
    activeLessonID.set(lessonID);
  }
});
