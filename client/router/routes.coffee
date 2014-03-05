Router.map ->

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
    before: ->
      if AccountsEntry.settings.homeRoute
        Meteor.logout()
        Router.go AccountsEntry.settings.homeRoute

  @route 'logout'

  @route 'accountSettings'

  @route "dashboard",
    before: ->
      @redirect 'home'
      @stop()

  # HOME
  @route "home",
    path: "/"
    template: "homeGuest"
    waitOn: ->
      if Meteor.userId() then return null else return [Meteor.subscribe('popularCourses')]
    data: ->
      if Meteor.userId() then return {} else return { popularCourses: Course.where({published: 1}, {sort: {createdAt: -1}}) }

  # TEACHER
  @route "teach",
    path: "/teach"
    before: ->
      if Meteor.userId()
        @template = 'myCourseList'
      else
        @template = 'howtoTeach'
    waitOn: ->
      if Meteor.userId() then return [Meteor.subscribe('myCourses')] else return []
    data: -> {ownCourses: Course.where({owner: Meteor.userId()})}

  @route "courseUpdate",
    path: "/teach/:_id"
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
    before: -> Session.set('currentSection', @params._id)
    waitOn: -> [Meteor.subscribe('mySectionByCourse', @params.courseId, @params._id)]
    data: -> {
      course: Course.first({_id: @params.courseId})
      sections: Section.where({}, {sort: {index: 1}})
      lectures: Lecture.where({}, {sort: {index: 1}})
    }
    unload: -> Session.set 'currentSection', null

  @route "lectureUpdate",
    path: "/teach/:courseId/lectures/:_id"
    before: (pause) ->
      Session.set 'currentLecture', @params._id
      Session.set 'markdownValue', @data().lecture.markdown
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
  @route 'changeRequests',
    template: 'changeRequestList'
    path: '/change-requests'
    waitOn: -> [Meteor.subscribe 'myChangeRequests']
    data: -> {changeRequests: ChangeRequest.where({})}
  @route 'changeRequestShow',
    path: '/change-request/:_id'
    waitOn: -> [Meteor.subscribe 'myChangeRequest', @params._id]
    data: -> ChangeRequest.first({_id: @params._id})

  # STUDENT
  @route 'courseList',
    path: '/courses'
    waitOn: -> [Meteor.subscribe 'popularCourses']
    data: -> popularCourses: Course.where({published: 1}, {sort: {createdAt: -1}})

  # PROFILE
  @route 'profile'

  # LASTLY COURSE DETAIL
  @route 'courseShow',
    path: ':slug'
    waitOn: -> [Meteor.subscribe 'course', @params.slug]
    data: -> {
      course: Course.first({slug: @params.slug})
      sections: Section.where({})
      lectures: Lecture.where({})
    }

  @route 'lectureShow',
    path: ':courseSlug/:slug'
    before: (pause) -> Session.set 'currentLecture', @params.slug
    waitOn: -> [Meteor.subscribe('lectureByCourseSlug', @params.courseSlug, @params.slug)]
    data: -> {
      course: Course.first({slug: @params.courseSlug})
      sections: Section.where({})
      lectures: Lecture.where({})
      lecture: Lecture.first({slug: @params.slug})
    }

  @route 'lectureChangeRequest',
    path: ':courseSlug/:slug/change'
    before: ->
      Session.set 'currentLecture', @params.slug
      Session.set 'markdownValue', @data().lecture.markdown
    waitOn: -> [Meteor.subscribe 'lectureByCourseSlug', @params.courseSlug, @params.slug]
    data: -> {
      course: Course.first({slug: @params.courseSlug})
      sections: Section.where({})
      lectures: Lecture.where({})
      lecture: Lecture.first({slug: @params.slug})
    }



  return
