Template.sectionLesson.helpers({

});

Template.sectionLesson.events({
    'click .sidebar-lesson-title': function (event) {
        event.preventDefault();

        // set active lesson ID reactive variable
        activeLessonID.set(this._id);
    },
    'click .editable-submit': function (event, template) {
        // Get the value of the inline editor
        var newName = template.find('input').value;

        // update the lesson in database
        Lessons.update(this._id, {$set: {'name': newName}});
    }
});

Template.sectionLesson.rendered = function () {
    // enable sitebar inline editors
    enableSidebarInlineEditors();
}
