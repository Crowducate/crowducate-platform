Template.quizShow.helpers({
  form: ->
    answers = []

    max = 4
    count = 0
    while count < max
      answers.push({
        template: 'controlGroupWithInlineRadio'
        index: count
        inputName: 'selectedAnswer'
        radioBtns: [
          value: count
          inputName: 'selectedAnswer'
          label: @getAnswer count if @getAnswer
        ]
      })
      count++

    formOptions =
      template: 'baseForm'
      formFields: answers
      actions: [
        template: 'formActionButton'
        label: 'Answer'
        btnClass: 'success'
      ]
})

Template.quizShow.events({
  'submit form': (evt, tpl) ->
    Etc.prevent(evt)
    data = $(evt.target).serializeObject()
    answer = data.selectedAnswer

    lecture = tpl.data
    lecture.solveQuiz answer, (err, correct) ->
      $('[name=selectedAnswer]:not([value='+lecture.getCorrectAnswerIndex()+'])').parent().addClass('wrong')
      $('[value='+lecture.getCorrectAnswerIndex()+']').parent().addClass('correct')
      return Notify.setError err.reason if err
      if correct
        Notify.setSuccess 'This is correct'
        nextLecture = tpl.data.getNextLecture()
        if nextLecture
          BootstrapTabs.setCurrentTab Lecture.TAB_LESSON
          Router.go 'lectureShow', {courseSlug: Router.current().params.courseSlug, slug: nextLecture.slug}
        else
          Notify.setSuccess 'Congratulations: You completed this course!'
          Router.go 'courseList'
      else
        Notify.setError 'This is wrong'

    # if tpl.data.isCorrect(answer)
    #   Notify.setSuccess 'This is correct'
    #   nextLecture = tpl.data.getNextLecture()
    #   if nextLecture
    #     BootstrapTabs.setCurrentTab Lecture.TAB_LESSON
    #     Router.go 'lectureShow', {courseSlug: Router.current().params.courseSlug, slug: nextLecture.slug}
    #   else
    #     Notify.setSuccess 'Congratulations: You completed this course!'
    #     Router.go 'courseList'
    # else
    #   Notify.setError 'This is wrong'
})
