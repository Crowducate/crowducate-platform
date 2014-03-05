Template.myLectureMenuItem.helpers({
  lecturePath: (course) ->
    Router.path('lectureUpdate', {courseId: course._id, _id: @_id})
  active: ->
    return 'active' if @_id is Session.get('currentLecture')
})