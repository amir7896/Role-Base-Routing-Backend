const User = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const userAccess = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "User Role Access!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const managerAccess = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "Manager Role Access!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const serviceProviderAccess = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "Service Provider Role Access!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const adminAndManagerAccess = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "Admin And Manager Role Access!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getUsers, // for admin
  userAccess, // for user
  managerAccess, // for manager
  serviceProviderAccess, // for service provider
  adminAndManagerAccess, // for admin and manager
};
