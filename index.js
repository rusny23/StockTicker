var fs = require("fs");
var parse = require('csv-parser');
var mongodb = require("mongodb");
var data = [];
let uri = "mongodb+srv://cluster0.zlkon.mongodb.net/Cluster0";

fs.createReadStream("companies.csv")
    .pipe(parse({ delimiter: ','}))
    .on('data', (r) => {
        // console.log(r);
        data.push(r);
    })
    .on ('end', () => {
        console.log(data);
})

var client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const companies = client.db("Cluster0").collection("companies");
  companies.insertMany(data, (err, res) => {
    if (err) throw err;
    console.log('Inserted: '+ res.insertedCount + ' rows');
    //client.close();
    })
})
