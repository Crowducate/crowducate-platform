var isEmail = function(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
};

Template.userProfile.rendered = function() {
    $("#language").find("option[value=" + Meteor.user().language + "]").attr("selected", "selected");
    $("#gender").find("option[value=" + Meteor.user().gender + "]").attr("selected", "selected");
};

Template.userProfile.helpers({
    //TODO: fetch current profile
    'usor': function() {
        return Meteor.users.findOne({'id':this._id });
    },
    'usermail': function() {
        return Meteor.user().emails[0].address;
    },
    'errors': function() {
        return Session.get("errors");
    },
    'perrors': function() {
        return Session.get("perrors");
    },

    'langs': function () {
        return data = ["English", "Finnish", "German", "Persian", "Russian", "Swedish"];
    }
});

Template.userProfile.events({
    'click #saveChanges': function(event, template) {
        var realname = template.find("#realName").value;
        var username = template.find("#userName").value;
        var gender = template.find("#gender option:selected").value;
        var language = template.find("#language option:selected").value;
        var email = template.find("#email").value;

        if (Meteor.userId())
        {
            if (realname === '')
            {
                Session.set("errors", "Your Realname is empty!");
            }
            else if (username === '')
            {
                Session.set("errors", "Your username is empty!");
            }
            else if (email === '')
            {
                Session.set("errors", "Your email is empty!");
            }
            else if (!(isEmail(email))) {
                Session.set("errors", "You have not entered a correct Email!");
            }

            else {
                Session.set("errors", "");
                console.log("success");

                //TODO simplify
                Meteor.call("User.update", Meteor.userId(),"realname", realname);
                Meteor.call("User.update", Meteor.userId(),"username", username);
                Meteor.call("User.update", Meteor.userId(),"gender", gender);
                Meteor.call("User.update", Meteor.userId(),"email", email);
                Meteor.call("User.update", Meteor.userId(),"language", language);


            }

        }

            //Session.set("errors", "");
            Meteor.call("User.update", Meteor.userId(),"realname", realname);


    },
    'submit .changePassword': function(event,template) {
        event.preventDefault();
        var oldpassword = template.find("#oldPassword").value;
        var password = template.find("#newPassword").value;
        var passwordagain = template.find("#newPasswordCheck").value;
        if ((password === passwordagain)) {
            if (Meteor.userId()) {
            Accounts.changePassword(oldpassword,password, function(error) {
                if(error) {
                    console.log("Something went wrong! " + error);

                }
                else {
                    Session.set("perrors", "");
                    console.log("Password changed!");
                }
            });
            }
        }
        else {
            Session.set("perrors", "Your passwords do not match.")
        }
    }




});