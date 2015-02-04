Meteor.startup(function() {
    if (Courses.find().count() === 0) {
        console.log("Adding default courses.");
        var defaultCourses = [
            {
                'title': 'Example content',
                'author': 'Illya Nziyev',
                'date': " 29 Tammi 2015",
                'description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue.",
                keywords: ['birds', 'bees', 'animals', 'insects'],
                sections: [
                    {
                        "title": "Birds",
                        "lessons": [
                            {
                                "title": "Nest building"
                            },
                            {
                                "title": "Feeding"
                            },
                            {
                                "title": "Flight"
                            }
                        ]
                    },
                    {
                        "title": "Bees",
                        "lessons": [
                            {
                                "title": "Hive building"
                            },
                            {
                                "title": "Brood"
                            }
                        ]
                    }
                ]
            }
        ];

        // Add default courses
        _.each(defaultCourses, function (course) {
            console.log("Adding course.");
            Courses.insert(course);
        })
    }
});
