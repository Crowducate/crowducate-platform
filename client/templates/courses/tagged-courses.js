Template.taggedCourses.helpers({
    'courses': function () {
        return Courses.find().fetch();
    },
    'tag': function () {
        return Session.get('tag');
    }
});

Template.taggedCourses.onCreated(function(){
  var controller = Iron.controller();
  var params = controller.getParams();
  this.autorun(function(){
    Meteor.subscribe('taggedCourses', params.tag)
  });
});
