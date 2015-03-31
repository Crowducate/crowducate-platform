Template._header.events({
    'change .language-selection': function(event) {
        // find option in selection by its value e.g., en, ru, fi
        var language = $(event.target).val();
        // set language to selected option
        Session.set('locale', language);
    }

});
