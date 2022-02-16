const sinon = require('sinon');
const {expect} = require('chai');
const {MongoClient} = require('mongodb');
const {getConnection} = require('../mongomockconnection');


describe('Insere um nova lista, verificar a regra de negocio', () => {
  let connectMock;

  const activityNew = 'entrevista amanhã as 15 horas';

  beforeAll(async () => {
    connectMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectMock);
  });

  afterAll(async () => {
    await connectMock.db('blitz').collection('list').drop();
    MongoClient.connect.restore();
  });

  describe('caso ocorra sucesso, devera retornar', () => {
    it('um objeto, com id e activity', async () => {
      const result = await listServ.createServ(activityNew);

      expect(result).to.be.a('object');
      expect(result).to.have.a.property('id');
      expect(result).to.have.a.property('activity');
    });
  });

  describe('caso ocorra um error', () => {
    it('caso não escrever um activity', async () => {
      const {stato, mensage}= await listServ.createServ();

      expect(mensage).to.be.equal('not exist activity');
      expect(stato).to.be.equal(200);
    });
  });
});
