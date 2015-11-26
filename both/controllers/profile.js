ProfileController = AppController.extend({
  data: {

  },
  waitOn: function() {
      return this.subscribe('userData');
  },
  onBeforeAction: function (pause) {
      AccountsTemplates.ensureSignedIn.call(this, pause);
  }
});
