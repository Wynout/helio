var mongo  = require('mongodb');

var Server = mongo.Server,
    Db     = mongo.Db,
    BSON   = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true}),
    db     = new Db('winedb', server, {safe: true});

db.open(function (err, db) {

    if (!err) {

        console.log("Connected to 'winedb' database");
        db.collection('accounts', {safe:true}, function (err, collection) {

            if (err) {

                console.log("The 'accounts' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});


exports.findById = function (req, res) {

    var id = req.params.id;
    console.log('Retrieving account: ' + id);

    db.collection('accounts', function (err, collection) {

        collection.findOne({'_id':new BSON.ObjectID(id)}, function (err, item) {

            // We don't want the browser to cache the results
            // res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            res.send(item);
        });
    });
};


exports.findAll = function (req, res) {

    db.collection('accounts', function (err, collection) {

        collection.find().toArray(function (err, items) {

            res.send(items);
        });
    });
};


exports.addAccount = function (req, res) {

    var account = req.body;
    console.log('Adding account: ' + JSON.stringify(account));

    db.collection('accounts', function (err, collection) {

        collection.insert(account, {safe:true}, function (err, result) {

            if (err) {

                res.send({'error':'An error has occurred'});
            } else {

                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};


exports.updateAccount = function (req, res) {

    var id   = req.params.id;
    var account = req.body;
    delete account._id;
    console.log('Updating account: ' + id);
    console.log(JSON.stringify(account));

    db.collection('accounts', function (err, collection) {

        collection.update({'_id':new BSON.ObjectID(id)}, account, {safe:true}, function (err, result) {

            if (err) {

                console.log('Error updating account: ' + err);
                res.send({'error':'An error has occurred'});
            } else {

                console.log('' + result + ' document(s) updated');
                res.send(account);
            }
        });
    });
};


exports.deleteAccount = function (req, res) {

    var id = req.params.id;
    console.log('Deleting account: ' + id);

    db.collection('accounts', function (err, collection) {

        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function (err, result) {

            if (err) {

                res.send({'error':'An error has occurred - ' + err});
            } else {

                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};


/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function () {

    var accounts = [{
        type: 'user',
        user: {
            givenname: 'Wynout',
            surnameprefix: 'van der',
            surname: 'Veer',
            nickname: 'Whynot'
        },
        email: '',
        hashed_password: ''
    }];

    db.collection('accounts', function (err, collection) {

        collection.insert(accounts, {safe:true}, function (err, result) {});
    });

};