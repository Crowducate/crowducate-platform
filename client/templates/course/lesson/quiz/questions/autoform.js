var addQuestionFormHooks = {

    before: {
        method: function(doc){
            doc.quizId = Template.parentData().activeQuiz._id;
            doc.id = Random.id();

            if (doc.questionType == QuizOptions.TRUE_OR_FALSE){
                doc.optionTitles = ["True", "False"];
            }
            return doc;
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
};

var addSingleAnswerFormHooks = {
    before: {
        method: function(doc, params){
            doc.quizId = Template.parentData().activeQuiz._id;
            doc.id = Random.id();

            console.log("before hooks");
            console.log(doc);
            console.log(Template.currentData());
            return doc;
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
AutoForm.addHooks('addSingleAnswerQuestionForm', addSingleAnswerFormHooks);