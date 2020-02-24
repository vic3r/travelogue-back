const Repository = require('./Repository');

const MONGO = 'MONGO';
const FAKE = 'FAKE';

const IMPLEMENTATIONS = [MONGO, FAKE];
const repositories = {};

const create = (config) => {
  const { type } = config;
  const repoType = type.toUpperCase();

  if (repositories[repoType]) {
    return repositories[repoType];
  }

  if (IMPLEMENTATIONS.includes(repoType)) {
    repositories[repoType] = Repository.create(repoType, config);
  } else {
    repositories[repoType] = Repository.create(FAKE);
  }

  return repositories[repoType];
};

module.exports = {
  create,
};
