Template.courseInfo.created = function () {
    /*
    Add inline editors to course info page elements
    */
    this.enableCourseInfoInlineEditors = function () {
        // Course title
        $('#course-title').editable();

        // Course info
        $('.courseinfo-text').editable({
            title: 'Edit course info',
            rows: 10,
            showbuttons: 'bottom',
            'mode': 'inline'
        });
    };

    /*
    Remove inline editors from course info page elements
    */
    this.disableCourseInfoInlineEditors = function () {
        // Course title
        $('#course-title').editable('destroy');

        // Course text
        $('.courseinfo-text').editable('destroy');
    }
};

Template.courseInfo.rendered = function () {
    // Get the template instance
    var instance = Template.instance();

    // Get the current router object
    var controller = Router.current();

    // Get course ID from router object
    var courseID = controller.params._id;

    this.autorun(function () {
        // If editing course, show inline editors
        // otherwise, make sure inline editors are disabled
        if (Session.get('editingCourseID') === courseID) {
            instance.enableCourseInfoInlineEditors();
        } else {
            instance.disableCourseInfoInlineEditors();
        }
    });
};
