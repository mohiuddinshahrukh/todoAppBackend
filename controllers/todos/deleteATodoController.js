const deleteTodoFromDBServiceClass = require("../../services/dbServices/deleteTodoFromDBService");

const deleteATodoController = async (req, res) => {
  try {
    const todo = await deleteTodoFromDBServiceClass.findTodoToDelete(
      req.params.id
    );
    if (!todo) {
      res.status(400).json({
        status: "Error",
        message: `No todo exists against given ID: ${req.params.id}`,
      });
    }

    const deletedTodo = await deleteTodoFromDBServiceClass.deleteTodoFromDB(
      req.params.id
    );
    res.status(200).json({
      status: "Success",
      deletedTodo: deletedTodo,
      message: "Todo deleted successfully",
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
};

module.exports = deleteATodoController;
