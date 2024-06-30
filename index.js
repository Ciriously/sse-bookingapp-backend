const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const trainRouters = require("./routes/train");
const port = 4000;
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.log("Failed to connect to MongoDB", err);
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRoutes);
app.use("/admin", trainRouters);
app.get("/", (req, res) => {
  res.send("Welcome to Railyatri");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// https://railyatri.vercel.app/
