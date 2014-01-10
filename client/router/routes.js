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
    //path: '/basicinfo'
    //path: '/courses/:_id',
    //data: function() { return Posts.findOne({_id: this.params._id}); }
  });

  this.route('curriculum', {
    template: 'curriculum',
    //path: '/basicinfo'
    path: '/courses/:_id',
    data: function() { return Courses.findOne({_id: this.params._id}); }
  });

  //  this.route('curriculum', {
  //   template: 'curriculum',
  //   //path: '/basicinfo'
  //   path: '/courses/:slug',
  //   data: function() { return Courses.findOne({slug: this.params.slug}); }
  // });

  //this.route('curriculum', {
   // template: 'curriculum',
    //path: '/curriculum'
  //});

  this.route('lectureedit', {
    template: 'lectureedit',
    path: '/lectureedit'
  });

  this.route('currently-learning', {
    template: 'currently-learning',
    path: '/currently-learning'
  });

  this.route('logout', {
    before: function() {
      Meteor.logout();
      this.go('home');
    }
  });
});