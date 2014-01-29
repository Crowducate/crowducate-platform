Sections = new Meteor.Collection('sections');

Meteor.methods({
	addSection: function (sectionAttributes) {
		console.log('Method.addSection', sectionAttributes);
		var section = _.extend(_.pick(sectionAttributes, 'sectionTitle', 'courseId'));
    section.owner = Meteor.userId();
    console.log('section', section);
    var sectionId = Sections.insert(section);
		return sectionId;
	}
});