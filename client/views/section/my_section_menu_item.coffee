Template.mySectionMenuItem.helpers({
  sectionPath: (course) ->
    Router.path('sectionUpdate', {courseId: course._id, _id: @_id})
  lectures: ->
    lectures = Lecture.where({_id: {$in: @lectures}}, {sort: {index: 1}}) if @lectures
    return lectures
  active: ->
    return 'active' if @_id is Session.get 'currentSection'
})

Template.mySectionMenuItem.events({
  'click .add-lecture': (evt, tpl) ->
    Etc.prevent(evt)

    Meteor.call('createLecture', tpl.data._id, (err, lectureId) ->
      return Notify.setError(err.reason) if err
      Router.go('lectureUpdate', {courseId: tpl.data.courseId, _id: lectureId})
    )
})
