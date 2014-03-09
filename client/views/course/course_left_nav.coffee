Template.courseLeftNav.helpers({
  pathForCourseShow: ->
    Router.path 'courseShow', {slug: @course.slug}
})
