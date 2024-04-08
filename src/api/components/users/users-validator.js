const joi = require('joi');

module.exports = {
  createUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
      password: joi.string().min(6).max(32).required().label('Password'),
      confirm_password: joi
        .string()
        .min(6)
        .max(32)
        .required()
        .label('Password Correct'),
    },
  },

  updateUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
    },
  },
  changePass: {
    body: {
      password_before: joi.string().required().label('Password Before'),
      password_after: joi
        .string()
        .min(6)
        .max(32)
        .required()
        .label('New Password'),
      confirm_password: joi
        .string()
        .min(6)
        .max(32)
        .required()
        .label('confirmpass'),
    },
  },
};
