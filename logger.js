const logger = (req, res, next) => {
  console.log(`${Date.now()}: ${req.path}`);
  next();
};

module.exports = logger;
