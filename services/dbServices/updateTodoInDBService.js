const Todo = require("../../models/todoModel");

class updateTodoClass {
  static findTodoToUpdate = async (id) => {
    try {
      const todo = await Todo.findById(id);
      return todo;
    } catch (error) {
      throw error;
    }
  };

  static updateMyTodoInDb = async (id, body, options) => {
    try {
      const todo = await Todo.findByIdAndUpdate(id, body, options);
      return todo;
    } catch (error) {
      throw error;
    }
  };
}
module.exports = updateTodoClass;
