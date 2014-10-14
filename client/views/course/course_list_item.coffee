Template.courseListItem.helpers({
  courseThumb: ->
    return @thumb if @thumb
    return '/images/course-thumb.png'
  isMyCoursesPath: ->
    Router.current().route.name is 'teach'
  upvotedClass: ->
    userId = Meteor.userId()
    if userId && !_.include this.upvoters, userId
      'thumb-button'
    else
      'thumb-button-inactive'
	owner: -> 
		Meteor.users.findOne(@owner)
})

Template.courseListItem.events({
  'click .delete': (evt, tpl) ->
    Etc.prevent(evt)
    if confirm 'Delete this course?'
      Meteor.call 'deleteCourse', tpl.data._id, (err) ->
        return Notify.setError err.reason if err
        Notify.setSuccess 'Deleted successfully'
        Router.go Router.path 'teach'

  'click .upvote': (evt) ->
    Etc.prevent(evt)
    Meteor.call 'upvote', @_id
})

UI.registerHelper "pluralize", (n, thing) ->
  if n is 1
    "1 " + thing
  else
    n + " " + thing + "s"
