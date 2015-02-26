Template.courseLessonTitle.rendered = function () {
    /*
    Enable sidebar inline editors
    */
    this.enableLessonInlineEditors = function () {
        // Get the lesson ID from reactive var
        var lessonID = activeLessonID.get();

        // Get the lesson from DB
        var lesson = Lessons.findOne({_id: lessonID});

        var lessonTitleEditableOptions = {
            // Don't display updated text
            // prevents duplicate text
            display: false,
            value: lesson.name,
            success: function(response, newValue) {console.log(newValue)}
        };

        // Course sections
        $('.lesson-title').editable(lessonTitleEditableOptions);
    };

    /*
        Disable lesson inline editor(s)
        */
    this.disableLessonInlineEditors = function () {
        // Course sections
        $('.lesson-title').editable('destroy');
    };


    /*
    Auto-toggle inline editors when editing course
    */
    this.autorun(function () {
        // Get the template instance
        var instance = Template.instance();

        // Get the current router object
        var controller = Router.current();

        // Get course ID from router object
        var courseID = controller.params._id;

        // Get the lesson ID from reactive var
        var lessonID = activeLessonID.get();

        // Make sure editing active course
        // also, lesson should be active
        if (Session.get('editingCourseID') === courseID && lessonID) {
            // Disable inline editor
            // to clear previous text (fixes bug)
            instance.disableLessonInlineEditors();

            // Enable inline editor
            instance.enableLessonInlineEditors();
        } else {
            // Disable inline editor
            instance.disableLessonInlineEditors();
        }
    });
};
