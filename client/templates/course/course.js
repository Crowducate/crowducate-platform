Template.course.rendered = function () {
    //modify inline editor buttons style
    $.fn.editableform.buttons =
        '<button type="submit" class="btn btn-success editable-submit btn-mini"><i class="fa fa-check"></i></button>' +
        '<button type="button" class="btn btn-danger editable-cancel"><i class="fa fa-times"></i></button>';

    /*
    Cancel lesson edit mode by
    setting reactive variable to false
    and removing rich text editor
    */
    lessonEditCleanup = function () {
        console.log("Cancel lesson edit.");
        // set the lesson edit mode to false
        editingLessonText.set(false);

        // Hide the rich text editor
        $('#rich-text-editor').destroy();

        // Empty the content returned by the rich text area
        // TODO: see if the destroy() method can return no text
        // this would make the code/cleanup a lot simpler
        $('#rich-text-editor').text('');
    }
}

/*
* Enable sidebar inline editors
* used in various child-template events
* such as template rendered, cancel edit, etc
*/
enableSidebarInlineEditors = function () {
    // TODO: see if reactive var editingCourse can be used here (reactive-vars.js)
    if (Session.get('editMode')) {
        //enable inline-editing

        // Course sections
        $('.section-title').editable(defaultEditableOptions);

        // Lesson titles
        $('.sidebar-lesson-title').editable(defaultEditableOptions);

        // Course title
        $('#course-title').editable();

        // Course info
        $('.courseinfo-text').editable({
            title: 'Edit course info',
            rows: 10,
            showbuttons: 'bottom',
            'mode': 'inline'
        });
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
    $('.courseinfo-text').editable('destroy');
};

// set default options for x-editable inline editors
var defaultEditableOptions = {
    // Make sure text doesn't display twice after saving
    // since title will update reactively from database
    display: false
};
