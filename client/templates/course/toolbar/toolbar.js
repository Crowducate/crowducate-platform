Template.courseToolbar.events({
    'click #edit-course':function(event, template){
        Session.set('editMode', true);
        $.fn.editable.defaults.mode = 'inline';
        $('.lesson-link').editable();
        $('#section-title').editable();
    },
    'click #cancel-edit-course': function () {
        Session.set('editMode', false);
        $('#section-title').editable('destroy');
    }
});

Template.courseToolbar.helpers({
    'editMode': function () {
        return Session.get('editMode');
    }
});
