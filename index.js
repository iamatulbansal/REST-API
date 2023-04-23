const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connection = require("./database/connection");
const PORT = 8080 || process.env.PORT;

//Connect To Database
connection();
//Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));
app.disable("x-powered-by")// less Hackers know about your stack
//Route Middleware
require("./routes/routes")(app);


app.listen(PORT, function () {
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
