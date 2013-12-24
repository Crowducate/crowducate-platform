Meteor.startup(function () {
  //Generate some placeholders if the database is empty
  if (Courses.find().count() === 0) {
    Courses.insert({
      course: "Analysis",
      subject: "Math",
      age: "Age: 15-16"
    });
    Courses.insert({
      course: "Anorganic Chemistry",
      subject: "Chemistry",
      age: "Age: 18+"
    });
    Courses.insert({
      course: "Entrepreneurship 101",
      subject: "Business Management",
      age: "Age: 18+"
    });
  }
});