// When we use mongoose with these controllers, we get a promise
// Hence we will have to use async and await.
// Express-async-handler is a middleware that handles our async calls

const asyncHandler = require("express-async-handler");
// Now we can wrap our controllers in the async handler and all done.

// @desc get user todos
// @route GET/api/getMyTodos
// @access Private
const getMyTodos = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: 200,
    data: data1,
    message: "List of all user to-do's",
  });
});

// @desc Create user todo
// @route POST/api/createTodo
// @access Private

const createATodo = (req, res) => {
  try {
    console.log(req.body);
    if (req.body) {
      res.status(201).json({
        status: 200,
        data: [{}],
        message: "New to-do added. List of all user to-do's returned",
      });
    } else {
      res.json({
        error: "The request doesn't contain a body",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// @desc edit user todo
// @route PUT/api/updateMyTodo/:id
// @access Private
const updateMyTodo = () => {
  try {
    res.status(200).json({
      message: `Update goal ${req.params.id}`,
    });
  } catch (error) {
    console.log(error);
  }
};
// @desc Delete user todos
// @route DELETE/api/deleteMyTodos/:id
// @access Private
const deleteATodo = () => {
  try {
    res.status(200).json({
      message: `Delete goal ${req.params.id}`,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getMyTodos,
  createATodo,
  updateMyTodo,
  deleteATodo,
};
