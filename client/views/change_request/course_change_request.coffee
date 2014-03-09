Template.courseChangeRequest.helpers({
  courseShowPath: -> Router.path 'courseShow', {slug: @course.slug}
})
