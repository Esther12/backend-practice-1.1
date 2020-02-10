var mongoose = require("mongoose");
var express = require("express");
require("dotenv").config();
const app = express();

//Connecting to MongoDB
var MONGODB_URI = process.env.MONGODB_URL;
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connection successful!"))
  .catch(err => console.error(err));

var PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
