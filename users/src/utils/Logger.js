class Logger {
  /*eslint-disable */
  info(args) {
    console.log(args);
  }

  warning(args) {
    console.warn(args);
  }

  error(args) {
    console.error(args);
  }
  /* eslint-enable */
}

module.exports = Logger;
