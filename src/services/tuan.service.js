const httpStatus = require('http-status');
const { Tuan } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a tuan
 * @param {Object} tuanBody
 * @returns {Promise<Tuan>}
 */
const createTuan = async (tuanBody) => {
  if (await Tuan.isEmailTaken(tuanBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Tuan.create(tuanBody);
};

/**
 * Query for tuans
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTuans = async (filter, options) => {
  const tuans = await Tuan.paginate(filter, options);
  return tuans;
};

/**
 * Get tuan by id
 * @param {ObjectId} id
 * @returns {Promise<Tuan>}
 */
const getTuanById = async (id) => {
  return Tuan.findById(id);
};

/**
 * Get tuan by email
 * @param {string} email
 * @returns {Promise<Tuan>}
 */
const getTuanByEmail = async (email) => {
  return Tuan.findOne({ email });
};

/**
 * Update tuan by id
 * @param {ObjectId} tuanId
 * @param {Object} updateBody
 * @returns {Promise<Tuan>}
 */
const updateTuanById = async (tuanId, updateBody) => {
  const tuan = await getTuanById(tuanId);
  if (!tuan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tuan not found');
  }
  if (updateBody.email && (await Tuan.isEmailTaken(updateBody.email, tuanId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(tuan, updateBody);
  await tuan.save();
  return tuan;
};

/**
 * Delete tuan by id
 * @param {ObjectId} tuanId
 * @returns {Promise<Tuan>}
 */
const deleteTuanById = async (tuanId) => {
  const tuan = await getTuanById(tuanId);
  if (!tuan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tuan not found');
  }
  await tuan.remove();
  return tuan;
};

module.exports = {
  createTuan,
  queryTuans,
  getTuanById,
  getTuanByEmail,
  updateTuanById,
  deleteTuanById,
};
