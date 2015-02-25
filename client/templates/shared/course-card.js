Template.courseCard.helpers({
    'truncateKeywords': function (keywords, truncate) {
        console.og("truncateKeywords");
        console.log("Keywords:", keywords);
        console.log("Truncate", truncate);
        return keywords.slice(0, truncate);
    },
    'remainingKeywords': function (keywords, truncate) {
        console.og("remainingKeywords");
        console.log("Keywords:", keywords);
        console.log("Truncate", truncate);
        return keywords.slice(truncate);
    },
    'remainingCount': function (keywords, truncate) {
        console.og("remainingCount");
        console.log("Keywords:", keywords);
        console.log("Truncate", truncate);
        return keywords.length - truncate;
    }
});
