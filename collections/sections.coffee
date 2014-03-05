class @Section extends Minimongoid
  @_collection: new Meteor.Collection('sections')

  @validate: (data) ->
    errors = MsValidator.validateModel(data, @validations)
    throw new Meteor.Error(400, JSON.stringify(errors)) unless _.isEmpty(errors)

  @validations:
    sectionTitle: (value) ->
      throw new Error('Please enter a section title.') unless validator.isLength(value, 1)

Meteor.methods({
  createSection: (courseId) ->
    check courseId, String

    userId = Meteor.userId()
    course = Course.first({_id: courseId})
    throw new Meteor.Error 404, 'Course not found' unless course
    throw new Meteor.Error 403, 'You are not allowed to add a section to this course' unless course.owner is userId

    sectionIndex = if course.sections then course.sections.length else 0
    section = Section.create({owner: userId, courseId: course._id, sectionTitle: 'New Section', index: sectionIndex})
    course.push({sections: section._id})
    return section._id

  updateSection: (sectionId, data) ->
    check sectionId, String
    check data, {
      sectionTitle: String
    }

    userId = Meteor.userId()
    throw new Meteor.Error 403, 'Please login to create a course' unless userId

    section = Section.first {_id: sectionId}
    throw new Meteor.Error 404, 'Course not found' unless section
    throw new Meteor.Error 403, 'You are not allowed to update this section' unless section.owner is userId

    errors = Section.validate data
    throw new Meteor.Error 400, JSON.stringify errors unless _.isEmpty errors


    data.updatedAt = new Date().valueOf()

    section.save(data)
    section._id

  deleteSection: (sectionId) ->
    check sectionId, String

    section = Section.first({_id: sectionId})
    throw new Meteor.Error 404, 'Section not found' unless section
    userId = Meteor.userId()
    throw new Meteor.Error 403, 'You are not allowed to delete this section' unless section.owner is userId

    lectures = Lecture.where({sectionId: section._id})
    for l in lectures
      l.destroy()

    course = Course.first({_id: section.courseId})
    throw new Meteor.Error 404, 'Course not found' unless course
    course.pull({sections: section._id})

    sectionIndex = section.index
    Section._collection.update({_id: {$in: course.sections}, index: {$gt: sectionIndex}}, {$inc: {index: -1} })

    section.destroy()
    true
})
