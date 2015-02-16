Template.courseToolbar.events({
    'click #edit-course':function(event, template){
        //Edit Mode is on
        Session.set('editMode', true);
        //enables inline-editing
        //TODO: think about better place
        $('.lesson-link').editable({
            // Make sure text doesn't display twice after saving
            display: false
        });
        $('.section-title').editable();
        $('#course-title').editable();
    },
    'click #save-course-edit': function () {
        //Edit Mode is off
        Session.set('editMode', false);
        //disables inline-editing
        $('.lesson-link').editable('destroy');
        $('#section-title').editable('destroy');
        $('#course-title').editable('destroy');
    },
    'click #cancel-course-edit': function () {
        //confirmation alert
        //if yes,
        if (confirm('Are you sure you want to cancel, you will loose your last changes?')) {
            //revert changes: editMode is false
            Session.set('editMode', false);
            //clear entered data into rich-text-editor
            //clear entered data into x-editable fields
            //disables inline-editing
            $('.lesson-link').editable('disable');
            $('.lesson-link').editable('destroy');
            $('#section-title').editable('destroy');
            $('#course-title').editable('destroy');
            //if no,
        } else {
            //do nothing set session true
            Session.set('editMode', true);
        }
    }
});
