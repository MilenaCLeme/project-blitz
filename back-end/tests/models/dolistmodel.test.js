const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ConnectionCheckedInEvent } = require('mongodb');
const { getConnection } = require('./mongomockconnection');

const listModel = {
  create: () => {}
}

describe('Insere um nova lista no BD', () => {
  let connectMock;
  const activityNew = {
    activity: 'entrevista amanhã as 15 horas',
  };

  before(async() => {
    connectMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectMock);
  });

  after(async() => {
    await connectMock.db('blitz').collection('list').drop();
    MongoClient.connect.restore();
  });

  describe('Quando for um sucesso', () => {
    it('Retorna um objeto', async () => {
      const result = await listModel.create(activityNew);

      expect(result).to.be.a('object');
    });

    it('object possui um id do nova lista inserida', async () => {
      const result = await listModel.create(activityNew);

      expect(result).to.have.a.property('id');
    });
  });
});