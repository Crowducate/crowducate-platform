Template.lectureUpdateExercise.helpers({
  formFields: ->
    [
      template: 'controlGroupWithInput'
      inputName: 'lectureTitle'
      autofocus: true
      label: 'Lecture Title'
      placeholder: 'Describe the lecture in a short sentence'
      value: @lectureTitle if @lectureTitle
    ,
      template: 'controlGroupWithTextarea'
      inputName: 'intro'
      label: 'Introduction for the Lecture'
      placeholder: 'Write a brief summary what this lecture is about.'
      rows: 3
      value: @intro if @intro
    # ,
    #   template: 'controlGroupWithTextarea'
    #   inputName: 'instructions'
    #   autofocus: true
    #   label: 'Instructions for the Quiz'
    #   placeholder: 'Add the video, link, text etc. which the student has to go through to be able to answer the quiz for this excercise.'
    #   rows: 3
    #   value: @instructions if @instructions
    ]
})


Template.lectureUpdateExercise.events({
  'submit #form-lecture-update': (evt, tpl) ->
    console.log 'submit form'
    Etc.prevent(evt)

    Form.removeFormError()

    data = $(evt.target).serializeObject()

    data.markdown = Template.markdownEditor.getValue()

    console.log 'data', data

    Meteor.call 'updateLectureExercise', tpl.data._id, data, (err) ->
      return handleFormError(err) if err
      Notify.setSuccess 'Updated'

    return false
})
