const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const dbUrl = "mongodb://localhost:27017/";
const dbName = "nearby-shops";
const collectionName = "users";

async function connect() {
    const client = await MongoClient.connect(
        dbUrl,
        { useNewUrlParser: true }
    );
    return client;
}

async function getUser(name, pwd) {
    const client = await connect();
    const db = client.db(dbName);
    const result = await db
        .collection(collectionName)
        .findOne({ userName: name, pass: pwd });
    client.close();
    return result;
}

async function registerUser(username, password) {
    const client = await connect();
    const db = client.db(dbName);
    const user = {
        userName: username,
        pass: password,
        likedShops: [],
        dislikedShops: []
    };
    const result = await db
        .collection(collectionName)
        .findOne({ userName: username });

    if (result === null) {
        await db
            .collection(collectionName)
            .updateOne(
                { userName: username },
                { $set: user },
                { upsert: true }
            );
        client.close();
        return user;
    }
    return null;
}

async function addLikedShop(usrname, shop) {
    const client = await connect();
    const db = client.db(dbName);
    const result = await db
        .collection(collectionName)
        .findOne({ userName: usrname, "likedShops.id": shop.id });

    if (result === null) {
        await db
            .collection(collectionName)
            .updateOne({ userName: usrname }, { $push: { likedShops: shop } });
        const ret = await db
            .collection(collectionName)
            .findOne({ userName: usrname })
            .then(x => x.likedShops);
        client.close();
        return ret;
    }

    client.close();
    return result.likedShops;
}

async function addDislikedShop(usrname, shop) {
    const client = await connect();
    const db = client.db(dbName);
    const result = await db
        .collection(collectionName)
        .findOne({ userName: usrname, "dislikedShops.id": shop.id });

    if (result === null) {
        await db
            .collection(collectionName)
            .updateOne(
                { userName: usrname },
                { $push: { dislikedShops: shop } }
            );
        const ret = await db
            .collection(collectionName)
            .findOne({ userName: usrname })
            .then(x => x.dislikedShops);
        client.close();
        return ret;
    }

    client.close();
    return result.dislikedShops;
}

async function removeDislikedShop(usrname, shop) {
    const client = await connect();
    const db = client.db(dbName);
    const result = await db
        .collection(collectionName)
        .findOne({ userName: usrname, "dislikedShops.id": shop.id });

    if (result === null) {
        client.close();
        return null;
    }

    await db
        .collection(collectionName)
        .updateOne(
            { userName: usrname, "dislikedShops.id": shop.id },
            { $pull: { dislikedShops: { id: shop.id } } }
        );
    const ret = await db
        .collection(collectionName)
        .findOne({ userName: usrname })
        .then(x => x.dislikedShops);
    client.close();
    return ret;
}

async function removeLikedShop(usrname, shop) {
    const client = await connect();
    const db = client.db(dbName);
    const result = await db
        .collection(collectionName)
        .findOne({ userName: usrname, "likedShops.id": shop.id });

    if (result === null) {
        client.close();
        return null;
    }

    await db
        .collection(collectionName)
        .updateOne(
            { userName: usrname, "likedShops.id": shop.id },
            { $pull: { likedShops: { id: shop.id } } }
        );
    const ret = await db
        .collection(collectionName)
        .findOne({ userName: usrname })
        .then(x => x.likedShops);
    client.close();
    return ret;
}

exports.getUser = getUser;
exports.registerUser = registerUser;
exports.addLikedShop = addLikedShop;
exports.addDislikedShop = addDislikedShop;
exports.removeDislikedShop = removeDislikedShop;
exports.removeLikedShop = removeLikedShop;
