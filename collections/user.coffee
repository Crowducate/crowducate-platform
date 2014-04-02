class @User extends Minimongoid
  @_collection: Meteor.users

  @current: ->
    User.init(Meteor.user()) if Meteor.userId()

  @addPoints: (userId, amount) ->
    User._collection.update {_id: userId}, {$inc: {points: amount}}
  @incOpenChangeRequests: (userId, amount) ->
    User._collection.update({_id: userId}, {$inc: {openChangeRequests: amount}})

  isOwner: (doc) ->
    return @_id is doc.owner

  getPointsTotal: ->
    return @points if @points
    return 0
  getOpenChangeRequestsTotal: ->
    return @openChangeRequests if @openChangeRequests
    return 0
  getEmail: ->
    return @emails[0].address if @emails and @emails[0]
  getDisplayName: ->
    mail = @getEmail()
    return mail if mail
    return @getName()
  getName: ->
    return '' unless @profile
    return @profile.name if @profile.name
    return @profile.username if @profile.username