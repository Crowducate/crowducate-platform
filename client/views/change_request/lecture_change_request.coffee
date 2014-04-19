Template.lectureChangeRequest.helpers({
  lecturePath: -> Router.path 'lectureShow', {courseSlug: @course.slug, slug: @lecture.slug}
  options: ->
    {
      default: 'lesson'
      tabItems: [
        key: 'lesson'
        label: 'Lesson'
        template: 'lectureUpdateLesson'
        data: @lecture
      ,
        key: 'quiz'
        label: 'Quiz'
        template: 'quizUpdate'
        data: @lecture
      ]
    }
})
