Router.map( function () {
  this.route('home', {
    path: '/',
    before: function () {
      // set template depending on login-status
      if( Meteor.userId() ){
        // user is logged in
        this.template = 'signedin';
      } else{
        // user is guest
        this.template = 'home';
      }
    }
  });

  // This template is shown on '/' if logged in
  // this.route('signedin', {
  //   template: 'signedin',
  //   path: '/signedin'
  // });

  this.route('basicinfo', {
    template: 'basicinfo',
    path: '/basicinfo'
  });

  this.route('curriculum', {
    template: 'curriculum',
    path: '/curriculum'
  });

  this.route('logout', {
    before: function() {
      Meteor.logout();
      this.go('home');
    }
  });
});