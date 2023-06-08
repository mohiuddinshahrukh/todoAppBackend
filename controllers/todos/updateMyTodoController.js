const { connected } = require("../../config/db");
const Todo = require("../../models/todoModel");
const updateTodoClass = require("../../services/dbServices/updateTodoInDBService");
// COnnection check in all crud

const updateMyTodoController = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({
        status: "Error",
        message: `ID is required to find a todo`,
      });
    } else if (!req.body) {
      res.status(400).json({
        status: "Error",
        message: `Body is required to update todo`,
      });
    } else {
      const todo = await updateTodoClass.findTodoToUpdate(req.params.id);
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

      if (JSON.stringify(req.body) != JSON.stringify(updatedTodo)) {
        res.status(200).json({
          status: "Success",
          updatedTodo: updatedTodo,
          message: "Todo updated successfully",
        });
      } else {
        res.status(400).json({
          status: "Error",
          message: `The requested todo ID: ${req.params.id} could'nt be updated.`,
        });
      }
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({
        status: "Error",
        message: `The provided ID: ${req.params.id} is of incorrect length and/or format.`,
        error: error,
      });
    }
  }
};

module.exports = updateMyTodoController;
