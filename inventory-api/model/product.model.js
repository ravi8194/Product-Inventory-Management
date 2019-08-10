var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const productDataSchema = new Schema(
  {
    product_name: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true }
  },
  {
    timestamps: {
      createdAt: "created_at"
    }
  }
);

var Products = mongoose.model("product", productDataSchema);
module.exports = Products;
