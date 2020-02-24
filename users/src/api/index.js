const express = require('express');
const bodyParser = require('body-parser');

const controller = require('../controller');
const handlers = require('./handlers');
const Logger = require('../utils/Logger');

const logger = new Logger();

const app = express();

const start = (config) => {
  const { host = 'localhost', port = 8000 } = config;

  app.use(bodyParser.json());
  controller.setHandlers(handlers, app, config);

  app.listen(port, host, () => {
    logger.info(`server listening on ${host}:${port}`);
  });
};

module.exports = start;
