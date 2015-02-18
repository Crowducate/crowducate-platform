// keep track of whether user is editing the lesson text
// Used in child templates such as lesson and sidebar
editingLessonText = new ReactiveVar(false);

Template.course.rendered = function () {
    // set default mode for x-editable
    //$.fn.editable.defaults.mode = 'inline';

    //modify inline editor buttons style
    $.fn.editableform.buttons =
        '<button type="submit" class="btn btn-success editable-submit btn-mini"><i class="fa fa-check"></i></button>' +
        '<button type="button" class="btn btn-danger editable-cancel"><i class="fa fa-times"></i></button>';
}

/*
* Enable sidebar inline editors
* used in various child-template events
* such as template rendered, cancel edit, etc
*/
enableSidebarInlineEditors = function () {
    if (Session.get('editMode')) {
        //enables inline-editing
        $('.sidebar-lesson-title').editable({
            // Make sure text doesn't display twice after saving
            // since title will update reactively from database
            display: false
        });
        $('.section-title').editable({
            // Make sure text doesn't display twice after saving
            // since title will update reactively from database
            display: false
        });
        $('#course-title').editable();
    }
};

/*
* Disable sidebar inline editors
* used in various child-template events
* such as template rendered, cancel edit, etc
*/
disableSidebarInlineEditors = function () {
    //disables inline-editing
    $('.sidebar-lesson-title').editable('destroy');
    $('.section-title').editable('destroy');
    $('#course-title').editable('destroy');
};
