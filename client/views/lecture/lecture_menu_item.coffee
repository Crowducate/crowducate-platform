Template.lectureMenuItem.helpers({
  lecturePath: (course) ->
    Router.path('lectureShow', {courseSlug: course.slug, slug: @slug})
  active: ->
    return 'active' if @slug is Session.get 'currentLecture'
})
