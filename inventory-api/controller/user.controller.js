const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../model/user");

const SecretKey = require("../config/config");

const Joi = require("@hapi/joi");
const userService = require("../service/user.service");

module.exports = {
  Login: (req, res, next) => {
    userService
      .login(req.body.user_name)
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.json({
            success: 0,
            message: 'Invalid Username or Password...'
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.json({
              success: false,
              message: 'Invalid Username or Password...'
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                user_name: user[0].user_name,
                email: user[0].email,
                userId: user[0]._id
              },
              SecretKey.JWT_kEY,
              {
                expiresIn: "1h"
              }
            );
            return res.status(200).json({
              success: true,
              message: "Auth Successful",
              Token: token
            });
          }
          res.status(404).json({
            success: false,
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  },

  Signup: (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        const user = new User({
          user_name: req.body.user_name,
          email: req.body.email,
          password: hash
        });
        userService
          .signUp(user)
          .then(result => {
            res.status(201).json({
              message: "User Signup Successful",
              success: true
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err,
              success: false,
              message: 'signup failed'
            });
          });
      }
    });
  },
  Delete: (req, res, next) => {
    const id = req.params.userId;
    userService
      .delete(id)
      .exec()
      .then(result => {
        if (result) {
          return res.json({
            success: true,
            message: "user deleted"
          });
        } else {
          return res.json({
            success: false,
            message: "Error occured while deleting product"
          });
        }
      })
      .catch(err => {
        console.log(err);
        return res.json({
          success: false,
          message: "Error occured while deleting new product"
        });
      });
  }
};
