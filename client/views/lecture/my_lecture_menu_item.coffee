Template.myLectureMenuItem.helpers({
  lecturePath: (course) ->
    Router.path('lectureUpdate', {courseId: course._id, _id: @_id})
  active: ->
    return 'active' if @_id is Session.get('currentLecture')
  lectureIndex: (section) ->
    return (section.index + 1) + '.' + (@index + 1) + '.'
})
