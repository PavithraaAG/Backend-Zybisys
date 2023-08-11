const express = require("express");
const app = express();


const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

app.get("/search/:name", (req, res) => {
    res.send(req.params.name.toUpperCase());
});


const mod= require("func.js");
app.get("/", (req, res) => {
    var num1=20;
    var num2=10;
    const resAdd=mod.add(num1,num2);
    const resSub=mod.subtract(num1,num2);
    const resMul=mod.multiply(num1,num2);
    const resDiv=mod.divide(num1,num2);
    res.send(resAdd,resSub,resMul,resDiv)
});


app.listen(3000, () => {
    console.log("listening on! ");
});