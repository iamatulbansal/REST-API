// Connect to DB
const mongoose = require("mongoose");
const connection = () => mongoose
    .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected succesfully"))
    .catch((error) => {
        console.log(error);
    });

module.exports = connection;