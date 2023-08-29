const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const client = new MongoClient('mongodb://0.0.0.0:27017/mydb');
const multer=require('multer');
const fs = require('fs');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/public/', 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./src/models/user'); 

//4.Create REST API to accept only images from the user.If the file is not an image then display an error message.


const multerStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file.originalname.endsWith('.png') ){
            cb(null,path.join(__dirname+'/src/public','uploads'))
        }
        else if(file.originalname.endsWith('.jpg')){
            cb(null,path.join(__dirname+'/src/public','uploads'))
        }
        else if(file.originalname.endsWith('.jpeg')){
            cb(null,path.join(__dirname+'/src/public','uploads'))
        }
        else{
            cb(new Error("only images file is accepted"),false)
        }
        
    },
    filename:(req,file,cb)=>{
        cb(null,`${file.originalname}`)
    }
})



const upload = multer({storage:multerStorage})

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/upload',upload.single("file"),(req,res)=>{
    res.send("file uploaded")
})


// 3. Create REST API to accept multiple files from the user and upload all of them in the database using mongoose.


mongoose.connect('mongodb://0.0.0.0:27017/mydb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
const UserSchema=new mongoose.Schema({
    
    myfile:{
        type:String
    }
})
const MyUser=mongoose.model('myfileupload',UserSchema)
const multerStorage2=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname+fileuploads))
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload2=multer({storage:multerStorage2});


app.get('/upload',(req,res)=>{
    res.render("index2")
});



app.post('/fileupload', upload2.array('file'),(req,res)=>{

    console.log(req.file)
    MyUser.create({myfile:req.file})
    MyUser.find({}).then((user)=>{
        res.send("file uploaded")
    })
})

// 2. Create REST API to authenticate users using passportjs. Use mongoose ODM. You need to follow
// MVC Architecture. Create routes for registering a user, login, and logout a user

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const authRoutes = require('./src/routes/authRoutes');
app.use('/api', authRoutes);


app.listen(8000,()=>{
    console.log('listening on')
})  

// 1. question in Bus Folder