Template.quizUpdate.helpers({
  quizIntro: ->
    template: 'controlGroupWithTextarea'
    inputName: 'quizIntro'
    placeholder: 'The question must be based on the exercise of the current lecture.'
    label: 'Enter the question for this specific lecture.'
    value: @getQuizIntro() if @getQuizIntro
  answers: ->
    answers = []
    max = 4
    count = 0
    while count < max
      answers.push({
        template: 'controlGroupWithInput'
        label: 'Answer'
        index: count
        inputName: 'answer_' + count
        value: @getAnswer(count) if @getAnswer
      })
      answers.push({
        template: 'controlGroupWithInlineRadio'
        index: count
        inputName: 'correctAnswer'
        radioBtns: [
          value: count
          inputName: 'correctAnswer'
          label: 'Check the left button if this is the correct answer.'
          attributes: 'checked' if @getCorrectAnswerIndex and count is @getCorrectAnswerIndex()
        ]
      })
      count++
    return answers
})

Template.quizUpdate.events({
  'submit form': (evt, tpl) ->
    Etc.prevent(evt)

    Form.removeFormError()

    data = $(evt.target).serializeObject()
    data.correctAnswer = -1 unless data.correctAnswer
    lecture = Lecture.first({_id: Session.get('currentLecture')})

    Meteor.call 'updateQuiz', lecture._id, data, (err) ->
      return handleFormError(err) if err
      Notify.setSuccess 'Quiz updated'
})