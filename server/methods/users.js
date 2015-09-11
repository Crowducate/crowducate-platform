Meteor.methods({
  'User.update': function (userId,target,doc) {
    if (Meteor.userId() == userId && target && doc)
    {

      //TODO: simplify
      switch(target) {
        case "username":

        // TODO, check if username is already taken

        Meteor.users.update(userId, {$set: {'username': doc}});
        break;
        case "realname":

        Meteor.users.update(userId, {$set: {'realname': doc}});
        break;
        case "gender":

        Meteor.users.update(userId, {$set: {'gender': doc}});
        break;
        case "language":

        Meteor.users.update(userId, {$set: {'language': doc}});
        break;
        case "email":

        Meteor.users.update(userId, {$set: {'emails': [{'address': doc}]}});
        break;
        case "biography":

        Meteor.users.update(userId, {$set: {'biography': doc}});
        break;

        default:

        break;
      }
    }
  },

  'checkUsername': function (username) {
    if(Meteor.users.findOne({'username': username}))
    {
      return error;
    }
  }
});
