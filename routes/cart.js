const express = require("express")
const router  = express.Router()

router.get("/cart",(req,res) =>{
    res.send("Cart Products")
})

module.exports = router