console.log('Starting server...');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Correct import
const paypal = require('@paypal/checkout-server-sdk'); // Correct PayPal SDK
const cors = require('cors'); // Import CORS

const app = express();
const PORT = process.env.PORT || 30031; // Changed port 

// CORS configuration
const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS']
};

app.use(cors(corsOptions)); // Use CORS middleware

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// PayPal environment setup
let clientId = 'YOUR_PAYPAL_CLIENT_ID';
let clientSecret = 'YOUR_PAYPAL_CLIENT_SECRET';
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Handle registration form submission
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).send(error.message);
    }
});

// Handle login form submission
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).send(error.message);
    }
});

// PayPal payment routes
app.post('/create-payment', async (req, res) => {
    let request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '10.00' // Adjust the value based on your subscription plan
            }
        }]
    });

    try {
        let order = await client.execute(request);
        res.json({ id: order.result.id });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/execute-payment', async (req, res) => {
    let orderId = req.body.orderId;
    let request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
        let capture = await client.execute(request);
        res.json(capture.result);
    } catch (err) {
        res.status(500).send(err);
    }
});

console.log('Setting up server...');
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
console.log('Server setup complete.');
