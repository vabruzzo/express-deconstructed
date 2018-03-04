# express, deconstructed

## what is this?

I wanted to explain what's going on under the hood in express. This small project is the result of that desire. It includes:

1. `index.js`: a minimal (fake) express app that would work properly if you simply change the fake node module imports to their corresponding actual versions.
2. `routeHandler.js`: a simple route handler middleware that logs the current route being handled and then responds to the client via `res.json()`.
3. `fake_node_modules/logger.js` & `fake_node_modules/bodyParser.js`: middlewares to log some information about the current request, and to parse the body of the request. The app currently just fakes the body parsing by attaching the same basic json object to req.body.
4. `fake_node_modules/express.js`: a fake, extremely naive implementation of what's going on under the hood of an express app, at a really high level. This fake version swaps out the http module for the readline module and simulates http request by entering string into the command line prompt.