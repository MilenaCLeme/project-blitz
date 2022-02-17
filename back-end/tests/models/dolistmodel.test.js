const sinon = require('sinon');
const {expect} = require('chai');
const {MongoClient} = require('mongodb');
const {getConnection} = require('./mongomockconnection');

const listModel = require('../../models/dolistmodel');

describe('Insere um nova lista no BD', () => {
  let connectMock;

  const activityNew = 'entrevista amanhã as 15 horas';

  const activityNewTwo = 'sair com amigos';

  beforeAll(async () => {
    connectMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectMock);
  });

  afterAll(async () => {
    sinon.restore();
  });

  describe('Quando for um sucesso', () => {
    it('Retorna um objeto', async () => {
      const result = await listModel.create(activityNew);

      expect(result).to.be.a('object');
    });

    it('object possui id do nova lista inserida', async () => {
      const result = await listModel.create(activityNewTwo);

      expect(result).to.have.a.property('id');
    });
  });
});

describe('gerar a lista de todas as tarefas', () => {
  let connectMock;

  beforeAll(async () => {
    connectMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectMock);
  });

  afterAll(async () => {
    sinon.restore();
  });

  describe('Quando for um sucesso', () => {
    it('Retorna um array', async () => {
      const result = await listModel.findAll();

      expect(result).to.be.a('array');
    });
  });
});


describe('Atualizar a tarefa no banco de dados', () => {
  let connectMock;

  const activityOld = 'entrevista amanhã as 15 horas';

  const activityNew = 'sair com amigos';

  beforeAll(async () => {
    connectMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectMock);
  });

  afterAll(async () => {
    sinon.restore();
  });

  describe('Quando for um sucesso', () => {
    it('Retorna um objeto', async () => {
      const {id} = await listModel.create(activityOld);
      const result = await listModel.update(id, activityNew);

      expect(result).to.be.a('object');
    });

    it('object possui o id antigo com a atividade atualizada', async () => {
      const {id} = await listModel.create(activityOld);
      const result = await listModel.update(id, activityNew);

      expect(result).to.have.a.property('id');
      expect(result).to.have.a.property('activity');
    });
  });
});


describe('Deletar a tarefa no banco de dados', () => {
  let connectMock;

  const activityOld = 'entrevista amanhã as 15 horas';

  beforeAll(async () => {
    connectMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectMock);
  });

  afterAll(async () => {
    sinon.restore();
  });

  describe('Quando for um sucesso', () => {
    it('Retorna um objeto', async () => {
      const {id} = await listModel.create(activityOld);
      const result = await listModel.delete(id);

      expect(result).to.be.a('object');
    });

    it('object possui o id antigo com a atividade atualizada', async () => {
      const {id} = await listModel.create(activityOld);
      const result = await listModel.delete(id);

      expect(result).to.have.a.property('id');
      expect(result).to.have.a.property('activity');
    });
  });
});
