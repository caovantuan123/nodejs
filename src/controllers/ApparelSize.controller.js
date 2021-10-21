const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { apparelSizeService } = require('../services');

const createApparelSize = catchAsync(async (req, res) => {
  const apparelSize = await apparelSizeService.createApparelSize(req.body);
  res.status(httpStatus.CREATED).send(apparelSize);
});

const getApparelSizes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await apparelSizeService.queryApparelSizes(filter, options);
  res.send(result);
});

const getApparelSize = catchAsync(async (req, res) => {
  const apparelSize = await apparelSizeService.getApparelSizeById(req.params.apparelSizeId);
  if (!apparelSize) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ApparelSize not found');
  }
  res.send(apparelSize);
});

const updateApparelSize = catchAsync(async (req, res) => {
  const apparelSize = await apparelSizeService.updateApparelSizeById(req.params.apparelSizeId, req.body);
  res.send(apparelSize);
});

const deleteApparelSize = catchAsync(async (req, res) => {
  await apparelSizeService.deleteApparelSizeById(req.params.apparelSizeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createApparelSize,
  getApparelSizes,
  getApparelSize,
  updateApparelSize,
  deleteApparelSize,
};
