const express = require("express");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next({ status: 403, message: "Authentication failed!" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (err) {
    return next({ status: 403, message: "Authentication failed!" });
  }
};
