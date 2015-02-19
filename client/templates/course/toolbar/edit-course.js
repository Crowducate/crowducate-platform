Template.editCourse.events({
    'click #edit-course':function(event, template){
        //Edit Mode is on
        // TODO: refactor this to use course ID and remove
        Session.set('editMode', true);

        // set editing course session variable to this course id
        Session.set('editingCourse', this._id);

        // **not currently used**
        // Set edit mode reactive var to true
        // TODO: see if reactive vars can be shared between parent and child template instances
        //editingCourse.set(true);

        // enable inline editors
        // TODO: move this into the sidebar
        // in a reactive function that depends on
        // either session variable or shared reactive variable
        // Tracker.autorun?
        enableSidebarInlineEditors();
    }
});
