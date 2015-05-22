Courses = new Mongo.Collection("courses");

Courses.helpers({
  'sections': function () {
    // Get all sections related to the current course
    return Sections.find({ '_id': { $in: this.sectionIDs }});
  },
  'lessons': function () {
    // return all lessons related to course
    return Lessons.find({'courseIDs': this._id});
  },
  'coverImage': function() {
    // Get the cover image from Images collection
    return image = Images.findOne(this.coverImageId);
  }
});

// During the course creation add user id and a date stamp with dateCreated.
Courses.before.insert(function (userId, document) {
  document.createdById = userId;
  document.dateCreated = new Date();
});
