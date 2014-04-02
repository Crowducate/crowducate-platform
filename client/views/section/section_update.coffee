Template.sectionUpdate.helpers({
  form: ->
    section = Section.first({_id: Session.get('currentSection')})
    {
      template: 'baseForm'
      formFields: [
        template: 'controlGroupWithInput'
        inputName: 'sectionTitle'
        autofocus: true
        label: 'Section Title'
        placeholder: 'Enter the name of this section'
        value: section.sectionTitle if section
      ]
      actionsRight: true
      actions: [
        template: 'formActionButton'
        type: 'submit'
        label: 'Update'
        btnClass: 'default'
      ]
    }
})

Template.sectionUpdate.events({
  'submit form': (evt, tpl) ->
    Etc.prevent(evt)
    section = Section.first({_id: Session.get('currentSection')})
    Form.removeFormError()

    data = $(evt.target).serializeObject()

    Meteor.call 'updateSection', section._id, data, (err) ->
      return handleFormError(err) if err
      if tpl.data.course.owner is User.current()._id
        Notify.setSuccess('Section updated')
      else
        Notify.setSuccess('Your change request was send to the author of the course.')

  'click .delete': (evt, tpl) ->
    Etc.prevent(evt)
    section = Section.first({_id: Session.get('currentSection')})

    if confirm 'Delete this section?'
      Meteor.call 'deleteSection', section._id, (err) ->
        return Notify.setError err.reason if err
        Router.go Router.path 'courseUpdate', {_id: Course.first()._id}
})
