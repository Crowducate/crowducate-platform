Meteor.publish('lessons', function () {
    return Lessons.find();
});

// TODO: create a publication returning only lessons for one course ID
//Meteor.publish('courseLessons', function (courseID) {
//    var course = Courses.find(courseID).fetch();
//
//    // placeholder array for lesson IDs
//    // to be used in lessons query
//    var lessonIDsQuery = [];
//
//    // iterate through the sections
//    // in each section append the lessonIDs to lessonIDsQuery
//    _.each(course.sections, function (section) {
//        console.log(section.title);
//        // Iterate through all lessionIDs
//        _.each(section.lessonIDs, function (lessonID) {
//            // add lesson ID to query array
//            console.log(lessonID);
//            lessonIDsQuery.push(lessonID);
//        });
//    });
//
//    console.log(lessonIDsQuery);
//
//    // Get all course lessons from database
//    return Lessons.find({_id: {$in: lessonIDsQuery}});
//});
