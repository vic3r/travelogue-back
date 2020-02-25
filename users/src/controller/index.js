const repository = require('../repository');
const Logger = require('../utils/Logger');

const logger = new Logger();

function setController(collection, app, handler, currRepository) {
  Object.entries(handler).forEach(([handlerKey, handlerBody]) => {
    const {
      method, path, dataInBody, dataInParams,
    } = handlerBody;
    logger.info(`path created: /${collection}${path} => ${method.toUpperCase()}`);
    app[method](`/${collection}${path}`, (req, res) => {
      if (dataInBody && dataInParams) {
        currRepository[handlerKey](req.params, req.body)
          .then((msg) => res.status(200).json(msg))
          .catch((err) => res.status(500).send(err));
      } else if (dataInBody) {
        currRepository[handlerKey](req.body)
          .then((msg) => res.status(200).json({ id: msg }))
          .catch((err) => res.status(500).send(err));
      } else if (dataInParams) {
        currRepository[handlerKey](req.params)
          .then((msg) => res.status(200).json(msg))
          .catch((err) => res.status(404).send(err));
      } else {
        res.status(400).send('Bad Request');
      }
    });
  });
}

const setHandlers = (handlers, app, config) => {
  Object.entries(handlers).forEach(([collection, handler]) => {
    const repositoryConfig = { ...config.repository, collection };
    repository.create(repositoryConfig).then((currRepository) => {
      setController(collection, app, handler, currRepository);
    });
  });
};

module.exports = {
  setHandlers,
};
