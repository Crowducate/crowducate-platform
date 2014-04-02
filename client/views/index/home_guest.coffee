Template.homeGuest.created = ->
  if Meteor.userId()
    Router.go 'courseList'

Template.homeGuest.events({
  'submit #signIn': (event) ->
    event.preventDefault()
    Session.set('email', $('input[name="email"]').val())
    Session.set('password', $('input[name="password"]').val())

    Meteor.loginWithPassword(Session.get('email'), Session.get('password'), (error)->
      Session.set('password', undefined)
      return Notify.setError error.reason if error

      if Session.get('fromWhere')
        Router.go Session.get('fromWhere')
        Session.set('fromWhere', undefined)
      else
        Router.go AccountsEntry.settings.dashboardRoute
    )

  'click .login-fb': (evt, tpl) ->
    Etc.prevent evt

    Meteor.loginWithFacebook({}, (err) ->
      return Notify.setError(err.reason) if err
      Router.go('courseList')
    )
  'click .login-g': (evt, tpl) ->
    Etc.prevent evt

    Meteor.loginWithGoogle({}, (err) ->
      return Notify.setError(err.reason) if err
      Router.go('courseList')
    )
})
