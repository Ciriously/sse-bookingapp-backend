const express = require("express");
const router = express.Router();

const {
  createTrain,
  getTrainById,
  getAllTrains,
  updateTrainById,
  deleteTrainById,
} = require("../controllers/train");
const { authAdmin } = require("../middlewares/auth");

// Create a new train
router.post("/createTrain", authAdmin, createTrain);

// Read a train by ID
router.get("/getTrainById/:id", getTrainById);

// Read all trains
router.get("/getAllTrains", getAllTrains);

// Update a train by ID
router.put("/updateTrainById/:id", authAdmin, updateTrainById);

// Delete a train by ID
router.delete("/deleteTrainById/:id", authAdmin, deleteTrainById);

module.exports = router;
