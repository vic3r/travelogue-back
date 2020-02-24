module.exports = {
  host: 'localhost',
  port: 8000,
  repository: {
    type: 'mongo',
    host: 'localhost',
    port: 27017,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'travelogue-users',
  },
};
