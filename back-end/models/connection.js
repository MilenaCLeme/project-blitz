const {MongoClient} = require('mongodb');
require('dotenv').config();

const mongoUrl = `mongodb://${process.env.HOST || 'mongodb'}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

const connection = () => (
  db ? Promise.resolve(db) :
    MongoClient.connect(mongoUrl, options)
        .then((conn) => {
          db = conn.db('blitz');
          return db;
        })
);

module.exports = connection;
