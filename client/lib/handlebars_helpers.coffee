Helpers =
  navActive: (route) ->
    if arguments.length > 1
      return _.indexOf(arguments, Router.current().route.name) > -1
    return route is Router.current().route.name
  courseOwner: ->
    return Meteor.userId() is @owner
  userPointsTotal: ->
    # TODO calculate user points
    return '0' unless Meteor.userId()
    return User.current().getPointsTotal()

for name, func of Helpers
  Handlebars.registerHelper name, func