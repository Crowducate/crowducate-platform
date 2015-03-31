Template.licenseIcon.helpers({
    'iconUrl': function () {
        // get the icon name
        // icon name is passed in as a data context object
        // needs to be converted into string
        var iconName = this.name;

        // base URL for all icons
        var iconBaseUrl = 'http://creativecommons.org/wp-content/themes/creativecommons.org/images/'

        // Create license icon filename variable
        var iconFileName;

        switch (iconName) {
            case 'creative-commons':
                iconFileName = 'chooser_cc.png';
                break;
            case 'free-culture-approved':
                iconFileName = 'fc_approved_tiny.png';
                break;
            case 'attribution':
                iconFileName = 'chooser_by.png';
                break;
            case 'share-alike':
                iconFileName = 'chooser_sa.png';
                break;
            case 'noncommercial':
                iconFileName = 'chooser_nc.png';
                break;
            case 'no-adaptations':
                iconFileName = 'chooser_nd.png';
                break;
        }

        // Combine the base url and filename
        return iconBaseUrl + iconFileName;
    }
});
