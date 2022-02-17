const sinon = require('sinon');
const {expect} = require('chai');

const model = require('../../models/dolistmodel');
const listServ = require('../../services/dolistservices');

describe('Insere um nova lista, verificar a regra de negocio', () => {
  const activityNew = 'entrevista amanhã as 15 horas';

  beforeAll(() => {
    const id = '604cb554311d68f491ba5781';

    sinon.stub(model, 'create').resolves({id, activity: activityNew});
  });

  afterAll(() => {
    sinon.restore();
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
      const results = await listServ.createServ();

      expect(results).to.have.a.property('status');
      expect(results).to.have.a.property('message');
    });
  });
});

describe('gerar a lista de todas as tarefas', () => {
  beforeAll(() => {
    sinon.stub(model, 'findAll').resolves([]);
  });

  afterAll(() => {
    sinon.restore();
  });

  describe('caso ocorra sucesso, devera retornar', () => {
    it('um array', async () => {
      const result = await listServ.findAllServ();

      expect(result).to.be.a('array');
    });
  });
});
