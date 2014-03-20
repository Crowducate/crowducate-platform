Template.changeRequestList.helpers({
  renderChangeRequestListItem: ->
    if Template[@type + 'ChangeRequestListItem']
      return Template[@type + 'ChangeRequestListItem']
    return null
})
