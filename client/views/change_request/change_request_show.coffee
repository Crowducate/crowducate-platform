Template.changeRequestShow.helpers({
  renderChangeRequestTemplate: ->
    if Template[@type + 'ChangeRequestApproval']
      return Template[@type + 'ChangeRequestApproval']
    return null
})
