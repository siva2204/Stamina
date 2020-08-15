const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  BMI: {
    type: Array,
    default: [],
  },
  dailydrinktarget: {
    type: Array,
    default: [],
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
