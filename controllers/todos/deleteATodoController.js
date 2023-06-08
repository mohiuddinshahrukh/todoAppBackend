const { connected } = require("../../config/db");
const deleteTodoFromDBServiceClass = require("../../services/dbServices/deleteTodoFromDBService");

const deleteATodoController = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({
        status: "Error",
        message: `ID is required to delete a todo`,
      });
    } else {
      const todo = await deleteTodoFromDBServiceClass.findTodoToDelete(
        req.params.id
      );
      if (!todo) {
        res.status(400).json({
          status: "Error",
          message: `No todo exists against given ID: ${req.params.id}`,
        });
      } else {
        const deletedTodo = await deleteTodoFromDBServiceClass.deleteTodoFromDB(
          req.params.id
        );
        if (!deletedTodo) {
          res.status(500).json({
            status: "Error",
            message: "Todo couldn't be deleted due to a server side error",
          });
        } else {
          res.status(200).json({
            status: "Success",
            deletedTodo: deletedTodo,
            message: "Todo deleted successfully",
          });
        }
      }
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({
        status: "Error",
        message: `The provided ID: ${req.params.id} is of incorrect length and/or format.`,
        error: error,
      });
    } else {
      res.status(400).json({
        status: "Error",
        message: `You have faced the following error: ${error}`,
        error: error,
      });
    }
  }
};

module.exports = deleteATodoController;
