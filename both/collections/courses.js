Courses = new Mongo.Collection("courses");

Courses.helpers({
    'lessons': function () {
        // return all lessons related to course
        return Lessons.find({'courseIDs': this._id});
    }
});
