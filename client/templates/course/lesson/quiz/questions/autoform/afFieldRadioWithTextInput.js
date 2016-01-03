AutoForm.addInputType("radio-with-text-input", {
    template: "afFieldRadioWithTextInput",
    valueOut: function(){
        console.log("from the custom template this ; ");
        console.log(this);
        return "some string";
    },

    valueIn: function(val){

        for (var i in val){
            val[i].title = val[i].title + " _append";
        }
        return val;
    },
    contextAdjust: function(context){

        console.log(" ---- context");
        console.log(context);
        return context;
    }
})