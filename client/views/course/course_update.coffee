Template.courseUpdate.created = ->
  console.log 'Template.courseUpdate.created', @

Template.courseUpdate.rendered = ->
  console.log 'Template.courseUpdate.rendered'

Template.courseUpdate.helpers({
  title: ->
    template: 'controlGroupWithInput'
    inputName: 'courseTitle'
    autofocus: true
    label: 'Title'
    placeholder: 'Enter the name of this course'
    value: @course.courseTitle if @course
  subtitle: ->
    template: 'controlGroupWithInput'
    inputName: 'subtitle'
    label: 'Subtitle'
    placeholder: 'Write a sentence or two about the content'
    value: @course.subtitle if @course
  keywords: ->
    template: 'controlGroupWithInput'
    inputName: 'keywords'
    label: 'Keywords (Tags)'
    placeholder: 'Choose some tags (e.g. JavaScript, Math)'
    value: @course.getKeywords() if @course
  category: ->
    options = []
    for c in Course.CATEGORIES
      o = {key: c.key, label: c.label}
      o.attributes = 'selected' if @course and c.key is @course.category
      options.push o
    {
      template: 'controlGroupWithSelect'
      label: 'Category'
      inputName: 'category'
      options: options
    }
  age: ->
    options = []
    for ag in Course.AGE_GROUPS
      o = {key: ag.key, label: ag.label}
      o.attributes = 'selected' if @course and ag.key is @course.age
      options.push o

    template: 'controlGroupWithSelect'
    label: 'Age Group'
    inputName: 'age'
    options: options
  published: ->
    template: 'controlGroupWithSelect'
    inputName: 'published'
    options: [
      label: 'Unpublished'
      key: 0
      attributes: 'selected' if @course and not @course.isPublished()
    ,
      label: 'Published'
      key: 1
      attributes: 'selected' if @course and @course.isPublished()
    ]
})

Template.courseUpdate.events({
  'submit form': (evt, tpl) ->
    console.log 'submit form'
    Etc.prevent(evt)

    Form.removeFormError()

    data = $(evt.target).serializeObject()

    Meteor.call('updateCourse', tpl.data.course._id, data, (err, response) ->
      console.log 'updatedCourse', err, response
      return handleFormError(err) if err
      Notify.setSuccess('Course updated')
    )
  'click .delete': (evt, tpl) ->
    Etc.prevent(evt)

    if confirm 'Delete this course?'
      Meteor.call 'deleteCourse', tpl.data.course._id, (err) ->
        return Notify.setError err.reason if err
        Router.go Router.path 'teach'
})
