Template.lecture.helpers({ 
  myLecture: function() {
    return this.course.owner == Meteor.userId(); 
  }
});  