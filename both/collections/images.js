var imageFilesystemStorage = new FS.Store.FileSystem("images", {path: "images"});
Images = new FS.Collection("images", {
    stores: [imageFilesystemStorage]
});
