const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/User");

router.get("/", verify, async (req, res) => {
    const { name, email, date, _id } = await User.findOne({ _id: req.user._id });

    res.json({ name, email, date, _id });
});

module.exports = router;
