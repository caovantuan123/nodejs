const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { tuanService } = require('../services');

const createTuan = catchAsync(async (req, res) => {
  const tuan = await tuanService.createTuan(req.body);
  res.status(httpStatus.CREATED).send(tuan);
});

const getTuans = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await tuanService.queryTuans(filter, options);
  res.send(result);
});

const getTuan = catchAsync(async (req, res) => {
  const tuan = await tuanService.getTuanById(req.params.tuanId);
  if (!tuan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tuan not found');
  }
  res.send(tuan);
});

const updateTuan = catchAsync(async (req, res) => {
  const tuan = await tuanService.updateTuanById(req.params.tuanId, req.body);
  res.send(tuan);
});

const deleteTuan = catchAsync(async (req, res) => {
  await tuanService.deleteTuanById(req.params.tuanId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTuan,
  getTuans,
  getTuan,
  updateTuan,
  deleteTuan,
};
