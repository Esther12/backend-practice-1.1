var mongoose = require("mongoose");
var express = require("express");
const app = express();
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

// Route for create Stats to the db
app.post("/collection/stats", (req, res) => {
  console.log("Get in here");
  db.Stats.create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(404).json(err));
});

// Route for retrieving all Stats from the db
app.get("/collection/stats", function(req, res) {
  // Find all Stats
  db.Stats.find({})
    .sort({ created_at: -1, updated_at: -1 }) // sort by the create data primary and updated date secondery
    .then(function(dbModel) {
      // If all Users are successfully found, send them back to the client
      res.json(dbModel);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

app.get("/collection/stats/:id", function(req, res) {
  db.Stats.findById(req.params.id)
    .then(dbModel => res.json(dbModel)) // If one Stats are successfully found, send them back to the client
    .catch(err => res.status(404).json(err)); // If an error occurs, send the error back to the client
});

app.put("/collection/stats/:id", (req, res) => {
  let data = req.body;
  data = { ...data, updated_at: Date().toString() }; // acync the updated date
  console.log(data);
  db.Stats.findOneAndUpdate({ _id: req.params.id }, data)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(404).json(err));
});

app.delete("/collection/stats/:id", (req, res) => {
  db.Stats.findByIdAndRemove(req.params.id)
    .then(dbModel => res.json(dbModel)) // If one Stats are successfully delete, send them back to the client
    .catch(err => res.status(404).json(err)); // If an error occurs, send the error back to the client
});

app.get("/report/recent_stats_by_channel", (req, res) => {
  db.Stats.aggregate([
    { $unwind: "$stat" },
    { $sort: { updated_at: -1 } },
    {
      $project: {
        asset_id: 1,
        value: 1,
        updated_at: 1,
        stat: 1
      }
    },
    {
      subscribers: [
        {
          $match: { stat: "subscribers" }
        },
        {
          $group: {
            _id: "$asset_id",
            sub: {
              $push: {
                value: "$value",
                date: "$updated_at"
              }
            }
          }
        }
      ]
    }
  ]).exec(function(err, found) {
    // Log any errors if the server encounters one
    if (err) {
      console.log(err);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

app.get("/utils/contact_me", (req, res) => {
  db.Contect.find({})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(404).json(err));
});
app.post("/utils/contact", (req, res) => {
  db.Contect.create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(404).json(err));
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
