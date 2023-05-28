// When we use mongoose with these controllers, we get a promise
// Hence we will have to use async and await.
// Express-async-handler is a middleware that handles our async calls

const asyncHandler = require("express-async-handler");
// Now we can wrap our controllers in the async handler and all done.

const Todo = require("../models/todoModel");
// @desc get user todos
// @route GET/api/getMyTodos
// @access Private
const getMyTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});

// @desc Create user todo
// @route POST/api/createTodo
// @access Private

const createATodo = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("To do title is required!");
  }

  const todo = await Todo.create({
    title: req.body.title,
  });

  res.status(201).json(todo);
});
// @desc edit user todo
// @route PUT/api/updateMyTodo/:id
// @access Private
const updateMyTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400);
    throw new Error("To do not found!");
  }
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTodo);
});
// @desc Delete user todos
// @route DELETE/api/deleteMyTodos/:id
// @access Private
const deleteATodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400);
    throw new Error("To do not found");
  }
  const deletedTodo = await Todo.findByIdAndRemove(req.params.id);
  res.status(200).json(deletedTodo);
});

module.exports = {
  getMyTodos,
  createATodo,
  updateMyTodo,
  deleteATodo,
};
