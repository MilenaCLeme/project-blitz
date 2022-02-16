const model = require('../models/dolistmodel');
const error = require('../usefull/error');

const createServ = async (activity) => {
  if (activity === undefined) return error(404, 'not exist activity');

  const createModel = await model.create(activity);

  return createModel;
};

const findAllServ = async () => {
  const findAllModel = await model.findAll();

  return findAllModel;
};

module.exports = {
  createServ,
  findAllServ,
};
