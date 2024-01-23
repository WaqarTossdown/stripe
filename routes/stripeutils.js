// stripeUtils.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getConnectionToken = async () => {
  const connectionToken = await stripe.terminal.connectionTokens.create();
  return connectionToken.secret;
};

const createPaymentIntent = async (amount) => {
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd', 
      payment_method_types: ['card_present'],
      capture_method: 'card_present',
    });
    return intent;
};

const capturePaymentIntent = async (paymentIntentId) => {
    try {
    const intent = await stripe.paymentIntents.capture(paymentIntentId);
    return intent;
  } catch (error) {
    console.error("Error capturing payment intent:", error);
    throw error;
  }
};
  

module.exports = { getConnectionToken, createPaymentIntent, capturePaymentIntent  };
