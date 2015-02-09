var courseTitleFocusVar = new ReactiveVar(false);

Template.lesson.helpers({
    editClass: function(){
        if (Session.get('editMode')) {
            return 'course-page-content-edit';
        }
    },
    'contentEditable': function () {
        if (Session.get('editMode')) {
            return true;
        } else {
            return false;
        }
    },
    'courseTitleFocus': function () {
        return courseTitleFocusVar.get();
    }
});

Template.lesson.events({
    'focus #course-title': function (event, template) {
        courseTitleFocusVar.set(true);
    },
    'blur #course-title': function (event, template) {
        courseTitleFocusVar.set(false);
    }
});
