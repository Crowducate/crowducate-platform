var courseTitleFocusVar = new ReactiveVar(false);

Template.lesson.helpers({
    editClass: function(){
        if (Session.get('editMode')) {
            return 'course-page-content-edit';
        }
    },
    'contentEditable': function () {
        if (Session.get('editMode')) {
            console.log("Content editable");
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
        console.log("Course title focus.");
        courseTitleFocusVar.set(true);
    },
    'blur #course-title': function (event, template) {
        console.log("Course title blur.");
        courseTitleFocusVar.set(false);
    }
});
