const express = require('express')
const app = express();
const cors = require("cors");
const connectDB = require('./db');
const createUser = require("./routes/createUser");
const displayData = require("./routes/displayData");
const mongoose = require("mongoose");
connectDB().then(() => {
  console.log("connected to DB");

}).catch((err) => {
  console.log(err)
})



app.use(cors());
app.use(express.json());
app.use("/api", createUser);
app.use("/api", displayData);
app.get('/', function (req, res) {
  res.send('Hello World');
})
app.listen(5000, () => {
  console.log("Server started")
});