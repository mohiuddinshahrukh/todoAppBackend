const asyncErrorHandler = require("express-async-handler");
const Todo = require("../../models/todoModel");
const updateTodoClass = require("../../services/dbServices/updateTodoInDBService");

const updateMyTodoController = asyncErrorHandler(async (req, res) => {
  try {
    const todo = await updateTodoClass.updateMyTodoInDb(req.params.id);
    if (!todo) {
      res.status(400).json({
        status: "Error",
        message: `The requested todo ID: ${req.params.id} could'nt be found.`,
      });
    }
    const updatedTodo = await updateTodoClass.updateMyTodoInDb(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: "Success",
      updatedTodo: updatedTodo,
      message: "Todo updated successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({
        status: "Error",
        message: `The provided ID: ${req.params.id} is of incorrect length and/or format.`,
        error: error,
      });
    }
  }
});

module.exports = updateMyTodoController;
