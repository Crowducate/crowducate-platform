
var addQuestionFormHooks = {
    before: {
        method: function(doc, params){
            console.log("before hooks");
            console.log(doc)
            console.log(Session.get("currentQuestionToBuild"));
            var editedQuestion = Session.get("currentQuestionToBuild");
            editedQuestion.title = doc.title;
            editedQuestion.description = doc.description;

            return editedQuestion;
        }
    },
    onSuccess: function(operation, result, template) {

        //clear the session cache of the currently edited question
        Session.set("currentQuestionToBuild", null)
        return sAlert.success("question added");
    },
    onError: function(operation, error, template) {
        return sAlert.error(error);
    },
}


AutoForm.addHooks('addQuestionForm', addQuestionFormHooks);