const connect = require('./connection');

const create = async (activity) => {
  const db = await connect();
  const {insertedId} = await db.collection('list').insertOne({activity});
  return {
    id: insertedId,
    activity,
  };
};

const findAll = async () => {
  const db = await connect();
  const result = await db.collection('list').find().toArray();
  return result;
};

module.exports = {
  create,
  findAll,
};
