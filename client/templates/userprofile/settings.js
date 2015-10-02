
Template.profileSettings.helpers({
    profile: function() {
        return Meteor.users.findOne({'id':this._id });
    },
    genderOptions: function() {
        return [
            {
                optgroup: "Please select your Gender",
                options: [
                    {label: "Female", value: "Female"},
                    {label: "Male", value: "Male"},
                    {label: "I'd rather not tell", value: "Unknown"}
                ]
            }
        ]
    },
    languageOptions: function() {
        return [
            {
                optgroup: "Please select your preferred Language",
                options: [
                    {label: "English", value: "English"},
                    {label: "Finnish", value: "Finnish"},
                    {label: "German", value: "German"},
                    {label: "Russian", value: "Russian"},
                    {label: "Persian", value: "Persian"}

                ]
            }
        ]
    }

});

Template.profileSettings.events({
   "submit #passwordEdit": function (event) {
        event.preventDefault();
       //TODO Unshow error message after a while
        oldPassword = AutoForm.getFieldValue('old', 'passwordEdit');
        newPassword = AutoForm.getFieldValue('new', 'passwordEdit');
        Accounts.changePassword(oldPassword, newPassword, function(error) {
            $("#passwordMessages #passwordErrorMessage").text(error);
           $("#passwordMessages").show();
        });
   }
});