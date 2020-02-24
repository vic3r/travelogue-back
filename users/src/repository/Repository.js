const Logger = require('../utils/Logger');

const logger = new Logger();

class Repository {
  static create(type, config) {
    try {
      // eslint-disable-next-line
      const Repo = require(`./${type}`);
      const repository = Repo.build(config);
      return repository;
    } catch (err) {
      logger.error(err);
    }

    return null;
  }

  // eslint-disable-next-line
  create(user) {
    logger.warn('method create not implemented');
  }

  // eslint-disable-next-line
  get({ userId }) {
    logger.warn('method get not implemented');
  }

  // eslint-disable-next-line
  update({ userId }, data) {
    logger.warn('method update not implemented');
  }

  // eslint-disable-next-line
  delete({ userId }) {
    logger.warn('method delete not implemented');
  }
}

module.exports = Repository;
