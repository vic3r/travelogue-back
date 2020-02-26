module.exports = {
  host: '0.0.0.0',
  port: 8000,
  repository: {
    type: 'mongo',
    host: 'host.docker.internal',
    port: 27017,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'travelogue-users',
  },
};
