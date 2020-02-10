const db = require("../models");
// get the existing data
// const fs = require("fs");
// let statsData = fs.readFileSync("fixtures/stats.collection.json");
// let stats = JSON.parse(statsData);
// console.log(stats);

// Defining methods for the booksController

module.exports = {
  findAll: (req, res) => {
    db.Stats.find(req.query)
      .sort({ created_at: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(404).json(err));
  },
  findById: (req, res) => {
    db.Stats.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(404).json(err));
  },
  create: (req, res) => {
    console.log("Get in here");
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
    let data = req.body.push({ updated_at: Date.now() });
    console.log(data);
    db.Stats.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(404).json(err));
  }
};
