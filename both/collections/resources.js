Resources = new Mongo.Collection('resources');

Resources.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    keywords: {
        type: [String],
        label: "Keywords"
    },
    published: {
        type: Boolean,
        label: "Published"
    }
});
