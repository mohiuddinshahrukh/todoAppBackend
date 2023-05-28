const express = require("express");
const router = express.Router();
const {
  getMyTodos,
  createATodo,
  updateMyTodo,
  deleteATodo,
} = require("../controllers/todoController");

// router.get("/", getMyTodos);
// router.post("/", createATodo);
// Cleaner version of the above code
// ---------------------------------

router.route("/").get(getMyTodos).post(createATodo);

router.route("/:id").put(updateMyTodo).delete(deleteATodo);

// ---------------------------------
// Cleaner version of the below code
// router.put("/:id", updateMyTodo);
// router.delete("/:id", deleteATodo);
module.exports = router;
