var userProfileHooks = {
  // Called when any submit operation succeeds
  onSuccess: function(operation, result, template) {
    return sAlert.success("Profile updated");
  },
  onError: function(operation, error, template) {
    return sAlert.error(error);
  }
};

var passwordHooks = {
  onSubmit: function(insertDoc, updateDoc, currentDoc) {
    this.event.preventDefault();
    Accounts.changePassword(insertDoc.old, insertDoc.new, function(error) {
      if (error) {
        sAlert.error(error.message);
      } else {
        sAlert.success("Password successfully updated.");
        AutoForm.resetForm('passwordEdit');
      }
    });
    this.done();
    return false
  }
}

AutoForm.addHooks('UserProfileEdit', userProfileHooks);
AutoForm.addHooks('passwordEdit', passwordHooks);
