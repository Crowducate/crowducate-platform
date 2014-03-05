Template.changeRequestShow.rendered = ->
  console.log 'changeRequestShow.rendered', @

Template.changeRequestShow.helpers({
  renderChangeRequestTemplate: ->
    console.log 'found CR tpl', @
    if Template[@type + 'ChangeRequestApproval']
      return Template[@type + 'ChangeRequestApproval']
    return null
})
