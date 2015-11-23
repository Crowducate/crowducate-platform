AutoForm.hooks({
    UserProfileEdit: {
        onSuccess: function(operation, result, template) {
            $("#profileSuccess #profileSuccessMessage").text("You have successfully updated your profile!");
            $("#profileSuccess").show(500, function() {
                $("#profileSuccess").delay(3000).hide(500)
            });
        },
        onError: function() {
            console.log("Error!");
        }
    },
    passwordEdit: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            this.event.preventDefault();
            Accounts.changePassword(insertDoc.old, insertDoc.new, function(error) {
                if (error) {
                    $("#passwordError #passwordErrorMessage").text(error);
                    $("#passwordError").show(500, function() {
                        $("#passwordError").delay(3000).hide(500);
                    });
                } else {
                    $("#passwordSuccess #passwordSuccessMessage").text("You have successfully changed your password!");
                    $("#passwordSuccess").show(500, function() {
                        $("#passwordSuccess").delay(3000).hide(500)
                    });

                }
            });
            this.resetForm();

        }
    }
})

Template.profileSettings.helpers({
    profile: function() {
        return Meteor.users.findOne({
            'id': this._id
        });
    },
    genderOptions: function() {
        return [{
            optgroup: "Please select your Gender",
            options: [{
                label: "Female",
                value: "Female"
            }, {
                label: "Male",
                value: "Male"
            }, {
                label: "I'd rather not tell",
                value: "Unknown"
            }]
        }]
    },
    languageOptions: function() {
        return [{
            optgroup: "Please select your preferred Language",
            options: [{
                    label: "English",
                    value: "English"
                }, {
                    label: "Finnish",
                    value: "Finnish"
                }, {
                    label: "German",
                    value: "German"
                }, {
                    label: "Russian",
                    value: "Russian"
                }, {
                    label: "Persian",
                    value: "Persian"
                }

            ]
        }]
    }

});

 Template.profileSettings.events({
//     "submit #passwordEdit": function(event) {
//         event.preventDefault();
//         //TODO Unshow error message after a while
//         oldPassword = AutoForm.getFieldValue('old', 'passwordEdit');
//         newPassword = AutoForm.getFieldValue('new', 'passwordEdit');
//         Accounts.changePassword(oldPassword, newPassword, function(error) {
//             if (error) {
//                 $("#passwordError #passwordErrorMessage").text(error);
//                 $("#passwordError").show(500, function() {
//                     $("#passwordError").delay(3000).hide(500)
//                 });
//             } else {
//                 $("#passwordSuccess #passwordSuccessMessage").text("You have successfully changed your password!");
//                 $("#passwordSuccess").show(500, function() {
//                     $("#passwordSuccess").delay(3000).hide(500)
//                 });
//             }

//         });
//     },
     "submit #UserProfileEdit": function(event) {
         event.preventDefault();
//         $("#profileSuccess #profileSuccessMessage").text("You have successfully updated your profile!");
//         $("#profileSuccess").show(500, function() {
//             $("#profileSuccess").delay(3000).hide(500)
         }});
//     }
// });
