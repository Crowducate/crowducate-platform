Template.logout.created = ->
  console.log 'Template.logout.created'
  Meteor.logout((err) ->
    Router.go 'home'
  )
