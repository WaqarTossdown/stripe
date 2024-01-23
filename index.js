const express = require('express')
const cors = require("cors")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 8000
app.use(cors())
const products = require("./routes/product.js")
const cart = require("./routes/cart.js")

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
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
exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Hello, World!' }),
    };
};
