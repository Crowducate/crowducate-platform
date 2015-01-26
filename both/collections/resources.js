Resources = new Mongo.Collection('resources');

Resources.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    }
});
