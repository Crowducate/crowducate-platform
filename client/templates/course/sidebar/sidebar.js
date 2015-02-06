Template.courseSidebar.helpers({
    'sections': function () {
        // create a reactive variable based on the template data
        sections = new ReactiveVar(this.sections);

        // return the reactive variable
        return sections.get();
    }
});
