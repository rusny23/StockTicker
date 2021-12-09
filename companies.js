let url = "mongodb+srv://cluster0.zlkon.mongodb.net/Cluster0";
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const ejs = require('ejs');
const { ReturnDocument } = require('mongodb');

//express
const app = express()
app.set ('view engine', 'ejs')
 
//connect to mongoDB
mongoose.connect(url, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', (error) => console.log("Connected to Database."))
mongoose.Promise = global.Promise

app.listen(8000, console.log("Server Started.")) 

//take in input
app.get('/', (req, res) => {
    var input = ""
    if(req.input['input'] == "") {
        res.send("Nothing was entered.")
    }
    else if (req.input['type'] == 'symbol') {
        input = {Ticker: req.input['input'].trim()}
    }
    else if (req.input['type'] == 'name') {
        input = {Company: req.input['input'].trim()}
    }

    //print output
    db.collection('companies').find(input).toArray(function(err,items) {
        if (err)
            console.log("Error: " + err)
        else if (items.length == 0)
            res.send("No match.")
        else {
            var arr = []
            for(i = 0; i < items.length; i++) {
                arr.push([items[i].Company, items[i].Ticker])
            }
            res.send(print(items, resultArray))
        }
    })
})

//print out
function print(a1, a2) {
    var output = ""

    for(i = 0; i < a1.length; i++)
        output += ("Company Name: " + a2[i][0] + "Symbol: " + a2[i][1])
    return output
}




