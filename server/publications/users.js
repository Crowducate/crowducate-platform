Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId},
            {fields: {'real_name': 1, 'username': 1, 'gender': 1, 'langs': 1 }})
    }
});