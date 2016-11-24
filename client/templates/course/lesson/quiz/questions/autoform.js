
var addQuestionFormHooks = {
    before: {
        method: function(doc, params){
            var editedQuestion = Session.get("currentQuestionToBuild");
            editedQuestion.title = doc.title;
            editedQuestion.description = doc.description;
            return editedQuestion;
        }
    },
    onSuccess: function(operation, result, template) {

        //clear the session cache of the currently edited question
        Session.set("currentQuestionToBuild", undefined);
        Session.set("currentQuestionTypeChanged", undefined);
        delete Session.keys["currentQuestionToBuild"];
        delete Session.keys["currentQuestionTypeChanged"];
        return sAlert.success("question added");
    },
    onError: function(operation, error, template) {
        return sAlert.error(error);
    },
}


AutoForm.addHooks('addQuestionForm', addQuestionFormHooks);