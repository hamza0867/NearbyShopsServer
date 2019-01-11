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
    .post("/nbshops/shops/like", urlencodedParser, (req, res) => {
        res.setHeader("Content-Type", "application/json");
        nbshopsdb
            .addLikedShop(req.body.userName, JSON.parse(req.body.shop))
            .then(likedShops => {
                res.send(JSON.stringify(likedShops));
            });
    })
    .post("/nbshops/shops/dislike", urlencodedParser, (req, res) => {
        res.setHeader("Content-Type", "application/json");
        nbshopsdb
            .addDislikedShop(req.body.userName, JSON.parse(req.body.shop))
            .then(dislikedShops => {
                res.send(JSON.stringify(dislikedShops));
            });
    })
    .post("/nbshops/shops/unlike", urlencodedParser, (req, res) => {
        res.setHeader("Content-Type", "application/json");
        nbshopsdb
            .removeLikedShop(req.body.userName, JSON.parse(req.body.shop))
            .then(likedShops => {
                res.send(JSON.stringify(likedShops));
            });
    })
    .post("/nbshops/shops/undislike", urlencodedParser, (req, res) => {
        res.setHeader("Content-Type", "application/json");
        nbshopsdb
            .removeDislikedShop(req.body.userName, JSON.parse(req.body.shop))
            .then(dislikedShops => {
                res.send(JSON.stringify(dislikedShops));
            });
    })
    .listen(8080);
