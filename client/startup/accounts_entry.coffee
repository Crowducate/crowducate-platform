Meteor.startup(->
  AccountsEntry.config
    dashboardRoute: '/courses'
    # passwordSignupFields: ['USERNAME_AND_EMAIL']
    showSignupCode: false
    passwordSignupFields: 'USERNAME_AND_EMAIL'
)
