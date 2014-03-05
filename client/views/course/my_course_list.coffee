Template.myCourseList.helpers({
  newCourse: ->
    { courseTitle: 'Create a new course' }
})

Template.myCourseList.events({
  'click .new-course': (evt, tpl) ->
    Etc.prevent(evt)
    Meteor.call('createCourse', (err, courseId) ->
      return Notify.setError(err.reason) if err
      Router.go('courseUpdate', {_id: courseId})
    )
})