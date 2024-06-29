const Train = require("../model/Train");

// Create a new train
const createTrain = async (req, res) => {
  const trainData = req.body;
  try {
    const train = new Train(trainData);
    await train.save();
    return res.status(201).json(train);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Read a train by ID
const getTrainById = async (req, res) => {
  const trainId = req.params.id;
  try {
    const train = await Train.findById(trainId);
    if (!train) {
      return res.status(404).json({ error: "Train not found" });
    }
    return res.status(200).json(train);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

// Read all trains
const getAllTrains = async (req, res) => {
  try {
    const trains = await Train.find();
    return res.status(200).json(trains);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a train by ID
const updateTrainById = async (req, res) => {
  const trainId = req.params.id;
  const updateData = req.body;
  try {
    const train = await Train.findByIdAndUpdate(trainId, updateData, {
      // new: true,
    });
    if (!train) {
      return res.status(404).json({ error: "Train not found" });
    }
    return res.status(200).json(train);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

// Delete a train by ID
const deleteTrainById = async (req, res) => {
  const trainId = req.params.id;
  console.log("Attempting to delete train with ID:", trainId); // Before attempting to find and delete
  try {
    const train = await Train.findByIdAndDelete(trainId);
    if (!train) {
      console.log("Train not found with ID:", trainId); // If no train is found
      return res.status(404).json({ error: "Train not found" });
    }
    console.log("Train deleted successfully:", trainId); // After successful deletion
    return res.status(204).json();
  } catch (error) {
    console.log("Error deleting train with ID:", trainId, "Error:", error); // If an error occurs
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createTrain,
  getTrainById,
  getAllTrains,
  updateTrainById,
  deleteTrainById,
};
