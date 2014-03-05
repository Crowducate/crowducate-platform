Template.lectureChangeRequest.helpers({
  lecturePath: -> Router.path 'lectureShow', {courseSlug: @course.slug, slug: @lecture.slug}
  options: ->
    {
      default: 'exercise'
      tabItems: [
        key: 'exercise'
        label: 'Exercise'
        template: 'lectureUpdateExercise'
        data: @lecture
      ,
        key: 'quiz'
        label: 'Quiz'
        template: 'quizUpdate'
        data: @lecture
      ]
    }
})
