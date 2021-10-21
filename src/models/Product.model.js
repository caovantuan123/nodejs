const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    productname: {
      type: String,
      required: true,
      trim: true,
    },
    otherdata: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * @typedef User
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
