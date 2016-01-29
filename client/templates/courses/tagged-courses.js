Template.taggedCourses.onCreated(function(){

  // Get reference to template instance
  var instance = this;

  instance.autorun(function() {

    // Accessing the Iron.controller to invoke getParams method of Iron Router.
    var router = Router.current();

    // Getting Params of the URL
    instance.tag = router.params.tag;

    // Subscribe to courses tagged with the current tag
    instance.subscribe('taggedCourses', instance.tag);

    // Subscribe to course images
    instance.subscribe('images');
  });
});


Template.taggedCourses.rendered = function () {
  // Get reference to template instance
  var instance = this;

  // Set the page site title for SEO
  Meta.setTitle('Courses tagged "' + instance.tag + '"');
};

Template.taggedCourses.helpers({
  'courses': function () {
    // Get reference to template instance
    var instance = Template.instance();
    if (instance.subscriptionsReady()) {
      // Get tag from template instance
      var tag = instance.tag;

      // Fetch courses matching current tag
      var taggedCourses = Courses.find({"keywords": tag}).fetch();

      return taggedCourses;
    }
  },
  'tag': function () {
    // Get reference to template instance
    var instance = Template.instance();
    
    if (instance.subscriptionsReady()) {
       // Get tag from instance
       var tag = instance.tag;

       return tag;
    }
  }
});
