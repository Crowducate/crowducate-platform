Template.taggedCourses.helpers({
    'courses': function () {
        return Courses.find().fetch();
    },
    'tag': function () {
      // Get reference to template instance
      var instance = this;

      // Get tag from instance
      var tag = instance.tag;

      return tag;
    }
});

Template.taggedCourses.onCreated(function(){
  // Get reference to template instance
  var instance = this;

  // Accessing the Iron.controller to invoke getParams method of Iron Router.
  var router = Router.current();

  // Getting Params of the URL
  instance.tag = router.params.tag;

  // Subscribe to courses tagged with the current tag
  instance.subscribe('taggedCourses', instance.tag);

  // Subscribe to course images
  instance.subscribe('images');
});


Template.taggedCourses.rendered = function () {
  // Get reference to template instance
  var instance = this;

  // Set the page site title for SEO
  Meta.setTitle('Courses tagged "' + instance.tag + '"');
};
