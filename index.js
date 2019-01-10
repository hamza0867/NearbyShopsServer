const express = require("express");
const bodyParser = require("body-parser"); // Charge le middleware de gestion des paramètres
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const nbshopsdb = require("./nearybyshopsdb.js");

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
    .post("/nbshops/users/new", urlencodedParser, (req, res) => {
        res.setHeader("Content-Type", "application/json");
        nbshopsdb
            .registerUser(req.body.userName, req.body.pass)
            .then(newUser => {
                res.send(JSON.stringify(newUser));
            });
    })
    .post("/nbshops/user", urlencodedParser, (req, res) => {
        res.setHeader("Content-Type", "application/json");
        nbshopsdb.getUser(req.body.userName, req.body.pass).then(user => {
            res.send(JSON.stringify(user));
        });
    })
    .listen(8080);
