const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  tickets: [
    {
      trainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Train",
        required: true,
      },
      date: {
        type: Date,
        required: false,
      },
      class: {
        type: String,
        enum: ["1ac", "2ac", "3ac"],
        required: false,
      },
      seats: {
        type: Number,
        required: false,
      },
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      foodPreferences: {
        type: String,
        enum: ["veg", "nonveg"],
        required: true,
      },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("user", UserSchema);
