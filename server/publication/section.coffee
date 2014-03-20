Meteor.publish 'mySectionByCourse', (courseId, lectureId) ->
  check courseId, String
  check lectureId, String
  sectionsCursor = []
  lecturesCursor = []

  coursesCursor = Course.find({_id: courseId, owner: @userId})
  coursesArr = coursesCursor.fetch()
  return [] unless coursesArr.length > 0
  course = coursesArr[0]

  return [coursesCursor] unless course.sections

  sectionsCursor = Section.find({_id: {$in: course.sections}})

  sections = sectionsCursor.fetch()
  lecturesIdArr = []
  for s in sections
    Etc.pushArray(lecturesIdArr, s.lectures) if _.isArray(s.lectures)

  lecturesCursor = Lecture.find({_id: {$in: lecturesIdArr}})
  return [coursesCursor, sectionsCursor, lecturesCursor]
