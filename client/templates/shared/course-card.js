Template.courseCard.helpers({
    'truncateKeywords': function (keywords, truncate) {
        // return the first keywords to the truncate limit
        return keywords.slice(0, truncate);
    },
    'remainingKeywords': function (keywords, truncate) {
        // return the last keywords starting from the truncate point
        return keywords.slice(truncate);
    },
    'remainingCount': function (keywords, truncate) {
        // subtract the truncate value from the keywords length
        return keywords.length - truncate;
    }
});
