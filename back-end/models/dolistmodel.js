const connect = require('./connection');

const create = async (activity) => {
  const db = await connect();
  const result = await db.collection('list').insertOne(activity);
  return result;
};

module.exports = {
  create,
};