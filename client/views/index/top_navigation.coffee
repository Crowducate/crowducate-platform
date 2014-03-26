Template.topNavigation.helpers({
  userEmail: ->
    User.current().getEmail()
})
