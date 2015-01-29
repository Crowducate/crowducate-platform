Template.resourceToolbar.events({
'click #edit-resource':function(event, template){
    Session.set('editMode', true);
}
});

Template.resourceToolbar.helpers({
    'editMode':function(){
        return Session.get('editMode');
    }
});
