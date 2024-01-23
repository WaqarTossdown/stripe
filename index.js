const express = require('express')
const cors = require("cors")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 8000
app.use(cors())
const products = require("./routes/product.js")
const cart = require("./routes/cart.js")
app.use(express.json());
// const { getConnectionToken } = require('./routes/stripeutils.js');
const { getConnectionToken, createPaymentIntent, capturePaymentIntent} = require('./routes/stripeutils.js');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



app.get('/', (req, res) => {
  res.status(200).send('Hello World waqar!')
  console.log("hy")
})

app.get('/products',products)
app.get('/cart',cart)

app.get('/my', (req, res) => {
  res.status(200).send('Hello waqar')
  console.log("hy")
})
// app.get('/me',)

app.listen(port, () => {
  console.log(`App is running listening on port ${port}`)
})
console.log("again")

app.post('/connection_token', async (req, res) => {
  try {
    const secret = await getConnectionToken();
    res.json({ secret });
  } catch (error) {
    console.error("Error generating connection token:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/create_payment_intent', async (req, res) => {
  try {
    // Assuming req.body.amount is provided in the request
    const intent = await createPaymentIntent(req.body.amount);
    res.json(intent);
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/capture_payment_intent', async (req, res) => {
  try {
    if (!req.body || typeof req.body.payment_intent_id === 'undefined') {
      throw new Error('Invalid request payload');
    }

    const paymentIntentId = req.body.payment_intent_id;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    console.log('Payment Intent Status:', paymentIntent.status); 

    if (paymentIntent.status !== 'requires_capture') {
      console.log(paymentIntent.status)
      throw new Error('Payment intent is not eligible for capture.');
    }

    const capturedIntent = await capturePaymentIntent(paymentIntentId);
    res.json(capturedIntent);
  } catch (error) {
    console.error("Error capturing payment intent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Hello, World!' }),
    };
};