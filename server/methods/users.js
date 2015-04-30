Meteor.methods({
    'User.update': function (userId,target,doc) {
        if (Meteor.userId() == userId && target && doc)
        {
            console.log("user okay, target and doc not null");
            switch(target) {
                case "username":
                    console.log("Target is username");
                    break;
                case "realname":
                    console.log("Target is realname");
                    break;
                case "gender":
                    console.log("Target is Gender");
                    break;
                case "languages":
                    console.log("Target is Languages");
                    break;

                default:
                    console.log("No target");
                    break;
            }
        }
    }
});