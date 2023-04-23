/* 
Step we follow==> 
   model user schema
   routes
   auth
   jwt
   bcrypt
   @hapi/joi
   verification token
   validation
   middleware
   public routes
   private routes
   register
   login
   name
   email
   password

*/
const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");

// Connect to DB
mongoose
    .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected succesfully"))
    .catch((error) => {
        console.log(error);
    });
//Middleware
app.use(express.json());

//Route Middleware
app.use("/api/user", authRoute);
app.use("/api/user", profileRoute);


app.listen(8080, function () {
    console.log(`Server Running on http://localhost:${8080}`);
});
