// testMongoConnection.js
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://lmbsumatraintech:RprydCqlVO2OMy6r@cluster0.yagtxxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const options = {};

const client = new MongoClient(uri, options);

async function testConnection() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  } finally {
    await client.close();
  }
}

testConnection();
