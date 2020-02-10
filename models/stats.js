const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statsSchema = new Schema({
  latest: { type: Boolean },
  schema_version: { type: Number },
  asset_type: { type: String },
  asset_id: { type: String },
  stat: { type: String },
  value: { type: String },
  date: { type: Date },
  created_at: { type: Date },
  updated_at: { type: Date }
});

const Stats = mongoose.model("Stats", statsSchema);

module.exports = Stats;
