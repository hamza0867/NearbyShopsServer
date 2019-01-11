const nbshopsdb = require("./nearybyshopsdb.js");
/*
nbshopsdb
    .addLikedShop("demo", {
        shopName: "Moumni",
        imgSrc: "someUlr",
        id: "123"
    })
    .then(x => {
        console.log(x);
    });
*/
nbshopsdb
    .removeLikedShop("demo2", {
        shopName: "Moumni",
        imgSrc: "someUrl",
        id: "123"
    })
    .then(x => {
        console.log(x);
    });
