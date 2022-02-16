const model = require('../models/dolistmodel');
const error = require('../usefull/error');

const createServ = async (activity) => {
  if (activity === undefined) return error(404, 'not exist activity');

  const createModel = await model.create(activity);

  return createModel;
};

module.exports = {
  createServ,
};
