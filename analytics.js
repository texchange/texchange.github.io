var db = new Firebase('https://texchangedb.firebaseio.com/');

var insertAnalytics = function insertAnalytics(analytics, suffix) {
    document.getElementById('pageviews-' + suffix).innerText = analytics.pageViews || 0;
    document.getElementById('interested-' + suffix).innerText = analytics.interested || 0;
    document.getElementById('interested-rate-' + suffix).innerText = (analytics.interested || 0) / (analytics.pageViews || 0) * 100 + '%';
    document.getElementById('emails-' + suffix).innerText = Object.keys(analytics.emails || {}).length;
    document.getElementById('conversion-rate-' + suffix).innerText = Object.keys(analytics.emails || {}).length / (analytics.pageViews || 0) * 100 + '%';
};

db.child('a').once('value', function (data) {
    insertAnalytics(data.val(), 'a');
});

db.child('b').once('value', function (data) {
    insertAnalytics(data.val(), 'b');
});