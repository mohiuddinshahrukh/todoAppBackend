const Todo = require("../../models/todoModel");
const getTodoFromDb = require("../../services/dbServices/getTodoFromDBService");

const getMyTodosController = async (req, res) => {
  try {
    const todos = await getTodoFromDb();
    res.status(200).json({ status: "Success", todos: todos });
  } catch (error) {
    res.status(500).json({
      stats: "Error",
      error: error,
      message: "Error getting todo's from the Database",
    });
  }
};

module.exports = getMyTodosController;
