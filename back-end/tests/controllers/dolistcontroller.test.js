const sinon = require('sinon');
const {expect} = require('chai');

const listServ = require('../../services/dolistservices');
const listControl = require('../../controllers/dolistcontrollers');

describe('Insere um nova lista, verificar resposta', () => {
  describe('caso ocorra sucesso, devera retornar', () => {
    const resp = {};
    const req = {};

    beforeAll(() => {
      req.body = {
        activity: 'ir a loja as 5 horas',
      };

      resp.status = sinon.stub().returns(resp);
      resp.json = sinon.stub().returns();

      const id = '604cb554311d68f491ba5781';
      const activity = 'ir a loja as 5 horas';

      sinon.stub(listServ, 'createServ').resolves({id, activity});
    });

    afterAll(() => {
      sinon.restore();
    });

    it('chama o status 201 e a resposta é um criado com sucesso', async () => {
      const sucesso = 'criado com sucesso';
      await listControl.createContr(req, resp);

      expect(resp.status.calledWith(201)).to.be.equal(true);
      expect(resp.json.calledWith({message: sucesso})).to.be.equal(true);
    });
  });

  describe('caso ocorra um erro', () => {
    const resp = {};
    const req = {};

    beforeAll(() => {
      req.body = {};

      resp.status = sinon.stub().returns(resp);
      resp.json = sinon.stub().returns();

      const status = 401;
      const message = 'not exist activity';

      sinon.stub(listServ, 'createServ').resolves({status, message});
    });

    afterAll(() => {
      sinon.restore();
    });

    it('chama o status 401 e a resposta é not exist activity', async () => {
      const erro = 'not exist activity';
      await listControl.createContr(req, resp);

      expect(resp.status.calledWith(401)).to.be.equal(true);
      expect(resp.json.calledWith({message: erro})).to.be.equal(true);
    });
  });
});

describe('gerar a lista de todas as tarefas', () => {
  describe('caso ocorra sucesso, devera retornar', () => {
    const resp = {};
    const req = {};

    beforeAll(() => {
      req.body = {};

      resp.status = sinon.stub().returns(resp);
      resp.json = sinon.stub().returns();

      sinon.stub(listServ, 'findAllServ').resolves([]);
    });

    afterAll(() => {
      sinon.restore();
    });

    it('chama o status 201 e a resposta o array', async () => {
      await listControl.findAllContr(req, resp);

      expect(resp.status.calledWith(201)).to.be.equal(true);
      expect(resp.json.calledWith([])).to.be.equal(true);
    });
  });
});
