Router.configure({
  layoutTemplate: 'baseLayout',
  loadingTemplate: 'loading',
  //waitOn: function() { return Meteor.subscribe('courses'); },
  notFoundtemplate: 'notFound',
});