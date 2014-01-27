if (Meteor.isClient) {
  //Render out the list of courses using the template
  Template.content.courses = function () {
       return Courses.find({}); 
   };  

   Template.content.ownCourses = function () {
      return Courses.find({owner: Meteor.userId()});
   };
 }