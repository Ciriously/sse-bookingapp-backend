const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const trainRouters = require("./routes/train");
const port = 4000;
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://SSE:SSE@sse.ccywu0i.mongodb.net/?retryWrites=true&w=majority&appName=SSE"
);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.log("Failed to connect to MongoDB", err);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://railyatri.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRoutes);
app.use("/admin", trainRouters);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
