Router.map(function() {

    this.route('home', {
        path: '/'
    });

    this.route('dashboard', {
        path: '/dashboard',
        loginRequired: 'entrySignIn',
        waitOn: function() {
            return this.subscribe("items");
        },
        data: {
            items: Items.find({})
        },
        onAfterAction: function() {
            SEO.set({
                title: 'Dashboard | ' + SEO.settings.title
            });
        }
    });

    this.route('teach', {
        path: '/teach',
        loginRequired: 'entrySignIn',
        //        waitOn: function() {
        //            return this.subscribe("items");
        //        },
        //        data: {
        //            items: Items.find({})
        //        },
        onAfterAction: function() {
            SEO.set({
                title: 'Teach | ' + SEO.settings.title
            });
        }
    });

    this.route('learn', {
        path: '/learn',
        loginRequired: 'entrySignIn',
        //                waitOn: function() {
        //                    return this.subscribe("items");
        //                },
        data: {
            resources: [
                { title: "Title 1", description: "Descr 1", progress: "10%", author: "Smb1", editors: "1" },
                { title: "Title 2", description: "Descr 2", progress: "20%", author: "Smb2", editors: "2" },
                { title: "Title 3", description: "Descr 3", progress: "30%", author: "Smb3", editors: "3" },
                { title: "Title 4", description: "Descr 4", progress: "40%", author: "Smb4", editors: "4" },
                { title: "Title 5", description: "Descr 5", progress: "50%", author: "Smb5", editors: "5" }
            ]
        },
        onAfterAction: function() {
            SEO.set({
                title: 'Learn | ' + SEO.settings.title
            });
        }
    });

    this.route('profile', {
        path: '/profile',
        data: function() {
            return Meteor.user();
        }
    });

    this.route('notFound', {
        path: '*',
        where: 'server',
        action: function() {
            this.response.statusCode = 404;
            this.response.end(Handlebars.templates['404']());
        }
    });

});
