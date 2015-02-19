Template.doneEditingCourse.events({
    'click #done-editing-course': function () {
        //Edit Mode is off
        Session.set('editMode', false);

        // disaable sidebar inline editors
        disableSidebarInlineEditors();
    },
});
