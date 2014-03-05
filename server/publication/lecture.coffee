Meteor.publish 'lectureByCourse', (courseId, lectureId) ->
  console.log 'publish.myCourse', courseId
  check courseId, String
  check lectureId, String
  return getLectureData {_id: courseId, owner: @userId}

Meteor.publish 'lectureByCourseSlug', (courseSlug, lectureSlug) ->
  check courseSlug, String
  check lectureSlug, String
  return getLectureData {slug: courseSlug}


getLectureData = (lectureQry) ->
  console.log 'getLectureData', lectureQry
  sectionsCursor = []
  lecturesCursor = []


  coursesCursor = Course.find(lectureQry)
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
