const express = require('express');
const router = express.Router();
const paypal = require('@paypal/paypal-js');

// PayPal environment setup
let clientId = 'YOUR_PAYPAL_CLIENT_ID';
let clientSecret = 'YOUR_PAYPAL_CLIENT_SECRET';
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

// Create payment
router.post('/create-payment', async (req, res) => {
    let request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '100.00'
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

// Execute payment
router.post('/execute-payment', async (req, res) => {
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

module.exports = router;
