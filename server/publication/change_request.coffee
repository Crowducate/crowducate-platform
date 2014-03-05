Meteor.publish 'myChangeRequests', ->
  console.log 'Publish.myChangeRequests'
  ChangeRequest.find({$or: [{'data.owner': @userId}, {owner: @userId}]})

Meteor.publish 'myChangeRequest', (id) ->
  console.log 'myChangeRequest', id
  check id, String
  ChangeRequest.find({_id: id, $or: [{'data.owner': @userId}, {owner: @userId}] })
