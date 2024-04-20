const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtSec = "asdfljasdfljkaslkdfj";
router.post("/createuser", async (req, res) => {
    const {
        name,
        email,
        password,
        location
    } = req.body;
    // console.log(req.body);
    if (!name || !email || !password || !location) {
        res.status(401).json({
            status: 401,
            error: "All inputs are required"
        })
    }
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(password , salt);
    try {

        const newuser = new User({
            name,
            email,
            password:secPassword,
            location
        });
        const preUser = await User.findOne({
            email
        });

        if (preUser) {
            console.log("already exists")
            return res.status(401).json({
                status: 401,
                error: "Already Exists"
            });

        }
        const storedata = await newuser.save();
        console.log("Saved newuser")

        res.status(201).json({
            status: 201,
            storedata
        });



    } catch (error) {
        res.status(401).json({
            status: 401,
            error: "All inputs are in catch required"
        })
        console.log("error catch")
        console.log(error)
    }



});


router.post("/loginuser", async (req, res) => {
    const {
        email,
        password
    } = req.body;
    // console.log(req.body);
    if (!email || !password) {
        
        res.status(401).json({
            status: 401,
            error: "All inputs are required"
        })
    }

    try {

        const userData = await User.findOne({
            email
        });
        const comPass = await bcrypt.compare(password, userData.password );
        if (!comPass) {
            console.log("invalid username or password")
            return res.status(401).json({
                status: 401,
                error: "invalid username or password"
            });

        }
        //   const storedata =  await newuser.save();
        console.log(userData);
        console.log("done")
        const data = {
            user : {
                id : userData.id,
            }
        }
        const authToken = jwt.sign(data, jwtSec);
        res.status(201).json({
            status: 201 , authToken : authToken
        });



    } catch (error) {
        res.status(401).json({
            status: 401,
            error: "All inputs are in catch required"
        })
        console.log("error catch")
        console.log(error)
    }



})



module.exports = router;