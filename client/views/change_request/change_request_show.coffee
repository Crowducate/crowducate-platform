Template.changeRequestShow.helpers({
  renderChangeRequestTemplate: ->
    console.log 'renderChangeRequestTemplate', @type
    if Template[@type + 'ChangeRequestApproval']
      return Template[@type + 'ChangeRequestApproval']
    return null
})
