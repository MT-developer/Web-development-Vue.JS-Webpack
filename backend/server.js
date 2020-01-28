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
    classes.find({"provider":req.params.id}).toArray(function(err, results){
      res.send(results)
    });
})

// delete classes
app.delete('/classes/delete/:id', (req, res, next) => {
    var id = req.params.id;
    classes.deleteOne({ _id: new mongo.ObjectId(id) }, function (err, results) {
    });
    res.json({ success: id })
});


//update class
app.post('/classes/update/:id', (req, res, next) => {
    var newvalues = { topic: req.body.topic, price: req.body.price, location: req.body.location};
    classes.updateOne({_id : req.body.id}, newvalues, function(err, res) {
        console.log("1 document updated");
    });
    res.json(req.body.price)
})



app.post("/user/login", (req, res) => {
    users.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (req.body.password === user.password) {
                    const payload = {
                        _id: user._id,
                        email: user.email,
                        password: user.password,
                        type: user.type
                    }
                } else {
                    res.json({ error: "User does not exist" });
                }
            } else {
                res.json({ error: "User does not exist" });
            }
        })
        .catch(err => {
            res.send("error: " + err);
        });
});


// Defined store route
app.route("/user/register").post(function(req, res) {
    // eslint-disable-next-line no-console
    console.log("Register button clicked");
    const today = new Date();
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created: today
    };
    // eslint-disable-next-line no-console
    console.log("New user started");

    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                User.create(userData)
                    .then(user => {
                        // eslint-disable-next-line no-console
                        console.log("New user registered");
                        res.json({ status: user.email + " registered" });
                    })
                    .catch(err => {
                        // eslint-disable-next-line no-console
                        console.log("Error registering")
                        res.send("error: " + err);
                    });
            } else {
                // eslint-disable-next-line no-console
                console.log("User already exists")
                res.json({ error: "User already exists" });
            }
        })
        .catch(err => {
            // eslint-disable-next-line no-console
            console.log("Error")
            res.send("error: " + err);
        });
});

