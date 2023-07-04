const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MyNameisAakashKhot%$";
router.post('/creatuser',

    [
        body('email').isEmail(),
        body('name').isLength({ min: 5 }),
        body('password', 'Incorrect password').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        console.log(req.body)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt)
        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        }
        catch (err) {
            console.log(err)
            res.json({ success: false });
        }
    })
////
router.post('/loginuser',
    [
        body('email').isEmail(),
        body('password', 'Incorrect password').isLength({ min: 5 })
    ], async (req, res) => {
        const errors = validationResult(req);


        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;

        try {
            let user_data = await User.findOne({ email })
            if (!user_data) {
                return res.status(400).json({ errors: "Email dosn't exit, Please login with correct email." });
            }
            const pwd = await bcrypt.compare(req.body.password, user_data.password)
            if (!pwd) {
                return res.status(400).json({ errors: "Please login with correct password." });
            }

            const data = {
                user: {
                    id: user_data.id,
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            res.json({ success: true, authToken: authToken });
        }
        catch (err) {
            console.log(err)
            res.json({ success: false });
        }
    })

module.exports = router;