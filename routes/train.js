const express = require("express");
const router = express.Router();
const Train = require("../model/Train");
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

router.get("/getTrainByFilter", async (req, res) => {
  try {
    const { source, destination, date } = req.query;
    console.log("Received query params:", { source, destination, date });

    const query = {
      source: source,
      destination: destination,
      date: { $gte: new Date(date) },
    };
    console.log("Constructed query for database:", query);

    const trains = await Train.find(query);
    console.log("Found trains:", trains);

    res.json(trains);
  } catch (error) {
    console.log("Error fetching trains:", error);
    res.status(500).json({ message: "Error fetching trains", error: error });
  }
});

module.exports = router;
