class @Point extends Minimongoid
  @_collection: new Meteor.Collection 'points'

  @STUDENT_SOLVED_QUIZ: 1
  @STUDENT_SOLVED_QUIZ_OF_TEACHER: 1

  @after_create: (doc) ->
    User.addPoints(doc.owner, doc.amount)


# Has a value
# Earned through an activity that depends on an object
# Object validates if points are earned
#


Meteor.methods({
  createPoint: (object, action, owner) ->
    check type, String
})
