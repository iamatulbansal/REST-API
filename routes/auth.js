const router = require("express").Router();
const Jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();
const User = require("../models/User");
const {
    registerValidation,
    loginValidation,
} = require("../validation/user.validation");

router.post("/register", async (req, res) => {
    // VALIDATE THE DATA BEFORE WE CREATE NEW USER

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //CHECKING IF THE USER IS ALREADY IN THE DATABASE

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists!");

    //Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //CREATE A NEW USER
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        await user.save();
        res.status(201).send({
            message: "Register successfully !",
            userId: user._id,
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/login", async (req, res) => {
    //check user is validation using joi
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //check user is present our database
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(404).send({ message: "Email & Password is wrong !" });
    //password decode / password is correct or not
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(404).send({ message: "Invalid password !" });

    //Create and assign  token

    const token = Jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
});

module.exports = router;
