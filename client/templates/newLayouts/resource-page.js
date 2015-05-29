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
    var sortabledivs1 = document.getElementById('toolbar-components');
    var sortable = Sortable.create(sortabledivs1, {
        group: {
            name: 'sortabledivs1',
            pull: 'clone'
        },
        animation: 100,
        ghostClass: 'ghost'
    });

    var sortabledivs2 = document.getElementById('sortable-divs');
    var sortable = Sortable.create(sortabledivs2, {
        group: {
            name: 'sortabledivs2',
            put: ['sortabledivs1'],
        },
        animation: 100,
        ghostClass: 'ghost'
    });
}
