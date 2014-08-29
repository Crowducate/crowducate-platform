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
    options = [{key: 'select', label: '-- select --'}]
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
  # currently not using 'age' because of user feedback
  # currently not using 'age' because of user feedback   
  # currently not using 'age' because of user feedback   
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
    label: "Change to 'Published' when course should be viewable to others"
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
  markdown: -> @course.markdown
})

Template.courseUpdate.events({
  'submit form': (evt, tpl) ->
    Etc.prevent(evt)

    Form.removeFormError()

    data = $(evt.target).serializeObject()
    data.markdown = Template.markdownEditor.getValue()
    console.log 'Before', tpl
    Meteor.call('updateCourse', tpl.data.course._id, data, (err, response) ->
      return handleFormError(err) if err
      console.log 'Done', tpl
      if tpl.data.course.owner is User.current()._id
        Notify.setSuccess('Course updated')
      else
        Notify.setSuccess('Your change request was send to the author of the course.')
    )
  'click .delete': (evt, tpl) ->
    Etc.prevent(evt)

    if confirm 'Delete this course?'
      Meteor.call 'deleteCourse', tpl.data.course._id, (err) ->
        return Notify.setError err.reason if err
        Router.go Router.path 'teach'
})
