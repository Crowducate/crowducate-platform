Router.route('/', {
    name: 'home'
});

Router.route('/dashboard');

Router.route('/teach');

Router.route('/learn');

Router.route('tag/:tag',  {
    name: 'taggedCourses'
});

Router.route('course/:_id', {
    name: 'course'
});

Router.route('/singleresourcepage', {
    name: 'singleResourcePage'
});
