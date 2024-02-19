const UserModel = require('../models/userModel');
const httpStatusCode = require('../constant/httpStatusCode');

const AddTask = async (req, res) => {
  try {
    const { taskName, completed, tags } = req.body;
    const userId = req.user._id; // Assuming you have middleware to extract user from request
    // const userId = '65d322d0f53f99e43aaaf8f6';
    // Find the user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    // Add task to user's tasks array
    user.tasks.push({ taskName, completed, tags });
    await user.save();

    return res.status(httpStatusCode.CREATED).json({
      success: true,
      message: "Task added successfully",
      task: user.tasks[user.tasks.length - 1], // Return the added task
    });
  } catch (error) {
    console.error("Error adding task:", error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};
const Edit = async (req, res) => {
  try {
    const { taskName } = req.body;
    const user = req.user._id;


  } catch (error) {
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong!",
      error: error.message
    })
  }
}

module.exports = { AddTask };
