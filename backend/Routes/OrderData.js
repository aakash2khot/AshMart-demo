const express = require('express')
const Order = require('../models/Orders')
const router = express.Router()

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date })

    // If new email -> create else add
    let emailId = await Order.findOne({ 'email': req.body.email })

    console.log(emailId)
    if (emailId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (err) {
            console.log(err.message)
            res.status("Server error").send(err.message)
        }

    }
    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                {
                    $push: { order_data: data }
                }).then(() => {
                    res.json({ success: true })

                })
        } catch (err) {
            res.send("Server Error", err.message)
        }
    }
})

router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({ orderData: eId })
    } catch (error) {
        res.send("Error", error.message)
    }


});


module.exports = router;