const express = require("express");
const Todo = require("../models/todo");

const getTodos = async (req, res) => {
  try {
    const todo = Todo.find();
    return res.status(200).json({ todo: todo });
  } catch (err) {
    return next({ status: 400, message: "Failed to get todos" });
  }
};

const createTodo = async (req, res, next) => {
  try {
    const { task, completed } = req.body;
    const todo = new Todo({
      task: task,
      completed: completed,
    });
    await todo.save();
    return res.status(200).json({ todo: todo });
  } catch (err) {
    return next({ status: 400, message: "Failed to create todos" });
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedTodo = await Todo.updateOne(
      { _id: id },
      {
        $set: {
          task: req.body.task,
          completed: req.body.completed,
        },
      }
    );
    return res.status(200).json({ todo: updatedTodo });
  } catch (err) {
    return next({ status: 400, message: "failed to update todos" });
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Todo.findByIdAndRemove(id);
    res.status(200).send({
      message: "deleted successfully",
    });
  } catch (err) {
    return next({ status: 400, message: "Failed to delete todos" });
  }
};

exports.getTodos = getTodos;
exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
