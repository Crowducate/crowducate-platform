Template.courseListItem.helpers({
  courseThumb: ->
    return @thumb if @thumb
    return '/images/course-thumb.png'
  isMyCoursesPath: ->
    Router.current().route.name is 'teach'
	owner: -> 
		Meteor.users.findOne(@owner)
})
