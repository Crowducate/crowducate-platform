Meteor.startup(function () {
  //Generate some placeholders if the database is empty
  if (Courses.find().count() === 0) {
    Courses.insert({
      courseTitle: "Analysis",
      subtitle: "A gentle introduction to analysis.",
      category: "Math/Science",
      keywords: ["Analysis", "High School", "Beginner"],
      age: "15+"
    });
    Courses.insert({
      courseTitle: "Inorganic Chemistry",
      subtitle: "A gentle introduction to inorganic chemistry.",
      category: "Math/Science",
      keywords: ["Chemistry", "University", "Beginner"],
      age: "18+"
    });
    Courses.insert({
      courseTitle: "Entrepreneurship 101",
      subtitle: "A gentle introduction to the theory and practice of entrepreneurship.",
      category: "Business Management",
      keywords: ["Analysis", "University", "Beginner"],
      age: "18+"
    });
  }
});