const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://Mausam:myra12345@cluster0.jcs3a.mongodb.net/shop'
  )
    .then(client => {
      console.log(`Server is running at http://localhost:3000`);
      _db=client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};

const getDb=()=>{
  if(_db){
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
// module.exports=mongoConnect;