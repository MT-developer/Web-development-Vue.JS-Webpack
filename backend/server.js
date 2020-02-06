/* eslint-disable no-console */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');

app.use(bodyParser.json())

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json({limit: '1mb'}))

let db;
MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
    db = client.db('cw2')
    classes = db.collection("classes");
    users = db.collection("users");


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
    classes.find({"provider": req.params.id}).toArray(function (err, results) {
        res.send(results)
    });
})

// get class by id
app.get('/classes/:id', (req, res) => {
    var objectid = mongo.ObjectID(req.params.id);
    classes.find({"_id": objectid}).toArray(function (err, results) {
        res.send(results)
    })
})

// add class
app.post('/classes/add', (req, res) => {
    const data = {
        topic: req.body.topic,
        price: req.body.price,
        location: req.body.location,
        provider: req.body.provider,
        author: req.body.author
    };
    classes.insertOne(data)
    res.json({status: 'success'})
})
// delete classes
app.delete('/classes/delete/', (req, res, next) => {
    var id = req.params.id;
    classes.deleteOne({_id: new mongo.ObjectId(id)}, function (err, results) {
    });
    res.json({success: id})
});

// get reviews by author
app.get('/classes/provider/:id', (req, res, next) => {
    classes.find({"author": req.params.id}).toArray(function (err, results) {
        res.send(results)
    });
})

//update class
app.post('/classes/update/', (req, res, next) => {
    var newvalues = {
        topic: req.body.topic,
        price: req.body.price,
        location: req.body.location,
        provider: req.body.provider,
        author: req.body.author
    };
    classes.updateOne({_id: req.body.id}, newvalues, function (err, res) {
        console.log("1 document updated");
    });
    res.json(req.body.price)
})


// add review
app.post('/classes/addReview/:id', (req, res, next) => {
    var vals = {
        body: req.body.body,
        rating: req.body.rating,
        author: req.body.author
    }


    var testData = {
        'body': 'teeesssstttttttt',
        'rating': 'teeesssstttttttt',
        'author': 'teeesssstttttttt'
    }
    var data

    classes.find({"_id": new mongo.ObjectId(req.params.id)}).toArray(function (err, results) {
        console.log(results[3])


        classes.updateOne({_id: new mongo.ObjectId(req.params.id)}, results, function (err, res) {
            console.log("1 document updated");
        });
    });
})

// update review
app.post('/classes/review/:id', (req, res, next) => {

    var newvalues = {
        topic: req.body.topic,
        price: req.body.price,
        location: req.body.location,
        provider: req.body.provider,
        author: req.body.author
    };
    classes.updateOne({_id: req.body.id}, newvalues, function (err, res) {
        console.log("1 document updated");
    });
    res.json(req.body.price)
})

// register function
app.post("/user/register", (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
        type: req.body.type
    };
    users.findOne({
        email: req.body.email,
        type: req.body.type
    })
        .then(user => {
            if (!user) {
                users.insertOne(data)
                    .then(user => {
                        console.log("Account created");
                        res.json({
                            status: 'success',
                            email: req.body.email
                        });
                    })
                    .catch(err => {
                        console.log(err)
                        res.send("Error: " + err);
                    });
            } else {
                console.log("User already exists")
                res.json({error: "User already exists"});
            }
        })
        .catch(err => {
            console.log("Error" + err)
            res.send("error: " + err);
        });
});


app.post("/user/login", (req, res) => {
    console.log('user logging in')
    users.findOne({
        email: req.body.email,
        type: req.body.type
    })
        .then(user => {
            console.log(user)
            if (user) {
                if (req.body.password === user.password) {
                    res.json({
                        status: 'success',
                        email: req.body.email,
                        type: req.body.type
                    })
                    console.log("Login success")
                } else {
                    console.log("User doesn't exist")
                    res.json({error: "User doesn't exist"});
                }
            } else {
                console.log("User dssssoesn't exist")

                res.json({error: "User doesssn't exist"});
            }
        })
        .catch(err => {
            console.log(err)
            res.send("error: " + err);
        });
});