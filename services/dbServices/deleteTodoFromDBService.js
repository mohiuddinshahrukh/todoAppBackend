const Todo = require("../../models/todoModel");

class deleteTodoFromDBServiceClass {
  static findTodoToDelete = async (id) => {
    try {
      const todo = await Todo.findById(id);
      return todo;
    } catch (error) {
      throw error;
    }
  };
  static deleteTodoFromDB = async (id) => {
    try {
      let deletedTodo = await Todo.findByIdAndRemove(id);
      return deletedTodo;
    } catch (error) {
      throw error;
    }
  };
}
module.exports = deleteTodoFromDBServiceClass;
