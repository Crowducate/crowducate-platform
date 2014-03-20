Template.quizChangeRequestApproval.helpers({
  quizTitleDiff: ->
    lecture = Lecture.first {_id: @docId}
    lecture.getQuizDiff('quizIntro', @data.quizIntro) if lecture
  anwerOneDiff: ->
    lecture = Lecture.first {_id: @docId}
    lecture.getQuizDiff('answer_0', @data.answer_0) if lecture
  anwerTwoDiff: ->
    lecture = Lecture.first {_id: @docId}
    lecture.getQuizDiff('answer_1', @data.answer_1) if lecture
  anwerThreeDiff: ->
    lecture = Lecture.first {_id: @docId}
    lecture.getQuizDiff('answer_2', @data.answer_2) if lecture
  anwerFourDiff: ->
    lecture = Lecture.first {_id: @docId}
    lecture.getQuizDiff('answer_3', @data.answer_3) if lecture
})

Template.quizChangeRequestApproval.events({
  'click .accept': (evt, tpl) ->
    Etc.prevent evt

    Meteor.call 'acceptChangeRequest', tpl.data._id, (err) ->
      return Notify.setError err.reason if err
      Notify.setSuccess 'Change Request accepted'
      Router.go 'changeRequests'

  'click .decline': (evt, tpl) ->
    Etc.prevent evt

    Meteor.call 'declineChangeRequest', tpl.data._id, (err) ->
      return Notify.setError err.reason if err
      Notify.setSuccess 'Change Request accepted'
      Router.go 'changeRequests'
})
