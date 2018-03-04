# express, deconstructed

## what is this?

I wanted to explain what's going on under the hood in express. This small project is the result of that desire. It includes:

1.  `index.js`: a minimal (fake) express app that would work properly if you simply change the fake node module imports to their corresponding actual versions.
2.  `routeHandler.js`: a simple route handler middleware that logs the current route being handled and then responds to the client via `res.json()`.
3.  `fake_node_modules/logger.js` & `fake_node_modules/bodyParser.js`: middlewares to log some information about the current request, and to parse the body of the request. The app currently just fakes the body parsing by attaching the same basic json object to `req.body`.
4.  `fake_node_modules/express.js`: a fake, extremely naive implementation of what's going on under the hood of an express app, at a really high level. This naive implementation swaps out the `http` module for the `readline` module and simulates http requests by entering strings into the command line prompt.

Some takeaways this exercise is meant to illustrate:

1.  `app.use` pushes a middleware function to a stack of middlewares, each of which is called for each incoming request.
2.  the `next()` function simply sets a boolean, `processNextMiddle`, to `true`. If it's not called the next middleware never gets processed. Try removing a `next()` from one of the middlewares to see what happens. (the client never receives a response)
3.  On each simulated http request, a new instance of the request object and a new instance of the response object are create. These are passed to each middleware.
4.  The `json` method attached to the Response prototype simulates the end of a request/response cycle, at which point the client receives the response. When that method is called in the route handler there is no call of `next()`. Hence, if we `app.use()` any additional middlewares after that route handler, that middleware would never get reached (since the route handler, as we've coded it, processes all requests).
