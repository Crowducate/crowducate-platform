Template.section.helpers({
  'sectionLectures': function(){
    console.log('sectionLectures', this);
    return Lectures.find({sectionId: this._id});
  }
});

Template.addLectureModal.events({
  'submit form': function(e, template){
    e.preventDefault();

    // is the section
    console.log('addLectureModal', this, template.data);
    
    var lecture = {
      lectureTitle: $(e.target).find('[name="lectureTitle"]').val(),
      courseId: template.data.courseId,
      sectionId: template.data._id
    };

    Meteor.call('addLecture', lecture, function(error, id) {
      if (error)
        return alert(error.reason);
      $('.modal').modal('hide');
    });

  }
});

Template.section.helpers({ 
  myCourse: function() {
    return this.course.owner == Meteor.userId(); 
  }
});