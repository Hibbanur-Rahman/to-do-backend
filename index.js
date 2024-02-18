const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { dbConnection } = require("./configs/db");

require("dotenv").config();

const mainRoutes = require("./routes/mainRoutes");

const { MONGO_URL, PORT } = process.env;

const app = express();

// Connect to the database
dbConnection(MONGO_URL);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5174");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Routes
app.use("/", mainRoutes);

const port = PORT || 5000;
app.listen(port , (e) => {
  console.log(`The app is running on http://localhost:${port}`);
});
