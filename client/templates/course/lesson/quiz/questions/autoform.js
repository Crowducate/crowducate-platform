var addQuestionFormHooks = {
    onSuccess: function(operation, result, template) {

        //clear the session cache of the currently edited question
        Session.set("currentQuestionToBuild", null)
        return sAlert.success("question added");
    },
    onError: function(operation, error, template) {
        return sAlert.error(error);
    },
};


AutoForm.addHooks('addQuestionForm', addQuestionFormHooks);