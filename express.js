const express = function() {
  const req = {};

  const res = {
    json: function(response) {
      console.log(`request response cycle is complete. JSON object: ${response} has been sent to client`);
    },
  };

  let processNextMiddleware = false;

  const middlewares = [];

  const use = function(...args) {
    if (args.length === 1) {
      middlewares.push(args[0]);
    } else {
      middlewares.push(args[1]);
    }
  };

  const processMiddlewares = function() {
    for (middleware of middlewares) {
      middleware(req, res, () => {
        processNextMiddleware = true;
      });

      if (processNextMiddleware) {
        processNextMiddleware = false;
      } else {
        break;
      }
    }
  };

  const listen = function(port) {
    console.log(`listening on port ${port}`);
  };

  const fakeRequest = function(request) {
    req.path = request;
    processMiddlewares();
  };

  return { use, listen, fakeRequest };
};

module.exports = express;
