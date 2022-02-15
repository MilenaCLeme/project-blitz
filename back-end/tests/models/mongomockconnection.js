const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = new MongoMemoryServer();

const getConnection = async () => {
  const mockUrl = await server.getUri();
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  return MongoClient.connect(mockUrl, options);
};

module.exports = { getConnection };
