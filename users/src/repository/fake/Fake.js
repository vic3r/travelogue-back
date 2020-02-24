const Repository = require('../Repository');
const Logger = require('../../utils/Logger');

const logger = new Logger();

class Fake extends Repository {
  constructor(config) {
    super();
    logger.info(config);
  }

  // eslint-disable-next-line
  create(user) {
    logger.info('fake create implementation');
  }

  // eslint-disable-next-line
  get({ userId }) {
    logger.info('fake get implementation');
  }

  // eslint-disable-next-line
  update({ userId }, data) {
    logger.info('fake update implementation');
  }

  // eslint-disable-next-line
  delete({ userId }) {
    logger.info('fake delete implementation');
  }
}

module.exports = Fake;
