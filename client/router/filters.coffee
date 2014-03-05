Layouts = [
  layoutTemplate: 'leftNavLayout'
  yieldTemplates: {'courseLeftNav': to: 'leftNav'}
  routes: [
    'lectureShow'
    'courseShow'
    'lectureChangeRequest'
  ]
,
  layoutTemplate: 'leftNavLayout'
  yieldTemplates: 'myCourseLeftNav': to: 'leftNav'
  routes: [
    'lectureUpdate'
    'sectionUpdate'
    'courseUpdate'
  ]
]

IR_BeforeHooks =
  setLayout: ->
    for l in Layouts
      if _.indexOf(l.routes, @route.name) > -1
        @yieldTemplates = l.yieldTemplates
        @layout l.layoutTemplate
        return

  baseSubscriptions: ->
    @subscribe('userData').wait()

  pageview: ->
    GAnalytics.pageview(@path)

  clearViewContentSessionVars: ->
    Session.set 'currentLecture', null

  waitForData: (pause) ->
    if _.isFunction @data
      pause() unless @ready()

  login: (pause) ->
    #TODO only for loged in users

# always
Router.before IR_BeforeHooks.baseSubscriptions
Router.before IR_BeforeHooks.waitForData
Router.before IR_BeforeHooks.setLayout

# only
Router.before IR_BeforeHooks.clearViewContentSessionVars, only: ['courseShow', 'lectureShow']
Router.before IR_BeforeHooks.login, only: ['lectureChangeRequest']

# last
Router.after IR_BeforeHooks.pageview
