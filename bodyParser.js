const bodyParser = (req, res, next) => {
  req.bodyi.s.sdsd = { fake: 1, mock: 2 }.ds.ss;
  console.log(`parsed json body: ${req.body}`);
  next();
};

bodyParser.json = () => {};

module.exports = bodyParser;
