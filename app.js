const express = require('express');
const path = require('path');
const connectToDatabase = require('./db');

const app = express();
const port = 3000; // Ensure this is a valid port number

app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle POST request for user registration
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        const result = await collection.insertOne({ username, email, password });

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

app.get('/data', async (req, res) => {
    const db = await connectToDatabase();
    const collection = db.collection('yourCollection');
    const data = await collection.find({}).toArray();
    res.send(data);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
