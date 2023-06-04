const Todo = require("../../models/todoModel");

const createTodoInDb = async (title) => {
  try {
    let todo = await Todo.create({
      title: title,
    });
    return todo;
  } catch (error) {
    throw error;
  }
};

module.exports = createTodoInDb;
