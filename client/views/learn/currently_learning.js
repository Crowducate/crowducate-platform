Template.currentCurriculum.helpers({
  sectionsLectures: function(){
    console.log('sectionsLectures', this);
    return Lectures.find({sectionId: this._id});
  },
  test: function(){
    console.log('test', this);
  }
});