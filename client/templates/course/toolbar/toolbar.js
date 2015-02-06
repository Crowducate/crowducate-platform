Template.courseToolbar.events({
    'click #edit-course':function(event, template){
        Session.set('editMode', true);
    },
    'click #cancel-edit-resource':function(){
        Session.set('editMode', false);
    }
});

Template.courseToolbar.helpers({
    'editMode':function(){
        return Session.get('editMode');
    }
});
