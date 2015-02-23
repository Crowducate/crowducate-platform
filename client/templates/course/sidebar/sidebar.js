Template.courseSidebar.created = function () {
    /*
    Enable sidebar inline editors
    used in various child-template events
    such as template rendered, cancel edit, etc
    */
    this.enableSidebarInlineEditors = function () {
        // Course sections
        $('.section-title').editable(defaultEditableOptions);

        // Lesson titles
        $('.sidebar-lesson-title').editable(defaultEditableOptions);
    };

    /*
    Disable sidebar inline editors
    used in various child-template events
    such as template rendered, cancel edit, etc
    */
    this.disableSidebarInlineEditors = function () {
        //disables inline-editing
        $('.sidebar-lesson-title').editable('destroy');
        $('.section-title').editable('destroy');
        $('#course-title').editable('destroy');
        $('.courseinfo-text').editable('destroy');
    };
};

Template.courseSidebar.rendered = function () {
    // Get the template instance
    var instance = Template.instance();

    // Get the current router object
    var controller = Router.current();

    // Get course ID from router object
    var courseID = controller.params._id;

    /*
    Toggle inline editors when editing course
    */
    this.autorun(function () {
        if (Session.get('editingCourseID') === courseID) {
            instance.enableSidebarInlineEditors();
        } else {
            instance.disableSidebarInlineEditors();
        }
    });
};

Template.courseSidebar.helpers({
    /*
    Return true when editing the active course
    Used to display 'Add section' form
    */
    'editingThisCourse': function () {
        // return true if editing this course
        return (Session.get('editingCourseID') === this._id);
    }
});
