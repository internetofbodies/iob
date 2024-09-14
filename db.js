const { MongoClient } = require('mongodb');

const uri = "mongodb://yourUsername:yourPassword@localhost:27017/yourDatabase";
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
        return client.db('yourDatabase'); // Return the database instance
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        throw err; // Rethrow the error after logging it
    }
}

module.exports = connectToDatabase;
