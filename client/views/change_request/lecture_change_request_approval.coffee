Template.lectureChangeRequestApproval.helpers({
  lectureTitleDiff: ->
    lecture = Lecture.first {_id: @docId}
    return 'no lecture found' unless lecture

    dmp = new diff_match_patch()
    d = dmp.diff_main lecture.lectureTitle, @data.lectureTitle
    dmp.diff_prettyHtml(d)

  markdownDiff: ->
    lecture = Lecture.first {_id: @docId}
    return 'no lecture found' unless lecture

    dmp = new diff_match_patch();
    d = dmp.diff_main(lecture.markdown, @data.markdown);
    dmp.diff_prettyHtml(d)
})

Template.lectureChangeRequestApproval.events({
  'click .accept': (evt, tpl) ->
    Etc.prevent evt

    Meteor.call 'acceptChangeRequest', tpl.data._id, (err) ->
      return Notify.setError err.reason if err
      Notify.setSuccess 'Change Request accepted'
      Router.go 'changeRequests'
})
