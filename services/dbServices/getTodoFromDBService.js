const Todo = require("../../models/todoModel");

const getTodoFromDb = async () => {
  try {
    let todo = await Todo.find();
    return todo;
  } catch (error) {
    throw error;
  }
};
module.exports = getTodoFromDb;
