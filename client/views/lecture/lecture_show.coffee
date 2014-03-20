Template.lectureShow.helpers({
  options: ->
    {
      default: Lecture.TAB_EXERCISE
      tabItems: [
        key: Lecture.TAB_EXERCISE
        label: 'Exercise'
        template: 'lectureShowExercise'
        data: @lecture
      ,
        key: Lecture.TAB_QUIZ
        label: 'Quiz'
        template: 'quizShow'
        data: @lecture
      ]
    }
  lectureChangeRequestPath: ->
    return '' unless @lecture and @course
    Router.path 'lectureChangeRequest', {courseSlug: @course.slug, slug: @lecture.slug}
  userIsntOwner: ->
    return true unless @lecture
    return Meteor.userId() and Meteor.userId() isnt @lecture.owner
})
