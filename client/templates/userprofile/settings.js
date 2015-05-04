var isEmail = function(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
};

Template.profileSettings.rendered = function() {
    $("#language").find("option[value=" + Meteor.user().language + "]").attr("selected", "selected");
    $("#gender").find("option[value=" + Meteor.user().gender + "]").attr("selected", "selected");
    Session.set("basicsuccess", "");
    Session.set("passwordsuccess", "");
};

Template.profileSettings.helpers({
    //TODO: fetch current profile
    'profile': function() {
        return Meteor.users.findOne({'id':this._id });
    },
    'usermail': function() {
        return Meteor.user().emails[0].address;
    },
    'realerror': function() {
        return Session.get("realerror");
    },
    'usererror': function() {
        return Session.get("usererror");
    },
    'emailerror': function() {
        return Session.get("emailerror");
    },
    'basicsuccess': function() {
        return Session.get("basicsuccess");
    },
    'passwordsuccess': function() {
        return Session.get("passwordsuccess");
    },

    'perrors': function() {
        return Session.get("perrors");
    },

    'langs': function () {
        return data = ["English", "Finnish", "German", "Persian", "Russian", "Swedish"];
    }
});

Template.profileSettings.events({

    'change #realName': function(event,template) {
      if(template.find("#realName").value)
      {
          Session.set("realerror", "");
      }
        else
      {
          Session.set("realerror", "Your Realname is empty!");
      }
    },
    'change #userName': function(event,template) {
        if(template.find("#userName").value)
        {
            Session.set("usererror", "");
        }
        else
        {
            Session.set("usererror", "Your username is empty!");
        }
    },
    'change #email': function(event,template) {
        if(template.find("#email").value)
        {
            Session.set("emailerror", "");
            if(!(isEmail(template.find("#email".value))))
            {
                Session.set("emailerror", "You have not entered a correct Email!");
            }
            else
            {
                Session.set("emailerror", "");
            }
        }
        else
        {
            Session.set("emailerror", "Your Email is empty!");
        }

    },

    'click #saveChanges': function(event, template) {
        var realname = template.find("#realName").value;
        var username = template.find("#userName").value;
        var gender = template.find("#gender option:selected").value;
        var language = template.find("#language option:selected").value;
        var email = template.find("#email").value;

        if (Meteor.userId())
        {
            if (realname && username && gender && language && email && isEmail(email))
            {
                Session.set("basicsuccess", "Data successfully changed!");
                console.log("success");

                //TODO simplify
                Meteor.call("User.update", Meteor.userId(),"realname", realname);
                Meteor.call("User.update", Meteor.userId(),"username", username);
                Meteor.call("User.update", Meteor.userId(),"gender", gender);
                Meteor.call("User.update", Meteor.userId(),"email", email);
                Meteor.call("User.update", Meteor.userId(),"language", language);

            }
            else
            {
                console.log("there has been a problem!");
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
                    Session.set("passwordsuccess","Password changed!");
                }
            });
            }
        }
        else {
            Session.set("perrors", "Your passwords do not match.")
        }
    }




});