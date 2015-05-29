Template.taggedCourses.helpers({
    'courses': function () {
        return Courses.find().fetch();
    },
    'tag': function () {
        return Session.get('tag');
    }
});
