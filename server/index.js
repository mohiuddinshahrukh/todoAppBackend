const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const colors = require("colors");
const { errorHandler } = require("../middlewares/errorHandlerMiddleware");
const connectDB = require("../config/db");
const port = process.env.BACKEND_PORT || 5001;

connectDB();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/todos", require("../routes/todoRoutes"));

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
