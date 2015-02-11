Template.testsingleResourcePage.events({
    'click  #edit-resource': function () {
        // in edit mode,
        // add rich text editor
        if (Session.get('editMode')) {
            $('.resource-page-content').summernote();
        }
    },
    'click #cancel-edit-resource': function () {
        // not in edit mode,
        // remove rich text editor
        if (!Session.get('editMode')) {
            $('.resource-page-content').destroy();
        }
    }
});


//drag and drop base
Template.testresourceDetails.rendered = function(){
    // if editMode is on
    var sortablediv = document.getElementById('toolbar-components');
    var sortable = Sortable.create(sortablediv, {
        group: {
            name: 'sortablediv',
            pull: 'clone'
        },
        animation: 100,
        ghostClass: 'ghost'
    });

    var sortablediv2 = document.getElementById('sortable-divs');
    console.log(sortablediv2);
    var sortable = Sortable.create(sortablediv2, {
        group: {
            name: 'sortabledivs',
            put: ['sortablediv'],
        },
        animation: 100,
        ghostClass: 'ghost'
    });
}
