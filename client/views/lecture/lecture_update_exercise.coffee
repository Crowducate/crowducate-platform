Template.lectureUpdateExercise.helpers({
  formFields: ->
    [
      template: 'controlGroupWithInput'
      inputName: 'lectureTitle'
      autofocus: true
      label: 'Lecture Title'
      placeholder: 'Describe the lecture in a short sentence'
      value: @lectureTitle if @lectureTitle
    ]
})


Template.lectureUpdateExercise.events({
  'submit #form-lecture-update': (evt, tpl) ->
    Etc.prevent(evt)

    Form.removeFormError()

    data = $(evt.target).serializeObject()

    data.markdown = Template.markdownEditor.getValue()

    Meteor.call 'updateLectureExercise', tpl.data._id, data, (err) ->
      return handleFormError(err) if err
      if tpl.data.owner is User.current()._id
        Notify.setSuccess('Excercise updated')
      else
        Notify.setSuccess('Your change request was send to the author of the course.')

    return false
})
