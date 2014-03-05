class @User extends Minimongoid
  @_collection: Meteor.users

  @current: ->
    User.init(Meteor.user()) if Meteor.userId()

  @addPoints: (userId, amount) ->
    User._collection.update {_id: userId}, {$inc: {points: amount}}

  isOwner: (doc) ->
    return @_id is doc.owner

  getPointsTotal: ->
    return @points if @points
    return 0
