Template.learn.helpers({
    'courses': function(){
        return Courses.find();
    }
});

Template.learn.created = function () {
  // Get reference to template instance
  var instance = this;

  // Subscribe to all published courses
  instance.subscribe("publishedCourses");
};
