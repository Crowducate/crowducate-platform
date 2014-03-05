Meteor.startup(->
  AccountsEntry.config
    dashboardRoute: '/courses'
    showSignupCode: false
)
