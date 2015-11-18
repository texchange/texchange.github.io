// A/B Testing
var VERSION = document.getElementById('version').innerText;

// index.js
if (!~window.location.search.indexOf('dnt')) {
    console.log('Logging analytics...');
    var db = new Firebase('https://texchangedb.firebaseio.com/');

    var gotoThanks = function () {
        window.location.replace('./thanks.html');
    };

    var incrementRef = function incrementRef(ref, countField, cb) {
        ref.once('value', function (data) {
            var val = data.val(), obj = {};
            if (val === null || val == undefined) {
                obj[countField] = 1;
                ref.set(obj, cb);
            } else if (val[countField] === null || val[countField] === undefined) {
                obj[countField] = 1;
                ref.update(obj, cb);
            } else {
                obj[countField] = val[countField] + 1;
                ref.update(obj, cb);
            }
        });
    };

    document.addEventListener('DOMContentLoaded', function () {
        incrementRef(db.child(VERSION), 'pageViews');
    });

    document.getElementById('submitSubscribe').onclick = function () {
        var email = document.getElementById('email').value;
        if (email.length) {
            db.child(VERSION).child('emails').push().set({
                'email': email
            }, function () {
                incrementRef(db.child(VERSION), 'interested', function () {
                    gotoThanks();
                });
            });
        }
        return false;
    };

    document.getElementById('submitInterested').onclick = function () {
        incrementRef(db.child(VERSION), 'interested', function () {
            gotoThanks();
        });
        return false;
    };
}
