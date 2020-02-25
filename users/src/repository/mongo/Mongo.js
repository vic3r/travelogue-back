const { ObjectId, MongoClient } = require('mongodb');

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
    return this.collection
      .insertOne(user)
      .then((result) => result.insertedId)
      .catch((err) => logger.error(err));
  }

  get({ userId }) {
    return this.collection
      .findOne({ _id: ObjectId(userId) })
      .then((response) => response)
      .catch((err) => logger.error(err));
  }

  update({ userId }, data) {
    return this.collection
      .updateOne({ _id: ObjectId(userId) }, { $set: data })
      .then(() => {
        logger.info(`user with id: ${userId} updated successfully`);
        return {};
      })
      .catch((err) => logger.error(err));
  }

  delete({ userId }) {
    return this.collection
      .deleteOne({ _id: ObjectId(userId) })
      .then(() => {
        logger.info(`user with id: ${userId} deleted successfully`);
        return {};
      })
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
