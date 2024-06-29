const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const trainRouters = require("./routes/train");
const port = 4000;
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://adityamishrad13:adityamishrad13@railyatri.land1v8.mongodb.net/?retryWrites=true&w=majority&appName=RailYatri"
);
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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// adityamishrad13
// WPCNi7CrCXRQVBOu

// mongodb+srv://adityamishrad13:adityamishrad13@railyatri.land1v8.mongodb.net/?retryWrites=true&w=majority&appName=RailYatri
