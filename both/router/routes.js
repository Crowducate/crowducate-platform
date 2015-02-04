Router.route('/', {
    name: 'home'
});

Router.route('/dashboard');

Router.route('/teach');

Router.route('/learn');

Router.route('tag/:tag',  {
    name: 'taggedCourses'
});

Router.route('/singleresourcepage', {
    name: 'singleResourcePage'
});
