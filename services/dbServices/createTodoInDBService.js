const Todo = require("../../models/todoModel");

const createTodoInDb = async (title) => {
  let todo = await Todo.create({
    title: title,
  });
  return todo;
};

module.exports = createTodoInDb;
