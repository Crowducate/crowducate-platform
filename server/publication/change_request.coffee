Meteor.publish 'myChangeRequests', ->
  ChangeRequest.find({$or: [{'data.owner': @userId}]})

Meteor.publish 'myChangeRequest', (id) ->
  check id, String
  cr = ChangeRequest.first({_id: id, $or: [{'data.owner': @userId}, {owner: @userId}] }, {fields: {type: 1, docId: 1}})
  return [] unless cr

  obejct = null

  switch cr.type
    when 'lecture' then object = Lecture.find({_id: cr.docId})
    when 'quiz' then object = Lecture.find({_id: cr.docId})
    when 'course' then object = Course.find({_id: cr.docId})

  return [ChangeRequest.find({_id: id}), object]
