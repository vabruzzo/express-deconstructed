// external dependencies
const express = require("./express");
const bodyParser = require("./bodyParser");
const logger = require("./logger");

// internal dependencies
const routeHandler = require("./routeHandler");

// initialize express app
const app = express();

// middlewares
app.use(logger);
app.use(bodyParser);

// route handlers
app.use("*", routeHandler);

// start the server
app.listen(3000);

app.fakeRequest("http://www.vincent.com");
