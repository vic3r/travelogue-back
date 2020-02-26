module.exports = {
  host: process.env.HOST,
  port: process.env.PORT,
  repository: {
    type: process.env.REPOSITORY.TYPE,
    host: process.env.REPOSITORY.HOST,
    port: process.env.REPOSITORY.PORT,
    useNewUrlParser: process.env.REPOSITORY.USE_NEW_URL_PARSER,
    useUnifiedTopology: process.env.REPOSITORY.USE_UNIFIED_TOPOLOGY,
    dbName: process.env.REPOSITORY.REPOSITORY.DBNAME,
  },
};
