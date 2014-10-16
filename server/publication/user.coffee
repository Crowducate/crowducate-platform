Meteor.publish('userData', () ->
  fields =
    profile: 1
    username: 1
    email: 1
    points: 1
    openChangeRequests: 1
    "services.google.given_name": 1
    "services.facebook.first_name": 1
  Meteor.users.find({_id: @userId}, {fields: fields})
)
