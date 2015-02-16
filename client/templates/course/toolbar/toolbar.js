Template.courseToolbar.events({
    'click #edit-course':function(event, template){
        //Edit Mode is on
        Session.set('editMode', true);

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

var enableSidebarInlineEditors = function () {
    //enables inline-editing
    //TODO: think about better place
    $('.lesson-link').editable({
        // Make sure text doesn't display twice after saving
        display: false
    });
    $('.section-title').editable();
    $('#course-title').editable();
};

var disableSidebarInlineEditors = function () {
    //disables inline-editing
    $('.lesson-link').editable('destroy');
    $('.section-title').editable('destroy');
    $('#course-title').editable('destroy');
};
