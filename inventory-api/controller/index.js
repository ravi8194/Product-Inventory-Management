var express = require("express");
var router = express.Router();
const userController = require("../controller/user.controller");
var controller = require("./product.controller");
const checkAuth = require("../middleware/check-auth");
const productValidate = require("../middleware/productValidation.middleware")
  .productValidate;
const userValidate = require("../middleware/userValidation.middleware");

router.get("", controller.list);
router.post("/update/:id", checkAuth, productValidate, controller.update);

router.post("/add", checkAuth, productValidate, controller.create);

router.delete("/delete/:id", checkAuth, controller.delete);

router.get("/detail/:id", controller.getById);

router.post("/signup", userValidate.signupValidation, userController.Signup);

router.post("/login", userValidate.loginValidation, userController.Login);

router.delete("/:userId", userController.Delete);

module.exports = router;
