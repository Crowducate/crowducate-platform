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
     $.fn.editable.defaults.mode = 'inline';
}
