Template.lectureUpdate.helpers({
  options: ->
    lecture = Lecture.first({_id: Session.get('currentLecture')})
    {
      default: 'lesson'
      tabItems: [
        key: 'lesson'
        label: 'Lesson'
        template: 'lectureUpdateLesson'
        data: lecture
      ,
        key: 'quiz'
        label: 'Quiz'
        template: 'quizUpdate'
        data: lecture
      ]
    }
})

Template.lectureUpdate.events({
  'click .delete': (evt, tpl) ->
    Etc.prevent(evt)
    lecture = Lecture.first({_id: Session.get('currentLecture')})

    section = lecture.sectionId
    if confirm 'Delete this lecture?'
      Meteor.call 'deleteLecture', lecture._id, (err) ->
        return Notify.setError(err.reason) if err
        Router.go('sectionUpdate', {courseId: Course.first()._id, _id: section})
        Notify.setSuccess 'Lecture deleted'
})
