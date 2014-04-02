class @Lecture extends Minimongoid
  @_collection: new Meteor.Collection('lectures')
  @TAB_EXERCISE: 'exercise'
  @TAB_QUIZ: 'quiz'

  @validate: (data) ->
    errors = MsValidator.validateModel(data, @validations)
    throw new Meteor.Error(400, JSON.stringify(errors)) unless _.isEmpty(errors)

  @validations:
    sectionTitle: (value) ->
      throw new Error('Please enter a section title.') unless validator.isLength(value, 1)
    answer_0: (value) ->
      throw new Error('Please enter an answer.') unless validator.isLength(value, 1)
    answer_1: (value) ->
      throw new Error('Please enter an answer.') unless validator.isLength(value, 1)
    answer_2: (value) ->
      throw new Error('Please enter an answer.') unless validator.isLength(value, 1)
    answer_3: (value) ->
      throw new Error('Please enter an answer.') unless validator.isLength(value, 1)
    correctAnswer: (value) ->
      throw new Error('Please select one correct answer') unless validator.isIn(value, [0, 1, 2, 3])
    quizIntro: (value) ->
      throw new Error('Please enter a introduction for the quiz') unless validator.isLength(value, 1)

  getQuizIntro: ->
    return @quiz.quizIntro if @quiz and @quiz.quizIntro
  getAnswer: (index) ->
    return @quiz["answer_#{index}"] if @quiz and @quiz["answer_#{index}"]
  getCorrectAnswerIndex: ->
    return @quiz.correctAnswer if @quiz and @quiz.correctAnswer > -1
  isCorrect: (answer) ->
    return @quiz.correctAnswer is parseInt(answer)
  getNextLecture: ->
    section = Section.first({_id: @sectionId})
    throw new Meteor.Error 404, 'Section not found' unless section
    i = _.indexOf section.lectures, @_id
    return Lecture.first({_id: section.lectures[i+1]}) if i < section.lectures.length - 1
    course = Course.first({_id: section.courseId})
    i = _.indexOf course.sections, section._id
    nextSectionIndex = section.index + 1
    if nextSectionIndex < course.sections.length - 1
      nextSection = Section.first({index: nextSectionIndex})
      throw new Meteor.Error 403, 'The next section has no lectures' unless nextSection.lectures.length > 0
      return Lecture.first({index: 0})
    return null
  getDiff: (field, value) ->
    return getPrettyDiff(@[field], value) if @[field]
    return "Error: Field unknown (#{field})"
  getQuizDiff: (field, value) ->
    return getPrettyDiff(@quiz[field], value) if @quiz and @quiz[field]
    return "Error: Field unknown (#{field})"
  solveQuiz: (answer, cb) ->
    Meteor.call 'lectureSolveQuiz', @_id, answer, cb
  getText: (chars) ->
    return $(marked( @markdown.substr(0, chars) )).text() if chars and @markdown
    return $(marked(@markdown)).text() if @markdown
    return ''


Meteor.methods({
  createLecture: (sectionId) ->
    check sectionId, String

    userId = Meteor.userId()
    section = Section.first({_id: sectionId})
    throw new Meteor.Error 404, 'Course not found' unless section
    throw new Meteor.Error 403, 'You are not allowed to add a lecture to this section' unless section.owner is userId

    lectureIndex = if section.lectures then section.lectures.length else 0

    lecture = Lecture.create({owner: userId, sectionId: section._id, lectureTitle: 'New Lecture', index: lectureIndex})
    section.push({lectures: lecture._id})
    return lecture._id

  updateLectureExercise: (lectureId, data) ->
    errors = Lecture.validate data
    throw new Meteor.Error 400, JSON.stringify errors unless _.isEmpty errors

    check lectureId, String

    check data, {
      markdown: String
      lectureTitle: String
    }

    userId = Meteor.userId()
    throw new Meteor.Error 403, 'Please log in to update this lecture' unless userId

    lecture = Lecture.first({_id: lectureId})
    throw new Meteor.Error 404, 'Lecture not found' unless lecture

    slug = slugify(data.lectureTitle)
    if slug isnt lecture.slug
      #TODO find a more performant way to match lecture slug
      section = Section.first({_id: lecture.sectionId}, {fields: {courseId: 1}})
      course = Course.first({_id: section.courseId}, {fields: {sections: 1}})
      courseSections = Section.find({_id: {$in: course.sections}}, {fields: {lectures: 1}})
      allLectureIds = []
      for s in courseSections
        Etc.pushArray(allLectureIds, s.lectures)
      allLectures = Lecture.find({_id: {$in: allLectureIds}}, {fields: {slug: 1}})
      for l in allLectures
        throw new Meteor.Error 400, JSON.stringify {lectureTitle: 'This title is already taken'} if l.slug is slug and l._id isnt lecture._id
      data.slug = slug

    isChangeRequest = userId isnt lecture.owner

    if isChangeRequest
      data.owner = lecture.owner
      ChangeRequest.create({data: data, type: 'lecture', docId: lecture._id, owner: userId, state: ChangeRequest.STATE_OPEN})
    else
      data.updatedAt = new Date().valueOf()
      lecture.save(data)

    return lecture._id

  updateQuiz: (lectureId, data) ->
    data.correctAnswer = parseInt(data.correctAnswer) if data.correctAnswer
    errors = Lecture.validate data
    throw new Meteor.Error 400, JSON.stringify errors unless _.isEmpty errors

    check lectureId, String
    check data, {
      answer_0: String
      answer_1: String
      answer_2: String
      answer_3: String
      correctAnswer: Number
      quizIntro: String
    }

    lecture = Lecture.first({_id: lectureId})
    throw new Meteor.Error 404, 'Lecture not found' unless lecture
    userId = Meteor.userId()

    isChangeRequest = userId isnt lecture.owner

    if isChangeRequest
      data.owner = lecture.owner
      ChangeRequest.create({data: data, type: 'quiz', docId: lecture._id, owner: userId, state: ChangeRequest.STATE_OPEN})
    else
      data.updatedAt = new Date().valueOf()
      lecture.save({quiz: data})

    lecture._id

  deleteLecture: (lectureId) ->
    check lectureId, String
    userId = Meteor.userId()
    lecture = Lecture.first({_id: lectureId})
    throw new Meteor.Error 404, 'Lecture not found' unless lecture
    throw new Meteor.Error 403, 'You are not allowed to delete this lecture' unless lecture.owner is userId

    section = Section.first({_id: lecture.sectionId})
    section.pull({lectures: lecture._id})

    lectureIndex = lecture.index
    Lecture._collection.update({_id: {$in: section.lectures}, index: {$gt: lectureIndex}}, {$inc: {index: -1} })

    lecture.destroy()

    return true

  lectureSolveQuiz: (lectureId, answer) ->
    check lectureId, String
    check answer, String

    lecture = Lecture.first {_id: lectureId}
    throw new Meteor.Error 404, 'Lecture not found' unless lecture

    userId = Meteor.userId()

    correct = lecture.isCorrect answer

    # guest answers or lecture owners answers do not count
    return correct unless userId
    return correct if userId is lecture.owner

    answer = Answer.create {owner: userId, lectureId: lecture._id, answer: answer }
    if correct
      # you do not get points multiple times from the same source
      return true if Point.find({'for.lectureId': lectureId, owner: userId}).count() > 0
      
      forStudent = Point.STUDENT_SOLVED_QUIZ
      forTeacher = Point.STUDENT_SOLVED_QUIZ_OF_TEACHER

      Point.create {owner: userId, amount: Point.STUDENT_SOLVED_QUIZ, for: { object: 'Answer', lectureId: lecture._id, action: 'STUDENT_SOLVED_QUIZ', id: answer._id }}
      Point.create {owner: lecture.owner, amount: Point.STUDENT_SOLVED_QUIZ_OF_TEACHER, for: { object: 'Answer', lectureId: lecture._id, action: 'STUDENT_SOLVED_QUIZ_OF_TEACHER', id: answer._id }}

})
