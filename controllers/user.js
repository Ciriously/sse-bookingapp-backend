const User = require("../model/User");
const jwt = require("jsonwebtoken");

// Create a new user
const createUser = async (req, res) => {
  var { email, password, role } = req.body;
  try {
    if (email == "admin@gmail.com" && password == "admin123") {
      role = "admin";
    }
    const user = new User({ email, password, role });
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Read a user by ID
const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error fetching user:", error.message);
    return res.status(404).json({ error: error.message });
  }
};

// Read all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a user by ID
const updateUserById = async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  console.log("Update request for user ID:", userId, "with data:", updateData);

  try {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ error: "User not found" });
    }
    console.log("User updated successfully:", user);
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error updating user:", error.message);
    return res.status(400).json({ error: error.message });
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return;
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  var { email, password } = req.body;
  try {
    var user = await User.findOne({ email });
    if (user && user.password === password) {
      if (user.email == "admin@gmail.com" && user.password == "admin123") {
        user.role = "admin";
      }
      // Create a JWT with the user's ID and role
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "12 days" }
      );
      // Send the token in the response
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  loginUser,
};
