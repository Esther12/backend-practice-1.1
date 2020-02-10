const db = require("../models");
// get the existing data
const fs = require("fs");
let statsData = fs.readFileSync("../fixtures/stats.collection.json");
let stats = JSON.parse(statsData);
console.log(stats);

// Defining methods for the booksController

module.exports = {
  getall: (req, res) => {
    db.Stats.insertMany(stats)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(404).json(err));
  },
  findAll: (req, res) => {
    db.Stats.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(404).json(err));
  },
  findById: (req, res) => {
    db.Stats.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(404).json(err));
  },
  create: function(req, res) {
    db.Stats.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(404).json(err));
  },
  delete: (req, res) => {
    db.Stats.findByIdAndRemove(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(404).json(err));
  },
  update: (req, res) => {
    db.Stats.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(404).json(err));
  }
};
