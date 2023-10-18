const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: 'success',
    token: token,
    data: {
      user: newUser,
    },
  });
});

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  //check if email or password is exist
  if (!email || !password) {
    next(new AppError('Please provide email or password', 400));
  }

  //check if user exists && password is correct
  const user = User.findOne({ email });

  //if everything is ok , send token to client
  const token = '';
  res.status(200).json({
    status: 'success',
    token,
  });
};
