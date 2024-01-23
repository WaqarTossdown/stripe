// stripeUtils.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getConnectionToken = async () => {
  const connectionToken = await stripe.terminal.connectionTokens.create();
  return connectionToken.secret;
};

module.exports = { getConnectionToken };
