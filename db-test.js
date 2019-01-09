const nbshopsdb = require("./nearybyshopsdb.js");
let res;
nbshopsdb.getUserByName("lol").then(x => {
    console.log(x);
});
