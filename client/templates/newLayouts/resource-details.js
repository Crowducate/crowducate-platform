Template.testresourceDetails.helpers({
    editClass: function(){
        if (Session.get('editMode')) {
            return 'resource-page-content-edit';
        }
    }
});

Template.testresourceDetails.rendered = function(){
    // if editMode is on
    var sortablediv = document.getElementById('sortable-divs');
    var sortable = Sortable.create(sortablediv, {
        animation: 100,
        ghostClass: 'ghost'
    });
}


