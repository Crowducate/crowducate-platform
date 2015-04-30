Meteor.methods({
    'User.update': function (userId,target,doc) {
        if (Meteor.userId() == userId && target && doc)
        {
            console.log(userId + ":" + target + ":" + doc);
            console.log("user okay, target and doc not null");
            switch(target) {
                case "username":
                    console.log("Target is username");
                    Meteor.users.update(userId, {$set: {'username': doc}});
                    break;
                case "realname":
                    console.log("Target is realname");
                    Meteor.users.update(userId, {$set: {'realname': doc}});
                    break;
                case "gender":
                    console.log("Target is Gender");
                    Meteor.users.update(userId, {$set: {'gender': doc}});
                    break;
                case "languages":
                    console.log("Target is Languages");
                    Meteor.users.update(userId, {$set: {'languages': doc}});
                    break;

                default:
                    console.log("No target");
                    break;
            }
        }
    }
});