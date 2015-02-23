Template.doneEditingCourse.events({
    'click #done-editing-course': function () {
        // Clear editing course ID session variable
        Session.set('editingCourseID', undefined);

        // Remove inline editors from course sidebar elements
        Template.instance().destroySidebarInlineEditors();
    },
});

Template.doneEditingCourse.created = function () {
    /*
    Disable sidebar inline editors
    used in various child-template events
    such as template rendered, cancel edit, etc
    */
    this.destroySidebarInlineEditors = function () {
        // Lesson titles
        $('.sidebar-lesson-title').editable('destroy');

        // Section titles
        $('.section-title').editable('destroy');
    };
};
