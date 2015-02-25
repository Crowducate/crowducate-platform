Template.courseCard.helpers({
    'truncateKeywords': function (truncate, keywords) {
        /*
        Truncate keywords to a set limit
        Return an object with three attributes
            truncated keywords
            remaining keywords
            count of remaining keywords
        */
        var truncatedKeywordsObject = {
            // get the first keywords up to the truncate limit
            'truncatedKeywords': keywords.slice(0, truncate),

            // get the last keywords starting from the truncate point
            'remainingKeywords': keywords.slice(truncate),

            // subtract the truncate value from the keywords length
            'remainingKeywordCount': keywords.length - truncate
        };

        return truncatedKeywordsObject;
    }
});
