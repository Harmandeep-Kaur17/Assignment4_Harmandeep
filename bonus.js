const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

function connectToMongo() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, client) => {
            if (err) {
                reject(err);
            } else {
                resolve(client);
            }
        });
    });
}

function findAll() {
    return connectToMongo()
        .then(client => {
            console.log('1');
            const db = client.db("mydb");
            console.log('2');
            let collection = db.collection('customers');
            console.log('3');
            let cursor = collection.find({}).limit(10);
            console.log('4');
            return cursor.toArray();
        })
        .then(docs => {
            console.log(docs);
            console.log('5');
        })
        .catch(err => {
            console.log(err);
        });
}

setTimeout(() => {
    findAll();
    console.log('Done');
}, 5000);
