# express, deconstructed

## what is this?

I wanted to explain what's going on under the hood in express. This small project is the result of that desire. It includes:

1.  `index.js`: a minimal (fake) express app that would work properly if you simply change the fake node module imports to their corresponding actual versions.
2.  `routeHandler.js`: a simple route handler middleware that logs the current route being handled and then responds to the client via `res.json()`.
3.  `fake_node_modules/logger.js` & `fake_node_modules/bodyParser.js`: middlewares to log some information about the current request, and to parse the body of the request. The app currently just fakes the body parsing by attaching the same basic json object to `req.body`.
4.  `fake_node_modules/express.js`: a fake, extremely naive implementation of what's going on under the hood of an express app, at a really high level. This naive implementation swaps out the `http` module for the `readline` module and simulates http requests by entering strings into the command line prompt.

Some takeaways this exercise is meant to illustrate:

_NOTE:_ the actual implementation of express is much more complicated. This simplified implementation is intended only to convey conceptually what is going on under the hood to foster an understanding of the core concepts involved (middleware, the request and response objects, the request/response cycle, the `next` function, the `use` method, etc.).

1.  `app.use` pushes a middleware function to a stack of middlewares, each of which is called for each incoming request until the server responds to the client.
2.  The `next()` function simply sets a boolean, `processNextMiddleware`, to `true`. If it's not called the next middleware never gets processed, since `processNextMiddleware` will be false. Try removing a `next()` from one of the middlewares to see what happens. (the client never receives a response)
3.  On each simulated http request, a new instance of the request object and a new instance of the response object are created. These are passed to each middleware.
4.  The `json` method attached to the Response prototype simulates the end of a request/response cycle, at which point the server sends the response to the client. When that method is called in the route handler there is no call of `next()`. Hence, if we `app.use()` any additional middlewares after that route handler, that middleware would never get reached (since the route handler, as we've coded it, processes all requests).

I plan to add a lot more to this deconstruction, beginning with an implementation of the express Router API. This will also be the topic for a series of articles. I will link to them here when they are complete!
