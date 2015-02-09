Template.testresourceToolbar.events({
    'click #edit-resource':function(event, template){
        Session.set('editMode', true);
    },
    'click #cancel-edit-resource':function(){
        Session.set('editMode', false);
    }
});

Template.testresourceToolbar.helpers({
    'editMode':function(){
        return Session.get('editMode');
    }
});
