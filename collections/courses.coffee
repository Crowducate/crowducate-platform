class @Course extends Minimongoid
  @_collection: new Meteor.Collection('courses')

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
      {key: 'Programming', label: 'Programming'}
  ]

  getKeywords: ->
    return @keywords.join(', ') if @keywords and _.isArray(@keywords)

  isPublished: ->
    return @published is 1 if @published

  @validate: (data) ->
    errors = MsValidator.validateModel(data, @validations)
    throw new Meteor.Error(400, JSON.stringify(errors)) unless _.isEmpty(errors)

  @validations:
    courseTitle: (value) ->
      throw new Error('Please enter a course title.') unless validator.isLength(value, 1)
    subtitle: (value) ->
      throw new Error('Please enter a subtitle.') unless validator.isLength(value, 1)
    keywords: (value) ->
      throw new Error('Please enter some keywords') unless validator.isLength(value, 1)
    category: (value) ->
      throw new Error('Please select a category') unless validator.isIn(value, _.pluck(Course.CATEGORIES, 'key'))
    age: (value) ->
      throw new Error('Please select an age group') unless validator.isIn(value, _.pluck(Course.AGE_GROUPS, 'key'))

Meteor.methods({
  createCourse: ->
    userId = Meteor.userId()
    throw new Meteor.Error 403, 'Please login to create a course' unless userId
    title = 'New Course'
    course = Course.create {owner: userId, courseTitle: title, published: 0, slug: slugify(title)}
    return course._id
  updateCourse: (courseId, data) ->
    check courseId, String

    data.published = parseInt(data.published)

    check data, {
      courseTitle: String
      subtitle: String
      keywords: String
      category: String
      age: String
      published: Number
    }

    userId = Meteor.userId()
    throw new Meteor.Error 403, 'Please login to create a course' unless userId

    course = Course.first {_id: courseId}
    throw new Meteor.Error 404, 'Course not found' unless course
    throw new Meteor.Error 403, 'You are not allowed to update this course' unless course.owner is userId

    errors = Course.validate data
    throw new Meteor.Error 400, JSON.stringify errors unless _.isEmpty errors

    slug = slugify(data.courseTitle)
    if slug isnt course.slug
      throw new Meteor.Error 400, JSON.stringify {courseTitle: 'This title is already taken'} unless Course.find({slug: slug}).count() is 0
      data.slug = slug

    data.keywords = data.keywords.split(',').map (kw) -> _.trim(kw)
    data.updatedAt = new Date().valueOf()

    course.save(data)
    course._id

  deleteCourse: (courseId) ->
    check courseId, String

    userId = Meteor.userId()
    course = Course.first({_id: courseId})
    throw new Meteor.Error 404, 'Course not found' unless course
    throw new Meteor.Error 403, 'You are not allowed to delete this course' unless userId is course.owner

    sections = Section.where {_id: {$in: course.sections}}
    lectureArr = []
    for s in sections
      Etc.pushArray lectureArr, s.lectures
      s.destroy()

    Lecture._collection.remove({_id: {$in: lectureArr}})

    course.destroy()
    true
})


# // Meteor.methods({
# //  createCourse: function (courseAttributes) {
# //    // ensure the post has a title
# //    /*if (!courseAttributes.Coursetitle)
# //    throw new Meteor.Error(422, 'Please fill in a headline');*/

# //    //course._id = Courses.insert(course);

# //    var course = _.extend(_.pick(courseAttributes, 'courseTitle', 'subtitle', 'keywords','category','age'));
# //     course.owner = Meteor.userId();
# //    var courseId = Courses.insert(course);

# //    return courseId;
# //  }
# // });
