var mongoose = require("mongoose");
var express = require("express");
const app = express();
const router = require("express").Router();
const statsController = require("./controllers/statsController");
const db = require("./models");
var PORT = process.env.PORT || 4000;

//Define the middleware here
app.use(express.urlencoded({ extender: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

//Connecting to MongoDB
var MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://Admin:r0otr0ot@ds147746.mlab.com:47746/heroku_3nzvwv2f";
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connection successful!"))
  .catch(err => console.error(err));

router.route("post").post(statsController.create);
app.post("/submit", function(req, res) {
  // Create a new Note in the db
  db.Stats.create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.User.findOneAndUpdate(
        {},
        { $push: { notes: dbNote._id } },
        { new: true }
      );
    })
    .then(function(dbUser) {
      // If the User was updated successfully, send it back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// Route for retrieving all Users from the db
app.get("/all", function(req, res) {
  // Find all Users
  db.Stats.find({})
    .then(function(dbUser) {
      // If all Users are successfully found, send them back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
