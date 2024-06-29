// require("dotenv").config();
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const userRoutes = require("./routes/user");
// const mongoose = require("mongoose");
// const trainRouters = require("./routes/train");
// const port = process.env.PORT || 4000;

// mongoose.connect(process.env.MONGODB_URI);
// mongoose.connection.on("connected", () => {
//   console.log("Connected to MongoDB");
// });
// mongoose.connection.on("error", (err) => {
//   console.log("Failed to connect to MongoDB", err);
// });
// const corsOptions = {
//   origin: process.env.CORS_ORIGIN,
// };

// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/", userRoutes);
// app.use("/admin", trainRouters);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const trainRouters = require("./routes/train");
const port = 4000;
require("dotenv").config();

mongoose.connect("mongodb://localhost:27017/railyatri");
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
