Accounts.onCreateUser((options, user) ->
  return createFromFacebook(options, user) if user.services.facebook
  return createFromGoogle(options, user) if user.services.google
  return createFromPassword(options, user) if user.services.password
)

createFromPassword = (options, user) ->
  email = options['email'].toLowerCase()
  username = options.username
  user.profile = {}
  return user

createFromFacebook = (options, user) ->
  console.log 'createFromFacebook', options, user
  fbData = user.services.facebook
  user.profile = {gender: fbData.gender, username: fbData.name}
  return user

createFromGoogle = (options, user) ->
  console.log 'createFromGoogle', options, user
  gData = user.services.google
  user.profile =
    gender: gData.gender
    username: gData.name
  return user