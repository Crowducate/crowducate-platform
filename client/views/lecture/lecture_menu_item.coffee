Template.lectureMenuItem.helpers({
  lecturePath: (course) ->
    Router.path('lectureShow', {courseSlug: course.slug, slug: @slug})
  active: ->
    return 'active' if @slug is Session.get 'currentLecture'
  lectureIndex: (section) ->
    return (section.index + 1) + '.' + (@index + 1) + '.'
})
