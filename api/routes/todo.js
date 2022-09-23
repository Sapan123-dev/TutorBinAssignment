const express = require("express");
const router = express.Router();
const todoControllers = require("../controllers/todo-controllers");
const checkUser = require("../middleware/checkUser");
const Todo = require("../models/todo");

router.get("/", todoControllers.getTodos);

router.post("/", todoControllers.createTodo);

router.patch("/:id", checkUser, todoControllers.updateTodo);

router.delete("/:id", checkUser, todoControllers.deleteTodo);

module.exports = router;
