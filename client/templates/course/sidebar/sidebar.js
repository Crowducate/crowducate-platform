Template.courseSidebar.created = function () {

    /*
    Define inline editor functions
    used to activate various inline editors
    TODO: call these from tracker function, or similar
    */

    /*
    Enable sidebar inline editors
    used in various child-template events
    such as template rendered, cancel edit, etc
    */
    enableSidebarInlineEditors = function () {
        // TODO: see if reactive var editingCourse can be used here (reactive-vars.js)
        if (Session.get('editMode')) {
            //enable inline-editing

            // Course sections
            $('.section-title').editable(defaultEditableOptions);

            // Lesson titles
            $('.sidebar-lesson-title').editable(defaultEditableOptions);

            // Course title
            $('#course-title').editable();

            // Course info
            $('.courseinfo-text').editable({
                title: 'Edit course info',
                rows: 10,
                showbuttons: 'bottom',
                'mode': 'inline'
            });
        }
    };

    /*
    Disable sidebar inline editors
    used in various child-template events
    such as template rendered, cancel edit, etc
    */
    disableSidebarInlineEditors = function () {
        //disables inline-editing
        $('.sidebar-lesson-title').editable('destroy');
        $('.section-title').editable('destroy');
        $('#course-title').editable('destroy');
        $('.courseinfo-text').editable('destroy');
    };
};
