Template.courseCard.helpers({
    'truncateKeywords': function (truncate, keywords) {
        /*
        Truncate keywords to a set limit
        Return an object with three attributes
            truncated keywords - array of keywords up to truncate limit
            remaining keywords - array of keywords excluded by truncate
            count of remaining keywords - numeric count of keywords excluded by truncate
        */
        var truncatedKeywordsObject = {
            'truncatedKeywords': keywords.slice(0, truncate),
            'remainingKeywords': keywords.slice(truncate),
            'remainingKeywordCount': keywords.length - truncate
        };

        return truncatedKeywordsObject;
    }
});
