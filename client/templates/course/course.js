//Template.course.events({
//    'click  #edit-course': function () {
//        // set edit mode variable to true
//    },
//    'click #cancel-course-edit': function () {
//        // set edit mode variable to false
//    }
//});

Template.course.rendered = function () {
    // set default mode for x-editable
    //$.fn.editable.defaults.mode = 'inline';
    //modify buttons style
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
    //enables inline-editing
    //TODO: think about better place
    $('.lesson-link').editable({
        // Make sure text doesn't display twice after saving
        display: false
    });
    $('.section-title').editable();
    $('#course-title').editable();
};

/*
* Disable sidebar inline editors
* used in various child-template events
* such as template rendered, cancel edit, etc
*/
disableSidebarInlineEditors = function () {
    //disables inline-editing
    $('.lesson-link').editable('destroy');
    $('.section-title').editable('destroy');
    $('#course-title').editable('destroy');
};
