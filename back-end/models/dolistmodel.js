const connect = require('./connection');

const create = async (activity) => {
  const db = await connect.connection();
  const {insertedId} = await db.collection('list').insertOne({activity});
  return {
    id: insertedId,
    activity,
  };
};

const findAll = async () => {
  const db = await connect.connection();
  const result = await db.collection('list').find().toArray();
  return result;
};

const update = async (id, activity) => {
  const db = await connect.connection();
  await db.collection('list')
      .updateOne({id}, {$set: {activity}});
  return {
    id,
    activity,
  };
};

const delete = async (id) => {

}

module.exports = {
  create,
  findAll,
  update,
  delete
};
