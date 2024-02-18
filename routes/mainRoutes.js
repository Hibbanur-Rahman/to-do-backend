const Router=require("express").Router();
const {register, login}=require('../controller/adminController');
const { UserRegister } = require("../controller/userController");

Router.post("/register",register);
Router.post("/login",login);


Router.post('/user-Register',UserRegister);
module.exports= Router;