const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_DB_URI;
const client = new MongoClient(uri);
const dbName = process.env.MONGO_DB_NAME;

async function connectToDB() {
  try {
    await client.connect();
    console.log("Connect to Mongodb");
    return client.db(dbName);
  } catch (error) {
    console.log("Error connecting to Mongodb", error);
    throw error;
  }
}

module.exports = { connectToDB };
