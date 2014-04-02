Template.courseChangeRequest.helpers({
  courseShowPath: -> 
    Router.path 'courseShow', {slug: @course.slug} if @course and @course.slug
})
