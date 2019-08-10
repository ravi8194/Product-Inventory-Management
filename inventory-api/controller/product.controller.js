const productService = require("../service/product.service");

module.exports = {
  create: function(request, response) {
    const data = request.body;
    console.log(data);
    if (!data || data === undefined || data === null) {
      return response.json({
        success: false,
        message: "Please provide Product Information..."
      });
    }
    return productService
      .create(data)
      .then(result => {
        console.log(result);
        response.status(201).json({
          message: "Create Product Successfully",
          success: true,
          createProduct: {
            userId: result._id
          }
        });
      })
      .catch(err => {
        console.log(err);
        return response.json({
          success: false,
          message: "Error occured while creating new product"
        });
      });
  },

  list: function(req, res) {
    return productService
      .list()
      .then(result => {
        if (result.length) {
          return res.json({
            success: true,
            message: "products fetched",
            product: result.map(product => {
              return {
                id: product._id,
                product_name: product.product_name,
                price: product.price,
                rating: product.rating
              };
            })
          });
        } else {
          return res.json({
            success: true,
            product: [],
            message: "No product record found"
          });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  update: function(req, res) {
    console.log("request" + req);
    const postData = req.body;
    const productId = req.params.id;
    if (!postData || postData === undefined || postData === null) {
      return res.json({
        success: true,
        message: "Please provide prduct detail first"
      });
    }

    if (!productId) {
      return res.json({
        success: true,
        message: "Please provide product id first"
      });
    }

    return productService
      .update(productId, postData)
      .then(product => {
        if (product) {
          return res.json({
            success: true,
            message: "Product data updated",
            product: {
              id: product.id,
              product_name: product.product_name,
              price: product.price,
              rating: product.rating
            }
          });
        } else {
          return res.json({
            success: true,
            message: "Error occured while updating product"
          });
        }
      })
      .catch(function(err) {
        console.log(err);
        return res.json({
          success: false,
          message: "Error occured while updating product"
        });
      });
  },
  delete: function(req, res) {
    const productId = req.params.id;

    if (!productId) {
      return res.json({
        success: true,
        message: "Please provide product id first"
      });
    }

    return productService
      .delete(productId)
      .then(result => {
        if (result) {
          return res.json({
            success: true,
            message: "product deleted"
          });
        } else {
          return res.json({
            success: true,
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
  },
  getById: function(req, res) {
    const productId = req.params.id;
    return productService
      .getById(productId)
      .then(result => {
        if (result) {
          return res.json({
            success: true,
            product: result
          });
        } else {
          return res.json({
            success: true,
            product: [],
            message: "No product record found"
          });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
