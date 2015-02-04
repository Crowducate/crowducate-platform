Template.resourceToolbar.events({
    'click #edit-resource':function(event, template){
        Session.set('editMode', true);
    },
    'click #cancel-edit-resource':function(){
        Session.set('editMode', false);
    }
});

Template.resourceToolbar.helpers({
    'editMode':function(){
        return Session.get('editMode');
    }
});
