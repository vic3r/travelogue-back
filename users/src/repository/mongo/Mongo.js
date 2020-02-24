const { MongoClient } = require('mongodb');

const Repository = require('../Repository');
const Logger = require('../../utils/Logger');

const logger = new Logger();

class Mongo extends Repository {
  constructor(collection) {
    super();
    if (typeof collection === 'undefined') {
      throw new Error('Undefined connection');
    }
    this.collection = collection;
  }

  create(user) {
    this.collection
      .insertOne(user)
      .then(() => logger.info('store succesfully'))
      .catch((err) => logger.error(err));
  }

  get({ userId }) {
    return this.collection
      .findOne({ id: userId })
      .then((response) => response.data)
      .catch((err) => logger.error(err));
  }

  update({ userId }, data) {
    this.collection
      .updateOne({ id: userId }, { $set: data })
      .then(() => logger.info('updated succesfully'))
      .catch((err) => logger.error(err));
  }

  delete({ userId }) {
    this.collection
      .deleteOne({ id: userId })
      .then(() => logger.info('deleted succesfully'))
      .catch((err) => logger.error(err));
  }

  static build(config) {
    const {
      host, port, useNewUrlParser, useUnifiedTopology, dbName, collection,
    } = config;
    const url = `mongodb://${host}:${port}`;
    return MongoClient.connect(url, { useNewUrlParser, useUnifiedTopology })
      .then((client) => client.db(dbName))
      .then((conn) => new Mongo(conn.collection(collection)))
      .catch((err) => logger.error(err));
  }
}

module.exports = Mongo;
