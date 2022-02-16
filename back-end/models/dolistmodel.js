const connect = require('./connection');

const create = async (activity) => {
  const db = await connect();
  const {insertedId} = await db.collection('list').insertOne({activity});
  return {
    id: insertedId,
    activity,
  };
};

module.exports = {
  create,
};
