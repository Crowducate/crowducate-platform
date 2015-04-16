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

Router.route('course/:_id/info', {
    name: 'courseInfo'
});

Router.route('/singleresourcepage', {
    name: 'testsingleResourcePage'
});

Router.route('/singleresourcepage/info', {
    name: 'testcourseInfo'
});

Router.route('license', {
  name: 'licenseQuestions'
})
