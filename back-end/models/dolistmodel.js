const connect = require('./connection');

const create = async (activity) => {
  const db = await connect();
  const { insertedId } = await db.collection('list').insertOne(activity);
  console.log({ id: insertedId });
  return {
    id: insertedId,
  };
};

module.exports = {
  create,
};
