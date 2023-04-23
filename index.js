const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connection = require('./database/connection')

const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");
const usersRoute = require("./routes/users");
//Connect To Database
connection()
//Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

//Route Middleware
app.use("/api/user", authRoute);
app.use("/api/user", profileRoute);
app.use("/api/users", usersRoute);

app.listen(8080, function () {
    console.log(`Server Running on http://localhost:${8080}`);
});

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