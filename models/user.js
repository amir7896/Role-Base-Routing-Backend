const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    roles: { type: [String], default: ["User"] },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
