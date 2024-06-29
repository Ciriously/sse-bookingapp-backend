const mongoose = require("mongoose");

const TrainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  timings: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  seats: {
    "3ac": {
      price: {
        type: Number,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
    },
    "2ac": {
      price: {
        type: Number,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
    },
    "1ac": {
      price: {
        type: Number,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
    },
  },
});

module.exports = mongoose.model("Train", TrainSchema);
