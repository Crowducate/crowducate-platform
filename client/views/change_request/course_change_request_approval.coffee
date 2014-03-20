Template.courseChangeRequestApproval.helpers({
  titleDiff: ->
    course = Course.first({_id: @docId})
    course.getDiff('courseTitle', @data.courseTitle) if course

  subTitleDiff: ->
    course = Course.first({_id: @docId})
    course.getDiff('subtitle', @data.subtitle) if course

  keywordsDiff: ->
    course = Course.first({_id: @docId})
    course.getDiff('keywords', @data.keywords) if course

  categoryDiff: ->
    course = Course.first({_id: @docId})
    course.getDiff('category', @data.category) if course

  ageGroupDiff: ->
    course = Course.first({_id: @docId})
    course.getDiff('age', @data.age) if course

  markdownDiff: ->
    course = Course.first({_id: @docId})
    course.getDiff('markdown', @data.markdown) if course
})

Template.courseChangeRequestApproval.events({
  'click .accept': (evt, tpl) ->
    Etc.prevent evt

    Meteor.call 'acceptChangeRequest', tpl.data._id, (err) ->
      return Notify.setError err.reason if err
      Notify.setSuccess 'Change Request accepted'
      Router.go 'changeRequests'

  'click .decline': (evt, tpl) ->
    Etc.prevent evt

    Meteor.call 'declineChangeRequest', tpl.data._id, (err) ->
      return Notify.setError err.reason if err
      Notify.setSuccess 'Change Request accepted'
      Router.go 'changeRequests'
})
