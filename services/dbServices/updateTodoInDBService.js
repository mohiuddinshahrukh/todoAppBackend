const Todo = require("../../models/todoModel");

class updateTodoClass {
  static findTodoToUpdate = async (id) => {
    const todo = await Todo.findById(id);
    return todo;
  };

  static updateMyTodoInDb = async (id, body, options) => {
    const todo = await Todo.findByIdAndUpdate(id, body, options);
    return todo;
  };
}
module.exports = updateTodoClass;
