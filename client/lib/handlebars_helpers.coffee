Helpers =
  navActive: (route) ->
    return false unless Router.current()
    if arguments.length > 1
      return _.indexOf(arguments, Router.current().route.name) > -1
    return route is Router.current().route.name
  courseOwner: ->
    return Meteor.userId() is @owner
  userPointsTotal: ->
    return '0 Points' unless Meteor.userId()
    points = User.current().getPointsTotal()
    return points + ' Points' if points is 0 or points > 1
    return points + ' Point'
  userOpenChangeRequests: ->
    return '0' unless Meteor.userId()
    return User.current().getOpenChangeRequestsTotal()
  moment: (date, format) ->
    moment(date).format(format)
  capitalize: (str) -> _.capitalize str
  pathFor: (name) ->
    Router.path(name, @)
  maxChars: (str, max) ->
    return '' unless str
    return str if str.length < max
    return str.substr(0, max) + '...'


for name, func of Helpers
  Handlebars.registerHelper name, func
