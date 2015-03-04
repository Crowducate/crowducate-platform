Template.courseInfo.rendered = function(){

    // Get the template instance
    var instance = Template.instance();

    // Get the current router object
    var controller = Router.current();

    // Get course ID from router object
    var courseID = controller.params._id;


        /*
    Enable course description inline editor
    */
    this.enableCourseInfoInlineEditor = function () {
        // Course description
        $('.courseinfo-text').editable({
            // Don't display updated text
            // prevents duplicate text
            display: false,
            mode: 'inline',
            rows: 10,
            showbuttons: 'bottom'
        });

    };


        /*
    Disable course description inline editor
    */
    this.disableCourseInfoInlineEditor = function () {
        // Course description
        $('.courseinfo-text').editable('destroy');

    };

        /*
    Toggle inline editors when editing course
    */
    this.autorun(function () {
        if (Session.get('editingCourseID') === courseID) {
            instance.enableCourseInfoInlineEditor();
        } else {
            instance.disableCourseInfoInlineEditor();
        }
    });
};

Template.courseInfo.events({
    /*
    Update course description when editable is submitted
    */
    'click .editable-submit': function (event, template) {
        // Get the new course description from template
        var newCourseInfo = template.find('textarea').value;

        // Get course ID from parent template data
        var courseID = Template.parentData()._id;

        // Update course description
        Courses.update(courseID, {$set: {'about': newCourseInfo}});
    },
});
