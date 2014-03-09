Meteor.publish('userData', () ->
  fields =
    profile: 1
    email: 1
    points: 1
    openChangeRequests: 1
  Meteor.users.find({_id: @userId}, {fields: fields})
)
