var courseTitleFocusVar = new ReactiveVar(false);

Template.lesson.helpers({
    editClass: function(){
        if (Session.get('editMode')) {
            return 'course-page-content-edit';
        }
    },
    'contentEditable': function () {
        // Return the value of the edit mode session variable
        // this will reflect in the editmode HTML tag(s)
        return Session.get('editMode');
    },
    'courseTitleFocus': function () {
        // Get the value of reactive var
        return courseTitleFocusVar.get();;
    }
});

Template.lesson.events({
    'focus #course-title': function (event, template) {
        // set variable to indicate title has focus
        courseTitleFocusVar.set(true);
    },
    'blur #course-title': function (event, template) {
        // indicate title has lost focus
        courseTitleFocusVar.set(false);

        // Get course ID from template
        var courseId = this._id;

        // Get the course name from the page element
        var title = $("#course-title").text();

        // Update the course in database
       Courses.update(courseId, {$set: {title: title}});
    }
});
