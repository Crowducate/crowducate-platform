IR_BeforeHooks =
  baseSubscriptions: ->
    @subscribe('userData').wait()

  pageview: ->
    GAnalytics.pageview(@path)

  clearViewContentSessionVars: ->
    Session.set 'currentLecture', null

  waitForData: (pause) ->
    if _.isFunction @data
      pause() unless @ready()
  clearFormErrors: ->
    Form.removeFormError()
  login: (pause) ->
    #TODO only for loged in users

# always
Router.onBeforeAction IR_BeforeHooks.baseSubscriptions
Router.onBeforeAction IR_BeforeHooks.waitForData
Router.onBeforeAction IR_BeforeHooks.setLayout

# only
Router.onBeforeAction IR_BeforeHooks.clearViewContentSessionVars, only: ['courseShow', 'lectureShow']
Router.onBeforeAction IR_BeforeHooks.login, only: ['lectureChangeRequest']

# last
Router.onAfterAction IR_BeforeHooks.pageview
