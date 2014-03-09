Template.courseShow.helpers({
  userIsntOwner: ->
    Meteor.userId() and Meteor.userId() isnt @course.owner
  courseChangeRequestPath: ->
    Router.path 'courseChangeRequest', {slug: @course.slug}
})

Template.courseShow.events({
  'click .copy': (evt, tpl) ->
    Etc.prevent evt
    Meteor.call 'copyCourse', tpl.data.course._id, (err, copiedCourseId) ->
      return Notify.setError err.reason if err
      Notify.setSuccess 'Copied Course'
      Router.go 'courseUpdate', {_id: copiedCourseId}
})
