const UserModel = require('../models/userModel');
const httpStatusCode = require('../constant/httpStatusCode');

const AddTask = async (req, res) => {
  try {
    const { taskName, completed, tags } = req.body;

    console.log(req.user);
    const userId = req.user._id; // Assuming you have middleware to extract user from request

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

const EditTask = async (req, res) => {
  try {
    const { taskId, taskName, completed, tags } = req.body;
    const userId = req.user._id; // Assuming you have middleware to extract user from request

    // Find the user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the task index in the user's tasks array
    const taskIndex = user.tasks.findIndex(task => task._id === taskId);

    if (taskIndex === -1) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "Task not found",
      });
    }

    // Update task details
    user.tasks[taskIndex].taskName = taskName;
    user.tasks[taskIndex].completed = completed;
    user.tasks[taskIndex].tags = tags;

    await user.save();

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Task updated successfully",
      task: user.tasks[taskIndex], // Return the updated task
    });
  } catch (error) {
    console.error("Error editing task:", error);
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};


const ViewTask = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId);
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "user is not found",
      })
    }

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "view successfully",
      data: user.tasks,
    })
  } catch (error) {
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "something went wrong !",
      error: error.message
    })
  }
}

const UpdateCompleted = async (req, res) => {
  try {
    const { keyIndex } = req.body;
    console.log(keyIndex);

    if (!keyIndex) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Invalid or missing keyIndex value!",
      });
    }

    const userId = req.user._id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(httpStatusCode.NOT_FOUND).json({
        success: false,
        message: "User not found!",
      });
    }

    if (keyIndex < 0 || keyIndex >= user.tasks.length) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Invalid keyIndex value!",
      });
    }

    // Update the completion status of the task at the specified index
    user.tasks[keyIndex].completed = true;
    await user.save();

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Task completion status updated successfully!",
      data: user.tasks[keyIndex],
    });
  } catch (error) {
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
}

module.exports = { AddTask, EditTask, ViewTask, UpdateCompleted };
