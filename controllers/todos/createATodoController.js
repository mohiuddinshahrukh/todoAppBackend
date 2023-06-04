const asyncErrorHandler = require("express-async-handler");
const Todo = require("../../models/todoModel");
const createTodoInDb = require("../../services/dbServices/createTodoInDBService");

const createATodoController = asyncErrorHandler(async (req, res) => {
  try {
    if (!req.body.title) {
      res.status(400).json({
        status: "Error",
        message: `Title should not be empty`,
      });
    } else if (typeof req.body.title !== "string") {
      res.status(400).json({
        status: "Error",
        message: `Typeof title should be string only & not: ${typeof req.body
          .title}`,
      });
    } else {
      const todo = await createTodoInDb(req.body.title);
      res.status(201).json({
        status: "Success",
        todo: todo,
        message: "Todo created successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Error",
      error: error,
      message: `You have encountered the following error: ${error}`,
    });
  }
});

module.exports = createATodoController;
