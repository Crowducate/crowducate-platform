Template.userProfile.helpers({
    //TODO: fetch current profile
    'usor': function() {
        return Meteor.users.findOne({'id':this._id });
    }

});

Template.userProfile.events({
    'change #realName': function(event, template) {
        event.preventDefault();
        var realname = template.find("#realName").value;
        if (Meteor.userId())
        {
            Meteor.call("User.update", Meteor.userId(),"realname", realname);
        }
    },
    'change #userName': function(event, template) {
        event.preventDefault();
        var username = template.find("#userName").value;
        if (Meteor.userId())
        {
            Meteor.call("User.update", Meteor.userId(), "username", username);
        }

    },
    'change #gender': function(event, template) {
        event.preventDefault();
        var gender = template.find("#gender").value;
        if (Meteor.userId())
        {
            Meteor.call("User.update", Meteor.userId(),"gender", gender);
        }

    },
    'change #languages': function(event, template) {
        event.preventDefault();
        var languages = template.find("#languages").value;
        if (Meteor.userId())
        {
            Meteor.call("User.update", Meteor.userId(),"languages", languages);
        }

    }
});