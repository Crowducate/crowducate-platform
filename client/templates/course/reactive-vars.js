Template.course.created = function () {
    // keep track of whether user is editing the lesson text
    // Used in child templates such as lesson and sidebar
    editingLessonText = new ReactiveVar(false);

    // Set the empty active lesson ID variable
    activeLessonID = new ReactiveVar();
}
