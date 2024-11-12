const express = require('express');
const resetRouter = express.Router();
const userModel = require('../models/Users.models');  // Ensure you have the correct model for the user
const { hashPassword } = require('../utils/Auth.utils');  // You can use bcrypt or any hashing function

// POST request to reset password
resetRouter.post("/", async (req, res) => {
  const { email, newPassword } = req.body;

  // Validate if both email and newPassword are provided
  if (!email || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Please provide both email and new password."
    });
  }

  try {
    // Find the user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account does not exist. Please create an account to continue."
      });
    }

    // Hash the new password before saving it
    const hashedPassword = await hashPassword(newPassword);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully!"
    });

  } catch (err) {
    console.error("Error resetting password:", err);
    return res.status(500).json({
      success: false,
      message: "Error resetting password.",
      error: err.message
    });
  }
});

module.exports = resetRouter;
