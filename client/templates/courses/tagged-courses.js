Template.taggedCourses.helpers({
    'courses': function () {
        return Courses.find().fetch();
    },
    'tag': function () {
        return Session.get('tag');
    }
});

Template.taggedCourses.onCreated(function(){
  // Accessing the Iron.controller to invoke getParams method of Iron Router.
  var controller = Iron.controller();
  // Getting Params of the URL
  var params = controller.getParams();
  // Invoking subscription on the Courses with the :tag params
  Meteor.subscribe('taggedCourses', params.tag)
});
