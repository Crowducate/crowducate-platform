Template.courseListItem.helpers({
  courseThumb: ->
    return @thumb if @thumb
    return '/images/course-thumb.png'
  isMyCoursesPath: ->
    Router.current().route.name is 'teach'
})

Template.courseListItem.events({
  'click .delete': (evt, tpl) ->
    Etc.prevent(evt)
    if confirm 'Delete this course?'
      Meteor.call 'deleteCourse', tpl.data._id, (err) ->
        return Notify.setError err.reason if err
        Notify.setSuccess 'Deleted successfully'
        Router.go Router.path 'teach'
})
