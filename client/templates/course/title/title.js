Template.courseTitle.rendered = function(){

    // Get the template instance
    var instance = Template.instance();

    // Get the current router object
    var controller = Router.current();

    // Get course ID from router object
    var courseID = controller.params._id;

    /*
    Enable course title inline editor
    */
    this.enableTitleInlineEditor = function () {
        // Title
        $('#course-title').editable({
            // Don't display updated text
            // prevents duplicate text
            display: false,
            mode: 'inline'
        });

    };

    /*
    Disable course title inline editor
    */
    this.disableTitleInlineEditor = function () {
        // Course title
        $('#course-title').editable('destroy');

    };

        /*
    Toggle inline editors when editing course
    */
    this.autorun(function () {
        if (Session.get('editingCourseID') === courseID) {
            instance.enableTitleInlineEditor();
        } else {
            instance.disableTitleInlineEditor();
        }
    });
}

Template.courseTitle.events({
    /*
    Update section title when editable is submitted
    */
    'click .editable-submit': function (event, template) {
        // Get the new section title from template
        var newCourseTitle = template.find('input').value;

        // Get course ID from parent template data
        var courseID = Template.parentData()._id;

        // Update course sections
        Courses.update(courseID, {$set: {'title': newCourseTitle}});
    },
});

