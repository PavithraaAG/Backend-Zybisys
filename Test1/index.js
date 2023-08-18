const express = require("express");
const mod = require("./func.js");
const app = express();


const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Answer 1
app.post("/email", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).send({ error: 'Enter a valid emila & Password' });
    }
    if (password.length < 5) {
        return res.status(400).send({ error: 'Password error' });
    }
    if (!email.includes('@')) {
        return res.status(400).send({ error: 'Invalid Email' });
    }
    res.status(200).send({ success: 'success'});

});

// Answer 2
app.get("/search/:name", (req, res) => {
    res.send(req.params.name.toUpperCase());
});


// Answer 3
app.get("/", (req, res) => {
    var num1=20;
    var num2=10;
    const resAdd=mod.add(num1,num2);
    const resSub=mod.subtract(num1,num2);
    const resMul=mod.multiply(num1,num2);
    const resDiv=mod.divide(num1,num2);
    res.send(resAdd,resSub,resMul,resDiv)
});


// Answer 4
/*
//4a.db.Reviews.find({ property_type: { $eq: "House" } });


//4b.db.Reviews.find({price:{$gt:500}},{_id:0,listing_url:1, name:1, host_name:1, host_location:1, reviewer_name:1, price:1})

//4d.db.Reviews.find({price:{$gt:600,$lt:900}})

//4c.db.Reviews.find({$and:[
// {'address.country':"Brazil"},
// {"review_scores.review_scores_rating":{$gte:9}}
// ]})
*/

app.listen(3000, () => {
    console.log("listening on! ");
});