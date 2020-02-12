const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contectSchema = new Schema({
  name: { type: String },
  email: { type: String },
  note: { type: String },
  resume: { type: String }
});

const Contect = mongoose.model("Contect", contectSchema);

module.exports = Contect;
