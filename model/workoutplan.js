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
  day1: { type: Array, default: [] },
  day2: { type: Array, default: [] },
  day3: { type: Array, default: [] },
  day4: { type: Array, default: [] },
  day5: { type: Array, default: [] },
  day6: { type: Array, default: [] },
  day7: { type: Array, default: [] },
});

const workoutSchema = mongoose.model("workoutSchema", planSchema);

module.exports = workoutSchema;
