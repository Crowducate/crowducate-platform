Template.courseShow.helpers({
  userIsntOwner: ->
    return true unless @course
    Meteor.userId() and Meteor.userId() isnt @course.owner
  courseChangeRequestPath: ->
    return unless @course
    Router.path 'courseChangeRequest', {slug: @course.slug}
  firstLecturePath: ->
    firstSection = Section.first({courseId: Course.first()._id, index: 0})
    firstLecture = Lecture.first({sectionId: firstSection._id, index: 0})
    Router.path 'lectureShow', {courseSlug: Course.first().slug, slug: firstLecture.slug }
})

Template.courseShow.events({
  'click .copy': (evt, tpl) ->
    Etc.prevent evt
    Meteor.call 'copyCourse', tpl.data.course._id, (err, copiedCourseId) ->
      return Notify.setError err.reason if err
      Notify.setSuccess 'Copied Course'
      Router.go 'courseUpdate', {_id: copiedCourseId}
})
