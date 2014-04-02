class @ChangeRequest extends Minimongoid
  @_collection: new Meteor.Collection 'change_requests'
  @STATE_ACCEPTED: 1
  @STATE_DECLINED: 2
  @STATE_OPEN: 0

  @after_save: (doc) ->
    if doc.state is ChangeRequest.STATE_OPEN
      User.incOpenChangeRequests(doc.data.owner, 1)
    else
      User.incOpenChangeRequests(doc.data.owner, -1)

  isOpen: -> return @state is ChangeRequest.STATE_OPEN
  renderState: ->
    console.log 'ChangeRequest.renderState', @state
    switch @state
      when ChangeRequest.STATE_ACCEPTED then return Template.changeRequestStateAccepted
      when ChangeRequest.STATE_DECLINED then return Template.changeRequestStateDeclined
      when ChangeRequest.STATE_OPEN then return Template.changeRequestStateOpen

Meteor.methods({
  acceptChangeRequest: (changeRequestId) ->
    check changeRequestId, String

    cr = ChangeRequest.first {_id: changeRequestId}
    throw new Meteor.Error 404, 'Change Request not found' unless cr

    object = null
    switch cr.type
      when 'lecture' then object = Lecture.first {_id: cr.docId}
      when 'quiz' then object = Lecture.first {_id: cr.docId}
      when 'course' then object = Course.first {_id: cr.docId}
    throw new Meteor.Error 403, 'You are not allowed to accept this Change Request' unless object.owner is Meteor.userId()

    if cr.type is 'quiz'
      object.save {quiz: cr.data}
    else
      object.save cr.data
    cr.save {state: ChangeRequest.STATE_ACCEPTED}

  declineChangeRequest: (changeRequestId) ->
    check changeRequestId, String

    cr = ChangeRequest.first {_id: changeRequestId}
    throw new Meteor.Error 404, 'Change Request not found' unless cr
    throw new Meteor.Error 403, 'You are not allowed to decline this Change Request' unless cr.data.owner is Meteor.userId()
    cr.save {state: ChangeRequest.STATE_DECLINED}
})
