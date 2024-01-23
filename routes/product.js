const express = require("express")
const router  = express.Router()

router.get("/products",(req,res) =>{
    res.send("I am the product")
})

module.exports = router