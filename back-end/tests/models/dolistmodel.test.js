const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongomockconnection');

const listModel = require('../../models/dolistmodel');

describe('Insere um nova lista no BD', () => {
  let connectMock;

  const activityNew = {
    activity: 'entrevista amanhã as 15 horas',
  };

  const activityNew2 = {
    activity: 'sair com amigos',
  };

  beforeAll(async () => {
    connectMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectMock);
  });

  afterAll(async () => {
    await connectMock.db('blitz').collection('list').drop();
    MongoClient.connect.restore();
  });

  describe('Quando for um sucesso', () => {
    it('Retorna um objeto', async () => {
      const result = await listModel.create(activityNew);

      expect(result).to.be.a('object');
    });

    it('object possui id do nova lista inserida', async () => {
      const result = await listModel.create(activityNew2);

      expect(result).to.have.a.property('id');
    });
  });
});
