const Router = require("express").Router();
const { register, login, ViewUser } = require("../controller/userController");
const { AddTask, ViewTask, UpdateCompleted } = require('../controller/taskController');
const { verifyToken } = require("../middleware/authMiddleware");

Router.post("/register", register);
Router.post("/login", login);
Router.post('/add-Task', verifyToken, AddTask);
Router.get('/view-Task', verifyToken, ViewTask);
Router.post('/update-completed', verifyToken, UpdateCompleted);
Router.get('/fetch-user', verifyToken, ViewUser);
module.exports = Router;