const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let isValidUser = false;
  try {
    isValidUser = email === process.env.email;
  } catch (err) {
    return next({
      status: 500,
      message:
        "Could not log you in, please check your credentials and try again.",
    });
  }
  console.log(email);
  console.log(process.env.email);

  if (!isValidUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next({
      status: 403,
      message: "Invalid credentials, could not log you in.",
    });
  }

  let isValidPassword = false;
  try {
    isValidPassword = password === process.env.password;
  } catch (err) {
    return next({
      status: 500,
      message:
        "Could not log you in, please check your credentials and try again.",
    });
  }

  if (!isValidPassword) {
    return next({
      status: 403,
      message: "Invalid credentials, could not log you in.",
    });
  }

  let token;
  try {
    token = jwt.sign({ email: email }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
  } catch (err) {
    return next({
      status: 500,
      message: "Logging in failed, please try again later.",
    });
  }

  res.json({
    email: email,
    token: token,
  });
};

exports.login = login;
