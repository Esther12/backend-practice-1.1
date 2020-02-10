const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statsSchema = new Schema({
  _id: ObjectId,
  latest: Boolean,
  schema_version: Number,
  asset_type: String,
  asset_id: String,
  stat: String,
  value: Any,
  date: Date,
  created_at: Date,
  updated_at: Date
});

const Stats = mongoose.model("Stats", statsSchema);

module.exports = Stats;
