const httpStatus = require('http-status');
const { ApparelSize } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a apparelSize
 * @param {Object} apparelSizeBody
 * @returns {Promise<ApparelSize>}
 */
const createApparelSize = async (apparelSizeBody) => {
  return ApparelSize.create(apparelSizeBody);
};

/**
 * Query for apparelSizes
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryApparelSizes = async (filter, options) => {
  const apparelSizes = await ApparelSize.paginate(filter, options);
  return apparelSizes;
};

/**
 * Get apparelSize by id
 * @param {ObjectId} id
 * @returns {Promise<ApparelSize>}
 */
const getApparelSizeById = async (id) => {
  return ApparelSize.findById(id);
};

/**
 * Get apparelSize by email
 * @param {string} email
 * @returns {Promise<ApparelSize>}
 */
const getApparelSizeByEmail = async (email) => {
  return ApparelSize.findOne({ email });
};

/**
 * Update apparelSize by id
 * @param {ObjectId} apparelSizeId
 * @param {Object} updateBody
 * @returns {Promise<ApparelSize>}
 */
const updateApparelSizeById = async (apparelSizeId, updateBody) => {
  const apparelSize = await getApparelSizeById(apparelSizeId);
  if (!apparelSize) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ApparelSize not found');
  }
  if (updateBody.email && (await ApparelSize.isEmailTaken(updateBody.email, apparelSizeId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(apparelSize, updateBody);
  await apparelSize.save();
  return apparelSize;
};

/**
 * Delete apparelSize by id
 * @param {ObjectId} apparelSizeId
 * @returns {Promise<ApparelSize>}
 */
const deleteApparelSizeById = async (apparelSizeId) => {
  const apparelSize = await getApparelSizeById(apparelSizeId);
  if (!apparelSize) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ApparelSize not found');
  }
  await apparelSize.remove();
  return apparelSize;
};

module.exports = {
  createApparelSize,
  queryApparelSizes,
  getApparelSizeById,
  getApparelSizeByEmail,
  updateApparelSizeById,
  deleteApparelSizeById,
};
