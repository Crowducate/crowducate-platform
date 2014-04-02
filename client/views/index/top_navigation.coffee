Template.topNavigation.helpers({
  userEmail: ->
    User.current().getDisplayName()
})
