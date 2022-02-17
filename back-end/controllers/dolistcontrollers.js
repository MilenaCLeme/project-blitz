const service = require('../services/dolistservices');

const createContr = async (req, res) => {
  const {activity} = req.body;
  const serviceC = await service.createServ(activity);
  if (serviceC.status) {
    const {status, message} = serviceC;
    return res.status(status).json({message: message});
  };
  return res.status(201).json({message: 'criado com sucesso'});
};

const findAllContr = async (_req, res) => {
  const serviceFind = await service.findAllServ();

  return res.status(201).json(serviceFind);
};

module.exports = {
  createContr,
  findAllContr,
};
