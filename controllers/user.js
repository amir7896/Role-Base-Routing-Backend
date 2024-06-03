const User = require("../models/user");
const authService = require("../services/authService");

const registerUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await authService.generateHashPassword(password);

    const newUser = new User({
      userName,
      email,
      role,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: savedUser,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (
      !user ||
      !(await authService.comparePasswords(password, user.password))
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const payload = {
      userId: user._id,
      email: user.email,
      roles: user.roles,
      username: user.userName,
    };

    const expiresIn = "10h";
    const token = await authService.generateJwtToken(payload, expiresIn);

    // Send the token as part of the response
    res.status(200).json({
      success: true,
      message: "Login successfully",
      user: payload,
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
