Template.courseTitle.created = function () {
    // Create new reactive variable for course edit state
    this.editingCourseVar = new ReactiveVar(false);

    // Get the current router
    controller = Router.current();

    // Get current course from router
    currentCourseId = controller.params._id;

    /*
    * when user is editing the active course,
    * set the value of a reactive variable (true/false)
    * Used to show/hide wysiwyg editor.
    */
    this.autorun(function () {
        var instance = Template.instance();

        // Update course edit variable when editing course
        if (currentCourseId === Session.get('editingCourseID')) {
            instance.editingCourseVar.set(true);
        } else {
            instance.editingCourseVar.set(false);
        };
    });
};
Template.courseTitle.helpers({
    'editingCourse': function () {
        // Get template instance
        var instance = Template.instance();

        // Keep track of whether user is editing course
        return instance.editingCourseVar.get();
    }
});
