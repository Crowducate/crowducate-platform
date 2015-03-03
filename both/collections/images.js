
// Create images filestore
var imageFilesystemStorage = new FS.Store.FileSystem("images", {path: "images"});

// Create images collection
Images = new FS.Collection("images", {
    stores: [imageFilesystemStorage]
});
