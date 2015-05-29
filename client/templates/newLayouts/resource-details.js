Template.testresourceDetails.helpers({
    editClass: function(){
        if (Session.get('editMode')) {
            return 'resource-page-content-edit';
        }
    }
});
