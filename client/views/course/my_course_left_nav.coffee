Template.myCourseLeftNav.events({
  'click .add-section': (evt, tpl) ->
    Etc.prevent(evt)
    Meteor.call('createSection', tpl.data.course._id, (err, sectionId) ->
      return Notify.setError(err.reason) if err
      Router.go('sectionUpdate', {courseId: tpl.data.course._id, _id: sectionId})
    )
})

Template.myCourseLeftNav.helpers({
  pathForCourseUpdate: ->
    course = Course.first()
    return unless course
    Router.path('courseUpdate', {_id: Course.first()._id})
})
