const express = require("express");
const getMyTodos = require("../controllers/todos/getMyTodosController");
const createATodo = require("../controllers/todos/createATodoController");
const updateMyTodo = require("../controllers/todos/updateMyTodoController");
const deleteATodo = require("../controllers/todos/deleteATodoController");
const router = express.Router();

router.get("/", getMyTodos);
router.post("/", createATodo);
router.put("/:id", updateMyTodo);
router.delete("/:id", deleteATodo);

module.exports = router;
