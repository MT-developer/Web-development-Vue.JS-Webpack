/* eslint-disable no-console */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');


let classesRoutes = require("./routes/classes")
app.use(bodyParser.json())

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let db;
MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
    db = client.db('cw2')
    classes = db.collection("classes");

})

app.param('classes', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName)
    return next()
})


app.listen(PORT, function () {
    console.log('Server is running on Port:', PORT);
});


app.get('/', (req, res, next) => {
    res.send('Select a collection, e.g., /collections/messages')
})

// get all classes
app.get('/classes', (req, res) => {
    classes.find({}).toArray((error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(result);
    })
})

// get classes by provider
app.get('/classes/provider/:id', (req, res, next) => {
  db.collection('classes', function(err, collection) {
    classes.find({"provider":req.params.id}).toArray(function(err, results){
      res.send(results)
    });
  })
})

// delete classes
app.delete('/classes/delete/:id', (req, res, next) => {
    var id = req.params.id;
    classes.deleteOne({ _id: new mongo.ObjectId(id) }, function (err, results) {
    });
    res.json({ success: id })
});

