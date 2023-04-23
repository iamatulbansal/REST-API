const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/User");

router.get("/",verify, async (req, res) => {
    const users = await User.find()
    res.json({
        message: 'success',
        users
    })
});

module.exports = router;
