const stripe = require('stripe')('sk_test_26PHem9AhJZvU623DfE1x4sd');

exports.handler = async (event) => {
    try {
        // Function to create a location
        const createLocation = async () => {
            const location = await stripe.terminal.locations.create({
                display_name: 'HQ',
                address: {
                    line1: '448A Crownhill Rd',
                    city: 'Plymouth',
                    country: 'GB',
                    postal_code: 'PL5 2QT',
                }
            });

            return location;
        };

        // Endpoint to generate a connection token
        if (event.path === '/connection_token' && event.httpMethod === 'POST') {
            const connectionToken = await stripe.terminal.connectionTokens.create();
            return {
                statusCode: 200,
                body: JSON.stringify({ secret: connectionToken.secret }),
            };
        }

        // Endpoint to create a payment intent
        else if (event.path === '/create_payment_intent' && event.httpMethod === 'POST') {
            const intent = await stripe.paymentIntents.create({
                amount: JSON.parse(event.body).amount,
                currency: 'gbp',
                payment_method_types: ['card_present'],
                capture_method: 'manual',
            });
            return {
                statusCode: 200,
                body: JSON.stringify(intent),
            };
        }

        // Endpoint to capture a payment intent
        else if (event.path === '/capture_payment_intent' && event.httpMethod === 'POST') {
            const intent = await stripe.paymentIntents.capture(JSON.parse(event.body).payment_intent_id);
            return {
                statusCode: 200,
                body: JSON.stringify(intent),
            };
        }

        // Default response for other paths/methods
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Not Found' }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};
