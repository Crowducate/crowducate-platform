Template.courseToolbar.events({
    'click #edit-course':function(event, template){
        //Edit Mode is on
        Session.set('editMode', true);

        // Set edit mode reactive var to true
        editingCourse.set(true);

        // enable inline editors
        enableSidebarInlineEditors();
    },
    'click #save-course-edit': function () {
        //Edit Mode is off
        Session.set('editMode', false);

        // disaable sidebar inline editors
        disableSidebarInlineEditors();
    },
    'click #cancel-course-edit': function () {
        //confirmation alert
        //if yes,
        if (confirm('Are you sure you want to cancel, you will loose your last changes?')) {
            //revert changes: editMode is false
            Session.set('editMode', false);

            // set editing course to false
            editingCourse.set(false);

            // disable sidebar inline editors
            disableSidebarInlineEditors();

            //if no,
        } else {
            //do nothing set session true
            Session.set('editMode', true);
        }
    }
});

Template.courseToolbar.rendered = function () {
    if (Session.get('editMode')) {
        // Enable inline editors on sidebar items
        enableSidebarInlineEditors();
    }
};
