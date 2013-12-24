


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