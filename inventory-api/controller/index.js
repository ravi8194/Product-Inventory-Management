var express = require("express");
var router = express.Router();
const userController = require("../controller/user.controller");
var productController = require("./product.controller");
const checkAuth = require("../middleware/check-auth");
const productValidate = require("../middleware/productValidation.middleware")
  .productValidate;
const userValidate = require("../middleware/userValidation.middleware");

router.get("", productController.list);
router.post("/update/:id", checkAuth, productValidate, productController.update);

router.post("/add", checkAuth, productValidate, productController.create);

router.delete("/delete/:id", checkAuth, productController.delete);

router.get("/detail/:id", productController.getById);

router.post("/signup", userValidate.signupValidation, userController.Signup);

router.post("/login", userValidate.loginValidation, userController.Login);

router.delete("/:userId", userController.Delete);

module.exports = router;
