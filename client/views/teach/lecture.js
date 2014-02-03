Template.lecture.helpers({ 
  myLecture: function() {
    console.log('myLecture', this);
    return this.owner == Meteor.userId(); 
  }
});  