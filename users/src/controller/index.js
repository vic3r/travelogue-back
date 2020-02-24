const repository = require('../repository');
const Logger = require('../utils/Logger');

const logger = new Logger();

function setController(collection, app, handler, currRepository) {
  Object.entries(handler).forEach(([handlerKey, handlerBody]) => {
    const {
      headers = {}, method, path, dataInBody, dataInParams,
    } = handlerBody;
    logger.info(`path created: /${collection}${path}`);
    app[method](`/${collection}${path}`, (req, res) => {
      req.headers = headers;

      let response;
      if (dataInBody && dataInParams) {
        response = currRepository[handlerKey](req.params, req.body);
      }
      if (dataInBody) {
        response = currRepository[handlerKey](req.body);
      }
      if (dataInParams) {
        response = currRepository[handlerKey](req.params);
      }
      if (response) {
        res.status(200).send(response);
      }

      res.status(200).send('success');
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
