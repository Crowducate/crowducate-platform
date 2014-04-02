Template.changeRequestListItem.created = ->
  console.log 'changeRequestListItem.created', @


Template.changeRequestListItem.helpers({
  renderState: ->
    @renderState()
  showOptions: ->
    Meteor.userId() isnt @owner
})
