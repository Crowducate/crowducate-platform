class @Course extends Minimongoid
  @_collection: new Meteor.Collection('courses')

  # currently not using 'age' because of user feedback
  # currently not using 'age' because of user feedback   
  # currently not using 'age' because of user feedback 
  @AGE_GROUPS: [
    {key: '7+', label: '7+'},
    {key: '10+', label: '10+'},
    {key: '12+', label: '12+'},
    {key: '15+', label: '15+'},
    {key: '18+', label: '18+'}
  ]
  @CATEGORIES: [
    {key: 'Business', label: 'Business'},
    {key: 'Humanities', label: 'Humanities'},
    {key: 'Science', label: 'Math/Science'},
    {key: 'Programming', label: 'Programming'},
    {key: 'Other', label: 'Other'}
  ]

  getDiff: (field, value) ->
    if field is 'keywords'
      return getPrettyDiff(@getKeywords(), value.join(', ')) if _.isArray value
      return getPrettyDiff(@getKeywords(), value) if _.isString value
    return getPrettyDiff(@[field], value) if @[field]
    return "Error: Field unknown (#{field})"

  getKeywords: ->
    return @keywords.join(', ') if @keywords and _.isArray(@keywords)

  getText: (chars) ->
    return $(marked( @markdown.substr(0, chars) )).text() if chars and @markdown
    return $(marked(@markdown)).text() if @markdown
    return ''

  getCategory: -> @category

  getAge: -> @age

  isPublished: ->
    return @published is 1 if @published

  isMyCourse: ->
    @owner is Meteor.userId()

  @validate: (data) ->
    errors = MsValidator.validateModel(data, @validations)
    throw new Meteor.Error(400, JSON.stringify(errors)) unless _.isEmpty(errors)

  @validations:
    courseTitle: (value) ->
      throw new Error('Please enter a course title.') unless validator.isLength(value, 1) #and not validator.equals(value, 'New ')
    # subtitle: (value) ->
    #   throw new Error('Please enter a subtitle.') unless validator.isLength(value, 1)
    keywords: (value) ->
      throw new Error('Please enter some keywords') unless validator.isLength(value, 1)
    category: (value) ->
      throw new Error('Please select a category') unless validator.isIn(value, _.pluck(Course.CATEGORIES, 'key'))
    # age: (value) ->
    #   throw new Error('Please select an age group') unless validator.isIn(value, _.pluck(Course.AGE_GROUPS, 'key'))
    markdown: (value) ->
      throw new Error('Please enter a course description') unless validator.isLength(value, 1)

Meteor.methods({
  createCourse: ->
    userId = Meteor.userId()
    throw new Meteor.Error 403, 'Please login to create a course' unless userId
    title = 'New Course'
    course = Course.create {
      owner: userId, courseTitle: title, published: 0, upvoters: [], votes: 0, slug: slugify(title)
    }
    return course._id

 upvote: (courseId) ->

    user = Meteor.user()

    Course._collection.update({
      _id: courseId,
      upvoters: { $ne: user._id }}, {
      $addToSet: {upvoters: user._id},
      $inc: {votes: 1}
    });
    
  updateCourse: (courseId, data) ->
    check courseId, String

    data.published = parseInt(data.published)

    check data, {
      courseTitle: String
      markdown: String
      keywords: String
      category: String
      #age: String
      published: Number
    }

    userId = Meteor.userId()
    throw new Meteor.Error 403, 'Please login to create a course' unless userId

    course = Course.first {_id: courseId}
    throw new Meteor.Error 404, 'Course not found' unless course

    errors = Course.validate data
    throw new Meteor.Error 400, JSON.stringify errors unless _.isEmpty errors

    slug = slugify(data.courseTitle)
    if slug isnt course.slug
      throw new Meteor.Error 400, JSON.stringify {courseTitle: 'This title is already taken'} unless Course.find({slug: slug}).count() is 0
      data.slug = slug

    data.keywords = data.keywords.split(',').map (kw) -> _.trim(kw)
    data.updatedAt = new Date().valueOf()

    isChangeRequest = userId isnt course.owner

    if isChangeRequest
      data.published = 1
      data.owner = course.owner
      ChangeRequest.create({data: data, type: 'course', docId: course._id, owner: userId, state: ChangeRequest.STATE_OPEN})
    else
      course.save(data)
    course._id

  deleteCourse: (courseId) ->
    check courseId, String

    userId = Meteor.userId()
    course = Course.first({_id: courseId})
    throw new Meteor.Error 404, 'Course not found' unless course
    throw new Meteor.Error 403, 'You are not allowed to delete this course' unless userId is course.owner

    unless course.sections
      # has no sections
      course.destroy()
      return true

    sections = Section.where {_id: {$in: course.sections}}
    lectureArr = []

    for s in sections
      Etc.pushArray lectureArr, s.lectures
      s.destroy()

    Lecture._collection.remove({_id: {$in: lectureArr}})

    course.destroy()
    true

  copyCourse: (courseId) ->
    check courseId, String

    userId = Meteor.userId()
    throw new Meteor.Error 403, 'You have to log in in order to copy a course' unless userId

    course = Course.first {_id: courseId}
    throw new Meteor.Error 404, 'Course not found' unless course
    throw new Meteor.Error 403, 'You cannot copy your own course' if course.owner is userId

    courseSections = course.sections or []
    
    sections = Section.where {_id: {$in: course.sections}}

    lectureArr = []
    for s in sections
      Etc.pushArray lectureArr, s.lectures
    lectures = Lecture.where {_id: {$in: lectureArr}}

    copyCount = if course.copyCount then course.copyCount + 1 else 1
    course.save {copyCount: copyCount}

    # Create and double check new course slug
    newCourseSlug = course.slug + '-' + copyCount
    noFreeSlugFound = true
    while noFreeSlugFound
      if Course.find({slug: newCourseSlug}).count() is 0
        noFreeSlugFound = false
      else
        copyCount++
        newCourseSlug = course.slug + '-' + copyCount

    newCourseData = _.pick(course, [
      #'age'
      'category'
      'courseTitle'
      'keywords'
      'subtitle'
      'markdown'
    ])
    newCourseData.slug = newCourseSlug
    newCourseData.original = course._id
    newCourseData.owner = userId
    newCourseData.published = 0
    newCourse = Course.create newCourseData

    # Copy sections
    newSectionArr = []
    for s in sections
      newLectureArr = []
      sectionLectureArr = s.lectures or []
      lectures = Lecture.where {_id: {$in: sectionLectureArr}}
      newSectionData = _.pick(s, [
        'index'
        'sectionTitle'
      ])
      newSectionData.owner = userId
      newSectionData.courseId = newCourse._id
      newSection = Section.create newSectionData
      newSectionArr.push newSection._id
      # Copy section lectures
      for l in lectures
        newLectureData = _.pick l, [
          'lectureTitle',
          'markdown',
          'quiz',
          'slug'
          'index'
        ]
        newLectureData.owner = userId
        newLectureData.sectionId = newSection._id
        newLecture = Lecture.create newLectureData

        newLectureArr.push newLecture._id

      newSection.save {lectures: newLectureArr}

    newCourse.save {sections: newSectionArr}
    newCourse._id
})
