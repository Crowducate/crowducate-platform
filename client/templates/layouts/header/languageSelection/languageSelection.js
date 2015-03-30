Template._header.events({
    'change .language-selection': function(event) {
        var language = $(event.target).val();
        Session.set('locale', language);
    }

});
