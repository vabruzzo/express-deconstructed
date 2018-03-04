const bodyParser = (req, res, next) => {
  req.body = { fake: 1, mock: 2 };
  console.log(`parsed json body: ${req.body}`);
  next();
};

bodyParser.json = () => {};

module.exports = bodyParser;
