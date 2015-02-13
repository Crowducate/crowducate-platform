Template.courseToolbar.events({
    'click #edit-course':function(event, template){
        Session.set('editMode', true);
        $('.lesson-link').editable();
        $('#section-title').editable();
        $('#course-title').editable();
    },
    'click #cancel-course-edit': function () {
        Session.set('editMode', false);
        $('#section-title').editable('destroy');
        $('#course-title').editable('destroy');
    }
});

Template.courseToolbar.helpers({
    'editMode': function () {
        return Session.get('editMode');
    }
});
