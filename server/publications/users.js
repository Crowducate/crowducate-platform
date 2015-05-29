Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId},
            {fields: {'realname': 1, 'username': 1, 'gender': 1, 'language': 1, 'biography': 1 }})
    }
});