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
