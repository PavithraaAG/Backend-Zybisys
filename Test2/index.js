const express = require("express");
const app = express();
const fs = require('fs');
const events = require("events");
const eventsEmit = new events.EventEmitter();
const path = require("path");
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = "mongodb://0.0.0.0:27017/task"
const client = new MongoClient(url);
const cookieParser = require("cookie-parser")
app.use(cookieParser());

// 1.Create a route in express which should have a middleware to authenticate a user by checking whether a cookie exists for that particular user or not. If the cookie does not exists then use error handler middleware to throw error message.
let count=1;
app.get('/', (req, res)=>{
    res.cookie("count",count++)
    res.send(req.cookies.count)
    console.log(req.cookies.count)
})
// =========================================================================

// 2.Create a route in express which should have a middleware to authenticate a user by checking whether a cookie exists for that particular user or not. If the cookie does not exists then use error handler middleware to throw error message.
const User = (req, res, next) => {
    const userCookie = req.cookies.user;
    res.send(userCookie)
    next();
};
app.use(User); 

app.get('/', (req, res) => {
    res.send('Authenticated successfully');
});

// ============================================================================

// 3.Using the ‘fs’ module in nodejs, read an html file and display its content on the web page.
app.get("/", (req, res) => {

    fs.readFile('index.html', (err, response) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(response.toString());
        }
    })

})
// =================================================================================


// 4. Create a user defined event in node which when fired should write some content to a file.
app.get("/", (req, res) => {
eventsEmit.on('screen', (y) => {
    fs.writeFile('data.txt',y, (err, response) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send("writing content")
        }
    })
})
eventsEmit.emit('screen', "screening!!!");
});
// =================================================================================



// 5.Create a route in express which should accept an object id from the url and if that object id exists in the database then fetch the document of that particular object id and pass it on to the ejs template engine to view the data.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/public', 'views'));
MongoClient.connect(url).then(() => {
    console.log("Connected")
    const DB = client.db("Assignment");
    const coll = DB.collection("crud");
    app.get("/:objectId", (req, res) => {
        let objectId = req.params.objectId;
        console.log(objectId);
        MongoObjectId = new ObjectId(objectId);
        console.log(MongoObjectId)

        coll.findOne({ _id: objectId }).then((val) => {
            console.log(val);
            res.render("index", { object: val });
        })
    })

})

// ==================================================================================


app.listen(8080, () => {
    console.log("server is running!!");
});