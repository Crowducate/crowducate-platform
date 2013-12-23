Courses = new Meteor.Collection('courses'); 


Router.configure({
  layout: 'layout',
  loadingTemplate: 'loading',
  notFoundtemplate: 'notFound', 
});

Router.map( function () {
  this.route('home', {
    template: 'home',
    path: '/'
  });

  this.route('signedin', {
    template: 'signedin',
    path: '/signedin'
  });

  this.route('basicinfo', {
    template: 'basicinfo',
    path: '/basicinfo'
  });

  this.route('curriculum', {
    template: 'curriculum',
    path: '/curriculum'
  });
});

if (Meteor.isClient) {
  //Render out the list of courses using the template
  Template.content.courses = function () {
       return Courses.find({}); 
   };  

   //Events for the form
   Template.newcourseform.events({
      'click submit': function() {
          //TODO add validation!

          var formcontents = {};
          //Serialize the input values from the form
          //This works because the input names match the
          //database field names.
          $.each($('#addcourse').serializeArray(), function() {
              formcontents[this.name] = this.value;
          });
 
          //Pass the serialized values into a new database record
          Courses.insert(formcontents, function(err) {
              if(!err) {
                  console.log("Successfully added new course to database.");
                  //$('#addcourse')[0].reset(); //Reset the form with blank inputs
              } else {
                  alert("Failed to add course to database.");
                  console.log(err);
              }
            });
          }
        });  
      }

if (Meteor.isServer) {
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
}
