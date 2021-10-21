const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const apparelSizeSchema = mongoose.Schema(
  {
    sizecode: {
      type: String,
      required: true,
      trim: true,
    },
    sortorder: {
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
apparelSizeSchema.plugin(toJSON);
apparelSizeSchema.plugin(paginate);

/**
 * @typedef User
 */
const ApparelSize = mongoose.model('ApparelSize', apparelSizeSchema);

module.exports = ApparelSize;
