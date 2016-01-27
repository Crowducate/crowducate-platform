Template.taggedCourses.helpers({
    'courses': function () {
        return Courses.find().fetch();
    },
    'tag': function () {
        return Session.get('tag');
    }
});

Template.taggedCourses.onCreated(function(){
  // Get reference to template instance
  const instance = this;

  // Accessing the Iron.controller to invoke getParams method of Iron Router.
  var router = Router.current();

  // Getting Params of the URL
  var courseTag = router.params.tag;

  // Subscribe to courses tagged with the current tag
  instance.subscribe('taggedCourses', courseTag);

  // Subscribe to course images
  instance.subscribe('images');
});
