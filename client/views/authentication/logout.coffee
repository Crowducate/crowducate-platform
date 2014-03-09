Template.logout.created = ->
  Meteor.logout((err) ->
    Router.go 'home'
  )
