var userProfileHooks = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    return sAlert.success('Profile updated');
  }
};

AutoForm.addHooks('UserProfileEdit', userProfileHooks);