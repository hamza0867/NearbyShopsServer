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
/*
async function updateUser(usrname, usrTodoList) {
    const client = await connect();
    const db = client.db(dbName);
    const result = await db
        .collection(collectionName)
        .updateOne({ name: usrname }, { $set: { todoList: usrTodoList } });
    client.close();
    return result;
}
*/

exports.getUser = getUser;

exports.registerUser = registerUser;
// exports.updateUser = updateUser;
