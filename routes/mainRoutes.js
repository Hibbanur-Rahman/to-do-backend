const Router=require("express").Router();
const { register,login} = require("../controller/userController");
const {AddTask} =require('../controller/taskController');
const { verifyToken } = require("../middleware/authMiddleware");

Router.post("/register", register);
Router.post("/login", login);
Router.post('/add-Task',verifyToken,AddTask);
module.exports= Router;