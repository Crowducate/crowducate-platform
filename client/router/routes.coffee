Router.map ->

  # AUTHENTICATION
  # AUTHENTICATION
  # AUTHENTICATION
  @route "entrySignIn",
    path: "/sign-in"
    onBeforeRun: ->
      Session.set('entryError', undefined)
      Session.set('buttonText', 'in')

  @route "entrySignUp",
    path: "/sign-up"
    # onBeforeRun: ->
    #   Session.set('entryError', undefined)
    #   Session.set('buttonText', 'up')

  @route "entryForgotPassword",
    path: "/forgot-password"
    onBeforeRun: ->
      Session.set('entryError', undefined)

  @route 'entrySignOut',
    path: '/sign-out'
    onBeforeAction: ->
      if AccountsEntry.settings.homeRoute
        Meteor.logout()
        Router.go AccountsEntry.settings.homeRoute

  @route 'logout'

  @route 'accountSettings'

  @route "dashboard",
    onBeforeAction: ->
      @redirect 'home'
      @stop()

  # STATIC
  # STATIC
  # STATIC
  @route "home",
    path: "/"
    template: "homeGuest"
    waitOn: ->
      if Meteor.userId() then return null else return [Meteor.subscribe('popularCourses')]
    data: ->
      if Meteor.userId() then return {} else return { popularCourses: Course.where({published: 1}, {sort: {createdAt: -1}}) }

  # TEACHER
  # TEACHER
  # TEACHER
  @route "teach",
    path: "/teach"
    onBeforeAction: ->
      if Meteor.userId()
        @template = 'myCourseList'
      else
        @template = 'howtoTeach'
    waitOn: ->
      if Meteor.userId() then return [Meteor.subscribe('myCourses')] else return []
    data: -> {ownCourses: Course.where({owner: Meteor.userId()})}

  @route "courseUpdate",
    path: "/teach/:_id"
    layoutTemplate: 'leftNavLayout'
    yieldTemplates: 'myCourseLeftNav': to: 'leftNav'
    onBeforeAction: (pause) ->
      Session.set 'markdownValue', @data().course.markdown if @ready()
    waitOn: ->
      [Meteor.subscribe('myCourse', @params._id)]
    data: ->
      {
        course: Course.first({_id: @params._id})
        sections: Section.where({}, {sort: {index: 1}})
        lectures: Lecture.where({}, {sort: {index: 1}})
      }

  @route "sectionUpdate",
    path: "/teach/:courseId/sections/:_id"
    layoutTemplate: 'leftNavLayout'
    yieldTemplates: 'myCourseLeftNav': to: 'leftNav'
    onBeforeAction: ->
      Session.set('currentSection', @params._id) if @ready()
    waitOn: -> [Meteor.subscribe('mySectionByCourse', @params.courseId, @params._id)]
    data: -> {
      course: Course.first({_id: @params.courseId})
      sections: Section.where({}, {sort: {index: 1}})
      lectures: Lecture.where({}, {sort: {index: 1}})
    }
    unload: -> Session.set 'currentSection', null

  @route "lectureUpdate",
    path: "/teach/:courseId/lectures/:_id"
    layoutTemplate: 'leftNavLayout'
    yieldTemplates: 'myCourseLeftNav': to: 'leftNav'
    onBeforeAction: (pause) ->
      Session.set 'currentLecture', @params._id
      Session.set 'markdownValue', @data().lecture.markdown if @ready() and @data().lecture
      BootstrapTabs.setCurrentTab 'exercise' if BootstrapTabs
    waitOn: -> [
      Meteor.subscribe('lectureByCourse', @params.courseId, @params._id)
    ]
    data: -> {
      course: Course.first({_id: @params.courseId})
      sections: Section.where({}, {sort: {index: 1}})
      lectures: Lecture.where({}, {sort: {index: 1}})
      lecture: Lecture.first({_id: @params._id})
    }
    unload: -> Session.set 'currentLecture', null

  # CHANGE REQUESTS
  # CHANGE REQUESTS
  # CHANGE REQUESTS
  @route 'changeRequests',
    template: 'changeRequestList'
    path: '/change-requests'
    waitOn: -> [Meteor.subscribe 'myChangeRequests']
    data: -> {changeRequests: ChangeRequest.where({}, {sort: {createdAt: -1}})}
  @route 'changeRequestShow',
    path: '/change-request/:_id'
    waitOn: -> [Meteor.subscribe 'myChangeRequest', @params._id]
    data: -> ChangeRequest.first({_id: @params._id})


  # PROFILE
  # PROFILE
  # PROFILE
  @route 'profile'

  # CHANGE REQUESTS
  # CHANGE REQUESTS
  # CHANGE REQUESTS
  @route 'courseChangeRequest',
    path: ':slug/change'
    layoutTemplate: 'leftNavLayout'
    yieldTemplates: {'courseLeftNav': to: 'leftNav'}
    onBeforeAction: (pause) ->
      pause() unless @ready()
      Session.set 'markdownValue', @data().course.markdown if @ready()
    waitOn: -> [Meteor.subscribe 'course', @params.slug]
    data: -> {
      course: Course.first({slug: @params.slug})
      sections: Section.where({})
      lectures: Lecture.where({})
    }
  @route 'lectureChangeRequest',
    path: ':courseSlug/:slug/change'
    layoutTemplate: 'leftNavLayout'
    yieldTemplates: {'courseLeftNav': to: 'leftNav'}
    onBeforeAction: (pause) ->
      pause() unless @ready()
      Session.set 'currentLecture', @params.slug
      Session.set 'markdownValue', @data().lecture.markdown if @ready()
    waitOn: -> [Meteor.subscribe 'lectureByCourseSlug', @params.courseSlug, @params.slug]
    data: -> {
      course: Course.first({slug: @params.courseSlug})
      sections: Section.where({})
      lectures: Lecture.where({})
      lecture: Lecture.first({slug: @params.slug})
    }

    # STUDENT
    # STUDENT
    # STUDENT
    @route 'courseList',
      path: '/courses'
      onBeforeAction: (pause) -> pause() unless @ready()
      waitOn: -> [Meteor.subscribe 'popularCourses']
      data: -> courses: Course.where({published: 1}, {sort: {createdAt: -1}})

    @route 'courseShow',
      path: ':slug'
      layoutTemplate: 'leftNavLayout'
      yieldTemplates: {'courseLeftNav': to: 'leftNav'}
      waitOn: -> [Meteor.subscribe 'course', @params.slug]
      onBeforeAction: (pause) ->
        pause() unless @ready()
      data: -> {
        course: Course.first({slug: @params.slug})
        sections: Section.where({}, {sort: {index: 1}})
        lectures: Lecture.where({}, {sort: {index: 1}})
      }
      after: ->
        course = @data().course
        SEO.set({
          title: course.courseTitle
          meta:
            description: course.getText(160)
        })

    @route 'lectureShow',
      path: ':courseSlug/:slug'
      layoutTemplate: 'leftNavLayout'
      yieldTemplates: {'courseLeftNav': to: 'leftNav'}
      onBeforeAction: (pause) ->
        pause() unless @ready()
        Session.set 'currentLecture', @params.slug if @ready()
      waitOn: -> [Meteor.subscribe('lectureByCourseSlug', @params.courseSlug, @params.slug)]
      data: -> {
        course: Course.first({slug: @params.courseSlug})
        sections: Section.where({}, {sort: {index: 1}})
        lectures: Lecture.where({}, {sort: {index: 1}})
        lecture: Lecture.first({slug: @params.slug})
      }
      after: ->
        lecture = @data().lecture
        SEO.set({
          title: lecture.lectureTitle
          meta:
            description: lecture.getText(160)
        })

  return
