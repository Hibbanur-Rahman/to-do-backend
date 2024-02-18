const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const TaskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: String,
    required: false
  },
}, { timestamps: true });

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    tasks: [TaskSchema], // Array of tasks
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", UserSchema);
