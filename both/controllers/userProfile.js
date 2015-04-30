UserProfileController = AppController.extend({
  data: {

  },
  waitOn: function() {
      return this.subscribe('userData');
  }
});
