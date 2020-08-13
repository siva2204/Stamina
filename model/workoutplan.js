const mongoose = require("mongoose");
const planSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  planname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  goal: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const workoutSchema = mongoose.model("workoutSchema", planSchema);

module.exports = workoutSchema;
