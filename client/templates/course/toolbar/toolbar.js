Template.courseToolbar.rendered = function () {
    if (Session.get('editMode')) {
        // Enable inline editors on sidebar items
        enableSidebarInlineEditors();
    }
};
