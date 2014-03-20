Helpers =
  navActive: (route) ->
    if arguments.length > 1
      return _.indexOf(arguments, Router.current().route.name) > -1
    return route is Router.current().route.name
  courseOwner: ->
    return Meteor.userId() is @owner
  userPointsTotal: ->
    return '0' unless Meteor.userId()
    return User.current().getPointsTotal()
  userOpenChangeRequests: ->
    return '0' unless Meteor.userId()
    return User.current().getOpenChangeRequestsTotal()
  moment: (date, format) ->
    moment(date).format(format)
  capitalize: (str) -> _.capitalize str
  pathFor: (name) ->
    Router.path(name, @)


for name, func of Helpers
  Handlebars.registerHelper name, func
